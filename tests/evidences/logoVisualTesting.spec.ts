import {test, expect, Response} from "@playwright/test";

test.only('ensuring logo in specified color', async ({page}) => {
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
