import {readFile,copyFile,writeFile,mkdir} from 'node:fs/promises';
import {basename} from 'node:path';
import {createHash} from 'node:crypto';
const source=process.argv[2];if(!source)throw Error('Expected explicitly accepted delivery record path');
const batch=process.argv[3]??'1';if(!/^\d+$/.test(batch))throw Error('Expected batch number');
const record=JSON.parse(await readFile(source,'utf8'));
const manifest=JSON.parse(await readFile('content/illustrated-assets.json','utf8'));
await mkdir('public/art/er13',{recursive:true});
for(const asset of record.assets){
 if(asset.status!=='ACCEPTED_FOR_INTEGRATION'&&!(asset.status==='ACCEPTED_OPAQUE_MATERIAL'&&asset.assetId==='ER13.MATERIAL.PAPER'))throw Error('Unaccepted artwork');
 const bytes=await readFile(asset.deliveryPath),hash=createHash('sha256').update(bytes).digest('hex');
 if(hash!==asset.sha256)throw Error('Artwork hash mismatch '+asset.name);
 const filename=basename(asset.deliveryPath);await copyFile(asset.deliveryPath,'public/art/er13/'+filename);
 const poseScaled=asset.assetId.startsWith('ASSET.ACT.')||['ASSET.PUP.PIP','ASSET.PUP.GRANDMA'].includes(asset.assetId);
 const base={url:'/art/er13/'+filename,frameWidth:asset.width,frameHeight:asset.height,columns:1,contentRectPixels:[0,0,asset.width,asset.height],referenceHeight:poseScaled?asset.referenceStandingHeightPixels:undefined};
 if(asset.frames){
  for(const pose of asset.frames){const [x,y,w,h]=pose.sourceRect;if(![x,y,w,h].every(Number.isFinite)||x<0||y<0||w<=0||h<=0||x+w>asset.width||y+h>asset.height)throw Error('Invalid accepted crop '+asset.name);
   const anchor=asset.assetId==='ASSET.PUP.ROOTS'?[w/2,0]:poseScaled||['ASSET.PUP.FLOWER','ASSET.PROP.TOAST.ARM'].includes(asset.assetId)?pose.feetInCrop:[w/2,h];
   const entry={...base,contentRectPixels:[x,y,x+w,y+h],anchor};
   manifest[asset.assetId+'/'+pose.pose]=entry;
   if(pose.pose==='idle')manifest[asset.assetId+'/home']=entry;
   if(pose.pose==='explain')manifest[asset.assetId+'/talk']=entry;
  }
  if(asset.assetId==='ASSET.ACT.PLAYER'&&/^(right|front|back)\d+$/.test(asset.frames[0].pose)){
   const direction=asset.frames[0].pose.replace(/\d+$/,'');
   const poses=asset.frames.map(p=>{const [x,y,w,h]=p.sourceRect;return {rect:[x,y,x+w,y+h],anchor:p.feetInCrop};});
   for(const facing of direction==='right'?['right','left']:[direction]){
    const first=poses[1]??poses[0],entry={...base,contentRectPixels:first.rect,anchor:first.anchor,mirror:facing==='left'};
    manifest[asset.assetId+'/idle-'+facing]=entry;
    for(const action of ['walk','carry'])manifest[asset.assetId+'/'+action+'-'+facing]={...entry,frames:poses};
   }
  }
  if(asset.assetId==='ASSET.ACT.PLAYER'&&/^walk-(front|left)-contact/.test(asset.frames[0].pose)){
   const direction=asset.frames[0].pose.split('-')[1];
   const poses=asset.frames.map(p=>{const [x,y,w,h]=p.sourceRect;return {rect:[x,y,x+w,y+h],anchor:p.feetInCrop};});
   manifest[asset.assetId+'/walk-'+direction]={...base,contentRectPixels:poses[0].rect,anchor:poses[0].anchor,frames:poses};
   manifest[asset.assetId+'/idle-'+direction]={...base,contentRectPixels:poses[0].rect,anchor:poses[0].anchor};
  }
  if(asset.assetId==='ASSET.ACT.LOOP'&&asset.frames.some(frame=>frame.pose==='awake')){
   const entry=manifest[asset.assetId+'/awake'];
   for(const variant of ['standby','following','docked','projecting','rolling-left','rolling-right','rolling-front','rolling-back'])manifest[asset.assetId+'/'+variant]={...entry,mirror:variant==='rolling-right'};
  }
  if(asset.assetId==='ASSET.ACT.LOOP'&&asset.frames[0].pose.startsWith('rolling-'))for(const direction of ['front','back','left','right']){
   const poses=asset.frames.filter(pose=>pose.pose.startsWith('rolling-'+direction+'-')).map(p=>{const [x,y,w,h]=p.sourceRect;return {rect:[x,y,x+w,y+h],anchor:p.feetInCrop};});
   if(poses.length!==2)throw Error('Expected the accepted Loop direction pair');
   manifest[asset.assetId+'/rolling-'+direction]={...base,contentRectPixels:poses[0].rect,anchor:poses[0].anchor,frames:poses};
  }
 }else manifest[asset.assetId+'/base']=base;
}
const bind=(source,targets)=>{const entry=manifest[source];if(!entry)return;for(const target of targets)manifest[target]={...entry};};
for(const [pose,targets]of Object.entries({door:['ASSET.ENV.DOOR/side','ASSET.ENV.DOOR/north','ASSET.ENV.DOOR/south'],'model-tab':['ASSET.PROP.MODEL.TAB/rest','ASSET.PROP.MODEL.TAB/pulled'],'brief-down':['ASSET.PROP.BRIEF.FLAP/down'],'brief-lifted':['ASSET.PROP.BRIEF.FLAP/lifted'],'drawer-closed':['ASSET.PROP.NOTE.DRAWER/closed'],'drawer-open':['ASSET.PROP.NOTE.DRAWER/open'],'dock-flap-closed':['ASSET.PROP.DOCK.FLAP/closed'],'dock-flap-open':['ASSET.PROP.DOCK.FLAP/open']}))bind('ER13.ATLAS.SMALL_INTERACTIONS/'+pose,targets);
for(const [pose,targets]of Object.entries({device:['ASSET.PROP.DEVICE/idle','ASSET.PROP.DEVICE/selected','ASSET.PROP.DEVICE/base'],slate:['ASSET.PROP.SLATE/base'],'petal-flat':['ASSET.PROP.PETAL/flat'],'petal-bent':['ASSET.PROP.PETAL/bent'],'clip-latched':['ASSET.PROP.NOTICE.CLIP/latched','ASSET.PROP.NOTICE.CLIP/base'],'clip-released':['ASSET.PROP.NOTICE.CLIP/released']}))bind('ER13.ATLAS.SOURCE_CARRIERS/'+pose,targets);
for(const tile of ['BLOOM','FERRY','PLANT','BRIDGE'])bind('ER13.ATLAS.STORY_TILES/TILE.'+tile,['ASSET.TILE.'+tile+'/base']);
for(const [pose,target]of Object.entries({'broken-left':'ASSET.PUP.BROKEN_BRIDGE/left','broken-right':'ASSET.PUP.BROKEN_BRIDGE/right','boat-connector':'ASSET.PUP.JOIN/base'}))bind('ER13.ATLAS.BRIDGE_PARTS/'+pose,[target]);
if(manifest['ASSET.PROP.CADDY/leaflet']){
 manifest['ASSET.PROP.LEAFLET/sheet']=manifest['ASSET.PROP.CADDY/leaflet'];
 manifest['ASSET.PROP.REQUEST/unfolded']=manifest['ASSET.PROP.CADDY/leaflet'];
 manifest['ASSET.PROP.REQUEST/folded']=manifest['ASSET.PROP.CADDY/envelope'];
}
if(manifest['ASSET.PROP.CY.STAND/base']){
 const sign=JSON.parse(await readFile('content/temp-assets.json','utf8')).bindings.find(b=>b.assetUse.ownerId==='WK.WAYFINDING').assetUse.manifestAssetId;
 manifest[sign+'/base']=manifest['ASSET.PROP.CY.STAND/base'];
}
await writeFile('content/illustrated-assets.json',JSON.stringify(manifest,null,2)+'\n');
await writeFile('evidence/er13/art-delivery-batch'+batch+'.json',JSON.stringify(record,null,2)+'\n');
const files=[];
for(const url of [...new Set(Object.values(manifest).map(entry=>entry.url))].sort()){
 const bytes=await readFile('public'+url);
 files.push({url,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
}
await writeFile('evidence/er13/art-runtime-inventory.json',JSON.stringify({checkedAt:new Date().toISOString(),bindingCount:Object.keys(manifest).length,independentFiles:files.length,totalFileBytes:files.reduce((sum,file)=>sum+file.bytes,0),files,quality:'Accepted for integration. Runtime review is separate; no final-art performance qualification.'},null,2)+'\n');
console.log(`Verified and imported ${record.assets.length} accepted assets with explicit source rectangles.`);
