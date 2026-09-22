# Multi-app sample (two concurrent sessions, WebdriverIO multiremote)

This sample demonstrates running **two concurrent App Automate sessions from a single
WebdriverIO spec** using [multiremote](https://webdriver.io/docs/multiremote/), instead of the
usual one-session-per-config pattern used in the other `examples/` folders here.

## How it works

- `capabilities` in [`multiapp.conf.js`](./multiapp.conf.js) is an **object**, not an array —
  each key (`customerApp`, `riderApp`) names one instance and its own capability set. WDIO
  detects this and runs multiremote automatically.
- In the spec, each instance is reached as `browser.customerApp` / `browser.riderApp` — every
  normal WebdriverIO command (`$`, `waitUntil`, `execute`, `getContexts`, `switchContext`, ...)
  works on it exactly as it would on a single-session `browser`.
- Both sessions are already live by the time the spec starts, so there's no manual "build both
  before interacting with either" step like the selenium-webdriver samples need — multiremote
  handles that.
- Context switching into each app's WebView uses WebdriverIO's native `getContexts()` /
  `switchContext()` Appium commands — no manual REST calls against the Appium endpoint needed.

See [`multiapp.conf.js`](./multiapp.conf.js) and
[`specs/ride_request_test.js`](./specs/ride_request_test.js) for the full pattern.

## The apps

`ride-request-customer.apk` and `ride-request-rider.apk` are a small Uber-style ride-hailing
demo: the customer requests a ride, the rider accepts, then starts the ride using an OTP read
off the customer app's screen. Both apps talk to a local backend for this state
(idle → requested → accepted → started).

## Backend

Start the backend before running the test:

```bash
cd backend
npm install
npm start
```

It listens on `http://localhost:8787` by default (override with `PORT=xxxx npm start`) and is
reached by the BrowserStack devices through BrowserStack Local — `multiapp.conf.js` sets
`'browserstack.local': true` on both capabilities and starts/stops the tunnel itself in
`onPrepare` / `onComplete`.

## Running it

From the `android/` folder:

```bash
npm install
npm run multi-app
```

`multi-app` runs `upload_apps.js` first (uploads both apks to BrowserStack the first time and
caches the resulting ids in `app-ids.json`, git-ignored — safe to re-run, it skips any app
already cached) then the spec itself. To just upload without running the test:
`node examples/run-multi-app-test/upload_apps.js`.

You'll need `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` set as environment variables.
Results, including both concurrent sessions, are visible on the
[App Automate dashboard](https://app-automate.browserstack.com/dashboard).
