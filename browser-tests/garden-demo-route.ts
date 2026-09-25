import {expect,type Page,type TestInfo} from '@playwright/test';
import {buildStagedBridge,completeConversation} from './garden-actions.js';
import {playCursorBakery} from './bakery-cursor-actions.js';

export async function playDemoRoute(page:Page,info:TestInfo,checkpoint?:(kind:'planting'|'roof'|'dough'|'handoff')=>Promise<void>,rehearsal?:{opening?:()=>Promise<void>;bakery?:()=>Promise<void>;bakeryReady?:()=>Promise<void>;cursorMethod?:'click'|'drag'}){
 const button=(name:string)=>page.getByRole('button',{name,exact:true}),scene=page.locator('.garden-scene');
 const current=async(name:string)=>{const action=page.locator('.garden-action-bar').getByRole('button',{name,exact:true});await expect(action).toBeVisible({timeout:25000});await expect(page.locator('.garden-alternate-controls')).not.toHaveAttribute('open','');await action.click();};
 await page.goto('/garden');await button('Begin Pip’s adventure').click();await rehearsal?.opening?.();await button('Start playing').click();await buildStagedBridge(page);
 await button('Go to Grandma').click();await button('Talk to Grandma E').click();await button('Work beside Grandma').click();
 await expect(page.locator('.garden-hands>p')).not.toContainText('repair');
 await button('Prepare the spot').press('Enter');await button('Place the seed').click();await expect(page.locator('.garden-hands>p')).toContainText('Cover it with Grandma');
 await page.screenshot({path:info.outputPath('planting-place-and-cover.png')});await checkpoint?.('planting');
 await button('Cover it with Grandma.').press('Enter');await button('Touch the sprout to help it grow').click();await expect(page.locator('.garden-feedback')).toContainText('kept his promise');
 await button('Go to Rina’s bakery').click();await expect(page.locator('.garden-feedback')).toContainText('Walking to Rina’s bakery.');await current('Talk to Rina');await rehearsal?.bakery?.();await completeConversation(page);await rehearsal?.bakeryReady?.();await button('I can bring the spare tile to Sol.').click();await button('Continue to the game').click();
 await playCursorBakery(page,info,checkpoint,rehearsal?.cursorMethod);
}
