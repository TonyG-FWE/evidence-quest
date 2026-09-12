# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: reasoning.spec.ts >> TASK11.17 Help receives only an explicitly requested private text snapshot and never delivers it to a character
- Location: browser-tests\reasoning.spec.ts:49:1

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator: getByRole('textbox')
Expected: "I want to find out what happened."
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByRole('textbox')

```

```yaml
- banner:
  - link "Evidence Quest":
    - /url: "#"
  - strong: Stage
  - button "Menu"
- application "Stage. YOU"
- button "Go to Courtyard": ← Courtyard
- button "Go to Workshop": → Workshop
- text: "SparkFest — stories and inventions made by us Today's show: The Little Bridge Jo story writer"
- button "Our story so far Find Loop so our crew can put on The Little Bridge."
- status:
  - paragraph: You're running the show with our crew. Find Loop so we can put on The Little Bridge.
- navigation "Room tools":
  - button "Move to…"
  - button "Map"
  - button "Notes"
  - button "Goal"
  - button "Help"
- button "Read with the crew"
- paragraph: Our crew's performance space.
- complementary:
  - paragraph: Try the paper model’s pull tab.
  - button "Dismiss"
- complementary:
  - paragraph: Saved on this device.
- paragraph: Click or tap the floor to walk. Choose an object to walk over and use it. You can also use Move to….
- button "Dismiss"
- region "Task controls":
  - button "Return to room"
  - heading "Help" [level=2]
  - group: What you asked
  - paragraph: Prepared hint
  - paragraph: What could help you decide where to look? You can inspect something nearby or ask the crew.
  - button "Ask again"
  - button "Return to festival"
```

# Test source

```ts
  1  | import {test,expect,type Page} from '@playwright/test';
  2  | import {copy} from '../src/core/content.js';
  3  | import {exposed} from '../src/core/evidence.js';
  4  | import {validCase} from '../src/save/validate.js';
  5  | import {start,saved,target,settled,closePanel,go} from './helpers.js';
  6  | const button=(page:Page,id:string)=>page.getByRole('button',{name:copy(id),exact:true});
  7  | const tab=async(page:Page,id:string)=>{await button(page,'CT.UI.NOTES').click();await button(page,id).click();};
  8  | async function choose(page:Page,slot:'leftRef'|'rightRef',source:string,ref:string){
  9  |  await page.locator(`[data-focus-slot="compare-${slot}"]`).click();await page.getByRole('button',{name:source,exact:true}).click();await page.locator(`[data-picker-ref="${ref}"]`).click();
  10 |  const preview=page.locator('.picker-preview');await preview.scrollIntoViewIfNeeded();await expect(button(page,'CT.SOURCE.USE')).toBeEnabled();await button(page,'CT.SOURCE.USE').click();await expect(page.locator(`[data-focus-slot="compare-${slot}"]`)).toBeFocused();
  11 | }
  12 | test('TASK11.17 empty and text-only ideas retain drafts, actual revisions and private ownership across reload',async({page})=>{
  13 |  await start(page);await tab(page,'CT.NOTES.TIMELINE');await expect(page.getByText(copy('CT.TIMELINE.EMPTY'),{exact:true})).toBeVisible();await button(page,'CT.NOTES.COMPARE').click();await button(page,'CT.IDEA.SAVE').click();await expect(page.locator('[data-task]')).toContainText('Nothing to save yet');
  14 |  await page.getByRole('textbox',{name:'My idea',exact:true}).fill('I want to look at the notice.');await closePanel(page);await saved(page);await page.reload();await button(page,'CT.START.CONTINUE').click();await tab(page,'CT.NOTES.COMPARE');await expect(page.getByRole('textbox')).toHaveValue('I want to look at the notice.');await button(page,'CT.IDEA.SAVE').click();
  15 |  let c=(await saved(page)).payload;const first=c.records.at(-1)!;expect(first.recipient).toBeNull();expect(first.previousRecordId).toBeNull();expect(c.npcReceived).toEqual([]);
  16 |  await button(page,'CT.IDEA.EDIT').click();await page.getByRole('textbox').fill('I want to ask what the notice means.');await button(page,'CT.IDEA.SAVE').click();await page.getByText('Earlier idea',{exact:true}).click();await expect(page.locator('details blockquote')).toHaveText(first.text);c=(await saved(page)).payload;expect(c.records.at(-1)!.previousRecordId).toBe(first.id);expect(validCase(c)).toBe(true);
  17 |  await page.screenshot({path:'evidence/er13/task17-private-revision.png',fullPage:true});
  18 | });
  19 | test('TASK11.17 explicit passage replacement, source groups, cancellation and same-source comparison preserve facts',async({page})=>{
  20 |  test.setTimeout(120000);await start(page);await target(page,'ST.SOURCE.E4');await settled(page);await tab(page,'CT.NOTES.COMPARE');
  21 |  await choose(page,'leftRef',copy('CT.TITLE.E4'),'E4.a');let c=(await saved(page)).payload;expect(c.comparisons.find(r=>r.recordedSeq===null)?.leftRef).toBe('E4.a');
  22 |  await page.locator('[data-focus-slot="compare-leftRef"]').click();await button(page,'CT.UI.CANCEL').click();await expect(page.locator('[data-focus-slot="compare-leftRef"]')).toBeFocused();expect((await saved(page)).payload.comparisons.find(r=>r.recordedSeq===null)?.leftRef).toBe('E4.a');
  23 |  await choose(page,'rightRef',copy('CT.TITLE.E4'),'E4.b');await button(page,'CT.COMPARE.CONFLICTS').click();await button(page,'CT.IDEA.SAVE').click();c=(await saved(page)).payload;expect(c.records.at(-1)?.refs).toEqual(['E4.a','E4.b']);expect(c.npcReceived).toEqual([]);expect(c.certificate).toBeNull();
  24 |  await target(page,'ST.ACCESS.E2');await settled(page);await button(page,'CT.MEDIA.PHOTO').click();await page.locator('[data-content-id="CT.SRC.E2.B"]').scrollIntoViewIfNeeded();await tab(page,'CT.NOTES.COMPARE');await choose(page,'leftRef',copy('CT.MEDIA.PHOTO'),'E2.b');
  25 |  await button(page,'CT.PRESENT.OPEN').click();await expect(page.getByRole('heading',{name:'Photo',exact:true})).toBeVisible();await expect(page.getByRole('heading',{name:copy('CT.TITLE.E4'),exact:true})).toBeVisible();expect((await saved(page)).payload.npcReceived).toEqual([]);await page.screenshot({path:'evidence/er13/task17-source-groups.png',fullPage:true});
  26 | });
  27 | test('TASK11.17 metadata chronology and lead selection do not turn a plan into completion or move before Go',async({page})=>{
  28 |  test.setTimeout(120000);await start(page);await target(page,'ST.SOURCE.E4');await settled(page);await page.locator('[data-metadata-ref="E4.a"]').scrollIntoViewIfNeeded();await tab(page,'CT.NOTES.TIMELINE');await expect(page.locator('[data-timeline-row="E4"]')).toContainText('9:05 · Request or plan');await expect(page.locator('[data-task]')).not.toContainText('Completed recording');
  29 |  await page.locator('[data-timeline-row="E4"] button').click();await closePanel(page);await expect(page.locator('[data-focus-slot="timeline-E4"]')).toBeFocused();await button(page,'CT.TIMELINE.DISCOVERY').click();
  30 |  await button(page,'CT.UI.MAP').click();await page.locator('[data-content-id="CT.NAV.MEDIA"]').scrollIntoViewIfNeeded();await saved(page);await button(page,'CT.UI.GOAL').click();await button(page,'CT.LEAD.CHOOSE').click();await button(page,'CT.LEAD.WHERE').click();await page.getByRole('button',{name:'Media room',exact:true}).click();let c=(await saved(page)).payload;expect(c.selectedLead).toBeNull();await button(page,'CT.LEAD.FOLLOW').click();c=(await saved(page)).payload;expect(c.selectedLead).toBe('where-loop');expect(c.physical.room).toBe('SC.ST');await expect(page.getByRole('button',{name:'Stop walking',exact:true})).toHaveCount(0);
  31 |  await button(page,'CT.UI.GOAL').click();await page.getByRole('button',{name:'Go to Media room',exact:true}).click();await expect(page.locator('.game-header strong')).toHaveText('Media room');await settled(page);expect((await saved(page)).payload.physical.room).toBe('SC.MD');expect(await page.evaluate(()=>window.scrollY)).toBe(0);await page.screenshot({path:'evidence/er13/task17-lead-arrival.png',fullPage:false});
  32 | });
  33 | test('ER13 closing a source and vocabulary before traveling restores the world, not a stale source reader',async({page})=>{
  34 |  test.setTimeout(120000);await page.setViewportSize({width:1422,height:800});await start(page);await go(page,'ST.EXIT.CY','Courtyard');await target(page,'CY.SOURCE.E3');await settled(page);await button(page,'CT.OBJ.NOTICE_FLATTEN').click();await settled(page);await page.locator('[data-word=STILL]').click();await page.getByRole('button',{name:'Return to the passage',exact:true}).click();await closePanel(page);await go(page,'CY.EXIT.WK','Workshop');
  35 |  expect(await page.evaluate(()=>window.scrollY)).toBe(0);expect((await saved(page)).payload.readerResume).toBeNull();await page.reload();await button(page,'CT.START.CONTINUE').click();await expect(page.locator('.reader')).toHaveCount(0);await expect(page.locator('.game-header strong')).toHaveText('Workshop');expect(await page.evaluate(()=>window.scrollY)).toBe(0);
  36 | });
  37 | test('FIX11.TOOLS E4 and public venue comparison, all relations, acquired post and capture, optional theory and lead',async({page})=>{
  38 |  test.setTimeout(150000);await start(page);
  39 |  for(const id of ['CT.NOTES.COMPARE','CT.NOTES.TIMELINE','CT.NOTES.IDEAS']){await tab(page,id);await closePanel(page);}expect((await saved(page)).payload.exposures).toEqual([]);
  40 |  await target(page,'ST.SOURCE.E4');await settled(page);await page.locator('[data-metadata-ref="E4.a"]').scrollIntoViewIfNeeded();await tab(page,'CT.NOTES.COMPARE');await choose(page,'leftRef',copy('CT.TITLE.E4'),'E4.a');
  41 |  await page.locator('[data-focus-slot="compare-rightRef"]').click();await button(page,'CT.SOURCE.OPEN_VENUE').click();await page.locator('[data-content-id="CT.NAV.MEDIA"]').scrollIntoViewIfNeeded();await saved(page);await closePanel(page);await page.getByRole('button',{name:'Venue information',exact:true}).click();await page.locator('[data-picker-ref="NAV.MEDIA"]').click();await button(page,'CT.SOURCE.USE').click();
  42 |  let c=(await saved(page)).payload;expect(c.comparisons.find(row=>row.recordedSeq===null)?.rightRef).toBe('NAV.MEDIA');expect(exposed(c,'NAV.MEDIA')).toBe(true);
  43 |  for(const id of ['CT.COMPARE.SUPPORTS','CT.COMPARE.CONFLICTS','CT.COMPARE.BEFORE'])await button(page,id).click();await button(page,'CT.COMPARE.CLEAR_RELATION').click();await choose(page,'leftRef',copy('CT.TITLE.E4'),'E4.b');
  44 |  await page.getByRole('textbox').fill('I want to compare the plan with the recording.');await button(page,'CT.IDEA.SAVE').click();await button(page,'CT.IDEA.EDIT').click();await page.getByRole('textbox').fill('I will check what was actually recorded.');await button(page,'CT.IDEA.SAVE').click();expect((await saved(page)).payload.npcReceived).toEqual([]);
  45 |  await target(page,'ST.ACCESS.E2');await settled(page);await button(page,'CT.MEDIA.MESSAGE').click();await page.locator('[data-metadata-ref="E2.c"]').scrollIntoViewIfNeeded();await saved(page);await button(page,'CT.UI.MAP').click();await page.getByRole('button',{name:'Go to Media room',exact:true}).click();await expect(page.locator('.game-header strong')).toHaveText('Media room');await target(page,'MD.SOURCE.E5');await settled(page);await page.locator('[data-metadata-ref="E5.a"]').scrollIntoViewIfNeeded();
  46 |  await tab(page,'CT.NOTES.TIMELINE');await expect(page.locator('[data-timeline-row="E4"]')).toContainText('9:05 · Request or plan');await expect(page.locator('[data-timeline-row="E2.post"]')).toContainText('9:13 · Remy’s posted interpretation');await expect(page.locator('[data-timeline-row="E5.a"]')).toContainText('9:18 · Completed recording');
  47 |  await page.screenshot({path:'evidence/er13/task17-known-times.png',fullPage:true});c=(await saved(page)).payload;expect(validCase(c)).toBe(true);expect(c.premiere).toBeNull();expect(c.certificate).toBeNull();
  48 | });
  49 | test('TASK11.17 Help receives only an explicitly requested private text snapshot and never delivers it to a character',async({page})=>{
  50 |  await start(page);await tab(page,'CT.NOTES.IDEAS');await page.getByRole('textbox').fill('I want to find out what happened.');let c=(await saved(page)).payload;expect(c.coachingHistory).toEqual([]);expect(c.records).toEqual([]);await button(page,'CT.HELP.THINK').click();
> 51 |  await expect(page.getByRole('textbox')).toHaveValue('I want to find out what happened.');c=(await saved(page)).payload;expect(c.records.find(row=>row.kind==='coaching-submission')?.text).toBe('I want to find out what happened.');expect(c.npcReceived).toEqual([]);expect(c.drafts.find(row=>row.id==='private')?.text).toBe('I want to find out what happened.');expect(c.records.some(row=>row.kind==='private-idea')).toBe(false);await closePanel(page);await tab(page,'CT.NOTES.IDEAS');await expect(page.getByRole('textbox')).toHaveValue('I want to find out what happened.');
     |                                          ^ Error: expect(locator).toHaveValue(expected) failed
  52 | });
  53 | test.describe('compact tools',()=>{
  54 |  test.use({hasTouch:true});
  55 |  test('TASK11.17 compact keyboard and touch keep private drafts optional and both comparison slots reachable',async({page})=>{
  56 |   await page.setViewportSize({width:390,height:844});await start(page);await tab(page,'CT.NOTES.COMPARE');await page.getByRole('textbox').fill('My own small idea.');await page.keyboard.press('Escape');await tab(page,'CT.NOTES.COMPARE');await expect(page.getByRole('textbox')).toHaveValue('My own small idea.');
  57 |   await page.locator('[data-focus-slot="compare-rightRef"]').tap();await button(page,'CT.UI.CANCEL').tap();await expect(page.locator('[data-focus-slot="compare-rightRef"]')).toBeFocused();await page.keyboard.press('Enter');await expect(button(page,'CT.SOURCE.USE')).toBeDisabled();await page.keyboard.press('Escape');await expect(page.locator('[data-focus-slot="compare-rightRef"]')).toBeFocused();
  58 |   await button(page,'CT.IDEA.SAVE').tap();expect((await saved(page)).payload.npcReceived).toEqual([]);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:'evidence/er13/task17-compact.png',fullPage:true});
  59 |  });
  60 | });
  61 | 
```