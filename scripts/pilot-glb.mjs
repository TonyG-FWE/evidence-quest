import fs from 'node:fs/promises';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
export async function readGlb(file){const bytes=await fs.readFile(file),length=bytes.readUInt32LE(12);return {bytes,json:JSON.parse(bytes.toString('utf8',20,20+length)),bin:bytes.subarray(28+length)};}
export async function loadPilotGeometry(file){
 const {bytes,json}=await readGlb(file),length=bytes.readUInt32LE(12),doc=structuredClone(json);
 delete doc.images;delete doc.textures;doc.materials=(json.materials??[]).map(material=>({name:material.name,doubleSided:material.doubleSided}));
 const text=Buffer.from(JSON.stringify(doc)),padded=Buffer.concat([text,Buffer.alloc((4-text.length%4)%4,32)]),tail=bytes.subarray(20+length),buffer=Buffer.alloc(20+padded.length+tail.length);
 bytes.copy(buffer,0,0,12);buffer.writeUInt32LE(buffer.length,8);buffer.writeUInt32LE(padded.length,12);buffer.writeUInt32LE(0x4e4f534a,16);padded.copy(buffer,20);tail.copy(buffer,20+padded.length);
 return new GLTFLoader().parseAsync(buffer.buffer.slice(buffer.byteOffset,buffer.byteOffset+buffer.byteLength),'');
}
