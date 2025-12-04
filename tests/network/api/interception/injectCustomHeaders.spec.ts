import {test} from "@playwright/test";

test("Intercepting API request to inject header", async ({ page }) => {

  // Enable request interception
  await page.route("**/*", (route) => {
    // Get the original headers
    const headers = route.request().headers();

    // Add a custom header and continue as usual
    headers["X-Custom-Header"] = "integration-check";    
    route.continue({ headers });
  });

  /*Monitor all requests to extract and log headers*/
  page.on("request", request => {
    console.log(`Request URL is ${request.url()}`);
    console.log(`Request type is ${request.method()}`);
    console.log(`ALL Request headers are ${JSON.stringify(request.headers(), null, 2)}`);
    console.log(`Found custom header ? ${(request.headers())['x-custom-header'] ? 'YES' : 'NO'}`)
    console.log('----------------------------------------------------------------------------');
  });

  await page.goto("http://www.demoblaze.com/");
  await page.waitForLoadState("networkidle");
  await page.close();
});
