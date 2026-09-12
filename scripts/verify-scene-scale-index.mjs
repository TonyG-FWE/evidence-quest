import {readFile, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';

// Read-only Git/content audit; writes only the dated verification receipt.
const baseline='e1fbfda4d74a6e6250287954afdcc463657fdb92';
const folder='evidence/scale-20260912';
const git=(...args)=>execFileSync('git',args,{encoding:'utf8',maxBuffer:32*1024*1024});
const sha=b=>createHash('sha256').update(b).digest('hex');
const blob=b=>createHash('sha1').update(`blob ${b.length}\0`).update(b).digest('hex');
const json=async path=>JSON.parse((await readFile(path,'utf8')).replace(/^\uFEFF/,''));
const entries=git('ls-files','--stage','-z').split('\0').filter(Boolean).map(row=>{
  const match=/^\d+ ([a-f0-9]+) 0\t(.+)$/s.exec(row);
  assert(match,'Unmerged or malformed Git index entry');return {oid:match[1],path:match[2]};
});
const index=new Map(entries.map(row=>[row.path,row.oid]));
assert.equal(git('branch','--show-current').trim(),'codex/first-connected');
assert.equal(git('remote','get-url','origin').trim(),'https://github.com/TonyG-FWE/evidence-quest.git');
const staged=git('diff','--cached','--name-only','-z').split('\0').filter(Boolean);
assert(!staged.some(path=>path.startsWith('docs/game-review/')),'Concurrent review drafts must remain outside this checkpoint');
assert(!entries.some(({path})=>/(^|\/)(node_modules|dist|\.tools|\.cache|\.tmp|private-inputs|test-results|playwright-report)(\/|$)/.test(path)));
assert(!entries.some(({path})=>/(^|\/)\.env(?:$|\.)/.test(path)&&!path.endsWith('.env.example')),'Environment file in Git index');
assert.equal(git('check-ignore','.env.server.local').trim(),'.env.server.local');
const verified=new Set();
async function exact(path,expected){const bytes=await readFile(path);if(expected)assert.equal(sha(bytes),expected,path+' SHA-256');assert.equal(index.get(path),blob(bytes),path+' differs from indexed bytes');verified.add(path);return bytes;}

const imported=await json(folder+'/parent-import.json');
assert.equal(imported.fileCount,35);
const sealed=await json(imported.receipt.path);
for(const row of imported.files){const bytes=await exact(row.path,row.sha256);assert.equal(bytes.length,row.bytes);const source=sealed.files.find(s=>s.relativePath===row.path.replace('docs/design/evidence-quest-design-v3/',''));assert(source);assert.equal(source.sha256,row.sha256);assert.equal(source.bytes,row.bytes);}
await exact(imported.receipt.path,imported.receipt.sha256);
for(const row of imported.history)await exact(row.path,row.sha256);
const exports=await json('evidence/er13/production-art-exports.json');
const art=await json(folder+'/production-art-verification.json');
assert.equal(art.sourceCount,52);assert.equal(art.derivativeCount,267);
await exact('evidence/er13/production-art-exports.json',art.exportReportSha256);
const inventory=await json('evidence/er13/art-runtime-inventory.json');
const sources=new Map(inventory.files.map(row=>['public'+row.url,row.sha256]));
assert.equal(sources.size,52);
for(const row of exports.files)assert.equal(sources.get('public'+row.sourceUrl),row.sourceSha256);
for(const [path,expected] of sources){await exact(path,expected);assert.equal(index.get(path),git('rev-parse',baseline+':'+path).trim(),path+' original changed');}
for(const row of art.checks){await exact('public'+row.png,row.sha256);await exact('public'+row.webp,row.webpSha256);assert(row.rgbaEquality);}
for(const path of ['content/authored.json','content/temp-assets.json','content/illustrated-assets.json'])assert.equal(index.get(path),git('rev-parse',baseline+':'+path).trim(),path+' canonical index changed');
const qualification=await json(folder+'/qualification.json');
for(const row of [qualification.authority,qualification.artVerification,qualification.native.import,qualification.native.review,...qualification.reports,...qualification.routeBuilds,...qualification.measurements,...qualification.canonical])await exact(row.path,row.sha256);
await exact(folder+'/qualification.json');
const client=await json(folder+'/final-client.json');
for(const row of client.files){const bytes=await readFile('dist/client/'+(row.name==='client-entry.json'?'':'assets/')+row.name);assert.equal(sha(bytes),row.sha256);assert.equal(bytes.length,row.bytes);}

// Inspect actual indexed text bytes. Secret values are never printed or recorded.
const env=await readFile('.env.server.local','utf8');
const secrets=env.split(/\r?\n/).flatMap(line=>{const m=/^\s*(?:export\s+)?([A-Z0-9_]*(?:KEY|TOKEN|SECRET)[A-Z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);if(!m)return [];const value=m[2].replace(/^(['"])(.*)\1$/,'$2');return value.length>=16?[value]:[];});
assert(secrets.length>0,'Expected local secret was not available for exact indexed-text check');
const textEntries=entries.filter(({path})=>!/\.(png|webp|jpg|jpeg|gif|zip|pdf|woff2?|mp[34]|wav|ico)$/i.test(path));
const batch=execFileSync('git',['cat-file','--batch'],{input:textEntries.map(row=>row.oid).join('\n')+'\n',maxBuffer:128*1024*1024});
let offset=0;
for(const row of textEntries){const end=batch.indexOf(10,offset);assert(end>=0);const [oid,type,size]=batch.subarray(offset,end).toString().split(' ');assert.equal(oid,row.oid);assert.equal(type,'blob');const count=Number(size),bytes=batch.subarray(end+1,end+1+count);assert.equal(bytes.length,count);offset=end+1+count+1;
  assert(!secrets.some(value=>bytes.includes(value)),'Local credential found in indexed text');
  assert(!/\b(?:github_pat_[A-Za-z0-9_]{40,}|gh[pousr]_[A-Za-z0-9]{30,}|sk-ant-api\d{2}-[A-Za-z0-9_-]{40,})\b/.test(bytes.toString('utf8')),'Credential-pattern match in indexed text');
}
assert.equal(offset,batch.length);
git('-c','core.safecrlf=false','diff','--cached','--check','--','.gitattributes','BUILD-STATUS.md','browser-tests','checks','content','playwright.production.config.ts','scripts','src','docs/SCENE-SCALE-CORRECTION.md');
const concurrent=git('ls-files','--others','--exclude-standard','-z','--','docs/game-review').split('\0').filter(Boolean);
const report={at:new Date().toISOString(),baseline,headBeforeCheckpoint:git('rev-parse','HEAD').trim(),branch:'codex/first-connected',candidate:client.candidate,stagedFiles:staged.length,indexEntries:entries.length,exactIndexFiles:verified.size,importedFiles:35,preservedOriginals:sources.size,exactRgbaPairs:art.derivativeCount,clientFilesUnchanged:client.files.length,secretCheck:{scope:'All indexed text blobs; exact local secret values and recognizable credential patterns; no values recorded',textBlobs:textEntries.length,passed:true,environmentIgnoredAndUntracked:true},whitespace:{authoredChanges:'PASS',exception:'Sealed parent Markdown hard line breaks and generated evidence bytes are preserved exactly; they are outside the authored-code whitespace check.'},concurrentUntrackedPreserved:concurrent,receiptScope:'Records the staged tree before this receipt is added. Exact image equality is bound to the completed art verification; this audit compares indexed hashes and does not rerun rendering or provider checks.'};
await writeFile(folder+'/index-verification.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report));
