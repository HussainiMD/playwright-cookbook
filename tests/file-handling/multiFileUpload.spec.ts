import path from "path";
import {test, expect, Response, Locator} from "@playwright/test";

/*Run this in HEADED mode for verification */
test('verifying multiple file upload feature', async ({page}) => {

    /*using NodeJS PATH library for easier PATH navigation */
    const dataDir: string = path.join(__dirname, '../../data/');

    const nav: Response| null = await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');
    if(nav !== null && nav.ok()) {
        const fileUploadBtn: Locator = page.locator('id=filesToUpload');

        /*this path is relative to the path from where script is being executed NOT relative to the current test script file */
        await fileUploadBtn.setInputFiles([
            path.join(dataDir,'eciPageScreenshot.jpg'),
            path.join(dataDir, 'Lambdainfo.txt')
        ]);

        await page.pause();
    }
    
    page.close();
})