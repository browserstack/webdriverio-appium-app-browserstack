import path from 'path';
import { When, Then } from '@wdio/cucumber-framework';

When('I tap the element with accessibility id {string}', async (accessibilityId: string) => {
  const searchSelector = await $(`~${accessibilityId}`);
  await searchSelector.waitForDisplayed({ timeout: 30000 });
  await searchSelector.click();
});

When('I wait for the element with accessibility id {string}', async (accessibilityId: string) => {
  const textElements = await $(`~${accessibilityId}`);
  await textElements.waitForDisplayed({ timeout: 30000 });
});

Then('the result should show {string}', async (expectedText: string) => {
  const textElements = await $('~ResultBrowserStackLocal');
  const textContent = await textElements.getText();

  if (textContent.indexOf(expectedText) === -1) {
    const screenshotPath = path.resolve(__dirname, 'screenshot.png');
    await browser.saveScreenshot(screenshotPath);
    console.log('Screenshot stored at ' + screenshotPath);
    throw new Error(`Cannot find the ${expectedText} response. Got: ${textContent}`);
  }

  const matchedString = await textElements.getText();
  if (matchedString !== expectedText && matchedString.indexOf(expectedText) === -1) {
    throw new Error(`Expected "${expectedText}", got: ${matchedString}`);
  }
});
