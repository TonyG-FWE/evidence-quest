import type {GardenState, Panel} from './model.js';
import type {Contribution, GatheringTime, Reader} from './chapter.js';
import type {LanternId} from './lanterns.js';

/** View context is temporary; it never supplies story facts or possession. */
export type FocusAnchor = {label:string;tag:string;index:number;id?:string};
export type ReturnFrame = {panel:Panel;mode:GardenState['mode'];focus:FocusAnchor|null};
export type WorldActivity = {
 id:string;parent:ReturnFrame;elapsed:number;
} & ({kind:'ending-rehearsal';contribution:Contribution}|{kind:'plan-preview';time:GatheringTime;reader:Reader}|{kind:'lantern-inspect';lantern:LanternId}|{kind:'ending-presentation';mode:'watch'|'narrate'});

export function rememberView(s:GardenState,focus:FocusAnchor|null=null):ReturnFrame {
 return {panel:s.panel,mode:s.mode,focus};
}
export function enterReader(s:GardenState,panel:Panel,focus:FocusAnchor|null=null){
 if(s.panel===panel)return;
 if(s.panelTrail.length>=20){s.notice='Close this page to return to the previous one.';return;}
 s.panelTrail.push(rememberView(s,focus));s.panel=panel;s.restoreFocus=null;
}
export function leaveReader(s:GardenState){
 const parent=s.panelTrail.pop();
 s.panel=parent?.panel??null;s.mode=parent?.mode??s.mode;s.restoreFocus=parent?.focus??null;
}
export function leaveActivity(s:GardenState){
 if(!s.activity)return;
 const parent=s.activity.parent;s.activity=null;s.panel=parent.panel;s.mode=parent.mode;s.restoreFocus=parent.focus;s.notice='';
}
export function resetViews(s:GardenState){delete s.readingInspection;s.panelTrail=[];s.activity=null;s.actionParent=null;s.restoreFocus=null;}
const labels:Partial<Record<NonNullable<Panel>,string>>={festival:'SparkFest and Loop',bakery:'the bakery account',birdTalk:'the boy',backpack:'the backpack',help:'Help',pause:'Pause',writing:'your ending',planner:'the gathering plan',gathering:'the gathering',lanterns:'the lantern stories',studio:'Loop',grandma:'Grandma',mara:'Mara',sol:'Sol',sections:'the crossing note',opening:'Grandma’s letter',story:'Mara’s story',report:'the conversation',later:'Sol’s account',picnic:'The Windy Picnic',duet:'The Unexpected Duet',empty:'The Empty Bench'};
export function readerReturnLabel(s:GardenState){
 if(s.panel==='festival'&&!s.chapter.started)return 'Back to SparkFest';
 const parent=s.panelTrail.at(-1);
 if(s.panel==='gathering'&&!parent?.panel&&s.chapter.gathering.turn)return 'Back to the world telling';
 if(s.panel==='gathering'&&!parent?.panel&&s.chapter.story.phase==='arriving')return 'Back to the arriving guests';
 return parent?.panel?'Back to '+(labels[parent.panel]??'the story'):s.activity?s.activity.kind==='lantern-inspect'?'Back to this lantern':s.activity.kind==='ending-presentation'?'Back to Loop’s picture show':'Back to the preview':s.mode==='workbench'?'Back to the workbench':s.mode==='bakery-repair'?'Back to the roof repair':s.mode==='mara-story'?'Back to Mara’s earlier story':s.mode==='boat'?'Back to the seed boat':parent?.mode==='arrange'||s.mode==='arrange'?'Back to the bridge pieces':'Continue to the game';
}
export function roleText(s:GardenState){
 if(s.chapter.gathering.turn)return s.chapter.gathering.turn.kind==='receipt'?'At Mara’s dock · Hear her reply to the delivered story':'At the gathering · Listen to the whole telling, pause or read the complete text';
 if(s.chapter.story.phase==='arriving')return 'Pip waits with Grandma while the invited guests arrive';
 if(s.activity)return s.activity.kind==='ending-rehearsal'?'Rehearsing Sol’s ending · Pip waits at the workshop':s.activity.kind==='lantern-inspect'?'A memory kept in the garden · Pip stays where you left him':s.activity.kind==='ending-presentation'?(s.activity.mode==='watch'?'Watching Loop’s picture show':'Narrating with Loop'):'Trying a gathering plan · Previewing does not send invitations';
 if(s.action?.kind==='keepMemory')return 'Pip puts his chosen memory in the flower he grew with Grandma';
 if(s.action?.kind==='bringCushions'||s.action?.kind==='finishGrandmaPage')return 'Grandma prepares to share her own story';
 return s.mode==='workbench'?'At Sol’s workbench · Arrange witnessed moments in your own telling':s.mode==='bakery-repair'?'You direct Sol’s roof repair · Pip is the material helper':s.mode==='mara-story'?'You guide Mara in her earlier story · Pip waits in the garden':s.mode==='boat'?'You steer the seed boat · Pip waits on the bank':s.mode==='arrange'?'You direct the bridge repair · Pip waits on the bank':'You are Pip · Explore, talk and help';
}
