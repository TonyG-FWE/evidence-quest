import {test,expect,type Page} from '@playwright/test';
import {Matrix4,Vector3} from 'three';
import {savedChapter} from './garden-save-fixture.js';
import {postPoint,bridgeWalkingHeight} from '../src/garden/bridgeConstruction.js';
import {BRIDGE_LEVELS} from '../src/garden/worldLayout.js';
import {CROSSING} from '../src/garden/model.js';

test.setTimeout(150000);
const button=(page:Page,name:string)=>page.getByRole('button',{name,exact:true});
async function point(page:Page,x:number,y:number,z:number){
 const scene=page.locator('.garden-scene');
 const {data,rect}=await scene.evaluate(e=>{const r=e.querySelector('canvas')!.getBoundingClientRect();return {data:(e as HTMLElement).dataset['cameraProjection'],rect:{x:r.x,y:r.y,w:r.width,h:r.height}};});
 const camera=JSON.parse(data!),v=new Vector3(x,y,z).applyMatrix4(new Matrix4().fromArray(camera.view)).applyMatrix4(new Matrix4().fromArray(camera.projection));
 return {x:rect.x+(v.x+1)*rect.w/2,y:rect.y+(1-v.y)*rect.h/2};
}
async function controls(page:Page){const details=page.locator('.garden-hands details');if(!await details.evaluate(e=>(e as HTMLDetailsElement).open))await details.locator('summary').click();return details;}
async function closeControls(page:Page){const details=page.locator('.garden-hands details');if(await details.count()&&await details.evaluate(e=>(e as HTMLDetailsElement).open))await details.locator('summary').click();}
async function choose(page:Page,id:string){await controls(page);await page.locator(`[data-hand-object="${id}"]`).click();}
async function placeFirst(page:Page){await choose(page,'section:a');await button(page,'Near bank at the narrow crossing').click();await expect(page.locator('.garden-scene')).toHaveAttribute('data-rendered-view','walk');}
async function walkOn(page:Page,x:number,z:number){await closeControls(page);const target=await point(page,x,bridgeWalkingHeight(await savedChapter(page),{x,z})+.025,z);await page.mouse.click(target.x,target.y);}
async function grip(page:Page,id:string){const handle=page.locator(`[data-bridge-handle="${id}"]`);await expect(handle).toBeVisible();const box=(await handle.boundingBox())!;return {x:box.x+box.width/2,y:box.y+box.height/2};}

test('staged bridge ordinary input releases objects, allows unsafe walking, then secures and extends the same crossing',async({page},info)=>{
 const started=Date.now(),cues:{event:string;milliseconds:number}[]=[],cue=(event:string)=>cues.push({event,milliseconds:Date.now()-started});cue('Fresh adventure and walk to repair materials');
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/garden');await button(page,'Begin Pip’s adventure').click();await button(page,'Start playing').click();await button(page,'Go to the bridge pieces').click();
 const scene=page.locator('.garden-scene');await expect(scene).toHaveAttribute('data-pip-x',CROSSING.x.toFixed(3));
 // Select a different material without committing the canceled section preview.
 cue('Select another material and cancel without committing');const initial=(await savedChapter(page)).sections;await choose(page,'section:a');await page.keyboard.press('ArrowRight');await page.locator('[data-hand-object="section:b"]').click();await expect(scene).toHaveAttribute('data-hand-gesture',/section:b/);await page.keyboard.press('Escape');expect((await savedChapter(page)).sections).toEqual(initial);
 // Actual drag waits for deliberate movement, then cancellation restores it.
 await closeControls(page);const start=await grip(page,'section:a');await page.mouse.move(start.x,start.y);await page.mouse.down();await expect(scene).toHaveAttribute('data-hand-gesture','');await page.mouse.move(start.x+12,start.y,{steps:3});await expect(scene).toHaveAttribute('data-hand-gesture',/section:a/);await page.keyboard.press('Escape');await page.mouse.up();expect((await savedChapter(page)).sections).toEqual(initial);
 cue('Release a loose section, click it to walk, and observe collapse');await placeFirst(page);await walkOn(page,-.8,3);await expect.poll(async()=>(await savedChapter(page)).story.bridgeFailures).toBe(1);await expect(scene).toHaveAttribute('data-action-kind','none');
 const recovered=(await savedChapter(page)).sections;expect(recovered.b).toEqual(initial.b);expect(Math.abs(recovered.a.z-recovered.b.z)).toBeGreaterThan(1.12);await page.screenshot({path:info.outputPath('recovered-parts-separated.png')});
 const unused=await grip(page,'section:b');await page.mouse.move(unused.x,unused.y);await page.mouse.down();await page.mouse.move(unused.x+12,unused.y,{steps:3});await expect(scene).toHaveAttribute('data-hand-gesture',/section:b/);await page.keyboard.press('Escape');await page.mouse.up();expect((await savedChapter(page)).sections).toEqual(recovered);
 cue('Recover the same section and install first-half posts');
 await placeFirst(page);
 await closeControls(page);const socket=postPoint(await savedChapter(page),'west-north'),pickup=await grip(page,'post:west-north');await page.mouse.move(pickup.x,pickup.y);await page.mouse.down();await expect(scene).toHaveAttribute('data-hand-gesture',/post:west-north/);const drop=await point(page,socket.x,BRIDGE_LEVELS.deck+.03,socket.z);await page.mouse.move(drop.x,drop.y,{steps:15});await page.mouse.up();await expect.poll(async()=>(await savedChapter(page)).river.construction?.posts['west-north']).toBe(true);
 for(const id of ['west-south','center-north','center-south']){await choose(page,'post:'+id);await button(page,'Set post in its socket').click();}
 await choose(page,'rope-box');await button(page,'Take the ropes to Pip').click();await expect.poll(async()=>(await savedChapter(page)).river.ropesCollected).toBe(true);
 await closeControls(page);
 // The visible grips follow the actual raised rope ends; ordinary pointer
 // releases still wrap and tighten them around the real centre posts.
 cue('Drag both loose rope ends to the center posts');for(const side of ['north','south'] as const){const c=await savedChapter(page),to=postPoint(c,`center-${side}`),a=await grip(page,'rope:'+side);await page.mouse.move(a.x,a.y);await page.mouse.down();await expect(scene).toHaveAttribute('data-hand-gesture',new RegExp('rope:'+side));const b=await point(page,to.x,BRIDGE_LEVELS.deck+BRIDGE_LEVELS.ropeAboveDeck,to.z);await page.mouse.move(b.x,b.y,{steps:15});await page.mouse.up();await expect(scene).toHaveAttribute('data-hand-gesture','');}
 await expect.poll(async()=>JSON.parse((await scene.getAttribute('data-bridge-construction'))!).secured.a).toBe(true);await page.screenshot({path:info.outputPath('first-section-secured.png')});
 cue('Walk onto the independently secured first section');await walkOn(page,-.70,3);await expect.poll(async()=>Math.abs(Number(await scene.getAttribute('data-pip-x'))+.70)).toBeLessThan(.06);
 cue('Connect second section, erect far posts, and extend the same ropes');
 await choose(page,'section:b');await button(page,'Connect to the first section').click();
 for(const id of ['east-north','east-south']){await choose(page,'post:'+id);await button(page,'Set post in its socket').click();}
 for(const side of ['north','south']){await choose(page,'rope:'+side);await button(page,'Wrap and tighten at the next post').click();}
 await expect(scene).toHaveAttribute('data-bridge-ready','true');await closeControls(page);await page.screenshot({path:info.outputPath('complete-staged-bridge.png')});cue('Walk across completed bridge to Grandma');await button(page,'Go to Grandma').click();await expect.poll(async()=>(await savedChapter(page)).crossed).toBe(true);expect((await savedChapter(page)).story.bridgeFailures).toBe(1);expect(errors).toEqual([]);cue('Crossing complete');await info.attach('ordinary-input-demo-cues',{body:JSON.stringify({scope:'Recorded ordinary pointer and native controls; saved state is read only for assertions.',cues}),contentType:'application/json'});
});
