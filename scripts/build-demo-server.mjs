/** Compile into a fresh directory; preserve previous outputs rather than
 * inheriting stale modules from a different server build. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const root=process.cwd();await fs.mkdir('.cache',{recursive:true});
const stage=await fs.mkdtemp(path.resolve('.cache/demo-server-'));
const result=spawnSync(process.execPath,['node_modules/typescript/bin/tsc','-p','tsconfig.server.json','--outDir',stage],{stdio:'inherit',windowsHide:true});
if(result.status!==0)throw Error('Demo server compilation failed');
await fs.mkdir(path.join(stage,'contracts/generated'),{recursive:true});
await fs.copyFile('contracts/generated/validators.mjs',path.join(stage,'contracts/generated/validators.mjs'));
const previous=await fs.mkdtemp(path.resolve('.cache/previous-demo-server-'));await fs.mkdir('dist',{recursive:true});
for(const name of ['server','src','content','contracts']){
 const destination=path.resolve(root,'dist',name),compiled=path.join(stage,name);
 if(path.dirname(destination)!==path.resolve(root,'dist'))throw Error('Server output escaped the workspace');
 await fs.access(compiled);
 try{await fs.rename(destination,path.join(previous,name));}catch(error){if(error.code!=='ENOENT')throw error;}
 await fs.rename(compiled,destination);
}
