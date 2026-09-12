import manifest from '../../content/temp-assets.json' with {type:'json'};
import illustrated from '../../content/illustrated-assets.json' with {type:'json'};
import type {Rect,Point} from '../../contracts/types.js';
import {ImagePool,type ImageResource} from './image-pool.js';
import {RasterPool} from './raster-pool.js';
import{acquireArtUrl,releaseArtUrl,retryArtTransfers,artTransferStats}from'./transfers.js';
import {production,productionFrame,productionFrames,type ProductionFrame} from './production.js';
export {manifest};
interface Illustration {url:string;frameWidth:number;frameHeight:number;columns:number;contentRectPixels:number[];frames?:Array<{rect:number[];anchor:number[]}>;anchor?:number[];referenceHeight?:number;mirror?:boolean;}
interface DrawEntry {url:string;density:number;frameWidth:number;frameHeight:number;columns:number;contentRectPixels:number[];anchor?:number[];referenceHeight?:number|null;mirror?:boolean;}
interface ReadyImage {image:HTMLImageElement;entry:DrawEntry;sourceFrame:number;modern:boolean;}
const replacements:Record<string,Illustration>=illustrated;
export const illustration=(id:string,variant='base')=>replacements[id+'/'+variant];
const imageOwners=new WeakMap<HTMLImageElement,symbol>();
const pool=new ImagePool<HTMLImageElement>((url,signal)=>new Promise((resolve,reject)=>{
 const image=new Image(),owner=Symbol('canvas-response');imageOwners.set(image,owner);
 const clear=()=>{image.onload=null;image.onerror=null;signal.removeEventListener('abort',abort);},failed=(error:Error)=>{clear();releaseArtUrl(owner);reject(error);},abort=()=>{image.removeAttribute('src');failed(new DOMException('Canceled image load','AbortError'));};
 signal.addEventListener('abort',abort,{once:true});image.onload=()=>{void image.decode().then(()=>{clear();resolve(image);},()=>failed(new Error('Image decoding failed')));};image.onerror=()=>failed(new Error('Image unavailable'));
 void acquireArtUrl(url,owner).then(href=>{if(!signal.aborted)image.src=href;},()=>failed(new Error('Image unavailable')));
}),image=>{image.removeAttribute('src');const owner=imageOwners.get(image);if(owner)releaseArtUrl(owner);imageOwners.delete(image);});
interface Layer{canvas:HTMLCanvasElement;urls:Set<string>;complete:boolean;}
const rasters=new RasterPool<Layer>(layer=>{layer.canvas.width=0;layer.canvas.height=0;});
export const artCacheStats=()=>({...pool.stats(),raster:rasters.stats(),encoded:artTransferStats()});
const preparedGroups=new Map<string,Array<[string,string]>>();
for(const [key,row]of Object.entries(production)){const split=key.lastIndexOf('/'),list=preparedGroups.get(row.group)??[];list.push([key.slice(0,split),key.slice(split+1)]);preparedGroups.set(row.group,list);}

export class Assets {
 private owner=Symbol('art-renderer');private used=new Set<string>();private notifiedFailure=false;
 private lastActor=new Map<string,ReadyImage>();private revision=0;private layers=new Set<string>();private collecting:Layer|null=null;
 private imageChanged=()=>{this.revision++;this.changed();};
 constructor(private changed:()=>void,private fail:()=>void){pool.subscribe(this.owner,this.imageChanged);}
 get generation(){return this.revision;}
 begin(retainScene=false){pool.subscribe(this.owner,this.imageChanged);if(!retainScene){this.used.clear();this.layers.clear();}}
 end(){pool.retain(this.owner,this.used);rasters.retain(this.owner,this.layers);}
 dispose(){pool.dispose(this.owner);rasters.dispose(this.owner);this.lastActor.clear();}
 retry(){this.notifiedFailure=false;retryArtTransfers();pool.retry();this.imageChanged();}
 private request(resource:ImageResource){this.used.add(resource.url);this.collecting?.urls.add(resource.url);return pool.request(resource,this.owner);}
 /** Cache only static geometry, at its exact device-pixel transform and bounds. */
 layer(ctx:CanvasRenderingContext2D,name:string,rect:Rect,render:(ctx:CanvasRenderingContext2D)=>void,version=''){
  const t=ctx.getTransform();if(t.b!==0||t.c!==0||t.a<=0||t.d<=0){render(ctx);return;}
  const left=Math.floor(rect[0]*t.a+t.e),top=Math.floor(rect[1]*t.d+t.f),width=Math.ceil(rect[2]*t.a+t.e)-left,height=Math.ceil(rect[3]*t.d+t.f)-top;
  const key=name+':'+rect.join(','),signature=[version,this.revision,t.a,t.d,t.e,t.f,width,height,ctx.imageSmoothingEnabled,ctx.imageSmoothingQuality].join(',');this.layers.add(key);
  let layer:Layer|null;try{layer=rasters.get(this.owner,key,signature,width*height*4,()=>{
   const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const surface=canvas.getContext('2d');
   if(!surface){canvas.width=canvas.height=0;throw new Error('Static art surface unavailable');}
   const result:Layer={canvas,urls:new Set(),complete:true},previous=this.collecting;this.collecting=result;
   surface.setTransform(t.a,0,0,t.d,t.e-left,t.f-top);surface.imageSmoothingEnabled=ctx.imageSmoothingEnabled;surface.imageSmoothingQuality=ctx.imageSmoothingQuality;
   try{render(surface);}catch(error){canvas.width=canvas.height=0;throw error;}finally{this.collecting=previous;}
   return result;
  });}catch{render(ctx);return;}
  if(!layer){render(ctx);return;}
  for(const url of layer.urls){this.used.add(url);this.collecting?.urls.add(url);}
  ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.drawImage(layer.canvas,left,top);ctx.restore();
  // A cold/failed source may be drawn for this frame, but never becomes a
  // finished cached layer. Decode/retry notifications also change its revision.
  if(!layer.complete){if(this.collecting)this.collecting.complete=false;rasters.drop(this.owner,key);}
 }
 prepareGroup(group:string,density:1|2){for(const [id,variant]of preparedGroups.get(group)??[])this.modern(id,variant,density,0);}
 private density(ctx:CanvasRenderingContext2D,id:string,variant:string,rect:Rect,contained:boolean){
  const base=productionFrame(id,variant);if(!base)return window.devicePixelRatio>=1.5?2:1;
  const t=ctx.getTransform(),width=(rect[2]-rect[0])*Math.hypot(t.a,t.b),height=(rect[3]-rect[1])*Math.hypot(t.c,t.d),w=base.contentRectPixels[2]-base.contentRectPixels[0],h=base.contentRectPixels[3]-base.contentRectPixels[1];
  const scale=contained&&base.referenceHeight?height/base.referenceHeight:contained?Math.min(width/w,height/h):Math.max(width/w,height/h);
  return scale>1.05?2:1;
 }
 private modern(id:string,variant:string,density:1|2,frame:number){
  const row=production[id+'/'+variant],frames=productionFrames(id,variant,density);if(!row||!frames)return null;
  let selected:ReturnType<ImagePool<HTMLImageElement>['request']>|undefined,entry:ProductionFrame|undefined;
  for(const [index,item]of frames.entries()){
   let actualUrl=item.url,request=this.request({url:actualUrl,rgbaBytes:item.rgbaBytes,level:density,group:row.group});
   if(request.status==='failed'&&item.fallbackUrl){actualUrl=item.fallbackUrl;request=this.request({url:actualUrl,rgbaBytes:item.rgbaBytes,level:density,group:row.group});}
   if(index===frame%frames.length){selected=request;entry={...item,url:actualUrl};}
  }
  return selected&&entry?{...selected,entry}:null;
 }
 private actorReady(id:string,item:ReadyImage){if(id.startsWith('ASSET.ACT.'))this.lastActor.set(id,item);return item;}
 private actorWaiting(id:string){const previous=this.lastActor.get(id);if(previous?.image.complete&&previous.image.naturalWidth>0){this.used.add(previous.entry.url);return previous;}this.lastActor.delete(id);return null;}
 image(id:string,variant='base',density=1,frame=0):ReadyImage|null {
  if(production[id+'/'+variant]){
   const requested=density>=2?2:1,preferred=this.modern(id,variant,requested,frame),fallback=requested===2&&preferred?.status==='failed'?this.modern(id,variant,1,frame):null,item=preferred?.value?preferred:fallback??preferred;
   if(!item?.value){if(this.collecting)this.collecting.complete=false;if(item?.status==='failed'&&!this.notifiedFailure){this.notifiedFailure=true;this.fail();}return this.actorWaiting(id);}
   const entry=item.entry;return this.actorReady(id,{image:item.value,entry:{url:entry.url,density:1,frameWidth:entry.width,frameHeight:entry.height,columns:1,contentRectPixels:entry.contentRectPixels,anchor:entry.anchor,referenceHeight:entry.referenceHeight,mirror:entry.mirror},sourceFrame:0,modern:true});
  }
  const original=manifest.exports.find(e=>e.assetId===id&&e.variantId===id+'/'+variant&&e.density===density)??manifest.exports.find(e=>e.assetId===id&&e.density===1),replacement=replacements[id+'/'+variant];
  const entry:DrawEntry|undefined=replacement?{...replacement,density:1}:original;if(!entry){if(this.collecting)this.collecting.complete=false;return null;}
  const width=replacement?.frameWidth??original?.width??1,height=replacement?.frameHeight??original?.height??1;
  const item=this.request({url:entry.url,rgbaBytes:width*height*4,level:density>=2?2:1,group:'temporary'});
  if(!item.value&&this.collecting)this.collecting.complete=false;
  if(item.status==='failed'&&!this.notifiedFailure){this.notifiedFailure=true;this.fail();}
  return item.value?this.actorReady(id,{image:item.value,entry,sourceFrame:frame,modern:false}):this.actorWaiting(id);
 }
 draw(ctx:CanvasRenderingContext2D,id:string,rect:Rect,variant='base',frame=0){
  const item=this.image(id,variant,this.density(ctx,id,variant,rect,false),frame);if(!item)return;
  const {image,entry:e,sourceFrame}=item,x=(sourceFrame%e.columns)*e.frameWidth,y=Math.floor(sourceFrame/e.columns)*e.frameHeight;
  const [l,t,r,b]=e.contentRectPixels as Rect,d=e.density;
  ctx.drawImage(image,x+l*d,y+t*d,(r-l)*d,(b-t)*d,rect[0],rect[1],rect[2]-rect[0],rect[3]-rect[1]);
 }
 drawNineSlice(ctx:CanvasRenderingContext2D,id:string,rect:Rect,variant='base'){
  const item=this.image(id,variant,this.density(ctx,id,variant,rect,false));if(!item)return;
  const e=item.entry,[l,t,r,b]=e.contentRectPixels as Rect,d=e.density,sw=(r-l)*d,sh=(b-t)*d,inset=Math.min(sw,sh)*.24;
  const transform=ctx.getTransform(),sx=Math.hypot(transform.a,transform.b),sy=Math.hypot(transform.c,transform.d),corner=Math.min((rect[2]-rect[0])*sx/3,(rect[3]-rect[1])*sy/3,2.8*Math.min(sx,sy));
  const sourceX=[l*d,l*d+inset,r*d-inset,r*d],sourceY=[t*d,t*d+inset,b*d-inset,b*d];
  const destX=[rect[0],rect[0]+corner/sx,rect[2]-corner/sx,rect[2]],destY=[rect[1],rect[1]+corner/sy,rect[3]-corner/sy,rect[3]];
  for(let y=0;y<3;y++)for(let x=0;x<3;x++)ctx.drawImage(item.image,sourceX[x]!,sourceY[y]!,sourceX[x+1]!-sourceX[x]!,sourceY[y+1]!-sourceY[y]!,destX[x]!,destY[y]!,destX[x+1]!-destX[x]!,destY[y+1]!-destY[y]!);
 }
 drawRegion(ctx:CanvasRenderingContext2D,id:string,region:Rect,rect:Rect,variant='base'){
  const frame=productionFrame(id,variant);if(!frame)return;
  const t=ctx.getTransform(),cw=frame.contentRectPixels[2]-frame.contentRectPixels[0],ch=frame.contentRectPixels[3]-frame.contentRectPixels[1];
  const scale=Math.max((rect[2]-rect[0])*Math.hypot(t.a,t.b)/(cw*(region[2]-region[0])),(rect[3]-rect[1])*Math.hypot(t.c,t.d)/(ch*(region[3]-region[1])));
  const item=this.image(id,variant,scale>1.05?2:1);if(!item)return;
  const [l,top,r,b]=item.entry.contentRectPixels as Rect,w=r-l,h=b-top;
  ctx.drawImage(item.image,l+w*region[0],top+h*region[1],w*(region[2]-region[0]),h*(region[3]-region[1]),rect[0],rect[1],rect[2]-rect[0],rect[3]-rect[1]);
 }
 drawContained(ctx:CanvasRenderingContext2D,id:string,rect:Rect,variant='base',frame=0,feet?:Point){
  const item=this.image(id,variant,this.density(ctx,id,variant,rect,true),frame);if(!item)return;
  const {image,entry:e,sourceFrame}=item,info=item.modern?e:replacements[id+'/'+variant],cell=!item.modern?replacements[id+'/'+variant]?.frames?.[frame%replacements[id+'/'+variant]!.frames!.length]:undefined;
  const [l,t,r,b]=cell?.rect??e.contentRectPixels,d=e.density,x=cell?0:(sourceFrame%e.columns)*e.frameWidth,y=cell?0:Math.floor(sourceFrame/e.columns)*e.frameHeight;
  const transform=ctx.getTransform(),sx=Math.hypot(transform.a,transform.b),sy=Math.hypot(transform.c,transform.d),w=(r!-l!)*d,h=(b!-t!)*d;
  const scale=info?.referenceHeight?(rect[3]-rect[1])*sy/info.referenceHeight:Math.min((rect[2]-rect[0])*sx/w,(rect[3]-rect[1])*sy/h),dw=w*scale/sx,dh=h*scale/sy;
  const anchor=cell?.anchor??info?.anchor??[w/2,h],contact=feet??[(rect[0]+rect[2])/2,rect[3]];
  ctx.save();if(info?.mirror){ctx.translate(contact[0]*2,0);ctx.scale(-1,1);}
  ctx.drawImage(image,x+l!*d,y+t!*d,w,h,contact[0]-anchor[0]!*scale/sx,contact[1]-anchor[1]!*scale/sy,dw,dh);ctx.restore();
 }
}
export const assetUrl=(id:string,variant='base',density=1)=>productionFrame(id,variant,density)?.url??replacements[id+'/'+variant]?.url??manifest.exports.find(e=>e.assetId===id&&e.variantId===id+'/'+variant&&e.density===1)?.url;
export const assetSources=(id:string,variant='base')=>productionFrame(id,variant)?`${assetUrl(id,variant,1)} 1x, ${assetUrl(id,variant,2)} 2x`:undefined;
