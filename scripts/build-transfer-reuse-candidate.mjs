import fs from 'node:fs/promises';
import {build} from 'vite';
import {spawnSync} from 'node:child_process';
const candidate='.cache/transfer-reuse-candidate';
const label=process.argv[2]??'final-candidate';if(!/^[a-z0-9-]+$/.test(label))throw Error('Invalid evidence label');
const probe=process.argv.includes('--probe');
for(const name of ['server','content','contracts','src'])await fs.cp('dist/'+name,candidate+'/dist/'+name,{recursive:true});
const configuration=(await import('../vite.config.ts')).default;
const frameProbe={name:'isolated-frame-use-probe',enforce:'pre',transform(source,id){if(!id.replaceAll('\\','/').endsWith('/src/world/assets.ts'))return null;let code=source.replace("image(id:string,variant='base',density=1,frame=0):ReadyImage|null {", "image(id:string,variant='base',density=1,frame=0):ReadyImage|null { if(id==='ASSET.ACT.PLAYER'){const rows=((globalThis as any).__eqFrameUse??=[]);rows.push({at:performance.now(),variant,density,frame});}");code=code.replace('private actorReady(id:string,item:ReadyImage){',"private actorReady(id:string,item:ReadyImage){if(id==='ASSET.ACT.PLAYER'){const row=(globalThis as any).__eqFrameUse?.at(-1);if(row)row.shown=item.entry.url;}");code=code.replace('this.used.add(previous.entry.url);return previous;',"this.used.add(previous.entry.url);if(id==='ASSET.ACT.PLAYER'){const row=(globalThis as any).__eqFrameUse?.at(-1);if(row){row.shown=previous.entry.url;row.waiting=true;}}return previous;");return code;}};
await build({...configuration,configFile:false,plugins:[...configuration.plugins,...(probe?[frameProbe]:[])],build:{...configuration.build,outDir:candidate+'/dist/client'}});
const prepared=spawnSync(process.execPath,['scripts/prepare-client.mjs',candidate+'/dist/client'],{stdio:'inherit'});if(prepared.status)process.exit(prepared.status);
// Execute the exact existing transfer test bodies and limits, with only their
// evidence destination and imports adapted for this isolated candidate.
let source=await fs.readFile('browser-tests/production.spec.ts','utf8');
source=source.replaceAll("'./helpers.js'","'../../browser-tests/helpers.js'").replaceAll("'../content/","'../../content/").replaceAll('evidence/er13/performance','evidence/staged-bridge-20260916/transfer-reuse/'+label+'/performance');
if(probe)source=source.replace('return page.evaluate(()=>({resources:', 'return page.evaluate(()=>({frameUse:(globalThis as any).__eqFrameUse??[],resources:').replace('all,errors},null,2)', 'all,visits,errors},null,2)');
await fs.mkdir(candidate+'/tests',{recursive:true});await fs.writeFile(candidate+'/tests/production.spec.ts',source.replaceAll("'../../browser-tests/helpers.js'","'../../../browser-tests/helpers.js'").replaceAll("'../../content/","'../../../content/"));
