exports.config = {
exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'ericswanson3',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'sgqxqVpp6tEWDHtBSUCG',
  //...
  capabilities: [{
    project: "First Webdriverio Android Project",
    build: "browserstack-build-1",
    name: "local_test",
    device: "Google Pixel 3",
    os_version: "9.0",
    app: process.env.BROWSERSTACK_APP_ID || 'bs://c700ce60cf13ae8ed97705a55b8e022f13c5827c',
    'browserstack.local': true
  }],
  //...
};

  updateJob: false,
  specs: [
    './examples/run-first-test/specs/first_test.js'
  ],
  exclude: [],

  capabilities: [{
    project: "First Webdriverio Android Project",
    build: 'Webdriverio Android',
    name: 'first_test',
    device: 'Samsung Galaxy S22 Ultra ',
    os_version: "12.0",
    app: process.env.BROWSERSTACK_APP_ID || 'bs://<hashed app-id>',
    'browserstack.debug': true
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
