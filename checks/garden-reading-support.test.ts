import {test} from 'node:test';
import assert from 'node:assert/strict';
import {displayReadingTarget,boundedWordTarget} from '../src/garden/readingReference.js';
import {supportedWordHelp} from '../src/garden/readingGlossary.js';
import {targetMatches,type SpeechRequest} from '../server/gardenSpeech.js';
import {wordContext,validWordReply,wordRequestBody,type WordRequest} from '../server/gardenWords.js';
import {readingPages} from '../src/garden/readingPages.js';
import {initialGarden,gardenReduce} from '../src/garden/model.js';
import {completeStory} from '../src/garden/storyReading.js';
import {sources,sourcesFor} from '../src/garden/content.js';
import {cancelLocalSpeech,localSpeechVersion,onLocalSpeechCanceled} from '../src/garden/audio.js';

test('Reading references bind the exact displayed text without claiming canonical source identity',async()=>{
 const text='Starting after the last boat returns would give me time to finish work.';
 const q:SpeechRequest={requestId:'synthetic-target',attempt:1,target:await displayReadingTarget(text,'authored-display'),text,audio:'',job:'reading'};
 assert.equal(targetMatches(q),true);assert.equal(targetMatches({...q,text:text+' Changed.'}),false);assert.equal(targetMatches({...q,target:'reading-arbitrary'}),false);
 const draft={...q,target:await displayReadingTarget(text,'child-draft')};assert.equal(targetMatches(draft),true);assert.notEqual(draft.target,q.target);
});
test('Local cancellation invalidates late speech callbacks and synchronously clears the registered owner',()=>{
 const before=localSpeechVersion();let cancellations=0;const unsubscribe=onLocalSpeechCanceled(()=>{cancellations++;});
 cancelLocalSpeech();assert.equal(localSpeechVersion(),before+1);assert.equal(cancellations,1);
 unsubscribe();cancelLocalSpeech();assert.equal(localSpeechVersion(),before+2);assert.equal(cancellations,1);
});
test('Word support preserves dynamic text provenance and selected offsets in long writing',()=>{
 const draft='This is my long message. '.repeat(600)+'Mara is helping passengers. '+ 'I hope she can come. '.repeat(600),start=draft.indexOf('passengers');
 const q:WordRequest={requestId:'synthetic-long-word',revision:7,source:null,origin:'child-draft',paragraph:0,draft,start,end:start+10,word:'passengers',sentence:'Mara is helping passengers.',disputed:null};
 const bounded=boundedWordTarget(q);assert.equal(bounded.draft!.slice(bounded.start,bounded.end),'passengers');assert.ok(bounded.draft!.length<4000);assert.ok(wordContext(bounded));assert.equal(q.draft,draft);assert.equal(bounded.origin,'child-draft');
 const authored={...bounded,origin:'authored-display' as const};assert.equal(JSON.parse(wordRequestBody(authored,'synthetic-not-live').input).kind,'authored-display');assert.equal(validWordReply({status:'supported',meaning:'Test meaning',explanation:'Test explanation',spelling:'passenger'},authored),false);
 assert.equal(wordContext({...authored,source:'mara'}),null);
});
test('Dynamic vocabulary uses the actual context, never a different character or story event',()=>{
 const play=supportedWordHelp('play','Play from the beginning.',false,false,true);assert.match(play.definition!,/game or activity/);assert.equal(play.explanation,'Play from the beginning.');
 const obligation=supportedWordHelp('obligation','I have an obligation to finish my homework.',false,false,true);assert.equal(obligation.explanation,'I have an obligation to finish my homework.');assert.doesNotMatch(obligation.definition!,/Mara|passengers/);
 assert.match(supportedWordHelp('knead','Knead the dough.',false,false,true).definition!,/Press and fold/);
});
test('Reading pages preserve the complete text while every recording reference is bounded',()=>{
 const full=('Mara carried the bird. The boy walked beside her.\n\n').repeat(600),pages=readingPages(full);
 assert.equal(pages.map(p=>p.text).join(''),full);assert.ok(pages.length>1);assert.ok(pages.every(p=>Array.from(p.text).length<=1800&&full.slice(p.start,p.end)===p.text));
 const story=sources.story.paragraphs.join('\n\n'),storyPages=readingPages(story);assert.equal(storyPages.map(p=>p.text).join(''),story);assert.equal(storyPages.length,2);assert.ok(storyPages.every(p=>p.text.trim().split(/\s+/).length>=35));assert.match(storyPages[0]!.text,/[.!?]["”’']?\s*$/);
 const longToken='x'.repeat(1801)+' '+'a '.repeat(329),bounded=readingPages(longToken);assert.equal(bounded.map(p=>p.text).join(''),longToken);assert.ok(bounded.every(p=>p.text.length<=1800&&p.text.trim().split(/\s+/).length<=110));
});
test('Read-screen inspection preserves an unplaced choice and cannot perform it',()=>{
 let s=initialGarden('reading-world');s.ready=true;s.chapter.started=true;s.mode='arrange';s.preview=structuredClone(s.chapter.sections);s.preview.a.z=3;
 const chapter=structuredClone(s.chapter),preview=structuredClone(s.preview);
 s=gardenReduce(s,{type:'INSPECT_TEXT',text:['Place the section between the posts.','Place section']},'inspect');assert.equal(s.panel,'help');assert.deepEqual(s.preview,preview);
 s=gardenReduce(s,{type:'CLOSE'},'return');assert.equal(s.panel,null);assert.deepEqual(s.preview,preview);assert.deepEqual(s.chapter.sections,chapter.sections);assert.equal(s.chapter.joined,false);assert.deepEqual(s.chapter.exposed,[]);
});
test('Complete-story reading preserves source order and uses the performed ending instead of later edits',()=>{
 const c=initialGarden('synthetic-story-reading').chapter,sources=sourcesFor(c);
 for(const id of ['story','empty','picnic','duet'] as const)assert.equal(completeStory(c,id)!.text,sources[id].paragraphs.join('\n\n'));
 const chosen={origin:'child' as const,text:'Rina brought me bread to thank me.',scene:'thanks' as const,revision:4};
 c.story.solChoice='prepared';c.story.solEnding=chosen;
 assert.equal(completeStory(c,'sol')!.text,[...sources.sol.paragraphs,chosen.text].join('\n\n'));assert.equal(completeStory(c,'sol')!.origin,'mixed-display');
 c.story.records.sol='thanks';c.gathering.solPerformed=structuredClone(chosen);c.story.solEnding={...chosen,text:'These later words were not performed.'};
 assert.ok(completeStory(c,'sol')!.text.endsWith(chosen.text));assert.ok(!completeStory(c,'sol')!.text.includes('These later words'));
 c.gathering.solPerformed='draft';c.story.records.sol='draft';assert.equal(completeStory(c,'sol')!.text,sources.sol.paragraphs.join('\n\n'));
 c.gathering.turn={kind:'add-ending',index:0,contribution:chosen,question:'thanks'};const before=JSON.stringify(c);
 assert.equal(completeStory(c,'sol','performed')!.text,sources.sol.paragraphs.join('\n\n'));
 assert.equal(completeStory(c,'sol')!.text,sources.sol.paragraphs.join('\n\n'));
 assert.ok(completeStory(c,'sol','current-turn')!.text.endsWith(chosen.text));assert.match(completeStory(c,'sol','current-turn')!.note,/recorded after Sol finishes/);assert.equal(JSON.stringify(c),before);
 c.gathering.turn=null;c.gathering.solPerformed=chosen;c.story.records.sol='thanks';assert.ok(completeStory(c,'sol','performed')!.text.endsWith(chosen.text));
 assert.equal(completeStory(c,'pip'),null);
});
