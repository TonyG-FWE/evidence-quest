import {test,expect,type Page} from '@playwright/test';
import {type Chapter} from '../src/garden/model.js';
import {anchors} from '../src/garden/worldLayout.js';
import {planProblems} from '../src/garden/chapter.js';
import {observationsFor} from '../src/garden/journal.js';
import {savedChapter} from './garden-save-fixture.js';
import {buildStagedBridge,chooseHandObject,moveHandObject,closeHandControls,finishBoatDelivery,waitForWalk,waitForBoatStop} from './garden-actions.js';

test.setTimeout(240000);
const button=(page:Page,name:string)=>page.getByRole('button',{name,exact:true});
const physicalHistory=(c:Chapter)=>c.history.filter(event=>['B','F','P','L'].includes(event));
const notes='I noticed that the seed stayed with its owner until we put it in the soil.';

async function begin(page:Page){
 await page.goto('/garden');await button(page,'Begin Pip’s adventure').click();await button(page,'Start playing').click();
 await button(page,'Observation journal').click();await page.getByLabel('Personal notes (optional)',{exact:true}).fill(notes);await button(page,'Back to the adventure').click();return await savedChapter(page) as Chapter;
}
async function ferrySeed(page:Page){
 const scene=page.locator('.garden-scene');await button(page,'Go to the bridge pieces').click();await expect(scene).toHaveAttribute('data-pip-x',anchors.crossing.approach.x.toFixed(3));
 const before=await savedChapter(page);await chooseHandObject(page,'seed');await moveHandObject(page,anchors.boat.launch.x,anchors.boat.launch.z);await button(page,'Release object').click();await expect(scene).toHaveAttribute('data-ferry-phase','steering');
 expect((await savedChapter(page)).seed).toBe('boat');await button(page,'Upstream ↑').click();await expect(scene).toHaveAttribute('data-seed-boat-z','0.250');await waitForBoatStop(page);
 for(const x of [-.85,-.3,.25,.8,1.35]){await button(page,'Garden side →').click();await expect(scene).toHaveAttribute('data-seed-boat-x',x.toFixed(3));await waitForBoatStop(page);}
 await button(page,'Downstream ↓').click();await expect(scene).toHaveAttribute('data-seed-boat-z','0.800');await finishBoatDelivery(page);
 const delivered=await savedChapter(page);expect(delivered.seed).toBe('grandma');expect(delivered.crossed).toBe(false);expect(delivered.pip).toEqual(before.pip);expect(delivered.sections).toEqual(before.sections);expect(delivered.page).toEqual(before.page);
}
async function observeEmptyBoat(page:Page){
 const before=await savedChapter(page),details=page.locator('.garden-access').filter({has:page.locator('summary').filter({hasText:'Places & scene description'})});
 if(await details.getAttribute('open')===null)await details.locator(':scope>summary').click();await details.getByRole('button',{name:'Watch the empty seed boat',exact:true}).click();
 await expect.poll(async()=>physicalHistory(await savedChapter(page)).filter(event=>event==='F').length).toBe(physicalHistory(before).filter(event=>event==='F').length+1);
 const after=await savedChapter(page);for(const key of ['seed','pip','page','sections','river'])expect(after[key]).toEqual(before[key]);
 if(await details.getAttribute('open')!==null)await details.locator(':scope>summary').click();
}
async function moveSoil(page:Page){
 const {x,z}=anchors.garden.plant;await chooseHandObject(page,'soil');await moveHandObject(page,x+.3,z);await moveHandObject(page,x-.3,z);await moveHandObject(page,x,z);await button(page,'Release object').click();
}
async function plantWithReload(page:Page,beforeBloom?:()=>Promise<void>){
 const scene=page.locator('.garden-scene'),before=await savedChapter(page);await moveSoil(page);expect((await savedChapter(page)).seed).toBe(before.seed);expect((await savedChapter(page)).river.soilPrepared).toBe(true);
 await chooseHandObject(page,'seed');await moveHandObject(page,anchors.garden.plant.x,anchors.garden.plant.z);await button(page,'Release object').click();
 const inBed=await savedChapter(page);expect(inBed.seed).toBe('bed');expect(inBed.bloomed).toBe(false);await expect(scene).toHaveAttribute('data-seed-x',anchors.garden.plant.x.toFixed(3));await expect(scene).toHaveAttribute('data-seed-z',anchors.garden.plant.z.toFixed(3));
 await page.reload();const restored=await savedChapter(page);for(const key of ['seed','river','sections','story','journal','exposed','history'])expect(restored[key]).toEqual(inBed[key]);
 await moveSoil(page);await expect(button(page,'Touch the sprout to help it grow')).toBeEnabled();await closeHandControls(page);const rooted=await savedChapter(page);expect(rooted.seed).toBe('soil');expect(rooted.bloomed).toBe(false);
 await page.reload();const resumed=await savedChapter(page);expect(resumed.seed).toBe('soil');expect(resumed.bloomed).toBe(false);expect(resumed.history).toEqual(rooted.history);
 if(beforeBloom)await beforeBloom();await button(page,'Touch the sprout to help it grow').click();await expect.poll(async()=>(await savedChapter(page)).bloomed).toBe(true);await expect(page.locator('.garden-reader')).toHaveCount(0);
}

// Covering leaves a rooted sprout. The explicit BLOOM touch makes BPFL an
// ordinary fifth route, including a durable save boundary before growth.
for(const history of ['BPL','FBPL','BFPL','BPFL','BPLF'] as const)test(`normal village physical history ${history}: no required failure, same seed, reload and gathering prerequisite`,async({page},info)=>{
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));const initial=await begin(page);
 if(history==='FBPL'){
  await ferrySeed(page);
  // Pip is already beside the materials after steering. The nearby footer
  // offers Arrange bridge; its navigation equivalent is in the Places menu.
  const places=page.locator('.garden-access');if(await places.getAttribute('open')===null)await places.locator(':scope>summary').click();
 }
 await buildStagedBridge(page);
 if(history==='FBPL'){const places=page.locator('.garden-access');if(await places.getAttribute('open')!==null)await places.locator(':scope>summary').click();}
 const beforeCross=await savedChapter(page);await button(page,'Go to Grandma').click();await waitForWalk(page,'Grandma',beforeCross);
 await expect.poll(async()=>(await savedChapter(page)).river.collection).toBeNull();const crossed=await savedChapter(page);expect(crossed.crossed).toBe(true);expect(crossed.seed).toBe(history==='FBPL'?'grandma':'pip');expect(crossed.story.bridgeFailures).toBe(0);
 if(history==='BFPL')await observeEmptyBoat(page);
 await plantWithReload(page,history==='BPFL'?()=>observeEmptyBoat(page):undefined);
 if(history==='BPLF')await observeEmptyBoat(page);
 const result=await savedChapter(page) as Chapter;expect(physicalHistory(result)).toEqual(history.split(''));expect(result.seed).toBe('soil');expect(result.bloomed).toBe(true);expect(result.story.bridgeFailures).toBe(0);expect(result.journal.notes).toBe(notes);expect(result.exposed).toEqual(initial.exposed);expect(result.assistance).toEqual(initial.assistance);
 expect(observationsFor(result).map(event=>event.id)).toEqual(['bridge-crossed','seed-planted','flower-grown']);expect(planProblems(result)).toEqual(planProblems(initial).filter(problem=>problem!=='Plant the seed with Grandma first.'));expect(result.story.phase).toBe('planning');expect(result.story.ending).toBeNull();
 await page.screenshot({path:info.outputPath(history+'-planted-origin.png')});await page.reload();const restored=await savedChapter(page);for(const key of ['seed','river','sections','story','journal','exposed','history'])expect(restored[key]).toEqual(result[key as keyof Chapter]);expect(errors).toEqual([]);
 await info.attach('physical-route',{body:JSON.stringify({history,actual:physicalHistory(restored),plant:anchors.garden.plant,seed:restored.seed,observations:observationsFor(restored),remainingGatheringPrerequisites:planProblems(restored),limitations:'Normal physical segment only; full gathering and nine narrative outcomes have separate tests. All five orders use ordinary controls; covering and bloom have separate saved boundaries.'},null,2),contentType:'application/json'});
});
