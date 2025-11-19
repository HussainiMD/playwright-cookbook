import {test, expect, Response, Locator, ElementHandle} from "@playwright/test";

test('demonstration of chaining of locators', async ({page}) => {
    const navResponse: Response|null = await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
    expect(navResponse).not.toBe(null);
    //first part is css based second is properitary to playwright
    const firstName:Locator = page.locator('css=.form-horizontal >> id=input-firstname');
    await firstName.fill('Bond');
    //pure css child (any level) selector
    const lastName = page.locator('.form-horizontal #input-lastname');
    await lastName.fill('James');
    //by role
    const email:Locator = page.getByRole("textbox", {name:'E-Mail'});
    await email.fill('James-Bond-007@googlemail.com');

    
    await page.pause();//for visual verification in headed mode
    
})