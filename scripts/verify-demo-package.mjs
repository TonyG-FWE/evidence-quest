/** Filesystem-only clean-directory check. Does not build, serve, render or delete. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {randomUUID} from 'node:crypto';
import assert from 'node:assert/strict';
import {hydrateDemoAssets,sha256} from './demo-assets.mjs';
import {readPersonalLandscapeAssets} from './personal-landscape-source.mjs';
import {readPersonalGrassSource} from './personal-grass-source.mjs';

const root=process.cwd(),relative='.tmp/demo-verification-'+randomUUID(),target=path.resolve(relative);
await fs.mkdir(path.dirname(target),{recursive:true});
await fs.mkdir(target,{recursive:false});
const first=await hydrateDemoAssets({packageRoot:root,targetRoot:target});
assert.equal(first.matched,0);assert.equal(first.copied,first.targets);
const second=await hydrateDemoAssets({packageRoot:root,targetRoot:target,verifyOnly:true});
assert.equal(second.matched,first.targets);assert.equal(second.missing,0);
let landscape,grass,reviewFiles=0;
try{
 process.chdir(target);
 landscape=await readPersonalLandscapeAssets();grass=await readPersonalGrassSource();
 const manifest=JSON.parse(await fs.readFile('evidence/final-demo-20260918/review-assets.json','utf8'));
 assert.equal(manifest.profile,'local-review');
 for(const asset of Object.values(manifest.assets))for(const item of [asset,...(asset.animations??[])]){
  assert.equal(sha256(await fs.readFile('.cache/final-demo-review/assets/'+path.basename(item.uri))),item.sha256);reviewFiles++;
 }
 await fs.access('output/personal-landscape-20260918/path/path-support.json');
}finally{process.chdir(root);}
// Prove that an existing wrong target is retained rather than silently replaced.
const mismatch=path.join(target,'evidence/final-demo-20260918/review-assets.json'),original=await fs.readFile(mismatch),sentinel=Buffer.from('synthetic conflicting target');
await fs.writeFile(mismatch,sentinel);
await assert.rejects(hydrateDemoAssets({packageRoot:root,targetRoot:target}),/Existing target differs; preserved without overwrite/);
assert.deepEqual(await fs.readFile(mismatch),sentinel);await fs.writeFile(mismatch,original);

const receipt={schema:'evidence-quest.demo-package-verification.v2',at:new Date().toISOString(),status:'PASS',isolatedDirectory:relative,manifestSha256:first.manifestSha256,filesSha256:first.filesSha256,packageFiles:first.packageFiles,packageBytes:first.packageBytes,hydrationTargets:first.targets,firstCopyCount:first.copied,secondMatchedCount:second.matched,reviewFileReferencesVerified:reviewFiles,landscapeDerivatives:landscape.files.length,landscapeOriginals:landscape.receipt.sources.length,grassOriginalBytes:grass.bytes.length,checks:['all packaged bytes verified before hydration','fresh isolated directory copied every declared target','second pass matched all targets','actual personal landscape and grass loaders accepted hydrated originals/receipts','all review asset and animation references matched','direct path-support runtime import exists','conflicting existing target rejected and preserved'],notRun:['full npm build','browser or GPU work','authored audio verification (separate verify-demo-audio.mjs)','actual audio decoding/listening','human artwork or gameplay acceptance'],scope:'Filesystem and actual loader checks only. No live cache changed; no original deleted; isolated copies remain ignored under .tmp. Historical assets/demo/verification.json is preserved.'};
const receiptFile='evidence/demo-release-20260919/package-isolated-'+path.basename(target).slice('demo-verification-'.length)+'.json';await fs.mkdir(path.dirname(receiptFile),{recursive:true});
await fs.writeFile(receiptFile,JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({receiptFile,...receipt},null,2));
