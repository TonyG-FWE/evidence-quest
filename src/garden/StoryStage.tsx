import {useEffect,useRef,useState} from 'react';
import * as T from 'three';
import {PaperArt,makeCharacter,makeLantern} from './art.js';
import {makePassengerBoat} from './chapterWorld.js';
import {ModelActor} from './assets/actor.js';
import {runtimeAssets} from './assets/runtimeManifest.js';
import {reviewAssets} from './assets/reviewManifest.js';
import {localReview} from './assets/profile.js';
import {createRuntimeLibrary} from './assets/runtimeLibrary.js';
import {resourceAllocation} from './assets/resourceBudget.js';
import {StoryProps} from './assets/storyProps.js';
import {storyBounds} from './assets/storyBounds.js';
import {attachPersonalStoryLandscape} from './assets/personalStoryLandscape.js';
export type StageActor={rig:T.Group;legacy:ReturnType<typeof makeCharacter>|null;model:ModelActor|null;carrying:boolean;action?:{kind:string;progress:number}};
/** A separate illustrated memory/rehearsal. It never mutates the live garden. */
export function StoryStage({scene:kind,animate=false,compact=false,time,active=true,paused=false,reducedMotion=false}:{scene:string;animate?:boolean;compact?:boolean;time?:number;active?:boolean;paused?:boolean;reducedMotion?:boolean}){
 const host=useRef<HTMLDivElement>(null),input=useRef({time,active,paused,reducedMotion}),[failure,setFailure]=useState(false),[revision,retry]=useState(0);input.current={time,active,paused,reducedMotion};
 useEffect(()=>{
  const element=host.current!,a=new PaperArt();let renderer:T.WebGLRenderer;
  delete element.dataset['stageDisposed'];delete element.dataset['stageReleasedSources'];element.dataset['stageScene']=kind;
  try{renderer=new T.WebGLRenderer({antialias:true,alpha:true});}catch{element.textContent='The picture is unavailable. The story and all choices are still here.';return;}
  renderer.setPixelRatio(devicePixelRatio);renderer.setClearColor('#eee7d4');renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;
  const assets=createRuntimeLibrary(renderer),supplied=localReview?new StoryProps(assets.library):null,actors:StageActor[]=[],papers:{actor:StageActor;paper:T.Group}[]=[];let closed=false,contextLost=false;
  const canvas=renderer.domElement;canvas.setAttribute('role','img');canvas.setAttribute('aria-label',kind==='gather-waiting'?'Pip, Sol and Grandma wait. Mara is still working, so nobody is telling her story.':descriptions[kind]??'An illustration of the story');element.append(canvas);
  const world=new T.Scene(),camera=new T.OrthographicCamera(-3.4,3.4,2.3,-2.3,.1,50);camera.position.set(4,4.4,10);camera.lookAt(0,.7,0);
  world.add(new T.HemisphereLight('#fff7df','#799184',2.4));const sun=new T.DirectionalLight('#fff0cf',2.3);sun.position.set(-4,8,6);world.add(sun);
  const set=new T.Group();world.add(set);const bakeryPicture=localReview&&['bread','thanks','both','draft'].includes(kind),landscape=attachPersonalStoryLandscape(set,assets.library,kind);
  if(!landscape){a.box(set,0,-.08,bakeryPicture?-2.0:0,bakeryPicture?8.8:6,.16,bakeryPicture?8.6:3.4,'#b9ca98');a.box(set,0,-.20,bakeryPicture?-2.0:0,bakeryPicture?8.9:6.1,.12,bakeryPicture?8.7:3.5,'#719b78');}
  const actor=(who:Parameters<typeof makeCharacter>[1],x:number,z:number):StageActor=>{const model=localReview?new ModelActor(assets.library,reviewAssets[who]!):!compact&&(who==='pip'||who==='grandma')?new ModelActor(assets.library,runtimeAssets[who]):null,legacy=model?null:makeCharacter(a,who),ch={rig:model?.rig??legacy!.rig,model,legacy,carrying:false};ch.rig.position.set(x,model?0:.015,z);set.add(ch.rig);actors.push(ch);model?.demand(input.current.active);return ch;};
  const paper=(parent:T.Object3D,x:number,y:number,z:number)=>{const p=new T.Group();parent.add(p);p.position.set(x,y,z);if(supplied)supplied.place('card',p,[0,-.14,0],[1,1,1],[0,Math.PI/2,0]);else{a.box(p,0,0,0,.27,.36,.012,'#fff6da');for(let i=0;i<5;i++)a.box(p,0,.11-i*.045,.01,.2-i%2*.035,.012,.006,'#9b9b7f');}return p;};
  const heldPaper=(ch:StageActor,x=.16,y=.55,z=.16)=>{ch.carrying=true;if(ch.model){const page=paper(set,0,0,0);page.visible=false;papers.push({actor:ch,paper:page});return page;}return paper(ch.legacy!.body,x,y,z);};
  const bench=()=>{a.box(set,1.2,.4,.25,1.8,.13,.55,'#b58351');a.box(set,1.2,.8,0,1.8,.25,.06,'#c89b61');for(const x of [.55,1.85])for(const z of [0,.43])a.box(set,x,.2,z,.1,.4,.1,'#8d6c49');};
  const moves:((t:number)=>void)[]=[];let loop=false;
  if(supplied){supplied.assemble(kind,set,actor,heldPaper,animate);loop=animate;
   if(['bread','thanks','both','draft'].includes(kind)){const rain=new T.Group();set.add(rain);const drops=Array.from({length:12},(_,i)=>a.box(rain,-2.8+(i%4)*.18,1+(i%3)*.3,-.4+Math.floor(i/4)*.4,.012,.10,.012,'#7fa8a4'));moves.push(t=>drops.forEach((drop,i)=>{drop.position.y=.1+((1.8-t*1.4+i*.19)%1.8+1.8)%1.8;}));}
  }
  else if(['bread','thanks','both','draft'].includes(kind)){
   // Repaired bakery and dry flour are source facts. Rain continues outside.
   a.box(set,-1.5,.68,-.5,1.8,1.36,1.3,'#e7c99b');const roof=a.shape(set,[[-1.06,0],[0,.60],[1.06,0]],1.48,'#c67756');roof.position.set(-1.5,1.36,-1.24);
   const tile=a.box(set,-1.25,1.64,-.45,.38,.05,.33,'#8fa28a');tile.rotation.z=-.45;
   a.box(set,-1.7,.61,.17,.54,.8,.05,'#6f7360');a.box(set,-.98,.81,.175,.43,.39,.04,'#e9d794');
   for(let i=0;i<3;i++){a.cylinder(set,-.9+i*.29,.20,.55,.12,.16,.38,'#e8d2a5');a.line(set,[new T.Vector3(-1.02+i*.29,.30,.64),new T.Vector3(-.78+i*.29,.30,.64)],'#b49261',.015);}
   const sol=actor('sol',1.65,.42),rina=actor('rina',-.65,.85);heldPaper(sol,.19,.48,.15);
   a.box(set,1.3,.50,-.75,1.3,.12,.75,'#b38156');for(const x of [.8,1.8])a.box(set,x,.24,-.75,.1,.48,.12,'#8a6746');a.box(set,1.18,.59,-.65,.32,.04,.14,'#779684');
   const bread=new T.Group();set.add(bread);for(let i=0;i<3;i++){a.ball(bread,-.21+i*.20,0,0,.17,'#d7a557',[1,.55,.7]);a.line(bread,[new T.Vector3(-.27+i*.20,.07,-.07),new T.Vector3(-.16+i*.20,.085,.04)],'#efe0b3',.017);}
   bread.position.set(-.6,.56,1.02);const drops:T.Mesh[]=[];for(let i=0;i<16;i++)drops.push(a.box(set,-2.45+(i%5)*.32,2+(i%3)*.2,-1.25+Math.floor(i/5)*.45,.014,.15,.014,'#7fa8a4'));
   moves.push(t=>{for(let i=0;i<drops.length;i++)drops[i]!.position.y=.3+((2.6-t*1.8+i*.19)%2.3+2.3)%2.3;const walk=kind==='thanks'?Math.min(1,t/2.8):kind==='both'?Math.max(0,Math.min(1,(t-2)/3)):0;rina.rig.position.x=-.65+walk*1.7;if(walk>0&&walk<1)rina.rig.rotation.y=Math.PI/2;rina.legacy?.legs.forEach((l,i)=>l.rotation.x=walk>0&&walk<1?Math.sin(t*9+i*Math.PI)*.3:0);bread.position.x=-.6+walk*1.7;bread.visible=kind!=='draft'&&(!animate||t>.7);});loop=animate;
  }else if(['repair','promise'].includes(kind)){
   a.box(set,0,.03,0,4.8,.16,1.5,'#c89f6a');for(let i=0;i<12;i++)a.box(set,-2.2+i*.40,.119,0,.018,.009,1.46,'#a28254');
   actor('mara',-1,.2);const boy=actor('boy',.6,.2),bird=new T.Group();set.add(bird);bird.position.set(.38,.64,.46);a.shape(bird,[[0,.08],[-.38,.25],[-.12,-.08],[.12,-.04],[.4,.2]],.018,'#f3d890');a.box(bird,.16,.04,.045,.09,.16,.015,'#f8edce');heldPaper(boy,.16,.40,.18);moves.push(t=>bird.rotation.z=kind==='promise'?-.15:Math.sin(Math.min(t,3)/3*Math.PI)*.15);loop=animate;
  }else if(kind==='duet'){
   const boat=makePassengerBoat(a);boat.position.y=.08;set.add(boat);a.box(set,0,-.03,0,5.9,.12,3.3,'#79b8ad');const boy=actor('boy',-.7,0),passenger=actor('passenger',.7,0);a.cylinder(boy.legacy?.body??boy.rig,.12,.69,.20,.015,.015,.50,'#b99b58').rotation.z=1.1;(passenger.legacy?.body??passenger.rig).rotation.y=-.4;
  }else if(kind==='picnic'){
   a.box(set,0,.50,0,2.2,.12,1.25,'#b98a5b');a.box(set,0,.58,0,2.23,.025,1.29,'#e9d7a1');for(const x of [-.94,.94])for(const z of [-.5,.5])a.ball(set,x,.65,z,.12,'#7f9581',[1,.5,1]);actor('grandma',-.95,.9);actor('sol',1.65,.15);actor('mara',-.95,-1.0);a.cylinder(set,0,.7,0,.28,.3,.18,'#b57749');a.cylinder(set,0,.8,0,.28,.28,.03,'#f7e3b4');
  }else if(kind==='bench'){
   bench();const grandma=actor('grandma',-.6,.25);for(const x of [.55,1.3])a.box(set,x,.50,.2,.6,.11,.43,'#e6c477');heldPaper(grandma);
  }else if(kind==='delivery'){
   a.box(set,-1.5,.01,0,2.8,.12,2.5,'#ccaa76');a.box(set,1.5,-.02,0,2.9,.12,3.3,'#77b9ad');const m=actor('mara',-.7,-.4),p=actor('pip',-.7,.9);heldPaper(p);m.rig.rotation.y=.1;p.rig.rotation.y=2.8;m.rig.position.y=p.rig.position.y=.07;
  }else if(kind==='waiting-flower'){
   const flower=makeLantern(a,0,.3);set.add(flower.root);a.cylinder(set,0,.02,.3,.40,.40,.04,'#937652',12);
  }else if(kind==='planting'){
   const p=actor('pip',-.65,.3),g=actor('grandma',.7,.3),flower=makeLantern(a,0,.3);set.add(flower.root);a.cylinder(set,0,.02,.3,.40,.40,.04,'#937652',12);p.rig.rotation.y=.8;g.rig.rotation.y=-.8;moves.push(t=>{flower.root.scale.setScalar(animate?.15+.85*Math.min(1,t/3):1);});loop=animate;
  }else{
   bench();const p=actor('pip',-1.2,.7),g=actor('grandma',.5,.9);actor('sol',1.65,-.5);const m=kind!=='gather-absent'&&kind!=='gather-waiting'?actor('mara',-1.2,-.6):null,teller=kind==='gather-mara'?m:kind==='gathering'?g:p;if(kind!=='gather-waiting'&&teller)heldPaper(teller);for(const x of [-2.3,2.4]){const flower=makeLantern(a,x,.9);flower.root.scale.setScalar(.75);set.add(flower.root);}
  }
  let frame=0,draws=0,start=performance.now(),previous=-1,lastAssets='',dirty=true,reported=0,errorShown=false;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  function report(){
   const imported=assets.library.allocations(),local=resourceAllocation([...a.resources,...actors.flatMap(ch=>ch.model?[ch.model.pickProxy.geometry]:[]),...(supplied?.props.map(p=>p.proxy.geometry)??[]),...(landscape?.resources??[])]),backingBytes=canvas.width*canvas.height*4,instanceAllocationBytes=landscape?.metrics.instanceAllocationBytes??0;
   element.dataset['stageAssets']=JSON.stringify(Object.fromEntries(actors.filter(ch=>ch.model).map(ch=>[ch.model!.definition.id,{status:ch.model!.ready?(localReview?'p2-review':'approved-r2-feet'):ch.model!.error?'unavailable':'loading',sha256:ch.model!.definition.sha256}])));
   element.dataset['stageObjects']=JSON.stringify(supplied?.states??[]);
   if(landscape)element.dataset['stageLandscape']=JSON.stringify({status:landscape.status,error:landscape.error,...landscape.metrics});
   element.dataset['stageResources']=JSON.stringify({local,imported,...(landscape?{instanceAllocationBytes,landscape:landscape.metrics}:{}),encodedCacheBytes:assets.encodedBytes(),decodedSceneBytes:local.decodedBytes+imported.decodedBytes+instanceAllocationBytes+backingBytes+4*1024*1024,decodedCacheBytes:local.decodedBytes+imported.decodedBytes+instanceAllocationBytes+2*assets.encodedBytes()+4*backingBytes+32*1024*1024,dpr:renderer.getPixelRatio(),width:canvas.width,height:canvas.height,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles});
  }
  function pose(t:number,dt=0){
   const reduced=input.current.reducedMotion||media.matches; moves.forEach(move=>move(t));supplied?.updateBefore(t);
   for(const ch of actors)ch.model?.update(dt,{carrying:ch.carrying,paused:input.current.paused||!input.current.active||dt<=0,reducedMotion:reduced,...(ch.action?{action:ch.action}:{})});
   supplied?.updateAfter(t);
   const contact:Record<string,{palm:number[];grip:number[]}>={};
   for(const held of papers){const model=held.actor.model!;held.paper.visible=model.ready;if(!model.ready||!model.hand)continue;const palm=model.handPoint();
    // The sheet's normal follows the palm normal. Its near edge rests in the
    // hand, rather than a vertical page cutting through the middle of it.
    model.hand.getWorldQuaternion(held.paper.quaternion);held.paper.quaternion.multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),-Math.PI/2));
    const edge=new T.Vector3(0,.14,0),offset=edge.clone().applyQuaternion(held.paper.quaternion);held.paper.position.copy(set.worldToLocal(palm.clone().sub(offset)));held.paper.updateWorldMatrix(true,false);contact[model.definition.id]={palm:palm.toArray(),grip:held.paper.localToWorld(edge).toArray()};}
   return contact;
  }
  function draw(t:number,dt=0){
   const contact=pose(t,dt),reduced=input.current.reducedMotion||media.matches;
   renderer.render(world,camera);element.dataset['stageRenderedFrame']=String(++draws);element.dataset['stageScene']=kind;element.dataset['stageTime']=t.toFixed(2);element.dataset['stageHandContact']=JSON.stringify(contact);element.dataset['stagePaused']=String(input.current.paused||reduced||dt<=0);
   const now=performance.now();if(now-reported>250||dirty){report();reported=now;}
  }
  const framePicture=()=>{const aspect=element.clientWidth/element.clientHeight;if(!Number.isFinite(aspect)||aspect<=0)return;
   // Frame the tellers and handled objects, retaining all background artwork.
   // Both ends of the authored motion are included so the frame stays still.
   camera.updateMatrixWorld();const bounds=new T.Box3(),at=previous<0?0:previous;
   const subjects=supplied?[...actors.map(ch=>ch.rig),...supplied.props.filter(prop=>!['bakery','tile'].includes(prop.definition.id)).map(prop=>prop.root)]:[set];
   for(const time of [0,6]){pose(time);for(const subject of subjects)bounds.union(storyBounds(subject,camera.matrixWorldInverse));}pose(at);
   if(bounds.isEmpty())return;
   const center=bounds.getCenter(new T.Vector3()),size=bounds.getSize(new T.Vector3()),half=Math.max(size.y*.54,size.x*.54/aspect,1.25);
   camera.left=center.x-half*aspect;camera.right=center.x+half*aspect;camera.top=center.y+half;camera.bottom=center.y-half;camera.updateProjectionMatrix();
   element.dataset['stageFraming']=JSON.stringify({subjectSize:size.toArray(),half,aspect});};
  const resize=()=>{const w=element.clientWidth,h=element.clientHeight;if(!w||!h||closed)return;renderer.setPixelRatio(devicePixelRatio);renderer.setSize(w,h,false);framePicture();dirty=true;};const observer=new ResizeObserver(resize);observer.observe(element);window.addEventListener('resize',resize);resize();
  const lost=(event:Event)=>{event.preventDefault();if(closed)return;contextLost=true;setFailure(true);element.dataset['stageContext']='lost';};
  const restored=()=>{if(closed)return;contextLost=false;dirty=true;lastAssets='';element.dataset['stageContext']='restored';if(!errorShown)setFailure(false);resize();};
  canvas.addEventListener('webglcontextlost',lost);canvas.addEventListener('webglcontextrestored',restored);
  const tick=(now:number)=>{
   if(closed)return;const current=input.current,visible=current.active&&!document.hidden&&!contextLost,reduced=current.reducedMotion||media.matches;
   for(const ch of actors)ch.model?.demand(visible);
   supplied?.demand(visible);landscape?.demand(visible);
   const state=[visible,current.paused,reduced,...actors.map(ch=>ch.model?String(ch.model.ready)+':'+ch.model.error:'legacy'),JSON.stringify(supplied?.states),...(landscape?[landscape.status,landscape.metrics.loadedCells]:[])].join('|');
   if(state!==lastAssets){dirty=true;lastAssets=state;framePicture();if(!errorShown&&(actors.some(ch=>ch.model?.error)||supplied?.failed||landscape?.error)){errorShown=true;setFailure(true);}}
   element.setAttribute('aria-busy',String(Boolean(visible&&(actors.some(ch=>ch.model&&!ch.model.ready&&!ch.model.error)||supplied?.pending||landscape&&!landscape.ready&&!landscape.error))));
   if(visible){const t=current.paused&&previous>=0?previous:reduced?6:current.time??(loop?Math.min((now-start)/1000,6):5),delta=previous<0?0:Math.max(0,Math.min(.05,t-previous));if(dirty||t!==previous){draw(t,current.paused?0:delta);previous=t;dirty=false;}}
   else if(dirty){report();dirty=false;}
   frame=requestAnimationFrame(tick);
  };frame=requestAnimationFrame(tick);
  return()=>{closed=true;cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('resize',resize);canvas.removeEventListener('webglcontextlost',lost);canvas.removeEventListener('webglcontextrestored',restored);for(const ch of actors)ch.model?.dispose();supplied?.dispose();landscape?.dispose();assets.dispose();a.dispose();renderer.dispose();renderer.forceContextLoss();canvas.remove();element.dataset['stageDisposed']='true';element.dataset['stageReleasedSources']=String(assets.library.activeSources);};
 },[kind,animate,compact,revision]);
 return <div ref={host} className={'g-story-stage '+(compact?'g-stage-compact':'')}>{failure&&<div role="alert" className="g-stage-recovery">The story artwork could not load. Your story and choices are kept.<button onClick={()=>{setFailure(false);retry(v=>v+1);}}>Restore story view</button></div>}</div>;
}
const descriptions:Record<string,string>={gathering:'Grandma holds her own story page with Mara, Pip and Sol at the garden bench. They have found a way to share stories again.','waiting-flower':'A flower in Grandma’s garden is waiting to keep its owner’s story.',bread:'Rina’s repaired roof keeps the flour dry. She bakes bread. Rain continues outside.',thanks:'Rina brings Sol a loaf of bread at his workshop to thank him.',both:'First Rina bakes with the dry flour; later she visits Sol with a loaf.',draft:'The roof tile is repaired and the flour is dry. Sol’s ending remains unwritten.',promise:'The boy holds the paper bird he promised to keep safe.',repair:'Mara and the boy mend the bird’s torn wing together.',bench:'Grandma brings cushions back to the garden bench.',planting:'Pip and Grandma plant the lantern seed together.',delivery:'Pip gives Grandma’s written story to Mara at her dock.',duet:'The boy plays his flute while a passenger whistles along on Mara’s boat.',picnic:'Grandma, Mara and Sol share a picnic. Four stones hold the tablecloth in place.','gather-absent':'Pip reads at the gathering with Sol and Grandma. Mara is still at work.','gather-mara':'Mara tells her story to Pip, Sol and Grandma.','gather-listener':'Mara listens while Pip reads her story to the gathering.'};
