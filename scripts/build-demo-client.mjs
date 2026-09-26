/** A review build sees only the explicit public selection, not ambient outputs. */
import {build} from 'vite';
import {withDemoPublic} from './demo-public.mjs';
if(process.env.EQ_ASSET_PROFILE!=='review'||process.env.EQ_PERSONAL_GRASS!=='1')throw Error('Explicit personal review profile required');
// Vite merges this one override with the repository config, preserving its
// review plugin, target, quality and output location. Kept for local audit.
await withDemoPublic(publicDir=>build({publicDir,configLoader:'native'}));
