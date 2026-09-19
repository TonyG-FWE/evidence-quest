import type {Chapter} from './model.js';
import {sourcesFor} from './content.js';
import {performedEnding} from './lanterns.js';
import type {DisplayOrigin} from './readingReference.js';
import type {SpeechRequest} from './voiceTypes.js';
import {speechDocument} from './readingSpeech.js';
import {editionOf,maintenanceOf} from './narrativeEdition.js';
import type {Contribution} from './chapter.js';

/** A chosen or performed ending keeps its own revision even after the working draft changes. */
export function solContributionSpeech(c:Chapter,contribution:Contribution):SpeechRequest{
 return {text:contribution.text,origin:contribution.origin==='child'?'child-draft':'authored-display',speaker:'sol',revision:contribution.revision,owner:c.runId+':sol-ending:'+contribution.revision};
}

export type CompleteStoryId='story'|'sol'|'empty'|'picnic'|'duet'|'pip';
export type StoryReadingVersion='available'|'performed'|'current-turn';
export type CompleteStory={id:CompleteStoryId;title:string;text:string;origin:DisplayOrigin;note:string;speech?:SpeechRequest};
/** Reading material only. Never records a telling, an exposure or a learning result. */
export function completeStory(c:Chapter,id:CompleteStoryId,version:StoryReadingVersion='available'):CompleteStory|null{
 if(id==='pip')return c.story.ending?{id,title:'Pip’s adventure',text:c.story.ending.paragraphs.join('\n\n'),origin:'authored-display',speech:speechDocument(c.story.ending.paragraphs.map(text=>({text,speaker:'pip',origin:'authored-display'}))),note:'All four parts of the ending you played.'}:null;
 const source=sourcesFor(c)[id];
 const sourceSpeech=source.paragraphs.map((text,paragraph):SpeechRequest=>({text,origin:'authored-display',source:{id,paragraph,edition:editionOf(c),...(maintenanceOf(c)?{maintenanceEdition:maintenanceOf(c)!}:{}),start:0,end:text.length}}));
 if(id!=='sol')return {id,title:source.title,text:source.paragraphs.join('\n\n'),origin:'authored-display',speech:speechDocument(sourceSpeech),note:'The complete story, from beginning to end.'};
 const turn=c.gathering.turn;
 const current=version==='current-turn'&&turn&&(turn.kind==='sol'||turn.kind==='add-ending'),performed=version==='performed'||!current&&!!c.story.records.sol;
 const ending=current?turn.contribution:performed?performedEnding(c):c.story.solChoice==='prepared'?c.story.solEnding:null;
 const text=[...source.paragraphs,...(ending?[ending.text]:[])].join('\n\n');
 return {id,title:source.title,text,origin:ending?.origin==='child'?'mixed-display':'authored-display',speech:speechDocument([...sourceSpeech,...(ending?[solContributionSpeech(c,ending)]:[])]),note:ending?(current?'The manuscript and ending for this telling. This version is recorded after Sol finishes sharing.':performed?'The original manuscript and the exact ending Sol shared.':'The original manuscript and the ending chosen for Sol to share.')+(ending.origin==='child'?' The ending is your suggested wording.':''):'The whole draft as Sol wrote it. Its ending is still open.'};
}
