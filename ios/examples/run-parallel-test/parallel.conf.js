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
    project: "BrowserStack Samples",
    build: 'browserstack build',
    name: 'BStack parallel webdriverio-appium',
    'browserstack.debug': true,
    'browserstack.source': 'webdriverio-appium:sample-sdk:v1.0'
  },

  capabilities: [{
    device: "iPhone 11 Pro",
    os_version: "13"
  }, {
    device: "iPhone 11 Pro Max",
    os_version: "13"
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

// Code to support common capabilities
exports.config.capabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
