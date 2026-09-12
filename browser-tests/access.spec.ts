import {test,expect} from '@playwright/test';
import {start,target,settled,saved,go} from './helpers.js';
import {writeFile} from 'node:fs/promises';
test('TASK11.08 first recording frame and photo stay separate; canceled notice remains curled',async({page})=>{
 await start(page);await target(page,'ST.ACCESS.E2');await settled(page);
 await page.locator('[data-content-id="CT.MEDIA.FRAME1"]').scrollIntoViewIfNeeded();
 const first=await saved(page);expect(first.payload.exposures.some(e=>e.refId==='E2.a/frame1')).toBe(true);expect(first.payload.exposures.some(e=>['E2.a/frame2','E2.a/frame3','E2.a/end','E3.a','E3.b'].includes(e.refId))).toBe(false);
 await page.getByRole('button',{name:'Photo',exact:true}).click();await page.locator('[data-content-id="CT.SRC.E2.B"]').scrollIntoViewIfNeeded();const photo=await saved(page);expect(photo.payload.grants.some(g=>g.sourceId==='E3')).toBe(false);
 await go(page,'ST.EXIT.CY','Courtyard');await target(page,'CY.SOURCE.E3');await settled(page);
 await page.getByRole('button',{name:'Flatten and secure notice',exact:true}).click();await page.waitForTimeout(400);await page.getByRole('button',{name:'Stop walking',exact:true}).click();
 const canceled=await saved(page);expect(canceled.payload.physical.objects.noticeFlat).toBe(false);expect(canceled.payload.grants.some(g=>g.refs.includes('E3.a')||g.refs.includes('E3.b'))).toBe(false);
});
test('TASK11.07 compact Largest Roomier native navigation and typing retain world position',async({page},info)=>{
 await page.addInitScript(()=>{const events:{type:string;label:string|null}[]=[];(window as unknown as {focusReview:typeof events}).focusReview=events;for(const type of ['click','focusin','keydown'])document.addEventListener(type,event=>{if(type==='keydown'&&(event as KeyboardEvent).key!=='Escape')return;events.push({type,label:(event.target as HTMLElement)?.textContent?.trim().slice(0,90)??null});},true);});
 await page.setViewportSize({width:320,height:568});await start(page);await page.getByRole('button',{name:'Menu',exact:true}).click();await page.getByRole('button',{name:'Settings',exact:true}).click();
 await page.getByLabel('Text size',{exact:true}).selectOption('largest');await page.getByLabel('Text spacing',{exact:true}).selectOption('roomier');await page.getByLabel('Motion',{exact:true}).selectOption('reduced');await page.getByLabel('Sound',{exact:true}).selectOption('off');
 await page.keyboard.press('Escape');await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Menu',exact:true})).toBeFocused();
 await writeFile(`evidence/er13/focus-return-${info.project.name}.json`,JSON.stringify(await page.evaluate(()=>({active:document.activeElement?.textContent,events:(window as unknown as {focusReview:unknown}).focusReview})),null,2)+'\n');
 await go(page,'ST.EXIT.WK','Workshop');await page.getByRole('button',{name:'Goal',exact:true}).click();await page.getByRole('button',{name:'Your search plan',exact:true}).click();
 const before=(await saved(page)).payload.physical.avatar;await page.getByRole('textbox').fill('wasd is my own wording.');await page.keyboard.press('ArrowLeft');const after=await saved(page);expect(after.payload.physical.avatar).toEqual(before);expect(after.payload.drafts.find(d=>d.id==='search-plan')?.text).toBe('wasd is my own wording.');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:'output/playwright/compact-largest-plan.png',fullPage:true});
});
test('TASK11.07 injected Canvas failure keeps named controls usable',async({page})=>{
 await page.addInitScript(()=>{HTMLCanvasElement.prototype.getContext=(()=>null) as typeof HTMLCanvasElement.prototype.getContext;});await start(page);
 await expect(page.getByText('This browser couldn’t draw the scene. You can use the room’s named controls and descriptions.')).toBeVisible();
 await go(page,'ST.EXIT.WK','Workshop');await go(page,'WK.EXIT.MD','Media room');await target(page,'MD.ACCESS.E8');await settled(page);await expect(page.getByRole('button',{name:'Collect story tiles',exact:true})).toBeVisible();
});
