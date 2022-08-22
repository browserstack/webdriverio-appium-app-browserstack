exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  // Adding browserstackLocal to browserstack-service to initiate local binary
  services: [
      ['browserstack', {
          browserstackLocal: true
      }]
  ],

  updateJob: false,
  specs: [
    './examples/run-local-test/specs/local_test.js'
  ],
  exclude: [],

  capabilities: [{
    platformName: "ios",
    "appium:platformVersion": "13",
    "appium:deviceName": 'iPhone 11 Pro',
    "appium:app": process.env.BROWSERSTACK_APP_ID || 'bs://<hashed app-id>',
    'bstack:options' : {
      "projectName" : "First Webdriverio iOS Project",
      "buildName" : "Webdriverio iOS Local",
      "sessionName" : "local_test",
      "debug" : "true"
    }
  }],

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
    timeout: 30000
  },
};
