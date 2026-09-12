# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: resilience.spec.ts >> FIX11.ART_FAILURE missing artwork can retry; failed application chunk has native retry
- Location: browser-tests\resilience.spec.ts:11:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'The festival couldn’t be opened. Try loading it again.', exact: true })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('heading', { name: 'The festival couldn’t be opened. Try loading it again.', exact: true })

```

```yaml
- img "Our SparkFest story crew and paper characters":
  - text: Made by our crew
  - strong: The Little Bridge
- main:
  - paragraph: SPARKFEST
  - heading "Evidence Quest" [level=1]
  - heading "Our story needs an ending." [level=2]
  - paragraph: Join your friends at SparkFest. Find Loop, bring your paper story to life, and put on The Little Bridge.
  - button "Continue"
  - button "Settings"
  - button "Start over"
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test';
  2  | import {copy} from '../src/core/content.js';
  3  | import {workstation,putTile,saved,start,readSlots} from './helpers.js';
  4  | import production from '../content/production-assets.json' with {type:'json'};
  5  | test('FIX11.SAVE_INTERRUPTED actual Chromium renderer crash retains acknowledged active cue and uncertainty',async({page,context,browserName})=>{
  6  |  test.skip(browserName!=='chromium','CDP renderer crash is Chromium-only; normal restoration is checked in every engine.');
  7  |  await workstation(page);await putTile(page,'BRIDGE');await putTile(page,'PLANT','Joined Boats');await putTile(page,'BLOOM','Hill');await page.getByRole('button',{name:'Try this ending',exact:true}).click();const active=await saved(page);expect(active.payload.playback?.activeCue?.tile).toBe('TILE.BRIDGE');expect(active.payload.playback?.nextCue).toBe(0);
  8  |  const client=await context.newCDPSession(page),crashed=page.waitForEvent('crash');void client.send('Page.crash').catch(()=>{});await crashed;
  9  |  const next=await context.newPage();await next.goto('/');await next.getByRole('button',{name:'Continue',exact:true}).click();const recovered=await saved(next);expect(recovered.payload.playback?.nextCue).toBe(0);expect(recovered.payload.playback?.activeCue).toBeNull();expect(recovered.payload.playback?.status).toBe('paused');expect(recovered.payload.historyUncertain).toBe(true);expect(recovered.payload.observations.some(o=>o.kind==='possible-outcome'&&o.uncertain)).toBe(true);expect(recovered.payload.certificate).toBeNull();await next.screenshot({path:'output/playwright/actual-crash-recovery.png',fullPage:true});await next.close();
  10 | });
  11 | test('FIX11.ART_FAILURE missing artwork can retry; failed application chunk has native retry',async({page})=>{
  12 |  const urls=Object.values(production['ASSET.ENV.ST.BACKPLATE/base'].levels).flatMap(level=>level.frames.flatMap(frame=>[frame.url,frame.fallbackUrl]));
  13 |  let failed=true;await page.route('**/art/runtime/*',async route=>{if(failed&&urls.includes(new URL(route.request().url()).pathname))await route.abort();else await route.continue();});await start(page);await expect(page.getByText(copy('CT.TECH.ART_ERROR'))).toBeVisible();failed=false;await page.getByRole('button',{name:copy('CT.RECOVERY.RETRY'),exact:true}).click();await expect(page.getByText(copy('CT.TECH.ART_ERROR'))).toHaveCount(0);
> 14 |  await page.route('**/assets/App-*.js',route=>route.abort());await page.reload();await expect(page.getByRole('heading',{name:copy('CT.TECH.CONTENT_ERROR'),exact:true})).toBeVisible();await page.unroute('**/assets/App-*.js');await page.getByRole('button',{name:copy('CT.RECOVERY.RETRY'),exact:true}).click();await expect(page.getByRole('button',{name:'Continue',exact:true})).toBeVisible();
     |                                                                                                                                                                          ^ Error: expect(locator).toBeVisible() failed
  15 | });
  16 | test('FIX11.SAVE_FAILURE preference transaction failure never mislabels a successful case save',async({page})=>{
  17 |  await start(page);const before=await saved(page);await page.evaluate(()=>{const put=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(...args){if(this.name==='preferences')throw new DOMException('Synthetic preferences fault','QuotaExceededError');return put.apply(this,args);};});
  18 |  await page.getByRole('button',{name:'Menu',exact:true}).click();await page.getByRole('button',{name:'Settings',exact:true}).click();await page.getByLabel('Sound',{exact:true}).selectOption('off');await expect(page.getByText(copy('CT.SETTINGS.UNSAVED'),{exact:true})).toBeVisible();expect((await saved(page)).payload.caseRunId).toBe(before.payload.caseRunId);expect((await readSlots(page)).preferences).toBeUndefined();
  19 | });
  20 | 
```