import {test, expect, Response, Locator} from "@playwright/test";

/*we have to go back to this date on calendar component by mouse clicks*/
/*Change this to test for DIFFERENT dates */
const givenDate: Date = new Date('2025-07-18');

/*Run this in HEADED mode to verify component navigation visually */
 test('mimicking user navigationg calendar component navigation', async ({page}) => {
        
    test.setTimeout(0);//Not going with defaut wait timeout of 30 seconds
    try {
        const navResponse: Response | null = await page.goto('https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo', {waitUntil: "domcontentloaded"}); //ensuring test speed by waiting for DOM instead of full page load

        if(navResponse !== null && navResponse.ok()) {
            const dobInput:Locator = page.getByPlaceholder('Start date');
            const currentDate : Date = new Date();           

            const diffOfYears: number = currentDate.getFullYear() - givenDate.getFullYear();
            const diffOfMonths: number = currentDate.getMonth() - givenDate.getMonth();

            //travel count logic to figure out how many times button has to be clicked
            let travelCount: number = Math.abs(diffOfYears) * 12;            

            await dobInput.focus();

            const datePicker:Locator = page.locator('.datepicker-days');
            let actionBtn: Locator | null = null;            

            //logic to pick left arrow or right arrow button
            if(  diffOfYears > 0 || (diffOfYears == 0 && diffOfMonths > 0)) {
                actionBtn = datePicker.locator('.prev');
                travelCount += diffOfMonths;//add the difference (which could be +ve or -ve)
            }
            else if(diffOfYears < 0 || (diffOfYears == 0 && diffOfMonths < 0)) {
                actionBtn = datePicker.locator('.next');
                travelCount -= diffOfMonths;//substract the difference (which could be +ve or -ve)
            }

            /*Perform the action of mouse clicks*/
            if(actionBtn) {
                for(let idx=0;idx < travelCount; idx++)   {
                    await actionBtn.click();
                    await page.waitForTimeout(1100);
                } 
            }
	
	        //Month and Year are set. Now we will set the day
            const calendarArea: Locator = datePicker.locator('tbody');
            const date = givenDate.getDate();
            
            //dynamic regex as we want to match exact text "2" only (but not "22", "20"..etc)
            const regEx: RegExp = new RegExp('^'+date+'$');

            //current month day which is clickable is being picked
            const dayBtn: Locator = calendarArea.locator('.day:not(.old):not(.new):not(.disabled-date)').filter({hasText: regEx});  //we can give regular expression instead of plain text for ' hasText '

            const count = await dayBtn.count();
            if(count == 0) throw Error('Invalid date selected');

            await dayBtn.click();
            await page.waitForTimeout(5000);
        }
    } catch(e: unknown) {
        if(e instanceof Error)
            console.log('errored out ', e.message);
    }

    page.close();
})