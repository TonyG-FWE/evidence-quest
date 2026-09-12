import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {design,json,hash,readCanonical} from './content-source.mjs';
import {validateAuthoredContent} from '../contracts/generated/validators.mjs';

export async function validateFull(content) {
  assert(validateAuthoredContent(content),JSON.stringify(validateAuthoredContent.errors));
  assert.equal(content.completeness,'full','Production rejects example-fragment content');
  const {entries,registry}=await readCanonical();
  const map=new Map(content.texts.map(e=>[e.id,e]));
  assert.equal(map.size,content.texts.length,'Duplicate text ID');
  assert.equal(map.size,entries.length,'Complete catalog');
  for(const e of entries)assert.equal(map.get(e.id)?.text,e.text,`Exact canonical text: ${e.id}`);
  const parts=content.sources.flatMap(s=>s.parts),refs=new Set(parts.map(p=>p.refId));
  assert.deepEqual([...refs].sort(),[...registry.refs].sort(),'All original canonical refs');
  assert.equal(parts.length,refs.size,'Unique source refs');
  for(const p of parts){
    const text=map.get(p.ctId)?.text;assert(text,`Missing source text ${p.ctId}`);
    for(const [start,end]of p.spans)assert(start>=0&&end>start&&end<=Array.from(text).length,`Code-point span ${p.refId}`);
    for(const ref of p.requiresAll)assert(refs.has(ref),`Aggregate ref ${ref}`);
  }
  const bindings=await json('content/bindings.json');
  const owners=new Set([...content.rooms,...content.objects,...content.actors,...content.accesses].map(x=>x.id));
  for(const id of bindings.owners)assert(owners.has(id),`Missing physical/access owner ${id}`);
  assert.equal(bindings.owners.length,107);
  assert.equal(bindings.uiStates.length,96);assert.equal(new Set(bindings.uiStates).size,96);
  assert.equal(bindings.transitions.length,121);
  assert.equal(content.rooms.length,4);assert.equal(content.doors.length,8);assert.equal(content.actors.length,5);assert.equal(content.tiles.length,4);assert.equal(content.sources.length,9);assert.equal(content.coachingMoves.length,17);
  const roomMap=new Map(content.rooms.map(r=>[r.id,r]));
  function legal(room,point){const [x,y]=point;if(x<6||x>114||y<30||y>74)return false;return room.obstacles.every(({rect:[l,t,r,b]})=>x<=l-2||x>=r+2||y<=t-2||y>=b+2);}
  const objects=new Map(content.objects.map(o=>[o.id,o]));
  let approaches=0;
  for(const object of content.objects){
    assert.notEqual(object.id,object.parentId,`Self parent ${object.id}`);
    if(object.parentId)assert(owners.has(object.parentId),`Unknown parent ${object.id}`);
    if(object.collisionOwner)assert(roomMap.get(object.room).obstacles.some(o=>o.ownerId===object.collisionOwner),`Unknown collision ${object.id}`);
    for(const point of object.approaches){assert(legal(roomMap.get(object.room),point),`Illegal approach ${object.id}: ${point}`);approaches++;}
  }
  for(const door of content.doors){assert(content.doors.some(d=>d.id===door.destinationId&&d.destinationId===door.id),'Reciprocal door');assert(legal(roomMap.get(door.room),door.threshold));assert(legal(roomMap.get(door.destinationRoom),door.avatarArrival));}
  const manifest=await json(design+'10-asset-production/asset-manifest.json');
  assert.deepEqual(content.assetUses,manifest.bindings.map(b=>b.assetUse),'Exact asset use contracts');
  for(const copy of content.copies){assert(owners.has(copy.ownerId),`Copy owner ${copy.id}`);for(const ref of copy.bodyRefs)assert(refs.has(ref));}
  for(const access of content.accesses){assert(map.has(access.actionCt),`Access copy ${access.id}`);for(const ref of access.grants)assert(refs.has(ref));}
  for(const npc of content.npcBranches){assert(map.has(npc.topic));for(const ct of npc.responseCt)assert(map.has(ct));for(const ref of [...npc.receivedAll,...npc.grants])assert(refs.has(ref));}
  for(const tile of content.tiles){assert(map.has(tile.labelCt));assert(map.has(tile.descriptionCt));}
  for(const entry of content.texts){assert.deepEqual(entry.slots.map(s=>s.name).sort(),[...new Set([...entry.text.matchAll(/\{(\w+)\}/g)].map(m=>m[1]))].sort(),`Slots ${entry.id}`);}
  return {texts:entries.length,originalTexts:553,existingTileLabelsBound:4,sourceRefs:refs.size,owners:bindings.owners.length,legalApproaches:approaches,rooms:4,doors:8,states:96,transitions:121,assetUses:content.assetUses.length};
}
if(process.argv[1]?.endsWith('validate-content.mjs')){
  const content=await json('content/authored.json');
  const counts=await validateFull(content);
  const {cases}=await json(design+'09-technical-contracts/examples.json');
  const fragment=cases.find(c=>c.id==='canonical-note-copy-fragment');
  await assert.rejects(()=>validateFull(fragment.payload),/example-fragment/);
  await writeFile('evidence/content-validation.json',JSON.stringify({checkedAt:new Date().toISOString(),contentSha256:hash(await readFile('content/authored.json')),checks:['schema','all canonical words','code-point span bounds','complete refs/owners','legal geometry anchors','reciprocal doors','manifest bindings','fragment rejection'],counts,limits:'This transcription/structure check does not establish runtime behavior or full conditional/NPC branch coverage.'},null,2)+'\n');
  console.log(JSON.stringify(counts));
}
