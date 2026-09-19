# First encounter: authorized implementation

September 14, 2026. Tony instructed: "Build the first playable encounter from the prepared handoff. Resolve routine details yourself, verify it, and show me the playable result."

This activates EQ-REVIEW-FIRST-ENCOUNTER revision 1 in the existing workspace and branch codex/first-connected, starting at 63af7a2261553c2639842a458b54dde38311e3f7. The pre-edit tracked diff was empty; docs/game-review is this task's preserved design work. The D081 source hashes and original import inventory remain the provenance baseline.

## Dated source, stack and task amendment

Items 05/07: the new versioned Garden Adventure encounter uses D018/D029/D030/D033/D038 and R15. It adds actual two-boat placement, separate fastening and walking, a persistent return route, seed-first reuse, and separate Mara source/possession/report events. The original E7 and all 65 cue-order/five-success semantics remain unchanged regression requirements. New content has explicit source bindings; imported text is not overwritten.

Items 08/10: create local, original papercraft trial models/materials for Pip, Mara, Grandma, Jo/Loop and the connected river/garden. They serve this playable review and do not certify final full-game artwork. Preserve every original asset and its quality/performance limits.

Item 09: Three.js 0.186.0 WebGLRenderer and orthographic projection provide this trial's view. Keep TypeScript/React/Node, native accessible controls, one immutable active game store with serialized commands, and IndexedDB. The new /garden route loads its own chapter state/save namespace without instantiating the legacy controller; the existing game remains at /. No second authoritative physics simulation is introduced.

Existing ownership/dependencies: reopen TASK11.02 for the source registry; .05 for serialized chapter commands; .06/.07 for world/input; .08/.09 for reading and real handoffs; .10/.11/.12 for physical manipulation and original regression coverage; .14/.15 for saves/authored help; ART02-07/.20 for trial artwork and measured renderer behavior; .16/.21 for connected qualification. This is the handoff's dated scope addition, not a replacement task sequence. Existing TASK11.20/.21 failed qualification evidence remains open.

TASK11.19 remains halted at 1/75. No live text/speech call, child recording, full-chapter expansion, deployment, publication, or submission belongs to this encounter. Required local/authored commands and connected browser verification apply. Tony's D028 visual/play judgment follows the working result.

Implementation is complete for this bounded encounter and open at http://127.0.0.1:4192/garden. Final client: GardenApp-BNOWpMeY.js / GardenApp-BBZbp3Pw.css. The dated [verification record](../../evidence/garden-20260914/verification.json) identifies 52 passing contracts, 23 authored checks with zero API calls, the passing build, 9 final passing Chromium checks, prior failed candidates, actual recordings and performance limits. [Play/build notes and existing FIX11/CHECK11/D081 mappings](../GARDEN-FIRST-PLAYABLE.md). Changes remain local and uncommitted.

The required 89-case production run and its two existing transfer failures are preserved separately from the final focused candidate. The original art/import hashes and historical evidence remain preserved. The final local GPU sample is 16.8 ms active RAF p95 at DPR1.25; software-rendered DPR1/2 cadence remains over the unchanged limit. Tony's D028 review, full-chapter expansion and broader qualification are still open. No final game or learning-effectiveness claim follows from this first encounter.
