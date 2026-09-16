# The Garden Adventure: play and demonstrate the local chapter

[Play the current local demo](http://127.0.0.1:4200/garden). Refresh to load the current build. Progress on each origin is preserved; Pause → Start a new adventure archives the existing run before starting fresh. The launch commands below start a local server.

Guide Pip to keep his planting promise and help Grandma's friends share stories again. The player reads, speaks and confirms choices in conversations. Walking, collecting, repairing, delivering, storytelling and their consequences happen in the game world.

The September 16 update introduces SparkFest with the approved group illustration, introduces Loop before Pip's adventure, and plays complete gathering stories and Loop's ending continuously. Use Help → About SparkFest and Loop to revisit the introduction from a saved game. The earlier [continuity correction](game-review/DIALOGUE-CONTINUITY-CORRECTION-20260915.md) still governs the sequence of conversations and their choices. [Current build status](../BUILD-STATUS.md) records the separate verification scopes and remaining qualifications.

The prior Groups 1–8 checkpoint recorded design, local implementation and connected verification for the authored demo. All nine Mara/Sol outcomes have ordinary browser evidence. The final speech, return-focus and boat-entry corrections have separate affected checks; the full suite and all nine outcomes were not rerun on the final build. The full Chromium inventory records 111 passing cases and 2 remaining failed qualification cases across the named runs. [Integration results](../evidence/group-8-integration-20260915/integration-checks.json), [final native supplement](../evidence/group-8-review-20260915/native-final-supplement.json) and its [dated earlier whole-route review](../evidence/group-8-review-20260915/native-final.json) retain their exact scopes and editions. The [169-item runtime ledger](game-review/GROUPS-1-8-RUNTIME-COVERAGE.md) separates verified local behavior from remaining qualification. Owner play acceptance, live feedback, final illustrated artwork and learner improvement are not inferred from these checks.

## Run locally

Use the pinned workspace Node runtime and reviewed lockfile. From the repository directory in PowerShell:

```powershell
.\scripts\bootstrap.ps1
.\scripts\npm.cmd ci
.\scripts\npm.cmd run build
$env:COACH_MODE='authored'
.\scripts\npm.cmd start
```

Open **http://127.0.0.1:8787/garden**. The bootstrap verifies the official Node archive before installing it inside this workspace. No API key is required. The original four-room case remains at `/`.

For a different free loopback port, set both values before starting:

```powershell
$env:PORT='4197'
$env:PUBLIC_ORIGIN='http://127.0.0.1:4197'
$env:COACH_MODE='authored'
.\scripts\npm.cmd start
```

Use a free port; do not stop an unrelated listener. Tony's existing preview uses 4192. Independent review and automated tests use separate origins, so their saves do not replace his run. After a new build, refresh the preview to load its current assets. Refreshing preserves progress.

## One route from opening to ending

The steps below describe a later gathering where Pip reads and Mara listens. Keeping the usual time or having Mara tell her own story are equally valid alternatives. Reading has no countdown.

1. **Enter from Jo's studio.** Choose **Begin Pip's adventure**, read the promise, then **Start playing**. Grandma gave Pip the seed on an earlier visit. Today he is bringing it to plant with her.
2. **Speak to Mara at the passenger dock.** First choose **Watch Mara help these passengers** and see the service in the world. Then follow three short conversation parts with **Continue conversation** and **Choose Pip’s reply**. Speakers are named, and Help or a reload keeps your place. Her hours changed before the storm. She must help the last passengers ashore, so bridge repair alone cannot free her for the usual gathering. Offer to ask Grandma for a later time. Offer to read Mara's story if you want her copy: she gives permission and physically hands it to Pip. Her passenger boat and its separate operator are distinct from Grandma's seed boat.
3. **Repair the damaged footbridge.** Go to the bridge pieces and read the repair note. These are Grandma's reusable sections and maintenance ropes, with standing permission. Take the ropes. In **Arrange bridge**, choose a section and a visible post at the narrow crossing, preview its position, and choose **Place section**. Place the other at the opposing post, join the sections and fasten each real end. The wide crossing leaves a visible gap. A reaching but unsecured bridge can be attempted: it collapses, Pip retreats safely, and you rebuild with the same pieces. Retained attachments, seed, pages and story progress survive.
4. **Bring the seed to Grandma.** Walk across carrying it, or first load Grandma's separate seed boat and steer it through the clear channel to her mooring. A wrong bank or obstruction leaves the seed aboard for redirection. Receipt prepares the soil; Grandma waits for Pip. The boat never transports Pip or becomes the bridge. If needed, steer back and unload the same seed before returning to another task.
5. **Plant together and understand the garden.** Confirm planting; Pip and Grandma place the same seed in the soil and its flower grows. Grandma explains the two older story flowers, three waiting flowers and Pip's new flower. The Windy Picnic and The Unexpected Duet are optional earlier contributions, with identified authors. They are not unrelated tasks to complete. Report Mara's actual reason and ask for the later time; Grandma can agree now, before Sol's visit or any page delivery.
6. **Share Mara's story when you choose.** Giving Grandma the page and sharing it are separate actions. A first telling of The Torn Wing enters a clearly identified earlier dock event: you guide Mara while Pip waits in the present garden. Ask the boy's permission, fetch tape from the office, align the torn wing and place tape across the tear. Tape beside it leaves the wing loose; move the same strip to repair it. The boy keeps his original bird. Return to the actual garden teller and choose a supported lantern picture. Opening or practising the page does not share it. An early telling does not force another repair during the gathering.
7. **Find Sol helping Rina at her bakery.** Water enters through a cracked tile. Rina has moved the flour sacks away from the puddles and needs dry flour to bake the promised bread. Read Rina’s explanation, continue to Pip’s response, then ask to bring her spare tile. Collect it from the shelf, take it to Sol and give it to him. Bridge wood and roof materials have separate purposes and owners.
8. **Direct the roof repair.** Sol removes the cracked tile. Choose where he places the replacement. Beside the opening leaves the leak running; reuse the same tile over the opening. The leak stops while rain continues outside. Rina checks the dry flour. No hidden spoilage timer makes this a reading race.
9. **See what the repair made possible.** Make dough with Rina, shape the loaves and bake. Sol packs his own tools and begins his account at the workshop during this passage of preparation time. Take a loaf for thanks, guide Pip alongside Rina to the workshop, and let her give Sol the loaf. Other bread remains for her customers. This is an actual visit and gift, not a writing prompt about unseen events.
10. **Choose what Sol will share.** Read Sol’s draft and choose **Choose Pip’s reply** before selecting an approach. His original manuscript stops before the baking and thank-you visit you just witnessed. Write an ending as Sol, using “I” for him, choose a prepared bread or thanks ending, or invite him to bring the draft. **Try my ending** opens a world rehearsal. **Use this ending** separately keeps the exact version for sharing. Rehearsal does not bake more bread or transfer another loaf. Later working edits do not silently replace the chosen version. Child-authored wording and its directly selected picture are explicitly unreviewed while live meaning feedback is unavailable.
11. **Arrange the gathering through conversations.** Tell Grandma what each person actually said. Plan a time and teller, preview the consequence in the world, and confirm the plan. Then visit Mara and Sol and deliver their actual invitations. If the time or Mara's role changes, only people with incompatible information need updating. Tell Grandma everyone has agreed. A preview is not an invitation, and opening a page is not a report.
12. **Begin and welcome the actual guests.** The event advances story time. For a later gathering, acknowledge the boat returning, passengers coming ashore, Mara finishing duty and her walk across the retained bridge. Sol brings his actual page. At the usual time Mara stays working. Pip welcomes the actual participants. World speaking controls advance at your pace; reading help returns to the same speaker and passage.
13. **Bring the contributions together.** Pip or Mara tells The Torn Wing according to the plan. Sol shares the exact selected ending, or his open draft prompts a discussion. You can ask about baking or thanks and add an ending now, or keep the draft. Grandma then asks why Sol had stayed away, hears his own explanation, brings out the cushions, finishes her account and shares The Empty Bench. Each actual telling updates its existing flower once.
14. **Keep a memory and finish the right closing.** After Grandma's telling, choose planting together or sharing stories. Pip places that memory in the flower grown from the original seed. If Mara attended, she and Grandma finish their conversation. If she stayed at work, Grandma gives Pip an actual copy; walk it back across the bridge and give it to Mara. Her reply says she will read it after work. This route can finish at the dock without another trip to Grandma.
15. **Return to Jo and Loop.** Choose watch or narrate. Four world pictures and exact paragraphs reflect planting, Mara's arrangement, Sol's contribution and the applicable closing. Use Previous, Next, reading help or Pause without losing the current part. A finished show can replay from picture one; an unfinished replay resumes where it stopped. The six flowers retain their own sources, authors and actual contributions when revisited.

## Choices and controls

| Situation | How to act |
|---|---|
| Walk or find someone | Click the destination, use **Places & scene description**, or use arrow keys/WASD. **E** talks to the nearby character. |
| Bridge | Select the actual section, use a named opposing post or pointer preview, then **Place section**. Join and fasten separately. Movement/turn buttons provide non-drag controls. |
| Seed boat | Load, launch, steer, then explicitly dock for receipt or return and unload. Pip remains on shore. |
| Bakery or earlier bird story | Follow the named world controls for the current role and object. Reading/Help pauses the activity and preserves the return point. |
| Conversation | The response group identifies your role; choices use equally prominent buttons. Replies identify their speaker. Reading controls are labeled separately. |
| Backpack and help | **I** opens the backpack. Carried items have origins and uses; story records are distinct from possessions. **Where is that?**, Help and current feedback point to the next relevant place or action. |
| World storytelling and Loop | The complete story advances automatically. **Pause story**, **Resume story** and **Replay story** control it; complete-text help retains word and reading support. Real choices appear between tellings. Playback does not assess whether the child read aloud. |
| Flowers | Click a particular world flower, or open **Places & scene description → Inspect a particular flower**. Its title, owner, waiting/recorded state, picture and own reading route stay together. |
| Back and pause | Escape closes support or cancels an unconfirmed preview. Named Back controls retain context. Pause stops ongoing interaction; a held movement key cannot carry into a different role. |

## Reading, vocabulary and optional speech

Fixed source words have local meanings tied to their sentence. Phrase help includes **kept his promise** and **stayed put**. **Secure** is used for a fastened bridge and a held-down picnic cloth; **hesitated** appears in different supported situations. Duet title help does not reveal an unread later account. No lookup total is required.

Own reasoning, prepared hints and **Let Pip explain** have separate provenance. Sol's full working draft remains available even when the player selects a shorter feedback or practice span. Selected-occurrence spelling suggestions require **Use** or **Keep what I wrote**, with undo. An unavailable explanation never masquerades as an analysis of the child's wording.

Practice begins with the microphone off. A player can hear a local model voice when available or read independently without recording. Explicit **Start listening** requests microphone permission; **Stop**, temporary replay and discard remain separate. Leaving practice removes the clip. Spoken explanation transcripts would require confirmation before a separate meaning request.

**Live AI meaning and pronunciation feedback are unavailable.** The interfaces preserve drafts and offer truthful unavailable states; authored assistance is not live interpretation. Synthetic provider/audio tests prove only the stated integration behavior. They do not qualify pronunciation, expression, actual device capture or learning. TASK11.19 remains halted at exactly 1/75 provider attempts, with no hidden retries or activation.

## Saving and starting fresh

**Pause → Start a new adventure** is available during play and after completion. Confirming archives the current run before creating a new one. Cancelling retains it. Saved acknowledgment follows the actual IndexedDB transaction. Different origins and the original four-room case retain separate saves. Preferences survive a chapter restart.

Old saves preserve actual completed events and possessions. They do not invent later episodes retroactively. Interrupted actions, unknown/damaged records and stale windows follow the recorded recovery rules rather than silently replacing data. See the final evidence for each tested case and its limits.

## Demonstration and verification

Run and record the current game using the setup above. Older recordings and raw browser traces are excluded from the game repository following the authorized [artifact cleanup](TEST-ARTIFACT-RETENTION.md). Compact dated verification results and required fixtures remain; historical links to raw recordings do not imply those files are still included.

Record the longer chapter first; a demonstration of at most three minutes uses clearly identified cuts from actual play. Include contextual reading, a confirmed choice, physical repair or delivery, its consequence, and the matching ending. Show the bakery-to-bread connection and the effects of Mara's schedule. State that live feedback is unavailable. Editing a demonstration does not shorten or replace the playable story.

Run the required authored checks with the workspace wrapper:

```powershell
.\scripts\npm.cmd run validate:content
.\scripts\npm.cmd run check
.\scripts\npm.cmd run build:server
.\scripts\npm.cmd run test:contracts
.\scripts\npm.cmd run eval:coach -- --mode authored
.\scripts\npm.cmd run build
.\scripts\npm.cmd run test:browser
```

Browser setup and separate-port options are in [README](../README.md). The final ledger distinguishes all nine ordinary browser routes from the 45 real-handler physical/story combinations, native observations and labeled save/fault fixtures. Performance failures, physical-device coverage, final illustrated artwork, owner play acceptance and learner evidence remain explicit; none is inferred from a passing build.

## Resolved boat entry defect

The boat now approaches the dock from inside the visible river. [G8-V01 resolution](../evidence/group-8-review-20260915/boat-entry-resolved-review.json) retains the earlier failure and the corrected desktop/compact observations. Final illustrated-art and owner acceptance remain separate.
