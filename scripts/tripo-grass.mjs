/** Exactly one user-approved grass generation. No processing chain or rerolls. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {spawn} from 'node:child_process';

const output='output/grass-tuft-20260918',evidence='evidence/grass-tuft-20260918';
const ledgerFile='evidence/hands-on-20260916/tripo-ledger.json';
const read=p=>fs.readFile(p,'utf8').then(JSON.parse);
const write=async(p,value)=>{await fs.mkdir(path.dirname(p),{recursive:true});await fs.writeFile(p+'.pending',JSON.stringify(value,null,2)+'\n');await fs.rename(p+'.pending',p);};
const hash=async p=>createHash('sha256').update(await fs.readFile(p)).digest('hex');
const clean=s=>String(s).replace(/tsk_[A-Za-z0-9_.*-]+/g,'[REDACTED]');
const relative=p=>path.relative(process.cwd(),p).replaceAll('\\','/');
async function cli(args,onTask){
 const npm=path.resolve('.tools/node-v24.21.0-win-x64/node_modules/npm/bin/npm-cli.js');
 const child=spawn(process.execPath,[npm,'exec','--offline','--yes','--package=tripo-cli@0.4.0','--','tripo',...args],{windowsHide:true,env:{...process.env,PATH:path.dirname(process.execPath)+path.delimiter+process.env.PATH},stdio:['ignore','pipe','pipe']});
 let stdout='',stderr='',recorded=false,persist=Promise.resolve();
 child.stdout.on('data',chunk=>stdout+=clean(chunk));
 child.stderr.on('data',chunk=>{const text=clean(chunk);stderr+=text;process.stderr.write(text);const match=stderr.match(/task created\s+((?:task_)?[a-z0-9-]+)/i);if(match&&!recorded&&onTask){recorded=true;persist=onTask(match[1]);}});
 const code=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',resolve);});await persist;
 let result=null;for(const line of stdout.trim().split(/\r?\n/).toReversed()){try{result=JSON.parse(line);break;}catch{}}
 return {code,result,stdout,stderr};
}
if(process.argv[2]!=='--generate-approved')throw Error('Explicit approved generation flag required');
await fs.mkdir(evidence,{recursive:true});
const lock=await fs.open(evidence+'/submission.lock','wx');
try{
 const ledger=await read(ledgerFile),estimate=110,reference=output+'/grass-tuft-reference.png';
 if(ledger.jobs.some(j=>j.assetId==='grass-tuft'))throw Error('Existing grass attempt: inspect/reconcile; never resubmit automatically');
 if(ledger.reservedForUnresolved!==0||ledger.jobs.some(j=>['SUBMITTING','UNRESOLVED'].includes(j.status)))throw Error('Reconcile outstanding task before submitting');
 const total=ledger.jobs.reduce((n,j)=>n+(j.actualCredits??0),0),production=ledger.jobs.filter(j=>j.phase==='production').reduce((n,j)=>n+(j.actualCredits??0),0);
 if(total!==ledger.actualCharged||total+estimate>ledger.ceiling||production+estimate>ledger.allocations.production)throw Error('Authorized credit allocation exceeded');
 const before=await cli(['balance','--json']);
 if(before.code!==0||before.result?.frozen!==0||before.result.balance<estimate)throw Error('Credit balance unavailable or insufficient');
 const args=['make',path.resolve(reference),'--model','tripo-p2','-p','face_limit=3000','-p','texture=true','-p','pbr=true','-p','texture_quality=standard','-p','texture_alignment=original_image','-p','enable_image_autofix=false','--json','--yes','--no-open','-o',path.resolve(output+'/provider')];
 const job={id:randomUUID(),assetId:'grass-tuft',revision:'grass-tuft-20260918',operation:'generate',phase:'production',status:'SUBMITTING',startedAt:new Date().toISOString(),estimatedCredits:estimate,reservedCredits:estimate,actualCredits:null,taskId:null,referenceFile:reference,referenceSha256:await hash(reference),balanceBefore:before.result,command:['tripo',...args],authorization:'Tony explicitly approved the consolidated world plan: one image-to-model Tripo P2 grass generation, approximately110 credits, no paid processing or automatic rerolls.',model:'P2-20260801',pricing:{source:'https://developers.tripo3d.ai/en/docs/changelog',verifiedOn:'2026-09-18',imageToModelStandardTexture:110},productionIntegrationAllowed:false};
 ledger.jobs.push(job);ledger.reservedForUnresolved+=estimate;await write(ledgerFile,ledger);await write(evidence+'/submission.json',job);
 console.log(JSON.stringify({asset:'grass-tuft',reserved:estimate,source:reference,referenceSha256:job.referenceSha256}));
 let response;
 try{response=await cli(args,async taskId=>{job.taskId=taskId;job.taskIdRecordedAt=new Date().toISOString();await write(ledgerFile,ledger);await write(evidence+'/submission.json',job);});}
 catch(error){job.status='UNRESOLVED';job.error=clean(error.message);await write(ledgerFile,ledger);throw error;}
 await write(evidence+'/response.json',response);
 Object.assign(job,{finishedAt:new Date().toISOString(),exitCode:response.code,result:response.result,taskId:response.result?.task_id??job.taskId});
 const cost=response.result?.credits_consumed;
 if(response.code===0&&Number.isFinite(cost)&&cost>=0){
  job.status='SUCCESS';job.actualCredits=cost;job.reservedCredits=0;ledger.actualCharged+=cost;ledger.reservedForUnresolved-=estimate;
  job.sourceSha256=await hash(response.result.model_file);await fs.copyFile(response.result.model_file,output+'/grass-tuft.glb');
  if(response.result.preview){await fs.copyFile(response.result.preview,output+'/preview.png');job.previewSha256=await hash(output+'/preview.png');}
 }else job.status='UNRESOLVED';
 await write(ledgerFile,ledger);
 const after=await cli(['balance','--json']);job.balanceAfter=after.code===0?after.result:null;
 await write(ledgerFile,ledger);await write(evidence+'/receipt.json',job);await write(output+'/provenance.json',job);
 console.log(JSON.stringify({asset:'grass-tuft',status:job.status,taskId:job.taskId,credits:job.actualCredits,total:ledger.actualCharged,balance:job.balanceAfter,model:relative(path.resolve(output+'/grass-tuft.glb'))}));
 if(job.status!=='SUCCESS')process.exitCode=1;
}finally{await lock.close();await fs.unlink(evidence+'/submission.lock');}
