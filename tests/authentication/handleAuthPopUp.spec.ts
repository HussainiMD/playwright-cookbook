import {expect, test, Locator} from "@playwright/test";

//URL in browser shows POP UP for user authentication
test('Testing classing username & password based authentication', async ({page}) => {
    /*
    More Simpler way is to do this... 
    page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');
    */
    
    const encodedCreds:string = btoa('admin:admin');
    await page.setExtraHTTPHeaders({Authorization: 'Basic '+encodedCreds});//adding Auth Headers
    await page.goto('https://the-internet.herokuapp.com/basic_auth')

    const userMsg:string = await page.locator('#content > .example > p').innerText();
    expect(userMsg).toContain('Congratulations');    
})