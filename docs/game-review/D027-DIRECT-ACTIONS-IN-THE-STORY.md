# D027: trying physical actions in the story world

Draft revision 3, September 13, 2026. R05 remains unresolved after Tony's correction that the comparison showed menus, not gameplay. The approved story establishes what happens and what can vary. The next question is the playable challenge and moment-to-moment activity, before selection of a control model. This document is not an implementation instruction or an agreed replacement for the current sequence interface.

Earlier response leading to revision 2: **"Before I say yes, what other ways could there be?"** The direct-action proposal remains unselected. None of the alternatives below is compiled as a requirement.

## Current correction: demonstrate a game, not a control comparison

Tony's latest response:

> How does the actual gameplay supposed to work? Keyword game.
> Because what you just showed me are all identical drop-down menus. That's not a game. I need to ensure that's not what you're intending.

The revision 2 visualization was inadequate as a gameplay demonstration. Its verified buttons, state changes, and responsive layout establish only that the discussion aid works; they do not establish compelling play or acceptance of any interaction model. Do not present its dropdowns or simplified controls as the intended game interface. The prior hybrid recommendation is still unselected.

The discussion must now distinguish the agreed story from the still-unresolved playable challenges. Walking between characters, selecting a complete solution, and watching an animation would not by themselves address Tony's concern. Cosmetic input changes, replacing dropdowns with buttons, and adding animation are not evidence that the gameplay has been designed.

## Concrete adventure direction for discussion only

Propose an illustrated 2D adventure in which the child guides Pip through the connected dock, river crossing, garden, and workshop. The world occupies the main play area. The child approaches characters and objects, inspects useful details, carries actual items, acts on objects in the scene, and sees persistent consequences. A short current goal, contextual reading, and word help support that activity. Exact movement keys, pointer gestures, camera, inventory, and accessible alternatives remain unselected.

A possible introductory crossing interaction makes the physical actions visible:

1. Pip begins on the starting bank holding the seed. Grandma and the garden are visibly across the river. The current goal is **Reach Grandma's garden and plant the seed together**.
2. The child guides Pip to the boats and inspects them. The D018 description supplies the capacity and joined-crossing rules. Word help remains available; opening the description or explaining it correctly is not a gate.
3. As a proposed physical interaction, the child places the seed into a boat and sends it across, or joins the boats in the scene while retaining the seed. Joining is represented by manipulating/selecting actual scene objects and showing their connection, not by choosing a whole completed journey from a dropdown. Snapping and a select-then-place alternative could avoid precision demands; these gestures and geometry are proposals, not new approved rules.
4. Sending the seed moves only that seed to Grandma. Pip remains on the starting bank with any held page. Joining creates the persistent crossing. The child then guides Pip across; this movement is a separate action from construction. Any held seed/page travels with him.
5. The seed and Pip actually reach Grandma before they plant together. The crossing remains usable on later visits. No compulsory seed-first attempt, reset, extra rope/tool prerequisite, or unequal scoring is introduced.

This demonstrates the intended difference between manipulating a scene and selecting a finished outcome. It remains a small introductory problem, not enough gameplay depth for the whole chapter. Exact geometry, animations, state transitions, and preservation of all five original successful arrangements still require the prescribed contract mapping.

The existing story supports a different kind of problem at the gathering: making a workable arrangement from Mara's work schedule, her permission to share the page, and Sol's actual chosen contribution. A completed crossing does not solve Mara's work conflict. Both the later gathering with Mara present and the usual-time route with Pip sharing her story remain valid; exact invitations and actual arrival still matter. These facts can ground a meaningful planning challenge, but presenting them only as selections and errands does not settle its depth or enjoyment.

Before a gameplay direction is agreed, the next complete encounter needs to show the player's goal, what is initially unknown, the useful information in the text, what the child physically does, the decision they must make, an alternative attempt and its understandable consequence, how they can revise, and the resulting change in the world. Reading assistance and oral-reading practice must connect to that activity; movement or puzzle completion is not proof of literacy improvement. No new timed failure, reflex challenge, scoring system, story branch, or AI authority is adopted here.

## Alternative interaction models

Historical revision 2 comparison, retained for reference. These models are unselected; the current priority is demonstrating substantive gameplay.

These are design judgments about the same agreed story, not measured usability results or implementation estimates. Word meaning/pronunciation, purposeful rereading and narration, and meaningful story decisions remain relevant across all options. Input style alone does not supply reading practice or establish improvement.

| Model | What the child does at the crossing | What the game shows | Strength | Tradeoff and demo effort |
|---|---|---|---|---|
| 1. Explore and act | Select the boats, read the description, choose **Join the boats and cross** or **Send the seed across** | The chosen action changes the visible world immediately | Clear connection between action and consequence; useful for conversations, movement, planting, and handoffs | Explicit action labels can reveal too much of a puzzle's solution. Simple to explain does not mean least work to integrate with the current sequence engine |
| 2. Combine objects | Read the object descriptions, select which objects to use together, then use the resulting crossing | The seed can travel in a boat; joining the boats creates a crossing that Pip can use | More discovery through object relationships; lets the child propose a solution through interaction | Can become random combinations or mouse precision work. Needs supported-combination rules and accessible selection; dragging is optional, not the defining feature |
| 3. Plan and run | Arrange **Join the boats**, then **Cross the river**; run the short local plan and watch its steps | Each step has a visible result; an unavailable action leaves the relevant world state unchanged with an explanation | Makes prediction, order, and cause/effect explicit; has reuse potential because the current build already uses action sequences | Adds planning overhead to simple actions. Reuse is not proof that the approved adventure is integrated. No forced mistake, global restart, or automatic future conversations/deliveries |
| 4. Choose illustrated scenes | Read the scene and choose what Pip does next, such as sending the seed or making a crossing | The next illustrated scene depicts the actual result | Keeps reading and meaningful narrative choices central; fewer movement controls to explain | Less physical exploration. Would change how the agreed spatial adventure is presented, and still requires the final illustrated finish |
| 5. Tell Pip what to do | Type an instruction such as **Join the boats, then cross with the seed**; review a proposed interpretation when needed | The game interprets supported actions, asks about ambiguity, and carries out the agreed instruction | Gives the child more opportunity to express a plan in their own words | Typing and language production add burden beyond reading; reliable interpretation, unsupported requests, and authored fallback add substantial work. Spoken instructions would add further scope |

The existing sequence approach deserves serious comparison on implementation effort. Direct actions should not be described as automatically the easiest build. Typed instructions are the most demanding primary model among these proposals because input interpretation and recovery must work reliably; this is not a provider qualification or a claim about current runtime capabilities.

## Recommendation for discussion

Consider direct actions for ordinary exploration, conversations, and object use, with a short plan-and-run interaction only where order creates a meaningful decision. This combines immediate story consequences with deliberate prediction. It also introduces two interaction patterns, so it needs a clear transition and should not become a requirement to plan every mundane action. This recommendation is DRAFT, not Tony's selection.

If ease of building from the current implementation is the deciding factor, examine the existing sequence approach first rather than assuming a rewrite is cheaper. If tactile object discovery is the deciding factor, compare object combinations with direct actions using a complete challenge before selecting.

The comparison uses the crossing only to make the input differences visible. Its small introductory puzzle does not settle whether the chapter has enough depth for ages 9-12. R05 must still examine the main challenges, what the child infers, available meaningful alternatives, and how consequences support reconsideration.

## Interactive discussion aid

A separate conversation visualization, **crossing-interaction-options.html**, demonstrates the five control concepts with a schematic river scene. It is not final game UI, implemented game behavior, production art, a playtest, or live AI. The typed-instruction example recognizes a few fixed phrases locally. The schematic simplifies boat movement and does not qualify exact geometry, all five original successful arrangements, or recovery contracts. It does not amend the imported design authority.

Visualization path: `C:/Users/TonyGuillaro/.codex/visualizations/2026/09/12/01a096d0-72bf-7c01-8a73-66f1c0b8f9bd/crossing-interaction-options.html`.

Discussion-aid checks, September 13: exercised the five examples in the browser, including seed-first and carrying-seed results, object combinations, separate sequence steps, and scripted instruction confirmation. Inspected light/dark layouts at 736 and 360 pixels and a 320-pixel layout. Corrected hidden-control visibility in the aid. The temporary preview tab and owned servers were closed. These checks qualify only the discussion aid; game/browser/learning qualification remains NOT_RUN for D027.

## Original direct-action proposal, retained for comparison

Let the child approach a relevant object in the paper world, inspect its short description, choose an available physical action, and see that action happen there. The result remains visible and changes the next useful action. Ordinary physical actions do not require assembling a separate sequence and running it as a prerequisite.

This proposal concerns the primary player experience. Exact button placement, keyboard/touch equivalents, optional dragging, animation interruption, and any retained planning/sequence presentation belong to R15-R19. D017's gathering planner still serves its own purpose; it is not removed by proposing direct physical interactions.

## Complete example: the first crossing

Starting conditions: Pip and the actual seed are on the starting bank; Grandma is across the river; the small boats are available. If Pip holds Mara's page, retain that actual possession. No Mara conversation is required merely to inspect or use the boats.

The child approaches and selects the small boats. Show this draft short description, using the agreed D018 story facts:

> "One small boat can carry the seed, but it cannot carry Pip. When the boats are joined and secured to both banks, their wide tops form a crossing."

Offer the supported actions:

- **Send the seed across.**
- **Join the boats and cross.**

The description and word help remain available. Selecting secured can use the D018 meaning: **Fastened so something stays in place. Here, the joined boats are fastened to both sides of the river so the crossing stays in place.** Exact full word coverage remains R12.

For this example, the child chooses **Send the seed across**. A boat carries the actual seed to Grandma. Pip remains on the starting bank with any held page. Show the established D018 caption:

> "The seed has reached Grandma. Pip still needs to cross so they can plant it together."

That action has accomplished something. It is not labeled a failed attempt, and the seed is not lost. The river scene still shows where Pip, the seed, and Grandma actually are.

The child then selects **Join the boats and cross**. The boats visibly form the persistent crossing and Pip walks across it, carrying any held page. The seed remains with Grandma. The next suggested action is **Plant the seed with Grandma**.

The child could instead join and cross while carrying the seed from the outset. Both demonstrated approaches remain valid, and sending the seed first is never required. No reset/reconstruction is needed when Pip later returns to the dock.

The same action-to-result principle applies to actual planting and page handoffs: the child chooses the action at its appropriate place, sees the physical effect, and continues from the resulting world state. This does not perform a whole chain of unselected actions after one click.

## Why this is the first R05 question

The crossing is an introductory example for seeing how actions work, not the entirety of the game's challenge. The accepted story already includes combining Mara's work and permission with gathering choices, interpreting the reasons for the quiet garden, and deciding how Sol's story should develop. R05 still needs to examine whether these choices provide sufficient thought, discovery, and enjoyment for ages 9-12.

Direct actions can make it easier to connect a choice with its immediate visible consequence. A separate sequence interface can make ordering and comparison more explicit, but asks the player to understand another interaction before acting. The proposal is direct physical actions as the main experience; it does not assert a measured usability improvement.

## Contracts and remaining decisions

If this approach is selected, map it to the existing action engine and preserve the original five successful physical arrangements and their equal standing. Actual object locations, ownership, source exposure, decisions, narration, and completed actions remain separate. Do not bypass the immutable store/coordinator, rewrite the imported authority, or treat this sketch as proof the mapping is already implemented.

Exact source/copy amendments, current sequence-interface disposition, action availability after prior actions, routes involving an already-moved seed, all interruption/recovery states, and TASK11/FIX11/CHECK11 ownership remain open. R05 will continue with the depth and structure of the main challenges after this interaction direction is reviewed.

Agreement PENDING; specification NOT_COMPILED; source amendment and TASK11/FIX11/CHECK11 mapping PENDING; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN. No runtime/source change, provider request, production art, commit, or agent message occurs.
