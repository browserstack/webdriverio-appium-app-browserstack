var assert = require('assert');

describe('Log in to Wordpress', function () {
  it('will throw error', function () {
    var logInButton = `~Log In`;
    browser.waitForVisible(logInButton, 150000);

    browser.element(logInButton).click().pause(10000)
    browser.element(`~Email address`).click().pause(2000)
    browser.element(`~Email address`).keys("hello3@browserstack.com")
    browser.element(`~Next`).click().pause(5000)

    var errorMessage = `~This email address is not registered on WordPress.com.`
    var error = browser.element(errorMessage).value;
    assert(error.ELEMENT.length > 0);

    browser
      .element(`~Back`).click()
      .pause(3000);
  });
});
