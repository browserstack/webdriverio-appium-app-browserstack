import path from 'path';

// WDIO config type allows extra options (updateJob, coloredLogs, etc.) not in strict typings
export const config: WebdriverIO.Config & Record<string, unknown> = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  tsConfigPath: path.join(__dirname, '../../tsconfig.json'),

  services: [
    [
      'browserstack',
      {
        buildIdentifier: '${BUILD_NUMBER}',
        browserstackLocal: true,
        opts: { forcelocal: false, localIdentifier: 'webdriverio-appium-app-browserstack-android-repo' },
        app: process.env.BROWSERSTACK_APP_PATH || './examples/LocalSample.apk',
        testObservability: true,
        testObservabilityOptions: {
          projectName: 'Reproduction Project',
          buildName: 'Reproduction Build',
        },
      },
    ],
  ],

  capabilities: [
    {
      'bstack:options': {
        projectName: 'BrowserStack Samples',
        buildName: 'browserstack build',
        sessionName: 'BStack local webdriverio-appium',
        deviceName: 'Google Pixel 6 Pro',
        osVersion: '15.0',
        debug: true,
        networkLogs: true,
        source: 'webdriverio:appium-sample-sdk:v1.0',
      } as Record<string, unknown>,
    },
  ],

  updateJob: false,
  specs: ['./specs/local_test.ts'],
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
    timeout: 20000,
  },
};
