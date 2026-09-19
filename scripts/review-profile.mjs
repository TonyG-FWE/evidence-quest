/** Explicit local profile; never changes approval records or the default export. */
import {spawn} from 'node:child_process';
import path from 'node:path';
const operation=process.argv[2],commands={dev:['node_modules/vite/bin/vite.js'],build:['node_modules/npm/bin/npm-cli.js','run','build'],start:['dist/server/index.js']};
if(!(operation in commands))throw Error('Expected dev, build or start');
// npm is supplied alongside the project Node runtime on Windows.
const args=operation==='build'?[process.env.npm_execpath??path.join(path.dirname(process.execPath),'node_modules/npm/bin/npm-cli.js'),'run','build']:commands[operation];
const child=spawn(process.execPath,[...args,...process.argv.slice(3)],{stdio:'inherit',windowsHide:true,env:{...process.env,EQ_ASSET_PROFILE:'review'}});
child.on('error',error=>{console.error(error);process.exitCode=1;});child.on('exit',code=>{process.exitCode=code??1;});
