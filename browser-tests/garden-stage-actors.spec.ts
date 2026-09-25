import {expectedAssetStatus,modelAssetPattern,reviewProfile,endingActorIds,gatheringActorIds,plantingObjectIds} from './garden-asset-profile.js';
import {test,expect,type Page} from '@playwright/test';
import {narrativeCheckpoint} from '../checks/garden-checkpoint-fixtures.js';
import {checksum} from '../src/garden/persistence.js';
import {runtimeAssets} from '../src/garden/assets/runtimeManifest.js';
import {reviewAssets} from '../src/garden/assets/reviewManifest.js';
import {savedChapter} from './garden-save-fixture.js';
import {installPlaybackVoice,finishVoiceSegment} from './garden-playback-voice.js';

test.setTimeout(120000);
const button=(p:Page,name:string)=>p.getByRole('button',{name,exact:true});
async function ending(p:Page){
 await installPlaybackVoice(p);const chapter=narrativeCheckpoint('usual','pip','prepared'),record={format:1,content:chapter.content,revision:chapter.revision,writer:'isolated-stage-actor-fixture',payload:chapter,checksum:checksum(JSON.stringify(chapter))};
 // Actual-command ending transported as a labeled fixture; all presentation,
 // pause, recovery and asset lifecycle actions below use ordinary controls.
 await p.goto('/garden');await savedChapter(p);await p.evaluate(record=>new Promise<void>((resolve,reject)=>{const r=indexedDB.open('evidence-quest-garden-adventure-v1');r.onerror=()=>reject(r.error);r.onsuccess=()=>{const db=r.result,tx=db.transaction('slots','readwrite');tx.objectStore('slots').put(record,'current');tx.oncomplete=()=>{db.close();resolve();};};}),record);await p.reload();await button(p,'Watch your ending').click();return chapter;
}
async function ready(p:Page,actorIds=endingActorIds){
 const stage=p.locator('.garden-world-activity>.g-story-stage');await expect.poll(async()=>{const assets=JSON.parse(await stage.getAttribute('data-stage-assets')??'{}');return actorIds.every(id=>assets[id]?.status===expectedAssetStatus);},{timeout:60000}).toBe(true);
 const actual=JSON.parse(await stage.getAttribute('data-stage-assets')??'{}'),definitions=reviewProfile?reviewAssets:runtimeAssets;for(const id of actorIds)expect(actual[id].sha256).toBe(definitions[id as keyof typeof definitions]!.sha256);if(reviewProfile)await expect(stage).toHaveAttribute('aria-busy','false',{timeout:60000});return stage;
}
test('Ending uses profile-bound actors, real DPR and hand contact; pause, hidden reading and exit release resources',async({page},info)=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));const before=await ending(page);await button(page,'Watch the ending').click();await button(page,'Pause story').click();const stage=await ready(page);
 const time=await stage.getAttribute('data-stage-time');expect(Number(time)).toBeLessThan(6);await page.waitForTimeout(180);await expect(stage).toHaveAttribute('data-stage-time',time!);
 const size=await stage.locator('canvas').evaluate((canvas:HTMLCanvasElement)=>({width:canvas.width,height:canvas.height,cssWidth:canvas.getBoundingClientRect().width,cssHeight:canvas.getBoundingClientRect().height,dpr:devicePixelRatio}));expect(Math.abs(size.width-size.cssWidth*size.dpr)).toBeLessThan(2);expect(Math.abs(size.height-size.cssHeight*size.dpr)).toBeLessThan(2);
 const metrics=JSON.parse(await stage.getAttribute('data-stage-resources')??'{}');expect(metrics.imported.sources).toBe(endingActorIds.length+plantingObjectIds.length);expect(metrics.imported.decodedBytes).toBeGreaterThan(1000000);expect.soft(metrics.decodedSceneBytes).toBeLessThanOrEqual(96*1024*1024);expect.soft(metrics.decodedCacheBytes).toBeLessThanOrEqual(192*1024*1024);expect(metrics.dpr).toBe(size.dpr);
 await button(page,'Resume story').click();await finishVoiceSegment(page);await expect(page.locator('[data-presentation-page="1"]')).toBeVisible();await ready(page,gatheringActorIds);await expect.poll(async()=>Object.keys(JSON.parse(await stage.getAttribute('data-stage-hand-contact')??'{}'))).toEqual(['pip']);const contact=JSON.parse(await stage.getAttribute('data-stage-hand-contact')??'{}').pip;expect(Math.hypot(...contact.palm.map((v:number,i:number)=>v-contact.grip[i]))).toBeLessThan(.001);await page.screenshot({path:info.outputPath('approved-gathering-actors.png')});
 await button(page,'Read the whole story with help').click();await expect.poll(async()=>JSON.parse(await stage.getAttribute('data-stage-resources')??'{}').imported.sources).toBe(0);await button(page,'Back to Loop’s picture show').click();await ready(page,gatheringActorIds);
 await stage.evaluate(e=>{(window as any).__releasedStageElement=e;});await button(page,'Pause · Back to studio').click();await expect(stage).toHaveCount(0);expect(await page.evaluate(()=>(window as any).__releasedStageElement.dataset.stageDisposed)).toBe('true');expect(await page.evaluate(()=>(window as any).__releasedStageElement.dataset.stageReleasedSources)).toBe('0');expect((await savedChapter(page)).story.ending).toEqual(before.story.ending);expect(errors).toEqual([]);
});
test('Leaving an ending while models load cancels the old owner and a fresh view recovers',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await ending(page);let release=()=>{};const hold=new Promise<void>(resolve=>{release=resolve;}),requests=new Set<string>();
 await page.route(modelAssetPattern,async route=>{requests.add(route.request().url());await hold;await route.continue().catch(()=>{});});
 try{
  await button(page,'Watch the ending').click();
  // The bounded loader cannot start every model while its first requests are held.
  await expect.poll(()=>requests.size).toBeGreaterThan(0);const stage=page.locator('.garden-world-activity>.g-story-stage');await expect(stage).toHaveAttribute('aria-busy','true');
  const definitions=reviewProfile?reviewAssets:runtimeAssets;expect([...requests].some(url=>endingActorIds.some(id=>url.endsWith(definitions[id as keyof typeof definitions]!.uri)))).toBe(true);
  await stage.evaluate(e=>{(window as any).__interruptedStageElement=e;});await button(page,'Pause · Back to studio').click();release();await page.unroute(modelAssetPattern);expect(await page.evaluate(()=>(window as any).__interruptedStageElement.dataset.stageDisposed)).toBe('true');
  await button(page,'Watch the ending').click();await ready(page);await expect(page.getByRole('button',{name:'Restore story view',exact:true})).toHaveCount(0);expect(errors).toEqual([]);
 }finally{release();await page.unroute(modelAssetPattern);}
});
