import {test, expect} from "@playwright/test";

/* 
Monitoring both REQUEST and RESPONSE of the API 
P.N: 
  single line drawn on console is for seperation between request & response  data
  double line drawn on console is for seperation between each pair of request & response

*/
test.only('API Monitoring example', async ({page}) => {
  test.slow(); //marking it slow as console logging is I/O bound, hence time taking

  /*Tracking HTTP request */
    page.on("request", async (request) => { //attaching event handler to browser events
    console.log(`End Point: ${request.url()}`);
    console.log(`HTTP Method: ${request.method()}`);
    try {
      console.log(`Request Headers: ${JSON.stringify(await request.headersArray())}`);
    } catch(e) {
      console.warn('Got exception while extracting request headers :: ', e);
    }
    console.log('-----------------------------------------------------------------------------------------------------------------');
  });

  /*Tracking HTTP response */
  page.on("response", async (response) => {//attaching event handler to browser events
    console.log(`Response Status: ${response.statusText()}`);
    try {
      console.log(`Response Headers: ${JSON.stringify(await response.allHeaders())}`);
    } catch(e) {
      console.warn('Got exception while extracting response header :: ', e);
    }
    console.log('================================================================================================================');
  });

  await page.goto('http://www.demoblaze.com/', {waitUntil: "networkidle"});  
  await page.close();
})