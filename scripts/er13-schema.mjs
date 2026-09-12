// 2026-09-12 ER13 addendum. Original imported schema remains byte-for-byte intact.
export function extendExperience(schema) {
 const text={type:'string',maxLength:160};
 const list=items=>({type:'array',items,maxItems:512,uniqueItems:true});
 const properties={version:{const:1},introBeat:{type:'integer',minimum:0,maximum:4},introDismissed:{type:'boolean'},legacyOffer:{type:'boolean'},npcIntroductions:list({enum:['ACT.JO','ACT.REMY','ACT.ARI']}),narratorCard:{anyOf:[{enum:['READ.WELCOME','READ.PROMISE','READ.ENDING']},{type:'null'}]},narratorPauses:{type:'boolean'},phrases:{type:'boolean'},wordContexts:list(text),supports:list(text)};
 schema.$defs.Experience={type:'object',properties,required:Object.keys(properties),additionalProperties:false};
 schema.$defs.CaseState.properties.experience={$ref:'#/$defs/Experience'};
 // TASK11.17 scope extension: only optional persistence needed by the existing tools.
 const nullableUuid={anyOf:[schema.$defs.Record.properties.id,{type:'null'}]};
 const reasoning={privateRevisionOf:nullableUuid,comparisonRevisionOf:nullableUuid,leadDestination:{anyOf:[{enum:['SC.ST','SC.CY','SC.WK','SC.MD']},{type:'null'}]}};
 schema.$defs.Reasoning={type:'object',properties:reasoning,required:Object.keys(reasoning),additionalProperties:false};
 schema.$defs.CaseState.properties.reasoning={$ref:'#/$defs/Reasoning'};
 schema.$defs.Observation.properties.kind.enum.push('reading-model-played','reading-practice-requested','reading-self-reported','word-looked-up','supplied-support');
 return schema;
}
