/** Classify only; removal from Git is a separate reviewed step. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {recordFile} from './portable-common.mjs';
const tracked=execFileSync('git',['ls-files'],{encoding:'utf8',maxBuffer:16e6}).trim().split('\n');
const selected=new Set(JSON.parse(await fs.readFile('assets/demo/release-files.json','utf8')).files.map(x=>x.file));
const imported=JSON.parse(await fs.readFile('evidence/design-import.json','utf8'));
const importedFiles=new Set(imported.files.map(x=>imported.destination+'/'+x.path));
const audio=JSON.parse(await fs.readFile('public/audio/cast/manifest.json','utf8'));
const audioFiles=new Set(audio.entries.flatMap(x=>[x.uri,x.wavUri,x.clip.uri]).map(x=>'public'+x));
const candidates=tracked.filter(file=>file.startsWith('evidence/')&&!selected.has(file)&&!/(?:import|migration|approval|authorization|attempt|ledger|source|provenance|manifest|acceptance|qualification)/i.test(file)&&!/evidence\/(?:er13\/live-evaluation|nerdy-demo-20260924|repository-checkpoint-20260916|scale-20260912)/.test(file));
// Keep anything named by retained source, tests, docs or other audit records.
// Also inspect the candidate reports so chains of historical references survive.
const corpus=[];for(const file of tracked)if(/\.(?:ts|tsx|mjs|json|jsonl|md|ps1|py|txt|yml|yaml)$/.test(file)&&file!=='assets/demo/release-files.json'){
 try{const text=await fs.readFile(file,'utf8');if(text.length<5e6)corpus.push({file,text});}catch(error){if(error.code!=='ENOENT')throw error;}
}
const removed=[];
for(const file of tracked){
 if(importedFiles.has(file))continue;
 let reason;
 if(/^public\/audio\/cast\/(?:clips\/)?[a-f0-9]{64}\.(wav|mp3)$/.test(file)&&!audioFiles.has(file))reason='No current audio entry uses this playback clip or master; preserved locally.';
 else if(/(?:^|\/)__pycache__\/.+\.pyc$/.test(file))reason='Generated Python interpreter cache; not an imported source byte.';
 else if(candidates.includes(file)){
  const base=path.basename(file);const references=corpus.some(x=>x.file!==file&&(x.text.includes(file)||x.text.includes(base)));
  if(!references)reason='Historical output outside the release selection, with no retained textual references; preserved locally.';
 }
 if(reason)removed.push({...await recordFile(process.cwd(),file),reason});
}
const report={schema:'evidence-quest.distribution-cleanup.v1',at:new Date().toISOString(),base:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),files:removed,removedFiles:removed.length,removedBytes:removed.reduce((n,x)=>n+x.bytes,0),preservation:'Removal from Git tracking only. Local originals remain. Required selected audio, source inputs, authority, tests, fixtures and provider ledgers are retained.'};
await fs.mkdir('.tmp/demo-distribution-preservation',{recursive:true});await fs.writeFile('.tmp/demo-distribution-preservation/removal-candidates.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({removedFiles:report.removedFiles,removedBytes:report.removedBytes,groups:removed.reduce((g,x)=>{const k=x.reason.split(';')[0];g[k]=(g[k]??0)+1;return g;},{})}));
