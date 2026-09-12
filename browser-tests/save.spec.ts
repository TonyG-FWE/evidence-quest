import {test,expect} from '@playwright/test';
import {start,saved,go,readSlots,injectSlots} from './helpers.js';

test('TASK11.14 actual IndexedDB acknowledgement, reload and separated preferences',async({page})=>{
 await start(page);const initial=await saved(page);
 await go(page,'ST.EXIT.WK','Workshop');const moved=await saved(page);expect(moved.payload.physical.room).toBe('SC.WK');expect(moved.slotRevision).toBeGreaterThan(initial.slotRevision);
 await page.getByRole('button',{name:'Menu',exact:true}).click();await page.getByRole('button',{name:'Settings',exact:true}).click();
 await page.getByLabel('Sound',{exact:true}).selectOption('off');await page.getByLabel('Text size',{exact:true}).selectOption('largest');
 await expect.poll(async()=>JSON.parse((await readSlots(page)).preferences as string).text).toBe('largest');
 await page.reload();await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.locator('.game-header strong')).toHaveText('Workshop');
 const restored=await saved(page);expect(restored.payload.historyUncertain).toBe(true);expect(restored.payload.caseRunId).toBe(initial.payload.caseRunId);
 expect(await page.locator('html').evaluate(el=>getComputedStyle(el).getPropertyValue('--text').trim())).toBe('36px');
});

test('TASK11.14 damaged current offers previous explicitly and preserves both slots',async({page})=>{
 await start(page);const initial=await saved(page);await go(page,'ST.EXIT.WK','Workshop');await saved(page);
 const previous=JSON.stringify(initial);await injectSlots(page,{current:'{synthetic damaged head',previous});await page.reload();
 await expect(page.getByRole('heading',{name:'This saved game couldn’t be opened.'})).toBeFocused();
 await expect(page.getByText('An earlier saved visit can be continued. The latest changes may be missing.')).toBeVisible();
 const before=await readSlots(page);await page.getByRole('button',{name:'Continue',exact:true}).click();await expect(page.locator('.game-header strong')).toHaveText('Stage');
 await expect(page.getByTestId('save-status')).toContainText('Progress can’t be saved');expect(await readSlots(page)).toEqual(before);
 await page.getByRole('button',{name:'Try saving again'}).click();await expect(page.getByRole('button',{name:'Keep this visit unsaved'})).toBeFocused();
 await page.getByRole('button',{name:'Replace saved game',exact:true}).click();await saved(page);
 expect((await readSlots(page)).previous).toBe(previous);
});

test('TASK11.14 second visit wins CAS, older visit remains playable and replacement rechecks head',async({page,context})=>{
 await start(page);await saved(page);const second=await context.newPage();await second.goto('/');await second.getByRole('button',{name:'Continue',exact:true}).click();await saved(second);
 await go(page,'ST.EXIT.WK','Workshop');await expect(page.getByTestId('save-status')).toContainText('Progress can’t be saved');
 expect(JSON.parse((await readSlots(page)).current as string).payload.physical.room).toBe('SC.ST');
 await page.getByRole('button',{name:'Try saving again'}).click();await second.getByRole('button',{name:'Goal',exact:true}).click();await second.getByRole('button',{name:'Choose a question to follow.',exact:true}).click();
 await second.getByRole('button',{name:'Where should I check?',exact:true}).click();await saved(second);
 await page.getByRole('button',{name:'Replace saved game',exact:true}).click();await expect(page.getByTestId('save-status')).toContainText('Progress can’t be saved');
 expect(JSON.parse((await readSlots(page)).current as string).payload.selectedLead).toBe('where-loop');await second.close();
});
