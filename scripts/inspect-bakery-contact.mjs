import fs from 'node:fs/promises';
import * as T from 'three';
import {loadPilotGeometry} from './pilot-glb.mjs';
const rows=[];
for(const name of ['bakery+shop+3d+model.glb','wooden+bakery+3d+model.glb']){
 const source='output/tripo-reference-batches-20260917/New 3D Objects Evidence Quest/'+name,g=await loadPilotGeometry(source),box=new T.Box3().setFromObject(g.scene),n=96,width=box.max.x-box.min.x,depth=box.max.z-box.min.z,heights=new Float64Array(n*n).fill(-Infinity),a=new T.Vector3(),b=new T.Vector3(),c=new T.Vector3();
 g.scene.updateMatrixWorld(true);
 g.scene.traverse(mesh=>{if(!mesh.isMesh)return;const p=mesh.geometry.attributes.position,idx=mesh.geometry.index,count=idx?.count??p.count;
  for(let i=0;i<count;i+=3){a.fromBufferAttribute(p,idx?idx.getX(i):i).applyMatrix4(mesh.matrixWorld);b.fromBufferAttribute(p,idx?idx.getX(i+1):i+1).applyMatrix4(mesh.matrixWorld);c.fromBufferAttribute(p,idx?idx.getX(i+2):i+2).applyMatrix4(mesh.matrixWorld);
   const den=(b.z-c.z)*(a.x-c.x)+(c.x-b.x)*(a.z-c.z);if(Math.abs(den)<1e-12)continue;
   const x0=Math.max(0,Math.floor((Math.min(a.x,b.x,c.x)-box.min.x)/width*n)),x1=Math.min(n-1,Math.ceil((Math.max(a.x,b.x,c.x)-box.min.x)/width*n)),z0=Math.max(0,Math.floor((Math.min(a.z,b.z,c.z)-box.min.z)/depth*n)),z1=Math.min(n-1,Math.ceil((Math.max(a.z,b.z,c.z)-box.min.z)/depth*n));
   for(let iz=z0;iz<=z1;iz++)for(let ix=x0;ix<=x1;ix++){const x=box.min.x+(ix+.5)*width/n,z=box.min.z+(iz+.5)*depth/n,u=((b.z-c.z)*(x-c.x)+(c.x-b.x)*(z-c.z))/den,v=((c.z-a.z)*(x-c.x)+(a.x-c.x)*(z-c.z))/den,w=1-u-v;if(u>=0&&v>=0&&w>=0)heights[iz*n+ix]=Math.max(heights[iz*n+ix],u*a.y+v*b.y+w*c.y);}
  }
 });
 const holes=[];for(let z=5;z<n-5;z++)for(let x=5;x<n-5;x++){const y=heights[z*n+x],around=[heights[(z-4)*n+x],heights[(z+4)*n+x],heights[z*n+x-4],heights[z*n+x+4]].sort((a,b)=>a-b);if(around[1]-y>.10&&around[1]>.50)holes.push({x:box.min.x+(x+.5)*width/n,y,z:box.min.z+(z+.5)*depth/n,rim:around[1]});}
 const opening=[];for(let ix=0;ix<n;ix++){const column=[];for(let iz=10;iz<45;iz++)if(Number.isFinite(heights[iz*n+ix]))column.push(heights[iz*n+ix]);column.sort((a,b)=>a-b);const rim=column[Math.floor(column.length*.8)];for(let iz=10;iz<45;iz++){const y=heights[iz*n+ix],x=box.min.x+(ix+.5)*width/n,z=box.min.z+(iz+.5)*depth/n;if(x>.05&&x<.30&&y>.40&&y<rim-.08)opening.push([x,y,z]);}}
 const openingBounds=opening.length?{min:[0,1,2].map(i=>Math.min(...opening.map(p=>p[i]))),max:[0,1,2].map(i=>Math.max(...opening.map(p=>p[i])))}:null;
 const summary={source,bounds:{min:box.min.toArray(),max:box.max.toArray()},depressionSamples:holes,openingBounds};rows.push(summary);
 const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480">'+Array.from(heights,(h,i)=>`<rect x="${i%n*5}" y="${Math.floor(i/n)*5}" width="5" height="5" fill="${Number.isFinite(h)?`hsl(${240-h/box.max.y*240} 75% 52%)`:'#fff'}"/>`).join('')+'</svg>';await fs.writeFile('evidence/final-demo-20260918/'+name.replace('.glb','-height.svg'),svg);
 console.log(name,JSON.stringify(openingBounds));
}
await fs.writeFile('evidence/final-demo-20260918/bakery-contact.json',JSON.stringify(rows,null,2)+'\n');
