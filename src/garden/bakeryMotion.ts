/** Work clips belong to contact intervals; travel uses the existing walk or
 * carry-walk clips. These phases match the paths in bakeryWorld. */
export function bakeryMotion(actor:'rina'|'sol',kind:string|undefined,t:number){
 const contact=(name:string,start:number,end:number)=>t>=start&&t<end?{kind:name,progress:(t-start)/(end-start)}:undefined;
 if(actor==='sol'){
  if(kind==='tileRemoval')return {carrying:true,action:t<.75?contact('climb',.25,.75):contact('tile',.75,1)};
  if(kind==='flourCheck')return {carrying:true,action:t<.28?{kind:'climb',progress:1-t/.28}:undefined};
  return {carrying:kind==='tileDelivery'||kind==='tilePlacement',action:kind==='tileDelivery'?contact('tile',0,1):kind==='tilePlacement'?contact('roof',.25,.80):undefined};
 }
 if(kind==='bakeryWelcome')return {carrying:t>=.3&&t<.9,action:contact('sack',.3,.45)??contact('sack',.8,.9)};
 if(kind==='flourCheck')return {carrying:false,action:contact('sack',.22,.48)};
 if(kind==='mixDough')return {carrying:t>=.2&&t<.8,action:contact('mix',.2,.62)};
 if(kind==='shapeLoaves')return {carrying:false,action:contact('divide',.2,.8)};
 if(kind==='takeLoaf')return {carrying:t>=.4,action:contact('bread',.4,.6)};
 if(kind==='bakeBread'){
  const q=(t-.08)/.27,trip=q-Math.floor(q),working=t>=.08&&t<.89;
  return {carrying:working&&trip>=.15&&trip<.65,action:working&&(trip<.15||trip>=.55&&trip<.65)?{kind:'bread',progress:trip<.15?trip/.15:(trip-.55)/.10}:undefined};
 }
 if(kind==='bakeUnshaped')return {carrying:t>=.15&&t<.9,action:contact('bread',.15,.25)??contact('bread',.5,.65)};
 return {carrying:kind==='thankSol',action:undefined};
}
