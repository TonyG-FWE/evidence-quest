/** Sol-only contact correction. Original mesh, weights, hierarchy and clips stay intact. */
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
const directory='evidence/final-demo-20260918',report=JSON.parse(await fs.readFile(directory+'/review-assets.json','utf8'));
const definition=report.assets.sol,binding=report.bindings.find(b=>b.id==='sol'),sha=b=>createHash('sha256').update(b).digest('hex');
const before=sha(await fs.readFile(binding.source));if(before!==definition.sourceSha256)throw Error('Sol source mismatch');
const g=await loadPilotGeometry(binding.source),mixer=new T.AnimationMixer(g.scene),idle=g.animations.find(c=>c.name===definition.rig.clips.idle);
mixer.clipAction(idle).play();mixer.setTime(0);g.scene.updateMatrixWorld(true);
const bones=g.scene.getObjectsByProperty('isBone',true),saved=bones.map(b=>({b,p:b.position.clone(),q:b.quaternion.clone()})),unit=1/definition.normalization.scale[0];
const floor=binding.normalizationBasis.skinnedBounds.min[1],feet=Object.fromEntries(['L','R'].map(s=>{const b=g.scene.getObjectByName(s+'_Foot');return [s,{p:b.getWorldPosition(new T.Vector3()),q:b.getWorldQuaternion(new T.Quaternion())}];}));
function aim(bone,child,to){const from=bone.getWorldPosition(new T.Vector3()),current=child.getWorldPosition(new T.Vector3()).sub(from).normalize(),desired=to.clone().sub(from).normalize(),q=bone.getWorldQuaternion(new T.Quaternion()).premultiply(new T.Quaternion().setFromUnitVectors(current,desired));bone.quaternion.copy(bone.parent.getWorldQuaternion(new T.Quaternion()).invert().multiply(q));bone.updateWorldMatrix(false,true);}
function limb(names,goal,pole){const [a,b,c]=names.map(n=>g.scene.getObjectByName(n)),p=a.getWorldPosition(new T.Vector3()),q=b.getWorldPosition(new T.Vector3()),r=c.getWorldPosition(new T.Vector3()),l1=p.distanceTo(q),l2=q.distanceTo(r),direction=goal.clone().sub(p),d=Math.max(.001,Math.min(direction.length(),l1+l2-.00001));direction.normalize();pole=pole.clone().addScaledVector(direction,-pole.dot(direction)).normalize();const along=(l1*l1-l2*l2+d*d)/(2*d),away=Math.sqrt(Math.max(0,l1*l1-along*along)),joint=p.clone().addScaledVector(direction,along).addScaledVector(pole,away);aim(a,b,joint);aim(b,c,p.clone().addScaledVector(direction,d));return c.getWorldPosition(new T.Vector3()).distanceTo(goal)/unit;}
const smooth=v=>{const t=Math.max(0,Math.min(1,v));return t*t*(3-2*t);},duration=4,times=Array.from({length:121},(_,i)=>i/30),tracks=new Map(bones.map(b=>[b.name,{q:[],p:[]}]));let footError=0;
for(const time of times){
 for(const x of saved){x.b.position.copy(x.p);x.b.quaternion.copy(x.q);}g.scene.updateMatrixWorld(true);
 const t=time/duration,engage=smooth((t-.18)/.18)*smooth((1-t)/.18),hip=g.scene.getObjectByName('Hip'),spine=g.scene.getObjectByName('Spine01');
 const h=hip.getWorldPosition(new T.Vector3());h.y-=.28*unit*engage;h.x+=.16*unit*engage;hip.position.copy(hip.parent.worldToLocal(h));g.scene.updateMatrixWorld(true);
 const lean=spine.getWorldQuaternion(new T.Quaternion()).premultiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,-1),.70*engage));spine.quaternion.copy(spine.parent.getWorldQuaternion(new T.Quaternion()).invert().multiply(lean));g.scene.updateMatrixWorld(true);
 for(const side of ['L','R']){
  footError=Math.max(footError,limb([side+'_Thigh',side+'_Calf',side+'_Foot'],feet[side].p,new T.Vector3(1,0,0)));
  const foot=g.scene.getObjectByName(side+'_Foot');foot.quaternion.copy(foot.parent.getWorldQuaternion(new T.Quaternion()).invert().multiply(feet[side].q));
  limb([side+'_Upperarm',side+'_Forearm',side+'_Hand'],new T.Vector3((.31+.15*engage)*unit,floor+(.92-.18*engage)*unit,(side==='L'?-.12:.12)*unit),new T.Vector3(-.2,-1,side==='L'?-.35:.35));
 }
 for(const b of bones){tracks.get(b.name).q.push(...b.quaternion.toArray());tracks.get(b.name).p.push(...b.position.toArray());}
}
const clip=new T.AnimationClip('final:sol:roof',duration,bones.flatMap(b=>[new T.QuaternionKeyframeTrack(b.name+'.quaternion',times,tracks.get(b.name).q),new T.VectorKeyframeTrack(b.name+'.position',times,tracks.get(b.name).p)]));
const json=T.AnimationClip.toJSON(clip);delete json.uuid;
const bytes=JSON.stringify({sourceModelSha256:before,geometryChanged:false,weightsChanged:false,hierarchyChanged:false,nativeClipsChanged:false,clips:[json]})+'\n',hash=sha(bytes),filename='sol-roof-'+hash.slice(0,12)+'.json';
await fs.writeFile(directory+'/actions/sol-roof.json',bytes);await fs.writeFile('.cache/final-demo-review/assets/'+filename,bytes);
definition.animations=[...definition.animations.filter(a=>!a.uri.includes('/sol-roof-')),{uri:'/review-assets/'+filename,sha256:hash,sourceModelSha256:before}];definition.rig.actions.roof={clip:clip.name};
for(const file of [directory+'/review-assets.json','.cache/final-demo-review/assets/manifest.json'])await fs.writeFile(file,JSON.stringify(report,null,2)+'\n');
await fs.writeFile('src/garden/assets/reviewManifest.ts',"// Generated local review only. This does not grant production approval.\nimport type {VisualAssetDefinition} from './visualAsset.js';\nexport const reviewAssets:Record<string,VisualAssetDefinition>="+JSON.stringify(report.assets,null,2)+';\n');
const result={at:new Date().toISOString(),source:binding.source,sourceSha256:before,animationSha256:hash,footTargetErrorMetres:footError,sourceUnchanged:before===sha(await fs.readFile(binding.source)),visualAcceptance:'PENDING_NATIVE_CONTACT_REVIEW'};
await fs.writeFile(directory+'/actions/sol-roof-evidence.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
