# Scene-scale correction — September 12, 2026

## User direction and scope

The user identified two extra highlighted rectangles on the Stage workstation and severe character/furniture scale mismatches in Workshop and Media, then clarified: “Actually, pretty much every room has a scaling problem.” This authorizes a coherent correction across all four rooms under ER13.06–07 and their existing asset/runtime tasks. It supersedes the earlier tiny-character dimensions and only those visual bounds, hit areas, physical approaches or occlusion rules that must change to make the corrected proportions usable. It does not reopen the story, evidence meanings, educational rules or five valid arrangements.

Baseline: private branch `codex/first-connected`, commit `e1fbfda4d74a6e6250287954afdcc463657fdb92`, client App-BzEahbjQ. The previous functional tests and native observations remain historical evidence. They did not establish that the user accepted the room proportions; this feedback identifies a missed visual defect.

## Root causes confirmed in the baseline

- Item 08 §2.1 specifies a player around 12 logical units high, crew around 14 and Loop around 7–8 in an 80-unit-high room. The actor renderer implements those dimensions while furniture uses much larger independent bounds. Enlarging the whole canvas would preserve the mismatch.
- The Media table occupies `[22,19,61,41]`; Stage's model cabinet spans 23 units vertically. Working surfaces must be assessed by the visible front edge and support height above floor contact, because total image height also includes tabletop depth.
- Door sizes disagree: side frames are 16 units high, Workshop's north frame 13, and Media's south exit is an 8-unit clipped carrier. A frame representing an exit should provide intelligible headroom at the nearby character's scale.
- `paint.ts` paints two unconditional teal rectangles around the kit bay and rail: `(49,67,14,8)` and `(64,67,29,8)`. These are the extra boxes to remove. They are separate from the browser's blue comment-selection frame, the physical workstation art and necessary keyboard-focus treatment.
- Carrying, note-hand motion, Loop's docking, object targeting and Stage's projection redraw use separate dimensions/coordinates. They need the same corrected presentation rules.

## Recommended proportion model

The reconciled first-pass dimensions are player 23, Jo/Ari 25, Remy 24 and Loop 10 units. The ranges below explain their relationships; actual room review may refine routine dimensions. These are not claims of completed implementation or final user approval. Use one shared scale model and explicit object exceptions.

| Relationship | Starting target and visible check |
|---|---|
| Player | Roughly 22–24 room units high; recognizable child occupying about 27.5–30% of the full room height. Use actual image content and foot anchor. |
| Jo, Remy and Ari | Roughly 24–26 units with modest believable peer differences; the player must belong to the same human scale. |
| Loop | Roughly 9–11 units, below the child's waist. Keep its wheeled floor contact, following and raised dock placement distinct. |
| Ordinary work surfaces | A front working edge around waist/elbow height when the child stands beside it. Inspect vertical support rise separately from foreshortened tabletop depth. |
| Seating | Seat below the working-table height; back height is not seat height. |
| Full doorframes | About 1.35–1.5 player heights with sufficient width for the body. The foreground exit may be a deliberately cropped near frame, but must still communicate the same room scale. |
| Toast | The intentionally exaggerated invention may rise above a child; its supporting table and reachable controls must share the room's human scale. The single tiny slice remains intentionally tiny. |
| Portable kit and notes | Hand-sized carrying prop, with its hand anchor scaled with the player. Opening/seating it must not produce a duplicate or a discontinuous jump. |
| Stage workstation | Remove only the extra rectangles. Keep the physical kit, rail, tile faces and Show pad readable at the actual approach; prevent enlarged bodies from erasing or permanently covering required controls. |

The world camera and source art quality remain. Re-export larger derivatives from unchanged original art where needed; do not simply magnify the old low-resolution runtime frames. Current player originals are approximately 678–714 pixels high, whereas the old visible idle exports are 144/288 pixels. Record any new image transfer/memory result against the existing limits rather than borrowing the previous candidate's qualification.

## Connected correction and review requirements

1. Shared actor dimensions drive all facing, idle/walk/reach/carry/receive poses, shadows and actual pointer targets. Foot contact stays on the same ground plane; no stretching or inconsistent size between rooms.
2. Object artwork, mounted source faces, decorative carriers, collision footprints, legal stops and overlapping-target choices agree. Change only necessary physical details and document them; preserve room connections and source access identities.
3. Check approaching each work surface, talking to each NPC, all exits, carrying the kit through rooms, waking/following/docking Loop and handing the kit to Stage. Preserve unread-note ownership and normal save resume.
4. Check depth order at actual approach points. Enlarged bodies must not intersect furniture as if it were flat wallpaper. Required model/projection information and reachable source/control surfaces remain visible or available through their established inspection view.
5. Audit Stage's projection-only redraw: larger Jo or Loop can intersect the protected projection rectangle. Use actual bounds to retain that optimization only when it is safe; do not erase a head, hand or handle during cues.
6. Independently review the complete four rooms and close approaches in the running game, including a compact layout. Keep the interface's focus outline and non-drag/keyboard controls; remove the two unconditional Stage rectangles.
7. Run focused checks for the changed geometry/rendering/ownership paths. Recheck affected performance with the actual derivatives and build. Preserve historical failures and do not label this as a new learning/participant evaluation.

Parent baseline observations and paired captures belong in `scale-review-20260912/`. User save at port 4175 and the other original origins stay intact. No model request, account purchase, public deployment or submission belongs to this correction.

## Current status

Implementation and the bounded native visual review are complete on `App-qKKSVzYI.js`. [Native review](NATIVE-SCENE-SCALE-REVIEW-20260912.md) records the actual routes, intermediate defects, final fixes and capture provenance. Export/performance qualification and the ordinary private checkpoint are separately recorded by the builder; this native completion does not mark broader ER13.06–08 or participant work complete.

The implemented shared model is player 23, Jo/Ari 25, Remy 24 and Loop 10 units. Jo's home is `[37,52]`. Stage's accepted console panel moves up 8 units with illustrated supports extending to its original floor contact; side operating stops are `[44,70]` and `[110,70]`, with the legacy playback stops retained for save compatibility. NPC conversation approaches are spaced to keep enlarged bodies separate. Media mounted KIT/TILE operations approach `[114,44]` facing left; standby Loop is approached at `[56,49]` or `[80,49]`. Following down-screen adds a legal lateral offset of 9 units to the 8-unit trail where a continuous legal path is available. The original obstacles and save identities remain. The final foreground door cutaway affects only frame pixels directly overlapping Loop, preserving its visibility, canonical physical position and the full-scale doorway elsewhere.

The parent captured baseline Stage, Workshop, Media and Courtyard through actual connected navigation on a separate `localhost:4176` saved run. No user save was reset. `scale-review-20260912/before-integrity.json` records the four image hashes. These unannotated game captures independently confirm the small-actor ratios and the actual two painted Stage rectangles.

Two built-in image-generation attempts extended the console legs but failed the required alpha check: both 2097×750 outputs have 1,572,750 opaque pixels and zero transparent/partial-alpha pixels, with a baked checkerboard. They are rejected proposals, not runtime assets, and no source art was replaced. Their generated output IDs are `exec-935e3ec3-8331-4d05-9e81-06c19a6448d6` and `exec-82a9a508-ac42-4b6d-bbed-15fc66bf4fa7`. The renderer correction proceeds with the existing accepted art and must demonstrate clean illustrated supports in play. No third generation or paid provider evaluation is part of this pass.

Automatic review rejected the build task's request for a new console edit under its historical no-production-art boundary. The existing correction assigns parent image production and game-workspace integration separately. The rejected request is not retried; the game task continues the directly authorized geometry/interaction correction with existing accepted artwork. This is not an instruction to bypass an approval boundary or treat rejected opaque images as accepted production inputs.
