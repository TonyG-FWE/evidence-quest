/** Remove only the duplicate porch table from a supplied working copy. */
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {NodeIO} from '@gltf-transform/core';
import sharp from 'sharp';

const source='output/tripo-reference-batches-20260917/New 3D Objects Evidence Quest/wooden+cottage+3d+model (1).glb';
const expected='bc475a88992a00fad0624e6751a2ba340b67ba5d1c25f8da4ade359a960168fb';
const output='output/screenshot-repairs-20260918/workshop';
const hash=b=>createHash('sha256').update(b).digest('hex');
const bytes=await fs.readFile(source);if(hash(bytes)!==expected)throw Error('Workshop original source changed.');
const io=new NodeIO(),document=await io.readBinary(bytes),primitive=document.getRoot().listMeshes()[0].listPrimitives()[0];
const positions=primitive.getAttribute('POSITION').getArray(),uv=primitive.getAttribute('TEXCOORD_0').getArray(),indices=primitive.getIndices().getArray();
const textureBytes=primitive.getMaterial().getBaseColorTexture().getImage();
const texture=await sharp(textureBytes).ensureAlpha().raw().toBuffer({resolveWithObject:true});
await fs.mkdir(output,{recursive:true});

// Orthographic source UV views make the extraction envelope reviewable. These
// are diagnostic renders of existing artwork, not newly generated textures.
async function render(name,axis,triangles){
 const size=800,pixels=Buffer.alloc(size*size*4,0),depth=new Float32Array(size*size).fill(-Infinity);
 const project=id=>{const x=positions[id*3],y=positions[id*3+1],z=positions[id*3+2];return axis==='top'?[x,-z,y]:axis==='front'?[x,y,z]:axis==='rear'?[-x,y,-z]:axis==='side'?[-z,y,x]:[z,y,-x];};
 const view=Array.from({length:positions.length/3},(_,id)=>project(id));
 const bounds=view.reduce((b,p)=>[Math.min(b[0],p[0]),Math.min(b[1],p[1]),Math.max(b[2],p[0]),Math.max(b[3],p[1])],[Infinity,Infinity,-Infinity,-Infinity]);
 const scale=720/Math.max(bounds[2]-bounds[0],bounds[3]-bounds[1]),center=(bounds[0]+bounds[2])/2;
 const pixel=p=>[400+(p[0]-center)*scale,760-(p[1]-bounds[1])*scale,p[2]];
 for(let i=0;i<triangles.length;i+=3){
  const ids=[triangles[i],triangles[i+1],triangles[i+2]],p=ids.map(id=>pixel(view[id])),[a,b,c]=p,den=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);if(Math.abs(den)<1e-9)continue;
  const minX=Math.max(0,Math.floor(Math.min(...p.map(v=>v[0])))),maxX=Math.min(size-1,Math.ceil(Math.max(...p.map(v=>v[0])))),minY=Math.max(0,Math.floor(Math.min(...p.map(v=>v[1])))),maxY=Math.min(size-1,Math.ceil(Math.max(...p.map(v=>v[1]))));
  for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++){
   const wa=((b[1]-c[1])*(x-c[0])+(c[0]-b[0])*(y-c[1]))/den,wb=((c[1]-a[1])*(x-c[0])+(a[0]-c[0])*(y-c[1]))/den,wc=1-wa-wb;if(Math.min(wa,wb,wc)<-1e-7)continue;
   const d=wa*a[2]+wb*b[2]+wc*c[2],offset=y*size+x;if(d<depth[offset])continue;depth[offset]=d;
   const u=wa*uv[ids[0]*2]+wb*uv[ids[1]*2]+wc*uv[ids[2]*2],v=wa*uv[ids[0]*2+1]+wb*uv[ids[1]*2+1]+wc*uv[ids[2]*2+1];
   const tx=Math.max(0,Math.min(texture.info.width-1,Math.round(u*(texture.info.width-1)))),ty=Math.max(0,Math.min(texture.info.height-1,Math.round(v*(texture.info.height-1)))),q=(ty*texture.info.width+tx)*4;
   texture.data.copy(pixels,offset*4,q,q+4);
  }
 }
 await sharp(pixels,{raw:{width:size,height:size,channels:4}}).flatten({background:'#eee7da'}).png().toFile(`${output}/${name}-${axis}.png`);
 return {axis,bounds,scale,center,originY:760};
}
if(process.argv.includes('--inspect')){
 const views=[];for(const axis of ['front','rear','side','other'])views.push(await render('source',axis,indices));
 const low=[];for(let i=0;i<indices.length;i+=3)if([indices[i],indices[i+1],indices[i+2]].every(id=>positions[id*3+1]<.16))low.push(indices[i],indices[i+1],indices[i+2]);
 views.push(await render('low-source','top',low));
 await fs.writeFile(`${output}/source-views.json`,JSON.stringify({source,sourceSha256:expected,views},null,2)+'\n');
 console.log(JSON.stringify({output,views}));
}else{
 // Weld UV seams only for component identification. Retained vertex buffers,
 // normals, UVs and material images are never changed or re-authored.
 const parent=Array.from({length:positions.length/3},(_,i)=>i),weld=new Map();
 const find=i=>parent[i]===i?i:(parent[i]=find(parent[i]));
 const join=(a,b)=>parent[find(a)]=find(b);
 for(let i=0;i<parent.length;i++){
  const key=[positions[i*3],positions[i*3+1],positions[i*3+2]].map(x=>Math.round(x*100000)).join(',');
  if(weld.has(key))join(i,weld.get(key));else weld.set(key,i);
 }
 for(let i=0;i<indices.length;i+=3){join(indices[i],indices[i+1]);join(indices[i],indices[i+2]);}
 const parts=new Map();
 for(let i=0;i<indices.length;i+=3){
  const root=find(indices[i]),part=parts.get(root)??{root,triangles:0,min:[Infinity,Infinity,Infinity],max:[-Infinity,-Infinity,-Infinity]};part.triangles++;
  for(const id of [indices[i],indices[i+1],indices[i+2]])for(let c=0;c<3;c++){part.min[c]=Math.min(part.min[c],positions[id*3+c]);part.max[c]=Math.max(part.max[c],positions[id*3+c]);}
  parts.set(root,part);
 }
 const tables=[...parts.values()].filter(p=>p.triangles===2298&&p.min[0]>.09&&p.max[0]<.25&&p.max[1]<.14&&p.min[2]>-.14&&p.max[2]<.12);
 if(tables.length!==1)throw Error('The measured independent porch table component is not unique.');
 const table=tables[0],keep=[];
 for(let i=0;i<indices.length;i+=3)if(find(indices[i])!==table.root)keep.push(indices[i],indices[i+1],indices[i+2]);
 primitive.getIndices().setArray(new Uint32Array(keep));
 const target=`${output}/workshop-clear-porch.glb`;await io.write(target,document);
 for(const axis of ['side','rear'])await render('clear-porch',axis,keep);
 const result=await fs.readFile(target),roundTrip=await io.readBinary(result),retained=roundTrip.getRoot().listMeshes()[0].listPrimitives()[0];
 const same=(a,b)=>a.length===b.length&&a.every((value,i)=>Object.is(value,b[i]));
 const proof={createdAt:new Date().toISOString(),source,sourceSha256:expected,output:target,outputSha256:hash(result),sourceTriangles:indices.length/3,retainedTriangles:keep.length/3,removedComponent:table,method:'Index-only removal of the measured disconnected porch-table component; welded position topology is used for identification only.',sourceUnchanged:hash(await fs.readFile(source))===expected,positionsPreserved:same(positions,retained.getAttribute('POSITION').getArray()),uvsPreserved:same(uv,retained.getAttribute('TEXCOORD_0').getArray()),normalsPreserved:same(primitive.getAttribute('NORMAL').getArray(),retained.getAttribute('NORMAL').getArray()),baseColorBytesPreserved:hash(textureBytes)===hash(retained.getMaterial().getBaseColorTexture().getImage()),providerRequests:0,review:'Source UV side/rear previews inspected separately; in-game placement pending.'};
 if(!proof.sourceUnchanged||!proof.positionsPreserved||!proof.uvsPreserved||!proof.normalsPreserved||!proof.baseColorBytesPreserved)throw Error('Working copy preservation check failed.');
 await fs.writeFile(`${output}/provenance.json`,JSON.stringify(proof,null,2)+'\n');console.log(JSON.stringify(proof));
}
