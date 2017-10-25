exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  updateJob: false,
  specs: [
    './ios/tests/specs/multiple_test.js'
  ],
  exclude: [],

  capabilities: [{
    name: 'multiple_appium_test',
    build: 'webdriver-browserstack',
    realMobile: true,
    device: 'iPhone 7',
    browserName: 'safari',
    app: 'bs://087e6ec5995140fd6bbec9b209e714be327680a0',
    'browserstack.debug': true,
    automationName: "XCUITest"
  }],

  logLevel: 'verbose',
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
  }
};
