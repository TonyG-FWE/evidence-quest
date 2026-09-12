import {test,expect} from '@playwright/test';
import {copy} from '../src/core/content.js';
import {start,saved} from './helpers.js';
test('FIX11.OPEN dismissible guidance keeps assignment and unforced investigation intact',async({page})=>{
 await start(page);await expect(page.getByTestId('world')).toBeFocused();await page.locator('.guidance').getByRole('button',{name:copy('CT.UI.DISMISS'),exact:true}).click();await page.getByRole('button',{name:copy('CT.UI.DISMISS'),exact:true}).click();await page.getByRole('button',{name:'Goal',exact:true}).click();await expect(page.locator('.task-panel').getByText(copy('CT.GOAL.ASSIGNMENT'),{exact:true})).toBeVisible();const state=await saved(page);expect(state.payload.guidance.openingDismissed).toBe(true);expect(state.payload.guidance.movementDismissed).toBe(true);expect(state.payload.grants).toEqual([]);expect(state.payload.physical.avatar).toEqual([20,50]);
});
