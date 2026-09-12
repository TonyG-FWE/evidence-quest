# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: watch-position.spec.ts >> ER13 Watch start, unmet and completion keep the full consequence visible without moving keyboard focus
- Location: browser-tests\watch-position.spec.ts:8:1

# Error details

```
Error: expect(locator).toBeFocused() failed

Locator:  getByRole('button', { name: 'Try this ending', exact: true })
Expected: focused
Received: inactive
Timeout:  15000ms

Call log:
  - Expect "toBeFocused" with timeout 15000ms
  - waiting for getByRole('button', { name: 'Try this ending', exact: true })
    33 × locator resolved to <button type="button" class="primary">…</button>
       - unexpected value "inactive"

```

```yaml
- button "Try this ending"
```

# Test source

```ts
  1  | import {test,expect,type Page} from '@playwright/test';
  2  | import {workstation,putTile,saved} from './helpers.js';
  3  | 
  4  | async function visibleConsequence(page:Page){
  5  |  const image=await page.getByTestId('whole-story').boundingBox(),caption=await page.locator('.narrated-show .caption').boundingBox(),panel=await page.locator('[data-task]').boundingBox();
  6  |  expect(image!.y).toBeGreaterThanOrEqual(Math.max(0,panel!.y)-1);expect(image!.y+image!.height).toBeLessThanOrEqual(790);expect(caption!.y+caption!.height).toBeLessThanOrEqual(790);
  7  | }
  8  | test('ER13 Watch start, unmet and completion keep the full consequence visible without moving keyboard focus',async({page})=>{
  9  |  test.setTimeout(90000);await page.setViewportSize({width:1405,height:790});await workstation(page);
  10 |  await putTile(page,'FERRY');await putTile(page,'PLANT','One Boat');await putTile(page,'BLOOM','Hill');await page.getByRole('button',{name:'Try this ending',exact:true}).click();
  11 |  await expect.poll(async()=>(await saved(page)).payload.playback?.pauseReason).toBe('unmet');await visibleConsequence(page);
  12 |  await page.getByRole('button',{name:'Arrange tiles',exact:true}).click();await page.locator('[data-tile="TILE.BRIDGE"]').click();await page.getByRole('button',{name:'Insert after One Boat',exact:true}).click();await page.getByRole('button',{name:'Try this ending',exact:true}).click();
> 13 |  await expect(page.getByRole('button',{name:'Start premiere',exact:true})).toBeVisible();await visibleConsequence(page);await expect(page.getByRole('button',{name:'Try this ending',exact:true})).toBeFocused();
     |                                                                                                                                                                                                    ^ Error: expect(locator).toBeFocused() failed
  14 |  await expect(page.locator('.narrated-show .caption')).toContainText('Your ending works.');await page.screenshot({path:'evidence/er13/watch-completion-position.png',fullPage:false});
  15 |  await page.getByRole('button',{name:'Your story plan',exact:true}).click();await page.getByRole('textbox').fill('I can describe the ending.');await expect(page.getByRole('textbox')).toBeFocused();await expect(page.getByRole('textbox')).toHaveValue('I can describe the ending.');
  16 | });
  17 | 
```