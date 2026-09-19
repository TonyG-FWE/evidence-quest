/** Normalize typography only; never erase apostrophes or join different lexical words. */
export const audioWords=text=>[...text.matchAll(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)?/g)].map(match=>({text:match[0].toLowerCase().replace(/’/g,"'"),start:match.index,end:match.index+match[0].length}));
const indexedAlignments=new WeakMap();
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
