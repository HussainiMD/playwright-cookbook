import {test, expect, APIResponse} from "@playwright/test";
const pageNum: number = 1;

/*Expected response JSON object returned by API */
interface ResponseObjectType {
    page: number,
    data: Array<any>,
    [key: string]: any
}

test.describe.configure({retries: 3});

test('get records', async ({page, request}) => {    
    const apiResponse: APIResponse = await request.get(`https://reqres.in/api/users?page=${pageNum}`,{
        headers: {
            'x-api-key':'reqres-free-v1'
        }
    });
    
    /*response status is OK */
    expect(apiResponse.status()).toBe(200);
    const apiResponseObj:ResponseObjectType = await apiResponse.json();
    
    expect(apiResponseObj.page).toBe(pageNum);
    expect(apiResponseObj.data).toEqual(expect.any(Array));//all JSON data types can be verified like this
})