import fs from 'node:fs/promises';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
import {VisualAssetLibrary,CharacterVisual} from '../.cache/contact-runtime/src/garden/assets/visualAsset.js';
import {BAKERY_REPAIR,VILLAGE_BUILDINGS} from '../.cache/contact-runtime/src/garden/worldLayout.js';
import {roofTileContact,tileGripOffset,roofPlacementProgress} from '../.cache/contact-runtime/src/garden/bakeryWorld.js';
const root='evidence/final-demo-20260918',m=JSON.parse(await fs.readFile(root+'/review-assets.json','utf8')),d=m.assets.sol,g=await loadPilotGeometry(m.bindings.find(b=>b.id==='sol').source);
for(const a of d.animations??[]){const f=JSON.parse(await fs.readFile('.cache/final-demo-review/assets/'+a.uri.split('/').at(-1)));g.animations.push(...f.clips.map(c=>T.AnimationClip.parse(c)));}
const bd=m.assets.bakery,bg=await loadPilotGeometry(m.bindings.find(b=>b.id==='bakery').source),building=new T.Group(),normal=new T.Group(),offset=new T.Group();
offset.position.fromArray(bd.normalization.offset);offset.add(bg.scene);normal.scale.fromArray(bd.normalization.scale);normal.rotation.set(...bd.normalization.rotation);normal.add(offset);building.add(normal);building.position.fromArray(VILLAGE_BUILDINGS.bakery.position);building.rotation.y=VILLAGE_BUILDINGS.bakery.rotation;building.scale.setScalar(VILLAGE_BUILDINGS.bakery.scale);building.updateMatrixWorld(true);
const library=new VisualAssetLibrary(async()=>g,true),rows=[],rotation=new T.Euler(...BAKERY_REPAIR.rotation),grip=tileGripOffset(rotation),leases=[];
for(const placement of ['gap','beside'])for(let frame=31;frame<78;frame++){
 const t=frame/100,v=new CharacterVisual(await library.acquire(d)),actor=new T.Group(),p=BAKERY_REPAIR.solTop,destination=BAKERY_REPAIR[placement];leases.push(v);actor.add(v.root);actor.position.set(destination.x,p.y,p.z);actor.rotation.y=Math.PI;
 const hit=new T.Raycaster(new T.Vector3(destination.x,10,p.z),new T.Vector3(0,-1,0)).intersectObject(building,true).find(h=>h.face.normal.clone().transformDirection(h.object.matrixWorld).y>.55);if(!hit)throw Error('Unsupported roof stance');actor.position.y=hit.point.y;
 v.sync({position:[0,0,0],yaw:0,motion:'idle',carrying:true,paused:true,reducedMotion:false,action:{kind:'roof',progress:t}});v.update(0);actor.updateMatrixWorld(true);
 const palm=v.hand.getWorldPosition(new T.Vector3()),tile=palm.clone().sub(grip).lerp(roofTileContact(destination),roofPlacementProgress(t)),target=tile.add(grip);let error;for(let i=0;i<3;i++)error=v.reachHand(target);
 rows.push({placement,t,error,hand:v.hand.getWorldPosition(new T.Vector3()).toArray(),target:target.toArray(),feet:actor.position.toArray()});
}
const result={at:new Date().toISOString(),scope:'Actual source meshes and existing bone contact samples; native deformation and visual acceptance remain separate.',sourceSha256:d.sourceSha256,animation:d.animations.at(-1),maxHandErrorMetres:Math.max(...rows.map(r=>r.error)),rows};
await fs.writeFile(root+'/'+(process.argv[2]??'roof-contact-correction')+'.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({maximum:result.maxHandErrorMetres,byPlacement:['gap','beside'].map(placement=>({placement,max:Math.max(...rows.filter(r=>r.placement===placement).map(r=>r.error))})),worst:rows.sort((a,b)=>b.error-a.error).slice(0,3)}));
for(const v of leases)v.dispose();library.dispose();
