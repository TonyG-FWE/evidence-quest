import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.resolve('evidence/hands-on-20260916');
const dir=path.join(root,'pilot/articulated-library-20260917');
const refs=path.join(root,'pilot/reference-library-20260917');
const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const write=async(p,v)=>{await fs.mkdir(path.dirname(p),{recursive:true});await fs.writeFile(p+'.pending',JSON.stringify(v,null,2)+'\n');await fs.rename(p+'.pending',p);};
const hash=async p=>createHash('sha256').update(await fs.readFile(p)).digest('hex');
const clean=s=>String(s).replace(/tsk_[A-Za-z0-9_.*-]+/g,'[REDACTED]');
const relative=p=>path.relative(process.cwd(),p).replaceAll('\\','/');
const unresolved=j=>['SUBMITTING','UNRESOLVED'].includes(j.status);
export function guardProduction(ledger,estimate){
 if(!Number.isFinite(estimate)||estimate<0)throw Error('Invalid estimate');
 if(ledger.jobs.some(unresolved)||ledger.reservedForUnresolved!==0)throw Error('Unresolved job must be reconciled; no resubmission');
 const total=ledger.jobs.reduce((n,j)=>n+(j.actualCredits??0),0);
 const phase=ledger.jobs.filter(j=>j.phase==='production').reduce((n,j)=>n+(j.actualCredits??0),0);
 if(total!==ledger.actualCharged)throw Error('Ledger accounting mismatch');
 if(total+estimate>ledger.ceiling||phase+estimate>ledger.allocations.production)throw Error('Authorized credit allocation would be exceeded');
}
async function cli(args,onTask){
 const npm=path.resolve('.tools/node-v24.21.0-win-x64/node_modules/npm/bin/npm-cli.js');
 const child=spawn(process.execPath,[npm,'exec','--yes','--package=tripo-cli@0.4.0','--','tripo',...args],{windowsHide:true,cwd:process.cwd(),env:{...process.env,PATH:path.dirname(process.execPath)+path.delimiter+process.env.PATH},stdio:['ignore','pipe','pipe']});
 let stdout='',stderr='',taskWritten=false,persist=Promise.resolve();
 child.stdout.on('data',chunk=>{stdout+=clean(chunk);});
 child.stderr.on('data',chunk=>{const s=clean(chunk);stderr+=s;process.stderr.write(s);const match=stderr.match(/task created ([0-9a-f-]{36})/i);if(match&&!taskWritten&&onTask){taskWritten=true;persist=onTask(match[1]);}});
 const code=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',resolve);});await persist;
 let result=null;for(const line of stdout.trim().split(/\r?\n/).toReversed()){try{result=JSON.parse(line);break;}catch{}}
 return {code,result,stdout,stderr};
}
async function main(){
 const [op,id,...notes]=process.argv.slice(2);await fs.mkdir(dir,{recursive:true});
 if(op==='doctor'||op==='balance'){
  const response=await cli([op,'--json']);await write(path.join(dir,op+'-'+new Date().toISOString().replaceAll(':','-')+'.json'),response);
  console.log(response.stdout);process.exitCode=response.code;return;
 }
 const ledgerPath=path.join(root,'tripo-ledger.json'),ledger=await read(ledgerPath);
 if(op==='inspect'){
  const job=ledger.jobs.find(j=>j.phase==='production'&&j.assetId===id&&j.revision==='articulated-20260917');
  if(!job||job.status!=='SUCCESS'||!notes.length)throw Error('Successful model and explicit inspection note required');
  if(job.inspection)throw Error('Inspection already recorded; add a separate correction record instead');
  job.inspection={at:new Date().toISOString(),reviewer:'Codex',note:notes.join(' '),status:'LOCAL_CLEANUP_REQUIRED',humanFormApproval:false,sourceSha256:await hash(job.result.model_file)};
  await write(path.join(dir,'inspections',id+'.json'),job.inspection);await write(ledgerPath,ledger);console.log(JSON.stringify(job.inspection));return;
 }
 if(op!=='make'||!notes.includes('--confirm-spend'))throw Error('Use make <id> --confirm-spend; no paid rig/animation/conversion operation exists in this tool');
 const lock=await fs.open(path.join(dir,'submission.lock'),'wx');
 try{
  const catalog=await read(path.join(refs,'asset-manifest.json')),approvals=await read(path.join(refs,'reference-approvals.json'));
  const asset=catalog.assets.find(a=>a.id===id&&a.category==='Characters'&&a.id!=='loop');
  if(!asset)throw Error('Only the nine approved humanoid generations are authorized by this command');
  const im=asset.images.find(i=>i.role==='master'),image=path.join(refs,im.path);
  if(im.approvalStatus!=='approved-reference'||await hash(image)!==im.sha256||!approvals.records.some(r=>r.imageId===im.id&&r.sha256===im.sha256))throw Error('Exact approved reference required');
  if(ledger.jobs.some(j=>j.assetId===id&&j.operation==='make'&&j.referenceSha256===im.sha256))throw Error('Existing attempt for this exact reference. Automatic rerolls prohibited');
  if(ledger.jobs.some(j=>j.phase==='production'&&j.status==='SUCCESS'&&!j.inspection))throw Error('Inspect the previous production result before another generation');
  const estimate=50;guardProduction(ledger,estimate);
  const balance=await cli(['balance','--json']);if(balance.code!==0||!Number.isFinite(balance.result?.balance)||balance.result.balance<estimate)throw Error('Available balance check failed');
  const output=path.join(dir,'sources',id);
  const args=['make',image,'--model','tripo-p1','-p','face_limit=8000','-p','texture=true','-p','pbr=true','-p','texture_quality=standard','-p','texture_alignment=original_image','--json','--yes','--no-open','-o',output];
  const job={id:randomUUID(),assetId:id,revision:'articulated-20260917',operation:'make',phase:'production',status:'SUBMITTING',startedAt:new Date().toISOString(),estimatedCredits:estimate,reservedCredits:estimate,actualCredits:null,taskId:null,referenceSha256:im.sha256,referenceFile:relative(image),approvalReceipt:im.approvalReceipt,balanceBefore:balance.result,command:['tripo',...args],pricing:{source:'https://developers.tripo3d.ai/en/models/p1',verifiedOn:'2026-09-17',imageTo3DStandardTexture:50},productionIntegrationAllowed:false};
  ledger.jobs.push(job);ledger.reservedForUnresolved+=estimate;
  await write(path.join(dir,'attempts',job.id+'.submission.json'),job);await write(ledgerPath,ledger);
  console.log(JSON.stringify({asset:id,attempt:job.id,reserved:estimate,transmitted:'Approved reference image and generation parameters to Tripo'}));
  let response;
  try{response=await cli(args,async taskId=>{job.taskId=taskId;job.taskIdRecordedAt=new Date().toISOString();await write(ledgerPath,ledger);});}
  catch(e){job.status='UNRESOLVED';job.error=clean(e.message);await write(ledgerPath,ledger);throw e;}
  await write(path.join(dir,'attempts',job.id+'.response.json'),response);
  Object.assign(job,{finishedAt:new Date().toISOString(),exitCode:response.code,result:response.result,taskId:response.result?.task_id??job.taskId});
  const cost=response.result?.credits_consumed;
  if(response.code===0&&Number.isFinite(cost)&&cost>=0){job.status='SUCCESS';job.actualCredits=cost;job.reservedCredits=0;ledger.actualCharged+=cost;ledger.reservedForUnresolved-=estimate;job.sourceSha256=await hash(response.result.model_file);}
  else job.status='UNRESOLVED';
  await write(ledgerPath,ledger);
  const after=await cli(['balance','--json']);job.balanceAfter=after.code===0?after.result:null;await write(ledgerPath,ledger);
  await write(path.join(dir,'sources',id,'provenance.json'),job);
  console.log(JSON.stringify({asset:id,status:job.status,taskId:job.taskId,cost,total:ledger.actualCharged,model:job.result?.model_file,preview:job.result?.preview}));
  if(job.status!=='SUCCESS')process.exitCode=1;
 }finally{await lock.close();await fs.unlink(path.join(dir,'submission.lock'));}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(e=>{console.error(clean(e.stack));process.exitCode=1;});
