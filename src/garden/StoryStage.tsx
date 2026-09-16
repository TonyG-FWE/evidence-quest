import {useEffect,useRef} from 'react';
import * as T from 'three';
import {PaperArt,makeCharacter,makeLantern} from './art.js';
import {makePassengerBoat} from './chapterWorld.js';
/** A separate illustrated memory/rehearsal. It never mutates the live garden. */
export function StoryStage({scene:kind,animate=false,compact=false,time}:{scene:string;animate?:boolean;compact?:boolean;time?:number}){
 const host=useRef<HTMLDivElement>(null),controlledTime=useRef(time);controlledTime.current=time;
 useEffect(()=>{
  const element=host.current!,a=new PaperArt();let renderer:T.WebGLRenderer;
  try{renderer=new T.WebGLRenderer({antialias:true,alpha:true});}catch{element.textContent='The picture is unavailable. The story and all choices are still here.';return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor('#eee7d4');renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;
  const canvas=renderer.domElement;canvas.setAttribute('role','img');canvas.setAttribute('aria-label',kind==='gather-waiting'?'Pip, Sol and Grandma wait. Mara is still working, so nobody is telling her story.':descriptions[kind]??'An illustration of the story');element.append(canvas);
  const world=new T.Scene(),camera=new T.OrthographicCamera(-3.4,3.4,2.3,-2.3,.1,50);camera.position.set(5,7,10);camera.lookAt(0,.65,0);
  world.add(new T.HemisphereLight('#fff7df','#799184',2.4));const sun=new T.DirectionalLight('#fff0cf',2.3);sun.position.set(-4,8,6);world.add(sun);
  const set=new T.Group();world.add(set);a.box(set,0,-.08,0,6,.16,3.4,'#b9ca98');a.box(set,0,-.20,0,6.1,.12,3.5,'#719b78');
  const actor=(who:Parameters<typeof makeCharacter>[1],x:number,z:number)=>{const ch=makeCharacter(a,who);ch.rig.position.set(x,.015,z);set.add(ch.rig);return ch;};
  const paper=(parent:T.Object3D,x:number,y:number,z:number)=>{const p=new T.Group();parent.add(p);p.position.set(x,y,z);a.box(p,0,0,0,.27,.36,.012,'#fff6da');for(let i=0;i<5;i++)a.box(p,0,.11-i*.045,.01,.2-i%2*.035,.012,.006,'#9b9b7f');return p;};
  const bench=()=>{a.box(set,1.2,.4,.25,1.8,.13,.55,'#b58351');a.box(set,1.2,.8,0,1.8,.25,.06,'#c89b61');for(const x of [.55,1.85])for(const z of [0,.43])a.box(set,x,.2,z,.1,.4,.1,'#8d6c49');};
  const moves:((t:number)=>void)[]=[];let loop=false;
  if(['bread','thanks','both','draft'].includes(kind)){
   // Repaired bakery and dry flour are source facts. Rain continues outside.
   a.box(set,-1.5,.68,-.5,1.8,1.36,1.3,'#e7c99b');const roof=a.shape(set,[[-1.06,0],[0,.60],[1.06,0]],1.48,'#c67756');roof.position.set(-1.5,1.36,-1.24);
   const tile=a.box(set,-1.25,1.64,-.45,.38,.05,.33,'#8fa28a');tile.rotation.z=-.45;
   a.box(set,-1.7,.61,.17,.54,.8,.05,'#6f7360');a.box(set,-.98,.81,.175,.43,.39,.04,'#e9d794');
   for(let i=0;i<3;i++){a.cylinder(set,-.9+i*.29,.20,.55,.12,.16,.38,'#e8d2a5');a.line(set,[new T.Vector3(-1.02+i*.29,.30,.64),new T.Vector3(-.78+i*.29,.30,.64)],'#b49261',.015);}
   const sol=actor('sol',1.65,.42),rina=actor('rina',-.65,.85);paper(sol.body,.19,.48,.15);
   a.box(set,1.3,.50,-.75,1.3,.12,.75,'#b38156');for(const x of [.8,1.8])a.box(set,x,.24,-.75,.1,.48,.12,'#8a6746');a.box(set,1.18,.59,-.65,.32,.04,.14,'#779684');
   const bread=new T.Group();set.add(bread);for(let i=0;i<3;i++){a.ball(bread,-.21+i*.20,0,0,.17,'#d7a557',[1,.55,.7]);a.line(bread,[new T.Vector3(-.27+i*.20,.07,-.07),new T.Vector3(-.16+i*.20,.085,.04)],'#efe0b3',.017);}
   bread.position.set(-.6,.56,1.02);const drops:T.Mesh[]=[];for(let i=0;i<16;i++)drops.push(a.box(set,-2.45+(i%5)*.32,2+(i%3)*.2,-1.25+Math.floor(i/5)*.45,.014,.15,.014,'#7fa8a4'));
   moves.push(t=>{for(let i=0;i<drops.length;i++)drops[i]!.position.y=.3+((2.6-t*1.8+i*.19)%2.3+2.3)%2.3;const walk=kind==='thanks'?Math.min(1,t/2.8):kind==='both'?Math.max(0,Math.min(1,(t-2)/3)):0;rina.rig.position.x=-.65+walk*1.7;rina.legs.forEach((l,i)=>l.rotation.x=walk>0&&walk<1?Math.sin(t*9+i*Math.PI)*.3:0);bread.position.x=-.6+walk*1.7;bread.visible=kind!=='draft'&&(!animate||t>.7);});loop=animate;
  }else if(['repair','promise'].includes(kind)){
   a.box(set,0,.03,0,4.8,.16,1.5,'#c89f6a');for(let i=0;i<12;i++)a.box(set,-2.2+i*.40,.119,0,.018,.009,1.46,'#a28254');
   actor('mara',-1,.2);const boy=actor('boy',.6,.2),bird=new T.Group();set.add(bird);bird.position.set(.38,.64,.46);a.shape(bird,[[0,.08],[-.38,.25],[-.12,-.08],[.12,-.04],[.4,.2]],.018,'#f3d890');a.box(bird,.16,.04,.045,.09,.16,.015,'#f8edce');paper(boy.body,.16,.40,.18);moves.push(t=>bird.rotation.z=kind==='promise'?-.15:Math.sin(Math.min(t,3)/3*Math.PI)*.15);loop=animate;
  }else if(kind==='duet'){
   const boat=makePassengerBoat(a);boat.position.y=.08;set.add(boat);a.box(set,0,-.03,0,5.9,.12,3.3,'#79b8ad');const boy=actor('boy',-.7,0),passenger=actor('passenger',.7,0);a.cylinder(boy.body,.12,.69,.20,.015,.015,.50,'#b99b58').rotation.z=1.1;passenger.body.rotation.y=-.4;
  }else if(kind==='picnic'){
   a.box(set,0,.50,0,2.2,.12,1.25,'#b98a5b');a.box(set,0,.58,0,2.23,.025,1.29,'#e9d7a1');for(const x of [-.94,.94])for(const z of [-.5,.5])a.ball(set,x,.65,z,.12,'#7f9581',[1,.5,1]);actor('grandma',-.95,.9);actor('sol',1.65,.15);actor('mara',-.95,-1.0);a.cylinder(set,0,.7,0,.28,.3,.18,'#b57749');a.cylinder(set,0,.8,0,.28,.28,.03,'#f7e3b4');
  }else if(kind==='bench'){
   bench();actor('grandma',-.6,.25);for(const x of [.55,1.3])a.box(set,x,.50,.2,.6,.11,.43,'#e6c477');paper(set,-.4,.82,.42);
  }else if(kind==='delivery'){
   a.box(set,-1.5,.01,0,2.8,.12,2.5,'#ccaa76');a.box(set,1.5,-.02,0,2.9,.12,3.3,'#77b9ad');const m=actor('mara',-.7,-.4),p=actor('pip',-.7,.9);paper(set,-.55,.7,.45);m.rig.rotation.y=.1;p.rig.rotation.y=2.8;
  }else if(kind==='waiting-flower'){
   const flower=makeLantern(a,0,.3);set.add(flower.root);a.cylinder(set,0,.02,.3,.40,.40,.04,'#937652',12);
  }else if(kind==='planting'){
   const p=actor('pip',-.65,.3),g=actor('grandma',.7,.3),flower=makeLantern(a,0,.3);set.add(flower.root);a.cylinder(set,0,.02,.3,.40,.40,.04,'#937652',12);p.rig.rotation.y=.8;g.rig.rotation.y=-.8;moves.push(t=>{flower.root.scale.setScalar(animate?.15+.85*Math.min(1,t/3):1);});loop=animate;
  }else{
   bench();const p=actor('pip',-1.2,.7),g=actor('grandma',.5,.9);actor('sol',1.65,-.5);const m=kind!=='gather-absent'&&kind!=='gather-waiting'?actor('mara',-1.2,-.6):null,teller=kind==='gather-mara'?m:kind==='gathering'?g:p;if(kind!=='gather-waiting'&&teller)paper(teller.body,.16,.55,.16);for(const x of [-2.3,2.4]){const flower=makeLantern(a,x,.9);flower.root.scale.setScalar(.75);set.add(flower.root);}
  }
  function draw(t=5){moves.forEach(move=>move(t));renderer.render(world,camera);element.dataset['stageScene']=kind;element.dataset['stageTime']=t.toFixed(2);}
  const resize=()=>{const w=element.clientWidth,h=element.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);const aspect=w/h;camera.left=-2.25*aspect;camera.right=2.25*aspect;camera.updateProjectionMatrix();draw(controlledTime.current??5);};const observer=new ResizeObserver(resize);observer.observe(element);resize();
  let frame=0,start=performance.now();const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches||!!element.closest('.garden-reduced-motion');
  if(controlledTime.current!==undefined){let previous=-1;const tick=()=>{const t=reduced?6:controlledTime.current??6;if(t!==previous){draw(t);previous=t;}frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);}
  else if(loop&&!reduced){const tick=(now:number)=>{const t=(now-start)/1000;draw(Math.min(t,6));if(t<6)frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);}
  return()=>{cancelAnimationFrame(frame);observer.disconnect();a.dispose();renderer.dispose();renderer.forceContextLoss();canvas.remove();};
 },[kind,animate]);
 return <div ref={host} className={'g-story-stage '+(compact?'g-stage-compact':'')}/>;
}
const descriptions:Record<string,string>={gathering:'Grandma holds her own story page with Mara, Pip and Sol at the garden bench. They have found a way to share stories again.','waiting-flower':'A flower in Grandma’s garden is waiting to keep its owner’s story.',bread:'Rina’s repaired roof keeps the flour dry. She bakes bread. Rain continues outside.',thanks:'Rina brings Sol a loaf of bread at his workshop to thank him.',both:'First Rina bakes with the dry flour; later she visits Sol with a loaf.',draft:'The roof tile is repaired and the flour is dry. Sol’s ending remains unwritten.',promise:'The boy holds the paper bird he promised to keep safe.',repair:'Mara and the boy mend the bird’s torn wing together.',bench:'Grandma brings cushions back to the garden bench.',planting:'Pip and Grandma plant the lantern seed together.',delivery:'Pip gives Grandma’s written story to Mara at her dock.',duet:'The boy plays his flute while a passenger whistles along on Mara’s boat.',picnic:'Grandma, Mara and Sol share a picnic. Four stones hold the tablecloth in place.','gather-absent':'Pip reads at the gathering with Sol and Grandma. Mara is still at work.','gather-mara':'Mara tells her story to Pip, Sol and Grandma.','gather-listener':'Mara listens while Pip reads her story to the gathering.'};
