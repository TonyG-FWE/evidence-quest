import fs from 'node:fs/promises';
import ts from 'typescript';
import * as T from 'three';
import {createHash} from 'node:crypto';
import {loadPilotGeometry,readGlb} from './pilot-glb.mjs';

const pilot='evidence/hands-on-20260916/pilot',out=pilot+'/revision-r2';
const prior=JSON.parse(await fs.readFile(pilot+'/rejected-r1/review-manifest.json','utf8'));
const assets=[];
for(const id of ['pip','grandma']){
 const previous=prior.assets.find(a=>a.id===id),rig=JSON.parse(await fs.readFile(`${out}/${id}/rig.json`,'utf8'));
 const file=pilot+'/'+rig.model,{json,bytes}=await readGlb(file),loaded=await loadPilotGeometry(file);
 loaded.scene.updateMatrixWorld(true);loaded.scene.traverse(o=>{if(o.isSkinnedMesh)o.skeleton.update();});
 const spec=rig.specification;
 const hand=rig.bones['hand.R'];
 const palmX=hand.head[0]*.3+hand.tail[0]*.7,palmY=hand.head[1]*.3+hand.tail[1]*.7;
 const hit=new T.Raycaster(new T.Vector3(palmX,palmY,2),new T.Vector3(0,0,-1)).intersectObject(loaded.scene,true)[0];
 if(!hit)throw new Error(`No palm surface at ${id}: ${palmX},${palmY}`);
 const joints=Object.fromEntries(Object.keys(rig.bones).map(name=>[name,name.replaceAll('.','')]));
 const visual={id,uri:'/pilot/'+rig.model,sha256:rig.sha256,approval:'review',hand:{wrist:'handR',palm:hit.point.toArray(),normal:[0,0,1]},rig:{joints,clips:{idle:rig.clips.idle.name,walk:rig.clips.walk.name,carryIdle:rig.clips.carry_idle.name,carryWalk:rig.clips.carry_walk.name},walkCycleDistance:rig.clips.walk.cycleDistance}};
 let triangles=0;loaded.scene.traverse(o=>{if(o.isMesh)triangles+=o.geometry.index.count/3;});
 assets.push({...previous,model:'pilot/'+rig.model,visual,rig,triangles,bytes:bytes.length,reviewStatus:'PENDING_CORRECTED_HUMAN_FORM_REVIEW',previous:{visual:previous.visual,model:previous.model,status:'REJECTED'},images:json.images.length});
}
await fs.writeFile(out+'/manifest.json',JSON.stringify({schema:'evidence-quest.character-review.v2',revision:'R2',actualCredits:290,additionalCredits:0,approval:'PENDING',assets},null,2)+'\n');
const source=await fs.readFile('src/garden/assets/visualAsset.ts','utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
await fs.mkdir(out+'/runtime',{recursive:true});await fs.writeFile(out+'/runtime/visualAsset.js',compiled);
await fs.writeFile(out+'/build.json',JSON.stringify({adapterSha256:createHash('sha256').update(source).digest('hex'),sourcePreserved:true,productionExport:false,additionalCredits:0},null,2)+'\n');
console.log(JSON.stringify(assets.map(a=>({id:a.id,triangles:a.triangles,bytes:a.bytes,palm:a.visual.hand.palm,clips:a.visual.rig.clips}))));
