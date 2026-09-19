import {test,expect} from '@playwright/test';
import {narrativeCheckpoint} from '../checks/garden-checkpoint-fixtures.js';
import {checksum} from '../src/garden/persistence.js';
import {savedChapter} from './garden-save-fixture.js';
import {installPlaybackVoice} from './garden-playback-voice.js';
import {playLoopStory} from './garden-actions.js';

for(const [time,reader]of [['usual','pip'],['later','pip'],['later','mara']] as const)for(const ending of ['prepared','developed','draft'] as const)test(`nine-outcome saved replay: ${time}/${reader}/${ending}`,async({page},info)=>{
 await installPlaybackVoice(page);const chapter=narrativeCheckpoint(time,reader,ending),before=structuredClone(chapter),envelope={format:1,content:chapter.content,revision:chapter.revision,writer:'isolated-command-fixture',payload:chapter,checksum:checksum(JSON.stringify(chapter))};
 await info.attach('fixture-boundary',{body:'Complete state created by actual serialized game commands, transported into isolated browser storage. This verifies each supported saved outcome, its exact telling and replay ownership. Full fresh native journeys are recorded separately.',contentType:'text/plain'});
 await page.goto('/garden');await savedChapter(page);await page.evaluate(record=>new Promise<void>((resolve,reject)=>{const open=indexedDB.open('evidence-quest-garden-adventure-v1');open.onerror=()=>reject(open.error);open.onsuccess=()=>{const db=open.result,tx=db.transaction('slots','readwrite');tx.objectStore('slots').put(record,'current');tx.oncomplete=()=>{db.close();resolve();};tx.onerror=()=>reject(tx.error);};}),envelope);await page.reload();
 await page.getByRole('button',{name:'Watch your ending',exact:true}).click();await page.getByRole('button',{name:'Watch the ending',exact:true}).click();await playLoopStory(page);const after=await savedChapter(page);expect(after.story.ending).toEqual(before.story.ending);expect(after.story.presentation.finished).toBe(true);expect(after.story.ending.mara).toBe(time==='usual'?'absent':reader==='mara'?'mara':'listener');for(const key of ['seed','river','sections','page','mara','bakery','pip','journal'])expect(after[key]).toEqual(before[key]);expect(after.exposed).toEqual(expect.arrayContaining(before.exposed));expect(after.story.solDraft).toEqual(before.story.solDraft);
 await page.reload();expect((await savedChapter(page)).story.ending).toEqual(before.story.ending);await info.attach('outcome',{body:JSON.stringify(after.story.ending),contentType:'application/json'});
});
