/** Exact Float32 contact coordinates extracted from the derived source stones. */
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const directory=new URL('../output/personal-landscape-20260918/path/',import.meta.url);
const bytes=await fs.readFile(new URL('path-derived.json',directory)),derived=JSON.parse(bytes);
const receiptUrl=new URL('provenance.json',directory),receipt=JSON.parse(await fs.readFile(receiptUrl,'utf8'));
const sha=value=>createHash('sha256').update(value).digest('hex');
if(derived.sourceSha256!==receipt.sourceSha256||sha(await fs.readFile(new URL('../'+receipt.source,import.meta.url)))!==receipt.sourceSha256)throw Error('Path support source does not match the immutable original.');
const derivedArtifact=receipt.artifacts.find(artifact=>artifact.file.endsWith('/path-derived.json'));
if(!derivedArtifact||derivedArtifact.sha256!==sha(bytes)||derivedArtifact.bytes!==bytes.length)throw Error('Path support input does not match the path derivation receipt.');
const stones=derived.stones.map(stone=>{
 const values=[],indices=[],seen=new Map();
 for(let i=0;i<stone.positions.length;i+=3){const point=stone.positions.slice(i,i+3).map(Math.fround),key=point.join(',');let index=seen.get(key);if(index===undefined){index=values.length/3;seen.set(key,index);values.push(...point);}indices.push(index);}
 if(values.length/3>65535)throw Error('Contact source exceeds Uint16 index range.');
 const vertices=new Float32Array(values),triangles=new Uint16Array(indices);
 return {id:stone.id,vertexCount:vertices.length/3,triangleCount:triangles.length/3,vertices:Buffer.from(vertices.buffer).toString('base64'),indices:Buffer.from(triangles.buffer).toString('base64')};
});
const payload={schema:'eq.personal-path.support.v1',sourceSha256:derived.sourceSha256,derivedSha256:sha(bytes),sourceDisplayScale:derived.sourceDisplayScale,encoding:'Float32 XYZ and Uint16 triangle indices, little-endian base64; same coordinates as renderer geometry, no UVs or texture data.',stones};
const result=JSON.stringify(payload)+'\n',supportUrl=new URL('path-support.json',directory);
const existing=await fs.readFile(supportUrl,'utf8').catch(error=>{if(error.code==='ENOENT')return null;throw error;});
if(existing!==result)await fs.writeFile(supportUrl,result);
const artifact={file:'output/personal-landscape-20260918/path/path-support.json',bytes:Buffer.byteLength(result),sha256:sha(result)};
receipt.artifacts=[...receipt.artifacts.filter(value=>value.file!==artifact.file),artifact];
receipt.contactSupport={generator:'scripts/prepare-personal-path-support.mjs',source:receipt.source,sourceSha256:receipt.sourceSha256,input:derivedArtifact,output:artifact,encoding:payload.encoding,stones:stones.map(({id,vertexCount,triangleCount})=>({id,vertexCount,triangleCount})),providerRequests:0};
await fs.writeFile(receiptUrl,JSON.stringify(receipt,null,2)+'\n');
console.log(JSON.stringify({...artifact,sourceSha256:receipt.sourceSha256,derivedSha256:sha(bytes),existingSupportBytesPreserved:existing===result,stones:receipt.contactSupport.stones}));
