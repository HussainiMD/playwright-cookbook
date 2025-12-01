import {test, expect, APIResponse, request, APIRequestContext, Locator} from "@playwright/test";

/*Test this in HEADED mode */

//shared data across test blocks
let cookiesList: Array<any>;

/*run only once per worker */
test.beforeAll('global hook', async () => {
  const apiContext: APIRequestContext = await request.newContext();    //we can NOT use the request fixture instead we have to use APIRequest object (from top level imports)

  const loginPageAPIResonse:APIResponse = await apiContext.get('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  
  /*Regular Expression to extract token from HTML returned by backend */
  const csrfTokenMatch : RegExpMatchArray | null = (await loginPageAPIResonse.text()).match(/:token="&quot;([^"]+)&quot;"/i);
  if(csrfTokenMatch && csrfTokenMatch.length > 0) {
    const csrfToken:string = csrfTokenMatch[1];    

    const response: APIResponse = await  apiContext.post('https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate', { 
        form: {
            _token: csrfToken,
            username: 'Admin', 
            password: 'admin123'
        },
        headers: {
             "Content-Type": "application/x-www-form-urlencoded",
        }  

    });//observe that we are doing post on "context" NOT on "request" fixture

    expect(response.status()).toBe(200);
  }

  cookiesList = (await apiContext.storageState()).cookies;//extract and store cookies in global variables  
})

/*run before each test */
test.beforeEach('run once for each test hook', async ({context}) => {    
    await context.addCookies(cookiesList);//as we DO NOT have access to "context / page" fixture in beforeAlll hook, we have to do it in beforeEach hook
})

test('navigate to logged in user dashboard', async ({page}) => {        
    /*should be accessible without login prompt*/
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers', {waitUntil: "networkidle"}); //website design is blocking DOM rendering till network request is complete, hence waiting

    const adminBanner:Locator = page.locator('.oxd-topbar-header-title').filter({hasText: 'Admin', visible: true});
    expect(await adminBanner.count()).toBeTruthy();    
})