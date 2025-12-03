import { test, expect, APIResponse, APIRequest, APIRequestContext, request } from "@playwright/test";
test.describe.configure({mode: "serial"});
const pageNum = 2;

/*here we are using "provided" object provided to the test function. Using "playwright" object, we are accessing "request" (of type APIRequest) */
/*"request" in the function parameters is NOT same as "playwright.request". First one is of type APIRequestContext where as later is API Request */
test('get records', async ({page, request, playwright}) => {
    const apiRequest: APIRequest = playwright.request; //returns APIRequest on which there is a newContext() method
    const newContext: APIRequestContext = await apiRequest.newContext({baseURL: 'https://reqres.in'}); //as we need an instance of APIRequestContext for get() calls

    const apiResponse: APIResponse = await newContext.get(`/api/users?page=${pageNum}`, {
        headers: {
            'x-api-key': 'reqres-free-v1'            
        },
    });   
    expect(apiResponse.status()).toBe(200);

    const apiResponseObj:Object = await apiResponse.json();    
    expect(apiResponseObj.page).toBe(pageNum);
})


/*Notice that we are not using the function argument "request" instead we are getting it from top-level imports*/
test("API Testing Get Practice 2", async () => {
  //here this "request" is SAME AS "playwright.request". Both are of type APIRequest
  const reqContext = await request.newContext({
    baseURL: "https://restful-booker.herokuapp.com"
  });

  const resp1 = await reqContext.get("/booking");
  const bookingsArrayy = await resp1.json();
  expect(bookingsArrayy).toBeInstanceOf(Array);
});


