import {useContext} from 'react';
import {ReadingContext,ReadingParagraph} from './Reading.js';
import {completeStory,type CompleteStoryId,type StoryReadingVersion} from './storyReading.js';
import type {Chapter} from './model.js';
export function StoryReadingTools({chapter,id,version='available'}:{chapter:Chapter;id:CompleteStoryId;version?:StoryReadingVersion}){
 const support=useContext(ReadingContext),story=completeStory(chapter,id,version);
 if(!support||!story)return null;
 return <section className="g-story-reading" aria-label={'Read the complete '+story.title}>
  <strong>Read the whole story</strong><ReadingParagraph className="g-small">{story.note} Read at your own pace; your page is saved.</ReadingParagraph>
  <div className="g-row"><button className="g-secondary" onClick={()=>support.speak(story.text)}>Hear the whole story</button><button className="g-secondary" onClick={event=>support.practice(story.text,'whole-story:'+id,event.currentTarget,story.origin,story.title)}>Read the whole story aloud</button>{support.speaking&&<button className="g-text-button" onClick={support.stop}>Stop listening</button>}</div>
 </section>;
}
