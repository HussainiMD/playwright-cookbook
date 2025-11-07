import {test, expect, Response} from "@playwright/test";
import fs from "fs";/* node js based file system interaction module */

test('Take screenshot of a page', async ({page}) => {
    const navResponse: Response | null = await page.goto('https://voters.eci.gov.in');
    
    /* this path is relative to root folder of project but NOT where this test file is */
    const screenshotPath: string = './reports/eciPageScreenshot.jpg';

    await page.screenshot({path: screenshotPath, animations: 'disabled'});
    expect(fs.existsSync(screenshotPath)).toBe(true);//ensuring file is created
})