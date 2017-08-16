var assert = require('assert');

describe('Search Wikipedia Functionality', function () {
  it('can find search results', function () {
    var searchSelector = `~Search Wikipedia`;
    browser.waitForVisible(searchSelector, 30000);
    browser
      .element(searchSelector)
      .click();

    var insertTextSelector = 'android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")';
    browser.waitForVisible(insertTextSelector);
    browser
      .element(insertTextSelector)
      .keys('BrowserStack 03')
      .pause(5000);

    var allProductsName = browser.elements(`android.widget.TextView`).value;
    assert(allProductsName.length > 0);
    browser
      .hideDeviceKeyboard()
      .back()
      .pause(3000);
  });
});
