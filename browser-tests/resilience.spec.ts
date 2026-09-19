import {test,expect,type Page,type TestInfo} from '@playwright/test';
import {copy} from '../src/core/content.js';
import {workstation,putTile,saved,start,readSlots} from './helpers.js';
import production from '../content/production-assets.json' with {type:'json'};
import {writeFile} from 'node:fs/promises';
async function coldRetry(page:Page,info:TestInfo,mode:'abort'|'http503'){
 await saved(page);const before=await readSlots(page),failedPage=await page.context().newPage(),denied:string[]=[],network:{url:string;status:number}[]=[],failures:{url:string;error:string|null}[]=[];
 failedPage.on('requestfailed',request=>failures.push({url:request.url(),error:request.failure()?.errorText??null}));failedPage.on('response',response=>{if(/\/assets\/App-.*\.js/.test(response.url()))network.push({url:response.url(),status:response.status()});});
 let recovered=false;
 try{
  await failedPage.route('**/assets/App-*.js',route=>{denied.push(route.request().url());return mode==='abort'?route.abort():route.fulfill({status:503,headers:{'cache-control':'no-store','content-type':'text/plain'},body:'Declared transient service error'});});
  await failedPage.goto('/');await expect(failedPage.getByRole('heading',{name:copy('CT.TECH.CONTENT_ERROR'),exact:true})).toBeVisible();expect(denied.length).toBeGreaterThan(0);await failedPage.unroute('**/assets/App-*.js');await failedPage.getByRole('button',{name:copy('CT.RECOVERY.RETRY'),exact:true}).click();await expect(failedPage.getByRole('button',{name:'Continue',exact:true})).toBeVisible();
  expect(network.some(r=>r.url.includes('?eq-retry=')&&r.status===200)).toBe(true);expect(await readSlots(failedPage)).toEqual(before);expect(new URL(failedPage.url()).searchParams.has('eq-retry')).toBe(false);recovered=true;
 }finally{await writeFile(`evidence/er13/cold-chunk-retry-${mode}-${info.project.name}.json`,JSON.stringify({mode,denied,network,failures,headingObserved:copy('CT.TECH.CONTENT_ERROR'),recovered,saveSlotsUnchanged:recovered},null,2)+'\n');await failedPage.close();}
}
test('FIX11.SAVE_INTERRUPTED actual Chromium renderer crash retains acknowledged active cue and uncertainty',async({page,context,browserName})=>{
 test.skip(browserName!=='chromium','CDP renderer crash is Chromium-only; normal restoration is checked in every engine.');
 await workstation(page);await putTile(page,'BRIDGE');await putTile(page,'PLANT','Joined Boats');await putTile(page,'BLOOM','Hill');await page.getByRole('button',{name:'Try this ending',exact:true}).click();const active=await saved(page);expect(active.payload.playback?.activeCue?.tile).toBe('TILE.BRIDGE');expect(active.payload.playback?.nextCue).toBe(0);
 const client=await context.newCDPSession(page),crashed=page.waitForEvent('crash');void client.send('Page.crash').catch(()=>{});await crashed;
 const next=await context.newPage();await next.goto('/');await next.getByRole('button',{name:'Continue',exact:true}).click();const recovered=await saved(next);expect(recovered.payload.playback?.nextCue).toBe(0);expect(recovered.payload.playback?.activeCue).toBeNull();expect(recovered.payload.playback?.status).toBe('paused');expect(recovered.payload.historyUncertain).toBe(true);expect(recovered.payload.observations.some(o=>o.kind==='possible-outcome'&&o.uncertain)).toBe(true);expect(recovered.payload.certificate).toBeNull();await next.screenshot({path:'output/playwright/actual-crash-recovery.png',fullPage:true});await next.close();
});
test('FIX11.ART_FAILURE missing artwork can retry; failed application chunk has native retry',async({page},info)=>{
 const urls=Object.values(production['ASSET.ENV.ST.BACKPLATE/base'].levels).flatMap(level=>level.frames.flatMap(frame=>[frame.url,frame.fallbackUrl]));
 let failed=true;await page.route('**/art/runtime/*',async route=>{if(failed&&urls.includes(new URL(route.request().url()).pathname))await route.abort();else await route.continue();});await start(page);await expect(page.getByText(copy('CT.TECH.ART_ERROR'))).toBeVisible();failed=false;await page.getByRole('button',{name:copy('CT.RECOVERY.RETRY'),exact:true}).click();await expect(page.getByText(copy('CT.TECH.ART_ERROR'))).toHaveCount(0);
 // Use a fresh document in the same saved origin. WebKit can reuse the already
 // evaluated module on reload, so a later route would not inject this failure.
 await coldRetry(page,info,'abort');
});
test('FIX11.ART_FAILURE HTTP503 recovers only after explicit Retry and keeps saved bytes',async({page},info)=>{await start(page);await coldRetry(page,info,'http503');});
test('FIX11.SAVE_FAILURE preference transaction failure never mislabels a successful case save',async({page})=>{
 await start(page);const before=await saved(page);await page.evaluate(()=>{const put=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(...args){if(this.name==='preferences')throw new DOMException('Synthetic preferences fault','QuotaExceededError');return put.apply(this,args);};});
 await page.getByRole('button',{name:'Menu',exact:true}).click();await page.getByRole('button',{name:'Settings',exact:true}).click();await page.getByLabel('Sound',{exact:true}).selectOption('off');await expect(page.getByText(copy('CT.SETTINGS.UNSAVED'),{exact:true})).toBeVisible();expect((await saved(page)).payload.caseRunId).toBe(before.payload.caseRunId);expect((await readSlots(page)).preferences).toBeUndefined();
});
