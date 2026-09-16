# Group 3 follow-up: stories-final source edition

Status: **NEEDS_CORRECTION — G3-F01, G3-F02 and G3-F03 remain open**.

The owner's candidate is named `stories-final`; its name does not establish review acceptance. Candidate SHA256: `5e868feb433dbd3346221cf10436778d328a9d6ff4eac5d50557200ce9ff0675`. The independent `group-3-source-2/` copies match all 131 entries. Snapshot metadata SHA256: `8e54e3b0c4e05a80789b762aedf337a6927b7812525a7db93252e2870a727ba3`.

The only runtime changes since stories-1 are the Duet title predicate in GardenApp, the recording Stop header/focus in ReadingPractice, and corresponding CSS. Thus the three findings in `group-3-review-notes.md` remain present. In particular, storyReading, StoryReadingTools, ChapterPanels and audio retain their prior hashes; the GardenApp speech cancellation paths have not changed.

## Narrow additions reviewed

- **Duet title:** `!word.source && !word.title` now distinguishes a title request from a dynamic authored passage. This preserves the glossary's existing exposure-dependent title explanation and does not add title exposure.
- **Visible Stop:** The actual recording Stop button moves into a sticky practice header, and focus moves to it when capture becomes active. Its visibility remains tied to the actual listening phase. The page controls remain unavailable during permission/capture. This source review does not itself qualify viewport behavior.
- **Replay error:** The graceful unavailable-replay notice is already present in stories-1; it is not a new delta in this edition and does not close the retained native WAV decoding limitation.
- **Bakery fixture:** The helper now waits for the rendered data-bakery attribute before parsing it. Actual bakery assertions remain intact.
- **Whole-reading fixture:** The test traverses complete text and page return using ordinary controls, with explicitly synthetic voice and microphone seams. It exercises Stop listening's token invalidation, but not late callbacks after reader closure, navigation or practice capture/replay. Those are the remaining G3-F03 acceptance cases.

The review handoff was accepted by the task-message tool after earlier timeouts; `group-3-handoff-delivered.json` records that change. No desktop input was performed. Review remains source-only, with no runtime edits, test/build/browser/provider/Git/subagent execution. A corrected frozen edition is required before a final passing receipt.
