import fs from 'node:fs/promises';
import path from 'node:path';
import {demoPublicFiles} from './demo-inputs.mjs';
/** Isolated copy retained for local inspection. No ambient public garden files. */
export async function stageDemoPublic(root=process.cwd()){
 await fs.mkdir(path.join(root,'.cache'),{recursive:true});
 const directory=await fs.mkdtemp(path.resolve(root,'.cache/demo-public-'));
 for(const entry of await demoPublicFiles(root)){
  const target=path.join(directory,entry.target);await fs.mkdir(path.dirname(target),{recursive:true});await fs.copyFile(path.join(root,entry.file),target,1);
 }
 return directory;
}
