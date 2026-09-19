/** Derive a path material from the supplied garden model. Originals stay immutable. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import sharp from 'sharp';

const source='output/tripo-reference-batches-20260917/New 3D Objects Evidence Quest/garden+path+3d+model.glb';
const expectedSha='3e355b7bf9bc5fe7550a3d3c9126cd28ba3c8fbd3164e660310476d2f6b4074c';
const output='output/personal-landscape-20260918/path';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const bytes=await fs.readFile(source);
if(sha(bytes)!==expectedSha)throw Error('Garden source hash changed; inspect the source before deriving a new surface.');
await fs.mkdir(output,{recursive:true});
const jsonLength=bytes.readUInt32LE(12),gltf=JSON.parse(bytes.subarray(20,20+jsonLength).toString().trim()),bin=28+jsonLength;
const primitive=gltf.meshes[0].primitives[0];
function attribute(id){
 const accessor=gltf.accessors[id],view=gltf.bufferViews[accessor.bufferView],components={SCALAR:1,VEC2:2,VEC3:3}[accessor.type],size={5123:2,5125:4,5126:4}[accessor.componentType];
 const read={5123:'readUInt16LE',5125:'readUInt32LE',5126:'readFloatLE'}[accessor.componentType];
 return {count:accessor.count,get:(index,component=0)=>bytes[read](bin+(view.byteOffset??0)+(accessor.byteOffset??0)+index*(view.byteStride??size*components)+component*size)};
}
const positions=attribute(primitive.attributes.POSITION),normals=attribute(primitive.attributes.NORMAL),uv=attribute(primitive.attributes.TEXCOORD_0),indices=attribute(primitive.indices);
const image=gltf.images[gltf.textures[gltf.materials[primitive.material].pbrMetallicRoughness.baseColorTexture.index].source],imageView=gltf.bufferViews[image.bufferView];
const imageBytes=bytes.subarray(bin+imageView.byteOffset,bin+imageView.byteOffset+imageView.byteLength);
const decoded=await sharp(imageBytes).removeAlpha().raw().toBuffer({resolveWithObject:true});
const resolution=1024,minX=-.5,maxX=.5,minZ=-.5,maxZ=.5;
const top=new Float32Array(resolution*resolution).fill(-Infinity),rgb=Buffer.alloc(resolution*resolution*3,230);
const triangleGrid=new Map();
const pixelX=x=>(x-minX)/(maxX-minX)*(resolution-1),pixelZ=z=>(z-minZ)/(maxZ-minZ)*(resolution-1);
for(let i=0;i<indices.count;i+=3){
 const ids=[indices.get(i),indices.get(i+1),indices.get(i+2)],v=ids.map(index=>({x:pixelX(positions.get(index,0)),y:positions.get(index,1),z:pixelZ(positions.get(index,2)),u:uv.get(index,0),v:uv.get(index,1)}));
 const [a,b,c]=v,den=(b.z-c.z)*(a.x-c.x)+(c.x-b.x)*(a.z-c.z);if(Math.abs(den)<1e-9)continue;
 const x0=Math.max(0,Math.floor(Math.min(a.x,b.x,c.x))),x1=Math.min(resolution-1,Math.ceil(Math.max(a.x,b.x,c.x))),z0=Math.max(0,Math.floor(Math.min(a.z,b.z,c.z))),z1=Math.min(resolution-1,Math.ceil(Math.max(a.z,b.z,c.z)));
 const triangle={a,b,c,den};
 for(let gz=Math.floor(z0/16);gz<=Math.floor(z1/16);gz++)for(let gx=Math.floor(x0/16);gx<=Math.floor(x1/16);gx++){const key=gz*64+gx,list=triangleGrid.get(key)??[];list.push(triangle);triangleGrid.set(key,list);}
 for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++){
  const wa=((b.z-c.z)*(x-c.x)+(c.x-b.x)*(z-c.z))/den,wb=((c.z-a.z)*(x-c.x)+(a.x-c.x)*(z-c.z))/den,wc=1-wa-wb;if(Math.min(wa,wb,wc)<-1e-6)continue;
  const y=wa*a.y+wb*b.y+wc*c.y,p=z*resolution+x;if(y<=top[p])continue;top[p]=y;
  const u=wa*a.u+wb*b.u+wc*c.u,w=wa*a.v+wb*b.v+wc*c.v;
  const ix=Math.max(0,Math.min(decoded.info.width-1,Math.round(u*(decoded.info.width-1)))),iy=Math.max(0,Math.min(decoded.info.height-1,Math.round(w*(decoded.info.height-1)))),q=(iy*decoded.info.width+ix)*decoded.info.channels;
  rgb[p*3]=decoded.data[q];rgb[p*3+1]=decoded.data[q+1];rgb[p*3+2]=decoded.data[q+2];
 }
}
await sharp(rgb,{raw:{width:resolution,height:resolution,channels:3}}).png().toFile(path.join(output,'garden-source-top.png'));
await fs.writeFile(path.join(output,'source-inspection.json'),JSON.stringify({schema:'eq.personal-path.source-inspection.v1',source,sourceSha256:expectedSha,triangles:indices.count/3,bounds:{min:[minX,0,minZ],max:[maxX,.08440989255905151,maxZ]},projection:'CPU orthographic top surface, original base-color UV sampling; no geometry or original texture edits.',image:{width:decoded.info.width,height:decoded.info.height},projectionResolution:resolution},null,2)+'\n');
// This bare earth rectangle lies between the centre and eastern stepping stones.
// It excludes both stones and the fused leaf border visible in the source projection.
const crop={x:574,z:392,width:45,height:54},tileSize=512,tile=Buffer.alloc(tileSize*tileSize*3),heightTile=new Float32Array(tileSize*tileSize);
function sourceSample(x,z){
 // Resolve barycentric UV inside a source triangle. Interpolating between an
 // orthographic image's UV samples would cross unrelated texture-atlas islands.
 let u=0,v=0,y=-Infinity;
 for(const {a,b,c,den}of triangleGrid.get(Math.floor(z/16)*64+Math.floor(x/16))??[]){const wa=((b.z-c.z)*(x-c.x)+(c.x-b.x)*(z-c.z))/den,wb=((c.z-a.z)*(x-c.x)+(a.x-c.x)*(z-c.z))/den,wc=1-wa-wb;if(Math.min(wa,wb,wc)<-1e-6)continue;const height=wa*a.y+wb*b.y+wc*c.y;if(height<=y)continue;y=height;u=wa*a.u+wb*b.u+wc*c.u;v=wa*a.v+wb*b.v+wc*c.v;}
 if(!Number.isFinite(y))throw Error('The chosen soil sample leaves the supplied source footprint.');
 const sx=Math.max(0,Math.min(decoded.info.width-2,u*(decoded.info.width-1))),sy=Math.max(0,Math.min(decoded.info.height-2,v*(decoded.info.height-1))),ix=Math.floor(sx),iy=Math.floor(sy),fx=sx-ix,fy=sy-iy;
 const color=[0,0,0];for(const [ox,oy,w]of [[0,0,(1-fx)*(1-fy)],[1,0,fx*(1-fy)],[0,1,(1-fx)*fy],[1,1,fx*fy]])for(let channel=0;channel<3;channel++)color[channel]+=decoded.data[((iy+oy)*decoded.info.width+ix+ox)*decoded.info.channels+channel]*w;
 return {color,y};
}
for(let z=0;z<tileSize;z++)for(let x=0;x<tileSize;x++){const sample=sourceSample(crop.x+x/(tileSize-1)*crop.width,crop.z+z/(tileSize-1)*crop.height),p=z*tileSize+x;heightTile[p]=sample.y;for(let c=0;c<3;c++)tile[p*3+c]=Math.round(sample.color[c]);}
// Blend only opposite boundary bands, retaining the actual interior source texture.
function periodicEdge(data,channels){for(const axis of [0,1])for(let edge=0;edge<64;edge++){const mix=.5*Math.cos(edge/64*Math.PI/2)**2;for(let other=0;other<tileSize;other++){const p=axis===0?other*tileSize+edge:edge*tileSize+other,q=axis===0?other*tileSize+tileSize-1-edge:(tileSize-1-edge)*tileSize+other;for(let c=0;c<channels;c++){const a=data[p*channels+c],b=data[q*channels+c];data[p*channels+c]=a+(b-a)*mix;data[q*channels+c]=b+(a-b)*mix;}}}}
periodicEdge(tile,3);periodicEdge(heightTile,1);
await sharp(tile,{raw:{width:tileSize,height:tileSize,channels:3}}).png().toFile(path.join(output,'soil-color.png'));
const stoneDefinitions=[{id:'oval',x:201,z:185,rx:40,rz:56},{id:'round',x:348,z:234,rx:40,rz:49},{id:'broad',x:505,z:432,rx:53,rz:63},{id:'narrow',x:656,z:465,rx:29,rz:50},{id:'square',x:797,z:488,rx:56,rz:64},{id:'long',x:916,z:500,rx:55,rz:70}];
const floor=.025,stones=[];
function interpolate(a,b,t){return {p:a.p.map((v,c)=>v+(b.p[c]-v)*t),n:a.n.map((v,c)=>v+(b.n[c]-v)*t),uv:a.uv.map((v,c)=>v+(b.uv[c]-v)*t)};}
for(const definition of stoneDefinitions){
 const outputPositions=[],outputNormals=[],outputUvs=[];
 for(let i=0;i<indices.count;i+=3){
  const ids=[indices.get(i),indices.get(i+1),indices.get(i+2)],cx=ids.reduce((n,id)=>n+pixelX(positions.get(id,0))/3,0),cz=ids.reduce((n,id)=>n+pixelZ(positions.get(id,2))/3,0);
  if(((cx-definition.x)/definition.rx)**2+((cz-definition.z)/definition.rz)**2>1.2)continue;
  let polygon=ids.map(id=>({p:[0,1,2].map(c=>positions.get(id,c)),n:[0,1,2].map(c=>normals.get(id,c)),uv:[uv.get(id,0),uv.get(id,1)]})),clipped=[];
  for(let j=0;j<polygon.length;j++){const a=polygon[j],b=polygon[(j+1)%polygon.length],inside=a.p[1]>=floor;if(inside)clipped.push(a);if(inside!==(b.p[1]>=floor))clipped.push(interpolate(a,b,(floor-a.p[1])/(b.p[1]-a.p[1])));}
  for(let j=1;j<clipped.length-1;j++)for(const vertex of [clipped[0],clipped[j],clipped[j+1]]){outputPositions.push(vertex.p[0]-(definition.x/(resolution-1)-.5),vertex.p[1]-floor,vertex.p[2]-(definition.z/(resolution-1)-.5));const length=Math.hypot(...vertex.n);outputNormals.push(...vertex.n.map(n=>n/length));outputUvs.push(...vertex.uv);}
 }
 stones.push({id:definition.id,positions:outputPositions,normals:outputNormals,uvs:outputUvs,triangles:outputPositions.length/9,sourceEllipsePixels:definition,sourceFloor:floor});
}
await fs.writeFile(path.join(output,'stone-color.jpg'),imageBytes);
const normalImage=gltf.images[gltf.textures[gltf.materials[primitive.material].normalTexture.index].source],normalView=gltf.bufferViews[normalImage.bufferView];
await fs.writeFile(path.join(output,'stone-normal.png'),bytes.subarray(bin+normalView.byteOffset,bin+normalView.byteOffset+normalView.byteLength));
// Preserve the complete fork's projected footprint, so joining paths need not
// remove an arbitrary circle larger than the supplied source actually occupies.
const footprintResolution=128,footprint=[];for(let z=0;z<footprintResolution;z++)for(let x=0;x<footprintResolution;x++){const p=Math.round(z/(footprintResolution-1)*(resolution-1))*resolution+Math.round(x/(footprintResolution-1)*(resolution-1));footprint.push(Number.isFinite(top[p])?1:0);}
function distanceTo(value){const distance=footprint.map(v=>v===value?0:1e5),n=footprintResolution;for(const direction of [1,-1])for(let iz=0;iz<n;iz++)for(let ix=0;ix<n;ix++){const x=direction===1?ix:n-1-ix,z=direction===1?iz:n-1-iz,i=z*n+x;for(const [dx,dz,cost]of [[-direction,0,1],[0,-direction,1],[-direction,-direction,Math.SQRT2],[direction,-direction,Math.SQRT2]]){const px=x+dx,pz=z+dz;if(px>=0&&px<n&&pz>=0&&pz<n)distance[i]=Math.min(distance[i],distance[pz*n+px]+cost);}}return distance;}
const toInside=distanceTo(1),toOutside=distanceTo(0),signedDistance=footprint.map((v,i)=>(v?-toOutside[i]:toInside[i])/(footprintResolution-1));
const footprintPayload={schema:'eq.personal-path.footprint.v1',sourceSha256:expectedSha,sourceDisplayScale:4.3/.9902870655059814,resolution:footprintResolution,minX,maxX,minZ,maxZ,signedDistance};
await fs.writeFile(path.join(output,'path-footprint.json'),JSON.stringify(footprintPayload)+'\n');
const reliefResolution=32,relief=[];for(let z=0;z<reliefResolution;z++)for(let x=0;x<reliefResolution;x++)relief.push(heightTile[Math.round(z/(reliefResolution-1)*(tileSize-1))*tileSize+Math.round(x/(reliefResolution-1)*(tileSize-1))]);
const displayScale=4.3/.9902870655059814;
const payload={schema:'eq.personal-path.derived.v1',sourceSha256:expectedSha,sourceDisplayScale:displayScale,sourceNodeTranslation:gltf.nodes[0].translation,soil:{crop,textureMetres:[crop.width/(resolution-1)*displayScale,crop.height/(resolution-1)*displayScale],reliefResolution,relief},fork:{resolution:footprintResolution,minX,maxX,minZ,maxZ,footprint},stones};
await fs.writeFile(path.join(output,'path-derived.json'),JSON.stringify(payload)+'\n');
const artifacts=await Promise.all(['garden-source-top.png','soil-color.png','stone-color.jpg','stone-normal.png','path-derived.json','path-footprint.json'].map(async name=>{const value=await fs.readFile(path.join(output,name));return {file:output+'/'+name,bytes:value.length,sha256:sha(value)};}));
await fs.writeFile(path.join(output,'provenance.json'),JSON.stringify({schema:'eq.personal-path.provenance.v1',source,sourceSha256:expectedSha,originalUnchanged:sha(await fs.readFile(source))===expectedSha,preparation:'CPU UV reprojection of existing source soil; opposite texture edges blended. Six existing raised stones clipped only below source Y=.025 and at their documented source envelopes. Original stone color and normal bytes extracted without re-encoding. Runtime creates connected fitted support surfaces, retaining original stones as detail; no new model provider request.',crop,stones:stones.map(({id,triangles,sourceEllipsePixels})=>({id,triangles,sourceEllipsePixels})),artifacts,providerRequests:0},null,2)+'\n');
console.log(JSON.stringify({source,sha256:expectedSha,output,stones:stones.map(s=>({id:s.id,triangles:s.triangles})),artifacts:artifacts.map(a=>({file:a.file,bytes:a.bytes}))}));
