var assert = require('assert');

describe('Text Verification', function () {
  it('should match displayed text with input text', function () {
    var textButton = $(`~Text Button`);
    textButton.waitForDisplayed({ timeout: 30000 });
    textButton.click();

    var textInput = $(`~Text Input`);
    textInput.waitForDisplayed({ timeout: 30000 });
    textInput.click()
    textInput.addValue("hello01@browserstack.com"+"\n");

    var textOutput = $(`~Text Output`);
    textOutput.waitForDisplayed({ timeout: 30000 });
    var value = textOutput.getText();

    if (value === "hello01@browserstack.com")
      assert(true)
    else
      assert(false)
    
    var back = $('~UI Elements');
    back.click();
  });
});
