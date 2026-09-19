/** Source-only preparation audit. Does not build, import the recorder, read
 * browser results, grant approval, or mutate production assets. */
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const directory='evidence/staged-bridge-20260916/finalization';
const records=[],checks=[],failures=[];
async function fileRecord(file,expected){const data=await fs.readFile(file),sha256=hash(data);records.push({file,sha256,bytes:data.length});if(expected)assert.equal(sha256,expected,file);return data;}
const json=async file=>JSON.parse(await fileRecord(file));
async function check(name,body){try{await body();checks.push({name,status:'PASS'});}catch(error){checks.push({name,status:'FAIL',error:String(error.message)});failures.push(name);}}
const source=await fs.readFile('scripts/record-staged-artifact-provenance.mjs','utf8');
const staticPaths=[...source.split('const sourceFiles=new Set([')[1].split(']);')[0].matchAll(/'([^']+)'/g)].map(match=>match[1]);
await check('All explicitly listed recorder source files resolve',async()=>{for(const file of staticPaths)await fileRecord(file);});
await check('Approved R2 sources retain the exact human-approved hashes',async()=>{
 const approval=await json('evidence/integrated-checkpoint-20260916/character-form-approval.json');
 const expected={pip:'61006b3597984f6e8ceca9d08a0da39cd1e5ff14b407da439672262224024905',grandma:'173164a1639606f0565aca5e8caa22d177d365d6dfb5f1c0ea360f58eeff1a67'};
 for(const [id,sha] of Object.entries(expected)){const record=approval.assets.find(item=>item.id===id);assert(record);assert.equal(record.status,'APPROVED');assert.equal(record.sha256,sha);await fileRecord(record.file,sha);}
});
await check('Approved layout and all four reference originals match their existing receipt',async()=>{const approval=await json('evidence/hands-on-20260916/pilot/approval.json');assert.equal(Object.keys(approval.hashes).length,11);for(const [file,sha] of Object.entries(approval.hashes))await fileRecord('evidence/hands-on-20260916/'+file,sha);});
await check('Current kit and four source dependencies match current and archived review bindings',async()=>{
 const review=await json('evidence/hands-on-20260916/pilot/chapter-review/manifest.json'),kit=review.pendingForm.kit;
 assert.deepEqual(kit.dependencies.map(item=>item.file).sort(),['src/garden/art.ts','src/garden/worldLayout.ts','src/garden/worldArt.ts','src/garden/assets/naturalBoundary.ts'].sort());
 for(const item of [kit,...kit.dependencies]){await fileRecord(item.file,item.sha256);await fileRecord(item.archivedSource,item.sha256);}
 const props=JSON.parse(await fileRecord(review.currentPropReview.file,review.currentPropReview.sha256));assert.deepEqual(props.localKit,kit);
 for(const prop of review.pendingForm.props){const candidate=props.props.find(item=>item.id===prop.id).visual;assert.equal(candidate.sha256,prop.sha256);await fileRecord('evidence/hands-on-20260916'+candidate.uri,prop.sha256);}
 await fileRecord('evidence/hands-on-20260916'+review.pipCombined.uri,review.pipCombined.sha256);
});
await check('Five appearance references retain explicit pending FUNCTION status and original output bytes',async()=>{
 const refs=await json('evidence/hands-on-20260916/pilot/chapter-review/references/manifest-r1.json');assert.equal(refs.records.length,5);
 for(const item of refs.records){assert.equal(item.status,'FUNCTION_REFERENCE_PENDING_APPROVAL');await fileRecord(item.destination,item.sha256);await fileRecord(item.source,item.sha256);}
 assert(source.includes("status:item.status"));assert(source.includes("item.status!=='FUNCTION_REFERENCE_PENDING_APPROVAL'"));
});
await check('Unapproved artwork remains gated and no new approval receipt exists',async()=>{
 for(const file of ['evidence/integrated-checkpoint-20260916/remaining-form-approval.json','evidence/staged-bridge-20260916/chapter-form-approval.json']){await assert.rejects(fs.access(file),error=>error.code==='ENOENT');}
 const manifest=await json('public/garden-assets/manifest.json');assert.deepEqual(manifest.assets.map(item=>item.id).sort(),['grandma','pip']);
 for(const item of manifest.assets){assert.equal(item.approval,'approved');assert.equal(item.sourceSha256,item.anatomySha256);assert.equal(item.approvalRecord,'evidence/integrated-checkpoint-20260916/character-form-approval.json');await fileRecord(item.resources.source,item.sourceSha256);}
 const finish=await fs.readFile('src/garden/assets/runtimeFinish.ts','utf8');assert(finish.includes('=>null'));assert(!finish.includes("import {makePaintedVillageKit}"));
});
await check('Tripo 290-credit and halted 1-of-75 provider ledgers remain byte-identical',async()=>{
 await fileRecord('evidence/hands-on-20260916/tripo-ledger.json','5ba35958bda54b7bc392faf5e2c1ae36a2a26933e68696b5a93e42e3f0961639');
 await fileRecord('evidence/er13/live-evaluation/attempts.jsonl','17a4a6a57b5e1d54192320717e09f2c631a3eb052d1c1e62bc74c866bc877653');
});
const result={at:new Date().toISOString(),scope:'Source approval and recorder-input preparation only; no build, browser, performance measurement, final artifact recording or approval.',staticPaths:staticPaths.length,checks,records,finalArtifactRecorderInvoked:false,productionWrites:false,qualification:'NOT_EVALUATED'};
await fs.mkdir(directory,{recursive:true});const destination=directory+'/source-approval-audit.json';
try{const previous=await fs.readFile(destination);await fs.writeFile(directory+'/source-approval-audit-'+hash(previous)+'.json',previous,{flag:'wx'}).catch(error=>{if(error.code!=='EEXIST')throw error;});}catch(error){if(error.code!=='ENOENT')throw error;}
await fs.writeFile(destination,JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({file:destination,checks,recordedFiles:records.length,qualification:result.qualification},null,2));if(failures.length)process.exitCode=1;
