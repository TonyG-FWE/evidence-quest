# Connected integration repair record

This records observed failures and fixes, not an acceptance claim for unfinished tasks.

- Full-envelope delayed callbacks reused an earlier command receipt. The store now allocates a new receipt while retaining only captured case/visit ownership; production-handler regression passes.
- NPC art used absolute room bounds as actor-local bounds. Rendering now subtracts authored home feet before translating a moved actor.
- Petal groups incorrectly stretched one petal across each reserved group. Rendering now uses all six Courtyard, four Workshop and three flat Media instances at the manifest positions. Workshop sign face no longer draws a second sign frame.
- The first storage browser run found a duplicate coalesced write after explicit recovery replacement. The queue now discards an identical queued snapshot after completion. The passing recovery check verifies the earlier usable record remains byte-for-byte preserved.
- The first complete case reached the rail, then a missing tile-name template parameter threw during rendering. That parameter and both destination-label parameters are corrected. An AST check now verifies literal CT references and template arguments. A bootstrap/React error boundary supplies canonical failure text and Retry if content/rendering fails.
- Nearby-object chooser and Move to had the same label. The chooser now uses CT.WORLD.CHOOSE. Full Media-first recovery, portable first reading, rehearsal and premiere passed afterward in 49.9 seconds of browser test execution.
- The initial compact/source tests used two incorrect test labels (Flatten and secure; Tell crew my plan). The test selectors now use the exact approved labels (Flatten and secure notice; Your search plan). These were test failures, not missing product actions.

Browser evidence remains scoped: synthetic denied reads, quota aborts, incompatible/damaged heads and competing visits establish these local code paths. They do not establish all-device durability, live AI interpretation or child/player evaluation.
