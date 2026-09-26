import fs from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';

export const PORTABLE_MANIFEST='portable-manifest.json';
export const PORTABLE_SCHEMA='evidence-quest.portable.v1';
export const NODE_VERSION='24.21.0';
export const TARGETS={
 'win32-x64':{archive:'node-v24.21.0-win-x64.zip',sha256:'158f7685b44de51f6c0df1d153526cbcd3e1bc739a8dfc607721cef75de9e541',executable:'node.exe'},
 'darwin-arm64':{archive:'node-v24.21.0-darwin-arm64.tar.gz',sha256:'bed7eea5325e1108f32ce5228ddd6a5f0f08a499ee42aa7442aea583702f6057',executable:'bin/node'},
 'darwin-x64':{archive:'node-v24.21.0-darwin-x64.tar.gz',sha256:'1462cb3b3046b815cf8ea436d3da450ec1a9f11dac7e5a46b0ada5305d7e8097',executable:'bin/node'},
 'linux-x64':{archive:'node-v24.21.0-linux-x64.tar.gz',sha256:'6e1db87ef58b8819e5d5402eff1536491b18edd8eb7bee5ef7897876e88dc5ff',executable:'bin/node'},
};
export function safeRelative(file){return typeof file==='string'&&file.length>0&&!path.isAbsolute(file)&&!/[\\:\0]/.test(file)&&file.split('/').every(x=>x&&x!=='.'&&x!=='..');}
export async function filesIn(root){
 const result=[];
 async function visit(relative){for(const entry of await fs.readdir(path.join(root,relative),{withFileTypes:true})){
  const file=relative?relative+'/'+entry.name:entry.name;
  if(['.DS_Store','Thumbs.db','desktop.ini'].includes(entry.name)||entry.name.startsWith('._'))continue;
  if(!safeRelative(file)||entry.isSymbolicLink())throw Error('Unexpected package path: '+file);
  if(entry.isDirectory())await visit(file);else if(entry.isFile())result.push(file);else throw Error('Unexpected package entry: '+file);
 }}
 await visit('');return result.sort();
}
export async function recordFile(root,file){
 if(!safeRelative(file))throw Error('Unsafe package path');
 const hash=createHash('sha256');let bytes=0;
 for await(const chunk of createReadStream(path.join(root,file))){hash.update(chunk);bytes+=chunk.length;}
 return {file,bytes,sha256:hash.digest('hex')};
}
export async function packageRecords(root){const records=[];for(const file of await filesIn(root))if(file!==PORTABLE_MANIFEST)records.push(await recordFile(root,file));return records;}
export async function verifyPortable(root,{native=true}={}){
 const manifest=JSON.parse(await fs.readFile(path.join(root,PORTABLE_MANIFEST),'utf8'));
 if(manifest.schema!==PORTABLE_SCHEMA||!TARGETS[manifest.target]||manifest.nodeVersion!==NODE_VERSION||!/^[a-f0-9]{40}$/.test(manifest.commit??'')||!Array.isArray(manifest.files)||!manifest.files.length)throw Error('Invalid portable manifest');
 if(native&&manifest.target!==process.platform+'-'+process.arch)throw Error('Download the package for this computer: '+process.platform+'-'+process.arch);
 if(native&&process.versions.node!==NODE_VERSION)throw Error('Start the game with the included runtime');
 const expected=new Map();for(const row of manifest.files){if(!safeRelative(row.file)||expected.has(row.file)||!Number.isSafeInteger(row.bytes)||row.bytes<0||!/^[a-f0-9]{64}$/.test(row.sha256))throw Error('Invalid portable file record');expected.set(row.file,row);}
 const actual=await packageRecords(root);
 if(actual.length!==expected.size)throw Error('Portable files are missing or unexpected; extract a fresh download');
 for(const row of actual){const old=expected.get(row.file);if(!old||old.bytes!==row.bytes||old.sha256!==row.sha256)throw Error('Portable file changed: '+row.file+'; extract a fresh download');}
 for(const required of ['launch.mjs','portable-common.mjs','package.json','dist/server/index.js','dist/personal-review-client/index.html','runtime/'+(process.platform==='win32'?'node.exe':'node')])if(native&&!expected.has(required))throw Error('Incomplete portable package: '+required);
 return manifest;
}
/** Deliberately ignore machine-specific service credentials and profile flags. */
export function portableEnvironment(source){
 const env={};for(const key of ['PATH','Path','SystemRoot','WINDIR','COMSPEC','ComSpec','HOME','USERPROFILE','TMP','TEMP','TMPDIR','DISPLAY','WAYLAND_DISPLAY','XDG_RUNTIME_DIR','DBUS_SESSION_BUS_ADDRESS','LANG','LC_ALL'])if(source[key]!==undefined)env[key]=source[key];
 return {...env,HOST:'127.0.0.1',PORT:'4364',PUBLIC_ORIGIN:'http://127.0.0.1:4364',COACH_MODE:'authored',EQ_ASSET_PROFILE:'review',EQ_PERSONAL_GRASS:'1',EQ_DEMO_PRESENTATION:'1',EQ_GARDEN_AI_DEMO:'0',EQ_CAST_DYNAMIC_VOICE:'0',EQ_DEFINITION_NARRATOR:'0',EQ_CAST_NARRATOR:'0',EQ_RECORD_CHAPTER:'0'};
}
