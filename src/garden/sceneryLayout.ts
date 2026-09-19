/** Authored scenery measurements shared by rendering and navigation.
 * Metres, ground origin, uniform source-model scale. No scene or store dependency. */
export type SceneryPoint={x:number;z:number};
type Ring=readonly SceneryPoint[];
export type SceneryContext={banks:readonly Ring[];obstacles:readonly Ring[];paths:readonly Ring[];clearings:readonly SceneryPoint[]};
export type ReviewTree=SceneryPoint&{height:number;scale:number;rotation:number;radius:number;asset:'tree'|'tree-1'|'willow';crownRadius:number};
// Original source vertices below 35 cm give these conservative radial root
// envelopes per metre of tree height. Add Pip's body clearance, not just the
// much narrower trunk. See tree-root-measurements.json in the dated review.
const rootFactor={tree:.324,'tree-1':.368,willow:.310} as const;

export function distanceToSegment(p:SceneryPoint,a:SceneryPoint,b:SceneryPoint){
 const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1)));
 return Math.hypot(p.x-a.x-t*dx,p.z-a.z-t*dz);
}
export function insideRing(p:SceneryPoint,ring:Ring){
 let inside=false;
 for(let i=0,j=ring.length-1;i<ring.length;j=i++){
  const a=ring[i]!,b=ring[j]!;
  if((a.z>p.z)!==(b.z>p.z)&&p.x<(b.x-a.x)*(p.z-a.z)/(b.z-a.z)+a.x)inside=!inside;
 }return inside;
}
export function ringDistance(p:SceneryPoint,ring:Ring){return Math.min(...ring.map((a,i)=>distanceToSegment(p,a,ring[(i+1)%ring.length]!)));}
export function pathDistance(p:SceneryPoint,paths:readonly Ring[]){return Math.min(...paths.flatMap(path=>path.slice(1).map((b,i)=>distanceToSegment(p,path[i]!,b))));}
export function sceneryFits(p:SceneryPoint,radius:number,context:SceneryContext,pathGap=.85,activityGap=1.6){
 return context.banks.some(bank=>insideRing(p,bank)&&ringDistance(p,bank)>radius)
  &&!context.obstacles.some(obstacle=>insideRing(p,obstacle)||ringDistance(p,obstacle)<radius+.25)
  &&pathDistance(p,context.paths)>radius+pathGap
  &&context.clearings.every(q=>Math.hypot(p.x-q.x,p.z-q.z)>radius+activityGap);
}

/** Boundary groves frame the inhabited clearings. Mature tree crowns remain
 * outside building bounds; trunks use the same positions/radii as pathfinding. */
export function createReviewTrees(context:SceneryContext):readonly ReviewTree[]{
 const candidates:readonly (readonly [number,number,number,ReviewTree['asset']])[]=[
  [-11.8,-10.2,6.6,'tree'],[-8.1,-4.7,6.4,'tree'],
  [-7.0,1.7,5.8,'tree-1'],[-8.4,7.5,6.7,'tree'],[-6.4,12.7,7.4,'willow'],
  [-2.9,18.8,6.9,'tree'],[13.8,-14.4,4.4,'tree-1'],
  [15.25,6.3,6.6,'tree'],[12.3,10.0,6.4,'tree'],[7.4,18.8,7.6,'willow'],
  // The garden's foreground is open; a younger tree frames the left corner.
  [5.6,14.8,3.1,'tree'],
  [9.3,2.0,4.6,'tree'],
 ];
 const trees:ReviewTree[]=[];
 for(const [index,[x,z,height,asset]]of candidates.entries()){
  const point={x,z},crownRadius=height*(asset==='willow'?.46:.43),radius=height*rootFactor[asset]+.24;
  // The entire crown may overhang grass, but never a building or a working
  // clearing. The root/trunk circle includes the player's walking clearance.
  if(!sceneryFits(point,radius,context,.65,1.1)
   ||context.obstacles.some(obstacle=>insideRing(point,obstacle)||ringDistance(point,obstacle)<crownRadius+.25)
   ||trees.some(tree=>Math.hypot(tree.x-x,tree.z-z)<(tree.crownRadius+crownRadius)*.8))continue;
  trees.push({...point,asset,height,scale:height/(asset==='willow'?3.5:asset==='tree'?2.6:2.4),rotation:(index*2.399963)% (Math.PI*2),radius,crownRadius});
 }
 return trees;
}
