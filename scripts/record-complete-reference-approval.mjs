import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const dir=path.resolve('evidence/hands-on-20260916/pilot/reference-library-20260917');
const read=p=>JSON.parse(fs.readFileSync(path.join(dir,p),'utf8'));
const hash=p=>createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const dest=path.join(dir,'sparkfest-approval-20260917.json');
if(fs.existsSync(dest))throw Error('Approval already recorded; preserve the original receipt.');
const m=read('asset-manifest.json');
const images=[...m.assets.flatMap(a=>a.images.map(i=>({assetId:a.id,world:a.visualWorld,...i}))),...m.contextImages.map(i=>({assetId:i.id,world:i.visualWorld,...i}))];
if(m.assets.length!==77||images.length!==91)throw Error('Unexpected reviewed inventory.');
for(const im of images)if(hash(path.join(dir,im.path))!==im.sha256)throw Error('Reviewed image changed: '+im.id);
const archive=path.join(dir,'history/before-full-reference-approval');
fs.mkdirSync(archive,{recursive:true});
for(const name of ['asset-manifest.json','reference-approvals.json','coverage.json','verification.json','browser-verification-sparkfest.json','index.html','comparison.html','README.md','sparkfest-visual-review.json']){
 const source=path.join(dir,name);if(fs.existsSync(source))fs.copyFileSync(source,path.join(archive,name),fs.constants.COPYFILE_EXCL);
}
const receipt={schema:'eq.reference-image-approval.v1',recordedAt:new Date().toISOString(),approvedBy:'Tony Guillaro',quote:'Alight everything is approved so far',confirmedBy:'PLEASE IMPLEMENT THIS PLAN: Evidence Quest: complete 3D assets and articulated characters',scope:'All current Sparkfest master references and studio context. Existing village approvals remain unchanged. This is image approval only; no generated model Form, movement, or runtime approval.',reviewedManifestSha256:hash(path.join(dir,'asset-manifest.json')),records:images.filter(i=>i.world==='Sparkfest').map(i=>({id:i.assetId,imageId:i.id,role:i.role,sha256:i.sha256,source:path.relative(process.cwd(),path.join(dir,i.path)).replaceAll('\\','/'),approvedBy:'Tony Guillaro',approvalType:'reference-image'}))};
if(receipt.records.length!==11)throw Error('Expected eleven Sparkfest images.');
fs.writeFileSync(dest,JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({newApprovals:receipt.records.length,totalApprovedImages:91,allOriginalImagesUnchanged:true,receipt:path.relative(process.cwd(),dest)}));
