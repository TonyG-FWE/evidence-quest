import {expectedAssetStatus} from './garden-asset-profile.js';
import {test,expect} from '@playwright/test';
import {worldPoint} from './garden-actions.js';
import {readPersistedChapter} from './garden-save-fixture.js';
import {anchors,WATER_SURFACE_Y} from '../src/garden/worldLayout.js';

// The retained Chromium recording demonstrates this route. Avoid encoding six
// simultaneous-density copies while qualifying the pointer handlers.
test.use({video:process.env['EQ_RECORD_GAMEPLAY']==='1'?{mode:'on',size:{width:1440,height:1000}}:'off'});
test('direct seed loading and continuous pointer steering recover from a rock and deliver one seed',async({page},info)=>{
 test.setTimeout(150000);const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await page.getByRole('button',{name:'Start playing',exact:true}).click();await page.getByRole('button',{name:'Go to the bridge pieces',exact:true}).click();
 const scene=page.locator('.garden-scene');await expect(page.locator('.garden-hands')).toBeVisible();await expect.poll(async()=>JSON.parse(await scene.getAttribute('data-character-assets')??'{}').pip).toBe(expectedAssetStatus);
 await expect(scene).toHaveAttribute('data-pip-x',anchors.crossing.approach.x.toFixed(3));await expect(scene).toHaveAttribute('data-pip-z',anchors.crossing.approach.z.toFixed(3));
 const hand=JSON.parse((await scene.getAttribute('data-hand-contact'))!).seedPosition as number[],from=await worldPoint(page,hand[0]!,hand[2]!,hand[1]!);
 await page.mouse.move(from.x,from.y);await page.mouse.down();await expect(scene).toHaveAttribute('data-hand-gesture',/"seed"/);
 const cradle=await worldPoint(page,anchors.boat.launch.x,anchors.boat.launch.z,.23);await page.mouse.move(cradle.x,cradle.y,{steps:12});await page.mouse.up();await expect(scene).toHaveAttribute('data-ferry-phase','steering');await expect(page.locator('.garden-reader')).toHaveCount(0);
 const rock=await worldPoint(page,0,.8,WATER_SURFACE_Y);await page.mouse.move(rock.x,rock.y);await page.mouse.down();await expect(page.locator('.garden-feedback')).toContainText('The rock blocks that way');await page.mouse.up();expect((await readPersistedChapter(page)).seed).toBe('boat');
 const route=[[-.85,.25],[.85,.25],[.85,4.1],[.25,4.1],[.25,6.3],[1.35,6.3],[1.35,6.85],[1.9,6.85],[1.9,9.05],[2.45,9.05]];
 for(const [i,[x,z]]of route.entries()){
  await test.step(`Steer continuously toward ${x}, ${z}`,async()=>{
   const target=await worldPoint(page,x!,z!,WATER_SURFACE_Y);await page.mouse.move(target.x,target.y);if(i===0)await page.mouse.down();
   await expect.poll(async()=>{
    const phase=await scene.getAttribute('data-ferry-phase');if(phase!=='steering')return 0;
    const current=await worldPoint(page,x!,z!,WATER_SURFACE_Y);await page.mouse.move(current.x,current.y);
    return Math.hypot(Number(await scene.getAttribute('data-seed-boat-x'))-x!,Number(await scene.getAttribute('data-seed-boat-z'))-z!);
   },{timeout:12000,intervals:[100],message:`Boat reaches water waypoint ${x}, ${z}`}).toBeLessThan(.09);
   if(i===route.length-1){await expect(scene).toHaveAttribute('data-seed-boat-x',anchors.boat.landing.x.toFixed(3));await expect(scene).toHaveAttribute('data-seed-boat-z',anchors.boat.landing.z.toFixed(3));}
  });
 }
 await page.mouse.up();await expect(page.locator('.garden-reader')).toHaveCount(0);await page.screenshot({path:info.outputPath('boat-direct-landing.png')});
 await expect.poll(async()=>(await readPersistedChapter(page))?.seed,{timeout:20000}).toBe('grandma');
 const before=Number(await scene.getAttribute('data-pip-x'));await scene.locator('canvas').focus();await page.keyboard.down('ArrowLeft');await expect.poll(async()=>Number(await scene.getAttribute('data-pip-x'))).toBeLessThan(before-.08);await page.keyboard.up('ArrowLeft');
 const delivered=await readPersistedChapter(page);expect(delivered.history.filter((event:string)=>event==='F')).toHaveLength(1);expect(delivered.river.boat.position).toEqual(anchors.boat.landing);expect(errors).toEqual([]);await page.screenshot({path:info.outputPath('seed-collected-pip-free.png')});
 await info.attach('scope',{body:'Fresh adventure, actual pointer loading/steering with no sidebar physical-step confirmation, recoverable collision, one seed receipt and native movement while Grandma returns. Video is functional evidence, not frame-time qualification.',contentType:'text/plain'});
});
