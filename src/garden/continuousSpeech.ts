import type {GardenState} from './model.js';
import type {SpokenLine} from './gathering.js';
import {editionOf,maintenanceOf} from './narrativeEdition.js';
import {voiceSpeaker,type SpeechRequest} from './voiceTypes.js';

/** The current displayed source identifies the words; the onstage performer keeps the voice. */
export function continuousSpeech(s:GardenState,line:SpokenLine,index:number):SpeechRequest{
 const chapter=s.chapter,maintenance=maintenanceOf(chapter);
 return {text:line.text,speaker:voiceSpeaker(line.who),origin:line.origin??'authored-display',
  revision:chapter.gathering.turn?.contribution?.revision??chapter.story.solDraft.revision,
  owner:chapter.runId+':playback:'+s.playback?.key+':'+index,
  ...(line.source?{source:{id:line.source,paragraph:line.paragraph??0,edition:editionOf(chapter),
   ...(maintenance?{maintenanceEdition:maintenance}:{}),start:0,end:line.text.length}}:{})};
}
