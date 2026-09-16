# D028: one playable story and the 2D/3D question

Revision 4, September 13, 2026. AGREED_TO_TRY the fixed-camera 3D story-adventure direction by working through one concrete encounter together and evaluating a playable version before committing the whole story to it. Tony replied **"Okay, we can try that."** to the revision 3 recommendation. This selects the evaluation direction, not an unseen encounter design or a full game migration. R05 remains open; a specific engine and prototype implementation plan remain to be resolved.

## Current agreement and next encounter

| Requirement | Agreed direction | Evaluation |
|---|---|---|
| D028.REQ01 | Try a compact story adventure in a fixed-camera 3D world with direct character/object interaction, using the agreed story and literacy goals | D028.AC01 |
| D028.REQ02 | Work through one concrete encounter together, then judge a playable version before committing the whole story to the approach | D028.AC01-02 |
| D028.REQ03 | Judge the candidate by coherent scale/presentation, clear meaningful actions and feedback, useful reading, and lasting story consequences; current implementation/reuse is not the quality target | D028.AC02 |

D028.AC01: inspect the encounter's agreed description and bounded implementation plan for an explicit goal, passage, player actions, alternatives/consequences, and reading support. Current result: PARTIAL_DESIGN_REVIEW; Tony subsequently agreed the demonstrated [D029 encounter, revision 2](D029-FIRST-PLAYABLE-ENCOUNTER.md). The legal geometry, alternate-route and source/technical mapping, and bounded implementation plan remain open. This is not a playable or build-readiness pass.

D028.AC02: when the reviewed encounter is playable, evaluate its actual controls, coherent appearance, responsiveness, comprehension of next steps, and story consequences. Current result: NOT_RUN; no playable candidate or participant evidence exists. A single encounter is an evaluation checkpoint, not a reduction of the agreed one-story deliverable or a learning-gain claim.

The earlier recommendation and feedback below are retained as history. Statements that the candidate was unselected describe revisions 1-3 and are superseded by this scoped agreement. The three-minute-versus-total-playtime clarification remained unresolved by that reply.

Later workflow note, September 14, 2026: D080 directs routine decisions to be inferred from prior answers. Continue with D026's complete playable chapter and the separate three-minute recording direction; measure actual pacing without padding or compressing the chapter. This removes the earlier duration question as a blocker to specification work, without inventing a newly approved numeric playtime. The playable 3D evaluation checkpoint above remains required.

## Revision 3 recommendation, now agreed as a direction to try

Tony's latest response:

> I don't know what the best solution would be. I just know what we have now doesn't work.

Do not ask Tony to choose an engine or infer approval of a rebuild from this statement. The assistant should supply a concrete recommendation that can be judged by the resulting player experience.

The assistant's proposed candidate is a compact story adventure in a fixed-camera 3D diorama, using the agreed garden story and literacy goals. The child guides Pip, approaches characters, reads useful material, handles actual scene objects, attempts supported solutions, and sees persistent consequences. Reading remains clear and available with contextual word help; purposeful narration is retained. This is a design preference to investigate, not proof that 3D is cheaper, that it solves the game-design gaps, or that a particular engine has been selected.

The candidate addresses the requested experience through a small cohesive world, one consistent approach to scale and art, tangible object manipulation, and a camera that keeps the action readable. Object behavior still needs defined rules, feedback, and recovery. The game needs interesting story problems; movement, object dragging, and a 3D renderer do not establish that by themselves.

Before committing the complete chapter to this approach, the proposed evaluation is one representative playable encounter at enough visual finish to assess scale, interaction, and readability. First agree its concrete gameplay description with Tony. A subsequent prototype would need to show: a clear goal; useful information in an exact short passage; a meaningful player decision; an actual scene interaction; a comprehensible consequence and opportunity to revise; a visible story result; and connected reading support. The introductory crossing alone is not evidence of chapter-wide depth. The full agreed story remains the deliverable; this is a way to evaluate the candidate before expanding it.

No prototype has been built or authorized in this discussion, and no implementation instructions have been sent. The next product review concerns a concrete playable encounter, not another comparison of menu styles or a request that Tony resolve technical architecture.

## Latest feedback: the existing experience is not an acceptable foundation by default

Tony's assessment, September 13:

> Yeah, but the issue with what's currently built is it's garbage. I'll be straight-up honest with it. It serves no purpose and makes no sense. It's all over the place. The objects don't make sense. Their sizing is all over the place. They don't function properly. It's just a mess, and it doesn't look like a game or function like one in the slightest, besides using the arrows to walk up, down, left, or right. Aside from that, there's nothing worthwhile. It just doesn't make sense as a game. Not by today's standards.

Record this as Tony's current experience assessment, not as the result of a new agent browser audit. He identifies unclear purpose/coherence, inconsistent object scale and meaning, unreliable object behavior, inadequate presentation, and a lack of worthwhile gameplay beyond movement. Prior bounded scale/functional checks do not establish that the overall game meets his quality expectations.

The assistant's previous recommendation gave too much weight to reusing the current renderer and artwork without demonstrating their fitness for the intended experience. That reuse-first preference is withdrawn. Compare the work required to reach the desired game, including repair/rework and quality risk, against a replacement approach. Do not assume either that reuse is cheaper or that a rewrite is cheaper. Existing source/art may be reused only where it supports the agreed experience; neither preserving nor discarding it is the goal of this discussion.

Rebuilding the game world, its interaction layer, or its presentation is a legitimate option to discuss. The story and literacy agreements remain the product starting point; existing object layouts and behavior are not automatically the desired design. A fixed-camera 3D approach remains a candidate, not a selected answer or a promise of quality. Tony has not authorized deleting files, abandoning the repository, migrating engines, or sending instructions to the other agents by providing this feedback.

R05 now needs a concrete playable encounter that demonstrates a coherent scene with consistent scale, purposeful object interaction, a meaningful problem informed by reading, understandable feedback and recovery, and a lasting result. Its game quality cannot be inferred from a dropdown mockup, arrow-key movement, compilation, or isolated handler checks. The full selected story remains the scope; proving an encounter is a design checkpoint, not a decision to reduce the deliverable to that encounter.

## Tony's clarification and question

> Also, the demo only needs to be 3 minutes, but should be the one playable story. Would it be easier to do this in 3D? Since 3D allows different objects to interact versus a 2.5D

The unit of scope remains one complete playable story, consistent with D026. Do not add multiple chapters or a full commercial game's breadth. The three-minute demo statement is explicit. Its application to total playable duration versus presentation/video duration is awaiting Tony's answer to the focused question asked during this discussion. D006's earlier 20-30-minute playtime is historical context for that clarification, not justification for adding filler or silently overruling the latest message. Do not silently compress or remove agreed story content either.

## Current implementation checked locally

- `package.json` uses the existing React/TypeScript application and has no installed dedicated 3D engine or physics package.
- `src/world/World.tsx` uses CanvasRenderingContext2D and handles keys, pointer targeting, walking, and nearby interaction in the outer world.
- `src/ui/StoryCanvas.tsx` draws the paper story from playback state, exposes it as an image, and contains no direct player movement/object-manipulation handlers. The separate sequence interface supplies actions. This is a source-code observation, not a fresh browser playthrough.
- The current story presentation's limited direct interaction is an implementation choice, not an inherent limit of 2D or 2.5D. A different renderer alone would not supply the missing gameplay.

## Technical distinction

Both 2D and 3D game engines can provide object collision, movement, overlap detection, and simulated physics. Godot's official physics introduction documents corresponding 2D and 3D collision objects. The engine can help calculate contact and movement; game-specific rules such as picking up the seed, joining boats into a usable crossing, preserving page ownership, and planting together still need explicit implementation.

"2.5D" is not a single technical limitation. Unity's official overview includes both 3D geometry with an orthographic camera and 2D gameplay using 3D graphics under that label. A small 3D world seen through a fixed camera can retain an illustrated/diorama presentation while using actual 3D object geometry.

## Tradeoffs for this demo

| Need | Existing illustrated Canvas2D approach | Fixed-camera 3D in an appropriate engine |
|---|---|---|
| Walk, carry a page/seed, inspect objects, join at known positions | Feasible with game rules and current/custom interaction systems; retains existing rendering/art work | Also feasible; engine helps with scene placement and collisions, while game rules remain necessary |
| Height, rotation, stacking, or interaction around solid objects | Additional representations and special handling in this particular renderer | Geometry and engine collision systems can represent these relationships directly |
| Produce the current chapter from the current repository | Reuses existing art, application integration, and relevant movement/state code | Requires suitable 3D assets, a new world renderer, interaction integration, and renewed verification; a wholesale engine migration may also affect more of the application |
| Read pages, obtain word help, and narrate | Existing reading interface can support the game | Reading can remain in a clear interface alongside the world; it does not automatically become easier in 3D |

These are capability comparisons, not measured development-time estimates or evidence that the current art/rendering should be retained. Revision 2 requires the cost of reaching the intended quality to be considered, including repair and replacement. A 3D engine can simplify some spatial work; a capable 2D engine can supply physics too. The relevant choice includes available tooling, the actual mechanics, suitable art, and integration work, not dimensionality alone.

## Direction for further discussion

For the currently described ground-level movement, carrying, and known object connections, both 2D and 3D remain technically possible. Reassess the game world and interaction design from the agreed story and desired experience, with no preference based solely on the current implementation. A fixed-camera 3D world is worth serious comparison for tangible object manipulation and consistent spatial relationships. The fixed camera could keep attention on the story and reduce the need to learn camera controls. It still requires a defined challenge and a cohesive visual design.

R05 still needs a complete playable challenge; D027's dropdown comparison and introductory crossing do not establish its depth. This assessment neither approves a 3D prototype nor instructs another agent to migrate the game. The existing stack remains the implementation authority until an explicit choice and mapped amendment are made.

## Sources checked September 13, 2026

- [Godot: Physics introduction](https://docs.godotengine.org/en/stable/tutorials/physics/physics_introduction.html): 2D/3D collision bodies, automatic rigid-body behavior, and explicitly programmed character response.
- [Godot: Using CharacterBody2D/3D](https://docs.godotengine.org/en/stable/tutorials/physics/using_character_body_2d.html): movement/collision methods and custom behavior; also retrieved through Context7's stable documentation collection.
- [Unity: 2D and 3D projects](https://docs.unity3d.com/Manual/2Dor3D.html): orthographic 3D and 2D gameplay with 3D graphics, both sometimes described as 2.5D.

Evaluation direction AGREED_TO_TRY; specification COMPILED_DIRECTION for D028.REQ01-03 only; encounter D029 DRAFT; specific engine/technical amendment and playable-duration clarification PENDING; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN. No runtime/source-authority edit, provider call, asset production, commit, or agent message occurs.
