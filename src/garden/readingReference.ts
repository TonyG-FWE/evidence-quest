export type DisplayOrigin='authored-display'|'child-draft'|'mixed-display';
/** Binds an acoustic reference to the exact displayed UTF-8 text. This is not
 * source authentication or exposure evidence; neither target grants progress. */
export async function displayReadingTarget(text:string,origin:DisplayOrigin){
 const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text));
 return 'display-'+origin+':'+Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');
}
/** Bound a word request around the selected range, never the saved writing.
 * Use the complete selected sentence when it fits, otherwise a whole-word window. */
export function boundedWordTarget<T extends {source:string|null;draft:string|null;paragraph:number;start:number;end:number;word:string;sentence:string}>(target:T):T{
 if(target.source!==null||!target.draft||Array.from(target.draft).length<=4000)return target;
 const text=target.draft;let offset=0,start=0,end=text.length;
 for(const part of text.match(/[^.!?]+[.!?]?/g)??[text]){if(target.start<offset+part.length){start=offset;end=offset+part.length;break;}offset+=part.length;}
 if(Array.from(text.slice(start,end)).length>4000){start=Math.max(start,target.start-1500);end=Math.min(end,target.end+1500);while(start>0&&/[A-Za-z'’]/.test(text[start-1]??''))start--;while(end<text.length&&/[A-Za-z'’]/.test(text[end]??''))end++;}
 const draft=text.slice(start,end),wordStart=target.start-start;let sentenceEnd=0;
 const sentence=(draft.match(/[^.!?]+[.!?]?/g)??[draft]).find(part=>{sentenceEnd+=part.length;return wordStart<sentenceEnd;})?.trim()??draft;
 return {...target,draft,paragraph:0,start:wordStart,end:target.end-start,sentence};
}
