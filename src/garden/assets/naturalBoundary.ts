import * as T from 'three';
import type {PaperArt} from '../art.js';
import {WORLD,anchors,pointInPolygon,riverCenter,riverHalfWidth,terrainHeight,type WorldPoint} from '../worldLayout.js';

export type BoundarySample={edge:WorldPoint;outward:WorldPoint;start:WorldPoint;end:WorldPoint;startNormal:WorldPoint;endNormal:WorldPoint;length:number;bank:string;sequence:number};
const distance=(a:WorldPoint,b:WorldPoint)=>Math.hypot(a.x-b.x,a.z-b.z);
const segmentDistance=(point:WorldPoint,a:WorldPoint,b:WorldPoint)=>{const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((point.x-a.x)*dx+(point.z-a.z)*dz)/(dx*dx+dz*dz||1)));return Math.hypot(point.x-a.x-t*dx,point.z-a.z-t*dz);};

/** Display-only perimeter follows the authored bank edges. It never creates a
 * walkable surface, moves an anchor, or changes the navigation polygons. */
export function naturalBoundaryPlan():BoundarySample[]{
 const result:BoundarySample[]=[];
 for(const bank of WORLD.banks)for(let i=0;i<bank.polygon.length;i++){
  const a=bank.polygon[i]!,b=bank.polygon[(i+1)%bank.polygon.length]!,dx=b.x-a.x,dz=b.z-a.z,length=Math.hypot(dx,dz),parts=Math.max(1,Math.ceil(length/1.15));
  if(length<.001)continue;
  const normal={x:-dz/length,z:dx/length},middle={x:(a.x+b.x)/2,z:(a.z+b.z)/2};
  if(pointInPolygon({x:middle.x+normal.x*.08,z:middle.z+normal.z*.08},bank.polygon)){normal.x*=-1;normal.z*=-1;}
  const cornerNormal=(index:number)=>{
   const p=bank.polygon[(index-1+bank.polygon.length)%bank.polygon.length]!,q=bank.polygon[index]!,r=bank.polygon[(index+1)%bank.polygon.length]!;
   const side=(from:WorldPoint,to:WorldPoint)=>{const l=distance(from,to),n={x:-(to.z-from.z)/l,z:(to.x-from.x)/l},m={x:(from.x+to.x)/2,z:(from.z+to.z)/2};if(pointInPolygon({x:m.x+n.x*.08,z:m.z+n.z*.08},bank.polygon)){n.x*=-1;n.z*=-1;}return n;};
   const left=side(p,q),right=side(q,r),sum={x:left.x+right.x,z:left.z+right.z},l=Math.hypot(sum.x,sum.z)||1;
   sum.x/=l;sum.z/=l;const miter=Math.min(1.8,1/Math.max(.55,sum.x*right.x+sum.z*right.z));return {x:sum.x*miter,z:sum.z*miter};
  };
  for(let part=0;part<parts;part++){
   const t=(part+.5)/parts,edge={x:a.x+dx*t,z:a.z+dz*t};
   if(Math.abs(edge.x-riverCenter(edge.z))<riverHalfWidth(edge.z)+2.1)continue;
   if(distance(edge,anchors.dock.approach)<3.4||distance(edge,anchors.boat.landing)<3.2||distance(edge,anchors.crossing.narrow)<4.4||distance(edge,anchors.crossing.wide)<4.8)continue;
   if(WORLD.paths.some(route=>route.points.slice(1).some((to,index)=>segmentDistance(edge,route.points[index]!,to)<1.8)))continue;
   result.push({edge,outward:{...normal},start:{x:a.x+dx*part/parts,z:a.z+dz*part/parts},end:{x:a.x+dx*(part+1)/parts,z:a.z+dz*(part+1)/parts},startNormal:part===0?cornerNormal(i):{...normal},endNormal:part===parts-1?cornerNormal((i+1)%bank.polygon.length):{...normal},length:length/parts,bank:bank.id,sequence:result.length});
  }
 }
 return result;
}

/** Review-only natural outer boundary: low grassy earth folds, rounded stones
 * and irregular hedge clusters. All decoration lies beyond the walkable edge. */
export function makeNaturalBoundary(art:PaperArt,materials:{earth:T.Material;stone:T.Material;leaves:readonly T.Material[]}){
 const root=new T.Group();root.name='review-natural-outer-boundary';root.userData['approval']='review-only';
 const plan=naturalBoundaryPlan(),vertices:number[]=[],uv:number[]=[],stonePoses:T.Matrix4[]=[],leafPoses:T.Matrix4[][]=materials.leaves.map(()=>[]);
 const matrix=new T.Matrix4(),rotation=new T.Quaternion(),scale=new T.Vector3(),position=new T.Vector3();
 const append=(a:T.Vector3,b:T.Vector3,c:T.Vector3)=>{if(new T.Vector3().subVectors(b,a).cross(new T.Vector3().subVectors(c,a)).y<0)[b,c]=[c,b];for(const v of[a,b,c]){vertices.push(v.x,v.y,v.z);uv.push(v.x*.55,v.z*.55);}};
 for(const sample of plan){
  const {edge,outward:n,sequence:i}=sample,tangent={x:-n.z,z:n.x},variation=(Math.sin(i*2.399)+1)/2;
  // Adjacent strips share their exact edge and miter vertices. Continuous
  // endpoint noise keeps the earth folds joined around polygon corners.
  const point=(end:boolean,band:number)=>{const p=end?sample.end:sample.start,normal=end?sample.endNormal:sample.startNormal,v=(Math.sin(p.x*.71+p.z*.37)+1)/2,reach=2.1+v*.55,out=[-.018,.45,reach*.65,reach][band]!,height=terrainHeight(p);return new T.Vector3(p.x+normal.x*out,[height+.007,height+.08+v*.06,height-.23,-.53][band]!,p.z+normal.z*out);};
  for(let band=0;band<3;band++){const a=point(false,band),b=point(true,band),c=point(false,band+1),d=point(true,band+1);append(a,b,c);append(c,b,d);}
  const rockX=edge.x+n.x*.46,rockZ=edge.z+n.z*.46;
  if(i%3!==1){position.set(rockX,terrainHeight(edge)-.015,rockZ);rotation.setFromEuler(new T.Euler(.10*Math.sin(i),i*1.71,.12*Math.cos(i)));scale.set(.42+variation*.22,.22+variation*.13,.34+variation*.20);stonePoses.push(matrix.compose(position,rotation,scale).clone());}
  // Place vegetation outside the existing collision edge and lower than an
  // actor's torso. Uneven clusters leave the river and every arrival readable.
  if(i%7!==3)for(let j=0;j<3;j++){
   const along=(j-1)*.32,out=.72+(j%2)*.26,base=.20+variation*.16;
   position.set(edge.x+n.x*out+tangent.x*along,terrainHeight(edge)+base,edge.z+n.z*out+tangent.z*along);rotation.setFromAxisAngle(new T.Vector3(0,1,0),i+j*.7);scale.set(.33+variation*.13,base+.16,.32+variation*.15);leafPoses[(i+j)%leafPoses.length]!.push(matrix.compose(position,rotation,scale).clone());
  }
 }
 const ground=new T.BufferGeometry();ground.setAttribute('position',new T.Float32BufferAttribute(vertices,3));ground.setAttribute('uv',new T.Float32BufferAttribute(uv,2));ground.computeVertexNormals();art.resources.add(ground);const berm=new T.Mesh(ground,materials.earth);berm.receiveShadow=true;root.add(berm);
 const stone=new T.IcosahedronGeometry(1,2),leaf=new T.SphereGeometry(1,10,7);art.resources.add(stone);art.resources.add(leaf);
 function instances(geometry:T.BufferGeometry,material:T.Material,poses:T.Matrix4[]){const mesh=new T.InstancedMesh(geometry,material,poses.length);poses.forEach((pose,index)=>mesh.setMatrixAt(index,pose));mesh.castShadow=true;mesh.receiveShadow=true;mesh.computeBoundingBox();mesh.computeBoundingSphere();root.add(mesh);return mesh;}
 instances(stone,materials.stone,stonePoses);leafPoses.forEach((poses,i)=>instances(leaf,materials.leaves[i]!,poses));
 return {root,plan,description:'Low earth folds, rounded stones and irregular hedges follow the outer bank polygons, leaving river edges, paths and arrival clearances open.',counts:{samples:plan.length,bermTriangles:vertices.length/9,stones:stonePoses.length,foliage:leafPoses.reduce((sum,list)=>sum+list.length,0),draws:2+materials.leaves.length}};
}
