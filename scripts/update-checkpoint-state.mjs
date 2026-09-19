import fs from 'node:fs/promises';
async function edit(file,changes){let text=await fs.readFile(file,'utf8');for(const [before,after]of changes){if(!text.includes(before))throw Error('Missing replacement in '+file+': '+before);text=text.replace(before,after);}await fs.writeFile(file,text);}
await edit('src/garden/model.ts',[
 ["kind==='receiveSeed'?9000", "kind==='receiveSeed'?1100"],
 ["s.chapter.seed==='boat'?'boat'", "s.chapter.seed==='boat'&&s.chapter.river.boat.phase!=='waiting'?'boat'"],
 ["case 'PLANT':if(s.action||!c.crossed", "case 'PLANT':if(c.river.collection&&c.seed==='grandma'||s.action||!c.crossed"],
 ["case 'FERRY':if(s.action||s.panel", "case 'FERRY':if(c.seed==='boat'||s.action||s.panel"],
]);
await edit('src/garden/persistence.ts',[["||!(expected as {payload:Chapter}).payload.river||", "||!(expected as {payload:Chapter}).payload.river?.journeyVersion||!(expected as {payload:Chapter}).payload.river||"]]);
await edit('src/garden/GardenScene.tsx',[
 ["import {makeWorkbench}", "import {grandmaLocation} from './grandmaTravel.js';\nimport {makeWorkbench}"],
 ["s.route.length||s.keys.length||s.action||s.boatTarget", "s.chapter.river.collection&&!s.panel||s.route.length||s.keys.length||s.action||s.boatTarget"],
 ["grandma.rig.position.set(GRANDMA.x,.13,GRANDMA.z);grandma.rig.rotation.y=.36;limbMotion(grandma,false,time);", "const gp=grandmaLocation(c),previousGrandma={x:grandma.rig.position.x,z:grandma.rig.position.z};grandma.rig.position.set(gp.x,.13,gp.z);if(distance(gp,previousGrandma)>.0001)grandma.rig.rotation.y=Math.atan2(gp.x-previousGrandma.x,gp.z-previousGrandma.z);else if(!c.river.collection)grandma.rig.rotation.y=.36;"],
]);
let scene=await fs.readFile('src/garden/GardenScene.tsx','utf8');
const start=scene.indexOf('  // Grandma follows the garden path'),end=scene.indexOf('  function limbMotion',start);if(start<0||end<0)throw Error('Bank path not found');scene=scene.slice(0,start)+scene.slice(end);
const a=scene.indexOf("   if(action?.kind==='receiveSeed'){"),b=scene.indexOf("   if(action?.kind==='loadSeed')",a);if(a<0||b<0)throw Error('Handoff not found');
scene=scene.slice(0,a)+"   if(action?.kind==='receiveSeed')seedPos=new T.Vector3(mooring.x,boatY+.17,mooring.z).lerp(grandma.handPoint(),smooth(t));\n"+scene.slice(b);
await fs.writeFile('src/garden/GardenScene.tsx',scene);
