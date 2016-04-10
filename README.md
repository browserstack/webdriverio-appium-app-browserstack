WebDriverIO-BrowserStack
=========

Sample for using WebDriverIO with BrowserStack Automate.

### Setup
- Clone the repo and run `npm install`.

### Configuring capabilities
 - For tests by importing `webdriverio` npm module, edit `tests/webdriverio.browserstack.js` to change `desiredCapabilities` with [capabilities] or `user` and `key` with BrowserStack credentials.
 - For running tests by using `wdio` runner, edit `wdio.conf.js` to change `capabilities` with an array of [capabilities] for each test or `user` and `key` with BrowserStack credentials.
 - The credentials can optionally be set using the environment variables `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY`

### Sample test
 - To start an example test, run: `npm test`.

### Parallel Testing
- WebDriverIO v4.0 now inherently supports parallel testing. You can run in parallel on different browser and OS combinations by specifying multiple sets of capabilities as given in `wdio.parallel.conf.js`.
- To run in parallel, execute the command `./node_modules/.bin/wdio wdio.parallel.conf.js`.
- You can define the maximum number of parallel instances using the `maxInstances` parameter. 

### Further Reading
[WebDriverIO]:http://webdriver.io/guide.html
[Documentation for BrowserStack Automate]:https://www.browserstack.com/automate/node 
[Capabilities]:http://www.browserstack.com/automate/capabilities

Happy Testing!
