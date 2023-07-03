exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  updateJob: false,
  specs: [
    './examples/run-first-test/specs/first_test.js'
  ],
  exclude: [],

  capabilities: [{
    platformName: "ios",
    "appium:platformVersion": "13",
    "appium:deviceName": 'iPhone 11 Pro',
    'bstack:options' : {
      "projectName" : "First Webdriverio iOS Project",
      "buildName" : "browserstack-build-1",
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
  services: [['browserstack', {
    app: 'assets/SampleIosApp.ipa'
  }]],

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 40000
  }
};
