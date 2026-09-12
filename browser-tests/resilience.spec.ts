import {test,expect} from '@playwright/test';
import {copy} from '../src/core/content.js';
import {workstation,putTile,saved,start,readSlots} from './helpers.js';
test('FIX11.SAVE_INTERRUPTED actual Chromium renderer crash retains acknowledged active cue and uncertainty',async({page,context,browserName})=>{
 test.skip(browserName!=='chromium','CDP renderer crash is Chromium-only; normal restoration is checked in every engine.');
 await workstation(page);await putTile(page,'BRIDGE');await putTile(page,'PLANT','Joined Boats');await putTile(page,'BLOOM','Hill');await page.getByRole('button',{name:'Rehearse',exact:true}).click();const active=await saved(page);expect(active.payload.playback?.activeCue?.tile).toBe('TILE.BRIDGE');expect(active.payload.playback?.nextCue).toBe(0);
 const client=await context.newCDPSession(page),crashed=page.waitForEvent('crash');void client.send('Page.crash').catch(()=>{});await crashed;
 const next=await context.newPage();await next.goto('/');await next.getByRole('button',{name:'Continue',exact:true}).click();const recovered=await saved(next);expect(recovered.payload.playback?.nextCue).toBe(0);expect(recovered.payload.playback?.activeCue).toBeNull();expect(recovered.payload.playback?.status).toBe('paused');expect(recovered.payload.historyUncertain).toBe(true);expect(recovered.payload.observations.some(o=>o.kind==='possible-outcome'&&o.uncertain)).toBe(true);expect(recovered.payload.certificate).toBeNull();await next.screenshot({path:'output/playwright/actual-crash-recovery.png',fullPage:true});await next.close();
});
test('FIX11.ART_FAILURE missing artwork can retry; failed application chunk has native retry',async({page})=>{
 let failed=true;await page.route('**/temp/assets/asset-env-st-backplate/**',async route=>{if(failed)await route.abort();else await route.continue();});await start(page);await expect(page.getByText(copy('CT.TECH.ART_ERROR'))).toBeVisible();failed=false;await page.getByRole('button',{name:copy('CT.RECOVERY.RETRY'),exact:true}).click();await expect(page.getByText(copy('CT.TECH.ART_ERROR'))).toHaveCount(0);
 await page.route('**/assets/App-*.js',route=>route.abort());await page.reload();await expect(page.getByRole('heading',{name:copy('CT.TECH.CONTENT_ERROR'),exact:true})).toBeVisible();await page.unroute('**/assets/App-*.js');await page.getByRole('button',{name:copy('CT.RECOVERY.RETRY'),exact:true}).click();await expect(page.getByRole('button',{name:'Continue',exact:true})).toBeVisible();
});
test('FIX11.SAVE_FAILURE preference transaction failure never mislabels a successful case save',async({page})=>{
 await start(page);const before=await saved(page);await page.evaluate(()=>{const put=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(...args){if(this.name==='preferences')throw new DOMException('Synthetic preferences fault','QuotaExceededError');return put.apply(this,args);};});
 await page.getByRole('button',{name:'Menu',exact:true}).click();await page.getByRole('button',{name:'Settings',exact:true}).click();await page.getByLabel('Sound',{exact:true}).selectOption('off');await expect(page.getByText(copy('CT.SETTINGS.UNSAVED'),{exact:true})).toBeVisible();expect((await saved(page)).payload.caseRunId).toBe(before.payload.caseRunId);expect((await readSlots(page)).preferences).toBeUndefined();
});
