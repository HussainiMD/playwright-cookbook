import {expect, test, Response, Locator} from "@playwright/test";

test('showcasing various locators/selector options in playwright', async ({page}) => {
    const navResponse: Response|null = await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register', {waitUntil: 'domcontentloaded'});
    expect(navResponse).not.toBe(null);
    const pageTitle:string  = await page.title();
    const titleRegEx:RegExp = new RegExp('^register', 'i');
    expect(titleRegEx.test(pageTitle)).toBe(true);
    
    /*CSS selectors*/
    const firstName:Locator =  page.locator('#input-firstname'); //by ID
    await firstName.fill('hello Mr.');

    const email:Locator = page.locator('.form-control[name="email"]'); //by CLASS
    await email.fill('test-script@myMail.com');

    const password:Locator = page.locator('input[name="password"]');//by HTML TAG NAME
    await password.fill('wrongpasscode');

    const agreementBtn: Locator = page.locator('*[name="agree"]');//by wild card ATTRIBUTE
    await agreementBtn.click();

    const subscribeBtn: Locator = page.locator('xpath=//*[@id="content"]/form/fieldset[3]/div/div/label[1]/input'); //by xpath
    await subscribeBtn.click();

    const searchBar: Locator = page.locator('.form-control.input-lg'); //selector CHAINING
    await searchBar.fill('laptop');
    

    /*LOCATORS - specific to playwrigh*/
    const confirmPassword:Locator = page.locator('id=input-confirm');//by name-value property 
    await confirmPassword.fill('wrongpasscode');

    const lastName:Locator = page.locator('css=[type=text][name=lastname]');
    await lastName.fill('Mighty Raju');

    const continueBtn:Locator = page.locator('text=continue');//most useful. grab by visual text shown
    await continueBtn.click();

    await page.waitForTimeout(3000);//RUN this test in HEADED MODE to visually inspect above code working
})