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
    platformName: "ios",
    "appium:app": process.env.BROWSERSTACK_APP_ID || 'bs://<hashed app-id>',
    'bstack:options' : {
      "projectName" : "First Webdriverio iOS Project",
      "buildName" : "Webdriverio iOS Parallel",
      "debug" : "true"
    }
  },

  capabilities: [{
    "appium:deviceName": 'iPhone 11 Pro',
    "appium:platformVersion": "13",
    'bstack:options' : {
      "sessionName" : "parallel_test1"
    }
  }, {
    "appium:deviceName": 'iPhone 11 Pro Max',
    "appium:platformVersion": "13",
    'bstack:options' : {
      "sessionName" : "parallel_test2"
    }
  }],

  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: [['browserstack']],

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 40000
  }
};

// Code to support common capabilities
var common_caps = exports.config.commonCapabilities
var caps = exports.config.capabilities
for (var i in caps) caps[i] = { ...caps[i], ...common_caps };
