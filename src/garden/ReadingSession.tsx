import type {SpeechSpeak,SpeechRequest} from './voiceTypes.js';
import {useMemo,useState} from 'react';
import {ReadingPractice} from './ReadingPractice.js';
import {readingPages,readingPlace} from './readingPages.js';
import {sliceSpeech} from './readingSpeech.js';
import type {DisplayOrigin} from './readingReference.js';
import type {GardenStore} from './model.js';
export function ReadingSession({text,target,origin,speak,onClose,modelNotice,store,onTranscript,title,modelSpeech}:{text:string;target:string;title?:string|undefined;modelSpeech?:SpeechRequest|undefined;origin:DisplayOrigin;speak:SpeechSpeak;onClose:()=>void;modelNotice:string;store:GardenStore;onTranscript?:((text:string)=>void)|undefined}){
 const pages=useMemo(()=>readingPages(text),[text]),place=readingPlace(target,text);
 const [index,setIndex]=useState(()=>Math.min(pages.length-1,Math.max(0,Math.floor(store.getSnapshot().chapter.reading[place]??0))));
 function turn(next:number){store.send({type:'READ_POSITION',id:place,position:next});setIndex(next);}
 const page=pages[index]!;
 const pageSpeech=modelSpeech?sliceSpeech(modelSpeech,page.start,page.end):undefined;
 return <ReadingPractice readOnly={store.getSnapshot().save==='conflict'} key={place+':'+index} text={page.text} title={title} target={target+':'+page.start+'-'+page.end} origin={origin} modelSpeech={pageSpeech} speak={speak} onClose={onClose} modelNotice={modelNotice} {...(onTranscript?{onTranscript}:{})} navigation={busy=><div className="g-reading-pages"><p>Page {index+1} of {pages.length}{pages.length>1?' · Your place is saved. Read the whole passage at your own pace.':''}</p>{pages.length>1&&<div className="g-row"><button className="g-secondary" disabled={busy||index===0} onClick={()=>turn(index-1)}>Previous reading page</button><button className="g-secondary" disabled={busy||index===pages.length-1} onClick={()=>turn(index+1)}>Next reading page</button></div>}</div>}/>;
}
