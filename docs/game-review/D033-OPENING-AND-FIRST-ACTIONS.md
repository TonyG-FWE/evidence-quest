# D033: the opening and first player actions

Revision 2, September 13, 2026. Tony replied "Yes thats clear" to the opening walkthrough and the question of whether its purpose and first action were clear enough. The shown sequence, text, initial prompts, and recoverable Help are agreed, completing R06 at opening-design scope. D022 supplies the studio/Loop-ready entry; D018/D029 the promise, letter, and first encounter; D030 the crossing puzzle. This records a design agreement, not a playable result. Unshown details and the full controls, layout, source-exposure, and save contracts remain with their later topics.

## 1. First screen: a reason to play and one way into the adventure

Show the studio with Jo, the paper story, and Loop ready. Keep the game name **Evidence Quest**. Agreed purpose line:

> Help Pip bring new stories to Grandma's garden.

Use the already agreed D022 introduction as Jo's readable dialogue:

> Welcome to SparkFest, our festival of stories and inventions. This is Pip's story. You'll guide him through it, read what he finds, and help him decide what to do. Then we'll show the ending you helped create.

The primary action is the agreed **Begin Pip's adventure**. It is available immediately; the child can begin without waiting for an introductory narration or navigating the studio. Loop projects the paper world and the view moves into the river scene. There is no preliminary equipment-recovery task under D022.

The purpose line and studio composition form the agreed first screen. The file-only no-extra-landing-screen detail and precise transition treatment were not separately shown and remain presentation proposals. This is the fresh-adventure case. A truthful Continue action for an applicable save is still a proposal for R19, including full save/version/migration behavior. This agreement authorizes no save reset.

## 2. The story opens at the river

Show Pip on the starting bank with his backpack, the broken footbridge, Mara at her separate passenger dock, the garden boats, and Grandma's garden across the water. The scene follows the coherent scale and actual physical rules agreed under R05. Exact camera framing, distances, art, and layout remain R08/R15-R17 work.

The opening text uses the existing D018 passage:

> Pip had promised Grandma that they would plant a lantern seed together before dark. He put the seed in his backpack and set off for her garden.
>
> Last night's storm had washed away the footbridge. At the river, Pip stopped and took out Grandma's letter. She had written it before the storm.
>
> "Mara and Sol hardly visit anymore. I think they don't enjoy coming to the garden now. I miss hearing their stories."

The agreed **Start playing** dismisses the opening and gives the child control of Pip; the opening and letter remain available through Help if skipped or forgotten. The suggested text-over-scene treatment and exact availability timing for this second control were file-only details; settle panel/scroll/focus and optional audio behavior in the later interface work without adding a reading gate. The quoted passage remains identified as Grandma's letter.

Keep the already agreed immediate goal visible:

> Reach Grandma's garden and plant the seed together.

This establishes both the immediate promise and the larger reason to investigate the quiet garden. Grandma's belief is her interpretation; the opening does not reveal Mara's or Sol's actual reasons before their accounts.

## 3. First action: move to a person with a story

Agreed initial movement prompt:

> Move Pip with the arrow keys or WASD.

Agreed suggested next action:

> Talk to Mara at the dock.

Identify Mara visibly by name. Near her, show the agreed **Talk to Mara** action with an **E** shortcut. The child can click that named action or press E. This accepts the shown opening inputs for the current localhost demo; the full R15 control/accessibility contract and broader device requirements remain open.

The prompt is a suggestion. The child may inspect the boats first and follow the already agreed supported alternate routes. Do not require a movement drill, a word lookup, a source-opening count, or a specific dialogue answer to enable exploration. Interaction reach and the river barrier still apply; a prompt cannot grant a remote conversation across an unavailable route.

## 4. First word help and a useful conversation

Continue D014's actual Mara interaction. At the point where the text says:

> I have an obligation to the passengers. I need to help them get safely off the boat.

Offer the agreed small help prompt:

> Click a word for its meaning and pronunciation.

Selecting obligation opens the already agreed D014 meaning, contextual explanation, and word/sentence pronunciation. Return to the same passage. Do not automatically open the definition, force use of help, or hide the conversation until a lookup occurs. Exact keyboard word selection, full word coverage, cue persistence, and audio behavior remain R12/R15-R17 work.

The shown offer **I can read your story to Grandma** produces the accepted page handoff and next task **Take Mara's story to Grandma**. Keep the unfulfilled planting promise visible; accepting a page does not complete it. Other agreed offers remain available, with copy appropriate to actual crossing/knowledge state.

## 5. Reach the first construction challenge

For this suggested route, direct attention next to the garden boats. The child can read D030's construction instruction and begin the agreed physical puzzle. Agreed entry control:

> Arrange boats

On entry, use the agreed role explanation:

> You can move the paper boats. Pip will wait on the bank.

Keep the agreed **Back to Pip** action available so the role change is clear. D030's wide/narrow location choice and fastening problem then supply the first construction challenge. No solved arrangement, compulsory failed attempt, new boat count, or extra resource hunt is added. Precise manipulation, mode/focus, and interruption rules remain R15/R19 work.

This follows the opening into its first encounter and construction opportunity. It is not a measured claim that every child will reach a particular action within five minutes, nor an answer to the separate pending total-playtime-versus-recording-duration question. R18/R20 will assess actual pace and confusion with a playable version.

## If the child skips or forgets the introduction

Keep a clearly labeled **Help** action available in the adventure. As shown and agreed, it provides the current goal, the opening/Grandma's letter, and the applicable control reminder without returning to the studio or restarting a completed conversation.

Help must use actual progress. Before meeting Mara it cannot disclose her private reason or imply the page was received; after a page handoff it may remind the child of the real delivery task. The full goal/recap priority and combined alternate states remain R07 work. Opening availability, actual displayed source components, and demonstrated understanding stay separate. D014's dialogue must retain the established story knowledge without claiming the player read skipped text.

Existing continuity agreements remain in force. The exact Continue presentation and old-save compatibility were not settled by this opening walkthrough and remain R19 work.

## Requirements from the demonstrated agreement

| Requirement | Agreed behavior | Evaluation scenario |
|---|---|---|
| D033.REQ01 | Show Jo, the paper story, and Loop ready with the shown purpose line; use D022's introduction and make Begin Pip's adventure immediately available | D033.AC01 |
| D033.REQ02 | Use the shown D018 river promise/letter, Start playing, and visible planting goal; keep the opening and letter recoverable | D033.AC01, D033.AC04 |
| D033.REQ03 | Introduce the shown arrow/WASD movement prompt, suggested Mara step, named nearby click/E conversation, and word-help hint with obligation; allow boats-first exploration | D033.AC02 |
| D033.REQ04 | Retain the planting promise when the actual Mara page handoff adds the delivery task | D033.AC02 |
| D033.REQ05 | At construction, provide Arrange boats, the shown director/Pip role explanation, and Back to Pip | D033.AC03 |
| D033.REQ06 | Keep Help available for the current goal, opening/letter, and controls when the introduction is skipped or forgotten, without requiring a restart | D033.AC04 |

| Scenario | What the eventual interaction must demonstrate | Current evidence |
|---|---|---|
| D033.AC01 | A fresh adventure shows the purpose, immediately available studio entry, exact opening, Start playing, and visible promise; physical scene/cast matches the accepted story | NOT_RUN; layout, transition, source exposure, and task mapping pending |
| D033.AC02 | Follow the Mara suggestion or inspect boats first; encounter the named controls and optional word help; an actual page handoff adds delivery without losing the planting promise | NOT_RUN; complete alternate-state guidance, input/access, and source mapping pending |
| D033.AC03 | Enter arrangement from Pip control, understand who moves the boats, and return through Back to Pip without silently completing the crossing | NOT_RUN; exact manipulation, focus, and interruption rules pending |
| D033.AC04 | Skip or later forget the opening, open Help, recover the current goal, opening/letter, and controls, then continue from actual progress | NOT_RUN; full recap/source-exposure and recovery contracts pending |

R06 is agreed at its opening-design scope. R07 now covers goal priority, navigation, and combined progress; R09/R12 the remaining reading/word variants; R15-R17 the complete input/access and presentation contracts; R19 the precise save/Continue behavior; R18/R20 actual pacing and usability. File-only layout, transition, and save details remain proposals. Map the accepted behavior to the original sources and existing TASK11/FIX11/CHECK11 owners before a build packet; no replacement task sequence is created here.

Agreement AGREED_DEMONSTRATED_OPENING; specification COMPILED_DIRECTION for D033.REQ01-06; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN.

| Revision | Change | Agreement evidence |
|---|---|---|
| 1 | Proposed the first-screen and first-action sequence with recoverable purpose and help | Pending at the time |
| 2 | Accepted the shown opening, prompts, role change, and Help; retained unshown details with their later topics | Tony: "Yes thats clear" after the complete opening walkthrough |
