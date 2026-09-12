import {readFile,writeFile} from 'node:fs/promises';
const root='docs/design/evidence-quest-design-v3/';
const path=root+'09-technical-contracts/technical-copy.json';
const copy=JSON.parse(await readFile(path,'utf8'));
const registryPath=root+'09-technical-contracts/REFERENCE-REGISTRY.json';
const registry=JSON.parse(await readFile(registryPath,'utf8'));
for(const [tile,text]of Object.entries({FERRY:'One Boat',BRIDGE:'Joined Boats',PLANT:'Hill',BLOOM:'Flower'})){
  const id=`CT.TILE.LABEL.${tile}`;
  if(!copy.entries.some(e=>e.id===id))copy.entries.push({id,text,condition:'TASK11.02 binding repair: exact existing Item 07 section 6.1 tile face/name; introduces no description or outcome.'});
  if(!registry.technicalContentIds.includes(id))registry.technicalContentIds.push(id);
}
await writeFile(path,JSON.stringify(copy,null,2)+'\n');
await writeFile(registryPath,JSON.stringify(registry,null,2)+'\n');
