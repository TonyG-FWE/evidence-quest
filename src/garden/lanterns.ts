import type {Chapter,Panel} from './model.js';
import type {Contribution} from './chapter.js';

export const lanternIds=['picnic','duet','mara','sol','grandma','pip'] as const;
export type LanternId=typeof lanternIds[number];
export type LanternRecord={id:LanternId;title:string;author:string;available:boolean;scene:string;note:string;page:Panel;contribution:Contribution|null};
export function performedEnding(c:Chapter):Contribution|null {
 const performed=c.gathering.edition==='connected-20260915'?c.gathering.solPerformed:c.story.solOutcome==='draft'?null:c.story.solEnding;
 return performed&&performed!=='draft'?performed:null;
}
export function gatheringPicture(c:Chapter){return c.story.plan?.time==='usual'?'gather-absent':c.story.plan?.reader==='mara'?'gather-mara':'gather-listener';}
export function lanternRecord(c:Chapter,id:LanternId):LanternRecord {
 const f=c.story,contribution=performedEnding(c),base={id,contribution:null};
 switch(id){
 case 'picnic':return {...base,title:'The Windy Picnic',author:'Grandma',available:true,scene:'picnic',note:'An older story shared in this garden. The stones hold the tablecloth down while the wind keeps blowing.',page:'picnic'};
 case 'duet':return {...base,title:'The Unexpected Duet',author:'Mara',available:true,scene:'duet',note:'An older garden story about two passengers making music together.',page:'duet'};
 case 'mara':return {...base,title:'The Torn Wing',author:'Mara',available:!!f.records.mara,scene:f.records.mara??'waiting-flower',note:f.records.mara?'Mara’s story has been shared here. This flower keeps the '+(f.records.mara==='promise'?'boy’s promise to his sister.':'gift they repaired together.'):'This flower is waiting for Mara’s story to be shared. Opening a page does not tell the story to anyone.',page:f.records.mara?'story':null};
 case 'sol':return {...base,title:'A Small Repair',author:'Sol',available:!!f.records.sol,scene:f.records.sol??'waiting-flower',note:!f.records.sol?'This flower is waiting for Sol to share his story at the gathering.':f.records.sol==='draft'?'Sol shared his draft. Its ending is still open.':'This is the version Sol actually shared with the gathering.',page:f.records.sol?'sol':null,contribution};
 case 'grandma':return {...base,title:'The Empty Bench',author:'Grandma',available:f.records.grandma,scene:f.records.grandma?'bench':'waiting-flower',note:f.records.grandma?'Grandma shared her own account after learning why her friends had stayed away.':'This flower is waiting for Grandma to finish and share her own account.',page:f.records.grandma?'empty':null};
 case 'pip':return {...base,title:'Pip’s promise',author:'Pip',available:!!f.records.pip,scene:f.records.pip==='planting'?'planting':f.records.pip==='gathering'?gatheringPicture(c):'waiting-flower',note:f.records.pip==='planting'?'Pip and Grandma planted the same seed together. Pip kept his promise.':f.records.pip==='gathering'?(f.plan?.time==='usual'?'Pip read Mara’s story to Sol and Grandma. Mara was at work.':f.plan?.reader==='mara'?'Mara told her story to Pip, Sol and Grandma.':'Pip read Mara’s story while Mara, Sol and Grandma listened.'):f.records.grandma?'Grandma has shared her story and invited Pip to choose a memory. Choose it in her conversation, then place it in this same flower.':'This is the flower Pip and Grandma grew. After Grandma shares her story, choose a memory for it.',page:f.ending?'endingWords':null};
 }
}
export function presentationScene(c:Chapter,page:number){return ['planting',gatheringPicture(c),performedEnding(c)?.scene??'draft',c.story.ending?.mara==='absent'?'delivery':'gathering'][page]??'planting';}
export const contributionCredit=(value:Contribution)=>value.origin==='child'?'Your suggested ending, shared by Sol. The picture follows the event you chose; your words have not been checked against his account.':'Prepared ending from Sol’s account.';
