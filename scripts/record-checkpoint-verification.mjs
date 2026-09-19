import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';

const directory='evidence/integrated-checkpoint-20260916';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
async function fileRecord(file){const bytes=await fs.readFile(file);return {file,bytes:bytes.length,sha256:hash(bytes)};}
function cases(suites){return suites.flatMap(suite=>[...(suite.specs??[]).flatMap(spec=>(spec.tests??[]).map(test=>({title:spec.title,file:spec.file,line:spec.line,project:test.projectName,status:test.status,results:(test.results??[]).map(result=>({status:result.status,durationMs:result.duration,errors:(result.errors??[]).map(error=>error.message?.replace(/\u001b\[[0-9;]*m/g,'')),attachments:result.attachments?.map(a=>({name:a.name,path:a.path,contentType:a.contentType}))}))}))),...cases(suite.suites??[])]);}
const selected=[
 ['required-browser-final','Required full Chromium suite; immutable artifact before the water-targeting, UI-time and static color-batching corrections'],
 ['six-browser-outcomes','Five physical arrangements and nine saved narrative outcomes across six browser/density conditions; fixture replay, not fresh full stories'],
 ['final-functional','Initial six-condition functional matrix; failed attempts retained'],
 ['boat-six-final','Pointer/native boat routes and return-save regression on the water-plane candidate'],
 ['functional-corrections-focused','Focused corrections for previously failed cases; recording-related WebKit timeouts retained'],
 ['webkit-controls-unrecorded','Identical WebKit native-control routes without diagnostic injection, traces or video recording'],
 ['isolated-webkit-controls','Final isolated Chromium DPR1 and WebKit DPR2 native-control routes; no diagnostic injection or framebuffer recording'],
 ['isolated-performance','Initial isolated active-cadence/resource qualification; expanded overview check reproduced the WebKit DPR2 failure'],
 ['isolated-webkit-dpr2','Fresh browser process reproduces the WebKit DPR2 failure'],
 ['webkit-ui-time','Focused timing after eliminating native-UI updates for action time alone'],
 ['webkit-composition','Focused CSS-compositing candidate: frame limit still failed'],
 ['webkit-default-final','Default Windows WebKit renderer, before static color batching'],
 ['webkit-batching','Default Windows WebKit renderer after draw-call reduction; frame limit still failed'],
 ['final-performance','Final production candidate, six separate browser/density projects; unmodified default engine launch arguments'],
 ['isolated-assets','Final isolated network profile, native input and artwork recovery across six conditions'],
 ['bare-webkit-compositor','Synthetic bare-framebuffer diagnostic only; never a game qualification pass'],
 ['presentation-options','Synthetic antialiased context-option diagnostic at unchanged framebuffer size; not game qualification'],
 ['retained-framebuffer','Actual-game comparison of default and retained framebuffer; diagnostic injection, not qualification'],
 ['actual-context','Actual-game explicit opaque-context comparison; actual attributes recorded, both alternatives remain over the frame limit'],
 ['consolidated-review','Review-only art package interaction and eight view angles across six conditions'],
 ['review-path-clearance','Follow-up review after keeping scenery clear of full path segments; Chromium DPR1'],
 ['review-delivery','Final consolidated review viewer after geometry/color-preserving material batching; six browser/density conditions'],
];
const reports=[];
for(const [name,scope]of selected){const file=directory+'/'+name+'.json';try{const report=JSON.parse(await fs.readFile(file,'utf8'));reports.push({...(await fileRecord(file)),scope,stats:report.stats,cases:cases(report.suites??[])});}catch(error){if(error.code==='ENOENT')reports.push({file,scope,status:'NOT_RUN_OR_NOT_COMPLETE'});else throw error;}}
const sources=[['pip','evidence/hands-on-20260916/pilot/revision-r2/pip/pip-review.glb','61006b3597984f6e8ceca9d08a0da39cd1e5ff14b407da439672262224024905'],['grandma','evidence/hands-on-20260916/pilot/revision-r2/grandma/grandma-review.glb','173164a1639606f0565aca5e8caa22d177d365d6dfb5f1c0ea360f58eeff1a67']];
const originals=[];for(const [id,file,expected]of sources){const record=await fileRecord(file);if(record.sha256!==expected)throw Error('Approved source changed: '+id);originals.push({id,...record,approval:'Tony, explicit R2-feet Form approval',unchanged:true});}
const assets=JSON.parse(await fs.readFile(directory+'/runtime-assets.json','utf8'));
const review=JSON.parse(await fs.readFile('evidence/hands-on-20260916/pilot/checkpoint-review/manifest.json','utf8'));
const bundleFiles=(await fs.readdir('dist/client/assets')).filter(name=>/^(?:GardenApp|index|visualAsset).*\.(js|css)$/.test(name));
const bundles=await Promise.all(bundleFiles.map(name=>fileRecord('dist/client/assets/'+name)));
const measurementRecords=[];
for(const name of ['final-performance','isolated-assets','bare-webkit-compositor']){
 try{const report=JSON.parse(await fs.readFile(directory+'/'+name+'.json','utf8'));
  const collect=suites=>{for(const suite of suites){for(const spec of suite.specs??[])for(const test of spec.tests??[])for(const result of test.results??[])for(const attachment of result.attachments??[]){if(attachment.contentType==='application/json'&&attachment.body)measurementRecords.push({report:name,project:test.projectName,test:spec.title,status:result.status,name:attachment.name,measurements:JSON.parse(Buffer.from(attachment.body,'base64').toString())});}collect(suite.suites??[]);}};collect(report.suites??[]);
 }catch(error){if(error.code!=='ENOENT')throw error;}
}
const performanceSummary=measurementRecords.filter(r=>r.report==='final-performance'&&r.name==='garden-renderer-measurements').flatMap(r=>r.measurements.map(m=>({project:r.project,dpr:m.dpr,encounterP95Ms:m.render.p95,overviewP95Ms:m.overview.p95,drawCalls:m.overview.drawCalls,sceneBytes:m.overview.decodedSceneBytes,cacheBytes:m.overview.decodedCacheBytes,coreBytes:m.coreBytes,initialBytes:m.transfer.reduce((sum,entry)=>sum+entry.encodedBytes,0),status:r.status})));
const verification={schema:'evidence-quest.integrated-checkpoint-verification.v1',recordedAt:new Date().toISOString(),tasks:['TASK11.20','TASK11.21'],status:'INTERMEDIATE_CHECKPOINT_NOT_FULLY_QUALIFIED',branch:execFileSync('git',['branch','--show-current'],{encoding:'utf8'}).trim(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),localUncommitted:true,originals,runtimeAssets:assets,bundles,reviewManifest:review,reports,measurementRecords,performanceSummary,
 commands:[
  {command:'npm ci',exitCode:0,evidence:'npm-ci-retry.log',note:'Initial owned esbuild lock failure is retained in npm-ci.log.'},
  {command:'npm run validate:content',exitCode:0,evidence:'validate-content.log'},
  {command:'npm run check',exitCode:0,evidence:'build-batching-2.log',note:'The final build invokes the exact required check command.'},
  {command:'npm run build:server',exitCode:0,evidence:'build-batching-2.log',note:'The final build invokes the exact required server build command.'},
  {command:'npm run test:contracts',exitCode:0,passed:157,evidence:'contracts-delivery.log'},
  {command:'npm run eval:coach -- --mode authored',exitCode:0,passed:23,providerRequests:0,evidence:'eval-delivery.log'},
  {command:'npm run build',exitCode:0,evidence:'build-batching-2.log'},
  {command:'npm run test:browser -- --workers=2 --output=output/playwright/integrated-checkpoint/required-final',exitCode:reports[0].stats?reports[0].stats.unexpected?1:0:null,evidence:'required-browser-final.log',note:'Full required suite retains original failures; affected-case correction reports remain separate.'},
 ],
 additionalChecks:{approvedSourcesRigGaitsAdaptersAndBatching:{passed:29,failed:0,evidence:'adapter-and-assets-delivery.log'},losslessAtlasProbe:{integrated:false,evidence:'animation-atlas-probe.json',reason:'Packing increased WebP transfers; originals and runtime bindings unchanged.'},ownerPlayAcceptance:'PENDING',remainingFormApproval:'PENDING'},
 budget:{additionalTripoJobs:0,additionalTripoCredits:0,recordedCredits:290,pilotAllocation:400,productionAllocation:1600,correctionAllocation:500,ceiling:2500},haltedProviderEvaluation:{task:'TASK11.19',attempts:1,planned:75,resumed:false},
 limits:{initialBytes:4*1024*1024,compressedCoreBytes:1024*1024,locationBytes:3*1024*1024,decodedSceneBytes:96*1024*1024,decodedCacheBytes:192*1024*1024,openingMs:5000,networkMbps:10,responseLatencyMs:100,activeFrameP95Ms:33.34,inputFeedbackMs:100},
 boundaries:['Boat, rooted flower, new jog/carry-jog and painted kit remain review-only until explicit matching Form approval.','Current open-path travel uses the approved walk at previous travel speed pending the separately reviewed jog.','Windows browser engines and emulated DPR are not physical Safari/mobile-device qualification.','Resource figures include imported data and conservative reserves, not browser/driver total allocation.','WebKit DPR2 remains over the original frame limit. The earlier 32 ms accelerated-compositing probe was not reproduced in expanded qualification and is not a resolution claim.','Two legacy 2D studio transfer-budget failures remain recorded in the required suite.','The four CDP two-contact touch cases outside Chromium are skipped, not native Firefox/WebKit touch proof.','Complete-chapter commitment, ER13.06–08 and Tony play acceptance remain open.','No commit, push, subscription, live AI, deployment or public publication.'],
};
await fs.writeFile(directory+'/verification.json',JSON.stringify(verification,null,2)+'\n');
console.log(JSON.stringify({report:directory+'/verification.json',reports:reports.map(r=>({file:r.file,stats:r.stats,status:r.status})),originals:originals.map(({id,sha256})=>({id,sha256}))},null,2));
