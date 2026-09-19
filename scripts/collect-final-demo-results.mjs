import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root='evidence/final-demo-20260918',sha=b=>createHash('sha256').update(b).digest('hex');
const requiredRun=process.argv[2]??'required-r9';
const runs={required:root+'/'+requiredRun+'/browser.json',functional:root+'/functional-matrix-browser.json',performance:root+'/quiet-performance.json',studio:root+'/studio-transfer/final-formats-matrix.json'},reports={};
function specs(suite){return [...(suite.specs??[]),...(suite.suites??[]).flatMap(specs)];}
for(const [name,file]of Object.entries(runs)){
 let report;try{report=JSON.parse(await fs.readFile(file,'utf8'));}catch(error){if(error.code!=='ENOENT')throw error;reports[name]={status:'NOT_FINISHED',file};continue;}
 const tests=specs(report).flatMap(spec=>spec.tests.map(test=>({file:spec.file,title:spec.title,project:test.projectName,status:test.status,results:test.results.map(result=>({status:result.status,duration:result.duration,errors:(result.errors??[]).map(e=>e.message),attachments:(result.attachments??[]).map(a=>({name:a.name,contentType:a.contentType,...(a.path?{path:a.path}:{}),...(a.body&&a.contentType==='application/json'?{data:JSON.parse(Buffer.from(a.body,'base64').toString())}:{})}))}))})));
 reports[name]={file,stats:report.stats,errors:report.errors,tests};
}
const binding=JSON.parse(await fs.readFile(root+'/'+requiredRun+'/source-binding.json','utf8')),changed=[];
for(const record of binding.records)if(sha(await fs.readFile(record.file))!==record.sha256)changed.push(record.file);
const inventory=JSON.parse(await fs.readFile(root+'/inventory.json','utf8')),originalChanges=[];
for(const file of inventory.files)if(sha(await fs.readFile(file.file))!==file.sha256)originalChanges.push(file.file);
const result={at:new Date().toISOString(),profile:'local-review-pending-approval',sourceSha256:binding.sourceSha256,sourceChangesSinceRequiredStart:changed,suppliedOriginals:{count:inventory.files.length,changes:originalChanges},commands:JSON.parse(await fs.readFile(root+'/'+requiredRun+'/commands.json','utf8')),reports,humanReview:'PENDING; automated and fixture checks do not confer Form, movement or experience acceptance',providerBoundaries:{TASK11_19:'HALTED 1/75',Tripo:'2250/2500; includes the separately authorized 110-credit grass request',grassProvenance:'output/grass-tuft-20260918/provenance.json'}};
await fs.writeFile(root+'/final-results.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({sourceSha256:binding.sourceSha256,changed,originalChanges,reports:Object.fromEntries(Object.entries(reports).map(([key,r])=>[key,r.stats??r.status]))},null,2));
