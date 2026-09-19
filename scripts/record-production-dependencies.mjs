import {readFile,readdir,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const sha=b=>createHash('sha256').update(b).digest('hex'),lock=JSON.parse(await readFile('package-lock.json','utf8')),rows=[];
for(const [path,entry]of Object.entries(lock.packages)){
 if(!path)continue;
 const license=entry.license??null;if(!license||/\b(?:A?GPL|LGPL|MPL|EPL|CDDL|SSPL)\b/i.test(license))throw Error('Review required license '+path+' '+license);
 rows.push({path,version:entry.version,license,integrity:entry.integrity??null,installed:await readFile(path+'/package.json').then(()=>true,()=>false)});
}
const packages=['pngjs','@jsquash/webp','wasm-feature-detect'];let notices='# Production image tooling notices\n\n';const licenseFiles=[];
for(const name of packages){
 const root='node_modules/'+name,pkg=JSON.parse(await readFile(root+'/package.json','utf8'));
 const files=(await readdir(root)).filter(f=>/^license/i.test(f)).map(f=>root+'/'+f);if(name==='@jsquash/webp')files.push(root+'/codec/LICENSE.codec.md');
 for(const path of files){const text=await readFile(path,'utf8');licenseFiles.push({path,sha256:sha(text)});notices+=`## ${name} ${pkg.version} — ${path.split('/').at(-1)}\n\n${text}\n\n`;}
}
if(rows.some(r=>/sharp|@img/.test(r.path)))throw Error('Restricted image dependency remains in lock');
await mkdir('docs/licenses',{recursive:true});await writeFile('docs/licenses/production-image-tools.md',notices);
await writeFile('evidence/er13/production-tool-licenses.json',JSON.stringify({checkedAt:new Date().toISOString(),lockSha256:sha(await readFile('package-lock.json')),replacement:{removed:'sharp0.35.4 / @img LGPL-3.0-or-later; Vite8 required lightningcss MPL-2.0',current:'pngjs7.0.0 MIT; jsquash/webp1.5.0 Apache-2.0; bundled libwebp BSD-3-Clause; wasm-feature-detect1.9.0 Apache-2.0; Vite7.3.6 and React plugin5.2.0 MIT with PostCSS/esbuild CSS path',scope:'Documented build-tool pin correction and deterministic production derivatives; original accepted artwork and gameplay contracts unchanged.'},packages:rows,licenseFiles,sources:['https://github.com/pngjs/pngjs','https://github.com/jamsinclair/jSquash/tree/main/packages/webp','https://github.com/GoogleChromeLabs/wasm-feature-detect','https://v7.vite.dev/guide/features.html']},null,2)+'\n');
console.log(`${rows.length} lockfile package license declarations checked; LGPL exporter removed; bundled WebP BSD license retained.`);
