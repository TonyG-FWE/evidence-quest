import {readFile,writeFile,readdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';

const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
const reports=[];
for(const name of await readdir('evidence/er13')){
 if(!name.endsWith('.json'))continue;
 const bytes=await readFile('evidence/er13/'+name),data=JSON.parse(bytes);
 if(!data.stats||!data.suites)continue;
 const outcomes=[];
 function visit(suites){for(const suite of suites){for(const spec of suite.specs??[])for(const test of spec.tests??[])outcomes.push({file:spec.file,title:spec.title,project:test.projectName,status:test.results.at(-1)?.status??'not-run',attempts:test.results.length});visit(suite.suites??[]);}}
 visit(data.suites);reports.push({file:'evidence/er13/'+name,sha256:digest(bytes),stats:data.stats,outcomes});
}
reports.sort((a,b)=>a.stats.startTime.localeCompare(b.stats.startTime));
const latest=new Map();for(const report of reports)for(const outcome of report.outcomes)latest.set(outcome.project+'|'+outcome.file+'|'+outcome.title,{...outcome,evidence:report.file,runStarted:report.stats.startTime});
const paths=execFileSync('git',['ls-files','-co','--exclude-standard','--','src','server','contracts','content','checks','browser-tests','scripts','package.json','package-lock.json','vite.config.ts','playwright.config.ts','tsconfig.base.json','tsconfig.client.json','tsconfig.server.json','tsconfig.checks.json'],{encoding:'utf8'}).trim().split(/\r?\n/).filter(Boolean);
const files=[];for(const path of [...new Set(paths)].sort()){const bytes=await readFile(path);files.push({path,bytes:bytes.length,sha256:digest(bytes)});}
const latestOutcomes=[...latest.values()];
const data={recordedAt:new Date().toISOString(),phase:'ER13_TASK17_CHECKPOINT_CONTINUING_FINAL_PRODUCTION',experienceAcceptance:'NATIVE_PATHS_REVIEWED_ORIGINAL_FINAL_ART_AND_PERFORMANCE_PENDING',basis:'Retained reports from successive correction builds; latest results per named check are a union, not one full-suite run on a single final revision.',baselineCommit:'3df39da0ac396942c11d570c5d24c67d96e42a27',reports,latestOutcomes,latestSummary:{checks:latestOutcomes.length,passed:latestOutcomes.filter(x=>x.status==='passed').length,notPassed:latestOutcomes.filter(x=>x.status!=='passed')},currentSourceFiles:files,boundaries:{paidProviderCalls:0,participantTests:'NOT_RUN',learningImprovement:'NOT_RUN',childLiveActivation:'NOT_RUN',finalArtPerformance:'NOT_QUALIFIED',publication:'NOT_RUN'}};
await writeFile('evidence/er13/checkpoint-evidence.json',JSON.stringify(data,null,2)+'\n');
console.log(JSON.stringify(data.latestSummary));
