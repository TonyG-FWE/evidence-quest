/** Read-only source geometry/UV evidence for the approved duplicated deck. */
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {NodeIO} from '@gltf-transform/core';
import sharp from 'sharp';
const manifest=JSON.parse(await fs.readFile('.cache/final-demo-review/assets/manifest.json','utf8'));
const entry=manifest.assets.bridge,working=process.argv.includes('--working'),source=working?'output/screenshot-repairs-20260918/bridge/bridge-fitted-planks.glb':entry.resources.source,bytes=await fs.readFile(source);
const sourceHash=createHash('sha256').update(bytes).digest('hex');
if(!working&&sourceHash!==entry.sourceSha256)throw Error('Bridge source no longer matches its manifest.');
const document=await new NodeIO().readBinary(bytes),primitive=document.getRoot().listMeshes()[0].listPrimitives()[0];
const uv=[],indices=[],points=[],scale=entry.normalization.scale[0];
// Source normalization followed by the current +90 degree yaw. X is crossing
// length, Z is walking width; no model or source attribute is written.
for(const node of document.getRoot().listNodes())if(node.getMesh())for(const primitive of node.getMesh().listPrimitives()){
 const positions=primitive.getAttribute('POSITION').getArray(),texcoords=primitive.getAttribute('TEXCOORD_0').getArray(),remap=new Map(),m=node.getWorldMatrix();
 for(const index of primitive.getIndices().getArray()){
  if(!remap.has(index)){const x=positions[index*3],y=positions[index*3+1],z=positions[index*3+2],nx=m[0]*x+m[4]*y+m[8]*z+m[12],ny=m[1]*x+m[5]*y+m[9]*z+m[13],nz=m[2]*x+m[6]*y+m[10]*z+m[14];remap.set(index,points.length);points.push([nz*scale,ny*scale,-nx*scale]);uv.push(texcoords[index*2],texcoords[index*2+1]);}
  indices.push(remap.get(index));
 }
}
const bounds=points.reduce((b,q)=>({min:b.min.map((v,i)=>Math.min(v,q[i])),max:b.max.map((v,i)=>Math.max(v,q[i]))}),{min:[Infinity,Infinity,Infinity],max:[-Infinity,-Infinity,-Infinity]});
const texture=await sharp(primitive.getMaterial().getBaseColorTexture().getImage()).ensureAlpha().raw().toBuffer({resolveWithObject:true});
const size=1000,pixels=Buffer.alloc(size*size*4),depth=new Float32Array(size*size).fill(-Infinity),factor=880/Math.max(bounds.max[0]-bounds.min[0],bounds.max[2]-bounds.min[2]);
const project=q=>[500+q[0]*factor,500+q[2]*factor,q[1]];
for(let i=0;i<indices.length;i+=3){
 const ids=[indices[i],indices[i+1],indices[i+2]],v=ids.map(id=>project(points[id])),[a,b,c]=v,den=(b[1]-c[1])*(a[0]-c[0])+(c[0]-b[0])*(a[1]-c[1]);if(Math.abs(den)<1e-9)continue;
 const minX=Math.max(0,Math.floor(Math.min(...v.map(q=>q[0])))),maxX=Math.min(size-1,Math.ceil(Math.max(...v.map(q=>q[0])))),minY=Math.max(0,Math.floor(Math.min(...v.map(q=>q[1])))),maxY=Math.min(size-1,Math.ceil(Math.max(...v.map(q=>q[1]))));
 for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++){
  const wa=((b[1]-c[1])*(x-c[0])+(c[0]-b[0])*(y-c[1]))/den,wb=((c[1]-a[1])*(x-c[0])+(a[0]-c[0])*(y-c[1]))/den,wc=1-wa-wb;if(Math.min(wa,wb,wc)<-1e-7)continue;
  const d=wa*a[2]+wb*b[2]+wc*c[2],offset=y*size+x;if(d<depth[offset])continue;depth[offset]=d;
  const u=wa*uv[ids[0]*2]+wb*uv[ids[1]*2]+wc*uv[ids[2]*2],t=wa*uv[ids[0]*2+1]+wb*uv[ids[1]*2+1]+wc*uv[ids[2]*2+1];
  const tx=Math.max(0,Math.min(texture.info.width-1,Math.round(u*(texture.info.width-1)))),ty=Math.max(0,Math.min(texture.info.height-1,Math.round(t*(texture.info.height-1)))),q=(ty*texture.info.width+tx)*4;texture.data.copy(pixels,offset*4,q,q+4);
 }
}
const output=working?'output/screenshot-repairs-20260918/bridge':'evidence/screenshot-repairs-20260918/bridge-source';await fs.mkdir(output,{recursive:true});
await sharp(pixels,{raw:{width:size,height:size,channels:4}}).flatten({background:'#eee7da'}).png().toFile(`${output}/deck-top.png`);
const heightAt=(x,z)=>{const px=Math.round(500+x*factor),py=Math.round(500+z*factor),height=depth[py*size+px];return Number.isFinite(height)?height:null;};
const sockets=(working?[[-.62,-.315],[.62,-.315],[-.62,.315],[.62,.315]]:[[-.623,-.328],[.621,-.321],[-.623,.306],[.621,.294]]).map(([x,z])=>({center:{x,z},floor:heightAt(x,z),rimSamples:[heightAt(x-.048,z),heightAt(x+.048,z),heightAt(x,z-.05),heightAt(x,z+.05)]}));
const bands=[];for(let x=-.8;x<=.801;x+=.05){const rows=points.filter(q=>Math.abs(q[0]-x)<.025);if(rows.length)bands.push({x:Number(x.toFixed(3)),minZ:Math.min(...rows.map(q=>q[2])),maxZ:Math.max(...rows.map(q=>q[2])),maxY:Math.max(...rows.map(q=>q[1]))});}
const result={source,sourceHash,normalizedYaw:Math.PI/2,bounds,pixelToWorld:{origin:[500,500],pixelsPerMetre:factor,axes:['+X right','+Z down']},sockets,bands,originalUnchanged:createHash('sha256').update(await fs.readFile(entry.resources.source)).digest('hex')===entry.sourceSha256};
await fs.writeFile(`${output}/measurements.json`,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
