import {test, expect, Response, Locator} from "@playwright/test";

/*Run this in HEADED mode for verification */
test('single file upload handling', async ({page}) => {
    const nav: Response| null = await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');
    if(nav !== null && nav.ok()) {
        const fileUploadBtn: Locator = page.locator('id=filesToUpload');
        /*this path is relative to the path from where script is being executed NOT relative to the current test script file */
        await fileUploadBtn.setInputFiles('./data/Lambdainfo.txt');
        await page.pause();
    }
    page.close();
})