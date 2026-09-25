# Evidence Quest

A story-driven reading adventure for ages 9–12. Guide Pip through a riverside village, help its residents, and bring their stories together for Sparkfest.

Explore the village, repair a bridge, deliver a lantern seed by boat or by hand, help at Rina’s bakery, revisit Mara’s paper-bird story, and prepare a story to share in Jo and Loop’s studio. Reading, writing and choices connect to actions in the world.

Evidence Quest is the playable reading-adventure prototype for **SparkFest**, a broader festival setting where children prepare presentations, share stories and enter those stories. The context below describes Tony’s development process, the current implementation and the production approach he would take.

[Product and technical context for judges](#product-and-technical-context-for-judges) · [Run the demo](#run-the-demo) · [Controls](#controls)

## Product and technical context for judges

*Tony Guillaro | September 25, 2026 — additional information for the Nerdy team*

I wanted to share some additional detail about how SparkFest was developed, the decisions behind the demo, and how I would approach taking it into production. This brings together the product thinking, the current implementation and the work I would prioritise next.

### Product direction and development

#### How the idea developed

I started from two perspectives: the educator and the child. I wanted to support comprehension, fluency and vocabulary while giving children several ways to engage with the material. I also wanted a game they would choose to play, with exploration, interaction and a reason to keep going. Phones, tablets and computers were part of the intended experience.

I took those requirements and some initial ideas into my AI workflow, directing research into children's education, learning, gameplay and current interests. The AI proposed several concepts. The underlying idea of a detective game fit what I was looking for, but I felt that setting was too narrow. I developed SparkFest around children putting on presentations, sharing stories and letting the player enter those stories. A rough playable version helped me test the direction, then refine the story and the larger setting through several revisions.

The bridge is one example of the learning design. Instructions help the player construct a crossing, and unsecured parts can fail. Word help and narration are available when the player needs them. Conversations and writing ask the child to understand different characters and explain what matters. Completing an action alone does not prove comprehension; a player could sometimes succeed through trial and error.

#### My role and the AI workflow

I developed the concept, story, intended experience and build plans, and directed the implementation. AI agents generated the code. About two days went into the concept and plans, followed by five days building, playing, revising and polishing the initial demo.

My agents and harnesses helped turn the plans into bounded build orders, each covering a specific piece of work. Multiple Codex threads worked on different features, with coordination to limit overlapping changes. Independent guardian agents reviewed the results and coordinated corrections. Devin provided additional code review, bug identification and fixes.

My own evaluation centred on playing the game. I checked whether the story and actions lined up, whether objects were placed sensibly, and whether an interaction delivered the experience I intended. When the result missed that, I described the mismatch and directed a specific revision. Agents' technical checks and reviews supported that process, but a passing check could not establish whether a scene was appealing or an interaction felt right.

#### Lessons from the first build

This was my first game. The early 2.5D version was difficult to interact with, and the first 3D version was too basic for the visual appeal I wanted. Revising the story, assets and interactions together took considerable work. With seven days, I prioritised a playable experience connecting reading to action. Deeper stories, more interactions and greater visual polish need further development. The endings also need refinement.

### How the current prototype works

#### Game state and progress

React handles the reading interface, Three.js renders the world, and TypeScript expresses the game logic. A Node server handles optional provider services. The interface and world use the same record of what has happened. Player actions pass through an ordered command process; the game applies its rules, updates that record, and the scene and reading panels reflect the accepted result.

Possession, delivery and completion are distinct facts. Picking up Mara's page does not mean Grandma has received it. The bridge follows explicit construction rules, including whether parts have been secured. Those consequences do not depend on an AI model deciding whether the player should succeed.

Progress is stored in the browser through IndexedDB, including story progress, inventory, completed actions and saved writing. The save implementation checks for a competing writer before replacing a record, allowing it to detect a conflict between tabs. That is an implemented safeguard, not a claim that every crash or storage scenario has been qualified. There is no account system synchronising progress across devices. Clearing the site's local data can remove the save.

#### Reading support and AI features

The reading tools let a player select words, consult definitions, hear pronunciation and listen to passages. Recording and playback support reading practice. I used Fish Audio for narration and character voices; much of that audio was generated ahead of time and is played as recordings during the game.

Optional AI writing feedback is attached to Sol's story activity and uses the submitted writing with relevant story context. An earlier live check is recorded in the project evidence. This is a specific feedback activity, rather than an unrestricted character chatbot. Spoken-reading AI assessment remains an unfinished connection and should be distinguished from the working recording and playback tools.

Character audio required more than assigning one voice to a whole page. A passage can change speakers, and a selected sentence still needs the correct narrator or character voice. Individual word clips also needed work: clips cut from sentences could include abrupt endings or neighbouring sounds. They were replaced with recordings of complete words. Some short-word pronunciation and ending issues remain and need further listening review.

#### Assets and current limits

I used generated reference images, Tripo for 3D assets and Blender during asset development. I directed the process and reviewed the results; agents and asset tools performed the implementation work. Models had to fit the scene, character scale, story timing and physical interactions. Looking good in isolation was only one part of that review.

The build already includes compressed asset loading and limits on loading work. Its focused checks and recorded playthroughs provide evidence for particular behaviours and builds. They do not establish consistent performance across a supported phone, tablet and computer range. Broader reliability, controls, accessibility, pronunciation and learning effectiveness still need evaluation.

### The production approach I would take

#### A fresh project informed by the prototype

If SparkFest moves forward, I would start a new production project. The demo gives us a playable reference for the experience and helps expose what needs to become reusable. I would bring forward the story, suitable assets, reading interactions and useful architectural ideas, while reviewing unfinished behaviours before treating them as requirements. Five days of prototype implementation should carry little weight in choosing the production engine.

My provisional preference is browser delivery with PlayCanvas for the game world, React for the literacy interface and TypeScript for shared story rules. Access through a link is useful for this product, and selecting text, listening, recording and writing are substantial parts of the interface. PlayCanvas offers a visual editor and React integration. I would first verify a repeatable workflow between authored scenes and the reading tools.

Unity remains a serious alternative for web delivery and installed apps. I would compare the same representative scene, assets and interactions, looking at loading, sustained performance, controls, animation and the content workflow. Better results on the intended devices, or a substantially better production workflow, could change the recommendation. I have not benchmarked production versions of either approach. Three.js could also remain viable if it earns that choice on the product's requirements.

#### Reusable stories and interactions

The current game contains logic tied directly to Pip's chapter, including its bridge, bakery, characters and progress. For production, I would separate each story's dialogue, characters, locations, objects and consequences from shared capabilities such as talking, carrying, delivering, placing and securing parts.

The same placement capability could support a bridge in one adventure and a festival presentation in another, with different objects, instructions and valid outcomes. New mechanics would still require engineering and testing. Authors would need previews, content checks and connected playthroughs; a content editor would not automatically make any imagined action playable.

I would preserve one clear authority for meaningful story facts while separating frequent animation and movement updates from durable progress. An animation finishing should not independently mark an item as delivered. The input should request an action, the rules should validate it, and the scene, interface and saved progress should reflect the accepted result.

#### Device performance and the asset workflow

I would choose target devices early and test the complete experience on them. A growing library does not require loading every world at once. Areas can load as needed, with budgets for models, textures, lighting, animation and physical interactions. Asset preparation would retain approved references and source files, then check scale, movement, collision and performance in representative scenes.

I would profile performance problems before reducing quality. Rendering problems may call for changes to shadows, effects or resolution; loading and memory problems need attention to assets and what stays resident. Readable text, clear objects and useful feedback remain priorities. Frame rate alone would not tell us whether a child can comfortably select a word or use the controls.

Technical references: [PlayCanvas Editor](https://developer.playcanvas.com/user-manual/editor/) · [PlayCanvas React](https://developer.playcanvas.com/user-manual/react/) · [Unity browser support](https://docs.unity3d.com/Manual/webgl-browsercompatibility.html)

### Evaluation and the next stage

#### Learning evidence and readiness for children

I have not tested the learning outcomes with children. My playthroughs helped evaluate the experience, but I would work with literacy specialists and appropriately consented learners to understand its educational value. Early sessions would examine where children pause, what they think they are being asked to do, which support they use, and whether that support helps them continue.

I would separate difficulty understanding the text from difficulty using the controls. I would also look for understanding beyond one successful action: explaining a choice, using a word in another story, or applying an idea to a new situation. Decisions about harder material should consider comprehension across activities, the help a learner uses and how they handle new content. Completing a level or clicking quickly would not establish readiness on its own.

Before real use, I would define clearly what remains on the device and what is sent to an outside service. Current progress is local and practice recordings are temporary; optional AI features have separate data-handling considerations. Consent, retention, access and provider handling need review, alongside the clarity and appropriateness of the feedback. Story-specific prompts still need checks for unexpected input and unsuitable responses.

#### A small first production milestone

With another week, I would work through the current adventure and improve places where the story, controls or reading support get in the way. For a production effort, I would begin with SparkFest itself: the crew, Loop and preparing something for the festival, connected to one complete playable story section.

I would then create a small second example using the same reading tools and interactions. That would test whether the architecture makes another story easier to produce while allowing it to feel different. Alongside the build, I would evaluate the visual quality, asset workflow, target-device experience and learner support, and plan the specialist review and consented sessions.

The first month would be a bounded development and evaluation effort. A large story library, unrestricted generated worlds and universal device support would remain outside that first milestone. Its purpose would be to give us evidence for the next production decisions, not to imply that the full vision could be finished in a month.

#### Longer term development

I want SparkFest to become an explorable festival with more crew and Loop interactions, opportunities to build and create, and a growing collection of playable stories. Those stories could introduce richer characters, vocabulary, situations and consequences, with more opportunities to read aloud, write and reason. Graphics, animation and physical interactions would develop alongside the storytelling.

AI-assisted endings could give children more room to develop their own ideas. A model could offer feedback or suggest a supported variation, while game rules check consistency with the characters, objects and events. I would preserve the child's original writing. An idea the game cannot yet act out should not be treated as a wrong idea. Content generated during development would also need review, checks and playthroughs.

Language learning could grow through gradual immersion: begin mainly in the child's language, introduce individual words, then phrases, sentences, paragraphs and whole stories. “Mi abuela needs my help” could develop into “Mi abuela necesita mi ayuda,” with definitions, pronunciation and practice available along the way. With permission, selected reading or writing examples could also help a tutor guide a later session or suggest another adventure. These are directions I would develop and evaluate as the core experience becomes stronger.

## Run the demo

From the repository folder in PowerShell:

```powershell
.\scripts\bootstrap.ps1
.\scripts\npm.cmd ci
.\scripts\npm.cmd run build:demo
.\scripts\npm.cmd run start:demo
```

Open **[Evidence Quest](http://127.0.0.1:4364/garden)**. Keep the server terminal open while playing. Press Ctrl+C in that terminal to stop the server.

The bootstrap installs the required Node.js version locally. Initial setup needs an internet connection; authored gameplay does not require AI credentials.

## Begin an adventure

Choose **Begin Pip’s adventure** to enter the village and read the opening. Choose **Start playing** when you are ready to explore. You can take your time reading and return to help whenever you need it.

## Controls

| Action | Controls |
| --- | --- |
| Walk | Click the ground, use arrow keys or WASD, or choose a destination in Places & scene description. |
| Talk or inspect | E or the named on-screen control. |
| Backpack | I or Backpack. |
| Move a held object | Drag and release, or use the native controls. Arrow keys move, Shift makes smaller moves, Q/R turn, Enter releases and Escape cancels. |
| Boat | Use the load, steer, dock and unload controls. Pip stays on shore. |
| Plant | Prepare the soil, place and cover the seed, then touch the rooted sprout or choose its growth control. |
| Read and write | Use the reading area, clickable words, writing fields and choices. Tab moves focus; Enter or Space activates a focused button. |
| Story playback | Use the pause, resume and replay controls. |
| Pause or leave help | Escape or the named Back/Pause controls. |

## Reading and audio

The adventure includes narrated passages and character voices. Listening is optional. Click supported words for meaning and pronunciation help, or use the reading controls to hear a passage.

**Listen** plays the passage or conversation. **Practise reading** opens optional microphone recording and replay. Word help offers separate word and sentence listening. The demo uses the approved recorded voices; some short-word pronunciations still need refinement.

Writing activities let you try an ending before choosing to use it. Optional reading practice provides controls for recording, replaying and discarding a short reading. Larger text and reduced motion are available from Pause.

Optional live feedback and custom-text voices use separately configured services. The authored adventure can be played without them; configuration examples are in `.env.example`.

## Nerdy demo



The [demo checklist and evidence](docs/game-review/NERDY-DEMO-20260924.md) distinguish completed demo checks from remaining production-art and performance qualifications. The clean demo presentation does not change artwork approval status.
