exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  updateJob: false,
  specs: [
    './examples/run-parallel-test/specs/single_test.js'
  ],
  exclude: [],

  maxInstances: 10,
  commonCapabilities: {
    platformName: "Android",
    'bstack:options' : {
      "projectName" : "First Webdriverio Android Project",
      "buildName" : "browserstack-build-1",
      "debug" : "true"
    }
  },

  capabilities: [{
    "appium:deviceName": 'Google Pixel 3',
    "appium:platformVersion": "9.0",
    'bstack:options' : {
      "sessionName" : "BStack parallel_test1"
    }
  }, {
    "appium:deviceName": 'Samsung Galaxy S10e',
    "appium:platformVersion": "9.0",
    'bstack:options' : {
      "sessionName" : "BStack parallel_test2"
    }
  }],

  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: [['browserstack', {
    app: 'assets/SampleAndroidApp.apk'
  }]],

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 20000
  }
};

// Code to support common capabilities
var common_caps = exports.config.commonCapabilities
var caps = exports.config.capabilities
for (var i in caps) caps[i] = { ...caps[i], ...common_caps };
