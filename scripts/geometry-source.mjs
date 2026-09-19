import {readFile} from 'node:fs/promises';
import {design,rows} from './content-source.mjs';

const action={
 'ACT.JO':'CT.OBJ.TALK','ACT.REMY':'CT.OBJ.TALK','ACT.ARI':'CT.OBJ.TALK','ACT.LOOP':'CT.OBJ.WAKE','LOOP.FOLLOW.PAD':'CT.OBJ.WAKE',
 'ST.MODEL':'CT.OBJ.MODEL','ST.MODEL.TAB':'CT.OBJ.MODEL','ST.SOURCE.E1':'CT.OBJ.BRIEF_OPEN','ST.SOURCE.E6':'CT.OBJ.JO_DRAWER','ST.SOURCE.E4':'CT.OBJ.REQUEST_OPEN','ST.ACCESS.E2':'CT.OBJ.POST','CY.ACCESS.E2':'CT.OBJ.POST',
 'ST.DOCK':'CT.OBJ.DOCK_OPEN','ST.DOCK.FLAP':'CT.OBJ.DOCK_OPEN','ST.DOCK.PAD':'CT.OBJ.DOCK_OPEN','ST.RACK.BAY':'CT.KIT.OPEN_CURRENT','ST.RAIL':'CT.RAIL.ARRANGE',
 'ST.CONTROL.REHEARSE':'CT.WORK.REHEARSE','ST.CONTROL.SHOW':'CT.WORK.PREVIEW','ST.CONTROL.STOP':'CT.RUN.STOP','ST.CONTROL.RESET':'CT.WORK.RESET','ST.CONTROL.CLEAR':'CT.WORK.CLEAR',
 'CY.SOURCE.E3':'CT.OBJ.NOTICE_FLATTEN','CY.SOURCE.E7':'CT.OBJ.REMY_NOTE','WK.ACCESS.NAV':'CT.UI.MAP','WK.WAYFINDING':'CT.UI.MAP','WK.TOAST':'CT.TOAST.START','WK.TOAST.START':'CT.TOAST.START','WK.TOAST.MAGNIFIER':'CT.TOAST.MAGNIFIER','WK.TOAST.SKIP':'CT.TOAST.SKIP',
 'MD.SOURCE.E5':'CT.OBJ.SLATE','MD.SOURCE.E6':'CT.OBJ.JO_NOTE','MD.SOURCE.E7':'CT.OBJ.REMY_NOTE','MD.ACCESS.E8':'CT.KIT.OPEN','KIT.CADDY':'CT.KIT.OPEN_CURRENT','KIT.NOTE.E6':'CT.KIT.NOTE_JO','KIT.NOTE.E7':'CT.KIT.NOTE_REMY',
};
const roomOf=id=>id.startsWith('SC.')?id:id.startsWith('ACT.')?({'ACT.ARI':'SC.MD','ACT.REMY':'SC.CY','ACT.LOOP':'SC.MD'}[id]??'SC.ST'):/^(KIT|LOOP|TILE)\./.test(id)?'SC.MD':/^(MODEL|PUP)\./.test(id)?'SC.ST':`SC.${id.split('.')[0]}`;
const points=text=>[...text.matchAll(/\((\d+(?:\.\d+)?),(\d+(?:\.\d+)?)\)/g)].map(m=>[Number(m[1]),Number(m[2])]);
export async function geometry(plan,manifest,texts) {
  const doc=await readFile(design+'05-FUNCTIONAL-SCENES-AND-INTERACTIONS.md','utf8');
  const allRows=rows(doc);
  const obstacles={
    'SC.ST':[['ST.MODEL',[8,28,32,40]],['ST.BOARD',[46,28,62,38]],['ST.DOCK',[68,28,84,41]],['ST.CONSOLE',[48,66,106,76]]],
    'SC.CY':[['CY.MODEL.BENCH',[10,28,42,40]],['CY.TABLET.STAND',[48,28,58,38]],['CY.NOTICE.BOARD',[80,28,108,40]]],
    'SC.WK':[['WK.BENCH',[12,28,40,40]],['WK.WAYFINDING',[44,28,51,39]],['WK.TOAST',[82,28,108,46]]],
    'SC.MD':[['MD.RECORDING.TABLE',[22,28,61,41]],['MD.RACK.STATION',[78,28,110,41]]],
  };
  for(const [room,rects]of Object.entries(obstacles)) for(const [id,rect]of rects) if(!doc.includes(`${id} C=R(${rect.join(',')})`)) throw new Error(`05 obstacle transcription mismatch: ${id}`);
  const rooms=Object.entries(obstacles).map(([id,values])=>({id,floor:[4,28,116,76],initialArrival:id==='SC.ST'?[20,50]:id==='SC.MD'?[62,66]:[12,62],obstacles:values.map(([ownerId,rect])=>({ownerId,rect})),descriptionCt:`CT.SCENE.${id.slice(3)}`}));
  const doors=allRows.filter(r=>r.line>53&&r.line<78&&/^`[A-Z]{2}\.EXIT\./.test(r.cells[0])).map(r=>{
    const id=r.cells[0].replaceAll('`',''),destinationId=r.cells[2].replaceAll('`','');
    const [approach,threshold]=points(r.cells[1]);
    const facing=r.cells[3].match(/\/ (right|left|up|down)/)?.[1];
    return {id,room:roomOf(id),approach,threshold,destinationId,destinationRoom:roomOf(destinationId),avatarArrival:points(r.cells[3])[0],facing,loopArrival:points(r.cells[4])[0]};
  });
  const actorData=[['ACT.PLAYER','SC.ST',[20,50],2,[]],['ACT.JO','SC.ST',[37,48],3,['E1.a','E1.b','E1.c','E6.a','E6.b','E4.a','E4.b']],['ACT.REMY','SC.CY',[64,48],3,['E7.a','E7.b','E7.c','E2.a','E2.b','E2.c','CT.REMY.CLIP']],['ACT.ARI','SC.MD',[39,52],3,['E3.a','E3.b','E4.a','E4.b','E5.a','E5.b']],['ACT.LOOP','SC.MD',[68,45],2,[]]];
  const actors=actorData.map(([id,room,feet,radius,homeKnowledge])=>({id,room,feet,radius,homeKnowledge}));
  const objects=[];
  for(const {id} of plan.coverage.owners) {
    if(id.startsWith('ACC.')||id.startsWith('SC.'))continue;
    const room=roomOf(id),bindings=manifest.bindings.filter(b=>b.assetUse.ownerId===id);
    const row=allRows.find(r=>r.line>148&&r.line<319&&r.cells[0].includes('`'+id+'`'));
    let visual=row?.cells[1].match(/R\((\d+),(\d+),(\d+),(\d+)\)/)?.slice(1).map(Number);
    let approaches=row?points(row.cells[2]).slice(0,4):[];
    const door=doors.find(d=>d.id===id);
    if(door){visual=id==='WK.EXIT.MD'?[55,20,69,33]:id==='MD.EXIT.WK'?[55,72,69,80]:door.threshold[0]===6?[0,54,8,70]:[112,54,120,70];approaches=[door.approach];}
    let parentId=bindings.find(b=>b.parent)?.parent??null;
    if(parentId?.startsWith('BIND.')) parentId=null;
    const parents={
      'ST.MODEL.TAB':'ST.MODEL','ST.SOURCE.E1':'ST.MODEL','ST.SOURCE.E6':'ST.MODEL','ST.SOURCE.E4':'ST.BOARD','ST.ACCESS.E2':'ST.BOARD','ST.DOCK.FLAP':'ST.DOCK','ST.RACK.BAY':'ST.CONSOLE','ST.RAIL':'ST.CONSOLE',
      'CY.SOURCE.E7':'CY.MODEL.BENCH','CY.MODEL.BOAT':'CY.MODEL.BENCH','CY.PETALS':'CY.MODEL.BENCH','CY.ACCESS.E2':'CY.TABLET.STAND','CY.SOURCE.E3':'CY.NOTICE.BOARD',
      'WK.SCENERY':'WK.BENCH','WK.ACCESS.NAV':'WK.WAYFINDING','WK.TOAST.START':'WK.TOAST','WK.TOAST.MAGNIFIER':'WK.TOAST',
      'MD.SOURCE.E5':'MD.RECORDING.TABLE','MD.SOURCE.E6':'MD.RACK.STATION','MD.SOURCE.E7':'MD.RACK.STATION','MD.ACCESS.E8':'MD.RACK.STATION',
    };
    parentId=parents[id]??parentId;
    if(parentId===id)parentId=null;
    if(!visual){
      const binding=bindings.find(b=>b.coordinateSpace==='room')??bindings[0];
      visual=binding?.assetUse.logicalBounds??null;
      if(binding?.placementOrigin && Array.isArray(binding.placementOrigin)) visual=visual.map((n,i)=>n+binding.placementOrigin[i%2]);
      if(binding?.coordinateSpace==='puppet-local')visual=visual.map((n,i)=>i%2===0?38+n*0.76:2+n*0.23);
      if(binding?.coordinateSpace==='model-100')visual=visual.map((n,i)=>i%2===0?10+n*0.21:18+n*0.17);
    }
    if(/^ST.RAIL.[A-D]$/.test(id)){const x=67+7*(id.charCodeAt(id.length-1)-65);visual=[x-3,68,x+3,74];approaches=[[78,58]];parentId='ST.RAIL';}
    if(id==='ST.DOCK.PAD'){visual=[82,37,86,41];approaches=[[86,48]];parentId='ST.DOCK';}
    if(/^ST.CONTROL./.test(id)){approaches=[[100,58]];parentId='ST.CONSOLE';visual??=[100,72,105,75];}
    if(['ST.CONTROL.RESET','ST.CONTROL.CLEAR','ST.CONTROL.STOP'].includes(id))approaches=[[78,58]];
    if(id==='KIT.CADDY'){visual=[96,32,108,39];approaches=[[101,48]];parentId='MD.RACK.STATION';}
    if(id.startsWith('KIT.NOTE.')){visual=id.endsWith('E6')?[96,28,102,32]:[102,28,108,32];approaches=[[101,48]];parentId='KIT.CADDY';}
    if(id==='LOOP.FOLLOW.PAD'){visual=[66,38,70,41];approaches=[[68,54]];parentId='ACT.LOOP';}
    if(id==='WK.TOAST.SKIP'){visual=[91,37,101,44];parentId='WK.TOAST';}
    if(id==='ACT.PLAYER')visual=[17,38,23,50];
    if(id.startsWith('TILE.')){const cells={FERRY:[103,33,108,36],BRIDGE:[103,36,108,39],PLANT:[97,36,102,39],BLOOM:[97,33,102,36]};visual=cells[id.slice(5)];approaches=[[101,48]];parentId='KIT.CADDY';}
    if(!visual)throw new Error(`No geometry for ${id}`);
    let kind=door?'door':id.startsWith('ACT.')?'actor':id.startsWith('TILE.')?'tile':id.startsWith('KIT.')?'kit':/^(PUP|MODEL)\./.test(id)||id==='ST.PROJECTION'?'projection':id.includes('.SOURCE.')||id.includes('.ACCESS.')?'source':obstacles[room].some(x=>x[0]===id)?'furniture':action[id]?'control':'scenery';
    // The story/model rows describe state endpoints in column three, not approach points.
    if(kind==='projection'||kind==='scenery')approaches=[];
    const collisionOwner=obstacles[room].find(x=>x[0]===id)?.[0]??(parentId&&obstacles[room].some(x=>x[0]===parentId)?parentId:null);
    const defaultActionCt=action[id]??null;
    if(defaultActionCt&&!texts.has(defaultActionCt))throw new Error(`Unknown action ${id} ${defaultActionCt}`);
    objects.push({id,parentId,room,kind,visual,hit:visual,collisionOwner,approaches,defaultActionCt,settleRule:id.startsWith('WK.TOAST')?'toast-reveal':defaultActionCt?'rollback-before-endpoint':'none',assetSlots:bindings.map(b=>b.assetUse.slot)});
  }
  return {rooms,objects,actors,doors};
}
