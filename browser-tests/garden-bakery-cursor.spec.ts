import {test,expect,type Page} from '@playwright/test';
import {GardenStore,initialGarden,CROSSING,GRANDMA_APPROACH,type Chapter} from '../src/garden/model.js';
import {BAKERY_APPROACH,TILE_APPROACH,WORKSHOP_DOOR,type BakeryStep} from '../src/garden/bakery.js';
import {BAKERY_APPROACHES} from '../src/garden/worldLayout.js';
import {advance,completeConversation} from '../checks/garden-play-actions.js';
import {buildBridge} from '../checks/garden-bridge-actions.js';
import {checksum} from '../src/garden/persistence.js';
import {savedChapter} from './garden-save-fixture.js';
import {reviewProfile} from './garden-asset-profile.js';
import {completeConversation as completeBrowserConversation} from './garden-actions.js';
import {installPlaybackVoice,automaticVoice,spokenSegments} from './garden-playback-voice.js';
import {bakeryCue,bakeryStage,cutBakeryDough,holdBakeryObject,dropBakeryObject,clickBakeryCue,settleBakeryView} from './bakery-cursor-actions.js';

test.skip(!reviewProfile,'Supplied-model bakery diagnostics require the review artifact.');
test.setTimeout(120000);

/** Explicit fixture diagnostics. These do not qualify a fresh player journey. */
type Checkpoint='arrival'|'needed'|'carried'|'delivered'|'gap'|'misplaced'|'sealed'|'checked'|'mixed'|'unshaped'|'shaped'|'baked'|'escorting'|'handoff';
function checkpoint(stage:Checkpoint,reading=false){
 const store=new GardenStore(initialGarden('bakery-motion-fixture')),send=store.send.bind(store);
 const go=(point:{x:number;z:number})=>{while(store.getSnapshot().panel)send({type:'CLOSE'});send({type:'GO',point});advance(store);};
 const step=(step:BakeryStep)=>{send({type:'BAKERY_STEP',step});advance(store);};
 const finish=()=>{if(reading&&stage!=='handoff')go(BAKERY_APPROACH);return store.getSnapshot().chapter;};
 send({type:'BOOT'});send({type:'BEGIN'});send({type:'START_PLAY'});go(CROSSING);buildBridge(store);go(GRANDMA_APPROACH);go(BAKERY_APPROACH);
 if(stage==='arrival')return finish();
 send({type:'TALK',who:'rina'});advance(store);completeConversation(store);step('PERMISSION');if(stage==='needed')return finish();
 go(TILE_APPROACH);step('PICKUP');if(stage==='carried')return finish();
 go(BAKERY_APPROACH);step('DELIVER');if(stage==='delivered')return finish();
 step('REMOVE');if(stage==='gap')return finish();
 send({type:'TILE_PREVIEW',position:stage==='misplaced'?'beside':'gap'});step('PLACE');if(stage==='misplaced')return finish();
 go(BAKERY_APPROACHES.flour);if(stage==='sealed')return finish();
 step('CHECK');if(stage==='checked')return finish();
 go(BAKERY_APPROACHES.mixing);step('MIX');go(BAKERY_APPROACHES.preparation);if(stage==='mixed')return finish();
 if(stage==='unshaped'){step('BAKE_UNSHAPED');return finish();}
 step('SHAPE');if(stage==='shaped')return finish();
 step('BAKE');go(BAKERY_APPROACHES.oven);if(stage==='baked')return finish();
 step('TAKE_LOAF');if(stage==='escorting')return finish();
 go({x:WORKSHOP_DOOR.x+.15,z:WORKSHOP_DOOR.z+.9});return finish();
}
async function load(page:Page,payload:Chapter){
 await page.goto('/garden');await savedChapter(page);
 const record={format:1,content:payload.content,revision:payload.revision,writer:'isolated-bakery-diagnostic',payload,checksum:checksum(JSON.stringify(payload))};
 await page.evaluate(record=>new Promise<void>((resolve,reject)=>{const r=indexedDB.open('evidence-quest-garden-adventure-v1');r.onsuccess=()=>{const db=r.result,tx=db.transaction('slots','readwrite');tx.objectStore('slots').put(record,'current');tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>reject(tx.error);};r.onerror=()=>reject(r.error);}),record);await page.reload();
 await expect(page.locator('.garden-scene')).toHaveAttribute('data-scene-phase','ready',{timeout:60000});
}
async function phase(page:Page,t:number){await expect.poll(async()=>Number(await page.locator('.garden-scene').getAttribute('data-action-progress')),{intervals:[30]}).toBeGreaterThan(t);}
async function animation(page:Page,who:'rina'|'sol'){return JSON.parse((await page.locator('.garden-scene').getAttribute('data-bakery-animation'))!)[who];}
async function cue(page:Page,id:string){const box=await page.locator(`[data-bakery-object="${id}"]`).boundingBox();expect(box).not.toBeNull();return {x:box!.x+box!.width/2,y:box!.y+box!.height/2};}

test('fixture diagnostic: Rina walks, carries and reaches during the flour rescue',async({page},info)=>{
 await load(page,checkpoint('arrival'));await page.getByRole('button',{name:'Talk to Rina',exact:true}).click();
 await phase(page,.10);const walk=await animation(page,'rina');expect(walk.motion).toBe('walk');expect(walk.work).toBeNull();await page.screenshot({path:info.outputPath('rina-walk-to-flour.png')});
 await phase(page,.34);expect((await animation(page,'rina')).work).toBe('sack');await page.screenshot({path:info.outputPath('rina-lifts-sack.png')});
 await phase(page,.56);const carry=await animation(page,'rina');expect(carry.motion).toBe('walk');expect(carry.carrying).toBe(true);expect(carry.work).toBeNull();await page.screenshot({path:info.outputPath('rina-carries-flour.png')});
 await info.attach('scope',{body:JSON.stringify({fixture:true,walk,carry,freshJourneyAcceptance:false}),contentType:'application/json'});
});

test('fixture diagnostic: Sol climbs down and walks home while Rina checks dry flour',async({page},info)=>{
 await load(page,checkpoint('sealed'));
 for(const size of [{width:1098,height:1105},{width:1422,height:800},{width:1366,height:768},{width:1920,height:1080}]){
  await page.setViewportSize(size);
  await expect.poll(async()=>{const sol=JSON.parse((await page.locator('.garden-scene').getAttribute('data-bakery'))!).solScreen;return Math.max(...[sol.head,sol.feet].flatMap((p:{x:number;y:number})=>[Math.abs(p.x),Math.abs(p.y)]));}).toBeLessThan(.95);
  const flour=await bakeryCue(page,'flour'),canvas=(await page.locator('.garden-scene canvas').boundingBox())!;
  expect(flour.y).toBeGreaterThanOrEqual(canvas.y);expect(flour.y+flour.height).toBeLessThanOrEqual(canvas.y+canvas.height);
  await page.screenshot({path:info.outputPath(`sealed-roof-and-flour-${size.width}.png`)});
 }
 const p=await cue(page,'flour');await page.mouse.click(p.x,p.y);
 await phase(page,.07);expect((await animation(page,'sol')).work).toBe('climb');await page.screenshot({path:info.outputPath('sol-climbs-down.png')});
 await phase(page,.30);expect((await animation(page,'rina')).work).toBe('sack');await page.screenshot({path:info.outputPath('rina-checks-flour.png')});
 await phase(page,.55);const returning=await animation(page,'sol');expect(returning.motion).toBe('walk');expect(returning.work).toBeNull();await page.screenshot({path:info.outputPath('sol-walks-home.png')});
 await info.attach('scope',{body:JSON.stringify({fixture:true,returning,freshJourneyAcceptance:false}),contentType:'application/json'});
});

test('fixture diagnostic: sheltered preparation remains visible at the demo sizes',async({page},info)=>{
 await load(page,checkpoint('mixed'));
 for(const size of [{width:1098,height:1105},{width:1422,height:800},{width:1366,height:768},{width:1920,height:1080}]){
  await page.setViewportSize(size);const dough=page.locator('[data-bakery-object="dough"]');await expect(dough).toBeVisible();
  const box=(await dough.boundingBox())!,canvas=(await page.locator('.garden-scene canvas').boundingBox())!;
  expect(box.x).toBeGreaterThanOrEqual(canvas.x);expect(box.y).toBeGreaterThanOrEqual(canvas.y);expect(box.x+box.width).toBeLessThanOrEqual(canvas.x+canvas.width);expect(box.y+box.height).toBeLessThanOrEqual(canvas.y+canvas.height);
  await expect(page.locator('.garden-hands')).toBeInViewport({ratio:1});await page.screenshot({path:info.outputPath(`shelter-${size.width}.png`)});
 }
 const data=JSON.parse((await page.locator('.garden-scene').getAttribute('data-bakery'))!);expect(data.rain).toBe(true);expect(data.leakOpen).toBe(false);
});

test('fixture diagnostic: visible baked loaf selects Rina, with walk and contact phases',async({page},info)=>{
 await load(page,checkpoint('baked'));const p=await cue(page,'loaf');await page.mouse.move(p.x,p.y);await page.mouse.down();await page.mouse.move(p.x+8,p.y+8);
 const target=page.locator('[data-bakery-drop="rina"]');await expect(target).toBeVisible();const box=(await target.boundingBox())!;
 await page.mouse.move(box.x+box.width/2,box.y+box.height/2,{steps:15});await page.mouse.up();await expect(page.locator('.garden-scene')).toHaveAttribute('data-action-kind','takeLoaf');
 await phase(page,.14);expect((await animation(page,'rina')).motion).toBe('walk');await page.screenshot({path:info.outputPath('rina-walks-to-oven.png')});
 await phase(page,.46);expect((await animation(page,'rina')).work).toBe('bread');await page.screenshot({path:info.outputPath('rina-collects-loaf.png')});
 await phase(page,.76);const carrying=await animation(page,'rina');expect(carrying.motion).toBe('walk');expect(carrying.carrying).toBe(true);expect(carrying.work).toBeNull();await page.screenshot({path:info.outputPath('rina-carries-loaf.png')});
});

const clean=(value:string)=>value.replace(/\s+/g,' ').trim();
const changes=(values:string[])=>values.filter((v,i)=>i===0||v!==values[i-1]);
for(const stage of ['arrival','needed','carried','delivered','gap','misplaced','sealed','checked','unshaped','mixed','shaped','baked','escorting','handoff'] as const)test(`fixture reading coverage: bakery ${stage}`,async({page},info)=>{
 await installPlaybackVoice(page);await load(page,checkpoint(stage,true));
 const button=(name:string)=>page.getByRole('button',{name,exact:true});
 if(stage==='handoff'){
  const p=await cue(page,'loaf');await page.mouse.move(p.x,p.y);await page.mouse.down();await page.mouse.move(p.x+8,p.y+8);
  const target=page.locator('[data-bakery-drop="sol"]');await expect(target).toBeVisible();const box=(await target.boundingBox())!;
  await page.mouse.move(box.x+box.width/2,box.y+box.height/2,{steps:15});await page.mouse.up();await expect(page.getByRole('heading',{name:'Rina’s thank-you visit'})).toBeVisible();
 }else{if(['delivered','gap','misplaced'].includes(stage))await button('Back to Pip').click();await button('Talk to Rina').click();if(stage==='arrival')await completeBrowserConversation(page);}
 const reader=page.locator('.garden-reading-scroll');await expect(button('Listen to the conversation')).toBeVisible();await expect(button('Practise reading the conversation')).toHaveCount(1);
 const optional=reader.locator('details');if(await optional.count())await optional.first().locator('summary').click();
 const expected=await reader.evaluate(root=>Array.from(root.querySelectorAll<HTMLElement>('[data-source-component],.g-dialogue-response [data-readable-text],[data-narration="true"] [data-readable-text]')).filter(n=>n.getClientRects().length&&!n.closest('details:not([open])')&&!n.parentElement?.closest('[data-readable-text],[data-source-component]')).map(n=>({text:n.textContent??'',speaker:n.closest<HTMLElement>('[data-speech-speaker]')?.dataset['speechSpeaker']??'narrator'})));
 expect(expected.length).toBeGreaterThan(0);const before=(await spokenSegments(page)).length;
 await automaticVoice(page,true);await button('Listen to the conversation').click();await expect.poll(async()=>(await spokenSegments(page)).length).toBeGreaterThan(before);await expect(button('Listen to the conversation')).toBeVisible({timeout:30000});
 const played=(await spokenSegments(page)).slice(before);
 expect(clean(played.map(s=>s.text).join(' '))).toBe(clean(expected.map(s=>s.text).join(' ')));expect(changes(played.map(s=>s.speaker))).toEqual(changes(expected.map(s=>s.speaker)));
 expect(played.map(s=>s.text).join(' ')).not.toMatch(/Click a word|Return to the (game|roof)|Choose your response/);await expect(page.locator('.g-audio-notice')).toHaveCount(0);
 if(await optional.count()){
  const beforeNote=(await spokenSegments(page)).length;await button('Listen to this explanation').click();await expect.poll(async()=>(await spokenSegments(page)).length).toBeGreaterThan(beforeNote);await expect(button('Listen to this explanation')).toBeVisible({timeout:15000});
  const note=(await spokenSegments(page)).slice(beforeNote);expect(note.length).toBeGreaterThan(0);expect(note.every(s=>s.speaker==='narrator')).toBe(true);
 }
 await button('Practise reading the conversation').click();await expect(page.locator('.g-practice-words')).toContainText(expected[0]!.text.slice(0,35));await expect(button('Listen to this part')).toBeVisible();await button('Close reading practice').click();
 const words=reader.locator('[data-narration="true"] .g-word,.g-dialogue-response .g-word'),word=words.first();const wordText=(await word.textContent())!,speaker=await word.evaluate(node=>node.closest<HTMLElement>('[data-speech-speaker]')?.dataset['speechSpeaker']??'narrator');
 await word.click();await button('Listen to the word').click();await expect(page.locator('.g-audio-notice')).toHaveCount(0);const beforeSentence=(await spokenSegments(page)).length;await button('Listen to the sentence').click();await expect.poll(async()=>(await spokenSegments(page)).length).toBeGreaterThan(beforeSentence);expect((await spokenSegments(page)).at(-1)!.speaker).toBe(speaker);await button('Close word help').click();
 await automaticVoice(page,false);await button('Listen to the conversation').click();await expect(button('Stop listening')).toBeVisible();await button('Stop listening').click();const stopped=(await spokenSegments(page)).length;await page.waitForTimeout(700);expect((await spokenSegments(page)).length).toBe(stopped);
 expect(await page.evaluate(()=>(window as any).__playbackVoice.dynamicRequests.length)).toBe(0);
 await info.attach('reading-coverage',{body:JSON.stringify({stage,fixture:true,media:'synthetic completion; real routing and existing catalogue',expected,played,wordText,providerRequests:0}),contentType:'application/json'});
});

test('native bakery narration plays the existing recording and can be canceled',async({page},info)=>{
 await page.addInitScript(()=>{const play=HTMLMediaElement.prototype.play;(window as any).__nativeBakeryAudio=[];HTMLMediaElement.prototype.play=function(){const item={uri:this.src,ended:false,duration:this.duration,time:0};(window as any).__nativeBakeryAudio.push(item);this.addEventListener('ended',()=>{item.ended=true;item.duration=this.duration;item.time=this.currentTime;},{once:true,capture:true});return play.call(this);};});
 await load(page,checkpoint('checked',true));await page.getByRole('button',{name:'Talk to Rina',exact:true}).click();
 await page.getByRole('button',{name:'Listen to the conversation',exact:true}).click();
 await expect.poll(()=>page.evaluate(()=>(window as any).__nativeBakeryAudio[0]?.ended),{timeout:30000}).toBe(true);
 const audio=await page.evaluate(()=>(window as any).__nativeBakeryAudio);expect(audio[0].duration).toBeGreaterThan(2);expect(audio[0].time).toBeCloseTo(audio[0].duration,2);
 await page.getByRole('button',{name:'Stop listening',exact:true}).click();await expect(page.locator('.g-audio-notice')).toHaveCount(0);await page.screenshot({path:info.outputPath('narrator-paragraph-listened.png')});await info.attach('native-audio',{body:JSON.stringify(audio),contentType:'application/json'});
});

test('routine cold loading has no interrupting card or loading announcement',async({page})=>{
 let release!:()=>void;const gate=new Promise<void>(resolve=>release=resolve);
 await page.route('**/personal-landscape/path/path-derived.json',async route=>{await gate;await route.continue();});
 try{await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await expect(page.locator('.garden-scene')).toHaveAttribute('data-scene-phase','loading');await expect(page.locator('.garden-scene-status')).toHaveCount(0);await expect(page.getByText('Pip and the scenery are being prepared. You can read while they load.',{exact:true})).toHaveCount(0);}finally{release();}
 await expect(page.locator('.garden-scene')).toHaveAttribute('data-scene-phase','ready',{timeout:60000});
});

test('fixture cursor diagnostic: cuts follow the visible dough',async({page},info)=>{
 await load(page,checkpoint('mixed'));await page.waitForTimeout(800);const dough=await bakeryCue(page,'dough');await page.screenshot({path:info.outputPath('before-cuts.png')});
 await cutBakeryDough(page,dough,[.38,.45],info,'first');await cutBakeryDough(page,dough,[.62,.45],info,'second');await bakeryStage(page,'shaped');await page.screenshot({path:info.outputPath('shaped.png')});
});

test('fixture cursor diagnostic: the visible recipient outline supports approach and tile delivery',async({page},info)=>{
 await load(page,checkpoint('carried'));const scene=page.locator('.garden-scene');
 let sol=await bakeryCue(page,'sol',true);
 // The inset corner is visibly highlighted but outside the narrow body mesh.
 // Coordinates come only from the rendered cue, never from world-state projection.
 await page.mouse.click(sol.x+4,sol.y+4);
 await expect.poll(async()=>Math.hypot(Number(await scene.getAttribute('data-pip-x'))-BAKERY_APPROACH.x,Number(await scene.getAttribute('data-pip-z'))-BAKERY_APPROACH.z)).toBeLessThan(.08);
 await page.waitForTimeout(600);await holdBakeryObject(page,'spareTile');sol=await bakeryCue(page,'sol',true);
 await page.mouse.move(sol.x+4,sol.y+4,{steps:18});await page.mouse.up();await bakeryStage(page,'delivered');
 await page.screenshot({path:info.outputPath('recipient-outline-delivery.png')});
 await info.attach('scope',{body:'Explicit carried-tile fixture. Native click and drag use the visible recipient outline; the ordinary serialized delivery must complete. Not a fresh journey.',contentType:'text/plain'});
});

for(const viewport of [{width:1098,height:1105},{width:1422,height:800},{width:1366,height:768},{width:1920,height:1080}])test(`fixture cursor recovery: adjust unequal dough at ${viewport.width}`,async({page},info)=>{
 await page.setViewportSize(viewport);await load(page,checkpoint('mixed'));await page.waitForTimeout(800);const dough=await bakeryCue(page,'dough');
 await cutBakeryDough(page,dough,[.18,.45],info,'unequal');await cutBakeryDough(page,dough,[.62,.45],info,'second');
 await expect(page.locator('.garden-feedback')).toContainText('different sizes');await page.screenshot({path:info.outputPath('unequal-portions.png')});
 await cutBakeryDough(page,dough,[.38,.45],info,'adjusted');await bakeryStage(page,'shaped');await page.screenshot({path:info.outputPath('adjusted-portions.png')});
});

test('fixture cursor recovery: misplaced roof tile returns to the visible opening',async({page},info)=>{
 await load(page,checkpoint('gap'));await page.waitForTimeout(800);await holdBakeryObject(page,'spareTile');const opening=await bakeryCue(page,'opening',true);
 await page.mouse.move(opening.cx-opening.width*.85,opening.cy+opening.height*.35,{steps:15});console.log('Roof visual input diagnostic',await page.locator('.garden-scene').getAttribute('data-hand-gesture'));await page.screenshot({path:info.outputPath('beside-roof-preview.png')});await page.mouse.up();await expect(page.locator('.garden-scene')).toHaveAttribute('data-action-kind','tilePlacement',{timeout:5000});await bakeryStage(page,'misplaced');await page.screenshot({path:info.outputPath('misplaced-roof-tile.png')});
 await holdBakeryObject(page,'spareTile');await page.keyboard.press('Escape');await page.mouse.up();await bakeryStage(page,'misplaced');
 await dropBakeryObject(page,'spareTile','opening');await bakeryStage(page,'sealed');const data=JSON.parse((await page.locator('.garden-scene').getAttribute('data-bakery'))!);expect(data.leakOpen).toBe(false);expect(data.rain).toBe(true);await page.screenshot({path:info.outputPath('roof-recovered.png')});
});

for(const size of [{width:1098,height:1105},{width:2048,height:938},{width:1366,height:768},{width:1920,height:1080}])test(`progression fixture: short bowl strokes and selection cancellation at ${size.width}x${size.height}`,async({page},info)=>{
 await page.setViewportSize(size);await load(page,checkpoint('checked'));await settleBakeryView(page);
 const scene=page.locator('.garden-scene');
 await clickBakeryCue(page,'flour');await expect(scene).toHaveAttribute('data-bakery-selection',/flour/);
 await page.keyboard.press('Escape');await expect(scene).toHaveAttribute('data-bakery-selection','');await expect(page.getByRole('heading',{name:'Pause',exact:true})).toHaveCount(0);
 await clickBakeryCue(page,'flour');await page.getByRole('button',{name:'Talk to Rina',exact:true}).click();await expect(scene).toHaveAttribute('data-bakery-selection','');await page.getByRole('button',{name:'Continue to the game',exact:true}).click();await settleBakeryView(page);
 await clickBakeryCue(page,'flour');await clickBakeryCue(page,'bowl',true);await clickBakeryCue(page,'dough');
 let previous=0;
 for(let stroke=0;stroke<10;stroke++){
  const bowl=await bakeryCue(page,'dough'),direction=stroke%2?1:-1;
  const canvas=(await page.locator('.garden-scene canvas').boundingBox())!;
  expect(bowl.x).toBeGreaterThanOrEqual(canvas.x);expect(bowl.y).toBeGreaterThanOrEqual(canvas.y);expect(bowl.x+bowl.width).toBeLessThanOrEqual(canvas.x+canvas.width);expect(bowl.y+bowl.height).toBeLessThanOrEqual(canvas.y+canvas.height);
  await page.mouse.move(bowl.cx+direction*5,bowl.cy);await page.mouse.down();await page.mouse.move(bowl.cx+direction*5+direction*bowl.width*.22,bowl.cy+direction*8,{steps:8});await page.mouse.up();
  if(await scene.getAttribute('data-action-kind')==='mixDough')break;
  const label=(await page.locator('[data-bakery-object="dough"]').textContent())!;const progress=Number(label.match(/(\d+)%/)?.[1]);expect(progress).toBeGreaterThan(previous);previous=progress;
  if(stroke===0){await page.screenshot({path:info.outputPath(`bowl-short-stroke-${size.width}.png`)});await page.mouse.move(bowl.cx,bowl.cy);await page.mouse.down();await page.mouse.move(bowl.cx+8,bowl.cy,{steps:3});await page.keyboard.press('Escape');await page.mouse.up();await expect(scene).toHaveAttribute('data-hand-gesture','');}
 }
 await bakeryStage(page,'mixed');await clickBakeryCue(page,'dough');await page.screenshot({path:info.outputPath(`cutting-ready-${size.width}.png`)});
 const dough=await bakeryCue(page,'dough');await cutBakeryDough(page,dough,[.38,.45],info,'first');await cutBakeryDough(page,dough,[.62,.45],info,'second');await bakeryStage(page,'shaped');await page.screenshot({path:info.outputPath(`shaped-oven-${size.width}.png`)});
 await info.attach('scope',{body:'Injected earlier chapter fixture; actual mouse selection, conversation and Escape cancellation, accumulated short strokes, native release and two cuts. This is viewport and edge-case evidence, not fresh-journey acceptance.',contentType:'text/plain'});
});

test('progression fixture: walking interrupts a distant drag without a delayed handoff',async({page},info)=>{
 await load(page,checkpoint('needed'));await settleBakeryView(page);await holdBakeryObject(page,'spareTile');
 const scene=page.locator('.garden-scene');await expect(scene).toHaveAttribute('data-bakery-selection',/spareTile/);await page.keyboard.press('ArrowRight');await expect(scene).toHaveAttribute('data-bakery-selection','');await expect(scene).toHaveAttribute('data-bakery-drag','');
 const pip=await bakeryCue(page,'pip',true);await page.mouse.move(pip.cx,pip.cy,{steps:8});await page.mouse.up();await page.waitForTimeout(1200);await bakeryStage(page,'needed');await expect(scene).toHaveAttribute('data-bakery-selection','');await page.screenshot({path:info.outputPath('canceled-distant-drag.png')});
});
