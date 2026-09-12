import {readdir,readFile,writeFile} from 'node:fs/promises';
import {gzipSync,brotliCompressSync,constants} from 'node:zlib';
const manifest=JSON.parse(await readFile('dist/client/.vite/manifest.json','utf8'));
const entry=manifest['src/ui/App.tsx'];
if(!entry?.isDynamicEntry||!/^assets\/App-[\w-]+\.js$/.test(entry.file))throw Error('Missing built application retry entry');
await writeFile('dist/client/client-entry.json',JSON.stringify({module:'/'+entry.file,styles:(entry.css??[]).map(path=>'/'+path)})+'\n');
async function visit(directory){
 for(const entry of await readdir(directory,{withFileTypes:true})){
  const path=directory+'/'+entry.name;if(entry.isDirectory()){await visit(path);continue;}
  if(!/\.(html|js|css|json|svg)$/.test(path))continue;
  const bytes=await readFile(path);if(bytes.length<256)continue;
  await writeFile(path+'.gz',gzipSync(bytes,{level:9}));
  await writeFile(path+'.br',brotliCompressSync(bytes,{params:{[constants.BROTLI_PARAM_QUALITY]:9}}));
 }
}
await visit('dist/client');console.log('Prepared Brotli/gzip variants for text assets. Original image sources are unchanged.');
