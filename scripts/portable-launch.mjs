import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
import {once} from 'node:events';
import {spawn} from 'node:child_process';
import {verifyPortable,portableEnvironment} from './portable-common.mjs';

const root=path.dirname(fileURLToPath(import.meta.url));
const args=process.argv.slice(2);
try{
 if(args.some(arg=>!['--no-open','--verify'].includes(arg)))throw Error('Unknown launcher option');
 console.log('Checking Evidence Quest files…');
 await verifyPortable(root);
 if(args.includes('--verify')){console.log('Portable package verified.');}
 else{
  const env=portableEnvironment(process.env);for(const key of Object.keys(process.env))delete process.env[key];Object.assign(process.env,env);
  process.chdir(root);
  const application=await import(pathToFileURL(path.join(root,'dist/server/index.js')).href);
  if(application.startupError)throw application.startupError;
  const {server}=application;
  if(!server.listening)await once(server,'listening');
  const url='http://127.0.0.1:4364/garden';
  console.log('Ready: '+url+'\nKeep this window open. Press Ctrl+C to stop the game.');
  for(const signal of ['SIGINT','SIGTERM'])process.once(signal,()=>{server.closeAllConnections();server.close(()=>process.exit(0));});
  if(!args.includes('--no-open')){
   const command=process.platform==='win32'?[path.join(process.env.SystemRoot??'C:\\Windows','System32','cmd.exe'),['/d','/c','start','',url]]:process.platform==='darwin'?['/usr/bin/open',[url]]:['xdg-open',[url]];
   const browser=spawn(command[0],command[1],{stdio:'ignore',windowsHide:true});
   browser.on('error',()=>console.log('Open this address in your browser: '+url));
   browser.on('exit',code=>{if(code)console.log('Open this address in your browser: '+url);});
   browser.unref();
  }
 }
}catch(error){
 console.error(error.code==='EADDRINUSE'?'Port 4364 is already in use. Close your other Evidence Quest session, then try again. No process was stopped.':error.message);
 process.exitCode=1;
}
