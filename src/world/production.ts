import entries from '../../content/production-assets.json' with {type:'json'};
import type {Point,Rect} from '../../contracts/types.js';
export interface ProductionFrame {url:string;fallbackUrl:string|null;fallbackBytes:number|null;width:number;height:number;contentRectPixels:Rect;anchor:Point;referenceHeight:number|null;mirror:boolean;rgbaBytes:number;bytes:number;}
interface ProductionAsset {group:string;sourceUrl:string;sourceSha256:string;levels:Record<'1'|'2',{density:number;frames:ProductionFrame[]}>;}
export const production:Record<string,ProductionAsset>=entries as unknown as Record<string,ProductionAsset>;
export const productionFrames=(id:string,variant='base',density=1)=>production[id+'/'+variant]?.levels[density>=2?'2':'1'].frames;
export const productionFrame=(id:string,variant='base',density=1,frame=0)=>{const frames=productionFrames(id,variant,density);return frames?.[frame%frames.length];};
