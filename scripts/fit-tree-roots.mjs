import {WORLD} from '../.cache/landscape-review/garden/worldLayout.js';
import {sceneryFits,insideRing,ringDistance} from '../.cache/landscape-review/garden/sceneryLayout.js';
import {landscapeContext} from '../.cache/landscape-review/garden/assets/reviewLandscape.js';
const context=landscapeContext(),trees=[],factors={tree:.324,'tree-1':.368,willow:.310};
for(const t of WORLD.trees){
 const radius=t.height*factors[t.asset]+.24,candidates=[];
 for(let x=t.x-4;x<=t.x+4;x+=.2)for(let z=t.z-4;z<=t.z+4;z+=.2){
  const p={x:Number(x.toFixed(2)),z:Number(z.toFixed(2))};
  if(Math.sign(p.x)!==Math.sign(t.x)||!sceneryFits(p,radius,context,.65,1.1)||context.obstacles.some(o=>insideRing(p,o)||ringDistance(p,o)<t.crownRadius+.25)||trees.some(o=>Math.hypot(o.x-p.x,o.z-p.z)<(o.crownRadius+t.crownRadius)*.8))continue;
  candidates.push({...t,...p,radius,cost:Math.hypot(p.x-t.x,p.z-t.z)});
 }
 const selected=candidates.sort((a,b)=>a.cost-b.cost)[0];if(selected)trees.push(selected);else console.log('NO FIT',t.asset,t.x,t.z,t.height);
}
console.log(JSON.stringify(trees.map(t=>({x:t.x,z:t.z,height:t.height,asset:t.asset,radius:t.radius,shift:t.cost})),null,2));
