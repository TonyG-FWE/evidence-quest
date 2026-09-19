/** Incremental original-inventory addition. No provider request or character re-export. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {spawn} from 'node:child_process';
import * as T from 'three';
import {NodeIO} from '@gltf-transform/core';
import {ALL_EXTENSIONS,EXTMeshoptCompression} from '@gltf-transform/extensions';
import {MeshoptEncoder,MeshoptDecoder} from 'meshoptimizer';
import {loadPilotGeometry} from './pilot-glb.mjs';
const root='evidence/final-demo-20260918',output='.cache/final-demo-review/assets',id='marker';
const inventory=JSON.parse(await fs.readFile(root+'/source-bindings.json','utf8'));
const source=inventory.files.filter(f=>f.referenceId==='landing-marker'&&f.selectedWithinExactPayload).sort((a,b)=>b.modifiedUtc.localeCompare(a.modifiedUtc))[0];
if(!source)throw Error('Inventory landing-marker binding is missing');
const hash=b=>createHash('sha256').update(b).digest('hex'),bytes=await fs.readFile(source.file);
if(hash(bytes)!==source.sha256)throw Error('Original marker bytes differ');
const stem=id+'-'+source.sha256.slice(0,12),texture=output+'/'+stem+'-texture.glb',runtime=output+'/'+stem+'-ktx.glb';
try{await fs.access(texture);}catch{
 await new Promise((resolve,reject)=>{const child=spawn(process.execPath,['node_modules/@gltf-transform/cli/bin/cli.js','etc1s',source.file,texture,'--quality','255','--compression','5'],{windowsHide:true,env:{...process.env,PATH:path.resolve('.tools/ktx-4.4.2/bin')+path.delimiter+process.env.PATH},stdio:['ignore','ignore','pipe']});let error='';child.stderr.on('data',b=>error+=b);child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(Error(error)));});
}
await Promise.all([MeshoptEncoder.ready,MeshoptDecoder.ready]);
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.encoder':MeshoptEncoder,'meshopt.decoder':MeshoptDecoder});
const document=await io.read(texture);document.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({method:EXTMeshoptCompression.EncoderMethod.QUANTIZE});await io.write(runtime,document);
const before=await io.read(source.file),after=await io.read(runtime);
const signature=d=>{const indices=new Set(d.getRoot().listMeshes().flatMap(m=>m.listPrimitives().map(p=>p.getIndices())));return d.getRoot().listAccessors().map(a=>{let values=a.getArray();if(indices.has(a)){values=values.slice();for(let i=0;i<values.length;i+=3){const triangle=[values[i],values[i+1],values[i+2]],first=triangle.indexOf(Math.min(...triangle));for(let j=0;j<3;j++)values[i+j]=triangle[(first+j)%3];}}return [a.getType(),a.getCount(),a.getNormalized(),hash(Buffer.from(values.buffer,values.byteOffset,values.byteLength))].join(':');}).sort();};
const sizes=d=>d.getRoot().listTextures().map(t=>t.getSize().join('x')).sort();
if(JSON.stringify(signature(before))!==JSON.stringify(signature(after))||JSON.stringify(sizes(before))!==JSON.stringify(sizes(after)))throw Error('Marker geometry or texture dimensions changed');
const result=await fs.readFile(runtime),receipt={source:source.file,sourceSha256:source.sha256,sha256:hash(result),bytes:result.length,encoding:'Meshopt lossless accessors; ETC1S 255/5; source texture dimensions retained',accessorsPreserved:true,textureDimensions:sizes(before),visualCompressionReview:'PENDING',approval:'PENDING_FORM_REVIEW'};
await fs.writeFile(runtime+'.receipt.json',JSON.stringify(receipt,null,2)+'\n');
const g=await loadPilotGeometry(source.file),box=new T.Box3().setFromObject(g.scene),scale=.70/(box.max.y-box.min.y);
const definition={id,uri:'/review-assets/'+path.basename(runtime),sha256:receipt.sha256,sourceSha256:source.sha256,approval:'review',resources:receipt,location:'river',locations:['crossing','river','garden'],normalization:{scale:[scale,scale,scale],rotation:[0,0,0],offset:[-(box.min.x+box.max.x)/2,-box.min.y,-(box.min.z+box.max.z)/2]},anchors:{base:[0,0,0]},reference:{id:source.referenceId,state:source.state,images:source.referenceMatches},components:{sourceMeshes:source.meshCount,sourceNodes:source.nodeCount,referenceParts:source.components,assembly:'Supplied landing-marker stake, flag and fastening'}};
const report=JSON.parse(await fs.readFile(root+'/review-assets.json','utf8'));report.assets[id]=definition;report.bindings=report.bindings.filter(b=>b.id!==id);
report.bindings.push({id,source:source.file,sourceSha256:source.sha256,location:'river',triangles:source.triangles,state:source.state,reviewStatus:'PENDING_FORM_REVIEW',runtimeMembership:definition.locations,selection:'SELECTED_LOCAL_REVIEW'});
for(const place of definition.locations)report.locationMembership[place]=[...new Set([...report.locationMembership[place],id])];
for(const [place,ids]of Object.entries({dock:['ramp','post'],garden:['dock-1'],river:['dock-1']}))report.locationMembership[place]=[...new Set([...report.locationMembership[place],...ids])];
for(const [id,asset]of Object.entries(report.assets)){asset.locations=Object.entries(report.locationMembership).filter(([,ids])=>ids.includes(id)).map(([place])=>place);const binding=report.bindings.find(b=>b.id===id);binding.runtimeMembership=asset.locations;binding.selection=asset.locations.length?'SELECTED_LOCAL_REVIEW':'PRESERVED_CANDIDATE_NOT_LOADED';}
await fs.writeFile(root+'/review-assets.json',JSON.stringify(report,null,2)+'\n');await fs.writeFile(output+'/manifest.json',JSON.stringify(report,null,2)+'\n');
await fs.writeFile('src/garden/assets/reviewManifest.ts',"// Generated local review only. This does not grant production approval.\nimport type {VisualAssetDefinition} from './visualAsset.js';\nexport const reviewAssets:Record<string,VisualAssetDefinition>="+JSON.stringify(report.assets,null,2)+';\n');
await fs.writeFile(root+'/marker-addition.json',JSON.stringify({at:new Date().toISOString(),definition,sourceBytesUnchanged:hash(await fs.readFile(source.file))===source.sha256,scope:'Original 143-file inventory member; omitted initial runtime candidate now separately bound. Model Form approval remains pending.'},null,2)+'\n');console.log(JSON.stringify({id,runtime,bytes:result.length,sourceBounds:box,height:.7}));
