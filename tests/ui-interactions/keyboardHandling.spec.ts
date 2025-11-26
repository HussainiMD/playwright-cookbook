import {test, expect, Response, Locator} from "@playwright/test";

/*Run this in HEADED mode to watch script in action */
test('mimic deletion of a word as done by a regular user', async ({page}) => {
    const navResponse: Response | null = await page.goto('https://www.google.com/');
    expect(navResponse).not.toBe(null);
    const searchForm:Locator = page.getByRole("search");
    const searchBox:Locator = searchForm.getByRole("combobox", {name: "search", exact: false});
    expect(await searchBox.count()).toEqual(1);
    await searchBox.focus();

    await page.keyboard.type('Hello World!');
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(1500);

    await page.keyboard.down('Shift');
    for (let i = 0; i < ' World'.length; i++)
        await page.keyboard.press('ArrowLeft');
    await page.keyboard.up('Shift');
    await page.waitForTimeout(1500);

    await page.keyboard.press('Backspace');//Deleting "World"; Result text will end up saying 'Hello!'
    await page.waitForTimeout(1500);
    page.close();
})