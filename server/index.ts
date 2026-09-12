import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root=resolve(fileURLToPath(new URL('../../',import.meta.url)));
const staticRoot=resolve(root,'dist/client');
const host=process.env['HOST']??'127.0.0.1';
const port=Number(process.env['PORT']??8787);
if((process.env['COACH_MODE']??'authored')!=='authored') throw new Error('This connected build is authorized for authored operation only.');
const allowedOrigins=new Set([`http://${host}:${port}`, process.env['PUBLIC_ORIGIN']??'http://127.0.0.1:5173']);
const mime:Record<string,string>={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2'};
const server=createServer(async(req,res)=>{
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','no-referrer');
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'");
  const json=(status:number,data:unknown)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
  try{
    if(req.headers.host!==`${host}:${port}` && req.headers.host!==`localhost:${port}`) {json(400,{error:'Invalid host'});return;}
    const path=new URL(req.url??'/',`http://${host}:${port}`).pathname;
    if(path==='/healthz'){json(200,{status:'ok',mode:'authored'});return;}
    if(path==='/api/config' && req.method==='GET') {json(200,{caseId:'sparkfest-little-bridge-001',contentVersion:3,contentRevision:1,coachContractVersion:1,mode:'authored',liveAvailable:false});return;}
    if(path==='/api/coach') {
      if(req.method!=='POST') {json(405,{error:'Method not allowed'});return;}
      if(!req.headers.origin || !allowedOrigins.has(req.headers.origin) || !req.headers['content-type']?.startsWith('application/json')) {json(403,{error:'Request not allowed'});return;}
      let size=0;
      for await(const chunk of req){size+=Buffer.byteLength(chunk);if(size>32768){json(413,{error:'Request too large'});return;}}
      json(503,{status:'unavailable',mode:'authored'});return;
    }
    if(req.method!=='GET' && req.method!=='HEAD'){json(405,{error:'Method not allowed'});return;}
    const candidate=resolve(staticRoot,'.'+decodeURIComponent(path==='/'?'/index.html':path));
    if(!candidate.startsWith(staticRoot+sep)){json(403,{error:'Path not allowed'});return;}
    const info=await stat(candidate);
    if(!info.isFile()){json(404,{error:'Not found'});return;}
    const bytes=await readFile(candidate);
    res.writeHead(200,{'Content-Type':mime[extname(candidate)]??'application/octet-stream','Cache-Control':path.startsWith('/assets/')?'public, max-age=31536000, immutable':'no-cache'});
    res.end(req.method==='HEAD'?undefined:bytes);
  }catch(error){json((error as NodeJS.ErrnoException).code==='ENOENT'?404:500,{error:'Resource unavailable'});}
});
server.on('error',error=>{console.error(error.message);process.exitCode=1;});
server.listen(port,host,()=>console.log(`Evidence Quest authored server http://${host}:${port}`));
