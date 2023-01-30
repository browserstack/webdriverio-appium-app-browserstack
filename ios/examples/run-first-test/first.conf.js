exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  updateJob: false,
  specs: [
    './examples/run-first-test/specs/first_test.js'
  ],
  exclude: [],

  capabilities: [{
    project: "BrowserStack Samples",
    build: 'browserstack build',
    name: 'BStack first webdriverio-appium',
    device: 'iPhone 11 Pro',
    os_version: "13",
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
        app: process.env.BROWSERSTACK_APP_ID || 'bs://<hashed app-id>'
      }
    ]
  ],

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 40000
  }
};
