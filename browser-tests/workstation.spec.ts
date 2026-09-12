import {test,expect} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
import {workstation,putTile,premiere,saved,target,settled} from './helpers.js';
const labels:Record<string,string>={BRIDGE:'Joined Boats',PLANT:'Hill',BLOOM:'Flower',FERRY:'One Boat'};
for(const order of [['BRIDGE','PLANT','BLOOM'],['FERRY','BRIDGE','PLANT','BLOOM'],['BRIDGE','FERRY','PLANT','BLOOM'],['BRIDGE','PLANT','FERRY','BLOOM'],['BRIDGE','PLANT','BLOOM','FERRY']]){
 test(`FIX11.RAIL/RUN/PREMIERE native successful order ${order.join('-')}`,async({page})=>{await workstation(page);for(const [i,tile]of order.entries())await putTile(page,tile,i?labels[order[i-1]!]:undefined);const result=await premiere(page);expect(result.payload.premiere?.order).toEqual(order.map(t=>`TILE.${t}`));expect(result.payload.playback?.puppet).toEqual({pip:'right',seed:'soil',boats:'joined',lit:true});});
}
test('TASK11.11 drag replace/swap/return, adjacent boundary and canceled selection preserve unique ownership',async({page})=>{
 await workstation(page);await putTile(page,'BRIDGE');await putTile(page,'PLANT','Joined Boats');await putTile(page,'BLOOM','Hill');
 if(process.env['EQ_TRACE_DRAG']==='1')await page.evaluate(()=>{
  const events:unknown[]=[];(window as unknown as {dragTrace:unknown[]}).dragTrace=events;
  for(const type of ['pointerdown','mousedown','dragstart','dragend','drop','pointerup'])document.addEventListener(type,event=>{const e=event as DragEvent,t=e.target as HTMLElement;events.push({type,at:performance.now(),tag:t.tagName,tile:t.closest('[data-tile]')?.getAttribute('data-tile'),text:t.textContent?.slice(0,100),x:e.clientX,y:e.clientY,types:[...(e.dataTransfer?.types??[])],active:document.activeElement?.textContent?.slice(0,100)});},true);
 });
 const tile=(name:string)=>page.locator(`[data-tile="TILE.${name}"]`);
 await tile('FERRY').dragTo(tile('PLANT'));expect((await saved(page)).payload.physical.order).toEqual(['TILE.BRIDGE','TILE.FERRY','TILE.BLOOM']);await expect(tile('PLANT')).toBeVisible();
 await tile('BLOOM').dragTo(tile('BRIDGE'));expect((await saved(page)).payload.physical.order).toEqual(['TILE.BLOOM','TILE.FERRY','TILE.BRIDGE']);
 await tile('FERRY').dragTo(page.getByTestId('rack'));expect((await saved(page)).payload.physical.order).toEqual(['TILE.BLOOM','TILE.BRIDGE']);
 await tile('BLOOM').click();const before=await saved(page);await page.getByRole('button',{name:'Move left',exact:true}).click();expect((await saved(page)).payload.physical.arrangementRevision).toBe(before.payload.physical.arrangementRevision);await expect(tile('BLOOM')).toBeFocused();
 await tile('BRIDGE').click();await page.keyboard.press('Escape');await expect(tile('BRIDGE')).toBeFocused();expect((await saved(page)).payload.physical.order).toEqual(before.payload.physical.order);
 await tile('BRIDGE').click();await page.getByRole('button',{name:'Move left',exact:true}).click();expect((await saved(page)).payload.physical.order).toEqual(['TILE.BRIDGE','TILE.BLOOM']);
 // Initiate the native drag inside the source before crossing the scroll pane.
 // A one-step jump to the outside header can emit only down/up in Chromium.
 await tile('BRIDGE').hover();const sourceBox=(await tile('BRIDGE').boundingBox())!;
 await page.mouse.down();await page.mouse.move(sourceBox.x+sourceBox.width/2+10,sourceBox.y+sourceBox.height/2,{steps:4});
 // Drop in the visible world, outside every rail/rack drop target.
 const outsideBox=(await page.getByTestId('world').boundingBox())!;await page.mouse.move(outsideBox.x+outsideBox.width/2,Math.max(8,outsideBox.y+outsideBox.height/2),{steps:8});await page.mouse.up();
 if(process.env['EQ_TRACE_DRAG']==='1')await writeFile('evidence/er13/native-drag-diagnostic.json',JSON.stringify(await page.evaluate(()=>(window as unknown as {dragTrace:unknown[]}).dragTrace),null,2)+'\n');
 await expect(page.getByText('That isn’t a place for this tile. Your arrangement is unchanged.',{exact:true})).toBeVisible();await expect(tile('BRIDGE')).toBeFocused();expect((await saved(page)).payload.physical.order).toEqual(['TILE.BRIDGE','TILE.BLOOM']);
});
test('FIX11.CERT_EDIT/RESET native cancellation, actual edit, rehearsal reset and rail clear retain past premiere',async({page})=>{
 await workstation(page);for(const [tile,after]of [['BRIDGE',undefined],['PLANT','Joined Boats'],['BLOOM','Hill']] as const)await putTile(page,tile,after);const completed=await premiere(page);await target(page,'ST.RAIL');await settled(page);await page.getByRole('button',{name:'Arrange tiles',exact:true}).click();
 await page.locator('[data-tile="TILE.BRIDGE"]').click();await page.getByRole('button',{name:'Cancel selection',exact:true}).click();expect((await saved(page)).payload.certificate).toEqual(completed.payload.certificate);
 await page.locator('[data-tile="TILE.FERRY"]').click();await page.getByRole('button',{name:'Insert after Flower',exact:true}).click();let state=await saved(page);expect(state.payload.certificate).toBeNull();expect(state.payload.premiere).toEqual(completed.payload.premiere);await page.getByRole('button',{name:'Try the big screen',exact:true}).click();await settled(page);await expect(page.getByText('Try your ending before you put on the show.',{exact:true}).last()).toBeVisible();
 const more=()=>page.getByRole('button',{name:'More actions',exact:true}).click();await more();await page.getByRole('button',{name:'Reset rehearsal',exact:true}).click();await page.getByRole('button',{name:'Cancel',exact:true}).click();expect((await saved(page)).payload.physical.order).toHaveLength(4);
 await more();await page.getByRole('button',{name:'Reset rehearsal',exact:true}).click();await page.getByRole('button',{name:'Reset rehearsal',exact:true}).click();state=await saved(page);expect(state.payload.playback).toBeNull();expect(state.payload.physical.order).toHaveLength(4);expect(state.payload.premiere).toEqual(completed.payload.premiere);
 await more();await page.getByRole('button',{name:'Clear rail',exact:true}).click();await page.getByRole('button',{name:'Clear rail',exact:true}).click();state=await saved(page);expect(state.payload.physical.order).toEqual([]);expect(state.payload.premiere).toEqual(completed.payload.premiere);expect(state.payload.caseRunId).toBe(completed.payload.caseRunId);expect(state.payload.observations.filter(o=>o.kind==='run-finalized')).toHaveLength(2);
});
test('TASK11.12 controlled active and terminal interruptions settle once, notes return to the current rail owner',async({page})=>{
 await workstation(page);await putTile(page,'BRIDGE');await putTile(page,'PLANT','Joined Boats');await putTile(page,'BLOOM','Hill');await page.getByRole('button',{name:'Try this ending',exact:true}).click();await page.getByRole('button',{name:'Stop',exact:true}).click();let state=await saved(page);expect(state.payload.playback?.nextCue).toBe(1);expect(state.payload.playback?.puppet.pip).toBe('right');
 await page.getByRole('button',{name:'Arrange tiles',exact:true}).click();await page.getByRole('button',{name:'Read Jo’s note in the kit',exact:true}).click();await settled(page);await page.locator('.task-close button').click();await expect(page.getByRole('heading',{name:'Plan our story',exact:true})).toBeVisible();expect((await saved(page)).payload.playback?.nextCue).toBe(1);
 await page.getByRole('button',{name:'Continue rehearsal',exact:true}).click();await expect(page.getByRole('button',{name:'Start premiere',exact:true})).toBeVisible();await page.getByRole('button',{name:'Start premiere',exact:true}).click();await page.getByRole('button',{name:'Stop',exact:true}).click();state=await saved(page);expect(state.payload.premiere).toBeNull();expect(state.payload.playback?.mode).toBe('show');expect(state.payload.playback?.nextCue).toBe(1);await page.getByRole('button',{name:'Continue premiere',exact:true}).click();await expect(page.getByRole('heading',{name:'The premiere',exact:true})).toBeVisible();
});
