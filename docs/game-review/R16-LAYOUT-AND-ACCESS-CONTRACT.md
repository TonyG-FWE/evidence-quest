# R16: Layout, attention and accessibility

Specification revision 1, September 14, 2026. SPECIFIED_DERIVED from D028-D037, D038-D048 and D075-D080. These are annotated layout specifications, not final artwork or a playable visual acceptance.

## Main activity layouts

Use a stable header, one main activity, and a compact context/action area. During walking the world is dominant. Reading does not cover the sentence with floating tool panels. Construction leaves both relevant banks and attachments visible. Writing displays the actual source and child's draft together.

| Surface | Desktop reference at 1440×900 | Contents / attention |
|---|---|---|
| World | Header 56 px; world fills remaining area; goal at upper left max 340 px; bottom action strip 64 px | Current goal, one next action, nearby named interaction. Backpack/Help/Pause remain predictable secondary controls. |
| Reading/conversation | World context left; reader right, 480-600 px; shared header remains | Title/author, passage, word help, speaker/answer where relevant, Back at a fixed edge. Keep the exact passage scroll position. |
| Arrange boats | World nearly full width; right tool strip 240-300 px; instruction above the tools | Current selected boat/end, Move/Rotate/Join/Fasten controls. Camera reframes only to keep both banks and boat endpoints visible. |
| Sol writing | Source column 40%, draft/rehearsal column 60% | Relevant disclosed source, editable ending, Try my ending and the current rehearsal. Help/example text is visually separate from child text. |
| Reading feedback | Same reader; recording/review controls below the target paragraph | Persistent actual mic state; one feedback card; replay/model/retry/return. No score dashboard. |
| Ending | Picture around 55%, text/controls 45% | One matching paragraph and picture, page position, Previous/Next/practice. Mode and microphone state remain visible. |

Annotated world arrangement:

```text
+---------------------------------------------------------------+
| Garden Adventure                    Backpack   Help   Pause    |
+---------------------+-----------------------------------------+
| Current goal        |                                         |
| One next action     |       Playable scene                     |
| Where is that?      |       Pip / target / visible result      |
+---------------------+                                         |
|                                                               |
+---------------------------------------------------------------+
| [Named current action]          Mode: Guide Pip / Arrange boats|
+---------------------------------------------------------------+
```

Annotated reading arrangement:

```text
+-----------------------------+---------------------------------+
| Paused world context        | The Torn Wing — Mara            |
| actual actor positions      |                                 |
|                             | Full readable passage           |
|                             | [selected word help in flow]    |
|                             |                                 |
|                             | Hear this part / Read with ...  |
|                             | Back to the story               |
+-----------------------------+---------------------------------+
```

At widths below 1000 CSS px, reading/writing uses the main area with a small world-context thumbnail and a clear Back action; it does not compress prose into a narrow side column. At text zoom or smaller widths, actions wrap and content scrolls vertically. No essential label is truncated. Constructing can expand the world and expose the same controls below it. Preserve the baseline compact/accessibility checks even though the recording demonstration is desktop-first.

## Text and attention

Use approximately 20 px body text, 1.55 line height and 45-65 characters per line at the desktop reference. Preserve the existing larger text/roomier options as scalable settings, not separate copies of the source. Let headings and paragraph boundaries express structure; avoid moving text during reading. Color cannot be the only indicator of loose/fastened, selected/available, mic on/off or success/failure.

Word help opens adjacent in document flow or a contained popover that does not hide the selected sentence. Keep the original reading paragraph in place. It contains the occurrence-specific meaning, context and labeled audio actions. Closing returns focus to the same word/span. A screen reader receives the same actual text and labels.

World highlights appear on target/focus, not as a field of continuously blinking objects. Decorative objects have no fake interaction highlight. Important physical change is shown where it occurs and summarized briefly in the context area. Passive save/AI completion messages do not steal focus, scroll the page or move the camera.

## Accessible interaction and audio

Use native buttons, headings, inputs and dialogs for every control. Each canvas action has the same command through a named DOM control. Nearby actions list only actual reachable/known targets. A text description states the actual banks, Pip/seed/boats/flower state and relevant next action; it does not expose a hidden solution.

Focus order follows task order. A modal traps focus while open and restores its initiating control when closed. Escape closes the top layer. Status announcements are polite and coalesced; Listening/Stop are immediately discoverable. Do not announce an entire passage repeatedly on every scene frame. Typing, selection and arrow-key reading cannot trigger movement.

Where is that? briefly frames or points to the known location and then returns to the ordinary view; reduced-motion mode changes the frame immediately. Also provide a short route description using known landmarks. It does not point to the narrow crossing as a solved answer unless requested help explicitly supplies that information.

Music and ambient sound are optional and lower than speech. Only one voice/replay plays at a time. Starting capture stops other voice output and mutes background sound. With sound off, text, captions, named states and visible actions supply the same story information. Reduced motion preserves from/to outcomes, source visibility and completion semantics without decorative travel.

## Acceptance

| ID | Required demonstration |
|---|---|
| D081.R16.AC01 | World, reader, construction, writing and ending preserve their main activity at reference size, compact width and increased text size |
| D081.R16.AC02 | Keyboard/screen-reader action routes invoke real handlers; correct focus return, Escape, input ownership and status announcements |
| D081.R16.AC03 | No clipping, hidden sentence, forced horizontal prose scroll, camera/focus theft or unlabeled mic/attachment state |
| D081.R16.AC04 | Sound-off and reduced-motion play preserve required information and actual outcomes |

Results NOT_RUN. Color/contrast measurements and actual assistive-technology observations belong to implementation qualification, not inferred success from this layout.
