/** Required commands bound to the actual personal demo; no provider requests. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn,execFileSync} from 'node:child_process';
import {hydrateDemoAssets} from './demo-assets.mjs';
import {stageDemoPublic} from './demo-public.mjs';
import {captureDemoInputs,fileRecords,listFiles,recordsDigest,changedRecords,authoredEnvironment} from './demo-inputs.mjs';
import {verifyLedgerHistory} from './demo-ledgers.mjs';
const run=process.argv[2]??'candidate-1';if(!/^[a-z0-9-]+$/.test(run))throw Error('Invalid run ID');
const directory='evidence/demo-release-20260919/'+run;await fs.mkdir(directory,{recursive:true});
await hydrateDemoAssets();
const operationalLedgers=await verifyLedgerHistory();
async function candidateRecords(){
 const inputs=await captureDemoInputs(),extra=[];
 for(const folder of ['checks','browser-tests','evaluation'])extra.push(...await listFiles(process.cwd(),folder));
 for(const file of await fs.readdir('.'))if(/^(?:.*config[^/]*\.(?:ts|json)|AGENTS\.md|README\.md|\.gitignore)$/.test(file))extra.push(file);
 extra.push('evidence/group-7-review-20260915/group-6-migration-inputs.json');
 return [...new Map([...inputs.records,...await fileRecords(process.cwd(),extra)].map(record=>[record.file,record])).values()].sort((a,b)=>a.file.localeCompare(b.file,'en'));
}
const records=await candidateRecords(),sourceSha256=recordsDigest(records);
const binding={at:new Date().toISOString(),profile:'personal-review-fitted-paths-and-banks',head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),branch:execFileSync('git',['branch','--show-current'],{encoding:'utf8'}).trim(),sourceSha256,records,operationalLedgers};
await fs.writeFile(directory+'/source-binding.json',JSON.stringify(binding,null,2)+'\n');
const npm=path.join(path.dirname(process.execPath),'node_modules/npm/bin/npm-cli.js');
const env={...authoredEnvironment(),PATH:path.dirname(process.execPath)+path.delimiter+process.env.PATH,EQ_TEST_PORT:'4384',EQ_BROWSER_OUTPUT_DIR:'output/playwright/demo-release/'+run,PLAYWRIGHT_JSON_OUTPUT_NAME:directory+'/browser.json',EQ_ALL_BROWSERS:'1',EQ_DEMO_PUBLIC_DIR:await stageDemoPublic()};
delete env.EQ_REVIEW_CLIENT_DIRECTORY;delete env.EQ_TEST_DEV;delete env.VITE_EQ_PROFILE;
const commands=[['ci'],['run','validate:content'],['run','check'],['run','build:server'],['run','test:contracts'],['run','eval:coach','--','--mode','authored'],['run','build'],['run','test:browser']],results=[];
for(const args of commands){
 const command='npm '+args.join(' '),name=args[0]==='ci'?'ci':args[1].replaceAll(':','-'),log=directory+'/'+name+'.log',output=await fs.open(log,'w'),started=new Date().toISOString();console.log('START '+command);
 const exit=await new Promise((resolve,reject)=>{const child=spawn(process.execPath,[npm,...args],{env,windowsHide:true,stdio:['ignore',output.fd,output.fd]});child.on('error',reject);child.on('exit',resolve);});await output.close();
 const changed=changedRecords(records,await candidateRecords());
 const currentLedgers=await verifyLedgerHistory(),ledgerChanges=changedRecords(operationalLedgers.ledgers,currentLedgers.ledgers);
 results.push({command,started,finished:new Date().toISOString(),exit,log,sourceSha256,sourceChangesDuringRun:changed,operationalLedgerChanges:ledgerChanges});await fs.writeFile(directory+'/commands.json',JSON.stringify({binding:directory+'/source-binding.json',profile:binding.profile,results},null,2)+'\n');console.log('END '+command+' exit='+exit+' changed='+changed.length);
 if(changed.length)throw Error('Candidate changed during verification; preserve this run and bind the successor');
 if(ledgerChanges.length)throw Error('Operational history changed during authored qualification; preserve this run and investigate: '+ledgerChanges.join(', '));
}
if(results.some(result=>result.exit!==0))process.exitCode=1;
