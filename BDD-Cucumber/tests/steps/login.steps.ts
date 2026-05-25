import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect, Browser, BrowserContext, Page, chromium, Locator } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

Before(async function () {
    browser = await chromium.launch({
        headless: false
    });

    context = await browser.newContext({
        baseURL: 'https://practicetestautomation.com'
    });

    page = await context.newPage();
});

After(async function () {
    await browser.close();
});

/*Same given is used in 2 scenarios hence only step definition is enough */
Given('the user is on login page', async function () {
    const pageNav = await page.goto('/practice-test-login/');

    expect(pageNav).toBeTruthy();
});

When('the user enter valid credentials for the application', async function () {

    const username: Locator = page.locator('#form #username');
    const password: Locator = page.locator('#form #password');
    const submitBtn: Locator = page.locator('#form #submit');

    await username.fill('student');
    await password.fill('Password123');

    await submitBtn.click();
});

Then('the user should see the successful login message', async function () {

    const container: Locator = page.locator('#main-container');

    await expect(container).toHaveText(/success/i);
});


When('the user enter invalid Password for existing user',  async () => {
    const username:Locator = page.locator('#form #username');
    const password:Locator = page.locator('#form #password');
    const submitBtn: Locator = page.locator('#form #submit');
    await username.fill('student');
    await password.fill('incorrectPassword ');
    await submitBtn.click();
})

Then('the application shows a proper error message for denying access', async () => {
    const errorMsg: Locator = page.locator('#error');
    await expect(errorMsg).toHaveText(/invalid/i);
    await expect(errorMsg).toBeVisible();
})