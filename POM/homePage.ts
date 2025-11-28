import {Page, Locator} from "@playwright/test";

export default class homePage {
    private page:Page;
    private searchBoxQuery: string = '#search > input[name="search"]';
    private searchButtonQuery: string = '#search button[type="button"]';
    private firstItemQuery: string = '.product-layout:first-of-type';
    private itemPriceQuery: string = '.price';
    private cartBtnQuery:string = '#cart > .dropdown-toggle';
    private viewCartBtnQuery:string = '.dropdown-menu a[href*="checkout/cart"]';

    constructor(page: Page) {
        this.page = page;
    }

    async fetchItemsOnPage(name: string): Promise<void> {
       const searchBox:Locator = this.page.locator(this.searchBoxQuery);  
       await searchBox.fill(name);
       const searchBtn:Locator = this.page.locator(this.searchButtonQuery);
       await searchBtn.click();
    }

    async addItemToCart(name: string): Promise<void> {
        await this.fetchItemsOnPage(name);
        const foundItemContainer:Locator = this.page.locator(this.firstItemQuery);
        if(await foundItemContainer.count()) {
            const addToCartBtn:Locator = foundItemContainer.getByText('Add to Cart');
            await addToCartBtn.click();
        } else {
            console.warn(`"${name}" was NOT found after searching using product search box on the home page`);    
            throw new Error(`"${name}" was NOT found after searching using product search box on the home page`);
        }
    }

    async getItemPrice(name: string): Promise<number> {        
        const foundItemContainer:Locator = this.page.locator(this.firstItemQuery);
        if(await foundItemContainer.count()) {
            const priceText:string | null= await foundItemContainer.locator(this.itemPriceQuery).textContent();
            const priceRegExArray: any = priceText?.match(/[$]\d+/);    
            const priceOfItem: number = parseInt(priceRegExArray[0].slice(1));            
            if(!priceOfItem) throw new Error('Unable to extract price of the item');
            return priceOfItem;        
        } else throw new Error(`"${name}" was NOT found after searching using product search box on the home page`);
    }
    
    async clickCart(): Promise<void> {
        const cartBtn:Locator = this.page.locator(this.cartBtnQuery);
        await cartBtn.click();
        const viewCartBtn:Locator =  this.page.locator(this.viewCartBtnQuery);
        await viewCartBtn.click();
    }
}