import path from 'path';

// ts-node in workers: only transpile (no type-check) so Cucumber step defs load; type-check via npm run typecheck
process.env.TS_NODE_TRANSPILE_ONLY = '1';

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
  specs: ['./specs/**/*.feature'],
  exclude: [],

  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'cucumber',
  cucumberOpts: {
    requireModule: ['ts-node/register'],
    require: [path.join(__dirname, 'specs/step_definitions/local_steps.ts')],
    timeout: 20000,
  },
};
