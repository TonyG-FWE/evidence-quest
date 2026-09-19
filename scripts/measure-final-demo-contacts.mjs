import fs from 'node:fs/promises';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
import {VILLAGE_BUILDINGS,BAKERY_REPAIR,bakerySourceContact,bakeryContactScale} from '../.cache/checks/src/garden/worldLayout.js';
const groundPoints=ps=>ps.map(([x,z])=>{const p=bakerySourceContact(x,.13,z);return [p.x,p.z];});
const root='evidence/final-demo-20260918',manifest=JSON.parse(await fs.readFile(root+'/review-assets.json','utf8'));
const cases=[
 {id:'bench',points:[[0,0],[-.7,-.25],[.7,.25],[.7,-.25],[-.7,.25]],purpose:'Supplied village worktable native dimensions and tabletop corners'},
 {id:'loaf',points:[],purpose:'Baked loaf native axes for the oven mouth'},
 {id:'loaf-3',points:[],purpose:'Unshaped batch native axes for the oven mouth'},
 {id:'boat-2',position:[-4.1,-.23,-14.1],points:[[-4.1,-13.8],[-4.1,-14.33],[-4,-14.75],[-4,-14.9],[-4,-14.6]],purpose:'Passenger and operator feet on the supplied boat; corrected native long axis'},
 {id:'dock',position:[-5.65,-.40,-14.1],scale:[.5,.5,.5],points:[[-5.65,-14.1],[-5.3,-14.1],[-5.65,-13.8]],purpose:'Passenger dock floor and ramp connection'},
 {id:'ladder',position:[BAKERY_REPAIR.ladder.x,.13,BAKERY_REPAIR.ladder.z],rotation:[0,BAKERY_REPAIR.ladder.yaw,0],scale:Array(3).fill(BAKERY_REPAIR.ladder.scale),points:[[BAKERY_REPAIR.ladderFoot.x,BAKERY_REPAIR.ladderFoot.z],[BAKERY_REPAIR.solTop.x,BAKERY_REPAIR.solTop.z]],purpose:'Uniform supplied ladder at the enlarged bakery; root and roof-side support bounds'},
 {id:'rope-straight',points:[],purpose:'Straight supplied rope native longitudinal axis'},
 {id:'oven',points:[[0,0],[0,.3],[0,-.3]],purpose:'Oven native chamber/support bounds'},
 {id:'boat-space',points:[[0,0],[0,.15],[0,-.15]],purpose:'Seed cradle floor candidates'},
 {id:'bridge',position:[0,.03,0],rotation:[0,Math.PI/2,0],scale:[1.42,.77,1],points:[[0,0],[-.6,0],[.6,0]],purpose:'Bridge A walking deck after floor correction'},
 {id:'platform',position:[0,.02,0],rotation:[0,Math.PI/2,0],scale:[1.13,.46,1],points:[[0,0],[-.6,0],[.6,0]],purpose:'Bridge B walking deck after floor correction'},
 {id:'stage-1',position:[1,-.12,-.5],rotation:[0,-Math.PI/2,0],points:[[.35,1.15],[.35,.55],[.6,.85],[1,.95],[1.4,-.25],[2.25,-.85]],purpose:'Studio floor at Jo, table and plant'},
 {id:'bakery',position:VILLAGE_BUILDINGS.bakery.position,rotation:[0,VILLAGE_BUILDINGS.bakery.rotation,0],scale:Array(3).fill(VILLAGE_BUILDINGS.bakery.scale),points:groundPoints([[19.2238333,-2.2446451],[18.6238333,-2.2446451],[19.8238333,-2.2446451],[19.2238333,-2.5446451],[19.224,-1.645],[18.85,-1.13]]),purpose:'Current uniform bakery roof opening, surrounding supports and Sol foot position'},
 {id:'tile',position:[BAKERY_REPAIR.gap.x,BAKERY_REPAIR.gap.y-.42*bakeryContactScale,BAKERY_REPAIR.gap.z-.10*bakeryContactScale],rotation:[.70,0,.24],scale:Array(3).fill(BAKERY_REPAIR.tileScale),points:groundPoints([[19.2238333,-2.2446451],[18.8238333,-2.2446451],[19.6238333,-2.2446451],[19.2238333,-2.3946451],[19.2238333,-1.9446451]]),purpose:'The same supplied replacement tile covers the actual roof opening through its fitted outer transform'},
 {id:'table',position:[1.4,.206,-.25],rotation:[0,Math.PI/2,0],scale:[1.05,1,1.2],points:[[1.2,-.25],[2.25,-.6],[.5,.08],[2.3,.08]],purpose:'Studio support heights after floor correction'},
 {id:'bench',position:[11,.13,-9.1],rotation:[0,Math.PI/2,0],scale:[1.55,1.015,1.36],points:[[11,-9.1],[9.94,-9.69],[12.06,-9.69],[9.94,-8.51],[12.06,-8.51],[11.8,-9.5],[10,-9.6]],purpose:'Workshop card-grid corners on supplied village worktable; card faces are at y=.938'},
 {id:'bench',position:[19.55,.13,.65],rotation:[0,Math.PI/2,0],scale:[.70,.785,.80],points:[[19.03,.5],[19.20,.65],[19.45,.65],[19.80,.65]],purpose:'Bakery worktop supporting mixed dough, portions and recoverable batch'},
 {id:'bench',position:[20.15,.13,1.6],rotation:[0,Math.PI/2,0],scale:[.55,.595,.50],points:[[20.15,1.6]],purpose:'Tile shelf supports source tile base at y=.60'},
 {id:'oven',position:[19.75,.13,-.45],points:[[19.56,-.20],[19.74,-.20],[19.92,-.20]],purpose:'Oven exterior down-probes; actual interior loaf support is separately measured in oven-opening.json'},
];
const reports=[];
for(const c of cases){const d=manifest.assets[c.id],binding=manifest.bindings.find(b=>b.id===c.id),g=await loadPilotGeometry(binding.source),root=new T.Group(),wrapper=new T.Group(),origin=new T.Group();wrapper.scale.fromArray(d.normalization.scale);wrapper.rotation.set(...d.normalization.rotation);origin.position.fromArray(d.normalization.offset);origin.add(g.scene);wrapper.add(origin);root.add(wrapper);if(c.position)root.position.fromArray(c.position);if(c.rotation)root.rotation.set(...c.rotation);if(c.scale)root.scale.fromArray(c.scale);root.updateMatrixWorld(true);
 const rays=c.points.map(([x,z])=>{const ray=new T.Raycaster(new T.Vector3(x,10,z),new T.Vector3(0,-1,0));return {x,z,hits:ray.intersectObject(root,true).slice(0,8).map(h=>({y:h.point.y,normal:h.face?.normal.clone().transformDirection(h.object.matrixWorld).toArray()}))};});reports.push({id:c.id,source:binding.source,sourceSha256:d.sourceSha256,purpose:c.purpose,bounds:new T.Box3().setFromObject(root),rays});}
await fs.writeFile('evidence/final-demo-20260918/object-contact-final.json',JSON.stringify(reports,null,2)+'\n');console.log(JSON.stringify(reports.map(r=>({id:r.id,rays:r.rays.map(p=>({x:p.x,z:p.z,y:p.hits[0]?.y,normal:p.hits[0]?.normal}))})),null,2));
