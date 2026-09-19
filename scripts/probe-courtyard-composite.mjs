// Isolated feasibility probe. It never writes public/, content/, dist/ or runtime source.
// Run only after the coordinator releases the quiet qualification window:
// EQ_ALLOW_COMPOSITE_PROBE=1 node scripts/probe-courtyard-composite.mjs
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {encodePng,decodePng} from './image-codec.mjs';
import sharp from 'sharp';

if(process.env.EQ_ALLOW_COMPOSITE_PROBE!=='1')throw Error('Explicit coordinator release required: EQ_ALLOW_COMPOSITE_PROBE=1.');
process.env.PLAYWRIGHT_BROWSERS_PATH??=path.resolve('.cache/browsers');
const {chromium}=await import('@playwright/test');
const stamp=new Date().toISOString().replaceAll(':','-').replaceAll('.','-');
const out=path.resolve('evidence/staged-bridge-20260916/transfer-reuse/composite-probe-'+stamp);
await fs.mkdir(out,{recursive:false});
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const identity=async file=>{const bytes=await fs.readFile(file);return {path:file.replaceAll('\\','/'),sha256:sha(bytes),bytes:bytes.length};};
const production=JSON.parse(await fs.readFile('content/production-assets.json','utf8'));
const definitions=[
 {key:'ASSET.ENV.CY.BACKPLATE/base',kind:'draw',rect:[0,0,120,80]},
 {key:'ASSET.PROP.CY.BENCH/base',kind:'contained',rect:[10,19,42,40]},
 {key:'ASSET.PROP.CY.STAND/base',kind:'contained',rect:[48,22,58,38]},
 {key:'ASSET.PROP.CY.BOARD/base',kind:'contained',rect:[80,12,108,40]},
];
const sources=new Set(['scripts/probe-courtyard-composite.mjs','scripts/image-codec.mjs','src/world/assets.ts','src/world/paint.ts','src/world/World.tsx','src/ui/app.css','content/production-assets.json','content/illustrated-assets.json','content/temp-assets.json']);
const layers=[];
for(const def of definitions){
 const row=production[def.key],levels={};sources.add('public'+row.sourceUrl);
 for(const density of [1,2]){
  const frame=row.levels[density].frames[0],file='public'+frame.fallbackUrl,bytes=await fs.readFile(file);sources.add(file);
  if(bytes.length!==frame.fallbackBytes)throw Error('Pinned PNG byte mismatch: '+file);
  levels[density]={...frame,dataUrl:'data:image/png;base64,'+bytes.toString('base64')};
 }
 layers.push({...def,levels});
}
const inventoryBindings=[];
for(const format of ['WebP','PNG']){
 const file=`evidence/staged-bridge-20260916/final-studio/performance/chromium-DPR2-${format}-qualification.json`,report=JSON.parse(await fs.readFile(file,'utf8'));
 const resources=report.snapshots[1].resources.slice(report.snapshots[0].resources.length),visit=report.transfers[1];
 if(visit.room!=='SC.CY'||resources.reduce((sum,r)=>sum+r.encodedBytes,0)!==visit.encodedBytes)throw Error('Final Courtyard inventory mismatch.');
 const invariantUrls=new Set(layers.map(layer=>layer.levels[2][format==='WebP'?'url':'fallbackUrl']));
 const replaced=resources.filter(r=>invariantUrls.has(r.url)&&r.encodedBytes>0);
 if(replaced.length!==4||new Set(replaced.map(r=>r.url)).size!==4)throw Error('Invariant request count differs from four unique layers.');
 const replacedBytes=replaced.reduce((sum,r)=>sum+r.encodedBytes,0),otherBytes=visit.encodedBytes-replacedBytes;
 inventoryBindings.push({format,receipt:await identity(file),room:visit.room,visitIndex:1,measuredBytes:visit.encodedBytes,roomLimitBytes:report.transferLimits.room,replaced,replacedBytes,otherBytes,compositeCeilingBytes:report.transferLimits.room-otherBytes});
}
const before=await Promise.all([...sources].map(identity));
const limits={width:2880,height:1920,webpBytes:inventoryBindings.find(r=>r.format==='WebP').compositeCeilingBytes,pngBytes:inventoryBindings.find(r=>r.format==='PNG').compositeCeilingBytes};
const status={schema:'EQ.COURTYARD.COMPOSITE.PROBE.1',startedAt:new Date().toISOString(),qualification:false,productionChanged:false,
 scope:'Four invariant Courtyard base layers only; original accepted production RGBA samples, crops, anchors, ordering and drawContained math. All interactive and animated layers excluded. Chromium Canvas2D renders the composite at 24 pixels per world unit. No geometry, DPR, budget, displayed content or accounting changes.',
 sourceIdentities:before,inventoryBindings,layers:layers.map(({levels,...def})=>({...def,levels:Object.fromEntries(Object.entries(levels).map(([d,{dataUrl,...frame}])=>[d,frame]))})),limits,
 state:'PREPARED',limitations:['This is an isolated raster/size feasibility experiment, not a playable-build qualification.','The high-density comparison retains the same currently available 2x RGBA sources; it does not invent additional source detail.','Pixel differences identify changed filtering; numerical similarity is not human visual acceptance.','Final resource-cache, responsiveness and room-transfer qualification would still be required before adoption.']};
const writeStatus=async()=>fs.writeFile(path.join(out,'result.json'),JSON.stringify(status,null,2)+'\n');
await writeStatus();
let browser;
try{
 browser=await chromium.launch({channel:'chromium',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:2});
 await page.setContent('<!doctype html><meta charset="utf-8"><title>Isolated Courtyard composite probe</title>');
 const compositePng=await page.evaluate(async({layers,width,height})=>{
  const load=async url=>{const image=new Image();image.src=url;await image.decode();return image;};
  for(const layer of layers)for(const level of Object.values(layer.levels))level.image=await load(level.dataUrl);
  const surface=(w,h)=>{const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;const ctx=canvas.getContext('2d',{alpha:false});if(!ctx)throw Error('Canvas2D unavailable');ctx.setTransform(w/120,0,0,h/80,0,0);ctx.fillStyle='#EEC69D';ctx.fillRect(0,0,120,80);return {canvas,ctx};};
  const render=(w,h,policy='resident-high')=>{
   const {canvas,ctx}=surface(w,h),sx=w/120,sy=h/80;
   for(const layer of layers){
    const r=layer.rect,base=layer.levels[1],[bl,bt,br,bb]=base.contentRectPixels;
    const scale=layer.kind==='contained'?Math.min((r[2]-r[0])*sx/(br-bl),(r[3]-r[1])*sy/(bb-bt)):Math.max((r[2]-r[0])*sx/(br-bl),(r[3]-r[1])*sy/(bb-bt));
    const f=layer.levels[policy==='resident-high'||scale>1.05?2:1],[l,t,right,bottom]=f.contentRectPixels,sw=right-l,sh=bottom-t;
    if(layer.kind==='draw')ctx.drawImage(f.image,l,t,sw,sh,r[0],r[1],r[2]-r[0],r[3]-r[1]);
    else{
     const s=f.referenceHeight?(r[3]-r[1])*sy/f.referenceHeight:Math.min((r[2]-r[0])*sx/sw,(r[3]-r[1])*sy/sh);
     const anchor=f.anchor??[sw/2,sh],contact=[(r[0]+r[2])/2,r[3]];
     ctx.save();if(f.mirror){ctx.translate(contact[0]*2,0);ctx.scale(-1,1);}
     ctx.drawImage(f.image,l,t,sw,sh,contact[0]-anchor[0]*s/sx,contact[1]-anchor[1]*s/sy,sw*s/sx,sh*s/sy);ctx.restore();
    }
   }
   return canvas;
  };
  const composite=render(width,height),dataUrl=composite.toDataURL('image/png');
  window.eqCompositeProbe={render,composite,surface};
  return dataUrl.slice(dataUrl.indexOf(',')+1);
 },{layers,width:limits.width,height:limits.height});
 const canvasBytes=Buffer.from(compositePng,'base64');await fs.writeFile(path.join(out,'canvas-composite-original.png'),canvasBytes);
 status.state='CANVAS_RENDERED_SIZE_PENDING';await writeStatus();
 const pixels=decodePng(canvasBytes);sharp.concurrency(1);
 // Size-first: only this new composite is encoded. No prior codec probe repeats.
 const png=encodePng(pixels),webp=await sharp(pixels.data,{raw:{width:pixels.width,height:pixels.height,channels:4}}).webp({lossless:true,effort:6}).toBuffer();
 const pngRoundtrip=decodePng(png),webpRoundtrip=await sharp(webp).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const pngExact=pngRoundtrip.width===pixels.width&&pngRoundtrip.height===pixels.height&&pngRoundtrip.data.equals(pixels.data),webpExact=webpRoundtrip.info.width===pixels.width&&webpRoundtrip.info.height===pixels.height&&webpRoundtrip.data.equals(pixels.data);
 if(!pngExact||!webpExact)throw Error('Composite encoding changed RGBA samples.');
 await fs.writeFile(path.join(out,'composite-lossless.png'),png);await fs.writeFile(path.join(out,'composite-lossless.webp'),webp);
 status.encoding={toolchain:sharp.versions,png:{bytes:png.length,sha256:sha(png),exactRGBA:pngExact,limitBytes:limits.pngBytes,fits:png.length<=limits.pngBytes},webp:{bytes:webp.length,sha256:sha(webp),exactRGBA:webpExact,limitBytes:limits.webpBytes,fits:webp.length<=limits.webpBytes}};
 const sizeFits=png.length<=limits.pngBytes&&webp.length<=limits.webpBytes;
 status.state=sizeFits?'ENCODING_FITS_COMPARISONS_PENDING':'REJECTED_BUDGET';await writeStatus();
 const comparisons=[];
 for(const [width,height]of sizeFits?[[2880,1920],[2400,1600],[1914,1276],[1091,727],[960,640],[780,520]]:[]){
  for(const policy of width>=1914?['resident-high']:['resident-high','cold-density']){
   const result=await page.evaluate(({width,height,policy})=>{
    const {render,composite,surface}=window.eqCompositeProbe,baseline=render(width,height,policy),{canvas:candidate,ctx}=surface(width,height);
    ctx.drawImage(composite,0,0,composite.width,composite.height,0,0,120,80);
    const left=baseline.getContext('2d').getImageData(0,0,width,height).data,right=ctx.getImageData(0,0,width,height).data;
    let changedPixels=0,maxDelta=0,sum=0,squared=0;const histogram=new Uint32Array(256),difference=document.createElement('canvas');difference.width=width;difference.height=height;const dc=difference.getContext('2d'),diff=dc.createImageData(width,height);
    for(let p=0;p<left.length;p+=4){let changed=false;for(let c=0;c<3;c++){const delta=Math.abs(left[p+c]-right[p+c]);sum+=delta;squared+=delta*delta;histogram[delta]++;maxDelta=Math.max(maxDelta,delta);if(delta)changed=true;diff.data[p+c]=Math.min(255,delta*8);}diff.data[p+3]=255;if(changed)changedPixels++;}
    let n=0,p95=0;for(let i=0;i<256;i++){n+=histogram[i];if(n>=width*height*3*.95){p95=i;break;}}dc.putImageData(diff,0,0);
    const rois=[];for(const[key,rect]of[['bench',[10,19,42,40]],['stand',[48,22,58,38]],['board',[80,12,108,40]]]){let changed=0,total=0,deltaSum=0;for(let y=Math.floor(rect[1]*height/80);y<Math.ceil(rect[3]*height/80);y++)for(let x=Math.floor(rect[0]*width/120);x<Math.ceil(rect[2]*width/120);x++){const at=(y*width+x)*4;let different=false;for(let c=0;c<3;c++){const d=Math.abs(left[at+c]-right[at+c]);deltaSum+=d;if(d)different=true;}total++;if(different)changed++;}rois.push({key,totalPixels:total,changedPixels:changed,meanAbsoluteChannelDelta:deltaSum/(total*3)});}
    const dump=canvas=>canvas.toDataURL('image/png').split(',')[1];
    return{width,height,policy,exactRGBA:changedPixels===0,changedPixels,totalPixels:width*height,maxChannelDelta:maxDelta,p95ChannelDelta:p95,meanAbsoluteChannelDelta:sum/(width*height*3),rootMeanSquaredChannelDelta:Math.sqrt(squared/(width*height*3)),rois,...(width===2400||width===1914?{baseline:dump(baseline),candidate:dump(candidate),difference8x:dump(difference)}:{})};
   },{width,height,policy});
   for(const name of['baseline','candidate','difference8x'])if(result[name]){const filename=`${width}x${height}-${policy}-${name}.png`;await fs.writeFile(path.join(out,filename),Buffer.from(result[name],'base64'));delete result[name];result[name+'Path']=filename;}
   comparisons.push(result);
  }
 }
 await browser.close();browser=null;
 status.comparisons=comparisons;status.responsiveComparisons=sizeFits?'EXECUTED':'NOT_RUN_REJECTED_BY_SIZE_FIRST_GATE';status.ownedBrowserClosed=true;
 status.sourceIdentitiesAfter=await Promise.all([...sources].map(identity));
 status.sourcesUnchanged=JSON.stringify(status.sourceIdentitiesAfter)===JSON.stringify(before);
 if(!status.sourcesUnchanged)throw Error('A source changed during the isolated probe.');
 status.state=png.length>limits.pngBytes||webp.length>limits.webpBytes?'REJECTED_BUDGET':'NOT_ADOPTED_VISUAL_REVIEW_REQUIRED';
 status.conclusion=status.state==='REJECTED_BUDGET'?'The full-resolution composite fails one or both unchanged transfer ceilings. Candidate retained as rejected evidence; no production adoption.':'Encoding fits the byte ceilings, but responsive composition is not accepted from numerical similarity. Review and complete runtime qualification remain required.';
 status.completedAt=new Date().toISOString();await writeStatus();console.log(JSON.stringify({out,state:status.state,encoding:status.encoding,comparisons:comparisons.map(({width,height,policy,exactRGBA,meanAbsoluteChannelDelta,maxChannelDelta})=>({width,height,policy,exactRGBA,meanAbsoluteChannelDelta,maxChannelDelta}))},null,2));
}catch(error){status.state='ERROR';status.error=String(error.stack??error);await writeStatus();throw error;}finally{if(browser)await browser.close();}
