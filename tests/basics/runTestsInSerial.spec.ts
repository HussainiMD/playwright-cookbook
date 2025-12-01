import { test, Page } from "@playwright/test";

// Run tests in serial mode
test.describe.configure({ mode: "serial" });

let page: Page;

// Define a beforeAll hook to set up the browser context
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    const loginPage = new LoginPage(page);
    const homePage = await loginPage.quickLogin(
        decrypt(process.env.userid!),
        decrypt(process.env.password!)
    );
    await homePage.expectServiceTitleToBeVisible();
    console.info("login is completed");
});

test("Create Contact and Open", async () => {
    const contactPage = new ContactPage(page);
    await contactPage.createNewContact(
        testdata.contactFName,
        testdata.contactLName
    );
    await contactPage.expectContactLabelContainsFirstNameAndLastName(
        testdata.contactFName,
        testdata.contactLName
    );
    await contactPage.findExistingContactByLastName(
        testdata.contactLName
    );
});

test("Create Case Test", async () => {
    const casePage = new CasePage(page);
    await casePage.createNewCaseFromContactDetailPage(
        testdata.caseOrigin,
        testdata.caseProduct,
        testdata.caseType
    );
});

test.afterAll(async () => {
    await page.close();
});
