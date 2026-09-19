import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {initialGarden,GardenStore,type Chapter} from '../src/garden/model.js';
import {sources,sourcesFor,sourcePrefix,preparedEndingsFor,wordHelp} from '../src/garden/content.js';
import {editionOf,narrativeEditions} from '../src/garden/narrativeEdition.js';
import {narrativeLine,narrativeDialogue} from '../src/garden/narrativeDialogue.js';
import {conversationPartsFor,sourceVoice} from '../src/garden/conversation.js';
import {completeStory} from '../src/garden/storyReading.js';
import {turnLines} from '../src/garden/gathering.js';
import {readingPages} from '../src/garden/readingPages.js';
import {validChapter,unpack,checksum} from '../src/garden/persistence.js';
import {validGardenRequest,gardenRequestBody,type GardenRequest} from '../server/garden.js';
import {wordContext,type WordRequest} from '../server/gardenWords.js';

const captures=JSON.parse(readFileSync('evidence/group-7-review-20260915/group-6-migration-inputs.json','utf8').replace(/^\uFEFF/,'')) as {cases:{name:string;envelope:{payload:Chapter}}[]};

test('Narrative edition: authentic earlier saves retain corpus, reading positions and exact contributions',()=>{
 for(const item of captures.cases){
  const c=structuredClone(item.envelope.payload),before=JSON.stringify(c);
  assert.equal(c.narrativeEdition,undefined,item.name);
  const raw={format:1,content:c.content,revision:c.revision,writer:'narrative-preservation-test',payload:c,checksum:checksum(JSON.stringify(c))};
  const restored=unpack(raw)!;assert.ok(restored,item.name);
  // Layout/construction migrations may add committed physical state; they must
  // not silently migrate this adventure to different narrative words.
  assert.equal(editionOf(restored.payload),'original');
  for(const id of ['opening','mara','story','sol','later','empty','picnic','duet'] as const)assert.deepEqual(sourcesFor(restored.payload)[id],sources[id],item.name+': '+id);
  assert.deepEqual(restored.payload.reading,c.reading);assert.deepEqual(restored.payload.exposed,c.exposed);
  assert.deepEqual(restored.payload.story.solDraft,c.story.solDraft);assert.deepEqual(restored.payload.story.solEnding,c.story.solEnding);
  assert.deepEqual(restored.payload.gathering.solPerformed,c.gathering.solPerformed);
  assert.deepEqual(turnLines(restored.payload),turnLines(c));assert.equal(JSON.stringify(c),before);
 }
 const c=initialGarden('new-literary-adventure').chapter;
 assert.equal(c.narrativeEdition,'literary-20260916');assert.ok(validChapter(c));
 assert.notEqual(sourcesFor(c).story.paragraphs,sources.story.paragraphs);
 assert.equal(validChapter({...c,narrativeEdition:'invented'}),false);
});

test('Narrative edition: client and server bind paragraph and word IDs to the selected corpus',()=>{
 for(const narrativeEdition of narrativeEditions){
  const c=initialGarden('edition-refs-'+narrativeEdition).chapter;c.narrativeEdition=narrativeEdition;
  const store=new GardenStore(initialGarden('bootstrap'),()=> 'test');
  store.send({type:'BOOT',chapter:c});store.send({type:'BEGIN'});
  const prefix=sourcePrefix('opening',c),other=sourcePrefix('opening',{narrativeEdition:narrativeEdition==='original'?'literary-20260916':'original'});
  store.send({type:'EXPOSE',id:other+'1'});assert.deepEqual(store.getSnapshot().chapter.exposed,[]);
  for(const id of [prefix+'1',prefix+'1.W1'])store.send({type:'EXPOSE',id});
  assert.deepEqual(store.getSnapshot().chapter.exposed,[prefix+'1',prefix+'1.W1']);
  const q:GardenRequest={contract:1,requestId:'edition-test',activity:'sol-ending',revision:1,draftRevision:0,text:'The flour stayed dry.',exposed:[sourcePrefix('sol',c)+'1'],narrativeEdition};
  assert.ok(validGardenRequest(q));
  assert.deepEqual(JSON.parse(gardenRequestBody(q,'no-live-provider').input).sources,[{id:q.exposed[0],text:sourcesFor(c).sol.paragraphs[0]}]);
  assert.equal(validGardenRequest({...q,exposed:[sourcePrefix('sol',{narrativeEdition:narrativeEdition==='original'?'literary-20260916':'original'})+'1']}),false);
  assert.equal(validGardenRequest({...q,narrativeEdition:'invented'}),false);
 }
});

test('Narrative edition: word requests resolve exact new offsets and reject a different edition',()=>{
 for(const narrativeEdition of narrativeEditions){
  const c={narrativeEdition},text=sourcesFor(c).opening.paragraphs[0]!,word=text.match(/[A-Za-z]+/)![0],start=text.indexOf(word);
  const q:WordRequest={requestId:'edition-word',revision:1,source:'opening',paragraph:0,draft:null,start,end:start+word.length,word,sentence:text.match(/[^.!?]+[.!?]?/)![0].trim(),disputed:null,narrativeEdition};
  assert.equal(wordContext(q)?.text,text);
  assert.equal(wordContext({...q,narrativeEdition:narrativeEdition==='original'?'literary-20260916':'original'}),null);
  assert.equal(wordContext({...q,narrativeEdition:'invented'}),null);
 }
 assert.match(wordHelp('hesitated','He hesitated, then lifted it.',true).explanation,/flute/);
 assert.doesNotMatch(wordHelp('hesitated','He hesitated, then lifted it.',true).explanation,/bird/);
 assert.equal(wordHelp('hand','Someone may need a hand with that last step.').phrase,'a hand');
 assert.equal(wordHelp('drew','When he drew breath, the whistle carried on for a note.').definition,'Breathed in.');
 assert.match(wordHelp('last','On his last visit, Pip held out his palm.').definition!,/most recent/);
 assert.match(wordHelp('too','I used to arrive too late even to hear how they ended.').definition!,/More than/);
 assert.equal(wordHelp('Duet','The Unexpected Duet',false,true).explanation,'');
 assert.match(wordHelp('still','He stood very still, though the boat moved gently against the dock.').definition!,/Not moving/);
});

test('Narrative edition: every expanded story paginates without losing or reordering words',()=>{
 const c=initialGarden('expanded-pages').chapter;
 for(const id of ['story','sol','empty','picnic','duet'] as const){
  const text=completeStory(c,id)!.text,pages=readingPages(text);
  assert.ok(pages.length>=2,id);assert.equal(pages.map(p=>p.text).join(''),text,id);
  assert.ok(pages.every(p=>Array.from(p.text).length<=1800&&p.text.trim().split(/\s+/).length<=110),id);
 }
 assert.deepEqual(conversationPartsFor(c).sol.flat(),[0,1,2,3,4,5]);
 assert.equal(sourceVoice('opening',3,c),'Grandma’s letter');
 assert.equal(sourceVoice('story',3,c),'Mara narrates');
});

test('Narrative edition: display revisions never rewrite saved child or performed words',()=>{
 for(const narrativeEdition of narrativeEditions){
  const c=initialGarden('exact-child-'+narrativeEdition).chapter;c.narrativeEdition=narrativeEdition;
  const text=Object.keys(narrativeDialogue)[0]!,chosen={text,scene:'thanks' as const,origin:'child' as const,revision:2};
  c.story.solChoice='prepared';c.story.solEnding=chosen;c.story.solDraft={text:'A newer unfinished draft.',revision:3};
  assert.ok(completeStory(c,'sol')!.text.endsWith(text));
  c.story.records.sol='thanks';c.gathering.solPerformed=structuredClone(chosen);
  c.story.solEnding={...chosen,text:'A different later selection.'};
  assert.ok(completeStory(c,'sol','performed')!.text.endsWith(text));
  assert.equal(c.story.solDraft.text,'A newer unfinished draft.');
  assert.equal(narrativeLine(c,text),narrativeEdition==='original'?text:narrativeDialogue[text]);
 }
 assert.notEqual(preparedEndingsFor({narrativeEdition:'original'}).thanks,preparedEndingsFor({narrativeEdition:'literary-20260916'}).thanks);
});
