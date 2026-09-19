/** Speaker identity belongs to the authored line, not to browser voice ordering. */
export const selectedCast={
 narrator:'07a44a6958304fa28cef60b0d4023c04',pip:'829184c635314c9485e48690116ff8ad',grandma:'9c633ca4a45a4e9ba74cb36cfa21fb00',
 mara:'77c3a0cb23d34557b05732b5bdc97688',sol:'1658d77724074112a04f5aa9d03cc591',rina:'9a9cf47702da476aa4629e2506d4a857',
 boy:'3edf417164514188aaa4765aea98c0d6',jo:'59f2d74a8bf74479b0871a88c85cec3b',
} as const;
export type VoiceSpeaker=keyof typeof selectedCast;
export type ReadingOrigin='authored-display'|'child-draft'|'mixed-display'|'generated-feedback';
export type SpeechSource={id:string;paragraph?:number;start?:number;end?:number;edition?:string;maintenanceEdition?:string};
/** start/end identify this occurrence in the parent request; source offsets identify canonical text. */
export type SpeechRequest={text:string;speaker?:VoiceSpeaker;origin?:ReadingOrigin;revision?:string|number;owner?:string;start?:number;end?:number;source?:SpeechSource;segments?:SpeechRequest[];cacheOnly?:boolean};
export type SpeechInput=string|SpeechRequest;
export type SpeechSpeak=(request:SpeechInput,onDone?:()=>void)=>void;
export type SpeechState='loading'|'playing'|'idle';
export type SpeechHandlers={onDone?:()=>void;onError?:(message:string)=>void;onState?:(state:SpeechState)=>void;isCurrent?:()=>boolean};
export type IndependentCastClip={uri:string;sha256:string;bytes:number;duration:number;sourceSha256:string;sourceWavSha256:string;startSample:number;endSample:number;sampleRate:number;channels:number};
export type CastClip={id:string;text:string;speaker:VoiceSpeaker;voiceId:string;sha256?:string;uri?:string;bytes?:number;duration?:number;batchDuration?:number;start?:number;end?:number;wavUri?:string;wavSha256?:string;wavBytes?:number;sources:string[];clip?:IndependentCastClip};
export type CastAudioManifest={schema:'eq.cast-audio.v1';playback?:'independent-pcm-v1';model:'s2.1-pro-free';speed:number;cast:typeof selectedCast;entries:CastClip[];recordings?:Record<string,{text:string;start:number;end:number}[]>};
export const normalizeSpeech=(text:string)=>text.replace(/\s+/g,' ').trim();
export function voiceSpeaker(who:string|undefined):VoiceSpeaker{const value=who?.toLowerCase().replace(/ says$/,'')??'narrator';return value in selectedCast?value as VoiceSpeaker:'narrator';}
