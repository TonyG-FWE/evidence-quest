import {readFile,writeFile} from 'node:fs/promises';
import {decodePng} from './image-codec.mjs';
const record=JSON.parse(await readFile(process.argv[2],'utf8')),entries=[];
for(const asset of record.assets.slice(-Number(process.argv[3]??9))){
 const info=decodePng(await readFile(asset.deliveryPath)),data=info.data;let zero=0,nearOpaque=0;
 for(let i=3;i<data.length;i+=4){if(data[i]===0)zero++;if(data[i]>=250)nearOpaque++;}
 const at=(x,y)=>[...data.subarray((y*info.width+x)*4,(y*info.width+x)*4+4)];
 const corners=[[0,0],[info.width-1,0],[0,info.height-1],[info.width-1,info.height-1]].map(([x,y])=>({x,y,rgba:at(x,y)}));
 entries.push({name:asset.name,width:info.width,height:info.height,transparentFraction:zero/(info.width*info.height),nearOpaqueFraction:nearOpaque/(info.width*info.height),corners});
}
await writeFile('evidence/er13/incoming-alpha-inspection.json',JSON.stringify({checkedAt:new Date().toISOString(),entries},null,2)+'\n');console.log(JSON.stringify(entries));
