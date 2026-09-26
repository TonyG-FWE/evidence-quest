import fs from 'node:fs/promises';
import path from 'node:path';
import {demoPublicFiles} from './demo-inputs.mjs';
const ownedStages=new Map();
async function removeStage(directory){
 const cache=ownedStages.get(directory);
 if(!cache||path.dirname(directory)!==cache||!/^demo-public-[a-zA-Z0-9]{6}$/.test(path.basename(directory)))throw Error('Refusing to remove an unowned demo stage');
 if(await fs.realpath(cache)!==cache||(await fs.lstat(directory)).isSymbolicLink()||await fs.realpath(directory)!==directory)throw Error('Demo stage path changed');
 await fs.rm(directory,{recursive:true});
 ownedStages.delete(directory);
}
/** Isolated public selection. The owning consumer must use withDemoPublic. */
export async function stageDemoPublic(root=process.cwd()){
 root=await fs.realpath(root);
 const cache=path.join(root,'.cache');await fs.mkdir(cache,{recursive:true});
 if(await fs.realpath(cache)!==cache)throw Error('Demo cache must remain inside the workspace');
 const directory=await fs.mkdtemp(path.join(cache,'demo-public-'));
 ownedStages.set(directory,cache);
 try{
  for(const entry of await demoPublicFiles(root)){
   const target=path.join(directory,entry.target);await fs.mkdir(path.dirname(target),{recursive:true});await fs.copyFile(path.join(root,entry.file),target,1);
  }
  return directory;
 }catch(error){
  try{await removeStage(directory);}catch(cleanupError){throw new AggregateError([error,cleanupError],'Demo staging and cleanup failed');}
  throw error;
 }
}

/** Keep this run's assets until its awaited consumer has completely exited. */
export async function withDemoPublic(consume,root=process.cwd()){
 const directory=await stageDemoPublic(root);
 try{return await consume(directory);}finally{await removeStage(directory);}
}
