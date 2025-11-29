import {test, expect, Response, Locator, Page, BrowserContext} from "@playwright/test";
import {OpenCartPage} from "../../POM/openCartPage";

test('saving authorized session state', async ({page}) => {
    const cartPage:OpenCartPage = new OpenCartPage(page);
    await cartPage.navigateToLoginPage();
    await cartPage.fillUserName('playwright.tesht1@gmail.com');
    await cartPage.fillPassword('myTest$123');
    await cartPage.clickLoginBtn();
    const browserContext:BrowserContext = page.context();
    await browserContext.storageState({path: './tests/authentication/data/opencart-authstate.json'});

    
})