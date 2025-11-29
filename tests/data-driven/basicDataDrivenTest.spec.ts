import {test, expect, Browser, BrowserContext, Page, Response, Locator} from "@playwright/test";

const users = [{name: 'firstUser', password: 'test'}, {name: 'secondUser', password: 'test'}]

users.forEach(user => {
    /*test case name has to be DYNAMIC */
    test(`login use case of a user with name ${user.name}`, async ({page}) => {
        const navResponse: Response | null = await page.goto('https://www.jiosaavn.com/login');
        if(navResponse !== null && navResponse.ok()) {
            const emalBtn : Locator = page.getByRole("button", {name: "Email"});
            await emalBtn.click();

            const emailInput : Locator = page.locator("form input#email");
            const passwordInput: Locator = page.locator("form input[type='password']");
            await emailInput.fill(user.name);
            await passwordInput.fill(user.password);
            await page.waitForTimeout(3000);
            const captchaTick: Locator = page.getByRole("presentation");
            /*get rendered element dimensions */
            const captchaTickDimensions : null | {x:number ,y:number, width: number, height: number} = await captchaTick.boundingBox();
            if(captchaTickDimensions) {
                await captchaTick.hover(); 
                //calculate center point of the rendered element
                const x = captchaTickDimensions.x + captchaTickDimensions.width/2;
                const y = captchaTickDimensions.y + captchaTickDimensions.height/2;
                await page.mouse.click(x, y);
            }        
        }
        await page.waitForTimeout(5000);
        page.close();
    })
})
