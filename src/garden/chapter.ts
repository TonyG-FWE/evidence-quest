import {conversationReady,rememberConversation} from './conversation.js';
import {arrivedMara,arrivedSol,connectedGathering,gatheringEvent,arrivalNext,reportedPlan,welcomeWords,type GatheringAction} from './gathering.js';
import {bakeryReady,solAtWorkshop,bakeryInstruction,BAKERY_SOL,BAKERY_APPROACH} from './bakery.js';
import {endingLines,preparedEndings} from './chapterContent.js';
import type {Chapter,GardenState,Point} from './model.js';
export type GatheringTime='usual'|'later';
export type Reader='pip'|'mara';
export type EndingScene='bread'|'thanks'|'both';
export type Contribution={text:string;scene:EndingScene;origin:'child'|'prepared';revision:number};
export type MaraMessageState={mode:'prepared'|'own';text:string;confirmed:boolean;delivered:{mode:'prepared'|'own';text:string}|null};
export const preparedMaraMessage='Mara still wants to come to the garden. She has to help the passengers until the last boat returns. Starting after that would give her time to finish work.';
export type GatheringPhase='planning'|'arriving'|'welcome'|'mara'|'sol'|'discussion'|'grandma'|'moment'|'closing'|'closed';
export interface StoryState {
 metSol:boolean;solChoice:'none'|'prepared'|'draft';solDraft:{text:string;revision:number};solEnding:Contribution|null;maraPicture:'promise'|'repair';
 laterKnown:boolean;questions:('bread'|'thanks')[];solReported:boolean;maraReported:boolean;timeAgreed:GatheringTime|null;
 plan:{time:GatheringTime;reader:Reader;revision:number}|null;solInvitation:GatheringTime|null;maraInvitation:{time:GatheringTime;reader:Reader}|null;
 phase:GatheringPhase;solOutcome:'prepared'|'developed'|'draft'|null;
 records:{mara:'promise'|'repair'|null;sol:EndingScene|'draft'|null;grandma:boolean;pip:'planting'|'gathering'|null};
 grandmaCopy:'none'|'pip'|'mara';closingDone:boolean;
 ending:{mara:'mara'|'listener'|'absent';sol:'prepared'|'developed'|'draft';paragraphs:string[]}|null;
 presentation:{page:number;finished:boolean;inProgress?:boolean};answers:Record<string,string>;bridgeFailures:number;
 maraMessage?:MaraMessageState;
}
export const SOL:Point={x:4.5,z:-2.15},SOL_APPROACH:Point={x:3.55,z:-1.4};
export const GATHER_MARA:Point={x:4.4,z:.4},GATHER_SOL:Point={x:5.2,z:.1};
export const freshStory=():StoryState=>({metSol:false,solChoice:'none',solDraft:{text:'',revision:0},solEnding:null,maraPicture:'repair',laterKnown:false,questions:[],solReported:false,maraReported:false,timeAgreed:null,plan:null,solInvitation:null,maraInvitation:null,phase:'planning',solOutcome:null,records:{mara:null,sol:null,grandma:false,pip:null},grandmaCopy:'none',closingDone:false,ending:null,presentation:{page:0,finished:false},answers:{},bridgeFailures:0});
export const gatheringStarted=(c:Chapter)=>c.story.phase!=='planning';
export const maraAtGarden=(c:Chapter)=>arrivedMara(c);
export const solPosition=(c:Chapter)=>arrivedSol(c)?GATHER_SOL:solAtWorkshop(c)?SOL:BAKERY_SOL;
export const solApproach=(c:Chapter)=>gatheringStarted(c)?{x:4,z:.1}:solAtWorkshop(c)?SOL_APPROACH:BAKERY_APPROACH;
export function planProblems(c:Chapter):string[]{
 const f=c.story,p=f.plan,problems:string[]=[];
 if(!c.bloomed)problems.push('Plant the seed with Grandma first.');
 if(!f.metSol)problems.push("We haven't asked Sol whether he'd like to share a story. Find him at Rina’s bakery first.");
 else if(f.solChoice==='none')problems.push('Ask Sol whether he wants to finish his ending or bring his draft.');
 else if(!f.solReported)problems.push('Tell Grandma what Sol wants to share.');
 if(!f.maraReported)problems.push('Tell Grandma why Mara has been unable to visit.');
 if(!p){problems.push('Choose a time and someone to share Mara’s story.');return problems;}
 if(p.time==='usual'&&p.reader==='mara')problems.push('At the usual time, Mara will still be working. We can start later, or you can read the story she sent.');
 if(p.reader==='pip'&&c.page==='mara')problems.push('Ask Mara for a copy of her story before Pip reads it.');
 if(f.solChoice!=='none'&&f.solInvitation!==p.time)problems.push(f.solInvitation?'Sol is still expecting the previous time. Tell him when the gathering will start.':'Tell Sol when the gathering will start.');
 if(!f.maraInvitation||f.maraInvitation.time!==p.time||f.maraInvitation.reader!==p.reader)problems.push('Tell Mara the current plan and agree who will read her story.');
 if(connectedGathering(c)&&p.time==='later'&&!(c.joined&&c.west&&c.east))problems.push('Mara needs the footbridge secured before she can cross.');
 if(connectedGathering(c)&&!reportedPlan(c))problems.push('Return to Grandma and report the agreed arrangements.');
 return problems;
}
export function chapterGoal(c:Chapter):{goal:string;next:string;target:'mara'|'grandma'|'sections'|'seedBoat'|'sol'|'lanterns'}{
 const f=c.story;
 if(c.gathering.turn)return {goal:c.gathering.turn.kind==='receipt'?'Hear Mara’s reply.':'Listen to the person speaking.',next:'The whole telling plays automatically. Pause, replay or open the complete text with reading help.',target:c.gathering.turn.kind==='receipt'?'mara':'grandma'};
 if(c.seed==='boat')return {goal:'Bring the seed to Grandma’s landing.',next:c.river.boat.phase==='loaded'?'Launch the seed boat, then steer around the rock to the blue landing.':'Steer around the rock to the blue landing. Give Grandma the seed there, or return to the yellow launch and unload.',target:'seedBoat'};
 if(f.ending)return {goal:'Your Garden Adventure is complete.',next:'Watch the ending with Jo and Loop, or explore your stories.',target:'lanterns'};
 if(f.phase==='closed')return f.closingDone?{goal:'Bring your ending to life.',next:'Finish the chapter when you are ready.',target:'grandma'}:{goal:'Take Grandma’s story to Mara.',next:f.grandmaCopy==='pip'?'Carry the copy back across the footbridge to Mara.':'Ask Grandma for her copy of The Empty Bench.',target:f.grandmaCopy==='pip'?'mara':'grandma'};
 if(f.phase==='moment')return {goal:'Choose Pip’s memory.',next:'Grandma has shared her story. Choose the moment to keep in Pip’s flower during your conversation.',target:'grandma'};
 if(f.phase==='closing')return {goal:'Finish the gathering together.',next:f.plan?.time==='later'?'Hear Grandma and Mara finish their conversation.':'Hear Grandma’s offer to send her story to Mara.',target:'grandma'};
 if(f.phase!=='planning')return {goal:'Share stories in Grandma’s garden.',next:f.phase==='arriving'?'Your friends are on their way.':'Return to the gathering to continue the stories.',target:'grandma'};
 if(!c.crossed)return {goal:'Reach Grandma’s garden and plant the seed together.',next:c.joined&&c.west&&c.east?'The footbridge is secure. Guide Pip across to Grandma.':!conversationReady(c,'mara')?'Talk to Mara at the dock.':'Repair the footbridge. Read the note to find out how.',target:c.joined&&c.west&&c.east?'grandma':!conversationReady(c,'mara')?'mara':'sections'};
 if(!c.bloomed)return {goal:'Keep your promise to Grandma.',next:'Plant the seed together before the gathering.',target:'grandma'};
 if(!conversationReady(c,'mara'))return {goal:'Help the garden’s stories return.',next:'Find out why Mara has been unable to visit.',target:'mara'};
 if(c.mara.asking==='pending'&&!f.maraReported)return {goal:'Tell Grandma what Mara said.',next:'Talk to Grandma about Mara’s work and when she could join the gathering.',target:'grandma'};
 if(!bakeryReady(c))return {goal:c.bakery.stage==='escorting'?'Thank Sol for the repair.':'Help Rina keep her bread promise.',next:bakeryInstruction({chapter:c} as GardenState),target:'sol'};
 if(!f.metSol||f.solChoice==='none')return {goal:'Find a way for everyone to share.',next:'Visit Sol’s workshop beside the garden.',target:'sol'};
 if(!f.solReported||!f.maraReported||!f.plan)return {goal:'Arrange a gathering with Grandma.',next:'Tell Grandma what you learned and choose a plan.',target:'grandma'};
 if(f.solInvitation!==f.plan.time)return {goal:'Make sure everyone knows the plan.',next:'Tell Sol the current gathering time.',target:'sol'};
 if(!f.maraInvitation||f.maraInvitation.time!==f.plan.time||f.maraInvitation.reader!==f.plan.reader||f.plan.reader==='pip'&&c.page==='mara')return {goal:'Agree the plan with Mara.',next:'Visit Mara at the dock. She needs to finish helping her passengers.',target:'mara'};
 return {goal:'The gathering is ready to begin.',next:'Return to Grandma and begin when you are ready.',target:'grandma'};
}
export const welcome=welcomeWords;
export type StoryEvent=
 |{kind:'REPLACE_WORD';revision:number;start:number;end:number;word:string;replacement:string}
 |{kind:'OFFER_LATER'}|{kind:'OFFER_RETURN_STORY'}|{kind:'BRIDGE_OFFER'}|{kind:'WATCH_DUTY'}|{kind:'SHARE_MARA'}
 |{kind:'PREPARE_MARA_MESSAGE';mode:'prepared'|'own'}|{kind:'EDIT_MARA_MESSAGE';text:string}|{kind:'CONFIRM_MARA_MESSAGE'}
 |{kind:'MEET_SOL'}|{kind:'FINISH_WITH_SOL'}|{kind:'BRING_DRAFT'}|{kind:'EDIT';text:string}|{kind:'SELECT_ENDING';contribution:Contribution}
 |{kind:'REPORT_SOL'}|{kind:'REPORT_MARA'}|{kind:'ASK_LATER'}|{kind:'PLAN';time:GatheringTime;reader:Reader}|{kind:'INVITE';who:'sol'|'mara'}
 |{kind:'REPORT_ARRANGEMENTS'}|{kind:'CONTINUE_ARRIVAL'}|{kind:'TURN_NEXT'}
 |{kind:'BEGIN_GATHERING'}|{kind:'NEXT_STORY'}|{kind:'ASK_SOL';question:'bread'|'thanks'}|{kind:'ADD_ENDING';scene:'bread'|'thanks'}|{kind:'KEEP_DRAFT'}
 |{kind:'MARA_PICTURE';picture:'promise'|'repair'}|{kind:'EARLY_STORY_SHARED'}|{kind:'MOMENT';moment:'planting'|'gathering'}|{kind:'TAKE_COPY'}|{kind:'DELIVER_COPY'}|{kind:'FINISH'}
 |{kind:'PRESENT';page:number;finished?:boolean}|{kind:'ANSWER';activity:string;text:string};
const near=(a:Point,b:Point,r=1.5)=>Math.hypot(a.x-b.x,a.z-b.z)<r;
/** Called only within GardenStore's serialized transaction. No provider response enters here. */
export function applyStory(s:GardenState,event:StoryEvent):GatheringAction|'page'|'arrival'|'copy'|'delivery'|'keepMemory'|'dockService'|'maraTell'|null{
 const c=s.chapter,f=c.story,atGrandma=near(c.pip,{x:4.4,z:3.6}),atSol=near(c.pip,solPosition(c)),atMara=near(c.pip,maraAtGarden(c)?GATHER_MARA:{x:-3.5,z:-4});
 if(s.action||!c.started||s.background||s.viewLost)return null;
 if(c.gathering.turn&&!['TURN_NEXT','ANSWER'].includes(event.kind))return null;
 const connected=gatheringEvent(s,event);if(connected.handled)return connected.action;
 const planning=f.phase==='planning';
 switch(event.kind){
 case 'PREPARE_MARA_MESSAGE':if(planning&&(atMara||atGrandma)&&conversationReady(c,'mara')&&!f.maraReported){f.maraMessage={mode:event.mode,text:event.mode==='prepared'?preparedMaraMessage:f.answers['mara-message']??'',confirmed:event.mode==='prepared',delivered:null};s.notice='';}break;
 case 'EDIT_MARA_MESSAGE':if(planning&&(atMara||atGrandma)&&!f.maraReported&&f.maraMessage?.mode==='own'&&event.text.length<=100000){f.maraMessage.text=event.text;f.maraMessage.confirmed=false;f.answers['mara-message']=event.text;}break;
 case 'CONFIRM_MARA_MESSAGE':if(planning&&(atMara||atGrandma)&&!f.maraReported&&f.maraMessage?.text.trim()){f.maraMessage.confirmed=true;s.notice='';}break;
 case 'REPLACE_WORD':if(f.ending||!f.laterKnown||event.revision!==f.solDraft.revision||event.start<0||event.end<=event.start||f.solDraft.text.slice(event.start,event.end)!==event.word||!event.replacement||event.replacement.length>64||!/^[A-Za-z]+(?:['’][A-Za-z]+)?$/.test(event.replacement))break;f.solDraft={text:f.solDraft.text.slice(0,event.start)+event.replacement+f.solDraft.text.slice(event.end),revision:f.solDraft.revision+1};break;
 case 'OFFER_LATER':if(planning&&atMara&&conversationReady(c,'mara')){if(f.timeAgreed==='later'||f.plan?.time==='later'){c.mara.asking='fulfilled';s.notice='Mara says: “You’ve asked Grandma and she agreed to start later. We still need to agree who will read and confirm the invitation.”';}else{c.mara.asking='pending';s.notice='Mara says: “Please ask Grandma. A later gathering would give me time to finish work. The time has not changed yet.”';}}break;
 case 'BRIDGE_OFFER':if(planning&&atMara&&conversationReady(c,'mara'))s.notice='Mara says: “A safe bridge will help me cross. But I still have to help the last passengers ashore. I will be working at the usual time.”';break;
 case 'OFFER_RETURN_STORY':if(planning&&atMara&&conversationReady(c,'mara')){c.mara.returnOffered=true;s.notice='Mara says: “Please do. If I’m still at work, I’d love to read one of Grandma’s stories afterward.”';}break;
 case 'WATCH_DUTY':if(planning&&atMara&&c.mara.service==='waiting'){rememberConversation(c,'mara');return 'dockService';}break;
 case 'SHARE_MARA':case 'EARLY_STORY_SHARED':if(atGrandma&&(planning&&c.page==='grandma'&&f.maraReported||f.phase==='mara'&&(f.plan?.reader==='mara'||c.page!=='mara')))return 'maraTell';break;
 case 'MEET_SOL':if(!bakeryReady(c)||!atSol)break;f.metSol=true;s.panel='sol';break;
 case 'FINISH_WITH_SOL':if(!planning||!atSol||!f.metSol||!conversationReady(c,'sol'))break;s.notice='';f.laterKnown=true;s.viewDrafts.disclosures['writing-revise']=true;s.panel='writing';break;
 case 'BRING_DRAFT':if(!planning||!atSol||!f.metSol||!conversationReady(c,'sol'))break;if(f.solChoice!=='draft')f.solReported=false;f.solChoice='draft';s.notice="Sol says: “I could try that. I'll bring my draft and ask what people want to know next.”";break;
 case 'EDIT':if(f.ending||!f.laterKnown)break;f.solDraft={text:event.text,revision:f.solDraft.revision+1};break;
 case 'SELECT_ENDING':if(!planning||!f.laterKnown||!atSol||!event.contribution.text.trim()||event.contribution.origin==='child'&&(event.contribution.revision!==f.solDraft.revision||event.contribution.text!==f.solDraft.text))break;f.solEnding=structuredClone(event.contribution);if(f.solChoice!=='prepared')f.solReported=false;f.solChoice='prepared';s.notice=event.contribution.origin==='child'?'Sol says: “I’ll bring your suggested ending. We can show the part of my story you chose.”':"Sol says: “I'll bring this version to the garden. I'd like people to hear what happened.”";break;
 case 'REPORT_SOL':if(!planning||!atGrandma||f.solChoice==='none')break;f.solReported=true;s.notice="Grandma says: “I'd like to hear what Sol brings.”";break;
 case 'REPORT_MARA':if(!planning||!atGrandma||!conversationReady(c,'mara')||f.maraMessage&&!f.maraMessage.confirmed)break;if(!f.maraReported){f.maraMessage??={mode:'prepared',text:preparedMaraMessage,confirmed:true,delivered:null};f.maraMessage.delivered={mode:f.maraMessage.mode,text:f.maraMessage.text};}f.maraReported=true;if(c.page==='grandma')c.grandmaHeard=true;s.notice='';break;
 case 'ASK_LATER':if(!planning||!atGrandma||!f.maraReported||f.plan)break;f.timeAgreed='later';if(c.mara.asking==='pending')c.mara.asking='fulfilled';s.notice='Grandma says: “I’m glad she still wants to come. Let’s start after the last boat returns. We still need to ask our friends what they would like to share.”';break;
 case 'PLAN':if(!planning||!atGrandma||!f.maraReported)break;if(event.time==='usual'&&event.reader==='mara'){s.notice='At the usual time, Mara will still be working. We can start later, or you can read the story she sent.';break;}f.timeAgreed=event.time;if(c.mara.asking==='pending'&&event.time==='later')c.mara.asking='fulfilled';f.plan={time:event.time,reader:event.reader,revision:(f.plan?.revision??0)+1};s.notice='Your plan is chosen. Tell Mara and Sol so they know what to expect.';break;
 case 'INVITE':{if(!planning||!f.plan)break;const p=f.plan;if(event.who==='sol'&&atSol&&f.solChoice!=='none'){f.solInvitation=p.time;s.notice='Sol says: “Thanks for letting me know. I’ll bring '+(f.solChoice==='draft'?'my draft':'my story')+(p.time==='later'?' after the last boat returns.”':' at the usual time.”');}if(event.who==='mara'&&atMara&&conversationReady(c,'mara')){f.maraInvitation={time:p.time,reader:p.reader};s.notice=p.time==='usual'?'Mara says: “I’ll still be working. You can read my story for me. Please bring me one of Grandma’s stories.”':p.reader==='mara'?'Mara says: “Yes. I’ll come over and read it once I’ve helped the passengers off.”':'Mara says: “I’d like to listen while you read it. I’ll join you after the passengers leave.”';if(p.reader==='pip'&&c.page==='mara')return 'page';}break;}
 case 'BEGIN_GATHERING':if(!planning||!atGrandma)break;{const problems=planProblems(c);if(problems.length){s.notice=problems[0]!;break;}f.phase='arriving';s.panel=null;return connectedGathering(c)?arrivalNext(c):'arrival';}
 case 'NEXT_STORY':if(!atGrandma||!['welcome','mara','sol','grandma','closing'].includes(f.phase))break;
  s.notice='';if(f.phase==='welcome')f.phase='mara';
  else if(f.phase==='mara'){if(c.mara.sharedAt!=='gathering'){s.notice='Share The Torn Wing with the people here before inviting Sol to tell his story.';break;}f.records.mara=f.maraPicture;f.phase='sol';}
  else if(f.phase==='sol'){if(f.solChoice==='prepared'){f.solOutcome='prepared';f.records.sol=f.solEnding!.scene;f.phase='grandma';}else f.phase='discussion';}
  else if(f.phase==='grandma'){f.records.grandma=true;f.phase='moment';}
  else {f.phase='closed';if(f.plan?.time==='later')f.closingDone=true;}
  s.panel='gathering';break;
 case 'ASK_SOL':if(f.phase!=='discussion'||!atGrandma)break;if(!f.questions.includes(event.question))f.questions.push(event.question);s.notice=event.question==='bread'?'Sol says: “Yes. The flour stayed dry, and she baked the bread that day.”':'Sol says: “Later, she came to my workshop with a loaf of bread. She brought it to thank me.”';break;
 case 'ADD_ENDING':if(f.phase!=='discussion'||!atGrandma||!f.questions.includes(event.scene))break;f.solEnding={text:preparedEndings[event.scene],scene:event.scene,origin:'prepared',revision:f.solDraft.revision};f.solOutcome='developed';f.records.sol=event.scene;f.phase='grandma';s.notice="Sol says: “That's what I'd like to say. I'll add it to the page.”";break;
 case 'KEEP_DRAFT':if(f.phase!=='discussion'||!atGrandma)break;f.solOutcome='draft';f.records.sol='draft';f.phase='grandma';s.notice=f.questions.length?'Sol says: “That gives me something to add when I work on the ending. Thank you for listening.”':'Sol says: “Thank you for listening. I’ll keep working on the ending.”';break;
 case 'MARA_PICTURE':if(!f.records.mara||f.ending)break;f.maraPicture=event.picture;if(f.records.mara)f.records.mara=event.picture;break;
 case 'MOMENT':if(f.phase!=='moment'||!atGrandma)break;if(connectedGathering(c)){if(c.gathering.grandmaPerformed&&c.bloomed)return 'keepMemory';break;}s.notice='';f.records.pip=event.moment;f.phase='closing';s.panel='gathering';break;
 case 'TAKE_COPY':if(!atGrandma||f.phase!=='closed'||f.plan?.time!=='usual'||f.grandmaCopy!=='none')break;return 'copy';
 case 'DELIVER_COPY':if(!atMara||f.grandmaCopy!=='pip'||f.phase!=='closed')break;return 'delivery';
 case 'FINISH':if(f.phase!=='closed'||!f.closingDone||!f.solOutcome||!f.records.pip)break;{const branch=f.plan?.time==='usual'?'absent':f.plan?.reader==='mara'?'mara':'listener';f.ending??={mara:branch,sol:f.solOutcome,paragraphs:[endingLines.opening,endingLines[branch],endingLines[f.solOutcome],endingLines[branch==='absent'?'delivered':'together']]};s.notice='';s.panel='studio';break;}
 case 'PRESENT':if(!f.ending)break;f.presentation={...f.presentation,page:Math.max(0,Math.min(3,Math.floor(event.page))),finished:f.presentation.finished||!!event.finished,...(event.finished?{inProgress:false}:{})};break;
 case 'ANSWER':if(event.activity.length<80)f.answers[event.activity]=event.text;break;
 }
 return null;
}
export function validStory(value:unknown):value is StoryState{
 if(!value||typeof value!=='object')return false;const f=value as StoryState;
 const choices=(v:unknown,list:unknown[])=>list.includes(v),bool=(v:unknown)=>typeof v==='boolean',text=(v:unknown)=>typeof v==='string'&&v.length<=100000;
 const contribution=(e:Contribution|null)=>e===null||!!e&&text(e.text)&&!!e.text.trim()&&choices(e.scene,['bread','thanks','both'])&&choices(e.origin,['child','prepared'])&&Number.isSafeInteger(e.revision)&&e.revision>=0&&(e.origin==='child'||e.scene!=='both'&&e.text===preparedEndings[e.scene]);
 if(!choices(f.maraPicture,['promise','repair'])||!f.records||!f.presentation)return false;
 if(f.maraMessage!==undefined){const m=f.maraMessage;if(f.maraReported&&(!m?.confirmed||!m.delivered||m.delivered.mode!==m.mode||m.delivered.text!==m.text))return false;if(!m||!choices(m.mode,['prepared','own'])||!text(m.text)||!bool(m.confirmed)||m.confirmed&&!m.text.trim()||m.mode==='prepared'&&(m.text!==preparedMaraMessage||!m.confirmed)||m.delivered!==null&&(!m.delivered||!f.maraReported||!choices(m.delivered.mode,['prepared','own'])||!text(m.delivered.text)||!m.delivered.text.trim()||m.delivered.mode==='prepared'&&m.delivered.text!==preparedMaraMessage))return false;}
 if(!choices(f.timeAgreed,[null,'usual','later'])||f.plan&&f.timeAgreed!==f.plan.time)return false;
 if(f.phase!=='planning'&&(!f.plan||f.solInvitation!==f.plan.time||f.maraInvitation?.time!==f.plan.time||f.maraInvitation?.reader!==f.plan.reader))return false;
 if(f.grandmaCopy!=='none'&&(f.phase!=='closed'||f.plan?.time!=='usual'))return false;
 if(f.closingDone&&(f.phase!=='closed'||f.plan?.time==='usual'&&f.grandmaCopy!=='mara'))return false;
 if(['grandma','moment','closing','closed'].includes(f.phase)&&(!f.solOutcome||!f.records.mara||!f.records.sol))return false;
 if(['moment','closing','closed'].includes(f.phase)&&!f.records.grandma)return false;
 if(['closing','closed'].includes(f.phase)&&!f.records.pip)return false;
 if(f.solOutcome==='draft'&&f.records.sol!=='draft'||f.solOutcome&&f.solOutcome!=='draft'&&(!f.solEnding||f.records.sol!==f.solEnding.scene))return false;
 if(f.ending&&(f.ending.mara!==(f.plan?.time==='usual'?'absent':f.plan?.reader==='mara'?'mara':'listener')||f.ending.paragraphs.length!==4))return false;
 if(f.presentation.inProgress!==undefined&&typeof f.presentation.inProgress!=='boolean')return false;
 if(!f.ending&&(f.presentation.page!==0||f.presentation.finished||f.presentation.inProgress))return false;
 return [f.metSol,f.laterKnown,f.solReported,f.maraReported,f.closingDone,f.records?.grandma,f.presentation?.finished].every(bool)&&choices(f.solChoice,['none','prepared','draft'])&&!!f.solDraft&&text(f.solDraft.text)&&Number.isSafeInteger(f.solDraft.revision)&&contribution(f.solEnding)&&(f.solChoice!=='prepared'||!!f.solEnding)&&Array.isArray(f.questions)&&f.questions.length<=2&&new Set(f.questions).size===f.questions.length&&f.questions.every(q=>choices(q,['bread','thanks']))&&(f.plan===null||!!f.plan&&choices(f.plan.time,['usual','later'])&&choices(f.plan.reader,['pip','mara'])&&!(f.plan.time==='usual'&&f.plan.reader==='mara')&&Number.isSafeInteger(f.plan.revision))&&choices(f.solInvitation,[null,'usual','later'])&&(f.maraInvitation===null||!!f.maraInvitation&&choices(f.maraInvitation.time,['usual','later'])&&choices(f.maraInvitation.reader,['pip','mara']))&&choices(f.phase,['planning','arriving','welcome','mara','sol','discussion','grandma','moment','closing','closed'])&&choices(f.solOutcome,[null,'prepared','developed','draft'])&&choices(f.records.mara,[null,'promise','repair'])&&choices(f.records.sol,[null,'bread','thanks','both','draft'])&&choices(f.records.pip,[null,'planting','gathering'])&&choices(f.grandmaCopy,['none','pip','mara'])&&Number.isSafeInteger(f.bridgeFailures)&&f.bridgeFailures>=0&&Number.isInteger(f.presentation.page)&&f.presentation.page>=0&&f.presentation.page<=3&&!!f.answers&&typeof f.answers==='object'&&!Array.isArray(f.answers)&&Object.entries(f.answers).every(([key,v])=>key.length<80&&text(v))&&(f.phase==='planning'||!!f.plan&&f.solReported&&f.maraReported&&f.solChoice!=='none')&&(f.ending===null||f.phase==='closed'&&f.closingDone&&!!f.records.pip&&!!f.solOutcome&&!!f.ending&&choices(f.ending.mara,['mara','listener','absent'])&&f.ending.sol===f.solOutcome&&Array.isArray(f.ending.paragraphs)&&f.ending.paragraphs.join('\n')===[endingLines.opening,endingLines[f.ending.mara],endingLines[f.ending.sol],endingLines[f.ending.mara==='absent'?'delivered':'together']].join('\n'));
}
