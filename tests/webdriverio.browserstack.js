var webdriverio = require('webdriverio'),
  client = webdriverio.remote({
    desiredCapabilities: {
      browser : 'Chrome',
      browser_version : '46.0',
      os : 'Windows',
      os_version : '10',
      name: 'Example via node',
      build: 'Sample WebDriverIO tests'
    },
    host: 'hub.browserstack.com',
    port: 80,
    user : process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    logLevel: 'silent',
  }).init();

client
.url('http://google.com')
.setValue('*[name="q"]','webdriverio')
  .click('*[name="btnG"]')
.pause(1000)
  .getTitle().then(function(title) {
    console.log(title);
  })
.end();
