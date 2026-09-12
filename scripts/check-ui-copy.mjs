import {readFile,readdir} from 'node:fs/promises';
import ts from 'typescript';
const content=JSON.parse(await readFile('content/authored.json','utf8')),ids=new Set(content.texts.map(t=>t.id));
async function files(dir){return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(e=>e.isDirectory()?files(dir+'/'+e.name):[dir+'/'+e.name]))).flat();}
const unknown=[];
for(const file of await files('src'))if(/\.(ts|tsx)$/.test(file)){
 const source=await readFile(file,'utf8');
 for(const match of source.matchAll(/['"](CT\.[A-Z0-9_.]+)['"]/g))if(!ids.has(match[1])&&!/[._]$/.test(match[1]))unknown.push({file,id:match[1]});
 const ast=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,file.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 function verify(id,slots,node){const entry=content.texts.find(t=>t.id===id);if(!entry)return;
  const required=[...entry.text.matchAll(/\{(\w+)\}/g)].map(m=>m[1]);
  if(required.length&&(!slots||ts.isObjectLiteralExpression(slots))){const supplied=slots?.properties.map(p=>p.name?.getText(ast).replace(/['"]/g,''))??[];for(const name of required)if(!supplied.includes(name))unknown.push({file,id,missingSlot:name,line:ast.getLineAndCharacterOfPosition(node.getStart(ast)).line+1});}
 }
 function visit(node){
  if(ts.isCallExpression(node)&&node.expression.getText(ast)==='copy'&&node.arguments[0]&&ts.isStringLiteral(node.arguments[0]))verify(node.arguments[0].text,node.arguments[1],node);
  if(ts.isJsxSelfClosingElement(node)||ts.isJsxOpeningElement(node)){
   const attrs=node.attributes.properties,ct=attrs.find(a=>a.name?.getText(ast)==='ct'),slot=attrs.find(a=>a.name?.getText(ast)==='slots');
   if(ct?.initializer&&ts.isStringLiteral(ct.initializer))verify(ct.initializer.text,slot?.initializer&&ts.isJsxExpression(slot.initializer)?slot.initializer.expression:null,node);
  }
  ts.forEachChild(node,visit);
 }
 visit(ast);
}
if(unknown.length)throw new Error(JSON.stringify(unknown));
console.log('All static client CT references and literal template parameters resolve.');
