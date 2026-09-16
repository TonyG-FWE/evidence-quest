# R15: Controls, physical actions and the seed-first route

Specification revision 1, September 14, 2026. SPECIFIED_DERIVED from D018, D023-D037 and D075-D080. Preserve the original two physical boat instances and FERRY/BRIDGE/PLANT/BLOOM outcomes in Item 05 section 8.6 and Item 09 section 5. Numeric geometry below is a derived trial reference, not approved final art.

## Input ownership

Only the active mode handles input. Walking keys are ignored while text fields, dialogs, reading or director placement have focus. Clear held keys on blur, focus change, mode change and page hiding. Pointer release/cancel cannot leave an item attached to the pointer. A UI action and its keyboard equivalent dispatch the same domain command.

| Mode/action | Pointer | Keyboard/access equivalent | Visible result / cancellation |
|---|---|---|---|
| Guide Pip | Click walkable ground to walk along the valid route; a later destination replaces the earlier one | WASD/arrows; release stops; accessible Nearby actions can approach a named known target through the same path | No open-water walking or teleport. Selecting an unreachable destination shows **Pip can't reach that place from here.** |
| Talk/inspect/use | Target highlight and named action; clicking approaches, then shows the action when within reach | E activates the currently named nearby action; Tab/Enter through native Nearby actions | No action at a distance. Escape cancels walking/targeting; story effects occur only on the actual accepted action. |
| Read/help | Native source/word/phrase buttons | Tab/Enter; normal text navigation and scrolling | Close/Back restores source position, mode and focus target; does not replay a handoff. |
| Backpack | Backpack control | I outside a text field, or native button | Actual possessions only; Close restores the world. Inventory selection does not create or remotely deliver an item. |
| Arrange boats | Explicit Arrange boats action; Pip waits on a safe bank | Same native action; focus moves to boat controls | Director role is named: **Arrange the paper boats while Pip waits.** No other character or scenery becomes movable. |
| Move a boat/group | Select, drag on the water/placement plane, release to place | Select boat; Move left/right/up/down buttons or arrows in placement mode; Enter places | Preview only until a legal placement commits. Escape restores the previous committed transform. No scaling. |
| Rotate/join | Rotate left/right; Join boats when connectors meet | Native buttons; rotation in 90-degree steps; movement in 0.1-unit steps | A nearby connector may snap within 0.15 units; no automatic move to the narrow crossing. Joined objects retain distinct IDs. |
| Fasten | Select the loose end; Fasten this end | Equivalent native end/post actions | Only a physically reaching deck end can fasten. Rope appearance changes; a rope cannot make a water gap walkable. |
| Return to Pip | Back to Pip | Escape after canceling an active held placement, or native button | Keeps committed assembly and possessions. Pip has not crossed merely because the crossing is ready. |
| Plant/share/invite | Named contextual action at the actor/object | Same semantic native action | Atomic story transaction with actual resource/source predicates. Repeat is idempotent and reports the current result. |
| Pause | Pause control | Escape from ordinary walking, after closing any transient layer | Stops movement/audio/capture; preserves stable story state. Continue returns to the same activity without starting capture. |

Escape closes one layer at a time. It never discards saved writing or resets the adventure. Back/Discard meanings are explicit for temporary recordings under R10. Accessible navigation exposes actual destinations/actions and their availability, not hidden story answers.

## Geometry for the bounded 3D trial

Use a ground-plane coordinate system: x crosses the river, z runs upstream, y is height. Pip's standing height is 1 unit; foot collision radius is 0.18. Two boats, A and B, have constant 1.55-unit deck extent across x in the crossing orientation, 1.7-unit hull length along z and at least 1.1 units of clear walking depth. Their joined cross-river extent is 3.10 units.

The narrow water gap is 2.80 units at z=3, with banks x=-1.40/+1.40. The wide gap is 4.40 units near z=-2. A centered narrow bridge overlaps each bank by 0.15 units; the wide gap cannot be bridged by the same group. Rounded bank geometry between these segments must preserve continuous bank paths, not create a third accidental crossing. Every real deck-to-bank water gap blocks crossing; a gap of 0.10 units is the minimum clearly visible failure example for the trial, not a permission to step across smaller gaps. Attachment tolerance cannot compensate for missing overlap.

Place two bank posts at each demonstrated candidate area, clear of the walking corridor. Fastening requires the correct endpoint/post proximity and deck-bank overlap. Decorative ropes may extend to a post, but only the deck contributes walkable geometry. Ray targets and nonvisual actions reference the same connector/anchor IDs.

Place the passenger dock downstream around (-3,-5), Pip's arrival on the west bank near (-3,-2), garden around (4,4), and workshop around (6,1). These are initial layout coordinates within the same connected world, adjustable during the trial without changing the wide/narrow relation, route ownership or object proportions. Garden/workshop need no second river crossing. Passenger boats stay downstream and cannot be borrowed as construction pieces.

## Two boats, one seed, no invented replacement

Initially A and B are separate on the starting-bank side. The seed is in Pip's backpack. A seed ferry moves that same seed to Grandma's hand using A; Pip and his carried page remain on the starting bank. Commit the transfer once at the depicted arrival. Show D018's exact **The seed has reached Grandma. Pip still needs to cross so they can plant it together.**

A now remains empty at the garden-bank mooring. In Arrange boats the director can select and move that same A back toward B or place the two together across the narrow gap. This is the existing permission to handle paper-story pieces beyond Pip's reach; it is not a new ride, remote Pip action, third boat or duplicate seed. Keyboard Move controls permit the same return. Grandma retains the seed while the empty boat moves.

BRIDGE in the legacy outcome mapping corresponds to actual assembly, two fastenings, Back to Pip and physical walking to the far bank. If the seed is still carried it travels with Pip; if Grandma has it, it stays there. Returning over the completed route is a distinct walking action, not replaying BRIDGE or creating another first-crossing event.

Before first use, **Adjust crossing** may release its attachments when no actor occupies it; move the same group and refasten. Moving an endpoint visibly clears that end's fastening. After the first crossing, retain the crossing as the agreed permanent route: display **The crossing is ready for everyone to use.** Later experiments with the empty ferry cannot detach its deck or strand an actor. Existing source/read/help actions remain available.

If FERRY is requested when the seed is with Grandma or planted, retain the exact original **No loose seed on this bank.** An empty separate boat bobs where it actually is; a joined boat's hull makes a small contained bob while the continuous deck stays fixed. Nothing uproots, reverses, detaches or spawns.

PLANT requires Pip and the actual seed at Grandma's planting place. Planting consumes the carried/held seed into the rooted state once. BLOOM opens that rooted flower and lights the scene; it does not record a story in it. Normal presentation may continue from planting to growth, but the coordinator retains separate stable PLANT and BLOOM steps. Inspection/Stop settles only the current step and pauses before the next, preserving the original ability to perform a harmless FERRY between them and then Continue. That pause is optional, not a new gardening task or required wait.

The five original successful histories remain equal: B-P-L; F-B-P-L; B-F-P-L; B-P-F-L; B-P-L-F, where B=BRIDGE, P=PLANT and L=BLOOM. A trailing F must actually finish before a full recorded run is finalized. Retain all 65 original legal cue-order regression cases in the underlying engine; new direct interaction adds its connected physical predicates instead of replacing those cases with a whitelist. No route gains a higher reward for fewer actions.

## Action lifecycle and persistence

Walking can stop at its current safe walkable position, including on the fixed bridge. A completed committed placement is saved; a held preview is not. FERRY/PLANT/BLOOM use one stable from/to transaction and a unique action ID. Opening Help, leaving or reduced-motion skip settles an already-started transaction once and pauses further queued work. A hard interruption restores the last durable stable boundary and reports any replay uncertainty; it never guesses an unacknowledged seed transfer.

Every physical operation validates ownership, current mode, actor reach where applicable, source state and revision immediately before commit. Double activation reuses the same action ID. All notifications describe the actual state; the seed-first caption is never used when the seed stayed with Pip.

## Acceptance

| ID | Required demonstration |
|---|---|
| D081.R15.AC01 | Mouse and keyboard complete the same move/inspect/read/arrange/join/fasten/cross actions; modal focus never walks Pip |
| D081.R15.AC02 | Same-size boats fail to span the wide gap, work at the narrow gap, require both attachments and preserve current possessions on cancellation |
| D081.R15.AC03 | Ferry the sole seed, move the same empty boat into the bridge, cross and plant once; no third boat, automatic Pip ride or duplicate seed |
| D081.R15.AC04 | All five successful histories and trailing harmless ferry retain equal outcomes; all 65 legacy order semantics remain covered |
| D081.R15.AC05 | Interrupt movement/placement/ferry/plant/growth and revisit the completed crossing without stranding, repeated commits or lost items |

Results NOT_RUN. Exact renderer collision meshes and source identifiers must be checked against this numerical reference in implementation; no new physics guess is left to the player.
