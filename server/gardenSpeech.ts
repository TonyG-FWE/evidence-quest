import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';
import {createHash} from 'node:crypto';
import {sources} from '../src/garden/content.js';
import {endingLines,preparedEndings} from '../src/garden/chapterContent.js';
export interface SpeechRequest {requestId:string;attempt:number;target:string;text:string;audio:string;job:'reading'|'transcript';}
export interface SpeechObservation {word:string;offset:number;duration:number;accuracy:number;phonemes:{sound:string;accuracy:number}[];}
export interface SpeechEvidence {transcript:string;words:SpeechObservation[];}
export interface QualifiedSpeechPolicy {qualificationId:string;wordThreshold:number;minimumCoverage:number;}
export function decodeWav(value:string):Buffer|null{
 if(!/^[A-Za-z0-9+/]*={0,2}$/.test(value)||value.length>5600000)return null;const b=Buffer.from(value,'base64');
 if(b.length<46||b.length>4*1024*1024||b.toString('ascii',0,4)!=='RIFF'||b.toString('ascii',8,12)!=='WAVE'||b.toString('ascii',12,16)!=='fmt '||b.readUInt32LE(16)!==16||b.readUInt16LE(20)!==1||b.readUInt16LE(22)!==1||b.readUInt32LE(4)!==b.length-8||b.readUInt32LE(24)!==16000||b.readUInt32LE(28)!==32000||b.readUInt16LE(32)!==2||b.readUInt16LE(34)!==16||b.toString('ascii',36,40)!=='data'||b.readUInt32LE(40)!==b.length-44||(b.length-44)%2||b.length-44>120*32000)return null;return b;
}
export function targetMatches(q:SpeechRequest){
 if(q.job==='transcript')return q.text==='';
 const display=q.target.match(/^display-(authored-display|child-draft|mixed-display):([a-f0-9]{64})$/);
 if(display)return !!q.text.trim()&&display[2]===createHash('sha256').update(q.text,'utf8').digest('hex');
 if(/^sol-draft-\d+$/.test(q.target))return q.text.trim().length>0&&Array.from(q.text).length<=4000;
 if(q.target.startsWith('ending-'))return Object.values(endingLines).some(t=>t===q.text);
 if(q.target.startsWith('welcome-'))return q.text.startsWith('Welcome back to the garden.')&&q.text.length<600;
 return Object.values(sources).some(s=>q.target===s.id+'-practice'&&q.text===(s.id==='story'?'He hesitated. Then he held out the bird.':s.paragraphs[0]))||q.target==='story-8'&&q.text==='He hesitated. Then he held out the bird.'||Object.values(preparedEndings).some(t=>t===q.text)&&q.target.startsWith('sol-draft-');
}
/** Uses acoustic word/phoneme results. A matching transcript alone never proves pronunciation. */
export function speechFeedback(e:SpeechEvidence,reference:string,policy:QualifiedSpeechPolicy|null){
 if(!policy||!policy.qualificationId||!Number.isFinite(policy.wordThreshold)||policy.wordThreshold<0||policy.wordThreshold>100||!Number.isFinite(policy.minimumCoverage)||policy.minimumCoverage<0||policy.minimumCoverage>1)return {status:'unavailable'};
 const tokens:string[]=reference.toLowerCase().match(/[a-z]+(?:['’][a-z]+)?/g)??[],observed=e.words.filter(w=>tokens.includes(w.word.toLowerCase())&&w.phonemes.length&&Number.isFinite(w.accuracy));
 if(!tokens.length||observed.length/tokens.length<policy.minimumCoverage)return {status:'uncertain',feedback:'I could not hear enough of that part clearly. You can listen back, try a shorter part, or keep going.'};
 const word=observed.find(w=>w.accuracy<policy.wordThreshold&&w.phonemes.some(p=>p.accuracy<policy.wordThreshold));
 return word?{status:'supported',feedback:`Let’s practise “${word.word}.” Listen to the word, then try it in the sentence.`,word:word.word,offset:word.offset,duration:word.duration}:{status:'uncertain',feedback:'You can listen to your reading and compare it with the example. Choose a word or sentence you would like to practise.'};
}
/** No default credentials or admission. Caller must own a coordinated authorized provider attempt. */
export function azureSpeechProvider(key:string,region:string,admit:()=>Promise<boolean>){return async(q:SpeechRequest,bytes:Buffer,signal:AbortSignal):Promise<SpeechEvidence|null>=>{
 if(signal.aborted||!await admit())return null;
 const config=SpeechSDK.SpeechConfig.fromSubscription(key,region);config.speechRecognitionLanguage='en-US';config.outputFormat=SpeechSDK.OutputFormat.Detailed;
 const stream=SpeechSDK.AudioInputStream.createPushStream(SpeechSDK.AudioStreamFormat.getWaveFormatPCM(16000,16,1)),audio=SpeechSDK.AudioConfig.fromStreamInput(stream),recognizer=new SpeechSDK.SpeechRecognizer(config,audio);
 if(q.job==='reading'){const assessment=new SpeechSDK.PronunciationAssessmentConfig(q.text,SpeechSDK.PronunciationAssessmentGradingSystem.HundredMark,SpeechSDK.PronunciationAssessmentGranularity.Phoneme,true);assessment.applyTo(recognizer);}
 return new Promise(resolve=>{
  const evidence:SpeechEvidence={transcript:'',words:[]};let ended=false;const timeout=setTimeout(()=>finish(null),30000),abort=()=>finish(null);
  function finish(result:SpeechEvidence|null){if(ended)return;ended=true;clearTimeout(timeout);signal.removeEventListener('abort',abort);stream.close();recognizer.stopContinuousRecognitionAsync(()=>{recognizer.close();audio.close();resolve(result);},()=>{recognizer.close();audio.close();resolve(null);});}
  signal.addEventListener('abort',abort,{once:true});if(signal.aborted){finish(null);return;}
  recognizer.recognized=(_,event)=>{if(ended||event.result.reason!==SpeechSDK.ResultReason.RecognizedSpeech)return;evidence.transcript+=(evidence.transcript?' ':'')+event.result.text;
   if(q.job!=='reading')return;
   try{const raw=JSON.parse(event.result.properties.getProperty(SpeechSDK.PropertyId.SpeechServiceResponse_JsonResult)) as {NBest?:{Words?:{Word?:string;Offset?:number;Duration?:number;PronunciationAssessment?:{AccuracyScore?:number};Phonemes?:{Phoneme?:string;PronunciationAssessment?:{AccuracyScore?:number}}[]}[]}[]};
    for(const w of raw.NBest?.[0]?.Words??[]){const phonemes=(w.Phonemes??[]).filter(p=>typeof p.Phoneme==='string'&&Number.isFinite(p.PronunciationAssessment?.AccuracyScore)).map(p=>({sound:p.Phoneme!,accuracy:p.PronunciationAssessment!.AccuracyScore!}));if(typeof w.Word==='string'&&w.Word.length<80&&Number.isFinite(w.Offset)&&Number.isFinite(w.Duration)&&Number.isFinite(w.PronunciationAssessment?.AccuracyScore))evidence.words.push({word:w.Word,offset:w.Offset!/10000000,duration:w.Duration!/10000000,accuracy:w.PronunciationAssessment!.AccuracyScore!,phonemes});}
   }catch{finish(null);}
  };
  recognizer.canceled=()=>finish(null);recognizer.sessionStopped=()=>finish(evidence);
  recognizer.startContinuousRecognitionAsync(()=>{if(ended)return;const pcm=Uint8Array.from(bytes.subarray(44));stream.write(pcm.buffer);stream.close();},()=>finish(null));
 });
 };}
export class GardenSpeechService{
 private active=false;private recent=new Set<string>();
 constructor(private provider?:ReturnType<typeof azureSpeechProvider>,private policy:QualifiedSpeechPolicy|null=null){}
 get available(){return !!this.provider&&!!this.policy;}
 async handle(value:unknown,signal:AbortSignal){
  if(!value||typeof value!=='object')return null;const q=value as SpeechRequest;
  if(typeof q.requestId!=='string'||!q.requestId||q.requestId.length>80||!Number.isSafeInteger(q.attempt)||q.attempt<0||typeof q.target!=='string'||q.target.length>160||typeof q.text!=='string'||Array.from(q.text).length>4000||typeof q.audio!=='string'||!['reading','transcript'].includes(q.job)||!targetMatches(q))return null;
  const bytes=decodeWav(q.audio);if(!bytes)return null;const base={requestId:q.requestId,attempt:q.attempt,target:q.target};
  if(!this.provider||q.job==='reading'&&!this.policy)return {...base,status:'unavailable'};
  if(this.active||this.recent.has(q.requestId))return {...base,status:'busy'};
  this.active=true;this.recent.add(q.requestId);try{const evidence=await this.provider(q,bytes,signal);if(!evidence||signal.aborted)return {...base,status:'unavailable'};return q.job==='transcript'?{...base,status:'transcript',text:evidence.transcript.slice(0,4000)}:{...base,...speechFeedback(evidence,q.text,this.policy)};}finally{this.active=false;}
 }
}
