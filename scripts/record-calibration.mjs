import {readFile,writeFile} from 'node:fs/promises';
const file='docs/design/evidence-quest-design-v3/11-build-packet/implementation-plan.json',plan=JSON.parse(await readFile(file,'utf8'));
const observations=[
 {kind:'observed-integration-interval',tasks:['TASK11.06','TASK11.07','TASK11.08','TASK11.14'],start:'2026-09-12T01:43:44.153Z',end:'2026-09-12T02:01:04.816Z',seconds:1040.663,basis:'Two host UTC tool/task-event boundaries. Includes implementation, browser waits and repairs; not the whole task duration.',humanAttentionMinutes:null,disjointOverlapSeconds:null},
 {kind:'successful-browser-route',tasks:['TASK11.10','TASK11.12','TASK11.13','TASK11.16'],seconds:49.9,evidence:'evidence/connected-media-first-pass.json',basis:'Actual Playwright test duration: fresh Media-first through full rehearsal and premiere, including physical travel. Inspection and repair excluded.'},
 {kind:'successful-storage-browser-suite',tasks:['TASK11.14'],seconds:25.4,evidence:'evidence/save-browser-three-pass.json',basis:'Three actual browser tests, including real IndexedDB; no all-device durability claim.'},
 {kind:'successful-storage-fault-suite',tasks:['TASK11.14'],seconds:30.6,evidence:'evidence/save-browser-faults-pass.json',basis:'Four actual browser tests with labeled injected faults. Included in integration work, not added to the interval above.'}
];
plan.schedule.calibration.find(c=>c.id==='CAL12.CONNECTED').observations=observations;
plan.schedule.forecast.status='PARTIALLY_MEASURED';plan.schedule.forecast.milestones['M11.CONNECTED'].status='IN_PROGRESS';
plan.schedule.forecast.confidence='Successful full-route browser execution is measured at about 50 seconds; storage suites at 25–31 seconds. Integration repair remains variable, and required branches are still unverified. No whole-milestone completion time or final-art throughput is inferred.';
plan.schedule.forecast.comparableBrowserRun={lowerSeconds:45,upperSeconds:65,basis:'Provisional execution-only allowance for a similarly sized connected route; excludes implementation, repair, review and added detours.'};
await writeFile(file,JSON.stringify(plan,null,2)+'\n');
await writeFile('evidence/calibration.json',JSON.stringify({observations,forecast:plan.schedule.forecast},null,2)+'\n');
await writeFile('evidence/measured-schedule.md','# Connected build measured schedule\n\n'+plan.schedule.forecast.confidence+'\n\nHuman active attention is unknown. The observed integration interval includes tests and repair; overlapping measurements are not added together. A comparable route has a provisional 45–65 second automated execution allowance only. Final art, live interpretation and participant work remain unsampled.\n\n|Task|Status|Last recorded event|\n|---|---|---|\n'+plan.tasks.slice(0,17).map(t=>`|${t.id}|${t.status}|${t.execution?.updatedAt??'No execution event'}|`).join('\n')+'\n');
