const test=(name,...args)=>({test:name,args}),all=(...a)=>({all:a}),not=a=>({not:a}),any=(...a)=>({any:a});
export function npcSource(){
  const branches=[];
  function add(actor,key,topic,responseCt,{receivedAll=[],when={all:[]},grants=[],assistanceLevel=0}={}){
    branches.push({id:`NPC.${actor}.${key}`,actorId:`ACT.${actor}`,topic,receivedAll,when:all(test('local-owner',`ACT.${actor}`),when),responseCt,grants,assistanceLevel});
  }
  const ready=all(test('loop-mode','standby'),test('kit-host','MD.RACK.STATION'));
  const docked=any(test('loop-mode','docked'),test('loop-mode','projecting'));
  function account(key,topic,receivedAll=[]){
    add('ARI',key+'.READY',topic,['CT.SRC.E5.B'],{receivedAll,when:ready,grants:['E5.b']});
    add('ARI',key+'.AFTER',topic,['CT.ARI.FILMING_AFTER'],{receivedAll,when:not(ready)});
  }
  for(const actor of ['JO','REMY','ARI']){
    const knows=r=>test('actor-knows',`ACT.${actor}`,r);
    for(const topic of ['CT.TALK.CANCELED','CT.PRESENT.SHOW']){
      if(actor==='ARI')add(actor,'CANCEL.'+topic,topic,['CT.ARI.EVENT']);
      else{
        add(actor,'BOTH.'+topic,topic,[actor==='JO'?'CT.JO.NOTICE_FULL':'CT.REMY.CORRECT'],{when:all(knows('E3.a'),knows('E3.b'))});
        add(actor,'SCOPE.'+topic,topic,['CT.NPC.SCOPE'],{when:all(knows('E3.a'),not(knows('E3.b')))});
        add(actor,'STATUS.'+topic,topic,['CT.NPC.STATUS'],{when:all(knows('E3.b'),not(knows('E3.a')))});
      }
    }
    add(actor,'PLAN','CT.TALK.PLAN',[actor==='JO'?'CT.JO.PLAN_REPLY':'CT.NPC.PLAN_REPLY']);
    if(actor!=='ARI'){
      add(actor,'CANCEL.UNKNOWN','CT.TALK.CANCELED',[actor==='JO'?'CT.JO.CANCEL_UNKNOWN':'CT.SRC.E2.C'],{when:all(not(knows('E3.a')),not(knows('E3.b'))),grants:actor==='REMY'?['E2.c']:[]});
      add(actor,'PHOTO','CT.PRESENT.SHOW',['CT.NPC.PHOTO'],{receivedAll:['E2.b']});
      add(actor,'SLATE','CT.PRESENT.SHOW',['CT.NPC.SLATE'],{receivedAll:['E5.a']});
      add(actor,'ACCOUNT','CT.PRESENT.SHOW',['CT.NPC.ACCOUNT'],{receivedAll:['E5.b']});
      add(actor,'SEEN','CT.PRESENT.SHOW',['CT.NPC.OBSERVATION'],{receivedAll:['E5.c/seen']});
      add(actor,'CLIP','CT.TALK.CLIP',[actor==='JO'?'CT.NPC.FRAME':'CT.REMY.CLIP'],{grants:actor==='REMY'?['CT.REMY.CLIP']:[]});
    }
    add(actor,'DETAILS','CT.PRESENT.SHOW',['CT.NPC.DETAILS']);
    add(actor,'UNSUPPORTED','CT.PRESENT.REVIEW',['CT.NPC.UNSUPPORTED']);
    add(actor,'ENDING','CT.ENDING.TITLE',[`CT.${actor}.ENDING`],{when:test('premiered')});
  }
  add('JO','ROLE','CT.TALK.ROLE',['CT.GOAL.ASSIGNMENT']);
  add('JO','BORROW','CT.TALK.LOOP',['CT.JO.BORROW'],{when:not(docked)});
  add('JO','DOCKED','CT.TALK.LOOP',['CT.JO.DOCKED'],{when:docked});
  add('JO','NOTE','CT.TALK.JO_NOTE',['CT.SRC.E6'],{grants:['E6.a','E6.b']});
  add('JO','SEED_HELP','CT.TALK.HELP',['CT.JO.SEED_HELP'],{when:all(test('puppet','seed','right'),test('puppet','pip','left')),assistanceLevel:3});
  add('JO','SOLUTION','CT.TALK.DIRECT',['CT.JO.SOLUTION'],{when:all(test('available','E6.a'),test('available','E7.a')),assistanceLevel:4});
  add('REMY','NOTE','CT.TALK.REMY_NOTE',['CT.SRC.E7'],{grants:['E7.a','E7.b','E7.c']});
  add('REMY','REQUEST','CT.TALK.REQUEST',['CT.REMY.REQUEST']);
  add('REMY','CROSS_HELP','CT.TALK.HELP',['CT.REMY.CROSS_HELP'],{assistanceLevel:3});
  for(const topic of ['CT.TALK.FILMING','CT.TALK.LOOP'])account(topic,topic);
  add('ARI','REQUEST','CT.TALK.REQUEST',['CT.SRC.E4'],{grants:['E4.a','E4.b']});
  add('ARI','WAIT','CT.TALK.WAIT',['CT.ARI.WAIT']);
  add('ARI','SLATE','CT.TALK.SLATE',['CT.SRC.E5.A'],{grants:['E5.a']});
  add('ARI','NOTES','CT.TALK.NOTES',['CT.ARI.NOTES']);
  add('ARI','KIT_READY','CT.TALK.MATERIALS',['CT.ARI.KIT_READY'],{when:test('kit-host','MD.RACK.STATION')});
  add('ARI','KIT_GONE','CT.TALK.MATERIALS',['CT.ARI.KIT_GONE'],{when:not(test('kit-host','MD.RACK.STATION'))});
  return branches;
}
