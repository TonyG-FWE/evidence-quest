import test from 'node:test';
import assert from 'node:assert/strict';
import {audioWords,matchingWords,pcmWave,slicePcmWave} from './cast-audio-identity.mjs';
test('apostrophes preserve lexical identity while curly typography matches',()=>{
 assert.notDeepEqual(audioWords('ill').map(x=>x.text),audioWords("I'll").map(x=>x.text));
 assert.notDeepEqual(audioWords('well').map(x=>x.text),audioWords("we'll").map(x=>x.text));
 assert.deepEqual(audioWords('we’re').map(x=>x.text),audioWords("we're").map(x=>x.text));
 assert.deepEqual(matchingWords('ill',[{text:"I'll",start:0,end:1}]),[]);
 assert.equal(matchingWords('we’re',[{text:"we're",start:0,end:1}]).length,1);
});
test('PCM slicing preserves only declared interleaved sample frames and naturally ends',()=>{
 const bytes=Buffer.alloc(44+16);bytes.write('RIFF',0);bytes.writeUInt32LE(52,4);bytes.write('WAVEfmt ',8);bytes.writeUInt32LE(16,16);bytes.writeUInt16LE(1,20);bytes.writeUInt16LE(2,22);bytes.writeUInt32LE(48000,24);bytes.writeUInt32LE(192000,28);bytes.writeUInt16LE(4,32);bytes.writeUInt16LE(16,34);bytes.write('data',36);bytes.writeUInt32LE(16,40);for(let i=0;i<8;i++)bytes.writeInt16LE(i*100,44+i*2);
 const clipped=slicePcmWave(bytes,1,3);assert.deepEqual([...clipped.subarray(44)],[...bytes.subarray(48,56)]);assert.equal(pcmWave(clipped).samples,2);assert.equal(clipped.readUInt32LE(4),clipped.length-8);
 assert.throws(()=>slicePcmWave(bytes,0,5),/Invalid exact/);assert.throws(()=>slicePcmWave(bytes,1,1),/Invalid exact/);
});
