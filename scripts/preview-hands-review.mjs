import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const directory=path.resolve('evidence/hands-on-20260916');
const allowed=new Set(['review.html','orientation-map.svg','floor-plan.svg','reflected-canopy.svg','openings.html','references/pip.png','references/grandma.png','references/lantern-flower.png','references/seed-boat.png']);
for(const name of ['before-after.html','demonstration/before.png','demonstration/overview.png','demonstration/crossing.png','demonstration/dock.png','demonstration/workbench.png'])allowed.add(name);
const types={html:'text/html; charset=utf-8',svg:'image/svg+xml',png:'image/png'};
http.createServer(async(request,response)=>{
 const name=new URL(request.url,'http://127.0.0.1:4317').pathname.slice(1)||'review.html';
 if(request.method!=='GET'||!allowed.has(name)){response.writeHead(404);response.end();return;}
 try{const body=await readFile(path.join(directory,name));response.writeHead(200,{'Content-Type':types[name.split('.').at(-1)],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});response.end(body);}catch{response.writeHead(404);response.end();}
}).listen(4317,'127.0.0.1',()=>console.log('Evidence Quest layout/reference review: http://127.0.0.1:4317/'));
