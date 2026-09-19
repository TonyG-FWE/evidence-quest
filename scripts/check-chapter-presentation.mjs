import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {build} from 'vite';
await build({configFile:false,publicDir:false,logLevel:'warn',build:{outDir:'.cache/chapter-presentation',emptyOutDir:false,lib:{entry:'scripts/chapter-presentation-runtime.ts',formats:['es'],fileName:()=> 'index.js'},rollupOptions:{external:id=>id==='three'||id.startsWith('three/addons/')}}});
const {PaperArt,doughIntervals,makeDoughPortions}=await import('../.cache/chapter-presentation/index.js');
const art=new PaperArt(),dough=makeDoughPortions(art),results=[];
const check=(name,run)=>{run();results.push({name,status:'PASS'});};
check('Committed cut locations preserve every interval of the original lump',()=>assert.deepEqual(doughIntervals([.12,-.12]),[[-.36,-.12],[-.12,.12],[.12,.36]]));
function volume(geometry){const p=geometry.getAttribute('position');let total=0;for(let i=0;i<p.count;i+=3){const a=[p.getX(i),p.getY(i),p.getZ(i)],b=[p.getX(i+1),p.getY(i+1),p.getZ(i+1)],c=[p.getX(i+2),p.getY(i+2),p.getZ(i+2)];total+=(a[0]*(b[1]*c[2]-b[2]*c[1])+a[1]*(b[2]*c[0]-b[0]*c[2])+a[2]*(b[0]*c[1]-b[1]*c[0]))/6;}return Math.abs(total);}
dough.sync([]);const whole=volume(dough.root.children[0].geometry);
check('One and two cuts create independent, closed pieces without replacing the whole lump volume',()=>{for(const cuts of [[0],[-.12,.12],[-.24,-.05]]){dough.sync(cuts);assert.equal(dough.root.children.length,cuts.length+1);const sum=dough.root.children.reduce((v,mesh)=>v+volume(mesh.geometry),0);assert.ok(Math.abs(sum-whole)/whole<.06,{sum,whole});for(const mesh of dough.root.children){assert.ok([...mesh.geometry.getAttribute('position').array].every(Number.isFinite));assert.ok([...mesh.geometry.getAttribute('normal').array].every(Number.isFinite));}}});
check('Adjusting a cut releases obsolete geometry and retains only the current resources',()=>{const old=dough.root.children.map(mesh=>mesh.geometry);let disposed=0;old.forEach(geometry=>geometry.addEventListener('dispose',()=>disposed++));dough.sync([-.1,.1]);assert.equal(disposed,old.length);assert.ok(old.every(geometry=>!art.resources.has(geometry)));});
check('Repeated unchanged rendering reuses the same geometry buffers',()=>{const old=dough.root.children.map(mesh=>mesh.geometry);dough.sync([-.1,.1],2);assert.deepEqual(dough.root.children.map(mesh=>mesh.geometry),old);});
art.dispose();
await fs.mkdir('evidence/staged-bridge-20260916/chapter-review',{recursive:true});await fs.writeFile('evidence/staged-bridge-20260916/chapter-review/presentation-checks.json',JSON.stringify({at:new Date().toISOString(),scope:'Local functional dough geometry and resource checks; not game or Form qualification.',results},null,2)+'\n');console.log(JSON.stringify(results));
