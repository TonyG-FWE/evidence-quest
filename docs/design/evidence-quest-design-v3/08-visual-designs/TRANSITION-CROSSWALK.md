# Item 08 — transition-to-visual references

These are all existing Item 06 transition IDs. Linked functional diagrams specify layout and visible consequences; the five ILLUSTRATED references govern final appearance and drawing quality. State sets name the applicable source, destination or shared family context, not a new linear route. Item 06 remains authoritative for exact prerequisites and commits. The canonical Item 07 action binding is repeated as a reference, not new wording. The main specification contains thirteen written traces through the designs.

| Transition | Applicable states | Functional visual references | Canonical action/content binding from Item 07 |
|---|---|---|---|
| `T.CLIP.DESCRIBE` | `UI.SOURCE.CLIP` | [V08-E2-FIRST](V08-E2-FIRST.png), [V08-E2-END](V08-E2-END.png), [V08-E2-FULL](V08-E2-FULL.png) | CT.CLIP.DESCRIBE → CT.SRC.E2.A complete description, explicitly exposed. |
| `T.CLIP.STEP` | `UI.SOURCE.CLIP` | [V08-E2-FIRST](V08-E2-FIRST.png), [V08-E2-END](V08-E2-END.png) | Previous/Next/frame button → only chosen frame, end marker if final. |
| `T.COACH.CANCEL` | `UI.COACH.CANCELED` | [V08-HELP-ENTRY](V08-HELP-ENTRY.png) | CT.HELP.CANCEL → CANCELED; late result ignored. |
| `T.COACH.DIRECT` | `UI.COACH.ENTRY`, `UI.COACH.DIRECT` | [V08-HELP-ENTRY](V08-HELP-ENTRY.png), [V08-HELP-DIRECT](V08-HELP-DIRECT.png) | CT.HELP.DIRECT → appropriate CT.DIRECT exact answer; prior response opportunity canceled. |
| `T.COACH.DIRECT_CLOSE` | `UI.COACH.DIRECT` | [V08-HELP-DIRECT](V08-HELP-DIRECT.png) | Shared close → actual source/outcome/assistance history retained; no tile auto-placement. |
| `T.COACH.FALLBACK` | `UI.COACH.FALLBACK_OFFER`, `UI.COACH.RESPONSE` | [V08-HELP-FALLBACK](V08-HELP-FALLBACK.png), [V08-HELP-PREPARED](V08-HELP-PREPARED.png) | CT.HELP.USE_PREPARED → exact eligible local response; sole reply ownership. |
| `T.COACH.OFFER` | `UI.COACH.WAITING`, `UI.COACH.FALLBACK_OFFER` | [V08-HELP-WAITING](V08-HELP-WAITING.png), [V08-HELP-FALLBACK](V08-HELP-FALLBACK.png) | CT.HELP.OFFER after proposed eight seconds; closed view only AVAILABLE. |
| `T.COACH.OPEN_READY` | `UI.COACH.READY_CLOSED`, `UI.COACH.RESPONSE`, `UI.COACH.STALE` | [V08-HELP-WORLD](V08-HELP-WORLD.png), [V08-HELP-RESPONSE](V08-HELP-RESPONSE.png), [V08-HELP-STALE](V08-HELP-STALE.png) | READY → recheck, response or STALE; no stale text flashed first. |
| `T.COACH.THINK` | `UI.COACH.ENTRY`, `UI.COACH.PENDING` | [V08-HELP-ENTRY](V08-HELP-ENTRY.png), [V08-HELP-WAITING](V08-HELP-WAITING.png) | CT.HELP.THINK → PENDING with submitted text or TOPIC without it. |
| `T.COACH.TOPIC` | `UI.COACH.TOPIC` | [V08-HELP-CLARIFY](V08-HELP-CLARIFY.png) | CT.HELP.TOPIC → eligible authored attention/clarification, labeled Prepared hint. |
| `T.COACH.WAIT` | `UI.COACH.PENDING` | [V08-HELP-WAITING](V08-HELP-WAITING.png) | CT.HELP.WAITING after proposed two seconds. |
| `T.COMPARE.CHOOSE` | `UI.COMPARE.EMPTY` | [V08-COMPARE](V08-COMPARE.png) | CT.SOURCE.ADD/CHANGE → CT.SOURCE.CHOOSE. |
| `T.COMPARE.RELATE` | `UI.COMPARE.READY`, `UI.IDEA.RECORDED` | [V08-COMPARE](V08-COMPARE.png), [V08-PLAN-RECORDED](V08-PLAN-RECORDED.png) | CT.COMPARE relationship labels; CT.COMPARE.RELATION_HELP explains ownership. |
| `T.COMPARE.REMOVE` | `UI.COMPARE.PARTIAL` | [V08-COMPARE](V08-COMPARE.png) | CT.SOURCE.REMOVE → remaining slots + retained idea/relation. |
| `T.COMPARE.SAVE` | `UI.COMPARE.READY`, `UI.IDEA.RECORDED` | [V08-COMPARE](V08-COMPARE.png), [V08-PLAN-RECORDED](V08-PLAN-RECORDED.png) | CT.IDEA.SAVE → CT.IDEA.RECORDED or actual empty/limit message. |
| `T.ENDING.AFTER` | `UI.ENDING.CELEBRATION` | [V08-PREMIERE](V08-PREMIERE.png) | CT.ENDING.CONTINUE → AFTER + exact own-room reactions. |
| `T.ENDING.RECAP` | `UI.ENDING.AFTERMATH` | [V08-STORYBOARD-PREMIERE](V08-STORYBOARD-PREMIERE.png) | NEXT/end/SKIP_REACTIONS → FACT + only actual conditional recap records. |
| `T.ENDING.REOPEN` | `UI.GOAL`, `UI.PAUSE`, `UI.ENDING.RECAP` | [V08-RECAP](V08-RECAP.png), [V08-RECAP-REVISION](V08-RECAP-REVISION.png) | CT.ENDING.REOPEN → same factual historical recap in place. |
| `T.ENDING.REPLAY` | `UI.ENDING.RECAP` | [V08-RECAP](V08-RECAP.png) | REPLAY at actual Stage Show approach, or GO_REPLAY travel only when elsewhere; current check still applies. |
| `T.ENDING.RETURN` | `UI.ENDING.RECAP` | [V08-RECAP](V08-RECAP.png) | RETURN or shared Back/Return to room according to caller; preserve current location/order. |
| `T.ENDING.SKIP` | `UI.ENDING.CELEBRATION` | [V08-PREMIERE](V08-PREMIERE.png) | SKIP/actual leave → completed recap or chosen room; no erased completion. |
| `T.GOAL.ACTION` | `UI.GOAL`, `UI.NAV.MAP` | [V08-OPENING](V08-OPENING.png), [V08-NAV](V08-NAV.png) | Current actual goal/action or Map; no automatic hypothesis. |
| `T.GUIDE.DISMISS` | `UI.GUIDE.OPENING` | [V08-OPENING](V08-OPENING.png) | CT.UI.DISMISS; no extra line or goal loss. |
| `T.GUIDE.MODEL` | `UI.GUIDE.OPENING` | [V08-OPENING](V08-OPENING.png) | CT.OBJ.MODEL_RESULT + CT.JO.MODEL; next suggestion CT.GUIDE.PREVIEW. |
| `T.GUIDE.PREVIEW` | `UI.GUIDE.OPENING` | [V08-OPENING](V08-OPENING.png) | CT.WORK.PREVIEW_RESULT; available crew actions, no prescribed hidden destination. |
| `T.HOME.CHECK` | `UI.HOME.CHECKING`, `UI.HOME.EMPTY`, `UI.HOME.SAVED`, `UI.RECOVERY.READ`, `UI.RECOVERY.VERSION`, `UI.RECOVERY.DAMAGED` | [V08-HOME-EMPTY](V08-HOME-EMPTY.png), [V08-HOME-SAVED](V08-HOME-SAVED.png), [V08-RECOVERY-READ](V08-RECOVERY-READ.png), [V08-RECOVERY-INCOMPATIBLE](V08-RECOVERY-INCOMPATIBLE.png), [V08-RECOVERY-DAMAGED](V08-RECOVERY-DAMAGED.png) | CT.START.CHECK → actual Start/Continue/recovery result, no invented empty slot. |
| `T.HOME.CONTINUE` | `UI.HOME.SAVED`, `UI.WORLD.IDLE`, `UI.RESUME.RUN` | [V08-HOME-SAVED](V08-HOME-SAVED.png), [V08-RECOVERY-RESUME](V08-RECOVERY-RESUME.png) | CT.START.CONTINUE/LOCATION/VISIT → current room and actual paused-run/draft status. |
| `T.HOME.OVER` | `UI.HOME.SAVED`, `UI.RESET.CASE` | [V08-HOME-SAVED](V08-HOME-SAVED.png), [V08-RECOVERY-NEW-GAME](V08-RECOVERY-NEW-GAME.png) | CT.START.OVER or CT.RECOVERY.NEW → CT.RESET.QUESTION/SCOPE; no reset yet. |
| `T.HOME.SETTINGS` | `UI.HOME.EMPTY`, `UI.HOME.SAVED`, `UI.SETTINGS` | [V08-HOME-EMPTY](V08-HOME-EMPTY.png), [V08-SETTINGS](V08-SETTINGS.png) | CT.UI.SETTINGS → settings families, same caller retained. |
| `T.HOME.START` | `UI.HOME.EMPTY`, `UI.WORLD.IDLE`, `UI.GUIDE.OPENING` | [V08-HOME-EMPTY](V08-HOME-EMPTY.png), [V08-OPENING](V08-OPENING.png) | CT.START.START → CT.GOAL.ASSIGNMENT + opening room/guidance. |
| `T.IDEA.CLOSE` | `UI.IDEA.DRAFT` | [V08-PLAN-PRIVATE](V08-PLAN-PRIVATE.png) | Shared close, draft preserved in session; save status separate. |
| `T.IDEA.EDIT` | `UI.IDEA.RECORDED`, `UI.LEAD` | [V08-PLAN-RECORDED](V08-PLAN-RECORDED.png), [V08-LEAD](V08-LEAD.png) | CT.IDEA.EDIT → draft/status; old version remains actual history. |
| `T.IDEA.HELP` | `UI.IDEA.DRAFT` | [V08-PLAN-PRIVATE](V08-PLAN-PRIVATE.png) | Explicit Help → CT.HELP entry; no silent request. |
| `T.IDEA.LEAD` | `UI.IDEA.RECORDED`, `UI.LEAD` | [V08-PLAN-RECORDED](V08-PLAN-RECORDED.png), [V08-LEAD](V08-LEAD.png) | Lead selection → CT.LEAD.CHOOSE. |
| `T.IDEA.SAVE` | `UI.IDEA.DRAFT` | [V08-PLAN-PRIVATE](V08-PLAN-PRIVATE.png) | CT.IDEA.SAVE → CT.IDEA.RECORDED or actual empty/limit message. |
| `T.KIT.COLLECT` | `UI.KIT.CLOSED`, `UI.KIT.OPEN`, `UI.KIT.CARRIED` | [V08-KIT-OWNERS](V08-KIT-OWNERS.png), [V08-KIT](V08-KIT.png) | CT.KIT.COLLECT → carried/HAVE result, no note bodies. |
| `T.KIT.OPEN` | `UI.KIT.CLOSED`, `UI.KIT.OPEN` | [V08-KIT-OWNERS](V08-KIT-OWNERS.png), [V08-KIT](V08-KIT.png) | CT.KIT.OPEN → CT.KIT.CONTENTS at lid commit. |
| `T.KIT.SEAT` | `UI.KIT.HANDOFF`, `UI.KIT.SEATED` | [V08-KIT-OWNERS](V08-KIT-OWNERS.png), [V08-ROOM-ST-READY](V08-ROOM-ST-READY.png) | CT.KIT.HANDOFF → CT.KIT.SEATED at actual seat; queued work action follows only if current. |
| `T.LEAD.SET` | `UI.LEAD` | [V08-LEAD](V08-LEAD.png) | CT.LEAD.FOLLOW → CT.GOAL.QUESTION; Go is separate. |
| `T.NAV.DESCRIBE` | `UI.NAV.MAP` | [V08-NAV](V08-NAV.png) | Selected CT.NAV entry, public information only. |
| `T.NAV.GO` | `UI.NAV.MAP`, `UI.LEAD` | [V08-NAV](V08-NAV.png), [V08-LEAD](V08-LEAD.png) | CT.WORLD.GO → legal door chain; arrival scene. |
| `T.NAV.OBJECT` | `UI.NAV.OBJECTS` | [V08-COMPACT-NAV](V08-COMPACT-NAV.png) | CT.WORLD.LOCAL_LIST/actual action → legal movement. |
| `T.NOTES.KIT` | `UI.NOTES.EMPTY`, `UI.KIT.CARRIED` | [V08-NOTES-EMPTY](V08-NOTES-EMPTY.png), [V08-KIT](V08-KIT.png) | CT.KIT.OPEN_CURRENT or AT_STAGE → legitimate owner/access, never remote unread seated leaflet. |
| `T.NOTES.OPEN` | `UI.NOTES.LIST`, `UI.SOURCE.TEXT` | [V08-NOTES](V08-NOTES.png), [V08-READ-E7](V08-READ-E7.png) | CT.NOTES.OPEN_SOURCE → actual acquired component/title/body. |
| `T.NOTES.TAB` | `UI.NOTES.EMPTY`, `UI.KIT.CARRIED` | [V08-NOTES-EMPTY](V08-NOTES-EMPTY.png), [V08-KIT](V08-KIT.png) | CT.NOTES tab labels → corresponding heading/content. |
| `T.PAUSE.HOME` | `UI.PAUSE` | [V08-PAUSE-SAVE](V08-PAUSE-SAVE.png) | CT.PAUSE.HOME → Continue this visit if unsaved; live state retained. |
| `T.PAUSE.RETURN` | `UI.PAUSE` | [V08-PAUSE-SAVE](V08-PAUSE-SAVE.png) | CT.UI.FESTIVAL → world with run still paused. |
| `T.PAUSE.SETTINGS` | `UI.PAUSE` | [V08-PAUSE-SAVE](V08-PAUSE-SAVE.png) | CT.UI.SETTINGS → settings families, same caller retained. |
| `T.PHOTO.ENLARGE` | `UI.SOURCE.PHOTO`, `UI.SOURCE.ZOOM` | [V08-E2-PHOTO](V08-E2-PHOTO.png) | CT.SOURCE.ENLARGE or CT.CLIP.ENLARGE_PHOTO; identical component info. |
| `T.PICK.CANCEL` | `UI.SOURCE.PICK` | [V08-PICK](V08-PICK.png) | CT.UI.CANCEL → prior slot unchanged; no new status necessary. |
| `T.PICK.USE` | `UI.SOURCE.PICK` | [V08-PICK](V08-PICK.png) | CT.SOURCE.USE → actual selected slot/details; no verdict. |
| `T.PLAN.DELIVER` | `UI.PLAN.ADDRESSED` | [V08-PLAN-DELIVERED](V08-PLAN-DELIVERED.png) | At actual approach, CT.PRESENT.DONE/CT.PLAN.DELIVERED and appropriate §5 reply; snapshot once. |
| `T.PLAN.RECORD` | `UI.PLAN.PRIVATE` | [V08-PLAN-PRIVATE](V08-PLAN-PRIVATE.png) | CT.PLAN.RECORD → CT.PLAN.RECORDED, no Jo reply. |
| `T.POST.PHOTO` | `UI.SOURCE.POST`, `UI.SOURCE.PHOTO` | [V08-E2-FIRST](V08-E2-FIRST.png), [V08-E2-PHOTO](V08-E2-PHOTO.png) | CT.MEDIA.PHOTO → CT.SRC.E2.B + CT.MEDIA.PARTIAL. |
| `T.POST.PLAY` | `UI.SOURCE.POST`, `UI.SOURCE.CLIP` | [V08-E2-FIRST](V08-E2-FIRST.png), [V08-E2-END](V08-E2-END.png) | CT.CLIP.PLAY → actual frame/recording metadata. |
| `T.PRESENT.DELIVER` | `UI.PRESENT.APPROACH` | [V08-PRESENT](V08-PRESENT.png) | At actual approach, CT.PRESENT.DONE/CT.PLAN.DELIVERED and appropriate §5 reply; snapshot once. |
| `T.PRESENT.REVIEW` | `UI.PRESENT.SELECT` | [V08-PRESENT](V08-PRESENT.png) | CT.PRESENT.REVIEW + exact selected refs/words. |
| `T.PRESENT.SHOW` | `UI.PRESENT.REVIEW`, `UI.PRESENT.APPROACH` | [V08-PRESENT](V08-PRESENT.png) | CT.PRESENT.SHOW → CT.PRESENT.GOING; delivery not yet claimed. |
| `T.PRESENT.TRAVEL` | `UI.PRESENT.REVIEW`, `UI.PRESENT.APPROACH` | [V08-PRESENT](V08-PRESENT.png) | CT.PRESENT.GO → actual destination, retain undelivered selection. |
| `T.RAIL.CANCEL` | `UI.RAIL.DESTINATIONS` | [V08-RAIL-ACTIONS](V08-RAIL-ACTIONS.png) | CT.RAIL.CANCEL → CT.RAIL.CANCELED, or INVALID on invalid drop; original owner. |
| `T.RAIL.COMMIT` | `UI.RAIL.DESTINATIONS` | [V08-RAIL-ACTIONS](V08-RAIL-ACTIONS.png) | Operation-specific caption below, then CT.RAIL.CHANGED only for actual order change. |
| `T.RAIL.DESTINATIONS` | `UI.RAIL.SELECTED` | [V08-RAIL-ACTIONS](V08-RAIL-ACTIONS.png) | CT.RAIL.ARRANGE/CHOOSE/DESTINATIONS → valid named operations. |
| `T.RAIL.INSERT` | `UI.RAIL.SELECTED`, `UI.RAIL.DESTINATIONS`, `UI.WORK.READY`, `UI.WORK.NEEDS_LOOP` | [V08-RAIL-ACTIONS](V08-RAIL-ACTIONS.png), [V08-STORYBOARD-TILES](V08-STORYBOARD-TILES.png), [V08-WORK-CHANGED](V08-WORK-CHANGED.png) | CT.RAIL gap/move action → CT.RAIL.PLACED + changed caption. |
| `T.RAIL.MOVE` | `UI.RAIL.SELECTED`, `UI.RAIL.DESTINATIONS`, `UI.WORK.READY`, `UI.WORK.NEEDS_LOOP` | [V08-RAIL-ACTIONS](V08-RAIL-ACTIONS.png), [V08-STORYBOARD-TILES](V08-STORYBOARD-TILES.png), [V08-WORK-CHANGED](V08-WORK-CHANGED.png) | CT.RAIL gap/move action → CT.RAIL.PLACED + changed caption. |
| `T.RAIL.NOOP` | `UI.RAIL.SELECTED`, `UI.RAIL.DESTINATIONS`, `UI.WORK.CERTIFIED`, `UI.RUN.PAUSED` | [V08-RAIL-ACTIONS](V08-RAIL-ACTIONS.png), [V08-WORK-SUCCESS](V08-WORK-SUCCESS.png), [V08-WORK-PAUSED](V08-WORK-PAUSED.png) | CT.RAIL.SAME/START_LIMIT/END_LIMIT; certification retained, no changed caption. |
| `T.RAIL.REPLACE` | `UI.RAIL.SELECTED`, `UI.RAIL.DESTINATIONS`, `UI.WORK.READY`, `UI.WORK.NEEDS_LOOP` | [V08-RAIL-ACTIONS](V08-RAIL-ACTIONS.png), [V08-STORYBOARD-TILES](V08-STORYBOARD-TILES.png), [V08-WORK-CHANGED](V08-WORK-CHANGED.png) | CT.RAIL.REPLACE → CT.RAIL.REPLACED + changed caption. |
| `T.RAIL.RETURN` | `UI.RAIL.SELECTED`, `UI.RAIL.DESTINATIONS`, `UI.WORK.READY`, `UI.WORK.NEEDS_LOOP` | [V08-RAIL-ACTIONS](V08-RAIL-ACTIONS.png), [V08-STORYBOARD-TILES](V08-STORYBOARD-TILES.png), [V08-WORK-CHANGED](V08-WORK-CHANGED.png) | CT.RAIL.RETURN → CT.RAIL.RETURNED + changed caption. |
| `T.RAIL.SWAP` | `UI.RAIL.SELECTED`, `UI.RAIL.DESTINATIONS`, `UI.WORK.READY`, `UI.WORK.NEEDS_LOOP` | [V08-RAIL-ACTIONS](V08-RAIL-ACTIONS.png), [V08-STORYBOARD-TILES](V08-STORYBOARD-TILES.png), [V08-WORK-CHANGED](V08-WORK-CHANGED.png) | CT.RAIL.SWAP → CT.RAIL.SWAPPED + changed caption. |
| `T.RECOVERY.NEW` | `UI.RECOVERY.VERSION` | [V08-RECOVERY-INCOMPATIBLE](V08-RECOVERY-INCOMPATIBLE.png) | CT.START.OVER or CT.RECOVERY.NEW → CT.RESET.QUESTION/SCOPE; no reset yet. |
| `T.RECOVERY.REPLACE` | `UI.RECOVERY.REPLACE` | [V08-RECOVERY-READ](V08-RECOVERY-READ.png) | Actual unknown/known message + Replace saved game → save result; cancel keeps visit. |
| `T.RECOVERY.RETRY` | `UI.RECOVERY.READ` | [V08-RECOVERY-READ](V08-RECOVERY-READ.png) | CT.RECOVERY.RETRY → startup check, no overwrite. |
| `T.RESET.ACCEPT` | `UI.RESET.CASE` | [V08-RECOVERY-NEW-GAME](V08-RECOVERY-NEW-GAME.png) | CT.RESET.ACCEPT → initial assignment; OLD_MAY_RETURN only on actual save failure. |
| `T.RESET.CANCEL` | `UI.RESET.CASE` | [V08-RECOVERY-NEW-GAME](V08-RECOVERY-NEW-GAME.png) | KEEP_PLAYING/KEEP_SAVED → same caller, no case change. |
| `T.RESUME.OPEN` | `UI.RESUME.RUN` | [V08-RECOVERY-RESUME](V08-RECOVERY-RESUME.png) | CT.RUN.OPEN → actual Stage approach and correct-mode paused/terminal controls. |
| `T.RUN.BEGIN` | `UI.RUN.STARTING`, `UI.RUN.REHEARSAL`, `UI.RUN.SHOW` | [V08-STORYBOARD-REHEARSAL](V08-STORYBOARD-REHEARSAL.png), [V08-WORK-SEED](V08-WORK-SEED.png) | CT.RUN.TITLE and current cue; no success claim. |
| `T.RUN.CONTINUE` | `UI.RUN.PAUSED` | [V08-WORK-PAUSED](V08-WORK-PAUSED.png) | CT.RUN.CONTINUE → actual next cue; no repair of prior unmet outcome. |
| `T.RUN.CUE` | `UI.RUN.REHEARSAL` | [V08-WORK-SEED](V08-WORK-SEED.png) | Exact §6.4 factual endpoint caption; next/paused/finished result per actual state. |
| `T.RUN.FINALIZE` | `UI.RUN.TERMINAL`, `UI.RUN.FAILED`, `UI.WORK.CERTIFIED`, `UI.ENDING.CELEBRATION` | [V08-WORK-PAUSED](V08-WORK-PAUSED.png), [V08-WORK-UNMET](V08-WORK-UNMET.png), [V08-WORK-SUCCESS](V08-WORK-SUCCESS.png), [V08-PREMIERE](V08-PREMIERE.png) | CT.RUN.FINALIZE → FINISHED/CERTIFIED or completed-show ending; no repeated last cue. |
| `T.RUN.LEAVE` | `UI.RUN.PAUSED`, `UI.RUN.TERMINAL`, `UI.WORLD.IDLE`, `UI.WORLD.MOVING` | [V08-STORYBOARD-INTERRUPT](V08-STORYBOARD-INTERRUPT.png), [V08-WORK-PAUSED](V08-WORK-PAUSED.png) | Settle current cue once, CT.RUN.PAUSED or TERMINAL; leave then actual movement. |
| `T.RUN.REHEARSE` | `UI.WORK.EMPTY` | [V08-WORK-EMPTY](V08-WORK-EMPTY.png) | CT.WORK.REHEARSE → missing-resource/empty message or Rehearsal starting. |
| `T.RUN.RESTART` | `UI.RUN.PAUSED` | [V08-WORK-PAUSED](V08-WORK-PAUSED.png) | CT.RUN.RESTART with correct mode; show still requires certification. |
| `T.RUN.RESTART.REHEARSAL` | `UI.RUN.PAUSED`, `UI.RUN.UNMET`, `UI.RUN.STARTING` | [V08-WORK-PAUSED](V08-WORK-PAUSED.png), [V08-WORK-UNMET](V08-WORK-UNMET.png), [V08-STORYBOARD-REHEARSAL](V08-STORYBOARD-REHEARSAL.png) | CT.RUN.RESTART with correct mode; show still requires certification. |
| `T.RUN.RESTART.SHOW` | `UI.RUN.PAUSED`, `UI.RUN.STARTING`, `UI.WORK.SHOW_CHECK` | [V08-STORYBOARD-INTERRUPT](V08-STORYBOARD-INTERRUPT.png), [V08-WORK-HISTORY](V08-WORK-HISTORY.png) | CT.RUN.RESTART with correct mode; show still requires certification. |
| `T.RUN.SHOW` | `UI.WORK.CERTIFIED`, `UI.RUN.STARTING`, `UI.RUN.SHOW` | [V08-WORK-SUCCESS](V08-WORK-SUCCESS.png), [V08-STORYBOARD-PREMIERE](V08-STORYBOARD-PREMIERE.png) | CT.WORK.LAUNCH/REPLAY → eligible Premiere starting; otherwise Show check. |
| `T.RUN.STOP` | `UI.RUN.REHEARSAL`, `UI.RUN.SHOW`, `UI.RUN.PAUSED`, `UI.RUN.TERMINAL` | [V08-STORYBOARD-INTERRUPT](V08-STORYBOARD-INTERRUPT.png), [V08-WORK-PAUSED](V08-WORK-PAUSED.png) | Settle current cue once, CT.RUN.PAUSED or TERMINAL; leave then actual movement. |
| `T.RUN.UNMET_CONTINUE` | `UI.RUN.UNMET` | [V08-WORK-UNMET](V08-WORK-UNMET.png) | CT.RUN.CONTINUE → actual next cue; no repair of prior unmet outcome. |
| `T.SAVE.ACK` | `UI.SAVE.PENDING` | [V08-PAUSE-SAVE](V08-PAUSE-SAVE.png) | CT.SAVE.SAVED only latest corresponding acknowledgment. |
| `T.SAVE.FAIL` | `UI.SAVE.PENDING` | [V08-PAUSE-SAVE](V08-PAUSE-SAVE.png) | CT.SAVE.FAILED/DETAIL, no interruption forced. |
| `T.SAVE.RETRY` | `UI.SAVE.SESSION` | [V08-PAUSE-SAVE](V08-PAUSE-SAVE.png) | CT.SAVE.RETRY → PENDING or real replacement decision. |
| `T.SETTINGS.CHANGE` | `UI.SETTINGS` | [V08-SETTINGS](V08-SETTINGS.png) | Actual label/choice and APPLIED; save result separately truthful. |
| `T.SHOW.CHECK` | `UI.WORK.SHOW_CHECK` | [V08-WORK-HISTORY](V08-WORK-HISTORY.png) | Actual prerequisite first, otherwise CT.WORK.CHECK. |
| `T.SOURCE.SELECT` | `UI.SOURCE.TEXT`, `UI.SOURCE.ZOOM`, `UI.SOURCE.WORD` | [V08-READ-E7](V08-READ-E7.png), [V08-COMPACT-SOURCE-FULL](V08-COMPACT-SOURCE-FULL.png), [V08-WORD](V08-WORD.png) | CT.SOURCE.DETAIL → exact chosen passage + CT.ACCESS.DETAIL_SELECTED. |
| `T.SOURCE.UNZOOM` | `UI.SOURCE.ZOOM` | [V08-COMPACT-SOURCE-FULL](V08-COMPACT-SOURCE-FULL.png) | CT.UI.BACK → same source/component/scroll; no new text. |
| `T.SOURCE.WORD` | `UI.SOURCE.TEXT`, `UI.SOURCE.ZOOM`, `UI.SOURCE.WORD` | [V08-READ-E7](V08-READ-E7.png), [V08-COMPACT-SOURCE-FULL](V08-COMPACT-SOURCE-FULL.png), [V08-WORD](V08-WORD.png) | Selected defined word → its CT.WORD entry. |
| `T.SOURCE.WORD.CLOSE` | `UI.SOURCE.WORD` | [V08-WORD](V08-WORD.png) | CT.SOURCE.DEFINITION_CLOSE → same reader word focus. |
| `T.SOURCE.ZOOM` | `UI.SOURCE.TEXT`, `UI.SOURCE.ZOOM`, `UI.SOURCE.WORD` | [V08-READ-E7](V08-READ-E7.png), [V08-COMPACT-SOURCE-FULL](V08-COMPACT-SOURCE-FULL.png), [V08-WORD](V08-WORD.png) | CT.SOURCE.ENLARGE or CT.CLIP.ENLARGE_PHOTO; identical component info. |
| `T.STORY.CLOSE` | `UI.STORY.DESCRIBE` | [V08-COMPACT-WATCH](V08-COMPACT-WATCH.png) | Shared Back/Close → paused same caller; no new cue. |
| `T.TALK.ASK` | `UI.TALK.TOPICS`, `UI.TALK.REPLY` | [V08-TALK](V08-TALK.png) | Actual CT.TALK topic → exact §5 matrix reply. |
| `T.TALK.BACK` | `UI.TALK.REPLY` | [V08-TALK](V08-TALK.png) | CT.UI.BACK → current topic list, no repeated intro. |
| `T.TALK.SOURCE` | `UI.TALK.TOPICS`, `UI.TALK.REPLY` | [V08-TALK](V08-TALK.png) | Own-source request → actual §2 body and origin; source access, not a new author. |
| `T.TIMELINE.SOURCE` | `UI.TIMELINE.KNOWN` | [V08-TIMELINE](V08-TIMELINE.png) | CT.NOTES.OPEN_SOURCE → actual acquired component/title/body. |
| `T.TIMELINE.VIEW` | `UI.TIMELINE.KNOWN` | [V08-TIMELINE](V08-TIMELINE.png) | Event times/Discovery order; actual rows reordered, no history change. |
| `T.TOAST.LOOK` | `UI.TOAST.REVEALED` | [V08-STORYBOARD-TOAST](V08-STORYBOARD-TOAST.png) | CT.TOAST.LOOK → ENLARGED. |
| `T.TOAST.REPLAY` | `UI.TOAST.REVEALED` | [V08-STORYBOARD-TOAST](V08-STORYBOARD-TOAST.png) | CT.TOAST.REPLAY → FLOURISH then same result. |
| `T.TOAST.SETTLE` | `UI.TOAST.REVEALING`, `UI.TOAST.REVEALED` | [V08-STORYBOARD-TOAST](V08-STORYBOARD-TOAST.png), [V08-ROOM-WK-REVEALED](V08-ROOM-WK-REVEALED.png) | PUNCHLINE + final MAGNIFIER description; reveal committed once. |
| `T.TOAST.START` | `UI.TOAST.COVERED`, `UI.TOAST.REVEALING` | [V08-ROOM-WK-INITIAL](V08-ROOM-WK-INITIAL.png), [V08-STORYBOARD-TOAST](V08-STORYBOARD-TOAST.png) | CT.TOAST.START → actual reveal-stage captions. |
| `T.VISIBILITY.HIDE` | `UI.WORLD.IDLE`, `UI.RUN.PAUSED`, `UI.RUN.TERMINAL` | [V08-STORYBOARD-INTERRUPT](V08-STORYBOARD-INTERRUPT.png), [V08-RECOVERY-RESUME](V08-RECOVERY-RESUME.png) | No background announcement; handled event settles/pauses and attempts save. |
| `T.VISIBILITY.RETURN` | `UI.RETURN.FOREGROUND` | [V08-RECOVERY-RESUME](V08-RECOVERY-RESUME.png) | CT.RETURN.VISIBLE and existing task/mode/draft; no automatic resume. |
| `T.WORK.CLEAR` | `UI.WORK.MORE` | [V08-WORK-MORE](V08-WORK-MORE.png) | CT.WORK.CLEAR/description → CLEAR_RESULT; historical premiere retained. |
| `T.WORK.EDIT` | `UI.WORK.NEEDS_LOOP` | [V08-RESOURCES](V08-RESOURCES.png) | CT.RAIL.ARRANGE/CHOOSE/DESTINATIONS → valid named operations. |
| `T.WORK.MISSING` | `UI.WORK.NEEDS_KIT` | [V08-RESOURCES](V08-RESOURCES.png) | Actual CT.WORK.MISSING_KIT/LOOP; no source prerequisite. |
| `T.WORK.RESET` | `UI.WORK.MORE` | [V08-WORK-MORE](V08-WORK-MORE.png) | CT.WORK.RESET/description → RESET_RESULT; retain order, remove current certification. |
| `T.WORLD.ABORT` | `UI.WORLD.OPERATING` | [V08-OPENING](V08-OPENING.png) | Actual pre/post-commit cue/result remains; fresh intent. CT.PRESENT.CANCELED only if delivery never committed. |
| `T.WORLD.ARRIVE` | `UI.WORLD.MOVING`, `UI.WORLD.OPERATING` | [V08-OPENING](V08-OPENING.png) | Room crossing CT.WORLD.ARRIVED + actual scene; at object, its operating content. No new arbitrary arrival lore. |
| `T.WORLD.CANCEL` | `UI.WORLD.MOVING`, `UI.WORLD.OPERATING` | [V08-OPENING](V08-OPENING.png) | CT.WORLD.STOP → CT.WORLD.STOPPED. |
| `T.WORLD.CHOOSE` | `UI.WORLD.CHOOSER` | [V08-CHOOSER](V08-CHOOSER.png) | CT.WORLD.CHOOSE + chosen actual label → movement; Cancel leaves unchanged. |
| `T.WORLD.COMMIT` | `UI.WORLD.OPERATING`, `UI.WORLD.IDLE`, `UI.SOURCE.TEXT`, `UI.KIT.CARRIED` | [V08-STORYBOARD-EXPLORE](V08-STORYBOARD-EXPLORE.png), [V08-STORYBOARD-NOTICE](V08-STORYBOARD-NOTICE.png), [V08-STORYBOARD-RECOVERY](V08-STORYBOARD-RECOVERY.png), [V08-KIT-OWNERS](V08-KIT-OWNERS.png) | Exact physical result §3.3/§6.1/§9 or actual source heading/body. |
| `T.WORLD.MOVE` | `UI.WORLD.IDLE`, `UI.WORLD.MOVING`, `UI.PAUSE` | [V08-OPENING](V08-OPENING.png), [V08-PAUSE-SAVE](V08-PAUSE-SAVE.png) | Actual action label → CT.WORLD.GOING for named target; retarget cancels old uncommitted operation. |
| `T.WORLD.RETARGET` | `UI.WORLD.MOVING`, `UI.WORLD.OPERATING` | [V08-OPENING](V08-OPENING.png) | Actual action label → CT.WORLD.GOING for named target; retarget cancels old uncommitted operation. |
| `T.WORLD.RETRY` | `UI.WORLD.BLOCKED` | [V08-OPENING](V08-OPENING.png) | BLOCKED/UNREACHABLE replaced by new actual movement/status. |
| `T.WORLD.TOOL` | `UI.WORLD.IDLE`, `UI.WORLD.MOVING`, `UI.PAUSE` | [V08-OPENING](V08-OPENING.png), [V08-PAUSE-SAVE](V08-PAUSE-SAVE.png) | Chosen toolbar label → its heading; applies pause caption if running. |
