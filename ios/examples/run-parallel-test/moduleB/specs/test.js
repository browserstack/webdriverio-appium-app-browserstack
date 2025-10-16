const assert = require('assert');

describe("BStackDemo Tests Module B", () => {
  before(async () => {
    var textButton = await $(`~Text Button`);
    await textButton.waitForDisplayed({ timeout: 30000 });
    await textButton.click();

    var textInput = await $(`~Text Input`);
    await textInput.waitForDisplayed({ timeout: 30000 });
    await textInput.click()
    await textInput.addValue("hello@browserstack.com"+"\n");

    var textOutput = await $(`~Text Output`);
    await textOutput.waitForDisplayed({ timeout: 30000 });
    var value = await textOutput.getText();
  });

  it("flaky test - passes and fails intermittently", async () => {
    assert(Math.random() > 0.3, 'Flaky test failed');
  });

  it("always failing test - missing element 1", async () => {
    // Try to click a non-existent element, which should fail
    const nonExistent = await $(`~non-existent-1`);
    await nonExistent.waitForDisplayed({ timeout: 3000 });
    await nonExistent.click(); // Will fail
  });

  it("always passing test - example C", async () => {
    assert.equal(true, true);
  });

  it("always failing test - same stacktrace 1", async () => {
    // Try to click a non-existent element, which should fail (same selector as below)
    const nonExistent = await $(`~common-error`);
    await nonExistent.waitForDisplayed({ timeout: 3000 });
    await nonExistent.click(); // Will fail
  });

  it("always failing test - same stacktrace 2", async () => {
    const nonExistent = await $(`~common-error`);
    await nonExistent.waitForDisplayed({ timeout: 3000 });
    await nonExistent.click(); // Will fail
  });

  it("always passing test - example D", async () => {
    assert.equal(true, true);
  });

  it("always passing test - example A", async () => {
    assert.strictEqual(1 + 1, 2, 'This test should always pass');
  });

  it("Test with framework-level retry - 2 retries configured", function () {
    this.retries(2); // Framework-level retry
    const randomOutcome = Math.random() > 0.7;
    if (!randomOutcome) {
      throw new Error("Test failed, retrying...");
    }
  });

  it("Another Test with framework-level retry - 2 retries configured", function () {
    this.retries(2); // Framework-level retry
    const randomOutcome = Math.random() > 0.7;
    if (!randomOutcome) {
      throw new Error("Test failed, retrying...");
    }
  });

  it("always passing test - example B", async () => {
    assert.strictEqual("Browser" + "Stack", "BrowserStack", 'This test should always pass');
  });
});
