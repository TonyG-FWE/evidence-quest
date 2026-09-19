/** Package only the approved, separately authored bridge component transforms. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {NodeIO} from '@gltf-transform/core';
import {ALL_EXTENSIONS,EXTMeshoptCompression,KHRTextureBasisu} from '@gltf-transform/extensions';
import {MeshoptEncoder,MeshoptDecoder} from 'meshoptimizer';
const directory='evidence/final-demo-20260918',cache='.cache/final-demo-review/assets',id='bridge-fitted';
const sha=value=>createHash('sha256').update(value).digest('hex');
const report=JSON.parse(await fs.readFile(directory+'/review-assets.json','utf8'));
const proofPath='output/screenshot-repairs-20260918/bridge/provenance.json',proof=JSON.parse(await fs.readFile(proofPath,'utf8'));
const original=await fs.readFile(proof.source),working=await fs.readFile(proof.output);
if(sha(original)!==proof.sourceSha256||sha(working)!==proof.outputSha256||!proof.attributesPreserved||!proof.allTrianglesPreserved)throw Error('Bridge provenance mismatch');
await Promise.all([MeshoptEncoder.ready,MeshoptDecoder.ready]);
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.encoder':MeshoptEncoder,'meshopt.decoder':MeshoptDecoder});
const document=await io.readBinary(working),prior=report.assets.bridge,runtime=await io.read(cache+'/'+path.basename(prior.uri));
const textures=document.getRoot().listTextures(),runtimeTextures=runtime.getRoot().listTextures();
if(textures.length!==runtimeTextures.length)throw Error('Bridge texture mapping changed');
const textureBindings=textures.map((texture,i)=>{
 const sourceSha256=sha(texture.getImage()),image=runtimeTextures[i].getImage();
 if(runtimeTextures[i].getMimeType()!=='image/ktx2')throw Error('Expected existing KTX2');
 texture.setImage(image).setMimeType('image/ktx2');return {sourceSha256,runtimeSha256:sha(image),dimensions:runtimeTextures[i].getSize()};
});
document.createExtension(KHRTextureBasisu).setRequired(true);
document.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({method:EXTMeshoptCompression.EncoderMethod.QUANTIZE});
const signature=doc=>doc.getRoot().listMeshes().flatMap(mesh=>mesh.listPrimitives().map(primitive=>{
 const attributes=primitive.listSemantics().sort().map(name=>{const a=primitive.getAttribute(name),v=a.getArray();return [name,a.getType(),a.getCount(),sha(Buffer.from(v.buffer,v.byteOffset,v.byteLength))];});
 const indices=Array.from(primitive.getIndices().getArray());for(let i=0;i<indices.length;i+=3){const triangle=indices.slice(i,i+3),first=triangle.indexOf(Math.min(...triangle));for(let j=0;j<3;j++)indices[i+j]=triangle[(first+j)%3];}
 return {attributes,indices:sha(JSON.stringify(indices))};
}));
const before=signature(document),output=await io.writeBinary(document),verified=await io.readBinary(output);
if(JSON.stringify(before)!==JSON.stringify(signature(verified)))throw Error('Bridge accessor content changed');
const poses=doc=>doc.getRoot().listNodes().map(node=>({name:node.getName(),matrix:node.getMatrix()}));
if(JSON.stringify(poses(document))!==JSON.stringify(poses(verified)))throw Error('Component transforms changed');
const hash=sha(output),filename=id+'-'+hash.slice(0,12)+'.glb';await fs.writeFile(cache+'/'+filename,output);
const receipt={at:new Date().toISOString(),source:proof.source,sourceSha256:proof.sourceSha256,workingCopy:proof.output,workingSha256:proof.outputSha256,uri:'/review-assets/'+filename,sha256:hash,bytes:output.length,triangles:proof.outputTriangles,textureBindings,accessorsAndComponentTransformsPreserved:true,sourceUnchanged:sha(await fs.readFile(proof.source))===proof.sourceSha256,approval:'PENDING_FORM_REVIEW',encoding:'Existing full-resolution KTX2 images reused exactly; lossless Meshopt accessors'};
report.assets[id]={...structuredClone(prior),id,uri:receipt.uri,sha256:hash,sourceSha256:proof.outputSha256,resources:receipt,locations:['crossing'],components:{assembly:'Two independent halves from the same supplied bridge; source component transforms fit planks and post sockets',workingCopyProvenance:proofPath,sharedCenterSockets:['socket-right-negative','socket-left-negative']}};
report.bindings=report.bindings.filter(binding=>binding.id!==id);report.bindings.push({id,source:proof.output,sourceSha256:proof.outputSha256,originalSource:proof.source,originalSourceSha256:proof.sourceSha256,triangles:proof.outputTriangles,normalizationBasis:'Unchanged original bridge frame',runtimeMembership:['crossing'],selection:'SELECTED_LOCAL_REVIEW',reviewStatus:'PENDING_FORM_REVIEW'});
report.locationMembership.crossing=report.locationMembership.crossing.filter(value=>!['bridge','platform',id].includes(value));report.locationMembership.crossing.push(id);
for(const [assetId,asset]of Object.entries(report.assets)){asset.locations=Object.entries(report.locationMembership).filter(([,ids])=>ids.includes(assetId)).map(([location])=>location);const binding=report.bindings.find(value=>value.id===assetId);if(binding){binding.runtimeMembership=asset.locations;binding.selection=asset.locations.length?'SELECTED_LOCAL_REVIEW':'PRESERVED_CANDIDATE_NOT_LOADED';}}
for(const file of [directory+'/review-assets.json',cache+'/manifest.json'])await fs.writeFile(file,JSON.stringify(report,null,2)+'\n');
await fs.writeFile('src/garden/assets/reviewManifest.ts',"// Generated local review only. This does not grant production approval.\nimport type {VisualAssetDefinition} from './visualAsset.js';\nexport const reviewAssets:Record<string,VisualAssetDefinition>="+JSON.stringify(report.assets,null,2)+';\n');
await fs.writeFile(directory+'/screenshot-repair/bridge-runtime.json',JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt));
