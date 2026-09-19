import type {GardenState,GardenStore,Panel} from './model.js';
import {StoryStage} from './StoryStage.js';
import {lanternRecord,performedEnding,presentationScene,contributionCredit} from './lanterns.js';
import {ContinuousPlayback} from './ContinuousPlayback.js';

export function FinaleActivity({s,store,open,speak,audio,speaking,stopAudio}:{s:GardenState;store:GardenStore;open:(panel:Panel,origin?:Element)=>void;speak:(text:string)=>void;audio:string;speaking:boolean;stopAudio:()=>void}){
 const a=s.activity!,c=s.chapter,busy=s.background||s.viewLost;
 if(a.kind==='lantern-inspect'){
  const r=lanternRecord(c,a.lantern);
  return <section className="garden-world-activity" aria-labelledby="world-activity-title" data-world-activity={a.kind} data-lantern={r.id}>
   <header><span className="g-kicker">{r.available?'A STORY KEPT HERE':'A WAITING FLOWER'}</span><h2 id="world-activity-title" tabIndex={-1}>{r.title}</h2><p>{r.available?'By ':'Waiting for '}{r.author}</p></header>
   <StoryStage scene={r.scene} animate={r.available} time={c.reducedMotion?6:a.elapsed/1000}/>
   <div className="g-world-activity-caption"><p>{r.note}</p>{r.contribution&&<><p className="g-small">{contributionCredit(r.contribution)}</p><p className="g-manuscript">{r.contribution.text}</p></>}
    <div className="g-row">{r.page&&<button className="g-primary" disabled={busy} onClick={e=>open(r.page,e.currentTarget)}>Read {r.title} with help</button>}<button className="g-alternative" onClick={()=>store.send({type:'ACTIVITY_BACK'})}>{a.parent.panel==='lanterns'?'Back to the lantern stories':'Back to Pip'}</button></div>
   </div>
  </section>;
 }
 if(a.kind!=='ending-presentation'||!c.story.ending)return null;
 const page=c.story.presentation.page,text=c.story.ending.paragraphs[page]!;
 return <section className="garden-world-activity" aria-labelledby="world-activity-title" data-world-activity={a.kind} data-presentation-mode={a.mode} data-presentation-page={page}>
  <header><span className="g-kicker">{a.mode==='watch'?'LOOP’S PICTURE SHOW':'YOUR NARRATION WITH LOOP'}</span><h2 id="world-activity-title" tabIndex={-1}>The ending of Pip’s adventure</h2><p>{a.mode==='watch'?'Loop plays the whole story and changes the pictures for you.':'Read your whole story aloud while Loop changes the pictures. Pause whenever you need more time.'}</p></header>
  <StoryStage scene={presentationScene(c,page)} animate time={c.reducedMotion?6:a.elapsed/1000}/>
  <div className="g-world-activity-caption"><ContinuousPlayback s={s} store={store}/><p className="g-manuscript" role="status">{text}</p>
   <div className="g-row"><button className="g-secondary" disabled={busy} onClick={e=>open('endingWords',e.currentTarget)}>Read the whole story with help</button><button className="g-alternative" onClick={()=>store.send({type:'ACTIVITY_BACK'})}>Pause · Back to studio</button></div>
  </div>
 </section>;
}
