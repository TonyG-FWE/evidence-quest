import type {SourceId} from './model.js';
import {chapterSources,endingLines,preparedEndings} from './chapterContent.js';
import {chapterGlossary} from './chapterGlossary.js';
export interface Source {id:SourceId;title:string;author:string;authority:readonly string[];paragraphs:readonly string[];}
export const sources:Record<SourceId,Source>={
 ...chapterSources,
 bakery:{id:'bakery',title:'What Pip found at Rina’s bakery',author:'Pip’s visit today',authority:['GROUP-5-BAKERY-PACKET-20260915'],paragraphs:[
 'When Pip reached the bakery, rain was dripping through a cracked roof tile. Rina was moving her flour sacks away from the puddle.',
 '“I promised to have everyone’s bread ready today,” Rina said. “If those sacks get wet, I won’t be able to bake.”',
 'Sol had brought his tools and a ladder. An intact spare tile rested on a shelf beside the bakery.']},
 breadEnding:{id:'breadEnding',title:'Sol’s prepared ending: the bread',author:'Prepared words for Sol',authority:['D039'],paragraphs:[preparedEndings.bread]},
 thanksEnding:{id:'thanksEnding',title:'Sol’s prepared ending: Rina’s visit',author:'Prepared words for Sol',authority:['D039'],paragraphs:[preparedEndings.thanks]},
 notice:{id:'notice',title:'The invitation Pip gave Sol',author:'Pip’s message',authority:['D032'],paragraphs:["We've postponed the gathering until the last boat returns, so Mara can join us."]},
 finale:{id:'finale',title:'The ending you helped create',author:'Pip’s adventure',authority:['D042'],paragraphs:Object.values(endingLines)},
 opening:{id:'opening',title:'A promise to Grandma',author:"Pip's adventure",authority:['D018','D033','GROUP-3-RIVER-PACKET-20260915'],paragraphs:[
 "On an earlier visit, Grandma had given Pip a lantern seed. They had promised to plant it together before dark today. Pip put the seed in his backpack and set off for her garden.",
 "Last night's storm had washed away the footbridge. At the river, Pip stopped and took out Grandma's letter. She had written it before the storm.",
 '"Mara and Sol hardly visit anymore. I think they don\'t enjoy coming to the garden now. I miss hearing their stories."']},
 mara:{id:'mara',title:"Mara's story can travel",author:'At the passenger dock',authority:['D014','D029'],paragraphs:[
 'Mara stood on the dock with a sheet of paper in her hand.',
 '"Is that a story?" Pip asked.',
 '"One I wrote for Grandma\'s garden," Mara replied.',
 '"Grandma thinks you don\'t enjoy going there anymore."',
 'Mara lowered the page. "I miss it. But my work hours changed before the storm. I used to finish before the storytelling began. Now I have to wait for the last boat to return. By then, everyone at the garden has gone home."',
 '"Could you leave a little earlier?"',
 '"I have an obligation to the passengers," Mara said. "I need to help them get safely off the boat."']},
 sections:{id:'sections',title:'The boat and the broken bridge',author:'Grandma’s maintenance note',authority:['BOAT-BRIDGE-CORRECTION-20260914','GROUP-1-SOURCE-AMENDMENT-20260915','GROUP-3-RIVER-PACKET-20260915'],paragraphs:[
 'These are my two reusable footbridge sections. You may use them to repair the crossing. The two ropes in this marked box are for fastening the bridge. —Grandma',
 'Join the two bridge sections to make a footbridge. Look for the posts where the banks are close enough for the deck to reach both sides. Secure one end to each bank before anyone walks across.',
 'My small boat can carry the seed, but it cannot carry Pip. Load the seed at the yellow launch. Steer around the rock to my blue landing, then give me the seed. I will prepare the soil and wait for Pip to plant it with me.',
 "Keep the boat's route clear. The bridge stays in place so everyone can return.",
 "The seed stays dark in a boat or a hand. Its lantern-flower grows only after its roots reach the hill's soil."]},
 story:{id:'story',title:'The Torn Wing',author:'by Mara',authority:['D038'],paragraphs:[
 'Everyone had stepped off the last boat except a boy holding a paper bird.',
 '"Are you waiting for someone?" I asked.',
 'He shook his head.',
 '"This is for my grandmother. My sister made it, but she\'s too ill to come. I promised my sister I\'d keep it safe."',
 'One wing was torn.',
 'I reached toward the bird, but he pulled it closer.',
 '"Would you like some help?" I asked.',
 'He hesitated. Then he held out the bird.',
 'I fetched some tape from the dock office. Together, we mended the wing.',
 'When he stepped onto the dock, he held the bird carefully in both hands.',
 '"Now I can tell my grandmother how we fixed it," he said.']},
 report:{id:'report',title:'A story reaches Grandma',author:'Pip and Grandma',authority:['D015','D029'],paragraphs:[
 '"Mara still wants to come. But she\'s working at the dock while we\'re telling stories here. She asked me to share this with you."',
 '"I thought she\'d stopped enjoying the garden. I should have asked her what had happened. Let\'s read what she sent."']}
};
export const sourcePrefix=(id:string)=>'GA.SRC.'+id.toUpperCase()+'.'+(['opening','sections'].includes(id)?'R20260915.':'');
export const intro="Welcome to SparkFest, our festival of stories and inventions. This is Pip's story. You'll guide him through it, read what he finds, and help him decide what to do. Then we'll show the ending you helped create.";
export const words=(text:string)=>text.match(/[A-Za-z]+(?:['’][A-Za-z]+)?/g)??[];
export const normalize=(word:string)=>word.toLowerCase().replaceAll('’',"'");
const groups:[string,string][]=[
 ['moving','Taking something from one place to another.'],['puddle','A small pool of water on a surface.'],
 ['intact','Whole and undamaged.'],['spare','Kept ready to replace another one.'],['ladder','Equipment with steps used to climb up or down.'],['shelf','A flat surface used to store things.'],['rested','Was placed or supported on something.'],
 ['use','Put something to work for a purpose.'],['crossing','A way from one side of the river to the other.'],['look','Direct your eyes toward something.'],['where','At or in the place being described.'],['banks','The land on each side of the river.'],['sides','The two edges of the river in this instruction.'],['will','Shows what someone intends or expects to do.'],
 ['reusable','Able to be used again.'],['may','Have permission to do something.'],['ropes','Strong cords used here to hold the bridge in place.'],['marked','Given a label or sign that identifies it.'],['box','A container for keeping things.'],['fastening','Attaching firmly so something stays in place.'],['posts','Upright supports at the sides of the crossing.'],['close','Near to each other in this instruction.'],['enough','As much as is needed.'],['deck','The surface of the footbridge that people walk on.'],['load','Put something into a boat or other carrier.'],['yellow blue','Colors that identify the two boat landings.'],['launch','The place where the small boat starts its trip.'],['steer','Guide which way a boat moves.'],['around','Following a path that avoids an object.'],['rock','A hard piece of stone.'],['landing','A place beside the water where a boat can stop.'],['give','Hand something to another person.'],['prepare','Make something ready to use.'],['today','The day on which this adventure takes place.'],['given','Handed to someone.'],['my','Belonging to the person speaking or writing.'],
 ['a an','One person or thing, without naming which one.'],['the','Points to a particular person or thing.'],
 ['i me my',"The person speaking; my means belonging to that person."],['you your','The person being spoken to, or something belonging to them.'],
 ['he him his','A male person already mentioned, or something belonging to him.'],['she her','A female person already mentioned, or something belonging to her.'],
 ['they them their','People or things already mentioned, or something belonging to them.'],['we our us','The speaker together with other people.'],
 ['it its','A thing already mentioned, or something belonging to it.'],['that this these those','Points to a particular thing or group.'],
 ['and','Connects related words or ideas.'],['but','Introduces something different from what came before.'],['or','Shows another possibility.'],
 ['to','Shows a direction, recipient, or an action that follows.'],['for','Shows who something is meant for or why it is done.'],
 ['of','Connects a part, quality, or belonging to something.'],['in into','Inside something, or moving to its inside.'],
 ['on onto','On a surface, or moving to that surface.'],['at','Shows a particular place or time.'],
 ['with','Together with someone, or using something.'],['from','Shows where someone or something starts.'],['beside','Next to or at the side of something.'],['place','A particular spot or position. Here, stays in place means it does not move.'],
 ['before','Earlier than another time or event.'],['after','Later than another time or event.'],
 ['while','During the time that something else happens.'],['when','At the time something happens.'],
 ['then','At that time, or next in a sequence.'],['by','Shows a time limit, a nearby place, or who did something.'],
 ['so','Connects something with its result or purpose.'],['because','Introduces the reason for something.'],
 ['is are was were','Forms of be: they describe what someone or something is like or is doing.'],
 ['be been','To exist or to have a particular state.'],['have has had','Can mean to possess something; also helps describe an action or a need.'],
 ['do does did','Carry out an action; also helps form questions.'],['can could cannot',"Able to do something; cannot means not able to do it."],
 ['would','Describes a possible or expected action.'],['should','Describes something that is a good idea or is expected.'],
 ['not no',"Makes a statement negative, or says there isn't any."],["don't","Short for do not."],["she's","Short for she is or she has."],
 ["i'd","Short for I would or I had."],["she'd","Short for she would or she had."],["we're","Short for we are."],["let's","Short for let us; suggests doing something together."],
 ['one','A single thing or person.'],['each','Every one, considered separately.'],['both','The two of them together.'],
 ['everyone','All the people in a group.'],['anyone','Any person, without naming a particular one.'],
 ['someone','A person whose name is not given.'],['some','An amount or number that is not exact.'],
 ['except','Not including the person or thing that follows.'],['only','Nothing or no one else.'],
 ['too','More than is possible or wanted; sometimes means also.'],['all','The whole amount or every one.'],
 ['now','At the present time.'],['last','Most recent or final in a sequence.'],['night',"The time when it is dark outside."],
 ["night's","Belonging to or happening during the night."],['dark','With little or no light.'],['earlier','Before the other time being discussed.'],
 ['anymore','Any longer; used when something has stopped happening.'],['hardly','Almost not at all.'],
 ['still','Continuing to be true up to this time.'],['safely safe','Without being hurt or damaged.'],
 ['carefully','Taking care to avoid mistakes or damage.'],['together','With each other, doing something as a group.'],
 ['away','Farther from a place.'],['off','Away from or no longer on something.'],['out','Moving from inside to outside.'],
 ['here','In this place.'],['there','In that place.'],['across','From one side to the other.'],['toward','In the direction of something.'],
 ['closer','Nearer than before.'],['small little','Not large.'],['quiet','Making little sound.'],
 ['pip',"The child you guide through this adventure."],['mara',"The dock worker who wrote The Torn Wing."],
 ['sol',"Grandma's friend, whose part of the adventure comes later."],['grandma',"Pip's grandmother."],
 ["grandma's","Belonging to Pip's grandmother."],['grandmother',"The mother of someone's mother or father."],
 ['sister',"A girl or woman who has the same parent or parents as someone."],['boy','A young male person.'],
 ['passengers','People travelling in a vehicle, such as a boat.'],['hand hands','The parts of your body used for holding and touching things.'],
 ['head','The part of the body with the face and brain.'],['paper','Thin material used for writing, drawing or folding.'],
 ['sheet','A flat piece of paper or other thin material.'],['page','One side or sheet of a piece of writing.'],
 ['story stories','An account of people and events, real or imagined.'],['storytelling','Telling or sharing stories.'],
 ['letter','A written message sent to someone.'],['garden','A place where flowers or other plants are grown.'],
 ['plant','Put a seed or plant into soil so it can grow.'],['seed','A small part from which a new plant can grow.'],
 ['lantern','A light inside a protective cover.'],['flower','The part of a plant that opens into petals.'],
 ['roots','The parts of a plant that grow into the soil and take in water.'],['soil','The earth in which plants grow.'],
 ["hill's","Belonging to the hill, a raised area of land."],['backpack','A bag carried on your back.'],
 ['storm','Bad weather with strong wind, rain or thunder.'],['river','A large natural stream of flowing water.'],
 ['bank riverbank','The land along the side of a river.'],['boat boats','A craft that travels on water.'],["boat's",'Belonging to the boat.'],['two','One more than one.'],['wooden','Made from wood.'],['bridge','A structure that connects two sides across a gap.'],['section sections','A separate part of something larger. Here, each wooden section is part of the footbridge.'],['route','The path used to get from one place to another.'],['clear','Free from objects that would get in the way.'],
 ['dock','A place beside the water where boats stop so people can get on or off.'],['footbridge','A bridge made for people to walk across.'],
 ['end','The furthest part of something.'],['bird','An animal with feathers and wings; here it is made from paper.'],
 ['wing','One of the parts that lets a bird fly.'],['torn','Ripped or pulled apart.'],['tape','A strip of sticky material used to hold things together.'],
 ['office','A room or building where people do their work.'],['home','The place where someone lives.'],
 ['work working','Doing a job or task.'],['hours','Units of time; here they are the times when Mara works.'],
 ['obligation','Something you have a duty to do.'],['secure','Fasten something so it stays in place.'],
 ['secured','Fastened so something stays in place.'],['hesitated','Paused because you were unsure what to do.'],['mended','Repaired something that was damaged.'],
 ['promised','Said that you would definitely do something.'],['put','Placed something somewhere.'],['set','Placed something or started an activity.'],
 ['washed','Moved or carried by water in this sentence.'],['stopped','No longer moved or continued.'],['took','Picked up or carried something.'],
 ['written wrote','Put words onto a page.'],['visit visiting','Go to see someone or a place.'],
 ['think thinks thought','Have an idea or belief; it may need checking.'],['enjoy enjoying','Get pleasure from something.'],
 ['going coming come gone','Moving toward or away from a place.'],['miss','Feel sad because someone or something is absent.'],
 ['hearing','Noticing sounds with your ears; here, listening to stories.'],['stood','Was on their feet.'],
 ['asked','Said something to get an answer or request help.'],['replied','Answered someone.'],
 ['lowered','Moved something down.'],['changed','Became different.'],['used','Here, used to means something happened regularly in the past.'],
 ['finish','Complete an activity or reach its end.'],['began','Started.'],['wait waiting','Stay until something happens or someone arrives.'],
 ['return','Go or come back.'],['leave','Go away from a place.'],['said','Spoke words.'],
 ['need','Must have or must do something.'],['help','Make something easier for someone.'],['get','Receive, reach, or move into a new state.'],
 ['kept keep','Continue to have something or make sure it remains a certain way.'],['carry','Hold and move something from one place to another.'],
 ['join joined','Connect things so they stay together.'],['make made','Create something or cause something to happen.'],
 ['walks','Moves on foot.'],['stay stays','Remain in a place or state.'],['grows','Becomes bigger or develops.'],['reach reached','Get to something or stretch toward it.'],
 ['stepped','Moved by taking a step.'],['holding held','Kept something in the hands.'],['shook','Moved from side to side.'],
 ['ill','Not well; sick.'],['pulled','Moved something closer by holding it and drawing it toward you.'],
 ['like','Want or enjoy; sometimes used to compare things.'],['fetched','Went to get something and brought it back.'],
 ['fixed','Repaired something.'],['tell telling','Give someone information in words.'],
 ['how','In what way.'],['what','Asks for or refers to information about a thing or action.'],['say','Speak words to someone.'],["we've",'Short for we have.'],['until','Up to the time when something happens.'],['returns','Comes or goes back.'],
 ['wants','Would like to have or do something.'],['share','Let someone else have, hear or use something.'],
 ['happened','Took place.'],['read','Look at written words and understand them.'],['sent','Made something go to another person or place.']
];
export const glossary:Record<string,string>={...Object.fromEntries(groups.flatMap(([keys,meaning])=>keys.split(' ').map(key=>[key,meaning]))),...chapterGlossary,sol:'Grandma’s friend who repairs things and wrote A Small Repair.',crossed:'Went from one side to the other.',planted:'Put a seed into the soil so it could grow.',returned:'Came or went back.',listened:'Paid attention to what could be heard.',ending:'The last part of a story.',prepared:'Made something ready beforehand.',shared:'Let other people hear, use or take part in something.',draft:'A piece of writing that may still be changed.',add:'Put something more with what is already there.',unfinished:'Not completed yet.',heard:'Noticed sound or listened to someone.',afterward:'After the event just described.',even:'Emphasizes something that may be surprising.',"couldn't":'Short for could not.'};
export function meaning(word:string,sentence:string){
 const key=normalize(word);
 if(key==='last')return sentence.includes('night')?'The night before today.': 'The final boat or event in this sequence.';
 if(key==='too')return sentence.includes('ill')?'So ill that she is unable to come.': 'Also; in addition.';
 if(key==='secure'&&sentence.includes('corners'))return 'Hold something firmly in place.';
 if(key==='still'&&sentence.includes('flour'))return 'Continuing to be dry after Sol fixed the tile.';
 if(key==='end'&&sentence.includes('ending'))return 'The last part of a story.';
 return glossary[key];
}
export function context(word:string,sentence:string){
 const key=normalize(word);
 if(key==='obligation')return 'Here, Mara means that helping the passengers get off the boat safely is her responsibility. She cannot leave before she has done that.';
 if(key==='secure'||key==='secured')return sentence.includes('corners')?'The stones hold the tablecloth down so the wind cannot lift it.':'Here, you need to fasten one end of the crossing to each riverbank.';
 if(key==='hesitated')return sentence.includes('flute')?'The boy pauses before deciding to play his flute.':"The boy does not hand over the bird immediately. He pauses before deciding to accept Mara's help.";
 if(key==='assumed')return 'Grandma thought her friends no longer enjoyed visiting. She had not asked them why they stayed away.';
 if(key==='prevented')return 'The repaired roof stopped water from reaching the flour.';
 if(key==='postponed')return 'The gathering will start after the last boat returns instead of at the usual time.';
 if(key==='mended')return 'Mara and the boy repair the torn wing. They keep the bird his sister made.';
 return sentence;
}
/** Phrase and title support uses the actual sentence and source exposure, never a guessed event. */
export function wordHelp(word:string,sentence:string,duetContext=false,title=false){
 const key=normalize(word);
 if(key==='kept'&&sentence.includes('kept his promise'))return {title:'Kept his promise',definition:'Did what he had said he would do.',explanation:'Pip said he would plant the seed with Grandma before dark. He planted it with her.',phrase:'kept his promise'};
 if(key==='put'&&sentence.includes('stayed put'))return {title:'Stayed put',definition:'Stayed in the same place.',explanation:'The stones held the cloth down while the wind blew.',phrase:'stayed put'};
 if(title&&key==='duet')return {title:word,definition:'Music performed by two people together.',explanation:duetContext?'The boy plays the flute while another passenger whistles the same tune.':'',phrase:null};
 return {title:word,definition:key==='postponed'?'Moved something to a later time.':key==='prevented'?'Stopped something from happening.':meaning(word,sentence),explanation:context(word,sentence),phrase:null};
}
