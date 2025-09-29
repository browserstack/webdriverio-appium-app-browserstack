const assert = require('assert');

describe('Test Suite', () => {
    before(async () => {
        var skipButton = await $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/fragment_onboarding_skip_button")');
        await skipButton.waitForDisplayed({ timeout: 30000 });
        await skipButton.click();

        var searchSelector = await $(`~Search Wikipedia`);
        await searchSelector.waitForDisplayed({ timeout: 30000 });
        await searchSelector.click();

        var insertTextSelector = await $('android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")');
        await insertTextSelector.waitForDisplayed({ timeout: 30000 });

        await insertTextSelector.addValue("BrowserStack");
        await browser.pause(5000);

        var allProductsName = await $$(`android.widget.TextView`);
        assert(allProductsName.length > 0, 'Search results should be present');
    });

    it('Always Passing Test', () => {
        assert.strictEqual(1 + 1, 2, 'This test should always pass');
    });

    it('Always Failing Test', () => {
        assert.strictEqual("a" + "b", "abc", 'This test should always fail');
    });

    it('Flaky Test', () => {
        const randomValue = Math.random();
        assert.ok(randomValue > 0.5, 'This test is flaky and may fail');
    });

    it('Test with Retries', function () {
        this.retries(2); // Framework-level retries
        const randomValue = Math.random();
        assert.ok(randomValue > 0.8, 'This test retries if it fails');
    });
});
