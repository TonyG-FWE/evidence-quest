// Submission bookkeeping only. All model, texture, rig and preset output is untouched Tripo output.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {spawn} from 'node:child_process';
import {ROOT,REVIEW,REVISION,TASK_CAP,CHARACTERS,referenceFile} from './tripo-village-config.mjs';
const ledgerFile=path.join(ROOT,'tripo-ledger.json');
const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const write=async(p,v)=>{await fs.mkdir(path.dirname(p),{recursive:true});await fs.writeFile(p+'.pending',JSON.stringify(v,null,2)+'\n');await fs.rename(p+'.pending',p);};
const sha=async p=>createHash('sha256').update(await fs.readFile(p)).digest('hex');
const clean=s=>String(s).replace(/tsk_[A-Za-z0-9_.*-]+/g,'[REDACTED]');
const rel=p=>path.relative(process.cwd(),p).replaceAll('\\','/');
async function cli(args,onTask){
 const npm=path.resolve('.tools/node-v24.21.0-win-x64/node_modules/npm/bin/npm-cli.js');
 const child=spawn(process.execPath,[npm,'exec','--offline','--yes','--package=tripo-cli@0.4.0','--','tripo',...args],{windowsHide:true,env:{...process.env,PATH:path.dirname(process.execPath)+path.delimiter+process.env.PATH},stdio:['ignore','pipe','pipe']});
 let stdout='',stderr='',recorded=false,persist=Promise.resolve();
 child.stdout.on('data',c=>stdout+=clean(c));
 child.stderr.on('data',c=>{stderr+=clean(c);process.stderr.write(clean(c));const m=stderr.match(/task created\s+((?:task_)?[a-z0-9-]+)/i);if(m&&!recorded&&onTask){recorded=true;persist=onTask(m[1]);}});
 const code=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',resolve);});await persist;
 let result=null;for(const line of stdout.trim().split(/\r?\n/).toReversed()){try{result=JSON.parse(line);break;}catch{}}
 return {code,result,stdout,stderr};
}
async function main(){
 const [id,op,...notes]=process.argv.slice(2),c=CHARACTERS.find(c=>c.id===id);
 if(!c)throw Error('Only the seven authorized village characters are allowed');
 const reference=referenceFile(c),dir=path.join(REVIEW,id),ledger=await read(ledgerFile);
 if(await sha(reference)!==c.hash)throw Error('Approved reference hash mismatch');
 const jobs=ledger.jobs.filter(j=>j.revision===REVISION&&j.assetId===id);
 if(op==='inspect'||op==='reject'){
  const operation=notes.shift(),job=jobs.find(j=>j.operation===operation&&j.status==='SUCCESS');
  if(!job?.result?.model_file||!notes.length)throw Error('Successful model and specific visual inspection notes required');
  if(job.inspection)throw Error('Inspection already recorded; retain history');
  job.inspection={at:new Date().toISOString(),reviewer:'Codex',status:op==='reject'?'REJECTED':'PASS_TO_NEXT_TRIPO_STEP',note:notes.join(' '),sha256:await sha(job.result.model_file),humanFormApproval:false};
  await write(ledgerFile,ledger);await write(path.join(dir,`${operation}-inspection.json`),job.inspection);console.log(JSON.stringify(job.inspection));return;
 }
 if(op==='balance'||op==='doctor'){const r=await cli([op,'--json']);await write(path.join(REVIEW,`${op}-${Date.now()}.json`),r);console.log(r.stdout);process.exitCode=r.code;return;}
 const story=c.story.find(s=>s.op===op),estimate=story?10*story.clips.length:({generate:110,'rig-check':0,rig:25,animate:20})[op],phase=story?.phase??c.phase;
 if(estimate===undefined||!notes.includes('--confirm-spend'))throw Error('Explicit authorized operation and --confirm-spend required');
 if(jobs.some(j=>j.operation===op))throw Error('Already submitted: do not resubmit or reroll');
 if(jobs.some(j=>j.inspection?.status==='REJECTED'))throw Error('Character rejected; further spending blocked');
 if(ledger.reservedForUnresolved!==0||ledger.jobs.some(j=>['SUBMITTING','UNRESOLVED'].includes(j.status)))throw Error('Unresolved job blocks submission');
 const sum=js=>js.reduce((n,j)=>n+(j.actualCredits??0),0);
 if(sum(ledger.jobs)!==ledger.actualCharged)throw Error('Ledger mismatch');
 if(sum(ledger.jobs.filter(j=>j.revision===REVISION))+estimate>TASK_CAP||sum(ledger.jobs.filter(j=>j.phase===phase))+estimate>ledger.allocations[phase]||ledger.actualCharged+estimate>ledger.ceiling)throw Error('Task, phase or total credit ceiling exceeded');
 const previous=CHARACTERS.slice(0,CHARACTERS.indexOf(c));
 if(previous.some(p=>!ledger.jobs.some(j=>j.revision===REVISION&&j.assetId===p.id&&j.operation==='animate'&&j.inspection?.status==='PASS_TO_NEXT_TRIPO_STEP')))throw Error('Previous character must finish movement inspection');
 const base=jobs.find(j=>j.operation==='generate'&&j.status==='SUCCESS'),check=jobs.find(j=>j.operation==='rig-check'&&j.status==='SUCCESS'),rig=jobs.find(j=>j.operation==='rig'&&j.status==='SUCCESS'),anim=jobs.find(j=>j.operation==='animate'&&j.status==='SUCCESS');
 const passed=j=>j?.inspection?.status==='PASS_TO_NEXT_TRIPO_STEP';let args;
 if(op==='generate')args=['generate','image-to-model',reference,'--model','tripo-p2','-p','texture=true','-p','pbr=true','-p','texture_quality=standard','-p','texture_alignment=original_image','-p','enable_image_autofix=false','--name',`${id}-p2`];
 else{
  if(!passed(base))throw Error('Inspect untouched generation first');
  if(op==='rig-check')args=['anim','check',base.taskId];
  else if(op==='rig'){
   if(check?.taskDetails?.output?.riggable!==true||check.taskDetails.output.rig_type!=='biped')throw Error('Successful humanoid check required');
   args=['anim','rig',base.taskId,'-p','model=v1.0-20240301','--rig-type','biped','--spec','tripo','--out-format','glb'];
  }else{
   if(!passed(rig))throw Error('Inspect untouched rig first');
   if(story&&!passed(anim))throw Error('Inspect full idle and walk cycles before story presets');
   args=['anim','retarget',rig.taskId,'--animation',...(story?.clips??['idle','walk']).map(n=>'preset:biped:'+n),'--out-format','glb','--animate-in-place','-p','bake_animation=true','-p','export_with_geometry=true'];
  }
 }
 const balance=await cli(['balance','--json']);
 if(balance.code!==0||!Number.isFinite(balance.result?.balance)||balance.result.balance<estimate||balance.result.frozen!==0)throw Error('Balance check failed');
 args.push('--json','--yes','--no-open','-o',path.join(dir,op));
 const job={id:randomUUID(),assetId:id,revision:REVISION,operation:op,phase,status:'SUBMITTING',startedAt:new Date().toISOString(),estimatedCredits:estimate,reservedCredits:estimate,actualCredits:null,taskId:null,referenceFile:rel(reference),referenceSha256:c.hash,balanceBefore:balance.result,command:['tripo',...args],productionIntegrationAllowed:false,pricing:{verifiedOn:'2026-09-17',generation:'https://developers.tripo3d.ai/en/docs/changelog',processing:'https://developers.tripo3d.ai/en/pricing'}};
 ledger.jobs.push(job);ledger.reservedForUnresolved+=estimate;await write(ledgerFile,ledger);await write(path.join(dir,`${op}-submission.json`),job);
 let response;try{response=await cli(args,async taskId=>{job.taskId=taskId;await write(ledgerFile,ledger);});}catch(e){job.status='UNRESOLVED';job.error=clean(e.message);await write(ledgerFile,ledger);throw e;}
 await write(path.join(dir,`${op}-response.json`),response);job.result=response.result;job.exitCode=response.code;job.finishedAt=new Date().toISOString();job.taskId=response.result?.task_id??job.taskId;
 const cost=response.result?.credits_consumed;
 if(response.code===0&&Number.isFinite(cost)&&cost>=0){job.status='SUCCESS';job.actualCredits=cost;job.reservedCredits=0;ledger.actualCharged+=cost;ledger.reservedForUnresolved-=estimate;}else job.status='UNRESOLVED';
 await write(ledgerFile,ledger);
 if(job.status==='SUCCESS'&&job.taskId){const d=await cli(['task','get',job.taskId,'--json']);await write(path.join(dir,`${op}-task-readback.json`),d);if(d.code===0)job.taskDetails=d.result;if(job.result.model_file)job.sourceSha256=await sha(job.result.model_file);}
 const after=await cli(['balance','--json']);job.balanceAfter=after.code===0?after.result:null;await write(ledgerFile,ledger);await write(path.join(dir,`${op}-receipt.json`),job);
 console.log(JSON.stringify({id,operation:op,status:job.status,taskId:job.taskId,credits:job.actualCredits,total:ledger.actualCharged,balance:job.balanceAfter,model:job.result?.model_file,preview:job.result?.preview}));if(job.status!=='SUCCESS')process.exitCode=1;
}
main().catch(e=>{console.error(clean(e.message));process.exitCode=1;});
