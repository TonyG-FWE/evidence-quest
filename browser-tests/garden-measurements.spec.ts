import {completeConversation} from './garden-actions.js';
import {test,expect} from '@playwright/test';
test('TASK11.20 first-encounter DPR1/DPR2 resource and active-cadence measurements',async({browser},info)=>{
 test.setTimeout(240000);
 const results=[];
 for(const dpr of [1,2]){
  const context=await browser.newContext({viewport:{width:1280,height:720},deviceScaleFactor:dpr}),page=await context.newPage(),errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));const start=Date.now();
  await page.goto('/garden');await expect(page.getByRole('button',{name:'Begin Pip’s adventure',exact:true})).toBeVisible();const openingMs=Date.now()-start;await page.screenshot({path:info.outputPath(`studio-dpr${dpr}.png`)});
  await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await page.getByRole('button',{name:'Start playing',exact:true}).click();await page.getByRole('button',{name:'Go to Mara',exact:true}).click();await page.getByRole('button',{name:'Talk to Mara E',exact:true}).click();await completeConversation(page);await page.getByRole('button',{name:'Back to Pip',exact:true}).click();await page.getByRole('button',{name:'Go to the bridge pieces',exact:true}).click();await expect(page.getByRole('button',{name:'Arrange bridge',exact:true})).toBeVisible();
  await expect.poll(async()=>JSON.parse((await page.locator('.garden-scene').getAttribute('data-metrics'))??'{}').activeSamples??0).toBeGreaterThan(10);const render=JSON.parse((await page.locator('.garden-scene').getAttribute('data-metrics'))!);expect(render.dpr).toBe(dpr);expect(errors).toEqual([]);
  const transfer=await page.evaluate(()=>performance.getEntriesByType('resource').map(e=>{const r=e as PerformanceResourceTiming;return {url:r.name,encodedBytes:r.encodedBodySize,transferBytes:r.transferSize};}));
  const bytes=transfer.reduce((n,r)=>n+r.encodedBytes,0);results.push({dpr,openingMs,render,transfer,checks:{initialTransferUnder4MiB:bytes<=4*1024*1024,activeRafP95Under33_34ms:render.p95<=33.34},limits:'Loopback and emulated density. RAF proxy, not physical display FPS. Total GPU memory and 10 Mbps/100 ms physical-device qualification not measured.'});await context.close();
 }
 await info.attach('garden-renderer-measurements',{body:JSON.stringify(results,null,2),contentType:'application/json'});
});
test('D081.R19.AC03 labeled write-failure seam retains state and retries the real save transaction',async({page},info)=>{
 await page.addInitScript(()=>{const original=IDBDatabase.prototype.transaction;let fail=true;Object.defineProperty(window,'gardenTestAllowWrites',{value:()=>{fail=false;}});IDBDatabase.prototype.transaction=function(...args:Parameters<IDBDatabase['transaction']>){if(this.name==='evidence-quest-garden-adventure-v1'&&args[1]==='readwrite'&&fail)throw new DOMException('Synthetic full storage','QuotaExceededError');return original.apply(this,args);};});
 await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await page.getByRole('button',{name:'Start playing',exact:true}).click();await expect(page.getByRole('alert')).toContainText("haven't been saved yet");await expect(page.locator('.g-save')).not.toContainText('Saved');
 await page.evaluate(()=>{(window as unknown as {gardenTestAllowWrites:()=>void}).gardenTestAllowWrites();});await page.getByRole('button',{name:'Retry save',exact:true}).click();await expect(page.locator('.g-save')).toHaveText('Saved in this browser');await page.reload();await expect(page.getByRole('button',{name:'Begin Pip’s adventure',exact:true})).toHaveCount(0);await info.attach('fault-seam',{body:'Synthetic IDB transaction failure only; actual store, persistence queue, retry handler and reload used.',contentType:'text/plain'});
});
