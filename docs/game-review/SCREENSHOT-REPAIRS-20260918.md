# Approved screenshot repairs — 2026-09-18

Status: IMPLEMENTING, not visually accepted. Continues TASK11.ART02–07 / TASK11.20 / TASK11.21. R15 is separate frozen evidence; no old pass closes the reported human-playability failures. Grass stays removed. No provider requests, publication, or TASK11.19 restart.

## Authority and ownership

Tony approved “Evidence Quest: repair the layouts and unblock gameplay” after clarifying **oven right / preparation table foreground** and **one clear outdoor workshop table / remove embedded porch table / retain original roof cap**. His seven annotated screenshots are the placement reference.

- “Implement final 3D demo integration” owns shared world layout, main scene, interactions, contacts, camera, current-save recovery, model manifest/build integration, BUILD-STATUS, and broad checks.
- “Fix game world interactions” owns landscape preparation, tree placement, path borders, personal fitted path surfaces, and independent native visual/interaction review.
- One editor per shared file. Source release and playable checkpoints are exchanged between the tasks.

## Accepted repair requirements

1. Bakery: oven right of ladder; larger prep table in the foreground; reachable oven mouth; separate preparation, dry flour, threatened flour, tile storage and roof access. Refit ladder feet/top/climb and tile scale/pitch/facing to measured source surfaces. A visible roof target, hit area, preview and release must agree. Valid roof drops align automatically; the intentional beside-opening choice and recovery remain.
2. Workshop: retain the wooden roof cap. Remove only the embedded porch table from a working copy. Move the interactive table off the route and update its card grid, camera, actor approach and collision footprint.
3. Garden: move foreground large tree right; add a smaller tree in the marked far-left corner; add ten decorative lantern plants plus low flowers/leafy plants. Remove the disconnected fork model and all obsolete supports/exclusions. Enlarge the planting hole and all related targets/states together. Reverse existing bench; add the marked inward-facing second bench. Use the complete open chest and keep Grandma's cushion retrieval.
4. Paths: planted low borders on both sides of the village paths, grounded on actual terrain, with clear junctions, doorways, landings, bridge approaches and handling areas. No grass scatter returns.
5. Bridge: use the left supplied deck model for both halves; fit walking planks to both shores and central connection; fit six posts into the actual sockets. One geometry contract feeds walking, preview/drop, ropes and recovery. Preserve two halves, six posts, two ropes, cancellation, independent support and current-save material ownership. Retain the too-wide attempt, approximately 0.90 m underside clearance above water, at least 0.25 m above the loaded boat, and ramps no steeper than approximately 1:6.
6. Camera grid: top row pan left / forward / right / tilt up / tilt down; bottom row rotate left / backward / rotate right / zoom in / zoom out. Fit map and Follow Pip remain below. Existing accessible and view-only behavior stays intact.

## Verification and delivery

The first playable checkpoint is the complete bakery activity through returning to Sol: pointer interactions first, then keyboard/touch equivalents, cancellation and reload. Subsequent review covers garden sightlines, both benches, chest retrieval, planting and each route; complete visible bridge construction, Pip crossing, loaded boat passage both directions, docking and save/resume; camera controls and active-drag isolation.

Native screenshots and actual actions establish visible acceptance. Focused code checks support it. The integration owner coordinates the required eight commands and broader browser matrix against the final fixed candidate, without duplicate runs or weakened thresholds. Deliver the local playable preview, matched images, source-copy provenance, responsiveness observations and unresolved defects.

## Working-copy evidence

- `output/screenshot-repairs-20260918/workshop/provenance.json`: index-only omission of the 2,298-triangle independent porch-table component. Retained source positions, normals, UVs and base-color texture bytes match; the original source file is unchanged.
- Workshop source/derived side views are in the same output directory. These are diagnostic source UV renders, not final runtime acceptance.
- **Rejected R16 source selection:** `output/screenshot-repairs-20260918/bridge/provenance.json` preserves the eight-board, pink-striped model and its working copy. Independent comparison with Tony's marked screenshot confirmed this was the crossed-out RIGHT-hand model, despite its internal `bridge` name. R16's saved-construction screenshot is retained as rejected candidate evidence. Its successful mechanics checks do not qualify the selected visual.
- **Corrected selected LEFT-hand model:** `output/screenshot-repairs-20260918/platform-bridge/provenance.json` binds `wooden+platform+3d+model.glb`, the six-board model with the blue double mark, source SHA-256 `026121fdd2df8525b24b56d209c13da4e0c95d40f0d26711638cde3aaa41b915`. Its fitted working copy is `platform-fitted-planks.glb`, SHA-256 `9f002e5b30b18cb0b18909d1d3978c05aa5a51f80b64f273682b1fcd37156942`. All 5,082 triangles / 43 disconnected components, original positions, normals, UVs, materials and texture bytes are preserved. The entire original binary prefix remains unchanged; source file hash still matches.
- Complete corner assemblies move to normalized X±.315/Z±.62. Two end boards fit Z±.62 and narrow across X to ±.279, leaving the original square socket apertures clear while retaining a .79236 m walking width after runtime scaling. Their bolts move without shape changes; the lower frame also fits the shared span. Four middle boards and blue marking remain unchanged. These are outer node transforms, not source vertex edits. `deck-top.png` is diagnostic source-UV evidence. The integration owner independently inspected it and owns runtime packaging, exact post seating, centre socket suppression and clearance verification.
- Preparation and packaging now use distinct script names: `prepare-platform-bridge-working.mjs` (this task) and `package-platform-bridge.mjs` (integration). An earlier helper-name collision caused a repeated package timestamp to change two R16 generated manifests; the integration owner preserved and reconstructed their exact frozen bytes. No corrected-source qualification is inferred from R16. See `evidence/final-demo-20260918/required-r16/interruption.json`.

## Landscape source checkpoint

The large garden tree is at (12.3, 10.0), height 6.4 m; the smaller corner tree is at (5.6, 14.8), height 3.1 m. The large crown is sized to clear the measured bench footprint rather than being silently rejected by the shared scenery fitter. Ten decorative lantern plants and low flower/leaf groups consume the current route, activity, root and furniture clearances. They add no story records or interaction targets.

The shared path union now has 301 low border placements: 226 supplied broad-leaf plants and 75 shrubs. The source asset named `grass` is the existing broad-leaf plant; no removed grass model is acquired or scattered. Borders use the shared curved routes and terrain normals. The obsolete garden-fork route and exclusions are removed from the personal path surface. `PLANTING_BED` controls both the enlarged pebble margin and decorative clearance.

`evidence/screenshot-repairs-20260918/landscape-inspection.json` records CPU geometry checks only. All ten lantern locations, both garden trees and the grass-removal condition pass at this checkpoint. These checks do not substitute for visual or gameplay acceptance.

An independent native Chrome view on the isolated 4373 development origin shows the garden fork removed, continuous paths, visibly enlarged soil bed, two inward-facing benches, complete open chest, and unobstructed garden sightline beside the moved large tree. `wip-garden-layout-02.png` captures that view. This is a composition checkpoint while the integration task is still finishing the combined game, not fixed-candidate or performance qualification.

Independent native free-camera inspection also confirms the selected bakery arrangement: oven to the right, larger preparation table in the foreground, flour on a counter, grounded ladder meeting the roof, and room around the characters. The workshop has a clear porch, unchanged wooden roof cap, and one outdoor table fully off the walking path. See `wip-bakery-layout-01.png` and `wip-workshop-layout-01.png`. The camera panel visibly uses the approved two-row order. These images were captured through ordinary camera controls on the current development scene.

## Current acceptance

The integration owner reports the new pointer sequence completing roof repair, flour, kneading/division, baking, loaf pickup, ordinary walking to Sol, loaf handoff and reload. Its focused report remains separate from this task's independent review. Independent combined bakery/bridge/boat playthrough, touch/keyboard equivalents, final saved-state review and quiet responsiveness measurements are still pending. No completion claim is made from source inspection or inherited automated passes.

The personal R16 compiled preview independently resumed a completed construction save, walked Pip to Grandma through ordinary controls and showed the new garden composition. `after-garden-gameplay.png` records that view. `after-bridge-saved-construction.png` exposed the wrong deck selection and is explicitly superseded. The source and build binding are in `personal-candidate-r16.json`; the integration owner retains R16 separately.

The R16 native observation at Chrome 153 / ANGLE NVIDIA GeForce RTX 3070 Ti D3D11 / DPR 1.25 / 2560×825 render resolution recorded 600 active frames: median 16.7 ms, p95 33.4 ms, p99 33.5 ms, 186 draws and approximately 5.40 million submitted triangles. Three >250 ms stalls include loading/arrival; this is a mixed observation, not quiet qualification or a measure of GPU-only time/VRAM. The removed grass instance count was zero. This observation applies only to R16, before the selected platform-model correction; see `compiled-native-garden-measurement.json`.

## Corrected platform checkpoint / personal R17 delivery

The integration task's `platform-native-r1` completed ordinary construction, crossing and reload with the corrected platform model. Loaded-boat passage passed in both directions at both crossings. The direct-drag/planting continuation initially timed out while cold Vite served `main.tsx` (17.7 seconds); its unchanged repeat passed. The failure and repeat remain separate evidence, not an erased failure.

This task independently inspected the resulting `raised-bridge.png` against Tony's screenshot: both halves now show the selected broad six boards and blue mark, a flush central connection, six seated supports and two ropes, with shore connections. A byte-identical image is retained as `evidence/screenshot-repairs-20260918/after-bridge-selected-platform.png`. This image uses the standard review landscape, rather than the personal fitted path/water profile. It is visual corroboration, not Tony's Form approval. The geometry report records .955376 m underside clearance above water and .404011 m above the loaded boat, including bobbing; the maximum actual approach gradient is .16151, below 1:6.

R17's first seven required commands pass, including 204 contracts and 23 authored checks. The integration owner is running the full browser and DPR qualification; this task does not duplicate those suites. Native GPU tabs stay closed during that run.

The personal preview was rebuilt from frozen R17 source `a0d3789b316dce039d083d739f7723cd6153bfcf50188b943323797c4f430100`. All 577 bound files were checked unchanged before and after. All 1,843 previous personal artifact bytes were verified in R16 backups; the new output contains 1,846 artifacts. `personal-before-r17-build.json` and `personal-candidate-r17.json` bind the evidence. Vite and client preparation both exited 0; the project-owned server at `http://127.0.0.1:4364/garden` returns HTTP 200 and serves the new `App-2ieEZT8T.js` entry. No browser-storage operations or save reset occurred.

The rebuilt personal profile retains fitted paths/banks and grass removal. It awaits a separate final native replay and new quiet performance sample after the integration run; the R16 sample is not relabeled as R17. `evidence/screenshot-repairs-20260918/index.html` pairs the user's references with actual captures, explicitly distinguishing different camera angles, development composition checks, compiled continuation, and the corrected standard-profile bridge image.

At the later coordination checkpoint, Tony set a less-than-one-hour completion window across the game tasks (before 03:09 UTC). The integration owner is switching from the long broad suite to bounded checks of the most important demo-playability requirements. Root source remains frozen; gallery and handoff are complete. The full browser/DPR qualification remains incomplete and is not promoted to pass. No additional demo-blocking discrepancy was found in this task's inspected compositions and corrected bridge image; that observation does not certify unplayed scenes or final personal-profile native replay.
