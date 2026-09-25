import {expect,type Page,type TestInfo} from '@playwright/test';
import {buildStagedBridge,completeConversation} from './garden-actions.js';

export async function playDemoRoute(page:Page,info:TestInfo,checkpoint?:(kind:'planting'|'roof'|'dough'|'handoff')=>Promise<void>,rehearsal?:{opening?:()=>Promise<void>;bakery?:()=>Promise<void>;bakeryReady?:()=>Promise<void>}){
 const button=(name:string)=>page.getByRole('button',{name,exact:true}),scene=page.locator('.garden-scene');
 const current=async(name:string)=>{const action=page.locator('.garden-action-bar').getByRole('button',{name,exact:true});await expect(action).toBeVisible({timeout:25000});await expect(page.locator('.garden-alternate-controls')).not.toHaveAttribute('open','');await action.click();};
 await page.goto('/garden');await button('Begin Pip’s adventure').click();await rehearsal?.opening?.();await button('Start playing').click();await buildStagedBridge(page);
 await button('Go to Grandma').click();await button('Talk to Grandma E').click();await button('Work beside Grandma').click();
 await expect(page.locator('.garden-hands>p')).not.toContainText('repair');
 await button('Prepare the spot').press('Enter');await button('Place the seed').click();await expect(page.locator('.garden-hands>p')).toContainText('Cover it with Grandma');
 await page.screenshot({path:info.outputPath('planting-place-and-cover.png')});await checkpoint?.('planting');
 await button('Cover it with Grandma.').press('Enter');await button('Touch the sprout to help it grow').click();await expect(page.locator('.garden-feedback')).toContainText('kept his promise');
 await button('Go to Rina’s bakery').click();await expect(page.locator('.garden-feedback')).toContainText('Walking to Rina’s bakery.');await current('Talk to Rina');await rehearsal?.bakery?.();await completeConversation(page);await rehearsal?.bakeryReady?.();await button('I can bring the spare tile to Sol.').click();await button('Continue to the game').click();
 if(await button('Go to the tile shelf').isVisible())await current('Go to the tile shelf');await current('Take the spare tile');await current('Bring the tile to Sol');await current('Give the tile to Sol');await current('Direct Sol’s roof repair');await current('Remove the cracked tile');await current('Over the opening');
 await page.screenshot({path:info.outputPath('visible-roof-actions.png')});await checkpoint?.('roof');
 await current('Place the tile');await current('Let Rina check the flour');await expect.poll(async()=>JSON.parse((await scene.getAttribute('data-bakery'))!).stage,{timeout:20000}).toBe('checked');if(await button('Go to Rina').isVisible())await current('Go to Rina');await current('Make the dough with Rina');await expect(scene).toHaveAttribute('data-action-kind','none');await checkpoint?.('dough');await current('Shape the loaves');await current('Bake the bread');await current('Take a loaf to thank Sol');await current('Walk with Rina to the workshop');await current('Let Rina give Sol the loaf');
 await expect.poll(async()=>JSON.parse((await scene.getAttribute('data-bakery'))!).stage,{timeout:15000}).toBe('done');await expect(button('Talk to Sol')).toBeVisible();
 await page.screenshot({path:info.outputPath('visible-bakery-handoff.png')});await checkpoint?.('handoff');
}
