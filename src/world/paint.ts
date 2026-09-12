import type {Point,Puppet,Rect,Cue} from '../../contracts/types.js';
import type {State} from '../core/state.js';
import {content} from '../core/content.js';
import {ownerRoom} from '../physical/navigation.js';
import {initialPuppet} from '../story/engine.js';
import {Assets,manifest,illustration} from './assets.js';
function translate(rect:Rect,point:Point):Rect{return [rect[0]+point[0],rect[1]+point[1],rect[2]+point[0],rect[3]+point[1]];}
export function projectionFrameKey(s:State):string|null{
 const p=s.case.physical,r=s.runtime;
 // At the stationary Stage workstation, only the projected cue moves between
 // committed case changes. No actor reaches into the projection rectangle.
 if(p.room!=='SC.ST'||p.loop.mode!=='projecting'||s.case.playback?.status!=='running'||r.view.page!=='work'||r.intent||s.session.heldKeys.length||r.artFailure||r.canvasFailure||r.clockMs-(r.lastAvatarMoveMs??-1000)<110||r.clockMs-(r.lastLoopMoveMs??-1000)<110||r.lastOperation&&r.clockMs-r.lastOperation.endedAt<600)return null;
 return [s.case.caseRunId,s.case.revision,s.preferences.revision].join(':');
}
export function paintProjection(ctx:CanvasRenderingContext2D,s:State,a:Assets){paintStory(ctx,a,s.case.playback?.puppet??initialPuppet(),[38,2,114,25],s.case.playback?.activeCue&&s.preferences.motion!=='reduced'?{cue:s.case.playback.activeCue,elapsed:s.runtime.cueElapsedMs}:undefined);}
export function paintStory(ctx:CanvasRenderingContext2D,a:Assets,committed:Puppet,area:Rect,animation?:{cue:Cue;elapsed:number},modelProgress?:number){
 const p={...committed},cue=animation?.cue,ms=animation?.elapsed??0,progress=(from:number,to:number)=>Math.max(0,Math.min(1,(ms-from)/(to-from)));
 let pipX=p.pip==='left'?23:77,pipY=p.pip==='left'?70:66,seedX=p.seed==='left'?29:87,seedY=p.seed==='left'?74:59;
 if(cue?.result==='changed'){
  if(cue.tile==='TILE.FERRY'){const t=progress(150,950);seedX=29+58*t;seedY=74-15*t;}
  if(cue.tile==='TILE.BRIDGE'){
   if(ms>=400)p.boats='joined';const t=progress(400,1200);pipX=23+54*t;pipY=70-4*t;
   if(cue.from.seed==='left'){seedX=29+58*t;seedY=74-15*t;}
  }
  if(cue.tile==='TILE.PLANT'){const t=progress(400,800);seedX=87-4*t;seedY=59+7*t;if(ms>=800)p.seed='soil';}
  if(cue.tile==='TILE.BLOOM'&&ms>=600)p.lit=true;
 }
 if(modelProgress!==undefined)pipX=23+7*Math.max(0,Math.min(1,(modelProgress-220)/200));
 ctx.save();ctx.beginPath();ctx.rect(area[0],area[1],area[2]-area[0],area[3]-area[1]);ctx.clip();
 ctx.translate(area[0],area[1]);ctx.scale((area[2]-area[0])/100,(area[3]-area[1])/100);
 const draw=(id:string,r:Rect,v='base')=>['PIP','GRANDMA','BACKPACK','SEED','FLOWER','ROOTS','BOAT','BROKEN_BRIDGE'].includes(id)?a.drawContained(ctx,'ASSET.PUP.'+id,r,v):a.draw(ctx,'ASSET.PUP.'+id,r,v);
 a.layer(ctx,'paper-terrain:'+area.join(','),[0,0,100,100],ctx=>{
 ctx.fillStyle='#DCECEF';ctx.fillRect(0,0,100,100);
 a.draw(ctx,'ER13.MATERIAL.PAPER',[0,0,100,100],'sky');
 // Material is clipped to the exact original paper-cut vertices and bounds.
  const paper=(id:string,rect:Rect,material:string,points:Point[])=>{
  ctx.save();ctx.beginPath();
  points.forEach(([x,y],i)=>{const px=rect[0]+x/100*(rect[2]-rect[0]),py=rect[1]+y/100*(rect[3]-rect[1]);if(i)ctx.lineTo(px,py);else ctx.moveTo(px,py);});
  ctx.closePath();ctx.fillStyle=id==='RIVER'?'#609bab':'#73a158';ctx.fill();ctx.clip();a.draw(ctx,'ER13.MATERIAL.PAPER',rect,material);ctx.restore();
 };
 paper('LEFT_BANK',[0,56,35,100],'grass',[[0,20],[26,3],[57,12],[100,18],[100,100],[0,100]]);
 paper('RIVER',[35,59,65,100],'river',[[0,8],[35,13],[65,3],[100,8],[100,100],[0,100]]);
 paper('HILL',[65,38,100,100],'grass',[[0,50],[32,22],[59,4],[100,0],[100,100],[0,100]]);
 });
 ctx.save();if(modelProgress!==undefined){const fold=Math.max(0,Math.min(1,(modelProgress-420)/180));ctx.translate(29.5,72);ctx.rotate(fold*.32);ctx.translate(-29.5,-72);}draw('BROKEN_BRIDGE',[29.5,68,38.5,76],'left');ctx.restore();draw('BROKEN_BRIDGE',[61.5,68,70.5,76],'right');
 if(cue?.tile==='TILE.FERRY'&&cue.result==='changed'){
  const t=progress(150,950),boatX=29+58*t,boatY=81-15*t;
  draw('BOAT',[boatX-8,boatY-5,boatX+8,boatY+5]);draw('BOAT',[48,82,64,96]);
 }else if(cue?.tile==='TILE.BRIDGE'&&cue.result==='changed'&&ms<400){
  const t=progress(0,400);draw('BOAT',[36-t,82-10*t,49+t,96-12*t]);draw('BOAT',[51-t,82-10*t,64+t,96-12*t]);
 }else if(p.boats==='joined'){draw('BOAT',[35,72,50,84]);draw('BOAT',[50,72,65,84]);draw('JOIN',[34,69,67,77]);}
 else{const bob=cue?.tile==='TILE.FERRY'&&cue.result==='noop'?Math.sin(ms/1200*Math.PI*2)*.5:0;draw('BOAT',[36,82+bob,49,96+bob]);draw('BOAT',[51,82,64,96]);}
 if(p.seed==='soil'){const grow=cue?.tile==='TILE.BLOOM'&&cue.result==='changed'?.3+.7*progress(0,600):p.lit?1:.3;a.drawContained(ctx,'ASSET.PUP.FLOWER',[66,66-50*grow,100,66],p.lit?'open':'bud',0,[83,66]);}
 const pip:Point=[pipX,pipY],planting=cue?.tile==='TILE.PLANT'&&cue.result==='changed'||p.seed==='soil';
 // Size the attached backpack in the same device coordinate system as Pip.
 const tx=ctx.getTransform(),aspect=Math.hypot(tx.c,tx.d)/Math.hypot(tx.a,tx.b),bagX=pipX+5*aspect,bagY=pipY-(planting?9:13);
 draw('BACKPACK',[bagX-4*aspect,bagY-7,bagX+4*aspect,bagY+4]);
 a.drawContained(ctx,'ASSET.PUP.PIP',translate([-8,-28,8,0],pip),cue?.tile==='TILE.BRIDGE'&&cue.result==='changed'?'crossing':p.pip==='left'?'waiting':planting?'planting':'arrived',0,pip);
 a.drawContained(ctx,'ASSET.PUP.GRANDMA',[81,37,96,65],planting?'planting':p.pip==='right'?'together':p.seed==='right'?'receiving':'waiting',0,[88,65]);
 if(p.seed==='soil'){
  if(illustration('ASSET.PUP.ROOTS')){ctx.fillStyle='#805839';ctx.beginPath();ctx.ellipse(83,66,4,.9,0,0,Math.PI*2);ctx.fill();}
  ctx.save();if(cue?.tile==='TILE.PLANT'&&cue.result==='changed'){ctx.beginPath();ctx.rect(77.5,66,11,12*progress(800,1200));ctx.clip();}if(illustration('ASSET.PUP.ROOTS'))a.drawContained(ctx,'ASSET.PUP.ROOTS',[77.5,66,88.5,78],'base',0,[83,66]);else draw('ROOTS',[77.5,66,88.5,78]);ctx.restore();
 }else draw('SEED',[seedX-2.5,seedY-3.5,seedX+2.5,seedY+3.5]);
 if(p.lit){ctx.save();if(cue?.tile==='TILE.BLOOM'&&cue.result==='changed')ctx.globalAlpha*=progress(600,1200);const glow=ctx.createRadialGradient(83,22,1,83,22,80);glow.addColorStop(0,'#F3C65C3D');glow.addColorStop(1,'#F3C65C00');ctx.fillStyle=glow;ctx.fillRect(0,0,100,100);ctx.restore();}
 ctx.restore();
}
function paintToast(ctx:CanvasRenderingContext2D,s:State,a:Assets){
 const elapsed=s.runtime.toastElapsed,revealed=s.case.physical.objects.toastRevealed;
 const animated=elapsed!==null&&s.preferences.motion!=='reduced',first=animated&&!s.runtime.toastReplay;
 const progress=(from:number,to:number)=>Math.max(0,Math.min(1,((elapsed??to)-from)/(to-from)));
 const lift=!revealed?0:first?progress(200,2800):1;
 const flourish=animated&&s.runtime.toastReplay?Math.sin(progress(0,2000)*Math.PI*2)*.6:!revealed&&s.preferences.motion!=='reduced'?Math.sin(s.runtime.clockMs/2000*Math.PI*2)*.15:0;
 const draw=(part:string,rect:Rect)=>a.drawContained(ctx,'ASSET.PROP.TOAST.'+part,rect);
 // The accepted body includes its own table. The cover and mechanisms remain separate.
 draw('BODY',[80,9,110,46]);
 if(animated)for(const [index,color]of ['#ffcf57','#51df94','#ff947c'].entries()){
  ctx.save();ctx.globalAlpha=.2+.4*(1+Math.sin(elapsed/300-index*1.5))/2;ctx.fillStyle=color;ctx.shadowColor=color;ctx.shadowBlur=1.5;
  ctx.beginPath();ctx.arc(91.2+index*3.8,32.7,.8,0,Math.PI*2);ctx.fill();ctx.restore();
 }
 if(revealed&&(!first||elapsed>=3000)){
  draw('TRAY',[85.5,26.2,104.5,30.8]);
  draw('PIECE',[94,26.5,96,28]);
 }
 draw('LID',[81.5,11-12*lift+flourish,108.5,29-12*lift+flourish]);
 for(const mirror of [false,true]){
  ctx.save();if(mirror){ctx.translate(190,0);ctx.scale(-1,1);}
  const height=9+11*lift-flourish;
  a.drawContained(ctx,'ASSET.PROP.TOAST.ARM',[80,35-height,96,35],'base',0,[82,35]);ctx.restore();
 }
 if(revealed&&(!first||elapsed>=5000)){
  const lower=first?progress(5000,7000):1;
  const rect:Rect=[91,11+10*lower,102,24+10*lower],height=11*1011/1056;
  const lens:Point=[91+11*.354,rect[3]-height+height*.36];
  // Keep the accepted rim/handle; its painted blue center must not hide the snack.
  ctx.save();ctx.beginPath();ctx.rect(80,-5,35,55);ctx.moveTo(lens[0]+2.65,lens[1]);ctx.arc(...lens,2.65,0,Math.PI*2);ctx.clip('evenodd');draw('GLASS',rect);ctx.restore();
  ctx.save();ctx.beginPath();ctx.arc(...lens,2.65,0,Math.PI*2);ctx.clip();ctx.globalAlpha=.14;draw('GLASS',rect);ctx.restore();
 }
}
export function paintWorld(ctx:CanvasRenderingContext2D,s:State,a:Assets){
 const p=s.case.physical,room=p.room;
 // The docked projector owns its existing story poses through the Stage visit.
 // Preparing them before a rehearsal avoids new pose decoding inside cues;
 // leaving the Stage releases this ownership through the ordinary pool rules.
 if(room==='SC.ST'&&['docked','projecting'].includes(p.loop.mode)){a.prepareGroup('puppet',1);if((devicePixelRatio||1)>=1.5)a.prepareGroup('puppet',2);}
 const operation=s.runtime.intent?.stage==='operating'?s.runtime.intent:null,elapsed=s.runtime.operationElapsedMs,animate=s.preferences.motion!=='reduced',progress=(end=350)=>animate?Math.min(1,Math.max(0,elapsed/end)):1;
 ctx.fillStyle='#EEC69D';ctx.fillRect(0,0,120,80);
 const scenery=(ctx:CanvasRenderingContext2D)=>{
 a.draw(ctx,`ASSET.ENV.${room.slice(3)}.BACKPLATE`,[0,0,120,80]);
 const all=manifest.bindings.filter(b=>b.coordinateSpace==='room'&&b.assetUse.manifestAssetId&&ownerRoom(s.case,b.assetUse.ownerId)===room&&!/^(ACT|KIT|TILE|PUP|MODEL)\./.test(b.assetUse.ownerId)&&!b.assetUse.ownerId.startsWith('ST.RAIL.')&&(b.assetUse.role!=='background'||b.assetUse.manifestAssetId==='ASSET.ENV.DOOR'));
 for(const b of all){
  const id=b.assetUse.manifestAssetId!,owner=b.assetUse.ownerId;if(!manifest.assets.some(x=>x.id===id))continue;
  if(id.startsWith('ASSET.PROP.TOAST.')&&illustration('ASSET.PROP.TOAST.BODY'))continue;
  if(owner==='WK.ACCESS.NAV')continue; // The readable face belongs to the one sign frame.
  if(owner==='CY.ACCESS.E2'&&illustration('ASSET.PROP.CY.STAND'))continue; // The accepted stand includes its tablet.
  if(id==='ASSET.PROP.PETAL'){
   const r=b.assetUse.logicalBounds as Rect;
   const centers:Point[]=room==='SC.CY'?[[.1,.25],[.25,.6],[.4,.2],[.55,.65],[.72,.25],[.9,.65]].map(q=>[r[0]+q[0]!*(r[2]-r[0]),r[1]+q[1]!*(r[3]-r[1])] as Point):room==='SC.WK'?[[17,23],[23,20],[29,25],[35,21]]:[[28,25],[32,25],[36,25]];
   ctx.save();ctx.beginPath();ctx.rect(r[0],r[1],r[2]-r[0],r[3]-r[1]);ctx.clip();
   for(const [i,q]of centers.entries()){ctx.save();ctx.translate(...q);if(room!=='SC.MD'&&s.preferences.motion!=='reduced')ctx.rotate(Math.sin((s.runtime.clockMs-i*400)/4000*Math.PI*2)*Math.PI/30);a.draw(ctx,id,[-2,room==='SC.MD'?-2.5:-3,2,room==='SC.MD'?2.5:3],room==='SC.MD'?'flat':'bent');ctx.restore();}
   ctx.restore();continue;
  }
  const revealing=s.runtime.toastElapsed!==null&&!s.runtime.toastReplay&&s.preferences.motion!=='reduced';
  if(['ASSET.PROP.TOAST.PIECE','ASSET.PROP.TOAST.TRAY','ASSET.PROP.TOAST.GLASS'].includes(id)&&(!p.objects.toastRevealed||revealing&&s.runtime.toastElapsed!<(id.endsWith('GLASS')?5000:3000)))continue;
  let variant='base';
  if(id==='ASSET.ENV.DOOR')variant=owner==='WK.EXIT.MD'?'north':owner==='MD.EXIT.WK'?'south':'side';
  if(id==='ASSET.PROP.BRIEF.FLAP')variant=p.objects.briefOpen?'lifted':'down';
  if(id==='ASSET.PROP.NOTE.DRAWER')variant=p.objects.storyNoteOpen?'open':'closed';
  if(id==='ASSET.PROP.REQUEST')variant=p.objects.filmingRequestOpen?'unfolded':'folded';
  if(id==='ASSET.PROP.NOTICE')variant=p.objects.noticeFlat?'flat':s.runtime.intent?.action==='flatten'&&s.runtime.intent.stage==='operating'?'moving':'curled';
  if(id==='ASSET.PROP.NOTICE.CLIP')variant=operation?.action==='flatten'&&elapsed>=150&&elapsed<650?'released':'latched';
  if(id==='ASSET.PROP.DOCK.FLAP')variant=p.objects.dockFlapOpen?'open':'closed';
  if(id==='ASSET.PROP.MODEL.TAB')variant=p.objects.modelTabTried?'pulled':'rest';
  if(id==='ASSET.PROP.TOAST.LID')variant=p.objects.toastRevealed?'raised':'closed';
  if(id==='ASSET.PROP.LEAFLET')variant='sheet';
  if(id==='ASSET.PROP.DEVICE')variant=operation?.target.endsWith('ACCESS.E2')?'selected':'idle';
  if(id==='ASSET.PROP.PETAL')variant=room==='SC.MD'?'flat':'bent';
  const bounds=(id==='ASSET.PROP.REQUEST'&&room==='SC.ST'&&illustration('ASSET.PROP.ST.BOARD')?[46.7,28,53.4,35.8]:b.assetUse.logicalBounds) as Rect;
  const morph=id==='ASSET.PROP.BRIEF.FLAP'&&operation?.target==='ST.SOURCE.E1'?['down','lifted']:id==='ASSET.PROP.NOTE.DRAWER'&&operation?.target==='ST.SOURCE.E6'?['closed','open']:id==='ASSET.PROP.REQUEST'&&operation?.target==='ST.SOURCE.E4'?['folded','unfolded']:id==='ASSET.PROP.DOCK.FLAP'&&operation?.target.startsWith('ST.DOCK')?['closed','open']:null;
  if(morph){
   const t=progress();ctx.save();ctx.globalAlpha=1-t;a.drawContained(ctx,id,bounds,morph[0]);ctx.globalAlpha=t;
   const r:Rect=[...bounds];if(id.includes('DRAWER')){r[1]-=(1-t)*1.2;r[3]-=(1-t)*1.2;}else{r[1]+=(r[3]-r[1])*.3*(1-t);}
   a.drawContained(ctx,id,r,morph[1]);ctx.restore();continue;
  }
  if(id==='ASSET.PROP.MODEL.TAB'){const t=operation?.target.startsWith('ST.MODEL')?progress(220):p.objects.modelTabTried?1:0;a.drawContained(ctx,id,translate(bounds,[1.4*t,0]),'rest');continue;}
  if(id==='ASSET.PROP.NOTICE'&&operation?.action==='flatten'){
   // Only the blank reverse moves; the full source text is still admitted at
   // the physical endpoint, after the second clip has been secured.
   const t=animate?Math.max(0,Math.min(1,(elapsed-150)/500)):1;ctx.save();ctx.globalAlpha=1-t;a.drawContained(ctx,id,bounds,'curled');ctx.globalAlpha=t;a.drawContained(ctx,id,bounds,'moving');ctx.restore();continue;
  }
  if(id==='ASSET.ENV.DOOR'){const t=operation?.target===owner?progress(200):0,r:Rect=[bounds[0],bounds[1],bounds[2]-(bounds[2]-bounds[0])*.28*t,bounds[3]];a.drawNineSlice(ctx,id,r,variant);continue;}
  if(id==='ASSET.PROP.ST.BOARD'&&illustration(id))a.drawContained(ctx,id,[44,24,66,38]);
  else if(id==='ASSET.PROP.REQUEST'&&room==='SC.ST'&&illustration('ASSET.PROP.ST.BOARD'))a.draw(ctx,id,[46.7,28,53.4,35.8],variant);
  else if(id==='ASSET.PROP.DEVICE'&&room==='SC.ST'&&illustration('ASSET.PROP.ST.BOARD'))a.draw(ctx,id,[55,28,62.5,36],variant);
  else if(illustration(id,variant))a.drawContained(ctx,id,b.assetUse.logicalBounds as Rect,variant);
  else a.draw(ctx,id,b.assetUse.logicalBounds as Rect,variant);
 }
 if(room==='SC.WK'&&illustration('ASSET.PROP.TOAST.BODY'))paintToast(ctx,s,a);
 if(room==='SC.ST'){
  // A separate physical screen is required when the painted room has an empty wall.
  ctx.save();ctx.shadowColor='#51351f44';ctx.shadowBlur=1.5;ctx.shadowOffsetY=.6;
  ctx.fillStyle='#5e4635';ctx.fillRect(37.5,1.5,77,24);ctx.shadowBlur=0;ctx.shadowOffsetY=0;
  const fabric=ctx.createLinearGradient(0,2,0,25);fabric.addColorStop(0,'#fff6df');fabric.addColorStop(1,'#ded1b8');ctx.fillStyle=fabric;ctx.fillRect(38,2,76,23);ctx.strokeStyle='#b7a68b';ctx.lineWidth=.15;ctx.strokeRect(38.4,2.4,75.2,22.2);ctx.restore();
  const model=s.runtime.intent?.target.startsWith('ST.MODEL')&&s.runtime.intent.stage==='operating'?s.runtime.operationElapsedMs:p.objects.modelTabTried?600:0;
  paintStory(ctx,a,initialPuppet(),illustration('ASSET.PROP.ST.MODEL.CABINET')?[10.8,19.5,29.5,31.1]:[10,18,31,35],undefined,model);
  ctx.strokeStyle='#14646B';ctx.lineWidth=.3;ctx.strokeRect(49,67,14,8);ctx.strokeRect(64,67,29,8);
  for(const [index,tile]of p.order.entries())a.draw(ctx,'ASSET.'+tile,[64+index*7,68,70+index*7,74]);
  for(const [x,color]of [[95,'#F3C65C'],[100,'#E9725C']] as const){ctx.fillStyle=color;ctx.fillRect(x,67,4,4);ctx.strokeStyle='#18324B';ctx.strokeRect(x,67,4,4);}
 }
 };
 // Stage scenery changes only with these committed objects/tiles. During a
 // physical operation it is drawn live. The projected story and actors always
 // remain outside this layer, at their original source and device resolution.
 if(room==='SC.ST'&&!operation)a.layer(ctx,'stage-scenery',[0,0,120,80],scenery,JSON.stringify([p.objects,p.order]));else scenery(ctx);
 if(room==='SC.ST'){
  if(p.loop.mode==='projecting'){ctx.save();const beam=ctx.createLinearGradient(76,35,76,2);beam.addColorStop(0,'#ffe8a438');beam.addColorStop(1,'#fff6dc0a');ctx.fillStyle=beam;ctx.beginPath();ctx.moveTo(76,33);ctx.lineTo(38,2);ctx.lineTo(114,25);ctx.closePath();ctx.fill();ctx.restore();}
  if(['docked','projecting'].includes(p.loop.mode))paintProjection(ctx,s,a);
 }
 const drawActor=(id:string,feet:Point,variant='home')=>{
  const b=manifest.bindings.find(b=>b.assetUse.ownerId===id&&b.assetUse.role==='actor');if(!b)return;
  const home=content.actors.find(actor=>actor.id===id)!.feet;
  const rect=translate(b.assetUse.logicalBounds as Rect,b.coordinateSpace==='room'?[feet[0]-home[0],feet[1]-home[1]]:feet);ctx.fillStyle='#18324B26';ctx.beginPath();ctx.ellipse(feet[0],feet[1],(rect[2]-rect[0])*.45,(rect[3]-rect[1])*.09,0,0,Math.PI*2);ctx.fill();
  const asset='ASSET.'+id;const variants=manifest.assets.find(a=>a.id===asset)?.variants;const frames=illustration(asset,variant)?illustration(asset,variant)!.frames?.length??1:variants?.find(v=>v.key===variant)?.frames??1;
  const moving=s.runtime.clockMs-(id==='ACT.LOOP'?s.runtime.lastLoopMoveMs??-1000:s.runtime.lastAvatarMoveMs??-1000)<110,frame=moving&&animate?Math.floor(s.runtime.clockMs/(id==='ACT.LOOP'?167:125))%frames:0;
  if(id==='ACT.PLAYER'&&variant.startsWith('carry-')&&moving&&animate){
   const seam=feet[1]-(rect[3]-rect[1])*.39;
   ctx.save();ctx.beginPath();ctx.rect(rect[0]-10,seam,rect[2]-rect[0]+20,feet[1]-seam+2);ctx.clip();a.drawContained(ctx,asset,rect,variant.replace('carry-','walk-'),Math.floor(s.runtime.clockMs/125)%4,feet);ctx.restore();
   ctx.save();ctx.beginPath();ctx.rect(rect[0]-10,rect[1]-2,rect[2]-rect[0]+20,seam-rect[1]+2);ctx.clip();a.drawContained(ctx,asset,rect,variant,0,feet);ctx.restore();
  }else if(id==='ACT.LOOP'&&operation&&animate&&['ACT.LOOP','LOOP.FOLLOW.PAD'].includes(operation.target)&&p.loop.mode==='standby'){const t=progress(250);ctx.save();ctx.globalAlpha=1-t;a.drawContained(ctx,asset,rect,'standby',0,feet);ctx.globalAlpha=t;a.drawContained(ctx,asset,rect,'responsive',0,feet);ctx.restore();}
  else if(id==='ACT.LOOP'&&operation?.target.startsWith('ST.DOCK')&&p.loop.mode==='following'&&elapsed>=13/15*1000&&animate){const t=Math.min(1,(elapsed-13/15*1000)/500);ctx.save();ctx.globalAlpha=1-t;a.drawContained(ctx,asset,rect,'rolling-back',0,feet);ctx.globalAlpha=t;a.drawContained(ctx,asset,rect,'docked',0,feet);ctx.restore();}
  else if(id==='ACT.PLAYER'&&variant.startsWith('reach-')&&animate){const t=progress(240);ctx.save();ctx.globalAlpha=1-t;a.drawContained(ctx,asset,rect,variant.replace('reach-','idle-'),0,feet);ctx.globalAlpha=t;a.drawContained(ctx,asset,rect,variant,0,feet);ctx.restore();}
  else if(['ACT.JO','ACT.REMY','ACT.ARI'].includes(id)&&operation?.target===id&&animate){const t=progress(150);ctx.save();ctx.globalAlpha=1-t;a.drawContained(ctx,asset,rect,'home',0,feet);ctx.globalAlpha=t;a.drawContained(ctx,asset,rect,variant,0,feet);ctx.restore();}
  else a.drawContained(ctx,asset,rect,variant,frame,feet);
 };
 const entries=content.actors.filter(actor=>actor.id!=='ACT.PLAYER'&&actor.id!=='ACT.LOOP'&&actor.room===room).map(actor=>{const recent=s.runtime.lastOperation,since=recent?s.runtime.clockMs-recent.endedAt:Infinity,receiving=operation?.target===actor.id&&!!operation.delivery||recent?.target===actor.id&&recent.delivery&&since<200,acknowledging=recent?.target===actor.id&&recent.delivery&&since>=200&&since<600;return {id:actor.id,feet:actor.feet,variant:receiving?'receive':acknowledging?'acknowledge':s.runtime.view.actor===actor.id?'talk':operation?.target===actor.id?`face-${p.avatar[0]<actor.feet[0]?'left':'right'}`:'home'};});
 if(p.loop.room===room){const docking=operation?.target.startsWith('ST.DOCK')&&p.loop.mode==='following',waking=['ACT.LOOP','LOOP.FOLLOW.PAD'].includes(operation?.target??''),t=Math.min(1,elapsed/(13/15*1000)),direction=s.runtime.loopFacing??p.facing;entries.push({id:'ACT.LOOP',feet:docking&&animate?[76,48-13*t]:p.loop.feet,variant:waking&&elapsed>=250?'responsive':p.loop.mode==='following'?docking?'rolling-back':`rolling-${direction==='up'?'back':direction==='down'?'front':direction}`:p.loop.mode});}
 const facing=p.facing==='up'?'back':p.facing==='down'?'front':p.facing;
 entries.push({id:'ACT.PLAYER',feet:p.avatar,variant:`${p.caddyHost==='ACT.PLAYER'?'carry':operation?'reach':s.runtime.clockMs-(s.runtime.lastAvatarMoveMs??-1000)<110?'walk':'idle'}-${facing}`});
 const hostRoom=p.caddyHost==='MD.RACK.STATION'?'SC.MD':p.caddyHost==='ST.RACK.BAY'?'SC.ST':room;
 const held=p.caddyHost==='ACT.PLAYER',transferring=operation?.action==='collect'||operation?.target==='ST.RACK.BAY'&&held;
 const handX=p.avatar[0]+(facing==='left'?-1.7:facing==='right'?1.7:0),heldRect:Rect=[handX-2.35,p.avatar[1]-8.6,handX+2.35,p.avatar[1]-5.9];
 const drawCaddy=()=>{if(hostRoom!==room)return;
  const origin:Point=p.caddyHost==='MD.RACK.STATION'?[96,32]:[50,68];
  let closedRect:Rect=held?heldRect:translate([0,0,12,7],origin);
  if(transferring){const to:Rect=operation?.action==='collect'?heldRect:[50,68,62,75],t=progress(200);closedRect=closedRect.map((n,i)=>n+(to[i]!-n)*t) as Rect;}
  // The open inspection case stays at its workstation. The carried prop is a
  // closed hand-sized case; logical ownership and the generous hit area stay unchanged.
  const portable=held||transferring,open=p.objects.rackOpened&&!portable,lidH=p.caddyHost==='MD.RACK.STATION'?5:2;
  if(illustration('ASSET.PROP.CADDY',open?'open':'closed')){
   const opening=!open&&!portable&&['KIT.CADDY','MD.ACCESS.E8'].includes(operation?.target??'');
   if(opening){const t=progress();ctx.save();ctx.globalAlpha=1-t;a.drawContained(ctx,'ASSET.PROP.CADDY',translate([0,0,12,7],origin),'closed');ctx.globalAlpha=t;a.drawContained(ctx,'ASSET.PROP.CADDY',translate([0,-lidH*t,12,7],origin),'open');ctx.restore();}
   else a.drawContained(ctx,'ASSET.PROP.CADDY',open?translate([0,-lidH,12,7],origin):closedRect,open?'open':'closed');
   if(open){
    // The accepted open case already contains the lid and two blank note pockets.
    const w=Math.min(12,(7+lidH)*530/461),h=w*461/530,left=(12-w)/2,top=7-h;
    for(const [index,tile]of ['BLOOM','FERRY','PLANT','BRIDGE'].entries())if(!p.order.includes(`TILE.${tile}` as typeof p.order[number])){
     const x=left+w*(.17+index*.21),y=top+h*(.655-index*.018);a.draw(ctx,'ASSET.TILE.'+tile,translate([x-w*.075,y-h*.07,x+w*.075,y+h*.07],origin));
    }
   }
  }else{
   a.draw(ctx,'ASSET.PROP.CADDY.BODY',translate([0,0,12,7],origin));
   if(open){
   a.draw(ctx,'ASSET.PROP.CADDY.LID',translate([0,-lidH,12,0],origin),'open');
   for(const [index,tile]of ['BLOOM','FERRY','PLANT','BRIDGE'].entries())if(!p.order.includes(`TILE.${tile}` as typeof p.order[number])){const x=index%2*6+.5,y=Math.floor(index/2)*3.5+.25;a.draw(ctx,'ASSET.TILE.'+tile,translate([x,y,x+5,y+3],origin));}
   a.draw(ctx,'ASSET.PROP.LEAFLET',translate([.5,-lidH,5.5,0],origin),'pocket');a.draw(ctx,'ASSET.PROP.LEAFLET',translate([6.5,-lidH,11.5,0],origin),'pocket');
   }else a.draw(ctx,'ASSET.PROP.CADDY.LID',translate([0,0,12,7],origin),'closed');
  }
  if(operation?.target.startsWith('KIT.NOTE.')){const t=progress(),x=held?handX:origin[0]+(operation.target.endsWith('E6')?3:9),y=held?heldRect[1]:origin[1]-lidH+2,hand:Point=[p.avatar[0],p.avatar[1]-8],point:Point=[x+(hand[0]-x)*t,y+(hand[1]-y)*t];a.drawContained(ctx,'ASSET.PROP.LEAFLET',translate([-2,-3,2,0],point),'sheet');}
 };
 for(const entry of entries.sort((a,b)=>a.feet[1]-b.feet[1])){
  if(entry.id==='ACT.PLAYER'&&held&&facing==='back')drawCaddy();
  const celebration=(s.runtime.clockMs-(s.runtime.celebrateStartedAt??-1000))/800,celebrating=entry.id==='ACT.JO'&&s.runtime.view.page==='ending'&&s.runtime.view.action==='celebration'&&celebration<1;
  ctx.save();if(celebrating&&animate)ctx.translate(0,-.6*Math.sin(celebration*Math.PI));drawActor(entry.id,entry.feet,celebrating?'celebrate':entry.variant);ctx.restore();
  if(entry.id==='ACT.PLAYER'&&held&&facing!=='back')drawCaddy();
 }
 if(!held)drawCaddy();
 if(s.runtime.intent?.stage==='approaching'){ctx.strokeStyle='#224FC4';ctx.lineWidth=.2;ctx.setLineDash([.5,.5]);ctx.beginPath();ctx.moveTo(...p.avatar);for(const point of s.runtime.intent.path)ctx.lineTo(...point);ctx.stroke();ctx.setLineDash([]);}
}
