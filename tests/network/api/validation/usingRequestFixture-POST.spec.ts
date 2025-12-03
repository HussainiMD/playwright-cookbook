import {test, expect, APIResponse} from "@playwright/test";

/*this is a CREATE request, it needs user specific API KEY */
/*because this is I cannot use a global/public key for this request. I am NOT putting my key here. Use yours to test code */

/*
PASS api key in command line along with playwright test runner like this...
On Windows: 
    "set api_key=<value>" then run playwright runner "npx playwright test POST --project=chromium"
On Linux: use this command 
    api_key=<value> npx playwright test POST --project=chromium
 */
test('create a new user', async ({request}) => {  
  //read sensitive information from environment  
  const apiKey: string | undefined = process.env.api_key;

  if(!apiKey) {
    console.warn('API Key is not provided as environment variable for node/npm. Use exact key name "api_key" ');
    return;
  }

  const response: APIResponse =  await request.post('https://reqres.in/api/users', {
    headers: {
        'x-api-key': apiKey, //api key is mandatory         
    },
    data: {
        name: 'Hussaini',
        job: 'SDET'
    }

  });

  expect(response.status()).toBe(201);//verifying if create user is successful
  const resultJSON: Object = await response.json();
  
  expect(resultJSON).toBeTruthy;//ensuring that we got valid object
  expect(resultJSON).toHaveProperty('id'); // notice how we verified tha object property
  expect(parseInt(resultJSON.id)).toEqual(expect.any(Number));
})