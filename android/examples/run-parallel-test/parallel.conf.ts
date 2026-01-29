import path from 'path';

type ConfigWithCommon = WebdriverIO.Config & {
  commonCapabilities?: Record<string, object>;
} & Record<string, unknown>;

export const config: ConfigWithCommon = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  hostname: 'hub.browserstack.com',

  tsConfigPath: path.join(__dirname, '../../tsconfig.json'),

  services: [
    [
      'browserstack',
      {
        accessibility: false,
        buildIdentifier: '${BUILD_NUMBER}',
        browserstackLocal: true,
        opts: { forcelocal: false, localIdentifier: 'webdriverio-appium-app-browserstack-repo' },
        app: process.env.BROWSERSTACK_APP_PATH || './examples/WikipediaSample.apk',
      },
    ],
  ],

  capabilities: [
    {
      'bstack:options': {
        deviceName: 'Google Pixel 8',
        osVersion: '14.0',
      },
    },
    {
      'bstack:options': {
        deviceName: 'Samsung Galaxy S21',
        osVersion: '11.0',
      },
    },
  ],

  commonCapabilities: {
    'bstack:options': {
      projectName: 'BrowserStack Samples',
      buildName: 'browserstack build',
      sessionName: 'BStack parallel webdriverio-appium',
      debug: true,
      networkLogs: true,
      source: 'webdriverio:appium-sample-sdk:v1.0',
    },
  },

  maxInstances: 10,

  updateJob: false,
  specs: ['./specs/single_test.ts'],
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
    timeout: 40000,
  },
};

// Merge common capabilities into each capability
config.capabilities!.forEach((caps) => {
  if (config.commonCapabilities) {
    for (const key in config.commonCapabilities) {
      const cap = (caps as Record<string, object>)[key];
      const commonCap = config.commonCapabilities[key];
      (caps as Record<string, object>)[key] = { ...(cap && typeof cap === 'object' ? cap : {}), ...commonCap };
    }
  }
});
