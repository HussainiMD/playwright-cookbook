import {test, expect, Response, Locator} from "@playwright/test";

/*Run this in HEADED mode for verification */
test('WITHOUT actual file, uploading DYNAMIC content on the fly', async ({page}) => {
    const nav: Response| null = await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');
    if(nav !== null && nav.ok()) {
        const fileUploadBtn: Locator = page.locator('id=filesToUpload');
        /*this path is relative to the path from where script is being executed NOT relative to the current test script file */
        await fileUploadBtn.setInputFiles({
            name: 'userComment.txt',
            mimeType: 'text/plain',
            buffer: Buffer.from('Your Product is AWESOME!!')
        });
        await page.pause();
    }
    page.close();
})