import {useEffect,useRef} from 'react';
import * as T from 'three';
import {PaperArt,makeCharacter} from './art.js';
import {makePassengerBoat} from './chapterWorld.js';
import type {GardenState,GardenStore,Point} from './model.js';
import {BIRD_BOY,DOCK_OFFICE,nearBird,nearOffice,birdInstruction} from './mara.js';

/** Physical play within Mara's explicitly earlier account, driven only by the chapter store. */
export function MaraWorld({s,store,onError,onRestore}:{s:GardenState;store:GardenStore;onError:(e:unknown)=>void;onRestore:()=>void}){
 const b=s.chapter.mara.scene!,busy=!!s.action,go=(point:Point)=>store.send({type:'MARA_GO',point});
 const step=(step:'ASK'|'TAPE'|'ALIGN'|'PLACE'|'DEPART'|'RETURN')=>store.send({type:'MARA_STEP',step});
 return <section className="garden-mara-play" aria-label="Play The Torn Wing">
  <header><strong>The Torn Wing · Mara’s earlier story</strong><span>You guide Mara. Pip waits in Grandma’s garden.</span></header>
  <MaraScene store={store} onError={onError}/>
  {s.viewLost&&<div className="garden-view-error" role="alert"><h2>The story view needs a moment.</h2><p>Your repair progress is still here.</p><button className="g-primary" onClick={onRestore}>Restore story view</button></div>}
  <div className="g-mara-controls"><p>{birdInstruction(s)}</p>
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
  </div>
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
  a.box(world,0,-.23,-.3,8,.2,5,'#79b7b0');a.box(world,-1,-.03,.35,3.8,.25,2.3,'#c59c6b');for(let i=0;i<13;i++)a.box(world,-2.85+i*.3,.10,.35,.012,.012,2.28,'#a9865d');
  const boat=makePassengerBoat(a);boat.position.set(1.65,-.06,.55);boat.rotation.y=Math.PI/2;world.add(boat);a.box(world,1,.14,.55,.55,.07,.48,'#bc9865');
  const office=new T.Group();world.add(office);office.position.set(-2,.1,-.55);a.box(office,0,.72,0,1.1,1.44,.8,'#dbc08a');a.box(office,0,.7,.405,.55,1.1,.035,'#456f65');const roof=a.shape(office,[[-.7,0],[0,.5],[.7,0]],1.0,'#c66d48');roof.position.set(0,1.44,-.5);office.userData['target']='office';
  a.box(world,-1.9,.45,.35,.55,.15,.35,'#a77e4f');
  const mara=makeCharacter(a,'mara'),boy=makeCharacter(a,'boy');world.add(mara.rig,boy.rig);boy.rig.position.set(1.15,.13,.43);boy.rig.rotation.y=-1;boy.rig.userData['target']='boy';
  const bird=new T.Group();world.add(bird);bird.position.set(1.18,.65,.75);bird.scale.setScalar(.75);a.shape(bird,[[-.25,0],[.12,.05],[.22,.18],[.20,-.08],[-.14,-.1]],.025,'#f4db94');
  const wing=new T.Group();bird.add(wing);a.shape(wing,[[.09,.04],[.48,.33],[.35,-.02],[.17,-.09]],.028,'#f4db94');wing.userData['target']='wing';
  const seam=a.line(bird,[new T.Vector3(.12,.04,.039),new T.Vector3(.20,-.065,.039)],'#835d47',.012);seam.userData['target']='across';
  const tapeStrip=a.box(bird,.16,-.005,.06,.25,.072,.018,'#fbefca');tapeStrip.rotation.z=.55;const tapeMat=(tapeStrip.material as T.MeshStandardMaterial).clone();a.resources.add(tapeMat);tapeStrip.material=tapeMat;
  const tapeRoll=new T.Group();world.add(tapeRoll);a.cylinder(tapeRoll,0,0,0,.105,.105,.08,'#eee4c4');a.cylinder(tapeRoll,0,.047,0,.043,.043,.008,'#94785b');
  const acrossZone=a.box(bird,.17,0,.07,.28,.27,.02,'#dfbd60'),besideZone=a.box(bird,-.16,-.04,.07,.22,.23,.02,'#75a8b8');
  for(const [zone,id] of [[acrossZone,'across'],[besideZone,'beside']] as const){const mat=(zone.material as T.MeshStandardMaterial).clone();a.resources.add(mat);mat.transparent=true;mat.opacity=.17;zone.material=mat;zone.userData['target']=id;}
  const pointer=new T.Vector2(),ray=new T.Raycaster(),plane=new T.Plane(new T.Vector3(0,1,0),-.13);
  const pick=(e:PointerEvent)=>{const s=store.getSnapshot(),b=s.chapter.mara.scene;if(!b||s.panel||s.action)return;const rect=canvas.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);ray.setFromCamera(pointer,camera);
   let target='';for(const hit of ray.intersectObjects([office,boy.rig,wing,...(b.stage==='repair'?[acrossZone,besideZone]:[])],true)){let obj:T.Object3D|null=hit.object;while(obj){if(obj.userData['target']){target=String(obj.userData['target']);break;}obj=obj.parent;}if(target)break;}
   if(b.stage==='repair'&&['across','beside'].includes(target)){store.send({type:'TAPE_PREVIEW',position:target as 'across'|'beside'});return;}
   if(target==='office'){store.send({type:'MARA_GO',point:DOCK_OFFICE});return;}
   if(target==='boy'||target==='wing'){if(b.stage==='ask'&&nearBird(b.position))store.send({type:'OPEN',panel:'birdTalk'});else store.send({type:'MARA_GO',point:BIRD_BOY});return;}
   const p=new T.Vector3();if(ray.ray.intersectPlane(plane,p))store.send({type:'MARA_GO',point:{x:p.x,z:p.z}});
  };canvas.addEventListener('pointerup',pick);
  const lost=(e:Event)=>{e.preventDefault();onError(e);};canvas.addEventListener('webglcontextlost',lost);
  let last=performance.now(),frame=0,lastState:GardenState|null=null,lastFocus='';
  function resize(){const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);const b=store.getSnapshot().chapter.mara.scene,repair=b&&(['repair','repaired'].includes(b.stage)||store.getSnapshot().action?.kind==='birdIntro'),aspect=w/h,half=repair?Math.max(.72,1.05/aspect):Math.max(2.0,3.2/aspect);camera.lookAt(repair?1:-.2,repair?.70:.5,.3);camera.left=-half*aspect;camera.right=half*aspect;camera.top=half;camera.bottom=-half;camera.updateProjectionMatrix();camera.updateMatrixWorld();lastState=null;}
  const observer=new ResizeObserver(resize);observer.observe(el);resize();
  const draw=(now:number)=>{
   const dt=now-last;last=now;const before=store.getSnapshot();if(!before.background&&!before.viewLost&&!before.panel&&(before.action||before.maraTarget||before.keys.length))store.send({type:'TICK',ms:dt});
   const s=store.getSnapshot(),b=s.chapter.mara.scene;if(!b){frame=requestAnimationFrame(draw);return;}
   const focus=s.action?.kind==='birdIntro'?'intro':['repair','repaired'].includes(b.stage)?'repair':'dock';if(focus!==lastFocus){lastFocus=focus;resize();}
   if(s!==lastState){const action=s.action,t=action?Math.min(1,action.elapsed/action.duration):0,walking=!!s.maraTarget||!!s.keys.length,depart=action?.kind==='birdDeparture'?t:b.stage==='done'?1:0;
    mara.rig.position.set(b.position.x,.13,b.position.z);mara.rig.rotation.y=b.tape==='office'&&b.stage==='fetch'?-1.5:1.3;
    mara.legs.forEach((leg,i)=>leg.rotation.x=walking&&!s.chapter.reducedMotion?Math.sin(now*.009+i*Math.PI)*.3:0);
    boy.rig.position.set(1.35-depart*.65,.13,.43+depart*.55);boy.rig.rotation.y=-1.1;boy.arms.forEach(arm=>arm.rotation.x=-1);boy.legs.forEach((leg,i)=>leg.rotation.x=depart>0&&depart<1&&!s.chapter.reducedMotion?Math.sin(now*.008+i*Math.PI)*.3:0);
    const heldClose=action?.kind==='birdIntro'?Math.max(0,Math.min(1,(t-.35)/.4)):b.stage==='ask'&&action?.kind!=='birdConsent'?1:action?.kind==='birdConsent'?1-t:0;
    bird.position.set(1.18-depart*.65+heldClose*.08,.65,.75+depart*.55-heldClose*.08);wing.rotation.z=b.strip==='across'?0:b.strip==='beside'?-.42:b.aligned?-.07:-.48;wing.position.set(b.aligned?0:.08,b.aligned?0:-.08,0);mara.arms[0]!.rotation.x=action?.kind==='birdIntro'?-1.2*Math.sin(Math.min(1,t/.85)*Math.PI):b.stage==='repair'?-.6:0;
    tapeStrip.visible=b.strip!=='none'||!!b.preview;const placed=b.preview??b.strip;tapeStrip.position.x=placed==='beside'?-.16:.16;tapeMat.opacity=b.preview?.55:1;tapeMat.transparent=!!b.preview;
    acrossZone.visible=besideZone.visible=b.stage==='repair';tapeRoll.position.set(b.tape==='mara'?b.position.x+.2:-1.9,b.tape==='mara'?.77:.58,b.tape==='mara'?b.position.z+.1:.35);
    if(action?.kind==='tapePickup'){tapeRoll.position.lerp(new T.Vector3(b.position.x+.2,.77,b.position.z+.1),t);}
    el.dataset['birdIntroduced']=String(b.introduced);el.dataset['birdStage']=b.stage;el.dataset['maraPosition']=JSON.stringify(b.position);el.dataset['tape']=b.tape;el.dataset['strip']=b.strip;el.dataset['preview']=b.preview??'';el.dataset['wingAligned']=String(b.aligned);el.dataset['boyKeepsOriginal']='true';
    renderer.render(world,camera);lastState=s;
   }
   frame=requestAnimationFrame(draw);
  };frame=requestAnimationFrame(draw);
  return()=>{cancelAnimationFrame(frame);observer.disconnect();canvas.removeEventListener('pointerup',pick);canvas.removeEventListener('webglcontextlost',lost);a.dispose();renderer.dispose();canvas.remove();};
 },[store,onError]);
 return <div className="g-mara-scene" ref={host}/>;
}
