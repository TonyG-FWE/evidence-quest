import {readdir,readFile,writeFile} from 'node:fs/promises';
import {gzipSync,brotliCompressSync,constants} from 'node:zlib';
import {resolve,sep} from 'node:path';
const review=process.env.EQ_ASSET_PROFILE==='review',personalGrass=process.env.EQ_PERSONAL_GRASS==='1';
if(personalGrass&&!review)throw Error('Personal grass requires the explicit local review profile');
const clientRoot=resolve(process.argv[2]??(personalGrass?'dist/personal-review-client':review?'dist/review-client':'dist/client'));
if(!clientRoot.startsWith(resolve('.')+sep))throw Error('Client output must stay in this workspace');
const manifest=JSON.parse(await readFile(clientRoot+'/.vite/manifest.json','utf8'));
const entry=manifest['src/ui/App.tsx'];
if(!entry?.isDynamicEntry||!/^assets\/App-[\w-]+\.js$/.test(entry.file))throw Error('Missing built application retry entry');
await writeFile(clientRoot+'/client-entry.json',JSON.stringify({module:'/'+entry.file,styles:(entry.css??[]).map(path=>'/'+path)})+'\n');
async function visit(directory){
 for(const entry of await readdir(directory,{withFileTypes:true})){
  const path=directory+'/'+entry.name;if(entry.isDirectory()){await visit(path);continue;}
  if(!/\.(html|js|css|json|svg|wasm|glb)$/.test(path))continue;
  const bytes=await readFile(path);if(bytes.length<256)continue;
  await writeFile(path+'.gz',gzipSync(bytes,{level:9}));
  await writeFile(path+'.br',brotliCompressSync(bytes,{params:{[constants.BROTLI_PARAM_QUALITY]:9}}));
 }
}
await visit(clientRoot);console.log('Prepared Brotli/gzip variants for text, model and decoder assets. Original sources are unchanged.');
