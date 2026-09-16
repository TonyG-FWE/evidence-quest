/** Exact approved chapter sources. Dialogue and manuscript remain separate. */
export const chapterSources = {
 sol:{id:'sol',title:'A Small Repair',author:'by Sol · Ending not written yet',authority:['D039'],paragraphs:[
  "Rain dripped through the roof of Rina's bakery. She dragged her flour sacks away from the puddles.",
  '"I promised to have everyone\'s bread ready today," Rina said. "If those sacks get wet, I won\'t be able to bake."',
  'I found a cracked roof tile and replaced it. The dripping stopped.',
  'Rina checked the sacks. The flour was still dry.',
  'I packed my tools and went back to my workshop.'
 ]},
 later:{id:'later',title:'What Sol tells you next',author:'Sol’s account · separate from his draft',authority:['D039'],paragraphs:["After I left, Rina baked the bread she'd promised. Later, she brought a loaf to the workshop to thank me. I could write about that."]},
 empty:{id:'empty',title:'The Empty Bench',author:'by Grandma',authority:['D040'],paragraphs:[
  'Before the storm, I put cushions on the garden bench every evening.',
  'Mara brought stories about people she met at the dock. Sol told us about things he had made.',
  'Slowly, their visits became less frequent. Sometimes I waited beside an empty bench.',
  '"Perhaps they don\'t enjoy our stories anymore," I thought.',
  'Eventually, I put the spare cushions away.',
  'Today, I learned why they had stayed away. Mara was working when our gatherings took place. Sol thought no one would want to hear his story.',
  'I had assumed that fewer visits meant my friends no longer cared about the garden. I should have asked what was keeping them away.',
  'Pip helped us find a way to share our stories again.',
  'I brought the cushions out again.'
 ]},
 picnic:{id:'picnic',title:'The Windy Picnic',author:'by Grandma · an older garden story',authority:['D041'],paragraphs:[
  'I was spreading a cloth over the garden table when the wind snatched one corner from my hand.',
  'Sol caught it before it knocked over a jug of water.',
  '"We\'ll need to secure the corners," he said.',
  'Mara fetched four smooth stones from beside the path. We placed one on each corner and set out our picnic.',
  'The wind ruffled our hair and rattled the leaves, but the cloth stayed put.',
  '"Next time, I\'ll bring a heavier tablecloth," I said.',
  '"Bring the same cake," said Sol.',
  'Mara held out her plate for another slice.'
 ]},
 duet:{id:'duet',title:'The Unexpected Duet',author:'by Mara · an older garden story',authority:['D041'],paragraphs:[
  'A boy carried a flute onto my boat. He kept it tucked beneath his arm while the other passengers found their seats.',
  '"Would you like to play something?" I asked.',
  'He hesitated, then lifted the flute. The first notes were so quiet that I could hardly hear them.',
  'A whistle answered from the back of the boat. An older passenger had recognised the tune.',
  'The boy started again. This time, they played together.',
  'When we reached the dock, the other passengers waited for the final note before stepping ashore.'
 ]}
} as const;
export const preparedEndings={
 bread:'The repair had prevented the flour from getting wet. Rina used it to bake the bread she had promised. Fixing one tile had helped her keep that promise.',
 thanks:'Later, Rina brought me a loaf of bread to say thank you. I had thought it was only a small repair. It had mattered to her.'
} as const;
export const endingLines={
 opening:'Pip crossed the river and planted the seed with Grandma. He had kept his promise.',
 mara:'The gathering began after the last boat returned. Mara told her story.',
 listener:'The gathering began after the last boat returned. Mara listened while Pip read her story.',
 absent:'Mara was still working, so Pip read her story at the gathering.',
 prepared:'Sol read his story with the ending he and Pip had prepared.',
 developed:'Sol shared his draft, and Pip helped him add an ending.',
 draft:'Sol shared his unfinished draft.',
 together:'Grandma had heard why her friends had stopped visiting. Together, they had found a way to share stories again.',
 delivered:"Afterward, Pip took Grandma's story to Mara. Their stories could be shared even when they couldn't all be together."
} as const;
