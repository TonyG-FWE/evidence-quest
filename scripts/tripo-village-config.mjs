import path from 'node:path';
export const ROOT=path.resolve('evidence/hands-on-20260916');
export const REVIEW=path.join(ROOT,'pilot/village-p2-20260917');
export const REVISION='village-p2-20260917';
export const TASK_CAP=1245;
export const CHARACTERS=[
 {id:'grandma',label:'Grandma',height:1.3,hash:'78f8789f67e36ccb31762c93688a95f4a1c91cd959522572a53cbeb8f6a9b8f3',phase:'corrections',story:[{op:'story',phase:'corrections',clips:['turn','sit','dig']}]},
 {id:'mara',label:'Mara',height:1.52,hash:'8d74e7e7615aa0506625a11ca43293f2b024314e3b8c93382406ba25baf3f920',phase:'production',story:[{op:'story',phase:'production',clips:['turn','sit']}]},
 {id:'rina',label:'Rina',height:1.4,hash:'81ffade22fed03d026038aa2f1c37d7b0cfe47bef5f5b2052e2b1f09bd5ca691',phase:'production',story:[{op:'story',phase:'production',clips:['turn','lift_heavy']}]},
 {id:'sol',label:'Sol',height:1.58,hash:'3d9989813b1de25037ef736888dd3dad7caae5d1480e543fd5dcde99ddba4f7b',phase:'production',story:[{op:'story',phase:'production',clips:['turn','sit']},{op:'story-climb',phase:'corrections',clips:['climb']}]},
 {id:'boy',label:'The boy',height:1.06,hash:'e14c2d25d134e036e0316f908c7715c2ee82738dd3b25458b8dcd447fcfca794',phase:'production',story:[{op:'story',phase:'corrections',clips:['turn','sit']}]},
 {id:'operator',label:'Passenger operator',height:1.57,hash:'99a34d972a0febb2f142c9d186f7b67e915e1f4c9c713cf454818f8c3f35dd62',phase:'production',story:[{op:'story',phase:'corrections',clips:['turn','greet_01']}]},
 {id:'passenger',label:'Adult passenger',height:1.5,hash:'b7fcfad2dc33e98d1f6d54bf1124ec03b526637f784a6212de57c4d667899b25',phase:'production',story:[{op:'story',phase:'corrections',clips:['turn','sit']}]}
];
export const referenceFile=c=>path.join(ROOT,`pilot/reference-library-20260917/images/${c.id}-r1.png`);
