import {test, expect, Response, Locator, Download} from "@playwright/test";

test('testing file download', async ({page}) => {
    test.slow();
    const navResponse: Response | null = await page.goto('https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo');
    if(navResponse !== null && navResponse.ok()) {
        const textBox: Locator = page.locator('#textbox');
        await textBox.pressSequentially('PlayWright generated sample file text'); //this is need for our AUT is built around keydown event
        const createFileBtn: Locator = page.locator('#create');
        await createFileBtn.click();
        const links:Locator = page.locator('a');
        const downloadBtn:Locator = links.getByText('Download', {exact: true});

        //similar to multi window handling, we need both to START at once
        const [downloadFile] : [Download, void]= await Promise.all([page.waitForEvent('download'), downloadBtn.click()]);
        //notice that we are using  response returned from first arugument to all() function which is waitForEvent
        expect(downloadFile.suggestedFilename()).toEqual('Lambdainfo.txt') 

        await page.pause();
    }
    page.close();
})