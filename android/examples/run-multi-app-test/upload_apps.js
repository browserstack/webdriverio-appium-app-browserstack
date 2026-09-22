// Uploads ride-request-customer.apk and ride-request-rider.apk to BrowserStack and caches the
// resulting bs:// ids in app-ids.json, which multiapp.conf.js reads at config time. Needed
// because — unlike the app-automate SDKs — this repo's raw wdio.conf.js capabilities take an
// app id, not a local path, so there's no built-in auto-upload to piggyback on.
// Safe to re-run: skips upload for any app that already has a cached id in app-ids.json.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const USERNAME = process.env.BROWSERSTACK_USERNAME;
const ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY;

if (!USERNAME || !ACCESS_KEY) {
	console.error('Set BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY before running this.');
	process.exit(1);
}

const APPS = {
	customerApp: 'ride-request-customer.apk',
	riderApp: 'ride-request-rider.apk',
};
const CACHE_PATH = path.join(__dirname, 'app-ids.json');

function uploadApp(apkPath) {
	const raw = execFileSync(
		'curl',
		['-s', '-u', `${USERNAME}:${ACCESS_KEY}`, '-X', 'POST', 'https://api-cloud.browserstack.com/app-automate/upload', '-F', `file=@${apkPath}`],
		{ encoding: 'utf8' },
	);
	const response = JSON.parse(raw);
	if (!response.app_url) {
		throw new Error(`Upload failed for ${apkPath}: ${raw}`);
	}
	console.log(`Uploaded ${apkPath} -> ${response.app_url}`);
	return response.app_url;
}

let cache = {};
if (fs.existsSync(CACHE_PATH)) {
	cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
}

for (const [key, apkName] of Object.entries(APPS)) {
	if (cache[key]) {
		console.log(`${key} already uploaded as ${cache[key]} (delete app-ids.json to force re-upload)`);
		continue;
	}
	cache[key] = uploadApp(path.join(__dirname, apkName));
}

fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
console.log('app-ids.json updated.');
