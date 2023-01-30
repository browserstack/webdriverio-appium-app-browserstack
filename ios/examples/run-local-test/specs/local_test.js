var path = require('path');
var assert = require('assert');

describe('BrowserStack Local Testing', () => {
  it('can check tunnel working', async () => {
    var searchSelector = await $(`~Test BrowserStackLocal connection`);
    await searchSelector.waitForDisplayed({ timeout: 30000 });
    await searchSelector.click();

    var textElements = await $(`~ResultBrowserStackLocal`);
    await textElements.waitForDisplayed({ timeout: 30000 });

    var testElement = null;

    var textContent = await textElements.getText();
    if (textContent.indexOf('Up and running') !== -1) {
      testElement = textElements;
    }

    if (testElement === null) {
      var screenshotPath = path.resolve(__dirname, 'screenshot.png');
      await browser.saveScreenshot(screenshotPath);
      console.log('Screenshot stored at ' + screenshotPath);
      throw new Error('Cannot find the Up and running response');
    }

    var matchedString = await testElement.getText();
    assert(matchedString == 'Up and running');
  });
});
