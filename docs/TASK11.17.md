# TASK11.17 — Comparison, timeline and theory tools

Authorized by the current ER13 §8 addendum. Dependency TASK11.16 is complete. Original task ID, FIX11.TOOLS fixture, L01/G05/REQ11.TOOLS/N02 requirements and Items 06/07/09 contracts are retained.

The Notes tabs always offer Evidence, Compare, Timeline and My ideas. Comparison permits empty, text-only, one-detail, same-source and two-detail ideas. A picker belongs to its invoking slot; choose a source, expand an exact available passage, and explicitly use it. Cancel preserves the original slot and restores its focus. Public venue information is separate and selectable after actual display. Authors/components remain visible, and chosen relations never change source facts or count as independent evidence.

Private drafts survive closing and acknowledged saves. Save creates an immutable private record; Edit opens that actual snapshot. An unchanged edit adds no invented revision. Changed saves retain the earlier record. Details or a relation can be saved without prose; a completely empty idea gives Nothing to save yet. Text beyond 600 code points remains editable but cannot become a textual record. Only explicit Help copies the current text to coaching; private saves create no character receipt.

The timeline uses only acquired sources and actually displayed metadata. E4 9:05 remains a request/plan; E3 9:10 remains notice/announced plan; E2 9:12 recording and 9:13 interpretation stay separate; 9:18 completed recording requires the slate. Unknown time is During your visit. Discovery sort uses observation sequence, with stable source order for ties. Opening a row preserves the source component and returns focus to that row.

Follow records a question and selected known destination and returns to the world without travel. Goal/Map's separate Go walks the existing door routes and can be stopped or retargeted. The Map highlights the selected destination without a correctness marker. No tool is a gameplay gate.

Schema changes are the optional closed reasoning field only; no save-format version bump. Semantic validation rejects dangling revisions, unavailable detail references, mismatched comparison snapshots and impossible metadata receipts. Old saves remain conservative: previously unrecorded metadata is learned only when actually displayed.

| Existing states / transitions | Runtime owner | Evidence |
|---|---|---|
| UI.COMPARE.EMPTY/PARTIAL/READY; T.COMPARE.CHOOSE/RELATE/REMOVE/SAVE | core/reasoning, ui/Reasoning | reasoning.test.ts, reasoning.spec.ts, FIX11.TOOLS |
| UI.TIMELINE.EMPTY/KNOWN; T.TIMELINE.SOURCE/VIEW | metadata observations and timeline projection | metadata chronology and exact FIX11.TOOLS browser route |
| UI.IDEA.DRAFT/RECORDED; T.IDEA.CLOSE/EDIT/HELP/LEAD/SAVE | private Draft, immutable Record and explicit Help | private revision/reload and explicit Help browser checks |

Status: **COMPLETE**. All seven states and eleven transitions are implemented. The seven meaningful browser checks pass in Chromium, Firefox and WebKit, including the exact FIX11.TOOLS E4 + NAV.MEDIA route, relationship clearing/replacement, E2 interpretation and E5 slate chronology. [Acceptance with hashes and individual outcomes](../evidence/er13/task17-acceptance.json). The independent native review selected an E2 interpretation and E3 passage, saved a private idea, opened the matching timeline component and returned focus to that row.

The 29-contract suite and 24 connected Chromium regression checks also pass. [Contract report](../evidence/er13/task17-contracts.txt), [connected regression](../evidence/er13/task17-final-regression.json). The retained three-engine report initially had three stale Help selectors: the prepared answer had correctly replaced the editable prompt. The corrected checks inspect What you asked and Ask again, and pass in all engines. No private text is shown to an NPC automatically. No live model/participant/deployment claim; original final-art/performance tasks remain separate.
