# Group 3 desktop recheck

Candidate: `GardenApp-DQvoD8y-.js`, `GardenApp-yG9ufEeK.css`, root `index-DH-5eEEv.js`. Authored in-app QA tab on 4195; actual visible controls only.

## Passed observations

- Reload retained the guided boat at Grandma's landing, its seed cargo and Pip on the original bank. Receipt remained an explicit action. No delivery was inferred from arrival or reload.
- Revised launch/landing labels have leaders and leave the boat, cargo and rock visible. Dock and repair-box labels are separated in the ordinary world view.
- Help now names seed transport as the current purpose and explains steering, landing, cancellation and stopping. Returning gives the boat instruction and restores focus to Help.
- Explicit Give the seed to Grandma started the world receipt. Afterwards the boat was empty at the landing, Pip was still across the river, Grandma retained the seed and the soil had visible tilled lines. The receipt start and final soil/empty-boat result are captured. This record does not claim frame-by-frame trowel-motion measurement.
- The secure-bridge instruction correctly told Pip to cross. Actual Go to Grandma moved him across the repaired bridge.
- First Grandma conversation described the delivered seed, two named older lanterns and three waiting story flowers. No page-delivery source was shown: Mara still held her page, Sol had not been visited and the seed was not planted.
- Pip could explain Mara's account without filling the optional answer. Grandma corrected her belief without claiming a delivered page. Back to Grandma offered the separate later-time question. Selecting it agreed the time while deferring reader choice and actual invitations. `no-page-time-agreed.png` captures this.
- Planting closed the reader and showed the world action. The same planting place gained a glowing lantern flower; it did not instantly become a new story contribution. Ordinary next purpose points to Sol.

## Remaining UI correction at this candidate

At CSS320×568 the boat layout allocated zero width to the canvas. The developer is correcting this under G3-RV06. The Lantern stories badge also covered the planting area; it is included in the existing G3-RV03 label correction. These must be rechecked before the group receipt.

## Independent compiled results

`river-observations-final.json`:41 passing assertions; `migration-observations-final.json`:120 passing assertions from11 authentic prior payloads; `first-arrival-final.json`:7 passing assertions including a spontaneous request without an earlier offer. `rope-ownership-final.json` confirms no transfer from an empty box and exactly the remaining single rope taken in a partial old save. Synthetic envelope transport is explicitly labeled in these records.

The QA route was subsequently archived/restarted through the real Pause control to prepare another seed-boat layout check. The browser API reported a confirm interruption, then no active dialog and a fresh title screen. This proves the observed fresh UI transition, not native cancel behavior or archive-byte equality. Those are separate automated checks. The user's4192 save remains untouched.
