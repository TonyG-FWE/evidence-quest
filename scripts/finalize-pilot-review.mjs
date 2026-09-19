import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {readGlb} from './pilot-glb.mjs';
const root=path.resolve('evidence/hands-on-20260916');
try{await fs.access(path.join(root,'pilot/character-rejection.json'));throw Error('R1 character Form review was rejected. Use the corrected revision review; do not restore the old READY status.');}catch(error){if(error.code!=='ENOENT')throw error;}
const read=async name=>JSON.parse(await fs.readFile(path.join(root,name),'utf8'));
const write=async(name,value)=>fs.writeFile(path.join(root,name),JSON.stringify(value,null,2)+'\n');
const hash=async file=>createHash('sha256').update(await fs.readFile(file)).digest('hex');
const manifest=await read('pilot/review-manifest.json'),approval=await read('pilot/approval.json'),ledger=await read('tripo-ledger.json'),balance=await read('pilot/balance-reconciliation.json'),browser=await read('pilot/browser-results.json');
if(browser.stats.expected!==12||browser.stats.unexpected||browser.stats.skipped||browser.stats.flaky)throw Error('Final review browser matrix is incomplete');
for(const file of ['pilot/model-review.js','pilot/model-review.html','pilot/runtime/visualAsset.js','pilot/review-manifest.json'])if(Date.parse(browser.stats.startTime)<(await fs.stat(path.join(root,file))).mtimeMs)throw Error('Browser report predates reviewed source: '+file);
if(ledger.actualCharged!==290||ledger.reservedForUnresolved!==0||ledger.jobs.some(j=>j.status!=='SUCCESS'))throw Error('Pilot ledger requires review');
for(const [file,expected] of Object.entries(approval.hashes))if(await hash(path.join(root,file))!==expected)throw Error('Approved layout/reference changed: '+file);
const commands=[];
for(const [name,args] of [['pilot-contracts',['--test','scripts/tripo-pilot.test.mjs','scripts/pilot-visual.test.mjs']],['pilot-types',['node_modules/typescript/bin/tsc','-p','tsconfig.client.json','--noEmit']]]){
 const run=spawnSync(process.execPath,args,{encoding:'utf8',windowsHide:true});
 await fs.writeFile(path.join(root,'pilot',name+'.log'),run.stdout+run.stderr);
 commands.push({command:['node',...args].join(' '),exitCode:run.status,log:'pilot/'+name+'.log'});
 if(run.status!==0)throw Error(name+' failed');
}
function dimensions(bytes){
 let offset=2;
 while(offset<bytes.length){
  if(bytes[offset]!==255)throw Error('Invalid JPEG marker');
  const marker=bytes[offset+1];if([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker))return {width:bytes.readUInt16BE(offset+7),height:bytes.readUInt16BE(offset+5)};
  offset+=2+bytes.readUInt16BE(offset+2);
 }
 throw Error('JPEG dimensions not found');
}
const models=[];
for(const asset of manifest.assets){
 const file=asset.files.find(f=>f.operation==='local-review');
 if(await hash(path.join(root,file.path))!==file.sha256)throw Error('Reviewed model changed');
 const glb=await readGlb(path.join(root,file.path));
 const images=glb.json.images.map(image=>{const view=glb.json.bufferViews[image.bufferView],bytes=glb.bin.subarray(view.byteOffset??0,(view.byteOffset??0)+view.byteLength);return {...dimensions(bytes),sha256:createHash('sha256').update(bytes).digest('hex')};});
 if(images.some(image=>image.width!==2048||image.height!==2048))throw Error('Unexpected texture size');
 models.push({id:asset.id,review:file.path,reviewSha256:file.sha256,source:asset.intake.source,sourceSha256:asset.intake.sourceSha256,blend:asset.intake.blend,blendSha256:await hash(path.join(root,asset.intake.blend)),triangles:file.triangles,requestedTriangleTarget:asset.targetPolycount,sourceGeometryPreserved:true,sourceTextureBytesPreserved:true,images,animations:file.animations,normalizedHeightMetres:asset.dimensions[1],credits:asset.credits});
}
const record={schema:'evidence-quest.asset-pilot-verification.v1',date:new Date().toISOString(),status:'READY_FOR_HUMAN_FORM_REVIEW',scope:'Four generated models and the review adapter only. No production game integration or final gameplay/performance qualification.',approval:{record:'pilot/approval.json',unchangedHashes:Object.keys(approval.hashes).length,humanFormApproval:false},budget:{charged:ledger.actualCharged,pilotRemaining:400-ledger.actualCharged,totalRemaining:2500-ledger.actualCharged,reserved:0,unresolvedJobs:0,providerBalance:balance.balance},models,checks:{commands,unitTests:13,browserCases:12,browserProjects:browser.config.projects.map(p=>p.name),browserReport:'pilot/browser-results.json',reviewManifestSha256:await hash(path.join(root,'pilot/review-manifest.json')),allSides:true,actualGameCameraScale:true,handContactAcrossFullWalkCycle:true,cradleContact:true,rootContact:true,localRigRepairs:'pilot/review-sources/*/intake.json'},production:{exported:false,integrated:false,formApproval:'PENDING',completeChapterAcceptance:'NOT_RUN',eightRequiredCommandsAfterIntegration:'NOT_RUN_PENDING_FORM_AND_INTEGRATION',fiveArrangementsAndNineNarratives:'Previous development evidence retained; rerun after integration',existingWebkitDpr2Failure:'OPEN: game RAF p95 39ms exceeds unchanged 33.34ms limit',sourceTextureRgbaMipEstimateMiB:256,sceneLimitMiB:96,cacheLimitMiB:192,texturePlan:'Preserve original 2K images; qualify GPU compressed production tiers after Form approval. Raw review sources are not runtime-qualified.',task11_19:'HALTED_1_OF_75_NO_REQUESTS'},knownDifferences:['Lantern flower source is 46 triangles above its requested 4500-triangle target; boat is 18 above.','Generated Grandma profile is flatter than Pip; all-side review is explicitly included.','The working game camera shows small characters at walking distance; closer activity framing still needs evaluation in the integrated world.'],localCorrections:['Backpack influences moved from an erroneous limb onto Pip torso.','Grandma palm vertices detached from an erroneous foot chain; duplicate leg influences corrected.','Grandma paper skirt and cream hem stabilized without changing mesh topology or original textures.','Review meshes uniformly normalized to metre scale, grounded, with semantic front and geometry-sampled contact anchors.'],initialFailures:['Firefox sandbox launch failed with RenderCompositorSWGL framebuffer mapping; native graphics permissions resolved startup. Initial report retained.','An intermediate skirt bound included low palm vertices. Actual hand-contact test failed; the selection was narrowed below hand height and all final tests pass.'],ownerReview:{animated:'http://127.0.0.1:4318/',sheets:'http://127.0.0.1:4318/pilot/review-sheets.html',preview:'pilot/overview.png',screenshots:48}};
await write('pilot/verification.json',record);
const props=await read('props.json');props.generation.submissionStatus='PILOT_COMPLETE_FORM_PENDING';props.generation.actualCredits=290;props.generation.maxGenerationAttemptsPerAsset=2;delete props.generation.maxChargedAttemptsPerAsset;
for(const asset of props.assets){const model=models.find(m=>m.id===asset.id);asset.formReview={status:'AWAITING_HUMAN_APPROVAL',reviewModel:model.review,reviewSha256:model.reviewSha256,sourcePreserved:true,reviewSheet:`pilot/${asset.id}-review-sheet.png`,verification:'pilot/verification.json'};}
await write('props.json',props);
const reviews=await read('milestone-reviews.json');reviews.form={status:'awaiting-human-approval',scope:'Pip, Grandma, rooted lantern flower and seed boat pilot',evidence:['pilot/model-review.html','pilot/review-sheets.html','pilot/overview.png','pilot/verification.json'],humanApproval:false};await write('milestone-reviews.json',reviews);
const report=await read('final-report.json');Object.assign(report,{status:'PILOT_READY_FOR_HUMAN_FORM_REVIEW',actualCredits:290,unresolvedJobs:[],formChecks:{scope:'Asset pilot candidates',automatedChecks:'pilot/verification.json',ownerApproval:'PENDING'},runtimeChecks:{status:'NOT_RUN_PENDING_FORM_AND_INTEGRATION'},limitations:record.knownDifferences.concat(['Raw source texture memory is not qualified for runtime.','Full chapter verification and WebKit DPR2 performance correction remain open.','TASK11.19 remains halted at 1/75.'])});await write('final-report.json',report);
console.log(JSON.stringify({status:record.status,credits:record.budget,unitTests:13,browserCases:12,models:models.map(m=>({id:m.id,sha256:m.reviewSha256}))},null,2));
