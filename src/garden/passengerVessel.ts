import {anchors,type WorldPoint} from './worldLayout.js';

/** Authored approach, sampled from the serialized action's progress. The bow
 * follows the curve's tangent and travel eases to a stop beside the gangway. */
export function passengerVesselPose(progress=1){
 const end=anchors.dock.boat,p0={x:end.x+1,z:end.z-2.1},p1={x:end.x+.45,z:end.z-1.6},p2={x:end.x,z:end.z-.8};
 const t=1-(1-Math.max(0,Math.min(1,progress)))**2,u=1-t;
 const component=(key:'x'|'z')=>u**3*p0[key]+3*u*u*t*p1[key]+3*u*t*t*p2[key]+t**3*end[key];
 const tangent=(key:'x'|'z')=>3*u*u*(p1[key]-p0[key])+6*u*t*(p2[key]-p1[key])+3*t*t*(end[key]-p2[key]);
 return {x:component('x'),z:component('z'),heading:Math.atan2(tangent('x'),tangent('z'))};
}
export function passengerSeat(pose:WorldPoint&{heading:number},x:number,z:number):WorldPoint{
 return {x:pose.x+x*Math.cos(pose.heading)+z*Math.sin(pose.heading),z:pose.z-x*Math.sin(pose.heading)+z*Math.cos(pose.heading)};
}
