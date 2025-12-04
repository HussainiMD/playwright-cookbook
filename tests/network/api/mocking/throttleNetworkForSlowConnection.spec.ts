import {test, expect, Page, BrowserContext, CDPSession, Response} from "@playwright/test";

/*
Throttling of NETWORK is supported ONLY on chromium browser. So we have to run this test only on chrome
npx playwright test throttle --project=chromium 

P.N: 
    We cannot use just BrowserContext for throttling. Only offline mode emulation is supported there.
    For full range of network emulation we need to create CDP session on the context
*/
test('network is throttled', async ({page, browser, context}) => {
   const unthrottledNav: Response | null = await page.goto('https://playwright.dev/docs/api/class-playwright');
   expect(unthrottledNav).not.toBe(null);
   
   const perfMetrics: PerformanceEntry =  await page.evaluate(() => performance.getEntriesByType('navigation')[0]);
   const unthrottledPageDuration:number = Math.round(perfMetrics.duration);
   console.log(`unthrottled navigation response duration: ${unthrottledPageDuration}ms`);

   const newContext: BrowserContext = await browser.newContext();//it is NOT working if i use "context" fixture. I need a fresh context here
   const throttledPage: Page = await newContext.newPage();

   /* We need only CDPSession as throttling is supporte only on CHROMIUM browser */ 
   const throttledSession: CDPSession = await newContext.newCDPSession(throttledPage);
  
  /* As such we are not sending anything on network, we are just pushing emulated network conditions for our session */
  await throttledSession.send('Network.emulateNetworkConditions', {
        offline: false,
        latency: 0, //mean NO latency
        downloadThroughput: 100 * 1024/8, //throttled to 12 KBPS speed
        uploadThroughput: -1 //means NO throttling
    })

    /*Link between "throttledPage" and "throttledSession" is INDIRECT and through the CONTEXT, the are co-related */
    await throttledPage.goto('https://playwright.dev/docs/api/class-playwright');
    const throttledPageMetrics: PerformanceEntry = await throttledPage.evaluate(() => performance.getEntriesByType('navigation')[0]);
    const throttledPageDuration:number = Math.round(throttledPageMetrics.duration);
    console.log(`Throttled Page Navigation response duration: ${throttledPageDuration}ms`);

    expect(throttledPageDuration).toBeGreaterThan(unthrottledPageDuration);
    await throttledPage.close();
    await newContext.close();
})