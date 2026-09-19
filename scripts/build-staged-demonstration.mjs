import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';

// Copies actual captures only. Missing proof is an error, never a substituted
// illustration or generated screenshot. Prior checkpoint pages are preserved.
const evidence='evidence/staged-bridge-20260916';
const directory='evidence/hands-on-20260916/pilot/chapter-review';
const input=JSON.parse(await fs.readFile(evidence+'/demonstration-input.json','utf8'));
const target=directory+'/demonstration';await fs.mkdir(target,{recursive:true});
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const escape=text=>String(text).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const records=[];
for(const item of input.captures){
 const bytes=await fs.readFile(item.source),file=item.id+path.extname(item.source);
 await fs.writeFile(target+'/'+file,bytes);records.push({...item,file,sha256:hash(bytes)});
}
const movie=await fs.readFile(evidence+'/bridge-demo-final.webm');
await fs.writeFile(target+'/staged-bridge.webm',movie);
const cues=JSON.parse(await fs.readFile(evidence+'/bridge-demo-cues.json','utf8')).cues;
if(!cues.length||cues.some(c=>typeof c.event!=='string'||!Number.isFinite(c.milliseconds)||c.milliseconds<0))throw Error('Bridge cues require event and milliseconds from the recorded ordinary-input demo');
const receipt={at:new Date().toISOString(),scope:'Actual browser captures. Historical before images retain their dates. This page does not approve review artwork or certify enjoyment.',records,movie:{source:evidence+'/bridge-demo-final.webm',sha256:hash(movie),report:evidence+'/bridge-demo-final.json',cues}};
await fs.writeFile(evidence+'/demonstration.json',JSON.stringify(receipt,null,2)+'\n');
await fs.writeFile(directory+'/checkpoint.html',`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Evidence Quest · staged bridge playtest</title><style>
*{box-sizing:border-box}body{margin:0;background:#f6f0e3;color:#29483e;font:17px/1.6 system-ui}main{max-width:1120px;margin:auto;padding:28px}h1,h2{font-family:Georgia,serif;line-height:1.2}h1{font-size:clamp(30px,5vw,50px)}a{color:#1e6070}nav{display:flex;gap:22px;flex-wrap:wrap}.note{border-left:4px solid #9e784b;background:#eae6d7;padding:14px 20px;margin:24px 0}figure{margin:28px 0}img,video{display:block;width:100%;border-radius:10px;background:#dce1d2}figcaption{padding:12px 0}small{display:block;color:#52675a}.cues{display:flex;gap:8px;flex-wrap:wrap}button{font:inherit;padding:9px 13px;border:1px solid #708a76;border-radius:6px;background:#f9f7ee;color:inherit;cursor:pointer}button:focus-visible,a:focus-visible{outline:3px solid #a76527;outline-offset:3px}.pair{display:grid;grid-template-columns:1fr 1fr;gap:20px}@media(max-width:740px){.pair{grid-template-columns:1fr}}
</style></head><body><main><p>Evidence Quest / current chapter playtest</p><h1>Build a crossing you can stand on</h1><p>Construction now ends when you release a material. Secure the first section, walk onto it, and extend the crossing. Fresh adventures use the richer story; existing saves keep their narrative edition.</p><nav><a href="${escape(input.playableUrl)}">Play the current build</a><a href="review.html">Review pending artwork</a><a href="references/review.html">Cast appearance references</a></nav><aside class="note">${escape(input.qualificationNote)} ${escape(input.reviewScopeNote??'New boat, flower, gait, environment and action artwork remains in the review until its matching Form approval. Existing approved character sources are unchanged.')}</aside>${input.captureScopeNote?`<p>${escape(input.captureScopeNote)}</p>`:''}
<section><h2>The bridge, through ordinary controls</h2><video id="bridge" controls preload="metadata" src="demonstration/staged-bridge.webm"></video><p>${escape(input.bridgeVideoNote??'This uncut browser recording uses pointer and native controls. Choose a moment below, or watch the complete sequence.')}</p><div class="cues">${cues.map(c=>`<button type="button" data-time="${c.milliseconds/1000}">${escape(c.event)}</button>`).join('')}</div></section>
<div class="pair">${records.filter(r=>r.group==='bridge').map(card).join('')}</div>
${records.filter(r=>r.group!=='bridge').map(card).join('')}
<aside class="note">Reading support, writing, optional oral practice, journal notes and accessible native alternatives remain available. Automated checks establish bounded functionality; Tony’s play review determines whether the experience meets the intended standard. No new Tripo credits were spent: 290 recorded.</aside></main><script>const video=document.getElementById('bridge');for(const button of document.querySelectorAll('[data-time]'))button.addEventListener('click',()=>{video.currentTime=Number(button.dataset.time);video.play().catch(()=>{});video.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});</script></body></html>`);
function card(r){const media=r.mediaType==='video'?`<video controls preload="metadata" aria-label="${escape(r.title)}" src="demonstration/${escape(r.file)}"></video>`:`<img loading="lazy" src="demonstration/${escape(r.file)}" alt="${escape(r.title)}">`;return `<figure><h2>${escape(r.title)}</h2>${media}<figcaption>${escape(r.caption)}<small>${escape(r.provenance)}</small></figcaption></figure>`;}
console.log('Current demonstration: http://127.0.0.1:4318/pilot/chapter-review/checkpoint.html');
