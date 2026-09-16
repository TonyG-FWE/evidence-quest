# Follow-up while the implementation candidate was changing

This note supplements, but does not rewrite or close, the frozen snapshot-2 report. It is based on subsequent live source reads. The owner has been asked to identify a stable Group 1 candidate before final source sign-off.

## Progress observed

- `ReadingPractice` now renders plain text during permission/listening. Its practice-text container pauses local replay on click capture before opening word help.
- `ReadingOrigin` and display digest validation now include `mixed-display`; aggregate conversation practice supplies that kind.
- A new `ReadingSession` slices the target through `readingPages`, which bounds pages to at most 1,800 UTF-16 units without splitting surrogate pairs. The app's shared practice route uses this session. This is relevant to the previous 4,000-code-point request failure; the final wired edition has not yet been frozen/reviewed.

## R2-01 still needs the complete modal boundary

The direct practice-target fix does not by itself disable every background word opener. The special Duet title word in `GardenApp` is outside the inert `.garden-reading-scroll`. Its click callback can still set word state while the practice component is capturing. The newly inert practice wrapper does not stop a mounted capture stream. Source route: open Duet, enter practice, start recording, select the title word Duet.

Likewise the inline **Say my answer** practice instance in `FeedbackActivity` uses local `spoken` state rather than the app's `readingTarget`; shared reader/header model/word controls do not become inert on that basis.

The owner was asked to protect all background word/model controls with the modal boundary or use a common stop/pause handshake before any word overlay. This is a remaining path for the same R2-01 finding, not a new task. A source-derived route is not a claim that this review ran a microphone or browser.

No final Group 1 source or UI acceptance is granted by this note. No reviewer runtime edits, test/build/browser/provider calls, Git writes or subagents occurred.
