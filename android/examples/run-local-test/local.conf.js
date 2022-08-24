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
    platformName: "Android",
    "appium:platformVersion": "9.0",
    "appium:deviceName": 'Google Pixel 3',
    "appium:app": process.env.BROWSERSTACK_APP_ID || 'bs://<hashed app-id>',
    'bstack:options' : {
      "projectName" : "First Webdriverio Android Project",
      "buildName" : "browserstack-build-1",
      "sessionName" : "BStack local_test",
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
    timeout: 20000
  }
};
