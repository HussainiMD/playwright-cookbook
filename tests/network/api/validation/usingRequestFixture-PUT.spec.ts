import {test, expect, APIResponse} from "@playwright/test";
import dayjs from "dayjs";

/*this is a UPDATE request, it needs user specific API KEY */
/*because this is I cannot use a global/public key for this request. I am NOT putting my key here. Use yours to test code */

/*
PASS api key in command line along with playwright test runner like this...
On Windows: 
    "set api_key=<value>" then run playwright runner "npx playwright test PUT --project=chromium"
On Linux: use this command 
    api_key=<value> npx playwright test PUT --project=chromium
 */

test('update existing user', async ({request}) => {
  //read sensitive information from environment  
  const apiKey: string | undefined = process.env.api_key;

  if(!apiKey) {
    console.warn('API Key is not provided as environment variable for node/npm. Use exact key name "api_key" ');
    return;
  }

  const response: APIResponse = await request.put('https://reqres.in/api/users/894', {
    headers: {      
      "x-api-key": apiKey
    },
    data: {
      job: "AI - SDET"
    }
  });

  expect(response.status()).toBe(200);
  const resultJSON: Object = await response.json();  
  
  expect(resultJSON).toBeInstanceOf(Object);
  expect(resultJSON).toHaveProperty('updatedAt');
  const updatedAtTime: Date = new Date(resultJSON.updatedAt);

  /*calculate differnce in time in milliseconds */
  const diffInMillis:number = Math.abs(updatedAtTime.getTime() - Date.now());
  
  expect(diffInMillis).toBeLessThan(5000); // updated record is within a threshold of 5 seconds 
})

