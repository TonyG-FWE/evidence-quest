# TASK11.ART02–06 amendment: Pip restart, Tripo only

Date: 2026-09-17. Existing workspace/branch: `codex/first-connected`, base `7cc938a10bb52226a7a13493b64828eccf9c53d2`. This follows Tony's explicit Pip-only restart instruction and supersedes the failed local Pip candidate. It does not restart the broader task sequence.

## Result and review boundary

[Interactive model and movement review](http://127.0.0.1:4318/pilot/pip-tripo-restart-20260917/index.html). Tony's model Form and movement approval is **PENDING**. The approved reference remains approved. No production integration or other character work occurred.

The source image is `evidence/hands-on-20260916/pilot/reference-library-20260917/images/pip-r1.png`, SHA-256 `5a265f5f80e6c1aa1ae1cb281f8c3f80d782d91fe73f527585f1829ca00cad48`. The file is unchanged. It was supplied directly to Tripo with image autofix disabled.

The previous locally modified candidate remains at `evidence/hands-on-20260916/pilot/articulated-library-20260917/models/pip/pip-review.glb`, SHA-256 `f260c2e24f7ab4d980ac81157c5137158108be09dc449ccf6dfaaeb6baa4d5b4`. The former manifest was preserved before marking Pip rejected and superseded. None of that model's geometry, weights, skeleton or clips were reused. Other prior library assets were not changed.

## Sequential Tripo production and actual charges

| Operation | Task ID | Credits | Outcome |
|---|---|---:|---|
| P2 mesh and standard PBR | `25e4f034-1fb9-46d8-97c2-df66f27a99bd` | 110 | SUCCESS; untouched result inspected before rigging |
| Free rig check | `39bd5a1b-8660-4510-b8f7-afd6787a2aa9` | 0 | SUCCESS; riggable biped |
| Humanoid rig | `7ec8dbfc-54b0-4792-b7a8-d93d773afb74` | 25 | SUCCESS; inspected before animation |
| Idle and walk | `8200d5a4-0b61-4af7-a76b-427bf8c1cc79` | 20 | SUCCESS; geometry included, animation in place |

Generation explicitly selected `P2-20260801`, `texture_quality=standard`, `pbr=true`, `texture_alignment=original_image`, `enable_image_autofix=false`. No imposed face limit: Tripo returned **5,291 triangles**. Direct GLB output incurred no conversion charge.

The rig submission explicitly requested `model=v1.0-20240301`, `rig_type=biped`, `spec=tripo` and GLB. The returned task input omits the model-version field; the exact submitted CLI arguments are retained. Native `preset:biped:idle` and `preset:biped:walk` retargeting succeeded. The delivered rig contains **41 joints**. Idle lasts **15.375 seconds**; walk lasts **2.375 seconds**; each has 126 animation channels.

Published [P2 pricing](https://developers.tripo3d.ai/en/docs/changelog) and [rig/animation pricing](https://developers.tripo3d.ai/en/pricing) were checked before submission. This attempt used exactly **155 credits** from corrections. Cumulative spending is **895/2,500**, with **1,605 available, zero frozen, zero unresolved**. No paid retry, reroll, subscription or format conversion. Full records are in `evidence/hands-on-20260916/tripo-ledger.json`; requests, CLI results, task details and receipts remain in the review directory.

## Exact output bindings

All paths below are relative to `evidence/hands-on-20260916/pilot/pip-tripo-restart-20260917/`.

| Delivered file | SHA-256 |
|---|---|
| `generate/tripo-out/pip-p2-restart-25e4f034/model.glb` | `771132f8bed6beb32eb00efaa06fa7454b4a12279719b1bcf632fe5f6c125248` |
| `rig/tripo-out/rig-3-7ec8dbfc/model.glb` | `550997ba89756dd8bbcff727496b2d762e094618b5cad0a3aa55fa3ad57936e3` |
| `animate/tripo-out/retarget-3-8200d5a4/model.glb` | `2ce7a6ac97437cab35fdee7eb58572f775d0f934f0e5d8afe8323f47554ca740` |

No delivered file was locally rewritten. Color, ORM and normal texture bytes are identical across all three stages; their individual hashes and sizes are in `manifest.json`. Provider originals, previews and settings are retained.

## Playback and bounded verification

The existing Three.js review approach is restricted to GLTFLoader and AnimationMixer playback. Native controls select provider outputs, clips, camera sides, hand close-ups, normal/half/quarter speed, pause, cycle position and skeleton overlay. SHA-256 is verified on each model load. Replaced resources and page-close resources are disposed. The viewer does not use the prior character adapter or procedural limb overrides.

The viewer uses an outer-group uniform display scale/position so files with different native origins can be compared. For a playing clip, it chooses one constant floor offset from the clip's bounds. **It never corrects an individual foot, changes a bone transform outside native clip playback, edits a keyframe or modifies the model.** Consequently, native foot-contact variation remains visible. This is a viewing transform, not a local model repair or re-export.

`scripts/verify-pip-tripo-restart.mjs` passes provider/reference/rejected-file integrity, identical texture bytes, exact charges and clip identity. It samples each clip 128 times: matrices/bounds stay finite and both upper arms and feet move. These numerical checks do not establish correct anatomy, natural walking, locked supporting feet or enjoyment. Exact results: `verification/asset-checks.json`.

The in-app browser displays the approved image and both model panels with original textures. Native clip/camera selection, pause/resume, quarter speed, keyboard cycle scrubbing, hand close-ups and skeleton overlay were exercised. A separate inspection tab avoided disturbing the main review view. Retained observations and screenshots: `verification/browser-review.json`. Viewer JavaScript syntax checking passes.

Observed review limitations:

- Tripo supplies left/right hand joints but **zero independent finger or thumb joints**. Finger gripping/pinching cannot be claimed.
- Carrying, handoffs, turns and scene-specific actions are not provided by this idle/walk job and were not fabricated locally.
- The image's finer paper grain is softer in the generated model. Appearance acceptance remains Tony's decision.
- Native walking retains some vertical foot-contact variation; no corrective foot locking or custom gait was introduced.
- The review preserves complete silhouettes, separated arms/legs, backpack, clothing and original textures. Browser observations and screenshots supplement, rather than replace, owner review.

This is an isolated asset review. The eight game regression commands and the full browser/game qualification matrix are **NOT_RUN for this checkpoint**; no gameplay code changed. Prior recorded WebKit DPR2/studio transfer failures remain open. TASK11.19 remains halted at **1/75**, without a request, retry or ledger reset.

## Next dependency

Tony reviews this single Pip's appearance and Tripo movement. No remaining cast work or gameplay integration proceeds under this checkpoint. No further paid job is pending or scheduled.
