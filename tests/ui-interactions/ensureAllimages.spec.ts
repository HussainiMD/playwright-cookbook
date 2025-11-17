import {test, expect, Response, Browser, BrowserContext, Page, chromium, Locator} from "@playwright/test";

test('ensuring all images are loaded on page before going ahead with assertions', async () => {
   const chromeBrowser:Browser = await chromium.launch({channel: 'chrome'}); //not chromium but google chrome Browser
   const browserContext:BrowserContext = await chromeBrowser.newContext({baseURL: 'https://www.flipkart.com'});
   const browserPage: Page = await browserContext.newPage();
   const navResponse: Response|null = await browserPage.goto('/mobile-phones-store');
   expect(navResponse).not.toBe(null);
   const allImages:Locator = browserPage.locator('img[src]');
   
   /*ensuring that all the images on the current page are loaded (attached to the DOM) */
   const voidCount: Array<void> = await Promise.all((await allImages.all()).map(img => img.waitFor({state: "attached"})));
   expect(await allImages.count()).toEqual(voidCount.length);
})