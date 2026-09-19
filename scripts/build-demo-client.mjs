/** A review build sees only the explicit public selection, not ambient outputs. */
import {build} from 'vite';
import {stageDemoPublic} from './demo-public.mjs';
if(process.env.EQ_ASSET_PROFILE!=='review'||process.env.EQ_PERSONAL_GRASS!=='1')throw Error('Explicit personal review profile required');
const publicDir=await stageDemoPublic();
// Vite merges this one override with the repository config, preserving its
// review plugin, target, quality and output location. Kept for local audit.
await build({publicDir,configLoader:'native'});
