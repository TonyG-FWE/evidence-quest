# Item 09 — UI and transition ownership crosswalk

All 93 original UI states and 121 original named transitions are preserved. These IDs are dimensions of one store, not 93 independent screen components. The existing Item 06 row supplies the UI contract; Item 07 supplies the words; Item 08 supplies layout/state references. Technical exceptions below complete their ownership.

## Handler contracts

| Handler | Module / concrete responsibility |
|---|---|
| H.BOOT | core/bootstrap + save: validate content/read generation; valid current-session Continue before durable head; unknown read never empty. |
| H.PHYSICAL | physical + core: plan legal movement; recheck A/target; commit object/door exactly once. |
| H.NAV | ui/navigation: public room descriptions/object list/goal/guidance; new physical destination delegates H.PHYSICAL. |
| H.SURFACE | ui/focus + core: C2 interruption order, caller/world return, pause/home/visibility. |
| H.READER | ui/source + content + observations: legitimate first access delegates H.PHYSICAL; acquired reopens use grants; report exact displayed spans/frame/marker only. |
| H.NOTES | ui/notes + core: available evidence, optional comparison/timeline; selections are claims, no clue gate. |
| H.RECORD | ui/drafts + core: edit same store draft; deliberate snapshots distinct from delivery. Addressed Jo action delegates H.NPC. |
| H.NPC | physical approach + content/NPC + core: local conversation, reviewed reference presentation, actual knowledge commit and authored response. |
| H.KIT | physical + ui/kit: lid/collection/seat separate commits; canonical mounted/portable notes; reader and rail delegation. |
| H.WORK | ui/workstation + physical + story: real bay/rail/control approach and kit handoff; derive missing/empty/ready/certified from store. |
| H.RAIL | story/rail + core: unique order, origin-preserving held tile, atomic insert/replace/swap/return; invalidate only changed order. |
| H.STORY | story/run + core: start/cue endpoint/unmet/terminal/finalize; run mode preserved; Show uses physical guard/current certificate. |
| H.STORY_READ | ui/story + renderer/observations: settled state and both banks, no editable projected entities. |
| H.COACH | coach/client + core: context projection, one winning display, authored help, service envelope/semantic validation. |
| H.SETTINGS | ui/settings + preferences adapter: immediate reflow and separate truthful saving; C2 settles motion first. |
| H.SAVE | save adapter + core: immutable serial CAS writes, matching ACK, current session independent. |
| H.RECOVERY | save validators + ui: usable previous offered explicitly, unknown/conflict preserved, independently valid case vs invalid run. |
| H.RESET | core + save: cancel unchanged; accepted whole-case reset new caseRunId, preferences retained. |
| H.TOAST | physical/render + core: reveal-at-start durable endpoint; leave/skip settle; no investigation change. |
| H.ENDING | story/core + ui: historical completion before skippable aftermath, factual recap, current eligibility on replay. |

Shared exceptions: opening/inspecting settles a cue before any new explanation/display record; save/help arrival does not open a surface. A first physical source or seated unread leaflet needs its actual A; acquired evidence can reopen anywhere. SHOW/WORK/KIT commands delegate an uncompleted approach/kit handoff instead of remotely executing. An unavailable button supplies its actual reason. H.READER never grants complete E2.a from a first still. Canceled selection preserves certificate. Finalized history never authorizes a changed arrangement. H.RECOVERY cannot treat unsupported content as fresh empty progress.

Technical-only UI.TECH.LOADING/CONTENT_ERROR/ART_STATUS are in technical-copy.json and are additional failure/status dimensions, not replacements for these original states. H.RECOVERY adds the earlier-save Continue variant to UI.RECOVERY.DAMAGED/VERSION only when previous validates: load into unsaved live state, then use the existing deliberate REPLACE flow if saving is requested; see main §7. Every disk restore retains uncertainty about exposure after its saved boundary.

## All original states

| State ID | Responsible handler | Existing Item 07 content binding (reference) |
|---|---|---|
| `UI.HOME.CHECKING` | H.BOOT | CT.START.TITLE, CT.START.CASE, CT.START.CHECK, CT.UI.SETTINGS |
| `UI.HOME.EMPTY` | H.BOOT | CT.START.TITLE, CT.START.CASE, CT.START.START, CT.UI.SETTINGS |
| `UI.HOME.SAVED` | H.BOOT | CT.START.CONTINUE, CT.START.LOCATION or CT.START.VISIT, CT.START.OVER, CT.UI.SETTINGS; CT.RUN.PAUSED if applicable |
| `UI.WORLD.IDLE` | H.PHYSICAL | Current CT.SCENE entry/suffixes; current CT.GOAL entry; applicable CT.OBJ action and world toolbar |
| `UI.WORLD.MOVING` | H.PHYSICAL | CT.WORLD.GOING, CT.WORLD.STOP |
| `UI.WORLD.OPERATING` | H.PHYSICAL | Applicable CT.OBJ/KIT action result from §§3.3/6.1 |
| `UI.WORLD.CHOOSER` | H.PHYSICAL | CT.WORLD.CHOOSE, actual overlapping action labels, CT.UI.CANCEL |
| `UI.WORLD.BLOCKED` | H.PHYSICAL | CT.WORLD.BLOCKED or CT.WORLD.UNREACHABLE |
| `UI.GUIDE.OPENING` | H.NAV | CT.GOAL.ASSIGNMENT, CT.GUIDE.TAB then CT.GUIDE.PREVIEW, CT.UI.DISMISS, CT.ACCESS.MOVEMENT |
| `UI.GOAL` | H.NAV | CT.GOAL.ASSIGNMENT, actual physical goal, CT.GOAL.QUESTION if set, CT.UI.LATEST; CT.ENDING.REOPEN after completion |
| `UI.NAV.OBJECTS` | H.NAV | CT.UI.MOVE, CT.WORLD.LOCAL_LIST, actual §3.3/§6/§9 local actions and exits |
| `UI.NAV.MAP` | H.NAV | CT.UI.MAP, CT.WORLD.HERE, CT.NAV.ST/CY/WK/MEDIA on expansion, CT.WORLD.GO |
| `UI.NOTES.EMPTY` | H.NOTES | CT.NOTES.EMPTY, Notes tab labels, CT.KIT.OPEN_CURRENT only if carried |
| `UI.NOTES.LIST` | H.NOTES | Notes tabs, acquired CT.TITLE/source components, CT.NOTES.OPEN_SOURCE, CT.NOTES.LOCATION |
| `UI.SOURCE.TEXT` | H.READER | Applicable §2 source body/passage/title/provenance, CT.SOURCE.DETAIL, CT.SOURCE.ENLARGE |
| `UI.SOURCE.POST` | H.READER | CT.TITLE.E2, CT.MEDIA.FRAME1 on first access, CT.SRC.E2.C, CT.MEDIA.RECORDING/PHOTO/MESSAGE |
| `UI.SOURCE.CLIP` | H.READER | Selected CT.MEDIA.FRAME1/2/3, CT.MEDIA.END only at end, CT.CLIP controls and CT.META.RECORDED |
| `UI.SOURCE.PHOTO` | H.READER | CT.SRC.E2.B, CT.MEDIA.PARTIAL, CT.CLIP.ENLARGE_PHOTO |
| `UI.SOURCE.ZOOM` | H.READER | Exact current source/component; CT.UI.BACK, CT.ACCESS.SOURCE |
| `UI.SOURCE.WORD` | H.READER | Actual selected word + its CT.WORD entry, CT.SOURCE.DEFINITION_CLOSE |
| `UI.SOURCE.PICK` | H.READER | CT.SOURCE.CHOOSE, acquired title/passage options, CT.SOURCE.VENUE, CT.SOURCE.OPEN_VENUE, CT.SOURCE.USE/NONE, CT.UI.CANCEL |
| `UI.COMPARE.EMPTY` | H.NOTES | CT.COMPARE.INSTRUCTION/FIRST/SECOND, CT.SOURCE.ADD, CT.IDEA.FIELD/SAVE |
| `UI.COMPARE.PARTIAL` | H.NOTES | Same base + one actual detail, CT.SOURCE.CHANGE/REMOVE |
| `UI.COMPARE.READY` | H.NOTES | Both actual details, CT.COMPARE.RELATION/SUPPORTS/CONFLICTS/BEFORE/RELATION_HELP/CLEAR_RELATION, CT.IDEA.SAVE |
| `UI.TIMELINE.EMPTY` | H.NOTES | CT.TIMELINE.EMPTY, CT.TIMELINE.EVENT/DISCOVERY |
| `UI.TIMELINE.KNOWN` | H.NOTES | §4.1 applicable timeline labels + actual metadata/source title, CT.NOTES.OPEN_SOURCE |
| `UI.IDEA.DRAFT` | H.RECORD | CT.IDEA.FIELD/PRIVATE/SAVE, CT.UI.ADD_IDEA or CT.UI.NOTHING or CT.UI.LIMIT_RECORD only on applicable attempt |
| `UI.IDEA.RECORDED` | H.RECORD | CT.IDEA.RECORDED/CURRENT/EDIT, actual text/details; CT.IDEA.EARLIER if actual revision |
| `UI.LEAD` | H.RECORD | CT.LEAD.CHOOSE/CANCELED/MOVED/WHERE/PROMISE/DESTINATION/FOLLOW |
| `UI.TALK.TOPICS` | H.NPC | CT.TALK.TOPICS, eligible greeting and topic labels §5.2 |
| `UI.TALK.REPLY` | H.NPC | Exact selected §5 line or own §2 source; CT.TALK topics / CT.PRESENT.OPEN |
| `UI.PRESENT.SELECT` | H.NPC | CT.PRESENT.WHO/HERE/MET/CHOOSE/SELECTED, actual available details |
| `UI.PRESENT.REVIEW` | H.NPC | CT.PRESENT.REVIEW, actual details/child words, CT.PRESENT.SHOW or GO, CT.UI.EDIT/CANCEL |
| `UI.PRESENT.APPROACH` | H.NPC | CT.PRESENT.GOING, CT.UI.CANCEL; DONE only at delivery |
| `UI.PLAN.PRIVATE` | H.RECORD | CT.PLAN.SEARCH or STORY, CT.IDEA.PRIVATE/FIELD, CT.PLAN.RECORD/EXPLAIN |
| `UI.PLAN.RECORDED` | H.RECORD | CT.PLAN.RECORDED or DELIVERED, actual text/context; CT.IDEA.PAST_PLAN if stale arrangement |
| `UI.PLAN.ADDRESSED` | H.RECORD | CT.PLAN.EXPLAIN, CT.PRESENT.REVIEW/SHOW or GO, actual words/refs |
| `UI.KIT.CLOSED` | H.KIT | CT.KIT.OPEN/COLLECT |
| `UI.KIT.OPEN` | H.KIT | CT.KIT.TITLE/CONTENTS/COLLECT; actual tile names/Inspect; CT.KIT.NOTE_JO/REMY |
| `UI.KIT.CARRIED` | H.KIT | CT.KIT.CARRIED, CT.KIT.CONTENTS, note/tile controls, CT.WORLD.GO with Stage |
| `UI.KIT.HANDOFF` | H.KIT | CT.KIT.HANDOFF, CT.KIT.SEATED at seat commit |
| `UI.KIT.SEATED` | H.KIT | CT.KIT.SEATED, CT.RAIL.ARRANGE, tile/note controls at actual host |
| `UI.KIT.VACANT` | H.KIT | CT.KIT.VACANT; OPEN_CURRENT if carried, AT_STAGE if seated |
| `UI.SOURCE.TILE` | H.READER | Actual tile name + corresponding CT.SRC.E8 entry, CT.UI.BACK |
| `UI.WORK.NEEDS_KIT` | H.WORK | CT.KIT.EMPTY_BAY, CT.WORK.MISSING_KIT; MISSING_LOOP if both absent |
| `UI.WORK.NEEDS_LOOP` | H.WORK | CT.WORK.MISSING_LOOP, editable order and kit, CT.WORK.PREVIEW |
| `UI.WORK.EMPTY` | H.WORK | CT.WORK.EMPTY when attempted, CT.RAIL.HELP, kit/rail controls |
| `UI.WORK.READY` | H.WORK | CT.WORK.READY, CT.WORK.REHEARSE/LAUNCH, CT.RAIL.ARRANGE |
| `UI.WORK.CERTIFIED` | H.WORK | CT.WORK.CERTIFIED, LAUNCH or REPLAY |
| `UI.WORK.SHOW_CHECK` | H.WORK | Missing resource messages first, otherwise CT.WORK.CHECK, CT.WORK.REHEARSE |
| `UI.WORK.MORE` | H.WORK | CT.WORK.MORE/RESET/RESET_DESCRIPTION/CLEAR/CLEAR_DESCRIPTION, CT.UI.CANCEL |
| `UI.RAIL.SELECTED` | H.RAIL | CT.RAIL.CHOOSE/DESTINATIONS/CANCEL, applicable Inspect/move/swap/return |
| `UI.RAIL.DESTINATIONS` | H.RAIL | Applicable CT.RAIL gap/replace/swap/move/return labels |
| `UI.RUN.STARTING` | H.STORY | CT.RUN.TITLE, initial story description, CT.RUN.STOP |
| `UI.RUN.REHEARSAL` | H.STORY | CT.RUN.TITLE/CURRENT/STOP, actual CT.CUE caption, CT.STORY.OPEN |
| `UI.RUN.SHOW` | H.STORY | Same run/cue families in Premiere mode |
| `UI.RUN.UNMET` | H.STORY | Actual Hill/Flower CT.CUE, CT.RUN.CONTINUE/RESTART, notes/help/Arrange |
| `UI.RUN.PAUSED` | H.STORY | CT.RUN.PAUSED/NEXT/CONTINUE/RESTART |
| `UI.RUN.TERMINAL` | H.STORY | CT.RUN.TERMINAL/FINALIZE |
| `UI.RUN.FAILED` | H.STORY | CT.RUN.FINISHED + actual CT.STORY composition; optional CT.RUN.HELP_OFFER |
| `UI.STORY.DESCRIBE` | H.STORY_READ | CT.STORY.TITLE and composition, CT.STORY.ENLARGE |
| `UI.COACH.ENTRY` | H.COACH | CT.HELP.TITLE/FIELD/THINK/DIRECT, current question/context |
| `UI.COACH.TOPIC` | H.COACH | CT.HELP.TOPIC and known question/story labels |
| `UI.COACH.PENDING` | H.COACH | CT.HELP.PENDING/SUBMITTED/CANCEL, CT.UI.KEEP |
| `UI.COACH.WAITING` | H.COACH | CT.HELP.WAITING/CANCEL, CT.UI.KEEP |
| `UI.COACH.FALLBACK_OFFER` | H.COACH | CT.HELP.OFFER or UNAVAILABLE, USE_PREPARED/CANCEL/RETRY as applicable |
| `UI.COACH.READY_CLOSED` | H.COACH | CT.HELP.READY |
| `UI.COACH.RESPONSE` | H.COACH | CT.HELP.SUBMITTED, exact eligible response, PREPARED if local, AGAIN/DIRECT/KEEP |
| `UI.COACH.CLARIFY` | H.COACH | CT.HINT.CLARIFY or CT.HINT.SEARCH_CLARIFY/CT.HELP.TOPIC; clarification choices |
| `UI.COACH.DIRECT` | H.COACH | Appropriate CT.DIRECT response; explicit-request help label |
| `UI.COACH.STALE` | H.COACH | CT.HELP.STALE/THIS_VERSION, CT.UI.KEEP |
| `UI.COACH.CANCELED` | H.COACH | CT.HELP.CANCELED, current draft/entry controls |
| `UI.PAUSE` | H.SURFACE | CT.PAUSE.TITLE, CT.UI.FESTIVAL/SETTINGS, CT.PAUSE.HOME, CT.START.OVER, save state |
| `UI.SETTINGS` | H.SETTINGS | All §8.1 setting label/choice families and CT.SETTINGS.CONTROLS |
| `UI.SAVE.PENDING` | H.SAVE | CT.SAVE.PENDING/PENDING_DETAIL |
| `UI.SAVE.SAVED` | H.SAVE | CT.SAVE.SAVED |
| `UI.SAVE.SESSION` | H.SAVE | CT.SAVE.FAILED/DETAIL/RETRY, CT.UI.KEEP |
| `UI.RECOVERY.READ` | H.RECOVERY | CT.RECOVERY.READ/RETRY/SESSION/SESSION_DETAIL |
| `UI.RECOVERY.VERSION` | H.RECOVERY | CT.RECOVERY.VERSION/NEW, CT.UI.BACK |
| `UI.RECOVERY.DAMAGED` | H.RECOVERY | CT.RECOVERY.DAMAGED/RETRY/NEW, CT.UI.BACK |
| `UI.RECOVERY.REPLACE` | H.RECOVERY | CT.RECOVERY.REPLACE_UNKNOWN or REPLACE_KNOWN, KEEP_UNSAVED/REPLACE |
| `UI.RECOVERY.RUN` | H.RECOVERY | CT.RECOVERY.RUN, ROOM or Go to Stage, REHEARSE only at valid Stage approach |
| `UI.RESUME.RUN` | H.RECOVERY | CT.RUN.RESUME_NOTE or AWAY_NOTE, OPEN; CT.RECOVERY.UNCERTAIN_CUE when applicable |
| `UI.RESET.CASE` | H.RESET | CT.RESET.QUESTION/SCOPE/KEEP_PLAYING or KEEP_SAVED/ACCEPT |
| `UI.RETURN.FOREGROUND` | H.SURFACE | CT.RETURN.VISIBLE, CT.UI.FESTIVAL; current task/draft and paused-mode controls |
| `UI.TOAST.COVERED` | H.TOAST | CT.TOAST.TITLE/COVERED/START |
| `UI.TOAST.REVEALING` | H.TOAST | Actual CT.TOAST.ARMS/TRAY/MAGNIFIER stages, SKIP |
| `UI.TOAST.REVEALED` | H.TOAST | CT.TOAST.PUNCHLINE/MAGNIFIER/LOOK/REPLAY |
| `UI.TOAST.MAGNIFIER` | H.TOAST | CT.TOAST.ENLARGED, CT.UI.CLOSE/ROOM |
| `UI.TOAST.REPLAY` | H.TOAST | CT.TOAST.FLOURISH then PUNCHLINE |
| `UI.ENDING.CELEBRATION` | H.ENDING | CT.ENDING.TITLE/LIGHT, CT.JO.ENDING, SKIP/CONTINUE |
| `UI.ENDING.AFTERMATH` | H.ENDING | CT.ENDING.AFTER, CT.REMY.ENDING then CT.ARI.ENDING, NEXT/SKIP_REACTIONS |
| `UI.ENDING.RECAP` | H.ENDING | CT.ENDING.RECAP/FACT, actual conditional CT.RECAP entries, RETURN/REPLAY or GO_REPLAY, REACTIONS |

## All original transitions

Each trigger/guard/destination remains its Item 06 definition. The handler owns committing it; source text below is the existing Item 07 action binding, not new content.

| Transition ID | Responsible handler | Existing action/content reference |
|---|---|---|
| `T.CLIP.DESCRIBE` | H.READER | CT.CLIP.DESCRIBE → CT.SRC.E2.A complete description, explicitly exposed. |
| `T.CLIP.STEP` | H.READER | Previous/Next/frame button → only chosen frame, end marker if final. |
| `T.COACH.CANCEL` | H.COACH | CT.HELP.CANCEL → CANCELED; late result ignored. |
| `T.COACH.DIRECT` | H.COACH | CT.HELP.DIRECT → appropriate CT.DIRECT exact answer; prior response opportunity canceled. |
| `T.COACH.DIRECT_CLOSE` | H.COACH | Shared close → actual source/outcome/assistance history retained; no tile auto-placement. |
| `T.COACH.FALLBACK` | H.COACH | CT.HELP.USE_PREPARED → exact eligible local response; sole reply ownership. |
| `T.COACH.OFFER` | H.COACH | CT.HELP.OFFER after proposed eight seconds; closed view only AVAILABLE. |
| `T.COACH.OPEN_READY` | H.COACH | READY → recheck, response or STALE; no stale text flashed first. |
| `T.COACH.THINK` | H.COACH | CT.HELP.THINK → PENDING with submitted text or TOPIC without it. |
| `T.COACH.TOPIC` | H.COACH | CT.HELP.TOPIC → eligible authored attention/clarification, labeled Prepared hint. |
| `T.COACH.WAIT` | H.COACH | CT.HELP.WAITING after proposed two seconds. |
| `T.COMPARE.CHOOSE` | H.NOTES | CT.SOURCE.ADD/CHANGE → CT.SOURCE.CHOOSE. |
| `T.COMPARE.RELATE` | H.NOTES | CT.COMPARE relationship labels; CT.COMPARE.RELATION_HELP explains ownership. |
| `T.COMPARE.REMOVE` | H.NOTES | CT.SOURCE.REMOVE → remaining slots + retained idea/relation. |
| `T.COMPARE.SAVE` | H.NOTES | CT.IDEA.SAVE → CT.IDEA.RECORDED or actual empty/limit message. |
| `T.ENDING.AFTER` | H.ENDING | CT.ENDING.CONTINUE → AFTER + exact own-room reactions. |
| `T.ENDING.RECAP` | H.ENDING | NEXT/end/SKIP_REACTIONS → FACT + only actual conditional recap records. |
| `T.ENDING.REOPEN` | H.ENDING | CT.ENDING.REOPEN → same factual historical recap in place. |
| `T.ENDING.REPLAY` | H.ENDING | REPLAY at actual Stage Show approach, or GO_REPLAY travel only when elsewhere; current check still applies. |
| `T.ENDING.RETURN` | H.ENDING | RETURN or shared Back/Return to room according to caller; preserve current location/order. |
| `T.ENDING.SKIP` | H.ENDING | SKIP/actual leave → completed recap or chosen room; no erased completion. |
| `T.GOAL.ACTION` | H.NAV | Current actual goal/action or Map; no automatic hypothesis. |
| `T.GUIDE.DISMISS` | H.NAV | CT.UI.DISMISS; no extra line or goal loss. |
| `T.GUIDE.MODEL` | H.NAV | CT.OBJ.MODEL_RESULT + CT.JO.MODEL; next suggestion CT.GUIDE.PREVIEW. |
| `T.GUIDE.PREVIEW` | H.NAV | CT.WORK.PREVIEW_RESULT; available crew actions, no prescribed hidden destination. |
| `T.HOME.CHECK` | H.BOOT | CT.START.CHECK → actual Start/Continue/recovery result, no invented empty slot. |
| `T.HOME.CONTINUE` | H.BOOT | CT.START.CONTINUE/LOCATION/VISIT → current room and actual paused-run/draft status. |
| `T.HOME.OVER` | H.BOOT | CT.START.OVER or CT.RECOVERY.NEW → CT.RESET.QUESTION/SCOPE; no reset yet. |
| `T.HOME.SETTINGS` | H.BOOT | CT.UI.SETTINGS → settings families, same caller retained. |
| `T.HOME.START` | H.BOOT | CT.START.START → CT.GOAL.ASSIGNMENT + opening room/guidance. |
| `T.IDEA.CLOSE` | H.RECORD | Shared close, draft preserved in session; save status separate. |
| `T.IDEA.EDIT` | H.RECORD | CT.IDEA.EDIT → draft/status; old version remains actual history. |
| `T.IDEA.HELP` | H.RECORD | Explicit Help → CT.HELP entry; no silent request. |
| `T.IDEA.LEAD` | H.RECORD | Lead selection → CT.LEAD.CHOOSE. |
| `T.IDEA.SAVE` | H.RECORD | CT.IDEA.SAVE → CT.IDEA.RECORDED or actual empty/limit message. |
| `T.KIT.COLLECT` | H.KIT | CT.KIT.COLLECT → carried/HAVE result, no note bodies. |
| `T.KIT.OPEN` | H.KIT | CT.KIT.OPEN → CT.KIT.CONTENTS at lid commit. |
| `T.KIT.SEAT` | H.KIT | CT.KIT.HANDOFF → CT.KIT.SEATED at actual seat; queued work action follows only if current. |
| `T.LEAD.SET` | H.RECORD | CT.LEAD.FOLLOW → CT.GOAL.QUESTION; Go is separate. |
| `T.NAV.DESCRIBE` | H.NAV | Selected CT.NAV entry, public information only. |
| `T.NAV.GO` | H.NAV | CT.WORLD.GO → legal door chain; arrival scene. |
| `T.NAV.OBJECT` | H.NAV | CT.WORLD.LOCAL_LIST/actual action → legal movement. |
| `T.NOTES.KIT` | H.NOTES | CT.KIT.OPEN_CURRENT or AT_STAGE → legitimate owner/access, never remote unread seated leaflet. |
| `T.NOTES.OPEN` | H.NOTES | CT.NOTES.OPEN_SOURCE → actual acquired component/title/body. |
| `T.NOTES.TAB` | H.NOTES | CT.NOTES tab labels → corresponding heading/content. |
| `T.PAUSE.HOME` | H.SURFACE | CT.PAUSE.HOME → Continue this visit if unsaved; live state retained. |
| `T.PAUSE.RETURN` | H.SURFACE | CT.UI.FESTIVAL → world with run still paused. |
| `T.PAUSE.SETTINGS` | H.SURFACE | CT.UI.SETTINGS → settings families, same caller retained. |
| `T.PHOTO.ENLARGE` | H.READER | CT.SOURCE.ENLARGE or CT.CLIP.ENLARGE_PHOTO; identical component info. |
| `T.PICK.CANCEL` | H.READER | CT.UI.CANCEL → prior slot unchanged; no new status necessary. |
| `T.PICK.USE` | H.READER | CT.SOURCE.USE → actual selected slot/details; no verdict. |
| `T.PLAN.DELIVER` | H.RECORD | At actual approach, CT.PRESENT.DONE/CT.PLAN.DELIVERED and appropriate §5 reply; snapshot once. |
| `T.PLAN.RECORD` | H.RECORD | CT.PLAN.RECORD → CT.PLAN.RECORDED, no Jo reply. |
| `T.POST.PHOTO` | H.READER | CT.MEDIA.PHOTO → CT.SRC.E2.B + CT.MEDIA.PARTIAL. |
| `T.POST.PLAY` | H.READER | CT.CLIP.PLAY → actual frame/recording metadata. |
| `T.PRESENT.DELIVER` | H.NPC | At actual approach, CT.PRESENT.DONE/CT.PLAN.DELIVERED and appropriate §5 reply; snapshot once. |
| `T.PRESENT.REVIEW` | H.NPC | CT.PRESENT.REVIEW + exact selected refs/words. |
| `T.PRESENT.SHOW` | H.NPC | CT.PRESENT.SHOW → CT.PRESENT.GOING; delivery not yet claimed. |
| `T.PRESENT.TRAVEL` | H.NPC | CT.PRESENT.GO → actual destination, retain undelivered selection. |
| `T.RAIL.CANCEL` | H.RAIL | CT.RAIL.CANCEL → CT.RAIL.CANCELED, or INVALID on invalid drop; original owner. |
| `T.RAIL.COMMIT` | H.RAIL | Operation-specific caption below, then CT.RAIL.CHANGED only for actual order change. |
| `T.RAIL.DESTINATIONS` | H.RAIL | CT.RAIL.ARRANGE/CHOOSE/DESTINATIONS → valid named operations. |
| `T.RAIL.INSERT` | H.RAIL | CT.RAIL gap/move action → CT.RAIL.PLACED + changed caption. |
| `T.RAIL.MOVE` | H.RAIL | CT.RAIL gap/move action → CT.RAIL.PLACED + changed caption. |
| `T.RAIL.NOOP` | H.RAIL | CT.RAIL.SAME/START_LIMIT/END_LIMIT; certification retained, no changed caption. |
| `T.RAIL.REPLACE` | H.RAIL | CT.RAIL.REPLACE → CT.RAIL.REPLACED + changed caption. |
| `T.RAIL.RETURN` | H.RAIL | CT.RAIL.RETURN → CT.RAIL.RETURNED + changed caption. |
| `T.RAIL.SWAP` | H.RAIL | CT.RAIL.SWAP → CT.RAIL.SWAPPED + changed caption. |
| `T.RECOVERY.NEW` | H.RECOVERY | CT.START.OVER or CT.RECOVERY.NEW → CT.RESET.QUESTION/SCOPE; no reset yet. |
| `T.RECOVERY.REPLACE` | H.RECOVERY | Actual unknown/known message + Replace saved game → save result; cancel keeps visit. |
| `T.RECOVERY.RETRY` | H.RECOVERY | CT.RECOVERY.RETRY → startup check, no overwrite. |
| `T.RESET.ACCEPT` | H.RESET | CT.RESET.ACCEPT → initial assignment; OLD_MAY_RETURN only on actual save failure. |
| `T.RESET.CANCEL` | H.RESET | KEEP_PLAYING/KEEP_SAVED → same caller, no case change. |
| `T.RESUME.OPEN` | H.RECOVERY | CT.RUN.OPEN → actual Stage approach and correct-mode paused/terminal controls. |
| `T.RUN.BEGIN` | H.STORY | CT.RUN.TITLE and current cue; no success claim. |
| `T.RUN.CONTINUE` | H.STORY | CT.RUN.CONTINUE → actual next cue; no repair of prior unmet outcome. |
| `T.RUN.CUE` | H.STORY | Exact §6.4 factual endpoint caption; next/paused/finished result per actual state. |
| `T.RUN.FINALIZE` | H.STORY | CT.RUN.FINALIZE → FINISHED/CERTIFIED or completed-show ending; no repeated last cue. |
| `T.RUN.LEAVE` | H.STORY | Settle current cue once, CT.RUN.PAUSED or TERMINAL; leave then actual movement. |
| `T.RUN.REHEARSE` | H.STORY | CT.WORK.REHEARSE → missing-resource/empty message or Rehearsal starting. |
| `T.RUN.RESTART` | H.STORY | CT.RUN.RESTART with correct mode; show still requires certification. |
| `T.RUN.RESTART.REHEARSAL` | H.STORY | CT.RUN.RESTART with correct mode; show still requires certification. |
| `T.RUN.RESTART.SHOW` | H.STORY | CT.RUN.RESTART with correct mode; show still requires certification. |
| `T.RUN.SHOW` | H.STORY | CT.WORK.LAUNCH/REPLAY → eligible Premiere starting; otherwise Show check. |
| `T.RUN.STOP` | H.STORY | Settle current cue once, CT.RUN.PAUSED or TERMINAL; leave then actual movement. |
| `T.RUN.UNMET_CONTINUE` | H.STORY | CT.RUN.CONTINUE → actual next cue; no repair of prior unmet outcome. |
| `T.SAVE.ACK` | H.SAVE | CT.SAVE.SAVED only latest corresponding acknowledgment. |
| `T.SAVE.FAIL` | H.SAVE | CT.SAVE.FAILED/DETAIL, no interruption forced. |
| `T.SAVE.RETRY` | H.SAVE | CT.SAVE.RETRY → PENDING or real replacement decision. |
| `T.SETTINGS.CHANGE` | H.SETTINGS | Actual label/choice and APPLIED; save result separately truthful. |
| `T.SHOW.CHECK` | H.STORY | Actual prerequisite first, otherwise CT.WORK.CHECK. |
| `T.SOURCE.SELECT` | H.READER | CT.SOURCE.DETAIL → exact chosen passage + CT.ACCESS.DETAIL_SELECTED. |
| `T.SOURCE.UNZOOM` | H.READER | CT.UI.BACK → same source/component/scroll; no new text. |
| `T.SOURCE.WORD` | H.READER | Selected defined word → its CT.WORD entry. |
| `T.SOURCE.WORD.CLOSE` | H.READER | CT.SOURCE.DEFINITION_CLOSE → same reader word focus. |
| `T.SOURCE.ZOOM` | H.READER | CT.SOURCE.ENLARGE or CT.CLIP.ENLARGE_PHOTO; identical component info. |
| `T.STORY.CLOSE` | H.STORY_READ | Shared Back/Close → paused same caller; no new cue. |
| `T.TALK.ASK` | H.NPC | Actual CT.TALK topic → exact §5 matrix reply. |
| `T.TALK.BACK` | H.NPC | CT.UI.BACK → current topic list, no repeated intro. |
| `T.TALK.SOURCE` | H.NPC | Own-source request → actual §2 body and origin; source access, not a new author. |
| `T.TIMELINE.SOURCE` | H.NOTES | CT.NOTES.OPEN_SOURCE → actual acquired component/title/body. |
| `T.TIMELINE.VIEW` | H.NOTES | Event times/Discovery order; actual rows reordered, no history change. |
| `T.TOAST.LOOK` | H.TOAST | CT.TOAST.LOOK → ENLARGED. |
| `T.TOAST.REPLAY` | H.TOAST | CT.TOAST.REPLAY → FLOURISH then same result. |
| `T.TOAST.SETTLE` | H.TOAST | PUNCHLINE + final MAGNIFIER description; reveal committed once. |
| `T.TOAST.START` | H.TOAST | CT.TOAST.START → actual reveal-stage captions. |
| `T.VISIBILITY.HIDE` | H.SURFACE | No background announcement; handled event settles/pauses and attempts save. |
| `T.VISIBILITY.RETURN` | H.SURFACE | CT.RETURN.VISIBLE and existing task/mode/draft; no automatic resume. |
| `T.WORK.CLEAR` | H.WORK | CT.WORK.CLEAR/description → CLEAR_RESULT; historical premiere retained. |
| `T.WORK.EDIT` | H.WORK | CT.RAIL.ARRANGE/CHOOSE/DESTINATIONS → valid named operations. |
| `T.WORK.MISSING` | H.WORK | Actual CT.WORK.MISSING_KIT/LOOP; no source prerequisite. |
| `T.WORK.RESET` | H.WORK | CT.WORK.RESET/description → RESET_RESULT; retain order, remove current certification. |
| `T.WORLD.ABORT` | H.PHYSICAL | Actual pre/post-commit cue/result remains; fresh intent. CT.PRESENT.CANCELED only if delivery never committed. |
| `T.WORLD.ARRIVE` | H.PHYSICAL | Room crossing CT.WORLD.ARRIVED + actual scene; at object, its operating content. No new arbitrary arrival lore. |
| `T.WORLD.CANCEL` | H.PHYSICAL | CT.WORLD.STOP → CT.WORLD.STOPPED. |
| `T.WORLD.CHOOSE` | H.PHYSICAL | CT.WORLD.CHOOSE + chosen actual label → movement; Cancel leaves unchanged. |
| `T.WORLD.COMMIT` | H.PHYSICAL | Exact physical result §3.3/§6.1/§9 or actual source heading/body. |
| `T.WORLD.MOVE` | H.PHYSICAL | Actual action label → CT.WORLD.GOING for named target; retarget cancels old uncommitted operation. |
| `T.WORLD.RETARGET` | H.PHYSICAL | Actual action label → CT.WORLD.GOING for named target; retarget cancels old uncommitted operation. |
| `T.WORLD.RETRY` | H.PHYSICAL | BLOCKED/UNREACHABLE replaced by new actual movement/status. |
| `T.WORLD.TOOL` | H.PHYSICAL | Chosen toolbar label → its heading; applies pause caption if running. |
