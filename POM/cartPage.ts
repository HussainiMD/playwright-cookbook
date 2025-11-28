import {Page, Locator} from "@playwright/test";

class cartPage {
    private page:Page;
    private totalAmountQuery:string = '#content .row  tr:last-child td:last-child';
    constructor(page: Page) {
        this.page = page;
    }
    async getCartTotalAmt(): Promise<number> {        
        const totalAmountTxt:string = await this.page.locator(this.totalAmountQuery).first().innerText();
        const totalAmount:number = parseInt(totalAmountTxt.slice(1));
        return totalAmount;
    }
}

export default cartPage;