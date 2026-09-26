/** Shared, deterministic input selection. No generation, Git mutation or providers. */
import fs from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {DEMO_MANIFEST,sha256} from './demo-assets.mjs';
import {LEDGER_BASELINE} from './demo-ledgers.mjs';

export const normalize=file=>file.replaceAll('\\','/');
export const safeRelative=file=>typeof file==='string'&&file.length>0&&!path.isAbsolute(file)&&!file.includes('\\')&&file.split('/').every(part=>part&&part!=='.'&&part!=='..');
export async function listFiles(root,directory){
 const files=[];
 async function visit(relative){for(const entry of await fs.readdir(path.join(root,relative),{withFileTypes:true})){
  const file=normalize(path.posix.join(relative,entry.name));
  if(entry.isSymbolicLink())throw Error('Release inputs cannot be symbolic links: '+file);
  if(entry.isDirectory())await visit(file);else if(entry.isFile())files.push(file);
 }}
 await visit(directory);return files.sort();
}
export async function fileRecord(root,file){
 if(!safeRelative(file))throw Error('Unsafe release path: '+file);
 const hash=createHash('sha256');let bytes=0;
 for await(const chunk of createReadStream(path.join(root,file))){hash.update(chunk);bytes+=chunk.length;}
 return {file,bytes,sha256:hash.digest('hex')};
}
export async function fileRecords(root,files){
 const records=[];for(const file of [...new Set(files)].sort())records.push(await fileRecord(root,file));return records;
}
export const recordsDigest=records=>sha256(JSON.stringify(records));
export function changedRecords(expected,actual){
 const before=new Map(expected.map(record=>[record.file,record])),after=new Map(actual.map(record=>[record.file,record]));
 return [...new Set([...before.keys(),...after.keys()])].sort().filter(file=>before.get(file)?.sha256!==after.get(file)?.sha256||before.get(file)?.bytes!==after.get(file)?.bytes);
}
async function exists(root,file){try{await fs.access(path.join(root,file));return true;}catch(error){if(error.code==='ENOENT')return false;throw error;}}

/** Original recordings stay source-bound; only selected independent clips ship. */
export async function authoredAudioFiles(root=process.cwd()){
 const manifestFile='public/audio/cast/manifest.json',all=await listFiles(root,'public/audio/cast'),present=new Set(all),masters=new Set();
 for(const file of all){
  if(!/^public\/audio\/cast\/(?:manifest\.json|[a-f0-9]{64}\.(?:mp3|wav)|clips\/[a-f0-9]{64}\.wav)$/.test(file))throw Error('Undeclared file in public cast library: '+file);
 }
 const manifest=JSON.parse(await fs.readFile(path.join(root,manifestFile),'utf8'));
 if(!Array.isArray(manifest.entries))throw Error('Missing authored cast entries');
 const runtime=new Set([manifestFile]);
 for(const entry of manifest.entries){
  for(const uri of [entry.uri,entry.wavUri])if(uri!==undefined){if(!/^\/audio\/cast\/[a-f0-9]{64}\.(mp3|wav)$/.test(uri)||!present.has('public'+uri))throw Error('Missing selected audio master: '+entry.id);masters.add('public'+uri);}
  if(!/^\/audio\/cast\/clips\/[a-f0-9]{64}\.wav$/.test(entry.clip?.uri??''))throw Error('Missing selected independent audio clip: '+entry.id);
  const file='public'+entry.clip.uri;if(!present.has(file))throw Error('Missing selected independent audio file: '+file);runtime.add(file);
 }
 return {runtime:[...runtime].sort(),sources:[...masters,...runtime].sort()};
}

/** Everything copied into the public root must have an explicit local source.
 * Approved garden binaries/decoders come from the finite packet, never leftovers. */
export async function demoPublicFiles(root=process.cwd()){
 const copies=new Map();
 copies.set('garden-recorder.js','public/garden-recorder.js');
 for(const directory of ['public/art','public/temp'])for(const file of await listFiles(root,directory))copies.set(file.slice(7),file);
 for(const file of (await authoredAudioFiles(root)).runtime)copies.set(file.slice(7),file);
 const manifest=JSON.parse(await fs.readFile(path.join(root,DEMO_MANIFEST),'utf8'));
 for(const entry of manifest.files)for(const target of entry.targets)if(target.startsWith('public/')){
  if(copies.has(target.slice(7)))throw Error('Duplicate public copy: '+target);
  copies.set(target.slice(7),entry.file);
 }
 return [...copies].sort(([a],[b])=>a.localeCompare(b,'en')).map(([target,file])=>({target,file}));
}

/** These authority files are actually read by validate-garden, including the
 * separately amended staged bridge note. The original design remains intact. */
export async function narrativeAuthorityFiles(root=process.cwd()){
 const ids=new Set(['D022','NARRATIVE-REVISION-20260916']);
 for(const file of ['src/garden/content.ts','src/garden/chapterContent.ts']){
  const code=await fs.readFile(path.join(root,file),'utf8');
  for(const match of code.matchAll(/authority:\s*\[([^\]]+)\]/g))for(const id of match[1].matchAll(/['"]([^'"]+)['"]/g))ids.add(id[1]);
 }
 const names=await fs.readdir(path.join(root,'docs/game-review')),files=[];
 for(const id of ids){const matches=names.filter(name=>/^D\d+$/.test(id)?name.startsWith(id+'-')&&name.endsWith('.md'):name===id+'.md');if(!matches.length)throw Error('Missing narrative authority: '+id);files.push(...matches.map(name=>'docs/game-review/'+name));}
 return [...new Set(files)].sort();
}

export async function audioGenerationFiles(root=process.cwd()){
 const files=[];
 if(await exists(root,'evidence/cast-audio-20260919/batches'))for(const file of await listFiles(root,'evidence/cast-audio-20260919/batches')){
  if(!file.endsWith('.json'))throw Error('Unexpected audio generation input: '+file);files.push(file);
 }
 for(const file of ['evidence/cast-audio-20260919/independent-clips.json','evidence/cast-audio-20260919/semantic-repair.json','evidence/cast-audio-20260919/generation-plan.json'])if(await exists(root,file))files.push(file);
 return files.sort();
}

export async function demoInputFiles(root=process.cwd()){
 const files=['package.json','package-lock.json','index.html','vite.config.ts','tsconfig.base.json','tsconfig.client.json','tsconfig.server.json','tsconfig.checks.json','.gitattributes',DEMO_MANIFEST,LEDGER_BASELINE];
 for(const directory of ['src','server','scripts','contracts','content','docs/design'])files.push(...await listFiles(root,directory));
 const manifest=JSON.parse(await fs.readFile(path.join(root,DEMO_MANIFEST),'utf8'));files.push(...manifest.files.map(entry=>entry.file));
 files.push(...await narrativeAuthorityFiles(root),...(await demoPublicFiles(root)).map(entry=>entry.file),...(await authoredAudioFiles(root)).sources,...await audioGenerationFiles(root));
 // Interpreter caches are local byproducts, never reproducible source inputs.
 // Keep listFiles exhaustive so compiled-output receipts still reject extras.
 return [...new Set(files)].filter(file=>!/(?:^|\/)__pycache__(?:\/|$)/i.test(file)&&!/\.(?:pyc|pyo)$/i.test(file)).sort();
}
export async function captureDemoInputs(root=process.cwd()){
 const records=await fileRecords(root,await demoInputFiles(root));return {sha256:recordsDigest(records),records};
}

/** Provider-free qualification must not inherit an enabled service or key. */
export function authoredEnvironment(source=process.env){
 const env={...source};
 for(const key of Object.keys(env))if(/(?:API_KEY|ACCESS_TOKEN|AUTH_TOKEN|SECRET|PASSWORD|PRIVATE_KEY|CREDENTIAL)/i.test(key)||/^(?:OPENAI|FISH|ANTHROPIC|ELEVENLABS|TRIPO)_/i.test(key))delete env[key];
 for(const key of ['EQ_GARDEN_AI_DEMO','EQ_CAST_DYNAMIC_VOICE','EQ_CAST_NARRATOR','EQ_DEFINITION_NARRATOR','EQ_RECORD_CHAPTER'])env[key]='0';
 for(const key of ['EQ_GARDEN_AI_SESSION','EQ_REVIEW_CLIENT_DIRECTORY','EQ_TEST_DEV','VITE_EQ_PROFILE','NODE_OPTIONS'])delete env[key];
 return {...env,COACH_MODE:'authored',EQ_ASSET_PROFILE:'review',EQ_PERSONAL_GRASS:'1'};
}
