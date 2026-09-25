import test from 'node:test';
import assert from 'node:assert/strict';
import {audioWords,matchingWords,pcmWave,slicePcmWave,wordClipWindow,padPcmWave,isWholeWordRecording,completeWordWindow} from './cast-audio-identity.mjs';

test('pronunciation rejects matching words inside sentences and multiword provider requests',()=>{
 const alignment=[{text:'have',start:.2,end:.6}];
 assert.equal(isWholeWordRecording({text:'have.',purpose:'isolated-word-v1',alignment},'Have'),true);
 for(const receipt of [{text:'have.',alignment},{text:'Short for we have.',purpose:'isolated-word-v1',alignment},{text:'M-58 7h116v12H-58Z. Have.',purpose:'isolated-word-v1',alignment},{text:'have.',purpose:'isolated-word-v1',alignment:[...alignment,{text:'it',start:.6,end:.8}]}])assert.equal(isWholeWordRecording(receipt,'have'),false);
 assert.equal(isWholeWordRecording({text:"we'll.",purpose:'isolated-word-v1',alignment:[{text:"we'll",start:0,end:1}]},'well'),false);
});

test('complete-word delivery keeps the entire recording even when alignment misses its edges',()=>{
 const bytes=Buffer.alloc(44+16000*2);bytes.write('RIFF');bytes.writeUInt32LE(bytes.length-8,4);bytes.write('WAVEfmt ',8);bytes.writeUInt32LE(16,16);bytes.writeUInt16LE(1,20);bytes.writeUInt16LE(1,22);bytes.writeUInt32LE(16000,24);bytes.writeUInt32LE(32000,28);bytes.writeUInt16LE(2,32);bytes.writeUInt16LE(16,34);bytes.write('data',36);bytes.writeUInt32LE(32000,40);
 bytes.writeInt16LE(5000,44+1600*2);bytes.writeInt16LE(7000,44+14400*2);
 const receipt={text:'promised.',purpose:'isolated-word-v1',alignment:[{text:'promised',start:.3,end:.7}]},window=completeWordWindow(bytes,receipt,'promised');
 assert.equal(window.startSample,0);assert.equal(window.endSample,16000);assert.equal(window.leadingSilenceSamples+window.trailingSilenceSamples,0);assert.equal(window.boundaryMethod,'complete-word-recording-v1');
 assert.deepEqual(slicePcmWave(bytes,window.startSample,window.endSample),bytes);
 assert.throws(()=>completeWordWindow(bytes,{...receipt,text:'He promised.'},'promised'),/sentence fragment/);
});
test('apostrophes preserve lexical identity while curly typography matches',()=>{
 assert.notDeepEqual(audioWords('ill').map(x=>x.text),audioWords("I'll").map(x=>x.text));
 assert.notDeepEqual(audioWords('well').map(x=>x.text),audioWords("we'll").map(x=>x.text));
 assert.deepEqual(audioWords('we’re').map(x=>x.text),audioWords("we're").map(x=>x.text));
 assert.deepEqual(matchingWords('ill',[{text:"I'll",start:0,end:1}]),[]);
 assert.equal(matchingWords('we’re',[{text:"we're",start:0,end:1}]).length,1);
});

test('word extraction recovers quiet boundaries around a consonant beyond coarse timestamps',()=>{
 const rate=16000,bytes=Buffer.alloc(44+rate*2);bytes.write('RIFF');bytes.writeUInt32LE(bytes.length-8,4);bytes.write('WAVEfmt ',8);bytes.writeUInt32LE(16,16);bytes.writeUInt16LE(1,20);bytes.writeUInt16LE(1,22);bytes.writeUInt32LE(rate,24);bytes.writeUInt32LE(rate*2,28);bytes.writeUInt16LE(2,32);bytes.writeUInt16LE(16,34);bytes.write('data',36);bytes.writeUInt32LE(rate*2,40);
 // Synthetic speech packets: target .285-.645, neighbours ending .22 / starting .72.
 for(let i=0;i<rate;i++){const t=i/rate;if(t<.22||t>=.285&&t<=.645||t>=.72)bytes.writeInt16LE(Math.round(Math.sin(i*.37)*9000),44+i*2);}
 const alignment=[{text:'before',start:0,end:.3},{text:'word',start:.32,end:.6},{text:'after',start:.68,end:1}];
 const window=wordClipWindow(bytes,alignment,{wordStart:1,wordEnd:2});
 assert.ok(window.startSample/rate>.22&&window.startSample/rate<.285);
 assert.ok(window.endSample/rate>.645&&window.endSample/rate<.72);
 const raw=slicePcmWave(bytes,window.startSample,window.endSample),padded=padPcmWave(raw,window.leadingSilenceSamples,window.trailingSilenceSamples),offset=44+window.leadingSilenceSamples*2;
 assert.deepEqual(padded.subarray(offset,offset+raw.length-44),raw.subarray(44));
 assert.ok(padded.subarray(44,offset).every(value=>value===0));assert.ok(padded.subarray(offset+raw.length-44).every(value=>value===0));
 assert.equal(pcmWave(padded).samples,pcmWave(raw).samples+4480);
});
test('PCM slicing preserves only declared interleaved sample frames and naturally ends',()=>{
 const bytes=Buffer.alloc(44+16);bytes.write('RIFF',0);bytes.writeUInt32LE(52,4);bytes.write('WAVEfmt ',8);bytes.writeUInt32LE(16,16);bytes.writeUInt16LE(1,20);bytes.writeUInt16LE(2,22);bytes.writeUInt32LE(48000,24);bytes.writeUInt32LE(192000,28);bytes.writeUInt16LE(4,32);bytes.writeUInt16LE(16,34);bytes.write('data',36);bytes.writeUInt32LE(16,40);for(let i=0;i<8;i++)bytes.writeInt16LE(i*100,44+i*2);
 const clipped=slicePcmWave(bytes,1,3);assert.deepEqual([...clipped.subarray(44)],[...bytes.subarray(48,56)]);assert.equal(pcmWave(clipped).samples,2);assert.equal(clipped.readUInt32LE(4),clipped.length-8);
 assert.throws(()=>slicePcmWave(bytes,0,5),/Invalid exact/);assert.throws(()=>slicePcmWave(bytes,1,1),/Invalid exact/);
});
