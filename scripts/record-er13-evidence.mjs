import{readFile,writeFile}from'node:fs/promises';
import './record-production-qualification.mjs';
const p=JSON.parse(await readFile('evidence/er13/production-qualification.json','utf8'));
await writeFile('evidence/er13/checkpoint-evidence.json',JSON.stringify({recordedAt:p.recordedAt,phase:'ER13_FINAL_PRODUCTION_REVIEW',basis:p.basis,productionRecord:'evidence/er13/production-qualification.json',reports:p.reports,latestOutcomes:p.latestBehaviorOutcomes,latestSummary:p.latestSummary,currentSourceFiles:p.sourceFiles,boundaries:p.boundaries},null,2)+'\n');
