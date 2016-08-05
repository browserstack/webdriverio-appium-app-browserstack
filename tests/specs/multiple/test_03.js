var assert = require('assert');

describe('Google\'s Search Functionality', function() {
  it('can find search results for non ncr', function () {
    browser
      .url('https://www.google.com')
      .setValue('*[name="q"]','BrowserStack\n')
      .pause(5000);
    
    assert(browser.getTitle().match(/BrowserStack - Google/i));
  });
});
