import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root='output/personal-landscape-20260918';
const selected={shore:['bank-top.png','bank-soil.png','river-water.png','coastal-land.glb','riverbank-land.glb'],path:['soil-color.png','stone-color.jpg','stone-normal.png','path-derived.json']};
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const normalize=file=>file.replaceAll('\\','/');

/** Personal review copies only the listed derived assets, bound to unchanged originals. */
export async function readPersonalLandscapeAssets(){
 const inventory=JSON.parse(await readFile('evidence/final-demo-20260918/inventory.json','utf8'));
 const originals=new Map(inventory.files.map(file=>[normalize(file.file),file.sha256]));
 const files=[],sources=new Map(),provenance=[];
 for(const [group,names]of Object.entries(selected)){
  const receiptPath=root+'/'+group+'/provenance.json',raw=await readFile(receiptPath),receipt=JSON.parse(raw.toString());
  if(receipt.providerRequests!==0)throw Error('Personal landscape receipt includes unapproved provider requests');
  provenance.push({file:receiptPath,sha256:sha(raw)});
  for(const source of receipt.sources??[receipt]){
   const file=normalize(source.source),expected=source.sourceSha256;
   if(originals.get(file)!==expected)throw Error('Unknown original landscape source: '+file);
   if(!sources.has(file)){if(sha(await readFile(file))!==expected)throw Error('Original landscape bytes changed: '+file);sources.set(file,{file,sha256:expected});}
  }
  const artifacts=receipt.outputs??receipt.artifacts;
  for(const name of names){
   const matches=artifacts.filter(a=>normalize(a.file).split('/').at(-1)===name);
   if(matches.length!==1)throw Error('Missing or ambiguous derived landscape binding: '+group+'/'+name);
   const bytes=await readFile(root+'/'+group+'/'+name),expected=matches[0];
   if(bytes.length!==expected.bytes||sha(bytes)!==expected.sha256)throw Error('Derived landscape bytes changed: '+group+'/'+name);
   files.push({relative:group+'/'+name,bytes,sha256:expected.sha256});
  }
 }
 return {files,receipt:{profile:'local-review-personal-landscape',approval:'review',sources:[...sources.values()],provenance,assets:files.map(({relative,bytes,sha256})=>({uri:'/personal-landscape/'+relative,bytes:bytes.length,sha256})),scope:'Selected source-derived personal review assets only. Source projections and inspection images are excluded. Original files remain unchanged; no approval is granted.'}};
}
