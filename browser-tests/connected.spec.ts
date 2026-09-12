import {test,expect,type Page} from '@playwright/test';
import {start,saved,go,target,settled,closePanel} from './helpers.js';

async function put(page:Page,tile:string,after?:string){await page.locator(`[data-tile="TILE.${tile}"]`).click();await page.getByRole('button',{name:after?`Insert after ${after}`:'Place at the start',exact:true}).click();}
test('TASK11.16 media-first complete case, notes stay unread through collection, real rehearsal and premiere',async({page})=>{
 test.setTimeout(180000);const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await start(page);
 await go(page,'ST.EXIT.WK','Workshop');await go(page,'WK.EXIT.MD','Media');
 await target(page,'MD.ACCESS.E8');await settled(page);await page.getByRole('button',{name:'Collect story tiles',exact:true}).click();
 const collected=await settled(page);expect(collected.payload.physical.caddyHost).toBe('ACT.PLAYER');expect(collected.payload.grants.some(g=>['E6','E7'].includes(g.sourceId))).toBe(false);
 await target(page,'ACT.LOOP');const following=await settled(page);expect(following.payload.physical.loop.mode).toBe('following');
 await go(page,'MD.EXIT.WK','Workshop');await go(page,'WK.EXIT.ST','Stage');
 await target(page,'ST.RACK.BAY');await expect(page.getByRole('heading',{name:'Your arrangement'})).toBeVisible();const seated=await settled(page);expect(seated.payload.physical.caddyHost).toBe('ST.RACK.BAY');expect(seated.payload.grants.some(g=>['E6','E7'].includes(g.sourceId))).toBe(false);
 await target(page,'ST.DOCK');const docked=await settled(page);expect(docked.payload.physical.loop.mode).toBe('docked');
 await target(page,'ST.RAIL');await settled(page);
 await page.getByRole('button',{name:'Read Jo’s note in the kit',exact:true}).click();await settled(page);await expect(page.getByRole('heading',{name:/Jo/})).toBeVisible();
 await target(page,'ST.RAIL');await settled(page);
 await put(page,'BRIDGE');await put(page,'PLANT','Joined Boats');await put(page,'BLOOM','Hill');
 expect((await saved(page)).payload.physical.order).toEqual(['TILE.BRIDGE','TILE.PLANT','TILE.BLOOM']);
 await page.getByRole('button',{name:'Rehearse',exact:true}).click();await expect(page.getByRole('button',{name:'Launch',exact:true})).toBeVisible();const certified=await saved(page);expect(certified.payload.certificate).not.toBeNull();expect(certified.payload.premiere).toBeNull();
 await page.screenshot({path:'output/playwright/rehearsed-first-case.png',fullPage:true});
 await page.getByRole('button',{name:'Launch',exact:true}).click();await expect(page.getByRole('heading',{name:'The premiere',exact:true})).toBeVisible();const completed=await saved(page);expect(completed.payload.premiere?.order).toEqual(['TILE.BRIDGE','TILE.PLANT','TILE.BLOOM']);expect(completed.payload.historyUncertain).toBe(false);expect(errors).toEqual([]);
 await page.screenshot({path:'output/playwright/first-premiere.png',fullPage:true});
});
