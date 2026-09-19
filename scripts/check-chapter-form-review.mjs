import fs from 'node:fs/promises';
import path from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH??=path.resolve('.cache/browsers');
const {chromium}=await import('playwright');
const output='evidence/staged-bridge-20260916/chapter-review';await fs.mkdir(output,{recursive:true});
const browser=await chromium.launch({channel:'chromium'}),context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1}),page=await context.newPage(),errors=[];
page.on('pageerror',error=>errors.push(error.message));const cases=[];
try{
 await page.goto('http://127.0.0.1:4318/pilot/chapter-review/review.html');await page.waitForFunction(()=>document.body.dataset.ready==='true');
 for(const subject of ['post','tie','jog','carry-jog','rina','mara','sol','boy','operator','jo','loop','dough']){
  await page.locator('#subject').selectOption(subject);await page.waitForFunction(id=>document.body.dataset.subject===id,subject);await page.waitForTimeout(180);
  if(['post','tie'].includes(subject)){await page.waitForTimeout(1400);await page.screenshot({path:output+'/'+subject+'.png'});}
  if(['rina','sol','dough','jo','loop','jog','carry-jog'].includes(subject))await page.screenshot({path:output+'/'+subject+'.png'});
  for(const view of ['front','left','back','right','top','gameplay'])await page.locator('#view').selectOption(view);
  await page.locator('#view').selectOption('three');cases.push({subject,views:7,status:'PASS'});
 }
 await page.locator('#subject').selectOption('rina');await page.locator('#motion').selectOption('walk');await page.waitForTimeout(1000);await page.locator('#motion').selectOption('carry');await page.waitForTimeout(800);await page.screenshot({path:output+'/rina-carry.png'});
 await page.locator('#subject').selectOption('dough');for(const arrangement of ['similar','unequal','one','none']){await page.locator('#cuts').selectOption(arrangement);await page.waitForTimeout(100);cases.push({subject:'dough',arrangement,status:'PASS'});}
 await page.locator('#subject').selectOption('existing');const viewer=page.frameLocator('#existing');await viewer.locator('body[data-ready=true]').waitFor({timeout:30000});await viewer.locator('#asset').selectOption('lantern-flower');await viewer.locator('body[data-asset=lantern-flower][data-ready=true]').waitFor({timeout:30000});cases.push({subject:'preserved prop review',status:'PASS'});
 if(errors.length)throw Error(errors.join('\n'));
}finally{await fs.writeFile(output+'/browser.json',JSON.stringify({at:new Date().toISOString(),scope:'Isolated Chromium DPR1 review-page smoke; not actual game or full browser qualification, and not Form acceptance.',cases,errors},null,2)+'\n');await context.close();await browser.close();}
