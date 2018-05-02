var assert = require('assert');

describe('Text Verification', function () {
  it('should match displayed text with input text', function () {
    var textButton = `~Text Button`;
    browser.waitForVisible(textButton, 30000);
    browser
      .element(textButton)
      .click();

    var textInput = `~Text Input`;
    browser.waitForVisible(textInput, 30000);
    browser
      .element(textInput)
      .click()
      .keys("hello@browserstack.com"+"\n");

    var textOutput = `~Text Output`;
    browser.waitForVisible(textOutput, 30000);
    var value = browser.getText(textOutput)

    if (value === "hello@browserstack.com")
      assert(true)
    else
      assert(false)

  });
});
