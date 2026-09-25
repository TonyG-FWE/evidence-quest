import {test,expect,type Page} from '@playwright/test';
import {GardenStore,initialGarden,CROSSING,GRANDMA_APPROACH,MARA,type Chapter} from '../src/garden/model.js';
import {sourcesFor} from '../src/garden/content.js';
import {SOL_APPROACH} from '../src/garden/chapter.js';
import {advance,completeConversation,finishBakery} from '../checks/garden-play-actions.js';
import {buildBridge} from '../checks/garden-bridge-actions.js';
import {checksum,validChapter} from '../src/garden/persistence.js';
import {savedChapter} from './garden-save-fixture.js';
import {narrativeCheckpoint} from '../checks/garden-checkpoint-fixtures.js';
import {createHash} from 'node:crypto';
const button=(page:Page,name:string)=>page.getByRole('button',{name,exact:true});
test.beforeEach(async({page})=>{await page.route('**/api/garden/cast-audio',r=>r.fulfill({status:503,json:{status:'unavailable'}}));await page.route('**/api/garden/definition-narrator**',r=>r.fulfill({status:503,json:{status:'unavailable'}}));});
function writingChapter(){const store=new GardenStore(initialGarden('adaptive-reader-fixture'));store.send({type:'BOOT'});store.send({type:'BEGIN'});store.send({type:'START_PLAY'});store.send({type:'GO',point:CROSSING});advance(store);buildBridge(store);store.send({type:'GO',point:GRANDMA_APPROACH});advance(store);finishBakery(store);store.send({type:'GO',point:SOL_APPROACH});advance(store);store.send({type:'TALK',who:'sol'});completeConversation(store);return store.getSnapshot().chapter;}
async function fixture(page:Page,payload:Chapter){expect(validChapter(payload)).toBe(true);await page.route('**/api/garden/config',r=>r.fulfill({json:{textFeedback:false,readingFeedback:false,transcription:false}}));await page.goto('/garden');await savedChapter(page);const record={format:1,content:payload.content,revision:payload.revision,writer:'adaptive-reader-fixture',payload,checksum:checksum(JSON.stringify(payload))};await page.evaluate(record=>new Promise<void>((resolve,reject)=>{const r=indexedDB.open('evidence-quest-garden-adventure-v1');r.onsuccess=()=>{const db=r.result,tx=db.transaction('slots','readwrite');tx.objectStore('slots').put(record,'current');tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>reject(tx.error);};}),record);await page.reload();}
async function writing(page:Page){await fixture(page,writingChapter());await button(page,'Talk to Sol').click();await button(page,'Let’s finish the ending together.').click();await expect(page.locator('.g-adaptive-writing')).toBeVisible();}

test('actual writing: source panes, equal choices, durable draft and Try versus Use',async({page},info)=>{
 await writing(page);const draft=page.getByLabel('Your ending for Sol’s story',{exact:true}),text='I repaired the roof. Rina kept her flour dry and baked the bread.';await draft.fill(text);await draft.evaluate((node:HTMLTextAreaElement)=>node.setSelectionRange(5,13));
 const before=await savedChapter(page);await button(page,'Listen to choice: Baking, then the visit').click();expect((await savedChapter(page)).story.solChoice).toBe(before.story.solChoice);expect((await savedChapter(page)).story.solEnding).toEqual(before.story.solEnding);
 await button(page,'His draft').click();await expect(page.locator('.g-writing-source-scroll')).toContainText('Rina');await button(page,'What happened next').click();await expect(draft).toHaveValue(text);
 for(const size of [{width:1440,height:900},{width:1280,height:720},{width:700,height:700},{width:390,height:844},{width:320,height:568}]){await page.setViewportSize(size);await expect(button(page,'Try my ending')).toBeInViewport();if(size.width<1000){await button(page,'Sol’s words').click();await expect(page.getByRole('region',{name:'Sol’s words',exact:true})).toBeVisible();await button(page,'My ending').click();}await expect(draft).toBeVisible();await expect(draft).toHaveValue(text);expect(await page.locator('body').evaluate(n=>n.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:info.outputPath(`writing-${size.width}x${size.height}.png`)});}
 await page.setViewportSize({width:1440,height:900});await draft.focus();await draft.evaluate((node:HTMLTextAreaElement)=>{node.setSelectionRange(5,13);node.dispatchEvent(new Event('select',{bubbles:true}));});await button(page,'Observation journal').click();await page.keyboard.press('Escape');await expect(draft).toHaveValue(text);expect(await draft.evaluate((node:HTMLTextAreaElement)=>[node.selectionStart,node.selectionEnd])).toEqual([5,13]);
 await button(page,'Help').click();await expect(page.getByRole('heading',{name:'Your writing stays yours'})).toBeVisible();await page.keyboard.press('Escape');await expect(draft).toHaveValue(text);expect(await draft.evaluate((node:HTMLTextAreaElement)=>[node.selectionStart,node.selectionEnd])).toEqual([5,13]);
 await button(page,'Baking, then the visit').click();await button(page,'Try my ending').click();expect((await savedChapter(page)).story.solChoice).toBe('none');await expect(button(page,'Use this ending')).toBeVisible();await button(page,'Use this ending').click();await expect.poll(async()=>(await savedChapter(page)).story.solChoice).toBe('prepared');expect((await savedChapter(page)).story.solEnding?.text).toBe(text);
});

test('pending microphone permission is canceled by blur and late stream is stopped',async({page})=>{
 await page.addInitScript(()=>{const owner=window as unknown as {releaseMic?:()=>void;micStops?:number};Object.defineProperty(navigator.mediaDevices,'getUserMedia',{configurable:true,value:()=>new Promise(resolve=>{owner.releaseMic=()=>resolve({getTracks:()=>[{stop:()=>{owner.micStops=(owner.micStops??0)+1;}}]});})});});
 await page.route('**/api/garden/config',r=>r.fulfill({json:{readingFeedback:false,transcription:false}}));await page.goto('/garden');await button(page,'Begin Pip’s adventure').click();await button(page,'Practise reading this page').click();await button(page,'Start listening').click();await expect(page.locator('.g-practice-overlay')).toHaveAttribute('data-recording','permission');await page.evaluate(()=>window.dispatchEvent(new Event('blur')));await expect(page.locator('.g-practice-overlay')).toHaveAttribute('data-recording','ready');await page.evaluate(()=>(window as unknown as {releaseMic:()=>void}).releaseMic());await expect.poll(()=>page.evaluate(()=>(window as unknown as {micStops:number}).micStops)).toBe(1);await expect(page.locator('.g-practice-overlay')).toHaveAttribute('data-local-audio-bytes','0');await expect(button(page,'Get feedback')).toHaveCount(0);
});

test('five source pages retain every exact paragraph and source identity through help and reopen',async({page})=>{
 const store=new GardenStore(initialGarden('adaptive-pages-fixture'));store.send({type:'BOOT'});store.send({type:'BEGIN'});store.send({type:'START_PLAY'});store.send({type:'GO',point:{x:MARA.x,z:MARA.z+.95}});advance(store);store.send({type:'TALK',who:'mara'});completeConversation(store);store.send({type:'TAKE_PAGE'});advance(store);const chapter=store.getSnapshot().chapter;await fixture(page,chapter);
 const openStory=async()=>{await button(page,'Backpack').click();await page.locator('.g-item').filter({has:page.locator('strong',{hasText:'The Torn Wing'})}).getByRole('button',{name:'Read',exact:true}).click();};await openStory();
 const paragraphs:string[]=[],ids:string[]=[];for(let i=0;i<5;i++){await expect(page.getByText(`Page ${i+1} of 5`,{exact:true})).toBeVisible();paragraphs.push(...await page.locator('.g-paged-source [data-source-component]').allTextContents());ids.push(...await page.locator('.g-paged-source [data-source-component]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('data-source-component')!)));if(i<4)await button(page,'Next page').click();}
 expect(paragraphs).toEqual(sourcesFor(chapter).story.paragraphs);expect(new Set(ids).size).toBe(10);await page.locator('.g-paged-source .g-word').first().click();await expect(page.locator('.garden-word-card')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('.g-paged-source .g-word').first()).toBeFocused();await page.keyboard.press('Escape');await page.keyboard.press('Escape');await openStory();await expect(page.getByText('Page 5 of 5',{exact:true})).toBeVisible();
});

test('synthetic device exercises native local capture WAV replay discard and close without upload',async({page})=>{
 // Synthetic input only: retain the browser's real MediaStream, recorder worklet,
 // WAV encoding and media replay. No microphone device or permission is tested.
 await page.addInitScript(()=>{
  const recordings:{stream:MediaStream;context:AudioContext}[]=[];
  (window as any).__syntheticRecorderDevices=recordings;
  Object.defineProperty(navigator.mediaDevices,'getUserMedia',{configurable:true,value:async()=>{
   const context=new AudioContext(),destination=context.createMediaStreamDestination(),oscillator=context.createOscillator();
   oscillator.frequency.value=220;oscillator.connect(destination);oscillator.start();
   const stream=destination.stream,stops=stream.getTracks().map(track=>()=>MediaStreamTrack.prototype.stop.call(track));let closed=false;
   const release=()=>{if(closed)return;closed=true;stops.forEach(stop=>stop());oscillator.stop();oscillator.disconnect();void context.close().catch(()=>{});window.removeEventListener('pagehide',release);};
   for(const track of stream.getTracks())Object.defineProperty(track,'stop',{configurable:true,value:release});
   window.addEventListener('pagehide',release,{once:true});recordings.push({stream,context});
   try{await context.resume();return stream;}catch(error){release();throw error;}
  }});
 });
 const uploads:string[]=[];page.on('request',request=>{if(request.method()==='POST'&&/\/api\/garden\/(reading|transcript)/.test(request.url()))uploads.push(request.url());});await page.route('**/api/garden/config',r=>r.fulfill({json:{readingFeedback:false,transcription:false}}));await page.goto('/garden');await button(page,'Begin Pip’s adventure').click();await button(page,'Practise reading this page').click();const box=page.locator('.g-practice-overlay');await button(page,'Start listening').click();await expect(box).toHaveAttribute('data-recording','listening');await page.waitForTimeout(400);await button(page,'Stop').click();await expect(box).toHaveAttribute('data-recording','review');await expect.poll(async()=>Number(await box.getAttribute('data-local-audio-bytes'))).toBeGreaterThan(44);await box.locator('audio').evaluate((node:HTMLAudioElement)=>node.play());await expect.poll(()=>box.locator('audio').evaluate((node:HTMLAudioElement)=>node.currentTime)).toBeGreaterThan(0);await expect(button(page,'Get feedback')).toHaveCount(0);await button(page,'Discard recording').click();await expect(box).toHaveAttribute('data-local-audio-bytes','0');await button(page,'Back to the story').click();await expect(button(page,'Practise reading this page')).toBeFocused();expect(uploads).toEqual([]);
 await expect.poll(()=>page.evaluate(()=>{const devices=(window as any).__syntheticRecorderDevices as {stream:MediaStream;context:AudioContext}[];return devices.length>0&&devices.every(({stream,context})=>stream.getTracks().every(track=>track.readyState==='ended')&&context.state==='closed');})).toBe(true);
});

test('generated feedback voice is explicit and preserves source and draft revision',async({page})=>{
 const spoken:unknown[]=[];await page.route('**/api/garden/cast-audio',route=>{spoken.push(route.request().postDataJSON());return route.fulfill({status:503,json:{status:'unavailable'}});});await page.route('**/api/garden/feedback',route=>{const request=route.request().postDataJSON();return route.fulfill({json:{requestId:request.requestId,revision:request.revision,draftRevision:request.draftRevision,status:'supported',feedback:'Your ending connects the dry flour to the bread.',scene:'bread'}});});await writing(page);await page.getByLabel('Your ending for Sol’s story',{exact:true}).fill('I repaired the roof so Rina could bake.');await page.getByText('Support for my ending',{exact:true}).click();await button(page,'Ask for feedback').click();await expect(page.locator('[data-speech-origin="generated-feedback"]')).toContainText('Your ending connects');expect(spoken).toEqual([]);await button(page,'Listen to the feedback').click();await expect.poll(()=>spoken.length).toBe(1);expect(spoken[0]).toMatchObject({origin:'generated-feedback',speaker:'sol',explicitListen:true,text:'Your ending connects the dry flour to the bread.'});expect((spoken[0] as {revision:string}).revision).toMatch(/^sol-ending:/);expect((await savedChapter(page)).story.solChoice).toBe('none');
});

test('synthetic late microphone permission after native focus loss never starts capture',async({page})=>{
 await page.addInitScript(()=>{
  Object.assign(window,{micStops:0,releaseMic:()=>{}});
  Object.defineProperty(navigator.mediaDevices,'getUserMedia',{configurable:true,value:()=>new Promise(resolve=>{(window as any).releaseMic=()=>resolve({getTracks:()=>[{stop:()=>{(window as any).micStops++;}}]});})});
 });
 await page.goto('/garden');await button(page,'Begin Pip’s adventure').click();await button(page,'Practise reading this page').click();await button(page,'Start listening').click();
 await expect(page.locator('.g-practice-overlay')).toHaveAttribute('data-recording','permission');
 // The browser may report lost focus before dispatching its blur notification.
 await page.evaluate(()=>{Object.defineProperty(document,'hasFocus',{configurable:true,value:()=>false});(window as any).releaseMic();});
 await expect.poll(()=>page.evaluate(()=>(window as any).micStops)).toBe(1);
 await expect(page.locator('.g-practice-overlay')).toHaveAttribute('data-recording','ready');await expect(page.locator('.g-practice-overlay')).toHaveAttribute('data-local-audio-bytes','0');
});

test('editing an answer aborts its pending selected-voice request before stale audio arrives',async({page})=>{
 await page.addInitScript(()=>{
  const original=window.fetch.bind(window);Object.assign(window,{staleVoiceAborts:0});
  window.fetch=(input,init)=>{if(String(input).includes('/api/garden/cast-audio'))init?.signal?.addEventListener('abort',()=>{(window as any).staleVoiceAborts++;},{once:true});return original(input,init);};
 });
 let release:()=>void=()=>{};
 await page.route('**/api/garden/cast-audio',async route=>{await new Promise<void>(resolve=>{release=resolve;});await route.fulfill({status:503,json:{status:'unavailable'}}).catch(()=>{});});
 await page.route('**/api/garden/feedback',route=>{const request=route.request().postDataJSON();return route.fulfill({json:{requestId:request.requestId,revision:request.revision,draftRevision:request.draftRevision,status:'supported',feedback:'Your ending connects the dry flour to the bread.',scene:'bread'}});});
 await writing(page);const draft=page.getByLabel('Your ending for Sol’s story',{exact:true});await draft.fill('I repaired the roof so Rina could bake.');await page.getByText('Support for my ending',{exact:true}).click();await button(page,'Ask for feedback').click();await expect(button(page,'Listen to the feedback')).toBeVisible();
 const request=page.waitForRequest('**/api/garden/cast-audio');await button(page,'Listen to the feedback').click();await request;
 await draft.fill('I repaired the roof. Later Rina brought a loaf.');await expect.poll(()=>page.evaluate(()=>(window as any).staleVoiceAborts)).toBeGreaterThan(0);release();await expect(button(page,'Listen to the feedback')).toHaveCount(0);await expect(draft).toHaveValue('I repaired the roof. Later Rina brought a loaf.');
});

test('concurrent save conflict freezes edits, retains the local copy through reload, and preserves both chapters on explicit recovery',async({page,context})=>{
 await writing(page);const draft=page.getByLabel('Your ending for Sol’s story',{exact:true});await draft.fill('My first local draft.');await savedChapter(page);
 const other=await context.newPage();await other.goto('/garden');await button(other,'Talk to Sol').click();await button(other,'Let’s finish the ending together.').click();await other.getByLabel('Your ending for Sol’s story',{exact:true}).fill('The other window has newer words.');await savedChapter(other);
 await page.bringToFront();await draft.fill('Keep these exact local words after the conflict.');await expect(button(page,'Load latest progress')).toBeVisible();await expect(button(page,'Restore my local copy')).toBeVisible();await expect(draft).not.toBeEditable();await draft.focus();await draft.press('End');await draft.pressSequentially(' These keys must not alter a frozen draft.');await expect(draft).toHaveValue('Keep these exact local words after the conflict.');
 const records=()=>page.evaluate(()=>new Promise<any[]>(resolve=>{const request=indexedDB.open('evidence-quest-garden-adventure-v1');request.onsuccess=()=>{const db=request.result,tx=db.transaction('slots'),read=tx.objectStore('slots').getAll();tx.oncomplete=()=>{db.close();resolve(read.result);};};}));
 await expect.poll(async()=>(await records()).filter(item=>item.kind==='conflict-recovery'&&!item.resolved).map(item=>item.envelope.payload.story.solDraft.text)).toContain('Keep these exact local words after the conflict.');
 await button(page,'Load latest progress').click();await savedChapter(page);await page.reload();await expect(button(page,'Restore my local copy')).toBeVisible();await button(page,'Restore my local copy').click();
 await expect.poll(async()=>(await savedChapter(page)).story.solDraft.text).toBe('Keep these exact local words after the conflict.');
 expect((await records()).some(item=>item.payload?.story?.solDraft?.text==='The other window has newer words.')).toBe(true);await other.close();
});

test('saved child endings keep Sol voice and exact revision in library and completed-story word help',async({page})=>{
 // Synthetic unavailable delivery captures the actual UI request; this is not acoustic proof.
 const requests:{text:string;speaker:string;origin:string;revision:number|string}[]=[];
 await page.route('**/api/garden/cast-audio',route=>{requests.push(route.request().postDataJSON());return route.fulfill({status:503,json:{status:'unavailable'}});});
 const chapter=narrativeCheckpoint('later','pip','prepared'),contribution=chapter.gathering.solPerformed;
 expect(contribution&&contribution!=='draft'&&contribution.origin).toBe('child');if(!contribution||contribution==='draft')throw Error('Expected a performed child contribution');
 await fixture(page,chapter);await button(page,'Lantern stories').click();
 const owner=chapter.runId+':sol-ending:'+contribution.revision;
 for(const location of ['library','story'] as const){
  const words=page.locator('[data-readable-text][data-reading-origin="child-draft"]').filter({hasText:contribution.text});
  await expect(words).toHaveCount(1);await expect(words).toHaveAttribute('data-speech-speaker','sol');await expect(words).toHaveAttribute('data-speech-revision',String(contribution.revision));await expect(words).toHaveAttribute('data-speech-owner',owner);
  await words.locator('.g-word').first().click();const count=requests.length;await button(page,'Listen to the sentence').click();await expect.poll(()=>requests.length).toBe(count+1);
  expect(requests.at(-1)).toMatchObject({speaker:'sol',origin:'child-draft',revision:String(contribution.revision),text:'I kept the flour dry.'});
  await button(page,'Back to where I was').click();if(location==='library')await button(page,'Open A Small Repair').click();
 }
 expect((await savedChapter(page)).gathering.solPerformed).toEqual(contribution);
});

test('long personal notes send a compact exact-text revision only after explicit listening',async({page})=>{
 // Synthetic unavailable delivery verifies request identity without contacting any provider.
 const revisions:unknown[]=[];await page.route('**/api/garden/cast-audio',route=>{const request=route.request().postDataJSON();revisions.push({revision:request.revision,speaker:request.speaker,origin:request.origin,explicitListen:request.explicitListen});return route.fulfill({status:503,json:{status:'unavailable'}});});
 await writing(page);await button(page,'Observation journal').click();const notes='I remember how the repaired roof helped Rina keep her promise. '.repeat(10);
 expect(notes.length).toBeGreaterThan(500);await page.getByLabel('Personal notes (optional)',{exact:true}).fill(notes);await page.getByText('Read my notes with help',{exact:true}).click();expect(revisions).toEqual([]);
 await button(page,'Listen to my notebook notes').click();await expect.poll(()=>revisions.length).toBe(1);
 expect(revisions[0]).toEqual({revision:createHash('sha256').update(notes).digest('hex'),speaker:'narrator',origin:'child-draft',explicitListen:true});expect((await savedChapter(page)).journal.notes).toBe(notes);
});
