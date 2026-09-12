# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: access.spec.ts >> TASK11.07 compact Largest Roomier native navigation and typing retain world position
- Location: browser-tests\access.spec.ts:12:1

# Error details

```
Error: expect(locator).toBeFocused() failed

Locator:  getByRole('button', { name: 'Menu', exact: true })
Expected: focused
Received: inactive
Timeout:  15000ms

Call log:
  - Expect "toBeFocused" with timeout 15000ms
  - waiting for getByRole('button', { name: 'Menu', exact: true })
    33 × locator resolved to <button type="button">…</button>
       - unexpected value "inactive"

```

```yaml
- button "Menu"
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test';
  2  | import {start,target,settled,saved,go} from './helpers.js';
  3  | test('TASK11.08 first recording frame and photo stay separate; canceled notice remains curled',async({page})=>{
  4  |  await start(page);await target(page,'ST.ACCESS.E2');await settled(page);
  5  |  await page.locator('[data-content-id="CT.MEDIA.FRAME1"]').scrollIntoViewIfNeeded();
  6  |  const first=await saved(page);expect(first.payload.exposures.some(e=>e.refId==='E2.a/frame1')).toBe(true);expect(first.payload.exposures.some(e=>['E2.a/frame2','E2.a/frame3','E2.a/end','E3.a','E3.b'].includes(e.refId))).toBe(false);
  7  |  await page.getByRole('button',{name:'Photo',exact:true}).click();await page.locator('[data-content-id="CT.SRC.E2.B"]').scrollIntoViewIfNeeded();const photo=await saved(page);expect(photo.payload.grants.some(g=>g.sourceId==='E3')).toBe(false);
  8  |  await go(page,'ST.EXIT.CY','Courtyard');await target(page,'CY.SOURCE.E3');await settled(page);
  9  |  await page.getByRole('button',{name:'Flatten and secure notice',exact:true}).click();await page.waitForTimeout(400);await page.getByRole('button',{name:'Stop walking',exact:true}).click();
  10 |  const canceled=await saved(page);expect(canceled.payload.physical.objects.noticeFlat).toBe(false);expect(canceled.payload.grants.some(g=>g.refs.includes('E3.a')||g.refs.includes('E3.b'))).toBe(false);
  11 | });
  12 | test('TASK11.07 compact Largest Roomier native navigation and typing retain world position',async({page})=>{
  13 |  await page.setViewportSize({width:320,height:568});await start(page);await page.getByRole('button',{name:'Menu',exact:true}).click();await page.getByRole('button',{name:'Settings',exact:true}).click();
  14 |  await page.getByLabel('Text size',{exact:true}).selectOption('largest');await page.getByLabel('Text spacing',{exact:true}).selectOption('roomier');await page.getByLabel('Motion',{exact:true}).selectOption('reduced');await page.getByLabel('Sound',{exact:true}).selectOption('off');
> 15 |  await page.keyboard.press('Escape');await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Menu',exact:true})).toBeFocused();
     |                                                                                                                                          ^ Error: expect(locator).toBeFocused() failed
  16 |  await go(page,'ST.EXIT.WK','Workshop');await page.getByRole('button',{name:'Goal',exact:true}).click();await page.getByRole('button',{name:'Your search plan',exact:true}).click();
  17 |  const before=(await saved(page)).payload.physical.avatar;await page.getByRole('textbox').fill('wasd is my own wording.');await page.keyboard.press('ArrowLeft');const after=await saved(page);expect(after.payload.physical.avatar).toEqual(before);expect(after.payload.drafts.find(d=>d.id==='search-plan')?.text).toBe('wasd is my own wording.');
  18 |  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:'output/playwright/compact-largest-plan.png',fullPage:true});
  19 | });
  20 | test('TASK11.07 injected Canvas failure keeps named controls usable',async({page})=>{
  21 |  await page.addInitScript(()=>{HTMLCanvasElement.prototype.getContext=(()=>null) as typeof HTMLCanvasElement.prototype.getContext;});await start(page);
  22 |  await expect(page.getByText('This browser couldn’t draw the scene. You can use the room’s named controls and descriptions.')).toBeVisible();
  23 |  await go(page,'ST.EXIT.WK','Workshop');await go(page,'WK.EXIT.MD','Media room');await target(page,'MD.ACCESS.E8');await settled(page);await expect(page.getByRole('button',{name:'Collect story tiles',exact:true})).toBeVisible();
  24 | });
  25 | 
```