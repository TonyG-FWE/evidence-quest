/** Animation-only corrections, on the existing Tripo joints. Source GLBs are read-only. */
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
const directory='evidence/final-demo-20260918/actions';await fs.mkdir(directory,{recursive:true});
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const clamp=n=>Math.max(0,Math.min(1,n)),smooth=n=>{const t=clamp(n);return t*t*(3-2*t);};
function aim(bone,child,target){const origin=bone.getWorldPosition(new T.Vector3()),from=child.getWorldPosition(new T.Vector3()).sub(origin).normalize(),to=target.clone().sub(origin).normalize(),world=bone.getWorldQuaternion(new T.Quaternion()).premultiply(new T.Quaternion().setFromUnitVectors(from,to));bone.quaternion.copy(bone.parent.getWorldQuaternion(new T.Quaternion()).invert().multiply(world));bone.updateWorldMatrix(false,true);}
function limb(scene,names,target,pole){const [upper,lower,end]=names.map(n=>scene.getObjectByName(n));scene.updateMatrixWorld(true);const a=upper.getWorldPosition(new T.Vector3()),b=lower.getWorldPosition(new T.Vector3()),c=end.getWorldPosition(new T.Vector3()),l1=a.distanceTo(b),l2=b.distanceTo(c),direction=target.clone().sub(a),d=Math.max(.001,Math.min(direction.length(),l1+l2-.00001));direction.normalize();pole=pole.clone().addScaledVector(direction,-pole.dot(direction)).normalize();const along=(l1*l1-l2*l2+d*d)/(2*d),away=Math.sqrt(Math.max(0,l1*l1-along*along)),joint=a.clone().addScaledVector(direction,along).addScaledVector(pole,away);aim(upper,lower,joint);aim(lower,end,a.clone().addScaledVector(direction,d));return end.getWorldPosition(new T.Vector3()).distanceTo(target);}
const specifications={
 pip:{height:1.05,actions:{carry:[.22,.60,.08],post:[.18,.52,.075],tie:[.18,.53,.065],plant:[.28,.26,.06]}},
 grandma:{height:1.3,actions:{carry:[.22,.68,.10],plant:[.30,.14,.09]}},
 rina:{height:1.4,actions:{carry:[.23,.80,.14],mix:[.28,.75,.13],knead:[.29,.76,.10],divide:[.28,.76,.11],sack:[.24,.80,.14]}},
 sol:{height:1.58,actions:{carry:[.26,.85,.11],tile:[.31,.92,.12],tool:[.34,.92,.12],climb:[.26,1.15,.15]}},
 mara:{height:1.52,actions:{carry:[.23,.80,.08]}},
 boy:{height:1.06,actions:{carry:[.20,.52,.08]}},
 operator:{height:1.57,actions:{carry:[.24,.82,.10]}},
 passenger:{height:1.5,actions:{carry:[.23,.80,.10]}},
};
const report=[];
for(const [id,spec]of Object.entries(specifications)){
 const base=id==='pip'?'evidence/hands-on-20260916/pilot/pip-tripo-restart-20260917':`evidence/hands-on-20260916/pilot/village-p2-20260917/${id}`;
 const manifest=JSON.parse(await fs.readFile(base+'/manifest.json')),source=base+'/'+manifest.stages.find(s=>s.operation==='animate').uri,sourceHash=hash(await fs.readFile(source));
 const g=await loadPilotGeometry(source),mixer=new T.AnimationMixer(g.scene),idle=g.animations.find(c=>c.name.includes('idle')),walk=g.animations.find(c=>c.name.includes('walk'));mixer.clipAction(idle).play();mixer.setTime(0);g.scene.updateMatrixWorld(true);g.scene.traverse(o=>{if(o.isSkinnedMesh)o.computeBoundingBox();});
 const box=new T.Box3().setFromObject(g.scene),height=box.max.y-box.min.y,floor=box.min.y,unit=height/spec.height,bones=g.scene.getObjectsByProperty('isBone',true),saved=bones.map(b=>({b,p:b.position.clone(),q:b.quaternion.clone()})),restore=()=>{for(const x of saved){x.b.position.copy(x.p);x.b.quaternion.copy(x.q);}g.scene.updateMatrixWorld(true);};
 const hands=Object.fromEntries(['L','R'].map(side=>[side,g.scene.getObjectByName(side+'_Hand').getWorldPosition(new T.Vector3())]));
 const feet=Object.fromEntries(['L','R'].map(side=>{const foot=g.scene.getObjectByName(side+'_Foot');return [side,{p:foot.getWorldPosition(new T.Vector3()),q:foot.getWorldQuaternion(new T.Quaternion())}];}));
 const clips=[];
 for(const [kind,point]of Object.entries(spec.actions)){
  const duration=kind==='carry'?2:3,times=Array.from({length:duration*30+1},(_,i)=>i/30),tracks=new Map(bones.map(b=>[b.name,{q:[],p:[]} ]));let handError=0,footError=0;
  for(const time of times){restore();const t=time/duration,engage=kind==='carry'?1:smooth(t/.18)*smooth((1-t)/.14),work=clamp((t-.2)/.6);
   if(kind==='plant'){
    const hip=g.scene.getObjectByName('Hip'),spine=g.scene.getObjectByName('Spine01');
    if(hip){const position=hip.getWorldPosition(new T.Vector3());position.y-=(id==='pip'?.23:.36)*unit*engage;position.x-=.03*unit*engage;hip.position.copy(hip.parent.worldToLocal(position));}
    if(spine){const world=spine.getWorldQuaternion(new T.Quaternion()).premultiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,-1),.8*engage));spine.quaternion.copy(spine.parent.getWorldQuaternion(new T.Quaternion()).invert().multiply(world));}
    g.scene.updateMatrixWorld(true);
    for(const side of ['L','R']){footError=Math.max(footError,limb(g.scene,[side+'_Thigh',side+'_Calf',side+'_Foot'],feet[side].p,new T.Vector3(1,0,0)));const foot=g.scene.getObjectByName(side+'_Foot');foot.quaternion.copy(foot.parent.getWorldQuaternion(new T.Quaternion()).invert().multiply(feet[side].q));}
   }
   if(kind==='climb')for(const [side,phase]of [['L',0],['R',Math.PI]]){const lift=Math.max(0,Math.sin(t*Math.PI*8+phase))*engage,target=feet[side].p.clone().add(new T.Vector3(.055*lift*unit,.16*lift*unit,0));footError=Math.max(footError,limb(g.scene,[side+'_Thigh',side+'_Calf',side+'_Foot'],target,new T.Vector3(1,0,0)));const foot=g.scene.getObjectByName(side+'_Foot');foot.quaternion.copy(foot.parent.getWorldQuaternion(new T.Quaternion()).invert().multiply(feet[side].q));}
   for(const side of ['L','R']){
    const sign=side==='L'?-1:1,target=new T.Vector3(point[0]*unit,floor+point[1]*unit,sign*point[2]*unit);
    if(kind==='mix'&&side==='R'){target.x+=Math.cos(work*Math.PI*4)*.04*unit;target.z+=Math.sin(work*Math.PI*4)*.04*unit;}
    if(kind==='knead')target.y-=Math.max(0,Math.sin(work*Math.PI*6))*.035*unit;
    if(kind==='tie'){target.z+=Math.cos(work*Math.PI*4)*.035*unit;target.y+=Math.sin(work*Math.PI*4)*.025*unit;}
    const desired=hands[side].clone().lerp(target,engage);handError=Math.max(handError,limb(g.scene,[side+'_Upperarm',side+'_Forearm',side+'_Hand'],desired,new T.Vector3(-.2,-1,sign*.35)));
   }
   for(const b of bones){tracks.get(b.name).q.push(...b.quaternion.toArray());tracks.get(b.name).p.push(...b.position.toArray());}
  }
  const channels=bones.flatMap(b=>[new T.QuaternionKeyframeTrack(b.name+'.quaternion',times,tracks.get(b.name).q),new T.VectorKeyframeTrack(b.name+'.position',times,tracks.get(b.name).p)]),clip=new T.AnimationClip('final:'+id+':'+kind,duration,channels);clips.push(T.AnimationClip.toJSON(clip));
  report.push({id,kind,source,sourceHash,maxHandTargetErrorM:handError/unit,maxFootTargetErrorM:footError/unit,visualAcceptance:'PENDING_PLAY_REVIEW'});
 }
 const carry=T.AnimationClip.parse(clips.find(c=>c.name.endsWith(':carry'))),tracks=walk.tracks.map(t=>t.clone());
 for(const track of carry.tracks.filter(t=>/^(L|R)_(Upperarm|Forearm|Hand)\.quaternion$/.test(t.name))){const value=Array.from(track.values.slice(0,4)),i=tracks.findIndex(t=>t.name===track.name),held=new T.QuaternionKeyframeTrack(track.name,[0,walk.duration],[...value,...value]);if(i>=0)tracks[i]=held;else tracks.push(held);}
 clips.push(T.AnimationClip.toJSON(new T.AnimationClip('final:'+id+':carry-walk',walk.duration,tracks)));
 const output={sourceModelSha256:sourceHash,geometryChanged:false,weightsChanged:false,hierarchyChanged:false,nativeClipsChanged:false,clips};await fs.writeFile(directory+'/'+id+'.json',JSON.stringify(output)+'\n');
 if(hash(await fs.readFile(source))!==sourceHash)throw Error('Original changed');
}
await fs.writeFile(directory+'/contact-report.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report.map(r=>({id:r.id,action:r.kind,handErrorM:r.maxHandTargetErrorM,footErrorM:r.maxFootTargetErrorM}))));
