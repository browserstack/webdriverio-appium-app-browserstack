var assert = require('assert');

describe('Log in to Wordpress', function () {
  it('will throw error on invalid login', function () {
    var logInButton = `~Log In`;
    browser.waitForVisible(logInButton, 30000);
    browser
      .element(logInButton)
      .click();

    var emailSelector = `~Email address`;
    browser.waitForVisible(emailSelector, 30000);
    browser
      .element(emailSelector)
      .click()
      .keys("hello03@browserstack.com");

    browser.element(`~Next`).click().pause(5000);

    var errorMessage = `~This email address is not registered on WordPress.com.`;
    var error = browser.element(errorMessage).value;
    assert(error.ELEMENT.length > 0);

    browser
      .element(`~Back`).click()
      .pause(3000);
  });
});
