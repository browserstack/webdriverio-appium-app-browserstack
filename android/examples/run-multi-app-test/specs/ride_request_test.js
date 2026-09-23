var assert = require('assert');

// Switch a multiremote instance into its app's WebView context. Unlike raw selenium-webdriver,
// WebdriverIO exposes Appium's context commands natively (getContexts/switchContext) — no
// manual REST calls against the Appium endpoint needed.
async function switchToWebView(instance, appPackage, timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const contexts = await instance.getContexts();
    const webviewContext = contexts.find(
      (c) => typeof c === 'string' && c.includes('WEBVIEW') && c.includes(appPackage)
    );
    if (webviewContext) {
      await instance.switchContext(webviewContext);
      console.log(`[INFO] Switched to WebView context: ${webviewContext}`);
      return;
    }
    await instance.pause(1000);
  }
  throw new Error(`WebView context for ${appPackage} not found within ${timeoutMs}ms`);
}

async function waitForHeadline(instance, expectedText, timeoutMs = 30000) {
  await instance.waitUntil(
    async () => {
      const el = await instance.$('#headline');
      const text = await el.getText();
      return text.includes(expectedText);
    },
    { timeout: timeoutMs, timeoutMsg: `#headline never showed text containing "${expectedText}"` }
  );
}

describe('Ride request multi-app flow', () => {
  it('completes ride request from the customer app through the rider app', async () => {
    // Both sessions are already live at this point — multiremote builds every named
    // capability before the spec runs. Get each into its app's WebView first.
    await switchToWebView(browser.customerApp, 'com.testcompanion.multiapp.customer');
    await switchToWebView(browser.riderApp, 'com.testcompanion.multiapp.rider');

    // STEP 1: Customer app — tap "Request Ride"
    const requestBtn = await browser.customerApp.$('#request-ride-btn');
    await requestBtn.waitForDisplayed({ timeout: 15000 });
    await requestBtn.click();
    console.log('[INFO] Customer: tapped Request Ride');

    // STEP 2: Rider app — wait for the ride request card and tap "Accept Ride"
    const acceptBtn = await browser.riderApp.$('#accept-btn');
    await acceptBtn.waitForDisplayed({ timeout: 30000 });
    await acceptBtn.click();
    console.log('[INFO] Rider: tapped Accept Ride');

    // STEP 3: Customer app — wait for the OTP card and read the OTP
    await waitForHeadline(browser.customerApp, 'Rider confirmed', 35000);
    const otpEl = await browser.customerApp.$('#otp-box');
    const otp = await otpEl.getText();
    assert(otp && otp.length > 0, 'OTP from customer app should not be empty');
    console.log(`[INFO] OTP read from customer app: ${otp}`);

    // STEP 4: Rider app — enter OTP and tap "Start Ride"
    const otpInput = await browser.riderApp.$('#otp-input');
    await otpInput.waitForDisplayed();
    await otpInput.setValue(otp);

    const startBtn = await browser.riderApp.$('#start-ride-btn');
    await startBtn.click();
    console.log('[INFO] Rider: entered OTP and tapped Start Ride');

    // STEP 5: Assert both apps show "Ride started"
    await waitForHeadline(browser.riderApp, 'Ride started', 15000);
    const riderHeadlineEl = await browser.riderApp.$('#headline');
    assert.strictEqual(await riderHeadlineEl.getText(), 'Ride started');

    await waitForHeadline(browser.customerApp, 'Ride started', 15000);
    const customerHeadlineEl = await browser.customerApp.$('#headline');
    assert.strictEqual(await customerHeadlineEl.getText(), 'Ride started');

    console.log('Ride request flow completed successfully');

    await browser.customerApp.execute(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Ride request flow completed successfully"}}'
    );
    await browser.riderApp.execute(
      'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Ride request flow completed successfully"}}'
    );
  });
});
