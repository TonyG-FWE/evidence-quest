import {useEffect,useRef} from 'react';
import * as T from 'three';
import {PaperArt} from './art.js';
import {legacyActor,ModelActor} from './assets/actor.js';
import {createRuntimeLibrary} from './assets/runtimeLibrary.js';
import {localReview,personalGrass} from './assets/profile.js';
import {attachPersonalMemoryLandscape} from './assets/personalMemoryLandscape.js';
import {resourceAllocation} from './assets/resourceBudget.js';
import {reviewAssets} from './assets/reviewManifest.js';
import {ReviewWorld} from './assets/reviewWorld.js';
import {makePassengerBoat} from './chapterWorld.js';
import type {GardenState,GardenStore,Point} from './model.js';
import {BIRD_BOY,DOCK_OFFICE,nearBird,nearOffice,birdInstruction} from './mara.js';
import {availableHands,handAnchor,type HandObject} from './hands.js';

/** Physical play within Mara's explicitly earlier account, driven only by the chapter store. */
export function MaraWorld({s,store,onError,onRestore}:{s:GardenState;store:GardenStore;onError:(e:unknown)=>void;onRestore:()=>void}){
 const b=s.chapter.mara.scene!,busy=!!s.action,go=(point:Point)=>store.send({type:'MARA_GO',point});
 const step=(step:'ASK'|'TAPE'|'ALIGN'|'PLACE'|'DEPART'|'RETURN')=>store.send({type:'MARA_STEP',step});
 return <section className="garden-mara-play" aria-label="Play The Torn Wing">
  <header><strong>The Torn Wing · Mara’s earlier story</strong><span>You guide Mara. Pip waits in Grandma’s garden.</span></header>
  <MaraScene store={store} onError={onError}/>
  {s.viewLost&&<div className="garden-view-error" role="alert"><h2>The story view needs a moment.</h2><p>Your repair progress is still here.</p><button className="g-primary" onClick={onRestore}>Restore story view</button></div>}
  <details className="g-mara-controls" name="garden-physical-controls"><summary>Story directions and other controls</summary><p>{birdInstruction(s)}</p>
   <div className="g-row">
    {b.stage==='ask'&&<button className="g-primary" disabled={busy} onClick={()=>nearBird(b.position)?store.send({type:'OPEN',panel:'birdTalk'}):go(BIRD_BOY)}>Speak to the boy</button>}
    {b.stage==='fetch'&&b.tape==='office'&&(nearOffice(b.position)?<button className="g-primary" disabled={busy} onClick={()=>step('TAPE')}>Pick up the tape</button>:<button className="g-primary" disabled={busy} onClick={()=>go(DOCK_OFFICE)}>Walk to the dock office</button>)}
    {['fetch','repair'].includes(b.stage)&&b.tape==='mara'&&!nearBird(b.position)&&<button className="g-primary" disabled={busy} onClick={()=>go(BIRD_BOY)}>Return to the boy</button>}
    {b.tape==='mara'&&nearBird(b.position)&&b.stage==='fetch'&&<button className="g-primary" disabled={busy} onClick={()=>step('ALIGN')}>Line up the torn wing</button>}
    {b.stage==='repair'&&<><button className="g-primary" aria-pressed={b.preview==='across'} disabled={busy} onClick={()=>store.send({type:'TAPE_PREVIEW',position:'across'})}>Tape across the tear</button><button className="g-alternative" aria-pressed={b.preview==='beside'} disabled={busy} onClick={()=>store.send({type:'TAPE_PREVIEW',position:'beside'})}>Tape beside the tear</button>{b.preview&&<button className="g-primary" disabled={busy} onClick={()=>step('PLACE')}>Place the strip</button>}</>}
    {b.stage==='repaired'&&<button className="g-primary" disabled={busy} onClick={()=>step('DEPART')}>Let the boy carry his bird</button>}
    {b.stage==='done'&&<button className="g-primary" disabled={busy} onClick={()=>step('RETURN')}>Return to Grandma’s garden</button>}
    <button className="g-secondary" disabled={busy} onClick={()=>store.send({type:'OPEN',panel:'story'})}>Read Mara’s page</button>
   </div>
   <p className="g-small">{['ask','fetch'].includes(b.stage)?'Click the dock or use the arrow keys to walk.':b.stage==='repaired'?'The wing is mended. Let the boy carry his bird onto the dock.':b.stage==='done'?'Mara’s tape stays here. Pip is still in the present garden.':'You direct the repair. Choose a position on the bird, then place the tape.'} The boy keeps his sister’s original bird.</p>
  </details>
 </section>;
}

function MaraScene({store,onError}:{store:GardenStore;onError:(e:unknown)=>void}){
 const host=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const el=host.current!,a=new PaperArt();let renderer:T.WebGLRenderer;
  try{renderer=new T.WebGLRenderer({antialias:true,alpha:true});}catch(e){onError(e);return;}
  renderer.setPixelRatio(devicePixelRatio);renderer.setClearColor('#e9e0c7');renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;
  const canvas=renderer.domElement;canvas.tabIndex=0;canvas.setAttribute('role','img');canvas.setAttribute('aria-label','Mara’s earlier dock: her office and tape on the left; the boy and his torn paper bird on the right. Named controls perform the same actions.');el.append(canvas);
  const world=new T.Scene(),camera=new T.OrthographicCamera(-4,4,3,-3,.1,50);camera.position.set(3,6,10);camera.lookAt(-.2,.5,.3);
  world.add(new T.HemisphereLight('#fff4d8','#74918b',2.2));const sun=new T.DirectionalLight('#fff0d4',2.5);sun.position.set(-3,8,6);world.add(sun);
  if(!personalGrass)a.box(world,0,-.23,-.3,8,.2,5,'#79b7b0');const dock=new T.Group();world.add(dock);a.box(dock,-1,-.03,.35,3.8,.25,2.3,'#c59c6b');for(let i=0;i<13;i++)a.box(dock,-2.85+i*.3,.10,.35,.012,.012,2.28,'#a9865d');
  const boat=makePassengerBoat(a);boat.position.set(localReview?2.8:1.65,-.06,.55);boat.rotation.y=Math.PI/2;world.add(boat);const gangway=a.box(world,localReview?1.65:1,.14,.55,localReview?1.5:.55,.07,.48,'#bc9865');
  const office=new T.Group();world.add(office);office.position.set(-2,.1,-.55);a.box(office,0,.72,0,1.1,1.44,.8,'#dbc08a');a.box(office,0,.7,.405,.55,1.1,.035,'#456f65');const roof=a.shape(office,[[-.7,0],[0,.5],[.7,0]],1.0,'#c66d48');roof.position.set(0,1.44,-.5);office.userData['target']='office';
  const tapeTable=a.box(world,-1.9,.45,.35,.55,.15,.35,'#a77e4f');
  const assets=createRuntimeLibrary(renderer),review=localReview?new ReviewWorld(assets.library):null;
  const mara=localReview?new ModelActor(assets.library,reviewAssets['mara']!):legacyActor(a,'mara'),boy=localReview?new ModelActor(assets.library,reviewAssets['boy']!):legacyActor(a,'boy');world.add(mara.rig,boy.rig);boy.rig.position.set(1.15,.13,.43);boy.rig.rotation.y=-1;boy.rig.userData['target']='boy';
  const bird=new T.Group();world.add(bird);bird.position.set(1.18,.65,.75);bird.scale.setScalar(.75);a.shape(bird,[[-.25,0],[.12,.05],[.22,.18],[.20,-.08],[-.14,-.1]],.025,'#f4db94');
  review?.attach('bird',bird,{position:[-.02,-.165,.09],rotation:[0,Math.PI/2,0]});
  const wing=new T.Group();bird.add(wing);a.shape(wing,[[.09,.04],[.48,.33],[.35,-.02],[.17,-.09]],.028,'#f4db94');wing.userData['target']='wing';
  const seam=a.line(bird,[new T.Vector3(.12,.04,.039),new T.Vector3(.20,-.065,.039)],'#835d47',.012);seam.userData['target']='across';
  const tapeStrip=a.box(bird,.16,-.005,.06,.25,.072,.018,'#fbefca');tapeStrip.rotation.z=.55;const tapeMat=(tapeStrip.material as T.MeshStandardMaterial).clone();a.resources.add(tapeMat);tapeStrip.material=tapeMat;
  const tapeModel=review?.attach('tape-strip',tapeStrip,{position:[0,-.018,0],rotation:[Math.PI/2,0,0]});
  const tapeRoll=new T.Group();world.add(tapeRoll);tapeRoll.userData['target']='tape-roll';tapeStrip.userData['target']='tape';a.cylinder(tapeRoll,0,0,0,.105,.105,.08,'#eee4c4');a.cylinder(tapeRoll,0,.047,0,.043,.043,.008,'#94785b');
  const dockModel=review?.attach('dock',dock,{position:[-.5,-.89,.35],rotation:[0,Math.PI,0],scale:[1.2,1,.9]});
  const gangwayModel=review?.attach('ramp',gangway,{position:[0,-.055,0],rotation:[0,Math.PI,0],scale:[1.1/1.4,1.65,.46/.46302]});
  if(review){office.position.set(-2,.13,-2.4);office.rotation.y=-Math.PI/2;if(!personalGrass){a.box(world,-2,-.03,-2.5,5.5,.26,4.9,'#b2bd87');a.box(world,-1.95,0,.6,1.5,.26,1.6,'#b2bd87');}review.attach('cottage',office,{scale:[1.8,1.8,1.8]});review.attach('boat-2',boat,{position:[0,-.13/1.5,0],rotation:[0,-Math.PI/2,0],scale:[1/2,1/1.5,1/2.6]});review.attach('bench',tapeTable,{position:[0,-.32,0],rotation:[0,Math.PI/2,0],scale:[.4,.57,.45]});review.attach('tape-roll-2',tapeRoll);review.attach('wingtip',wing,{position:[.22,-.03,.05],rotation:[0,Math.PI/2,0],scale:[.55,.55,.55]});}
  // The earlier dock keeps its own authored coordinates and travel route.
  // Source-derived surfaces replace only the personal review's old flat slabs.
  const approachClearings=Array.from({length:17},(_,i)=>({x:DOCK_OFFICE.x+(BIRD_BOY.x-DOCK_OFFICE.x)*i/16,z:DOCK_OFFICE.z+(BIRD_BOY.z-DOCK_OFFICE.z)*i/16,radius:.60}));
  const memoryLandscapes=personalGrass?[
   attachPersonalMemoryLandscape(world,assets.library,{kind:'mara-office',bounds:{minX:-4.75,maxX:.75,minZ:-4.95,maxZ:-.05},groundY:.10,soilBottomY:-.16,clearings:[{x:-2,z:-2.5,radius:3.65},...approachClearings]}),
   attachPersonalMemoryLandscape(world,assets.library,{kind:'mara-approach',bounds:{minX:-2.7,maxX:-1.2,minZ:-.2,maxZ:1.4},groundY:.13,soilBottomY:-.16,clearings:[{x:-1.9,z:.35,radius:.55},...approachClearings]}),
   attachPersonalMemoryLandscape(world,assets.library,{kind:'mara-water',bounds:{minX:-4,maxX:4,minZ:-2.8,maxZ:2.2},groundY:-.13,water:{x:0,z:-.3,width:8,depth:5,y:-.13}}),
  ]:[];
  let landscapeReported=0;
  const acrossZone=a.box(bird,.17,0,.07,.28,.27,.02,'#dfbd60'),besideZone=a.box(bird,-.16,-.04,.07,.22,.23,.02,'#75a8b8');
  for(const [zone,id] of [[acrossZone,'across'],[besideZone,'beside']] as const){const mat=(zone.material as T.MeshStandardMaterial).clone();a.resources.add(mat);mat.transparent=true;mat.opacity=.17;zone.material=mat;zone.userData['target']=id;}
  const pointer=new T.Vector2(),ray=new T.Raycaster(),plane=new T.Plane(new T.Vector3(0,1,0),-.13);
  const pick=(e:PointerEvent)=>{const s=store.getSnapshot(),b=s.chapter.mara.scene;if(!b||s.panel||s.action)return;const rect=canvas.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);ray.setFromCamera(pointer,camera);
   let target='';for(const hit of ray.intersectObjects([office,boy.rig,wing,...(b.stage==='repair'?[acrossZone,besideZone]:[])],true)){let obj:T.Object3D|null=hit.object;while(obj){if(obj.userData['target']){target=String(obj.userData['target']);break;}obj=obj.parent;}if(target)break;}
   if(b.stage==='repair'&&['across','beside'].includes(target)){store.send({type:'TAPE_PREVIEW',position:target as 'across'|'beside'});return;}
   if(target==='office'){store.send({type:'MARA_GO',point:DOCK_OFFICE});return;}
   if(target==='boy'||target==='wing'){if(b.stage==='ask'&&nearBird(b.position))store.send({type:'OPEN',panel:'birdTalk'});else store.send({type:'MARA_GO',point:BIRD_BOY});return;}
   const p=new T.Vector3();if(ray.ray.intersectPlane(plane,p))store.send({type:'MARA_GO',point:{x:p.x,z:p.z}});
  };
  let drag:{pointer:number;object:HandObject;offset:Point}|null=null;
  function rayAt(e:PointerEvent){const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);}
  function handPoint(e:PointerEvent,id:HandObject){rayAt(e);const p=new T.Vector3();if(id==='tape-roll'){const flat=new T.Plane(new T.Vector3(0,1,0),-.6);return ray.ray.intersectPlane(flat,p)?{x:p.x,z:p.z}:null;}
   bird.updateWorldMatrix(true,false);const face=new T.Plane(new T.Vector3(0,0,1),-.07).applyMatrix4(bird.matrixWorld);if(!ray.ray.intersectPlane(face,p))return null;bird.worldToLocal(p);return {x:p.x,z:p.y};}
  function down(e:PointerEvent){const state=store.getSnapshot();if(e.button!==0||drag||state.panel||state.action)return;rayAt(e);let id:HandObject|null=null;
   for(const found of ray.intersectObjects([wing,tapeStrip,tapeRoll],true)){if(!found.object.visible)continue;let object:T.Object3D|null=found.object;while(object){if(object.userData['target']){id=object.userData['target'] as HandObject;break;}object=object.parent;}if(id&&availableHands(state).includes(id))break;id=null;}
   if(!id)return;const p=handPoint(e,id);if(!p)return;const anchor=handAnchor(state,id);store.send({type:'HAND_BEGIN',object:id});if(!store.getSnapshot().gesture)return;drag={pointer:e.pointerId,object:id,offset:id==='wing'?{x:anchor.x-p.x,z:anchor.z-p.z}:{x:0,z:0}};if(id!=='wing')store.send({type:'HAND_MOVE',point:p});canvas.focus();canvas.setPointerCapture(e.pointerId);e.preventDefault();}
  function move(e:PointerEvent){if(!drag||drag.pointer!==e.pointerId)return;const p=handPoint(e,drag.object);if(p)store.send({type:'HAND_MOVE',point:{x:p.x+drag.offset.x,z:p.z+drag.offset.z}});}
  function up(e:PointerEvent){if(!drag){pick(e);return;}if(drag.pointer!==e.pointerId)return;move(e);store.send({type:'HAND_RELEASE'});drag=null;if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);}
  function cancel(e:PointerEvent){if(!drag||drag.pointer!==e.pointerId)return;drag=null;store.send({type:'HAND_CANCEL'});}
  canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',cancel);canvas.addEventListener('lostpointercapture',cancel);
  const lost=(e:Event)=>{e.preventDefault();onError(e);};canvas.addEventListener('webglcontextlost',lost);
  let last=performance.now(),frame=0,lastState:GardenState|null=null,lastFocus='',previousMara:Point|null=null;
  let previousRepair:{aligned:boolean;strip:string}|null=null;
  let settling:{kind:'align'|'press';started:number;wing:T.Vector3;rotation:number}|null=null;
  const tapeHand=new T.Vector3(),officeTape=new T.Vector3(-1.9,.58,.35);
  function resize(){const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);const b=store.getSnapshot().chapter.mara.scene,repair=b&&(['repair','repaired'].includes(b.stage)||b.tape==='mara'&&nearBird(b.position)||store.getSnapshot().action?.kind==='birdIntro'),aspect=w/h,half=repair?Math.max(.72,1.05/aspect):Math.max(localReview?3.5:2.0,(localReview?5:3.2)/aspect);camera.lookAt(repair?1:-.2,repair?.70:localReview?1.5:.5,repair?.3:localReview?-.6:.3);camera.left=-half*aspect;camera.right=half*aspect;camera.top=half;camera.bottom=-half;camera.updateProjectionMatrix();camera.updateMatrixWorld();lastState=null;}
  const observer=new ResizeObserver(resize);observer.observe(el);resize();
  const draw=(now:number)=>{
   const dt=now-last;last=now;const before=store.getSnapshot();if(!before.background&&!before.viewLost&&!before.panel&&(before.action||before.maraTarget||before.keys.length))store.send({type:'TICK',ms:dt});
   const s=store.getSnapshot(),b=s.chapter.mara.scene;if(!b){frame=requestAnimationFrame(draw);return;}
   for(const landscape of memoryLandscapes)landscape.demand(!s.background&&!s.viewLost&&!document.hidden);
   const focus=s.action?.kind==='birdIntro'?'intro':['repair','repaired'].includes(b.stage)||b.tape==='mara'&&nearBird(b.position)?'repair':'dock';if(focus!==lastFocus&&!s.gesture){lastFocus=focus;resize();}
   if(previousRepair){
    const kind=!previousRepair.aligned&&b.aligned?'align':previousRepair.strip!==b.strip&&b.strip!=='none'?'press':null;
    if(kind&&!s.chapter.reducedMotion)settling={kind,started:now,wing:wing.position.clone(),rotation:wing.rotation.z};
   }
   previousRepair={aligned:b.aligned,strip:b.strip};
   if(s.chapter.reducedMotion||s.gesture)settling=null;
   if(s!==lastState||settling||localReview){const action=s.action,t=action?Math.min(1,action.elapsed/action.duration):0,walking=!!s.maraTarget||!!s.keys.length,depart=action?.kind==='birdDeparture'?t:b.stage==='done'?1:0;
    mara.rig.position.set(b.position.x,.13,b.position.z);
    const moved=previousMara?Math.hypot(b.position.x-previousMara.x,b.position.z-previousMara.z):0;
    if(previousMara&&moved>.001)mara.rig.rotation.y=Math.atan2(b.position.x-previousMara.x,b.position.z-previousMara.z);
    else if(nearBird(b.position))mara.rig.rotation.y=Math.atan2(boy.rig.position.x-b.position.x,boy.rig.position.z-b.position.z);
    previousMara={...b.position};
    mara.swing(walking&&!s.chapter.reducedMotion,now*.001);
    boy.rig.position.set(1.35-depart*.65,.13,.43+depart*.55);boy.rig.rotation.y=-1.1;boy.gesture(0,-1);boy.gesture(1,-1);boy.swing(depart>0&&depart<1&&!s.chapter.reducedMotion,now*.001);
    if(review)for(const person of [mara,boy])person.rig.position.y=Math.max(.13,dockModel?.supportHeight(person.rig.position)??.13,gangwayModel?.supportHeight(person.rig.position)??.13);
    const heldClose=action?.kind==='birdIntro'?Math.max(0,Math.min(1,(t-.35)/.4)):b.stage==='ask'&&action?.kind!=='birdConsent'?1:action?.kind==='birdConsent'?1-t:0;
    bird.position.set(1.18-depart*.65+heldClose*.08,.65,.75+depart*.55-heldClose*.08);wing.rotation.z=b.strip==='across'?0:b.strip==='beside'?-.42:b.aligned?0:-.48;wing.position.set(b.aligned?0:.22,b.aligned?0:-.12,0);mara.gesture(0,action?.kind==='birdIntro'?-1.2*Math.sin(Math.min(1,t/.85)*Math.PI):b.stage==='repair'?-.6:0);
    tapeStrip.visible=b.strip!=='none'||!!b.preview||b.stage==='repair';const placed=b.preview??b.strip;tapeStrip.position.set(placed==='none'?-.15:placed==='beside'?-.16:.16,placed==='none'?.20:-.005,.075);tapeStrip.rotation.z=.55;tapeMat.opacity=b.preview?.55:1;tapeMat.transparent=!!b.preview;
    acrossZone.visible=besideZone.visible=false;
    // Carry the same roll in Mara's rotated palm. It stays on the dock after
    // the recollection; a presentation offset never changes its ownership.
    mara.gesture(1,b.tape==='mara'||action?.kind==='tapePickup'?-.85:0);
    if(mara instanceof ModelActor){mara.demand(true);mara.update(dt/1000,{carrying:b.tape==='mara',paused:!!s.panel||s.background,reducedMotion:s.chapter.reducedMotion,...(action?.kind==='birdConsent'?{action:{kind:'permission',progress:t}}:b.stage==='repair'?{action:{kind:'tape',progress:settling?Math.min(1,(now-settling.started)/360):.5}}:{})});mara.handPoint(tapeHand);}
    else{mara.rig.updateWorldMatrix(true,true);mara.arms[1]!.localToWorld(tapeHand.set(0,-.235,.035));}
    if(boy instanceof ModelActor){boy.demand(true);boy.update(dt/1000,{carrying:true,paused:!!s.panel||s.background,reducedMotion:s.chapter.reducedMotion});const support=boy.handPoint().lerp(boy.attachmentPoint('leftHand'),.5);bird.position.copy(support).add(new T.Vector3(.015,.124,.025));}
    review?.update({...s,chapter:{...s.chapter,pip:b.position}},true);
    const tapeMaterials:{opacity:number;transparent:boolean}[]=[];
    tapeModel?.paint(material=>{const transparent=!!b.preview;if(material.transparent!==transparent){material.transparent=transparent;material.needsUpdate=true;}material.opacity=b.preview?.55:1;tapeMaterials.push({opacity:material.opacity,transparent:material.transparent});});
    if(!tapeModel)tapeMaterials.push({opacity:tapeMat.opacity,transparent:tapeMat.transparent});
    el.dataset['tapeVisual']=JSON.stringify({ready:tapeModel?.ready??true,preview:!!b.preview,materials:tapeMaterials});
    el.dataset['characterAssets']=JSON.stringify({mara:mara instanceof ModelActor?mara.ready:true,boy:boy instanceof ModelActor?boy.ready:true,pending:assets.library.pendingSources,objects:review?.loaded});
    el.setAttribute('aria-busy',String(assets.library.pendingSources>0||memoryLandscapes.some(landscape=>!landscape.ready&&!landscape.error)));
    const failure=(mara instanceof ModelActor?mara.error:null)??(boy instanceof ModelActor?boy.error:null)??review?.errors[0]??memoryLandscapes.find(landscape=>landscape.error)?.error;if(failure&&!s.viewLost)onError(new Error(failure));
    if(memoryLandscapes.length&&now-landscapeReported>250){const local=resourceAllocation([...a.resources,...memoryLandscapes.flatMap(landscape=>landscape.resources)]),imported=assets.library.allocations(),instanceAllocationBytes=memoryLandscapes.reduce((sum,landscape)=>sum+landscape.metrics.instanceAllocationBytes,0);el.dataset['memoryLandscape']=JSON.stringify({surfaces:memoryLandscapes.map(landscape=>({status:landscape.status,...landscape.metrics})),local,imported,instanceAllocationBytes,knownDecodedAssetsBytes:local.decodedBytes+imported.decodedBytes+instanceAllocationBytes,scope:'Known local/source allocations and both instance-matrix copies; not total browser or GPU memory'});landscapeReported=now;}
    tapeRoll.position.copy(b.tape==='mara'?tapeHand:officeTape);tapeRoll.rotation.set(0,mara.rig.rotation.y,Math.PI/2);
    if(b.tape!=='mara')tapeRoll.rotation.set(0,0,0);
    if(settling){const progress=Math.min(1,(now-settling.started)/360),ease=progress*progress*(3-2*progress);
     if(settling.kind==='align'){wing.position.lerpVectors(settling.wing,new T.Vector3(),ease);wing.rotation.z=settling.rotation*(1-ease);}
     else tapeStrip.position.z=.075+.10*(1-ease);
     if(progress===1)settling=null;
    }
    if(s.gesture?.object==='wing'){wing.position.set(s.gesture.point.x,s.gesture.point.z,0);wing.rotation.z=s.gesture.rotation;}
    if(s.gesture?.object==='tape'){tapeStrip.position.set(s.gesture.point.x,s.gesture.point.z,.075);tapeStrip.rotation.z=.55+s.gesture.rotation;}
    if(s.gesture?.object==='tape-roll')tapeRoll.position.set(s.gesture.point.x,.65,s.gesture.point.z);
    if(action?.kind==='tapePickup'){tapeRoll.position.lerpVectors(officeTape,tapeHand,t*t*(3-2*t));}
    el.dataset['cameraProjection']=JSON.stringify({projection:camera.projectionMatrix.elements,view:camera.matrixWorldInverse.elements});bird.updateWorldMatrix(true,false);el.dataset['birdMatrix']=JSON.stringify(bird.matrixWorld.elements);el.dataset['handGesture']=s.gesture?JSON.stringify({object:s.gesture.object,point:s.gesture.point,rotation:s.gesture.rotation}):'';el.dataset['birdIntroduced']=String(b.introduced);el.dataset['birdStage']=b.stage;el.dataset['maraPosition']=JSON.stringify(b.position);el.dataset['tape']=b.tape;el.dataset['strip']=b.strip;el.dataset['preview']=b.preview??'';el.dataset['wingAligned']=String(b.aligned);el.dataset['boyKeepsOriginal']='true';
    renderer.render(world,camera);lastState=s;
   }
   frame=requestAnimationFrame(draw);
  };frame=requestAnimationFrame(draw);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',cancel);canvas.removeEventListener('lostpointercapture',cancel);canvas.removeEventListener('webglcontextlost',lost);if(mara instanceof ModelActor)mara.dispose();if(boy instanceof ModelActor)boy.dispose();review?.dispose();for(const landscape of memoryLandscapes)landscape.dispose();assets.dispose();a.dispose();renderer.dispose();canvas.remove();};
 },[store,onError]);
 return <div className="g-mara-scene" ref={host}/>;
}
