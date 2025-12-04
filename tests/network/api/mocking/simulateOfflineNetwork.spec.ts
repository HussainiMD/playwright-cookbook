import {test, expect, BrowserContext, Page} from "@playwright/test";

test('network is offline', async ({browser}) => {
   const context: BrowserContext = await browser.newContext({
        offline: true
    });

    const newPage: Page = await context.newPage();

    try {
        await newPage.goto('https://playwright.dev/docs/api/class-playwright');
    } catch(err: any) {
        expect(err instanceof Error).toBe(true);
        console.warn(err.message);
        expect(err?.message.indexOf('ERR_INTERNET_DISCONNECTED') != -1).toBe(true);        
    }

    await newPage.waitForTimeout(4000);
})
