import type {Chapter,GardenState,Point} from './model.js';
import {anchors} from './worldLayout.js';
import {availableHands,type HandObject} from './hands.js';

export const plantingNearby=(s:GardenState)=>s.chapter.crossed&&!s.chapter.bloomed&&availableHands(s).includes('soil');
export function plantingGuidance(c:Chapter){
 if(c.seed==='bed')return 'The seed is in the prepared spot. Cover it with Grandma.';
 if(c.river.soilPrepared)return 'Place the seed';
 return 'Prepare the spot, place the seed and cover it together.';
}
/** Native placement traces the same soil stroke or seed drop as pointer input. */
export function plantingPlacement(s:GardenState):{object:HandObject;label:string;path:Point[]}|null{
 if(!plantingNearby(s))return null;
 const c=s.chapter,bed=anchors.garden.plant;
 if(c.river.soilPrepared&&c.seed!=='bed')return {object:'seed',label:'Place the seed',path:[{...bed}]};
 return {object:'soil',label:c.seed==='bed'?'Cover it with Grandma.':'Prepare the spot',path:[{x:bed.x+.3,z:bed.z},{x:bed.x-.3,z:bed.z},{...bed}]};
}
