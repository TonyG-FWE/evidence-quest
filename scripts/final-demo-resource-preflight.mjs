import fs from 'node:fs/promises';
const root='evidence/final-demo-20260918',manifest=JSON.parse(await fs.readFile(root+'/review-assets.json','utf8'));
const locations=[];
for(const [location,ids]of Object.entries(manifest.locationMembership)){
 let modelBytes=0,brotliModelBytes=0,brotliAnimationBytes=0;
 for(const id of new Set(ids)){const asset=manifest.assets[id],file='dist/review-client'+asset.uri;modelBytes+=(await fs.stat(file)).size;brotliModelBytes+=(await fs.stat(file+'.br')).size;for(const animation of asset.animations??[])brotliAnimationBytes+=(await fs.stat('dist/review-client'+animation.uri+'.br')).size;}
 locations.push({location,models:new Set(ids).size,modelBytes,brotliModelBytes,brotliAnimationBytes,modelBudgetBytes:3*1024*1024,modelBudgetPass:modelBytes<=3*1024*1024});
}
await fs.writeFile(root+'/location-transfer-preflight.json',JSON.stringify({at:new Date().toISOString(),profile:'local-review-pending-approval',scope:'Unique model IDs per declared location, plus separate Brotli HTTP sizes and source-bound animation payloads. Location payload totals are not decoded-memory or request-timing measurements.',locations},null,2)+'\n');
console.log(JSON.stringify(locations));
