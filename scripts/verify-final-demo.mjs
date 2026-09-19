/** Exact required commands, on an explicitly identified local review candidate. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {spawn,execFileSync} from 'node:child_process';
import {readPersonalLandscapeAssets} from './personal-landscape-source.mjs';
const root='evidence/final-demo-20260918',run=process.argv[2]??'required',directory=root+'/'+run;
if(!/^[a-z0-9-]+$/.test(run))throw Error('Invalid evidence run name');await fs.mkdir(directory,{recursive:true});
const sha=b=>createHash('sha256').update(b).digest('hex'),files=[];
for(const folder of ['src','server','scripts','checks','browser-tests','content','contracts','evaluation'])for(const name of await fs.readdir(folder,{recursive:true})){const file=(folder+'/'+name).replaceAll('\\','/');if((await fs.stat(file)).isFile())files.push(file);}
for(const file of await fs.readdir('.'))if(/^(?:package(?:-lock)?\.json|.*config[^/]*\.(?:ts|json)|AGENTS\.md)$/.test(file))files.push(file);
files.push('index.html','.gitignore',root+'/review-assets.json',root+'/source-bindings.json','evidence/voice-ai-demo-20260918/openai-attempts.jsonl');
// Approved component edits preserve the originals and ship separately. Bind
// their exact working geometry and provenance alongside the runtime manifests.
files.push('output/screenshot-repairs-20260918/workshop/workshop-clear-porch.glb','output/screenshot-repairs-20260918/workshop/provenance.json','output/screenshot-repairs-20260918/bridge/bridge-fitted-planks.glb','output/screenshot-repairs-20260918/bridge/provenance.json');
files.push('output/screenshot-repairs-20260918/platform-bridge/platform-fitted-planks.glb','output/screenshot-repairs-20260918/platform-bridge/provenance.json');
// The optional personal profile is part of this source candidate even while
// normal qualification runs with it disabled. Bind only shipped derivatives.
const personal=await readPersonalLandscapeAssets();
files.push(...personal.files.map(file=>'output/personal-landscape-20260918/'+file.relative),...personal.receipt.provenance.map(record=>record.file),'output/personal-landscape-20260918/path/path-footprint.json','output/personal-landscape-20260918/path/path-support.json');
const records=await Promise.all(files.sort().map(async file=>({file,sha256:sha(await fs.readFile(file))}))),sourceSha256=sha(JSON.stringify(records));
const binding={at:new Date().toISOString(),profile:'local-review-pending-approval',head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),branch:execFileSync('git',['branch','--show-current'],{encoding:'utf8'}).trim(),sourceSha256,records};
await fs.writeFile(directory+'/source-binding.json',JSON.stringify(binding,null,2)+'\n');
const npm=path.join(path.dirname(process.execPath),'node_modules/npm/bin/npm-cli.js'),env={...process.env,PATH:path.dirname(process.execPath)+path.delimiter+process.env.PATH,EQ_PERSONAL_GRASS:"0",EQ_ASSET_PROFILE:'review',EQ_TEST_PORT:'4359',EQ_BROWSER_OUTPUT_DIR:'output/playwright/final-demo/'+run,PLAYWRIGHT_JSON_OUTPUT_NAME:directory+'/browser.json',COACH_MODE:'authored',VITE_EQ_PROFILE:'0',EQ_ALL_BROWSERS:'0',EQ_INDEPENDENT_REVIEW:'0',EQ_RECORD_CHAPTER:'1'},results=[];
// The separately authorized two-request live demo never runs during authored qualification.
env.EQ_GARDEN_AI_DEMO='0';
delete env.EQ_TEST_DEV;
for(const args of [['ci'],['run','validate:content'],['run','check'],['run','build:server'],['run','test:contracts'],['run','eval:coach','--','--mode','authored'],['run','build'],['run','test:browser']]){
 if(args[1]==='test:browser'&&env.EQ_WAIT_FOR_BROWSER_SLOT==='1'){
  console.log('WAIT for exclusive browser slot: '+directory+'/browser-release.json');
  for(;;){
   let release;try{release=JSON.parse(await fs.readFile(directory+'/browser-release.json','utf8'));}catch(error){if(error.code!=='ENOENT')throw error;}
   if(release){if(release.sourceSha256!==sourceSha256)throw Error('Browser release belongs to another source');break;}
   await new Promise(resolve=>setTimeout(resolve,1000));
  }
  for(const record of records)if(sha(await fs.readFile(record.file))!==record.sha256)throw Error('Source changed before browser release: '+record.file);
 }
 const command='npm '+args.join(' '),name=args[0]==='ci'?'ci':args[1].replaceAll(':','-'),log=directory+'/'+name+'.log',stream=await fs.open(log,'w'),started=new Date().toISOString();console.log('START '+command);
 const exit=await new Promise((resolve,reject)=>{const child=spawn(process.execPath,[npm,...args],{env,windowsHide:true,stdio:['ignore',stream.fd,stream.fd]});child.on('error',reject);child.on('exit',resolve);});await stream.close();
 const changed=[];for(const record of records)if(sha(await fs.readFile(record.file))!==record.sha256)changed.push(record.file);
 results.push({command,started,finished:new Date().toISOString(),exit,log,sourceSha256,sourceChangesDuringRun:changed});await fs.writeFile(directory+'/commands.json',JSON.stringify({binding:directory+'/source-binding.json',profile:binding.profile,results},null,2)+'\n');console.log('END '+command+' exit='+exit+' changed='+changed.length);
}
