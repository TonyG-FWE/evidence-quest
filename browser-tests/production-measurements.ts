import type {Page} from '@playwright/test';
import production from '../content/production-assets.json' with {type:'json'};
const sizes=Object.fromEntries(Object.values(production).flatMap(row=>Object.values(row.levels).flatMap(level=>level.frames.flatMap(frame=>[[frame.url,frame.rgbaBytes],...(frame.fallbackUrl?[[frame.fallbackUrl,frame.rgbaBytes]]:[])]))));
export async function measuredScene(page:Page){
 const result=await page.evaluate(()=>{
  const resources=performance.getEntriesByType('resource').map(entry=>{const r=entry as PerformanceResourceTiming;return {url:new URL(r.name).pathname,encodedBytes:r.encodedBodySize,transferBytes:r.transferSize,durationMs:r.duration};});
  const canvases=[...document.querySelectorAll('canvas')].map(c=>({width:c.width,height:c.height,backingRgba:c.width*c.height*4,poolReserved:Number(c.dataset.artBytes??0),poolPeak:Number(c.dataset.artPeakBytes??0),rasterReserved:Number(c.dataset.rasterBytes??0),rasterPeak:Number(c.dataset.rasterPeakBytes??0)}));
  const consumers:string[]=[];for(const img of document.querySelectorAll<HTMLImageElement>('img'))if(img.currentSrc)consumers.push(img.dataset.artUrl??new URL(img.currentSrc).pathname);
  for(const img of document.querySelectorAll<SVGImageElement>('svg image'))if(img.href.baseVal)consumers.push(img.dataset.artUrl??new URL(img.href.baseVal,location.href).pathname);
  for(const element of document.querySelectorAll('*'))for(const match of getComputedStyle(element).backgroundImage.matchAll(/url\(["']?([^"')]+)["']?\)/g))consumers.push(new URL(match[1]!,location.href).pathname);
  return {resources,canvases,consumers,encodedReserved:Number(document.documentElement.dataset.encodedArtBytes??0),encodedPeak:Number(document.documentElement.dataset.encodedArtPeak??0),viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio}};
 });
 const nativeConsumerRgba=result.consumers.reduce((sum,url)=>sum+(sizes[url]??0),0),unknownImages=result.consumers.filter(url=>sizes[url]===undefined&&!url.startsWith('data:'));
 const poolReserved=Math.max(0,...result.canvases.map(c=>c.poolReserved)),rasterReserved=Math.max(0,...result.canvases.map(c=>c.rasterReserved)),rasterPeak=Math.max(0,...result.canvases.map(c=>c.rasterPeak)),backingRgba=result.canvases.reduce((sum,c)=>sum+c.backingRgba,0),reserveBytes=16*1024*1024;
 return {...result,unknownImages,nativeConsumerRgba,poolReserved,rasterReserved,rasterPeak,backingRgba,reserveBytes,currentConservativeBytes:poolReserved+nativeConsumerRgba+rasterReserved+2*result.encodedReserved+2*backingRgba+reserveBytes};
}
export function totalImages(snapshots:Awaited<ReturnType<typeof measuredScene>>[]){const urls=new Set(snapshots.flatMap(s=>s.resources.filter(r=>r.encodedBytes>0).map(r=>r.url)));return [...urls].reduce((sum,url)=>sum+(sizes[url]??0),0);}
