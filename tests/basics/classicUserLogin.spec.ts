import {test, expect, firefox, Browser, BrowserContext, Page, Response, Locator} from "@playwright/test";

test('A simple classic user login test', async () => {
    const ffBrowser:Browser =  await firefox.launch();
    const browserContext: BrowserContext = await ffBrowser.newContext();
    const page:Page = await browserContext.newPage();
    const navResponse: Response | null = await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    
    expect(navResponse).toBeTruthy(); /*ensuring we get valid Response; a truthy value in JS */
    
    const emailInput: Locator = page.locator('#input-email');
    await emailInput.fill('USE_YOUR_TEST_EMAIL');

    const passwordInput: Locator = page.locator('#input-password');
    await passwordInput.fill('USE_YOUR_PASSWORD');

    const loginBtn: Locator = page.locator('[value="Login"]');
    await loginBtn.click({button: "left"});

    await page.waitForTimeout(3000); /*Script is fast, need a moment to notice state of page after login action*/
    await page.close();
    ffBrowser.close();/*no need to wait; faster tests*/
})