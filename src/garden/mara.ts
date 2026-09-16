import type {Chapter, GardenState, Point} from './model.js';

export const BIRD_BOY={x:.45,z:.55},DOCK_OFFICE={x:-2,z:.55};
export type BirdStage='ask'|'fetch'|'repair'|'repaired'|'done';
export interface MaraState {
 edition:'connected-20260915'|'earlier-chapter';
 asking:'none'|'pending'|'fulfilled';returnOffered:boolean;permission:boolean;service:'waiting'|'served';
 participated:boolean;sharedAt:'none'|'early'|'gathering';
 scene:null|{origin:'early'|'gathering';introduced:boolean;stage:BirdStage;position:Point;tape:'office'|'mara'|'dock';aligned:boolean;strip:'none'|'beside'|'across';preview:'beside'|'across'|null};
}
export const freshMara=():MaraState=>({edition:'connected-20260915',asking:'none',returnOffered:false,permission:false,service:'waiting',participated:false,sharedAt:'none',scene:null});
export function earlierMara(c:Chapter):MaraState{return {...freshMara(),edition:'earlier-chapter',permission:c.page!=='mara',sharedAt:c.story.records.mara?['planning','arriving','welcome','mara'].includes(c.story.phase)?'early':'gathering':'none'};}
export const nearBird=(p:Point)=>Math.hypot(p.x-BIRD_BOY.x,p.z-BIRD_BOY.z)<.6;
export const nearOffice=(p:Point)=>Math.hypot(p.x-DOCK_OFFICE.x,p.z-DOCK_OFFICE.z)<.6;
export const birdWalkable=(p:Point)=>Number.isFinite(p.x)&&Number.isFinite(p.z)&&p.x>=-2.5&&p.x<=1.7&&p.z>=.2&&p.z<=1.1;
export function shareMara(s:GardenState,origin:'early'|'gathering'){
 s.chapter.mara.sharedAt=origin;s.chapter.story.records.mara=s.chapter.story.maraPicture;
 s.mode='walk';s.maraTarget=null;s.chapter.mara.scene=null;s.panel=origin==='early'?'story':'gathering';
 s.restoreFocus=s.maraParent?.focus??null;s.maraParent=null;
 s.notice='The Torn Wing has been shared with the people here. Mara’s lantern keeps this contribution. You can choose its picture or keep the repair picture.';
}
export function validMara(c:Chapter){
 const m=c.mara;if(!m||!['connected-20260915','earlier-chapter'].includes(m.edition)||!['none','pending','fulfilled'].includes(m.asking)||typeof m.returnOffered!=='boolean'||typeof m.permission!=='boolean'||!['waiting','served'].includes(m.service)||typeof m.participated!=='boolean'||!['none','early','gathering'].includes(m.sharedAt))return false;
 if((c.page!=='mara')!==m.permission||(m.sharedAt!=='none')!==!!c.story.records.mara||m.participated&&!m.scene&&m.sharedAt==='none')return false;
 if((m.asking!=='none'||m.returnOffered)&&!c.maraHeard)return false;
 const v=m.scene;if(v===null)return true;
 if(!v||typeof v!=='object')return false;
 if(m.sharedAt!=='none'||m.participated!==(v.stage==='done'))return false;
 if(typeof v.introduced!=='boolean'||!v.introduced&&v.stage!=='ask')return false;
 if(!v||!['early','gathering'].includes(v.origin)||!['ask','fetch','repair','repaired','done'].includes(v.stage)||!v.position||!birdWalkable(v.position)||!['office','mara','dock'].includes(v.tape)||typeof v.aligned!=='boolean'||!['none','beside','across'].includes(v.strip)||![null,'beside','across'].includes(v.preview))return false;
 if(c.seed==='boat'||v.origin==='early'&&(c.story.phase!=='planning'||c.page!=='grandma'||!c.story.maraReported)||v.origin==='gathering'&&c.story.phase!=='mara')return false;
 if(v.stage==='ask'&&(v.tape!=='office'||v.aligned||v.strip!=='none'))return false;
 if(v.stage==='fetch'&&(!['office','mara'].includes(v.tape)||v.aligned||v.strip!=='none'))return false;
 if(v.stage==='repair'&&(v.tape!=='mara'||!v.aligned||v.strip==='across'))return false;
 if(v.stage==='repaired'&&(v.tape!=='mara'||!v.aligned||v.strip!=='across'))return false;
 if(v.stage==='done'&&(v.tape!=='dock'||!v.aligned||v.strip!=='across'||!m.participated))return false;
 return true;
}
export function birdInstruction(s:GardenState){
 const b=s.chapter.mara.scene;if(!b)return '';
 if(b.stage==='ask')return 'The boy holds his sister’s torn bird. Speak to him before helping.';
 if(b.stage==='done')return 'The boy keeps the same repaired bird. Return to the people listening in Grandma’s garden.';
 if(b.stage==='repaired')return 'The tape crosses the tear and holds the wing. Let the boy carry his repaired bird onto the dock.';
 if(b.tape==='office')return nearOffice(b.position)?'The tape is in Mara’s office. Pick it up.':'Guide Mara to her dock office for tape.';
 if(!nearBird(b.position))return 'Mara has the tape. Return to the boy and his bird.';
 if(!b.aligned)return 'Line up the torn wing, then place tape across the tear.';
 return b.strip==='beside'?'The tape missed the tear. The wing is still loose. Move the same strip across the tear.':'Choose a tape position on the bird. Place the strip to see what it holds.';
}
