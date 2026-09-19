// Animation-only sidecars: reads immutable Tripo GLBs and writes JSON clips.
// No geometry, hierarchy, bind pose, skin weights, native clip or model export is written.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
import {REVIEW,CHARACTERS} from './tripo-village-config.mjs';
const ACTIONS={
 grandma:[['seed','Receive and offer the seed','seed','handoff'],['plant','Seed preparation at hand height (ground placement pending)','seed','plant'],['cushion','Place a cushion','cushion','place'],['page','Hold and read a story page','manuscript','read']],
 mara:[['permission','Offer help, pause and withdraw',null,'offer'],['tape','Retrieve and apply tape','tape','tape'],['page','Receive and read a manuscript','manuscript','read']],
 rina:[['sack','Take hold of a flour sack','flour-sack','carry'],['mix','Support bowl and mix','scoop','mix'],['knead','Press and knead dough','dough','knead'],['divide','Divide dough into portions','dough','divide'],['bread','Carry and hand over bread','bread','handoff']],
 sol:[['tile','Receive and place a roof tile','roof-tile','tile'],['tool','Controlled roof tool motion','toolkit','tool'],['cards','Arrange witnessed-event cards','story-card','cards'],['page','Handle and read a manuscript','manuscript','read']],
 boy:[['bird','Support and present the paper bird','paper-bird','carry'],['wing','Hold the torn wing steady','paper-bird','wing'],['flute','Raise, hold and lower the flute','flute','flute']],
 operator:[['assist','Offer a steady boarding hand',null,'offer'],['direction','Direct passengers toward the dock',null,'point']],
 passenger:[['listen','Listen to the flute',null,'listen'],['duet','Turn toward the boy during the duet',null,'listen']]
};
const H=new T.Vector3(),E=new T.Vector3(),W=new T.Vector3();
const smooth=t=>t*t*(3-2*t),clamp=t=>Math.max(0,Math.min(1,t));
function aim(bone,child,target){bone.updateWorldMatrix(true,true);const p=bone.getWorldPosition(new T.Vector3()),from=child.getWorldPosition(new T.Vector3()).sub(p).normalize(),to=target.clone().sub(p).normalize(),delta=new T.Quaternion().setFromUnitVectors(from,to),world=bone.getWorldQuaternion(new T.Quaternion()).premultiply(delta),parent=bone.parent.getWorldQuaternion(new T.Quaternion()).invert();bone.quaternion.copy(parent.multiply(world));bone.updateWorldMatrix(false,true);}
function solveArm(scene,side,target){const upper=scene.getObjectByName(side+'_Upperarm'),fore=scene.getObjectByName(side+'_Forearm'),hand=scene.getObjectByName(side+'_Hand');scene.updateMatrixWorld(true);upper.getWorldPosition(H);fore.getWorldPosition(E);hand.getWorldPosition(W);const l1=H.distanceTo(E),l2=E.distanceTo(W),dir=target.clone().sub(H),distance=dir.length(),d=Math.max(.001,Math.min(distance,(l1+l2)*.985));dir.normalize();const pole=new T.Vector3(-.2,-1,side==='L'?-.35:.35);pole.addScaledVector(dir,-pole.dot(dir)).normalize();const a=(l1*l1-l2*l2+d*d)/(2*d),b=Math.sqrt(Math.max(0,l1*l1-a*a)),elbow=H.clone().addScaledVector(dir,a).addScaledVector(pole,b),end=H.clone().addScaledVector(dir,d);aim(upper,fore,elbow);aim(fore,hand,end);return {requested:target.toArray(),achieved:hand.getWorldPosition(new T.Vector3()).toArray(),error:hand.getWorldPosition(new T.Vector3()).distanceTo(target)};}
const beforeHash=async p=>createHash('sha256').update(await fs.readFile(p)).digest('hex');
function solveLeg(scene,side,target,footRotation){const upper=scene.getObjectByName(side+'_Thigh'),lower=scene.getObjectByName(side+'_Calf'),foot=scene.getObjectByName(side+'_Foot');scene.updateMatrixWorld(true);const hip=upper.getWorldPosition(new T.Vector3()),knee=lower.getWorldPosition(new T.Vector3()),ankle=foot.getWorldPosition(new T.Vector3()),l1=hip.distanceTo(knee),l2=knee.distanceTo(ankle),direction=target.clone().sub(hip),d=Math.min(direction.length(),l1+l2-.00001);direction.normalize();const pole=new T.Vector3(1,0,0).addScaledVector(direction,-direction.x).normalize(),a=(l1*l1-l2*l2+d*d)/(2*d),b=Math.sqrt(Math.max(0,l1*l1-a*a)),joint=hip.clone().addScaledVector(direction,a).addScaledVector(pole,b);aim(upper,lower,joint);aim(lower,foot,target);foot.quaternion.copy(foot.parent.getWorldQuaternion(new T.Quaternion()).invert().multiply(footRotation));scene.updateMatrixWorld(true);}
const report=[];
for(const c of CHARACTERS.filter(c=>!process.argv[2]||c.id===process.argv[2])){
 const dir=path.join(REVIEW,c.id),m=JSON.parse(await fs.readFile(path.join(dir,'manifest.json'),'utf8')),s=m.stages.find(s=>s.operation==='animate');if(!s)continue;
 const file=path.join(dir,s.uri),hash=await beforeHash(file);if(hash!==s.sha256)throw Error('Source mismatch');const g=await loadPilotGeometry(file),mixer=new T.AnimationMixer(g.scene),idle=g.animations.find(a=>a.name==='preset:biped:idle');mixer.clipAction(idle).play();mixer.setTime(0);g.scene.updateMatrixWorld(true);
 g.scene.traverse(o=>{if(o.isSkinnedMesh)o.computeBoundingBox();});const box=new T.Box3().setFromObject(g.scene),height=box.max.y-box.min.y,floor=box.min.y;
 const bones=g.scene.getObjectsByProperty('isBone',true),saved=bones.map(b=>({b,p:b.position.clone(),q:b.quaternion.clone(),s:b.scale.clone()})),reset=()=>{for(const x of saved){x.b.position.copy(x.p);x.b.quaternion.copy(x.q);x.b.scale.copy(x.s);}g.scene.updateMatrixWorld(true);};
 const refs=Object.fromEntries(['L','R'].map(side=>{const b=g.scene.getObjectByName(side+'_Hand');return [side,{p:b.getWorldPosition(new T.Vector3()),q:b.getWorldQuaternion(new T.Quaternion())}];}));
 const clips=[],contact=[];
 for(const [id,label,prop,kind] of ACTIONS[c.id]){
  const duration=kind==='read'?8:kind==='flute'?8:6,times=Array.from({length:Math.round(duration*30)+1},(_,i)=>i/30),values=Object.fromEntries(bones.map(b=>[b.name,[]])),positions=Object.fromEntries(bones.map(b=>[b.name,[]]));let worst=0;
  for(const t of times){reset();const u=t/duration,engage=smooth(clamp(u/.22))*smooth(clamp((1-u)/.20)),work=clamp((u-.25)/.5),osc=Math.sin(work*Math.PI*4),both=!['offer','point','tool','tape','listen'].includes(kind);let fx=.19,y=.48,z=.075;
   if(kind==='read'){fx=.17;y=.55;z=.085;}if(kind==='flute'){fx=.14;y=.66;z=.10;}if(kind==='tile'){fx=.20;y=.47+.09*Math.sin(work*Math.PI);z=.09;}if(kind==='plant'){fx=.16;y=.48;z=.045;}if(kind==='place'){fx=.16;y=.48;z=.13;}if(kind==='knead'||kind==='divide'||kind==='mix'||kind==='cards'){fx=.18;y=.48;z=.095;}if(kind==='wing'){fx=.19;y=.52;z=.085;}
   for(const side of ['L','R']){
    if(!both&&side==='L')continue;if(kind==='listen')continue;
    const sign=side==='L'?-1:1,desired=new T.Vector3(fx*height,floor+y*height,sign*z*height);
    if(kind==='flute'){desired.y=floor+.61*height;desired.z=(side==='L'?-.025:.15)*height;}
    if(kind==='mix'&&side==='R'){desired.x+=.055*height+.018*height*Math.cos(work*Math.PI*4);desired.y+=.09*height;desired.z=.01*height+.018*height*Math.sin(work*Math.PI*4);}
    if(kind==='knead')desired.y-=.018*height*Math.max(0,osc);
    if(kind==='divide')desired.z+=sign*.018*height*Math.sin(work*Math.PI);
    if(kind==='tape'){desired.x=.13*height;desired.y=floor+.54*height;desired.z=.04*height*(1-2*work);}
    if(kind==='point'){desired.x=.22*height;desired.y=floor+.56*height;desired.z=.16*height;}
    if(kind==='offer'){desired.x=.13*height;desired.y=floor+.54*height;desired.z=.07*height;}
    if(kind==='tool'){desired.x=.16*height;desired.y+=.04*height+.02*height*osc;}
    if(kind==='tile')desired.x=.17*height;
    const target=refs[side].p.clone().lerp(desired,engage),metric=solveArm(g.scene,side,target);if(engage>.95)worst=Math.max(worst,metric.error);
   }
   if(kind==='listen'){const head=g.scene.getObjectByName('Head');head.quaternion.multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),(id==='duet'?.24:.055)*engage*(id==='duet'?1:Math.sin(work*Math.PI))));}
   g.scene.updateMatrixWorld(true);for(const b of bones){values[b.name].push(...b.quaternion.toArray());positions[b.name].push(...b.position.toArray());}
  }
  const tracks=[];for(const b of bones){tracks.push(new T.QuaternionKeyframeTrack(b.name+'.quaternion',times,values[b.name]));tracks.push(new T.VectorKeyframeTrack(b.name+'.position',times,positions[b.name]));}
  const clip=new T.AnimationClip('custom:'+c.id+':'+id,duration,tracks);clips.push({...T.AnimationClip.toJSON(clip),label,prop,kind,phases:{approach:[0,.22],contact:[.22,.78],release:[.78,1]},maxWristTargetError:worst,source:'local-animation-only',movementApproval:'PENDING'});contact.push({id,kind,prop,maxTargetError:worst,bodyHeight:height});
 }
 if(c.id==='passenger'){
  reset();const hips=g.scene.getObjectByName('Hip'),pelvis=g.scene.getObjectByName('Pelvis'),pelvisStart=pelvis.getWorldPosition(new T.Vector3()),feet=Object.fromEntries(['L','R'].map(side=>{const foot=g.scene.getObjectByName(side+'_Foot');return [side,{p:foot.getWorldPosition(new T.Vector3()),q:foot.getWorldQuaternion(new T.Quaternion())}];})),times=Array.from({length:241},(_,i)=>i/30),q=Object.fromEntries(bones.map(b=>[b.name,[]])),p=Object.fromEntries(bones.map(b=>[b.name,[]]));
  for(const t of times){reset();const u=t/8,seated=smooth(clamp(u/.28))*smooth(clamp((1-u)/.3)),hipWorld=hips.getWorldPosition(new T.Vector3());hipWorld.x-=.12*height*seated;hipWorld.y+=(floor+.56/c.height*height-pelvisStart.y)*seated;hips.position.copy(hips.parent.worldToLocal(hipWorld));g.scene.updateMatrixWorld(true);for(const side of ['L','R'])solveLeg(g.scene,side,feet[side].p,feet[side].q);for(const side of ['L','R']){const target=refs[side].p.clone().lerp(new T.Vector3(.12*height,floor+.58/c.height*height,(side==='L'?-.09:.09)*height),seated);solveArm(g.scene,side,target);}for(const bone of bones){q[bone.name].push(...bone.quaternion.toArray());p[bone.name].push(...bone.position.toArray());}}
  const tracks=bones.flatMap(b=>[new T.QuaternionKeyframeTrack(b.name+'.quaternion',times,q[b.name]),new T.VectorKeyframeTrack(b.name+'.position',times,p[b.name])]),clip=new T.AnimationClip('custom:passenger:seat-and-stand',8,tracks);clips.push({...T.AnimationClip.toJSON(clip),label:'Sit on the bench, listen and stand',kind:'seat-transition',prop:null,sceneFixture:{id:'bench',position:[(pelvisStart.x-.12*height)*c.height/height,0,pelvisStart.z*c.height/height],rotationY:Math.PI/2},phases:{lower:[0,.28],seated:[.28,.7],stand:[.7,1]},source:'local-animation-only',movementApproval:'PENDING'});
 }
 // Carrying variants keep every native walking track except arm rotations.
 // They are separate clips; the Tripo walk file and its gait remain untouched.
 const walk=g.animations.find(a=>a.name==='preset:biped:walk'),carried=clips.find(x=>['carry','read','handoff'].includes(x.kind));
 if(walk&&carried){const pose=T.AnimationClip.parse(carried),tracks=walk.tracks.map(t=>t.clone());for(const t of pose.tracks.filter(t=>/^(L|R)_(Upperarm|Forearm|Hand)\.quaternion$/.test(t.name))){const value=Array.from(t.createInterpolant().evaluate(pose.duration*.5)),i=tracks.findIndex(x=>x.name===t.name),replacement=new T.QuaternionKeyframeTrack(t.name,[0,walk.duration],[...value,...value]);if(i>=0)tracks[i]=replacement;else tracks.push(replacement);}const carry=new T.AnimationClip('custom:'+c.id+':carry-walk',walk.duration,tracks);clips.push({...T.AnimationClip.toJSON(carry),label:'Carry while walking (Tripo gait + separate arm pose)',prop:carried.prop,kind:carried.prop==='seed'?'handoff':'carry',phases:{contact:[0,1]},source:'Tripo walk copied unchanged below shoulders; separate arm rotations',derivedFrom:'preset:biped:walk',movementApproval:'PENDING'});}
 const output={schema:'eq.animation-only-sidecar.v1',assetId:c.id,sourceModelUri:s.uri,sourceModelSha256:hash,sourceRigSha256:m.stages.find(s=>s.operation==='rig').sha256,geometryChanged:false,weightsChanged:false,boneHierarchyChanged:false,nativeClipsChanged:false,independentFingersRequired:false,coordinateSystem:'Tripo native +X forward, +Y up',nativeBodyHeight:height,nativeFloor:floor,handAttachments:{left:{bone:'L_Hand',offset:[0,.025*height,0]},right:{bone:'R_Hand',offset:[0,.025*height,0]}},clips};
 await fs.writeFile(path.join(dir,'custom-actions.json'),JSON.stringify(output)+'\n');if(await beforeHash(file)!==hash)throw Error('Provider file changed');report.push({id:c.id,clips:clips.length,contact});
}
console.log(JSON.stringify(report));
