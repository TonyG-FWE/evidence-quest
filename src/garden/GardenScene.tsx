import {grandmaLocation} from './grandmaTravel.js';
import {pipLocomotion} from './locomotion.js';
import {makeWorkbench} from './workbenchWorld.js';
import {makeBridgeWorld} from './bridgeWorld.js';
import {makeBridgeHandles} from './bridgeHandles.js';
import {sectionSecured,safeBridgeRetreat,firstPart,sectionsMeet,sectionPlacementTargets,sectionRootHeight,bridgeWalkingHeight,bridgeSurfaces} from './bridgeConstruction.js';
import {WORKBENCH} from './workbench.js';
import {BRIDGE_GEOMETRY} from './worldLayout.js';
import type {ObservationId} from './journal.js';
import {anchors,regionAt,WORLD,DOCK_PASSENGER_EXITS,VILLAGE_BUILDINGS,WOODLAND_TERRACE,DOWNSTREAM_SHORES,PLANTING_BED,GARDEN_BENCHES,PASSENGER_GANGWAY,BAKERY_REPAIR,BAKERY_WORK,bakeryOvenPoint,roofDropTarget,BRIDGE_LEVELS,riverCenter,riverHalfWidth,pointInPolygon,findRoute,terrainHeight,WATER_SURFACE_Y,WATER_CUE_Y} from './worldLayout.js';
import {CameraInspection} from './cameraInspection.js';
import {GpuFrameTimer} from './gpuFrameTimer.js';
import {makeRiversideLandscape} from './worldArt.js';
import {availableHands,handAnchor,handDefinitions,handPlane,type HandObject} from './hands.js';
import {lanternIds,lanternRecord,gatheringPicture,type LanternId} from './lanterns.js';
import {makeLanternPicture} from './lanternWorld.js';
import {ReviewLanternPicture} from './assets/reviewLanternPicture.js';
import {makeGathering} from './gatheringWorld.js';
import {connectedGathering,turnLines} from './gathering.js';
import {makeBakery,roofTileContact,tileGripOffset,tileCarryGripOffset,roofPlacementProgress} from './bakeryWorld.js';
import {BAKERY,BAKERY_APPROACH,TILE_SHELF,TILE_APPROACH,THANK_RINA,nearBakery,bakeryReady,solAtWorkshop} from './bakery.js';
import {useEffect,useLayoutEffect,useRef} from 'react';
import * as T from 'three';
import {PaperArt,makeSection,makeSeedBoat,makeLantern,makeStudio} from './art.js';
import {legacyActor as makeCharacter,ModelActor,type SceneActor} from './assets/actor.js';
import {createRuntimeLibrary} from './assets/runtimeLibrary.js';
import {resourceAllocation} from './assets/resourceBudget.js';
import {runtimeAssets as approvedAssets} from './assets/runtimeManifest.js';
import {reviewAssets} from './assets/reviewManifest.js';
import {localReview} from './assets/profile.js';
import {ReviewWorld} from './assets/reviewWorld.js';
import {attachReviewLandscape} from './assets/reviewLandscape.js';
import {ReviewBridge} from './assets/reviewBridge.js';
import {ModelProp} from './assets/prop.js';
import {makeApprovedFinish} from './assets/runtimeFinish.js';
import {type GardenStore,type Point,CROSSING,FERRY_EAST,MARA,GRANDMA,GRANDMA_APPROACH,PLANT,distance,bridgeCenter,bridgeReady,ferryPosition} from './model.js';
import {SOL,SOL_APPROACH,solApproach,GATHER_SOL,GATHER_MARA,solPosition,maraAtGarden,gatheringStarted} from './chapter.js';
import {collapseResult,LAUNCH,LANDING,RIVER_ROCKS,ropeCount} from './river.js';
import {makeWorkshop,makeStoryFlowers,makePassengerBoat} from './chapterWorld.js';
import {passengerVesselPose,passengerSeat} from './passengerVessel.js';
export type SceneStatus={phase:'loading'|'ready'|'recovering'|'failed';location:string;cause?:string};
export function GardenScene({store,onError,onStatus,reviewControls}:{store:GardenStore;onError:(error:unknown)=>void;onStatus?:(status:SceneStatus)=>void;reviewControls?:HTMLElement|null}){
 const host=useRef<HTMLDivElement>(null),controlsSlot=useRef<HTMLDivElement|null>(null),callbacks=useRef({onError,onStatus});
 callbacks.current={onError,onStatus};
 const controlsParent=useRef(reviewControls);controlsParent.current=reviewControls;
 useLayoutEffect(()=>{if(controlsSlot.current&&reviewControls)reviewControls.append(controlsSlot.current);},[reviewControls]);
 useEffect(()=>{
  const partialCleanup:Array<()=>void>=[];let failed=false,disposed=false,lastStatus='';
  const status=(next:SceneStatus)=>{const key=JSON.stringify(next);if(disposed||lastStatus===key)return;lastStatus=key;if(host.current)host.current.dataset['scenePhase']=next.phase;callbacks.current.onStatus?.(next);};
  const fail=(error:unknown)=>{if(failed||disposed)return;failed=true;status({phase:'failed',location:'village',cause:error instanceof Error?error.message:String(error)});callbacks.current.onError(error);};
  status({phase:'loading',location:'village'});
  const controls=document.createElement('div');controls.style.display='contents';controlsSlot.current=controls;controlsParent.current?.append(controls);
  partialCleanup.push(()=>{controls.remove();if(controlsSlot.current===controls)controlsSlot.current=null;});
  try{
  let diagnostic='normal',warmup=0;const element=host.current!;const values:Record<string,string>={};const metadata=new Proxy(element.dataset,{set(target,key,value){if(diagnostic==='no-dom'&&String(key)!=='metrics')return true;const name=String(key),text=String(value);if(values[name]!==text){values[name]=text;target[name]=text;}return true;}});const art=new PaperArt();partialCleanup.push(()=>art.dispose());let renderer:T.WebGLRenderer;
  // The scene clears an opaque background. This option controls output opacity;
  // Three r186 still creates an alpha-enabled context. Explicit opaque-context
  // diagnostics did not resolve the separately recorded WebKit DPR2 failure.
  try{renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});}catch(error){throw error;}
  partialCleanup.push(()=>{renderer.setAnimationLoop(null);renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();});
  let adapterIdentity='unavailable';
  function readAdapterIdentity(){const gl=renderer.getContext(),debug=gl.getExtension('WEBGL_debug_renderer_info');adapterIdentity=String(gl.getParameter(debug?debug.UNMASKED_RENDERER_WEBGL:gl.RENDERER));}
  readAdapterIdentity();
  const profileGl=renderer.getContext(),gpuTimer=import.meta.env['VITE_EQ_PROFILE']==='1'&&'beginQuery' in profileGl?new GpuFrameTimer(profileGl):null;
  renderer.setClearColor('#d5dfce',1);renderer.setPixelRatio(devicePixelRatio);
  // Depth first lets opaque foreground terrain reject covered background
  // fragments before their lighting work. Transparent ordering is unchanged.
  renderer.setOpaqueSort((a,b)=>a.groupOrder-b.groupOrder||a.renderOrder-b.renderOrder||a.z-b.z||a.material.id-b.material.id||a.id-b.id);
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;
  renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.0;
  renderer.localClippingEnabled=localReview;
  const canvas=renderer.domElement;canvas.setAttribute('aria-label','The river and Grandma’s garden. Use the named controls below or click the scene.');canvas.setAttribute('role','img');canvas.tabIndex=0;element.append(canvas);
  const scene=new T.Scene();scene.fog=new T.Fog('#d5dfce',38,85);const camera=new T.OrthographicCamera(-9,9,6,-6,.1,100);
  camera.position.set(7.5,16,19);camera.lookAt(0,0,.1);
  scene.add(new T.HemisphereLight('#fff3d2','#7b9c87',1.7));
  const sun=new T.DirectionalLight('#fff0cf',2.2);sun.position.set(-7,13,6);sun.castShadow=true;sun.shadow.mapSize.set(1536,1536);sun.shadow.camera.left=-10;sun.shadow.camera.right=10;sun.shadow.camera.top=10;sun.shadow.camera.bottom=-10;sun.shadow.normalBias=.025;sun.shadow.bias=-.0002;scene.add(sun);
  const ground=new T.Mesh(new T.PlaneGeometry(200,200),art.material('#c2cdad'));art.resources.add(ground.geometry);ground.rotation.x=-Math.PI/2;ground.position.y=-.64;ground.receiveShadow=true;scene.add(ground);
  const landscape=makeRiversideLandscape(art,localReview);scene.add(landscape.root,landscape.currents);
  const assets=createRuntimeLibrary(renderer),review=localReview?new ReviewWorld(assets.library):null;partialCleanup.push(()=>{review?.dispose();assets.dispose();});
  const runtimeAssets=localReview?{pip:reviewAssets['pip']!,grandma:reviewAssets['grandma']!,boat:{...reviewAssets['boat-space']!,anchors:{'seed-cradle':[0,.187,0] as const}},flower:reviewAssets['flower-2']!}:approvedAssets;
  const otherActors:ModelActor[]=[];partialCleanup.push(()=>{for(const actor of otherActors)actor.dispose();});
  const character=(kind:Parameters<typeof makeCharacter>[1]):SceneActor=>{if(!localReview)return makeCharacter(art,kind);const actor=new ModelActor(assets.library,reviewAssets[kind]!);otherActors.push(actor);return actor;};
  const bakery=makeBakery(art,()=>character('rina'),localReview);scene.add(bakery.root);
  const sol=character('sol');scene.add(sol.rig);const workshop=makeWorkshop(art);scene.add(workshop);const workbench=makeWorkbench(art);scene.add(workbench.root);partialCleanup.push(()=>workbench.dispose());
  const finish=makeApprovedFinish(art);
  if(finish){landscape.root.traverse(object=>{if(object instanceof T.InstancedMesh)object.visible=false;});finish.paintSurfaces(landscape.root,bakery.shell,workshop);scene.add(finish.root);}
  const pip=new ModelActor(assets.library,runtimeAssets.pip),mara=character('mara'),grandma=new ModelActor(assets.library,runtimeAssets.grandma),jo=character('jo');
  partialCleanup.push(()=>{pip.dispose();grandma.dispose();});scene.add(pip.rig,mara.rig,grandma.rig,jo.rig);mara.rig.position.set(MARA.x,.13,MARA.z);grandma.rig.position.set(GRANDMA.x,.13,GRANDMA.z);jo.rig.position.set(3.1,.14,-4.7);
  const loop=new T.Group();loop.position.set(4,.16,-4.6);scene.add(loop);
  art.box(loop,0,.23,0,.35,.28,.25,'#faf0d0');art.box(loop,0,.26,.137,.26,.10,.025,'#28594f');
  for(const x of [-.075,.075])art.ball(loop,x,.27,.156,.023,'#f3d173');
  for(const x of [-.17,.17]){const wheel=art.cylinder(loop,x,.078,0,.075,.075,.06,'#53766b',12);wheel.rotation.z=Math.PI/2;}
  const projection=art.cylinder(loop,0,.30,-.30,.16,.055,.40,'#c1ddc0',12);projection.rotation.x=Math.PI/2;
  const sections={a:makeSection(art,'a'),b:makeSection(art,'b')};scene.add(sections.a.root,sections.b.root);
  const boatModel=runtimeAssets.boat?new ModelProp(assets.library,runtimeAssets.boat,[.45,.35,.85],'seedBoat'):null;
  const seedBoat=boatModel?.root??makeSeedBoat(art);scene.add(seedBoat);

  const materialBox=new T.Group();materialBox.position.set(-2.8,terrainHeight(anchors.crossing.materials)-.03,1.75);art.box(materialBox,0,.16,0,.55,.32,.42,'#b29163');art.box(materialBox,0,.34,0,.60,.04,.47,'#e9d4a2');scene.add(materialBox);
  const maintenanceRopes=new T.Group(),carriedRopes=new T.Group();for(const group of [maintenanceRopes,carriedRopes])for(const x of [-.10,.10]){const points=Array.from({length:25},(_,i)=>new T.Vector3(x+Math.cos(i/24*Math.PI*2)*.08,0,Math.sin(i/24*Math.PI*2)*.08));art.line(group,points,'#b79154',.02);}maintenanceRopes.position.set(-2.8,terrainHeight(anchors.crossing.materials)+.35,1.75);const ropeHandoff=maintenanceRopes.clone();scene.add(maintenanceRopes,carriedRopes,ropeHandoff);
  if(!localReview)for(const rock of RIVER_ROCKS)art.ball(scene,rock.x,-.03,rock.z,.34,'#8c9489',[1,.6,.9]);
  const narrowPads=new T.Group();for(const [i,target] of sectionPlacementTargets(store.getSnapshot().chapter,'a').slice(0,2).entries()){const pad=art.box(narrowPads,target.point.x,BRIDGE_LEVELS.deck+.015,target.point.z,BRIDGE_GEOMETRY.length,.015,BRIDGE_GEOMETRY.walkHalfWidth*2,i===0?'#ebc45d':'#67adc7');const mat=(pad.material as T.MeshStandardMaterial).clone();art.resources.add(mat);mat.transparent=true;mat.opacity=.3;pad.material=mat;}scene.add(narrowPads);
  const landingFlags:T.Group[]=[];
  for(const [p,color] of [[LAUNCH,'#e7ba55'],[LANDING,'#6ca9c4']] as const){const flag=new T.Group(),side=p.x<0?-1:1,point={x:riverCenter(p.z)+side*(riverHalfWidth(p.z)+.38),z:p.z};flag.position.set(point.x,localReview?terrainHeight(point):.05,point.z);art.cylinder(flag,0,.26,0,.045,.045,.52,'#897654');art.box(flag,0,.50,0,.3,.18,.035,color);scene.add(flag);landingFlags.push(flag);}
  const landingCues=new T.Group();scene.add(landingCues);
  if(localReview)for(const [p,color] of [[LAUNCH,'#e7ba55'],[LANDING,'#6ca9c4']] as const){const ring=new T.Mesh(new T.RingGeometry(.44,.51,40),new T.MeshBasicMaterial({color,side:T.DoubleSide,transparent:true,opacity:.85,depthWrite:false}));art.resources.add(ring.geometry);art.resources.add(ring.material);ring.rotation.x=-Math.PI/2;ring.position.set(p.x,WATER_CUE_Y,p.z);landingCues.add(ring);}
  const seed=art.ball(scene,0,.5,0,.04,'#e7ba55',[.7,1,.7]);
  const seedProxy=new T.Mesh(new T.SphereGeometry(.13,8,6),new T.MeshBasicMaterial({visible:false}));art.resources.add(seedProxy.geometry);art.resources.add(seedProxy.material);seedProxy.userData['target']='seed';scene.add(seedProxy);
  const page=new T.Group();art.box(page,0,0,0,.23,.31,.012,'#fff7df');for(let i=0;i<5;i++)art.box(page,0,.08-i*.035,.01,.16-(i%2)*.025,.006,.005,'#a29a7d');scene.add(page);
  const planted=makeLantern(art,PLANT.x,PLANT.z);planted.root.userData['target']='lantern:pip';scene.add(planted.root);
  const flowerModel=runtimeAssets.flower?new ModelProp(assets.library,runtimeAssets.flower,[.55,1.28,.55],'lantern:pip'):null;if(flowerModel)scene.add(flowerModel.root);
  const sproutModel=localReview?new ModelProp(assets.library,reviewAssets['sprout']!,[.5,.5,.5],'sprout'):null;if(sproutModel){sproutModel.root.position.set(PLANT.x,.23,PLANT.z);scene.add(sproutModel.root);}
  const budModel=localReview?new ModelProp(assets.library,reviewAssets['bud']!,[.5,1,.5],'lantern:pip'):null;if(budModel){budModel.root.position.set(PLANT.x,.23,PLANT.z);scene.add(budModel.root);}
  const preparedSoil=new T.Group();for(let i=0;i<5;i++)art.line(preparedSoil,[new T.Vector3(PLANT.x-.23,.231,PLANT.z-.20+i*.10),new T.Vector3(PLANT.x+.23,.231,PLANT.z-.20+i*.10)],'#b29461',.018);scene.add(preparedSoil);
  const trowel=new T.Group();art.cylinder(trowel,0,.10,0,.022,.022,.24,'#af8758');art.box(trowel,0,-.055,0,.10,.12,.025,'#829d93');scene.add(trowel);
  const picture=()=>localReview?new ReviewLanternPicture(assets.library):makeLanternPicture(art);
  const flowers=makeStoryFlowers(art);for(const flower of flowers)scene.add(flower.root);const memoryPictures=lanternIds.map(picture);for(const picture of memoryPictures)scene.add(picture.root);
  const chosenMemory=picture();chosenMemory.root.userData['target']='memory';scene.add(chosenMemory.root);
  const reviewPictures=[...memoryPictures,chosenMemory].filter((picture):picture is ReviewLanternPicture=>picture instanceof ReviewLanternPicture);partialCleanup.push(()=>{for(const picture of reviewPictures)picture.dispose();});
  const passengerBoat=makePassengerBoat(art);scene.add(passengerBoat);const operator=character('operator');scene.add(operator.rig);const passengers=[character('boy'),character('passenger')];for(const passenger of passengers)scene.add(passenger.rig);
  const gangway=art.box(scene,-4.65,.20,-14.1,1.10,.08,.46,'#bf9868');
  const solPage=page.clone();scene.add(solPage);const grandmaCopy=page.clone();scene.add(grandmaCopy);
  const cushions=new T.Group();for(const x of [4.85,5.45])art.box(cushions,x+3,.64,10.2,.51,.10,.40,'#e6c477');scene.add(cushions);
  const gathering=makeGathering(art);scene.add(gathering.root);
  const glow=new T.PointLight('#ffc86c',0,4,2);glow.position.set(PLANT.x,1.2,PLANT.z);scene.add(glow);
  const bridge=makeBridgeWorld(art);scene.add(bridge.root);const bridgeHandles=makeBridgeHandles(element);partialCleanup.push(()=>{bridge.dispose();bridgeHandles.dispose();});
  const soilHandle=art.cylinder(scene,PLANT.x,.22,PLANT.z,PLANTING_BED.radius,PLANTING_BED.radius,.025,'#7f674a',24);soilHandle.userData['target']='soil';
  seed.userData['target']='seed';materialBox.userData['target']='rope-box';
  const gestureLine=art.line(scene,[new T.Vector3(),new T.Vector3(0,.1,0)],'#d3ad67',.025);gestureLine.visible=false;
  const pickables:T.Object3D[]=[chosenMemory.root,seedProxy,soilHandle,materialBox,...bridge.pickables,bakery.cracked,bakery.flour,bakery.dough,...bakery.loaves,bakery.rina.rig,bakery.tile,...bakery.targets,pip.pickProxy,mara.rig,grandma.pickProxy,sol.rig,...flowers.map(f=>f.root),...memoryPictures.map((picture,i)=>{picture.root.userData['target']='lantern:'+lanternIds[i];return picture.root;}),flowerModel?.proxy??planted.root,sections.a.root,sections.b.root,boatModel?.proxy??seedBoat];
  sol.rig.userData['target']='sol';mara.rig.userData['target']='mara';grandma.rig.userData['target']='grandma';sections.a.root.userData['target']='a';sections.b.root.userData['target']='b';seedBoat.userData['target']='seedBoat';
  workshop.userData['target']='sol';bakery.shell.userData['target']='rina';landscape.office.userData['target']='mara';landscape.arbor.userData['target']='lanterns';pickables.push(workshop,bakery.shell,landscape.office,landscape.arbor);
  const outline=(margin:number)=>[[-1,-1],[1,-1],[1,1],[-1,1]].map(([x,z])=>new T.Vector2(x!*(BRIDGE_GEOMETRY.halfLength+margin),z!*(BRIDGE_GEOMETRY.walkHalfWidth+margin)));
  const selectionShape=new T.Shape(outline(.05));selectionShape.holes.push(new T.Path(outline(.015).reverse()));
  const selection=new T.Mesh(new T.ShapeGeometry(selectionShape),new T.MeshBasicMaterial({color:'#e9b857',transparent:true,opacity:.95,side:T.DoubleSide,depthWrite:false}));art.resources.add(selection.geometry);art.resources.add(selection.material);selection.rotation.x=-Math.PI/2;selection.position.y=.17;scene.add(selection);
  const destination=new T.Mesh(new T.RingGeometry(.12,.16,28),new T.MeshBasicMaterial({color:'#f9f1cf',transparent:true,opacity:.85,side:T.DoubleSide,depthWrite:false}));art.resources.add(destination.geometry);art.resources.add(destination.material);destination.rotation.x=-Math.PI/2;destination.position.y=.135;scene.add(destination);
  const adventure=new T.Group();for(const child of [...scene.children])if(child!==ground&&!(child instanceof T.Light)&&child!==jo.rig&&child!==loop)adventure.add(child);scene.add(adventure);
  const studio=makeStudio(art);scene.add(studio);jo.rig.position.set(1.2,0,1.40);loop.position.set(2.85,.77,.45);
  const reviewBridge=localReview?new ReviewBridge(assets.library,adventure):null;partialCleanup.push(()=>reviewBridge?.dispose());
  const shoreVisuals:ModelProp[]=[];
  let bakeryVisual:ModelProp|null=null,dockVisual:ModelProp|null=null,landingVisual:ModelProp|null=null,passengerVisual:ModelProp|null=null,gangwayVisual:ModelProp|null=null,inboardVisual:ModelProp|null=null;
  const deckVisuals:Partial<Record<'a'|'b',ModelProp>>={};
  if(review){
   workshop.position.fromArray(VILLAGE_BUILDINGS.workshop.position);workshop.rotation.y=VILLAGE_BUILDINGS.workshop.rotation;
   review.attach('workshop-clear-porch',workshop,{scale:Array(3).fill(VILLAGE_BUILDINGS.workshop.scale) as [number,number,number]});
   const bakeryCutaway=(s:ReturnType<GardenStore['getSnapshot']>)=>nearBakery(s.chapter)&&(s.action?.kind==='bakeryWelcome'||['checked','mixed','shaped','baked','escorting','done'].includes(s.chapter.bakery.stage));
   // Downward surface probes bind the supplied roof opening to the existing repair anchor.
   bakeryVisual=review.attach('bakery',bakery.shell,{position:[VILLAGE_BUILDINGS.bakery.position[0]-BAKERY.x,.13,VILLAGE_BUILDINGS.bakery.position[2]-BAKERY.z],rotation:[0,VILLAGE_BUILDINGS.bakery.rotation,0],scale:Array(3).fill(VILLAGE_BUILDINGS.bakery.scale) as [number,number,number],cutaway:bakeryCutaway});
   review.attach('oven',bakery.oven,{position:[0,.13,0]});
   review.attach('tile',bakery.tile,{scale:Array(3).fill(BAKERY_REPAIR.tileScale) as [number,number,number],cutaway:s=>bakeryCutaway(s)&&s.chapter.bakery.tile==='roof'});
   review.attach('tile-2',bakery.cracked,{scale:Array(3).fill(BAKERY_REPAIR.tileScale) as [number,number,number],cutaway:s=>bakeryCutaway(s)&&s.chapter.bakery.cracked==='roof'});
   for(const [id,object]of [['flour',bakery.flour],['toolbox',bakery.toolkit],['crate',materialBox],['card',page],['card',solPage],['card',grandmaCopy],['card',bakery.writingPage],['card',gathering.manuscript],['trowel',trowel],['scoop',bakery.flourScoop]] as const)review.attach(id,object);
   review.place('bench',adventure,[BAKERY_WORK.table.x,BAKERY_WORK.table.y,BAKERY_WORK.table.z],Math.PI/2,false,BAKERY_WORK.tableScale);
   gangwayVisual=review.attach('ramp',gangway,{rotation:[0,PASSENGER_GANGWAY.outer.yaw,0],scale:PASSENGER_GANGWAY.outer.scale});
   inboardVisual=review.attach('ramp',gangway,{replace:false,position:PASSENGER_GANGWAY.inner.offset,rotation:[0,PASSENGER_GANGWAY.inner.yaw,0],scale:PASSENGER_GANGWAY.inner.scale});
   review.place('bench',adventure,[TILE_SHELF.x,.13,TILE_SHELF.z],Math.PI/2,false,[.55,.595,.50]);
   review.attach('ladder',bakery.ladder,{position:[0,.13,0],rotation:[0,BAKERY_REPAIR.ladder.yaw,0],scale:Array(3).fill(BAKERY_REPAIR.ladder.scale) as [number,number,number]});
   review.attach('seed',seed,{position:[0,-.04,0]});
   review.attach('bowl',bakery.bowl,{position:[0,-.06,0]});
   review.attach('dough-kneaded',bakery.wholeDough,{position:[0,-.15/.55,0],scale:[1.56/1.8,1.56/.55,1.56/1.15]});
   for(const holder of bakery.portionHolders)review.attach('dough',holder);
   review.attach('loaf-3',bakery.uneven,{position:[0,-.06,0]});
   passengerVisual=review.attach('boat-2',passengerBoat,{position:[0,-.13/1.5,0],rotation:[0,-Math.PI/2,0],scale:[1/2,1/1.5,1/2.6]});
   for(const loaf of bakery.loaves){const baked=(s:ReturnType<GardenStore['getSnapshot']>)=>['baked','escorting','done'].includes(s.chapter.bakery.stage)||s.action?.kind==='bakeBread'&&s.action.elapsed/s.action.duration>.95;review.attach('loaf',loaf,{when:baked,rotation:[0,Math.PI/2,0],scale:[.72,.72,.72]});review.attach('dough',loaf,{when:s=>!baked(s),scale:[.72,.72,.72]});}
   for(const [id,post]of Object.entries(bridge.posts))review.attach(id.startsWith('center')?'post':'bollard',post,{scale:id.startsWith('center')?BRIDGE_GEOMETRY.centerPostScale:BRIDGE_GEOMETRY.endPostScale});
   for(const end of Object.values(bridge.ends))review.attach('rope-coil',end);
   for(const id of ['a','b'] as const)deckVisuals[id]=review.attach('platform-bridge-fitted',sections[id].root,{position:[0,BRIDGE_GEOMETRY.modelOffset,0],rotation:[0,BRIDGE_GEOMETRY.modelYaw,0],scale:BRIDGE_GEOMETRY.modelScale});
   for(const group of [maintenanceRopes,carriedRopes,ropeHandoff])for(const rope of [...group.children])review.attach('rope-coil',rope);
   for(const flower of flowers)review.attach('flower-2',flower.root);
   const soilScale=[PLANTING_BED.scale,1,PLANTING_BED.scale] as const;
   review.attach('soil-open',preparedSoil,{position:[PLANT.x,.235,PLANT.z],scale:soilScale,when:s=>s.chapter.seed!=='soil'});
   review.attach('soil-covered',preparedSoil,{position:[PLANT.x,.235,PLANT.z],scale:soilScale,when:s=>s.chapter.seed==='soil'});
   review.attach('soil-covered',soilHandle,{position:[0,-.0025,0],scale:soilScale,when:s=>!s.chapter.river.soilPrepared});
   for(const cushion of [...gathering.carriedCushions.children])review.attach('cushion',cushion);
   review.attach('chest',gathering.storageBox,{rotation:[0,Math.atan2(-.22,.50),0]});
   gathering.storageLid.visible=false;
   for(const cushion of [...cushions.children])review.attach('cushion',cushion);
   // Supplied scenery sits outside the existing irregular walk corridors.
   landscape.office.position.fromArray(VILLAGE_BUILDINGS.dock.position);landscape.office.rotation.y=VILLAGE_BUILDINGS.dock.rotation;
   review.attach('cottage',landscape.office,{scale:[1.8,1.8,1.8]});
   review.retire(landscape.garden);
   for(const bench of GARDEN_BENCHES)review.place('bench-1',adventure,[bench.x,.13,bench.z],bench.yaw,false,bench.scale);
   review.attach('arbor',landscape.arbor,{position:[5.5,.13,8.3],rotation:[0,Math.PI/2,0],scale:[.6,.84,.95],occlusion:true});
   dockVisual=review.attach('dock',landscape.dock,{position:[-2.65,-.38,-4.1],rotation:[0,Math.PI,0],scale:[.5,.5,.5]});
   landingVisual=review.place('dock-1',adventure,[3.75,-.18,9.2],0,false,[.4,.4,.4]);
   for(const flag of landingFlags)review.attach('marker',flag);
   const bellFrame=landscape.bellBody.parent!;review.retire(bellFrame);
   review.attach('post',bellFrame,{replace:false,scale:[.7,1.24/.55,.5]});
   review.attach('post',bellFrame,{replace:false,position:[-.035,1.23,0],rotation:[0,0,-Math.PI/2],scale:[.5,.41/.55,.5]});
   review.attach('bell',landscape.bellBody,{position:[0,-.08,0],scale:[.5,.5,.5]});
   landscape.root.traverse(o=>{if(o instanceof T.InstancedMesh&&o.geometry instanceof T.CylinderGeometry||o instanceof T.InstancedMesh&&o.geometry instanceof T.IcosahedronGeometry)o.visible=false;});
   metadata.scenery=JSON.stringify(attachReviewLandscape(review,adventure));
   review.place('grass-island',adventure,WOODLAND_TERRACE.position,0,false,[WOODLAND_TERRACE.scale,WOODLAND_TERRACE.scale,WOODLAND_TERRACE.scale]);
   for(const shore of DOWNSTREAM_SHORES)shoreVisuals.push(review.place(shore.id,adventure,shore.position,shore.yaw));
   review.attach('bench',workbench.table,{position:[WORKBENCH.x,.13,WORKBENCH.z],rotation:[0,Math.PI/2,0],scale:[1.55,1.015,1.36],occlusion:true});
   review.attach('stage-1',studio,{studio:true,position:[1,-.12,-.5],rotation:[0,-Math.PI/2,0]});
   review.place('table',studio,[1.4,.206,-.25],Math.PI/2,true,[1.05,1,1.2]);
   review.place('storybook',studio,[1.2,.964,-.25],0,true,[.8,.8,.8]);
   review.place('pencils',studio,[2.25,.964,-.6],0,true);
   review.place('cup',studio,[.5,.964,.08],0,true);
   review.place('cards',studio,[.65,.964,-.56],0,true);
   review.place('potted',studio,[2.25,.206,-.85],0,true);
   jo.rig.position.set(.6,.206,.85);jo.rig.rotation.y=.25;loop.position.set(2.3,.964,.08);
   review.attach('loop',loop,{studio:true});
   metadata['assetProfile']='local-review-pending-approval';
  }
  if(sproutModel)pickables.push(sproutModel.proxy);
  const labels=new Map<string,HTMLElement>(),leaders=new Map<string,HTMLElement>();let hoveredLabel:string|null=null;
  const labelOffsets:Record<string,[number,number]>={materials:[-150,-30],sections:[-12,40],seedBoat:[72,-10],launch:[-105,-35],landing:[115,-35],lanterns:[75,44]};
  function marker(id:string,text:string,onClick:()=>void){let label:HTMLElement;if(id==='a'||id==='b'||id==='speaker'){label=document.createElement('span');label.className='garden-marker garden-section-label';label.setAttribute('aria-hidden','true');}else{const button=document.createElement('button');button.type='button';button.onclick=()=>{cameraControls.follow();onClick();};button.className='garden-marker';label=button;}label.textContent=text;label.dataset['gardenMarker']=id;element.append(label);labels.set(id,label);if(labelOffsets[id]){const line=document.createElement('span');line.className='garden-leader';line.setAttribute('aria-hidden','true');element.append(line);leaders.set(id,line);}}
  function interact(target:string){
   const s=store.getSnapshot(),p=s.chapter.pip;if(s.panel||s.action||!s.chapter.started||s.mode==='boat')return;
   if(target==='sprout'||target==='lantern:pip'&&s.chapter.seed==='soil'&&!s.chapter.bloomed){store.send({type:'BLOOM'});return;}
   if(target.startsWith('lantern:')){store.send({type:'INSPECT_LANTERN',lantern:target.slice(8) as LanternId});return;}
   if(target==='rina'){store.send(nearBakery(s.chapter)?{type:'TALK',who:'rina'}:{type:'GO',point:BAKERY_APPROACH,target:'Rina’s bakery'});return;}
   if(target==='spareTile'){store.send({type:'GO',point:TILE_APPROACH,target:'the tile shelf'});return;}
   if(target==='sol'){if(distance(p,solPosition(s.chapter))<1.5)store.send({type:'TALK',who:'sol'});else store.send({type:'GO',point:solApproach(s.chapter),target:'Sol'});}
   if(target==='lanterns'){if(s.chapter.crossed)store.send({type:'OPEN',panel:'lanterns'});}
   if(target==='mara'){if(distance(p,maraAtGarden(s.chapter)?GATHER_MARA:MARA)<1.5)store.send({type:'TALK',who:'mara'});else store.send({type:'GO',point:maraAtGarden(s.chapter)?{x:anchors.gathering.mara.x-1.05,z:anchors.gathering.mara.z}:anchors.dock.approach,target:'Mara'});}
   if(target==='grandma'){if(distance(p,GRANDMA)<1.25)store.send({type:'TALK',who:'grandma'});else store.send({type:'GO',point:GRANDMA_APPROACH,target:'Grandma'});}
   if(target==='sections'){if(distance(p,CROSSING)<1.6)store.send({type:'OPEN',panel:'sections'});else store.send({type:'GO',point:CROSSING,target:'the bridge pieces'});}
   if(target==='seedBoat'){
    if(s.chapter.ferrySide==='east'){if(distance(p,GRANDMA)<1.25)store.send({type:'OPEN',panel:'sections'});else interact('grandma');}
    else if(distance(p,CROSSING)<1.6)store.send({type:'OPEN',panel:'sections'});else store.send({type:'GO',point:CROSSING,target:'the seed boat'});
   }
   if(target==='a'||target==='b'){if(s.mode==='arrange')store.send({type:'SELECT',section:target});else interact('sections');}
  }
  marker('mara','Mara',()=>interact('mara'));marker('grandma','Grandma',()=>interact('grandma'));marker('sections','Bridge pieces',()=>interact('sections'));
  marker('seedBoat','Seed boat',()=>interact('seedBoat'));marker('sol','Sol’s workshop',()=>overview?store.send({type:'GO',point:SOL_APPROACH,target:'Sol’s workshop'}):interact('sol'));marker('lanterns','Lantern stories',()=>interact('lanterns'));
  // Captions never intercept the placement plane. The sections and native side controls select them.
  marker('materials','Grandma’s repair box',()=>interact('sections'));marker('launch','Yellow launch',()=>store.send({type:'UNLOAD_SEED'}));marker('landing','Grandma’s blue landing',()=>store.send({type:'DOCK_SEED'}));
  marker('speaker','',()=>{});
  marker('bakery','Rina’s bakery',()=>interact('rina'));
  marker('a','Section A',()=>interact('a'));marker('b','Section B',()=>interact('b'));
  // ResizeObserver owns these dimensions. Reading layout between each label's
  // style writes forces repeated synchronous layouts during a camera movement.
  let viewportWidth=1,viewportHeight=1;
  function setLabel(id:string,p:Point,height:number,visible=true){
   if(diagnostic==='no-dom')return;const label=labels.get(id)!,line=leaders.get(id),v=new T.Vector3(p.x,height,p.z).project(camera);
   visible=visible&&Math.abs(v.x)<1.08&&Math.abs(v.y)<1.08&&v.z>=-1&&v.z<=1;
   label.hidden=!visible;const shown=visible&&(hoveredLabel===id||document.activeElement===label);label.classList.toggle('is-revealed',shown);if(line)line.hidden=!shown;if(!visible)return;
   const offset=labelOffsets[id]??[0,0],x=(v.x*.5+.5)*viewportWidth,y=(-v.y*.5+.5)*viewportHeight,lx=Math.max(85,Math.min(viewportWidth-85,x+offset[0])),ly=Math.max(25,Math.min(viewportHeight-25,y+offset[1]));
   const transform='translate3d('+lx.toFixed(3)+'px,'+ly.toFixed(3)+'px,0) translate(-50%,-50%)';if(label.style.transform!==transform)label.style.transform=transform;
   if(line&&shown){const anchor=new T.Vector3(p.x,.2,p.z).project(camera),ax=(anchor.x*.5+.5)*viewportWidth,ay=(-anchor.y*.5+.5)*viewportHeight;line.style.left=ax+'px';line.style.top=ay+'px';line.style.width=Math.hypot(lx-ax,ly-ay)+'px';line.style.transform='rotate('+Math.atan2(ly-ay,lx-ax)+'rad)';}
  }
  function atWorkshop(s:ReturnType<GardenStore['getSnapshot']>){return !gatheringStarted(s.chapter)&&['escorting','done'].includes(s.chapter.bakery.stage)&&distance(s.chapter.pip,SOL)<2.1;}
  function gatheringView(s:ReturnType<GardenStore['getSnapshot']>){if(s.action?.kind==='dockService')return 'dock';if(!connectedGathering(s.chapter)||s.chapter.story.phase==='planning'||s.panel==='studio')return 'none';if(s.chapter.story.phase==='arriving'){if(s.action?.kind==='maraArrival'||s.action?.kind==='solArrival')return 'travel';if(s.chapter.story.plan?.time==='later'&&['not-started','boat-moored'].includes(s.chapter.gathering.arrival))return 'dock';return 'garden';}if(s.chapter.story.phase==='closed'){if(distance(s.chapter.pip,MARA)<2.2)return 'dock';if(distance(s.chapter.pip,GRANDMA)>3.2)return 'none';}return 'garden';}
  let cameraHalf=6.2,overview=false,cameraHeld=false;const cameraLook=new T.Vector3(),cameraDesired=new T.Vector3(),cameraOrbit=new T.Spherical().setFromVector3(new T.Vector3(7.5,13,19)),cameraOffset=new T.Vector3();
  const cameraControls=new CameraInspection(element);partialCleanup.push(()=>cameraControls.dispose());
  const viewFrustum=new T.Frustum(),viewProjection=new T.Matrix4(),viewBounds=new T.Sphere();
  function inCamera(point:Point,radius=2){return viewFrustum.intersectsSphere(viewBounds.set(new T.Vector3(point.x,.7,point.z),radius));}
  let reviewStudio=false;
  const studioReviewButton=localReview?document.createElement('button'):null;
  if(studioReviewButton){studioReviewButton.className='garden-studio-review';studioReviewButton.textContent='Inspect studio';studioReviewButton.setAttribute('aria-pressed','false');studioReviewButton.onclick=()=>{reviewStudio=!reviewStudio;cameraControls.follow();studioReviewButton.textContent=reviewStudio?'Return to village':'Inspect studio';studioReviewButton.setAttribute('aria-pressed',String(reviewStudio));for(const key of store.getSnapshot().keys)store.send({type:'KEY',key,down:false});resize();};controls.append(studioReviewButton);}
  function bridgeFocus(s:ReturnType<GardenStore['getSnapshot']>){return !s.chapter.crossed&&!s.panel&&!s.action&&s.mode!=='boat'&&distance(s.chapter.pip,{x:-1.5,z:2.4})<3.8;}
  function updateCamera(s:ReturnType<GardenStore['getSnapshot']>,immediate=false,dt=1/60){
   if((s.gesture||s.cardGesture||cameraHeld)&&!immediate)return;
   const c=s.chapter,aspect=Math.max(.4,viewportWidth/Math.max(1,viewportHeight)),construct=s.mode==='arrange',boatFocus=s.mode==='boat',roof=s.mode==='bakery-repair',bakeryFocus=nearBakery(c),gview=gatheringView(s);
   const loafVisit=c.bakery.stage==='escorting'&&distance(c.pip,SOL)<2;
   const bakeryWorking=bakeryFocus&&(s.action?.kind==='bakeryWelcome'||['checked','mixed','shaped','baked','escorting','done'].includes(c.bakery.stage));
   let target=c.pip,half=localReview?4.2:5.7,focus=regionAt(c.pip);
   if(s.mode==='workbench'){target=WORKBENCH;half=2.1;focus='workshop';}
   else if(loafVisit){target={x:(SOL.x+c.bakery.rina.x)/2,z:(SOL.z+c.bakery.rina.z)/2};half=2.8;focus='workshop';}
   else if(construct||bridgeFocus(s)){target={x:-1.55,z:2.7};half=4.3;}
   else if(boatFocus){target=c.river.boat.position;half=3.6;}
   else if(roof){target=BAKERY_REPAIR.gap;half=4.1;}
   else if(bakeryFocus){target=bakeryWorking?{x:20.15,z:2.1}:{x:18.5,z:-.3};half=bakeryWorking?3.8:5.0;}
   else if(gview==='dock'){target={x:-7.7,z:-15.1};half=6.1;}
   else if(gview==='travel'){const traveller=s.action?.kind==='maraArrival'?mara:sol;target={x:traveller.rig.position.x,z:traveller.rig.position.z};half=4.5;}
   else if(gview==='garden'){target={x:7.2,z:10.1};half=4.1;}
   else if(atWorkshop(s)||focus==='workshop'){target={x:9,z:-13.3};half=5.6;}
   else if(focus==='dock'){target={x:-7.7,z:-15.1};half=6.1;}
   const inStudio=!c.started||s.panel==='studio'||reviewStudio;
   if(inStudio){target={x:1,z:0};half=3.2;}
   cameraDesired.set(target.x,inStudio?.5:s.mode==='workbench'?.85:loafVisit?.9:roof?3.4:bakeryFocus?(bakeryWorking?.9:2.55):gview==='dock'?2.7:(atWorkshop(s)||focus==='workshop')&&!overview?2.7:focus==='dock'?2.7:.5+(overview?0:terrainHeight(target)-.13),target.z);
   const pose=cameraControls.resolve({target:cameraDesired,half,offset:!inStudio&&s.mode==='workbench'?new T.Vector3(0,18,9):!inStudio&&loafVisit?new T.Vector3(12,14,6):!inStudio&&bakeryFocus&&!roof?new T.Vector3(14,16,10):new T.Vector3(7.5,13,19)},dt);
   overview=cameraControls.overview;const blend=immediate||c.reducedMotion?1:1-Math.exp(-8*Math.min(.1,dt)),orbit=new T.Spherical().setFromVector3(pose.offset);
   cameraLook.lerp(pose.target,blend);cameraHalf+=(Math.max(pose.half,pose.half*.95/aspect)-cameraHalf)*blend;
   cameraOrbit.theta+=Math.atan2(Math.sin(orbit.theta-cameraOrbit.theta),Math.cos(orbit.theta-cameraOrbit.theta))*blend;cameraOrbit.phi+=(orbit.phi-cameraOrbit.phi)*blend;cameraOrbit.radius+=(orbit.radius-cameraOrbit.radius)*blend;
   cameraOffset.setFromSpherical(cameraOrbit);camera.position.copy(cameraLook).add(cameraOffset);camera.lookAt(cameraLook);
   cameraControls.observe({target:cameraLook,offset:cameraOffset,half:cameraHalf/Math.max(1,.95/aspect)});
   camera.left=-cameraHalf*aspect;camera.right=cameraHalf*aspect;camera.top=cameraHalf;camera.bottom=-cameraHalf;camera.updateProjectionMatrix();camera.updateMatrixWorld();
   viewFrustum.setFromProjectionMatrix(viewProjection.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));
   sun.position.copy(cameraLook).add(new T.Vector3(-7,13,6));sun.target.position.copy(cameraLook);sun.target.updateMatrixWorld();
   metadata['cameraFocus']=cameraControls.inspecting?(overview?'overview':'inspection'):s.mode==='workbench'?'workbench':construct?'bridge':boatFocus?'seed-boat':roof?'bakery-roof':gview==='travel'?(s.action?.kind==='maraArrival'?'mara-arrival':'sol-arrival'):focus;
   metadata['cameraProjection']=JSON.stringify({projection:camera.projectionMatrix.elements,view:camera.matrixWorldInverse.elements});
  }
  function resize(){if(disposed||failed)return;const w=element.clientWidth,h=element.clientHeight;if(w<1||h<1)return;viewportWidth=w;viewportHeight=h;if(renderer.getPixelRatio()!==devicePixelRatio)renderer.setPixelRatio(devicePixelRatio);if(canvas.width!==Math.floor(w*devicePixelRatio)||canvas.height!==Math.floor(h*devicePixelRatio))renderer.setSize(w,h,false);updateCamera(store.getSnapshot(),true);metadata['display']=JSON.stringify({userAgent:navigator.userAgent,viewportCss:{width:innerWidth,height:innerHeight},sceneCss:{width:w,height:h},screenCss:{width:screen.width,height:screen.height,availableWidth:screen.availWidth,availableHeight:screen.availHeight},backingPixels:{width:canvas.width,height:canvas.height},devicePixelRatio,fullscreen:!!document.fullscreenElement,physicalDisplayPixels:'NOT_MEASURED'});}
  const safeResize=()=>{try{resize();}catch(error){fail(error);}};const observer=new ResizeObserver(safeResize);observer.observe(element);document.addEventListener('fullscreenchange',safeResize);window.addEventListener('resize',safeResize);document.addEventListener('visibilitychange',safeResize);partialCleanup.push(()=>{observer.disconnect();document.removeEventListener('fullscreenchange',safeResize);window.removeEventListener('resize',safeResize);document.removeEventListener('visibilitychange',safeResize);});resize();
  const ray=new T.Raycaster(),plane=new T.Plane(new T.Vector3(0,1,0),-.13),pointer=new T.Vector2();
  function pointerRay(e:PointerEvent){const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);}
  function groundPoint(e:PointerEvent,height?:number){
   pointerRay(e);
   if(height===undefined){
    const ground=ray.intersectObjects(landscape.navigationSurfaces,false)[0],deck=new T.Vector3();plane.constant=-BRIDGE_LEVELS.deck;
    if(ray.ray.intersectPlane(plane,deck)&&bridgeSurfaces(store.getSnapshot().chapter).some(surface=>pointInPolygon(deck,surface))&&(!ground||ray.ray.origin.distanceTo(deck)<ground.distance))return {x:deck.x,z:deck.z};
    if(ground)return {x:ground.point.x,z:ground.point.z};
   }
   plane.constant=-(height??.13);const p=new T.Vector3();return ray.ray.intersectPlane(plane,p)?{x:p.x,z:p.z}:null;
  }
  function isVisible(object:T.Object3D){let node:T.Object3D|null=object;while(node){if(!node.visible)return false;node=node.parent;}return true;}
  function handPoint(e:PointerEvent,s:ReturnType<GardenStore['getSnapshot']>,object:HandObject,height:number){
   if(bakeryVisual?.ready&&(object==='spareTile'||object==='crackedTile')&&s.mode==='bakery-repair'){
    pointerRay(e);bakeryVisual.root.updateWorldMatrix(true,true);
    const surface=ray.intersectObject(bakeryVisual.root,true).find(hit=>hit.object!==bakeryVisual!.proxy&&isVisible(hit.object));
    if(surface)return {x:surface.point.x,z:surface.point.z};
   }
   return groundPoint(e,height);
  }
  function handObject(target:unknown,s:ReturnType<GardenStore['getSnapshot']>,shift:boolean):HandObject|undefined{return target==='a'?'section:a':target==='b'?'section:b':target==='dough'?(s.chapter.bakery.stage==='mixed'&&!shift?'dough-cut':'dough'):typeof target==='string'?target as HandObject:undefined;}
  function hit(e:PointerEvent){pointerRay(e);for(const found of ray.intersectObjects([...workbench.pickables(),...pickables].filter(isVisible),true)){if(!isVisible(found.object))continue;
   // Once a character is visible, its loading capsule must not hide a loaf
   // or tile beside the real hand. Pick the loaded skin at those overlaps.
   if([mara,sol,bakery.rina].some(actor=>actor instanceof ModelActor&&actor.ready&&found.object===actor.pickProxy))continue;
   let obj:T.Object3D|null=found.object;while(obj){if(obj.userData['target'])return obj;obj=obj.parent;}}return null;}
  let drag:{id:number;object:HandObject;height:number;offset:Point}|null=null,pressed:T.Object3D|null=null,steering:number|null=null;
  let inspectionClick:{id:number;point:Point|null}|null=null;
  function hover(target:unknown){const name=typeof target==='string'?target:'';hoveredLabel=({rina:'bakery','rope-box':'materials',sprout:'lanterns',a:'a',b:'b'} as Record<string,string>)[name]??(name.startsWith('lantern:')?'lanterns':labels.has(name)?name:null);}
  function leave(){hoveredLabel=null;}
  let pendingSection:{id:number;object:HandObject;height:number;point:Point;anchor:Point;x:number;y:number}|null=null;
  let cardPointer:number|null=null;const releasedPointers=new Set<number>();
  function down(e:PointerEvent){
   releasedPointers.delete(e.pointerId);
   const s=store.getSnapshot();if(reviewStudio||e.button!==0||cardPointer!==null||drag||pendingSection||steering!==null||s.panel||s.action||!s.chapter.started)return;canvas.focus();pressed=hit(e);metadata['pointerTarget']=String(pressed?.userData['target']??'ground');
   hover(pressed?.userData['target']);if(cameraControls.inspecting){inspectionClick={id:e.pointerId,point:groundPoint(e)};cameraHeld=true;cameraControls.follow();}
   if(s.mode==='workbench'){
    const target=pressed?.userData['target'];if(typeof target==='string'&&target.startsWith('picture:')){store.send({type:'CARD_PICK',id:target.slice(8) as ObservationId});if(store.getSnapshot().cardGesture){cardPointer=e.pointerId;canvas.setPointerCapture(e.pointerId);e.preventDefault();}}return;
   }
   if(s.mode==='boat'){steering=e.pointerId;canvas.setPointerCapture(e.pointerId);const p=groundPoint(e,WATER_SURFACE_Y);if(p)store.send({type:'STEER',point:p});return;}
   const rect=canvas.getBoundingClientRect(),grip=bridgeHandles.pick(e.clientX-rect.left,e.clientY-rect.top);
   const object=grip??handObject(pressed?.userData['target'],s,e.shiftKey);if(grip)metadata['pointerTarget']=grip;
   // A native-keyboard preview can also be abandoned with the pointer. It
   // must never make a later click drag the previously selected material.
   if(s.gesture&&s.gesture.object!==object)store.send({type:'HAND_CANCEL'});
   if(!object||!availableHands(s).includes(object))return;
   const height=handPlane(s,object),p=handPoint(e,s,object,height);if(!p)return;const anchor=handAnchor(s,object),cut=object==='dough-cut',large=object.startsWith('section:'),preserveOffset=!grip&&(large||object.startsWith('post:'));
   // A click walks onto a deck. A deliberate drag lifts it. Without this
   // distinction an unsecured section could never be tested by walking.
   if(large){pendingSection={id:e.pointerId,object,height,point:p,anchor:grip?p:anchor,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);e.preventDefault();return;}
   store.send({type:'HAND_BEGIN',object,...(cut?{point:p}:{})});
   if(!store.getSnapshot().gesture)return;
   drag={id:e.pointerId,object,height,offset:preserveOffset?{x:anchor.x-p.x,z:anchor.z-p.z}:{x:0,z:0}};
   if(!preserveOffset)store.send({type:'HAND_MOVE',point:p});canvas.setPointerCapture(e.pointerId);e.preventDefault();
  }
  function move(e:PointerEvent){
   if(!drag&&!pendingSection&&steering===null&&cardPointer===null&&e.pointerType!=='touch')hover(hit(e)?.userData['target']);
   if(pendingSection?.id===e.pointerId){
    const pending=pendingSection;if(Math.hypot(e.clientX-pending.x,e.clientY-pending.y)<5)return;
    pendingSection=null;store.send({type:'HAND_BEGIN',object:pending.object});
    if(!store.getSnapshot().gesture)return;
    drag={id:e.pointerId,object:pending.object,height:pending.height,offset:{x:pending.anchor.x-pending.point.x,z:pending.anchor.z-pending.point.z}};
   }
   if(cardPointer===e.pointerId){const p=groundPoint(e,WORKBENCH.y+.02);if(p)store.send({type:'CARD_MOVE',point:p});return;}
   if(steering===e.pointerId){const p=groundPoint(e,WATER_SURFACE_Y);if(p)store.send({type:'STEER',point:p});return;}
   if(!drag||drag.id!==e.pointerId)return;const p=handPoint(e,store.getSnapshot(),drag.object,drag.height);if(p)store.send({type:'HAND_MOVE',point:{x:p.x+drag.offset.x,z:p.z+drag.offset.z}});
  }
  function up(e:PointerEvent){
   if(releasedPointers.delete(e.pointerId))return;
   const inspectedPoint=inspectionClick?.id===e.pointerId?inspectionClick.point:null;inspectionClick=null;cameraHeld=false;
   const s=store.getSnapshot();
   if(pendingSection){if(pendingSection.id!==e.pointerId)return;pendingSection=null;const p=groundPoint(e,BRIDGE_LEVELS.deck);pressed=null;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);if(p)store.send({type:'GO',point:p});return;}
   if(cardPointer!==null){if(cardPointer!==e.pointerId)return;move(e);store.send({type:'CARD_PLACE'});cardPointer=null;pressed=null;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);return;}
   if(s.mode==='workbench')return;
   if(drag&&drag.id!==e.pointerId||steering!==null&&steering!==e.pointerId)return;
   if(steering===e.pointerId){store.send({type:'STEER_STOP'});steering=null;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);pressed=null;return;}
   if(drag){move(e);store.send({type:'HAND_RELEASE'});drag=null;pressed=null;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);return;}
   if(reviewStudio||s.panel||s.action||!s.chapter.started)return;
   const target=pressed?.userData['target'];
   if(s.mode==='bakery-repair'){if(target==='tile-gap'||target==='tile-beside')store.send({type:'TILE_PREVIEW',position:target==='tile-gap'?'gap':'beside'});}
   else if(s.mode==='boat'){const p=groundPoint(e,WATER_SURFACE_Y);if(p)store.send({type:'STEER',point:p});}
   else if(typeof target==='string'&&target.startsWith('lantern:')||target==='sprout'||target==='mara'||target==='grandma'||target==='seedBoat'||target==='sol'||target==='lanterns'||target==='rina'||target==='spareTile')interact(target);
   else{const p=inspectedPoint??groundPoint(e);if(p)store.send({type:'GO',point:p});}pressed=null;
  }
  function releaseLocalPointer(id:number){
   releasedPointers.add(id);
   // Clear ownership before releasing capture: lostpointercapture may run
   // synchronously and must not cancel a subsequent native selection.
   if(pendingSection?.id===id)pendingSection=null;if(drag?.id===id)drag=null;
   if(cardPointer===id)cardPointer=null;if(steering===id)steering=null;if(inspectionClick?.id===id){inspectionClick=null;cameraHeld=false;}pressed=null;
   if(canvas.hasPointerCapture(id))canvas.releasePointerCapture(id);
  }
  function releaseAllPointers(){for(const id of new Set([pendingSection?.id,drag?.id,cardPointer,steering]))if(id!==undefined&&id!==null)releaseLocalPointer(id);}
  const unsubscribePointer=store.subscribe(()=>{
   const s=store.getSnapshot();
   if(s.background||s.viewLost||s.panel||s.action||!s.chapter.started){releaseAllPointers();return;}
   if(drag&&s.gesture?.object!==drag.object)releaseLocalPointer(drag.id);
   if(cardPointer!==null&&!s.cardGesture)releaseLocalPointer(cardPointer);
   if(steering!==null&&s.mode!=='boat')releaseLocalPointer(steering);
  });
  // A section press has no authoritative preview until it moves. Escape
  // must also release that pending pointer before the ordinary cancel handler.
  function cancelPendingKey(e:KeyboardEvent){
   const target=e.target as HTMLElement;if(target.closest('.garden-camera-controls')||target.matches('input,textarea,select,[contenteditable=true]'))return;
   if(e.key==='Escape')releaseAllPointers();
   if((e.key==='Enter'||e.key===' ')&&target.closest('button,summary,a,[role=menu]'))return;
   if(!store.getSnapshot().panel&&['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d','e','enter',' '].includes(e.key.toLowerCase()))cameraControls.follow();
  }
  partialCleanup.push(unsubscribePointer,releaseAllPointers);
  window.addEventListener('keydown',cancelPendingKey,true);partialCleanup.push(()=>window.removeEventListener('keydown',cancelPendingKey,true));
  function cancel(e:PointerEvent){if(e.type==='lostpointercapture'&&canvas.hasPointerCapture(e.pointerId))return;if(pendingSection?.id===e.pointerId){releaseLocalPointer(e.pointerId);return;}if(cardPointer!==null){if(cardPointer!==e.pointerId)return;releaseLocalPointer(e.pointerId);store.send({type:'CARD_CANCEL'});return;}if(!drag&&steering===null)return;if(drag&&drag.id!==e.pointerId||steering!==null&&steering!==e.pointerId)return;releaseLocalPointer(e.pointerId);store.send({type:'HAND_CANCEL'});store.send({type:'CANCEL'});}
  canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerleave',leave);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',cancel);canvas.addEventListener('lostpointercapture',cancel);partialCleanup.push(()=>{canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerleave',leave);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',cancel);canvas.removeEventListener('lostpointercapture',cancel);});
  function lost(e:Event){e.preventDefault();gpuTimer?.reset();status({phase:'recovering',location:reviewStudio?'studio':'village',cause:'WebGL context was lost'});store.send({type:'VIEW_LOST',lost:true});}canvas.addEventListener('webglcontextlost',lost);
  function restored(){try{readAdapterIdentity();gpuTimer?.reset();metadata['contextRecoveries']=String(Number(metadata['contextRecoveries']??0)+1);store.send({type:'VIEW_LOST',lost:false});lastDrawState=null;resize();}catch(error){fail(error);}}canvas.addEventListener('webglcontextrestored',restored);partialCleanup.push(()=>{canvas.removeEventListener('webglcontextlost',lost);canvas.removeEventListener('webglcontextrestored',restored);});
  let lastWorkbenchRevision=-1,last=performance.now(),lastPip={...store.getSnapshot().chapter.pip},frames=0,assetErrorReported=false,lastDraw=0,lastDrawState:unknown=null,lastAssetReadiness='',lastCameraProjection='',lastWidth=0,lastHeight=0,cadenceRoom='',cadenceStartedAt=performance.now(),cadenceFrameStart=0;const cadence:number[]=[];const activeCadence:number[]=[],gpuWait:number[]=[],drawSubmit:number[]=[];
  function resetPerformanceSample(){gpuTimer?.reset();cadence.length=activeCadence.length=gpuWait.length=drawSubmit.length=0;warmup=0;cadenceStartedAt=performance.now();cadenceFrameStart=frames;delete element.dataset['metrics'];delete values['metrics'];metadata['sampleReset']=String(cadenceStartedAt);}
  let diagnosticMaterial:T.MeshBasicMaterial|null=null,profileControls:HTMLDivElement|null=null;
  function setRenderDiagnostic(mode:string){diagnostic=mode;resetPerformanceSample();warmup=45;renderer.shadowMap.autoUpdate=mode!=='static-shadows';renderer.shadowMap.enabled=mode!=='no-shadows';if(mode==='unlit'&&!diagnosticMaterial){diagnosticMaterial=new T.MeshBasicMaterial({color:'#cccccc'});art.resources.add(diagnosticMaterial);}scene.overrideMaterial=mode==='unlit'?diagnosticMaterial:null;}
  if(import.meta.env['VITE_EQ_PROFILE']==='1'){
   Object.assign(window,{eqRenderProfile:setRenderDiagnostic});
   if(localReview){
    profileControls=document.createElement('div');profileControls.className='garden-profile-controls';
    const reset=document.createElement('button');reset.type='button';reset.className='garden-studio-review';reset.textContent='Reset performance sample';reset.onclick=resetPerformanceSample;
    const label=document.createElement('label');label.textContent='Rendering diagnostic ';const select=document.createElement('select');
    for(const [value,text]of [['normal','Normal artwork'],['no-shadows','No shadows (diagnostic)'],['unlit','Unlit (diagnostic)']]){const option=document.createElement('option');option.value=value!;option.textContent=text!;select.append(option);}
    select.onchange=()=>setRenderDiagnostic(select.value);label.append(select);profileControls.append(reset,label);controls.classList.add('is-profiling');controls.append(profileControls);
   }
  }
  const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
  const smooth=(t:number)=>{const v=Math.max(0,Math.min(1,t));return v*v*(3-2*v);};
  function limbMotion(character:SceneActor,walking:boolean,time:number){character.swing(walking,time);}
  const passengerPaths=passengers.map((_,i)=>{const landing={x:anchors.dock.boat.x-.95,z:anchors.dock.boat.z};return [anchors.dock.boat,landing,...findRoute(landing,DOCK_PASSENGER_EXITS[i]!)];});
  let arrivalId='',arrivalSol:Point[]=[],arrivalMara:Point[]=[];
  function followPath(character:SceneActor,points:readonly Point[],progress:number,time:number,reduced:boolean){
   if(!points.length)return;const lengths=points.slice(1).map((p,i)=>distance(points[i]!,p)),total=lengths.reduce((a,b)=>a+b,0);let remaining=Math.max(0,Math.min(1,progress))*total,at=points.at(-1)!;
   for(let i=0;i<lengths.length;i++){const length=lengths[i]!;if(!length)continue;if(remaining<=length){const p=points[i]!,q=points[i+1]!;at={x:lerp(p.x,q.x,remaining/length),z:lerp(p.z,q.z,remaining/length)};character.rig.rotation.y=Math.atan2(q.x-p.x,q.z-p.z);break;}remaining-=length;}
   character.rig.position.set(at.x,.13,at.z);limbMotion(character,progress>0&&progress<1&&!reduced,time);
  }
  function render(now:number){
   const frameStart=performance.now(),dt=now-last;last=now;let s=store.getSnapshot();
   if(!reviewStudio&&s.ready&&!s.background&&!s.viewLost&&(s.chapter.river.collection&&!s.panel||s.route.length||s.keys.length||s.action||s.bridgeWork||s.boatTarget||(s.boatSpeed??0)>0||s.playback&&!s.playback.paused&&s.playback.mode==='captions'))store.send({type:'TICK',ms:dt});
   s=store.getSnapshot();const c=s.chapter,action=s.action,t=action?Math.min(1,action.elapsed/action.duration):0,time=now*.001,moving=distance(c.pip,lastPip)>.0001;
   workbench.sync(s);cameraControls.available(!s.panel&&s.mode!=='mara-story',!s.gesture&&!s.cardGesture&&!s.bridgeWork);
   if(studioReviewButton)studioReviewButton.disabled=!reviewStudio&&!!(s.action||s.route.length||s.gesture||s.bridgeWork||s.panel||s.chapter.river.collection);
   const inAdventure=c.started&&s.panel!=='studio'&&!reviewStudio;adventure.visible=inAdventure;studio.visible=!inAdventure;
   const room=inAdventure?'village':'studio';if(room!==cadenceRoom){cadenceRoom=room;resetPerformanceSample();}
   const sceneDescription=inAdventure?'The river and Grandma’s garden. Use the named controls below or click the scene.':'Sparkfest studio. Jo and Loop are beside the storybook and presentation stage. Use the camera controls to inspect the room.';
   if(canvas.getAttribute('aria-label')!==sceneDescription)canvas.setAttribute('aria-label',sceneDescription);
   updateCamera(s,false,dt/1000);
   // Releasing a gesture does not end the activity. Keep the actual work
   // surfaces visible while Pip remains beside them, including the oven mouth.
   const travellingActor=action?.kind==='maraArrival'?mara:action?.kind==='solArrival'?sol:null;
   const activityPoints=travellingActor?[
    {x:travellingActor.rig.position.x,y:travellingActor.rig.position.y+.7,z:travellingActor.rig.position.z},
    {x:travellingActor.rig.position.x,y:travellingActor.rig.position.y+1.15,z:travellingActor.rig.position.z},
   ]:nearBakery(c)?[
    bakery.roofGap,
    {x:anchors.bakery.building.x+.49,y:1.89,z:anchors.bakery.building.z-1.05}, // chimney cap
    {x:anchors.bakery.building.x+.60,y:1.92,z:anchors.bakery.building.z-1.37}, // right rear roof tile
    {x:bakery.oven.position.x,y:.64,z:bakery.oven.position.z+.34}, // open front, not the oven body
    {...handAnchor(s,'dough'),y:handPlane(s,'dough')},
   ]:action?.kind==='thankSol'?[{...SOL,y:1},{...THANK_RINA,y:1},{x:(SOL.x+THANK_RINA.x)/2,y:.92,z:(SOL.z+THANK_RINA.z)/2}]:s.mode==='workbench'?[{...WORKBENCH,y:.92}]:distance(c.pip,PLANT)<8&&gatheringStarted(c)?[
    {...PLANT,y:1.4},{...GRANDMA,y:1},{...GATHER_SOL,y:1},{...GATHER_MARA,y:1},
    ...flowers.map(f=>({x:f.root.position.x,y:f.root.position.y+1.28*f.root.scale.x,z:f.root.position.z})),
   ]:distance(c.pip,PLANT)<2?[{...PLANT,y:.3}]:[];
   (finish??landscape).revealActivity(camera,c.pip,s.gesture?.point??(s.mode==='boat'?c.river.boat.position:undefined),c.reducedMotion,activityPoints);
   metadata['yieldingBuildings']='0';metadata['bridgeFocus']=String(bridgeFocus(s)&&!overview);
   pip.rig.visible=inAdventure;jo.rig.visible=!inAdventure;loop.visible=!inAdventure;
   pip.rig.position.set(c.pip.x,.13,c.pip.z);if(moving)pip.rig.rotation.y=Math.atan2(c.pip.x-lastPip.x,c.pip.z-lastPip.z);lastPip={...c.pip};limbMotion(pip,moving&&!c.reducedMotion,time);
   const gp=grandmaLocation(c),previousGrandma={x:grandma.rig.position.x,z:grandma.rig.position.z};grandma.rig.position.set(gp.x,.13,gp.z);if(distance(gp,previousGrandma)>.0001)grandma.rig.rotation.y=Math.atan2(gp.x-previousGrandma.x,gp.z-previousGrandma.z);else if(!c.river.collection)grandma.rig.rotation.y=.36;
   const mp=maraAtGarden(c)?GATHER_MARA:MARA,sp=solPosition(c);mara.rig.position.set(mp.x,.13,mp.z);sol.rig.position.set(sp.x,.13,sp.z);limbMotion(sol,false,time);limbMotion(mara,false,time);
   cushions.visible=c.story.records.grandma;for(const [i,record]of [[2,c.story.records.mara],[3,c.story.records.sol],[4,c.story.records.grandma]] as const){flowers[i]!.root.visible=true;flowers[i]!.petals.visible=true;void record;}
   solPage.visible=c.story.metSol;solPage.position.set(sol.rig.position.x+.18,.81,sol.rig.position.z+.13);
   grandmaCopy.visible=c.story.grandmaCopy!=='none';const cp=c.story.grandmaCopy==='pip'?c.pip:mp;grandmaCopy.position.set(cp.x-.14,.72,cp.z+.18);
   const vessel=passengerVesselPose(action?.kind==='dockService'?t/.22:action?.kind==='arrival'?t/.25:!gatheringStarted(c)&&c.mara.service==='waiting'?0:1);
   landingCues.visible=s.mode==='boat'||!!c.river.collection;
   passengerBoat.visible=c.started&&(!gatheringStarted(c)||c.story.plan?.time==='later');passengerBoat.position.set(vessel.x,-.1,vessel.z);passengerBoat.rotation.y=Math.PI/2+vessel.heading;gangway.visible=passengerBoat.visible&&action?.kind!=='arrival';passengers.forEach(p=>p.rig.visible=false);
   if(!gatheringStarted(c)){
    const service=action?.kind==='dockService'?t:c.mara.service==='served'?1:0;
    if(action?.kind==='dockService'){mara.rig.position.x=lerp(MARA.x,-5.65,smooth(t/.3));mara.rig.rotation.y=1.2;}
    gangway.visible=service>=.22;
    passengers.forEach((p,i)=>{const ashore=smooth((service-.28-i*.10)/.48);p.rig.visible=true;followPath(p,[passengerSeat(vessel,0,i?-.23:.30),...passengerPaths[i]!],ashore,time,c.reducedMotion);if(ashore===0)p.rig.rotation.y=vessel.heading;});
   }
   if(action?.kind==='arrival'){
    const later=c.story.plan?.time==='later';
    if(arrivalId!==action.id){arrivalId=action.id;arrivalSol=[SOL,...findRoute(SOL,GATHER_SOL)];arrivalMara=[MARA,...findRoute(MARA,GATHER_MARA,bridgeReady(c)?bridgeCenter(c):undefined)];}
    followPath(sol,arrivalSol,Math.min(1,t/.90),time,c.reducedMotion);if(later)followPath(mara,arrivalMara,Math.max(0,(t-.25)/.75),time,c.reducedMotion);
    gangway.visible=later&&t>=.25;
    passengers.forEach((p,i)=>{const ashore=smooth((t-.28-i*.035)/.22);followPath(p,[passengerSeat(vessel,0,i?-.23:.30),...passengerPaths[i]!],ashore,time,c.reducedMotion);if(ashore===0)p.rig.rotation.y=vessel.heading;p.rig.visible=later;});
    solPage.position.set(sol.rig.position.x+.18,.81,sol.rig.position.z+.13);
   }
   const operatorSeat=passengerSeat(vessel,.1,-.65);operator.rig.visible=passengerBoat.visible;operator.rig.position.set(operatorSeat.x,.12,operatorSeat.z);operator.rig.rotation.y=-1.4+vessel.heading;
   if(action?.kind==='copy')grandmaCopy.visible=true;
   if(action?.kind==='copy')grandmaCopy.position.set(lerp(GRANDMA.x-.18,c.pip.x-.14,smooth(t)),.72,lerp(GRANDMA.z,c.pip.z+.18,smooth(t)));
   if(action?.kind==='delivery')grandmaCopy.position.set(lerp(c.pip.x-.14,mp.x-.14,smooth(t)),.72,lerp(c.pip.z+.18,mp.z+.18,smooth(t)));
   const visibleSections=s.preview??c.sections;
   for(const key of ['a','b'] as const){const data=visibleSections[key],section=sections[key],floor=sectionRootHeight(data,key);section.root.position.set(data.x,floor+(s.preview?.[key]?.065:0),data.z);section.root.rotation.y=data.rotation;section.root.rotation.z=0;
    if(action?.kind==='collapse'){const end=collapseResult(c).sections[key],moving=Math.hypot(end.x-data.x,end.z-data.z)>1e-6||Math.abs(end.rotation-data.rotation)>1e-6,drift=smooth(t),sign=key==='a'?-1:1;section.root.position.set(lerp(data.x,end.x,drift),moving?lerp(floor,sectionRootHeight(end,key),drift)-.08*Math.sin(t*Math.PI):floor,lerp(data.z,end.z,drift));section.root.rotation.z=moving?sign*Math.sin(t*Math.PI)*.18:0;section.root.rotation.y=lerp(data.rotation,end.rotation,drift)+(moving?sign*Math.sin(t*Math.PI)*.25:0);}
   }
   if(action?.kind==='collapse'){const retreat=safeBridgeRetreat(c,action.from);pip.rig.position.set(lerp(action.from.x,retreat.x,smooth(t/.35)),.13,lerp(action.from.z,retreat.z,smooth(t/.35)));limbMotion(pip,t<.35&&!c.reducedMotion,time);}
   const mooring=ferryPosition(c),boatY=(boatModel?-.09:-.12)+(!c.reducedMotion&&!s.panel?Math.sin(time*1.8)*.009:0);const boatHeading=c.river.boat.heading??Math.PI/2;seedBoat.position.set(mooring.x,boatY,mooring.z);seedBoat.rotation.y=boatHeading+(localReview?-Math.PI/2:boatModel?0:Math.PI/2);
   seed.visible=c.seed!=='soil';let seedPos=c.seed==='bed'?new T.Vector3(PLANT.x,.27,PLANT.z):c.seed==='boat'?new T.Vector3(mooring.x,boatY+.17,mooring.z):c.seed==='pip'?new T.Vector3(c.pip.x,.75,c.pip.z-.15):new T.Vector3(GRANDMA.x-.22,.74,GRANDMA.z+.14);
   if(action?.kind==='receiveSeed')seedPos=new T.Vector3(mooring.x,boatY+.17,mooring.z).lerp(grandma.handPoint(),smooth(t));
   if(action?.kind==='loadSeed')seedPos.lerp(new T.Vector3(mooring.x,boatY+.17,mooring.z),smooth(t));
   if(action?.kind==='unloadSeed')seedPos.lerp(new T.Vector3(c.pip.x,.75,c.pip.z-.15),smooth(t));
   const preparing=s.gesture?.object==='soil'||action?.kind==='plant'&&!c.river.soilPrepared&&t<.42;
   preparedSoil.visible=c.river.soilPrepared||action?.kind==='plant'&&t>.30;
   trowel.visible=preparing;trowel.position.set(GRANDMA.x-.30,.40+Math.sin(t*Math.PI*6)*.06,GRANDMA.z-.06);trowel.rotation.z=-.45;
   if(action?.kind==='plant'){const progress=c.river.soilPrepared?t:(t-.42)/.58;seedPos.lerp(new T.Vector3(PLANT.x,.05,PLANT.z),smooth(progress));}
   if(s.gesture?.object==='seed')seedPos.set(s.gesture.point.x,handPlane(s,'seed'),s.gesture.point.z);
   seed.position.copy(seedPos);seed.rotation.z=.3;soilHandle.visible=c.seed!=='soil';

   planted.root.visible=!localReview&&c.seed==='soil';const bloom=c.bloomed?1:action?.kind==='bloom'?smooth(t):.12;planted.root.scale.setScalar(c.bloomed?1:Math.max(.2,bloom));planted.petals.rotation.y=bloom*.5;glow.intensity=c.bloomed?2.8:action?.kind==='bloom'?bloom:0;
   if(sproutModel){sproutModel.root.visible=c.seed==='soil'&&!c.bloomed&&(action?.kind!=='bloom'||t<.24);sproutModel.demand(inAdventure&&c.seed==='soil'&&!c.bloomed&&(inCamera(PLANT)||distance(c.pip,PLANT)<12));}
   if(budModel){budModel.root.visible=action?.kind==='bloom'&&t>=.22&&t<.68;budModel.root.scale.setScalar(.45+.55*Math.max(0,Math.min(1,(t-.22)/.46)));budModel.demand(inAdventure&&c.seed==='soil'&&!c.bloomed&&(inCamera(PLANT)||distance(c.pip,PLANT)<12));}
   for(const [i,lantern] of lanternIds.entries()){
    const record=lanternRecord(c,lantern),placing=lantern==='pip'&&action?.kind==='keepMemory',flower=i<5?flowers[i]!:planted,picture=memoryPictures[i]!;
    picture.show(placing?(action.moment==='planting'?'planting':gatheringPicture(c)):record.available?record.scene:null);
    picture.root.visible=picture.root.visible&&inAdventure&&(lantern!=='pip'||c.bloomed);
    const scale=placing?lerp(.65,.80,smooth(t)):lantern==='pip'?.80:.62;picture.root.scale.setScalar(scale);picture.root.quaternion.copy(camera.quaternion);
    const destination=new T.Vector3(flower.root.position.x,flower.root.position.y+1.28*flower.root.scale.x,flower.root.position.z);
    if(placing){picture.root.position.set(lerp(c.pip.x+.18,destination.x,smooth(t)),lerp(.85,destination.y,smooth(t)),lerp(c.pip.z+.18,destination.z,smooth(t)));pip.gesture(0,-.7);}
    else picture.root.position.copy(destination);
   }
   metadata['pipMemory']=JSON.stringify({record:c.story.records.pip,placing:action?.kind==='keepMemory',scene:c.story.records.pip?lanternRecord(c,'pip').scene:null,seed:c.seed});
   chosenMemory.show(c.story.phase==='moment'?(s.viewDrafts.memoryMoment==='planting'?'planting':gatheringPicture(c)):null);chosenMemory.root.visible=chosenMemory.root.visible&&inAdventure&&!s.panel&&!s.action;
   chosenMemory.root.position.set(s.gesture?.object==='memory'?s.gesture.point.x:c.pip.x+.2,1.0,s.gesture?.object==='memory'?s.gesture.point.z:c.pip.z+.18);chosenMemory.root.scale.setScalar(.65);chosenMemory.root.quaternion.copy(camera.quaternion);
   selection.visible=s.mode==='arrange';const selected=visibleSections[s.selection];selection.position.set(c.joined?(visibleSections.a.x+visibleSections.b.x)/2:selected.x,BRIDGE_LEVELS.deck+.035,selected.z);selection.scale.set(c.joined?2:1,1,1);selection.rotation.z=selected.rotation;
   destination.visible=!!s.route.length;const end=s.route.at(-1);if(end)destination.position.set(end.x,bridgeWalkingHeight(c,end)+.01,end.z);
   metadata['bridgeConstruction']=JSON.stringify(bridge.render(s,time));bridgeHandles.update(s,camera,viewportWidth,viewportHeight,bridgeFocus(s)&&!overview&&!reviewStudio&&!s.activity);
   landscape.frameWorkshop(atWorkshop(s));landscape.frameGathering(gatheringView(s)==='garden');const bakeryView=bakery.render(s,sol,time),solHead=sol.rig.localToWorld(new T.Vector3(0,1.04,0)).project(camera),solFeet=sol.rig.localToWorld(new T.Vector3(0,0,0)).project(camera);const gatheringData=gathering.render(s,{pip,mara,sol,grandma,passengers,operator,boat:passengerBoat,gangway,solPage,cushions},time);metadata['gathering']=JSON.stringify(gatheringData);const line=c.gathering.turn?turnLines(c)[c.gathering.turn.index]:null,teller=line?({Pip:pip,Mara:mara,Sol:sol,Grandma:grandma})[line.who]:null;setLabel('speaker',teller?{x:teller.rig.position.x,z:teller.rig.position.z}:c.pip,1.65,!!line&&!s.panel);labels.get('speaker')!.textContent=line?.who??'';
   gestureLine.visible=s.gesture?.object==='dough-cut';
   if(s.gesture){const g=s.gesture,previewObjects:Partial<Record<HandObject,T.Object3D>>={spareTile:bakery.tile,crackedTile:bakery.cracked,flour:bakery.flour,dough:bakery.dough,loaf:bakery.loaves[0]!},object=previewObjects[g.object];
    if(object){
     object.position.set(g.point.x,handPlane(s,g.object)-(g.object==='flour'?.38:0),g.point.z);object.rotation.y=g.rotation;
     if(localReview&&s.mode==='bakery-repair'&&(g.object==='spareTile'||g.object==='crackedTile')){
      const target=roofDropTarget(g.point),support=bakeryVisual?.supportHeight(object.position);
      object.position.y=target?BAKERY_REPAIR[target].y:(support??BAKERY_REPAIR.gap.y)+.04;object.rotation.set(...BAKERY_REPAIR.rotation);
     }
    }
    if(gestureLine.visible){const start=g.object==='dough-cut'?{x:g.point.x,z:g.minZ}:g.origin,end=g.object==='dough-cut'?{x:g.point.x,z:g.maxZ}:g.point,delta=new T.Vector3(end.x-start.x,0,end.z-start.z),length=delta.length();gestureLine.position.set(start.x,handDefinitions[g.object].plane+.035,start.z);gestureLine.scale.set(1,Math.max(.001,length)/.1,1);gestureLine.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),length?delta.normalize():new T.Vector3(0,1,0));}
   }
   metadata['handGesture']=s.gesture?JSON.stringify({object:s.gesture.object,point:s.gesture.point,rotation:s.gesture.rotation}):'';
   const pageFrom=c.page==='mara'?new T.Vector3(mara.rig.position.x+.18,.8,mara.rig.position.z+.13):c.page==='pip'?new T.Vector3(c.pip.x+.15,.55,c.pip.z+.15):new T.Vector3(grandma.rig.position.x-.2,.76,grandma.rig.position.z+.15);
   if(action?.kind==='page')pageFrom.lerp(new T.Vector3(c.pip.x+.15,.55,c.pip.z+.15),smooth(t));
   if(action?.kind==='report')pageFrom.lerp(new T.Vector3(grandma.rig.position.x-.2,.76,grandma.rig.position.z+.15),smooth(t));
   if(action?.kind==='maraTell'||action?.kind==='maraReturn'){const teller=c.story.phase==='mara'&&c.story.plan?.reader==='mara'?mara:pip;pageFrom.lerp(new T.Vector3(teller.rig.position.x+.20,.88,teller.rig.position.z+.17),smooth(t));teller.gesture(0,-.65);}
   if(c.page==='grandma'&&(c.gathering.pageComplete||action?.kind==='finishGrandmaPage'))pageFrom.set(grandma.rig.position.x+.26,.54,grandma.rig.position.z+.16);
   page.position.copy(pageFrom);page.rotation.set(-.15,.35,-.12);
   const showLabels=c.started&&!s.panel&&!s.background&&!s.gesture&&!action&&!atWorkshop(s)&&s.mode!=='workbench'&&gatheringView(s)==='none';const freeEnds=availableHands(s);maintenanceRopes.visible=ropeCount(c,'box')>0&&action?.kind!=='ropes';carriedRopes.visible=ropeCount(c,'pip')>0;carriedRopes.position.set(c.pip.x,.8,c.pip.z-.2);for(const [group,holder]of [[maintenanceRopes,'box'],[carriedRopes,'pip'],[ropeHandoff,'box']] as const)group.children.forEach((child,i)=>{const side=i===0?'north':'south',slot=i===0?'west':'east';child.visible=c.river.ropeLocations[slot]===holder&&(group===ropeHandoff||!freeEnds.includes(side==='north'?'rope:north':'rope:south'));});ropeHandoff.visible=action?.kind==='ropes';if(ropeHandoff.visible)ropeHandoff.position.set(lerp(-2.8,c.pip.x,smooth(t)),lerp(.45,.8,smooth(t)),lerp(1.75,c.pip.z-.2,smooth(t)));
   setLabel('materials',{x:-2.8,z:1.75},.9,showLabels&&!overview&&s.mode==='walk'&&!c.crossed);setLabel('landing',LANDING,.45,showLabels&&s.mode==='boat');setLabel('launch',LAUNCH,.45,showLabels&&s.mode==='boat');
   const firstBridgePart=firstPart(c),secondBridgePart=firstBridgePart==='a'?'b':'a',secondTargets=sectionPlacementTargets(c,secondBridgePart);const padPoints=[sectionSecured(c,firstBridgePart)?c.sections[firstBridgePart]:sectionPlacementTargets(c,firstBridgePart)[0]!.point,secondTargets[secondTargets.length===1?0:1]!.point];narrowPads.children.forEach((pad,i)=>pad.position.set(padPoints[i]!.x,BRIDGE_LEVELS.deck+.015,padPoints[i]!.z));
   narrowPads.visible=bridgeFocus(s)&&!overview;setLabel('mara',{x:mara.rig.position.x,z:mara.rig.position.z},2.1,showLabels&&s.mode==='walk'&&!nearBakery(c));setLabel('grandma',gp,2.15,showLabels&&s.mode==='walk'&&!nearBakery(c));setLabel('sections',bridgeCenter(c),.50,showLabels&&s.mode==='walk'&&!action&&!nearBakery(c)&&(overview||distance(c.pip,bridgeCenter(c))>3.2));setLabel('seedBoat',{x:seedBoat.position.x,z:seedBoat.position.z},.65,showLabels&&!overview&&s.mode==='walk'&&!action&&!nearBakery(c));setLabel('a',visibleSections.a,1.05,showLabels&&s.mode==='arrange');setLabel('b',visibleSections.b,1.05,showLabels&&s.mode==='arrange');
   setLabel('sol',overview?SOL:{x:sol.rig.position.x,z:sol.rig.position.z},2.05,showLabels&&s.mode==='walk'&&!nearBakery(c));setLabel('lanterns',{x:7.3,z:12.55},.7,showLabels&&s.mode==='walk'&&c.crossed&&!nearBakery(c));labels.get('sol')!.textContent=overview?'Sol’s workshop':gatheringStarted(c)?'Sol':solAtWorkshop(c)?'Sol’s workshop':'Sol · roof repair';
   setLabel('bakery',BAKERY_APPROACH,1.4,showLabels&&s.mode==='walk'&&!nearBakery(c));
   labels.get('a')!.classList.toggle('is-selected',s.selection==='a');labels.get('b')!.classList.toggle('is-selected',s.selection==='b');
   labels.get('sections')!.textContent=c.joined?'Footbridge':'Bridge pieces';
   landscape.currents.position.z=c.reducedMotion||s.panel?0:Math.sin(time*.5)*.05;
   landscape.update(time,c.reducedMotion||!!s.panel||s.background);
   metadata['landscape']=JSON.stringify({readyState:landscape.readyState,errors:landscape.errors});
   // Height is derived from the shared terrain; it never writes a second
   // position or story state. Every actor is placed at its authored pose above.
   for(const actor of [pip,mara,grandma,sol,bakery.rina,...passengers])if(actor.rig.visible)actor.rig.position.y+=bridgeWalkingHeight(c,actor.rig.position)-.13;
   if(localReview){
    if(sol instanceof ModelActor&&c.bakery.edition!=='earlier-chapter'&&(['gap','misplaced','sealed'].includes(c.bakery.stage)&&action?.kind!=='flourCheck'||action?.kind==='tileRemoval'&&t>.65)){const support=bakeryVisual?.supportHeight(sol.rig.position);if(support!==null&&support!==undefined)sol.rig.position.y=support;}
    // Apply supplied support heights after both ordinary dock service and the
    // gathering arrival adapter have placed their actors. The gangway's top
    // meets the supplied boat floor and dock rather than the old hull height.
    operator.rig.position.y=passengerVisual?.supportHeight(operator.rig.position)??.174;gangway.position.fromArray(PASSENGER_GANGWAY.position);
    for(const actor of [pip,mara,grandma,sol,bakery.rina,...passengers])if(actor.rig.visible){
     const point=actor.rig.position,contacts=[dockVisual?.supportHeight(point),landingVisual?.supportHeight(point),landscape.supportHeight(point),...shoreVisuals.map(shore=>shore.supportHeight(point)),...(passengers.includes(actor)?[passengerVisual?.supportHeight(point),gangway.visible?gangwayVisual?.supportHeight(point):null,gangway.visible?inboardVisual?.supportHeight(point):null]:[])].filter((h):h is number=>h!==null&&h!==undefined);
     if(contacts.length){const onLand=WORLD.banks.some(bank=>pointInPolygon(point,bank.polygon));actor.rig.position.y=Math.max(...contacts,onLand?terrainHeight(point):-Infinity);}
    }
   }
   const pipRise=bridgeWalkingHeight(c,c.pip)-.13;
   if(c.seed==='pip'&&!s.gesture&&!s.action)seed.position.y+=pipRise;
   if(c.page==='pip'&&!s.action)page.position.y+=pipRise;
   carriedRopes.position.y+=pipRise;
   pip.demand(inAdventure);grandma.demand(inAdventure&&(inCamera(grandma.rig.position)||c.pip.x>1.4&&distance(c.pip,GRANDMA)<11||s.mode==='boat'||!!c.river.collection));
   if(inAdventure&&c.pip.x>1.4&&distance(c.pip,GRANDMA)<14)void assets.prefetch(runtimeAssets.grandma).catch(()=>{/* Required demand reports any persistent failure through Restore view. */});
   boatModel?.demand(inAdventure&&(s.mode==='boat'||!!c.river.collection||['loadSeed','unloadSeed','receiveSeed'].includes(action?.kind??'')||s.gesture?.object==='seed'&&!c.crossed||inCamera(mooring)||distance(c.pip,mooring)<12));
   flowerModel?.demand(inAdventure&&(inCamera(PLANT)||['plant','bloom','keepMemory'].includes(action?.kind??'')||['seed','soil','memory'].includes(s.gesture?.object??'')&&c.crossed||distance(c.pip,PLANT)<12));
   if(flowerModel){flowerModel.root.position.copy(planted.root.position);flowerModel.root.position.y=soilHandle.position.y+.0125;flowerModel.root.quaternion.copy(planted.root.quaternion);flowerModel.root.scale.copy(planted.root.scale);flowerModel.root.visible=c.seed==='soil'&&(!sproutModel||c.bloomed||action?.kind==='bloom'&&t>=.65);if(flowerModel.ready&&flowerModel.root.visible)planted.root.visible=false;}
   const frozen=!!s.panel||s.background||s.viewLost;
   const bridgeHandling=!!s.bridgeWork||!!s.gesture&&(s.gesture.object.startsWith('post:')||s.gesture.object.startsWith('rope:'));
   const gardenWork=localReview&&(action?.kind==='plant'||s.gesture?.object==='soil');
   if(gardenWork){const engage=action?smooth(t/.18)*smooth((1-t)/.14):Math.min(1,(s.gesture?.travel??0)/.2);grandma.rig.position.x=lerp(gp.x,PLANT.x-.80,engage);grandma.rig.position.z=lerp(gp.z,PLANT.z+.09,engage);grandma.rig.rotation.y=Math.PI/2;}
   if(bridgeHandling&&!moving){const point=s.bridgeWork?.point??s.gesture?.point;if(point)pip.rig.rotation.y=Math.atan2(point.x-c.pip.x,point.z-c.pip.z);}
   pip.update(dt/1000,{carrying:c.seed==='pip'||c.bakery.tile==='pip'||c.page==='pip'||action?.kind==='tilePickup'||c.story.phase==='moment'||ropeCount(c,'pip')>0||bridgeHandling,paused:frozen,reducedMotion:c.reducedMotion,gait:pipLocomotion(c.pip).gait,...(s.bridgeWork?{action:{kind:s.bridgeWork.kind,progress:s.bridgeWork.elapsed/s.bridgeWork.duration}}:{})});
   grandma.update(dt/1000,{carrying:c.seed==='grandma'||c.page==='grandma'||action?.kind==='bringCushions'||action?.kind==='receiveSeed',paused:frozen,reducedMotion:c.reducedMotion,...(gardenWork?{action:{kind:'plant',progress:action?t:.5}}:localReview&&action&&['receiveSeed','bringCushions','copy','report'].includes(action.kind)?{action:{kind:action.kind==='receiveSeed'?'seed':action.kind==='bringCushions'?'cushion':'page',progress:t}}:{})});
   for(const actor of otherActors){
    const isStudio=actor===jo,near=distance({x:actor.rig.position.x,z:actor.rig.position.z},c.pip)<11;
    actor.demand(actor.rig.visible&&(isStudio?!inAdventure:inAdventure&&(inCamera(actor.rig.position)||near)));
    const kind=actor===bakery.rina?({mixDough:'mix',shapeLoaves:'divide',bakeryWelcome:'sack',flourCheck:'sack',bakeBread:'bread',bakeUnshaped:'bread',takeLoaf:'bread'} as Record<string,string>)[action?.kind??'']:actor===sol?({tileDelivery:'tile',tilePlacement:'roof',tileRemoval:'tile',flourCheck:'tool'} as Record<string,string>)[action?.kind??'']:actor===mara&&action&&['maraTell','maraReturn','delivery'].includes(action.kind)?'page':undefined;
    const climbing=actor===sol&&(action?.kind==='tileRemoval'&&t>=.25&&t<.75||action?.kind==='flourCheck'&&t<.28),progress=action?.kind==='tileRemoval'?(t-.25)/.5:1-t/.28;
    const carrying=!!kind||actor===sol&&(c.bakery.tile==='sol'||c.bakery.loaf==='sol'||action?.kind==='thankSol')||actor===bakery.rina&&c.bakery.loaf==='rina'||actor===mara&&(c.page==='mara'||c.story.grandmaCopy==='mara');
    const passengerIndex=passengers.indexOf(actor),seat=passengerSeat({x:passengerBoat.position.x,z:passengerBoat.position.z,heading:passengerBoat.rotation.y-Math.PI/2},0,passengerIndex?-.23:.30);
    const standingOnMovingSupport=actor===operator||passengerIndex>=0&&distance(actor.rig.position,seat)<.02;
    actor.update(dt/1000,{carrying,paused:frozen,reducedMotion:c.reducedMotion,standingOnMovingSupport,...(climbing?{action:{kind:'climb',progress}}:kind?{action:{kind,progress:t}}:{})});
   }
   if(gardenWork&&(!action||t>.2&&t<.84)){const contact=new T.Vector3(PLANT.x-.27,.27,PLANT.z);metadata['plantHandError']=String(grandma.reachHand(contact));if(trowel.visible){trowel.position.copy(grandma.handPoint()).add(new T.Vector3(-.02,-.035,0));trowel.rotation.set(0,Math.PI/2,-.35);}}
   review?.update(s,inAdventure,camera,activityPoints,overview);
   // Two aligned inner sockets share the same two supports. Keep one complete
   // socket at each centre, and restore both halves' sockets when separated.
   for(const id of ['a','b'] as const){const prop=deckVisuals[id];if(prop?.ready){const hideCenter=sectionsMeet(c)&&id!==firstPart(c);for(const name of ['socket-right-negative','socket-left-negative']){const socket=prop.root.getObjectByName(name);if(socket)socket.visible=!hideCenter;}}}
   metadata['foregroundSight']=JSON.stringify(review?.sight??[]);
   reviewBridge?.update(s,bridge,inAdventure,camera);
   metadata['reviewStudio']=String(reviewStudio);
   if(!inAdventure){for(const label of labels.values())label.hidden=true;for(const line of leaders.values())line.hidden=true;}
   // Final world-space hand sockets follow the authored pose. A single seed
   // moves between those sockets, the boat and the bed; state alone owns it.
   const pipPalm=pip.handPoint(),grandmaPalm=grandma.handPoint(),pipSeed=pip.handPoint(undefined,.04),grandmaSeed=grandma.handPoint(undefined,.04),backpack=pip.attachmentPoint('backpack');
   if(s.gesture?.object!=='seed'){
    const cradle=boatModel?.anchor('seed-cradle',.04)??new T.Vector3(mooring.x,boatY+.17,mooring.z);
    if(action?.kind==='loadSeed')seed.position.copy(pipSeed).lerp(cradle,smooth(t));
    else if(action?.kind==='unloadSeed')seed.position.copy(cradle).lerp(pipSeed,smooth(t));
    else if(action?.kind==='receiveSeed')seed.position.copy(cradle).lerp(grandmaSeed,smooth(t));
    else if(action?.kind==='plant')seed.position.copy(c.seed==='pip'?pipSeed:c.seed==='grandma'?grandmaSeed:new T.Vector3(PLANT.x,.27,PLANT.z)).lerp(new T.Vector3(PLANT.x,.05,PLANT.z),smooth(c.river.soilPrepared?t:(t-.42)/.58));
    else if(c.seed==='pip')seed.position.copy(pipSeed);else if(c.seed==='grandma')seed.position.copy(grandmaSeed);else if(c.seed==='boat')seed.position.copy(cradle);
   }
   const pageGrip=new T.Vector3(0,.025,.015);
   const maraPalm=mara instanceof ModelActor?mara.handPoint():new T.Vector3(mara.rig.position.x+.18,.8,mara.rig.position.z+.13);
   if(action?.kind==='page')page.position.copy(maraPalm).lerp(pipPalm.clone().add(pageGrip),smooth(t));
   else if(action?.kind==='report')page.position.copy(pipPalm.clone().add(pageGrip)).lerp(grandmaPalm.clone().add(pageGrip),smooth(t));
   else if(c.page==='pip')page.position.copy(pipPalm).add(pageGrip);else if(c.page==='grandma')page.position.copy(grandmaPalm).add(pageGrip);else if(localReview&&c.page==='mara')page.position.copy(maraPalm).add(pageGrip);
   // Tile/climb poses retain their original bones and gait. Keep the palms in
   // front of the apron with bounded arm rotation, without stretching limbs.
   if(localReview&&sol instanceof ModelActor&&action&&(c.bakery.tile==='sol'&&action.kind==='tileRemoval'||action.kind==='tileDelivery')){
    for(const side of ['right','left'] as const){const target=(side==='right'?sol.handPoint():sol.attachmentPoint('leftHand')).sub(sol.rig.position).applyAxisAngle(new T.Vector3(0,1,0),-sol.facingYaw);target.z=Math.max(target.z,.25);target.applyAxisAngle(new T.Vector3(0,1,0),sol.facingYaw).add(sol.rig.position);for(let i=0;i<3;i++)sol.reachHand(target,side);}
   }
   const loafGrips={sol:new T.Vector3(-.07166782633786939,.008644310320023278,-.00005522603767779406),rina:new T.Vector3(.07135468909129253,.008381729566331132,.000747414671057941)};
   const loafMeeting=new T.Vector3((SOL.x+THANK_RINA.x)/2,.92,(SOL.z+THANK_RINA.z)/2),loafReach=t<.72?smooth((t-.30)/.12):1-smooth((t-.72)/.28);
   metadata['loafHandContact']='';
   if(localReview&&action?.kind==='thankSol'&&sol instanceof ModelActor&&bakery.rina instanceof ModelActor){
    for(const [actor,grip]of [[sol,loafGrips.sol],[bakery.rina,loafGrips.rina]] as const){const target=actor.handPoint().lerp(loafMeeting.clone().add(grip),loafReach);for(let i=0;i<3;i++)actor.reachHand(target);}
   }
   const solPalm=sol instanceof ModelActor?sol.handPoint():new T.Vector3(sol.rig.position.x+.17,.98,sol.rig.position.z+.13);
   if(localReview&&s.gesture?.object!=='spareTile'){
    const carry=(palm:T.Vector3,yaw:number)=>{const rotation=new T.Euler(0,yaw,0);return {position:palm.clone().sub(tileCarryGripOffset(rotation)),rotation:new T.Quaternion().setFromEuler(rotation)};};
    const from=carry(pipPalm,pip.facingYaw),to=carry(solPalm,sol instanceof ModelActor?sol.facingYaw:sol.rig.rotation.y);
    if(action?.kind==='tilePickup'){bakery.tile.position.set(TILE_SHELF.x,.60,TILE_SHELF.z).lerp(from.position,smooth(t));bakery.tile.quaternion.identity().slerp(from.rotation,smooth(t));}
    else if(action?.kind==='tileDelivery'){bakery.tile.position.copy(from.position).lerp(to.position,smooth(t));bakery.tile.quaternion.copy(from.rotation).slerp(to.rotation,smooth(t));}
    else if(c.bakery.tile==='pip'){bakery.tile.position.copy(from.position);bakery.tile.quaternion.copy(from.rotation);}
    else if(c.bakery.tile==='sol'&&action?.kind!=='tilePlacement'){bakery.tile.position.copy(to.position);bakery.tile.quaternion.copy(to.rotation);}
   }else if(!localReview){
    if(action?.kind==='tilePickup')bakery.tile.position.set(TILE_SHELF.x,.88,TILE_SHELF.z).lerp(pipPalm.clone().add(new T.Vector3(0,.025,0)),smooth(t));
    else if(action?.kind==='tileDelivery')bakery.tile.position.copy(pipPalm).lerp(solPalm,smooth(t));
    else if(c.bakery.tile==='pip'&&s.gesture?.object!=='spareTile')bakery.tile.position.copy(pipPalm).add(new T.Vector3(0,.025,0));
   }
   metadata['roofHandError']='';
   if(localReview&&action?.kind==='tilePlacement'){
    const destination=action.placement==='gap'?bakery.roofGap:bakery.roofBeside,roofRotation=bakery.tile.quaternion.clone(),grip=tileGripOffset(bakery.tile.rotation);
    if(t<.30&&c.bakery.tile==='sol'){const rotation=new T.Euler(0,sol instanceof ModelActor?sol.facingYaw:sol.rig.rotation.y,0);bakery.tile.quaternion.setFromEuler(rotation).slerp(roofRotation,smooth(t/.30));const carryGrip=tileCarryGripOffset(new T.Euler()).lerp(tileGripOffset(new T.Euler()),smooth(t/.30)).applyQuaternion(bakery.tile.quaternion);bakery.tile.position.copy(solPalm).sub(carryGrip);}
    else bakery.tile.position.copy(solPalm).sub(grip).lerp(roofTileContact(destination),roofPlacementProgress(t));
    if(sol instanceof ModelActor&&t>.30&&t<.78){const target=bakery.tile.position.clone().add(grip);for(let i=0;i<3;i++)metadata['roofHandError']=String(sol.reachHand(target));}
   }
   metadata['tileHandContact']='null';
   if(localReview&&(c.bakery.tile==='pip'||c.bakery.tile==='sol')&&s.gesture?.object!=='spareTile'&&action?.kind!=='tilePickup'&&action?.kind!=='tileDelivery'&&action?.kind!=='tilePlacement')metadata['tileHandContact']=JSON.stringify({owner:c.bakery.tile,palm:(c.bakery.tile==='pip'?pipPalm:solPalm).toArray(),grip:bakery.tile.position.clone().add(tileCarryGripOffset(bakery.tile.rotation)).toArray(),yaw:bakery.tile.rotation.y});
   if(localReview&&bakery.rina instanceof ModelActor){
    if(c.bakery.loaf==='rina'&&!action&&s.gesture?.object!=='loaf'){
     const target=bakery.rina.handPoint().sub(bakery.rina.rig.position).applyAxisAngle(new T.Vector3(0,1,0),-bakery.rina.facingYaw);target.z=Math.max(.36,target.z);target.applyAxisAngle(new T.Vector3(0,1,0),bakery.rina.facingYaw).add(bakery.rina.rig.position);for(let i=0;i<3;i++)bakery.rina.reachHand(target);
    }
    const palm=bakery.rina.handPoint();
    if(c.bakery.loaf==='rina'&&s.gesture?.object!=='loaf')bakery.loaves[0]!.position.copy(palm).sub(loafGrips.rina);
    if(action?.kind==='takeLoaf'&&t>=.4)bakery.loaves[0]!.position.lerp(palm,smooth((t-.4)/.2));
    if(action?.kind==='thankSol'){
     const loaf=bakery.loaves[0]!;loaf.position.copy(t<.72?palm:solPalm).sub((t<.72?loafGrips.rina:loafGrips.sol).clone().multiplyScalar(loafReach));
     metadata['loafHandContact']=JSON.stringify({progress:t,rina:palm.toArray(),sol:solPalm.toArray(),rinaGrip:loaf.position.clone().add(loafGrips.rina).toArray(),solGrip:loaf.position.clone().add(loafGrips.sol).toArray()});
    }
    if(c.bakery.loaf==='sol')bakery.loaves[0]!.position.copy(solPalm);
    const {carriedLoaf,carriedUneven,tripProgress}=bakeryView.handling;
    if(carriedLoaf!==null){const loaf=bakery.loaves[carriedLoaf]!;loaf.position.lerp(palm,smooth((tripProgress-.15)/.07));if(tripProgress>=.55){const hearth=bakeryOvenPoint(carriedLoaf===0?.38:.02,carriedLoaf===0?0:carriedLoaf===1?-.12:.12,carriedLoaf===0?.70:.718);loaf.position.copy(palm).lerp(new T.Vector3(hearth.x,hearth.y,hearth.z),smooth((tripProgress-.55)/.1));}}
    if(carriedUneven)bakery.uneven.position.copy(palm);
    if(action&&['mixDough','shapeLoaves'].includes(action.kind)&&t>.2&&t<.8){const contact=bakery.dough.position.clone().add(new T.Vector3(0,.04,0));metadata['doughHandError']=String(bakery.rina.reachHand(contact));}
   }
   if(localReview&&bakery.rina instanceof ModelActor&&action?.kind==='bakeryWelcome'){
    const origin=new T.Vector3(bakery.threatenedFlour.x,bakery.threatenedFlour.y,bakery.threatenedFlour.z),palm=bakery.rina.handPoint().add(new T.Vector3(0,-.28,0)),dry=new T.Vector3(BAKERY_WORK.dryFlour.x,BAKERY_WORK.dryFlour.y,BAKERY_WORK.dryFlour.z);
    if(t<.3)bakery.flour.position.copy(origin);else if(t<.45)bakery.flour.position.copy(origin).lerp(palm,smooth((t-.3)/.15));else if(t<.8)bakery.flour.position.copy(palm);else if(t<.9)bakery.flour.position.copy(palm).lerp(dry,smooth((t-.8)/.1));else bakery.flour.position.copy(dry);
    if(t>=.3&&t<.9)metadata['flourHandError']=String(bakery.rina.reachHand(bakery.flour.position.clone().add(new T.Vector3(0,.28,0))));
   }
   if(localReview&&solPage.visible&&sol instanceof ModelActor)solPage.position.copy(sol.attachmentPoint('leftHand'));
   if(carriedRopes.visible)carriedRopes.position.copy(c.seed==='pip'||c.page==='pip'||c.bakery.tile==='pip'?backpack:pipPalm).add(new T.Vector3(.03,-.035,-.035));
   page.visible=page.visible&&(!!action||!(c.page==='pip'&&(c.seed==='pip'||c.bakery.tile==='pip')||c.page==='grandma'&&c.seed==='grandma'));
   if(action?.kind==='ropes')ropeHandoff.position.set(-2.8,terrainHeight(anchors.crossing.materials)+.32,1.75).lerp(pipPalm,smooth(t));
   if(action?.kind==='copy')grandmaCopy.position.copy(grandmaPalm).lerp(pipPalm,smooth(t));
   else if(action?.kind==='delivery')grandmaCopy.position.copy(pipPalm).lerp(localReview?maraPalm:new T.Vector3(mp.x-.14,.72,mp.z+.18),smooth(t));
   else if(c.story.grandmaCopy==='pip')grandmaCopy.position.copy(pipPalm).add(pageGrip);
   else if(localReview&&c.story.grandmaCopy==='mara')grandmaCopy.position.copy(maraPalm).add(pageGrip);
   if(gathering.carriedCushions.visible){
    const carry=grandmaPalm.clone().add(new T.Vector3(0,.045,0));
    if(localReview&&action?.kind==='bringCushions'){
     const reach=Math.max(0,Math.min(1,Number(gathering.carriedCushions.userData['retrievalProgress']??1)));
     const source=gathering.storageBox.position.clone().add(new T.Vector3(0,.32,0));
     gathering.carriedCushions.position.copy(source).lerp(carry,smooth(reach));
     if(reach<1)for(let i=0;i<3;i++)grandma.reachHand(gathering.carriedCushions.position.clone().add(new T.Vector3(0,.04,0)));
    }else gathering.carriedCushions.position.copy(carry);
   }
   if(c.page==='grandma'&&gathering.carriedCushions.visible){page.position.copy(grandmaPalm).add(new T.Vector3(0,.23,0));page.rotation.set(-Math.PI/2,0,0);}
   if(gathering.manuscript.visible)gathering.manuscript.position.copy(grandmaPalm).add(pageGrip);
   if(chosenMemory instanceof ReviewLanternPicture&&chosenMemory.root.visible&&s.gesture?.object!=='memory')chosenMemory.root.position.copy(chosenMemory.handPosition(pipPalm));
   const placedPicture=memoryPictures[5];
   if(placedPicture instanceof ReviewLanternPicture&&action?.kind==='keepMemory'){
    const destination=new T.Vector3(planted.root.position.x,planted.root.position.y+1.28*planted.root.scale.x,planted.root.position.z);
    placedPicture.root.position.copy(placedPicture.handPosition(pipPalm)).lerp(destination,smooth(t));
   }
   if(chosenMemory instanceof ReviewLanternPicture){chosenMemory.root.updateWorldMatrix(true,false);metadata['memoryHand']=JSON.stringify({visible:chosenMemory.root.visible,dragged:s.gesture?.object==='memory',palm:pipPalm.toArray(),grip:chosenMemory.root.localToWorld(chosenMemory.grip.clone()).toArray()});}
   metadata['handContact']=JSON.stringify({seed:c.seed,seedPosition:seed.position.toArray(),pip:pipSeed.toArray(),grandma:grandmaSeed.toArray()});
   metadata['bakery']=JSON.stringify({...bakeryView,flour:{x:bakery.flour.position.x,y:bakery.flour.position.y,z:bakery.flour.position.z},tile:{x:bakery.tile.position.x,y:bakery.tile.position.y,z:bakery.tile.position.z},loaves:bakery.loaves.map(loaf=>({x:loaf.position.x,y:loaf.position.y,z:loaf.position.z})),solScreen:{head:{x:solHead.x,y:solHead.y},feet:{x:solFeet.x,y:solFeet.y}}});
   metadata['maraPage']=JSON.stringify({holder:c.page,x:page.position.x,y:page.position.y,z:page.position.z,holderX:(c.page==='mara'?mara:c.page==='pip'?pip:grandma).rig.position.x,holderZ:(c.page==='mara'?mara:c.page==='pip'?pip:grandma).rig.position.z,palm:(c.page==='pip'?pipPalm:grandmaPalm).toArray(),visible:page.visible});
   seedProxy.visible=seed.visible;seedProxy.position.copy(seed.position);
   for(const picture of reviewPictures)picture.update(inAdventure&&picture.root.visible&&(overview||inCamera(picture.root.position,.9)));
   metadata['memoryAssets']=JSON.stringify(reviewPictures.map(picture=>picture.state));
   metadata['bridgeAssets']=reviewBridge?.readiness??'legacy';
   metadata['boatMotion']=JSON.stringify({target:s.boatTarget,speed:s.boatSpeed??0,heading:c.river.boat.heading??Math.PI/2});
   const arrivalActor=action?.kind==='maraArrival'?mara:action?.kind==='solArrival'?sol:null;
   metadata['arrivalView']=arrivalActor?JSON.stringify({kind:action!.kind,progress:t,ready:arrivalActor instanceof ModelActor?arrivalActor.ready:true,world:arrivalActor.rig.position.toArray(),feet:arrivalActor.rig.position.clone().project(camera).toArray(),head:arrivalActor.rig.localToWorld(new T.Vector3(0,1.45,0)).project(camera).toArray()}):'';
   const assetError=(inAdventure?landscape.errors[0]:undefined)??pip.activeError??grandma.activeError??boatModel?.activeError??flowerModel?.activeError??sproutModel?.activeError??budModel?.activeError??otherActors.find(a=>a.activeError)?.activeError??review?.errors[0]??reviewBridge?.error??reviewPictures.find(picture=>picture.error)?.error;
   if(!assetErrorReported&&assetError){assetErrorReported=true;fail(new Error(assetError));}
   metadata['characterAssets']=JSON.stringify({profile:localReview?'local-review':'production',pip:pip.ready?(localReview?'p2-review':'approved-r2-feet'):'loading',grandma:grandma.ready?(localReview?'p2-review':'approved-r2-feet'):'unloaded',cast:otherActors.map(a=>({id:a.definition.id,ready:a.ready})),objects:review?.loaded,pending:assets.library.pendingSources,sources:assets.library.sourceBindings,errors:[pip.error,grandma.error,...(review?.errors??[])].filter(Boolean)});
   const requiredModels=[pip,grandma,...otherActors,boatModel,flowerModel,sproutModel,budModel].filter(model=>model?.required);
   const prepared=requiredModels.every(model=>model!.ready)&&(!inAdventure||landscape.readyState==='ready:ready')&&(review?.coverage.pending??0)===0&&!reviewBridge?.pending&&!reviewPictures.some(picture=>picture.pending);
   if(!failed&&!s.viewLost)status({phase:prepared?'ready':'loading',location:inAdventure?'village':'studio'});
   // A completed asynchronous load must paint once even with reduced motion.
   const assetReadiness=[landscape.readyState,pip.ready,grandma.ready,boatModel?.ready,flowerModel?.ready,sproutModel?.ready,budModel?.ready,...otherActors.map(a=>a.ready),review?.readiness,reviewBridge?.readiness,...reviewPictures.map(picture=>picture.ready)].join(',');
   const active=lastCameraProjection!==metadata['cameraProjection']||moving||!!c.river.collection||!!s.action||!!s.bridgeWork||!!s.cardGesture||!!s.gesture||!!s.preview||!!s.boatTarget||(s.boatSpeed??0)>0||!!s.keys.length,changed=lastWorkbenchRevision!==workbench.revision||lastDrawState!==s||lastAssetReadiness!==assetReadiness||lastWidth!==canvas.width||lastHeight!==canvas.height;
   if(!failed&&!s.viewLost&&!document.hidden&&element.clientWidth>0&&element.clientHeight>0&&(active||changed||(!s.panel&&!s.background&&!c.reducedMotion&&now-lastDraw>=50))){const start=performance.now();if(diagnostic!=='no-scene'){gpuTimer?.begin();try{renderer.render(scene,camera);}finally{gpuTimer?.end();}}const duration=performance.now()-start;
    // Explicit diagnostic only: submission time is not GPU completion time.
    // finish changes scheduling, so these samples cannot qualify production.
    if(import.meta.env['VITE_EQ_PROFILE']==='1'&&diagnostic==='gpu-finish'){const waitStart=performance.now();renderer.getContext().finish();if(!warmup){gpuWait.push(performance.now()-waitStart);drawSubmit.push(duration);if(gpuWait.length>600){gpuWait.shift();drawSubmit.shift();}}}
    lastDraw=now;lastCameraProjection=metadata['cameraProjection']??'';lastDrawState=s;lastAssetReadiness=assetReadiness;lastWorkbenchRevision=workbench.revision;metadata['workbenchPictures']=String(workbench.loaded);lastWidth=canvas.width;lastHeight=canvas.height;if(warmup>0)warmup--;if(dt>0&&!warmup){cadence.push(dt);if(active)activeCadence.push(dt);if(cadence.length>600)cadence.shift();if(activeCadence.length>600)activeCadence.shift();}frames++;
    metadata['renderedFrame']=String(frames);metadata['renderedWidth']=String(canvas.width);metadata['renderedHeight']=String(canvas.height);metadata['renderedView']=s.panel??s.mode;
    if(frames%30===0){const sorted=[...(activeCadence.length?activeCadence:cadence)].sort((a,b)=>a-b);if(import.meta.env['VITE_EQ_PROFILE']==='1'){const gl=renderer.getContext(),waits=[...gpuWait].sort((a,b)=>a-b),submits=[...drawSubmit].sort((a,b)=>a-b);metadata['gpuTiming']=JSON.stringify({mode:diagnostic,samples:gpuWait.length,waitMedian:waits[Math.floor(waits.length*.5)]??null,waitP95:waits[Math.floor(waits.length*.95)]??null,submitP95:submits[Math.floor(submits.length*.95)]??null,msaa:gl.getParameter(gl.SAMPLES),timerQuery:!!gl.getExtension('EXT_disjoint_timer_query_webgl2')});}let geometryCpuBytes=0;for(const resource of art.resources)if(resource instanceof T.BufferGeometry){for(const attribute of Object.values(resource.attributes))if(attribute instanceof T.BufferAttribute)geometryCpuBytes+=attribute.array.byteLength;geometryCpuBytes+=resource.index?.array.byteLength??0;}
     const scenery=review?.coverage,instanceAllocationBytes=(scenery?.instanceAllocationBytes??0)+reviewPictures.reduce((sum,picture)=>sum+picture.instanceAllocationBytes,0),imported=assets.library.allocations(),local=resourceAllocation([...art.resources,...reviewPictures.flatMap(p=>p.resources),pip.pickProxy.geometry,grandma.pickProxy.geometry,...(boatModel?[boatModel.proxy.geometry]:[]),...(flowerModel?[flowerModel.proxy.geometry]:[])]),backingBytes=canvas.width*canvas.height*4,shadowBytes=1536*1536*4;metadata['metrics']=JSON.stringify({diagnostic,frames,gpuElapsed:gpuTimer?.metrics??{available:false,status:'PROFILING_DISABLED'},cadenceRoom,cadenceStartedAt,cadenceFrameStart,framesSinceCadenceStart:frames-cadenceFrameStart,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,geometries:renderer.info.memory.geometries,textures:renderer.info.memory.textures,activeSamples:activeCadence.length,median:sorted[Math.floor(sorted.length*.5)]??0,p95:sorted[Math.floor(sorted.length*.95)]??0,p99:sorted[Math.floor(sorted.length*.99)]??0,cadenceSampleCount:sorted.length,cadenceWindowLimit:600,cadenceKind:activeCadence.length?"active":"idle-fallback",stallCounts:{over50ms:sorted.filter(ms=>ms>50).length,over100ms:sorted.filter(ms=>ms>100).length,over250ms:sorted.filter(ms=>ms>250).length},lastRenderMs:duration,frameCpuMs:performance.now()-frameStart,dpr:renderer.getPixelRatio(),width:canvas.width,height:canvas.height,geometryCpuBytes,local,imported,scenery,instanceAllocationBytes,decodedSceneBytes:local.decodedBytes+imported.decodedBytes+instanceAllocationBytes+backingBytes+shadowBytes+4*1024*1024,decodedCacheBytes:local.decodedBytes+imported.decodedBytes+instanceAllocationBytes+2*assets.encodedBytes()+4*backingBytes+shadowBytes+32*1024*1024,encodedCacheBytes:assets.encodedBytes(),canvasColorBytes:canvas.width*canvas.height*4,shadowDepthAllocationBytes:1536*1536*4,sectionTextureBytes:2*128*128*4,gpuTotalMemory:'NOT_MEASURABLE',allocationScope:'Decoded local/imported assets including animation/skeletons and CPU/GPU instance matrices; scene adds color backing, shadow and 4 MiB reserve; cache adds two encoded copies, four backings and 32 MiB reserve. Browser/driver total is not measurable',adapter:adapterIdentity});}
   }
   metadata['cardGesture']=s.cardGesture?JSON.stringify(s.cardGesture):'';metadata['actionKind']=action?.kind??'none';metadata['actionProgress']=String(t);metadata['chapterPhase']=c.story.phase;metadata['solX']=sol.rig.position.x.toFixed(3);metadata['solZ']=sol.rig.position.z.toFixed(3);metadata['maraX']=mara.rig.position.x.toFixed(3);metadata['maraZ']=mara.rig.position.z.toFixed(3);metadata['bridgeAction']=action?.kind==='collapse'?'collapsing':'idle';metadata['pipX']=pip.rig.position.x.toFixed(3);metadata['pipZ']=c.pip.z.toFixed(3);metadata['bridgeReady']=String(bridgeReady(c));metadata['sections']=JSON.stringify(c.sections);
   metadata['seedBoatHeading']=String(boatHeading);metadata['seedBoatX']=seedBoat.position.x.toFixed(3);metadata['seedBoatZ']=seedBoat.position.z.toFixed(3);metadata['seedX']=seed.position.x.toFixed(3);metadata['seedZ']=seed.position.z.toFixed(3);
   metadata['dockService']=c.mara.service;metadata['boatOperator']='separate crew member';metadata['passengerBoat']=JSON.stringify({visible:passengerBoat.visible,x:passengerBoat.position.x,z:passengerBoat.position.z,heading:passengerBoat.rotation.y-Math.PI/2,operator:{x:operator.rig.position.x,y:operator.rig.position.y,z:operator.rig.position.z},passengers:passengers.map(p=>({visible:p.rig.visible,x:p.rig.position.x,y:p.rig.position.y,z:p.rig.position.z}))});
   metadata['ferryPhase']=action?.kind==='loadSeed'?'loading':action?.kind==='receiveSeed'?'handoff':action?.kind==='unloadSeed'?'unloading':c.seed==='boat'?c.river.boat.phase:'idle';
   metadata['renderedSections']=JSON.stringify(Object.fromEntries((['a','b'] as const).map(key=>[key,{x:sections[key].root.position.x,z:sections[key].root.position.z,rotation:sections[key].root.rotation.y}])));
  }
  renderer.setAnimationLoop(now=>{if(disposed||failed)return;try{if(renderer.getPixelRatio()!==devicePixelRatio)resize();render(now);}catch(error){fail(error);}});
  return()=>{disposed=true;if(import.meta.env['VITE_EQ_PROFILE']==='1'){const owner=window as Window&{eqRenderProfile?:(mode:string)=>void};if(owner.eqRenderProfile===setRenderDiagnostic)delete owner.eqRenderProfile;}renderer.setAnimationLoop(null);observer.disconnect();document.removeEventListener('fullscreenchange',safeResize);window.removeEventListener('resize',safeResize);document.removeEventListener('visibilitychange',safeResize);unsubscribePointer();releaseAllPointers();window.removeEventListener('keydown',cancelPendingKey,true);canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerleave',leave);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',cancel);canvas.removeEventListener('lostpointercapture',cancel);canvas.removeEventListener('webglcontextlost',lost);canvas.removeEventListener('webglcontextrestored',restored);for(const b of labels.values())b.remove();for(const line of leaders.values())line.remove();cameraControls.dispose();studioReviewButton?.remove();profileControls?.remove();controls.remove();if(controlsSlot.current===controls)controlsSlot.current=null;workbench.dispose();bridgeHandles.dispose();bridge.dispose();pip.dispose();grandma.dispose();for(const actor of otherActors)actor.dispose();reviewBridge?.dispose();for(const picture of reviewPictures)picture.dispose();review?.dispose();sproutModel?.dispose();budModel?.dispose();boatModel?.dispose();flowerModel?.dispose();assets.dispose();art.dispose();gpuTimer?.dispose();renderer.dispose();renderer.forceContextLoss();canvas.remove();};
  }catch(error){fail(error);for(const cleanup of partialCleanup.reverse())try{cleanup();}catch{}return()=>{disposed=true;};}
 },[store]);
 return <div className="garden-scene" ref={host}/>;
}
