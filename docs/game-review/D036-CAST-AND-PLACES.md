# D036: the demo's cast and playable places

Revision 2, September 13, 2026. Tony replied "That sounds good" to the cast/location walkthrough and explicit proposal to leave the remaining studio characters, separate room routes, and Maximum Toast outside the demo's playable flow. The shown six-character roles, four places, connected adventure, and exclusions are agreed. Subsequent D037 revision 2 accepts the shown object roles and closes R08 at design scope. Exact dimensions, geometry, full cues/controls, source mapping, and art remain with the later topics. This record removes no asset and changes no runtime or imported authority.

## Agreed cast and place scope

The game needs a legible cast and a connected place for the child to act. D022 already selects Loop ready, a brief studio introduction, the garden adventure as the main gameplay, and a studio ending presentation. D036 now settles the remaining crew and room disposition: one studio scene for entry and presentation, plus one connected garden adventure with three distinct areas. Keep Jo and Loop as the studio's interactive cast. Leave Remy, Ari, Maximum Toast, and the separate studio Courtyard/Workshop/Media routes outside this bounded demo's playable flow.

This exclusion is now explicitly agreed through Tony's response to the cast/location proposal; it was not inferred from the earlier garden approvals. It is not a content deletion or a new credits/background-NPC feature. Existing assets, originals, saved states, and provenance remain intact during review. Later implementation needs a coordinated amendment to old room/source/task assumptions and appropriate save handling.

## Existing baseline reviewed

Read-only source inspection on September 13, 2026; no fresh browser playthrough or new visual-quality claim:

- [The current experience authority](../design/evidence-quest-design-v3/13-EXPERIENCE-AND-LITERACY-CORRECTION.md), sections 1-3, establishes Jo as story writer, Remy as model maker, Ari as animation maker, and Loop as rolling projector. It still describes the equipment-recovery route that D022 supersedes in the proposed demo.
- The same authority names the Stage performance space, Courtyard outdoor practice space, Workshop models/inventions space, and Media indoor recording room. Its Maximum Toast section describes an optional invention joke, not a required clue or puzzle.
- [Current authored content](../../content/authored.json) retains room descriptions, equipment return/docking instructions, and Maximum Toast controls. Those observations do not imply this design review has changed any of them.
- [D022](D022-STUDIO-AND-PIPS-ADVENTURE.md) explicitly leaves the remaining crew/room use for this R08 decision. [D018](D018-ROUTE-CROSSING-AND-TIME.md) already establishes the two riverbanks, separate passenger dock, garden, and nearby Sol workshop.

## Cast and why the child interacts with them

The following central roles are established by earlier story agreements and reaffirmed in the accepted R08 walkthrough. Use this as the active cast for the bounded demo, with no additional studio character visits.

| Character | Purpose | Child's concrete interaction | Story/reading connection |
|---|---|---|---|
| Pip | The traveler whose promise and actions connect the chapter | Guide him, carry actual story pages, plant with Grandma, communicate choices, and narrate supported moments | Connect instructions and accounts to physical and social consequences |
| Mara | Storyteller whose changed work hours prevent the usual visits | Read her account, take her page if offered/accepted, ask about attending/reading/listening, and deliver Grandma's story when applicable | Distinguish caring about the garden from being available; use obligation and timing information |
| Sol | Writer who doubts that his ordinary unfinished story matters | Read his manuscript, write/rehearse or select a supported ending, or help him bring the original draft; notify him of the actual time | Cause and effect, why details matter, revision and optional oral practice; original draft remains valid |
| Grandma | Garden host whose explanation of the quiet garden changes with actual information | Plant together, bring real reports and stories, arrange the gathering, hear her account, and choose Pip's moment | Distinguish an assumption from an established reason; connect the chapter's accounts |
| Jo | Studio story writer and host who explains the child's director/narrator role | Begin the adventure and introduce its resulting ending presentation | Give a clear reason to read, direct, and narrate; reuse D022/D033's existing text |
| Loop | The studio projector connecting the paper story to its presentation | Enter the projected adventure and watch/narrate the resulting ending through the already-agreed controls | Make the story/presentation frame visible; Loop begins ready |

The child sometimes directs paper objects while Pip waits, as already agreed in D029-D033. That does not create a second traveling avatar or put Jo/Loop inside the garden. No character requires a new conversation just to demonstrate that they exist.

## Four places in the agreed playable flow

| Place | What the child does there | Why it belongs |
|---|---|---|
| One studio scene | Meet Jo with Loop ready, begin Pip's adventure, return to watch or narrate its actual ending | Clear entry and payoff for the director/narrator role |
| Riverbank and Mara's dock, including the garden-boat crossing area upstream | Meet Mara, read her account, work out the crossing, return for actual invitations or closing delivery | Connect the physical travel problem to the social reason for visiting; keep passenger boats separate from construction boats |
| Grandma's garden | Plant, share stories, inspect actual lantern contributions, plan and hold the gathering, choose Pip's remembered moment | Main destination, visible progress, and story resolution |
| Sol's workshop beside the garden | Read/work on his story, rehearse a chosen ending, and communicate gathering time | Give the writing activity a recognizable place and purpose |

The three adventure areas belong to one connected story location. This proposes no mandatory door/loading-screen division, new camera system, exact dimensions, or extra travel barriers. D018's two-bank relationship and short garden-to-workshop path remain. Sol's workshop is part of Pip's paper story and is distinct from the existing SparkFest Workshop room.

## Existing elements agreed outside the demo route

| Element | Existing role | Agreed disposition and reason |
|---|---|---|
| Remy | Studio model maker with an account in the equipment investigation | No required or optional visit in this demo route; the accepted garden crossing and story interactions carry the selected gameplay |
| Ari | Studio animation maker located through the equipment investigation | No visit or recording-room errand in the demo route; Loop-ready entry already removes that prerequisite |
| Separate studio Courtyard, Workshop, and Media routes | Outer exploration, equipment clues/materials, and exhibit space | Use one compact studio scene for entry/ending; devote playable navigation to the connected garden adventure |
| Maximum Toast | Optional invention exhibit and visual joke | Leave outside this demo's playable flow; its separate interaction does not currently connect to the agreed garden story |
| Old missing-Loop, carry/dock, and kit-recovery tasks | Original show-preparation prerequisites | D022 already retires these prerequisites; a later coordinated amendment must reconcile all associated instructions and gates |

Jo, the paper story, Loop, and the presentation setting can retain an appealing festival identity. This proposal does not require stripping away scenery, warmth, humor, or optional older garden stories. Nor does it add a new humor/exhibit task merely to replace Toast. Exact background composition and asset reuse remain R17.

Rina, the boy, his sister, and his grandmother belong to the stories told by Sol or Mara. They can appear in the supported illustrations/rehearsals, but do not become new people Pip must locate or invite. Passenger activity explains Mara's duty and supplies the accepted event transition; no passenger-management minigame is proposed.

## Next R08 review: the objects

The cast/place scope is agreed. [D037](D037-OBJECTS-ACTIONS-AND-RESPONSES.md) next proposes each relevant object's role, available actions, visible result, and distinction from background scenery. It covers the seed/backpack, original broken bridge, garden boats and bank attachments, passenger boat/dock, letter and story pages, Sol's manuscript/workbench, rooted lantern flowers and planting spot, gathering furnishings, and studio story/projector/display. Preserve all five successful physical arrangements while resolving exact geometry/input later.

Clear interaction cues and believable proportions must address Tony's original complaints. Do not assume everything visible is collectible or everything decorative must be removed. Exact remaining scripts, numerical scale, usable bounds, collisions, state/source ownership, dated authority amendment, and existing TASK11 mapping are still required before a build packet.

## Requirements from the demonstrated agreement

| Requirement | Agreed scope | Evaluation scenario |
|---|---|---|
| D036.REQ01 | Use Pip, Mara, Sol, Grandma, Jo, and Loop in the shown roles, preserving the distinction between the four story characters and the two studio figures | D036.AC01 |
| D036.REQ02 | Use one studio scene and the connected riverbank/dock, Grandma garden, and Sol-workshop areas, with the shown activities; distinguish Sol's workshop from the former studio Workshop | D036.AC02 |
| D036.REQ03 | Leave Remy, Ari, Maximum Toast, and separate studio Courtyard/Workshop/Media routes outside this demo's playable flow; preserve the Loop-ready entry and ending presentation | D036.AC03 |

| Scenario | What the eventual demo must demonstrate | Current evidence |
|---|---|---|
| D036.AC01 | Enter with Jo/Loop and play the four story-character roles; each has the agreed purpose and actual interactions without conflating studio and story-world knowledge or location | NOT_RUN; cast/source/input/visual mapping pending |
| D036.AC02 | Travel the connected story areas and return to the studio ending; each location supports its agreed activities, with Sol's workshop beside the garden and passenger boats distinct from crossing boats | NOT_RUN; exact geometry/scene/asset mapping pending |
| D036.AC03 | Complete a fresh demo without excluded character/exhibit visits or old studio-room/resource prerequisites; keep the opening, guidance, sources, and completion coherent with the agreed scope | NOT_RUN; dated authority/task amendment and old-save handling pending |

File-only presentation/input details have not been promoted to agreement. Subsequent D037 revision 2 and [the R08 consolidation](R08-CAST-PLACES-AND-OBJECTS.md) record the now-agreed object purposes and shown behavior while retaining their explicit technical dependencies. Agreement AGREED_CAST_AND_PLACE_SCOPE; specification COMPILED_DIRECTION for D036.REQ01-03; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN.

| Revision | Change | Agreement evidence |
|---|---|---|
| 1 | Proposed the central cast, four places, and remaining studio exclusions | Pending at the time |
| 2 | Accepted the shown cast/location scope and exclusions; continued R08 with objects | Tony: "That sounds good" after the explicit cast/location question |
