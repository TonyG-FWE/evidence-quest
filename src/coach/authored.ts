import type { Context, CoachSelection } from '../../contracts/types.js';

export type Help = { contentIds: string[]; refs: string[]; level: number; introduces: string[] };
export function prepared(context: Context, options: {direct?:boolean; noteHelp?:boolean; repeat?:number; topicSelected?:boolean}={}): Help {
  const c=context, story=c.topic==='story-plan';
  let id='CT.HELP.TOPIC', level=1, refs:string[]=[], introduces:string[]=[];
  if(options.direct){
    level=4;
    if(story)id='CT.DIRECT.RAIL';
    else if(c.loopMode==='standby')id='CT.DIRECT.SEARCH';
    else if(c.caddyHost==='MD.RACK.STATION')id=c.loopMode==='following'?'CT.DIRECT.FOLLOW_KIT':'CT.DIRECT.KIT';
    else if(c.loopMode==='following')id=c.caddyHost==='ACT.PLAYER'?'CT.DIRECT.DELIVER_BOTH':'CT.DIRECT.DELIVER_LOOP';
    else if(c.caddyHost==='ACT.PLAYER')id='CT.DIRECT.DELIVER_KIT';
    else id=c.premiered?'CT.DIRECT.REPLAY':c.certified?'CT.DIRECT.LAUNCH':'CT.DIRECT.RAIL';
    introduces=id==='CT.DIRECT.RAIL'?['FACT.STORY.BRIDGE_BEFORE_PLANT','FACT.STORY.PLANT_BEFORE_BLOOM','FACT.STORY.FERRY_OPTIONAL']:id==='CT.DIRECT.SEARCH'?['FACT.SEARCH.MEDIA','FACT.SEARCH.FLOWER_FINISHED']:[];
  }else if(options.topicSelected!==false){
    if(!story)id='CT.HINT.SEARCH_ATTENTION';
    else if(options.noteHelp&&c.availableAccesses.some(a=>/NOTE|SOURCE.E[67]|EVIDENCE.E[67]/.test(a)))id='CT.HINT.NOTE_ACCESS';
    else if(c.observedOutcomeRefs.length===0)id='CT.HINT.STORY_UNTRIED';
    else {
      id='CT.HINT.STORY_ATTENTION';
      if(c.puppet.seed==='right'&&c.puppet.pip==='left'&&c.exposedRefs.includes('E6.a')&&(options.repeat??0)>0){
        const step=Math.min(options.repeat??0,3);
        id=['','CT.HINT.PROMISE_ATTENTION','CT.HINT.PROMISE_SOURCE','CT.HINT.PROMISE_RELATION'][step]!;
        level=step;refs=['E6.a'];
      }
    }
  }
  const contentIds=[id];
  if(story && c.loopMode!=='docked' && c.loopMode!=='projecting')contentIds.push('CT.WORK.MISSING_LOOP');
  else if(story && c.caddyHost!=='ST.RACK.BAY')contentIds.push('CT.WORK.MISSING_KIT');
  return {contentIds,refs,level,introduces};
}

// This guard checks a supplied interpretation, never diagnoses the child's words.
export function eligible(c: Context, selection: CoachSelection): boolean {
  const {moveId:id,refs,interpretation:tag,uncertain}=selection;
  const seen=(r:string)=>c.exposedRefs.includes(r);
  if(refs.some(r=>!seen(r)&&!c.observedOutcomeRefs.includes(r)))return false;
  const includes=(r:string)=>refs.includes(r);
  const any=(allowed:string[])=>refs.length>0&&refs.every(r=>allowed.includes(r));
  const tags:Record<CoachSelection['moveId'],string>={NOTICE_CONTEXT:'scope_confusion',NOTICE_SCOPE:'scope_confusion',CLIP_LIMIT:'unsupported_destination',POSITIVE_SUPPORT:'unsupported_destination',TESTABLE_LEAD:'valid_plan',PLAN_VS_RESULT:'unsupported_destination',FULL_PROMISE:'goal_incomplete',BOAT_CAPACITY:'capacity',TOGETHER:'goal_incomplete',ROOT_CONDITION:'prerequisite',VALID_DIRECT:'valid_plan',VALID_EXTRA:'valid_plan',ARRANGEMENT_ONLY:'unclear',CLARIFY:'unclear',NARROW_CLAIM:'valid_plan',UNKNOWN_DETAIL:'unclear',RETURN_TO_CASE:'off_topic'};
  if(tags[id]!==tag)return false;
  switch(id){
    case 'NOTICE_CONTEXT':return !seen('E3.a')&&!seen('E3.b')&&any(['E2.b','CT.OBJ.NOTICE_PARTIAL']);
    case 'NOTICE_SCOPE':case 'NARROW_CLAIM':return any(['E3.a','E3.b']);
    case 'CLIP_LIMIT':return any(['E2.a','E2.a/frame2','E2.a/frame3','E2.a/end','E2.a/description','CT.REMY.CLIP']);
    case 'POSITIVE_SUPPORT':return refs.every(r=>['E4.a','E4.b','NAV.MEDIA'].includes(r));
    case 'TESTABLE_LEAD':return includes('E4.a')&&includes('NAV.MEDIA')&&!seen('E5.c/seen')&&c.room!=='SC.MD'&&refs.length===2;
    case 'PLAN_VS_RESULT':return any(['E4.a','E4.b']);
    case 'FULL_PROMISE':return refs.length===1&&includes('E6.a');
    case 'BOAT_CAPACITY':return refs.length===1&&includes('E7.a');
    case 'TOGETHER':return refs.length===1&&includes('E6.a')&&c.puppet.pip==='left'&&c.observedOutcomes.some(o=>o.tile==='TILE.PLANT'&&o.result==='unmet');
    case 'ROOT_CONDITION':return refs.length===1&&includes('E7.c')&&c.puppet.seed!=='soil';
    case 'VALID_DIRECT':case 'VALID_EXTRA':return refs.length>0&&refs.every(r=>['E6.a','E6.b','E7.a','E7.b','E7.c'].includes(r)||c.observedOutcomes.some(o=>o.refId===r&&o.result==='changed'));
    case 'ARRANGEMENT_ONLY':return refs.length===0&&c.caddyHost==='ST.RACK.BAY'&&['docked','projecting'].includes(c.loopMode);
    case 'CLARIFY':case 'UNKNOWN_DETAIL':return refs.length===0&&uncertain;
    case 'RETURN_TO_CASE':return refs.length===0;
  }
}
