var fs = require('fs');
var path = require('path');
var browserstack = require('browserstack-local');

// Ids uploaded by upload_apps.js (see ./app-ids.json). Falls back to env vars so CI can
// supply already-uploaded ids without running the upload step.
var appIdsPath = path.join(__dirname, 'app-ids.json');
var appIds = fs.existsSync(appIdsPath) ? JSON.parse(fs.readFileSync(appIdsPath, 'utf8')) : {};
var customerAppId = process.env.CUSTOMER_APP_ID || appIds.customerApp || 'bs://<hashed customer app-id>';
var riderAppId = process.env.RIDER_APP_ID || appIds.riderApp || 'bs://<hashed rider app-id>';

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  updateJob: false,
  specs: [
    './examples/run-multi-app-test/specs/ride_request_test.js'
  ],
  exclude: [],

  // Multiremote: two concurrent App Automate sessions in one spec, one per named instance.
  // In the spec these are reached as `browser.customerApp` / `browser.riderApp`.
  capabilities: {
    customerApp: {
      capabilities: {
        project: 'Webdriverio Multi-App Project',
        build: 'Webdriverio Multi-App Ride Request',
        name: 'ride_request_customer',
        device: 'Samsung Galaxy S22 Ultra ',
        os_version: '12.0',
        app: customerAppId,
        'browserstack.local': true,
        'browserstack.debug': true
      }
    },
    riderApp: {
      capabilities: {
        project: 'Webdriverio Multi-App Project',
        build: 'Webdriverio Multi-App Ride Request',
        name: 'ride_request_rider',
        device: 'Samsung Galaxy S22 Ultra ',
        os_version: '12.0',
        app: riderAppId,
        'browserstack.local': true,
        'browserstack.debug': true
      }
    }
  },

  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },

  // Both apps talk to a local backend (see ./backend, started separately with `npm start`),
  // so BrowserStack Local must be up for the duration of the run.
  onPrepare: (config, capabilities) => {
    console.log('Connecting local');
    return new Promise((resolve, reject) => {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({ key: exports.config.key }, (error) => {
        if (error) return reject(error);
        console.log('Connected. Now testing...');
        resolve();
      });
    });
  },

  onComplete: (capabilities, specs) => {
    console.log('Closing local tunnel');
    return new Promise((resolve, reject) => {
      exports.bs_local.stop((error) => {
        if (error) return reject(error);
        console.log('Stopped BrowserStackLocal');
        resolve();
      });
    });
  }
};
