# Group 2 independent review — initial findings

Status: Corrections accepted by implementation owner; rebuilt candidate verification pending.

Scope: independent review of the shared interaction packet and implementation, with the other task owning runtime edits. Tony directly authorized collaboration through all groups in this task after the earlier Group 1 stop. Historical Group 1 evidence is preserved.

| ID | Finding and observed path | Required correction | Evidence |
|---|---|---|---|
| G2-RV01 | Rehearsal -> Help -> Read Grandma's letter stays in Help; rehearsal -> Backpack -> Read Pip's possessed Mara story stays in Backpack. Enabled source controls are silently ignored by the activity OPEN guard. | Permit eligible nested source reading while the activity is paused; preserve Help/backpack/activity return chain, actual possession/exposure guards, and suppress unrelated story actions in these source views. | handler-observations-initial.json; real reducer commands in an isolated in-memory run |
| G2-RV02 | Both notices have actually been delivered, but plan preview says no invitations were sent/the friends have not heard this plan. | Explain what the preview does without rewriting past notices. Derive each recipient's current/proposed expectation, including unchanged and partially changed plans. | handler-observations-initial.json; interaction.ts and WorldActivity.tsx copy |
| G2-RV03 | The reader traps keyboard focus within itself but Help/Backpack/Pause are outside. Native Tab from backpack Close cycles Read, Back to Pip, Close, Read; shared support is unreachable without first leaving the reader. | Put support within a coherent modal keyboard boundary and test actual Tab/Enter paths, not pointer clicks labeled as keyboard proof. | In-app browser 4195 first candidate, actual keyboard actions and read-only focused-element inspection |

## Initial checks that held

The activity's exact parent ID survived nested Help/backpack opening and closing. The reducer preserved actual invitation records during preview. Existing immutable contribution/revision guards and exact selection versus draft separation are present. These correct mechanisms do not close the findings above.

## Evidence limits

The handler exercise uses real reducer commands with an isolated in-memory game, with source/compiled hashes in the JSON receipt. It touches no browser save and sends no provider request. Native keyboard observation used the existing authored 4195 preview run without resetting it. No 4192 user save access, browser state injection, forced focus, runtime edit or live-model qualification occurred.

The implementation owner has accepted all three findings and is rebuilding their corrections. Final verdict will reference the rebuilt candidate's actual hashes and observed UI.

