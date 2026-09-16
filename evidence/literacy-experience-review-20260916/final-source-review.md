# Group 1: final independent source review

**PASS — BOUNDED SOURCE REVIEW.** No unresolved defect remains in the five focused findings from the re-audit. This closes the source review; the implementation owner's browser verification determines Group 1's implementation acceptance.

## Exact edition

- Owner candidate: `evidence/literacy-experience-20260916/reading-sealed.json`, dated 2026-09-16T03:55:11.477Z.
- Candidate receipt SHA256: `ed123f95ba17eb86288782a62319c6e6f717dc7b99346c1c3fb815b2b8830b88`.
- Independent copies: `source-audit-5/` and `source-audit-5.json`, captured at 2026-09-16T03:55:26.0890771Z.
- **49/49 reviewed files match the owner's candidate. All 126 candidate file hashes also matched the working files when checked.**
- Manifest: `assets/GardenApp-DXi5HP29.js`, entry `assets/index-BNFWzdoV.js`, CSS `assets/GardenApp-CKnqLie0.css`.
- Checkout: `codex/first-connected`, base HEAD `63af7a2261553c2639842a458b54dde38311e3f7`.

The initial reports and snapshots remain intact. Their findings apply to those earlier editions, not this final candidate. `final-source-review.json` records the binding, source preservation, asset hashes and review boundary.

## Findings closed

| Finding | Final source disposition |
|---|---|
| R2-01: capture/replay and word help | During permission/capture, the practice target is plain text; Stop and microphone state stay in the practice dialog. Reader top/title, navigation and background reading content are inert for the shared modal. Spoken answers now use that same modal rather than an independent inline recorder. Opening practice word help pauses local replay first. This closes both the direct-word and Duet-title paths identified during review. |
| R2-02: complete inspection of the named text/choices | Read screen captures the world action area or current reader, including decision legends, title text and item names/descriptions. Speaker/body blocks stay separate; cloned captured blocks remove reading-tool descendants. The inspection displays mixed text without invoking the original actions or canonical exposure. Its handler preserves unplaced previews for return, rejects ordinary Help re-entry and the maximum stack depth, and clears inspection on the matching return. |
| R2-03: wrong meaning of note | Dynamic note/notes now have an appropriately general written-message/music definition; the actual sentence remains its context. Existing exact canonical meanings remain separate. |
| R2-04: child writing mislabeled as authored | The current draft, chosen contribution, performed turn and lantern reader propagate child origin. The performed/selected/gathering practice callbacks pass both the actual opener and origin. `SpokenLine` carries the origin of a child contribution. The final legacy child paragraph correction is present in `ChapterPanels.tsx:133`. Conversation/screen aggregates use mixed-display. |
| R2-05: oversized oral requests | The shared `ReadingSession` uses exact, contiguous text pages of at most 1,800 UTF-16 units, below the endpoint's 4,000-code-point bound. Page navigation is disabled during permission/capture. A page change remounts practice, releasing the previous recording and request. The full written text remains intact; local page position is not story completion. |

Relevant code: `Reading.tsx`, `Dialogue.tsx`, `GardenApp.tsx`, `FeedbackActivity.tsx`, `ReadingPractice.tsx`, `ReadingSession.tsx`, `readingPages.ts`, `readingReference.ts`, `readingGlossary.ts`, `AdditionalWordHelp.tsx`, `MaraMessage.tsx`, `DraftReader.tsx`, `ChapterPanels.tsx`, `GatheringPanels.tsx`, `gathering.ts`, `model.ts` and the two garden word/speech service contracts. Exact copies are in the final source snapshot.

The earlier invisible world-word buttons, omitted fragment choices and lack of help for unconfirmed Mara writing/optional answers were also corrected. The shared practice opener captures the clicked control. Existing complete-story entrypoint work remains the separately ordered Group 3 correction; this verdict does not claim that experience is complete.

## Evidence boundaries preserved

- Canonical source exposure still requires registered source components in the allowed reading context. Dynamic replies, choice inspection, child drafts and mixed screen text do not receive substitute canonical IDs.
- A display digest binds an acoustic reference to exact text. It does not authenticate a source, prove exposure, validate the child's story claim or grant progress.
- Drafts, chosen contributions and delivered messages retain their separate roles. Reading assistance does not select a choice, deliver a message, place a physical object or establish learning.
- Recordings remain explicitly started, locally reviewed and explicitly submitted. The source review made no microphone or provider request.

## Verification boundary and next dependency

This reviewer read source, contract definitions and test definitions, compared file hashes, and wrote artifacts only in this review directory. **Reviewer runtime edits, builds, test runs, browser sessions, provider calls, subagents and Git writes: zero.**

The owner's focused cases cover reply/choice inspection, own-message/compact support, world-preview preservation, synthetic microphone/replay ownership and long-text page/resume behavior. The final ownership fixture explicitly stubs microphone, AudioWorklet and media play/pause. Its result can establish command and focus ownership, **not native decoding/playback, microphone hardware or acoustic accuracy**. The owner separately reported WebKit native WAV `play()` raising `NotSupportedError`; that qualification limitation remains open. This source verdict does not overwrite a failed native result with a synthetic pass.

The owner should combine this receipt with the exact final browser results before marking Group 1 complete and proceeding to the authorized Rina correction. Existing live-provider, learner, art and device qualifications remain open; TASK11.19's halt is unchanged. No Group 2 work was performed by this review.
