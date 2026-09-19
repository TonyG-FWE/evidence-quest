import test from 'node:test';
import assert from 'node:assert/strict';
import {sourcesFor,sourcePrefix,sourceIdsFor,sourceComponentsFor,wordHelp} from '../src/garden/content.js';
import {readingContextOf,type NarrativeContext} from '../src/garden/narrativeEdition.js';
import {validGardenRequest,gardenRequestBody,type GardenRequest} from '../server/garden.js';
import {wordContext,type WordRequest} from '../server/gardenWords.js';

test('Staged note: construction changes instructions without rewriting either narrative edition',()=>{
 for(const narrativeEdition of ['original','literary-20260916'] as const){
  const old={narrativeEdition},staged={narrativeEdition,river:{construction:{version:1}}},before=structuredClone(sourcesFor(old));
  const oldRef=sourcePrefix('sections',old)+'2',newRef=sourcePrefix('sections',staged)+'2';
  assert.notEqual(newRef,oldRef);assert.equal(newRef,'GA.SRC.SECTIONS.STAGED20260916.2');
  assert.equal(sourceComponentsFor(staged).get(oldRef),before.sections.paragraphs[1]);
  assert.equal(sourceComponentsFor(staged).get(newRef),sourcesFor(staged).sections.paragraphs[1]);
  assert.notEqual(sourceComponentsFor(staged).get(newRef),sourceComponentsFor(staged).get(oldRef));
  assert.equal(sourceIdsFor(staged).has(oldRef),false);assert.equal(sourceIdsFor(staged).has(newRef),true);
  assert.deepEqual(sourcesFor(old),before);assert.equal(sourcesFor(staged).story,sourcesFor(old).story);
  assert.deepEqual(readingContextOf(staged),{narrativeEdition,maintenanceEdition:'staged-20260916'});
 }
});

test('Staged note: exact source requests retain old words and reject invented maintenance editions',()=>{
 const context={narrativeEdition:'original',maintenanceEdition:'staged-20260916'} as const;
 const exposed=[sourcePrefix('sections',{narrativeEdition:'original'})+'2',sourcePrefix('sections',context)+'2'];
 const q:GardenRequest={...context,contract:1,requestId:'staged-ref-check',activity:'kept-promise',revision:3,draftRevision:0,text:'Pip secured the first section before stepping onto it.',exposed};
 assert.equal(validGardenRequest(q),true);
 assert.deepEqual(JSON.parse(gardenRequestBody(q,'no-provider').input).sources,exposed.map(id=>({id,text:sourceComponentsFor(context).get(id)})));
 assert.equal(validGardenRequest({...q,maintenanceEdition:'invented'}),false);
 assert.equal(validGardenRequest({...q,maintenanceEdition:undefined,exposed:[exposed[1]!]}),false);
});

test('Staged note: source word offsets and meanings follow the construction instructions',()=>{
 const context:NarrativeContext={narrativeEdition:'literary-20260916',maintenanceEdition:'staged-20260916'},paragraph=2,text=sourcesFor(context).sections.paragraphs[paragraph]!,word='taut',start=text.indexOf(word);
 let end=0;const sentence=text.match(/[^.!?]+[.!?]?/g)!.find(part=>{end+=part.length;return start<end;})!.trim();
 const q:WordRequest={...readingContextOf(context),requestId:'staged-word-check',revision:1,source:'sections',paragraph,draft:null,start,end:start+word.length,word,sentence,disputed:null};
 assert.equal(wordContext(q)?.text,text);assert.equal(wordContext({...q,maintenanceEdition:undefined}),null);
 assert.equal(wordContext({...q,maintenanceEdition:'invented'}),null);
 assert.equal(wordHelp(word,sentence).definition,'Pulled tight without hanging loose.');
 assert.match(wordHelp('Secure',sourcesFor(context).sections.paragraphs[2]!).explanation,/that section/);
});

test('Staged note: recovery vocabulary describes the secured section and retains the archived explanation',()=>{
 const sentence='Keep the secured part in place and recover the loose materials.';
 assert.ok(sourcesFor({maintenanceEdition:'staged-20260916'}).sections.paragraphs[4]!.includes(sentence));
 assert.equal(wordHelp('secured',sentence).explanation,'Fastening both sides holds that section steady before Pip steps onto it.');
 const archived='Secure one end to each bank before anyone walks across.';
 assert.ok(sourcesFor({narrativeEdition:'original'}).sections.paragraphs[1]!.includes(archived));
 assert.equal(wordHelp('Secure',archived).explanation,'Here, you need to fasten one end of the crossing to each riverbank.');
 assert.equal(wordHelp('secure','We’ll need to secure the corners.').explanation,'The stones hold the tablecloth down so the wind cannot lift it.');
});
