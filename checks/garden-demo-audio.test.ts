import test from 'node:test';
import assert from 'node:assert/strict';
import {sentenceAt,speechDocument} from '../src/garden/readingSpeech.js';
import {routeAuthoredText} from '../src/garden/sourceVoiceRouting.js';
import {sourcesFor} from '../src/garden/content.js';
import {editionOf,maintenanceOf} from '../src/garden/narrativeEdition.js';
import {GardenStore,initialGarden} from '../src/garden/model.js';
import {readingPause} from '../src/garden/speechTiming.js';

test('speaker changes and completed sentences have distinct reading pauses',()=>{
 assert.equal(readingPause({text:'Come before dark.',speaker:'grandma'},{text:'Pip promised.',speaker:'narrator'}),650);
 assert.equal(readingPause({text:'One sentence.',speaker:'pip'},{text:'The next.',speaker:'pip'}),420);
 assert.equal(readingPause({text:'A new page.',speaker:'pip',source:{id:'story',paragraph:0}},{text:'Another page.',speaker:'pip',source:{id:'story',paragraph:1}}),500);
});

test('Opening word help keeps the preceding closing quote out of the narrator sentence',()=>{
 const chapter=initialGarden('demo-audio').chapter,paragraphs=sourcesFor(chapter).opening.paragraphs;
 const paragraph=paragraphs.findIndex(text=>text.includes('Pip had promised'));
 assert.ok(paragraph>=0);
 const text=paragraphs[paragraph]!,at=text.indexOf('promised'),sentence=sentenceAt(text,at);
 assert.equal(sentence.text,'Pip had promised to come before dark today.');
 assert.equal(text.slice(sentence.start,sentence.end),sentence.text);
 const routed=routeAuthoredText(sentence.text,{id:'opening',paragraph,edition:editionOf(chapter),maintenanceEdition:maintenanceOf(chapter)!,start:sentence.start,end:sentence.end});
 assert.ok(routed.every(part=>part.speaker==='narrator'));
 assert.equal(routed.map(part=>part.text).join(''),sentence.text);
});

test('Sentence selection retains quote punctuation and the chosen repeated occurrence',()=>{
 const text='“Come before dark!” Pip smiled. “Come before dark!” Pip smiled.';
 const first=sentenceAt(text,text.indexOf('Come')),last=sentenceAt(text,text.lastIndexOf('smiled'));
 assert.equal(first.text,'“Come before dark!”');
 assert.equal(last.text,'Pip smiled.');assert.equal(last.start,text.lastIndexOf('Pip'));
 assert.equal(sentenceAt('A final unpunctuated thought',8).text,'A final unpunctuated thought');
});

test('Read screen preserves nested source and speaker metadata without changing the world',()=>{
 const store=new GardenStore(initialGarden('inspect-audio'));store.send({type:'BOOT'});store.send({type:'BEGIN'});
 const speech=[speechDocument([{text:'Come before dark.',speaker:'grandma',origin:'authored-display',source:{id:'opening',paragraph:0,start:4,end:21}},{text:'Pip promised.',speaker:'narrator',origin:'authored-display'}]),{text:'I can help.',speaker:'pip' as const,origin:'authored-display' as const}];
 const before=structuredClone(store.getSnapshot().chapter);
 store.send({type:'INSPECT_TEXT',text:speech.map(part=>part.text),speech});
 assert.deepEqual(store.getSnapshot().readingInspection?.speech,speech);
 assert.deepEqual(store.getSnapshot().chapter,before);
 store.send({type:'CLOSE'});assert.equal(store.getSnapshot().readingInspection,undefined);
});
