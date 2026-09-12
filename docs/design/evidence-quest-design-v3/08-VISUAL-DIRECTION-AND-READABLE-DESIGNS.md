# Evidence Quest — Visual direction and readable designs

**Checklist Item 08 · September 11, 2026 · Defined as visual design.**

The user-selected target is a richly illustrated, warm contemporary maker festival: expressive modeled faces, fabric folds, painted wood grain, layered paper, soft light and visible depth. Jo is a white girl with fair peach skin and dark-brown hair in two buns, retaining her coral shirt, teal overalls, age and role. A visible child walks among physical tables, paper models, crew members and open doorways. The same handmade paper characters then perform the child's arrangement on the Stage backdrop. Reading surfaces open temporarily over that place; the rehearsal keeps the place and both riverbanks visible.

**Start with the [visual gallery](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/08-visual-designs/index.html).** It now leads with the revised illustrated cast and all four illustrated rooms. These establish the intended quality of the actual game. The simpler references follow in clearly labeled functional-diagram groups. Open an individual image at its full dimensions for review; thumbnails and contact sheets are indexes, not legibility samples.

The packet contains 110 current registered references: five illustrated quality references and 105 functional diagrams, including clean/annotated room pairs, critical-state variants, storyboards and compact scroll companions. The earlier cast and Stage candidates are retained only as historical provenance, outside the current register. This is a static design packet. The pictured controls do not operate a game. No case progression, AI service, prototype, production asset set or runtime has been built.

## 1. Authority, decisions and use

The Master Checklist and v3 specification establish the game. Item 05 owns room geometry, physical approaches, object milestones and source access. Item 06 owns the 93 interface states, 121 named transitions, focus and interruption rules. Item 07 owns exact text, display conditions, character knowledge and assistance boundaries. This section supplies their visual treatment.

Read this document with the [artifact register](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/08-visual-designs/ARTIFACT-REGISTER.md), [state crosswalk](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/08-visual-designs/STATE-CROSSWALK.md), and [transition crosswalk](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/08-visual-designs/TRANSITION-CROSSWALK.md). A shared reference supplies a visual pattern; its sample source, arrangement or player sentence must not be copied into another state. The crosswalk gives the differences and canonical content for every state.

| Decision class | This section's treatment |
|---|---|
| Existing requirements | Fixed camera; four connected rooms; visible avatar; legal physical approaches; no reading/explanation gates; correct-first, cancellation and Media-first routes; exact source meanings; five valid plans; optional help; truthful saving and recap. |
| User's visual revision | The supplied cast and Stage illustrations set the required illustrated fidelity for the actual game. Replace Jo with a white girl. This supersedes the earlier recommendation to use the simplified cast reduction as finished game art. The user's choice establishes the direction, not approval of every new generated pixel. |
| New visual decisions | Apply the chosen finish consistently across the four rooms, cast, props and supporting surfaces. Retain the existing palette roles, exact text layout, focus/selection marks, readable type sizes, compact layouts and restrained motion. Generated room paintings guide appearance; exact geometry remains in 05 and the functional diagrams. |
| Corrections to this section | Listed in §9. No room geometry, canonical source, character-knowledge rule or puzzle rule was changed. Items 05–07 and v3 remain unedited. |
| Later work | Runtime, native controls, data and service contracts in 09; individual asset requirements/exports in 10; integrated build packet in 11. These references do not complete those items. |

Author notes such as fixture order, logical coordinates, frame number on a storyboard, or “review example” sit outside the represented game view. Annotated room images and five-plan comparisons are review boards, never screens offered to the child. Earlier rejected prototypes are not part of this target.

## 2. The concrete visual system

### 2.1 Shapes, camera and physical space

Use the illustrated finish in `V08-CAST-ILLUSTRATED` and the four `*-ILLUSTRATED` room references: expressive eyes and brows, softly modeled faces, individual hair groups, coherent garment seams and folds, painted wood grain, subtle paper fibers and layered cut edges. Furniture has convincing thickness and contact shadows. Body and hand positions remain readable during actions. Material detail supports recognizable objects without adding markings that resemble controls. Broad flat vector figures and minimally shaded diagram furniture are insufficient as finished game art.

The illustrated camera looks slightly down onto furniture tops, approximately 30–35 degrees below a horizontal view. This is a drawing convention, not a proposed 3D camera or coordinate transform. Screen-left remains left. The fixed Item 05 screen-relative plan governs placement, occlusion and navigation. Furniture can gain a colored front edge within its visual bounds; it cannot acquire a new collision region.

Every room retains its 120 × 80 logical frame. Walkable floor is a continuous warm field with low-contrast seams; the through-route at y58–62 stays clear. Table legs and shadows end at their surfaces, so a shadow never looks like an obstacle. Open door frames use the same teal edge, pale opening, large direction arrow and room name. Characters do not stand over the doorway hit area. No ambient particle effect spans a route or disguises an exit.

| Reference | Actual composition and scale |
|---|---|
| Illustrated room | 1536 × 1024; full-room appearance reference. Painted proportions and locations are approximate, not a coordinate measurement. |
| Clean functional room diagram | 1440 × 960; full 120 × 80 room at 12 pixels per logical unit. |
| Annotated room | 1440 × 1040; room at 10 pixels/unit, with a separate numbered legend and coordinate note. Legend type is review annotation, not game text. |
| Main exploration | 1440 × 960; room at (150,80), size 1140 × 760, 9.5 pixels/unit; goal above, captions and actions below. |
| Desktop workstation | 1440 × 960; complete room at (255,62), size 930 × 620, 7.75 pixels/unit; work band at y692–940. The band does not cover the room or projection. |
| Smaller laptop | 1024 × 768; complete overview at (12,164), size 654 × 436, 5.45 pixels/unit; named actions beside it. |
| Compact world | 390 × 844; complete room overview 390 × 260, 3.25 pixels/unit; navigation and current objective below. |
| Compact Watch | 390 × 844; whole paper stage 350 × 231, followed by the factual caption and reachable run controls. Both banks remain in the same view. |

The player is about 12 logical units high, the crew about 14, and Loop about 7–8. Feet retain Item 05 anchors. The enlarged cast sheet is a comparison plate, not a literal room-scale lineup: Loop and the paper puppets are enlarged for inspection. Item 05 and the clean functional room diagrams govern in-world scale. The new paintings must be adapted to those exact bounds when layered production assets are made; their larger figures or decorative edges do not revise geometry. On compact overviews, the avatar remains a visible silhouette while named controls provide dependable targeting.

The physical festival has wood fronts, thick paper and teal equipment. Its projected story uses visibly flat cut-paper silhouettes: layered banks, a simple blue river, torn footbridge ends, folded boats and a warm lantern-flower. Both share the palette and upper-left light. A projected character has no shadow on the physical floor and cannot be dragged out of the story.

### 2.2 Palette, lighting and contrast

`V08-DIRECTION` demonstrates the palette and interaction treatments. The art uses related material tints; use the measured control colors below for text and controls rather than copying an arbitrary lighter illustration tint.

| Role | Value | Use |
|---|---|---|
| Ink | `#18324B` | Body text, names, essential outlines and captions. |
| Control teal | `#14646B` | Filled primary action with warm-white text. |
| Paper | `#FFF9E9` | Reading field and quiet outer background. |
| Warm white | `#FFFEFA` | Task surfaces and ordinary controls. |
| Sunflower | `#F3C65C` | Selected tile/control, paired with a bracket and label. Also a material color; it is not a correctness award. |
| Coral | `#E9725C` | Backpack, crew clothing, boat folds; never the sole error code. |
| Cobalt / plum | `#3867D6` / `#704F89` | Cast differentiation and restrained secondary art. |
| Mint / pale | `#D9EFDF` / `#ECF1F3` | Calm supporting fields / unavailable control fill. |
| Secondary text | `#425B6D` | Provenance, current context and secondary instructions. |
| Boundary | `#657989` | Control and reading-surface edges. |
| Keyboard focus | `#224FC4` | Outer focus ring, separated from the selected object's fill. |
| Wood / wood light | `#DBAA77` / `#EEC69D` | Tables and structural paper-model supports. |

Use the paintings' soft upper-left light, subtle face/material shading and believable warm contact shadows. The 12% navy shadows in functional diagrams are notation, not a cap on painted depth. The task-surface backdrop veil is 28% ink; the source remains on an opaque light surface. Scene tinting may be decorative, but text always has its own stable background. Flower light is a translucent warm wash extending over **both** banks; it never whites out the seed, roots or faces.

Measured sRGB design contrast: ink/paper **12.51:1**; ink/warm white **13.03:1**; warm white/control teal **6.79:1**; secondary text/warm white **7.06:1**; focus/paper **6.70:1**; ink/sunflower **8.17:1**; boundary/warm white **4.48:1**. These are seven specific color pairs, not a claim that every possible overlay or runtime state was audited. The reference thresholds used were 4.5:1 for ordinary text, 3:1 for large text, and 3:1 for relevant non-text control information. [W3C text-contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [W3C non-text guidance](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

### 2.3 Typography and exact source treatment

The composition uses installed **Segoe UI Regular and Bold**, with `Arial, sans-serif` as named fallbacks. No font binary is included. This is the measured visual target; cross-platform fallback metrics must be checked when Item 09 chooses the runtime. Font provenance and the limits of the proposed use are in `08-visual-designs/PROVENANCE.md`.

| Text role | Actual reference sizes | Treatment |
|---|---|---|
| Room / task heading | 28 / 32 px | Bold; one clear heading per owned surface. |
| Desktop body | 24–31 px | Usually 1.5 line spacing; source body typically 29 px with 44–46 px leading. |
| Desktop metadata | 21–23 px | Secondary ink, separate from source body. An event time is labeled by its type. |
| Desktop control | 20 px common; 17–19 px in dense secondary strips | Bold. Compacting a strip changes layout before changing these specified sizes. |
| Desktop consequence caption | 23–26 px, with larger primary workstation statement | Below the complete room/story, on an opaque field. |
| Compact Largest body | 36 px | 24 px base × 150%; Roomier source leading 67.5 px (36 × 1.5 × 1.25). |
| Compact Largest controls | 30 px; some compact world header controls 27 px | Wrapped where needed, with taller controls. Source/plan/help Close and Return controls stay visible at their stated sizes. |
| Compact heading / metadata | 30 px / 27 px | Headings wrap; a long title never shares the same horizontal space as Close. |

Regular/Larger/Largest retain the 100/125/150% settings from 06. Roomier adds 25% to base leading. Required copy reflows vertically; it is never reduced to preserve a fixed card height. Compact `*-FULL` images are the entire scroll body with its owning header/footer, not a claim that the entire source fits in an 844-pixel viewport. The matching TOP/END or viewport images show what is actually visible at once.

All decisive production text is separately typeset from Item 07. Generated lettering is not used as a production clue, control or caption. The illustrated Courtyard contains the visible word CANCELED as a depiction of the existing curled state; replace that raster lettering with the exact canonical text layer in production. Other illustrated source faces remain blank/unread. A folded in-world paper is a shape until the physical readable state permits exact text. Large readable text uses the reader; enlarging E2's photograph preserves its crop. Sources retain sentence order, conditionals, negation and the actual word “together.” No highlighted phrase, checkmark or alternate simplified source is supplied by default.

### 2.4 Interaction hierarchy

| Situation | Visual treatment and response |
|---|---|
| Available action | Opaque light button, ink edge and concrete verb: “Pull the story tab,” “Flatten notice,” “Wake Loop,” “Collect story tiles.” On focus/selection, an in-world bracket identifies the owner. |
| Selected target | Ink outline/bracket around the actual object; gold selection for a chosen tile or frame. The selection persists until replaced/canceled, without implying correctness. |
| Keyboard focus | 3 px cobalt-blue outer ring with a light gap. It can coexist with gold selection; see compact Arrange and the New game safe action. |
| Active primary control | Dark teal with warm-white text. Labels retain their actual mode: Continue rehearsal / Continue premiere. |
| Unavailable action | Pale fill, visible ink label and the exact local reason. E2 Previous frame at frame 1 says “This is the first frame.” No color-only disable. |
| Read-only scenery | No button fill, focus bracket or pointer-only secret. The projected seed/characters are readable state displays, not additional puzzle pieces. |
| Ordinary discovery | Local physical endpoint and factual caption. No burst, clue score, answer tick or forced evidence form. |
| Unmet Hill/Flower | Hold the actual paper state; show the factual sentence and Continue/Restart/Arrange/Notes/Help options. No shake, red grade or lost materials. |
| Rehearsal success | “This arrangement is ready for the premiere.” The existing Show pad becomes the eligible Launch/Replay action. |
| Premiere completion | Complete paper-story illumination and crew response tied to the backpack; skippable aftermath and factual recap. No learning score. |

World buttons are at least 50 px high in the desktop compositions; compact controls are generally 58–70 px or taller when wrapping. Item 05's expanded 48-CSS-pixel world targets and explicit overlapping-target chooser remain required at implementation. A large painted icon alone is not an accessible target.

### 2.5 Required quality across gameplay and supporting views

The selected finish applies to the actual explored world and its moving/changed states, not only to a title screen, cast portrait or promotional image. A builder must use the illustrated references alongside the exact functional diagrams. The diagrams alone cannot meet the user's visual requirement.

| Surface | Required finish at its intended game size |
|---|---|
| Walking and interacting cast | Same face, hair silhouette, proportions and outfit as the illustrated sheet; modeled features and coherent folds/shading remain present. Poses change without substituting a simple icon person. |
| Rooms and interactive props | Illustrated wood grain, paper layering, furniture thickness and contact shadows remain consistent as a lid opens, notice flattens, item moves or character approaches. New asset states must not become visibly cheaper than their idle version. |
| Projected story | Tactile flat paper characters and props, including cut edges and overlapping layers; the scene still makes the seed, Pip, Grandma and both banks readable. It retains the paper medium even while the physical festival has painted depth. |
| Sources and supporting interfaces | Carefully drawn paper/wood/teal edges and restrained depth around quiet opaque reading fields; exact text, captions, selection and focus are separately rendered. Decorative texture never crosses decisive wording or imitates an available action. |
| Compact overview and enlarged text | Preserve material/character identity in the whole-room overview. Provide the existing named actions and complete Watch view for legibility; no alternate cheap art set or automatic solution assistance. |

Before a later asset is treated as finished, inspect it at its intended scale beside these five references: facial/clothing identity must match, material detail must be coherent, light/shadows must connect objects to the room, mandatory objects must remain recognizable, and text/focus must remain clear over the artwork. This is the acceptance target for later asset production, not a claim that layered animation assets or device validation already exist. A representative initial room and one changed state must meet this finish in the connected build before it is presented as visually complete.

## 3. Cast and essential objects

`V08-CAST-ILLUSTRATED` is the current character appearance and drawing-quality reference. `V08-CAST` and the recurring simple figures are functional silhouette/pose diagrams only; they have been updated to match Jo's new skin and hair colors. Do not use that simplified treatment as finished game art. Preserve the illustrated identities and detail across world movement, conversations, object actions and ending reactions. `V08-CAST-ORIGINAL` is historical and superseded by the user's requested Jo revision.

| Character / object | Recognition and representative action |
|---|---|
| Player | Rounded dark curls, mustard overshirt over teal, cobalt trousers, coral sneakers. Upright curious stance; operating arm, presentation hand and walking destination are clear. Opening identity cue attaches to this character, not a dialog portrait replacing the avatar. |
| Loop | Cream rounded body, one large navy lens, teal lower housing and carry loop, short roller feet, small coral side button. Standby is calm and usable. Following aligns the feet and faces the player; docking settles in the existing pad; projecting adds a soft beam. No sparks, damage icon, missing battery or repair prop. |
| Jo | White girl, fair peach skin, brown eyes and dark-brown hair in two high buns; teal overalls, coral shirt and cream sneakers; open presenting palm. Her age and Stage role remain unchanged. The ending wave acknowledges the premiere. |
| Remy | Side-swept ginger hair, plum hoodie, shorts, small tablet. Puzzled attention and later open acknowledgment share the same silhouette. The correction is conveyed by the exact spoken line after evidence delivery, never by a truth-colored avatar. |
| Ari | Straight dark bob, cobalt top with coral collar, mustard trousers. Open, available stance beside the filming space; no guarded pose suggesting a persuasion gate. |
| Pip | Flat paper edge, short angular black hair, ochre face, teal tunic, short navy legs and coral backpack. Waiting, crossing, arrival and planting endpoints retain the same puppet, visibly distinct from the physical child. |
| Grandma | Flat paper edge, light round hair, coral cardigan, plum skirt, welcoming arm. Receiving-hand pose touches the seed at its right-bank anchor. Both characters remain visible when Pip has not crossed. |
| Backpack | Coral rectangle, yellow square patch and diagonal pale stitch. The player's physical contribution, the miniature and Pip's projected backpack use this same motif. It stays attached to Pip through crossing and the ending. |
| Seed | Small ochre seed with a dark contour and pale curved mark. Loose on the left; held by Grandma on the hill; then visibly rooted in the soil. Light is not substituted for planting. |
| Boats and broken bridge | Separate folded coral boats below two torn footbridge ends; Joined Boats connects the crossing at the existing bridge anchors. The two silhouettes remain distinguishable at reduced size. |
| Hill, roots and flower | Right bank rises to Grandma; roots spread into the soil at the planting anchor; lantern-flower opens above it. Both-bank light follows the rooted state, rather than showing success while the seed is still loose. |
| Story kit and tiles | One teal caddy with two paper tabs and four equal, unnumbered tile faces: One Boat, Joined Boats, Hill, Flower. Each icon also has its exact name. Empty storage cells make ownership clear when tiles are on the rail. |

`V08-STORYBOARD-RECOVERY`, `V08-KIT-OWNERS`, `V08-STORYBOARD-REHEARSAL` and `V08-PREMIERE` show these relationships in context. The sheets define representative endpoints/poses; a full animation-frame set belongs to later asset production.

## 4. Four rooms, preserved physical plans

Each scene now has a rich illustrated appearance reference as well as clean and annotated functional diagrams. The `-A` companion identifies required objects, exits and the unobstructed spine. Visual bounds, collision footprints and exact approach coordinates remain those of 05; the illustrated floor is not a replacement collision map. No geometry change is authorized by this revision.

| Illustrated quality reference | Functional layout and state authority | Specific visual constraint |
|---|---|---|
| `V08-STAGE-ILLUSTRATED` | `V08-ROOM-ST-READY` and `-A`; Item 05 Stage | White Jo; recovered Loop; one seated caddy with two unread leaflets; empty rail; paper Pip in both model and projection. This depicts a recovered-resource state, not the opening. |
| `V08-COURTYARD-ILLUSTRATED` | `V08-ROOM-CY-INITIAL` and `-A`; Item 05 Courtyard | Curled notice exposes only CANCELED. Remy and the player's clothing/identity match the cast. No new clue from background plants or paper. |
| `V08-WORKSHOP-ILLUSTRATED` | `V08-ROOM-WK-INITIAL` and `-A`; Item 05 Workshop | Covered Maximum Toast and three open routes. Shelves, tools, plants and bunting are decoration only. Their painting must fit the existing decorative/visual bounds during asset production; they cannot add a target, collision region or blocked exit. |
| `V08-MEDIA-ILLUSTRATED` | `V08-ROOM-MD-INITIAL` and `-A`; Item 05 Media | Plain filming wall, still paper petals, Ari, standby Loop, two mounted notes and one closed caddy. Source bodies remain unread; the scene is used only after actually entering Media. |

The paintings contain approximate scale and placement. Reconcile their artwork to the established anchors when preparing individual layers in Item 10; retain their finish rather than reverting to the simple diagrams. Background plant/wood/window details have no investigative meaning, ownership, route prerequisite or new recorded state.

| Room and references | First impression and attention order | Required details, positions and changed states |
|---|---|---|
| Stage: `V08-ROOM-ST-INITIAL`, `V08-ROOM-ST-READY`, both `-A` companions | Paper miniature and player first; Jo and crew board next; conspicuously empty dock/backdrop and workstation; two open side exits. The opening directs attention to the pull tab while the complete goal remains available. | Miniature within R(8,17,32,40), Jo at (37,48), E4/E2 on the board, dock R(68,26,84,41), console R(48,66,106,76), protected projection R(38,2,114,25). Ready shows docked Loop, seated caddy, rail and readable paper story. Avatar at rail A remains above the work band and below the protected projection. |
| Courtyard: `V08-ROOM-CY-INITIAL`, `V08-ROOM-CY-FLAT`, both `-A` | Paper petals and outside working surface; Remy/tablet; curled notice and clip; open exits. Motion can suggest wind without blocking travel. | Notice remains inside R(84,17,104,38). Curled state exposes only CANCELED. Flattening releases/pulls/re-clips at A(92,48); full source opens only at flat-and-secured commit. The before/after scene changes the same paper, not its camera or access point. Avatar stands below the notice, without covering it or Remy. |
| Workshop: `V08-ROOM-WK-INITIAL`, `V08-ROOM-WK-REVEALED`, both `-A` | Three open routes and public venue sign are readable before the optional large Toast machine. Workshop joins Stage, Courtyard and north Media. | Public sign at R(44,13,51,39), Media entrance R(55,20,69,33), Toast entirely within R(80,9,110,46). Exaggerated arms/tray/magnifier stay within its bay. The clear path survives every Toast state. Nothing implies that visiting Toast is necessary. |
| Media: `V08-ROOM-MD-INITIAL`, `V08-ROOM-MD-DEPARTED`, both `-A` | Plain wall and filming table establish the kind of room; Ari, visible standby Loop and kit are easy to find on actual entry. This room is useful immediately. | Loop at (68,45), Ari (39,52), caddy R(96,32,108,39); mounted E6/E7 remain at x79–94 on the rack. Departed scene shows an empty Loop place and kit recess, with both mounted notes still present. The south exit remains visible and approachable. No duplicate caddy/robot remains after collection. |

Door topology is the established Stage–Courtyard–Workshop triangle plus the Workshop–Media spur. `V08-NAV` draws all three triangle edges. A Map expansion says **“Media — indoor filming space with a plain wall.”** It does not put Loop or Ari into the destination label. Entering Media can expose their presence; a room thumbnail on the map cannot.

Small objects are readable through their named contextual action and source enlargement, not miniature text that silently discloses the full clue. Physical paper/tab art is deliberately sparse before inspection. The clean scene pairs establish appearance; source-reading references establish the precise readable text.

## 5. Supporting interfaces and critical boundaries

### 5.1 Shared visual patterns

The `P.*` labels below are design patterns, not new Item 06 interface states. A single active task surface replaces its peer. Its background is visibly stopped and dimmed; only that surface and its owned child receive input. On large workstation views the complete world remains visible, with the explicit world/exit interruption behavior from 06. Decorative movement never owns input.

| Pattern | Actual visual examples | Composition and return behavior |
|---|---|---|
| `P.WORLD` | OPENING, ROOM pairs, COMPACT-WORLD | Room/Goal/Menu top; full room; persistent objective/action caption below; Move to…/Map/Notes/Help along the bottom. Selected object action follows the target; it does not cover the target or backdrop. Dismiss removes opening suggestion only. |
| `P.HOME` | HOME-EMPTY, HOME-SAVED | Title and case; Start or true Continue; safe secondary actions. Generic opening art cannot leak a saved unseen room. Checking replaces the primary action until actual status is known. |
| `P.SHEET` | CHOOSER, NAV, TIMELINE, SETTINGS, PAUSE-SAVE | One opaque surface, heading top-left, Close top-right, body/list below, explicit Return below body. Current room remains behind it. Overlap chooser lists both real board actions, with no guessed choice. |
| `P.READER` | READ-E3/E4/E6/E7, E2-FIRST/END/PHOTO/FULL, WORD, NOTES, PICK | Source title/provenance, exact text/media, contextual source controls. Notes adds its record column only when useful. Owned source/word/zoom returns to its caller's source/scroll and surviving focus. A root Return goes to world. |
| `P.COMPARE` | COMPARE, PICK | Two equal paper regions, attribution visible, relationship controls beneath. Empty/partial variants replace only unfilled regions with Add detail. Neither selected passages nor relation is a correctness verdict. Optional idea field extends the scroll body. |
| `P.PLAN` | PLAN-PRIVATE/RECORDED/DELIVERED, LEAD, PRESENT, COMPACT-PLAN | Actual context above the child's field; separate status/action beneath. Source quotes are visually separate from child words. Text entry does not move the avatar or send anything by itself. |
| `P.TALK` | TALK, PLAN-DELIVERED, STORYBOARD-NOTICE | Local speaker and avatar remain connected to their actual room. Speaker name, exact reply and available topics in the lower band. Presentation preview never shows the eventual NPC reply. |
| `P.KIT` | KIT, KIT-OWNERS, TILE-INSPECT | Four equal tile faces, note tabs and concrete Inspect/Collect or current-host actions. Note reading uses the reader. A moved kit returns focus to its surviving current host. |
| `P.WORK` | WORK-EMPTY/SEED/UNMET/FLOWER-UNMET/SUCCESS/CHANGED/HISTORY/PAUSED, RAIL-ACTIONS, WORK-MORE | Full room above the lower band. Rack, actual order and named tile actions below; mode/state caption and Stop/Continue/Restart remain explicit. Compact Arrange/Watch changes presentation of the same workstation. |
| `P.COACH` | HELP-ENTRY/WAITING/FALLBACK/RESPONSE/DIRECT/UNAVAILABLE/STALE/CLARIFY/PREPARED/WORLD | Current topic and submitted words are separate from response/status. Keep playing stays available; receiving help does not open the sheet or steal focus. Use plain responses, without internal tags or diagnostics. |
| `P.DECISION` | RECOVERY-READ/INCOMPATIBLE/DAMAGED/RESUME/NEW-GAME, WORK-MORE | About 45% desktop width; explicit scope at top; safe action gets first action focus. Long copy scrolls on compact. New game, Clear rail and Reset rehearsal remain separate scopes. |
| `P.ENDING` | PREMIERE, RECAP, RECAP-REVISION, STORYBOARD-PREMIERE | Complete story followed by Jo/backpack response; optional own-room reactions and factual recap. Return/replay do not erase historical completion or skip the current arrangement check. |

### 5.2 Exact exposure comparisons

**E2:** `V08-E2-FIRST` shows Loop on the courtyard cart and Remy's posted message. Its first-frame caption says only what is visible there; it has no ending marker or stopping-point description. `V08-E2-END` is a deliberately reached later frame, including “Recording ends here.” `V08-E2-PHOTO` shows only the curled photograph and its permitted word; there is no Flatten button. `V08-E2-FULL` shows the complete recording description only after Describe recording. The three frame controls, metadata and interpretation remain distinct. The complete compact scroll specimen retains those same boundaries; it is not a merged full-source disclosure on first access.

**Notice:** `V08-ROOM-CY-INITIAL` and `V08-STORYBOARD-NOTICE` show CANCELED on the curl. After physical flattening, `V08-READ-E3` displays the complete source:

> OUTDOOR REHEARSAL CANCELED.  
> Wind keeps folding the paper petals.  
> The opening premiere is still planned.  
> We will finish the flower shot indoors.

The full physical notice does not alter the earlier photograph or automatically correct Remy. His full correction in `V08-TALK` represents an actual delivery of E3.a and E3.b at his Courtyard approach.

**Materials:** `V08-KIT-OWNERS` shows closed, open, carried, read and seated ownership. The unopened tabs identify Jo/Remy without revealing their note bodies. `V08-READ-E6` and `V08-READ-E7` represent legitimately opened portable copies at the Stage. Mounted Media copies survive departure; all versions retain one E6/E7 identity. No possession icon doubles as a reading or comprehension checkmark.

**Plans and help:** `V08-PLAN-PRIVATE` contains an explicit sample private sentence. `V08-PLAN-RECORDED` changes the record status without placing a reply in Jo's mouth. `V08-PLAN-DELIVERED` shows the result only after the child approaches Jo and delivers that snapshot. `V08-PRESENT` is a separate review of evidence actually being shown. `V08-HELP-ENTRY` requires an explicit request; `V08-HELP-RESPONSE` represents an eligible, requested response. Sample sentences and arrangements are review fixtures, never default player answers.

`V08-HELP-CLARIFY` uses the genuinely ambiguous sample “It goes there.” and asks whether “it” refers to Pip, the seed or a story tile. The useful-response sample uses the different claim “The seed got there, so the promise is done,” with the displayed source/outcome context required by 07. These fixtures cannot be interchanged. `V08-HELP-DIRECT` may introduce the authored solution before the notes have been read because Show me a way explicitly requested it. It does not mark either entire note read.

**Rehearsal:** `V08-WORK-SEED` shows the seed with Grandma while Pip remains left. `V08-WORK-UNMET` holds that state after Hill, with **“Grandma has the seed. Pip is still across the river.”** `V08-WORK-FLOWER-UNMET` retains the loose/unrooted seed and dark flower instead of celebrating. `V08-WORK-SUCCESS` certifies only a finished current arrangement. `V08-WORK-CHANGED` restores initial puppets and says to rehearse this version. `V08-WORK-HISTORY` retains the fact of an earlier premiere while the changed order still requires rehearsal. The same physical Show pad is used throughout.

## 6. Animation and feedback language

The storyboards are static compositions of meaningful states, not running demonstrations. A row of panels sometimes compares explicitly labeled starting orders rather than depicting one uninterrupted play history; see each artifact's fixture note. This prevents a review montage from implying a free extra cue or hidden automatic correction.

| Sequence / references | Standard presentation target | Reduced motion / interruption |
|---|---|---|
| Select, approach, operate — STORYBOARD-EXPLORE | Immediate object bracket and named destination; walk on the existing path; brief hand action at A. Proposed selection emphasis 120 ms and paper/hand action about 350–600 ms. No invented transport speed; retain 05's movement proposal. | Static bracket; moving position remains traceable with minimal pose change. Physical approach still occurs. Before/after object milestones govern cancel, not an arbitrary animation percentage. |
| Pull model / unfold request — STORYBOARD-EXPLORE | Pull tab visibly extends; miniature backpack/puppet response settles; request unfolds into a readable surface. Exact source text appears at the established readable milestone. | Direct settled pose plus the same caption. It does not reveal an unopened source or add a new puzzle. |
| Flatten notice — STORYBOARD-NOTICE | Hand releases clip, pulls fold down and secures it. Proposed 600–900 ms total presentation. The complete wording appears only once flat and secured. | Settle the same legal operation and caption. An abandoned pre-commit operation retains its old exposure; a completed operation stays flat. Photo remains partial. |
| Loop wake/follow/dock — STORYBOARD-RECOVERY | Lens responds, roller feet align, Loop follows, then settles into pad. Proposed wake/dock accent 350–600 ms; travel uses actual path. Projection starts only at the dock. | Same stable lens/feet/dock/beam differences without bobbing. No repair effect or transport teleport. |
| Caddy collection/seating — KIT-OWNERS | Lid opens, one whole caddy moves to carried ownership, then visibly contacts Stage bay. Proposed contact accent 250–450 ms. Both leaflets travel. | Immediate committed contact pose; one current host. Cancel before/after seat preserves the proper host; focus returns to it. |
| Select/insert/replace/swap/move/return — STORYBOARD-TILES, RAIL-ACTIONS | Gold selected face and named destinations. On commit, a brief 150–220 ms slide connects old/new positions. Replaced tile returns to its own rack cell; swapping moves both once. | Direct final positions plus the same named operation caption. Cancel/no-op keeps order/revision/certification. Selection does not execute a tile. |
| Seed-only / unmet Hill — STORYBOARD-REHEARSAL, WORK-UNMET | One Boat carries the seed across while Pip visibly remains left. Hill holds the unresolved state. Suggested cue presentation 0.8–1.4 seconds before its stable caption/endpoint; no response timer. | Direct seed endpoint and unchanged Pip position, same exact caption. Unmet still pauses for inspection. Ordinary successful/no-op cues continue in order without adding a pause requirement. |
| Cross / plant / light — STORYBOARD-REHEARSAL | Joined boats meet; Pip crosses with backpack. Both figures lean/reach toward the planting point together; seed becomes rooted. Flower opens, warm wash reaches both banks. Suggested cue motion 0.8–1.4 seconds; proposed light rise 600 ms. | Same crossing, joint planting and illumination endpoints with minimal transitions and full captions. Roots, seed and both figures remain visible. Pose endpoints in the board do not claim every intermediate animation frame exists. |
| Stop / read / resume / edit — STORYBOARD-INTERRUPT | Stop settles the active cue **once**. Caption identifies saved mode and next unfinished tile. Reading preserves that pause. Actual edit resets puppets/run eligibility; old Continue disappears. | Identical commit order and information. After a last-cue interruption use Continue to finish the named mode, without replaying the final cue. A hard reload preserves uncertainty about an outcome that may already have been seen. |
| E2 recording — E2-FIRST/END, COMPACT-E2 | Existing target about 1 second per frame; three manual frame controls, Play/Pause and deliberate Describe. Stop at the last frame, no loop. | Static frame changes; no moving camera. Manual Previous/Next and the exact current frame description preserve access. Never auto-open the full recording text. |
| Maximum Toast — STORYBOARD-TOAST | Existing 0–3 s arms/lights/lid; 3–5 s tray with tiny toast; 5–7 s magnifier/proud pose. Existing replay target 2 s. No toast is exposed in the earlier arms-only panel. Lights use a slow change in brightness, not a rapid flashing effect. | Immediate revealed tray/magnifier/caption. Skip and leaving settle this same result; all routes remain open. Magnifier enlarges only toast; no inventory or evidence reward. |
| Premiere and aftermath — STORYBOARD-PREMIERE, PREMIERE | Finalize the **whole** launched arrangement, then a modest celebratory wave/light hold and Jo's backpack line. Suggested decorative flourish under 1 second; text holds for the child. Remy and Ari react in their own rooms. | Stable finished story and same lines. Skip decorations/reactions without losing completion; recap and reactions remain available afterward. |

All timings newly introduced here are proposed art targets, not measured performance. Caption text can be recovered through the current-story/Goal controls; longer reading pauses the run under 06. Sound may support a click, paper movement or light cue, but supplies no exclusive clue or state change. No sound assets are produced in Item 08.

For **BPL, FBPL, BFPL, BPFL and BPLF**, `V08-VALID-PLANS` gives the same success treatment. Here F/B/P/L are review shorthand for One Boat/Joined Boats/Hill/Flower; the game shows their names. Extra One Boat performs its harmless empty trip with ordinary caption and no penalty. In BPLF the final F still finishes before certification and premiere completion. Rehearsal success does not trigger the historical premiere celebration.

## 7. Responsive, reading and focus evidence

Large-layout eligibility depends on approximately **900 × 600 of remaining world area**, as in 06. The 1024 × 768 composition therefore uses the compact overview/action arrangement; it does not force a 1440 design into a smaller browser. Text enlargement can trigger that same change on a nominally large display.

| Required review | Actual references | What is demonstrated |
|---|---|---|
| Complete room and named navigation | COMPACT-WORLD, COMPACT-NAV, COMPACT-NAV-END, LAPTOP | Whole-room overview, room name, current goal, large Move to…/Map controls and a scrollable local action list. Source titles/occupants from unseen rooms are absent. |
| Complete readable source | COMPACT-SOURCE-TOP/END/FULL | Exact E7 at Largest + Roomier; visible scroll indicator, full prose retained, end actions reachable. “in a boat or a hand” is followed by the complete root/soil condition. |
| E2 controls | COMPACT-E2, COMPACT-E2-FULL | First-frame art/caption, three named frames, Next/Previous with first-frame reason, explicit Describe, Photo and separate Remy message. No final-frame caption on initial access. |
| Optional plan entry | COMPACT-PLAN, COMPACT-PLAN-FULL | Field/context/actions stack vertically, blank entry remains possible, long text does not shrink. Opening the form does not focus the field automatically or move the avatar. |
| Non-drag arrangement | COMPACT-ARRANGE, COMPACT-ARRANGE-END, RAIL-ACTIONS | Named tile selection and placement; selected tile and keyboard focus differ; destination/return/inspect controls scroll into view. No precision drag needed. |
| Whole story and run actions | COMPACT-WATCH, COMPACT-WATCH-ACTIONS | Both banks and characters remain visible in Watch. Current condition is below the story; Continue/Restart are reachable in the action view, with Stop/Back retained. Arrange is the same workstation, not a different puzzle. |
| Long help / recovery | COMPACT-HELP/FULL, COMPACT-RECOVERY/FULL | Complete long status/scope at Largest + Roomier. Safe return and action controls remain reachable; response text is not hidden behind a fixed footer. |

Focus order follows the visual task: heading/identification → current context or source metadata → body/media → relevant actions → return. The top Close remains independently reachable. The sheet's initial focus is its heading; a reset's first action focus is Keep playing. Reading order does not jump between the dimmed world and the active surface. In a compare view it reads the complete first detail and its attribution before the complete second, then the relationship and optional idea. In Watch it reads mode/current cue, current-story description and run actions. Screen-reader descriptions must come from the same eligible CT components, not concatenated hidden artwork.

Arrow/WASD movement is screen-relative and only active with world focus. Tab through a source or type in a plan without moving the avatar. Escape closes the owned child first, then its task surface; from the world it opens Pause. Return restores the actual invoker or surviving owner: original word/source; selected rail tile; current caddy header after collection; Stage rack/workstation after seating. A destination list never offers a projected character as a movement target.

These compositions have accurate text elements and visible access controls. **PNG artwork is not an accessible implementation.** Item 09 must specify native named controls and readable text equivalents for production. The SVG text layer is an editable design source, not proof of keyboard behavior, focus trapping, text selection, screen-reader semantics or runtime zoom support.

## 8. Written review through the actual visual references

The following are design route checks, not executed browser or player tests. Item 06 owns each full transition contract. Each route below identifies the actual visual, the action/state change, retained facts and recovery. All references are in the gallery and register.

| Check | Actions, references and visible destination | Retention, cancel and boundary result |
|---|---|---|
| R08-01 Opening → free route | HOME-EMPTY (`UI.HOME.EMPTY`) — Start / `T.HOME.START` → OPENING (`UI.GUIDE.OPENING`, `UI.WORLD.IDLE`). Model selection travels to `ST.MODEL.TAB` under `T.WORLD.MOVE/ARRIVE/COMMIT`; STORYBOARD-EXPLORE shows hand/tab result. Either visible Stage exit can instead be selected. | `T.GUIDE.DISMISS` removes suggestion only; `ACC.GOAL` retains assignment. `T.WORLD.CANCEL` stops walking at legal feet. No intro, form or wrong answer is required. |
| R08-02 E4 + NAV.MEDIA | READ-E4 represents the request physically unfolded at `ST.SOURCE.E4` A(50,45), before Loop recovery. Return → Stage; NAV opens `UI.NAV.MAP`. `T.NAV.DESCRIBE` shows the plain-wall public description. `T.NAV.GO` traverses Stage → Workshop → Media. | E4's conditional language and public room suitability remain distinct from occupancy. No robot marker is on NAV. The MD-INITIAL scene first confirms presence. Cancel travel preserves the read request/NAV and stops the walk. |
| R08-03 Partial E2 → full E3 | E2-FIRST (`UI.SOURCE.POST`) → `T.POST.PHOTO` → E2-PHOTO. Return/travel to Courtyard; flatten `CY.SOURCE.E3` → CY-FLAT and READ-E3 (`UI.SOURCE.TEXT`). Optional PRESENT → `T.PRESENT.SHOW/DELIVER` at Remy's A → TALK. | Before flatten commit only CANCELED; photo never expands to full E3. Full Remy correction requires delivered E3.a/b. Cancel presentation retains draft and changes no NPC knowledge. No compulsory revision form. |
| R08-04 Media first, unread notes → Stage reading | OPENING exits directly to Workshop then Media; MD-INITIAL. `MD.ACCESS.E8` / `T.KIT.COLLECT` → KIT-OWNERS carried state. Wake Loop at his existing access; travel back. Stage rail intent seats kit at rack A via `T.KIT.SEAT`, then opens workstation. READ-E6/READ-E7 show first portable-note reading there. | Collection contains no note-body preview/read tick. After seating, mounted Media copies persist in MD-DEPARTED. Closing a note returns to current Stage host, not a vanished Media caddy. No prior E1–E5 reading gate. |
| R08-05 One resource first | RESOURCES panel 1: caddy seated, Loop missing → `UI.WORK.NEEDS_LOOP`, blank projection but editable tiles. Panel 2: Loop docked, caddy missing → `UI.WORK.NEEDS_KIT`, initial projection and empty bay. Return/Go retrieves the missing resource physically. | A caddy does not dock Loop; docking does not grant tiles. Current resource caption names only actual known needs. Cancelled handoff retains the correct carried/seated milestone; no duplicate item. |
| R08-06 Seed-only → unmet → revision | WORK-SEED performs F in FP; `T.RUN.CUE` reaches WORK-UNMET (`UI.RUN.UNMET`) after Hill. Both banks show why arrival of the seed is insufficient. Open E6/E7, or Help; close returns paused. Select B and insert before Hill through RAIL-ACTIONS / `T.RAIL.INSERT`; add Flower as needed. Fresh rehearsal produces FBPL in STORYBOARD-REHEARSAL. | Exact caption is factual, without automatically quoting an unread promise. Notes/help are optional. Cancel selection leaves FP and its pause; actual edit resets puppets and clears old continuation. A successful silent revision is play success, not proof of understanding. |
| R08-07 Success → premiere payoff | WORK-SUCCESS (`UI.WORK.CERTIFIED`) — Launch / `T.RUN.SHOW` → `UI.RUN.STARTING/SHOW`, fresh current order. Full finalization → PREMIERE (`UI.ENDING.CELEBRATION`) and Jo's backpack line; Skip/Continue → own-room reactions/RECAP. VALID-PLANS verifies equal treatment for all five orders. | No premature success for trailing F; no shorter-plan bonus. `T.ENDING.SKIP` skips decoration after committed completion. Replay checks current order. RECAP has no invented comprehension or learning outcome. |
| R08-08 Stop / leave / resume | STORYBOARD-INTERRUPT shows Stop during One Boat in Premiere mode: `T.RUN.STOP` settles seed delivery once → `UI.RUN.PAUSED`, “Next tile: Joined Boats.” Read E6 or leave through `T.RUN.LEAVE`; return and approach workstation, then Continue premiere. WORK-PAUSED supplies the rehearsal equivalent. | Mode and next cue survive; return/read-close does not autoplay. At last cue use `UI.RUN.TERMINAL` and `T.RUN.FINALIZE`, not repeat cue. RECOVERY-RESUME represents hard reload to durable state with possible prior outcome exposure retained as uncertain. |
| R08-09 Edit after success | WORK-SUCCESS → select/commit changed order → WORK-CHANGED; `T.SHOW.CHECK` gives the current rehearsal requirement. WORK-HISTORY is the variant after a previous premiere, with current FPLB still unqualified. | Selection/cancel alone retains qualification. Actual change resets puppets/current certification, preserving historical premiere. Same Show pad, explicit Rehearse action; no recap erasure or old Continue. |
| R08-10 Coaching while playing | HELP-ENTRY → `T.COACH.THINK` → PENDING/WAITING. HELP-WORLD shows closed help and an available world while request remains pending/ready. At the existing ~8-second target, FALLBACK offers a prepared hint; explicit `T.COACH.FALLBACK` → PREPARED. Editing to FPLB creates HELP-STALE. | Existing ~2-second waiting and ~8-second offer are design targets. Accepting fallback removes the late response's display opportunity. Changed room/source/theory/order/puppet context invalidates old output; no old reply appears later. Draft remains; Ask about this version is explicit. |
| R08-11 Keyboard / non-drag compact | COMPACT-WORLD → Move to… → COMPACT-NAV → named physical collection/dock/workstation actions. COMPACT-ARRANGE selects named tile, then named gap/replacement in ARRANGE-END; COMPACT-WATCH shows actual result and WATCH-ACTIONS exposes Continue/Restart. Sources use COMPACT-SOURCE. | Gold selection and blue focus are distinct. List navigation/typing cannot move the character. Both banks remain complete, controls scroll rather than shrink, no source body leaks through a destination label. Escape/Return restores surviving owner. Runtime keyboard operation remains untested. |
| R08-12 Saving / resume / canceled New game | PAUSE-SAVE (`UI.SAVE.SESSION`) uses actual save-limitation copy and Retry. HOME-SAVED resumes only a valid record, paused as needed. READ/INCOMPATIBLE/DAMAGED show distinct recovery choices; NEW-GAME shows full reset scope with Keep playing first. `T.RESET.CANCEL` returns without mutation. | Session stays playable after storage failure; no false saved badge. Back to start is an in-game action; browser closure cannot promise a custom prompt/final write. Pending temporary selections are canceled on restoration; acknowledged drafts and existing owners follow 06. Unknown saves are not silently overwritten. |
| R08-13 Ignore / leave Toast | WK-INITIAL offers open Stage/Courtyard/Media routes without operating the machine. If activated, STORYBOARD-TOAST performs `T.TOAST.START/SETTLE`; Skip or a new door intent settles the revealed endpoint and travels. Later Look/Replay uses the existing revealed object. | No clue/reward/repair or route lock. Tiny toast appears only in the tray phase; magnifier is decorative enlargement. Optional humor cannot substitute for finding Loop or retrieving materials. |

Understanding remains distinct from guessing in every route. The visuals show what the player's arrangement physically caused. Evidence of a connection comes only from an actually recorded explanation, presented detail, question, assistance exposure or revision, with the limitations already specified in 03/07. Merely finishing FBPL cannot authorize a “you understood the promise” recap. Comparison and coaching never become approval gates.

## 9. Review findings, corrections and verification limits

Actual review included rendered-image inspection of all eight contact sheets, full-size inspection of representative room/source/workstation/compact/recovery/storyboard references, structural register checks, exact-wording checks on seven source compositions, control-label measurement and the seven color-pair calculations. Contact-sheet inspection checked visual consistency and coverage; it cannot establish body-text readability by itself.

The following issues were corrected in the artifacts, rather than deferred to the builder:

1. The earlier Stage paintover was excluded as a geometry reference because it changed figure placement and omitted note tabs. The user subsequently chose that illustration's quality as the aesthetic target and rejected the lower-detail treatment. The current cast and four illustrated rooms now govern appearance; 05 and the composed diagrams govern geometry. The revised Stage also restores two caddy leaflets and uses paper Pip consistently in the miniature and projection. Earlier cast/Stage outputs remain historical, not current references.
2. Early action captions could obscure room elements. The opening action and guidance now sit beneath the room; the workstation has its own lower band below the complete room/projection.
3. The Media caddy lid was normalized into its existing bounds. Carried/seated/rack ownership now matches the visible tile order, and no collected caddy remains in Media.
4. Grandma's receiving hand now meets the seed anchor. Flower light reaches both banks; initial, loose-seed, rooted and illuminated states remain distinct.
5. The map now clearly draws the direct Stage–Workshop edge as part of the three-room triangle. Door labels stay inside their scene canvas.
6. Unmet rehearsal references now include Continue and Restart on desktop and through the compact action view. Stop/Back remain separate from the decision to continue.
7. E2 frame controls include the first-frame unavailable reason and all three frame choices. Its initial view and photograph exclude later stopping-point/full-notice text.
8. Private/delivered/help backgrounds now match the actual order and physical approach. The ambiguous-help sample now uses “It goes there.” The stale-help sample visibly has a changed order; the old response is absent.
9. Correct-first E4 reading now has the unrecovered Stage behind it. Recap's background goal now says Replay or try another arrangement, rather than inviting a first launch after completion.
10. Follow this lead is visibly present, unavailable until the question/destination choice is made. Recovery has a visible Back path; incompatible saves do not advertise a futile Retry action.
11. Toast's arms-only phase no longer reveals the later tray/toast. Storyboard caption space was increased and art scaled to keep panels separate from their readable captions.
12. The visual crosswalk uses actual `ACC.*` owners from 05. Transition references for tile editing, help, recording and interruption now point to their relevant designs, not a generic opening fallback.
13. Startup recovery now retains the Home backdrop and a Continue heading, with no invented playable room or Paused state behind an unreadable/incompatible save. Recap has one return action instead of two equivalent footer controls.

Measured checks are in [design-checks.json](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/08-visual-designs/design-checks.json). Seven frozen source bodies were compared with 07, normalizing only line-wrap whitespace: E4, E3, E6, E7, E2.c, deliberately requested E2.a and compact full E7. All matched. Explicit first-frame and partial-photo exclusion checks passed. Registered control labels fit their authored button widths under the measured font. All 110 current registered PNG references exist. All 93 declared states and all 121 named transitions have functional references and content bindings.

The [packet verification](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/08-visual-designs/packet-verification.json) records the current gallery resource-link count, document links, actual PNG dimensions, valid SVG compositions, registered companions and exact state/transition coverage. Two fractional scroll-canvas heights were rounded up in the original review so their declared dimensions match their PNGs. Foundation source-document hashes remain unchanged. Checklist sections 09 onward retain their contents/statuses; this visual revision changes only Item 08 evidence and its artwork/documentation.

The five revised illustrations were visually inspected for cast identity, illustrated quality, source concealment and the represented resource/story state. They are not exact-coordinate room exports. Detail and scale must be fitted to the 05 visual bounds before individual production layers are accepted. Neither these illustrations nor the user's aesthetic direction establishes child usability or animation quality.

These findings do **not** establish browser/device compatibility, runtime focus/keyboard operation, assistive-technology support, persistent storage reliability, live AI performance, child usability, enjoyment or learning gains. No such testing is claimed. The exact full source and field text must still be tested in the chosen runtime with native controls and real font fallback. The gallery's links are for navigating static review documents; it contains no gameplay script.

## 10. Coverage of the six Item 08 subitems

| Checklist requirement | Completion evidence | Status |
|---|---|---|
| Camera, scale, readability, type, palette, lighting and hierarchy | §2; DIRECTION; room compositions; measured contrast; compact Largest/Roomier source and focus samples. | Defined |
| Consistent player, Loop, crew and puppet cast | §3; CAST-ILLUSTRATED, white Jo revision, matching Stage illustration and updated functional cast diagrams; backpack and Loop state relationships. | Defined |
| Four functional plans translated without evidence/logic changes | §4; four illustrated quality references plus eight clean functional scene states and eight annotated companions; ownership, notice and required projection variants; unchanged 05 geometry. | Defined |
| Supporting interface states, readable sources, focus and selection | §§5/7; actual representative designs for all shared families; complete 93-state and 121-transition crosswalks; compact controls and long-text companions. | Defined |
| Shared motion/feedback from discovery through launch | §6; eight narrative/operation storyboards plus caddy ownership and resource boards; exact consequences, interruption rules, reduced-motion equivalents and five-plan review. | Defined |
| Coherent review before the full asset set | §§8–9; thirteen written routes, rendered-image review, corrected artifacts, exact-wording/fitting/contrast evidence and explicit validation limits. | Defined |

All six subitems are complete **as design**. The number of references is an index of supplied material, not evidence of play quality or an estimate of final asset count.

## 11. Subsequent work and unresolved issues

There is no unresolved material visual-direction decision preventing completion of Item 08. The user selected the supplied illustrations' quality for the actual game and requested Jo's new appearance. The five revised images implement that direction for review; this does not claim approval of every new detail or child validation. Exact layering, exports and fitting to the established bounds remain Item 10 production work.

**The exact next checklist item is 09 — Concrete technical decisions and implementation contracts.** It receives:

- The fixed 120 × 80 plans, 900 × 600 remaining-area threshold, whole-room compact overview, complete paper-story rectangle and Arrange/Watch behavior.
- Separate layers for the required rich illustration, exact readable text, named native controls, captions and focus/selection. The simplified SVG diagrams specify layout/state only; their rendering format and reduced detail do not choose the production renderer or final aesthetic.
- The actual long-source/600-character-field and Largest/Roomier constraints, font metrics target and fallback-review obligation.
- The complete 93-state/121-transition visual/content crosswalk, plus source-component exposure and canonical physical-copy ownership.
- Playback mode/next-cue/terminal/interruption visibility, five valid orders, current certification versus historical premiere, and deterministic reset boundaries.
- Coaching's explicit request, nonblocking waiting, prepared fallback, late/stale suppression and truthful assistance introduction; current saved-state and storage-failure displays.

Item 10 then receives the five illustrated appearance references, current white Jo identity, cast/material motifs, representative functional poses, exact room bounds and attachment anchors, motion targets, normal/reduced endpoints and provenance. It must fit the rich artwork to those bounds, provide matching changed states, assign individual assets and choose export formats after 09. Simplified diagrams are not substitutes for final artwork. Item 11 must carry both the selected quality and the functional contracts into the build packet. Item 12 remains the build-readiness checkpoint.

Runtime accessibility, font fallback, performance, child comprehension of small projected entities, and enjoyment remain evaluation work. They are not unanswered routine styling choices and do not authorize changing the story or adding quizzes. No live AI service, production animation set or final demonstration has been created in this task.
