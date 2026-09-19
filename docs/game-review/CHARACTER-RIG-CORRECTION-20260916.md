# Pip and Grandma: correction following rejected Form review

Date: 2026-09-16. Existing base: `7cc938a10bb52226a7a13493b64828eccf9c53d2`, `codex/first-connected`. This is local work under TASK11.07/.16/.20/.21 and the [existing exact CHECK11/FIX11 bindings](../../evidence/hands-on-20260916/task-bindings.json). It does not replace the TASK11 sequence or grant production approval.

Tony rejected both characters' body deformation, right-arm motion and leg movement. The prior loading, contact and browser checks did not establish acceptable animation. The original review, manifest, adapter and bounded verification are preserved under `pilot/rejected-r1`; original provider models and approved references remain unchanged. The prior READY status must not be restored by a finalization script.

## Local rebuild

Both characters start from the original unrigged P1 mesh. The generated skeletons, old weight patches and provider animation tracks are not reused. Named anatomical joints cover both clavicles, upper arms, forearms, hands, thighs, shins, feet and toes, with a torso/head chain. Pip has a rigid backpack attachment; Grandma has four controlled skirt bones.

The source meshes are welded at coincident positions while preserving UV seams. Blender heat binding provides continuous body weights; explicit anatomical constraints remove leg influence from the torso and isolate garments. Pip receives three local trouser bending rings. Grandma's fused skirt/ankle surface is separated at its hidden lower seam, and the original five-millimetre shoe offset is grounded. High-quality original geometry is archived; the review meshes contain 8,010 and 7,999 triangles respectively. Pip's ten-triangle excess over the 8,000 target is due to joint topology added for deformation. No visual detail or performance limit was reduced.

Each character has four locally authored clips: idle, walk, carrying idle and carrying walk. Walking uses alternating support/swing phases, forward knee bends, constant segment lengths and shoulder-driven arm swing opposite the stepping leg. Carrying bends the elbow and distributes palm-up rotation through the forearm and wrist. The actual palm surface supplies the seed attachment. No shoulder-only runtime pose override remains.

All original embedded base-colour, normal and material texture bytes are retained. The `.blend` sources, GLBs, anatomical specifications, motion contact records, hashes and deformation audit are in `evidence/hands-on-20260916/pilot/revision-r2`.

## Adapter and review

`VisualAssetDefinition.rig` declares explicit anatomical joint and clip mappings and the distance covered by a walking cycle. `CharacterVisualState.speed` supplies authoritative movement speed in metres per second; position, yaw, movement, carrying, pause and reduced motion remain presentation inputs. `CharacterVisual.seek` supports deterministic review scrubbing. The adapter blends clips over 180 ms, preserves their shared walking phase and releases owned skeletons/mixers without releasing shared source resources prematurely.

The review provides standing, walking, a short start/turn/stop journey, free/carrying arms, fixed views, actual gameplay camera scales, normal/slow playback, native keyboard scrubbing and a rejected-R1 comparison. It loads one character source at a time. Review motion never changes gameplay or saved state.

## Foot alignment refinement (2026-09-16)

Tony's follow-up requested straight-forward feet as the remaining small correction. The preceding R2 meshes, editable sources, implementation, screenshots and verification are archived at `pilot/revision-r2-before-foot-alignment`. This feedback is recorded without changing the layout/reference approval or inferring approval for either prop.

`scripts/align-character-feet.py` reads the archived R2 Blender files, aligns each shoe's footprint with the forward direction, and blends the rotation out through the ankle. It keeps all vertex heights, skin weights, triangle indices, UVs, animation tracks and geometry above the ankle blend unchanged. Grandma's skirt is excluded from the adjustment. The correction is repeatable from the archive; the original rig-building script refuses to overwrite it with the previous geometry. Source textures, clip timing, resource sizes and triangle counts remain unchanged.

The focused tests now also measure the actual rendered shoe outline throughout all four clips and compare the body, weights and animations against the archived R2 candidate. Supporting-foot contact, knee direction and hand contact remain checked. Current results and hashes replace the review verification, while the earlier evidence remains archived. There are no new provider jobs or charges.

## Qualification boundary

Focused tests exercise the actual exported meshes and animation tracks: bilateral arm and elbow motion, knee direction, stable limb lengths, zero lateral foot drift, real sole contact, skin-weight isolation, source/image preservation, seed/palm contact, blending, pause, zero speed, reduced motion, recovery, interrupted loading and disposal. The browser matrix covers Chromium/Firefox/WebKit at DPR1/2, native controls, comparison and compact reduced-motion viewing. Final results and exact source hashes are recorded in the revision verification file; screenshots are supporting visual evidence, not human approval.

Additional Tripo jobs and charges: **zero**. Recorded spending remains **290 credits**, with 110 pilot credits unspent. Layout/reference approval remains valid. Corrected character Form approval is pending; no new prop approval is inferred. Production export and game integration remain blocked. Following acceptance and integration, all eight required commands, complete chapter/migration/accessibility checks and unchanged performance limits still require qualification. The existing game WebKit DPR2 p95 failure remains open. TASK11.19 stays halted at 1/75 with no provider request or ledger reset.
