
import { test, expect, APIResponse } from "@playwright/test";
test.describe.configure({mode: "serial"});  //this is important as we intend to do CRUD in sequential  manner
const pageNum = 2;

test('get records', async ({page, request}) => {    
    const apiResponse: APIResponse = await request.get(`https://reqres.in/api/users?page=${pageNum}`, {
        headers: {      
            'x-api-key': 'reqres-free-v1'//api key is mandatory 
        }
    });
    
    expect(apiResponse.status()).toBe(200);
    
    const apiResponseObj:Object = await apiResponse.json();    
    expect(apiResponseObj.page).toBe(pageNum);
})
