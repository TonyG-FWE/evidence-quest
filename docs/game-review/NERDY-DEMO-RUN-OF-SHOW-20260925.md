# Nerdy live demo — 12-minute core

Tony drives on his computer or screen share. Allow three minutes of margin inside the 15-minute slot. Prepare Rina’s bakery through ordinary fresh play before the call. The complete opening, bridge, planting and finale are verified separately; this excerpt shows one connected reading-to-action-to-writing sequence.

| Time | Show | Explain |
| --- | --- | --- |
| 0:00–1:00 | The village and Rina’s bakery | “Evidence Quest is a reading adventure for ages 9–12. The child helps people, sees what their actions change, and uses those events in their writing.” |
| 1:00–3:00 | Rina’s conversation; one word’s meaning, pronunciation and sentence; brief optional reading practice | “Help stays beside the words. Listen plays the game’s voices. Practise reading lets me record and hear my own reading.” |
| 3:00–6:30 | Spare tile → repair → dry flour → dough → loaves → bread | “The action changes the situation. Repairing the roof keeps the flour dry; it doesn’t stop the rain. That makes the baking possible.” |
| 6:30–7:30 | Walk with Rina and watch her give Sol a loaf | “Sol sees his repair as a little job. Rina’s visit gives the player another perspective on it.” |
| 7:30–10:30 | Sol’s draft and later account; write an ending; show the recorded feedback segment | “The player writes from what they read and did. This recorded feedback came from the verified live request and responds to this draft and the sources the player opened.” |
| 10:30–12:00 | Try my ending → visible picture → Use this ending | “Trying an ending leaves room to revise. The player decides which ending to use.” |

## Before joining

1. Use the corrected game at **http://127.0.0.1:4496/garden** in Codex. Keep that tab and server open. Providers remain disabled for this rehearsal and delivery. Do not use an environment-loading launch command that enables another paid request; use the provider-free command below after a restart.
2. If preparing again, begin a fresh adventure. Complete the bridge, plant and grow the seed with Grandma, then go to Rina’s bakery. Stop at the opening bakery conversation.
3. Choose fullscreen if it helps the shared view. Confirm the receiving device hears computer audio. Tony has already confirmed microphone recording/replay and shared paragraph playback on this machine.
4. Keep the fallback video and this run of show open locally. Close unrelated windows containing private material before sharing.

Provider-free restart from the project folder (uses port **4364** and verifies the compiled package before starting):

```powershell
node --input-type=module -e "import {authoredEnvironment} from './scripts/demo-inputs.mjs'; import {spawn} from 'node:child_process'; const child=spawn(process.execPath,['scripts/demo-profile.mjs','start'],{env:authoredEnvironment(),stdio:'inherit',windowsHide:true}); child.on('exit',code=>{process.exitCode=code??1;});"
```

## Bakery controls

Choose **I can bring the spare tile to Sol**, then **Continue to the game**. The current instruction and highlighted objects show what to do:

1. Click the spare tile to approach its shelf. Drag it onto Pip, click Sol to approach him, then drag the carried tile onto Sol.
2. The camera presents Sol and the roof automatically. Drag the cracked tile away from its opening, then drag the spare tile over the opening. If it lands beside the opening, lift that same tile and move it. Escape cancels an unfinished drag.
3. Click the flour sack to approach it, then click it again to inspect the flour. Drag flour to the bowl. Click the dough to approach, then knead by dragging back and forth.
4. Draw two cuts through the dough to make three similar portions. The dark line previews the cut. Draw near an earlier cut to adjust it if the portions differ.
5. Drag the shaped loaf to the oven. When baking finishes, click the loaf to approach, then drag it to Rina.
6. Click along the ground toward Sol’s workshop; Rina walks with the loaf. **Map and camera → Fit map** is available if you want a wider view. At the workshop, click Rina’s loaf to step close, then drag it onto Sol. The thank-you conversation opens after the handoff.

Physical keyboard alternatives remain inside **Bakery directions and other controls**. The demonstrated route uses the scene objects above.

Talk to Sol and choose **Let’s finish the ending together**. Open **His draft** and **What happened next**, scrolling through both accounts before writing. Select the picture that matches the ending. Show the clearly labeled feedback segment from the fallback recording, then return to **Try my ending** and **Use this ending**. The live game remains usable with providers disabled.

A prepared adult example, if typing would consume the slot:

> I fixed the roof so Rina’s flour stayed dry. She baked the bread she had promised. Later, she brought me a loaf. I thought it was only a little repair, but it had helped her keep her promise.

Choose **Baking, then the visit** for that example. It is a presentation draft, not evidence of a child’s learning.

## If a service is unavailable

Feedback has a 15-second limit. If unavailable, the player can keep writing and trying their ending. The authorized live verification is already complete; no further provider requests or retries are part of this repair. The fallback identifies its recorded response explicitly.

The full-word replacement removes the old sentence-cut approach and SVG/CSS contamination. Tony finds longer words clearer; **have** remains unclear and some short words end abruptly. Those are known demo limitations. No universal pronunciation, production-art approval or learning-outcome claim is made.

## Fallback

Open [the local fallback player](http://127.0.0.1:4497/PLAY-DEMO.html), [PLAY-DEMO.html](../../output/nerdy-demo-bakery-fallback-20260925/PLAY-DEMO.html), or [the WebM recording](../../output/nerdy-demo-bakery-fallback-20260925/Evidence-Quest-Nerdy-demo.webm). The verified **12 minutes 2 seconds** fallback contains the corrected cursor gameplay and actual game audio from this exact candidate. Choose **Recorded feedback** to jump to the clearly labeled replay of the single successful live response. Seven chapter buttons make it easy to return to reading, roof repair, dough, handoff, writing, feedback or preview.

Native playback, audio signal and seven visual frames pass. The recording includes pauses for explanation, but no presenter voice; narrate those pauses live. The original live recording and previous fallback remain preserved separately. The local player server is available while this session remains running; the HTML/WebM files also work locally after a restart.

The full fresh journey, including all gathering narration and the finale, passes in **24 minutes 8 seconds**. It is a separate qualification run outside the live slot. The bakery-to-ending core is **12 minutes 0 seconds including presenter pauses**, leaving nearly three minutes of margin in a 15-minute slot. No game clock or audio was accelerated.
