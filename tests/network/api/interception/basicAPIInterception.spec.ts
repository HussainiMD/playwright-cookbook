import {test} from "@playwright/test";

test('API Interception example', async ({page}) => {
  await page.route('**/*',(route) => { //match all requests with wild card match
    const headers = route.request().headers();
    console.log(`---> ${JSON.stringify(headers)}`);
    route.continue();//letting the requests go as usual after reading headers
  })
  await page.goto('http://www.demoblaze.com/', {waitUntil: "networkidle"});
  await page.close();
})
