import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {ROOT,REVIEW,REVISION,CHARACTERS,referenceFile,TASK_CAP} from './tripo-village-config.mjs';
const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const write=async(p,v)=>{await fs.mkdir(path.dirname(p),{recursive:true});await fs.writeFile(p,JSON.stringify(v,null,2)+'\n');};
const hash=b=>createHash('sha256').update(b).digest('hex');
const ledger=await read(path.join(ROOT,'tripo-ledger.json'));
const jobs=ledger.jobs.filter(j=>j.revision===REVISION);
await fs.mkdir(REVIEW,{recursive:true});
const assets=[];
for(const c of CHARACTERS){
 const dir=path.join(REVIEW,c.id);await fs.mkdir(dir,{recursive:true});
 if(hash(await fs.readFile(referenceFile(c)))!==c.hash)throw Error('Reference mismatch '+c.id);
 const stages=[];
 for(const j of jobs.filter(j=>j.assetId===c.id&&j.status==='SUCCESS'&&j.result?.model_file)){
  const b=await fs.readFile(j.result.model_file);if(hash(b)!==j.sourceSha256)throw Error('Original download changed: '+c.id+'/'+j.operation);const n=b.readUInt32LE(12),g=JSON.parse(b.toString('utf8',20,20+n)),bin=28+n;
  const jointIds=new Set((g.skins??[]).flatMap(s=>s.joints)),joints=[...jointIds].map(i=>({index:i,name:g.nodes[i].name,parent:g.nodes.findIndex(n=>n.children?.includes(i))}));
  let triangles=0;for(const m of g.meshes??[])for(const p of m.primitives??[])triangles+=(g.accessors[p.indices??p.attributes.POSITION].count)/3;
  const images=(g.images??[]).map(im=>{const v=g.bufferViews[im.bufferView];return {name:im.name,mimeType:im.mimeType,bytes:v.byteLength,sha256:hash(b.subarray(bin+(v.byteOffset??0),bin+(v.byteOffset??0)+v.byteLength))};});
  stages.push({operation:j.operation,label:j.operation==='generate'?'Untouched P2 model':j.operation==='rig'?'Tripo humanoid rig':j.operation==='animate'?'Tripo idle + walk':'Tripo '+g.animations.map(a=>a.name.split(':').at(-1)).join(' + '),uri:path.relative(dir,j.result.model_file).replaceAll('\\','/'),sha256:hash(b),bytes:b.length,taskId:j.taskId,credits:j.actualCredits,triangles,joints,images,animations:(g.animations??[]).map(a=>({name:a.name,duration:Math.max(0,...a.samplers.map(s=>g.accessors[s.input].max?.[0]??0)),channels:a.channels.length})),providerInput:j.taskDetails?.input??null,inspection:j.inspection??null});
 }
 const m={schema:'eq.village-tripo-review.v1',updatedAt:new Date().toISOString(),assetId:c.id,label:c.label,height:c.height,reference:{uri:`../../reference-library-20260917/images/${c.id}-r1.png`,sha256:c.hash,approval:'APPROVED'},reviewOnly:true,formApproval:'PENDING',movementApproval:'PENDING',productionIntegrationAllowed:false,assetAuthoring:'Tripo model, texture, rig and presets. Optional separately labeled animation-only sidecars.',credits:{total:ledger.actualCharged,ceiling:ledger.ceiling,thisAttempt:jobs.filter(j=>j.assetId===c.id).reduce((s,j)=>s+(j.actualCredits??0),0),reserved:ledger.reservedForUnresolved},stages};
 await write(path.join(dir,'manifest.json'),m);
 assets.push({id:c.id,label:c.label,referenceHash:c.hash,stages:stages.length,clips:stages.flatMap(s=>s.animations.map(a=>a.name)),review:`${c.id}/review.html`,formApproval:'PENDING'});
 let html=await fs.readFile(path.join(ROOT,'pilot/pip-tripo-restart-20260917/index.html'),'utf8');
 html=html.replaceAll('Pip',c.label).replaceAll('pip-r1.png',`${c.id}-r1.png`).replaceAll('../reference-library-', '../../reference-library-').replace('A fresh '+c.label+', made entirely with Tripo.','A fresh '+c.label+'.').replace('layered black paper hair, teal tunic and shoes, navy shorts and coral backpack','approved village character design').replace('face, proportions, paper surfaces, clothing and backpack','face, proportions, paper surfaces and clothing').replace('These models contain only Tripo’s delivered geometry, textures, skeleton and clips.','Original Tripo files are untouched. Any custom action is a separate, clearly labeled animation file.').replace('src="review.js"','src="../review.js"').replace(' · <a href="rejected-local-pip.json">Previous rejection</a>','');
 html=html.replace('A fresh '+c.label+'.',c.label+' · P2 recreation');
 await fs.writeFile(path.join(dir,'review.html'),html);
}
const old=await read(path.join(ROOT,'pilot/articulated-library-20260917/manifest.json'));
const receiptFile=path.join(REVIEW,'superseded-candidates.json');
try{await fs.access(receiptFile);}catch{await write(receiptFile,{at:new Date().toISOString(),authorization:'Tony approved fresh P2 recreation of seven village characters; Jo excluded and Pip preserved.',status:'REJECTED_AND_SUPERSEDED',priorModels:old.assets.filter(a=>CHARACTERS.some(c=>c.id===a.id)),originalFilesPreserved:true,productionIntegrationAllowed:false});}
const jsFile=path.join(REVIEW,'review.js');
try{await fs.access(jsFile);}catch{
 let js=await fs.readFile(path.join(ROOT,'pilot/pip-tripo-restart-20260917/review.js'),'utf8');
 js=js.replace('const HEIGHT=1.15;','let HEIGHT=1.3;').replace('manifest=await(await fetch(\'manifest.json\')).json();','manifest=await(await fetch(\'manifest.json\')).json();HEIGHT=manifest.height;').replace("'Pip is ready to inspect. Model Form and movement approval are pending.'","manifest.label+' is ready to inspect. Model Form and movement approval are pending.'").replace('Tripo is generating Pip.','The character is being produced.').replace('sourceRoot=place(source,scenes[0]);','sourceRoot=place(source,scenes[0]);');
 await fs.writeFile(jsFile,js);
}
await write(path.join(REVIEW,'manifest.json'),{schema:'eq.village-p2-library.v1',assets,at:new Date().toISOString(),credits:{taskCap:TASK_CAP,taskActual:jobs.reduce((s,j)=>s+(j.actualCredits??0),0),total:ledger.actualCharged,ceiling:ledger.ceiling,reserved:ledger.reservedForUnresolved},excluded:['pip','jo','loop'],humanFormApproval:'PENDING'});
await fs.writeFile(path.join(REVIEW,'index.html'),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Evidence Quest · Seven village characters</title><style>*{box-sizing:border-box}body{margin:0;height:100vh;display:flex;flex-direction:column;font:15px system-ui;color:#213d34;background:#faf6ed}header{padding:12px 20px;display:flex;align-items:center;gap:18px;flex-wrap:wrap;border-bottom:1px solid #c9cabb}h1{font:24px Georgia;margin:0}select,button{font:inherit;padding:8px;border:1px solid #97aa9c;border-radius:5px;background:white;color:inherit;min-height:40px}iframe{width:100%;flex:1;border:0;min-height:500px}a{color:#14667b}:focus-visible{outline:3px solid #ca7138;outline-offset:2px}small{font-size:12px}</style></head><body><header><h1>Seven village characters</h1><label>Character <select id="character" aria-label="Character">${assets.map(a=>`<option value="${a.id}">${a.label}</option>`).join('')}</select></label><button id="previous">Previous</button><button id="next">Next</button><label>Review <select id="mode" aria-label="Review mode"><option value="native">Tripo models and motion</option><option value="actions">Custom story previews</option><option value="cycles">Full-cycle sheet</option><option value="coverage">Review notes and limitations</option></select></label><small>7 models · 30 Tripo clips · 29 custom previews<br>Approval pending · See review notes for limitations</small><a href="../reference-library-20260917/index.html?world=Village#characters" target="_blank">Approved images</a></header><iframe id="review" title="Selected character model and movement review"></iframe><script>const select=document.getElementById('character'),frame=document.getElementById('review');function show(){const mode=document.getElementById('mode').value;frame.src=mode==='native'?select.value+'/review.html':mode+'.html?id='+select.value;history.replaceState(null,'','#'+select.value)}const id=location.hash.slice(1);if([...select.options].some(o=>o.value===id))select.value=id;select.onchange=show;document.getElementById('mode').onchange=show;document.getElementById('previous').onclick=()=>{select.selectedIndex=(select.selectedIndex+6)%7;show()};document.getElementById('next').onclick=()=>{select.selectedIndex=(select.selectedIndex+1)%7;show()};show();</script></body></html>`);
console.log(JSON.stringify({assets:assets.map(a=>({id:a.id,stages:a.stages,clips:a.clips})),total:ledger.actualCharged}));
