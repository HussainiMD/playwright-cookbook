import {test, expect, Response, Locator} from "@playwright/test";

test('demonstration of various options under role (accessibility) based selectors', async ({page}) => {
    const navResponse: Response|null = await page.goto('https://testpages.herokuapp.com/pages/forms/html-form/');
    expect(navResponse).not.toBe(null);

    /*picking top level heading on page */
    const heading:Locator = page.getByRole('heading', {level: 1});
    expect(await heading.count()).toBe(1);
    
    /*pick all input boxes on page */
    const userName:Locator = page.getByRole('textbox');
    expect(await userName.count()).toBeGreaterThan(0);
    
    /*pick specific(name) button */
    const cancelBtn:Locator = page.getByRole('button', {name: 'cancel', exact: false});
    expect(await cancelBtn.count()).toBeTruthy();    
    
    /*unselected checboxes on page */
    const boxes:Locator = page.getByRole('checkbox', {checked: false});
    expect(await boxes.count()).toBe(2);

    /*pick multi select container first then get only selected options */
    const multiSelect:Locator = page.locator('[name="multipleselect[]"]');
    const multiSelected:Locator = multiSelect.getByRole('option', {selected: true});
    expect(await multiSelected.count()).toBeGreaterThan(0);
})