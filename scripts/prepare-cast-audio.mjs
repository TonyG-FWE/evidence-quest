/** Finite authored catalogue. This preparation makes no provider request. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import ts from 'typescript';
import {isSpokenText} from './cast-catalogue-text.mjs';
const hash=value=>createHash('sha256').update(value).digest('hex');
const cache='.cache/cast-catalogue';await fs.mkdir(cache,{recursive:true});await fs.writeFile(cache+'/package.json','{"type":"module"}');
for(const name of ['literaryContent','narrativeDialogue','voiceTypes','sourceVoiceRouting','readingPages','definitionCatalogue','content','chapterContent','chapterGlossary','literaryGlossary','narrativeEdition','bridgeReading']){
 const code=await fs.readFile('src/garden/'+name+'.ts','utf8');await fs.writeFile(cache+'/'+name+'.js',ts.transpileModule(code,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText);
}
const {selectedCast,normalizeSpeech}=await import('../'+cache+'/voiceTypes.js');
const {authoredVoiceSpans,routeAuthoredText}=await import('../'+cache+'/sourceVoiceRouting.js');
const {literaryParagraphs,literaryEndingLines}=await import('../'+cache+'/literaryContent.js');
const {narrativeDialogue}=await import('../'+cache+'/narrativeDialogue.js');
const {definitionCatalogue}=await import('../'+cache+'/definitionCatalogue.js');
const {readingPages}=await import('../'+cache+'/readingPages.js');
const {sourcesFor,wordHelp}=await import('../'+cache+'/content.js');
const root='public/audio/cast',evidence='evidence/cast-audio-20260919';await fs.mkdir(root,{recursive:true});await fs.mkdir(evidence,{recursive:true});
const model='s2.1-pro-free',speed=.94,entries=new Map(),sourceRecords=[];
for(const name of ['literaryContent','narrativeDialogue','sourceVoiceRouting','voiceTypes','content','chapterContent','chapterGlossary','literaryGlossary','bridgeReading','definitionCatalogue']){const file='src/garden/'+name+'.ts';sourceRecords.push({file,sha256:hash(await fs.readFile(file))});}
let prior;try{prior=JSON.parse(await fs.readFile(root+'/manifest.json','utf8'));}catch{}
const previous=new Map((prior?.entries??[]).map(entry=>[entry.id,entry]));
function add(text,speaker='narrator',source='authored display',sentences=true){
 text=normalizeSpeech(text);if(!text||!/[A-Za-z]/.test(text)||text.length>4000)return;
 const id=hash(JSON.stringify({text,voiceId:selectedCast[speaker],model,speed}));
 const old=previous.get(id),entry=entries.get(id)??{...(old??{}),id,text,speaker,voiceId:selectedCast[speaker],sources:[]};
 if(!entry.sources.includes(source))entry.sources.push(source);entries.set(id,entry);
 if(sentences){const parts=text.match(/[^.!?]+[.!?]+[”"’']?|[^.!?]+$/g)??[];if(parts.length>1)for(const part of parts)add(part,speaker,source,false);}
}
for(const span of authoredVoiceSpans)add(span.text,span.speaker,`literary-20260916:${span.source}:${span.paragraph}:${span.start}-${span.end}`);
for(const text of Object.values(literaryEndingLines))add(text,'pip','ending performance');
const sourceData=sourcesFor({narrativeEdition:'literary-20260916',maintenanceEdition:'staged-20260916'});
for(const [id,source]of Object.entries(sourceData)){
 add(source.title,'narrator','title:'+id);
 const teller=id==='story'?'mara':['sol','later','breadEnding','thanksEnding'].includes(id)?'sol':['empty','picnic','sections'].includes(id)?'grandma':id==='duet'?'mara':id==='notice'?'pip':'narrator';
 for(const [i,text]of source.paragraphs.entries()){
  for(const span of routeAuthoredText(text,{id,paragraph:i,edition:'literary-20260916',maintenanceEdition:'staged-20260916',start:0,end:text.length}))add(span.text,span.speaker,`source:literary-20260916:${id}:${i}`);
  for(const sentence of text.match(/[^.!?]+[.!?]?/g)??[text]){
   const value=sentence.trim(),start=text.indexOf(value);
   for(const span of routeAuthoredText(value,{id,paragraph:i,edition:'literary-20260916',maintenanceEdition:'staged-20260916',start,end:start+value.length}))add(span.text,span.speaker,`sentence:literary-20260916:${id}:${i}:${start}`);
   for(const word of value.match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g)??[]){const phrase=wordHelp(word,value,id==='duet').phrase;if(phrase){const offset=text.indexOf(phrase,start);if(offset>=0)for(const span of routeAuthoredText(phrase,{id,paragraph:i,edition:'literary-20260916',maintenanceEdition:'staged-20260916',start:offset,end:offset+phrase.length}))add(span.text,span.speaker,`phrase:literary-20260916:${id}:${i}:${offset}`,false);}}
  }
  add(text,teller,`performance:${id}:${i}`);if(id==='story')add(text,'pip',`performance:${id}:${i}`);
 }
 for(const page of readingPages(source.paragraphs.join('\n\n')))for(const span of routeAuthoredText(page.text))add(span.text,span.speaker,`page:${id}:${page.start}-${page.end}`);
}
for(const [id,text]of Object.entries(definitionCatalogue))add(text,'narrator','definition:'+id,false);
const friendly=isSpokenText;
// Cursor hints, target labels and rendering phases are interface instructions;
// BakeryConversation remains included in full as authored reading content.
const files=(await fs.readdir('src/garden')).filter(file=>/\.(tsx|ts)$/.test(file)&&!/(?:Glossary|Catalogue|^content\.|^chapterContent\.|narrativeDialogue|literaryContent|sourceVoiceRouting|voiceTypes|castSpeech|assets|^World\.|Scene|worldLayout|landscape|scenery|hands|locomotion|materialFade|^bakery(?:Interaction|Targets|Motion|Weather)\.)/i.test(file));
const authored=new Map();
function enclosingSpeaker(node){for(let p=node;p;p=p.parent){if(ts.isFunctionDeclaration(p)&&p.name?.text==='welcomeWords')return 'pip';if(ts.isJsxElement(p)){const tag=p.openingElement.tagName.getText();if(tag==='Choices'){const label=p.openingElement.attributes.properties.find(a=>ts.isJsxAttribute(a)&&a.name.text==='label');return /speaking as Mara/.test(label?.getText()??'')?'mara':'pip';}const who=p.openingElement.attributes.properties.find(a=>ts.isJsxAttribute(a)&&['who','speaker'].includes(a.name.text));if(who?.initializer&&ts.isStringLiteral(who.initializer)){const s=who.initializer.text.toLowerCase();if(selectedCast[s])return s;}}if(ts.isObjectLiteralExpression(p)){const who=p.properties.find(q=>ts.isPropertyAssignment(q)&&q.name.getText()==='who'),value=who&&ts.isAsExpression(who.initializer)?who.initializer.expression:who?.initializer;if(value&&ts.isStringLiteral(value)){const s=value.text.toLowerCase();if(selectedCast[s])return s;}}}return 'narrator';}
function visibleStrings(node){
 if(ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node))return [node.text];
 if(ts.isJsxText(node))return [node.text.replace(/\s+/g,' ')];
 if(ts.isJsxExpression(node))return node.expression?visibleStrings(node.expression):[''];
 if(ts.isConditionalExpression(node))return [...visibleStrings(node.whenTrue),...visibleStrings(node.whenFalse)];
 if(ts.isParenthesizedExpression(node))return visibleStrings(node.expression);
 if(ts.isJsxElement(node)||ts.isJsxFragment(node)){let values=[''];for(const child of node.children){const next=visibleStrings(child);if(!next.length)return [];values=values.flatMap(left=>next.map(right=>left+right)).slice(0,64);}return values;}
 return [];
}
for(const file of files){
 const name='src/garden/'+file,code=await fs.readFile(name,'utf8'),tree=ts.createSourceFile(file,code,ts.ScriptTarget.Latest,true,file.endsWith('x')?ts.ScriptKind.TSX:ts.ScriptKind.TS);sourceRecords.push({file:name,sha256:hash(code)});
 function visit(node){
  if(ts.isJsxElement(node)&&['svg','style'].includes(node.openingElement.tagName.getText()))return;
  if(ts.isJsxAttribute(node)&&['d','points','transform','style','className','viewBox','fill','stroke'].includes(node.name.getText()))return;
  // Listening/recording commands are controls, never story narration or word-help passages.
  if(ts.isJsxElement(node)&&node.openingElement.attributes.properties.some(attribute=>ts.isJsxAttribute(attribute)&&attribute.name.getText()==='data-reading-command'))return;
  if(ts.isJsxElement(node)&&['Reply','ReadingParagraph','ReadWords','button'].includes(node.openingElement.tagName.getText()))for(const raw of visibleStrings(node)){const text=normalizeSpeech(raw);if(friendly(text))add(narrativeDialogue[text]??text,enclosingSpeaker(node),name+':visible:'+tree.getLineAndCharacterOfPosition(node.pos).line);}
  if(ts.isJsxText(node)||ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node)){
   const text=normalizeSpeech(node.text),speaker=file==='FestivalWelcome.tsx'&&ts.isStringLiteral(node)&&node.parent&&ts.isArrayLiteralExpression(node.parent)?'jo':enclosingSpeaker(node);
   if(friendly(text)&&!ts.isImportDeclaration(node.parent)&&!ts.isExportDeclaration(node.parent)&&!((ts.isNewExpression(node.parent)||ts.isCallExpression(node.parent))&&node.parent.expression.getText()==='Error')&&!(ts.isJsxAttribute(node.parent)&&!['aria-label','title'].includes(node.parent.name.getText()))){
    add(narrativeDialogue[text]??text,speaker,name+':'+tree.getLineAndCharacterOfPosition(node.pos).line);authored.set(text,speaker);
   }
  }
  ts.forEachChild(node,visit);
 }
 visit(tree);
}
// Choice helpers dynamically create native buttons from fixed strings; read them as Pip.
for(const text of ['Would you tell everyone how the repair helped Rina bake the bread?','Would you tell everyone about Rina’s thank-you visit?'])add(text,'pip','gathering choice');
// Every authored lexical token can be heard separately in the chosen narrator voice.
const words=new Set([...entries.values()].flatMap(entry=>entry.text.match(/[A-Za-z]+(?:['’][A-Za-z]+)?|\d+/g)??[]));
for(const word of words)add(word,'narrator','authored word',false);
const manifest={schema:'eq.cast-audio.v1',model,speed,cast:selectedCast,scope:'Complete authored source and visible reading catalogue; dynamic child text excluded',sourceRecords,entries:[...entries.values()].sort((a,b)=>a.id.localeCompare(b.id))};
await fs.writeFile(root+'/manifest.json',JSON.stringify(manifest,null,2)+'\n');
await fs.writeFile(evidence+'/catalogue.json',JSON.stringify({at:new Date().toISOString(),entries:manifest.entries.length,textBytes:manifest.entries.reduce((n,e)=>n+Buffer.byteLength(e.text),0),model,speed,cast:selectedCast,sourceRecords,manifestSha256:hash(await fs.readFile(root+'/manifest.json')),providerRequests:0},null,2)+'\n');
console.log(JSON.stringify({entries:manifest.entries.length,existing:manifest.entries.filter(e=>e.uri).length,textBytes:manifest.entries.reduce((n,e)=>n+Buffer.byteLength(e.text),0),speakers:Object.fromEntries(Object.keys(selectedCast).map(s=>[s,manifest.entries.filter(e=>e.speaker===s).length]))}));
