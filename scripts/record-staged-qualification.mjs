// Record executed reports without converting focused corrections into a clean
// full-suite result. Invoke only after all listed browser processes have ended.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const base='evidence/staged-bridge-20260916';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
async function fingerprint(file){const bytes=await fs.readFile(file);return{file,bytes:bytes.length,sha256:hash(bytes)};}
async function json(file){return JSON.parse(await fs.readFile(file,'utf8'));}
function flatten(suites){return suites.flatMap(suite=>[
 ...(suite.specs??[]).flatMap(spec=>(spec.tests??[]).map(test=>({file:spec.file,title:spec.title,project:test.projectName,status:test.status,results:test.results}))),
 ...flatten(suite.suites??[]),
]);}
const reportInputs=[
 ['required Chromium full suite','required/browser-full.json','frozen broad build'],
 ['other five functional conditions','story-integration/browser-matrix.json','frozen broad build'],
 ['corrected archived migrations','story-integration/browser-migrations-final.json','frozen broad build, corrected fixture'],
 ['village histories first execution','village-histories-frozen-build-third.json','frozen broad build'],
 ['village FBPL fixture correction','village-histories-frozen-build-third-fbpl-correction.json','frozen broad build, corrected fixture'],
 ['final affected behavior','final-affected-browser.json','build-final-r2 production build; before any later startup lifecycle correction'],
 ['isolated actual-game performance','final-performance.json','build-final-r2 production build, one browser; before any later startup lifecycle correction'],
 ['isolated original-studio formats','final-studio/final-formats-matrix.json','build-final-r2 production build, one browser; before any later startup lifecycle correction'],
];
const reports=[];
for(const [label,relative,scope]of reportInputs){
 const file=base+'/'+relative,data=await json(file),cases=flatten(data.suites??[]);
 if(!data.stats?.duration||!cases.length||cases.some(item=>!item.results?.length)||!cases.some(item=>item.results.some(result=>result.status!=='skipped')))throw Error('Incomplete or collection-only report: '+file);
 reports.push({label,scope,...await fingerprint(file),stats:data.stats,cases:cases.map(item=>({...item,results:item.results.map(result=>({status:result.status,duration:result.duration,errors:result.errors??[],attachments:result.attachments??[]}))}))});
}
const game=reports.find(report=>report.label==='isolated actual-game performance');
const gameMetrics=[];
for(const item of game.cases)for(const result of item.results)for(const attachment of result.attachments??[]){
 if(!['garden-renderer-measurements','network-profile','native-input','location-asset-budgets'].includes(attachment.name))continue;
 const text=attachment.body?Buffer.from(attachment.body,'base64').toString('utf8'):await fs.readFile(attachment.path,'utf8');
 gameMetrics.push({project:item.project,name:attachment.name,data:JSON.parse(text)});
}
const studioMetrics=[];
for(const name of (await fs.readdir(base+'/final-studio/performance')).filter(name=>name.endsWith('-qualification.json'))){
 const file=base+'/final-studio/performance/'+name,data=await json(file);
 studioMetrics.push({...await fingerprint(file),engine:name.split('-DPR')[0],density:data.density,format:data.format,usableMs:data.usableMs,coldBytes:data.coldBytes,codeBytes:data.codeBytes,transfers:data.transfers,limits:data.transferLimits,inputPixelMs:data.inputPixelMs,cadence:data.cadence,memory:data.memory,errors:data.errors,scope:data.scope});
}
// These are observations of the retained pre-correction build. A successful
// diagnostic assertion is not successful scene presentation or a tested fix.
const pairedFile=base+'/blank-canvas-diagnostic-summary.json',paired=await json(pairedFile);
const reloadFile=base+'/blank-canvas-reload-summary.json',reload=await json(reloadFile);
const presentationDiagnostics={
 qualification:false,testedScope:'Retained build-final-r2 production bundle; no later source correction is covered.',
 paired:{...await fingerprint(pairedFile),status:paired.status,conclusion:paired.conclusion,limitations:paired.limitations,
  runs:paired.runs.map(run=>({mode:run.mode,report:run.report,data:run.data,stats:run.stats,overrideCount:run.overrideCount,pageErrors:run.pageErrors,consoleMessages:run.consoleMessages,contextEvents:run.contextEvents,
   rows:run.rows.map(row=>({label:row.label,presentation:row.presentation,page:row.page,renderedImage:row.renderedImage,frame:row.frame,visibility:row.visibility,context:row.context,sameFrameOpaqueSamples:row.sameFrameOpaqueSamples,outsideRenderNonzeroSamples:row.outsideRenderNonzeroSamples})),images:run.images})),cleanup:paired.cleanup},
 reload:{...await fingerprint(reloadFile),status:reload.status,report:reload.report,stats:reload.stats,rendererInstrumentation:reload.rendererInstrumentation,assertions:reload.assertions,
  observations:reload.observations.map(row=>({label:row.label,observation:row.observation,page:row.page,canvas:row.canvas,metadata:row.metadata})),conclusion:reload.conclusion,errors:reload.errors,cleanup:reload.cleanup},
 conclusion:'A fresh adventure produced blank presentation captures despite valid same-frame rendered pixels. Preserving the drawing buffer did not repair the captures. An ordinary reload of the same saved adventure restored visible presentation and native movement in one bounded run. This narrows the startup/lifecycle investigation; it is not a tested source correction, cadence pass, or physical Safari claim.',
};
const requestAuditFile=base+'/transfer-reuse/final-readonly-request-audit.json';
const compositeFile=base+'/transfer-reuse/composite-probe-2026-09-17T04-04-08-498Z/result.json',composite=await json(compositeFile);
const optimizationSupplements={
 qualification:false,
 requestAudit:{...await fingerprint(requestAuditFile),data:await json(requestAuditFile)},
 fullDetailComposite:{...await fingerprint(compositeFile),state:composite.state,qualification:composite.qualification,scope:composite.scope,sourceIdentities:composite.sourceIdentities,inventoryBindings:composite.inventoryBindings,limits:composite.limits,encoding:composite.encoding,sourcesUnchanged:composite.sourcesUnchanged,ownedBrowserClosed:composite.ownedBrowserClosed,responsiveComparisons:composite.responsiveComparisons,conclusion:composite.conclusion},
};
// Optional later executions stay separate from the fixed historical reports.
// EQ_STAGED_QUALIFICATION_SUPPLEMENTS points to a JSON descriptor:
// {schema:'evidence-quest.qualification-supplements.v1',entries:[
//  {id,label,kind:'browser-report'|'diagnostic-json'|'command-log',file,
//   scope,buildBinding?,status?}
// ]}. file/buildBinding are workspace-relative paths inside this evidence tree.
// A descriptor supplies provenance/scope, never an inferred all-green status.
function evidencePath(file){
 if(typeof file!=='string'||!file)throw Error('Missing supplement evidence path.');
 const resolved=path.resolve(file),root=path.resolve(base);
 if(resolved===root||!resolved.startsWith(root+path.sep))throw Error('Supplement must be retained inside the staged evidence tree: '+file);
 return file;
}
const supplements=[];let supplementDescriptor=null;
if(process.env.EQ_STAGED_QUALIFICATION_SUPPLEMENTS){
 const descriptorFile=evidencePath(process.env.EQ_STAGED_QUALIFICATION_SUPPLEMENTS),descriptor=await json(descriptorFile),ids=new Set();
 if(descriptor.schema!=='evidence-quest.qualification-supplements.v1'||!Array.isArray(descriptor.entries))throw Error('Invalid qualification supplement descriptor.');
 supplementDescriptor=await fingerprint(descriptorFile);
 for(const entry of descriptor.entries){
  if(!entry.id||ids.has(entry.id)||!entry.label||!entry.scope||!['browser-report','diagnostic-json','command-log'].includes(entry.kind))throw Error('Incomplete or duplicate qualification supplement.');
  ids.add(entry.id);const file=evidencePath(entry.file),buildBinding=entry.buildBinding?{...await fingerprint(evidencePath(entry.buildBinding)),data:await json(entry.buildBinding)}:null;
  const item={id:entry.id,label:entry.label,kind:entry.kind,scope:entry.scope,...await fingerprint(file),buildBinding,sourceScope:buildBinding?'EXPLICIT_RETAINED_BUILD_BINDING':'NOT_BOUND_TO_CURRENT_SOURCE',status:entry.status??null,qualification:false};
  if(entry.kind==='browser-report'){
   const data=await json(file),cases=flatten(data.suites??[]);
   if(!data.stats?.duration||!cases.length||cases.some(c=>!c.results?.length)||!cases.some(c=>c.results.some(r=>r.status!=='skipped')))throw Error('Incomplete or collection-only supplement: '+file);
   item.stats=data.stats;item.cases=cases;item.qualificationMeaning='Executed assertions for the explicitly recorded scope only; does not grant human approval or supersede broader retained failures.';
  }else if(entry.kind==='diagnostic-json')item.data=await json(file);
  else if(!entry.status)throw Error('Command-log supplement requires an explicit result status.');
  supplements.push(item);
 }
}
const commands=[
 ['npm ci','PASS','required/npm-ci.log'],
 ['npm run validate:content','PASS','required/validate-content.log'],
 ['npm run check','PASS','required/check-latest-source.log'],
 ['npm run build:server','PASS','required/build-server.log'],
 ['npm run test:contracts','PASS: 192/192','required/test-contracts-sixth.log'],
 ['npm run eval:coach -- --mode authored','PASS: 23, zero API calls','required/eval-coach.log'],
 ['npm run build','PASS after filesystem-permission rerun; initial sandbox failure retained','required/build-final-r2.log'],
 ['npm run test:browser','FAIL: 151 pass / 3 fail, frozen broad build; corrections are separate reports','required/test-browser.log'],
];
const affected=reports.find(report=>report.label==='final affected behavior'),studio=reports.find(report=>report.label==='isolated original-studio formats');
const retainedScopeSummary={
 build:'required/build-final-r2.log',binding:await fingerprint(base+'/final-affected-binding.json'),
 affected:affected.stats,actualGame:game.stats,studio:studio.stats,
 webkitDpr2Cadence:gameMetrics.filter(metric=>metric.project==='webkit-dpr2'&&metric.name==='garden-renderer-measurements').flatMap(metric=>metric.data.map(row=>({followP95Ms:row.render?.p95,overviewP95Ms:row.overview?.p95,dpr:row.dpr,checks:row.checks,limitMs:33.34}))),
 laterSourceCoverage:'NOT_INFERRED. Any lifecycle correction/new build must have its own executed supplement and retained build binding; these counts continue to describe their original reports.',
};
const output={schema:'evidence-quest.staged-qualification.v2',at:new Date().toISOString(),
 status:'CHECKPOINT_IMPLEMENTED_CHAPTER_ACCEPTANCE_OPEN',
 basis:'Separate executed scopes across frozen broad and explicitly retained build-final-r2 scopes. Diagnostic and later-build supplements never relabel earlier reports as testing new code. This is not a clean final full-suite rerun and never grants human Form or play approval.',
 commands:await Promise.all(commands.map(async([command,status,relative])=>({command,status,...await fingerprint(base+'/'+relative)}))),
 reports,gameMetrics,studioMetrics,retainedScopeSummary,presentationDiagnostics,optimizationSupplements,
 laterExecutionSupplements:{descriptor:supplementDescriptor,entries:supplements,policy:'Append separately attributed executions; retain original failures, unsupported scopes and build identities. No automatic all-green or latest-source qualification inference.'},
 focusedChecks:{contracts:192,authoredCoach:23,assetCharacterAndFormGate:35,pngDerivatives:await json(base+'/transfer-reuse/png-optimization.json')},
 story:{sourceCommit:'9ea8234665a4409aa6817f53f469fe4f2e689dd5',freshEdition:'literary-20260916',existingEditions:'preserved',stagedNotePrefix:'GA.SRC.SECTIONS.STAGED20260916.'},
 physicalCoverage:'Five original equal workstation arrangements are distinct from four ordinary village histories. BPFL is interrupted-state compatibility only; automatic growth does not provide a normal fifth village route.',
 approvals:{retained:['Pip R2-feet','Grandma R2-feet','village layout','original four references'],pendingForm:['boat','rooted flower','new gaits and construction actions','painted environment','Loop'],pendingReference:['Mara','Rina','Sol','boy','boat operator'],unfinished:'Remaining cast maquettes and Jo are studies, not finished or approved production models.'},
 limits:{initialBytes:4*1024*1024,compressedCoreBytes:1024*1024,locationBytes:3*1024*1024,sceneBytes:96*1024*1024,cacheBytes:192*1024*1024,openingMs:5000,activeP95Ms:33.34,inputMs:100,studioPng:'Existing Section10 authority: 5MiB opening / 4.25MiB room; not a new exception.'},
 budget:{recordedTripoCredits:290,newTripoJobs:0,newTripoCharges:0,totalCeiling:2500,allocations:[400,1600,500]},
 boundaries:{TASK11_19:'HALTED exactly 1/75',liveAIRequests:0,ownerPlayReview:'NOT_RUN',humanFormForPendingArt:'NOT_APPROVED',physicalDevicesAndAssistiveTechnology:'NOT_RUN',nativeWindowsWebKitAudio:'UNSUPPORTED by installed browser; fallback checks are distinct from native capture',webkitDpr2Presentation:'Retained final42 interaction assertions passed while fresh-start roof/dough/bridge captures were blank. Paired readback diagnostics retained valid pixels; same-save reload restored presentation in one run. Neither result qualifies a later startup fix or resolves the retained cadence failure.',publication:'NONE; local uncommitted workspace'},
};
const file=base+'/verification.json';
try{const previous=await fs.readFile(file);await fs.mkdir(base+'/finalization/archive',{recursive:true});await fs.writeFile(base+'/finalization/archive/verification-'+hash(previous)+'.json',previous,{flag:'wx'});}catch(error){if(!['ENOENT','EEXIST'].includes(error.code))throw error;}
await fs.writeFile(file,JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({file,reports:reports.map(({label,stats})=>({label,stats})),gameMetricRecords:gameMetrics.length,studioMetricRecords:studioMetrics.length}));
