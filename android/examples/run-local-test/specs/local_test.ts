import path from 'path';
import assert from 'assert';

describe('BrowserStack Local Testing', () => {
  it('can check tunnel working', async () => {
    await browser.execute(
      'browserstack_executor: {"action":"annotate","arguments":{"data":"Starting BrowserStack Local tunnel test","level":"info"}}'
    );

    const searchSelector = await $(
      'android=new UiSelector().resourceId("com.example.android.basicnetworking:id/test_action")'
    );
    await searchSelector.waitForDisplayed({ timeout: 30000 });

    await browser.execute(
      'browserstack_executor: {"action":"annotate","arguments":{"data":"Found test action button, clicking now","level":"info"}}'
    );

    await searchSelector.click();

    const insertTextSelector = await $('android.widget.TextView');
    await insertTextSelector.waitForDisplayed({ timeout: 30000 });

    await browser.execute(
      'browserstack_executor: {"action":"annotate","arguments":{"data":"Waiting for connection status to appear","level":"info"}}'
    );

    let testElement: Awaited<ReturnType<typeof $>> | null = null;

    try {
      const textElement = await $('android=new UiSelector().textContains("active connection is")');
      await textElement.waitForDisplayed({ timeout: 30000 });
      testElement = textElement;

      await browser.execute(
        'browserstack_executor: {"action":"annotate","arguments":{"data":"Successfully found connection status element","level":"pass"}}'
      );
    } catch {
      const screenshotPath = path.resolve(__dirname, 'screenshot.png');
      await browser.saveScreenshot(screenshotPath);
      console.log('Screenshot stored at ' + screenshotPath);

      await browser.execute(
        'browserstack_executor: {"action":"annotate","arguments":{"data":"Error: Cannot find the needed TextView element from app","level":"error"}}'
      );

      throw new Error('Cannot find the needed TextView element from app');
    }

    const matchedString = await testElement!.getText();
    console.log(matchedString);

    const annotationData = JSON.stringify(`Verifying connection details: ${matchedString}`);
    await browser.execute(
      `browserstack_executor: {"action":"annotate","arguments":{"data":${annotationData},"level":"info"}}`
    );

    assert(matchedString.indexOf('The active connection is wifi') !== -1);
    assert(matchedString.indexOf('Up and running') !== -1);

    await browser.execute(
      'browserstack_executor: {"action":"annotate","arguments":{"data":"Test passed: Connection is wifi and up and running","level":"pass"}}'
    );
  });
});
