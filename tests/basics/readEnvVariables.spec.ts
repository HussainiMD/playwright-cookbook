import { test, expect, Browser, BrowserContext, Page, Response, Locator } from "@playwright/test";
/*ensure dotenv (npm) library is installed: npm install dotenv --save */
import dotenv from 'dotenv';

// because I did not put ".env" in ROOT folder, I configured whole path.
// Debug (is true) is to see if there are any issues.
dotenv.config({ path: './data/autCredentials.env', debug: true });

test('pulling environment variables', ({ page: Page }) => {
    console.log(process.env.USERID);
});
