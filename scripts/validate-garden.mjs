import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import ts from 'typescript';
await mkdir('.cache/garden-content',{recursive:true});
await writeFile('.cache/garden-content/package.json','{"type":"module"}');
for(const file of ['content','chapterContent','chapterGlossary']){
 const code=await readFile('src/garden/'+file+'.ts','utf8');
 await writeFile('.cache/garden-content/'+file+'.js',ts.transpileModule(code,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText);
}
const {sources,words,meaning,context,intro,sourcePrefix}=await import('../.cache/garden-content/content.js');
const sha=value=>createHash('sha256').update(value).digest('hex');
const normalize=text=>text.replaceAll('’',"'").replace(/[“”]/g,'"').replace(/^[> ]+/gm,'').replace(/\*\*/g,'').replace(/\s+/g,' ').trim();
export async function validateGarden(){
 const files=await readdir('docs/game-review'),components=[],occurrences=[];
 for(const source of Object.values(sources)){
  const names=files.filter(name=>source.authority.some(id=>/^D\d+$/.test(id)&&name.startsWith(id+'-')||name===id+'.md'));
  const authorities=await Promise.all(names.map(async name=>({path:'docs/game-review/'+name,bytes:await readFile('docs/game-review/'+name)})));
  const authority=normalize(authorities.map(a=>a.bytes.toString()).join('\n'));
  source.paragraphs.forEach((paragraph,index)=>{
   const id=sourcePrefix(source.id)+(index+1);
   assert.ok(authority.includes(normalize(paragraph)),`Reviewed exact paragraph missing: ${id}`);
   components.push({id,title:source.title,author:source.author,text:paragraph,sha256:sha(paragraph),authority:authorities.map(a=>({path:a.path,sha256:sha(a.bytes)}))});
   words(paragraph).forEach((word,n)=>{const definition=meaning(word,paragraph);assert.ok(definition,`Missing word meaning: ${id}:${word}`);occurrences.push({id:id+'.W'+(n+1),word,definition,context:context(word,paragraph)});});
  });
 }
 assert.equal(new Set(components.map(c=>c.id)).size,components.length);
 assert.equal(new Set(occurrences.map(c=>c.id)).size,occurrences.length);
 const d022=normalize(await readFile('docs/game-review/'+files.find(f=>f.startsWith('D022-')),'utf8'));assert.ok(d022.includes(normalize(intro)));
 await mkdir('evidence/group-8-integration-20260915',{recursive:true});
 const manifest={checkedAt:new Date().toISOString(),contentVersion:'garden-chapter-3',route:'/garden',sources:components,words:occurrences,limits:'Authored source/meaning coverage; not a learning assessment or proof that any player read every component.'};
 await writeFile('evidence/group-7-finale-20260915/content-manifest.json',JSON.stringify(manifest,null,2)+'\n');
 return {gardenSources:Object.keys(sources).length,gardenComponents:components.length,gardenWordOccurrences:occurrences.length};
}
if(process.argv[1]?.endsWith('validate-garden.mjs'))console.log(await validateGarden());
