import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn,execFileSync} from 'node:child_process';
import {Readable} from 'node:stream';
import {pipeline} from 'node:stream/promises';
import {createWriteStream} from 'node:fs';
import {verifyDemoReceipt,OUTPUT_DIRECTORIES} from './demo-build-receipt.mjs';
import {authoredEnvironment} from './demo-inputs.mjs';
import {TARGETS,NODE_VERSION,PORTABLE_SCHEMA,PORTABLE_MANIFEST,filesIn,packageRecords,recordFile,verifyPortable} from './portable-common.mjs';

const root=process.cwd(),target=process.platform+'-'+process.arch,definition=TARGETS[target];
if(!definition||process.argv.length!==2)throw Error('Package on supported native Windows x64, macOS x64/arm64 or Linux x64 with no arguments');
const receipt=await verifyDemoReceipt(root);
const commit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
// A documentation-only commit need not change compiled bytes. Require every
// verified input to exist in this commit and reject dirty selected source.
const inputPaths=new Set([...receipt.inputs.records.map(x=>x.file),'docs/PORTABLE-DEMO.md']);
const tracked=new Set(execFileSync('git',['ls-files','-z'],{encoding:'utf8',maxBuffer:16e6}).split('\0'));
const dirty=execFileSync('git',['diff','HEAD','--name-only','-z'],{encoding:'utf8',maxBuffer:16e6}).split('\0').filter(x=>inputPaths.has(x));
if(dirty.length||[...inputPaths].some(x=>!tracked.has(x)))throw Error('Commit all selected build inputs before packaging: '+dirty.join(', '));
const name='evidence-quest-'+target+'-'+commit.slice(0,12),out=path.resolve('output/portable');
await fs.mkdir(out,{recursive:true});
const stage=await fs.mkdtemp(path.join(out,'stage-')),directory=path.join(stage,name);
await fs.mkdir(directory);
const env=authoredEnvironment();
async function run(command,args,cwd=root){await new Promise((resolve,reject)=>{const child=spawn(command,args,{cwd,env,stdio:'inherit',windowsHide:true});child.on('error',reject);child.on('close',code=>code===0?resolve():reject(Error(command+' failed: '+code)));});}
async function copy(file,dest=file){await fs.mkdir(path.dirname(path.join(directory,dest)),{recursive:true});await fs.copyFile(path.join(root,file),path.join(directory,dest));}
for(const folder of OUTPUT_DIRECTORIES)for(const file of await filesIn(path.join(root,folder))){
 const relative=folder+'/'+file;
 if(relative.endsWith('/demo-package.json')||/\.(br|gz|map)$/.test(relative))continue;
 await copy(relative);
}
await copy('scripts/portable-launch.mjs','launch.mjs');await copy('scripts/portable-common.mjs','portable-common.mjs');
await copy('package.json');await copy('package-lock.json');
const lock=JSON.parse(await fs.readFile('package-lock.json','utf8'));
if(Object.entries(lock.packages).some(([key,value])=>key&&!value.dev&&value.hasInstallScript))throw Error('Production install scripts need explicit packaging review');
const npm=process.env.npm_execpath??path.join(path.dirname(process.execPath),'node_modules/npm/bin/npm-cli.js');
await run(process.execPath,[npm,'ci','--omit=dev','--ignore-scripts','--bin-links=false','--no-audit','--no-fund'],directory);
await fs.writeFile(path.join(directory,'package.json'),JSON.stringify({name:'evidence-quest-portable',private:true,type:'module'},null,2)+'\n');
await fs.unlink(path.join(directory,'package-lock.json'));
await fs.rm(path.join(directory,'node_modules/.package-lock.json'),{force:true});
await fs.mkdir(path.join(root,'.cache/portable-runtimes'),{recursive:true});
const archive=path.join(root,'.cache/portable-runtimes',definition.archive);
try{await fs.access(archive);}catch(error){
 if(error.code!=='ENOENT')throw error;
 const response=await fetch('https://nodejs.org/dist/v'+NODE_VERSION+'/'+definition.archive);
 if(!response.ok||!response.body)throw Error('Runtime download failed: '+response.status);
 const partial=archive+'.partial';await pipeline(Readable.fromWeb(response.body),createWriteStream(partial,{flags:'wx'}));await fs.rename(partial,archive);
}
if((await recordFile(path.dirname(archive),path.basename(archive))).sha256!==definition.sha256)throw Error('Official runtime checksum differs');
const unpack=await fs.mkdtemp(path.join(out,'runtime-'));
await run('tar',['-xf',archive,'-C',unpack]);
const nodeDirectory=path.join(unpack,definition.archive.replace(/\.(zip|tar\.gz)$/,''));
await fs.mkdir(path.join(directory,'runtime'));
const executable='runtime/'+(process.platform==='win32'?'node.exe':'node');
await fs.copyFile(path.join(nodeDirectory,definition.executable),path.join(directory,executable));
await fs.chmod(path.join(directory,executable),0o755);
await fs.copyFile(path.join(nodeDirectory,'LICENSE'),path.join(directory,'runtime/LICENSE'));
await fs.copyFile(path.join(nodeDirectory,'README.md'),path.join(directory,'runtime/README.md'));
await copy('docs/PORTABLE-DEMO.md','START-HERE.md');
await fs.mkdir(path.join(directory,'licenses'));
for(const file of ['APACHE-2.0.txt','BASIS-README.md','THREE-LICENSE.txt'])await copy('assets/demo/decoders/'+file,'licenses/'+file);
await fs.writeFile(path.join(directory,'licenses/README.txt'),'Node notices are in runtime/LICENSE; production dependency notices remain with their packages under node_modules. Frontend bundled dependency notices are in dist/personal-review-client/.vite/license.md. Game asset provenance remains in the source repository at commit '+commit+'. No new license to game artwork or other original material is granted by packaging.\n');
let launcher;
if(process.platform==='win32'){
 launcher='Start Evidence Quest.cmd';
 await fs.writeFile(path.join(directory,launcher),'@echo off\r\nsetlocal\r\nset "NODE_OPTIONS="\r\nset "NODE_PATH="\r\n"%~dp0runtime\\node.exe" "%~dp0launch.mjs" %*\r\nif errorlevel 1 pause\r\n');
}else{
 launcher=process.platform==='darwin'?'Start Evidence Quest.command':'Start Evidence Quest.sh';
 await fs.writeFile(path.join(directory,launcher),'#!/bin/sh\nunset NODE_OPTIONS NODE_PATH\nEQ_PORTABLE_ROOT=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd) || exit 1\nexec "$EQ_PORTABLE_ROOT/runtime/node" "$EQ_PORTABLE_ROOT/launch.mjs" "$@"\n');
 await fs.chmod(path.join(directory,launcher),0o755);
}
const records=await packageRecords(directory);
await fs.writeFile(path.join(directory,PORTABLE_MANIFEST),JSON.stringify({schema:PORTABLE_SCHEMA,commit,target,nodeVersion:NODE_VERSION,runtimeArchive:definition.archive,runtimeSha256:definition.sha256,sourceInputSha256:receipt.inputs.sha256,compiledOutputSha256:receipt.outputs.sha256,launcher,offline:true,files:records},null,2)+'\n');
await verifyPortable(directory);
const archiveName=name+(process.platform==='win32'?'.zip':'.tar.gz'),destination=path.join(out,archiveName);
try{await fs.access(destination);throw Error('Archive already exists; preserve it or use a new commit: '+destination);}catch(error){if(error.code!=='ENOENT')throw error;}
await run('tar',process.platform==='win32'?['-a','-cf',destination,'-C',stage,name]:['-czf',destination,'-C',stage,name]);
const archiveRecord=await recordFile(out,archiveName);if(archiveRecord.bytes>=2*1024**3)throw Error('Release archive exceeds the 2 GiB asset limit');
await fs.writeFile(destination+'.sha256',archiveRecord.sha256+'  '+archiveName+'\n');
await fs.writeFile(path.join(out,'latest-'+target+'.json'),JSON.stringify({directory,archive:destination,...archiveRecord,commit,target,launcher},null,2)+'\n');
// Only disposable extraction is removed; the reviewable package stage remains.
if(path.dirname(unpack)!==out||!path.basename(unpack).startsWith('runtime-'))throw Error('Unexpected runtime extraction path');
await fs.rm(unpack,{recursive:true});
console.log(JSON.stringify({status:'PACKAGED',directory,archive:destination,bytes:archiveRecord.bytes,commit,target}));
