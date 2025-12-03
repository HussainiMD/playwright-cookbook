import {test, expect, APIResponse} from "@playwright/test";

/*this is a DELETE request, it needs user specific API KEY */
/*because this is I cannot use a global/public key for this request. I am NOT putting my key here. Use yours to test code */

/*
PASS api key in command line along with playwright test runner like this...
On Windows: 
    "set api_key=<value>" then run playwright runner "npx playwright test DELETE --project=chromium"
On Linux: use this command 
    api_key=<value> npx playwright test DELETE --project=chromium
 */

test('delete a user', async ({request}) => {
  //read sensitive information from environment  
  const apiKey: string | undefined = process.env.api_key;

  if(!apiKey) {
    console.warn('API Key is not provided as environment variable for node/npm. Use exact key name "api_key" ');
    return;
  }

  const response: APIResponse = await request.delete('https://reqres.in/api/users/894', {
    headers: {      
      "x-api-key": apiKey
    }
  });
  
  expect(response).toBeTruthy();
  expect([200, 204]).toContain(response.status());//returning any of those codes is considered valid
})
