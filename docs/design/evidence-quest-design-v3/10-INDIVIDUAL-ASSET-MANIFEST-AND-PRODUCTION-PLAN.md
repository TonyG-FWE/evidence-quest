# Evidence Quest — Item 10: Individual asset manifest and production plan

**Defined September 11, 2026. Planning complete; production assets and game not created.**

The case requires **96 reusable assets**: **58 painted assets, 32 native interface/effect components, and six short sounds**. Their **246 variants** comprise 123 painted variants, 117 native states, and six audio variants. The painted variants require **139 cels/stills**, including the four-frame walks. The export plan names **260 runtime files**, including resolution and format alternatives; these are not 260 independent art commissions. There are **28 animation clips**, six sound clips, and 157 owner bindings.

The authoritative inventory is [asset-manifest.json](10-asset-production/asset-manifest.json). Its [schema](10-asset-production/asset-manifest.schema.json) defines the record structure. The [state/access crosswalk](10-asset-production/ASSET-STATE-CROSSWALK.md) connects the assets to the existing game. [Validation results](10-asset-production/validation-report.json) describe the checks actually performed.

## 1. Authority, scope and reconciliations

Items 01–09 remain authoritative. Item 05 owns room geometry, physical approaches and object behavior; Item 06 owns interface/input/recovery; Item 07 owns exact child-facing content; Item 08's current five paintings own visual quality; Item 09 owns rendering, state, saves, coaching and asset-use contracts. All nineteen requested source documents were read. Seventeen relevant images were visually inspected, including all five current paintings. Metadata and hashes were checked for all 84 referenced images.

This document defines assets and production work. It does not create a playable game, manufacture final art/audio, select another framework/provider, assemble Item 11, or mark build readiness reached.

No narrative, puzzle, access or room-geometry correction was necessary. Three production interpretations are now explicit:

- **Recovered Stage painting:** a reference for rich materials and a recovered state. The opening instead composes an empty background, empty dock/bay and blank projection. Characters, Loop, caddy, papers and story figures are separate layers.
- **Caddy lid:** its body retains the exact 12 × 7 bounds and tile-cell centers from Item 05. The open lid occupies the space above the body: Media y27–32 and Stage y66–68, within their existing furniture bounds. This leaves both note tabs accessible without shifting cells. A foreshortened carried lid does not reset the saved open flag.
- **Puppet pose frames:** transparent allowances accommodate Grandma's receiving/planting hand and Pip's reach. Their waiting bodies retain the approximately 10 × 28 projection-unit extents and exact feet/hand anchors. Transparent allowance adds no collider, target or new story position.

These are Item 10 decisions, documented in the manifest bindings. Existing documents and illustrations remain unedited.

## 2. Inventory conventions and how to use it

An **asset** is a reusable visual or sound component. A **variant** is a required pose, stable appearance, or native state. An **export** is a file at a particular density/format. A **clip** animates those components using transforms or existing cels. A **binding** places an instance in the game.

For example, the caddy is one body asset with mutually exclusive Media, carried and Stage bindings. Its lid is a separate asset. Both portable note accesses reuse the leaflet surface while referencing the same canonical E6/E7 as their mounted copies. No caddy image contains the note bodies or all tile faces.

The manifest is the editable source of truth. This document and the crosswalk are readable views of those records. When revising assets, update the manifest, rerun the document checks, and regenerate affected tables; do not maintain a second independent inventory.

Read a record together with its `profiles[representation]` defaults. Explicit asset values override a shared field; arrays replace rather than append. The profile supplies common provenance/status/master/access rules, and the individual record specifies the brief, dimensions, variants, attachments, references, exports, dependencies, temporary equivalent and acceptance criteria. Image-reference records similarly inherit `referenceProfiles[kind]`.

All intended export paths are **future paths inside the eventual isolated game**, beginning `assets/`. None claims to be a file already created here. Every planned file explicitly has `exists:false`, `actualBytes:null`, and `sha256:null`.

Each `bindings[].assetUse` retains Item 09's unchanged seven-field contract: slot, ownerId, role, logicalBounds, normalized anchor, critical, manifestAssetId. Additional planning fields explain the coordinate space, parent, initial origin and visibility predicate. For puppet bindings, bounds are offsets from an initial projection-space origin; moving cues update that origin. A parent identifies ownership; do not add a second translation to an origin already expressed in projection coordinates.

## 3. Room, cast, source, puppet and interface decomposition

### Room assemblies

| Room | Permanent layer | Separate components and changed states |
|---|---|---|
| Stage | Empty warm wood wall/floor and blank screen recess | Model cabinet and MODEL children, pull tab, crew-brief flap, note drawer, request/board/device, dock body/flap/pad, Jo/player, desk, bay, rail and controls. Loop and caddy appear only after their independent physical commits. |
| Courtyard | Sunlit floor/wall and safe rear foliage | Bench, static boat model, note, wind petals, Remy, tablet stand/device, notice board, sheet and clip. Curled/moving/secured notice use distinct eligible text states. |
| Workshop | Wood room, quiet rear decoration, three open exits | Shared bench/paper strip, public venue sign, Toast body, lid, mirrored arms, tray, tiny toast, magnifier and native pad/lights. No expanding piece blocks the north route or central spine. |
| Media | Quiet room, floor and permanently plain wall | Recording table, still petals, capture slate, Ari, single Loop, rack station, mounted notes and removable caddy. Departure removes only the relevant resource, leaving its furniture and mounted copies. |

Ground shadows are runtime shapes beneath their owners. Front furniture lips reuse clipped portions of the same furniture asset. There is no extra full-room alpha foreground plate. World furniture/figures use Item 05 ground sorting; projection elements and their paper shadows stay inside the story.

### Cast and motion scope

The world cast uses **61 cels**: player 28, Jo seven, Remy seven, Ari seven, Loop twelve. The player has four facings, four-frame walk cycles, idle/reach/carry endpoints. Carrying reuses the walk legs with the supported-hand pose. Jo, Remy and Ari remain at their existing feet; home, two facing, talk, receive, acknowledge and celebrate poses cover their interactions. They do not acquire invented walking routes or lip-sync movies.

Jo is a **white girl with fair skin, dark-brown hair in two buns, coral shirt, teal overalls and cream shoes**. Other identities, clothing and the coral backpack motif follow the current cast painting. Keep expressive faces, clothing folds and painted depth at the actual display scale. Do not mirror whole characters: asymmetric hair, pockets, buttons, held props and light direction must remain correct. Mirroring is allowed for the unlettered symmetric Toast arm and doorway trim, with native arrows independently oriented.

Loop is one entity. Standby, responsive, four rolling directions, docked and projecting appearances follow its current room/mode. The empty dock is a separate object; no “repair” glow or second standby robot is introduced.

### Exact source carriers and exposure

| Content | Carrier and readable presentation |
|---|---|
| E1 | Stage crew-brief flap; `CT.SRC.E1` and existing metadata in native reader after lift. |
| E2 | Same post through Stage/Courtyard devices. Three independently gated recording stills, separate frozen partial photo, native posted interpretation and independently requested full description. |
| E3 | Curled/moving/flat sheet plus clip. Before secure endpoint, only the existing visible word **CANCELED**; after it, exact `CT.SRC.E3`. The moving reverse has no hidden complete body. |
| E4 | Folded/unfolded request; exact `CT.SRC.E4`, preserving conditional borrowing intent and timestamp. |
| E5 | Slate supplies E5.a; Ari's selected account supplies E5.b; actual local sight/wake response supplies separate E5.c components. One component never grants another. |
| E6/E7 | Blank reusable leaflet surface across Stage/Courtyard, mounted Media and portable kit accesses. Exact canonical body and author remain the same. Collecting/seeing tabs does not mark either body read. |
| E8 | Four separate tile faces and exact local descriptions. Inspection depicts the tile itself, not crossing capacity or a solved sequence. |
| NAV | Native public descriptions on the sign/equivalent venue view. “Media — indoor filming space with a plain wall.” suggests suitability, not occupancy. |

Source words, captions, accessible names and timestamps are readable native text. Artwork contains no replacement generated lettering. The partial photograph typesets only the canonical visible word; its description is a separate caption, not additional photographed text.

E2's first still depicts Loop on the low cart in the Courtyard. Frame two depicts the cart passing through the crew doorway. Frame three depicts the empty doorway, then permits “Recording ends here.” The first frame does not mount the later captions or full description, including in hidden accessible content. These are three stills, not a new video pipeline.

### Paper story and interfaces

The projection uses separate banks, river, torn footbridge ends, Pip, Grandma, backpack, seed, two boat instances, joining strip, roots and bud/open flower. The illumination is a bounded runtime wash reaching both banks. MODEL and PUP instances share artwork but never share puzzle state; only the miniature tab operates the miniature.

The four tile faces share equal cream/teal framing. Their caddy arrangement is unnumbered: Flower upper-left, One Boat upper-right, Hill lower-left, Joined Boats lower-right. Rail positions use the exact centers (67/74/81/88,71). A held tile is the selected representation of its committed owner, not another tile.

Supporting interfaces use native controls, text, CSS and thirteen original small vector icons. There are no screen-sized screenshot assets, avatar-selection feature, dashboards, scores or badge art. Existing Home/world/reader/reasoning/talk/kit/work/coaching/system/Toast/ending families and Item 09 technical recovery all have explicit native states in the manifest. Their functional layouts remain Items 06/08.

### Individual deliverable index

The full record supplies dimensions, production brief, geometry/anchors, bindings, dependencies, references, accessibility, temporary equivalent and acceptance. “Exports” counts planned alternatives, not currently available files.

| Asset ID | Deliverable | Required variants | Exports |
|---|---|---|---:|
| `ASSET.ENV.ST.BACKPLATE` | Stage empty backplate | base | 4 |
| `ASSET.ENV.CY.BACKPLATE` | Courtyard empty backplate | base | 4 |
| `ASSET.ENV.WK.BACKPLATE` | Workshop empty backplate | base | 4 |
| `ASSET.ENV.MD.BACKPLATE` | Media empty backplate | base | 4 |
| `ASSET.PROP.ST.MODEL.CABINET` | Paper-model cabinet | base | 2 |
| `ASSET.PROP.ST.BOARD` | Crew board | base | 2 |
| `ASSET.PROP.ST.DOCK.BODY` | Loop dock body | base | 2 |
| `ASSET.PROP.ST.CONSOLE` | Rehearsal desk body | base | 2 |
| `ASSET.PROP.CY.BENCH` | Remy model bench | base | 2 |
| `ASSET.PROP.CY.STAND` | Courtyard tablet stand | base | 2 |
| `ASSET.PROP.CY.BOARD` | Notice board | base | 2 |
| `ASSET.PROP.WK.BENCH` | Shared workshop bench | base | 2 |
| `ASSET.PROP.WK.SIGN` | Venue sign frame | base | 2 |
| `ASSET.PROP.MD.TABLE` | Recording table | base | 2 |
| `ASSET.PROP.MD.RACK` | Media rack station | base | 2 |
| `ASSET.ENV.DOOR` | Shared open doorway trim | side, north, south | 6 |
| `ASSET.FX.SHADOW` | Ground and paper contact shadows | base | 0 |
| `ASSET.FX.FOREGROUND` | Contained foreground lips | base | 0 |
| `ASSET.FX.FOCUS` | Focus, destination and selection marks | base | 0 |
| `ASSET.PROP.MODEL.TAB` | Story-model pull tab | rest, pulled | 4 |
| `ASSET.PROP.BRIEF.FLAP` | Crew brief lift flap | down, lifted | 4 |
| `ASSET.PROP.NOTE.DRAWER` | Jo note drawer front | closed, open | 4 |
| `ASSET.PROP.REQUEST` | Folded filming request | folded, unfolded | 4 |
| `ASSET.PROP.DEVICE` | Teal shared-post device | idle, selected | 4 |
| `ASSET.PROP.DOCK.FLAP` | Dock access flap | closed, open | 4 |
| `ASSET.PROP.CADDY.BODY` | Single removable caddy body | base | 2 |
| `ASSET.PROP.CADDY.LID` | Single caddy lid | closed, open | 4 |
| `ASSET.PROP.LEAFLET` | Canonical note paper carrier | sheet, pocket | 4 |
| `ASSET.PROP.NOTICE` | Courtyard notice sheet | curled, moving, flat | 6 |
| `ASSET.PROP.NOTICE.CLIP` | Notice bottom clip | latched, released | 4 |
| `ASSET.PROP.SLATE` | Capture-slate carrier | base | 2 |
| `ASSET.PROP.PETAL` | Paper petal element | flat, bent | 4 |
| `ASSET.PROP.TOAST.BODY` | Maximum Toast machine body | base | 2 |
| `ASSET.PROP.TOAST.LID` | Toast cover/lid | closed, raised | 4 |
| `ASSET.PROP.TOAST.ARM` | Toast machine arm | base | 2 |
| `ASSET.PROP.TOAST.TRAY` | Oversize toast tray | base | 2 |
| `ASSET.PROP.TOAST.PIECE` | One tiny toast | base | 2 |
| `ASSET.PROP.TOAST.GLASS` | Toast magnifier | base | 2 |
| `ASSET.UI.RACK` | Caddy cells and empty Stage bay | base | 0 |
| `ASSET.UI.RAIL` | Four-place rehearsal rail | base | 0 |
| `ASSET.UI.PADS` | Physical pad faces and lights | base | 0 |
| `ASSET.ACT.PLAYER` | Player child | idle-front, walk-front (4 cels), reach-front, carry-front, idle-back, walk-back (4 cels), reach-back, carry-back, idle-left, walk-left (4 cels), reach-left, carry-left, idle-right, walk-right (4 cels), reach-right, carry-right | 32 |
| `ASSET.ACT.JO` | Jo | home, face-left, face-right, talk, receive, acknowledge, celebrate | 14 |
| `ASSET.ACT.REMY` | Remy | home, face-left, face-right, talk, receive, acknowledge, celebrate | 14 |
| `ASSET.ACT.ARI` | Ari | home, face-left, face-right, talk, receive, acknowledge, celebrate | 14 |
| `ASSET.ACT.LOOP` | Loop, one portable projector | rolling-front (2 cels), rolling-back (2 cels), rolling-left (2 cels), rolling-right (2 cels), standby, responsive, docked, projecting | 16 |
| `ASSET.PUP.LEFT_BANK` | Starting bank | base | 2 |
| `ASSET.PUP.RIVER` | River | base | 2 |
| `ASSET.PUP.HILL` | Grandma's hill | base | 2 |
| `ASSET.PUP.BROKEN_BRIDGE` | Torn footbridge ends | left, right | 4 |
| `ASSET.PUP.PIP` | Paper Pip | waiting, crossing, arrived, planting | 8 |
| `ASSET.PUP.GRANDMA` | Paper Grandma | waiting, receiving, together, planting | 8 |
| `ASSET.PUP.BACKPACK` | The child's coral backpack | base | 2 |
| `ASSET.PUP.SEED` | Loose lantern seed | base | 2 |
| `ASSET.PUP.BOAT` | One folded boat | base | 2 |
| `ASSET.PUP.JOIN` | Joined-boats deck strip | base | 2 |
| `ASSET.PUP.ROOTS` | Joint planting roots | base | 2 |
| `ASSET.PUP.FLOWER` | Lantern-flower stem and head | bud, open | 4 |
| `ASSET.FX.STORY_LIGHT` | Both-bank lantern illumination | off, on | 0 |
| `ASSET.TILE.FERRY` | One Boat physical tile face | base | 2 |
| `ASSET.TILE.BRIDGE` | Joined Boats physical tile face | base | 2 |
| `ASSET.TILE.PLANT` | Hill physical tile face | base | 2 |
| `ASSET.TILE.BLOOM` | Flower physical tile face | base | 2 |
| `ASSET.SOURCE.E2.CLIP` | E2 recording still sequence | frame1, frame2, frame3 | 6 |
| `ASSET.SOURCE.E2.PHOTO` | Frozen partial notice photograph | base | 2 |
| `ASSET.UI.HOME` | Start/continue composition | 4 native states; exact IDs in manifest | 0 |
| `ASSET.UI.WORLD` | World and named navigation | 8 native states; exact IDs in manifest | 0 |
| `ASSET.UI.READER` | Source reader and evidence tray | 10 native states; exact IDs in manifest | 0 |
| `ASSET.UI.REASONING` | Comparison, timeline, theories and plans | 11 native states; exact IDs in manifest | 0 |
| `ASSET.UI.TALK` | Conversation and evidence presentation | 5 native states; exact IDs in manifest | 0 |
| `ASSET.UI.KIT` | Caddy access | 6 native states; exact IDs in manifest | 0 |
| `ASSET.UI.WORK` | Workstation Arrange/Watch | 17 native states; exact IDs in manifest | 0 |
| `ASSET.UI.COACH` | Optional coaching sheet | 11 native states; exact IDs in manifest | 0 |
| `ASSET.UI.SYSTEM` | Pause, saving and recovery | 13 native states; exact IDs in manifest | 0 |
| `ASSET.UI.TOAST` | Maximum Toast supporting controls | 5 native states; exact IDs in manifest | 0 |
| `ASSET.UI.ENDING` | Premiere and aftermath | ui-ending-celebration, ui-ending-aftermath, ui-ending-recap | 0 |
| `ASSET.UI.TECH` | Technical loading and art recovery | ui-tech-loading, ui-tech-content_error, ui-tech-art_status | 0 |
| `ASSET.ICON.BACK` | Back arrow | base | 0 |
| `ASSET.ICON.CLOSE` | Close mark | base | 0 |
| `ASSET.ICON.PLAY` | Play triangle | base | 0 |
| `ASSET.ICON.STOP` | Stop square | base | 0 |
| `ASSET.ICON.PAUSE` | Pause bars | base | 0 |
| `ASSET.ICON.NOTES` | Notes icon | base | 0 |
| `ASSET.ICON.MAP` | Venue icon | base | 0 |
| `ASSET.ICON.HELP` | Help icon | base | 0 |
| `ASSET.ICON.SETTINGS` | Settings icon | base | 0 |
| `ASSET.ICON.ZOOM` | Enlarge icon | base | 0 |
| `ASSET.ICON.CHECK` | Saved/check indicator | base | 0 |
| `ASSET.ICON.STATUS` | Limitation indicator | base | 0 |
| `ASSET.ICON.DRAG` | Tile grip | base | 0 |
| `ASSET.SOUND.TAP` | Neutral contact | base | 1 |
| `ASSET.SOUND.PAPER` | Paper rustle | base | 1 |
| `ASSET.SOUND.SEAT` | Padded contact | base | 1 |
| `ASSET.SOUND.ROLL` | Short roller accent | base | 1 |
| `ASSET.SOUND.WATER` | Paper boat swoosh | base | 1 |
| `ASSET.SOUND.LIGHT` | Lantern opening accent | base | 1 |

## 4. State composition, ownership and reuse

The binding predicates, source-presentation records and twelve `compositionRules` are mandatory together. Loading an image never decides game state or exposes a clue.

- Opening Stage: blank projection, absent Loop/caddy, usable model and all exits.
- Kit first: one open seated caddy, both leaflets, editable rail; projection stays blank.
- Loop first: initial puppet world; bay stays empty. Media never draws a second Loop.
- Seed-only result: Grandma holds the dark seed at (87,59), while Pip and backpack remain across the river. Unmet Hill holds that contrast with the factual caption.
- Joined Boats: both boats form the crossing; Pip moves to (77,66), bringing the seed only if it was still left. The original torn footbridge remains distinct.
- Successful Hill: Pip and Grandma reach the planting point together; roots replace the loose seed; an unlit bud appears. Flower then opens and lights both banks.
- Extra Ferry: no uprooting, reverse crossing or penalty. When boats are already joined, only their lower hull fold makes a tiny contained bob; the continuous deck remains. No third boat is spawned.
- Actual tile change: one atomic order update; reset displayed puppets/current certification. Selecting, canceling or producing the same order leaves the certificate intact.
- Ending: the whole launched arrangement must finalize before celebration. Historical premiere completion can remain true after a later edit while current launch eligibility is false.

**BPL, FBPL, BFPL, BPFL and BPLF** all use the same parts and clips (B=Joined Boats, P=Hill, L=Flower, F=One Boat; these abbreviations are production notation only). No asset encodes a preferred solution. The last harmless Ferry in BPLF still runs before completion.

## 5. Animation and audio contracts

Full clip records give triggers, prerequisites, constituent asset IDs, start/end states, timing, looping, captions, commit ownership, interruption, replay, reduced motion and missing-asset behavior. The following are production targets, not measured responsiveness.

| Clip | Duration ms | Commit policy | Concrete motion |
|---|---:|---|---|
| `CLIP.WALK` | 500 | decorative | 4 cels at8 fps;500 ms gait cycle, actual travel duration comes from path/speed. Carry pose reuses leg cycle below waist. |
| `CLIP.ROLL` | 334 | decorative | 2roller cels at6 fps;334 ms cycle only, actual path travel unchanged. |
| `CLIP.REACH` | 400 | decorative | Interpolate0–240 ms, hold160 ms; operation owns actual effect |
| `CLIP.MODEL` | 600 | physical | Tab0–220; Pip local23→30 x220–420; left torn end folds420–600 |
| `CLIP.BRIEF` | 450 | physical | Hinge/slide blank art0–350; contact100 ms; mount actual text only at readable endpoint |
| `CLIP.DRAWER` | 450 | physical | Hinge/slide blank art0–350; contact100 ms; mount actual text only at readable endpoint |
| `CLIP.REQUEST` | 450 | physical | Hinge/slide blank art0–350; contact100 ms; mount actual text only at readable endpoint |
| `CLIP.DOCK_OPEN` | 450 | physical | Hinge/slide blank art0–350; contact100 ms; mount actual text only at readable endpoint |
| `CLIP.CADDY_OPEN` | 450 | physical | Hinge/slide blank art0–350; contact100 ms; mount actual text only at readable endpoint |
| `CLIP.LEAFLET` | 450 | physical | Hinge/slide blank art0–350; contact100 ms; mount actual text only at readable endpoint |
| `CLIP.NOTICE` | 800 | physical | Release clip0–150; blank reverse uncurls150–650; reclip650–800; full text only after secure |
| `CLIP.WAKE` | 500 | physical | Lens0–250; turn250–500 |
| `CLIP.DOCK` | 500 | physical | Actual channel travel first;500 ms contact/light accent |
| `CLIP.COLLECT` | 350 | physical | Lift200, contact150; switch host at endpoint |
| `CLIP.HANDOFF` | 350 | physical | Lower200, contact150 |
| `CLIP.TILE` | 180 | physical | Interpolate changed locations; swap paths separate by3 CSSpx |
| `CLIP.E2` | 3000 | decorative | 3authored stills1000 ms each; manual buttons immediate |
| `CLIP.PETALS` | 4000 | decorative | Keyframes0/2/4s rotations[-6,+6,-6]deg;6CY/4WK instances stagger400 ms within V; Media3flat never move |
| `CLIP.FERRY` | 1200 | cue | Load0–150, travel150–950, receive950–1200; empty boat small bob below crossing, same total |
| `CLIP.BRIDGE` | 1400 | cue | Join0–400; Pip[23,70]→[77,66]400–1200; arrive1200–1400 |
| `CLIP.PLANT` | 1200 | cue | Reach0–400; hands/seed meet[83,66]400–800; roots800–1200. Unmet variant800 ms then indefinite factual hold. |
| `CLIP.BLOOM` | 1200 | cue | Head0–600, light600–1200. Unplanted variant800 ms then hold; already-lit noop1200. |
| `CLIP.TOAST_REVEAL` | 7000 | toast | 0–3000arms/lights/lid;3000–5000tray+toast;5000–7000magnifier. Gentle light pulse≤1Hz. |
| `CLIP.TOAST_REPLAY` | 2000 | toast | Small arms/lid flourish around same tiny toast |
| `CLIP.CELEBRATE` | 800 | decorative | Restrained hand/lens accent, no confetti obscuring backpack |
| `CLIP.FOCUS` | 120 | decorative | Opacity120 ms; no size bounce or solution color |
| `CLIP.NPC_TURN` | 400 | decorative | Turn crossfade150 ms then hand/pose250 ms; feet remain anchored, body never walks |
| `CLIP.TOAST_IDLE` | 2000 | decorative | Contained +/-0.15logicalunit lid vibration at0/500/1000/1500/2000 ms; no early reveal |

Walking/rolling numbers are gait-cycle durations; actual path travel still follows Item 09. Docking's 500 ms is its contact accent after travel. An unmet Hill/Flower has an 800 ms presentation variant followed by an indefinite factual hold. There is no response timer.

A physical operation canceled before contact/readable completion returns to its stable origin; one already committed retains its result. Opening a source/help/rail view during a puppet cue settles that cue once, records its outcome, and pauses before the next cue. Continue retains mode/revision/index; a paused final endpoint can finalize once without replaying it. A hard close restores the acknowledged save boundary and retains uncertainty about potentially seen outcomes.

Animation callbacks never grant resources, change orders, certify success, finalize shows or judge understanding. They present the existing operation. Reduced motion supplies the same committed endpoint and factual description; it is accessibility support, not answer help.

| Sound | Intended effect | Duration ms | Matching clip events |
|---|---|---:|---|
| `SFX.TAP` | Neutral contact | 110 | REACH, TILE |
| `SFX.PAPER` | Paper rustle | 320 | MODEL, BRIEF, REQUEST, NOTICE, CADDY_OPEN, LEAFLET |
| `SFX.SEAT` | Padded contact | 180 | DOCK, COLLECT, HANDOFF |
| `SFX.ROLL` | Short roller accent | 450 | ROLL, WAKE |
| `SFX.WATER` | Paper boat swoosh | 500 | FERRY, BRIDGE |
| `SFX.LIGHT` | Lantern opening accent | 650 | BLOOM |

Six original short foley recordings are planned, using 48kHz/24-bit mono WAV masters and 128kbps MP3 runtime files. Use short fades, peak at or below −6dBFS, default effects gain0.25 and at most three concurrent effects. Repeated callbacks cannot replay an owned contact. Skipped/settled animations need no catch-up sound.

Silence is the complete functional fallback. There is no voiced dialogue, narration service, music system, alarm for mistakes or correctness jingle. Every necessary fact remains visible and captioned.

## 6. Export, accessibility, loading and budgets

Rooms use 1440 × 960 base exports and 2880 × 1920 alternatives only from masters with actual supporting detail. Master directories retain separate editable PNG layers and alignment/provenance notes. The current 1536px paintings are appearance references; enlarging them is not the production method.

Opaque backplates export WebP and PNG fallbacks. Alpha props/figures export PNG at base/2x. Four base pixels of clear padding (eight at2x) surround alpha content; no dark matte/fringe. Poses use an identical padded frame and normalized anchor. For example, the player's72 × 144 content uses an80 × 152 padded frame; the avatar's logical body remains6 × 12 units. The renderer fits the content rectangle to V and expands only the transparent destination margin. Texture sizes never become collision bounds.

Actor and paper cels pack at most four columns; dimensions, rows, density and frame count are explicit per export. There is no packing optimization assumed beyond these calculated sheets. Backgrounds are the intentional exception to a2048px sprite-sheet side limit.

Native readable text/focus/captions remain outside bitmaps. Retain the Segoe UI/Arial/sans-serif installed stack, normal/larger/largest settings, roomier leading, and48 CSSpx actions. A390px compact view keeps the whole390 × 260 room overview; Arrange/Watch share the same rail and story. Whole-story enlargement retains both banks. No source shrinks to fit an artwork panel.

**Allocated transfer caps / calculated decoded image memory, MiB:**

| Load group | Transfer base / high | Decoded base / high |
|---|---:|---:|
| room-ST | 1.50 / 2.75 | 7.00 / 27.99 |
| room-CY | 1.50 / 2.75 | 7.46 / 29.83 |
| room-WK | 1.50 / 2.75 | 7.18 / 28.72 |
| room-MD | 1.50 / 2.75 | 6.75 / 27.01 |
| shared | 0.75 / 1.50 | 2.78 / 11.11 |
| puppet | 0.38 / 0.75 | 1.26 / 5.03 |
| e2-on-demand | 1.00 / 2.00 | 4.94 / 19.78 |
| native | 0.00 / 0.00 | 0.00 / 0.00 |
| audio-on-demand | 0.06 / 0.06 | 0.00 / 0.00 |

The initial base-density allocation is **3.625 MiB**:1 MiB core/native code/text,1.5 MiB Stage,0.75 MiB shared and0.375 MiB paper story. That leaves0.375 MiB below the4 MiB initial target. E2 and audio are outside the opening's critical path. Each room bundle is capped at1.5 MiB base/2.75 MiB high, within Item 09's3 MiB per-room target; shared components are paid once.

Decoded memory counts padded RGBA sheets, one format/density per variant, actual shared reuse, a canvas, a projection-only scratch buffer, float32 decoded audio and a4 MiB reserve. The calculated current base scene is **27.07 MiB**. The high-density current scene is **83.22 MiB**, rising to **90.67 MiB** while replacing its base room images, below96 MiB. Including three adjacent base rooms and cached base E2 frames yields a conservative **117.25 MiB** allocation, below192 MiB.

This fits only with the stated loading policy: one current high-density room; adjacent rooms cached at base; E2 high density holds current/next recording frame **or** the photo; release replaced densities; use a projection scratch buffer, not a second full-room buffer. Encoded PNG fallback sizes must also meet their cap. If real files fail, first remove duplicate loads, improve packing and lossless compression, and correct cache lifetime. Do not silently lower the chosen aesthetic.

These are calculated allocations. Actual encoded bytes, decoder overhead, GPU/browser memory, opening time, frame rate and perceived sharpness are unmeasured. The existing5-second/60 fps/30 fps/input targets remain later runtime work.

## 7. Existing-reference assessment and provenance

All five current paintings were visually inspected. They provide a coherent target for expressive faces, detailed clothing, layered paper, painted wood/teal equipment, warm directional light and depth. None supplies the required separate alpha layers, full poses, precise geometry and full state coverage, so **none is marked production-ready**.

The manifest registers84 relevant existing images with actual dimensions, byte sizes and SHA-256 hashes. Seventeen received visual inspection in this task; the remaining referenced diagrams received metadata/reference checks, not a new visual review. The user's preserved cast/Stage inputs remain unedited, and old Jo artwork stays superseded.

The reference chain and exact historical generation prompts remain in [provenance](08-visual-designs/PROVENANCE.md) and [revision prompts](08-visual-designs/ILLUSTRATED-REVISION-PROMPTS.md). The exact model version, outside rights to user-supplied inputs and future artwork creator records are not invented. Planned original reconstruction is distinct from the generated reference. If production later uses generation, record its actual tool, inputs and transformations on that produced asset.

No new outside pack, font file or licensed material was selected, purchased or downloaded. Installed font names are retained; font binaries are not redistributed. No exclusivity or blanket legal clearance is claimed.

Readiness remains six separate facts: reference available, requirements defined, production file exists, export technically checked, production visual review, runtime integration checked. Only the first two are fulfilled where relevant; audio has no existing sound reference.

## 8. Ordered production queue and effort

These are **asset-focused estimates**, assuming one practiced 2D artist working from the settled references, reusable layers, and one targeted review pass. They exclude game implementation, live AI, deployment, child testing and the revised whole-project schedule. The old deadline or daily-hour offer is not a verified production forecast.

| Group | Stage | Scope | Effort | Depends on | Deliverable |
|---|---|---|---:|---|---|
| Q00 | first-connected | 32 referenced assets | 2–4 h | None | Confirm native token/icon/layout specification and content references; hand builder exact primitives/empty states. |
| Q01 | first-connected | 58 referenced assets | 6–10 h | Q00 | Create all individually specified temporary silhouettes/components, including Toast and full puppet endpoints. No standalone opening-only demo. |
| Q02 | illustrated-production | 6 referenced assets | 22–36 h | Q00 | Backpack motif master first, then five character masters and61 world-actor cels with current Jo identity. |
| Q03 | illustrated-production | 5 referenced assets | 12–20 h | Q00 | Four empty rich room backplates and3 doorway variants. |
| Q04 | illustrated-production | 30 referenced assets | 20–32 h | Q03 | Furniture, all physical carriers/state pieces, caddy/lid, notice and complete Toast parts. |
| Q05 | illustrated-production | 11 referenced assets | 10–16 h | Q02 | Reusable terrain, two figures, seed, boats, roots and flower with cue endpoint poses. |
| Q06 | illustrated-production | 6 referenced assets | 6–10 h | Q02, Q03, Q04 | Four equal-status tile faces, three E2 historical frames and frozenpartial photo. |
| Q07 | illustrated-production | 58 referenced assets | 10–18 h | Q02, Q03, Q04, Q05, Q06 | Pack/export/alpha cleanup and review shared28 clip endpoints; inspect representative connected compositions against Item 08. |
| Q08 | audio | 6 referenced assets | 2–4 h | Q00 | Six original short foley masters/MP3 exports. |
| Q09 | optional-polish | 10 referenced assets | 3–6 h | Q04, Q07 | Refine contact shadows, restrainedpetal/Toast flourish and lens lighting already specified; no added assets/features. |

Q00–Q01 total **8–14 hours** of asset preparation/temporary equivalents. Required illustrated production and export work Q02–Q07 totals **80–132 hours**. Original optional audio adds2–4 hours; decorative refinement adds3–6 hours. Including every group gives **93–156 asset-work hours**. Repeated references in export/review groups are workflow effort, not additional unique assets.

The first connected build needs all four room assemblies, visible movement, source carriers, both resources/notes, four tiles, paper consequences, stop/resume and premiere. Their specified temporary equivalents can unblock it. Final painting can proceed alongside implementation after scale/attachment contracts are confirmed: cast/motif and empty rooms can proceed independently; furniture aligns to rooms; E2 depends on the settled Loop/Courtyard look; puppet poses share the backpack motif.

These ranges do not guarantee that the chosen quality fits the eventual remaining calendar. Item 11 must reconcile actual availability and ownership of the art work with implementation time.

## 9. Temporary equivalents and replacement criteria

Every asset's `temporary` record states exactly what to draw, which named object/state it preserves and its final replacement ID. They are specifications; no stand-in files were manufactured here.

- Painted components use original functional silhouettes at exact bounds, separate source text, actual ownership and explicit pose/state endpoints. A whole reference screenshot is not a temporary interactive room.
- The caddy stand-in still moves once, includes both notes and all tile ownership operations, and leaves an empty recess. The notice still has curled/moving/secured states. E2 still exposes individual frames.
- Paper-story stand-ins still distinguish Pip left/right, seed left/right/planted, joined boats, roots, bud/light and unmet outcomes. Silencing or simplifying decoration does not remove consequences.
- Native components retain their defined structure, focus and exact copy. Audio may remain silent.
- Replacement preserves IDs, anchors, bounds, source/cue meanings and native controls. Accept final assets only after rich-reference comparison at actual scale, alpha/pose/export checks and later integration review.

Maximum Toast is optional for the child, but its specified existing interaction is part of the asset coverage. It can use the planned functional components in the first connected case; optional polish does not authorize deleting it.

## 10. Coverage and verification evidence

The [crosswalk](10-asset-production/ASSET-STATE-CROSSWALK.md) maps **107 Item 05 scene/object/access identities**, all **93 Item 06 interface states plus three Item 09 technical states**, and all **121 Item 06 transitions**. It includes15 written route/state traces.

Executed checks cover schema acceptance/rejection, every unchanged Item 09 AssetUse binding, unique IDs, dependency cycles, valid asset/content/source references, variant/export geometry, file paths/hashes/dimensions, inventory totals and loading arithmetic. The report is authoritative for the actual pass/fail count and document hashes.

The written traces cover opening, E4/NAV search, partial E2/full E3, Media first, unread-note transport, either resource first, unmet planting, five valid orders, launch/ending/replay, interruptions, changed certification, coaching fallback/staleness, compact keyboard/non-drag access, saving/recovery and ignored/interrupted/replayed Toast.

**Not performed:** production image/audio creation or editing, real export inspection, browser gameplay, keyboard/touch/accessibility qualification, measured performance, player enjoyment or learning evaluation. Valid design records do not establish those outcomes.

## 11. Completion evidence against Item 10

| Checklist subitem | Evidence | Status |
|---|---|---|
| Stable IDs for every environment, character, object, puppet, interface, animation and sound |96 assets,28 clips,6 sounds,157 bindings; individual index and crosswalk | Defined |
| Uses, variants, dimensions/scale, formats, anchors/hit authority and reuse | Per-asset geometry/exports/variants; owner bindings; composition rules; shared profiles | Defined |
| Original/generated/licensed/temporary origin and provenance/license fields | Reference metadata and profiles; actual prompt chain; explicit unknowns; original production methods and individual temporary records | Defined |
| First connected case, replacements and optional production order | Q00–Q09 with exact asset lists, dependencies, estimates, checkpoints and blocking scope | Defined |
| Animation/audio timing and fallback with restrained budget |28 clip contracts,6short sounds, reduced-motion/silent equivalents and calculated transfer/decoded allocations | Defined |

**Item 10 is complete as asset planning.** No final asset manufacture is required to mark this definition complete. No later checklist status is advanced.

## 12. Remaining constraints and exact Item 11 inputs

No missing asset-selection or interaction decision blocks this plan. The remaining execution constraints are real: final production files do not exist; compression/detail/alpha and runtime readability are unmeasured; actual artist throughput and calendar capacity are unknown; future creator/distribution records must accompany produced assets. Other previously recorded Item 09 live-AI/child-text constraints remain in Item 09.

**Next: Item 11 — Final Codex build packet and revised schedule.**

Item 11 receives the unchanged Items01–09, this manifest/schema, asset/state crosswalk, validated counts/allocations, production queue/estimates, every temporary replacement target, and the explicit unperformed checks. It must integrate these into one bounded build packet, assign actual production responsibility, and revise the whole-project schedule using current facts. Item 12 remains the separate build-readiness checkpoint.
