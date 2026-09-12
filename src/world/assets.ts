import manifest from '../../content/temp-assets.json' with {type:'json'};
import illustrated from '../../content/illustrated-assets.json' with {type:'json'};
import type {Rect,Point} from '../../contracts/types.js';
export {manifest};
interface Illustration {url:string;frameWidth:number;frameHeight:number;columns:number;contentRectPixels:number[];frames?:Array<{rect:number[];anchor:number[]}>;anchor?:number[];referenceHeight?:number;mirror?:boolean;}
const replacements:Record<string,Illustration>=illustrated;
export const illustration=(id:string,variant='base')=>replacements[id+'/'+variant];
export class Assets {
 private images=new Map<string,HTMLImageElement>();private failed=new Set<string>();
 constructor(private changed:()=>void,private fail:()=>void){}
 retry(){for(const url of this.failed)this.images.delete(url);this.failed.clear();this.changed();}
 image(id:string,variant='base',density=1){
  const original=manifest.exports.find(e=>e.assetId===id&&e.variantId===id+'/'+variant&&e.density===density)??manifest.exports.find(e=>e.assetId===id&&e.density===1);
  const replacement=replacements[id+'/'+variant];
  const entry=original&&replacement?{...original,...replacement,density:1}:original;
  if(!entry||this.failed.has(entry.url))return null;
  let image=this.images.get(entry.url);
  if(!image){image=new Image();this.images.set(entry.url,image);image.onload=this.changed;image.onerror=()=>{this.failed.add(entry.url);this.fail();};image.src=entry.url;}
  return image.complete&&image.naturalWidth?{image,entry}:null;
 }
 draw(ctx:CanvasRenderingContext2D,id:string,rect:Rect,variant='base',frame=0){
  const item=this.image(id,variant,window.devicePixelRatio>=1.5?2:1);if(!item)return;
  const {image,entry:e}=item;const x=(frame%e.columns)*e.frameWidth,y=Math.floor(frame/e.columns)*e.frameHeight;
  const [l,t,r,b]=e.contentRectPixels as Rect,d=e.density;
  ctx.drawImage(image,x+l*d,y+t*d,(r-l)*d,(b-t)*d,rect[0],rect[1],rect[2]-rect[0],rect[3]-rect[1]);
 }
 drawContained(ctx:CanvasRenderingContext2D,id:string,rect:Rect,variant='base',frame=0,feet?:Point){
  const item=this.image(id,variant,window.devicePixelRatio>=1.5?2:1);if(!item)return;
  const {image,entry:e}=item,info=replacements[id+'/'+variant],cell=info?.frames?.[frame%info.frames.length];
  const [l,t,r,b]=cell?.rect??e.contentRectPixels,d=e.density;
  const x=cell?0:(frame%e.columns)*e.frameWidth,y=cell?0:Math.floor(frame/e.columns)*e.frameHeight;
  const transform=ctx.getTransform(),sx=Math.hypot(transform.a,transform.b),sy=Math.hypot(transform.c,transform.d),w=(r!-l!)*d,h=(b!-t!)*d;
  const scale=info?.referenceHeight?(rect[3]-rect[1])*sy/info.referenceHeight:Math.min((rect[2]-rect[0])*sx/w,(rect[3]-rect[1])*sy/h),dw=w*scale/sx,dh=h*scale/sy;
  const anchor=cell?.anchor??info?.anchor??[w/2,h],contact=feet??[(rect[0]+rect[2])/2,rect[3]];
  ctx.save();if(info?.mirror){ctx.translate(contact[0]*2,0);ctx.scale(-1,1);}
  ctx.drawImage(image,x+l!*d,y+t!*d,w,h,contact[0]-anchor[0]!*scale/sx,contact[1]-anchor[1]!*scale/sy,dw,dh);ctx.restore();
 }
}
export const assetUrl=(id:string,variant='base')=>replacements[id+'/'+variant]?.url??manifest.exports.find(e=>e.assetId===id&&e.variantId===id+'/'+variant&&e.density===1)?.url;
