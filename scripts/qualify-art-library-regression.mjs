import fs from 'node:fs/promises';
import {createWriteStream} from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
const dir=path.resolve('evidence/hands-on-20260916/pilot/articulated-library-20260917/verification');
await fs.mkdir(dir,{recursive:true});
const stamp=new Date().toISOString().replaceAll(':','-'),file=path.join(dir,'regression-'+stamp+'.json');
const record={schema:'eq.art-library-regression.v1',startedAt:new Date().toISOString(),scope:'Existing project regression. New 3D assets remain review-only; this run does not qualify live integration.',commands:[]};
const commands=[['validate:content'],['check'],['build:server'],['test:contracts'],['eval:coach','--','--mode','authored'],['build'],['test:browser']];
for(const [name,...args] of commands){
 const log=path.join(dir,'regression-'+stamp+'-'+name.replaceAll(':','-')+'.log'),output=createWriteStream(log);
 const row={command:'npm run '+[name,...args].join(' '),startedAt:new Date().toISOString(),log:path.relative(process.cwd(),log).replaceAll('\\','/')};record.commands.push(row);await fs.writeFile(file,JSON.stringify(record,null,2)+'\n');console.log('RUN '+row.command);
 const child=spawn(process.execPath,[path.resolve('.tools/node-v24.21.0-win-x64/node_modules/npm/bin/npm-cli.js'),'run',name,...args],{windowsHide:true,env:{...process.env,PATH:path.dirname(process.execPath)+path.delimiter+process.env.PATH},stdio:['ignore','pipe','pipe']});child.stdout.pipe(output,{end:false});child.stderr.pipe(output,{end:false});
 row.exitCode=await new Promise((resolve,reject)=>{child.on('error',reject);child.on('close',resolve);});await new Promise(resolve=>output.end(resolve));row.finishedAt=new Date().toISOString();row.result=row.exitCode===0?'PASS':'FAIL';console.log(row.result+' '+row.command);await fs.writeFile(file,JSON.stringify(record,null,2)+'\n');
}
record.finishedAt=new Date().toISOString();record.result=record.commands.every(r=>r.exitCode===0)?'PASS':'FAIL';await fs.writeFile(file,JSON.stringify(record,null,2)+'\n');console.log(file);if(record.result==='FAIL')process.exitCode=1;
