/** Explicit runtime membership, component identity and review-only source bindings. */
import fs from 'node:fs/promises';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
import {addSceneryMembership} from './scenery-membership.mjs';
const root='evidence/final-demo-20260918',cache='.cache/final-demo-review/assets';
const report=JSON.parse(await fs.readFile(root+'/review-assets.json','utf8')),sources=JSON.parse(await fs.readFile(root+'/source-bindings.json','utf8'));
const membership={
 crossing:['pip','seed','tree-1',...(report.assets['platform-bridge-fitted']?['platform-bridge-fitted']:report.assets['bridge-fitted']?['bridge-fitted']:['bridge','platform']),'post','bollard','rope-coil','rope-straight','knot','crate','boat-space','cattail','marker'],
 dock:['pip','mara','operator','boy','passenger','seed','tree-1','cottage','dock','bell','post','ramp','boat-2','card'],
 river:['pip','grandma','seed','tree-1','boat-space','cattail','marker','dock-1'],
 garden:['pip','grandma','sol','mara','seed','tree-1','willow','arbor','bench-1','flower-2','bud','sprout','pebbles','soil-open','soil-covered','trowel','cushion','chest','card','marker','dock-1'],
 bakery:['pip','rina','sol','seed','tree-1','bakery','oven','bench','tile','tile-2','flour','ladder','toolbox','scoop','bowl','dough-kneaded','dough','loaf','loaf-3','card'],
 workshop:['pip','sol','seed','tree-1',report.assets['workshop-clear-porch']?'workshop-clear-porch':'cottage-1','bench','card'],
 recollection:['mara','boy','cottage','boat-2','bird','wingtip','tape-strip','tape-roll-2','dock','ramp','bench'],
 studio:['jo','loop','stage-1','table','storybook','pencils','cup','cards','potted'],
 presentation:["pip","grandma","sol","mara","rina","boy","passenger","card","bakery","flour","bench","toolbox","loaf","dock","bird","wingtip","tape-strip","boat-2","recorder","napkin","rock","cake","bench-1","cushion","soil-covered","flower-2","sprout"],
};
addSceneryMembership(membership);
for(const place of ['crossing','river','garden'])membership[place].push('grass-island');
for(const place of ['river','garden'])membership[place].push('coastal-bank','riverbank');
const components={
 bridge:{assembly:'First independent deck; six-post bridge construction',connectors:['west-north','west-south','center-north','center-south']},
 platform:{assembly:'Second independent deck',connectors:['center-north','center-south','east-north','east-south']},
 'boat-space':{assembly:'Steered seed boat',attachments:{'seed-cradle':[0,.187,0]}},
 bird:{assembly:'Same paper bird body throughout earlier recollection',parts:['wingtip','tape-strip']},
 wingtip:{assembly:'Movable wing fragment of the same bird',host:'MaraWorld.wing'},
 'tape-strip':{assembly:'Applied across the aligned tear on that bird',host:'MaraWorld.tape'},
 'crate-2':{assembly:'Garden storage chest base',parts:['tray']},
 tray:{assembly:'Garden storage chest lid',host:'gathering.storageLid hinge'},
 'soil-open':{assembly:'Prepared planting bed before covering',states:['seed held','seed in bed']},
 'soil-covered':{assembly:'Covered planting bed',states:['rooted sprout','BLOOM growth','bloom']},
 sprout:{assembly:'Rooted plant after covering; awaits explicit BLOOM',next:'bud'},
 bud:{assembly:'Intermediate growth during BLOOM',next:'flower-2'},
 'flower-2':{assembly:'Completed lantern flower and selected memory host'},
 tile:{assembly:'Intact roof tile transferred through Sol hand to actual roof gap'},
 'tile-2':{assembly:'Damaged roof state; removed when the same gap is repaired'},
 loop:{assembly:'Complete supplied camera robot with native wheel geometry'},
 'stage-1':{assembly:'Studio floor and open stage; furniture remains independent'},
};
for(const [id,asset]of Object.entries(report.assets)){
 const binding=report.bindings.find(b=>b.id===id),source=sources.files.find(f=>f.file===binding.source);
 asset.locations=Object.entries(membership).filter(([,ids])=>ids.includes(id)).map(([location])=>location);
 if(source){asset.reference={id:source.referenceId,state:source.state,images:source.referenceMatches};asset.components={...asset.components,referenceParts:source.components,...components[id]};}
 if(components[id]?.attachments)asset.anchors={...asset.anchors,...components[id].attachments};
 if(asset.rig){
  // The source's stored mesh bounds describe its bind pose. Ground the outer
  // transform against the actual native idle skin without editing that skin.
  const g=await loadPilotGeometry(binding.source),mixer=new T.AnimationMixer(g.scene),idle=g.animations.find(c=>c.name===asset.rig.clips.idle);
  if(!idle)throw Error('Native idle is missing: '+id);mixer.clipAction(idle).play();mixer.setTime(0);g.scene.updateMatrixWorld(true);g.scene.traverse(o=>{if(o.isSkinnedMesh){o.skeleton.update();o.computeBoundingBox();}});
  const b=new T.Box3().setFromObject(g.scene),height=({pip:1.05,grandma:1.3,mara:1.52,rina:1.4,sol:1.58,boy:1.06,operator:1.57,passenger:1.5,jo:1.17})[id],scale=height/(b.max.y-b.min.y);
  asset.normalization={scale:[scale,scale,scale],rotation:[0,-Math.PI/2,0],offset:[-(b.min.x+b.max.x)/2,-b.min.y,-(b.min.z+b.max.z)/2]};
  const meshes=g.scene.getObjectsByProperty('isSkinnedMesh',true),soles=new Map(meshes.map(mesh=>[mesh,new Set()])),walk=g.animations.find(c=>c.name===asset.rig.clips.walk),point=new T.Vector3();
  // Collect actual sole extrema across the untouched walk, including both feet.
  // The bind pose can leave one shoe above the other; one static slice misses it.
  mixer.stopAllAction();mixer.clipAction(walk).play();for(let frame=0;frame<64;frame++){
   mixer.setTime(walk.duration*frame/64);g.scene.updateMatrixWorld(true);
   for(const mesh of meshes){let minimum=Infinity,indices=[];for(let i=0;i<mesh.geometry.attributes.position.count;i++){mesh.getVertexPosition(i,point);mesh.localToWorld(point);if(point.y<minimum-1e-7){minimum=point.y;indices=[i];}else if(Math.abs(point.y-minimum)<1e-7)indices.push(i);}if(minimum<b.min.y+.15/scale)for(const index of indices)soles.get(mesh).add(index);}
  }
  asset.grounding=[...soles].filter(([,indices])=>indices.size).map(([mesh,indices])=>({mesh:mesh.name,vertices:[...indices].sort((a,b)=>a-b)}));
  if(asset.attachments?.backpack?.joint==='Spine02')asset.attachments.backpack.point=[-.18/scale,0,0];
  binding.normalizationBasis={clip:idle.name,time:0,skinnedBounds:{min:b.min.toArray(),max:b.max.toArray()},height};mixer.stopAllAction();
 }
 binding.runtimeMembership=asset.locations;binding.selection=asset.locations.length?'SELECTED_LOCAL_REVIEW':'PRESERVED_CANDIDATE_NOT_LOADED';
}
report.locationMembership=membership;
await fs.writeFile(root+'/review-assets.json',JSON.stringify(report,null,2)+'\n');
await fs.writeFile(cache+'/manifest.json',JSON.stringify(report,null,2)+'\n');
await fs.writeFile('src/garden/assets/reviewManifest.ts',"// Generated local review only. This does not grant production approval.\nimport type {VisualAssetDefinition} from './visualAsset.js';\nexport const reviewAssets:Record<string,VisualAssetDefinition>="+JSON.stringify(report.assets,null,2)+';\n');
console.log(JSON.stringify({assets:Object.keys(report.assets).length,runtime:Object.values(report.assets).filter(a=>a.locations.length).length,locations:Object.keys(membership)}));
