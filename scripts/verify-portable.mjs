import path from 'node:path';
import fs from 'node:fs/promises';
import {verifyPortable} from './portable-common.mjs';
const directory=process.argv[2]??JSON.parse(await fs.readFile('output/portable/latest-'+process.platform+'-'+process.arch+'.json','utf8')).directory;
const manifest=await verifyPortable(path.resolve(directory));
console.log(JSON.stringify({status:'PORTABLE_BYTES_VERIFIED',target:manifest.target,commit:manifest.commit,files:manifest.files.length}));
