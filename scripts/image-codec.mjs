import {PNG} from 'pngjs';
import encodeWebp,{init as initWebp} from '@jsquash/webp/encode.js';
import {simd} from 'wasm-feature-detect';
import {readFile} from 'node:fs/promises';
export const decodePng=bytes=>PNG.sync.read(bytes,{checkCRC:true});
// Choose only between lossless scanline/DEFLATE encodings. RGBA samples, alpha,
// dimensions and color interpretation stay identical, including hidden RGB.
export function encodePng(image){
 let best,opaque=true;for(let i=3;i<image.data.length;i+=4)if(image.data[i]!==255){opaque=false;break;}
 // A fully opaque image can omit the redundant alpha channel in its encoded
 // PNG. Decoders reconstruct the identical 255 alpha samples. Never quantize.
 for(const colorType of opaque?[6,2]:[6])for(const [filterType,deflateStrategy]of [[-1,0],[-1,1],[1,1],[4,1]]){
  const candidate=PNG.sync.write(image,{colorType,inputColorType:6,bitDepth:8,filterType,deflateLevel:9,deflateStrategy});
  if(!best||candidate.length<best.length)best=candidate;
 }
 return best;
}
let webpReady;
export async function losslessWebp(image){
  webpReady??=(async()=>{const file=await simd()?'webp_enc_simd.wasm':'webp_enc.wasm';await initWebp(await WebAssembly.compile(await readFile(new URL('../node_modules/@jsquash/webp/codec/enc/'+file,import.meta.url))));})();
  await webpReady;return Buffer.from(await encodeWebp({data:new Uint8ClampedArray(image.data),width:image.width,height:image.height},{lossless:1,near_lossless:100,quality:100,method:6,exact:1,thread_level:0}));
}
function taps(input,output){
  const ratio=input/output,radius=3*Math.max(1,ratio),sinc=x=>x===0?1:Math.sin(Math.PI*x)/(Math.PI*x);
  return Array.from({length:output},(_,i)=>{const center=(i+.5)*ratio-.5,weights=new Map();let total=0;
    for(let j=Math.ceil(center-radius);j<=Math.floor(center+radius);j++){const d=(j-center)/Math.max(1,ratio);if(Math.abs(d)>=3)continue;const weight=sinc(d)*sinc(d/3),pixel=Math.max(0,Math.min(input-1,j));weights.set(pixel,(weights.get(pixel)??0)+weight);total+=weight;}
    return [...weights].map(([pixel,weight])=>[pixel,weight/total]);
  });
}
// Separable Lanczos3 in premultiplied RGBA prevents transparent matte colors
// from bleeding into cutout edges. No enlargement; padding is real zero alpha.
export function cropResize(image,rect,width,height,padding=0){
  const [left,top,right,bottom]=rect,w=right-left,h=bottom-top;
  if(![left,top,right,bottom,width,height,padding].every(Number.isInteger)||left<0||top<0||right>image.width||bottom>image.height||w<1||h<1||width<1||height<1||width>w||height>h||padding<0)throw Error('Invalid bounded image derivative');
  const out={width:width+padding*2,height:height+padding*2,data:Buffer.alloc((width+padding*2)*(height+padding*2)*4)};
  if(width===w&&height===h){for(let y=0;y<h;y++)image.data.copy(out.data,((y+padding)*out.width+padding)*4,((top+y)*image.width+left)*4,((top+y)*image.width+right)*4);return out;}
  const xt=taps(w,width),yt=taps(h,height),horizontal=new Float32Array(width*h*4);
  for(let y=0;y<h;y++)for(let x=0;x<width;x++){
    const at=(y*width+x)*4;for(const [sx,weight]of xt[x]){const source=((top+y)*image.width+left+sx)*4,alpha=image.data[source+3]/255;horizontal[at]+=image.data[source]*alpha*weight;horizontal[at+1]+=image.data[source+1]*alpha*weight;horizontal[at+2]+=image.data[source+2]*alpha*weight;horizontal[at+3]+=alpha*weight;}
  }
  for(let y=0;y<height;y++)for(let x=0;x<width;x++){
    const values=[0,0,0,0];for(const [sy,weight]of yt[y]){const source=(sy*width+x)*4;for(let c=0;c<4;c++)values[c]+=horizontal[source+c]*weight;}
    const at=((y+padding)*out.width+x+padding)*4,alpha=Math.max(0,Math.min(1,values[3]));out.data[at+3]=Math.round(alpha*255);
    if(out.data[at+3])for(let c=0;c<3;c++)out.data[at+c]=Math.round(Math.max(0,Math.min(255,values[c]/Math.max(values[3],.000001))));
  }
  return out;
}
