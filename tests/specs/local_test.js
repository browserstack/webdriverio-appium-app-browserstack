var assert = require('assert');

describe('BrowserStack Local Testing', function() {
  it('can check tunnel working', function () {
    browser
      .url('http://bs-local.com:45691/check')

    assert(browser.getSource().match(/Up and running/i));
  });
});
