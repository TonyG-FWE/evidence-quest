import type { CaseState, Draft, Exposure, Order, Point, Preferences, Run, CoachRequest } from '../../contracts/types.js';
import type { View } from './state.js';
export type Command =
 |{type:'NEW_GAME';caseId:string;visitId:string;save?:boolean}|{type:'CONTINUE'}
 |{type:'BOOT_CHECK';generation:string}|{type:'BOOT';generation:string;status:'empty'|'saved'|'read-error'|'version'|'damaged'|'run';candidate:CaseState|null;preserve?:boolean;slotRevision?:number}
 |{type:'RESTORE';visitId:string}|{type:'SAVE_MODE';mode:'normal'|'unavailable'|'unknown-record'|'conflict'}|{type:'PREF_RESULT';revision:number;failed:boolean}
 |{type:'VIEW';view:View}|{type:'FOCUS';owner:'home'|'world'|'task'|'text'|'picker'|'confirmation'}|{type:'KEYS';keys:Array<'up'|'down'|'left'|'right'>}
 |{type:'TARGET';target:string;action?:string}|{type:'WALK';point:Point}|{type:'TICK';ms:number}|{type:'ACTION_READY';actionId:string}|{type:'STOP_WALK'}
 |{type:'EXPOSE';exposure:Pick<Exposure,'refId'|'ctId'|'spans'|'visualComplete'|'viaAccessId'>}
 |{type:'SOURCE_POSITION';sourceId:string;componentRef:string;frame:number|null;scrollFraction:number}
 |{type:'DRAFT';id:Draft['id'];text:string;refs?:string[]}|{type:'RECORD_PLAN';topic:'search'|'story';addressed?:boolean}|{type:'LEAD';lead:CaseState['selectedLead']}
 |{type:'TALK';topic:string}|{type:'PRESENT';actor:'ACT.JO'|'ACT.REMY'|'ACT.ARI';refs:string[]}|{type:'DELIVER_PLAN';topic:'search'|'story'}
 |{type:'SELECT_TILE';tile:Order[number]}|{type:'EDIT_RAIL';operation:'insert'|'replace'|'swap'|'return'|'before'|'after'|'left'|'right';index:number}|{type:'CANCEL_TILE';invalid?:boolean}
 |{type:'PRESENTATION';mode:'arrange'|'watch'}
 |{type:'RUN';mode:Run['mode']}|{type:'START_CUE';runId:string}|{type:'CUE_READY';runId:string;cueId:string}|{type:'FINALIZE_RUN';runId:string}
 |{type:'PAUSE_RUN';reason:Exclude<Run['pauseReason'],null>}|{type:'CONTINUE_RUN'}|{type:'RESTART_RUN'}|{type:'RESET_RUN'}|{type:'CLEAR_RAIL'}
 |{type:'HELP';direct?:boolean;noteHelp?:boolean}|{type:'PREF';key:'sound'|'motion'|'text'|'spacing';value:string}|{type:'LOAD_PREFS';preferences:Preferences}
 |{type:'COACH_RECEIVE';requestId:string;response:unknown}|{type:'COACH_TIME';requestId:string;ms:number}|{type:'COACH_CHOOSE';choice:'live'|'fallback'}|{type:'COACH_DISPLAY';requestId:string}|{type:'COACH_CANCEL'}|{type:'COACH_FOCUS';focused:boolean}|{type:'COACH_DEVELOPMENT'}|{type:'NPC_HELP_DISPLAY';id:string}
 |{type:'SAVE_BEGIN';token:string;revision:number}|{type:'SAVE_ACK';token:string;revision:number;slotRevision:number;caseId:string;visitId:string}|{type:'SAVE_FAILED';token:string;mode:'unavailable'|'conflict'|'unknown-record'}
 |{type:'ART_RETRY'}|{type:'ART_FAILED'}|{type:'CANVAS_FAILED'}|{type:'TOAST_START'}|{type:'TOAST_DONE';actionId:string}|{type:'DISMISS_GUIDE';guide:'openingDismissed'|'movementDismissed'|'ariInvitationDismissed'}|{type:'BACKGROUND'};
export interface Envelope {id:string;ids:string[];visitId:string;caseId:string;command:Command;}
export type Effect={kind:'timer';ms:number;command:Command}|{kind:'save';draft?:boolean}|{kind:'preferences'}|{kind:'coach-send';request:CoachRequest}|{kind:'coach-abort';requestId:string};
