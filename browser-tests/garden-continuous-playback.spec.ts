import {placeMemory,resumeGathering} from './garden-actions.js';
import {savedChapter as saved} from './garden-save-fixture.js';
import {test,expect,type Page} from '@playwright/test';
import {readFileSync} from 'node:fs';
import {turnLines} from '../src/garden/gathering.js';
import {installPlaybackVoice,finishVoiceSegment,spokenWords} from './garden-playback-voice.js';
import {playSpeakingTurn,playLoopStory} from './garden-actions.js';
test.setTimeout(120000);
const captures=JSON.parse(readFileSync('evidence/group-7-review-20260915/group-6-migration-inputs.json','utf8').replace(/^\uFEFF/,''));
const button=(page:Page,name:string)=>page.getByRole('button',{name,exact:true});
const normalized=(text:string)=>text.replace(/\s+/g,' ').trim();
async function restore(page:Page,name:string){
 const fixture=captures.cases.find((value:any)=>value.name===name);await page.goto('/garden');await saved(page);
 await page.evaluate(async envelope=>new Promise<void>(resolve=>{const request=indexedDB.open('evidence-quest-garden-adventure-v1');request.onsuccess=()=>{const db=request.result,transaction=db.transaction('slots','readwrite');transaction.objectStore('slots').put(envelope,'current');transaction.oncomplete=()=>{db.close();resolve();};};}),fixture.envelope);await page.reload();return await saved(page);
}

test('Continuous telling: complete Sol words, safe word help, replay and stale callback ownership',async({page},info)=>{
 await installPlaybackVoice(page,{legacySources:true});const before=await restore(page,'sol-world-introduction'),expected=turnLines(before).map(line=>line.text);
 await info.attach('fixture-and-voice-boundary',{body:'Authentic Group6 save in an isolated browser; ordinary UI controls after restoration. Cast-media callbacks are synthetic and deliberately held or completed. Exact words, sequencing and cancellation are assessed; native decoding, voice quality and acoustic recognition are not.',contentType:'text/plain'});
 await expect(button(page,'Resume story')).toBeVisible();await expect(button(page,'Continue speaking')).toHaveCount(0);await expect(button(page,'Finish this turn')).toHaveCount(0);
 await button(page,'Resume story').click();await expect.poll(()=>spokenWords(page)).toEqual([expected[0]!]);await finishVoiceSegment(page);await expect.poll(async()=>(await saved(page)).gathering.turn.index).toBe(1);
 await button(page,'Pause story').click();const held=await saved(page);await page.evaluate(()=>(window as any).__playbackVoice.callbacks.at(-1)?.());expect((await saved(page)).gathering.turn).toEqual(held.gathering.turn);
 await button(page,'Resume story').click();await button(page,'Read the whole story with help').click();await page.locator('.garden-reading-scroll .g-word').first().click();await expect(page.getByRole('complementary')).toBeVisible();const wordHeld=await saved(page);await page.evaluate(()=>(window as any).__playbackVoice.callbacks.at(-1)?.());expect((await saved(page)).gathering.turn).toEqual(wordHeld.gathering.turn);await button(page,'Close word help').click();await button(page,'Back to the world telling').click();await expect(button(page,'Resume story')).toBeVisible();
 await page.evaluate(()=>(window as any).__playbackVoice.spoken=[]);await button(page,'Replay story').click();await expect.poll(async()=>(await saved(page)).gathering.turn.index).toBe(0);await playSpeakingTurn(page);
 await expect.poll(async()=>normalized((await spokenWords(page)).join(' '))).toBe(normalized(expected.join('\n\n')));const after=await saved(page);expect(after.gathering.solPerformed).toEqual(before.gathering.turn.contribution);expect(after.gathering.turn).toBeNull();for(const key of ['seed','river','bakery','page','pip'])expect(after[key]).toEqual(before[key]);
});

test('Continuous telling: restored progress waits, full Grandma telling proceeds without sentence choices',async({page},info)=>{
 await installPlaybackVoice(page,{legacySources:true});const original=await restore(page,'grandma-original-first-paragraph');await expect(button(page,'Resume story')).toBeVisible();expect(await spokenWords(page)).toEqual([]);
 await button(page,'Resume story').click();await finishVoiceSegment(page);await expect.poll(async()=>(await saved(page)).gathering.turn.index).toBe(original.gathering.turn.index+1);const interrupted=await saved(page);await page.reload();await expect(button(page,'Resume story')).toBeVisible();expect((await saved(page)).gathering.turn).toEqual(interrupted.gathering.turn);expect(await spokenWords(page)).toEqual([]);
 await button(page,'Replay story').click();const replay=await saved(page),expected=turnLines(replay).map(line=>line.text);await playSpeakingTurn(page);await expect.poll(async()=>normalized((await spokenWords(page)).join(' '))).toBe(normalized(expected.join('\n\n')));expect((await saved(page)).gathering.grandmaPerformed).toBe(true);await info.attach('scope',{body:'Real save restoration and visible resume/replay. Synthetic cast media delivers every exact canonical paragraph and subsequent replies. No native decoder, per-sentence action or inferred reading assessment.',contentType:'text/plain'});
});

test('Continuous Loop: full ending, automatic pictures, pause and reload keep the actual story',async({page},info)=>{
 await installPlaybackVoice(page,{legacySources:true});await restore(page,'later-pip-prepared-before-pip-moment');await page.locator('.garden-access>summary').click();await page.locator('.garden-access').getByRole('button',{name:'Go to Grandma',exact:true}).click();await page.locator('.garden-access>summary').click();await button(page,'Talk to Grandma E').click();await button(page,'Continue the gathering').click();await button(page,'Sharing our stories').click();await placeMemory(page);await resumeGathering(page);await button(page,'Hear Grandma and Mara finish their conversation').click();await playSpeakingTurn(page);await button(page,'Finish the chapter').click();
 const completed=await saved(page);await page.evaluate(()=>(window as any).__playbackVoice.spoken=[]);await button(page,'Watch the ending').click();await expect(page.locator('[data-presentation-page="0"]')).toBeVisible();await expect(button(page,'Next picture')).toHaveCount(0);await expect(button(page,'Previous picture')).toHaveCount(0);await expect.poll(async()=>(await spokenWords(page)).length).toBeGreaterThan(0);
 await finishVoiceSegment(page);await expect.poll(async()=>(await saved(page)).story.presentation.page).toBe(1);await button(page,'Pause story').click();const held=await saved(page);await page.evaluate(()=>(window as any).__playbackVoice.callbacks.at(-1)?.());expect((await saved(page)).story.presentation.page).toBe(held.story.presentation.page);await button(page,'Pause · Back to studio').click();await page.reload();await button(page,'Watch your ending').click();await button(page,'Watch the ending').click();await expect(page.locator('[data-presentation-page="1"]')).toBeVisible();await page.evaluate(()=>(window as any).__playbackVoice.spoken=[]);await button(page,'Replay story').click();await playLoopStory(page);
 await expect.poll(async()=>normalized((await spokenWords(page)).join(' '))).toBe(normalized(completed.story.ending.paragraphs.join('\n\n')));const final=await saved(page);expect(final.story.ending).toEqual(completed.story.ending);expect(final.story.presentation).toMatchObject({finished:true,inProgress:false,page:3});await info.attach('scope',{body:'Authentic earlier checkpoint and ordinary story/Loop controls. Synthetic cast media checks all four actual ending paragraphs, automatic scene progress and late-callback cancellation; no native acoustic qualification.',contentType:'text/plain'});
});

test('Continuous captions: unavailable narration pauses until explicit text playback, and the complete story remains readable',async({page},info)=>{
 await page.route('**/audio/cast/manifest.json',route=>route.fulfill({status:503,body:'Synthetic unavailable cast manifest'}));
 const before=await restore(page,'sol-world-introduction');await button(page,'Resume story').click();const playback=page.getByRole('group',{name:'Whole story playback',exact:true});await expect(playback).toHaveAttribute('data-playback-state','paused');await expect(playback).toHaveAttribute('data-playback-mode','speech');await expect(playback).toContainText(/voice library unavailable/i);expect((await saved(page)).gathering.turn).toEqual(before.gathering.turn);
 await button(page,'Read without narration').click();await expect(playback).toHaveAttribute('data-playback-mode','captions');await expect(playback).toHaveAttribute('data-playback-state','playing');
 await expect.poll(async()=>(await saved(page)).gathering.turn.index,{timeout:25000}).toBe(1);await button(page,'Pause story').click();await button(page,'Read the whole story with help').click();
 const reader=page.locator('.garden-reading-scroll');for(const line of turnLines(before))await expect(reader).toContainText(line.text);await expect(button(page,'Continue speaking')).toHaveCount(0);await expect(button(page,'Finish this turn')).toHaveCount(0);
 await info.attach('missing-voice-boundary',{body:'Synthetic HTTP503 for the selected-cast manifest pauses narration without advancing. The explicit Read without narration control selects captions; only then does actual elapsed browser time advance the first story segment. Complete-text reader and pause remain reachable. Full timed completion and pause ownership are covered by the separate real-store contract.',contentType:'text/plain'});
});
