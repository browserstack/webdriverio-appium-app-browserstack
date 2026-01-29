import path from 'path';
import { Given, When, Then } from '@wdio/cucumber-framework';

const annotate = async (data: string, level: string = 'info') => {
  await browser.execute(
    `browserstack_executor: {"action":"annotate","arguments":{"data":${JSON.stringify(data)},"level":"${level}"}}`
  );
};

Given('I start the BrowserStack Local tunnel test', async () => {
  await annotate('Starting BrowserStack Local tunnel test');
});

When('I tap the test action button', async () => {
  const searchSelector = await $(
    'android=new UiSelector().resourceId("com.example.android.basicnetworking:id/test_action")'
  );
  await searchSelector.waitForDisplayed({ timeout: 30000 });
  await annotate('Found test action button, clicking now');
  await searchSelector.click();

  const insertTextSelector = await $('android.widget.TextView');
  await insertTextSelector.waitForDisplayed({ timeout: 30000 });
});

When('I wait for the connection status to appear', async () => {
  await annotate('Waiting for connection status to appear');
});

Then('the connection status should show wifi and up and running', async () => {
  let testElement: ReturnType<typeof $> | null = null;

  try {
    const textElement = await $('android=new UiSelector().textContains("active connection is")');
    await textElement.waitForDisplayed({ timeout: 30000 });
    testElement = textElement;
    await annotate('Successfully found connection status element', 'pass');
  } catch {
    const screenshotPath = path.resolve(__dirname, 'screenshot.png');
    await browser.saveScreenshot(screenshotPath);
    console.log('Screenshot stored at ' + screenshotPath);
    await annotate('Error: Cannot find the needed TextView element from app', 'error');
    throw new Error('Cannot find the needed TextView element from app');
  }

  if (!testElement) throw new Error('Connection status element not found');
  const matchedString = await testElement.getText();
  console.log(matchedString);

  const annotationData = JSON.stringify(`Verifying connection details: ${matchedString}`);
  await browser.execute(
    `browserstack_executor: {"action":"annotate","arguments":{"data":${annotationData},"level":"info"}}`
  );

  if (matchedString.indexOf('The active connection is wifi') === -1 || matchedString.indexOf('Up and running') === -1) {
    throw new Error(`Expected connection status to contain wifi and up and running, got: ${matchedString}`);
  }

  await annotate('Test passed: Connection is wifi and up and running', 'pass');
});
