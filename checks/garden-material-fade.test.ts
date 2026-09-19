import test from 'node:test';
import assert from 'node:assert/strict';
import {MeshStandardMaterial} from 'three';
import {setMaterialFade} from '../src/garden/materialFade.js';

test('solid scenery enters blending only for its fade and restores the opaque pass',()=>{
 const material=new MeshStandardMaterial({color:'#849b72',roughness:.92,metalness:0,flatShading:true}),color=material.color.clone();
 setMaterialFade(material,1);assert.equal(material.transparent,false);assert.equal(material.version,0);
 setMaterialFade(material,.5,false);assert.equal(material.transparent,true);assert.equal(material.opacity,.5);assert.equal(material.depthWrite,false);assert.equal(material.version,1);
 for(const factor of [.4,.3,.5,.8,.99])setMaterialFade(material,factor,false);
 assert.equal(material.version,1);setMaterialFade(material,1);assert.equal(material.transparent,false);assert.equal(material.opacity,1);assert.equal(material.depthWrite,true);assert.equal(material.version,2);assert.ok(material.color.equals(color));assert.equal(material.roughness,.92);material.dispose();
});

test('authored transparency, alpha test and depth policy survive temporary occlusion',()=>{
 const material=new MeshStandardMaterial({transparent:true,opacity:.7,alphaTest:.12,depthWrite:false}),source=material.clone(),version=material.version;
 setMaterialFade(material,.2,false);assert.ok(Math.abs(material.opacity-.14)<1e-12);setMaterialFade(material,1);assert.equal(material.transparent,true);assert.equal(material.opacity,.7);assert.equal(material.alphaTest,.12);assert.equal(material.depthWrite,false);assert.equal(material.version,version);assert.equal(source.opacity,.7);material.dispose();source.dispose();
});
