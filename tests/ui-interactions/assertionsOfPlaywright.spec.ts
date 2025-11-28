import {test, expect, Response, Locator, chromium, Browser, BrowserContext, Page} from "@playwright/test";

let autPage: Page;

/*AUT is behaving differently in headless mode, hence run these tests in HEADED mode*/

test.describe.configure({mode: "serial"});//we want beforeAll() run only once so ensuring only using 1 worker

test.beforeAll( async ({browser}) => {      
    const browserContext:BrowserContext = await browser.newContext({ignoreHTTPSErrors: true});
    autPage =  await browserContext.newPage();
    const navResponse: Response | null = await autPage.goto('https://www.jiosaavn.com/top-artists');
    expect(navResponse).not.toBe(null);
    // await autPage.pause();
})

test('Element Present or Not testing', async () => {    
    const artists:Locator = autPage.locator('#browse_top_artists > .o-layout__item');
    
    /*artists are expected to be shown on the page */
    await expect(artists).not.toHaveCount(0)
});

test('Element visibility check', async () => {
    const logo:Locator = autPage.locator('#logo');//top left logo
    await expect(logo).toBeVisible();

    const player:Locator = autPage.locator('#music-player');//audio tag on page
    await expect(player).toBeHidden();    
})

test('Element enabled for user actions check', async () => {
    const loginBtn:Locator = autPage.locator('#login');
    expect(loginBtn).toBeEnabled();
})

test('Search box has proper hint', async () => {
    const searchBox:Locator = autPage.locator('#search');

    /*Regular Expression checking if the text has search keyword at least once */
    expect(searchBox).toHaveText(/[search]+/i);
})

test('verify if CSS class is specified', async () => {    
    const searchBoxInput:Locator = autPage.locator('input[role="combobox"]');
    
    /*Regular Express to match exact css class which can occur anywhere in the list. Hiphen is special charcter hence escaped */
    expect(searchBoxInput).toHaveClass(/[form\-control]+/);
})

test('ensure surprise is seen as button by google bots', async () => {
    const surpriseBtn:Locator = autPage.locator('#surprise_me');
    expect(surpriseBtn).toHaveAttribute("role", "button", {ignoreCase: true});
})


test('ensure logo has ID property', async () => {
    const logo:Locator = autPage.locator('.c-logo');
    expect(logo).toHaveId('logo');    
})

test('ensure page title is correct', async () => {
    const title:string = await autPage.title();
    /*Regular Express to match page title text*/
    expect(autPage).toHaveTitle(/[JioSaavn]+/i);
})

test.afterAll(() => autPage.close());