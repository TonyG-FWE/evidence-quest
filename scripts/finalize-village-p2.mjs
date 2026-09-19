// Records this bounded review checkpoint. Does not export or alter any model.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {ROOT,REVIEW,REVISION,CHARACTERS} from './tripo-village-config.mjs';
const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const hash=b=>createHash('sha256').update(b).digest('hex');
const rel=p=>path.relative(process.cwd(),p).replaceAll('\\','/');
const reviewRel=rel(REVIEW),verify=path.join(REVIEW,'verification');
const ledger=await read(path.join(ROOT,'tripo-ledger.json'));
const jobs=ledger.jobs.filter(j=>j.revision===REVISION);
const commands=await read(path.join(verify,'project-commands.json'));
assert.equal(commands.status,'COMPLETE','Wait for the original eight-command run; do not rerun it');
assert.equal(commands.results.length,8);
assert.equal(ledger.actualCharged,2140);assert.equal(ledger.reservedForUnresolved,0);
const taskCharge=jobs.reduce((s,j)=>s+j.actualCredits,0);assert.equal(taskCharge,1245);
assert(jobs.every(j=>j.status==='SUCCESS'));
const allocations={};for(const j of ledger.jobs)allocations[j.phase]=(allocations[j.phase]??0)+(j.actualCredits??0);
assert.deepEqual(allocations,{pilot:290,production:1440,corrections:410});
const last=jobs.at(-1);assert.equal(last.balanceAfter.balance,360);assert.equal(last.balanceAfter.frozen,0);
const coverage=await read(path.join(REVIEW,'movement-coverage.json'));
const assets=[];
for(const c of CHARACTERS){
 const dir=path.join(REVIEW,c.id),m=await read(path.join(dir,'manifest.json'));
 const native=await read(path.join(dir,'verification/native-checks.json'));
 const custom=await read(path.join(dir,'verification/custom-checks.json'));
 assert.equal(native.status,'PASS_BOUNDED_CHECKS');assert.equal(custom.status,'PASS_SOURCE_AND_RIG_INVARIANTS');
 const sources=[];
 for(const stage of m.stages){const job=jobs.find(j=>j.assetId===c.id&&j.operation===stage.operation),sha=hash(await fs.readFile(path.join(dir,stage.uri)));assert.equal(sha,job.sourceSha256);assert.equal(sha,stage.sha256);sources.push({operation:stage.operation,path:rel(path.join(dir,stage.uri)),sha256:sha,taskId:stage.taskId,credits:stage.credits,inspection:stage.inspection?.status});}
 const sidecar=await fs.readFile(path.join(dir,'custom-actions.json'));assert.equal(hash(sidecar),custom.sidecarSha256);
 assets.push({id:c.id,label:c.label,reference:m.reference,sources,customAnimation:{path:rel(path.join(dir,'custom-actions.json')),sha256:hash(sidecar),clips:custom.clips.length,status:'CONTACT_PREVIEW_NOT_QUALIFIED'},nativeChecks:native.status,customChecks:custom.status,limitations:coverage.records.find(r=>r.id===c.id).limitations,formApproval:'PENDING',movementApproval:'PENDING'});
}
const browser=await read('output/playwright/results.json');
assert(new Date(browser.stats.startTime)>=new Date(commands.results[7].start),'Do not bind a historical browser result');
const failures=[];
const failedAttachments=[];
const narrativeRoutes=[];
function walk(s,prefix=[]){const route=[...prefix,s.title].filter(Boolean);for(const spec of s.specs??[])for(const t of spec.tests??[]){if(spec.title.startsWith('Complete Garden chapter:'))narrativeRoutes.push({title:spec.title,status:t.status});if(t.status==='unexpected'){failures.push({title:[...route,spec.title].join(' / '),project:t.projectName,errors:t.results.flatMap(r=>r.errors??[]).map(e=>e.message??e.value)});failedAttachments.push(...t.results.flatMap(r=>r.attachments??[]).filter(a=>a.path));}}for(const child of s.suites??[])walk(child,route);}
for(const s of browser.suites)walk(s);
await fs.copyFile('output/playwright/results.json',path.join(verify,'project-browser-results.json'));
const retained=[],rawRoot=path.resolve('output/playwright/raw');
for(const a of failedAttachments){const source=path.resolve(a.path);if(!source.toLowerCase().startsWith((rawRoot+path.sep).toLowerCase()))continue;const target=path.join(verify,'project-browser-artifacts',path.relative(rawRoot,source));await fs.mkdir(path.dirname(target),{recursive:true});await fs.copyFile(source,target);retained.push({name:a.name,path:rel(target),sha256:hash(await fs.readFile(target))});}
const browserSummary={stats:browser.stats,narrativeRoutes,failures,retainedFailureAttachments:retained,scope:'Unmodified existing game, default required Chromium suite. Separate from the seven-character gallery. No game repair or performance investigation undertaken.'};
await fs.writeFile(path.join(verify,'project-browser-summary.json'),JSON.stringify(browserSummary,null,2)+'\n');
const galleryFiles=['index.html','coverage.html','review.js','actions.html','actions.js','cycles.html','cycles.js','movement-coverage.json'];
const gallery=[];for(const name of galleryFiles)gallery.push({path:name,sha256:hash(await fs.readFile(path.join(REVIEW,name)))});
const report={at:new Date().toISOString(),taskIds:['TASK11.ART02','TASK11.ART03','TASK11.ART04','TASK11.ART05','TASK11.ART06'],status:'MODEL_AND_MOVEMENT_REVIEW_WITH_RECORDED_LIMITATIONS',scope:'Seven village characters; Pip unchanged; Jo supplied by Tony; no scenery, Loop, incoming-asset processing or gameplay integration.',credits:{starting:895,additional:taskCharge,cumulative:2140,ceiling:2500,available:360,frozen:0,unresolvedJobs:0,allocations},assets,gallery,projectCommands:commands,projectBrowser:browserSummary,modelFormApproval:'PENDING',movementApproval:'PENDING',productionExportAllowed:false,gameplayIntegrationAllowed:false,task11_19:'HALTED_AT_1_OF_75'};
await fs.writeFile(path.join(REVIEW,'review-submission.json'),JSON.stringify(report,null,2)+'\n');
const browserCount=`${browser.stats.expected} passed / ${browser.stats.unexpected} failed / ${browser.stats.skipped} skipped`;
const gameDetails=`${narrativeRoutes.filter(r=>r.status==='expected').length}/${narrativeRoutes.length} complete narrative routes pass. The four failures are the two 1440px/320px welcome checks waiting for .garden-scene before Start playing, and the DPR2 lossless-WebP/PNG-fallback studio room-transfer assertions. They match the previously recorded failures. Twelve failure attachments are retained with the results.`;
const doc=`# TASK11.ART02–06: seven village characters rebuilt with Tripo P2

Date: 2026-09-17. Existing branch codex/first-connected, base 7cc938a10bb52226a7a13493b64828eccf9c53d2. Tony explicitly authorized this seven-character restart. Earlier candidates and verification history remain preserved. This advances the existing art sequence, not the complete chapter qualification.

## Review deliverable

[Consolidated gallery](http://127.0.0.1:4318/pilot/village-p2-20260917/index.html). Grandma, Mara, Rina, Sol, the boy, passenger operator and adult passenger each have a fresh P2 model, humanoid rig, idle, walk and turn. Role presets bring the total to **30 untouched Tripo clips**. Separate animation-only files provide **29 contact/action previews**. Model Form and movement approval are **PENDING**. Sol's climb is **REJECTED**, retained as evidence rather than presented as accepted motion.

Successful Pip remains byte-identical; Jo is excluded and will be supplied by Tony. No scenery, Loop, incoming assets, gameplay integration or save work occurred. The earlier manually rebuilt versions are superseded only for these seven characters; original files remain intact in the older library.

## Production and provenance

Grandma was processed first, followed by Mara, Rina, Sol, boy, operator and passenger. Every character used P2-20260801, standard PBR textures, original-image alignment, disabled image autofix, adaptive triangle count and direct GLB. Approved local image hashes are unchanged. Each generated mesh was inspected before a successful free biped check and humanoid rig request (v1.0-20240301, biped, spec tripo, GLB). The exact rig version is in submitted arguments; some provider readbacks omit that field. Native geometry-included, in-place idle/walk cycles were inspected before role presets.

There are **36 successful jobs**, including seven free checks and a separate Sol climb job. No retry, reroll, paid conversion or subscription. The Sol climb has a successful API status but a rejected visual status; these are distinct facts. Original download hashes match submission-time receipt hashes. Embedded texture bytes and joint mappings are preserved across Tripo processing stages. Each rig contains **41 joints, without independent fingers/thumbs**.

SOURCE_TABLE

The original GLBs, previews, PBR textures, submitted settings, readbacks, task IDs, individual charges and SHA-256 hashes are retained in [the exact review submission](../../${reviewRel}/review-submission.json), per-character manifests and [the existing ledger](../../evidence/hands-on-20260916/tripo-ledger.json). No local model re-export, mesh reconstruction, hand replacement, weight editing or skeleton rebuilding occurred.

## Separate actions and contact limitations

Custom clips target existing joints in separate JSON files. They preserve geometry, materials, bone hierarchy, bind pose, skin weights and native clips. No authored scale track or stretched limb is introduced. Carrying variants copy the native lower-body walk tracks unchanged and substitute only separate arm rotations. The passenger's eight-second sit/listen/stand preview keeps feet in place while existing joints bend toward the original bench. Review props retain their supplied dimensions and are only contact fixtures; they are not new approved artwork or gameplay state.

Joint mappings, both-hand offsets, phase timing, clip authorship and source rig hashes are recorded in each movement-review.json. Estimated walk distance per cycle is explicitly an integration estimate, not validated world locomotion. Model normalization and a constant per-clip floor offset are viewer transforms only; native foot variation remains visible.

${assets.map(a=>`- **${a.label}:** ${a.limitations.join(' ')}`).join('\n')}

Exact two-person transfers and final scene contacts are not qualified. The previews should not be treated as complete planting, roof repair, tape repair or flute choreography. These limitations are displayed inside the gallery. No automatic repair or additional paid attempt is scheduled.

## Checks and commands

All seven reference/provider/source integrity checks pass. Thirty native clips have 128 finite playback samples; native walking moves both upper arms and both feet. Twenty-nine custom clips have 64 finite samples, existing-joint targeting and stable limb lengths; carrying copies preserve native lower-body tracks. These bounded checks do not establish foot locking, natural motion, clothing quality or convincing hand contact. [Native and custom results](../../${reviewRel}/verification/sidecar-summary.json).

Browser review exercises source/result selection, normal/slow motion, scrubbing, hand views, skeleton overlay, start/stop crossfade, gameplay framing and interrupted loading. Detailed observations and limits: [gallery browser evidence](../../${reviewRel}/verification/browser-review.json). Full-cycle sheets show six phases from front, side and rear. Technical checks never substitute for Tony's visual acceptance.

All eight required commands were run **once**:

| Command | Exit |
|---|---:|
${commands.results.map(r=>`| ${r.command} | ${r.exitCode} |`).join('\n')}

Content/type/server/build checks pass; **192 contract tests** and **23 authored coach checks** pass, with no live coach request. The existing-game Chromium browser run reports **${browserCount}**. ${gameDetails} Its failures are retained separately in [the exact summary](../../${reviewRel}/verification/project-browser-summary.json) and [full results](../../${reviewRel}/verification/project-browser-results.json); logs for all eight commands remain beside them. No unrelated game repair or performance investigation was undertaken. This is not an all-browser game qualification or resolution of earlier WebKit DPR2/studio transfer gaps.

## Budget and next dependency

Actual additional spending is **1,245 credits**, cumulative **2,140 / 2,500**, available **360**, frozen **0**, unresolved jobs **0**. Allocations are **290 pilot / 1,440 production / 410 corrections**, all below their ceilings. This matches the authorized estimate.

The next dependency is Tony's consolidated model Form and movement review, with the listed clip exceptions. New production export and gameplay integration remain blocked pending explicit matching approval. The requested Build 3D Game Rooms workflow says: “Record explicit human Form approval. Stop before progressive export when Form fails.” Existing reference approvals remain valid. TASK11.19 stays halted at exactly **1/75**, and broader TASK11.20/.21 remain open.
`;
// Avoid a second authority for metrics: source table is assembled from manifests.
const rows=[];for(const a of assets){const m=await read(path.join(REVIEW,a.id,'manifest.json')),c=coverage.records.find(r=>r.id===a.id);rows.push(`| ${a.label} | ${m.stages[0].triangles.toLocaleString('en-US')} | ${c.nativeClips} | ${c.customClips} | ${m.credits.thisAttempt} |`);}
const tableStart=doc.indexOf('SOURCE_TABLE'),tableEnd=tableStart+'SOURCE_TABLE'.length;
const document=doc.slice(0,tableStart)+'| Character | Triangles | Native clips | Separate previews | Credits |\n|---|---:|---:|---:|---:|\n'+rows.join('\n')+doc.slice(tableEnd);
await fs.writeFile('docs/game-review/VILLAGE-P2-CHARACTERS-20260917.md',document.replaceAll('\\`','`'));
const statusFile='BUILD-STATUS.md';let status=await fs.readFile(statusFile,'utf8');
const heading='## Current: seven village P2 characters ready for review with movement limitations (2026-09-17)';
if(status.includes(heading)){const end=status.indexOf('## Previous: fresh Tripo-only Pip',status.indexOf(heading));assert(end>=0);status='# Evidence Quest build status\n\n'+status.slice(end);}
status=status.replace('## Current: fresh Tripo-only Pip','## Previous: fresh Tripo-only Pip');
const update=`${heading}

The [seven-character gallery](http://127.0.0.1:4318/pilot/village-p2-20260917/index.html) compares each approved reference, untouched P2 model and Tripo movement. Grandma, Mara, Rina, Sol, boy, operator and passenger were rebuilt in the authorized order. **Pip is unchanged; Jo is excluded.** There are **30 native Tripo clips and 29 separate custom action/contact previews**, all awaiting matching model Form/movement approval. [Dated TASK11.ART02–06 evidence](docs/game-review/VILLAGE-P2-CHARACTERS-20260917.md), [exact review submission](${reviewRel}/review-submission.json).

Original model geometry, materials, skeletons, weights and clips remain intact. Custom clips animate existing joints in separate files; carrying variants retain Tripo's lower-body gait. All seven integrity/rig checks pass, including 128 native samples per clip and 64 custom samples with fixed limb lengths. The browser exposes all-side views, gameplay scale, hand close-ups, skeletons, normal/slow playback, scrubbing and start/stop blending. Loading/switching/disposal checks and keyboard controls are recorded separately. These checks do not grant visual acceptance.

**Remaining movement gaps:** Sol's stock climb is rejected for apron clipping. Grandma's dig bunches her skirt; Rina's lift has coat flare and vertical foot variation. Precise planting/soil covering, synchronized tape repair and handoffs, roof/ladder contact and flute mouth contact remain unqualified. Custom scenes are explicitly labeled previews. [Per-character limitations](${reviewRel}/movement-coverage.json). No mesh/rig reconstruction, automatic reroll or substitution hides those gaps.

All eight required commands ran once. Install/content/type/server/build checks, **192 contracts and 23 authored coach checks pass**. Existing-game Chromium browser result: **${browserCount}**. ${gameDetails} [Exact command results](${reviewRel}/verification/project-commands.json), [browser failures](${reviewRel}/verification/project-browser-summary.json). Existing game failures are retained without expanding into game repairs or performance investigations. TASK11.20/.21 remain open.

Actual additional charge: **1,245 credits**. Cumulative **2,140 / 2,500**; available **360**, frozen **0**, unresolved **0**. Allocation totals: **290 pilot / 1,440 production / 410 corrections**. No subscription or conversion charge. No new gameplay integration, save work, scenery, Loop or incoming-asset processing. **TASK11.19 remains halted at 1/75.** Next dependency: Tony's consolidated model Form/movement review; production export and integration follow explicit approval.

`;
status=status.replace(/^# Evidence Quest build status\r?\n\r?\n/,'# Evidence Quest build status\n\n'+update);assert(status.includes(heading));
await fs.writeFile(statusFile,status);
console.log(JSON.stringify({assets:assets.length,nativeClips:coverage.records.reduce((s,r)=>s+r.nativeClips,0),customClips:coverage.records.reduce((s,r)=>s+r.customClips,0),credits:report.credits,browser:browser.stats,approval:'PENDING'},null,2));
