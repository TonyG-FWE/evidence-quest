import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root=path.resolve('evidence/hands-on-20260916'),dir=path.join(root,'pilot/pip-tripo-restart-20260917'),old=path.join(root,'pilot/articulated-library-20260917');
const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const write=async(p,v)=>{await fs.mkdir(path.dirname(p),{recursive:true});await fs.writeFile(p,JSON.stringify(v,null,2)+'\n');};
const hash=b=>createHash('sha256').update(b).digest('hex');
const reference=path.join(root,'pilot/reference-library-20260917/images/pip-r1.png');
const refHash=hash(await fs.readFile(reference));
if(refHash!=='5a265f5f80e6c1aa1ae1cb281f8c3f80d782d91fe73f527585f1829ca00cad48')throw Error('Reference mismatch');
await fs.mkdir(dir,{recursive:true});
if(process.argv[2]==='init'){
 const file=path.join(old,'models/pip/pip-review.glb'),modelHash=hash(await fs.readFile(file));
 const receipt={schema:'eq.pip-rejection.v1',at:new Date().toISOString(),assetId:'pip',reviewer:'Tony',status:'REJECTED_AND_SUPERSEDED',reason:'Tony rejected the manually modified model, rig and animations and authorized a fresh Tripo-only P2 restart.',modelSha256:modelHash,referenceSha256:refHash,originalFilesPreserved:true,newReview:'../pip-tripo-restart-20260917/index.html',productionIntegrationAllowed:false};
 await write(path.join(dir,'rejected-local-pip.json'),receipt);
 const manifest=await read(path.join(old,'manifest.json'));
 await fs.copyFile(path.join(old,'manifest.json'),path.join(dir,'previous-library-manifest.json'),fs.constants.COPYFILE_EXCL);
 const pip=manifest.assets.find(a=>a.id==='pip');pip.formApproval='REJECTED';pip.model.formApproval='REJECTED';pip.supersededBy='../pip-tripo-restart-20260917/index.html';pip.rejectionReceipt='../pip-tripo-restart-20260917/rejected-local-pip.json';
 await write(path.join(old,'manifest.json'),manifest);
 const htmlFile=path.join(old,'index.html');let html=await fs.readFile(htmlFile,'utf8');
 html=html.replace('<body>','<body><div role="note" style="padding:12px 24px;background:#fbe3c7;color:#513724">Pip’s manually modified candidate was rejected. <a href="../pip-tripo-restart-20260917/index.html">Open the fresh Tripo-only Pip review.</a> The previous files remain as history.</div>');
 await fs.writeFile(htmlFile,html);
 console.log(JSON.stringify(receipt));
}
const ledger=await read(path.join(root,'tripo-ledger.json'));
const stages=[];
for(const job of ledger.jobs.filter(j=>j.revision==='pip-tripo-p2-20260917'&&j.status==='SUCCESS'&&j.result?.model_file)){
 const file=job.result.model_file,bytes=await fs.readFile(file),jsonLength=bytes.readUInt32LE(12),doc=JSON.parse(bytes.toString('utf8',20,20+jsonLength));
 const jointIds=new Set((doc.skins??[]).flatMap(s=>s.joints));
 const joints=[...jointIds].map(i=>({index:i,name:doc.nodes[i].name,parent:doc.nodes.findIndex(n=>n.children?.includes(i))}));
 let tris=0;for(const m of doc.meshes??[])for(const p of m.primitives??[])tris+=(p.indices!==undefined?doc.accessors[p.indices].count:doc.accessors[p.attributes.POSITION].count)/3;
 const images=(doc.images??[]).map(im=>{const v=doc.bufferViews[im.bufferView],start=28+jsonLength+(v?.byteOffset??0);return {name:im.name??null,mimeType:im.mimeType,bytes:v?.byteLength??0,sha256:v?hash(bytes.subarray(start,start+v.byteLength)):null};});
 stages.push({operation:job.operation,label:job.operation==='generate'?'Untouched P2 model':job.operation==='rig'?'Tripo humanoid rig':'Tripo idle + walk',uri:path.relative(dir,file).replaceAll('\\','/'),sha256:hash(bytes),bytes:bytes.length,taskId:job.taskId,credits:job.actualCredits,triangles:tris,joints,images,extensions:doc.extensionsUsed??[],animations:(doc.animations??[]).map(a=>({name:a.name,duration:Math.max(0,...a.samplers.map(s=>doc.accessors[s.input].max?.[0]??0)),channels:a.channels.length})),meshCount:doc.meshes?.length??0,materialCount:doc.materials?.length??0,providerInput:job.taskDetails?.input??null});
}
const manifest={schema:'eq.pip-tripo-review.v1',updatedAt:new Date().toISOString(),reference:{uri:'../reference-library-20260917/images/pip-r1.png',sha256:refHash,approval:'APPROVED'},assetId:'pip',reviewOnly:true,formApproval:'PENDING',productionIntegrationAllowed:false,assetAuthoring:'Tripo only; provider GLB bytes unchanged',credits:{total:ledger.actualCharged,ceiling:ledger.ceiling,thisAttempt:ledger.jobs.filter(j=>j.revision==='pip-tripo-p2-20260917').reduce((s,j)=>s+(j.actualCredits??0),0),reserved:ledger.reservedForUnresolved},stages};
await write(path.join(dir,'manifest.json'),manifest);
console.log(JSON.stringify({stages:stages.map(s=>({operation:s.operation,sha256:s.sha256,triangles:s.triangles,joints:s.joints.length,animations:s.animations})),credits:manifest.credits}));
