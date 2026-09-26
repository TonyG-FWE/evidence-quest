import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {withDemoPublic} from '../scripts/demo-public.mjs';

async function fixture(t){
 await fs.mkdir('.cache',{recursive:true});
 const root=await fs.mkdtemp(path.resolve('.cache/staging-cleanup-test-'));
 t.after(async()=>{assert.equal(path.dirname(root),path.resolve('.cache'));await fs.rm(root,{recursive:true});});
 for(const directory of ['public/art','public/temp','public/audio/cast/clips','assets/demo'])await fs.mkdir(path.join(root,directory),{recursive:true});
 const clip='a'.repeat(64)+'.wav';
 await fs.writeFile(path.join(root,'public/audio/cast/clips',clip),'approved fixture audio');
 await fs.writeFile(path.join(root,'public/audio/cast/manifest.json'),JSON.stringify({entries:[{id:'fixture',clip:{uri:'/audio/cast/clips/'+clip}}]}));
 await fs.writeFile(path.join(root,'assets/demo/manifest.json'),JSON.stringify({files:[]}));
 await fs.writeFile(path.join(root,'public/garden-recorder.js'),'fixture recorder');
 return root;
}
const stages=async root=>(await fs.readdir(path.join(root,'.cache'))).filter(x=>x.startsWith('demo-public-'));

test('successful consumer gets complete public files; only its stage is removed',async t=>{
 const root=await fixture(t);await fs.mkdir(path.join(root,'.cache/demo-public-OTHER1'),{recursive:true});
 await fs.writeFile(path.join(root,'.cache/demo-public-OTHER1/keep'),'another run');
 const result=await withDemoPublic(async directory=>{
  assert.equal(await fs.readFile(path.join(directory,'garden-recorder.js'),'utf8'),'fixture recorder');
  return 42;
 },root);
 assert.equal(result,42);assert.deepEqual(await stages(root),['demo-public-OTHER1']);
 assert.equal(await fs.readFile(path.join(root,'.cache/demo-public-OTHER1/keep'),'utf8'),'another run');
});

test('partial staging failure removes copies and never starts consumer',async t=>{
 const root=await fixture(t);await fs.unlink(path.join(root,'public/garden-recorder.js'));
 let consumed=false;await assert.rejects(withDemoPublic(()=>{consumed=true;},root),/ENOENT/);
 assert.equal(consumed,false);assert.deepEqual(await stages(root),[]);
 assert.equal(await fs.readFile(path.join(root,'public/audio/cast/clips','a'.repeat(64)+'.wav'),'utf8'),'approved fixture audio');
});

test('failed consumer releases its stage and preserves the error',async t=>{
 const root=await fixture(t),failure=Error('consumer failed');
 await assert.rejects(withDemoPublic(async directory=>{await fs.access(directory);throw failure;},root),error=>error===failure);
 assert.deepEqual(await stages(root),[]);
});

test('stage remains available until child consumer has closed',async t=>{
 const root=await fixture(t);
 await withDemoPublic(directory=>new Promise((resolve,reject)=>{
  const child=spawn(process.execPath,['--input-type=module','-e',"import fs from 'node:fs/promises';setTimeout(async()=>{try{await fs.access(process.argv[1]+'/garden-recorder.js');process.exitCode=0;}catch{process.exitCode=1;}},100);",directory],{windowsHide:true,stdio:'ignore'});
  child.on('error',reject);child.on('close',code=>code===0?resolve():reject(Error('stage removed before child closed')));
 }),root);
 assert.deepEqual(await stages(root),[]);
});
