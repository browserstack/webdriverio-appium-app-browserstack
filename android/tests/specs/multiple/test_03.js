var assert = require('assert');

describe('Search Wikipedia Functionality', function () {
  it('can find search results', function () {
    var searchSelector = $(`~Search Wikipedia`);
    searchSelector.waitForDisplayed({ timeout: 30000 });
    searchSelector.click();

    var insertTextSelector = $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")');
    insertTextSelector.waitForDisplayed({ timeout: 30000 });

    insertTextSelector.addValue("Browsertack 03");
    browser.pause(5000);

    var allProductsName = $$(`android.widget.TextView`);
    assert(allProductsName.length > 0);
  });
});
