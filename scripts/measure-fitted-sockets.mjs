import fs from 'node:fs/promises';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
import {BRIDGE_GEOMETRY as b,BRIDGE_LEVELS as l} from '../.cache/checks/src/garden/worldLayout.js';
import {postRootHeight,postPoint,bridgePosts} from '../.cache/checks/src/garden/bridgeConstruction.js';
import {GardenStore,initialGarden,CROSSING} from '../.cache/checks/src/garden/model.js';
import {advance} from '../.cache/checks/checks/garden-play-actions.js';
import {buildBridge} from '../.cache/checks/checks/garden-bridge-actions.js';
if(l.deck<.9)throw Error('Use EQ_ASSET_PROFILE=review with current compiled modules');
const manifest=JSON.parse(await fs.readFile('evidence/final-demo-20260918/review-assets.json','utf8')),asset=manifest.assets['platform-bridge-fitted'],binding=manifest.bindings.find(b=>b.id==='platform-bridge-fitted'),source=await loadPilotGeometry(binding.source),root=new T.Group(),normal=new T.Group(),origin=new T.Group();
normal.scale.fromArray(asset.normalization.scale);normal.rotation.set(...asset.normalization.rotation);origin.position.fromArray(asset.normalization.offset);origin.add(source.scene);normal.add(origin);root.add(normal);root.scale.fromArray(b.modelScale);root.rotation.y=b.modelYaw;root.position.y=l.deck-b.sourceSurface+b.modelOffset;root.updateMatrixWorld(true);
const sockets=[];
for(const x of [-b.halfLength,b.halfLength])for(const z of [-b.postOffset,b.postOffset]){
 const hits=[];for(const dx of [-.030,0,.030])for(const dz of [-.031,0,.031]){const h=new T.Raycaster(new T.Vector3(x+dx,2,z+dz),new T.Vector3(0,-1,0)).intersectObject(root,true);hits.push({dx,dz,top:h[0]?.point.y,mesh:h[0]?.object.name});}sockets.push({x,z,hits});
}
const store=new GardenStore(initialGarden('socket-contact-measurement'));store.send({type:'BOOT'});store.send({type:'BEGIN'});store.send({type:'START_PLAY'});store.send({type:'GO',point:CROSSING});advance(store);buildBridge(store);const chapter=store.getSnapshot().chapter;
const proof=JSON.parse(await fs.readFile('output/screenshot-repairs-20260918/platform-bridge/provenance.json','utf8')),aperture=proof.mapping.filter(m=>m.worldApertureAtYaw).reduce((a,m)=>a.map((v,i)=>Math.min(v,m.worldApertureAtYaw[i])),[Infinity,Infinity]);
const postBounds={};
for(const id of ['post','bollard']){const a=manifest.assets[id],binding=manifest.bindings.find(b=>b.id===id),g=await loadPilotGeometry(binding.source),r=new T.Group(),n=new T.Group(),o=new T.Group();n.scale.fromArray(a.normalization.scale);n.rotation.set(...a.normalization.rotation);o.position.fromArray(a.normalization.offset);o.add(g.scene);n.add(o);r.add(n);r.scale.fromArray(id==='post'?b.centerPostScale:b.endPostScale);r.updateMatrixWorld(true);postBounds[id]=new T.Box3().setFromObject(r);}
const contacts=bridgePosts.map(id=>{const p=postPoint(chapter,id),socket=sockets.find(s=>Math.sign(s.x)===(id.startsWith('west')?-1:1)&&Math.sign(s.z)===Math.sign(p.z-3)),height=postRootHeight(chapter,id),bounds=postBounds[id.startsWith('center')?'post':'bollard'],width=bounds.max.x-bounds.min.x,depth=bounds.max.z-bounds.min.z;return {id,point:p,base:height+bounds.min.y,socketCenterFloor:socket.hits.find(h=>h.dx===0&&h.dz===0).top,maximumFloorDifference:Math.max(...socket.hits.map(h=>Math.abs(height+bounds.min.y-h.top))),fullPostFootprint:[width,depth],minimumAperture:aperture,apertureClearance:[aperture[0]-width,aperture[1]-depth]};});
const checks={allSixPostsSeated:contacts.every(c=>Math.abs(c.base-c.socketCenterFloor)<1e-6&&c.maximumFloorDifference<.001),allPostEnvelopesInsideAperture:contacts.every(c=>c.apertureClearance.every(v=>v>0))};
const result={at:new Date().toISOString(),profile:'local-review',source:binding.source,sha256:binding.sourceSha256,bridge:b,levels:l,sockets,contacts,checks,scope:'Source mesh rays and complete normalized post envelopes; native appearance is checked separately.'};
await fs.writeFile(process.argv[2]??'evidence/final-demo-20260918/screenshot-repair/platform-socket-contact.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({checks,contacts}));if(Object.values(checks).some(v=>!v))process.exitCode=1;
