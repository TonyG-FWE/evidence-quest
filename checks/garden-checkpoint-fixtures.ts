import {buildBridge} from './garden-bridge-actions.js';
import assert from 'node:assert/strict';
import {GardenStore,initialGarden,CROSSING,MARA,GRANDMA_APPROACH,type Point,type Chapter} from '../src/garden/model.js';
import {SOL_APPROACH,type StoryEvent} from '../src/garden/chapter.js';
import {validChapter} from '../src/garden/persistence.js';
import {advance,completeConversation,finishBakery,finishSpokenTurn,finishArrivals,tellGrandmaStory,shareTornWing} from './garden-play-actions.js';

/** Cross-browser replay fixture built with real serialized commands. It does
 * not replace fresh native chapter journeys or assert human play acceptance. */
export function narrativeCheckpoint(time:'usual'|'later',reader:'pip'|'mara',outcome:'prepared'|'developed'|'draft',stop?:'memory'|'arrivals'):Chapter{
 const s=new GardenStore(initialGarden(`matrix-${time}-${reader}-${outcome}`));s.send({type:'BOOT'});s.send({type:'BEGIN'});s.send({type:'START_PLAY'});
 const close=()=>{for(let i=0;i<20&&s.getSnapshot().panel;i++)s.send({type:'CLOSE'});};
 const go=(point:Point)=>{close();s.send({type:'GO',point});advance(s);assert.ok(Math.hypot(s.getSnapshot().chapter.pip.x-point.x,s.getSnapshot().chapter.pip.z-point.z)<.02);};
 const event=(event:StoryEvent)=>s.send({type:'STORY',event});
 go({x:MARA.x,z:MARA.z+.95});s.send({type:'TALK',who:'mara'});completeConversation(s);if(reader==='pip'){s.send({type:'TAKE_PAGE'});advance(s);}
 go(CROSSING);buildBridge(s);
 go(GRANDMA_APPROACH);s.send({type:'TALK',who:'grandma'});s.send({type:'PLANT'});advance(s);s.send({type:'BLOOM'});advance(s);finishBakery(s);go(SOL_APPROACH);s.send({type:'TALK',who:'sol'});completeConversation(s);
 if(outcome==='prepared'){event({kind:'FINISH_WITH_SOL'});event({kind:'EDIT',text:'I kept the flour dry. Rina baked the bread she had promised.'});event({kind:'SELECT_ENDING',contribution:{text:s.getSnapshot().chapter.story.solDraft.text,scene:'bread',origin:'child',revision:s.getSnapshot().chapter.story.solDraft.revision}});}else event({kind:'BRING_DRAFT'});
 go(GRANDMA_APPROACH);event({kind:'REPORT_MARA'});event({kind:'REPORT_SOL'});event({kind:'PLAN',time,reader});go(SOL_APPROACH);event({kind:'INVITE',who:'sol'});go({x:MARA.x,z:MARA.z+.95});event({kind:'INVITE',who:'mara'});go(GRANDMA_APPROACH);event({kind:'REPORT_ARRANGEMENTS'});
 if(stop==='arrivals'){assert.ok(validChapter(s.getSnapshot().chapter));return structuredClone(s.getSnapshot().chapter);}
 event({kind:'BEGIN_GATHERING'});finishArrivals(s);event({kind:'NEXT_STORY'});finishSpokenTurn(s);shareTornWing(s);event({kind:'NEXT_STORY'});event({kind:'NEXT_STORY'});finishSpokenTurn(s);
 if(outcome==='developed'){event({kind:'ASK_SOL',question:'thanks'});finishSpokenTurn(s);event({kind:'ADD_ENDING',scene:'thanks'});finishSpokenTurn(s);}if(outcome==='draft'){event({kind:'KEEP_DRAFT'});finishSpokenTurn(s);}
 tellGrandmaStory(s);if(stop==='memory'){assert.ok(validChapter(s.getSnapshot().chapter));return structuredClone(s.getSnapshot().chapter);}event({kind:'MOMENT',moment:'gathering'});advance(s);event({kind:'NEXT_STORY'});finishSpokenTurn(s);
 if(time==='usual'){event({kind:'TAKE_COPY'});advance(s);go({x:MARA.x,z:MARA.z+.95});event({kind:'DELIVER_COPY'});advance(s);finishSpokenTurn(s);}
 event({kind:'FINISH'});const chapter=s.getSnapshot().chapter;assert.ok(chapter.story.ending);assert.equal(chapter.story.ending.sol,outcome);assert.ok(validChapter(chapter));return structuredClone(chapter);
}
