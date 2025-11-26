import {test, expect, Response, Locator, chromium, Browser, Page} from "@playwright/test";

/*Run these tests in HEADED mode for visual verification */

//ensuring that these run one after another for easier visual verification
test.describe.configure({mode: "serial"});

test('drag and drop an item', async () => {
    /*using google chrome instead of open source chromium browser */
    const chromeBrowser: Browser = await chromium.launch({headless: false, channel: 'chrome'});
    const page:Page = await chromeBrowser.newPage();
    const navResposne : Response | null = await page.goto('https://jqueryui.com/resources/demos/droppable/default.html');
    
    if(navResposne !== null && navResposne.ok()) {
            await page.waitForTimeout(1500);
            await page.locator('#draggable').dragTo(page.locator('#droppable'));
            await page.pause();
    }

    page.close();
});

test('drag and drop an item by using mouse', async () => {
    /*using google chrome instead of open source chromium browser */
    const chromeBrowser: Browser = await chromium.launch({headless: false, channel: 'chrome'});
    const page:Page = await chromeBrowser.newPage();
    const navResposne : Response | null = await page.goto('https://jqueryui.com/resources/demos/droppable/default.html');
    
    if(navResposne !== null && navResposne.ok()) {
        await page.locator('#draggable').hover();
        await page.mouse.down();
        await page.waitForTimeout(2000);
        
        await page.locator('#droppable').hover();
        await page.mouse.up();

        await page.pause();
    }

    page.close();
})