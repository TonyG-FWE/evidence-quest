import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {initialState} from '../src/core/state.js';
import {reduce} from '../src/core/reducer.js';
import type {Command} from '../src/core/commands.js';
import {validCase} from '../src/save/validate.js';
import {readingAvailable,contextsFor,definition,newExperience} from '../src/core/experience.js';
import {content} from '../src/core/content.js';
import {contextOf} from '../src/core/people.js';
import {CoachService,requestBody,selectionFrom,providerSchema,validContext} from '../server/coach.js';
function harness(){let s=structuredClone(initialState(randomUUID(),randomUUID()));return {get:()=>s,send(command:Command){s=structuredClone(reduce(s,{command,id:randomUUID(),ids:Array.from({length:32},randomUUID),visitId:s.session.visitId,caseId:s.case.caseRunId}).state);return s;}};}
test('ER13 opening is skippable, persists beats, and adds no source or puzzle outcomes; legacy restore preserves case',()=>{
 const h=harness();h.send({type:'NEW_GAME',caseId:randomUUID(),visitId:randomUUID()});assert.equal(h.get().runtime.view.page,'intro');h.send({type:'INTRO',action:'next'});h.send({type:'INTRO',action:'skip'});assert.equal(h.get().runtime.view.page,'world');h.send({type:'INTRO',action:'open'});assert.equal(h.get().runtime.view.frame,1);assert.deepEqual(h.get().case.grants,[]);assert.deepEqual(h.get().case.observations,[]);assert(validCase(h.get().case));
 const old=structuredClone(h.get().case);delete old.experience;old.physical.objects.modelTabTried=true;old.drafts[0]!.text='My original idea';const fresh=harness();fresh.send({type:'BOOT',generation:fresh.get().runtime.bootGeneration,status:'saved',candidate:old});fresh.send({type:'RESTORE',visitId:randomUUID()});assert.equal(fresh.get().case.caseRunId,old.caseRunId);assert.equal(fresh.get().case.drafts[0]!.text,'My original idea');assert.equal(fresh.get().runtime.view.page,'world');assert.equal(fresh.get().case.experience?.legacyOffer,true);assert(validCase(fresh.get().case));
});
test('ER13 reading and vocabulary records do not imply source reading, fluency, or gameplay success',()=>{
 const h=harness();h.send({type:'NEW_GAME',caseId:randomUUID(),visitId:randomUUID()});h.send({type:'VIEW',view:{page:'reading',sourceId:'READ.WELCOME'}});h.send({type:'READING',id:'READ.WELCOME',action:'practice'});h.send({type:'READING',id:'READ.WELCOME',action:'model-played'});h.send({type:'READING',id:'READ.WELCOME',action:'self-report'});h.send({type:'READING',id:'READ.WELCOME',action:'card'});
 assert.deepEqual(h.get().case.observations.map(o=>o.kind),['reading-practice-requested','reading-model-played','reading-self-reported']);assert.equal(h.get().case.exposures.length,0);assert.equal(h.get().case.certificate,null);assert(!readingAvailable(h.get().case,'READ.PROMISE'));assert(!readingAvailable(h.get().case,'READ.ENDING'));assert(validCase(h.get().case));
 const motion=contextsFor('CT.SRC.E4').find(c=>c.word==='STILL')!,continuing=contextsFor('CT.SRC.E3').find(c=>c.word==='STILL')!;assert.equal(definition(motion).definition,'Not moving.');for(const ct of ['CT.JO.BORROW','CT.ARI.INVITE','CT.SCENE.MD'])assert.equal(definition(contextsFor(ct).find(c=>c.word==='STILL')!).definition,'Not moving.');assert.equal(definition(continuing).definition,'Continuing to be true.');assert(!definition(contextsFor('CT.CUE.FERRY').find(c=>c.word==='STILL')!).example.includes('premiere'));h.send({type:'WORD_SEEN',id:motion.id});assert.deepEqual(h.get().case.experience?.wordContexts,[]);
 const corrupted=structuredClone(h.get().case);corrupted.experience!.wordContexts=[continuing.id];assert(!validCase(corrupted),'A saved word list cannot introduce an unexposed source sentence');
});
test('ER13 live provider uses canonical displayed sources, strict eligible projection, and bounded real fetch path',async()=>{
 const state=structuredClone(initialState(randomUUID(),randomUUID()));state.case.experience=newExperience();const context=contextOf(state,'where-loop');assert(validContext(context));const q={contractKind:'CoachRequest' as const,coachContractVersion:1 as const,identity:content.identity,requestId:randomUUID(),context,explanation:'I am not sure what it means.'};
 const body=requestBody(q),format=providerSchema(context);assert.equal(body.model,'gpt-6-astra');assert.equal(body.store,false);assert(!format.properties.moveId.enum.includes('FULL_PROMISE'));assert(!JSON.stringify(body).includes('Pip promised Grandma'));assert(!('previous_response_id'in body));
 let calls=0;const fixture={status:'completed',model:'gpt-6-astra',output:[{type:'message',role:'assistant',status:'completed',content:[{type:'output_text',text:JSON.stringify({moveId:'CLARIFY',interpretation:'unclear',refs:[],uncertain:true})}]}]};
 const transport:typeof fetch=async(url,options)=>{calls++;assert.equal(url,'https://api.openai.com/v1/responses');assert(options?.signal);assert.equal(JSON.parse(String(options?.body)).text.format.strict,true);return new Response(JSON.stringify(fixture),{status:200});};
 const service=new CoachService('synthetic-not-a-real-key',true,transport);const reply=await service.handle(q);assert.equal(reply?.status,'selected');assert.equal(reply?.selection?.moveId,'CLARIFY');assert.equal((await service.handle(q))?.status,'duplicate');assert.equal(calls,1);
 const invalid=structuredClone(context);invalid.exposedRefs=['E6.made-up'];assert(!validContext(invalid));
 assert.throws(()=>selectionFrom({...fixture,output:[...fixture.output,...fixture.output]},context));assert.throws(()=>selectionFrom({...fixture,status:'incomplete'},context));assert.throws(()=>selectionFrom({...fixture,output:[{type:'message',status:'completed',role:'assistant',content:[{type:'output_text',text:JSON.stringify({moveId:'FULL_PROMISE',interpretation:'goal_incomplete',refs:['E6.a'],uncertain:false})}]}]},context));
 const off=new CoachService(undefined,false,transport);assert.equal((await off.handle({...q,requestId:randomUUID()}))?.status,'unavailable');assert.equal(calls,1);
});
