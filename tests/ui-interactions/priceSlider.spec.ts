import {test, expect, Response, Locator, Page} from "@playwright/test";

interface BoxDimensions {
    x: number,
    y: number,
    width: number,
    height: number
}

/* we are ensuring that all are numeric values */
async function ensureDimensions(dimObj:BoxDimensions|null) {
    let x = dimObj?.x ?? 0;
    let y = dimObj?.y ?? 0;
    const width = dimObj?.width ?? 0;
    const height = dimObj?.height ?? 0;
    
    return {
        x, y, width, height
    } satisfies BoxDimensions
}

test('change price filter UI slider', async ({page})=> {
    const navResponse: Response|null = await page.goto('https://www.flipkart.com/');
    expect(navResponse).not.toBe(null);

    const mobilesBtn: Locator = page.locator('div > a').filter({hasText: 'Mobiles'}).first();
    await mobilesBtn.click();
    await page.waitForLoadState("networkidle");//click resulted in new page; ensuring that page is ready for user actions

    const slider: Locator = page.locator('xpath=//section[17]/div[3]/div[1]/div[1]/div');
    const sliderBtn: Locator  = slider.first();      
    await sliderBtn.scrollIntoViewIfNeeded();//we need to put element in viewport before mimiking mouse actions
    
    let sliderBtnDimen : BoxDimensions = await ensureDimensions(await sliderBtn.boundingBox());
    expect(sliderBtnDimen).toBeTruthy();    
    
    /* want center of the element where mouse cursor is placed */
    let mouseX:number = sliderBtnDimen.x + (sliderBtnDimen.width/2);
    const mouseY:number = sliderBtnDimen.y + (sliderBtnDimen.height/2);
    
    /* simulate a real user; move -> left button down -> drag to right -> release left button of mouse */    
    await page.mouse.move(mouseX, mouseY);
    await page.mouse.down();
    
    mouseX += 90;
    await page.mouse.move(mouseX, mouseY);
    await page.mouse.up();
    await page.pause();
})