# Evidence Quest — Item 06: Complete Interface and Player Flows

**Case:** Launch Day: Where’s Loop? / The Little Bridge  
**Prepared:** September 10, 2026  
**Status:** functional interface specification. No implementation, polished visual design, or player testing accompanies it.  
**Authority:** [Master Checklist](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/EVIDENCE-QUEST-MASTER-CHECKLIST.md); [v3 story and system specification](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/Evidence-Quest-Complete-Game-Specification-v3.md); [Item 05 room and interaction contracts](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/05-FUNCTIONAL-SCENES-AND-INTERACTIONS.md).

Items 01–05 supply the story, learning boundaries, physical rooms and action rules. This document specifies their interface. New layout ratios, interface groupings, state labels and secondary wording are recommended decisions for this section. Frozen source text and existing decisive captions retain their original authority. [Item 07 — Complete Child-Facing Content and References](C:/Users/TonyGuillaro/.codex/visualizations/2026/09/10/01a08d56-ee56-7cf0-9dc1-7bbca5d71ac1/evidence-quest-design-v3/07-COMPLETE-CHILD-FACING-CONTENT-AND-REFERENCES.md) now consolidates the canonical content, preserving the functional meanings below. Its §1.3 resolves secondary label variants. The Master Checklist now identifies Item 08 as next; no interface state or transition changed in the content handoff.

## 1. The interface the child experiences

The child normally sees the whole current room, their avatar, the people and objects in it, and a small set of access controls. Clicking the curled notice makes the avatar walk to it and flatten it; only then does its readable page open. The evidence tools let the child revisit or connect discoveries. Closing them returns to that same world, without restarting a canceled walk.

At the Stage workstation the child arranges physical tiles below the story. Rehearse runs their order. If Grandma has the seed but Pip remains across the river, both banks remain visible and the scene waits for the child's next action. Reading Jo's note or requesting help pauses the story before a supporting view appears. The existing Show pad eventually launches the same arrangement that succeeded in rehearsal.

There is no required worksheet between those actions. Source selection, explanations and coaching are optional. A player's correct route or successful show is accepted whether or not they supplied a reason. The interface never turns that success alone into a reading score.

### 1.1 How to use this document

- `UI.*` names interface states; `T.*` names transitions; `L.*` names functional layouts; `C.*` names shared behavior contracts. These IDs are for the builder, not child-facing labels.
- Physical and source IDs such as `ST.CONTROL.SHOW`, `KIT.NOTE.E7`, `E3.b` and `ACC.COACH` come from Item 05/v3 and remain unchanged.
- A family contract plus its state/transition rows specifies the complete behavior. Shared input, persistence, focus, cancel and responsive rules are inherited explicitly; exceptions appear in the relevant row.
- `RETURN` means the recorded surviving caller resolved by C3, not an unspecified screen. `WORLD` means the current room's `UI.WORLD.IDLE`, with any rehearsal/show still paused unless a playback action explicitly resumes it.
- Physical readiness, current playback and save/help status are independent dimensions. For example, the child can be in `UI.SOURCE.TEXT` while the Stage run is `UI.RUN.PAUSED` and saving is `UI.SAVE.SESSION`. That does not create three simultaneously interactive panels.

## 2. Shared interface, input, and recovery contracts

### C1 — One task surface and an explicit input owner

| Layer | Contents and concurrency | Input and motion |
|---|---|---|
| World | Current room, avatar, objects, contextual cue and room captions | World accepts movement only when it owns focus and no blocking task surface is open. |
| World tools | Goal, Move to…, Map, Notes, Help, Menu; Kit when possessed | These are compact access controls, not permanent expanded panels. Opening one uses C2. |
| Active task surface | One of source/evidence/map/conversation/plan/kit/help/settings or workstation | Opening a peer replaces the current peer after saving its draft/return context. Do not pile up independent panels. Reading/conversation/edit forms block world clicks; the workstation has the explicit nonmodal exception below. |
| Child surface | One passage picker, definition, enlarged source, target chooser, reset confirmation or focused recovery decision owned by the current task | It temporarily owns focus. No arbitrary stacks of nested confirmations. Replacing it first resolves/cancels its uncommitted selection. |
| Passive status | Saved/session-only indicator, quiet help-wait/ready marker, last action caption | No focus stealing, no hidden auto-answer, and no modal wait. Status messages never obstruct a door or Stop. |

The workstation occupies a reserved control area outside the room/projection, so a deliberate world-floor or door action can close it, cancel any held tile, settle/pause playback, and issue the new physical intent. A reading surface never passes an accidental click through to the world behind it. Clicking outside a reading surface does nothing; use its visible Close/Back/Return to room. This distinction is deliberate.

Opening a new peer does not leave an invisible old peer accepting shortcuts. Keep two distinct return contexts: `callerReturn` identifies the immediate task owner and its selection/scroll; `worldReturn` identifies the surviving world/access invoker. A root task can own one child workspace containing its picker/reader/zoom/definition modes; changing a mode preserves its owner but replaces the child content rather than stacking another active surface. Back/Close on a child restores its previous child mode or owning task; Close on a root task returns WORLD. **Return to room** always unwinds all tasks and resolves `worldReturn`, never a now-closed picker. Cross-tool navigation replaces a peer instead of accumulating an unlimited history stack. These context names describe behavior, not an implementation schema.

### C2 — Interrupt first, then present information

Before opening a blocking task surface or inspecting/arranging at the workstation:

1. Stop pending walking and clear held movement input.
2. Return an uncommitted tile selection to its committed origin.
3. Resolve an active physical action using its Item 05 commit rule. Do not undo committed collection/notice/docking.
4. Settle an active puppet cue once to its endpoint and pause before the next cue. Record the displayed outcome before recording a new explanation or help-request context.
5. Settle an active Toast reveal to its revealed state; a celebration already completed can settle to its completed pose.
6. Open the requested view and establish its focus. No automatic movement/playback resumes when it closes.

A passive arriving help result or save notification does not execute these steps: it does not open a surface. Normal reduced-motion playback shortens presentation while retaining normal cue order; it does not create a pause after every successful cue. Changing motion settings during a cue uses the interruption rule above.

### C3 — Focus, keyboard, touch, and return

Every actionable control has a readable name, visible focus, click/tap activation, and Enter/Space activation when focused. Controls target at least 48 CSS pixels in their rendered interface as an initial product requirement. Expanded world hit regions use Item 05's overlap chooser; they do not silently select a clue. No essential action requires hover, double-click, long press or dragging.

World focus gives arrows/WASD screen-relative movement and Interact for the named nearby target. In a task surface these keys operate its native controls or text; they never move the avatar. Tab follows the family's stated reading order and can leave ordinary controls through their normal hierarchy. A blocking surface keeps navigation within its active controls until Close/Back; this is a deliberate focus boundary with an immediately available exit, not a focus trap without escape. The browser's own controls remain outside the game's scope.

On open, announce/focus the task heading; the first forward focus goes to the first meaningful action/content control. New game and discard-risk confirmations instead focus **Keep playing / Cancel**. No automatic focus into a text box that would summon a touch keyboard merely for opening a plan/help view. Choosing the field activates it.

On close, resolve the invoker by stable ID: original surviving control → current representation of its moved kit/tile owner → current room's Move to… control. Restore the relevant scroll/selection when returning to a surviving parent. Never focus a destroyed drag ghost or an old Media caddy after it moved. Clear held keys at every handoff. A room arrival announces the destination, focuses its world/room heading, and requires a fresh movement intent.

Escape closes a child first, then the task surface. In an idle world Escape opens Pause. In a workstation it first cancels held selection; another Escape returns to the room with playback paused. In a running world playback session Escape settles/pauses and opens Pause. Closing Pause returns to the world, not automatically to running playback. On touch, every Escape action has a named visible equivalent.

### C4 — Committed progress, drafts, and repetition

Physical progress and playback follow Item 05. Task-view tabs, transient hover, uncommitted destination selections and drag ghosts do not change that progress. Repeated activation of the same pending physical action, cue, request or navigation does not duplicate it.

Text edits update the current session draft immediately. Acknowledged local saves preserve it across a compatible reload. Display **Saved on this device** only after storage acknowledgment; otherwise use the save status in §10. Closing a draft keeps it in the current session without a forced submission. An explicit **Save idea**, **Record my plan**, **Show Jo**, or **Help me think** creates the relevant deliberate snapshot; draft autosaving alone is not an explanation delivered to anyone. Empty fields are allowed for drafts. Require nonempty text only when the child explicitly records/delivers a **textual explanation**: then offer **Add an idea, or return to the room**. Evidence-only presentation, a saved comparison containing details/relationship but no prose, Help me think, and Show me a way all work without typing. Saving a completely empty idea with no details/relationship simply says **Nothing to save yet**. None of these form states blocks world actions, and source selection alone is not a reasoning statement.

Recommended shared length for short idea/explanation fields is 600 characters, matching the existing coaching-input limit. Show a character counter near the limit; preserve excess pasted text visibly with **Shorten this to 600 characters before sending** rather than silently truncating. Private unsent draft text can remain while the child edits it. The limit is a form rule, never a limit on exploration or a judgment of the child.

After any acknowledged edit, a new screen must not silently substitute an older draft. Selecting a different context (search/story) retains separate drafts. After reload, restore drafts with their context and mark recorded past plans as past, not predictions for a new arrangement. Draft persistence does not imply cloud accounts.

### C5 — Access rights versus information actually displayed

Access to a document and exposure to its parts are distinct. First physical inspection follows the legal approach/commit; a possessed note can be opened through the kit. An acquired record can be revisited without another physical trip. Only displayed words/frames/account/outcomes can support ordinary source-specific coaching or observation claims.

**Document-level clarification D06-01:** opening either legitimate E2 shared-post access gives later Notes access to the complete post package: recording, photo and posted message. It does not mark every component/frame seen. Hearing only Remy's spoken interpretation gives that quoted account, not an unopened recording file. This resolves the earlier ambiguous phrase “only discovered components available” in Item 05; it does not grant E3's hidden text or E5's unheard account.

E1/E4/E6/E7 are whole readable documents once legitimately opened; unscrolled text remains available but not counted as presented. E3 becomes available only after flattening/secure commit and readable presentation. E5's slate, Ari account and direct observation are separate origins: obtaining the slate does not conjure an unheard account. E8 collection makes the kit available, not its note text read. Partial sources must not be summarized with unshown conclusions on a card thumbnail.

For text, record passage exposure when its wording is presented in the reading viewport or equivalent accessible text. Do not require a minimum reading time, eye tracking, or scroll completion as a game gate. For E2, track individual frames and the end marker, or presentation of the exact full description. For an uncertain interrupted outcome, retain Item 05's possibly-exposed flag. These are conservative observation records, not a comprehension meter shown to the child.

### C6 — A disabled action explains the actual reason

Use visible named actions with an inline reason when the child needs to understand a missing prerequisite. Activating an unavailable action reveals/repeats its reason without discarding the current draft or view. Do not use disabled styling alone. Hide actions that have no meaning in that context, such as Collect at an already empty recess, and offer **Open your kit** instead. Reasons concern missing materials, current playback or a selected input, never an unread clue quota or incorrect theory.

## 3. Functional layouts and responsive behavior

These neutral schematics describe hierarchy and usable regions, not fonts, colors, final artwork or CSS implementation. Relative proportions are starting allocations; content and minimum target sizes take priority. Room coordinates remain Item 05's 120 × 80 system. Interface proportions below describe the separate application viewport.

Use the large layout only when the **remaining world area**, after controls, can display approximately 900 × 600 CSS pixels. Otherwise use compact layout, including when browser zoom or larger text causes that limit to be crossed. Never crop the room to retain an oversized toolbar.

### L.WORLD — exploration and immediate feedback

```text
+---------------------------------------------------------------+
| Stage | Bring Loop back and premiere The Little Bridge | Menu  |
+---------------------------------------------------------------+
|                                                               |
|              WHOLE ROOM / VISIBLE AVATAR                       |
|        object names on focus; doors remain visible             |
|                                                               |
+---------------------------------------------------------------+
| Last physical action caption — retained until replaced         |
| Move to…   Map   Notes   Help   [Kit, when possessed]            |
+---------------------------------------------------------------+
```

Allocate roughly 8% header, 76% world and 16% caption/access area; these are flexible bands. Goal button opens details. Map opens venue information. Notes groups Evidence, Compare, Timeline and My ideas; these are not four always-expanded panels. Help opens coaching. No task score, clue counter, timer or diagnostic dashboard. Caption is outside the room/projection; it may grow/wrap and trigger compact layout instead of covering a doorway.

Compact: room name/goal/Menu wrap above a complete scaled overview. Below it, two wrapping rows hold the same access controls, with Move to… prominent. A source or conversation can replace the overview temporarily only after C2 pauses the world. Focus order: room/goal → world actions or Move to list → Map → Notes → Help → Kit if present → Menu. Header/toolbar shortcuts remain available without requiring traversal of every scenery item.

### L.HOME — start, resume, and recovery choice

```text
           Evidence Quest
           Launch Day: Where's Loop?
           [saved-run summary OR new-game invitation]
           [primary Start / Continue]
           [secondary Start over, only with a run]
           [Settings]
           [saving/recovery information if applicable]
```

A centered single column uses about 60% width on large displays, full available width with margins on compact ones. Content scrolls if needed; the primary choice is near the top. No new character creator, account, job/hackathon information or saved screenshot containing unexposed clues. Saved summary is **Continue at [saved room]**, with the known pause mode if applicable, not a spoiler about rooms never visited. Focus title → primary action → secondary → Settings → recovery choices when present.

### L.SHEET — goal, objects, map, settings and recoverable lists

```text
+---------------- Title ------------------------- Close --------+
| short purpose / current state                                 |
|                                                               |
| named rows or groups; each has its own action and explanation   |
|                   scroll this body                            |
|                                                               |
+---------------- Back / Return to room -------------------------+
```

Large: centered surface about 65% width and up to 85% height over a stopped/dimmed world. Compact: use full readable area; title/Close and bottom return remain reachable, body scrolls. No dismissal by accidental backdrop click. Map body uses the four-node topology plus a parallel list; each room row has its name, selectable public description and **Go to [room]**. Object body lists only the current room's discoverable objects in Item 05 order; choosing an action closes the surface and queues its legal approach. Title → short status → row actions → return/close is the reading order.

### L.READER — sources, media, and Notes browsing

```text
+------------ Notes / source title ------- Back ------- Close ---+
| record list  | Author • event time • source origin              |
| (about 25%)  | [Text | Recording | Photo, as applicable]         |
|             | actual source text or selected media (75%)       |
|             | passage selection / frame controls / Enlarge     |
+-------------+-------------------------------------------------+
| Compare selected detail   Show…   My idea   Return to room      |
```

Large Notes browsing uses approximately 25% record list and 75% reader. Opening a source directly omits the unused record column. The reader body scrolls; source metadata, Back/Close and needed media controls remain accessible. The initial reader has no preselected passage. E2's landing view explicitly shows a first still plus message; Photo is a separate view, not an enlarged fictional full notice. Frame buttons and an end marker remain visible below the recording.

Compact: record list and reader are sequential views; Back returns to the list/selected record and saved scroll position. Text wraps at the selected reading size. Enlarge replaces the reader body with expanded text/media while retaining Back; it adds no new source content. A vocabulary definition is an owned child card with the exact existing definition and Close definition. Keyboard order: title/provenance → content selector if present → content/paragraph choices → media controls → compare/show/idea → Back/Close. Merely traversing an unexpanded tab does not expose its hidden content.

### L.COMPARE — two sources and a player interpretation

```text
+---------------- Compare details -------------------- Close ---+
| [Choose/change detail A]       [Choose/change detail B]         |
| Author + exact passage         Author + exact passage           |
|                                                               |
| My connection: [supports] [conflicts with] [happened before]     |
| My idea (optional): [short editable text]                       |
| [Save idea] [Show…] [Return to room]                            |
+---------------------------------------------------------------+
```

The two reading regions get equal width, about the upper 55% of the surface; relationship and idea occupy the lower portion. Both slots can be empty or partially filled. No suggested pairing or success color. Choose/change opens a passage picker owned by that slot. Compact stacks A then B above relationship/idea; both remain in the same scrollable surface with their author labels. Focus A control/content → B → relationship → idea → actions. Saving a one-source or text-only idea is allowed; two sources are a possible evidence basis, not a Save permission requirement.

### L.TALK — local conversation and presentation

```text
|                current stopped room / visible speaker         |
+-------------------- Jo ---------------------------- Close ----+
| speaker's actual short response; source origin when quoted     |
| [Ask about…] [Show evidence…] [Explain my plan…]                |
| [Return to room]                                              |
+---------------------------------------------------------------+
```

Large: dialogue occupies a lower band of roughly one third of the viewport; the world stays visible above and is paused. Compact: a speaker header, response and vertically stacked actions replace the world temporarily, with an explicit return. Topics are choices, not chat prompts that demand typing. Reply text remains until another selected reply or close. Long text scrolls in the response body. Source reading uses L.READER as an owned child and Back returns to this speaker/topic. Focus speaker/reply → topics → Show/Explain if relevant → return. A first Ari invitation is instead a dismissible world caption; it does not open this blocking panel automatically.

### L.PLAN — private ideas, recorded plans and addressed explanations

```text
+------ My idea / Tell crew my plan / Explain to Jo ---- Close ---+
| Context: search question OR current story arrangement          |
| [up to two optional source-detail slots, with authors]          |
| My idea: [one short editable field]                            |
| [Save idea / Record my plan / Show Jo — named by context]       |
| [Help me think]                          [Return to room]      |
+---------------------------------------------------------------+
```

Single column, about 60% large-screen width; full readable compact surface. Source slots take about one third, field another third, contextual actions the remainder; expand/scroll when text grows. No score or prefilled correct explanation. The context names the destination/question or the actual tile order, not an inferred mistake. On-screen keyboard may reduce height; body scrolls to keep the focused field and action reachable. Focus heading/context → optional source slots → field → named action → Help → Return. The primary action's wording always indicates whether this saves privately, records a crew plan, or delivers to Jo.

### L.COACH — assistance with a nonblocking request lifecycle

```text
+---------------- Help with this part ---------------- Close ---+
| Current question / arrangement                                |
| [My explanation, optional]                                     |
| [Help me think]          [Show me a way]                        |
| response or waiting/fallback/clarification region              |
| [source detail, only when eligible and actually requested]     |
| [Keep playing] [Cancel request, if pending]                     |
+---------------------------------------------------------------+
```

One-column task surface, about 45–60% large-screen width; full compact readable area. Response is below the child's retained text so authorship is clear. Waiting uses the same region and never covers Keep playing. A closed pending request becomes a small Help status, not a modal spinner. Response content never pops over gameplay by itself. Scroll the response body; keep Close/Keep playing reachable. Focus heading/context → explanation field → two distinct help choices → response/its eligible actions → Keep playing/Cancel. Returning a response does not steal focus from a field being edited.

### L.KIT — materials, inspection, and delivery context

```text
+--------------- Story kit — carried / on desk ------- Close ---+
| [Flower]       [One Boat]     unnumbered storage                |
| [Hill]         [Joined Boats]                                 |
| [Jo's note]    [Remy's note]                                   |
| [Collect story tiles / Arrange on Stage / Go to Stage]         |
| [Return to room]                                              |
+---------------------------------------------------------------+
```

Use the Item 05 2×2 storage order with equal emphasis. Actual local inspection text appears only after selecting a tile, using an owned reader with its frozen E8 description and no solved animation. Note tabs show author/title, not unread conclusions. Before collection, the physically opened caddy offers Collect; after collection, the action reflects its actual host and room. Compact stacks full-sized tile controls in the same order if the 2×2 cannot fit. Focus kit state → tiles → note tabs → primary physical action → return. No read-all completion marker.

### L.WORK — physical workstation, Arrange and Watch

```text
|             Stage: whole room with BOTH STORY BANKS            |
|             Pip / Grandma / seed remain distinguishable       |
+---------------- current cue / factual consequence ------------+
| Rack [available tiles] | Rail [actual ordered tiles + gaps]     |
| [Inspect] [Move/Swap/Replace/Return as selected]                |
| [Rehearse / Continue] [Show pad] [Stop] [More…] [Back to room]   |
+---------------------------------------------------------------+
```

Large: reserve a flexible lower working band around 25% of viewport, leaving the full room above. It must not cover Item 05's protected projection rectangle. Rack and rail receive roughly 30/70 of the arrangement row; all four rail tiles fit. Empty gaps identify insertion, occupied tiles identify swap/replace; destination labels explain the difference. The More menu contains Reset rehearsal and Clear rail with their scope descriptions. New game is under Menu, not here.

Running Watch keeps the cue/status, Stop and Back to room immediately visible; editing controls do not masquerade as live draggable puppets. Selecting Arrange pauses the current run first. Compact uses two presentations of the same workstation: **Arrange tiles** (readable rail/rack and named placement actions) and **Watch rehearsal/premiere** (enlarged whole puppet world with both banks, caption and playback actions). A persistent **Back to Stage** returns to the complete room overview. Switching presentation cancels uncommitted selection and preserves committed state; it never starts a run. Describe story now is always available in Watch and opens a read-only paused description. Source inspection can temporarily cover the projection only after pausing.

Keyboard order in Arrange: workstation/status → rack controls → current rail controls/gaps → selected-tile operations → Rehearse/Show/More → Back. In Watch: mode/current cue or consequence → Stop/Continue → Restart where relevant → Describe story now → Arrange → Back. Use the full mode-specific labels from §8; no ambiguous Restart button.

### L.DECISION and L.ENDING — confirmation, recovery, and completed result

L.DECISION is a compact single-column child surface: explicit consequence at top, safe Cancel/Keep playing first, deliberate action second. About 45% width on large screens; full readable width on compact. It has no unrelated actions and never defaults focus to erasing progress. Long consequences scroll without hiding both choices. A recoverable storage warning can use this shape without blocking ordinary in-session gameplay.

L.ENDING uses the completed Stage image/pose above (roughly 55%) and a short factual recap below. **After the premiere** introduces the optional authored Remy/Ari reactions in their own settings; Skip reactions remains visible. Recap actions are Return to Stage, Replay premiere, and Menu. Any actual before/after claim is the child's wording with its source references and support context, not a score. Compact stacks the same content and scrolls the optional reflection, while Return to Stage stays reachable. Focus completion heading → factual recap → optional actual reflection → Return → Replay → Menu.

## 4. Start, world, guidance, and navigation states

**Family contract:** L.HOME for startup; L.WORLD for activity; L.SHEET for Goal/Map/Move to. C1–C6 supply all inputs, persistence, cancel and responsive behavior. No startup or navigation state displays unseen clue content. Home owns title focus; world activity owns the avatar/current target; list views own their heading then named choices. Closing lists returns WORLD, with a fresh intent required. A startup record check changes no saved progress.

| State ID | Entry and visible state | Transition/action → result |
|---|---|---|
| `UI.HOME.CHECKING` | Initial load or Retry; title and “Checking saved progress…”; Settings available, Start/Continue not guessed before result. | `T.HOME.CHECK`: known no run → `UI.HOME.EMPTY`; valid run → `UI.HOME.SAVED`; failed read → `UI.RECOVERY.READ`; incompatible → `UI.RECOVERY.VERSION`; malformed → `UI.RECOVERY.DAMAGED`. A recoverable failure must resolve to choices, not an endless spinner. |
| `UI.HOME.EMPTY` | No saved case. Start and Settings; no Continue-shaped dead button. | `T.HOME.START`: Start initializes this case at Stage `(20,50)` → `UI.WORLD.IDLE` with `UI.GUIDE.OPENING`. No questionnaire. `T.HOME.SETTINGS` opens `UI.SETTINGS` with Home as caller. |
| `UI.HOME.SAVED` | Continue at actual saved room; if relevant, “A rehearsal/premiere is paused.” Secondary Start over and Settings. | `T.HOME.CONTINUE`: restore compatible committed state and legal owners → WORLD with paused run if one exists; do not auto-play. `T.HOME.OVER`: Start over → `UI.RESET.CASE`; Cancel retains saved run. |
| `UI.WORLD.IDLE` | Current complete room, avatar, local object cues and goal. Pointer/focus cue names the actual object action. | `T.WORLD.MOVE`: floor/object/door intent → `UI.WORLD.MOVING`; `T.WORLD.TOOL`: named toolbar access → relevant task view through C2. Escape → `UI.PAUSE`. |
| `UI.WORLD.MOVING` | Avatar follows legal route; modest “Going to [object/room]” cue and Stop walking control in action band. | `T.WORLD.ARRIVE`: at object A → `UI.WORLD.OPERATING`; at floor destination → IDLE; door crossing → destination IDLE with Item 05 pair/arrival. `T.WORLD.RETARGET`: new intent replaces path and uncommitted action. `T.WORLD.CANCEL`: Stop walking → IDLE at current legal feet. Opening a tool cancels this walk. |
| `UI.WORLD.OPERATING` | Avatar visibly pulls/opens/wakes/docks/collects at actual A. Caption belongs to the operation; no invisible instant “clue found” substitute. | `T.WORLD.COMMIT`: object's Item 05 commit → saved physical state and its reader/kit/workstation/IDLE destination; exact mapping §12. `T.WORLD.ABORT`: new intent/close resolves that object's pre/post-commit rule, then honors the new intent. Never reset every object to closed. |
| `UI.WORLD.CHOOSER` | Ambiguous overlapping targets after stopping the prior intent. L.DECISION-like named list of actual candidates, with Cancel; no automatic best-clue selection. | `T.WORLD.CHOOSE`: choose a target → MOVING to its A/default action. Cancel/Escape → IDLE with no pending action. Default focus is chooser heading, not an auto-selected object. |
| `UI.WORLD.BLOCKED` | “That space is blocked” / “I can't reach that from here.” Avatar remains controllable at safe feet; no modal grade. | `T.WORLD.RETRY`: a new legal intent → MOVING. Close feedback → IDLE. The last response remains available through Goal/recent status if it was replaced; no progress is lost. |
| `UI.GUIDE.OPENING` | Nonblocking first-run annotation: “You're the premiere captain. Bring Loop back and premiere The Little Bridge.” Nearby suggestion “Try the paper model's pull tab.” Dismiss available. | `T.GUIDE.MODEL`: first model commit replaces suggestion with “Try Preview at the rehearsal desk.” `T.GUIDE.PREVIEW`: Preview response leaves borrowing account/crew objects as choices. `T.GUIDE.DISMISS`: Dismiss or free exploration removes the annotation, not the goal or access. |
| `UI.GOAL` | `ACC.GOAL`, L.SHEET. Original assignment plus current physical opportunities; guidance is recoverable after dismissal. | `T.GOAL.ACTION`: choose an existing local object → MOVING; a known venue → `UI.NAV.MAP`; Return → WORLD. Suggestions never auto-select theories or expose unseen room contents. |
| `UI.NAV.OBJECTS` | `ACC.OBJECTS`, current room only. Group character/object default actions in Item 05 focus order; doors are separately named. Scenery summarized, PUP entities absent from Move to list. | `T.NAV.OBJECT`: chosen action closes list → MOVING, then operates at A. Unavailable action uses C6; Cancel → WORLD. No remote lid opening. |
| `UI.NAV.MAP` | `ACC.VENUE` or `WK.ACCESS.NAV`. Four connected room names and public descriptions; no unseen Ari/Loop location. Current room marked neutrally. | `T.NAV.DESCRIBE`: expand/read room description, exposing only its NAV text. `T.NAV.GO`: Go to [room] closes view and chains Item 05 door transitions; same-room choice returns WORLD. Canceling any segment stops travel, retains known NAV and current lead. |

The world goal uses physical progress rather than clue-reading status. Before Loop is found: “Bring Loop back and premiere The Little Bridge,” with optional **Look around / Ask the crew**. Once actually observed: **Bring Loop and the story kit to the Stage**, naming only known missing resources. With carried kit/following Loop at Stage: **Set the kit on the desk / Dock Loop**. With both delivered: **Try your story tiles in rehearsal**. With a current certified run: **Launch your premiere**. After historical completion: **Replay or try another arrangement**. An independently recorded lead can appear as **Your question: …**, explicitly separate from those physical facts.

## 5. Source, Notes, comparison, timeline, and theory states

**Family contract:** C2 pauses before reading; C5 separates availability/exposure. L.READER hosts sources/Notes; L.COMPARE and L.PLAN host their named tasks. Physical first reading preserves its exact Item 05 invoker and opening flag. Record/card access does not increment a clue score. All text remains until dismissed. Back/Close from a child source restores the same selected record/slot/speaker through `callerReturn`; Close on a root reader or explicit Return to room resolves `worldReturn`. The state variants below inherit the same input and reading-size behavior.

| State ID | Entry, purpose and visible content | Transitions, retained state and edge behavior |
|---|---|---|
| `UI.NOTES.EMPTY` | Notes opened before any document/account is available. “Your discoveries will stay here.” No eight empty clue slots or hidden titles. My ideas remains usable; Open your kit appears if physically possessed. | `T.NOTES.TAB`: Evidence/Compare/Timeline/My ideas opens the chosen family. `T.NOTES.KIT`: possessed kit → `UI.KIT.CARRIED` or physical rack access. Return → WORLD. No forced clue search. |
| `UI.NOTES.LIST` | Available document titles/authors and actually obtained accounts, with no spoiler summaries. Notes tabs are Evidence, Compare, Timeline, My ideas. Reopening the same E6 copy produces one canonical entry. | `T.NOTES.OPEN`: choose available source/component → `UI.SOURCE.TEXT`, POST or TILE as applicable. Show source location uses its known physical origin or carried/current kit host; choosing Go there initiates actual travel, not a new discovery. |
| `UI.SOURCE.TEXT` | Legitimate physical/readable source or acquired document. Exact title, author, event time, wording and unselected passages. E3 enters only after flat-and-secured commit; E6 can enter from owned kit. | `T.SOURCE.SELECT`: select a visible passage; add/replace a comparison/plan slot or Show. `T.SOURCE.ZOOM` → `UI.SOURCE.ZOOM`; `T.SOURCE.WORD` → `UI.SOURCE.WORD`; Back/Close via C3. Scrolling exposes actual text but is never required to travel. |
| `UI.SOURCE.POST` | Legitimately opened full E2 post: first still frame plus exact 9:13 message, with Recording and Photo choices. The first still has no destination/end-marker inference. | `T.POST.PLAY` → `UI.SOURCE.CLIP`; `T.POST.PHOTO` → `UI.SOURCE.PHOTO`; selecting message text can use E2.c. Returning to the post preserves last selected component/frame; old message stays historical after correction. |
| `UI.SOURCE.CLIP` | E2 clip selected, current frame and 9:12 recording metadata. Play/Pause, Previous frame, Next frame, three-position scrub control, Describe recording, Replay and Back. | `T.CLIP.STEP`: explicit frame choice displays that frame only; final frame displays “Recording ends here.” `T.CLIP.DESCRIBE`: show exact full E2.a description and record its exposure. Play shows three frames in order; at end stays on final frame without loop/autopan. Suggested pacing 1 second/frame, adjustable by manual stepping; not a comprehension timer. Close pauses at current frame. |
| `UI.SOURCE.PHOTO` | The curled photograph and “Part of the courtyard notice”; only CANCELED is exposed. | `T.PHOTO.ENLARGE` → ZOOM of the same partial image. Back → POST. No Flatten action on a photograph; inspecting the real `CY.SOURCE.E3` requires travel/physical operation. |
| `UI.SOURCE.ZOOM` | Enlarged current text/media, same source and exposure boundaries. | `T.SOURCE.UNZOOM`: Back → prior source at same component/scroll. Choose word definition replaces this child content and returns here afterward, without stacking multiple zoom views. |
| `UI.SOURCE.WORD` | Existing v3 tap definition, e.g. “premiere: the first public showing.” | `T.SOURCE.WORD.CLOSE`: Close definition → prior reader with focus on that word. No solution content or ability label. |
| `UI.SOURCE.PICK` | Owned by comparison/plan/presentation. Choose available source, then expand an exact passage; nothing is selected automatically. Full available document text can be opened here and newly exposed legitimately. A separate **Venue information** group includes presented NAV references, explicitly NAV.MEDIA after reading its public description. | `T.PICK.USE`: Use this detail → owning slot/view; `T.PICK.CANCEL`: unchanged owner. E4 and NAV.MEDIA can occupy the two slots without NAV becoming principal record #9. An **Open venue information** action can open the Map as an owned child to read a missing description, then return to this picker. Two physical copies map to the same canonical passages. Unavailable E3/E5 parts are not offered. |
| `UI.COMPARE.EMPTY` | `ACC.COMPARE`, zero slots, optional relationship/idea. Prompt “Choose details you want to look at together.” | `T.COMPARE.CHOOSE`: Add detail → PICK with destination slot. Writing an idea saves draft via C4; Save idea can record a text-only thought. No compulsory two-source lock. |
| `UI.COMPARE.PARTIAL` | One chosen detail, other slot empty; author remains visible. | Add/change/remove through PICK; result zero → EMPTY, two → READY. `T.COMPARE.REMOVE` retains the draft/relationship without inventing a missing second reference. |
| `UI.COMPARE.READY` | Two exact details with authors. Supports/conflicts with/happened before are the child's chosen relationship, not a system verdict. | `T.COMPARE.RELATE`: select/change relationship, retain it as interpretation. `T.COMPARE.SAVE`: Save idea records actual text/details/relation → `UI.IDEA.RECORDED`; Show… → presentation selection. Same-source comparisons allowed, but never counted as two independent sources. |
| `UI.TIMELINE.EMPTY` | `ACC.TIMELINE`; no known timed records. “Times from your discoveries will appear here.” | Return/other Notes tab; no inferred past events filled in. |
| `UI.TIMELINE.KNOWN` | Known event-time rows, source origin, event type and optional discovery order. Explicit examples: E4 9:05 request/plan; E3 9:10 notice/announced plan; E2 9:12 recording and 9:13 post only when their metadata is presented; E5 9:18 capture only after slate. | `T.TIMELINE.SOURCE`: Open source → matching reader. `T.TIMELINE.VIEW`: Event times / Discovery order changes sort only. Equal event times keep source order; unknown exact times show “During your visit,” never an invented timestamp. No dragging events to rewrite history. |
| `UI.IDEA.DRAFT` | `ACC.THEORY`, My ideas, or source→My idea. Private field with optional details; label “Only saved as your idea.” | `T.IDEA.SAVE`: Save idea → RECORDED snapshot. `T.IDEA.CLOSE`: retain draft, return. `T.IDEA.HELP` opens help with this text only after explicit action. No NPC knows it merely because it was typed. |
| `UI.IDEA.RECORDED` | Actual saved thought, refs and context; previous version available only when a revision exists. Record status is factual, with no correctness tick. | `T.IDEA.EDIT`: new draft of this thought → DRAFT; new save records a revision retaining previous snapshot. `T.IDEA.LEAD` → `UI.LEAD`; Show… → PRESENT.SELECT. |
| `UI.LEAD` | Supported authored question choices from v3, current question and known destination choice. Free-form unsupported ideas remain notes. | `T.LEAD.SET`: Follow this lead records question and highlights chosen already-known destination; returns WORLD without traveling. **Go to [room]** is a separate `T.NAV.GO`. No implication that a hypothesis is true. |

**Concrete reader example:** Jo's note displays the exact E6.a promise, **“I'll come to your hill, and we'll plant this seed together before dark.”** Selecting that passage and E7.a about the single boat can populate Compare. The interface does not prefill “Pip also needs a bridge.” A child can write that connection, act without writing it, or choose a different supported plan.

**E5 treatment:** Notes shows separately obtained slate/account/observation under one E5 grouping. Direct arrival exposure can read **“You saw Loop in Media during your visit.”** After retrieval, that historical card does not say Loop remains there. A current room/Goal statement follows actual Loop state. Ari's unheard account is not unlocked by a slate click.

## 6. Local conversations, evidence delivery, and optional plans

**Family contract:** L.TALK/L.PLAN with C2–C6. Talk/Show/Explain addressed to an NPC operates only at the actual Item 05 approach. An available private/crew tool opens in place. Source-selected text remains distinct from the child's statement. Deliveries record only actually supplied content; C3 restores the surviving NPC/access control. No dialogue blocks the child from closing and walking away.

| State ID | Entry and visible controls | Transition/action → next state and retained result |
|---|---|---|
| `UI.TALK.TOPICS` | Actual local NPC reached. Current short acknowledgment plus knowledge-bounded topic buttons, Show evidence and relevant note/plan access. Ari gives all available materials/topics immediately. | `T.TALK.ASK`: choose topic → `UI.TALK.REPLY`. `T.TALK.SOURCE`: explicitly ask for a note/account → its reader at same canonical origin. Show evidence → PRESENT.SELECT. Close → WORLD. |
| `UI.TALK.REPLY` | Exact v3/Item 05 response for actual NPC knowledge, supplied details and selected topic. Text stays until dismissed/next choice. | `T.TALK.BACK`: topic list; Show again uses current knowledge; requested help → coaching/direct authored branch with assistance recorded when shown. A neutral unsupported combination says “I don't have anything to add from that.” |
| `UI.PRESENT.SELECT` | `ACC.PRESENT`, source Show… or NPC Show evidence. Current exposed details listed for deliberate selection; no unopened conclusions added under “whole record.” Recipient groups: **Here** and **People you've met elsewhere**, with only legitimately known room locations. Unmet Ari is not listed as being in Media. | `T.PRESENT.REVIEW`: choose recipient/details → REVIEW. “Show opened details” includes only the record's actually exposed portions. Empty selection shows “Choose a detail to show”; Return remains available. |
| `UI.PRESENT.REVIEW` | Preview exactly what will be shown and to whom. Primary **Show [name]** when local. For a known character elsewhere, primary **Go to [name]'s room**; no promise of remote reply. | `T.PRESENT.SHOW`: local recipient → `UI.PRESENT.APPROACH`. `T.PRESENT.TRAVEL`: remote room → MOVING with presentation draft retained; arrival does **not** deliver. Child chooses Show there. Edit returns SELECT; Cancel keeps draft, no knowledge change. |
| `UI.PRESENT.APPROACH` | Visible walk toward recipient A, caption “Going to show [name] your selected details,” Cancel available. | `T.PRESENT.DELIVER`: reach A, deliver current snapshot once → TALK.REPLY; NPC gains only conveyed facts. New destination, editing content or cancel invalidates old delivery intent and retains draft. A late old intent cannot deliver after the change. |
| `UI.PLAN.PRIVATE` | L.PLAN, private search/story draft and actual source/arrangement context. No recipient has received it. | Save idea → IDEA.RECORDED; **Record my plan** → PLAN.RECORDED through `T.PLAN.RECORD`; **Show Jo** → PLAN.ADDRESSED if in Stage, otherwise travel-only offer. Help me think → COACH.ENTRY with explicit context copy. |
| `UI.PLAN.RECORDED` | Saved in-place crew plan: “Your plan is recorded.” No simulated Jo reply. Includes actual time/context and any prior revealed outcome internally. | Edit → PRIVATE; Go to chosen known destination → MOVING only on explicit Go; **Show Jo** explicitly changes recipient/delivery intent. Close returns caller/WORLD. |
| `UI.PLAN.ADDRESSED` | Child chose **Explain this plan to Jo** from workstation/Jo, or Show Jo on a draft. Preview short text and actual references; no compulsory two-reference form. | `T.PLAN.DELIVER`: local Stage Jo is approached before delivery; use PRESENT.APPROACH, then TALK.REPLY. Outside Stage, **Go to Stage** travels only with draft retained. Cancel before delivery conveys nothing. |

Jo's full E3 acknowledgment requires both E3.a scope and E3.b status actually known from supplied evidence before quoting the notice's continued-premiere line. The same constraint applies to Remy's full correction. Presenting only the scope passage can yield a scope acknowledgment, not a claim the child read or delivered the rest. Showing a note does not automatically create a player reasoning statement; that requires the child's actual words.

An addressed explanation does not implicitly send a model request. The authored NPC response acknowledges/clarifies within its knowledge; **Help me think** separately asks for explanation-sensitive coaching. Explicit source/whole-solution requests can supply the existing authored assistance without requiring the service. No screen requires polished grammar or exact wording to travel or rehearse.

An arbitrary delivered plan adds **“the child proposes X”**, not X as story truth. Without an explicit coaching request, the authored response is the neutral **“Let's see what your plan makes happen”** or the existing topic-specific factual response. Correct-looking source selections cannot trigger a fabricated semantic approval of the child's sentence. Verified presented facts can update NPC knowledge; hypotheses remain attributed ideas.

## 7. Kit, source copies, and physical collection states

**Family contract:** L.KIT plus L.READER for inspections. All first physical access obeys Item 05 approaches. Collection/delivery operates in the world via C2 and returns to the surviving owner. Pointer/tap and named native actions are equivalent; cards never demand drag pickup. Unread leaflets are visibly available but carry no invented “read” flags.

| State ID | Entry/content | Action and destination |
|---|---|---|
| `UI.KIT.CLOSED` | `MD.ACCESS.E8` is closed; cue Open story-tile rack and an available Collect story tiles action via local object control. | `T.KIT.OPEN`: approach/open → OPEN at lid commit. `T.KIT.COLLECT`: combined open-and-collect uses same physical sequence; individual tile/note reading not required. Canceled opening retains actual closed/open milestone. |
| `UI.KIT.OPEN` | Four equal unnumbered tiles and two note tabs; Collect story tiles, Inspect and Return. Mounted Media reference copies remain separate local targets. | Inspect tile → SOURCE.TILE; leaflet → SOURCE.TEXT at kit origin; Collect → WORLD.OPERATING then CARRIED at collection commit. Cancel before collect retains open caddy; after commit it is possessed. |
| `UI.KIT.CARRIED` | `ACC.KIT`, carried caddy with unread/opened note tabs, tile inspection and current Stage destination. Caption “You have the story kit.” | Note opens in hand without remote room access. **Go to Stage** uses actual doors and does not auto-seat on arrival. Stage rail/bay/control handoff actions are offered only while actually in Stage; selecting one closes view and enters HANDOFF. Repeated collection opens this view rather than adding another kit. |
| `UI.KIT.HANDOFF` | At Stage, selecting rack/rail/playback while carrying queues rack A `(55,58)`, visibly seats the caddy, then the originally chosen workstation approach. | `T.KIT.SEAT`: seated contact → `UI.KIT.SEATED`, then requested work action. Cancel before seat retains carried host; after seat retains delivered host even if further walking cancels. No seat at the room entrance. |
| `UI.KIT.SEATED` | Stage rack has available tiles and both leaflets; rail owns tiles already placed. Inspect/read uses rack A for first physical access. | **Arrange story tiles** → work state at rail A. Already acquired source text can reopen remotely from Notes. `ACC.KIT` elsewhere offers **Go to Stage** plus acquired evidence access; unread seated notes are not remotely opened through a lost carried-kit control. |
| `UI.KIT.VACANT` | Media recess after collection: “You have the story kit.” Fixed Jo/Remy notes still named and reachable. | Open current kit if carried; if seated, Go to Stage. Reading mounted copies uses original Media A and canonical E6/E7. No disabled Collect mystery. |
| `UI.SOURCE.TILE` | Selected tile face plus only its frozen local E8 description: One Boat “Send one boat across.” Joined Boats “Join the little boats.” Hill “Begin the hill planting scene.” Flower “Try the lantern-flower cue.” | Back → same kit/workstation selection; no puppet action or success exposure. Tile tilt/enlargement is cosmetic; no solved chain runs here. |

On collection, focus returns to the current kit header/primary action, not the removed Media caddy's button. On seat, it goes to the originally requested workstation action if that queue is still current; if canceled, to the local rack control. Both duplicate mounted notes remain available after these transitions. Possession enables first reading through the appropriate physical host, while canonical identity remains E6 or E7 across all copies.

## 8. Workstation, tile actions, playback and show states

**Family contract:** L.WORK; existing `ST.CONSOLE`, `ST.RAIL`, `ST.RACK.BAY`, `TILE.*` and `ST.CONTROL.*`. First physical workstation use approaches its actual A and includes kit handoff if carried. Reentering from another room also approaches before operating; Stop is the existing immediate owned session action while running. C2 applies when reading, inspecting, editing, opening More/Help or leaving. C3 governs input and focus, with the selected tile/destination as focus owner inside the work band. All committed order/revision/ownership/run facts follow Item 05; historical premiere completion is separate.

### 8.1 Physical readiness and arrangement surface

| State ID | Visible situation and action availability | Transition/action → result |
|---|---|---|
| `UI.WORK.NEEDS_KIT` | Empty rack; missing-kit reason. If Loop absent, Show pad remains Preview and projection blank; if docked, initial puppets and Launch label appear. “Collect the story tiles for this rail.” No reading requirement. | `T.WORK.MISSING`: Arrange/Rehearse/Launch explains actual missing resources in place; **Return to room** allows retrieval. If kit carried, route through HANDOFF before this selector is evaluated. A kit collection itself does not dock Loop. |
| `UI.WORK.NEEDS_LOOP` | Delivered caddy/notes and editable rail; blank projection. “Bring Loop to the dock to project the story.” Show pad is Preview before first docking. | `T.WORK.EDIT`: tile actions work normally, retaining this physical readiness state. Rehearse explains missing docked Loop. Dock through `ST.DOCK` transitions to EMPTY/READY according to order. |
| `UI.WORK.EMPTY` | Both materials delivered, no tiles. Available rack controls and start gap; no suggested recipe. | `T.RUN.REHEARSE`: Rehearse starts/ends an empty run with initial puppets, “There are no story tiles on the rail yet,” no certification, returns EMPTY. Tile selection → RAIL.SELECTED. Show pad explains first rehearsal requirement. |
| `UI.WORK.READY` | Both delivered, committed nonempty order not certified, no active run. “Ready to rehearse.” | Rehearse → RUN.STARTING; Show → `UI.WORK.SHOW_CHECK`; Arrange/Inspect/notes/help remain usable. Current old premiere fact, if any, does not bypass the check. |
| `UI.WORK.CERTIFIED` | Current full rehearsal finished successfully. Actual final pose and “This arrangement is ready for the premiere.” Show pad Launch or Replay premiere depending on historical completion. | `T.RUN.SHOW`: Show → RUN.STARTING in show mode. Actual rail edit/reset removes current certification; merely viewing/canceling selection does not. Rehearse explicitly starts a new rehearsal and clears current certification as specified. |
| `UI.WORK.SHOW_CHECK` | Inline current prerequisite reason at same pad; no new quiz/modal. Missing kit/Loop takes priority, then “Try this arrangement in rehearsal first.” | **Rehearse** follows readiness rules; Return/Edit returns corresponding work state. `T.SHOW.CHECK` cannot create a show or completion. The pad does not require an explanation, AI result, source count or shortest plan. |
| `UI.WORK.MORE` | Owned menu with **Reset rehearsal — keep your tiles in order** and **Clear rail — return the tiles to the rack**. Opening settles/pauses active playback and cancels held selection. | `T.WORK.RESET`: reset puppet/index/run/current certification; order and investigation retained → EMPTY/READY/readiness state. `T.WORK.CLEAR`: same plus empty order/returned tiles; increment revision only if order changed. Cancel closes menu, keeps paused state; no whole-case confirmation added. |
| `UI.RAIL.SELECTED` | One tile selected from rack or rail; origin remains authoritative. “Choose where to put [tile].” Valid gaps and occupied destinations have explicit meanings; Cancel selection and Inspect available. | `T.RAIL.DESTINATIONS`: keyboard/touch destination list → RAIL.DESTINATIONS; direct drag/tap destination commits through operation table below. Inspect → SOURCE.TILE after safely canceling the held representation, retaining source tile focus. |
| `UI.RAIL.DESTINATIONS` | Named valid choices, e.g. Insert before Hill, Swap with Flower, Replace Hill, Return One Boat to rack. Only actions meaningful for this origin are offered. | `T.RAIL.COMMIT`: apply chosen operation once → readiness/READY with new order and reset puppets if actual change. `T.RAIL.CANCEL`: unchanged committed order/revision; return to prior paused/ready state and focus original tile. Invalid drop returns to origin; no mutation. |

No-op placements leave certification intact. Selecting a rail tile provides Inspect, Move left, Move right, Swap with…, Move between…, Return tile and Cancel; selecting a rack tile provides Inspect and destinations. These are contextual controls, not a permanent row of unexplained commands. Ends show why Move left/right is unavailable. All playback/reset actions first cancel an uncommitted selection; they never implicitly drop it into a guessed position.

| Transition ID / chosen destination | Exact committed operation and visible response |
|---|---|
| `T.RAIL.INSERT` | Rack tile into gap: insert at that index, shift later tiles right; snap into place and announce “[Tile] placed before/after [neighbor]” or “at the start.” |
| `T.RAIL.REPLACE` | Rack tile on occupied rail tile: replace it; displaced tile visibly returns to its own rack cell. Caption names both. |
| `T.RAIL.SWAP` | Rail tile onto another occupied rail position: exchange the two once; announce both final places. |
| `T.RAIL.MOVE` | Rail tile into a gap or Move left/right: relocate/adjacent-swap and compact the rail; no extra tile copy. |
| `T.RAIL.RETURN` | Rail tile to rack: return it and compact remaining order. |
| `T.RAIL.NOOP` | Same final position/end-limit action: no order/revision change. Brief factual position message; retain current certification. |

Every actual edit invalidates the old run for continuation, resets puppets and clears certification, while preserving past observation/completion history. Opening Arrange or merely selecting/canceling pauses an active run but retains its unchanged revision. Announce **“Your arrangement changed. Rehearse this version.”** only on an actual change. If no Loop is docked, the projection stays blank while that same arrangement behavior still works.

### 8.2 Run lifecycle and mode-specific controls

Playback retains Item 05's saved **mode** values `rehearsal` or `show`, plus revision, next cue, stable puppet state and whether end finalization is pending. The child sees **Rehearsal** or **Premiere** respectively; no new persisted mode value is introduced. All state below is retained on normal leave/save, and restored paused on compatible resume.

| State ID | What the child sees / available actions | Transition and consequence |
|---|---|---|
| `UI.RUN.STARTING` | Current committed order snaps into the chosen run's initial story setup. Mode heading “Rehearsal” or “Premiere.” Stop/Back remain available. | `T.RUN.BEGIN`: start first cue → REHEARSAL or SHOW. Duplicate Start/Show is ignored. Rehearse snapshots current revision and clears current certification; Show requires current certification and starts same order fresh. |
| `UI.RUN.REHEARSAL` | Whole story, current tile indicated neutrally, factual cue caption; **Stop**, Arrange, Describe story now and Back to room. | `T.RUN.CUE`: commit one cue endpoint; ordinary success/no-op → next cue; unmet Hill/Flower → UNMET; normal last cue → evaluate full result, FAILED or CERTIFIED. New physical/reading intent uses C2. |
| `UI.RUN.SHOW` | Same actual actions from same initial state, heading “Premiere,” stage presentation, immediate Stop. | Cues use the same engine/rules; normal successful full finish → ENDING.CELEBRATION. No concurrent Rehearse/Show can start. An impossible failure in a supposedly valid saved show is a recovery inconsistency, not a fabricated completion; pause and offer rehearse under UI.RECOVERY.RUN. |
| `UI.RUN.UNMET` | Hold the actual Hill/Flower consequence. Example: “Grandma has the seed. Pip is still across the river.” No red grade or prefilled answer. | **Continue rehearsal** → next cue or terminal evaluation; **Restart rehearsal**, Arrange, notes, Help, Describe story now, Back remain available. `T.RUN.UNMET_CONTINUE` never changes the unmet cue's already committed result. A harmless Ferry is not an unmet condition and does not enter this state. |
| `UI.RUN.PAUSED` | Stable scene and “[Rehearsal/Premiere] paused.” Next unfinished cue indicated by tile name, not an assumed solution. | `T.RUN.CONTINUE`: unchanged revision → next cue in saved mode. `T.RUN.RESTART`: explicit mode-specific restart from initial state; details below. Arrange/source/help/Back preserve pause. |
| `UI.RUN.TERMINAL` | Final cue already committed by an interruption; “[Rehearsal/Premiere] paused after its last cue.” Button **Continue to finish rehearsal/premiere**. | `T.RUN.FINALIZE`: finalize this existing full run once, without replaying a cue → FAILED/CERTIFIED or ENDING.CELEBRATION. Cancel/leave keeps finalization pending. Stop alone is not completion. |
| `UI.RUN.FAILED` | Full rehearsal ended with its actual unresolved state. “Rehearsal finished,” followed by the factual state description; no score. | Arrange, Rehearse, Read notes, Help and Back available. Show opens SHOW_CHECK. A second unsuccessful run can expose a small dismissible “Want help with this plan?” offer; it never automatically supplies an answer or diagnoses ability. |
| `UI.STORY.DESCRIBE` | `ACC.STORY.STATE`, read-only description of current Pip/Grandma/seed/bridge/root/light state after pausing. Both-bank enlarged view and text equivalent available. | `T.STORY.CLOSE`: return to caller Watch/room, run remains paused. No cue, recipe or unread note is executed/read by describing the visible state. |

**Stop and leave:** `T.RUN.STOP` settles the active cue once and enters PAUSED or TERMINAL if it was the last cue. `T.RUN.LEAVE` does the same, closes workstation and allows the selected route. When returning from another room, the projection shows the saved state, while a compact **Rehearsal/Premiere paused — Open workstation** access invites a legal approach. No playback begins merely on room entry. If a run is paused while a task view is open, closing that view restores its saved mode and controls, without auto-continuing.

**Three deliberately distinct actions:**

- **Restart rehearsal** (`T.RUN.RESTART.REHEARSAL`): start the same current order fresh in rehearsal mode; clear current certification.
- **Restart premiere** (`T.RUN.RESTART.SHOW`): restart a paused show fresh only with its unchanged current certified revision. If invalidated, explain that rehearsal is required instead.
- **Reset rehearsal** (`T.WORK.RESET`): restore initial puppets and idle state, retain order, do not start playback.

While already running, Rehearse and Show have **“Stop this run first”** feedback and cannot launch another run. Stop/inspection/edit is the explicit interruption. A mode-specific Continue cancels any uncommitted held selection. If the arrangement was actually changed, no old Continue is offered. All five valid arrangements retain the same payoff; a trailing Ferry performs its harmless action before the full run ends.

### 8.3 Exact meaningful consequence surfaces

| Actual puppet state | Watch/Describe content | What it must not do |
|---|---|---|
| Initial | Pip and seed on left; Grandma on hill across river; bridge broken, boats separate, seed unplanted/dark. | Demonstrate the solved sequence on first docking. |
| Ferry before crossing | Seed visibly reaches Grandma; Pip remains left. “The seed crossed. Pip is still on the other bank.” | Call Ferry wrong or move Pip with it. |
| Hill while Pip left | Hold Grandma waiting and Pip visible across river; if seed is also left, describe both missing arrivals. | Say “Add Joined Boats” without a separately requested hint. |
| Flower before planting | Actual loose seed stays dark wherever it is. “The seed is still unplanted.” | Glow the unplanted seed to reward guessing or obscure the prerequisite. |
| Bridge with seed already right | Pip crosses and joins Grandma/seed. | Penalize the earlier Ferry or fake a second seed. |
| Joint planting, then Flower | Both plant, roots appear, then lantern-flower lights both banks; backpack remains visible. | Assert that watching/solving establishes comprehension of two texts. |
| Harmless late Ferry | Empty boat bobs, completed planted/lit state remains. | Undo planting, force a misconception pause, or disqualify this valid extra cue. |

## 9. Coaching request, fallback and response states

**Family contract:** L.COACH, `ACC.COACH`, C2–C6 and v3 §11. Opening Help first records any cue outcome its opening settles; only then capture the optional explanation/context. Merely opening Help does not send a request or reveal an answer. The field is optional; a direct authored hint is available without writing. Responses are assistance only when actually made readable. A backend result waiting behind a closed panel is not yet delivered help.

The UI has one active request opportunity. A replacement cancels the previous display opportunity. Relevant changes to source exposure, theory text, selected context, room, rail revision, puppet state or newly delivered assistance invalidate advice tied to the older context. Selecting Show me a way cancels any pending or held live response and takes ownership as the sole current authored answer, just as accepting fallback does. Store the submitted snapshot separately from the continuing draft. Canceled/stale requests cannot alter game facts or overwrite the child's revised text.

| State ID | Visible content / choices | Transition and retained state |
|---|---|---|
| `UI.COACH.ENTRY` | Current question/arrangement, optional explanation and **Help me think / Show me a way / Keep playing**. No invented mistake. | `T.COACH.THINK`: nonempty permitted explanation → PENDING; empty explanation → TOPIC. `T.COACH.DIRECT`: direct request → DIRECT immediately, with no second confirmation. Close keeps draft and creates no request. |
| `UI.COACH.TOPIC` | “Which part do you want help with?” Choices: the currently relevant search question or story plan, with only known/local context. No required wording exercise. | `T.COACH.TOPIC`: selected topic displays eligible authored attention help or a neutral clarification. Record the actual local support; do not claim a live meaning analysis of an empty sentence. Child can add text and explicitly request explanation-sensitive help. |
| `UI.COACH.PENDING` | Submission accepted; small “Getting help…” indication, retained submitted explanation and editable draft, Cancel request, Keep playing. | `T.COACH.WAIT`: after proposed 2 seconds → WAITING. Valid current reply → RESPONSE if view open, READY_CLOSED otherwise. Invalid/service failure → FALLBACK_OFFER. Editing relevant text/context → STALE, preserving new draft. |
| `UI.COACH.WAITING` | Quiet “Still working on your question.” Child can close/continue, cancel, or edit; no blocked game. | At proposed 8 seconds `T.COACH.OFFER` → FALLBACK_OFFER. Valid current reply before offer renders only under the response-display rule. Timing targets are not proven service guarantees. |
| `UI.COACH.FALLBACK_OFFER` | “You can use a prepared hint while you wait.” **Use a prepared hint**, Cancel request, Keep playing; for explicit service failure, Retry help is also available. The hint content itself is not displayed yet. If the panel is closed at the eight-second/failure transition, retain this offer behind a quiet **Help available** marker; never open the panel or display hint text automatically. | `T.COACH.FALLBACK`: accepting commits local fallback as the sole reply → RESPONSE or CLARIFY, records assistance on display, and invalidates a late live answer. If live reply arrives after this offer, show a separate **View new reply** option; do not replace a focused fallback button under the pointer. Whichever is selected wins once. |
| `UI.COACH.READY_CLOSED` | Help surface closed; small **Help is ready** marker only, with no clue text or focus steal. Gameplay continues. | `T.COACH.OPEN_READY`: reopen, revalidate against current context, then RESPONSE if current or STALE if obsolete. New relevant world event can discard held reply before it is ever exposed. |
| `UI.COACH.RESPONSE` | Child's submitted wording above a distinct help response. Eligible canonical references may open their actual source; actual assistance level/content recorded when readable. | **Keep playing** returns WORLD; **Ask again** explicitly submits a new snapshot; **Show me a way** gives DIRECT; reference click opens reader and applies exposure/staleness rules. Close retains draft and already shown response as past help, not fresh advice. |
| `UI.COACH.CLARIFY` | Example “Do you mean Pip, the seed, or one of the story tiles?” No confident diagnosis. | Choose/type clarification → ENTRY with updated draft; Help me think explicitly resubmits. Close/Keep playing remains available. A local fallback unable to interpret also uses this neutral route. |
| `UI.COACH.DIRECT` | Current authored level-4 response, delivered because Show me a way was selected. No typing, note count, service access or confirmation gate. | `T.COACH.DIRECT_CLOSE`: close returns WORLD with actual solution exposure retained. It does not place tiles, move the avatar or mark unread notes read. A new context uses a newly selected appropriate direct answer. |
| `UI.COACH.STALE` | If open: “Your plan or situation changed. Ask again about this version.” Old response content is not inserted. If closed: remove stale ready/wait marker quietly. | **Ask about this version** → ENTRY/PENDING with explicit request; Keep playing preserves current draft/world. Prior submitted text remains a historical submission, not current advice. |
| `UI.COACH.CANCELED` | No pending request; “Request canceled. Your idea is kept.” | `T.COACH.CANCEL`: ignore late result for this request; return ENTRY or WORLD. Closing alone is not Cancel request: it preserves a current background request until it resolves, expires to an offer, or becomes stale. |

### 9.1 Concrete response bindings and display rules

- With E6 actually presented and the child writes **“The seed got across, so the promise is done,”** eligible help can ask **“What did Pip promise Grandma he would do?”** It cannot pretend the child already supplied a two-source connection.
- With only E2's partial photograph, ordinary help may ask **“How much of the notice can you see?”** It cannot quote hidden E3. The clip-stopping-point hint requires the relevant frames/end marker or full description exposure, not just the first still.
- **“Send the seed first, then Pip crosses and plants with Grandma”** is a coherent alternative. A valid response accepts it; it does not require removing Ferry. If learned through observed rehearsals while notes remain unread, acknowledge that plan without fabricated note references.
- Selecting **Show me a way** while still searching can give the existing authored Media/Workshop direction if Loop is still there. After recovery it instead addresses actual remaining resources or the rehearsal; it cannot send the child after an already docked robot.
- At the rail, direct help uses the existing **“Use Joined Boats before Hill, then Flower. Your One Boat step can stay if you want.”** Record introduced facts and level-4 exposure; no whole-source reading flags are set.

If an open view is being edited, a arriving reply must pass revision checks before display; do not overwrite the field. If fallback has been accepted, discard later live output. If a ready reply is reopened after Media arrival or rail change, discard it rather than supplying an obsolete search/plan recommendation. When returning to an already displayed past response, label it **Earlier help** if context differs; showing history is not a new valid current recommendation.

Ordinary NPC dialogue, locally prepared hints, direct authored answers and model-selected help remain distinct in observation records. Child-facing wording can say **Prepared hint** for fallback, without exposing model names, internal tags, token counts or validation errors. No provider is selected here. Neither waiting nor service failure disables the room, materials, rail or Launch. Accessibility enlargement is access support; a revealing hint is answer support; these are not collapsed into one penalty category.

## 10. Pause, settings, saving, reset and recovery

**Family contract:** L.SHEET for Pause/Settings, L.DECISION for actual risk/recovery choices, L.HOME for start. C2 settles actions before pausing; C3 restores focus. Home-origin Settings returns to Home, not to a room that has not been entered. Case progress and application accessibility/audio preferences are separate: New game clears the former and retains the latter. This is a recommended interface decision consistent with resetting the case.

Save status is passive and independent of the active task. Changes remain usable in the current visit even if durable saving fails. A **Saved** claim requires acknowledgment of the corresponding latest edit, not merely initiating a write. No export/import system, account or cloud-sync feature is added.

| State ID | Visible situation / choices | Transition, persistence and recovery behavior |
|---|---|---|
| `UI.PAUSE` | Menu or world Escape; “Paused,” **Return to festival**, Settings, Back to start, Start over. Current run mode shown if paused. | `T.PAUSE.RETURN`: WORLD with paused cue still paused. `T.PAUSE.SETTINGS` → SETTINGS. `T.PAUSE.HOME` → HOME.SAVED retaining current session run; detail below. Start over → RESET.CASE. |
| `UI.SETTINGS` | Sound On/Off; Motion Standard/Reduced; Text Regular/Larger/Largest; Spacing Standard/Roomier; Controls instructions; Back. No unavailable read-aloud or voice feature is advertised. | `T.SETTINGS.CHANGE`: apply immediately, keep current run/draft, preserve focus across reflow; attempt preference save with truthful status. Back returns to actual Home/Pause/task caller. Controls shows existing pointer/key/non-drag instructions. If Home's save check completes in background, update Home underneath without closing Settings or stealing focus. |
| `UI.SAVE.PENDING` | Small “Saving…” status accessible from Menu; no modal or repeated announcements per keystroke. | `T.SAVE.ACK`: latest requested revision acknowledged → SAVED. An older acknowledgment cannot falsely clear newer pending edits. `T.SAVE.FAIL`: failure → SESSION; retain current live progress. |
| `UI.SAVE.SAVED` | “Saved on this device,” with no cross-device claim. Status can collapse visually after acknowledgment, still available in Menu. | Next committed change → PENDING. Closing a source does not discard its acknowledged draft/exposures. |
| `UI.SAVE.SESSION` | Actual storage failure/unavailability: persistent small “Progress can't be saved on this device.” Open details: **Keep playing**, **Try saving again**. Current run remains playable. | `T.SAVE.RETRY`: attempt saving the latest current state, not an older checkpoint; success → SAVED. Failure retains SESSION and current progress. Opening details applies C2; failure itself does not freeze gameplay. |
| `UI.RECOVERY.READ` | Startup cannot reliably read saved progress, distinct from known no save. “Saved progress couldn't be checked.” Retry, Play without saving, Back/Settings. If check has not resolved after a proposed 5-second UI budget, show these choices; never infer an empty slot. | `T.RECOVERY.RETRY`: CHECKING. **Play without saving** → fresh session-only world, without overwriting an unknown saved record. If later saving becomes possible, use REPLACE before replacing that unknown record. |
| `UI.RECOVERY.VERSION` | A save belongs to another incompatible case/content version. “This saved game can't be continued with this version.” Back and Start a new game. No silent migration into success. | `T.RECOVERY.NEW`: explicit replacement → RESET.CASE confirmation. Until accepted, preserve the unreadable saved record. Technical version/format decisions remain Item 09. |
| `UI.RECOVERY.DAMAGED` | Saved data cannot be resumed consistently. “This saved game couldn't be opened.” Retry, Back, Start a new game. | Retry → CHECKING; new → RESET.CASE. No partial state invented from a few readable flags. Existing record unchanged until confirmed replacement. |
| `UI.RECOVERY.REPLACE` | User explicitly retries durable saving after choosing session-only because a prior record could not be checked. “Saving this visit may replace progress already on this device.” If an older record is confirmed, use “will replace the older saved game” instead. **Keep this visit unsaved**, **Replace saved game**. | `T.RECOVERY.REPLACE`: deliberate acceptance attempts latest-state replacement once. Failure retains current session and any old durable record, with SESSION status. Cancel keeps session-only play. This appears only for a real unresolved prior-record conflict. |
| `UI.RECOVERY.RUN` | Unexpected inconsistent restored run, e.g. show revision/certification mismatch. Valid investigation/material state, if independently validated, remains; affected playback is not silently completed. “This playback couldn't be continued.” | **Return to room** retains the valid current location. **Go to Stage** follows existing doors, without teleporting; **Rehearse this arrangement** is offered only in Stage and approaches the workstation before fresh rehearsal of a valid order. These actions discard the unusable pending run, not verified investigation progress. If physical/order state also cannot be trusted, route to DAMAGED rather than invent it. No automatic successful show. |
| `UI.RESUME.RUN` | Valid saved active/paused run restored at its last committed boundary, in actual scene. A nonblocking caption names rehearsal/premiere and **Open workstation** if away/not at A. | `T.RESUME.OPEN`: appropriate approach → PAUSED or TERMINAL with mode-specific Continue/Restart. Return to room/explore remains available. No room-entry autoplay. |
| `UI.RESET.CASE` | Explicit Start over from Home/Menu/recovery. “Start a new game? This clears this case's discoveries, ideas, story kit, rehearsals and premiere progress. Your sound and reading settings stay.” Safe **Keep playing / Keep saved game**, deliberate **Start new game**. | `T.RESET.CANCEL`: preserve old run and return caller, still paused. `T.RESET.ACCEPT`: clear case only, initialize initial Stage once, retain preferences, attempt durable replacement. Repeated activation cannot initialize twice. If saving fails, show session-only status and explicitly note that an older saved run may return after reopening. |
| `UI.RETURN.FOREGROUND` | Browser/tab returns after a handled visibility interruption. Held keys cleared, captions stable, any active run paused; no input sent to previous target. | `T.VISIBILITY.RETURN`: acknowledge **Return to festival** or choose an available task action; prior blocking view/draft can remain open. Continue playback is still explicit. Stale/pending help follows its context checks, not a forced popup. |

### 10.1 Back to start, browser departure, and save limits

**Back to start** (`T.PAUSE.HOME`) performs C2, attempts saving and retains the current run in memory for this same page visit. Home's Continue uses that current session first and is labeled **Continue this visit at [room]** when changes are not saved. Because this action does not discard the live run, it needs no false unsaved-loss confirmation. A visible saving limitation remains. Starting over is the separate confirmed operation that replaces the case.

On actual browser backgrounding (`T.VISIBILITY.HIDE`), settle/stop motion when the platform delivers the event, clear input, retain drafts and attempt saving; do not advance puppet cues while hidden. Returning uses RETURN.FOREGROUND. On actual page closure/crash, no reliable custom confirmation or last-second save is promised. A new page load uses the last acknowledged durable record. The saved active-cue marker preserves **possibly previously exposed** outcome status when its animation may have been seen before a crash. Unacknowledged keystrokes/frames may be absent after a hard close; the interface must not claim otherwise.

The functional reading-size choices are recommended as 100%, 125% and 150% of the eventual base text size; Roomier spacing increases the base line spacing by approximately 25%. Item 08 chooses the base typography. Reflow/scrolling must keep actions reachable at every choice; changing a setting never reduces text to fit a fixed-height panel. Captions and required state descriptions remain available with sound off.

If a source was open before reload, restore its known available source, component and acknowledged scroll/selection when valid, with focus at its heading and a closed-world movement state. Invalid transient child views, pending delivery intents and drag ghosts are discarded. Restore their acknowledged draft and surviving owner; never execute an old Show/Collect/Go action just because it was pending at closure. Prior coaching requests are not automatically resubmitted; keep the draft and offer Ask again. A prior displayed answer can remain labeled Earlier help, subject to availability/exposure history.

### 10.2 Object interruption-to-interface mapping

| Interrupted activity | Stable world state on controlled pause/leave or compatible recovery | What the next interface offers |
|---|---|---|
| Walk to source/NPC/door, before commitment | Avatar at safe point, no pending action delivered | Same named action available; fresh choice required. |
| Model tab, source flap/drawer/request, notice flattening | Item 05 pre-commit resting/closed/curled state, or completed open/flat state if committed | Repeat concrete action or Read, matching actual state. No full E3 reveal from a canceled curl animation. |
| Loop wake/dock | Before commitment: standby/following respectively; after: single following/docked entity | Wake/follow or Dock/ready caption; never two robots. |
| Caddy pickup/seat | Before commitment: prior host; after: player or Stage bay | `UI.KIT.CLOSED`/`UI.KIT.OPEN` at the Media host, `UI.KIT.CARRIED` with the player, or `UI.KIT.SEATED` at the Stage bay, according to the last committed owner/lid state; unread note access still exists. |
| Held tile/destination | Original committed location restored | Arrange with same order; no automatic drop. |
| Active cue | Controlled interruption settles once; hard reload uses committed boundary and active-marker uncertainty | PAUSED/TERMINAL in saved mode; Continue executes only the next unfinished cue or finalizes once. |
| Toast / completed celebration | Revealed kiosk / completed-stage state | Optional Replay/magnifier or factual recap; no replayed reward or extra prerequisite. |
| Explanation/delivery/help | Acknowledged draft retained; delivered snapshots remain historical; undelivered intent canceled | Edit/Show/Ask explicitly. Unknown/unseen result cannot be marked delivered. |

## 11. Optional humor, ending and factual recap

**Family contract:** Toast begins through its Workshop A; it remains a nonblocking world activity. Magnifier uses an owned L.READER-style image child with no clue source. Ending uses L.ENDING after actual full-show completion. C2/C3 govern interruption and return; neither system edits source history or current tile order.

| State ID | Visible state/actions | Transition and retained outcome |
|---|---|---|
| `UI.TOAST.COVERED` | Existing kiosk, **Start Maximum Toast demo**. No quest marker requiring it. | `T.TOAST.START`: approach and operate → REVEALING. Cancel walk leaves covered. |
| `UI.TOAST.REVEALING` | Seven-second arms/lights/lid → tray/tiny toast → magnifier sequence, immediate Skip, ordinary navigation still available. | `T.TOAST.SETTLE`: end/Skip/leave/open another task → REVEALED; save revealed state. No source discovered. |
| `UI.TOAST.REVEALED` | Tiny toast and “One toast. Maximum effort.” Look through magnifier / Replay demo. | `T.TOAST.LOOK` → MAGNIFIER; `T.TOAST.REPLAY` → REPLAY. Both optional. |
| `UI.TOAST.MAGNIFIER` | Enlarged toast appearance; Close / Return to room. | Close → REVEALED/world at kiosk, no inventory/evidence change. Focus returns magnifier action. |
| `UI.TOAST.REPLAY` | Two-second flourish, no new reward or case state. | End/interruption → REVEALED; repeat activation while running ignored. Reduced motion settles immediately. |
| `UI.ENDING.CELEBRATION` | Full launched arrangement completed; historical completion already committed. Illuminated Stage/backpack, Jo and Loop at their anchors. Skip celebration / Continue available. | `T.ENDING.AFTER`: finish/Continue → AFTERMATH. `T.ENDING.SKIP`: Skip/leave settles completed stage → RECAP or WORLD if child chose travel; completion is never revoked. |
| `UI.ENDING.AFTERMATH` | “After the premiere,” short authored Remy/Ari reactions in their own room settings. No new world NPC/remote chat. | Next reaction or `T.ENDING.RECAP`: Skip reactions/end → RECAP. Text remains readable until advanced; decorative movement can finish independently. |
| `UI.ENDING.RECAP` | “You brought Loop back and premiered The Little Bridge.” Optional actual recorded reflection only. First ending offers Return to Stage / Replay premiere / Menu. Reopened recap offers Back to its caller and Return to room; outside Stage, replay action is labeled Go to Stage to replay. | `T.ENDING.RETURN`: preserve current room/run/rail and resolve caller/world return. `T.ENDING.REPLAY`: in Stage, queue actual Show-pad approach and current qualification, then a fresh show if valid; otherwise SHOW_CHECK. Outside Stage, travel only to Stage and let the child explicitly operate Show there. Menu → PAUSE. |

Recap variants are determined by actual recorded content:

| Available observation | Recap addition permitted |
|---|---|
| No explanation/revision | Only the factual game-completion sentence. Do not add a score, inferred reasoning claim, or claim about correcting Remy. |
| Saved initial and revised idea with actual selected detail | Optional **Your idea changed** with the child's actual before/after wording and the shown source reference. If only text changed without a sourced connection, do not label it evidence-based revision. |
| Explicit plan written before a revealing result | May show **Your plan** and actual chosen details. The UI does not certify independent inference; that interpretation requires review of sources/help/timing. |
| Relevant answer help was displayed before the plan | Optional **You used a hint, then tried this plan** with actual plan. Never relabel copied/assisted wording as unaided prediction. |
| E3 viewed or shown but no player revision recorded | May retain that source in Notes; no fabricated “you changed your mind” panel. |

Replaying, changing the rail, or clearing rehearsal does not erase the first completed premiere. A changed/reset arrangement must be rehearsed again before a new showing. New game is the only explicit whole-case reset, with the confirmation above. Leaving the aftermath does not place Remy or Ari on Stage or block their later home-room interactions.

After historical premiere completion, Goal and Menu include **View premiere recap** (`T.ENDING.REOPEN`). It opens RECAP in place through C2, preserving the current room, order and any paused run; Back restores its caller. An optional **View crew reactions** within recap revisits AFTERMATH as an owned child and returns to that recap. Neither action replays the show, awards completion again, moves an NPC, or rewrites old observations. This makes skipped reactions/reflections recoverable without requiring another performance.

## 12. Item 05 object/access-to-interface crosswalk

This crosswalk identifies where each relevant physical interaction enters the interface and which owner it returns to. Unlisted decorative subparts inherit their listed coherent group's caption/read-only behavior; they do not acquire new menus or clues.

| Item 05 ID/group | Interface entry/state | Binding and return behavior |
|---|---|---|
| `ACT.PLAYER`, all scene floors | WORLD.IDLE/MOVING/BLOCKED | C3 world input, named movement/stop; no character-creation flow. |
| `ST.EXIT.CY`, `ST.EXIT.WK`, `CY.EXIT.ST`, `CY.EXIT.WK`, `WK.EXIT.ST`, `WK.EXIT.CY`, `WK.EXIT.MD`, `MD.EXIT.WK` | WORLD.MOVING; NAV.MAP/OBJECTS alternatives | Item 05 exact pairs/A/arrival. Stop old input; following Loop moves once with transition; destination room focus. |
| `ST.MODEL`, `.TAB`, `MODEL.*` | WORLD.OPERATING + GUIDE | Model action/caption; only tab manipulates this group. Returns world/model control, independent of projected run. |
| `ST.SOURCE.E1`, `ST.SOURCE.E4`, `ST.SOURCE.E6` | WORLD.OPERATING → SOURCE.TEXT | Actual flap/fold/drawer commit before text; author/time/passages preserved; return physical source. |
| `ST.BOARD` | WORLD.CHOOSER when border has two available actions | Choose actual request/post target, no secret default or extra source. |
| `ST.ACCESS.E2`, `CY.ACCESS.E2` | SOURCE.POST/CLIP/PHOTO | Whole legitimate post available after opening; granular exposure, one canonical E2; return originating screen/tablet or Notes. |
| `CY.SOURCE.E3`, `CY.NOTICE.BOARD` | WORLD.OPERATING → SOURCE.TEXT | Curled cue until flat/secure; photograph cannot perform this action. |
| `CY.SOURCE.E7`, `CY.MODEL.BENCH/BOAT`, `CY.PETALS`, tablet stand | SOURCE.TEXT for note; WORLD caption/scene description for scenery | No playable pre-solved boat example or collectible petal. |
| `ACT.JO`, `ACT.REMY`, `ACT.ARI` | TALK.TOPICS/REPLY; PRESENT/PLAN.ADDRESSED | Actual local approach, knowledge-bounded replies, optional help; first Ari caption nonblocking. |
| `ACT.LOOP`, `LOOP.FOLLOW.PAD`, `ST.DOCK/.FLAP/.PAD` | WORLD.OPERATING with physical status in GOAL | One standby/following/docked/projecting entity. Empty dock explains missing robot; no equipment settings/repair interface. |
| `MD.SOURCE.E5` | SOURCE.TEXT, E5 slate component | Historical capture only; account/observation separately obtained. |
| `MD.SOURCE.E6`, `MD.SOURCE.E7` | SOURCE.TEXT | Mounted copies stay reachable after pickup; same canonical E6/E7. |
| `MD.RACK.STATION`, `MD.ACCESS.E8`, `KIT.CADDY`, `ST.RACK.BAY` | KIT.CLOSED/OPEN/CARRIED/HANDOFF/SEATED/VACANT | Actual host determines access; no duplicate collection or doorway teleport. |
| `KIT.NOTE.E6`, `KIT.NOTE.E7` | KIT host → SOURCE.TEXT | Possessed unread notes may be opened; after seat first reading requires rack approach; acquired text can be revisited. |
| `TILE.FERRY/BRIDGE/PLANT/BLOOM` | SOURCE.TILE; RAIL.SELECTED/DESTINATIONS | Frozen local description, then actual select/place controls; no auto-solution preview. |
| `ST.RAIL`, `ST.RAIL.A–D` | WORK readiness + RAIL selection | Zero–four unique tiles, explicit insert/replace/swap/return; physical capacity IDs are not answer numbering. |
| `ST.CONSOLE`, `ST.CONTROL.REHEARSE/SHOW/STOP/RESET/CLEAR` | WORK/RUN states | Single Show pad; exact readiness, mode, revision, stop and reset rules; no source/AI gate. |
| `ST.PROJECTION`, `PUP.*`, including both banks/backpack/seed/bridge/hill/flower | Watch + STORY.DESCRIBE | Read-only consequence; enlarged both-bank view; no Move to or direct drag into success. |
| `WK.WAYFINDING`, `WK.ACCESS.NAV` | NAV.MAP; SOURCE.PICK Venue information | NAV.MEDIA referenceable after public description exposure; never occupancy proof or ninth principal source. |
| `WK.BENCH/SCENERY`, `MD.PLAIN.WALL/RECORDING.TABLE` | WORLD scene description | Same visible context, no mandatory extra inspect task. |
| `WK.TOAST`, `.START/.MAGNIFIER/.SKIP` | TOAST states | Nonblocking reveal, optional look/replay, stable leave/skip. |
| `ACC.OBJECTS`, `ACC.VENUE`, `ACC.GOAL` | NAV.OBJECTS, NAV.MAP, GOAL | Same legal physical access, public facts and recoverable goal. |
| `ACC.EVIDENCE.<E1–E8>` | NOTES + SOURCE states | Available records/accounts, exact canonical components and separate exposure. |
| `ACC.COMPARE`, `ACC.TIMELINE`, `ACC.THEORY` | COMPARE, TIMELINE, IDEA, LEAD | Optional interpretations, known-time history; save does not make a claim true. |
| `ACC.PRESENT` | PRESENT states | Selected facts reviewed, approached and delivered once; remote choice travels only. |
| `ACC.PLAN.SEARCH`, `ACC.PLAN.STORY` | PLAN states | In-place recording versus addressed explanation explicit; no imaginary remote response. |
| `ACC.COACH` | COACH states | Help lifecycle, grounded response/fallback, delivered-assistance timing and stale-result exclusion. |
| `ACC.STORY.STATE`, `ACC.KIT` | STORY.DESCRIBE; appropriate KIT state | Pause before reading; same current story/owned materials, no hidden answer. |

## 13. Connected flow map and scenario walkthroughs

The state/transition definitions above supply each edge's guards, visible response, persistence, cancel and focus behavior. The routes below instantiate them with the actual objects and clues. These are written specification checks, not executed browser sessions.

```text
HOME.CHECKING ──known result──> HOME.EMPTY / HOME.SAVED / RECOVERY
       HOME ──Start/Continue──> WORLD.IDLE
                                  │
            ┌──physical intent────┼──named tool──────────────────┐
            v                     │                              v
       WORLD.MOVING                │                 SOURCE / NOTES / NAV / PLAN
            │ reaches A            │                     │ Back/Return
            v                     │<─────────────────────┘
      WORLD.OPERATING              │
       │       │                  ├──Help──> COACH ──Keep playing──┐
       │       └──source opens────┘                               │
       │                                                          v
       └──kit/Loop recovery──> WORLD ──Stage approaches──> WORK readiness
                                                            │
                                                      select/place tiles
                                                            v
                                                       WORK.READY
                                                            │ Rehearse
                                                            v
                                                     RUN.REHEARSAL
                                                  /          |          \
                                         unmet/pause       failed      certified
                                             │               │             │
                                read/help/edit/continue       └──edit───────┤
                                             │                             │ Launch
                                             └─────────> rehearsal         v
                                                                        RUN.SHOW
                                                                      /         \
                                                               pause/resume    full success
                                                                                  v
                                                                       ENDING → WORLD/replay

Menu/visibility interrupts any active world/run through C2 → PAUSE or RETURN.FOREGROUND.
New game is an explicit RESET.CASE branch. Passive save/help status does not own the flow.
```

Abbreviated nodes above refer to the matching `UI.*` families. The map shows connectivity; the scenarios identify exact named actions and transitions. A single route never requires all Notes tools or every source.

### F01 — First start, opening, then free choice

`UI.HOME.CHECKING → UI.HOME.EMPTY` after the known-empty result. **Start** (`T.HOME.START`) enters `UI.WORLD.IDLE` at `SC.ST` `(20,50)` with the nonblocking captain goal. **Pull the story tab** (`ST.MODEL.TAB`, T.WORLD.MOVE/ARRIVE/COMMIT) shows Pip at the broken crossing and Jo's backpack line. **Preview** at `ST.CONTROL.SHOW` shows blank backdrop/empty dock. The child can select E4, E2, Jo, or either exit next.

Dismiss guidance or leave Stage first: remove only the annotation; Goal/E1/Jo retain the assignment. No obligatory dialog must be clicked before moving. Reading E1 follows physical flap opening; merely dismissing guidance does not mark it read.

### F02 — E4 plus NAV.MEDIA, correct-first search

From Stage, `ST.SOURCE.E4 → UI.SOURCE.TEXT`; read the request and close to its world control. Use `ST.EXIT.WK → WK.EXIT.ST` with Item 05 arrivals. Read `WK.ACCESS.NAV → UI.NAV.MAP`, exposing the Media description. Through `UI.SOURCE.PICK` choose E4's requirements and presented NAV.MEDIA into `UI.COMPARE.READY` or `UI.PLAN.PRIVATE`.

The child may record **“Ari needs a plain wall and still paper. Media is an indoor filming room with a plain wall, so I'll check there.”** Record my plan (`T.PLAN.RECORD`) saves it without a Jo reply or automatic movement. **Go to Media** (`T.NAV.GO`) uses `WK.EXIT.MD → MD.EXIT.WK` and exposes actual Loop on arrival. The prior plan is timestamped before confirmation. The same route works with no written plan, which does not produce a reading inference claim.

### F03 — Cancellation interpretation and physical context correction

`ST.ACCESS.E2 → UI.SOURCE.POST`; choose Photo (`T.POST.PHOTO`) and see only the partial word. Optionally save **“Our whole premiere is canceled”** in IDEA.DRAFT/RECORDED. Return to world and use `ST.EXIT.CY → CY.EXIT.ST`; select `CY.SOURCE.E3`. WORLD.OPERATING releases/pulls/secures the real notice before SOURCE.TEXT exposes its full scope and continued-premiere plan.

Choose Show… → PRESENT.SELECT/REVIEW with both relevant E3 parts, then **Show Remy** → PRESENT.APPROACH → TALK.REPLY. Remy's exact correction appears after physical arrival/delivery. The player can save a revised thought, or simply leave through `CY.EXIT.WK` without a form. The post remains the original historical claim and the notice remains flat. With only E3.a supplied, the reply cannot quote E3.b.

### F04 — Media first, no earlier sources

From opening world, immediately take `ST.EXIT.WK`, then `WK.EXIT.MD`. No Notes, map-description reading, Preview or theory is required. Media arrival shows actual Loop and Ari's dismissible account. Select `ACT.LOOP` to wake/follow and `MD.ACCESS.E8` to collect; either order works. KIT.CLOSED/OPEN can lead directly to CARRIED without opening any note or every tile.

E5 location exposure occurs on arrival; later statements cannot be backdated as pre-discovery predictions. Ari's presence/materials never require a comprehension check. Return with the original premiere task still outstanding.

### F05 — Collect unread notes, read at the Stage

`MD.ACCESS.E8 → UI.KIT.CARRIED` includes `KIT.NOTE.E6/E7`, still unread. Go through `MD.EXIT.WK → WK.EXIT.ST` to Stage. Select rail: KIT.HANDOFF approaches `(55,58)`, seats caddy, then approaches rail `(78,58)`. Choose the kit's **Jo's note** / **Remy's note** and read SOURCE.TEXT at rack access; both canonical sources are now available according to actual presentation.

After collection the mounted `MD.SOURCE.E6/E7` remain reachable on revisit. Opening Notes before reading the leaflets does not fill E6/E7 with unseen text; it offers the actual kit access. Closing a kit reader after handoff resolves focus to Stage rack, not the removed Media caddy.

### F06 — Retrieve one resource first

**Kit first:** collect caddy, leave Loop standby, return Stage and seat kit. `UI.WORK.NEEDS_LOOP` allows arrangement/notes; Rehearse explains docking and Preview still fails. Return via Workshop, wake the still-present single Loop, lead it back and dock it; the committed tile order remains.

**Loop first:** wake/follow without collecting, return and dock. `UI.WORK.NEEDS_KIT` shows initial projected setup and empty rack. Return to Media; Loop stays docked while the caddy remains in its recess. Collect/deliver the kit; no duplicate robot or auto-read note appears. Both variants require only missing materials, never source flags.

### F07 — Seed-only attempt, visible unmet condition, then revision

At `ST.RAIL`, use named/drag actions to insert One Boat, Hill, Flower. `UI.WORK.READY → UI.RUN.STARTING → UI.RUN.REHEARSAL`. Ferry delivers seed but leaves Pip. Hill commits its unmet state → UI.RUN.UNMET with both banks visible and **“Grandma has the seed. Pip is still across the river.”** Continue may reveal the unplanted dark seed at Flower; Stop/reading/edit is also available immediately.

Read E6.a and E7.a/b through kit/Notes, or request Help. Opening either view first settles any active cue, then records new exposure/request context. Close does not auto-resume. Select Joined Boats and the gap **before Hill** (`T.RAIL.INSERT`), producing Ferry/Bridge/Plant/Bloom. Actual edit resets puppets and certification; the next action is Rehearse, not Continue of the old run. The successful revised outcome is accepted whether or not the child supplied an explanation; support exposure remains truthful.

### F08 — Direct, seed-ahead and all harmless extra-Ferry plans

Using UI.RAIL.SELECTED/DESTINATIONS, create Bridge/Plant/Bloom and rehearse; Pip carries seed, joint planting then light. Alternatively create Ferry/Bridge/Plant/Bloom; seed delivery precedes Pip's crossing. Both end WORK.CERTIFIED under the same state condition.

The additional valid orders Bridge/Ferry/Plant/Bloom, Bridge/Plant/Ferry/Bloom and Bridge/Plant/Bloom/Ferry must flow through ordinary successful/no-op cues without an unmet pause for Ferry. Final certification waits for the full current arrangement. No layout, Continue label, recap or help response calls the harmless extra tile wrong.

### F09 — Launch, completion, and replay

From WORK.CERTIFIED choose the same `ST.CONTROL.SHOW` pad used for opening Preview. `T.RUN.SHOW → RUN.STARTING → RUN.SHOW` runs the exact current order fresh. Full successful finish commits historical premiere completion, then ENDING.CELEBRATION → AFTERMATH → RECAP. Return to Stage retains completed state. Replay premiere (`T.ENDING.REPLAY`) uses the physical Show pad and current certification; no duplicate completion or comprehension reward.

Skipping Jo/Remy/Ari decorative aftermath does not undo the premiere. Recap without actual reasoning records states only that Loop was returned and the story premiered.

### F10 — Stop, leave and resume each playback mode

During rehearsal, **Stop** (`T.RUN.STOP`) settles one active cue and enters PAUSED or TERMINAL. Use Back to room and either Stage exit; later return to Stage and open the workstation through its A. **Continue rehearsal** resumes the next unfinished cue; **Continue to finish rehearsal** finalizes a last-cue interruption once.

Repeat during a launched show: saved mode remains `show` with the displayed label Premiere. Returning offers **Continue premiere / Restart premiere**, never a rehearsal substituted for an unfinished show. A hard page reload restores committed state paused and retains possible prior exposure of an interrupted active cue. No close/room return automatically advances the story.

### F11 — Edit after success, then try Launch

WORK.CERTIFIED with a valid plan → select a tile. Cancel selection: unchanged revision remains certified. Select again and make an actual swap/return/insert: `T.RAIL.COMMIT` resets puppets and current certification, preserves historical observations/completion, returns WORK.READY/EMPTY. Press Show → WORK.SHOW_CHECK with **“Try this arrangement in rehearsal first.”** Rehearse the edited order before another showing. Opening More and canceling is a pause/view action, not an edit.

### F12 — Waiting, fallback, closed panel and stale reply

From an actual unmet state, open Help and submit the child's retained explanation. COACH.PENDING → WAITING after proposed 2 seconds; Keep playing closes the panel while the request remains current. At proposed 8 seconds an unaccepted prepared-hint offer is available through a quiet Help marker; nothing opens itself.

Reopen and select **Use a prepared hint**: it becomes the sole displayed response and records actual support; a later live response is discarded. Alternatively, change the rail/room/text before reopening: the pending/held response becomes STALE and cannot appear as current advice. The new draft remains. Choosing **Show me a way** also cancels a pending live opportunity and immediately displays the authored current answer. No hint-selection race replaces a focused button or marks a hidden response delivered.

### F13 — Complete keyboard/non-drag compact route

Use Enter on Start; focus **Move to…**, select model/Preview or an existing door, and let the avatar take its legal route. Use Map/known destination to Media. Native Wake and follow, Collect story tiles, and note controls give the same materials/exposure. Return Stage, Dock Loop, then Arrange story tiles including actual handoff.

In compact Arrange, select a tile and named insertion/replacement destination. No drag is required. Choose Watch/Rehearse; both banks and factual captions remain available. Describe story now pauses and reports actual state. Text input consumes its arrows/WASD and cannot move the avatar. Close returns to a surviving control; choose Continue explicitly. Launch the successful current plan and Return to Stage from recap. Zoom/text reflow preserves all controls, refs, drafts and current mode; it does not require phone rotation or reveal extra source content.

### F14 — Saving, valid resume, unreadable save and canceled reset

Trigger a committed change; SAVE.PENDING becomes SAVED only on acknowledgment. Actual failure enters SAVE.SESSION while the same run continues. Back to start retains live state and shows **Continue this visit**; Retry saving targets the latest state. External closure may lose unacknowledged work and does not promise a custom warning.

On a fresh load, a valid run follows HOME.CHECKING → HOME.SAVED → WORLD/RESUME.RUN, preserving actual hosts and paused mode. A read error offers Retry or explicit session-only play, not a fabricated empty save. An incompatible/damaged run offers confirmed new-game recovery. **Start over → RESET.CASE → Keep playing** restores the original caller/run with no case loss. Acceptance starts a new case with settings retained. An unknown old record is replaced only through the actual REPLACE decision if the child later chooses durable saving for a session-only run.

### F15 — Ignore, leave or inspect Maximum Toast

Stage→Workshop→Media→Workshop→Stage can stay on the clear passage and never enter TOAST.COVERED's action. Case completion remains identical. If Start is chosen at kiosk A, WORLD remains usable while TOAST.REVEALING runs. Select an exit, Menu or a source: reveal settles once to REVEALED before travel/task opening. Magnifier shows toast only; close restores its owner, no source or tile added. Replay is the brief flourish. No UI marks it required before Launch.

### 13.1 Route checks and invariant results

The written routes check these conditions against the state tables:

- Every first physical action has its Item 05 approach and commit; remote evidence access is limited to legitimate acquired/owned content.
- Media-first and partial-material paths reach the same usable finale without mandatory E2/E3, explanation, clue count or service result.
- Source/cue content is visible before it is recorded as exposed; future/hidden parts are not inferred from a thumbnail, picked title or network completion.
- E4 plus NAV.MEDIA can actually be selected as two references; fixed/portable E6 copies remain one source.
- No-op Ferry, all valid arrangements and canceled selection preserve the correct eligibility behavior.
- Back/Close/Return paths have explicit owners; changing host or viewport has a surviving focus destination.
- Waiting/help-ready/save status cannot block doors or Stop, auto-answer a changed plan, or erase a draft.
- Interrupted mode/index/revision and case-reset scopes remain distinct; a partially shown premiere cannot become completion by leaving.

These checks establish completeness and consistency of the written flows. They do not establish actual browser behavior, accessible rendering, child appeal or learning effects.

## 14. Coverage, decisions and handoff to Item 07

### 14.1 Six checklist requirements and their evidence

| Item 06 subitem | Completion evidence in this document |
|---|---|
| First start, continue, objective/help, pause/settings, exit/resume | C1–C4, L.HOME/WORLD/SHEET, §§4/10, F01/F10/F14. |
| Source inspection, clip, evidence tray, comparison, timeline, theory and presentation | C5, L.READER/COMPARE/TALK/PLAN, §§5–6, F02/F03/F05. |
| Tile collection, placement/swapping/removal, playback, pause/unmet/success/launch | L.KIT/WORK, §§7–8/11, F04–F11/F13. |
| Coaching entry/wait/hints/direct help/unavailable/stale behavior | L.COACH, §9 lifecycle and concrete cases, F07/F12. |
| Save failure, incompatible save, resets, interrupted playback, completion/recap | §10 state/interruption tables, §11 endings, F09/F10/F11/F14. |
| Hierarchy, navigation, focus, text entry and keyboard/non-drag equivalents | C1–C6, every layout's compact/focus treatment, state-family contracts, F13 and §12 crosswalk. |

### 14.2 Recommended decisions made here

1. Group access under compact world controls and one active task surface. Use a controlled child workspace and separate caller/world return ownership.
2. Use available world area, rather than device name, for responsive mode. Keep the full scene in exploration and both banks in Watch; use named native controls when art targets are too small.
3. Separate document availability from actual passage/frame exposure. D06-01 clarifies legitimate E2 portable-post access while preserving all hidden-source boundaries.
4. Distinguish a private draft, recorded crew plan, local evidence/plan delivery and an explicit coaching request through their button labels and actual effects.
5. Keep Pause/reading/inspection from silently advancing story cues. Give Continue, mode-specific Restart, Reset rehearsal, Clear rail and Start over distinct meanings.
6. Keep waiting/help-ready passive. Accepted fallback or direct help owns the single response opportunity; obsolete replies cannot appear after changes.
7. Retain accessibility/audio preferences across New game, outside case progress. Back to start preserves the current visit; actual storage failure is visible without inventing a loss that action does not cause.
8. Present only factual completion and any actual child-authored reflection; no score or inferred mastery panel.

These decisions do not change room geometry, source wording, puppet actions, narrative, or valid solutions. The small Item 05 E2 access clarification is explicitly documented; the other decisions fill interface behavior that Item 06 was assigned to define.

### 14.3 What Item 07 must consume

**Completed handoff: 07 — Complete child-facing content and content references.** The linked Item 07 catalog supplies the content groups below using the existing source/passage and UI/state/action IDs. The current next item is 08 — Visual direction and readable scene/interface designs.

Required content groups:

- Start/continue/recovery summaries; original assignment and state-specific goal suggestions; movement, overlapping-target and unavailable-action wording.
- Every source title/provenance label, E2 frame/end/description treatment, E5 component labels, NAV references, vocabulary definitions and source-picker instructions.
- Comparison/idea/plan/presentation labels that preserve private versus delivered meaning; complete NPC topic/reply bindings and neutral unsupported-input fallback.
- Kit ownership/collection/handoff messages, unread-note access, tile descriptions and placement/swap/replace/return feedback.
- Every run mode/state label, actual puppet-state caption, unmet consequence, empty rail, qualification check, Continue/Restart/reset wording and ending/recap variant.
- Coaching entry/wait/clarification/prepared-hint/direct-help/stale/canceled wording, connected to the existing allowed authored moves and actual assistance exposure.
- Save/unsaved-session/incompatible/corrupt/replacement/New game explanations and cancellation text; clear preferences-versus-case reset copy.
- Accessible names, scene/current-story descriptions, reading order announcements and compact-mode instructions corresponding to the same facts/actions.

The source of decisive wording remains v3 §6 and the exact authored lines already specified. Proposed secondary labels/messages here have concrete functional meaning and should be consolidated, not replaced with a different behavior. Item 07 may refine phrasing for ages 9–12, but must retain negation, event scope, uncertainty, time/plan distinctions, and who must do what in Pip's promise. Any genuinely needed behavior change must return to the owning interface/interaction entry and be documented.

Item 08 still owns final visual treatment, typography, palette and assets' appearance; Item 09 owns technology/service and concrete data contracts; Item 10 owns the individual asset manifest; Item 11 owns integrated handoff and updated scheduling. No implementation or full build-readiness claim follows from completing this section.

### 14.4 Completion and remaining evidence

**Item 06 is complete as a functional interface design.** The specification provides shared behavior, actual layouts, state inventories, named transitions, recovery paths, object/access bindings and all fifteen requested scenario traces. No unresolved functional interface decision remains. Later visual/technical choices and usability evidence remain separate work; they do not authorize implementing the game now.

Written reviews covered layer/focus ownership, source/plan/help boundaries, physical readiness, interruption, equivalent solutions and recovery. Corrections clarified child-versus-world return ownership, source-only comparison/presentation and help without typing, remote-recipient discovery, NAV.MEDIA selection, direct-help response ownership, unknown-save wording, physical recovery travel, and reopening a completed recap. The single material source-access ambiguity is recorded as D06-01 and reconciled in Item 05; no source wording or story rule changed.

A document-reference check found **93 explicitly defined interface states**, **121 named transition identifiers**, **15 scenario flows**, and no duplicate state definitions or unresolved exact `UI.*` state references. The layout sections specify the distinct large/compact task families; the six-row checklist crosswalk links all required outputs to actual sections. These are checks of this specification's structure and written behavior, not an exhaustive executed state-machine test.

Actual implementation, browser/navigation behavior, accessible rendering, live model behavior, first-time player clarity, child enjoyment and learning outcomes remain **not performed**. They are later evidence obligations, not claimed from these diagrams.
