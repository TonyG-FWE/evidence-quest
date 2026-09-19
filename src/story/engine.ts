import type { Cue, Order, Puppet, Run } from '../../contracts/types.js';
export const initialPuppet=():Puppet=>({pip:'left',seed:'left',boats:'separate',lit:false});
export const successful=(p:Puppet)=>p.pip==='right'&&p.seed==='soil'&&p.lit;
export function applyTile(from:Puppet,tile:Order[number]):{to:Puppet;result:Cue['result'];caption:string}{
  const to={...from};let result:Cue['result']='changed',caption='';
  switch(tile){
    case 'TILE.FERRY':
      if(from.seed==='left'){to.seed='right';caption='CT.CUE.FERRY';}
      else{result='noop';caption='CT.CUE.FERRY_EMPTY';}break;
    case 'TILE.BRIDGE':
      if(from.pip==='right'){result='noop';caption='CT.CUE.BRIDGE_SAME';}
      else{caption=from.seed==='left'?'CT.CUE.BRIDGE_CARRY':'CT.CUE.BRIDGE_REUNITE';to.pip='right';to.boats='joined';if(from.seed==='left')to.seed='right';}break;
    case 'TILE.PLANT':
      if(from.seed==='soil'){result='noop';caption='CT.CUE.TENDING';}
      else if(from.pip==='right'&&from.seed==='right'){to.seed='soil';caption='CT.CUE.PLANTED';}
      else{result='unmet';caption=from.seed==='right'?'CT.CUE.HILL_MISSING_PIP':'CT.CUE.HILL_BOTH_LEFT';}break;
    case 'TILE.BLOOM':
      if(from.lit){result='noop';caption='CT.CUE.ALREADY_LIT';}
      else if(from.seed==='soil'){to.lit=true;caption='CT.CUE.FLOWER';}
      else{result='unmet';caption='CT.CUE.UNPLANTED';}break;
  }
  return {to,result,caption};
}
export function newRun(id:string,mode:Run['mode'],order:Order,revision:number,seq:number):Run{return {id,mode,arrangementRevision:revision,order:[...order],nextCue:0,status:'running',pauseReason:null,puppet:initialPuppet(),activeCue:null,cueResultIds:[],startSeq:seq,finalizedSeq:null};}
export function storyDescription(p:Puppet):string[]{return ['CT.STORY.BANKS',`CT.STORY.PIP_${p.pip.toUpperCase()}`,p.pip==='right'?'CT.STORY.TOGETHER':p.seed==='right'?'CT.STORY.GRANDMA_SEED':'CT.STORY.GRANDMA_WAIT',p.seed==='soil'?'CT.STORY.ROOTED':`CT.STORY.SEED_${p.seed.toUpperCase()}`,`CT.STORY.BOATS_${p.boats.toUpperCase()}`,...(p.seed==='soil'?[p.lit?'CT.STORY.LIT':'CT.STORY.DARK']:[])];}
