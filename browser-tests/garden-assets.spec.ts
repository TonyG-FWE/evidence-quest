import {expectedAssetStatus,pipAssetPattern,reviewProfile} from './garden-asset-profile.js';
import {test,expect} from '@playwright/test';
import {networkProfile} from './network-profile.js';
import {savedChapter} from './garden-save-fixture.js';
import {reviewAssets} from '../src/garden/assets/reviewManifest.js';
test.use({trace:'off',video:'off'});

test('TASK11.20 opening is usable with complete artwork under the 10 Mbps / 100 ms profile',async({browser,baseURL},info)=>{
 const transport=await networkProfile(baseURL!),context=await browser.newContext({viewport:{width:1280,height:720},deviceScaleFactor:Number(info.project.use.deviceScaleFactor??1)}),page=await context.newPage();
 try{const start=Date.now();await page.goto(transport.url+'/garden');await expect(page.getByRole('button',{name:'Begin Pip’s adventure',exact:true})).toBeEnabled();await expect.poll(()=>page.locator('.festival-welcome img').evaluateAll(images=>images.length>0&&images.every(image=>(image as HTMLImageElement).complete&&(image as HTMLImageElement).naturalWidth>0)),{timeout:10000}).toBe(true);const usableMs=Date.now()-start;await info.attach('network-profile',{body:JSON.stringify({usableMs,bytes:transport.bytes(),profile:'10 Mbps shared streamed downstream; 100 ms each response; cold context; loopback emulation, not physical-device proof'}),contentType:'application/json'});expect(usableMs).toBeLessThanOrEqual(5000);}
 finally{await context.close();await transport.close();}
});

test('TASK11.20 profile-bound character contact, native input latency, and failed artwork recovery',async({page},info)=>{
 await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await page.getByRole('button',{name:'Start playing',exact:true}).click();const scene=page.locator('.garden-scene');
 await expect.poll(async()=>JSON.parse(await scene.getAttribute('data-character-assets')??'{}').pip).toBe(expectedAssetStatus);
 const contact=JSON.parse((await scene.getAttribute('data-hand-contact'))!);expect(contact.seed).toBe('pip');expect(contact.seedPosition).toEqual(contact.pip);
 await scene.locator('canvas').focus();await page.evaluate(()=>{const scene=document.querySelector<HTMLElement>('.garden-scene')!;document.addEventListener('keydown',event=>{if(event.key!=='ArrowRight')return;const at=performance.now(),before=scene.dataset['pipX'];const watch=new MutationObserver(()=>{if(scene.dataset['pipX']===before)return;watch.disconnect();requestAnimationFrame(()=>document.body.dataset['inputFeedbackMs']=String(performance.now()-at));});watch.observe(scene,{attributes:true,attributeFilter:['data-pip-x']});},{once:true,capture:true});});
 await page.keyboard.down('ArrowRight');await expect(page.locator('body')).toHaveAttribute('data-input-feedback-ms',/\d/);await page.keyboard.up('ArrowRight');const inputMs=Number(await page.locator('body').getAttribute('data-input-feedback-ms'));await info.attach('native-input',{body:JSON.stringify({inputMs,scope:'Native keydown to changed authoritative rendered position followed by the next animation frame; not hardware display latency'}),contentType:'application/json'});expect(inputMs).toBeLessThanOrEqual(100);
 const before=await savedChapter(page);let fail=true;await page.route(pipAssetPattern,route=>fail?route.fulfill({status:503,body:'Test-only artwork interruption'}):route.continue());await page.reload();await expect(page.getByRole('button',{name:'Restore view',exact:true})).toBeVisible();expect((await savedChapter(page)).seed).toBe(before.seed);fail=false;await page.getByRole('button',{name:'Restore view',exact:true}).click();await expect.poll(async()=>JSON.parse(await scene.getAttribute('data-character-assets')??'{}').pip).toBe(expectedAssetStatus);expect((await savedChapter(page)).pip).toEqual(before.pip);await page.screenshot({path:info.outputPath('approved-character-restored.png')});
});

test('TASK11.20 integrated 3D studio transfer, source reuse and location disposal',async({page},info)=>{
 test.skip(!reviewProfile,'The integrated supplied-model studio is explicitly a local review artifact.');test.setTimeout(150000);
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/garden');
 await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await page.getByRole('button',{name:'Start playing',exact:true}).click();
 const scene=page.locator('.garden-scene'),read=async(name:string)=>JSON.parse(await scene.getAttribute('data-'+name)||'null');
 await expect.poll(async()=>{const a=await read('character-assets');return a?.pip===expectedAssetStatus&&a.pending===0;},{timeout:90000}).toBe(true);
 const before=await savedChapter(page),resources=()=>page.evaluate(()=>performance.getEntriesByType('resource').map(e=>{const r=e as PerformanceResourceTiming;return {url:r.name,encodedBytes:r.encodedBodySize,transferBytes:r.transferSize};}));
 const studioIds=['stage-1','table','storybook','pencils','cup','cards','potted','loop'],studioUris=new Set([...studioIds,'jo'].map(id=>reviewAssets[id]!.uri));
 const visits=[];
 for(let visit=0;visit<2;visit++){
  const from=(await resources()).length,started=Date.now();await page.getByRole('button',{name:'Inspect studio',exact:true}).click();
  await expect.poll(async()=>{const a=await read('character-assets');return studioIds.every(id=>a.objects.includes(id))&&a.cast.some((p:{id:string;ready:boolean})=>p.id==='jo'&&p.ready)&&a.pending===0;},{timeout:90000}).toBe(true);
  await page.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));const loadingMs=Date.now()-started;
  if(!visit)await page.screenshot({path:info.outputPath('integrated-studio-ready.png')});
  if(!await page.getByRole('button',{name:'Rotate left',exact:true}).isVisible())await page.getByRole('button',{name:'Map and camera',exact:true}).click();
  const rotate=await page.getByRole('button',{name:'Rotate left',exact:true}).boundingBox();expect(rotate).not.toBeNull();
  await page.mouse.move(rotate!.x+rotate!.width/2,rotate!.y+rotate!.height/2);await page.mouse.down();
  try{await expect.poll(async()=>{const m=await read('metrics');return m?.cadenceRoom==='studio'?m.activeSamples:0;},{timeout:30000}).toBeGreaterThanOrEqual(180);}finally{await page.mouse.up();}
  const metrics=await read('metrics'),assets=await read('character-assets'),transfer=(await resources()).slice(from);
  visits.push({visit,loadingMs,metrics,assets,transfer,modelBytes:transfer.filter(r=>studioUris.has(new URL(r.url).pathname)).reduce((n,r)=>n+r.encodedBytes,0)});
  await page.getByRole('button',{name:'Return to village',exact:true}).click();
  await expect.poll(async()=>{const a=await read('character-assets');return !a.objects.includes('stage-1')&&!a.cast.some((p:{id:string;ready:boolean})=>p.id==='jo'&&p.ready);}).toBe(true);
  expect(await savedChapter(page)).toEqual(before);
 }
 await info.attach('integrated-studio-measurements',{body:JSON.stringify({scope:'Actual /garden supplied-model studio; native review controls, cold first studio visit, revisit without clearing caches, source ownership and unchanged save. At least 180 active camera samples from a fresh studio-only cadence window per visit. Loopback emulated DPR; RAF proxy, not physical display FPS or total GPU memory.',dpr:info.project.use.deviceScaleFactor??1,visits,errors}),contentType:'application/json'});
 expect(errors).toEqual([]);expect.soft(visits[0]!.modelBytes,'Actual first 3D studio model transfer').toBeLessThanOrEqual(3*1024*1024);
 for(const visit of visits){expect(visit.metrics.dpr).toBe(info.project.use.deviceScaleFactor??1);expect(visit.metrics.cadenceRoom).toBe('studio');expect(visit.metrics.activeSamples).toBeGreaterThanOrEqual(180);expect.soft(visit.metrics.p95,'3D studio active frame p95').toBeLessThanOrEqual(33.34);expect.soft(visit.metrics.decodedSceneBytes,'3D studio scene allocation').toBeLessThanOrEqual(96*1024*1024);expect.soft(visit.metrics.decodedCacheBytes,'3D studio transition/cache allocation').toBeLessThanOrEqual(192*1024*1024);}
});
