import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('evidence/hands-on-20260916'),three=path.resolve('node_modules/three');
const inside=(base,file)=>file.startsWith(base+path.sep);
const types={html:'text/html; charset=utf-8',js:'text/javascript; charset=utf-8',json:'application/json',glb:'model/gltf-binary',png:'image/png',webp:'image/webp',webm:'video/webm'};
http.createServer(async(req,res)=>{
 if(req.method!=='GET'){res.writeHead(405).end();return;}
 try{
  const name=decodeURIComponent(new URL(req.url,'http://127.0.0.1:4318').pathname),safeName=name==='/'?'/pilot/model-review.html':name;
  let file;
  if(safeName.startsWith('/vendor/')){file=path.resolve(three,safeName.slice(8));if(!inside(three,file)||!file.endsWith('.js'))throw Error('Not permitted');}
  else{file=path.resolve(root,'.'+safeName);if(!inside(root,file)||(!safeName.startsWith('/pilot/')&&!/^\/references\/(pip|grandma|lantern-flower|seed-boat)\.png$/.test(safeName)))throw Error('Not permitted');}
  const extension=path.extname(file).slice(1);if(!types[extension])throw Error('Not permitted');
  const body=await fs.readFile(file);res.writeHead(200,{'Content-Type':types[extension],'Content-Length':body.length,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(body);
 }catch{res.writeHead(404).end('Not found');}
}).listen(4318,'127.0.0.1',()=>console.log('Pilot model review: http://127.0.0.1:4318/'));
