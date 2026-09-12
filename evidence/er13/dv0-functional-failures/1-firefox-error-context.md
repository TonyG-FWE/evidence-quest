# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: acceptance-boundaries.spec.ts >> FIX11.ACCESS/UNMET 320x568 whole unmet story, note inspection and native revision
- Location: browser-tests\acceptance-boundaries.spec.ts:6:67

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 192.11666870117188
Received:    185.18333435058594
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - strong [ref=e5]: Stage
    - button "Menu" [ref=e6] [cursor=pointer]:
      - generic [ref=e7]: Menu
  - generic [ref=e8]:
    - generic [ref=e9]:
      - button "Our story so far The screen works and the story tiles are ready. Now help Pip keep the promise in Jo's story." [ref=e11] [cursor=pointer]:
        - generic [ref=e12]:
          - generic [ref=e13]: Our story so far
          - text: The screen works and the story tiles are ready. Now help Pip keep the promise in Jo's story.
      - generic [ref=e14]:
        - generic [ref=e15]:
          - application "Stage. YOU" [ref=e16]
          - 'img "SparkFest — stories and inventions made by us. Today''s show: The Little Bridge"':
            - generic:
              - text: SparkFest
              - generic: "Today's show:"
              - text: The Little Bridge
        - generic [ref=e18]:
          - strong [ref=e19]: Jo
          - text: · story writer
        - generic [ref=e20]:
          - button "Go to Courtyard" [ref=e21] [cursor=pointer]: ← Courtyard
          - button "Go to Workshop" [ref=e22] [cursor=pointer]: → Workshop
      - generic [ref=e23]:
        - navigation "Room tools" [ref=e24]:
          - button "Move to…" [ref=e25] [cursor=pointer]:
            - img [ref=e26]
            - generic [ref=e28]: Move to…
          - button "Map" [ref=e29] [cursor=pointer]:
            - generic [ref=e30]: Map
          - button "Notes" [ref=e31] [cursor=pointer]:
            - img [ref=e32]
            - generic [ref=e34]: Notes
          - button "Goal" [ref=e35] [cursor=pointer]:
            - generic [ref=e36]: Goal
          - button "Help" [ref=e37] [cursor=pointer]:
            - img [ref=e38]
            - generic [ref=e40]: Help
        - button "Read with the crew" [ref=e42] [cursor=pointer]:
          - generic [ref=e43]: Read with the crew
        - paragraph [ref=e44]: Our crew's performance space.
        - complementary [ref=e45]:
          - paragraph [ref=e46]: Saved on this device.
        - paragraph [ref=e47]: Click or tap the floor to walk. Choose an object to walk over and use it. You can also use Move to….
        - button "Dismiss" [ref=e48] [cursor=pointer]:
          - generic [ref=e49]: Dismiss
    - region "Task controls" [ref=e50]:
      - button "Return to room" [ref=e52] [cursor=pointer]:
        - img [ref=e53]
        - generic [ref=e55]: Return to room
      - heading "Plan our story" [level=2] [ref=e56]
      - paragraph [ref=e57]:
        - text: In
        - button "rehearsal," [ref=e59] [cursor=pointer]
        - text: we can try an ending and change it before a show.
      - generic [ref=e60]:
        - button "Arrange tiles" [ref=e61] [cursor=pointer]:
          - generic [ref=e62]: Arrange tiles
        - button "Watch rehearsal" [active] [pressed] [ref=e63] [cursor=pointer]:
          - generic [ref=e64]: Watch rehearsal
      - generic [ref=e65]:
        - img "The river separates the starting bank on the left from Grandma’s hill on the right. The old footbridge is broken. Pip is on the left bank, wearing the backpack you made. Grandma holds the seed on the hill. The seed is on the hill with Grandma. It is still loose and dark. The little boats are separate." [ref=e66]
        - status [ref=e67]:
          - paragraph [ref=e68]: Grandma has the seed. Pip is still across the river.
      - complementary [ref=e69]:
        - text: Jo · story writer
        - paragraph [ref=e71]: Pip promised to plant with Grandma. They are still on opposite banks.
      - generic [ref=e72]:
        - paragraph [ref=e73]: Rehearsal paused.
        - paragraph [ref=e74]: "Next tile: Flower"
      - generic [ref=e75]:
        - button "Continue rehearsal" [ref=e76] [cursor=pointer]:
          - generic [ref=e77]: Continue rehearsal
        - button "Try the big screen" [ref=e78] [cursor=pointer]:
          - generic [ref=e79]: Try the big screen
        - button "Restart rehearsal" [ref=e80] [cursor=pointer]:
          - generic [ref=e81]: Restart rehearsal
        - button "Describe story now" [ref=e82] [cursor=pointer]:
          - generic [ref=e83]: Describe story now
        - button "More actions" [ref=e84] [cursor=pointer]:
          - generic [ref=e85]: More actions
        - button "Your story plan" [ref=e86] [cursor=pointer]:
          - generic [ref=e87]: Your story plan
        - button "Help" [ref=e88] [cursor=pointer]:
          - generic [ref=e89]: Help
```

# Test source

```ts
  1  | import {test,expect,type Page} from '@playwright/test';
  2  | import {copy} from '../src/core/content.js';
  3  | import {start,target,go,settled,saved,workstation,putTile,premiere,collectKit,media,stage} from './helpers.js';
  4  | const button=(p:Page,id:string)=>p.getByRole('button',{name:copy(id),exact:true});
  5  | async function reduced(page:Page,large=false){await button(page,'CT.UI.MENU').click();await button(page,'CT.UI.SETTINGS').click();await page.getByLabel('Motion',{exact:true}).selectOption('reduced');await page.getByLabel('Sound',{exact:true}).selectOption('off');if(large){await page.getByLabel('Text size',{exact:true}).selectOption('largest');await page.getByLabel('Text spacing',{exact:true}).selectOption('roomier');}await page.keyboard.press('Escape');await page.keyboard.press('Escape');}
  6  | for(const size of [{width:320,height:568},{width:640,height:360}])test(`FIX11.ACCESS/UNMET ${size.width}x${size.height} whole unmet story, note inspection and native revision`,async({page})=>{
  7  |  await page.setViewportSize(size);await workstation(page);await reduced(page,true);await target(page,'ST.RAIL');await settled(page);for(const [tile,after]of [['FERRY',undefined],['PLANT','One Boat'],['BLOOM','Hill']] as const)await putTile(page,tile,after);await button(page,'CT.WORK.REHEARSE').click();await expect(page.getByRole('button',{name:'Continue rehearsal',exact:true})).toBeVisible();
> 8  |  expect((await saved(page)).payload.playback?.puppet).toEqual({pip:'left',seed:'right',boats:'separate',lit:false});await page.getByRole('button',{name:'Watch rehearsal',exact:true}).click();const canvas=page.getByTestId('whole-story');await canvas.scrollIntoViewIfNeeded();const box=await canvas.boundingBox(),world=await page.locator('[data-world]').boundingBox();expect(box!.y).toBeGreaterThanOrEqual(world!.y+world!.height-1);expect(box!.y+box!.height).toBeLessThanOrEqual(size.height+1);await page.screenshot({path:`output/playwright/compact-${size.width}-unmet.png`,fullPage:false});
     |                                                                                                                                                                                                                                                                                                                                                                                              ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  9  |  await button(page,'CT.RAIL.ARRANGE_MODE').click();for(const id of ['CT.KIT.NOTE_JO','CT.KIT.NOTE_REMY']){await button(page,id).click();await settled(page);await page.locator('.reader .source-words').first().scrollIntoViewIfNeeded();await page.locator('.task-close button').click();await expect(button(page,id)).toBeFocused();}
  10 |  await button(page,'CT.STORY.OPEN').click();await expect(page.getByTestId('whole-story')).toHaveAttribute('aria-label',/Pip/);await page.locator('.task-close button').click();await target(page,'ST.RAIL');await settled(page);await page.getByRole('button',{name:'Continue rehearsal',exact:true}).click();await expect(page.getByRole('button',{name:'Continue to finish rehearsal',exact:true})).toBeVisible();await page.getByRole('button',{name:'Continue to finish rehearsal',exact:true}).click();await putTile(page,'BRIDGE','One Boat');const state=await premiere(page);expect(state.payload.premiere?.order).toEqual(['TILE.FERRY','TILE.BRIDGE','TILE.PLANT','TILE.BLOOM']);
  11 | });
  12 | test('FIX11.NPC reading is not delivery; one scope passage differs from both cancellation passages',async({page})=>{
  13 |  await start(page);await reduced(page);await go(page,'ST.EXIT.CY','Courtyard');await target(page,'CY.SOURCE.E3');await settled(page);await button(page,'CT.OBJ.NOTICE_FLATTEN').click();await settled(page);await page.locator('[data-content-id="CT.SRC.E3"]').scrollIntoViewIfNeeded();expect((await saved(page)).payload.npcReceived).toEqual([]);await target(page,'ACT.REMY');await settled(page);await button(page,'CT.TALK.CANCELED').click();await expect(page.getByText(copy('CT.REMY.CORRECT'),{exact:true})).toHaveCount(0);
  14 |  await button(page,'CT.PRESENT.OPEN').click();await page.locator('[data-ref="E3.a"]').check();await page.getByRole('button',{name:'Show Remy',exact:true}).click();await settled(page);await expect(page.getByText(copy('CT.NPC.SCOPE'),{exact:true})).toBeVisible();expect((await saved(page)).payload.npcReceived[0]?.refs).toEqual(['E3.a']);
  15 |  await button(page,'CT.PRESENT.OPEN').click();await page.locator('[data-ref="E3.a"]').check();await page.locator('[data-ref="E3.b"]').check();await page.getByRole('button',{name:'Show Remy',exact:true}).click();await settled(page);await expect(page.getByText(copy('CT.REMY.CORRECT'),{exact:true})).toBeVisible();expect((await saved(page)).payload.npcReceived[0]?.deliveryRecordIds).toHaveLength(2);
  16 | });
  17 | test('FIX11.ART_FAILURE all Canvas contexts denied still supports a complete native rehearsal and premiere',async({page})=>{
  18 |  await page.addInitScript(()=>{HTMLCanvasElement.prototype.getContext=(()=>null) as typeof HTMLCanvasElement.prototype.getContext;});await workstation(page);await reduced(page);await target(page,'ST.RAIL');await settled(page);for(const [tile,after]of [['BRIDGE',undefined],['PLANT','Joined Boats'],['BLOOM','Hill']] as const)await putTile(page,tile,after);await button(page,'CT.STORY.OPEN').click();await expect(page.getByTestId('whole-story')).toHaveAttribute('aria-label',/Pip/);await page.locator('.task-close button').click();await target(page,'ST.RAIL');await settled(page);expect((await premiere(page)).payload.premiere).not.toBeNull();
  19 | });
  20 | test('FIX11.RECAP fresh voluntary revision, post-outcome text, hint-then-trial and uncertain reload stay distinct',async({page})=>{
  21 |  test.setTimeout(180000);await start(page);await reduced(page);await button(page,'CT.UI.GOAL').click();await button(page,'CT.PLAN.SEARCH').click();await page.getByRole('textbox').fill('I think the whole premiere is canceled.');await button(page,'CT.PLAN.RECORD').click();await go(page,'ST.EXIT.CY','Courtyard');await target(page,'CY.SOURCE.E3');await settled(page);await button(page,'CT.OBJ.NOTICE_FLATTEN').click();await settled(page);await page.locator('[data-content-id="CT.SRC.E3"]').scrollIntoViewIfNeeded();await button(page,'CT.UI.GOAL').click();await button(page,'CT.PLAN.SEARCH').click();await page.getByRole('textbox').fill('Only the outdoor rehearsal is canceled. I can still get our premiere ready.');await button(page,'CT.PLAN.RECORD').click();
  22 |  await go(page,'CY.EXIT.WK','Workshop');await go(page,'WK.EXIT.MD','Media room');await collectKit(page);await target(page,'ACT.LOOP');await settled(page);await stage(page);await target(page,'ST.DOCK');await settled(page);await target(page,'ST.RACK.BAY');await settled(page);for(const [tile,after]of [['BRIDGE',undefined],['PLANT','Joined Boats'],['BLOOM','Hill']] as const)await putTile(page,tile,after);await premiere(page);await button(page,'CT.ENDING.REOPEN').click();await expect(page.getByRole('heading',{name:copy('CT.RECAP.PLAN'),exact:true})).toBeVisible();await expect(page.getByRole('heading',{name:copy('CT.RECAP.CHANGED'),exact:true})).toBeVisible();
  23 |  await button(page,'CT.UI.GOAL').click();await button(page,'CT.PLAN.SEARCH').click();await page.getByRole('textbox').fill('The seed and Pip planted together.');await button(page,'CT.PLAN.RECORD').click();await button(page,'CT.UI.GOAL').click();await button(page,'CT.ENDING.REOPEN').click();await expect(page.getByRole('heading',{name:copy('CT.RECAP.AFTER_RUN'),exact:true})).toBeVisible();
  24 |  await target(page,'ST.RAIL');await settled(page);await page.locator('.task-panel').getByRole('button',{name:'Help',exact:true}).click();await button(page,'CT.HELP.DIRECT').click();await page.locator('.help-response').scrollIntoViewIfNeeded();await saved(page);await target(page,'ST.RAIL');await settled(page);await button(page,'CT.PLAN.STORY').click();await page.getByRole('textbox').fill('I will use these tiles together again.');await button(page,'CT.PLAN.RECORD').click();await target(page,'ST.RAIL');await settled(page);await button(page,'CT.WORK.REHEARSE').click();await expect(button(page,'CT.WORK.REPLAY')).toBeVisible();await button(page,'CT.UI.GOAL').click();await button(page,'CT.ENDING.REOPEN').click();await expect(page.getByRole('heading',{name:copy('CT.RECAP.HINT_THEN_PLAN'),exact:true})).toBeVisible();
  25 |  await saved(page);await page.reload();await button(page,'CT.START.CONTINUE').click();await button(page,'CT.UI.GOAL').click();await button(page,'CT.ENDING.REOPEN').click();await expect(page.getByRole('heading',{name:copy('CT.RECAP.RECORDED_IDEA'),exact:true})).toBeVisible();
  26 | });
  27 | 
```