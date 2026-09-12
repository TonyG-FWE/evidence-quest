import {readFile,writeFile} from 'node:fs/promises';
const manifest=JSON.parse(await readFile('docs/design/evidence-quest-design-v3/10-asset-production/asset-manifest.json','utf8'));
const replacements=JSON.parse(await readFile('content/illustrated-assets.json','utf8'));
const requested={
 'ASSET.ACT.PLAYER':['reach-front','reach-back','reach-left','reach-right','carry-front','carry-back','carry-left','carry-right'],
 'ASSET.ACT.JO':['face-left','face-right','receive','acknowledge'],
 'ASSET.ACT.REMY':['face-left','face-right','receive','acknowledge'],
 'ASSET.ACT.ARI':['face-left','face-right','receive','acknowledge'],
 'ASSET.ACT.LOOP':['rolling-front','rolling-back','rolling-left','rolling-right','standby','responsive','docked','projecting'],
 'ASSET.ENV.DOOR':['side','north','south'],
 'ASSET.PROP.MODEL.TAB':['rest','pulled'],
 'ASSET.PROP.BRIEF.FLAP':['down','lifted'],
 'ASSET.PROP.NOTE.DRAWER':['closed','open'],
 'ASSET.PROP.DEVICE':['idle','selected'],
 'ASSET.PROP.DOCK.FLAP':['closed','open'],
 'ASSET.PROP.NOTICE':['curled','moving','flat'],
 'ASSET.PROP.NOTICE.CLIP':['latched','released'],
 'ASSET.PROP.SLATE':['base'],
 'ASSET.PROP.PETAL':['flat','bent'],
 'ASSET.PUP.BROKEN_BRIDGE':['left','right'],
 'ASSET.PUP.JOIN':['base'],
 'ASSET.TILE.FERRY':['base'],
 'ASSET.TILE.BRIDGE':['base'],
 'ASSET.TILE.PLANT':['base'],
 'ASSET.TILE.BLOOM':['base'],
 'ASSET.SOURCE.E2.PHOTO':['base'],
};
const requests=Object.entries(requested).map(([id,keys])=>{
 const asset=manifest.assets.find(asset=>asset.id===id);if(!asset)throw Error(id);
 const variants=keys.map(key=>{const variant=asset.variants.find(variant=>variant.key===key);if(!variant)throw Error(id+'/'+key);return {key,frames:variant.frames,frameRate:variant.frameRate,physicalMeaning:variant.description,visibleWhen:variant.visibleWhen,currentAcceptedReplacement:!!replacements[id+'/'+key]};});
 return {assetId:id,name:asset.name,variants,productionBrief:asset.production.brief,originalMasterPixels:asset.production.masterPixels,geometry:asset.geometry,physicalBindings:manifest.bindings.filter(binding=>binding.assetUse?.manifestAssetId===id).map(binding=>({id:binding.id,coordinateSpace:binding.coordinateSpace,assetUse:binding.assetUse})),notes:id.startsWith('ASSET.ACT.')?'Current crew/Pip/Grandma identity and actual feet must remain stable. Reuse a supplied pose only when it expresses the action; frame aliases alone do not satisfy it. Player carry needs independent caddy overlap/attachment, never a baked caddy. Loop has one actual owner.':id.startsWith('ASSET.TILE.')?'All four equal visual status; native text labels remain outside artwork. No implied preferred order.':id==='ASSET.SOURCE.E2.PHOTO'?'Only the same frozen partial notice word CANCELED appears as native text; no full notice or background destination clue.':'Keep readable writing blank for native CT text; same physical owner and approach bounds.'};
});
const data={date:'2026-09-12',scope:'Exact remaining original ART02–07 slots for parent production; continue existing workspace. Not a new gameplay design.',requests,alreadyAcceptedReuse:['All four backplates, crew home/talk/celebrate and four Pip/Grandma poses are accepted. Builder will wire unused celebration/appropriate existing poses into actual states.','Player four-frame right/front/back walk sheets are accepted. Left currently mirrors right under the ER13 delivery instruction.','Caddy open/closed atlas includes its lid and two pockets; no separate caddy/lid/pocket generation requested.','Accepted Toast body/lid/arm/tray/tiny slice/glass are complete; use existing controller choreography.','Existing request envelope/leaflet, stands/furniture, seed/roots/flower/bud/backpack/boats and material crops are accepted.','E2 three frames can keep their current composed accepted Loop/native wood geometry if expressly accepted as the final format; first/second coordinates and empty third-frame crop are already authoritative. No extra frozen scene generation requested unless this native form is rejected.'],exportWork:'Builder will produce measured base/2x derivatives from genuine source detail and implement loading/cache budgets. Original received1536px room sources cannot supply newly invented2880px detail; record this limitation or supply higher-detail originals if original density target is mandatory.'};
await writeFile('evidence/er13/required-art-handoff.json',JSON.stringify(data,null,2)+'\n');
const geometry=asset=>`${asset.geometry.contentPixels.join('×')} content; anchor [${asset.geometry.anchor.join(', ')}]; logical ${asset.geometry.logicalSize?.join('×')??'native source panel'}`;
await writeFile('docs/REQUIRED-ART-HANDOFF.md','# Required original-art slots\n\n'+data.scope+' Full variant descriptions, original master dimensions, attachment anchors and every physical binding are in [the exact production record](../evidence/er13/required-art-handoff.json). Do not divide delivered atlases into equal cells without explicit rectangles.\n\n| Asset ID | Required variants / original cel counts | Aspect, anchor and logical bounds |\n|---|---|---|\n'+requests.map(asset=>`| ${asset.assetId} | ${asset.variants.map(variant=>`${variant.key}: ${variant.frames}`).join('; ')} | ${geometry(asset)} |`).join('\n')+'\n\n'+data.alreadyAcceptedReuse.map(line=>'- '+line).join('\n')+'\n\n'+data.exportWork+'\n');
console.log(`${requests.length} asset entries; exact requested variants and anchors recorded.`);
