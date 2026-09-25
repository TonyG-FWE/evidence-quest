import {bridgeSurfaces,sectionSecured,unstableSectionAt,placementChanged,firstPart,secondPart,sectionsMeet,bridgeStatus,ensureConstruction,syncConstruction,clearFailedConstruction,legacyConstruction,type BridgePart} from './bridgeConstruction.js';
import {anchors,navigable,findRoute,riverHalfWidth,WALK_SPEED,WORLD,BRIDGE_GEOMETRY} from './worldLayout.js';
import {advanceGrandma} from './grandmaTravel.js';
import {pipLocomotion} from './locomotion.js';
import {applyHand,isHandCommand,freshHands,type HandsProgress,type HandGesture,type HandCommand} from './hands.js';
import {freshJournal,updateJournal,type JournalState,type JournalCommand} from './journal.js';
import {applyCard,canUseWorkbench,type CardGesture,type WorkbenchCommand} from './workbench.js';
import {WORKBENCH_APPROACH} from './worldLayout.js';
import {syncPlayback,controlPlayback,tickPlayback,type PlaybackState,type PlaybackCommand} from './playback.js';
import {freshConversations,rememberConversation,moveConversation,conversationReady,type Conversations} from './conversation.js';
import {freshGathering,connectedGathering,gatheringAction,gatheringDurations,gatheringActionText,settleGathering,startTurn,type GatheringState,type GatheringAction} from './gathering.js';
import {lanternIds,lanternRecord,type LanternId} from './lanterns.js';
import {freshBakery,applyBakery,settleBakery,bakeryReady,bakeryAction,bakeryDurations,bakeryActionText,bakeryInstruction,nearBakery,near as bakeryNear,BAKERY_SOL,TILE_SHELF,WORKSHOP_DOOR,THANK_RINA,type BakeryState,type BakeryAction,type BakeryStep} from './bakery.js';
import {SerializedQueue} from '../core/serialized.js';
import {localReview} from './assets/profile.js';
import type {SpeechRequest} from './voiceTypes.js';
import {sourcesFor,sourceIdsFor,sourcePrefix,preparedEndingsFor,endingLinesFor} from './content.js';
import type {NarrativeEdition} from './narrativeEdition.js';
import {freshStory,applyStory,SOL,solPosition,maraAtGarden,GATHER_MARA,type StoryState,type StoryEvent} from './chapter.js';
import {enterReader,leaveReader,leaveActivity,rememberView,resetViews,type ReturnFrame,type FocusAnchor,type WorldActivity} from './interaction.js';
import {freshMara,nearBird,nearOffice,birdWalkable,birdInstruction,BIRD_BOY,shareMara,type MaraState} from './mara.js';
import {freshRiver,collapseResult,snapSections,sectionAtEnd,anchoredSection,atMooring,boatWater,guideBoat,RIVER_ROCKS,ropeCount,LAUNCH,LANDING,type RiverState} from './river.js';
export type Point={x:number;z:number};
export type Section=Point&{rotation:number};
export type SourceId='bakery'|'opening'|'mara'|'sections'|'story'|'report'|'sol'|'later'|'empty'|'picnic'|'duet'|'finale'|'breadEnding'|'thanksEnding'|'notice';
export type Panel=SourceId|'journal'|'storyboard'|'festival'|'endingWords'|'birdTalk'|'grandma'|'backpack'|'help'|'pause'|'complete'|'writing'|'planner'|'gathering'|'lanterns'|'studio'|null;
export interface Chapter {
 narrativeEdition?:NarrativeEdition;
 reviewLayoutRevision?:1;
 layoutVersion:2;
 hands:HandsProgress;journal:JournalState;
 conversations?:Conversations;
 version:3;content:'garden-chapter-3';runId:string;revision:number;started:boolean;story:StoryState;river:RiverState;mara:MaraState;bakery:BakeryState;gathering:GatheringState;
 pip:Point;sections:{a:Section;b:Section};ferrySide:'west'|'east';joined:boolean;west:boolean;east:boolean;crossed:boolean;
 seed:'pip'|'boat'|'grandma'|'bed'|'soil';bloomed:boolean;maraHeard:boolean;page:'mara'|'pip'|'grandma';grandmaHeard:boolean;
 exposed:string[];assistance:string[];history:string[];reading:Record<string,number>;reducedMotion:boolean;largeText:boolean;largestText?:boolean;roomierText?:boolean;
}
export type Action={id:string;moment?:'planting'|'gathering';placement?:'gap'|'beside';kind:GatheringAction|BakeryAction|'keepMemory'|'birdIntro'|'dockService'|'maraTell'|'birdConsent'|'tapePickup'|'birdDeparture'|'maraReturn'|'ferry'|'loadSeed'|'unloadSeed'|'receiveSeed'|'ropes'|'plant'|'bloom'|'page'|'report'|'collapse'|'arrival'|'copy'|'delivery';elapsed:number;duration:number;from:Point;hasSeed:boolean};
export interface GardenState {
 bridgeWork?:{kind:'post'|'tie';object:string;point:Point;elapsed:number;duration:number};
 boatSpeed?:number;
 cardGesture:CardGesture|null;
 gesture:HandGesture|null;
 playback:PlaybackState|null;
 readingInspection?:{text:string[];speech?:SpeechRequest[];depth:number;preview:GardenState['preview'];bakeryPreview:GardenState['bakeryPreview'];birdPreview:NonNullable<Chapter['mara']['scene']>['preview']};
 bakeryPreview:'gap'|'beside'|null;maraTarget:Point|null;maraParent:ReturnFrame|null;
 panelTrail:ReturnFrame[];restoreFocus:FocusAnchor|null;activity:WorldActivity|null;actionParent:ReturnFrame|null;
 viewDrafts:{memoryMoment:'planting'|'gathering';endingScene:import('./chapter.js').EndingScene;plan:{time:import('./chapter.js').GatheringTime;reader:import('./chapter.js').Reader}|null;disclosures:Record<string,boolean>};
 chapter:Chapter;ready:boolean;mode:'walk'|'arrange'|'boat'|'mara-story'|'bakery-repair'|'workbench';boatTarget:Point|null;panel:Panel;selection:'a'|'b';preview:{a:Section;b:Section}|null;
 route:Point[];keys:string[];action:Action|null;pendingBloom:boolean;notice:string;requested:string|null;
 save:'loading'|'saved'|'saving'|'failed'|'conflict'|'damaged'|'version';savedRevision:number;background:boolean;viewLost:boolean;
}
export type Command=PlaybackCommand|HandCommand|WorkbenchCommand|{type:'JOURNAL';command:JournalCommand}
 |{type:'INSPECT_TEXT';text:string[];speech?:SpeechRequest[];focus?:FocusAnchor|null}
 |{type:'CONVERSATION';direction:'next'|'previous'}
 |{type:'BAKERY_STEP';step:BakeryStep}|{type:'TILE_PREVIEW';position:'gap'|'beside'}
 |{type:'MARA_GO';point:Point}|{type:'MARA_STEP';step:'ASK'|'TAPE'|'ALIGN'|'PLACE'|'DEPART'|'RETURN'}|{type:'TAPE_PREVIEW';position:'beside'|'across'}
 |{type:'BOOT';chapter?:Chapter;failure?:GardenState['save'];pendingWrite?:boolean}
 |{type:'BEGIN'}|{type:'START_PLAY'}|{type:'OPEN';panel:Panel;focus?:FocusAnchor|null}|{type:'CLOSE'}
 |{type:'REHEARSE';contribution:import('./chapter.js').Contribution;focus?:FocusAnchor|null}
 |{type:'PREVIEW_PLAN';time:import('./chapter.js').GatheringTime;reader:import('./chapter.js').Reader;focus?:FocusAnchor|null}
 |{type:'ACTIVITY_BACK'}|{type:'ACTIVITY_ACCEPT'}
 |{type:'INSPECT_LANTERN';lantern:LanternId;focus?:FocusAnchor|null}
 |{type:'START_PRESENTATION';mode:'watch'|'narrate';focus?:FocusAnchor|null}
 |{type:'PRESENTATION';step:'previous'|'next'|'finish'}
 |{type:'CHOOSE_ENDING_SCENE';scene:import('./chapter.js').EndingScene}
 |{type:'CHOOSE_MEMORY';moment:'planting'|'gathering'}
 |{type:'DRAFT_PLAN';time:import('./chapter.js').GatheringTime;reader:import('./chapter.js').Reader}
 |{type:'DISCLOSURE';id:string;open:boolean}
 |{type:'GO';point:Point;target?:string}|{type:'KEY';key:string;down:boolean}|{type:'TICK';ms:number}
 |{type:'TALK';who:'mara'|'grandma'|'sol'|'rina';focus?:FocusAnchor|null}|{type:'TAKE_PAGE'}|{type:'REPORT'}|{type:'NOTICE';text:string}|{type:'STORY';event:StoryEvent;focus?:FocusAnchor|null}|{type:'TRY_CROSS'}
 |{type:'ARRANGE'}|{type:'BACK'}|{type:'SELECT';section:'a'|'b'}
 |{type:'PREVIEW';point:Point}|{type:'PLACE'}|{type:'CANCEL'}|{type:'NUDGE';x:number;z:number}
 |{type:'ROTATE';direction:1|-1}|{type:'JOIN'}|{type:'FASTEN';end:'west'|'east';atZ?:number}|{type:'ADJUST'}
 |{type:'FERRY'}|{type:'PLANT'}|{type:'BLOOM'}|{type:'INTERRUPT';background?:boolean}|{type:'FOREGROUND'}
 |{type:'COLLECT_ROPES'}|{type:'LAUNCH_BOAT'}|{type:'STEER';point:Point}|{type:'STEER_STOP'}|{type:'DOCK_SEED'}|{type:'UNLOAD_SEED'}
 |{type:'POST_PREVIEW';site:'wide'|'narrow';side:'west'|'east'}
 |{type:'EXPOSE';id:string}|{type:'EXPOSE_WORDS';ids:string[]}|{type:'HELP_USED';id:string}|{type:'READ_POSITION';id:string;position:number}
 |{type:'SETTING';key:'largeText'|'largestText'|'roomierText'|'reducedMotion';value:boolean}
 |{type:'SAVE_STATUS';status:GardenState['save'];revision?:number}|{type:'VIEW_LOST';lost:boolean}|{type:'NEW';runId:string};
export const MARA=anchors.dock.person,GRANDMA=anchors.garden.person,PLANT=anchors.garden.plant,CROSSING=anchors.crossing.approach;
export const FERRY_WEST={x:-1.4,z:.8},FERRY_EAST={x:1.4,z:.8};
export const STAGED_SECTIONS={a:{x:-3.6,z:1,rotation:0},b:{x:-3.6,z:2.5,rotation:0}};
export const ferryPosition=(c:Chapter)=>c.river.boat.position;
export function blocksFerryLane(p:Section){const x=Math.abs(Math.cos(p.rotation))*BRIDGE_GEOMETRY.envelopeHalfLength+Math.abs(Math.sin(p.rotation))*BRIDGE_GEOMETRY.envelopeHalfWidth,z=Math.abs(Math.cos(p.rotation))*BRIDGE_GEOMETRY.envelopeHalfWidth+Math.abs(Math.sin(p.rotation))*BRIDGE_GEOMETRY.envelopeHalfLength;return Math.abs(p.x)<1.74+x&&Math.abs(p.z-FERRY_WEST.z)<.7+z;}
export const GRANDMA_APPROACH=anchors.garden.approach;
export const TREE_POSITIONS=WORLD.trees.map(tree=>[tree.x,tree.z,tree.scale] as const);
export const GAP="This end doesn't reach the bank yet. Move the sections so the crossing reaches both sides.";
export const LOOSE='The deck reaches both banks, but an end is loose. Pip can try it, or you can fasten both ends first.';
export const distance=(a:Point,b:Point)=>Math.hypot(a.x-b.x,a.z-b.z);
export function freshChapter(runId:string):Chapter{return {narrativeEdition:'literary-20260916',...(localReview?{reviewLayoutRevision:1 as const}:{}),hands:freshHands(),journal:freshJournal(),layoutVersion:2,version:3,content:'garden-chapter-3',story:freshStory(),river:freshRiver(),mara:freshMara(),bakery:freshBakery(),gathering:freshGathering(),conversations:freshConversations(),runId,revision:0,started:false,pip:{x:-3.5,z:-1.8},sections:structuredClone(STAGED_SECTIONS),ferrySide:'west',joined:false,west:false,east:false,crossed:false,seed:'pip',bloomed:false,maraHeard:false,page:'mara',grandmaHeard:false,exposed:[],assistance:[],history:[],reading:{},reducedMotion:false,largeText:false};}
export function initialGarden(runId:string):GardenState{return {cardGesture:null,gesture:null,playback:null,bakeryPreview:null,maraTarget:null,maraParent:null,chapter:freshChapter(runId),ready:false,mode:'walk',boatTarget:null,panel:null,panelTrail:[],restoreFocus:null,activity:null,actionParent:null,viewDrafts:{memoryMoment:'planting',endingScene:'bread',plan:null,disclosures:{}},selection:'a',preview:null,route:[],keys:[],action:null,pendingBloom:false,notice:'',requested:null,save:'loading',savedRevision:0,background:false,viewLost:false};}
export const riverHalf=riverHalfWidth;
export function bridgeCenter(c:Chapter):Point{return {x:(c.sections.a.x+c.sections.b.x)/2,z:(c.sections.a.z+c.sections.b.z)/2};}
export function reaches(c:Chapter,end:'west'|'east'){
 if(!c.joined)return false;const p=bridgeCenter(c),edge=p.x+(end==='west'?-BRIDGE_GEOMETRY.length:BRIDGE_GEOMETRY.length),bank=(end==='west'?-1:1)*riverHalf(p.z);
 return Math.min(Math.abs(p.z-3),Math.abs(p.z+2))<=.22&&Math.abs(Math.sin(c.sections.a.rotation))<.01&&(end==='west'?edge<=bank:edge>=bank)&&Math.abs(edge-bank)<=.45;
}
export const bridgeReady=(c:Chapter)=>sectionsMeet(c)&&sectionSecured(c,firstPart(c))&&sectionSecured(c,secondPart(c));
export const encounterDone=(c:Chapter)=>!!c.story.ending;
export const bridgeAttemptable=(c:Chapter)=>c.joined&&reaches(c,'west')&&reaches(c,'east');
export const walkable=(c:Chapter,p:Point)=>navigable(p,bridgeSurfaces(c));
export const routeTo=(c:Chapter,to:Point)=>findRoute(c.pip,to,bridgeSurfaces(c));
function settled(s:GardenState,_continueGrowth:boolean,id:string){
 const a=s.action;if(!a)return;const c=s.chapter;let introduction=false;
 if(!c.history.includes(a.id)){
  c.history.push(a.id);
  if(bakeryAction(a.kind))settleBakery(s,a);if(gatheringAction(a.kind))settleGathering(s,a.kind);
  if(a.kind==='ferry'){c.history.push('F');s.notice='The empty seed boat stays at its mooring. The seed remains where you left it.';}
  if(a.kind==='ropes'){const count=ropeCount(c,'box');c.river.ropesCollected=true;for(const end of ['west','east'] as const)if(c.river.ropeLocations[end]==='box')c.river.ropeLocations[end]='pip';s.notice=count===1?'Pip takes the remaining repair rope. The other rope stays where you left it.':'Pip takes Grandma’s two repair ropes.';}
  if(a.kind==='loadSeed'){c.seed='boat';c.river.boat.phase='steering';c.river.collection={phase:'outbound',distance:c.river.collection?.distance??0};s.mode='boat';s.notice='The seed is aboard. Steer through the channel to Grandma’s blue landing.';}
  if(a.kind==='unloadSeed'){c.seed='pip';c.river.boat={...c.river.boat,phase:'moored',position:{...LAUNCH}};if(c.river.collection)c.river.collection.phase='return';s.mode='walk';s.notice='Pip takes the same seed out of the boat. You can carry it across the bridge instead.';}
  if(a.kind==='receiveSeed'){c.seed='grandma';c.river.boat={...c.river.boat,phase:'moored',position:{...LANDING}};c.ferrySide='east';if(c.river.collection)c.river.collection.phase='return';c.history.push('F');s.mode='walk';s.notice='Grandma holds the seed and walks back to the planting spot. Pip can keep exploring.';}
  if(a.kind==='plant'){c.river.soilPrepared=true;c.seed='soil';c.history.push('P');s.pendingBloom=true;s.notice='The seed is planted. Its roots can reach the soil now.';}
  if(a.kind==='bloom'){c.bloomed=true;c.history.push('L');s.pendingBloom=false;s.notice='Pip kept his promise. The new lantern-flower is growing.';}
  if(a.kind==='dockService'){c.mara.service='served';s.notice='These passengers are safely ashore. Mara stays on duty: the last boat still has to return later.';}
  if(a.kind==='maraTell'){const origin=c.story.phase==='mara'?'gathering':'early';if(c.mara.sharedAt!=='none')shareMara(s,origin);else{introduction=true;c.mara.scene={origin,introduced:false,stage:'ask',position:{...BIRD_BOY},tape:'office',aligned:false,strip:'none',preview:null};s.mode='mara-story';s.panel=null;s.notice='An earlier boat arrival · You guide Mara. The boy holds the bird his sister made for his grandmother.';}}
  if(a.kind==='birdIntro'){c.mara.scene!.introduced=true;s.notice='Mara reached toward the bird, but the boy pulled it closer. Ask him whether he would like help.';}
  if(a.kind==='birdConsent'){c.mara.scene!.stage='fetch';s.notice='The boy hesitates, then holds out his bird. He has accepted Mara’s help. Mara needs tape from the dock office.';}
  if(a.kind==='tapePickup'){c.mara.scene!.tape='mara';s.notice='Mara takes tape from her dock office. Bring it back to the boy.';}
  if(a.kind==='birdDeparture'){c.mara.scene!.stage='done';c.mara.scene!.tape='dock';c.mara.participated=true;s.notice='The boy holds the repaired original bird in both hands. “Now I can tell my grandmother how we fixed it,” he says.';}
  if(a.kind==='maraReturn'){const origin=c.mara.scene!.origin;shareMara(s,origin);if(origin==='gathering')startTurn(s,'mara');}
  if(a.kind==='page'){c.mara.permission=true;c.page='pip';s.notice='Mara says: “Take this copy with you. Tell Grandma I still want to hear her stories, too.”';}
  if(a.kind==='report'){c.page='grandma';c.history.push('MARA_PAGE_DELIVERED');s.panel='report';s.notice="Grandma has Mara's page. Tell her what Mara said.";}
  if(a.kind==='collapse'){const failed=(['a','b'] as BridgePart[]).filter(part=>!sectionSecured(c,part)),result=collapseResult(c);c.sections=result.sections;c.joined=false;c.pip=result.pip;clearFailedConstruction(c,failed);c.story.bridgeFailures++;s.mode='walk';s.notice='The unsecured section slips. Pip steps back onto a stable surface. Secured work stays in place; recover the same materials and finish the posts and ropes.';}
  if(a.kind==='arrival'){c.story.phase='welcome';s.panel='gathering';s.notice=c.story.plan?.time==='later'?'The passengers are safely ashore. Mara and Sol have arrived at the garden.':'Sol has arrived. Mara is still working at the dock.';}
  if(a.kind==='copy'){c.story.grandmaCopy='pip';s.notice='Grandma gives Pip a copy of The Empty Bench to take to Mara.';}
  if(a.kind==='delivery'){c.story.grandmaCopy='mara';if(connectedGathering(c)){s.actionParent=null;startTurn(s,'receipt');}else{c.story.closingDone=true;s.notice='Mara says: “Thank you. I’ll read it after the last boat returns. It’s good to have a story from her again.”';}}
  if(a.kind==='keepMemory'&&a.moment){c.story.records.pip=a.moment;c.story.phase='closing';c.history.push('PIP_MEMORY_PLACED');s.notice='Pip’s flower keeps '+(a.moment==='planting'?'the memory of planting the seed with Grandma.':'the memory of the people sharing stories today.');}
 }s.action=null;
 if(a.kind==='takeLoaf'&&s.actionParent?.panel==='bakery'){s.actionParent=null;leaveReader(s);s.restoreFocus=null;}
 if(!s.panel&&!s.actionParent&&a.kind==='thankSol')enterReader(s,'bakery');
 if(s.actionParent){const parent=s.actionParent;s.actionParent=null;if(!s.panel){s.panel=parent.panel;s.mode=parent.mode;}else if(s.panel!==parent.panel&&parent.panel)s.panelTrail.push(parent);s.restoreFocus=parent.focus;}
 if(introduction&&c.mara.scene){if(c.reducedMotion){c.mara.scene.introduced=true;s.notice='Mara reached toward the bird, but the boy pulled it closer. Ask him whether he would like help.';}else s.action={id:id+'-bird-intro',kind:'birdIntro',elapsed:0,duration:2200,from:{...BIRD_BOY},hasSeed:false};}
 // Covering commits planting only. Growth begins with the player's explicit BLOOM command.
 // The rooted boundary is durable in chapter.seed/bloomed, including after interrupted gestures.
}
function stop(s:GardenState,id:string){s.boatSpeed=0;delete s.bridgeWork;s.cardGesture=null;s.gesture=null;s.route=[];s.keys=[];s.boatTarget=null;s.maraTarget=null;s.bakeryPreview=null;if(s.chapter.mara.scene)s.chapter.mara.scene.preview=null;s.preview=null;settled(s,false,id);}
function start(s:GardenState,kind:Action['kind'],id:string,placement?:'gap'|'beside',moment?:'planting'|'gathering'){
 if(s.action)return;stop(s,id);s.action={id,kind,...(placement?{placement}:{}),...(moment?{moment}:{}),elapsed:0,duration:gatheringAction(kind)?gatheringDurations[kind]:bakeryAction(kind)?bakeryDurations[kind]:kind==='keepMemory'?1800:kind==='dockService'?7000:kind==='maraTell'||kind==='maraReturn'?2000:kind==='birdDeparture'?2500:kind==='birdConsent'?1500:kind==='arrival'?10000:kind==='collapse'?3000:kind==='receiveSeed'?1100:kind==='ferry'?1200:kind==='plant'?3000:kind==='bloom'?1800:1000,from:{...(kind==='collapse'||kind==='keepMemory'||bakeryAction(kind)?s.chapter.pip:ferryPosition(s.chapter))},hasSeed:kind==='loadSeed'||kind==='receiveSeed'||kind==='unloadSeed'};
 if(s.panel==='birdTalk')leaveReader(s);
 if(s.panel){if(!['maraTell','birdConsent','tapePickup','birdDeparture','maraReturn'].includes(kind))s.actionParent=rememberView(s);s.panel=null;}
 s.notice=kind==='ferry'?(s.action.hasSeed?'The seed is travelling in the seed boat. Pip waits on the bank.':'The empty seed boat bobs at its mooring.'):kind==='plant'?'Pip and Grandma plant the seed together.':kind==='page'?'Mara gives Pip a copy of her story.':kind==='report'?"Pip gives Grandma Mara's page.":'The lantern-flower opens.';
 if(kind==='dockService')s.notice='An earlier service today: the operator brings the boat in. Mara helps these passengers ashore, then stays on duty.';
 if(kind==='maraTell')s.notice=s.chapter.story.phase==='mara'&&s.chapter.story.plan?.reader==='mara'?'Mara opens The Torn Wing for the people gathered in the garden.':'Pip shares Mara’s page with the people here in the garden.';
 if(kind==='birdConsent')s.notice='Mara asks, “Would you like some help?” The boy hesitates, then holds out the bird.';
 if(kind==='tapePickup')s.notice='Mara picks up the roll of tape.';
 if(kind==='birdDeparture')s.notice='The boy steps onto the dock with the same repaired bird. The tape stays here.';
 if(kind==='maraReturn')s.notice='The earlier story ends. We return to the teller and listeners in Grandma’s garden.';
 if(kind==='collapse')s.notice='The loose end slips! Pip steps back while the bridge comes apart.';
 if(kind==='loadSeed')s.notice='Pip puts the seed in Grandma’s small boat.';
 if(kind==='unloadSeed')s.notice='Pip takes the seed back into his backpack.';
 if(kind==='receiveSeed')s.notice='Grandma collects the seed at her landing and carries it to the planting place.';
 if(kind==='ropes')s.notice=ropeCount(s.chapter,'box')===1?'Pip takes the remaining repair rope from Grandma’s marked box.':'Pip takes the two repair ropes from Grandma’s marked box.';
 if(kind==='arrival')s.notice=s.chapter.story.plan?.time==='later'?'The last passenger boat is returning. Mara will help everyone ashore before joining the gathering.':'Sol is bringing his story to the garden. Mara stays at work.';
 if(kind==='copy')s.notice='Grandma hands her story to Pip.';
 if(kind==='delivery')s.notice='Pip gives Grandma’s story to Mara.';
 if(kind==='keepMemory')s.notice='Pip places his chosen memory in the flower he grew with Grandma.';
 if(bakeryAction(kind))s.notice=bakeryActionText[kind];if(gatheringAction(kind))s.notice=gatheringActionText[kind];
 if(s.chapter.reducedMotion)settled(s,true,id);
}
function previewAt(s:GardenState,p:Point,magnet=true){
 if(s.mode!=='arrange'||s.chapter.crossed||s.action)return;const c=s.chapter;
 if(sectionSecured(c,s.selection)){s.notice='That section is held by a rope. Release its attachment before moving it.';return;}
 s.preview=snapSections(c,s.selection,p,magnet);
}
function commitPlacement(s:GardenState){
 if(!s.preview)return;const sections=s.preview;
 if(Object.values(sections).some(b=>!Number.isFinite(b.x)||!Number.isFinite(b.z)||Math.abs(b.x)>5||b.z< -3.5||b.z>4.2)){s.notice='Keep the bridge pieces beside the river.';s.preview=null;return;}
 if(Object.values(sections).some(blocksFerryLane)){s.notice='Leave this stretch of water clear for the seed boat. Place the bridge sections farther along the river.';s.preview=null;return;}
 const old=s.chapter.sections;if((['a','b'] as const).some(part=>sectionSecured(s.chapter,part)&&(distance(old[part],sections[part])>.001||old[part].rotation!==sections[part].rotation))){s.preview=null;s.notice='The secured section stays in place.';return;}s.chapter.sections=sections;if(!sectionsMeet(s.chapter))s.chapter.joined=false;placementChanged(s.chapter,old);s.preview=null;s.notice=bridgeStatus(s.chapter);
}
export function gardenReduce(state:GardenState,command:Command,id:string):GardenState{
 // A conflicting writer owns the durable checkpoint. Keep reading/recovery
 // available, but do not allow new unsaved actions or edits to accumulate.
 if(state.save==='conflict'&&!['BOOT','NEW','SAVE_STATUS','OPEN','INSPECT_TEXT','CLOSE','INTERRUPT','FOREGROUND','VIEW_LOST','NOTICE','DISCLOSURE','READ_POSITION','HELP_USED','EXPOSE_WORDS','EXPOSE'].includes(command.type))return state;
 if(isHandCommand(command)){
  const next=structuredClone(state),actions=applyHand(next,command);let result=next;
  for(const action of actions)result=gardenReduce(result,action,id);
  if((command.type==='HAND_RELEASE'||command.type==='HAND_CANCEL')&&state.gesture&&(state.gesture.object.startsWith('section:')||state.gesture.object.startsWith('post:')||state.gesture.object.startsWith('rope:'))){result.mode='walk';result.preview=null;result.route=[];result.keys=[];}
  if(JSON.stringify(result.chapter)!==JSON.stringify(state.chapter))result.chapter.revision=state.chapter.revision+1;
  return result;
 }
 if(state.gesture&&['SELECT','PREVIEW','POST_PREVIEW','PLACE','NUDGE','ROTATE','JOIN','FASTEN','ADJUST','TILE_PREVIEW','BAKERY_STEP','TAPE_PREVIEW','MARA_STEP','FERRY','PLANT','COLLECT_ROPES'].includes(command.type))return state;
 if(connectedGathering(state.chapter)&&state.chapter.story.phase==='arriving'&&['GO','KEY','TALK','ARRANGE','FERRY','PLANT','BLOOM','TAKE_PAGE','REPORT','BAKERY_STEP','TILE_PREVIEW'].includes(command.type))return state;
 if(state.chapter.gathering.turn&&!['JOURNAL','PLAYBACK','STORY','BOOT','OPEN','INSPECT_TEXT','CLOSE','TICK','INTERRUPT','FOREGROUND','SETTING','SAVE_STATUS','VIEW_LOST','NEW','READ_POSITION','HELP_USED','EXPOSE_WORDS','EXPOSE','NOTICE','DISCLOSURE'].includes(command.type))return state;
 if(state.mode==='bakery-repair'&&!['JOURNAL','BOOT','CANCEL','BAKERY_STEP','TILE_PREVIEW','TICK','OPEN','INSPECT_TEXT','CLOSE','INTERRUPT','FOREGROUND','SETTING','SAVE_STATUS','VIEW_LOST','NEW','READ_POSITION','HELP_USED','EXPOSE_WORDS','EXPOSE','NOTICE','DISCLOSURE'].includes(command.type))return state;
 if(state.mode==='mara-story'&&!['JOURNAL','BOOT','CANCEL','MARA_GO','MARA_STEP','TAPE_PREVIEW','KEY','TICK','OPEN','INSPECT_TEXT','CLOSE','INTERRUPT','FOREGROUND','SETTING','SAVE_STATUS','VIEW_LOST','NEW','READ_POSITION','HELP_USED','EXPOSE_WORDS','EXPOSE','NOTICE','DISCLOSURE'].includes(command.type))return state;
 if(state.action&&['COLLECT_ROPES','POST_PREVIEW','SELECT','PREVIEW','PLACE','NUDGE','ROTATE','JOIN','FASTEN','ADJUST'].includes(command.type))return state;
 if(state.chapter.seed==='boat'&&state.chapter.river.boat.phase!=='waiting'&&['GO','TALK','ARRANGE','TRY_CROSS','STORY','BAKERY_STEP','TILE_PREVIEW','FERRY','PLANT','BLOOM','TAKE_PAGE','REPORT','COLLECT_ROPES','BACK'].includes(command.type))return {...state,notice:'The seed is still aboard. Dock at Grandma’s landing, or return to the launch and unload before guiding Pip.'};
 if(state.activity&&!['PLAYBACK','BOOT','OPEN','INSPECT_TEXT','CLOSE','ACTIVITY_BACK','ACTIVITY_ACCEPT','PRESENTATION','INTERRUPT','FOREGROUND','TICK','SETTING','SAVE_STATUS','VIEW_LOST','NEW','READ_POSITION','HELP_USED','EXPOSE_WORDS','EXPOSE','NOTICE','DISCLOSURE'].includes(command.type))return state;
 if(!state.chapter.started&&['GO','KEY','TALK','TAKE_PAGE','REPORT','ARRANGE','FERRY','PLANT','BLOOM','STORY','TRY_CROSS'].includes(command.type))return state;
 const s=structuredClone(state),c=s.chapter,sources=sourcesFor(c),preparedEndings=preparedEndingsFor(c),endingLines=endingLinesFor(c),sourceIds=sourceIdsFor(c);let changed=true;
 switch(command.type){
 case 'WORKBENCH':if(canUseWorkbench(s)){stop(s,id);resetViews(s);s.panel=null;if(distance(c.pip,WORKBENCH_APPROACH)>.2){s.route=routeTo(c,WORKBENCH_APPROACH);s.mode='walk';s.requested='Sol’s workbench';s.notice='Pip walks to the outdoor worktable.';}else{s.mode='workbench';s.notice='Arrange pictures of moments you took part in. Any order is welcome; this never changes what happened.';}}break;
 case 'CARD_PICK':case 'CARD_MOVE':case 'CARD_PLACE':case 'CARD_CANCEL':applyCard(s,command);break;
 case 'JOURNAL':if(s.panel==='journal'||s.panel==='storyboard')c.journal=updateJournal(c.journal,command.command,c);break;
 case 'PLAYBACK':controlPlayback(s,command,id);break;
 case 'BOOT':s.boatSpeed=0;if(command.chapter)s.chapter=structuredClone(command.chapter);if(s.chapter.story.phase==='arriving'&&!connectedGathering(s.chapter)){s.chapter.story.phase='welcome';s.chapter.revision++;}if(!s.chapter.river.construction){s.chapter.river.construction=legacyConstruction(s.chapter);syncConstruction(s.chapter);s.chapter.revision++;}if(unstableSectionAt(s.chapter,s.chapter.pip)){const failed=(['a','b'] as BridgePart[]).filter(part=>!sectionSecured(s.chapter,part)),result=collapseResult(s.chapter);s.chapter.sections=result.sections;s.chapter.joined=false;s.chapter.pip=result.pip;clearFailedConstruction(s.chapter,failed);s.chapter.story.bridgeFailures++;s.chapter.revision++;}if(s.chapter.mara.scene?.preview){s.chapter.mara.scene.preview=null;s.chapter.revision++;}s.cardGesture=null;s.gesture=null;s.ready=true;s.save=command.failure??(command.pendingWrite?'saving':'saved');if(command.chapter&&s.chapter.revision!==command.chapter.revision)s.save='saving';s.savedRevision=s.save==='saving'?-1:s.chapter.revision;s.action=null;s.route=[];s.keys=[];s.boatTarget=null;s.preview=null;s.bakeryPreview=null;s.panel=null;s.mode=s.chapter.mara.scene?'mara-story':s.chapter.seed==='boat'&&s.chapter.river.boat.phase!=='waiting'?'boat':['gap','misplaced','delivered'].includes(s.chapter.bakery.stage)&&bakeryNear(s.chapter.pip,BAKERY_SOL)?'bakery-repair':'walk';s.maraTarget=null;s.maraParent=null;if(s.chapter.mara.scene)s.chapter.mara.scene.preview=null;s.pendingBloom=s.chapter.seed==='soil'&&!s.chapter.bloomed;if(s.chapter.mara.scene&&!s.chapter.mara.scene.introduced){s.action={id:id+'-bird-intro',kind:'birdIntro',elapsed:0,duration:s.chapter.reducedMotion?1:2200,from:{...BIRD_BOY},hasSeed:false};}break;
 case 'BEGIN':resetViews(s);c.started=true;s.panel='opening';s.notice='A promise to keep. A garden full of stories.';break;
 case 'START_PLAY':resetViews(s);s.panel=null;s.notice='Move Pip with the arrow keys or WASD. Talk to Mara at the dock.';break;
 case 'CONVERSATION':moveConversation(s,command.direction);break;
 case 'INSPECT_TEXT':if(s.panelTrail.length<20&&s.panel!=='help'&&!s.action&&!s.readingInspection&&command.text.length&&command.text.length<=200&&command.text.every(t=>typeof t==='string'&&t.length<=100000)){
   const speech=command.speech?.length===command.text.length&&command.speech.every((part,index)=>part.text===command.text[index])?command.speech:undefined;
   const inspection={text:command.text,...(speech?{speech}:{}),depth:s.panelTrail.length+1,preview:s.preview,bakeryPreview:s.bakeryPreview,birdPreview:c.mara.scene?.preview??null};
   if(s.gesture){s.gesture=null;s.preview=null;s.bakeryPreview=null;inspection.preview=null;inspection.bakeryPreview=null;}
   s.route=[];s.keys=[];s.boatTarget=null;s.maraTarget=null;enterReader(s,'help',command.focus);s.readingInspection=inspection;s.notice='';
  }break;
 case 'OPEN':if(command.panel==='planner'&&!c.story.maraReported)break;if(command.panel==='writing'&&(c.story.phase!=='planning'||!c.story.laterKnown))break;if(command.panel==='bakery'&&!c.bakery.met)break;if(command.panel==='sol'&&!bakeryReady(c))break;if(s.mode==='bakery-repair'&&!['festival','help','backpack','journal','pause',...Object.keys(sources)].includes(command.panel??''))break;if(command.panel==='birdTalk'&&(s.mode!=='mara-story'||c.mara.scene?.stage!=='ask'||!nearBird(c.mara.scene.position)))break;if(s.mode==='mara-story'&&!['festival','birdTalk','help','backpack','journal','pause',...Object.keys(sources)].includes(command.panel??''))break;if(command.panel==='complete'){if(c.story.ending&&!s.activity){stop(s,id);enterReader(s,'studio',command.focus);s.notice='';}break;}if(command.panel==='endingWords'&&!c.story.ending)break;if(s.activity&&!['festival','help','pause','backpack',...(s.panel?Object.keys(sources):[]),...(s.activity.kind==='ending-presentation'?['endingWords']:s.activity.kind==='lantern-inspect'?[lanternRecord(c,s.activity.lantern).page].filter(Boolean):[])].includes(command.panel??''))break;if(['finale','breadEnding','thanksEnding','notice'].includes(command.panel??'')||command.panel==='story'&&c.page==='mara'&&!c.story.records.mara&&c.story.phase!=='mara'||command.panel==='mara'&&!c.maraHeard||command.panel==='report'&&!conversationReady(c,'mara')||command.panel==='sol'&&!c.story.metSol||command.panel==='later'&&!c.story.laterKnown||command.panel==='empty'&&!(c.story.records.grandma||c.gathering.pageComplete)||command.panel==='studio'&&!c.story.ending||['picnic','duet','lanterns'].includes(command.panel??'')&&!c.crossed)break;stop(s,id);s.notice='';enterReader(s,command.panel,command.focus);break;
 case 'CLOSE':{const inspection=s.readingInspection,returning=inspection&&s.panelTrail.length===inspection.depth;stop(s,id);leaveReader(s);if(returning){s.preview=inspection.preview;s.bakeryPreview=inspection.bakeryPreview;if(c.mara.scene)c.mara.scene.preview=inspection.birdPreview;delete s.readingInspection;}}break;
 case 'CHOOSE_ENDING_SCENE':if(s.panel==='writing')s.viewDrafts.endingScene=command.scene;break;
 case 'CHOOSE_MEMORY':if(s.panel==='gathering'&&c.story.phase==='moment')s.viewDrafts.memoryMoment=command.moment;break;
 case 'DRAFT_PLAN':if(s.panel==='planner')s.viewDrafts.plan={time:command.time,reader:command.reader};break;
 case 'DISCLOSURE':if(s.viewDrafts.disclosures[command.id]===command.open)changed=false;else s.viewDrafts.disclosures[command.id]=command.open;break;
 case 'REHEARSE':{
  const p=command.contribution;
  if(s.panel!=='writing'||!c.story.laterKnown||c.story.phase!=='planning'||distance(c.pip,solPosition(c))>1.5||!p.text.trim()||!['bread','thanks','both'].includes(p.scene))break;
  if(p.origin==='child'?(p.revision!==c.story.solDraft.revision||p.text!==c.story.solDraft.text):(p.scene==='both'||p.text!==preparedEndings[p.scene]))break;
  stop(s,id);s.activity={id,parent:rememberView(s,command.focus),elapsed:0,kind:'ending-rehearsal',contribution:structuredClone(p)};s.panel=null;s.notice='Watch the ending you are trying. Choose Use this ending to select these words for Sol.';break;
 }
 case 'PREVIEW_PLAN':if(s.panel==='planner'&&c.story.phase==='planning'&&c.story.maraReported){
  stop(s,id);s.activity={id,parent:rememberView(s,command.focus),elapsed:0,kind:'plan-preview',time:command.time,reader:command.reader};s.panel=null;s.notice='Previewing does not send invitations. Confirm the plan, then check who needs an update.';
 }break;
 case 'ACTIVITY_BACK':if(!s.panel)leaveActivity(s);break;
 case 'INSPECT_LANTERN':{
  if(!c.crossed||!lanternIds.includes(command.lantern)||command.lantern==='pip'&&!c.bloomed||s.action||s.background||s.viewLost||s.mode!=='walk'||s.panel&&s.panel!=='lanterns')break;
  stop(s,id);s.activity={id,parent:rememberView(s,command.focus),elapsed:0,kind:'lantern-inspect',lantern:command.lantern};s.panel=null;s.notice='This flower keeps its own story. Pip stays where you left him.';break;
 }
 case 'START_PRESENTATION':{
  if(!c.story.ending||s.panel!=='studio'||s.action||s.background||s.viewLost)break;
  if(c.story.presentation.finished&&!c.story.presentation.inProgress)c.story.presentation.page=0;
  c.story.presentation.inProgress=true;
  stop(s,id);s.activity={id,parent:rememberView(s,command.focus),elapsed:0,kind:'ending-presentation',mode:command.mode};s.panel=null;s.notice='Loop plays your complete story. You can pause, replay or open reading help at any time.';break;
 }
 case 'PRESENTATION':{
  if(s.activity?.kind!=='ending-presentation'||s.panel||s.background||s.viewLost||!c.story.ending)break;
  const page=c.story.presentation.page;
  if(command.step==='finish'){if(page===3){applyStory(s,{kind:'PRESENT',page,finished:true});leaveActivity(s);}}
  else{applyStory(s,{kind:'PRESENT',page:page+(command.step==='next'?1:-1)});s.activity!.elapsed=0;}
  break;
 }
 case 'ACTIVITY_ACCEPT':{
  if(s.panel||!s.activity||!['ending-rehearsal','plan-preview'].includes(s.activity.kind)||s.background||s.viewLost)break;
  const activity=s.activity;
  if(activity.kind!=='ending-rehearsal'&&activity.kind!=='plan-preview')break;
  if(activity.kind==='plan-preview'&&activity.time==='usual'&&activity.reader==='mara'){s.notice='Mara is working at the usual time. Change the time or choose Pip to read.';break;}
  if(activity.kind==='ending-rehearsal'&&activity.contribution.origin==='child'&&(activity.contribution.revision!==c.story.solDraft.revision||activity.contribution.text!==c.story.solDraft.text)){s.notice='Your draft changed. Return to your ending and try the current words.';break;}
  leaveActivity(s);
  applyStory(s,activity.kind==='ending-rehearsal'?{kind:'SELECT_ENDING',contribution:activity.contribution}:{kind:'PLAN',time:activity.time,reader:activity.reader});s.viewDrafts.disclosures[activity.kind==='ending-rehearsal'?'writing-revise':'change-gathering-plan']=false;s.restoreFocus=null;break;
 }
 case 'BAKERY_STEP':{const placement=s.bakeryPreview,kind=applyBakery(s,command.step);if(kind)start(s,kind,id,placement??undefined);break;}
 case 'TILE_PREVIEW':if(s.mode==='bakery-repair'&&!s.panel&&!s.action&&!s.background&&!s.viewLost&&['gap','misplaced'].includes(c.bakery.stage))s.bakeryPreview=command.position;break;
 case 'GO':delete s.bridgeWork;if(s.mode==='arrange'&&!s.gesture){s.mode='walk';s.preview=null;}if(s.panel||s.mode!=='walk'||s.action||s.background||s.viewLost)break;s.keys=[];s.route=routeTo(c,command.point);s.requested=command.target??null;s.notice=s.route.length?(command.target?'Walking to '+command.target+'.':''):(Math.sign(command.point.x)!==Math.sign(c.pip.x)?(c.joined?LOOSE:"Pip can't cross the river yet. The bridge pieces may help."):"Pip can't reach that place from here.");break;
 case 'KEY':if(command.down)delete s.bridgeWork;if(s.mode==='arrange'&&!s.gesture){s.mode='walk';s.preview=null;}if(command.down){if(s.panel||(s.mode==='arrange'||s.mode==='bakery-repair'||s.mode==='workbench')||s.action||s.background||s.viewLost||s.mode==='boat'&&c.river.boat.phase!=='steering'||s.mode==='mara-story'&&c.mara.scene&&!['ask','fetch'].includes(c.mara.scene.stage))break;s.route=[];s.boatTarget=null;s.maraTarget=null;if(!s.keys.includes(command.key))s.keys.push(command.key);}else s.keys=s.keys.filter(k=>k!==command.key);break;
 case 'TICK':{
  if(s.background||s.viewLost)break;const dt=Math.min(80,Math.max(0,command.ms));if(s.bridgeWork){s.bridgeWork.elapsed+=dt;if(s.bridgeWork.elapsed>=s.bridgeWork.duration)delete s.bridgeWork;}
  if(!s.panel){advanceGrandma(c,dt/1000);if(!s.action&&c.river.boat.phase==='waiting'&&c.river.collection?.phase==='waiting')start(s,'receiveSeed',id);}
  tickPlayback(s,dt);
  if(s.action){s.action.elapsed+=dt;if(s.action.elapsed>=s.action.duration)settled(s,true,id);break;}
   if(s.mode==='mara-story'){
    if(s.panel)break;const b=c.mara.scene;if(!b)break;const h=Number(s.keys.some(k=>k==='d'||k==='arrowright'))-Number(s.keys.some(k=>k==='a'||k==='arrowleft')),v=Number(s.keys.some(k=>k==='s'||k==='arrowdown'))-Number(s.keys.some(k=>k==='w'||k==='arrowup'));
    const target=h||v?{x:b.position.x+h,z:b.position.z+v}:s.maraTarget;if(!target)break;const d=distance(b.position,target),step=Math.min(d,dt*.002),next={x:b.position.x+(target.x-b.position.x)/(d||1)*step,z:b.position.z+(target.z-b.position.z)/(d||1)*step};
    if(birdWalkable(next)){b.position=next;if(d<=step){s.maraTarget=null;s.notice=birdInstruction(s);}}else{s.maraTarget=null;s.keys=[];s.notice='Stay on the dock path between the boy and Mara’s office.';}break;
   }
   if(s.activity){if(!s.panel&&!s.playback?.paused)s.activity.elapsed=Math.min(6000,s.activity.elapsed+dt);break;}
  if(s.mode==='boat'){
   if(s.panel||c.river.boat.phase!=='steering')break;
   const p=c.river.boat.position,h=Number(s.keys.some(k=>k==='d'||k==='arrowright'))-Number(s.keys.some(k=>k==='a'||k==='arrowleft')),v=Number(s.keys.some(k=>k==='s'||k==='arrowdown'))-Number(s.keys.some(k=>k==='w'||k==='arrowup'));
   let goal=h||v?{x:p.x+h*.93+v*.37,z:p.z-h*.37+v*.93}:s.boatTarget;
   const speed=s.boatSpeed??0;s.boatSpeed=goal?Math.min(1.4,speed+dt*.0024):Math.max(0,speed-dt*.006);
   if(!goal&&s.boatSpeed>0){const heading=c.river.boat.heading??Math.PI/2;goal={x:p.x+Math.sin(heading),z:p.z+Math.cos(heading)};}
   if(!goal)break;
   const guided=guideBoat(c.river.boat,goal,dt/1000,s.boatSpeed);
   if(guided.arrived){s.boatTarget=null;s.boatSpeed=0;}
   if(!guided.blocked){s.notice=atMooring(c,'west')?'The boat is at Pip’s launch. You can unload the seed here.':'Drag to guide the seed boat through the channel to Grandma’s blue landing.';
    if(atMooring(c,'east')){c.river.boat={...c.river.boat,phase:'waiting',position:{...LANDING}};s.boatTarget=null;s.keys=[];s.mode='walk';s.notice='The seed is safe at the landing. Grandma is coming to collect it; Pip can keep exploring.';if(c.river.collection?.phase==='waiting')start(s,'receiveSeed',id);}
   }else{s.boatTarget=null;s.boatSpeed=0;s.notice=RIVER_ROCKS.some(rock=>Math.hypot(c.river.boat.position.x-rock.x,c.river.boat.position.z-rock.z)<.85)?'The rock blocks that way. The seed is safe aboard. Drag around it or turn with the arrow keys.':'The boat has reached the bank. Drag back toward open water, or turn with the arrow keys.';}
   break;
  }
  if(s.panel||s.mode!=='walk')break;
  const before={...c.pip};let next={...c.pip};
  const h=Number(s.keys.some(k=>k==='d'||k==='arrowright'))-Number(s.keys.some(k=>k==='a'||k==='arrowleft')),v=Number(s.keys.some(k=>k==='s'||k==='arrowdown'))-Number(s.keys.some(k=>k==='w'||k==='arrowup'));
  const pace=pipLocomotion(c.pip).speed;
  if(h||v){const mag=Math.hypot(h,v),step=dt*pace/1000;next={x:next.x+(h*.93+v*.37)/mag*step,z:next.z+(-h*.37+v*.93)/mag*step};if(walkable(c,next))c.pip=next;else s.notice=c.joined&&!bridgeReady(c)?LOOSE:'The water is too deep to walk through. Stay on the bank or the finished crossing.';}
  else if(s.route.length){const p=s.route[0]!,d=distance(c.pip,p),step=dt*pace/1000;if(d<=step){c.pip={...p};s.route.shift();if(!s.route.length){if(s.requested==='Sol’s workbench'&&distance(c.pip,WORKBENCH_APPROACH)<.2){s.mode='workbench';s.notice='Arrange pictures of moments you took part in. Any order is welcome; this never changes what happened.';}else s.notice=s.requested?'Pip is here. Choose the nearby action.':'';}}else{next={x:c.pip.x+(p.x-c.pip.x)/d*step,z:c.pip.z+(p.z-c.pip.z)/d*step};if(walkable(c,next))c.pip=next;else{s.route=[];s.notice='That path is blocked.';}}}
  if(c.bakery.stage==='escorting'&&c.pip.x>3){
   // Finish the approach beside Sol even after Pip stops. The carrier's
   // authoritative position keeps the loaf clear of Pip's body and backpack.
   const visiting=localReview&&distance(c.pip,WORKSHOP_DOOR)<2&&distance(c.bakery.rina,WORKSHOP_DOOR)<2.8;
   const destination=visiting?THANK_RINA:c.pip,remaining=distance(c.bakery.rina,destination),clearance=visiting?0:.8;
   if((visiting||distance(before,c.pip)>.0001)&&remaining>clearance+.002){const path=routeTo({...c,pip:c.bakery.rina},destination),target=path[0];if(target){const d=distance(c.bakery.rina,target),step=Math.min(d,remaining-clearance,dt*(WALK_SPEED+.2)/1000);c.bakery.rina={x:c.bakery.rina.x+(target.x-c.bakery.rina.x)/(d||1)*step,z:c.bakery.rina.z+(target.z-c.bakery.rina.z)/(d||1)*step};}}
  }
  if(!c.crossed&&unstableSectionAt(c,c.pip)){start(s,'collapse',id);break;}
  if(!c.crossed&&before.x<1.58&&c.pip.x>=1.58&&bridgeReady(c)){c.crossed=true;c.history.push('B');s.notice='The crossing is ready for everyone to use.';}break;}
 case 'TRY_CROSS':if(s.panel||s.mode!=='walk'||s.action||!bridgeAttemptable(c))break;s.route=routeTo(c,GRANDMA_APPROACH);s.keys=[];s.requested='Grandma';break;
 case 'MARA_GO':if(s.mode==='mara-story'&&!s.panel&&!s.action&&!s.background&&!s.viewLost&&c.mara.scene&&['ask','fetch'].includes(c.mara.scene.stage)&&birdWalkable(command.point)){s.keys=[];s.maraTarget=command.point;s.notice=nearOffice(command.point)?'Mara walks to her dock office for tape.':nearBird(command.point)?'Mara returns to the boy.':'Mara walks along the dock.';}break;
 case 'TAPE_PREVIEW':if(s.mode==='mara-story'&&!s.panel&&!s.action&&!s.background&&!s.viewLost&&c.mara.scene?.stage==='repair'&&nearBird(c.mara.scene.position))c.mara.scene.preview=command.position;break;
 case 'MARA_STEP':{
  const b=c.mara.scene;if(s.mode!=='mara-story'||!b||s.action||s.background||s.viewLost||s.panel&&!(s.panel==='birdTalk'&&command.step==='ASK'))break;
  if(command.step==='ASK'&&b.introduced&&b.stage==='ask'&&nearBird(b.position))start(s,'birdConsent',id);
  if(command.step==='TAPE'&&b.stage==='fetch'&&b.tape==='office'&&nearOffice(b.position))start(s,'tapePickup',id);
  if(command.step==='ALIGN'&&b.tape==='mara'&&nearBird(b.position)&&['fetch','repair'].includes(b.stage)){b.aligned=true;b.stage='repair';s.notice='The torn edges line up. Choose where the tape will hold them together.';}
  if(command.step==='PLACE'&&b.stage==='repair'&&nearBird(b.position)&&b.preview){b.strip=b.preview;b.preview=null;if(b.strip==='across'){b.stage='repaired';s.notice='The tape bridges both torn edges. The wing now holds together.';}else s.notice='The tape is beside the tear. The wing is still loose. Move the same strip across the tear.';}
  if(command.step==='DEPART'&&b.stage==='repaired')start(s,'birdDeparture',id);
  if(command.step==='RETURN'&&b.stage==='done'){s.mode='walk';start(s,'maraReturn',id);}break;
 }
 case 'STORY':{const parent=rememberView(s,command.focus),cue=applyStory(s,command.event);if(s.panel&&s.panel!==parent.panel)s.panelTrail.push(parent);if(cue){if(cue==='maraTell')s.maraParent=parent;start(s,cue,id,undefined,command.event.kind==='MOMENT'?command.event.moment:undefined);}break;}
 case 'TALK':if(command.who==='grandma'&&c.river.collection){s.notice='Grandma is collecting the seed. You can meet her at the planting spot when she returns.';break;}if(s.action||s.mode!=='walk'||s.background||s.viewLost)break;if(command.who==='rina'||command.who==='sol'&&!bakeryReady(c)){if(!c.crossed||!nearBakery(c)||c.bakery.edition==='earlier-chapter')break;stop(s,id);enterReader(s,'bakery',command.focus);if(!c.bakery.met)start(s,'bakeryWelcome',id);else s.notice=bakeryInstruction(s);break;}if(distance(c.pip,command.who==='mara'?(maraAtGarden(c)?GATHER_MARA:MARA):command.who==='sol'?solPosition(c):GRANDMA)>1.5){s.notice='Move closer to '+(command.who==='mara'?'Mara':command.who==='sol'?'Sol':'Grandma')+' first.';break;}stop(s,id);s.notice='';enterReader(s,command.who,command.focus);if(command.who==='mara')rememberConversation(c,'mara');if(command.who==='sol')c.story.metSol=true;break;
 case 'TAKE_PAGE':if(s.panel==='mara'&&conversationReady(c,'mara')&&!s.action&&c.page==='mara'&&distance(c.pip,maraAtGarden(c)?GATHER_MARA:MARA)<=1.5)start(s,'page',id);break;
 case 'REPORT':if(s.panel==='grandma'&&distance(c.pip,GRANDMA)<=1.5&&c.page==='pip')start(s,'report',id);break;
 case 'NOTICE':s.notice=command.text;break;
 case 'ARRANGE':if(s.action||distance(c.pip,CROSSING)>1.6||c.crossed){s.notice=c.crossed?'The crossing stays here for everyone to use.':'Bring Pip beside the bridge pieces first.';break;}stop(s,id);resetViews(s);s.panel=null;s.mode='arrange';s.notice=bridgeStatus(c);break;
 case 'COLLECT_ROPES':if(!s.action&&distance(c.pip,anchors.crossing.materials)<=1.6){if(ropeCount(c,'box'))start(s,'ropes',id);else s.notice='The repair box is empty. Both ropes are already in use or in Pip’s backpack.';}break;
 case 'POST_PREVIEW':if(s.mode==='arrange'){const x=command.site==='narrow'?(command.side==='west'?-BRIDGE_GEOMETRY.halfLength:BRIDGE_GEOMETRY.halfLength):(-riverHalfWidth(-2)+BRIDGE_GEOMETRY.halfLength-.15+(command.side==='west'?0:BRIDGE_GEOMETRY.length));previewAt(s,{x,z:command.site==='narrow'?3:-2});s.notice=s.preview?'Preview at the '+command.site+' crossing. Choose Place section to keep it.':s.notice;}break;
 case 'BACK':stop(s,id);resetViews(s);s.mode='walk';s.panel=null;s.notice=bridgeReady(c)?'The crossing is ready. Guide Pip across.':c.joined?LOOSE:'Pip is ready to explore.';break;
 case 'SELECT':if(s.mode==='arrange'){s.preview=null;s.selection=command.section;}break;
 case 'PREVIEW':previewAt(s,command.point);break;
 case 'PLACE':commitPlacement(s);break;
 case 'CANCEL':if(s.mode==='arrange')s.mode='walk';s.cardGesture=null;s.gesture=null;s.bakeryPreview=null;s.maraTarget=null;if(c.mara.scene)c.mara.scene.preview=null;s.preview=null;s.route=[];s.keys=[];s.boatTarget=null;break;
 case 'NUDGE':{const p=(s.preview??c.sections)[s.selection];previewAt(s,{x:p.x+command.x,z:p.z+command.z},false);s.notice='Move the selected section, then press Enter or choose Place section. Escape cancels this move.';break;}
 case 'ROTATE':if(s.mode==='arrange'&&!c.crossed&&!c.joined){if((['west','east'] as const).some(end=>c[end]&&sectionAtEnd(c,end)===s.selection)){s.notice='Release that section’s rope before turning it.';break;}const turned={...c.sections[s.selection],rotation:(c.sections[s.selection].rotation+command.direction*Math.PI/2+Math.PI*2)%(Math.PI*2)};if(blocksFerryLane(turned)){s.notice='Move this section away from the seed boat’s route before turning it.';break;}c.sections[s.selection]=turned;s.notice='Section turned. Its short end should meet the other section.';}break;
 case 'JOIN':{if(s.mode!=='arrange'||c.joined)break;const a=c.sections.a,b=c.sections.b;if(Math.abs(a.z-b.z)>.17||Math.abs(Math.abs(a.x-b.x)-BRIDGE_GEOMETRY.length)>.17||Math.abs(Math.sin(a.rotation))>.01||Math.abs(Math.sin(b.rotation))>.01||Math.abs(a.rotation-b.rotation)>.01){s.notice='Bring the short ends of the bridge sections together. Turn the loose section to face the same way as the other section.';break;}const heldB=c.river.attachments.west==='b'||c.river.attachments.east==='b',key=heldB?'a':'b',origin=heldB?b:a,other=heldB?a:b,joinedPart={x:origin.x+(other.x>origin.x?BRIDGE_GEOMETRY.length:-BRIDGE_GEOMETRY.length),z:origin.z,rotation:origin.rotation};if(Math.abs(joinedPart.x)>5||blocksFerryLane(joinedPart)){s.notice='Move the sections farther from the seed boat’s route before joining them.';break;}if((c.river.attachments.west===key||c.river.attachments.east===key)&&distance(joinedPart,other)>.001){s.notice='Release an attachment before adjusting this section.';break;}c.sections[key]=joinedPart;c.joined=true;s.notice=bridgeStatus(c);break;}
 case 'FASTEN':if(c.river.construction){s.notice='Install the posts, then draw each rope to the next post. The two sides are fastened separately.';break;}if(s.mode!=='arrange'||c.crossed)break;if(c.river.ropeLocations[command.end]!=='pip'){s.notice='Take the repair rope from Grandma’s maintenance box first.';break;}if(!reaches(c,command.end)||(command.atZ!==undefined&&Math.abs(bridgeCenter(c).z-command.atZ)>.22)){s.notice=GAP;break;}c.river.attachments[command.end]=sectionAtEnd(c,command.end);c[command.end]=true;c.river.ropeLocations[command.end]='attached';s.notice=bridgeReady(c)?'Both ends are secure. Return to Pip, then walk across.':LOOSE;break;
 case 'ADJUST':if(s.mode==='arrange'&&!c.crossed){if(!navigable(c.pip)){s.notice='Step onto the bank before releasing a supporting rope.';break;}if(c.river.construction){const b=ensureConstruction(c);for(const side of ['north','south'] as const)b.ropes[side]={west:false,center:false,east:false};syncConstruction(c);}for(const end of ['west','east'] as const)if(c[end])c.river.ropeLocations[end]='pip';c.west=false;c.east=false;c.river.attachments={west:null,east:null};s.notice='The ropes are released into Pip’s backpack. Move the sections, then fasten them again.';}break;
 case 'FERRY':if(c.seed==='boat'||s.action||s.panel||s.background||s.viewLost)break;if(c.seed==='pip'&&!c.crossed){if(c.ferrySide!=='west'||distance(c.pip,CROSSING)>1.6){s.notice='Bring Pip beside the seed boat to load the seed.';break;}start(s,'loadSeed',id);break;}if(distance(c.pip,CROSSING)>1.6&&distance(c.pip,GRANDMA)>1.6){s.notice='Return to the riverbank or Grandma to watch the seed boat.';break;}start(s,'ferry',id);break;
 case 'LAUNCH_BOAT':if(s.mode==='boat'&&!s.panel&&!s.action&&c.seed==='boat'&&c.river.boat.phase==='loaded'){c.river.boat.phase='steering';s.notice='You steer the seed boat. Drag the boat toward open water or use the arrow keys. Go around the rock to Grandma’s blue landing.';}break;
 case 'STEER_STOP':s.boatTarget=null;s.keys=[];break;
 case 'STEER':if(s.mode==='boat'&&!s.panel&&!s.action&&!s.background&&!s.viewLost&&c.river.boat.phase==='steering'&&Number.isFinite(command.point.x)&&Number.isFinite(command.point.z)){s.keys=[];s.boatTarget=command.point;}break;
 case 'DOCK_SEED':if(s.mode==='boat'&&!s.panel&&!s.action&&!s.background&&!s.viewLost&&c.seed==='boat'){if(atMooring(c,'east')){c.river.boat={...c.river.boat,phase:'waiting',position:{...LANDING}};s.boatTarget=null;s.keys=[];s.mode='walk';if(c.river.collection?.phase==='waiting')start(s,'receiveSeed',id);else s.notice='The seed is safe at the landing. Grandma is coming to collect it; Pip can keep exploring.';}else s.notice='Grandma can reach the boat at her blue landing. Steer there before giving her the seed.';}break;
 case 'UNLOAD_SEED':if(s.mode==='boat'&&!s.panel&&!s.action&&!s.background&&!s.viewLost&&c.seed==='boat'){if(atMooring(c,'west'))start(s,'unloadSeed',id);else s.notice='Return the boat to Pip’s launch before unloading. The same seed is still aboard.';}break;
 case 'PLANT':if(c.river.collection){s.notice='Grandma is returning to the planting spot. You can plant together when she arrives.';break;}if(s.action||!c.crossed||distance(c.pip,GRANDMA)>1.5||!['pip','grandma','bed'].includes(c.seed))break;s.panel=null;start(s,'plant',id);break;
 case 'BLOOM':if(!s.action&&c.seed==='soil'&&!c.bloomed){s.pendingBloom=false;start(s,'bloom',id);}break;
 case 'INTERRUPT':if(s.readingInspection){s.readingInspection.preview=null;s.readingInspection.bakeryPreview=null;s.readingInspection.birdPreview=null;}stop(s,id);s.background=command.background??false;if(!s.background)enterReader(s,'pause');break;
 case 'FOREGROUND':s.background=false;s.keys=[];s.route=[];break;
 case 'EXPOSE':case 'EXPOSE_WORDS':{const ids=command.type==='EXPOSE'?[command.id]:command.ids,allowed=s.panel==='report'?['report','mara','opening']:s.panel==='studio'||s.panel==='endingWords'?['finale']:s.panel==='writing'?['sol',...(c.story.laterKnown?['later','breadEnding','thanksEnding']:[])]:s.panel==='sol'?['sol',...(c.story.solInvitation==='later'?['notice']:[]),...(c.story.records.sol&&c.story.solEnding?.origin==='prepared'?[c.story.solEnding.scene==='thanks'?'thanksEnding':'breadEnding']:[])]:s.panel==='birdTalk'?['story']:s.panel==='gathering'?[c.story.phase==='mara'?'story':c.story.phase==='grandma'?'empty':c.story.phase==='sol'||c.story.phase==='discussion'?'sol':'',...(c.story.phase==='discussion'?c.story.questions.map(q=>q+'Ending'):['sol','grandma'].includes(c.story.phase)&&c.story.solEnding?.origin==='prepared'?[c.story.solEnding.scene==='thanks'?'thanksEnding':'breadEnding']:[])]:s.panel?[s.panel]:[],visible=ids.filter(ref=>allowed.some(p=>ref.startsWith(sourcePrefix(p,c)))&&(s.panel!=='endingWords'||(()=>{return c.story.ending?.paragraphs.some((text,index)=>{const component=sourcePrefix('finale',c)+(Object.values(endingLines).findIndex(line=>line===text)+1);return ref===component||ref.startsWith(component+'.');})??false;})())&&sourceIds.has(ref)&&!c.exposed.includes(ref));if(!visible.length)changed=false;else c.exposed.push(...visible);break;}
 case 'HELP_USED':if(!c.assistance.includes(command.id))c.assistance.push(command.id);else changed=false;break;
 case 'READ_POSITION':if(c.reading[command.id]===command.position)changed=false;else c.reading[command.id]=command.position;break;
 case 'SETTING':c[command.key]=command.value;break;
 case 'SAVE_STATUS':s.save=command.status;if(command.status==='conflict'){stop(s,id);if(s.playback)s.playback.paused=true;}if(command.revision!==undefined)s.savedRevision=command.revision;break;
 case 'VIEW_LOST':if(command.lost)stop(s,id);s.viewLost=command.lost;break;
 case 'NEW':return {...initialGarden(command.runId),ready:true,save:'saving'};
 }
 if(command.type==='BOOT')resetViews(s);
 syncPlayback(s,state,command,id);
 if(!changed)return state;
 if(JSON.stringify(c)!==JSON.stringify(state.chapter)&&command.type!=='BOOT')c.revision=state.chapter.revision+1;
 return s;
}
export class GardenStore {
 private state:GardenState;private listeners=new Set<()=>void>();private queue:SerializedQueue<Command>;
 private viewListeners=new Set<()=>void>();private viewState:GardenState;private viewTimer:ReturnType<typeof setTimeout>|null=null;
 constructor(initial:GardenState,private readonly allocate:()=>string=()=>crypto.randomUUID()){
  this.state=freeze(initial);this.viewState=this.state;this.queue=new SerializedQueue(command=>{const next=gardenReduce(this.state,command,this.allocate());if(next===this.state)return;this.state=freeze(next);for(const listener of this.listeners)listener();
   // The scene reads every simulation tick directly. Native UI needs the latest
   // position at most every 75 ms; deliberate input and story changes publish now.
   if(command.type==='TICK'){
    // The scene consumes action time directly. Re-rendering the complete reader
    // and native controls for elapsed time alone performs no visible UI change.
    // Activity illustrations still need their elapsed-time updates, and every
    // committed change, action boundary and deliberate command publishes.
    const shown=this.viewState;
    const changed=next.chapter.revision!==shown.chapter.revision||!!next.activity||next.action?.id!==shown.action?.id||next.notice!==shown.notice||next.mode!==shown.mode||next.panel!==shown.panel||next.route.length!==shown.route.length||next.playback?.key!==shown.playback?.key||next.playback?.paused!==shown.playback?.paused;
    if(changed&&!this.viewTimer&&this.viewListeners.size)this.viewTimer=setTimeout(this.publishView,75);
   }
   else this.publishView();
  });
 }
 private publishView=()=>{if(this.viewTimer)clearTimeout(this.viewTimer);this.viewTimer=null;this.viewState=this.state;for(const listener of this.viewListeners)listener();};
 getViewSnapshot=()=>this.viewState;
 subscribeView=(listener:()=>void)=>{this.viewState=this.state;this.viewListeners.add(listener);return()=>{this.viewListeners.delete(listener);if(!this.viewListeners.size&&this.viewTimer){clearTimeout(this.viewTimer);this.viewTimer=null;}};};
 getSnapshot=()=>this.state;
 subscribe=(listener:()=>void)=>{this.listeners.add(listener);return()=>{this.listeners.delete(listener);};};
 send=(command:Command)=>this.queue.push(command);
}
function freeze<T>(value:T):T{if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.freeze(value);for(const child of Object.values(value))freeze(child);}return value;}
