import {mkdir,copyFile} from 'node:fs/promises';
await mkdir('dist/contracts/generated',{recursive:true});
await copyFile('contracts/generated/validators.mjs','dist/contracts/generated/validators.mjs');
