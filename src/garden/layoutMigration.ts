import type {Chapter} from './model.js';
import {anchors,LAYOUT_VERSION,legacyRegion,relocateLegacyPoint,safeInRegion} from './worldLayout.js';

/** Called on a cloned, checksummed payload. The persistence transaction archives the original bytes. */
export function migrateLayout(c:Chapter):boolean{
 if(c.layoutVersion===LAYOUT_VERSION)return false;
 if(c.layoutVersion!==undefined)throw Error('Unsupported world layout');
 const old=c.pip;
 if(!old||!Number.isFinite(old.x)||!Number.isFinite(old.z)||old.x< -6.25||old.x>9.75||old.z< -5.4||old.z>5.25)throw Error('Invalid legacy position');
 const region=legacyRegion(old),mapped=relocateLegacyPoint(old);
 const bridge=c.joined&&Math.abs(c.sections.a.z-c.sections.b.z)<.01?{x:(c.sections.a.x+c.sections.b.x)/2,z:(c.sections.a.z+c.sections.b.z)/2}:undefined;
 c.pip=safeInRegion(mapped,region,bridge);
 // Old bakery records include the escort's location. Newly imputed records already use the new anchors.
 if(c.bakery?.rina&&c.bakery.rina.x<=9.75)c.bakery.rina=relocateLegacyPoint(c.bakery.rina);
 if(c.river?.boat?.phase==='moored'&&c.ferrySide==='east')c.river.boat.position={...anchors.boat.landing};
 c.layoutVersion=LAYOUT_VERSION;
 return true;
}
