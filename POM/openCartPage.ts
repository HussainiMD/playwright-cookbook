import {test, expect, Response, Locator, Page} from "@playwright/test";

export class OpenCartPage {
    private page: Page;
    private accountBtnQuery: string = '.nav .dropdown';
    private accountBtnFilterTxt: string = 'My Account';
    private loginBtnQuery: string = '.dropdown-menu.dropdown-menu-right';
    private loginBtnFilterTxt:string = 'Login';
    private emailFieldQuery: string =  '#input-email';
    private passwordFieldQuery: string = '#input-password';    

    constructor(page:Page) {
        this.page = page;
        this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');
    }

    async navigateToAccountSection() {
        const accountBtn:Locator = this.page.locator(this.accountBtnQuery).filter({hasText: this.accountBtnFilterTxt, visible: true});
        await accountBtn.click();        
    }

    async navigateToLoginPage() {                
        const loginBtn:Locator = this.page.locator(this.loginBtnQuery).filter({hasText: this.loginBtnFilterTxt, visible: true});
        await loginBtn.click();
        expect(await this.page.title()).toEqual('Account Login');
    }

    async fillUserName(name: string) {
        const emailField:Locator =  this.page.locator(this.emailFieldQuery);
        await emailField.fill(name);
    }

    async fillPassword(pwd: string) {
        const pwdField:Locator =  this.page.locator(this.passwordFieldQuery);
        await pwdField.fill(pwd);
    }

    async clickLoginBtn() {
        const loginBtn:Locator = this.page.locator('input[value="Login"]');
        await loginBtn.click();
        await expect(this.page).toHaveTitle('My Account');
    }

    async checkIfLogoutBtnVisible() {
        const logoutBtn: Locator = this.page.locator(this.loginBtnQuery).filter({hasText: 'Logout', visible: true});
        expect(await logoutBtn.count()).toBe(1);        
    }

}