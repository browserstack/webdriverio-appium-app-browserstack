# webdriverio-appium-app-browserstack
This repository demonstrates how to run Appium tests using [WebdriverIO](http://webdriver.io/) on BrowserStack App Automate.

<div align="center">
<img src = "https://www.browserstack.com/images/layout/browserstack-logo-600x315.png" > <br>
<img src = "https://webdriver.io/img/webdriverio.png"  height="140px">
</div>

Code samples to get started with Appium tests for your Native App using WebdriverIO. The project is written in **TypeScript** and uses [Cucumber](https://cucumber.io/) (Gherkin) as the test framework, with feature files and step definitions.

## Setup

### Requirements

* Node.js 18+
  - If you don't have Node installed, download it from [here](https://nodejs.org/en/)

### Install the dependencies

For Android tests, run the following command in project's base directory :

```sh
cd android
npm i
```

Or,

For dependencies for iOS tests, run following command in project's base directory :

```sh
cd ios
npm i
```

## Getting Started

Getting Started with Appium tests using WebdriverIO on BrowserStack couldn't be easier!

Tests are organized under **`examples/`** in each platform folder:

- **`run-local-test`** – Local testing (tunnel) with Cucumber feature files and step definitions
- **`run-parallel-test`** – Parallel tests on multiple devices

Documentation:

- [Get Started with your first test on App Automate](https://www.browserstack.com/docs/app-automate/appium/getting-started/nodejs/webdriverio)
- [Parallel testing on App Automate](https://www.browserstack.com/docs/app-automate/appium/getting-started/nodejs/webdriverio/parallelize-tests)
- [Local testing on App Automate](https://www.browserstack.com/docs/app-automate/appium/getting-started/nodejs/webdriverio/local-testing)

**Note**: For other test frameworks supported by App-Automate refer our [Developer documentation](https://www.browserstack.com/docs/)

## Running your tests

Run commands from the **`android/`** or **`ios/`** directory (after `npm i` in that directory):

- **Parallel tests:** `npm run test`
- **Local test:** `npm run local`
- **TypeScript check:** `npm run typecheck`

Understand how many parallel sessions you need by using our [Parallel Test Calculator](https://www.browserstack.com/automate/parallel-calculator?ref=github)

## Getting Help

If you are running into any issues or have any queries, please check [Browserstack Support page](https://www.browserstack.com/support/app-automate) or [get in touch with us](https://www.browserstack.com/contact?ref=help).

