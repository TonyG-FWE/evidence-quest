import {test,expect,type Page} from '@playwright/test';
import {workstation,putTile,saved,target,settled} from './helpers.js';
import {copy} from '../src/core/content.js';

async function visibleConsequence(page:Page){
 const image=await page.getByTestId('whole-story').boundingBox(),caption=await page.locator('.narrated-show .caption').boundingBox(),panel=await page.locator('[data-task]').boundingBox();
 expect(image!.y).toBeGreaterThanOrEqual(Math.max(0,panel!.y)-1);expect(image!.y+image!.height).toBeLessThanOrEqual(790);expect(caption!.y+caption!.height).toBeLessThanOrEqual(790);
}
test('ER13 Watch start, unmet and completion keep the full consequence visible without moving keyboard focus',async({page})=>{
 test.setTimeout(90000);await page.setViewportSize({width:1405,height:790});await workstation(page);
 await putTile(page,'FERRY');await putTile(page,'PLANT','One Boat');await putTile(page,'BLOOM','Hill');await page.getByRole('button',{name:'Try this ending',exact:true}).focus();await page.keyboard.press('Enter');
 await expect.poll(async()=>(await saved(page)).payload.playback?.pauseReason).toBe('unmet');await visibleConsequence(page);
 await page.getByRole('button',{name:'Arrange tiles',exact:true}).click();await page.locator('[data-tile="TILE.BRIDGE"]').click();await page.getByRole('button',{name:'Insert after One Boat',exact:true}).click();await page.getByRole('button',{name:'Try this ending',exact:true}).focus();await page.keyboard.press('Enter');
 await expect(page.getByRole('button',{name:'Start premiere',exact:true})).toBeVisible();await visibleConsequence(page);await expect(page.getByRole('button',{name:'Try this ending',exact:true})).toBeFocused();
 await expect(page.locator('.narrated-show .caption')).toContainText('Your ending works.');await page.screenshot({path:'evidence/er13/watch-completion-position.png',fullPage:false});
 await page.getByRole('button',{name:'Your story plan',exact:true}).click();await page.getByRole('textbox').fill('I can describe the ending.');await expect(page.getByRole('textbox')).toBeFocused();await expect(page.getByRole('textbox')).toHaveValue('I can describe the ending.');
});

test('ER13 a new rehearsal after the first premiere uses replay copy and certifies the current rail',async({page})=>{
 test.setTimeout(90000);await workstation(page);await putTile(page,'BRIDGE');await putTile(page,'PLANT','Joined Boats');await putTile(page,'BLOOM','Hill');
 await page.getByRole('button',{name:'Try this ending',exact:true}).click();await page.getByRole('button',{name:'Start premiere',exact:true}).click();await expect(page.getByRole('heading',{name:'The premiere',exact:true})).toBeVisible();
 const first=(await saved(page)).payload.premiere;await page.getByRole('button',{name:copy('CT.ENDING.RETURN'),exact:true}).click();await target(page,'ST.RAIL');await settled(page);
 await putTile(page,'FERRY','Flower');expect((await saved(page)).payload.certificate).toBeNull();
 await page.getByRole('button',{name:'Try this ending',exact:true}).click();await expect(page.locator('.narrated-show .caption')).toContainText("You're ready to replay the show.");await expect(page.getByRole('button',{name:'Replay premiere',exact:true})).toBeVisible();
 await expect(page.getByText('Replay our show.',{exact:true})).toBeVisible();await expect(page.getByText('Put on our first show.',{exact:true})).toHaveCount(0);
 const current=(await saved(page)).payload;expect(current.premiere).toEqual(first);expect(current.certificate?.arrangementRevision).toBe(current.physical.arrangementRevision);expect(current.certificate?.runId).toBe(current.playback?.id);
});
