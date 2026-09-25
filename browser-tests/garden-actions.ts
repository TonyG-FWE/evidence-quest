import {GRANDMA_CUSHION_MS,GRANDMA_PATH_LENGTH,GRANDMA_WALK_SPEED} from '../src/garden/grandmaTravel.js';
import {expect,type Page} from '@playwright/test';
import {Matrix4,Vector3} from 'three';
import {anchors,WALK_SPEED,navigable,terrainHeight} from '../src/garden/worldLayout.js';
import {routeTo,type Chapter} from '../src/garden/model.js';
import {maraAtGarden,solApproach} from '../src/garden/chapter.js';
import {savedChapter,readPersistedChapter} from './garden-save-fixture.js';
import {automaticVoice,finishVoiceSegment} from './garden-playback-voice.js';
import {expectedAssetStatus} from './garden-asset-profile.js';
import {firstPart,bridgeWalkingHeight,type BridgePostId} from '../src/garden/bridgeConstruction.js';
const button=(p:Page,name:string)=>p.getByRole('button',{name:name==='Back to Pip'?/^(Back to Pip|Continue to the game)$/:name==='Plan the gathering with Grandma'?/^(Plan the gathering with Grandma|Review the gathering plan with Grandma)$/:name==='Let’s talk about why Mara stopped visiting.'?/^(Let’s talk about why Mara stopped visiting\.|Tell Grandma what Mara said)$/:name,exact:true});
/** Open the visible native alternative, just as a player does; never reveal DOM by mutation. */
export async function openDirections(p:Page,kind:'Bridge'|'Bakery'){
 const details=p.locator('.garden-alternate-controls').filter({hasText:kind+' directions and other controls'});
 await expect(details.locator(':scope>summary')).toBeVisible();if(await details.getAttribute('open')===null)await details.locator(':scope>summary').click();
}
export async function openStoryDirections(p:Page){const details=p.locator('.g-mara-controls');await expect(details.locator(':scope>summary')).toBeVisible();if(await details.getAttribute('open')===null)await details.locator(':scope>summary').click();}
/** Capture chapter before GO: the save acknowledgement waits until travel stops.
 * Travel is bounded by the authored route and walking speed, without changing UI/performance limits. */
export async function waitForWalk(p:Page,who:'Mara'|'Grandma'|'Sol',chapter:Chapter){
 const target=who==='Sol'?solApproach(chapter):who==='Grandma'?anchors.garden.approach:maraAtGarden(chapter)?{x:anchors.gathering.mara.x-1.05,z:anchors.gathering.mara.z}:anchors.dock.approach;
 const route=routeTo(chapter,target);expect(route.length,'The requested person must have an actual navigable approach').toBeGreaterThan(0);
 let from=chapter.pip,length=0;for(const point of route){length+=Math.hypot(point.x-from.x,point.z-from.z);from=point;}
 await expect.poll(async()=>{const scene=p.locator('.garden-scene'),x=Number(await scene.getAttribute('data-pip-x')),z=Number(await scene.getAttribute('data-pip-z'));return Math.hypot(x-target.x,z-target.z);},{timeout:Math.max(15000,Math.ceil(length/WALK_SPEED*1000)+10000),message:'Pip reaches '+who+' along the expanded world route'}).toBeLessThan(.02);
}
/** Read the actual camera projection so pointer actions still hit the rendered world while following Pip. */
export async function worldPoint(p:Page,x:number,z:number,y=.13){
 const scene=p.locator('.garden-scene'),canvas=scene.locator('canvas');await expect(scene).toHaveAttribute('data-camera-projection',/^\{/);
 await expect.poll(()=>canvas.evaluate((e:HTMLCanvasElement)=>Math.abs(e.width-e.getBoundingClientRect().width*devicePixelRatio)<2)).toBe(true);
 const {data,box}=await scene.evaluate(e=>{const r=e.querySelector('canvas')!.getBoundingClientRect();return {data:(e as HTMLElement).dataset['cameraProjection'],box:{x:r.x,y:r.y,width:r.width,height:r.height}};});
 const projection=JSON.parse(data!) as {projection:number[];view:number[]};
 const point=new Vector3(x,y,z).applyMatrix4(new Matrix4().fromArray(projection.view)).applyMatrix4(new Matrix4().fromArray(projection.projection));
 return {x:box.x+(point.x*.5+.5)*box.width,y:box.y+(-point.y*.5+.5)*box.height};
}
async function selectHeld(p:Page,name:string){
 const details=p.locator('.garden-hands>details');await expect(details.locator(':scope>summary')).toBeVisible();
 if(await details.getAttribute('open')===null)await details.locator(':scope>summary').click();
 const choice=details.getByRole('button',{name,exact:true}),object=await choice.getAttribute('data-hand-object');await choice.click();
 await expect.poll(async()=>JSON.parse(await p.locator('.garden-scene').getAttribute('data-hand-gesture')||'null')?.object).toBe(object);
}
async function moveHeld(p:Page,x:number,z:number){
 const scene=p.locator('.garden-scene');await expect(scene).toHaveAttribute('data-hand-gesture',/^\{/);const g=JSON.parse((await scene.getAttribute('data-hand-gesture'))!);
 await scene.locator('canvas').focus();
 for(const [axis,target,negative,positive] of [['x',x,'ArrowLeft','ArrowRight'],['z',z,'ArrowUp','ArrowDown']] as const){
  let amount=target-g.point[axis];const coarse=Math.trunc(Math.abs(amount)/.1),direction=amount<0?negative:positive;
  for(let i=0;i<coarse;i++)await p.keyboard.press(direction);
  amount-=Math.sign(amount)*coarse*.1;for(let i=0;i<Math.round(Math.abs(amount)/.025);i++)await p.keyboard.press('Shift+'+direction);
 }
}
/** Native alternatives invoke the same HAND gestures as dragging. No save writes. */
export async function openHandControls(p:Page){const details=p.locator('.garden-hands>details');await expect(details.locator(':scope>summary')).toBeVisible();if(await details.getAttribute('open')===null)await details.locator(':scope>summary').click();return details;}
export async function closeHandControls(p:Page){const details=p.locator('.garden-hands>details');if(await details.count()&&await details.getAttribute('open')!==null)await details.locator(':scope>summary').click();}
export async function chooseHandObject(p:Page,object:string){await openHandControls(p);await p.locator('[data-hand-object="'+object+'"]').click();await expect(p.locator('.garden-scene')).toHaveAttribute('data-hand-gesture',new RegExp(object));}
export async function moveHandObject(p:Page,x:number,z:number){await moveHeld(p,x,z);}
export async function collectRepairRopes(p:Page){const c=await savedChapter(p);if(c.river.ropesCollected)return;await chooseHandObject(p,'rope-box');await moveHeld(p,c.pip.x,c.pip.z);await button(p,'Release object').click();await expect.poll(async()=>(await savedChapter(p)).river.ropesCollected).toBe(true);}
export async function placeBridgeSection(p:Page,id:'a'|'b',target:string|{x:number;z:number}){
 await chooseHandObject(p,'section:'+id);
 if(typeof target==='string')await button(p,target).click();else{await moveHeld(p,target.x,target.z);await button(p,'Release object').click();}
 await expect(p.locator('.garden-scene')).toHaveAttribute('data-hand-gesture','');await expect(p.locator('.garden-scene')).toHaveAttribute('data-rendered-view','walk');
}
export async function walkBridgePoint(p:Page,x:number,z:number){
 await closeHandControls(p);await expect(p.locator('.garden-scene')).toHaveAttribute('data-action-kind','none');
 // Bank clicks hit the rendered sloping navigation surface; secured decks use
 // the scene's walking plane. Project that real surface instead of aiming
 // seven centimetres away by using the draggable object's height everywhere.
 const chapter=await savedChapter(p),height=navigable({x,z})?terrainHeight({x,z})-.015:bridgeWalkingHeight(chapter,{x,z}),target=await worldPoint(p,x,z,height);await p.mouse.click(target.x,target.y);
 await expect.poll(async()=>{const scene=p.locator('.garden-scene');return Math.hypot(Number(await scene.getAttribute('data-pip-x'))-x,Number(await scene.getAttribute('data-pip-z'))-z);},{timeout:15000}).toBeLessThan(.06);
}
export async function installBridgePost(p:Page,id:BridgePostId){if((await savedChapter(p)).river.construction?.posts[id])return;await chooseHandObject(p,'post:'+id);await button(p,'Set post in its socket').click();await expect.poll(async()=>(await savedChapter(p)).river.construction?.posts[id]).toBe(true);}
export async function secureSpan(p:Page,end:'west'|'east'){
 const c=await savedChapter(p),first=c.sections[firstPart(c)];await walkBridgePoint(p,end==='west'?first.x-1.375:first.x,first.z);
 for(const id of (end==='west'?['west-north','west-south','center-north','center-south']:['east-north','east-south']) as BridgePostId[])await installBridgePost(p,id);
 for(const side of ['north','south'] as const){const state=await savedChapter(p);if(state.river.construction?.ropes[side][end])continue;await chooseHandObject(p,'rope:'+side);await button(p,'Wrap and tighten at the next post').click();await expect.poll(async()=>(await savedChapter(p)).river.construction?.ropes[side][end]).toBe(true);}
 await closeHandControls(p);
}
/** Complete ordinary staged construction, or place both loose halves for a
 * deliberate consequence test. A completed save is never manufactured here. */
export async function buildStagedBridge(p:Page,secure=true){
 for(let i=0;i<20&&await p.locator('.garden-reader').count();i++)await p.locator('.g-reader-top .g-close').click();
 await closeHandControls(p);await button(p,'Go to the bridge pieces').click();await expect(p.locator('.garden-scene')).toHaveAttribute('data-pip-x',anchors.crossing.approach.x.toFixed(3));await collectRepairRopes(p);
 if(!(await savedChapter(p)).west)await placeBridgeSection(p,'a','Near bank at the narrow crossing');
 if(secure){await secureSpan(p,'west');await walkBridgePoint(p,-.775,3);await placeBridgeSection(p,'b','Connect to the first section');await secureSpan(p,'east');await expect(p.locator('.garden-scene')).toHaveAttribute('data-bridge-ready','true');}
 else{await placeBridgeSection(p,'b','Far half at the narrow crossing');await closeHandControls(p);}
}
/** Preparation, the same physical seed and covering are separate ordinary HAND inputs. */
export async function plantWithGrandma(p:Page){
 await button(p,'Work beside Grandma').click();const {x,z}=anchors.garden.plant;
 await selectHeld(p,'Planting spot');await moveHeld(p,x+.3,z);await moveHeld(p,x-.3,z);await moveHeld(p,x,z);await button(p,'Release object').click();
 expect((await savedChapter(p)).river.soilPrepared).toBe(true);
 await selectHeld(p,'Lantern seed');await moveHeld(p,x,z);await button(p,'Release object').click();expect((await savedChapter(p)).seed).toBe('bed');
 await selectHeld(p,'Planting spot');await moveHeld(p,x+.3,z);await moveHeld(p,x-.3,z);await moveHeld(p,x,z);await button(p,'Release object').click();
 await expect(p.getByRole('button',{name:'Touch the sprout to help it grow',exact:true})).toBeEnabled();
 expect((await savedChapter(p)).bloomed).toBe(false);
 await p.getByRole('button',{name:'Touch the sprout to help it grow',exact:true}).click();
 await expect(p.locator('.garden-feedback')).toContainText('kept his promise');
}
/** The selected moment commits through release at the lantern, with no second confirmation. */
export async function placeMemory(p:Page){
 await button(p,'Carry this memory to the lantern').click();await selectHeld(p,'Pip’s chosen memory');
 await moveHeld(p,anchors.garden.plant.x,anchors.garden.plant.z);await button(p,'Release object').click();
}
/** Physical placement finishes in the world; start the next conversation with Grandma. */
export async function resumeGathering(p:Page){
 await expect(p.locator('.garden-scene')).toHaveAttribute('data-action-kind','none');
 await button(p,'Talk to Grandma E').click();await button(p,'Continue the gathering').click();
}
/** Continue ordinary direction-button steering from the rock's east side through the river bend. */
/** A turning boat can cross one coordinate before reaching its target. Wait
 * for the real controller to finish, rather than interrupting its last arc. */
export async function waitForBoatStop(p:Page){await expect.poll(async()=>{const motion=JSON.parse(await p.locator('.garden-scene').getAttribute('data-boat-motion')||'null');return motion?.target===null&&motion.speed===0;}).toBe(true);}
export async function finishBoatDelivery(p:Page,observeReturn=false){
 const scene=p.locator('.garden-scene');
 await expect(scene).toHaveAttribute('data-seed-boat-x','1.350');await expect(scene).toHaveAttribute('data-seed-boat-z','0.800');
 await waitForBoatStop(p);
 const move=async(name:string,axis:'x'|'z',value:number)=>{await button(p,name).click();await expect(scene).toHaveAttribute('data-seed-boat-'+axis,value.toFixed(3));await waitForBoatStop(p);expect((await savedChapter(p)).seed).toBe('boat');};
 await move('← Dock side','x',.8);
 for(const z of [1.35,1.9,2.45,3,3.55,4.1])await move('Downstream ↓','z',z);await move('← Dock side','x',.25);
 for(const z of [4.65,5.2,5.75,6.3])await move('Downstream ↓','z',z);
 for(const x of [.8,1.35])await move('Garden side →','x',x);await move('Downstream ↓','z',6.85);await move('Garden side →','x',1.9);
 for(const z of [7.4,7.95,8.5,9.05])await move('Downstream ↓','z',z);
 await button(p,'Garden side →').click();await expect(scene).toHaveAttribute('data-seed-boat-x',anchors.boat.landing.x.toFixed(3));await expect(scene).toHaveAttribute('data-seed-boat-z',anchors.boat.landing.z.toFixed(3));
 // A received seed is committed while Grandma is still returning. Waiting for
 // the latest moving-position acknowledgement inside a short poll hides that
 // transfer until the whole walk finishes. Observe the durable transfer first.
 await expect.poll(async()=>(await readPersistedChapter(p))?.seed).toBe('grandma');
 if(!observeReturn)await expect.poll(async()=>(await readPersistedChapter(p))?.river.collection,{timeout:Math.ceil(GRANDMA_PATH_LENGTH/GRANDMA_WALK_SPEED*1000)+10000,message:'Grandma walks the authored return route before the settled save is inspected'}).toBe(null);
 const delivered=await (observeReturn?readPersistedChapter:savedChapter)(p);expect(delivered.river.boat.position).toEqual(anchors.boat.landing);expect(delivered.river.soilPrepared).toBe(false);expect(delivered.history.filter((event:string)=>event==='F')).toHaveLength(1);return delivered;
}
export async function deliverMaraReport(p:Page){
 await expect(p.getByRole('heading',{name:'Tell Grandma what you learned',exact:true})).toBeVisible();
 const prepared=button(p,'Let Grandma know what Mara said');
 if(await prepared.isVisible())await prepared.click();
 await button(p,'Tell Grandma').click();
}
/** Use the same visible, untimed conversation controls as a player. */
export async function completeConversation(p:Page){
 await expect(p.locator('.garden-reader')).toBeVisible();
 if(await button(p,'Watch Mara help these passengers').isVisible()){
  await button(p,'Watch Mara help these passengers').click();
  await expect(p.locator('.garden-scene')).toHaveAttribute('data-dock-service','served');
  await expect(p.locator('.garden-reader')).toBeVisible();
 }
 for(let i=0;i<5;i++){
  const next=button(p,'Continue conversation'),reply=button(p,'Choose Pip’s reply');
  if(await next.isVisible())await next.click();
  else if(await reply.isVisible()){await reply.click();return;}
  else return;
 }
 throw Error('Conversation did not reach its replies.');
}
export async function playSpeakingTurn(p:Page){
 await expect(p.locator('.garden-gathering-controls')).toBeVisible();
 await expect(button(p,'Continue speaking')).toHaveCount(0);await expect(button(p,'Finish this turn')).toHaveCount(0);
 const resume=button(p,'Resume story');if(await resume.isVisible())await resume.click();
 await automaticVoice(p,true);
 await expect(p.locator('.garden-reader')).toBeVisible({timeout:120000});
 await automaticVoice(p,false);
}
export async function playLoopStory(p:Page,onPictureReady?:(page:number,kind:string)=>Promise<void>){
 const activity=p.locator('[data-world-activity="ending-presentation"]');await expect(activity).toBeVisible();
 await expect(button(p,'Next picture')).toHaveCount(0);await expect(button(p,'Previous picture')).toHaveCount(0);
 const resume=button(p,'Resume story');if(await resume.isVisible())await resume.click();
 // Hold the existing synthetic local voice until the real picture is loaded.
 // A 20-ms callback loop can otherwise skip a whole supplied-model picture.
 // This changes the test seam only; authored playback and asset timing are intact.
 await automaticVoice(p,false);
 const pictures:{page:number;kind:string;actors:unknown;resources:unknown}[]=[];
 for(let step=0;step<12;step++){
  if(!await activity.count())return pictures;
  const index=await activity.getAttribute('data-presentation-page'),stage=activity.locator('.g-story-stage');
  await stage.locator('canvas').evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));
  await expect(stage).toHaveAttribute('aria-busy','false',{timeout:60000});
  await stage.locator('canvas').evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));
  const kind=await stage.getAttribute('data-stage-scene');expect(kind).toBeTruthy();
  const actors=JSON.parse(await stage.getAttribute('data-stage-assets')??'{}') as Record<string,{status:string}>;expect(Object.values(actors).every(a=>a.status===expectedAssetStatus)).toBe(true);await expect(stage.getByRole('button',{name:'Restore story view',exact:true})).toHaveCount(0);
  pictures.push({page:Number(index),kind:kind!,actors,resources:JSON.parse(await stage.getAttribute('data-stage-resources')??'{}')});
  await onPictureReady?.(Number(index),kind!);await finishVoiceSegment(p);
  await expect.poll(async()=>await activity.count()?activity.getAttribute('data-presentation-page'):null).not.toBe(index);
 }
 throw Error('The complete ending did not finish within its authored picture count.');
}
export async function playArrivals(p:Page){
 for(let i=0;i<6;i++){
  await expect.poll(async()=>await button(p,'Welcome everyone in the garden').isVisible()||await p.locator('.garden-gathering-controls .g-primary:enabled').count()>0,{timeout:25000,message:'Wait for the current physical arrival, including Mara’s 18-second crossing'}).toBe(true);
  if(await button(p,'Welcome everyone in the garden').isVisible())return;
  await p.locator('.garden-gathering-controls .g-primary').click();
 }
 throw Error('Guests did not finish their actual arrival.');
}
export async function playGrandmaTelling(p:Page){
 await button(p,'Hear Grandma ask Sol').click();await playSpeakingTurn(p);await button(p,'Let Grandma bring out the cushions').click();await expect(button(p,'Let Grandma finish her account')).toBeVisible({timeout:GRANDMA_CUSHION_MS+5000});await button(p,'Let Grandma finish her account').click();await expect(p.getByRole('heading',{name:'The Empty Bench · by Grandma'})).toBeVisible();await button(p,'Let Grandma share her story').click();await playSpeakingTurn(p);
}
export async function playBakery(p:Page,wrong=false){
 for(let i=0;i<20&&await p.locator('.garden-reader').count();i++)await p.locator('.g-reader-top .g-close').click();
 if(!await p.locator('.garden-bakery-controls').count())await button(p,'Go to Rina’s bakery').click();
 await openDirections(p,'Bakery');await p.locator('.garden-action-bar').getByRole('button',{name:'Talk to Rina',exact:true}).click();await completeConversation(p);await button(p,'I can bring the spare tile to Sol.').click();await button(p,'Back to Pip').click();await openDirections(p,'Bakery');if(await button(p,'Go to the tile shelf').isVisible())await button(p,'Go to the tile shelf').click();await button(p,'Take the spare tile').click();await button(p,'Bring the tile to Sol').click();await button(p,'Give the tile to Sol').click();if(await button(p,'Direct Sol’s roof repair').isVisible())await button(p,'Direct Sol’s roof repair').click();await button(p,'Remove the cracked tile').click();
 if(wrong){await button(p,'Beside the opening').click();await button(p,'Place the tile').click();await expect(p.locator('.garden-feedback')).toContainText('Water still comes through');}
 await button(p,'Over the opening').click();await button(p,'Place the tile').click();await button(p,'Let Rina check the flour').click();if(await button(p,'Go to Rina').isVisible())await button(p,'Go to Rina').click();await button(p,'Make the dough with Rina').click();await button(p,'Shape the loaves').click();await button(p,'Bake the bread').click();await expect(button(p,'Take a loaf to thank Sol')).toBeEnabled({timeout:25000});await button(p,'Take a loaf to thank Sol').click();await button(p,'Walk with Rina to the workshop').click();await button(p,'Let Rina give Sol the loaf').click();await expect(p.locator('.garden-bakery-controls')).toHaveCount(0);await expect(button(p,'Talk to Sol')).toBeVisible();
}
export async function inspectBirdConversation(p:Page){
 const expectedSpeakers=(await savedChapter(p)).narrativeEdition==='literary-20260916'?['Mara narrates','Mara narrates','Mara narrates','Mara narrates']:['Mara narrates','Mara','Mara narrates','The boy','Mara narrates','Mara narrates'];
 // Story pages show two paragraphs at a time. Inspect every page through the
 // visible controls instead of requiring the entire story on one screen.
 const passage=p.locator('.garden-passage'),previous=button(p,'Previous page'),next=button(p,'Next page');
 for(let i=0;i<6&&await previous.isVisible()&&await previous.isEnabled();i++){const before=await passage.getAttribute('data-reader-scroll');await previous.click();await expect(passage).not.toHaveAttribute('data-reader-scroll',before!);}
 const speakers:string[]=[];
 for(let i=0;i<6;i++){
  await expect(passage.locator('.g-source-voice').first()).toBeVisible();speakers.push(...await passage.locator('.g-source-voice').allTextContents());
  if(!await next.isVisible()||!await next.isEnabled())break;
  const before=await passage.getAttribute('data-reader-scroll');await next.click();await expect(passage).not.toHaveAttribute('data-reader-scroll',before!);
 }
 expect(speakers).toEqual(expectedSpeakers);
}
export async function playBird(p:Page,wrong=false){
 await openStoryDirections(p);await button(p,'Speak to the boy').click();await inspectBirdConversation(p);
 await expect(p.getByRole('group',{name:'You are speaking as Mara. Choose your response.'})).toBeVisible();await button(p,'Would you like some help?').click();await openStoryDirections(p);
 await button(p,'Walk to the dock office').click();await button(p,'Pick up the tape').click();await button(p,'Return to the boy').click();await button(p,'Line up the torn wing').click();
 if(wrong){await button(p,'Tape beside the tear').click();await button(p,'Place the strip').click();await expect(p.locator('.g-mara-scene')).toHaveAttribute('data-strip','beside');await expect(p.locator('.garden-feedback')).toContainText('wing is still loose');}
 await button(p,'Tape across the tear').click();await button(p,'Place the strip').click();await button(p,'Let the boy carry his bird').click();await button(p,'Return to Grandma’s garden').click();await expect(p.locator('.g-mara-scene')).toHaveCount(0);
 // The earlier scene closes at the start of the physical return. Wait for its
 // actual destination before deciding between early sharing and public telling.
 await expect.poll(async()=>await p.locator('.garden-gathering-controls').isVisible()||await p.locator('.garden-reader').isVisible()).toBe(true);
 if(await p.locator('.garden-gathering-controls').isVisible())await playSpeakingTurn(p);await expect(p.locator('.garden-reader')).toBeVisible();
}
