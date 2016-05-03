WebDriverIO-BrowserStack
=========

Sample for using WebDriverIO with BrowserStack Automate.

### Setup
- Clone the repo and run `npm install`.

### Configuring capabilities
 - To run a sample `webdriverio` test, edit `tests/webdriverio.browserstack.js` to change `desiredCapabilities` with [capabilities](https://www.browserstack.com/automate/node#setting-os-and-browser) and add BrowserStack credentials as `user` and `key`.
 - For running tests by using `wdio` runner, edit `wdio.conf.js` to change `capabilities` with an array of [capabilities](https://www.browserstack.com/automate/node#setting-os-and-browser) and add BrowserStack credentials as `user` and `key`.
 - The credentials can optionally be set using the environment variables `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY`.

### Parallel Testing
- WebDriverIO v4.0 now inherently supports parallel testing. You can run in parallel on different browser and OS combinations by specifying multiple sets of capabilities as given in `wdio.parallel.conf.js`.
- To run in parallel, execute the command `./node_modules/.bin/wdio wdio.parallel.conf.js`.
- You can define the maximum number of parallel instances using the `maxInstances` parameter. 

### Run the Tests

 - To start a single test run: `npm test` or `npm run test_single`
 - To start parallel tests run: `npm run test_parallel`
 - To start local tests run: `npm run test_local`

### Further Reading

- [WebDriverIO](http://webdriver.io/guide.html)

- [Documentation for BrowserStack Automate](https://www.browserstack.com/automate/node)

Happy Testing!
