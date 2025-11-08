import {test, expect, chromium, Browser, BrowserContext, Response, Page, Locator} from "@playwright/test";

test('test navigation to new tab after clicking link', async () => {
    /* we need handle of context to listen to PAGE events. So, we cannot use page fixture here */
    const chromeBrowser: Browser = await chromium.launch({channel: 'chrome'});
    const context: BrowserContext = await chromeBrowser.newContext();
    const page: Page = await context.newPage();
    const navResposne: Response|null = await page.goto('https://www.interviewai.io/');
    expect(navResposne).not.toBe(null);    
  
    const links: Locator = page.locator(".chakra-stack > a[href*='twitter']");
    const twitterBtn: Locator =  links.first();

    /*We want both click and page event listening at the same time, so using promise object of JS */
    const newPage:Page =  (await Promise.all([context.waitForEvent('page'), twitterBtn.click()]))[0];    
    expect(newPage.url().toLowerCase()).toContain('interviewai');
    await page.waitForTimeout(2000);
})