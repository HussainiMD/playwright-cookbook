import {test, expect, APIResponse, APIRequestContext, Locator, Response} from "@playwright/test";

interface cartItem {
  id: String,
  prod_id: Number,
  [key: string]: any
}

interface cartObj {
  Items: Array<cartItem>
}

//FUNCTION declaration: fetcing cart details multiple times; hence extracted into a function
async function getCartDetailsForUser(request: APIRequestContext, authToken: String) {
  const viewCartAPIResponse: APIResponse = await request.post('https://api.demoblaze.com/viewcart', {
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      "cookie": authToken,
      "flag": true
    }
  });
  expect(viewCartAPIResponse.status()).toBe(200);
  const cartDetailsObj: cartObj = await viewCartAPIResponse.json();
  expect(cartDetailsObj).toHaveProperty('Items');
  expect(cartDetailsObj['Items']).toEqual(expect.any(Array));
  return cartDetailsObj;
}


/*
Run it ONLY in HEADED mode.
npx playwright test addItem --project=chromium --headed

Here we are combining both UI & API testing feature of playwright. We can use BOTH seameless which is a strength of playwright.

In the first part of below test, we will 
1. login to the UI
2. find "NEXUS" phone (product)
3. Add to the cart

In the later part, we will
1. access CART of the our user
2. for each item ID in cart, we will fetch product details
3. Then verify it to be our product "NEXUS"

P.N: We ensure that CART is empty before adding NEXUS to cart, this ways our test is NOT ambigous.

*/

test('add item to cart from UI and verify it from API', async ({page, request}) => {
  test.setTimeout(60000);
  /*as the cart API is secure, first we will get auth token by authentication */
  const loginAPIResponse:APIResponse = await request.post('https://api.demoblaze.com/login', {
    headers: {
      "Content-Type": "application/json"
    },
    data: {
      "username": "NEW USER",
      "password": "cGFzcyQxMjM="
    }
  });
  await expect(loginAPIResponse).toBeOK();
  const authCodeStr: String = await loginAPIResponse.json();
  expect(authCodeStr.includes(':')).toBe(true);
  const authCode: String = authCodeStr.split(':')[1].trim();
  

  /*EMPTY THE CART FIRST*/

  /* We wil get all cart item IDs first*/
  let cartDetailsObj: cartObj = await getCartDetailsForUser(request, authCode);
  const cartItemIds: Array<String> = cartDetailsObj.Items.map(item => item.id) ?? [];
  console.log(`${cartItemIds.length} number of item(s) in cart before deletion`);


  //Delete each item from cart in PARALLEL, that's why using "promise.all()"

  const deleteItemReqs: Array<Promise<APIResponse>> = new Array<Promise<APIResponse>>();
  cartItemIds.forEach(itemId => {
    const deleteItemReq: Promise<APIResponse> = request.post('https://api.demoblaze.com/deleteitem', {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "id": itemId
      }
    });
    deleteItemReqs.push(deleteItemReq);
  })
  const deleteItemResponses: Array<APIResponse> = await Promise.all(deleteItemReqs);

  deleteItemResponses.forEach(resp => expect(resp.status()).toBe(200));
  

  /*NOW ADDING ITEMS FROM UI to the Cart*/

  const pageResponse : Response | null = await page.goto('https://demoblaze.com/');
  expect(pageResponse).not.toBeNull();
  const loginBtn: Locator = page.locator('#login2');
  expect(loginBtn).toBeDefined();
  expect(loginBtn).toBeVisible();
  await loginBtn.click({button: 'left'});    
  await page.locator('#logInModal').waitFor({state: 'visible'})
  const loginForm: Locator = page.locator('#logInModal');
  expect(loginForm).toBeTruthy();  

  const userNameField: Locator = loginForm.locator('#loginusername');
  const passwordField: Locator = loginForm.locator('#loginpassword');
  expect(userNameField).toBeEnabled();
  expect(passwordField).toBeEnabled();  
  await userNameField.fill('NEW USER');
  await passwordField.fill('pass$123');
  const loginFormBtn:Locator = loginForm.locator('.modal-footer .btn-primary');
  expect(loginFormBtn).toBeEnabled();

  await 
  loginFormBtn.click();
  const userBtn: Locator = page.locator('#nameofuser');
  expect(userBtn).toBeVisible();    
  await page.waitForLoadState('domcontentloaded');

/* here we have hard coded item name/title to search and add NEXUS */
  const item : Locator = page.locator('.card').filter({visible: true, hasText: 'Nexus'}).filter({hasText: '6'}).locator('a').first();
  await item.click();
  await page.getByRole("link", {disabled: false, name: 'Add to cart'}).waitFor({state: 'visible'});
  const addToCart: Locator = page.getByRole("link", {disabled: false, name: 'Add to cart'});
  await addToCart.click();

  const cartBtn:Locator = page.locator('#navbarExample #cartur');
  expect(cartBtn).toBeEnabled();
  await cartBtn.click();
  await page.waitForTimeout(5000);

  /* now get cart details and again to check if the product added from UI is added to backend (API) */
  cartDetailsObj = await getCartDetailsForUser(request, authCode);
  let isProductFound: boolean = false;
  const cartProductIds: Array<Number> = cartDetailsObj.Items.map(item => item.prod_id);

  //now cart API does NOT provide product names. It provided only product id; so we have to query product api to get details
  for(let idx=0; idx < cartProductIds.length; idx++) {
    const productAPIResponse: APIResponse = await request.post('https://api.demoblaze.com/view', {
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        "id": cartProductIds[idx]
      }
    });
    expect(productAPIResponse.ok()).toBe(true);
    const productDetails: Object = await productAPIResponse.json();        

  /* in UI testing code, we have chosens product as NEXUS so checking for that. Ideally we can hold this name in a variable and use it both places for better code quality*/
    if('title' in productDetails && (/nexus/i).test(productDetails.title)) {
       isProductFound = true;
       break;
    }
  }
  expect(isProductFound).toBe(true);
})
