# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: acceptance-boundaries.spec.ts >> FIX11.ACCESS/UNMET 640x360 whole unmet story, note inspection and native revision
- Location: browser-tests\acceptance-boundaries.spec.ts:6:67

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 15000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - link "Evidence Quest" [ref=e5] [cursor=pointer]:
      - /url: "#"
    - strong [ref=e6]: Stage
    - button "Menu" [ref=e7] [cursor=pointer]:
      - generic [ref=e8]: Menu
  - generic [ref=e9]:
    - generic [ref=e10]:
      - button "Our story so far The screen works and the story tiles are ready. Now help Pip keep the promise in Jo's story." [ref=e12] [cursor=pointer]:
        - generic [ref=e13]:
          - generic [ref=e14]: Our story so far
          - text: The screen works and the story tiles are ready. Now help Pip keep the promise in Jo's story.
      - generic [ref=e15]:
        - generic [ref=e16]:
          - application "Stage. YOU" [ref=e17]
          - 'img "SparkFest — stories and inventions made by us. Today''s show: The Little Bridge"':
            - generic:
              - text: SparkFest
              - generic: "Today's show:"
              - text: The Little Bridge
        - generic [ref=e19]:
          - strong [ref=e20]: Jo
          - text: · story writer
        - generic [ref=e21]:
          - button "Go to Courtyard" [ref=e22] [cursor=pointer]: ← Courtyard
          - button "Go to Workshop" [ref=e23] [cursor=pointer]: → Workshop
      - generic [ref=e24]:
        - navigation "Room tools" [ref=e25]:
          - button "Move to…" [ref=e26] [cursor=pointer]:
            - img [ref=e27]
            - generic [ref=e29]: Move to…
          - button "Map" [ref=e30] [cursor=pointer]:
            - generic [ref=e31]: Map
          - button "Notes" [ref=e32] [cursor=pointer]:
            - img [ref=e33]
            - generic [ref=e35]: Notes
          - button "Goal" [ref=e36] [cursor=pointer]:
            - generic [ref=e37]: Goal
          - button "Help" [ref=e38] [cursor=pointer]:
            - img [ref=e39]
            - generic [ref=e41]: Help
        - button "Read with the crew" [ref=e43] [cursor=pointer]:
          - generic [ref=e44]: Read with the crew
        - paragraph [ref=e45]: Our crew's performance space.
        - complementary [ref=e46]:
          - paragraph [ref=e47]: Saved on this device.
        - paragraph [ref=e48]: Click or tap the floor to walk. Choose an object to walk over and use it. You can also use Move to….
        - button "Dismiss" [ref=e49] [cursor=pointer]:
          - generic [ref=e50]: Dismiss
    - region "Task controls" [ref=e51]:
      - button "Return to room" [ref=e53] [cursor=pointer]:
        - img [ref=e54]
        - generic [ref=e56]: Return to room
      - heading "Plan our story" [level=2] [ref=e57]
      - paragraph [ref=e58]:
        - text: In
        - button "rehearsal," [ref=e60] [cursor=pointer]
        - text: we can try an ending and change it before a show.
      - generic [ref=e61]:
        - button "Arrange tiles" [ref=e62] [cursor=pointer]:
          - generic [ref=e63]: Arrange tiles
        - button "Watch rehearsal" [active] [pressed] [ref=e64] [cursor=pointer]:
          - generic [ref=e65]: Watch rehearsal
      - generic [ref=e66]:
        - img "The river separates the starting bank on the left from Grandma’s hill on the right. The old footbridge is broken. Pip is on the left bank, wearing the backpack you made. Grandma holds the seed on the hill. The seed is on the hill with Grandma. It is still loose and dark. The little boats are separate." [ref=e67]
        - status [ref=e68]:
          - paragraph [ref=e69]: Grandma has the seed. Pip is still across the river.
      - complementary [ref=e70]:
        - text: Jo · story writer
        - paragraph [ref=e72]: Pip promised to plant with Grandma. They are still on opposite banks.
      - generic [ref=e73]:
        - paragraph [ref=e74]: Rehearsal paused.
        - paragraph [ref=e75]: "Next tile: Flower"
      - generic [ref=e76]:
        - button "Continue rehearsal" [ref=e77] [cursor=pointer]:
          - generic [ref=e78]: Continue rehearsal
        - button "Try the big screen" [ref=e79] [cursor=pointer]:
          - generic [ref=e80]: Try the big screen
        - button "Restart rehearsal" [ref=e81] [cursor=pointer]:
          - generic [ref=e82]: Restart rehearsal
        - button "Describe story now" [ref=e83] [cursor=pointer]:
          - generic [ref=e84]: Describe story now
        - button "More actions" [ref=e85] [cursor=pointer]:
          - generic [ref=e86]: More actions
        - button "Your story plan" [ref=e87] [cursor=pointer]:
          - generic [ref=e88]: Your story plan
        - button "Help" [ref=e89] [cursor=pointer]:
          - generic [ref=e90]: Help
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
  8  |  expect((await saved(page)).payload.playback?.puppet).toEqual({pip:'left',seed:'right',boats:'separate',lit:false});await page.getByRole('button',{name:'Watch rehearsal',exact:true}).click();
  9  |  // Verify the game's own Watch placement, without an automation scroll that
  10 |  // can center the image underneath a sticky dock. Include every dock row.
> 11 |  await expect.poll(async()=>{const box=(await page.getByTestId('whole-story').boundingBox())!,dock=(await page.locator('.world-dock').boundingBox())!;return box.y>=dock.y+dock.height-1&&box.y+box.height<=size.height+1;}).toBe(true);await page.screenshot({path:`output/playwright/compact-${size.width}-unmet.png`,fullPage:false});
     |                                                                                                                                                                                                                              ^ Error: expect(received).toBe(expected) // Object.is equality
  12 |  await button(page,'CT.RAIL.ARRANGE_MODE').click();for(const id of ['CT.KIT.NOTE_JO','CT.KIT.NOTE_REMY']){await button(page,id).click();await settled(page);await page.locator('.reader .source-words').first().scrollIntoViewIfNeeded();await page.locator('.task-close button').click();await expect(button(page,id)).toBeFocused();}
  13 |  await button(page,'CT.STORY.OPEN').click();await expect(page.getByTestId('whole-story')).toHaveAttribute('aria-label',/Pip/);await page.locator('.task-close button').click();await target(page,'ST.RAIL');await settled(page);await page.getByRole('button',{name:'Continue rehearsal',exact:true}).click();await expect(page.getByRole('button',{name:'Continue to finish rehearsal',exact:true})).toBeVisible();await page.getByRole('button',{name:'Continue to finish rehearsal',exact:true}).click();await putTile(page,'BRIDGE','One Boat');const state=await premiere(page);expect(state.payload.premiere?.order).toEqual(['TILE.FERRY','TILE.BRIDGE','TILE.PLANT','TILE.BLOOM']);
  14 | });
  15 | test('FIX11.NPC reading is not delivery; one scope passage differs from both cancellation passages',async({page})=>{
  16 |  await start(page);await reduced(page);await go(page,'ST.EXIT.CY','Courtyard');await target(page,'CY.SOURCE.E3');await settled(page);await button(page,'CT.OBJ.NOTICE_FLATTEN').click();await settled(page);await page.locator('[data-content-id="CT.SRC.E3"]').scrollIntoViewIfNeeded();expect((await saved(page)).payload.npcReceived).toEqual([]);await target(page,'ACT.REMY');await settled(page);await button(page,'CT.TALK.CANCELED').click();await expect(page.getByText(copy('CT.REMY.CORRECT'),{exact:true})).toHaveCount(0);
  17 |  await button(page,'CT.PRESENT.OPEN').click();await page.locator('[data-ref="E3.a"]').check();await page.getByRole('button',{name:'Show Remy',exact:true}).click();await settled(page);await expect(page.getByText(copy('CT.NPC.SCOPE'),{exact:true})).toBeVisible();expect((await saved(page)).payload.npcReceived[0]?.refs).toEqual(['E3.a']);
  18 |  await button(page,'CT.PRESENT.OPEN').click();await page.locator('[data-ref="E3.a"]').check();await page.locator('[data-ref="E3.b"]').check();await page.getByRole('button',{name:'Show Remy',exact:true}).click();await settled(page);await expect(page.getByText(copy('CT.REMY.CORRECT'),{exact:true})).toBeVisible();expect((await saved(page)).payload.npcReceived[0]?.deliveryRecordIds).toHaveLength(2);
  19 | });
  20 | test('FIX11.ART_FAILURE all Canvas contexts denied still supports a complete native rehearsal and premiere',async({page})=>{
  21 |  await page.addInitScript(()=>{HTMLCanvasElement.prototype.getContext=(()=>null) as typeof HTMLCanvasElement.prototype.getContext;});await workstation(page);await reduced(page);await target(page,'ST.RAIL');await settled(page);for(const [tile,after]of [['BRIDGE',undefined],['PLANT','Joined Boats'],['BLOOM','Hill']] as const)await putTile(page,tile,after);await button(page,'CT.STORY.OPEN').click();await expect(page.getByTestId('whole-story')).toHaveAttribute('aria-label',/Pip/);await page.locator('.task-close button').click();await target(page,'ST.RAIL');await settled(page);expect((await premiere(page)).payload.premiere).not.toBeNull();
  22 | });
  23 | test('FIX11.RECAP fresh voluntary revision, post-outcome text, hint-then-trial and uncertain reload stay distinct',async({page})=>{
  24 |  test.setTimeout(180000);await start(page);await reduced(page);await button(page,'CT.UI.GOAL').click();await button(page,'CT.PLAN.SEARCH').click();await page.getByRole('textbox').fill('I think the whole premiere is canceled.');await button(page,'CT.PLAN.RECORD').click();await go(page,'ST.EXIT.CY','Courtyard');await target(page,'CY.SOURCE.E3');await settled(page);await button(page,'CT.OBJ.NOTICE_FLATTEN').click();await settled(page);await page.locator('[data-content-id="CT.SRC.E3"]').scrollIntoViewIfNeeded();await button(page,'CT.UI.GOAL').click();await button(page,'CT.PLAN.SEARCH').click();await page.getByRole('textbox').fill('Only the outdoor rehearsal is canceled. I can still get our premiere ready.');await button(page,'CT.PLAN.RECORD').click();
  25 |  await go(page,'CY.EXIT.WK','Workshop');await go(page,'WK.EXIT.MD','Media room');await collectKit(page);await target(page,'ACT.LOOP');await settled(page);await stage(page);await target(page,'ST.DOCK');await settled(page);await target(page,'ST.RACK.BAY');await settled(page);for(const [tile,after]of [['BRIDGE',undefined],['PLANT','Joined Boats'],['BLOOM','Hill']] as const)await putTile(page,tile,after);await premiere(page);await button(page,'CT.ENDING.REOPEN').click();await expect(page.getByRole('heading',{name:copy('CT.RECAP.PLAN'),exact:true})).toBeVisible();await expect(page.getByRole('heading',{name:copy('CT.RECAP.CHANGED'),exact:true})).toBeVisible();
  26 |  await button(page,'CT.UI.GOAL').click();await button(page,'CT.PLAN.SEARCH').click();await page.getByRole('textbox').fill('The seed and Pip planted together.');await button(page,'CT.PLAN.RECORD').click();await button(page,'CT.UI.GOAL').click();await button(page,'CT.ENDING.REOPEN').click();await expect(page.getByRole('heading',{name:copy('CT.RECAP.AFTER_RUN'),exact:true})).toBeVisible();
  27 |  await target(page,'ST.RAIL');await settled(page);await page.locator('.task-panel').getByRole('button',{name:'Help',exact:true}).click();await button(page,'CT.HELP.DIRECT').click();await page.locator('.help-response').scrollIntoViewIfNeeded();await saved(page);await target(page,'ST.RAIL');await settled(page);await button(page,'CT.PLAN.STORY').click();await page.getByRole('textbox').fill('I will use these tiles together again.');await button(page,'CT.PLAN.RECORD').click();await target(page,'ST.RAIL');await settled(page);await button(page,'CT.WORK.REHEARSE').click();await expect(button(page,'CT.WORK.REPLAY')).toBeVisible();await button(page,'CT.UI.GOAL').click();await button(page,'CT.ENDING.REOPEN').click();await expect(page.getByRole('heading',{name:copy('CT.RECAP.HINT_THEN_PLAN'),exact:true})).toBeVisible();
  28 |  await saved(page);await page.reload();await button(page,'CT.START.CONTINUE').click();await button(page,'CT.UI.GOAL').click();await button(page,'CT.ENDING.REOPEN').click();await expect(page.getByRole('heading',{name:copy('CT.RECAP.RECORDED_IDEA'),exact:true})).toBeVisible();
  29 | });
  30 | 
```