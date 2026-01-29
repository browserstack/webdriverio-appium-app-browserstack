import assert from 'assert';

describe('Text Verification', () => {
  it('should match displayed text with input text', async () => {
    const textButton = await $('~Text Button');
    await textButton.waitForDisplayed({ timeout: 30000 });
    await textButton.click();

    const textInput = await $('~Text Input');
    await textInput.waitForDisplayed({ timeout: 30000 });
    await textInput.click();
    await textInput.addValue('hello@browserstack.com' + '\n');

    const textOutput = await $('~Text Output');
    await textOutput.waitForDisplayed({ timeout: 30000 });
    const value = await textOutput.getText();

    assert(value === 'hello@browserstack.com');
  });
});
