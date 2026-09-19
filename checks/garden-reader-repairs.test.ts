import test from 'node:test';
import assert from 'node:assert/strict';
import {speechDocument,positionedSpeech,sliceSpeech} from '../src/garden/readingSpeech.js';
import {GardenStore,initialGarden} from '../src/garden/model.js';
import {completeStory,solContributionSpeech} from '../src/garden/storyReading.js';
import {sourcesFor} from '../src/garden/content.js';
import {routeAuthoredText} from '../src/garden/sourceVoiceRouting.js';
import {editionOf,maintenanceOf} from '../src/garden/narrativeEdition.js';

test('Reader pages preserve two identical occurrences with different ownership',()=>{
 const repeated='I repaired the roof.';
 const document=speechDocument([{text:repeated,speaker:'sol',origin:'authored-display',source:{id:'sol',paragraph:0,edition:'literary-20260916',start:10,end:29}},{text:'The middle of the account.',speaker:'narrator',origin:'authored-display'},{text:repeated,speaker:'sol',origin:'child-draft',revision:17,owner:'draft:17'}]);
 const third=document.segments![2]!;
 const page=sliceSpeech(document,third.start!,third.end!);
 assert.equal(page.text,repeated);assert.equal(page.segments?.length,1);assert.equal(page.segments![0]!.origin,'child-draft');assert.equal(page.segments![0]!.revision,17);assert.equal(page.segments![0]!.start,0);assert.equal(page.segments![0]!.owner,'draft:17');
 const first=sliceSpeech(document,2,12);assert.deepEqual(first.segments![0]!.source,{id:'sol',paragraph:0,edition:'literary-20260916',start:12,end:22});
});
test('Legacy segment callers resolve repeated text monotonically and reject invented spans',()=>{
 const request=positionedSpeech({text:'Again.\n\nAgain.',segments:[{text:'Again.',speaker:'pip'},{text:'Again.',speaker:'mara'}]});
 assert.deepEqual(request.segments!.map(part=>part.start),[0,8]);
 assert.equal(sliceSpeech(request,8,14).segments![0]!.speaker,'mara');
 assert.throws(()=>positionedSpeech({text:'Again.',segments:[{text:'Changed.',start:0,end:6}]}),/exact passage/);
});
test('A child ending repeating Sol’s first paragraph stays a distinct final occurrence',()=>{
 const chapter=structuredClone(initialGarden('repeated-ending').chapter),text=sourcesFor(chapter).sol.paragraphs[0]!;
 chapter.story.solChoice='prepared';chapter.story.solEnding={text,scene:'bread',revision:4,origin:'child'};
 const story=completeStory(chapter,'sol')!,ending=story.speech!.segments!.at(-1)!;
 assert.ok(ending.start!>0);assert.equal(story.text.slice(ending.start,ending.end),text);
 assert.equal(sliceSpeech(story.speech!,ending.start!,ending.end!).segments![0]!.origin,'child-draft');
 assert.ok(story.speech!.segments!.slice(0,-1).every(part=>part.source?.edition==='literary-20260916'&&part.source.maintenanceEdition===maintenanceOf(chapter)));
});
test('Saved Sol speech retains the performed contribution when the working draft changes',()=>{
 const chapter=structuredClone(initialGarden('saved-contribution-voice').chapter);
 const performed={text:'I kept the flour dry. Rina baked the bread.',scene:'bread' as const,revision:7,origin:'child' as const};
 chapter.story.solDraft={...chapter.story.solDraft,text:'A newer working draft.',revision:11};
 chapter.gathering.solPerformed=performed;chapter.story.records.sol='bread';
 const request=solContributionSpeech(chapter,performed),whole=completeStory(chapter,'sol','performed')!;
 assert.deepEqual(request,{text:performed.text,origin:'child-draft',speaker:'sol',revision:7,owner:'saved-contribution-voice:sol-ending:7'});
 const last=whole.speech!.segments!.at(-1)!;
 assert.equal(last.text,request.text);assert.equal(last.speaker,'sol');assert.equal(last.revision,7);assert.equal(last.owner,request.owner);
 assert.equal(chapter.story.solDraft.text,'A newer working draft.');
});
test('A conflicting save freezes world and writing changes while reading remains available',()=>{
 const store=new GardenStore(initialGarden('conflict-freeze'));store.send({type:'BOOT'});store.send({type:'BEGIN'});store.send({type:'START_PLAY'});
 store.send({type:'SAVE_STATUS',status:'conflict'});const before=structuredClone(store.getSnapshot().chapter);
 store.send({type:'GO',point:{x:-4,z:-2}});store.send({type:'KEY',key:'w',down:true});store.send({type:'TICK',ms:1000});store.send({type:'STORY',event:{kind:'EDIT',text:'This must not replace the preserved draft.'}});store.send({type:'BLOOM'});store.send({type:'JOURNAL',command:{type:'NOTES',text:'These notes must stay frozen.'}});
 assert.deepEqual(store.getSnapshot().chapter,before);assert.equal(store.getSnapshot().route.length,0);assert.equal(store.getSnapshot().keys.length,0);
 store.send({type:'OPEN',panel:'help'});assert.equal(store.getSnapshot().panel,'help');store.send({type:'CLOSE'});assert.equal(store.getSnapshot().save,'conflict');
 store.send({type:'BOOT',chapter:before});assert.equal(store.getSnapshot().save,'saved');store.send({type:'GO',point:{x:-4,z:-2}});assert.ok(store.getSnapshot().route.length>0);
});

test('Staged bridge note edition survives exact reading-page clipping and canonical validation',()=>{
 const chapter=initialGarden('staged-note').chapter,text=sourcesFor(chapter).sections.paragraphs[0]!;
 assert.equal(maintenanceOf(chapter),'staged-20260916');
 const document=speechDocument([{text,origin:'authored-display',source:{id:'sections',paragraph:0,edition:editionOf(chapter),maintenanceEdition:maintenanceOf(chapter)!,start:0,end:text.length}}]);
 const page=sliceSpeech(document,0,text.length),part=page.segments![0]!;
 assert.equal(part.source?.maintenanceEdition,'staged-20260916');
 assert.equal(routeAuthoredText(part.text,part.source).map(span=>span.text).join(''),text);
});
