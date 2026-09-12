import {readFile,writeFile} from 'node:fs/promises';
const file='docs/design/evidence-quest-design-v3/11-build-packet/implementation-plan.json',plan=JSON.parse(await readFile(file,'utf8'));
const log=JSON.parse(await readFile('evidence/task-execution.json','utf8')),acceptance=JSON.parse(await readFile('evidence/first-connected-acceptance.json','utf8'));
const existing=plan.schedule.calibration.find(c=>c.id==='CAL12.CONNECTED').observations??[];
const observations=existing.filter(o=>o.kind.startsWith('observed-')||o.evidence?.includes('connected-media-first'));
for(const id of ['TASK11.03','TASK11.04','TASK11.05','TASK11.06','TASK11.16']){
 const start=log.events.find(e=>e.id===id&&e.status==='IN_PROGRESS'),end=log.events.findLast(e=>e.id===id&&e.status==='COMPLETE');
 if(start&&end)observations.push({kind:'recorded-task-interval',task:id,start:start.at,end:end.at,seconds:(Date.parse(end.at)-Date.parse(start.at))/1000,humanAttentionMinutes:null,disjointOverlapSeconds:null,basis:'Host UTC task events. Includes implementation/testing/tool waits/review within the interval; not isolated labor or uninterrupted execution.'});
}
for(const run of acceptance.browserRuns)observations.push({kind:'browser-suite',...run,basis:'Measured Playwright duration; overlaps integration/review intervals and is not added to them.'});
const routes=acceptance.browserResults.filter(r=>r.project==='chromium'&&r.title.startsWith('TASK11.16'));
for(const r of routes)observations.push({kind:'successful-connected-route',title:r.title,seconds:r.durationMs/1000,evidence:r.file,basis:'Automated browser execution with physical travel; excludes authoring and repair.'});
plan.schedule.calibration.find(c=>c.id==='CAL12.CONNECTED').observations=observations;
plan.schedule.forecast.status='PARTIALLY_MEASURED';
plan.schedule.forecast.milestones['M11.CONNECTED'].status=plan.tasks.slice(1,17).every(t=>t.status==='COMPLETE')?'COMPLETE':'IN_PROGRESS';
plan.schedule.forecast.confidence='First connected implementation and browser checks are complete for the authorized scope. Task intervals and suite durations are separate. Human attention, unobserved waits and overlap are unknown. Final art, live interpretation, participant and delivery work remain unsampled; no forecast for those families follows from temporary graphics.';
const times=routes.map(r=>r.durationMs/1000);plan.schedule.forecast.comparableBrowserRun={lowerSeconds:Math.floor(Math.min(...times)/5)*5,upperSeconds:Math.ceil(Math.max(...times)/5)*5+10,basis:'Execution-only provisional allowance from three fresh connected routes on this host. Authoring, repair, review, environment variation and extra detours excluded.'};
await writeFile(file,JSON.stringify(plan,null,2)+'\n');
await writeFile('evidence/calibration.json',JSON.stringify({at:new Date().toISOString(),observations,forecast:plan.schedule.forecast,humanAttentionMinutes:null,wholeMilestoneElapsedSeconds:null,wholeMilestoneReason:'No trustworthy recorded startup boundary. Goal elapsed data disagreed with the host clock; no total inferred.'},null,2)+'\n');
await writeFile('evidence/measured-schedule.md','# Connected build measured schedule\n\n'+plan.schedule.forecast.confidence+'\n\nHistorical allowances remain in REVISED-SCHEDULE.md. Task intervals include tests and repairs; overlapping browser measurements are not summed. Full observations: [calibration.json](calibration.json).\n\n|Task|Status|Last event|\n|---|---|---|\n'+plan.tasks.slice(0,17).map(t=>`|${t.id}|${t.status}|${t.execution?.updatedAt??'Historical documented checkpoint'}|`).join('\n')+'\n');
