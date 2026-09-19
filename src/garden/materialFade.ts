import type {Material} from 'three';

const originals=new WeakMap<Material,{opacity:number;transparent:boolean;depthWrite:boolean}>();

/** Preserve authored alpha while returning solid scenery to the opaque pass. */
export function setMaterialFade(material:Material,factor:number,depthWrite=true){
 let source=originals.get(material);
 if(!source){source={opacity:material.opacity,transparent:material.transparent,depthWrite:material.depthWrite};originals.set(material,source);}
 const transparent=source.transparent||factor<1;
 // Changing transparency changes the shader/render queue; uniform-only fading
 // must not request a new program on every frame.
 if(material.transparent!==transparent){material.transparent=transparent;material.needsUpdate=true;}
 material.opacity=source.opacity*factor;
 material.depthWrite=source.depthWrite&&depthWrite;
}
