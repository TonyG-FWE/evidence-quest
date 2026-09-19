import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root='evidence/hands-on-20260916',directory=root+'/demonstration';
await fs.mkdir(directory,{recursive:true});
async function capture(run,filename){
 for(const folder of await fs.readdir('output/playwright/'+run)){
  if(!folder.endsWith('chromium-dpr1'))continue;
  const source='output/playwright/'+run+'/'+folder+'/'+filename;
  try{await fs.access(source);return source;}catch{}
 }
 throw Error('Missing capture '+run+'/'+filename);
}
const items=[
 ['before.png','evidence/group-8-review-20260915/native-fresh-crossing.png','Earlier demo: retained 15 September capture.'],
 ['overview.png',await capture('landscape-final','village-overview.png'),'Current development layout: connected village and winding river.'],
 ['crossing.png',await capture('landscape-final','village-crossing.png'),'Following camera at the storm crossings.'],
 ['dock.png',await capture('landscape-final','passenger-dock.png'),'A separate passenger dock reached along the sloping path.'],
 ['workbench.png',await capture('hands-final','sol-workbench.png'),'Optional pictures handled directly on Sol’s workbench.'],
];
const images=[];
for(const [name,source,caption]of items){const bytes=await fs.readFile(source);await fs.writeFile(directory+'/'+name,bytes);images.push({file:'demonstration/'+name,source,sha256:createHash('sha256').update(bytes).digest('hex'),caption,edition:name==='before.png'?'retained dated capture; not recaptured in this run':'GardenApp-D8R8zdkH.js / GardenApp-Df2H8NdY.css'});}
await fs.writeFile(root+'/demonstration-sources.json',JSON.stringify({date:'2026-09-16',status:'DEVELOPMENT_GEOMETRY_NOT_FINISHED_ART',images},null,2)+'\n');
const figures=items=>items.map(i=>`<figure><img src="${i.file}" alt="${i.caption}"><figcaption>${i.caption}</figcaption></figure>`).join('');
await fs.writeFile(root+'/before-after.html',`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Evidence Quest — development before and after</title><style>body{margin:0;background:#f6f0e2;color:#294b3d;font:17px/1.6 system-ui}main{max-width:1250px;margin:auto;padding:30px}h1,h2{font-family:Georgia,serif}img{width:100%;border-radius:12px}figure{margin:20px 0 36px}figcaption{padding:10px 0}a{color:#24667b}.notice{padding:16px;background:#ead7a8;border-radius:12px}.pair{display:grid;grid-template-columns:1fr 1fr;gap:22px}@media(max-width:800px){.pair{grid-template-columns:1fr}}</style><main><p>Evidence Quest / 16 September 2026</p><h1>From a platform to places to explore</h1><p class="notice">Playable development checkpoint. The landscape and interactions have changed; final characters, painted production assets, performance qualification and owner acceptance are still pending. No Tripo jobs have been submitted and no credits charged.</p><p><a href="http://127.0.0.1:4316/garden">Play the development build</a> · <a href="/">Review the layout and four art references</a></p><div class="pair">${figures(images.slice(0,2))}</div><h2>Explore, handle, and make a telling</h2><p>Carry and position bridge sections, draw ropes to their posts, steer the seed boat, work the soil, align the torn wing and tape, place the roof tile, knead and portion dough, and arrange pictures of witnessed moments. Native alternatives and complete reading support remain available.</p>${figures(images.slice(2))}<p>Adjacent destinations are about 8–9 seconds apart along the authored routes at normal walking speed. All supported story choices remain. These captures do not establish enjoyment or learning gains.</p></main></html>`);
console.log(JSON.stringify({images:images.length,demonstration:root+'/before-after.html'}));
