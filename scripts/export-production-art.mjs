import {decodePng,encodePng,cropResize,losslessWebp} from './image-codec.mjs';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';

const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
const originals=JSON.parse(await readFile('content/illustrated-assets.json','utf8'));
const sceneScale=JSON.parse(await readFile('content/scene-scale.json','utf8'));
const specification=JSON.parse(await readFile('docs/design/evidence-quest-design-v3/10-asset-production/asset-manifest.json','utf8'));
const byId=new Map(specification.assets.map(asset=>[asset.id,asset]));
const directory='public/art/runtime';await mkdir(directory,{recursive:true});
const sourceFiles=new Map(),derivatives=new Map(),generated={};
const codec={pngjs:'7.0.0',webp:'1.5.0',resampler:'premultiplied-lanczos3-v1',pngOptimizer:'lossless-best-of-adaptive-sub-paeth-rgb-v2'},cache=new Map();
try{const old=JSON.parse(await readFile('evidence/er13/production-art-exports.json','utf8'));for(const file of old.files??[])if(file.signature){const parsed=JSON.parse(file.signature);cache.set(file.signature,file);if(!parsed[0].pngOptimizer||parsed[0].pngOptimizer==='lossless-best-of-adaptive-sub-paeth-v1'){parsed[0].pngOptimizer=codec.pngOptimizer;cache.set(JSON.stringify(parsed),file);}}}catch{}
for(const [key,original] of Object.entries(originals)){
 if(key.startsWith('ER13.ATLAS.'))continue; // Source atlas rows are not runtime owners; canonical aliases below are exported.
 if(key.startsWith('ASSET.ACT.PLAYER/')&&!/^ASSET\.ACT\.PLAYER\/(idle|walk|carry|reach)-(front|back|left|right)$/.test(key))continue; // Canonical four-direction bindings own these accepted cels.
 const id=key.slice(0,key.indexOf('/')),asset=byId.get(id),backplate=id.endsWith('.BACKPLATE');
 if(!sourceFiles.has(original.url)){const bytes=await readFile('public'+original.url);sourceFiles.set(original.url,{bytes,sha256:digest(bytes),metadata:decodePng(bytes)});}
 const source=sourceFiles.get(original.url),reference=original.referenceHeight;
 // Paper characters are also read at the new, enlarged Watch size.
 const actorScale=sceneScale.actors[id.replace(/^ASSET\./,'')];
 const target=actorScale?[actorScale.height*sceneScale.exportPixelsPerUnit,actorScale.height*sceneScale.exportPixelsPerUnit]:id==='ASSET.ENV.DOOR'?[216,444]:backplate?[960,640]:['ASSET.PUP.PIP','ASSET.PUP.GRANDMA'].includes(id)?[240,160]:id==='ER13.MATERIAL.PAPER'?[384,384]:id==='ASSET.PROP.CADDY'?[144,126]:asset?.geometry.contentPixels??[256,256];
 generated[key]={group:asset?.loadGroup??(id==='ER13.MATERIAL.PAPER'?'puppet':'shared'),sourceUrl:original.url,sourceSha256:source.sha256,levels:{}};
 for(const density of [1,2]){
  const frames=[];
  for(const cell of original.frames??[{rect:original.contentRectPixels,anchor:original.anchor}]){
   const [left,top,right,bottom]=cell.rect,width=right-left,height=bottom-top;
   if(![left,top,width,height].every(Number.isInteger)||left<0||top<0||width<=0||height<=0||right>source.metadata.width||bottom>source.metadata.height)throw Error('Invalid source rectangle '+key);
   const scale=Math.min(1,reference?target[1]*density/reference:Math.min(target[0]*density/width,target[1]*density/height));
   const outputWidth=Math.max(1,Math.round(width*scale)),outputHeight=Math.max(1,Math.round(height*scale)),pad=backplate||id==='ER13.MATERIAL.PAPER'?0:4*density;
   const webpEligible=true; // Lossless alpha and opaque frames; exact PNG fallback retained for every frame.
   const signature=JSON.stringify([codec,source.sha256,cell.rect,outputWidth,outputHeight,pad,webpEligible]);
   let output=derivatives.get(signature);
   if(!output&&cache.has(signature)){
    const cached=cache.get(signature);try{if(digest(await readFile('public'+cached.url))===cached.sha256&&(!cached.webp||digest(await readFile('public'+cached.webp.url))===cached.webp.sha256)){
     output=cached;
     if(cached.signature!==signature){
      const info=decodePng(await readFile('public'+cached.url)),data=encodePng(info),decoded=decodePng(data);
      if(decoded.width!==info.width||decoded.height!==info.height||!decoded.data.equals(info.data))throw Error('PNG optimization changed samples');
      const sha256=digest(data),url='/art/runtime/'+sha256.slice(0,24)+'.png';await writeFile('public'+url,data);
      output={...cached,url,sha256,bytes:data.length};
     }
    }}catch(error){if(error?.message==='PNG optimization changed samples')throw error;}
   }
   if(!output){
    const info=cropResize(source.metadata,cell.rect,outputWidth,outputHeight,pad),data=encodePng(info);
    const sha256=digest(data),filename=sha256.slice(0,24)+'.png';await writeFile(directory+'/'+filename,data);
    output={url:'/art/runtime/'+filename,sha256,bytes:data.length,width:info.width,height:info.height,contentRectPixels:[pad,pad,info.width-pad,info.height-pad],rgbaBytes:info.width*info.height*4,padding:pad,format:'png',sourceUrl:original.url,sourceSha256:source.sha256,sourceRect:cell.rect,scale};
    if(webpEligible){const webp=await losslessWebp(info),webpHash=digest(webp);await writeFile(directory+'/'+webpHash.slice(0,24)+'.webp',webp);output.webp={url:'/art/runtime/'+webpHash.slice(0,24)+'.webp',sha256:webpHash,bytes:webp.length};}
   }
   output.signature=signature;derivatives.set(signature,output);
   const sx=(output.width-2*pad)/width,sy=(output.height-2*pad)/height;
   frames.push({url:output.webp?.url??output.url,fallbackUrl:output.webp?output.url:null,fallbackBytes:output.webp?output.bytes:null,width:output.width,height:output.height,contentRectPixels:output.contentRectPixels,anchor:(cell.anchor??[width/2,height]).map((n,index)=>n*(index?sy:sx)),referenceHeight:reference?reference*sy:null,mirror:original.mirror??false,rgbaBytes:output.rgbaBytes,bytes:output.webp?.bytes??output.bytes});
  }
  generated[key].levels[density]={density,frames};
 }
}
await writeFile('content/production-assets.json',JSON.stringify(generated,null,2)+'\n');
const files=[...derivatives.values()],groups=specification.budget.groups.map(group=>{
 const rows=Object.values(generated).filter(row=>row.group===group.group),levels={};
 for(const level of [1,2]){const frames=[...new Map(rows.flatMap(row=>row.levels[level].frames).map(frame=>[frame.url,frame])).values()];levels[level]={uniqueFrames:frames.length,encodedBytes:frames.reduce((sum,frame)=>sum+frame.bytes,0),rgbaBytes:frames.reduce((sum,frame)=>sum+frame.rgbaBytes,0),transferCapBytes:level===1?group.transferCapBaseBytes:group.transferCapHighBytes};}
 return {group:group.group,levels};
});
await writeFile('evidence/er13/production-art-exports.json',JSON.stringify({recordedAt:new Date().toISOString(),tool:codec,method:'Exact accepted crops, premultiplied Lanczos3 reduction, no enlargement, 4/8 transparent pixel padding for alpha, lossless WebP and exact PNG fallback for every opaque and alpha frame. Original files unchanged. Alias/crop/size-identical outputs deduplicated. Cached derivatives hash-verified before reuse.',authority:'Parent permits density derivatives bounded by actual source detail; no invented2880px source detail.',sourceManifestSha256:digest(await readFile('content/illustrated-assets.json')),bindingCount:Object.keys(generated).length,uniquePngs:files.length,pngBytes:files.reduce((sum,file)=>sum+file.bytes,0),groups,files},null,2)+'\n');
console.log(JSON.stringify({bindings:Object.keys(generated).length,pngs:files.length,groups}));
