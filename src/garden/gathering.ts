import {sources} from './content.js';
// Implementation draft; moved into src/garden only after the bounded Group5 receipt.
import type {Chapter,GardenState,Point} from './model.js';
import type {Contribution,GatheringTime,Reader,StoryEvent} from './chapter.js';
import {chapterSources,preparedEndings} from './chapterContent.js';

export type ArrivalCheckpoint='not-started'|'boat-moored'|'passengers-ashore'|'sol-arrived'|'ready'|'historical';
export type GatheringAction='finalBoat'|'finalPassengers'|'solArrival'|'maraArrival'|'bringCushions'|'finishGrandmaPage';
export type TurnKind='mara'|'welcome'|'sol'|'question'|'add-ending'|'keep-draft'|'disclosure'|'grandma'|'closing'|'copy-offer'|'receipt';
export type WorldTurn={kind:TurnKind;index:number;contribution:Contribution|null;question:'bread'|'thanks'|null};
export interface GatheringState {
 edition:'connected-20260915'|'earlier-chapter';
 reported:null|{time:GatheringTime;reader:Reader};arrival:ArrivalCheckpoint;
 welcome:boolean;solPerformed:Contribution|'draft'|null;solDisclosed:boolean;cushions:boolean;pageComplete:boolean;grandmaPerformed:boolean;
 turn:WorldTurn|null;
}
export type SpokenLine={origin?:'child-draft'|'authored-display';who:'Pip'|'Mara'|'Sol'|'Grandma';text:string;source?:string;paragraph?:number;attribution?:string};
export const freshGathering=():GatheringState=>({edition:'connected-20260915',reported:null,arrival:'not-started',welcome:false,solPerformed:null,solDisclosed:false,cushions:false,pageComplete:false,grandmaPerformed:false,turn:null});
export const earlierGathering=(c:Chapter):GatheringState=>c.story.phase==='planning'?freshGathering():{...freshGathering(),edition:'earlier-chapter',arrival:'historical'};
export const gatheringAction=(v:string):v is GatheringAction=>['finalBoat','finalPassengers','solArrival','maraArrival','bringCushions','finishGrandmaPage'].includes(v);
export const gatheringDurations:Record<GatheringAction,number>={finalBoat:4500,finalPassengers:4200,solArrival:4400,maraArrival:6500,bringCushions:4500,finishGrandmaPage:2400};
export const gatheringActionText:Record<GatheringAction,string>={finalBoat:'The last boat returns. Its operator brings it alongside the passenger dock.',finalPassengers:'Mara helps the last passengers safely ashore. Her work finishes when everyone is off the boat.',solArrival:'Sol brings his actual manuscript from the workshop to the garden.',maraArrival:'Mara has finished work. She walks across the secured footbridge to join the gathering.',bringCushions:'Grandma opens the storage beside her bench and brings out the spare cushions.',finishGrandmaPage:'Grandma adds what she has learned today to the end of her waiting story.'};
export function reportedPlan(c:Chapter){const p=c.story.plan,r=c.gathering.reported;return !!p&&!!r&&p.time===r.time&&p.reader===r.reader;}
export const connectedGathering=(c:Chapter)=>c.gathering.edition==='connected-20260915';
export function gatheringInstruction(c:Chapter):string|null{
 if(!connectedGathering(c)||c.story.phase==='planning'||c.story.phase==='closed'&&!c.gathering.turn)return null;
 const g=c.gathering,t=g.turn;
 if(t)return 'The complete telling plays in order. Pause or replay whenever you like, or open the full text with reading help.';
 if(c.story.phase==='arriving')return `Pip stays with Grandma while the invited guests arrive. ${g.arrival==='not-started'?(c.story.plan?.time==='later'?'Bring the last boat alongside. Mara is still on duty.':'Let Sol walk from the workshop to the garden. Mara remains at work.'):g.arrival==='boat-moored'?'The boat is alongside. Help the last passengers ashore before Mara can leave work.':g.arrival==='passengers-ashore'?'Mara has finished helping the passengers. Let Sol bring his manuscript to the garden.':'Sol is here. Let Mara walk across the secured footbridge to join you.'} Use the named control beside the scene. Help and Pause keep the last completed arrival stage.`;
 if(c.story.phase==='grandma')return !g.solDisclosed?'Return to the gathering and hear Grandma ask Sol why he stopped bringing stories.':!g.cushions?'Grandma understands both friends now. Return to the gathering to let her bring out the stored cushions.':!g.pageComplete?'The cushions are on the bench. Return to the gathering to let Grandma finish her account.':'Grandma has finished The Empty Bench. Read it with help if you like, then let her share it with the people here.';
 return c.story.phase==='welcome'?'The invited guests are here. Return to the gathering, read Pip’s welcome if you like, then welcome everyone in the garden.':c.story.phase==='mara'?'Return to the gathering and share The Torn Wing with the people here.':c.story.phase==='sol'?'Return to the gathering and let Sol share his chosen version or open draft.':c.story.phase==='discussion'?'Return to Sol’s discussion. You can ask him to tell the listeners about the bread or thank-you visit, or keep his draft as it is.':'Choose a memory in Grandma’s conversation, then place it in Pip’s flower. Afterward, finish the closing conversation.';
}
export function arrivalNext(c:Chapter):GatheringAction|null{
 if(c.story.phase!=='arriving'||!connectedGathering(c))return null;
 switch(c.gathering.arrival){case 'not-started':return c.story.plan?.time==='later'?'finalBoat':'solArrival';case 'boat-moored':return 'finalPassengers';case 'passengers-ashore':return 'solArrival';case 'sol-arrived':return 'maraArrival';default:return null;}
}
export function arrivedSol(c:Chapter){return connectedGathering(c)?['sol-arrived','ready'].includes(c.gathering.arrival):!['planning','arriving'].includes(c.story.phase);}
export function arrivedMara(c:Chapter){return c.story.plan?.time==='later'&&(connectedGathering(c)?c.gathering.arrival==='ready':!['planning','arriving'].includes(c.story.phase));}
export function welcomeWords(c:Chapter){const p=c.story.plan;return !p?'':p.time==='usual'?"Welcome back to the garden. Mara is working at the dock, so she asked me to share The Torn Wing for her. Sol has brought A Small Repair.":p.reader==='mara'?"Welcome back to the garden. We postponed the gathering so Mara could finish her work and join us. Mara will tell The Torn Wing, and Sol will share A Small Repair.":"Welcome back to the garden. We postponed the gathering so Mara could finish her work and join us. I'll read The Torn Wing for her, and Sol will share A Small Repair.";}
const childCredit='Your suggested ending, shared by Sol. The picture follows the event you chose; your words have not been checked against his account.';
const preparedCredit='Prepared ending from Sol’s account.';
const sourceLines=(id:'sol'|'empty',who:SpokenLine['who']):SpokenLine[]=>chapterSources[id].paragraphs.map((text,paragraph)=>({who,text,source:id,paragraph}));
export const witnessedQuestion={bread:'Would you tell everyone how the repair helped Rina bake the bread?',thanks:'Would you tell everyone about Rina’s thank-you visit?'} as const;
export const witnessedReply={bread:'The repaired roof kept the flour dry. Rina used it to bake the bread she had promised.',thanks:'Rina came to my workshop with a loaf of bread. She brought it to thank me for the repair.'} as const;
export function turnLines(c:Chapter,turn:WorldTurn=c.gathering.turn!):SpokenLine[]{
 if(!turn)return [];
 const contribution=turn.contribution,ending:SpokenLine[]=contribution?[{who:'Sol',text:contribution.text,origin:contribution.origin==='child'?'child-draft':'authored-display',attribution:contribution.origin==='child'?childCredit:preparedCredit,...(contribution.origin==='prepared'?{source:contribution.scene==='thanks'?'thanksEnding':'breadEnding',paragraph:0}:{})}]:[];
 switch(turn.kind){
 case 'mara':return sources.story.paragraphs.map((text,paragraph)=>({who:c.story.plan?.reader==='mara'?'Mara':'Pip',text,source:'story',paragraph}));
 case 'welcome':return [{who:'Pip',text:welcomeWords(c)}];
 case 'sol':return [{who:'Pip',text:contribution?"Sol has brought A Small Repair and the ending we chose together.":"Sol has brought a draft of his story. After he reads it, we can tell him what we'd like to hear more about."},...sourceLines('sol','Sol'),...ending,...(contribution?[{who:'Grandma' as const,text:contribution.scene==='bread'?"The repair helped Rina keep her bread promise. I'm glad you told us about it.":contribution.scene==='thanks'?"Rina's visit shows that your help mattered to her.":"Your repair helped Rina bake, and her visit showed you how much she appreciated it."}]:[{who:'Sol' as const,text:"That's as far as I've written. What would you like to hear about next?"}])];
 case 'question':return [{who:'Pip',text:witnessedQuestion[turn.question!]},{who:'Sol',text:witnessedReply[turn.question!]}];
 case 'add-ending':return [{who:'Sol',text:"I'll add this part to the page and share it with everyone."},...ending,{who:'Grandma',text:turn.question==='thanks'?"Rina's visit shows that your help mattered to her.":"That repair helped her keep the bread promise."}];
 case 'keep-draft':return [{who:'Sol',text:c.story.questions.length?'That gives me something to add when I work on the ending. Thank you for listening.':'Thank you for listening. I’ll keep working on the ending.'}];
 case 'closing':return [{who:'Grandma',text:'I’m glad you could stay for my story, Mara.'},{who:'Mara',text:'I’m glad we started later. I’ve missed hearing your stories.'}];
 case 'copy-offer':return [{who:'Grandma',text:'Mara sent us a story. Please take her this copy of mine.'}];
 case 'receipt':return [{who:'Mara',text:'Thank you. I’ll read it after the last boat returns. It’s good to have a story from her again.'}];
 case 'disclosure':return [{who:'Grandma',text:'What kept you from bringing stories before today?'},{who:'Sol',text:"I didn't think anyone would want to hear about the ordinary things I make and fix."},{who:'Grandma',text:"I'm glad you shared your story with us."}];
 case 'grandma':return [...sourceLines('empty','Grandma'),{who:'Sol',text:"I'm glad there's a place for my stories here."},...(c.story.plan?.time==='later'?[{who:'Mara' as const,text:"I'm glad we found a time when I can listen, too."}]:[]),{who:'Grandma',text:'You kept your promise, Pip. We planted the seed together. Which part of today would you like its lantern to show?'}];
 }
}
export function startTurn(s:GardenState,kind:TurnKind,contribution:Contribution|null=null,question:'bread'|'thanks'|null=null){
 s.chapter.gathering.turn={kind,index:0,contribution:contribution?structuredClone(contribution):null,question};s.panel=null;s.route=[];s.keys=[];s.notice=kind==='receipt'?'Pip has delivered Grandma’s copy. Hear Mara’s reply at the dock.':'The people in the garden are listening. The complete telling plays in order; you can pause at any time.';
}
export function finishTurn(s:GardenState){
 const c=s.chapter,g=c.gathering,f=c.story,t=g.turn;if(!t)return;
 switch(t.kind){
 case 'mara':c.mara.sharedAt='gathering';f.records.mara=f.maraPicture;break;
 case 'welcome':g.welcome=true;f.phase='mara';break;
 case 'sol':g.solPerformed=t.contribution?structuredClone(t.contribution):'draft';if(t.contribution){f.solOutcome='prepared';f.records.sol=t.contribution.scene;f.phase='grandma';}else {f.records.sol='draft';f.phase='discussion';}break;
 case 'question':if(!f.questions.includes(t.question!))f.questions.push(t.question!);f.laterKnown=true;break;
 case 'add-ending':f.solEnding=structuredClone(t.contribution);g.solPerformed=structuredClone(t.contribution);f.solOutcome='developed';f.records.sol=t.contribution!.scene;f.phase='grandma';break;
 case 'keep-draft':f.solOutcome='draft';f.records.sol='draft';f.phase='grandma';break;
 case 'disclosure':g.solDisclosed=true;break;
 case 'grandma':g.grandmaPerformed=true;f.records.grandma=true;f.phase='moment';break;
 case 'closing':f.phase='closed';f.closingDone=true;break;
 case 'copy-offer':f.phase='closed';break;
 case 'receipt':f.closingDone=true;break;
 }
 const key='GATHER_'+t.kind.toUpperCase()+(t.question?'_'+t.question:'');if(!c.history.includes(key))c.history.push(key);g.turn=null;s.panel='gathering';s.notice='';
}
export function settleGathering(s:GardenState,kind:GatheringAction){
 const c=s.chapter,g=c.gathering;
 if(kind==='finalBoat')g.arrival='boat-moored';
 if(kind==='finalPassengers')g.arrival='passengers-ashore';
 if(kind==='solArrival')g.arrival=c.story.plan?.time==='usual'?'ready':'sol-arrived';
 if(kind==='maraArrival')g.arrival='ready';
 if(g.arrival==='ready'&&c.story.phase==='arriving'){c.story.phase='welcome';s.panel='gathering';}
 if(kind==='bringCushions')g.cushions=true;
 if(kind==='finishGrandmaPage')g.pageComplete=true;
 s.notice=kind==='finalBoat'?'The last boat is alongside. Mara still needs to help the passengers ashore.':kind==='finalPassengers'?'All the passengers are ashore. Mara has finished work.':kind==='solArrival'&&c.story.plan?.time==='later'?'Sol has arrived with his manuscript. Mara can now cross to the garden.':kind==='bringCushions'?'The cushions are on the bench. Grandma can now finish the story of why she put them away.':kind==='finishGrandmaPage'?'Grandma has finished The Empty Bench. She is ready to share it.':'The invited guests have arrived. Pip can welcome them.';
}
export function gatheringEvent(s:GardenState,event:StoryEvent):{handled:boolean;action:GatheringAction|null}{
 const c=s.chapter,f=c.story,g=c.gathering,no={handled:false,action:null},yes={handled:true,action:null};
 if(!connectedGathering(c))return no;
 const atGrandma=Math.hypot(c.pip.x-4.4,c.pip.z-3.6)<1.5;
 if(event.kind==='REPORT_ARRANGEMENTS'){
  if(f.phase==='planning'&&atGrandma&&f.plan&&f.solReported&&f.maraReported&&f.solInvitation===f.plan.time&&f.maraInvitation?.time===f.plan.time&&f.maraInvitation.reader===f.plan.reader&&(f.plan.reader==='mara'||c.page!=='mara')){g.reported={time:f.plan.time,reader:f.plan.reader};s.notice='Grandma says: “Everyone has agreed. Begin when you are ready.”';}return yes;
 }
 if(event.kind==='CONTINUE_ARRIVAL'){return {handled:true,action:atGrandma?arrivalNext(c):null};}
 if(event.kind==='SHARE_MARA'&&f.phase==='mara'&&atGrandma&&c.mara.sharedAt!=='none'&&!g.turn){startTurn(s,'mara');return yes;}
 if(event.kind==='TURN_NEXT'){
  if(g.turn&&!s.panel){if(g.turn.index<turnLines(c).length-1)g.turn.index++;else finishTurn(s);}return yes;
 }
 if(event.kind==='NEXT_STORY'&&atGrandma){
  if(g.turn)return yes;
  if(f.phase==='welcome'){startTurn(s,'welcome');return yes;}
  if(f.phase==='sol'){startTurn(s,'sol',f.solChoice==='prepared'?f.solEnding:null);return yes;}
  if(f.phase==='closing'){startTurn(s,f.plan?.time==='later'?'closing':'copy-offer');return yes;}
  if(f.phase==='grandma'){
   if(!g.solDisclosed)startTurn(s,'disclosure');
   else if(!g.cushions)return {handled:true,action:'bringCushions'};
   else if(!g.pageComplete)return {handled:true,action:'finishGrandmaPage'};
   else if(!g.grandmaPerformed)startTurn(s,'grandma');
   return yes;
  }
 }
 if(['ASK_SOL','ADD_ENDING','KEEP_DRAFT'].includes(event.kind)){
  if(f.phase!=='discussion'||!atGrandma||g.turn)return yes;
  if(event.kind==='ASK_SOL')startTurn(s,'question',null,event.question);
  if(event.kind==='ADD_ENDING'&&f.questions.includes(event.scene))startTurn(s,'add-ending',{text:preparedEndings[event.scene],scene:event.scene,origin:'prepared',revision:f.solDraft.revision},event.scene);
  if(event.kind==='KEEP_DRAFT')startTurn(s,'keep-draft');
  return yes;
 }
 return no;
}
export function validGathering(c:Chapter){
 const g=c.gathering,f=c.story;if(!g||!['connected-20260915','earlier-chapter'].includes(g.edition))return false;
 if(!['not-started','boat-moored','passengers-ashore','sol-arrived','ready','historical'].includes(g.arrival)||![g.welcome,g.solDisclosed,g.cushions,g.pageComplete,g.grandmaPerformed].every(x=>typeof x==='boolean'))return false;
 if(g.reported!==null&&(!g.reported||!['usual','later'].includes(g.reported.time)||!['pip','mara'].includes(g.reported.reader)||g.reported.time==='usual'&&g.reported.reader==='mara'))return false;
 if(g.edition==='earlier-chapter')return f.phase!=='planning'&&g.arrival==='historical'&&g.reported===null&&!g.welcome&&g.solPerformed===null&&!g.solDisclosed&&!g.cushions&&!g.pageComplete&&!g.grandmaPerformed&&g.turn===null;
 if(g.arrival==='historical'||f.phase==='planning'&&g.arrival!=='not-started'||f.phase==='arriving'&&g.arrival==='ready'||!['planning','arriving'].includes(f.phase)&&g.arrival!=='ready')return false;
 if(f.plan?.time==='usual'&&['boat-moored','passengers-ashore','sol-arrived'].includes(g.arrival))return false;
 if(f.phase!=='planning'&&!reportedPlan(c))return false;
 if(g.welcome!==!['planning','arriving','welcome'].includes(f.phase))return false;
 if(g.solPerformed!==null&&g.solPerformed!=='draft'&&JSON.stringify(g.solPerformed)!==JSON.stringify(f.solEnding))return false;
 if(['planning','arriving','welcome','mara','sol'].includes(f.phase)&&g.solPerformed!==null)return false;
 if(['discussion','grandma','moment','closing','closed'].includes(f.phase)&&g.solPerformed===null)return false;
 if(f.phase==='discussion'&&(g.solPerformed!=='draft'||f.solOutcome!==null))return false;
 if(f.solOutcome==='draft'&&g.solPerformed!=='draft'||f.solOutcome&&f.solOutcome!=='draft'&&(g.solPerformed===null||g.solPerformed==='draft'))return false;
 if(g.solDisclosed&&(!f.solOutcome||!f.maraReported)||g.cushions&&!g.solDisclosed||g.pageComplete&&!g.cushions||g.grandmaPerformed&&!g.pageComplete||g.grandmaPerformed!==f.records.grandma)return false;
 if(g.grandmaPerformed!==['moment','closing','closed'].includes(f.phase))return false;
 const t=g.turn;if(t!==null){
  if(!t||!['mara','welcome','sol','question','add-ending','keep-draft','disclosure','grandma','closing','copy-offer','receipt'].includes(t.kind)||!Number.isSafeInteger(t.index)||t.index<0||![null,'bread','thanks'].includes(t.question))return false;
  if(t.kind==='receipt'?Math.hypot(c.pip.x+3.5,c.pip.z+4)>=1.5:Math.hypot(c.pip.x-4.4,c.pip.z-3.6)>=1.5)return false;
  const expected=t.kind==='mara'?'mara':t.kind==='welcome'?'welcome':t.kind==='sol'?'sol':['question','add-ending','keep-draft'].includes(t.kind)?'discussion':['closing','copy-offer'].includes(t.kind)?'closing':t.kind==='receipt'?'closed':'grandma';if(f.phase!==expected)return false;
  if(t.kind==='closing'&&(f.plan?.time!=='later'||f.closingDone)||t.kind==='copy-offer'&&(f.plan?.time!=='usual'||f.grandmaCopy!=='none')||t.kind==='receipt'&&(f.plan?.time!=='usual'||f.grandmaCopy!=='mara'||f.closingDone))return false;
  if(t.kind==='sol'&&JSON.stringify(t.contribution)!==JSON.stringify(f.solChoice==='prepared'?f.solEnding:null))return false;
  if(t.kind==='add-ending'&&(!t.question||!f.questions.includes(t.question)||!t.contribution||t.contribution.origin!=='prepared'||t.contribution.scene!==t.question||t.contribution.text!==preparedEndings[t.question]||t.contribution.revision!==f.solDraft.revision))return false;
  if(!['sol','add-ending'].includes(t.kind)&&t.contribution!==null)return false;
  if(['question','add-ending'].includes(t.kind)?!t.question:t.question!==null)return false;
  if(t.kind==='disclosure'&&g.solDisclosed||t.kind==='grandma'&&(!g.pageComplete||g.grandmaPerformed))return false;
  if(t.index>=turnLines(c,t).length)return false;
 }
 return true;
}
