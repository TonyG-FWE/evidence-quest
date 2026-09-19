import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import * as T from 'three';
import {readGlb,loadPilotGeometry} from './pilot-glb.mjs';
const root='evidence/hands-on-20260916/pilot/articulated-library-20260917',manifest=JSON.parse(await fs.readFile(root+'/manifest.json')),report={at:new Date().toISOString(),scope:'Review library files, source identity, functional parts and approval gates. Not human Form acceptance.',assets:[],errors:[]};
const hash=buf=>createHash('sha256').update(buf).digest('hex');
const requiredStates={'seed-boat':['empty_cradle','seed_loaded'],'lantern-flower':['seed','shoot','bud','rooted_bloom'],'planting-bed':['unprepared','prepared','seed_in_hollow','covered'],'paper-bird':['torn','aligned','taped'],'roof-tile':['intact','cracked','overlapping'],'rope':['loose_coil','wrapping','tightened_knot'],'dough':['whole','kneaded','four_portions'],'bread':['baked_portions','unshaped_batch','recovered_bake'],'bakery':['roof_unrepaired','roof_repaired']};
for(const a of manifest.assets){
 const errors=[],m=a.model;try{
  if(!m)throw Error('Missing model');
  const file=path.join(root,m.uri),{json,bytes}=await readGlb(file),gltf=await loadPilotGeometry(file);gltf.scene.updateMatrixWorld(true);
  if(hash(bytes)!==m.sha256)errors.push('GLB hash mismatch');
  if(hash(await fs.readFile(path.join(root,a.reference.uri)))!==a.reference.sha256)errors.push('Approved image changed');
  if(hash(await fs.readFile(path.join(root,'models',a.id,m.editableSource)))!==m.editableSourceSha256)errors.push('Editable model changed');
  if(!m.reviewOnly||m.productionExport||m.formApproval!=='PENDING'||a.productionIntegrationAllowed)errors.push('Model escaped human Form gate');
  const names=new Set();let triangles=0,vertices=0;gltf.scene.traverse(o=>{names.add(o.name);if(o.isMesh){vertices+=o.geometry.attributes.position.count;triangles+=(o.geometry.index?.count??o.geometry.attributes.position.count)/3;}});
  if(!triangles||!vertices)errors.push('Empty model');
  const bounds=new T.Box3().setFromObject(gltf.scene);if(![...bounds.min,...bounds.max].every(Number.isFinite))errors.push('Invalid bounds');
  for(const p of m.parts??[])if(!names.has(T.PropertyBinding.sanitizeNodeName(p)))errors.push('Missing named part: '+p);
  for(const [id,anchor] of Object.entries(m.anchors??{})){const node=gltf.scene.getObjectByName(T.PropertyBinding.sanitizeNodeName(anchor.node));if(!node)errors.push('Missing anchor: '+id);else if(node.getWorldPosition(new T.Vector3()).distanceTo(new T.Vector3(...anchor.position))>.002)errors.push('Anchor mismatch: '+id);}
  for(const state of m.states??[])for(const node of state.nodes)if(!names.has(node))errors.push('Missing state geometry '+state.id);
  for(const id of requiredStates[a.id]??[])if(!m.states?.some(s=>s.id===id))errors.push('Missing functional state '+id);
  for(const [name,clip] of Object.entries(m.clips??{}))if(!gltf.animations.some(c=>c.name===clip.name))errors.push('Missing animation '+name);
  if(m.bones){
   for(const side of ['L','R'])for(const joint of ['clavicle','upper_arm','forearm','forearm_twist','hand','thigh','shin','foot','toe'])if(!names.has(joint+'_'+side))errors.push('Missing anatomical joint '+joint+'_'+side);
   for(const key of ['idle','walk','carry_idle','carry_walk','start','stop','turn_left','turn_right','carry_start','carry_stop','carry_turn_left','carry_turn_right','open_hand','grip','pinch','cup','press','handoff'])if(!m.clips[key])errors.push('Missing movement '+key);
   if(!m.adapter?.attachments?.L||!m.adapter?.attachments?.R)errors.push('Missing adapter hand mapping');
  }
  if(a.id==='loop')for(const part of ['wheel','axle','lens','handle','button','casing'])if(![...names].some(n=>n.toLowerCase().includes(part)))errors.push('Missing Loop component '+part);
  if(a.id==='seed-boat'&&m.anchors.seed_cradle.position[1]<.104)errors.push('Seed cradle is below the retained hull floor');
  for(const image of json.images??[])if(!image.bufferView&&image.bufferView!==0)errors.push('External or absent model image buffer');
  report.assets.push({id:a.id,world:a.world,sha256:m.sha256,bytes:bytes.length,triangles,vertices,parts:names.size,states:(m.states??[]).length,clips:gltf.animations.length,result:errors.length?'FAIL':'PASS',errors});
 }catch(e){errors.push(e.message);report.assets.push({id:a.id,result:'FAIL',errors});}
 report.errors.push(...errors.map(e=>a.id+': '+e));
}
if(manifest.assets.length!==77)report.errors.push('Expected all 77 approved designs');
const ledger=JSON.parse(await fs.readFile('evidence/hands-on-20260916/tripo-ledger.json'));
if(ledger.actualCharged!==740||ledger.reservedForUnresolved!==0||ledger.actualCharged>2500)report.errors.push('Charge/reservation reconciliation mismatch');
report.credits={actual:ledger.actualCharged,reserved:ledger.reservedForUnresolved,ceiling:ledger.ceiling};report.result=report.errors.length?'FAIL':'PASS';
const filename=root+'/verification/library-'+report.at.replaceAll(':','-')+'.json';await fs.writeFile(filename,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({result:report.result,models:report.assets.length,errors:report.errors,evidence:filename},null,2));if(report.errors.length)process.exitCode=1;
