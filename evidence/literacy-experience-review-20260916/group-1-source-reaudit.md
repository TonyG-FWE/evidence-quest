# Group 1 source re-audit

Status: **CHANGES CONFIRMED IN SOURCE; FIVE CONCRETE GAPS REMAIN**.

This review binds to `source-audit-2.json` and its 48 copied files, captured at **2026-09-16T03:34:04.8266291Z**. Each copy matched the working file immediately after capture. The implementation owner was continuing work; later changes need a separate disposition.

The review reads source and existing test definitions only. No runtime files were edited, no tests/builds/browser or microphone sessions were run, and no provider calls, Git writes or subagents were used. This is not UI acceptance. Group 2 remains outside the review. The earlier contract references and TASK11/FIX11/CHECK11 bindings remain in `group-1-source-audit.md`.

## Disposition of the original eight findings

| Finding | Source disposition | Evidence in snapshot 2 |
|---|---|---|
| G1-F01: coverage | **Partly resolved.** Common conversation tools now read supported paragraphs, including instructions and hints. The practice target itself has word buttons. Some essential text/decisions are still excluded. | `Reading.tsx:39–47`, `GardenApp.tsx:180,194–204`, `ReadingPractice.tsx:29`; remaining gap R2-02 below. |
| G1-F02: invisible world helper | **Original defect resolved in source.** The context is null outside the reader, so world captions render plain text instead of invisible-help buttons. The existing explicit gathering reader remains available. | `GardenApp.tsx:124`, `Reading.tsx:12–13`, `GatheringPanels.tsx:13,18`. Exact world-action coverage remains part of R2-02, not the former invisible-overlay defect. |
| G1-F03: missed choices | **Fragment omission resolved; complete coverage still open.** Fragment recursion includes both Mara pictures. Choice prompts and standalone action alternatives still lack the same inspection route. | `Dialogue.tsx:8–11`; R2-02 below. |
| G1-F04: writing before confirmation | **Resolved in source for Mara's editing draft and optional written answers.** Both offer a separate reader/practice route without confirming or delivering the text. | `MaraMessage.tsx:14–19`, `FeedbackActivity.tsx:37–38`. Existing exact delivery/selected-ending handlers were not changed by these helpers. |
| G1-F05: wrong contextual meanings | **Main story-event leak resolved; one concrete wrong sense remains.** Dynamic help now shows the selected sentence and general meanings for mended, assumed, obligation, play and related terms. | `readingGlossary.ts:7–16`, `GardenApp.tsx:108`; note counterexample R2-03 below. |
| G1-F06: oral target/provenance | **Rejected target families resolved; origin propagation partly open.** Every reading submission derives a digest target from the actual text. The server validates that digest. Word requests distinguish authored display from child text, and authored requests cannot suggest spelling changes. Some actual child text still takes the authored default. | `ReadingPractice.tsx:22`, `readingReference.ts:1–6`, `gardenSpeech.ts:13–20`, `gardenWords.ts:9,17,22`; R2-04 below. |
| G1-F07: long writing | **Bounded word requests resolved for the supported sentence/window route; long oral submissions remain invalid.** The helper keeps full saved text and the UI replacement callback retains the original selected occurrence. | `readingReference.ts:8–17`, `AdditionalWordHelp.tsx:9–10`, `DraftReader.tsx:11,15`; R2-05 below. |
| G1-F08: actual opener | **Resolved for the new shared controls.** `ReadingTools` and `ConversationReadingTools` pass `event.currentTarget`; `practicePart` honors it. The remaining older callbacks are recorded for the owner's planned Group 3 replacement, not reintroduced here as a new shared-control defect. | `Reading.tsx:29,47`, `GardenApp.tsx:120`. Runtime focus/scroll and stale-target acceptance still belong to the owner's verification. The new capture/word-help issue is R2-01 below. |

The SHA256 display reference is an acoustic text binding, **not authentication of a canonical source or evidence that the child encountered it**. The new comments say this accurately, and neither digest validation nor word-help origin handling adds canonical exposure. Existing registered-source exposure guards remain separate. This review does not ask the owner to weaken those guards or activate a provider.

## Remaining actual defects

### R2-01 — Word help can hide a still-recording microphone and overlap replay

**Priority: fix before Group 1 sign-off.**

`ReadingPractice.tsx:29` renders interactive `ReadWords` in every phase, including `permission` and `listening`. Selecting one invokes the shared callback in `GardenApp.tsx:124`, which stops synthesized speech and opens the word card. It never calls the practice component's `stop()` or pauses its local audio element. `GardenApp.tsx:217` makes the still-mounted practice wrapper inert while the word card is open.

Consequences derived directly from that code:

1. During capture, the stream remains active while the microphone status and Stop control are behind the word card/inert wrapper.
2. Word-card Hear can play model speech while that stream is capturing.
3. During local replay, shared word-card Hear cancels synthesized speech only; it does not pause the `<audio>` playing the child's recording, so the two can overlap.

The existing blur/visibility cleanup does not run merely because an internal word card opens. None of this requires a provider request to occur.

**Bounded correction/acceptance:** Keep words noninteractive during permission/capture, or explicitly stop into local review before opening their help. Pause local replay before word help/model audio. Retain visible truthful microphone state. A labeled synthetic microphone case should open help during capture and replay and establish no hidden capture/model contamination or overlapping playback. Preserve the child's locally recorded clip until its normal discard/exit boundary.

### R2-02 — The common collector does not include all decision text

`ConversationReadingTools` collects only visible `[data-readable-text]` and `[data-source-component]` descendants (`Reading.tsx:43`). It is not a fallback reader for arbitrary plain labels/text. Consequently these current surfaces still have no exact-text support route:

- The choice prompt/legend (`Dialogue.tsx:11`). Reading choice 1 or 2 does not read the question that distinguishes them.
- Plain backpack item names and explanations, such as “Rina gave permission. Bring this intact tile to Sol.” (`GardenApp.tsx:194–197`). Those `<strong>`/`<small>` descendants have neither selector.
- The alternative placement labels “Over the opening” / “Beside the opening” (`BakeryControls.tsx:17`) and rehearsal Use this ending/Use this plan/Change the plan controls (`WorldActivity.tsx:24–26`). Opening Help reads general/current instructions; it does not expose these exact choice labels for inspection.
- Ordinary story title/context text and disclosure labels remain outside the collector unless separately wrapped; the special Duet title button does not cover all title words (`GardenApp.tsx:177–178`, `ReadingDetails.tsx:4–5`).

**Bounded correction/acceptance:** Make prompts and these named alternatives/item descriptions available through a deliberate support view before acting. Do not place nested help buttons inside action buttons. A neutral reading view of action labels may be shared rather than duplicated inline. Preserve the exact words, state, selected option and available alternatives. Pure utility controls such as Close do not require recursive help UI.

### R2-03 — “Note” still gives a musical meaning for a written message

The dynamic override table in `readingGlossary.ts:11` fixes play and the principal focus words, but not note. `supportedWordHelp` therefore retains `chapterGlossary.ts:2`'s definition **“Here, a single musical sound.”**

Concrete case: enter **“I wrote a note for Grandma.”** in the new Mara message preview and choose note. The actual sentence is correctly retained, but the displayed definition still contradicts it. This is not a request for an exhaustive dictionary; it is a specific incorrect reviewed definition in a supported child-text route.

**Bounded correction/acceptance:** Use the written-message sense for this sentence, or a suitably qualified general definition when the sense is uncertain. Retain the musical sense in the actual duet context. Never add an unrelated story event to explain an arbitrary child sentence.

### R2-04 — Some child-written text is still labeled authored display

`ReadingParagraph`, `ReadingTools` and `ReadingPractice` default to `authored-display`. The new Mara/optional-answer readers correctly pass `child-draft`, but several Sol routes omit it:

- The chosen ending and library contribution (`ChapterPanels.tsx:89,95,105,133`).
- The performed/selected child contribution goes through `renderText`, whose word target has no child origin (`ChapterPanels.tsx:29`, `GatheringPanels.tsx:18,23`, `GardenApp.tsx:102,114,218`).
- The dedicated current Sol draft calls `practice(text, 'sol-draft-'+revision)` with no origin (`DraftReader.tsx:17`), so the shared default produces `display-authored-display` for the child's writing.
- The combined conversation practice defaults to authored display even when its DOM collection includes an opened own-message/answer/ending reader (`Reading.tsx:43–47`).

Canonical exposure is still guarded; this finding is about false origin attribution, including word-service treatment of those selected words. It must not turn the child's unverified writing into authored story material.

**Bounded correction/acceptance:** Propagate origin explicitly through selected/performed contribution readers and oral callbacks. Give a mixed conversation a truthful display-reference kind or preserve its component origins. Compare the same child wording in draft, chosen ending, performance and lantern view: words and origin stay truthful throughout. Full-story session UI can still be replaced in Group 3.

### R2-05 — Oral feedback still submits text the server must reject

`ReadingPractice.tsx:22` submits its entire `text`. `ReadingTools`, the current Sol draft and the aggregate conversation tool can provide more than 4,000 code points. `gardenSpeech.ts:56` rejects such a request before provider availability. There is no client bound/selection/limit notice in that path; after rejection the UI reports ordinary unavailable feedback.

The bounded **word** helper fixes a different request and does not fix this oral submission.

**Bounded correction/acceptance:** Before recording/submitting an over-limit target, explain the feedback boundary and offer a supported part, or keep the target explicitly in local-only read/record/replay mode with no invalid feedback request. Preserve the complete text. The Group 3 full-story flow can later replace the session controls; avoiding structurally invalid Group 1 requests does not require that redesign now.

## Existing test definitions reviewed, not executed

`checks/garden-reading-support.test.ts` covers exact digest matching, origin-separated digest values, long word-context selection, authored-display spelling rejection and selected dynamic vocabulary examples. Those are relevant local contract cases, but they do not cover note, the UI's child-origin propagation or over-limit oral requests.

`browser-tests/garden-reading-support.spec.ts` exercises initial Mara choice inspection, one Mara reply, ready-state practice word help, own-message reading and compact layout. Its voice stub is explicitly labeled synthetic. The word-help-in-practice step occurs in **ready**, so it cannot catch R2-01's active microphone/replay cases. Despite the broad first test title, its route does not establish every character/surface.

The implementation owner should extend or pair the focused cases above with its current UI verification, then record each remaining finding's disposition against the exact final candidate. The reviewer has not run or endorsed the owner's in-progress browser results.
