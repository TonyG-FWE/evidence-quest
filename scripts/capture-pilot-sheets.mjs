import {chromium} from '@playwright/test';
const browser=await chromium.launch({channel:'chromium'});
try{
 const page=await browser.newPage({viewport:{width:1440,height:1100},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('http://127.0.0.1:4318/pilot/review-sheets.html');
 await page.waitForFunction(()=>[...document.images].every(image=>image.complete&&image.naturalWidth>0));
 await page.locator('#overview').screenshot({path:'evidence/hands-on-20260916/pilot/overview.png'});
 for(const id of ['pip','grandma','lantern-flower','seed-boat'])await page.locator('#'+id).screenshot({path:`evidence/hands-on-20260916/pilot/${id}-review-sheet.png`});
 if(errors.length)throw Error(errors.join('\n'));
 console.log('Consolidated review captured from the actual browser screenshots.');
}finally{await browser.close();}
