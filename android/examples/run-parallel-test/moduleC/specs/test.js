const assert = require('assert');

describe("BStackDemo Tests Module C", () => {
  before(async () => {
    var skipButton = await $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/fragment_onboarding_skip_button")');
    await skipButton.waitForDisplayed({ timeout: 30000 });
    await skipButton.click();

    var searchSelector = await $(`~Search Wikipedia`);
    await searchSelector.waitForDisplayed({ timeout: 30000 });
    await searchSelector.click();

    // var insertTextSelector = await $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")');
    // await insertTextSelector.waitForDisplayed({ timeout: 30000 });

    // await insertTextSelector.addValue("BrowserStack");
    // await browser.pause(5000);

    // var allProductsName = await $$(`android.widget.TextView`);
    // assert(allProductsName.length > 0, 'Search results should be present');
  });

  it("flaky test - random product selection", async () => {
    const selector = Math.random() > 0.5 ? 'android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")' : 'falseSelector';
    const insertTextSelector = await $(selector);
    await insertTextSelector.waitForDisplayed({ timeout: 30000 });

    // Randomly choose a term that will always have results or never have results
    const randomTerm = Math.random() > 0.5 ? "BrowserStack" : "akjsdhfakjsdhf"; // nonsense string
    await insertTextSelector.addValue(randomTerm);
    await browser.pause(5000);

    const allResults = await $$(`android.widget.TextView`);
    // This assertion will sometimes fail if randomTerm is the nonsense string
    assert(allResults.length > 0);
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

  it("always passing test - example D", async () => {
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