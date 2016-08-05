var assert = require('assert');

describe('Google\'s Search Functionality', function() {
  it('opens google', function () {
    browser
      .url('https://www.google.com/ncr')
      
    assert(browser.getTitle().match(/Google/i));
  });
});
