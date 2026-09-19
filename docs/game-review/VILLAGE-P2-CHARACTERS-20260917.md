# TASK11.ART02–06: seven village characters rebuilt with Tripo P2

Date: 2026-09-17. Existing branch codex/first-connected, base 7cc938a10bb52226a7a13493b64828eccf9c53d2. Tony explicitly authorized this seven-character restart. Earlier candidates and verification history remain preserved. This advances the existing art sequence, not the complete chapter qualification.

## Review deliverable

[Consolidated gallery](http://127.0.0.1:4318/pilot/village-p2-20260917/index.html). Grandma, Mara, Rina, Sol, the boy, passenger operator and adult passenger each have a fresh P2 model, humanoid rig, idle, walk and turn. Role presets bring the total to **30 untouched Tripo clips**. Separate animation-only files provide **29 contact/action previews**. Model Form and movement approval are **PENDING**. Sol's climb is **REJECTED**, retained as evidence rather than presented as accepted motion.

Successful Pip remains byte-identical; Jo is excluded and will be supplied by Tony. No scenery, Loop, incoming assets, gameplay integration or save work occurred. The earlier manually rebuilt versions are superseded only for these seven characters; original files remain intact in the older library.

## Production and provenance

Grandma was processed first, followed by Mara, Rina, Sol, boy, operator and passenger. Every character used P2-20260801, standard PBR textures, original-image alignment, disabled image autofix, adaptive triangle count and direct GLB. Approved local image hashes are unchanged. Each generated mesh was inspected before a successful free biped check and humanoid rig request (v1.0-20240301, biped, spec tripo, GLB). The exact rig version is in submitted arguments; some provider readbacks omit that field. Native geometry-included, in-place idle/walk cycles were inspected before role presets.

There are **36 successful jobs**, including seven free checks and a separate Sol climb job. No retry, reroll, paid conversion or subscription. The Sol climb has a successful API status but a rejected visual status; these are distinct facts. Original download hashes match submission-time receipt hashes. Embedded texture bytes and joint mappings are preserved across Tripo processing stages. Each rig contains **41 joints, without independent fingers/thumbs**.

| Character | Triangles | Native clips | Separate previews | Credits |
|---|---:|---:|---:|---:|
| Grandma | 5,231 | 5 | 5 | 185 |
| Mara | 4,947 | 4 | 4 | 175 |
| Rina | 5,359 | 4 | 6 | 175 |
| Sol | 5,263 | 5 | 5 | 185 |
| The boy | 5,219 | 4 | 4 | 175 |
| Passenger operator | 5,238 | 4 | 2 | 175 |
| Adult passenger | 5,361 | 4 | 3 | 175 |

The original GLBs, previews, PBR textures, submitted settings, readbacks, task IDs, individual charges and SHA-256 hashes are retained in [the exact review submission](../../evidence/hands-on-20260916/pilot/village-p2-20260917/review-submission.json), per-character manifests and [the existing ledger](../../evidence/hands-on-20260916/tripo-ledger.json). No local model re-export, mesh reconstruction, hand replacement, weight editing or skeleton rebuilding occurred.

## Separate actions and contact limitations

Custom clips target existing joints in separate JSON files. They preserve geometry, materials, bone hierarchy, bind pose, skin weights and native clips. No authored scale track or stretched limb is introduced. Carrying variants copy the native lower-body walk tracks unchanged and substitute only separate arm rotations. The passenger's eight-second sit/listen/stand preview keeps feet in place while existing joints bend toward the original bench. Review props retain their supplied dimensions and are only contact fixtures; they are not new approved artwork or gameplay state.

Joint mappings, both-hand offsets, phase timing, clip authorship and source rig hashes are recorded in each movement-review.json. Estimated walk distance per cycle is explicitly an integration estimate, not validated world locomotion. Model normalization and a constant per-clip floor offset are viewer transforms only; native foot variation remains visible.

- **Grandma:** Stock dig bunches the skirt during the deep crouch. Ground-level seed placement and soil covering are not qualified; the separate seed clip is a hand-height preparation preview.
- **Mara:** Exact two-person tape application while the boy supports the wing is not qualified.
- **Rina:** Stock lift_heavy flares the coat hem and has substantial vertical foot variation. Mixing, kneading and division are arm/contact-fixture previews, not qualified scene choreography.
- **Sol:** Stock climb is REJECTED for apron clipping/holes at the raised knee. Roof-height placement and ladder/rung contact are not qualified.
- **The boy:** Flute arm posture is demonstrated; exact mouth and supporting-hand contact is not qualified.
- **Passenger operator:** Boarding support is an offered-hand gesture; a synchronized passenger handoff is not qualified.
- **Adult passenger:** Boarding uses the native walk; a full staged boarding path is not qualified. A separate eight-second sit/listen/stand preview uses the unchanged rig and the existing bench; contact approval remains pending.

Exact two-person transfers and final scene contacts are not qualified. The previews should not be treated as complete planting, roof repair, tape repair or flute choreography. These limitations are displayed inside the gallery. No automatic repair or additional paid attempt is scheduled.

## Checks and commands

All seven reference/provider/source integrity checks pass. Thirty native clips have 128 finite playback samples; native walking moves both upper arms and both feet. Twenty-nine custom clips have 64 finite samples, existing-joint targeting and stable limb lengths; carrying copies preserve native lower-body tracks. These bounded checks do not establish foot locking, natural motion, clothing quality or convincing hand contact. [Native and custom results](../../evidence/hands-on-20260916/pilot/village-p2-20260917/verification/sidecar-summary.json).

Browser review exercises source/result selection, normal/slow motion, scrubbing, hand views, skeleton overlay, start/stop crossfade, gameplay framing and interrupted loading. Detailed observations and limits: [gallery browser evidence](../../evidence/hands-on-20260916/pilot/village-p2-20260917/verification/browser-review.json). Full-cycle sheets show six phases from front, side and rear. Technical checks never substitute for Tony's visual acceptance.

All eight required commands were run **once**:

| Command | Exit |
|---|---:|
| npm ci | 0 |
| npm run validate:content | 0 |
| npm run check | 0 |
| npm run build:server | 0 |
| npm run test:contracts | 0 |
| npm run eval:coach -- --mode authored | 0 |
| npm run build | 0 |
| npm run test:browser | 1 |

Content/type/server/build checks pass; **192 contract tests** and **23 authored coach checks** pass, with no live coach request. The existing-game Chromium browser run reports **158 passed / 4 failed / 0 skipped**. 9/9 complete narrative routes pass. The four failures are the two 1440px/320px welcome checks waiting for .garden-scene before Start playing, and the DPR2 lossless-WebP/PNG-fallback studio room-transfer assertions. They match the previously recorded failures. Twelve failure attachments are retained with the results. Its failures are retained separately in [the exact summary](../../evidence/hands-on-20260916/pilot/village-p2-20260917/verification/project-browser-summary.json) and [full results](../../evidence/hands-on-20260916/pilot/village-p2-20260917/verification/project-browser-results.json); logs for all eight commands remain beside them. No unrelated game repair or performance investigation was undertaken. This is not an all-browser game qualification or resolution of earlier WebKit DPR2/studio transfer gaps.

## Budget and next dependency

Actual additional spending is **1,245 credits**, cumulative **2,140 / 2,500**, available **360**, frozen **0**, unresolved jobs **0**. Allocations are **290 pilot / 1,440 production / 410 corrections**, all below their ceilings. This matches the authorized estimate.

The next dependency is Tony's consolidated model Form and movement review, with the listed clip exceptions. New production export and gameplay integration remain blocked pending explicit matching approval. The requested Build 3D Game Rooms workflow says: “Record explicit human Form approval. Stop before progressive export when Form fails.” Existing reference approvals remain valid. TASK11.19 stays halted at exactly **1/75**, and broader TASK11.20/.21 remain open.
