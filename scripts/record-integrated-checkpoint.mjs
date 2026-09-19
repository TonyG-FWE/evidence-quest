import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root='evidence/integrated-checkpoint-20260916';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
await fs.mkdir(root,{recursive:true});
try{await fs.access(root+'/baseline.json');throw Error('Baseline already recorded; do not overwrite it');}catch(error){if(error.code!=='ENOENT')throw error;}
const paths=execFileSync('git',['ls-files','--cached','--others','--exclude-standard','src/garden','scripts','browser-tests','checks','package.json','package-lock.json','BUILD-STATUS.md'],{encoding:'utf8'}).trim().split(/\r?\n/);
const files=[];
for(const file of [...new Set(paths)]){const bytes=await fs.readFile(file),target=path.join(root,'before',file);await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,bytes);files.push({file,bytes:bytes.length,sha256:hash(bytes)});}
const approved={pip:'61006b3597984f6e8ceca9d08a0da39cd1e5ff14b407da439672262224024905',grandma:'173164a1639606f0565aca5e8caa22d177d365d6dfb5f1c0ea360f58eeff1a67'};
const assets=[];
for(const [id,expected]of Object.entries(approved)){const file=`evidence/hands-on-20260916/pilot/revision-r2/${id}/${id}-review.glb`,bytes=await fs.readFile(file);if(hash(bytes)!==expected)throw Error('Approval source mismatch: '+id);assets.push({id,file,sha256:expected,bytes:bytes.length,status:'APPROVED',approval:'Explicit Tony request to implement integrated river-to-bakery checkpoint; corrected R2-feet models approved.'});}
await fs.writeFile(root+'/character-form-approval.json',JSON.stringify({recordedAt:new Date().toISOString(),review:'http://127.0.0.1:4318/pilot/revision-r2/review.html',assets,unchangedApprovals:['village layout','four reference images'],notApproved:['seed-boat','lantern-flower','new animation variants','new locally modeled additions'],creditChanges:0},null,2)+'\n');
await fs.writeFile(root+'/baseline.json',JSON.stringify({recordedAt:new Date().toISOString(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),branch:execFileSync('git',['branch','--show-current'],{encoding:'utf8'}).trim(),files},null,2)+'\n');
console.log(`Preserved ${files.length} files; exact R2-feet approvals recorded.`);
