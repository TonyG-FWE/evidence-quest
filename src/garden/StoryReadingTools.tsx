import {useContext} from 'react';
import {ReadingContext,ReadingParagraph} from './Reading.js';
import {completeStory,type CompleteStoryId,type StoryReadingVersion} from './storyReading.js';
import type {Chapter} from './model.js';
export function StoryReadingTools({chapter,id,version='available'}:{chapter:Chapter;id:CompleteStoryId;version?:StoryReadingVersion}){
 const support=useContext(ReadingContext),story=completeStory(chapter,id,version);
 if(!support||!story)return null;
 return <section className="g-story-reading" aria-label={'Read the complete '+story.title}>
  <strong>Read the whole story</strong><ReadingParagraph className="g-small">{story.note} Read at your own pace; your page is saved.</ReadingParagraph>
  <div data-reading-command="true" className="g-row"><button className="g-secondary" aria-label={support.speaking?'Stop listening':'Listen to the whole story'} onClick={()=>support.speaking?support.stop():support.speak(story.speech??{text:story.text,origin:story.origin})}>{support.speaking?'Stop listening':'Listen'}</button><button className="g-secondary" aria-label="Practise reading the whole story" onClick={event=>support.practice(story.text,'whole-story:'+id,event.currentTarget,story.origin,story.title,story.speech)}>Practise reading</button></div>
 </section>;
}
