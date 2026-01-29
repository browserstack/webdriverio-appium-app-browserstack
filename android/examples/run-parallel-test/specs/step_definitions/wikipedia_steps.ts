import { Given, When, Then } from '@wdio/cucumber-framework';

Given('I skip the onboarding', async () => {
  const skipButton = await $(
    'android=new UiSelector().resourceId("org.wikipedia.alpha:id/fragment_onboarding_skip_button")'
  );
  await skipButton.waitForDisplayed({ timeout: 30000 });
  await skipButton.click();
});

When('I search for {string}', async (searchTerm: string) => {
  const searchSelector = await $('~Search Wikipedia');
  await searchSelector.waitForDisplayed({ timeout: 30000 });
  await searchSelector.click();

  const insertTextSelector = await $(
    'android=new UiSelector().resourceId("org.wikipedia.alpha:id/search_src_text")'
  );
  await insertTextSelector.waitForDisplayed({ timeout: 30000 });
  await insertTextSelector.addValue(searchTerm);
  await browser.pause(5000);
});

Then('I should see search results', async () => {
  const allProductsName = await $$('android.widget.TextView');
  const count = await allProductsName.length;
  if (count <= 0) {
    throw new Error('Expected at least one search result');
  }
});
