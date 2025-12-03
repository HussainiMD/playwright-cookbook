import { test, expect, APIResponse, APIRequest, APIRequestContext } from "@playwright/test";

const pageNum = 2;

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


