# The Garden Adventure: current prototype controls

**Completion claim superseded, September 14, 2026:** Tony's playthrough found fundamental missing gameplay and an incoherent experience. This guide describes the current prototype's available screens and controls, not a complete delivery of the agreed game. Read the [experience audit](game-review/EXPERIENCE-AUDIT-20260914.md) and [169-item checklist](game-review/A-TO-Z-IMPLEMENTATION-CHECKLIST.md) for what must still be resolved and built. It remains available at `/garden`; historical engineering receipts do not establish experience acceptance.

## Play the chapter

Start in Jo's studio with Loop ready. Read Pip's promise, then guide him to Mara. You can carry her story or arrange for her to read it herself later. Read the river note, move and join the two bridge sections, and fasten the crossing. The seed boat carries only the seed. Pip walks over the footbridge. A collapse handler exists for a precisely aligned unsecured bridge, but ordinary placement/crossing remains defective in Tony's reported case. The requested visible collapse, retreat and rebuilding must be made reliably reachable through ordinary play.

Plant with Grandma and visit Sol's workshop. Read his draft, choose to finish an ending with him, or invite him to share the draft as it stands. His account of what happened afterward stays separate from the original manuscript. Own writing, prepared help, a rehearsal picture and the ending actually chosen for sharing have separate state. A later edit does not silently replace that chosen ending.

Tell Grandma what Mara and Sol said. Choose the gathering time and who will read Mara's story. Previewing a plan does not send invitations: walk to Mara and Sol and tell them. If the time changes, they still expect the old time until you tell them the new one. If Pip will read, obtain Mara's page. Begin at Grandma when the arrangements are ready.

At a later gathering, the last passenger boat returns, its passengers walk ashore, and Mara joins the garden. At the usual time, Mara stays at work. Welcome everyone, hear Mara's contribution, share Sol's chosen ending or discuss his draft, then hear Grandma's **The Empty Bench**. An unfinished draft remains a valid contribution. Choose Pip's lantern memory. On the usual-time route, physically carry Grandma's copy back to Mara before finishing the chapter.

Jo and Loop show four pictures and the ending matching those actual events. Three Mara arrangements and three Sol outcomes produce nine endings. Watch, narrate, pause, revisit the six lantern stories, or explore the garden. There is no reading-speed timer, answer score, compulsory mistake or AI approval gate.

## Reading and writing

Fixed story words open local meanings and pronunciation controls. Complete contextual cards and phrase help distinguish uses such as **secure**, **hesitated**, **stayed put** and **kept his promise**. **Duet** has title audio; its story explanation appears only after the relevant account has been exposed. Looking up a word is assistance, not evidence of independent comprehension.

Questions invite explanations in the child's own words. Prepared hints remain available. **Read my ending aloud** displays the exact current draft with independent reading, a model, emphasis rereading and word help. A spelling suggestion can replace only the selected occurrence after **Use**; **Keep what I wrote** and undo retain the child's control. The chosen story contribution still requires its separate action.

Reading practice starts with the microphone off. **Start listening** explicitly requests microphone access; **Stop** ends capture. Replay the temporary recording, discard it, or explicitly request feedback. Leaving practice removes the clip. Spoken explanations are a separate path: get an editable transcript, confirm its words, then request meaning feedback separately.

**Live AI and speech feedback are not available in this checkpoint.** The text, word, spelling and speech request paths are implemented with cancellation, limits and truthful unavailable responses. Synthetic provider tests verify integration behavior only. They do not establish live interpretation or pronunciation accuracy. The existing exhausted-credit ledger remains halted at 1/75; activation requires the separately coordinated qualification described in R13/R20. Local meanings, story hints, model reading when the browser has a local English voice, and temporary capture/replay work independently.

## Controls, saving and replay

Click destinations or use the named controls under **Places & scene description**. Arrow keys/WASD move Pip; **E** talks to a nearby character, **I** opens the backpack, and Escape closes a reader or cancels a preview. In bridge arrangement, use pointer placement/drag or the movement/turn buttons. Enter confirms a keyboard placement.

**Pause → Start a new adventure** works at any point. Confirming archives the current run before creating a new one; cancelling keeps it. Saved progress, writing and reading settings live in this browser's IndexedDB. Older encounter saves retain their progress and continue into the remaining chapter. Refreshing does not start over. A different port or browser has a separate save.

## Run locally

Use the workspace Node runtime and the reviewed lockfile; no secret is needed:

```powershell
.\scripts\bootstrap.ps1
.\scripts\npm.cmd ci
.\scripts\npm.cmd run build
$env:COACH_MODE='authored'
.\scripts\npm.cmd start
```

The default URL is `http://127.0.0.1:8787/garden`. Tony's running preview uses port 4192. Set `PORT` and `PUBLIC_ORIGIN` together for a different free loopback port. Browser tests own their separate port and do not reuse the preview or its saved run.

## Three-minute recording outline

Record a playthrough first, then select these moments from that actual run. This is a recording outline, not a claim that reading the whole chapter takes three minutes.

| Recording time | What to show |
|---|---|
| 0:00–0:25 | Pip's promise and Mara's work conflict. Open one contextual word card. |
| 0:25–0:55 | Physical construction; a loose crossing gives way, then the repaired bridge carries Pip. Plant together. |
| 0:55–1:30 | Sol's original page and later account; write a short ending, rehearse it, and explicitly choose it. |
| 1:30–2:10 | Pick a later gathering, deliver the invitations, and show Mara arriving after the passengers leave. |
| 2:10–2:35 | The shared stories, Grandma's changed understanding, and the lantern memories. |
| 2:35–3:00 | The matching ending with Jo and Loop; show independent narration or temporary reading/replay. State that live feedback awaits qualification. |

The repository keeps the original four-room case at `/`. Its existing performance and browser qualification limits remain separate. Neither automated playthroughs nor screenshots establish learner improvement or Tony's final visual acceptance.
