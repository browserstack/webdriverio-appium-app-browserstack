import path from 'path';

// ts-node in workers: only transpile (no type-check) so Cucumber step defs load; type-check via npm run typecheck
process.env.TS_NODE_TRANSPILE_ONLY = '1';

type ConfigWithCommon = WebdriverIO.Config & {
  commonCapabilities?: Record<string, object>;
} & Record<string, unknown>;

export const config: ConfigWithCommon = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',

  tsConfigPath: path.join(__dirname, '../../tsconfig.json'),

  services: [
    [
      'browserstack',
      {
        accessibility: false,
        buildIdentifier: '${BUILD_NUMBER}',
        browserstackLocal: false,
        opts: { forcelocal: false, localIdentifier: 'webdriverio-appium-app-browserstack-repo' },
        app: process.env.BROWSERSTACK_APP_PATH || './examples/BStackSampleApp.ipa',
      },
    ],
  ],

  capabilities: [
    {
      'bstack:options': {
        deviceName: 'iPhone 14',
        osVersion: '16',
      },
    },
    {
      'bstack:options': {
        deviceName: 'iPhone 13 Pro Max',
        osVersion: '15',
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
    require: [path.join(__dirname, 'specs/step_definitions/text_steps.ts')],
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
