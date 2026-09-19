import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import Ajv2020 from 'ajv/dist/2020.js';
import standaloneCode from 'ajv/dist/standalone/index.js';
import {extendExperience} from './er13-schema.mjs';

const source='docs/design/evidence-quest-design-v3/09-technical-contracts/contracts.schema.json';
const schema=extendExperience(JSON.parse(await readFile(source,'utf8')));
await mkdir('contracts/generated',{recursive:true});
await writeFile('contracts/contracts.schema.json',JSON.stringify(schema,null,2)+'\n');
const ajv=new Ajv2020({strict:true,allErrors:true,inlineRefs:false,coerceTypes:false,useDefaults:false,removeAdditional:false,code:{source:true,esm:true,lines:true}});
ajv.addSchema(schema);
const roots=['AuthoredContent','CaseSnapshot','SaveEnvelope','Preferences','CoachRequest','CoachResponse','Session','ModelProposal'];
const exports={};
for (const name of roots) {
  const id=`urn:evidence-quest:${name}`;
  ajv.addSchema({$id:id,$ref:`${schema.$id}#/$defs/${name}`});
  exports[`validate${name}`]=id;
}
let generated=standaloneCode(ajv,exports);
const imports=[];
for(const specifier of new Set([...generated.matchAll(/require\("([^\"]+)"\)/g)].map(m=>m[1]))) {
  if(!specifier.startsWith('ajv/dist/runtime/'))throw new Error(`Review unexpected validator runtime: ${specifier}`);
  const name=`ajvRuntime${imports.length}`;
  imports.push(`import ${name} from '${specifier}.js';`);
  // Node exposes Ajv's CJS {default: fn}; a browser bundler may unwrap it to
  // fn. Normalize only the generated .default function reference, keeping the
  // same upstream Unicode-length implementation in both environments.
  if(generated.includes(`require("${specifier}").default`)){
    imports.push(`const ${name}Function = typeof ${name} === 'function' ? ${name} : ${name}.default;`);
    generated=generated.replaceAll(`require("${specifier}").default`,`${name}Function`);
  }
  generated=generated.replaceAll(`require("${specifier}")`,name);
}
await writeFile('contracts/generated/validators.mjs',imports.join('\n')+'\n'+generated+'\n');
await writeFile('contracts/generated/validators.d.mts',"import type { ValidateFunction } from 'ajv';\n"+`import type { ${roots.join(', ')} } from '../types.js';\n`+roots.map(n=>`export const validate${n}: ValidateFunction<${n}>;`).join('\n')+'\n');
function type(s) {
  if (s.$ref) return s.$ref.split('/').at(-1);
  if ('const' in s) return JSON.stringify(s.const);
  if (s.enum) return s.enum.map(v=>JSON.stringify(v)).join(' | ');
  if (s.oneOf||s.anyOf) return (s.oneOf||s.anyOf).map(v=>`(${type(v)})`).join(' | ');
  if (s.type==='object') return '{ '+Object.entries(s.properties??{}).map(([k,v])=>`${JSON.stringify(k)}${s.required?.includes(k)?'':'?'}: ${type(v)};`).join(' ')+' }';
  if (s.type==='array') {
    if(s.prefixItems) return '['+s.prefixItems.map(type).join(', ')+']';
    return `Array<${type(s.items??{})}>`;
  }
  return ({string:'string',number:'number',integer:'number',boolean:'boolean',null:'null'})[s.type]??'unknown';
}
await writeFile('contracts/types.ts','// Generated from the authoritative closed JSON schema. Do not edit.\n'+Object.entries(schema.$defs).map(([n,s])=>`export type ${n} = ${type(s)};`).join('\n')+'\n');
console.log(`Generated ${Object.keys(schema.$defs).length} schema-linked types and ${roots.length} standalone validators.`);
