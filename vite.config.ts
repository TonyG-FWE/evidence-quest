import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {createReadStream} from 'node:fs';
import {copyFile,mkdir,readFile,stat,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {personalGrassFile,readPersonalGrassSource} from './scripts/personal-grass-source.mjs';
import {readPersonalLandscapeAssets} from './scripts/personal-landscape-source.mjs';
const review=process.env['EQ_ASSET_PROFILE']==='review';
const personalGrass=process.env['EQ_PERSONAL_GRASS']==='1';
if(personalGrass&&!review)throw Error('Personal grass requires the explicit local review profile');
const clientOutput=personalGrass?'dist/personal-review-client':review?'dist/review-client':'dist/client';
const reviewAssets=resolve('.cache/final-demo-review/assets');
let building=false;

export default defineConfig({
  publicDir: process.env['EQ_DEMO_PUBLIC_DIR'] ?? 'public',
  plugins: [react(),...(review?[{name:'local-art-review',configResolved(config){building=config.command==='build';},async configureServer(server:import('vite').ViteDevServer){
   const original=personalGrass?await readPersonalGrassSource():null;
   const landscape=personalGrass?await readPersonalLandscapeAssets():null;
   if(landscape)server.middlewares.use('/personal-landscape',(req,res,next)=>{
    const name=(req.url??'').split('?')[0]!.replace(/^\//,'');
    const asset=landscape.files.find(file=>file.relative===name);
    if(!asset){next();return;}
    res.setHeader('Content-Type',name.endsWith('.glb')?'model/gltf-binary':name.endsWith('.json')?'application/json':name.endsWith('.jpg')?'image/jpeg':'image/png');
    res.setHeader('Content-Length',asset.bytes.length);res.end(req.method==='HEAD'?undefined:asset.bytes);
   });
   server.middlewares.use('/review-assets',async(req,res,next)=>{
    const name=(req.url??'').split('?')[0]!.replace(/^\//,'');
    if(!/^[a-z0-9-]+\.(glb|json)$/.test(name)){next();return;}
    if(original&&name===personalGrassFile){res.setHeader('Content-Type','model/gltf-binary');res.setHeader('Content-Length',original.bytes.length);res.end(req.method==='HEAD'?undefined:original.bytes);return;}
    try{const file=resolve(reviewAssets,name),info=await stat(file);res.setHeader('Content-Type',name.endsWith('.json')?'application/json':'model/gltf-binary');res.setHeader('Content-Length',info.size);createReadStream(file).pipe(res);}catch{next();}
   });
  },async closeBundle(){
   if(!building)return;
   const destination=clientOutput+'/review-assets';await mkdir(destination,{recursive:true});
   const manifest=JSON.parse(await readFile(resolve(reviewAssets,'manifest.json'),'utf8')) as {assets:Record<string,{uri:string;animations?:{uri:string}[]}>};
   const files=new Set(['manifest.json',...Object.values(manifest.assets).flatMap(a=>[a.uri,...(a.animations??[]).map(s=>s.uri)]).map(uri=>uri.split('/').at(-1)!)]);
   for(const file of files){if(!/^[a-z0-9-]+\.(glb|json)$/.test(file))throw Error('Invalid review artifact path');await copyFile(resolve(reviewAssets,file),resolve(destination,file));}
   if(personalGrass){const original=await readPersonalGrassSource();await writeFile(resolve(destination,personalGrassFile),original.bytes);await writeFile(resolve(clientOutput,'personal-grass-source.json'),JSON.stringify(original.receipt,null,2)+'\n');}
   if(personalGrass){const landscape=await readPersonalLandscapeAssets();for(const asset of landscape.files){const group=asset.relative.split('/')[0]!;await mkdir(resolve(clientOutput,'personal-landscape',group),{recursive:true});await writeFile(resolve(clientOutput,'personal-landscape',asset.relative),asset.bytes);}await writeFile(resolve(clientOutput,'personal-landscape-source.json'),JSON.stringify(landscape.receipt,null,2)+'\n');}
  }}]:[])],
  define: {__EQ_REVIEW__: JSON.stringify(review),__EQ_PERSONAL_GRASS__:JSON.stringify(personalGrass)},
  // Evidence contains many standalone review pages; only the application is a dependency entry.
  optimizeDeps: { entries: ['index.html'] },
  // Explicit permissive CSS path; see docs/PRODUCTION-TOOLCHAIN.md.
  css: { transformer: 'postcss' },
  server: {
    host: '127.0.0.1',
    port: Number(process.env['EQ_WEB_PORT'] ?? 5173),
    strictPort: true,
    watch: { ignored: ['**/evidence/**', '**/output/**', '**/.cache/**'] },
    proxy: { '/api': `http://127.0.0.1:${process.env['EQ_API_PORT'] ?? 8787}` },
  },
  build: {
    manifest: true,
    outDir: clientOutput,
    target: ['chrome111', 'edge111', 'firefox114', 'safari16.4'],
    license: true,
    cssMinify: 'esbuild',
  },
});
