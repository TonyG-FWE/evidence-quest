import {useEffect} from 'react';
import type {GardenState,GardenStore,Panel} from './model.js';
import {StoryStage} from './StoryStage.js';
import {FinaleActivity} from './FinaleActivity.js';

/** A world-sized rehearsal view. It cannot move Pip or perform a present-day event. */
export function WorldActivityView({s,store,open,speak,audio,speaking,stopAudio}:{s:GardenState;store:GardenStore;open:(panel:Panel,origin?:Element)=>void;speak:(text:string)=>void;audio:string;speaking:boolean;stopAudio:()=>void}){
 const activity=s.activity!;
 useEffect(()=>{
  let frame=0,last=performance.now();
  const tick=(now:number)=>{const current=store.getSnapshot(),delta=now-last;last=now;
   if(current.activity&&!current.playback?.paused&&(current.activity.elapsed<6000||current.playback&&current.playback.mode==='captions')&&!current.panel&&!current.background&&!current.viewLost)store.send({type:'TICK',ms:delta});
   frame=requestAnimationFrame(tick);
  };
  frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);
 },[store]);
 if(activity.kind==='lantern-inspect'||activity.kind==='ending-presentation')return <FinaleActivity s={s} store={store} open={open} speak={speak} audio={audio} speaking={speaking} stopAudio={stopAudio}/>;
 const ending=activity.kind==='ending-rehearsal',valid=ending||activity.time==='later'||activity.reader==='pip';
 const scene=ending?activity.contribution.scene:!valid?'gather-waiting':activity.time==='usual'?'gather-absent':activity.reader==='mara'?'gather-mara':'gather-listener';
 const text=ending?activity.contribution.text:!valid?'Mara will still be working at the usual time. Start later or choose Pip to read her story.':activity.time==='usual'?'Pip reads Mara’s story while Mara works. Afterward, he takes Grandma’s story to Mara.':activity.reader==='mara'?'Mara finishes helping her passengers, comes to the garden and tells her story.':'Mara joins the garden and listens while Pip reads her story.';
 return <section className="garden-world-activity" aria-labelledby="world-activity-title" data-world-activity={activity.kind}>
  <header><span className="g-kicker">{ending?'REHEARSAL · SOL’S ENDING':'PREVIEW · YOUR GATHERING PLAN'}</span><h2 id="world-activity-title" tabIndex={-1}>{ending?'See the ending you are trying':'See how your plan would work'}</h2><p>{ending?'These are the words and picture you are trying. Pip is still with Sol.':'This shows the plan you are trying. Previewing does not tell your friends.'}</p></header>
  <StoryStage scene={scene} animate time={activity.elapsed/1000} reducedMotion={s.chapter.reducedMotion} active={!s.panel&&!s.background&&!s.viewLost} paused={!!s.panel||s.background||s.viewLost}/>
  <div className="g-world-activity-caption">{ending&&<><h3>{activity.contribution.origin==='child'?'Your suggested ending for Sol':'Prepared ending from Sol’s account'}</h3><p className="g-small">{activity.contribution.origin==='child'?'The picture shows the event you chose. These words stay labeled as your suggested ending.':'These prepared words come from the events in Sol’s account.'}</p></>}<p className={ending?'g-manuscript':''}>{text}</p><p className="g-small">{ending?'Choose Use this ending to select these exact words, or return to your draft.':'Choose Use this plan to agree it with Grandma, or return to change it.'}</p>
   {!ending&&<p className="g-small">Sol: {s.chapter.story.solInvitation===activity.time?'already knows this time':s.chapter.story.solInvitation?'is expecting a different time':'has not been told a time'}. Mara: {s.chapter.story.maraInvitation?.time===activity.time&&s.chapter.story.maraInvitation.reader===activity.reader?'has agreed to this arrangement':s.chapter.story.maraInvitation?'is expecting a different arrangement':'has not been told the arrangement'}.</p>}
   <div className="g-row"><button className="g-primary" disabled={!valid||s.background||s.viewLost} onClick={()=>store.send({type:'ACTIVITY_ACCEPT'})}>{ending?'Use this ending':'Use this plan'}</button><button className="g-alternative" onClick={()=>store.send({type:'ACTIVITY_BACK'})}>{ending?'Back to my ending':'Change the plan'}</button></div>
  </div>
 </section>;
}
