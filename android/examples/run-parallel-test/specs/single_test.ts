import assert from 'assert';

describe('Search Wikipedia Functionality', () => {
  it('can find search results', async () => {
    const skipButton = await $(
      'android=new UiSelector().resourceId("org.wikipedia.alpha:id/fragment_onboarding_skip_button")'
    );
    await skipButton.waitForDisplayed({ timeout: 30000 });
    await skipButton.click();

    const searchSelector = await $('~Search Wikipedia');
    await searchSelector.waitForDisplayed({ timeout: 30000 });
    await searchSelector.click();

    const insertTextSelector = await $(
      'android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")'
    );
    await insertTextSelector.waitForDisplayed({ timeout: 30000 });

    await insertTextSelector.addValue('BrowserStack');
    await browser.pause(5000);

    const allProductsName = await $$('android.widget.TextView');
    const count = await allProductsName.length;
    assert(count > 0);
  });
});
