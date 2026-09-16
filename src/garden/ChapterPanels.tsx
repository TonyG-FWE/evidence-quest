import {StoryReadingTools} from './StoryReadingTools.js';
import {ReadingParagraph,ReadWords,ReadingTools,type ReadingOrigin} from './Reading.js';
import {activeConversation,conversationParts,conversationProgress,conversationReady} from './conversation.js';
import {distance,GRANDMA} from './model.js';
import {GatheringReader} from './GatheringPanels.js';
import {connectedGathering,reportedPlan,type SpokenLine} from './gathering.js';
import {useState,type ReactNode} from 'react';
import {lanternIds,lanternRecord,performedEnding,contributionCredit} from './lanterns.js';
import type {GardenStore,GardenState,Panel,SourceId} from './model.js';
import {planProblems,welcome,type EndingScene,type GatheringTime,type Reader,type StoryEvent} from './chapter.js';
import {preparedEndings,chapterSources,endingLines} from './chapterContent.js';
import {StoryStage} from './StoryStage.js';
import {FeedbackActivity} from './FeedbackActivity.js';
import {DraftReader} from './DraftReader.js';
import {captureFocus} from './focus.js';
import {ReadingDetails} from './ReadingDetails.js';
import {Choices,Reply,DialogueNotice} from './Dialogue.js';
import {MaraMessage,DeliveredMaraMessage} from './MaraMessage.js';
export {Choices,Reply} from './Dialogue.js';
type Props={s:GardenState;store:GardenStore;open:(p:Panel,origin?:Element)=>void;renderSource:(id:SourceId,index?:number)=>ReactNode;renderText:(line:SpokenLine)=>ReactNode;speak:(t:string,onDone?:()=>void)=>void;practice:(text:string,id:string,opener?:HTMLElement,origin?:ReadingOrigin)=>void};
export function ChapterContent(props:Props){
 const {s,store,open,renderSource}=props,c=s.chapter,f=c.story;
 const conversation=activeConversation(s),pending=!!conversation&&conversationProgress(c,conversation).part<conversationParts[conversation].length,grandmaPresent=distance(c.pip,GRANDMA)<=1.5;
 const send=(event:StoryEvent)=>store.send({type:'STORY',event,focus:captureFocus()});
 if(s.panel==='writing')return <Writing {...props}/>;
 if(s.panel==='planner')return <Planner {...props}/>;
 if(s.panel==='gathering')return connectedGathering(c)&&(!!c.gathering.turn||!['moment','closing','closed'].includes(f.phase))?<GatheringReader {...props}/>:<Gathering {...props}/>;
 if(s.panel==='studio')return <Studio {...props}/>;
 if(s.panel==='endingWords'&&f.ending)return <><StoryReadingTools chapter={c} id="pip"/><ReadingParagraph>Here is your complete ending. Loop is paused while you read. Return to the show and choose Resume story when you are ready.</ReadingParagraph>{f.ending.paragraphs.map((part,index)=><div key={index}>{renderSource('finale',Object.values(endingLines).findIndex(line=>line===part))}</div>)}</>;
 if(s.panel==='sol'&&f.records.sol){const contribution=performedEnding(c);return <><StoryReadingTools chapter={c} id="sol" version="performed"/><h3>Sol’s original manuscript</h3>{renderSource('sol')}{contribution?<><h3>The ending Sol shared</h3><ReadingParagraph>{contributionCredit(contribution)}</ReadingParagraph>{contribution.origin==='child'?<ReadingParagraph origin="child-draft">{contribution.text}</ReadingParagraph>:renderSource(contribution.scene==='thanks'?'thanksEnding':'breadEnding')}</>:<ReadingParagraph>Sol shared this draft. Its ending is still open.</ReadingParagraph>}</>;}
 if(s.panel==='sol'){
  if(f.phase!=='planning')return <><ReadingParagraph>Sol has brought {f.solOutcome==='draft'?'his unfinished draft':'his story'} to the gathering.</ReadingParagraph><Choices><button className="g-primary" onClick={e=>open('gathering',e.currentTarget)}>Return to the gathering</button></Choices></>;
  if(pending)return null;
  const contributionChoices=<Choices><button className="g-primary" onClick={()=>send({kind:'FINISH_WITH_SOL'})}>Let’s finish the ending together.</button><button className="g-alternative" onClick={()=>send({kind:'BRING_DRAFT'})}>You could read your draft and ask what people want to hear more about.</button></Choices>;
  return <>
   <StoryReadingTools chapter={c} id="sol"/><Reply who="Sol">{f.solChoice==='none'?"I don’t think anyone would want to hear about fixing a roof. I haven’t even written an ending.":f.solChoice==='prepared'?(f.solEnding?.origin==='child'?"I’ll bring your suggested ending and the picture you chose.":"I’ll bring this version to the garden. I’d like people to hear what happened."):"I could try that. I’ll bring my draft and ask what people want to know next."}</Reply>
   {f.solChoice==='none'?contributionChoices:<>
    {f.plan&&f.solInvitation===f.plan.time?<><Reply who="Sol">{f.plan.time==='later'?'Thanks for letting me know. I’ll come after the last boat returns.':'Thanks for letting me know. I’ll come at the usual time.'}</Reply><ReadingParagraph>Sol knows the plan. Return to Grandma after you have also told Mara.</ReadingParagraph></>:f.plan?<Choices label="Tell Sol the plan."><button className="g-primary" onClick={()=>send({kind:'INVITE',who:'sol'})}>{f.plan.time==='later'?'We’re starting after the last boat returns.':'We’re starting at the usual time.'}</button></Choices>:<ReadingParagraph>{f.solReported?'Grandma knows what Sol wants to share. Return to her to plan the gathering.':'Tell Grandma what Sol wants to share. Sol will keep his page in his satchel.'}</ReadingParagraph>}
    <ReadingDetails id="sol-change-contribution" s={s} store={store}><summary>Change what Sol will bring</summary>{contributionChoices}</ReadingDetails>
   </>}
   {f.solInvitation==='later'&&<ReadingDetails id="sol-delivered-invitation" s={s} store={store}><summary>Reread the time you told Sol</summary>{renderSource('notice')}</ReadingDetails>}
   <ReadingDetails id="sol-rain" s={s} store={store}><summary>Ask Sol about the dripping</summary><Reply who="Sol">I stopped the water getting into the bakery. I didn't change the weather. Look at these sentences: “I found a cracked roof tile and replaced it. The dripping stopped.”</Reply></ReadingDetails>
  </>;
 }
 if(s.panel==='grandma'){
  if(f.phase!=='planning')return <><Reply who="Grandma">{f.phase==='arriving'?'Our guests are on their way. Stay with me while they arrive.':f.phase==='closed'?'We found a way to share our stories again.':'Let’s continue sharing our stories.'}</Reply><Choices label="What will Pip do next?"><button className="g-primary" onClick={e=>open('gathering',e.currentTarget)}>{f.phase==='closed'?'After the gathering':'Continue the gathering'}</button>{f.phase==='closed'&&f.plan?.time==='usual'&&f.grandmaCopy==='none'&&<button className="g-alternative" onClick={()=>send({kind:'TAKE_COPY'})}>Take a copy for Mara</button>}{f.closingDone&&<button className="g-primary" onClick={()=>send({kind:'FINISH'})}>Finish the chapter</button>}</Choices></>;
  return <>
   {s.notice.startsWith('Grandma says:')?<DialogueNotice notice={s.notice}/>:<Reply who="Grandma">{c.seed!=='soil'?'You made it! Let’s plant the seed while it’s still light.':f.timeAgreed==='later'?'We’ve agreed to start after the last boat returns. Let’s make sure everyone knows what we’ve planned.':f.maraReported?'Thank you for telling me what kept Mara away. We can work out how to share stories again.':'We kept our promise. What did you find on your way here?'}</Reply>}
   {c.seed!=='soil'&&<ReadingParagraph>{c.seed==='grandma'?'Grandma has the seed from the seed boat. Pip is here now, so they can plant it together.':'Pip is carrying the seed in his backpack. Plant it together in the garden.'}</ReadingParagraph>}
   {c.page==='pip'&&<ReadingParagraph>Pip is carrying Mara’s page, <em>The Torn Wing</em>.</ReadingParagraph>}
   <Choices label="What will Pip do next?">
    {c.seed!=='soil'&&<button className="g-primary" disabled={!!s.action} onClick={()=>store.send({type:'PLANT'})}>Plant the seed with Grandma</button>}
    {conversationReady(c,'mara')&&!f.maraReported&&<button className="g-primary" onClick={e=>open('report',e.currentTarget)}>{c.mara.asking==='pending'?'Tell Grandma what Mara said':'Let’s talk about why Mara stopped visiting.'}</button>}
    {c.page==='pip'&&<button className="g-alternative" disabled={!!s.action} onClick={()=>store.send({type:'REPORT'})}>Give Grandma Mara’s page</button>}
    {f.maraReported&&!f.plan&&f.timeAgreed!=='later'&&<button className="g-alternative" onClick={()=>send({kind:'ASK_LATER'})}>Could we start after the last boat returns?</button>}
    {f.solChoice!=='none'&&!f.solReported&&<button className="g-alternative" onClick={()=>send({kind:'REPORT_SOL'})}>{f.solChoice==='prepared'?"Sol wants to come. We finished his story, and he'd like to read it.":"Sol wants to come. He'd like to read his draft and ask what people want to know next."}</button>}
    {connectedGathering(c)&&f.plan&&f.solInvitation===f.plan.time&&f.maraInvitation?.time===f.plan.time&&f.maraInvitation?.reader===f.plan.reader&&!reportedPlan(c)&&<button className="g-primary" onClick={()=>send({kind:'REPORT_ARRANGEMENTS'})}>Everyone has agreed to our gathering plan.</button>}
    {f.maraReported&&<button className="g-primary" onClick={e=>open('planner',e.currentTarget)}>{f.plan?'Review the gathering plan with Grandma':'Plan the gathering with Grandma'}</button>}
    {c.page==='grandma'&&f.maraReported&&<button className="g-secondary" onClick={e=>open('story',e.currentTarget)}>Read The Torn Wing</button>}
   </Choices>
   <ReadingDetails id="grandma-lanterns" s={s} store={store}><summary>Ask Grandma about the lantern flowers</summary><Reply who="Grandma">The two older lanterns hold stories we shared here: The Windy Picnic and The Unexpected Duet. The other flowers can hold the new stories Mara, Sol and I share. I hope we can bring everyone together again.</Reply><button className="g-secondary" onClick={e=>open('lanterns',e.currentTarget)}>Explore the garden’s lantern stories</button></ReadingDetails>
  </>;
 }
 if(s.panel==='report')return <>
  {!f.maraReported?<><Reply who="Grandma">What did Mara tell you about why she stopped visiting?</Reply><MaraMessage s={s} store={store} atGrandma/></>:<>
   <DeliveredMaraMessage s={s}/>
   {f.maraMessage?.delivered?.mode==='own'&&<section className="g-remembered-account"><h3>Mara’s words at the dock</h3>{renderSource('mara',4)}{renderSource('mara',6)}</section>}
   <Reply who="Grandma">Mara still wants to come, but she is helping passengers when our stories usually begin. I should have asked her what had happened. We could start after the last boat returns.</Reply>
   {f.timeAgreed==='later'&&<><Reply who="Pip">Let’s start after the last boat returns.</Reply><Reply who="Grandma">Yes. That gives Mara time to finish work. We still need to agree who will read and tell our friends the plan.</Reply></>}
   <Choices>
    {!f.plan&&f.timeAgreed!=='later'&&<button className="g-primary" onClick={()=>send({kind:'ASK_LATER'})}>Let’s start after the last boat returns.</button>}
    <button className="g-secondary" onClick={e=>open('planner',e.currentTarget)}>Plan the gathering with Grandma</button>
    {c.page==='grandma'&&<button className="g-alternative" onClick={e=>open('story',e.currentTarget)}>Read The Torn Wing</button>}
   </Choices>
  </>}
  <ReadingDetails id="compare-accounts" s={s} store={store}><summary>Reread what Grandma and Mara said</summary><h3>Grandma’s letter</h3>{renderSource('opening')}<h3>Mara at the dock</h3>{renderSource('mara')}</ReadingDetails>
 </>;
 if(s.panel==='story')return <>
  <ReadingParagraph>{f.records.mara?(f.maraPicture==='promise'?'Mara’s lantern shows the boy holding his sister’s bird.':'Mara’s lantern shows the gift repaired together.'):'Sharing this page with Grandma begins the telling in the game world.'}</ReadingParagraph>
  <Choices label={f.records.mara?'Choose what Mara’s lantern will show.':'What will Pip do next?'}>
   {grandmaPresent&&c.page==='grandma'&&f.maraReported&&f.phase==='planning'&&<button className="g-primary" onClick={()=>send({kind:'SHARE_MARA'})}>{f.records.mara?'Share The Torn Wing again':'Share The Torn Wing with Grandma'}</button>}
   {f.records.mara&&!f.ending&&<><button className="g-primary" aria-pressed={f.maraPicture==='promise'} onClick={()=>send({kind:'MARA_PICTURE',picture:'promise'})}>A promise to his sister</button><button className="g-alternative" aria-pressed={f.maraPicture==='repair'} onClick={()=>send({kind:'MARA_PICTURE',picture:'repair'})}>A gift repaired together</button></>}
  </Choices>
  <ReadingDetails id="bird-reflection" s={s} store={store}><summary>Think about why the boy hesitated</summary><FeedbackActivity store={store} activity="bird-inference" speaker="Grandma" reflective question="Why do you think the boy pulled the bird closer when Mara reached for it?" help="The boy promised his sister he would keep the bird safe. The wing was already torn before Mara reached for it. The story does not tell us exactly what he was thinking." sourceIds={['story']}/></ReadingDetails>
 </>;
 if(s.panel==='picnic')return <ReadingDetails id="picnic-reflection" s={s} store={store}><summary>Think about how they secured the cloth</summary><FeedbackActivity store={store} activity="picnic-secure" speaker="Grandma" reflective question="What does secure mean in this story, and how did they do it?" help="Here, stones hold the cloth in place. At the river, fastenings hold the crossing in place. The wind was still blowing." sourceIds={['picnic','sections']}/></ReadingDetails>;
 if(s.panel==='empty')return <ReadingDetails id="grandma-storm" s={s} store={store}><summary>Did the storm make Mara and Sol stop visiting?</summary><ReadingParagraph>Grandma’s account says their visits had become less frequent before the storm. The storm damaged the bridge afterward. The friends needed both a way across the river and a way to share their stories.</ReadingParagraph></ReadingDetails>;
 if(s.panel==='lanterns'){
  const cards=lanternIds.filter(id=>id!=='pip'||c.bloomed).map(id=>lanternRecord(c,id));
  return <><ReadingParagraph>The two older stories already belong to the garden. The waiting flowers will keep the new stories people share. You can inspect any flower; there is no collection total to complete.</ReadingParagraph><div className="g-lantern-library">{cards.map(card=><article key={card.id}><h3>{card.title}</h3><ReadingParagraph>{card.available?'By ':'Waiting for '}{card.author}</ReadingParagraph><ReadingParagraph>{card.note}</ReadingParagraph><button className="g-primary" onClick={e=>store.send({type:'INSPECT_LANTERN',lantern:card.id,focus:captureFocus(e.currentTarget)})}>{card.available?'Inspect':'Look at'} {card.title}</button>{card.page&&<button className="g-secondary" onClick={e=>open(card.page,e.currentTarget)}>Open {card.title}</button>}{card.contribution&&<><ReadingParagraph>{contributionCredit(card.contribution)}</ReadingParagraph><ReadingParagraph className="g-manuscript" origin={card.contribution.origin==='child'?'child-draft':'authored-display'}>{card.contribution.text}</ReadingParagraph></>}</article>)}</div></>;
 }
 return null;
}
function Writing({s,store,renderSource,speak,practice}:Props){
 const f=s.chapter.story,send=(event:StoryEvent)=>store.send({type:'STORY',event});
 if(f.solChoice==='prepared'&&f.solEnding&&!s.viewDrafts.disclosures['writing-revise'])return <><StoryReadingTools chapter={s.chapter} id="sol"/><Reply who="Sol">{f.solEnding.origin==='child'?'I’ll bring your suggested ending. We can show the part of my story you chose.':'I’ll bring this version to the garden. I’d like people to hear what happened.'}</Reply><section className="g-selected-ending"><h3>The ending Sol will bring</h3><ReadingParagraph className="g-manuscript" origin={f.solEnding.origin==='child'?'child-draft':'authored-display'}>{f.solEnding.text}</ReadingParagraph><ReadingParagraph>{f.solEnding.origin==='child'?'Your suggested ending. These words have not been checked against Sol’s account.':'Prepared ending from Sol’s account.'}</ReadingParagraph></section><ReadingParagraph>Tell Grandma what Sol wants to share, then agree a gathering time with your friends.</ReadingParagraph><Choices label="What will Pip do next?"><button className="g-primary" onClick={()=>store.send({type:'CLOSE'})}>Continue talking with Sol</button><button className="g-secondary" onClick={()=>store.send({type:'DISCLOSURE',id:'writing-revise',open:true})}>Change the ending</button></Choices></>;
 const scene=s.viewDrafts.endingScene,setScene=(value:EndingScene)=>store.send({type:'CHOOSE_ENDING_SCENE',scene:value});
 return <div className="g-writing-workspace"><div className="g-writing-sources"><h3>Sol’s original draft</h3>{renderSource('sol')}<h3>Sol’s account of the visit</h3>{renderSource('later')}<button className="g-secondary" onClick={()=>speak(chapterSources.later.paragraphs[0])}>Hear Sol’s account</button></div><div className="g-writing-desk">
  <label htmlFor="sol-ending">Your ending for Sol’s story</label><ReadingParagraph>{s.chapter.bakery.stage==='done'?'You helped Sol repair the roof, watched Rina bake, and went with her to thank him. Sol’s draft stops before the baking and visit. Add the part you want him to tell. Write as Sol, using “I” for him.':'Sol’s draft stops before the baking and Rina’s visit. Read his further account, then add the part you want him to tell. Write as Sol, using “I” for him.'}</ReadingParagraph>
  <textarea id="sol-ending" value={f.solDraft.text} onChange={e=>send({kind:'EDIT',text:e.target.value})} placeholder="Write your ending here…" rows={6}/>
  <DraftReader store={store} text={f.solDraft.text} revision={f.solDraft.revision} speak={speak} practice={practice}/>
  <FeedbackActivity store={store} activity="sol-ending" speaker="Sol" question="Would you like help with your ending?" help="Fixing the tile kept the flour dry. Rina could bake the bread she had promised. Later, she brought Sol a loaf to thank him. You can choose which part to show." sourceIds={['sol','later']} externalText={f.solDraft.text} onExternalChange={text=>send({kind:'EDIT',text})} onScene={setScene}/>
  <Choices label="Choose the part your picture will show.">{(['bread','thanks','both'] as const).map(v=><button key={v} className="g-secondary" aria-pressed={scene===v} onClick={()=>setScene(v)}>{v==='bread'?'Rina bakes the bread':v==='thanks'?'Rina thanks Sol':'Baking, then the visit'}</button>)}</Choices>
  <button className="g-primary" disabled={!f.solDraft.text.trim()} onClick={e=>store.send({type:'REHEARSE',contribution:{text:f.solDraft.text,scene,revision:f.solDraft.revision,origin:'child'},focus:captureFocus(e.currentTarget)})}>Try my ending</button>
  <ReadingDetails id="prepared-endings" s={s} store={store}><summary>Help me start with a prepared ending</summary><ReadingParagraph>These are prepared words. Your own draft stays in its writing area.</ReadingParagraph>{(['bread','thanks'] as const).map(v=><div key={v}>{renderSource(v==='bread'?'breadEnding':'thanksEnding')}<button className="g-secondary" onClick={e=>store.send({type:'REHEARSE',contribution:{text:preparedEndings[v],scene:v,revision:f.solDraft.revision,origin:'prepared'},focus:captureFocus(e.currentTarget)})}>Try the {v==='bread'?'bread':'thank-you'} ending</button></div>)}</ReadingDetails>
  {f.solEnding&&<div className="g-selected-ending"><h3>Sol’s chosen ending</h3><ReadingParagraph origin={f.solEnding.origin==='child'?'child-draft':'authored-display'}>{f.solEnding.text}</ReadingParagraph><ReadingParagraph>{f.solEnding.origin==='prepared'?'Prepared ending from Sol’s account.':'Your suggested ending. These words have not been checked against Sol’s account.'} Sol will share the version you last chose.</ReadingParagraph></div>}
 </div></div>;
}
function Planner({s,store}:Props){
 const c=s.chapter,f=c.story,{time,reader}=s.viewDrafts.plan??f.plan??{time:f.timeAgreed??'usual' as const,reader:'pip' as const};
 const setTime=(value:GatheringTime)=>store.send({type:'DRAFT_PLAN',time:value,reader}),setReader=(value:Reader)=>store.send({type:'DRAFT_PLAN',time,reader:value}),problems=planProblems(c);
 const options=<>
  <Choices label="When will the gathering start?"><button className="g-primary" aria-pressed={time==='usual'} onClick={()=>setTime('usual')}>At the usual time</button><button className="g-alternative" aria-pressed={time==='later'} onClick={()=>setTime('later')}>After the last boat returns</button></Choices>
  <Choices label="Who will share The Torn Wing?"><button className="g-primary" aria-pressed={reader==='pip'} onClick={()=>setReader('pip')}>Pip reads Mara’s story</button><button className="g-alternative" aria-pressed={reader==='mara'} onClick={()=>setReader('mara')}>Mara tells her story</button></Choices>
  <button className="g-secondary" onClick={e=>store.send({type:'PREVIEW_PLAN',time,reader,focus:captureFocus(e.currentTarget)})}>Preview the gathering</button>
 </>;
 return <>{!f.plan?<><Reply who="Grandma">We can keep our usual time or postpone the gathering until the last boat returns. Choose when we should meet and who will read Mara’s story. Then try your plan.</Reply>{options}</>:<>
  <Reply who="Grandma">We’ve chosen our plan. Now let’s make sure our friends know what to expect.</Reply>
  <section className="g-plan-notebook"><h3>The plan you chose</h3><ReadingParagraph>{f.plan.time==='later'?'After the last boat returns':'At the usual time'} · {f.plan.reader==='mara'?'Mara tells her story':'Pip reads Mara’s story'}</ReadingParagraph><ReadingParagraph>Sol: {f.solInvitation===f.plan.time?'knows this time':f.solInvitation?'expects the previous time':'has not heard the time'}.</ReadingParagraph><ReadingParagraph>Mara: {f.maraInvitation?.time===f.plan.time&&f.maraInvitation?.reader===f.plan.reader?'has agreed to this arrangement':'needs to hear this arrangement'}.</ReadingParagraph></section>
  {s.notice&&<DialogueNotice notice={s.notice}/>}
  {problems.length>0?<><h3>Next for Pip</h3><ReadingParagraph>{problems[0]}</ReadingParagraph></>:<ReadingParagraph>Everyone knows the plan. Your friends are ready.</ReadingParagraph>}
  <Choices label="What will Pip do next?">
   {connectedGathering(c)&&!reportedPlan(c)&&f.solInvitation===f.plan.time&&f.maraInvitation?.time===f.plan.time&&f.maraInvitation?.reader===f.plan.reader&&<button className="g-primary" onClick={()=>store.send({type:'STORY',event:{kind:'REPORT_ARRANGEMENTS'}})}>Tell Grandma everyone has agreed</button>}
   {!problems.length&&<button className="g-primary" onClick={()=>store.send({type:'STORY',event:{kind:'BEGIN_GATHERING'}})}>Begin the gathering</button>}
  </Choices>
  <ReadingDetails id="change-gathering-plan" s={s} store={store}><summary>Change the gathering plan</summary>{options}</ReadingDetails>
 </>}</>;
}
function Gathering({s,store,open,renderSource,speak,practice}:Props){
 const c=s.chapter,f=c.story,send=(event:StoryEvent)=>store.send({type:'STORY',event});const [ending,setEnding]=useState<'bread'|'thanks'|null>(null),moment=s.viewDrafts.memoryMoment,setMoment=(moment:'planting'|'gathering')=>store.send({type:'CHOOSE_MEMORY',moment});
 if(f.phase==='planning')return <><ReadingParagraph>The gathering has not begun.</ReadingParagraph><button className="g-primary" onClick={e=>open('planner',e.currentTarget)}>Plan with Grandma</button></>;
 if(f.phase==='welcome')return <><Reply who="Grandma">You helped arrange today's gathering, Pip. Would you like to welcome everyone?</Reply><h3>Pip’s welcome</h3><ReadingParagraph>{welcome(c)}</ReadingParagraph><button className="g-secondary" onClick={()=>speak(welcome(c))}>Hear the welcome</button><button className="g-secondary" onClick={()=>practice(welcome(c),'welcome-'+f.plan!.revision)}>Practise the welcome</button><button className="g-primary" onClick={()=>send({kind:'NEXT_STORY'})}>Start the first story</button></>;
 if(f.phase==='mara')return <><ReadingParagraph className="g-story-status">{f.plan?.reader==='mara'?'Mara tells her story.':f.plan?.time==='usual'?'Pip reads Mara’s page. Mara is still at work.':'Pip reads Mara’s page while Mara listens.'}</ReadingParagraph><h3>The Torn Wing · by Mara</h3>{renderSource('story')}<StoryReadingTools chapter={c} id="story"/>{c.mara.sharedAt!=='gathering'?<button className="g-primary" onClick={()=>send({kind:'SHARE_MARA'})}>Share The Torn Wing</button>:<button className="g-primary" onClick={()=>send({kind:'NEXT_STORY'})}>Invite Sol to share</button>}</>;
 if(f.phase==='sol')return <><Reply who="Pip">{f.solChoice==='prepared'?"Sol and I worked on the ending of his story. He's ready to share it.":"Sol has brought a draft of his story. After he reads it, we can tell him what we'd like to hear more about."}</Reply><StoryReadingTools chapter={c} id="sol"/><h3>A Small Repair · by Sol</h3>{renderSource('sol')}{f.solChoice==='prepared'&&<><StoryStage scene={f.solEnding!.scene}/><h3>{f.solEnding!.origin==='child'?'Sol reads your suggested ending':'The prepared ending Sol chose'}</h3>{f.solEnding!.origin==='child'&&<ReadingParagraph>The picture shows the event you chose. Your suggested words have not been checked against Sol’s account.</ReadingParagraph>}{f.solEnding!.origin==='prepared'?renderSource(f.solEnding!.scene==='thanks'?'thanksEnding':'breadEnding'):<ReadingParagraph className="g-manuscript" origin="child-draft">{f.solEnding!.text}</ReadingParagraph>}<button className="g-secondary" onClick={()=>speak(f.solEnding!.text)}>Hear the ending</button></>}<button className="g-primary" onClick={()=>send({kind:'NEXT_STORY'})}>{f.solChoice==='prepared'?'Listen to Grandma’s story':'Ask Sol about his draft'}</button></>;
 if(f.phase==='discussion')return <>
  {f.questions.length?<Reply who="Sol">{f.questions.at(-1)==='bread'?'Yes. The flour stayed dry, and she baked the bread that day.':'Later, she came to my workshop with a loaf of bread. She brought it to thank me.'}</Reply>:<Reply who="Sol">That's as far as I've written. What would you like to hear about next?</Reply>}
  {ending&&<div className="g-rehearsal"><h3>Try this ending</h3><StoryStage scene={ending} animate/>{renderSource(ending==='bread'?'breadEnding':'thanksEnding')}</div>}
  <Choices label="What would you like Sol to do next?">
   {ending?<><button className="g-primary" onClick={()=>send({kind:'ADD_ENDING',scene:ending})}>Add this ending</button><button className="g-secondary" onClick={()=>setEnding(null)}>Make a different choice</button></>:<>
    {f.questions.map(q=><button key={q} className="g-primary" onClick={()=>setEnding(q)}>End with {q==='bread'?'the bread':'Rina’s visit'}</button>)}
    {!f.questions.includes('bread')&&<button className="g-primary" onClick={()=>send({kind:'ASK_SOL',question:'bread'})}>Was Rina able to bake the bread she promised?</button>}
    {!f.questions.includes('thanks')&&<button className="g-alternative" onClick={()=>send({kind:'ASK_SOL',question:'thanks'})}>Did you hear from Rina again?</button>}
    <button className="g-secondary" onClick={()=>send({kind:'KEEP_DRAFT'})}>Keep the draft as it is</button>
   </>}
  </Choices>
 </>;
 if(f.phase==='grandma')return <>
  {f.solOutcome==='developed'&&<><h3>Sol adds his ending</h3>{renderSource(f.solEnding!.scene==='thanks'?'thanksEnding':'breadEnding')}</>}
  <Reply who="Grandma">What kept you from bringing your story before today?</Reply><Reply who="Sol">I didn't think anyone would want to hear about fixing a roof.</Reply><Reply who="Grandma">I'm glad you shared it with us. I've been writing about the evenings I spent waiting here. I'd like you to hear my story.</Reply>
  <StoryStage scene="bench"/><h3>The Empty Bench · by Grandma</h3>{renderSource('empty')}<StoryReadingTools chapter={c} id="empty"/><button className="g-primary" onClick={()=>send({kind:'NEXT_STORY'})}>Choose a memory for Pip’s lantern</button></>;
 if(f.phase==='moment')return <><Reply who="Grandma">You kept your promise, Pip. We planted the seed together. Which part of today would you like its lantern to show?</Reply><Choices label="Choose the moment you want to keep."><button className="g-primary" aria-pressed={moment==='planting'} onClick={()=>setMoment('planting')}>Planting the seed together</button><button className="g-alternative" aria-pressed={moment==='gathering'} onClick={()=>setMoment('gathering')}>Sharing our stories</button></Choices><ReadingParagraph>{moment==='planting'?'Pip’s flower will show him planting the seed with Grandma.':f.plan?.time==='usual'?'Pip’s flower will show him reading Mara’s story to Sol and Grandma. Mara is at work.':f.plan?.reader==='mara'?'Pip’s flower will show Mara telling her story to Pip, Sol and Grandma.':'Pip’s flower will show Mara listening while Pip reads her story to Sol and Grandma.'} Confirm to place that memory in the flower in the game.</ReadingParagraph><button className="g-primary" onClick={()=>send({kind:'MOMENT',moment})}>Keep this moment</button></>;
 if(f.phase==='closing')return <><ReadingParagraph>{f.plan?.time==='later'?'Grandma wants to thank Mara for staying to listen.':'Mara is still working. Grandma wants her to have the story she just shared.'}</ReadingParagraph><button className="g-primary" onClick={()=>send({kind:'NEXT_STORY'})}>{f.plan?.time==='later'?'Hear Grandma and Mara finish their conversation':'Hear Grandma’s offer for Mara'}</button></>;
 if(f.phase==='closed')return <>{f.closingDone?<><h3>You brought the stories together.</h3><ReadingParagraph>{f.plan?.time==='usual'?'Mara has Grandma’s story. She will read it after the last boat returns.':'Everyone has had a chance to share.'}</ReadingParagraph><button className="g-primary" onClick={()=>send({kind:'FINISH'})}>Finish the chapter</button></>:f.grandmaCopy==='none'?<><Reply who="Grandma">Please take this copy of my story to Mara.</Reply><button className="g-primary" onClick={()=>send({kind:'TAKE_COPY'})}>Take a copy for Mara</button></>:<ReadingParagraph>The copy is in Pip’s backpack. Walk back across the footbridge to Mara and give it to her.</ReadingParagraph>}<button className="g-secondary" onClick={e=>open('lanterns',e.currentTarget)}>Open the lantern stories</button></>;
 return <ReadingParagraph>Your friends are on their way.</ReadingParagraph>;
}
function Studio({s,store,open}:Props){
 const f=s.chapter.story;if(!f.ending)return null;
 return <><StoryReadingTools chapter={s.chapter} id="pip"/><Reply who="Jo">Welcome back to SparkFest’s story studio. Remember Loop, our rolling projector? Loop can now show the ending of the Garden Adventure you just played. Watch the complete show, or read your whole ending aloud while its pictures change.</Reply>
  <Choices label="What would you like to do with your ending?"><button className="g-primary" onClick={e=>store.send({type:'START_PRESENTATION',mode:'watch',focus:captureFocus(e.currentTarget)})}>Watch the ending</button><button className="g-alternative" onClick={e=>store.send({type:'START_PRESENTATION',mode:'narrate',focus:captureFocus(e.currentTarget)})}>Narrate the ending</button><button className="g-secondary" onClick={e=>open('lanterns',e.currentTarget)}>Read the garden’s stories</button><button className="g-secondary" onClick={e=>open(null,e.currentTarget)}>Keep exploring</button></Choices>
  <ReadingParagraph>The show plays from beginning to end. Loop changes the pictures automatically. You can pause, replay, or open the complete text with reading help.</ReadingParagraph>
  {f.presentation.page>0&&(!f.presentation.finished||f.presentation.inProgress)&&<ReadingParagraph>Your place is saved at picture {f.presentation.page+1}. Continue the show, or choose Replay story to start again.</ReadingParagraph>}
  {f.presentation.finished&&<ReadingParagraph>Loop has shown your ending. You can replay it whenever you like.</ReadingParagraph>}
  <ReadingDetails id="promise-reflection" s={s} store={store}><summary>Think about the promise Pip kept</summary><FeedbackActivity store={store} activity="kept-promise" speaker="Jo" reflective question="What does ‘kept his promise’ mean here? What did Pip do that shows it?" help="Pip promised to plant the seed with Grandma. Crossing the river helped him get there, but planting it together is what kept his promise." sourceIds={['opening']}/></ReadingDetails>
 </>;
}
