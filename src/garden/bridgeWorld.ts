import * as T from 'three';
import type {PaperArt} from './art.js';
import type {GardenState,Point} from './model.js';
import {availableHands,handAnchor,type HandObject} from './hands.js';
import {bridgePosts,ropeSides,constructionOf,postPoint,postRootHeight,postStoragePoint,ropePoints,ropeTarget,sectionSecured,bridgeStatus,type BridgePostId,type RopeSide} from './bridgeConstruction.js';
import {BRIDGE_LEVELS,BRIDGE_GEOMETRY,terrainHeight} from './worldLayout.js';
import {localReview} from './assets/profile.js';

const ropeHeight=BRIDGE_LEVELS.deck+BRIDGE_LEVELS.ropeAboveDeck;
const up=new T.Vector3(0,1,0);

/** Construction is a view of the serialized bridge, never a second physics
 * authority. Precision geometry remains distinct from the pending art review. */
export function makeBridgeWorld(art:PaperArt){
 const root=new T.Group();root.name='staged-bridge-construction';
 const posts={} as Record<BridgePostId,T.Group>,sockets={} as Record<BridgePostId,T.Mesh>;
 const socketMaterial=new T.MeshBasicMaterial({color:'#edd398',transparent:true,opacity:.68,side:T.DoubleSide,depthWrite:false});art.resources.add(socketMaterial);
 const socketGeometry=art.geometry('bridge-post-socket',()=>new T.RingGeometry(.075,.12,20));
 for(const id of bridgePosts){
  const post=new T.Group();post.name=id;post.userData['target']='post:'+id;
  art.cylinder(post,0,.33,0,.062,.077,.66,'#896448');
  art.cylinder(post,0,.065,0,.081,.081,.10,'#5a6259');
  art.cylinder(post,0,.65,0,.085,.085,.045,'#d6b988');
  // An eye below the cap makes the rope's actual attachment readable.
  art.box(post,0,.49,.066,.068,.09,.029,'#565b50');
  art.mergeStatic(post);posts[id]=post;root.add(post);
  const socket=new T.Mesh(socketGeometry,socketMaterial);socket.rotation.x=-Math.PI/2;socket.name=id+'-socket';sockets[id]=socket;root.add(socket);
 }
 const cylinder=art.geometry('bridge-rope-segment',()=>new T.CylinderGeometry(.023,.023,1,6));
 const ropes={} as Record<RopeSide,T.InstancedMesh>,ends={} as Record<RopeSide,T.Group>;
 const wraps={} as Record<RopeSide,T.InstancedMesh>;
 const wrapGeometry=art.geometry('bridge-rope-wrap',()=>new T.TorusGeometry(.082,.021,5,18));
 const matrix=new T.Matrix4(),quaternion=new T.Quaternion(),scale=new T.Vector3(),middle=new T.Vector3(),delta=new T.Vector3();
 for(const side of ropeSides){
  const color=side==='north'?'#ca9d59':'#b78549';
  const run=new T.InstancedMesh(cylinder,art.material(color),160);run.count=0;run.frustumCulled=false;run.castShadow=true;run.receiveShadow=true;run.name=side+'-rope';ropes[side]=run;root.add(run);
  const knots=new T.InstancedMesh(wrapGeometry,art.material(color),12);knots.count=0;knots.frustumCulled=false;knots.castShadow=true;knots.name=side+'-knots';wraps[side]=knots;root.add(knots);
  const end=new T.Group();end.name=side+'-rope-end';end.userData['target']='rope:'+side;
  const coil=Array.from({length:33},(_,i)=>{const angle=i/32*Math.PI*5;return new T.Vector3(Math.cos(angle)*(.09-i*.0013),i*.001,Math.sin(angle)*(.09-i*.0013));});
  art.line(end,coil,color,.023);art.line(end,[new T.Vector3(.09,0,0),new T.Vector3(.15,.03,.04),new T.Vector3(.20,0,.08)],color,.023);art.mergeStatic(end);ends[side]=end;root.add(end);
 }
 const movingRope=new T.InstancedMesh(cylinder,art.material('#dfb96e'),160);movingRope.count=0;movingRope.frustumCulled=false;movingRope.castShadow=true;root.add(movingRope);
 const previewRing=new T.Mesh(art.geometry('bridge-placement-preview',()=>new T.RingGeometry(.14,.18,28)),new T.MeshBasicMaterial({color:'#f2d479',side:T.DoubleSide,depthWrite:false}));art.resources.add(previewRing.material);previewRing.rotation.x=-Math.PI/2;previewRing.visible=false;root.add(previewRing);
 let storedKey='',lastWork='';
 const segment=(mesh:T.InstancedMesh,from:T.Vector3,to:T.Vector3,index:number)=>{
  delta.subVectors(to,from);const length=delta.length();middle.copy(from).add(to).multiplyScalar(.5);quaternion.setFromUnitVectors(up,length?delta.divideScalar(length):up);scale.set(1,Math.max(.001,length),1);matrix.compose(middle,quaternion,scale);mesh.setMatrixAt(index,matrix);
 };
 function path(mesh:T.InstancedMesh,points:readonly Point[],sag:number,progress=1){
  let count=0;for(let span=1;span<points.length;span++){
   const from=points[span-1]!,to=points[span]!,steps=20;
   for(let step=0;step<steps;step++){
    const a=step/steps,b=(step+1)/steps;if((span-1+b)/(points.length-1)>progress)break;
    const v=(t:number)=>new T.Vector3(from.x+(to.x-from.x)*t,ropeHeight-Math.sin(t*Math.PI)*sag,from.z+(to.z-from.z)*t);
    segment(mesh,v(a),v(b),count++);
   }
  }mesh.count=count;mesh.instanceMatrix.needsUpdate=true;
 }
 function knots(side:RopeSide,points:readonly Point[]){
  let count=0;for(const p of points)for(let turn=0;turn<3;turn++){
   middle.set(p.x,ropeHeight-.032+turn*.029,p.z);quaternion.setFromEuler(new T.Euler(Math.PI/2,turn===2?.23:0,turn===2?.35:0));matrix.compose(middle,quaternion,scale.set(1,1,1));wraps[side].setMatrixAt(count++,matrix);
  }wraps[side].count=count;wraps[side].instanceMatrix.needsUpdate=true;
 }
 function render(s:GardenState,time:number){
  const c=s.chapter,build=constructionOf(c),hands=availableHands(s),g=s.gesture,work=s.bridgeWork;
  const bridgeGesture=!!g&&(g.object.startsWith('section:')||g.object.startsWith('post:')||g.object.startsWith('rope:'));
  const near=Math.hypot(c.pip.x,c.pip.z-3)<5&&!c.crossed;
  const workProgress=work?Math.min(1,work.elapsed/work.duration):1;
  for(const id of bridgePosts){
   const p=build.posts[id]?postPoint(c,id):postStoragePoint(id),held=g?.object==='post:'+id,post=posts[id];
   post.visible=!c.crossed||build.posts[id];post.position.set(held?g.point.x:p.x,build.posts[id]?postRootHeight(c,id):held?BRIDGE_LEVELS.deck+BRIDGE_GEOMETRY.postInsertion:terrainHeight(p)+.03,held?g.point.z:p.z);post.rotation.set(build.posts[id]||held?0:Math.PI/2,held?g.rotation:0,0);
   if(work?.kind==='post'&&work.object==='post:'+id&&!c.reducedMotion){post.position.y+=.16*(1-workProgress);post.rotation.z=Math.sin(workProgress*Math.PI*4)*.05*(1-workProgress);}
   const socket=postPoint(c,id);sockets[id].position.set(socket.x,BRIDGE_LEVELS.deck+.04,socket.z);sockets[id].visible=near&&!build.posts[id]&&(bridgeGesture||s.mode==='arrange');
  }
  const key=JSON.stringify([build,c.sections]);
  if(key!==storedKey||work?.kind==='tie'||lastWork==='tie'){
   storedKey=key;for(const side of ropeSides){const points=ropePoints(c,side);path(ropes[side],points,work?.kind==='tie'&&work.object==='rope:'+side&&!c.reducedMotion?.19*(1-workProgress)+.035:.035);knots(side,points);}
  }lastWork=work?.kind??'';
  for(const side of ropeSides){const id=('rope:'+side) as HandObject,p=handAnchor(s,id);ends[side].visible=hands.includes(id)&&g?.object!==id;ends[side].position.set(p.x,ropeHeight,p.z);}
  previewRing.visible=false;movingRope.count=0;movingRope.visible=!localReview;
  if(g?.object.startsWith('post:')){const target=postPoint(c,g.object.slice(5) as BridgePostId);previewRing.visible=true;previewRing.position.set(target.x,BRIDGE_LEVELS.deck+.06,target.z);}
  else if(g?.object==='rope:north'||g?.object==='rope:south'){
   const side=g.object.slice(5) as RopeSide,target=postPoint(c,ropeTarget(c,side)),snap=Math.hypot(target.x-g.point.x,target.z-g.point.z)<.34;
   previewRing.visible=true;previewRing.position.set(target.x,BRIDGE_LEVELS.deck+.06,target.z);
   const start=handAnchor(s,g.object),end=snap?target:g.point;
   // The free end travels at its physical post height, with slack. Near the
   // destination it wraps around the post instead of becoming an axis line.
   path(movingRope,[start,end],snap?.045:.15);
   if(snap){let n=movingRope.count;const turns=Array.from({length:25},(_,i)=>{const angle=i/24*Math.PI*4;return new T.Vector3(target.x+Math.cos(angle)*.087,ropeHeight-.035+i*.003,target.z+Math.sin(angle)*.087);});for(let i=1;i<turns.length;i++)segment(movingRope,turns[i-1]!,turns[i]!,n++);movingRope.count=n;movingRope.instanceMatrix.needsUpdate=true;}
  }else if(g?.object.startsWith('section:')&&s.preview){const p=s.preview[g.object==='section:a'?'a':'b'];previewRing.visible=true;previewRing.position.set(p.x,BRIDGE_LEVELS.deck+.05,p.z);previewRing.scale.set(2.3,2.3,2.3);}
  if(!g?.object.startsWith('section:'))previewRing.scale.setScalar(1);
  if(previewRing.visible)previewRing.rotation.z=c.reducedMotion?0:time*.35;
  return {posts:build.posts,ropes:build.ropes,first:build.first,secured:{a:sectionSecured(c,'a'),b:sectionSecured(c,'b')},status:bridgeStatus(c),work:work?.kind??null};
 }
 return {root,posts,ends,wraps,ropes,pickables:[...Object.values(posts),...Object.values(ends)],render,dispose(){for(const mesh of [...Object.values(ropes),...Object.values(wraps),movingRope])mesh.dispose();}};
}
