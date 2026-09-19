/** Focused CPU placement inspection, without rebuilding the shared candidate. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import ts from 'typescript';
process.env.EQ_ASSET_PROFILE='review';process.env.EQ_PERSONAL_GRASS='1';
const base=path.dirname(path.dirname(fileURLToPath(import.meta.url))),cache=new Map();
async function moduleUrl(file){
 const absolute=path.resolve(base,file);if(cache.has(absolute))return cache.get(absolute);
 const relative=path.relative(base,absolute);if(relative.startsWith('..')||path.isAbsolute(relative))throw Error('Source inspection left the workspace.');
 const targetFile=path.join(base,'tmp/screenshot-landscape-inspection',relative+'.mjs'),uri=pathToFileURL(targetFile).href;cache.set(absolute,uri);
 let code;
 if(absolute.endsWith('.json'))code='export default '+await fs.readFile(absolute,'utf8')+';';
 else code=ts.transpileModule(await fs.readFile(absolute,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 const matches=[...code.matchAll(/^(\s*(?:import|export)\b[^\n]*?\bfrom\s*)(['"])([^'"]+)\2/gm)];
 for(const match of matches){
  let target=match[3],uri;
  if(target.startsWith('.')){
   target=path.resolve(path.dirname(absolute),target);
   if(target.endsWith('.js')){try{await fs.access(target);}catch{target=target.slice(0,-3)+'.ts';}}
   uri=await moduleUrl(target);
  }else uri=import.meta.resolve(target);
  code=code.replace(match[0],match[1]+JSON.stringify(uri));
 }
 await fs.mkdir(path.dirname(targetFile),{recursive:true});await fs.writeFile(targetFile,code);return uri;
}
const world=await import(await moduleUrl('src/garden/worldLayout.ts'));
const landscape=await import(await moduleUrl('src/garden/assets/reviewLandscape.ts'));
const planting=await import(await moduleUrl('src/garden/assets/pathPlantingLayout.ts'));
const scenery=await import(await moduleUrl('src/garden/sceneryLayout.ts'));
const paths=await import(await moduleUrl('src/garden/assets/personalPathLayout.ts'));
const context=landscape.landscapeContext(),assembly=landscape.attachReviewLandscape({scatter(){}},{});
const lanterns=planting.GARDEN_DECORATIVE_LANTERNS.map(p=>({...p,clear:planting.gardenDressingClear(p.point,.44*p.scale,context),pathClearance:scenery.pathDistance(p.point,context.paths),pathEdge:paths.personalPathLayout.routeDistance(p.point),bankEdge:Math.min(...context.banks.filter(b=>scenery.insideRing(p.point,b)).map(b=>scenery.ringDistance(p.point,b))),obstacleEdge:Math.min(...context.obstacles.map(b=>scenery.insideRing(p.point,b)?0:scenery.ringDistance(p.point,b))),nearestActivity:Math.min(...context.clearings.map(q=>Math.hypot(q.x-p.point.x,q.z-p.point.z))),rootClearance:Math.min(...world.WORLD.trees.map(t=>Math.hypot(t.x-p.point.x,t.z-p.point.z)-t.radius))}));
const output={at:new Date().toISOString(),scope:'Source-based placement only. Not native visual, interaction or performance acceptance.',trees:world.WORLD.trees.map(t=>({...t,ground:world.terrainHeight(t)})),models:assembly.models,pathBorder:assembly.pathBorder,lanterns,gardenDecorations:assembly.gardenDecorations,checks:{largeGardenTreeMoved:world.WORLD.trees.some(t=>t.x===12.3&&t.z===10),smallGardenTreeAdded:world.WORLD.trees.some(t=>t.x===5.6&&t.z===14.8),tenDecorativeLanterns:lanterns.length===10,lanternClearances:lanterns.every(p=>p.clear),grassRemoved:assembly.personalGrass.count===0}};
await fs.mkdir(path.join(base,'evidence/screenshot-repairs-20260918'),{recursive:true});await fs.writeFile(path.join(base,'evidence/screenshot-repairs-20260918/landscape-inspection.json'),JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({checks:output.checks,models:output.models,pathBorder:output.pathBorder,trees:output.trees.map(t=>({x:t.x,z:t.z,height:t.height})),lanterns},null,2));
if(Object.values(output.checks).some(pass=>!pass))process.exitCode=1;
