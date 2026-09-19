import {lanternIds,lanternRecord,gatheringPicture,type LanternId} from './lanterns.js';
import {makeLanternPicture} from './lanternWorld.js';
import {makeGathering} from './gatheringWorld.js';
import {connectedGathering,turnLines} from './gathering.js';
import {makeBakery} from './bakeryWorld.js';
import {BAKERY_APPROACH,TILE_SHELF,nearBakery,bakeryReady,solAtWorkshop} from './bakery.js';
import {useEffect,useRef} from 'react';
import * as T from 'three';
import {PaperArt,makeCharacter,makeSection,makeSeedBoat,makeLandscape,makeLantern,makeStudio} from './art.js';
import {type GardenStore,type Point,CROSSING,FERRY_EAST,MARA,GRANDMA,GRANDMA_APPROACH,PLANT,distance,bridgeCenter,bridgeReady,ferryPosition} from './model.js';
import {SOL,SOL_APPROACH,solApproach,GATHER_SOL,GATHER_MARA,solPosition,maraAtGarden,gatheringStarted} from './chapter.js';
import {collapseResult,sectionAtEnd,LAUNCH,LANDING,ROCK,ropeCount} from './river.js';
import {makeWorkshop,makeStoryFlowers,makePassengerBoat} from './chapterWorld.js';
export function GardenScene({store,onError}:{store:GardenStore;onError:(error:unknown)=>void}){
 const host=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const element=host.current!;const art=new PaperArt();let renderer:T.WebGLRenderer;
  try{renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});}catch(error){onError(error);return;}
  renderer.setClearColor('#eee6d0',1);renderer.setPixelRatio(devicePixelRatio);
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;
  renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.0;
  const canvas=renderer.domElement;canvas.setAttribute('aria-label','The river and Grandma’s garden. Use the named controls below or click the scene.');canvas.setAttribute('role','img');canvas.tabIndex=0;element.append(canvas);
  const scene=new T.Scene(),camera=new T.OrthographicCamera(-9,9,6,-6,.1,100);
  camera.position.set(7.5,16,19);camera.lookAt(0,0,.1);
  scene.add(new T.HemisphereLight('#fff3d2','#7b9c87',1.7));
  const sun=new T.DirectionalLight('#fff0cf',2.2);sun.position.set(-7,13,6);sun.castShadow=true;sun.shadow.mapSize.set(1536,1536);sun.shadow.camera.left=-10;sun.shadow.camera.right=10;sun.shadow.camera.top=10;sun.shadow.camera.bottom=-10;sun.shadow.normalBias=.025;sun.shadow.bias=-.0002;scene.add(sun);
  const ground=new T.Mesh(new T.PlaneGeometry(200,200),art.material('#eee6d0'));art.resources.add(ground.geometry);ground.rotation.x=-Math.PI/2;ground.position.y=-.64;ground.receiveShadow=true;scene.add(ground);
  const landscape=makeLandscape(art);scene.add(landscape.root,landscape.currents);
  const bakery=makeBakery(art);scene.add(bakery.root);
  const sol=makeCharacter(art,'sol');scene.add(sol.rig);const workshop=makeWorkshop(art);scene.add(workshop);
  const pip=makeCharacter(art,'pip'),mara=makeCharacter(art,'mara'),grandma=makeCharacter(art,'grandma'),jo=makeCharacter(art,'jo');
  scene.add(pip.rig,mara.rig,grandma.rig,jo.rig);mara.rig.position.set(MARA.x,.13,MARA.z);grandma.rig.position.set(GRANDMA.x,.13,GRANDMA.z);jo.rig.position.set(3.1,.14,-4.7);
  const loop=new T.Group();loop.position.set(4,.16,-4.6);scene.add(loop);
  art.box(loop,0,.23,0,.35,.28,.25,'#faf0d0');art.box(loop,0,.26,.137,.26,.10,.025,'#28594f');
  for(const x of [-.075,.075])art.ball(loop,x,.27,.156,.023,'#f3d173');
  for(const x of [-.17,.17]){const wheel=art.cylinder(loop,x,.078,0,.075,.075,.06,'#53766b',12);wheel.rotation.z=Math.PI/2;}
  const projection=art.cylinder(loop,0,.30,-.30,.16,.055,.40,'#c1ddc0',12);projection.rotation.x=Math.PI/2;
  const sections={a:makeSection(art,'a'),b:makeSection(art,'b')};scene.add(sections.a.root,sections.b.root);
  const seedBoat=makeSeedBoat(art);scene.add(seedBoat);
  const materialBox=new T.Group();materialBox.position.set(-2.8,.1,1.75);art.box(materialBox,0,.16,0,.55,.32,.42,'#b29163');art.box(materialBox,0,.34,0,.60,.04,.47,'#e9d4a2');scene.add(materialBox);
  const maintenanceRopes=new T.Group(),carriedRopes=new T.Group();for(const group of [maintenanceRopes,carriedRopes])for(const x of [-.10,.10]){const points=Array.from({length:25},(_,i)=>new T.Vector3(x+Math.cos(i/24*Math.PI*2)*.08,0,Math.sin(i/24*Math.PI*2)*.08));art.line(group,points,'#b79154',.02);}maintenanceRopes.position.set(-2.8,.48,1.75);const ropeHandoff=maintenanceRopes.clone();scene.add(maintenanceRopes,carriedRopes,ropeHandoff);
  art.ball(scene,ROCK.x,-.03,ROCK.z,.34,'#8c9489',[1,.6,.9]);
  const narrowPads=new T.Group();for(const x of [-.775,.775]){const pad=art.box(narrowPads,x,.014,3,1.52,.015,1.12,x<0?'#ebc45d':'#67adc7');const mat=(pad.material as T.MeshStandardMaterial).clone();art.resources.add(mat);mat.transparent=true;mat.opacity=.3;pad.material=mat;}scene.add(narrowPads);
  for(const [p,color] of [[LAUNCH,'#e7ba55'],[LANDING,'#6ca9c4']] as const){const flag=new T.Group();flag.position.set(p.x+(p.x<0?-.42:.42),.05,p.z);art.cylinder(flag,0,.26,0,.045,.045,.52,'#897654');art.box(flag,0,.50,0,.3,.18,.035,color);scene.add(flag);}
  const seed=art.ball(scene,0,.5,0,.08,'#e7ba55',[.7,1,.7]);
  const page=new T.Group();art.box(page,0,0,0,.23,.31,.012,'#fff7df');for(let i=0;i<5;i++)art.box(page,0,.08-i*.035,.01,.16-(i%2)*.025,.006,.005,'#a29a7d');scene.add(page);
  const planted=makeLantern(art,PLANT.x,PLANT.z);planted.root.userData['target']='lantern:pip';scene.add(planted.root);
  const preparedSoil=new T.Group();for(let i=0;i<5;i++)art.line(preparedSoil,[new T.Vector3(PLANT.x-.23,.231,PLANT.z-.20+i*.10),new T.Vector3(PLANT.x+.23,.231,PLANT.z-.20+i*.10)],'#b29461',.018);scene.add(preparedSoil);
  const trowel=new T.Group();art.cylinder(trowel,0,.10,0,.022,.022,.24,'#af8758');art.box(trowel,0,-.055,0,.10,.12,.025,'#829d93');scene.add(trowel);
  const flowers=makeStoryFlowers(art);for(const flower of flowers)scene.add(flower.root);const memoryPictures=lanternIds.map(()=>makeLanternPicture(art));for(const picture of memoryPictures)scene.add(picture.root);
  const passengerBoat=makePassengerBoat(art);scene.add(passengerBoat);const operator=makeCharacter(art,'operator');scene.add(operator.rig);const passengers=[makeCharacter(art,'boy'),makeCharacter(art,'passenger')];for(const passenger of passengers)scene.add(passenger.rig);
  const gangway=art.box(scene,-1.65,.20,-4.1,1.10,.08,.46,'#bf9868');
  const solPage=page.clone();scene.add(solPage);const grandmaCopy=page.clone();scene.add(grandmaCopy);
  const cushions=new T.Group();for(const x of [4.85,5.45])art.box(cushions,x,.64,2.2,.51,.10,.40,'#e6c477');scene.add(cushions);
  const gathering=makeGathering(art);scene.add(gathering.root);
  const glow=new T.PointLight('#ffc86c',0,4,2);glow.position.set(PLANT.x,1.2,PLANT.z);scene.add(glow);
  const ropes={west:new T.Group(),east:new T.Group()};scene.add(ropes.west,ropes.east);
  const pickables:T.Object3D[]=[bakery.rina.rig,bakery.tile,...bakery.targets,pip.rig,mara.rig,grandma.rig,sol.rig,...flowers.map(f=>f.root),...memoryPictures.map((picture,i)=>{picture.root.userData['target']='lantern:'+lanternIds[i];return picture.root;}),planted.root,sections.a.root,sections.b.root,seedBoat];
  sol.rig.userData['target']='sol';mara.rig.userData['target']='mara';grandma.rig.userData['target']='grandma';sections.a.root.userData['target']='a';sections.b.root.userData['target']='b';seedBoat.userData['target']='seedBoat';
  for(const z of [-2,3])for(const side of [-1,1]){
   const post=new T.Group(),x=side*(z===3?1.65:2.45);post.position.set(x,.1,z+.53);art.cylinder(post,0,.20,0,.04,.07,.40,'#896748');art.cylinder(post,0,.40,0,.075,.075,.045,'#f7e9c2');const flag=art.shape(post,[[0,0],[.20,-.03],[.15,-.13],[0,-.13]],.006,side<0?'#d48e66':'#527e69');flag.position.set(0,.38,0);post.userData['target']=side<0?'west':'east';post.userData['postZ']=z;scene.add(post);pickables.push(post);
  }
  const selection=new T.Mesh(new T.RingGeometry(.84,.88,48),new T.MeshBasicMaterial({color:'#e9b857',transparent:true,opacity:.95,side:T.DoubleSide,depthWrite:false}));art.resources.add(selection.geometry);art.resources.add(selection.material);selection.rotation.x=-Math.PI/2;selection.position.y=.17;scene.add(selection);
  const destination=new T.Mesh(new T.RingGeometry(.12,.16,28),new T.MeshBasicMaterial({color:'#f9f1cf',transparent:true,opacity:.85,side:T.DoubleSide,depthWrite:false}));art.resources.add(destination.geometry);art.resources.add(destination.material);destination.rotation.x=-Math.PI/2;destination.position.y=.135;scene.add(destination);
  const adventure=new T.Group();for(const child of [...scene.children])if(child!==ground&&!(child instanceof T.Light)&&child!==jo.rig&&child!==loop)adventure.add(child);scene.add(adventure);
  const studio=makeStudio(art);scene.add(studio);jo.rig.position.set(1.2,0,1.40);loop.position.set(2.85,.77,.45);
  const labels=new Map<string,HTMLElement>(),leaders=new Map<string,HTMLElement>();
  const labelOffsets:Record<string,[number,number]>={materials:[-15,-64],sections:[-12,40],seedBoat:[72,-10],launch:[-105,-35],landing:[115,-35],lanterns:[75,44]};
  function marker(id:string,text:string,onClick:()=>void){let label:HTMLElement;if(id==='a'||id==='b'||id==='speaker'){label=document.createElement('span');label.className='garden-marker garden-section-label';label.setAttribute('aria-hidden','true');}else{const button=document.createElement('button');button.type='button';button.onclick=onClick;button.className='garden-marker';label=button;}label.textContent=text;label.dataset['gardenMarker']=id;element.append(label);labels.set(id,label);if(labelOffsets[id]){const line=document.createElement('span');line.className='garden-leader';line.setAttribute('aria-hidden','true');element.append(line);leaders.set(id,line);}}
  function interact(target:string){
   const s=store.getSnapshot(),p=s.chapter.pip;if(s.panel||s.action||!s.chapter.started||s.mode==='boat')return;
   if(target.startsWith('lantern:')){store.send({type:'INSPECT_LANTERN',lantern:target.slice(8) as LanternId});return;}
   if(target==='rina'){store.send(nearBakery(s.chapter)?{type:'TALK',who:'rina'}:{type:'GO',point:BAKERY_APPROACH,target:'Rina’s bakery'});return;}
   if(target==='spareTile'){store.send({type:'GO',point:TILE_SHELF,target:'the tile shelf'});return;}
   if(target==='sol'){if(distance(p,solPosition(s.chapter))<1.5)store.send({type:'TALK',who:'sol'});else store.send({type:'GO',point:solApproach(s.chapter),target:'Sol'});}
   if(target==='lanterns'){if(s.chapter.crossed)store.send({type:'OPEN',panel:'lanterns'});}
   if(target==='mara'){if(distance(p,maraAtGarden(s.chapter)?GATHER_MARA:MARA)<1.5)store.send({type:'TALK',who:'mara'});else store.send({type:'GO',point:maraAtGarden(s.chapter)?{x:3.35,z:.4}:{x:-3.5,z:-3.05},target:'Mara'});}
   if(target==='grandma'){if(distance(p,GRANDMA)<1.25)store.send({type:'TALK',who:'grandma'});else store.send({type:'GO',point:GRANDMA_APPROACH,target:'Grandma'});}
   if(target==='sections'){if(distance(p,CROSSING)<1.6)store.send({type:'OPEN',panel:'sections'});else store.send({type:'GO',point:CROSSING,target:'the bridge pieces'});}
   if(target==='seedBoat'){
    if(s.chapter.ferrySide==='east'){if(distance(p,GRANDMA)<1.25)store.send({type:'OPEN',panel:'sections'});else interact('grandma');}
    else if(distance(p,CROSSING)<1.6)store.send({type:'OPEN',panel:'sections'});else store.send({type:'GO',point:CROSSING,target:'the seed boat'});
   }
   if(target==='a'||target==='b'){if(s.mode==='arrange')store.send({type:'SELECT',section:target});else interact('sections');}
  }
  marker('mara','Mara',()=>interact('mara'));marker('grandma','Grandma',()=>interact('grandma'));marker('sections','Bridge pieces',()=>interact('sections'));
  marker('seedBoat','Seed boat',()=>interact('seedBoat'));marker('sol','Sol’s workshop',()=>interact('sol'));marker('lanterns','Lantern stories',()=>interact('lanterns'));
  // Captions never intercept the placement plane. The sections and native side controls select them.
  marker('materials','Grandma’s repair box',()=>interact('sections'));marker('launch','Yellow launch',()=>store.send({type:'UNLOAD_SEED'}));marker('landing','Grandma’s blue landing',()=>store.send({type:'DOCK_SEED'}));
  marker('speaker','',()=>{});
  marker('bakery','Rina’s bakery',()=>interact('rina'));
  marker('a','Section A',()=>interact('a'));marker('b','Section B',()=>interact('b'));
  function setLabel(id:string,p:Point,height:number,visible=true){const label=labels.get(id)!,line=leaders.get(id);label.hidden=!visible;if(line)line.hidden=!visible;if(!visible)return;const v=new T.Vector3(p.x,height,p.z).project(camera),offset=labelOffsets[id]??[0,0],x=(v.x*.5+.5)*element.clientWidth,y=(-v.y*.5+.5)*element.clientHeight,lx=Math.max(85,Math.min(element.clientWidth-85,x+offset[0])),ly=Math.max(25,Math.min(element.clientHeight-25,y+offset[1]));label.style.left=lx+'px';label.style.top=ly+'px';if(line){const anchor=new T.Vector3(p.x,.2,p.z).project(camera),ax=(anchor.x*.5+.5)*element.clientWidth,ay=(-anchor.y*.5+.5)*element.clientHeight;line.style.left=ax+'px';line.style.top=ay+'px';line.style.width=Math.hypot(lx-ax,ly-ay)+'px';line.style.transform='rotate('+Math.atan2(ly-ay,lx-ax)+'rad)';}}
  function atWorkshop(s:ReturnType<GardenStore['getSnapshot']>){return !gatheringStarted(s.chapter)&&['escorting','done'].includes(s.chapter.bakery.stage)&&distance(s.chapter.pip,SOL)<2.1;}
  function gatheringView(s:ReturnType<GardenStore['getSnapshot']>){if(s.action?.kind==='dockService')return 'dock';if(!connectedGathering(s.chapter)||s.chapter.story.phase==='planning'||s.panel==='studio')return 'none';if(s.chapter.story.phase==='arriving'){if(s.action?.kind==='maraArrival')return 'travel';if(s.chapter.story.plan?.time==='later'&&['not-started','boat-moored'].includes(s.chapter.gathering.arrival))return 'dock';return 'garden';}if(s.chapter.story.phase==='closed'){if(distance(s.chapter.pip,MARA)<2.2)return 'dock';if(distance(s.chapter.pip,GRANDMA)>3.2)return 'none';}return 'garden';}
  function resize(){const w=element.clientWidth,h=element.clientHeight;if(w<1||h<1)return;renderer.setSize(w,h,false);const snapshot=store.getSnapshot(),c=snapshot.chapter,aspect=w/h,started=c.started&&snapshot.panel!=='studio',boatFocus=snapshot.mode==='boat'&&!snapshot.action,bakeryFocus=started&&nearBakery(c),roofFocus=snapshot.mode==='bakery-repair',workshopFocus=started&&atWorkshop(snapshot),gview=gatheringView(snapshot),gardenFocus=gview==='garden',dockFocus=gview==='dock',halfH=gardenFocus?Math.max(3.1,3.7/aspect):dockFocus?Math.max(3.2,4.3/aspect):workshopFocus?Math.max(2.1,2.7/aspect):bakeryFocus?(roofFocus?Math.max(2.25,2.9/aspect):Math.max(2.45,3.1/aspect)):boatFocus?Math.max(1.8,3.6/aspect):started?Math.max(6.5,10.2/aspect):Math.max(2.8,4.1/aspect),x=gardenFocus?4.5:dockFocus?-3:workshopFocus?4.55:bakeryFocus?(roofFocus?7.8:8.1):started?1.25:0,z=gardenFocus?1.6:dockFocus?-4.1:workshopFocus?-2:bakeryFocus?-1.9:boatFocus?.6:.1;camera.position.set(x+(workshopFocus||gardenFocus?-7.5:7.5),workshopFocus||gardenFocus?12:16,z+(workshopFocus||gardenFocus?12:19));camera.lookAt(x,gardenFocus?.8:workshopFocus?.8:bakeryFocus?(roofFocus?1.5:1.25):0,z);camera.left=-halfH*aspect;camera.right=halfH*aspect;camera.top=halfH;camera.bottom=-halfH;camera.updateProjectionMatrix();camera.updateMatrixWorld();element.dataset['cameraFocus']=gardenFocus?'gathering':dockFocus?'passenger-dock':workshopFocus?'workshop':bakeryFocus?'bakery':boatFocus?'seed-boat':'whole-adventure';}
  const observer=new ResizeObserver(resize);observer.observe(element);resize();
  const ray=new T.Raycaster(),plane=new T.Plane(new T.Vector3(0,1,0),-.13),pointer=new T.Vector2();
  function pointerRay(e:PointerEvent){const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);}
  function groundPoint(e:PointerEvent){pointerRay(e);const p=new T.Vector3();return ray.ray.intersectPlane(plane,p)?{x:p.x,z:p.z}:null;}
  function hit(e:PointerEvent){pointerRay(e);for(const found of ray.intersectObjects(pickables.filter(o=>o.visible),true)){let obj:T.Object3D|null=found.object;while(obj){if(obj.userData['target'])return obj;obj=obj.parent;}}return null;}
  let drag:{id:number;startX:number;startY:number;offset:Point}|null=null,pressed:T.Object3D|null=null;
  function down(e:PointerEvent){const s=store.getSnapshot();if(e.button!==0||s.panel||s.action||!s.chapter.started)return;pressed=hit(e);if(s.mode==='arrange'){
    const target=pressed?.userData['target'];if(target==='a'||target==='b'){store.send({type:'SELECT',section:target});const p=groundPoint(e)!;const section=s.chapter.sections[target as 'a'|'b'];drag={id:e.pointerId,startX:e.clientX,startY:e.clientY,offset:{x:section.x-p.x,z:section.z-p.z}};canvas.setPointerCapture(e.pointerId);}
   }}
  function move(e:PointerEvent){if(!drag)return;const p=groundPoint(e);if(p)store.send({type:'PREVIEW',point:{x:p.x+drag.offset.x,z:p.z+drag.offset.z}});}
  function up(e:PointerEvent){
   const s=store.getSnapshot();
   if(drag){store.send({type:'PLACE'});if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);drag=null;pressed=null;return;}
   if(s.panel||s.action||!s.chapter.started)return;
   const target=pressed?.userData['target'];
   if(s.mode==='bakery-repair'){if(target==='tile-gap'||target==='tile-beside')store.send({type:'TILE_PREVIEW',position:target==='tile-gap'?'gap':'beside'});}
   else if(s.mode==='boat'){const p=groundPoint(e);if(p)store.send({type:'STEER',point:p});}
   else if(s.mode==='arrange'){
    if(target==='west'||target==='east')store.send({type:'FASTEN',end:target,atZ:pressed?.userData['postZ'] as number});
    else{const p=groundPoint(e);if(p){store.send({type:'PREVIEW',point:p});store.send({type:'PLACE'});}}
   }else if(typeof target==='string'&&target.startsWith('lantern:')||target==='mara'||target==='grandma'||target==='a'||target==='b'||target==='seedBoat'||target==='sol'||target==='lanterns'||target==='rina'||target==='spareTile')interact(target);
   else{const p=groundPoint(e);if(p)store.send({type:'GO',point:p});}pressed=null;
  }
  function cancel(){drag=null;pressed=null;store.send({type:'CANCEL'});}
  canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',cancel);
  function lost(e:Event){e.preventDefault();store.send({type:'VIEW_LOST',lost:true});}canvas.addEventListener('webglcontextlost',lost);
  function restored(){element.dataset['contextRecoveries']=String(Number(element.dataset['contextRecoveries']??0)+1);store.send({type:'VIEW_LOST',lost:false});resize();}canvas.addEventListener('webglcontextrestored',restored);
  let last=performance.now(),lastPip={...store.getSnapshot().chapter.pip},ropeKey='',frames=0,cameraMode='',lastDraw=0,lastDrawState:unknown=null,lastWidth=0,lastHeight=0;const cadence:number[]=[];const activeCadence:number[]=[];
  const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
  const smooth=(t:number)=>{const v=Math.max(0,Math.min(1,t));return v*v*(3-2*v);};
  // Grandma follows the garden path to the landing, then walks back with the seed.
  const bankPath=[GRANDMA,{x:4.1,z:2.85},{x:2.08,z:1.9},{x:1.98,z:.8}];
  const bankLengths=bankPath.slice(1).map((p,i)=>distance(bankPath[i]!,p)),bankLength=bankLengths.reduce((a,b)=>a+b,0);
  function alongBank(t:number){let remaining=Math.max(0,Math.min(1,t))*bankLength;for(let i=0;i<bankLengths.length;i++){const length=bankLengths[i]!;if(remaining<=length){const a=bankPath[i]!,b=bankPath[i+1]!;return {x:lerp(a.x,b.x,remaining/length),z:lerp(a.z,b.z,remaining/length)};}remaining-=length;}return bankPath.at(-1)!;}
  function limbMotion(character:ReturnType<typeof makeCharacter>,walking:boolean,time:number){character.legs.forEach((leg,i)=>leg.rotation.x=walking?Math.sin(time*10+i*Math.PI)*.40:0);character.arms.forEach((arm,i)=>arm.rotation.x=walking?Math.sin(time*10-i*Math.PI)*.25:0);}
  function render(now:number){
   const dt=now-last;last=now;let s=store.getSnapshot();
   if(s.ready&&!s.background&&!s.viewLost&&(s.route.length||s.keys.length||s.action||s.boatTarget||s.playback&&!s.playback.paused&&s.playback.mode==='captions'))store.send({type:'TICK',ms:dt});
   s=store.getSnapshot();const c=s.chapter,action=s.action,t=action?Math.min(1,action.elapsed/action.duration):0,time=now*.001,moving=distance(c.pip,lastPip)>.0001;
   const inAdventure=c.started&&s.panel!=='studio';adventure.visible=inAdventure;studio.visible=!inAdventure;const nextCameraMode=String(inAdventure)+String(s.mode==='boat'&&!s.action)+String(nearBakery(c))+String(s.mode==='bakery-repair')+String(atWorkshop(s))+gatheringView(s);if(cameraMode!==nextCameraMode){cameraMode=nextCameraMode;resize();}
   pip.rig.visible=inAdventure;jo.rig.visible=!inAdventure;loop.visible=!inAdventure;
   pip.rig.position.set(c.pip.x,.13,c.pip.z);if(moving)pip.rig.rotation.y=Math.atan2(c.pip.x-lastPip.x,c.pip.z-lastPip.z);lastPip={...c.pip};limbMotion(pip,moving&&!c.reducedMotion,time);
   grandma.rig.position.set(GRANDMA.x,.13,GRANDMA.z);grandma.rig.rotation.y=.36;limbMotion(grandma,false,time);
   const mp=maraAtGarden(c)?GATHER_MARA:MARA,sp=solPosition(c);mara.rig.position.set(mp.x,.13,mp.z);sol.rig.position.set(sp.x,.13,sp.z);limbMotion(sol,false,time);limbMotion(mara,false,time);
   cushions.visible=c.story.records.grandma;for(const [i,record]of [[2,c.story.records.mara],[3,c.story.records.sol],[4,c.story.records.grandma]] as const){flowers[i]!.root.visible=true;flowers[i]!.petals.visible=true;void record;}
   solPage.visible=c.story.metSol;solPage.position.set(sol.rig.position.x+.18,.81,sol.rig.position.z+.13);
   grandmaCopy.visible=c.story.grandmaCopy!=='none';const cp=c.story.grandmaCopy==='pip'?c.pip:mp;grandmaCopy.position.set(cp.x-.14,.72,cp.z+.18);
   passengerBoat.visible=c.started&&(!gatheringStarted(c)||c.story.plan?.time==='later');passengerBoat.position.set(-1.1,-.1,-4.1);passengerBoat.rotation.y=Math.PI/2;gangway.visible=passengerBoat.visible&&action?.kind!=='arrival';passengers.forEach(p=>p.rig.visible=false);
   if(!gatheringStarted(c)){
    const service=action?.kind==='dockService'?t:c.mara.service==='served'?1:0;
    if(action?.kind==='dockService'){passengerBoat.position.set(lerp(.25,-1.1,smooth(t/.22)),-.1,lerp(-4.2,-4.1,smooth(t/.22)));mara.rig.position.x=lerp(MARA.x,-2.65,smooth(t/.3));mara.rig.rotation.y=1.2;}
    gangway.visible=service===0||service>=.22;
    passengers.forEach((p,i)=>{const ashore=smooth((service-.28-i*.10)/.34);p.rig.visible=true;p.rig.position.set(lerp(passengerBoat.position.x,-5.65+i*.3,ashore),lerp(.08,.13,Math.min(1,ashore*4)),lerp(passengerBoat.position.z+(i?-.23:.30),-3.35-i*.3,ashore));p.rig.rotation.y=-1.5;limbMotion(p,ashore>0&&ashore<1&&!c.reducedMotion,time);});
   }
   if(action?.kind==='arrival'){
    const later=c.story.plan?.time==='later';
    const path=[SOL,{x:3.4,z:-1.4},{x:3.4,z:.1},GATHER_SOL],ma=[MARA,{x:-3.5,z:-3.05},{x:-2.6,z:3},{x:-1.9,z:bridgeCenter(c).z},{x:1.9,z:bridgeCenter(c).z},{x:2.8,z:2.9},{x:3.3,z:.4},GATHER_MARA];
    function follow(character:typeof sol,points:Point[],progress:number){const lengths=points.slice(1).map((p,i)=>distance(points[i]!,p)),total=lengths.reduce((a,b)=>a+b,0);let left=Math.max(0,Math.min(1,progress))*total;let at=points.at(-1)!;for(let i=0;i<lengths.length;i++){if(left<=lengths[i]!){const p=points[i]!,q=points[i+1]!;at={x:lerp(p.x,q.x,left/lengths[i]!),z:lerp(p.z,q.z,left/lengths[i]!)};character.rig.rotation.y=Math.atan2(q.x-p.x,q.z-p.z);break;}left-=lengths[i]!;}character.rig.position.set(at.x,.13,at.z);limbMotion(character,progress>0&&progress<1&&!c.reducedMotion,time);}
    follow(sol,path,smooth((t-.05)/.85));if(later)follow(mara,ma,smooth((t-.45)/.55));
    passengerBoat.position.set(lerp(.25,-1.1,smooth(t/.25)),-.1,lerp(-4.2,-4.1,smooth(t/.25)));gangway.visible=later&&t>=.25;
    passengers.forEach((p,i)=>{const ashore=smooth((t-.28-i*.045)/.23);p.rig.position.set(lerp(passengerBoat.position.x,-5.9,ashore),lerp(.08,.24,Math.min(1,ashore*5)),lerp(passengerBoat.position.z+(i?-.33:.33),-4.1,Math.min(1,ashore*5)));p.rig.rotation.y=-Math.PI/2;limbMotion(p,ashore>0&&ashore<1&&!c.reducedMotion,time);p.rig.visible=later&&ashore<1;});
    solPage.position.set(sol.rig.position.x+.18,.81,sol.rig.position.z+.13);
   }
   operator.rig.visible=passengerBoat.visible;operator.rig.position.set(passengerBoat.position.x+.1,.12,passengerBoat.position.z-.65);operator.rig.rotation.y=-1.4;
   if(action?.kind==='copy')grandmaCopy.visible=true;
   if(action?.kind==='copy')grandmaCopy.position.set(lerp(GRANDMA.x-.18,c.pip.x-.14,smooth(t)),.72,lerp(GRANDMA.z,c.pip.z+.18,smooth(t)));
   if(action?.kind==='delivery')grandmaCopy.position.set(lerp(c.pip.x-.14,mp.x-.14,smooth(t)),.72,lerp(c.pip.z+.18,mp.z+.18,smooth(t)));
   const visibleSections=s.preview??c.sections;
   for(const key of ['a','b'] as const){const data=visibleSections[key],section=sections[key];section.root.position.set(data.x,s.preview?.[key]? .065:0,data.z);section.root.rotation.y=data.rotation;section.root.rotation.z=0;
    if(action?.kind==='collapse'){const end=collapseResult(c).sections[key],held=(c.west&&sectionAtEnd(c,'west')===key)||(c.east&&sectionAtEnd(c,'east')===key),fall=smooth(t/.4),drift=smooth(t),sign=key==='a'?-1:1;section.root.position.set(lerp(data.x,end.x,drift),held?0:-.08*Math.sin(t*Math.PI),lerp(data.z,end.z,drift));section.root.rotation.z=held?0:sign*Math.sin(t*Math.PI)*.18;section.root.rotation.y=data.rotation+(!held?sign*Math.sin(t*Math.PI)*.25:0);}
   }
   if(action?.kind==='collapse'){pip.rig.position.set(lerp(action.from.x,-2.4,smooth(t/.35)),.13,lerp(action.from.z,3,smooth(t/.35)));limbMotion(pip,t<.35&&!c.reducedMotion,time);}
   const mooring=ferryPosition(c),boatY=-.12+(!c.reducedMotion&&!s.panel?Math.sin(time*1.8)*.009:0);seedBoat.position.set(mooring.x,boatY,mooring.z);seedBoat.rotation.y=Math.PI/2;
   seed.visible=c.seed!=='soil';let seedPos=c.seed==='boat'?new T.Vector3(mooring.x,boatY+.17,mooring.z):c.seed==='pip'?new T.Vector3(c.pip.x,.75,c.pip.z-.15):new T.Vector3(GRANDMA.x-.22,.74,GRANDMA.z+.14);
   if(action?.kind==='receiveSeed'){
    if(action.hasSeed){
     const bt=1;seedBoat.position.set(LANDING.x,boatY,LANDING.z);
     seedBoat.rotation.y=Math.PI/2*(1-smooth(Math.min(bt,1-bt)/.25));
     const returning=t>=.63,gt=returning?1-smooth((t-.63)/.37):smooth((t-.05)/.45),gp=alongBank(gt),ahead=alongBank(gt+(returning?-.003:.003));
     grandma.rig.position.set(gp.x,.13,gp.z);if(distance(gp,ahead)>.001)grandma.rig.rotation.y=Math.atan2(ahead.x-gp.x,ahead.z-gp.z);limbMotion(grandma,gt>0&&gt<1&&!c.reducedMotion,time);
     const cargo=new T.Vector3(seedBoat.position.x,seedBoat.position.y+.17,seedBoat.position.z),hand=new T.Vector3(gp.x-.22,.74,gp.z+.14);
     if(t<.12)seedPos.lerp(cargo,smooth(t/.12));else if(t<.5)seedPos=cargo;else if(t<.63)seedPos=cargo.lerp(hand,smooth((t-.5)/.13));else seedPos=hand;
    }else if(!c.reducedMotion)seedBoat.position.y=-.12+Math.sin(t*Math.PI*4)*.02;
   }
   if(action?.kind==='loadSeed')seedPos.lerp(new T.Vector3(mooring.x,boatY+.17,mooring.z),smooth(t));
   if(action?.kind==='unloadSeed')seedPos.lerp(new T.Vector3(c.pip.x,.75,c.pip.z-.15),smooth(t));
   const preparing=action?.kind==='receiveSeed'&&t>.82||action?.kind==='plant'&&!c.river.soilPrepared&&t<.42;
   preparedSoil.visible=c.river.soilPrepared||action?.kind==='plant'&&t>.30;
   trowel.visible=preparing;trowel.position.set(GRANDMA.x-.30,.40+Math.sin(t*Math.PI*6)*.06,GRANDMA.z-.06);trowel.rotation.z=-.45;
   if(action?.kind==='plant'){const progress=c.river.soilPrepared?t:(t-.42)/.58;seedPos.lerp(new T.Vector3(PLANT.x,.05,PLANT.z),smooth(progress));pip.body.rotation.x=Math.sin(Math.max(0,progress)*Math.PI)*.23;grandma.body.rotation.x=Math.sin(t*Math.PI)*.20;}else{pip.body.rotation.x=0;grandma.body.rotation.x=preparing?.2:0;}
   seed.position.copy(seedPos);seed.rotation.z=.3;

   planted.root.visible=c.seed==='soil';const bloom=c.bloomed?1:action?.kind==='bloom'?smooth(t):.12;planted.root.scale.setScalar(c.bloomed?1:Math.max(.2,bloom));planted.petals.rotation.y=bloom*.5;glow.intensity=c.bloomed?2.8:bloom;
   for(const [i,lantern] of lanternIds.entries()){
    const record=lanternRecord(c,lantern),placing=lantern==='pip'&&action?.kind==='keepMemory',flower=i<5?flowers[i]!:planted,picture=memoryPictures[i]!;
    picture.show(placing?(action.moment==='planting'?'planting':gatheringPicture(c)):record.available?record.scene:null);
    picture.root.visible=picture.root.visible&&inAdventure&&(lantern!=='pip'||c.bloomed);
    const scale=lantern==='pip'?.80:.62;picture.root.scale.setScalar(scale);picture.root.quaternion.copy(camera.quaternion);
    const destination=new T.Vector3(flower.root.position.x,flower.root.position.y+1.28*flower.root.scale.x,flower.root.position.z);
    if(placing){picture.root.position.set(lerp(c.pip.x+.18,destination.x,smooth(t)),lerp(.85,destination.y,smooth(t)),lerp(c.pip.z+.18,destination.z,smooth(t)));pip.arms[0]!.rotation.x=-.7;}
    else picture.root.position.copy(destination);
   }
   element.dataset['pipMemory']=JSON.stringify({record:c.story.records.pip,placing:action?.kind==='keepMemory',scene:c.story.records.pip?lanternRecord(c,'pip').scene:null,seed:c.seed});
   selection.visible=s.mode==='arrange';const selected=visibleSections[s.selection];selection.position.set(c.joined?(visibleSections.a.x+visibleSections.b.x)/2:selected.x,.165,selected.z);selection.scale.set(c.joined?1.85:1,1,1);
   destination.visible=!!s.route.length;const end=s.route.at(-1);if(end)destination.position.set(end.x,.14,end.z);
   const nextRopes=JSON.stringify([c.west,c.east,c.sections,c.joined]);
   if(nextRopes!==ropeKey){ropeKey=nextRopes;for(const side of ['west','east'] as const){for(const obj of ropes[side].children){if(obj instanceof T.Mesh){obj.geometry.dispose();art.resources.delete(obj.geometry);}}ropes[side].clear();if(c[side]){const part=c.sections[sectionAtEnd(c,side)],center={x:part.x+(side==='west'?.775:-.775),z:part.z},sign=side==='west'?-1:1,postZ=Math.abs(center.z-3)<Math.abs(center.z+2)?3:-2,postX=sign*(postZ===3?1.65:2.45);art.line(ropes[side],[new T.Vector3(center.x+sign*1.48,.2,center.z+.4),new T.Vector3(postX,.50,postZ+.53)],'#8c7050',.025);}}}
   landscape.frameWorkshop(atWorkshop(s));landscape.frameGathering(gatheringView(s)==='garden');const bakeryView=bakery.render(s,sol,time),solHead=sol.rig.localToWorld(new T.Vector3(0,1.04,0)).project(camera),solFeet=sol.rig.localToWorld(new T.Vector3(0,0,0)).project(camera);element.dataset['bakery']=JSON.stringify({...bakeryView,solScreen:{head:{x:solHead.x,y:solHead.y},feet:{x:solFeet.x,y:solFeet.y}}});const gatheringData=gathering.render(s,{pip,mara,sol,grandma,passengers,operator,boat:passengerBoat,gangway,solPage,cushions},time);element.dataset['gathering']=JSON.stringify(gatheringData);const line=c.gathering.turn?turnLines(c)[c.gathering.turn.index]:null,teller=line?({Pip:pip,Mara:mara,Sol:sol,Grandma:grandma})[line.who]:null;setLabel('speaker',teller?{x:teller.rig.position.x,z:teller.rig.position.z}:c.pip,1.65,!!line&&!s.panel);labels.get('speaker')!.textContent=line?.who??'';
   const pageFrom=c.page==='mara'?new T.Vector3(mara.rig.position.x+.18,.8,mara.rig.position.z+.13):c.page==='pip'?new T.Vector3(c.pip.x+.15,.55,c.pip.z+.15):new T.Vector3(grandma.rig.position.x-.2,.76,grandma.rig.position.z+.15);
   if(action?.kind==='page')pageFrom.lerp(new T.Vector3(c.pip.x+.15,.55,c.pip.z+.15),smooth(t));
   if(action?.kind==='report')pageFrom.lerp(new T.Vector3(grandma.rig.position.x-.2,.76,grandma.rig.position.z+.15),smooth(t));
   if(action?.kind==='maraTell'||action?.kind==='maraReturn'){const teller=c.story.phase==='mara'&&c.story.plan?.reader==='mara'?mara:pip;pageFrom.lerp(new T.Vector3(teller.rig.position.x+.20,.88,teller.rig.position.z+.17),smooth(t));teller.arms[0]!.rotation.x=-.65;}
   if(c.page==='grandma'&&(c.gathering.pageComplete||action?.kind==='finishGrandmaPage'))pageFrom.set(grandma.rig.position.x+.26,.54,grandma.rig.position.z+.16);
   page.position.copy(pageFrom);page.rotation.set(-.15,.35,-.12);
   element.dataset['maraPage']=JSON.stringify({holder:c.page,x:page.position.x,y:page.position.y,z:page.position.z,holderX:(c.page==='mara'?mara:c.page==='pip'?pip:grandma).rig.position.x,holderZ:(c.page==='mara'?mara:c.page==='pip'?pip:grandma).rig.position.z});
   const showLabels=c.started&&!s.panel&&!s.background&&!action&&!atWorkshop(s)&&gatheringView(s)==='none';maintenanceRopes.visible=ropeCount(c,'box')>0&&action?.kind!=='ropes';carriedRopes.visible=ropeCount(c,'pip')>0;carriedRopes.position.set(c.pip.x,.8,c.pip.z-.2);for(const [group,count]of [[maintenanceRopes,ropeCount(c,'box')],[carriedRopes,ropeCount(c,'pip')],[ropeHandoff,ropeCount(c,'box')]] as const)group.children.forEach((child,i)=>child.visible=i<count);ropeHandoff.visible=action?.kind==='ropes';if(ropeHandoff.visible)ropeHandoff.position.set(lerp(-2.8,c.pip.x,smooth(t)),lerp(.45,.8,smooth(t)),lerp(1.75,c.pip.z-.2,smooth(t)));
   setLabel('materials',{x:-2.8,z:1.75},.9,showLabels&&s.mode==='walk'&&!c.crossed);setLabel('landing',LANDING,.45,showLabels&&s.mode==='boat');setLabel('launch',LAUNCH,.45,showLabels&&s.mode==='boat');
   narrowPads.visible=s.mode==='arrange';setLabel('mara',{x:mara.rig.position.x,z:mara.rig.position.z},2.1,showLabels&&s.mode==='walk'&&!nearBakery(c));setLabel('grandma',GRANDMA,2.15,showLabels&&s.mode==='walk'&&!nearBakery(c));setLabel('sections',bridgeCenter(c),.50,showLabels&&s.mode==='walk'&&!action&&!nearBakery(c));setLabel('seedBoat',{x:seedBoat.position.x,z:seedBoat.position.z},.65,showLabels&&s.mode==='walk'&&!action&&!nearBakery(c));setLabel('a',visibleSections.a,1.05,showLabels&&s.mode==='arrange');setLabel('b',visibleSections.b,1.05,showLabels&&s.mode==='arrange');
   setLabel('sol',{x:sol.rig.position.x,z:sol.rig.position.z},2.05,showLabels&&s.mode==='walk'&&!nearBakery(c));setLabel('lanterns',{x:4.3,z:4.55},.7,showLabels&&s.mode==='walk'&&c.crossed&&!nearBakery(c));labels.get('sol')!.textContent=gatheringStarted(c)?'Sol':solAtWorkshop(c)?'Sol’s workshop':'Sol · roof repair';
   setLabel('bakery',BAKERY_APPROACH,1.4,showLabels&&s.mode==='walk'&&!nearBakery(c));
   labels.get('a')!.classList.toggle('is-selected',s.selection==='a');labels.get('b')!.classList.toggle('is-selected',s.selection==='b');
   labels.get('sections')!.textContent=c.joined?'Footbridge':'Bridge pieces';
   landscape.currents.position.z=c.reducedMotion||s.panel?0:Math.sin(time*.5)*.05;
   const active=moving||!!s.action||!!s.preview||!!s.boatTarget||!!s.keys.length,changed=lastDrawState!==s||lastWidth!==canvas.width||lastHeight!==canvas.height;
   if(!s.viewLost&&!document.hidden&&(active||changed||(!s.panel&&!s.background&&!c.reducedMotion&&now-lastDraw>=50))){const start=performance.now();renderer.render(scene,camera);const duration=performance.now()-start;lastDraw=now;lastDrawState=s;lastWidth=canvas.width;lastHeight=canvas.height;if(dt>0){cadence.push(dt);if(active)activeCadence.push(dt);if(cadence.length>600)cadence.shift();if(activeCadence.length>600)activeCadence.shift();}frames++;
    element.dataset['renderedFrame']=String(frames);element.dataset['renderedWidth']=String(canvas.width);element.dataset['renderedHeight']=String(canvas.height);element.dataset['renderedView']=s.panel??s.mode;
    if(frames%30===0){const sorted=[...(activeCadence.length?activeCadence:cadence)].sort((a,b)=>a-b),gl=renderer.getContext(),debug=gl.getExtension('WEBGL_debug_renderer_info');let geometryCpuBytes=0;for(const resource of art.resources)if(resource instanceof T.BufferGeometry){for(const attribute of Object.values(resource.attributes))if(attribute instanceof T.BufferAttribute)geometryCpuBytes+=attribute.array.byteLength;geometryCpuBytes+=resource.index?.array.byteLength??0;}
     element.dataset['metrics']=JSON.stringify({frames,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,geometries:renderer.info.memory.geometries,textures:renderer.info.memory.textures,activeSamples:activeCadence.length,p95:sorted[Math.floor(sorted.length*.95)]??0,lastRenderMs:duration,dpr:renderer.getPixelRatio(),width:canvas.width,height:canvas.height,geometryCpuBytes,canvasColorBytes:canvas.width*canvas.height*4,shadowDepthAllocationBytes:1536*1536*4,sectionTextureBytes:2*128*128*4,gpuTotalMemory:'NOT_MEASURED',adapter:debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER)});}
   }
   element.dataset['actionKind']=action?.kind??'none';element.dataset['chapterPhase']=c.story.phase;element.dataset['solX']=sol.rig.position.x.toFixed(3);element.dataset['solZ']=sol.rig.position.z.toFixed(3);element.dataset['maraX']=mara.rig.position.x.toFixed(3);element.dataset['maraZ']=mara.rig.position.z.toFixed(3);element.dataset['bridgeAction']=action?.kind==='collapse'?'collapsing':'idle';element.dataset['pipX']=pip.rig.position.x.toFixed(3);element.dataset['pipZ']=c.pip.z.toFixed(3);element.dataset['bridgeReady']=String(bridgeReady(c));element.dataset['sections']=JSON.stringify(c.sections);
   element.dataset['seedBoatX']=seedBoat.position.x.toFixed(3);element.dataset['seedBoatZ']=seedBoat.position.z.toFixed(3);element.dataset['seedX']=seed.position.x.toFixed(3);element.dataset['seedZ']=seed.position.z.toFixed(3);
   element.dataset['dockService']=c.mara.service;element.dataset['boatOperator']='separate crew member';element.dataset['passengerBoat']=JSON.stringify({visible:passengerBoat.visible,x:passengerBoat.position.x,z:passengerBoat.position.z,passengers:passengers.map(p=>({visible:p.rig.visible,x:p.rig.position.x,z:p.rig.position.z}))});
   element.dataset['ferryPhase']=action?.kind==='loadSeed'?'loading':action?.kind==='receiveSeed'?'handoff':action?.kind==='unloadSeed'?'unloading':c.seed==='boat'?c.river.boat.phase:'idle';
   element.dataset['renderedSections']=JSON.stringify(Object.fromEntries((['a','b'] as const).map(key=>[key,{x:sections[key].root.position.x,z:sections[key].root.position.z,rotation:sections[key].root.rotation.y}])));
  }
  renderer.setAnimationLoop(render);
  return()=>{renderer.setAnimationLoop(null);observer.disconnect();canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',cancel);canvas.removeEventListener('webglcontextlost',lost);canvas.removeEventListener('webglcontextrestored',restored);for(const b of labels.values())b.remove();for(const line of leaders.values())line.remove();art.dispose();renderer.dispose();renderer.forceContextLoss();canvas.remove();};
 },[store,onError]);
 return <div className="garden-scene" ref={host}/>;
}
