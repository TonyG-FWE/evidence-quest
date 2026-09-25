/** Build-time flag only: query strings and saved state cannot grant artwork approval. */
declare const __EQ_REVIEW__: boolean;
declare const __EQ_PERSONAL_GRASS__: boolean;
declare const __EQ_DEMO_PRESENTATION__: boolean;
// Vite always replaces this flag, including false in production. The fallback
// is for the same domain code in Node verification, never a browser URL/save.
const nodeEnvironment=(globalThis as {process?:{env?:Record<string,string|undefined>}}).process?.env;
export const localReview = typeof __EQ_REVIEW__ !== 'undefined' ? __EQ_REVIEW__ : nodeEnvironment?.['EQ_ASSET_PROFILE']==='review';
export const personalGrass = localReview && (typeof __EQ_PERSONAL_GRASS__ !== 'undefined' ? __EQ_PERSONAL_GRASS__ : nodeEnvironment?.['EQ_PERSONAL_GRASS']==='1');
/** Presentation only. This does not approve artwork or select a different asset. */
export const demoPresentation = typeof __EQ_DEMO_PRESENTATION__ !== 'undefined' ? __EQ_DEMO_PRESENTATION__ : nodeEnvironment?.['EQ_DEMO_PRESENTATION']==='1';
