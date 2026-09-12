import {expect,type Page} from '@playwright/test';
import type {SaveEnvelope} from '../contracts/types.js';
import {randomUUID} from 'node:crypto';
import {newCase} from '../src/core/state.js';
import {validCase} from '../src/save/validate.js';
export async function saved(page:Page):Promise<SaveEnvelope>{
 await expect(page.getByTestId('save-status')).toContainText('Saved on this device.');
 return page.evaluate(async()=>new Promise((resolve,reject)=>{
  const open=indexedDB.open('evidence-quest',1);open.onerror=()=>reject(open.error);
  open.onsuccess=()=>{const db=open.result,tx=db.transaction('caseSlots'),request=tx.objectStore('caseSlots').get('current');tx.oncomplete=()=>{db.close();resolve(JSON.parse(request.result));};tx.onabort=()=>reject(tx.error);};
 }));
}
export async function start(page:Page){await page.goto('/');await page.getByRole('button',{name:'Join the crew',exact:true}).click();await expect(page.locator('.game-header strong')).toHaveText('Stage');await page.getByRole('button',{name:'Keep exploring',exact:true}).click();}
export async function target(page:Page,owner:string){await page.getByRole('button',{name:/Move to/}).first().click();await page.locator(`[data-owner="${owner}"]`).click();}
export async function go(page:Page,owner:string,room:string){await target(page,owner);await expect(page.locator('.game-header strong')).toHaveText(room);}
export async function closePanel(page:Page){await page.locator('.task-close button').click();}
export async function settled(page:Page){await expect(page.getByRole('button',{name:'Stop walking',exact:true})).toHaveCount(0);return saved(page);}
export async function putTile(page:Page,tile:string,after?:string){await page.getByRole('button',{name:'Arrange tiles',exact:true}).click();await page.locator(`[data-tile="TILE.${tile}"]`).click();await page.getByRole('button',{name:after?`Insert after ${after}`:'Place at the start',exact:true}).click();}
export async function collectKit(page:Page){await target(page,'MD.ACCESS.E8');await settled(page);await page.getByRole('button',{name:'Collect story tiles',exact:true}).click();await settled(page);}
export async function stage(page:Page){await go(page,'MD.EXIT.WK','Workshop');await go(page,'WK.EXIT.ST','Stage');}
export async function media(page:Page){await go(page,'ST.EXIT.WK','Workshop');await go(page,'WK.EXIT.MD','Media room');}
export async function premiere(page:Page){await page.getByRole('button',{name:'Try this ending',exact:true}).click();await expect(page.getByRole('button',{name:'Start premiere',exact:true})).toBeVisible();await page.getByRole('button',{name:'Start premiere',exact:true}).click();await expect(page.getByRole('heading',{name:'The premiere',exact:true})).toBeVisible();return saved(page);}
// Named synthetic READY preset, for isolated boundary tests; never substitutes for the three fresh route tests.
export async function workstation(page:Page){await start(page);const old=await saved(page),c=newCase(randomUUID());c.physical.avatar=[78,58];c.encounteredActors=['ACT.JO'];c.physical.caddyHost='ST.RACK.BAY';c.physical.objects.rackOpened=true;c.physical.objects.dockFlapOpen=true;c.physical.loop={room:'SC.ST',feet:[76,35],mode:'docked'};expect(validCase(c)).toBe(true);
 await injectSlots(page,{current:JSON.stringify({...old,slotRevision:old.slotRevision+1,payload:c})});await page.reload();await page.getByRole('button',{name:'Continue',exact:true}).click();await target(page,'ST.RAIL');await settled(page);
}
export async function readSlots(page:Page):Promise<{current:unknown;previous:unknown;preferences:unknown}>{
 return page.evaluate(async()=>new Promise((resolve,reject)=>{const open=indexedDB.open('evidence-quest',1);open.onerror=()=>reject(open.error);open.onsuccess=()=>{const db=open.result,tx=db.transaction(['caseSlots','preferences']),current=tx.objectStore('caseSlots').get('current'),previous=tx.objectStore('caseSlots').get('previous'),preferences=tx.objectStore('preferences').get('current');tx.oncomplete=()=>{db.close();resolve({current:current.result,previous:previous.result,preferences:preferences.result});};};}));
}
export async function injectSlots(page:Page,values:{current?:unknown;previous?:unknown}){
 await page.evaluate(async values=>new Promise<void>((resolve,reject)=>{const open=indexedDB.open('evidence-quest',1);open.onerror=()=>reject(open.error);open.onsuccess=()=>{const db=open.result,tx=db.transaction('caseSlots','readwrite');for(const [key,value]of Object.entries(values))tx.objectStore('caseSlots').put(value,key);tx.oncomplete=()=>{db.close();resolve();};tx.onabort=()=>reject(tx.error);};}),values);
}
