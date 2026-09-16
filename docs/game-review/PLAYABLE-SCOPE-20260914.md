# What the current playable encounter includes

**Historical inventory, superseded later on September 14.** Tony subsequently authorized building the complete chapter. See the [implementation checklist](FULL-CHAPTER-IMPLEMENTATION-20260914.md) and [complete chapter guide](../GARDEN-COMPLETE-DEMO.md) for the current implementation and remaining live-service qualification. The inventory below records what was missing before that work.

September 14, 2026. Tony asked whether the current game contains the complete story, choices and consequences developed in the review. **It does not.** The running `/garden` build implements the first encounter checkpoint. The complete Garden Adventure remains the agreed deliverable; the first-encounter handoff explicitly retains that full scope.

This is an implementation inventory, not a new design proposal or a request to approve existing decisions again. D081 completed the remaining specifications under Tony's instruction. The earlier first-playtest proposal does not replace those approved specifications.

| Agreed part | Current `/garden` implementation | Work still needed from the approved design |
|---|---|---|
| Loop-ready entry and Pip's promise | Studio opening, enter the garden, read the promise | Connect the eventual earned ending back to the studio presentation (D022/R18) |
| Mara's account and help | Read the account, word meaning/local pronunciation, take the actual page, deliver it to Grandma | Child's own explanation, appropriate contextual feedback and separate real gathering plan (D049/D050/D070/D072) |
| River crossing and planting | Move/join/fasten two boats, correct wide/loose attempts, cross, plant together; optional seed-first route | Preserve these same actions and all valid physical histories through full-chapter integration (R15) |
| Sol and the child's contribution | Absent | Sol's source, disclosed later facts, supported endings or a valid open draft, writing/revision and relevant feedback (D016/D019/D026 and later writing decisions) |
| Gathering plan and consequences | The later-gathering button shows a conversational reply only | Actual time/reader selection, invitations, changes and outstanding updates, guest movement and story sharing; all accepted arrangements (D017/D023/D024/D026) |
| Grandma's own story | Mara-page report currently supplies Pip's correct explanation automatically | Actual accounts change what Grandma knows; share The Empty Bench and apply the selected Mara closing route (D020/D026/D040) |
| Lantern stories and remembered moment | The planted lantern-flower grows | Older stories, true event illustration, actual contribution/flower records (D021/D026/D041/R19) |
| Full ending | First-encounter completion after planting and Mara's page/report | All nine Mara/Sol narrative combinations, appropriate garden/dock closing, actual return delivery where required and earned four-part studio ending (D026/D042/R18) |
| Fluency, comprehension and vocabulary | Reviewed word help, local model speech when available, optional unassessed aloud practice | Actual optional recording/review and qualified listening feedback, source-grounded own-words/writing feedback and corresponding full-story activities (R10/R13/R20) |
| Replay | New-adventure archive mechanism existed but was hard to find in Pause | This correction exposes it in the fixed Pause actions, completion reader and post-planting scene actions |

The existing four-room application at `/` is a preserved older game; it does not fill these missing Garden Adventure features. Software completion, source exposure and help use remain separate from reading comprehension or improvement.

## Correct next scope

Tony's current playable review concerns the appearance, controls and first encounter. Full-flow acceptance cannot happen until the missing chapter is built. The source of the remaining implementation is the accepted decision set and R10/R13–R20 contracts, mapped through `remaining-contracts.json` and the existing TASK11 owners/dependencies. No replacement task order or reduced full-game target is introduced here.

The first-playtest discussion about meaningful consequences remains useful feedback. Existing D049 already covers the bridge-only explanation and Mara's work-time follow-up; D024 already covers actual plan changes, invitation dependencies and visible participation. These should be implemented and evaluated before asking Tony to redesign them. Any additional substantive change beyond the approved behavior remains for discussion with him.

TASK11.19 remains halted at 1/75 on exhausted credit. Authored/local chapter work is distinct from funded live text/speech qualification; no new provider request is authorized or made by this note. Existing performance and native-device gaps remain open. This inventory neither declares the full chapter built nor starts it silently.

Replay correction verification: production build and all four affected connected Chromium fixtures pass. The tests cover end-screen/world replay, cancellation, a new uncompleted run, the archived completed adventure, compact Pause visibility, recovery and stale-writer rejection. [Dated evidence](../../evidence/garden-replay-20260914/verification.json). The actual 4192 preview matches the final built assets. Tony's current save was left intact for him to restart explicitly.
