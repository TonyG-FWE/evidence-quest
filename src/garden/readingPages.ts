export function readingPages(text:string){
 const pages:{text:string;start:number;end:number}[]=[],tokens=text.match(/\S+\s*|\s+/g)??[];let start=0,cursor=0,words=0,seen=0;
 const budget=()=>Math.max(1,Math.ceil((tokens.length-seen+words)/Math.max(1,Math.ceil((tokens.length-seen+words)/110),Math.ceil((text.length-start)/1800))));
 let target=budget();
 for(const token of tokens){
  if(cursor>start&&(words>=target||cursor+token.length-start>1800)){
   const part=text.slice(start,cursor),paragraphs=[...part.matchAll(/\n\s*\n/g)],sentences=[...part.matchAll(/[.!?]["”’']?\s+/g)];
   const boundary=paragraphs.filter(m=>m.index+m[0].length>=part.length/2).at(-1)??sentences.filter(m=>m.index+m[0].length>=part.length/2).at(-1);
   const end=boundary?start+boundary.index+boundary[0].length:cursor;
   pages.push({text:text.slice(start,end),start,end});start=end;words=(text.slice(start,cursor).match(/\S+\s*|\s+/g)??[]).length;target=budget();
  }
  cursor+=token.length;words++;seen++;
  while(cursor-start>1800){let end=start+1800;if(/[\uD800-\uDBFF]/.test(text[end-1]!))end--;pages.push({text:text.slice(start,end),start,end});start=end;words=(text.slice(start,cursor).match(/\S+\s*|\s+/g)??[]).length;target=budget();}
 }
 if(cursor>start)pages.push({text:text.slice(start,cursor),start,end:cursor});
 return pages.length?pages:[{text,start:0,end:text.length}];
}
/** Local reading-place key only, never source identity or learning evidence. */
export function readingPlace(id:string,text:string){let hash=2166136261;for(let i=0;i<text.length;i++)hash=Math.imul(hash^text.charCodeAt(i),16777619);return 'oral:'+id+':'+text.length+':'+(hash>>>0).toString(16);}
