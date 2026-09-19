/** Source-derived shore materials. CPU only; source GLBs are never written. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
import {NodeIO} from '@gltf-transform/core';

const directory='output/personal-landscape-20260918/shore';
const sourceDirectory='output/tripo-reference-batches-20260917/New 3D Objects Evidence Quest';
const hash=b=>createHash('sha256').update(b).digest('hex');
const waterSwatch={id:'river-water',source:'coastal',crop:{left:831,top:636,width:133,height:133},derivation:'Foam-free original cyan paint crop; corresponding edge pixels blended across a 16-pixel border for continuous repeat; no generated artwork or color tint'};
async function prepareWater(){
 const {data,info}=await sharp(path.join(directory,'coastal-top.png')).extract(waterSwatch.crop).ensureAlpha().raw().toBuffer({resolveWithObject:true}),{width,height}=info,band=16;
 // Each side converges on the same mean of its original paired edge. Interior
 // artwork is untouched; blending contains only original source color samples.
 for(let y=0;y<height;y++)for(let d=0;d<band;d++){const a=(y*width+d)*4,b=(y*width+width-1-d)*4,w=(1-d/band)*.5;for(let c=0;c<3;c++){const left=data[a+c],right=data[b+c];data[a+c]=Math.round(left*(1-w)+right*w);data[b+c]=Math.round(right*(1-w)+left*w);}}
 for(let x=0;x<width;x++)for(let d=0;d<band;d++){const a=(d*width+x)*4,b=((height-1-d)*width+x)*4,w=(1-d/band)*.5;for(let c=0;c<3;c++){const top=data[a+c],bottom=data[b+c];data[a+c]=Math.round(top*(1-w)+bottom*w);data[b+c]=Math.round(bottom*(1-w)+top*w);}}
 await sharp(data,{raw:{width,height,channels:4}}).png().toFile(path.join(directory,'river-water.png'));
}
await fs.mkdir(directory,{recursive:true});
if(process.argv.includes('--water-only')){
 const receiptPath=path.join(directory,'provenance.json'),receipt=JSON.parse(await fs.readFile(receiptPath,'utf8'));
 for(const source of receipt.sources)if(hash(await fs.readFile(source.source))!==source.sourceSha256)throw Error('Source changed before water preparation');
 await prepareWater();const bytes=await fs.readFile(path.join(directory,'river-water.png'));
 receipt.swatches=receipt.swatches.map(s=>s.id==='river-water'?waterSwatch:s);receipt.outputs=receipt.outputs.map(o=>o.file==='river-water.png'?{file:o.file,sha256:hash(bytes),bytes:bytes.length}:o);receipt.waterRevisedAt=new Date().toISOString();receipt.waterVisualReview='PENDING_QUIET_SWATCH';
 await fs.writeFile(receiptPath,JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify({waterSwatch,sha256:hash(bytes),bytes:bytes.length}));process.exit(0);
}
const sources=[];
for(const [id,file] of [['coastal','coastal+island+3d+model.glb'],['riverbank','riverbank+diorama+3d+model.glb'],['grassy-bank','grass+island+3d+model.glb']]){
 const source=path.join(sourceDirectory,file),bytes=await fs.readFile(source),document=await new NodeIO().readBinary(bytes),primitive=document.getRoot().listMeshes()[0].listPrimitives()[0],position=primitive.getAttribute('POSITION').getArray(),uv=primitive.getAttribute('TEXCOORD_0').getArray(),indices=primitive.getIndices().getArray();
 const texture=primitive.getMaterial().getBaseColorTexture(),textureBytes=texture.getImage(),image=await sharp(textureBytes).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const size=1024,pixels=Buffer.alloc(size*size*4),heights=new Float32Array(size*size).fill(-Infinity),bounds=[Infinity,Infinity,-Infinity,-Infinity];
 for(let i=0;i<position.length;i+=3){bounds[0]=Math.min(bounds[0],position[i]);bounds[1]=Math.min(bounds[1],position[i+2]);bounds[2]=Math.max(bounds[2],position[i]);bounds[3]=Math.max(bounds[3],position[i+2]);}
 const project=i=>[(position[i*3]-bounds[0])/(bounds[2]-bounds[0])*(size-1),(position[i*3+2]-bounds[1])/(bounds[3]-bounds[1])*(size-1)];
 for(let i=0;i<indices.length;i+=3){
  const ids=[indices[i],indices[i+1],indices[i+2]],p=ids.map(project),den=(p[1][1]-p[2][1])*(p[0][0]-p[2][0])+(p[2][0]-p[1][0])*(p[0][1]-p[2][1]);if(Math.abs(den)<.00001)continue;
  const minX=Math.max(0,Math.floor(Math.min(...p.map(v=>v[0])))),maxX=Math.min(size-1,Math.ceil(Math.max(...p.map(v=>v[0])))),minY=Math.max(0,Math.floor(Math.min(...p.map(v=>v[1])))),maxY=Math.min(size-1,Math.ceil(Math.max(...p.map(v=>v[1]))));
  for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++){
   const a=((p[1][1]-p[2][1])*(x-p[2][0])+(p[2][0]-p[1][0])*(y-p[2][1]))/den,b=((p[2][1]-p[0][1])*(x-p[2][0])+(p[0][0]-p[2][0])*(y-p[2][1]))/den,c=1-a-b;if(a<-.0001||b<-.0001||c<-.0001)continue;
   const h=position[ids[0]*3+1]*a+position[ids[1]*3+1]*b+position[ids[2]*3+1]*c,index=y*size+x;if(h<heights[index])continue;
   const u=uv[ids[0]*2]*a+uv[ids[1]*2]*b+uv[ids[2]*2]*c,v=uv[ids[0]*2+1]*a+uv[ids[1]*2+1]*b+uv[ids[2]*2+1]*c,tx=Math.min(image.info.width-1,Math.max(0,Math.floor(u*image.info.width))),ty=Math.min(image.info.height-1,Math.max(0,Math.floor(v*image.info.height))),offset=(ty*image.info.width+tx)*4;
   image.data.copy(pixels,index*4,offset,offset+4);heights[index]=h;
  }
 }
 await sharp(pixels,{raw:{width:size,height:size,channels:4}}).png().toFile(path.join(directory,id+'-top.png'));
 await fs.writeFile(path.join(directory,id+'-heights.bin'),Buffer.from(heights.buffer));
 const receipt={id,source,sourceSha256:hash(bytes),textureSha256:hash(textureBytes),triangles:indices.length/3,bounds,projection:'1024 square top projection; topmost triangle; original UV color, no generated artwork'};
 if(id!=='grassy-bank'){
  const keep=[];
  for(let i=0;i<indices.length;i+=3){
   const ids=[indices[i],indices[i+1],indices[i+2]],maxY=Math.max(...ids.map(v=>position[v*3+1])),meanY=ids.reduce((sum,v)=>sum+position[v*3+1],0)/3;
   const u=ids.reduce((sum,v)=>sum+uv[v*2],0)/3,v=ids.reduce((sum,v)=>sum+uv[v*2+1],0)/3,px=Math.min(image.info.width-1,Math.max(0,Math.floor(u*image.info.width))),py=Math.min(image.info.height-1,Math.max(0,Math.floor(v*image.info.height))),off=(py*image.info.width+px)*4,[r,g,b]=image.data.subarray(off,off+3);
   // Painted cyan water, its white current strokes and the low diorama base
   // are omitted. Source soil, stones and raised vegetation keep exact UVs.
   const aqua=g>r*1.08&&b>r*1.04,lowWater=maxY<.069||(meanY<.083&&aqua),underneath=maxY<.033;
   if(!aqua&&!lowWater&&!underneath)keep.push(...ids);
  }
  primitive.getIndices().setArray(new Uint32Array(keep));
  const landFile=path.join(directory,id+'-land.glb');await new NodeIO().write(landFile,document);
  receipt.derivedLand={file:landFile,sha256:hash(await fs.readFile(landFile)),triangles:keep.length/3,removedTriangles:(indices.length-keep.length)/3,method:'Original vertex/UV/material data; index-only omission of cyan water, low current strokes and diorama underside; separate raised details retain shape',visualReview:'PENDING'};
 }
 sources.push(receipt);
}
// Selected source-only swatches deliberately exclude painted plants/rocks.
// Mirrored wrapping supplies continuity without invented texture pixels.
const swatches=[
 {id:'bank-top',source:'grassy-bank',crop:{left:516,top:449,width:220,height:224}},
 waterSwatch,
];
for(const swatch of swatches)if(swatch.id==='river-water')await prepareWater();else await sharp(path.join(directory,swatch.source+'-top.png')).extract(swatch.crop).png().toFile(path.join(directory,swatch.id+'.png'));
// Select a clean original soil square from the UV atlas instead of stretching
// the thin top-view projection of the vertical ochre bank face.
{
 const coastal=await new NodeIO().read(path.join(sourceDirectory,'coastal+island+3d+model.glb')),primitive=coastal.getRoot().listMeshes()[0].listPrimitives()[0],texture=primitive.getMaterial().getBaseColorTexture(),raw=await sharp(texture.getImage()).ensureAlpha().raw().toBuffer({resolveWithObject:true}),{width,height}=raw.info;
 const uv=primitive.getAttribute('TEXCOORD_0').getArray(),indices=primitive.getIndices().getArray(),coverage=new Uint8Array(width*height);
 for(let i=0;i<indices.length;i+=3){const p=[indices[i],indices[i+1],indices[i+2]].map(v=>[uv[v*2]*width,uv[v*2+1]*height]),den=(p[1][1]-p[2][1])*(p[0][0]-p[2][0])+(p[2][0]-p[1][0])*(p[0][1]-p[2][1]);if(Math.abs(den)<.0001)continue;
  for(let y=Math.max(0,Math.floor(Math.min(...p.map(v=>v[1]))));y<=Math.min(height-1,Math.ceil(Math.max(...p.map(v=>v[1]))));y++)for(let x=Math.max(0,Math.floor(Math.min(...p.map(v=>v[0]))));x<=Math.min(width-1,Math.ceil(Math.max(...p.map(v=>v[0]))));x++){const a=((p[1][1]-p[2][1])*(x-p[2][0])+(p[2][0]-p[1][0])*(y-p[2][1]))/den,b=((p[2][1]-p[0][1])*(x-p[2][0])+(p[0][0]-p[2][0])*(y-p[2][1]))/den;if(a>=0&&b>=0&&a+b<=1)coverage[y*width+x]=1;}
 }
 const squares=new Uint16Array(width*height);let best={size:0,x:0,y:0};
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){const i=y*width+x,o=i*4,[r,g,b]=raw.data.subarray(o,o+3);if(coverage[i]&&r>g*1.12&&g>b*1.22&&r>130&&g>80){const value=x&&y?1+Math.min(squares[i-1],squares[i-width],squares[i-width-1]):1;squares[i]=value;if(value>best.size)best={size:value,x:x-value+1,y:y-value+1};}}
 if(best.size<12)throw Error('No sufficiently sized source soil patch');
 const crop={left:best.x,top:best.y,width:best.size,height:best.size};await sharp(texture.getImage()).extract(crop).png().toFile(path.join(directory,'bank-soil.png'));
 swatches.push({id:'bank-soil',source:'coastal-original-UV-atlas',crop});
}
const outputs=[];for(const file of await fs.readdir(directory)){if(!/\.(png|glb)$/.test(file))continue;const bytes=await fs.readFile(path.join(directory,file));outputs.push({file,sha256:hash(bytes),bytes:bytes.length});}
for(const source of sources)if(hash(await fs.readFile(source.source))!==source.sourceSha256)throw Error('Source changed during preparation');
await fs.writeFile(path.join(directory,'provenance.json'),JSON.stringify({createdAt:new Date().toISOString(),sources,swatches,outputs,sourceBytesUnchanged:true,providerRequests:0,scope:'Derived source shoreline working copies and UV swatches; no grass generation or alteration',visualReview:'PENDING'},null,2)+'\n');
console.log(JSON.stringify({sources,swatches},null,2));
