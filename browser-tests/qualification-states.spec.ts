import {test,expect} from '@playwright/test';
import {start,saved,workstation,putTile,target,settled,injectSlots,readSlots} from './helpers.js';
import {copy} from '../src/core/content.js';

test('TASK11.21 UI.TECH.LOADING and HOME.CHECKING retain honest actions through delayed module and storage completion',async({page})=>{
 let releaseModule!:()=>void;const heldModule=new Promise<void>(resolve=>releaseModule=resolve);
 await page.route('**/assets/App-*.js',async route=>{await heldModule;await route.continue();});
 await page.addInitScript(()=>{const original=IDBFactory.prototype.open;let first=true;IDBFactory.prototype.open=function(...args:Parameters<IDBFactory['open']>){const request=original.apply(this,args);if(first){first=false;Object.defineProperty(request,'onsuccess',{set(callback:(event:Event)=>void){request.addEventListener('success',event=>{(window as unknown as {releaseBoot:()=>void}).releaseBoot=()=>callback.call(request,event);});}});}return request;};});
 await page.goto('/',{waitUntil:'domcontentloaded'});await expect(page.getByText(copy('CT.TECH.LOADING'),{exact:true})).toBeVisible();await expect(page.getByRole('button',{name:'Join the crew',exact:true})).toHaveCount(0);
 releaseModule();await expect(page.getByText(copy('CT.START.CHECK'),{exact:true})).toBeVisible();await expect(page.getByRole('button',{name:'Join the crew',exact:true})).toHaveCount(0);await expect(page.getByRole('button',{name:'Continue',exact:true})).toHaveCount(0);
 await page.getByRole('button',{name:'Settings',exact:true}).click();await page.waitForFunction(()=>typeof (window as unknown as {releaseBoot?:()=>void}).releaseBoot==='function');await page.evaluate(()=>(window as unknown as {releaseBoot:()=>void}).releaseBoot());
 await expect(page.getByRole('heading',{name:'Settings',exact:true})).toBeVisible();await page.locator('.task-close button').click();await expect(page.getByRole('button',{name:'Join the crew',exact:true})).toBeVisible();
});

test('TASK11.21 UI.WORLD.CHOOSER and BLOCKED keep source choice explicit and failed floor movement harmless',async({page})=>{
 await page.setViewportSize({width:390,height:844});await start(page);const before=(await saved(page)).payload;
 const canvas=page.getByTestId('world'),box=(await canvas.boundingBox())!;await canvas.click({position:{x:box.width*54.5/120,y:box.height*30/80}});
 await expect(page.locator('[data-owner="ST.SOURCE.E4"]')).toBeVisible();await expect(page.locator('[data-owner="ST.ACCESS.E2"]')).toBeVisible();await expect(page.locator('[data-task] [data-owner]')).toHaveCount(2);expect((await saved(page)).payload.grants).toEqual([]);
 await page.locator('.task-close button').click();const returned=(await canvas.boundingBox())!;await canvas.click({position:{x:returned.width*118/120,y:returned.height*10/80}});await expect(page.getByText(copy('CT.WORLD.BLOCKED'),{exact:true})).toBeVisible();expect((await saved(page)).payload.physical.avatar).toEqual(before.physical.avatar);
 await page.getByRole('button',{name:'Notes',exact:true}).click();await expect(page.getByText(copy('CT.NOTES.EMPTY'),{exact:true})).toBeVisible();expect((await saved(page)).payload.exposures).toEqual([]);
});

test('TASK11.21 foreground lifecycle event acknowledgment retains private draft and prior task without autoplay',async({page})=>{
 await start(page);await page.getByRole('button',{name:'Goal',exact:true}).click();await page.getByRole('button',{name:'Your search plan',exact:true}).click();await page.getByRole('textbox').fill('My unfinished idea 🦊');const before=(await saved(page)).payload;
 // Explicit browser lifecycle fault injection. The parent separately checks
 // an actual browser tab leave/return; this is not physical focus evidence.
 await page.evaluate(()=>{window.dispatchEvent(new Event('blur'));window.dispatchEvent(new Event('focus'));});
 await expect(page.locator('.foreground-notice')).toContainText(copy('CT.RETURN.VISIBLE'));await expect(page.getByRole('textbox')).toHaveValue('My unfinished idea 🦊');await expect(page.getByRole('textbox')).toBeFocused();expect((await saved(page)).payload).toEqual(before);
 await page.getByRole('textbox').fill('My unfinished idea 🦊, continued');await expect(page.locator('.foreground-notice')).toHaveCount(0);await page.evaluate(()=>{window.dispatchEvent(new Event('blur'));window.dispatchEvent(new Event('focus'));});await page.locator('.foreground-notice').getByRole('button',{name:'Return to festival',exact:true}).click();await expect(page.locator('[data-task]')).toHaveCount(0);expect((await saved(page)).payload.physical).toEqual(before.physical);
});

test('TASK11.21 foreground return keeps an active rehearsal paused through old callbacks and explicit room acknowledgment',async({page})=>{
 await workstation(page);await putTile(page,'BRIDGE');await putTile(page,'PLANT','Joined Boats');await putTile(page,'BLOOM','Hill');await page.getByRole('button',{name:'Try this ending',exact:true}).click();await page.evaluate(()=>{window.dispatchEvent(new Event('blur'));window.dispatchEvent(new Event('focus'));});
 await expect(page.locator('.foreground-notice')).toContainText(copy('CT.RETURN.VISIBLE'));const paused=(await saved(page)).payload;expect(paused.playback?.status).toBe('paused');expect(paused.playback?.nextCue).toBe(1);expect(paused.playback?.mode).toBe('rehearsal');
 // Wait past the already-issued1400ms cue callback to prove it cannot resume.
 await page.waitForTimeout(1600);expect((await saved(page)).payload.playback).toEqual(paused.playback);await page.locator('.foreground-notice').getByRole('button',{name:'Return to festival',exact:true}).click();expect((await saved(page)).payload.playback).toEqual(paused.playback);
 await target(page,'ST.RAIL');await settled(page);await page.getByRole('button',{name:'Continue rehearsal',exact:true}).click();await expect(page.getByRole('button',{name:'Start premiere',exact:true})).toBeVisible();
});

test('TASK11.21 UI.RECOVERY.RUN retains independently valid resources and rejects only the broken pending playback',async({page})=>{
 await workstation(page);const before=await saved(page),broken=JSON.parse(JSON.stringify(before));broken.payload.playback={unexpected:'declared synthetic corrupt pending run'};
 await injectSlots(page,{current:JSON.stringify(broken)});await page.reload();await expect(page.getByRole('heading',{name:copy('CT.RECOVERY.RUN'),exact:true})).toBeVisible();expect((await readSlots(page)).current).toBe(JSON.stringify(broken));
 await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.getByRole('heading',{name:copy('CT.RECOVERY.RUN'),exact:true})).toBeVisible();const repaired=(await saved(page)).payload;expect(repaired.caseRunId).toBe(before.payload.caseRunId);expect(repaired.physical).toEqual(before.payload.physical);expect(repaired.playback).toBeNull();expect(repaired.premiere).toBeNull();
 await page.locator('.task-close button').click();await expect(page.getByTestId('world')).toBeVisible();
});
