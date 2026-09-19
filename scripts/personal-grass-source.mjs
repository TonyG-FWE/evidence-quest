import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

export const personalGrassFile='grass-patch-original-ad697d242cb5.glb';
const source='output/tripo-reference-batches-20260917/New 3D Objects Evidence Quest/grass 3d model_Clone1.glb';
const sha256='ad697d242cb5a5402829a13b0bc26d5b4aec88e4efa378691269286fd5d1a8a1';

/** Copy or serve these exact supplied bytes; never regenerate or recompress them. */
export async function readPersonalGrassSource(){
 const manifest=JSON.parse(await readFile('evidence/final-demo-20260918/review-assets.json','utf8'));
 const binding=manifest.bindings.find(b=>b.id==='grass-patch');
 if(manifest.profile!=='local-review'||binding?.source!==source||binding?.sourceSha256!==sha256||manifest.assets['grass-patch']?.sourceSha256!==sha256)throw Error('Personal grass source binding changed');
 const bytes=await readFile(source);
 if(createHash('sha256').update(bytes).digest('hex')!==sha256)throw Error('Personal grass original hash mismatch');
 return {bytes,receipt:{profile:'local-review-personal-grass',approval:'review',source,sha256,bytes:bytes.length,uri:'/review-assets/'+personalGrassFile,transformation:'Byte-identical original; outer placement transforms only; no paid operation'}};
}
