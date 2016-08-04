var assert = require('assert');

describe('Google\'s Search Functionality', function() {
  it('opens google', function () {
    browser
      .url('https://www.google.com/ncr')
      
    assert(browser.getTitle().match(/Google/i));
  });

  it('can find search results', function () {
    browser
      .url('https://www.google.com/ncr')
      .setValue('*[name="q"]','BrowserStack\n')
      .pause(5000);
    
    assert(browser.getTitle().match(/BrowserStack - Google Search/i));
  });

  it('can find search results for non ncr', function () {
    browser
      .url('https://www.google.com')
      .setValue('*[name="q"]','BrowserStack\n')
      .pause(5000);
    
    assert(browser.getTitle().match(/BrowserStack - Google/i));
  });
});
