import test from 'node:test';
import assert from 'node:assert/strict';
import {freshChapter} from '../src/garden/model.js';
import {unpack,checksum,validChapter} from '../src/garden/persistence.js';
import {anchors} from '../src/garden/worldLayout.js';

function envelope(payload:unknown){return {format:1,content:'garden-chapter-3',revision:9,writer:'previous-player',payload,checksum:checksum(JSON.stringify(payload))};}
function legacy(){const old=structuredClone(freshChapter('migration-hands-on')) as unknown as Record<string,any>;delete old['layoutVersion'];old['pip']={x:-3.5,z:-3.05};old['bakery']['rina']={x:8.5,z:-.7};return old;}
test('layout migration preserves authored writing, exposure and possessions while translating the same area',()=>{
 const old=legacy();old['story'].solDraft={text:'My own unfinished ending.',revision:7};old['exposed']=['GA.SRC.MARA.P1'];old['assistance']=['word'];old['reading']={mara:2};
 const raw=envelope(old),copy=JSON.stringify(raw),next=unpack(raw);
 assert.ok(next);assert.equal(next.payload.layoutVersion,2);assert.deepEqual(next.payload.pip,anchors.dock.approach);
 for(const key of ['story','sections','seed','page','exposed','assistance','history','reading'] as const)assert.deepEqual(next.payload[key],old[key]);
 assert.equal(JSON.stringify(raw),copy,'The original envelope remains available for the atomic archive');
 assert.equal(validChapter(next.payload),true);assert.equal(next.payload.revision,old['revision']+1);
 assert.deepEqual(unpack(next),next,'Current layouts never translate twice');
});
test('migration rejects non-finite coordinates and a future layout rather than resetting player progress',()=>{
 const broken=legacy();broken['pip']={x:NaN,z:0};assert.equal(unpack(envelope(broken)),null);
 const future={...freshChapter('future'),layoutVersion:99};assert.equal(unpack(envelope(future)),null);
});
test('malformed checksummed payloads cannot crash journal admission before damaged-save recovery',()=>{
 for(const key of ['story','history','bakery','mara','gathering','river'] as const){
  const broken=structuredClone(freshChapter('damaged-journal')) as unknown as Record<string,unknown>;
  broken[key]=key==='history'?null:{};
  assert.doesNotThrow(()=>unpack(envelope(broken)),key);
  assert.equal(unpack(envelope(broken)),null,key);
 }
});
