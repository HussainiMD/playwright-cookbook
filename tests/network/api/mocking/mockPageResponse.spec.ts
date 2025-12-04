import {test, expect} from "@playwright/test";

/*Here we are mocking a website with dummy response. Once configured, we can use "page" fixture across test suite for this behavior */
test('Mocking of a Web Page', async ({page}) => {
  await page.route('https://non-existent.ai/', async (route) => {    
    await route.fulfill({ // this method is send the mocked data
      status: 200,
      contentType: 'text/html',
      body: '<html><body><h1>This is a mocked page</h1></body></html>',
    });
  });

  await page.goto('https://non-existent.ai/');
  expect(await page.innerHTML('body')).toMatch(/mocked/i); 
  page.close();
})
