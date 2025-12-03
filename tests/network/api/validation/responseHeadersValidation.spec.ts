import {test, expect, Response, APIResponse} from "@playwright/test";

test('verify response headers', async ({request}) => {
  const loginResponse: APIResponse = await request.post('https://api.demoblaze.com/login', {
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      "username": "NEW USER",      
      "password": "pass$123"
    }
  });

  /*status check to be OK */
  await expect(loginResponse).toBeOK();
  const loginRespHeaders: Object =  loginResponse.headers();
  
  expect('content-type' in loginRespHeaders).toBe(true);

  const contentType: String = loginRespHeaders['content-type'] as String;
  expect(contentType).toContain('json'); //partial string match
})
