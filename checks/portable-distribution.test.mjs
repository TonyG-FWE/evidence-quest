import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {PORTABLE_SCHEMA,NODE_VERSION,packageRecords,verifyPortable,portableEnvironment} from '../scripts/portable-common.mjs';

async function fixture(t){
 const root=await fs.mkdtemp(path.join(tmpdir(),'eq-portable-test-'));
 t.after(()=>fs.rm(root,{recursive:true}));
 for(const file of ['launch.mjs','portable-common.mjs','package.json','dist/server/index.js','dist/personal-review-client/index.html','runtime/'+(process.platform==='win32'?'node.exe':'node')]){await fs.mkdir(path.dirname(path.join(root,file)),{recursive:true});await fs.writeFile(path.join(root,file),'synthetic package fixture');}
 const manifest={schema:PORTABLE_SCHEMA,nodeVersion:NODE_VERSION,target:process.platform+'-'+process.arch,commit:'a'.repeat(40),files:await packageRecords(root)};
 const write=()=>fs.writeFile(path.join(root,'portable-manifest.json'),JSON.stringify(manifest));await write();return {root,manifest,write};
}
test('package accepts exact bytes and harmless operating-system metadata',async t=>{const {root}=await fixture(t);await fs.writeFile(path.join(root,'.DS_Store'),'synthetic finder data');assert.equal((await verifyPortable(root)).files.length,6);});
test('missing and tampered files fail before launch',async t=>{const {root}=await fixture(t);await fs.writeFile(path.join(root,'launch.mjs'),'tampered');await assert.rejects(verifyPortable(root),/changed/);await fs.unlink(path.join(root,'launch.mjs'));await assert.rejects(verifyPortable(root),/missing/);});
test('unexpected files, duplicate entries and traversal fail closed',async t=>{const {root,manifest,write}=await fixture(t);await fs.writeFile(path.join(root,'unexpected.js'),'extra');await assert.rejects(verifyPortable(root),/unexpected/);await fs.unlink(path.join(root,'unexpected.js'));manifest.files.push(manifest.files[0]);await write();await assert.rejects(verifyPortable(root),/Invalid portable file/);manifest.files.pop();manifest.files[0].file='../escape';await write();await assert.rejects(verifyPortable(root),/Invalid portable file/);});
test('wrong platform fails before executing the bundled runtime',async t=>{const {root,manifest,write}=await fixture(t);manifest.target=process.platform==='win32'?'linux-x64':'win32-x64';await write();await assert.rejects(verifyPortable(root),/this computer/);});
test('portable configuration discards ambient providers and server overrides',()=>{const env=portableEnvironment({PATH:'system-path',OPENAI_API_KEY:'synthetic',FISH_API_KEY:'synthetic',AZURE_SPEECH_KEY:'synthetic',EQ_GARDEN_AI_DEMO:'1',EQ_CAST_DYNAMIC_VOICE:'1',HOST:'0.0.0.0',PORT:'9999',NODE_OPTIONS:'--inspect',EQ_REVIEW_CLIENT_DIRECTORY:'elsewhere'});assert.equal(env.PATH,'system-path');assert.equal(env.HOST,'127.0.0.1');assert.equal(env.PORT,'4364');assert.equal(env.COACH_MODE,'authored');assert.equal(env.EQ_GARDEN_AI_DEMO,'0');for(const key of ['OPENAI_API_KEY','FISH_API_KEY','AZURE_SPEECH_KEY','NODE_OPTIONS','EQ_REVIEW_CLIENT_DIRECTORY'])assert.equal(env[key],undefined);});
