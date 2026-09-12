# Item 08 — art, text and font provenance

**Created September 11, 2026.** This record identifies the material used in the visual design packet. It does not replace the later individual asset manifest or establish a blanket license for future production assets.

## Current illustrated revision — September 11, 2026

The user supplied two images and explicitly requested white Jo and the same illustrated quality for the actual game's aesthetics. Their attachments are preserved unedited as [cast quality input](reference-inputs/USER-CAST-QUALITY.png) (SHA-256 `705887944FD0CAA8C7A624A76A2763D90DFE93283A9B1D94CD9D0096D6730865`) and [Stage quality input](reference-inputs/USER-STAGE-QUALITY.png) (SHA-256 `0946E8DB5C275289288B8224DB5D3668ADD7E242583159080C0BC65C5EEFF798`). These are the user's supplied files, not a newly sourced outside game or licensed asset pack. No byte-identity claim is made between those clipboard copies and earlier tool outputs.

The following current images were created with the built-in image-generation tool, inspected and copied here without raster editing. Exact prompts are preserved in [ILLUSTRATED-REVISION-PROMPTS.md](ILLUSTRATED-REVISION-PROMPTS.md). The cast edit used the user's cast input. The first Stage pass used the user's Stage, revised cast and existing functional scene constraints; a second pass corrected the miniature's Pip and caddy note placement. Courtyard and Workshop used their existing functional room diagram plus the revised Stage/cast; Media used the same reference chain. The paintings guide appearance, while Item 05 and the functional diagrams retain exact bounds. All source text and usable controls remain separate production layers.

| Current reference | Dimensions | SHA-256 | Original tool-output filename |
|---|---|---|---|
| [Revised cast](V08-CAST-ILLUSTRATED.png) | 1774 × 887 | `D656E38F3E9986DEF76D30C233E2FDE5DC1C2442BB13556C6F41BE9CF5BABB66` | `exec-db78e0ca-fe69-463a-afff-284bc8d4a5a4.png` |
| [Stage](V08-STAGE-ILLUSTRATED.png) | 1536 × 1024 | `5078BA1105350E500CDAD1939CAC951E456D4E58B9EDFE77C52CA96F1FF526BA` | `exec-57652abb-b2a0-4940-acd3-2f5c5993c304.png` |
| [Courtyard](V08-COURTYARD-ILLUSTRATED.png) | 1536 × 1024 | `9704698BC3A15590D3B94527CA4A1F3A2E06E815F1E9C6C067FA123F04739A0C` | `exec-e8976645-a03c-4378-ab3f-dc26bd182991.png` |
| [Workshop](V08-WORKSHOP-ILLUSTRATED.png) | 1536 × 1024 | `4BD15ADDCB0E6D9B3888683762FAF664770D79CCC501B830C9170E946A1E5B96` | `exec-312aa59b-84b0-4f7d-b54c-7a49cc5c3a9b.png` |
| [Media](V08-MEDIA-ILLUSTRATED.png) | 1536 × 1024 | `B9454F42BDF0CD8CF2C392A7552B66EE74CA969160A7FD0CDFC51D2E2DFADDB7` | `exec-c0e5f4fb-1594-43da-9305-be499dbb614d.png` |

The original tool outputs are in `C:\Users\TonyGuillaro\.codex\generated_images\01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1`. The intermediate `V08-STAGE-ILLUSTRATED-CANDIDATE.png` came from `exec-ec0c2667-9d16-4f50-b7fe-12a4cd7e6156.png`; it is retained as an intermediate only and is not in the current gallery/register. Jo's shared vector-diagram skin/hair colors were also revised so the functional examples no longer contradict her new appearance.

## Functional diagrams and historical material

| Material | Origin and role | Included output |
|---|---|---|
| Historical original cast sheet | Created earlier in this task with the built-in image-generation tool, using the original prompt below without reference inputs. Now superseded by the user's white Jo revision and excluded from the current gallery/register. | `V08-CAST-ORIGINAL.png`, 1774 × 887. SHA-256: `6A44171CA83A892EF275815ABD7D1A4386EC0EA4551160F5B557F12EADC608B6`. |
| Functional cast, rooms, props and paper story diagrams | Authored vector shapes based on the cast brief and Item 05's physical plans. Shared definitions repeat silhouettes in the scene/consequence diagrams. Their reduced detail is functional notation only; the five illustrated references now govern final art quality. | The 105 `V08-*.svg` functional compositions and matching PNG renders, excluding review overview/contact sheets. |
| Icons, arrows, tile faces, frames and feedback marks | Original geometric drawing in the compositions: no external icon library or copied interface kit. | Included in each applicable SVG/PNG composition. |
| Exact clue, control, caption and response text | Taken from `07-COMPLETE-CHILD-FACING-CONTENT-AND-REFERENCES.md`, with its real bounded substitutions. Handled as separate typeset text, not generated lettering. | Per-artifact CT references in `ARTIFACT-REGISTER.md`; all-state bindings in `STATE-CROSSWALK.md`. |
| Example player text | Explicit review fixtures, such as “The seed got there, so the promise is done.” and the separate ambiguous “It goes there.” These are neither actual child records nor default answers. | Fixture context documented in the artifact register and main specification. |
| Gallery and contact sheets | Static review navigation and compositions of the included references. Controls drawn inside the images are not executable. | `index.html`, `V08-OVERVIEW.*`, `REVIEW-CONTACT-01` through `08`. |

The image tool originally returned the included cast image at:

`C:\Users\TonyGuillaro\.codex\generated_images\01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1\exec-6807bf9b-c96e-47e0-b333-c8ace97b50ea.png`

The historical original was copied into this design directory without cropping or repainting. The SVG cast diagram is a separately authored drawing, not an edited raster export. Future art must preserve the current illustrated identities, including white Jo, clothing, backpack and physical scale. It must fit the established geometry before becoming a production asset.

## Historical original cast-generation prompt — superseded Jo appearance

The following is the actual earlier prompt. It is retained as provenance, not an instruction for future Jo artwork. Use the revised cast and new prompt record above for her current appearance:

> Create an ORIGINAL cohesive art-direction cast sheet for Evidence Quest, a contemporary maker-festival adventure game for ages 9–12. Landscape reference sheet, warm ivory untextured background. Seven full-body designs in an evenly spaced lineup, every body fully visible, no cropping, no labels, NO lettering. LEFT TO RIGHT: 1 player child age11 medium-brown skin short rounded dark curls, mustard yellow overshirt open over teal t-shirt, cobalt trousers, coral red sneakers, approachable curious expression; holding in one hand a tiny coral-red paper backpack with yellow square patch and single diagonal cream stitch. 2 Loop: small friendly functional portable projector robot on two short roller feet, cream rounded rectangular body, teal lower casing, ONE large navy circular lens on face, tiny coral side button, a teal carry loop/handle overhead; reaches child's hip, calm standby not broken. 3 Jo: child age12, dark brown skin, black hair in two high puff buns, teal overalls over coral t-shirt, cream sneakers, one palm presenting warmly, upright confident stage-captain silhouette. 4 Remy: child age11 light tan skin, short side-swept ginger hair, deep purple oversized hoodie, navy shorts and cobalt high-top sneakers, holding a plain small tablet with blank screen, curious slightly puzzled face, no detective accessories. 5 Ari: child age12 warm olive skin, black straight bob ending at jaw, cobalt short-sleeve shirt with coral collar, mustard cargo trousers and cream sneakers, hands casually open. 6 Pip: visibly CUT PAPER puppet miniaturized character with rounded ochre head and short black paper hair, teal tunic, navy short legs, coral-red backpack with yellow square patch and single diagonal cream stitch, paper tabs at arms, exactly recognizable backpack to player-held model. 7 Grandma: CUT PAPER elderly puppet with warm brown face, cream short rounded hair, coral cardigan, plum ankle-length skirt and little teal shoes, open welcome pose. Physical children occupy same height except stated. Paper characters displayed at 70% children height on sheet for legibility; clearly flat layered torn-card edges rather than flesh. World cast style: premium contemporary 2D game illustration, confident broad clean color shapes, subtle colored outlines, tiny cel shadows, expressive simple faces, clear charming silhouettes, not chibi, not preschool, not pixel art, not watercolor, not futuristic, not a franchise imitation. Near frontal three-quarter view looking slightly from above, modest depth, no perspective distortion. Palette navy #18324B, teal #147D83, coral #E9725C, sunflower #F3C65C, cobalt #3867D6, plum #704F89, paper #FFF9E9. Equal gentle upper-left light. This is the actual recommended character design, not a moodboard. No scenic background, title, captions, UI, logos, or extra characters.

## Earlier Stage layout rejection and subsequent aesthetic selection

A Stage paintover was generated during exploration but changed figure proportions/placement and omitted necessary note tabs. It was initially rejected as a governing scene design. The user later supplied a Stage image and explicitly chose that rich illustrated finish as the aesthetic target. The original candidate remains historical as a layout; the revised Stage listed above is the current appearance reference. The earlier tool output was:

`C:\Users\TonyGuillaro\.codex\generated_images\01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1\exec-9f1cc6d8-50da-4707-9012-76c45c26908e.png`

Preserve the user's chosen quality while using the corrected cast/Stage and current room references. Exact positions come from Item 05 and the functional diagrams. This revision supersedes the earlier recommendation to use the simple cast reduction as final art; it does not change the game's physical or educational rules.

## Fonts and standards sources

The compositions used **Segoe UI Regular/Bold installed on this Windows host**, with the named fallback stack `Segoe UI, Arial, sans-serif`. The font files were not copied, embedded, converted into a distributable font or supplied as a webfont. The actual PNG renders use the installed font; source SVG text remains editable and can render differently on a machine without it.

Microsoft's FAQ distinguishes using installed fonts to render graphics from distributing the font software. It also permits specifying Windows font names in a CSS stack, while redistributing/self-hosting the actual font requires the appropriate rights. This packet therefore supplies rendered designs and a named stack, not font binaries. Item 09 must address fallback metrics or select appropriately licensed production fonts if the eventual platform requires them. [Microsoft font redistribution FAQ](https://learn.microsoft.com/en-us/typography/fonts/font-faq).

Contrast measurements use the documented relative-luminance method and the reference thresholds described by W3C. Only the seven listed color pairs were measured. This is a design measurement, not WCAG conformance certification or assistive-technology testing. [W3C contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [W3C non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

No downloaded stock artwork, external icon set, audio recording or borrowed game interface is included. No claim of exclusivity or universal production clearance is made for generated output. The final submission/production asset record remains Item 10/16 work.

## Authoritative document snapshot

The following source files were read and left unchanged during Item 08. These hashes identify the design foundation used; they do not identify a game implementation.

| File | SHA-256 |
|---|---|
| `Evidence-Quest-Complete-Game-Specification-v3.md` | `6CFB0958C7D6DEEC52B485058197B93EF4297E3F8E087A7874A9AAE3FA70AB16` |
| `05-FUNCTIONAL-SCENES-AND-INTERACTIONS.md` | `3FDB67267E23A12573547B3031C2678EAB774EA7B91E6A8FB07048001B5D0A61` |
| `06-COMPLETE-INTERFACE-AND-PLAYER-FLOWS.md` | `04BA8831C38FD3B7FB3E74A3BA68A5DEE20AB0340AEB7B0064D79180B4AF10D8` |
| `07-COMPLETE-CHILD-FACING-CONTENT-AND-REFERENCES.md` | `8485C42AADF34A8226A1157CA37FC54A5EFF865247C578850408BF9DDDE1BEBE` |

The Master Checklist is the only earlier document updated in this task: Item 08 evidence and necessary next-step pointers. Later completion statuses remain unchanged.
