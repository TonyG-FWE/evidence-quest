import {test,expect} from '@playwright/test';
import {start,saved} from './helpers.js';
test('TASK11.15 authored help records the visible response and exact submission without network analysis',async({page})=>{
 let calls=0;page.on('request',r=>{if(r.url().includes('/api/coach'))calls++;});await start(page);await page.getByRole('button',{name:'Help',exact:true}).click();
 await page.getByRole('button',{name:'Your story plan',exact:true}).click();await page.getByRole('textbox').fill('It goes there.');await page.getByRole('button',{name:'Help me think',exact:true}).click();
 await expect(page.getByText('Prepared hint',{exact:true})).toBeVisible();await page.locator('.help-response').scrollIntoViewIfNeeded();let state=await saved(page);
 expect(state.payload.records.at(-1)?.text).toBe('It goes there.');expect(state.payload.records.at(-1)?.kind).toBe('coaching-submission');expect(state.payload.coachingHistory).toHaveLength(1);expect(state.payload.coachingHistory[0]?.selection).toBeNull();expect(state.payload.grants).toEqual([]);expect(calls).toBe(0);
 await page.getByRole('button',{name:'Ask again',exact:true}).click();await page.getByRole('button',{name:'Show me a way',exact:true}).click();await page.locator('.help-response').scrollIntoViewIfNeeded();state=await saved(page);
 expect(state.payload.coachingHistory.at(-1)?.contentIds).toContain('CT.DIRECT.RAIL');expect(state.payload.physical.order).toEqual([]);expect(state.payload.exposures).toEqual([]);expect(calls).toBe(0);
 await page.screenshot({path:'output/playwright/authored-direct-help.png',fullPage:true});
});
test('TASK11.15 excess Unicode draft is retained across reload and never submitted',async({page})=>{
 await start(page);await page.getByRole('button',{name:'Help',exact:true}).click();const text='🌱'.repeat(601);await page.getByRole('textbox').fill(text);await expect(page.getByRole('button',{name:'Help me think',exact:true})).toBeDisabled();await saved(page);await page.reload();await page.getByRole('button',{name:'Continue',exact:true}).click();await page.getByRole('button',{name:'Help',exact:true}).click();await expect(page.getByRole('textbox')).toHaveValue(text);expect((await saved(page)).payload.records).toEqual([]);
});
