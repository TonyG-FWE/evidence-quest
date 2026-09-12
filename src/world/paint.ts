import type {Point,Puppet,Rect,Cue} from '../../contracts/types.js';
import type {State} from '../core/state.js';
import {content} from '../core/content.js';
import {ownerRoom} from '../physical/navigation.js';
import {initialPuppet} from '../story/engine.js';
import {Assets,manifest,illustration} from './assets.js';
function translate(rect:Rect,point:Point):Rect{return [rect[0]+point[0],rect[1]+point[1],rect[2]+point[0],rect[3]+point[1]];}
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
 ctx.translate(area[0],area[1]);ctx.scale((area[2]-area[0])/100,(area[3]-area[1])/100);ctx.fillStyle='#DCECEF';ctx.fillRect(0,0,100,100);
 const draw=(id:string,r:Rect,v='base')=>['PIP','GRANDMA','BACKPACK','SEED','FLOWER','ROOTS','BOAT','BROKEN_BRIDGE'].includes(id)?a.drawContained(ctx,'ASSET.PUP.'+id,r,v):a.draw(ctx,'ASSET.PUP.'+id,r,v);
 a.draw(ctx,'ER13.MATERIAL.PAPER',[0,0,100,100],'sky');
 // Material is clipped to the exact original paper-cut vertices and bounds.
 const paper=(id:string,rect:Rect,material:string,points:Point[])=>{
  draw(id,rect);ctx.save();ctx.beginPath();
  points.forEach(([x,y],i)=>{const px=rect[0]+x/100*(rect[2]-rect[0]),py=rect[1]+y/100*(rect[3]-rect[1]);if(i)ctx.lineTo(px,py);else ctx.moveTo(px,py);});
  ctx.closePath();ctx.clip();a.draw(ctx,'ER13.MATERIAL.PAPER',rect,material);ctx.restore();
 };
 paper('LEFT_BANK',[0,56,35,100],'grass',[[0,20],[26,3],[57,12],[100,18],[100,100],[0,100]]);
 paper('RIVER',[35,59,65,100],'river',[[0,8],[35,13],[65,3],[100,8],[100,100],[0,100]]);
 paper('HILL',[65,38,100,100],'grass',[[0,50],[32,22],[59,4],[100,0],[100,100],[0,100]]);
 draw('BROKEN_BRIDGE',[29.5,68,38.5,76],'left');draw('BROKEN_BRIDGE',[61.5,68,70.5,76],'right');
 if(cue?.tile==='TILE.FERRY'&&cue.result==='changed'){
  const t=progress(150,950),boatX=29+58*t,boatY=81-15*t;
  draw('BOAT',[boatX-8,boatY-5,boatX+8,boatY+5]);draw('BOAT',[48,82,64,96]);
 }else if(cue?.tile==='TILE.BRIDGE'&&cue.result==='changed'&&ms<400){
  const t=progress(0,400);draw('BOAT',[36-t,82-10*t,49+t,96-12*t]);draw('BOAT',[51-t,82-10*t,64+t,96-12*t]);
 }else if(p.boats==='joined'){draw('BOAT',[35,72,50,84]);draw('BOAT',[50,72,65,84]);draw('JOIN',[34,69,67,77]);}
 else{draw('BOAT',[36,82,49,96]);draw('BOAT',[51,82,64,96]);}
 if(p.seed==='soil'){const grow=cue?.tile==='TILE.BLOOM'&&cue.result==='changed'?progress(0,950):1;draw('FLOWER',[66,66-50*grow,100,66],p.lit?'open':'bud');}
 const pip:Point=[pipX,pipY],planting=cue?.tile==='TILE.PLANT'&&cue.result==='changed'||p.seed==='soil';
 // Size the attached backpack in the same device coordinate system as Pip.
 const tx=ctx.getTransform(),aspect=Math.hypot(tx.c,tx.d)/Math.hypot(tx.a,tx.b),bagX=pipX+5*aspect,bagY=pipY-(planting?9:13);
 draw('BACKPACK',[bagX-4*aspect,bagY-7,bagX+4*aspect,bagY+4]);
 a.drawContained(ctx,'ASSET.PUP.PIP',translate([-8,-28,8,0],pip),cue?.tile==='TILE.BRIDGE'&&cue.result==='changed'?'crossing':p.pip==='left'?'waiting':planting?'planting':'arrived',0,pip);
 a.drawContained(ctx,'ASSET.PUP.GRANDMA',[81,37,96,65],planting?'planting':p.pip==='right'?'together':p.seed==='right'?'receiving':'waiting',0,[88,65]);
 if(p.seed==='soil'){
  if(illustration('ASSET.PUP.ROOTS')){ctx.fillStyle='#805839';ctx.beginPath();ctx.ellipse(83,66,4,.9,0,0,Math.PI*2);ctx.fill();}
  draw('ROOTS',[77.5,66,88.5,78]);
 }else draw('SEED',[seedX-2.5,seedY-3.5,seedX+2.5,seedY+3.5]);
 if(p.lit){const glow=ctx.createRadialGradient(83,22,1,83,22,80);glow.addColorStop(0,'#F3C65C3D');glow.addColorStop(1,'#F3C65C00');ctx.fillStyle=glow;ctx.fillRect(0,0,100,100);}
 ctx.restore();
}
function paintToast(ctx:CanvasRenderingContext2D,s:State,a:Assets){
 const elapsed=s.runtime.toastElapsed,revealed=s.case.physical.objects.toastRevealed;
 const animated=elapsed!==null&&s.preferences.motion!=='reduced',first=animated&&!s.runtime.toastReplay;
 const progress=(from:number,to:number)=>Math.max(0,Math.min(1,((elapsed??to)-from)/(to-from)));
 const lift=!revealed?0:first?progress(200,2800):1;
 const flourish=animated&&s.runtime.toastReplay?Math.sin(progress(0,2000)*Math.PI*2)*.6:0;
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
  draw('GLASS',[92,9+10*lower,103,22+10*lower]);
 }
}
export function paintWorld(ctx:CanvasRenderingContext2D,s:State,a:Assets){
 const p=s.case.physical,room=p.room;
 ctx.clearRect(0,0,120,80);a.draw(ctx,`ASSET.ENV.${room.slice(3)}.BACKPLATE`,[0,0,120,80]);
 const all=manifest.bindings.filter(b=>b.coordinateSpace==='room'&&b.assetUse.manifestAssetId&&ownerRoom(s.case,b.assetUse.ownerId)===room&&!/^(ACT|KIT|TILE|PUP|MODEL)\./.test(b.assetUse.ownerId)&&!b.assetUse.ownerId.startsWith('ST.RAIL.')&&(b.assetUse.role!=='background'||b.assetUse.manifestAssetId==='ASSET.ENV.DOOR'));
 for(const b of all){
  const id=b.assetUse.manifestAssetId!,owner=b.assetUse.ownerId;if(!manifest.assets.some(x=>x.id===id))continue;
  if(id.startsWith('ASSET.PROP.TOAST.')&&illustration('ASSET.PROP.TOAST.BODY'))continue;
  if(owner==='WK.ACCESS.NAV')continue; // The readable face belongs to the one sign frame.
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
  if(id==='ASSET.PROP.DOCK.FLAP')variant=p.objects.dockFlapOpen?'open':'closed';
  if(id==='ASSET.PROP.MODEL.TAB')variant=p.objects.modelTabTried?'pulled':'rest';
  if(id==='ASSET.PROP.TOAST.LID')variant=p.objects.toastRevealed?'raised':'closed';
  if(id==='ASSET.PROP.LEAFLET')variant='sheet';
  if(id==='ASSET.PROP.PETAL')variant=room==='SC.MD'?'flat':'bent';
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
  if(p.loop.mode==='projecting'){ctx.save();const beam=ctx.createLinearGradient(76,35,76,2);beam.addColorStop(0,'#ffe8a438');beam.addColorStop(1,'#fff6dc0a');ctx.fillStyle=beam;ctx.beginPath();ctx.moveTo(76,33);ctx.lineTo(38,2);ctx.lineTo(114,25);ctx.closePath();ctx.fill();ctx.restore();}
  const model=s.runtime.intent?.target.startsWith('ST.MODEL')&&s.runtime.intent.stage==='operating'?s.runtime.operationElapsedMs:p.objects.modelTabTried?600:0;
  paintStory(ctx,a,initialPuppet(),illustration('ASSET.PROP.ST.MODEL.CABINET')?[10.8,19.5,29.5,31.1]:[10,18,31,35],undefined,model);
  if(['docked','projecting'].includes(p.loop.mode))paintStory(ctx,a,s.case.playback?.puppet??initialPuppet(),[38,2,114,25],s.case.playback?.activeCue&&s.preferences.motion!=='reduced'?{cue:s.case.playback.activeCue,elapsed:s.runtime.cueElapsedMs}:undefined);
  ctx.strokeStyle='#14646B';ctx.lineWidth=.3;ctx.strokeRect(49,67,14,8);ctx.strokeRect(64,67,29,8);
  for(const [index,tile]of p.order.entries())a.draw(ctx,'ASSET.'+tile,[64+index*7,68,70+index*7,74]);
  for(const [x,color]of [[95,'#F3C65C'],[100,'#E9725C']] as const){ctx.fillStyle=color;ctx.fillRect(x,67,4,4);ctx.strokeStyle='#18324B';ctx.strokeRect(x,67,4,4);}
 }
 const drawActor=(id:string,feet:Point,variant='home')=>{
  const b=manifest.bindings.find(b=>b.assetUse.ownerId===id&&b.assetUse.role==='actor');if(!b)return;
  const home=content.actors.find(actor=>actor.id===id)!.feet;
  const rect=translate(b.assetUse.logicalBounds as Rect,b.coordinateSpace==='room'?[feet[0]-home[0],feet[1]-home[1]]:feet);ctx.fillStyle='#18324B26';ctx.beginPath();ctx.ellipse(feet[0],feet[1],(rect[2]-rect[0])*.45,(rect[3]-rect[1])*.09,0,0,Math.PI*2);ctx.fill();
  const asset='ASSET.'+id;const variants=manifest.assets.find(a=>a.id===asset)?.variants;const frames=illustration(asset,variant)?illustration(asset,variant)!.frames?.length??1:variants?.find(v=>v.key===variant)?.frames??1;
  const moving=!!s.runtime.intent||s.session.heldKeys.length>0,frame=moving&&s.preferences.motion!=='reduced'?Math.floor(s.runtime.clockMs/140)%frames:variant.startsWith('carry-')?1:0;
  a.drawContained(ctx,asset,rect,variant,frame,feet);
  if(id==='ACT.LOOP'&&illustration(asset,variant)){
   const h=rect[3]-rect[1],lens:Point=[feet[0]+h*.045,feet[1]-h*.55];
   ctx.save();ctx.fillStyle=p.loop.mode==='standby'?'#101f35bb':p.loop.mode==='projecting'?'#fff4baa6':'#41cdd333';ctx.beginPath();ctx.ellipse(lens[0],lens[1],h*.11,h*.14,0,0,Math.PI*2);ctx.fill();
   if(p.loop.mode==='following'&&moving&&s.preferences.motion!=='reduced')for(const dx of [-.22,.22]){ctx.save();ctx.translate(feet[0]+h*dx,feet[1]-h*.08);ctx.rotate(s.runtime.clockMs/90);ctx.strokeStyle='#a4dfd988';ctx.lineWidth=.2;ctx.beginPath();ctx.moveTo(-h*.045,0);ctx.lineTo(h*.045,0);ctx.stroke();ctx.restore();}
   ctx.restore();
  }
 };
 const entries=content.actors.filter(actor=>actor.id!=='ACT.PLAYER'&&actor.id!=='ACT.LOOP'&&actor.room===room).map(actor=>({id:actor.id,feet:actor.feet,variant:s.runtime.view.actor===actor.id?'talk':'home'}));
 if(p.loop.room===room){const docking=s.runtime.intent?.target.startsWith('ST.DOCK')&&s.runtime.intent.stage==='operating'&&p.loop.mode==='following';const t=Math.min(1,s.runtime.operationElapsedMs/(13/15*1000));entries.push({id:'ACT.LOOP',feet:docking&&s.preferences.motion!=='reduced'?[76,48-13*t]:p.loop.feet,variant:p.loop.mode==='following'?`rolling-${p.facing==='up'?'back':p.facing==='down'?'front':p.facing}`:p.loop.mode});}
 const facing=p.facing==='up'?'back':p.facing==='down'?'front':p.facing;
 entries.push({id:'ACT.PLAYER',feet:p.avatar,variant:`${p.caddyHost==='ACT.PLAYER'?'carry':s.runtime.intent?.stage==='approaching'||s.session.heldKeys.length?'walk':'idle'}-${facing}`});
 for(const entry of entries.sort((a,b)=>a.feet[1]-b.feet[1]))drawActor(entry.id,entry.feet,entry.variant);
 const hostRoom=p.caddyHost==='MD.RACK.STATION'?'SC.MD':p.caddyHost==='ST.RACK.BAY'?'SC.ST':room;
 if(hostRoom===room){
  const origin:Point=p.caddyHost==='MD.RACK.STATION'?[96,32]:p.caddyHost==='ST.RACK.BAY'?[50,68]:[p.avatar[0]-6,p.avatar[1]-7.58];
  const open=p.objects.rackOpened,lidH=p.caddyHost==='MD.RACK.STATION'?5:2;
  a.draw(ctx,'ASSET.PROP.CADDY.BODY',translate([0,0,12,7],origin));
  if(open){
   a.draw(ctx,'ASSET.PROP.CADDY.LID',translate([0,-lidH,12,0],origin),'open');
   for(const [index,tile]of ['BLOOM','FERRY','PLANT','BRIDGE'].entries())if(!p.order.includes(`TILE.${tile}` as typeof p.order[number])){const x=index%2*6+.5,y=Math.floor(index/2)*3.5+.25;a.draw(ctx,'ASSET.TILE.'+tile,translate([x,y,x+5,y+3],origin));}
   a.draw(ctx,'ASSET.PROP.LEAFLET',translate([.5,-lidH,5.5,0],origin),'pocket');a.draw(ctx,'ASSET.PROP.LEAFLET',translate([6.5,-lidH,11.5,0],origin),'pocket');
  }else a.draw(ctx,'ASSET.PROP.CADDY.LID',translate([0,0,12,7],origin),'closed');
 }
 if(s.runtime.intent?.stage==='approaching'){ctx.strokeStyle='#224FC4';ctx.lineWidth=.2;ctx.setLineDash([.5,.5]);ctx.beginPath();ctx.moveTo(...p.avatar);for(const point of s.runtime.intent.path)ctx.lineTo(...point);ctx.stroke();ctx.setLineDash([]);}
}
