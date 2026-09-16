import {ReadingParagraph,ReadingTools} from './Reading';
import './festivalWelcome.css';

/** D022/D033 studio framing, clarified by the September 16 owner correction.
 * These illustrations are unchanged originals, not interactive festival rooms. */
export const festivalIntroduction=[
 'At SparkFest, children share stories and show things they have made. The Garden Adventure is one of the stories you can step into.',
 'Meet Loop, our rolling projector. Loop shines pictures onto a screen to bring our paper stories to life.',
 'In this adventure, you guide Pip as he visits Grandma’s garden. Read what people say, choose how Pip responds, and help him decide what to do.',
 'When Pip’s adventure ends, we’ll return here. Loop will show the ending you helped shape.',
] as const;
export const festivalIntroductionText='Jo, story writer: '+festivalIntroduction.join('\n\n');

function CastIllustration(){
 return <figure className="festival-cast-illustration">
  <img src="/art/sparkfest/cast-original.png" alt="The SparkFest group together: four children, Loop the rolling projector, and the paper characters Pip and Grandma." width="1774" height="887" decoding="async"/>
  <figcaption>Meet the SparkFest crew, Loop, Pip and Grandma.</figcaption>
 </figure>;
}

function FestivalCopy(){
 return <div className="festival-introduction-copy">
  <p className="festival-speaker">Jo · story writer</p>
  {festivalIntroduction.map((text,index)=><ReadingParagraph key={text} className={index===1?'festival-loop-copy':''}>{text}</ReadingParagraph>)}
 </div>;
}

/** Reused in the reading panel so the exact welcome has all existing literacy tools. */
export function FestivalIntroduction(){
 return <div className="festival-reading-introduction">
  <CastIllustration/>
  <div className="festival-loop-portrait"><img src="/art/er13/loop-awake-v1.png" width="1125" height="1379" alt="Loop, a small cream and teal rolling projector with one large round lens."/><span>Loop · rolling projector</span></div>
  <FestivalCopy/>
  <ReadingTools text={festivalIntroductionText} label="SparkFest and Loop’s welcome"/>
 </div>;
}

export function FestivalWelcome({onBegin,onReadHelp,disabled=false}:{onBegin:()=>void;onReadHelp:(opener:HTMLButtonElement)=>void;disabled?:boolean}){
 return <section className="festival-welcome" aria-labelledby="festival-welcome-title">
  <div className="festival-illustrations">
   <CastIllustration/>
  </div>
  <div className="festival-welcome-content">
   <header><p className="festival-eyebrow">STORIES & INVENTIONS MADE BY CHILDREN</p><h1 id="festival-welcome-title">Welcome to<br/><em>SparkFest</em></h1></header>
   <div className="festival-loop-portrait"><img src="/art/er13/loop-awake-v1.png" width="1125" height="1379" alt="Loop, the cream and teal rolling projector beside the story screen."/><span>Meet Loop<br/><small>Your rolling projector</small></span></div>
   <FestivalCopy/>
   <div className="festival-welcome-actions">
    <p className="festival-adventure-name">The Garden Adventure</p>
    <p>Help Pip bring new stories to Grandma’s garden.</p>
    <button className="g-primary" onClick={onBegin} disabled={disabled}>Begin Pip’s adventure</button>
    <button className="g-secondary" onClick={event=>onReadHelp(event.currentTarget)}>Read the welcome with help</button>
   </div>
  </div>
 </section>;
}
