import {test,expect} from '@playwright/test';
import {GardenStore,initialGarden,MARA,CROSSING,GRANDMA_APPROACH} from '../src/garden/model.js';
import {SOL_APPROACH} from '../src/garden/chapter.js';
import {buildBridge} from '../checks/garden-bridge-actions.js';
import {advance,completeConversation,finishBakery} from '../checks/garden-play-actions.js';
import {checksum,validChapter} from '../src/garden/persistence.js';
import {sourcesFor,sourcePrefix} from '../src/garden/content.js';
import {savedChapter} from './garden-save-fixture.js';
import {installPlaybackVoice,automaticVoice,spokenWords} from './garden-playback-voice.js';
const original="I stopped the water getting into the bakery. I didn't change the weather. Look at these sentences: “I found a cracked roof tile and replaced it. The dripping stopped.”";
for(const edition of ['original','literary-20260916'] as const)test('Narrative help uses the actual '+edition+' words in display, listening and oral practice',async({page},info)=>{
 // Labeled checkpoint constructed with serialized gameplay commands. This is
 // focused edition/reading support evidence, not a fresh ordinary-input route.
 const initial=initialGarden('edition-help-'+edition);if(edition==='original')delete initial.chapter.narrativeEdition;
 const store=new GardenStore(initial);store.send({type:'BOOT'});store.send({type:'BEGIN'});store.send({type:'START_PLAY'});
 const go=(point:{x:number;z:number})=>{for(let depth=0;depth<20&&store.getSnapshot().panel;depth++)store.send({type:'CLOSE'});store.send({type:'GO',point});advance(store);};
 go({x:MARA.x,z:MARA.z+.95});store.send({type:'TALK',who:'mara'});completeConversation(store);go(CROSSING);buildBridge(store);go(GRANDMA_APPROACH);store.send({type:'TALK',who:'grandma'});store.send({type:'PLANT'});advance(store);finishBakery(store);go(SOL_APPROACH);store.send({type:'TALK',who:'sol'});completeConversation(store);
 const chapter=structuredClone(store.getSnapshot().chapter);expect(validChapter(chapter)).toBe(true);
 await installPlaybackVoice(page,{legacySources:edition==='original'});
 await page.goto('/garden');await savedChapter(page);const envelope={format:1,content:chapter.content,revision:chapter.revision,writer:'labeled-edition-help-fixture',payload:chapter,checksum:checksum(JSON.stringify(chapter))};
 await page.evaluate(async record=>new Promise<void>(resolve=>{const request=indexedDB.open('evidence-quest-garden-adventure-v1',1);request.onsuccess=()=>{const database=request.result,transaction=database.transaction('slots','readwrite');transaction.objectStore('slots').put(record,'current');transaction.oncomplete=()=>{database.close();resolve();};};}),envelope);
 await page.reload();await automaticVoice(page,true);await page.getByRole('button',{name:'Talk to Sol',exact:true}).click();
 const source=sourcesFor(chapter).sol;expect(source.paragraphs).toHaveLength(edition==='original'?5:6);for(const [index,text] of source.paragraphs.entries())await expect(page.locator('[data-source-component="'+sourcePrefix('sol',chapter)+(index+1)+'"]')).toHaveText(text);
 await page.getByText('Ask Sol about the dripping',{exact:true}).click();const help=page.locator('details').filter({has:page.getByText('Ask Sol about the dripping',{exact:true})}),expected=edition==='original'?original:'The rain kept falling. You could hear it on the roof after I came down the ladder. But the spare tile covered the opening, so the water stayed outside.';
 await expect(help.locator('[data-readable-text]')).toHaveText(expected);await help.getByRole('button',{name:'Listen to Sol’s reply',exact:true}).click();await expect.poll(async()=>(await spokenWords(page)).join(' ').replace(/\s+/g,' ').trim()).toBe(expected.replace(/\s+/g,' ').trim());
 await help.getByRole('button',{name:'Practise reading Sol’s reply',exact:true}).click();await expect(page.locator('.g-practice-words')).toHaveText(expected);await expect(page.locator('.g-practice-overlay')).toHaveAttribute('data-recording','ready');
 await page.getByRole('button',{name:'Back to the story',exact:true}).click();await page.getByRole('button',{name:'Pause',exact:true}).click();
 const legacyNotice=page.getByText('This saved adventure keeps its original telling. Start a new adventure to play the expanded story; this one will be kept in your local archive.',{exact:true});
 if(edition==='original')await expect(legacyNotice).toBeVisible();else await expect(legacyNotice).toHaveCount(0);
 await info.attach('edition-reading-boundary',{body:JSON.stringify({edition,persistedEdition:chapter.narrativeEdition??null,sourcePrefix:sourcePrefix('sol',chapter),displayedHelp:expected,note:'Synthetic cast-media callbacks verify exact text; no native audio decoding, microphone or provider request.'}),contentType:'application/json'});
});
