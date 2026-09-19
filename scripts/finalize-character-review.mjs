import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const base='evidence/hands-on-20260916',pilot=base+'/pilot',root=pilot+'/revision-r2';
const read=async file=>JSON.parse(await fs.readFile(file,'utf8'));
const hash=async file=>createHash('sha256').update(await fs.readFile(file)).digest('hex');
const manifest=await read(root+'/manifest.json'),browser=await read(root+'/browser-results.json'),ledger=await read(base+'/tripo-ledger.json');
const approval=await read(pilot+'/approval.json'),rejection=await read(pilot+'/character-rejection.json');
if(browser.stats.expected!==18||browser.stats.unexpected||browser.stats.skipped||browser.stats.flaky)throw Error('Review browser matrix is incomplete');
const testLog=await fs.readFile(root+'/contracts.log','utf8');if(!testLog.includes('pass 23')||!testLog.includes('fail 0'))throw Error('Focused checks are incomplete');
if(ledger.actualCharged!==290||ledger.reservedForUnresolved!==0||ledger.jobs.length!==10)throw Error('Unexpected provider-ledger change');
for(const [file,expected] of Object.entries(approval.hashes))if(await hash(base+'/'+file)!==expected)throw Error('Approved layout/reference changed: '+file);
for(const entry of rejection.files)if(await hash(pilot+'/rejected-r1/'+entry.file)!==entry.sha256)throw Error('Rejected review archive changed: '+entry.file);
await fs.mkdir(pilot+'/rejected-r1/models',{recursive:true});
for(const asset of manifest.assets){
 if(await hash(base+asset.visual.uri)!==asset.visual.sha256)throw Error('Corrected mesh hash mismatch');
 if(await hash(base+asset.previous.visual.uri)!==asset.previous.visual.sha256)throw Error('Rejected mesh hash mismatch');
 if(await hash(pilot+'/'+asset.rig.source)!==asset.rig.sourceSha256)throw Error('Provider source changed');
 if(await hash(pilot+'/revision-r2-before-foot-alignment/'+asset.id+'/'+asset.id+'-review.glb')!==asset.rig.footAlignment.previousSha256)throw Error('Pre-alignment R2 archive changed');
 const archive=pilot+'/rejected-r1/models/'+asset.id+'.glb';
 try{await fs.copyFile(base+asset.previous.visual.uri,archive,1);}catch(error){if(error.code!=='EEXIST')throw error;}
 if(await hash(archive)!==asset.previous.visual.sha256)throw Error('Rejected mesh archive mismatch');
}
const inspected=[root+'/manifest.json',root+'/review.html',root+'/review.js',root+'/runtime/visualAsset.js',...manifest.assets.map(a=>base+a.visual.uri)];
for(const file of inspected)if((await fs.stat(file)).mtimeMs>Date.parse(browser.stats.startTime))throw Error('Browser verification predates reviewed source: '+file);
const implementation=['src/garden/assets/visualAsset.ts','scripts/rebuild-character-rigs.py','scripts/align-character-feet.py','scripts/build-character-review.mjs','scripts/character-visual.test.mjs','scripts/audit-character-deformation.mjs','character-playwright.config.ts','character-browser-tests/animation.spec.ts'];
const hashes={};for(const file of [...inspected,...implementation])hashes[file]=await hash(file);
const verification={schema:'evidence-quest.character-revision-verification.v2',recordedAt:new Date().toISOString(),status:'CORRECTED_CHARACTER_REVIEW_PENDING_OWNER',humanFormApproval:false,productionExport:false,gameIntegration:false,
 budget:{actualCredits:290,additionalCredits:0,pilotRemaining:110,totalRemaining:2210,unresolvedJobs:0,ledgerSha256:await hash(base+'/tripo-ledger.json')},
 preserved:{approvedLayoutReferenceHashes:11,providerMeshes:true,originalEmbeddedTextures:true,rejectedReviewArchive:true,preAlignmentR2Archive:true},
 footCorrection:{request:'Make both characters feet straight forward.',localOnly:true,animationsAndSkinWeightsUnchanged:true,assets:manifest.assets.map(a=>({id:a.id,...a.rig.footAlignment}))},
 assets:manifest.assets.map(a=>({id:a.id,sha256:a.visual.sha256,triangles:a.triangles,bytes:a.bytes,bones:Object.keys(a.rig.bones).length,clips:a.visual.rig.clips,reviewOnly:true})),
 commands:[{command:'node --test scripts/character-visual.test.mjs scripts/tripo-pilot.test.mjs',status:'PASS',checks:23,log:'contracts.log'},{command:'npm run check',status:'PASS_RETAINED_FROM_R2',scope:'The preceding R2 rebuild passed project TypeScript, schema generation and UI copy. The foot-only refinement leaves the TypeScript adapter unchanged.'},{command:'npm run test:browser -- --config character-playwright.config.ts',status:'PASS',cases:18,report:'browser-results.json',nativeBrowserPermissions:true}],
 browserScope:'Review only: Chromium/Firefox/WebKit DPR1/2, all four clips, angles, cycle scrubbing, carrying, a start/turn/stop journey, rejected comparison, resource release and compact native controls with reduced motion.',
 preliminaryAttempts:[{status:'SETUP_FAILURE',reason:'Direct Playwright invocation used the default browser cache instead of the project cache.',report:'browser-results-initial-missing-browser-path.json'},{status:'INTERRUPTED',reason:'Sandboxed run passed six Chromium cases but stalled launching Firefox; interrupted before the successful native-permission matrix.'}],
 visualEvidence:'screenshots/',deformationAudit:'deformation-audit.json',
 limitations:['Human visual acceptance is pending; automated checks do not establish naturalness, enjoyment or learning.','Pip has 8010 triangles, ten above the 8000 target after adding knee topology. Grandma has 7999. No source textures were reduced.','The existing game WebKit DPR2 p95 failure, full performance/memory/loading limits, actual game integration and complete chapter qualification remain open.','All eight required commands and the complete five-arrangement/nine-narrative/migration/accessibility matrix follow accepted-art integration. This is not that qualification.','Native assistive-technology and physical-device checks are not established by browser automation.','TASK11.19 remains halted at 1/75 with no request, retry or reset.'],hashes};
await fs.writeFile(root+'/verification.json',JSON.stringify(verification,null,2)+'\n');
console.log(JSON.stringify({status:verification.status,focusedChecks:23,browserCases:18,additionalCredits:0,assets:verification.assets}));
