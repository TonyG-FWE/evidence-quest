import manifest from '../../content/temp-assets.json' with {type:'json'};
import type {Rect} from '../../contracts/types.js';
export {manifest};
export class Assets {
 private images=new Map<string,HTMLImageElement>();private failed=new Set<string>();
 constructor(private changed:()=>void,private fail:()=>void){}
 image(id:string,variant='base',density=1){
  const entry=manifest.exports.find(e=>e.assetId===id&&e.variantId===id+'/'+variant&&e.density===density)??manifest.exports.find(e=>e.assetId===id&&e.density===1);
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
}
export const assetUrl=(id:string,variant='base')=>manifest.exports.find(e=>e.assetId===id&&e.variantId===id+'/'+variant&&e.density===1)?.url;
