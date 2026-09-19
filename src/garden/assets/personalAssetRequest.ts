import * as T from 'three';

/** Bound network and decoding work, including a decoder that never settles. */
export async function boundedPersonalRequest<T>(uri:string,owner:AbortSignal,operation:(signal:AbortSignal)=>Promise<T>,deadlineMs=20000):Promise<T>{
 const controller=new AbortController(),abort=()=>controller.abort(owner.reason??Error('Personal artwork was released'));
 let rejectAbort:(reason:unknown)=>void=()=>{};
 const stopped=new Promise<never>((_,reject)=>{rejectAbort=reject;});
 const reject=()=>rejectAbort(controller.signal.reason??Error('Personal artwork was released'));
 controller.signal.addEventListener('abort',reject,{once:true});owner.addEventListener('abort',abort,{once:true});
 const timer=setTimeout(()=>controller.abort(Error('Personal artwork took too long to load or decode: '+uri)),deadlineMs);
 if(owner.aborted)abort();
 try{return await Promise.race([(async()=>{controller.signal.throwIfAborted();const value=await operation(controller.signal);controller.signal.throwIfAborted();return value;})(),stopped]);}
 finally{clearTimeout(timer);owner.removeEventListener('abort',abort);controller.signal.removeEventListener('abort',reject);}
}

/** Decode original image bytes at native resolution using ordinary Texture defaults. */
export function loadPersonalTexture(uri:string,owner:AbortSignal):Promise<T.Texture>{
 return boundedPersonalRequest(uri,owner,async signal=>{
  const response=await fetch(uri,{signal});if(!response.ok)throw Error('Personal texture HTTP '+response.status+': '+uri);
  const bytes=await response.blob();signal.throwIfAborted();
  const image=new Image(),objectUrl=URL.createObjectURL(bytes);let complete=false,revoked=false;
  const revoke=()=>{if(!revoked){revoked=true;URL.revokeObjectURL(objectUrl);}};
  const abort=()=>{image.removeAttribute('src');revoke();};signal.addEventListener('abort',abort,{once:true});
  try{image.src=objectUrl;await image.decode();signal.throwIfAborted();const texture=new T.Texture(image);texture.needsUpdate=true;complete=true;return texture;}
  catch(error){if(signal.aborted)throw signal.reason;throw Error('Personal texture could not decode: '+uri,{cause:error});}
  finally{signal.removeEventListener('abort',abort);if(!complete)image.removeAttribute('src');revoke();}
 });
}
