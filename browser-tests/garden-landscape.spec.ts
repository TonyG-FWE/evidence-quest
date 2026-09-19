import {test,expect} from '@playwright/test';
import {worldPoint} from './garden-actions.js';
import {savedChapter} from './garden-save-fixture.js';
import {anchors,terrainHeight} from '../src/garden/worldLayout.js';

test('village overview, sloping-path pointer navigation and dock arrival remain connected',async({page},info)=>{
 test.setTimeout(70000);const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('/garden');await page.getByRole('button',{name:'Begin Pip’s adventure',exact:true}).click();await page.getByRole('button',{name:'Start playing',exact:true}).click();
 const scene=page.locator('.garden-scene');await expect(scene).toHaveAttribute('data-rendered-view','walk');await page.screenshot({path:info.outputPath('village-crossing.png')});
 await page.getByRole('button',{name:'Map and camera',exact:true}).click();await page.getByRole('button',{name:'Fit map',exact:true}).click();await expect(scene).toHaveAttribute('data-camera-focus','overview');
 for(const name of ['Mara','Grandma','Rina’s bakery','Sol’s workshop']){const label=page.getByRole('button',{name,exact:true});await label.focus();await expect(label).toBeFocused();await expect(label).toHaveCSS('opacity','1');}await page.screenshot({path:info.outputPath('village-overview.png')});
 const hill={x:-7,z:-9},target=await worldPoint(page,hill.x,hill.z,terrainHeight(hill));expect(terrainHeight(hill)).toBeGreaterThan(.25);await page.mouse.click(target.x,target.y);
 await expect.poll(async()=>{const c=await savedChapter(page);return Math.hypot(c.pip.x-hill.x,c.pip.z-hill.z);},{timeout:18000}).toBeLessThan(.12);
 await page.getByRole('button',{name:'Follow Pip',exact:true}).click();await page.getByRole('button',{name:'Go to Mara',exact:true}).click();
 await expect.poll(async()=>{const c=await savedChapter(page);return Math.hypot(c.pip.x-anchors.dock.approach.x,c.pip.z-anchors.dock.approach.z);},{timeout:15000}).toBeLessThan(.02);
 await expect(page.locator('.garden-location')).toHaveText('Passenger dock');await page.screenshot({path:info.outputPath('passenger-dock.png')});expect(errors).toEqual([]);
});
