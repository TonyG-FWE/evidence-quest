# D030: making the crossing an introductory challenge

Revision 2, September 13, 2026. AGREED as demonstrated after Tony replied **"Sounds good."** to the crossing-puzzle walkthrough. The agreement covers the visible wide/narrow location choice, constant boat size, moving/joining and fastening both ends, separately guiding Pip across, the shown instruction and secure definition, gap and loose-end feedback, and success without a required mistake. This develops the agreed [D029 encounter](D029-FIRST-PLAYABLE-ENCOUNTER.md). File-only details, including the additional requested hint below and connected-group editing rules, remain drafts. Exact geometry and technical mapping are still open; R05 is not complete.

## The problem the child solves

Choose where the available boats can form a crossing, arrange them, and secure the crossing so Pip can walk across. The scene has a wider stretch of river near the arrival path and a narrower stretch a short walk upstream, beside the existing garden boats. Both banks and both possible locations are visible from the fixed camera. The bank paths connect the narrower crossing to the same garden and dock routes.

The same boats, joined into their supported straight formation, are too short to span the wider stretch and long enough at the narrower stretch. Their dimensions stay constant when moved. The difference must be obvious enough to inspect; it cannot depend on estimating pixels or reading a hidden length value. Exact count, shapes, dimensions, clearances, bank anchors, and collision boundaries remain to be specified before implementation. No approved numeric geometry is implied by this concept.

This adds one agreed spatial decision to the introductory crossing. It is not a new river region, boat-collection quest, arithmetic test, timer, or claim of sufficient whole-chapter challenge. The narrow crossing location is agreed geography in this review and needs a later dated source/geometry amendment before implementation.

## Exact agreed construction instruction and word help

The shown instruction at the boats is:

> One boat can carry the seed, but it cannot carry Pip. Join the boats to make a footbridge. Secure one end to each bank before anyone walks across.

The child can click words for contextual help. The shown **secure** explanation is:

> Secure means fasten something so it stays in place. Here, you need to fasten one end of the crossing to each riverbank.

Offer word and sentence pronunciation with return to the same instruction under the existing D002/D007 word-support agreements. D030 now agrees the exact new instruction and secure explanation separately from D018's earlier secured explanation. Reading/help remains optional support rather than a source-opening or pronunciation gate. The final composition of this instruction and the longer D018 note remains R09/R16 work.

## One possible attempt and the game's response

1. The child enters the accepted construction mode while Pip waits on the bank. They move and join the boats near the wider stretch. Connection points line up visibly; moving a connected group preserves its dimensions and connections.
2. One end reaches a bank, but the other stops over the water. Show the actual gap and the D029 feedback:

   > This end doesn't reach the bank yet. Move the boats so the crossing reaches both sides.

3. The child can move the joined boats upstream, or return to Pip and inspect the bank first. Both routes preserve the current arrangement, seed, page, and completed conversation. At the narrower stretch, the same formation reaches both banks.
4. The child fastens the crossing at its two visible bank attachments. Each fastening has a visible result. Selecting an attachment or using its named accessible action must express the same operation; no new rope collection or dexterity challenge is introduced. The detailed input and fastening mechanism remain R15/R17 work.
5. The crossing becomes usable. Returning control to Pip does not move him automatically. The child walks him across with his actual possessions; the route remains in place for return trips and later guests.

If only one end is attached and the child tries to use the crossing, the shown and accepted feedback is:

> One end is still loose. Fasten it to the bank before Pip crosses.

Pip remains safely at the bank and the unfinished attachment is visibly identifiable. A successful first attempt works immediately; the illustrated wide-river attempt and one-loose-end case are optional possibilities, never required mistakes.

## Additional requested hint - still draft

Keep the instruction available while placing the boats. If the child requests more help after seeing a gap, propose:

> The boats won't reach across here. Look along the river for a place where the banks are closer together.

This additional hint appeared only in the file, not the walkthrough Tony accepted. It remains a proposal for assistance on request, not an automatic solution announcement, a required hint sequence, or an AI contract. Full direct-help behavior remains R14. The established no-reading-timer rule remains in place.

## Connection to reading and the story

The child can interpret **each bank**, use the construction rule, compare it with the scene, and revise a plan after observing its consequence. **Secure** describes an action they can perform and see. These are opportunities to apply language in play; success may also come from observation, prior knowledge, or experimentation and does not establish comprehension or vocabulary mastery.

The puzzle teaches the construction interaction and earns a useful route. The character problem remains: a crossing does not change Mara's work hours. D029's page/report delivery and the later gathering decisions continue to provide story consequences. The larger chapter still needs us to assess the depth and variety of its gameplay.

## Compatibility and remaining work

- Retain the seed-first route and the earlier equal successful arrangements. This draft does not settle the seed boat's travel/return or harmless ferry actions around a completed crossing; those require an explicit complete mapping before a packet. Do not silently consume every boat in the crossing and then invent an extra one when a later action needs it.
- No implemented boat count, source text, geometry, asset, or renderer is changed by this design agreement. Reconcile the location choice and instruction with D018, Item 05, the canonical words, technical contracts, and the existing TASK11 plan before implementation.
- Specify valid placement/rotation, attachment states, cancellation, moving connected pieces, safe return to Pip, accessibility, saved construction progress, and interruption before building. Do not allow removing a crossing beneath an actor; the precise supported editing behavior is still open.
- The wide/narrow scene description is an agreed design, not a rendered or played result. Consistent scale, visible reach, accessible operation, and enjoyment still need actual evaluation under D028.

## Requirements from the demonstrated agreement

| Requirement | Agreed behavior | Evaluation scenario |
|---|---|---|
| D030.REQ01 | Show a wider river stretch near arrival and a narrower stretch upstream; the same joined boats fall short at the wider location and reach both banks at the narrower one, with constant dimensions and visible reach | D030.AC01 |
| D030.REQ02 | Let the child choose a location, move/join the boats in the scene, and visibly fasten one end of the crossing to each bank | D030.AC01-02 |
| D030.REQ03 | Show the actual remaining gap or loose end with the exact accepted feedback; permit adjustment and first-attempt success without a required mistake | D030.AC01-03 |
| D030.REQ04 | Present the exact construction instruction and contextual secure definition above; connect the existing meaning/pronunciation support to this encounter | D030.AC04 |
| D030.REQ05 | Once the crossing is usable, let the child separately guide Pip across with his actual possessions; preserve the crossing for return trips and later story use | D030.AC02-03 |

| Scenario | What the eventual playable encounter must demonstrate | Current evidence |
|---|---|---|
| D030.AC01 | Place the same joined boats at the wider stretch, see the real gap and exact feedback, then reposition them at the narrower stretch; also succeed directly there. Geometry and dimensions remain consistent and no error is mandatory | NOT_RUN; numeric geometry and placement rules pending |
| D030.AC02 | Fasten one end, attempt to cross, see the loose-end feedback, then fasten the other end and separately walk Pip across. The usable route persists for return travel | NOT_RUN; attachment, control, and collision contracts pending |
| D030.AC03 | Revise an unfinished crossing and continue with the actual seed/page and earlier conversation retained; reach Grandma without an automatic crossing or replayed task | NOT_RUN; full input/save/interruption and alternate-route mapping pending |
| D030.AC04 | Read the accepted construction instruction, open secure meaning/pronunciation, return, and apply the fastening action; also proceed without a lookup. No help-use score or clock advance is inferred | NOT_RUN; connected content/audio/access behavior pending |

Follow-up, September 13: [D031 revision 2](D031-SOLS-PLAYER-WRITTEN-ENDING.md) separately records Tony's agreement to the demonstrated writing-and-rehearsal interaction at Sol's workshop. Its agreement comes from the later "Yes", not this crossing decision. D032 now holds the next gathering-interaction proposal.

Agreement AGREED_DEMONSTRATED_PUZZLE; specification COMPILED_DIRECTION for D030.REQ01-05; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN. No runtime/source change, provider request, art production, commit, or agent message occurs in this review update.

| Revision | Change | Agreement evidence |
|---|---|---|
| 1 | Proposed the wide/narrow location choice and construction interaction | Pending at the time |
| 2 | Recorded the shown crossing puzzle, instruction, secure meaning, and feedback as agreed; retained unshown additions as drafts | Tony: "Sounds good." after the complete crossing walkthrough |

## D081 completion note - September 14, 2026

D081 specifies numerical geometry, input/attachments and same-two-boat seed-first handling in [R15](R15-CONTROLS-AND-PHYSICAL-STATE.md), and adopts the previously file-only requested hint as DERIVED_DETAIL in [R14](R14-SUPPORT-AND-DIFFICULTY-CONTRACT.md). This is completion under D080, not a newly quoted user approval. Actual play remains NOT_RUN.
