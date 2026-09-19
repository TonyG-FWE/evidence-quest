# Evidence Quest — playable story and literacy correction
Date: 2026-09-12
Status: IMPLEMENTATION REQUIRED; this document is not acceptance evidence.

## Authority and immediate objective
The user has rejected the first connected build as unclear, visually unrecognizable, and insufficient for the actual English Reading Game brief. The user explicitly directs us to create the game originally intended. This correction takes precedence over the earlier first-build-only stop and supporting-copy freeze where specified below. Preserve the working engine, current project, branch, original imported source history, four rooms, independent resource recovery, all five valid tile arrangements, accessibility and save guarantees. Do not restart the project or switch to the next dashboard-like tool task while these failures remain.

The task is to make the existing adventure understandable and enjoyable, provide purposeful reading fluency practice, teach and reuse vocabulary, and make comprehension useful in consequential decisions. Produce a playable correction with reviewed illustrated assets. Existing technical passes remain historical evidence; they do not prove this correction passed or establish child learning.

Nerdy's actual Prompt 03 requires reading fluency, comprehension, vocabulary, and interactive narrative/gameplay: https://hackathon.nerdy.com/
Instructional basis, not a claim that this app is validated: IES/WWC, Providing Reading Interventions for Students in Grades 4–9, recommendations 2 and 3: https://ies.ed.gov/ncee/wwc/PracticeGuide/29 . Use modeled reading, purposeful rereading, meaningful word knowledge and comprehension checks. The guide describes instructional practice; a short game must be evaluated separately.

## 1. What the child is doing and why
SparkFest is a local festival where children share stories and inventions they have made. Our crew is showing The Little Bridge today. The player helped make Pip's red backpack and is running the show with friends. Jo wrote the story, Remy made the boats, and Ari records the moving paper scenes. Loop is their friendly rolling projector: it puts the paper characters onto the big screen. Without Loop and a working ending, their shared story cannot be performed for the visitors.

The adventure has one connected goal: get the crew's show ready and perform it. Finding Loop is the first problem. Making an ending in which Pip keeps his promise is the second. There is no theft, damage, punishment, fake emergency, countdown or new villain. Visitors wait for a show that works; failure leaves a specific story action unfinished and permits another attempt.

Pip is a character inside the crew's paper story, not another child standing in the festival. Grandma is another paper character. Maintain this distinction in art, introductions, spoken attribution and labels.

## 2. Opening: tell the story inside the world
Add an immediately visible, readable festival/program identity in the Stage environment: “SparkFest — stories and inventions made by us” and “Today's show: The Little Bridge”. Native text on a physical sign/program, never generated lettering. Room remains explorable; do not begin with a wall of exposition or a form.

Home subtitle: “Our story needs an ending.”
Home introduction: “Join your friends at SparkFest. Find Loop, bring your paper story to life, and put on The Little Bridge.”
Primary action: “Join the crew”. Continue remains distinct.

On a fresh start, use short, character-anchored speech with the current world visible. The first greeting is offered automatically; the child controls the next line. Show the speaker's recognizable portrait/name and role. Do not auto-advance reading text. Provide “Keep exploring” at every beat and “Our story so far” for re-entry. Movement stops only while the child is actually operating the speech view; no accidental movement when typing or pressing speech buttons. No introduction completion gate.

Exact new opening lines, in this order:
- Jo — story writer: “There you are! Welcome to SparkFest. It's our festival of stories and inventions. Today, visitors are coming to see the story we made together.”
- Jo: “This is Pip, our paper traveler. That's the red backpack you helped make. Our show is called The Little Bridge.”
- Jo: “Pip promised to visit Grandma and plant a seed with her. But the river washed their bridge away. We still need to make the ending work.”
- Jo: “You're running the show with us. Loop, our rolling projector, makes these paper characters move on the big screen.”

Use the model and the visible empty dock as the subjects of these beats. Show Pip/backpack at readable size with a brief physical focus/emphasis, no player teleport and no new inventory reward. Give the child the actual model pull-tab action after the Pip line as an optional action, not another dialog-box simulation. When they operate it, Pip moves toward the visibly broken bridge and cannot cross. Preserve the original model's non-solution behavior.

Then provide a physical “Try the big screen” action at the existing Preview pad (walk/approach and operate it, do not trigger from afar). Its unsuccessful preview remains blank and Jo says:
“Loop isn't in the dock. Ari borrowed it to record the last scene. Let's find them and bring our equipment back. Then you can try an ending for Pip.”

This is Jo's already-established knowledge; she does not name an unknown destination. If the player leaves before trying Preview, the visible mission and Jo's recoverable account still make the same purpose available. Initial instructions must never depend on guessing an unlabeled flap.

Default opening mission: “Find Loop so our crew can put on The Little Bridge.”
Persistent mission is a compact world control, not a dashboard. Expand it to show the current chapter, people, purpose and next physical objective. Replace the startup caption that stays unchanged during unrelated actions with the actual current scene/mission logic.

“Our story so far” must answer:
- Where: SparkFest, our festival of stories and inventions.
- Who you are: a member of the story crew, helping run today's show.
- Who Loop is: our rolling projector, needed for the big screen.
- What is wrong now: from actual current state.
- What you are trying to accomplish: bring back equipment, rehearse Pip's ending, perform the show.
- Why it matters: your crew's shared work is what the visitors have come to see.
Do not expose the hidden location, full notice, uninspected notes, solution order or unseen outcomes.

Resume an existing save without forcing the new introduction. Offer “Meet the crew / Our story so far” once, non-blocking. Persist dismissed/visited beats properly and use the single state owner. Version any new save fields with a conservative migration; no destructive reset.

## 3. Exploration, characters and transitions
Place readable names/roles close to encountered characters:
Jo — story writer; Remy — model maker; Ari — animation maker; Loop — rolling projector.
Remote lists may name public destinations and already-met people, but must not reveal Ari/Loop's unobserved location.

First conversation introductions, before their existing factual branches:
Remy: “I'm Remy. I made the little boats for our show. I was filming behind the scenes when I saw Loop leave.”
Ari, only after arriving in Media: “You found us! I'm Ari. I record the moving paper scenes for our show.”
Follow with their existing bounded accounts. Remy's mistaken conclusion stays attributed as a belief. Ari supplies the actual move reason on meeting her; do not make the child read a slate to obtain basic cooperation.

Room identities and public purpose:
Stage — “Our crew's performance space.”
Courtyard — “Outdoor practice space.”
Workshop — “Models and inventions.”
Media — “Indoor recording room.”
Use “Media room” in child-facing prose; preserve internal IDs. Basic destination function is public; occupancy remains observed.

Give each meaningful discovered result a short why-it-matters sentence, limited to the child's actual exposure:
- Full E3 after reading both parts: “The outdoor practice was canceled. The first public show is still planned.” Mark this as a supplied interpretation/support, not an independent inference by the child. Do not display it when only the curled word is visible.
- Loop observed: “Loop is here. Our projector can go back to the Stage.” Do not make retrieval dependent on any note or explanation.
- Both resources returned: “The screen works and the story tiles are ready. Now help Pip keep the promise in Jo's story.”
- A successful seed delivery with Pip still across: show the actual split positions prominently. Caption: “The seed reached Grandma. Pip is still across the river.”
- Unmet joint planting: “Pip promised to plant with Grandma. They are still on opposite banks.” This is support supplied after the actual failed attempt and must be recorded as such, not hidden mastery evidence.
- Full successful rehearsal: “Pip reached Grandma, and they planted the seed together. Your ending works. You're ready to put on the show.”
- Premiere completion: “You brought Loop back, finished Pip's journey, and put on your crew's first show.”
Preserve all five valid arrangements and harmless Ferry behavior. Do not reveal the Bridge solution automatically.

## 4. Literacy belongs to the show
Keep a single adventure. Add a small “Read with the crew” tool attached to the Stage program and relevant already-available sources, not a separate classroom dashboard. Its purpose is to help the child perform the show's narration and understand the words the crew uses.

### 4.1 Fluency practice
Three meaningful short readings:
READ.WELCOME, available with the opening:
“Welcome to SparkFest! Today, our crew is putting on The Little Bridge. We made the paper characters together. Now we need to bring their story to life on the big screen.”

READ.PROMISE, available when Jo actually presents her story note or the player opens E6:
Use the complete exact E6 body and its existing exposure rules. Offer a focus on Pip's spoken promise: “I'll come to your hill, and we'll plant this seed together before dark.” Preserve canonical curly-apostrophe text in its source; this short focus is a referenced excerpt.

READ.ENDING, available after a successful rehearsal or completed premiere:
“Pip crossed the river to reach Grandma. Together, they planted the seed in the hill's soil. A lantern-flower opened, and its warm light shone across the water.”
This is a new narration of the actual successful outcome, not a source clue and never available before it is known.

For each reading, implement:
- “Listen” / “Stop listening”: a real spoken model, triggered by the child, matching the displayed passage exactly. Use an available English speech voice through the browser as the first implementation; no cloud recording or microphone. Do not use audio callbacks to advance game state or award success.
- “Show reading phrases”: optional visual grouping at meaningful phrase boundaries. Full text remains available in a single natural reading order; no forced timed word disappearance.
- “My turn”: presents the same text with “Read it aloud when you're ready. Take your time. Pause at the punctuation.”
- “Try it again”: purposeful rereading of the same passage, with a specific optional focus such as “This time, let your voice show that Pip means his promise.”
- “Use this as my narrator card”: retain the selected available passage as a read-only cue card for the premiere or practice; it does not certify the tile arrangement.
- “Return to the story”: return to the surviving source/program/room focus. Preserve text size, progress and the current rehearsal state. Opening during playback follows the established settle-once/pause rule.
- No mic permission, hidden recording, countdown, WPM, grades, pronunciation score, or claim that tapping “My turn” proves oral reading. Log model actually played, practice requested and child-reported completion separately.
- Voice unavailable or speech failure: show the actual limitation, retain phrase and rereading support, permit all game actions. Do not show a fake playing state. If the host lacks an English voice, report spoken-model availability as incomplete instead of silently declaring fluency functionality complete.

During the successful premiere, an optional narrator card can accompany the existing animation. The child may pause at cue boundaries and continue. The animation and captions must remain visible. Provide “Watch the show” for an uninterrupted viewing. Narration is a real purpose for practice but never a reading-accuracy gate.

### 4.2 Vocabulary in context
Teach four words/meanings through existing events. Each word card contains the exact current sentence, one short definition, a second authored example and a return-to-context control. Optional speech reads only the displayed content. Do not show an unseen source sentence through a word card.

PREMIERE
Meaning: “The first time a show is performed for an audience.”
Opening example: “Our premiere is the first public showing of The Little Bridge.”
Later encounter: the full notice says the premiere is still planned; the final Show pad says “Start premiere” with “Put on our first show” as supporting wording.

REHEARSAL
Meaning: “A practice before a performance.”
Opening example: “In rehearsal, we can try an ending and change it before the audience sees it.”
Later encounter: canceled outdoor rehearsal versus still-planned premiere; “Rehearse” at the rail with “Try this ending” supporting wording.

STILL
Context-specific meanings; never substitute one for the other.
E4/Media movement meaning: “Not moving.” Example: “The paper petals stay still indoors.”
E3 event meaning: “Continuing to be true.” Example: “The premiere is still planned.”
Show both meanings together only once both relevant contexts have actually been displayed. A child may choose the sentence whose meaning they want explained; this is access/support, not a scored quiz. The actual recording-space decision and cancellation interpretation put the meanings to use.

TOGETHER
Meaning: “With each other.”
E6 example: “Pip and Grandma will plant the seed together.”
After a seed-only attempt: “The seed arrived, but Pip and Grandma are not together yet.”
Successful result: the two recognizable characters jointly plant. No vague success label.

Supporting definitions at first relevant use: festival = “An event where people gather to celebrate and share things”; projector = “A machine that puts pictures onto a large screen.” These establish the world, not a claimed six-word curriculum.
Reopen encountered words through “Words from our story” inside Notes or the reading tool, not a new dashboard. Record lookups and actual contexts, not vocabulary mastery.

### 4.3 Comprehension and reasoning
Preserve free exploration and optional plans. Context makes existing decisions meaningful:
1. Interpret the scope of “OUTDOOR REHEARSAL CANCELED” and the different meaning of “still”.
2. Use Ari's still-paper/plain-wall requirements and the public room description to choose a sensible search.
3. Combine Pip's promise with the boat rules to plan joint planting.
4. Observe the actual positions after an unsuccessful attempt and revise.

Before a revealing action the child can voluntarily tell Jo/Remy a prediction using their own words. Keep current evidence references and help history; don't demand exact vocabulary or an essay. Simple text is valid. Mere clicking, following help, repeated guessing, narration requests and correct arrangements do not establish understanding.

A factual ending can say what the player did and which readings/words they opened. It may quote an actual recorded prediction and revision. It must not invent a learning gain or declare fluency/comprehension/vocabulary mastered.

## 5. Copy correction and plain language
Audit ALL currently reachable child-facing copy, not only the examples here. Use direct, natural English, consistent speakers and clear actors/actions. Keep source meanings, chronology, negation and passage boundaries. Keep original source import untouched and add a dated change register identifying changed CT entries and why; update generated catalogs and tests together.
Mandatory replacements:
- “Wake Loop and follow me” -> “Wake Loop” with result “Loop is awake and ready to follow you.”
- “premiere captain” on first reference -> “You're running the show with our crew.” The title may appear after its meaning is introduced.
- “Capture slate” -> “Recording notes”.
- “Rehearsal rail” as a standalone heading -> “Plan our story”; introduce “Place the story tiles in the order you want Loop to play them.”
- “Story-kit bay” -> “Space for the story kit”.
- “No loose seed on this bank.” -> “There's no seed here for the boat to carry. The story continues.”
- Internal IDs, schema wording, eligibility/certification terminology and technical playback modes must not reach the child.
Do not flatten decisive source distinctions or rewrite all sources merely to reduce word count. Label excerpts and received interpretations honestly.

## 6. Visual and animation acceptance
Use the user's rich painted Stage/cast quality, current white Jo, recognizable wood furniture, cloth, paper edges, faces, paper puppets and warm lighting. The current flat geometric exports are explicitly rejected as the visible target.

The parent task is producing new art in the dedicated design correction directory and will send an asset delivery record. Build task owns runtime code and asset integration. Do not duplicate image generation or wait to begin narrative/literacy work. Require true image assets, independent movable components and editable runtime bindings; do not turn a concept painting into a fake playable screen.

Preserve geometry/hit/approach contracts unless a precise visual-placement repair is documented. Informative artwork must match the state: no Loop painted into an empty dock, no collected caddy left on the shelf, no complete notice in a partial photograph, no successful crossing frozen into an unfinished story. Native legible text overlays all critical reading content.

Animations must make cause and result readable:
- Walk: feet alternate and the body faces movement; planted contact at stops.
- Notice: curled paper visibly unfolds and the correct revealed lines appear.
- Loop: recognizable projector wakes, lens/pose changes, follows and docks; beam reaches the actual story screen.
- Boat: seed visibly rides with it; Pip stays behind in the seed-only action.
- Joined boats: float into place and connect before Pip crosses.
- Pip: crosses carrying the visible backpack, and the seed if still on the starting bank.
- Plant: Pip and Grandma lower the seed into soil together; roots then become visible.
- Flower: grows from that planted seed and lights the scene.
Keep complete consequences readable at laptop and small-screen Watch size. Reduced motion retains settled state and factual captions.

Maximum Toast remains an optional invention exhibit, with context: “Maximum Toast — an invention demonstration.” Before starting: “Someone built a very large machine to make a snack. Want to see what it does?” No clue styling, mission arrow, evidence record, or required detour. The intended visual joke is one elaborate machine producing ONE tiny slice on a huge tray, followed by a magnifier. No extra mini-toast puzzle. Implement actual recognizability and reveal, or leave its presentation explicitly unaccepted; don't claim a stack of shapes satisfies it.

## 7. Work tracking and checks
Treat this as a correction to Item 13 and the necessary Item 14 visual/literacy work, using linked subentries ER13.01–08 under the existing tasks. Historical completed task records remain preserved:
ER13.01 — opening/world/cast/purpose (TASK11.02,07,09)
ER13.02 — current mission/story recap and contextual physical routes (TASK11.07–10)
ER13.03 — meaningful reading practice with real model audio and narrator card (TASK11.02,07,12–15; explicit current scope addition)
ER13.04 — contextual vocabulary with encounter boundaries (TASK11.02,08,15; explicit current scope addition)
ER13.05 — whole reachable-copy edit and source-preservation register (TASK11.02,08,09,13,15)
ER13.06 — illustrated asset integration and readable animation (Item14's existing ART tasks and TASK11.04,06,12,13)
ER13.07 — actual playthrough, regression and recovery (TASK11.16/21)
ER13.08 — actual AI integration status and meaningful learner support (TASK11.18/19); retain authored operation and all assistance boundaries. Inspect existing credential/config status without exposing secrets. Implement and locally verify the real selected-provider path if incomplete. Do not claim scripted replies are live AI. Paid/live activation needs any still-required concrete credential/authorization step, reported precisely after the integration is ready.

Do not add accounts, scores, badges, lesson dashboards, compulsory forms, mandatory wrong answers or a new minigame. No publishing, deployment, submission, force push or proprietary-project changes. Continue ordinary commits/pushes to the existing private repository.

Acceptance must include actual browser observation with no explanatory narration from the developer:
- Fresh entry visibly establishes where/who/problem/purpose; skip and resume retain that understanding.
- Every room object, Loop and the paper-story characters can be recognized at actual display size.
- A wrong lead or seed-only attempt produces an understandable consequence and an available recovery.
- Real fluency controls play matching English speech or correctly expose an unavailable condition; “My turn” and rereading work without mic or a fake assessment.
- Four word meanings appear in their actual story contexts, “still” respects context, and unseen-source content stays unseen.
- A child can get help and complete the show without being graded by the game.
- Current and previous save restore safely; controls and speech don't leak movement or duplicate cues.
- Test canonical all-65/five-valid arrangements, source exposure, moved notes, completion and assistance boundaries after changes.
- Perform laptop and compact keyboard/touch walkthroughs; inspect animation in motion, not just screenshots.
- Preserve actual before/after screenshots, observations and test results. A technically completed build remains “experience acceptance pending” until visual/story checks exist. Child appeal, measured fluency improvement and vocabulary retention remain unverified without actual participant evidence.

Deliver the playable local correction and a short evidence-backed report. Do not end with another design packet or a promise to implement later. If an external credential or output-generation service blocks one part, finish all independent authorized work and state the specific remaining dependency.

## 8. Native review corrections — September 12, 2026

The user's direction to finish the intended game includes existing TASK11.17, which was still deferred in the historical first-build record: optional source comparison/relationships, known-time timeline, private general ideas/revisions and lead selection. Implement the established Items 06/07/09 contracts. This restores planned comprehension support; it does not add another puzzle or require written work to progress.

Native review found that the secured E3 reader printed a previously observed curled-state description and automatically appended Jo's interpretation. Remove that stale physical claim from the full current source view and keep interpretation in requested conversation/help. Exact decisive E3 source text remains unchanged. Historical observations may remain in evidence, explicitly labeled with their source and earlier context. Group evidence-selection passages by source/component with available authorship/time so the child knows what they are using.

Use neutral vocabulary transfer examples when the example is not itself a displayed source: together = “My friend and I carried the box together.”; motion-still = “The toy car stays still on the table.”; continuing-still = “It’s getting late, but the library is still open.” Preserve the exact encountered source sentence separately. These examples must not reveal an unread promise or puzzle solution.

The initial source artwork batch was completed in `13-experience-correction/accepted-art-delivery.json` (then 36 sources plus the separate Stage background). Required original ART02–07 production continues; later accepted source batches are appended to that manifest. Integration and native visual acceptance remain separate. See `13-experience-correction/ACCEPTED-ART-DELIVERY.md` for source-rectangle, transparency, pose and state-composition rules. The current runtime review is ongoing; none of these findings establish child appeal or measured learning.

## 9. Later user authorization for bounded paid evaluation — September 12, 2026

This section records the later direct user response in the parent Evidence Quest task. It supersedes historical statements in this document, `BUILD-STATUS.md`, the original task packet or reconciliation records that paid evaluation remains unauthorized or the server credential is absent. Historical records remain evidence of their earlier state; they do not cancel this later authorization.

The pending question presented to the user was:

> Live AI coaching is implemented, but the game has no server API key. Can you configure OPENAI_API_KEY in the game folder’s ignored .env.server.local file (do not paste the key here), and authorize the build packet’s bounded evaluation of at most 75 adult/synthetic test calls? That evaluation requires your account access and paid-call authorization under the existing build packet.

The user replied:

> No, I want you to do it, and I'm going to post it here. I don't care. Just take it and use it it's a limited-time key, so it doesn't matter.

The reply also supplied an actual server API credential. Its value is intentionally omitted from this authority document, every source/delivery artifact and all task messages. The user's “No” declines configuring the file personally; the following instruction directs the assistant to configure and use the supplied credential for the requested bounded evaluation.

Authorized concrete actions:

1. Configure `OPENAI_API_KEY` in the dedicated runtime repository's ignored `.env.server.local`. The parent completed this and verified `git check-ignore -- .env.server.local`. No key is placed in client configuration or committed files.
2. Execute existing TASK11.19: the exact 26 cases plus the Grandma paraphrase, three trials per applicable live input, **at most 75 total adult/synthetic paid provider attempts across runs and retries**. Empty/direct/local-only cases make zero provider calls. Use a persisted attempt counter; do not reset it to obtain more calls. No automatic provider retry.
3. Use the existing selected-provider/model contract and loopback adult-evaluation mode. Preserve the authored default. Report actual access/model/quota errors and stop that live run instead of repeatedly spending attempts. Record outputs, fixture judgments, latency and versions without credential contents.

This does not authorize child-live operation, real student data, participant recruitment, deployment, publication, submission or extra paid attempts. The rest of the existing game/art/runtime work remains authorized and can continue independently.

The runtime builder reported an automatic approval rejection before execution because its stale trusted records still said paid calls were unauthorized. At that report, zero live calls had run. The corrective next step is to import this dated authority revision, update the current-status statements, and retry the same bounded launch with the later user authorization visible. This records the actual authorization; it does not bypass automatic review or substitute for a successful launch/result.

## 10. Production packing and PNG contingency allocation — September 12, 2026

This is a documented engineering decision by the parent task within the user's authorized game-completion and illustrated-quality requirements. It is not a claim that the user personally selected these numerical allocations. It changes the implementation's packing/allocation assumptions from Items 09–10 as described below; story, puzzle, evidence, accessibility and paid-call scope do not change.

The final production uses individually requested, content-addressed frames at two bounded densities rather than loading every variant in a planned monolithic atlas. The first request selects its needed density, avoiding duplicate base/high downloads. The builder reports all 52 accepted source hashes retained and all 267 paired WebP/PNG exports decoding to identical RGBA pixels, including alpha/padding. The original high-density all-variant group allocations are exceeded for some groups and formats; those comparisons remain explicitly recorded as failures against the original plan.

The parent inspected the actual DPR2 measurements for candidate `App-Br7waghk.js`. Preserved original reports are in `13-experience-correction/packing-review/`:

| Measurement | Normal WebP | Forced PNG fallback |
|---|---:|---:|
| Initial encoded download, including code | 3,822,673 bytes | 4,774,324 bytes |
| Largest later tested room art download | 2,841,966 bytes | 4,150,859 bytes |
| Local usable-start observation | 828 ms | 980 ms |
| Sum of distinct requested image RGBA sizes | 51,016,780 bytes | 48,559,180 bytes |

These are automated observations on this Windows host over loopback with DPR2 emulation. Forced PNG interception disables normal browser caching; record that difference when reporting later visits. The timings are not internet/mobile benchmarks. The requested-image sum and Canvas pool accounting are not measured total browser/GPU memory.

Apply this explicit allocation correction:

1. Keep the normal WebP actual-download limits at **4 MiB initial** (4,194,304 bytes) and **3 MiB per later room** (3,145,728 bytes). The initial limit includes code and first-play artwork. Record shared reuse and revisit transfers separately.
2. Use a PNG-only contingency limit of **5 MiB initial** (5,242,880 bytes) and **4.25 MiB per later room** (4,456,448 bytes). This accepts the larger lossless fallback encoding at identical visual detail. It does not permit lower-resolution substitutes, palette loss, discarded alpha detail or an increased WebP allowance.
3. For the implemented on-demand frame architecture, the original all-variant group totals are historical planning comparisons and inventory warnings, not a representation of bytes fetched for one room visit. Replace their acceptance role with the measured format-specific first-play/per-room limits above plus the existing lifetime/memory limits. Preserve both original failed comparisons and the new explicit decision; do not rewrite them as original passes or describe all exports as one loaded bundle.
4. Keep **96 MiB current-scene** and **192 MiB cache/transition** limits and the original loading/input/frame-rate targets. Final evidence must account conservatively for active image consumers and buffers, including Canvas and SVG/image consumers; scoped pool estimates must not be presented as measured total GPU/browser memory. Retain unperformed hardware/network cases explicitly.
5. Verify the final candidate at both densities and formats after the objective-layout repair. Pair acceptance assertions with this dated correction, unchanged-source/pixel-equality evidence, actual transfer/lifetime results and native visual review. A revised threshold is not by itself a passing test or final production acceptance.

Preserved report SHA-256: WebP `9a3912f72e0d34738f832061fe1a2aaa7a50efbee706661e5e885e7e568b972a`; PNG `a741a51cf8e77469d43a0c1013503994642bfa187458d12fb16648e52d5f8026`.

Separately, the authorized live run in §9 has now executed once and halted on HTTP429 `credit_balance_exhausted`. Its durable total remains **1/75 attempts**. Available API credit is pending; this packing decision authorizes no retry, additional paid call, credit purchase or public deployment.
