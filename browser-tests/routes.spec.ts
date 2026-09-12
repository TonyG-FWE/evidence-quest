import {test,expect} from '@playwright/test';
import {start,target,settled,saved,go,putTile,collectKit,stage,media,premiere} from './helpers.js';

test('TASK11.16 correct-first, in-place search plan and Loop-first independent recovery',async({page})=>{
 test.setTimeout(240000);await start(page);await target(page,'ST.SOURCE.E4');await settled(page);await page.locator('[data-content-id="CT.SRC.E4"]').scrollIntoViewIfNeeded();await saved(page);
 await go(page,'ST.EXIT.WK','Workshop');await target(page,'WK.WAYFINDING');await settled(page);await page.locator('[data-content-id="CT.NAV.MEDIA"]').scrollIntoViewIfNeeded();await saved(page);
 await page.getByRole('button',{name:'Goal',exact:true}).click();await page.getByRole('button',{name:'Your search plan',exact:true}).click();await page.getByRole('textbox').fill('I will check Media, where the recording room is.');await page.getByRole('button',{name:'Record my plan',exact:true}).click();
 const plan=await saved(page);expect(plan.payload.records.at(-1)?.kind).toBe('crew-plan');expect(plan.payload.npcReceived).toEqual([]);
 await go(page,'WK.EXIT.MD','Media');await target(page,'ACT.LOOP');await settled(page);await stage(page);await target(page,'ST.DOCK');await settled(page);await target(page,'ST.RAIL');await settled(page);
 await expect(page.getByText('Collect the story tiles for this rail.')).toBeVisible();expect((await saved(page)).payload.physical.caddyHost).toBe('MD.RACK.STATION');
 await media(page);await collectKit(page);await stage(page);await target(page,'ST.RACK.BAY');await settled(page);
 await putTile(page,'BRIDGE');await putTile(page,'PLANT','Joined Boats');await putTile(page,'BLOOM','Hill');
 const done=await premiere(page);expect(done.payload.premiere).not.toBeNull();expect(done.payload.physical.objects.noticeFlat).toBe(false);expect(done.payload.physical.objects.toastRevealed).toBe(false);
 await page.getByRole('button',{name:'View premiere recap',exact:true}).click();await expect(page.getByText('I will check Media, where the recording room is.',{exact:true})).toBeVisible();await expect(page.getByText('Your idea changed',{exact:true})).toHaveCount(0);
 await page.screenshot({path:'output/playwright/correct-first-recap.png',fullPage:true});
});

test('TASK11.16 cancellation evidence delivered to Remy, kit-first recovery and seed-only revision',async({page})=>{
 test.setTimeout(240000);await start(page);await target(page,'ST.ACCESS.E2');await settled(page);await page.getByRole('button',{name:'Photo',exact:true}).click();await page.locator('[data-content-id="CT.SRC.E2.B"]').scrollIntoViewIfNeeded();await saved(page);
 await go(page,'ST.EXIT.CY','Courtyard');await target(page,'CY.SOURCE.E3');await settled(page);await page.getByRole('button',{name:'Flatten and secure notice',exact:true}).click();await settled(page);await page.locator('[data-content-id="CT.SRC.E3"]').scrollIntoViewIfNeeded();const read=await saved(page);expect(read.payload.npcReceived).toEqual([]);
 await page.getByRole('button',{name:'Notes',exact:true}).click();await page.getByRole('button',{name:'Show evidence',exact:true}).click();await page.locator('[data-ref="E3.a"]').check();await page.locator('[data-ref="E3.b"]').check();await page.getByRole('button',{name:'Show Remy',exact:true}).click();
 const delivered=await settled(page);expect(delivered.payload.npcReceived.find(n=>n.actorId==='ACT.REMY')?.refs).toEqual(['E3.a','E3.b']);await expect(page.getByText('Outdoor rehearsal. I only saw the word in the middle. I jumped from that to our whole premiere.',{exact:true})).toBeVisible();
 await go(page,'CY.EXIT.WK','Workshop');await go(page,'WK.EXIT.MD','Media');await collectKit(page);await stage(page);await target(page,'ST.RACK.BAY');await settled(page);
 await putTile(page,'FERRY');await putTile(page,'PLANT','One Boat');await putTile(page,'BLOOM','Hill');expect((await saved(page)).payload.physical.loop.mode).toBe('standby');
 await page.getByRole('button',{name:'Rehearse',exact:true}).click();await expect(page.getByText('Bring Loop to the dock to project the story.').first()).toBeVisible();
 await media(page);await target(page,'ACT.LOOP');await settled(page);await stage(page);await target(page,'ST.DOCK');await settled(page);await target(page,'ST.RAIL');await settled(page);
 expect((await saved(page)).payload.physical.order).toEqual(['TILE.FERRY','TILE.PLANT','TILE.BLOOM']);await page.getByRole('button',{name:'Rehearse',exact:true}).click();await expect(page.getByRole('button',{name:'Continue rehearsal',exact:true})).toBeVisible();const failed=await saved(page);expect(failed.payload.playback?.puppet).toEqual({pip:'left',seed:'right',boats:'separate',lit:false});expect(failed.payload.certificate).toBeNull();
 await page.getByRole('button',{name:'Continue rehearsal',exact:true}).click();await expect(page.getByRole('button',{name:'Continue to finish rehearsal',exact:true})).toBeVisible();await page.getByRole('button',{name:'Continue to finish rehearsal',exact:true}).click();await page.getByRole('button',{name:'Arrange tiles',exact:true}).click();await putTile(page,'BRIDGE','One Boat');
 const done=await premiere(page);expect(done.payload.premiere?.order).toEqual(['TILE.FERRY','TILE.BRIDGE','TILE.PLANT','TILE.BLOOM']);
 await page.screenshot({path:'output/playwright/cancellation-revised-premiere.png',fullPage:true});
});
