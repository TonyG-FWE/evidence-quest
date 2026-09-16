import * as T from 'three';
import {PaperArt} from './art.js';
/** A small paper picture held by one flower; the full memory opens on inspection. */
export function makeLanternPicture(a:PaperArt){
 const root=new T.Group();let previous='';
 function show(kind:string|null){
  root.visible=!!kind;if(!kind||kind===previous)return;previous=kind;root.clear();
  a.box(root,0,0,0,.62,.47,.035,'#fff6d7');a.box(root,0,-.19,.026,.55,.025,.015,'#cbb779');
  const person=(x:number,z:number,color:string)=>{a.box(root,x,-.015,z,.08,.15,.025,color);a.ball(root,x,.10,z,.052,'#eccb97');};
  if(kind==='picnic'){a.box(root,0,-.035,.04,.38,.22,.02,'#e4b883');for(const x of [-.16,.16])for(const y of [-.12,.06])a.ball(root,x,y,.065,.035,'#729080');}
  else if(kind==='duet'){for(const x of [-.11,.11]){a.box(root,x,.035,.05,.025,.23,.025,'#4c786a');a.ball(root,x-.036,-.07,.07,.056,'#4c786a',[1,.7,.4]);}a.box(root,0,.14,.05,.23,.025,.025,'#4c786a');}
  else if(kind==='promise'||kind==='repair'){const wing=a.shape(root,[[0,0],[-.23,.13],[-.1,-.08],[.1,-.08],[.23,.13]],.012,'#e5bb5c');wing.position.z=.04;if(kind==='repair')a.box(root,.10,.01,.095,.075,.14,.016,'#fbefd0');}
  else if(['bread','thanks','both'].includes(kind)){a.ball(root,0,-.005,.07,.17,'#cf955c',[1.25,.55,.3]);for(const x of [-.08,0,.08])a.box(root,x,.035,.126,.018,.07,.008,'#fff1b8');if(kind!=='bread'){person(-.23,.06,'#478777');person(.23,.06,'#c88859');}}
  else if(kind==='draft'){a.box(root,0,0,.055,.27,.32,.015,'#fffdf0');for(let i=0;i<3;i++)a.box(root,0,.08-i*.05,.075,.21,.012,.01,'#688575');}
  else if(kind==='bench'){a.box(root,0,.04,.04,.4,.11,.035,'#b78b58');a.box(root,0,-.05,.04,.4,.055,.05,'#b78b58');for(const x of [-.1,.1])a.box(root,x,-.012,.08,.15,.04,.025,'#e5c767');}
  else if(kind==='planting'){person(-.18,.05,'#c88859');person(.18,.05,'#478777');a.box(root,0,-.08,.06,.025,.14,.02,'#478777');a.ball(root,0,.025,.08,.07,'#e5c767');}
  else {const mara=kind!=='gather-absent';person(-.21,.05,'#c88859');person(-.07,.05,'#478777');person(.075,.05,'#b37b50');if(mara)person(.22,.05,'#355f74');a.box(root,kind==='gather-mara'?.23:-.20,-.02,.10,.08,.105,.012,'#fffdf0');}
  a.mergeStatic(root);
 }
 return {root,show};
}
