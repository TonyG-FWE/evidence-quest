import type {Point,Puppet,Rect,Cue} from '../../contracts/types.js';
import type {State} from '../core/state.js';
import {content} from '../core/content.js';
import {ownerRoom} from '../physical/navigation.js';
import {initialPuppet} from '../story/engine.js';
import {Assets,manifest} from './assets.js';
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
 const draw=(id:string,r:Rect,v='base')=>a.draw(ctx,'ASSET.PUP.'+id,r,v);
 draw('LEFT_BANK',[0,56,35,100]);draw('RIVER',[35,59,65,100]);draw('HILL',[65,38,100,100]);
 draw('BROKEN_BRIDGE',[29.5,68,38.5,76],'left');draw('BROKEN_BRIDGE',[61.5,68,70.5,76],'right');
 if(p.boats==='joined'){draw('BOAT',[35,72,50,84]);draw('BOAT',[50,72,65,84]);draw('JOIN',[34,69,67,77]);}
 else{draw('BOAT',[36,82,49,96]);draw('BOAT',[51,82,64,96]);}
 if(p.seed==='soil')draw('FLOWER',[75,16,92,66],p.lit?'open':'bud');
 const pip:Point=[pipX,pipY];
 draw('PIP',translate([-5,-28,11,0],pip),p.pip==='left'?'waiting':p.seed==='soil'?'planting':'arrived');
 draw('BACKPACK',translate([2,-19,7,-7],pip));draw('GRANDMA',[81,37,96,65],p.seed==='soil'?'planting':p.pip==='right'?'together':p.seed==='right'?'receiving':'waiting');
 if(p.seed==='soil')draw('ROOTS',[77.5,64,88.5,76]);else draw('SEED',[seedX-2.5,seedY-3.5,seedX+2.5,seedY+3.5]);
 if(p.lit){const glow=ctx.createRadialGradient(83,22,1,83,22,80);glow.addColorStop(0,'#F3C65C3D');glow.addColorStop(1,'#F3C65C00');ctx.fillStyle=glow;ctx.fillRect(0,0,100,100);}
 ctx.restore();
}
export function paintWorld(ctx:CanvasRenderingContext2D,s:State,a:Assets){
 const p=s.case.physical,room=p.room;
 ctx.clearRect(0,0,120,80);a.draw(ctx,`ASSET.ENV.${room.slice(3)}.BACKPLATE`,[0,0,120,80]);
 const all=manifest.bindings.filter(b=>b.coordinateSpace==='room'&&b.assetUse.manifestAssetId&&ownerRoom(s.case,b.assetUse.ownerId)===room&&!/^(ACT|KIT|TILE|PUP|MODEL)\./.test(b.assetUse.ownerId)&&!b.assetUse.ownerId.startsWith('ST.RAIL.')&&(b.assetUse.role!=='background'||b.assetUse.manifestAssetId==='ASSET.ENV.DOOR'));
 for(const b of all){
  const id=b.assetUse.manifestAssetId!,owner=b.assetUse.ownerId;if(!manifest.assets.some(x=>x.id===id))continue;
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
  a.draw(ctx,id,b.assetUse.logicalBounds as Rect,variant);
 }
 if(room==='SC.ST'){
  const model=s.runtime.intent?.target.startsWith('ST.MODEL')&&s.runtime.intent.stage==='operating'?s.runtime.operationElapsedMs:p.objects.modelTabTried?600:0;
  paintStory(ctx,a,initialPuppet(),[10,18,31,35],undefined,model);
  if(['docked','projecting'].includes(p.loop.mode))paintStory(ctx,a,s.case.playback?.puppet??initialPuppet(),[38,2,114,25],s.case.playback?.activeCue&&s.preferences.motion!=='reduced'?{cue:s.case.playback.activeCue,elapsed:s.runtime.cueElapsedMs}:undefined);
  ctx.strokeStyle='#14646B';ctx.lineWidth=.3;ctx.strokeRect(49,67,14,8);ctx.strokeRect(64,67,29,8);
  for(const [index,tile]of p.order.entries())a.draw(ctx,'ASSET.'+tile,[64+index*7,68,70+index*7,74]);
  for(const [x,color]of [[95,'#F3C65C'],[100,'#E9725C']] as const){ctx.fillStyle=color;ctx.fillRect(x,67,4,4);ctx.strokeStyle='#18324B';ctx.strokeRect(x,67,4,4);}
 }
 const drawActor=(id:string,feet:Point,variant='home')=>{
  const b=manifest.bindings.find(b=>b.assetUse.ownerId===id&&b.assetUse.role==='actor');if(!b)return;
  const home=content.actors.find(actor=>actor.id===id)!.feet;
  const rect=translate(b.assetUse.logicalBounds as Rect,b.coordinateSpace==='room'?[feet[0]-home[0],feet[1]-home[1]]:feet);ctx.fillStyle='#18324B26';ctx.beginPath();ctx.ellipse(feet[0],feet[1],(rect[2]-rect[0])*.45,(rect[3]-rect[1])*.09,0,0,Math.PI*2);ctx.fill();
  const asset='ASSET.'+id;const variants=manifest.assets.find(a=>a.id===asset)?.variants;const frames=variants?.find(v=>v.key===variant)?.frames??1;
  a.draw(ctx,asset,rect,variant,Math.floor(s.runtime.clockMs/140)%frames);
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
