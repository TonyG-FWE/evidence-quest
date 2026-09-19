import type {Command,GardenState} from './model.js';
import {finishTurn,turnLines,type SpokenLine} from './gathering.js';
import {leaveActivity} from './interaction.js';

/** Temporary playback owns timing; persisted story facts change only at completed turns. */
export type PlaybackState={key:string;owner:'gathering'|'loop';paused:boolean;mode:'awaiting'|'speech'|'captions';elapsed:number};
export type PlaybackCommand={type:'PLAYBACK';key:string;action:'pause'|'resume'|'replay'|'speech'|'captions'|'advance';index?:number};
export function playbackLines(s:GardenState):SpokenLine[]{
 if(s.chapter.gathering.turn)return turnLines(s.chapter);
 if(s.activity?.kind==='ending-presentation')return (s.chapter.story.ending?.paragraphs??[]).map(text=>({who:'Pip',text}));
 return [];
}
export const playbackIndex=(s:GardenState)=>s.chapter.gathering.turn?.index??s.chapter.story.presentation.page;
export const captionDuration=(text:string)=>Math.max(2500,text.trim().split(/\s+/).length*400+650);
export function syncPlayback(s:GardenState,before:GardenState,command:Command,id:string){
 const owner=s.chapter.gathering.turn?'gathering':s.activity?.kind==='ending-presentation'?'loop':null;
 if(!owner){s.playback=null;return;}
 const fresh=command.type==='BOOT'||!s.playback||s.playback.owner!==owner||owner==='gathering'&&(!before.chapter.gathering.turn||before.chapter.gathering.turn.kind!==s.chapter.gathering.turn!.kind||before.chapter.gathering.turn.question!==s.chapter.gathering.turn!.question)||owner==='loop'&&before.activity?.id!==s.activity?.id;
 if(fresh)s.playback={key:id,owner,paused:command.type==='BOOT',mode:owner==='loop'&&s.activity?.kind==='ending-presentation'&&s.activity.mode==='narrate'?'captions':'awaiting',elapsed:0};
 const p=s.playback!;
 if(s.panel||s.background||s.viewLost)p.paused=true;
 if(playbackIndex(s)!==playbackIndex(before))p.elapsed=0;
}
function advance(s:GardenState){
 const p=s.playback;if(!p)return;
 if(p.owner==='gathering'){
  const turn=s.chapter.gathering.turn;if(!turn)return;
  if(turn.index<turnLines(s.chapter).length-1)turn.index++;else finishTurn(s);
 }else{
  const presentation=s.chapter.story.presentation;
  if(presentation.page<3){presentation.page++;if(s.activity)s.activity.elapsed=0;}
  else{presentation.finished=true;presentation.inProgress=false;leaveActivity(s);}
 }
 p.elapsed=0;
}
export function controlPlayback(s:GardenState,command:PlaybackCommand,id:string){
 const p=s.playback;
 if(!p||p.key!==command.key)return;
 if(command.action==='pause'){p.paused=true;return;}
 if(s.panel||s.background||s.viewLost)return;
 if(command.action==='advance'){
  if(!p.paused&&command.index===playbackIndex(s))advance(s);
  return;
 }
 if(command.action==='replay'){
  p.key=id;p.paused=false;p.elapsed=0;
  if(p.owner==='gathering')s.chapter.gathering.turn!.index=0;
  else{s.chapter.story.presentation.page=0;s.chapter.story.presentation.inProgress=true;if(s.activity)s.activity.elapsed=0;}
 }else if(command.action==='resume'){p.paused=false;p.key=id;}
 else if(command.action==='speech'||command.action==='captions'){p.mode=command.action;p.elapsed=0;}
}
export function tickPlayback(s:GardenState,ms:number){
 const p=s.playback;
 if(!p||p.paused||p.mode!=='captions'||s.panel||s.background||s.viewLost)return;
 const line=playbackLines(s)[playbackIndex(s)];if(!line)return;
 p.elapsed+=ms;
 if(p.elapsed>=captionDuration(line.text))advance(s);
}
