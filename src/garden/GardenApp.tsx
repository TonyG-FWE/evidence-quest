import {anchors,WORLD,regionAt} from './worldLayout.js';
import {HandControls} from './HandControls.js';
import {bridgeStatus} from './bridgeConstruction.js';
import {Journal} from './ObservationJournal.js';
import {NarrativeReadingContext} from './NarrativeReadingContext.js';
import {PagedSource,useReaderBookmarks} from './ReaderPresentation.js';
import {narrativeLine} from './narrativeDialogue.js';
import {editionOf,isLiterary,maintenanceOf} from './narrativeEdition.js';
import {FestivalWelcome,FestivalIntroduction} from './FestivalWelcome.js';
import './playback.css';
import {StoryReadingTools} from './StoryReadingTools.js';
import {supportedWordHelp} from './readingGlossary.js';
import {ConversationControls,MaraChoices} from './ConversationControls.js';
import {accountReading,activeConversation,conversationPartsFor,conversationProgress,conversationReady,conversationPresent,needsDockService,sourceVoice,sourceNarration,readerStep} from './conversation.js';
import {cancelLocalSpeech,onLocalSpeechCanceled} from './audio.js';
import {playCastSpeech} from './castSpeech.js';
import {speechAttributes,speechFromElement,speechFromBlock,speechDocument,sentenceAt} from './readingSpeech.js';
import {voiceSpeaker,type SpeechInput,type SpeechRequest} from './voiceTypes.js';
import {GatheringControls} from './GatheringPanels.js';
import {connectedGathering,gatheringAction,gatheringInstruction,type SpokenLine} from './gathering.js';
import {BakeryConversation} from './BakeryConversation.js';
import {BakeryControls,BakeryActions} from './BakeryControls.js';
import {bakeryReady,nearBakery,bakeryInstruction,solAtWorkshop,BAKERY_APPROACH} from './bakery.js';
import {useCallback,useEffect,useLayoutEffect,useRef,useState,useSyncExternalStore,type ReactNode} from 'react';
import {WorkbenchControls} from './WorkbenchControls.js';
import {cardSlot,nearestCardSlot,canUseWorkbench} from './workbench.js';
import {storyboardFor} from './journal.js';
import {GardenScene,type SceneStatus} from './GardenScene.js';
import {localReview,personalGrass,demoPresentation} from './assets/profile.js';
import {createGarden,sceneDescription} from './persistence.js';
import {type GardenStore,type SourceId,type Panel,type Point,MARA,GRANDMA,GRANDMA_APPROACH,CROSSING,distance,bridgeReady,bridgeCenter,riverHalf,reaches,GAP,LOOSE,encounterDone} from './model.js';
import {sourcesFor,normalize,wordHelp,sourcePrefix} from './content.js';
import {ChapterContent,Choices,Reply} from './ChapterPanels.js';
import {AdditionalWordHelp} from './AdditionalWordHelp.js';
import {DefinitionNarration} from './DefinitionNarration.js';
import {ReadingSession} from './ReadingSession.js';
import {chapterGoal,SOL_APPROACH,solApproach,solPosition,maraAtGarden,GATHER_MARA,gatheringStarted} from './chapter.js';
import {bridgeAttemptable} from './model.js';
import {readerReturnLabel,roleText} from './interaction.js';
import {captureFocus,restoreViewFocus} from './focus.js';
import {WorldActivityView} from './WorldActivity.js';
import {lanternIds,lanternRecord} from './lanterns.js';
import {ropeCount} from './river.js';
import {MaraWorld} from './MaraWorld.js';
import {birdInstruction} from './mara.js';
import {BoatControls} from './BoatControls.js';
import {ReadingContext,ReadingParagraph,SpeechWords,ConversationReadingTools,GroupedReadingContext,type ReadingOrigin} from './Reading.js';
import './garden.css';
const movement=new Set(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d']);
function Icon({kind}:{kind:'leaf'|'book'|'bag'|'sound'|'help'|'pause'|'arrow'|'check'|'spark'}){
 const paths={leaf:'M19 4C8 2 3 8 5 15s14 3 14-11ZM5 19 15 9',book:'M3 5c4-2 7-1 9 1 2-2 5-3 9-1v14c-4-2-7-1-9 1-2-2-5-3-9-1V5Zm9 1v14',bag:'M7 7V5a5 5 0 0 1 10 0v2M5 7h14l1 14H4L5 7Zm3 6h8v5H8v-5',sound:'M4 9h4l5-4v14l-5-4H4V9Zm12-2a7 7 0 0 1 0 10m3-13a11 11 0 0 1 0 16',help:'M9 8a3 3 0 1 1 5 2c-2 1-2 2-2 4m0 3v.1M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',pause:'M8 5v14M16 5v14',arrow:'M4 12h15m-6-6 6 6-6 6',check:'m5 12 4 4L19 6',spark:'m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2'};
 return <svg viewBox="0 0 24 24" className="g-icon" aria-hidden="true"><path d={paths[kind]} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function Tag({children}:{children:ReactNode}){return <span className="g-kicker">{children}</span>;}
function GameFullscreen(){
 const [active,setActive]=useState(!!document.fullscreenElement),[notice,setNotice]=useState('');
 useEffect(()=>{const changed=()=>{setActive(!!document.fullscreenElement);setNotice('');};document.addEventListener('fullscreenchange',changed);return()=>document.removeEventListener('fullscreenchange',changed);},[]);
 if(!document.fullscreenEnabled)return null;
 const toggle=async()=>{setNotice('');try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{setNotice('Full screen is unavailable. You can keep playing here.');}};
 return <><button className="garden-studio-review g-secondary" aria-label={active?'Exit full screen':'Full screen'} onClick={()=>void toggle()}>{active?'Exit full screen':'Full screen'}</button>{notice&&<span role="status">{notice}</span>}</>;
}
export function App(){
 const [{store,saves,dispose}]=useState(createGarden);
 const [reviewControls,setReviewControls]=useState<HTMLDivElement|null>(null);
 const s=useSyncExternalStore(store.subscribeView,store.getViewSnapshot),c=s.chapter,sources=sourcesFor(c),conversationParts=conversationPartsFor(c);
 const [viewKey,setViewKey]=useState(0),[word,setWord]=useState<{word:string;sentence:string;button:HTMLButtonElement;draft?:string;component?:string;title?:boolean;source?:string;paragraph?:number;start?:number;end?:number;origin?:ReadingOrigin}|null>(null);
 const [sceneStatus,setSceneStatus]=useState<SceneStatus>({phase:'loading',location:'village'});
 const restoreScene=()=>{setSceneStatus({phase:'recovering',location:sceneStatus.location});store.send({type:'VIEW_LOST',lost:false});setViewKey(k=>k+1);};
 const [audio,setAudio]=useState(''),[speaking,setSpeaking]=useState(false),[practice,setPractice]=useState(false);
 useEffect(()=>onLocalSpeechCanceled(()=>setSpeaking(false)),[]);
 const [hintNotice,setHintNotice]=useState(''),[readingTarget,setReadingTarget]=useState<{text:string;id:string;origin:ReadingOrigin;title?:string;modelSpeech?:SpeechRequest;onTranscript?:((text:string)=>void)}|null>(null);
 useEffect(()=>{setHintNotice('');},[c.runId]);
 const voiceSequence=useRef(0),practiceFocus=useRef<HTMLElement|null>(null);
 const closePractice=()=>{setReadingTarget(null);requestAnimationFrame(()=>practiceFocus.current?.focus());};
 const conversation=activeConversation(s),conversationState=conversation?conversationProgress(c,conversation):null;
 const conversationPart=conversationState?.part??null,conversationPending=!!conversation&&conversationPart!<conversationParts[conversation].length;
 const dockFirst=s.panel==='mara'&&!accountReading(s)&&conversationPresent(s,'mara')&&c.story.phase==='planning'&&needsDockService(c);
 const remoteAccount=accountReading(s);
 const bakeryReplies=s.panel==='bakery'&&!remoteAccount&&!conversationPending&&conversationReady(c,'bakery');
 const readingKey=readerStep(s);
 const previousReader=useRef({panel:s.panel,key:readingKey});
 const dialog=useRef<HTMLElement>(null),scroll=useRef<HTMLDivElement>(null);
 const rememberReader=useReaderBookmarks(store,dialog,c.runId+':'+readingKey,!!word||!!readingTarget);
 const failView=useCallback((error:unknown)=>{setSceneStatus(previous=>({...previous,phase:'failed',cause:error instanceof Error?error.message:String(error)}));store.send({type:'VIEW_LOST',lost:true});},[store]);
 const speak=useCallback((request:SpeechInput,onDone?:()=>void)=>{
  const sequence=++voiceSequence.current;
  setAudio('');playCastSpeech(request,{onState:phase=>{if(voiceSequence.current===sequence)setSpeaking(phase!=='idle');},onError:message=>{if(voiceSequence.current===sequence)setAudio(message);},onDone:()=>{if(voiceSequence.current===sequence)onDone?.();}});store.send({type:'HELP_USED',id:'model'});
 },[store]);
 const stopAudio=()=>{voiceSequence.current++;cancelLocalSpeech();setSpeaking(false);};
 const hearWordPart=(text:string)=>{if(!word)return;const original=word.source?sources[word.source as SourceId]?.paragraphs[word.paragraph??0]:word.draft;
  // Find the sentence containing this occurrence, including repeated sentences.
  const around=word.start??0;let start=text===word.word?word.start:original?.lastIndexOf(text,around);if(start!==undefined&&start<0)start=undefined;
  const request=speechFromElement(word.button,text,start!==undefined?{start,end:start+text.length}:undefined);speak({...request,...(text===word.word&&request.origin==='authored-display'?{speaker:'narrator' as const}:{}),revision:request.revision??c.revision,...(word.source?{source:{id:word.source,paragraph:word.paragraph??0,edition:editionOf(c),...(maintenanceOf(c)?{maintenanceEdition:maintenanceOf(c)!}:{}),...(start!==undefined?{start,end:start+text.length}:{})}}:{})});};
 function inspectScreen(opener:HTMLElement){
  const root=document.querySelector(s.panel?'.garden-reader':'.garden-app');
  const blocks=Array.from(root?.querySelectorAll<HTMLElement>('h1,h2,h3,p,small,blockquote,.g-speaker,[data-readable-text],.g-item strong,.garden-save-error>span,button:not(.g-word),summary,legend')??[]).filter(n=>n.getClientRects().length&&!n.closest('.garden-header,.g-reading-tools,.g-choice-reading,[data-reading-command],.g-reading-tip,.g-reader-context,.g-audio-notice')&&!n.parentElement?.closest('blockquote,p,[data-readable-text]'));
  const speech:SpeechRequest[]=[...(!s.panel?[{text:feedback,origin:'authored-display' as const}]:[]),...blocks.map(speechFromBlock)].filter(part=>part.text.trim()).slice(0,200);
  store.send({type:'INSPECT_TEXT',text:speech.map(part=>part.text),speech,focus:captureFocus(opener)});
 }
 function restart(){if(confirm('Start a new adventure? This adventure will be kept in a local archive.')){stopAudio();store.send({type:'INTERRUPT'});void saves.newAdventure();}}
 useEffect(()=>{document.title='The Garden Adventure · Evidence Quest';return()=>{cancelLocalSpeech();dispose();};},[dispose]);
 useEffect(()=>{const resize=()=>document.documentElement.style.setProperty('--garden-viewport-height',(window.visualViewport?.height??window.innerHeight)+'px');resize();window.visualViewport?.addEventListener('resize',resize);window.addEventListener('resize',resize);return()=>{window.visualViewport?.removeEventListener('resize',resize);window.removeEventListener('resize',resize);document.documentElement.style.removeProperty('--garden-viewport-height');};},[]);
 const open=useCallback((panel:Panel,origin?:Element)=>{store.send({type:'OPEN',panel,focus:captureFocus(origin)});},[store]);
 const close=useCallback(()=>{cancelLocalSpeech();setSpeaking(false);setWord(null);setPractice(false);setReadingTarget(null);store.send({type:'CLOSE'});},[store]);
 const nearMara=distance(c.pip,maraAtGarden(c)?GATHER_MARA:MARA)<1.5,nearGrandma=distance(c.pip,GRANDMA)<1.25,nearSections=distance(c.pip,CROSSING)<1.6,nearSol=distance(c.pip,solPosition(c))<1.5;
 const go=(target:'mara'|'grandma'|'sections'|'sol')=>store.send({type:'GO',point:target==='sol'?solApproach(c):target==='mara'?(maraAtGarden(c)?{x:anchors.gathering.mara.x-1.05,z:anchors.gathering.mara.z}:anchors.dock.approach):target==='grandma'?GRANDMA_APPROACH:CROSSING,target:target==='sections'?'the bridge pieces':target==='mara'?'Mara':target==='sol'?(gatheringStarted(c)?'Sol':solAtWorkshop(c)?'Sol’s workshop':'Rina’s bakery'):'Grandma'});
 const talk=(who:'mara'|'grandma'|'sol',origin?:Element)=>store.send({type:'TALK',who,focus:captureFocus(origin)});
 useEffect(()=>{
  const down=(e:KeyboardEvent)=>{
   const key=e.key.toLowerCase(),target=e.target as HTMLElement;
   if(target.closest('.garden-camera-controls'))return;
   if(document.querySelector('.garden-scene[data-review-studio="true"]'))return;
   if(key==='escape'){e.preventDefault();cancelLocalSpeech();setSpeaking(false);if(word){setWord(null);requestAnimationFrame(()=>word.button.focus());return;}if(readingTarget){closePractice();return;}if(s.panel){close();return;}if(s.activity){store.send({type:'ACTIVITY_BACK'});return;}if(s.cardGesture){store.send({type:'CARD_CANCEL'});return;}if(s.mode==='workbench'){store.send({type:'BACK'});return;}if(s.gesture){store.send({type:'HAND_CANCEL'});return;}if(s.preview||s.bakeryPreview||c.mara.scene?.preview){store.send({type:'CANCEL'});return;}if(s.mode==='bakery-repair'){store.send({type:'BAKERY_STEP',step:'BACK'});return;}if(s.mode==='arrange'){store.send({type:'BACK'});return;}store.send({type:'INTERRUPT'});return;}
   if(target.matches('input,textarea,select,[contenteditable=true]')||s.panel)return;
   if(s.mode==='workbench'){
    const current=store.getSnapshot(),held=current.cardGesture,cards=storyboardFor(current.chapter,current.chapter.journal);
    if(held&&movement.has(key)){e.preventDefault();const delta=['arrowleft','a'].includes(key)?-1:['arrowright','d'].includes(key)?1:['arrowup','w'].includes(key)?-5:5,index=Math.max(0,Math.min(cards.length-1,nearestCardSlot(held.point,cards.length)+delta));store.send({type:'CARD_MOVE',point:cardSlot(index)});}
    if(held&&key==='enter'&&!target.closest('button,summary,a')){e.preventDefault();store.send({type:'CARD_PLACE'});}return;
   }
   if(s.gesture){
    if(key==='escape'){e.preventDefault();store.send({type:'HAND_CANCEL'});return;}
    if(key==='enter'&&!target.closest('button,summary,a')){e.preventDefault();store.send({type:'HAND_RELEASE'});return;}
    if(key==='q'||key==='r'){e.preventDefault();store.send({type:'HAND_ROTATE',direction:key==='q'?-1:1});return;}
    if(movement.has(key)){e.preventDefault();const amount=e.shiftKey?.025:.1,g=store.getSnapshot().gesture;if(g)store.send({type:'HAND_MOVE',point:{x:g.point.x+(['arrowleft','a'].includes(key)?-amount:['arrowright','d'].includes(key)?amount:0),z:g.point.z+(['arrowup','w'].includes(key)?-amount:['arrowdown','s'].includes(key)?amount:0)}});return;}
   }
   if(s.activity){if(key==='i'){e.preventDefault();open('backpack');}return;}
   if(target.closest('button,summary,a')&&(key==='enter'||key===' '))return;
   if(movement.has(key)){e.preventDefault();store.send({type:'KEY',key,down:true});}
   if(key==='i'){e.preventDefault();open('backpack');}
   if(key==='e'){e.preventDefault();if(nearMara)talk('mara');else if(nearGrandma)talk('grandma');else if(nearSol)talk('sol');else if(nearSections)open('sections');}
  };
  const up=(e:KeyboardEvent)=>{const key=e.key.toLowerCase();if(movement.has(key))store.send({type:'KEY',key,down:false});};
  window.addEventListener('keydown',down);window.addEventListener('keyup',up);return()=>{window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);};
 },[store,s.panel,s.mode,s.cardGesture,s.gesture,s.preview,s.bakeryPreview,c.mara.scene?.preview,s.activity,word,readingTarget,nearMara,nearGrandma,nearSections,nearSol,close,open]);
 useLayoutEffect(()=>{const newDecision=previousReader.current.panel===s.panel&&previousReader.current.key!==readingKey;previousReader.current={panel:s.panel,key:readingKey};setWord(null);setPractice(false);setReadingTarget(null);setAudio('');cancelLocalSpeech();setSpeaking(false);const root=dialog.current??document.querySelector<HTMLElement>(c.gathering.turn||c.story.phase==='arriving'?'.garden-gathering-controls':s.mode==='bakery-repair'?'.garden-action-bar':s.mode==='mara-story'?'.garden-mara-play':s.activity?'.garden-world-activity':!c.started?'.festival-welcome':'.garden-action-bar');if(root)restoreViewFocus(newDecision?null:s.restoreFocus,root);},[s.panel,s.mode,c.story.phase,s.activity?.id,c.gathering.turn?.kind,conversationPart,dockFirst,readingKey]);
 useEffect(()=>{if(word){word.button.closest('p')?.scrollIntoView({block:'nearest'});dialog.current?.querySelector<HTMLElement>('.garden-word-card .g-close')?.focus();}},[word]);
 useEffect(()=>{
  const root=scroll.current;if(!root||!s.panel||word||readingTarget)return;
  function collect(){const box=root!.getBoundingClientRect(),known=new Set(store.getSnapshot().chapter.exposed),ids:string[]=[];for(const token of root!.querySelectorAll<HTMLElement>('[data-source-word]')){const r=token.getBoundingClientRect(),id=token.dataset['sourceWord']!;let visible=!!r.height&&r.top>=box.top-1&&r.bottom<=box.bottom+1&&r.left>=box.left-1&&r.right<=box.right+1;for(let parent=token.parentElement;visible&&parent&&parent!==root;parent=parent.parentElement){if(parent.matches('[data-reader-scroll]')){const clip=parent.getBoundingClientRect();visible=r.top>=clip.top-1&&r.bottom<=clip.bottom+1&&r.left>=clip.left-1&&r.right<=clip.right+1;}}if(visible&&!known.has(id)){ids.push(id);known.add(id);}}
   for(const p of root!.querySelectorAll<HTMLElement>('[data-source-component]')){const id=p.dataset['sourceComponent']!,tokens=Array.from(p.querySelectorAll<HTMLElement>('[data-source-word]'));if(tokens.length&&tokens.every(t=>known.has(t.dataset['sourceWord']!))&&!known.has(id))ids.push(id);}if(ids.length)store.send({type:'EXPOSE_WORDS',ids});}
  const observer=new ResizeObserver(collect);observer.observe(root);const changes=new MutationObserver(collect);changes.observe(root,{childList:true,subtree:true});root.addEventListener('scroll',collect,true);const frame=requestAnimationFrame(collect);return()=>{observer.disconnect();changes.disconnect();root.removeEventListener('scroll',collect,true);cancelAnimationFrame(frame);};
 },[s.panel,store,practice,word,readingTarget,c.story.phase,conversationPart,dockFirst,readingKey]);
 useEffect(()=>{if(scroll.current&&readingKey)scroll.current.scrollTop=c.reading[readingKey]??0;},[readingKey,practice]);
 const committed=!remoteAccount&&!conversationPending&&(s.panel==='mara'&&(c.page!=='mara'||c.mara.asking!=='none'||!!c.story.plan||c.story.maraReported)||s.panel==='sol'&&c.story.solChoice!=='none'||s.panel==='bakery'&&c.bakery.stage!=='arrival');
 const source=s.panel==='sol'&&c.story.records.sol||dockFirst||committed||s.panel==='report'||s.panel==='mara'&&!remoteAccount&&c.story.phase!=='planning'?null:s.panel==='birdTalk'?sources.story:s.panel&&s.panel in sources?sources[s.panel as SourceId]:null;
 const focusedStory=!!source&&(['story','empty','picnic','duet'].includes(source.id)||source.id==='sol'&&remoteAccount);
 function paragraph(text:string,index:number,id:string){
  let wordIndex=0,cursor=0;
  return <div className="g-source-part" key={id+index}>{id in sources&&sourceVoice(id as SourceId,index,c)&&<p className="g-source-voice">{sourceVoice(id as SourceId,index,c)}</p>}<p data-source-component={sourcePrefix(id,c)+(index+1)} {...speechAttributes({text,origin:'authored-display',owner:c.runId+':'+readingKey,...(id in sources?{source:{id,paragraph:index,edition:editionOf(c),...(maintenanceOf(c)?{maintenanceEdition:maintenanceOf(c)!}:{}),start:0,end:text.length}}:{})})}>
   {text.split(/([A-Za-z]+(?:['’][A-Za-z]+)?)/g).map((token,i,parts)=>{
    const offset=cursor;cursor+=token.length;if(!/^[A-Za-z]/.test(token))return token;
    const n=wordIndex++,sentence=sentenceAt(text,offset).text;
    const trailing=parts[i+1]?.match(/^[.,!?";:]+/)?.[0]??'';if(trailing){parts[i+1]=parts[i+1]!.slice(trailing.length);cursor+=trailing.length;}
    const phrase=word?.component===id+index?wordHelp(word.word,word.sentence).phrase:null,phraseStart=phrase?text.indexOf(phrase):-1;
    return <span className={'g-word-token '+(phrase&&offset>=phraseStart&&offset<phraseStart+phrase.length?'g-phrase-highlight':'')} key={i} data-source-word={sourcePrefix(id,c)+(index+1)+'.W'+(n+1)}><button className={'g-word '+(['obligation','secure','hesitated','mended','promised'].includes(normalize(token))?'g-focus-word':'')} tabIndex={n===0?0:-1}
     onClick={e=>{stopAudio();setWord({word:token,sentence,button:e.currentTarget,component:id+index,...(id in sources?{source:id}:{draft:text}),paragraph:index,start:offset,end:offset+token.length});store.send({type:'HELP_USED',id:'word:'+id+':'+normalize(token)});}}
     onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();e.stopPropagation();const buttons=Array.from(e.currentTarget.closest('p')!.querySelectorAll<HTMLButtonElement>('.g-word'));const next=buttons[buttons.indexOf(e.currentTarget)+(e.key==='ArrowRight'?1:-1)];next?.focus();}}}>{token}</button>{trailing}</span>;
   })}
  </p></div>;
 }
 function trap(e:React.KeyboardEvent){if(!s.panel||e.key!=='Tab')return;const nodes=Array.from(e.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled):not([tabindex="-1"]),input,textarea,select,summary,a[href]')).filter(n=>n.offsetParent!==null&&!n.closest('[inert]'));const first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}
 const helpCard=word?supportedWordHelp(word.word,word.sentence,(word.source==='duet'&&!word.title)||(c.exposed.includes(sourcePrefix('duet',c)+'4')&&c.exposed.includes(sourcePrefix('duet',c)+'5')),word.title,!word.source&&!word.title):null;
 const objective=chapterGoal(c),{goal,next}=objective;
 const construct=s.mode==='arrange'&&!s.panel&&!s.activity,disabled=!!s.action||s.viewLost||s.background||s.save==='conflict',readingOnly=!!s.activity||s.mode==='boat'||s.mode==='mara-story'||remoteAccount;
 const bakeryContext=!s.activity&&s.mode!=='mara-story'&&s.mode!=='boat'&&c.started&&c.story.phase==='planning'&&!bakeryReady(c)&&(nearBakery(c)||c.bakery.stage==='escorting');
 const bakeryActive=!s.panel&&bakeryContext;
 const gatheringActive=!s.panel&&s.mode==='walk'&&connectedGathering(c)&&(c.story.phase==='arriving'||!!c.gathering.turn||gatheringAction(s.action?.kind??''));
 const renderText=(line:SpokenLine)=><ReadingParagraph origin={line.origin??'authored-display'} speech={{text:line.text,speaker:voiceSpeaker(line.who),origin:line.origin??'authored-display',revision:c.revision,owner:c.runId+':'+readingKey,...(line.source?{source:{id:line.source,paragraph:line.paragraph??0,edition:editionOf(c),...(maintenanceOf(c)?{maintenanceEdition:maintenanceOf(c)!}:{}),start:0,end:line.text.length}}:{})}}>{line.text}</ReadingParagraph>;
 const backLabel=readerReturnLabel(s);
 const description=sceneDescription(s),gatheringHelp=s.mode==='mara-story'?null:gatheringInstruction(c);
 function showHint(text:string,id:string){setHintNotice(text);store.send({type:'HELP_USED',id});store.send({type:'NOTICE',text});}
 function pointToNext(){const id=objective.target,marker=document.querySelector<HTMLElement>('.garden-scene [data-garden-marker="'+id+'"]');marker?.classList.add('is-pointed');setTimeout(()=>marker?.classList.remove('is-pointed'),3000);showHint(id==='sol'?(solAtWorkshop(c)?'Sol’s workshop is beyond the bench.':'Sol is helping Rina at the bakery. Follow the path to the right, past his workshop.'):id==='mara'?'Mara is at the passenger dock until she has finished work.':id==='sections'?'The wooden bridge pieces are beside the river.':id==='lanterns'?'The lantern flowers around the planting circle hold the garden’s stories.':'Grandma is beside the planting circle.','where-next');}
 function crossingHint(){showHint(s.gesture||s.preview?'Release to place the object, or press Escape to return it to its previous position.':c.joined&&riverHalf(bridgeCenter(c).z)>1.55?"The sections won't reach across here. Look along the river for a place where the banks are closer together.":bridgeStatus(c),'crossing-hint');}
 const practicePart=(text:string,id:string,opener?:HTMLElement,origin:ReadingOrigin='authored-display',title?:string,modelSpeech?:SpeechRequest)=>{if(origin==='authored-display')text=narrativeLine(c,text);practiceFocus.current=opener??document.activeElement as HTMLElement;stopAudio();setReadingTarget({text,id,origin,...(title?{title}:{}),...(modelSpeech?{modelSpeech}:{})});};
 const shownParagraphs=source?source.paragraphs.map((text,index)=>({text,index})).filter(({index})=>s.panel==='birdTalk'?index<=(isLiterary(c)?3:5):conversation?conversationParts[conversation][Math.min(conversationPart!,conversationParts[conversation].length-1)]!.some(i=>i===index):true):[];
 const renderSource=(id:SourceId,index?:number)=>sources[id].paragraphs.flatMap((p,i)=>index===undefined||index===i?[paragraph(p,i,id)]:[]);
 const feedback=s.notice||(s.mode==='mara-story'?birdInstruction(s):bakeryActive?bakeryInstruction(s):s.activity?s.activity.kind==='ending-rehearsal'?'Choose these words for Sol, or return to your draft.':s.activity.kind==='lantern-inspect'?'Read this flower’s story with help, or return to Pip.':s.activity.kind==='ending-presentation'?'Loop plays the whole story. Pause, replay or open the full text with reading help.':'Confirm this plan with Grandma, or return to change it.':next),isHint=!!hintNotice&&hintNotice===s.notice;
 return <NarrativeReadingContext.Provider value={editionOf(c)}><ReadingContext.Provider value={s.panel?{word:target=>{stopAudio();setWord(target);store.send({type:'HELP_USED',id:'word:dialogue:'+normalize(target.word)});},speak,practice:practicePart,compose:(text,id,opener,onTranscript)=>{practiceFocus.current=opener;stopAudio();setReadingTarget({text,id,origin:'mixed-display',onTranscript});},stop:stopAudio,speaking}:null}><main className={'garden-app g-adaptive-reader '+(c.largeText?'garden-large ':'')+(c.largestText?'garden-largest ':'')+(c.roomierText?'garden-roomier ':'')+(c.reducedMotion?'garden-reduced-motion ':'')+(s.panel?'has-reader ':'')+(s.panel==='opening'?'reader-opening ':'')+(s.panel==='writing'?'reader-writing ':focusedStory?'reader-story ':'')+(!c.started?'in-studio':'')} role={s.panel?'dialog':undefined} aria-modal={s.panel?true:undefined} aria-labelledby={s.panel?'garden-reader-title':undefined} onKeyDown={trap} onPointerDownCapture={rememberReader} onClickCapture={rememberReader} onSelectCapture={rememberReader} onScrollCapture={rememberReader} onKeyUpCapture={rememberReader}>
  <header className="garden-header"><a href="/garden" className="garden-brand" aria-label="Garden Adventure" inert={!!s.panel} aria-hidden={!!s.panel}><span className="garden-seal"><Icon kind="leaf"/></span><span>Evidence Quest<span className="garden-brand-sub">THE GARDEN ADVENTURE</span></span></a>
   <div className="garden-header-right"><span className="g-save" hidden={demoPresentation} aria-live="polite">{s.save==='saved'&&s.savedRevision>=c.revision?'Saved in this browser':s.save==='saving'?'Saving…':s.save==='loading'?'Opening your adventure…':''}</span>
    <nav className="garden-tools" aria-label={s.panel?'Reading tools':'Game tools'} inert={!!word||!!readingTarget}>
     {(personalGrass||demoPresentation)&&<GameFullscreen/>}
     <button className="g-icon-button" aria-label="Backpack" title="Backpack" onClick={e=>open('backpack',e.currentTarget)} disabled={!c.started||s.panel==='backpack'}><Icon kind="bag"/><span>Backpack</span>{c.page==='pip'&&<i className="g-dot"/>}</button>
     <button className="g-icon-button" aria-label="Observation journal" onClick={e=>open('journal',e.currentTarget)} disabled={!c.started||s.panel==='journal'}><Icon kind="book"/><span>Journal</span></button>
     <button className="g-icon-button" aria-label="Read what’s on screen" title="Reading help for these words and choices" disabled={!c.started||!!s.action||!!s.readingInspection||s.panel==='help'} onClick={e=>inspectScreen(e.currentTarget)}><Icon kind="book"/><span>Read screen</span></button>
     <button className="g-icon-button" aria-label="Help" title="Help" onClick={e=>open('help',e.currentTarget)} disabled={s.panel==='help'}><Icon kind="help"/><span>Help</span></button>
     <button className="g-icon-button" aria-label="Pause" title="Pause" onClick={e=>open('pause',e.currentTarget)} disabled={s.panel==='pause'}><Icon kind="pause"/><span>Pause</span></button>
    </nav>
   </div>
  </header>
  {localReview&&!demoPresentation&&c.started&&<div className="garden-review-tools" ref={setReviewControls} hidden={!!s.panel||!!s.activity||s.mode==='mara-story'} aria-label="Local review controls"><span>{personalGrass?'Personal review':'Local review'} · artwork awaiting review</span></div>}
  {['failed','conflict','damaged','version'].includes(s.save)&&<div className="garden-save-error" role="alert">
   <span>{s.save==='failed'?"Your latest changes haven't been saved yet. Keep this page open and try saving again.":s.save==='conflict'?'Another window has newer progress. Changes here are paused. Loading it keeps a recoverable copy of this adventure.':s.save==='version'?'This saved adventure belongs to a different content version. It has been kept safely.':'The latest save could not be read. Your earlier progress has been kept.'}</span>
   {s.save==='failed'&&<button onClick={()=>void saves.retry()}>Retry save</button>}{s.save==='conflict'&&<button onClick={()=>void saves.takeControl()}>Load latest progress</button>}
   {saves.canRestore()&&['damaged','version'].includes(s.save)&&<button onClick={()=>void saves.restorePrevious()}>Restore previous save</button>}
  </div>}
  {saves.conflictRecovery()?.durable&&<div className="garden-save-error" role="status"><span>A copy of your progress from this window is kept in this browser.</span><button onClick={()=>void saves.recoverConflict()}>Restore my local copy</button></div>}
  {c.started&&!s.panel&&<div className="garden-status garden-feedback" role="status" aria-live="polite" aria-atomic="true">
   <div className="garden-feedback-content" key={feedback}><span className="garden-feedback-icon"><Icon kind={isHint?'help':s.action?'spark':'leaf'}/></span><div><strong>{isHint?'Hint':'What’s happening'}</strong><p>{feedback}</p></div></div>
  </div>}
  <div className={'garden-play-area '+(construct?'is-constructing':s.mode==='boat'?'is-boat':bakeryActive?'is-bakery':gatheringActive?'is-gathering':'')}>
   <div className="garden-world" inert={!!s.panel}>
    {s.mode==='mara-story'&&c.mara.scene?<MaraWorld key={viewKey} s={s} store={store} onError={failView} onRestore={()=>{store.send({type:'VIEW_LOST',lost:false});setViewKey(k=>k+1);}}/>:s.activity?<WorldActivityView s={s} store={store} open={open} speak={speak} audio={audio} speaking={speaking} stopAudio={stopAudio}/>:<>
    {c.started&&<GardenScene key={c.runId+':'+viewKey} store={store} onError={failView} onStatus={setSceneStatus} reviewControls={reviewControls}/>}
    {!c.started&&s.ready&&<FestivalWelcome onBegin={()=>store.send({type:'BEGIN'})} onReadHelp={opener=>open('festival',opener)} disabled={['damaged','version'].includes(s.save)}/>}
    {c.started&&!s.panel&&s.mode!=='workbench'&&s.mode!=='boat'&&s.mode!=='arrange'&&!bakeryActive&&!gatheringActive&&s.action?.kind!=='keepMemory'&&s.action?.kind!=='dockService'&&!(distance(c.pip,solPosition(c))<2.1&&['escorting','done'].includes(c.bakery.stage)&&!gatheringStarted(c))&&<aside className="garden-goal"><Tag>YOUR ADVENTURE</Tag><h1>{goal}</h1><p>{next}</p><button className="g-hint-button" onClick={pointToNext}><Icon kind="help"/> Where is that?</button></aside>}
    {construct&&<div className="garden-director"><Icon kind="spark"/><span>BRIDGE REPAIR</span><span>Release to place. Click the ground or a deck to walk.</span></div>}
    {c.started&&!s.panel&&<span className="garden-location"><span className="g-location-dot"/>{WORLD.regions.find(region=>region.id===regionAt(c.pip))?.name??'Village paths'}</span>}
    {c.started&&!s.panel&&s.mode!=='workbench'&&s.mode!=='boat'&&<details className="garden-access" open={!!s.viewDrafts.disclosures['world-places']} onToggle={e=>store.send({type:'DISCLOSURE',id:'world-places',open:e.currentTarget.open})}><summary>Places & scene description</summary><p>{description}</p><div className="g-row"><button onClick={()=>go('mara')}>Go to Mara</button><button onClick={()=>go('sections')}>Go to the bridge pieces</button><button onClick={()=>go('grandma')}>Go to Grandma</button><button onClick={()=>go('sol')}>Go to Sol</button>{c.crossed&&<button onClick={e=>open('lanterns',e.currentTarget)}>Open lantern stories</button>}{(nearSections||nearGrandma)&&(c.seed!=='pip'||c.crossed)&&<button onClick={()=>store.send({type:'FERRY'})}>Watch the empty seed boat</button>}</div>{c.crossed&&<details open={!!s.viewDrafts.disclosures['world-flowers']} onToggle={e=>store.send({type:'DISCLOSURE',id:'world-flowers',open:e.currentTarget.open})}><summary>Inspect a particular flower</summary><div className="g-row">{lanternIds.filter(id=>id!=='pip'||c.bloomed).map(id=><button key={id} onClick={e=>store.send({type:'INSPECT_LANTERN',lantern:id,focus:captureFocus(e.currentTarget)})}>{lanternRecord(c,id).title} · {lanternRecord(c,id).author}</button>)}</div></details>}</details>}

    </>}
   </div>
   {c.started&&!s.activity&&s.mode!=='mara-story'&&sceneStatus.phase!=='ready'&&<aside className={'garden-scene-status '+(sceneStatus.phase==='failed'||sceneStatus.phase==='recovering'?'is-failed':'')} role={sceneStatus.phase==='failed'?'alert':'status'} aria-live="polite"><strong>{sceneStatus.phase==='failed'?'The garden view needs to reload.':sceneStatus.phase==='recovering'?'Restoring the garden…':'Loading the '+sceneStatus.location+'…'}</strong><p>{sceneStatus.phase==='failed'?'Your adventure and writing are kept. Restore the graphics to continue.':'Pip and the scenery are being prepared. You can read while they load.'}</p>{(sceneStatus.phase==='failed'||sceneStatus.phase==='recovering')&&<><button className="g-primary" onClick={restoreScene}>Restore view</button><details><summary>View details</summary><p>{sceneStatus.cause}</p></details></>}</aside>}
   {gatheringActive&&<GatheringControls s={s} store={store} open={open}/>}
   {c.started&&!s.panel&&<HandControls s={s} store={store}/>}
  {bakeryActive&&<details name="garden-physical-controls" className="garden-alternate-controls"><summary>Bakery directions and other controls</summary><BakeryControls s={s} store={store}/></details>}
   {s.mode==='boat'&&!s.panel&&<BoatControls s={s} store={store}/>}
   {construct&&<details name="garden-physical-controls" className="garden-alternate-controls"><summary>Bridge directions and other controls</summary><aside className="garden-builder" aria-label="Arrange the bridge pieces" aria-busy={!!s.action}>
    <Tag>REPAIR THE FOOTBRIDGE</Tag><h2>Build a little.<br/>Then step forward.</h2><p className="g-builder-instruction">{bridgeStatus(c)}</p><p className="g-small">Six posts and two ropes are beside the repair box. Each rope runs along one side: near bank, center, far bank. The same ropes extend as you build.</p>
    <button className="g-hint-button" onClick={crossingHint}><Icon kind="help"/> Give me a hint</button>
    <button className="g-text-button" onClick={e=>open('sections',e.currentTarget)}><Icon kind="book"/> Read the crossing note</button>
    {(c.west||c.east)&&<button className="g-text-button" disabled={disabled} onClick={()=>store.send({type:'ADJUST'})}>Release ropes to move sections</button>}
    <button className="g-secondary" onClick={()=>store.send({type:'BACK'})}>Back to Pip <Icon kind="arrow"/></button>
   </aside></details>}
   {s.mode==='workbench'&&<WorkbenchControls s={s} store={store}/>}
   {s.panel&&<section className={'garden-reader '+(['writing','lanterns','studio','journal','storyboard'].includes(s.panel)?'g-wide-reader':'')} ref={dialog}>
    <div className="g-reader-top" inert={!!readingTarget||!!word}><Tag>{source?.id==='sol'?'Sol’s original draft':source?.author??(s.panel==='grandma'?'GRANDMA’S GARDEN':s.panel==='help'?'A HAND WHEN YOU NEED IT':'YOUR ADVENTURE')}</Tag><button className="g-close" aria-label={'Close page. '+backLabel} onClick={close}>×</button></div>
    <h2 inert={!!readingTarget||!!word} id="garden-reader-title" tabIndex={-1}>{s.panel==='duet'?<>The Unexpected <button className="g-word g-title-word" onClick={e=>{stopAudio();setWord({word:'Duet',sentence:'The Unexpected Duet',button:e.currentTarget,title:true});store.send({type:'HELP_USED',id:'word:duet:title'});}}>Duet</button></>:({journal:'Observation journal',storyboard:'Moments on Sol’s workbench',festival:'SparkFest and Loop',mara:source?.title??'At Mara’s dock',sol:c.story.records.sol?'A Small Repair':source?.title??'A conversation with Sol',bakery:source?.title??(c.bakery.stage==='done'?'Rina’s thank-you visit':'At Rina’s bakery'),endingWords:'Pip’s adventure',writing:'Finish a story with Sol',planner:'A gathering that works',gathering:'Stories in the garden',lanterns:'The garden’s stories',studio:'Loop’s picture show'}[s.panel as string]??source?.title??(s.panel==='report'?'Tell Grandma what you learned':s.panel==='grandma'?'A visit with Grandma':s.panel==='backpack'?'Pip’s backpack':s.panel==='help'?(s.readingInspection?'Read what’s on screen':'A little help'):s.panel==='complete'?'A promise kept.':'Take your time.'))}</h2>
    <p className="g-reader-context" hidden={!!word||!!readingTarget}>{s.mode==='bakery-repair'?'You direct Sol’s roof repair; Pip waits beside the ladder':s.mode==='mara-story'?'Mara’s earlier story · You guide Mara; Pip stays in the garden':s.activity?.kind==='lantern-inspect'?'Reading help · Return to the same lantern when you are ready':s.activity?.kind==='ending-presentation'?'Reading help · Loop is waiting at this picture':s.activity?'Reading help · Your preview is paused':remoteAccount?'Rereading an earlier account · Pip stays where you left him':s.panel==='festival'?'SparkFest’s story studio · Meet Jo and Loop':s.panel==='backpack'?'Pip’s carried things and their pages':s.panel==='help'||s.panel==='pause'?roleText(s):'Read here, then choose what Pip says or does.'}</p>
    <div className="garden-reading-scroll" inert={!!readingTarget||!!word} ref={scroll} onScroll={e=>{if(readingKey)store.send({type:'READ_POSITION',id:readingKey,position:e.currentTarget.scrollTop});}}>
     <GroupedReadingContext.Provider value={true}><ConversationReadingTools root={scroll}/>
     {(s.panel==='journal'||s.panel==='storyboard')&&<Journal chapter={c} journal={c.journal} readOnly={s.save==='conflict'} mode={s.panel==='storyboard'?'storyboard':'journal'} onChange={command=>store.send({type:'JOURNAL',command})} onReadSource={id=>open(id)} onClose={close}/>}
     {s.panel==='sol'&&canUseWorkbench(s)&&<button className="g-secondary" onClick={()=>store.send({type:'WORKBENCH'})}>Arrange witnessed moments on Sol’s workbench</button>}
     {source&&<><ReadingParagraph className="g-reading-tip"><Icon kind="book"/> Click a word for its meaning and pronunciation.</ReadingParagraph>
      {sourceNarration[source.id]&&<ReadingParagraph className="g-source-context">{sourceNarration[source.id]}</ReadingParagraph>}
      {focusedStory?<PagedSource key={sourcePrefix(source.id,c)} store={store} id={sourcePrefix(source.id,c)} paragraphs={shownParagraphs} render={(text,index)=>paragraph(text,index,source.id)}/>:<div className="garden-passage">{shownParagraphs.map(({text,index})=>paragraph(text,index,source.id))}</div>}
      {s.panel==='mara'&&conversation&&!conversationPending&&<ReadingParagraph className="g-small">Mara’s page is called <em>The Torn Wing</em>. {c.page==='pip'?'Pip is carrying her copy.':c.page==='grandma'?'Grandma has her copy.':''}</ReadingParagraph>}
     </>}
     {audio&&!word&&<ReadingParagraph role="status" className="g-audio-notice">{audio}</ReadingParagraph>}
     {source&&!practice&&(['story','empty','picnic','duet'].includes(source.id)||source.id==='sol'&&remoteAccount)?<StoryReadingTools chapter={c} id={source.id as 'story'|'empty'|'picnic'|'duet'|'sol'}/>:source&&!practice&&!bakeryReplies&&(source.id!=='sol'||conversationPending)&&<div data-reading-command="true" className="g-row g-reading-actions"><button aria-label={speaking?'Stop listening':'Listen to this page'} className="g-text-button" onClick={()=>speaking?stopAudio():speak(speechDocument(shownParagraphs.map(p=>({text:p.text,origin:'authored-display',owner:c.runId+':'+source.id,revision:c.revision,source:{id:source.id,paragraph:p.index,edition:editionOf(c),...(maintenanceOf(c)?{maintenanceEdition:maintenanceOf(c)!}:{}),start:0,end:p.text.length}}))))}><Icon kind="sound"/>{speaking?'Stop listening':'Listen'}</button><button aria-label="Practise reading this page" className="g-text-button" onClick={event=>{practicePart(shownParagraphs[0]!.text,source.id+'-practice',event.currentTarget);store.send({type:'HELP_USED',id:'oral-practice:'+source.id});}}>Practise reading</button></div>}

     {s.panel==='festival'&&<FestivalIntroduction/>}
     {s.panel==='help'&&<button className="g-secondary" onClick={e=>open('festival',e.currentTarget)}>About SparkFest and Loop</button>}
     {dockFirst&&<><Reply who="Mara">A boat is arriving. I need to help these passengers ashore. We can talk when they are safely off the boat.</Reply><ReadingParagraph>Pip waits at the dock while Mara does her work.</ReadingParagraph></>}
     {s.panel==='mara'&&!remoteAccount&&c.story.phase!=='planning'&&<Reply who="Mara">{c.story.plan?.time==='usual'?(c.story.grandmaCopy==='mara'?'Thank you for bringing Grandma’s story. I’ll read it after work.':c.story.phase==='closed'?'I’m still helping passengers here. I’d like to hear how the gathering went.':'I’m still helping passengers. I’ll stay at the dock while you share stories in the garden.'):'I’m glad we found a time when I could join everyone in the garden.'}</Reply>}
     {bakeryReplies&&<BakeryConversation s={s} store={store}/>}
     {s.panel==='sol'&&c.bakery.edition==='earlier-chapter'&&<section className="g-plan-notebook"><h3>Earlier adventure</h3><ReadingParagraph>This save already met Sol before the bakery sequence was added. Its original story is preserved. A new adventure lets you play the repair, baking and visit.</ReadingParagraph><button className="g-secondary" onClick={restart}>Start a new adventure</button></section>}

     {s.panel==='backpack'&&<><ReadingParagraph>Things Pip is carrying.</ReadingParagraph>{c.bakery.tile==='pip'&&<div className="g-item"><span><strong>Rina’s spare roof tile</strong><small>Rina gave permission. Bring this intact tile to Sol.</small></span></div>}{c.bakery.stage==='escorting'&&<ReadingParagraph>Rina carries the thank-you loaf. She is waiting for Pip or walking with him along the bakery path.</ReadingParagraph>}{c.bakery.met&&<button className="g-secondary" onClick={e=>open('bakery',e.currentTarget)}>Read the bakery account</button>}{c.bakery.edition==='earlier-chapter'&&<ReadingParagraph>This saved adventure used the earlier Sol story. Start a new adventure from Pause to play the bakery, roof repair and thank-you visit. This adventure will be archived.</ReadingParagraph>}{s.mode==='mara-story'&&<ReadingParagraph>Pip is waiting in the present garden. Mara’s tape belongs to the earlier story and is not in this backpack.</ReadingParagraph>}{c.mara.returnOffered&&<ReadingParagraph>{c.story.grandmaCopy==='mara'?'Pip delivered Grandma’s actual story to Mara.':c.story.records.grandma&&c.story.plan?.time==='later'?'Mara heard Grandma’s story at the gathering.':'Pip offered to bring Mara a story if she is still working during the gathering.'}</ReadingParagraph>}{c.mara.asking!=='none'&&<section className="g-plan-notebook"><h3>A conversation to follow up</h3><ReadingParagraph>{c.mara.asking==='pending'?'Pip promised to ask Grandma about starting later. He has not asked yet.':'Pip asked Grandma about starting later. She agreed. Invitations and the reader still depend on the actual chosen plan.'}</ReadingParagraph></section>}{ropeCount(c,'pip')>0&&<div className="g-item"><span><strong>{ropeCount(c,'pip')} repair ropes</strong><small>Grandma’s ropes for securing the footbridge.</small></span></div>}{c.seed==='pip'&&<div className="g-item"><Icon kind="leaf"/><span><strong>A lantern seed</strong><small>Plant it with Grandma before dark.</small></span></div>}
      {c.page==='pip'&&<div className="g-item"><Icon kind="book"/><span><strong>The Torn Wing</strong><small>A copy of Mara’s story for Grandma.</small></span><button onClick={e=>open('story',e.currentTarget)}>Read</button></div>}
      <div className="g-item"><Icon kind="book"/><span><strong>Grandma’s letter</strong><small>Written before the storm.</small></span><button onClick={e=>open('opening',e.currentTarget)}>Read</button></div>
      {c.story.grandmaCopy==='pip'&&<div className="g-item"><Icon kind="book"/><span><strong>The Empty Bench</strong><small>Grandma’s copy for Mara.</small></span><button onClick={e=>open('empty',e.currentTarget)}>Read</button></div>}{c.seed!=='pip'&&<ReadingParagraph className="g-muted">{c.seed==='soil'?'The seed is planted in Grandma’s garden.':c.seed==='bed'?'The seed rests in the prepared spot. It still needs its covering of soil.':c.seed==='boat'?'The seed is aboard the small boat.':'Grandma is holding the seed.'}</ReadingParagraph>}{c.page==='grandma'&&<ReadingParagraph className="g-muted">Grandma has Mara’s page now.</ReadingParagraph>}
     </>}
     {s.panel==='help'&&s.readingInspection&&<><ReadingParagraph>These are the words and choices you just saw. Reading them leaves your choices open. Return to the game to act.</ReadingParagraph>{s.readingInspection.text.map((text,index)=><p key={index} data-narration="true"><SpeechWords speech={s.readingInspection!.speech?.[index]??{text,origin:'mixed-display'}}/></p>)}</>}
     {s.panel==='help'&&!s.readingInspection&&<><ReadingParagraph className="g-help-goal">{goal}</ReadingParagraph><h3>Read, then choose</h3><ReadingParagraph>Use Continue conversation to hear more of the conversation. When Pip can reply, choose the words you want him to say. Listen leaves every choice open.</ReadingParagraph><h3>A word you don’t know?</h3><ReadingParagraph>Tap it for its meaning and sound. With a keyboard, Tab to the paragraph, then use the left and right arrows to find a word.</ReadingParagraph><h3>Your writing stays yours</h3><ReadingParagraph>Try my ending lets you look at it first. Use this ending selects those exact words. Back takes you to where you were.</ReadingParagraph><h3>Story so far</h3><ReadingParagraph>Pip promised to plant a lantern seed with Grandma. The storm washed away the footbridge.</ReadingParagraph>
      {conversationReady(c,'mara')&&<ReadingParagraph>Mara explained that her work hours changed. At the usual gathering time, she still has passengers to help.</ReadingParagraph>}
      {!gatheringHelp&&<ReadingParagraph>{description}</ReadingParagraph>}{gatheringHelp?<><h3>At the gathering</h3><ReadingParagraph>{gatheringHelp}</ReadingParagraph></>:<><h3>Making your way</h3>{bakeryContext&&<ReadingParagraph>{bakeryInstruction(s)} Help and Pause stop travel and cancel unplaced tile previews. Rina waits with her loaf when Pip leaves the bakery path.</ReadingParagraph>}{s.mode==='mara-story'&&<ReadingParagraph>{birdInstruction(s)} Help and Pause stop Mara’s travel. A tape preview is canceled; an already placed strip stays where you placed it.</ReadingParagraph>}{s.mode==='boat'&&<ReadingParagraph>You control the seed boat while Pip waits on the bank. Launch it, then click water, use the arrow keys or choose a direction. Go around the rock. The blue landing is where Grandma can receive the seed. To cancel, return to the yellow launch and unload. Help and Pause stop the boat where it is.</ReadingParagraph>}<ReadingParagraph>Click a place to walk there, or use WASD and the arrow keys. Approach a person, then choose Talk or press E.</ReadingParagraph><ReadingParagraph>Drag a bridge section and release to place it. Escape cancels the gesture. Ground and deck clicks walk Pip; drag another object to work on it. Place the two near-bank posts and two center posts, then draw both side ropes to the center posts before stepping onto the first section. From there, connect the second section, place the far posts and extend the ropes. Keyboard and precise controls offer the same placements and turns.</ReadingParagraph></>}
      <button className="g-secondary" onClick={e=>open('opening',e.currentTarget)}>Read Grandma’s letter</button>{conversationReady(c,'mara')&&<button className="g-secondary" onClick={e=>open('mara',e.currentTarget)}>Reread Mara’s account</button>}
     </>}
     {s.panel==='pause'&&<><ReadingParagraph>Your adventure waits while you read, explore or take a break.</ReadingParagraph><label className="g-setting"><input type="checkbox" checked={c.largeText} onChange={e=>store.send({type:'SETTING',key:'largeText',value:e.target.checked})}/> Larger reading text</label><label className="g-setting"><input type="checkbox" checked={c.reducedMotion} onChange={e=>store.send({type:'SETTING',key:'reducedMotion',value:e.target.checked})}/> Reduced motion</label><ReadingParagraph className="g-small">Progress stays in this browser. Starting a new adventure keeps an archive of this one.</ReadingParagraph>
      {c.started&&!isLiterary(c)&&<ReadingParagraph className="g-small">This saved adventure keeps its original telling. Start a new adventure to play the expanded story; this one will be kept in your local archive.</ReadingParagraph>}
      <label className="g-setting"><input type="checkbox" checked={!!c.largestText} onChange={e=>store.send({type:'SETTING',key:'largestText',value:e.target.checked})}/> Largest reading text</label><label className="g-setting"><input type="checkbox" checked={!!c.roomierText} onChange={e=>store.send({type:'SETTING',key:'roomierText',value:e.target.checked})}/> More space between lines</label>
     </>}
     {(!readingOnly||s.panel==='endingWords'||(s.activity?.kind==='lantern-inspect'||remoteAccount)&&s.panel==='sol'&&!!c.story.records.sol)&&<ChapterContent key={s.panel} s={s} store={store} open={open} renderSource={renderSource} renderText={renderText} speak={speak} practice={practicePart}/>}{s.panel==='complete'&&<><div className="g-completion-flower"><Icon kind="leaf"/></div><ReadingParagraph>Pip crossed the river and planted the seed with Grandma. He had kept his promise.</ReadingParagraph><div className="g-success-line"><Icon kind="check"/> The crossing stays open.</div><div className="g-success-line"><Icon kind="check"/> The lantern-flower has taken root.</div><div className="g-success-line"><Icon kind="check"/> Grandma has Mara’s page—and understands why she couldn’t visit.</div><ReadingParagraph className="g-muted">Grandma opens <em>The Torn Wing</em>. There is another story to discover.</ReadingParagraph></>}
     {!readingOnly&&s.panel==='mara'&&<MaraChoices s={s} store={store}/>}
     {s.panel==='birdTalk'&&<Choices label="You are speaking as Mara. Choose your response."><button className="g-primary" onClick={()=>store.send({type:'MARA_STEP',step:'ASK'})}>Would you like some help?</button></Choices>}

     {!readingOnly&&s.panel==='sections'&&<Choices label="What will Pip do next?"><button className="g-primary" disabled={c.crossed} onClick={()=>store.send({type:'ARRANGE'})}>Arrange bridge <Icon kind="arrow"/></button><button className="g-alternative" disabled={!!s.action} onClick={()=>{store.send({type:'BACK'});store.send({type:'FERRY'});}}>{c.seed==='pip'&&!c.crossed?'Load the seed into the boat':'Watch the empty seed boat'}</button></Choices>}
     {s.panel==='complete'&&<Choices label="What would you like to do next?"><button className="g-primary" onClick={close}>Explore the garden</button><button className="g-alternative" onClick={restart}>Play from the beginning</button><button className="g-secondary" onClick={e=>open('story',e.currentTarget)}>Read Mara’s story again</button></Choices>}
     {s.panel==='pause'&&c.started&&<button className="g-alternative" onClick={restart}>Start a new adventure</button>}
     {s.action&&<ReadingParagraph className="g-small" role="status">{s.notice}</ReadingParagraph>}

    </GroupedReadingContext.Provider></div>
     {readingTarget&&<div inert={!!word}><ReadingSession store={store} key={readingTarget.id} text={readingTarget.text} target={readingTarget.id} title={readingTarget.title} origin={readingTarget.origin} onTranscript={readingTarget.onTranscript} modelSpeech={readingTarget.modelSpeech} speak={speak} modelNotice={audio} onClose={closePractice}/></div>}
     {word&&<aside className="garden-word-card" aria-label={'Word help: '+word.word}><div className="g-row"><Tag>WORD EXPLORER</Tag><button aria-label="Close word help" className="g-close" onClick={()=>{stopAudio();setWord(null);requestAnimationFrame(()=>word.button.focus());}}>×</button></div><h3>{helpCard!.title}</h3><p>{helpCard!.definition}</p><DefinitionNarration definition={helpCard!.definition}/>{helpCard!.explanation&&<p className="g-word-context">{helpCard!.explanation}</p>}{(word.source||word.draft)&&helpCard!.explanation===word.sentence&&<AdditionalWordHelp key={word.component+':'+word.start} target={{source:word.source??null,paragraph:word.paragraph!,draft:word.draft??null,revision:c.revision,start:word.start!,end:word.end!,word:word.word,sentence:word.sentence,...(!word.source?{origin:word.origin??'authored-display' as const}:{})}} reviewed={helpCard!.definition} store={store} speak={speak}/>} <div className="g-row"><button data-reading-command="true" className="g-secondary" onClick={()=>hearWordPart(word.word)}><Icon kind="sound"/> Listen to the word</button>{helpCard!.phrase&&<button data-reading-command="true" className="g-secondary" onClick={()=>hearWordPart(helpCard!.phrase!)}>Listen to the phrase</button>}<button data-reading-command="true" className="g-secondary" onClick={()=>hearWordPart(word.sentence)}>{word.title?'Listen to the title':'Listen to the sentence'}</button><button data-reading-command="true" className="g-secondary" onClick={()=>{const text=word.draft??(word.source?sources[word.source as SourceId]?.paragraphs[word.paragraph??0]:word.sentence)??word.sentence;const modelSpeech={...speechFromElement(word.button,text),...(word.source?{source:{id:word.source,paragraph:word.paragraph??0,edition:editionOf(c),...(maintenanceOf(c)?{maintenanceEdition:maintenanceOf(c)!}:{}),start:0,end:text.length}}:{})};practicePart(text,'word-passage',word.button,modelSpeech.origin,undefined,modelSpeech);setWord(null);}}>Practise reading this passage</button>{speaking&&<button className="g-secondary" onClick={stopAudio}>Stop listening</button>}</div>{audio&&<p role="status" className="g-audio-notice">{audio}</p>}<button className="g-primary" onClick={()=>{stopAudio();setWord(null);requestAnimationFrame(()=>word.button.focus());}}>Back to where I was</button></aside>}
    <footer className="g-reader-actions" hidden={!!word||!!readingTarget}>{!readingOnly&&s.panel==='opening'&&!s.panelTrail.some(p=>!!p.panel)&&<button className="g-primary g-start-playing" disabled={sceneStatus.phase!=='ready'} onClick={()=>store.send({type:'START_PLAY'})}>Start playing <Icon kind="arrow"/></button>}<ConversationControls s={s} store={store} close={close} backLabel={backLabel}/></footer>
   </section>}
  </div>
  {c.started&&!s.panel&&!s.activity&&s.mode!=='mara-story'&&<footer className="garden-action-bar">
   <span className="g-world-role">{roleText(s)}</span>
   <div className="garden-nearby" aria-label="Nearby actions">
    {s.mode==='workbench'?<span className="g-small">Move a picture to try a different telling.</span>:gatheringActive?<span className="g-small">Follow the gathering here. Help and Pause keep your place.</span>:bakeryActive?<BakeryActions s={s} store={store}/>:s.mode==='boat'?<span className="g-small">You steer the boat · Pip waits on the bank</span>:s.mode==='arrange'?<span className="g-small">Drag to move · Release to place · Click a deck to walk · Escape to cancel</span>:<>
     {nearMara?<button className="g-primary" disabled={disabled} onClick={e=>talk('mara',e.currentTarget)}>Talk to Mara <kbd>E</kbd></button>:!conversationReady(c,'mara')&&<button className="g-primary" disabled={disabled} onClick={()=>go('mara')}>Go to Mara <Icon kind="arrow"/></button>}
     {nearSections&&!c.crossed?<><button className="g-primary" disabled={disabled} onClick={()=>store.send({type:'ARRANGE'})}>Arrange bridge</button><button className="g-secondary" disabled={disabled} onClick={e=>open('sections',e.currentTarget)}>Read the note</button></>:!c.crossed&&<button className="g-secondary" disabled={disabled} onClick={()=>go('sections')}>Go to the bridge pieces</button>}
     {bridgeAttemptable(c)&&!c.crossed&&<button className="g-primary" disabled={disabled} onClick={()=>store.send({type:'TRY_CROSS'})}>Try crossing the bridge</button>}{nearSol&&!bakeryActive&&<button className="g-primary" disabled={disabled} onClick={e=>talk('sol',e.currentTarget)}>Talk to Sol</button>}{c.crossed&&!nearSol&&!bakeryActive&&<button className="g-secondary" disabled={disabled} onClick={()=>go('sol')}>{gatheringStarted(c)?'Go to Sol':solAtWorkshop(c)?'Go to Sol’s workshop':'Go to Rina’s bakery'}</button>}{bridgeReady(c)&&!nearGrandma&&<button className="g-primary" disabled={disabled} onClick={()=>go('grandma')}>Go to Grandma <Icon kind="arrow"/></button>}
     {nearGrandma&&<button className="g-primary" disabled={disabled} onClick={e=>talk('grandma',e.currentTarget)}>Talk to Grandma <kbd>E</kbd></button>}
     {s.pendingBloom&&<button className="g-secondary" disabled={disabled} onClick={()=>store.send({type:'BLOOM'})}>Touch the sprout to help it grow</button>}
     {c.crossed&&<button className="g-secondary" onClick={e=>open('lanterns',e.currentTarget)}>Lantern stories</button>}{encounterDone(c)&&<button className="g-primary" onClick={e=>open('studio',e.currentTarget)}>Watch your ending</button>}
     {c.story.ending&&<button className="g-alternative" disabled={disabled} onClick={restart}>Play from the beginning</button>}
    </>}
   </div>
  </footer>}
 </main></ReadingContext.Provider></NarrativeReadingContext.Provider>;
}
