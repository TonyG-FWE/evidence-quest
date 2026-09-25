import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {tmpdir} from 'node:os';
import {captureDemoInputs,demoPublicFiles,narrativeAuthorityFiles,authoredEnvironment,authoredAudioFiles} from './demo-inputs.mjs';
import {writeDemoReceipt,verifyDemoReceipt,OUTPUT_DIRECTORIES} from './demo-build-receipt.mjs';
import {LEDGER_BASELINE,OPERATIONAL_LEDGERS,readLedgerPrefix,verifyLedgerHistory} from './demo-ledgers.mjs';
import {guardDemoFeedbackEnvironment} from './demo-profile.mjs';

async function fixture(t){
 const root=await fs.mkdtemp(path.join(tmpdir(),'eq-demo-delivery-'));
 t.after(async()=>{const resolved=await fs.realpath(root),parent=await fs.realpath(tmpdir());assert.equal(path.dirname(resolved).toLowerCase(),parent.toLowerCase());assert.ok(path.basename(resolved).startsWith('eq-demo-delivery-'));await fs.rm(resolved,{recursive:true});});
 async function put(file,value='fixture\n'){await fs.mkdir(path.dirname(path.join(root,file)),{recursive:true});await fs.writeFile(path.join(root,file),value);}
 for(const folder of ['src','server','scripts','contracts','content','docs/design','public/art','public/temp','public/audio/cast'])await fs.mkdir(path.join(root,folder),{recursive:true});
 for(const file of ['package.json','package-lock.json','index.html','vite.config.ts','tsconfig.base.json','tsconfig.client.json','tsconfig.server.json','tsconfig.checks.json','.gitattributes','docs/game-review/D022-opening.md','docs/game-review/NARRATIVE-REVISION-20260916.md'])await put(file);
 await put('src/garden/content.ts',"export const source={authority:['STAGED-BRIDGE-NOTE-20260916']};\n");await put('src/garden/chapterContent.ts');await put('docs/game-review/STAGED-BRIDGE-NOTE-20260916.md');
 await put('public/garden-recorder.js');
 await put('assets/demo/manifest.json',JSON.stringify({files:[{file:'assets/demo/decoder.js',targets:['public/garden-assets/basis/texture-worker.js']}]}));await put('assets/demo/decoder.js');await put('public/audio/cast/manifest.json','{"entries":[]}');
 for(const ledger of OPERATIONAL_LEDGERS)await put(ledger.file,'{"event":"fixture-reservation"}\n');
 await put(LEDGER_BASELINE,JSON.stringify({schema:'eq.operational-ledger-baseline.v1',ledgers:await Promise.all(OPERATIONAL_LEDGERS.map(item=>readLedgerPrefix(root,item)))}));
 for(const directory of OUTPUT_DIRECTORIES)await put(directory+'/fixture.js');
 return {root,put};
}

test('receipt rejects changed source, changed compiled bytes and stale extra output',async t=>{
 const {root,put}=await fixture(t),inputs=await captureDemoInputs(root);
 await writeDemoReceipt({root,inputs,hydrated:{manifestSha256:'fixture'},audio:{status:'synthetic-byte-binding'}});await verifyDemoReceipt(root);
 await put('src/garden/chapterContent.ts','changed');await assert.rejects(verifyDemoReceipt(root),/Demo source changed/);
 await put('src/garden/chapterContent.ts');await verifyDemoReceipt(root);
 await put('dist/server/fixture.js','changed');await assert.rejects(verifyDemoReceipt(root),/Compiled demo changed/);
 await put('dist/server/fixture.js');await put('dist/server/ambient.js');await assert.rejects(verifyDemoReceipt(root),/ambient\.js/);
});
test('unexpected compressed receipt is also a changed output',async t=>{
 const {root,put}=await fixture(t),inputs=await captureDemoInputs(root);await writeDemoReceipt({root,inputs,hydrated:{},audio:{}});
 await put('dist/personal-review-client/demo-package.json.gz');await assert.rejects(verifyDemoReceipt(root),/Compiled demo changed/);
});

test('the recording worklet is delivered and bound as a required input',async t=>{
 const {root,put}=await fixture(t);
 assert.ok((await demoPublicFiles(root)).some(entry=>entry.target==='garden-recorder.js'&&entry.file==='public/garden-recorder.js'));
 const inputs=await captureDemoInputs(root);
 await writeDemoReceipt({root,inputs,hydrated:{},audio:{}});
 await put('public/garden-recorder.js','changed processor');
 await assert.rejects(verifyDemoReceipt(root),/Demo source changed.*garden-recorder/);
 await fs.unlink(path.join(root,'public/garden-recorder.js'));
 await assert.rejects(captureDemoInputs(root),/ENOENT/);
});
test('changed build inputs prevent issuance of a receipt',async t=>{
 const {root,put}=await fixture(t),inputs=await captureDemoInputs(root);await put('scripts/new-script.mjs');
 await assert.rejects(writeDemoReceipt({root,inputs,hydrated:{},audio:{}}),/inputs changed during build/);
 await assert.rejects(fs.access(path.join(root,'dist/personal-review-client/demo-package.json')));
});
test('Python caches stay on disk outside source inputs while unexpected outputs still fail',async t=>{
 const {root,put}=await fixture(t),inputs=await captureDemoInputs(root),caches=['scripts/__pycache__/tool.cpython-311.pyc','docs/design/tools/__pycache__/compose.pyc','src/local.pyc','server/local.pyo'];
 for(const file of caches)await put(file,'preserved interpreter cache');
 const actual=await captureDemoInputs(root);assert.equal(actual.sha256,inputs.sha256);
 for(const file of caches){assert.ok(!actual.records.some(record=>record.file===file));assert.equal(await fs.readFile(path.join(root,file),'utf8'),'preserved interpreter cache');}
 await writeDemoReceipt({root,inputs,hydrated:{},audio:{}});
 await put('dist/server/__pycache__/unexpected.pyc');await assert.rejects(verifyDemoReceipt(root),/Compiled demo changed.*unexpected\.pyc/);
});
test('valid operational appends preserve the build while receipt history cannot be removed',async t=>{
 const {root,put}=await fixture(t),inputs=await captureDemoInputs(root),ledger=OPERATIONAL_LEDGERS[1].file;
 await fs.appendFile(path.join(root,ledger),'{"event":"fixture-completion"}\n');
 await writeDemoReceipt({root,inputs,hydrated:{},audio:{}});
 await fs.appendFile(path.join(root,ledger),'{"event":"fixture-reservation"}\n');
 assert.equal((await captureDemoInputs(root)).sha256,inputs.sha256);await verifyDemoReceipt(root);
 await put(ledger,'{"event":"fixture-reservation"}\n');
 await verifyLedgerHistory(root);await assert.rejects(verifyDemoReceipt(root),/history changed or was truncated/);
});
test('missing, incomplete and rewritten accounting history fails closed',async t=>{
 const {root,put}=await fixture(t),ledger=OPERATIONAL_LEDGERS[0].file;
 await put(ledger,'{"event":"changed-history"}\n');await assert.rejects(verifyLedgerHistory(root),/history changed or was truncated/);
 await put(ledger,'{"event":"fixture-reservation"}\n{');await assert.rejects(verifyLedgerHistory(root),/incomplete append/);
 await fs.unlink(path.join(root,ledger));await assert.rejects(verifyLedgerHistory(root),/ENOENT/);
});
test('historical TASK11.19 history stays exact even when an append is valid JSON',async t=>{
 const {root}=await fixture(t),ledger=OPERATIONAL_LEDGERS.find(item=>item.mode==='exact');
 await fs.appendFile(path.join(root,ledger.file),'{"event":"unexpected-attempt"}\n');
 await assert.rejects(verifyLedgerHistory(root),/history changed or was truncated/);
});
test('public selection uses packaged garden resources and rejects unexpected cast files',async t=>{
 const {root,put}=await fixture(t);await put('public/garden-assets/ambient.glb');await put('public/art/runtime/current.png');
 const files=await demoPublicFiles(root);assert.ok(files.some(file=>file.file==='public/art/runtime/current.png'));assert.ok(files.some(file=>file.file==='assets/demo/decoder.js'));assert.ok(!files.some(file=>file.file.includes('ambient')));
 await put('public/audio/cast/private-notes.txt');await assert.rejects(demoPublicFiles(root),/Undeclared file/);
});
test('delivery excludes audio masters and obsolete clips while binding retained masters',async t=>{
 const {root,put}=await fixture(t),master='public/audio/cast/'+'a'.repeat(64)+'.mp3',selected='public/audio/cast/clips/'+'b'.repeat(64)+'.wav',obsolete='public/audio/cast/clips/'+'c'.repeat(64)+'.wav';
 for(const file of [master,selected,obsolete])await put(file);
 await put('public/audio/cast/manifest.json',JSON.stringify({entries:[{id:'selected',clip:{uri:selected.slice(6)}}]}));
 const audio=await authoredAudioFiles(root);assert.ok(audio.runtime.includes(selected));assert.ok(!audio.runtime.includes(master));assert.ok(!audio.runtime.includes(obsolete));assert.ok(audio.sources.includes(master));assert.ok(!audio.sources.includes(obsolete));
 const publicFiles=(await demoPublicFiles(root)).map(item=>item.file);assert.ok(publicFiles.includes(selected));assert.ok(!publicFiles.includes(master));assert.ok(!publicFiles.includes(obsolete));
 const inputs=await captureDemoInputs(root);assert.ok(inputs.records.some(record=>record.file===master));
 await put(master,'changed retained source');assert.notEqual((await captureDemoInputs(root)).sha256,inputs.sha256);
 await fs.unlink(path.join(root,selected));await assert.rejects(demoPublicFiles(root),/Missing selected independent audio file/);
});
test('narrative authority includes staged amendment and rejects missing authority',async t=>{
 const {root,put}=await fixture(t);assert.ok((await narrativeAuthorityFiles(root)).includes('docs/game-review/STAGED-BRIDGE-NOTE-20260916.md'));
 await put('src/garden/content.ts',"const source={authority:['MISSING']};");await assert.rejects(narrativeAuthorityFiles(root),/Missing narrative authority: MISSING/);
});
test('authored qualification strips provider credentials, service flags and Node injection',()=>{
 const source={PATH:'kept',OPENAI_API_KEY:'synthetic',FISH_API_KEY:'synthetic',OPENAI_MODEL:'other',UNRELATED_ACCESS_TOKEN:'synthetic',EQ_CAST_DYNAMIC_VOICE:'1',EQ_GARDEN_AI_DEMO:'1',EQ_GARDEN_AI_SESSION:'recording',NODE_OPTIONS:'--require unexpected.cjs'};
 const env=authoredEnvironment(source);assert.equal(env.PATH,'kept');assert.equal(env.COACH_MODE,'authored');assert.equal(env.EQ_CAST_DYNAMIC_VOICE,'0');assert.equal(env.EQ_GARDEN_AI_DEMO,'0');
 for(const key of ['OPENAI_API_KEY','FISH_API_KEY','OPENAI_MODEL','UNRELATED_ACCESS_TOKEN','NODE_OPTIONS','EQ_GARDEN_AI_SESSION'])assert.equal(env[key],undefined);assert.equal(source.EQ_CAST_DYNAMIC_VOICE,'1');
});
test('demo startup never admits misconfigured Sol feedback to the legacy allowance',()=>{
 for(const session of [undefined,'','legacy','Recording']){
  const source={EQ_GARDEN_AI_DEMO:'1',...(session===undefined?{}:{EQ_GARDEN_AI_SESSION:session}),COACH_MODE:'authored'};
  const result=guardDemoFeedbackEnvironment(source);assert.equal(result.env.EQ_GARDEN_AI_DEMO,'0');assert.equal(result.env.COACH_MODE,'authored');assert.match(result.notice,/requires EQ_GARDEN_AI_SESSION=recording/);assert.equal(source.EQ_GARDEN_AI_DEMO,'1');
 }
 const recording=guardDemoFeedbackEnvironment({EQ_GARDEN_AI_DEMO:'1',EQ_GARDEN_AI_SESSION:'recording'});assert.equal(recording.env.EQ_GARDEN_AI_DEMO,'1');assert.equal(recording.notice,null);
 const authored=guardDemoFeedbackEnvironment({EQ_GARDEN_AI_DEMO:'0'});assert.equal(authored.env.EQ_GARDEN_AI_DEMO,'0');assert.equal(authored.notice,null);
});
