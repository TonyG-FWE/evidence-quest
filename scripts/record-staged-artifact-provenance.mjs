/** Invoke after the final build, without concurrent source/asset writes:
 * node scripts/record-staged-artifact-provenance.mjs --after-final-build
 * This records artifact identity, never test completion or human approval. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';

if(process.argv.length!==3||process.argv[2]!=='--after-final-build')throw Error('Invoke only after the final build: node scripts/record-staged-artifact-provenance.mjs --after-final-build');
const root=process.cwd(),evidence='evidence/staged-bridge-20260916';
const output=evidence+'/final-artifact-provenance.json';
const reviewRoot='evidence/hands-on-20260916/pilot/chapter-review';
const storyCommit='9ea8234665a4409aa6817f53f469fe4f2e689dd5';
const hash=data=>createHash('sha256').update(data).digest('hex');
const posix=file=>file.split(path.sep).join('/');
const observed=[];
function workspaceFile(file){const resolved=path.resolve(root,file),relative=path.relative(root,resolved);if(relative.startsWith('..')||path.isAbsolute(relative))throw Error('Path leaves workspace: '+file);return resolved;}
async function record(file,{expected,optional=false}={}){
 let bytes;try{bytes=await fs.readFile(workspaceFile(file));}catch(error){if(optional&&error.code==='ENOENT')return {file,present:false};throw error;}
 const sha256=hash(bytes);if(expected&&sha256!==expected)throw Error('Hash binding mismatch: '+file);
 const result={file:posix(file),bytes:bytes.length,sha256};observed.push(result);return result;
}
async function json(file){return JSON.parse(await fs.readFile(workspaceFile(file),'utf8'));}
async function immediate(directory,pattern){return (await fs.readdir(workspaceFile(directory),{withFileTypes:true})).filter(entry=>entry.isFile()&&pattern.test(entry.name)).map(entry=>directory+'/'+entry.name).sort();}
const git=(...args)=>execFileSync('git',args,{cwd:root,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
const head=git('rev-parse','HEAD'),branch=git('branch','--show-current');
if(git('rev-parse',storyCommit+'^{commit}')!==storyCommit)throw Error('Preserved story commit is unavailable');

// Finite, immediate source directories only. No recursive evidence, cache,
// browser-output or original-art traversal occurs in this recorder.
const sourceFiles=new Set([
 'package.json','package-lock.json','vite.config.ts','playwright.config.ts',
 'playwright.staged-final-affected.config.ts','playwright.staged-performance.config.ts',
 'playwright.staged-studio-performance.config.ts','playwright.staged-blank-canvas.config.ts','playwright.staged-blank-reload.config.ts',
 'playwright.staged-world-presentation.config.ts',
 'scripts/record-staged-artifact-provenance.mjs','scripts/record-staged-qualification.mjs','scripts/image-codec.mjs',
 'scripts/export-production-art.mjs','scripts/export-garden-assets.mjs',
 'scripts/chapter-form-selection.mjs','scripts/build-chapter-form-review.mjs',
 'scripts/chapter-loop-candidate.ts','scripts/chapter-cast-studies.ts','scripts/chapter-cast-runtime.ts',
 'scripts/build-staged-demonstration.mjs','scripts/test-browser.mjs',
 'scripts/validate-garden.mjs','server/garden.ts','server/gardenWords.ts',
 'server/gardenSpeech.ts','src/core/serialized.ts',
 'docs/design/evidence-quest-design-v3/11-build-packet/implementation-plan.json',
 'docs/game-review/NARRATIVE-REVISION-20260916.md',
]);
for(const directory of ['src/garden','src/garden/assets','src/world'])for(const file of await immediate(directory,/\.(?:ts|tsx|css)$/))sourceFiles.add(file);
for(const file of await immediate('browser-tests',/^(?:garden-.+|garden|network-profile)\.spec\.ts$|^network-profile\.ts$/))sourceFiles.add(file);
if(sourceFiles.size>300)throw Error('Unexpected source inventory expansion; review the recorder scope');
const sources=await Promise.all([...sourceFiles].sort().map(file=>record(file)));

const characterApprovalFile='evidence/integrated-checkpoint-20260916/character-form-approval.json';
const characterApproval=await json(characterApprovalFile);
const approvedExpected={pip:'61006b3597984f6e8ceca9d08a0da39cd1e5ff14b407da439672262224024905',grandma:'173164a1639606f0565aca5e8caa22d177d365d6dfb5f1c0ea360f58eeff1a67'};
const approvedSources=[];
for(const [id,expected] of Object.entries(approvedExpected)){
 const item=characterApproval.assets.find(asset=>asset.id===id);
 if(!item||item.status!=='APPROVED'||item.sha256!==expected)throw Error('Approved R2 character record changed: '+id);
 approvedSources.push({id,...await record(item.file,{expected}),approvalStatus:item.status});
}
const approvedCharacters={receipt:await record(characterApprovalFile),reviewManifest:await record('evidence/hands-on-20260916/pilot/revision-r2/manifest.json'),sources:approvedSources};
const layoutApprovalFile='evidence/hands-on-20260916/pilot/approval.json',layoutApproval=await json(layoutApprovalFile);
const approvedLayoutAndReferences={receipt:await record(layoutApprovalFile),sources:await Promise.all(Object.entries(layoutApproval.hashes).map(([file,expected])=>record('evidence/hands-on-20260916/'+file,{expected})))};

const reviewFile=reviewRoot+'/manifest.json',review=await json(reviewFile);
const kit=review.pendingForm?.kit;
const dependencyFiles=['src/garden/art.ts','src/garden/worldLayout.ts','src/garden/worldArt.ts','src/garden/assets/naturalBoundary.ts'];
if(!kit||kit.dependencies?.length!==4||!dependencyFiles.every(file=>kit.dependencies.some(item=>item.file===file)))throw Error('Current environment review lacks its four exact dependencies');
const reviewBindings=await Promise.all([kit,...kit.dependencies].map(async item=>({current:await record(item.file,{expected:item.sha256}),archived:await record(item.archivedSource,{expected:item.sha256})})));
const propManifest=await record(review.currentPropReview.file,{expected:review.currentPropReview.sha256});
const props=await json(review.currentPropReview.file);
if(props.localKit.sha256!==kit.sha256||JSON.stringify(props.localKit.dependencies)!==JSON.stringify(kit.dependencies))throw Error('Consolidated/prop environment review bindings disagree');
const combined=review.pipCombined;
const pendingModels=[{id:'pip-chapter',...await record('evidence/hands-on-20260916'+combined.uri,{expected:combined.sha256})}];
for(const prop of review.pendingForm.props){const visual=props.props.find(item=>item.id===prop.id)?.visual;if(!visual||visual.sha256!==prop.sha256)throw Error('Pending prop identity mismatch: '+prop.id);pendingModels.push({id:prop.id,...await record('evidence/hands-on-20260916'+visual.uri,{expected:prop.sha256})});}
const referenceManifest=await json(reviewRoot+'/references/manifest-r1.json');
const appearanceReferences=await Promise.all(referenceManifest.records.map(async item=>{
 if(item.status!=='FUNCTION_REFERENCE_PENDING_APPROVAL')throw Error('Appearance reference status changed; review recorder scope before recording: '+item.id);
 return {id:item.id,...await record(item.destination,{expected:item.sha256}),status:item.status};
}));
const reviews={manifest:await record(reviewFile),propManifest,kitBindings:reviewBindings,pendingModels,referenceManifest:await record(reviewRoot+'/references/manifest-r1.json'),appearanceReferences,scopeReceipt:await record(evidence+'/chapter-review/review-package-summary.json'),pages:await Promise.all(['review.html','props-kit-r2/review.html','references/review.html','checkpoint.html'].map(file=>record(reviewRoot+'/'+file))),optionalApprovalReceipts:await Promise.all(['evidence/integrated-checkpoint-20260916/remaining-form-approval.json',evidence+'/chapter-form-approval.json'].map(file=>record(file,{optional:true}))),note:'Recording pending candidates or an optional receipt does not grant or expand Form approval.'};

const publicManifestFile='public/garden-assets/manifest.json',distManifestFile='dist/client/garden-assets/manifest.json';
const publicManifest=await record(publicManifestFile),distManifest=await record(distManifestFile,{expected:publicManifest.sha256});
const runtime=await json(distManifestFile);
const runtimeModels=await Promise.all(runtime.assets.map(async asset=>{
 if(asset.approval!=='approved'||!asset.uri.startsWith('/garden-assets/'))throw Error('Unexpected runtime asset approval/path: '+asset.id);
 return {id:asset.id,sourceSha256:asset.sourceSha256,anatomySha256:asset.anatomySha256??null,approvalReceipt:await record(asset.approvalRecord),source:await record(asset.resources.source,{expected:asset.sourceSha256}),public:await record('public'+asset.uri,{expected:asset.sha256}),dist:await record('dist/client'+asset.uri,{expected:asset.sha256})};
}));
const bundleFiles=await immediate('dist/client/assets',/-[A-Za-z0-9_-]{8,}\.[a-z0-9]+(?:\.(?:br|gz))?$/i);
if(bundleFiles.length===0||bundleFiles.length>250)throw Error('Unexpected final bundle inventory size');
const builtFiles=await Promise.all(bundleFiles.map(file=>record(file)));
const viteManifestFile='dist/client/.vite/manifest.json',viteManifest=await json(viteManifestFile);
const manifestedFiles=new Set(Object.values(viteManifest).flatMap(item=>[item.file,...(item.css??[]),...(item.assets??[])]));
for(const file of manifestedFiles)if(!builtFiles.some(item=>item.file==='dist/client/'+file))throw Error('Vite entry is missing from bounded dist inventory: '+file);
const distribution={directory:'dist/client',index:await record('dist/client/index.html'),viteManifest:await record(viteManifestFile),gardenManifest:distManifest,publicGardenManifest:publicManifest,productionArtManifest:await record('content/production-assets.json'),runtimeModels,hashedBundles:builtFiles,note:'Bounded immediate hashed-bundle list and manifest-selected 3D assets. Individual 2D derivatives remain indexed by the production art manifest; original art and output trees are not recursively hashed.'};

const budgetFile='evidence/hands-on-20260916/tripo-ledger.json';
const budgetRecord=await record(budgetFile,{expected:'5ba35958bda54b7bc392faf5e2c1ae36a2a26933e68696b5a93e42e3f0961639'}),budget=await json(budgetFile);
if(budget.actualCharged!==290||budget.reservedForUnresolved!==0||budget.ceiling!==2500||budget.allocations.pilot!==400||budget.allocations.production!==1600||budget.allocations.corrections!==500)throw Error('Authorized budget ledger changed');
const attemptFile='evidence/er13/live-evaluation/attempts.jsonl';
const attemptsRecord=await record(attemptFile,{expected:'17a4a6a57b5e1d54192320717e09f2c631a3eb052d1c1e62bc74c866bc877653'});
const events=(await fs.readFile(attemptFile,'utf8')).trim().split(/\r?\n/).map(line=>JSON.parse(line));
if(events.filter(item=>item.kind==='reserved').length!==1||!events.some(item=>item.kind==='halt'))throw Error('TASK11.19 is no longer the preserved halted ledger');
const ledgers={tripo:{record:budgetRecord,unchangedSincePreparation:true,actualCharged:budget.actualCharged,reservedForUnresolved:budget.reservedForUnresolved,ceiling:budget.ceiling,allocations:budget.allocations,jobCount:budget.jobs.length,balanceReceipt:await record('evidence/hands-on-20260916/pilot/balance-reconciliation.json')},task11_19:{record:attemptsRecord,unchangedSinceStorySnapshot:true,status:'HALTED',attempts:1,cap:75}};

const mergeFile=evidence+'/story-integration/merge-results.json',merge=await json(mergeFile);
if(merge.branch!==storyCommit)throw Error('Story reconciliation names a different source commit');
const snapshotPaths=['src/garden/literaryContent.ts','src/garden/literaryGlossary.ts','src/garden/narrativeDialogue.ts','src/garden/narrativeEdition.ts','docs/game-review/NARRATIVE-REVISION-20260916.md'];
const storySnapshot=[];
for(const file of snapshotPaths){const sourceBytes=execFileSync('git',['show',storyCommit+':'+file],{cwd:root,maxBuffer:2*1024*1024,stdio:['ignore','pipe','pipe']}),sourceSha256=hash(sourceBytes),saved=await record(evidence+'/story-integration/three-way/'+file+'.incoming',{expected:sourceSha256}),current=await record(file);storySnapshot.push({file,commit:storyCommit,sourceSha256,preserved:saved,current,unchangedFromIncoming:current.sha256===sourceSha256});}
const story={branch:'codex/deeper-garden-stories',commit:storyCommit,mergeBase:merge.base,mergeReceipt:await record(mergeFile),verificationReceipt:await record(evidence+'/story-integration/verification.json'),contentManifest:await record(evidence+'/story-integration/content-manifest.json'),snapshot:storySnapshot};
const preservation={baseline:await record(evidence+'/baseline.json'),originalImport:await record('evidence/design-import.json'),previousCheckpointReview:await record('evidence/hands-on-20260916/pilot/checkpoint-review/manifest.json'),note:'Existing baseline, rejected candidates, source art and failed verification records are retained. This recorder does not enumerate or replace those historical trees.'};

// Refuse a mixed snapshot if any bounded input changed while it was read.
for(const item of observed)if(hash(await fs.readFile(workspaceFile(item.file)))!==item.sha256)throw Error('Input changed during provenance recording: '+item.file);
const result={schema:'evidence-quest.staged-artifact-provenance.v1',recordedAt:new Date().toISOString(),scope:'Exact identities recorded after the requested final build. This record does not assert test completion, full qualification, owner play acceptance or new Form approval.',repository:{branch,head,dirtyWorkspacePreserved:true},sources,sourceSetSha256:hash(JSON.stringify(sources.map(({file,sha256})=>({file,sha256})))),approvedCharacters,approvedLayoutAndReferences,reviews,distribution,ledgers,story,preservation,qualification:'NOT_EVALUATED_BY_THIS_RECORDER'};
let previous;try{previous=await fs.readFile(output);}catch(error){if(error.code!=='ENOENT')throw error;}
if(previous){const history=evidence+'/final-artifact-provenance-history';await fs.mkdir(history,{recursive:true});await fs.writeFile(history+'/'+hash(previous)+'.json',previous,{flag:'wx'}).catch(error=>{if(error.code!=='EEXIST')throw error;});}
await fs.writeFile(output,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({file:output,sha256:hash(await fs.readFile(output)),sourceFiles:sources.length,bundles:builtFiles.length,approvedModels:approvedSources.length,qualification:result.qualification},null,2));
