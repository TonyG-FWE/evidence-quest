import {test,expect} from '@playwright/test';
import {start,saved,go,readSlots,injectSlots} from './helpers.js';

test('TASK11.14 injected read failure is never treated as empty and session play preserves stored bytes',async({page})=>{
 await start(page);await saved(page);const before=await readSlots(page);
 await page.addInitScript(()=>{const original=IDBDatabase.prototype.transaction;IDBDatabase.prototype.transaction=function(...args:Parameters<IDBDatabase['transaction']>){if(args[1]==='readonly')throw new DOMException('Synthetic denied read','UnknownError');return original.apply(this,args);};});
 await page.reload();await expect(page.getByRole('heading',{name:'Saved progress couldn’t be checked.'})).toBeVisible();
 await page.getByRole('button',{name:'Play without saving'}).click();await go(page,'ST.EXIT.WK','Workshop');await expect(page.getByTestId('save-status')).toContainText('Progress can’t be saved');
 expect(await readSlots(page)).toEqual(before);
});

test('TASK11.14 injected quota abort keeps memory playable, preserves head, and retry saves latest state',async({page})=>{
 await start(page);await saved(page);const before=await readSlots(page);
 await page.evaluate(()=>{const original=IDBObjectStore.prototype.put;Object.defineProperty(window,'restorePut',{value:()=>{IDBObjectStore.prototype.put=original;}});IDBObjectStore.prototype.put=function(...args:Parameters<IDBObjectStore['put']>){if(this.name==='caseSlots')throw new DOMException('Synthetic quota','QuotaExceededError');return original.apply(this,args);};});
 await go(page,'ST.EXIT.WK','Workshop');await expect(page.getByTestId('save-status')).toContainText('Progress can’t be saved');expect(await readSlots(page)).toEqual(before);
 await page.evaluate(()=>{(window as unknown as {restorePut:()=>void}).restorePut();});
 await page.getByRole('button',{name:'Try saving again'}).click();expect((await saved(page)).payload.physical.room).toBe('SC.WK');
});

test('TASK11.14 incompatible record remains intact through canceled reset; accepted reset retains preferences',async({page})=>{
 await start(page);const initial=await saved(page);const incompatible=JSON.stringify({...initial,saveFormatVersion:9});await injectSlots(page,{current:incompatible});await page.reload();
 await expect(page.getByRole('heading',{name:'This saved game can’t be continued with this version.'})).toBeVisible();
 await page.getByRole('button',{name:'Start over',exact:true}).click();await expect(page.getByText('This clears this case’s discoveries, ideas, story kit, rehearsals and premiere progress. Your sound and reading settings stay.')).toBeVisible();
 await page.getByRole('button',{name:'Cancel',exact:true}).click();expect((await readSlots(page)).current).toBe(incompatible);
 await page.getByRole('button',{name:'Settings',exact:true}).click();await page.getByLabel('Sound',{exact:true}).selectOption('off');await page.locator('.task-close button').click();
 await page.getByRole('button',{name:'Start over',exact:true}).click();await page.getByRole('button',{name:'Start a new game',exact:true}).click();
 const replaced=await saved(page);expect(replaced.payload.caseRunId).not.toBe(initial.payload.caseRunId);expect(replaced.payload.physical.caddyHost).toBe('MD.RACK.STATION');expect(replaced.payload.grants).toEqual([]);expect(JSON.parse((await readSlots(page)).preferences as string).sound).toBe('off');
});

test('TASK11.14 startup budget expires and a late read cannot take over the unsaved visit',async({page})=>{
 await page.addInitScript(()=>{
  const original=IDBFactory.prototype.open;let first=true;
  IDBFactory.prototype.open=function(...args:Parameters<IDBFactory['open']>){const request=original.apply(this,args);if(first){first=false;Object.defineProperty(request,'onsuccess',{set(callback:(event:Event)=>void){request.addEventListener('success',event=>setTimeout(()=>callback.call(request,event),6500));}});}return request;};
 });
 await page.goto('/');await expect(page.getByRole('heading',{name:'Saved progress couldn’t be checked.'})).toBeVisible();await page.getByRole('button',{name:'Play without saving'}).click();
 await go(page,'ST.EXIT.WK','Workshop');await expect(page.getByTestId('save-status')).toContainText('Progress can’t be saved');
 expect((await readSlots(page)).current).toBeUndefined();await expect(page.locator('.game-header strong')).toHaveText('Workshop');
});
