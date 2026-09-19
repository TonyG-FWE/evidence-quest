import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {createReadStream} from 'node:fs';

export const DEMO_MANIFEST='assets/demo/manifest.json';
export const sha256=bytes=>createHash('sha256').update(bytes).digest('hex');
const normalize=file=>file.replaceAll('\\','/');
const safeRelative=file=>typeof file==='string'&&file.length>0&&!path.isAbsolute(file)&&!file.includes('\\')&&file.split('/').every(part=>part&&part!=='.'&&part!=='..');
const allowedTarget=file=>file.startsWith('.cache/final-demo-review/assets/')||file.startsWith('output/personal-landscape-20260918/')||file.startsWith('output/tripo-reference-batches-20260917/New 3D Objects Evidence Quest/')||/^public\/garden-assets\/(?:[a-z-]+-[a-f0-9]{12}\.glb|manifest\.json)$/.test(file)||['evidence/final-demo-20260918/review-assets.json','evidence/final-demo-20260918/inventory.json',...['basis_transcoder.js','basis_transcoder.wasm','texture-worker.js'].map(name=>'public/garden-assets/basis/'+name)].includes(file);

/** Local preservation audit only. The other originals are intentionally not a
 * clean-checkout prerequisite; the finite runtime packet selects exact copies. */
export async function verifySuppliedOriginals({root=process.cwd()}={}){
 const inventoryFile='assets/demo/metadata/inventory.json',raw=await fs.readFile(path.join(root,inventoryFile)),inventory=JSON.parse(raw.toString());
 if(inventory.schema!=='eq.final-demo.inventory.v1'||inventory.originalCount!==143||inventory.files?.length!==143)throw Error('Expected the complete 143-original inventory');
 const records=[],missing=[],changed=[];let bytes=0;
 for(const entry of inventory.files){
  if(!safeRelative(entry.file)||!entry.file.startsWith(inventory.source+'/')||!/^[a-f0-9]{64}$/.test(entry.sha256))throw Error('Invalid original inventory entry');
  try{
   const digest=createHash('sha256');let size=0;for await(const chunk of createReadStream(path.join(root,entry.file))){digest.update(chunk);size+=chunk.length;}
   const actual=digest.digest('hex');records.push({file:entry.file,sha256:actual,bytes:size});bytes+=size;
   if(actual!==entry.sha256||size!==entry.bytes)changed.push(entry.file);
  }catch(error){if(error.code==='ENOENT')missing.push(entry.file);else throw error;}
 }
 return {schema:'evidence-quest.original-preservation.v1',inventorySha256:sha256(raw),status:missing.length||changed.length?'FAIL':'ALL_143_ORIGINAL_HASHES_MATCH',expected:143,verified:records.length,bytes,records,missing,changed,scope:'Local original-byte preservation only. No file rewritten, regrouped, approved, generated or deleted.'};
}

/** Verify before copying. Never regenerates assets or replaces mismatched data. */
export async function hydrateDemoAssets({packageRoot=process.cwd(),targetRoot=process.cwd(),verifyOnly=false}={}){
 packageRoot=path.resolve(packageRoot);targetRoot=path.resolve(targetRoot);
 const raw=await fs.readFile(path.join(packageRoot,DEMO_MANIFEST)),manifest=JSON.parse(raw.toString());
 if(manifest.schema!=='evidence-quest.demo-package.v1'||manifest.profile!=='local-review-personal-landscape'||manifest.approval!=='pending-review')throw Error('Invalid demo package profile');
 if(!Array.isArray(manifest.files)||sha256(JSON.stringify(manifest.files))!==manifest.filesSha256)throw Error('Demo file-list digest mismatch');
 const targets=new Set(),pending=[];let copied=0,matched=0,totalBytes=0;
 for(const entry of manifest.files){
  if(!safeRelative(entry.file)||!entry.file.startsWith('assets/demo/')||entry.file===DEMO_MANIFEST||!Array.isArray(entry.targets)||!entry.targets.length)throw Error('Invalid packaged asset path');
  const source=path.join(packageRoot,entry.file),bytes=await fs.readFile(source);
  if(bytes.length!==entry.bytes||sha256(bytes)!==entry.sha256)throw Error('Packaged asset hash mismatch: '+entry.file);
  totalBytes+=bytes.length;
  for(const target of entry.targets){
   if(!safeRelative(target)||!allowedTarget(target)||targets.has(target))throw Error('Invalid or duplicate hydration target: '+target);targets.add(target);
   const destination=path.join(targetRoot,target);let current;
   try{current=await fs.readFile(destination);}catch(error){if(error.code!=='ENOENT')throw error;}
   if(current){if(current.length!==entry.bytes||sha256(current)!==entry.sha256)throw Error('Existing target differs; preserved without overwrite: '+normalize(destination));matched++;}
   else pending.push({source,destination,sha256:entry.sha256,bytes:entry.bytes});
  }
 }
 if(!verifyOnly)for(const entry of pending){
  await fs.mkdir(path.dirname(entry.destination),{recursive:true});
  // COPYFILE_EXCL also protects against an unrelated writer arriving after preflight.
  try{await fs.copyFile(entry.source,entry.destination,1);copied++;}catch(error){if(error.code!=='EEXIST')throw error;}
  const copiedBytes=await fs.readFile(entry.destination);if(copiedBytes.length!==entry.bytes||sha256(copiedBytes)!==entry.sha256)throw Error('Hydrated asset verification failed: '+normalize(entry.destination));
 }
 return {schema:'evidence-quest.demo-hydration.v1',profile:manifest.profile,manifestSha256:sha256(raw),filesSha256:manifest.filesSha256,packageFiles:manifest.files.length,targets:targets.size,packageBytes:totalBytes,matched,copied,missing:verifyOnly?pending.length:0,targetRoot,mode:verifyOnly?'verify-package-and-existing-targets':'hydrate',scope:'Exact packaged bytes only. Existing mismatched files are preserved; no generation, recompression, provider request, approval change or original deletion.'};
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const args=process.argv.slice(2);let targetRoot=process.cwd(),verifyOnly=false;
 if(args.length===1&&args[0]==='--verify-originals'){const result=await verifySuppliedOriginals();console.log(JSON.stringify(result,null,2));if(result.status==='FAIL')process.exitCode=1;}
 else{
 for(let i=0;i<args.length;i++){if(args[i]==='--target'&&args[i+1])targetRoot=path.resolve(args[++i]);else if(args[i]==='--verify')verifyOnly=true;else throw Error('Usage: node scripts/demo-assets.mjs [--target directory] [--verify]');}
 console.log(JSON.stringify(await hydrateDemoAssets({targetRoot,verifyOnly}),null,2));
 }
}
