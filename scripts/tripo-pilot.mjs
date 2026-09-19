import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash, randomUUID} from 'node:crypto';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root=path.resolve('evidence/hands-on-20260916');
const read=async name=>JSON.parse(await fs.readFile(path.join(root,name),'utf8'));
const atomic=async(name,value)=>{const file=path.join(root,name),temporary=file+'.pending';await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(temporary,JSON.stringify(value,null,2)+'\n');await fs.rename(temporary,file);};
const hash=async file=>createHash('sha256').update(await fs.readFile(file)).digest('hex');
const clean=value=>String(value).replace(/tsk_[A-Za-z0-9_.*-]+/g,'[REDACTED]');
const unresolved=job=>['SUBMITTING','UNRESOLVED'].includes(job.status);

export function guardPilot(ledger,estimate){
 if(!Number.isFinite(estimate)||estimate<0)throw Error('Invalid estimate');
 if(ledger.jobs.some(unresolved))throw Error('Unresolved submission blocks another request');
 const charged=ledger.jobs.reduce((sum,job)=>sum+(job.actualCredits??0),0);
 if(charged!==ledger.actualCharged)throw Error('Ledger total mismatch');
 const phase=ledger.jobs.filter(job=>job.phase==='pilot').reduce((sum,job)=>sum+(job.actualCredits??0),0);
 if(charged+estimate>ledger.ceiling||phase+estimate>ledger.allocations.pilot)throw Error('Credit ceiling would be exceeded');
}

async function cli(args,onTaskCreated){
 const npm=path.resolve('.tools/node-v24.21.0-win-x64/node_modules/npm/bin/npm-cli.js');
 const child=spawn(process.execPath,[npm,'exec','--yes','--package=tripo-cli@0.4.0','--','tripo',...args],{
  cwd:process.cwd(),windowsHide:true,env:{...process.env,PATH:path.dirname(process.execPath)+path.delimiter+process.env.PATH},stdio:['ignore','pipe','pipe']
 });
 let stdout='',stderr='',seenTask=false,taskWrite=Promise.resolve();child.stdout.on('data',chunk=>{stdout+=chunk.toString();});child.stderr.on('data',chunk=>{const text=clean(chunk);stderr+=text;process.stderr.write(text);const match=stderr.match(/task created ([0-9a-f-]{36})/i);if(match&&!seenTask&&onTaskCreated){seenTask=true;taskWrite=onTaskCreated(match[1]);}});
 const code=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',resolve);});
 await taskWrite;
 const lines=stdout.trim().split(/\r?\n/);let result=null;for(const line of lines.toReversed()){try{result=JSON.parse(line);break;}catch{}}
 return {code,result,stdout:clean(stdout),stderr};
}

async function approve(){
 const reviews=await read('milestone-reviews.json'),props=await read('props.json'),ledger=await read('tripo-ledger.json');
 if(reviews.function.approvedBy)throw Error('Approval is already recorded; preserve it');
 if(ledger.jobs.length)throw Error('Unexpected existing jobs before approval');
 const now=new Date().toISOString(),quote='The layout/reference are approved';
 const files=['review.html','floor-plan.svg','reflected-canopy.svg','orientation-map.svg','openings.html','room-layout.json','room-brief.json',...props.assets.map(asset=>asset.image.source)];
 const hashes={};for(const file of files)hashes[file]=await hash(path.join(root,file));
 const approval={schema:'evidence-quest.asset-pilot-approval.v1',recordedAt:now,approvedBy:'Tony Guillaro',quote,scope:'Village layout and all four references; confirmed by the subsequent explicit implementation request.',hashes,budget:{pilot:400,total:2500},providerOverride:'Tripo explicitly selected instead of the skill default Meshy. No Meshy requests.',formApproval:'NOT_YET_REQUESTED'};
 await atomic('pilot/approval.json',approval);
 Object.assign(reviews.function,{status:'approved',approvedBy:approval.approvedBy,approvedAt:now,approvalQuote:quote,approvalRecord:'pilot/approval.json'});
 for(const asset of props.assets)Object.assign(asset.image,{approved:true,approvedBy:approval.approvedBy,approvedAt:now,sha256:hashes[asset.image.source]});
 props.generation.submissionStatus='APPROVED_NOT_SUBMITTED';props.generation.pricingVerifiedAt=now;
 await atomic('props.json',props);await atomic('milestone-reviews.json',reviews);
 console.log(JSON.stringify({approval:'recorded',assets:props.assets.map(asset=>asset.id),hashes:Object.keys(hashes).length,creditsCharged:0}));
}

async function submit(operation,id){
 const props=await read('props.json'),reviews=await read('milestone-reviews.json'),ledger=await read('tripo-ledger.json');
 const asset=props.assets.find(item=>item.id===id);if(!asset)throw Error('Unknown pilot asset');
 if(reviews.function.status!=='approved'||!asset.image.approved)throw Error('Layout and reference approval required');
 if(await hash(path.join(root,asset.image.source))!==asset.image.sha256)throw Error('Approved image changed');
 if(ledger.jobs.some(job=>job.assetId===id&&job.operation===operation))throw Error('Existing attempt: inspect/reconcile it; automatic repeat is prohibited');
 const base=ledger.jobs.find(job=>job.assetId===id&&job.operation==='make'&&job.status==='SUCCESS');
 const check=ledger.jobs.find(job=>job.assetId===id&&job.operation==='rig-check'&&job.status==='SUCCESS');
 const rig=ledger.jobs.find(job=>job.assetId===id&&job.operation==='rig'&&job.status==='SUCCESS');
 const output=path.join(root,'pilot','sources',id);
 let estimate,args;
 if(operation==='make'){
  estimate=50;args=['make',path.join(root,asset.image.source),'--model','tripo-p1','-p',`face_limit=${asset.targetPolycount}`,'-p','texture=true','-p','pbr=true','-p','texture_quality=standard','-p','texture_alignment=original_image'];
 }else{
  if(!base?.taskId)throw Error('Successful base generation required');
  if(!asset.preliminaryReview?.checkedAt)throw Error('Inspect the base mesh preview before processing');
  if(operation==='rig-check'){estimate=0;args=['anim','check',base.taskId];}
  else if(operation==='rig'){
   const verdict=check?.taskDetails?.output??check?.result?.output??check?.result;
   if(verdict?.riggable!==true)throw Error('A passing free rig check is required');
   estimate=25;args=['anim','rig',base.taskId,'--rig-type',verdict.rig_type,'--spec','tripo','--out-format','glb'];
  }else if(operation==='animate'){
   if(!rig?.taskId)throw Error('Successful rig required');
   estimate=20;args=['anim','retarget',rig.taskId,'--animation','preset:idle','preset:walk','--out-format','glb','--animate-in-place'];
  }else throw Error('Unsupported operation');
 }
 guardPilot(ledger,estimate);
 const balance=await cli(['balance','--json']);
 if(balance.code!==0||!Number.isFinite(balance.result?.balance)||balance.result.balance<estimate)throw Error('Balance verification failed');
 const entry={id:randomUUID(),assetId:id,operation,phase:'pilot',status:'SUBMITTING',startedAt:new Date().toISOString(),estimatedCredits:estimate,reservedCredits:estimate,actualCredits:null,taskId:null,referenceSha256:asset.image.sha256,balanceBefore:balance.result,command:['tripo',...args,'--json','--yes','--no-open','-o',output]};
 ledger.jobs.push(entry);ledger.reservedForUnresolved+=estimate;
 await atomic(`pilot/attempts/${entry.id}.submission.json`,entry);await atomic('tripo-ledger.json',ledger);
 console.log(JSON.stringify({submission:operation,asset:id,reservedCredits:estimate,attempt:entry.id}));
 let response;
 try{response=await cli([...args,'--json','--yes','--no-open','-o',output],async taskId=>{entry.taskId=taskId;entry.taskIdRecordedAt=new Date().toISOString();await atomic('tripo-ledger.json',ledger);});}catch(error){entry.status='UNRESOLVED';entry.error=clean(error.message);await atomic('tripo-ledger.json',ledger);throw error;}
 await atomic(`pilot/attempts/${entry.id}.response.json`,response);
 entry.finishedAt=new Date().toISOString();entry.exitCode=response.code;entry.result=response.result;entry.taskId=response.result?.task_id??entry.taskId??null;
 const cost=operation==='rig-check'&&response.code===0?0:response.result?.credits_consumed;
 if(response.code===0&&Number.isFinite(cost)&&cost>=0){
  entry.status='SUCCESS';entry.actualCredits=cost;entry.reservedCredits=0;
  ledger.actualCharged+=cost;ledger.reservedForUnresolved-=estimate;
  asset.attempts.push({attemptId:entry.id,operation,taskId:entry.taskId,actualCredits:cost,resultFile:`pilot/attempts/${entry.id}.response.json`});
 }else entry.status='UNRESOLVED';
 if(operation==='rig-check'&&entry.taskId&&response.code===0){const details=await cli(['task','get',entry.taskId,'--json']);if(details.code===0)entry.taskDetails=details.result;}
 const after=await cli(['balance','--json']);entry.balanceAfter=after.code===0?after.result:null;
 await atomic('tripo-ledger.json',ledger);await atomic('props.json',props);
 console.log(JSON.stringify({asset:id,operation,status:entry.status,taskId:entry.taskId,actualCredits:entry.actualCredits,totalCharged:ledger.actualCharged,reserved:ledger.reservedForUnresolved,result:response.result}));
 if(entry.status!=='SUCCESS')process.exitCode=1;
}

async function main(){
 const [operation,id,...notes]=process.argv.slice(2);
 if(operation==='reconcile'){
  const ledger=await read('tripo-ledger.json');guardPilot(ledger,0);
  const response=await cli(['balance','--json']);if(response.code!==0)throw Error('Balance reconciliation failed');
  const record={schema:'evidence-quest.pilot-balance.v1',checkedAt:new Date().toISOString(),actualCharged:ledger.actualCharged,reserved:ledger.reservedForUnresolved,jobs:ledger.jobs.length,unresolved:ledger.jobs.filter(unresolved).map(job=>job.taskId),balance:response.result};
  await atomic('pilot/balance-reconciliation.json',record);console.log(JSON.stringify(record));return;
 }
 if(operation==='approve')return approve();
 if(operation==='refresh-checks'){
  const ledger=await read('tripo-ledger.json');
  for(const job of ledger.jobs.filter(job=>job.operation==='rig-check'&&job.status==='SUCCESS'&&!job.taskDetails)){
   const details=await cli(['task','get',job.taskId,'--json']);if(details.code!==0||details.result?.task_id!==job.taskId)throw Error('Rig-check readback failed');job.taskDetails=details.result;await atomic('tripo-ledger.json',ledger);console.log(JSON.stringify({asset:job.assetId,verdict:job.taskDetails.output}));
  }return;
 }
 if(operation==='inspect'){
  if(!notes.length)throw Error('Inspection note required');
  const props=await read('props.json'),asset=props.assets.find(item=>item.id===id);if(!asset)throw Error('Unknown asset');
  asset.preliminaryReview={checkedAt:new Date().toISOString(),reviewer:'Codex',status:'CANDIDATE_FOR_FORM_REVIEW',note:notes.join(' '),humanFormApproval:false};await atomic('props.json',props);console.log(JSON.stringify(asset.preliminaryReview));return;
 }
 if(operation==='status'){console.log(JSON.stringify(await read('tripo-ledger.json'),null,2));return;}
 await submit(operation,id);
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(error=>{console.error(clean(error.stack));process.exitCode=1;});
