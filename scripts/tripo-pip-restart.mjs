// Job bookkeeping only. Tripo creates every mesh, texture, rig and animation.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash, randomUUID} from 'node:crypto';
import {spawn} from 'node:child_process';

const root=path.resolve('evidence/hands-on-20260916');
const dir=path.join(root,'pilot/pip-tripo-restart-20260917');
const ledgerFile=path.join(root,'tripo-ledger.json');
const reference=path.join(root,'pilot/reference-library-20260917/images/pip-r1.png');
const referenceHash='5a265f5f80e6c1aa1ae1cb281f8c3f80d782d91fe73f527585f1829ca00cad48';
const revision='pip-tripo-p2-20260917';
const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const write=async(p,value)=>{await fs.mkdir(path.dirname(p),{recursive:true});await fs.writeFile(p+'.pending',JSON.stringify(value,null,2)+'\n');await fs.rename(p+'.pending',p);};
const sha=async p=>createHash('sha256').update(await fs.readFile(p)).digest('hex');
const clean=s=>String(s).replace(/tsk_[A-Za-z0-9_.*-]+/g,'[REDACTED]');
const relative=p=>path.relative(process.cwd(),p).replaceAll('\\','/');

async function cli(args,onTask){
 const npm=path.resolve('.tools/node-v24.21.0-win-x64/node_modules/npm/bin/npm-cli.js');
 const child=spawn(process.execPath,[npm,'exec','--offline','--yes','--package=tripo-cli@0.4.0','--','tripo',...args],{windowsHide:true,cwd:process.cwd(),env:{...process.env,PATH:path.dirname(process.execPath)+path.delimiter+process.env.PATH},stdio:['ignore','pipe','pipe']});
 let stdout='',stderr='',recorded=false,persist=Promise.resolve();
 child.stdout.on('data',c=>{stdout+=clean(c);});
 child.stderr.on('data',c=>{const text=clean(c);stderr+=text;process.stderr.write(text);const m=stderr.match(/task created\s+((?:task_)?[a-z0-9-]+)/i);if(m&&!recorded&&onTask){recorded=true;persist=onTask(m[1]);}});
 const code=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',resolve);});await persist;
 let result=null;for(const line of stdout.trim().split(/\r?\n/).toReversed()){try{result=JSON.parse(line);break;}catch{}}
 return {code,result,stdout,stderr};
}

async function main(){
 const [op,...notes]=process.argv.slice(2);
 await fs.mkdir(dir,{recursive:true});
 if(op==='doctor'||op==='balance'){
  const response=await cli([op,'--json']);await write(path.join(dir,`${op}-${Date.now()}.json`),response);console.log(response.stdout);process.exitCode=response.code;return;
 }
 const ledger=await read(ledgerFile),jobs=ledger.jobs.filter(j=>j.revision===revision);
 if(await sha(reference)!==referenceHash)throw Error('Approved reference hash mismatch');
 if(op==='inspect'){
  const operation=notes.shift(),job=jobs.find(j=>j.operation===operation&&j.status==='SUCCESS');
  if(!job?.result?.model_file||!notes.length)throw Error('A completed model and actual visual inspection note are required');
  if(job.inspection)throw Error('Inspection already recorded');
  job.inspection={at:new Date().toISOString(),reviewer:'Codex',note:notes.join(' '),status:'PASS_TO_NEXT_TRIPO_STEP',sha256:await sha(job.result.model_file),humanFormApproval:false};
  await write(ledgerFile,ledger);await write(path.join(dir,`${operation}-inspection.json`),job.inspection);console.log(JSON.stringify(job.inspection));return;
 }
 const costs={generate:110,'rig-check':0,rig:25,animate:20};
 if(!(op in costs)||!notes.includes('--confirm-spend'))throw Error('Use generate, rig-check, rig or animate --confirm-spend');
 if(jobs.some(j=>j.operation===op))throw Error('Operation already submitted: inspect the existing job, never automatically resubmit');
 if(ledger.reservedForUnresolved!==0||ledger.jobs.some(j=>['SUBMITTING','UNRESOLVED'].includes(j.status)))throw Error('Unresolved job blocks submission');
 const sum=list=>list.reduce((n,j)=>n+(j.actualCredits??0),0),estimate=costs[op];
 if(sum(ledger.jobs)!==ledger.actualCharged)throw Error('Ledger mismatch');
 if(sum(jobs)+estimate>155||sum(ledger.jobs.filter(j=>j.phase==='corrections'))+estimate>ledger.allocations.corrections||ledger.actualCharged+estimate>ledger.ceiling)throw Error('Authorized budget exceeded');
 const base=jobs.find(j=>j.operation==='generate'&&j.status==='SUCCESS');
 const check=jobs.find(j=>j.operation==='rig-check'&&j.status==='SUCCESS');
 const rig=jobs.find(j=>j.operation==='rig'&&j.status==='SUCCESS');
 let args;
 if(op==='generate')args=['generate','image-to-model',reference,'--model','tripo-p2','-p','texture=true','-p','pbr=true','-p','texture_quality=standard','-p','texture_alignment=original_image','-p','enable_image_autofix=false','--name','pip-p2-restart'];
 else{
  if(!base?.taskId||!base.inspection)throw Error('Untouched generated mesh must be inspected before continuing');
  if(op==='rig-check')args=['anim','check',base.taskId];
  else if(op==='rig'){
   if(check?.taskDetails?.output?.riggable!==true||check.taskDetails.output.rig_type!=='biped')throw Error('Passing biped rig check required');
   args=['anim','rig',base.taskId,'-p','model=v1.0-20240301','--rig-type','biped','--spec','tripo','--out-format','glb'];
  }else{
   if(!rig?.taskId||!rig.inspection)throw Error('Untouched rig must be inspected before animation');
   args=['anim','retarget',rig.taskId,'--animation','preset:biped:idle','preset:biped:walk','--out-format','glb','--animate-in-place','-p','bake_animation=true','-p','export_with_geometry=true'];
  }
 }
 const balance=await cli(['balance','--json']);
 if(balance.code!==0||!Number.isFinite(balance.result?.balance)||balance.result.balance<estimate||balance.result.frozen!==0)throw Error('Account balance/frozen-credit preflight failed');
 const output=path.join(dir,op);
 args.push('--json','--yes','--no-open','-o',output);
 const job={id:randomUUID(),assetId:'pip',revision,operation:op,phase:'corrections',status:'SUBMITTING',startedAt:new Date().toISOString(),estimatedCredits:estimate,reservedCredits:estimate,actualCredits:null,taskId:null,referenceFile:relative(reference),referenceSha256:referenceHash,balanceBefore:balance.result,command:['tripo',...args],pricing:{verifiedOn:'2026-09-17',generation:'https://developers.tripo3d.ai/en/docs/changelog',processing:'https://developers.tripo3d.ai/en/pricing'},productionIntegrationAllowed:false};
 ledger.jobs.push(job);ledger.reservedForUnresolved+=estimate;
 await write(ledgerFile,ledger);await write(path.join(dir,`${op}-submission.json`),job);
 let response;
 try{response=await cli(args,async taskId=>{job.taskId=taskId;job.taskIdRecordedAt=new Date().toISOString();await write(ledgerFile,ledger);});}
 catch(error){job.status='UNRESOLVED';job.error=clean(error.message);await write(ledgerFile,ledger);throw error;}
 await write(path.join(dir,`${op}-response.json`),response);
 job.result=response.result;job.exitCode=response.code;job.finishedAt=new Date().toISOString();job.taskId=response.result?.task_id??job.taskId;
 const cost=response.result?.credits_consumed;
 if(response.code===0&&Number.isFinite(cost)&&cost>=0){job.status='SUCCESS';job.actualCredits=cost;job.reservedCredits=0;ledger.actualCharged+=cost;ledger.reservedForUnresolved-=estimate;}
 else job.status='UNRESOLVED';
 await write(ledgerFile,ledger);
 if(job.status==='SUCCESS'&&job.taskId){
  const detail=await cli(['task','get',job.taskId,'--json']);await write(path.join(dir,`${op}-task-readback.json`),detail);
  if(detail.code===0)job.taskDetails=detail.result;
  if(job.result.model_file)job.sourceSha256=await sha(job.result.model_file);
 }
 const after=await cli(['balance','--json']);job.balanceAfter=after.code===0?after.result:null;
 await write(ledgerFile,ledger);await write(path.join(dir,`${op}-receipt.json`),job);
 console.log(JSON.stringify({operation:op,status:job.status,taskId:job.taskId,actualCredits:job.actualCredits,totalCharged:ledger.actualCharged,balance:job.balanceAfter,result:job.result}));
 if(job.status!=='SUCCESS')process.exitCode=1;
}
main().catch(error=>{console.error(clean(error.message));process.exitCode=1;});
