import type {Chapter} from './model.js';
import {sources} from './content.js';
import {performedEnding} from './lanterns.js';
import type {DisplayOrigin} from './readingReference.js';

export type CompleteStoryId='story'|'sol'|'empty'|'picnic'|'duet'|'pip';
export type StoryReadingVersion='available'|'performed'|'current-turn';
export type CompleteStory={id:CompleteStoryId;title:string;text:string;origin:DisplayOrigin;note:string};
/** Reading material only. Never records a telling, an exposure or a learning result. */
export function completeStory(c:Chapter,id:CompleteStoryId,version:StoryReadingVersion='available'):CompleteStory|null{
 if(id==='pip')return c.story.ending?{id,title:'Pip’s adventure',text:c.story.ending.paragraphs.join('\n\n'),origin:'authored-display',note:'All four parts of the ending you played.'}:null;
 const source=sources[id];
 if(id!=='sol')return {id,title:source.title,text:source.paragraphs.join('\n\n'),origin:'authored-display',note:'The complete story, from beginning to end.'};
 const turn=c.gathering.turn;
 const current=version==='current-turn'&&turn&&(turn.kind==='sol'||turn.kind==='add-ending'),performed=version==='performed'||!current&&!!c.story.records.sol;
 const ending=current?turn.contribution:performed?performedEnding(c):c.story.solChoice==='prepared'?c.story.solEnding:null;
 return {id,title:source.title,text:[...source.paragraphs,...(ending?[ending.text]:[])].join('\n\n'),origin:ending?.origin==='child'?'mixed-display':'authored-display',note:ending?(current?'The manuscript and ending for this telling. This version is recorded after Sol finishes sharing.':performed?'The original manuscript and the exact ending Sol shared.':'The original manuscript and the ending chosen for Sol to share.')+(ending.origin==='child'?' The ending is your suggested wording.':''):'The whole draft as Sol wrote it. Its ending is still open.'};
}
