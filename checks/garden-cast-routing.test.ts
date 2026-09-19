import test from 'node:test';
import assert from 'node:assert/strict';
import {routeAuthoredText} from '../src/garden/sourceVoiceRouting.js';
import {sourcesFor} from '../src/garden/content.js';

test('source routing preserves exact edition and refuses mismatched canonical words',()=>{
 const current=sourcesFor({narrativeEdition:'literary-20260916'}).sol.paragraphs[1]!;
 const parts=routeAuthoredText(current,{id:'sol',paragraph:1,edition:'literary-20260916',start:0,end:current.length});
 assert.equal(parts.map(part=>part.text).join(''),current);assert.ok(parts.some(part=>part.speaker==='rina'));
 for(const part of parts)assert.equal(current.slice(part.source!.start,part.source!.end),part.text);
 assert.throws(()=>routeAuthoredText(current,{id:'sol',paragraph:1,edition:'original'}),/no longer match/);
 assert.throws(()=>routeAuthoredText('different words',{id:'sol',paragraph:1,edition:'literary-20260916'}),/no longer match/);
 assert.throws(()=>routeAuthoredText(current,{id:'not-a-source'}),/no longer match/);
 assert.throws(()=>routeAuthoredText(current,{id:'sol',edition:'made-up'}),/edition/);
 assert.throws(()=>routeAuthoredText(current,{id:'sol',paragraph:1,edition:'literary-20260916',start:0,end:current.length+5}),/no longer match/);
 assert.throws(()=>routeAuthoredText('the'),/exact source/);
 const original=sourcesFor({narrativeEdition:'original'}).sol.paragraphs[0]!;
 assert.equal(routeAuthoredText(original,{id:'sol',paragraph:0,edition:'original'})[0]?.source?.edition,'original');
});
