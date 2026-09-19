import * as T from 'three';
import type {PaperArt} from './art.js';

/** Committed cut coordinates partition one lump. This adapter neither judges
 * portion sizes nor advances baking; those decisions belong to the store. */
export function doughIntervals(cuts:readonly number[]):Array<readonly [number,number]>{
 const edges=[-.36,...cuts.filter(n=>Number.isFinite(n)&&n>-.36&&n<.36).sort((a,b)=>a-b),.36];
 return edges.slice(1).map((right,i)=>[edges[i]!,right]);
}
function sliceGeometry(left:number,right:number){
 const positions:number[]=[],sides=20,steps=12;
 const point=(x:number,angle:number)=>{const radius=Math.sqrt(Math.max(0,1-(x/.36)**2));return [x,.11*radius*Math.cos(angle),.23*radius*Math.sin(angle)] as const;};
 const triangle=(...points:ReadonlyArray<readonly number[]>)=>{for(const p of points)positions.push(...p);};
 for(let i=0;i<steps;i++)for(let j=0;j<sides;j++){
  const x=left+(right-left)*i/steps,next=left+(right-left)*(i+1)/steps,angle=j*2*Math.PI/sides,after=(j+1)*2*Math.PI/sides;
  const a=point(x,angle),b=point(x,after),c=point(next,angle),d=point(next,after);triangle(a,b,c);triangle(b,d,c);
 }
 for(let j=0;j<sides;j++){
  const angle=j*2*Math.PI/sides,after=(j+1)*2*Math.PI/sides;
  triangle([left,0,0],point(left,after),point(left,angle));triangle([right,0,0],point(right,angle),point(right,after));
 }
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.computeVertexNormals();return geometry;
}
export function makeDoughPortions(art:PaperArt){
 const root=new T.Group(),pieces:T.Mesh[]=[];let key='';
 const clear=()=>{for(const piece of pieces){piece.geometry.dispose();art.resources.delete(piece.geometry);root.remove(piece);}pieces.length=0;};
 function sync(cuts:readonly number[],spread=1){
  const next=cuts.join(',');if(next!==key||!pieces.length){clear();key=next;
   for(const [left,right] of doughIntervals(cuts)){const geometry=sliceGeometry(left,right);art.resources.add(geometry);const piece=new T.Mesh(geometry,art.material('#f0d4a4'));piece.castShadow=piece.receiveShadow=true;root.add(piece);pieces.push(piece);}
  }
  pieces.forEach((piece,i)=>{piece.position.x=(i-(pieces.length-1)/2)*.025*spread;});
 }
 return {root,sync,clear};
}
