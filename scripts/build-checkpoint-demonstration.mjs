import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';

const root='evidence/hands-on-20260916/pilot/checkpoint-review',out=root+'/demonstration';
await fs.mkdir(out,{recursive:true});
const args=process.argv.slice(2),search=args.filter(arg=>!arg.startsWith('--'));
if(!search.length)search.push('output/playwright/integrated-checkpoint/final-functional');
const reportPath=args.find(arg=>arg.startsWith('--report='))?.slice(9);
async function find(directory,name){
 for(const entry of await fs.readdir(directory,{withFileTypes:true})){const file=directory+'/'+entry.name;if(entry.isFile()&&entry.name===name)return file;if(entry.isDirectory()){const child=await find(file,name);if(child)return child;}}
 return null;
}
const requested=[
 ['before','Earlier platform','evidence/hands-on-20260916/demonstration/before.png','Retained 15 September capture; unchanged historical evidence.'],
 ['movement','Walking and carrying','approved-pip-in-village.png','Approved Pip follows the terrain with the seed at his authored hand socket.'],
 ['bridge','Build the crossing','bridge-direct.png','Drag sections into place, turn them, and draw ropes to the posts. Walk across to test the result.'],
 ['planting','Keep the planting promise','planting-direct.png','Prepare the existing bed, place the actual seed, and cover it. The carry-across route is equally successful.'],
 ['boat','Steer and deliver','seed-collected-pip-free.png','Continuous steering reaches Grandma’s landing. Grandma collects the seed and walks home while Pip can move.'],
 ['roof','Repair the actual roof','roof-direct.png','The carried tile goes to Sol and is positioned over the opening. A misplaced tile can be moved again.'],
 ['dough','Prepare and divide','bread-portions.png','Work the dough and make two cuts into similar portions. The unshaped batch remains recoverable.'],
];
const records=[];
for(const [id,title,requestedFile,caption]of requested){
 let source=requestedFile.includes('/')?requestedFile:null;for(const directory of search){if(source)break;source=await find(directory,requestedFile);}if(!source)throw Error('Missing actual-game demonstration: '+requestedFile);
 const bytes=await fs.readFile(source),file=id+path.extname(source);await fs.writeFile(out+'/'+file,bytes);records.push({id,title,source,file,caption,sha256:createHash('sha256').update(bytes).digest('hex')});
}
let movie='';
if(reportPath){
 const report=JSON.parse(await fs.readFile(reportPath,'utf8'));
 function passedBoat(suites){for(const suite of suites){for(const spec of suite.specs??[]){if(!spec.title.startsWith('direct seed loading'))continue;for(const test of spec.tests??[]){if(test.status!=='expected')continue;const attachment=test.results?.at(-1)?.attachments?.find(a=>a.name==='video');if(attachment?.path)return {source:attachment.path,project:test.projectName};}}const found=passedBoat(suite.suites??[]);if(found)return found;}return null;}
 const passed=passedBoat(report.suites);if(!passed)throw Error('No passing direct-boat video in '+reportPath);
 const bytes=await fs.readFile(passed.source),file='continuous-boat.webm';await fs.writeFile(out+'/'+file,bytes);
 records.push({id:'continuous-boat',title:'The complete pointer-controlled delivery',...passed,file,report:reportPath,caption:'Uncut actual-game recording. Drag the seed aboard, recover from the rock, steer through the bend, and keep moving while Grandma brings the seed home.',sha256:createHash('sha256').update(bytes).digest('hex')});
 movie=`<figure><h2>Continuous steering and delivery</h2><video controls preload="metadata" poster="demonstration/boat.png" src="demonstration/${file}"></video><figcaption>Uncut actual-game recording: drag the seed aboard, recover from a rock, steer through the bend, and move Pip while Grandma returns. No sidebar confirmation is used for these physical steps.</figcaption></figure>`;
}
await fs.writeFile(out+'/sources.json',JSON.stringify({recordedAt:new Date().toISOString(),scope:'Actual browser captures; historical before is explicitly dated. New prop/gait/kit review remains separate from this playable checkpoint.',records},null,2)+'\n');
await fs.writeFile(root+'/checkpoint.html',`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Evidence Quest · playable checkpoint</title><style>body{margin:0;background:#f7f1e3;color:#294c40;font:17px/1.6 system-ui}main{max-width:1150px;padding:28px;margin:auto}h1,h2{font-family:Georgia}a{color:#215e71}nav{display:flex;gap:24px;flex-wrap:wrap}img,video{width:100%;border-radius:12px}figure{margin:32px 0}figcaption{padding:12px 0}.note{padding:16px;background:#e7ead9;border-radius:10px}</style></head><body><main><p>Evidence Quest / 16 September 2026</p><h1>A village to explore and help</h1><p>Approved Pip and Grandma now appear in the playable adventure. Explore the banks, handle materials, deliver the seed, plant with Grandma and help Rina and Sol at the bakery.</p><nav><a href="http://127.0.0.1:4323/garden">Play this checkpoint</a><a href="review.html">Review the remaining artwork</a></nav><p class="note">The new seed boat, rooted flower, jog and painted scenery are together in the artwork review. The game retains its development props and scenery until their Form approval. Your play review determines whether the experience is ready to extend.</p>${movie}${records.filter(r=>r.id!=='continuous-boat').map(r=>`<figure><h2>${r.title}</h2><img loading="lazy" src="demonstration/${r.file}" alt="${r.title}"><figcaption>${r.caption}</figcaption></figure>`).join('')}<p>Reading, word help, writing, optional oral practice and native alternatives remain available. These captures demonstrate visible behavior; they do not establish enjoyment or learning gains.</p></main></body></html>`);
console.log('Before/after demonstration: http://127.0.0.1:4318/pilot/checkpoint-review/checkpoint.html');
