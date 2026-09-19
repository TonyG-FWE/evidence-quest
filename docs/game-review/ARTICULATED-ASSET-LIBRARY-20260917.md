# TASK11.ART02–06: complete 3D review library

Authorized 2026-09-17 by Tony's explicit implementation request. The model library is complete for consolidated Form and movement review. All required project commands have run; their results are recorded below separately from asset qualification.

All 77 current designs / 91 reference images have exact-hash image approval. The latest eleven Sparkfest approvals are recorded in the reference gallery; the previous state and all image originals remain preserved.

This amendment produces a separate 3D review library: nine locally rigged humanoids with fingers and thumbs; locally modeled Loop; architecture, landscape, furniture and functional states; local correction of the existing seed boat and lantern flower. Village paper materials and Sparkfest physical materials remain distinct.

Source assets, task receipts, local authoring files and model reviews live under `evidence/hands-on-20260916/pilot/articulated-library-20260917`. No new model is approved for production export or live-game integration by this amendment. Human model Form/movement review follows the completed library.

Tripo generation is sequential P1, 8,000 target triangles, standard/PBR textures, direct GLB. The approved reference and these settings are transmitted to Tripo. Nine initial generations are estimated at 450 credits at the official P1 price verified 2026-09-17. Starting recorded spend: 290. Allocations remain 400/1,600/500, total ceiling 2,500. No paid rigging, animation, conversion, subscription, unresolved-job resubmission or automatic reroll.

The local skeleton must include anatomically fitted shoulders, elbows, wrists, palms, articulated thumbs and three segments per finger, hips, knees, ankles and forefoot hinges. Skin topology and weights must support the motion. Review must show meaningful contact with scene objects, grounded feet and full cycles, not merely bone existence.

Gameplay, story, saves and historical game-performance investigations are outside this task. TASK11.19 remains halted at 1/75. Required regression checks will be recorded separately from visual acceptance; failures will not be hidden or relabeled.

## Delivered review library

[Interactive models and movements](http://127.0.0.1:4318/pilot/articulated-library-20260917/index.html), [complete manifest](../../evidence/hands-on-20260916/pilot/articulated-library-20260917/manifest.json), [verification](../../evidence/hands-on-20260916/pilot/articulated-library-20260917/verification.json), and [exact model review submission](../../evidence/hands-on-20260916/pilot/articulated-library-20260917/review-submission.json).

| Category | Designs represented by models |
| --- | ---: |
| Characters | 10: nine humans and Loop |
| Buildings and furniture | 11 |
| Nature / landscape | 13 |
| Functional objects | 43 |
| Total | **77**, with 77 editable Blender files |

There are 67 Village and ten Sparkfest designs. The gallery keeps their comparisons separate and retains the approved reference beside each model. Six rendered sheets show the actual models. Every design has a GLB, editable Blender source, reference/model hashes, parts or joints, applicable states, and a pending model approval record. These files are separate from the game's runtime manifest.

The nine sequential P1 character generations used the approved image hashes, standard PBR textures, an 8,000-triangle initial target and direct GLB delivery. Actual new charges are **450 credits**, bringing total spending to **740 / 2,500**. Reservations and unresolved jobs are zero. The pilot/production/corrections allocations remain 400/1,600/500. No subscription, paid rigging, paid animation, conversion or automatic reroll was used. Provider sources, previews, settings, task IDs and charge receipts remain in `sources/` and the existing Tripo ledger. Local revisions, including failed skinning candidates and their checks, remain in `local-history/` and `verification/`.

The eight Village humans retain layered sculpted-paper forms. Jo and Loop use the separate Sparkfest treatment. Loop has independent wheels, axles, casing, glass lens, handle and button. The 68 local or retained models include architecture with accessible work bays and actual openings, roof states, construction connections, vegetation, furniture and functional parts. The retained pilot boat and flower keep their original source geometry and PBR images; local work supplies the cradle attachments, cargo state, rooted base and growth states. The storybook has a separate page hinge and embedded miniature village.

## Articulated movement and contact

Each human has individually fitted shoulders, elbows, forearm rotation, wrists/palms, hips, knees, ankles and toes, plus three bending segments for each finger and thumb. Mesh hands were rebuilt where the provider geometry could not articulate. Skin weights distinguish body, sleeves, hands, backpack and skirt. Pip's surface cleanup preserves the validated weights while restoring the tunic boundary. All original source files and PBR image buffers remain unchanged.

The final close-up correction rebuilds Pip's short forearm-to-hand joins as closed surfaces, separates fused sleeve/torso seams, removes arm influence from his torso straps, and samples the hands' skin color from his face. These are local derivative changes; the approved images and original provider files are unchanged. Earlier failed surface checks remain in the verification history. The final files pass the unchanged all-clip surface-stretch and foot-contact limits.

The library contains **204 human clips**: grounded idle/walk, starts/stops/turns and carrying equivalents, handoff, five hand poses, role-specific actions, and Pip's jog/carrying jog. Adapter metadata names both hand attachments, all joints and clips, and movement distance per cycle. The review actor accepts external position/orientation/movement state and owns presentation only.

Fifteen selectable contact demonstrations cover posts, rope wrapping, seed loading, planting, wing alignment, tape, tiles, mixing, dough, pictures, manuscript delivery, memory, storybook handling, flute fingering and writing. They use the actual asset geometry and named hand/object attachments. Jo's page clip follows the turning leaf with thumb/index contact and a supporting palm. The boy's six flute finger targets use the modeled tone holes. These are **review contact fixtures**, sometimes using a raised worktable; full staging in gameplay, NPC delivery and story consequences belong to the next task.

The gallery offers all-side cameras, gameplay scale, both hand close-ups, skeleton and wireframe overlays, normal/quarter/half speed, pause, cycle scrubbing and a start/walk/turn/stop route. Native controls and reduced-motion pausing remain available. Selection changes and interrupted loads release the review leases; unapproved assets cannot be acquired through the production path.

## Verification

- All **77** GLBs load with finite geometry. Model/reference/editable hashes, named components, functional states, pivots, anchors and approval gates pass.
- All **nine** humans pass the expanded audit across every exported clip, sampled 24 times per clip. It checks normalized weights, weighted independent digits, both arms, knee direction, forward-facing shoe outlines, stable bone lengths, planted supporting feet, anatomy surface stretch and unchanged source PBR buffers. Numerical limits were not relaxed.
- **30 / 30** asset, character, approval/budget and adapter tests pass. These include original R2 preservation, interrupted fixture loading/disposal, all 77 model loads, all 15 demonstrations, separate world assemblies, Jo's real fingertip/page and supporting-palm contact, and continuous seed release into the actual cradle without crossing its floor.
- The actual browser was used to inspect the gallery, representative complete cycles, hand controls, functional fixtures, states and separate comparisons. The six sheets provide visual coverage of all 77 candidates. This is not a claim that automated tests establish visual quality or that every motion has human approval.

All eight required project commands ran. Install, content validation, type/schema/copy checks, server build, **192 contracts**, **23 authored coach checks** and production build pass. `npm run test:browser` finishes **158 passed / four failed** on owned port 4368. All nine complete chapter routes pass. The two Sparkfest welcome tests (1440px/320px) time out looking for `.garden-scene` in the planning screen before Start playing. The two original studio DPR2 WebP/PNG room-transfer budget assertions fail at `production.spec.ts:57`. Those are existing-game regression failures, not production qualification of the new review models; no fix or investigation outside this artwork task is claimed. All authored checks use zero live AI calls. The first build attempt's sandbox `EPERM`, an interrupted browser launch, and the occupied-port attempt are retained; the build passed in the permitted rerun. These attempts are not silently counted as passes.

The unmodified Build 3D Game Rooms Function validator reports three vendor/configuration-specific failures: its hard-coded Meshy model, Meshy pricing and `maxChargedAttemptsPerAsset == 2` requirements. Its raw log is retained. Tony explicitly selected nine sequential Tripo P1 generations under the existing total budget; the project checks instead enforce approved image hashes, actual charges, the 2,500-credit ceiling, no unresolved resubmission and no automatic rerolls. The stock validator is **not** relabeled PASS.

Historical game gaps remain separate: WebKit DPR2 cadence and studio transfer failures, native-device/assistive-technology evidence, broader chapter qualification and Tony's play acceptance. This task makes no claim to resolve them and performs no save or performance investigation. TASK11.20/.21 and the complete-chapter commitment remain open. **TASK11.19 remains halted at exactly 1/75.**

## Next dependency

All new model Form and movement approvals are **PENDING** against the exact hashes in `review-submission.json`. Existing reference-image approvals remain valid and are not reopened. The requested Build 3D Game Rooms workflow says “Record explicit human Form approval.” Production export and gameplay integration follow that separate model decision. The review GLBs are inspection derivatives, not production exports or additions to the live game.
