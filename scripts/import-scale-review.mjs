import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,relative,isAbsolute,dirname} from 'node:path';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const root=resolve('.'),sourceRoot=String.raw`C:\Users\TonyGuillaro\.codex\visualizations\2026\09\10\01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1\evidence-quest-design-v3`,destinationRoot=resolve('docs/design/evidence-quest-design-v3');
const receiptRelative='13-experience-correction/FINAL-PARENT-IMPORT-20260912-SCALE.json',receiptBytes=await readFile(resolve(sourceRoot,receiptRelative)),receipt=JSON.parse(receiptBytes.toString('utf8').replace(/^\uFEFF/,''));
const hash=b=>createHash('sha256').update(b).digest('hex'),within=(base,path)=>{const rel=relative(base,path);assert(rel&&!rel.startsWith('..')&&!isAbsolute(rel),path+' outside expected root');};
assert.equal(receipt.kind,'parent-scene-scale-final-import');assert.equal(receipt.fileCount,35);assert.equal(receipt.files.length,35);assert.equal(resolve(receipt.sourceRoot),resolve(sourceRoot));within(root,destinationRoot);
const plan=[];
for(const row of receipt.files){const source=resolve(sourceRoot,row.relativePath),destination=resolve(destinationRoot,row.relativePath);within(sourceRoot,source);within(destinationRoot,destination);assert.equal(source,resolve(row.source));assert(/\.(md|json|jpg)$/.test(row.relativePath));const bytes=await readFile(source);assert.equal(hash(bytes),row.sha256,row.relativePath);assert.equal(bytes.length,row.bytes);plan.push({...row,destination,bytes});}
const files=[],history=[];
for(const row of plan){let previous;try{previous=await readFile(row.destination);}catch(error){if(error.code!=='ENOENT')throw error;}
 if(previous&&hash(previous)!==row.sha256){const backup=resolve('evidence/scale-20260912/import-history',row.relativePath);within(root,backup);await mkdir(dirname(backup),{recursive:true});await writeFile(backup,previous);history.push({path:relative(root,backup).replaceAll('\\','/'),sha256:hash(previous),bytes:previous.length});}
 await mkdir(dirname(row.destination),{recursive:true});await writeFile(row.destination,row.bytes);assert.equal(hash(await readFile(row.destination)),row.sha256);files.push({path:relative(root,row.destination).replaceAll('\\','/'),source:row.source,sha256:row.sha256,bytes:row.bytes.length});
}
const destinationReceipt=resolve(destinationRoot,receiptRelative);await writeFile(destinationReceipt,receiptBytes);
const result={at:new Date().toISOString(),kind:'verified-parent-scale-import',candidate:receipt.candidate,fileCount:files.length,files,history,receipt:{path:relative(root,destinationReceipt).replaceAll('\\','/'),sha256:hash(receiptBytes)},status:'All35 listed source and destination byte hashes match; preceding master/scope preserved; no preview logs, environment files or rejected art imported.'};
await writeFile('evidence/scale-20260912/parent-import.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({fileCount:files.length,history,receipt:result.receipt,status:result.status}));
