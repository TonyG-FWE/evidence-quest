import type {SpeechRequest} from './voiceTypes.js';

/** Space spoken turns without changing the speed or voice of any recording. */
export function readingPause(previous:SpeechRequest,next:SpeechRequest):number{
 if(previous.speaker!==next.speaker)return 650;
 if(previous.source?.paragraph!==next.source?.paragraph||previous.source?.id!==next.source?.id)return 500;
 if(/[.!?]["”’']*\s*$/.test(previous.text))return 420;
 return 220;
}
