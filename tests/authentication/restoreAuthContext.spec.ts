/*This test is dependend on auth json file have data of active session. To update it with active session data run "storeAuthContext" test file before running this test */
/*Run this in HEADED mode as resoring of auth is not working. I am yet to debug it */
import {test, expect, Response, Locator, Browser, Page, BrowserContext, chromium} from "@playwright/test";
import {OpenCartPage} from "../../POM/openCartPage";

test('verifying restoring of auth session using file', async ({browser}) => {
    /*We are adding auth JSON to browser context for pre-authentication */
    const browserContext: BrowserContext = await browser.newContext({storageState: './tests/authentication/data/opencart-authstate.json'});
    const page:Page = await browserContext.newPage();
    const cartPage:OpenCartPage = new OpenCartPage(page);
    await cartPage.navigateToAccountSection();
    //only if login is successful we will see logout button
    await cartPage.checkIfLogoutBtnVisible();    
})