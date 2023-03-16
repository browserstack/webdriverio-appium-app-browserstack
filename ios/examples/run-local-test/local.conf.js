exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  services: [
    [
      'browserstack',
      { 
        buildIdentifier: '${BUILD_NUMBER}',
        browserstackLocal: true,
        opts: { forcelocal: false, localIdentifier: "webdriverio-appium-app-browserstack-ios-repo" },
        app: process.env.BROWSERSTACK_APP_PATH || './examples/LocalSample.ipa'
      }
    ]
  ],

  capabilities: [{
    'bstack:options': {
      projectName: "BrowserStack Samples",
      buildName: 'browserstack build',
      sessionName: 'BStack local webdriverio-appium',
      deviceName: 'iPhone 11 Pro',
      osVersion: "13",
      debug: true,
      networkLogs: true,
      source: 'webdriverio:appium-sample-sdk:v1.0'
    }
  }],

  updateJob: false,
  specs: [
    './examples/run-local-test/specs/local_test.js'
  ],
  exclude: [],

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
  }
};
