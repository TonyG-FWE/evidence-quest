import {test,expect} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
import {workstation,putTile,target,settled} from './helpers.js';
test('diagnostic native Watch scroll compared with later automation centering',async({page})=>{
 await page.setViewportSize({width:320,height:568});await workstation(page);
 await page.getByRole('button',{name:'Menu',exact:true}).click();await page.getByRole('button',{name:'Settings',exact:true}).click();await page.getByLabel('Text size',{exact:true}).selectOption('largest');await page.getByLabel('Text spacing',{exact:true}).selectOption('roomier');await page.getByLabel('Motion',{exact:true}).selectOption('reduced');await page.keyboard.press('Escape');await page.keyboard.press('Escape');await target(page,'ST.RAIL');await settled(page);
 await putTile(page,'FERRY');await putTile(page,'PLANT','One Boat');await putTile(page,'BLOOM','Hill');await page.getByRole('button',{name:'Try this ending',exact:true}).click();await expect(page.getByRole('button',{name:'Continue rehearsal',exact:true})).toBeVisible();await page.getByRole('button',{name:'Watch rehearsal',exact:true}).click();
 const measure=()=>page.evaluate(()=>{const c=document.querySelector<HTMLElement>('[data-testid=whole-story]')!,w=document.querySelector<HTMLElement>('.world-dock')!;return{story:c.getBoundingClientRect().toJSON(),dock:w.getBoundingClientRect().toJSON(),scrollY,margin:getComputedStyle(c).scrollMarginTop,reserved:getComputedStyle(document.documentElement).getPropertyValue('--compact-dock-height')};});
 await page.evaluate(()=>new Promise<void>(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>r()))));const native=await measure();await page.screenshot({path:'evidence/er13/watch-scroll-native-firefox.png',fullPage:false});
 await page.getByTestId('whole-story').scrollIntoViewIfNeeded();const centered=await measure();await page.screenshot({path:'evidence/er13/watch-scroll-automation-firefox.png',fullPage:false});
 await writeFile('evidence/er13/watch-scroll-diagnostic.json',JSON.stringify({scope:'Paired geometry collection on unchanged DJ8. Passing this diagnostic means data collected, not Watch acceptance.',native,centered},null,2)+'\n');
});
