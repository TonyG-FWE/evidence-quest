/** Bind the approved porch-table working copy; retain all supplied originals. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {NodeIO} from '@gltf-transform/core';
import {ALL_EXTENSIONS,EXTMeshoptCompression,KHRTextureBasisu} from '@gltf-transform/extensions';
import {MeshoptEncoder,MeshoptDecoder} from 'meshoptimizer';
const directory='evidence/final-demo-20260918',cache='.cache/final-demo-review/assets';
const sha=value=>createHash('sha256').update(value).digest('hex');
const report=JSON.parse(await fs.readFile(directory+'/review-assets.json','utf8'));
const proof=JSON.parse(await fs.readFile('output/screenshot-repairs-20260918/workshop/provenance.json','utf8'));
const original=await fs.readFile(proof.source),working=await fs.readFile(proof.output);
if(sha(original)!==proof.sourceSha256||sha(working)!==proof.outputSha256)throw Error('Workshop provenance mismatch');
await Promise.all([MeshoptEncoder.ready,MeshoptDecoder.ready]);
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.encoder':MeshoptEncoder,'meshopt.decoder':MeshoptDecoder});
const source=await io.readBinary(original),document=await io.readBinary(working),prior=report.assets['cottage-1'];
const runtime=await io.read(cache+'/'+path.basename(prior.uri));
const textures=document.getRoot().listTextures(),sourceTextures=source.getRoot().listTextures(),runtimeTextures=runtime.getRoot().listTextures();
if(textures.length!==sourceTextures.length||textures.length!==runtimeTextures.length)throw Error('Texture identity mismatch');
const textureBindings=textures.map((texture,i)=>{
 const sourceImage=sourceTextures[i].getImage(),runtimeImage=runtimeTextures[i].getImage();
 if(sha(texture.getImage())!==sha(sourceImage)||runtimeTextures[i].getMimeType()!=='image/ktx2')throw Error('Unexpected working-copy texture');
 texture.setImage(runtimeImage).setMimeType('image/ktx2');
 return {sourceSha256:sha(sourceImage),runtimeSha256:sha(runtimeImage),runtimeDimensions:runtimeTextures[i].getSize()};
});
document.createExtension(KHRTextureBasisu).setRequired(true);
document.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({method:EXTMeshoptCompression.EncoderMethod.QUANTIZE});
const output=await io.writeBinary(document),hash=sha(output),filename='workshop-clear-porch-'+hash.slice(0,12)+'.glb';
const verified=await io.readBinary(output);
const signature=doc=>doc.getRoot().listMeshes().flatMap(mesh=>mesh.listPrimitives().map(primitive=>{
 const attributes=primitive.listSemantics().sort().map(name=>{const a=primitive.getAttribute(name),v=a.getArray();return [name,a.getType(),a.getCount(),sha(Buffer.from(v.buffer,v.byteOffset,v.byteLength))];});
 const indices=Array.from(primitive.getIndices().getArray());for(let i=0;i<indices.length;i+=3){const triangle=indices.slice(i,i+3),first=triangle.indexOf(Math.min(...triangle));for(let j=0;j<3;j++)indices[i+j]=triangle[(first+j)%3];}
 return {attributes,indices:sha(JSON.stringify(indices))};
}));
if(JSON.stringify(signature(document))!==JSON.stringify(signature(verified)))throw Error('Retained geometry changed during packaging');
await fs.writeFile(cache+'/'+filename,output);
const id='workshop-clear-porch',receipt={at:new Date().toISOString(),source:proof.source,sourceSha256:proof.sourceSha256,workingCopy:proof.output,workingSha256:proof.outputSha256,uri:'/review-assets/'+filename,sha256:hash,bytes:output.length,textureBindings,encoding:'Existing full-resolution ETC1S bytes reused exactly; lossless Meshopt accessors',positionsNormalsUVsIndicesPreserved:true,approval:'PENDING_FORM_REVIEW',sourceUnchanged:sha(await fs.readFile(proof.source))===proof.sourceSha256};
report.assets[id]={...structuredClone(prior),id,uri:receipt.uri,sha256:hash,sourceSha256:proof.outputSha256,resources:receipt,locations:['workshop'],components:{...prior.components,assembly:'Original workshop roof cap retained; disconnected embedded porch table removed from a separately hashed working copy',workingCopyProvenance:'output/screenshot-repairs-20260918/workshop/provenance.json'}};
report.bindings=report.bindings.filter(binding=>binding.id!==id);
report.bindings.push({id,source:proof.output,sourceSha256:proof.outputSha256,originalSource:proof.source,originalSourceSha256:proof.sourceSha256,triangles:proof.retainedTriangles,normalizationBasis:'Unchanged original cottage-1 frame',runtimeMembership:['workshop'],selection:'SELECTED_LOCAL_REVIEW',reviewStatus:'PENDING_FORM_REVIEW'});
report.locationMembership.workshop=report.locationMembership.workshop.map(value=>value==='cottage-1'?id:value);
prior.locations=prior.locations.filter(value=>value!=='workshop');
report.locationMembership.garden=report.locationMembership.garden.filter(value=>!['crate-2','tray','garden-path'].includes(value));
if(!report.locationMembership.garden.includes('chest'))report.locationMembership.garden.push('chest');
for(const [assetId,asset]of Object.entries(report.assets)){
 asset.locations=Object.entries(report.locationMembership).filter(([,ids])=>ids.includes(assetId)).map(([location])=>location);
 const binding=report.bindings.find(value=>value.id===assetId);if(binding){binding.runtimeMembership=asset.locations;binding.selection=asset.locations.length?'SELECTED_LOCAL_REVIEW':'PRESERVED_CANDIDATE_NOT_LOADED';}
}
report.assets.chest.components={...report.assets.chest.components,assembly:'Complete supplied open chest; cushion retrieval begins inside this same source model'};
for(const file of [directory+'/review-assets.json',cache+'/manifest.json'])await fs.writeFile(file,JSON.stringify(report,null,2)+'\n');
await fs.writeFile('src/garden/assets/reviewManifest.ts',"// Generated local review only. This does not grant production approval.\nimport type {VisualAssetDefinition} from './visualAsset.js';\nexport const reviewAssets:Record<string,VisualAssetDefinition>="+JSON.stringify(report.assets,null,2)+';\n');
await fs.writeFile(directory+'/screenshot-repair/workshop-runtime.json',JSON.stringify(receipt,null,2)+'\n');
console.log(JSON.stringify(receipt));
