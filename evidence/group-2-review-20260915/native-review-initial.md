# Group 2 independent native review: corrected candidate, further fixes pending

September 15, 2026. Authored, task-owned origin `http://127.0.0.1:4195/garden`. Runtime edits belong to the other task. Review uses ordinary UI actions, Tab/Enter/Escape, and read-only DOM inspection; no browser storage access, state injection, provider requests, or user-origin 4192 actions.

## Candidate

- GardenApp-BvZYIz7C.js: `5752f404cd8502272ab48057c8bf5e3db35fcca7dc92909855dd4a078ee398c8`
- GardenApp-7H8FbBbk.css: `6b89850cb3e2cd01244655d0fb6814ebf9aa8b5b6fb06409ae1fee9f4aea8bdd`
- index-WKhIGkY4.js: `873ebe51b3ac42bc524b33648118aac4ca235520d0afed9c7f6ead6bdce44fe0`

These are the built artifact hashes during native inspection. The owner is preparing later narrow fixes; this is not their final verdict.

## Observations

| Check | Actual result |
|---|---|
| G2-RV01 nested sources | PASS: rehearsal → Help → Grandma's letter → Help → same rehearsal; rehearsal → Backpack → possessed Mara story → Backpack → same rehearsal. Source footer exposes reading/practice/return controls, without chapter action choices. |
| G2-RV03 keyboard tools | PASS: from reader Close, actual Tab reaches internal Help; Enter opens Help. Closing letter restores Read Grandma's letter; closing Help restores Help in the original Mara reader. |
| Own contribution cancel | PASS: rehearsal shows exact child text and chosen baking/visit picture; Back returns to writing, preserves exact draft, does not select it, and focuses Try my ending. |
| Own contribution accept | PASS: Use this ending selects the exact displayed words; draft remains intact; return focuses Try my ending. |
| Prepared contribution cancel | Draft and prior selected child ending remain intact. FAIL G2-RV05: the expanded prepared-ending disclosure collapses on return; its hidden originating button receives no focus. Focus remains BODY after rendering; next Tab starts at Close. Owner notified to preserve disclosure context and verify actual focus success. |
| G2-RV02 invitation wording | The real-handler rebuilt recheck still reports the hardcoded notice that friends have not been told, despite matching delivered notices. Owner accepted the remaining correction. Recipient-specific world caption is present. |
| G2-RV04 invalid preview | Usual-time/Mara correctly disables Use this plan, but the image depicts Pip reading; owner independently identified this mismatch and is adding a waiting scene. |
| G2-RV06 early approach | FAIL: click Talk as soon as Mara becomes nearby, then choose the page offer. The enabled offer repeatedly does nothing. TALK stops movement within 1.5 units, while TAKE_PAGE requires 1.25. The separate real-handler receipt `approach-initial.json` reproduces the failure at distance 1.48: Mara reader opens, no handoff action starts, Mara retains the page. Owner notified. |
| G2-RV07 compact word help | FAIL on later JS candidate GardenApp-okUFIlrq.js with unchanged CSS: measured 320 × 568 CSS pixels, Largest text + More space, Mara's obligation card open. Reading scroll area is 21 pixels high and shows a clipped source line. Native observation reproduces the automated criterion failure; see `compact-word-help-initial.png`. Layout correction pending; source/meaning text and preferred reading size must remain. |
| Valid preview | Later-time/Mara depicts Mara telling and identifies this as a preview; no invitations shown as delivered in this native run. |
| Narrow layout | At measured `innerWidth = clientWidth = scrollWidth = 320`, both rehearsal action buttons are keyboard-reachable and scroll into view. Each measures about 120.7 × 62.3 CSS pixels. No horizontal page overflow. [Image](rehearsal-320.png). |

Exact native child text: “The roof kept Rina’s flour dry. She baked the promised bread, then brought me a loaf.”

The browser's existing zoom made a requested viewport width of 320 yield 356 CSS pixels. That first observation is retained in `rehearsal-356.png`; the override was adjusted to produce a measured 320 CSS pixels. The viewport was reset afterward.

## Route and limits

This run took Mara's page, assembled and fastened both bridge ends, crossed, planted, visited Sol and wrote an ending through ordinary controls. Bridge setup used known model positions translated into named Move controls; it is assisted setup, not independent bridge-puzzle usability proof. One repeated-input review call timed out at the unavailable Join control while placement was still a preview; inspection recovered the existing tab and the section was explicitly placed before continuing. No run reset occurred.

Later in this same review, Pause exposed Start a new adventure during an unfinished plan preview. Clicking it returned a browser-control mouse timeout; the next accessibility tree showed a fresh title screen. The old run was therefore replaced through the normal restart handler, which calls the archive/new-adventure transaction after native confirmation. No explicit confirmation Cancel was observed or operated. Native cancellation and archive contents are NOT_VERIFIED; the owner was notified to retain dialog-dismiss and archive coverage in the automated browser suite. Only the task-owned 4195 QA run was affected. The earlier statement that no reset occurred applies to the route before this fresh-start check.

The old bakery/source chronology and miniature public gathering remain later-group work. This review establishes shared interaction behavior, not finished encounter implementation, all-device accessibility, measured learning, live AI, or production visual/performance acceptance.
