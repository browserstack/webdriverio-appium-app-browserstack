var browserstack = require('browserstack-local');

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  updateJob: false,
  specs: [
    './examples/run-local-test/specs/local_test.js'
  ],
  exclude: [],

  capabilities: [{
    project: "BrowserStack Samples",
    build: 'browserstack build',
    name: 'BStack local webdriverio-appium',
    device: 'Google Pixel 3',
    os_version: "9.0",
    'browserstack.debug': true,
    'browserstack.source': 'webdriverio-appium:sample-sdk:v1.0'
  }],

  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: [
    [
      'browserstack',
      { 
        browserstackLocal: true, opts: { forcelocal: false },
        app: process.env.BROWSERSTACK_APP_ID || 'bs://<hashed app-id>'
      }
    ]
  ],

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 20000
  }
};
