import {test,expect,type Page} from '@playwright/test';
import {buildStagedBridge,openDirections,worldPoint,waitForWalk,collectRepairRopes,placeBridgeSection,secureSpan,closeHandControls,waitForBoatStop} from './garden-actions.js';
import {savedChapter} from './garden-save-fixture.js';
import {GardenStore,initialGarden,CROSSING,GRANDMA_APPROACH,type Chapter} from '../src/garden/model.js';
import {advance,completeConversation} from '../checks/garden-play-actions.js';
import {buildBridge} from '../checks/garden-bridge-actions.js';
import {checksum,validChapter} from '../src/garden/persistence.js';
import {BAKERY_APPROACH,TILE_APPROACH} from '../src/garden/bakery.js';
import {BAKERY_WORK,terrainHeight,BRIDGE_LEVELS} from '../src/garden/worldLayout.js';

const button=(p:Page,name:string)=>p.getByRole('button',{name,exact:true});
async function start(p:Page){await p.goto('/garden');await button(p,'Begin Pip’s adventure').click();await button(p,'Start playing').click();await expect(p.locator('.garden-scene')).toHaveAttribute('data-camera-projection',/^\{/);}
const pose=(p:Page)=>p.locator('.garden-scene').evaluate(e=>({x:Number((e as HTMLElement).dataset.pipX),z:Number((e as HTMLElement).dataset.pipZ)}));
for(const site of ['narrow','wide'] as const)test('fresh raised '+site+' boat passage: ordinary steering in both directions and save continuity',async({page},info)=>{
 await start(page);
 if(site==='narrow')await buildStagedBridge(page);
 else{await button(page,'Go to the bridge pieces').click();await expect(page.locator('.garden-scene')).toHaveAttribute('data-pip-x',CROSSING.x.toFixed(3));await collectRepairRopes(page);await placeBridgeSection(page,'a','Try the wide crossing');await secureSpan(page,'west');}
 await closeHandControls(page);await button(page,'Go to the bridge pieces').click();await button(page,'Read the note').click();await button(page,'Load the seed into the boat').click();
 const scene=page.locator('.garden-scene');await expect(scene).toHaveAttribute('data-ferry-phase','steering');const before=await savedChapter(page);
 const move=async(name:string,axis:'x'|'z',value:number)=>{await button(page,name).click();await expect(scene).toHaveAttribute('data-seed-boat-'+axis,value.toFixed(3));await waitForBoatStop(page);};
 if(site==='wide'){
  for(const z of [.25,-.3,-.85,-1.4,-1.95,-2.5])await move('Upstream ↑','z',z);
  await page.screenshot({path:info.outputPath('under-wide-crossing-upstream.png')});
  for(const z of [-1.95,-1.4,-.85,-.3,.25,.8])await move('Downstream ↓','z',z);
 }
 if(site==='narrow'){
  await move('Upstream ↑','z',.25);await move('Garden side →','x',-.85);
  for(const z of [.8,1.35,1.9,2.45,3,3.55,4.1])await move('Downstream ↓','z',z);
  await page.screenshot({path:info.outputPath('under-narrow-crossing-downstream.png')});
  for(const z of [3.55,3,2.45,1.9,1.35])await move('Upstream ↑','z',z);
 }
 const at=await savedChapter(page);expect(at.seed).toBe('boat');expect(at.river.construction).toEqual(before.river.construction);expect(at.pip).toEqual(before.pip);
 await page.reload();const resumed=await savedChapter(page);expect(resumed.river.boat).toEqual(at.river.boat);expect(resumed.seed).toBe('boat');expect(resumed.river.construction).toEqual(at.river.construction);
 await page.screenshot({path:info.outputPath(site+'-boat-resumed.png')});
});
test('fresh view: camera controls leave Pip still, gameplay returns to follow, contextual labels retain keyboard access',async({page},info)=>{
 await start(page);const before=await pose(page),scene=page.locator('.garden-scene');
 await button(page,'Map and camera').click();await button(page,'Rotate right').click();await button(page,'Pan right').press('ArrowRight');await button(page,'Tilt down').click();await button(page,'Look closer').click();
 await expect(scene).toHaveAttribute('data-camera-focus','inspection');expect(await pose(page)).toEqual(before);
 await page.screenshot({path:info.outputPath('independent-camera.png')});
 // The click is resolved using the inspected view, before follow resumes.
 const target={x:before.x+.35,z:before.z+.2};const click=await worldPoint(page,target.x,target.z,terrainHeight(target)-.015);await page.mouse.click(click.x,click.y);
 await expect(scene).not.toHaveAttribute('data-camera-focus','inspection');await expect.poll(async()=>{const p=await pose(page);return Math.hypot(p.x-target.x,p.z-target.z);}).toBeLessThan(.09);
 await button(page,'Rotate left').click();await expect(scene).toHaveAttribute('data-camera-focus','inspection');await scene.locator('canvas').focus();await page.keyboard.press('ArrowLeft');await expect(scene).not.toHaveAttribute('data-camera-focus','inspection');
 await button(page,'Map and camera').click();await page.mouse.move(10,10);
 const label=page.locator('[data-garden-marker="sections"]');await expect(label).toHaveCSS('opacity','0');await label.focus();await expect(label).toHaveCSS('opacity','1');await scene.locator('canvas').focus();await expect(label).toHaveCSS('opacity','0');
 await page.screenshot({path:info.outputPath('labels-on-demand.png')});
});
test('fresh raised crossing: ordinary construction, supported footing and save continuity',async({page},info)=>{
 await start(page);await buildStagedBridge(page);const chapter=await savedChapter(page);expect(chapter.west&&chapter.east).toBe(true);
 // Tony selected the six-board platform in the annotated screen-left view.
 // Require that actual source in the scene, not just a mechanically valid deck.
 const scene=page.locator('.garden-scene');await expect.poll(async()=>JSON.parse(await scene.getAttribute('data-character-assets')??'{}').objects?.includes('platform-bridge-fitted'),{timeout:60000}).toBe(true);
 expect(JSON.parse((await scene.getAttribute('data-character-assets'))!).objects).not.toContain('bridge-fitted');
 await page.screenshot({path:info.outputPath('raised-bridge.png')});
 await button(page,'Go to Grandma').click();await waitForWalk(page,'Grandma',chapter);await expect(page.locator('.garden-scene')).toHaveAttribute('data-bridge-ready','true');
 await page.reload();const resumed=await savedChapter(page);expect(resumed.river.construction).toEqual(chapter.river.construction);expect(resumed.sections).toEqual(chapter.sections);expect(resumed.seed).toBe('pip');
 expect(BRIDGE_LEVELS.deck).toBeGreaterThan(.9);await page.screenshot({path:info.outputPath('raised-crossing-resumed.png')});
});

function bakeryFixture(placement=false){
 const store=new GardenStore(initialGarden('refit-bakery-fixture'));const send=store.send.bind(store);
 send({type:'BOOT'});send({type:'BEGIN'});send({type:'START_PLAY'});send({type:'GO',point:CROSSING});advance(store);buildBridge(store);send({type:'GO',point:GRANDMA_APPROACH});advance(store);
 send({type:'GO',point:BAKERY_APPROACH});advance(store);send({type:'TALK',who:'rina'});advance(store);completeConversation(store);send({type:'BAKERY_STEP',step:'PERMISSION'});while(store.getSnapshot().panel)send({type:'CLOSE'});
 send({type:'GO',point:TILE_APPROACH});advance(store);send({type:'BAKERY_STEP',step:'PICKUP'});advance(store);send({type:'GO',point:BAKERY_APPROACH});advance(store);send({type:'BAKERY_STEP',step:'DELIVER'});advance(store);
 for(const step of ['REPAIR','REMOVE'] as const){send({type:'BAKERY_STEP',step});advance(store);}if(!placement){send({type:'TILE_PREVIEW',position:'gap'});send({type:'BAKERY_STEP',step:'PLACE'});advance(store);send({type:'BAKERY_STEP',step:'CHECK'});advance(store);}
 const c=structuredClone(store.getSnapshot().chapter);expect(c.bakery.stage).toBe(placement?'gap':'checked');expect(validChapter(c)).toBe(true);return c;
}
async function fixture(p:Page,payload:Chapter){await p.goto('/garden');await savedChapter(p);const record={format:1,content:payload.content,revision:payload.revision,writer:'refit-focused-fixture',payload,checksum:checksum(JSON.stringify(payload))};await p.evaluate(async record=>new Promise<void>((resolve,reject)=>{const r=indexedDB.open('evidence-quest-garden-adventure-v1',1);r.onerror=()=>reject(r.error);r.onsuccess=()=>{const db=r.result,tx=db.transaction('slots','readwrite');tx.objectStore('slots').put(record,'current');tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>reject(tx.error);};}),record);await p.reload();await expect(p.locator('.garden-scene')).toHaveAttribute('data-bakery',/^\{/);}
test('fixture continuation: separated bakery preparation, visible carrying trips, supported baked loaves',async({page},info)=>{
 await fixture(page,bakeryFixture());const scene=page.locator('.garden-scene');const data=async()=>JSON.parse((await scene.getAttribute('data-bakery'))!);
 await expect.poll(async()=>{const assets=JSON.parse((await scene.getAttribute('data-character-assets'))!);return ['oven','bakery','flour','bench'].every(id=>assets.objects.includes(id))&&assets.cast.some((a:{id:string;ready:boolean})=>a.id==='rina'&&a.ready);}).toBe(true);
 await page.screenshot({path:info.outputPath('bakery-zones.png')});await openDirections(page,'Bakery');await button(page,'Make the dough with Rina').click();await expect.poll(async()=>(await data()).stage).toBe('mixed');
 await button(page,'Shape the loaves').click();await expect.poll(async()=>(await data()).stage).toBe('shaped');await button(page,'Bake the bread').click();
 await expect.poll(async()=>(await data()).handling.carriedLoaf,{intervals:[50]}).toBe(0);await page.screenshot({path:info.outputPath('rina-carries-first-loaf.png')});
 await expect.poll(async()=>(await data()).handling.carriedLoaf,{intervals:[50]}).toBe(2);await page.screenshot({path:info.outputPath('rina-carries-third-loaf.png')});
 await expect.poll(async()=>(await data()).stage).toBe('baked');expect((await savedChapter(page)).bakery.loaf).toBe('oven');await page.screenshot({path:info.outputPath('supported-bread.png')});
 await button(page,'Take a loaf to thank Sol').click();await expect.poll(async()=>(await data()).loaf).toBe('rina');await page.screenshot({path:info.outputPath('rina-takes-thanks-loaf.png')});
 expect(Math.hypot(BAKERY_WORK.mixing.x-BAKERY_WORK.ovenTarget.x,BAKERY_WORK.mixing.z-BAKERY_WORK.ovenTarget.z)).toBeGreaterThan(2.8);
});

for(const reducedMotion of [false,true])test('fixture roof contact: actual tile grip and supported crouch, reduced motion '+reducedMotion,async({page},info)=>{
 const payload=bakeryFixture(true);payload.reducedMotion=reducedMotion;await fixture(page,payload);const scene=page.locator('.garden-scene');
 await expect.poll(async()=>{const a=JSON.parse((await scene.getAttribute('data-character-assets'))!);return a.objects.includes('tile')&&a.objects.includes('bakery')&&a.cast.some((x:{id:string;ready:boolean})=>x.id==='sol'&&x.ready);}).toBe(true);
 await openDirections(page,'Bakery');if(await button(page,'Direct Sol’s roof repair').isVisible())await button(page,'Direct Sol’s roof repair').click();
 for(const [target,stage]of [['Beside the opening','misplaced'],['Over the opening','sealed']] as const){
  await button(page,target).click();await button(page,'Place the tile').click();
  if(!reducedMotion){
   await expect.poll(async()=>{const value=await scene.getAttribute('data-roof-hand-error');return value?Number(value):null;},{intervals:[30]}).not.toBeNull();
   await page.screenshot({path:info.outputPath(stage+'-contact.png')});
   const samples:number[]=[];for(let i=0;i<20;i++){const value=await scene.getAttribute('data-roof-hand-error');if(value)samples.push(Number(value));await page.waitForTimeout(35);}
   expect(samples.length).toBeGreaterThan(5);expect(Math.max(...samples)).toBeLessThan(.035);
   await info.attach(stage+'-hand-errors',{body:JSON.stringify(samples),contentType:'application/json'});
  }
  await expect.poll(async()=>JSON.parse((await scene.getAttribute('data-bakery'))!).stage).toBe(stage);
 }
 await info.attach('contact-scope',{body:'Fixture continuation with ordinary controls; actual rendered hand grip error samples. Does not qualify apron deformation or a complete fresh journey.',contentType:'text/plain'});
});
