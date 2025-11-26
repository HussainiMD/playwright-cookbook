import {test, expect, Response, Locator, chromium, Browser, Page} from "@playwright/test";

/*Run this in HDEADED mode to see script magic*/
test('mimic right click/context menu on a web page', async () => {
    /*we are Google Chrome here instead of open source CHROMIUM */
    const chromeBrowser: Browser = await chromium.launch({headless: false, channel: "chrome"});
    const page: Page = await chromeBrowser.newPage();
    const navResponse: Response | null = await page.goto('https://demo.guru99.com/test/simple_context_menu.html');

    if(navResponse !== null && navResponse.ok()) {
            const contextMenuBtn: Locator = page.locator('.context-menu-one');
            await contextMenuBtn.click({button: "right"});
            await page.waitForTimeout(2000);

            const editBtn: Locator = page.locator('.context-menu-icon-edit');
            await editBtn.click();

            const doubleClickBtn: Locator = page.locator('text=Double-Click Me To See Alert');
            await doubleClickBtn.focus();
            await page.waitForTimeout(2000);
                       
            /*handling alerts as they will block scripts */
            page.on('dialog', async (eventObj) => {
                console.log(`seen alert box with message: "${eventObj.message()}"`);
                await eventObj.dismiss();
            });

            await doubleClickBtn.dblclick({button: "left"});
            await page.pause();        
    }

    page.close();//clean exit

})
