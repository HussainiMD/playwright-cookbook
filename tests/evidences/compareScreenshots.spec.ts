import {test, expect, Response} from "@playwright/test";

/*This will FAIL for first time as it has to record the screenshot for first time */
test('comparing screenshots', async ({page}) => {
    test.setTimeout(500000);
    const navResponse: Response | null = await page.goto('https://www.google.com', {waitUntil: 'domcontentloaded'});
    expect(navResponse).toBeDefined();
    await expect(page).toHaveScreenshot();
})
