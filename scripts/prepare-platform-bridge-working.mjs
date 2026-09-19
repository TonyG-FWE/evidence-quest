/** Working-copy preparation only. Never packages or edits runtime manifests. */
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {NodeIO} from '@gltf-transform/core';
import {readGlb} from './pilot-glb.mjs';
const source='output/tripo-reference-batches-20260917/New 3D Objects Evidence Quest/wooden+platform+3d+model.glb';
const expected='026121fdd2df8525b24b56d209c13da4e0c95d40f0d26711638cde3aaa41b915';
const factor=1.5738225086762518,output='output/screenshot-repairs-20260918/platform-bridge';
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const {bytes,json,bin}=await readGlb(source);if(hash(bytes)!==expected)throw Error('Original platform hash changed.');
const document=await new NodeIO().readBinary(bytes),primitive=document.getRoot().listMeshes()[0].listPrimitives()[0];
const position=primitive.getAttribute('POSITION').getArray(),indices=primitive.getIndices().getArray();
const parent=Array.from({length:position.length/3},(_,i)=>i),weld=new Map(),find=i=>parent[i]===i?i:(parent[i]=find(parent[i])),join=(a,b)=>parent[find(a)]=find(b);
for(let i=0;i<parent.length;i++){const key=[0,1,2].map(j=>Math.round(position[i*3+j]*1e5)).join(',');if(weld.has(key))join(i,weld.get(key));else weld.set(key,i);}
for(let i=0;i<indices.length;i+=3){join(indices[i],indices[i+1]);join(indices[i],indices[i+2]);}
const parts=new Map();for(let i=0;i<indices.length;i+=3){const root=find(indices[i]),part=parts.get(root)??{root,indices:[],min:[Infinity,Infinity,Infinity],max:[-Infinity,-Infinity,-Infinity]};for(const id of indices.slice(i,i+3)){part.indices.push(id);for(let j=0;j<3;j++){part.min[j]=Math.min(part.min[j],position[id*3+j]*factor);part.max[j]=Math.max(part.max[j],position[id*3+j]*factor);}}parts.set(root,part);}
await fs.mkdir(output,{recursive:true});
const componentBounds=[...parts.values()].map(p=>({root:p.root,triangles:p.indices.length/3,min:p.min,max:p.max}));
await fs.writeFile(`${output}/source-components.json`,JSON.stringify(componentBounds,null,2)+'\n');
if(process.argv.includes('--inspect')){console.log(JSON.stringify(componentBounds,null,2));process.exit(0);}
if(process.argv.includes('--socket-inspect')){for(const id of [917,2932,1362,2659]){const p=parts.get(id),top=[...new Set(p.indices)].map(i=>[position[i*3]*factor,position[i*3+1]*factor,position[i*3+2]*factor]).filter(v=>v[1]>p.max[1]-.015);console.log(JSON.stringify({root:id,top,x:[...new Set(top.map(v=>v[0]))].sort((a,b)=>a-b),z:[...new Set(top.map(v=>v[2]))].sort((a,b)=>a-b)}));}process.exit(0);}
const groups=[],assigned=new Set(),mapping=[];
const group=(name,roots,scale=[1,1,1],translation=[0,0,0])=>{
 for(const root of roots){if(!parts.has(root)||assigned.has(root))throw Error('Invalid/repeated component '+root);assigned.add(root);}
 const result={name,roots,scale,translation,indices:roots.flatMap(root=>parts.get(root).indices)};groups.push(result);return result;
};
const rimGap=(part,axis)=>{
 const values=[...new Set([...new Set(part.indices)].filter(i=>position[i*3+1]*factor>part.max[1]-.015).map(i=>position[i*3+axis]*factor))].sort((a,b)=>a-b);
 const gaps=values.slice(1).map((hi,i)=>({lo:values[i],hi,width:hi-values[i]})).sort((a,b)=>b.width-a.width);
 if(gaps[0].width<.045||gaps[0].width>.07)throw Error('Socket aperture identification failed');
 return {...gaps[0],center:(gaps[0].lo+gaps[0].hi)/2};
};
const sockets=[
 {name:'socket-right-positive',root:917,roots:[917,179,1074,1248,126,553],x:1,z:1},
 {name:'socket-left-positive',root:2932,roots:[2932,2188,3181,3006,2142,2968],x:-1,z:1},
 {name:'socket-right-negative',root:1362,roots:[1362,296,1450,1217,614],x:1,z:-1},
 {name:'socket-left-negative',root:2659,roots:[2659,3387,3512,3726,2099],x:-1,z:-1},
];
for(const socket of sockets){
 const part=parts.get(socket.root),x=rimGap(part,0),z=rimGap(part,2),target=[socket.x*.315,socket.z*.62],delta=[target[0]-x.center,0,target[1]-z.center];
 group(socket.name,socket.roots,[1,1,1],delta);
 mapping.push({kind:'complete socket, shoe, underfoot and hardware',name:socket.name,roots:socket.roots,holeCenterBefore:[x.center,z.center],holeCenterAfter:target,normalizedTranslation:delta,rawTranslation:delta.map(v=>v/factor),normalizedAperture:[x.width,z.width],worldApertureAtYaw:[z.width*1.25,x.width*1.42],normalizedRimTop:part.max[1],worldRimAboveRoot:part.max[1]*.4+.03});
}
for(const spec of [{root:2815,bolts:[642,2584],sign:1},{root:2911,bolts:[683,2548],sign:-1}]){
 const part=parts.get(spec.root),inner=spec.sign>0?part.min[2]:part.max[2],outer=spec.sign>0?part.max[2]:part.min[2];
 const scale=[.558/(part.max[0]-part.min[0]),1,(spec.sign*.62-inner)/(outer-inner)];
 const translation=[-(part.max[0]+part.min[0])/2*scale[0],0,inner*(1-scale[2])];
 group('end-plank-'+(spec.sign>0?'positive':'negative'),[spec.root],scale,translation);
 mapping.push({kind:'end walking plank',root:spec.root,normalizedWidthBefore:part.max[0]-part.min[0],normalizedWidthAfter:.558,worldWidthAfter:.558*1.42,innerEdge:inner,outerBefore:outer,outerAfter:spec.sign*.62,nodeScale:scale,normalizedTranslation:translation});
 for(const root of spec.bolts){const bolt=parts.get(root),center=bolt.min.map((v,i)=>(v+bolt.max[i])/2),delta=center.map((v,i)=>v*scale[i]+translation[i]-v);group('end-plank-bolt-'+root,[root],[1,1,1],delta);mapping.push({kind:'end plank bolt',root,shapePreserved:true,normalizedTranslation:delta});}
}
// The existing lower frame ends at the same committed span boundary. It stays
// below all six boards and uses its original vertices, normals and UVs.
const frame=parts.get(2194),frameZScale=1.24/(frame.max[2]-frame.min[2]),frameTranslation=[0,0,-(frame.max[2]+frame.min[2])/2*frameZScale];
group('underframe',[2194],[1,1,frameZScale],frameTranslation);
mapping.push({kind:'lower frame',root:2194,normalizedSpanBefore:[frame.min[2],frame.max[2]],normalizedSpanAfter:[-.62,.62],nodeScale:[1,1,frameZScale]});
group('unchanged-middle-planks-and-details',[...parts.keys()].filter(root=>!assigned.has(root)));
if(assigned.size!==parts.size)throw Error('Missing source components');
if(json.meshes.length!==1||json.meshes[0].primitives.length!==1)throw Error('Unexpected source mesh schema');
const originalPrimitive=json.meshes[0].primitives[0],owner=json.nodes.find(node=>node.mesh===0);
if(!owner||json.nodes.filter(node=>node.mesh===0).length!==1)throw Error('Unexpected source mesh instancing');
const chunks=[bin],meshes=[];let byteLength=bin.length;
for(const item of groups){
 const padding=(4-byteLength%4)%4;if(padding){chunks.push(Buffer.alloc(padding));byteLength+=padding;}
 const array=new Uint32Array(item.indices),chunk=Buffer.from(array.buffer),view=json.bufferViews.length;json.bufferViews.push({buffer:0,byteOffset:byteLength,byteLength:chunk.length,target:34963});chunks.push(chunk);byteLength+=chunk.length;
 const accessor=json.accessors.length;json.accessors.push({bufferView:view,componentType:5125,count:array.length,type:'SCALAR',min:[Math.min(...array)],max:[Math.max(...array)]});
 const mesh=meshes.length;meshes.push({name:item.name,primitives:[{...structuredClone(originalPrimitive),indices:accessor}]});
 const node=json.nodes.length;json.nodes.push({name:item.name,mesh,translation:item.translation.map(v=>v/factor),scale:item.scale});(owner.children??=[]).push(node);
}
delete owner.mesh;json.meshes=meshes;json.buffers[0].byteLength=byteLength;
const binary=Buffer.concat(chunks),text=Buffer.from(JSON.stringify(json)),jsonBytes=Buffer.concat([text,Buffer.alloc((4-text.length%4)%4,32)]),binaryBytes=Buffer.concat([binary,Buffer.alloc((4-binary.length%4)%4)]),glb=Buffer.alloc(28+jsonBytes.length+binaryBytes.length);
glb.writeUInt32LE(0x46546c67,0);glb.writeUInt32LE(2,4);glb.writeUInt32LE(glb.length,8);glb.writeUInt32LE(jsonBytes.length,12);glb.writeUInt32LE(0x4e4f534a,16);jsonBytes.copy(glb,20);glb.writeUInt32LE(binaryBytes.length,20+jsonBytes.length);glb.writeUInt32LE(0x004e4942,24+jsonBytes.length);binaryBytes.copy(glb,28+jsonBytes.length);
const verified=await new NodeIO().readBinary(glb),accessorSignature=p=>p.listSemantics().sort().map(name=>{const a=p.getAttribute(name),v=a.getArray();return [name,a.getType(),a.getCount(),hash(Buffer.from(v.buffer,v.byteOffset,v.byteLength))];}),originalSignature=JSON.stringify(accessorSignature(primitive));
const attributesPreserved=verified.getRoot().listMeshes().every(mesh=>mesh.listPrimitives().every(p=>JSON.stringify(accessorSignature(p))===originalSignature));
const originalTriangleCount=indices.length/3,outputTriangles=groups.reduce((sum,g)=>sum+g.indices.length/3,0),allTrianglesPreserved=outputTriangles===originalTriangleCount&&assigned.size===parts.size;
if(!attributesPreserved||!allTrianglesPreserved||hash(binary.subarray(0,bin.length))!==hash(bin))throw Error('Source preservation check failed');
const outputFile=`${output}/platform-fitted-planks.glb`;await fs.writeFile(outputFile,glb);
const result={createdAt:new Date().toISOString(),source,sourceSha256:expected,output:outputFile,outputSha256:hash(glb),normalizationScale:factor,coordinateFrames:{raw:'Original supplied GLB, source attributes unchanged',normalized:'Raw positions and component-node translations multiplied uniformly by normalizationScale, before yaw',runtime:{outerScale:[1.42,.4,1.25],yaw:Math.PI/2,outerOffsetY:.03}},sourceTriangles:originalTriangleCount,outputTriangles,componentCount:parts.size,renderGroups:groups.length,method:'Preserve complete original binary data; partition existing component triangle indices only. Outer node transforms fit complete corner assemblies, two end boards and four bolt translations. The lower frame ends at the shared span boundary. No source attribute, normal, UV, material or texture edits.',mapping,componentBounds,sourceBinarySha256:hash(bin),originalBinaryPrefixPreserved:true,attributesPreserved,allTrianglesPreserved,sourceUnchanged:hash(await fs.readFile(source))===expected,noGenerationOrPaidProcessing:true};
await fs.writeFile(`${output}/provenance.json`,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({...result,componentBounds:undefined},null,2));
