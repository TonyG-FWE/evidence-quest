# D078: Choose fast AI for the agreed feedback

Revision 2, September 14, 2026. AGREED demo outcome and implementation ownership of model selection. Tony does not want to choose a model brand; it must work reliably and respond quickly enough for the demo. The former first-candidate approval question is resolved by this delegation of the technical choice. Exact runtime selection and qualification remain OPEN engineering work, not a pending model-name question for Tony.

## Tony's instruction

> Yes, that'll work. We'll also be using the quickest, fastest version of the AI for this task, so it shouldn't take too long.

The first sentence accepts D077's shown reading-feedback waiting interaction. The remainder establishes speed as a priority for the game's AI feedback. It names no provider, model or guaranteed number of seconds.

Tony then clarified:

> GTP-6 Astra Light or GPT-5.6 Luna or whatever  I don't care, it just has to work for the demo

Treat the model names as examples of indifference to the brand, not selected or verified API identifiers. The implementer chooses the suitable model/service within the agreed behavior. Do not ask Tony to approve routine model names. This does not waive a material change to the game's design, its external data handling or an existing execution/budget boundary.

## Agreed direction and existing requirements

Choose a reliable, responsive option for the bounded demo. Speed remains a priority, but establishing the globally fastest model or completing a broad vendor comparison is not a prerequisite. The existing requirements still govern: interpret the child's actual wording, use the relevant story facts, preserve the child's writing, avoid invented facts or unsupported reading judgments, and keep the agreed correction and unavailable-feedback routes.

For model selection, the relevant speed is the child's wait from requesting feedback to receiving a usable response. Published model descriptions do not demonstrate that time in this game. No comparison or response-time measurement has been performed in this review, and there is no selected model or latency threshold.

The existing division of work remains:

- Writing, conversation answers and additional contextual word explanations use a language model where agreed in D059-D072.
- D073 uses actual-audio speech assessment followed by prepared coaching text. D074's pause feedback needs separately qualified audio evidence. A second language-model call to compose these prepared reading prompts is not required by the agreed design.
- Complete authored word-help cards and fallback/help text remain available without generating them afresh.

D077's waiting, Stop feedback, late-reply protection and failure behavior remain required. A faster model does not establish successful assessment or make those states unnecessary. Spoken pronunciation assessment cannot be replaced with transcript matching merely to reduce the wait.

## Current documentation and source observations

Research checked September 14, 2026. These are candidate facts, not selection or in-game qualification.

| Candidate | Official documentation | Relevance and limits |
|---|---|---|
| GPT-5.6 Luna, gpt-5.6-luna | [OpenAI model page](https://developers.openai.com/api/docs/models/gpt-5.6-luna): designed for cost-sensitive, high-volume workloads, roughly the earlier nano tier; supports structured outputs; no audio support | A smaller text-feedback candidate using the current runtime's provider. No evidence here establishes it as the fastest or capable of the agreed semantic checks. It cannot perform the actual-audio assessment. |
| Gemini 3.5 Flash-Lite, gemini-3.5-flash-lite | [Google model page](https://ai.google.dev/gemini-api/docs/models/gemini-3.5-flash-lite): low-latency model with structured outputs and audio input | Another text-feedback candidate. Audio input alone does not demonstrate qualified word/sound assessment or the agreed pause judgment. No local comparison has been run. |

Context7 was queried first using the official OpenAI API collection. Its returned examples covered earlier nano models and did not establish the current catalogue; current model pages supplied the facts above. Vendor descriptions are not a measured ranking across vendors.

The preserved runtime has MODEL = gpt-6-astra in [server/coach.ts](../../server/coach.ts) and rejects a different OPENAI_MODEL in [server/index.ts](../../server/index.ts). That older structured coach is not implementation of this review's new writing, conversation or audio requirements. Its pin and matching tests are unchanged. The later implementation must record the chosen model/configuration, amend the relevant specification/task and qualify its actual behavior. Tony's clarification removes the routine model-brand approval step; it does not resume the preserved checkpoint or make changing an environment value sufficient.

## Engineering follow-through

The earlier suggestion to start with GPT-5.6 Luna is retained as a research note, not a selected model or a question awaiting Tony's answer. The implementer may choose a suitable available model and change the candidate if actual feedback quality or responsiveness is inadequate. Speech assessment must meet D073-D074's actual-audio requirements separately. No additional model call, automatic escalation or multi-provider fallback is required by this decision.

Before calling the integration ready for the demo, demonstrate the agreed examples and meaningful variations: valid paraphrases, brief or ambiguous answers, factual mistakes, disputed feedback and unavailable requests. Record the actual complete usable-response time under declared demo conditions. Compare alternative candidates only as needed to resolve an observed quality or speed gap; a mandatory model tournament is not part of the request. Exact evaluation cases, quality/latency criteria, timeout, provider configuration and costs remain engineering/qualification dependencies. There are no new live calls, recordings or evaluation-budget commitments in this documentation update.

## Requirement from the direct instruction

| Requirement | Agreed behavior/content | Evaluation scenario |
|---|---|---|
| D078.REQ01 | Deliver reliable AI feedback quickly enough for the bounded demo while preserving the agreed task behavior and correction/failure routes; judge actual usable responses, not model branding | D078.AC01 |
| D078.REQ02 | Leave routine model/service choice to implementation within the agreed requirements; record and qualify the eventual selection without asking Tony to approve a brand or requiring an exhaustive vendor comparison | D078.AC01 |

| Scenario | What later selection evidence must establish | Current evidence |
|---|---|---|
| D078.AC01 | Demonstrate the agreed feedback cases and actual response times under declared demo conditions; identify the chosen model/configuration and limits, comparing alternatives only if needed | NOT_RUN; model/configuration, exact quality/latency criteria and task mapping OPEN engineering work; no routine brand approval pending |

Agreement AGREED_DEMO_OUTCOME_AND_TECHNICAL_SELECTION; specification COMPILED_DIRECTION for D078.REQ01-02; routine brand question RESOLVED_BY_IMPLEMENTATION_OWNERSHIP; provider/model NOT_SELECTED; packet NOT_PREPARED; dispatch NOT_SENT; runtime NOT_STARTED; verification NOT_RUN. R13 and R10 retain their recorded open dependencies. TASK11.19 remains halted at 1/75; this preference does not authorize a resume or reset. No runtime/source-authority edit, provider request, capture, agent message or assistant-model change occurs.

| Revision | Change | Agreement evidence |
|---|---|---|
| 1 | Recorded speed priority and proposed a first text-model candidate for discussion | Tony's quickest/fastest-AI instruction; candidate not selected |
| 2 | Replaced the brand-selection question with an implementation decision, focused on a reliable and responsive demo; removed mandatory candidate comparison | Tony: "I don't care, it just has to work for the demo" |
