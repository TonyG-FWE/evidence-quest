import {moveHandObject} from './garden-actions.js';
import {test,expect,type Page} from '@playwright/test';
import {openDirections} from './garden-actions.js';
import {Matrix4,Vector3} from 'three';
import {checksum,validChapter} from '../src/garden/persistence.js';
import {GardenStore,initialGarden,CROSSING,GRANDMA_APPROACH,type Chapter} from '../src/garden/model.js';
import {anchors,BRIDGE_LEVELS,terrainHeight} from '../src/garden/worldLayout.js';
import {advance,completeConversation} from '../checks/garden-play-actions.js';
import {buildBridge} from '../checks/garden-bridge-actions.js';
import {postPoint,sectionRootHeight} from '../src/garden/bridgeConstruction.js';
import {BAKERY_APPROACH,TILE_SHELF,TILE_APPROACH} from '../src/garden/bakery.js';
import {BIRD_BOY,DOCK_OFFICE} from '../src/garden/mara.js';
import {savedChapter} from './garden-save-fixture.js';
import {storyboardFor} from '../src/garden/journal.js';
import {cardSlot,WORKBENCH} from '../src/garden/workbench.js';
import {repairBakeryWithCursor} from './bakery-cursor-actions.js';
import {localReview} from '../src/garden/assets/profile.js';

test.setTimeout(150000);

test('Sol’s scene workbench reorders actual pictures by pointer and keyboard, cancels, and saves only released order',async({page},info)=>{
 const store=new GardenStore(initialGarden('workbench-browser'));
 store.send({type:'BOOT',chapter:bakeryCheckpoint()});
 const step=(step:'REPAIR'|'REMOVE'|'PLACE'|'CHECK'|'MIX'|'SHAPE'|'BAKE'|'TAKE_LOAF'|'THANK')=>{store.send({type:'BAKERY_STEP',step});advance(store);};
 step('REPAIR');step('REMOVE');store.send({type:'TILE_PREVIEW',position:'gap'});step('PLACE');step('CHECK');store.send({type:'GO',point:store.getSnapshot().chapter.bakery.rina});advance(store);step('MIX');step('SHAPE');step('BAKE');step('TAKE_LOAF');store.send({type:'GO',point:{x:anchors.workshop.person.x+.15,z:anchors.workshop.person.z+.9}});advance(store);step('THANK');
 while(store.getSnapshot().panel)store.send({type:'CLOSE'});store.send({type:'GO',point:anchors.workshop.approach});advance(store);store.send({type:'TALK',who:'sol'});
 store.send({type:'SETTING',key:'reducedMotion',value:true});const fixture=structuredClone(store.getSnapshot().chapter);expect(validChapter(fixture)).toBe(true);const order=storyboardFor(fixture,fixture.journal).map(c=>c.id);expect(order.length).toBeGreaterThan(3);
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await loadCheckpoint(page,fixture);await button(page,'Talk to Sol').click();await button(page,'Arrange witnessed moments on Sol’s workbench').click();await expect(page.locator('.garden-scene')).toHaveAttribute('data-camera-focus','workbench');
 const scene=page.locator('.garden-scene'),first=cardSlot(0),third=cardSlot(2);await expect(scene).toHaveAttribute('data-workbench-pictures',String(order.length));
 const start=await worldPoint(page,first.x,WORKBENCH.y+.019,first.z);await page.mouse.move(start.x,start.y);await page.mouse.down();await expect.poll(()=>scene.getAttribute('data-card-gesture')).toContain(order[0]!);
 const to=await worldPoint(page,third.x,WORKBENCH.y+.02,third.z);await page.mouse.move(to.x,to.y,{steps:10});await page.keyboard.press('Escape');await page.mouse.up();expect((await savedChapter(page)).journal.storyboard).toEqual([]);
 await page.mouse.move(start.x,start.y);await page.mouse.down();await expect.poll(()=>scene.getAttribute('data-card-gesture')).toContain(order[0]!);await page.mouse.move(to.x,to.y,{steps:10});await page.mouse.up();await expect.poll(async()=>(await savedChapter(page)).journal.storyboard).toEqual([order[1],order[2],order[0],...order.slice(3)]);
 await page.locator('.garden-workbench summary').click();await page.locator('[data-workbench-card="'+order[0]+'"]').click();await page.keyboard.press('ArrowRight');await page.keyboard.press('Enter');
 const expected=[order[1],order[2],order[3],order[0],...order.slice(4)];await expect.poll(async()=>(await savedChapter(page)).journal.storyboard).toEqual(expected);
 await page.locator('.garden-workbench summary').click();await page.screenshot({path:info.outputPath('sol-workbench.png')});
 await button(page,'Read these moments with help').click();await expect(page.getByRole('heading',{name:'Moments on Sol’s workbench',exact:true})).toBeVisible();await page.getByRole('button',{name:/^Close page/}).click();await expect(scene).toHaveAttribute('data-camera-focus','workbench');
 await page.reload();expect((await savedChapter(page)).journal.storyboard).toEqual(expected);await expect(scene).toHaveAttribute('data-rendered-view','walk');expect(errors).toEqual([]);
});
const point=(x:number,z:number)=>({x,z});
const button=(page:Page,name:string)=>page.getByRole('button',{name,exact:true});
async function worldPoint(page:Page,x:number,y:number,z:number){
 const scene=page.locator('.garden-scene'),canvas=scene.locator('canvas');
 // A reader changes the canvas width. Wait for its real rendered dimensions,
 // then read projection and bounds together instead of mixing two frames.
 await expect.poll(()=>canvas.evaluate(e=>Math.abs(e.width-e.getBoundingClientRect().width*devicePixelRatio)<2)).toBe(true);
 const {data,box}=await scene.evaluate(e=>{const r=e.querySelector('canvas')!.getBoundingClientRect();return {data:(e as HTMLElement).dataset['cameraProjection'],box:{x:r.x,y:r.y,width:r.width,height:r.height}};});expect(data).toBeTruthy();
 const matrices=JSON.parse(data!),position=new Vector3(x,y,z).applyMatrix4(new Matrix4().fromArray(matrices.view)).applyMatrix4(new Matrix4().fromArray(matrices.projection));
 return {x:box.x+(position.x+1)*box.width/2,y:box.y+(1-position.y)*box.height/2};
}
async function drag(page:Page,object:string,from:{x:number;z:number},to:{x:number;z:number},height:number,dropHeight=height){
 const grip=page.locator(`[data-bridge-handle="${object}"]`),box=object.startsWith('rope:')&&await grip.isVisible()?await grip.boundingBox():null;
 const start=box?{x:box.x+box.width/2,y:box.y+box.height/2}:await worldPoint(page,from.x,height,from.z);await page.mouse.move(start.x,start.y);await page.mouse.down();
 if(object.startsWith('section:'))await page.mouse.move(start.x+8,start.y,{steps:2});
 await expect.poll(async()=>JSON.parse(await page.locator('.garden-scene').getAttribute('data-hand-gesture')||'null')?.object).toBe(object);
 const end=await worldPoint(page,to.x,dropHeight,to.z);await page.mouse.move(end.x,end.y,{steps:12});await page.mouse.up();
 await expect(page.locator('.garden-scene')).toHaveAttribute('data-hand-gesture','');
}
async function begin(page:Page){await page.goto('/garden');await button(page,'Begin Pip’s adventure').click();await button(page,'Start playing').click();await button(page,'Go to the bridge pieces').click();await expect(page.locator('.garden-scene')).toHaveAttribute('data-pip-x',CROSSING.x.toFixed(3));}
async function nativeDrag(page:Page,name:string,to:{x:number;z:number}){
 const controls=page.locator('.garden-hands');if(!await controls.locator('details').evaluate(e=>(e as HTMLDetailsElement).open))await controls.locator('summary').click();
 const choice=controls.getByRole('button',{name,exact:true}),object=await choice.getAttribute('data-hand-object');await choice.click();await expect.poll(async()=>JSON.parse(await page.locator('.garden-scene').getAttribute('data-hand-gesture')||'null')?.object).toBe(object);await moveHandObject(page,to.x,to.z);await button(page,'Release object').click();
}
async function closeHandControls(page:Page){const details=page.locator('.garden-hands details');if(await details.count()&&await details.evaluate(e=>(e as HTMLDetailsElement).open))await details.locator('summary').click();}
async function controlsForPost(page:Page,id:string){const controls=page.locator('.garden-hands');if(!await controls.locator('details').evaluate(e=>(e as HTMLDetailsElement).open))await controls.locator('summary').click();await controls.locator(`[data-hand-object="post:${id}"]`).click();await button(page,'Set post in its socket').click();}
/** A labeled seeded state constructed through real chapter commands. It only
 * avoids replaying earlier encounters in each focused physical-input test. */
function bakeryCheckpoint():Chapter{
 const store=new GardenStore(initialGarden('hands-browser-bakery'));store.send({type:'BOOT'});store.send({type:'BEGIN'});store.send({type:'START_PLAY'});store.send({type:'GO',point:CROSSING});advance(store);
 buildBridge(store);store.send({type:'GO',point:GRANDMA_APPROACH});advance(store);
 store.send({type:'GO',point:BAKERY_APPROACH});advance(store);store.send({type:'TALK',who:'rina'});advance(store);completeConversation(store);store.send({type:'BAKERY_STEP',step:'PERMISSION'});
 while(store.getSnapshot().panel)store.send({type:'CLOSE'});store.send({type:'GO',point:TILE_APPROACH});advance(store);store.send({type:'BAKERY_STEP',step:'PICKUP'});advance(store);store.send({type:'GO',point:BAKERY_APPROACH});advance(store);store.send({type:'BAKERY_STEP',step:'DELIVER'});advance(store);
 const c=structuredClone(store.getSnapshot().chapter);expect(validChapter(c)).toBe(true);return c;
}
async function loadCheckpoint(page:Page,payload:Chapter){
 await page.goto('/garden');await savedChapter(page);const record={format:1,content:payload.content,revision:payload.revision,writer:'focused-input-fixture',payload,checksum:checksum(JSON.stringify(payload))};
 await page.evaluate(async record=>new Promise<void>((resolve,reject)=>{const r=indexedDB.open('evidence-quest-garden-adventure-v1',1);r.onerror=()=>reject(r.error);r.onsuccess=()=>{const db=r.result,tx=db.transaction('slots','readwrite');tx.objectStore('slots').put(record,'current');tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>reject(tx.error);};}),record);
 await page.reload();await expect(page.locator('.garden-scene canvas,.g-mara-scene canvas')).toBeVisible();await expect(page.locator('.g-save')).toHaveText('Saved in this browser');
}

test('real canvas dragging builds a bridge; keyboard cancellation preserves materials; planting persists',async({page},info)=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await begin(page);
 await nativeDrag(page,'Repair ropes',CROSSING);await expect.poll(async()=>(await savedChapter(page)).river.ropesCollected).toBe(true);
 // Close the native panel: every construction step below is a pointer gesture.
 await closeHandControls(page);const original=(await savedChapter(page)).sections;
 const start=await worldPoint(page,original.a.x,sectionRootHeight(original.a,'a')+BRIDGE_LEVELS.sourceSurface.a,original.a.z);await page.mouse.move(start.x,start.y);await page.mouse.down();await page.mouse.move(start.x+8,start.y,{steps:2});await expect(page.locator('.garden-scene')).toHaveAttribute('data-hand-gesture',/section:a/);await page.keyboard.press('Escape');await page.mouse.up();
 expect((await savedChapter(page)).sections).toEqual(original);await expect(page.locator('.garden-reader')).toHaveCount(0);await expect(page.locator('.garden-scene')).toHaveAttribute('data-rendered-view','walk');
 await drag(page,'section:a',original.a,point(-.775,3),sectionRootHeight(original.a,'a')+BRIDGE_LEVELS.sourceSurface.a,BRIDGE_LEVELS.deck+.03);await drag(page,'section:b',original.b,point(.775,3),sectionRootHeight(original.b,'b')+BRIDGE_LEVELS.sourceSurface.b,BRIDGE_LEVELS.deck+.03);
 expect((await savedChapter(page)).joined).toBe(true);
 const bank=await worldPoint(page,-2.15,terrainHeight({x:-2.15,z:3})-.015,3);await page.mouse.click(bank.x,bank.y);await expect.poll(async()=>Number(await page.locator('.garden-scene').getAttribute('data-pip-z'))).toBeCloseTo(3,1);
 for(const id of ['west-north','west-south','center-north','center-south'] as const){await controlsForPost(page,id);}
 for(const side of ['north','south'] as const){const c=await savedChapter(page),from=postPoint(c,`west-${side}`),to=postPoint(c,`center-${side}`);await closeHandControls(page);await drag(page,'rope:'+side,point(from.x+.16,from.z+.055),to,BRIDGE_LEVELS.deck+BRIDGE_LEVELS.ropeAboveDeck,BRIDGE_LEVELS.deck+BRIDGE_LEVELS.ropeAboveDeck);}
 const first=await worldPoint(page,-.7,BRIDGE_LEVELS.deck,3);await page.mouse.click(first.x,first.y);await expect.poll(async()=>Number(await page.locator('.garden-scene').getAttribute('data-pip-x'))).toBeCloseTo(-.7,1);
 for(const id of ['east-north','east-south'] as const)await controlsForPost(page,id);
 for(const side of ['north','south'] as const){const c=await savedChapter(page),from=postPoint(c,`center-${side}`),to=postPoint(c,`east-${side}`);await closeHandControls(page);await drag(page,'rope:'+side,from,to,BRIDGE_LEVELS.deck+BRIDGE_LEVELS.ropeAboveDeck);}
 await expect(page.locator('.garden-scene')).toHaveAttribute('data-bridge-ready','true');await expect(page.locator('.garden-scene')).toHaveAttribute('data-rendered-view','walk');
 await page.screenshot({path:info.outputPath('bridge-direct.png')});await button(page,'Go to Grandma').click();await expect(page.locator('.garden-scene')).toHaveAttribute('data-pip-x',GRANDMA_APPROACH.x.toFixed(3));
 await drag(page,'soil',anchors.garden.plant,point(anchors.garden.plant.x+.5,anchors.garden.plant.z),.23);
 const contact=JSON.parse((await page.locator('.garden-scene').getAttribute('data-hand-contact'))!);expect(contact.seedPosition).toEqual(contact.pip);const [seedX,seedY,seedZ]=contact.seedPosition;
 await drag(page,'seed',point(seedX,seedZ),anchors.garden.plant,seedY,.23);expect((await savedChapter(page)).seed).toBe('bed');
 await page.reload();expect((await savedChapter(page)).seed).toBe('bed');await drag(page,'soil',point(anchors.garden.plant.x+.25,anchors.garden.plant.z),point(anchors.garden.plant.x-.25,anchors.garden.plant.z),.23);await expect(page.getByRole('button',{name:'Touch the sprout to help it grow',exact:true})).toBeEnabled();expect((await savedChapter(page)).bloomed).toBe(false);await page.reload();await page.getByRole('button',{name:'Touch the sprout to help it grow',exact:true}).click();await expect.poll(async()=>(await savedChapter(page)).bloomed,{timeout:15000}).toBe(true);if(localReview)await expect.poll(async()=>{const a=JSON.parse(await page.locator('.garden-scene').getAttribute('data-character-assets')??'{}');return ['bench-1','chest','arbor'].every(id=>a.objects?.includes(id))&&a.pending===0;},{timeout:60000}).toBe(true);await page.screenshot({path:info.outputPath('planting-direct.png')});expect(errors).toEqual([]);
});

test('keyboard object selection and missed-drop Enter release without committing a disconnected section',async({page})=>{
 await begin(page);const before=(await savedChapter(page)).sections;
 await page.locator('.garden-hands summary').click();const object=page.locator('.garden-hands').getByRole('button',{name:'Section A',exact:true});await object.focus();await page.keyboard.press('Enter');
 await expect(page.locator('.garden-scene')).toHaveAttribute('data-hand-gesture',/section:a/);await page.keyboard.press('ArrowRight');await page.keyboard.press('Enter');
 await expect(page.locator('.garden-scene')).toHaveAttribute('data-hand-gesture','');const after=(await savedChapter(page)).sections;expect(after.a).toEqual(before.a);expect(after.b).toEqual(before.b);
});

function birdCheckpoint():Chapter{
 const store=new GardenStore(initialGarden('hands-browser-bird'));store.send({type:'BOOT'});store.send({type:'BEGIN'});store.send({type:'START_PLAY'});
 const go=(p:{x:number;z:number})=>{while(store.getSnapshot().panel)store.send({type:'CLOSE'});store.send({type:'GO',point:p});advance(store);};
 go(anchors.dock.approach);store.send({type:'TALK',who:'mara'});completeConversation(store);store.send({type:'TAKE_PAGE'});advance(store);buildBridge(store);go(GRANDMA_APPROACH);
 store.send({type:'TALK',who:'grandma'});store.send({type:'REPORT'});advance(store);store.send({type:'STORY',event:{kind:'REPORT_MARA'}});while(store.getSnapshot().panel)store.send({type:'CLOSE'});store.send({type:'STORY',event:{kind:'SHARE_MARA'}});advance(store);
 store.send({type:'MARA_STEP',step:'ASK'});advance(store);store.send({type:'MARA_GO',point:DOCK_OFFICE});advance(store);store.send({type:'MARA_STEP',step:'TAPE'});advance(store);store.send({type:'MARA_GO',point:BIRD_BOY});advance(store);
 const c=structuredClone(store.getSnapshot().chapter);expect(validChapter(c)).toBe(true);return c;
}
async function birdPoint(page:Page,x:number,y:number){
 const scene=page.locator('.g-mara-scene'),box=(await scene.locator('canvas').boundingBox())!,matrix=JSON.parse((await scene.getAttribute('data-bird-matrix'))!),camera=JSON.parse((await scene.getAttribute('data-camera-projection'))!);
 const p=new Vector3(x,y,.075).applyMatrix4(new Matrix4().fromArray(matrix)).applyMatrix4(new Matrix4().fromArray(camera.view)).applyMatrix4(new Matrix4().fromArray(camera.projection));return {x:box.x+(p.x+1)*box.width/2,y:box.y+(1-p.y)*box.height/2};
}
test('Mara’s actual wing and tape respond to pointer translation and keyboard rotation',async({page},info)=>{
 await loadCheckpoint(page,birdCheckpoint());const scene=page.locator('.g-mara-scene');await expect(scene).toHaveAttribute('data-wing-aligned','false');
 await expect.poll(async()=>{const a=JSON.parse(await scene.getAttribute('data-character-assets')??'{}');return a.mara&&a.boy&&a.pending===0;},{timeout:60000}).toBe(true);
 const local={x:.22+.28*Math.cos(-.48)-.07*Math.sin(-.48),y:-.12+.28*Math.sin(-.48)+.07*Math.cos(-.48)},start=await birdPoint(page,local.x,local.y);
 await page.mouse.move(start.x,start.y);await page.mouse.down();await expect(scene).toHaveAttribute('data-hand-gesture',/wing/);for(let i=0;i<4;i++)await page.keyboard.press('r');const end=await birdPoint(page,local.x-.22,local.y+.12);await page.mouse.move(end.x,end.y,{steps:12});await page.mouse.up();await expect(scene).toHaveAttribute('data-wing-aligned','true');
 const strip=await birdPoint(page,-.15,.20);await page.mouse.move(strip.x,strip.y);await page.mouse.down();await expect(scene).toHaveAttribute('data-hand-gesture',/tape/);const across=await birdPoint(page,.16,0);await page.mouse.move(across.x,across.y,{steps:12});await page.mouse.up();await expect(scene).toHaveAttribute('data-strip','across');expect((await savedChapter(page)).mara.participated).toBe(false);await page.screenshot({path:info.outputPath('wing-repaired.png')});
});

test('Chromium native touch protocol keeps a gesture with its owning finger and cancels safely',async({page,browserName},info)=>{
 test.skip(browserName!=='chromium','Native CDP touch injection is Chromium-only; mouse and keyboard run in every engine.');
 await begin(page);
 await page.evaluate(()=>{const events:{type:string;id:number}[]=[];(window as unknown as {nativeTouchEvents:typeof events}).nativeTouchEvents=events;for(const type of ['pointerdown','pointerup','pointercancel','lostpointercapture'])document.addEventListener(type,event=>{const e=event as PointerEvent;if(e.pointerType==='touch')events.push({type:e.type,id:e.pointerId});},true);});
 const chapter=await savedChapter(page),start=await worldPoint(page,chapter.sections.a.x,sectionRootHeight(chapter.sections.a,'a')+BRIDGE_LEVELS.sourceSurface.a,chapter.sections.a.z),session=await page.context().newCDPSession(page);
 await session.send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:2});const finger={id:1,x:start.x,y:start.y,radiusX:2,radiusY:2,force:1},other={id:2,x:start.x+220,y:start.y-100,radiusX:2,radiusY:2,force:1};
 await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[finger]});await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{...finger,x:finger.x+8}]});await expect(page.locator('.garden-scene')).toHaveAttribute('data-hand-gesture',/section:a/);
 // Chromium CreateWebTouchEvents processes the supplied changed contact IDs;
 // verify the native pointerup ID instead of assuming the older .d.ts active-set wording.
 // https://chromium.googlesource.com/chromium/src/+/refs/heads/main/content/browser/devtools/protocol/input_handler.cc
 await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[other]});await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[other]});await expect(page.locator('.garden-scene')).toHaveAttribute('data-hand-gesture',/section:a/);
 const events=await page.evaluate(()=>(window as unknown as {nativeTouchEvents:{type:string;id:number}[]}).nativeTouchEvents);const owner=events.find(e=>e.type==='pointerdown')!.id;expect(events.some(e=>e.type==='pointerup'&&e.id!==owner)).toBe(true);expect(events.some(e=>e.type==='pointerup'&&e.id===owner)).toBe(false);await info.attach('native-touch-events',{body:JSON.stringify(events),contentType:'application/json'});
 await session.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});await expect(page.locator('.garden-scene')).toHaveAttribute('data-hand-gesture','');expect((await savedChapter(page)).sections).toEqual(chapter.sections);await session.detach();
});

test('roof and dough use real pointer gestures; journal writing stays available during repair',async({page},info)=>{
 await loadCheckpoint(page,bakeryCheckpoint());await openDirections(page,'Bakery');
 const direct=button(page,'Direct Sol’s roof repair');if(await direct.isVisible())await direct.click();
 await page.locator('.garden-bakery-controls').locator('xpath=ancestor::details').locator('summary').click();
 await button(page,'Observation journal').click();await page.getByRole('textbox',{name:'Personal notes (optional)'}).fill('The flour needs a dry place.');await page.locator('.g-reader-top .g-close').click();expect((await savedChapter(page)).journal.notes).toBe('The flour needs a dry place.');
 await repairBakeryWithCursor(page,info);
 const finished=(await savedChapter(page)).bakery;await page.reload();expect((await savedChapter(page)).bakery).toEqual(finished);
 await info.attach('scope',{body:'Explicit command-driven fixture starts after tile delivery. The roof view is opened before the journal check. Repair, flour inspection, pouring, kneading, adjustable cuts, oven placement, collection, walking and the final handoff then use the visible scene targets. No calculated world-coordinate input or physical-action buttons. Fixture continuation and retained reload assertion are separate from fresh-route acceptance.',contentType:'text/plain'});
});
