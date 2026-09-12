# Evidence Quest — Item 05: Functional Scenes and Interactions

**Case:** Launch Day: Where’s Loop? / The Little Bridge  
**Date:** September 10, 2026  
**Deliverable:** functional design of the four rooms, their objects, and their responses.  
**Basis:** [v3 specification](Evidence-Quest-Complete-Game-Specification-v3.md), especially §§3–12, and [Master Checklist](EVIDENCE-QUEST-MASTER-CHECKLIST.md), items 01–05.  
**Scope:** Item 05 only. Coordinates, placements, timing targets, and ambiguity resolutions below are new design recommendations. They are specified defaults for this plan, not claims of earlier user decisions or measured gameplay. No running game, artwork, interface mockup, or technology selection accompanies this document.

**Interface/content handoff update:** [Item 06 — Complete Interface and Player Flows](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/06-COMPLETE-INTERFACE-AND-PLAYER-FLOWS.md) defines the supporting interfaces and resolves E2 document availability versus actual exposure below (D06-01). [Item 07 — Complete Child-Facing Content and References](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/07-COMPLETE-CHILD-FACING-CONTENT-AND-REFERENCES.md) now supplies exact content and its conditions. Geometry, decisive source wording and game rules remain unchanged. Earlier next-item references here describe this document's historical handoff to 06; the Master Checklist now identifies Item 08 as next.

## 1. What these rooms let the child do

The Stage introduces the child’s own crew project, its unfinished paper story, and its missing projector. Two short exits let the child investigate either Remy’s cancellation claim in the Courtyard or the available recording spaces through Workshop. Courtyard provides a physical context correction: unfold and secure the notice, then see exactly which event was canceled. Workshop makes the venues understandable and offers a direct onward route. Media rewards reaching it, by any route, with the true account, a responsive Loop, and the materials needed for the original premiere assignment.

The return transforms the existing Stage workstation into a usable rehearsal space. The child handles physical tiles below a projection where both banks remain visible. Sending the seed without Pip has a visible consequence; changing the tile arrangement changes what the puppets do. The same pad whose opening Preview failed eventually launches the child’s successful arrangement.

The intended interaction rhythm is **notice an opportunity → move to it → do something concrete → see what changed → choose the next action**. An explanation can accompany a choice, but never grants access to a room, object, or successful show.

### Requirements and decisions

| Category | What controls this plan |
|---|---|
| Established basis | Ages 9–12; contemporary SparkFest; visible avatar; fixed-camera interactive 2D; click/tap intent; screen-relative keyboard movement; non-spatial equivalents; four accessible rooms; frozen source and puppet rules; short revisits; optional dead lead and humor. |
| Recommended here | Desktop/laptop landscape first; 120 × 80 logical room frames; furniture and door positions below; shared workstation; fixed Media reading copies; exact cancellation/commit behavior; doorway companion anchors; observation timing; functional small-screen fallback. |
| Deferred presentation | Palette, camera illustration angle, detailed silhouettes, fonts, source-panel composition, complete menu layouts, export sizes, animation production and implementation technology. Later design must retain the clearances and information boundaries here. |
| Remaining evidence | Runtime navigation, readability at actual display sizes, first-time clarity, child appeal, accessibility qualification, and learning outcomes are untested. They are later evaluation work, not missing coordinates. |

## 2. Shared spatial conventions

### 2.1 Coordinate and viewing system

Each scene has a **120-unit-wide × 80-unit-high logical frame**. Origin `(0,0)` is top left; +x goes right and +y down. One unit is a planning measure, not an exported-art pixel or a CSS pixel. Coordinates map directly to the displayed floor directions even if later art depicts slanted tabletops. There is no hidden depth axis that reverses keyboard movement.

Notation: `R(x1,y1,x2,y2)` is a closed axis-aligned rectangle; `P(x,y)` is a point; `C(x,y,r)` is a circular ground footprint. A range in a table includes its boundary. Every room uses floor region `W = R(4,28,116,76)`, minus its listed collision footprints. Decorative upper-wall and projection space lies above the floor. Door threshold exceptions are explicitly listed below; the rest of the boundary is solid.

The avatar’s ground footprint is radius **2**; Loop’s is radius **2**; an idle NPC uses radius **3**. Suggested avatar drawing envelope is 6 units wide × 12 high, rising from its feet. Loop’s drawing envelope is 6 × 7. These are scale constraints for later design. Keep a 1-unit visual gap where practical. Walkers’ centers remain at least 2 units from hard obstacles and floor boundaries. The clear center spine at y=58–62 links side doors; no decoration, foreground guest, prop, or toast animation may intrude into it as a hard obstacle.

The fixed world frame always includes both exits in two-exit rooms and all three Workshop exits. It does not pan to chase the avatar. Layered art can rise above an object’s feet, but may not hide another interactive object, the avatar at a stopping point, or a door label. Important source text opens as readable text; it is never dependent on tiny writing in the scene art.

### 2.2 Four different object areas

| Area | Meaning | Rule |
|---|---|---|
| **Visual bounds (V)** | Drawn body, including parts above the floor | May overlap other visual layers only without concealing an essential target/state. Never imply that empty transparent art blocks walking. |
| **Hit region (H)** | Pointer/touch selection region | Starts from the visible actionable part. Expand on screen toward free space to target 48 CSS pixels; do not enlarge floor collisions to obtain touch targets. Resolve remaining overlap with the chooser in §3. |
| **Collision footprint (C)** | Ground area occupied by hard furniture | Used for movement. Children mounted on furniture inherit its footprint; they do not add another collision layer. NPCs and following Loop use the yielding rules, not permanent room cuts. |
| **Approach/contact (A/F)** | A is where the avatar stops; F is the front edge of the object being operated | The listed A is authoritative. For top furniture, F is the nearest point on its lower edge with the same x. For the lower Stage console, F is its upper edge. Reaching A enables the object’s reach/operate motion; clicking it from elsewhere queues a legal approach first. |

A table’s notes can sit farther back visually while its front edge remains within approximately 6–8 units of A. This is a stylized tabletop interaction, not a requirement for the avatar to stand on the paper. Later animation can bring the note toward the child. Use one shared working position for rail manipulation, rather than making the child walk a tiny distance for every slot.

For a character, choose the shortest reachable one of the listed A points; on a tie use the first. The character turns to face the avatar without moving its home footprint. Background visitors are scenery outside the clear floor. Loop yields and never captures input intended for a floor destination; NPCs cannot permanently block their approach points.

### 2.3 Door and arrival definitions

A door is both a visible destination and a traversable threshold, never an evidence check. West/east doors are drawn in `R(0,54,8,70)` / `R(112,54,120,70)`. Their threshold anchors are `(6,62)` / `(114,62)`, within the avatar-safe floor boundary. The north Workshop door is `R(55,20,69,33)` with anchor `(62,30)`. Media’s south door is `R(55,72,69,80)` with anchor `(62,74)`. Crossing the anchor’s plane triggers the transition; the character never walks through the surrounding wall.

| Physical door ID | Scene and approach → threshold | Destination door | Destination avatar / facing | Following Loop arrival |
|---|---|---|---|---|
| `ST.EXIT.CY` | Stage `(12,62)` → `(6,62)` | `CY.EXIT.ST` | `(12,62)` / right | `(12,70)` |
| `CY.EXIT.ST` | Courtyard `(12,62)` → `(6,62)` | `ST.EXIT.CY` | `(12,62)` / right | `(12,70)` |
| `ST.EXIT.WK` | Stage `(108,62)` → `(114,62)` | `WK.EXIT.ST` | `(12,62)` / right | `(12,70)` |
| `WK.EXIT.ST` | Workshop `(12,62)` → `(6,62)` | `ST.EXIT.WK` | `(108,62)` / left | `(111,70)` |
| `CY.EXIT.WK` | Courtyard `(108,62)` → `(114,62)` | `WK.EXIT.CY` | `(108,62)` / left | `(108,70)` |
| `WK.EXIT.CY` | Workshop `(108,62)` → `(114,62)` | `CY.EXIT.WK` | `(108,62)` / left | `(108,70)` |
| `WK.EXIT.MD` | Workshop `(62,38)` → `(62,30)` | `MD.EXIT.WK` | `(62,66)` / up | `(70,66)` |
| `MD.EXIT.WK` | Media `(62,68)` → `(62,74)` | `WK.EXIT.MD` | `(62,42)` / down | `(70,42)` |

This is a connected venue map, not one continuous survey of a real building: opposing drawings need not share global compass coordinates. Every pair has explicit arrival/facing information. No edge links Courtyard directly to Media.

```text
                    COURTYARD
                   /         \
                STAGE ----- WORKSHOP ----- MEDIA
```

Arrival is complete before another exit may activate. Holding a movement key across a transition does not send the child back immediately: that key must be released before it can cross the arrival threshold. A fresh destination command works immediately. Fast deliberate room changes remain allowed.

### 2.4 Travel and future art changes

Recommended movement speed is **15 logical units per second**, with no stamina or sprint requirement. A typical 45–95-unit object-to-exit route therefore suggests roughly **3–6.5 seconds**, before interaction or transition effects. Short adjacent actions take less. These are distance-based design estimates, not measured game timings. Keep any door transition brief and skippable with reduced motion.

Art may reshape furniture within its reserved footprint, improve hand reaches, or refine upper-wall composition. Moving a ground footprint, shrinking a through-route, hiding a source, or changing an arrival point requires updating this document and rechecking its route traces. It must not silently alter what the child can reach or learn.

## 3. Shared interaction contracts

The room tables provide identities and geometry. The contracts here provide common fields; §8 gives each object’s specific state, response, provenance, and exceptions. Together they are the complete catalog. A child ID inherits its listed parent’s collision footprint, not its parent’s action.

### G1 — Select, approach, and commit

- **Pointer:** click a floor point to walk there; click an object to approach its A and perform its named default action. No double-click is required.
- **Touch:** tap gives the same intent. A second tap, hover, or long press is never necessary to reveal an essential action.
- **Keyboard:** arrows/WASD move on the screen’s axes while the world has focus; Interact operates the nearest available target in reach, with its name visible. If several qualify, use the target chooser. Native focusable object controls and “Move to…” queue the same approach and action. No proximity is inferred from keyboard focus alone.
- **New intent:** replace the old path and pending action. An action not yet committed does not happen. An already committed action is not undone. Opening a supporting source or text-entry view stops movement and clears held movement input. Closing it never restarts the old walk.
- **Obstacle:** clicking reachable floor behind a table routes around it. Clicking furniture itself selects its action if any. Clicking inside noninteractive solid scenery leaves the avatar at its current position and briefly shows “That space is blocked.” An unreachable object gives “I can’t reach that from here,” with no remote operation and no lost control.
- **Overlapping targets:** native/temporary interface controls receive input first; in the world, a visible actionable child wins over its parent. If independent children’s expanded hit regions overlap, show their descriptive names for selection. No action fires until the child selects one. Do not resolve ambiguous input by secretly choosing the nearest clue or frontmost scenery. A projected story entity cannot steal a floor click.
- **Repeat:** only one pending action per avatar. Double activation cannot open two copies, collect twice, advance two cues, or launch twice. Active actions with the same intent are ignored until committed or canceled.
- **Unavailable:** retain a named focusable action that explains the actual missing physical prerequisite when relevant. Do not silently swallow the click, call the child wrong, or request an answer form.
- **Cancel:** Escape closes the top temporary view; another world intent cancels a pending walk. For multi-stage object animation, use that object’s defined commit point. There is no forced conversation lock.

### G2 — Readable sources and physical containers

Source interactions begin at the physical A on first inspection. A source view preserves author, title, event time where known, original words, and canonical passage IDs from v3 §6. A drawer/flap physically opens before its source text appears. Commit its open flag when the readable surface is available. If interrupted before that point, settle closed; after it, retain open. A later close of the reading view leaves the physical access available. Open containers never enlarge the collision footprint into the route.

Record **content presented**, not “child understood” or “proved they read.” Record the passages actually exposed; do not mark every E2 component seen because its landing view opened. Approach, collection, navigation labels, and unopened source copies do not fabricate reading events. A repeated presentation preserves the canonical record and can retain its own exposure time without adding a second clue.

Collected evidence can reopen anywhere using `ACC.EVIDENCE.<canonical ID>`; no new physical trip is required. Document availability and actual passage exposure are distinct: a legitimately acquired document can contain parts available to inspect but not yet presented for coaching/observation purposes. Close restores focus to the originating physical or evidence control. The original remains visitable. A source-view action such as enlargement, definition, or clip frame step operates that view; it does not move the avatar. First access to an unacquired source cannot be obtained by invoking its internal ID. Owned portable notes remain a legitimate first-reading route.

### G3 — Characters and evidence presentation

Talk, Ask, Show evidence, and an explanation addressed to an NPC use the NPC’s A. The optional crew-plan tool is a separate in-place access: it stops movement and records the child's plan without silently giving Jo new knowledge or delivering a remote NPC reply. A story plan explicitly addressed to Jo still approaches her; a saved private draft can be edited in place. An evidence selection does not consume the record. Showing a discovered record conveys its selected passage(s), or all of its actually presented portions if “Show record” was chosen. The NPC’s knowledge adds only those facts. It does not mark the player as reading an unseen passage or manufacture an earlier inference.

If the player starts Show evidence from the tray, choose a named NPC in the current room, then legally approach them. For a character elsewhere, offer their room as a destination; no unseen remote reply is delivered. Canceling before arrival shows nothing. Repetition is harmless and uses the NPC’s current knowledge. For irrelevant combinations, give a short neutral response with no new fact; the exact default is “I don’t have anything to add from that.” The child can leave immediately.

An NPC’s authored explanation is distinct from AI interpretation. Whole-solution help is available on explicit request and records what it revealed. Merely talking does not recite the solution. Knowledge and source-access rights never depend on having selected a theory. Full contextual text and interface composition are consumed by items 06–07; the required branches are bound in §8.

### G4 — Doors, the avatar, and Loop

Each transition atomically stores the destination scene, avatar arrival, and — only when following — the single Loop entity at the table’s companion anchor. The doorway animation may finish afterward. A reload uses those settled positions; it does not create a second follower in the old room. Before crossing commits, cancel remains in the old scene. After it commits, a new intent belongs to the destination.

Loop follows the avatar’s legal path at a target distance of 7 units. It follows the path around furniture, not a straight line through it. The avatar has priority: Loop’s collision cannot block player movement, source approaches, or an exit. On contact it waits or yields sideways into legal floor; if no separated spot is available it may visually overlap briefly rather than strand either actor. It never becomes a new hard obstacle. At a new approach, place it at the nearest legal point at least 5 units from the avatar, behind the recent path where possible. Destination anchors are the deterministic recovery fallback.

Before recovery, Loop stays in Media. After docking, it stays on Stage, even when the child leaves. There is no added undock task. Loop projecting is the same docked robot. NPC feet are similarly nonblocking for the player; their home placement and approaches normally avoid overlap.

### G5 — Scenery and read-only world state

Scenery has no hover puzzle cue, hidden item, default action, or evidence reward. A brief scene description can name the relevant conditions. A coherent scenery group may animate within its reserved V; it never changes its C or covers a required action.

Projected story entities use the PUP IDs in §6. They show the effects of tiles and have native read-only state descriptions. They cannot be dragged, collected, used as floor destinations, or moved through a “Move to…” control. Inspecting their state does not run a cue or quote an unread creator note.

## 4. Main Stage — `SC.ST`

### Purpose, arrival, and encounter order

The first avatar position is `P(20,50)`, facing up toward the paper model, with the initial “YOU” label. Jo is beside that work area, not stationed across a doorway. The paper tab is the nearest large manipulation. The empty dock, blank backdrop, and unoccupied rack bay are visible together, making the incomplete premiere physically apparent.

The model is on the upper left; Jo is immediately to its right. The board with the request and crew-message access is upper center. Loop’s dock is upper right. The long, low workstation is below the clear through-route. This leaves an unobstructed view of the backdrop above it. From either side entrance, the two work areas and both exits remain visible; returning children do not have to rediscover the workstation behind new furniture.

```text
STAGE  — functional zones, not exported art
 y 0     [          projected story: both banks          ]
 y28     [model/E1/E6] [request/E2]      [Loop dock]
 y48          YOU   Jo       open approaches
 y62  ← Courtyard ===== clear through-route ===== Workshop →
 y66                    [rack | rail | controls]
 y80
```

### Geometry and object placement

Hard obstacles are only `ST.MODEL C=R(8,28,32,40)`, `ST.BOARD C=R(46,28,62,38)`, `ST.DOCK C=R(68,28,84,41)` for the avatar, and `ST.CONSOLE C=R(48,66,106,76)`. Jo’s yielding footprint is `C(37,48,3)`. The dock has a Loop-only channel described in §8. Stage’s player arriving from Workshop at `(108,62)` and companion `(111,70)` remain outside the workstation and inside the floor.

| ID / parent | Placement: V or actionable part; inherited C where applicable | Approach A | Function / catalog contract |
|---|---|---|---|
| `ACT.PLAYER` | Initially feet `(20,50)`; later actual safe floor position | Not an object target | G1/G4; visible movement and reach; no player-creation step. |
| `ACT.JO` | Feet `(37,48)`, V `R(33,35,41,49)` | `(37,56)`, `(30,48)`, `(44,48)` | G3 and §8.1; faces model initially. |
| `ST.MODEL` | V `R(8,17,32,40)`; physical miniature, backpack, river and broken footbridge | `(20,48)` | §8.1 opening action; static initial-story illustration after play. |
| `ST.MODEL.TAB` / model | H around tab `R(16,36,24,40)` | `(20,48)` | Pull paper tab; no independent C. |
| `ST.SOURCE.E1` / model | Clipboard/flap `R(8,24,15,33)`; opens within model V | `(12,48)` | G2 + §8.1; canonical E1. |
| `ST.SOURCE.E6` / model | Front drawer handle `R(25,35,31,39)`; drawer contents stay within V | `(28,48)` | G2 + §8.1; canonical E6. |
| `ST.BOARD` | V `R(46,26,62,38)` | Child approaches below | Mount only; not an extra clue. |
| `ST.SOURCE.E4` / board | Folded request `R(47,26,54,34)` | `(50,45)` | G2 + §8.1; canonical E4. |
| `ST.ACCESS.E2` / board | Crew-message screen/indicator `R(55,27,62,36)` | `(59,45)` | §8.2; a second access to Remy’s shared post, not a second tablet inventory item. |
| `ST.DOCK` | V `R(68,26,84,41)`; Loop tray center `(76,35)` | `(86,48)` | §8.3; Inspect empty bay / Dock Loop. |
| `ST.DOCK.FLAP` / dock | Low service/access flap `R(70,34,80,40)` | `(86,48)` | §8.3; opens to show the unoccupied/occupied connection bay, never a repair panel. |
| `ST.DOCK.PAD` / dock | Visible contact pad at `(84,39)` | `(86,48)` | §8.3; same default action as dock; no second robot control system. |
| `ST.CONSOLE` | V and C `R(48,66,106,76)`; child works from upper edge | Shared work A `(78,58)`; rack A `(55,58)`; controls A `(100,58)` | Stable owner of rack bay, rail, and all stage controls. |
| `ST.RACK.BAY` / console | `R(49,67,63,75)`; empty outline until caddy delivered | `(55,58)` | §8.4; eventual home of single `KIT.CADDY`. |
| `ST.RAIL` / console | `R(64,67,93,75)`; no solved example on it | `(78,58)` | §8.5; accepts 0–4 unique cues. |
| `ST.RAIL.A–D` / rail | Tile centers `(67,71)`, `(74,71)`, `(81,71)`, `(88,71)`; each 6 × 6 | Shared `(78,58)` | Authoring capacity positions; letter IDs and future empty positions are not child-facing answers. |
| `ST.CONTROL.REHEARSE` / console | `R(95,67,99,71)` | `(100,58)` | §8.6; fresh rehearsal; offers Continue when paused through the same workstation. |
| `ST.CONTROL.SHOW` / console | `R(100,67,105,71)` | `(100,58)` | §8.6; one physical pad: opening Preview → Launch → Replay premiere. |
| `ST.CONTROL.STOP` / console | `R(95,72,99,75)` | Existing work A, or queued approach when idle | §8.6; an always reachable immediate action while playback runs. |
| `ST.CONTROL.RESET`, `ST.CONTROL.CLEAR` / console | Owned secondary actions at console’s lower strip `R(100,72,105,75)` | Shared work A | §8.6; chooser labels distinguish Reset rehearsal from Clear rail. Not two overlapping invisible buttons. |
| `ST.PROJECTION` | V `R(38,2,114,25)`; no ground C | Read-only; no avatar approach | §6; blank → initial puppets → outcomes → completed show. |
| `ST.EXIT.CY`, `ST.EXIT.WK` | West/east door bounds from §2.3 | Door table | G4; always available. |

The console’s small logical subparts are representations of one workstation, not demands for pixel-precise clicks. Selecting Rail, rack, or a named control makes the avatar approach the listed work point and opens the corresponding large native working controls. Item 06 determines their composition while preserving the projection. Dragging is available there with equivalent select/place actions. Stop acts immediately during playback, without first walking back to a console; it is the session’s owned stop control, not remote first discovery of an object.

The full projection rectangle through y=25 is reserved against opaque furniture and interface overlays. Board, message surface, request and dock art all begin at y=26 or lower. This separation protects Pip, seed and both banks without putting source targets behind a projection layer.

### Attention, information, and changes

- Initial guidance names the tab, then Preview; it does not lock either exit. The crew assignment is recoverable from Jo/E1 even if the child explores immediately.
- The board’s cue is “Crew message,” not “The premiere is canceled.” The request says “Filming request,” not “Find Loop in Media.” No source is read automatically from a small scene thumbnail.
- Loop’s return fills the same dock. The collected caddy fills the same bay. The former Preview pad remains visibly the same pad. The projection begins with Pip and seed left and Grandma right; it does not run a solved scene merely because Loop docked.
- Sources stay accessible during later visits. Operating the opening model again is an isolated paper demonstration and does not alter the rail or projected state.
- At an unmet rehearsal, leave both banks visible; the console cannot cover the stranded Pip. Source inspection pauses playback before presenting an overlay.
- Functional focus order: room status → model tab → E1 → Jo → E6 → request → message → dock → rack/rail → Rehearse/Show/Stop/secondary actions → exits. Scenery is not interleaved as mandatory stops.

## 5. Courtyard Prop Stand — `SC.CY`

### Purpose and encounter

The wind-tossed paper petals, Remy’s work, and the curled notice share one compact area. From Stage, the player sees the model bench and Remy first, with the curled notice visible farther right. From Workshop, the notice is nearest, but its heading remains hidden until physically flattened. Both entries allow either action immediately.

Remy faces the model bench, away from the notice, and keeps working unless addressed. This avoids staging them as knowingly staring at the full notice while claiming to have seen only the photograph. Flattening the notice changes the physical board; presenting it explicitly changes Remy’s account. No sight-radius simulation silently changes NPC knowledge.

```text
COURTYARD
 y12     [paper petals moving above model bench]
 y28     [boat model/E7] [crew tablet]       [curled notice]
 y48          approaches       Remy          pull space
 y62  ← Stage =========== open route =========== Workshop →
 y76                  clear return floor
```

Hard obstacles: `CY.MODEL.BENCH C=R(10,28,42,40)`, `CY.TABLET.STAND C=R(48,28,58,38)`, `CY.NOTICE.BOARD C=R(80,28,108,40)`. Remy uses yielding `C(64,48,3)`. Notice manipulation reserves `R(82,41,104,52)` for paper/reach effects; it is not a hard wall, extends no farther into the through-route, and never covers a door.

| ID / parent | V or actionable part | Approach A | Function / contract |
|---|---|---|---|
| `ACT.REMY` | Feet `(64,48)`, V `R(60,35,68,49)` | `(64,56)`, `(57,48)`, `(71,48)` | G3 + §8.2; turns toward the player. |
| `CY.MODEL.BENCH` | V `R(10,19,42,40)` | `(24,48)` | Static tiny boat beside E7; no playable crossing before the rail. |
| `CY.SOURCE.E7` / bench | Note `R(21,29,30,37)` | `(24,48)` | G2; Remy’s complete canonical E7. |
| `CY.MODEL.BOAT` / bench | V `R(12,26,20,34)` | No independent action | G5; ordinary model illustrates its subject without playing a solution. |
| `CY.PETALS` / bench | V `R(14,12,42,27)`; motion contained here | No independent action | G5; visibly folds in breeze; descriptive access gives the same outdoor condition. |
| `CY.TABLET.STAND` | V `R(48,22,58,38)` | `(53,45)` | Furniture parent. |
| `CY.ACCESS.E2` / tablet stand | Shared crew tablet `R(49,24,57,35)` | `(53,45)` | §8.2; same E2 as Stage. |
| `CY.NOTICE.BOARD` | V `R(80,12,108,40)` | `(92,48)` | Mount for E3; no separate puzzle. |
| `CY.SOURCE.E3` / notice board | Curled/flat sheet `R(84,17,104,38)`; low clip `(94,38)` | `(92,48)` | §8.2; release, flatten, resecure as one operation. |
| `CY.EXIT.ST`, `CY.EXIT.WK` | West/east from §2.3 | Door table | G4. East door is the crew doorway shown in E2. |

Before flattening, the target is **“Curled notice”** and its scene caption may report only that CANCELED is visible. A moving edge and low reachable clip invite manipulation, without a special solution aura. Afterward the target is **“Courtyard notice”** and the full text remains displayed and available at the same location. The old photograph never updates itself into a full photograph.

After E3 is presented, Remy turns from the tablet to acknowledge the missing context, then resumes work at the same home point. They do not move in front of the exit. The model note and onward Workshop route remain immediately available. Focus order: scene conditions → Remy → crew tablet → notice → model note → exits. No step requires the player to have believed the cancellation claim.

## 6. Workshop Passage — `SC.WK`, and the projected story

### 6.1 Workshop purpose and layout

Workshop is a short junction. Its occupied work surface and neutral venue information help the player choose a place to check. There is no hidden mandatory object under its scenery. Maximum Toast has its own right-hand bay, visibly separated from the through-route and the Media approach.

From Stage, the busy bench and venue board are visible before the north Media exit. From Courtyard, Toast is nearest but the central passage remains plainly open. From Media, the board and both side exits are visible without another tour. The child can pass through while ignoring every optional action.

```text
WORKSHOP
 y28     [shared bench] [venue board]  ↑ Media  [Toast bay]
 y44          approach      approach /       optional apron
 y62  ← Stage ============= open route ============= Courtyard →
 y76                        clear floor
```

Hard obstacles: `WK.BENCH C=R(12,28,40,40)`, `WK.WAYFINDING C=R(44,28,51,39)`, and `WK.TOAST C=R(82,28,108,46)`. The north path has a clear band x=56–74 from y=30 to the center spine. Toast’s full arm/tray sweep is contained in `R(80,9,110,46)`; it never becomes a moving floor barrier.

| ID / parent | V or actionable part | Approach A | Function / contract |
|---|---|---|---|
| `WK.BENCH` | V `R(12,16,40,40)` | Optional look from `(26,48)` | G5; occupied tabletop and scenery supports, not a clue target. |
| `WK.SCENERY` / bench | Paper scenery and moving hanging strip within `R(14,12,38,30)` | No separate action | G5; keeps its own contained motion; no imagined full recording suitability verdict. |
| `WK.WAYFINDING` | V `R(44,13,51,39)` | `(48,47)` | §8.7; opens complete venue descriptions. |
| `WK.ACCESS.NAV` / wayfinding | Readable sign face `R(44,16,51,32)` | `(48,47)` | NAV.ST / NAV.CY / NAV.WK / NAV.MEDIA, separate from E1–E8. |
| `WK.TOAST` | V `R(80,9,110,46)` | `(96,54)` | §8.8; covered demonstration, then tiny toast. |
| `WK.TOAST.START` / kiosk | Button `R(91,37,101,44)` | `(96,54)` | Start demo / Replay demo. |
| `WK.TOAST.MAGNIFIER` / kiosk | Revealed at `R(92,20,103,32)` | `(96,54)` | Enlarge toast after reveal; no progression. |
| `WK.TOAST.SKIP` / kiosk | Owned active-demo control; no independent world footprint | Immediate when running | §8.8; settle revealed, leave travel usable. |
| `WK.EXIT.ST`, `WK.EXIT.CY`, `WK.EXIT.MD` | West/east/north door regions from §2.3 | Door table | G4; no source prerequisites. |

The sign is readable before the child crosses into Media. Hovering the door says “Media”; inspecting venue information says the exact public description, **“Media — indoor filming space with a plain wall.”** Neither mentions Ari or Loop. Global destination lists follow the same rule: rooms and public functions, not unseen inhabitants. Reading this description records NAV.MEDIA as referenceable, without granting a clue-count reward or proving the room is occupied.

Focus order: room description → venue information → Stage/Courtyard/Media exits → optional Toast. Touch selects the large named actions if individual art targets crowd together. Toast’s expanding art cannot take focus away from a chosen exit.

### 6.2 Projection coordinates — `ST.PROJECTION`

The projected story has its **own local 100 × 100 display coordinates**, origin top left, mapped into Stage’s projection V. These coordinates are explicitly local and are never navigable room floor. The screen’s whole width is needed at every cue; any later close-up must retain a both-bank overview or equally available state description.

| Read-only entity ID | Initial local position / visual extent | Changed states and interpretation |
|---|---|---|
| `PUP.LEFT_BANK` | `R(0,56,35,100)` | Stable starting bank. |
| `PUP.RIVER` | `R(35,59,65,100)` | Stable divide; no direct click-to-cross. |
| `PUP.HILL` | `R(65,38,100,100)`; planting spot `(83,66)` | Destination soil; planting opens roots at the same spot. |
| `PUP.BROKEN_BRIDGE` | Pieces at `(34,72)` and `(66,72)` | Shows the initial obstacle; remains distinct from later joined boats. |
| `PUP.PIP` | Feet `(23,70)`, extent about 10 × 28 | Crosses to `(77,66)` only through BRIDGE; looks across while stranded. |
| `PUP.BACKPACK` / Pip | Attached to Pip throughout | Same recognizable creation as physical opening model; never a separate collectible. |
| `PUP.GRANDMA` | Feet `(91,65)`, extent about 10 × 28 | Receives seed, waits, or plants with Pip; stays on destination bank. |
| `PUP.SEED` | Loose at `(29,74)`; minimum readable extent 5 × 7 | Boat transit; Grandma’s hand `(87,59)` when delivered; carried with Pip when needed; planted at `(83,66)`. Semantic location remains left/right/planted. |
| `PUP.BOATS` | Separate boats below crossing line, within `R(36,82,64,96)` | One seed boat travels left→right; joined deck spans `R(34,69,67,77)`. Harmless empty-boat motion stays below a finished crossing. |
| `PUP.FLOWER` | Absent above soil while loose seed is dark; future stem at `(83,66)` | After planting, rooted/unlit bud; after BLOOM, head `R(75,16,92,35)` and narrow stem `R(82,35,84,66)`. Draw behind the foreground characters; preserve their silhouettes and the seed/root action. Light is translucent. |

Paper-model children use the distinct prefix `MODEL.*`: `MODEL.PIP`, `MODEL.BACKPACK`, `MODEL.SEED`, `MODEL.GRANDMA`, `MODEL.RIVER`, `MODEL.BROKEN_BRIDGE`, all within `ST.MODEL` V. They demonstrate only the initial obstacle and cannot receive story tiles. Their local arrangement follows the same left/right story relationship at tabletop scale; they are one coherent physical prop group, with only `ST.MODEL.TAB` manipulable.

## 7. Media Room — `SC.MD`

### Purpose and entry

The south entry gives a clear view of Loop, Ari, the plain wall, and the ready rack station. Loop is plainly visible on the floor between two work surfaces. The mystery ends on arrival if the player came here first; no curtain, password, clue sequence, or Ari conversation is required to reveal it.

The stable recording table is on the left, with the slate on its front-right corner. Ari is below it. The rack station is on the right, with two mounted reading copies beside the portable tile caddy. The wide center space lets the child reach either side or wake Loop without squeezing between furniture.

```text
MEDIA
 y 2          [             plain wall             ]
 y28          [stable table/E5]        [E6 | E7 | tile caddy]
 y45                          Loop
 y52              Ari          wake / rack approaches
 y66                      arrival + companion
 y74                           ↓ Workshop
```

Hard obstacles: `MD.RECORDING.TABLE C=R(22,28,61,41)` and `MD.RACK.STATION C=R(78,28,110,41)`. Ari uses yielding `C(39,52,3)`. Loop standby feet `(68,45)` do not intersect the central arrival line or rack approach. The wake approach `(68,54)` leaves 9 units between avatar and robot before it joins the path.

| ID / parent | V or actionable part | Approach A | Function / contract |
|---|---|---|---|
| `ACT.ARI` | Feet `(39,52)`, V `R(35,39,43,53)` | `(39,60)`, `(32,52)`, `(46,52)` | G3 + §8.9; helpful in every entry order. |
| `MD.PLAIN.WALL` | V `R(22,2,104,18)` | No independent action | G5; visibly plain indoor filming backdrop. |
| `MD.RECORDING.TABLE` | V `R(22,19,61,41)` | Source A below | G5; stable surface, remaining ordinary paper petals laid still. |
| `MD.SOURCE.E5` / table | Capture slate `R(44,29,57,38)` | `(51,48)` | G2 + §8.9; canonical E5.a. |
| `ACT.LOOP` | Initially feet `(68,45)`, V `R(65,38,71,46)` | `(68,54)` initially; later actual reachable companion position | §8.3; one moving entity, E5.c observation, Wake and follow. |
| `LOOP.FOLLOW.PAD` / Loop | Top pad within Loop V | Same as Loop | §8.3; never a separate robot. |
| `MD.RACK.STATION` | V `R(78,18,110,41)` | Child approaches below | Fixed furniture with reading clips and portable caddy recess. |
| `MD.SOURCE.E6` / station | Mounted writer-copy clip `R(79,22,86,37)` | `(84,48)` | G2 + §8.4; canonical E6, remains after collection. |
| `MD.SOURCE.E7` / station | Mounted maker-copy clip `R(87,22,94,37)` | `(90,48)` | G2 + §8.4; canonical E7, remains after collection. |
| `MD.ACCESS.E8` / station | Caddy recess `R(95,27,109,40)` | `(101,48)` | §8.4; open/inspect/collect the complete kit. |
| `KIT.CADDY` | Actual size 12 × 7: initially `R(96,32,108,39)`; carried after collection; Stage `R(50,68,62,75)` | Current host A | §8.4; exactly one portable rack with four tiles and two note leaflets. |
| `KIT.NOTE.E6`, `KIT.NOTE.E7` / caddy | Two labeled leaflet tabs on the caddy lid, inside its V; same carried/delivered host | Caddy host A; portable inspection while carried | §8.4; additional physical copies of canonical E6/E7, with no automatic exposure. |
| `MD.EXIT.WK` | South region from §2.3 | Door table | G4. |

On first arrival, the scene description may now truthfully say Loop is here. Record that location exposure at arrival, including accessible description exposure. Later search explanations cannot be counted as predictions made before the destination was known. E5.a is only presented when its slate is inspected; Ari’s account is recorded when delivered; E5.c tracks the direct robot observation and later response separately. Arrival does not mark all three components as read.

After collection, the recess visibly becomes empty while its two mounted notes remain. After Loop leaves, the floor beside the recording table is empty; the historical slate remains legible and does not rewrite itself. Ari remains at the same position. “Where is Loop now?” uses actual world progress for the scene description, not an outdated E5 thumbnail. Focus order: current room/Loop observation → Ari → Loop → slate → rack → writer note → maker note → exit. Directly selecting any of those actions is allowed before listening to Ari.

## 8. Required-object interaction catalog

**How to read the catalog:** position, V/C, parent and approach come from §§4–7. Every interactive entry supports all G1 inputs and native named controls; every readable source supports G2; each NPC supports G3. The specific rows below define the actual action and all deviations. All committed physical flags, canonical discoveries and NPC knowledge persist on room return and compatible reload. Uncommitted movement/selection does not. Scenery follows G5: no prerequisite, no inventory, no cancel/repeat mutation, and a scene-description equivalent. “Required” means required in the game design, not mandatory for every successful player route.

### 8.1 Opening, Stage sources, and Jo

**`ACT.PLAYER` — required actor.** Initial/arrival coordinates are in §§2/4. Its state is current room, safe feet position, facing, idle/walking/reaching and temporary tile-carry presentation. “YOU” is shown at first control and remains available in the room description. G1 intents animate walking around furniture before operating; cancel leaves the avatar at the current legal point. Reload restores the last safe position and idle state, with no pending walk or held input. Choosing a native object action still visibly moves this actor. A carried tile is an in-progress representation of the selected tile, never an extra inventory copy.

**`ST.MODEL` / `ST.MODEL.TAB` / `MODEL.*` — required opening prop group.** Initial tab rests inward, Pip/seed are on the starting side, Grandma is across the river, and the physical bridge is poised to fold. Cue: **“Pull the story tab.”** At A, a click/tap/Interact or native **Pull tab** animates the avatar pulling the large tab: Pip moves toward the river and the broken bridge folds down. It stops there. Caption: **“Pip reaches the river. The footbridge folds down.”** On the first operation Jo supplies the v3 opening connection: **“You made Pip’s backpack. Today, you’re running our premiere. Let’s get your little traveler onto the big stage.”** This caption/dialogue stays recoverable; it is not timed away.

The stable commit is the folded-bridge pose and `modelTried=true`. Cancel before commit restores the resting pose; cancel afterward retains it. Repeating resets and replays this small prop only. No canonical new source is invented, no cue is collected, and neither rehearsal success nor projected puppet state changes. Reduced motion sets the same final model pose and description. Jo’s full assignment/E1 remains available if this interaction is skipped. Purpose: make the shared creation and obstacle concrete before the missing projector matters.

**`ST.SOURCE.E1` — required source, optional visit.** Initial clipboard flap down beside the model. Cue: **“Lift the crew brief.”** At `(12,48)` the avatar lifts the flap and the full E1 text opens, including the existing backpack and rehearsal assignment. The final lifted state is saved. Repeat: **“Read crew brief”** opens the same E1. Cancel follows G2. Canonical source E1, passages a/b/c; not a location hint or gate.

**`ST.SOURCE.E6` — required source, optional first copy.** Initial model drawer shut. Cue: **“Open Jo’s story-note drawer.”** At `(28,48)` pull the drawer forward within the table’s reserved V and present exact E6. Save drawer open and actually exposed passages. Repeat reads the note; the open drawer never extends its C across the approach. The drawer is usable before the tab, Preview, Loop recovery, or any theory. Its other physical access is `MD.SOURCE.E6`; both remain one author/source. Purpose: put Pip’s personal promise next to the little character the child already handled.

**`ST.SOURCE.E4` — required source, optional visit.** Initial request folded on the crew board. Cue: **“Unfold filming request.”** At `(50,45)` the avatar lifts the fold; exact E4 and its 9:05 timestamp become readable. The unfolded state persists. Repetition reads the same request; it never changes its conditional wording to completed history. Cancel follows G2. E4 can be combined with discovered NAV.MEDIA but cannot place Loop there. Purpose: give a reason to choose a search destination.

**`ST.BOARD` — required furniture, not a separate interaction.** It groups the request and message access under visibly different actionable parts. Clicking a non-actionable border names the two available actions; it does not choose one automatically or create a ninth record. No extra progress state.

**`ACT.JO` — required character, optional conversation.** At rest Jo faces the opening model. Default **Talk to Jo** approaches the shortest listed A and turns Jo toward the child. State branches, in priority order:

| Situation / selected action | Observable response and retained meaning |
|---|---|
| First interaction with no established goal | Supplies the premiere role and E1 access, without requiring the tab or Preview first. Origin is Jo’s account; merely pointing to the brief does not mark E1 read. |
| Loop not returned; ask about empty dock | Exact v3 line: “Ari borrowed Loop to finish the flower shot. They were finding somewhere the paper would stay still. I haven’t seen them return.” She does not name an unobserved destination. |
| Ask about cancellation with no presented E3 | “I’m still preparing our premiere. I didn’t see that notice. Let’s check what it actually says.” |
| Show E3 with both E3.a scope and E3.b status conveyed/previously supplied | Acknowledges the named event and continued premiere plan. Save Jo’s received passages; no inferred player revision merely from pressing Show. Functional response: “That notice cancels the outdoor rehearsal. It says our premiere is still planned.” With only one supplied passage, acknowledge only its facts; do not quote the other hidden part. |
| First completed docking | “Our little story can fill the stage now. Let’s see what your plan makes happen.” Runs once, without interrupting an active source view; otherwise remains available on next talk. |
| **Tell crew my plan** | Optional source selection and sentence, linked to investigation timing. No trip or object unlock. |
| **Explain this plan to Jo** | Optional rail revision, chosen source details, and sentence. No required submission before Rehearse. Do not certify comprehension from a bare tile list. |
| **Help me think** / **Show me a way** | Use v3 §11 eligible coaching/authored support. Direct request can supply the explicit plan and records answer exposure even if notes are unopened. Does not auto-place tiles. |
| Seed-only attempt, explicit story help | v3 line: “Pip promised to come and plant with Grandma. The seed got there. Pip still needs a way across.” Record the disclosed relationship as support. |
| Successful premiere | Existing backpack/crew payoff line; historical completion is not a reading score. |

E6 shown to Jo is her own note; she can clarify the promise. E7 shown to her permits discussing the makers’ constraints together. E2 supports the limited recorded doorway account, never a thief/destination. E4 is borrowing intent. E5 conveys its selected recorded/account/observed facts. E1/E8 prompt a concise task/material acknowledgment. Unsupported combinations use G3’s neutral fallback. Repeat uses current knowledge and player-selected topic; no forced replay of the entire opening. Cancel closes the conversation and retains any already presented facts or saved sentence. Item 07 binds final concise wording for non-decisive acknowledgment variants; it may not invent new facts.

### 8.2 E2, notice, Remy, and the Courtyard objects

**`ST.ACCESS.E2` and `CY.ACCESS.E2` — required physical access points, one canonical E2.** Initial cue is **“Open Remy’s crew post.”** The Stage indicator is a shared-message screen; the Courtyard device is Remy’s tablet. Both open the same three distinct components: recording, partial photograph, and posted interpretation. Default view gives a still first frame and the post with its 9:13 time; Play recording, Previous frame, Next frame, and Enlarge photo remain separately named actions. Frame order is fixed: Loop/cart in courtyard → crossing `CY.EXIT.WK` → empty doorway. Play never pans beyond that threshold. Frame-step and caption controls give identical content without motion or scrubbing skill.

Enlarging the photo exposes only CANCELED with the frozen caption **“Part of the courtyard notice.”** It cannot flatten that photographed page. The text preserves **“I think”**. Record the exact component shown: E2.a clip/description, E2.b partial photo, E2.c message. Within the clip, track which of the three frames and the end-of-recording marker were displayed, or whether the complete canonical E2.a description was presented. A default first still frame does not expose the later doorway/stopping-point facts; ordinary coaching may cite those only after the relevant frames/end marker or full description were actually shown. The old post remains a historical 9:13 claim after a correction. Repeat opens the last viewed component at a stable frame, without changing what Remy originally posted. Cancel closes playback/view and retains actual exposures; no new world movement occurs. Opening either actual shared-post access makes its complete recording/photo/message package available for later tray inspection, while exposure remains granular. Hearing only Remy's quoted interpretation grants that account, not an unopened recording file. This D06-01 clarification avoids forcing a return trip to play a legitimately acquired post. Purpose: distinguish recorded observation from interpretation and missing context.

**`CY.SOURCE.E3` — required discoverable manipulation, optional branch.** Initially `noticeFlat=false`; only the center word is exposed. Cue **“Flatten the curled notice.”** At `(92,48)`, one action visibly releases the low clip, pulls the paper against the board, and resecures it. No drag distance, precision endpoint, or hold timer is required. The sheet and hand animation stay inside the reserved manipulation zone. Commit only when the sheet is **flat and secured**. Then set `noticeFlat=true` and present the exact full E3, with its 9:10 posting time:

> OUTDOOR REHEARSAL CANCELED.  
> Wind keeps folding the paper petals.  
> The opening premiere is still planned.  
> We will finish the flower shot indoors.

Caption while finishing: **“The notice is flat and clipped to the board.”** No automatic “you were wrong” response. Before commit, cancel/reload returns to the curled stable state and reveals no full canonical reading; after commit the page stays flat and readable. Repeated interaction reads E3 with no unfolding task. The child can leave, show it to Remy, inspect E7, or go straight through Workshop. No theory needs updating to travel. Reduced-motion and native **Flatten and secure notice** produce the same physical end state and text. Purpose: recover missing context by manipulating the actual source.

**`ACT.REMY` — required character.** Default talk acknowledges the crew and offers the post/model note as available topics. Remy’s initial pose faces the bench; they do not automatically learn text behind them merely because the player unfolded it. G3 governs presentation, cancel and repeat. Required branches:

| Action/state | Response / consequence |
|---|---|
| Ask what recording shows | “I saw the crew door. My recording stops there.” |
| Ask about cancellation before supplied E3 | Supplies the existing uncertain E2.c claim, explicitly identified as Remy’s interpretation; not a new fact. |
| Show full E3 or its relevant scope/status passages | “Outdoor rehearsal. I only saw the word in the middle. I jumped from that to our whole premiere.” Turn/acknowledgment, then return to work; save `remyNoticeCorrected=true` and actual supplied references. |
| E3 only partially supplied | Acknowledge only that supplied detail. Do not run the full status-correction branch unless those status/scope facts were actually conveyed. |
| Ask for maker note | E7 available immediately at `CY.SOURCE.E7`. Remy can present the exact note during conversation; use the same canonical E7 and record that presentation, without pretending the child physically opened the bench copy. |
| Explicit crossing help | “One boat takes the seed. Joining the boats makes room for Pip to cross too.” Record source-specific/relationship support actually supplied. |
| Show E4/E5 after reading them | Remy acknowledges borrowing intent/completed account without claiming to have witnessed the destination. E4 alone never confirms completion. |

Jo and Ari may similarly present their own existing source text when explicitly asked. This is a valid conversational access to authored content, not a new independent source. It does not require walking to the physical copy again. E6 shown to Remy supplies the goal that their boat facts alone did not establish. Other inputs follow G3; repeated corrections do not add learning credit. Reading E2 later never resets `remyNoticeCorrected`.

**`CY.SOURCE.E7` — required source, optional first copy.** At `(24,48)`, **“Read Remy’s model note”** brings the note beside the tiny boat into a readable G2 view. No lid or puzzle added. Exact E7.a/b/c exposes single-boat capacity, joined crossing, and soil prerequisite, without assigning a sequence or Pip’s promise. Repeat/cancel/reload follow G2. Its duplicate is `MD.SOURCE.E7`.

**`CY.MODEL.BENCH`, `CY.MODEL.BOAT`, `CY.PETALS`, `CY.TABLET.STAND`, `CY.NOTICE.BOARD` — required setting/furniture groups.** Non-source portions follow G5. Petals bend and settle continuously within V; no child must catch them or wait for a gust. Reduced motion shows a bent-petal pose and **“The outdoor paper petals fold in the breeze.”** No hidden evidence flag depends on watching a motion loop. The boat model stays still; it does not automatically demonstrate crossing or planting. Return states are unchanged except the mounted notice and source access states above.

### 8.3 One Loop, its follow pad, and the Stage dock

**`ACT.LOOP` / `LOOP.FOLLOW.PAD` — required actor and recovery action.** Initial state: `room=SC.MD`, `mode=standby`, feet `(68,45)`. Default cue **“Wake Loop and follow me.”** A single G1 action at `(68,54)` lights the pad, Loop turns toward the avatar, and the caption says **“Loop is ready to follow you.”** Commit `mode=following` at the responsive turned pose; E5.c records the actual response. The avatar can then choose any route. No slate, notes, post, or conversation flag is required.

Canceling the walk performs no wake. Canceling the wake before its response commit retains standby; after commit retains following and settles the pose. Repeating while following gives a small acknowledgment with **“Loop is following you”** and no second follower. Away from Media the same physical entity uses its current reachable pad/approach, never the old stand’s coordinates. Its name is available in the local object list only when actually present. Following does not inspect E5.a or collect tiles automatically.

**`ST.DOCK`, `.FLAP`, `.PAD` — required dock group.** Initial dock is empty and flap closed; it remains operable. At `(86,48)`, **“Open Loop’s dock”** lifts the flap within its V and shows the empty tray/contact. Caption **“Loop’s place is empty.”** Save `dockFlapOpen=true`; no repair instruction appears. If the flap is already open but Loop is absent, **“Inspect empty dock”** repeats that observation. The opening Preview at the console is a separate action, described below, aimed at this same visible absence.

When Loop follows the player on Stage, the dock’s default becomes **“Dock Loop.”** The avatar reaches `(86,48)` and opens the flap if necessary. Loop goes to staging `(76,48)`, then backs into `(76,35)`. Reserve that staging point while the action runs; avatar and Loop are 10 units apart. The dock’s Loop-only channel is x=73–79, y=33–48; its solid side rails are `R(68,28,71,41)` and `R(81,28,84,41)`, with a rear bar `R(71,28,81,31)`. The avatar treats the entire dock as solid. This is a docking slot, not a public passage.

Commit only at seated contact: `mode=docked`, `room=SC.ST`, `loopReturned=true`. The dock light and Loop’s settled pose show connection. If canceled before contact, settle Loop back to legal staging/following near the avatar and preserve any opened flap. After contact, cancel retains docked. Repeated Dock gives **“Loop is ready at the dock.”** Docked Loop does not follow the child out and cannot be accidentally collected again from Media. No undock mechanic is added.

Docking displays the **initial** projected puppet setup, without running any cue or revealing a correct arrangement. If a paused puppet state already exists on a later visit, restore that state instead. A compatible reload cannot have one Loop on Stage and another in Media. During projection the robot changes mode/pose to `projecting` while retaining its dock position. Stop/leave sets it back to `docked`, with projection frozen at the stable state. All captions have native equivalents and no sound dependency.

### 8.4 Rack station, reading copies, caddy, and tiles

**`MD.RACK.STATION` and `MD.ACCESS.E8` — required furniture/access.** The fixed rack station contains two **mounted reading copies** and a **removable tile caddy with copies of both notes tucked into its lid**. This is the explicit spatial resolution of v3’s rack/copies wording. Ari's invitation to take both notes is fulfilled even if the child collects without reading. Mounted reference copies remain available; portable copies are `KIT.NOTE.E6` and `KIT.NOTE.E7`, with the same canonical source IDs. These are additional access copies, not new clues or independent authors. Collecting the caddy does not secretly read either note.

Initially the caddy is closed in its recess. Cue **“Open story-tile rack.”** At `(101,48)` the avatar opens its lid and the four tile surfaces become visible. Save `rackOpened=true` when the lid is open. Cancel before that settles closed; after that remains open. The open view offers **Inspect tile** and **Collect story tiles** immediately. Collect may also be selected as one combined action from the closed rack; it opens and collects without requiring four inspections.

Collection lifts the entire caddy, then commits `tilesCollected=true`, `KIT.CADDY.host=player`. All four unique tiles and both unread note leaflets become available; the fixed recess becomes visibly empty. No independent pickup trip per tile or note. The full tray collection and all four controls remain a single canonical E8 compound record. Record local descriptions only if actually shown; collecting cannot mark E6/E7 or all tile inspections read. Repeat gives **“You have the story tiles”** and opens current kit access rather than recreating inventory. Cancel before collection commit leaves the caddy in its opened recess; afterward it stays collected. Every compatible reload restores one caddy and one of each tile.

**`MD.SOURCE.E6` and `MD.SOURCE.E7` — required alternate copies.** Cue **“Read Jo’s story note”** / **“Read Remy’s model note.”** G2 presents exactly the same canonical passages as their Stage/Courtyard copies. They are in fixed clips outside the removable recess; they stay readable after collection, after Loop departure, and on reload. Reading one physical copy marks no second independent source. A reader who left without opening them can return or use the other existing physical copies. No note vanishes into an inaccessible inventory pocket.

**`KIT.CADDY` and `ST.RACK.BAY` — required single kit and destination.** On Stage, a carried caddy remains with the avatar until the workstation is used. Selecting the bay offers **“Set the story kit on the desk.”** Selecting the rail or a playback control while carrying the kit includes this same handoff first: legally approach `(55,58)`, set it into the reserved bay, then move to the selected rail/control A. No remote placement occurs at the room entrance and no extra confirmation or separate pickup puzzle is needed. At seated contact commit `KIT.CADDY.host=ST.RACK.BAY` and caption **“The story tiles are on the rehearsal desk.”** Cancel before contact retains the carried kit; afterward it remains seated exactly once. It can arrive before Loop; tile planning then works, projection does not. Before collection the bay says **“Story-tile rack — empty”**, with **“Collect the story tiles for this rail.”** No hidden source prerequisite.

After delivery the caddy stays at Stage. It contains every tile not currently on the rail and both note leaflets. Its open lid stays within the console V. Reopening E8 from the evidence tray offers inspection only; manipulating the physical rail requires the Stage workstation. `ACC.KIT` while carrying permits tile and leaflet inspection from the owned caddy, stops pending movement, and changes no rail state.

**`KIT.NOTE.E6` and `KIT.NOTE.E7` — required portable source accesses.** Cue **“Read Jo’s note in the kit”** / **“Read Remy’s note in the kit.”** Before collection they can be inspected through the open caddy at `MD.ACCESS.E8` A; while carried they can be physically opened in hand through `ACC.KIT`; after handoff the avatar approaches rack A `(55,58)`. Opening a leaflet presents the exact existing E6/E7 and records its actual passages. Close returns it to the lid pocket; it is never consumed. Cancel before opening reveals no text; afterward G2 preserves exposure. This is a legitimate first reading from a possessed physical copy, not an internal-ID shortcut to unseen room content. Once read, the canonical evidence tray allows remote reinspection. The leaflets let a Media-first player collect unread notes and plan entirely at Stage while the mounted Media references remain available.

**Four required tile entities:**

| Stable physical ID | Canonical E8 local description — frozen wording | Initial caddy location / cue |
|---|---|---|
| `TILE.FERRY` — One Boat | “Send one boat across.” | Upper-right cell; Inspect One Boat. |
| `TILE.BRIDGE` — Joined Boats | “Join the little boats.” | Lower-right cell; Inspect Joined Boats. |
| `TILE.PLANT` — Hill | “Begin the hill planting scene.” | Lower-left cell; Inspect Hill. |
| `TILE.BLOOM` — Flower | “Try the lantern-flower cue.” | Upper-left cell; Inspect Flower. |

These are an **unnumbered 2 × 2 storage arrangement**, not a left-to-right sample rail. Media cell centers within the caddy are `(99,33.75)`, `(105,33.75)`, `(99,37.25)`, `(105,37.25)`; Stage caddy centers are `(53,69.75)`, `(59,69.75)`, `(53,73.25)`, `(59,73.25)`. Individual cells are symbolic art placements; the owned inspection controls have larger native targets. Tile placement on the rail uses its separate slot centers. The labels never expose the internal FERRY/BRIDGE/PLANT/BLOOM IDs to the child.

Inspection shows only the tile object and its local description, optionally a harmless object tilt. It does **not** animate Pip crossing, characters planting, payload capacity, or a plant-to-light chain. Touch, keyboard and screen descriptions receive exactly that same information. All four surfaces have equal emphasis. Repeated inspection changes no puppet state, success, inventory, or score. Purpose: identify controls while keeping the goal/limitations in the creator notes and actual experimentation.

### 8.5 Rail, positions, and tile manipulation

**`ST.RAIL`, `ST.RAIL.A–D`, `TILE.*` — required tactile planning group.** Initial arrangement is empty. The rail reserves four positions but grows its visible used length with the arrangement; no three-answer template, numbered solution, or pulsing correct slot appears. In the authoring IDs, A–D means capacity order only. The child works at `(78,58)` after selecting **“Arrange story tiles.”** If not collected, the empty rack is visible and the action explains missing materials. A docked Loop is not required to draft an arrangement once the caddy is available. Rehearse requires it.

These operations use either drag/drop, tap/click-select then destination, or native tile/position buttons. The original committed arrangement stays intact until a destination is chosen. Each tile has exactly one owner: rack, selected-from-rack/rail (still committed to its origin), or rail position. Drag art is not an inventory copy.

| Exact operation | Committed result / visible feedback |
|---|---|
| Rack tile → insertion gap | Insert at that index; later tiles shift right; rail length increases by one. The tile snaps visibly into place. Only the available gaps are selectable. |
| Rack tile → occupied tile | Replace that position; the displaced tile returns visibly to its own rack cell. Arrangement length stays unchanged. Label this action **Replace**, not Swap two rail positions. |
| Rail tile → occupied rail position | Swap those two tiles once. No tile disappears; both final locations are shown. |
| Rail tile → insertion gap | Move to the chosen gap after removing its old position; compact the remaining rail. |
| Rail tile → rack / **Return tile** | Return it to its named rack cell; close the gap in the rail. |
| **Move left / Move right** | Swap with the adjacent tile. At an end, explain **“This tile is already at the start/end”**; no revision change. |
| Same tile/same final position | Harmless no-op; preserve revision and any current success. |
| Cancel selection, Escape, or drop outside a valid destination | Return the floating representation to its original committed place; no revision change. A subsequent floor/door intent first cancels selection, then walks. |
| Try to place a tile already on the rail from another access | Focus that existing tile; do not create another. Four unique tiles are the physical limit. |

Every actual change commits the entire resulting order at once, increments `arrangementRevision`, clears its current rehearsal-success certificate, and resets the projected story to the initial state. Retain the former run as an observation, never as a still-valid performance. If a cue was active, settle it once using §8.6 before committing the edit. Merely opening the rail tools or beginning a tile selection always settles and pauses active playback for inspection, but does not invalidate the unchanged arrangement. Canceling selection retains that paused run and its Continue action. After an actual edit, Continue from the old run is unavailable; **Rehearse** starts the changed plan.

The child sees a physical rearrangement and the setup returning to the starting banks, with **“Your arrangement changed. Rehearse this version.”** No correctness label is supplied by tile placement. Leave/reload retains the last committed order and returns an uncommitted held tile to its origin. The accessible equivalent names selected tile, current position and destination, then confirms the actual change. Source views cannot accidentally accept a pending drop. Purpose: make a reversible plan that the puppets can test.

### 8.6 Stage controls, cue playback, interruption, and launch

All controls belong to `ST.CONSOLE`. There is **one physical Show pad** (`ST.CONTROL.SHOW`), beside one Rehearse pad. Stop and reset/clear are subordinate owned actions. The following are functional state names and captions; complete menus and layout are item 06.

| Control / state | Action and observable result | Repeat, cancel, unavailable, persistence |
|---|---|---|---|
| **Show pad: Preview**, before first docking | Approach `(100,58)`, press the pad; backdrop stays blank, visible empty dock gives a small attention cue. **“Loop isn’t in the dock yet.”** Jo’s borrowing account is available; Preview supplies no repair puzzle. | Works before reading anything. Save `previewTried=true` at response. Cancel before response makes no trial; after response retain it. Repeat same physical result. |
| **Rehearse**, without delivered kit or docked Loop | Show the missing rack/dock condition: **“Collect the story tiles for this rail”** and/or **“Bring Loop to the dock to project the story.”** | No quiz or source gate; no phantom projection, run or success certificate. If the kit exists, arrangement tools still work. |
| **Rehearse**, ready | Snapshot current order/revision; reset puppets and next-cue index; begin a rehearsal run. An empty order shows the initial state and **“There are no story tiles on the rail yet”**, ends without success, and leaves tools usable. | New runs clear current rehearsal certification; history remains. Ignore duplicate Start while starting/running. No old cue queue survives. |
| **Stop**, running | Settle the currently active cue once, then pause before the next. Show **“Rehearsal paused”** or **“Premiere paused.”** Preserve scene, arrangement, cue index and stable result. | Immediate owned playback action, no walk. Repeat at pause is a no-op. It does not finish unplayed cues. |
| **Continue rehearsal / Continue premiere**, paused unchanged run | Execute the next unfinished cue in saved mode/revision. If the last cue was already committed, complete the run once rather than execute it again. | Only available for unchanged saved revision; after rail edit or reset, offer Rehearse instead. No duplicate commit on repeated activation. |
| **Reset rehearsal**, ready/paused/running | Settle any active cue, then restore the initial puppet world; clear active run/index/current certification, retain order and physical investigation. Caption **“Story reset. Your tiles stay on the rail.”** | Repeat safely. This control does not erase Loop recovery, notes, assistance, or historical premiere completion. |
| **Clear rail** | Same reset scope, plus return tiles to caddy and set empty order; increment revision only if order changed. Caption **“Tiles returned to the rack.”** | Distinct label and outcome from Reset rehearsal. Cancel before accepting the action leaves prior state; no New game operation is hidden here. |
| **Show pad: Launch**, after docking but no successful current rehearsal | The same pad offers **“Try this arrangement in rehearsal first.”** Rehearse remains available. Missing kit is described explicitly if necessary. | No launch record and no completion. A successful old revision cannot authorize an edited rail. |
| **Show pad: Launch**, current rehearsal succeeded | Start show mode from initial puppet state using that exact current order/revision. Wider stage presentation runs the same actions and harmless extras. | No mandatory explanation or source count. Repeated press while active does nothing. Pause/leave/reload use show mode, never masquerade as a finished show. |
| **Show pad: Replay premiere**, after completion | Replay the current certified arrangement fresh. If it has been edited since certification, request rehearsal of the changed arrangement first. | Historical completion stays true. Replays never duplicate the completion milestone or award additional reading credit. |

**Cue atomicity.** A cue calculates one next stable result from the existing puppet state. Its normal animation depicts that transition; commit the result once when the motion reaches its endpoint. Stop, opening a source, editing, leaving, or a reduced-motion skip settles an active cue immediately to that **same** endpoint, commits once, and pauses before the next cue. A cue that has not started does not execute because the child leaves. Record any settled result as outcome exposure and describe it; skipped animation cannot be treated as unseen independent prediction later.

After an unmet Hill/PLANT or Flower/BLOOM prerequisite, hold the observable pose until the child chooses **Continue**, **Stop**, **Restart rehearsal**, or a new plan. Harmless no-op cues, such as One Boat when the seed is already right or planted, continue normally; they do not trigger this unmet-condition pause. No time pressure or automatic solution hint. Successful ordinary cues continue in order until interrupted. **Current rehearsal success is certified only after the entire current arrangement finishes** in the required final state. Thus a trailing harmless One Boat remains part of the performed arrangement; it cannot undo success, but leaving before it runs does not fabricate full-run completion. Stopping on the final committed cue may leave a paused-at-end run; Continue finalizes it once without replaying that cue.

| Tile | Visible result from current state | Unmet / no-op result and factual description |
|---|---|---|
| One Boat (`FERRY`) | Loose seed left sails right into Grandma’s hand; Pip stays left. | If seed right or planted, empty boat bobs: **“No loose seed on this bank.”** No reversal/uprooting. |
| Joined Boats (`BRIDGE`) | Boats join and Pip crosses to Grandma; carries seed if left, reunites with it if already right. | If Pip already right, keep bridge/positions. No return crossing. |
| Hill (`PLANT`) | With Pip and seed right, both characters visibly put it in soil; roots appear. | Pip left: Grandma looks toward Pip; if seed also left, describe both. Example after Ferry: **“Grandma has the seed. Pip is still across the river.”** Nothing plants by itself. Already planted: gentle tending. |
| Flower (`BLOOM`) | Planted seed becomes the lantern-flower, lighting both banks. | Unplanted: dark seed at its actual location. **“The seed is still unplanted.”** Already lit: stays lit. |

The native **Describe story now** action reports Pip location, seed location/planted state, Grandma, bridge, and flower without demanding spatial vision. It reports what happened, not “put Joined Boats next.” Source-specific assistance remains a separate explicit action. No failures consume tiles, clear evidence, or reduce points.

**Leave or inspect while playing.** A door intent settles and pauses the current cue, closes rail selection, and allows walking. The room transition retains mode, order/revision, next index, stable puppet state and whether finalization remains. Returning shows that same state and offers Continue or Restart. Opening a source similarly pauses before its view opens; close restores control with no automatic continuation. A scene description and saved progress cannot claim a cue still pending has happened.

**Reload during active animation.** The save holds the last committed cue boundary, mode (`rehearsal` or `show`), revision and next index, plus an active-cue marker saved before its animation starts. If the interrupted animation never committed and no later stable save occurred, restore the prior boundary paused; Continue executes that unfinished cue once. Mark its outcome as **possibly previously exposed** for reasoning observations: rolling back puppet state does not prove the child never saw it. If the cue did commit, restore its settled result and the following index. When saving was unavailable, do not infer independence from missing exposure history. A hard reload cannot guarantee preservation of an uncommitted visual frame. That limited boundary is explicit, not a claim of frame-perfect recovery.

**Premiere completion and celebration.** When the full launched arrangement reaches success, commit historical premiere completion once before decorative celebration. The flower/backpack payoff remains visible. Skip/leave then settles the completed stage; it cannot revoke the show or replay a pending completion event. An interrupted show before its final successful boundary remains unfinished. Later experiments/reset/clear may remove current launch eligibility while retaining the historical fact that this run already premiered a show. New game is a separate explicit whole-case reset in item 06.

Jo and Loop provide the in-world Stage reaction at their existing anchors. Remy and Ari's existing v3 payoff lines appear in a brief skippable **“After the premiere”** reaction montage, using their own room settings, and remain available on later post-premiere talk. This is an authored editorial aftermath, not a live remote chat or a claim that both characters now occupy the Stage. No additional walking NPC, temporary collision, or duplicate world entity is created. The montage cannot obscure a pending cue because it begins only after show completion. Item 06 owns its presentation and skip/return controls; Item 08 owns its appearance.

### 8.7 Venue information, doors, and ordinary scenery

**`WK.WAYFINDING` / `WK.ACCESS.NAV` — required information access, optional inspection.** At `(48,47)`, **“Read venue information”** presents the four exact public descriptions:

- `NAV.ST`: “Stage — public performance”
- `NAV.CY`: “Courtyard — open-air rehearsal and props”
- `NAV.WK`: “Workshop — shared model bench and passage”
- `NAV.MEDIA`: “Media — indoor filming space with a plain wall.”

The persistent map’s equivalent access is `ACC.VENUE`. Room names can be known from the start, while detailed NAV content becomes referenceable when presented by this sign or equivalent view. Neither entry shows current hidden occupants. Reading NAV.MEDIA can be used alongside E4 as a purpose-and-suitability inference. Opening a venue view stops any pending movement; closing restores its access control. Repeat retains the same venue provenance, without creating principal evidence #9. No physical unfolding flag or puzzle state is needed for a fixed sign.

**All eight physical doors from §2.3 — required transitions.** Cue **“Go to [room name].”** Any G1 input legally approaches and crosses the matching threshold. All are initially and permanently usable; NPCs, Loop, Toast, selected theories, and unread sources cannot lock them. Before crossing commit cancel retains the old room; after commit use the new room’s arrival. Persistent room changes stay where they occurred. Native destination controls traverse the same legal route and transition; they do not label a room as correct. A global destination choice chains known adjacent door transitions, remains cancelable at each segment, and supplies no unseen source content. Do not make this route automatic merely because the player wrote a theory.

**`WK.BENCH`, `WK.SCENERY`, `MD.PLAIN.WALL`, `MD.RECORDING.TABLE` — required context/scenery.** G5 applies. Workshop descriptions may say the shared tabletop is occupied; Media descriptions may say the petals lie still on the indoor filming surface. Neither scene description says “this proves Ari came here” before the actual discovery. No inspect-every-prop counter. Fixed mounts/table bodies in other rooms follow the same noninteractive contract except where an explicit named child action is listed.

### 8.8 Maximum Toast

**`WK.TOAST`, `.START`, `.MAGNIFIER`, `.SKIP` — required included feature, optional player interaction.** Initially covered and gently trembling inside its bay. Cue **“Start Maximum Toast demo.”** At `(96,54)`, one action starts the authored reveal: 0–3 seconds arms/lights/lid; 3–5 oversized tray with tiny toast; 5–7 descending magnifier and proud pose. Caption **“One toast. Maximum effort.”** No one has to press again at a timed moment.

Once the demo starts, its next durable settled state is `toastRevealed=true`. Normal end, Skip, leaving, opening an unrelated supporting view, or canceling the running gag all settle to that revealed pose. Save at start that recovery should use the revealed state, so reload during the animation cannot create a half-open obstacle. A canceled approach before Start leaves it covered. The central path remains usable throughout.

In the revealed state, **“Look through the magnifier”** enlarges only the toast’s appearance in its owned view. Close returns to the revealed kiosk; no tile, evidence, source reference, or inventory item is added. **Replay demo** is a recommended two-second flourish: lid/arms gesture then the same revealed pose. Repeat during an active flourish is ignored. Reduced motion immediately shows the tray, magnifier, and caption. Skip is an immediate owned action, never another object requiring a walk. Save/revisit retains revealed state. This interaction cannot invalidate an AI case response except for ordinary scene/context changes, nor change any investigation or rehearsal fact.

### 8.9 Ari, capture slate, and Media afterward

**`ACT.ARI` — required character.** First arrival makes a brief, dismissible invitation available: **“There’s Loop! The petals wouldn’t stay still outside, so I recorded them here. The flower is ready. Take the story tiles and both notes.”** This is an authored local account, not a model response or locked conversation. Record its actual display as account exposure. If the child immediately selects a physical object/exit, it does not block that action; the line remains recoverable by talking to Ari. No unknown facts are withheld until an explanation is entered.

At the listed A, Ari’s required topics are the filming move (exact E5.b), the reason for waiting (v3 core line), slate access, free collection, note access and requested assembly support. E6/E7 remain available immediately; Ari does not claim authorship or repeat the whole solution unprompted. Showing E2/E3/E4 lets Ari contrast the original plan, wind, and completed recording from firsthand knowledge. Showing E6/E7 supports requested help while preserving the creators’ provenance. Unrelated combinations use G3. Repeated talk uses actual progress:

- Loop still standby: invitation to take ready materials.
- Loop following in Media: **“Loop is ready to go with you.”**
- Loop departed: **“You took Loop with you. The slate records where I finished the flower shot.”** Ari does not claim firsthand sight of a later docking elsewhere.
- Caddy gone: indicate the empty recess and the still-mounted copies; do not say the unread notes were already read.

Cancel retains only delivered facts/help, not an entire undisplayed dialogue tree. Ari’s position does not move into the wake or exit approach. Native Talk/Show/Ask follows the same A and branches.

**`MD.SOURCE.E5` — required historical source.** **“Read capture slate”** at `(51,48)` presents exact E5.a: **“Lantern-flower animation captured in Media, 9:18. Loaded into Loop’s Flower tile. Story tiles and both makers’ notes are ready for the premiere captain.”** G2 applies; no lid added. Its date and completed-capture wording never change when Loop moves. E5’s evidence view distinguishes this historical slate, Ari’s account, and the time of the player’s actual observation. An old observation remains true about that visit; a current room description queries Loop’s actual state. Inspecting the slate does not wake Loop or collect the rack.

### 8.10 Shared access points owned by the world

These entries establish functional ownership and invocation only; their detailed interface states belong to item 06. None is an additional world desk, collectible, room, or required checkpoint.

| Stable access ID | Availability, action, response and retained state |
|---|---|
| `ACC.OBJECTS` | Current room’s named **Move to…** list. Describes only locally discoverable targets and known states. Selecting one invokes its same legal A/action. No hidden Media inhabitants listed from another room. Cancel stops at current legal position. |
| `ACC.VENUE` | Public map/destinations/descriptions; G1 stop-on-open. Reading records relevant NAV text; selecting travel follows actual door topology. Close restores initiating control. |
| `ACC.EVIDENCE.<E1–E8>` | Legitimately acquired documents/accounts available for inspection, with actual exposed passages/components recorded separately. E2's complete shared post becomes portable when opened; E5's independent origins remain separately acquired. Open/compare/enlarge/save a note; no physical state changes. Unacquired sources require legitimate room/NPC/owned-kit access. |
| `ACC.COMPARE`, `ACC.TIMELINE`, `ACC.THEORY` | V3 two-passage comparison, known-time strip, and optional idea. Selected relationships are the child’s interpretation, not automatic correctness. Save acknowledged edits; keep known intentions distinct from completed events. No automatic travel. |
| `ACC.PRESENT` | Choose available discovered content and a local NPC, then approach via G3. Cancel before delivery conveys no facts. |
| `ACC.PLAN.SEARCH` | Optional plan addressed to Jo uses her A; the crew-plan tool opens in place, stops movement, and saves the plan without a remote reply or NPC-knowledge change. Preserves source/time/assistance provenance; never exposes future arrival facts. |
| `ACC.PLAN.STORY` | Optional “Explain this plan to Jo” approaches Jo and is tied to current rail revision and observed outcomes. A private draft may be edited in place but is not delivered until presented. Rehearse remains freely available. |
| `ACC.COACH` | Help me think / Show me a way, using existing v3 boundaries. Does not take movement/progression authority; stale scene/arrangement replies are discarded. Detailed wait/fallback states in item 06. |
| `ACC.STORY.STATE` | Read-only current puppet description, including both banks. Pauses active playback before inspection; no cue, hint, tile, or inference is automatically produced. |
| `ACC.GOAL` | Recoverable assignment and present physical next opportunities. It names missing Loop/materials or rehearsal/launch without requiring an explanation. |
| `ACC.KIT` | Portable caddy and note-leaflet inspection before Stage handoff; afterward points to the Stage rack/evidence inspection. Unread carried copies may be opened, without becoming read merely through collection. Does not permit editing a remote physical rail. |

## 9. Important before/after states and ownership

These are design state requirements, not a chosen save schema. Item 09 must implement equivalent ownership and validation. Item 06 must make interrupted/resumed states understandable.

| Milestone | Stage | Courtyard | Workshop | Media |
|---|---|---|---|---|
| Start | Model ready, dock/rack bay empty, projection blank, Jo present, all sources accessible. | Remy at work; E2 original post; notice curled; E7 accessible; petals moving. | Three open exits, readable venue information, covered optional Toast. | Ari/Loop ready; slate, mounted notes and closed caddy available. |
| Notice flattened, not yet presented | No invented Jo knowledge. | Notice flat and secured; E3 accessible. Remy has not silently read it. | Unchanged. | Unchanged. |
| Notice shown to Remy | Unchanged unless separately shown to Jo. | Remy acknowledges exact supplied scope/status; original E2 remains historical. | Unchanged. | Unchanged. |
| Tiles collected, Loop still standby | Empty bay until actual handoff; if kit is delivered, rail can be drafted without projection. | Unchanged. | Child may carry caddy through without Toast. | Fixed recess empty; mounted notes remain; Loop still beside table. |
| Loop following, caddy uncollected | Dock still empty until used. | Following Loop moves through if visited, with no evidence added. | Follower uses same paths and companion anchors. | Loop leaves; caddy remains. Slate remains historical; no kit delivery is fabricated. |
| Both recovered and delivered | One Loop docked; one kit seated; notes/rail usable; initial projection or saved puppet state visible. | Earlier notice/NPC state retained. | Toast retains its own independent state. | Ari plus slate/reference notes; robot floor space and portable caddy recess vacant. |
| Rehearsal unmet/paused | Physical objects unchanged; rail order retained; puppet consequence held; Loop docked if paused. | Unchanged. | Unchanged. | Unchanged. |
| Current arrangement edited | Order/revision updated; puppets reset; current launch certificate invalidated; historical observations retained. | Unchanged. | Unchanged. | Unchanged. |
| Launch finished | Completed flower/backpack payoff, factual completion; replay possible under current certification rules. | Remy’s existing post-premiere reaction available; no change to original source wording. | Gag independent. | Ari’s existing post-premiere reaction available; no claim robot is still here. |

### State facts that must never be conflated

- **A physical copy exists / player owns it / content was displayed / explanation was given** are four different facts. Carrying a note enables a later first reading, but is not itself reading or comprehension.
- **`noticeFlat` / Remy received the relevant passages / player revised a claim** are separate. The player may do any physically reasonable subset.
- **Loop observed here during a visit / current Loop location / historical recording location** are separate. E5’s recorded history never moves with the robot.
- **Tiles collected / caddy delivered / rail ordered / Loop docked** are separate. Missing one material does not erase another or impose a source gate.
- **An arrangement once succeeded / current revision certified / a launched show completed historically** are separate. Edits cannot borrow an old success, and cannot erase a completed past show.
- **Rehearsal versus show mode** is saved with the paused run. Continue uses the same mode and revision. A showing stopped halfway is not completed by resuming as a rehearsal.

At normal leave/save, persist settled object flags, sources/actual passage exposures, NPC facts, avatar scene/legal position, single Loop mode/location, caddy host, tile owners/order/revision, run mode/index/state, certification and historical completion. Transient focus/hover/held keys/drag ghosts are not physical progress. A compatible reload restores stable positions; bad or incompatible saves use the existing v3 recovery flow, to be fully specified in item 06. No new account or cloud saving system is implied.

## 10. Route walkthroughs using the planned placements

These are walkthroughs of the **written spatial model**. They check that the intended opportunities have locations and legal approaches. They are not browser sessions or evidence that a child understands the game. Side-to-side paths can use the clear y=62 spine; vertical branches leave that spine only for their named A. No route depends on standing inside an obstacle.

### 10.1 Intended opening

1. `ACT.PLAYER` starts Stage `(20,50)`, facing `ST.MODEL.TAB` at A `(20,48)`. Pulling the tab shows the obstacle and Jo’s backpack connection. The destination is two logical units away.
2. Select `ST.CONTROL.SHOW`: take the open floor below Jo toward `(100,58)`. There is no table across this route. The pad says Preview; pressing it leaves the backdrop blank and draws attention to `ST.DOCK`.
3. Inspect `ST.DOCK` at `(86,48)` to lift its flap, or speak to `ACT.JO` at `(37,56)`. Both clarify the missing physical robot; Jo supplies the known borrowing purpose. `ST.SOURCE.E1` is still accessible at `(12,48)` if the child wants the complete assignment.
4. `ST.SOURCE.E4` and `ST.ACCESS.E2` are separately visible on the same low board, with A `(50,45)` and `(59,45)`. The child chooses which to inspect, or takes either exit. Neither is highlighted as the right answer.

**Check:** the first manipulation is local and visible, while the complete goal remains recoverable. Model→console travel is about 81 units along unobstructed floor, approximately 5.4 seconds at the proposed speed. That estimate excludes reading/animation. Exits remain available even if every opening step is skipped.

### 10.2 Correct-first search

1. Read E4 through `ST.SOURCE.E4`, then go to `ST.EXIT.WK` `(108,62)→(114,62)`.
2. Arrive at `WK.EXIT.ST` spawn `(12,62)`, facing right. Read `WK.ACCESS.NAV` at `(48,47)`; its venue description supplies NAV.MEDIA before crossing the Media door.
3. If wanted, use `ACC.PLAN.SEARCH` to connect E4’s still-paper/plain-wall requirement to NAV.MEDIA. This happens before actual Media arrival. Closing that view leaves the avatar stationary; the child then selects a destination.
4. Walk to `WK.EXIT.MD` `(62,38)→(62,30)`, then arrive Media `(62,66)`, facing up. Loop and Ari are now plainly visible. E5 confirms location/account; the game does not pretend the earlier suitability inference proved occupancy.

**Check:** no E2/E3, cancellation claim, theory, or Toast is required. Sign A→north-door approach is roughly 17 units (about 1.1 seconds); this is intentionally a short choice followed by a real trip, not filler walking. On a purely exploratory direct trip, location is confirmed just as fairly but reasoning remains unobserved.

### 10.3 Mistaken cancellation lead and recovery

1. At `ST.ACCESS.E2` `(59,45)`, view the partial post/photo and, if desired, record **“Our whole premiere is canceled.”** This is the child’s optional claim, not a required answer selection.
2. Use `ST.EXIT.CY`; arrive through `CY.EXIT.ST` at `(12,62)`. The model bench, Remy, tablet and curled notice are all visible.
3. Approach `CY.SOURCE.E3` `(92,48)` via the open spine, then north into its pull space. Flatten/resecure the sheet and read the exact E3. Its heading and continued premiere plan contradict that narrow claim.
4. Optionally Show E3 to `ACT.REMY`; nearest approach from the board side is `(71,48)`. Remy gives the existing correction. The notice remains flat whether the child shows it or leaves.
5. Read `CY.SOURCE.E7` `(24,48)` now if wanted. Either take `CY.EXIT.ST` to inspect E4 or continue `CY.EXIT.WK` into Workshop, read its venue information, and inspect Media. No formal revised sentence is required.

**Check:** the full notice is physically acquired; a later visit preserves it. The wrong lead gains usable context, not a penalty or a dead-end lock. Notice A→Workshop threshold is approximately 28 units, about 1.9 seconds; Remy is close enough for an optional acknowledgment. The layout does not force a full-room retracing to continue.

### 10.4 Media first, no prior clues

1. From initial Stage `(20,50)`, choose `ST.EXIT.WK` directly. In Workshop choose `WK.EXIT.MD` without opening the sign, Toast, or any source.
2. Media arrival `(62,66)` reveals actual Loop. Select `ACT.LOOP` A `(68,54)` and wake it immediately, or approach `MD.ACCESS.E8` `(101,48)` and collect first. Ari’s invitation never covers or disables either action.
3. Collect the caddy in one action. E6/E7 leaflets are now possessed but unread; mounted Media references remain. Reading the slate and either set of notes is optional at this time.
4. Return to Stage with both resources and read the portable notes there. Do not force a Courtyard trip for an E7 that Ari already handed over.

**Check:** the early find works with zero prior sources. It does not skip the original need to finish/rehearse/premiere. The evidence record does not award a search inference just for choosing this route. NPC and room labels before entry never advertised the unseen robot.

### 10.5 Return with Loop and the caddy

1. With Loop following and kit carried, select `MD.EXIT.WK` via `(62,68)→(62,74)`. Commit arrival Workshop avatar `(62,42)`, Loop `(70,42)`.
2. Take `WK.EXIT.ST` through the clear center/left path. Toast stays entirely to the right. Stage arrival is `(108,62)`, companion `(111,70)`, both outside the console.
3. Select `ST.DOCK`. Avatar approaches `(86,48)`, Loop stages `(76,48)`, then seats `(76,35)`. The avatar is not occupying the robot’s insertion route. Loop becomes docked once.
4. Select `ST.RAIL`. Because the kit is still carried, first approach rack A `(55,58)` and set it in `ST.RACK.BAY`, then move to rail A `(78,58)`. Or use the rack bay first and dock afterward; both orders are legal.
5. Read portable `KIT.NOTE.E6/E7` at rack A, the Stage E6 drawer, or previously discovered canonical sources from `ACC.EVIDENCE`. Nothing about kit delivery marks the notes read automatically.

**Check:** there is a continuous furniture-free path between both Stage tasks. Dock A→rack A is roughly 35 units, about 2.3 seconds. Following/carrying are one entity each and do not add door obstacles. If the child leaves with only one resource, the other remains exactly where it was and can be retrieved later.

### 10.6 Seed-only attempt, unmet planting, and revision

1. At `ST.RAIL`, place `TILE.FERRY`, `TILE.PLANT`, `TILE.BLOOM` into active positions A/B/C. No color or placement response calls this wrong.
2. Operate `ST.CONTROL.REHEARSE`. One Boat sends the seed to Grandma. Both banks remain visible: `PUP.PIP` left, seed in Grandma’s hand right.
3. Hill does not plant. Hold that consequence: **“Grandma has the seed. Pip is still across the river.”** The child can Continue to Flower, which keeps the actual loose seed dark, or Stop and revise immediately.
4. Open `KIT.NOTE.E6` / `ACC.EVIDENCE.E6` to revisit **“I’ll come to your hill”** and **“we’ll plant … together.”** Open E7 to consider the single boat’s limit and joined crossing. Opening a source settles/pauses any active cue; it does not run the rest behind the reading view.
5. Optionally explain the missing part to Jo. Actual source references, prior results and any support determine what can be observed about understanding. No explanation is required to change the plan.
6. Insert `TILE.BRIDGE` in the gap between Ferry and Hill. The final order becomes Ferry/Bridge/Plant/Bloom across A–D. The revision invalidates the old run, resets the puppet setup, and needs a fresh Rehearse.
7. New rehearsal sends the seed, brings Pip across to meet it, plants together and lights the flower. The game accepts this four-tile result fully.

**Check:** failure is a visible unmet story condition and a reversible plan; no lost items or automatic recipe. A mistaken explanation can receive specific help, while silent experimentation remains a legitimate way to play. No additional room visit is needed to revise because carried notes remain at the workstation.

### 10.7 Direct plan and seed-ahead plan

**Direct:** at rail A `(78,58)`, arrange Bridge/Plant/Bloom. Rehearse from the initial state: Pip carries seed across → both plant → flower lights. At completion certify this revision.

**Seed ahead:** arrange Ferry/Bridge/Plant/Bloom. Rehearse: seed crosses alone → Pip crosses and reunites → both plant → light. Certify exactly the same required final state.

The other harmless Ferry placements from v3 remain equally valid: Bridge/Ferry/Plant/Bloom, Bridge/Plant/Ferry/Bloom, Bridge/Plant/Bloom/Ferry. Do not grade by shortest length, storage order, or a whitelist. The actions act on the actual state and never send the seed/Pip backward. No direct manipulation of `PUP.PIP` or `PUP.SEED` bypasses those actions.

**Check:** every valid plan fits four physical capacity positions. Both banks, seed and root/light states remain readable. A successful action sequence is success; a source-based explanation supplied before revealing outcomes can additionally support an observation about inference. One does not imply the other.

### 10.8 Launch, interruptions, and replay

1. With the current revision certified, select `ST.CONTROL.SHOW` at control A `(100,58)`. It is the same physical pad used for opening Preview, now labeled Launch.
2. It runs the current plan fresh in show mode. If the child stops/leaves after a cue, retain that stable show state. Returning Stage offers Continue premiere/Restart; it does not silently run skipped cues or claim completion.
3. After the complete successful performance, mark historical completion and show the illuminated flower/backpack, Jo/Loop response, and skippable aftermath reactions. A child who ignored Remy’s claim still receives the full premiere; the recap does not invent a cancellation revision.
4. Replay the unchanged certified plan using the same pad. Or edit it and rehearse the new version before another launch. The first completed premiere remains a historical achievement, without a comprehension score.

**Check:** ordinary show validation is the only gate. No last essay, AI permission, eighth clue, or compulsory gag appears at the finish. The ending is the functioning result of the physical resources and the child’s actual arrangement.

### 10.9 Ignore Maximum Toast

Use Stage→Workshop→Media→Workshop→Stage via the exact doors above. In Workshop, walk through the center/left/north routes without approaching `(96,54)`. `toastRevealed` remains false and all case progress still works. If accidentally started then ignored, choose the existing exit: its reveal settles and the same path remains open. An opened arm, tray, magnifier, caption or skip control cannot block `WK.EXIT.ST`, `WK.EXIT.CY` or `WK.EXIT.MD`.

**Check:** the optional joke is situated where it can be discovered naturally, without becoming an educational requirement or reward for a correct answer.

### 10.10 Essential route through accessible alternatives

1. From `ACC.OBJECTS` select **Pull the story tab**; the avatar follows the same A and the state description supplies the model result. Then select **Preview**.
2. Use named request access and `ACC.VENUE` to read E4/NAV.MEDIA, or directly choose known destinations. Native travel follows Stage→Workshop→Media; it never reveals hidden room occupants before entry.
3. In Media’s local list select **Wake Loop and follow me**, **Collect story tiles**, and either note leaflet. Dragging, camera interpretation, sound, timed input and a source count are unnecessary.
4. Use named destinations back to Stage; select **Dock Loop**, then **Arrange story tiles**, which performs the physical kit handoff on first use.
5. Select a tile and insertion position with named controls, move left/right, replace, swap or return as needed. **Describe story now** names both banks and the actual seed/Pip/root state. The same unmet condition and revision route are available.
6. Select **Rehearse**, **Continue/Stop** as needed, then **Launch**. Skip celebration or replay using named actions. No special accessible version grants an extra answer or withholds an observable clue.

**Check:** every required action has the same world consequence and provenance under non-spatial input. This is a specified complete path, not a claim that assistive technology has been tested.

## 11. Accessibility and smaller-screen behavior

### 11.1 Spatial access stays optional; world actions remain the same

Every named required object, door and available world action has a native control, visible focus, and a descriptive accessible name. The room tables define logical reading order; child actions nest under their object rather than producing an unstructured list of every submesh. Fixed scenery is summarized once. Projected state is grouped under **Story now**, separate from **Move to…** destinations. Controls for closed/read-only/unavailable states still explain what they represent.

The focusable world does not consume arrows/WASD when a text field, source view, menu, tile-control group or native list has focus. Escape closes the top temporary view and restores the actual initiating object/access control; it does not close every layer or start movement. If a view’s physical source moved during collection, restore its stable owner’s corresponding control, such as the kit/rack access, not a now-missing tile ghost. Enter/Space activates named native controls; world Interact is active only with world focus. No hover-only instruction or long press is required.

Source text remains until dismissed. Clip Previous/Next frames and full captions replace drag scrubbing. Notice flattening, flap/drawer opening, wake, dock and collection each have one deliberate action with visible stages. Contextual descriptions do not reveal the notice’s hidden scope, the clip’s unseen destination, or an unperformed tile result. Access support can enlarge or describe known material without being counted as a solution hint; actual answer support is recorded separately.

### 11.2 Functional display modes, recommended thresholds

These are **layout obligations and proposed breakpoints for item 06**, not final CSS or tested device support:

| Available presentation space | Required behavior |
|---|---|
| Landscape world viewport at least approximately 900 × 600 CSS pixels | Show whole 120 × 80 scene. Use generous hit regions and native object controls; supporting source view can pause the world. Workstation controls must keep the entire projection visible while a cue runs. |
| Smaller landscape, narrow portrait, browser zoom or enlarged text that prevents this | Keep a complete scaled room overview for orientation; make named Move to/actions the dependable target surface rather than shrinking text or forcing precision in the overview. The avatar still moves on the same legal floor. No forced rotation. |
| Source/clip reading on a small screen | Use the available reading area, permit scrolling and text enlargement, retain source title/author/time and a clear close action. Never crop decisive words into a thumbnail. World movement/playback is paused during reading. |
| Rehearsal work on a small screen | Whole puppet story plus one compact control group; allow switching between **Arrange tiles** and **Watch rehearsal**, retaining order and state. This is a presentation mode of the same workstation, not a new game screen with different rules. |
| Puppet details still too small | Provide an immediately available complete **Story now** description and an enlarged whole-story view that preserves both banks. A local close-up cannot replace the overview during a cue or obscure stranded Pip. |

The logical H regions never need to grow through a wall. Where 48-pixel targets overlap, the named chooser or workstation controls disambiguate. Touch should not require tapping a 4-unit control drawing at a scaled-down room size. Tile-storage symbols can be shown as tilted/stacked cards within the caddy; inspection and rail views show a full face. There is still one physical entity per tile, not differently sized inventory duplicates.

All necessary distinctions use names, placement, motion/state and text, not color alone. Captions describe paper movement, robot response, seed delivery, waiting, joint planting and light. Reduced motion uses settled poses or brief transitions, with equal source/condition information. No task requires timed response, double input, sound, spoken answer or actual student identity. Read-aloud remains a later optional feature under v3; this plan does not silently make it required.

## 12. Completeness crosswalk

The v3 requirement is the left column; every right-hand entry names a physical placement/behavior already specified. Mounted copies, portable copies, and canonical content remain distinct.

| V3 object/source/behavior | Planned location and stable identity | Complete behavior owner |
|---|---|---|
| Four connected areas, initial avatar, camera, clear floor | `SC.ST/CY/WK/MD`; `ACT.PLAYER`; W/V/C tables; eight paired exits | §§2–7, G1/G4, §10 |
| Jo / Remy / Ari | `ACT.JO`, `ACT.REMY`, `ACT.ARI`, all home/approach anchors specified | G3; §§8.1/8.2/8.9 |
| Opening paper model, tab, Pip/backpack/seed/Grandma/river/broken bridge | `ST.MODEL`, `.TAB`, `MODEL.*` within upper-left table | §§4/6.2/8.1; independent from puppets |
| E1 clipboard/flap | `ST.SOURCE.E1` on model; canonical E1 | G2; §8.1 |
| E2 Stage-side indicator and Courtyard shared tablet; clip/photo/message | `ST.ACCESS.E2`, `CY.ACCESS.E2`; canonical E2.a/b/c | §8.2; frame and photo boundaries explicit |
| E3 curled notice, clip, full flat page | `CY.SOURCE.E3`, `CY.NOTICE.BOARD`, reserved pull area | §§5/8.2; flat-and-secured commit |
| E4 folded filming request | `ST.SOURCE.E4` on `ST.BOARD`; canonical E4 | §§4/8.1; conditional history preserved |
| E5 capture slate, Ari account, direct observation/wake | `MD.SOURCE.E5`, `ACT.ARI`, `ACT.LOOP` | §§7/8.3/8.9; historical vs current separated |
| E6 model-drawer note and Media copy; takeable notes | `ST.SOURCE.E6`, `MD.SOURCE.E6`, portable `KIT.NOTE.E6` | G2; §§8.1/8.4; same canonical E6 |
| E7 model bench, boat and Media copy; takeable notes | `CY.SOURCE.E7`, `CY.MODEL.BOAT`, `MD.SOURCE.E7`, portable `KIT.NOTE.E7` | G2/G5; §§8.2/8.4; same canonical E7 |
| E8 complete reusable tile rack | `MD.ACCESS.E8`, `KIT.CADDY`, `ST.RACK.BAY`, four `TILE.*` | §§8.4/8.5; one collection, no recipe preview |
| Empty/open/occupied dock; recover/follow/dock/project Loop | `ST.DOCK`, `.FLAP`, `.PAD`, `ACT.LOOP`, `LOOP.FOLLOW.PAD`; channel and arrival anchors | G4; §8.3 |
| Opening Preview and later Launch/Rehearse/Stop/reset | `ST.CONSOLE`, `ST.CONTROL.SHOW/REHEARSE/STOP/RESET/CLEAR` | §§4/8.6; stable pad and exact gates |
| 0–4 positions; place/swap/remove/move/return tiles | `ST.RAIL`, `ST.RAIL.A–D`, `TILE.FERRY/BRIDGE/PLANT/BLOOM` | §8.5; physical unique ownership and revision |
| Projected Pip/backpack, Grandma, seed, boats, river, hill, bridge, flower | `ST.PROJECTION`, `PUP.*`, protected upper band and layer/extent rules | §§6.2/8.6; state displays, not floor/drag targets |
| Unmet planting, no-op cues, all five successes | Same physical rail and PUP entities | §8.6, §§10.6–10.8; v3 §9 rules preserved |
| Courtyard wind/petals and ordinary model props | `CY.PETALS`, `CY.MODEL.BENCH/BOAT` | G5; §§5/8.2 |
| Workshop shared model bench/scenery | `WK.BENCH`, `WK.SCENERY` | G5; §§6.1/8.7; no extra puzzle |
| Room descriptions / NAV.MEDIA | `WK.WAYFINDING`, `WK.ACCESS.NAV`, `ACC.VENUE` | §8.7; provenance and pre-arrival boundary |
| Media plain wall/stable surface; retained records | `MD.PLAIN.WALL`, `MD.RECORDING.TABLE`, `MD.RACK.STATION` | §§7/8.4/8.9 |
| Maximum Toast cover, arms, lights, tray, tiny toast, magnifier, start/replay/skip | `WK.TOAST` coherent group; `.START/.MAGNIFIER/.SKIP`, contained full-sweep V | §§6.1/8.8; independent state, passable route |
| Evidence tray/compare/timeline/theory/presentation | `ACC.EVIDENCE.*`, `ACC.COMPARE/TIMELINE/THEORY/PRESENT` | G2/G3; §8.10; item 06 consumes full interface work |
| Optional search and story explanations, help | `ACC.PLAN.SEARCH/STORY`, `ACC.COACH`, Jo/NPC contexts | §§8.1/8.10; v3 §§4/11 authority retained |
| Keyboard/touch/native alternatives and text/cue access | `ACC.OBJECTS`, `ACC.STORY.STATE`, object-owned native actions | G1–G5; §11; full route §10.10 |
| Before/after objects, departure/reload, interruption, repeated acts | Scene tables, entity/caddy/rail ownership, run mode/revision, stable flags | §§8–9; no duplicated entities or fabricated completion |
| Backpack/flower payoff, crew lines, replay/skip | Existing Stage model/PUP/Jo/Loop plus editorial aftermath | §8.6/§10.8; no new world NPC placement |

The supporting interface access points are specified only enough to establish where their actions originate and how they affect the world. This crosswalk does not mark the complete interface, all content variants, final art, technical contracts, or assets ready.

## 13. Decisions, review evidence, and the next dependency

### 13.1 Recommended decisions fixed for this functional plan

1. Use the four coordinates/door pairs as authored room spaces, with a clear shared travel spine and separately reachable source approaches.
2. Keep the **same Stage Show pad** for failed Preview and successful Launch; all secondary playback/reset actions belong to its workstation.
3. Keep the projection band free of opaque board/dock/overlay art. Keep the flower’s opaque head above character bodies and its stem behind them.
4. Keep permanent Media reading references, plus takeable E6/E7 leaflets inside the single portable caddy. They remain canonical duplicates and unread until displayed.
5. Seat that caddy through an actual rack approach, automatically included when the carried kit’s owner first uses the rail/control. No teleport from room entry or separate assembly puzzle.
6. Resolve notice and physical actions at explicit stable commits; resolve each cue once at its endpoint. Save show/rehearsal mode so interruption cannot create a false completion.
7. Give Loop one location/mode and deterministic door recovery anchors. Dock it through a reserved channel without occupying the avatar’s stopping point. Docked Loop stays on Stage.
8. Represent other makers’ final reactions as a bounded editorial aftermath, preserving their world home positions and existing lines.
9. Treat smaller-screen/native access as the same actions and information, with a both-bank story view and truthful current-state description.

These decisions elaborate the existing game. They introduce no new source meaning, clue requirement, room, character, repair task or puzzle. The v3 clarification link records the relationship between its general rules and this detailed layer.

### 13.2 Review record and limits

Written reviews checked source/narrative boundaries, physical access and puppet visibility, and interaction-state consistency. The review found and corrected an overlapping Stage board/projection, an overlapping flower/character display, and a handoff that initially failed to carry unread notes. The document now makes those choices explicit instead of leaving the builder to resolve them.

All listed entrances, companion arrivals and object approaches have been checked against the proposed room boundaries and obstacle placements. The central door routes and room branches are connected in this plan; the route traces cover opening, correct-first, mistaken, Media-first, partial collection, return, revision, equivalent success, interruption/replay, no gag, and non-spatial access. Estimates come from logical distances and a proposed speed. They are not measured travel or a navigation-engine test.

A separate coordinate calculation checked **58 anchor positions** (Stage 20, Courtyard 12, Workshop 13, Media 13) against the radius-2 footprint and listed hard rectangles, using a one-unit connected-floor grid. It found **zero invalid or disconnected anchors**. The calculation does not simulate NPC yielding, drawing layers, continuous movement, or input handling; Loop's special docking channel is specified and reviewed separately. It establishes a limited geometric consistency check of this plan, not runtime qualification.

The v3 finite puppet-rule enumeration remains its own earlier design-model evidence. This task specifies physical operation of those rules; it does not claim a new running check of 65 arrangements. Runtime implementation, browser walkthroughs, live AI, device/assistive-technology qualification, child enjoyment, and learning effects remain **not performed**.

### 13.3 Remaining blockers and later obligations

**No unresolved functional layout or object-behavior decision blocks completion of Item 05.** The primary-device default is the authorized desktop/laptop landscape assumption with the defined smaller-screen route. User review or later usability evidence can motivate targeted revisions; no unanswered coordinate question is pushed back to the user.

**Exact next item: 06 — Complete interface and player-flow specification.** It must consume these IDs and contracts and produce:

- First-start/continue/world objective/settings/exit flows without blocking early exploration.
- Complete source/clip/comparison/timeline/theory and Show evidence views, keeping canonical components and actual exposures distinct.
- The workstation’s readable arrangement controls, selection/replace/swap/return states, current-state view, unmet/pause/continue/restart flows, Show pad labels, and early-Launch feedback.
- Clear carried-kit versus seated-rack access, including unread portable note inspection and focus return after collection.
- Coaching entry/wait/hint/direct-help/fallback/stale-response states, grounded in the existing v3 rules, with no progression authority.
- Save failure, incompatible save, reset scopes, interrupted show versus rehearsal, completed-show recap and skippable aftermath states.
- Functional landscape/small-screen layouts, focus/navigation order, text-entry handling and accessible names for the exact actions above.

Item 07 then binds all final child-facing wording to those complete states; the decisive sources and exact clue boundaries stay frozen. Item 08 translates these functional plans into visual designs. Item 09 chooses and specifies implementation technology/state contracts. Item 10 sizes and produces an individual asset plan against these IDs. Item 11 reconciles the packet and re-estimates the remaining schedule. None of those deliverables is completed merely by this document naming its input.

**Item 05 completion evidence:** §§2–7 give four functional plans and all anchors; §§3/8 give complete interaction contracts; §9 reconciles before/after ownership; §10 traces actual routes; §11 preserves access across display modes; §12 maps every required v3 world object/source to a location and behavior. The builder can now locate, approach and operate the required world objects without inventing their functional behavior. This is completion of the design section, not permission to begin a prototype or a claim that the full build packet is ready.
