import {test,expect,type Page} from '@playwright/test';
import {Matrix4,Vector3} from 'three';
import {GardenStore,initialGarden,CROSSING,GRANDMA_APPROACH,type Chapter} from '../src/garden/model.js';
import {BAKERY_APPROACH,TILE_APPROACH,WORKSHOP_DOOR} from '../src/garden/bakery.js';
import {advance,completeConversation} from '../checks/garden-play-actions.js';
import {buildBridge} from '../checks/garden-bridge-actions.js';
import {checksum} from '../src/garden/persistence.js';
import {savedChapter} from './garden-save-fixture.js';
import {reviewProfile} from './garden-asset-profile.js';
import {BAKERY_REPAIR} from '../src/garden/worldLayout.js';
import {openDirections,moveHandObject} from './garden-actions.js';
test.skip(!reviewProfile,'Source-model direct handoff repair uses the explicit local review profile.');
test.setTimeout(90000);
function escortCheckpoint(roofOnly=false){
 const store=new GardenStore(initialGarden('bakery-visible-loaf-fixture')),send=store.send.bind(store),step=(step:'PERMISSION'|'PICKUP'|'DELIVER'|'REPAIR'|'REMOVE'|'PLACE'|'CHECK'|'MIX'|'SHAPE'|'BAKE'|'TAKE_LOAF')=>{send({type:'BAKERY_STEP',step});advance(store);};
 send({type:'BOOT'});send({type:'BEGIN'});send({type:'START_PLAY'});send({type:'GO',point:CROSSING});advance(store);buildBridge(store);send({type:'GO',point:GRANDMA_APPROACH});advance(store);send({type:'GO',point:BAKERY_APPROACH});advance(store);send({type:'TALK',who:'rina'});advance(store);completeConversation(store);step('PERMISSION');while(store.getSnapshot().panel)send({type:'CLOSE'});send({type:'GO',point:TILE_APPROACH});advance(store);step('PICKUP');send({type:'GO',point:BAKERY_APPROACH});advance(store);step('DELIVER');step('REPAIR');step('REMOVE');if(roofOnly)return store.getSnapshot().chapter;send({type:'TILE_PREVIEW',position:'gap'});for(const key of ['PLACE','CHECK','MIX','SHAPE','BAKE','TAKE_LOAF'] as const)step(key);send({type:'GO',point:{x:WORKSHOP_DOOR.x+.15,z:WORKSHOP_DOOR.z+.9}});advance(store);return store.getSnapshot().chapter;
}
async function screenPoint(page:Page,p:{x:number;y:number;z:number}){
 const view=await page.locator('.garden-scene').evaluate(el=>{const box=el.querySelector('canvas')!.getBoundingClientRect();return {matrix:JSON.parse((el as HTMLElement).dataset['cameraProjection']!),box:{x:box.x,y:box.y,width:box.width,height:box.height}};});
 const v=new Vector3(p.x,p.y,p.z).applyMatrix4(new Matrix4().fromArray(view.matrix.view)).applyMatrix4(new Matrix4().fromArray(view.matrix.projection));return {x:view.box.x+(v.x+1)*view.box.width/2,y:view.box.y+(1-v.y)*view.box.height/2};
}
test('visible loaf handoff is selectable beside Rina and persists through reload',async({page},info)=>{
 const payload=escortCheckpoint();expect(payload.bakery.stage).toBe('escorting');await page.goto('/garden');await savedChapter(page);
 const record={format:1,content:payload.content,revision:payload.revision,writer:'isolated-loaf-fixture',payload,checksum:checksum(JSON.stringify(payload))};
 await page.evaluate(record=>new Promise<void>((resolve,reject)=>{const r=indexedDB.open('evidence-quest-garden-adventure-v1');r.onsuccess=()=>{const db=r.result,tx=db.transaction('slots','readwrite');tx.objectStore('slots').put(record,'current');tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>reject(tx.error);};r.onerror=()=>reject(r.error);}),record);await page.reload();
 const scene=page.locator('.garden-scene');await expect.poll(async()=>{const a=JSON.parse(await scene.getAttribute('data-character-assets')??'{}');return a.objects?.includes('loaf')&&a.cast?.some((c:{id:string;ready:boolean})=>c.id==='rina'&&c.ready);},{timeout:60000}).toBe(true);
 let previous='',stable=0;await expect.poll(async()=>{const matrix=await scene.getAttribute('data-camera-projection')??'';stable=previous===matrix?stable+1:0;previous=matrix;return stable;},{intervals:[100]}).toBeGreaterThan(3);
 const loaf=JSON.parse((await scene.getAttribute('data-bakery'))!).loaves[0];await page.screenshot({path:info.outputPath('loaf-before-handoff.png')});
 const start=await screenPoint(page,{...loaf,y:loaf.y+.05});await page.mouse.move(start.x,start.y);await page.mouse.down();
 await info.attach('pointer-hit',{body:JSON.stringify({target:await scene.getAttribute('data-pointer-target'),loaf,start}),contentType:'application/json'});
 await expect(scene).toHaveAttribute('data-hand-gesture',/loaf/);const end=await screenPoint(page,{...WORKSHOP_DOOR,y:.85});await page.mouse.move(end.x,end.y,{steps:12});await page.mouse.up();await expect.poll(async()=>(await savedChapter(page)).bakery.stage).toBe('done');await page.screenshot({path:info.outputPath('loaf-handed-to-sol.png')});const after=(await savedChapter(page)).bakery;await page.reload();expect((await savedChapter(page)).bakery).toEqual(after);
});

async function loadRoof(page:Page,payload:Chapter){
 await page.goto('/garden');await savedChapter(page);const record={format:1,content:payload.content,revision:payload.revision,writer:'isolated-roof-input-fixture',payload,checksum:checksum(JSON.stringify(payload))};
 await page.evaluate(record=>new Promise<void>((resolve,reject)=>{const r=indexedDB.open('evidence-quest-garden-adventure-v1');r.onsuccess=()=>{const db=r.result,tx=db.transaction('slots','readwrite');tx.objectStore('slots').put(record,'current');tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>reject(tx.error);};r.onerror=()=>reject(r.error);}),record);await page.reload();
 await enterRoof(page);
}
async function enterRoof(page:Page){
 const scene=page.locator('.garden-scene');await openDirections(page,'Bakery');const direct=page.getByRole('button',{name:'Direct Sol’s roof repair',exact:true});if(await direct.isVisible())await direct.press('Enter');
 await page.locator('.garden-bakery-controls').locator('xpath=ancestor::details').locator('summary').press('Enter');
 await expect.poll(async()=>{const a=JSON.parse(await scene.getAttribute('data-character-assets')??'{}');return a.objects?.includes('tile')&&a.objects?.includes('bakery')&&a.cast?.some((c:{id:string;ready:boolean})=>c.id==='sol'&&c.ready);},{timeout:60000}).toBe(true);
 let previous='',stable=0;await expect.poll(async()=>{const camera=await scene.getAttribute('data-camera-projection')??'';stable=previous===camera?stable+1:0;previous=camera;return stable;},{intervals:[100]}).toBeGreaterThan(3);
}
async function keyboardTile(page:Page){
 const details=page.locator('.garden-hands>details');if(await details.getAttribute('open')===null)await details.locator('summary').press('Enter');
 await page.locator('[data-hand-object="spareTile"]').press('Enter');await expect(page.locator('.garden-scene')).toHaveAttribute('data-hand-gesture',/spareTile/);
}

test('bakery keyboard tile placement cancels, resumes beside the opening and recovers the same tile',async({page},info)=>{
 await loadRoof(page,escortCheckpoint(true));const scene=page.locator('.garden-scene');
 await keyboardTile(page);await moveHandObject(page,BAKERY_REPAIR.gap.x,BAKERY_REPAIR.gap.z);await page.keyboard.press('Escape');await expect(scene).toHaveAttribute('data-hand-gesture','');expect((await savedChapter(page)).bakery.tile).toBe('sol');
 await keyboardTile(page);await moveHandObject(page,BAKERY_REPAIR.beside.x,BAKERY_REPAIR.beside.z);await page.keyboard.press('Enter');await expect.poll(async()=>(await savedChapter(page)).bakery.stage).toBe('misplaced');
 await page.reload();expect((await savedChapter(page)).bakery.tile).toBe('beside');await enterRoof(page);await keyboardTile(page);await moveHandObject(page,BAKERY_REPAIR.gap.x,BAKERY_REPAIR.gap.z);await page.keyboard.press('r');await page.keyboard.press('Enter');await expect.poll(async()=>(await savedChapter(page)).bakery.stage).toBe('sealed');
 await page.screenshot({path:info.outputPath('keyboard-roof-recovered.png')});
 await info.attach('scope',{body:'Fixture continuation through native Enter, arrow, rotation and Escape controls. The same tile survives cancellation and misplaced-save reload; valid placement automatically fits the roof.',contentType:'text/plain'});
});

test('Chromium native bakery touch cancels and then places the visible tile on the actual roof',async({page,browserName},info)=>{
 test.skip(browserName!=='chromium','Native CDP touch injection is Chromium-only; keyboard and pointer equivalents run in every engine.');
 await loadRoof(page,escortCheckpoint(true));const scene=page.locator('.garden-scene'),session=await page.context().newCDPSession(page);await session.send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:1});
 async function touchTile(cancel:boolean){
  let previous:{x:number;y:number;z:number}|null=null,stable=0;await expect.poll(async()=>{const p=JSON.parse((await scene.getAttribute('data-bakery'))!).tile;stable=previous&&Math.hypot(p.x-previous.x,p.y-previous.y,p.z-previous.z)<.001?stable+1:0;previous=p;return stable;},{intervals:[100]}).toBeGreaterThan(3);
  const tile=JSON.parse((await scene.getAttribute('data-bakery'))!).tile,start=await screenPoint(page,{x:tile.x+.10,y:tile.y+.09,z:tile.z+.18}),end=await screenPoint(page,{...BAKERY_REPAIR.gap,y:BAKERY_REPAIR.openingY+.025});
  const finger={id:1,x:start.x,y:start.y,radiusX:2,radiusY:2,force:1};await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[finger]});await expect(scene).toHaveAttribute('data-hand-gesture',/spareTile/);
  for(let i=1;i<=12;i++)await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...finger,x:start.x+(end.x-start.x)*i/12,y:start.y+(end.y-start.y)*i/12}]});
  await session.send('Input.dispatchTouchEvent',{type:cancel?'touchCancel':'touchEnd',touchPoints:[]});
 }
 await touchTile(true);await expect(scene).toHaveAttribute('data-hand-gesture','');expect((await savedChapter(page)).bakery.tile).toBe('sol');
 await touchTile(false);await expect.poll(async()=>(await savedChapter(page)).bakery.stage).toBe('sealed');const after=(await savedChapter(page)).bakery;await page.screenshot({path:info.outputPath('touch-roof-placed.png')});await session.detach();await page.reload();expect((await savedChapter(page)).bakery).toEqual(after);
 await info.attach('scope',{body:'Fixture continuation using Chromium native touch protocol against the actual visible supplied tile and roof. No HAND command injection or helper completion. Cancellation and completed-save reload checked.',contentType:'text/plain'});
});
