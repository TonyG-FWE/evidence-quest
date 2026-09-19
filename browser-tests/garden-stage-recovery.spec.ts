import {test,expect} from '@playwright/test';
import {PNG} from 'pngjs';
import {narrativeCheckpoint} from '../checks/garden-checkpoint-fixtures.js';
import {checksum} from '../src/garden/persistence.js';
import {savedChapter} from './garden-save-fixture.js';
import {installPlaybackVoice} from './garden-playback-voice.js';

test('a paused story picture redraws after native context restoration without advancing its story',async({page},info)=>{
 test.setTimeout(120000);await installPlaybackVoice(page);const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 const chapter=narrativeCheckpoint('usual','pip','prepared'),record={format:1,content:chapter.content,revision:chapter.revision,writer:'context-recovery-fixture',payload:chapter,checksum:checksum(JSON.stringify(chapter))};
 await page.goto('/garden');await savedChapter(page);await page.evaluate(record=>new Promise<void>((resolve,reject)=>{const request=indexedDB.open('evidence-quest-garden-adventure-v1');request.onerror=()=>reject(request.error);request.onsuccess=()=>{const db=request.result,tx=db.transaction('slots','readwrite');tx.objectStore('slots').put(record,'current');tx.oncomplete=()=>{db.close();resolve();};};}),record);
 await page.reload();await page.getByRole('button',{name:'Watch your ending',exact:true}).click();await page.getByRole('button',{name:'Watch the ending',exact:true}).click();await page.getByRole('button',{name:'Pause story',exact:true}).click();
 const stage=page.locator('.garden-world-activity>.g-story-stage'),canvas=stage.locator('canvas');await expect(stage).toHaveAttribute('aria-busy','false',{timeout:90000});
 const before={frame:Number(await stage.getAttribute('data-stage-rendered-frame')),time:await stage.getAttribute('data-stage-time'),page:await page.locator('[data-presentation-page]').getAttribute('data-presentation-page')},original=await canvas.elementHandle();
 const supported=await canvas.evaluate((canvas:HTMLCanvasElement)=>{const extension=canvas.getContext('webgl2')?.getExtension('WEBGL_lose_context');if(!extension)return false;(window as Window&{__restoreStageContext?:()=>void}).__restoreStageContext=()=>extension.restoreContext();extension.loseContext();return true;});
 test.skip(!supported,'Native WebGL context-loss extension unavailable; this recovery condition is NOT_RUN.');
 await expect(stage).toHaveAttribute('data-stage-context','lost');await expect(stage.getByRole('button',{name:'Restore story view',exact:true})).toBeVisible();
 await page.evaluate(()=>{(window as Window&{__restoreStageContext?:()=>void}).__restoreStageContext?.();});
 await expect(stage).toHaveAttribute('data-stage-context','restored');await expect(stage).toHaveAttribute('aria-busy','false',{timeout:90000});await expect.poll(async()=>Number(await stage.getAttribute('data-stage-rendered-frame'))).toBeGreaterThan(before.frame);
 await expect(stage.getByRole('button',{name:'Restore story view',exact:true})).toHaveCount(0);expect(await original!.evaluate(element=>element===document.querySelector('.garden-world-activity>.g-story-stage canvas'))).toBe(true);
 await expect(stage).toHaveAttribute('data-stage-time',before.time!);expect(await page.locator('[data-presentation-page]').getAttribute('data-presentation-page')).toBe(before.page);expect((await savedChapter(page)).story.ending).toEqual(chapter.story.ending);
 const png=PNG.sync.read(await canvas.screenshot()),colors=new Set<string>();for(let i=0;i<png.data.length;i+=64)colors.add(png.data.subarray(i,i+3).toString('hex'));expect(colors.size).toBeGreaterThan(100);expect(errors).toEqual([]);
 await page.screenshot({path:info.outputPath('story-context-restored.png')});await info.attach('scope',{body:'A labeled ending save fixture and synthetic native WEBGL_lose_context trigger exercise the actual supplied picture renderer. Playback voice is synthetic and paused. Verifies same-canvas restoration, a new native render, populated pixels and unchanged story/time; this is not a fresh journey or driver-crash/visual acceptance.',contentType:'text/plain'});
});
