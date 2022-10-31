exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  // Adding browserstackLocal to browserstack-service to initiate local binary
  services: [
      ['browserstack', {
          browserstackLocal: true,
          app: 'assets/SampleLocalIosApp.ipa'
      }]
  ],

  updateJob: false,
  specs: [
    './examples/run-local-test/specs/local_test.js'
  ],
  exclude: [],

  capabilities: [{
    platformName: "ios",
    "appium:platformVersion": "12",
    "appium:deviceName": 'iPhone XS',
    'bstack:options' : {
      "projectName" : "First Webdriverio iOS Project",
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
    timeout: 30000
  },
};
