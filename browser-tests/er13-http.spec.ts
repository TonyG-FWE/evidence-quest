import {test,expect} from '@playwright/test';
import type {CoachRequest} from '../contracts/types.js';
import {copy} from '../src/core/content.js';
import {start,saved} from './helpers.js';

// Synthetic same-origin HTTP replies exercise production client wiring.
// Provider selection quality and real paid execution are not asserted here.
test('ER13 production HTTP client sends only a requested draft and displays a validated synthetic selection',async({page})=>{
 const requests:CoachRequest[]=[];
 await page.route('**/api/config',route=>route.fulfill({json:{mode:'adult-evaluation',liveAvailable:true}}));
 await page.route('**/api/coach',async route=>{
  const q=route.request().postDataJSON() as CoachRequest;requests.push(q);
  await route.fulfill({json:{contractKind:'CoachResponse',coachContractVersion:1,identity:q.identity,requestId:q.requestId,contextRevision:q.context.revision,contextVisitId:q.context.visitId,status:'selected',selection:{moveId:'CLARIFY',interpretation:'unclear',refs:[],uncertain:true}}});
 });
 await start(page);expect(requests).toHaveLength(0);await page.getByRole('button',{name:'Help',exact:true}).click();await page.getByRole('button',{name:'Your story plan',exact:true}).click();
 await page.getByRole('textbox').fill('It goes there.');expect(requests).toHaveLength(0);await page.getByRole('button',{name:'Help me think',exact:true}).click();
 await expect(page.locator('.help-response')).toContainText(copy('CT.HINT.CLARIFY'));
 // The visible text is rendered before its next-frame COACH_DISPLAY event is saved.
 await expect.poll(async()=>(await saved(page)).payload.coachingHistory).toHaveLength(1);
 const c=(await saved(page)).payload;expect(requests).toHaveLength(1);expect(requests[0]?.explanation).toBe('It goes there.');expect(requests[0]?.context.exposedRefs).toEqual([]);expect(c.coachingHistory).toHaveLength(1);expect(c.coachingHistory[0]?.origin).toBe('live-selection');expect(c.exposures).toEqual([]);expect(c.certificate).toBeNull();
});
