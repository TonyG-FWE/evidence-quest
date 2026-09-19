import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';

// Compact, dated evidence. Raw browser recordings remain excluded by the
// repository's retention policy; this never changes a result or its threshold.
const root='evidence/hands-on-20260916';
const read=async name=>JSON.parse(await fs.readFile(name,'utf8'));
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const clean=text=>text.replace(/\u001b\[[0-9;]*m/g,'');
// This is the measured development candidate. Later builds/provider decisions
// need a new record; never attach these dated test results to different bytes.
const verifiedManifest=await read('dist/client/.vite/manifest.json');
if(verifiedManifest['src/garden/GardenApp.tsx'].file!=='assets/GardenApp-BBukaQoS.js'||hash(await fs.readFile('dist/client/assets/GardenApp-BBukaQoS.js'))!=='7825f657fc3ac27c6b160d485ee8dd58be62e7e60fca0fda3516bdba3cb3301d')throw Error('This dated report belongs to a different development candidate.');
const ledger=await read(`${root}/tripo-ledger.json`),reviews=await read(`${root}/milestone-reviews.json`);
if(ledger.jobs.length||ledger.actualCharged||ledger.reservedForUnresolved||reviews.function?.approvedBy||reviews.form?.approvedBy)throw Error('Production decisions have advanced; preserve this pre-production checkpoint.');
function cases(report){
 const found=[];
 function walk(suites){for(const suite of suites??[]){for(const spec of suite.specs??[])for(const test of spec.tests??[]){
  const result=test.results.at(-1);
  found.push({file:path.basename(spec.file??suite.file??''),title:spec.title,project:test.projectName,status:result?.status??'not-run',durationMs:result?.duration??0,errors:result?.errors?.map(e=>clean(e.message??e.value??'').slice(0,1500))??[],attachments:result?.attachments??[]});
 }walk(suite.suites);}}
 walk(report.suites);return found;
}
const reports=[];
for(const name of (await fs.readdir(root)).filter(n=>/^browser-.*\.json$/.test(n)&&n!=='browser-summary.json').sort()){
 const report=await read(`${root}/${name}`);if(!report.suites)continue;
 const entries=cases(report),counts={};for(const item of entries)counts[item.status]=(counts[item.status]??0)+1;
 reports.push({report:name,startedAt:report.stats?.startTime,counts,failures:entries.filter(c=>!['passed','skipped'].includes(c.status)).map(({attachments,...item})=>item),runnerErrors:report.errors?.map(e=>clean(e.message??'').slice(0,1500))??[]});
}
const latest=new Map();
for(const name of ['browser-hands-final.json','browser-native-touch-corrected.json','browser-landscape-final.json','browser-landscape-layout-cache.json'])for(const item of cases(await read(`${root}/${name}`))){
 const {attachments,...entry}=item;latest.set(`${item.file}:${item.title}:${item.project}`,{...entry,report:name});
}
const direct=[...latest.values()],existing=await read('output/playwright/hands-existing-browser-summary.json');
await fs.copyFile('output/playwright/hands-existing-browser-summary.json',`${root}/existing-browser-summary.json`);
await fs.copyFile('output/playwright/hands-existing-browser-summary.md',`${root}/existing-browser-summary.md`);
const measurements=[];
for(const name of ['browser-measurements-final.json','browser-measurements-layout-cache.json'])for(const item of cases(await read(`${root}/${name}`)))for(const attachment of item.attachments){
 if(attachment.name!=='garden-renderer-measurements')continue;
 const bytes=attachment.body?Buffer.from(attachment.body,'base64'):await fs.readFile(attachment.path);
 for(const result of JSON.parse(bytes.toString('utf8')))measurements.push({project:item.project,report:name,...result});
}
const manifest=await read('dist/client/.vite/manifest.json'),assetPaths=[manifest['index.html'].file,manifest['src/garden/GardenApp.tsx'].file,...manifest['src/garden/GardenApp.tsx'].css];
const artifacts=await Promise.all(assetPaths.map(async file=>({file,sha256:hash(await fs.readFile(`dist/client/${file}`))})));
const limits={initialTransferBytes:4*1024*1024,coreCompressedBytes:1024*1024,locationBytes:3*1024*1024,decodedSceneBytes:96*1024*1024,decodedCacheBytes:192*1024*1024,openingMsAt10Mbps100ms:5000,activeRafP95Ms:33.34,inputFeedbackMs:100};
const packet=await read('docs/design/evidence-quest-design-v3/11-build-packet/implementation-plan.json');
await fs.writeFile(`${root}/task-bindings.json`,JSON.stringify({authority:'Unchanged imported implementation-plan.json; these retain original task/check/fixture identities. New chapter checks supplement them, not replacement fixtures.',tasks:packet.tasks.filter(t=>/^TASK11\.(0[4-9]|1[0-6]|19|20|21)$/.test(t.id)).map(({id,title,checkIds,fixtureIds,dependsOn})=>({id,title,checkIds,fixtureIds,dependsOn}))},null,2)+'\n');
const summary={generatedAt:new Date().toISOString(),status:'DEVELOPMENT_CHECKPOINT_NOT_QUALIFIED',source:{branch:execFileSync('git',['branch','--show-current'],{encoding:'utf8'}).trim(),base:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),committed:false},artifacts,
 commands:{'npm ci':{status:'PASS',scope:'Initial install on unchanged package/lockfile; 110 packages. Recorded tool result; not rerun for CSS-only corrections.'},'validate:content':{status:'PASS',log:'build-compact-final.log'},check:{status:'PASS',log:'build-compact-final.log'},'build:server':{status:'PASS',log:'build-compact-final.log'},'test:contracts':{status:'PASS',passed:149,log:'contracts-final.log',scope:'Final model/interaction revision; later edits were UI/CSS and browser-test adaptations.'},'eval:coach -- --mode authored':{status:'PASS',passed:23,providerCalls:0,log:'authored-final.log'},build:{status:'PASS',log:'build-compact-final.log'},'test:browser':{status:'PASS_WITHIN_RECORDED_FUNCTIONAL_SCOPES',qualification:'OPEN',note:'Scoped batches on recorded builds, not one full final-suite run.'}},
 browser:{existing:{report:'existing-browser-summary.json',summary:existing.currentUniqueOutcome},direct:{applicablePassed:direct.filter(c=>c.status==='passed').length,skipped:direct.filter(c=>c.status==='skipped').length,cases:direct,skipReason:'CDP native two-finger protocol case is Chromium-only. Four Firefox/WebKit DPR identities intentionally skip; their pointer/keyboard activities run.'},cameraResize:cases(await read(`${root}/browser-compact-layout-cache.json`)).map(({attachments,...item})=>item),batches:reports,editions:{directAndInitialLandscape:'GardenApp-D8R8zdkH.js / GardenApp-Df2H8NdY.css',final:'See artifacts; subsequent runtime changes are compact-screen CSS and caching viewport dimensions between ResizeObserver callbacks. Final landscape and compact/reader resizing scopes verify the latter.'},dispositions:['Real input defects corrected before final scopes: destination planes for small held objects, independent pointer ownership, asynchronous reduced-motion picture redraw, reader/input focus and recovery, compact controls.', 'The original native two-finger test ended the owning contact. Corrected changed-contact dispatch and explicit native pointer-ID assertions passed in Chromium DPR1/2 without runtime changes.', 'Existing chapter assertions were adapted to optional directions, relocated destinations, normal reading scroll and actual visible control bounds. No original per-file test or assertion counts removed. Fixture bytes and thresholds unchanged.', 'The compact header overflow and visible Places/Bridge overlap were source defects. Final CSS retains 48px targets and a measured 10px separation.', 'Viewport caching removes repeated layout reads between label style writes. It does not resolve the measured WebKit DPR2 cadence failure, which remains open.']},
 performance:{scope:'Isolated first-encounter dock/crossing loopback runs only. Six browser/density observations; RAF cadence is a proxy, not physical display FPS.',limits,measurements,qualification:'OPEN',excluded:['Full chapter/location transfer and cadence','Detailed production GLB/material loading and eviction','Total GPU/decoded scene/cache memory qualification','10 Mbps / 100 ms physical-device opening','End-to-end native input latency and assistive-technology review']},
 production:{status:'PENDING_LAYOUT_REFERENCE_APPROVAL_AND_AUTHENTICATION',jobs:0,creditsCharged:0,creditCeiling:2500,pilotCeiling:400,formApproval:'NOT_RUN',note:'Two device-login windows expired. No credential is configured; do not reuse an expired code or submit a paid job before approval and priced preflight.'},
 preservation:{originalDesignPublicArtworkPackageAndLockfile:'UNCHANGED against base',providerLedger:'UNCHANGED',canonicalMigrationFixtures:'UNCHANGED; exact hashes in existing-browser-summary.json',historicalGeneratedReports:'Original bytes restored after timestamp-only comparison; see generated-report-refresh.json'},delivery:'delivered-final.json',
 task1119:{status:'HALTED',attempts:1,ceiling:75,newRequests:0,ledgerReset:false},ownerPlayReview:'NOT_RUN',finishedArt:'NOT_RUN',acceptance:'NOT_ESTABLISHED',demonstration:'before-after.html'};
await fs.writeFile(`${root}/browser-summary.json`,JSON.stringify(summary.browser,null,2)+'\n');
await fs.writeFile(`${root}/verification.json`,JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify({artifacts,applicableDirectPassed:summary.browser.direct.applicablePassed,intentionalSkips:summary.browser.direct.skipped,measurements:measurements.map(m=>({browser:m.project,dpr:m.dpr,openingMs:m.openingMs,p95:m.render.p95,checks:m.checks}))},null,2));
