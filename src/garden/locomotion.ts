import {anchors,WALK_SPEED,type WorldPoint} from './worldLayout.js';
import {runtimeAssets} from './assets/runtimeManifest.js';

const activities=[anchors.dock.approach,anchors.crossing.approach,anchors.crossing.materials,anchors.garden.approach,anchors.garden.plant,anchors.bakery.approach,anchors.bakery.shelf,anchors.workshop.approach];
const approvedWalkSpeed=(1/3)/(58/60);
/** The store and actor use one gait decision. No animation phase enters a save. */
export function pipLocomotion(point:WorldPoint,hasApprovedJog=!!runtimeAssets.pip.rig?.gaits?.jog):{gait:'walk'|'jog';speed:number}{
 // Existing travel timing remains until the separately reviewed gait is approved.
 if(!hasApprovedJog)return {gait:'walk',speed:WALK_SPEED};
 const proximity=Math.min(...activities.map(p=>Math.hypot(p.x-point.x,p.z-point.z)));
 const bridge=Math.abs(point.x)<2.7&&point.z>=-2.7&&point.z<=3.7;
 const blend=bridge?0:Math.max(0,Math.min(1,(proximity-.60)/.65));
 return {gait:blend>.18?'jog':'walk',speed:approvedWalkSpeed+(WALK_SPEED-approvedWalkSpeed)*blend};
}
