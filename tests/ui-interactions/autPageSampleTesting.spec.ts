import {test} from "../../fixtures/autPageFixture.spec"; //instead of standard, we will import our custom test fixture
import {expect, Page, Locator} from "@playwright/test";

test.only('sample test with predefined AUT page', async ({autName, autPage}) => {
    console.log(autName);
    const page: Page = await autPage;  //await because a promise is being exported from custom fixture
    await page.goto('/');
    console.log(await page.title());
    console.log(page.url());
})