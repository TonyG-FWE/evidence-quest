# Group 3 initial independent findings

September 15, 2026. Compiled API reviewed after the owner handoff. Native review is starting; this is not a final candidate verdict.

| ID | Reproduction through real handlers | Required result |
|---|---|---|
| G3-RV01 | Collect ropes; preview/place sections at the wide posts; join; move joined sections down0.1 to z=-1.9; place; fasten west. The handler accepts the fastening, but validChapter rejects the resulting save. `reaches` admits a0.22 post offset while `anchoredSection` requires0.01. | Valid ordinary placements and attachments must use consistent geometric and persistence predicates. Preserve the actual wide gap; do not resize sections. |
| G3-RV02 | Far-only collapse leaves B tied at x.775,z3,rotation0. Recover free A at the west pad; rotate A twice to PI; Join. The join handler changes tied B's rotation to PI. | Joining preserves the attached part's pose until explicit release. It may reject misalignment or adjust the free part consistently with the player's action. |

[Handler observations](river-observations-initial.json):39 checks pass,2 fail. Passing cases cover six anchor/order recoveries and same possessions, save roundtrips, rock blocking without a false receipt, remote unload rejection, pause/blur/reload position, reduced-motion boundaries, atomic load/receipt idempotence, return/unload, assembled-before-first-cross delivery, and all five physical histories.

[Previous-edition migration observations](migration-observations-initial.json):11 captured previous-version states pass120 assertions, including exact input preservation, conservative rope ownership, correct retained anchors on interrupted recovery, repeated boot, unchanged-source credit, distinct revised-source exposure and new reading retention. Source and compiled hashes are recorded in each receipt. These are real-handler/codec exercises with labeled synthetic envelope transport, not native/player or physical-device proof.
