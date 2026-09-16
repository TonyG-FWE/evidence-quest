# Group 3: balanced pagination follow-up

This follows the passing sealed source review. The implementation owner observed that the fixed 110-token break left a tiny second page for The Torn Wing, and requested review of a pure paging refinement. This review does not reopen the story or gameplay sequence.

The revised budget balances remaining tokens against the estimated page count and prefers a paragraph or sentence boundary in the latter half of the candidate page. Each emitted interval begins at the preceding interval's end; final output reaches the full tokenized string length. The algorithm retains exact text, offsets, whitespace and surrogate-pair protection. The recording-page hard limit remains 1800 UTF-16 units. Reading identity, saved page handling and gameplay handlers are unchanged.

The added regression definition checks exact reconstruction of The Torn Wing, two pages with at least 35 words each, and a sentence boundary. The owner's `contracts-pages.log` records 111 passes; the reviewer did not execute it.

## G3-P01 — count the residual word after a hard split

The hard-split loop sets `words=0` although a nonempty fragment of an overlong token can remain after the cut. This behavior is inherited from the prior helper, but conflicts with the refined helper's stated 110-word bound.

Source-level counterexample: `'x'.repeat(1801) + ' ' + 'a '.repeat(329)`. The initial target is 110. The first hard cut emits 1800 x characters and leaves `x ` with its count reset to zero. A following page can then contain that residual word plus 110 a tokens, totaling 111 words.

The 1800-unit limit and exact reconstruction still hold; this is a word-budget accounting issue. The requested correction is to count the residual fragment after each hard split, recalculate its budget as needed, and add a max-word regression for that input. No runtime reproduction or test execution was performed by the reviewer.

Final paging supplement remains pending the corrected frozen candidate. The prior Group 3 receipt continues to describe its own sealed source edition.

## Correction inspected in working source

The hard-split loop now recounts the remaining fragment's tokens and recomputes the target after advancing start. The added regression definition uses the exact counterexample above and checks complete reconstruction, the 1800-unit limit and the 110-word maximum for every page. G3-P01 is resolved in the inspected working source. Final supplement awaits its frozen manifest; no additional source finding remains in this paging delta.
