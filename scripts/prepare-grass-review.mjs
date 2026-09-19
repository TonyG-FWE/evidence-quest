/** One already-generated Tripo model; local runtime encoding only, no provider calls. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {spawn} from 'node:child_process';
import {NodeIO} from '@gltf-transform/core';
import {ALL_EXTENSIONS,EXTMeshoptCompression} from '@gltf-transform/extensions';
import {MeshoptEncoder,MeshoptDecoder} from 'meshoptimizer';
import {addSceneryMembership} from './scenery-membership.mjs';
const supplied=process.argv.includes('--supplied'),id=supplied?'grass-patch':'grass-tuft',targetHeight=supplied?.14:.18;
const source=supplied?'output/tripo-reference-batches-20260917/New 3D Objects Evidence Quest/grass 3d model_Clone1.glb':'output/grass-tuft-20260918/grass-tuft.glb',folder='output/grass-tuft-20260918',output='.cache/final-demo-review/assets';
const hash=b=>createHash('sha256').update(b).digest('hex'),bytes=await fs.readFile(source),sourceSha256=hash(bytes),stem=id+'-'+sourceSha256.slice(0,12),texture=output+'/'+stem+'-texture.glb',runtime=output+'/'+stem+'-ktx.glb';
await fs.mkdir(output,{recursive:true});
try{await fs.access(texture);}catch{
 await new Promise((resolve,reject)=>{const child=spawn(process.execPath,['node_modules/@gltf-transform/cli/bin/cli.js','etc1s',source,texture,'--quality','255','--compression','5'],{windowsHide:true,env:{...process.env,PATH:path.resolve('.tools/ktx-4.4.2/bin')+path.delimiter+process.env.PATH},stdio:['ignore','ignore','pipe']});let error='';child.stderr.on('data',b=>error+=b);child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(Error(error)));});
}
await Promise.all([MeshoptEncoder.ready,MeshoptDecoder.ready]);
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.encoder':MeshoptEncoder,'meshopt.decoder':MeshoptDecoder}),document=await io.read(texture);
document.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({method:EXTMeshoptCompression.EncoderMethod.QUANTIZE});
await io.write(runtime,document);
const before=await io.read(source),after=await io.read(runtime);
const signature=d=>{const indices=new Set(d.getRoot().listMeshes().flatMap(m=>m.listPrimitives().map(p=>p.getIndices())));return d.getRoot().listAccessors().map(a=>{let values=a.getArray();if(indices.has(a)){values=values.slice();for(let i=0;i<values.length;i+=3){const triangle=[values[i],values[i+1],values[i+2]],first=triangle.indexOf(Math.min(...triangle));for(let j=0;j<3;j++)values[i+j]=triangle[(first+j)%3];}}return [a.getType(),a.getCount(),a.getNormalized(),hash(Buffer.from(values.buffer,values.byteOffset,values.byteLength))].join(':');}).sort();};
if(JSON.stringify(signature(before))!==JSON.stringify(signature(after)))throw Error('Source geometry changed');
const sizes=d=>d.getRoot().listTextures().map(t=>t.getSize().join('x')).sort();
if(JSON.stringify(sizes(before))!==JSON.stringify(sizes(after)))throw Error('Texture dimensions changed');
const result=await fs.readFile(runtime),receipt={source,sourceSha256,sha256:hash(result),bytes:result.length,encoding:'Meshopt lossless accessors; ETC1S 255/5; source texture dimensions retained',accessorsPreserved:true,textureDimensions:sizes(before),visualCompressionReview:'PENDING',approval:'PENDING_FORM_REVIEW'};
await fs.writeFile(runtime+'.receipt.json',JSON.stringify(receipt,null,2)+'\n');
const glb=JSON.parse(bytes.subarray(20,20+bytes.readUInt32LE(12))),position=glb.accessors[glb.meshes[0].primitives[0].attributes.POSITION],height=position.max[1]-position.min[1],scale=targetHeight/height;
const definition={id,uri:'/review-assets/'+path.basename(runtime),sha256:receipt.sha256,sourceSha256,approval:'review',resources:receipt,location:'garden',locations:supplied?['dock','garden','workshop']:['crossing','dock','river','garden','bakery','workshop'],normalization:{scale:[scale,scale,scale],rotation:[0,0,0],offset:[0,-position.min[1],0]},anchors:{base:[0,0,0]},reference:{id,state:'static',images:supplied?[]:[{path:folder+'/grass-tuft-reference.png',sha256:hash(await fs.readFile(folder+'/grass-tuft-reference.png')),role:'master'}]},components:{sourceMeshes:glb.meshes.length,sourceNodes:glb.nodes.length,assembly:'Original Tripo grass, instanced without mesh edits'}};
const manifestPath='evidence/final-demo-20260918/review-assets.json',manifest=JSON.parse(await fs.readFile(manifestPath,'utf8'));
manifest.assets[id]=definition;manifest.bindings=manifest.bindings.filter(b=>b.id!==id);
const triangles=glb.meshes.reduce((n,m)=>n+m.primitives.reduce((n,p)=>n+glb.accessors[p.indices].count/3,0),0);
manifest.bindings.push({id,source,sourceSha256,location:'garden',triangles,state:'static',reviewStatus:'PENDING_FORM_REVIEW',...(supplied?{sourceNode:glb.nodes[0].name,provenance:'Model supplied directly by Tony; no additional provider operation'}:{taskId:'c5373f02-8193-4424-b7d6-177cd68469fb'})});
if(manifest.locationMembership){addSceneryMembership(manifest.locationMembership);for(const [key,asset]of Object.entries(manifest.assets)){asset.locations=Object.entries(manifest.locationMembership).filter(([,ids])=>ids.includes(key)).map(([place])=>place);const binding=manifest.bindings.find(b=>b.id===key);if(binding){binding.runtimeMembership=asset.locations;binding.selection=asset.locations.length?'SELECTED_LOCAL_REVIEW':'PRESERVED_CANDIDATE_NOT_LOADED';}}}
await fs.writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');
await fs.writeFile(output+'/manifest.json',JSON.stringify(manifest,null,2)+'\n');
await fs.writeFile('src/garden/assets/reviewManifest.ts',"// Generated local review only. This does not grant production approval.\nimport type {VisualAssetDefinition} from './visualAsset.js';\nexport const reviewAssets:Record<string,VisualAssetDefinition>="+JSON.stringify(manifest.assets,null,2)+';\n');
await fs.writeFile(folder+(supplied?'/supplied-runtime-review.json':'/runtime-review.json'),JSON.stringify({definition,triangles,requestedApproximateTriangles:supplied?null:3000,sourceBytesPreserved:hash(await fs.readFile(source))===sourceSha256,originalTextures:sizes(before),approval:'Pending visual review; scene integration authorized'},null,2)+'\n');
console.log(JSON.stringify({id,triangles,height:targetHeight,runtime,bytes:result.length,sourceBytesPreserved:true,textures:sizes(before)}));
