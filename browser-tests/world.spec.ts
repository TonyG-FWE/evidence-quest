import {test,expect} from '@playwright/test';
test('TASK11.06 fresh native route traverses the four rendered rooms',async({page})=>{
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('/');await page.getByRole('button',{name:'Join the crew',exact:true}).click();
 await expect(page.locator('.game-header strong')).toHaveText('Stage');
 await page.waitForLoadState('networkidle');await page.screenshot({path:'output/playwright/opening-stage.png',fullPage:true});
 async function go(owner:string,room:string){await page.getByRole('button',{name:/Move to/}).first().click();await page.locator(`[data-owner="${owner}"]`).click();await expect(page.locator('.game-header strong')).toHaveText(room);await page.waitForLoadState('networkidle');}
 await go('ST.EXIT.WK','Workshop');await page.screenshot({path:'output/playwright/workshop.png',fullPage:true});
 await go('WK.EXIT.MD','Media room');await page.screenshot({path:'output/playwright/media-arrival.png',fullPage:true});
 await go('MD.EXIT.WK','Workshop');await go('WK.EXIT.CY','Courtyard');await page.screenshot({path:'output/playwright/courtyard.png',fullPage:true});
 await go('CY.EXIT.ST','Stage');expect(errors).toEqual([]);
});
