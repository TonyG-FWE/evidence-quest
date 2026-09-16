import * as T from 'three';
import {PaperArt,makeLantern,makeSeedBoat} from './art.js';
export const STORY_FLOWERS=[{x:4.8,z:4.9},{x:2.85,z:4.75},{x:5.45,z:3.65},{x:5.55,z:2.9},{x:3.35,z:4.65}] as const;
export function makeWorkshop(a:PaperArt){
 const root=new T.Group();root.position.set(4.3,.08,-3.65);
 a.box(root,0,.67,0,1.8,1.34,1.3,'#c7b883');const roof=a.shape(root,[[-1.06,0],[0,.65],[1.06,0]],1.54,'#588579');roof.position.set(0,1.34,-.77);
 a.box(root,-.42,.44,.675,.42,.88,.035,'#765941');a.box(root,-.42,.50,.70,.34,.68,.016,'#c6a26e');a.ball(root,-.28,.44,.73,.022,'#e1be76');
 a.box(root,.45,.87,.675,.55,.40,.035,'#547d72');a.box(root,.45,.87,.706,.028,.42,.016,'#e8d3a2');
 a.box(root,.5,.44,1.05,.72,.10,.44,'#b18459');for(const x of [.21,.78])a.box(root,x,.2,1.05,.07,.4,.08,'#876641');
 a.box(root,.5,.51,1.07,.3,.04,.20,'#f4e7c4');a.cylinder(root,.72,.56,1.05,.015,.015,.28,'#7f6549').rotation.z=1.2;
 a.box(root,-.50,1.17,.73,.5,.16,.03,'#dac99d');a.box(root,-.50,1.18,.752,.28,.025,.012,'#687d5d');
 a.mergeStatic(root);return root;
}
export function makeStoryFlowers(a:PaperArt){return STORY_FLOWERS.map((p,i)=>{const flower=makeLantern(a,p.x,p.z,i<2?'#d4ba83':i===2?'#e4c375':i===3?'#d6a878':'#e4d69c');flower.root.scale.setScalar(i<2?.8:.68);flower.root.userData['target']='lantern:'+['picnic','duet','mara','sol','grandma'][i];return flower;});}
export function makePassengerBoat(a:PaperArt){
 const root=makeSeedBoat(a);root.scale.set(2.6,1.5,2);root.userData['kind']='passenger-launch';
 // Passenger benches and an operator's tiller distinguish this vessel from the open seed carrier.
 for(const x of [-.18,.13]){a.box(root,x,.21,0,.10,.06,.44,'#9d704e');a.box(root,x-.045,.32,0,.025,.18,.44,'#b28d5b');}
 a.box(root,.43,.24,0,.13,.07,.32,'#e6d6a4');a.cylinder(root,.46,.37,0,.018,.018,.27,'#705639').rotation.z=.55;
 for(const z of [-.245,.245]){a.line(root,[new T.Vector3(-.32,.36,z),new T.Vector3(.31,.36,z)],'#e8d6ae',.018);for(const x of [-.32,.31])a.cylinder(root,x,.285,z,.016,.016,.15,'#e8d6ae');}
 a.box(root,-.48,.32,0,.055,.14,.11,'#bc704e');return root;
}
