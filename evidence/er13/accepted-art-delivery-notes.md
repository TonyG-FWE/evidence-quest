# ER13 accepted artwork delivery

Original PNGs are copied byte-for-byte; alpha and bounds were inspected. These are accepted for integration, not a claim of final in-game visual acceptance.

Use accepted-art-delivery.json for exact paths, hashes, source rectangles and feet anchors. The character sheets have uneven spacing: DO NOT split into equal columns. Render explicit sourceRect values with native aspect ratio; align feetInCrop to the existing logical feet point. Use referenceStandingHeightPixels to keep kneeling or gesturing poses at the same scale as standing. Do not stretch puppets to fit the 100x100 logical story projection.

## Initial delivery
- ASSET.ACT.JO / jo-poses-v1: 2172x724 RGBA.
- ASSET.ACT.ARI / ari-poses-v1: 2172x724 RGBA.
- ASSET.ACT.REMY / remy-poses-v2: 2170x725 RGBA.
- ASSET.PUP.PIP / pip-poses-v1: 2172x724 RGBA.
- ASSET.PUP.GRANDMA / grandma-poses-v1: 2172x724 RGBA.
- ASSET.ENV.CY.BACKPLATE / courtyard-backplate-v1: 1536x1024 RGB.
- ASSET.ENV.WK.BACKPLATE / workshop-backplate-v1: 1536x1024 RGB.
- ASSET.ENV.MD.BACKPLATE / media-backplate-v1: 1536x1024 RGB.

The four poses per crew character are distinct narrative reactions, not a walk cycle. Pip and Grandma planting poses require separate seed and backpack layers. Runtime may mirror sprites where the action requires facing the other direction.

Unaccepted raw files (especially printed checkerboards) must not be installed. The cumulative delivery described below supersedes the initial production status.

Prompt provenance: available exact generation/edit prompts are in art-inputs.json. Earlier actor prompts are summarized in their asset identity and pose specifications; no reconstructed text is represented as an exact original prompt.

## Completed source production — 2026-09-12

The cumulative JSON contains 36 accepted PNG sources plus the separately delivered `art/stage-backplate-v1.png`. Later batch input and inspection records supply exact prompts, hashes and crops. Only the accepted cumulative manifest is an integration list.

The additional sources include player walk frames facing right/front/back (mirror right for left); rich Loop; separate Stage cabinet/board/console/dock; Courtyard bench/board/stand; Workshop bench; Media table/rack; paper backpack/boat/seed/roots/bud/flower; six separate Toast components; and an open/closed case, blank leaflet and envelope atlas. The three opaque paper-material swatches have explicit sky/grass/river crops and stay inside original story geometry.

### Transparency correction

The initial batch-04 inspection incorrectly rejected four true-alpha assets because their maximum opacity was 254 rather than 255. The criterion now permits maximum opacity of 250–255 while requiring fully transparent outside pixels. Source pixels were not modified. The built-in image tool alone generated/edited imagery; inspection scripts read metadata/bounds and copy original bytes. RGB checkerboard backgrounds remain rejected.

### Integration details

- Preserve native aspect ratio and explicit source rectangles. Caddy and some actor sheets have uneven spacing. Clip frames to prevent adjacent sprites leaking into the drawing.
- Aspect-fit furniture and props rather than using character standing-height scaling. Actor foot anchors and reference standing height keep poses at a stable scale.
- Anchor the flower and bud at the bottom of their stems. Roots appear below the soil after planting. The growing flower must remain visible above the kneeling puppets.
- The open caddy includes its hinged lid; do not overlay the whole closed case. Its native tiles and source access remain independent. Painted empty compartments/pockets do not expose E6/E7. Mounted and portable copies retain one canonical source identity.
- Toast BODY already includes its wooden table. The cover, arms, tray, ONE tiny slice and magnifier are independent layers. Magnification must not create an extra snack or evidence item.
- Loop has one illustrated base drawing with runtime lens/beam/wheel/position changes; do not describe it as a generated multi-frame animation.
- Native text retains all decisive source wording. Backgrounds must not paint Loop into an empty dock, a collected caddy onto its shelf, or a successful puppet outcome before its cue.

## Runtime acceptance boundary

The existing build task owns integration and its review ledger. Parent native review has confirmed the new cast/walk movement, Stage fixtures/readable model view, and recognizable closed Toast machine/table/cover. Final caddy, planting/flower, full Toast reveal, compact composition and TASK11.17 are undergoing integration/review. Source production completion does not by itself close experience acceptance.
