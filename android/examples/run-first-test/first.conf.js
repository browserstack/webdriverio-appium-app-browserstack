exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  updateJob: false,
  specs: [
    './examples/run-first-test/specs/first_test.js'
  ],
  exclude: [],

  capabilities: [{
    platformName: "Android",
    "appium:platformVersion": "9.0",
    "appium:deviceName": 'Google Pixel 3',
    'bstack:options' : {
      "projectName" : "First Webdriverio Android Project",
      "buildName" : "browserstack-build-1",
      "sessionName" : "BStack first_test",
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
    app: 'assets/SampleAndroidApp.apk'
  }]],

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 20000
  }
};
