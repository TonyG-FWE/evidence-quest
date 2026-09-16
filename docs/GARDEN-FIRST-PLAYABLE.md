# The Garden Adventure: first playable encounter

**Historical checkpoint.** The subsequent full-chapter implementation is documented in [The Garden Adventure: complete local chapter](GARDEN-COMPLETE-DEMO.md). The first-encounter scope and measurements below are retained as dated evidence; current results are at the top of BUILD-STATUS.md.

September 14, 2026. Implements the user-authorized [first-encounter handoff](game-review/BUILD-HANDOFF-FIRST-ENCOUNTER.md). [Dated source/stack/task amendment](game-review/FIRST-ENCOUNTER-IMPLEMENTATION-20260914.md). The complete adventure and Tony's D028 visual/play acceptance remain separate from this checkpoint.

**Current playtest correction:** Tony selected a separate seed boat and repairable footbridge. The boat has an open hull and its own trip across the water. Two wooden bridge sections are placed, joined and fastened independently. The [dated object/copy/save amendment](game-review/BOAT-BRIDGE-CORRECTION-20260914.md) records this change. Current verification is recorded in BUILD-STATUS.md and `evidence/boat-bridge-20260914/`; the earlier verification figures below remain historical. Full-size green/blue choices, gold hint controls, visible feedback and replay controls are retained.

## Play

The running review preview is **[Play the first encounter](http://127.0.0.1:4192/garden)**. Existing browser progress is retained. With the documented default startup after a clean clone, use http://127.0.0.1:8787/garden. The owned preview process is recorded in BUILD-STATUS.md.

To replay, use **Play from the beginning** on the completion screen or in the scene after planting. **Pause → Start a new adventure** also works at any point and is now in the fixed button area. Confirming creates a fresh run and keeps the previous adventure in a local archive; cancelling keeps the current run. Refresh an already-open tab to load new controls. The [scope inventory](game-review/PLAYABLE-SCOPE-20260914.md) distinguishes this first encounter from the full approved chapter.

Historical recordings from before the separate-object correction: [carried-seed route](../evidence/garden-20260914/playthrough-carried-seed.webm), [seed-first route and corrections](../evidence/garden-20260914/playthrough-seed-first.webm). Current recordings are retained with the new dated browser evidence. These are automated connected playthroughs, not a narrated three-minute submission video.

![Actual separate seed boat and footbridge](../evidence/boat-bridge-20260914/boat-and-footbridge.png)

1. **Begin Pip's adventure**, then **Start playing**. The opening explains his promise and the washed-away bridge.
2. Click ground or use WASD/arrows. Named destination buttons walk Pip along the same legal paths. Approach Mara, talk, and offer to take her actual story page to Grandma.
3. Beside the river, read the note or enter **Arrange bridge**. Drag a wooden bridge section, or select it and use Move/arrows, then **Place section**/Enter. Escape cancels an uncommitted move. Turn and Join are separate actions. Leave the seed boat's route clear.
4. Choose a place where the joined sections reach both banks. Fasten each end. **Back to Pip** returns control without moving him automatically; walk across the finished footbridge.
5. Plant the seed with Grandma. The seed enters the soil, roots and a lantern-flower appear, and the promise is kept. Share Mara's page in a separate actual handoff. Grandma responds to Mara's work constraint and opens **The Torn Wing**.

The seed-first alternative uses a separate small boat. The seed is loaded, travels over the water, and is collected by Grandma at the far bank. Pip, his page, and both bridge sections stay put. The empty boat remains by the garden bank. Repair the footbridge, cross, and plant together. The boat also works if the bridge is already fastened but Pip has not crossed. A wide gap or a loose end can be corrected; no failed attempt is required. The completed bridge remains available for return trips.

Every word in the five source pages has an authored meaning. Word help preserves the sentence and returns focus to the selected word. Listen to the selected word, sentence or page using an available local English system voice; unavailable output is stated beside the controls. Short oral practice is voluntary. This encounter records assistance and actual exposure, never comprehension, pronunciation accuracy or mastery.

## Implementation and preservation

- `src/garden/model.ts`: domain state, source guards, physical bounds, real routing, owned transactions, all five F/B/P/L histories. `src/core/serialized.ts` supplies the shared reentrant command queue.
- `src/garden/GardenScene.tsx` and `art.ts`: fixed-camera Three.js view, original papercraft models, exact A/B identities, projection/picking, visible possession and action endpoints, context recovery and resource disposal. Material batching retains the geometry and detail.
- `src/garden/GardenApp.tsx`, `garden.css`, `content.ts`: scene controls, readers, local word support, scalable text, focus/input ownership and exact reviewed paragraphs.
- `src/garden/persistence.ts`: separate `evidence-quest-garden-adventure-v1` IndexedDB namespace, integrity checks, previous snapshot, transactional revision comparison, explicit recovery and archived new adventures. Valid encounter-v1 saves upgrade to encounter-v2; the exact original record is archived atomically, and Saved waits for the transaction. Progress and possessions remain. Only unfinished sections blocking the newly explicit boat channel relocate to the bank. The older `/` game's case database is untouched.
- `/garden` is a separate lazy entry and same-origin server route. The old controller is not instantiated for it. The original `/` game remains available.

The current [content manifest](../evidence/boat-bridge-20260914/content-manifest.json) binds 27 paragraphs and 416 word occurrences to their actual source files. The earlier [source-preservation receipt](../evidence/garden-20260914/source-preservation.json) checks 52 original images and all 307 imported files: 301 exact import matches and six historical text changes retained against the Git baseline. Git-normalized text comparison is distinguished from byte comparison. [Art provenance](../evidence/garden-20260914/art-provenance.json) and [original candidate file hashes](../evidence/garden-20260914/candidate.json) identify the earlier trial.

## Existing task/check ownership

These are bounded additions under the original TASK11 owners, not replacements for the legacy check families. The full task-to-check/fixture lists remain in implementation-plan.json and the D081 crosswalk.

| Owner | Existing check / fixture references | Encounter evidence |
|---|---|---|
| TASK11.02 | CHECK11.CONTENT/STORY/TECH; FIX11.CONTENT | Exact source/meaning manifest; required content validation |
| TASK11.05 | CHECK11.INTERRUPT/SAVE; FIX11.CUE_RACE/SAVE_INTERRUPTED | Serialized handlers; five histories; cancellation and atomic interruption contracts |
| TASK11.06/.07 | CHECK11.ROUTES/G01–04/X01–05; FIX11.MOVE/ACCESS/ART_FAILURE | Actual ground/deck travel, pointer/keyboard construction, compact readers and view restoration |
| TASK11.08/.09 | CHECK11.EXPOSURE/RECORDS/STORY; FIX11.NPC/NOTES/RECAP | Exact visible word spans, separate source/page/report state, actual Mara/Grandma handoffs |
| TASK11.10/.11/.12 | CHECK11.RESOURCES/RAIL/P01–06/INTERRUPT; FIX11.RAIL/CUE_RACE/TERMINAL/ORDER.00–64 | Separate seed boat and A/B bridge sections; wide/loose corrections; five equal histories plus all 65 preserved legacy orders |
| TASK11.14/.15 | CHECK11.SAVE/EXPOSURE/AI_LIFECYCLE; FIX11.SAVE_FAILURE/SAVE_RECOVERY/RESET | Separate save namespace, disk corruption/write failure/concurrent writer, authored help and zero provider calls |
| ART02–07 / TASK11.20 | CHECK11.VISUAL/PERFORMANCE; FIX11.ART | Original trial meshes/scales; original art unchanged; DPR/resource/RAF measurements |
| TASK11.16/.21 | CHECK11.ROUTES/EXPOSURE/SAVE/VISUAL/HARDENING | Real browser routes, recordings, regression suite and explicitly retained limitations |

New named tests in `checks/garden.test.ts`, `browser-tests/garden.spec.ts` and `garden-measurements.spec.ts` map to D081.R15.AC01–05, R16.AC01–04, R17.AC01–04 and R19.AC01–03 for this encounter only. Legacy fixture success does not substitute for the new physical route tests.

## Historical first-encounter verification and retained limits

The repository's actual `npm ci`, `validate:content`, `check`, `build:server`, `test:contracts`, authored `eval:coach` and `build` pass. Contract checks: **52/52**. Authored evaluation: **23/23, zero API calls**. The full required production browser suite returned **86 pass / 3 fail** before the last Garden corrections; the two original image-transfer failures remain open, and the early measurement sampling error was corrected. The final candidate passes **9/9 Chromium checks**, including both encounter routes and all new recovery cases. [Exact commands, candidates, results and exclusions](../evidence/garden-20260914/verification.json).

The actual GPU preview measured 16.8 ms active RAF p95 over 106 samples on RTX 3070 Ti at DPR1.25. Software SwiftShader measured 99.9/200.1 ms at DPR1/2 and misses the unchanged 33.34 ms target; initial transfer was below 4 MiB in each case. The measurement test passing means its collection worked, not that those cadence limits passed. Broader performance/browser/device qualification remains open.

The local first encounter uses authored support and optional local model reading. No provider inference or child recording is part of it. TASK11.19's exhausted-credit ledger remains at 1/75. Sol, the later gathering, story contributions and full ending presentation remain outside this first playable packet. No learning-effectiveness or final-art acceptance is inferred from tests or screenshots.

Storage injection, a legacy save sentinel and requested WebGL loss are labeled synthetic fault seams. Real route tests still use the connected player controls and actual handler/store/persistence code. Renderer timing uses active RAF samples with actual density; it is not physical display FPS. Known resource allocations are separate from unmeasured total GPU memory. Existing TASK11.20/.21 high-density and native-device gaps remain open.
