import { When, Then } from '@wdio/cucumber-framework';

When('I tap the text button', async () => {
  const textButton = await $('~Text Button');
  await textButton.waitForDisplayed({ timeout: 30000 });
  await textButton.click();
});

When('I enter {string} in the text input', async (value: string) => {
  const textInput = await $('~Text Input');
  await textInput.waitForDisplayed({ timeout: 30000 });
  await textInput.click();
  await textInput.addValue(value + '\n');
});

Then('the text output should show {string}', async (expectedValue: string) => {
  const textOutput = await $('~Text Output');
  await textOutput.waitForDisplayed({ timeout: 30000 });
  const value = await textOutput.getText();

  if (value !== expectedValue) {
    throw new Error(`Expected "${expectedValue}", got: "${value}"`);
  }
});
