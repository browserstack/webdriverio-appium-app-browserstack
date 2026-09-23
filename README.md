# webdriverio-appium-app-browserstack
This repository demonstrates how to run Appium tests using [WebdriverIO](http://webdriver.io/) on BrowserStack App Automate.

<div align="center">
<img src = "https://www.browserstack.com/images/layout/browserstack-logo-600x315.png" > <br>
<img src = "https://webdriver.io/img/webdriverio.png"  height="140px">
</div>

Code samples to get started with Appium tests for your Native App using WebdriverIO.

## Setup

### Requirements

* Node.js 8.11.2+
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

- Test script is available in  `run-parallel-test` directory under [Android examples](./android) or [iOS examples](./ios)
- Follow the steps outlined in the documentation - [Get Started with parallel testing on App Automate](https://www.browserstack.com/docs/app-automate/appium/getting-started/nodejs/webdriverio/parallelize-tests)

### Use Local testing for apps that access resources hosted in development or testing environments :

- Test script is available in `run-local-test` directory under [Android examples](./android) or [iOS examples](./ios)
- Follow the steps outlined in the documentation - [Get Started with Local testing on App Automate](https://www.browserstack.com/docs/app-automate/appium/getting-started/nodejs/webdriverio/local-testing)

### Run two concurrent sessions from one spec with multi-app / multiremote :

- Test script is available in `run-multi-app-test` directory under [Android examples](./android/examples/run-multi-app-test)
- A two-device ride-request demo (customer requests a ride, rider accepts, starts it with an OTP read off the customer app) built with WebdriverIO's [multiremote](https://webdriver.io/docs/multiremote/) feature, driving both app sessions from a single spec. See the sample's own [README](./android/examples/run-multi-app-test/README.md) for how it works and how to run it.

**Note**: For other test frameworks supported by App-Automate refer our [Developer documentation](https://www.browserstack.com/docs/)

## Getting Help

If you are running into any issues or have any queries, please check [Browserstack Support page](https://www.browserstack.com/support/app-automate) or [get in touch with us](https://www.browserstack.com/contact?ref=help).

