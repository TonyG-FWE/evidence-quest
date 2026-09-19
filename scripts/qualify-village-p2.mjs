// Run each requested project command once; keep unrelated game failures as evidence.
import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';
import {REVIEW} from './tripo-village-config.mjs';
const folder=path.join(REVIEW,'verification'),report=path.join(folder,'project-commands.json');
await fs.mkdir(folder,{recursive:true});
try{await fs.access(report);throw Error('Qualification already started; inspect its records instead of repeating it.');}catch(e){if(e.code!=='ENOENT')throw e;}
const commands=[['ci'],['run','validate:content'],['run','check'],['run','build:server'],['run','test:contracts'],['run','eval:coach','--','--mode','authored'],['run','build'],['run','test:browser']];
const results=[];await fs.writeFile(report,JSON.stringify({status:'RUNNING',results},null,2));
for(const args of commands){const index=results.length+1,label=args.join(' '),log=path.join(folder,`${index}-${(args[1]??args[0]).replaceAll(':','-')}.log`),start=new Date().toISOString();console.log('Starting npm '+label);
const child=spawn(process.execPath,[path.resolve('.tools/node-v24.21.0-win-x64/node_modules/npm/bin/npm-cli.js'),...args],{windowsHide:true,env:{...process.env,PATH:path.dirname(process.execPath)+path.delimiter+process.env.PATH},stdio:['ignore','pipe','pipe']});let output='';for(const stream of [child.stdout,child.stderr])stream.on('data',x=>output+=x.toString());const code=await new Promise((resolve,reject)=>{child.on('close',resolve);child.on('error',reject);});await fs.writeFile(log,output);results.push({command:'npm '+label,start,end:new Date().toISOString(),exitCode:code,log:path.basename(log)});await fs.writeFile(report,JSON.stringify({status:results.length===8?'COMPLETE':'RUNNING',results},null,2)+'\n');console.log(JSON.stringify(results.at(-1)));}
console.log('All eight commands completed. Nonzero exits remain recorded, not repaired here.');
