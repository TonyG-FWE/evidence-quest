import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root=path.resolve('evidence/hands-on-20260916'),dir=path.join(root,'pilot/articulated-library-20260917');
const refs=JSON.parse(fs.readFileSync(path.join(root,'pilot/reference-library-20260917/asset-manifest.json')));
const ledger=JSON.parse(fs.readFileSync(path.join(root,'tripo-ledger.json')));
const hash=p=>createHash('sha256').update(fs.readFileSync(p)).digest('hex');
fs.mkdirSync(dir,{recursive:true});
const assets=refs.assets.map(a=>{
 const master=a.images.find(i=>i.role==='master');
 const meta=path.join(dir,'models',a.id,'model.json'),record=fs.existsSync(meta)?JSON.parse(fs.readFileSync(meta)):null;
 if(record){const modelFile=path.join(dir,'models',a.id,record.file);if(hash(modelFile)!==record.sha256)throw Error('Model record hash mismatch: '+a.id);record.bytes=fs.statSync(modelFile).size;record.editableSourceSha256=hash(path.join(dir,'models',a.id,record.editableSource));}
 const job=ledger.jobs.find(j=>j.assetId===a.id&&j.revision==='articulated-20260917');
 return {id:a.id,label:a.label,category:a.category,world:a.visualWorld,purpose:a.purpose,locations:a.locations,requiredParts:a.requiredParts,requiredStates:a.states,height:a.proposedHeightM??null,reference:{uri:'../reference-library-20260917/'+master.path,sha256:master.sha256,approval:'approved-reference',receipt:master.approvalReceipt},referenceDetails:a.images.filter(i=>i.role!=='master').map(i=>({uri:'../reference-library-20260917/'+i.path,role:i.role,sha256:i.sha256})),formApproval:'PENDING',productionIntegrationAllowed:false,model:record?{...record,uri:'models/'+a.id+'/'+record.file,sha256:hash(path.join(dir,'models',a.id,record.file))}:null,generation:job?{taskId:job.taskId,status:job.status,actualCredits:job.actualCredits,sourceSha256:job.sourceSha256}:null};
});
const manifest={schema:'eq.articulated-review-library.v1',updatedAt:new Date().toISOString(),referenceManifestSha256:hash(path.join(root,'pilot/reference-library-20260917/asset-manifest.json')),scope:'77 designs, models and articulated movement for review only. No live-game or production export.',units:'metres',up:'+Y',front:'+Z',authoring:'Blender + Tripo P1 sources; local rigging and motion',counts:{designs:assets.length,models:assets.filter(a=>a.model).length,characters:assets.filter(a=>a.category==='Characters').length},credits:{actual:ledger.actualCharged,reserved:ledger.reservedForUnresolved,ceiling:ledger.ceiling,allocations:ledger.allocations},assets,aliases:refs.reuse,excluded:refs.excluded};
fs.writeFileSync(path.join(dir,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify({counts:manifest.counts,credits:manifest.credits}));
