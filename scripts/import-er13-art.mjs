import {readFile,copyFile,writeFile,mkdir} from 'node:fs/promises';
import {basename} from 'node:path';
import {createHash} from 'node:crypto';
const source=process.argv[2];if(!source)throw Error('Expected explicitly accepted delivery record path');
const batch=process.argv[3]??'1';if(!/^\d+$/.test(batch))throw Error('Expected batch number');
const record=JSON.parse(await readFile(source,'utf8'));
const manifest=JSON.parse(await readFile('content/illustrated-assets.json','utf8'));
await mkdir('public/art/er13',{recursive:true});
for(const asset of record.assets){
 if(asset.status!=='ACCEPTED_FOR_INTEGRATION')throw Error('Unaccepted artwork');
 const bytes=await readFile(asset.deliveryPath),hash=createHash('sha256').update(bytes).digest('hex');
 if(hash!==asset.sha256)throw Error('Artwork hash mismatch '+asset.name);
 const filename=basename(asset.deliveryPath);await copyFile(asset.deliveryPath,'public/art/er13/'+filename);
 const base={url:'/art/er13/'+filename,frameWidth:asset.width,frameHeight:asset.height,columns:1,contentRectPixels:[0,0,asset.width,asset.height],referenceHeight:/ASSET\.(ACT|PUP)\./.test(asset.assetId)?asset.referenceStandingHeightPixels:undefined};
 if(asset.frames){
  for(const pose of asset.frames){const [x,y,w,h]=pose.sourceRect;const entry={...base,contentRectPixels:[x,y,x+w,y+h],anchor:pose.feetInCrop};
   manifest[asset.assetId+'/'+pose.pose]=entry;
   if(pose.pose==='idle')manifest[asset.assetId+'/home']=entry;
   if(pose.pose==='explain')manifest[asset.assetId+'/talk']=entry;
  }
  if(asset.assetId==='ASSET.ACT.PLAYER'){
   const direction=asset.frames[0].pose.replace(/\d+$/,'');
   const poses=asset.frames.map(p=>{const [x,y,w,h]=p.sourceRect;return {rect:[x,y,x+w,y+h],anchor:p.feetInCrop};});
   for(const facing of direction==='right'?['right','left']:[direction]){
    const first=poses[1]??poses[0],entry={...base,contentRectPixels:first.rect,anchor:first.anchor,mirror:facing==='left'};
    manifest[asset.assetId+'/idle-'+facing]=entry;
    for(const action of ['walk','carry'])manifest[asset.assetId+'/'+action+'-'+facing]={...entry,frames:poses};
   }
  }
  if(asset.assetId==='ASSET.ACT.LOOP'){
   const entry=manifest[asset.assetId+'/awake'];
   for(const variant of ['standby','following','docked','projecting','rolling-left','rolling-right','rolling-front','rolling-back'])manifest[asset.assetId+'/'+variant]={...entry,mirror:variant==='rolling-right'};
  }
 }else manifest[asset.assetId+'/base']=base;
}
await writeFile('content/illustrated-assets.json',JSON.stringify(manifest,null,2)+'\n');
await writeFile('evidence/er13/art-delivery-batch'+batch+'.json',JSON.stringify(record,null,2)+'\n');
console.log(`Verified and imported ${record.assets.length} accepted assets with explicit source rectangles.`);
