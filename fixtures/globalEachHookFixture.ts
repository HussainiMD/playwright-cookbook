import {test as base, Page} from "@playwright/test";

interface testWithEachHook {
    autoHooks: void
}

export const test = base.extend<testWithEachHook>(
    {
        /* NOTICE the R.H.S to be an array. First is async function and second is make auto true */
        autoHooks: [ async ({}, use) => {
            //setup here (simply the code of beforeEach hook)
            console.log('log it before each test is executed');     
   
            await use(); //means continue execution of test case code
            
            //tear down (simply the code afterEach hook)
            console.log('log it after each test is executed');
        } , {auto: true} ] //auto means it will execute always upon start of test suite
    } 
    
)
