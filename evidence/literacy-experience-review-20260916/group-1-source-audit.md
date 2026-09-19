# Reading support correction: Group 1 source audit

Status: **AUDIT COMPLETE — GAPS IDENTIFIED IN AN IN-PROGRESS SNAPSHOT**.

This is a source review, not implementation acceptance. The implementation task was already editing Group 1 while this review ran. Findings below bind to the saved `source-audit-1/` files and `source-audit-1.json`, captured at 2026-09-16T03:18:14.7616720Z. All 49 copied files matched their source bytes immediately after capture. Later working-tree edits require their own disposition; this report does not claim they are still defective.

## Scope and next action

Tony's current order is (1) reading, word, listening and oral support everywhere, especially NPC replies and choices before selection; (2) Rina's continuing narrative and meaningful decisions; (3) complete-story reading/listening/narration, with optional smaller-part practice. This report handles **only the first correction**. These correction groups do not replace the existing TASK11 plan or the eight previously connected gameplay groups.

The implementation owner, **Refine Evidence Quest game flow**, should finish the Group 1 coverage and target/context corrections below, then verify the bounded acceptance cases. No further design question is needed to make this work concrete. Do not begin Group 2 on the strength of this source audit.

Reviewer actions were limited to source/document reads, the frozen copies, review artifacts in this directory, and messages to the authorized implementation task. Runtime edits, browser use, tests/builds, microphone use, provider requests, subagents and Git writes were **NOT RUN** by this review. Existing provider, learner, art and device qualifications remain open; TASK11.19 remains halted.

## Existing authority

- `R09-READING-MATERIALS.md:21–27`: source availability, opening, hearing, possession, delivery and sharing differ; text needed for a choice stays available.
- `R10-FLUENCY-AND-NARRATION-CONTRACT.md:7–20`: an immutable exact-text target, source/draft revision and range; explicit capture/submission; invalidation and recording disposal; no automatic success claims.
- `R12-VOCABULARY-TEACHING.md:10–24`: occurrence-specific meaning, word/phrase/sentence distinctions, title versus body exposure, help for child text and no inferred mastery.
- `R14-SUPPORT-AND-DIFFICULTY-CONTRACT.md:7–11,25–29`: help before errors, no answer/action side effects, no undisclosed facts, exact current target and return point.
- `R16-LAYOUT-AND-ACCESS-CONTRACT.md:54–66`: retain the sentence, restore its opener, preserve input ownership, and play one voice/recording at a time.

The five contracts above are copied in the snapshot. Scope remains with TASK11.07/.08/.09/.13/.14/.16/.21 and their existing bindings, as recorded in `docs/game-review/CONVERSATION-SEQUENCE-CORRECTION-20260915.md:34–42`: FIX11.NPC/SEARCH/RECAP, FIX11.ACCESS/OPEN/MOVE and interrupted-save/recovery families; CHECK11.CONTENT/EXPOSURE/STORY, RECORDS/SAVE/INTERRUPT, ROUTES/RESOURCES/PAYOFF and G06/X01/X02/VISUAL. Finding and acceptance identifiers below are review labels, not replacement implementation tasks.

## What the snapshot already improves

- `Reply` supplies selectable words, listening and an oral-practice entry for NPC replies (`Dialogue.tsx:4–6`).
- `Choices` adds separate reading previews while retaining the original commit buttons. Preview tools do not call those buttons' game handlers (`Dialogue.tsx:8–10`). This is the right separation to preserve.
- Confirmed Mara messages use the same tools; delivered words continue to come from the immutable delivered snapshot (`MaraMessage.tsx:22–35`).
- `ReadWords` emits `data-readable-text`, not canonical source/exposure IDs (`Reading.tsx:9–22`).
- Existing Sol draft support keeps its own revision, selected occurrence, explicit spelling replacement and undo (`DraftReader.tsx:5–15`).
- Recording starts only through Start listening; submission is separate. Existing source code preserves local recording cleanup and unavailable-service notices (`ReadingPractice.tsx:12–33`). This review did not execute or qualify those paths.

## Coverage inventory

“Sentence audio” means the child can open a word card and hear its sentence; it is not a direct passage-listening or oral-practice control. “Present” describes code wiring only. Every row still needs applicable runtime acceptance.

| Text surface | Word support | Listening / oral practice | Snapshot evidence and gap |
|---|---|---|---|
| Canonical source paragraphs | Present, source-bound | Shown page / short part | `GardenApp.tsx:92–104,179–185`; keep exact source identity. Whole-story sessions are Group 3. |
| Titles and source/context labels | Partial: special Duet title | Duet title audio through its word card | `GardenApp.tsx:175–180`; other title words and contextual labels are ordinary text. |
| NPC replies through `Reply`; attributed transient notices | Present | Direct listening and practice entry | `Dialogue.tsx:4–15`; context and target-contract findings still apply. |
| Direct button children of `Choices` | Separate word preview | Direct listening and practice entry | `Dialogue.tsx:8–10`; safe separation exists, but not all choices are collected. |
| Choice legends, disclosure titles, standalone action labels | Mostly ordinary text | No shared inspection route | `Dialogue.tsx:10`, `ReadingDetails.tsx:4–5`, `ChapterPanels.tsx:103–104,114,150–152`. |
| Mara's own message while still editing | None for the draft | None for the draft | `MaraMessage.tsx:14–20`; tools appear only after confirmation. |
| Prepared/confirmed and delivered Mara messages | Present | Direct listening and practice entry | `MaraMessage.tsx:22–35`; distinguish authored text from child writing and actual delivery. |
| Sol's current editable draft | Dedicated draft reader | Model, retry, local recording entry | `DraftReader.tsx:5–15`, `ChapterPanels.tsx:99–100`; long-target boundary remains. |
| Sol's chosen ending and notebook/library summaries | Words via `ReadingParagraph` | Sentence audio; no common full target practice | `ChapterPanels.tsx:89,95,105,118–120`; selected words must remain distinct from later draft edits. |
| Current gathering caption in the world | Word buttons are rendered | Help is separately reachable through Read this part with help | `GatheringPanels.tsx:9–18`; direct caption word clicks have no mounted word card while `s.panel` is null. |
| Gathering reader and dynamic welcome/selected contribution | Canonical renderer or dynamic text renderer | Hear/practise controls | `GatheringPanels.tsx:18–23`; several practice target families are unrecognized by the server. |
| Boat, bridge, Mara repair and bakery instructions/actions | Mostly ordinary text | No shared support for the exact instruction/choice | `BoatControls.tsx:7–17`, `MaraWorld.tsx:13–27`, `BakeryControls.tsx:9–24`, `GardenApp.tsx:223–228`; rereading another account is not support for this exact text. |
| Gathering-plan and ending rehearsal previews | Ordinary text | No exact preview-text support | `WorldActivity.tsx:20–26`; the accept buttons act immediately. |
| Help, backpack, goal/recap, save/error notices | Mostly ordinary text | No common text-support route | `GardenApp.tsx:133–139,192–203`; these are essential orientation/recovery reading surfaces. |
| Lantern world captions and Loop picture text | Plain captions; source help via explicit reader | Loop caption has Hear; reading/practice through reader | `FinaleActivity.tsx:10–25`; appended selected child contributions need their own exact support target. |
| Optional questions, hints and status text | Many use `ReadingParagraph` | Sentence audio; no common oral entry | `FeedbackActivity.tsx:34–40`; `ReadingParagraph` itself contains no `ReadingTools`. |
| Optional written answers and generated feedback | Draft textarea/raw reply | Say my answer is transcription, not reading the written answer | `FeedbackActivity.tsx:34,38–39`; do not conflate composing speech with practicing existing words. |
| Text inside reading practice and transcript review | Plain target paragraph/editable transcript | Local model/record/replay controls | `ReadingPractice.tsx:26–33`; the shown target has no in-practice word help. |

Controls such as Stop or Close need accessible names and predictable operation. They need not recursively create more support interfaces inside word-help controls. That utility boundary must not exclude story choices, instructions, titles, feedback, recovery notices or child-authored text from reading support.

## Concrete findings

### G1-F01 — Coverage is broader than the new Reply component

`ReadingParagraph` wraps only `ReadWords` (`Reading.tsx:32–34`). It does not provide its own passage listening or oral practice. Other surfaces remain entirely plain, including Help/backpack, world instructions, rehearsal text, optional answers, generated feedback and the practice target itself. Some routes have a separate source reader, but it can show different words from the instruction or child's current contribution.

**Required result:** Every actual reading/decision surface has a discoverable route to support for those exact words. A shared contained helper is acceptable; adding repeated full control rows to every sentence is not required. Preserve the readable conversation layout and original wording.

### G1-F02 — World caption words can open invisible help

`GatheringControls` renders `ReadingParagraph` outside the reader (`GatheringPanels.tsx:13`). Its word callback sets shared word state (`GardenApp.tsx:123`), but the word card and practice overlay exist only inside `s.panel && <section>` (`GardenApp.tsx:174,215–218`). The world caption is shown when the panel is closed. Its word click therefore has no mounted help card; it also makes the header navigation inert through `!!word` (`GardenApp.tsx:126`).

**Required result:** Support requested from a world caption is visibly mounted and can close back to the exact caption without advancing the speaking turn, moving the actor or trapping the child without navigation. This is a source-derived defect, not a browser observation.

### G1-F03 — Some choices are omitted from safe inspection

The collector accepts only direct children whose `type === 'button'` (`Dialogue.tsx:9`). It does not inspect a fragment's contents. The two Mara picture choices are inside a fragment (`ChapterPanels.tsx:81`) and therefore do not appear in its preview. Standalone world/rehearsal/Keep this moment actions and disclosure titles are outside `Choices`; their labels do not acquire this route. The legend is also plain text.

**Required result:** Cover every displayed alternative and its prompt, in displayed order, including conditionals, fragments, and non-conversation decisions. Keep unavailable/selected status truthful. Reading a choice must never invoke its selection handler. Do not nest word/help buttons inside an action button.

### G1-F04 — A child must not confirm writing to get reading help

An unconfirmed Mara message has only a textarea and confirm/replace actions (`MaraMessage.tsx:14–20`); its support appears after confirmation. Optional answers have a textarea and transcription but no reader for their current written words (`FeedbackActivity.tsx:34,39`). The existing Sol draft reader demonstrates the necessary separation.

**Required result:** A child can inspect, hear and practice the current writing before confirming or delivering it. Reading never edits it. Any spelling replacement remains an explicit action tied to a revision and exact selected occurrence. Preserve the already confirmed/delivered Mara message and the ending selected for Sol if a working draft changes later.

### G1-F05 — Global story-specific meanings are unsafe for arbitrary text

The shared word card calls `wordHelp` without an occurrence/source discriminator (`GardenApp.tsx:107`). `content.ts:145–153` binds mended to Mara's bird, assumed to Grandma's interpretation and several other words to specific story events. The general glossary defines play as making music and note as a musical sound (`chapterGlossary.ts:2`). These rules now also receive choice labels and child writing.

Concrete counterexamples available through the new UI: a confirmed child message or selected ending containing **“Sol mended the roof.”** gets the Mara/bird explanation; the readable choice **“Play from the beginning”** gets the music sense of play. These explanations do not describe the selected occurrence. Child text must not disclose or certify an unrelated story event.

**Required result:** Apply reviewed context only to the exact matching occurrence/context. For other authored text or arbitrary child writing, use a suitable general sense or a truthful unavailable/uncertain path. Preserve title/body exposure restrictions and do not unlock knowledge by looking up a word.

### G1-F06 — New practice targets do not match the server contract

`ReadingTools` builds `reading-<useId>` (`Reading.tsx:25–28`), while `server/gardenSpeech.ts:12–17` recognizes only specific source, draft, ending and welcome forms. The new reply/choice target family is rejected before provider availability is checked. Existing `gathering-*`, `sol-selected-*` and `sol-performed-*` targets also have no accepted branch. Local capture/replay can still work; the displayed practice entry does not establish a valid feedback target.

There is also no explicit authored-dynamic identity: `ReadingWord` stores all new text as a `draft` (`Reading.tsx:3,17`), and the word endpoint labels every `source:null` target `child-draft` (`server/gardenWords.ts:21`). A runtime component ID is not the source revision/range contract in R10.

**Required result:** Preserve three truthful kinds—registered exact source, authored dynamic text, child-written revision—and an immutable selected text/range. Align client/server validation without accepting arbitrary strings as canonical evidence. Disabled live feedback may stay unavailable; it must not be represented as qualified or activated to complete this local correction.

### G1-F07 — Long writing can never reach the word service as currently sent

Mara's input accepts 100,000 UTF-16 units (`MaraMessage.tsx:16`), while draft word requests require the complete `draft` to fit 4,000 code points (`server/gardenWords.ts:11`). `ReadWords` and `DraftReader` send the complete text. A short selected word in a long draft therefore fails regardless of provider availability. Speech requests also have a 4,000-code-point text boundary (`server/gardenSpeech.ts:53`).

**Required result:** Keep all written text, and provide an explicit bounded sentence/range for support when necessary, retaining full-draft revision and range correspondence. Do not silently truncate saved writing, select a different occurrence or hide a structurally rejected request as an ordinary provider outage. This does not decide Group 3's complete-story experience.

### G1-F08 — New support must preserve actual opener and target lifetime

`ReadingTools` practice callbacks omit their clicked element (`Reading.tsx:28`); `practicePart` captures `document.activeElement` (`GardenApp.tsx:119`). The earlier C5 correction established why the actual clicked opener matters across browsers. Return behavior for these new controls needs the same acceptance case. Current target state is `{text,id}`, without explicit source/draft revision and range (`GardenApp.tsx:39`).

**Required result:** Close or Escape returns to the exact invoking word/control and retained scroll position. Switching passage, editing the target or changing the underlying choice set invalidates the previous attempt, pending feedback and replay. Temporary help must not read or apply a stale selection. This finding identifies missing source guarantees; no new focus failure was observed in a browser by this review.

## Source/exposure boundary to preserve

The new `ReadWords` correctly avoids canonical exposure attributes. Canonical paragraphs still receive exact IDs through `paragraph` and the visibility collector (`GardenApp.tsx:83–104`). The reducer checks registered source IDs and current allowed sources (`model.ts:12,297`).

The older dynamic `renderText` path calls `paragraph(..., 'current-turn')` (`GardenApp.tsx:113`), which emits `GA.SRC.CURRENT-TURN.*` attributes. Those IDs are not registered and the current reducer rejects them; **this review does not report an observed canonical-exposure leak**. Keep dynamic text visibly/structurally distinct instead of relying on rejection of invented source-looking IDs. Assistance, model playback, a selected answer, possession, delivery, an actual gathering turn and completion must remain separate records. None proves comprehension or improvement.

## Bounded acceptance cases for the implementation owner

All cases below are **NOT RUN by this review**. Use real UI/handlers for local acceptance; any synthetic microphone/provider seam must remain labeled. No live provider call or learner claim is needed.

| Case | Concrete trigger and required result |
|---|---|
| G1-A01 NPC replies | Open a green reply from Mara, Grandma, Sol and Rina. Read a word, hear its sentence and enter/leave oral practice. The exact reply remains available; no next reply, action, delivery or answer occurs. |
| G1-A02 Choices before commitment | Inspect both “I can read your story to Grandma” and “I'll ask Grandma to start the next gathering later,” their prompt, both fragment-wrapped Mara pictures, and a plan/world confirmation. Every actual alternative remains available in its original order. Word/help clicks, Enter and Space on help do not choose it. Only the original explicit choice commits. |
| G1-A03 World support | Request word/listening/oral help from a gathering caption, Mara repair instruction, Rina/bakery instruction, seed-boat instruction and rehearsal caption. The helper is visible and closable. Retain actor, turn, target, preview and selected contribution; no movement, placement, resource transfer or turn advance comes from reading. |
| G1-A04 Three text kinds | Compare an exact canonical paragraph, a generated-from-state authored reply and child writing containing the same words. Only the exact visible registered source receives canonical exposure. A choice preview, title, model playback or own message cannot substitute for body exposure, possession or delivery. |
| G1-A05 Contextual meanings | Compare mended in Mara's accepted bird passage with “Sol mended the roof.” Compare music play/note with game Play/read the note. Meanings describe the selected sentence; unrelated motives/outcomes are not revealed. Unknown/invented words and unavailable additional help remain truthful. |
| G1-A06 Writing before confirmation | Type an own Mara message, an optional answer and a Sol ending. Read/hear/practice each before confirmation. Cancel support and verify identical text/revision. After explicit confirmation/delivery or ending selection, change only the working draft and verify the earlier frozen contribution is unchanged. |
| G1-A07 Long writing | Use more than 4,000 code points with a repeated target word near the end. Read/help/practice the explicitly selected bounded part with exact offsets/revision; preserve the full writing. A supported spelling edit touches only the chosen occurrence and can be undone. |
| G1-A08 Focus and input | Keyboard, mouse and touch open/close word help, choice help and practice at 320px with largest/roomier text. Keep complete labels and usable targets. In WebKit, begin with a textarea focused, click Read aloud, then close: focus returns to that clicked control. Reading arrows do not move Pip/Mara/the boat. |
| G1-A09 Audio consent/unavailability | Hear requests no microphone. Opening oral practice starts no capture. Only Start listening requests access; Stop retains local review; only explicit Get feedback submits. Denial/no voice/no service leaves the text and normal continuation available, without scores or success claims. |
| G1-A10 Target invalidation | Edit a draft or change a passage/choice while an old help/feedback response is pending through a labeled synthetic seam. Reject the stale response, revoke the old clip and restore the current target. Reject forged canonical IDs, wrong revisions/ranges and mismatched text before any provider request. |
| G1-A11 Orientation/feedback coverage | Read an actual current goal, Help recap, backpack item/delivery state, optional question/hint, feedback reply, recovery notice and practice target. Support refers to those exact words; it does not advance progress or replace the child's answer. |
| G1-A12 Presentation and qualification | Preserve one readable conversation and all alternatives together; avoid nested interactive buttons, duplicate IDs and obstructed selected sentences. Record the exact candidate/files and browser-specific outcomes. Do not treat an unavailable-service response, synthetic audio, old test results or this audit as live speech/learner/device qualification. |

Group 2 remains outside this review. The existing short-part versus complete-story limitation is recorded only as a dependency for the separately authorized Group 3; it is not a reason to rewrite the story sequence while fixing Group 1.
