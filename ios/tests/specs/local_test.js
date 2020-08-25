var path = require('path');
var assert = require('assert');

describe('BrowserStack Local Testing', function () {
  it('can check tunnel working', function () {
    var searchSelector = $(`~Test BrowserStackLocal connection`);
    searchSelector.waitForDisplayed({ timeout: 30000 });
    searchSelector.click();

    var allTextElements = $$(`~ResultBrowserStackLocal`);
    browser.pause(10000);

    var testElement = null;
    allTextElements.forEach(function (textElement) {
      var textContent = textElement.getText();
      if (textContent.indexOf('Up and running') !== -1) {
        testElement = textElement;
      }
    });

    if (testElement === null) {
      var screenshotPath = path.resolve(__dirname, 'screenshot.png');
      browser.saveScreenshot(screenshotPath);
      console.log('Screenshot stored at ' + screenshotPath);
      throw new Error('Cannot find the Up and running response');
    }

    var matchedString = testElement.getText();
    assert(matchedString == 'Response is: Up and running');
  });
});
