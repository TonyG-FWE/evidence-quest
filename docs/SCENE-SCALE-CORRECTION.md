# Four-room scene-scale correction

Scope: ER13.06–07 / TASK11.ART02–07 / TASK11.20–21, continuing private branch `codex/first-connected` from `e1fbfda4d74a6e6250287954afdcc463657fdb92`. The dated imported [direction](design/evidence-quest-design-v3/13-experience-correction/SCENE-SCALE-CORRECTION-20260912.md) identifies the missed scale defect. Earlier functional passes do not establish visual acceptance of the former proportions.

## Actual presentation model

The camera remains 120×80. [scene-scale.json](../content/scene-scale.json) supplies one physical presentation model. Human and Loop art retains its original aspect ratio and foot anchors in every pose.

| Element | Correction |
|---|---|
| Player / Jo / Remy / Ari / Loop | Reference heights 23 / 25 / 24 / 25 / 10 units. Jo's feet are at `[37,52]`; other original actor home/standby positions remain. |
| Human approaches | Side stops 13 units from the actor, front stop 14. The child faces the actual person at arrival. |
| Ordinary furniture | Original aspect-contained artwork remains. Working height is the visible front edge above its own floor contact, not the full foreshortened image height. The Media table's support rise is about 13.8 units; benches remain lower. |
| Side and north doors | Side frames are 14×33; north frame 18×33. The foreground Media frame is 18×41, with headroom at the original `[62,66]` arrival. Room connections, thresholds and arrival identities stay unchanged. |
| Foreground occlusion | Only doorway wood directly over Loop's actual body recedes to 12% opacity inside a small rounded cutaway. Other frame pixels retain full detail and opacity. This preserves the observed source and wake response without moving the standby position. |
| Stage work area | The original decorated 58×10 panel moves up 8 units. Its own illustrated wooden support regions extend down to the original floor contact; rounded end caps are preserved. No decorated panel is vertically stretched. Left kit/rail stop `[44,70]`, right control stop `[110,70]`, with matching facing. The two extra teal outline rectangles are removed. |
| Media kit | All KIT/TILE operations while mounted, and `MD.ACCESS.E8`, use `[114,44]` facing left. The open case is separate from the child's body. The real collection transition moves the same case to the scaled hand anchor. |
| Loop | Side wake stops `[56,49]` / `[80,49]`; unchanged standby `[68,45]` and dock `[76,35]`. Trail 8, operating clearance 8, yield radius 9. Down-screen movement offsets the actual trail sideways by 9 when a legal path exists. Every normal follow step traverses the collision-checked path. |
| Carry and notes | Hand offsets and case geometry scale with the child's reference height; all directions, moving carry legs, note reach and physical transfer share the same anchors. |
| Click targets | Actual content bounds for actors; matching mounted/door/case bounds; existing 48 CSS pixel minimum and overlapping-target choices remain. |
| Projection | Screen `[38,2,114,24]`. Partial repaint is allowed only when actual scaled actor bounds clear it. The static scene, foreground panel and other source ownership remain retained. |

Ground obstacles and the player foot radius remain unchanged. Saved legal positions remain legal. The two historical Stage work positions remain valid for paused/running save compatibility while new interactions use the side stops. There is no save migration, automatic source reading, changed evidence meaning or changed successful arrangement.

## Artwork and quality

The exporter regenerates derivatives from the original accepted crops at a 12 pixel-per-unit base target and a second, source-bounded density. It never enlarges source pixels. The 52 accepted originals remain byte-identical; all 267 lossless WebP/PNG pairs have identical decoded RGBA, including transparent padding. Canonical authored content and original binding manifests match the baseline commit. Historical exports and verification remain available in Git and the dated baseline export receipt.

Two separately generated console attempts had opaque checkerboard backgrounds and were rejected; neither is imported. This implementation composes only accepted source art. A rejected request to initiate another image edit was not retried.

## Connected findings and verification

The first provisional preview intentionally used the previous density manifest to obtain timely native geometry feedback. The subsequent full-density candidate revealed two necessary follow-through repairs: the open Media case covered the child at its old front stop, and the old wake/trail positions hid Loop. The side/diagonal repairs above address those paths. Raising the foreground header then crossed Loop's lens; the localized cutaway preserves both doorway scale and source visibility.

The first 320×568 Largest/Roomier WebKit route completed the game behavior but reported an uncaught ResizeObserver delivery-loop error. The corrected layout guards identical size writes and defers resize-triggered measurements/Canvas resizing into one cancellable frame. Normal committed-state painting remains in layout effects. The failure is retained; error assertions are not suppressed.

43 contracts pass, including all 65 arrangements/five successes, cue interruption races, historical and new work-position saves, physical ownership, every changed approach, visible wake/down-screen following and projection overlap. 23 authored coaching checks pass with zero API calls. The post-resize functional matrix passes 21/21; the final Media drawing subset passes 6/6. The independent final native review passes the bounded visual correction. The [qualification ledger](../evidence/scale-20260912/qualification.json) retains exact candidate attribution across successive builds.

The final `App-qKKSVzYI.js` isolated format matrix is **9 pass / 6 fail**. All DPR1 and explicit image-retry cases pass. All six DPR2 cases exceed initial and new-room image transfer limits. WebKit DPR2 also retains its cadence gap. No detail reduction or limit change was made.

| Final DPR2 measurement | WebP | PNG | Unchanged limit |
|---|---:|---:|---|
| Startup body transfer | 4,203,498 bytes; Firefox 4,203,530 | 5,440,663 bytes | 4,194,304 WebP / 5,242,880 PNG |
| Largest incremental room art | 4,079,308 bytes | 5,989,334 bytes | 3,145,728 WebP / 4,456,448 PNG |
| WebKit active RAF p95 | 48 ms | 49 ms | 33.34 ms |

Chromium DPR2 active p95 is 16.7 ms and Firefox 18.22 ms. All recorded input, startup time, code transfer, memory, known-consumer and error criteria pass across the 12 measurements. Maxima: input 21 ms, startup 1,722 ms, code 216,002 bytes, current conservative memory 90,306,880 bytes, global conservative memory 175,421,248 bytes. These are Windows loopback/DPR-emulation results. RAF intervals are a scheduling proxy; memory arithmetic is not a measurement of total browser/GPU allocation.

The bounded visual correction is complete. TASK11.20 remains open for high-density transfer and WebKit cadence; TASK11.21 retains that dependency and its unperformed physical-device/accessibility qualifications. Historical failures remain recorded.

## Checkpoint packaging

The local parent-import receipt records numeric byte counts for all 35 sealed files. An initial metadata serialization accidentally embedded buffers; that receipt was corrected without changing imported files or historical snapshots, and the qualification reference was refreshed. Dated evidence and imported authority preserve exact bytes in Git. The parent master uses intentional Markdown hard line breaks; authored code and documentation pass their separate whitespace check. [Index verification](../evidence/scale-20260912/index-verification.json) binds original/derivative/import hashes and checks indexed text against the local credential without recording its value. Concurrent `docs/game-review/` drafts are outside this correction and its commit.

## Boundaries

Existing user/parent origins and saves on 4173/4175/4176 are preserved. Parent owns the additional fresh 4177 review; isolated automation uses 4178. TASK11.19 remains halted after exactly 1/75 provider attempts, with no model output and 74 attempts remaining. No provider retry, image generation, public deployment, publication, participant study or learning-outcome claim is part of this correction.
