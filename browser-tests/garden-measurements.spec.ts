import {expectedAssetStatus,reviewProfile} from './garden-asset-profile.js';
import {completeConversation} from './garden-actions.js';
import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
// Screencast/trace capture competes with DPR2 rendering. Functional tests retain
// traces; timing qualification records metrics without recording the framebuffer.
test.use({trace:'off',video:'off'});
test('TASK11.20 first-encounter DPR1/DPR2 resource and active-cadence measurements',async({browser},info)=>{
 test.setTimeout(240000);
 const results=[];
 const manifest=JSON.parse(await readFile(reviewProfile?'evidence/final-demo-20260918/review-assets.json':'evidence/integrated-checkpoint-20260916/runtime-assets.json','utf8'));
 const assets=(reviewProfile?Object.values(manifest.assets):manifest.assets) as {location:string;locations?:string[];resources:{bytes:number}}[];
 const locationBytes:Record<string,number>={};for(const asset of assets)for(const location of asset.locations??[asset.location])locationBytes[location]=(locationBytes[location]??0)+asset.resources.bytes;
 await info.attach('location-asset-budgets',{body:JSON.stringify({profile:reviewProfile?'local-review':'production',locationBytes,scope:'Distinct runtime model payloads assigned to each location. Retained candidates with no runtime membership are excluded.'}),contentType:'application/json'});for(const [location,bytes]of Object.entries(locationBytes))expect.soft(bytes,location+' compressed models').toBeLessThanOrEqual(3*1024*1024);
 // Matrix projects measure each density in a fresh browser process. The default
 // required-suite project still covers both densities when none is specified.
 const densities=info.project.use.deviceScaleFactor?[Number(info.project.use.deviceScaleFactor)]:[1,2];
 for(const dpr of densities){
  const context=await browser.newContext({viewport:{width:1280,height:720},deviceScaleFactor:dpr}),page=await context.newPage(),errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));const start=Date.now();
  await page.goto('/garden');await expect(page.getByRole('button',{name:'Begin Pip’s adventure',exact:true})).toBeVisible();const openingMs=Date.now()-start;await page.screenshot({path:info.outputPath(`studio-dpr${dpr}.png`)});
  await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await page.getByRole('button',{name:'Start playing',exact:true}).click();await page.getByRole('button',{name:'Go to Mara',exact:true}).click();await page.getByRole('button',{name:'Talk to Mara E',exact:true}).click();await completeConversation(page);await page.getByRole('button',{name:/^(Back to Pip|Continue to the game)$/,exact:true}).click();await page.getByRole('button',{name:'Go to the bridge pieces',exact:true}).click();await expect(page.locator('.garden-scene')).toHaveAttribute('data-pip-x','-2.800');
  await expect.poll(async()=>JSON.parse((await page.locator('.garden-scene').getAttribute('data-character-assets'))??'{}').pip).toBe(expectedAssetStatus);
  await expect.poll(async()=>JSON.parse((await page.locator('.garden-scene').getAttribute('data-metrics'))??'{}').activeSamples??0).toBeGreaterThan(10);const render=JSON.parse((await page.locator('.garden-scene').getAttribute('data-metrics'))!);expect(render.dpr).toBe(dpr);expect(errors).toEqual([]);
  const transfer=await page.evaluate(()=>performance.getEntriesByType('resource').map(e=>{const r=e as PerformanceResourceTiming;return {url:r.name,encodedBytes:r.encodedBodySize,transferBytes:r.transferSize};}));
  const bytes=transfer.reduce((n,r)=>n+r.encodedBytes,0),coreBytes=transfer.filter(r=>/\.(?:js|css|wasm)(?:\?|$)/.test(r.url)).reduce((n,r)=>n+r.encodedBytes,0);await page.screenshot({path:info.outputPath(`textured-game-dpr${dpr}.png`)});
  // Include both imported characters and the full village in the active sample,
  // not only Pip at the first encounter. No state injection or lowered density.
  await page.getByRole('button',{name:'Map and camera',exact:true}).click();await page.getByRole('button',{name:'Fit map',exact:true}).click();const scene=page.locator('.garden-scene');
  await expect.poll(async()=>JSON.parse(await scene.getAttribute('data-character-assets')??'{}').grandma).toBe(expectedAssetStatus);await expect.poll(async()=>JSON.parse(await scene.getAttribute('data-character-assets')??'{}').pending,{timeout:90000}).toBe(0);
  const loaded=JSON.parse(await scene.getAttribute('data-character-assets')??'{}');if(reviewProfile)expect(loaded.objects).toEqual(expect.arrayContaining(['tree-1','bakery','cottage','cottage-1']));else expect(loaded.sources).toHaveLength(2);
  const firstFrame=JSON.parse((await scene.getAttribute('data-metrics'))!).frames,rotate=await page.getByRole('button',{name:'Rotate left',exact:true}).boundingBox();expect(rotate).not.toBeNull();await page.mouse.move(rotate!.x+rotate!.width/2,rotate!.y+rotate!.height/2);await page.mouse.down();
  try{await expect.poll(async()=>JSON.parse(await scene.getAttribute('data-metrics')??'{}').frames??0,{timeout:20000}).toBeGreaterThanOrEqual(firstFrame+180);}finally{await page.mouse.up();}
  const overview=JSON.parse((await scene.getAttribute('data-metrics'))!);expect(overview.dpr).toBe(dpr);if(reviewProfile)expect(overview.imported.sources).toBeGreaterThan(9);else expect(overview.imported.sources).toBe(2);expect(errors).toEqual([]);
  results.push({dpr,openingMs,coreBytes,render,overview,transfer,checks:{initialTransferUnder4MiB:bytes<=4*1024*1024,activeRafP95Under33_34ms:render.p95<=33.34},limits:'Loopback and emulated density. RAF proxy, not physical display FPS. GPU/browser allocator totals are unavailable; scene/cache figures include imported buffers, texture mips, encoded caches and conservative framebuffer/shadow reserves. Network-profile timing has a separate test.'});await page.screenshot({path:info.outputPath(`full-village-dpr${dpr}.png`)});await context.close();
 }
 await info.attach('garden-renderer-measurements',{body:JSON.stringify(results,null,2),contentType:'application/json'});
 for(const result of results){expect.soft(result.checks.initialTransferUnder4MiB,`DPR${result.dpr}: initial transfer exceeds 4 MiB`).toBe(true);expect.soft(result.coreBytes,'Compressed core including texture decoder').toBeLessThanOrEqual(1024*1024);for(const [view,render]of Object.entries({encounter:result.render,overview:result.overview})){expect.soft(render.p95,`DPR${result.dpr} ${view}: active frame p95`).toBeLessThanOrEqual(33.34);expect.soft(render.decodedSceneBytes).toBeLessThanOrEqual(96*1024*1024);expect.soft(render.decodedCacheBytes).toBeLessThanOrEqual(192*1024*1024);expect.soft(render.imported.textureBytes,'Imported painted textures must be loaded').toBeGreaterThan(0);}}
});
test('D081.R19.AC03 labeled write-failure seam retains state and retries the real save transaction',async({page},info)=>{
 await page.addInitScript(()=>{const original=IDBDatabase.prototype.transaction;let fail=true;Object.defineProperty(window,'gardenTestAllowWrites',{value:()=>{fail=false;}});IDBDatabase.prototype.transaction=function(...args:Parameters<IDBDatabase['transaction']>){if(this.name==='evidence-quest-garden-adventure-v1'&&args[1]==='readwrite'&&fail)throw new DOMException('Synthetic full storage','QuotaExceededError');return original.apply(this,args);};});
 await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await page.getByRole('button',{name:'Start playing',exact:true}).click();await expect(page.getByRole('alert')).toContainText("haven't been saved yet");await expect(page.locator('.g-save')).not.toContainText('Saved');
 await page.evaluate(()=>{(window as unknown as {gardenTestAllowWrites:()=>void}).gardenTestAllowWrites();});await page.getByRole('button',{name:'Retry save',exact:true}).click();await expect(page.locator('.g-save')).toHaveText('Saved in this browser');await page.reload();await expect(page.getByRole('button',{name:'Begin Pip’s adventure',exact:true})).toHaveCount(0);await info.attach('fault-seam',{body:'Synthetic IDB transaction failure only; actual store, persistence queue, retry handler and reload used.',contentType:'text/plain'});
});
