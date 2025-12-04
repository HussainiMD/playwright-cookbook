import {test, expect, Locator} from "@playwright/test";

const listItems:Array<String> = ["Mandarin","Tangerine","Clementines"];

function getMockJSON(itemsList: Array<String>): Array<Object> {
  return itemsList.map((item,id) => {
             return {name: item, id}
         })  
}

/* Here we are mockig an API used by the UI */
test("API Mocking test", async ({ page }) => {
   /*Note that this is NOT wild card path match, instead a very specific match*/ 
  page.route(
    "https://demo.playwright.dev/api-mocking/api/v1/fruits",  // this is API end point which is expected to return a JSON
    async (route) => {
      const json:Array<Object> = getMockJSON(listItems);
      await route.fulfill({ json }); //send our mock data in API response
    }
  );

  /*this web page internally hits above Mocked API endpoint */
  await page.goto("https://demo.playwright.dev/api-mocking/"); 
  await page.waitForLoadState('networkidle');

  /*fetching all items from UI and verifying that they are from our mock list (of items) */
  const uiListContainer:Locator = page.locator('xpath=//*[@id="root"]/div/div/div/ul');
  const uiListItems:Array<String> = (await uiListContainer.first().innerText()).split('\n');
  const isContainsAll:boolean = uiListItems.every(item => listItems.includes(item));
  expect(isContainsAll).toBe(true);

});
