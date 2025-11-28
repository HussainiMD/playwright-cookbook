import {test, expect, Response, Locator} from "@playwright/test";

test('ensuring logo in specified color', async ({page}) => {
    const navResponse: Response| null = await page.goto('https://www.google.com', {waitUntil: 'domcontentloaded'});
    expect(navResponse).toBeTruthy();

    //run this evaluate CODE on browser and get the updated styles object`    
    const logoCSSObj: Object | undefined = await page.evaluate(() => {
        const logoElement = document.querySelector('[role="img"][aria-label="Google"]');
        if(logoElement) {
            const logoElemStyles = window.getComputedStyle(logoElement);
            return logoElemStyles
        }
    })

    expect(logoCSSObj.color).toBe('rgb(31, 31, 31)');
})

test('logo width height verification', async ({page}) => {
    const navResponse: Response | null = await page.goto('https://www.google.com', {waitUntil: 'domcontentloaded'});
    expect(navResponse).toBeTruthy();
    const logoLoc: Locator = page.locator('xpath=//body/div[2]/div[3]/div//*[@role="img"]');
    expect(await logoLoc.count()).toBe(1);

    const logo: Locator = logoLoc.first();
    /*get dimension of the logo from the screen after rendering */
    const logoDimensions:{width: number, height: number, x: number, y: number}|null = await logo.boundingBox();
    expect(logoDimensions).toBeTruthy();
    expect(logoDimensions?.width).toBe(272);
    expect(logoDimensions?.height).toBe(92);
})

