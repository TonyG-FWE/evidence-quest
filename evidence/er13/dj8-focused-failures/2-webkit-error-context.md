# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: resilience.spec.ts >> FIX11.ART_FAILURE missing artwork can retry; failed application chunk has native retry
- Location: browser-tests\resilience.spec.ts:12:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button', { name: 'Continue', exact: true })
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByRole('button', { name: 'Continue', exact: true })

```

```yaml
- main:
  - heading "The festival couldn’t be opened. Try loading it again." [level=1]
  - button "Retry"
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test';
  2  | import {copy} from '../src/core/content.js';
  3  | import {workstation,putTile,saved,start,readSlots} from './helpers.js';
  4  | import production from '../content/production-assets.json' with {type:'json'};
  5  | import {writeFile} from 'node:fs/promises';
  6  | test('FIX11.SAVE_INTERRUPTED actual Chromium renderer crash retains acknowledged active cue and uncertainty',async({page,context,browserName})=>{
  7  |  test.skip(browserName!=='chromium','CDP renderer crash is Chromium-only; normal restoration is checked in every engine.');
  8  |  await workstation(page);await putTile(page,'BRIDGE');await putTile(page,'PLANT','Joined Boats');await putTile(page,'BLOOM','Hill');await page.getByRole('button',{name:'Try this ending',exact:true}).click();const active=await saved(page);expect(active.payload.playback?.activeCue?.tile).toBe('TILE.BRIDGE');expect(active.payload.playback?.nextCue).toBe(0);
  9  |  const client=await context.newCDPSession(page),crashed=page.waitForEvent('crash');void client.send('Page.crash').catch(()=>{});await crashed;
  10 |  const next=await context.newPage();await next.goto('/');await next.getByRole('button',{name:'Continue',exact:true}).click();const recovered=await saved(next);expect(recovered.payload.playback?.nextCue).toBe(0);expect(recovered.payload.playback?.activeCue).toBeNull();expect(recovered.payload.playback?.status).toBe('paused');expect(recovered.payload.historyUncertain).toBe(true);expect(recovered.payload.observations.some(o=>o.kind==='possible-outcome'&&o.uncertain)).toBe(true);expect(recovered.payload.certificate).toBeNull();await next.screenshot({path:'output/playwright/actual-crash-recovery.png',fullPage:true});await next.close();
  11 | });
  12 | test('FIX11.ART_FAILURE missing artwork can retry; failed application chunk has native retry',async({page},info)=>{
  13 |  const urls=Object.values(production['ASSET.ENV.ST.BACKPLATE/base'].levels).flatMap(level=>level.frames.flatMap(frame=>[frame.url,frame.fallbackUrl]));
  14 |  let failed=true;await page.route('**/art/runtime/*',async route=>{if(failed&&urls.includes(new URL(route.request().url()).pathname))await route.abort();else await route.continue();});await start(page);await expect(page.getByText(copy('CT.TECH.ART_ERROR'))).toBeVisible();failed=false;await page.getByRole('button',{name:copy('CT.RECOVERY.RETRY'),exact:true}).click();await expect(page.getByText(copy('CT.TECH.ART_ERROR'))).toHaveCount(0);
  15 |  // Use a fresh document in the same saved origin. WebKit can reuse the already
  16 |  // evaluated module on reload, so a later route would not inject this failure.
> 17 |  const failedPage=await page.context().newPage();const denied:string[]=[],failures:{url:string;error:string|null}[]=[];failedPage.on('requestfailed',request=>failures.push({url:request.url(),error:request.failure()?.errorText??null}));await failedPage.route('**/assets/App-*.js',route=>{denied.push(route.request().url());return route.abort();});await failedPage.goto('/');await expect(failedPage.getByRole('heading',{name:copy('CT.TECH.CONTENT_ERROR'),exact:true})).toBeVisible();expect(denied.length).toBeGreaterThan(0);await failedPage.unroute('**/assets/App-*.js');await failedPage.getByRole('button',{name:copy('CT.RECOVERY.RETRY'),exact:true}).click();await expect(failedPage.getByRole('button',{name:'Continue',exact:true})).toBeVisible();await writeFile(`evidence/er13/cold-chunk-retry-${info.project.name}.json`,JSON.stringify({denied,failures,headingObserved:copy('CT.TECH.CONTENT_ERROR'),retryResult:'Continue visible on same saved origin'},null,2)+'\n');await failedPage.close();
     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             ^ Error: expect(locator).toBeVisible() failed
  18 | });
  19 | test('FIX11.SAVE_FAILURE preference transaction failure never mislabels a successful case save',async({page})=>{
  20 |  await start(page);const before=await saved(page);await page.evaluate(()=>{const put=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(...args){if(this.name==='preferences')throw new DOMException('Synthetic preferences fault','QuotaExceededError');return put.apply(this,args);};});
  21 |  await page.getByRole('button',{name:'Menu',exact:true}).click();await page.getByRole('button',{name:'Settings',exact:true}).click();await page.getByLabel('Sound',{exact:true}).selectOption('off');await expect(page.getByText(copy('CT.SETTINGS.UNSAVED'),{exact:true})).toBeVisible();expect((await saved(page)).payload.caseRunId).toBe(before.payload.caseRunId);expect((await readSlots(page)).preferences).toBeUndefined();
  22 | });
  23 | 
```