import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {PaperArt} from '../src/garden/art.js';
import {makeDoughPortions} from '../src/garden/doughPresentation.js';
import {makeCastStudy,type CastStudyId} from './chapter-cast-studies.js';
import {makeLoopCandidate} from './chapter-loop-candidate.js';
import {CharacterVisual,VisualAssetLibrary} from '../src/garden/assets/visualAsset.js';
const manifest=await(await fetch('./manifest.json')).json(),library=new VisualAssetLibrary();
const element=(id:string)=>document.getElementById(id)!,value=(id:string)=>(element(id) as HTMLSelectElement).value;
const host=element('local'),canvas=element('canvas') as HTMLCanvasElement,frame=element('existing') as HTMLIFrameElement;
const art=new PaperArt(),scene=new T.Scene();scene.background=new T.Color('#d7dfcd');scene.add(new T.HemisphereLight('#fff1d4','#789277',2));
const sun=new T.DirectionalLight('#fff3d7',2.2);sun.position.set(-4,7,6);scene.add(sun);
art.box(scene,0,-.04,0,10,.08,10,'#becaae');
const studies=Object.fromEntries((['mara','rina','sol','boy','operator','jo'] as const).map(id=>{const study=makeCastStudy(art,id);scene.add(study.root);study.root.visible=false;return [id,study];})) as Record<CastStudyId,ReturnType<typeof makeCastStudy>>;
const loop=makeLoopCandidate(art);scene.add(loop.root);loop.root.visible=false;
const joPage=art.box(scene,0,0,0,.30,.009,.20,'#fff0ce');joPage.visible=false;const joLeft=new T.Vector3(),joRight=new T.Vector3();
const carriedSeed=art.ball(scene,0,0,0,.035,'#e1ad4c',[.7,1,.7]);carriedSeed.visible=false;
const dough=makeDoughPortions(art);dough.root.position.y=.15;scene.add(dough.root);dough.root.visible=false;
const post=new T.Group();art.cylinder(post,0,.25,0,.039,.047,.50,'#9b7750',12);art.cylinder(post,0,.49,0,.049,.049,.036,'#d5b781',12);scene.add(post);post.visible=false;
const ropeGeometry=new T.CylinderGeometry(.007,.007,1,6),ropeMaterial=art.material('#967644'),rope=new T.InstancedMesh(ropeGeometry,ropeMaterial,65);art.resources.add(ropeGeometry);scene.add(rope);rope.visible=false;
const ropeFrom=new T.Vector3(),ropeTo=new T.Vector3(),ropeDelta=new T.Vector3(),ropeMiddle=new T.Vector3(),ropeRotation=new T.Quaternion(),ropeMatrix=new T.Matrix4(),ropeScale=new T.Vector3(),ropeUp=new T.Vector3(0,1,0);
let actionActor:CharacterVisual|null=null,loading=0;
const camera=new T.PerspectiveCamera(34,1,.01,120),game=new T.OrthographicCamera(-8,8,5.7,-5.7,.1,140);let active:T.Camera=camera,renderer:T.WebGLRenderer|null=null,controls:OrbitControls|null=null,clock=0,last=0,paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
function resize(){if(!renderer)return;const width=host.clientWidth,height=host.clientHeight;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();game.left=-5.7*width/height;game.right=5.7*width/height;game.updateProjectionMatrix();}
function view(){if(!renderer||!controls)return;resize();const id=value('subject'),close=id==='dough'||id==='loop',center=new T.Vector3(0,id==='dough'?.13:id==='loop'?.22:.64,0),v=value('view'),d=close?1.5:3.7;active=v==='gameplay'?game:camera;
 const offset=v==='front'?new T.Vector3(0,.1,d):v==='back'?new T.Vector3(0,.1,-d):v==='left'?new T.Vector3(-d,.1,0):v==='right'?new T.Vector3(d,.1,0):v==='top'?new T.Vector3(.01,d,.001):v==='gameplay'?new T.Vector3(7.5,13,19):new T.Vector3(d*.55,d*.38,d*.8);
 active.position.copy(center).add(offset);active.lookAt(center);controls.object=active;controls.target.copy(center);controls.enabled=v!=='gameplay';controls.update();document.body.dataset.view=v;
}
async function choose(){const token=++loading,id=value('subject'),local=id!=='existing';document.body.dataset.ready='false';document.body.dataset.local=String(local);host.hidden=!local;frame.hidden=local;actionActor?.dispose();actionActor=null;
 if(local){frame.src='about:blank';if(!renderer){renderer=new T.WebGLRenderer({canvas,antialias:true});renderer.setPixelRatio(devicePixelRatio);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;controls=new OrbitControls(camera,canvas);controls.enableDamping=true;
  renderer.setAnimationLoop(now=>{const dt=paused||document.hidden?0:Math.min(.05,Math.max(0,(now-last)/1000))*Number(value('speed'));last=now;if(host.hidden)return;clock+=dt;const id=value('subject');if(id in studies)studies[id as CastStudyId].update(clock,value('motion')!=='idle',value('motion')==='carry');
   if(id==='loop')loop.update(clock,value('motion')==='walk',value('motion')==='carry');
   joPage.visible=id==='jo'&&value('motion')==='carry';if(joPage.visible){studies.jo.root.updateMatrixWorld(true);studies.jo.hands[0]!.getWorldPosition(joLeft);studies.jo.hands[1]!.getWorldPosition(joRight);joPage.position.addVectors(joLeft,joRight).multiplyScalar(.5);joPage.position.y-=.012;joPage.scale.x=Math.abs(joLeft.x-joRight.x)/.30;}
   if(actionActor){const duration=id==='post'?2.6:3.6,phase=(clock%duration)/duration,work=id==='post'||id==='tie';actionActor.sync({position:[0,0,0],yaw:0,motion:work||value('motion')==='idle'?'idle':'jog',speed:1.7,carrying:id==='tie'||id==='carry-jog',paused,reducedMotion:false,...(work?{action:{kind:id as 'post'|'tie',progress:phase}}:{})});actionActor.update(dt);carriedSeed.visible=id==='carry-jog';if(carriedSeed.visible)actionActor.hand.getWorldPosition(carriedSeed.position);
    post.position.set(0,0,.30);if(id==='post'&&phase<.67&&actionActor.hand){actionActor.hand.getWorldPosition(post.position);post.position.y-=.34;post.position.x=0;}
    if(id==='tie'){const amount=Math.min(1,Math.max(0,(phase-.18)/.58));ropeFrom.set(-.30,.48,.30);for(let i=1;i<66;i++){const angle=(i-1)/64*Math.PI*4*amount;ropeTo.set(Math.cos(angle)*.046,.465+.018*(i-1)/64,.30+Math.sin(angle)*.046);ropeDelta.subVectors(ropeTo,ropeFrom);const length=Math.max(.0001,ropeDelta.length());ropeRotation.setFromUnitVectors(ropeUp,ropeDelta.divideScalar(length));ropeMiddle.addVectors(ropeFrom,ropeTo).multiplyScalar(.5);ropeScale.set(1,length,1);ropeMatrix.compose(ropeMiddle,ropeRotation,ropeScale);rope.setMatrixAt(i-1,ropeMatrix);ropeFrom.copy(ropeTo);}rope.instanceMatrix.needsUpdate=true;rope.computeBoundingSphere();}
   }
   controls!.update();renderer!.render(scene,active);});
 }
 }else if(!frame.src.endsWith('/props-kit-r2/review.html'))frame.src='./props-kit-r2/review.html';
 for(const [name,study]of Object.entries(studies))study.root.visible=name===id;loop.root.visible=id==='loop';joPage.visible=false;carriedSeed.visible=false;dough.root.visible=id==='dough';element('portion-control').hidden=id!=='dough';post.visible=id==='post'||id==='tie';rope.visible=id==='tie';
 if(['post','tie','jog','carry-jog'].includes(id)){const lease=await library.acquire(manifest.pipActions,{reviewOnly:true});if(token!==loading){lease.release();return;}actionActor=new CharacterVisual(lease);scene.add(actionActor.root);clock=0;(element('motion') as HTMLSelectElement).value=id==='jog'?'walk':id==='carry-jog'?'carry':'idle';element('caption').textContent='Combined local candidate: approved anatomy and four original clips, unchanged pending jog/carry-jog tracks, and new post-placement/rope-tying tracks. Inspect both hands, contacts and grounded feet. All eight clips are in this exact model. Review only; these loops are not the bridge simulation.';}
 if(id==='dough'){dough.sync(value('cuts')==='similar'?[-.12,.12]:value('cuts')==='unequal'?[-.24,-.05]:value('cuts')==='one'?[0]:[]);element('caption').textContent='The same committed cut coordinates drive these complete cross-sections and the in-game dough. Compare actual piece widths; no points or answer gate are added.';}
 else if(id in studies)element('caption').textContent=studies[id as CastStudyId].description;
 else if(id==='loop')element('caption').textContent=loop.description;
 view();document.body.dataset.subject=id;document.body.dataset.ready='true';
}
element('subject').onchange=()=>{void choose();};element('view').onchange=view;element('cuts').onchange=()=>{void choose();};
element('pause').onclick=()=>{paused=!paused;element('pause').textContent=paused?'Resume':'Pause';element('pause').setAttribute('aria-pressed',String(paused));};
const observer=new ResizeObserver(resize);observer.observe(host);window.addEventListener('pagehide',()=>{loading++;observer.disconnect();renderer?.setAnimationLoop(null);actionActor?.dispose();library.dispose();controls?.dispose();art.dispose();renderer?.dispose();},{once:true});await choose();
