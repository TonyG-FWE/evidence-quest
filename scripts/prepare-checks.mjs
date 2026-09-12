import {mkdir,copyFile,readdir,access,unlink} from 'node:fs/promises';
import{resolve}from'node:path';
// TypeScript preserves old outputs after a source test is removed. Retire only
// generated test files with no source counterpart, within this fixed directory.
const generated=resolve('.cache/checks/checks');
for(const file of await readdir(generated,{withFileTypes:true}))if(file.isFile()&&file.name.endsWith('.test.js')){
 try{await access(resolve('checks',file.name.replace(/\.js$/,'.ts')));}catch(error){if(error.code!=='ENOENT')throw error;await unlink(resolve(generated,file.name));}
}
await mkdir('.cache/checks/contracts/generated',{recursive:true});
await copyFile('contracts/generated/validators.mjs','.cache/checks/contracts/generated/validators.mjs');
