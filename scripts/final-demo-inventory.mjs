import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
export const EVIDENCE='evidence/final-demo-20260918';
export const INPUT='output/tripo-reference-batches-20260917/New 3D Objects Evidence Quest';
const sha=b=>createHash('sha256').update(b).digest('hex');
const read=p=>fs.readFile(p);
const slash=p=>p.replaceAll('\\','/');
await fs.mkdir(EVIDENCE,{recursive:true});
try{await fs.access(EVIDENCE+'/baseline.json');}catch(error){
 if(error.code!=='ENOENT')throw error;
 const files=[];
 for(const directory of ['src','server','scripts','checks','browser-tests','content'])for(const name of await fs.readdir(directory,{recursive:true})){
  const file=slash(path.join(directory,name));if((await fs.stat(file)).isFile())files.push(file);
 }
 for(const name of await fs.readdir('.'))if(/^(?:package(?:-lock)?\.json|.*config\.(?:ts|json)|AGENTS\.md|BUILD-STATUS\.md|\.gitignore)$/.test(name))files.push(name);
 const records=[];
 for(const file of files){const bytes=await read(file),destination=EVIDENCE+'/baseline/'+file;await fs.mkdir(path.dirname(destination),{recursive:true});await fs.writeFile(destination,bytes);records.push({path:file,sha256:sha(bytes),bytes:bytes.length});}
 await fs.writeFile(EVIDENCE+'/baseline.json',JSON.stringify({at:new Date().toISOString(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),branch:execFileSync('git',['branch','--show-current'],{encoding:'utf8'}).trim(),authorization:'Final demo integration requested 2026-09-18; existing work and originals preserved; local review only until matching Form approval.',taskIds:['TASK11.ART02','TASK11.ART03','TASK11.ART04','TASK11.ART05','TASK11.ART06','TASK11.ART07','TASK11.20','TASK11.21'],records},null,2)+'\n');
}
function semantic(value){if(Array.isArray(value))return value.map(semantic);if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).filter(([k])=>!['name','extras','asset'].includes(k)).map(([k,v])=>[k,semantic(v)]));return value;}
const files=[];
for(const name of (await fs.readdir(INPUT,{recursive:true})).filter(x=>x.endsWith('.glb'))){
 const file=slash(path.join(INPUT,name)),bytes=await read(file),stat=await fs.stat(file);
 if(bytes.toString('ascii',0,4)!=='glTF'||bytes.readUInt32LE(4)!==2||bytes.readUInt32LE(8)!==bytes.length)throw Error('Invalid GLB: '+file);
 const jsonLength=bytes.readUInt32LE(12),json=JSON.parse(bytes.toString('utf8',20,20+jsonLength)),binary=bytes.subarray(28+jsonLength);
 let triangles=0;for(const mesh of json.meshes??[])for(const p of mesh.primitives)if((p.mode??4)===4)triangles+=(json.accessors[p.indices]?.count??json.accessors[p.attributes.POSITION]?.count??0)/3;
 files.push({file,name,modifiedUtc:stat.mtime.toISOString(),bytes:bytes.length,sha256:sha(bytes),binarySha256:sha(binary),semanticSha256:sha(JSON.stringify(semantic(json))+sha(binary)),triangles,meshCount:json.meshes?.length??0,nodeCount:json.nodes?.length??0,skins:json.skins?.map(s=>({joints:s.joints.length}))??[],animations:json.animations?.map(a=>a.name??'unnamed')??[],bounds:json.meshes?.flatMap(m=>m.primitives.map(p=>({min:json.accessors[p.attributes.POSITION]?.min,max:json.accessors[p.attributes.POSITION]?.max}))),textures:json.images?.map(image=>({mimeType:image.mimeType,bytes:json.bufferViews?.[image.bufferView]?.byteLength,sha256:image.bufferView===undefined?null:sha(binary.subarray(json.bufferViews[image.bufferView].byteOffset??0,(json.bufferViews[image.bufferView].byteOffset??0)+json.bufferViews[image.bufferView].byteLength))})),approval:'PENDING_FORM_REVIEW'});
}
const groups=[...Map.groupBy(files,f=>f.semanticSha256).values()].map(group=>{group.sort((a,b)=>b.modifiedUtc.localeCompare(a.modifiedUtc)||a.name.localeCompare(b.name));return {selected:group[0].file,earlier:group.slice(1).map(f=>f.file),semanticSha256:group[0].semanticSha256,reason:'Newest modification time among equal geometry, textures, materials, transforms, hierarchy and clips; names and exporter metadata ignored.'};});
const report={schema:'eq.final-demo.inventory.v1',at:new Date().toISOString(),source:INPUT,originalCount:files.length,totalBytes:files.reduce((n,f)=>n+f.bytes,0),binaryPayloadCount:new Set(files.map(f=>f.binarySha256)).size,semanticGroupCount:groups.length,files,groups};
await fs.writeFile(EVIDENCE+'/inventory.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({originals:files.length,semanticGroups:groups.length,binaryPayloads:report.binaryPayloadCount,bytes:report.totalBytes,baseline:EVIDENCE+'/baseline.json'}));
