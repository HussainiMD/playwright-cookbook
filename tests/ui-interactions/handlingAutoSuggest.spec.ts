import {test, expect, Response, Locator} from "@playwright/test";

/*This test has to be run in HEADED mode to observe the script interacting with search box*/
test('selection of an item from the search on the go input box', async ({page}) => {
    const nav : Response | null = await page.goto('https://www.redbus.in/');

    if(nav === null || !nav.ok()) {
        console.warn('Unable to navigate to the REDBUS page');
        page.close();
        return;
    }

    try {
        const widgetContainer: Locator = page.locator('div[data-autoid="searchWidget"]');
        const srcDestWrapper: Locator = page.getByRole('button',{name: 'From'});
        await srcDestWrapper.click();

        //Waiting for the search box to appear on the web page. By design it is appearing after some delay of page load
        await page.waitForSelector('input[id="srcDest"]');
        
        //above waitForSelector returns HTMLElement object, which I cannot use as I need locator, so locating again with locator function
        const fromInput:Locator = page.locator('input[id="srcDest"]');
        await fromInput.focus();
        await fromInput.fill('Delhi');
        await page.waitForTimeout(2500);

        /*from the list of dynamic suggestions, we are picking an area callled "Majnu" */
        const suggestionsContainer:Locator = page.locator('div[class^="searchSuggestionWrapper"]');
        const suggestItem: Locator = suggestionsContainer.locator('div[class ^= "listItem"]').filter({hasText: 'Majnu'});
        await suggestItem.click();

        await page.pause();
    } catch(e) {console.log(e);}
 
    page.close();
})