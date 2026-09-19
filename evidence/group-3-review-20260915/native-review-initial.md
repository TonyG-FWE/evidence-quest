# Group 3 native review, first candidate

Origin: authored QA `http://127.0.0.1:4195/garden`, existing in-app tab 1. The user's 4192 adventure was not accessed. Observed root entry `index-CTb9_5SO.js`; owner identifies this candidate as `GardenApp-Cvt6HiRQ.js`, before the final time-only request and trowel changes.

## Observed through actual UI

- Fresh adventure displays the earlier-visit seed origin. Chose Mara's later-time response without taking a page; the reply directs Pip to ask Grandma and the optional answer is skippable.
- Approached the repair area, collected the two visible ropes, explicitly previewed/placed both sections at named opposing posts, joined them and fastened only the garden-side end.
- Chose the ordinary Grandma destination. The loose bridge separated and Pip retreated safely. The garden-side section retained its actual rope, with the loose piece nearby on the dock bank. `far-anchor-collapse.png` records the result.
- Returned, placed the same loose section, rejoined and fastened the other end. No replacement resource or mandatory loss occurred.
- Loaded the seed before Pip's first crossing. The reader closed and the action occurred in the world. Pip stayed ashore. Launch exposed named steering controls.
- Trying to dock at Grandma while still at the launch gives the actual landing instruction and retains cargo. After upstream steering, requesting return keeps the seed aboard and requires steering back before unloading.
- Help during a directed boat move stops the move. It describes the seed as aboard and Mara as retaining her page. Back to the seed boat restores the controls and focus on Help.

## Findings sent directly to the implementation task

- **G3-RV03:** Opening labels for bridge/boat/repair box overlap. Boat-mode launch/landing labels obscure the boat and rock. See `opening-label-overlap.png` and `boat-label-obstruction.png`.
- **G3-RV04:** Authentic prior saves with zero/one boxed ropes offer and narrate taking two. Actual ownership is conserved, but the action/notice invent collection. See `rope-ownership-initial.json` and the independent reproduction script.
- **G3-RV05:** Boat Help return says to repair the footbridge even when both ends are secure and seed remains aboard. Help's movement text describes walking/arranging instead of steering.

The two earlier handler findings (invalid save after legal offset fastening; JOIN rotating a tied part) pass the separately compiled review fixes in `river-observations-reviewed.json`. The final frontend incorporating these and the remaining native corrections still needs review.

## Scope

Native actions use visible controls only. No browser storage injection, provider call or runtime edit. The fresh-start action's native confirmation caused a tool timeout before the fresh title appeared; cancel behavior is not established by this native run. Earlier automatic dialog coverage remains separately owned and labeled.
