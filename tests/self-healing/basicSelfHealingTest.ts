/*This is sample snippet of how auto wait / self healing works */

import {test, expect, Page, Locator} from "@playwright/test";

const usernameInputSelector = "#username";
//we will have series of selectors which are used as fall back for locating same element
const usernameInputSelectors = ["#username", 'input[name="username"]', ".username", "//*[@id='username']"];

async function findValidElement(page: Page, locators: string[]): Promise<Locator | null> {
    let validElement: Locator | null = null;
    const TIMEOUT_MS = 5000;

    for (const locator of locators) {
        try {
            const element = page.locator(locator);
            await element.waitFor({ state: 'attached', timeout: TIMEOUT_MS });
            validElement = element;
            console.info(`Found valid element with locator: ${locator}`);
            break; // Exit loop if valid element found
        } catch (error) {
            console.error(`Invalid locator: ${locator}`);
        }
    }

    if (!validElement) {
        console.error("All locators are invalid");
    }

    return validElement;
}


async function fillUsername_selfheal(username: string) {
    let usernameInputLocator = await findValidElement(this.page, this.usernameInputSelectors);
    await usernameInputLocator?.fill(username);
    const enteredValue = await usernameInputLocator?.inputValue();
    expect(enteredValue).toBe(username);
}
