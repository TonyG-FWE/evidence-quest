import {test,expect,type Page} from '@playwright/test';
import {GardenStore,initialGarden,CROSSING,GRANDMA_APPROACH,type Chapter} from '../src/garden/model.js';
import {BAKERY_APPROACH,TILE_APPROACH,WORKSHOP_DOOR,THANK_RINA} from '../src/garden/bakery.js';
import {advance,completeConversation} from '../checks/garden-play-actions.js';
import {buildBridge} from '../checks/garden-bridge-actions.js';
import {narrativeCheckpoint} from '../checks/garden-checkpoint-fixtures.js';
import {checksum,validChapter} from '../src/garden/persistence.js';
import {savedChapter} from './garden-save-fixture.js';
import {openDirections,chooseHandObject,moveHandObject,completeConversation as completeNativeConversation} from './garden-actions.js';
import {anchors} from '../src/garden/worldLayout.js';
import {reviewProfile} from './garden-asset-profile.js';

test.setTimeout(180000);
test.skip(!reviewProfile,'The supplied-model contact continuation requires the explicit local review build.');
const button=(p:Page,name:string)=>p.getByRole('button',{name,exact:true});
function bakeryStart(){
 const store=new GardenStore(initialGarden('final-contact-fixture')),send=store.send.bind(store);
 send({type:'BOOT'});send({type:'BEGIN'});send({type:'START_PLAY'});send({type:'GO',point:CROSSING});advance(store);buildBridge(store);send({type:'GO',point:GRANDMA_APPROACH});advance(store);
 send({type:'GO',point:BAKERY_APPROACH});advance(store);send({type:'TALK',who:'rina'});advance(store);completeConversation(store);send({type:'BAKERY_STEP',step:'PERMISSION'});while(store.getSnapshot().panel)send({type:'CLOSE'});
 send({type:'GO',point:TILE_APPROACH});advance(store);return store;
}
function thanksStart(){
 const store=bakeryStart(),send=store.send.bind(store),step=(step:Parameters<typeof send>[0]&{type:'BAKERY_STEP'})=>{send(step);advance(store);};
 step({type:'BAKERY_STEP',step:'PICKUP'});send({type:'GO',point:BAKERY_APPROACH});advance(store);step({type:'BAKERY_STEP',step:'DELIVER'});step({type:'BAKERY_STEP',step:'REPAIR'});step({type:'BAKERY_STEP',step:'REMOVE'});
 send({type:'TILE_PREVIEW',position:'gap'});for(const key of ['PLACE','CHECK','MIX','SHAPE','BAKE','TAKE_LOAF'] as const)step({type:'BAKERY_STEP',step:key});
 send({type:'GO',point:{x:WORKSHOP_DOOR.x+.15,z:WORKSHOP_DOOR.z+.9}});advance(store);expect(store.getSnapshot().chapter.bakery.stage).toBe('escorting');return store.getSnapshot().chapter;
}
async function fixture(page:Page,payload:Chapter){
 expect(validChapter(payload)).toBe(true);await page.goto('/garden');await savedChapter(page);
 const record={format:1,content:payload.content,revision:payload.revision,writer:'explicit-final-contact-fixture',payload,checksum:checksum(JSON.stringify(payload))};
 await page.evaluate(record=>new Promise<void>((resolve,reject)=>{const r=indexedDB.open('evidence-quest-garden-adventure-v1');r.onerror=()=>reject(r.error);r.onsuccess=()=>{const db=r.result,tx=db.transaction('slots','readwrite');tx.objectStore('slots').put(record,'current');tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>reject(tx.error);};}),record);
 await page.reload();await expect(page.locator('.garden-scene')).toHaveAttribute('data-character-assets',/^\{/);
}
const read=async(page:Page,name:string)=>JSON.parse(await page.locator('.garden-scene').getAttribute('data-'+name)||'null');
async function loaded(page:Page,objects:string[],actors:string[]){await expect.poll(async()=>{const a=await read(page,'character-assets');return objects.every(id=>a.objects.includes(id))&&actors.every(id=>id==='pip'?a.pip==='p2-review':a.cast.some((ch:{id:string;ready:boolean})=>ch.id===id&&ch.ready));},{timeout:60000}).toBe(true);}
const gap=(a:number[],b:number[])=>Math.hypot(...a.map((v,i)=>v-b[i]!));

test('fixture tile continuation: original tile follows the carrying palms, climb and current save',async({page},info)=>{
 await fixture(page,bakeryStart().getSnapshot().chapter);await loaded(page,['tile'],['pip']);await openDirections(page,'Bakery');await button(page,'Take the spare tile').click();
 await expect.poll(async()=>(await read(page,'bakery')).stage).toBe('carried');await expect.poll(async()=>{const c=await read(page,'tile-hand-contact');return c?.owner==='pip'&&gap(c.palm,c.grip)<.001;}).toBe(true);
 await page.screenshot({path:info.outputPath('pip-edge-grip.png')});await button(page,'Bring the tile to Sol').click();await expect(button(page,'Give the tile to Sol')).toBeVisible();await loaded(page,['tile','bakery'],['sol']);await button(page,'Give the tile to Sol').click();
 await expect.poll(async()=>(await read(page,'bakery')).stage).toBe('delivered');await expect.poll(async()=>{const c=await read(page,'tile-hand-contact');return c?.owner==='sol'&&gap(c.palm,c.grip)<.001;}).toBe(true);await page.screenshot({path:info.outputPath('sol-edge-grip.png')});
 const direct=button(page,'Direct Sol’s roof repair');if(await direct.isVisible())await direct.click();await button(page,'Remove the cracked tile').click();const scene=page.locator('.garden-scene');
 await expect.poll(async()=>Number(await scene.getAttribute('data-action-progress')),{intervals:[30]}).toBeGreaterThan(.42);await button(page,'Pause').click();await page.screenshot({path:info.outputPath('sol-carries-tile-up-ladder.png')});
 await info.attach('contact-scope',{body:'Fixture continuation through native pickup, walk, handoff and paused climb. Palm/source-edge coordinates and screenshots are retained; no complete fresh journey or clothing acceptance is implied.',contentType:'text/plain'});
 const before=await savedChapter(page);await page.reload();expect((await savedChapter(page)).bakery.tile).toBe(before.bakery.tile);
});

test('fixture loaf continuation: both source palms contact the same loaf before Sol owns it',async({page},info)=>{
 await fixture(page,thanksStart());await loaded(page,['loaf'],['rina','sol']);await openDirections(page,'Bakery');await button(page,'Let Rina give Sol the loaf').click();
 await expect.poll(async()=>{const c=await read(page,'loaf-hand-contact');return c&&c.progress>.45&&c.progress<.69;},{intervals:[25]}).toBe(true);
 const samples=[];for(let i=0;i<5;i++){const c=await read(page,'loaf-hand-contact');if(c&&c.progress>.42&&c.progress<.72)samples.push({progress:c.progress,rinaGap:gap(c.rina,c.rinaGrip),solGap:gap(c.sol,c.solGrip)});await page.waitForTimeout(30);}
 expect(samples.length).toBeGreaterThan(1);expect(Math.max(...samples.map(c=>c.rinaGap))).toBeLessThan(.01);expect(Math.max(...samples.map(c=>c.solGap))).toBeLessThan(.035);
 await page.screenshot({path:info.outputPath('two-palms-one-loaf.png')});await expect.poll(async()=>(await savedChapter(page)).bakery.loaf).toBe('sol');const c=await savedChapter(page);expect(c.bakery.rina).toEqual(THANK_RINA);
 await info.attach('actual-loaf-contact',{body:JSON.stringify({scope:'Native fixture continuation; source underside contacts, ordinary action progress and durable ownership.',samples}),contentType:'application/json'});await page.reload();expect((await savedChapter(page)).bakery).toEqual(c.bakery);
});

test('fixture memory continuation: supplied pictures, actual card grip, release, studio disposal and saved placement',async({page},info)=>{
 await fixture(page,narrativeCheckpoint('later','mara','prepared','memory'));
 const scene=page.locator('.garden-scene');await expect.poll(async()=>{const a=await read(page,'memory-assets');return a.length===7&&a.filter((p:{kind:string|null})=>p.kind).every((p:{ready:boolean})=>p.ready);},{timeout:60000}).toBe(true);
 await expect.poll(async()=>(await read(page,'foreground-sight')).some((a:{id:string;blocked:boolean;opacity:number})=>a.id.startsWith('tree')&&a.blocked&&a.opacity<.2)).toBe(true);
 await expect.poll(async()=>{const c=await read(page,'memory-hand');return c.visible&&gap(c.palm,c.grip)<.001;}).toBe(true);await page.screenshot({path:info.outputPath('supplied-memory-in-pips-hand.png')});
 await chooseHandObject(page,'memory');await moveHandObject(page,anchors.garden.plant.x,anchors.garden.plant.z);await button(page,'Release object').click();await expect(scene).toHaveAttribute('data-action-kind','none');
 await expect.poll(async()=>(await savedChapter(page)).story.records.pip).toBe('planting');const kept=(await savedChapter(page)).story.records.pip;await expect.poll(async()=>(await read(page,'memory-assets'))[5]?.ready,{timeout:60000}).toBe(true);await page.screenshot({path:info.outputPath('supplied-memory-on-flower.png')});
 await button(page,'Inspect studio').click();await expect.poll(async()=>{const a=await read(page,'memory-assets');return a.every((p:{ready:boolean;pending:boolean})=>!p.ready&&!p.pending);}).toBe(true);
 await loaded(page,['stage-1','table','storybook','pencils','cup','cards','potted','loop'],['jo']);
 await expect(scene.locator('canvas')).toHaveAttribute('aria-label',/^Sparkfest studio\./);await page.screenshot({path:info.outputPath('studio-after-memory-release.png')});await page.reload();expect((await savedChapter(page)).story.records.pip).toBe(kept);await expect(scene.locator('canvas')).toHaveAttribute('aria-label',/^The river and Grandma/);
 await info.attach('memory-scope',{body:'Actual-command moment fixture, then ordinary native object controls and studio switch. The selected source card and miniature scenes use shared asset ownership. Fresh chapter routes are reported separately.',contentType:'text/plain'});
});

test('fixture rehearsal continuation: the supplied bakery keeps its world proportions and frames the witnessed ending',async({page},info)=>{
 const store=new GardenStore(initialGarden('rehearsal-contact-fixture'));store.send({type:'BOOT',chapter:thanksStart()});store.send({type:'BAKERY_STEP',step:'THANK'});advance(store);
 expect(store.getSnapshot().chapter.bakery.stage).toBe('done');await fixture(page,store.getSnapshot().chapter);
 await button(page,'Talk to Sol').click();await completeNativeConversation(page);await button(page,'Let’s finish the ending together.').click();
 await page.getByLabel('Your ending for Sol’s story',{exact:true}).fill('The repaired roof kept Rina’s flour dry. Her bread reached the people waiting for it.');
 await button(page,'Baking, then the visit').click();await button(page,'Try my ending').click();const stage=page.locator('[data-stage-scene="both"]');
 await expect(stage).toHaveAttribute('aria-busy','false',{timeout:60000});await expect.poll(async()=>Number(await stage.getAttribute('data-stage-time'))).toBe(6);
 await page.screenshot({path:info.outputPath('bakery-rehearsal-source-proportions.png')});await button(page,'Use this ending').click();
 const c=await savedChapter(page);expect(c.story.solDraft.text).toContain('Her bread reached');
 await info.attach('rehearsal-scope',{body:'A fixture reaches the completed bakery; ordinary conversation, writing, picture selection and rehearsal follow. The visual capture is awaiting human review.',contentType:'text/plain'});
});

test('fixture arrivals continuation: camera follows Sol and Mara along their actual routes',async({page},info)=>{
 await fixture(page,narrativeCheckpoint('later','mara','prepared','arrivals'));
 await button(page,'Talk to Grandma E').click();await button(page,'Review the gathering plan with Grandma').click();await button(page,'Begin the gathering').click();
 await button(page,'Help the last passengers ashore').click();await expect(button(page,'Let Sol walk to the garden')).toBeEnabled();
 const samples=[];
 for(const [kind,label] of [['solArrival','Let Sol walk to the garden'],['maraArrival','Let Mara cross to the garden']] as const){
  await button(page,label).click();
  for(const progress of [.2,.5,.8]){
   await expect.poll(async()=>{const v=await read(page,'arrival-view');return v?.kind===kind?v.progress:-1;},{timeout:22000}).toBeGreaterThanOrEqual(progress);
   const view=await read(page,'arrival-view');expect(view.kind).toBe(kind);expect(view.ready).toBe(true);
   for(const point of [view.feet,view.head]){expect(Math.abs(point[0]),kind+' horizontal framing').toBeLessThan(.90);expect(Math.abs(point[1]),kind+' vertical framing').toBeLessThan(.90);}
   const foreground=await read(page,'foreground-sight');
   if(kind==='solArrival'&&progress===.5)expect(foreground.some((tree:{id:string;position:number[];blocked:boolean;opacity:number})=>tree.id.startsWith('tree')&&Math.hypot(tree.position[0]!-view.world[0],tree.position[2]!-view.world[2])<6&&tree.blocked&&tree.opacity<.2),'The supplied tree over Sol’s route reveals the travelling actor').toBe(true);
   samples.push({...view,foreground});if(progress===.5)await page.screenshot({path:info.outputPath(kind+'-visible-route.png')});
  }
 }
 await expect(button(page,'Welcome everyone in the garden')).toBeVisible();
 await expect.poll(async()=>(await savedChapter(page)).gathering.arrival).toBe('ready');
 await info.attach('actual-arrival-framing',{body:JSON.stringify({scope:'Current-command fixture; native arrival controls. Projected actor floor and 1.45-m upper anchor sampled at three action-progress points; not exhaustive projected mesh bounds. Mid-route images are separately inspected. Camera follows source actors without changing route, timing or ownership.',samples}),contentType:'application/json'});
});
