# Evidence Quest — Item 07: Complete Child-Facing Content and References

**TASK11.02 binding addendum, September 12, 2026:** section 6.1's existing exact tile names now have the CT identifiers required by Item 09 `Tile.labelCt`: `CT.TILE.LABEL.FERRY` = One Boat, `CT.TILE.LABEL.BRIDGE` = Joined Boats, `CT.TILE.LABEL.PLANT` = Hill, `CT.TILE.LABEL.BLOOM` = Flower. They are recorded in the technical-copy addendum and reference registry. All original 548 Item 07 entries plus five original technical entries remain unchanged; the compiled catalog adds these four references to already-defined words. No story, source, meaning, behavior or case/version identity changes. See [setup decisions](../../SETUP-DECISIONS.md).

**Case:** Launch Day: Where’s Loop? / The Little Bridge  
**Prepared:** September 11, 2026  
**Scope:** canonical English content and its display conditions; Items 01–06 retain narrative, spatial, interaction and interface authority. This is a content specification, not an implemented game or evidence of learning effects.

**Authority:** [Master Checklist](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/EVIDENCE-QUEST-MASTER-CHECKLIST.md); [v3 story and systems](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/Evidence-Quest-Complete-Game-Specification-v3.md); [05 physical scenes and interactions](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/05-FUNCTIONAL-SCENES-AND-INTERACTIONS.md); [06 interfaces and flows](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/06-COMPLETE-INTERFACE-AND-PLAYER-FLOWS.md).

## 1. Catalog contracts and authority

The child sees a festival to explore, a crew assignment, sources to inspect, and a paper story that responds to their tile arrangement. The text below names those opportunities and consequences. It never requires a theory, source quota, deliberate mistake, or AI approval before an action allowed by Items 05–06.

### 1.1 How entries are complete

Every `CT.*` entry inherits this contract plus its section's family contract and the exact bindings in §§11–12. IDs are authoring references, never displayed to the child. Existing `E*`, passage, `NAV.*`, object, `ACC.*`, `UI.*`, `T.*`, and coaching-move IDs are unchanged.

An explicitly named family prefix such as CT.CUE or CT.SRC.E8 means the entries with that prefix, selected by their stated conditions. Slash shorthand shares the preceding prefix: CT.NAV.ST/CY/WK/MEDIA names those four exact entries. A family reference never authorizes a builder to invent an unlisted variant. For slash lists of differing subfamilies, the surrounding entry names/section resolve each item; fully spelled IDs remain the canonical identifiers.

| Field | Shared definition; explicit exceptions appear in entries |
|---|---|
| Origin | **F** = frozen wording from v3/05 or an established decisive caption; **C** = consolidated proposed 06 wording; **N** = newly authored supporting copy. F text is literal, not permission to paraphrase. |
| Type and speaker | Sources are attributed documents/accounts; controls are labels; statuses describe an actual event/state; NPC lines are spoken by their named character. Other UI wording is the game's neutral voice. Coaching is identified as Help or Prepared hint, not secretly spoken by a character. |
| Binding | Section family + row condition + §§11–12 determines the object/access/state/action use. A shared control inherits each listed caller's prerequisites and return destination from 06. No label enables an otherwise unavailable action. |
| Display | Show only when the applicable condition is true. Never populate hidden panels, thumbnails, accessible names or announcements with unavailable source facts. Pending content is not displayed content. |
| Exact text | Text cells are literal except the explicitly bounded `{tokens}` in §1.2. Table punctuation outside a text cell is not part of the string. `<br>` in the E3 cell is a line break, not spoken text. |
| Access equivalent | A visible control's text is its accessible name. Descriptions are associated separately, not appended to every focus stop. Source text is the same selectable/readable text. Specific visual equivalents are defined below. |
| Announcement | **Label:** read on focus; **heading/body/source:** available in normal reading order, not automatically read in full; **status/cue:** one polite announcement at the actual transition, retained as the latest status; **error:** announce once on failure/attempt, with the related action; **NPC:** speaker then current line on deliberate talk/delivery. The nonblocking Ari invitation may announce once on arrival if not immediately dismissed. |
| Repeat | Reopening exposes only content actually presented again, without extra clue/learning credit. A repeated unchanged action does not repeat passive announcements; an explicit inspection/retry can repeat its result. A new caption supersedes the last status, recoverable through Goal's recent-status area. |
| Close/interruption/history | Content stays readable until dismissal or an explicit replacement. 06 C2 settles/pauses before opening a task. Closing does not resume movement/playback. A committed source remains available; a canceled pre-commit physical opening does not reveal it. Historical text is labeled as historical and never silently rewritten. |
| Exposure | Labels and operational feedback are access information. Sources record only displayed portions; dialogue records only delivered facts; puppet descriptions record shown outcomes; help records actual displayed assistance. None proves comprehension. §10 adds the precise boundaries. |

### 1.2 Bounded substitutions

These are authoring rules for text, not a data schema or new implementation feature. Unlisted substitution values are not permitted. Join a list with commas and “and”; do not expose internal IDs. Never render an empty token or invented fact.

| Token | Allowed value and source | Rendered example |
|---|---|---|
| `{room}` | Stage, Courtyard, Workshop, Media; public names from NAV. | Go to Media |
| `{person}` | Jo, Remy, Ari, only when local or met with a known room for that action. Loop is an object, not an evidence recipient. | Show Remy |
| `{target}` | Current available object label from §3.3, or a public room name. No unseen inhabitants. | Going to the curled notice. |
| `{tile}`, `{other}`, `{neighbor}`, `{nextTile}` | One Boat, Joined Boats, Hill, Flower from the actual selected/occupied/next-cue tile; never a recommended missing tile. | Insert before Hill |
| `{position}`, `{otherPosition}` | Actual occupied rail position, 1–4. Positions describe the child's order, not an answer template. | Hill is now in position 3. |
| `{sourceTitle}`, `{detailTitle}` | Title from §2, with an actually available source/component/passage. | Open Jo’s story note |
| `{time}` | 9:05, 9:10, 9:12, 9:13, 9:18 only for their source metadata. Otherwise the literal During your visit. | Posted 9:10 |
| `{mode}`, `{modeLower}` | Rehearsal/rehearsal or Premiere/premiere, derived from the retained run mode, not the currently selected tab. | Continue premiere |
| `{question}` | One of the four exact lead questions in §4. | Your question: Where should I check? |
| `{count}` | Actual character count of the active explanation, including excess pasted text. | 598 / 600 characters |
| `{childText}`, `{earlierText}`, `{laterText}` | Verbatim actual draft/recorded child text, with its original punctuation and attribution. Never fill from a demonstration example, model rewrite, or inferred intent. Empty fields use their defined empty state. | Your idea: [the actual saved sentence appears here; this bracketed explanation is author-only] |
| `{details}` | Actual selected passage bodies and source titles, separately rendered with provenance. No missing slot is filled automatically. | An actual selection of E4.a appears under Ari’s filming request. |
| `{action}` | Exact currently available control label from this catalog. | Next action: Read crew brief |

Child-text examples elsewhere are synthetic writing examples for reviewers, not default field values or new story facts. Render child text as text, with no authority to change the story or execute instructions.

### 1.3 Wording consolidation decisions

- Use **Notes** for the world tool and **Evidence / Compare / Timeline / My ideas** inside it. “Evidence tray” remains an authoring description.
- Use **Return to room** for unwinding task views, **Back** for their surviving parent, and **Return to festival** for leaving Pause. “Back to room” in 06 is consolidated to Return to room.
- Use **Start over** to open the whole-case confirmation and **Start new game** only to accept it. Reset rehearsal and Clear rail retain their narrower meanings.
- Use **Arrange tiles / Watch rehearsal** in rehearsal presentation and **Watch premiere** for a show. The state, physical workstation and controls are unchanged.
- Use **Show selected details** for 06's “Show opened details”: it still offers an explicit selection of the record's already displayed portions, with a review before delivery. It does not imply that opening a record displayed every passage.
- Use **Idea recorded / Plan recorded** to distinguish deliberate records from the separate durable-save status. Acknowledged device saving remains “Saved on this device.”

These decisions refine supporting copy only. D06-01's E2 access/exposure distinction is preserved. No narrative, room, puzzle or interface transition is replaced.

## 2. Frozen sources, provenance and copies

**Family:** source body/heading/provenance; display only after legitimate physical, conversational, owned-kit or acquired-record access under 05 G2 and 06 C5. Reading order: title → author/origin → event metadata → selected component/body → optional passage actions. No source body is announced automatically from a room list. Source exposure is passage/component-specific, not a completion checkbox. F bodies below exclude only the surrounding quotation marks used as document typography.

### 2.1 Source titles and provenance

| Content ID | Origin | Exact title | Author/origin, metadata and eligible components |
|---|---|---|---|
| `CT.TITLE.E1` | C | Jo’s crew brief | Jo; no event timestamp; E1.a/b/c. |
| `CT.TITLE.E2` | C | Remy’s post | Remy; recording 9:12, message 9:13, separately labeled; E2.a/b/c and frame subdivisions below. |
| `CT.TITLE.E3` | C | Courtyard notice | Ari; Posted 9:10; E3.a/b only after full access. Before that use Curled notice, not the concealed heading. |
| `CT.TITLE.E4` | C | Ari’s filming request | Ari; Posted 9:05; E4.a/b. |
| `CT.TITLE.E5` | C | Ari’s capture slate and Loop | Separate origins: capture slate / Ari’s account / your observation; never unlock one through another. |
| `CT.TITLE.E6` | C | Jo’s story note | Jo; no invented timestamp; E6.a/b across every copy. |
| `CT.TITLE.E7` | C | Remy’s model note | Remy; no invented timestamp; E7.a/b/c across every copy. |
| `CT.TITLE.E8` | C | Story tiles | Crew; four local descriptions, not four extra principal records. |
| `CT.META.AUTHOR` | N | By {person} | Only the actual author of a written source; never attach Ari to Jo/Remy's notes. |
| `CT.META.POSTED` | C | Posted {time} | E3 9:10; E4 9:05; E2 message 9:13. |
| `CT.META.RECORDED` | C | Recording {time} | E2 recording 9:12, when recording metadata is actually displayed. |
| `CT.META.CAPTURED` | C | Captured 9:18 | Only E5.a's capture metadata, not an arrival timestamp. |
| `CT.META.VISIT` | F | During your visit | Direct observation, not an invented clock reading. |
| `CT.META.VENUE` | C | Venue information | NAV references retain public-information provenance. |
| `CT.META.CREW` | N | Crew’s story tiles | E8 origin. |
| `CT.META.ACCOUNT` | N | {person} told you | Delivered account, preserving its speaker; not a new independent written source. |
| `CT.META.OBSERVATION` | C | Your observation | E5.c actually observed state; no fictional author. |

### 2.2 Exact body registry

| Content ID | Canonical reference | Exact frozen body | Availability and passage boundaries |
|---|---|---|---|
| `CT.SRC.E1` | E1 | You’re our premiere captain. Bring Loop back and help us finish The Little Bridge. Our crew made Pip together—you made the backpack! Read my story note and Remy’s model note, try your plan on the rehearsal rail, then start the show. The audience will see the version you build. | E1.a = first two sentences; E1.b = “Our crew made Pip together—you made the backpack!”; E1.c = last two sentences. First flap access or Jo explicitly presenting the brief. Instructions express the assignment, not enforced reading gates. |
| `CT.SRC.E2.A` | E2.a | 9:12 recording: Loop passes through the crew door on a cart. The recording ends at the doorway. | Full accessible clip description only after explicit Describe recording; ordinary frame access uses §2.3. |
| `CT.SRC.E2.B` | E2.b | Part of the courtyard notice. | Photograph caption; its only visible notice word is CANCELED. It never becomes the full notice. |
| `CT.SRC.E2.C` | E2.c | I saw Loop go through the crew door. Then I saw ‘CANCELED’ at the courtyard. I think our whole premiere is off. | Remy's posted interpretation; preserve I think. Display on actual post opening or an explicitly delivered Remy account. Hearing the account alone does not acquire the recording/photo package. |
| `CT.SRC.E3` | E3 | OUTDOOR REHEARSAL CANCELED.<br>Wind keeps folding the paper petals.<br>The opening premiere is still planned.<br>We will finish the flower shot indoors. | E3.a = first two lines; E3.b = last two lines. Full physical notice becomes available at flat-and-secured commit; photograph never supplies it. NPC quotation requires that NPC's allowed knowledge and records only words actually supplied. |
| `CT.SRC.E4` | E4 | Borrowing Loop to finish the lantern-flower shot. I need a plain wall and paper petals that stay still. If the wind keeps folding them, I’ll move the recording indoors. I’ll leave the finished animation with Loop for our premiere captain. | E4.a = first two sentences; E4.b = last two. A request/conditional plan, not proof it was carried out. |
| `CT.SRC.E5.A` | E5.a | Lantern-flower animation captured in Media, 9:18. Loaded into Loop’s Flower tile. Story tiles and both makers’ notes are ready for the premiere captain. | Historical slate only when inspected or explicitly presented by Ari. Does not wake Loop or supply unheard account. |
| `CT.SRC.E5.B` | E5.b | The wind kept folding the petals outside. I brought Loop here and finished the flower. Everything is ready to take back. You can try the story tiles in any order. | Ari's full filming account when delivered. Historical “here” means Media, its delivery location. Reopen with origin Media, not relocated narration. |
| `CT.SRC.E6` | E6 | Pip promised Grandma, ‘I’ll come to your hill, and we’ll plant this seed together before dark.’ Last night’s rain washed the footbridge away. Pip cannot swim or fly. Grandma is waiting across the river. | E6.a = quoted promise “I’ll come to your hill, and we’ll plant this seed together before dark.”; E6.b = final three sentences. Full source retains the attribution preceding the quote. No countdown is introduced. |
| `CT.SRC.E7` | E7 | One little boat carries the seed safely, but it cannot carry Pip. When the boats are joined side by side, their wide tops make a bridge Pip can walk across. The seed stays dark in a boat or a hand. Its lantern-flower grows only after its roots reach the hill’s soil. | E7.a = first sentence; E7.b = second; E7.c = last two. Authored puppet-world rules, not a generalized physics/botany lesson. |
| `CT.SRC.E8.FERRY` | E8 / TILE.FERRY | Send one boat across. | One Boat inspection. No passenger limit or completed crossing animation in this local description. |
| `CT.SRC.E8.BRIDGE` | E8 / TILE.BRIDGE | Join the little boats. | Joined Boats inspection. No automatic Pip crossing demonstration. |
| `CT.SRC.E8.PLANT` | E8 / TILE.PLANT | Begin the hill planting scene. | Hill inspection. No automatic successful planting. |
| `CT.SRC.E8.BLOOM` | E8 / TILE.BLOOM | Try the lantern-flower cue. | Flower inspection. No implied unconditional growth. |

Passage aliases point to the exact spans above; do not maintain editable duplicate passage text. A comparison displays its actual selected span with the source title, not an automatic summary. E5.c is observation, supplied by the state-specific entries below rather than a fabricated quotation.

### 2.3 E2 and E5 component boundaries

| Content ID | Origin | Exact content | Condition and exposure |
|---|---|---|---|
| `CT.MEDIA.RECORDING` | C | Recording | E2 component tab; label alone supplies no event. |
| `CT.MEDIA.PHOTO` | C | Photo | E2 component tab; label alone supplies no hidden text. |
| `CT.MEDIA.MESSAGE` | C | Remy’s message | E2.c grouping. |
| `CT.MEDIA.FRAME1` | N | Loop is on a low wheeled crew cart in the courtyard. | First frame's accessible visual equivalent; E2.a/frame 1 only. No doorway/end fact. |
| `CT.MEDIA.FRAME2` | N | The cart carrying Loop passes through the crew door. | Second frame only; no arrival or destination. |
| `CT.MEDIA.FRAME3` | N | The doorway is empty after the cart passes. | Third frame only. |
| `CT.MEDIA.END` | C | Recording ends here. | Display at third-frame/end marker, never on the first still or initial accessible name. |
| `CT.MEDIA.PARTIAL` | N | A curled notice photograph. Only “CANCELED” is visible; the heading and bottom text are hidden by the folds. | Explicit Photo view/enlargement; E2.b. No physical Flatten action here. |
| `CT.MEDIA.FRAME1.LABEL` | N | Frame 1 | First scrub position; no content preview. |
| `CT.MEDIA.FRAME2.LABEL` | N | Frame 2 | Second position. |
| `CT.MEDIA.FRAME3.LABEL` | N | Frame 3 | Third position. |
| `CT.MEDIA.SLATE` | C | Capture slate | E5.a, only when acquired. |
| `CT.MEDIA.ARI` | C | Ari’s account | E5.b, only when actually delivered. |
| `CT.OBS.LOOP.SEEN` | C | You saw Loop in Media during your visit. | E5.c historical location observation after actual arrival/description. Does not say Loop remains there. |
| `CT.OBS.LOOP.RESPONSE` | N | Loop turned toward you and was ready to follow. | E5.c response component after wake commit. Seeing standby Loop alone does not supply it. |
| `CT.MEDIA.HISTORICAL` | N | From your earlier visit to Media | Label on historical E5 observation after departure/recovery; exact slate/account remains unchanged. |

E2 landing view displays frame 1 and E2.c's actual text; each is separately exposed. Play progresses through authored frames, while Previous/Next/frame selection works without dragging. Back retains the current component/frame. Describe recording explicitly exposes the complete CT.SRC.E2.A text; a screen-reader user is not forced to hear it simply by entering the post. E5 acquisition similarly never fills unacquired slate/account slots with spoiler previews or blank titled placeholders.

### 2.4 Navigation and vocabulary

| Content ID | Origin | Exact content | Binding |
|---|---|---|---|
| `CT.NAV.ST` | F | Stage — public performance | NAV.ST; WK.ACCESS.NAV / ACC.VENUE. |
| `CT.NAV.CY` | F | Courtyard — open-air rehearsal and props | NAV.CY; same accesses. |
| `CT.NAV.WK` | F | Workshop — shared model bench and passage | NAV.WK; same accesses. |
| `CT.NAV.MEDIA` | F | Media — indoor filming space with a plain wall. | NAV.MEDIA; suitability only, no occupants. |
| `CT.WORD.PREMIERE` | F | the first public showing | Definition for premiere. |
| `CT.WORD.REHEARSAL` | F | a practice before the show | Definition for rehearsal. |
| `CT.WORD.CAPTURED` | F | recorded | Definition for captured. |
| `CT.WORD.CUE` | F | a signal that starts an action in the puppet story | Definition for cue/story tile. |
| `CT.WORD.INTERPRETATION` | F | what you think information means | Definition for interpretation. |

Room names are known public destinations from start. NAV descriptions become referenceable on actual display. Vocabulary has no hint level beyond access support and never expands into an unstated story solution.

### 2.5 Physical/conversational copy crosswalk

| Canonical source | Legitimate first accesses | Reopen and ownership |
|---|---|---|
| E1 | ST.SOURCE.E1; Jo explicitly presents her brief | ACC.EVIDENCE.E1. Jo pointing to it alone is not body exposure. |
| E2 | ST.ACCESS.E2; CY.ACCESS.E2; Remy explicitly opens his post | Complete post package portable after actual opening under D06-01; ACC.EVIDENCE.E2 retains per-component exposure. Quoted account alone retains only that account and its origin. |
| E3 | CY.SOURCE.E3 after flattening/secure commit; explicitly quoted received text in NPC response | ACC.EVIDENCE.E3 for acquired physical reading; NPC quotation records only conveyed portions, never grants hidden text. |
| E4 | ST.SOURCE.E4; Ari explicitly presents her request | ACC.EVIDENCE.E4. Jo's borrowing account retains its own delivery origin, without an invented physical inspection. |
| E5.a / .b / .c | MD.SOURCE.E5 or Ari presenting slate / Ari's account / actual Loop observation and response | ACC.EVIDENCE.E5 groups acquired components only; historic location remains Media. |
| E6 | ST.SOURCE.E6, MD.SOURCE.E6, KIT.NOTE.E6, Jo presenting exact note | One E6 identity. Unread possessed leaflet opens in hand via ACC.KIT; after seating, first leaflet access approaches ST.RACK.BAY. Mounted copies stay. Acquired text reopens via ACC.EVIDENCE.E6. |
| E7 | CY.SOURCE.E7, MD.SOURCE.E7, KIT.NOTE.E7, Remy presenting exact note | Same ownership rules; ACC.EVIDENCE.E7. |
| E8 | MD.ACCESS.E8, KIT.CADDY, individual TILE.* inspections, seated ST.RACK.BAY | ACC.EVIDENCE.E8 can inspect acquired tiles; physical placement still requires Stage. Collection supplies objects, not automatic local-description exposure. |

## 3. Shared controls, starting and the explored world

**Family:** controls/operational statuses; no answer assistance. Defaults from §1 apply. An action label read on focus is not the contents of the object it opens. 06 governs actual motion, focus and availability. Room description is separate from NAV's public descriptions: it is offered only in the room actually entered.

### 3.1 Common controls and form messages

| Content ID | Origin | Exact text | Use/condition |
|---|---|---|---|
| `CT.UI.BACK` | C | Back | Restore surviving parent task/child mode. |
| `CT.UI.CLOSE` | C | Close | Close current child/root according to 06 C3; never auto-play. |
| `CT.UI.ROOM` | C | Return to room | Unwind supporting tasks to current room. |
| `CT.UI.FESTIVAL` | C | Return to festival | Exit Pause; paused run remains paused. |
| `CT.UI.CANCEL` | C | Cancel | Cancel current uncommitted choice, not committed case progress. |
| `CT.UI.DISMISS` | C | Dismiss | Remove guidance/optional offer only. |
| `CT.UI.KEEP` | C | Keep playing | Close help/save offer and preserve draft/current run. |
| `CT.UI.MENU` | C | Menu | Open Pause. |
| `CT.UI.GOAL` | C | Goal | Recover assignment, present opportunity, current question and latest status. |
| `CT.UI.MOVE` | F | Move to… | Named current-room objects and exits. |
| `CT.UI.MAP` | C | Map | Public venue view. |
| `CT.UI.NOTES` | C | Notes | Evidence and optional thinking tools. |
| `CT.UI.HELP` | C | Help | Open coaching without sending. |
| `CT.UI.KIT` | C | Kit | Appropriate physical host/acquired-evidence access. |
| `CT.UI.SETTINGS` | C | Settings | Current caller preserved. |
| `CT.UI.EDIT` | C | Edit | Edit the indicated idea/plan/selection; no implicit delivery. |
| `CT.UI.NOTHING` | C | Nothing to save yet. | Completely empty idea, no details or relationship. |
| `CT.UI.ADD_IDEA` | C | Add an idea, or return to the room. | Attempted textual explanation record/delivery with no text; not used for evidence-only presentation, comparison or help. |
| `CT.UI.LIMIT` | C | Shorten this to 600 characters before sending. | Overlimit explicit explanation delivery/coaching send; preserve all draft text. No exploration lock. |
| `CT.UI.LIMIT_RECORD` | N | Shorten this to 600 characters before recording it. | Overlimit Save idea/Record my plan; makes no false claim that a private record is sent to anyone. |
| `CT.UI.COUNT` | N | {count} / 600 characters | Display from 500 characters onward or whenever overlimit; not announced per keystroke. |
| `CT.UI.DRAFT_KEPT` | N | Your draft is kept for this visit. | Explicit canceled send/closed draft status when needed; saving status separately conveys durable success/failure. |
| `CT.UI.LATEST` | N | Latest action | Goal's existing recoverable latest-status text, not a new full event-log feature. |

### 3.2 Start, goal, movement

| Content ID | Origin | Exact text | Condition |
|---|---|---|---|
| `CT.START.TITLE` | F | Evidence Quest | Start heading. |
| `CT.START.CASE` | F | Launch Day: Where’s Loop? | Case subtitle. |
| `CT.START.CHECK` | C | Checking saved progress… | Startup reading; no false empty slot. |
| `CT.START.START` | C | Start | Confirmed no run. |
| `CT.START.CONTINUE` | C | Continue | Valid saved/current session run. |
| `CT.START.LOCATION` | N | Continue in {room} | Valid durable run summary. |
| `CT.START.VISIT` | C | Continue this visit in {room} | Current in-memory progress newer than durable record; same page visit. |
| `CT.START.OVER` | C | Start over | Opens whole-case confirmation only. |
| `CT.GOAL.ASSIGNMENT` | C | You’re the premiere captain. Bring Loop back and premiere The Little Bridge. | Opening and always-recoverable original assignment. |
| `CT.GUIDE.TAB` | C | Try the paper model’s pull tab. | Opening suggestion before model tried; dismissible. |
| `CT.GUIDE.PREVIEW` | C | Try Preview at the rehearsal desk. | After model commit, before Preview tried; no exit lock. |
| `CT.GOAL.SEARCH` | C | Look around or ask the crew about Loop. | Loop not yet observed/recovered; no named hidden destination. |
| `CT.GOAL.RESOURCES` | C | Bring Loop and the story kit to the Stage. | Both known resources still need delivery; do not imply they were read. |
| `CT.GOAL.LOOP` | N | Bring Loop to the Stage dock. | Kit seated, Loop still missing/following. Known action, not unobserved location. |
| `CT.GOAL.KIT` | N | Bring the story kit to the rehearsal desk. | Loop docked, kit not seated. |
| `CT.GOAL.SEAT` | F | Set the story kit on the desk. | Carried kit, player in Stage; actual handoff action. |
| `CT.GOAL.DOCK` | F | Dock Loop | Following Loop, player in Stage. |
| `CT.GOAL.REHEARSE` | C | Try your story tiles in rehearsal. | Both delivered, current order not certified. |
| `CT.GOAL.LAUNCH` | C | Launch your premiere. | Current arrangement fully certified, first premiere pending. |
| `CT.GOAL.AFTER` | C | Replay or try another arrangement. | Historical completion; current qualification is still checked at Show. |
| `CT.GOAL.QUESTION` | C | Your question: {question} | Only after an actual lead selection; separate from physical goal. |
| `CT.WORLD.YOU` | F | YOU | First avatar guidance. Accessible name: You, the premiere captain. |
| `CT.WORLD.GO` | C | Go to {room} | Physical door / Map travel; no automatic source operation. |
| `CT.WORLD.GOING` | C | Going to {target}. | Committed movement intent to named target. Floor-only walk has no invented target name; avatar movement supplies feedback. |
| `CT.WORLD.STOP` | C | Stop walking | Current walking intent. |
| `CT.WORLD.STOPPED` | N | Walking stopped. | Explicit cancellation; do not announce on every source opening. |
| `CT.WORLD.CHOOSE` | N | What would you like to use? | Overlap chooser heading, followed by actual candidate actions; no default chosen clue. |
| `CT.WORLD.BLOCKED` | F | That space is blocked. | Noninteractive collision. |
| `CT.WORLD.UNREACHABLE` | F | I can’t reach that from here | No legal approach; current avatar position retained. |
| `CT.WORLD.ARRIVED` | N | You’re in {room}. | Room arrival; once, then available description; no source body read automatically. |
| `CT.WORLD.HERE` | N | You are here | Current room marker in Map. |
| `CT.WORLD.LOCAL_LIST` | N | Choose an object or exit. You’ll walk to it. | Move to list instructions; current room only. |
| `CT.WORLD.VENUE` | F | Read venue information | WK.ACCESS.NAV; actual sign approach. |

Goal selection priority: historical completion → after text plus any actual paused-run label; otherwise current certification → Launch; otherwise physical missing-resource states → corresponding text; otherwise rehearsal. Initial search text does not disclose where materials wait. Once Media is reached, current local object actions make recovery explicit. Separate local Dock/Set actions can appear together when both apply; neither silently performs the other.

### 3.3 Exact physical action names and operation captions

| Content ID | Origin | Exact text | Object/state/commit |
|---|---|---|---|
| `CT.OBJ.MODEL` | F | Pull the story tab | ST.MODEL/TAB default cue; native control can use same full label, consolidating Pull tab. |
| `CT.OBJ.MODEL_RESULT` | F | Pip reaches the river. The footbridge folds down. | Model commit only; no projection change. |
| `CT.OBJ.BRIEF_OPEN` | F | Lift the crew brief | ST.SOURCE.E1 closed flap. |
| `CT.OBJ.BRIEF_READ` | F | Read crew brief | E1 physical flap already open. |
| `CT.OBJ.JO_DRAWER` | F | Open Jo’s story-note drawer | ST.SOURCE.E6 shut. |
| `CT.OBJ.JO_NOTE` | F | Read Jo’s story note | ST.SOURCE.E6 open / MD.SOURCE.E6 / allowed conversation. |
| `CT.OBJ.REQUEST_OPEN` | F | Unfold filming request | ST.SOURCE.E4 folded. |
| `CT.OBJ.REQUEST_READ` | N | Read filming request | Same request unfolded. |
| `CT.OBJ.POST` | F | Open Remy’s crew post | ST.ACCESS.E2 / CY.ACCESS.E2; neutral scene label Crew message. |
| `CT.OBJ.MESSAGE_LABEL` | F | Crew message | Unopened Stage board label; no cancellation headline. |
| `CT.OBJ.NOTICE_CURLED` | F | Curled notice | Before notice commit. |
| `CT.OBJ.NOTICE_FLATTEN` | F | Flatten and secure notice | CY.SOURCE.E3 one physical action; same pointer/keyboard meaning. |
| `CT.OBJ.NOTICE_READ` | N | Read courtyard notice | Notice already flat/secured. |
| `CT.OBJ.NOTICE_PARTIAL` | N | The notice is curled. Only “CANCELED” is visible. | Current curled physical source; not E3.a/b exposure. |
| `CT.OBJ.NOTICE_DONE` | F | The notice is flat and clipped to the board. | Secure commit, then exact E3 body. |
| `CT.OBJ.REMY_NOTE` | F | Read Remy’s model note | CY.SOURCE.E7 / MD.SOURCE.E7 / legitimate Remy presentation. |
| `CT.OBJ.DOCK_OPEN` | F | Open Loop’s dock | Dock flap closed, no following Loop on Stage. |
| `CT.OBJ.DOCK_EMPTY` | F | Inspect empty dock | Already-open empty bay. |
| `CT.OBJ.DOCK_EMPTY_RESULT` | F | Loop’s place is empty. | Dock inspection; no repair issue invented. |
| `CT.OBJ.WAKE` | F | Wake Loop and follow me | ACT.LOOP / LOOP.FOLLOW.PAD while standby and locally present. |
| `CT.OBJ.WAKE_RESULT` | F | Loop is ready to follow you. | Wake responsive-pose commit. |
| `CT.OBJ.FOLLOWING` | F | Loop is following you | Repeated activation/local follower status. |
| `CT.OBJ.DOCK_READY` | F | Loop is ready at the dock. | Docked repeat/settled status; projecting state uses run caption instead. |
| `CT.OBJ.SLATE` | F | Read capture slate | MD.SOURCE.E5. |
| `CT.OBJ.TALK` | C | Talk to {person} | Local actual NPC approach. |
| `CT.OBJ.INSPECT_TILE` | C | Inspect {tile} | Existing tile inspection; local description only. |
| `CT.OBJ.PETALS` | F | The outdoor paper petals fold in the breeze. | CY.PETALS observed/description, including reduced motion. No mandatory new clue. |

First source openings need no extra invented “clue found” banner: their physical pose, heading and body are the result. Before-commit cancellation returns to the original cue; after commit use the Read variant. The dock, kit and Loop use their actual ownership captions rather than a generic “success” toast.

### 3.4 Whole-room descriptions and current-owner suffixes

Read the base, applicable suffixes, then door list. These are available through room overview/description, not remote Map entries. They summarize visible conditions without enumerating unread text. Scenery has no new interactive targets.

| Content ID | Origin | Exact content | Condition |
|---|---|---|---|
| `CT.SCENE.ST` | N | Stage. Jo stands beside the paper model. The crew board and Loop’s dock are above the open walkway. The rehearsal desk is below it. Courtyard is through the left exit; Workshop is through the right exit. | SC.ST; MODEL.* initial illustration can be inspected via model, not recited as E6. |
| `CT.SCENE.ST.EMPTY` | N | The dock and story-kit space are empty. The big backdrop is blank. | Both missing at Stage. If only one missing, use its specific status rather than this combined line. |
| `CT.SCENE.ST.KIT` | N | The story kit is on the rehearsal desk. | Caddy seated; no note/body exposure. |
| `CT.SCENE.ST.LOOP` | N | Loop is connected at the dock. The paper story is on the backdrop. | Loop docked/projecting; actual story details through §6. |
| `CT.SCENE.ST.BLANK` | N | The backdrop is blank; Loop is not in the dock. | Missing Loop; independent of kit/rail. |
| `CT.SCENE.CY` | N | Courtyard. Remy is beside the crew tablet. A small boat model and a note sit on the bench. Paper petals fold in the breeze. A notice is on the board. Stage is through the left exit; Workshop is through the right exit. | SC.CY; add notice's actual curled/flat status. No note rule recited. |
| `CT.SCENE.WK` | N | Workshop. The shared bench is occupied by paper scenery. A venue-information sign stands beside the passage to Media. Stage is through the left exit; Courtyard is through the right exit. Maximum Toast stands in a separate bay on the right. | SC.WK; covered/revealed gag status belongs to §9; no required detour. |
| `CT.SCENE.MD` | N | Media. Ari is beside the recording table. Paper petals lie still in front of a plain wall. The capture slate is on the table. Jo’s and Remy’s mounted notes are beside the story-kit space. Workshop is through the bottom exit. | SC.MD only, after actual arrival; no slate body. |
| `CT.SCENE.MD.LOOP` | N | Loop is beside the recording table. | Standby in Media; actual location exposure. |
| `CT.SCENE.MD.NO_LOOP` | N | The place beside the recording table where Loop stood is empty. | Player previously observed/recovered Loop and it is absent. No claim about current offscreen docking. |
| `CT.SCENE.MD.KIT` | N | The story kit is in its space beside the mounted notes. | Not collected; no disclosure that notes were read. |
| `CT.SCENE.MD.NO_KIT` | N | The story-kit space is empty. Both mounted notes are still here. | Kit collected. |
| `CT.SCENE.FOLLOW` | N | Loop is here, following you. | Any current room while following; never shown in another room's destination list. |
| `CT.SCENE.CARRIED` | N | You’re carrying the story kit. | Current caddy host player. |

## 4. Reading, investigation, ideas and presentation

**Family:** source tools/optional writing, neutral game voice. Source links use actual canonical titles and bodies from §2. UI instructions never fill a theory, select a relationship, or award correctness. §1's control/status/exposure rules apply; 06 C4 preserves private drafts independently of deliberate records or delivery. All these actions remain optional.

### 4.1 Exact reading and investigation controls

| Content ID | Origin | Exact text | Meaning/variant condition |
|---|---|---|---|
| `CT.NOTES.EVIDENCE` | C | Evidence | Notes tab; only available documents/accounts listed. |
| `CT.NOTES.COMPARE` | C | Compare | Optional two-detail tool. |
| `CT.NOTES.TIMELINE` | C | Timeline | Known times/discovery order. |
| `CT.NOTES.IDEAS` | C | My ideas | Private drafts and records. |
| `CT.NOTES.EMPTY` | C | Your discoveries will stay here. | No acquired sources; no eight empty slots. |
| `CT.NOTES.OPEN_SOURCE` | N | Open {sourceTitle} | Acquired source/component; no implication of new physical travel. |
| `CT.NOTES.LOCATION` | C | Show source location | Known physical origin/current portable owner. |
| `CT.NOTES.GO_SOURCE` | N | Go to the source in {room} | Known actual physical host; initiates travel only, then local action. |
| `CT.SOURCE.ENLARGE` | C | Enlarge source | Same source/component, no additional hidden content automatically presented. |
| `CT.SOURCE.DEFINITION_CLOSE` | C | Close definition | Return focus to the selected word. |
| `CT.SOURCE.DETAIL` | C | Select a detail | Passage selection, no automatic answer. |
| `CT.SOURCE.ADD` | C | Add detail | Open source/passage picker for the chosen empty slot. |
| `CT.SOURCE.CHANGE` | C | Change detail | Replace that slot only after Use this detail. |
| `CT.SOURCE.REMOVE` | C | Remove detail | Remove selected reference; retain idea/relationship without fabricating the missing source. |
| `CT.SOURCE.USE` | C | Use this detail | Confirm current exact passage selection. |
| `CT.SOURCE.CHOOSE` | N | Choose a source, then the detail you want to use. | Picker instructions; no default detail. |
| `CT.SOURCE.NONE` | N | Choose a detail first. | Use attempted with no selection; Back/Return remains usable. |
| `CT.SOURCE.VENUE` | C | Venue information | Separate picker group with displayed NAV references. |
| `CT.SOURCE.OPEN_VENUE` | C | Open venue information | Owned Map child, then return to picker; does not auto-select NAV.MEDIA. |
| `CT.SOURCE.NO_AVAILABLE` | N | No source details are available here yet. You can return to the room or open venue information. | Empty picker; no hidden source titles. Owned kit link appears separately only when genuinely possessed. |
| `CT.CLIP.PLAY` | C | Play recording | E2 explicit play, current frame/resume policy from 06. |
| `CT.CLIP.PAUSE` | C | Pause recording | Holds current frame. |
| `CT.CLIP.PREVIOUS` | C | Previous frame | One frame backward; at first frame pair with CT.CLIP.FIRST. |
| `CT.CLIP.NEXT` | C | Next frame | One frame forward; at last pair with CT.CLIP.LAST. |
| `CT.CLIP.FIRST` | N | This is the first frame. | End-limit feedback, no change/exposure of later frames. |
| `CT.CLIP.LAST` | N | This is the last frame. | Only when last frame actually displayed. |
| `CT.CLIP.DESCRIBE` | C | Describe recording | Explicitly displays the full CT.SRC.E2.A description. |
| `CT.CLIP.REPLAY` | C | Replay recording | Restart E2 from first frame. |
| `CT.CLIP.ENLARGE_PHOTO` | F | Enlarge photo | Same partial photograph. |
| `CT.CLIP.POSITION` | N | Recording frame | Accessible name of three-position scrub control; current value is Frame 1/2/3, not a spoiler sentence. |
| `CT.COMPARE.INSTRUCTION` | C | Choose details you want to look at together. | Empty/partial comparison. |
| `CT.COMPARE.FIRST` | N | First detail | Slot label; no hidden source recommendation. |
| `CT.COMPARE.SECOND` | N | Second detail | Slot label. |
| `CT.COMPARE.RELATION` | N | How do these details connect? | Optional relationship group. |
| `CT.COMPARE.SUPPORTS` | F | supports | Child-selected relationship, not a verdict. |
| `CT.COMPARE.CONFLICTS` | F | conflicts with | Same. |
| `CT.COMPARE.BEFORE` | F | happened before | Same; selection does not change chronology. |
| `CT.COMPARE.RELATION_HELP` | N | This records the connection you chose. | Below relationship group; never “correct connection.” |
| `CT.COMPARE.CLEAR_RELATION` | N | Remove connection | Optional relationship cleared; selected details/words remain. |
| `CT.TIMELINE.EMPTY` | C | Times from your discoveries will appear here. | No known timed records. |
| `CT.TIMELINE.EVENT` | C | Event times | Sort known event metadata. |
| `CT.TIMELINE.DISCOVERY` | C | Discovery order | Sort actual exposure order, not infer chronology. |
| `CT.TIMELINE.PLAN` | N | Request or plan | E4 9:05; source not completed event. |
| `CT.TIMELINE.NOTICE` | N | Notice and announced plan | E3 9:10. |
| `CT.TIMELINE.RECORDING` | N | Recorded movement | E2 9:12 metadata/components actually displayed. |
| `CT.TIMELINE.POST` | N | Remy’s posted interpretation | E2.c 9:13; uncertainty retained. |
| `CT.TIMELINE.CAPTURE` | N | Completed recording | E5.a 9:18, only after slate. |
| `CT.TIMELINE.ACCOUNT` | N | Account you heard | Acquired account, unknown event time uses During your visit for delivery; do not invent a capture timestamp from E5.b alone. |
| `CT.TIMELINE.OBSERVED` | N | What you observed | Direct observation; During your visit. |

Timeline rows comprise the applicable type + actual time + source title/component + Open source. No automatic historical details beyond those acquired. If a selected document has no event time, its discovery-order entry remains available without a fabricated clock value. E2 recording and post have separate rows only when their respective metadata has actually appeared. Selected relationship wording never changes these factual labels.

### 4.2 Exact idea, lead and presentation content

| Content ID | Origin | Exact text | Meaning/condition |
|---|---|---|---|
| `CT.IDEA.FIELD` | F | My idea | Optional field label; blank field, no answer placeholder. |
| `CT.IDEA.PRIVATE` | N | This is your draft. It hasn’t been shown to anyone. | True private draft only; previously delivered version remains separately historical. |
| `CT.IDEA.SAVE` | C | Save idea | Deliberate record of current text/details/relationship, not NPC delivery. |
| `CT.IDEA.RECORDED` | N | Idea recorded. | Record committed in current visit; saving status separate. |
| `CT.IDEA.EDIT` | N | Edit this idea | New draft of recorded idea; previous recorded version retained on actual revision. |
| `CT.IDEA.EARLIER` | C | Earlier idea | Actual previous recorded text only. |
| `CT.IDEA.CURRENT` | N | Current idea | Current recorded version. |
| `CT.IDEA.PAST_PLAN` | N | Plan for an earlier arrangement | Saved record context differs from current rail; do not relabel it prediction for new order. |
| `CT.LEAD.CHOOSE` | N | Choose a question to follow. | Authored supported lead list; private unsupported text remains a note. |
| `CT.LEAD.CANCELED` | F | Is our premiere canceled? | Authored search question, not a claim the player believes it. |
| `CT.LEAD.MOVED` | F | Why was Loop moved? | Same. |
| `CT.LEAD.WHERE` | F | Where should I check? | Same. |
| `CT.LEAD.PROMISE` | F | How can Pip keep the promise? | Story question. |
| `CT.LEAD.FOLLOW` | F | Follow this lead | Records question and selected already-known destination; no travel until Go. |
| `CT.LEAD.DESTINATION` | N | Where would you like to check? | Public room choices without occupants/correctness labels. |
| `CT.PLAN.RECORD` | C | Record my plan | In-place crew-plan record, no Jo reply. |
| `CT.PLAN.RECORDED` | N | Plan recorded. You haven’t shown this version to Jo. | Only while current snapshot undelivered to Jo. |
| `CT.PLAN.DELIVERED` | N | You showed this version to Jo. | Actual delivered snapshot; editing creates a new undelivered version. |
| `CT.PLAN.SEARCH` | C | Your search plan | Search context. |
| `CT.PLAN.STORY` | C | Your story plan | Current arrangement context; opening settles any cue first. |
| `CT.PLAN.EXPLAIN` | F | Explain this plan to Jo | Explicit addressed flow, actual approach before delivery. |
| `CT.PRESENT.OPEN` | C | Show evidence | Choose references, no automatic delivery. |
| `CT.PRESENT.SELECTED` | C | Show selected details | Review already displayed selected portions; never unopened entire record. |
| `CT.PRESENT.WHO` | N | Who would you like to show? | Recipient chooser. |
| `CT.PRESENT.HERE` | C | Here | Current-room NPCs. |
| `CT.PRESENT.MET` | C | People you’ve met elsewhere | Known NPC/room only; no unseen Ari-in-Media entry. |
| `CT.PRESENT.NO_RECIPIENT` | N | No one is here to show. You can return to the room. | No local/known eligible recipient; no forced trip or invented person. |
| `CT.PRESENT.CHOOSE` | C | Choose a detail to show. | Empty evidence selection; does not require an explanation. |
| `CT.PRESENT.REVIEW` | N | You’re showing {person}: | Heading before actual selected details and any separately labeled child idea. |
| `CT.PRESENT.SHOW` | C | Show {person} | Local recipient, queue approach and deliver once. |
| `CT.PRESENT.GO` | C | Go to {person}’s room | Known remote recipient; travels only, retains draft; Show must be selected locally. |
| `CT.PRESENT.GOING` | C | Going to show {person} your selected details. | Pending actual local approach; cancel/new intent prevents delivery. |
| `CT.PRESENT.DONE` | N | You showed {person} these details. | At delivery commit only; accompanying reply may add knowledge within §5. |
| `CT.PRESENT.CANCELED` | N | Nothing was shown. Your selection is kept. | Canceled before delivery. If delivery committed, retain DONE/history instead. |

Saving references alone does not constitute a written explanation. A blank comparison with references/relationship can be recorded; a totally empty one uses CT.UI.NOTHING. Evidence-only presentation remains available. Actual recorded text is reproduced verbatim under its private/recorded/delivered status, never synthesized from chosen source passages.

## 5. Crew dialogue and evidence replies

**Family:** speaker is Jo/Remy/Ari as indicated; read speaker then line. Ordinary Talk/Show occurs at that NPC's 05 approach; first Ari invitation is the established dismissible local arrival exception. A speaker's own source may be explicitly opened through conversation without another physical trip. Pointing to a note is not displaying it. NPCs do not recite a solution merely because Talk was selected.

### 5.1 Frozen conversation lines

| Content ID | Origin | Speaker and exact line | Trigger/knowledge condition |
|---|---|---|---|
| `CT.JO.MODEL` | F | Jo: “You made Pip’s backpack. Today, you’re running our premiere. Let’s get your little traveler onto the big stage.” | First model commit; retained for recovery, no E1 body exposure. |
| `CT.JO.BORROW` | F | Jo: “Ari borrowed Loop to finish the flower shot. They were finding somewhere the paper would stay still. I haven’t seen them return.” | Ask about empty dock before Loop returned; no observed destination. |
| `CT.JO.CANCEL_UNKNOWN` | F | Jo: “I’m still preparing our premiere. I didn’t see that notice. Let’s check what it actually says.” | Cancellation topic with neither relevant E3 passage supplied. |
| `CT.REMY.CLIP` | F | Remy: “I saw the crew door. My recording stops there.” | Explicit recording-limit topic; supplies Remy's account of the limit, not automatic full-clip exposure. |
| `CT.REMY.CORRECT` | F | Remy: “Outdoor rehearsal. I only saw the word in the middle. I jumped from that to our whole premiere.” | Both E3 scope and continued-premiere status actually supplied, currently or earlier. Records Remy's correction, not the player's revision. |
| `CT.ARI.INVITE` | F | Ari: “There’s Loop! The petals wouldn’t stay still outside, so I recorded them here. The flower is ready. Take the story tiles and both notes.” | First eligible Media invitation while Loop standby and caddy present; after resources move use actual-progress variants. Unshown invitation remains available only if still factually applicable. |
| `CT.ARI.WAIT` | F | Ari: “I was finishing the recording and keeping the materials together for you. You’re our premiere captain.” | Asked why not returned; past account remains valid after pickup. |
| `CT.JO.DOCKED` | F | Jo: “Our little story can fill the stage now. Let’s see what your plan makes happen.” | First docking acknowledgment, queued if a reading view is open; no automatic solution. |
| `CT.JO.SEED_HELP` | F | Jo: “Pip promised to come and plant with Grandma. The seed got there. Pip still needs a way across.” | Explicit requested story help, actual seed right/Pip left. Relationship assistance; if E6 unread, record introduced promise, not full E6 reading. |
| `CT.REMY.CROSS_HELP` | F | Remy: “One boat takes the seed. Joining the boats makes room for Pip to cross too.” | Explicit crossing help, not ordinary Talk default. Relationship/means supplied; unread E7 remains unread except introduced facts. |
| `CT.JO.SOLUTION` | F | Jo: “Try Joined Boats, Hill, then Flower. That brings Pip over, lets them plant together, and grows the light. Sending the seed first can also work.” | Explicit whole-solution request with both notes available as specified in v3 core bank. For early direct help use §7's unconditional authored direct branch instead of inventing a note gate. |
| `CT.JO.ENDING` | F | Jo: “Your backpack made it all the way to the hill. We made this little story together.” | Completed full premiere, not merely successful rehearsal. |
| `CT.REMY.ENDING` | F | Remy: “Every tiny boat got a starring role.” | Established authored post-premiere reaction; playful line retained for all five arrangements, not a literal tile-use recap/claim every tile ran. |
| `CT.ARI.ENDING` | F | Ari: “Ready for another showing whenever you are, Captain.” | Post-premiere reaction; actual Show still checks current arrangement. |
| `CT.NPC.UNSUPPORTED` | F | “I don’t have anything to add from that.” | All three, unsupported evidence combination; follow with available topic controls, not a new fact or correction. |

Quotation marks in the Speaker column delimit the spoken line. The content string is the words inside them; the speaker label is rendered separately. v3 E2.c and E5.b are reused directly for Remy's initial cancellation claim and Ari's filming account, not rewritten in this table.

### 5.2 Topic controls and short supporting replies

| Content ID | Origin | Exact text | Binding/condition |
|---|---|---|---|
| `CT.TALK.TOPICS` | N | What would you like to ask? | Local conversation heading after greeting. |
| `CT.TALK.ROLE` | N | What’s my job? | Jo → CT.GOAL.ASSIGNMENT then Open Jo’s crew brief. No automatic brief exposure. |
| `CT.TALK.LOOP` | N | What happened to Loop? | Jo → BORROW before return; after return actual dock status. Ari → actual progress + account option. |
| `CT.TALK.CANCELED` | N | Is the premiere canceled? | Jo/Remy topic under knowledge matrix below. Ari can answer from firsthand event knowledge. |
| `CT.TALK.CLIP` | N | What did your recording show? | Remy → CT.REMY.CLIP. |
| `CT.TALK.REQUEST` | N | Can I see your filming request? | Ari → CT.SRC.E4, her own source. |
| `CT.TALK.FILMING` | N | Why did you record here? | Ari → CT.SRC.E5.B with origin Media; historical wording not current resource guidance. |
| `CT.TALK.WAIT` | N | Why were you waiting here? | Ari → CT.ARI.WAIT. |
| `CT.TALK.SLATE` | N | Can I see the capture slate? | Ari → CT.SRC.E5.A, actual source origin. |
| `CT.TALK.JO_NOTE` | N | Can I see your story note? | Jo → CT.SRC.E6. |
| `CT.TALK.REMY_NOTE` | N | Can I see your model note? | Remy → CT.SRC.E7. |
| `CT.TALK.NOTES` | N | Where are the makers’ notes? | Ari → CT.ARI.NOTES; does not claim authorship. |
| `CT.TALK.MATERIALS` | N | Can I take the story kit? | Ari → present/moved-kit variant. No permission gate; physical collection remains freely available. |
| `CT.TALK.PLAN` | N | Show my plan | Opens addressed review; no implicit AI. |
| `CT.TALK.HELP` | C | Help me think | Explicit coaching flow, §7. |
| `CT.TALK.DIRECT` | C | Show me a way | Immediate authored help, §7; no required text. |
| `CT.TALK.AFTER` | N | About the premiere | Post-completion payoff in NPC's own room, optional. |
| `CT.REMY.GREETING` | N | Remy: “I’ve got the crew post and my model note here.” | Default talk; does not display either body. |
| `CT.ARI.NOTES` | N | Ari: “Jo’s and Remy’s notes are in the clips here. There are copies in the story kit too.” | Always after arrival; clip/caddy facts, not note bodies. |
| `CT.ARI.KIT_READY` | N | Ari: “The story kit is ready to take. Both notes go with it.” | Caddy still in Media. |
| `CT.ARI.KIT_GONE` | N | Ari: “You took the story kit. The mounted notes are still here if you want them.” | Caddy collected; no claim of reading or later seating. |
| `CT.ARI.FOLLOWING` | F | Ari: “Loop is ready to go with you.” | Loop currently following in Media. |
| `CT.ARI.DEPARTED` | F | Ari: “You took Loop with you. The slate records where I finished the flower shot.” | Loop departed and is currently absent from Media; no firsthand claim of remote docking. |
| `CT.ARI.FILMING_AFTER` | F | Ari: “The wind kept folding the petals outside. I brought Loop here and finished the flower.” | Exact first two sentences of E5.b, delivered when discussing the past move after Loop or kit has left its ready-to-take position. Only this delivered span is exposed; no false current pickup invitation. |
| `CT.ARI.NO_LOOP_FIRST_LINE` | N | Ari: “The flower recording is finished. What would you like to ask?” | Current valid greeting if invitation was skipped and Loop no longer standby; no phantom robot. |
| `CT.JO.PLAN_REPLY` | C | Jo: “Let’s see what your plan makes happen.” | Arbitrary delivered plan without explicit coaching; acknowledges experiment, not correctness or comprehension. |
| `CT.NPC.PLAN_REPLY` | N | “That’s your idea. You can try it or look at your details again.” | Remy/Ari arbitrary delivered idea; no inferred semantic diagnosis. |
| `CT.NPC.DETAILS` | N | “You’re showing me these details.” | Generic acknowledgment of exact selected source snippets rendered below; adds no unstated fact. |
| `CT.NPC.SCOPE` | N | “That part says the outdoor rehearsal was canceled.” | Only E3.a known/supplied; does not quote status line. |
| `CT.NPC.STATUS` | N | “That part says the opening premiere is still planned and the flower shot will finish indoors.” | Only E3.b supplied; no new named room or completed capture. |
| `CT.JO.NOTICE_FULL` | F | Jo: “That notice cancels the outdoor rehearsal. It says our premiere is still planned.” | Both relevant E3 passages supplied. |
| `CT.REMY.POST_PAST` | N | Remy: “That was my first guess. The full notice changed it.” | Remy already received both E3 parts; opening/showing old E2.c cannot reset correction. Does not claim player changed their mind. |
| `CT.NPC.PHOTO` | N | “Only ‘CANCELED’ is visible in that photograph.” | Jo/Remy acknowledging E2.b, no E3 hidden wording. |
| `CT.NPC.FRAME` | N | “That frame shows what was in view at that moment.” | Jo response to displayed E2 frame; selected frame text stays alongside, no destination. |
| `CT.REMY.REQUEST` | N | Remy: “That’s Ari’s filming plan. My recording doesn’t show whether it was finished.” | E4 actually supplied; no completion inferred. |
| `CT.NPC.SLATE` | N | “Ari’s slate says the flower animation was captured in Media.” | E5.a exact capture sentence supplied; historical, not current robot location. |
| `CT.NPC.ACCOUNT` | N | “That’s Ari’s account of finishing the recording.” | Full E5.b supplied; if only a shorter excerpt, use generic details acknowledgment. |
| `CT.NPC.OBSERVATION` | N | “You saw Loop in Media during your visit.” | Actual E5.c location observation supplied, not an unverified child hypothesis. |
| `CT.ARI.EVENT` | N | Ari: “I canceled the outdoor rehearsal because the wind kept folding the petals. The premiere was still planned.” | Explicit cancellation question or E2/E3 presentation to Ari; firsthand account, newly delivered facts recorded separately from E3 reading. |

### 5.3 Dialogue selection and combinations

Topic selection determines the branch; a repeat does not silently replay the entire introduction. Default Jo supplies recoverable role if not established, otherwise applicable dock acknowledgment/borrowing status plus topics. Remy uses his greeting; Ari uses eligible invitation or current-progress greeting. Character names are always visible as speaker labels.

| Actual input to local NPC | Jo | Remy | Ari |
|---|---|---|---|
| Ask cancellation, no E3 supplied | CT.JO.CANCEL_UNKNOWN | Reuse CT.SRC.E2.C as Remy's account, explicitly labeled his interpretation | CT.ARI.EVENT |
| E3.a only known/supplied | CT.NPC.SCOPE | CT.NPC.SCOPE; no full-correction flag | CT.ARI.EVENT from firsthand knowledge |
| E3.b only known/supplied | CT.NPC.STATUS | CT.NPC.STATUS; no full-correction flag | CT.ARI.EVENT |
| Both E3.a/b supplied, now or earlier | CT.JO.NOTICE_FULL | CT.REMY.CORRECT; repeat still factual, no extra credit | CT.ARI.EVENT |
| E2.c interpretation | Cancellation branch using actual received E3 knowledge | Original E2.c if uncorrected; CT.REMY.POST_PAST if corrected | CT.ARI.EVENT |
| E2.b photo only | CT.NPC.PHOTO | CT.NPC.PHOTO | CT.ARI.EVENT, an explicitly delivered own account, not photo extraction |
| E2 frame/clip detail | CT.NPC.FRAME + actual selected detail | CT.REMY.CLIP, clearly his own witnessed limit | CT.SRC.E5.B as own account when discussing the move; records that actual account exposure |
| E4 request | CT.JO.BORROW while applicable; after return CT.NPC.DETAILS with actual request | CT.REMY.REQUEST | CT.SRC.E5.B, own account distinguishes execution from earlier request |
| E5.a capture sentence | CT.NPC.SLATE | CT.NPC.SLATE | CT.SRC.E5.B or CT.NPC.DETAILS if this account already delivered and no new topic requested |
| E5.b full account | CT.NPC.ACCOUNT | CT.NPC.ACCOUNT | CT.NPC.DETAILS |
| E5.c actual location observation | CT.NPC.OBSERVATION; current dock status can separately appear if true | CT.NPC.OBSERVATION | Applicable current-progress line; never says robot remains here after departure |
| E1 / E6 / E7 / E8; subset of E4/E5 insufficient for above line | CT.NPC.DETAILS + actual selected text | Same | Same |
| Private draft never delivered | No reply and no knowledge change | Same | Same |
| Delivered arbitrary explanation, no help request | CT.JO.PLAN_REPLY | CT.NPC.PLAN_REPLY | CT.NPC.PLAN_REPLY |
| Unsupported/irrelevant mixture with no supported specific branch | CT.NPC.UNSUPPORTED | Same | Same |

For two selected sources: use a specific reply only if its stated facts are actually in the selected or previously supplied knowledge; other selected detail remains visibly quoted, without inventing a combined inference. Priority is the explicit selected topic, then E3 scope/status if applicable, then E2 discussion, then E4/E5, then generic acknowledgment. An unexplained pairing never produces “You connected these correctly.” If text conflicts with selected facts, the unrequested authored reply stays neutral; only explicit coaching may interpret the sentence. Speaker-owned source requests open exact source text; they do not pretend that the player walked to a different copy.

Where the table or filming topic calls for Ari's E5.b account, use the full CT.SRC.E5.B as a current spoken invitation only while Loop is standby and the caddy remains ready in Media. After either moves, use CT.ARI.FILMING_AFTER plus the applicable current Loop/kit status. A previously acquired full account can still be reopened as the unchanged historical account, labeled with its original Media context. A newly delivered shortened account exposes and makes available only those two sentences, not the entire unspoken original; it cannot be expanded by invoking E5.b's internal ID. This is a content variant for the existing progress-dependent Ari behavior, not a rewritten source.

Remy's full correction and Jo's full notice line require both scope and status; merely flattening the board does not supply either to them. Showing only a known subsection retains subsection limits. Ari's firsthand response may introduce her account on direct conversation, but no NPC name/topic or remote recipient list leaks her location before discovery. Copies and repeated accounts remain the same author/evidence origin, not independent corroboration.

## 6. Materials, rail, playback and the paper story

**Family:** controls and physical-result/status captions. Labels identify real actions, not their solution. Kit inspection/first-note access uses the current host and actual approach. Captions announce only committed actions and current states. Changed-order and run-status messages do not erase sources, recorded ideas, help history or historical premiere completion.

### 6.1 Caddy and portable notes

| Content ID | Origin | Exact text | Condition/result |
|---|---|---|---|
| `CT.KIT.OPEN` | F | Open story-tile rack | Closed Media caddy. |
| `CT.KIT.COLLECT` | F | Collect story tiles | Closed/open Media caddy; includes whole kit and both leaflets, no reading prerequisites. |
| `CT.KIT.TITLE` | C | Story kit | Open/carried/seated kit title. |
| `CT.KIT.CONTENTS` | N | Four story tiles and copies of Jo’s and Remy’s notes. | Physical open/owned kit inventory; no note contents or reading claim. |
| `CT.KIT.HAVE` | F | You have the story tiles | Repeated collection result; opens current legitimate kit access. |
| `CT.KIT.CARRIED` | C | You have the story kit. | Collected/carried state; after seating use seated status for current host. |
| `CT.KIT.OPEN_CURRENT` | C | Open your kit | Only if carried; if seated elsewhere offer Go to Stage and acquired evidence. |
| `CT.KIT.HANDOFF` | F | Set the story kit on the desk | Stage, kit carried; actual ST.RACK.BAY handoff. |
| `CT.KIT.SEATED` | F | The story tiles are on the rehearsal desk. | Actual seat commit. |
| `CT.KIT.EMPTY_BAY` | F | Story-tile rack — empty | Uncollected/not seated Stage rack. |
| `CT.KIT.NOTE_JO` | F | Read Jo’s note in the kit | KIT.NOTE.E6: open caddy, in-hand or actual seated-rack approach. |
| `CT.KIT.NOTE_REMY` | F | Read Remy’s note in the kit | KIT.NOTE.E7 same. No badge calling it read/understood. |
| `CT.KIT.VACANT` | N | The story kit has been collected. Jo’s and Remy’s mounted notes are still here. | Empty Media recess; caddy owner known. |
| `CT.KIT.AT_STAGE` | N | Your story kit is on the Stage rehearsal desk. | Seated-kit access from elsewhere; Go to Stage, plus already acquired source reinspection. |
| `CT.KIT.OWNER_RETURN` | N | Returned to the story kit. | Focus fallback after a moved originating tile/leaflet; announce only if changed owner would otherwise be unclear. If no kit control survives, use current Move to control and CT.ACCESS.RETURN_OBJECTS. |

Tile labels are **One Boat / Joined Boats / Hill / Flower**, mapped respectively to TILE.FERRY/BRIDGE/PLANT/BLOOM. Storage reading order is Flower, One Boat, Hill, Joined Boats, matching 05's unnumbered 2×2 caddy. It does not display a sample solution. Exact descriptions are CT.SRC.E8.*; opening the kit only displays faces/names until inspection reveals a description. A tile on the rail is absent from its rack cell; its current location label is derived from the actual owner, not a duplicate tile button.

### 6.2 Tile editing controls and feedback

| Content ID | Origin | Exact text | Operation/condition |
|---|---|---|---|
| `CT.RAIL.ARRANGE` | F | Arrange story tiles | Physical rail approach, with carried-kit handoff first. |
| `CT.RAIL.ARRANGE_MODE` | C | Arrange tiles | Compact presentation mode; pauses active playback without edit. |
| `CT.RAIL.WATCH` | C | Watch rehearsal | Same workstation, rehearsal/idle mode; opening alone does not start. |
| `CT.RAIL.WATCH_SHOW` | N | Watch premiere | Same workstation with retained show mode. |
| `CT.RAIL.TITLE` | C | Your arrangement | The actual committed order. |
| `CT.RAIL.HELP` | N | Choose a tile, then choose where to put it. You can also drag tiles. | Non-drag instructions; no recommended tile/order. |
| `CT.RAIL.SELECT` | N | Select {tile} | Existing rack/rail tile. |
| `CT.RAIL.CHOOSE` | C | Choose where to put {tile}. | Pending selection, not committed placement. |
| `CT.RAIL.DESTINATIONS` | N | Choose a place | Open named destination list. |
| `CT.RAIL.AT_START` | N | Place at the start | Valid start gap; no placeholder answer slots. |
| `CT.RAIL.BEFORE` | C | Insert before {neighbor} | Rack tile → valid gap. |
| `CT.RAIL.AFTER` | C | Insert after {neighbor} | Rack tile → valid gap. |
| `CT.RAIL.REPLACE` | C | Replace {other} | Rack tile → occupied rail tile; displaced one returns to rack. |
| `CT.RAIL.SWAP` | C | Swap with {other} | Rail tile → another occupied rail tile. |
| `CT.RAIL.MOVE_BEFORE` | N | Move before {neighbor} | Rail tile → gap after removing its original position. |
| `CT.RAIL.MOVE_AFTER` | N | Move after {neighbor} | Same, after named tile. |
| `CT.RAIL.MOVE_START` | N | Move to the start | Existing rail tile; no duplicate. |
| `CT.RAIL.LEFT` | F | Move left | Adjacent swap; unavailable at first position. |
| `CT.RAIL.RIGHT` | F | Move right | Adjacent swap; unavailable at last position. |
| `CT.RAIL.RETURN` | C | Return {tile} to rack | Rail tile → own storage cell. |
| `CT.RAIL.CANCEL` | C | Cancel selection | Returns held representation to committed origin; no edit. |
| `CT.RAIL.PLACED` | N | {tile} is now in position {position}. | Committed insert/move. For empty rail: One Boat is now in position 1. |
| `CT.RAIL.REPLACED` | N | {tile} replaced {other}. {other} returned to the rack. | Actual replacement; e.g. Joined Boats replaced One Boat. One Boat returned to the rack. |
| `CT.RAIL.SWAPPED` | N | {tile} is now in position {position}. {other} is now in position {otherPosition}. | Actual swap, both final locations. |
| `CT.RAIL.RETURNED` | N | {tile} returned to the rack. | Committed removal. |
| `CT.RAIL.CANCELED` | N | Selection canceled. Your arrangement is unchanged. | No committed edit; paused run/certification retained. |
| `CT.RAIL.INVALID` | N | That isn’t a place for this tile. Your arrangement is unchanged. | Invalid drop; restore original owner/focus. No grade. |
| `CT.RAIL.SAME` | N | {tile} is already in that position. | No-op final order; retain certification. |
| `CT.RAIL.START_LIMIT` | C | This tile is already at the start. | Move left at first position. |
| `CT.RAIL.END_LIMIT` | C | This tile is already at the end. | Move right at final position. |
| `CT.RAIL.POSITION` | N | {tile}, position {position} | Accessible rail tile name; position from current order. |
| `CT.RAIL.IN_RACK` | N | {tile}, in the rack | Accessible rack tile name; no answer suggestion. |
| `CT.RAIL.CHANGED` | F | Your arrangement changed. Rehearse this version. | Actual edit only, appended once after physical editing feedback. Current puppet state resets; no old Continue. |

A selected rack tile has Inspect and valid insertion/replacement destinations; a selected rail tile has Inspect, move, swap, return and cancel. Do not show a fifth insertion gap on a full rail or an action with a nonexistent neighbor. With no valid insertion (all unique tiles already placed), only actions for existing tiles appear; there is no “collect more tiles” message. Changing selection or opening a source does not silently commit the drop. Full rail order remains readable in the child's actual sequence.

### 6.3 Workstation readiness, run and reset copy

| Content ID | Origin | Exact text | Condition/meaning |
|---|---|---|---|
| `CT.WORK.MISSING_KIT` | F | Collect the story tiles for this rail. | Missing kit after considering handoff. No note requirement. |
| `CT.WORK.MISSING_LOOP` | F | Bring Loop to the dock to project the story. | Missing docked Loop; tile editing still allowed if kit seated. |
| `CT.WORK.EMPTY` | F | There are no story tiles on the rail yet | Empty Rehearse attempt, initial puppets if docked; no certification. |
| `CT.WORK.READY` | C | Ready to rehearse. | Nonempty available order, both resources delivered, idle. |
| `CT.WORK.CERTIFIED` | C | This arrangement is ready for the premiere. | Full current rehearsal completed successfully, including trailing harmless cue. |
| `CT.WORK.PREVIEW` | F | Preview | Show pad before first docking. |
| `CT.WORK.PREVIEW_RESULT` | F | Loop isn’t in the dock yet. | Actual Preview response, blank projection; no repair task. |
| `CT.WORK.REHEARSE` | F | Rehearse | Start fresh rehearsal, not resume. |
| `CT.WORK.LAUNCH` | F | Launch | Same Show pad after docking, first premiere; qualification checked. |
| `CT.WORK.REPLAY` | F | Replay premiere | Same Show pad after historical completion; current qualification still required. |
| `CT.WORK.CHECK` | F | Try this arrangement in rehearsal first. | Missing current certification; missing physical resources reported first if any. |
| `CT.WORK.MORE` | C | More actions | Secondary reset/clear menu, not extra case progress. |
| `CT.WORK.RESET` | F | Reset rehearsal | Restore initial puppets and idle run, retain order, clear current certification. |
| `CT.WORK.RESET_DESCRIPTION` | C | Keep your tiles in order. | Description associated with Reset rehearsal. |
| `CT.WORK.RESET_RESULT` | F | Story reset. Your tiles stay on the rail. | Actual reset; not erased investigation or past premiere. |
| `CT.WORK.CLEAR` | F | Clear rail | Reset puppets/run/certification and return every rail tile. |
| `CT.WORK.CLEAR_DESCRIPTION` | C | Return the tiles to the rack. | Description associated with Clear rail. |
| `CT.WORK.CLEAR_RESULT` | F | Tiles returned to the rack. | Actual clear. Canceling More before choosing it does nothing. |
| `CT.RUN.TITLE` | C | {mode} | Retained actual playback mode. |
| `CT.RUN.STOP` | F | Stop | Immediate owned playback control, no approach delay. |
| `CT.RUN.BUSY` | C | Stop this run first. | Rehearse/Show attempted while starting/running. |
| `CT.RUN.PAUSED` | C | {mode} paused. | Stable boundary, correct retained mode. |
| `CT.RUN.NEXT` | N | Next tile: {nextTile} | Actual next unfinished cue; hidden at terminal. No suggested new tile. |
| `CT.RUN.CURRENT` | N | Playing {tile} | Actual active cue, not proposed next action. |
| `CT.RUN.CONTINUE` | C | Continue {modeLower} | Saved unchanged run, next unfinished cue. |
| `CT.RUN.RESTART` | C | Restart {modeLower} | Explicit fresh same-order run in retained mode. A show restart still needs current certification. |
| `CT.RUN.TERMINAL` | C | {mode} paused after its last cue. | Final cue committed, full-run finalization pending. |
| `CT.RUN.FINALIZE` | C | Continue to finish {modeLower} | Finalize once, no replay of last cue. |
| `CT.RUN.FINISHED` | C | Rehearsal finished. | Ended unsuccessful run; append factual current story, not a grade. Successful run uses CERTIFIED. |
| `CT.RUN.HELP_OFFER` | C | Want help with this plan? | Small dismissible offer after two unsuccessful runs, or eligible explicit unmet-state offer; no automatic answer. |
| `CT.RUN.OPEN` | C | Open workstation | Actual approach on return to Stage; elsewhere Go to Stage first. |
| `CT.RUN.RESUME_NOTE` | N | Your {modeLower} is paused. Open the workstation when you’re ready. | Valid return in Stage; no autoplay. |
| `CT.RUN.AWAY_NOTE` | N | Your {modeLower} is paused at the Stage. | Valid run while elsewhere; offer Go to Stage, not remote operation. |

Before acting on Reset/Clear/Start/Continue, cancel any uncommitted tile selection. Merely reading or opening Arrange/More pauses an active cue but retains unchanged certification/run. Actual edits/reset remove eligibility; historical completion persists. Messages name the final state after interruption settling, never claim that a pending cue already ran. No custom browser-close dialog is implied.

### 6.4 Factual cue captions

These are consequence descriptions, not hints. Source text, optional explanations and requested support stay separate. On a cue endpoint announce its caption once. On interruption settle once and append the mode's paused message; do not replay a full caption twice. Reduced motion presents the same result and words. Harmless no-op cues continue normally; only unmet Hill/Flower holds.

| Content ID | Origin | Exact caption | Actual cue/result |
|---|---|---|---|
| `CT.CUE.FERRY` | F | The seed crossed. Pip is still on the other bank. | FERRY from initial left seed/Pip → seed right, Pip left. |
| `CT.CUE.FERRY_EMPTY` | F | No loose seed on this bank. | FERRY when seed already right/planted; boat bobs, no penalty/pause. |
| `CT.CUE.BRIDGE_CARRY` | N | The boats join. Pip carries the seed across to Grandma. | BRIDGE with Pip and loose seed left. |
| `CT.CUE.BRIDGE_REUNITE` | N | The boats join. Pip crosses to Grandma and the seed. | BRIDGE after seed delivered right. |
| `CT.CUE.BRIDGE_SAME` | N | The boats stay joined. Pip is already with Grandma. | Read-only/restored already-right condition; no reverse crossing or new seed. |
| `CT.CUE.HILL_MISSING_PIP` | F | Grandma has the seed. Pip is still across the river. | PLANT with seed right/Pip left; pause unmet. |
| `CT.CUE.HILL_BOTH_LEFT` | N | Grandma is waiting on the hill. Pip and the seed are still across the river. | PLANT with both left; pause unmet, neither plants itself. |
| `CT.CUE.PLANTED` | N | Pip and Grandma plant the seed together. Roots spread into the hill’s soil. | Successful PLANT; actual visible relationship, not attribution to prior comprehension. |
| `CT.CUE.TENDING` | N | Pip and Grandma tend the planted seed. | Already planted, if legitimately applicable; not a repeated planting mutation. |
| `CT.CUE.UNPLANTED` | F | The seed is still unplanted. | BLOOM before planting; actual seed remains dark, pause unmet. |
| `CT.CUE.FLOWER` | N | The lantern-flower opens and lights both banks. | Successful BLOOM with planted seed. |
| `CT.CUE.ALREADY_LIT` | N | The lantern-flower keeps glowing. | Already lit settled state; no new milestone. |

The current game uses unique tiles; rows for already-applied effects retain the already-specified harmless behavior, not permission to duplicate tiles or add new actions. A seed-left/Pip-right combination is unreachable under the frozen rules and uses state validation/recovery rather than a newly invented playable branch.

### 6.5 Current-story descriptions and entity names

**Describe story now** opens a read-only view after settling/pausing. Compose the current description in this order: scene/banks → Pip/backpack → Grandma → seed → boats/bridge → roots/light. Choose exactly one applicable entry per changing subject. No contradictory alternatives appear together; if state cannot be trusted, use recovery instead of inventing a description.

| Content ID | Origin | Exact text | Condition |
|---|---|---|---|
| `CT.STORY.OPEN` | F | Describe story now | ACC.STORY.STATE, no tile action. |
| `CT.STORY.TITLE` | C | Story now | Read-only heading. |
| `CT.STORY.ENLARGE` | N | Enlarge the whole story | Both-bank view, not a crop hiding a consequence. |
| `CT.STORY.BANKS` | N | The river separates the starting bank on the left from Grandma’s hill on the right. The old footbridge is broken. | Any projected setup with docked Loop. Same location facts as scene. |
| `CT.STORY.PIP_LEFT` | N | Pip is on the left bank, wearing the backpack you made. | Pip left. |
| `CT.STORY.PIP_RIGHT` | N | Pip is on Grandma’s hill, wearing the backpack you made. | Pip right. |
| `CT.STORY.GRANDMA_WAIT` | N | Grandma waits on the hill across the river. | Pip left, seed left. |
| `CT.STORY.GRANDMA_SEED` | N | Grandma holds the seed on the hill. | Seed delivered right, unplanted, Pip left. |
| `CT.STORY.TOGETHER` | N | Pip and Grandma are together on the hill. | Pip right; seed state described separately. |
| `CT.STORY.SEED_LEFT` | N | The loose seed is on the left bank. It is dark. | Seed left/unplanted. |
| `CT.STORY.SEED_RIGHT` | N | The seed is on the hill with Grandma. It is still loose and dark. | Seed right/unplanted, including Pip reunited. |
| `CT.STORY.ROOTED` | N | They planted the seed together. Its roots are in the hill’s soil. | Successful PLANT actually committed. |
| `CT.STORY.BOATS_SEPARATE` | N | The little boats are separate. | No BRIDGE. |
| `CT.STORY.BOATS_JOINED` | N | The joined boats stretch across the river. | BRIDGE committed. |
| `CT.STORY.DARK` | N | The lantern-flower has not lit up. | Planted/unlit. With unplanted seed, its seed entry already says dark; do not invent a flower above loose seed. |
| `CT.STORY.LIT` | N | The lantern-flower shines above the hill and lights both banks. | Planted/lit. |

Accessible projected-entity names are literal **Starting bank / River / Grandma’s hill / Broken footbridge / Pip / Pip’s backpack / Grandma / Seed / Little boats / Lantern-flower**, mapped in that order to PUP.LEFT_BANK/RIVER/HILL/BROKEN_BRIDGE/PIP/BACKPACK/GRANDMA/SEED/BOATS/FLOWER. Their descriptions reuse the applicable CT.STORY.* fragments; absent flower is described via seed state, not an invisible manipulable object. No PUP entity appears in Move to or receives drag/drop commands. MODEL.* stays the opening model group, with CT.OBJ.MODEL_RESULT and initial left/right relationships only; it does not inherit solved projection text.

## 7. Coaching and authored assistance

**Family:** exact authored response selected under the established coaching contract; child sees Help, the submitted text if any, and the response. The model's allowed move/interpretation tags are not rendered. v3's runtime model role remains selecting bounded authored help from the explanation. The words below are the canonical rendered bank, not a new general generated-character-chat feature. Equivalent child wording must be recognized; illustrative paraphrases are semantic review cases, not extra executable response fields.

Ordinary source-specific help requires the relevant displayed passages/components, not mere source acquisition. Actual observed puppet outcomes can support feedback without fabricated note references. Explicit direct help is the established exception. Merely opening Help, waiting, receiving a hidden result, or using accessibility support does not expose a solution. Record the actual words supplied and their support level when displayed.

### 7.1 Lifecycle controls and messages

| Content ID | Origin | Exact text | Condition/meaning |
|---|---|---|---|
| `CT.HELP.TITLE` | C | Help | Entry/live-selected authored response heading. |
| `CT.HELP.FIELD` | N | What are you thinking? You can leave this blank. | Optional explanation field; no prefilled answer or automatic focus. |
| `CT.HELP.THINK` | F | Help me think | With text, explicit request; without text, topic/attention help. |
| `CT.HELP.DIRECT` | F | Show me a way | Immediate authored current answer; cancels pending/held response opportunity. |
| `CT.HELP.TOPIC` | C | Which part do you want help with? | No text or unclear context; use available lead question labels from §4 or Your story plan. |
| `CT.HELP.PENDING` | C | Getting help… | Submitted snapshot accepted; game remains usable. |
| `CT.HELP.WAITING` | C | Still working on your question. | Proposed two-second indicator, not service guarantee. |
| `CT.HELP.OFFER` | C | You can use a prepared hint while you wait. | Proposed eight-second offer while request still pending; no hint content yet. |
| `CT.HELP.UNAVAILABLE` | N | Help couldn’t get a reply. You can use a prepared hint or try again. | Service unavailable, timeout resolved as failure, or invalid reply; no error code/model details. |
| `CT.HELP.USE_PREPARED` | C | Use a prepared hint | Acceptance owns sole current response; discard late live result. |
| `CT.HELP.PREPARED` | C | Prepared hint | Authored local fallback/attention help label; not represented as live interpretation. |
| `CT.HELP.RETRY` | C | Retry help | Explicit new request, fresh current context. |
| `CT.HELP.CANCEL` | C | Cancel request | Cancel display opportunity; keep draft. |
| `CT.HELP.CANCELED` | C | Request canceled. Your idea is kept. | Actual cancel; closed pending view alone is not cancel. |
| `CT.HELP.READY` | C | Help is ready | Closed panel, valid held response; no spoiler text or focus theft. |
| `CT.HELP.AVAILABLE` | C | Help available | Closed panel, fallback offer only; no automatic hint display. |
| `CT.HELP.VIEW_NEW` | C | View new reply | Live reply arrives while focused fallback offer remains; do not replace the button under focus. |
| `CT.HELP.AGAIN` | C | Ask again | New explicit snapshot, not automatic resubmission. |
| `CT.HELP.STALE` | C | Your plan or situation changed. Ask again about this version. | Relevant context changed; obsolete content never inserted. Closed panel quietly removes old marker. |
| `CT.HELP.THIS_VERSION` | C | Ask about this version | Return entry/request from current context and current draft. |
| `CT.HELP.EARLIER` | C | Earlier help | Previously displayed answer whose context differs; not current advice. |
| `CT.HELP.SUBMITTED` | N | What you asked | Actual submitted snapshot, separate from continuing editable draft. |
| `CT.HELP.NEW_DRAFT` | N | Your current draft | Draft revised since submission; never overwritten by response. |
| `CT.HELP.NO_RESUME` | N | Your draft is here. Ask again when you’re ready. | Reload with acknowledged draft and no resubmitted request. |
| `CT.HELP.CLARIFY_PIP` | N | Pip | Explicit clarification choice, not interpretation inferred silently. |
| `CT.HELP.CLARIFY_SEED` | N | The seed | Same. |
| `CT.HELP.CLARIFY_TILE` | N | A story tile | Same; then actual selected/typed tile detail, not a guessed tile. |

Keep playing / Return to room / Close use §3. No response is announced merely because it arrived behind a closed panel. On deliberate open, recheck context before displaying. If fallback/direct answer wins, suppress any later result and duplicate ready marker. A newly shown source, delivered assistance, changed room, theory, arrangement or puppet state invalidates advice dependent on the old context. Editing text leaves the new draft intact. Empty requests use topic/attention copy, not a confident analysis of words never supplied; omit the What you asked block when there was no submitted text and show the selected topic instead.

### 7.2 Frozen coaching-move bank

Levels below describe help supplied, not ability: 0 access, 1 attention/neutral coaching, 2 source-specific direction, 3 stated relationship, 4 actionable answer. These are author-only observation labels. Record actual facts/references, including when an accepting response repeats rather than introduces a relationship. No numerical level is shown to the child.

| Content ID | Existing move; exact response | Eligibility / permitted reference | Support |
|---|---|---|---|
| `CT.HINT.NOTICE_CONTEXT` | NOTICE_CONTEXT: “How much of the notice can you see?” | Actual E2.b photo or physical curled word displayed, full E3 not exposed; child expresses broad cancellation or explicitly chooses that topic. No hidden E3 quote. | F; 1; attention to displayed partialness. |
| `CT.HINT.NOTICE_SCOPE` | NOTICE_SCOPE: “Which activity does the full notice say was canceled?” | Relevant E3.a/b displayed; scope claim in supplied explanation. | F; 2; references exposed notice passages. |
| `CT.HINT.CLIP_LIMIT` | CLIP_LIMIT: “Where does Remy’s recording stop?” | Relevant later frames/end marker or complete E2.a description actually exposed, or Remy's actual limit account with that provenance; never first still alone. | F; 2; refer only to available origin of stopping-point information. |
| `CT.HINT.POSITIVE_SUPPORT` | POSITIVE_SUPPORT: “What evidence points to Media itself?” | Child proposes Media by eliminating another place; no automatic confirmation. Use displayed E4 or NAV.MEDIA only if available. | F; 1, or 2 when an actual known reference is attached. |
| `CT.HINT.TESTABLE_LEAD` | TESTABLE_LEAD: “Those details make Media a reasonable place to check.” | Explanation actually connects exposed requirements and public venue conditions. If Media already reached, don't label this as a future independent prediction; current help may instead address remaining task. | F; 3; suitability, not occupancy. |
| `CT.HINT.PLAN_VS_RESULT` | PLAN_VS_RESULT: “Does this request describe a plan or something already completed?” | E4 displayed; explanation claims request proves finished recording. No hidden E5 answer. | F; 2; E4. |
| `CT.HINT.FULL_PROMISE` | FULL_PROMISE: “What did Pip promise Grandma he would do?” | E6.a displayed; seed-only completion claim actually supplied. | F; 2; E6.a. |
| `CT.HINT.BOAT_CAPACITY` | BOAT_CAPACITY: “What does Remy say a single boat can carry?” | E7.a displayed; child says one boat carries Pip. | F; 2; E7.a. |
| `CT.HINT.TOGETHER` | TOGETHER: “Who promised to plant it with Grandma?” | Actual unmet planting and E6.a displayed; explanation omits Pip's participation. | F; 2; E6.a + actual Pip position. |
| `CT.HINT.ROOT_CONDITION` | ROOT_CONDITION: “What condition does Remy give for the glow?” | E7.c displayed; explanation treats loose seed as ready to glow. | F; 2; E7.c/current planted state. |
| `CT.HINT.VALID_DIRECT` | VALID_DIRECT: “Your plan brings Pip and the seed together for planting.” | Child actually states coherent arrival/capacity connection supported by displayed notes or observed outcomes. No fabricated note references if learned through rehearsal. | F; 3; acknowledges/states expressed relationship, not a mastery verdict. |
| `CT.HINT.VALID_EXTRA` | VALID_EXTRA: “That also brings Pip and the seed together on the hill.” | Coherent seed-ahead or harmless-extra plan, with actual meaning expressed and support from displayed facts/outcomes. | F; 3; no shortest-plan preference. |
| `CT.HINT.ARRANGEMENT_ONLY` | ARRANGEMENT_ONLY: “That arrangement is ready to rehearse.” | Bare order, no expressed reasoning, and physical readiness actually satisfied. If resources absent, use corresponding missing-resource operational copy; don't falsely promise playback. | F; 1 operational coaching; no comprehension finding. |
| `CT.HINT.CLARIFY` | CLARIFY: “Do you mean Pip, the seed, or one of the story tiles?” | Ambiguous pronoun/entity in story explanation; no diagnosed mistake until clarified. | F; 1; no new clue. |
| `CT.HINT.NARROW_CLAIM` | NARROW_CLAIM: “You’ve separated what the notice answers from what you still need to check.” | Child explicitly distinguishes event scope from unresolved search; E3 relevant text displayed. | F; 1; exact expressed limitation, not fabricated revision. |
| `CT.HINT.UNKNOWN_DETAIL` | UNKNOWN_DETAIL: “Our sources don’t show that detail. We can leave it unknown.” | Asks genuinely unrecorded fact such as precise route decision; not used to hide an available authored fact. | F; 1; no new history. |
| `CT.HINT.RETURN_TO_CASE` | RETURN_TO_CASE: “I can help with the clues or your rehearsal plan. Which part are you working on?” | Unrelated topic/instruction override; no state mutation. | F; 1; bounded redirection. |

The exact first-response bank is preserved. Eligibility refinements apply 06's component exposure and physical readiness rules to v3's broader “seen/ready” wording; they do not rewrite clues. User explanation examples such as “Grandma needs Pip too; the little boat just takes the seed” can express the same connection as more formal wording. Misspellings, pronouns that are clear in context, and absence of quoted source titles do not invalidate the meaning.

### 7.3 Authored attention, progression and direct help

The local fallback never pretends to have interpreted arbitrary text reliably. With an explicitly selected topic and a concrete observed situation, use the matching attention/source line below. If the meaning is unresolved, use CLARIFY or the neutral topic question. Do not match a misconception merely from a word such as “boat.” Exact source-specific lines require actual exposure. Repeated explicit Help me think may move from an already shown attention prompt to an eligible source prompt/relationship; no automatic escalation from inactivity or travel. Level 4 remains explicit Show me a way.

| Content ID | Origin | Exact response | Condition/introduced information |
|---|---|---|---|
| `CT.HINT.SEARCH_ATTENTION` | N | What could help you decide where to look? You can inspect something nearby or ask the crew. | Level 1; unknown/unselected search explanation, no hidden location. |
| `CT.HINT.STORY_ATTENTION` | N | Look at Pip, Grandma, and the seed. What has your arrangement made happen? | Level 1; projected outcome visible; no assertion of a specific error. |
| `CT.HINT.STORY_UNTRIED` | N | You can inspect a tile, look at the makers’ notes, or try an arrangement. | Level 1; kit/notes physically accessible; missing playback resources still explained. No tile order. |
| `CT.HINT.PROMISE_ATTENTION` | F | What is still different from Pip’s promise? | Level 1; promise exposed and current result available. |
| `CT.HINT.PROMISE_SOURCE` | F | Read the part where Pip tells Grandma what he will do. | Level 2; E6.a actually exposed, link to that exact passage. |
| `CT.HINT.PROMISE_RELATION` | F | The seed arrived, but Pip promised to arrive and plant with Grandma too. | Level 3; actual seed right/Pip left and E6.a exposed; adds relationship. |
| `CT.HINT.NOTE_ACCESS` | N | You can open the makers’ notes to see what they say. | Level 1 attention to legitimately available physical/owned note controls; not an invented remote E6/E7 entry. |
| `CT.HINT.SEARCH_CLARIFY` | N | Are you asking about the notice, the recording, or where to look? | Level 1; only when both notice and recording are already known topics. Otherwise use CT.HELP.TOPIC with only the known question choices. |
| `CT.DIRECT.SEARCH` | F | Check Media through the Workshop passage. Ari is there with Loop and the finished flower animation. | Level 4, explicit request, Loop still standby in Media. Introduces destination/occupancy/finished animation, not E3 or every E5 component as read. |
| `CT.DIRECT.KIT` | N | Loop is at the Stage dock. Collect the story kit in Media, then set it on the rehearsal desk. | Level 4, Loop docked and kit uncollected. Actual resource guidance, not unread note content. |
| `CT.DIRECT.FOLLOW_KIT` | N | Loop is following you. Collect the story kit in Media, then bring them back to the Stage. | Level 4, following Loop, kit uncollected. |
| `CT.DIRECT.DELIVER_BOTH` | N | Bring Loop and the story kit to the Stage. Dock Loop and set the kit on the rehearsal desk. | Level 4, following Loop and carried kit; no remote auto-handoff. |
| `CT.DIRECT.DELIVER_LOOP` | N | Bring Loop to the Stage and dock it. Your story kit is already on the desk. | Level 4, kit seated/Loop following. |
| `CT.DIRECT.DELIVER_KIT` | N | Set your story kit on the Stage rehearsal desk. Loop is ready at the dock. | Level 4, Loop docked/kit carried. |
| `CT.DIRECT.RAIL` | F | Use Joined Boats before Hill, then Flower. Your One Boat step can stay if you want. | Level 4, explicit story-arrangement answer; works before notes read. Introduces ordering/valid optional Ferry; does not place tiles or mark E6/E7 read. |
| `CT.DIRECT.LAUNCH` | N | This arrangement finished rehearsal successfully. Use Launch to show it on the Stage. | Explicit goal help, current certification, no historical premiere yet; physical approach still required. |
| `CT.DIRECT.REPLAY` | N | You can replay the premiere, or change the tiles and rehearse a new arrangement. | Explicit post-completion goal help; changed order still needs rehearsal. |

Direct selection priority: if explicit current topic is story arrangement, CT.DIRECT.RAIL may answer even before delivery, followed only by the actual missing-resource status; otherwise actual unresolved resource state selects SEARCH/KIT/FOLLOW_KIT/DELIVER variants, then current certification selects LAUNCH or REPLAY, then RAIL. If kit is seated but Loop remains standby, SEARCH gives the actual location and its slate-era animation fact; append CT.GOAL.LOOP, not instructions to recollect the kit. A paused run can be continued through existing run controls; direct help does not silently restart it.

No new complete solution is written for a nonexistent puzzle. Accepting explicit NPC crossing/relationship help records the actual level/facts supplied by CT.JO.SEED_HELP/CT.REMY.CROSS_HELP. Requesting a source is ordinary source access; merely visiting the NPC is not answer assistance. Access enlargement/definitions remain level 0.

**Semantic review examples, not child defaults or guaranteed live performance:** “the little boat only takes the seed; Pip needs to go too” can express capacity plus goal; “seed first, then he crosses and they plant” is a coherent seed-ahead plan when context resolves “he”; “it goes there” needs clarification. The live model still selects an eligible authored move. If future technical work proposes generated paraphrases, that is a separate documented change; any candidate would have to preserve the same conditions, certainty and references. This catalog does not quietly add it.

## 8. Saving, settings, interruption and recovery

**Family:** practical UI/control/error text, no story inference or learning claims. Use actual acknowledgment/state before making a durability claim. Current-session play remains possible when saving fails. New game is the only whole-case reset; sound/reading preferences remain. Browser controls are outside game navigation and may close the page without a delivered final event.

### 8.1 Exact settings and save copy

| Content ID | Origin | Exact text | Condition/meaning |
|---|---|---|---|
| `CT.PAUSE.TITLE` | C | Paused | Menu heading; mode's paused line follows if applicable. |
| `CT.PAUSE.HOME` | C | Back to start | Retain current live visit; no false loss confirmation. |
| `CT.SETTINGS.SOUND` | C | Sound | Choices On / Off, exact labels. |
| `CT.SETTINGS.MOTION` | C | Motion | Choices Standard / Reduced. |
| `CT.SETTINGS.TEXT` | C | Text size | Choices Regular / Larger / Largest (06 100/125/150% planning scale; no child technical percentages required). |
| `CT.SETTINGS.SPACING` | C | Text spacing | Choices Standard / Roomier. |
| `CT.SETTINGS.CONTROLS` | C | Controls | Shows §10.1 exact instructions. No advertised voice/read-aloud feature. |
| `CT.SETTINGS.APPLIED` | N | Your settings are in use. | Current-session change; durable saving separately acknowledged. Not repeated on every focus movement. |
| `CT.SETTINGS.UNSAVED` | N | Your settings work for this visit, but couldn’t be saved on this device. | Actual preference-save failure; do not falsely claim game progress failed if only preference storage failed. |
| `CT.SAVE.PENDING` | C | Saving… | Pending latest progress revision; passive, not every-keystroke announcement. |
| `CT.SAVE.SAVED` | C | Saved on this device. | Latest corresponding progress/draft acknowledgment, not merely queued save. |
| `CT.SAVE.FAILED` | C | Progress can’t be saved on this device. | Actual durable saving unavailable. |
| `CT.SAVE.DETAIL` | N | You can keep playing during this visit. If you close or reload the page, progress that hasn’t been saved may be lost. | Details after actual failure, not a generic alarming warning on every action. |
| `CT.SAVE.RETRY` | C | Try saving again | Save latest current state; failure retains session. |
| `CT.SAVE.PENDING_DETAIL` | N | Your latest changes are still being saved. | Menu details while pending; Back to start still retains live state. |
| `CT.SAVE.OLD_MAY_RETURN` | N | This new game couldn’t be saved. An older saved game may return when you reopen the page. | Confirmed New game accepted but durable replacement failed. |
| `CT.SAVE.RETURNED` | N | Your saved progress is ready to continue. | Valid resume summary; not unsaved changes or uncommitted frame guarantee. |

### 8.2 Exact recovery and confirmation copy

| Content ID | Origin | Exact text | Condition/action |
|---|---|---|---|
| `CT.RECOVERY.READ` | C | Saved progress couldn’t be checked. | Startup read error or proposed 5-second unresolved UI budget; not an empty-save verdict. |
| `CT.RECOVERY.RETRY` | C | Retry | Recheck, no overwrite. |
| `CT.RECOVERY.SESSION` | C | Play without saving | Fresh session-only case, preserve unknown old record. |
| `CT.RECOVERY.SESSION_DETAIL` | N | Start a visit without replacing any saved game already on this device. | Description for session-only choice after unknown-read failure. |
| `CT.RECOVERY.VERSION` | C | This saved game can’t be continued with this version. | Incompatible content/save; no silent migration. |
| `CT.RECOVERY.DAMAGED` | C | This saved game couldn’t be opened. | Invalid/untrustworthy case save. |
| `CT.RECOVERY.NEW` | C | Start a new game | Recovery link opens confirmation; does not itself accept it. |
| `CT.RECOVERY.REPLACE_UNKNOWN` | C | Saving this visit may replace progress already on this device. | Earlier saved record still unknown, current child explicitly retries saving. |
| `CT.RECOVERY.REPLACE_KNOWN` | N | Saving this visit will replace the older saved game on this device. | Older record confirmed. |
| `CT.RECOVERY.KEEP_UNSAVED` | C | Keep this visit unsaved | Cancel replacement, retain session. |
| `CT.RECOVERY.REPLACE` | C | Replace saved game | Deliberate latest-state replacement, no duplicate activation. |
| `CT.RECOVERY.RUN` | C | This playback couldn’t be continued. | Independently valid physical/investigation state, invalid playback. Do not mark show completed. |
| `CT.RECOVERY.REHEARSE` | C | Rehearse this arrangement | Only valid current order and Stage physical approach; otherwise Go to Stage travels first. |
| `CT.RECOVERY.UNCERTAIN_CUE` | N | The story is paused at its last saved step. Continue will play the next unfinished tile. | Hard reload with last stable boundary/possibly exposed active cue; no “you haven’t seen this” claim. |
| `CT.RECOVERY.ACTION` | N | Choose the action again when you’re ready. | Canceled pre-commit walk/physical action after recovery; pair with actual surviving action label. No auto-delivery. |
| `CT.RESET.QUESTION` | C | Start a new game? | Whole-case confirmation heading. |
| `CT.RESET.SCOPE` | C | This clears this case’s discoveries, ideas, story kit, rehearsals and premiere progress. Your sound and reading settings stay. | Explicit reset scope; physical Loop/notice/kit reset with case. |
| `CT.RESET.KEEP_PLAYING` | C | Keep playing | Safe initial focus when active visit exists. |
| `CT.RESET.KEEP_SAVED` | C | Keep saved game | Safe choice when Home/recovery caller and no active visit. |
| `CT.RESET.ACCEPT` | C | Start new game | Deliberate acceptance; reset case only. |
| `CT.RETURN.VISIBLE` | N | Welcome back. Your game is paused. | Handled background/foreground interruption; previous task/draft can remain. No autoplay. |
| `CT.RETURN.TILE` | N | Your tile selection was canceled. Your saved arrangement is here. | Compatible reload discarded held tile; only committed acknowledged order restored. If save failed, restore available record without claiming current unsaved arrangement. |
| `CT.RETURN.DRAFT` | N | Your saved draft is here. | Acknowledged draft actually recovered; absent uncommitted text is not reconstructed. |
| `CT.RETURN.OWNER` | N | That item has moved. Its current place is shown here. | Valid changed source-access owner resolved; current kit/rack action follows. No lost/duplicated inventory. |

Incompatible/damaged save has Retry where 06 permits it, Back and Start a new game; confirmation acceptance is separate. If only playback is unusable, retain independently validated case progress and offer actual travel/approach. If physical/order state cannot be trusted, use damaged-save recovery instead of writing a reassuring partial-success message.

On controlled pause/leave, captions use the settled committed object/run result. On hard reload, committed boundary and possible exposure uncertainty are retained; if a last cue was committed, CT.RUN.TERMINAL/FINALIZE applies. In-progress requests and delivery intents are not resubmitted. Caddy and note focus uses current owner; no ghost object receives focus. Reopening the browser reads the last acknowledged save, not a promised final close-time write. No custom browser-close confirmation is specified.

## 9. Optional humor, ending and recap

**Family:** optional gag/captions or factual historical completion. Toast introduces no clue, tile, reward or learning credit. Ending requires the full launched arrangement to finish successfully; a rehearsal or paused-at-end show is insufficient. Completion commits before decoration. Aftermath is an editorial sequence using Remy/Ari's own rooms, not new remote NPC communication.

| Content ID | Origin | Exact content | Condition/action |
|---|---|---|---|
| `CT.TOAST.TITLE` | F | Maximum Toast | Covered/revealed Workshop kiosk. |
| `CT.TOAST.START` | F | Start Maximum Toast demo | Actual kiosk approach; optional. |
| `CT.TOAST.SKIP` | C | Skip demo | Immediate active-demo control; settle revealed pose. |
| `CT.TOAST.LOOK` | F | Look through the magnifier | Only revealed; enlarge toast, no evidence. |
| `CT.TOAST.REPLAY` | F | Replay demo | Brief flourish, not full new reward. |
| `CT.TOAST.PUNCHLINE` | F | One toast. Maximum effort. | Revealed final pose; repeat does not affect case. |
| `CT.TOAST.COVERED` | N | The covered Maximum Toast machine trembles gently in its own bay. | Workshop current scenery description; no hidden contents revealed yet. |
| `CT.TOAST.ARMS` | N | The machine’s arms rise. Lights flash as the lid opens. | First reveal stage; reduced motion omits flashes and presents settled equivalent, no sound dependence. |
| `CT.TOAST.TRAY` | N | A huge tray slides out with one tiny piece of toast. | Actual second reveal stage; not in initial accessible name. |
| `CT.TOAST.MAGNIFIER` | N | A magnifier lowers over the tiny toast. The machine holds a proud pose. | Third/final reveal; also settled reduced-motion description. |
| `CT.TOAST.ENLARGED` | N | One tiny piece of toast, enlarged through the magnifier. | Magnifier view. No recipe or hidden quest. |
| `CT.TOAST.FLOURISH` | N | The arms and lid make a little flourish around the same tiny toast. | Replay, then same revealed state. |
| `CT.ENDING.TITLE` | N | The premiere | Completed-show heading. |
| `CT.ENDING.LIGHT` | N | The lantern-flower lights the Stage. Pip’s backpack is there on the hill with Grandma. | Actual completed Stage result, all five valid arrangements. |
| `CT.ENDING.SKIP` | C | Skip celebration | Completion already committed, skip decoration only. |
| `CT.ENDING.CONTINUE` | C | Continue | Advance completed celebration to aftermath, no cue/rehearsal confusion. |
| `CT.ENDING.AFTER` | F | After the premiere | Remy then Ari reaction montage in their own room settings. |
| `CT.ENDING.NEXT` | C | Next reaction | Advance after readable line; not timed away. |
| `CT.ENDING.SKIP_REACTIONS` | C | Skip reactions | Go to recap; later View crew reactions remains available. |
| `CT.ENDING.RECAP` | N | Your premiere | Recap heading. |
| `CT.ENDING.FACT` | F | You brought Loop back and premiered The Little Bridge. | Historical show completion only; sole summary if no recorded reasoning. |
| `CT.ENDING.RETURN` | C | Return to Stage | First ending already on Stage; preserve state. Reopened elsewhere uses Return to room. |
| `CT.ENDING.REOPEN` | C | View premiere recap | Goal/Menu after historical completion; in-place, no teleport/replay. |
| `CT.ENDING.REACTIONS` | C | View crew reactions | Recap owned child; returns to recap. |
| `CT.ENDING.GO_REPLAY` | C | Go to Stage to replay | Recap elsewhere, travel only; child explicitly operates Show there. |
| `CT.RECAP.PLAN` | C | Your plan | Actual recorded sentence and actual details, if any. Not a mastery claim. |
| `CT.RECAP.CHANGED` | C | Your idea changed | Actual two recorded versions with changed text, not inferred from travel or E3 view. |
| `CT.RECAP.BEFORE` | N | Earlier: {earlierText} | Exact earlier recorded words, not a fictional wrong answer. |
| `CT.RECAP.AFTER` | N | Later: {laterText} | Exact later recorded words. |
| `CT.RECAP.DETAILS` | N | Details you selected | Actual referenced passages only; reference choice alone not reasoning. |
| `CT.RECAP.AFTER_RUN` | N | Your idea after rehearsal | Actual recorded explanation follows known relevant rehearsal outcome. Does not claim it came from two texts. |
| `CT.RECAP.HINT_THEN_PLAN` | C | You used a hint, then tried this plan | Only actual hint display → recorded plan → attempted matching arrangement in that order. No implication that the hint caused learning. |
| `CT.RECAP.RECORDED_IDEA` | N | Your recorded idea | Neutral when timing/outcome exposure is uncertain or no trial followed the plan. |

Recap selection: always CT.ENDING.FACT; optionally show actual recorded plan/idea, with actual revisions/details if they exist. If a relevant hint preceded the record and a trial followed it, use CT.RECAP.HINT_THEN_PLAN; otherwise use the neutral record heading. A known outcome before a record permits CT.RECAP.AFTER_RUN. If an outcome might have been exposed during interrupted animation or history is incomplete due to saving failure, use CT.RECAP.RECORDED_IDEA; never label unaided prediction. Source display or presentation without an authored revision adds no changed-mind panel. A private unsaved draft is not promoted to a completed recorded reflection.

No-explanation route shows no deficit message, empty reasoning slots, score, or “you learned” statement. A text-only revision can show actual before/after words without the term evidence-based. Viewing E3 without an earlier claim cannot generate “You corrected your mistake.” Correct-first and Media-first play receive the same payoff. A harmless extra Ferry does not change praise, eligibility, or reward. Subsequent rail edits/clear preserve the historical recap while removing current eligibility as required. Replay never adds an invented learning result.

## 10. Accessibility, reading scope and exposure contracts

### 10.1 Exact access instructions and names

**Family:** access support, not answer support. Same source/scene facts and operations as pointer presentation. Instructions are recoverable through Controls/Goal; no required tutorial form, sound, hover, fast response, or simultaneous input. Headings receive focus first, followed by the family's meaningful content/actions in 06's specified order.

| Content ID | Origin | Exact wording | Binding/announcement |
|---|---|---|---|
| `CT.ACCESS.MOVEMENT` | N | Click or tap the floor to walk. Choose an object to walk over and use it. You can also use Move to…. | Opening/Controls; does not force pointer use. |
| `CT.ACCESS.KEYBOARD` | N | When the room has focus, use the arrow keys or W, A, S and D to move. Use Tab to reach named controls, then Enter or Space to use one. | Controls. World Interact instruction below is input-label agnostic until actual input binding is defined; no invented key. |
| `CT.ACCESS.INTERACT` | N | Interact uses the nearby object named on screen. If targets overlap, choose one from the list. | Existing world Interact action; named native controls remain complete route. |
| `CT.ACCESS.TYPING` | N | While you’re typing or using these controls, movement keys won’t move your character. | Controls and field-associated help on request; not repeated on every keystroke. |
| `CT.ACCESS.BACK` | N | Escape closes the current view. In the room, Escape opens Menu. You can always use the visible Back, Close or Return to room control. | Controls. Workstation selected-tile exception below. |
| `CT.ACCESS.SELECTION` | N | Escape cancels a tile selection first. Press it again to return to the room. | Arrange help. |
| `CT.ACCESS.COMPACT` | N | The whole room is shown here. Use Move to… to choose an object or exit. | Compact/large-text overview; no forced rotation. |
| `CT.ACCESS.WORK` | N | Arrange tiles and Watch use the same story. Switching views pauses playback; use Continue when you want it to run again. | Compact workstation, conditional Continue if a valid paused run exists; otherwise Rehearse. |
| `CT.ACCESS.SOURCE` | N | You can scroll, enlarge the source, or open a word’s definition. Close returns to where you opened it. | Reader help; only the five defined words have definition actions. |
| `CT.ACCESS.FRAMES` | N | Use Previous frame, Next frame, or a frame button. You don’t have to drag the recording control. | E2 clip; no frame content embedded. |
| `CT.ACCESS.WORLD_FOCUS` | N | Room controls | Accessible world-input region name; room name and actual description follow. |
| `CT.ACCESS.RETURN_OBJECTS` | N | Returned to Move to…. | Surviving-owner fallback when original control no longer exists. No automatically restarted walk. |
| `CT.ACCESS.DETAIL_SELECTED` | N | Detail selected from {sourceTitle}. | Actual deliberate selection; no correctness announcement. |
| `CT.ACCESS.TAB_SELECTED` | N | {action} selected. | Named currently selected Notes/presentation mode tab only; actions restricted to Evidence, Compare, Timeline, My ideas, Arrange tiles, Watch rehearsal, Watch premiere. Not all CT labels. |

Reading sequence by family: Home heading/valid choices; world heading/current description/object actions/exits; reader title/author/time/current body/actions; compare first detail/second detail/optional relationship/optional idea/actions; conversation speaker/current line/topics/Show/close; plan status/context/optional selected details/field/actions; kit current owner/tiles/leaflets/actions; workstation mode/actual story/current cue/Stop/order/edit controls/other actions; Help heading/submitted words/current response or offer/optional draft/actions; recovery heading/reason/safe cancel/deliberate action. 06 controls the actual focus targets; the catalog supplies those names and words. No inaccessible duplicate hidden text is added to force a reading event.

**Movement target dictionary:** `{target}` uses these nouns, not a whole action label: ACT.JO/REMY/ARI → Jo/Remy/Ari; ACT.LOOP/FOLLOW.PAD → Loop; ST.MODEL/TAB → the paper model; ST.SOURCE.E1 → the crew brief; ST.SOURCE.E6 → Jo’s note drawer; ST.SOURCE.E4 → the filming request; ST.ACCESS.E2/CY.ACCESS.E2 → the crew post; CY.SOURCE.E3 → the curled notice before flattening, the courtyard notice afterward; CY.SOURCE.E7 → Remy’s model note; ST.DOCK group → Loop’s dock; MD.SOURCE.E5 → the capture slate; MD.SOURCE.E6/E7 → Jo’s mounted note/Remy’s mounted note; MD.ACCESS.E8/KIT.CADDY → the story kit at its current host; ST.RACK.BAY → the story-kit space; ST.RAIL/ST.CONSOLE/controls → the rehearsal desk; WK.ACCESS.NAV/WAYFINDING → the venue-information sign; WK.TOAST group → Maximum Toast; each exit → its public destination room. Portable KIT.NOTE actions in hand need no walking caption; first seated access targets the story kit. Known names are not used as remote discovery hints.

Announce one combined settled action/caption/pause message per interruption, not every animation frame. Current-story description is deliberately requested and stays readable. On repeated source inspection, title/body remains available without automatically announcing its full text. Frame changes announce only the selected frame equivalent and end marker if applicable; definition announcements give only the selected defined word. Reduced motion skips decoration but conveys the same committed state and source facts. Sound Off does not remove required captions.

### 10.2 Simpler-reading scope decision

**No additional rewritten source variants or simplified-reading mode are included in this case's current scope.** Items 05–06 define text size, spacing, enlargement, captions, component-wise clip access, complete source text and five vocabulary definitions; they do not define an alternate-text toggle. All are fully bound here. This satisfies the checklist requirement to decide which variants are actually included without silently adding an interface feature.

All main sources therefore have one frozen body and the same passage identities across physical copies and access modes. Shorter control labels and factual visual descriptions are not substitute versions of E1–E8. Decisive timing, negation, “I think,” “If,” “outdoor rehearsal,” “still planned,” “together,” “cannot,” “only,” and the hill-soil condition remain intact. No read-aloud, recording, pronunciation assessment or language-selection feature is advertised. Later usability evidence may justify a separately documented, meaning-checked variant; it is not an unresolved content slot in this catalog.

### 10.3 Exposure and assistance matrix

| Actual event | Recordable information | Not implied |
|---|---|---|
| Enter room/read current scene description | Only actual visible occupants/conditions; Media entry can expose Loop's location | Slate text, all creator notes, prior independent inference. |
| Open legitimate E2 post | Package available; actual first frame and displayed message portions | Other frames, photo, end marker, whole recording watched. |
| Play/step E2 or request full description | Displayed frames/end, or exact full description when selected | Beyond-door destination, theft, E3 scope, child understood. |
| Inspect partial photo/curled notice | Visible word and missing context | Concealed full notice. |
| Flatten E3 / inspect its reading | Physical flat flag; actual exposed passages | NPC received it or player corrected a claim. |
| Acquire/reopen portable E6/E7 | Actual canonical passage exposure at real host/available reader | New independent author/source or note reading merely from pickup. |
| Present selected evidence | Actual delivered references and recipient knowledge | Explanation unless actual child text conveyed; two-source integration merely from selecting two. |
| Record private/crew idea | Actual words/refs/context/time; intended record type | Delivery to Jo, model interpretation, current truth, durable save before acknowledgment. |
| Observe/settle cue | Actual resulting paper-world state, including on controlled interruption | Reading the notes, unaided prediction afterward. |
| Interrupted visual without reliable commit/history | Possibly exposed outcome; uncertain ordering | Proof child did not see outcome. |
| Access enlargement/definition/named actions | Access support, actual information displayed | Answer assistance penalty or independent decoding evidence. |
| Display ordinary help | Exact authored move, references/introduced relationship/level | Unshown source content or accuracy guarantee for model interpretation. |
| Display explicit direct answer | Actual introduced route/solution facts, level 4 | Whole unread source body acquired/read or tiles placed. |
| Hidden/canceled/stale help result | No delivered assistance from unseen text | Response read, late duplicate permitted, draft replaced. |
| Complete premiere | Actual full-show completion, current/historical distinction | Reading score, mastery, cancellation correction, learning gain. |

The authoring catalog itself is not player exposure. Referencing CT.SRC.E7 internally does not mean the child received E7. Internal interpretation tags and uncertainty can support later evaluation, but are never child-facing judgments. No experimental performance percentage or education outcome is inferred from this document.

## 11. Complete interface-state content crosswalk

Every declared 06 state is listed once below. This table binds content; it does not redefine the state machine. Common Back/Close/Return/Menu controls, actual source metadata and orthogonal save/help statuses are inherited from §§1–10 rather than copied into every row. A repeated physical-state family uses only its applicable variant, not all alternatives at once. Conditions and exact words are in the cited entries; 06 retains input, approach and return behavior.

| Existing interface state | Canonical content to render | Variant/boundary |
|---|---|---|
| `UI.HOME.CHECKING` | CT.START.TITLE, CT.START.CASE, CT.START.CHECK, CT.UI.SETTINGS | No guessed Start/Continue result. |
| `UI.HOME.EMPTY` | CT.START.TITLE, CT.START.CASE, CT.START.START, CT.UI.SETTINGS | Confirmed no run. |
| `UI.HOME.SAVED` | CT.START.CONTINUE, CT.START.LOCATION or CT.START.VISIT, CT.START.OVER, CT.UI.SETTINGS; CT.RUN.PAUSED if applicable | Current session wins over older durable record. |
| `UI.WORLD.IDLE` | Current CT.SCENE entry/suffixes; current CT.GOAL entry; applicable CT.OBJ action and world toolbar | No new status merely from idling. |
| `UI.WORLD.MOVING` | CT.WORLD.GOING, CT.WORLD.STOP | Floor-only walk needs no invented noun caption. |
| `UI.WORLD.OPERATING` | Applicable CT.OBJ/KIT action result from §§3.3/6.1 | Source body only at its readable commit. |
| `UI.WORLD.CHOOSER` | CT.WORLD.CHOOSE, actual overlapping action labels, CT.UI.CANCEL | Border of ST.BOARD offers request and post, no silent choice. |
| `UI.WORLD.BLOCKED` | CT.WORLD.BLOCKED or CT.WORLD.UNREACHABLE | Actual cause, recoverable latest status. |
| `UI.GUIDE.OPENING` | CT.GOAL.ASSIGNMENT, CT.GUIDE.TAB then CT.GUIDE.PREVIEW, CT.UI.DISMISS, CT.ACCESS.MOVEMENT | Only relevant stage suggestion; exits always usable. |
| `UI.GOAL` | CT.GOAL.ASSIGNMENT, actual physical goal, CT.GOAL.QUESTION if set, CT.UI.LATEST; CT.ENDING.REOPEN after completion | Recover goal without introduction replay. |
| `UI.NAV.OBJECTS` | CT.UI.MOVE, CT.WORLD.LOCAL_LIST, actual §3.3/§6/§9 local actions and exits | No PUP movement or remote occupant leak. |
| `UI.NAV.MAP` | CT.UI.MAP, CT.WORLD.HERE, CT.NAV.ST/CY/WK/MEDIA on expansion, CT.WORLD.GO | Public description distinct from current room description. |
| `UI.NOTES.EMPTY` | CT.NOTES.EMPTY, Notes tab labels, CT.KIT.OPEN_CURRENT only if carried | No hidden clue title placeholders. |
| `UI.NOTES.LIST` | Notes tabs, acquired CT.TITLE/source components, CT.NOTES.OPEN_SOURCE, CT.NOTES.LOCATION | No spoiler summaries or whole E5 unlocked from slate. |
| `UI.SOURCE.TEXT` | Applicable §2 source body/passage/title/provenance, CT.SOURCE.DETAIL, CT.SOURCE.ENLARGE | Legitimate available body; exposure of actual displayed spans. |
| `UI.SOURCE.POST` | CT.TITLE.E2, CT.MEDIA.FRAME1 on first access, CT.SRC.E2.C, CT.MEDIA.RECORDING/PHOTO/MESSAGE | Reopening retains actual last component; no full description at initial landing. |
| `UI.SOURCE.CLIP` | Selected CT.MEDIA.FRAME1/2/3, CT.MEDIA.END only at end, CT.CLIP controls and CT.META.RECORDED | Full CT.SRC.E2.A only after Describe recording. |
| `UI.SOURCE.PHOTO` | CT.SRC.E2.B, CT.MEDIA.PARTIAL, CT.CLIP.ENLARGE_PHOTO | Never full E3 or physical Flatten. |
| `UI.SOURCE.ZOOM` | Exact current source/component; CT.UI.BACK, CT.ACCESS.SOURCE | Intentional reuse; no new source text from enlargement. |
| `UI.SOURCE.WORD` | Actual selected word + its CT.WORD entry, CT.SOURCE.DEFINITION_CLOSE | Exactly five vocabulary bindings. |
| `UI.SOURCE.PICK` | CT.SOURCE.CHOOSE, acquired title/passage options, CT.SOURCE.VENUE, CT.SOURCE.OPEN_VENUE, CT.SOURCE.USE/NONE, CT.UI.CANCEL | Empty uses CT.SOURCE.NO_AVAILABLE; NAV.MEDIA selectable after public description display. |
| `UI.COMPARE.EMPTY` | CT.COMPARE.INSTRUCTION/FIRST/SECOND, CT.SOURCE.ADD, CT.IDEA.FIELD/SAVE | Optional relationship/text; no form lock. |
| `UI.COMPARE.PARTIAL` | Same base + one actual detail, CT.SOURCE.CHANGE/REMOVE | Empty remaining slot does not quote another source. |
| `UI.COMPARE.READY` | Both actual details, CT.COMPARE.RELATION/SUPPORTS/CONFLICTS/BEFORE/RELATION_HELP/CLEAR_RELATION, CT.IDEA.SAVE | Child-selected relation, not system verdict. |
| `UI.TIMELINE.EMPTY` | CT.TIMELINE.EMPTY, CT.TIMELINE.EVENT/DISCOVERY | No fabricated history. |
| `UI.TIMELINE.KNOWN` | §4.1 applicable timeline labels + actual metadata/source title, CT.NOTES.OPEN_SOURCE | Intentions distinct from completed events. |
| `UI.IDEA.DRAFT` | CT.IDEA.FIELD/PRIVATE/SAVE, CT.UI.ADD_IDEA or CT.UI.NOTHING or CT.UI.LIMIT_RECORD only on applicable attempt | Never auto-focus or fill answer. |
| `UI.IDEA.RECORDED` | CT.IDEA.RECORDED/CURRENT/EDIT, actual text/details; CT.IDEA.EARLIER if actual revision | Save status separately acknowledged. |
| `UI.LEAD` | CT.LEAD.CHOOSE/CANCELED/MOVED/WHERE/PROMISE/DESTINATION/FOLLOW | Authored questions, not asserted facts; Go separate. |
| `UI.TALK.TOPICS` | CT.TALK.TOPICS, eligible greeting and topic labels §5.2 | Actual local approach; appropriate speaker. |
| `UI.TALK.REPLY` | Exact selected §5 line or own §2 source; CT.TALK topics / CT.PRESENT.OPEN | Knowledge matrix/fallback; no automatic model request. |
| `UI.PRESENT.SELECT` | CT.PRESENT.WHO/HERE/MET/CHOOSE/SELECTED, actual available details | No recipient knowledge change yet. |
| `UI.PRESENT.REVIEW` | CT.PRESENT.REVIEW, actual details/child words, CT.PRESENT.SHOW or GO, CT.UI.EDIT/CANCEL | Remote travel only; no offscreen reply. |
| `UI.PRESENT.APPROACH` | CT.PRESENT.GOING, CT.UI.CANCEL; DONE only at delivery | New intent/cancel uses CT.PRESENT.CANCELED only before commit. |
| `UI.PLAN.PRIVATE` | CT.PLAN.SEARCH or STORY, CT.IDEA.PRIVATE/FIELD, CT.PLAN.RECORD/EXPLAIN | Private, no Jo knowledge. |
| `UI.PLAN.RECORDED` | CT.PLAN.RECORDED or DELIVERED, actual text/context; CT.IDEA.PAST_PLAN if stale arrangement | Recorded crew tool does not manufacture NPC reply. |
| `UI.PLAN.ADDRESSED` | CT.PLAN.EXPLAIN, CT.PRESENT.REVIEW/SHOW or GO, actual words/refs | Local approach before delivery; optional no two-source requirement. |
| `UI.KIT.CLOSED` | CT.KIT.OPEN/COLLECT | Both actions available without reading. |
| `UI.KIT.OPEN` | CT.KIT.TITLE/CONTENTS/COLLECT; actual tile names/Inspect; CT.KIT.NOTE_JO/REMY | Bodies only on deliberate inspection. |
| `UI.KIT.CARRIED` | CT.KIT.CARRIED, CT.KIT.CONTENTS, note/tile controls, CT.WORLD.GO with Stage | Only local Stage handoff, no remote rail. |
| `UI.KIT.HANDOFF` | CT.KIT.HANDOFF, CT.KIT.SEATED at seat commit | No doorway auto-seat; cancel uses actual owner. |
| `UI.KIT.SEATED` | CT.KIT.SEATED, CT.RAIL.ARRANGE, tile/note controls at actual host | Elsewhere CT.KIT.AT_STAGE + travel/acquired sources. |
| `UI.KIT.VACANT` | CT.KIT.VACANT; OPEN_CURRENT if carried, AT_STAGE if seated | Fixed Media notes stay accessible. |
| `UI.SOURCE.TILE` | Actual tile name + corresponding CT.SRC.E8 entry, CT.UI.BACK | No puppet solution demo. |
| `UI.WORK.NEEDS_KIT` | CT.KIT.EMPTY_BAY, CT.WORK.MISSING_KIT; MISSING_LOOP if both absent | Preview or Launch follows docking, no source gate. |
| `UI.WORK.NEEDS_LOOP` | CT.WORK.MISSING_LOOP, editable order and kit, CT.WORK.PREVIEW | Missing projection does not forbid planning. |
| `UI.WORK.EMPTY` | CT.WORK.EMPTY when attempted, CT.RAIL.HELP, kit/rail controls | No numbered answer template or recipe. |
| `UI.WORK.READY` | CT.WORK.READY, CT.WORK.REHEARSE/LAUNCH, CT.RAIL.ARRANGE | Both physical resources, current nonempty order. |
| `UI.WORK.CERTIFIED` | CT.WORK.CERTIFIED, LAUNCH or REPLAY | Only full current successful rehearsal. |
| `UI.WORK.SHOW_CHECK` | Missing resource messages first, otherwise CT.WORK.CHECK, CT.WORK.REHEARSE | Same Show pad; no comprehension/AI requirement. |
| `UI.WORK.MORE` | CT.WORK.MORE/RESET/RESET_DESCRIPTION/CLEAR/CLEAR_DESCRIPTION, CT.UI.CANCEL | Opening pauses, choosing actual reset clears eligibility, cancel does not. |
| `UI.RAIL.SELECTED` | CT.RAIL.CHOOSE/DESTINATIONS/CANCEL, applicable Inspect/move/swap/return | Only valid actions for current owner. |
| `UI.RAIL.DESTINATIONS` | Applicable CT.RAIL gap/replace/swap/move/return labels | Result uses exact operation caption, not generic success. |
| `UI.RUN.STARTING` | CT.RUN.TITLE, initial story description, CT.RUN.STOP | Starting duplicate ignored; no extra success caption. |
| `UI.RUN.REHEARSAL` | CT.RUN.TITLE/CURRENT/STOP, actual CT.CUE caption, CT.STORY.OPEN | Successful/no-op cues continue normally. |
| `UI.RUN.SHOW` | Same run/cue families in Premiere mode | Full successful finalization required before ending. |
| `UI.RUN.UNMET` | Actual Hill/Flower CT.CUE, CT.RUN.CONTINUE/RESTART, notes/help/Arrange | No automatic hint or lost tile. |
| `UI.RUN.PAUSED` | CT.RUN.PAUSED/NEXT/CONTINUE/RESTART | Next unfinished tile only; state already settled. |
| `UI.RUN.TERMINAL` | CT.RUN.TERMINAL/FINALIZE | No next-tile label, no duplicated last cue. |
| `UI.RUN.FAILED` | CT.RUN.FINISHED + actual CT.STORY composition; optional CT.RUN.HELP_OFFER | No grade or diagnosis. |
| `UI.STORY.DESCRIBE` | CT.STORY.TITLE and composition, CT.STORY.ENLARGE | Read-only both-bank state; no recipe. |
| `UI.COACH.ENTRY` | CT.HELP.TITLE/FIELD/THINK/DIRECT, current question/context | Opening not sending; optional text. |
| `UI.COACH.TOPIC` | CT.HELP.TOPIC and known question/story labels | Authored attention, not simulated text analysis. |
| `UI.COACH.PENDING` | CT.HELP.PENDING/SUBMITTED/CANCEL, CT.UI.KEEP | New draft remains separately editable. |
| `UI.COACH.WAITING` | CT.HELP.WAITING/CANCEL, CT.UI.KEEP | Two-second design target, nonblocking. |
| `UI.COACH.FALLBACK_OFFER` | CT.HELP.OFFER or UNAVAILABLE, USE_PREPARED/CANCEL/RETRY as applicable | Closed offers only AVAILABLE; live arrival adds VIEW_NEW, not button replacement. |
| `UI.COACH.READY_CLOSED` | CT.HELP.READY | No response text/announcement until deliberate reopening and recheck. |
| `UI.COACH.RESPONSE` | CT.HELP.SUBMITTED, exact eligible response, PREPARED if local, AGAIN/DIRECT/KEEP | Only actually displayed help counts; no overwrite. |
| `UI.COACH.CLARIFY` | CT.HINT.CLARIFY or CT.HINT.SEARCH_CLARIFY/CT.HELP.TOPIC; clarification choices | Meaning not assumed; explicit resubmission. |
| `UI.COACH.DIRECT` | Appropriate CT.DIRECT response; explicit-request help label | Permitted new facts recorded, no whole-source reading flags. |
| `UI.COACH.STALE` | CT.HELP.STALE/THIS_VERSION, CT.UI.KEEP | Closed panel quietly removes old marker. |
| `UI.COACH.CANCELED` | CT.HELP.CANCELED, current draft/entry controls | Late answer ignored. |
| `UI.PAUSE` | CT.PAUSE.TITLE, CT.UI.FESTIVAL/SETTINGS, CT.PAUSE.HOME, CT.START.OVER, save state | Historical recap action only after completion. |
| `UI.SETTINGS` | All §8.1 setting label/choice families and CT.SETTINGS.CONTROLS | Actual applied state, truthful preference saving. |
| `UI.SAVE.PENDING` | CT.SAVE.PENDING/PENDING_DETAIL | Passive current-revision status. |
| `UI.SAVE.SAVED` | CT.SAVE.SAVED | Acknowledged latest revision only. |
| `UI.SAVE.SESSION` | CT.SAVE.FAILED/DETAIL/RETRY, CT.UI.KEEP | Session stays playable; no false cloud promise. |
| `UI.RECOVERY.READ` | CT.RECOVERY.READ/RETRY/SESSION/SESSION_DETAIL | Unknown durable record preserved. |
| `UI.RECOVERY.VERSION` | CT.RECOVERY.VERSION/NEW, CT.UI.BACK | New choice opens confirmation. |
| `UI.RECOVERY.DAMAGED` | CT.RECOVERY.DAMAGED/RETRY/NEW, CT.UI.BACK | No invented partial progress/success. |
| `UI.RECOVERY.REPLACE` | CT.RECOVERY.REPLACE_UNKNOWN or REPLACE_KNOWN, KEEP_UNSAVED/REPLACE | Actual record conflict only. |
| `UI.RECOVERY.RUN` | CT.RECOVERY.RUN, ROOM or Go to Stage, REHEARSE only at valid Stage approach | No recovery teleport or completion. |
| `UI.RESUME.RUN` | CT.RUN.RESUME_NOTE or AWAY_NOTE, OPEN; CT.RECOVERY.UNCERTAIN_CUE when applicable | Actual retained mode, stable cue, exposure uncertainty. |
| `UI.RESET.CASE` | CT.RESET.QUESTION/SCOPE/KEEP_PLAYING or KEEP_SAVED/ACCEPT | Safe cancel first; only actual acceptance resets case. |
| `UI.RETURN.FOREGROUND` | CT.RETURN.VISIBLE, CT.UI.FESTIVAL; current task/draft and paused-mode controls | No auto-walk, playback or help resubmission. |
| `UI.TOAST.COVERED` | CT.TOAST.TITLE/COVERED/START | Optional, no tiny-toast spoiler before reveal. |
| `UI.TOAST.REVEALING` | Actual CT.TOAST.ARMS/TRAY/MAGNIFIER stages, SKIP | Not all captions pre-announced; leave settles final result. |
| `UI.TOAST.REVEALED` | CT.TOAST.PUNCHLINE/MAGNIFIER/LOOK/REPLAY | No clue/reward/required flag. |
| `UI.TOAST.MAGNIFIER` | CT.TOAST.ENLARGED, CT.UI.CLOSE/ROOM | Return to surviving kiosk magnifier. |
| `UI.TOAST.REPLAY` | CT.TOAST.FLOURISH then PUNCHLINE | Same revealed result, no new case state. |
| `UI.ENDING.CELEBRATION` | CT.ENDING.TITLE/LIGHT, CT.JO.ENDING, SKIP/CONTINUE | Historical completion already committed. |
| `UI.ENDING.AFTERMATH` | CT.ENDING.AFTER, CT.REMY.ENDING then CT.ARI.ENDING, NEXT/SKIP_REACTIONS | Editorial own-room scenes; no NPC relocation. |
| `UI.ENDING.RECAP` | CT.ENDING.RECAP/FACT, actual conditional CT.RECAP entries, RETURN/REPLAY or GO_REPLAY, REACTIONS | Reopened recap uses Back/Return to room and preserves current location/order. |

## 12. Action, transition and access bindings

### 12.1 All named Item 06 transitions

Every named transition identifier in 06 is accounted for below. Compound rows share the indicated exact content and state-specific variant selector; they do not collapse their distinct behavior. Automatic transitions without a new line intentionally reuse the destination's already defined content. Shared close/cancel actions are §§1/3 and never fabricate progress feedback.

| Existing transition(s) | Content binding and actual result |
|---|---|
| `T.HOME.CHECK` | CT.START.CHECK → actual Start/Continue/recovery result, no invented empty slot. |
| `T.HOME.START` | CT.START.START → CT.GOAL.ASSIGNMENT + opening room/guidance. |
| `T.HOME.CONTINUE` | CT.START.CONTINUE/LOCATION/VISIT → current room and actual paused-run/draft status. |
| `T.HOME.SETTINGS`, `T.PAUSE.SETTINGS` | CT.UI.SETTINGS → settings families, same caller retained. |
| `T.HOME.OVER`, `T.RECOVERY.NEW` | CT.START.OVER or CT.RECOVERY.NEW → CT.RESET.QUESTION/SCOPE; no reset yet. |
| `T.WORLD.MOVE`, `T.WORLD.RETARGET` | Actual action label → CT.WORLD.GOING for named target; retarget cancels old uncommitted operation. |
| `T.WORLD.ARRIVE` | Room crossing CT.WORLD.ARRIVED + actual scene; at object, its operating content. No new arbitrary arrival lore. |
| `T.WORLD.COMMIT` | Exact physical result §3.3/§6.1/§9 or actual source heading/body. |
| `T.WORLD.ABORT` | Actual pre/post-commit cue/result remains; fresh intent. CT.PRESENT.CANCELED only if delivery never committed. |
| `T.WORLD.CANCEL` | CT.WORLD.STOP → CT.WORLD.STOPPED. |
| `T.WORLD.CHOOSE` | CT.WORLD.CHOOSE + chosen actual label → movement; Cancel leaves unchanged. |
| `T.WORLD.RETRY` | BLOCKED/UNREACHABLE replaced by new actual movement/status. |
| `T.WORLD.TOOL` | Chosen toolbar label → its heading; applies pause caption if running. |
| `T.GUIDE.MODEL` | CT.OBJ.MODEL_RESULT + CT.JO.MODEL; next suggestion CT.GUIDE.PREVIEW. |
| `T.GUIDE.PREVIEW` | CT.WORK.PREVIEW_RESULT; available crew actions, no prescribed hidden destination. |
| `T.GUIDE.DISMISS` | CT.UI.DISMISS; no extra line or goal loss. |
| `T.GOAL.ACTION` | Current actual goal/action or Map; no automatic hypothesis. |
| `T.NAV.OBJECT` | CT.WORLD.LOCAL_LIST/actual action → legal movement. |
| `T.NAV.DESCRIBE` | Selected CT.NAV entry, public information only. |
| `T.NAV.GO` | CT.WORLD.GO → legal door chain; arrival scene. |
| `T.NOTES.TAB` | CT.NOTES tab labels → corresponding heading/content. |
| `T.NOTES.KIT` | CT.KIT.OPEN_CURRENT or AT_STAGE → legitimate owner/access, never remote unread seated leaflet. |
| `T.NOTES.OPEN`, `T.TIMELINE.SOURCE` | CT.NOTES.OPEN_SOURCE → actual acquired component/title/body. |
| `T.SOURCE.SELECT` | CT.SOURCE.DETAIL → exact chosen passage + CT.ACCESS.DETAIL_SELECTED. |
| `T.SOURCE.ZOOM`, `T.PHOTO.ENLARGE` | CT.SOURCE.ENLARGE or CT.CLIP.ENLARGE_PHOTO; identical component info. |
| `T.SOURCE.UNZOOM` | CT.UI.BACK → same source/component/scroll; no new text. |
| `T.SOURCE.WORD` | Selected defined word → its CT.WORD entry. |
| `T.SOURCE.WORD.CLOSE` | CT.SOURCE.DEFINITION_CLOSE → same reader word focus. |
| `T.POST.PLAY` | CT.CLIP.PLAY → actual frame/recording metadata. |
| `T.POST.PHOTO` | CT.MEDIA.PHOTO → CT.SRC.E2.B + CT.MEDIA.PARTIAL. |
| `T.CLIP.STEP` | Previous/Next/frame button → only chosen frame, end marker if final. |
| `T.CLIP.DESCRIBE` | CT.CLIP.DESCRIBE → CT.SRC.E2.A complete description, explicitly exposed. |
| `T.PICK.USE` | CT.SOURCE.USE → actual selected slot/details; no verdict. |
| `T.PICK.CANCEL` | CT.UI.CANCEL → prior slot unchanged; no new status necessary. |
| `T.COMPARE.CHOOSE` | CT.SOURCE.ADD/CHANGE → CT.SOURCE.CHOOSE. |
| `T.COMPARE.REMOVE` | CT.SOURCE.REMOVE → remaining slots + retained idea/relation. |
| `T.COMPARE.RELATE` | CT.COMPARE relationship labels; CT.COMPARE.RELATION_HELP explains ownership. |
| `T.COMPARE.SAVE`, `T.IDEA.SAVE` | CT.IDEA.SAVE → CT.IDEA.RECORDED or actual empty/limit message. |
| `T.TIMELINE.VIEW` | Event times/Discovery order; actual rows reordered, no history change. |
| `T.IDEA.EDIT` | CT.IDEA.EDIT → draft/status; old version remains actual history. |
| `T.IDEA.CLOSE` | Shared close, draft preserved in session; save status separate. |
| `T.IDEA.HELP` | Explicit Help → CT.HELP entry; no silent request. |
| `T.IDEA.LEAD` | Lead selection → CT.LEAD.CHOOSE. |
| `T.LEAD.SET` | CT.LEAD.FOLLOW → CT.GOAL.QUESTION; Go is separate. |
| `T.TALK.ASK` | Actual CT.TALK topic → exact §5 matrix reply. |
| `T.TALK.BACK` | CT.UI.BACK → current topic list, no repeated intro. |
| `T.TALK.SOURCE` | Own-source request → actual §2 body and origin; source access, not a new author. |
| `T.PRESENT.REVIEW` | CT.PRESENT.REVIEW + exact selected refs/words. |
| `T.PRESENT.SHOW` | CT.PRESENT.SHOW → CT.PRESENT.GOING; delivery not yet claimed. |
| `T.PRESENT.TRAVEL` | CT.PRESENT.GO → actual destination, retain undelivered selection. |
| `T.PRESENT.DELIVER`, `T.PLAN.DELIVER` | At actual approach, CT.PRESENT.DONE/CT.PLAN.DELIVERED and appropriate §5 reply; snapshot once. |
| `T.PLAN.RECORD` | CT.PLAN.RECORD → CT.PLAN.RECORDED, no Jo reply. |
| `T.KIT.OPEN` | CT.KIT.OPEN → CT.KIT.CONTENTS at lid commit. |
| `T.KIT.COLLECT` | CT.KIT.COLLECT → carried/HAVE result, no note bodies. |
| `T.KIT.SEAT` | CT.KIT.HANDOFF → CT.KIT.SEATED at actual seat; queued work action follows only if current. |
| `T.WORK.MISSING` | Actual CT.WORK.MISSING_KIT/LOOP; no source prerequisite. |
| `T.WORK.EDIT`, `T.RAIL.DESTINATIONS` | CT.RAIL.ARRANGE/CHOOSE/DESTINATIONS → valid named operations. |
| `T.RAIL.COMMIT` | Operation-specific caption below, then CT.RAIL.CHANGED only for actual order change. |
| `T.RAIL.INSERT`, `T.RAIL.MOVE` | CT.RAIL gap/move action → CT.RAIL.PLACED + changed caption. |
| `T.RAIL.REPLACE` | CT.RAIL.REPLACE → CT.RAIL.REPLACED + changed caption. |
| `T.RAIL.SWAP` | CT.RAIL.SWAP → CT.RAIL.SWAPPED + changed caption. |
| `T.RAIL.RETURN` | CT.RAIL.RETURN → CT.RAIL.RETURNED + changed caption. |
| `T.RAIL.NOOP` | CT.RAIL.SAME/START_LIMIT/END_LIMIT; certification retained, no changed caption. |
| `T.RAIL.CANCEL` | CT.RAIL.CANCEL → CT.RAIL.CANCELED, or INVALID on invalid drop; original owner. |
| `T.RUN.REHEARSE` | CT.WORK.REHEARSE → missing-resource/empty message or Rehearsal starting. |
| `T.RUN.SHOW` | CT.WORK.LAUNCH/REPLAY → eligible Premiere starting; otherwise Show check. |
| `T.RUN.BEGIN` | CT.RUN.TITLE and current cue; no success claim. |
| `T.RUN.CUE` | Exact §6.4 factual endpoint caption; next/paused/finished result per actual state. |
| `T.RUN.STOP`, `T.RUN.LEAVE` | Settle current cue once, CT.RUN.PAUSED or TERMINAL; leave then actual movement. |
| `T.RUN.CONTINUE`, `T.RUN.UNMET_CONTINUE` | CT.RUN.CONTINUE → actual next cue; no repair of prior unmet outcome. |
| `T.RUN.FINALIZE` | CT.RUN.FINALIZE → FINISHED/CERTIFIED or completed-show ending; no repeated last cue. |
| `T.RUN.RESTART`, `T.RUN.RESTART.REHEARSAL`, `T.RUN.RESTART.SHOW` | CT.RUN.RESTART with correct mode; show still requires certification. |
| `T.SHOW.CHECK` | Actual prerequisite first, otherwise CT.WORK.CHECK. |
| `T.WORK.RESET` | CT.WORK.RESET/description → RESET_RESULT; retain order, remove current certification. |
| `T.WORK.CLEAR` | CT.WORK.CLEAR/description → CLEAR_RESULT; historical premiere retained. |
| `T.STORY.CLOSE` | Shared Back/Close → paused same caller; no new cue. |
| `T.COACH.THINK` | CT.HELP.THINK → PENDING with submitted text or TOPIC without it. |
| `T.COACH.TOPIC` | CT.HELP.TOPIC → eligible authored attention/clarification, labeled Prepared hint. |
| `T.COACH.WAIT` | CT.HELP.WAITING after proposed two seconds. |
| `T.COACH.OFFER` | CT.HELP.OFFER after proposed eight seconds; closed view only AVAILABLE. |
| `T.COACH.FALLBACK` | CT.HELP.USE_PREPARED → exact eligible local response; sole reply ownership. |
| `T.COACH.OPEN_READY` | READY → recheck, response or STALE; no stale text flashed first. |
| `T.COACH.DIRECT` | CT.HELP.DIRECT → appropriate CT.DIRECT exact answer; prior response opportunity canceled. |
| `T.COACH.DIRECT_CLOSE` | Shared close → actual source/outcome/assistance history retained; no tile auto-placement. |
| `T.COACH.CANCEL` | CT.HELP.CANCEL → CANCELED; late result ignored. |
| `T.PAUSE.RETURN` | CT.UI.FESTIVAL → world with run still paused. |
| `T.PAUSE.HOME` | CT.PAUSE.HOME → Continue this visit if unsaved; live state retained. |
| `T.SETTINGS.CHANGE` | Actual label/choice and APPLIED; save result separately truthful. |
| `T.SAVE.ACK` | CT.SAVE.SAVED only latest corresponding acknowledgment. |
| `T.SAVE.FAIL` | CT.SAVE.FAILED/DETAIL, no interruption forced. |
| `T.SAVE.RETRY` | CT.SAVE.RETRY → PENDING or real replacement decision. |
| `T.RECOVERY.RETRY` | CT.RECOVERY.RETRY → startup check, no overwrite. |
| `T.RECOVERY.REPLACE` | Actual unknown/known message + Replace saved game → save result; cancel keeps visit. |
| `T.RESUME.OPEN` | CT.RUN.OPEN → actual Stage approach and correct-mode paused/terminal controls. |
| `T.RESET.CANCEL` | KEEP_PLAYING/KEEP_SAVED → same caller, no case change. |
| `T.RESET.ACCEPT` | CT.RESET.ACCEPT → initial assignment; OLD_MAY_RETURN only on actual save failure. |
| `T.VISIBILITY.HIDE` | No background announcement; handled event settles/pauses and attempts save. |
| `T.VISIBILITY.RETURN` | CT.RETURN.VISIBLE and existing task/mode/draft; no automatic resume. |
| `T.TOAST.START` | CT.TOAST.START → actual reveal-stage captions. |
| `T.TOAST.SETTLE` | PUNCHLINE + final MAGNIFIER description; reveal committed once. |
| `T.TOAST.LOOK` | CT.TOAST.LOOK → ENLARGED. |
| `T.TOAST.REPLAY` | CT.TOAST.REPLAY → FLOURISH then same result. |
| `T.ENDING.AFTER` | CT.ENDING.CONTINUE → AFTER + exact own-room reactions. |
| `T.ENDING.SKIP` | SKIP/actual leave → completed recap or chosen room; no erased completion. |
| `T.ENDING.RECAP` | NEXT/end/SKIP_REACTIONS → FACT + only actual conditional recap records. |
| `T.ENDING.REOPEN` | CT.ENDING.REOPEN → same factual historical recap in place. |
| `T.ENDING.RETURN` | RETURN or shared Back/Return to room according to caller; preserve current location/order. |
| `T.ENDING.REPLAY` | REPLAY at actual Stage Show approach, or GO_REPLAY travel only when elsewhere; current check still applies. |

Events described in 06 without a separate T identifier retain their originating state binding: source Play/Pause/Replay, request result/failure/stale replacement, source location travel, settings choice, reaction revisit and New game save failure all have exact entries above. No new transition IDs or product behavior are introduced to inflate coverage.

### 12.2 Item 05 object/access coverage

Each group explicitly inherits its cited content family and interface-state rows. Decorative bodies have no additional interaction dialogue; their required visible context is accounted for in current-room/story descriptions. A scene-description sentence is not an unseen source's body or a new principal record.

| Existing scene/object/access IDs | Content and interaction binding |
|---|---|
| SC.ST, SC.CY, SC.WK, SC.MD | CT.SCENE.ST/CY/WK/MD with actual owner/notice/projection suffixes; CT.WORLD.ARRIVED; world/map distinction in §§3/10. |
| ACT.PLAYER | CT.WORLD.YOU, movement/stop/blocked/arrival and CT.ACCESS instructions; no character-creation flow. |
| ACT.JO, ACT.REMY, ACT.ARI | CT.OBJ.TALK, each exact topic/reply under §5; source/plan delivery uses §4.2 and real 05 approaches. |
| ST.MODEL, ST.MODEL.TAB | CT.OBJ.MODEL/MODEL_RESULT, first CT.JO.MODEL, recoverable opening goal. |
| MODEL.PIP, MODEL.BACKPACK, MODEL.SEED, MODEL.GRANDMA, MODEL.RIVER, MODEL.BROKEN_BRIDGE | One miniature prop group; initial banks/backpack/broken-bridge description and CT.OBJ.MODEL_RESULT, no individual interactive clues. |
| ST.SOURCE.E1 | CT.OBJ.BRIEF_OPEN/BRIEF_READ → CT.TITLE.E1, CT.SRC.E1 and canonical a/b/c. |
| ST.SOURCE.E4 | CT.OBJ.REQUEST_OPEN/REQUEST_READ → CT.TITLE.E4, CT.SRC.E4 a/b; conditional wording unchanged. |
| ST.SOURCE.E6 | CT.OBJ.JO_DRAWER/JO_NOTE → CT.TITLE.E6, CT.SRC.E6 a/b. |
| ST.BOARD | Border chooser CT.WORLD.CHOOSE with REQUEST action and POST; furniture itself has no body text. |
| ST.ACCESS.E2, CY.ACCESS.E2 | CT.OBJ.POST/MESSAGE_LABEL → §2.3 component states; D06-01 access without automatic all-component exposure. |
| CY.SOURCE.E3, CY.NOTICE.BOARD | CT.OBJ.NOTICE_CURLED/PARTIAL/FLATTEN/DONE/READ → CT.SRC.E3 at secure commit. Parent board adds no separate clue. |
| CY.SOURCE.E7 | CT.OBJ.REMY_NOTE → CT.TITLE.E7, CT.SRC.E7 a/b/c. |
| CY.MODEL.BENCH, CY.MODEL.BOAT, CY.PETALS, CY.TABLET.STAND | CT.SCENE.CY, CT.OBJ.PETALS; static boat/no cue preview; child source/post actions above. |
| ACT.LOOP, LOOP.FOLLOW.PAD | CT.OBJ.WAKE/WAKE_RESULT/FOLLOWING, CT.OBS.LOOP.SEEN/RESPONSE and actual local presence. |
| ST.DOCK, ST.DOCK.FLAP, ST.DOCK.PAD | CT.OBJ.DOCK_OPEN/DOCK_EMPTY/DOCK_EMPTY_RESULT/DOCK_READY, CT.GOAL.DOCK; blank/initial/current projection as actual state. |
| MD.SOURCE.E5 | CT.OBJ.SLATE → CT.SRC.E5.A, historical slate labels; Ari account and observation remain separate. |
| MD.SOURCE.E6, MD.SOURCE.E7 | CT.OBJ.JO_NOTE/REMY_NOTE → same CT.SRC.E6/E7; mounted copies persist. |
| MD.RACK.STATION, MD.ACCESS.E8 | CT.KIT.OPEN/COLLECT/CONTENTS/VACANT, current fixed-note actions; no empty-recess recollection. |
| KIT.CADDY, ST.RACK.BAY | CT.KIT current ownership, HANDOFF/SEATED, EMPTY_BAY; actual approach/commit and surviving focus. |
| KIT.NOTE.E6, KIT.NOTE.E7 | CT.KIT.NOTE_JO/NOTE_REMY → exact canonical note at real carried/seated host. |
| TILE.FERRY, TILE.BRIDGE, TILE.PLANT, TILE.BLOOM | Existing visible names + corresponding CT.SRC.E8 description; CT.RAIL editing actions/actual position names, §6.4 cue result. |
| ST.RAIL, ST.RAIL.A, ST.RAIL.B, ST.RAIL.C, ST.RAIL.D | CT.RAIL actual order/selection/gap/replace/swap/move/return. A–D stay author-only capacity IDs; occupied position numbers are descriptive. |
| ST.CONSOLE | Workstation heading and readiness/run controls; one physical owner, not another evidence desk. |
| ST.CONTROL.REHEARSE | CT.WORK.REHEARSE, missing/empty/ready result; current-run modes in §6.3. |
| ST.CONTROL.SHOW | Same pad CT.WORK.PREVIEW → LAUNCH → REPLAY with actual qualification and CT.WORK.CHECK. |
| ST.CONTROL.STOP | CT.RUN.STOP → actual settled cue + PAUSED/TERMINAL in retained mode. |
| ST.CONTROL.RESET, ST.CONTROL.CLEAR | Separate CT.WORK.RESET/CLEAR descriptions/results; not CT.RESET whole-case flow. |
| ST.PROJECTION | CT.STORY full composition, actual CT.CUE/result/certification/ending; blank without Loop. |
| PUP.LEFT_BANK, PUP.RIVER, PUP.HILL, PUP.BROKEN_BRIDGE | §6.5 read-only entity names/banks description; no destinations. |
| PUP.PIP, PUP.BACKPACK, PUP.GRANDMA, PUP.SEED, PUP.BOATS, PUP.FLOWER | §6.5 actual position/root/light descriptions, cue captions; no direct manipulation. |
| WK.WAYFINDING, WK.ACCESS.NAV | CT.WORLD.VENUE → CT.NAV.ST/CY/WK/MEDIA; source picker public-reference group. |
| WK.BENCH, WK.SCENERY | CT.SCENE.WK; occupied table/contained scenery, no hidden clue. |
| MD.PLAIN.WALL, MD.RECORDING.TABLE | CT.SCENE.MD; observed still petals/plain wall only when here, not remote occupancy. |
| WK.TOAST, WK.TOAST.START, WK.TOAST.MAGNIFIER, WK.TOAST.SKIP | §9 exact covered/reveal/magnifier/replay/skip content; independent from case. |
| ST.EXIT.CY, ST.EXIT.WK, CY.EXIT.ST, CY.EXIT.WK | CT.WORLD.GO with Courtyard/Workshop/Stage/Workshop respectively; actual 05 pairs, no extra source content. |
| WK.EXIT.ST, WK.EXIT.CY, WK.EXIT.MD, MD.EXIT.WK | CT.WORLD.GO with Stage/Courtyard/Media/Workshop respectively; actual arrival descriptions. |
| ACC.OBJECTS | CT.UI.MOVE, CT.WORLD.LOCAL_LIST, current actual object/door controls. |
| ACC.VENUE | CT.UI.MAP + public CT.NAV descriptions and travel labels. |
| ACC.EVIDENCE.E1, ACC.EVIDENCE.E2, ACC.EVIDENCE.E3, ACC.EVIDENCE.E4 | CT.NOTES families + actual available §2 bodies/components, no hidden rest-of-source preview. |
| ACC.EVIDENCE.E5, ACC.EVIDENCE.E6, ACC.EVIDENCE.E7, ACC.EVIDENCE.E8 | Same with independent E5 origins and single canonical note/tile identities. |
| ACC.COMPARE | CT.COMPARE, CT.SOURCE picker, CT.IDEA optional text/status controls. |
| ACC.TIMELINE | CT.TIMELINE actual time/type/source rows. |
| ACC.THEORY | CT.IDEA and CT.LEAD; no automatic true claim or travel. |
| ACC.PRESENT | CT.PRESENT selection/review/approach/commit/cancel and §5 knowledge replies. |
| ACC.PLAN.SEARCH | CT.PLAN.SEARCH/RECORD/RECORDED; explicit delivery separate. |
| ACC.PLAN.STORY | CT.PLAN.STORY/EXPLAIN/DELIVERED; actual arrangement/outcome context. |
| ACC.COACH | §7 lifecycle and bounded exact response bank, exposure rules §10.3. |
| ACC.STORY.STATE | CT.STORY.OPEN/TITLE/composition/enlargement, read-only both banks. |
| ACC.GOAL | CT.GOAL actual assignment/opportunities/question/latest status; CT.ENDING.REOPEN after completion. |
| ACC.KIT | CT.KIT legitimate current host and note/tile access; no remotely opened unread seated copy. |

## 13. Written route and consistency checks

These are content walkthroughs against Items 05–06, not executed gameplay, browser checks, child testing or measured live-model performance. Each row identifies concrete displayed wording at the risky point, then checks the resulting boundaries. Optional words in the child's own draft are never prefilled or fabricated for a real run.

| Item 06 flow | Actual content trace and check | Written result |
|---|---|---|
| F01 — first start/free route | CT.START.START → CT.GOAL.ASSIGNMENT → optional CT.OBJ.MODEL_RESULT/CT.JO.MODEL → CT.WORK.PREVIEW_RESULT, “Loop isn’t in the dock yet.” Dismiss or either exit remains available. | Assignment survives dismissal. No clue quota, required form or mystery repair introduced. |
| F02 — correct-first E4 + NAV.MEDIA | CT.SRC.E4 retains “If the wind keeps folding them…”; CT.NAV.MEDIA says “Media — indoor filming space with a plain wall.” CT.COMPARE labels record a chosen connection. CT.PLAN.RECORDED does not deliver to Jo; Go to Media physically travels. | Suitability does not confirm occupancy. Arrival, not a map label, supplies CT.OBS.LOOP.SEEN. No explanation route works identically with no inference claim. |
| F03 — cancellation revision | First frame/photo use CT.MEDIA.FRAME1/PARTIAL and CT.SRC.E2.C with “I think.” CY.SOURCE.E3 commit yields CT.OBJ.NOTICE_DONE and full CT.SRC.E3. Show both parts to Remy produces exact CT.REMY.CORRECT. | First frame cannot leak end marker. E3.a-only uses “That part says the outdoor rehearsal was canceled,” without status quote/full correction. Reading the board alone doesn't update Remy or create a child revision. |
| F04 — Media first | No source required before arrival. Actual Loop visible; CT.ARI.INVITE if shown records that account only. CT.OBJ.WAKE_RESULT and CT.KIT.CARRIED appear at separate commits. | E5 slate/body not fabricated; invitation never blocks grabbing materials. Original premiere task remains. |
| F05 — unread kit notes | CT.KIT.CONTENTS names objects, not note text. Collection then Stage handoff yields CT.KIT.SEATED. CT.KIT.NOTE_JO/REMY opens CT.SRC.E6/E7 for first reading at real host. | Possession does not fill Notes with unread bodies. Mounted Media copies remain accessible and canonical identities stay one each. |
| F06 — only one resource | Kit-first: “Bring Loop to the dock to project the story,” with editing allowed. Loop-first: “Collect the story tiles for this rail,” initial projected setup and empty bay. | No false missing-reading reason; preserved retrieved resource not recollected or duplicated. Ari's departed line doesn't claim remote docking. |
| F07 — seed-only rehearsal/revision | One Boat → CT.CUE.FERRY. Hill → “Grandma has the seed. Pip is still across the river.” Continue to Flower → “The seed is still unplanted.” Optional note/help may follow; inserted Joined Boats produces CT.RAIL.CHANGED. | Consequence alone doesn't prescribe Bridge. Actual edit removes Continue of old order, then new Rehearse; no loss of evidence and no silent reasoning claim. |
| F08 — five valid plans | Joined Boats/Hill/Flower uses CARRY → PLANTED → FLOWER. Ferry-first uses FERRY → REUNITE → PLANTED → FLOWER. Other Ferry positions use “No loose seed on this bank.” | All five full orders reach identical CERTIFIED/ending content. Harmless Ferry doesn't pause, reset roots/light, imply error or lower reward. Trailing Ferry finishes before certification. |
| F09 — premiere/replay | CT.WORK.CERTIFIED → Launch → actual Premiere cues → CT.ENDING.LIGHT/CT.JO.ENDING → own-room reactions → CT.ENDING.FACT. | Successful rehearsal is not completed premiere. Recap without recorded reason contains only factual completion, no invented cancellation/reading achievement. |
| F10 — interruption in both modes | Stop settles current cue, then CT.RUN.PAUSED/NEXT or TERMINAL/FINALIZE. Reopen uses “Continue rehearsal” or “Continue premiere” from retained mode. Hard reload may show CT.RECOVERY.UNCERTAIN_CUE. | Correct next cue/once-only finalization. No “you haven't seen this yet”; reopening source/room never auto-continues. |
| F11 — edit after success | Selection cancel says “Your arrangement is unchanged”; actual edit says “Your arrangement changed. Rehearse this version.” Show then says “Try this arrangement in rehearsal first.” | No-op preserves certification; edit/reset removes current eligibility without erasing historical completed premiere. |
| F12 — help timing/races | PENDING → WAITING at proposed 2s → OFFER at proposed 8s; closed view only “Help available.” Accept prepared hint, then suppress late result. Room/rail/source/text changes before display produce STALE. | No waiting lock, focus-stealing answer or duplicate assistance. Show me a way cancels live opportunity, exposes actual answer facts without reading whole sources. |
| F13 — keyboard/compact | CT.ACCESS.MOVEMENT/KEYBOARD → named Move to and object actions → non-drag CT.RAIL.SELECT/gap/replace controls → Watch/Describe/Continue → Launch. Source frame buttons show only their own frame. | Every required action has named alternative. Typing doesn't move avatar, both banks remain available, source wording unchanged, focus goes to surviving owner/Move to. |
| F14 — save/recovery/reset | Actual acknowledgment alone shows “Saved on this device.” Failure gives session limitation; Back to start uses Continue this visit. Read error offers Play without saving without overwrite. Version/damage offers confirmation; cancel Keep saved game retains record. | No false durable-save claim, custom close guarantee, recovery teleport or partial fake success. Whole-case reset retains preferences; changed unknown-record replacement uses “may.” |
| F15 — optional Toast | Ignoring CT.TOAST.START leaves case identical. Starting/Skip/leave settles revealed pose and “One toast. Maximum effort.” Magnifier only enlarges toast. | No required gag marker, clue, item or launch prerequisite; source lists/recap never invent toast-based learning. |

### 13.1 Specific source/knowledge/assistance audit

The written-rule enumeration covers all 65 zero-to-four unique tile orders, assuming the child explicitly continues any unmet pause to inspect the rest of that order. Nine reachable cue-caption cases cover those transitions. The five successful full orders map as follows; this table is author-only review evidence, never an ordinary tile/reader preview:

| Full valid order | Caption sequence, all ending with current-arrangement certification |
|---|---|
| Joined Boats → Hill → Flower | CT.CUE.BRIDGE_CARRY → CT.CUE.PLANTED → CT.CUE.FLOWER |
| One Boat → Joined Boats → Hill → Flower | CT.CUE.FERRY → CT.CUE.BRIDGE_REUNITE → CT.CUE.PLANTED → CT.CUE.FLOWER |
| Joined Boats → One Boat → Hill → Flower | CT.CUE.BRIDGE_CARRY → CT.CUE.FERRY_EMPTY → CT.CUE.PLANTED → CT.CUE.FLOWER |
| Joined Boats → Hill → One Boat → Flower | CT.CUE.BRIDGE_CARRY → CT.CUE.PLANTED → CT.CUE.FERRY_EMPTY → CT.CUE.FLOWER |
| Joined Boats → Hill → Flower → One Boat | CT.CUE.BRIDGE_CARRY → CT.CUE.PLANTED → CT.CUE.FLOWER → CT.CUE.FERRY_EMPTY |

The remaining reachable cases are CT.CUE.HILL_BOTH_LEFT, CT.CUE.HILL_MISSING_PIP and CT.CUE.UNPLANTED, which hold for the child's explicit next action. Enumeration checks no light before planting and no planting before Pip and seed arrive; it does not execute the game's animation, navigation, UI or service.

| Check | Catalog resolution |
|---|---|
| Frozen bodies and passage boundaries | §2 quotes literal v3 text; E3 four lines remain, E6.a preserves the full quoted promise, E7's “cannot”/“only” remain. Source copies reference these bodies. |
| Plans versus results | E4 timestamp/request and E3 future indoor plan are distinct from E5.a completed capture. No 9:08/9:20 hidden-history timeline rows are introduced merely because authors know them. |
| E2 component access | D06-01 retained; first still, photo, posted interpretation, later frames/end and requested complete description separately bound. |
| Character knowledge | §5 separates own accounts, received facts and attributed child hypotheses; unshown drafts never generate replies. Partial E3 cannot cause full correction. |
| Historical location | E5 says where Loop was observed/captured; current scene/goal uses actual owner. Ari doesn't claim a later unseen dock event. |
| Optional writing | No one must fill a field to explore, collect, rehearse, launch or request direct help. Empty-field errors apply only to explicit textual record/delivery. |
| Direct answer before reading | §7's exact authored answer can introduce route/order facts; §10.3 records those facts rather than whole-note reading. |
| Trial-and-error and recap | Successful action is accepted. Actual written reasoning/assistance/timing is preserved; no fabricated independent reading inference or learning gain. |
| Reading variants | Explicitly none beyond established access supports. Final source bodies remain identical in enlarged and accessible text. |
| Physical/mode truth | Content selectors use actual kit/Loop/order/cue/mode; Reset/Clear/New game are distinct; run histories never replace current certification. |

## 14. Completion evidence, decisions and next handoff

### 14.1 Six Item 07 requirements

| Checklist subitem | Required completion evidence in this document |
|---|---|
| Preserve/freeze decisive source wording and canonical passage IDs; shared copy identity | §2 literal bodies, metadata/component registry, passage spans and copy crosswalk; §§10.3/13.1 meaning checks. |
| Complete objectives/instructions/controls/captions/access/error/recovery/recap copy for 05–06 | Exact catalogs §§3–4, 6, 8–10; every interface state in §11 and named transition in §12.1. |
| Bind NPC replies/authored hints to evidence and state; useful unsupported fallback | §5 bounded dialogue matrix and exact frozen/new lines; §7 complete authored bank, eligibility, fallback/direct lifecycle. |
| Define simpler variants actually included without changing decisive meaning | §10.2 explicit scope decision: no new rewritten-source mode; complete existing vocabulary, enlargement, spacing and component access. |
| Record assistance/output exposure accurately; no false unread-source reading | §§2.3/7/10.3 and specific route checks F03/F05/F07/F12; actual content availability, display, delivery and understanding separate. |
| Check all text/evidence/dialogue/consequence descriptions against one story truth | §13 fifteen written route checks and semantic audit; §6 all five valid outcomes; final reference/frozen-text check record below. |

### 14.2 Decisions and corrections

New supporting copy is labeled N; consolidated proposed interface copy is C; frozen source/dialogue/caption wording is F. The catalog consolidates terminology in §1.3 and binds previously broad conditions to concrete states. No room geometry, character history, source meaning, puzzle rule, or interface transition has changed.

Two important interpretation decisions are explicit: a source-owning character can deliver their own known account without fabricating physical inspection of a different source copy; and v3's model-selected authored rendering remains the live AI design, rather than silently adding unrestricted generated replies. All new direct-help variants are current-progress versions of the existing answer mechanism, not new puzzles or an AI progression gate.

No unresolved material content decision remains. Review clarified current-progress Ari responses after pickup, partial spoken-account availability, and recording-versus-sending language for private ideas. These apply existing ownership/knowledge/interface rules; they do not change the frozen source body or reopen the narrative. Final art, typography, asset appearance, runtime implementation, live service performance, usability and child learning remain later work.

### 14.3 Item 08 receives

**Exact next item: 08 — Visual direction and readable scene/interface designs.** It receives the four physical scene plans from 05, functional layouts and input/focus contracts from 06, and the exact canonical words/conditions in this catalog. It must design readable scene/interface treatment around these requirements rather than replacing them with a quiz or adding new evidence.

Specific inputs: current-room descriptions and neutral unopened-object labels; complete source bodies with decisive lines preserved; distinct E2 visual/description stages; tile names/local descriptions without solution previews; both-bank cue states; all narrow-screen/native alternatives; the single Show pad's changing label; private/recorded/delivered/help status distinctions; actual save and recovery wording; and optional Toast/premiere captions. Final text cannot be cropped or reduced to fit a decorative container. No final palette, font, camera illustration, screen art or asset set is produced here.

Item 09 retains technology/service/schema decisions; Item 10 retains individual asset production requirements; Item 11 retains integrated handoff and schedule. No build-ready or implemented-game claim follows from a complete content catalog.

### 14.4 Final document checks

**Item 07 is complete as content design.** The catalog defines 548 stable content entries/families and maps all 93 interface states and all 121 named Item 06 transitions. Each state is listed once. Shared content and intentional no-new-text transitions are explicit. The Item 05 access/object crosswalk includes its concrete identities and expands ACC.EVIDENCE into the eight canonical accesses.

Document checks found no duplicate content IDs, missing/extra interface-state mappings, missing/extra named transitions, dangling content references or undefined template substitutions. Family references resolve to declared entries with explicit conditions. All linked authority files exist. A comparison of 147 frozen text entries/excerpts, including all 14 source-body/component entries and the complete frozen coaching bank, found their wording in the authoritative documents after normalizing only whitespace, quote-container formatting and E3 line-break markup; decisive words and punctuation were not paraphrased. Source-copy/passage provenance was also reviewed in §§2/10/13.

The 65-order written-rule enumeration yields the same five successful arrangements as v3 and checks the corresponding nine reachable cue-caption cases. Fifteen written player-flow checks cover source exposure, local knowledge, material ownership, optional help, all valid plans, interruptions, recovery and humor. These are document/reference and authored-rule checks. **No implementation, browser test, live-model test, accessibility qualification, child playtest or measured learning result is claimed.** All six Item 07 checklist subitems have the evidence identified in §14.1; later items retain their own completion requirements.
