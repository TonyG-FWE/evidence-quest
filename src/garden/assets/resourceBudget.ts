import * as T from 'three';

/** Known retained asset allocations; browser/driver overhead is not measurable here. */
export function resourceAllocation(resources:Iterable<unknown>){
 const buffers=new Set<ArrayBufferLike>(),images=new Set<unknown>();let geometryBytes=0,textureBytes=0;
 const add=(array:ArrayBufferView)=>{if(!buffers.has(array.buffer)){buffers.add(array.buffer);geometryBytes+=array.buffer.byteLength;}};
 for(const resource of resources){
  if(resource instanceof T.BufferGeometry)for(const attribute of [...Object.values(resource.attributes),resource.index]){
   if(attribute instanceof T.InterleavedBufferAttribute)add(attribute.data.array);else if(attribute instanceof T.BufferAttribute)add(attribute.array);
  }
  if(resource instanceof T.Texture&&!images.has(resource.source)){
   images.add(resource.source);
   if(resource instanceof T.CompressedTexture)textureBytes+=resource.mipmaps.reduce((n,m)=>n+m.data.byteLength,0);
   else{const image=resource.image as {width?:number;height?:number}|undefined;textureBytes+=Math.ceil((image?.width??0)*(image?.height??0)*4*(resource.generateMipmaps?4/3:1));}
  }
 }
 return {geometryBytes,textureBytes,decodedBytes:geometryBytes+textureBytes};
}
