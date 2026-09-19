import {test,expect} from '@playwright/test';
import {writeFile,mkdir} from 'node:fs/promises';
import {start,target,settled,saved,closePanel,workstation,putTile,media,collectKit} from './helpers.js';
import production from '../content/production-assets.json' with {type:'json'};
const frames=Object.values(production).flatMap(row=>Object.values(row.levels).flatMap(level=>level.frames));
async function metrics(page:import('@playwright/test').Page){
 return page.evaluate(()=>({resources:performance.getEntriesByType('resource').map(e=>{const p=e as PerformanceResourceTiming;return {url:new URL(p.name).pathname,encodedBytes:p.encodedBodySize,transferBytes:p.transferSize,durationMs:p.duration};}),canvas:[...document.querySelectorAll<HTMLCanvasElement>('canvas')].map(c=>({width:c.width,height:c.height,rgbaBytes:c.width*c.height*4,poolReservedEstimate:Number(c.dataset.artBytes??0),poolPeakEstimate:Number(c.dataset.artPeakBytes??0),evictions:Number(c.dataset.artEvictions??0)})),viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio}}));
}
test('production cold Stage transfer, scene tour, image-cache estimates and frame cadence',async({page},info)=>{
 test.setTimeout(120000);await page.setViewportSize({width:1405,height:790});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 const startAt=Date.now();await start(page);await page.waitForLoadState('networkidle');const usableMs=Date.now()-startAt,cold=await metrics(page);
 const coldBytes=cold.resources.reduce((n,r)=>n+r.encodedBytes,0);expect(coldBytes).toBeLessThanOrEqual(4*1024*1024);expect(usableMs).toBeLessThan(5000);
 const canvas=page.getByRole('application');await canvas.focus();await page.keyboard.down('ArrowRight');
 const cadence=await page.evaluate(()=>new Promise<number[]>(resolve=>{const gaps:number[]=[];let last=performance.now();const until=last+2000;const frame=(now:number)=>{gaps.push(now-last);last=now;if(now<until)requestAnimationFrame(frame);else resolve(gaps);};requestAnimationFrame(frame);}));await page.keyboard.up('ArrowRight');
 await target(page,'ST.EXIT.CY');await settled(page);await page.waitForLoadState('networkidle');await target(page,'CY.EXIT.ST');await settled(page);await target(page,'ST.EXIT.WK');await settled(page);await target(page,'WK.EXIT.MD');await settled(page);await page.waitForLoadState('networkidle');await target(page,'MD.EXIT.WK');await settled(page);await target(page,'WK.EXIT.ST');await settled(page);await page.waitForLoadState('networkidle');
 const tour=await metrics(page),seen=[...new Set(tour.resources.map(r=>r.url))],byUrl=new Map(frames.flatMap(f=>[[f.url,f.rgbaBytes],...(f.fallbackUrl?[[f.fallbackUrl,f.rgbaBytes]]:[])] as [string,number][]));
 const requestedImageRgbaUpperSum=seen.reduce((n,url)=>n+(byUrl.get(url)??0),0),sorted=cadence.slice().sort((a,b)=>a-b);
 expect(tour.canvas.every(c=>c.poolPeakEstimate<=48*1024*1024)).toBe(true);expect(seen.filter(url=>url.startsWith('/art/er13/'))).toEqual([]);expect(errors).toEqual([]);
 await mkdir('evidence/er13/performance',{recursive:true});await writeFile(`evidence/er13/performance/${info.project.name}-tour.json`,JSON.stringify({checkedAt:new Date().toISOString(),environment:'Automated browser on this Windows host; loopback cold context, not constrained-network or physical-device measurement',usableMs,coldBytes,cold,tour,requestedImageRgbaUpperSum,cadence:{samples:cadence.length,medianMs:sorted[Math.floor(sorted.length*.5)],p95Ms:sorted[Math.floor(sorted.length*.95)],over33ms:cadence.filter(n=>n>33.34).length},scope:'Canvas pool counters reserve estimated decoded RGBA only. SVG/CSS images and browser decoder/GPU overhead are outside that pool. Distinct requested-image RGBA sum is an accounting upper sum, not measured resident GPU memory.',errors},null,2)+'\n');
 await page.screenshot({path:`evidence/er13/performance/${info.project.name}-stage.png`,fullPage:false});
});
test('production SVG image failure is visible and online recovery reloads the actual frame',async({page})=>{
 const jo=production['ASSET.ACT.JO/talk'],urls=Object.values(jo.levels).flatMap(l=>l.frames.flatMap(f=>[f.url,f.fallbackUrl]));let fail=true;
 await page.route('**/art/runtime/*',async route=>{if(fail&&urls.includes(new URL(route.request().url()).pathname))await route.abort();else await route.continue();});
 await page.goto('/');await expect(page.locator('.home-jo')).toHaveAttribute('data-art-state','failed');await expect(page.locator('.home-jo')).toHaveCSS('opacity','1');await expect(page.getByRole('button',{name:'Join the crew',exact:true})).toBeEnabled();
 fail=false;await page.evaluate(()=>window.dispatchEvent(new Event('online')));await expect(page.locator('.home-jo')).toHaveAttribute('data-art-ready','true');
});
test('production compressed text and immutable images retain authored-only config',async({request})=>{
 const html=await request.get('/',{headers:{'Accept-Encoding':'gzip'}});expect(html.headers()['content-encoding']).toBe('gzip');expect(await html.text()).toContain('<!doctype html>');
 const plain=await request.get('/',{headers:{'Accept-Encoding':'br;q=0,gzip;q=0'}});expect(plain.headers()['content-encoding']).toBeUndefined();
 const f=frames[0]!,asset=await request.get(f.url);expect(asset.status()).toBe(200);expect(asset.headers()['cache-control']).toContain('immutable');const config=await (await request.get('/api/config')).json();expect(config.mode).toBe('authored');expect(config.liveAvailable).toBe(false);
});
test('production E2 frozen curled photo remains separate from secured E3 and enlarged tile stays operable',async({page},info)=>{
 await start(page);await target(page,'ST.ACCESS.E2');await settled(page);await page.getByRole('button',{name:'Photo',exact:true}).click();await expect(page.locator('[data-photo-state]')).toHaveAttribute('data-photo-state','curled');await expect(page.locator('[data-photo-state] text')).toHaveText('CANCELED');
 await target(page,'ST.EXIT.CY');await settled(page);await target(page,'CY.SOURCE.E3');await settled(page);await page.getByRole('button',{name:'Flatten and secure notice',exact:true}).click();await settled(page);expect((await saved(page)).payload.physical.objects.noticeFlat).toBe(true);
 await target(page,'CY.ACCESS.E2');await settled(page);await page.getByRole('button',{name:'Photo',exact:true}).click();await expect(page.locator('[data-photo-state]')).toHaveAttribute('data-photo-state','curled');await expect(page.locator('[data-photo-state]')).not.toContainText('OUTDOOR');await page.screenshot({path:`evidence/er13/performance/${info.project.name}-frozen-photo.png`,fullPage:true});
});
test('production native rail animation preserves focus and exact committed tile order',async({page})=>{
 await workstation(page);await putTile(page,'BRIDGE');await putTile(page,'PLANT','Joined Boats');await putTile(page,'BLOOM','Hill');await page.locator('[data-tile="TILE.PLANT"]').click();await page.getByRole('button',{name:'Move left',exact:true}).click();await expect(page.locator('[data-tile="TILE.PLANT"]')).toBeFocused();expect((await saved(page)).payload.physical.order).toEqual(['TILE.PLANT','TILE.BRIDGE','TILE.BLOOM']);await expect(page.locator('[data-testid=rail] [data-art-ready=true]')).toHaveCount(3);
});

for(const fallback of [false,true])test(`production DPR2 ${fallback?'PNG fallback':'lossless WebP'} room transfers and bounded image residency`,async({browser},info)=>{
 test.setTimeout(150000);const context=await browser.newContext({baseURL:info.project.use.baseURL,viewport:{width:1440,height:1000},deviceScaleFactor:2}),page=await context.newPage();
 if(fallback)await page.route('**/art/runtime/*.webp',route=>route.abort());
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));const begun=Date.now();await start(page);await page.waitForLoadState('networkidle');
 const cold=await metrics(page),usableMs=Date.now()-begun,visits=[{room:'SC.ST',metrics:cold}];
 for(const [owner,room]of [['ST.EXIT.CY','SC.CY'],['CY.EXIT.ST','SC.ST'],['ST.EXIT.WK','SC.WK'],['WK.EXIT.MD','SC.MD'],['MD.EXIT.WK','SC.WK'],['WK.EXIT.ST','SC.ST']]){
  await target(page,owner!);await settled(page);await page.waitForLoadState('networkidle');visits.push({room:room!,metrics:await metrics(page)});
 }
 const coldBytes=cold.resources.reduce((sum,r)=>sum+r.encodedBytes,0),all=visits.at(-1)!.metrics,unique=[...new Map(all.resources.map(r=>[r.url,r])).values()];
 const byUrl=new Map(frames.flatMap(f=>[[f.url,f.rgbaBytes],...(f.fallbackUrl?[[f.fallbackUrl,f.rgbaBytes]]:[])] as [string,number][])),rgbaUpperSum=unique.reduce((sum,r)=>sum+(r.encodedBytes?byUrl.get(r.url)??0:0),0);
 const actualVisits=visits.map((visit,index)=>{const before=index?visits[index-1]!.metrics.resources.length:0,added=visit.metrics.resources.slice(before);return {room:visit.room,encodedBytes:added.reduce((sum,r)=>sum+r.encodedBytes,0),artEncodedBytes:added.filter(r=>r.url.startsWith('/art/runtime/')).reduce((sum,r)=>sum+r.encodedBytes,0),canvas:visit.metrics.canvas};});
 await mkdir('evidence/er13/performance',{recursive:true});await writeFile(`evidence/er13/performance/${info.project.name}-dpr2-${fallback?'png':'webp'}.json`,JSON.stringify({checkedAt:new Date().toISOString(),environment:'Automated browser, this Windows host, loopback, fresh context and DPR2 emulation; no physical mobile device or GPU measurement',fallback,usableMs,coldBytes,codeBytes:unique.filter(r=>/\.(js|css)$/.test(r.url)).reduce((sum,r)=>sum+r.encodedBytes,0),actualVisits,distinctRequestedRgbaUpperSum:rgbaUpperSum,all,errors},null,2)+'\n');
 await context.close();
 // Explicit section10 format allocation; original 4/3MiB PNG failures are
 // retained in the preceding candidate reports, not relabeled as passing.
 expect(coldBytes).toBeLessThanOrEqual((fallback?5:4)*1024*1024);expect(usableMs).toBeLessThan(5000);expect(actualVisits.slice(1).every(v=>v.artEncodedBytes<=(fallback?4.25:3)*1024*1024)).toBe(true);
 expect(all.canvas.every(c=>c.poolPeakEstimate<=48*1024*1024)).toBe(true);expect(rgbaUpperSum).toBeLessThan(192*1024*1024);expect(unique.filter(r=>r.url.startsWith('/temp/assets/'))).toEqual([]);expect(errors).toEqual([]);
});

test('production known Loop mission survives kit-only travel and controls stay outside the scene',async({page},info)=>{
 await start(page);await media(page);await expect.poll(async()=>(await saved(page)).payload.exposures.some(e=>e.refId==='E5.c/seen')).toBe(true);await collectKit(page);await target(page,'MD.EXIT.WK');await settled(page);
 await expect(page.locator('.mission-control')).toContainText('Return to the Media room and wake Loop');
 const box=await page.locator('[data-world]').boundingBox();for(const button of await page.locator('.world-controls button').all()){const rect=await button.boundingBox();expect(rect!.y).toBeGreaterThanOrEqual(box!.y+box!.height);}
 await page.screenshot({path:`evidence/er13/performance/${info.project.name}-portable-kit.png`,fullPage:false});await page.reload();await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.locator('.mission-control')).toContainText('Return to the Media room and wake Loop');
});

test('production source enlargement opens its heading and Back above the retained reading position',async({page})=>{
 await page.setViewportSize({width:1280,height:720});await start(page);await target(page,'ST.ACCESS.E2');await settled(page);await page.getByRole('button',{name:'Photo',exact:true}).click();await expect(page.locator('[data-photo-ready]')).toHaveAttribute('data-photo-ready','true');
 await page.locator('[data-task]').evaluate(el=>el.scrollTop=140);await page.getByRole('button',{name:'Enlarge source',exact:true}).click();
 await expect(page.locator('[data-focus-heading]')).toBeFocused();const heading=await page.locator('[data-focus-heading]').boundingBox(),back=await page.locator('.task-close button').boundingBox(),header=await page.locator('.game-header').boundingBox();expect(heading!.y).toBeGreaterThanOrEqual(header!.y+header!.height);expect(back!.y).toBeGreaterThanOrEqual(header!.y+header!.height);expect(heading!.y+heading!.height).toBeLessThan(720);
});

test('production 1280x720 overview retains objective, full room and primary tools above the fold',async({page})=>{
 await page.setViewportSize({width:1280,height:720});await start(page);
 for(const locator of [page.locator('.mission-control'),page.getByTestId('world'),page.getByRole('button',{name:'Move to…',exact:true}),page.getByRole('button',{name:'Notes',exact:true}),page.getByRole('button',{name:'Help',exact:true})]){const box=await locator.boundingBox();expect(box!.y).toBeGreaterThanOrEqual(0);expect(box!.y+box!.height).toBeLessThanOrEqual(720);}
 const world=await page.getByTestId('world').boundingBox();expect(world!.width/world!.height).toBeCloseTo(1.5,2);expect(world!.height).toBeGreaterThanOrEqual(240);
});
