# Group 3 independent review preflight

September 15, 2026. Group 2 shared-interaction review passes. The implementation task owns the Group 3 packet, runtime, tests and BUILD-STATUS. This is the independent review boundary, derived from accepted Group 1 E04–E10 and the existing TASK11 contracts; it does not replace the implementation sequence.

## Required cases

1. Ordinary input can place, orient, join and fasten the two actual bridge sections at visible posts. A useful valid placement region must correspond to what the player sees; a mathematically exact hidden coordinate is not sufficient.
2. Wide gap and loose attachment are distinct failures. An otherwise reaching unsecured bridge permits ordinary crossing and actual collapse; a normal safe route needs no failure.
3. Neither-anchor, near-anchor and far-anchor collapse each preserve the correct real anchor, same intact pieces, Pip's safe return and every carried object. Recovery and save/reload preserve those distinctions.
4. Assembly and both attachments do not record B until Pip actually crosses. The completed bridge remains usable for subsequent people and return visits.
5. Seed loading, player-guided boat travel, docking/receipt and soil preparation are separate actual events. Pip stays ashore; page and bridge sections stay where they are. Assembly before first crossing does not prevent early seed delivery.
6. Wrong bank or obstruction retains the same cargo. Redirect the same boat; no invented receipt. Cancel requires physical return and unloading. Successful delivery leaves the boat at Grandma's actual mooring without a compulsory return chore.
7. Help/Pause/blur stop navigation at the same real position. They may settle an already-started atomic transfer once; they cannot finish the remaining boat journey. Reduced motion cannot replace required steering inputs. Durable save validation must accept valid in-flight and recovered states.
8. Conflicting world actions and first crossing wait until delivery or cancel/unload resolves the boat. A stale action or hard-crash recovery cannot invent a receipt or duplicate seed.
9. Planting removes the actual seed from Pip or Grandma and roots that same seed. Bloom is separately recoverable. Five equal physical histories remain B-P-L, F-B-P-L, B-F-P-L, B-P-F-L and B-P-L-F; only F before B can deliver the real seed. The legacy 65 cue-order contract remains separately applicable.
10. Material ownership, standing permission and maintenance ropes are visible and source-consistent. Fresh/legacy saves do not fabricate participation in the later revised bakery or Mara repair.

## Existing implementation risks sent to the owner

- Current `validData` accepts an anchor only if `reaches` succeeds, and `reaches` requires joined sections. That predicate cannot represent a correctly anchored section after separation; the new reducer and codec must agree.
- Existing BOOT and collapse settlement reset both anchors. Both require the same corrected recovery rule.
- The old seed enum and ferry-side shortcut cannot represent a seed aboard at a paused boat position. The durable model, validator, migration, renderer and command guards must share the new representation.
- Existing reduced-motion and INTERRUPT behavior settle the entire timed ferry. A player-guided journey must instead stop navigation while settling only a started atomic load/unload/receipt.

These are anticipated implementation risks, not claims that the Group 3 candidate has failed. Final review will use the owner's concrete candidate and ordinary UI paths, plus independent real-handler/codec cases where needed. No live/provider work is authorized; preserve TASK11.19 at 1/75 and the user's 4192 save.

## Packet-stage observations sent before compilation

- The opening must retain "an earlier visit", not "his previous visit". The latter narrows Tony's settled seed origin to the most recent visit.
- The first river helper draft put the moorings at x=±1.4,z=.8 while allowing water only to ±1.372 there. The initial and receiving moorings must satisfy the same physical navigation/validation predicate.
- Bank anchors must remain bound to their actual A/B section when a free section moves past it. A west-only recovery with A tied at-.775 and free B moved from1.35 to-3.6 must not silently reassign the west rope to B because x ordering changed. Include swapped A/B placement and save roundtrip.
- Revised source text must not inherit old reading/exposure credit solely through reused paragraph IDs. Archive the earlier envelope and clear/version only the changed source identities.
- Existing keyboard setup took97 0.1-unit moves with known coordinates. The new named post-preview controls should make ordinary keyboard construction practical while keeping Place, Join and both Fasten actions explicit.
