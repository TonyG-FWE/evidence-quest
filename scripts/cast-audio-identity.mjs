/** Normalize typography only; never erase apostrophes or join different lexical words. */
export const audioWords=text=>[...text.matchAll(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)?/g)].map(match=>({text:match[0].toLowerCase().replace(/’/g,"'"),start:match.index,end:match.index+match[0].length}));
const indexedAlignments=new WeakMap();
/** Pronunciation must come from a whole request containing that word alone. */
export function isWholeWordRecording(receipt,text){
 const wanted=audioWords(text),actual=audioWords(receipt.text??'');
 return receipt.purpose==='isolated-word-v1'&&wanted.length===1&&actual.length===1&&wanted[0].text===actual[0].text&&receipt.alignment?.length===1&&audioWords(receipt.alignment[0].text).map(w=>w.text).join(' ')===wanted[0].text;
}
export function completeWordWindow(bytes,receipt,text){
 if(!isWholeWordRecording(receipt,text))throw Error('A sentence fragment cannot supply a complete word recording');
 const pcm=pcmWave(bytes);
 return {startSample:0,endSample:pcm.samples,leadingSilenceSamples:0,trailingSilenceSamples:0,boundaryMethod:'complete-word-recording-v1'};
}
export function matchingWords(text,alignment){
 const wanted=audioWords(text).map(word=>word.text);let indexed=indexedAlignments.get(alignment);
 if(!indexed){const actual=alignment.map(word=>audioWords(word.text));if(actual.some(tokens=>tokens.length!==1)){indexed={words:[],positions:new Map()};}else{const words=actual.map(tokens=>tokens[0].text),positions=new Map();words.forEach((word,index)=>{const list=positions.get(word)??[];list.push(index);positions.set(word,list);});indexed={words,positions};}indexedAlignments.set(alignment,indexed);}
 if(!wanted.length)return [];
 const {words,positions}=indexed,matches=[];
 for(const start of positions.get(wanted[0])??[])if(start+wanted.length<=words.length&&wanted.every((word,index)=>word===words[start+index]))matches.push({wordStart:start,wordEnd:start+wanted.length,start:alignment[start].start,end:alignment[start+wanted.length-1].end});
 return matches.filter(match=>Number.isFinite(match.start)&&Number.isFinite(match.end)&&match.start>=0&&match.end>match.start);
}
export function pcmWave(bytes){
 if(bytes.toString('ascii',0,4)!=='RIFF'||bytes.toString('ascii',8,12)!=='WAVE')throw Error('Not a PCM WAV');
 let format,data;for(let position=12;position+8<=bytes.length;){const type=bytes.toString('ascii',position,position+4),size=bytes.readUInt32LE(position+4),start=position+8;if(start+size>bytes.length)throw Error('Truncated WAV chunk');if(type==='fmt ')format={encoding:bytes.readUInt16LE(start),channels:bytes.readUInt16LE(start+2),sampleRate:bytes.readUInt32LE(start+4),blockAlign:bytes.readUInt16LE(start+12),bits:bytes.readUInt16LE(start+14)};if(type==='data')data={offset:start,length:size};position=start+size+(size%2);}
 if(!format||!data||format.encoding!==1||format.bits!==16||format.channels<1||format.channels>2||format.blockAlign!==format.channels*2||data.length%format.blockAlign)throw Error('Unsupported PCM master');
 return {...format,...data,samples:data.length/format.blockAlign};
}
export function slicePcmWave(bytes,startSample,endSample){
 const pcm=pcmWave(bytes);if(!Number.isSafeInteger(startSample)||!Number.isSafeInteger(endSample)||startSample<0||endSample<=startSample||endSample>pcm.samples)throw Error('Invalid exact PCM interval');
 const data=bytes.subarray(pcm.offset+startSample*pcm.blockAlign,pcm.offset+endSample*pcm.blockAlign),result=Buffer.alloc(44+data.length);
 result.write('RIFF',0);result.writeUInt32LE(36+data.length,4);result.write('WAVEfmt ',8);result.writeUInt32LE(16,16);result.writeUInt16LE(1,20);result.writeUInt16LE(pcm.channels,22);result.writeUInt32LE(pcm.sampleRate,24);result.writeUInt32LE(pcm.sampleRate*pcm.blockAlign,28);result.writeUInt16LE(pcm.blockAlign,32);result.writeUInt16LE(16,34);result.write('data',36);result.writeUInt32LE(data.length,40);data.copy(result,44);return result;
}

/** A word cut needs acoustic boundaries: provider alignment is quantized to roughly 80 ms.
 * Search only near the selected word, bounded by the middles of its neighbours. Never stretch audio. */
export function wordClipWindow(bytes,alignment,match){
 const pcm=pcmWave(bytes),rate=pcm.sampleRate,first=alignment[match.wordStart],last=alignment[match.wordEnd-1];
 const previous=alignment[match.wordStart-1],next=alignment[match.wordEnd],middle=(first.start+last.end)/2;
 const amplitude=sample=>{let sum=0;for(let channel=0;channel<pcm.channels;channel++){const value=bytes.readInt16LE(pcm.offset+sample*pcm.blockAlign+channel*2)/32768;sum+=value*value;}return sum/pcm.channels;};
 function quietBoundary(target,low,high){
  const from=Math.max(0,Math.ceil(low*rate)),to=Math.min(pcm.samples-1,Math.floor(high*rate)),radius=Math.round(rate*.003);
  if(to<from)throw Error('No bounded word boundary');
  let best=Math.min(to,Math.max(from,Math.round(target*rate))),score=Infinity;
  for(let at=from;at<=to;at+=Math.max(1,Math.round(rate*.002))){
   let energy=0,count=0;for(let i=Math.max(0,at-radius);i<Math.min(pcm.samples,at+radius);i++){energy+=amplitude(i);count++;}
   // Prefer nearby quiet cuts over equally quiet distant cuts. No gain change to the retained samples.
   const value=energy/Math.max(1,count)+.000002*Math.abs(at/rate-target)/.12;
   if(value<score){best=at;score=value;}
  }
  return best;
 }
 const startSample=quietBoundary(first.start,Math.max(0,first.start-.12,previous?(previous.start+previous.end)/2:0),Math.min(first.start+.06,middle-.015));
 const endSample=quietBoundary(last.end,Math.max(last.end-.06,middle+.015),Math.min(pcm.samples/rate,last.end+.14,next?(next.start+next.end)/2:pcm.samples/rate));
 if(endSample<=startSample)throw Error('Empty isolated word');
 return {startSample,endSample,leadingSilenceSamples:Math.round(rate*.1),trailingSilenceSamples:Math.round(rate*.18),boundaryMethod:'bounded-word-energy-v1'};
}

/** Add silence around an independently ending word without changing its original PCM samples. */
export function padPcmWave(bytes,leading=0,trailing=0){
 const pcm=pcmWave(bytes);if(![leading,trailing].every(value=>Number.isSafeInteger(value)&&value>=0))throw Error('Invalid PCM silence');
 const result=Buffer.alloc(44+(leading+pcm.samples+trailing)*pcm.blockAlign);
 bytes.copy(result,0,0,44);result.writeUInt32LE(result.length-8,4);result.writeUInt32LE(result.length-44,40);
 bytes.copy(result,44+leading*pcm.blockAlign,pcm.offset,pcm.offset+pcm.length);return result;
}
