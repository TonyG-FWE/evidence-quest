import {WORLD,anchors,terrainHeight,BRIDGE_LEVELS,BAKERY_WORK,BAKERY_REPAIR,WORLD_WORKBENCH,VILLAGE_BUILDINGS,riverCenter,riverHalfWidth,type WorldPoint} from '../worldLayout.js';
import {insideRing} from '../sceneryLayout.js';
import {personalPathContains,personalPathDistance} from './personalPathLayout.js';
import {bridgePosts,postStoragePoint} from '../bridgeConstruction.js';
import {STAGED_SECTIONS} from '../model.js';

export type GrassPlacement={position:readonly[number,number,number];rotation:number;scale:number;normal:readonly[number,number,number]};
export const GRASS_SOURCE_SHA='ad697d242cb5a5402829a13b0bc26d5b4aec88e4efa378691269286fd5d1a8a1';
const sourceHeight=.18262481689453125;
export const GRASS_SOURCE_SCALE=.14/sourceHeight;
/** Exact source proportions. All variation is uniform; no new blade geometry. */
export const GRASS_PATCH={height:.14,halfX:.4677734375*GRASS_SOURCE_SCALE,halfZ:.500152587890625*GRASS_SOURCE_SCALE};
/** West bank slice includes meadow, the dock route and the river edge. */
export const GRASS_SAMPLE={x:-5.75,z:-7.2,half:2.5};

/** Convex hull of all 335,946 original source vertices at 14 cm height. This
 * measures placement only; it does not replace, trim, or modify any blades. */
export const GRASS_SOURCE_HULL:readonly (readonly [number,number])[]=[[-.35859,-.03786],[-.34610,-.17429],[-.33993,-.19811],[-.27339,-.29253],[-.24749,-.31216],[-.22225,-.32909],[-.19497,-.34727],[-.10098,-.38342],[.05241,-.37251],[.10579,-.36812],[.17036,-.35595],[.17219,-.35539],[.18902,-.34435],[.31183,-.24768],[.35326,-.20187],[.35859,.08824],[.29847,.24712],[.29819,.24773],[.19230,.31840],[.00306,.38342],[-.20505,.29138],[-.20746,.28977],[-.26649,.23399],[-.33520,.12768],[-.34000,.09882],[-.35845,-.03610]];
const sourceHull=GRASS_SOURCE_HULL;
/** Original foundation vertices below world Y=0.30m, in each normalized source
 * frame before the shared outer building transform. Roof overhangs and player
 * navigation margins must not become bare borders around visible houses.
 * Source hashes: cottage e5fcb550940e; cottage-1 bc475a88992a; bakery 63f0c371788b. */
const foundationHulls:Record<keyof typeof VILLAGE_BUILDINGS,readonly (readonly [number,number])[]>={
 dock:[[-.74863,-1.18579],[-.74762,-1.21207],[-.74698,-1.21536],[-.74437,-1.22763],[-.73723,-1.25061],[-.71164,-1.28815],[-.68335,-1.30801],[-.66458,-1.31516],[-.63954,-1.32111],[.81784,-1.34720],[.85016,-1.33932],[.87378,-1.32742],[.89713,-1.30206],[1.10596,-1.04773],[1.10696,-.97009],[1.10706,-.39542],[1.10477,-.31982],[.93100,1.16711],[.92761,1.19403],[.92102,1.21280],[.90408,1.24200],[.89136,1.25482],[.85355,1.27451],[.83029,1.28082],[.80484,1.28229],[-.60265,1.34692],[-.63446,1.34729],[-.65204,1.34390],[-.68559,1.33017],[-.71484,1.30746],[-.73091,1.28201],[-.73984,1.26260],[-.74519,1.23624],[-.74565,1.21555]],
 workshop:[[-1.36340,.58154],[-1.36139,-.68587],[-1.35992,-.71938],[-1.35599,-.73132],[-1.29309,-.88440],[-.10763,-.86847],[.71645,-.73961],[.73096,-.73700],[.74226,-.72780],[1.13699,.61203],[1.13617,.61885],[.82809,.80923],[.82224,.81125],[.79422,.81482],[-1.28146,.96515],[-1.35342,.80521],[-1.35992,.78726]],
 bakery:[[-1.28232,1.04345],[-1.27664,-1.43802],[-1.27594,-1.48673],[-1.27475,-1.53074],[-1.26519,-1.56899],[-1.24222,-1.59056],[-1.21418,-1.59823],[-1.18147,-1.60165],[-1.14329,-1.60304],[.99376,-1.60328],[1.02903,-1.60318],[1.05916,-1.59996],[1.08440,-1.58754],[1.09615,-1.56350],[1.09827,-1.53702],[1.10133,1.20182],[1.08125,1.22270],[1.05135,1.23013],[1.01848,1.23236],[.98050,1.23350],[-.07962,1.24571],[-.13254,1.24604],[-1.18575,1.24645],[-1.22216,1.24394],[-1.25280,1.23521],[-1.27916,1.20972],[-1.28086,1.18315],[-1.28191,1.15348]],
};
const foundations=(Object.keys(VILLAGE_BUILDINGS) as (keyof typeof VILLAGE_BUILDINGS)[]).map(id=>{const b=VILLAGE_BUILDINGS[id],c=Math.cos(b.rotation),s=Math.sin(b.rotation);return foundationHulls[id].map(([x,z])=>({x:b.position[0]+(x*c+z*s)*b.scale,z:b.position[2]+(-x*s+z*c)*b.scale}));});
// Grass may extend beneath opaque foundation edges, tree roots and decorative
// bank/rock/plant skirts. It stays out of deep house interiors and every actual
// doorway, route, bed and working surface. Physical navigation is unchanged.
const foundationUnderlap=.22;
const scenicObstacleIds=new Set(['dock-office','workshop','bakery','woodland-terrace','coastal-bank','riverbank']);
const workingObstacles=WORLD.obstacles.filter(obstacle=>!scenicObstacleIds.has(obstacle.id));
const handlingClearings=[
 ...Object.entries(anchors).filter(([area])=>area!=='crossing').flatMap(([,a])=>Object.values(a)).map(point=>({point,radius:.62})),
 ...[BAKERY_WORK.mixingActor,BAKERY_WORK.ovenActor,BAKERY_WORK.flourSetdown,BAKERY_WORK.tileApproach,BAKERY_REPAIR.ladderFoot].map(point=>({point,radius:.62})),
 ...[BAKERY_WORK.dryFlour,BAKERY_WORK.toolkit].map(point=>({point,radius:.40})),
 {point:{x:WORLD_WORKBENCH.x-WORLD_WORKBENCH.width/2-.40,z:WORLD_WORKBENCH.z},radius:.55},
];
const workRectangle=(point:WorldPoint,halfX:number,halfZ:number,rotation=0)=>[[-halfX,-halfZ],[halfX,-halfZ],[halfX,halfZ],[-halfX,halfZ]].map(([x,z])=>({x:point.x+x!*Math.cos(rotation)+z!*Math.sin(rotation),z:point.z-x!*Math.sin(rotation)+z!*Math.cos(rotation)}));
/** Source bounds measured after the same outer transforms as GardenScene:
 * posts lie from their storage point to +0.66m Z, max half-width 0.081m;
 * sections measure 1.55 by 1.116m; coils measure 0.25 by 0.234m. Retain a
 * further 0.35m of bare working ground for visible pickup and recovery. */
const bridgeWorkFootprints=[
 ...bridgePosts.map(id=>{const p=postStoragePoint(id);return workRectangle({x:p.x,z:p.z+.33},.081+.35,.33+.35);}),
 ...Object.values(STAGED_SECTIONS).map(p=>workRectangle(p,.775+.35,.558+.35,p.rotation)),
 ...[-.28,.28].map(dx=>workRectangle({x:anchors.crossing.materials.x+dx,z:anchors.crossing.materials.z},.125+.35,.117+.35)),
];
const bridgeWorkHalfDepth=.558+.35;
function signedRingDistance(p:WorldPoint,ring:readonly WorldPoint[]){
 let inside=false,distanceSquared=Infinity;
 for(let i=0,j=ring.length-1;i<ring.length;j=i++){
  const a=ring[i]!,b=ring[j]!;
  if((a.z>p.z)!==(b.z>p.z)&&p.x<(b.x-a.x)*(p.z-a.z)/(b.z-a.z)+a.x)inside=!inside;
  const dx=b.x-a.x,dz=b.z-a.z,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.z-a.z)*dz)/(dx*dx+dz*dz||1))),x=p.x-a.x-t*dx,z=p.z-a.z-t*dz;
  distanceSquared=Math.min(distanceSquared,x*x+z*z);
 }
 return Math.sqrt(distanceSquared)*(inside?-1:1);
}
/** Vertex tests alone can miss a rectangular work-zone corner entering a
 * patch between two source-hull vertices. Check the complete convex polygons,
 * including the horizontal safety envelope of the terrain tilt. */
function overlapsWorkZone(outline:readonly WorldPoint[],zone:readonly WorldPoint[],margin:number){
 for(const ring of [zone,outline])for(let i=0;i<ring.length;i++){
  const p=ring[i]!,q=ring[(i+1)%ring.length]!,x=q.z-p.z,z=p.x-q.x,padding=margin*Math.hypot(x,z);
  let minA=Infinity,maxA=-Infinity,minB=Infinity,maxB=-Infinity;
  for(const a of outline){const d=a.x*x+a.z*z;minA=Math.min(minA,d);maxA=Math.max(maxA,d);}
  for(const b of zone){const d=b.x*x+b.z*z;minB=Math.min(minB,d);maxB=Math.max(maxB,d);}
  if(maxA+padding<=minB||maxB<=minA-padding)return false;
 }
 return true;
}

export function grassGroundAllowed(point:WorldPoint,margin=0){
 if(!WORLD.banks.some(bank=>signedRingDistance(point,bank.polygon)<-margin-.035))return false;
 if(workingObstacles.some(o=>signedRingDistance(point,o.polygon)<margin+.07))return false;
 if(foundations.some(ring=>signedRingDistance(point,ring)<margin-foundationUnderlap))return false;
 if(personalPathContains(point,.035+margin))return false;
 if(bridgeWorkFootprints.some(ring=>signedRingDistance(point,ring)<margin))return false;
 // Roots and decorative props occlude grass naturally; only working envelopes
 // demand clear ground. Original grass vertices remain untouched underneath.
 if(handlingClearings.some(({point:p,radius})=>Math.hypot(point.x-p.x,point.z-p.z)<radius+margin))return false;
 if(Math.hypot(point.x-anchors.crossing.materials.x,point.z-anchors.crossing.materials.z)<1.15+margin)return false;
 if(BRIDGE_LEVELS.crossings.some(z=>Math.abs(point.z-z)<bridgeWorkHalfDepth+margin&&Math.abs(point.x-riverCenter(z))<riverHalfWidth(z)+1.25+margin))return false;
 return true;
}

function preciseGroundClearance(point:WorldPoint){
 let value=Math.max(...WORLD.banks.map(bank=>-signedRingDistance(point,bank.polygon)-.035));
 for(const obstacle of workingObstacles)value=Math.min(value,signedRingDistance(point,obstacle.polygon)-.07);
 for(const ring of foundations)value=Math.min(value,signedRingDistance(point,ring)+foundationUnderlap);
 value=Math.min(value,personalPathDistance(point)-.035);
 for(const ring of bridgeWorkFootprints)value=Math.min(value,signedRingDistance(point,ring));
 for(const {point:p,radius}of handlingClearings)value=Math.min(value,Math.hypot(point.x-p.x,point.z-p.z)-radius);
 value=Math.min(value,Math.hypot(point.x-anchors.crossing.materials.x,point.z-anchors.crossing.materials.z)-1.15);
 for(const z of BRIDGE_LEVELS.crossings){const dx=Math.abs(point.x-riverCenter(z))-riverHalfWidth(z)-1.25,dz=Math.abs(point.z-z)-bridgeWorkHalfDepth;value=Math.min(value,Math.hypot(Math.max(0,dx),Math.max(0,dz))+Math.min(Math.max(dx,dz),0));}
 return value;
}

/** Deterministic overlapping coverage. Density follows eligible land, not a polygon cap. */
export function createPersonalGrass(sampleOnly=false):GrassPlacement[]{
 const placements:GrassPlacement[]=[];let seed=189461;
 const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 // Boundary search uses a local 4cm distance cache. Every accepted source hull
 // still passes the exact tests above; the cache cannot permit an intrusion.
 const distanceCache=new Map<string,number>();
 const groundClearance=(point:WorldPoint)=>{const x=Math.round(point.x/.04),z=Math.round(point.z/.04),key=`${x},${z}`,cached=distanceCache.get(key);if(cached!==undefined)return cached;const value=preciseGroundClearance({x:x*.04,z:z*.04});distanceCache.set(key,value);return value;};
 const nearby=new Map<string,GrassPlacement[]>(),key=(x:number,z:number)=>`${Math.floor(x)},${Math.floor(z)}`;
 const inSample=(p:WorldPoint)=>!sampleOnly||(Math.abs(p.x-GRASS_SAMPLE.x)<=GRASS_SAMPLE.half&&Math.abs(p.z-GRASS_SAMPLE.z)<=GRASS_SAMPLE.half);
 function neighbours(point:WorldPoint){const list:GrassPlacement[]=[];for(let z=Math.floor(point.z)-1;z<=Math.floor(point.z)+1;z++)for(let x=Math.floor(point.x)-1;x<=Math.floor(point.x)+1;x++)list.push(...nearby.get(`${x},${z}`)??[]);return list;}
 function footprint(point:WorldPoint,scale:number,rotation:number){const c=Math.cos(rotation),s=Math.sin(rotation);return sourceHull.map(([x,z])=>({x:point.x+(x*c+z*s)*scale,z:point.z+(-x*s+z*c)*scale}));}
 function covered(point:WorldPoint,existing:readonly GrassPlacement[]){return existing.some(p=>{const dx=point.x-p.position[0],dz=point.z-p.position[2],c=Math.cos(p.rotation),s=Math.sin(p.rotation);return insideRing({x:(dx*c-dz*s)/p.scale,z:(dx*s+dz*c)/p.scale},sourceHull.map(([x,z])=>({x,z})));});}
 function place(point:WorldPoint,scale:number,rotation:number,edge=false){
  if(!inSample(point)||!grassGroundAllowed(point))return false;
  const existing=neighbours(point);if(existing.some(p=>Math.hypot(point.x-p.position[0],point.z-p.position[2])<.235))return false;
  const outline=footprint(point,scale,rotation);
  if(outline.some(p=>!grassGroundAllowed(p)))return false;
  // A boundary copy must cover previously bare ground, not stack another full
  // half-million-triangle source at essentially the same centre.
  if(edge&&outline.filter((p,i)=>i%3===0&&!covered({x:point.x+(p.x-point.x)*.92,z:point.z+(p.z-point.z)*.92},existing)).length<2)return false;
  const e=.12,dx=(terrainHeight({x:point.x+e,z:point.z})-terrainHeight({x:point.x-e,z:point.z}))/(2*e),dz=(terrainHeight({x:point.x,z:point.z+e})-terrainHeight({x:point.x,z:point.z-e}))/(2*e),length=Math.hypot(dx,1,dz);
  // Rotation to the actual slope can shift high blades horizontally. Reserve
  // that full displacement at protected edges without cutting blade geometry.
  const tiltMargin=GRASS_PATCH.height*scale*Math.hypot(dx,dz)/length+.0001;
  if(outline.some(p=>!grassGroundAllowed(p,tiltMargin)))return false;
  if(bridgeWorkFootprints.some(zone=>overlapsWorkZone(outline,zone,tiltMargin)))return false;
  // Put the fitted base just below the lowest sampled support, so no edge floats.
  const y=Math.min(terrainHeight(point),...outline.map(p=>terrainHeight(p)-dx*(p.x-point.x)-dz*(p.z-point.z)))-.007;
  const placement:GrassPlacement={position:[point.x,y,point.z],rotation,scale,normal:[-dx/length,1/length,-dz/length]};placements.push(placement);const cellKey=key(point.x,point.z),list=nearby.get(cellKey)??[];list.push(placement);nearby.set(cellKey,list);return true;
 }
 // At the smallest size the measured hull contains a 0.33m disc. A 0.50m
 // staggered lattice with <=0.02m jitter covers its interior continuously,
 // while avoiding the former four-to-five overlapping full source patches.
 const boundary:WorldPoint[]=[];
 for(let row=0,z=-19.7;z<21.8;row++,z+=Math.sqrt(3)*.25)for(let x=-15.8+(row%2)*.25;x<23.8;x+=.50){
  const point={x:x+(random()-.5)*.04,z:z+(random()-.5)*.04},scale=1+random()*.20,rotation=random()*Math.PI*2;
  if(!inSample(point)||!grassGroundAllowed(point))continue;
  if(!place(point,scale,rotation))boundary.push(point);
 }
 // Slide rejected edge candidates onto the boundary offset, trying both axes
 // of the actual source footprint. Extra edge samples soften scalloped rows.
 for(let z=-19.7;z<21.8;z+=.28)for(let x=-15.8;x<23.8;x+=.28){const p={x,z};if(inSample(p)&&grassGroundAllowed(p)&&groundClearance(p)<.58)boundary.push(p);}
 for(const original of boundary){
  const h=.035,gx=groundClearance({x:original.x+h,z:original.z})-groundClearance({x:original.x-h,z:original.z}),gz=groundClearance({x:original.x,z:original.z+h})-groundClearance({x:original.x,z:original.z-h}),yaw=Math.atan2(-gz,gx);
  for(const rotation of [yaw,yaw+Math.PI/2,yaw+Math.PI]){
   const point={...original};
   for(let step=0;step<5;step++){
    if(place(point,1,rotation,true))break;
    const candidates=[point,...footprint(point,1,rotation)],worst=candidates.reduce((a,p)=>{const d=groundClearance(p);return d<a.d?{p,d}:a;},{p:point,d:Infinity});
    if(worst.d>.012)break;
    const x=groundClearance({x:worst.p.x+h,z:worst.p.z})-groundClearance({x:worst.p.x-h,z:worst.p.z}),z=groundClearance({x:worst.p.x,z:worst.p.z+h})-groundClearance({x:worst.p.x,z:worst.p.z-h}),length=Math.hypot(x,z);if(length<.00001)break;
    const distance=Math.min(.25,Math.max(.024,-worst.d+.045));point.x+=x/length*distance;point.z+=z/length*distance;
    if(Math.hypot(point.x-original.x,point.z-original.z)>.60||!inSample(point))break;
   }
  }
 }
 return placements;
}
