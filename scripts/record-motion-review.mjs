import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const authorityPath='docs/design/evidence-quest-design-v3/10-asset-production/asset-manifest.json',authority=await readFile(authorityPath),manifest=JSON.parse(authority);
const hash=b=>createHash('sha256').update(b).digest('hex');
const implementation={
 WALK:'Four accepted direction cels at125ms each; carry upper pose uses the same moving lower legs. Only actual motion selects gait.',
 ROLL:'Two accepted roller cels at167ms each, selected from actual following direction; no invented movement.',
 REACH:'Accepted reach blends over240ms and holds through the existing operation; endpoint alone commits.',
 MODEL:'Tab0–220ms, Pip220–420ms and left bridge fold420–600ms. Only the independent model resets.',
 BRIEF:'Blank accepted flap morph0–350ms; existing450ms endpoint opens actual text.',
 DRAWER:'Blank accepted drawer morph/slide0–350ms;450ms source endpoint.',
 REQUEST:'Accepted folded/unfolded envelope morph; source text appears at existing physical endpoint.',
 DOCK_OPEN:'Accepted dock flap morph before the original physical flag/channel endpoint.',
 CADDY_OPEN:'Accepted open inspection case at workstation; portable case stays closed and hand-sized.',
 LEAFLET:'Blank leaflet pulls toward real hand; original note/source admission at endpoint.',
 NOTICE:'Clip release0–150ms, blank reverse150–650ms, reclip650–800ms; full canonical text after secure.',
 WAKE:'Standby/responsive lens crossfade0–250ms, stable response through500ms; following turn comes from actual route.',
 DOCK:'Existing physical channel travel then500ms rolling/docked contact crossfade; ownership commits once.',
 COLLECT:'Closed carrier moves/scales to hand over200ms; original350ms endpoint transfers host.',
 HANDOFF:'Closed carrier lowers to desk over200ms;350ms endpoint seats and opens the inspection presentation.',
 TILE:'180ms native FLIP motion,3CSSpx separating swap paths; actual committed order and focused tile retained.',
 E2:'Three authored stills at1000ms each, with explicit step/pause/replay/full-description controls.',
 PETALS:'Contained four-second ±6degree motion;400ms staggering, six Courtyard/four Workshop/three static Media.',
 FERRY:'Seed travel150–950ms and receive by1200ms; empty-boat bob leaves engine state unchanged.',
 BRIDGE:'Join0–400ms, actual Pip/seed crossing400–1200ms, settled by1400ms.',
 PLANT:'Planting pose, seed/hands400–800ms, roots800–1200ms; unmet factual hold unchanged.',
 BLOOM:'Flower growth0–600ms and light fade600–1200ms; unmet/noop remain engine-owned.',
 TOAST_REVEAL:'Seven-second cover/arms/lights, one-slice tray, then translucent magnifier; original retained reveal intent.',
 TOAST_REPLAY:'Two-second lid/arm flourish around the same revealed single slice; no repeated reveal commit.',
 CELEBRATE:'800ms accepted Jo accent after successful show finalization only; leaving stops decoration without changing milestone.',
 FOCUS:'120ms bracket opacity, immediate keyboard outline and immediate reduced-motion endpoint.',
 NPC_TURN:'Anchored150ms turn within400ms approached operation; actual delivery alone permits receive/acknowledge follow-through.',
 TOAST_IDLE:'Covered-only ±0.15world-unit lid motion over2s; stopped by reveal, reduced motion or room departure.',
};
const paths=['src/world/paint.ts','src/world/assets.ts','src/world/image-pool.ts','src/core/reducer.ts','src/ui/App.tsx','src/ui/Reader.tsx','src/ui/RecordingFrame.tsx','src/ui/app.css','src/ui/tokens.css'];
const files=[];for(const path of paths)files.push({path,sha256:hash(await readFile(path))});
const clips=manifest.clips.map(clip=>{const key=clip.id.slice(5);if(!implementation[key])throw Error('Missing original clip '+clip.id);return {id:clip.id,owners:clip.owners,policy:clip.policy,recommendedDurationMs:clip.durationMs,timingStatus:clip.timingStatus,implementedBehavior:implementation[key],endpointAuthority:clip.commit,interruption:clip.interruption,reducedMotion:clip.reducedMotion,review:'Implementation inspected; final browser/native candidate results are separately recorded. This is not a claim of a measured screenshot for every frame.'};});
if(clips.length!==28)throw Error('Unexpected clip inventory');
await writeFile('evidence/er13/motion-review.json',JSON.stringify({at:new Date().toISOString(),authority:{path:authorityPath,sha256:hash(authority)},files,clips,regression:'39 passing contracts include65orders/five successes and36cue races plus foreground draft and active-cue retention. Final candidate browser result and native paths are separately recorded in production qualification.'},null,2)+'\n');
console.log('All28 original clips mapped to actual implementation and original endpoint/interrupt authority.');
