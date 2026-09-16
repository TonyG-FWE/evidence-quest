# R17: Coherent storybook visuals, animation and sound

Specification revision 1, September 14, 2026. SPECIFIED_DERIVED from D022, D028-D037, D042-D048 and D080. The chosen presentation direction is a fixed-camera 3D paper-story set with illustrated surfaces, consistent physical scale, expressive characters and readable actions. The first playable encounter still requires D028's actual visual/play review before full presentation commitment.

## Visual reference and proportions

Use warm natural garden colors, distinguishable paper/wood/water materials, restrained paper edges and soft directional light. Characters and useful props need finished silhouettes, faces and readable poses at gameplay size. The visible result must meet the illustrated-quality goal; primitive boxes/capsules are collision/debug references only and cannot be accepted as final art.

Use Pip height=1 as the scale anchor. Initial derived references: Grandma 1.08, Mara 1.20, Sol 1.25, Jo 1.20 and Loop 0.42; adult furniture must fit the adult cast, with sitting/standing reach aligned to it. Backpack width about 0.36 and page height about 0.30 make them believable carried objects. Doorways have clear headroom above the tallest actor; boat/deck dimensions come from R15. Final adjustments must change a consistent master/reference, never rescale objects opportunistically to make an interaction pass.

The cast is Pip, Grandma, Mara and Sol in the adventure, with Jo and Loop in the studio. Rina, the boy and other story figures appear only in their authored story illustrations/rehearsals. The older unrelated runtime cast is not silently substituted for the new story roles. Existing original assets remain preserved; reuse requires a matching role, scale, style and actual visual review.

The starting river view must reveal the broken route, dock, available garden boats and both bank shapes. The camera is elevated and fixed in orientation; it may fit the scene or use short authored transitions between the river, garden, workshop and studio. No free orbit, jumping platform challenge or camera-control tutorial is required. Foreground scenery must not obscure Pip, attachment targets or the active action.

## Owned animations and sound

| Action | Required visible sequence | Sound / accessible equivalent |
|---|---|---|
| Walking/approach | Feet remain on the actual walkable ground/deck; carried items follow their owner; stop at a reachable interaction pose | Optional quiet footsteps; named destination/action and state description |
| Director placement | The selected same-size piece lifts slightly, follows the preview plane and settles at the committed location | Restrained paper movement; selected/placed state visible |
| Join / fasten | Distinct A/B hulls remain; meeting decks/connector and each bank rope visibly join | Short paper/rope cue; named joined/fastened state, never color alone |
| Seed ferry | One visible seed rides A, reaches Grandma's hand, then leaves A empty; Pip/page stay put | Water/paper cue; exact seed-arrival caption |
| Plant then bloom | Actual owner passes the seed into the soil with both characters; roots appear; flower opens and lights the banks from the rooted location | Optional rustle/chime; separate planted/open states and captions |
| Page handoff | Owner presents the actual page and receiver takes it once | Paper cue; inventory and factual record update at the same stable boundary |
| Story rehearsal | Roof repair/baking/thanks are composed from the selected permitted scene(s), with rain continuing where established | Narration/text matching the unchanged child's selected draft or source |
| Gathering | Actual invited people travel/arrive in the permitted time state, then the selected storyteller speaks/listens; no absent character inserted | Speaker label/subtitles; optional voice stops during child capture |
| Lantern contribution | Existing rooted flower gains actual title/author/page and selected supported image; older stories remain | Small light change; text/title change conveys the same event |
| Ending | Four actual-outcome pictures and corresponding paragraphs; no replay of world transactions | Prepared narration or voluntary child narration; silence retains full text |

Movement durations are implementation tuning, initially 0.2-0.5 seconds for UI/placement responses and roughly 0.8-1.4 seconds for short paper actions. Travel duration follows distance and a stable walking speed. These are derived targets, not reasons to skip or duplicate a state transaction. Reduced motion settles the same endpoint and presents its description. Pause/cancel follows the coordinator's action lifecycle.

Authored source/model narration should be prepared and reviewed for natural English pronunciation, consistent speaker identity and exact text. Current child-written text uses the actual current words in its requested speech path. Detect unavailable output and use D046's honest notice; never play another sentence as its model. Do not clone a real person's voice or add a voice-production feature.

## Renderer decision for the trial

Use Three.js WebGLRenderer as the bounded 3D view within the existing React/TypeScript app, with an orthographic camera and DOM reading/control surfaces. Retain the existing immutable store, serialized coordinator, Node service and IndexedDB principles. The renderer consumes state and animation descriptors; it owns no story decisions, progression or independent physics truth. Use ray picking only to identify candidates; the coordinator validates the resulting command.

Current official documentation supports this renderer and its animation/sizing methods. The selected approach is an implementation inference chosen to keep the existing app structure while testing the agreed 3D view. [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html). Context7's official repository examples also cover orthographic projection, ray picking, responsive buffers and explicit resource disposal. Pin an exact compatible stable dependency and reviewed lockfile during implementation; none is installed by this specification.

Share loaded models/materials and explicitly release GPU resources and listeners on view teardown. Keep one renderer and one authoritative simulation. Camera fit changes projection, never object dimensions. Retain actual density/transfer/cadence measurements and original performance limits; a lower-detail fallback does not certify the high-quality target. A WebGL loss pauses the activity, keeps its durable state and offers **Restore view** or return; it does not falsely complete an action.

This is a dated proposed stack amendment to Item 09's Canvas2D-only presentation for the 3D trial. It is recorded in the handoff; the original authority and old renderer are unchanged in this review. D028 requires the actual encounter review before expanding this presentation throughout the adventure.

## Acceptance

| ID | Required demonstration |
|---|---|
| D081.R17.AC01 | First playable river encounter has readable goal, consistent scale, recognizable characters/objects, real interaction and correct story consequence; Tony's visual/play review recorded separately |
| D081.R17.AC02 | Required animations depict the same owned from/to state under normal, paused, interrupted and reduced-motion cases |
| D081.R17.AC03 | Exact narration/models, voice exclusivity, silent alternatives and unavailable-audio paths match actual source/attempt targets |
| D081.R17.AC04 | Renderer teardown/context loss/resizing preserve state and release resources; performance reports use actual candidate/density evidence and unchanged limits |

All results NOT_RUN. No artwork or current runtime is newly accepted by the specification.
