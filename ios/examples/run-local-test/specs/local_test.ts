import path from 'path';
import assert from 'assert';

describe('BrowserStack Local Testing', () => {
  it('can check tunnel working', async () => {
    const searchSelector = await $('~Test BrowserStackLocal connection');
    await searchSelector.waitForDisplayed({ timeout: 30000 });
    await searchSelector.click();

    const textElements = await $('~ResultBrowserStackLocal');
    await textElements.waitForDisplayed({ timeout: 30000 });

    let testElement: Awaited<ReturnType<typeof $>> | null = null;

    const textContent = await textElements.getText();
    if (textContent.indexOf('Up and running') !== -1) {
      testElement = textElements;
    }

    if (testElement === null) {
      const screenshotPath = path.resolve(__dirname, 'screenshot.png');
      await browser.saveScreenshot(screenshotPath);
      console.log('Screenshot stored at ' + screenshotPath);
      throw new Error('Cannot find the Up and running response');
    }

    const matchedString = await testElement.getText();
    assert(matchedString === 'Up and running');
  });
});
