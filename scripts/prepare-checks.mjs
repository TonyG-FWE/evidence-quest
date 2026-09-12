import {mkdir,copyFile} from 'node:fs/promises';
await mkdir('.cache/checks/contracts/generated',{recursive:true});
await copyFile('contracts/generated/validators.mjs','.cache/checks/contracts/generated/validators.mjs');
