WebDriverIO-BrowserStack
=========

Sample for using WebDriverIO with BrowserStack Automate.

### Setup
- Clone the repo and run `npm install`

### Configuring capabilities
 - For tests by importing `webdriverio` npm module edit `tests/webdriverio.browserstack.js` to change `desiredCapabilities` with [capabilities] or `user` and `key` with BrowserStack credentails.
 - For running tests by using `wdio` runner edit `wdio.conf.js` to change `capabilities` with an array of [capabilities] for each test or `user` and `key` with BrowserStack credentails.
 - The credentials can optionally be set using the environment variables `BROWSERSTACK_USERNAME` and `BROWSERSTACK_KEY`

### Sample test
 - To start an example test, run: `npm test`

[WebDriverIO]:https://github.com/webdriverio/webdriverio
[capabilities]:http://www.browserstack.com/automate/capabilities
