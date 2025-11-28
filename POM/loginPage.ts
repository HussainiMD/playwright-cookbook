import { Locator, Page } from "playwright";

interface credentials {
    userName: String,
    password: String
}

class loginPage {
    private page: Page;
    private emailInpQuery: String = '#input-email';
    private passwordInpQuery: String = '#input-password';
    private signInBtnQuery: String = 'input[type="submit"]';
    constructor(page: Page) {
        this.page = page;
    }
    async signInWithCredentials({userName, password}:credentials):Promise<void> {
        const emailInpElem:Locator = this.page.locator(this.emailInpQuery.toString());
        const passwordInpElem: Locator = this.page.locator(this.passwordInpQuery.toString());
        await emailInpElem.fill(userName.toString());
        await passwordInpElem.fill(password.toString());
        const signInBtn:Locator = this.page.locator(this.signInBtnQuery.toString());
        await signInBtn.click();
    }
}

export {loginPage}
