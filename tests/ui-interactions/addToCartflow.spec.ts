import {test, expect, Browser, BrowserContext, Page, Locator, Response} from "@playwright/test";
/*demonstration of various ways to import in js*/
import { loginPage } from "../../POM/loginPage";
import homePage from "../../POM/homePage";
import * as cartPage from "../../POM/cartPage";

test('add to cart test', async ({page}) => {    
    const navResponse: Response | null = await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    expect(navResponse).not.toBe(null);
    if(navResponse && !navResponse.ok()) throw new Error('Unable to navigate to the page');

    const testLoginPage:loginPage = new loginPage(page);
    await testLoginPage.signInWithCredentials({userName: 'playwright.tesht1@gmail.com', password: 'myTest$123'});
    const testHomepage:homePage = new homePage(page);

    //now we will get item card. We will extract price from card and match it with what is shown in cart
    const itemName: string = 'samsung'
    await testHomepage.addItemToCart(itemName);
    const itemPrice: number = await testHomepage.getItemPrice(itemName);

    await testHomepage.clickCart(); //here we can return cart page by doing PAGE CHAINING

    const testCartPage:cartPage.default = new cartPage.default(page);
    const cartTotal: number = await testCartPage.getCartTotalAmt();
    expect(cartTotal).toBeGreaterThanOrEqual(itemPrice);
    
    page.close();
})
