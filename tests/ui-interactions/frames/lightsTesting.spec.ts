import {test, expect, Response, Locator, FrameLocator} from "@playwright/test";

/*as this is light on/off testing, run it in HEADED mode */
test('handling of iframes in a page', async ({page}) => {
    const navResponse: Response | null = await page.goto('https://www.w3schools.com/js/tryit.asp?filename=tryjs_intro_lightbulb', {waitUntil: "domcontentloaded"});
    expect(navResponse).not.toBe(null);
    if(!navResponse?.ok()) throw new Error('Page load failed');

    /*get iFrame and treat as a mini page */
    const resultFrame: FrameLocator = page.frameLocator('#iframeResult');
    const turnOnBtn: Locator = resultFrame.getByText('Turn on the light', {exact: true});
    await page.waitForTimeout(2000);
    await turnOnBtn.click();

    await page.waitForTimeout(2000);
    const turnOffBtn: Locator = resultFrame.getByText('Turn off the light', {exact: true});
    await turnOffBtn.click();

    page.close();
})