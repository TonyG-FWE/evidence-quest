/** A finite reviewable staging list. This script never stages or commits files. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {demoInputFiles,listFiles,fileRecords,recordsDigest,changedRecords,safeRelative} from './demo-inputs.mjs';
import {OPERATIONAL_LEDGERS} from './demo-ledgers.mjs';

export const RELEASE_FILES='assets/demo/release-files.json';
export async function releaseFileSelection(root=process.cwd(),extraFiles=[]){
 const files=await demoInputFiles(root);
 const packaging=JSON.parse(await fs.readFile(path.join(root,'assets/demo/staging-allowlist.json'),'utf8'));
 files.push(...packaging.paths,...packaging.requiredExistingBuildSources);
 for(const directory of ['checks','browser-tests','evaluation','docs/game-review'])files.push(...await listFiles(root,directory));
 for(const file of await fs.readdir(root))if(/(?:config[^/]*\.(?:ts|json))$/.test(file))files.push(file);
 files.push('README.md','BUILD-STATUS.md','AGENTS.md','.env.example','.gitignore','.gitattributes','docs/TEST-ARTIFACT-RETENTION.md','docs/PROVENANCE.md','docs/PRODUCTION-TOOLCHAIN.md','docs/BUILD-START.md','evidence/group-7-review-20260915/group-6-migration-inputs.json');
 files.push(...OPERATIONAL_LEDGERS.map(item=>item.file));
 files.push('evidence/integrated-checkpoint-20260916/character-form-approval.json');
 for(const file of extraFiles){
  if(!safeRelative(file)||!/^evidence\/.+\.(?:json|md|tsv)$/.test(file)||/(?:^|\/)(?:cache|trace|traces|private-inputs)(?:\/|$)/.test(file))throw Error('Extra release evidence needs an explicit safe compact path: '+file);
  files.push(file);
 }
 return [...new Set(files)].filter(file=>file!==RELEASE_FILES).sort();
}
export async function writeReleaseFiles({root=process.cwd(),extraFiles}={}){
 if(extraFiles===undefined){try{const prior=JSON.parse(await fs.readFile(path.join(root,RELEASE_FILES),'utf8'));if(prior.schema!=='evidence-quest.demo-release-files.v1'||!Array.isArray(prior.extraFiles))throw Error('Invalid prior release selection');extraFiles=prior.extraFiles;}catch(error){if(error.code!=='ENOENT')throw error;extraFiles=[];}}
 const records=await fileRecords(root,await releaseFileSelection(root,extraFiles));
 const receipt={schema:'evidence-quest.demo-release-files.v1',profile:'local-review-personal-landscape',extraFiles:[...new Set(extraFiles)].sort(),filesSha256:recordsDigest(records),fileCount:records.length,bytes:records.reduce((n,entry)=>n+entry.bytes,0),files:records,manifestFile:RELEASE_FILES,scope:'Explicit file selection for human review before staging. No Git mutation. Includes content-referenced runtime images, narrative authority, test fixtures, exact authored audio generation inputs and durable ledgers. Excludes temporary and historical pilot trees, credentials, dynamic audio and compiled outputs. Stage this manifest separately; its own bytes cannot hash themselves.'};
 await fs.writeFile(path.join(root,RELEASE_FILES),JSON.stringify(receipt,null,2)+'\n');return receipt;
}
export async function verifyReleaseFiles(root=process.cwd()){
 const manifest=JSON.parse(await fs.readFile(path.join(root,RELEASE_FILES),'utf8'));
 if(manifest.schema!=='evidence-quest.demo-release-files.v1'||!Array.isArray(manifest.files)||!Array.isArray(manifest.extraFiles)||recordsDigest(manifest.files)!==manifest.filesSha256)throw Error('Invalid release-file manifest');
 const records=await fileRecords(root,await releaseFileSelection(root,manifest.extraFiles)),changed=changedRecords(manifest.files,records);
 if(changed.length)throw Error('Release selection changed; review and regenerate before staging: '+changed.join(', '));
 return manifest;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const [operation,...args]=process.argv.slice(2),extraFiles=[];
 if(!['write','verify'].includes(operation))throw Error('Usage: node scripts/demo-release-files.mjs write [--evidence path] | verify');
 for(let i=0;i<args.length;i++){if(operation==='write'&&args[i]==='--evidence'&&args[i+1])extraFiles.push(args[++i]);else throw Error('Unexpected release-file argument');}
 const result=operation==='write'?await writeReleaseFiles(args.length?{extraFiles}:{}):await verifyReleaseFiles();
 console.log(JSON.stringify({status:operation==='write'?'REVIEWABLE_SELECTION_WRITTEN':'RELEASE_FILES_MATCH',file:RELEASE_FILES,files:result.fileCount,bytes:result.bytes,sha256:result.filesSha256},null,2));
}
