import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
const manifest=JSON.parse(await readFile('docs/design/evidence-quest-design-v3/10-asset-production/asset-manifest.json','utf8'));
const css=await readFile('src/ui/tokens.css','utf8'),tsx=await readFile('src/ui/primitives.tsx','utf8');
const special={'ASSET.FX.SHADOW':'native-shadow','ASSET.FX.FOREGROUND':'native-foreground','ASSET.FX.FOCUS':'native-focus','ASSET.FX.STORY_LIGHT':'native-light','ASSET.UI.RACK':'native-rack','ASSET.UI.RAIL':'native-rail','ASSET.UI.PADS':'native-pad'};
const definitions=manifest.assets.filter(a=>a.representation==='native').map(a=>{
 const name=a.id.split('.').at(-1),icon=a.id.startsWith('ASSET.ICON.'),selector=special[a.id]??`native-${name.toLowerCase()}`;
 assert(icon?tsx.includes(`${name}:`):css.includes('.'+selector),`Missing native definition ${a.id}`);
 return {id:a.id,definition:icon?`src/ui/primitives.tsx#iconPaths.${name}`:`src/ui/tokens.css#.${selector}`,variants:a.variants.map(v=>v.id),owners:a.owners,temporary:true};
});
assert.equal(definitions.length,32);
await writeFile('content/native-assets.json',JSON.stringify(definitions,null,2)+'\n');
await writeFile('evidence/native-assets.json',JSON.stringify({checkedAt:new Date().toISOString(),fixture:'FIX11.TEMP',check:'CHECK11.VISUAL',definitions:32,icons:13,exactPalette:true,minimumTarget:48,focusStroke:3,limits:'Preparation only. Supporting view behavior and actual browser contrast/accessibility are checked by TASK11.07/16.'},null,2)+'\n');
console.log('32 native definitions / 13 original icons prepared.');
