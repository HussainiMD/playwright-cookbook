import {test, expect, APIResponse, Response, Locator} from "@playwright/test";

/*Here we are fetching items by calling API directly. And those many items has to be shown on UI to ensure that UI has no bugs */
test('both api and UI testing', async ({page, request}) => {
  /*API testing */
  const apiResponse: APIResponse = await request.get('https://api.demoblaze.com/entries');
  await expect(apiResponse).toBeOK();
  const responseObj: Object = await apiResponse.json();
  expect(responseObj).toBeTruthy();
  const itemsList: Array<Object> = responseObj.Items;
  expect(itemsList).toEqual(expect.any(Array));
  expect(itemsList.length).toBeGreaterThan(0);
  const itemNames: Array<String> = itemsList.map(item => item.title.trim().toLowerCase());//extracting titles which are just names

  /* UI testing */
  const pageNavRespone: Response | null = await page.goto('https://www.demoblaze.com/');
  expect(pageNavRespone).not.toBeNull();
  await page.waitForSelector('div.card .card-title a'); //super important as this check ensured that dom elements on page
  const cards: Locator = page.locator('div.card .card-title a');
  const cardList: Array<Locator> = await cards.all();
  expect(itemNames.length).toBe(cardList.length);  //count of API & UI items matches?
  for(let idx=0; idx < cardList.length; idx++)  { 
    const name = (await cardList[idx].innerText()).trim().toLowerCase();     
    expect(itemNames).toContain(name);//verify the title (name) is in API returned list
  }
  
})
