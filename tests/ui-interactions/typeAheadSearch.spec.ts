import {test, expect, Response, Locator} from "@playwright/test";

/*Run this test in HEADED mode to see type ahead feature working */
test('veifying search as you type functionality', async ({page}) => {
    test.slow(); //3x slower than default
    
    const navResponse: Response | null = await page.goto('https://www.flipkart.com/');
    expect(navResponse).not.toBe(null);
    
    const searchBox : Locator = page.getByPlaceholder('Search for Products, Brands and More');
    await page.waitForTimeout(3000);
    //"delay" is optional argument. By default it is ZERO. Delay is between each letter entered in search box
    await searchBox.pressSequentially('Android', {delay: 500});

    await page.pause();
    page.close();
})