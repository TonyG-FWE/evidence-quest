import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {KTX2Loader} from 'three/addons/loaders/KTX2Loader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {VisualAssetLibrary,disposeAssetSource,type VisualAssetDefinition} from './visualAsset.js';
import {localReview,personalGrass} from './profile.js';
import {AssetWorkQueue} from './workQueue.js';

class LocalTextureLoader extends KTX2Loader {
 private localReady:Promise<void>|null=null;
 override init(){return this.localReady??=super.init().then(()=>{
  URL.revokeObjectURL(this.workerSourceURL);this.workerSourceURL='';
  this.workerPool.setWorkerCreator(()=>{const worker=new Worker('/garden-assets/basis/texture-worker.js'),binary=this.transcoderBinary!.slice(0);worker.postMessage({type:'init',config:this.workerConfig,transcoderBinary:binary},[binary]);return worker;});
 });}
}

/** A renderer owns its transcoder. Encoded bytes are bounded independently of live GPU leases. */
export function createRuntimeLibrary(renderer:T.WebGLRenderer){
 const ktx=new LocalTextureLoader().setTranscoderPath('/garden-assets/basis/').setWorkerLimit(2).detectSupport(renderer);
 const loader=new GLTFLoader().setKTX2Loader(ktx).setMeshoptDecoder(MeshoptDecoder);
 const cache=new Map<string,ArrayBuffer>(),pending=new Map<string,{abort:AbortController;promise:Promise<ArrayBuffer>}>(),prefetched=new Set<string>();let closed=false;
 const maxEncoded=12*1024*1024;
 const transfers=new AssetWorkQueue(4),decodes=new AssetWorkQueue(2);
 // This explicitly selected personal source is larger than the normal LRU.
 // Keep its verified original bytes once; report them and release on disposal.
 let personalOriginal:{key:string;bytes:ArrayBuffer}|null=null;
 const loadBytes=async(definition:VisualAssetDefinition):Promise<ArrayBuffer>=>{
  if(closed)throw Error('Asset library closed');if(definition.approval!=='approved'&&!localReview)throw Error('Unapproved artwork cannot be prefetched');
  const key=definition.uri+'#'+definition.sha256;if(personalOriginal?.key===key)return personalOriginal.bytes;
  const cached=cache.get(key);if(cached){cache.delete(key);cache.set(key,cached);return cached;}
  const existing=pending.get(key);if(existing)return existing.promise;
  const abort=new AbortController();
  const promise=(async()=>{const release=await transfers.acquire(45000);const timer=setTimeout(()=>abort.abort(),20000);try{
   if(closed)throw Error('Asset library closed');
   const response=await fetch(definition.uri,{signal:abort.signal});if(!response.ok)throw Error('Artwork response '+response.status);
   const bytes=await response.arrayBuffer();
   const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');
   if(digest!==definition.sha256)throw Error('Artwork hash differs from approved runtime manifest');
   if(closed)throw Error('Asset library closed');
   if(personalGrass&&definition.id==='grass-patch-original'&&definition.sha256==='ad697d242cb5a5402829a13b0bc26d5b4aec88e4efa378691269286fd5d1a8a1'&&bytes.byteLength===20422608)personalOriginal={key,bytes};
   else cache.set(key,bytes);
   while([...cache.values()].reduce((sum,v)=>sum+v.byteLength,0)>maxEncoded)cache.delete(cache.keys().next().value!);
   return bytes;
  }finally{clearTimeout(timer);release();}})().finally(()=>pending.delete(key));pending.set(key,{abort,promise});return promise;
 };
 const library=new VisualAssetLibrary(async(uri,definition)=>{
  const release=await decodes.acquire(45000);let parsingStarted=false;
  try{
  const bytes=await loadBytes(definition!);let expired=false,timer:ReturnType<typeof setTimeout>|undefined;
  const parsing=loader.parseAsync(bytes.slice(0),new URL('.',new URL(uri,location.href)).href).then(source=>{if(expired||closed){disposeAssetSource(source.scene);throw Error('Artwork decoding was interrupted');}return source;}).finally(release);parsingStarted=true;
  const source=await Promise.race([parsing,new Promise<never>((_,reject)=>{timer=setTimeout(()=>{expired=true;reject(Error('Artwork decoding took too long. Restore the view to retry.'));},45000);})]).finally(()=>clearTimeout(timer));
  let missing=false;source.scene.traverse(object=>{if(object instanceof T.Mesh)for(const material of Array.isArray(object.material)?object.material:[object.material])if(material instanceof T.MeshStandardMaterial&&!material.map)missing=true;});
  // GLTFLoader may resolve after a texture error. A white untextured character
  // must trigger the existing visible recovery flow, never count as ready.
  if(missing){disposeAssetSource(source.scene);throw Error('Approved painted textures did not load');}
  try{for(const sidecar of definition!.animations??[]){
   if(sidecar.sourceModelSha256!==definition!.sourceSha256)throw Error('Animation sidecar source binding differs');
   const bytes=await loadBytes({...definition!,uri:sidecar.uri,sha256:sidecar.sha256}),data=JSON.parse(new TextDecoder().decode(bytes)) as {sourceModelSha256:string;clips:T.AnimationClipJSON[]};
   if(data.sourceModelSha256!==definition!.sourceSha256)throw Error('Animation sidecar model hash differs');
   source.animations.push(...data.clips.map(clip=>T.AnimationClip.parse(clip)));
  }}catch(error){disposeAssetSource(source.scene);throw error;}
  return source;
  }catch(error){if(!parsingStarted)release();throw error;}
 },localReview);
 return {library,prefetch:(definition:VisualAssetDefinition)=>{if(prefetched.has(definition.sha256))return Promise.resolve();prefetched.add(definition.sha256);return loadBytes(definition).then(()=>{}).catch(error=>{prefetched.delete(definition.sha256);throw error;});},encodedBytes:()=>[...cache.values()].reduce((sum,v)=>sum+v.byteLength,personalOriginal?.bytes.byteLength??0),dispose(){closed=true;transfers.close();decodes.close();for(const request of pending.values())request.abort.abort();pending.clear();library.dispose();cache.clear();personalOriginal=null;prefetched.clear();ktx.dispose();}};
}
