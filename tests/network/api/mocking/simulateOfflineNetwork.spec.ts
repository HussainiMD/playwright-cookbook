import {test, expect, BrowserContext, Page} from "@playwright/test";

test('network is offline', async ({browser}) => {
    /*we need to enable network status simulation on browser context. Then create a new page*/
   const context: BrowserContext = await browser.newContext({
        offline: true
    });

    const newPage: Page = await context.newPage();

    try {
        await newPage.goto('https://playwright.dev/docs/api/class-playwright');
    } catch(err: any) {
        expect(err instanceof Error).toBe(true);
        console.warn(err.message);
        /*looking for specific error message on internet disconnection */
        expect(err?.message.indexOf('ERR_INTERNET_DISCONNECTED') != -1).toBe(true);        
    }
    
    await newPage.close();
    await context.close();
})
