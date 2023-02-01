exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  updateJob: false,
  specs: [
    './examples/run-multiple-test/specs/multiple_test.js'
  ],
  exclude: [],

  capabilities: [{
    'bstack:options': {
      projectName: "BrowserStack Samples",
      buildName: 'browserstack build',
      sessionName: 'BStack multiple webdriverio-appium',
      deviceName: 'iPhone 11 Pro',
      osVersion: "13",
      debug: true,
      source: 'webdriverio:appium-sample-sdk:v1.0'
    }
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
        app: './examples/WikipediaSample.apk' || 'bs://<hashed app-id>'
      }
    ]
  ],

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000
  }
};
