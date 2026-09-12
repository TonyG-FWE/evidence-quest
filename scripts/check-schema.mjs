import {readFile} from 'node:fs/promises';
import Ajv2020 from 'ajv/dist/2020.js';
const root='docs/design/evidence-quest-design-v3/09-technical-contracts/';
const schema=JSON.parse(await readFile(root+'contracts.schema.json','utf8'));
const examples=JSON.parse(await readFile(root+'examples.json','utf8'));
const ajv=new Ajv2020({strict:true,allErrors:true,coerceTypes:false,useDefaults:false,removeAdditional:false});
ajv.addSchema(schema);
let checked=0;
for(const fixture of examples.cases) {
  const kind=fixture.payload?.contractKind;
  if(!kind || !schema.$defs[kind]) throw new Error(`Unrecognized example shape: ${fixture.id}`);
  const validate=ajv.compile({$ref:`${schema.$id}#/$defs/${kind}`});
  const valid=validate(fixture.payload);
  const expected=fixture.expectedSchema;
  if(typeof expected!=='boolean') throw new Error(`Missing schema expectation: ${fixture.id}`);
  if(valid!==expected) throw new Error(`${fixture.id}: ${JSON.stringify(validate.errors)}`);
  checked++;
}
console.log(`${checked} supplied schema expectations verified. Semantic checks are separate.`);
