// Local backend for the two-device ride-request sample — an Uber-style ride request between
// the "customer" app (ride-request-customer.apk) and the "rider" app (ride-request-rider.apk),
// driven concurrently via WebdriverIO multiremote (see ../multiapp.conf.js, ../specs).
//
// State machine: idle -> requested -> accepted -> started
//
//   POST /request        (customer) idle -> requested. Generates the OTP server-side and
//                         returns it ONCE in this response — the customer app is the only
//                         party that ever receives it over the network.
//   GET  /status          (both)     current { status } only — never includes the OTP, so
//                         starting the ride requires the OTP to actually be read off the
//                         customer app's screen and typed into the rider app, same as the
//                         real cross-device flow this is standing in for.
//   POST /accept          (rider)    requested -> accepted.
//   POST /start  {otp}    (rider)    accepted -> started, only if otp matches.
//   POST /reset            (either)   back to idle, clears the OTP.
//
// /start also auto-resets back to idle a few seconds later, so the next run starts clean
// without a manual /reset — see AUTO_RESET_DELAY_MS below.
//
// Run: npm start   (defaults to port 8787; override with PORT=xxxx npm start)
// Reachable from real BrowserStack devices via BrowserStack Local — 'browserstack.local: true'
// is set on both capabilities in ../multiapp.conf.js, which also starts/stops the tunnel.

const http = require("http")

const PORT = Number(process.env.PORT) || 8787
const AUTO_RESET_DELAY_MS = 8000
// This process stays up across unrelated test runs, and plenty of runs get interrupted before reaching /start or /reset — without this, a run from minutes/hours ago leaves state stuck non-idle forever, so the NEXT run's rider app sees a stale "requested"/"accepted" the instant it loads, and the customer app's own /request then gets rejected with 409 (no otp ever issued).
const STALE_AFTER_MS = 120000

let state = { status: "idle", otp: null }
let lastActivityAt = Date.now()
let autoResetTimer = null

function touch() {
	lastActivityAt = Date.now()
}

function resetIfStale() {
	if (state.status !== "idle" && Date.now() - lastActivityAt > STALE_AFTER_MS) {
		clearAutoResetTimer()
		state = { status: "idle", otp: null }
		console.log(`[multiapp] stale state auto-reset to idle (no activity for ${STALE_AFTER_MS}ms)`)
	}
}

function clearAutoResetTimer() {
	if (autoResetTimer) {
		clearTimeout(autoResetTimer)
		autoResetTimer = null
	}
}

function send(res, code, body) {
	res.writeHead(code, {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,POST,OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
	})
	res.end(JSON.stringify(body))
}

function readJsonBody(req) {
	return new Promise((resolve, reject) => {
		let data = ""
		req.on("data", (chunk) => (data += chunk))
		req.on("end", () => {
			if (!data) return resolve({})
			try {
				resolve(JSON.parse(data))
			} catch (err) {
				reject(err)
			}
		})
		req.on("error", reject)
	})
}

function generateOtp() {
	return String(Math.floor(100000 + Math.random() * 900000))
}

const server = http.createServer(async (req, res) => {
	if (req.method === "OPTIONS") {
		return send(res, 204, {})
	}

	resetIfStale()
	console.log(`[multiapp] ${req.method} ${req.url} — status=${state.status}`)

	if (req.method === "POST" && req.url === "/request") {
		if (state.status !== "idle") {
			return send(res, 409, { success: false, error: `cannot request ride from status "${state.status}"` })
		}
		clearAutoResetTimer()
		const otp = generateOtp()
		state = { status: "requested", otp }
		touch()
		console.log(`[multiapp] ride requested, otp=${otp}`)
		return send(res, 200, { status: state.status, otp })
	}

	if (req.method === "GET" && req.url === "/status") {
		return send(res, 200, { status: state.status })
	}

	if (req.method === "POST" && req.url === "/accept") {
		if (state.status !== "requested") {
			return send(res, 409, { success: false, error: `cannot accept from status "${state.status}"` })
		}
		state = { ...state, status: "accepted" }
		touch()
		console.log("[multiapp] ride accepted")
		return send(res, 200, { status: state.status })
	}

	if (req.method === "POST" && req.url === "/start") {
		if (state.status !== "accepted") {
			return send(res, 409, { success: false, error: `cannot start from status "${state.status}"` })
		}
		const body = await readJsonBody(req).catch(() => ({}))
		if (String(body.otp) !== String(state.otp)) {
			return send(res, 400, { success: false, error: "otp mismatch" })
		}
		state = { ...state, status: "started" }
		touch()
		console.log("[multiapp] ride started")
		// Auto-reset after a delay so both apps' next poll sees a clean slate for the next run — cancelled if a new /request arrives first.
		clearAutoResetTimer()
		autoResetTimer = setTimeout(() => {
			autoResetTimer = null
			state = { status: "idle", otp: null }
			console.log("[multiapp] auto-reset after ride started")
		}, AUTO_RESET_DELAY_MS)
		return send(res, 200, { success: true, status: state.status })
	}

	if (req.method === "POST" && req.url === "/reset") {
		clearAutoResetTimer()
		state = { status: "idle", otp: null }
		console.log("[multiapp] reset")
		return send(res, 200, { status: state.status })
	}

	send(res, 404, { error: "not found" })
})

server.listen(PORT, () => {
	console.log(`[multiapp] listening on http://localhost:${PORT}`)
	console.log("[multiapp] endpoints: POST /request  GET /status  POST /accept  POST /start  POST /reset")
})
