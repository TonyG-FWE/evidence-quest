import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
process.env.PLAYWRIGHT_BROWSERS_PATH??=path.resolve('.cache/browsers');
const {chromium}=await import('playwright');
const output='evidence/staged-bridge-20260916/chapter-review/'+(process.argv[2]??'natural-boundary');
await fs.mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:'chromium'});
const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1});
const page=await context.newPage(),errors=[],captures=[];
page.on('pageerror',error=>errors.push(error.message));
try{
 await page.goto('http://127.0.0.1:4318/pilot/chapter-review/props-kit-r2/review.html');
 await page.locator('body[data-ready=true]').waitFor({timeout:30000});
 for(const asset of ['garden-kit','bakery-kit','roof-kit','kit']){
  await page.locator('#asset').selectOption(asset);
  await page.locator(`body[data-ready=true][data-asset=${asset}]`).waitFor({timeout:30000});
  await page.waitForTimeout(600);
  for(const boundary of [false,true]){
   await page.locator('#boundary').setChecked(boundary);
   await page.waitForTimeout(180);
   const file=`${output}/${asset}-${boundary?'after':'before'}.png`;
   await page.screenshot({path:file});
   captures.push({asset,boundary,file,sha256:createHash('sha256').update(await fs.readFile(file)).digest('hex'),facts:await page.locator('body').getAttribute('data-boundary')});
  }
 }
 if(errors.length)throw Error(errors.join('\n'));
}finally{
 const source='evidence/hands-on-20260916/pilot/chapter-review/props-kit-r2/manifest.json';
 await fs.writeFile(output+'/browser.json',JSON.stringify({at:new Date().toISOString(),scope:'Isolated Chromium DPR1 review candidate; actual layout/building factories and location camera values, approved scale actors. Not production integration, performance qualification or human Form approval.',source,sourceSha256:createHash('sha256').update(await fs.readFile(source)).digest('hex'),captures,errors},null,2)+'\n');
 await context.close();await browser.close();
}
