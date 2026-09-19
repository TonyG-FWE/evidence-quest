import {test,expect,type Page,type Locator,type TestInfo,type CDPSession} from '@playwright/test';
import {createHash} from 'node:crypto';
import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {join,relative} from 'node:path';
import {worldPoint,openHandControls,closeHandControls} from './garden-actions.js';
import {savedChapter,readPersistedChapter} from './garden-save-fixture.js';
import {WATER_SURFACE_Y,BRIDGE_LEVELS,terrainHeight} from '../src/garden/worldLayout.js';

// The review config opts in. The integration owner's standard suite keeps its
// original membership; this file never mutates storage or calls game commands.
if(process.env['EQ_INDEPENDENT_REVIEW']==='1'){
 const scene=(page:Page)=>page.locator('.garden-scene');
 const button=(page:Page,name:string)=>page.getByRole('button',{name,exact:true});
 type ScreenPoint={x:number;y:number};
 type Driver={down(p:ScreenPoint):Promise<void>;move(p:ScreenPoint):Promise<void>;up():Promise<void>;cancel?():Promise<void>};
 const bindings=new Map<string,ReturnType<typeof sourceBinding>>();
 const errors=new Map<string,string[]>();
 function sourceBinding(){
  const files:string[]=[];
  const walk=(path:string)=>{for(const e of readdirSync(path,{withFileTypes:true})){const p=join(path,e.name);if(e.isDirectory())walk(p);else files.push(p);}};
  walk('src/garden');
  if(process.env['EQ_TEST_DEV']!=='1'&&existsSync('dist/review-client/assets'))walk('dist/review-client/assets');
  for(const p of ['package-lock.json','vite.config.ts','dist/server/index.js','dist/review-client/index.html','evidence/final-demo-20260918/review-assets.json','playwright.repair-review.config.ts','browser-tests/garden-repair-review.spec.ts'])if(existsSync(p))files.push(p);
  const hashes=Object.fromEntries(files.sort().map(path=>[relative(process.cwd(),path).replaceAll('\\','/'),createHash('sha256').update(readFileSync(path)).digest('hex')]));
  return {digest:createHash('sha256').update(JSON.stringify(hashes)).digest('hex'),files:hashes};
 }
 test.beforeEach(async({page},info)=>{bindings.set(info.testId,sourceBinding());const messages:string[]=[];errors.set(info.testId,messages);page.on('pageerror',e=>messages.push(e.message));});
 test.afterEach(async({page},info)=>{
  const before=bindings.get(info.testId),after=sourceBinding();
  await info.attach('source-binding',{body:JSON.stringify({before,after,unchanged:before?.digest===after.digest},null,2),contentType:'application/json'});
  await info.attach('browser-errors',{body:JSON.stringify(errors.get(info.testId)),contentType:'application/json'});
  if(!page.isClosed()){
   await page.screenshot({path:info.outputPath('final-visible-state.png'),fullPage:true}).catch(()=>{});
   const chapter=await readPersistedChapter(page).catch(()=>null);
   const visible=await scene(page).evaluate(el=>Object.fromEntries(['pipX','pipZ','handGesture','bridgeConstruction','seedBoatX','seedBoatZ','seedBoatHeading','ferryPhase','actionKind'].map(key=>[key,(el as HTMLElement).dataset[key]]))).catch(()=>null);
   await info.attach('last-committed-state',{body:JSON.stringify({chapter,visible},null,2),contentType:'application/json'});
  }
  expect.soft(after.digest,'Runtime source changed during this run; it cannot qualify a fixed candidate').toBe(before?.digest);
  expect.soft(errors.get(info.testId),'Uncaught browser errors').toEqual([]);
 });
 async function shot(page:Page,info:TestInfo,name:string){await page.screenshot({path:info.outputPath(name+'.png'),fullPage:true});}
 async function fresh(page:Page){
  await page.goto('/garden');await button(page,'Begin Pip’s adventure').click();await button(page,'Start playing').click();
  await expect(scene(page)).toHaveAttribute('data-camera-projection',/^\{/);
  await expect.poll(async()=>JSON.parse(await scene(page).getAttribute('data-character-assets')??'{}').pip,{timeout:30000}).toBe('p2-review');
 }
 async function bridge(page:Page){
  await fresh(page);await button(page,'Go to the bridge pieces').click();
  await expect(scene(page)).toHaveAttribute('data-pip-x','-2.800');await expect(scene(page)).toHaveAttribute('data-pip-z','0.800');
  await expect(page.locator('[data-bridge-handle="section:a"]')).toBeVisible();
  await closeHandControls(page);
 }
 async function center(locator:Locator){await expect(locator).toBeVisible();const box=await locator.boundingBox();expect(box).not.toBeNull();return {x:box!.x+box!.width/2,y:box!.y+box!.height/2};}
 function mouse(page:Page):Driver{return {down:async p=>{await page.mouse.move(p.x,p.y);await page.mouse.down();},move:async p=>{await page.mouse.move(p.x,p.y,{steps:12});},up:async()=>{await page.mouse.up();}};}
 async function capturedPointers(page:Page){return scene(page).locator('canvas').evaluate(canvas=>Array.from({length:32},(_,id)=>id).filter(id=>canvas.hasPointerCapture(id)));}
 async function touch(page:Page):Promise<Driver>{
  const cdp:CDPSession=await page.context().newCDPSession(page);
  let previous:ScreenPoint={x:0,y:0};
  return {down:async p=>{previous=p;await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...p,id:1,radiusX:7,radiusY:7}]});},
   move:async p=>{const from=previous;for(let n=1;n<=12;n++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:from.x+(p.x-from.x)*n/12,y:from.y+(p.y-from.y)*n/12,id:1,radiusX:7,radiusY:7}]});previous=p;},
   up:async()=>{await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});},
   cancel:async()=>{await cdp.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});},
  };
 }
 async function beginDrag(page:Page,driver:Driver,id:string){
  const grip=page.locator(`[data-bridge-handle="${id}"]`),from=await center(grip);
  const box=await grip.boundingBox();expect.soft(Math.min(box!.width,box!.height),'Visible grip must be a generous touch target').toBeGreaterThanOrEqual(44);
  await driver.down(from);await driver.move({x:from.x+9,y:from.y});
  await expect(scene(page)).toHaveAttribute('data-hand-gesture',new RegExp(id));
 }
 async function drop(page:Page,driver:Driver,id:string){
  await test.step('Drag visible '+id+' to its outlined destination',async()=>{
   await beginDrag(page,driver,id);
   const target=page.locator(`[data-bridge-drop="${id}${id.startsWith('section:')?':0':''}"]`);
   await driver.move(await center(target));await driver.up();
   await expect(scene(page)).toHaveAttribute('data-hand-gesture','');
   if(id.startsWith('post:'))await expect.poll(async()=>(await savedChapter(page)).river.construction.posts[id.slice(5)]).toBe(true);
   if(id.startsWith('rope:'))await expect.poll(async()=>Object.values((await savedChapter(page)).river.construction.ropes[id.slice(5)]).filter(Boolean).length).toBeGreaterThanOrEqual(2);
  });
 }
 async function walkDeck(page:Page,x:number,driver=mouse(page)){const p=await worldPoint(page,x,3,BRIDGE_LEVELS.deck+.01);await driver.down(p);await driver.up();}
 async function assertFirst(page:Page){await expect.poll(async()=>JSON.parse(await scene(page).getAttribute('data-bridge-construction')??'{}').secured?.a).toBe(true);}
 async function firstSpan(page:Page,driver:Driver){
  await drop(page,driver,'section:a');
  for(const id of ['west-north','west-south','center-north','center-south'])await drop(page,driver,'post:'+id);
  for(const side of ['north','south'])await drop(page,driver,'rope:'+side);
  await assertFirst(page);
 }
 async function secondSpan(page:Page,driver:Driver){
  await walkDeck(page,-.70,driver);await expect.poll(async()=>Math.abs(Number(await scene(page).getAttribute('data-pip-x'))+.70)).toBeLessThan(.06);
  await drop(page,driver,'section:b');for(const id of ['east-north','east-south'])await drop(page,driver,'post:'+id);
  for(const side of ['north','south'])await drop(page,driver,'rope:'+side);
  await expect(scene(page)).toHaveAttribute('data-bridge-ready','true');
 }
 async function captureGripLayout(page:Page,info:TestInfo){
  const grips=await page.locator('[data-bridge-handle]:visible').evaluateAll(elements=>elements.map(e=>{const r=e.getBoundingClientRect();return {id:(e as HTMLElement).dataset['bridgeHandle'],x:r.x,y:r.y,width:r.width,height:r.height};}));
  await info.attach('visible-grip-layout',{body:JSON.stringify(grips,null,2),contentType:'application/json'});
  for(let i=0;i<grips.length;i++)for(let j=i+1;j<grips.length;j++){
   const a=grips[i]!,b=grips[j]!;expect.soft(Math.abs(a.x+a.width/2-b.x-b.width/2)>=(a.width+b.width)/2||Math.abs(a.y+a.height/2-b.y-b.height/2)>=(a.height+b.height)/2,`Parts ${a.id} and ${b.id} must not share their visible grab area`).toBe(true);
  }
 }
 test('visible mouse dragging completes all bridge parts, preserves partial work and recovers the same materials',async({page},info)=>{
  await bridge(page);const driver=mouse(page);await shot(page,info,'01-before-pickup');
  expect.soft(await page.locator('[data-bridge-drop]:visible').count(),'Compatible destinations must be visible before pickup').toBeGreaterThan(0);
  await captureGripLayout(page,info);
  const original=(await savedChapter(page)).sections;
  await beginDrag(page,driver,'section:a');expect(await capturedPointers(page),'A real mouse drag captures its pointer').toHaveLength(1);
  await page.keyboard.press('Escape');await expect(scene(page)).toHaveAttribute('data-hand-gesture','');
  await expect.poll(()=>capturedPointers(page),{message:'Escape releases native capture before the pointer button is released'}).toEqual([]);
  await driver.move(await worldPoint(page,-3.8,4.4,.16));await expect(scene(page)).toHaveAttribute('data-hand-gesture','');await driver.up();
  expect((await savedChapter(page)).sections,'Escape keeps committed placement').toEqual(original);
  await beginDrag(page,driver,'section:a');const miss=await worldPoint(page,-4.6,6.1,.16);await driver.move(miss);await driver.up();
  expect.soft((await savedChapter(page)).sections,'A missed drop returns to its last committed placement').toEqual(original);
  await firstSpan(page,driver);await shot(page,info,'02-first-span-secure');
  const partial=await savedChapter(page);await page.reload();await expect(scene(page)).toHaveAttribute('data-camera-projection',/^\{/);await assertFirst(page);
  const restored=await savedChapter(page);expect(restored.sections).toEqual(partial.sections);expect(restored.river.construction).toEqual(partial.river.construction);
  await walkDeck(page,-.70);await expect.poll(async()=>Math.abs(Number(await scene(page).getAttribute('data-pip-x'))+.70)).toBeLessThan(.06);
  await drop(page,driver,'section:b');await walkDeck(page,.70);
  await expect.poll(async()=>(await savedChapter(page)).story.bridgeFailures).toBe(1);await assertFirst(page);
  expect((await savedChapter(page)).sections.a,'A secured first span survives a loose second span').toEqual(partial.sections.a);
  await shot(page,info,'03-loose-second-span-recovered');await secondSpan(page,driver);
  const complete=await savedChapter(page);expect(Object.values(complete.river.construction.posts).filter(Boolean)).toHaveLength(6);
  expect(Object.keys(complete.sections).sort()).toEqual(['a','b']);expect(Object.keys(complete.river.construction.ropes).sort()).toEqual(['north','south']);
  await shot(page,info,'04-all-parts-complete');await button(page,'Go to Grandma').click();
  await expect.poll(async()=>(await readPersistedChapter(page))?.crossed,{timeout:30000}).toBe(true);
  await shot(page,info,'05-successful-crossing');
  // Actual walking and map cameras, with the enlarged buildings loaded. These
  // captures require visual review; their existence alone is not acceptance.
  for(const [name,x,z]of [['workshop',8.55,-9.4],['bakery',18.05,1.45],['dock-office',-6.5,-13.05]] as const){
   if(!await button(page,'Fit map').isVisible())await button(page,'Map and camera').click();
   await button(page,'Fit map').click();
   let prior='';await expect.poll(async()=>{const current=await scene(page).getAttribute('data-camera-projection')??'',settled=current===prior;prior=current;return settled;},{message:'Free-camera framing settles before the world click'}).toBe(true);
   const p=await worldPoint(page,x,z,terrainHeight({x,z}));await page.mouse.click(p.x,p.y);
   await expect.poll(async()=>Math.hypot(Number(await scene(page).getAttribute('data-pip-x'))-x,Number(await scene(page).getAttribute('data-pip-z'))-z),{timeout:45000,message:'Clear approach to '+name}).toBeLessThan(.15);
   await shot(page,info,'building-'+name);
  }
 });
 test('named keyboard destinations support switching, cancellation and complete bridge construction',async({page},info)=>{
  await bridge(page);const initial=(await savedChapter(page)).sections;await openHandControls(page);
  const choose=async(id:string)=>{const control=page.locator(`[data-hand-object="${id}"]`);await expect(control).toHaveAccessibleName(/\S/);await control.focus();await page.keyboard.press('Enter');await expect(scene(page)).toHaveAttribute('data-hand-gesture',new RegExp(id));};
  const place=async(name:string)=>{const control=button(page,name);await control.focus();await page.keyboard.press('Enter');await expect(scene(page)).toHaveAttribute('data-hand-gesture','');};
  await choose('section:a');await page.keyboard.press('ArrowRight');await choose('section:b');await page.keyboard.press('Escape');expect((await savedChapter(page)).sections).toEqual(initial);
  await choose('section:a');expect.soft(await page.locator('.garden-hands input[type="number"]').count(),'Coordinate entry is removed from player controls').toBe(0);
  await place('Near bank at the narrow crossing');
  for(const id of ['west-north','west-south','center-north','center-south']){await choose('post:'+id);await place('Set post in its socket');}
  for(const side of ['north','south']){await choose('rope:'+side);await place('Wrap and tighten at the next post');}
  await assertFirst(page);await closeHandControls(page);await walkDeck(page,-.70);await expect.poll(async()=>Math.abs(Number(await scene(page).getAttribute('data-pip-x'))+.70)).toBeLessThan(.06);await openHandControls(page);
  await choose('section:b');await place('Connect to the first section');
  for(const id of ['east-north','east-south']){await choose('post:'+id);await place('Set post in its socket');}
  for(const side of ['north','south']){await choose('rope:'+side);await place('Wrap and tighten at the next post');}
  await expect(scene(page)).toHaveAttribute('data-bridge-ready','true');await shot(page,info,'keyboard-bridge-complete');
 });
 test('@touch browser-emulated touch drags every bridge part and cancels an interrupted gesture',async({page},info)=>{
  await bridge(page);const driver=await touch(page),initial=(await savedChapter(page)).sections;
  await beginDrag(page,driver,'section:a');await driver.cancel!();await expect(scene(page)).toHaveAttribute('data-hand-gesture','');expect((await savedChapter(page)).sections).toEqual(initial);
  await firstSpan(page,driver);await secondSpan(page,driver);await shot(page,info,'touch-bridge-complete');
  await info.attach('touch-scope',{body:'Chromium CDP touchStart/touchMove/touchEnd/touchCancel, routed through browser pointer handling. Physical touch hardware and non-Chromium touch dragging are NOT_RUN.',contentType:'text/plain'});
 });
 type Boat={at:number;x:number;z:number;heading:number;seedX:number;seedZ:number};
 async function boat(page:Page):Promise<Boat>{return scene(page).evaluate(el=>{const d=(el as HTMLElement).dataset;return {at:performance.now(),x:Number(d['seedBoatX']),z:Number(d['seedBoatZ']),heading:Number(d['seedBoatHeading']),seedX:Number(d['seedX']),seedZ:Number(d['seedZ'])};});}
 const distance=(a:{x:number;z:number},b:{x:number;z:number})=>Math.hypot(a.x-b.x,a.z-b.z);
 async function loadBoat(page:Page){
  await bridge(page);const hand=JSON.parse((await scene(page).getAttribute('data-hand-contact'))!).seedPosition as number[];
  const from=await worldPoint(page,hand[0]!,hand[2]!,hand[1]!);await page.mouse.move(from.x,from.y);await page.mouse.down();await expect(scene(page)).toHaveAttribute('data-hand-gesture',/seed/);
  const to=await worldPoint(page,-1.4,.8,.23);await page.mouse.move(to.x,to.y,{steps:12});await page.mouse.up();await expect(scene(page)).toHaveAttribute('data-ferry-phase','steering');
 }
 async function guide(page:Page,x:number,z:number,release=true,alreadyHeld=false){
  const target=await worldPoint(page,x,z,WATER_SURFACE_Y);await page.mouse.move(target.x,target.y);if(!alreadyHeld)await page.mouse.down();
  await expect.poll(async()=>{
   const current=await worldPoint(page,x,z,WATER_SURFACE_Y);await page.mouse.move(current.x,current.y);const position=await boat(page);
   // Docking deliberately aligns to the actual landing, a short distance past
   // the child's last water target. Accept that visible destination explicitly.
   if(distance({x,z},{x:2.58,z:9.2})<.4&&distance(position,{x:2.58,z:9.2})<.04)return 0;
   return distance(position,{x,z});
  },{timeout:15000,intervals:[100],message:`Child-guided boat reaches ${x}, ${z}`}).toBeLessThan(.12);
  if(release)await page.mouse.up();
 }
 test('boat turns smoothly, brakes on release, resumes heading and steers away from contact',async({page},info)=>{
  await loadBoat(page);const start=await boat(page),target=await worldPoint(page,-.8,3.2,WATER_SURFACE_Y),samples:Boat[]=[];
  await page.mouse.move(target.x,target.y);await page.mouse.down();
  for(let n=0;n<7;n++){samples.push(await boat(page));await page.waitForTimeout(80);}
  await page.mouse.up();const released=await boat(page);await page.waitForTimeout(600);const settled=await boat(page);await page.waitForTimeout(600);const stopped=await boat(page);
  expect(distance(start,released),'Holding guides the boat').toBeGreaterThan(.08);
  expect.soft(distance(settled,stopped),'Release brakes the boat instead of retaining a distant target').toBeLessThan(.04);
  expect.soft(distance(released,settled),'Braking is brief').toBeLessThan(.50);
  for(let n=1;n<samples.length;n++){const previous=samples[n-1]!,next=samples[n]!,turn=Math.abs(Math.atan2(Math.sin(next.heading-previous.heading),Math.cos(next.heading-previous.heading)));expect.soft(turn,'Heading changes progressively relative to elapsed time').toBeLessThan(4.5*(next.at-previous.at)/1000+.12);expect.soft(distance(next,{x:next.seedX,z:next.seedZ}),'Seed remains on its hull').toBeLessThan(.60);}
  await shot(page,info,'boat-after-release');await info.attach('turn-samples',{body:JSON.stringify({start,samples,released,settled,stopped},null,2),contentType:'application/json'});
  const saved=await savedChapter(page);await page.reload();await expect(scene(page)).toHaveAttribute('data-ferry-phase','steering');
  expect((await savedChapter(page)).river.boat).toEqual(saved.river.boat);await page.waitForTimeout(500);expect(distance(await boat(page),saved.river.boat.position),'Reload has no stale steering input').toBeLessThan(.04);
  // Deliberately meet the visible upstream rock, then steer back into open water.
  const rock=await worldPoint(page,0,.8,WATER_SURFACE_Y);await page.mouse.move(rock.x,rock.y);await page.mouse.down();await expect(page.locator('.garden-feedback')).toContainText(/rock|bank/i);
  expect(await capturedPointers(page),'Contact preserves the active guiding gesture').toHaveLength(1);
  const blocked=await boat(page);await guide(page,-.85,.10,true,true);expect(distance(blocked,await boat(page)),'The same held gesture can steer away from collision').toBeGreaterThan(.12);
  await scene(page).locator('canvas').focus();const beforeKey=await boat(page);await page.keyboard.down('ArrowRight');await page.waitForTimeout(600);await page.keyboard.up('ArrowRight');const afterKey=await boat(page),keyTurn=Math.abs(Math.atan2(Math.sin(afterKey.heading-beforeKey.heading),Math.cos(afterKey.heading-beforeKey.heading)));expect(distance(beforeKey,afterKey)+keyTurn*.1,'Arrow-key alternative turns or moves the boat').toBeGreaterThan(.02);
  await shot(page,info,'boat-recovered-from-contact');expect((await savedChapter(page)).seed).toBe('boat');
 });
 test('reduced-motion boat can return to launch, unload, relaunch and deliver exactly one seed',async({page},info)=>{
  await loadBoat(page);await button(page,'Pause').click();await page.getByRole('checkbox',{name:'Reduced motion',exact:true}).check();await button(page,'Close page. Back to the seed boat').click();
  expect((await savedChapter(page)).reducedMotion).toBe(true);await guide(page,-.90,.10);await guide(page,-1.4,.8);
  const unload=page.getByRole('button',{name:/unload|take.*seed.*back/i});await expect(unload).toBeEnabled();await unload.click();
  await expect.poll(async()=>(await savedChapter(page)).seed).toBe('pip');
  // Reload through the visible seed grip after a real return trip.
  const hand=JSON.parse((await scene(page).getAttribute('data-hand-contact'))!).seedPosition as number[],from=await worldPoint(page,hand[0]!,hand[2]!,hand[1]!);
  await page.mouse.move(from.x,from.y);await page.mouse.down();const cradle=await worldPoint(page,-1.4,.8,.23);await page.mouse.move(cradle.x,cradle.y,{steps:12});await page.mouse.up();await expect(scene(page)).toHaveAttribute('data-ferry-phase','steering');
  for(const [x,z]of [[-.85,.10],[.85,.10],[.85,4.1],[.25,4.1],[.25,6.3],[1.35,6.3],[1.35,6.85],[1.9,6.85],[1.9,9.05],[2.45,9.05]])await guide(page,x!,z!);
  await expect.poll(async()=>(await readPersistedChapter(page))?.seed,{timeout:30000}).toBe('grandma');
  const delivered=await savedChapter(page);expect(delivered.history.filter((event:string)=>event==='F')).toHaveLength(1);await page.reload();const resumed=await savedChapter(page);expect(resumed.history.filter((event:string)=>event==='F')).toHaveLength(1);expect(resumed.reducedMotion).toBe(true);await shot(page,info,'single-seed-delivery');
 });
}
