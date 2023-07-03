# webdriverio-appium-app-browserstack

This repository demonstrates how to run Appium tests using [WebdriverIO](http://webdriver.io/) on BrowserStack App Automate.

<div align="center">
<img src = "https://www.browserstack.com/images/layout/browserstack-logo-600x315.png" > <br>
<img src = "https://webdriver.io/img/webdriverio.png"  height="140px">
</div>

Code samples to get started with Appium tests for your Native App using WebdriverIO.

## Based on

These code samples are currently based on:

- **WebdriverIO:** `7.23.0`
- **Protocol:** `W3C`

## Setup

### Requirements

- Node.js v16.17.0+
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

### Run first test:

- Test script is available in `run-first-test` directory under [Android examples](./android) or [iOS examples](./ios)
- Follow the steps outlined in the documentation - [Get Started with your first test on App Automate](https://www.browserstack.com/docs/app-automate/appium/getting-started/nodejs/webdriverio)

### Speed up test execution with parallel testing :

- Test script is available in `run-parallel-test` directory under [Android examples](./android) or [iOS examples](./ios)
- Follow the steps outlined in the documentation - [Get Started with parallel testing on App Automate](https://www.browserstack.com/docs/app-automate/appium/getting-started/nodejs/webdriverio/parallelize-tests)

### Use Local testing for apps that access resources hosted in development or testing environments :

- Test script is available in `run-local-test` directory under [Android examples](./android) or [iOS examples](./ios)
- Follow the steps outlined in the documentation - [Get Started with Local testing on App Automate](https://www.browserstack.com/docs/app-automate/appium/getting-started/nodejs/webdriverio/local-testing)

**Note**: For other test frameworks supported by App-Automate refer our [Developer documentation](https://www.browserstack.com/docs/)

## Getting Help

If you are running into any issues or have any queries, please check [Browserstack Support page](https://www.browserstack.com/support/app-automate) or [get in touch with us](https://www.browserstack.com/contact?ref=help).
