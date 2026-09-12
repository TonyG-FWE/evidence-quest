# Item 09 — supporting contracts

Start with the [technical specification](../09-CONCRETE-TECHNICAL-DECISIONS-AND-IMPLEMENTATION-CONTRACTS.md). This directory defines contracts and examples; it is not a game project or an asset manifest.

| File | Authority / use |
|---|---|
| [contracts.schema.json](contracts.schema.json) | Authoritative JSON Schema draft 2020-12: seven public roots for content, case snapshots, save envelopes, preferences, coaching requests/responses and session state. ModelProposal is an internal definition; R06 specifies its provider projection. |
| [CONTRACT-RULES.md](CONTRACT-RULES.md) | Cross-field rules, constructors, state lifetimes, source boundaries and schema projection. Structural validity alone does not establish these facts. |
| [REFERENCE-REGISTRY.json](REFERENCE-REGISTRY.json) | Reference sets drawn from Items 05–08: 93 UI states, 121 transitions, 548 canonical CT declarations, explicit finer source references and technical additions. Does not replace the original source words. |
| [OWNERSHIP-CROSSWALK.md](OWNERSHIP-CROSSWALK.md) | Every original UI state and named transition assigned once to a responsible handler, with technical exceptions. |
| [COACHING-AND-EVALUATION.md](COACHING-AND-EVALUATION.md) | The 17 authored moves, state/meaning eligibility, prepared-help selection, technical abstention, 26 exact synthetic evaluation situations and proposed server instructions. |
| [technical-copy.json](technical-copy.json) | Five minimal technical messages and three technical UI states supplementing Item 07. No new evidence or puzzle. |
| [examples.json](examples.json) | 33 synthetic accepted/rejected root examples. Advanced snapshots illustrate specific boundaries, not reconstructed player histories; the authored-content fragment is explicitly incomplete and must never ship as full content. |
| [TECHNICAL-TRACES.md](TECHNICAL-TRACES.md) | All fifteen Item 06 route checks plus twenty technical interruption/race/recovery traces. Written checks, not executed walkthroughs. |
| [schema-validation.json](schema-validation.json) | Executed local JSON Schema results: 35 expected outcomes matched, including the two internal model-proposal examples. |
| [validation-report.json](validation-report.json) | Executed bounded semantic/reference/rule checks and their limits. Twenty-nine schema-valid examples matched expected bounded semantic outcomes; 28 check groups passed. All 65 possible unique tile arrangements produce exactly the five specified successful arrangements. |
| [package-audit.json](package-audit.json) | Final local-link/reference and scope audit, including unchanged later checklist sections. |

The main specification owns architecture, timing, input, save/service operation and the Item 10 handoff. The schema owns field shapes; CONTRACT-RULES owns constraints between fields; the coaching matrix owns semantic eligibility. Items 05–08 retain physical geometry, words, gameplay and approved visual direction.

The current checks used already installed PowerShell 7.6.5 Test-Json and Python 3.12.14. Their small logical models check particular contract laws; they are not the future application handlers or a complete semantic validator. Ajv, dependency installation/build, actual storage transactions, browser/gameplay, accessibility/performance qualification, live model interpretation, child playtesting and learning evaluation are **NOT_RUN**.

Reproducing these document checks uses [_checks/validate-schema.ps1](_checks/validate-schema.ps1), followed by [_checks/verify-contracts.py](_checks/verify-contracts.py) with the already available tools. No provider credentials, network request or game startup is involved.

**Item 09 is complete as technical design. Next: Item 10 — Individual asset manifest and production plan.** Live child text remains unavailable until the documented account/data/minors conditions are verified. All local authored behavior is specified; the model contribution still requires later live qualification.

