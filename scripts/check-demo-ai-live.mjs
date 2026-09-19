/** Explicit adult recording-session check. Uses the same durable runtime cap. */
import fs from 'node:fs/promises';
import {randomUUID,createHash} from 'node:crypto';
import {gardenRecordingDemo} from '../dist/server/gardenRecordingDemo.js';
import {GardenFeedbackService} from '../dist/server/garden.js';
import {sourceComponentsFor} from '../dist/src/garden/content.js';
if(!process.argv.includes('--authorized-live'))throw Error('Explicit authorized-live flag required');
if(!process.env.OPENAI_API_KEY)throw Error('Server key unavailable');
const directory='evidence/demo-ai-20260919';await fs.mkdir(directory,{recursive:true});
const previous=await fs.readFile('evidence/voice-ai-demo-20260918/openai-attempts.jsonl'),priorHash=createHash('sha256').update(previous).digest('hex');
const demo=await gardenRecordingDemo({enabled:true,key:process.env.OPENAI_API_KEY,root:process.cwd(),host:'127.0.0.1'}),service=new GardenFeedbackService(demo.provider);
const exposed=[...sourceComponentsFor({narrativeEdition:'literary-20260916'}).keys()].filter(k=>k.startsWith('GA.SRC.SOL.')||k.startsWith('GA.SRC.LATER.'));
const cases=[['bread','Sol fixed the broken tile, so the flour stayed dry. Rina could bake the bread she had promised.'],['unclear','After that, things were better.'],...(process.argv.includes('--all-scenes')?[['thanks','Later Rina visited Sol and brought him a loaf of bread to thank him for fixing the tile.'],['both','The repair kept the flour dry, so Rina baked the bread she had promised. Later she brought Sol a loaf to thank him.']]:[])];
const results=[];
for(const [label,text]of cases){
 const q={contract:1,requestId:randomUUID(),activity:'sol-ending',revision:1,draftRevision:1,text,narrativeEdition:'literary-20260916',exposed};
 const result=await service.handle(q);results.push({label,request:q,result});console.log(JSON.stringify({label,result}));
}
const priorUnchanged=createHash('sha256').update(await fs.readFile('evidence/voice-ai-demo-20260918/openai-attempts.jsonl')).digest('hex')===priorHash;
const run=process.argv.find(x=>x.startsWith('--run='))?.slice(6)??'first';if(!/^[a-z0-9-]+$/.test(run))throw Error('Invalid run');
await fs.writeFile(directory+'/live-check-'+run+'.json',JSON.stringify({at:new Date().toISOString(),scope:'Two explicit adult demo requests using fixed authored example answers; not child or pronunciation qualification',priorUnchanged,budget:await demo.snapshot(),results},null,2)+'\n');
if(!priorUnchanged||results.some(row=>row.label==='unclear'?!['clarify','uncertain'].includes(row.result?.status)||row.result?.scene!==null:row.result?.status!=='supported'||row.result?.scene!==row.label))process.exitCode=1;
