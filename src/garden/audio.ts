/** Model speech is optional; some browsers do not expose this API. */
export function localSpeech():SpeechSynthesis|undefined{return globalThis.speechSynthesis;}
let speechVersion=0;
const cancelObservers=new Set<()=>void>();
export const localSpeechVersion=()=>speechVersion;
export function onLocalSpeechCanceled(observer:()=>void){cancelObservers.add(observer);return()=>{cancelObservers.delete(observer);};}
/** Invalidates queued/late callbacks before asking the browser to cancel. */
export function cancelLocalSpeech(){speechVersion++;cancelObservers.forEach(observer=>observer());localSpeech()?.cancel();}

/** 16-bit mono 16 kHz PCM WAV. Only the current in-memory practice attempt uses this. */
export function wav(samples:Float32Array,rate:number):Uint8Array<ArrayBuffer>{
 const count=Math.min(16000*120,Math.floor(samples.length*16000/rate)),bytes=new Uint8Array(44+count*2),view=new DataView(bytes.buffer);
 const word=(offset:number,text:string)=>{for(let i=0;i<text.length;i++)view.setUint8(offset+i,text.charCodeAt(i));};
 word(0,'RIFF');view.setUint32(4,36+count*2,true);word(8,'WAVE');word(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,16000,true);view.setUint32(28,32000,true);view.setUint16(32,2,true);view.setUint16(34,16,true);word(36,'data');view.setUint32(40,count*2,true);
 for(let i=0;i<count;i++){const position=i*rate/16000,left=Math.floor(position),fraction=position-left,sample=Math.max(-1,Math.min(1,(samples[left]??0)*(1-fraction)+(samples[left+1]??samples[left]??0)*fraction));view.setInt16(44+i*2,Math.round(sample*(sample<0?32768:32767)),true);}return bytes;
}
