import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {corrected} from './er13-copy.mjs';
export const design='docs/design/evidence-quest-design-v3/';
export const json=async path=>JSON.parse(await readFile(path,'utf8'));
export const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
export function rows(text) { return text.split(/\r?\n/).flatMap((line,index)=>line.startsWith('|')?[{line:index+1,cells:line.split('|').slice(1,-1).map(x=>x.trim())}]:[]); }
export function unquote(text) {
  const quoted=text.match(/^(?:(?:Jo|Remy|Ari|[A-Z_]+):\s*)?“([\s\S]*)”$/);
  return (quoted?quoted[1]:text).replaceAll('<br>','\n');
}
export async function readCanonical() {
  const source=await readFile(design+'07-COMPLETE-CHILD-FACING-CONTENT-AND-REFERENCES.md','utf8');
  const registry=await json(design+'09-technical-contracts/REFERENCE-REGISTRY.json');
  const technical=await json(design+'09-technical-contracts/technical-copy.json');
  const found=new Map();
  for(const row of rows(source)) {
    const id=row.cells[0]?.match(/^`(CT\.[A-Z0-9_.]+)`$/)?.[1];
    if(!id) continue;
    let origin,text,condition;
    if(/^[FCN]$/.test(row.cells[1])) {origin=row.cells[1];text=row.cells[2];condition=row.cells.slice(3).join(' | ');}
    else if(id.startsWith('CT.SRC.')) {origin='F';text=row.cells[2];condition=row.cells[3];}
    else if(row.cells[1]?.includes(': “')) {origin='F';text=row.cells[1];condition=row.cells.slice(2).join(' | ');}
    else throw new Error(`Unmapped canonical row ${row.line}: ${id}`);
    if(found.has(id)) throw new Error(`Duplicate canonical entry ${id}`);
    found.set(id,{id,origin,text:unquote(text),condition,sourceLine:row.line});
  }
  for(const entry of technical.entries) found.set(entry.id,{...entry,origin:'N',sourceLine:null});
  const expected=[...registry.contentIds,...registry.technicalContentIds];
  const missing=expected.filter(id=>!found.has(id));
  const extra=[...found.keys()].filter(id=>!expected.includes(id));
  if(missing.length||extra.length) throw new Error(`Canonical catalog mismatch ${JSON.stringify({missing,extra})}`);
  return {entries:corrected([...found.values()]),registry,source};
}
