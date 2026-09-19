import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {CharacterVisual,VisualAssetLibrary,type VisualLease} from '../src/garden/assets/visualAsset.js';
import {PaperArt} from '../src/garden/art.js';
import {makePaintedVillageKit} from '../src/garden/assets/paintedKit.js';
import {makeRiversideLandscape} from '../src/garden/worldArt.js';
import {makeBakery} from '../src/garden/bakeryWorld.js';
import {makeWorkshop} from '../src/garden/chapterWorld.js';
import {anchors,terrainHeight} from '../src/garden/worldLayout.js';
const el=(id:string)=>document.getElementById(id)!;
const select=(id:string)=>(el(id) as HTMLSelectElement).value;
const manifest=await(await fetch('./manifest.json')).json();
const kitView=(id:string)=>['kit','garden-kit','bakery-kit','roof-kit'].includes(id);
const renderer=new T.WebGLRenderer({canvas:el('canvas') as HTMLCanvasElement,antialias:true});renderer.setPixelRatio(devicePixelRatio);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;
const scene=new T.Scene();scene.background=new T.Color('#d8e1cf');scene.add(new T.HemisphereLight('#fff3d2','#7b9c87',1.7));
const sun=new T.DirectionalLight('#fff0cf',2.2);sun.position.set(-7,13,6);sun.castShadow=true;sun.shadow.mapSize.set(1536,1536);Object.assign(sun.shadow.camera,{left:-10,right:10,top:10,bottom:-10});sun.shadow.normalBias=.025;scene.add(sun);
const camera=new T.PerspectiveCamera(34,1,.01,140),gameCamera=new T.OrthographicCamera(-8,8,5.7,-5.7,.1,140);let active:T.Camera=camera;
const controls=new OrbitControls(camera,el('canvas'));controls.enableDamping=true;controls.minDistance=.5;controls.maxDistance=65;
const art=new PaperArt(),floor=art.box(scene,0,-.04,0,150,.08,150,'#c4d1b8'),seed=art.ball(scene,0,.04,0,.04,'#e7ba55',[.7,1,.7]);
const soil=art.cylinder(scene,0,0,0,.42,.42,.025,'#806b47',24);soil.visible=false;
const water=art.box(scene,0,-.05,0,20,.035,20,'#73aaa4');water.visible=false;
const contactBanks=new T.Group();for(const x of [-1.35,1.35])art.box(contactBanks,x,-.04,1,1.8,.08,5,'#c4d1b8');contactBanks.visible=false;scene.add(contactBanks);
const landscape=makeRiversideLandscape(art),kit=makePaintedVillageKit(art);landscape.root.visible=landscape.currents.visible=kit.root.visible=false;
const bakery=makeBakery(art),workshop=makeWorkshop(art);kit.paintSurfaces(landscape.root,bakery.shell,workshop);kit.root.add(bakery.root,workshop);
landscape.root.traverse(o=>{if(o instanceof T.InstancedMesh)o.visible=false;});scene.add(landscape.root,landscape.currents,kit.root);
const library=new VisualAssetLibrary();let lease:VisualLease|null=null,flower:VisualLease|null=null,actor:CharacterVisual|null=null,grandma:CharacterVisual|null=null,generation=0,closed=false,last=performance.now(),clock=0,paused=matchMedia('(prefers-reduced-motion: reduce)').matches,carrying=true;
function resize(){const box=el('stage').getBoundingClientRect();renderer.setSize(box.width,box.height,false);camera.aspect=box.width/Math.max(1,box.height);camera.updateProjectionMatrix();const id=select('asset'),base=id==='roof-kit'?2.5:id==='bakery-kit'?3.3:kitView(id)?5.7:select('view')==='activity'?2.1:5.7,half=Math.max(base,base*.95/camera.aspect);gameCamera.left=-half*camera.aspect;gameCamera.right=half*camera.aspect;gameCamera.top=half;gameCamera.bottom=-half;gameCamera.updateProjectionMatrix();}
function frame(){
 const id=select('asset'),view=select('view'),location=['garden-kit','bakery-kit','roof-kit'].includes(id),game=location||['gameplay','activity'].includes(view),wide=kitView(id);resize();active=game?gameCamera:camera;controls.object=active;controls.enabled=!game;
 const center=id==='garden-kit'?new T.Vector3(anchors.garden.approach.x,.5+terrainHeight(anchors.garden.approach)-.13,anchors.garden.approach.z):id==='roof-kit'?new T.Vector3(18.8,1.1,-.6):id==='bakery-kit'?new T.Vector3(19.1,.5,.2):wide?new T.Vector3(9,.8,8):id==='handoff'?new T.Vector3(.2,.6,1):new T.Vector3(0,id==='pip'?.56:id==='lantern-flower'?.65:.15,0),d=wide?23:id==='handoff'?6:id==='seed-boat'?1.6:3.3;
 const offset=view==='front'?new T.Vector3(0,.1,d):view==='back'?new T.Vector3(0,.1,-d):view==='right'?new T.Vector3(d,.1,0):view==='left'?new T.Vector3(-d,.1,0):view==='top'?new T.Vector3(.01,d,.02):new T.Vector3(d*.55,d*.32,d*.8);
 if(game)offset.set(...(id==='bakery-kit'?[14,16,10]:[7.5,13,19]) as [number,number,number]);active.position.copy(center).add(offset);controls.target.copy(center);active.lookAt(center);active.updateMatrixWorld();controls.update();
 if(wide){sun.position.copy(center).add(new T.Vector3(-7,13,6));sun.target.position.copy(center);sun.target.updateMatrixWorld();}
 if(id==='handoff'&&view==='three'){active.position.copy(center).add(new T.Vector3(5,3,-4));active.lookAt(center);controls.update();}
 document.body.dataset.cameraView=view;
}
async function choose(){
 const token=++generation,id=select('asset');document.body.dataset.ready='false';seed.removeFromParent();scene.add(seed);seed.visible=false;actor?.dispose();actor=null;grandma?.dispose();grandma=null;lease?.release();lease=null;flower?.release();flower=null;clock=0;
 soil.visible=id==='lantern-flower'||id==='handoff';soil.position.set(id==='handoff'?1.2:0,0,id==='handoff'?2.3:0);water.visible=id==='seed-boat'||id==='handoff';water.scale.set(id==='handoff'?.045:1,1,id==='handoff'?.25:1);contactBanks.visible=id==='handoff';landscape.root.visible=landscape.currents.visible=kit.root.visible=kitView(id);floor.visible=!kitView(id)&&!['seed-boat','handoff'].includes(id);
 if(id==='handoff'){
  const definitions=[manifest.pip,manifest.grandma,manifest.props.find((p:{id:string})=>p.id==='seed-boat').visual,manifest.props.find((p:{id:string})=>p.id==='lantern-flower').visual];
  const values=await Promise.all(definitions.map(definition=>library.acquire(definition,{reviewOnly:true})));if(closed||token!==generation){values.forEach(v=>v.release());return;}
  actor=new CharacterVisual(values[0]!);grandma=new CharacterVisual(values[1]!);lease=values[2]!;flower=values[3]!;scene.add(actor.root,grandma.root,lease.root,flower.root);seed.visible=true;
  el('caption').textContent='Model contact review: Pip’s palm → seed cradle → Grandma’s palm → rooted planting spot. This repeating preview does not change a saved adventure.';el('hash').textContent='Exact boat, flower and character hashes: manifest.json';
 }else
 if(kitView(id)){
  const values=await Promise.all([manifest.grandma,manifest.approvedPip??manifest.pip].map(definition=>library.acquire(definition,{reviewOnly:true})));if(closed||token!==generation){values.forEach(v=>v.release());return;}grandma=new CharacterVisual(values[0]!);actor=new CharacterVisual(values[1]!);scene.add(grandma.root,actor.root);grandma.sync({position:[7.4,.13,11.6],yaw:.36,motion:'idle',carrying:false,paused:true,reducedMotion:false});grandma.update(0);const p=['bakery-kit','roof-kit'].includes(id)?anchors.bakery.approach:anchors.garden.approach;actor.sync({position:[p.x,terrainHeight(p),p.z],yaw:.36,motion:'idle',carrying:false,paused:true,reducedMotion:false});actor.update(0);
  el('caption').textContent=kit.description+' Approved actors provide scale. Garden and bakery location views use the actual game camera offsets and framing; this is an unapproved review scene, not a gameplay screenshot.';el('hash').textContent='Local kit source SHA-256: '+manifest.localKit.sha256;
 }else if(id==='pip'){
  const value=await library.acquire(manifest.pip,{reviewOnly:true});if(closed||token!==generation){value.release();return;}actor=new CharacterVisual(value);scene.add(actor.root);
  el('caption').textContent='New jog / carrying-jog only. The approved body, straight feet, weights and four original clips are preserved. Inspect planted feet, alternating knees and free arm swing.';el('hash').textContent='Review model SHA-256: '+manifest.pip.sha256;
 }else{
  const prop=manifest.props.find((p:{id:string})=>p.id===id),value=await library.acquire(prop.visual,{reviewOnly:true});if(closed||token!==generation){value.release();return;}lease=value;scene.add(value.root);
  if(id==='seed-boat'){value.root.position.y=-.09;seed.visible=true;seed.position.fromArray(prop.visual.anchors['seed-cradle']).add(new T.Vector3(0,-.05,0));el('caption').textContent='The same seed sits in the open cradle, with the hull meeting the waterline. Inspect hull, rim and clearance from above; gameplay scale uses the village camera.';}
  else el('caption').textContent='The stem and rooted base meet the actual planting spot. Inspect the root base from every side; growth begins at this ground contact.';
  el('hash').textContent='Review model SHA-256: '+prop.visual.sha256;
 }
 scene.traverse(o=>{if(o instanceof T.Mesh){o.castShadow=o!==floor;o.receiveShadow=true;}});frame();document.body.dataset.asset=id;document.body.dataset.ready='true';
}
el('asset').onchange=()=>{void choose();};el('view').onchange=frame;el('motion').onchange=()=>{clock=0;frame();};
el('pause').onclick=()=>{paused=!paused;el('pause').textContent=paused?'Resume':'Pause';el('pause').setAttribute('aria-pressed',String(paused));};
el('carry').onclick=()=>{carrying=!carrying;el('carry').setAttribute('aria-pressed',String(carrying));};
el('boundary').onchange=()=>{kit.boundary.root.visible=(el('boundary') as HTMLInputElement).checked;};
const observer=new ResizeObserver(resize);observer.observe(el('stage'));
renderer.setAnimationLoop(now=>{
 const dt=paused||document.hidden?0:Math.max(0,Math.min(.05,(now-last)/1000))*Number(select('speed'));last=now;clock+=dt;
 if(actor&&select('asset')!=='handoff'&&!kitView(select('asset'))){let mode=select('motion') as 'idle'|'walk'|'jog'|'journey';const position:[number,number,number]=[0,0,0];let yaw=0,speed=mode==='jog'?1.7:mode==='walk'?(.33333333333333337/(58/60)):0;
  const journey=mode==='journey';
  if(journey){const t=clock%14,clamp=(n:number)=>Math.max(0,Math.min(1,n));mode='idle';
   if(t<3){position[2]=Math.max(0,t-1)*1.7;if(t>1)mode='jog';}
   else if(t<5.4){position[2]=3.4;position[0]=Math.max(0,t-3.4)*1.7;yaw=clamp((t-3)/.4)*Math.PI/2;if(t>3.4)mode='jog';}
   else if(t<8.8){position[0]=3.4;position[2]=3.4-Math.max(0,t-6.8)*1.7;yaw=Math.PI/2+clamp((t-6.4)/.4)*Math.PI/2;if(t>6.8)mode='jog';}
   else if(t<11.2){position[0]=3.4-Math.max(0,t-9.2)*1.7;yaw=Math.PI+clamp((t-8.8)/.4)*Math.PI/2;if(t>9.2)mode='jog';}
   else yaw=-Math.PI/2+clamp((t-12.2)/.4)*Math.PI/2;
   speed=mode==='jog'?1.7:0;
  }
  actor.sync({position,yaw,motion:mode,speed,carrying,paused,reducedMotion:false});actor.update(dt);seed.visible=carrying;if(carrying&&actor.hand){actor.hand.add(seed);seed.position.set(0,.04,0);seed.quaternion.identity();}
  if(journey){const offset=active.position.clone().sub(controls.target),focus=new T.Vector3(...position).add(new T.Vector3(0,.56,0));controls.target.lerp(focus,paused?1:.15);active.position.copy(controls.target).add(offset);active.lookAt(controls.target);}
 }
 if(kitView(select('asset'))){const id=select('asset'),p=['bakery-kit','roof-kit'].includes(id)?anchors.bakery.approach:anchors.garden.approach,targets=['bakery-kit','roof-kit'].includes(id)?[{x:19.3,y:.93,z:.75},{x:19.25,y:1.85,z:-.7},{x:19.95,y:1.6,z:-.3},{x:20.3,y:2.35,z:-1.25}]:[{x:anchors.garden.plant.x,y:.4,z:anchors.garden.plant.z}];kit.revealActivity(active,p,undefined,true,targets);document.body.dataset.boundary=JSON.stringify(kit.boundary.counts);}
 if(select('asset')==='handoff'&&actor&&grandma&&lease&&flower){
  const t=clock%14,clamp=(v:number)=>Math.max(0,Math.min(1,v)),smooth=(v:number)=>{const n=clamp(v);return n*n*(3-2*n);};
  actor.sync({position:[-.62,0,0],yaw:Math.PI/2,motion:'idle',carrying:t<3,paused,reducedMotion:false});actor.update(dt);
  grandma.sync({position:[.62,0,1.6],yaw:-Math.PI/2,motion:'idle',carrying:t>=6,paused,reducedMotion:false});grandma.update(dt);
  lease.root.position.set(0,-.09,1.6*smooth((t-3)/3));lease.root.rotation.y=0;lease.root.updateMatrixWorld(true);
  const prop=manifest.props.find((p:{id:string})=>p.id==='seed-boat'),cradle=lease.root.localToWorld(new T.Vector3(...prop.visual.anchors['seed-cradle'] as [number,number,number]).add(new T.Vector3(0,.04,0)));
  const from=actor.hand!.localToWorld(new T.Vector3(0,.04,0)),to=grandma.hand!.localToWorld(new T.Vector3(0,.04,0)),bed=new T.Vector3(1.2,.06,2.3);
  seed.position.copy(t<3?from.clone().lerp(cradle,smooth(t-2)):t<7?cradle:t<9?cradle.clone().lerp(to,smooth(t-7)):to.clone().lerp(bed,smooth(t-9)));seed.visible=t<10.1;
  flower.root.position.set(1.2,0,2.3);flower.root.visible=t>=10;flower.root.scale.setScalar(Math.max(.02,smooth((t-10)/2)));
  document.body.dataset.handoff=t<2?'Pip hand':t<3?'loading':t<6?'cradle':t<8?'Grandma handoff':t<10?'planting':'rooted growth';
 }
 controls.update();renderer.render(scene,active);document.body.dataset.assetSources=String(library.activeSources);document.body.dataset.drawCalls=String(renderer.info.render.calls);
});
window.addEventListener('pagehide',()=>{closed=true;generation++;observer.disconnect();renderer.setAnimationLoop(null);seed.removeFromParent();actor?.dispose();grandma?.dispose();lease?.release();flower?.release();library.dispose();controls.dispose();art.dispose();sun.shadow.map?.dispose();renderer.dispose();},{once:true});
await choose();
