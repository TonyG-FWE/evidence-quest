import {readFile,readdir,realpath,unlink,stat} from 'node:fs/promises';
import {resolve,join,sep} from 'node:path';
const root=await realpath('public/art/runtime'),expected=resolve('public/art/runtime');if(root.toLowerCase()!==expected.toLowerCase())throw Error('Unexpected runtime-art directory');
const manifest=JSON.parse(await readFile('content/production-assets.json','utf8')),used=new Set(Object.values(manifest).flatMap(row=>Object.values(row.levels).flatMap(level=>level.frames.flatMap(frame=>[frame.url,frame.fallbackUrl].filter(Boolean).map(url=>url.split('/').at(-1))))));
let removed=0;for(const name of await readdir(root)){if(used.has(name)||!/^\w{24}\.(png|webp)$/.test(name))continue;const path=resolve(join(root,name));if(!path.startsWith(root+sep)||(await realpath(path)).toLowerCase()!==path.toLowerCase()||!(await stat(path)).isFile())throw Error('Unexpected derivative target');await unlink(path);removed++;}
console.log(`Removed ${removed} obsolete hashed derivatives inside verified public/art/runtime; accepted sources preserved.`);
