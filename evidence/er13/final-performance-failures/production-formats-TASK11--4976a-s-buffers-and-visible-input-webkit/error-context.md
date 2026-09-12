# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: production-formats.spec.ts >> TASK11.20 section10 DPR2 PNG transfer, consumers, buffers and visible input
- Location: browser-tests\production-formats.spec.ts:13:58

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 33.34
Received:    52
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test';
  2  | import {readFile,writeFile,mkdir} from 'node:fs/promises';
  3  | import {createHash} from 'node:crypto';
  4  | import {start,target,settled,workstation,putTile} from './helpers.js';
  5  | import {measuredScene,totalImages} from './production-measurements.js';
  6  | import production from '../content/production-assets.json' with {type:'json'};
  7  | import {copy} from '../src/core/content.js';
  8  | 
  9  | // Explicit parent engineering allocation, imported unchanged; never silently
  10 | // substitute a raised threshold for the original failed comparison.
  11 | const authorityPath='docs/design/evidence-quest-design-v3/13-EXPERIENCE-AND-LITERACY-CORRECTION.md';
  12 | const authoritySha='c8f22de816b7220de46a74357c1905de8259ceb9e83bc465514588a732cc291f';
  13 | for(const density of [1,2])for(const png of [false,true])test(`TASK11.20 section10 DPR${density} ${png?'PNG':'WebP'} transfer, consumers, buffers and visible input`,async({browser},info)=>{
  14 |  test.setTimeout(180000);expect(createHash('sha256').update(await readFile(authorityPath)).digest('hex')).toBe(authoritySha);
  15 |  const context=await browser.newContext({baseURL:info.project.use.baseURL,viewport:{width:1440,height:1000},deviceScaleFactor:density}),page=await context.newPage();
  16 |  if(png)await page.route('**/art/runtime/*.webp',route=>route.abort());
  17 |  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));const begin=Date.now();await start(page);await page.waitForLoadState('networkidle');const usableMs=Date.now()-begin;
  18 |  const visits=[{room:'SC.ST',snapshot:await measuredScene(page)}];
  19 |  // Time a real key event to a changed rendered pixel around the player, rather
  20 |  // than treating the duration of an automation API call as input latency.
  21 |  await page.getByTestId('world').focus();
  22 |  const latency=page.evaluate(()=>new Promise<{pixelMs:number;baselineReadbackMs:number;frames:{eventToRafMs:number;readbackMs:number;changed:boolean}[]}>(resolve=>{
  23 |   const canvas=document.querySelector<HTMLCanvasElement>('[data-testid=world]')!,ctx=canvas.getContext('2d')!,x=Math.floor(canvas.width*14/120),y=Math.floor(canvas.height*36/80),w=Math.max(1,Math.floor(canvas.width*18/120)),h=Math.max(1,Math.floor(canvas.height*18/80));
  24 |   const pixels=()=>ctx.getImageData(x,y,w,h).data,baselineStart=performance.now(),before=pixels(),baselineReadbackMs=performance.now()-baselineStart;
  25 |   const frames:{eventToRafMs:number;readbackMs:number;changed:boolean}[]=[];
  26 |   const handler=(event:KeyboardEvent)=>{if(event.key!=='ArrowRight')return;document.removeEventListener('keydown',handler,true);const begun=performance.now();const frame=()=>{const readStart=performance.now(),after=pixels(),readbackMs=performance.now()-readStart,elapsed=performance.now()-begun,changed=after.some((n,i)=>n!==before[i]);frames.push({eventToRafMs:readStart-begun,readbackMs,changed});if(changed||elapsed>1000)resolve({pixelMs:elapsed,baselineReadbackMs,frames});else requestAnimationFrame(frame);};requestAnimationFrame(frame);};document.addEventListener('keydown',handler,true);document.documentElement.dataset.inputProbe='armed';
  27 |  }));
  28 |  await page.waitForFunction(()=>document.documentElement.dataset.inputProbe==='armed');await page.keyboard.down('ArrowRight');const inputTiming=await latency,inputPixelMs=inputTiming.pixelMs;await page.keyboard.up('ArrowRight');
  29 |  for(const [owner,room]of [['ST.EXIT.CY','SC.CY'],['CY.EXIT.ST','SC.ST'],['ST.EXIT.WK','SC.WK'],['WK.EXIT.MD','SC.MD'],['MD.EXIT.WK','SC.WK'],['WK.EXIT.ST','SC.ST']]){await target(page,owner!);await settled(page);await page.waitForLoadState('networkidle');visits.push({room:room!,snapshot:await measuredScene(page)});}
  30 |  const cold=visits[0]!.snapshot,coldBytes=cold.resources.reduce((sum,r)=>sum+r.encodedBytes,0),codeBytes=cold.resources.filter(r=>/\.(js|css)$/.test(r.url)).reduce((sum,r)=>sum+r.encodedBytes,0),transferLimits={initial:png?5*1024*1024:4*1024*1024,room:(png?4.25:3)*1024*1024};
  31 |  const transfers=visits.map((v,i)=>{const before=i?visits[i-1]!.snapshot.resources.length:0,resources=v.snapshot.resources.slice(before);return {room:v.room,encodedBytes:resources.reduce((sum,r)=>sum+r.encodedBytes,0),artEncodedBytes:resources.filter(r=>r.url.startsWith('/art/runtime/')).reduce((sum,r)=>sum+r.encodedBytes,0),reportedNetworkBytes:resources.reduce((sum,r)=>sum+r.transferBytes,0)};});
  32 |  await context.close();
  33 |  // Independent declared READY fixture puts the two Canvas consumers and native
  34 |  // tile/source images on screen together; it does not replace the fresh routes.
  35 |  const watchContext=await browser.newContext({baseURL:info.project.use.baseURL,viewport:{width:1440,height:1000},deviceScaleFactor:density}),watch=await watchContext.newPage();
  36 |  if(png)await watch.route('**/art/runtime/*.webp',route=>route.abort());await workstation(watch);await putTile(watch,'BRIDGE');await putTile(watch,'PLANT','Joined Boats');await putTile(watch,'BLOOM','Hill');
  37 |  await watch.waitForLoadState('networkidle');const rack=await measuredScene(watch);await watch.getByRole('button',{name:'Try this ending',exact:true}).click();await expect(watch.getByRole('button',{name:'Stop',exact:true})).toBeVisible();
  38 |  const activeStart=await measuredScene(watch);
  39 |  const activeCadence=await watch.evaluate(()=>new Promise<{frames:number[];startedAt:number;endedAt:number;startLabel:string|null;endLabel:string|null;changedStoryPixels:boolean;canvases:number}>(resolve=>{
  40 |   const canvas=document.querySelector<HTMLCanvasElement>('[data-testid=whole-story]')!,ctx=canvas.getContext('2d')!,x=Math.floor(canvas.width*.12),y=Math.floor(canvas.height*.45),w=Math.max(1,Math.floor(canvas.width*.8)),h=Math.max(1,Math.floor(canvas.height*.3));
  41 |   const before=ctx.getImageData(x,y,w,h).data,startLabel=canvas.getAttribute('aria-label'),frames:number[]=[],startedAt=performance.now(),end=startedAt+2000;let previous=startedAt;
  42 |   const tick=(now:number)=>{frames.push(now-previous);previous=now;if(now<end)requestAnimationFrame(tick);else{const endedAt=performance.now(),after=ctx.getImageData(x,y,w,h).data;resolve({frames,startedAt,endedAt,startLabel,endLabel:canvas.getAttribute('aria-label'),changedStoryPixels:after.some((n,i)=>n!==before[i]),canvases:document.querySelectorAll('canvas').length});}};requestAnimationFrame(tick);
  43 |  }));
  44 |  await expect(watch.getByRole('button',{name:'Stop',exact:true})).toBeVisible();expect(activeCadence.changedStoryPixels).toBe(true);expect(activeCadence.endLabel).not.toBe(activeCadence.startLabel);expect(activeCadence.canvases).toBe(2);const activeEnd=await measuredScene(watch),cadence=activeCadence.frames;
  45 |  await watch.screenshot({path:`evidence/er13/performance/${info.project.name}-DPR${density}-${png?'PNG':'WebP'}-active.png`,fullPage:false});
  46 |  await expect(watch.getByRole('button',{name:'Start premiere',exact:true})).toBeVisible();await watch.waitForLoadState('networkidle');const wholeStory=await measuredScene(watch);
  47 |  await watch.screenshot({path:`evidence/er13/performance/${info.project.name}-DPR${density}-${png?'PNG':'WebP'}-watch.png`,fullPage:false});await watchContext.close();
  48 |  const snapshots=[...visits.map(v=>v.snapshot),rack,activeStart,activeEnd,wholeStory],allRequestedRgba=totalImages(snapshots),maxCurrent=Math.max(...snapshots.map(s=>s.currentConservativeBytes)),maxNative=Math.max(...snapshots.map(s=>s.nativeConsumerRgba)),maxBacking=Math.max(...snapshots.map(s=>s.backingRgba));
  49 |  // Conservatively retain all distinct requested images from both visits, allow
  50 |  // separate native decodes, four backing/compositor buffers and32MiB reserve.
  51 |  const maxRaster=Math.max(...snapshots.map(s=>s.rasterPeak)),maxEncoded=Math.max(...snapshots.map(s=>s.encodedPeak)),globalConservative=allRequestedRgba+maxNative+maxRaster+2*maxEncoded+4*maxBacking+32*1024*1024,sorted=cadence.slice().sort((a,b)=>a-b);
  52 |  const report={at:new Date().toISOString(),authority:{path:authorityPath,sha256:authoritySha},density,format:png?'PNG':'WebP',usableMs,coldBytes,codeBytes,transferLimits,transfers,inputPixelMs,inputTiming,activeCadence,cadence:{samples:cadence.length,medianMs:sorted[Math.floor(sorted.length*.5)],p95Ms:sorted[Math.floor(sorted.length*.95)],over33ms:cadence.filter(n=>n>33.34).length},memory:{allRequestedRgba,maxCurrent,maxNative,maxBacking,maxRaster,maxEncoded,globalConservative,currentLimit:96*1024*1024,globalLimit:192*1024*1024},snapshots,errors,scope:'Automated Windows/loopback/DPR emulation, not physical hardware or internet measurement. RAF cadence is sampled during an actual running rehearsal with two Canvases, changed story pixels and changed committed description; it is a scheduling proxy, not measured physical display FPS. Image dimensions, decoded pool reservations, exact offscreen raster bytes, encoded response bytes plus an equal transfer-copy allowance, all native consumers and explicit buffer/reserve arithmetic are conservative estimates, not measured total browser/GPU memory. PNG interception disables normal browser caching. Existing all-variant allocation failures remain in production-art-verification.json.'};
  53 |  await mkdir('evidence/er13/performance',{recursive:true});await writeFile(`evidence/er13/performance/${info.project.name}-DPR${density}-${png?'PNG':'WebP'}-qualification.json`,JSON.stringify(report,null,2)+'\n');
> 54 |  expect(coldBytes).toBeLessThanOrEqual(transferLimits.initial);expect(codeBytes).toBeLessThanOrEqual(1024*1024);expect(transfers.slice(1).every(t=>t.artEncodedBytes<=transferLimits.room)).toBe(true);expect(usableMs).toBeLessThan(5000);expect(inputPixelMs).toBeLessThan(100);expect(report.cadence.p95Ms!).toBeLessThanOrEqual(33.34);expect(maxCurrent).toBeLessThanOrEqual(96*1024*1024);expect(globalConservative).toBeLessThanOrEqual(192*1024*1024);expect(snapshots.flatMap(s=>s.unknownImages)).toEqual([]);expect(errors).toEqual([]);
     |                                                                                                                                                                                                                                                                                                                 ^ Error: expect(received).toBeLessThanOrEqual(expected)
  55 | });
  56 | 
  57 | test('TASK11.20 all production Stage encodings fail visibly and retry the actual images',async({page})=>{
  58 |  const urls=Object.values(production['ASSET.ENV.ST.BACKPLATE/base'].levels).flatMap(level=>level.frames.flatMap(f=>[f.url,f.fallbackUrl]));let failed=true;
  59 |  await page.route('**/art/runtime/*',route=>failed&&urls.includes(new URL(route.request().url()).pathname)?route.abort():route.continue());await start(page);
  60 |  await expect(page.locator('.render-error')).toBeVisible();failed=false;await page.locator('.render-error').getByRole('button',{name:copy('CT.RECOVERY.RETRY'),exact:true}).click();await expect(page.locator('.render-error')).toHaveCount(0);
  61 | });
  62 | 
  63 | 
```