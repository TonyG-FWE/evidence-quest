import {readFile,readdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {gzipSync} from 'node:zlib';
const manifest=JSON.parse(await readFile('content/temp-assets.json','utf8'));
let bytes=0,rgba=0;const densities={};
for(const e of manifest.exports){const b=await readFile('public'+e.url);if(b.length!==e.actualBytes||createHash('sha256').update(b).digest('hex')!==e.sha256)throw new Error(e.id+' export changed');bytes+=b.length;const size=e.width*e.height*4;rgba+=size;densities[e.density]=(densities[e.density]??0)+size;}
const bundles=[];for(const name of await readdir('dist/client/assets'))if(/\.(js|css)$/.test(name)){const data=await readFile('dist/client/assets/'+name);bundles.push({file:name,bytes:data.length,gzipBytes:gzipSync(data).length});}
const result={at:new Date().toISOString(),quality:'Q00/Q01 temporary only',exports:manifest.exports.length,transferBytesAllDensities:bytes,rgbaBytesAllExportsAndDensities:rgba,rgbaBytesByDensity:densities,clientBundles:bundles,clientGzipEquivalentBytes:bundles.reduce((n,b)=>n+b.gzipBytes,0),limits:'Static file and RGBA arithmetic only. Gzip equivalent is not actual HTTP transfer; the local service sends uncompressed files. RGBA totals are not browser memory or GPU measurements. Final illustrated scene/cache/frame qualification remains TASK11.20 NOT_RUN.',inspection:'Current 640x360 whole-story screenshot shows both banks under the complete world band. 320x568 Largest/Roomier premiere heading and copy are readable through native scrolling.'};
await writeFile('evidence/temporary-budget.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
