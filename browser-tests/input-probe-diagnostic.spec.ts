import {test,expect} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
import {start} from './helpers.js';

// A paired measurement diagnostic on the unchanged game. Neither probe changes
// the application's context options, pixels, state, timing or input handlers.
for(const probe of ['direct','crop'] as const)test(`unchanged candidate DPR2 ${probe} input probe`,async({browser},info)=>{
 const context=await browser.newContext({baseURL:info.project.use.baseURL,viewport:{width:1440,height:1000},deviceScaleFactor:2}),page=await context.newPage();
 await start(page);await page.waitForLoadState('networkidle');await page.getByTestId('world').focus();
 const measurement=page.evaluate(probe=>new Promise<{pixelMs:number;baselineReadbackMs:number;frames:unknown[];samplePixels:number}>(resolve=>{
  const canvas=document.querySelector<HTMLCanvasElement>('[data-testid=world]')!,ctx=canvas.getContext('2d')!,x=Math.floor(canvas.width*14/120),y=Math.floor(canvas.height*36/80),w=Math.max(1,Math.floor(canvas.width*18/120)),h=Math.max(1,Math.floor(canvas.height*18/80));
  const audit=document.createElement('canvas');audit.width=audit.height=48;const auditCtx=audit.getContext('2d',{willReadFrequently:true})!;
  const pixels=()=>{if(probe==='direct')return ctx.getImageData(x,y,w,h).data;auditCtx.drawImage(canvas,x,y,w,h,0,0,48,48);return auditCtx.getImageData(0,0,48,48).data;};
  const baselineStart=performance.now(),before=pixels(),baselineReadbackMs=performance.now()-baselineStart,frames:unknown[]=[];
  const handler=(event:KeyboardEvent)=>{if(event.key!=='ArrowRight')return;document.removeEventListener('keydown',handler,true);const begun=performance.now();const frame=()=>{const readStart=performance.now(),after=pixels(),readbackMs=performance.now()-readStart,elapsed=performance.now()-begun,changed=after.some((n,i)=>n!==before[i]);frames.push({eventToRafMs:readStart-begun,readbackMs,changed});if(changed||elapsed>1000)resolve({pixelMs:elapsed,baselineReadbackMs,frames,samplePixels:before.length/4});else requestAnimationFrame(frame);};requestAnimationFrame(frame);};document.addEventListener('keydown',handler,true);document.documentElement.dataset.inputProbe='armed';
 }),probe);
 await page.waitForFunction(()=>document.documentElement.dataset.inputProbe==='armed');await page.keyboard.down('ArrowRight');const result=await measurement;await page.keyboard.up('ArrowRight');
 const resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>new URL(r.name).pathname).filter(p=>/\/assets\/(App|index)-.*\.(js|css)$/.test(p)));
 await writeFile(`evidence/er13/input-probe-${info.project.name}-${probe}.json`,JSON.stringify({at:new Date().toISOString(),probe,resources,result},null,2)+'\n');
 expect((result.frames.at(-1) as {changed:boolean}).changed).toBe(true);await context.close();
});
