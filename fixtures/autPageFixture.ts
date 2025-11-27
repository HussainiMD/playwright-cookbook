import {test as base, TestType, Page, chromium, Browser, BrowserContext} from "@playwright/test";

type teamAUT = {
    autName: string,
    autPage: Promise<Page>
};

/*Real chrome browser with dark scheme enabled as default. Also provided a base URL */
async function getAUTPage(baseURL: URL) {
    const chromeBrowser: Browser = await chromium.launch({channel: 'chrome'});
    const chromeBrowserContext: BrowserContext = await chromeBrowser.newContext({colorScheme: 'dark', baseURL: baseURL.href});
    const newPage: Page = await chromeBrowserContext.newPage();
    return newPage;
}

const test: TestType<any, any> = base.extend<teamAUT>({
    autName: 'Playwright Official Documenation Website',
    autPage: getAUTPage(new URL('https://playwright.dev/'))
});

export {test}
