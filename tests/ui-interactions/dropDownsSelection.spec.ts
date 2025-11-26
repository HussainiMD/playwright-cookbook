import {expect, test, Response, Locator} from "@playwright/test";

/*Run this in HEADED mode to watch the selections change */
test('handling of drop down selections on a page', async ({page}) => {
    const navResponse: Response | null = await page.goto('https://testpages.herokuapp.com/pages/forms/html-form/');
    expect(navResponse).not.toBe(null);
    const dropdownSelector:Locator = page.locator('select[name="dropdown"]');

    //ensuring that selector box is visible in view port
    await dropdownSelector.focus();
    await dropdownSelector.scrollIntoViewIfNeeded();
    
    //Highligh the selector by a RED BORDER for easier visual inspection
    await page.evaluate((el) => {        
        if(el) {
            el.style.outline = '2px dotted red';
            el.style.outlineOffset = '5px';
        }
    }, await dropdownSelector.elementHandle());
    
    
    /*Slowing down the script so that we humans can watch the change happening */
    await dropdownSelector.selectOption('dd2');
    await page.waitForTimeout(1500);

    await dropdownSelector.selectOption({value: 'dd5'});
    await page.waitForTimeout(1500);

    await dropdownSelector.selectOption({index: 0});
    await page.waitForTimeout(1500);

    await dropdownSelector.selectOption({label: 'Drop Down Item 6'});
    await page.waitForTimeout(1500);
})