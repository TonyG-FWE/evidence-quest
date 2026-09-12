import ajvRuntime0 from 'ajv/dist/runtime/ucs2length.js';
import ajvRuntime1 from 'ajv/dist/runtime/equal.js';
"use strict";
export const validateAuthoredContent = validate52;
const schema19 = {"$id":"urn:evidence-quest:AuthoredContent","$ref":"https://evidence-quest.invalid/contracts/v1#/$defs/AuthoredContent"};
const schema21 = {"type":"object","properties":{"contractKind":{"const":"AuthoredContent"},"identity":{"$ref":"#/$defs/Identity"},"completeness":{"type":"string","enum":["full","example-fragment"]},"rooms":{"type":"array","items":{"$ref":"#/$defs/Room"},"maxItems":4},"objects":{"type":"array","items":{"$ref":"#/$defs/Object"},"maxItems":256},"actors":{"type":"array","items":{"$ref":"#/$defs/Actor"},"maxItems":5},"doors":{"type":"array","items":{"$ref":"#/$defs/Door"},"maxItems":8},"sources":{"type":"array","items":{"$ref":"#/$defs/Source"},"maxItems":9},"copies":{"type":"array","items":{"$ref":"#/$defs/Copy"},"maxItems":64},"accesses":{"type":"array","items":{"$ref":"#/$defs/Access"},"maxItems":256},"texts":{"type":"array","items":{"$ref":"#/$defs/TextEntry"},"maxItems":1024},"npcBranches":{"type":"array","items":{"$ref":"#/$defs/NpcBranch"},"maxItems":128},"tiles":{"type":"array","items":{"$ref":"#/$defs/Tile"},"maxItems":4},"coachingMoves":{"type":"array","items":{"$ref":"#/$defs/CoachMove"},"maxItems":64},"assetUses":{"type":"array","items":{"$ref":"#/$defs/AssetUse"},"maxItems":512}},"required":["contractKind","identity","completeness","rooms","objects","actors","doors","sources","copies","accesses","texts","npcBranches","tiles","coachingMoves","assetUses"],"additionalProperties":false};
const func1 = Object.prototype.hasOwnProperty;
const schema22 = {"type":"object","properties":{"caseId":{"const":"sparkfest-little-bridge-001"},"contentVersion":{"const":3},"contentRevision":{"const":1}},"required":["caseId","contentVersion","contentRevision"],"additionalProperties":false};

function validate55(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate55.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.caseId === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "caseId"},message:"must have required property '"+"caseId"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.contentVersion === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "contentVersion"},message:"must have required property '"+"contentVersion"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.contentRevision === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "contentRevision"},message:"must have required property '"+"contentRevision"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
for(const key0 in data){
if(!(((key0 === "caseId") || (key0 === "contentVersion")) || (key0 === "contentRevision"))){
const err3 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
if(data.caseId !== undefined){
if("sparkfest-little-bridge-001" !== data.caseId){
const err4 = {instancePath:instancePath+"/caseId",schemaPath:"#/properties/caseId/const",keyword:"const",params:{allowedValue: "sparkfest-little-bridge-001"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data.contentVersion !== undefined){
if(3 !== data.contentVersion){
const err5 = {instancePath:instancePath+"/contentVersion",schemaPath:"#/properties/contentVersion/const",keyword:"const",params:{allowedValue: 3},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
if(data.contentRevision !== undefined){
if(1 !== data.contentRevision){
const err6 = {instancePath:instancePath+"/contentRevision",schemaPath:"#/properties/contentRevision/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
}
else {
const err7 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
validate55.errors = vErrors;
return errors === 0;
}
validate55.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema23 = {"type":"object","properties":{"id":{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]},"floor":{"$ref":"#/$defs/Rect"},"initialArrival":{"$ref":"#/$defs/Point"},"obstacles":{"type":"array","items":{"type":"object","properties":{"ownerId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"rect":{"$ref":"#/$defs/Rect"}},"required":["ownerId","rect"],"additionalProperties":false},"maxItems":32},"descriptionCt":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160}},"required":["id","floor","initialArrival","obstacles","descriptionCt"],"additionalProperties":false};
const schema24 = {"type":"array","prefixItems":[{"type":"number"},{"type":"number"},{"type":"number"},{"type":"number"}],"items":false,"minItems":4,"maxItems":4};

function validate58(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate58.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(Array.isArray(data)){
if(data.length > 4){
const err0 = {instancePath,schemaPath:"#/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.length < 4){
const err1 = {instancePath,schemaPath:"#/minItems",keyword:"minItems",params:{limit: 4},message:"must NOT have fewer than 4 items"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
const len0 = data.length;
if(len0 > 0){
let data0 = data[0];
if(!((typeof data0 == "number") && (isFinite(data0)))){
const err2 = {instancePath:instancePath+"/0",schemaPath:"#/prefixItems/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
if(len0 > 1){
let data1 = data[1];
if(!((typeof data1 == "number") && (isFinite(data1)))){
const err3 = {instancePath:instancePath+"/1",schemaPath:"#/prefixItems/1/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
if(len0 > 2){
let data2 = data[2];
if(!((typeof data2 == "number") && (isFinite(data2)))){
const err4 = {instancePath:instancePath+"/2",schemaPath:"#/prefixItems/2/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(len0 > 3){
let data3 = data[3];
if(!((typeof data3 == "number") && (isFinite(data3)))){
const err5 = {instancePath:instancePath+"/3",schemaPath:"#/prefixItems/3/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
const len1 = data.length;
if(!(len1 <= 4)){
const err6 = {instancePath,schemaPath:"#/items",keyword:"items",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
else {
const err7 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
validate58.errors = vErrors;
return errors === 0;
}
validate58.evaluated = {"items":true,"dynamicProps":false,"dynamicItems":false};

const schema25 = {"type":"array","prefixItems":[{"type":"number","minimum":0,"maximum":120},{"type":"number","minimum":0,"maximum":80}],"items":false,"minItems":2,"maxItems":2};

function validate60(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate60.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(Array.isArray(data)){
if(data.length > 2){
const err0 = {instancePath,schemaPath:"#/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.length < 2){
const err1 = {instancePath,schemaPath:"#/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
const len0 = data.length;
if(len0 > 0){
let data0 = data[0];
if((typeof data0 == "number") && (isFinite(data0))){
if(data0 > 120 || isNaN(data0)){
const err2 = {instancePath:instancePath+"/0",schemaPath:"#/prefixItems/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 120},message:"must be <= 120"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data0 < 0 || isNaN(data0)){
const err3 = {instancePath:instancePath+"/0",schemaPath:"#/prefixItems/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
else {
const err4 = {instancePath:instancePath+"/0",schemaPath:"#/prefixItems/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(len0 > 1){
let data1 = data[1];
if((typeof data1 == "number") && (isFinite(data1))){
if(data1 > 80 || isNaN(data1)){
const err5 = {instancePath:instancePath+"/1",schemaPath:"#/prefixItems/1/maximum",keyword:"maximum",params:{comparison: "<=", limit: 80},message:"must be <= 80"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data1 < 0 || isNaN(data1)){
const err6 = {instancePath:instancePath+"/1",schemaPath:"#/prefixItems/1/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
else {
const err7 = {instancePath:instancePath+"/1",schemaPath:"#/prefixItems/1/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
const len1 = data.length;
if(!(len1 <= 2)){
const err8 = {instancePath,schemaPath:"#/items",keyword:"items",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
validate60.errors = vErrors;
return errors === 0;
}
validate60.evaluated = {"items":true,"dynamicProps":false,"dynamicItems":false};

const func2 = ajvRuntime0.default;
const pattern3 = new RegExp("^[A-Za-z0-9][A-Za-z0-9._:/-]*$", "u");

function validate57(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate57.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.floor === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "floor"},message:"must have required property '"+"floor"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.initialArrival === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "initialArrival"},message:"must have required property '"+"initialArrival"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.obstacles === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "obstacles"},message:"must have required property '"+"obstacles"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.descriptionCt === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "descriptionCt"},message:"must have required property '"+"descriptionCt"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
for(const key0 in data){
if(!(((((key0 === "id") || (key0 === "floor")) || (key0 === "initialArrival")) || (key0 === "obstacles")) || (key0 === "descriptionCt"))){
const err5 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 !== "string"){
const err6 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(!((((data0 === "SC.ST") || (data0 === "SC.CY")) || (data0 === "SC.WK")) || (data0 === "SC.MD"))){
const err7 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/enum",keyword:"enum",params:{allowedValues: schema23.properties.id.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.floor !== undefined){
if(!(validate58(data.floor, {instancePath:instancePath+"/floor",parentData:data,parentDataProperty:"floor",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate58.errors : vErrors.concat(validate58.errors);
errors = vErrors.length;
}
}
if(data.initialArrival !== undefined){
if(!(validate60(data.initialArrival, {instancePath:instancePath+"/initialArrival",parentData:data,parentDataProperty:"initialArrival",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate60.errors : vErrors.concat(validate60.errors);
errors = vErrors.length;
}
}
if(data.obstacles !== undefined){
let data3 = data.obstacles;
if(Array.isArray(data3)){
if(data3.length > 32){
const err8 = {instancePath:instancePath+"/obstacles",schemaPath:"#/properties/obstacles/maxItems",keyword:"maxItems",params:{limit: 32},message:"must NOT have more than 32 items"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
const len0 = data3.length;
for(let i0=0; i0<len0; i0++){
let data4 = data3[i0];
if(data4 && typeof data4 == "object" && !Array.isArray(data4)){
if(data4.ownerId === undefined){
const err9 = {instancePath:instancePath+"/obstacles/" + i0,schemaPath:"#/properties/obstacles/items/required",keyword:"required",params:{missingProperty: "ownerId"},message:"must have required property '"+"ownerId"+"'"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(data4.rect === undefined){
const err10 = {instancePath:instancePath+"/obstacles/" + i0,schemaPath:"#/properties/obstacles/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
for(const key1 in data4){
if(!((key1 === "ownerId") || (key1 === "rect"))){
const err11 = {instancePath:instancePath+"/obstacles/" + i0,schemaPath:"#/properties/obstacles/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data4.ownerId !== undefined){
let data5 = data4.ownerId;
if(typeof data5 === "string"){
if(func2(data5) > 160){
const err12 = {instancePath:instancePath+"/obstacles/" + i0+"/ownerId",schemaPath:"#/properties/obstacles/items/properties/ownerId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(!pattern3.test(data5)){
const err13 = {instancePath:instancePath+"/obstacles/" + i0+"/ownerId",schemaPath:"#/properties/obstacles/items/properties/ownerId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
else {
const err14 = {instancePath:instancePath+"/obstacles/" + i0+"/ownerId",schemaPath:"#/properties/obstacles/items/properties/ownerId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data4.rect !== undefined){
if(!(validate58(data4.rect, {instancePath:instancePath+"/obstacles/" + i0+"/rect",parentData:data4,parentDataProperty:"rect",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate58.errors : vErrors.concat(validate58.errors);
errors = vErrors.length;
}
}
}
else {
const err15 = {instancePath:instancePath+"/obstacles/" + i0,schemaPath:"#/properties/obstacles/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
}
else {
const err16 = {instancePath:instancePath+"/obstacles",schemaPath:"#/properties/obstacles/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.descriptionCt !== undefined){
let data7 = data.descriptionCt;
if(typeof data7 === "string"){
if(func2(data7) > 160){
const err17 = {instancePath:instancePath+"/descriptionCt",schemaPath:"#/properties/descriptionCt/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(!pattern3.test(data7)){
const err18 = {instancePath:instancePath+"/descriptionCt",schemaPath:"#/properties/descriptionCt/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
else {
const err19 = {instancePath:instancePath+"/descriptionCt",schemaPath:"#/properties/descriptionCt/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
}
else {
const err20 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
validate57.errors = vErrors;
return errors === 0;
}
validate57.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema26 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"parentId":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"room":{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]},"kind":{"type":"string","enum":["furniture","source","actor","door","control","scenery","kit","tile","projection"]},"visual":{"$ref":"#/$defs/Rect"},"hit":{"$ref":"#/$defs/Rect"},"collisionOwner":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"approaches":{"type":"array","items":{"$ref":"#/$defs/Point"},"maxItems":4},"defaultActionCt":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"settleRule":{"type":"string","enum":["none","rollback-before-endpoint","keep-committed","toast-reveal","cue-endpoint"]},"assetSlots":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true}},"required":["id","parentId","room","kind","visual","hit","collisionOwner","approaches","defaultActionCt","settleRule","assetSlots"],"additionalProperties":false};

function validate64(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate64.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.parentId === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "parentId"},message:"must have required property '"+"parentId"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.room === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "room"},message:"must have required property '"+"room"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.visual === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "visual"},message:"must have required property '"+"visual"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.hit === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "hit"},message:"must have required property '"+"hit"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.collisionOwner === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "collisionOwner"},message:"must have required property '"+"collisionOwner"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.approaches === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "approaches"},message:"must have required property '"+"approaches"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.defaultActionCt === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "defaultActionCt"},message:"must have required property '"+"defaultActionCt"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(data.settleRule === undefined){
const err9 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "settleRule"},message:"must have required property '"+"settleRule"+"'"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(data.assetSlots === undefined){
const err10 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "assetSlots"},message:"must have required property '"+"assetSlots"+"'"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema26.properties, key0))){
const err11 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 === "string"){
if(func2(data0) > 160){
const err12 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(!pattern3.test(data0)){
const err13 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
else {
const err14 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.parentId !== undefined){
let data1 = data.parentId;
const _errs5 = errors;
let valid1 = false;
const _errs6 = errors;
if(typeof data1 === "string"){
if(func2(data1) > 160){
const err15 = {instancePath:instancePath+"/parentId",schemaPath:"#/properties/parentId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(!pattern3.test(data1)){
const err16 = {instancePath:instancePath+"/parentId",schemaPath:"#/properties/parentId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
else {
const err17 = {instancePath:instancePath+"/parentId",schemaPath:"#/properties/parentId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
var _valid0 = _errs6 === errors;
valid1 = valid1 || _valid0;
const _errs8 = errors;
if(data1 !== null){
const err18 = {instancePath:instancePath+"/parentId",schemaPath:"#/properties/parentId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
var _valid0 = _errs8 === errors;
valid1 = valid1 || _valid0;
if(!valid1){
const err19 = {instancePath:instancePath+"/parentId",schemaPath:"#/properties/parentId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
else {
errors = _errs5;
if(vErrors !== null){
if(_errs5){
vErrors.length = _errs5;
}
else {
vErrors = null;
}
}
}
}
if(data.room !== undefined){
let data2 = data.room;
if(typeof data2 !== "string"){
const err20 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(!((((data2 === "SC.ST") || (data2 === "SC.CY")) || (data2 === "SC.WK")) || (data2 === "SC.MD"))){
const err21 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/enum",keyword:"enum",params:{allowedValues: schema26.properties.room.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.kind !== undefined){
let data3 = data.kind;
if(typeof data3 !== "string"){
const err22 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
if(!(((((((((data3 === "furniture") || (data3 === "source")) || (data3 === "actor")) || (data3 === "door")) || (data3 === "control")) || (data3 === "scenery")) || (data3 === "kit")) || (data3 === "tile")) || (data3 === "projection"))){
const err23 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/enum",keyword:"enum",params:{allowedValues: schema26.properties.kind.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data.visual !== undefined){
if(!(validate58(data.visual, {instancePath:instancePath+"/visual",parentData:data,parentDataProperty:"visual",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate58.errors : vErrors.concat(validate58.errors);
errors = vErrors.length;
}
}
if(data.hit !== undefined){
if(!(validate58(data.hit, {instancePath:instancePath+"/hit",parentData:data,parentDataProperty:"hit",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate58.errors : vErrors.concat(validate58.errors);
errors = vErrors.length;
}
}
if(data.collisionOwner !== undefined){
let data6 = data.collisionOwner;
const _errs17 = errors;
let valid2 = false;
const _errs18 = errors;
if(typeof data6 === "string"){
if(func2(data6) > 160){
const err24 = {instancePath:instancePath+"/collisionOwner",schemaPath:"#/properties/collisionOwner/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
if(!pattern3.test(data6)){
const err25 = {instancePath:instancePath+"/collisionOwner",schemaPath:"#/properties/collisionOwner/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
else {
const err26 = {instancePath:instancePath+"/collisionOwner",schemaPath:"#/properties/collisionOwner/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
var _valid1 = _errs18 === errors;
valid2 = valid2 || _valid1;
const _errs20 = errors;
if(data6 !== null){
const err27 = {instancePath:instancePath+"/collisionOwner",schemaPath:"#/properties/collisionOwner/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
var _valid1 = _errs20 === errors;
valid2 = valid2 || _valid1;
if(!valid2){
const err28 = {instancePath:instancePath+"/collisionOwner",schemaPath:"#/properties/collisionOwner/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
else {
errors = _errs17;
if(vErrors !== null){
if(_errs17){
vErrors.length = _errs17;
}
else {
vErrors = null;
}
}
}
}
if(data.approaches !== undefined){
let data7 = data.approaches;
if(Array.isArray(data7)){
if(data7.length > 4){
const err29 = {instancePath:instancePath+"/approaches",schemaPath:"#/properties/approaches/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
const len0 = data7.length;
for(let i0=0; i0<len0; i0++){
if(!(validate60(data7[i0], {instancePath:instancePath+"/approaches/" + i0,parentData:data7,parentDataProperty:i0,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate60.errors : vErrors.concat(validate60.errors);
errors = vErrors.length;
}
}
}
else {
const err30 = {instancePath:instancePath+"/approaches",schemaPath:"#/properties/approaches/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data.defaultActionCt !== undefined){
let data9 = data.defaultActionCt;
const _errs26 = errors;
let valid5 = false;
const _errs27 = errors;
if(typeof data9 === "string"){
if(func2(data9) > 160){
const err31 = {instancePath:instancePath+"/defaultActionCt",schemaPath:"#/properties/defaultActionCt/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
if(!pattern3.test(data9)){
const err32 = {instancePath:instancePath+"/defaultActionCt",schemaPath:"#/properties/defaultActionCt/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
else {
const err33 = {instancePath:instancePath+"/defaultActionCt",schemaPath:"#/properties/defaultActionCt/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
var _valid2 = _errs27 === errors;
valid5 = valid5 || _valid2;
const _errs29 = errors;
if(data9 !== null){
const err34 = {instancePath:instancePath+"/defaultActionCt",schemaPath:"#/properties/defaultActionCt/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
var _valid2 = _errs29 === errors;
valid5 = valid5 || _valid2;
if(!valid5){
const err35 = {instancePath:instancePath+"/defaultActionCt",schemaPath:"#/properties/defaultActionCt/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
else {
errors = _errs26;
if(vErrors !== null){
if(_errs26){
vErrors.length = _errs26;
}
else {
vErrors = null;
}
}
}
}
if(data.settleRule !== undefined){
let data10 = data.settleRule;
if(typeof data10 !== "string"){
const err36 = {instancePath:instancePath+"/settleRule",schemaPath:"#/properties/settleRule/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
if(!(((((data10 === "none") || (data10 === "rollback-before-endpoint")) || (data10 === "keep-committed")) || (data10 === "toast-reveal")) || (data10 === "cue-endpoint"))){
const err37 = {instancePath:instancePath+"/settleRule",schemaPath:"#/properties/settleRule/enum",keyword:"enum",params:{allowedValues: schema26.properties.settleRule.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
if(data.assetSlots !== undefined){
let data11 = data.assetSlots;
if(Array.isArray(data11)){
if(data11.length > 64){
const err38 = {instancePath:instancePath+"/assetSlots",schemaPath:"#/properties/assetSlots/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
const len1 = data11.length;
for(let i1=0; i1<len1; i1++){
let data12 = data11[i1];
if(typeof data12 === "string"){
if(func2(data12) > 160){
const err39 = {instancePath:instancePath+"/assetSlots/" + i1,schemaPath:"#/properties/assetSlots/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
if(!pattern3.test(data12)){
const err40 = {instancePath:instancePath+"/assetSlots/" + i1,schemaPath:"#/properties/assetSlots/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
else {
const err41 = {instancePath:instancePath+"/assetSlots/" + i1,schemaPath:"#/properties/assetSlots/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
let i2 = data11.length;
let j0;
if(i2 > 1){
const indices0 = {};
for(;i2--;){
let item0 = data11[i2];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err42 = {instancePath:instancePath+"/assetSlots",schemaPath:"#/properties/assetSlots/uniqueItems",keyword:"uniqueItems",params:{i: i2, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i2+" are identical)"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
break;
}
indices0[item0] = i2;
}
}
}
else {
const err43 = {instancePath:instancePath+"/assetSlots",schemaPath:"#/properties/assetSlots/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
}
else {
const err44 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
validate64.errors = vErrors;
return errors === 0;
}
validate64.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema27 = {"type":"object","properties":{"id":{"type":"string","enum":["ACT.PLAYER","ACT.LOOP","ACT.JO","ACT.REMY","ACT.ARI"]},"room":{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]},"feet":{"$ref":"#/$defs/Point"},"radius":{"type":"number","enum":[2,3]},"homeKnowledge":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true}},"required":["id","room","feet","radius","homeKnowledge"],"additionalProperties":false};

function validate69(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate69.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.room === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "room"},message:"must have required property '"+"room"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.feet === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "feet"},message:"must have required property '"+"feet"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.radius === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "radius"},message:"must have required property '"+"radius"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.homeKnowledge === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "homeKnowledge"},message:"must have required property '"+"homeKnowledge"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
for(const key0 in data){
if(!(((((key0 === "id") || (key0 === "room")) || (key0 === "feet")) || (key0 === "radius")) || (key0 === "homeKnowledge"))){
const err5 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 !== "string"){
const err6 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(!(((((data0 === "ACT.PLAYER") || (data0 === "ACT.LOOP")) || (data0 === "ACT.JO")) || (data0 === "ACT.REMY")) || (data0 === "ACT.ARI"))){
const err7 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/enum",keyword:"enum",params:{allowedValues: schema27.properties.id.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.room !== undefined){
let data1 = data.room;
if(typeof data1 !== "string"){
const err8 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(!((((data1 === "SC.ST") || (data1 === "SC.CY")) || (data1 === "SC.WK")) || (data1 === "SC.MD"))){
const err9 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/enum",keyword:"enum",params:{allowedValues: schema27.properties.room.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.feet !== undefined){
if(!(validate60(data.feet, {instancePath:instancePath+"/feet",parentData:data,parentDataProperty:"feet",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate60.errors : vErrors.concat(validate60.errors);
errors = vErrors.length;
}
}
if(data.radius !== undefined){
let data3 = data.radius;
if(!((typeof data3 == "number") && (isFinite(data3)))){
const err10 = {instancePath:instancePath+"/radius",schemaPath:"#/properties/radius/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(!((data3 === 2) || (data3 === 3))){
const err11 = {instancePath:instancePath+"/radius",schemaPath:"#/properties/radius/enum",keyword:"enum",params:{allowedValues: schema27.properties.radius.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.homeKnowledge !== undefined){
let data4 = data.homeKnowledge;
if(Array.isArray(data4)){
if(data4.length > 64){
const err12 = {instancePath:instancePath+"/homeKnowledge",schemaPath:"#/properties/homeKnowledge/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
const len0 = data4.length;
for(let i0=0; i0<len0; i0++){
let data5 = data4[i0];
if(typeof data5 === "string"){
if(func2(data5) > 160){
const err13 = {instancePath:instancePath+"/homeKnowledge/" + i0,schemaPath:"#/properties/homeKnowledge/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(!pattern3.test(data5)){
const err14 = {instancePath:instancePath+"/homeKnowledge/" + i0,schemaPath:"#/properties/homeKnowledge/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
else {
const err15 = {instancePath:instancePath+"/homeKnowledge/" + i0,schemaPath:"#/properties/homeKnowledge/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
let i1 = data4.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data4[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err16 = {instancePath:instancePath+"/homeKnowledge",schemaPath:"#/properties/homeKnowledge/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err17 = {instancePath:instancePath+"/homeKnowledge",schemaPath:"#/properties/homeKnowledge/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
}
else {
const err18 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
validate69.errors = vErrors;
return errors === 0;
}
validate69.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema28 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"room":{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]},"approach":{"$ref":"#/$defs/Point"},"threshold":{"$ref":"#/$defs/Point"},"destinationId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"destinationRoom":{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]},"avatarArrival":{"$ref":"#/$defs/Point"},"facing":{"type":"string","enum":["up","down","left","right"]},"loopArrival":{"$ref":"#/$defs/Point"}},"required":["id","room","approach","threshold","destinationId","destinationRoom","avatarArrival","facing","loopArrival"],"additionalProperties":false};

function validate72(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate72.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.room === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "room"},message:"must have required property '"+"room"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.approach === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "approach"},message:"must have required property '"+"approach"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.threshold === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "threshold"},message:"must have required property '"+"threshold"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.destinationId === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "destinationId"},message:"must have required property '"+"destinationId"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.destinationRoom === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "destinationRoom"},message:"must have required property '"+"destinationRoom"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.avatarArrival === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "avatarArrival"},message:"must have required property '"+"avatarArrival"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.facing === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "facing"},message:"must have required property '"+"facing"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.loopArrival === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "loopArrival"},message:"must have required property '"+"loopArrival"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema28.properties, key0))){
const err9 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 === "string"){
if(func2(data0) > 160){
const err10 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(!pattern3.test(data0)){
const err11 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
else {
const err12 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.room !== undefined){
let data1 = data.room;
if(typeof data1 !== "string"){
const err13 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(!((((data1 === "SC.ST") || (data1 === "SC.CY")) || (data1 === "SC.WK")) || (data1 === "SC.MD"))){
const err14 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/enum",keyword:"enum",params:{allowedValues: schema28.properties.room.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.approach !== undefined){
if(!(validate60(data.approach, {instancePath:instancePath+"/approach",parentData:data,parentDataProperty:"approach",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate60.errors : vErrors.concat(validate60.errors);
errors = vErrors.length;
}
}
if(data.threshold !== undefined){
if(!(validate60(data.threshold, {instancePath:instancePath+"/threshold",parentData:data,parentDataProperty:"threshold",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate60.errors : vErrors.concat(validate60.errors);
errors = vErrors.length;
}
}
if(data.destinationId !== undefined){
let data4 = data.destinationId;
if(typeof data4 === "string"){
if(func2(data4) > 160){
const err15 = {instancePath:instancePath+"/destinationId",schemaPath:"#/properties/destinationId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(!pattern3.test(data4)){
const err16 = {instancePath:instancePath+"/destinationId",schemaPath:"#/properties/destinationId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
else {
const err17 = {instancePath:instancePath+"/destinationId",schemaPath:"#/properties/destinationId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.destinationRoom !== undefined){
let data5 = data.destinationRoom;
if(typeof data5 !== "string"){
const err18 = {instancePath:instancePath+"/destinationRoom",schemaPath:"#/properties/destinationRoom/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if(!((((data5 === "SC.ST") || (data5 === "SC.CY")) || (data5 === "SC.WK")) || (data5 === "SC.MD"))){
const err19 = {instancePath:instancePath+"/destinationRoom",schemaPath:"#/properties/destinationRoom/enum",keyword:"enum",params:{allowedValues: schema28.properties.destinationRoom.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.avatarArrival !== undefined){
if(!(validate60(data.avatarArrival, {instancePath:instancePath+"/avatarArrival",parentData:data,parentDataProperty:"avatarArrival",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate60.errors : vErrors.concat(validate60.errors);
errors = vErrors.length;
}
}
if(data.facing !== undefined){
let data7 = data.facing;
if(typeof data7 !== "string"){
const err20 = {instancePath:instancePath+"/facing",schemaPath:"#/properties/facing/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(!((((data7 === "up") || (data7 === "down")) || (data7 === "left")) || (data7 === "right"))){
const err21 = {instancePath:instancePath+"/facing",schemaPath:"#/properties/facing/enum",keyword:"enum",params:{allowedValues: schema28.properties.facing.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.loopArrival !== undefined){
if(!(validate60(data.loopArrival, {instancePath:instancePath+"/loopArrival",parentData:data,parentDataProperty:"loopArrival",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate60.errors : vErrors.concat(validate60.errors);
errors = vErrors.length;
}
}
}
else {
const err22 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
validate72.errors = vErrors;
return errors === 0;
}
validate72.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema29 = {"type":"object","properties":{"id":{"type":"string","enum":["E1","E2","E3","E4","E5","E6","E7","E8","NAV"]},"titleCt":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"parts":{"type":"array","items":{"$ref":"#/$defs/SourcePart"},"maxItems":32}},"required":["id","titleCt","parts"],"additionalProperties":false};
const schema30 = {"type":"object","properties":{"refId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"ctId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"spans":{"type":"array","items":{"$ref":"#/$defs/Span"},"maxItems":8},"medium":{"type":"string","enum":["text","frame","marker","image","observation"]},"provenance":{"type":"string","enum":["written","recording","photo","posted-account","spoken-account","observation","venue","tile"]},"authorId":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"timeKind":{"type":"string","enum":["posted","recorded","captured","during-visit","none"]},"storyMinute":{"anyOf":[{"type":"integer","enum":[545,550,552,553,558]},{"type":"null"}]},"requiresAll":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true}},"required":["refId","ctId","spans","medium","provenance","authorId","timeKind","storyMinute","requiresAll"],"additionalProperties":false};
const schema31 = {"type":"array","prefixItems":[{"type":"integer","minimum":0,"maximum":9007199254740991},{"type":"integer","minimum":0,"maximum":9007199254740991}],"items":false,"minItems":2,"maxItems":2};

function validate80(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate80.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(Array.isArray(data)){
if(data.length > 2){
const err0 = {instancePath,schemaPath:"#/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.length < 2){
const err1 = {instancePath,schemaPath:"#/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
const len0 = data.length;
if(len0 > 0){
let data0 = data[0];
if(!(((typeof data0 == "number") && (!(data0 % 1) && !isNaN(data0))) && (isFinite(data0)))){
const err2 = {instancePath:instancePath+"/0",schemaPath:"#/prefixItems/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if((typeof data0 == "number") && (isFinite(data0))){
if(data0 > 9007199254740991 || isNaN(data0)){
const err3 = {instancePath:instancePath+"/0",schemaPath:"#/prefixItems/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data0 < 0 || isNaN(data0)){
const err4 = {instancePath:instancePath+"/0",schemaPath:"#/prefixItems/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
}
if(len0 > 1){
let data1 = data[1];
if(!(((typeof data1 == "number") && (!(data1 % 1) && !isNaN(data1))) && (isFinite(data1)))){
const err5 = {instancePath:instancePath+"/1",schemaPath:"#/prefixItems/1/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if((typeof data1 == "number") && (isFinite(data1))){
if(data1 > 9007199254740991 || isNaN(data1)){
const err6 = {instancePath:instancePath+"/1",schemaPath:"#/prefixItems/1/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data1 < 0 || isNaN(data1)){
const err7 = {instancePath:instancePath+"/1",schemaPath:"#/prefixItems/1/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
}
const len1 = data.length;
if(!(len1 <= 2)){
const err8 = {instancePath,schemaPath:"#/items",keyword:"items",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
validate80.errors = vErrors;
return errors === 0;
}
validate80.evaluated = {"items":true,"dynamicProps":false,"dynamicItems":false};


function validate79(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate79.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.refId === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "refId"},message:"must have required property '"+"refId"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.ctId === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "ctId"},message:"must have required property '"+"ctId"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.spans === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "spans"},message:"must have required property '"+"spans"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.medium === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "medium"},message:"must have required property '"+"medium"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.provenance === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "provenance"},message:"must have required property '"+"provenance"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.authorId === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "authorId"},message:"must have required property '"+"authorId"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.timeKind === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "timeKind"},message:"must have required property '"+"timeKind"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.storyMinute === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "storyMinute"},message:"must have required property '"+"storyMinute"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.requiresAll === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "requiresAll"},message:"must have required property '"+"requiresAll"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema30.properties, key0))){
const err9 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.refId !== undefined){
let data0 = data.refId;
if(typeof data0 === "string"){
if(func2(data0) > 160){
const err10 = {instancePath:instancePath+"/refId",schemaPath:"#/properties/refId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(!pattern3.test(data0)){
const err11 = {instancePath:instancePath+"/refId",schemaPath:"#/properties/refId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
else {
const err12 = {instancePath:instancePath+"/refId",schemaPath:"#/properties/refId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.ctId !== undefined){
let data1 = data.ctId;
if(typeof data1 === "string"){
if(func2(data1) > 160){
const err13 = {instancePath:instancePath+"/ctId",schemaPath:"#/properties/ctId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(!pattern3.test(data1)){
const err14 = {instancePath:instancePath+"/ctId",schemaPath:"#/properties/ctId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
else {
const err15 = {instancePath:instancePath+"/ctId",schemaPath:"#/properties/ctId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.spans !== undefined){
let data2 = data.spans;
if(Array.isArray(data2)){
if(data2.length > 8){
const err16 = {instancePath:instancePath+"/spans",schemaPath:"#/properties/spans/maxItems",keyword:"maxItems",params:{limit: 8},message:"must NOT have more than 8 items"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
const len0 = data2.length;
for(let i0=0; i0<len0; i0++){
if(!(validate80(data2[i0], {instancePath:instancePath+"/spans/" + i0,parentData:data2,parentDataProperty:i0,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate80.errors : vErrors.concat(validate80.errors);
errors = vErrors.length;
}
}
}
else {
const err17 = {instancePath:instancePath+"/spans",schemaPath:"#/properties/spans/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.medium !== undefined){
let data4 = data.medium;
if(typeof data4 !== "string"){
const err18 = {instancePath:instancePath+"/medium",schemaPath:"#/properties/medium/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if(!(((((data4 === "text") || (data4 === "frame")) || (data4 === "marker")) || (data4 === "image")) || (data4 === "observation"))){
const err19 = {instancePath:instancePath+"/medium",schemaPath:"#/properties/medium/enum",keyword:"enum",params:{allowedValues: schema30.properties.medium.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.provenance !== undefined){
let data5 = data.provenance;
if(typeof data5 !== "string"){
const err20 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(!((((((((data5 === "written") || (data5 === "recording")) || (data5 === "photo")) || (data5 === "posted-account")) || (data5 === "spoken-account")) || (data5 === "observation")) || (data5 === "venue")) || (data5 === "tile"))){
const err21 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/enum",keyword:"enum",params:{allowedValues: schema30.properties.provenance.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.authorId !== undefined){
let data6 = data.authorId;
const _errs14 = errors;
let valid3 = false;
const _errs15 = errors;
if(typeof data6 === "string"){
if(func2(data6) > 160){
const err22 = {instancePath:instancePath+"/authorId",schemaPath:"#/properties/authorId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
if(!pattern3.test(data6)){
const err23 = {instancePath:instancePath+"/authorId",schemaPath:"#/properties/authorId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
else {
const err24 = {instancePath:instancePath+"/authorId",schemaPath:"#/properties/authorId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
var _valid0 = _errs15 === errors;
valid3 = valid3 || _valid0;
const _errs17 = errors;
if(data6 !== null){
const err25 = {instancePath:instancePath+"/authorId",schemaPath:"#/properties/authorId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
var _valid0 = _errs17 === errors;
valid3 = valid3 || _valid0;
if(!valid3){
const err26 = {instancePath:instancePath+"/authorId",schemaPath:"#/properties/authorId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
else {
errors = _errs14;
if(vErrors !== null){
if(_errs14){
vErrors.length = _errs14;
}
else {
vErrors = null;
}
}
}
}
if(data.timeKind !== undefined){
let data7 = data.timeKind;
if(typeof data7 !== "string"){
const err27 = {instancePath:instancePath+"/timeKind",schemaPath:"#/properties/timeKind/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
if(!(((((data7 === "posted") || (data7 === "recorded")) || (data7 === "captured")) || (data7 === "during-visit")) || (data7 === "none"))){
const err28 = {instancePath:instancePath+"/timeKind",schemaPath:"#/properties/timeKind/enum",keyword:"enum",params:{allowedValues: schema30.properties.timeKind.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data.storyMinute !== undefined){
let data8 = data.storyMinute;
const _errs22 = errors;
let valid4 = false;
const _errs23 = errors;
if(!(((typeof data8 == "number") && (!(data8 % 1) && !isNaN(data8))) && (isFinite(data8)))){
const err29 = {instancePath:instancePath+"/storyMinute",schemaPath:"#/properties/storyMinute/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
if(!(((((data8 === 545) || (data8 === 550)) || (data8 === 552)) || (data8 === 553)) || (data8 === 558))){
const err30 = {instancePath:instancePath+"/storyMinute",schemaPath:"#/properties/storyMinute/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema30.properties.storyMinute.anyOf[0].enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
var _valid1 = _errs23 === errors;
valid4 = valid4 || _valid1;
const _errs25 = errors;
if(data8 !== null){
const err31 = {instancePath:instancePath+"/storyMinute",schemaPath:"#/properties/storyMinute/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
var _valid1 = _errs25 === errors;
valid4 = valid4 || _valid1;
if(!valid4){
const err32 = {instancePath:instancePath+"/storyMinute",schemaPath:"#/properties/storyMinute/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
else {
errors = _errs22;
if(vErrors !== null){
if(_errs22){
vErrors.length = _errs22;
}
else {
vErrors = null;
}
}
}
}
if(data.requiresAll !== undefined){
let data9 = data.requiresAll;
if(Array.isArray(data9)){
if(data9.length > 64){
const err33 = {instancePath:instancePath+"/requiresAll",schemaPath:"#/properties/requiresAll/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
const len1 = data9.length;
for(let i1=0; i1<len1; i1++){
let data10 = data9[i1];
if(typeof data10 === "string"){
if(func2(data10) > 160){
const err34 = {instancePath:instancePath+"/requiresAll/" + i1,schemaPath:"#/properties/requiresAll/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
if(!pattern3.test(data10)){
const err35 = {instancePath:instancePath+"/requiresAll/" + i1,schemaPath:"#/properties/requiresAll/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
else {
const err36 = {instancePath:instancePath+"/requiresAll/" + i1,schemaPath:"#/properties/requiresAll/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
let i2 = data9.length;
let j0;
if(i2 > 1){
const indices0 = {};
for(;i2--;){
let item0 = data9[i2];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err37 = {instancePath:instancePath+"/requiresAll",schemaPath:"#/properties/requiresAll/uniqueItems",keyword:"uniqueItems",params:{i: i2, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i2+" are identical)"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
break;
}
indices0[item0] = i2;
}
}
}
else {
const err38 = {instancePath:instancePath+"/requiresAll",schemaPath:"#/properties/requiresAll/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
}
else {
const err39 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
validate79.errors = vErrors;
return errors === 0;
}
validate79.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate78(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate78.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.titleCt === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "titleCt"},message:"must have required property '"+"titleCt"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.parts === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "parts"},message:"must have required property '"+"parts"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
for(const key0 in data){
if(!(((key0 === "id") || (key0 === "titleCt")) || (key0 === "parts"))){
const err3 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 !== "string"){
const err4 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(!(((((((((data0 === "E1") || (data0 === "E2")) || (data0 === "E3")) || (data0 === "E4")) || (data0 === "E5")) || (data0 === "E6")) || (data0 === "E7")) || (data0 === "E8")) || (data0 === "NAV"))){
const err5 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/enum",keyword:"enum",params:{allowedValues: schema29.properties.id.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
if(data.titleCt !== undefined){
let data1 = data.titleCt;
if(typeof data1 === "string"){
if(func2(data1) > 160){
const err6 = {instancePath:instancePath+"/titleCt",schemaPath:"#/properties/titleCt/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(!pattern3.test(data1)){
const err7 = {instancePath:instancePath+"/titleCt",schemaPath:"#/properties/titleCt/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
else {
const err8 = {instancePath:instancePath+"/titleCt",schemaPath:"#/properties/titleCt/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.parts !== undefined){
let data2 = data.parts;
if(Array.isArray(data2)){
if(data2.length > 32){
const err9 = {instancePath:instancePath+"/parts",schemaPath:"#/properties/parts/maxItems",keyword:"maxItems",params:{limit: 32},message:"must NOT have more than 32 items"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
const len0 = data2.length;
for(let i0=0; i0<len0; i0++){
if(!(validate79(data2[i0], {instancePath:instancePath+"/parts/" + i0,parentData:data2,parentDataProperty:i0,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate79.errors : vErrors.concat(validate79.errors);
errors = vErrors.length;
}
}
}
else {
const err10 = {instancePath:instancePath+"/parts",schemaPath:"#/properties/parts/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
}
else {
const err11 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
validate78.errors = vErrors;
return errors === 0;
}
validate78.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema32 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"sourceId":{"type":"string","enum":["E1","E2","E3","E4","E5","E6","E7","E8","NAV"]},"ownerId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"availableWhen":{"$ref":"#/$defs/Predicate"},"bodyRefs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true}},"required":["id","sourceId","ownerId","availableWhen","bodyRefs"],"additionalProperties":false};
const schema33 = {"oneOf":[{"type":"object","properties":{"all":{"type":"array","items":{"$ref":"#/$defs/Predicate"},"maxItems":16}},"required":["all"],"additionalProperties":false},{"type":"object","properties":{"any":{"type":"array","items":{"$ref":"#/$defs/Predicate"},"maxItems":16}},"required":["any"],"additionalProperties":false},{"type":"object","properties":{"not":{"$ref":"#/$defs/Predicate"}},"required":["not"],"additionalProperties":false},{"type":"object","properties":{"test":{"type":"string","enum":["flag","room","local-owner","loop-mode","kit-host","available","exposed","actor-knows","puppet","run-status","certified","premiered","topic","meaning","assistance-displayed"]},"args":{"type":"array","items":{"type":"string"},"maxItems":3}},"required":["test","args"],"additionalProperties":false}]};
const wrapper0 = {validate: validate85};

function validate85(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate85.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
const _errs0 = errors;
let valid0 = false;
let passing0 = null;
const _errs1 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.all === undefined){
const err0 = {instancePath,schemaPath:"#/oneOf/0/required",keyword:"required",params:{missingProperty: "all"},message:"must have required property '"+"all"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
for(const key0 in data){
if(!(key0 === "all")){
const err1 = {instancePath,schemaPath:"#/oneOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
}
if(data.all !== undefined){
let data0 = data.all;
if(Array.isArray(data0)){
if(data0.length > 16){
const err2 = {instancePath:instancePath+"/all",schemaPath:"#/oneOf/0/properties/all/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
const len0 = data0.length;
for(let i0=0; i0<len0; i0++){
if(!(wrapper0.validate(data0[i0], {instancePath:instancePath+"/all/" + i0,parentData:data0,parentDataProperty:i0,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? wrapper0.validate.errors : vErrors.concat(wrapper0.validate.errors);
errors = vErrors.length;
}
}
}
else {
const err3 = {instancePath:instancePath+"/all",schemaPath:"#/oneOf/0/properties/all/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
}
else {
const err4 = {instancePath,schemaPath:"#/oneOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
var _valid0 = _errs1 === errors;
if(_valid0){
valid0 = true;
passing0 = 0;
var props1 = true;
}
const _errs7 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.any === undefined){
const err5 = {instancePath,schemaPath:"#/oneOf/1/required",keyword:"required",params:{missingProperty: "any"},message:"must have required property '"+"any"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
for(const key1 in data){
if(!(key1 === "any")){
const err6 = {instancePath,schemaPath:"#/oneOf/1/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.any !== undefined){
let data2 = data.any;
if(Array.isArray(data2)){
if(data2.length > 16){
const err7 = {instancePath:instancePath+"/any",schemaPath:"#/oneOf/1/properties/any/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
const len1 = data2.length;
for(let i1=0; i1<len1; i1++){
if(!(wrapper0.validate(data2[i1], {instancePath:instancePath+"/any/" + i1,parentData:data2,parentDataProperty:i1,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? wrapper0.validate.errors : vErrors.concat(wrapper0.validate.errors);
errors = vErrors.length;
}
}
}
else {
const err8 = {instancePath:instancePath+"/any",schemaPath:"#/oneOf/1/properties/any/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
}
else {
const err9 = {instancePath,schemaPath:"#/oneOf/1/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
var _valid0 = _errs7 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 1];
}
else {
if(_valid0){
valid0 = true;
passing0 = 1;
if(props1 !== true){
props1 = true;
}
}
const _errs13 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.not === undefined){
const err10 = {instancePath,schemaPath:"#/oneOf/2/required",keyword:"required",params:{missingProperty: "not"},message:"must have required property '"+"not"+"'"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
for(const key2 in data){
if(!(key2 === "not")){
const err11 = {instancePath,schemaPath:"#/oneOf/2/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.not !== undefined){
if(!(wrapper0.validate(data.not, {instancePath:instancePath+"/not",parentData:data,parentDataProperty:"not",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? wrapper0.validate.errors : vErrors.concat(wrapper0.validate.errors);
errors = vErrors.length;
}
}
}
else {
const err12 = {instancePath,schemaPath:"#/oneOf/2/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
var _valid0 = _errs13 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 2];
}
else {
if(_valid0){
valid0 = true;
passing0 = 2;
if(props1 !== true){
props1 = true;
}
}
const _errs17 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.test === undefined){
const err13 = {instancePath,schemaPath:"#/oneOf/3/required",keyword:"required",params:{missingProperty: "test"},message:"must have required property '"+"test"+"'"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(data.args === undefined){
const err14 = {instancePath,schemaPath:"#/oneOf/3/required",keyword:"required",params:{missingProperty: "args"},message:"must have required property '"+"args"+"'"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
for(const key3 in data){
if(!((key3 === "test") || (key3 === "args"))){
const err15 = {instancePath,schemaPath:"#/oneOf/3/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.test !== undefined){
let data5 = data.test;
if(typeof data5 !== "string"){
const err16 = {instancePath:instancePath+"/test",schemaPath:"#/oneOf/3/properties/test/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
if(!(((((((((((((((data5 === "flag") || (data5 === "room")) || (data5 === "local-owner")) || (data5 === "loop-mode")) || (data5 === "kit-host")) || (data5 === "available")) || (data5 === "exposed")) || (data5 === "actor-knows")) || (data5 === "puppet")) || (data5 === "run-status")) || (data5 === "certified")) || (data5 === "premiered")) || (data5 === "topic")) || (data5 === "meaning")) || (data5 === "assistance-displayed"))){
const err17 = {instancePath:instancePath+"/test",schemaPath:"#/oneOf/3/properties/test/enum",keyword:"enum",params:{allowedValues: schema33.oneOf[3].properties.test.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.args !== undefined){
let data6 = data.args;
if(Array.isArray(data6)){
if(data6.length > 3){
const err18 = {instancePath:instancePath+"/args",schemaPath:"#/oneOf/3/properties/args/maxItems",keyword:"maxItems",params:{limit: 3},message:"must NOT have more than 3 items"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
const len2 = data6.length;
for(let i2=0; i2<len2; i2++){
if(typeof data6[i2] !== "string"){
const err19 = {instancePath:instancePath+"/args/" + i2,schemaPath:"#/oneOf/3/properties/args/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
}
else {
const err20 = {instancePath:instancePath+"/args",schemaPath:"#/oneOf/3/properties/args/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
}
else {
const err21 = {instancePath,schemaPath:"#/oneOf/3/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
var _valid0 = _errs17 === errors;
if(_valid0 && valid0){
valid0 = false;
passing0 = [passing0, 3];
}
else {
if(_valid0){
valid0 = true;
passing0 = 3;
if(props1 !== true){
props1 = true;
}
}
}
}
}
if(!valid0){
const err22 = {instancePath,schemaPath:"#/oneOf",keyword:"oneOf",params:{passingSchemas: passing0},message:"must match exactly one schema in oneOf"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
else {
errors = _errs0;
if(vErrors !== null){
if(_errs0){
vErrors.length = _errs0;
}
else {
vErrors = null;
}
}
}
validate85.errors = vErrors;
evaluated0.props = props1;
return errors === 0;
}
validate85.evaluated = {"dynamicProps":true,"dynamicItems":false};


function validate84(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate84.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.sourceId === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "sourceId"},message:"must have required property '"+"sourceId"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.ownerId === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "ownerId"},message:"must have required property '"+"ownerId"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.availableWhen === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "availableWhen"},message:"must have required property '"+"availableWhen"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.bodyRefs === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "bodyRefs"},message:"must have required property '"+"bodyRefs"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
for(const key0 in data){
if(!(((((key0 === "id") || (key0 === "sourceId")) || (key0 === "ownerId")) || (key0 === "availableWhen")) || (key0 === "bodyRefs"))){
const err5 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 === "string"){
if(func2(data0) > 160){
const err6 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(!pattern3.test(data0)){
const err7 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
else {
const err8 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.sourceId !== undefined){
let data1 = data.sourceId;
if(typeof data1 !== "string"){
const err9 = {instancePath:instancePath+"/sourceId",schemaPath:"#/properties/sourceId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(!(((((((((data1 === "E1") || (data1 === "E2")) || (data1 === "E3")) || (data1 === "E4")) || (data1 === "E5")) || (data1 === "E6")) || (data1 === "E7")) || (data1 === "E8")) || (data1 === "NAV"))){
const err10 = {instancePath:instancePath+"/sourceId",schemaPath:"#/properties/sourceId/enum",keyword:"enum",params:{allowedValues: schema32.properties.sourceId.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.ownerId !== undefined){
let data2 = data.ownerId;
if(typeof data2 === "string"){
if(func2(data2) > 160){
const err11 = {instancePath:instancePath+"/ownerId",schemaPath:"#/properties/ownerId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(!pattern3.test(data2)){
const err12 = {instancePath:instancePath+"/ownerId",schemaPath:"#/properties/ownerId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/ownerId",schemaPath:"#/properties/ownerId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.availableWhen !== undefined){
if(!(validate85(data.availableWhen, {instancePath:instancePath+"/availableWhen",parentData:data,parentDataProperty:"availableWhen",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate85.errors : vErrors.concat(validate85.errors);
errors = vErrors.length;
}
}
if(data.bodyRefs !== undefined){
let data4 = data.bodyRefs;
if(Array.isArray(data4)){
if(data4.length > 64){
const err14 = {instancePath:instancePath+"/bodyRefs",schemaPath:"#/properties/bodyRefs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
const len0 = data4.length;
for(let i0=0; i0<len0; i0++){
let data5 = data4[i0];
if(typeof data5 === "string"){
if(func2(data5) > 160){
const err15 = {instancePath:instancePath+"/bodyRefs/" + i0,schemaPath:"#/properties/bodyRefs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(!pattern3.test(data5)){
const err16 = {instancePath:instancePath+"/bodyRefs/" + i0,schemaPath:"#/properties/bodyRefs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
else {
const err17 = {instancePath:instancePath+"/bodyRefs/" + i0,schemaPath:"#/properties/bodyRefs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
let i1 = data4.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data4[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err18 = {instancePath:instancePath+"/bodyRefs",schemaPath:"#/properties/bodyRefs/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err19 = {instancePath:instancePath+"/bodyRefs",schemaPath:"#/properties/bodyRefs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
}
else {
const err20 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
validate84.errors = vErrors;
return errors === 0;
}
validate84.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema34 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"ownerId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"copyId":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"room":{"anyOf":[{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]},{"type":"null"}]},"approachOwnerId":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"actionCt":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"grants":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"when":{"$ref":"#/$defs/Predicate"}},"required":["id","ownerId","copyId","room","approachOwnerId","actionCt","grants","when"],"additionalProperties":false};

function validate88(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate88.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.ownerId === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "ownerId"},message:"must have required property '"+"ownerId"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.copyId === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "copyId"},message:"must have required property '"+"copyId"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.room === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "room"},message:"must have required property '"+"room"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.approachOwnerId === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "approachOwnerId"},message:"must have required property '"+"approachOwnerId"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.actionCt === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "actionCt"},message:"must have required property '"+"actionCt"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.grants === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "grants"},message:"must have required property '"+"grants"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.when === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "when"},message:"must have required property '"+"when"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
for(const key0 in data){
if(!((((((((key0 === "id") || (key0 === "ownerId")) || (key0 === "copyId")) || (key0 === "room")) || (key0 === "approachOwnerId")) || (key0 === "actionCt")) || (key0 === "grants")) || (key0 === "when"))){
const err8 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 === "string"){
if(func2(data0) > 160){
const err9 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(!pattern3.test(data0)){
const err10 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
else {
const err11 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.ownerId !== undefined){
let data1 = data.ownerId;
if(typeof data1 === "string"){
if(func2(data1) > 160){
const err12 = {instancePath:instancePath+"/ownerId",schemaPath:"#/properties/ownerId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(!pattern3.test(data1)){
const err13 = {instancePath:instancePath+"/ownerId",schemaPath:"#/properties/ownerId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
else {
const err14 = {instancePath:instancePath+"/ownerId",schemaPath:"#/properties/ownerId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.copyId !== undefined){
let data2 = data.copyId;
const _errs7 = errors;
let valid1 = false;
const _errs8 = errors;
if(typeof data2 === "string"){
if(func2(data2) > 160){
const err15 = {instancePath:instancePath+"/copyId",schemaPath:"#/properties/copyId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(!pattern3.test(data2)){
const err16 = {instancePath:instancePath+"/copyId",schemaPath:"#/properties/copyId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
else {
const err17 = {instancePath:instancePath+"/copyId",schemaPath:"#/properties/copyId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
var _valid0 = _errs8 === errors;
valid1 = valid1 || _valid0;
const _errs10 = errors;
if(data2 !== null){
const err18 = {instancePath:instancePath+"/copyId",schemaPath:"#/properties/copyId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
var _valid0 = _errs10 === errors;
valid1 = valid1 || _valid0;
if(!valid1){
const err19 = {instancePath:instancePath+"/copyId",schemaPath:"#/properties/copyId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
else {
errors = _errs7;
if(vErrors !== null){
if(_errs7){
vErrors.length = _errs7;
}
else {
vErrors = null;
}
}
}
}
if(data.room !== undefined){
let data3 = data.room;
const _errs13 = errors;
let valid2 = false;
const _errs14 = errors;
if(typeof data3 !== "string"){
const err20 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(!((((data3 === "SC.ST") || (data3 === "SC.CY")) || (data3 === "SC.WK")) || (data3 === "SC.MD"))){
const err21 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema34.properties.room.anyOf[0].enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
var _valid1 = _errs14 === errors;
valid2 = valid2 || _valid1;
const _errs16 = errors;
if(data3 !== null){
const err22 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
var _valid1 = _errs16 === errors;
valid2 = valid2 || _valid1;
if(!valid2){
const err23 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
else {
errors = _errs13;
if(vErrors !== null){
if(_errs13){
vErrors.length = _errs13;
}
else {
vErrors = null;
}
}
}
}
if(data.approachOwnerId !== undefined){
let data4 = data.approachOwnerId;
const _errs19 = errors;
let valid3 = false;
const _errs20 = errors;
if(typeof data4 === "string"){
if(func2(data4) > 160){
const err24 = {instancePath:instancePath+"/approachOwnerId",schemaPath:"#/properties/approachOwnerId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
if(!pattern3.test(data4)){
const err25 = {instancePath:instancePath+"/approachOwnerId",schemaPath:"#/properties/approachOwnerId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
else {
const err26 = {instancePath:instancePath+"/approachOwnerId",schemaPath:"#/properties/approachOwnerId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
var _valid2 = _errs20 === errors;
valid3 = valid3 || _valid2;
const _errs22 = errors;
if(data4 !== null){
const err27 = {instancePath:instancePath+"/approachOwnerId",schemaPath:"#/properties/approachOwnerId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
var _valid2 = _errs22 === errors;
valid3 = valid3 || _valid2;
if(!valid3){
const err28 = {instancePath:instancePath+"/approachOwnerId",schemaPath:"#/properties/approachOwnerId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
else {
errors = _errs19;
if(vErrors !== null){
if(_errs19){
vErrors.length = _errs19;
}
else {
vErrors = null;
}
}
}
}
if(data.actionCt !== undefined){
let data5 = data.actionCt;
if(typeof data5 === "string"){
if(func2(data5) > 160){
const err29 = {instancePath:instancePath+"/actionCt",schemaPath:"#/properties/actionCt/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
if(!pattern3.test(data5)){
const err30 = {instancePath:instancePath+"/actionCt",schemaPath:"#/properties/actionCt/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
else {
const err31 = {instancePath:instancePath+"/actionCt",schemaPath:"#/properties/actionCt/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
if(data.grants !== undefined){
let data6 = data.grants;
if(Array.isArray(data6)){
if(data6.length > 64){
const err32 = {instancePath:instancePath+"/grants",schemaPath:"#/properties/grants/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(func2(data7) > 160){
const err33 = {instancePath:instancePath+"/grants/" + i0,schemaPath:"#/properties/grants/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
if(!pattern3.test(data7)){
const err34 = {instancePath:instancePath+"/grants/" + i0,schemaPath:"#/properties/grants/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
else {
const err35 = {instancePath:instancePath+"/grants/" + i0,schemaPath:"#/properties/grants/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
let i1 = data6.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data6[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err36 = {instancePath:instancePath+"/grants",schemaPath:"#/properties/grants/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err37 = {instancePath:instancePath+"/grants",schemaPath:"#/properties/grants/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
if(data.when !== undefined){
if(!(validate85(data.when, {instancePath:instancePath+"/when",parentData:data,parentDataProperty:"when",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate85.errors : vErrors.concat(validate85.errors);
errors = vErrors.length;
}
}
}
else {
const err38 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
validate88.errors = vErrors;
return errors === 0;
}
validate88.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema35 = {"type":"object","properties":{"id":{"type":"string","pattern":"^CT\\.[A-Z0-9_.]+$","maxLength":160},"origin":{"type":"string","enum":["F","C","N"]},"text":{"type":"string"},"slots":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string"},"domain":{"type":"string","enum":["room","person","target","tile","position","sourceTitle","detailTitle","time","mode","question","count","childText","details","action"]}},"required":["name","domain"],"additionalProperties":false},"maxItems":16},"when":{"$ref":"#/$defs/Predicate"},"refs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true}},"required":["id","origin","text","slots","when","refs"],"additionalProperties":false};
const pattern27 = new RegExp("^CT\\.[A-Z0-9_.]+$", "u");

function validate91(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate91.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.origin === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "origin"},message:"must have required property '"+"origin"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.text === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "text"},message:"must have required property '"+"text"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.slots === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "slots"},message:"must have required property '"+"slots"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.when === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "when"},message:"must have required property '"+"when"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.refs === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "refs"},message:"must have required property '"+"refs"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
for(const key0 in data){
if(!((((((key0 === "id") || (key0 === "origin")) || (key0 === "text")) || (key0 === "slots")) || (key0 === "when")) || (key0 === "refs"))){
const err6 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 === "string"){
if(func2(data0) > 160){
const err7 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(!pattern27.test(data0)){
const err8 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^CT\\.[A-Z0-9_.]+$"},message:"must match pattern \""+"^CT\\.[A-Z0-9_.]+$"+"\""};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.origin !== undefined){
let data1 = data.origin;
if(typeof data1 !== "string"){
const err10 = {instancePath:instancePath+"/origin",schemaPath:"#/properties/origin/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(!(((data1 === "F") || (data1 === "C")) || (data1 === "N"))){
const err11 = {instancePath:instancePath+"/origin",schemaPath:"#/properties/origin/enum",keyword:"enum",params:{allowedValues: schema35.properties.origin.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.text !== undefined){
if(typeof data.text !== "string"){
const err12 = {instancePath:instancePath+"/text",schemaPath:"#/properties/text/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.slots !== undefined){
let data3 = data.slots;
if(Array.isArray(data3)){
if(data3.length > 16){
const err13 = {instancePath:instancePath+"/slots",schemaPath:"#/properties/slots/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
const len0 = data3.length;
for(let i0=0; i0<len0; i0++){
let data4 = data3[i0];
if(data4 && typeof data4 == "object" && !Array.isArray(data4)){
if(data4.name === undefined){
const err14 = {instancePath:instancePath+"/slots/" + i0,schemaPath:"#/properties/slots/items/required",keyword:"required",params:{missingProperty: "name"},message:"must have required property '"+"name"+"'"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
if(data4.domain === undefined){
const err15 = {instancePath:instancePath+"/slots/" + i0,schemaPath:"#/properties/slots/items/required",keyword:"required",params:{missingProperty: "domain"},message:"must have required property '"+"domain"+"'"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
for(const key1 in data4){
if(!((key1 === "name") || (key1 === "domain"))){
const err16 = {instancePath:instancePath+"/slots/" + i0,schemaPath:"#/properties/slots/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data4.name !== undefined){
if(typeof data4.name !== "string"){
const err17 = {instancePath:instancePath+"/slots/" + i0+"/name",schemaPath:"#/properties/slots/items/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data4.domain !== undefined){
let data6 = data4.domain;
if(typeof data6 !== "string"){
const err18 = {instancePath:instancePath+"/slots/" + i0+"/domain",schemaPath:"#/properties/slots/items/properties/domain/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if(!((((((((((((((data6 === "room") || (data6 === "person")) || (data6 === "target")) || (data6 === "tile")) || (data6 === "position")) || (data6 === "sourceTitle")) || (data6 === "detailTitle")) || (data6 === "time")) || (data6 === "mode")) || (data6 === "question")) || (data6 === "count")) || (data6 === "childText")) || (data6 === "details")) || (data6 === "action"))){
const err19 = {instancePath:instancePath+"/slots/" + i0+"/domain",schemaPath:"#/properties/slots/items/properties/domain/enum",keyword:"enum",params:{allowedValues: schema35.properties.slots.items.properties.domain.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
}
else {
const err20 = {instancePath:instancePath+"/slots/" + i0,schemaPath:"#/properties/slots/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
}
else {
const err21 = {instancePath:instancePath+"/slots",schemaPath:"#/properties/slots/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.when !== undefined){
if(!(validate85(data.when, {instancePath:instancePath+"/when",parentData:data,parentDataProperty:"when",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate85.errors : vErrors.concat(validate85.errors);
errors = vErrors.length;
}
}
if(data.refs !== undefined){
let data8 = data.refs;
if(Array.isArray(data8)){
if(data8.length > 64){
const err22 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
const len1 = data8.length;
for(let i1=0; i1<len1; i1++){
let data9 = data8[i1];
if(typeof data9 === "string"){
if(func2(data9) > 160){
const err23 = {instancePath:instancePath+"/refs/" + i1,schemaPath:"#/properties/refs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
if(!pattern3.test(data9)){
const err24 = {instancePath:instancePath+"/refs/" + i1,schemaPath:"#/properties/refs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
else {
const err25 = {instancePath:instancePath+"/refs/" + i1,schemaPath:"#/properties/refs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
let i2 = data8.length;
let j0;
if(i2 > 1){
const indices0 = {};
for(;i2--;){
let item0 = data8[i2];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err26 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/uniqueItems",keyword:"uniqueItems",params:{i: i2, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i2+" are identical)"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
break;
}
indices0[item0] = i2;
}
}
}
else {
const err27 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
}
else {
const err28 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
validate91.errors = vErrors;
return errors === 0;
}
validate91.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema36 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"actorId":{"type":"string","enum":["ACT.JO","ACT.REMY","ACT.ARI"]},"topic":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"receivedAll":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"when":{"$ref":"#/$defs/Predicate"},"responseCt":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"grants":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"assistanceLevel":{"type":"integer","minimum":0,"maximum":4}},"required":["id","actorId","topic","receivedAll","when","responseCt","grants","assistanceLevel"],"additionalProperties":false};

function validate94(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate94.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.actorId === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "actorId"},message:"must have required property '"+"actorId"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.topic === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "topic"},message:"must have required property '"+"topic"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.receivedAll === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "receivedAll"},message:"must have required property '"+"receivedAll"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.when === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "when"},message:"must have required property '"+"when"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.responseCt === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "responseCt"},message:"must have required property '"+"responseCt"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.grants === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "grants"},message:"must have required property '"+"grants"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.assistanceLevel === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "assistanceLevel"},message:"must have required property '"+"assistanceLevel"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
for(const key0 in data){
if(!((((((((key0 === "id") || (key0 === "actorId")) || (key0 === "topic")) || (key0 === "receivedAll")) || (key0 === "when")) || (key0 === "responseCt")) || (key0 === "grants")) || (key0 === "assistanceLevel"))){
const err8 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 === "string"){
if(func2(data0) > 160){
const err9 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(!pattern3.test(data0)){
const err10 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
else {
const err11 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.actorId !== undefined){
let data1 = data.actorId;
if(typeof data1 !== "string"){
const err12 = {instancePath:instancePath+"/actorId",schemaPath:"#/properties/actorId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(!(((data1 === "ACT.JO") || (data1 === "ACT.REMY")) || (data1 === "ACT.ARI"))){
const err13 = {instancePath:instancePath+"/actorId",schemaPath:"#/properties/actorId/enum",keyword:"enum",params:{allowedValues: schema36.properties.actorId.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.topic !== undefined){
let data2 = data.topic;
if(typeof data2 === "string"){
if(func2(data2) > 160){
const err14 = {instancePath:instancePath+"/topic",schemaPath:"#/properties/topic/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
if(!pattern3.test(data2)){
const err15 = {instancePath:instancePath+"/topic",schemaPath:"#/properties/topic/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
else {
const err16 = {instancePath:instancePath+"/topic",schemaPath:"#/properties/topic/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.receivedAll !== undefined){
let data3 = data.receivedAll;
if(Array.isArray(data3)){
if(data3.length > 64){
const err17 = {instancePath:instancePath+"/receivedAll",schemaPath:"#/properties/receivedAll/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
const len0 = data3.length;
for(let i0=0; i0<len0; i0++){
let data4 = data3[i0];
if(typeof data4 === "string"){
if(func2(data4) > 160){
const err18 = {instancePath:instancePath+"/receivedAll/" + i0,schemaPath:"#/properties/receivedAll/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if(!pattern3.test(data4)){
const err19 = {instancePath:instancePath+"/receivedAll/" + i0,schemaPath:"#/properties/receivedAll/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
else {
const err20 = {instancePath:instancePath+"/receivedAll/" + i0,schemaPath:"#/properties/receivedAll/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
let i1 = data3.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data3[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err21 = {instancePath:instancePath+"/receivedAll",schemaPath:"#/properties/receivedAll/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err22 = {instancePath:instancePath+"/receivedAll",schemaPath:"#/properties/receivedAll/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
if(data.when !== undefined){
if(!(validate85(data.when, {instancePath:instancePath+"/when",parentData:data,parentDataProperty:"when",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate85.errors : vErrors.concat(validate85.errors);
errors = vErrors.length;
}
}
if(data.responseCt !== undefined){
let data6 = data.responseCt;
if(Array.isArray(data6)){
if(data6.length > 64){
const err23 = {instancePath:instancePath+"/responseCt",schemaPath:"#/properties/responseCt/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
const len1 = data6.length;
for(let i2=0; i2<len1; i2++){
let data7 = data6[i2];
if(typeof data7 === "string"){
if(func2(data7) > 160){
const err24 = {instancePath:instancePath+"/responseCt/" + i2,schemaPath:"#/properties/responseCt/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
if(!pattern3.test(data7)){
const err25 = {instancePath:instancePath+"/responseCt/" + i2,schemaPath:"#/properties/responseCt/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
else {
const err26 = {instancePath:instancePath+"/responseCt/" + i2,schemaPath:"#/properties/responseCt/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
let i3 = data6.length;
let j1;
if(i3 > 1){
const indices1 = {};
for(;i3--;){
let item1 = data6[i3];
if(typeof item1 !== "string"){
continue;
}
if(typeof indices1[item1] == "number"){
j1 = indices1[item1];
const err27 = {instancePath:instancePath+"/responseCt",schemaPath:"#/properties/responseCt/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
break;
}
indices1[item1] = i3;
}
}
}
else {
const err28 = {instancePath:instancePath+"/responseCt",schemaPath:"#/properties/responseCt/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data.grants !== undefined){
let data8 = data.grants;
if(Array.isArray(data8)){
if(data8.length > 64){
const err29 = {instancePath:instancePath+"/grants",schemaPath:"#/properties/grants/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
const len2 = data8.length;
for(let i4=0; i4<len2; i4++){
let data9 = data8[i4];
if(typeof data9 === "string"){
if(func2(data9) > 160){
const err30 = {instancePath:instancePath+"/grants/" + i4,schemaPath:"#/properties/grants/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
if(!pattern3.test(data9)){
const err31 = {instancePath:instancePath+"/grants/" + i4,schemaPath:"#/properties/grants/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
else {
const err32 = {instancePath:instancePath+"/grants/" + i4,schemaPath:"#/properties/grants/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
let i5 = data8.length;
let j2;
if(i5 > 1){
const indices2 = {};
for(;i5--;){
let item2 = data8[i5];
if(typeof item2 !== "string"){
continue;
}
if(typeof indices2[item2] == "number"){
j2 = indices2[item2];
const err33 = {instancePath:instancePath+"/grants",schemaPath:"#/properties/grants/uniqueItems",keyword:"uniqueItems",params:{i: i5, j: j2},message:"must NOT have duplicate items (items ## "+j2+" and "+i5+" are identical)"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
break;
}
indices2[item2] = i5;
}
}
}
else {
const err34 = {instancePath:instancePath+"/grants",schemaPath:"#/properties/grants/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
if(data.assistanceLevel !== undefined){
let data10 = data.assistanceLevel;
if(!(((typeof data10 == "number") && (!(data10 % 1) && !isNaN(data10))) && (isFinite(data10)))){
const err35 = {instancePath:instancePath+"/assistanceLevel",schemaPath:"#/properties/assistanceLevel/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
if((typeof data10 == "number") && (isFinite(data10))){
if(data10 > 4 || isNaN(data10)){
const err36 = {instancePath:instancePath+"/assistanceLevel",schemaPath:"#/properties/assistanceLevel/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4},message:"must be <= 4"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
if(data10 < 0 || isNaN(data10)){
const err37 = {instancePath:instancePath+"/assistanceLevel",schemaPath:"#/properties/assistanceLevel/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
}
}
else {
const err38 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
validate94.errors = vErrors;
return errors === 0;
}
validate94.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema37 = {"type":"object","properties":{"id":{"type":"string","enum":["TILE.FERRY","TILE.BRIDGE","TILE.PLANT","TILE.BLOOM"]},"labelCt":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"descriptionCt":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"storageCell":{"type":"string","enum":["upper-right","lower-right","lower-left","upper-left"]},"rule":{"type":"string","enum":["seed-ferry","joined-crossing","joint-planting","rooted-light"]}},"required":["id","labelCt","descriptionCt","storageCell","rule"],"additionalProperties":false};

function validate97(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate97.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.labelCt === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "labelCt"},message:"must have required property '"+"labelCt"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.descriptionCt === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "descriptionCt"},message:"must have required property '"+"descriptionCt"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.storageCell === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "storageCell"},message:"must have required property '"+"storageCell"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.rule === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "rule"},message:"must have required property '"+"rule"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
for(const key0 in data){
if(!(((((key0 === "id") || (key0 === "labelCt")) || (key0 === "descriptionCt")) || (key0 === "storageCell")) || (key0 === "rule"))){
const err5 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 !== "string"){
const err6 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(!((((data0 === "TILE.FERRY") || (data0 === "TILE.BRIDGE")) || (data0 === "TILE.PLANT")) || (data0 === "TILE.BLOOM"))){
const err7 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/enum",keyword:"enum",params:{allowedValues: schema37.properties.id.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.labelCt !== undefined){
let data1 = data.labelCt;
if(typeof data1 === "string"){
if(func2(data1) > 160){
const err8 = {instancePath:instancePath+"/labelCt",schemaPath:"#/properties/labelCt/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(!pattern3.test(data1)){
const err9 = {instancePath:instancePath+"/labelCt",schemaPath:"#/properties/labelCt/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
else {
const err10 = {instancePath:instancePath+"/labelCt",schemaPath:"#/properties/labelCt/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.descriptionCt !== undefined){
let data2 = data.descriptionCt;
if(typeof data2 === "string"){
if(func2(data2) > 160){
const err11 = {instancePath:instancePath+"/descriptionCt",schemaPath:"#/properties/descriptionCt/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(!pattern3.test(data2)){
const err12 = {instancePath:instancePath+"/descriptionCt",schemaPath:"#/properties/descriptionCt/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/descriptionCt",schemaPath:"#/properties/descriptionCt/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.storageCell !== undefined){
let data3 = data.storageCell;
if(typeof data3 !== "string"){
const err14 = {instancePath:instancePath+"/storageCell",schemaPath:"#/properties/storageCell/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
if(!((((data3 === "upper-right") || (data3 === "lower-right")) || (data3 === "lower-left")) || (data3 === "upper-left"))){
const err15 = {instancePath:instancePath+"/storageCell",schemaPath:"#/properties/storageCell/enum",keyword:"enum",params:{allowedValues: schema37.properties.storageCell.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.rule !== undefined){
let data4 = data.rule;
if(typeof data4 !== "string"){
const err16 = {instancePath:instancePath+"/rule",schemaPath:"#/properties/rule/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
if(!((((data4 === "seed-ferry") || (data4 === "joined-crossing")) || (data4 === "joint-planting")) || (data4 === "rooted-light"))){
const err17 = {instancePath:instancePath+"/rule",schemaPath:"#/properties/rule/enum",keyword:"enum",params:{allowedValues: schema37.properties.rule.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
}
else {
const err18 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
validate97.errors = vErrors;
return errors === 0;
}
validate97.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema38 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"contentCt":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"tag":{"$ref":"#/$defs/InterpretationTag"},"requires":{"$ref":"#/$defs/Predicate"},"referenceOptions":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"introduces":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"level":{"type":"integer","minimum":1,"maximum":4}},"required":["id","contentCt","tag","requires","referenceOptions","introduces","level"],"additionalProperties":false};
const schema39 = {"type":"string","enum":["scope_confusion","unsupported_destination","goal_incomplete","capacity","prerequisite","valid_plan","unclear","off_topic"]};

function validate100(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate100.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(typeof data !== "string"){
const err0 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(!((((((((data === "scope_confusion") || (data === "unsupported_destination")) || (data === "goal_incomplete")) || (data === "capacity")) || (data === "prerequisite")) || (data === "valid_plan")) || (data === "unclear")) || (data === "off_topic"))){
const err1 = {instancePath,schemaPath:"#/enum",keyword:"enum",params:{allowedValues: schema39.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
validate100.errors = vErrors;
return errors === 0;
}
validate100.evaluated = {"dynamicProps":false,"dynamicItems":false};


function validate99(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate99.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.contentCt === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "contentCt"},message:"must have required property '"+"contentCt"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.tag === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "tag"},message:"must have required property '"+"tag"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.requires === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "requires"},message:"must have required property '"+"requires"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.referenceOptions === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "referenceOptions"},message:"must have required property '"+"referenceOptions"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.introduces === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "introduces"},message:"must have required property '"+"introduces"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.level === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "level"},message:"must have required property '"+"level"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
for(const key0 in data){
if(!(((((((key0 === "id") || (key0 === "contentCt")) || (key0 === "tag")) || (key0 === "requires")) || (key0 === "referenceOptions")) || (key0 === "introduces")) || (key0 === "level"))){
const err7 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 === "string"){
if(func2(data0) > 160){
const err8 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(!pattern3.test(data0)){
const err9 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
else {
const err10 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.contentCt !== undefined){
let data1 = data.contentCt;
if(typeof data1 === "string"){
if(func2(data1) > 160){
const err11 = {instancePath:instancePath+"/contentCt",schemaPath:"#/properties/contentCt/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(!pattern3.test(data1)){
const err12 = {instancePath:instancePath+"/contentCt",schemaPath:"#/properties/contentCt/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/contentCt",schemaPath:"#/properties/contentCt/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.tag !== undefined){
if(!(validate100(data.tag, {instancePath:instancePath+"/tag",parentData:data,parentDataProperty:"tag",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate100.errors : vErrors.concat(validate100.errors);
errors = vErrors.length;
}
}
if(data.requires !== undefined){
if(!(validate85(data.requires, {instancePath:instancePath+"/requires",parentData:data,parentDataProperty:"requires",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate85.errors : vErrors.concat(validate85.errors);
errors = vErrors.length;
}
}
if(data.referenceOptions !== undefined){
let data4 = data.referenceOptions;
if(Array.isArray(data4)){
if(data4.length > 64){
const err14 = {instancePath:instancePath+"/referenceOptions",schemaPath:"#/properties/referenceOptions/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
const len0 = data4.length;
for(let i0=0; i0<len0; i0++){
let data5 = data4[i0];
if(typeof data5 === "string"){
if(func2(data5) > 160){
const err15 = {instancePath:instancePath+"/referenceOptions/" + i0,schemaPath:"#/properties/referenceOptions/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(!pattern3.test(data5)){
const err16 = {instancePath:instancePath+"/referenceOptions/" + i0,schemaPath:"#/properties/referenceOptions/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
else {
const err17 = {instancePath:instancePath+"/referenceOptions/" + i0,schemaPath:"#/properties/referenceOptions/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
let i1 = data4.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data4[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err18 = {instancePath:instancePath+"/referenceOptions",schemaPath:"#/properties/referenceOptions/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err19 = {instancePath:instancePath+"/referenceOptions",schemaPath:"#/properties/referenceOptions/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.introduces !== undefined){
let data6 = data.introduces;
if(Array.isArray(data6)){
if(data6.length > 64){
const err20 = {instancePath:instancePath+"/introduces",schemaPath:"#/properties/introduces/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
const len1 = data6.length;
for(let i2=0; i2<len1; i2++){
let data7 = data6[i2];
if(typeof data7 === "string"){
if(func2(data7) > 160){
const err21 = {instancePath:instancePath+"/introduces/" + i2,schemaPath:"#/properties/introduces/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
if(!pattern3.test(data7)){
const err22 = {instancePath:instancePath+"/introduces/" + i2,schemaPath:"#/properties/introduces/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
else {
const err23 = {instancePath:instancePath+"/introduces/" + i2,schemaPath:"#/properties/introduces/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
let i3 = data6.length;
let j1;
if(i3 > 1){
const indices1 = {};
for(;i3--;){
let item1 = data6[i3];
if(typeof item1 !== "string"){
continue;
}
if(typeof indices1[item1] == "number"){
j1 = indices1[item1];
const err24 = {instancePath:instancePath+"/introduces",schemaPath:"#/properties/introduces/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
break;
}
indices1[item1] = i3;
}
}
}
else {
const err25 = {instancePath:instancePath+"/introduces",schemaPath:"#/properties/introduces/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data.level !== undefined){
let data8 = data.level;
if(!(((typeof data8 == "number") && (!(data8 % 1) && !isNaN(data8))) && (isFinite(data8)))){
const err26 = {instancePath:instancePath+"/level",schemaPath:"#/properties/level/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
if((typeof data8 == "number") && (isFinite(data8))){
if(data8 > 4 || isNaN(data8)){
const err27 = {instancePath:instancePath+"/level",schemaPath:"#/properties/level/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4},message:"must be <= 4"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
if(data8 < 1 || isNaN(data8)){
const err28 = {instancePath:instancePath+"/level",schemaPath:"#/properties/level/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
}
}
else {
const err29 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
validate99.errors = vErrors;
return errors === 0;
}
validate99.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema40 = {"type":"object","properties":{"slot":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"ownerId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"role":{"type":"string","enum":["background","foreground","actor","prop","puppet","ui","audio"]},"logicalBounds":{"$ref":"#/$defs/Rect"},"anchor":{"$ref":"#/$defs/UnitAnchor"},"critical":{"type":"boolean"},"manifestAssetId":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]}},"required":["slot","ownerId","role","logicalBounds","anchor","critical","manifestAssetId"],"additionalProperties":false};
const schema41 = {"type":"array","prefixItems":[{"type":"number","minimum":0,"maximum":1},{"type":"number","minimum":0,"maximum":1}],"items":false,"minItems":2,"maxItems":2};

function validate106(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate106.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(Array.isArray(data)){
if(data.length > 2){
const err0 = {instancePath,schemaPath:"#/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.length < 2){
const err1 = {instancePath,schemaPath:"#/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
const len0 = data.length;
if(len0 > 0){
let data0 = data[0];
if((typeof data0 == "number") && (isFinite(data0))){
if(data0 > 1 || isNaN(data0)){
const err2 = {instancePath:instancePath+"/0",schemaPath:"#/prefixItems/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data0 < 0 || isNaN(data0)){
const err3 = {instancePath:instancePath+"/0",schemaPath:"#/prefixItems/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
else {
const err4 = {instancePath:instancePath+"/0",schemaPath:"#/prefixItems/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(len0 > 1){
let data1 = data[1];
if((typeof data1 == "number") && (isFinite(data1))){
if(data1 > 1 || isNaN(data1)){
const err5 = {instancePath:instancePath+"/1",schemaPath:"#/prefixItems/1/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data1 < 0 || isNaN(data1)){
const err6 = {instancePath:instancePath+"/1",schemaPath:"#/prefixItems/1/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
else {
const err7 = {instancePath:instancePath+"/1",schemaPath:"#/prefixItems/1/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
const len1 = data.length;
if(!(len1 <= 2)){
const err8 = {instancePath,schemaPath:"#/items",keyword:"items",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
validate106.errors = vErrors;
return errors === 0;
}
validate106.evaluated = {"items":true,"dynamicProps":false,"dynamicItems":false};


function validate104(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate104.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.slot === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "slot"},message:"must have required property '"+"slot"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.ownerId === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "ownerId"},message:"must have required property '"+"ownerId"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.role === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "role"},message:"must have required property '"+"role"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.logicalBounds === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "logicalBounds"},message:"must have required property '"+"logicalBounds"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.anchor === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "anchor"},message:"must have required property '"+"anchor"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.critical === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "critical"},message:"must have required property '"+"critical"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.manifestAssetId === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "manifestAssetId"},message:"must have required property '"+"manifestAssetId"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
for(const key0 in data){
if(!(((((((key0 === "slot") || (key0 === "ownerId")) || (key0 === "role")) || (key0 === "logicalBounds")) || (key0 === "anchor")) || (key0 === "critical")) || (key0 === "manifestAssetId"))){
const err7 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.slot !== undefined){
let data0 = data.slot;
if(typeof data0 === "string"){
if(func2(data0) > 160){
const err8 = {instancePath:instancePath+"/slot",schemaPath:"#/properties/slot/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(!pattern3.test(data0)){
const err9 = {instancePath:instancePath+"/slot",schemaPath:"#/properties/slot/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
else {
const err10 = {instancePath:instancePath+"/slot",schemaPath:"#/properties/slot/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.ownerId !== undefined){
let data1 = data.ownerId;
if(typeof data1 === "string"){
if(func2(data1) > 160){
const err11 = {instancePath:instancePath+"/ownerId",schemaPath:"#/properties/ownerId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(!pattern3.test(data1)){
const err12 = {instancePath:instancePath+"/ownerId",schemaPath:"#/properties/ownerId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/ownerId",schemaPath:"#/properties/ownerId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.role !== undefined){
let data2 = data.role;
if(typeof data2 !== "string"){
const err14 = {instancePath:instancePath+"/role",schemaPath:"#/properties/role/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
if(!(((((((data2 === "background") || (data2 === "foreground")) || (data2 === "actor")) || (data2 === "prop")) || (data2 === "puppet")) || (data2 === "ui")) || (data2 === "audio"))){
const err15 = {instancePath:instancePath+"/role",schemaPath:"#/properties/role/enum",keyword:"enum",params:{allowedValues: schema40.properties.role.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.logicalBounds !== undefined){
if(!(validate58(data.logicalBounds, {instancePath:instancePath+"/logicalBounds",parentData:data,parentDataProperty:"logicalBounds",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate58.errors : vErrors.concat(validate58.errors);
errors = vErrors.length;
}
}
if(data.anchor !== undefined){
if(!(validate106(data.anchor, {instancePath:instancePath+"/anchor",parentData:data,parentDataProperty:"anchor",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate106.errors : vErrors.concat(validate106.errors);
errors = vErrors.length;
}
}
if(data.critical !== undefined){
if(typeof data.critical !== "boolean"){
const err16 = {instancePath:instancePath+"/critical",schemaPath:"#/properties/critical/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.manifestAssetId !== undefined){
let data6 = data.manifestAssetId;
const _errs13 = errors;
let valid1 = false;
const _errs14 = errors;
if(typeof data6 === "string"){
if(func2(data6) > 160){
const err17 = {instancePath:instancePath+"/manifestAssetId",schemaPath:"#/properties/manifestAssetId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(!pattern3.test(data6)){
const err18 = {instancePath:instancePath+"/manifestAssetId",schemaPath:"#/properties/manifestAssetId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
else {
const err19 = {instancePath:instancePath+"/manifestAssetId",schemaPath:"#/properties/manifestAssetId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
var _valid0 = _errs14 === errors;
valid1 = valid1 || _valid0;
const _errs16 = errors;
if(data6 !== null){
const err20 = {instancePath:instancePath+"/manifestAssetId",schemaPath:"#/properties/manifestAssetId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
var _valid0 = _errs16 === errors;
valid1 = valid1 || _valid0;
if(!valid1){
const err21 = {instancePath:instancePath+"/manifestAssetId",schemaPath:"#/properties/manifestAssetId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
else {
errors = _errs13;
if(vErrors !== null){
if(_errs13){
vErrors.length = _errs13;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err22 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
validate104.errors = vErrors;
return errors === 0;
}
validate104.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate187(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate187.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.contractKind === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "contractKind"},message:"must have required property '"+"contractKind"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.identity === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "identity"},message:"must have required property '"+"identity"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.completeness === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "completeness"},message:"must have required property '"+"completeness"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.rooms === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "rooms"},message:"must have required property '"+"rooms"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.objects === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "objects"},message:"must have required property '"+"objects"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.actors === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "actors"},message:"must have required property '"+"actors"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.doors === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "doors"},message:"must have required property '"+"doors"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.sources === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "sources"},message:"must have required property '"+"sources"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.copies === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "copies"},message:"must have required property '"+"copies"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(data.accesses === undefined){
const err9 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "accesses"},message:"must have required property '"+"accesses"+"'"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(data.texts === undefined){
const err10 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "texts"},message:"must have required property '"+"texts"+"'"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(data.npcBranches === undefined){
const err11 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "npcBranches"},message:"must have required property '"+"npcBranches"+"'"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(data.tiles === undefined){
const err12 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "tiles"},message:"must have required property '"+"tiles"+"'"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(data.coachingMoves === undefined){
const err13 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "coachingMoves"},message:"must have required property '"+"coachingMoves"+"'"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(data.assetUses === undefined){
const err14 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "assetUses"},message:"must have required property '"+"assetUses"+"'"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema21.properties, key0))){
const err15 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.contractKind !== undefined){
if("AuthoredContent" !== data.contractKind){
const err16 = {instancePath:instancePath+"/contractKind",schemaPath:"#/properties/contractKind/const",keyword:"const",params:{allowedValue: "AuthoredContent"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.identity !== undefined){
if(!(validate55(data.identity, {instancePath:instancePath+"/identity",parentData:data,parentDataProperty:"identity",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate55.errors : vErrors.concat(validate55.errors);
errors = vErrors.length;
}
}
if(data.completeness !== undefined){
let data2 = data.completeness;
if(typeof data2 !== "string"){
const err17 = {instancePath:instancePath+"/completeness",schemaPath:"#/properties/completeness/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(!((data2 === "full") || (data2 === "example-fragment"))){
const err18 = {instancePath:instancePath+"/completeness",schemaPath:"#/properties/completeness/enum",keyword:"enum",params:{allowedValues: schema21.properties.completeness.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(data.rooms !== undefined){
let data3 = data.rooms;
if(Array.isArray(data3)){
if(data3.length > 4){
const err19 = {instancePath:instancePath+"/rooms",schemaPath:"#/properties/rooms/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
const len0 = data3.length;
for(let i0=0; i0<len0; i0++){
if(!(validate57(data3[i0], {instancePath:instancePath+"/rooms/" + i0,parentData:data3,parentDataProperty:i0,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate57.errors : vErrors.concat(validate57.errors);
errors = vErrors.length;
}
}
}
else {
const err20 = {instancePath:instancePath+"/rooms",schemaPath:"#/properties/rooms/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
if(data.objects !== undefined){
let data5 = data.objects;
if(Array.isArray(data5)){
if(data5.length > 256){
const err21 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/maxItems",keyword:"maxItems",params:{limit: 256},message:"must NOT have more than 256 items"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
const len1 = data5.length;
for(let i1=0; i1<len1; i1++){
if(!(validate64(data5[i1], {instancePath:instancePath+"/objects/" + i1,parentData:data5,parentDataProperty:i1,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate64.errors : vErrors.concat(validate64.errors);
errors = vErrors.length;
}
}
}
else {
const err22 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
if(data.actors !== undefined){
let data7 = data.actors;
if(Array.isArray(data7)){
if(data7.length > 5){
const err23 = {instancePath:instancePath+"/actors",schemaPath:"#/properties/actors/maxItems",keyword:"maxItems",params:{limit: 5},message:"must NOT have more than 5 items"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
const len2 = data7.length;
for(let i2=0; i2<len2; i2++){
if(!(validate69(data7[i2], {instancePath:instancePath+"/actors/" + i2,parentData:data7,parentDataProperty:i2,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate69.errors : vErrors.concat(validate69.errors);
errors = vErrors.length;
}
}
}
else {
const err24 = {instancePath:instancePath+"/actors",schemaPath:"#/properties/actors/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data.doors !== undefined){
let data9 = data.doors;
if(Array.isArray(data9)){
if(data9.length > 8){
const err25 = {instancePath:instancePath+"/doors",schemaPath:"#/properties/doors/maxItems",keyword:"maxItems",params:{limit: 8},message:"must NOT have more than 8 items"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
const len3 = data9.length;
for(let i3=0; i3<len3; i3++){
if(!(validate72(data9[i3], {instancePath:instancePath+"/doors/" + i3,parentData:data9,parentDataProperty:i3,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate72.errors : vErrors.concat(validate72.errors);
errors = vErrors.length;
}
}
}
else {
const err26 = {instancePath:instancePath+"/doors",schemaPath:"#/properties/doors/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
if(data.sources !== undefined){
let data11 = data.sources;
if(Array.isArray(data11)){
if(data11.length > 9){
const err27 = {instancePath:instancePath+"/sources",schemaPath:"#/properties/sources/maxItems",keyword:"maxItems",params:{limit: 9},message:"must NOT have more than 9 items"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
const len4 = data11.length;
for(let i4=0; i4<len4; i4++){
if(!(validate78(data11[i4], {instancePath:instancePath+"/sources/" + i4,parentData:data11,parentDataProperty:i4,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate78.errors : vErrors.concat(validate78.errors);
errors = vErrors.length;
}
}
}
else {
const err28 = {instancePath:instancePath+"/sources",schemaPath:"#/properties/sources/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data.copies !== undefined){
let data13 = data.copies;
if(Array.isArray(data13)){
if(data13.length > 64){
const err29 = {instancePath:instancePath+"/copies",schemaPath:"#/properties/copies/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
const len5 = data13.length;
for(let i5=0; i5<len5; i5++){
if(!(validate84(data13[i5], {instancePath:instancePath+"/copies/" + i5,parentData:data13,parentDataProperty:i5,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate84.errors : vErrors.concat(validate84.errors);
errors = vErrors.length;
}
}
}
else {
const err30 = {instancePath:instancePath+"/copies",schemaPath:"#/properties/copies/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data.accesses !== undefined){
let data15 = data.accesses;
if(Array.isArray(data15)){
if(data15.length > 256){
const err31 = {instancePath:instancePath+"/accesses",schemaPath:"#/properties/accesses/maxItems",keyword:"maxItems",params:{limit: 256},message:"must NOT have more than 256 items"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
const len6 = data15.length;
for(let i6=0; i6<len6; i6++){
if(!(validate88(data15[i6], {instancePath:instancePath+"/accesses/" + i6,parentData:data15,parentDataProperty:i6,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate88.errors : vErrors.concat(validate88.errors);
errors = vErrors.length;
}
}
}
else {
const err32 = {instancePath:instancePath+"/accesses",schemaPath:"#/properties/accesses/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
if(data.texts !== undefined){
let data17 = data.texts;
if(Array.isArray(data17)){
if(data17.length > 1024){
const err33 = {instancePath:instancePath+"/texts",schemaPath:"#/properties/texts/maxItems",keyword:"maxItems",params:{limit: 1024},message:"must NOT have more than 1024 items"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
const len7 = data17.length;
for(let i7=0; i7<len7; i7++){
if(!(validate91(data17[i7], {instancePath:instancePath+"/texts/" + i7,parentData:data17,parentDataProperty:i7,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate91.errors : vErrors.concat(validate91.errors);
errors = vErrors.length;
}
}
}
else {
const err34 = {instancePath:instancePath+"/texts",schemaPath:"#/properties/texts/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
if(data.npcBranches !== undefined){
let data19 = data.npcBranches;
if(Array.isArray(data19)){
if(data19.length > 128){
const err35 = {instancePath:instancePath+"/npcBranches",schemaPath:"#/properties/npcBranches/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
const len8 = data19.length;
for(let i8=0; i8<len8; i8++){
if(!(validate94(data19[i8], {instancePath:instancePath+"/npcBranches/" + i8,parentData:data19,parentDataProperty:i8,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate94.errors : vErrors.concat(validate94.errors);
errors = vErrors.length;
}
}
}
else {
const err36 = {instancePath:instancePath+"/npcBranches",schemaPath:"#/properties/npcBranches/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
if(data.tiles !== undefined){
let data21 = data.tiles;
if(Array.isArray(data21)){
if(data21.length > 4){
const err37 = {instancePath:instancePath+"/tiles",schemaPath:"#/properties/tiles/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
const len9 = data21.length;
for(let i9=0; i9<len9; i9++){
if(!(validate97(data21[i9], {instancePath:instancePath+"/tiles/" + i9,parentData:data21,parentDataProperty:i9,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate97.errors : vErrors.concat(validate97.errors);
errors = vErrors.length;
}
}
}
else {
const err38 = {instancePath:instancePath+"/tiles",schemaPath:"#/properties/tiles/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
if(data.coachingMoves !== undefined){
let data23 = data.coachingMoves;
if(Array.isArray(data23)){
if(data23.length > 64){
const err39 = {instancePath:instancePath+"/coachingMoves",schemaPath:"#/properties/coachingMoves/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
const len10 = data23.length;
for(let i10=0; i10<len10; i10++){
if(!(validate99(data23[i10], {instancePath:instancePath+"/coachingMoves/" + i10,parentData:data23,parentDataProperty:i10,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate99.errors : vErrors.concat(validate99.errors);
errors = vErrors.length;
}
}
}
else {
const err40 = {instancePath:instancePath+"/coachingMoves",schemaPath:"#/properties/coachingMoves/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
if(data.assetUses !== undefined){
let data25 = data.assetUses;
if(Array.isArray(data25)){
if(data25.length > 512){
const err41 = {instancePath:instancePath+"/assetUses",schemaPath:"#/properties/assetUses/maxItems",keyword:"maxItems",params:{limit: 512},message:"must NOT have more than 512 items"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
const len11 = data25.length;
for(let i11=0; i11<len11; i11++){
if(!(validate104(data25[i11], {instancePath:instancePath+"/assetUses/" + i11,parentData:data25,parentDataProperty:i11,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate104.errors : vErrors.concat(validate104.errors);
errors = vErrors.length;
}
}
}
else {
const err42 = {instancePath:instancePath+"/assetUses",schemaPath:"#/properties/assetUses/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
}
}
else {
const err43 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
validate187.errors = vErrors;
return errors === 0;
}
validate187.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate52(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:evidence-quest:AuthoredContent" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate52.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(!(validate187(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate187.errors : vErrors.concat(validate187.errors);
errors = vErrors.length;
}
validate52.errors = vErrors;
return errors === 0;
}
validate52.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const validateCaseSnapshot = validate202;
const schema68 = {"$id":"urn:evidence-quest:CaseSnapshot","$ref":"https://evidence-quest.invalid/contracts/v1#/$defs/CaseSnapshot"};
const schema42 = {"type":"object","properties":{"contractKind":{"const":"CaseSnapshot"},"identity":{"$ref":"#/$defs/Identity"},"state":{"$ref":"#/$defs/CaseState"}},"required":["contractKind","identity","state"],"additionalProperties":false};
const schema43 = {"type":"object","properties":{"caseRunId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"lastObservationSeq":{"type":"integer","minimum":0,"maximum":9007199254740991},"physical":{"$ref":"#/$defs/Physical"},"grants":{"type":"array","items":{"$ref":"#/$defs/Grant"}},"exposures":{"type":"array","items":{"$ref":"#/$defs/Exposure"}},"selectedLead":{"anyOf":[{"type":"string","enum":["where-loop","cancellation","recording","story-plan"]},{"type":"null"}]},"comparisons":{"type":"array","items":{"$ref":"#/$defs/Comparison"}},"drafts":{"type":"array","items":{"$ref":"#/$defs/Draft"},"maxItems":5},"records":{"type":"array","items":{"$ref":"#/$defs/Record"}},"npcReceived":{"type":"array","items":{"type":"object","properties":{"actorId":{"type":"string","enum":["ACT.JO","ACT.REMY","ACT.ARI"]},"refs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"deliveryRecordIds":{"type":"array","items":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36}}},"required":["actorId","refs","deliveryRecordIds"],"additionalProperties":false},"maxItems":3},"playback":{"anyOf":[{"$ref":"#/$defs/Run"},{"type":"null"}]},"runHistory":{"type":"array","items":{"$ref":"#/$defs/Run"}},"certificate":{"anyOf":[{"$ref":"#/$defs/Certificate"},{"type":"null"}]},"premiere":{"anyOf":[{"$ref":"#/$defs/Premiere"},{"type":"null"}]},"observations":{"type":"array","items":{"$ref":"#/$defs/Observation"}},"readerResume":{"anyOf":[{"$ref":"#/$defs/ReaderResume"},{"type":"null"}]},"worldReturn":{"$ref":"#/$defs/ReturnOwner"},"historyUncertain":{"type":"boolean"},"guidance":{"type":"object","properties":{"openingDismissed":{"type":"boolean"},"movementDismissed":{"type":"boolean"},"ariInvitationDismissed":{"type":"boolean"}},"required":["openingDismissed","movementDismissed","ariInvitationDismissed"],"additionalProperties":false},"visitedRooms":{"type":"array","items":{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]}},"encounteredActors":{"type":"array","items":{"type":"string","enum":["ACT.JO","ACT.REMY","ACT.ARI","ACT.LOOP"]}},"coachingHistory":{"type":"array","items":{"type":"object","properties":{"requestId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"submittedRecordId":{"anyOf":[{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},{"type":"null"}]},"context":{"$ref":"#/$defs/Context"},"contentIds":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"selection":{"anyOf":[{"$ref":"#/$defs/CoachSelection"},{"type":"null"}]},"origin":{"type":"string","enum":["live-selection","authored-topic","authored-fallback","authored-direct"]},"displayedSeq":{"anyOf":[{"type":"integer","minimum":0},{"type":"null"}]}},"required":["requestId","submittedRecordId","context","contentIds","selection","origin","displayedSeq"],"additionalProperties":false}},"experience":{"$ref":"#/$defs/Experience"}},"required":["caseRunId","revision","lastObservationSeq","physical","grants","exposures","selectedLead","comparisons","drafts","records","npcReceived","playback","runHistory","certificate","premiere","observations","readerResume","worldReturn","historyUncertain","guidance","visitedRooms","encounteredActors","coachingHistory"],"additionalProperties":false};
const pattern43 = new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$", "u");
const schema44 = {"type":"object","properties":{"room":{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]},"avatar":{"$ref":"#/$defs/Point"},"facing":{"type":"string","enum":["up","down","left","right"]},"loop":{"type":"object","properties":{"room":{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]},"feet":{"$ref":"#/$defs/Point"},"mode":{"type":"string","enum":["standby","following","docked","projecting"]}},"required":["room","feet","mode"],"additionalProperties":false},"objects":{"type":"object","properties":{"modelTabTried":{"type":"boolean"},"briefOpen":{"type":"boolean"},"storyNoteOpen":{"type":"boolean"},"filmingRequestOpen":{"type":"boolean"},"noticeFlat":{"type":"boolean"},"dockFlapOpen":{"type":"boolean"},"rackOpened":{"type":"boolean"},"previewTried":{"type":"boolean"},"toastRevealed":{"type":"boolean"}},"required":["modelTabTried","briefOpen","storyNoteOpen","filmingRequestOpen","noticeFlat","dockFlapOpen","rackOpened","previewTried","toastRevealed"],"additionalProperties":false},"caddyHost":{"type":"string","enum":["MD.RACK.STATION","ACT.PLAYER","ST.RACK.BAY"]},"order":{"$ref":"#/$defs/Order"},"arrangementRevision":{"type":"integer","minimum":0,"maximum":9007199254740991}},"required":["room","avatar","facing","loop","objects","caddyHost","order","arrangementRevision"],"additionalProperties":false};
const schema45 = {"type":"array","items":{"type":"string","enum":["TILE.FERRY","TILE.BRIDGE","TILE.PLANT","TILE.BLOOM"]},"maxItems":4,"uniqueItems":true};

function validate116(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate116.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(Array.isArray(data)){
if(data.length > 4){
const err0 = {instancePath,schemaPath:"#/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
const len0 = data.length;
for(let i0=0; i0<len0; i0++){
let data0 = data[i0];
if(typeof data0 !== "string"){
const err1 = {instancePath:instancePath+"/" + i0,schemaPath:"#/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(!((((data0 === "TILE.FERRY") || (data0 === "TILE.BRIDGE")) || (data0 === "TILE.PLANT")) || (data0 === "TILE.BLOOM"))){
const err2 = {instancePath:instancePath+"/" + i0,schemaPath:"#/items/enum",keyword:"enum",params:{allowedValues: schema45.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
let i1 = data.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err3 = {instancePath,schemaPath:"#/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err4 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
validate116.errors = vErrors;
return errors === 0;
}
validate116.evaluated = {"items":true,"dynamicProps":false,"dynamicItems":false};


function validate113(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate113.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.room === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "room"},message:"must have required property '"+"room"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.avatar === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "avatar"},message:"must have required property '"+"avatar"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.facing === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "facing"},message:"must have required property '"+"facing"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.loop === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "loop"},message:"must have required property '"+"loop"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.objects === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "objects"},message:"must have required property '"+"objects"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.caddyHost === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "caddyHost"},message:"must have required property '"+"caddyHost"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.order === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "order"},message:"must have required property '"+"order"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.arrangementRevision === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "arrangementRevision"},message:"must have required property '"+"arrangementRevision"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
for(const key0 in data){
if(!((((((((key0 === "room") || (key0 === "avatar")) || (key0 === "facing")) || (key0 === "loop")) || (key0 === "objects")) || (key0 === "caddyHost")) || (key0 === "order")) || (key0 === "arrangementRevision"))){
const err8 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.room !== undefined){
let data0 = data.room;
if(typeof data0 !== "string"){
const err9 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(!((((data0 === "SC.ST") || (data0 === "SC.CY")) || (data0 === "SC.WK")) || (data0 === "SC.MD"))){
const err10 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/enum",keyword:"enum",params:{allowedValues: schema44.properties.room.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.avatar !== undefined){
if(!(validate60(data.avatar, {instancePath:instancePath+"/avatar",parentData:data,parentDataProperty:"avatar",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate60.errors : vErrors.concat(validate60.errors);
errors = vErrors.length;
}
}
if(data.facing !== undefined){
let data2 = data.facing;
if(typeof data2 !== "string"){
const err11 = {instancePath:instancePath+"/facing",schemaPath:"#/properties/facing/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(!((((data2 === "up") || (data2 === "down")) || (data2 === "left")) || (data2 === "right"))){
const err12 = {instancePath:instancePath+"/facing",schemaPath:"#/properties/facing/enum",keyword:"enum",params:{allowedValues: schema44.properties.facing.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.loop !== undefined){
let data3 = data.loop;
if(data3 && typeof data3 == "object" && !Array.isArray(data3)){
if(data3.room === undefined){
const err13 = {instancePath:instancePath+"/loop",schemaPath:"#/properties/loop/required",keyword:"required",params:{missingProperty: "room"},message:"must have required property '"+"room"+"'"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(data3.feet === undefined){
const err14 = {instancePath:instancePath+"/loop",schemaPath:"#/properties/loop/required",keyword:"required",params:{missingProperty: "feet"},message:"must have required property '"+"feet"+"'"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
if(data3.mode === undefined){
const err15 = {instancePath:instancePath+"/loop",schemaPath:"#/properties/loop/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
for(const key1 in data3){
if(!(((key1 === "room") || (key1 === "feet")) || (key1 === "mode"))){
const err16 = {instancePath:instancePath+"/loop",schemaPath:"#/properties/loop/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data3.room !== undefined){
let data4 = data3.room;
if(typeof data4 !== "string"){
const err17 = {instancePath:instancePath+"/loop/room",schemaPath:"#/properties/loop/properties/room/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(!((((data4 === "SC.ST") || (data4 === "SC.CY")) || (data4 === "SC.WK")) || (data4 === "SC.MD"))){
const err18 = {instancePath:instancePath+"/loop/room",schemaPath:"#/properties/loop/properties/room/enum",keyword:"enum",params:{allowedValues: schema44.properties.loop.properties.room.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(data3.feet !== undefined){
if(!(validate60(data3.feet, {instancePath:instancePath+"/loop/feet",parentData:data3,parentDataProperty:"feet",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate60.errors : vErrors.concat(validate60.errors);
errors = vErrors.length;
}
}
if(data3.mode !== undefined){
let data6 = data3.mode;
if(typeof data6 !== "string"){
const err19 = {instancePath:instancePath+"/loop/mode",schemaPath:"#/properties/loop/properties/mode/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
if(!((((data6 === "standby") || (data6 === "following")) || (data6 === "docked")) || (data6 === "projecting"))){
const err20 = {instancePath:instancePath+"/loop/mode",schemaPath:"#/properties/loop/properties/mode/enum",keyword:"enum",params:{allowedValues: schema44.properties.loop.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
}
else {
const err21 = {instancePath:instancePath+"/loop",schemaPath:"#/properties/loop/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.objects !== undefined){
let data7 = data.objects;
if(data7 && typeof data7 == "object" && !Array.isArray(data7)){
if(data7.modelTabTried === undefined){
const err22 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/required",keyword:"required",params:{missingProperty: "modelTabTried"},message:"must have required property '"+"modelTabTried"+"'"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
if(data7.briefOpen === undefined){
const err23 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/required",keyword:"required",params:{missingProperty: "briefOpen"},message:"must have required property '"+"briefOpen"+"'"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
if(data7.storyNoteOpen === undefined){
const err24 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/required",keyword:"required",params:{missingProperty: "storyNoteOpen"},message:"must have required property '"+"storyNoteOpen"+"'"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
if(data7.filmingRequestOpen === undefined){
const err25 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/required",keyword:"required",params:{missingProperty: "filmingRequestOpen"},message:"must have required property '"+"filmingRequestOpen"+"'"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
if(data7.noticeFlat === undefined){
const err26 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/required",keyword:"required",params:{missingProperty: "noticeFlat"},message:"must have required property '"+"noticeFlat"+"'"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
if(data7.dockFlapOpen === undefined){
const err27 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/required",keyword:"required",params:{missingProperty: "dockFlapOpen"},message:"must have required property '"+"dockFlapOpen"+"'"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
if(data7.rackOpened === undefined){
const err28 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/required",keyword:"required",params:{missingProperty: "rackOpened"},message:"must have required property '"+"rackOpened"+"'"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
if(data7.previewTried === undefined){
const err29 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/required",keyword:"required",params:{missingProperty: "previewTried"},message:"must have required property '"+"previewTried"+"'"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
if(data7.toastRevealed === undefined){
const err30 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/required",keyword:"required",params:{missingProperty: "toastRevealed"},message:"must have required property '"+"toastRevealed"+"'"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
for(const key2 in data7){
if(!(func1.call(schema44.properties.objects.properties, key2))){
const err31 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
if(data7.modelTabTried !== undefined){
if(typeof data7.modelTabTried !== "boolean"){
const err32 = {instancePath:instancePath+"/objects/modelTabTried",schemaPath:"#/properties/objects/properties/modelTabTried/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
if(data7.briefOpen !== undefined){
if(typeof data7.briefOpen !== "boolean"){
const err33 = {instancePath:instancePath+"/objects/briefOpen",schemaPath:"#/properties/objects/properties/briefOpen/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
if(data7.storyNoteOpen !== undefined){
if(typeof data7.storyNoteOpen !== "boolean"){
const err34 = {instancePath:instancePath+"/objects/storyNoteOpen",schemaPath:"#/properties/objects/properties/storyNoteOpen/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
if(data7.filmingRequestOpen !== undefined){
if(typeof data7.filmingRequestOpen !== "boolean"){
const err35 = {instancePath:instancePath+"/objects/filmingRequestOpen",schemaPath:"#/properties/objects/properties/filmingRequestOpen/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
if(data7.noticeFlat !== undefined){
if(typeof data7.noticeFlat !== "boolean"){
const err36 = {instancePath:instancePath+"/objects/noticeFlat",schemaPath:"#/properties/objects/properties/noticeFlat/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
if(data7.dockFlapOpen !== undefined){
if(typeof data7.dockFlapOpen !== "boolean"){
const err37 = {instancePath:instancePath+"/objects/dockFlapOpen",schemaPath:"#/properties/objects/properties/dockFlapOpen/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
if(data7.rackOpened !== undefined){
if(typeof data7.rackOpened !== "boolean"){
const err38 = {instancePath:instancePath+"/objects/rackOpened",schemaPath:"#/properties/objects/properties/rackOpened/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
if(data7.previewTried !== undefined){
if(typeof data7.previewTried !== "boolean"){
const err39 = {instancePath:instancePath+"/objects/previewTried",schemaPath:"#/properties/objects/properties/previewTried/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
if(data7.toastRevealed !== undefined){
if(typeof data7.toastRevealed !== "boolean"){
const err40 = {instancePath:instancePath+"/objects/toastRevealed",schemaPath:"#/properties/objects/properties/toastRevealed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
}
else {
const err41 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
if(data.caddyHost !== undefined){
let data17 = data.caddyHost;
if(typeof data17 !== "string"){
const err42 = {instancePath:instancePath+"/caddyHost",schemaPath:"#/properties/caddyHost/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
if(!(((data17 === "MD.RACK.STATION") || (data17 === "ACT.PLAYER")) || (data17 === "ST.RACK.BAY"))){
const err43 = {instancePath:instancePath+"/caddyHost",schemaPath:"#/properties/caddyHost/enum",keyword:"enum",params:{allowedValues: schema44.properties.caddyHost.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
if(data.order !== undefined){
if(!(validate116(data.order, {instancePath:instancePath+"/order",parentData:data,parentDataProperty:"order",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate116.errors : vErrors.concat(validate116.errors);
errors = vErrors.length;
}
}
if(data.arrangementRevision !== undefined){
let data19 = data.arrangementRevision;
if(!(((typeof data19 == "number") && (!(data19 % 1) && !isNaN(data19))) && (isFinite(data19)))){
const err44 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
if((typeof data19 == "number") && (isFinite(data19))){
if(data19 > 9007199254740991 || isNaN(data19)){
const err45 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
if(data19 < 0 || isNaN(data19)){
const err46 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
}
}
}
else {
const err47 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
validate113.errors = vErrors;
return errors === 0;
}
validate113.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema46 = {"type":"object","properties":{"sourceId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"refs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"viaAccessId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"seq":{"type":"integer","minimum":0,"maximum":9007199254740991}},"required":["sourceId","refs","viaAccessId","seq"],"additionalProperties":false};

function validate119(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate119.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.sourceId === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "sourceId"},message:"must have required property '"+"sourceId"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.refs === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "refs"},message:"must have required property '"+"refs"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.viaAccessId === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "viaAccessId"},message:"must have required property '"+"viaAccessId"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.seq === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "seq"},message:"must have required property '"+"seq"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
for(const key0 in data){
if(!((((key0 === "sourceId") || (key0 === "refs")) || (key0 === "viaAccessId")) || (key0 === "seq"))){
const err4 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data.sourceId !== undefined){
let data0 = data.sourceId;
if(typeof data0 === "string"){
if(func2(data0) > 160){
const err5 = {instancePath:instancePath+"/sourceId",schemaPath:"#/properties/sourceId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(!pattern3.test(data0)){
const err6 = {instancePath:instancePath+"/sourceId",schemaPath:"#/properties/sourceId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
else {
const err7 = {instancePath:instancePath+"/sourceId",schemaPath:"#/properties/sourceId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.refs !== undefined){
let data1 = data.refs;
if(Array.isArray(data1)){
if(data1.length > 64){
const err8 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
const len0 = data1.length;
for(let i0=0; i0<len0; i0++){
let data2 = data1[i0];
if(typeof data2 === "string"){
if(func2(data2) > 160){
const err9 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(!pattern3.test(data2)){
const err10 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
else {
const err11 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
let i1 = data1.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data1[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err12 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err13 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.viaAccessId !== undefined){
let data3 = data.viaAccessId;
if(typeof data3 === "string"){
if(func2(data3) > 160){
const err14 = {instancePath:instancePath+"/viaAccessId",schemaPath:"#/properties/viaAccessId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
if(!pattern3.test(data3)){
const err15 = {instancePath:instancePath+"/viaAccessId",schemaPath:"#/properties/viaAccessId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
else {
const err16 = {instancePath:instancePath+"/viaAccessId",schemaPath:"#/properties/viaAccessId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.seq !== undefined){
let data4 = data.seq;
if(!(((typeof data4 == "number") && (!(data4 % 1) && !isNaN(data4))) && (isFinite(data4)))){
const err17 = {instancePath:instancePath+"/seq",schemaPath:"#/properties/seq/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if((typeof data4 == "number") && (isFinite(data4))){
if(data4 > 9007199254740991 || isNaN(data4)){
const err18 = {instancePath:instancePath+"/seq",schemaPath:"#/properties/seq/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if(data4 < 0 || isNaN(data4)){
const err19 = {instancePath:instancePath+"/seq",schemaPath:"#/properties/seq/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
}
}
else {
const err20 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
validate119.errors = vErrors;
return errors === 0;
}
validate119.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema47 = {"type":"object","properties":{"refId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"ctId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"spans":{"type":"array","items":{"$ref":"#/$defs/Span"}},"visualComplete":{"type":"boolean"},"viaAccessId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"firstSeq":{"type":"integer","minimum":0,"maximum":9007199254740991},"lastSeq":{"type":"integer","minimum":0,"maximum":9007199254740991},"count":{"type":"integer","minimum":1}},"required":["refId","ctId","spans","visualComplete","viaAccessId","firstSeq","lastSeq","count"],"additionalProperties":false};

function validate121(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate121.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.refId === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "refId"},message:"must have required property '"+"refId"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.ctId === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "ctId"},message:"must have required property '"+"ctId"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.spans === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "spans"},message:"must have required property '"+"spans"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.visualComplete === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "visualComplete"},message:"must have required property '"+"visualComplete"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.viaAccessId === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "viaAccessId"},message:"must have required property '"+"viaAccessId"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.firstSeq === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "firstSeq"},message:"must have required property '"+"firstSeq"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.lastSeq === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "lastSeq"},message:"must have required property '"+"lastSeq"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.count === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "count"},message:"must have required property '"+"count"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
for(const key0 in data){
if(!((((((((key0 === "refId") || (key0 === "ctId")) || (key0 === "spans")) || (key0 === "visualComplete")) || (key0 === "viaAccessId")) || (key0 === "firstSeq")) || (key0 === "lastSeq")) || (key0 === "count"))){
const err8 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.refId !== undefined){
let data0 = data.refId;
if(typeof data0 === "string"){
if(func2(data0) > 160){
const err9 = {instancePath:instancePath+"/refId",schemaPath:"#/properties/refId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(!pattern3.test(data0)){
const err10 = {instancePath:instancePath+"/refId",schemaPath:"#/properties/refId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
else {
const err11 = {instancePath:instancePath+"/refId",schemaPath:"#/properties/refId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.ctId !== undefined){
let data1 = data.ctId;
if(typeof data1 === "string"){
if(func2(data1) > 160){
const err12 = {instancePath:instancePath+"/ctId",schemaPath:"#/properties/ctId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(!pattern3.test(data1)){
const err13 = {instancePath:instancePath+"/ctId",schemaPath:"#/properties/ctId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
else {
const err14 = {instancePath:instancePath+"/ctId",schemaPath:"#/properties/ctId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.spans !== undefined){
let data2 = data.spans;
if(Array.isArray(data2)){
const len0 = data2.length;
for(let i0=0; i0<len0; i0++){
if(!(validate80(data2[i0], {instancePath:instancePath+"/spans/" + i0,parentData:data2,parentDataProperty:i0,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate80.errors : vErrors.concat(validate80.errors);
errors = vErrors.length;
}
}
}
else {
const err15 = {instancePath:instancePath+"/spans",schemaPath:"#/properties/spans/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.visualComplete !== undefined){
if(typeof data.visualComplete !== "boolean"){
const err16 = {instancePath:instancePath+"/visualComplete",schemaPath:"#/properties/visualComplete/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.viaAccessId !== undefined){
let data5 = data.viaAccessId;
if(typeof data5 === "string"){
if(func2(data5) > 160){
const err17 = {instancePath:instancePath+"/viaAccessId",schemaPath:"#/properties/viaAccessId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(!pattern3.test(data5)){
const err18 = {instancePath:instancePath+"/viaAccessId",schemaPath:"#/properties/viaAccessId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
else {
const err19 = {instancePath:instancePath+"/viaAccessId",schemaPath:"#/properties/viaAccessId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.firstSeq !== undefined){
let data6 = data.firstSeq;
if(!(((typeof data6 == "number") && (!(data6 % 1) && !isNaN(data6))) && (isFinite(data6)))){
const err20 = {instancePath:instancePath+"/firstSeq",schemaPath:"#/properties/firstSeq/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if((typeof data6 == "number") && (isFinite(data6))){
if(data6 > 9007199254740991 || isNaN(data6)){
const err21 = {instancePath:instancePath+"/firstSeq",schemaPath:"#/properties/firstSeq/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
if(data6 < 0 || isNaN(data6)){
const err22 = {instancePath:instancePath+"/firstSeq",schemaPath:"#/properties/firstSeq/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
}
if(data.lastSeq !== undefined){
let data7 = data.lastSeq;
if(!(((typeof data7 == "number") && (!(data7 % 1) && !isNaN(data7))) && (isFinite(data7)))){
const err23 = {instancePath:instancePath+"/lastSeq",schemaPath:"#/properties/lastSeq/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
if((typeof data7 == "number") && (isFinite(data7))){
if(data7 > 9007199254740991 || isNaN(data7)){
const err24 = {instancePath:instancePath+"/lastSeq",schemaPath:"#/properties/lastSeq/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
if(data7 < 0 || isNaN(data7)){
const err25 = {instancePath:instancePath+"/lastSeq",schemaPath:"#/properties/lastSeq/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
}
if(data.count !== undefined){
let data8 = data.count;
if(!(((typeof data8 == "number") && (!(data8 % 1) && !isNaN(data8))) && (isFinite(data8)))){
const err26 = {instancePath:instancePath+"/count",schemaPath:"#/properties/count/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
if((typeof data8 == "number") && (isFinite(data8))){
if(data8 < 1 || isNaN(data8)){
const err27 = {instancePath:instancePath+"/count",schemaPath:"#/properties/count/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
}
}
else {
const err28 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
validate121.errors = vErrors;
return errors === 0;
}
validate121.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema48 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"leftRef":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"rightRef":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"relationship":{"anyOf":[{"type":"string","enum":["supports","conflicts-with","happened-before"]},{"type":"null"}]},"note":{"type":"string"},"recordedSeq":{"anyOf":[{"type":"integer","minimum":0,"maximum":9007199254740991},{"type":"null"}]}},"required":["id","leftRef","rightRef","relationship","note","recordedSeq"],"additionalProperties":false};

function validate124(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate124.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.leftRef === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "leftRef"},message:"must have required property '"+"leftRef"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.rightRef === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "rightRef"},message:"must have required property '"+"rightRef"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.relationship === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "relationship"},message:"must have required property '"+"relationship"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.note === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "note"},message:"must have required property '"+"note"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.recordedSeq === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "recordedSeq"},message:"must have required property '"+"recordedSeq"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
for(const key0 in data){
if(!((((((key0 === "id") || (key0 === "leftRef")) || (key0 === "rightRef")) || (key0 === "relationship")) || (key0 === "note")) || (key0 === "recordedSeq"))){
const err6 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 === "string"){
if(func2(data0) > 36){
const err7 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(!pattern43.test(data0)){
const err8 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.leftRef !== undefined){
let data1 = data.leftRef;
const _errs5 = errors;
let valid1 = false;
const _errs6 = errors;
if(typeof data1 === "string"){
if(func2(data1) > 160){
const err10 = {instancePath:instancePath+"/leftRef",schemaPath:"#/properties/leftRef/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(!pattern3.test(data1)){
const err11 = {instancePath:instancePath+"/leftRef",schemaPath:"#/properties/leftRef/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
else {
const err12 = {instancePath:instancePath+"/leftRef",schemaPath:"#/properties/leftRef/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
var _valid0 = _errs6 === errors;
valid1 = valid1 || _valid0;
const _errs8 = errors;
if(data1 !== null){
const err13 = {instancePath:instancePath+"/leftRef",schemaPath:"#/properties/leftRef/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
var _valid0 = _errs8 === errors;
valid1 = valid1 || _valid0;
if(!valid1){
const err14 = {instancePath:instancePath+"/leftRef",schemaPath:"#/properties/leftRef/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
else {
errors = _errs5;
if(vErrors !== null){
if(_errs5){
vErrors.length = _errs5;
}
else {
vErrors = null;
}
}
}
}
if(data.rightRef !== undefined){
let data2 = data.rightRef;
const _errs11 = errors;
let valid2 = false;
const _errs12 = errors;
if(typeof data2 === "string"){
if(func2(data2) > 160){
const err15 = {instancePath:instancePath+"/rightRef",schemaPath:"#/properties/rightRef/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(!pattern3.test(data2)){
const err16 = {instancePath:instancePath+"/rightRef",schemaPath:"#/properties/rightRef/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
else {
const err17 = {instancePath:instancePath+"/rightRef",schemaPath:"#/properties/rightRef/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
var _valid1 = _errs12 === errors;
valid2 = valid2 || _valid1;
const _errs14 = errors;
if(data2 !== null){
const err18 = {instancePath:instancePath+"/rightRef",schemaPath:"#/properties/rightRef/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
var _valid1 = _errs14 === errors;
valid2 = valid2 || _valid1;
if(!valid2){
const err19 = {instancePath:instancePath+"/rightRef",schemaPath:"#/properties/rightRef/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
else {
errors = _errs11;
if(vErrors !== null){
if(_errs11){
vErrors.length = _errs11;
}
else {
vErrors = null;
}
}
}
}
if(data.relationship !== undefined){
let data3 = data.relationship;
const _errs17 = errors;
let valid3 = false;
const _errs18 = errors;
if(typeof data3 !== "string"){
const err20 = {instancePath:instancePath+"/relationship",schemaPath:"#/properties/relationship/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(!(((data3 === "supports") || (data3 === "conflicts-with")) || (data3 === "happened-before"))){
const err21 = {instancePath:instancePath+"/relationship",schemaPath:"#/properties/relationship/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema48.properties.relationship.anyOf[0].enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
var _valid2 = _errs18 === errors;
valid3 = valid3 || _valid2;
const _errs20 = errors;
if(data3 !== null){
const err22 = {instancePath:instancePath+"/relationship",schemaPath:"#/properties/relationship/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
var _valid2 = _errs20 === errors;
valid3 = valid3 || _valid2;
if(!valid3){
const err23 = {instancePath:instancePath+"/relationship",schemaPath:"#/properties/relationship/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
else {
errors = _errs17;
if(vErrors !== null){
if(_errs17){
vErrors.length = _errs17;
}
else {
vErrors = null;
}
}
}
}
if(data.note !== undefined){
if(typeof data.note !== "string"){
const err24 = {instancePath:instancePath+"/note",schemaPath:"#/properties/note/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data.recordedSeq !== undefined){
let data5 = data.recordedSeq;
const _errs25 = errors;
let valid4 = false;
const _errs26 = errors;
if(!(((typeof data5 == "number") && (!(data5 % 1) && !isNaN(data5))) && (isFinite(data5)))){
const err25 = {instancePath:instancePath+"/recordedSeq",schemaPath:"#/properties/recordedSeq/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
if((typeof data5 == "number") && (isFinite(data5))){
if(data5 > 9007199254740991 || isNaN(data5)){
const err26 = {instancePath:instancePath+"/recordedSeq",schemaPath:"#/properties/recordedSeq/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
if(data5 < 0 || isNaN(data5)){
const err27 = {instancePath:instancePath+"/recordedSeq",schemaPath:"#/properties/recordedSeq/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
var _valid3 = _errs26 === errors;
valid4 = valid4 || _valid3;
const _errs28 = errors;
if(data5 !== null){
const err28 = {instancePath:instancePath+"/recordedSeq",schemaPath:"#/properties/recordedSeq/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
var _valid3 = _errs28 === errors;
valid4 = valid4 || _valid3;
if(!valid4){
const err29 = {instancePath:instancePath+"/recordedSeq",schemaPath:"#/properties/recordedSeq/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
else {
errors = _errs25;
if(vErrors !== null){
if(_errs25){
vErrors.length = _errs25;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err30 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
validate124.errors = vErrors;
return errors === 0;
}
validate124.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema49 = {"type":"object","properties":{"id":{"type":"string","enum":["private","search-plan","story-plan","coach-search","coach-story"]},"text":{"type":"string"},"selectedRefs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":2,"uniqueItems":true},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991}},"required":["id","text","selectedRefs","revision"],"additionalProperties":false};

function validate126(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate126.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.text === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "text"},message:"must have required property '"+"text"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.selectedRefs === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "selectedRefs"},message:"must have required property '"+"selectedRefs"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.revision === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "revision"},message:"must have required property '"+"revision"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
for(const key0 in data){
if(!((((key0 === "id") || (key0 === "text")) || (key0 === "selectedRefs")) || (key0 === "revision"))){
const err4 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 !== "string"){
const err5 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(!(((((data0 === "private") || (data0 === "search-plan")) || (data0 === "story-plan")) || (data0 === "coach-search")) || (data0 === "coach-story"))){
const err6 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/enum",keyword:"enum",params:{allowedValues: schema49.properties.id.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.text !== undefined){
if(typeof data.text !== "string"){
const err7 = {instancePath:instancePath+"/text",schemaPath:"#/properties/text/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.selectedRefs !== undefined){
let data2 = data.selectedRefs;
if(Array.isArray(data2)){
if(data2.length > 2){
const err8 = {instancePath:instancePath+"/selectedRefs",schemaPath:"#/properties/selectedRefs/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
const len0 = data2.length;
for(let i0=0; i0<len0; i0++){
let data3 = data2[i0];
if(typeof data3 === "string"){
if(func2(data3) > 160){
const err9 = {instancePath:instancePath+"/selectedRefs/" + i0,schemaPath:"#/properties/selectedRefs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(!pattern3.test(data3)){
const err10 = {instancePath:instancePath+"/selectedRefs/" + i0,schemaPath:"#/properties/selectedRefs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
else {
const err11 = {instancePath:instancePath+"/selectedRefs/" + i0,schemaPath:"#/properties/selectedRefs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
let i1 = data2.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data2[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err12 = {instancePath:instancePath+"/selectedRefs",schemaPath:"#/properties/selectedRefs/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err13 = {instancePath:instancePath+"/selectedRefs",schemaPath:"#/properties/selectedRefs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.revision !== undefined){
let data4 = data.revision;
if(!(((typeof data4 == "number") && (!(data4 % 1) && !isNaN(data4))) && (isFinite(data4)))){
const err14 = {instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
if((typeof data4 == "number") && (isFinite(data4))){
if(data4 > 9007199254740991 || isNaN(data4)){
const err15 = {instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(data4 < 0 || isNaN(data4)){
const err16 = {instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
}
}
else {
const err17 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
validate126.errors = vErrors;
return errors === 0;
}
validate126.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema50 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"kind":{"type":"string","enum":["private-idea","crew-plan","jo-explanation","evidence-delivery","coaching-submission"]},"topic":{"type":"string","enum":["search","story"]},"text":{"type":"string"},"refs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"recipient":{"anyOf":[{"type":"string","enum":["ACT.JO","ACT.REMY","ACT.ARI"]},{"type":"null"}]},"previousRecordId":{"anyOf":[{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},{"type":"null"}]},"arrangementRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"puppet":{"$ref":"#/$defs/Puppet"},"seq":{"type":"integer","minimum":0,"maximum":9007199254740991}},"required":["id","kind","topic","text","refs","recipient","previousRecordId","arrangementRevision","puppet","seq"],"additionalProperties":false};
const schema51 = {"type":"object","properties":{"pip":{"type":"string","enum":["left","right"]},"seed":{"type":"string","enum":["left","right","soil"]},"boats":{"type":"string","enum":["separate","joined"]},"lit":{"type":"boolean"}},"required":["pip","seed","boats","lit"],"additionalProperties":false};

function validate129(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate129.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.pip === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "pip"},message:"must have required property '"+"pip"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.seed === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "seed"},message:"must have required property '"+"seed"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.boats === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "boats"},message:"must have required property '"+"boats"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.lit === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "lit"},message:"must have required property '"+"lit"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
for(const key0 in data){
if(!((((key0 === "pip") || (key0 === "seed")) || (key0 === "boats")) || (key0 === "lit"))){
const err4 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data.pip !== undefined){
let data0 = data.pip;
if(typeof data0 !== "string"){
const err5 = {instancePath:instancePath+"/pip",schemaPath:"#/properties/pip/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(!((data0 === "left") || (data0 === "right"))){
const err6 = {instancePath:instancePath+"/pip",schemaPath:"#/properties/pip/enum",keyword:"enum",params:{allowedValues: schema51.properties.pip.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.seed !== undefined){
let data1 = data.seed;
if(typeof data1 !== "string"){
const err7 = {instancePath:instancePath+"/seed",schemaPath:"#/properties/seed/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(!(((data1 === "left") || (data1 === "right")) || (data1 === "soil"))){
const err8 = {instancePath:instancePath+"/seed",schemaPath:"#/properties/seed/enum",keyword:"enum",params:{allowedValues: schema51.properties.seed.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.boats !== undefined){
let data2 = data.boats;
if(typeof data2 !== "string"){
const err9 = {instancePath:instancePath+"/boats",schemaPath:"#/properties/boats/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(!((data2 === "separate") || (data2 === "joined"))){
const err10 = {instancePath:instancePath+"/boats",schemaPath:"#/properties/boats/enum",keyword:"enum",params:{allowedValues: schema51.properties.boats.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.lit !== undefined){
if(typeof data.lit !== "boolean"){
const err11 = {instancePath:instancePath+"/lit",schemaPath:"#/properties/lit/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
}
else {
const err12 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
validate129.errors = vErrors;
return errors === 0;
}
validate129.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate128(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate128.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.kind === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.topic === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "topic"},message:"must have required property '"+"topic"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.text === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "text"},message:"must have required property '"+"text"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.refs === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "refs"},message:"must have required property '"+"refs"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.recipient === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "recipient"},message:"must have required property '"+"recipient"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.previousRecordId === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "previousRecordId"},message:"must have required property '"+"previousRecordId"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.arrangementRevision === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "arrangementRevision"},message:"must have required property '"+"arrangementRevision"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.puppet === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "puppet"},message:"must have required property '"+"puppet"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(data.seq === undefined){
const err9 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "seq"},message:"must have required property '"+"seq"+"'"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema50.properties, key0))){
const err10 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 === "string"){
if(func2(data0) > 36){
const err11 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(!pattern43.test(data0)){
const err12 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.kind !== undefined){
let data1 = data.kind;
if(typeof data1 !== "string"){
const err14 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
if(!(((((data1 === "private-idea") || (data1 === "crew-plan")) || (data1 === "jo-explanation")) || (data1 === "evidence-delivery")) || (data1 === "coaching-submission"))){
const err15 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/enum",keyword:"enum",params:{allowedValues: schema50.properties.kind.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.topic !== undefined){
let data2 = data.topic;
if(typeof data2 !== "string"){
const err16 = {instancePath:instancePath+"/topic",schemaPath:"#/properties/topic/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
if(!((data2 === "search") || (data2 === "story"))){
const err17 = {instancePath:instancePath+"/topic",schemaPath:"#/properties/topic/enum",keyword:"enum",params:{allowedValues: schema50.properties.topic.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.text !== undefined){
if(typeof data.text !== "string"){
const err18 = {instancePath:instancePath+"/text",schemaPath:"#/properties/text/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(data.refs !== undefined){
let data4 = data.refs;
if(Array.isArray(data4)){
if(data4.length > 64){
const err19 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
const len0 = data4.length;
for(let i0=0; i0<len0; i0++){
let data5 = data4[i0];
if(typeof data5 === "string"){
if(func2(data5) > 160){
const err20 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(!pattern3.test(data5)){
const err21 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
else {
const err22 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
let i1 = data4.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data4[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err23 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err24 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data.recipient !== undefined){
let data6 = data.recipient;
const _errs15 = errors;
let valid4 = false;
const _errs16 = errors;
if(typeof data6 !== "string"){
const err25 = {instancePath:instancePath+"/recipient",schemaPath:"#/properties/recipient/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
if(!(((data6 === "ACT.JO") || (data6 === "ACT.REMY")) || (data6 === "ACT.ARI"))){
const err26 = {instancePath:instancePath+"/recipient",schemaPath:"#/properties/recipient/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema50.properties.recipient.anyOf[0].enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
var _valid0 = _errs16 === errors;
valid4 = valid4 || _valid0;
const _errs18 = errors;
if(data6 !== null){
const err27 = {instancePath:instancePath+"/recipient",schemaPath:"#/properties/recipient/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
var _valid0 = _errs18 === errors;
valid4 = valid4 || _valid0;
if(!valid4){
const err28 = {instancePath:instancePath+"/recipient",schemaPath:"#/properties/recipient/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
else {
errors = _errs15;
if(vErrors !== null){
if(_errs15){
vErrors.length = _errs15;
}
else {
vErrors = null;
}
}
}
}
if(data.previousRecordId !== undefined){
let data7 = data.previousRecordId;
const _errs21 = errors;
let valid5 = false;
const _errs22 = errors;
if(typeof data7 === "string"){
if(func2(data7) > 36){
const err29 = {instancePath:instancePath+"/previousRecordId",schemaPath:"#/properties/previousRecordId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
if(!pattern43.test(data7)){
const err30 = {instancePath:instancePath+"/previousRecordId",schemaPath:"#/properties/previousRecordId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
else {
const err31 = {instancePath:instancePath+"/previousRecordId",schemaPath:"#/properties/previousRecordId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
var _valid1 = _errs22 === errors;
valid5 = valid5 || _valid1;
const _errs24 = errors;
if(data7 !== null){
const err32 = {instancePath:instancePath+"/previousRecordId",schemaPath:"#/properties/previousRecordId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
var _valid1 = _errs24 === errors;
valid5 = valid5 || _valid1;
if(!valid5){
const err33 = {instancePath:instancePath+"/previousRecordId",schemaPath:"#/properties/previousRecordId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
else {
errors = _errs21;
if(vErrors !== null){
if(_errs21){
vErrors.length = _errs21;
}
else {
vErrors = null;
}
}
}
}
if(data.arrangementRevision !== undefined){
let data8 = data.arrangementRevision;
if(!(((typeof data8 == "number") && (!(data8 % 1) && !isNaN(data8))) && (isFinite(data8)))){
const err34 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
if((typeof data8 == "number") && (isFinite(data8))){
if(data8 > 9007199254740991 || isNaN(data8)){
const err35 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
if(data8 < 0 || isNaN(data8)){
const err36 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
}
if(data.puppet !== undefined){
if(!(validate129(data.puppet, {instancePath:instancePath+"/puppet",parentData:data,parentDataProperty:"puppet",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate129.errors : vErrors.concat(validate129.errors);
errors = vErrors.length;
}
}
if(data.seq !== undefined){
let data10 = data.seq;
if(!(((typeof data10 == "number") && (!(data10 % 1) && !isNaN(data10))) && (isFinite(data10)))){
const err37 = {instancePath:instancePath+"/seq",schemaPath:"#/properties/seq/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
if((typeof data10 == "number") && (isFinite(data10))){
if(data10 > 9007199254740991 || isNaN(data10)){
const err38 = {instancePath:instancePath+"/seq",schemaPath:"#/properties/seq/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
if(data10 < 0 || isNaN(data10)){
const err39 = {instancePath:instancePath+"/seq",schemaPath:"#/properties/seq/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
}
}
else {
const err40 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
validate128.errors = vErrors;
return errors === 0;
}
validate128.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema52 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"mode":{"type":"string","enum":["rehearsal","show"]},"arrangementRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"order":{"$ref":"#/$defs/Order"},"nextCue":{"type":"integer","minimum":0,"maximum":4},"status":{"type":"string","enum":["running","paused","finalized"]},"pauseReason":{"anyOf":[{"type":"string","enum":["user","unmet","inspection","leaving","background","recovery"]},{"type":"null"}]},"puppet":{"$ref":"#/$defs/Puppet"},"activeCue":{"anyOf":[{"$ref":"#/$defs/Cue"},{"type":"null"}]},"cueResultIds":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":4,"uniqueItems":true},"startSeq":{"type":"integer","minimum":0,"maximum":9007199254740991},"finalizedSeq":{"anyOf":[{"type":"integer","minimum":0,"maximum":9007199254740991},{"type":"null"}]}},"required":["id","mode","arrangementRevision","order","nextCue","status","pauseReason","puppet","activeCue","cueResultIds","startSeq","finalizedSeq"],"additionalProperties":false};
const schema53 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"index":{"type":"integer","minimum":0,"maximum":3},"tile":{"type":"string","enum":["TILE.FERRY","TILE.BRIDGE","TILE.PLANT","TILE.BLOOM"]},"from":{"$ref":"#/$defs/Puppet"},"to":{"$ref":"#/$defs/Puppet"},"result":{"type":"string","enum":["changed","noop","unmet"]}},"required":["id","index","tile","from","to","result"],"additionalProperties":false};

function validate135(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate135.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.index === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "index"},message:"must have required property '"+"index"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.tile === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "tile"},message:"must have required property '"+"tile"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.from === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "from"},message:"must have required property '"+"from"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.to === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "to"},message:"must have required property '"+"to"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.result === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "result"},message:"must have required property '"+"result"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
for(const key0 in data){
if(!((((((key0 === "id") || (key0 === "index")) || (key0 === "tile")) || (key0 === "from")) || (key0 === "to")) || (key0 === "result"))){
const err6 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 === "string"){
if(func2(data0) > 160){
const err7 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(!pattern3.test(data0)){
const err8 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.index !== undefined){
let data1 = data.index;
if(!(((typeof data1 == "number") && (!(data1 % 1) && !isNaN(data1))) && (isFinite(data1)))){
const err10 = {instancePath:instancePath+"/index",schemaPath:"#/properties/index/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if((typeof data1 == "number") && (isFinite(data1))){
if(data1 > 3 || isNaN(data1)){
const err11 = {instancePath:instancePath+"/index",schemaPath:"#/properties/index/maximum",keyword:"maximum",params:{comparison: "<=", limit: 3},message:"must be <= 3"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(data1 < 0 || isNaN(data1)){
const err12 = {instancePath:instancePath+"/index",schemaPath:"#/properties/index/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
}
if(data.tile !== undefined){
let data2 = data.tile;
if(typeof data2 !== "string"){
const err13 = {instancePath:instancePath+"/tile",schemaPath:"#/properties/tile/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(!((((data2 === "TILE.FERRY") || (data2 === "TILE.BRIDGE")) || (data2 === "TILE.PLANT")) || (data2 === "TILE.BLOOM"))){
const err14 = {instancePath:instancePath+"/tile",schemaPath:"#/properties/tile/enum",keyword:"enum",params:{allowedValues: schema53.properties.tile.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.from !== undefined){
if(!(validate129(data.from, {instancePath:instancePath+"/from",parentData:data,parentDataProperty:"from",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate129.errors : vErrors.concat(validate129.errors);
errors = vErrors.length;
}
}
if(data.to !== undefined){
if(!(validate129(data.to, {instancePath:instancePath+"/to",parentData:data,parentDataProperty:"to",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate129.errors : vErrors.concat(validate129.errors);
errors = vErrors.length;
}
}
if(data.result !== undefined){
let data5 = data.result;
if(typeof data5 !== "string"){
const err15 = {instancePath:instancePath+"/result",schemaPath:"#/properties/result/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(!(((data5 === "changed") || (data5 === "noop")) || (data5 === "unmet"))){
const err16 = {instancePath:instancePath+"/result",schemaPath:"#/properties/result/enum",keyword:"enum",params:{allowedValues: schema53.properties.result.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
}
else {
const err17 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
validate135.errors = vErrors;
return errors === 0;
}
validate135.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate132(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate132.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.mode === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.arrangementRevision === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "arrangementRevision"},message:"must have required property '"+"arrangementRevision"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.order === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "order"},message:"must have required property '"+"order"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.nextCue === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "nextCue"},message:"must have required property '"+"nextCue"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.status === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "status"},message:"must have required property '"+"status"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.pauseReason === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "pauseReason"},message:"must have required property '"+"pauseReason"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.puppet === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "puppet"},message:"must have required property '"+"puppet"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.activeCue === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "activeCue"},message:"must have required property '"+"activeCue"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(data.cueResultIds === undefined){
const err9 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "cueResultIds"},message:"must have required property '"+"cueResultIds"+"'"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(data.startSeq === undefined){
const err10 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "startSeq"},message:"must have required property '"+"startSeq"+"'"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(data.finalizedSeq === undefined){
const err11 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "finalizedSeq"},message:"must have required property '"+"finalizedSeq"+"'"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema52.properties, key0))){
const err12 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 === "string"){
if(func2(data0) > 36){
const err13 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(!pattern43.test(data0)){
const err14 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
else {
const err15 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.mode !== undefined){
let data1 = data.mode;
if(typeof data1 !== "string"){
const err16 = {instancePath:instancePath+"/mode",schemaPath:"#/properties/mode/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
if(!((data1 === "rehearsal") || (data1 === "show"))){
const err17 = {instancePath:instancePath+"/mode",schemaPath:"#/properties/mode/enum",keyword:"enum",params:{allowedValues: schema52.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.arrangementRevision !== undefined){
let data2 = data.arrangementRevision;
if(!(((typeof data2 == "number") && (!(data2 % 1) && !isNaN(data2))) && (isFinite(data2)))){
const err18 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if((typeof data2 == "number") && (isFinite(data2))){
if(data2 > 9007199254740991 || isNaN(data2)){
const err19 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
if(data2 < 0 || isNaN(data2)){
const err20 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
}
if(data.order !== undefined){
if(!(validate116(data.order, {instancePath:instancePath+"/order",parentData:data,parentDataProperty:"order",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate116.errors : vErrors.concat(validate116.errors);
errors = vErrors.length;
}
}
if(data.nextCue !== undefined){
let data4 = data.nextCue;
if(!(((typeof data4 == "number") && (!(data4 % 1) && !isNaN(data4))) && (isFinite(data4)))){
const err21 = {instancePath:instancePath+"/nextCue",schemaPath:"#/properties/nextCue/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
if((typeof data4 == "number") && (isFinite(data4))){
if(data4 > 4 || isNaN(data4)){
const err22 = {instancePath:instancePath+"/nextCue",schemaPath:"#/properties/nextCue/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4},message:"must be <= 4"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
if(data4 < 0 || isNaN(data4)){
const err23 = {instancePath:instancePath+"/nextCue",schemaPath:"#/properties/nextCue/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
}
if(data.status !== undefined){
let data5 = data.status;
if(typeof data5 !== "string"){
const err24 = {instancePath:instancePath+"/status",schemaPath:"#/properties/status/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
if(!(((data5 === "running") || (data5 === "paused")) || (data5 === "finalized"))){
const err25 = {instancePath:instancePath+"/status",schemaPath:"#/properties/status/enum",keyword:"enum",params:{allowedValues: schema52.properties.status.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data.pauseReason !== undefined){
let data6 = data.pauseReason;
const _errs14 = errors;
let valid1 = false;
const _errs15 = errors;
if(typeof data6 !== "string"){
const err26 = {instancePath:instancePath+"/pauseReason",schemaPath:"#/properties/pauseReason/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
if(!((((((data6 === "user") || (data6 === "unmet")) || (data6 === "inspection")) || (data6 === "leaving")) || (data6 === "background")) || (data6 === "recovery"))){
const err27 = {instancePath:instancePath+"/pauseReason",schemaPath:"#/properties/pauseReason/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema52.properties.pauseReason.anyOf[0].enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
var _valid0 = _errs15 === errors;
valid1 = valid1 || _valid0;
const _errs17 = errors;
if(data6 !== null){
const err28 = {instancePath:instancePath+"/pauseReason",schemaPath:"#/properties/pauseReason/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
var _valid0 = _errs17 === errors;
valid1 = valid1 || _valid0;
if(!valid1){
const err29 = {instancePath:instancePath+"/pauseReason",schemaPath:"#/properties/pauseReason/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
else {
errors = _errs14;
if(vErrors !== null){
if(_errs14){
vErrors.length = _errs14;
}
else {
vErrors = null;
}
}
}
}
if(data.puppet !== undefined){
if(!(validate129(data.puppet, {instancePath:instancePath+"/puppet",parentData:data,parentDataProperty:"puppet",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate129.errors : vErrors.concat(validate129.errors);
errors = vErrors.length;
}
}
if(data.activeCue !== undefined){
let data8 = data.activeCue;
const _errs21 = errors;
let valid2 = false;
const _errs22 = errors;
if(!(validate135(data8, {instancePath:instancePath+"/activeCue",parentData:data,parentDataProperty:"activeCue",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate135.errors : vErrors.concat(validate135.errors);
errors = vErrors.length;
}
var _valid1 = _errs22 === errors;
valid2 = valid2 || _valid1;
const _errs23 = errors;
if(data8 !== null){
const err30 = {instancePath:instancePath+"/activeCue",schemaPath:"#/properties/activeCue/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
var _valid1 = _errs23 === errors;
valid2 = valid2 || _valid1;
if(!valid2){
const err31 = {instancePath:instancePath+"/activeCue",schemaPath:"#/properties/activeCue/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
else {
errors = _errs21;
if(vErrors !== null){
if(_errs21){
vErrors.length = _errs21;
}
else {
vErrors = null;
}
}
}
}
if(data.cueResultIds !== undefined){
let data9 = data.cueResultIds;
if(Array.isArray(data9)){
if(data9.length > 4){
const err32 = {instancePath:instancePath+"/cueResultIds",schemaPath:"#/properties/cueResultIds/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
const len0 = data9.length;
for(let i0=0; i0<len0; i0++){
let data10 = data9[i0];
if(typeof data10 === "string"){
if(func2(data10) > 160){
const err33 = {instancePath:instancePath+"/cueResultIds/" + i0,schemaPath:"#/properties/cueResultIds/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
if(!pattern3.test(data10)){
const err34 = {instancePath:instancePath+"/cueResultIds/" + i0,schemaPath:"#/properties/cueResultIds/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
else {
const err35 = {instancePath:instancePath+"/cueResultIds/" + i0,schemaPath:"#/properties/cueResultIds/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
let i1 = data9.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data9[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err36 = {instancePath:instancePath+"/cueResultIds",schemaPath:"#/properties/cueResultIds/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err37 = {instancePath:instancePath+"/cueResultIds",schemaPath:"#/properties/cueResultIds/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
if(data.startSeq !== undefined){
let data11 = data.startSeq;
if(!(((typeof data11 == "number") && (!(data11 % 1) && !isNaN(data11))) && (isFinite(data11)))){
const err38 = {instancePath:instancePath+"/startSeq",schemaPath:"#/properties/startSeq/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
if((typeof data11 == "number") && (isFinite(data11))){
if(data11 > 9007199254740991 || isNaN(data11)){
const err39 = {instancePath:instancePath+"/startSeq",schemaPath:"#/properties/startSeq/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
if(data11 < 0 || isNaN(data11)){
const err40 = {instancePath:instancePath+"/startSeq",schemaPath:"#/properties/startSeq/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
}
if(data.finalizedSeq !== undefined){
let data12 = data.finalizedSeq;
const _errs32 = errors;
let valid6 = false;
const _errs33 = errors;
if(!(((typeof data12 == "number") && (!(data12 % 1) && !isNaN(data12))) && (isFinite(data12)))){
const err41 = {instancePath:instancePath+"/finalizedSeq",schemaPath:"#/properties/finalizedSeq/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
if((typeof data12 == "number") && (isFinite(data12))){
if(data12 > 9007199254740991 || isNaN(data12)){
const err42 = {instancePath:instancePath+"/finalizedSeq",schemaPath:"#/properties/finalizedSeq/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
if(data12 < 0 || isNaN(data12)){
const err43 = {instancePath:instancePath+"/finalizedSeq",schemaPath:"#/properties/finalizedSeq/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
var _valid2 = _errs33 === errors;
valid6 = valid6 || _valid2;
const _errs35 = errors;
if(data12 !== null){
const err44 = {instancePath:instancePath+"/finalizedSeq",schemaPath:"#/properties/finalizedSeq/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
var _valid2 = _errs35 === errors;
valid6 = valid6 || _valid2;
if(!valid6){
const err45 = {instancePath:instancePath+"/finalizedSeq",schemaPath:"#/properties/finalizedSeq/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
else {
errors = _errs32;
if(vErrors !== null){
if(_errs32){
vErrors.length = _errs32;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err46 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
validate132.errors = vErrors;
return errors === 0;
}
validate132.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema54 = {"type":"object","properties":{"runId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"arrangementRevision":{"type":"integer","minimum":0,"maximum":9007199254740991}},"required":["runId","arrangementRevision"],"additionalProperties":false};

function validate141(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate141.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.runId === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "runId"},message:"must have required property '"+"runId"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.arrangementRevision === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "arrangementRevision"},message:"must have required property '"+"arrangementRevision"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
for(const key0 in data){
if(!((key0 === "runId") || (key0 === "arrangementRevision"))){
const err2 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
if(data.runId !== undefined){
let data0 = data.runId;
if(typeof data0 === "string"){
if(func2(data0) > 36){
const err3 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(!pattern43.test(data0)){
const err4 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
else {
const err5 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
if(data.arrangementRevision !== undefined){
let data1 = data.arrangementRevision;
if(!(((typeof data1 == "number") && (!(data1 % 1) && !isNaN(data1))) && (isFinite(data1)))){
const err6 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if((typeof data1 == "number") && (isFinite(data1))){
if(data1 > 9007199254740991 || isNaN(data1)){
const err7 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data1 < 0 || isNaN(data1)){
const err8 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
}
}
else {
const err9 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
validate141.errors = vErrors;
return errors === 0;
}
validate141.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema55 = {"type":"object","properties":{"runId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"arrangementRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"order":{"$ref":"#/$defs/Order"},"completedSeq":{"type":"integer","minimum":0,"maximum":9007199254740991}},"required":["runId","arrangementRevision","order","completedSeq"],"additionalProperties":false};

function validate143(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate143.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.runId === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "runId"},message:"must have required property '"+"runId"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.arrangementRevision === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "arrangementRevision"},message:"must have required property '"+"arrangementRevision"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.order === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "order"},message:"must have required property '"+"order"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.completedSeq === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "completedSeq"},message:"must have required property '"+"completedSeq"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
for(const key0 in data){
if(!((((key0 === "runId") || (key0 === "arrangementRevision")) || (key0 === "order")) || (key0 === "completedSeq"))){
const err4 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data.runId !== undefined){
let data0 = data.runId;
if(typeof data0 === "string"){
if(func2(data0) > 36){
const err5 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(!pattern43.test(data0)){
const err6 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
else {
const err7 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.arrangementRevision !== undefined){
let data1 = data.arrangementRevision;
if(!(((typeof data1 == "number") && (!(data1 % 1) && !isNaN(data1))) && (isFinite(data1)))){
const err8 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if((typeof data1 == "number") && (isFinite(data1))){
if(data1 > 9007199254740991 || isNaN(data1)){
const err9 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(data1 < 0 || isNaN(data1)){
const err10 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
}
if(data.order !== undefined){
if(!(validate116(data.order, {instancePath:instancePath+"/order",parentData:data,parentDataProperty:"order",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate116.errors : vErrors.concat(validate116.errors);
errors = vErrors.length;
}
}
if(data.completedSeq !== undefined){
let data3 = data.completedSeq;
if(!(((typeof data3 == "number") && (!(data3 % 1) && !isNaN(data3))) && (isFinite(data3)))){
const err11 = {instancePath:instancePath+"/completedSeq",schemaPath:"#/properties/completedSeq/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if((typeof data3 == "number") && (isFinite(data3))){
if(data3 > 9007199254740991 || isNaN(data3)){
const err12 = {instancePath:instancePath+"/completedSeq",schemaPath:"#/properties/completedSeq/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(data3 < 0 || isNaN(data3)){
const err13 = {instancePath:instancePath+"/completedSeq",schemaPath:"#/properties/completedSeq/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
}
}
else {
const err14 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
validate143.errors = vErrors;
return errors === 0;
}
validate143.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema56 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"seq":{"type":"integer","minimum":0,"maximum":9007199254740991},"visitId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"kind":{"type":"string","enum":["source-available","source-displayed","physical-commit","cue-started","cue-outcome","run-finalized","explanation-recorded","evidence-delivered","help-requested","help-selected","help-displayed","possible-outcome","history-uncertain","reading-model-played","reading-practice-requested","reading-self-reported","word-looked-up","supplied-support"]},"refs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"contentIds":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"actionId":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"runId":{"anyOf":[{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},{"type":"null"}]},"cueIndex":{"anyOf":[{"type":"integer","minimum":0,"maximum":9007199254740991},{"type":"null"}]},"recordId":{"anyOf":[{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},{"type":"null"}]},"requestId":{"anyOf":[{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},{"type":"null"}]},"outcome":{"anyOf":[{"type":"string","enum":["changed","noop","unmet","success","unsuccessful","canceled","possibly-seen"]},{"type":"null"}]},"puppet":{"anyOf":[{"$ref":"#/$defs/Puppet"},{"type":"null"}]},"assistanceLevel":{"anyOf":[{"type":"integer","minimum":0,"maximum":4},{"type":"null"}]},"origin":{"type":"string","enum":["player","world","live-selection","authored-topic","authored-fallback","authored-direct","npc","access","recovery"]},"interpretation":{"anyOf":[{"$ref":"#/$defs/InterpretationTag"},{"type":"null"}]},"uncertain":{"type":"boolean"}},"required":["id","seq","visitId","kind","refs","contentIds","actionId","runId","cueIndex","recordId","requestId","outcome","puppet","assistanceLevel","origin","interpretation","uncertain"],"additionalProperties":false};

function validate146(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate146.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.id === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.seq === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "seq"},message:"must have required property '"+"seq"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.visitId === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "visitId"},message:"must have required property '"+"visitId"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.kind === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "kind"},message:"must have required property '"+"kind"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.refs === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "refs"},message:"must have required property '"+"refs"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.contentIds === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "contentIds"},message:"must have required property '"+"contentIds"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.actionId === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "actionId"},message:"must have required property '"+"actionId"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.runId === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "runId"},message:"must have required property '"+"runId"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.cueIndex === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "cueIndex"},message:"must have required property '"+"cueIndex"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(data.recordId === undefined){
const err9 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "recordId"},message:"must have required property '"+"recordId"+"'"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(data.requestId === undefined){
const err10 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "requestId"},message:"must have required property '"+"requestId"+"'"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(data.outcome === undefined){
const err11 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "outcome"},message:"must have required property '"+"outcome"+"'"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(data.puppet === undefined){
const err12 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "puppet"},message:"must have required property '"+"puppet"+"'"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(data.assistanceLevel === undefined){
const err13 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "assistanceLevel"},message:"must have required property '"+"assistanceLevel"+"'"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(data.origin === undefined){
const err14 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "origin"},message:"must have required property '"+"origin"+"'"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
if(data.interpretation === undefined){
const err15 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "interpretation"},message:"must have required property '"+"interpretation"+"'"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(data.uncertain === undefined){
const err16 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "uncertain"},message:"must have required property '"+"uncertain"+"'"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema56.properties, key0))){
const err17 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.id !== undefined){
let data0 = data.id;
if(typeof data0 === "string"){
if(func2(data0) > 36){
const err18 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if(!pattern43.test(data0)){
const err19 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
else {
const err20 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
if(data.seq !== undefined){
let data1 = data.seq;
if(!(((typeof data1 == "number") && (!(data1 % 1) && !isNaN(data1))) && (isFinite(data1)))){
const err21 = {instancePath:instancePath+"/seq",schemaPath:"#/properties/seq/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
if((typeof data1 == "number") && (isFinite(data1))){
if(data1 > 9007199254740991 || isNaN(data1)){
const err22 = {instancePath:instancePath+"/seq",schemaPath:"#/properties/seq/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
if(data1 < 0 || isNaN(data1)){
const err23 = {instancePath:instancePath+"/seq",schemaPath:"#/properties/seq/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
}
if(data.visitId !== undefined){
let data2 = data.visitId;
if(typeof data2 === "string"){
if(func2(data2) > 36){
const err24 = {instancePath:instancePath+"/visitId",schemaPath:"#/properties/visitId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
if(!pattern43.test(data2)){
const err25 = {instancePath:instancePath+"/visitId",schemaPath:"#/properties/visitId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
else {
const err26 = {instancePath:instancePath+"/visitId",schemaPath:"#/properties/visitId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
if(data.kind !== undefined){
let data3 = data.kind;
if(typeof data3 !== "string"){
const err27 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
if(!((((((((((((((((((data3 === "source-available") || (data3 === "source-displayed")) || (data3 === "physical-commit")) || (data3 === "cue-started")) || (data3 === "cue-outcome")) || (data3 === "run-finalized")) || (data3 === "explanation-recorded")) || (data3 === "evidence-delivered")) || (data3 === "help-requested")) || (data3 === "help-selected")) || (data3 === "help-displayed")) || (data3 === "possible-outcome")) || (data3 === "history-uncertain")) || (data3 === "reading-model-played")) || (data3 === "reading-practice-requested")) || (data3 === "reading-self-reported")) || (data3 === "word-looked-up")) || (data3 === "supplied-support"))){
const err28 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/enum",keyword:"enum",params:{allowedValues: schema56.properties.kind.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data.refs !== undefined){
let data4 = data.refs;
if(Array.isArray(data4)){
if(data4.length > 64){
const err29 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
const len0 = data4.length;
for(let i0=0; i0<len0; i0++){
let data5 = data4[i0];
if(typeof data5 === "string"){
if(func2(data5) > 160){
const err30 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
if(!pattern3.test(data5)){
const err31 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
else {
const err32 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
let i1 = data4.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data4[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err33 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err34 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
if(data.contentIds !== undefined){
let data6 = data.contentIds;
if(Array.isArray(data6)){
if(data6.length > 64){
const err35 = {instancePath:instancePath+"/contentIds",schemaPath:"#/properties/contentIds/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
const len1 = data6.length;
for(let i2=0; i2<len1; i2++){
let data7 = data6[i2];
if(typeof data7 === "string"){
if(func2(data7) > 160){
const err36 = {instancePath:instancePath+"/contentIds/" + i2,schemaPath:"#/properties/contentIds/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
if(!pattern3.test(data7)){
const err37 = {instancePath:instancePath+"/contentIds/" + i2,schemaPath:"#/properties/contentIds/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
else {
const err38 = {instancePath:instancePath+"/contentIds/" + i2,schemaPath:"#/properties/contentIds/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
let i3 = data6.length;
let j1;
if(i3 > 1){
const indices1 = {};
for(;i3--;){
let item1 = data6[i3];
if(typeof item1 !== "string"){
continue;
}
if(typeof indices1[item1] == "number"){
j1 = indices1[item1];
const err39 = {instancePath:instancePath+"/contentIds",schemaPath:"#/properties/contentIds/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
break;
}
indices1[item1] = i3;
}
}
}
else {
const err40 = {instancePath:instancePath+"/contentIds",schemaPath:"#/properties/contentIds/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
if(data.actionId !== undefined){
let data8 = data.actionId;
const _errs19 = errors;
let valid7 = false;
const _errs20 = errors;
if(typeof data8 === "string"){
if(func2(data8) > 160){
const err41 = {instancePath:instancePath+"/actionId",schemaPath:"#/properties/actionId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
if(!pattern3.test(data8)){
const err42 = {instancePath:instancePath+"/actionId",schemaPath:"#/properties/actionId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
}
else {
const err43 = {instancePath:instancePath+"/actionId",schemaPath:"#/properties/actionId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
var _valid0 = _errs20 === errors;
valid7 = valid7 || _valid0;
const _errs22 = errors;
if(data8 !== null){
const err44 = {instancePath:instancePath+"/actionId",schemaPath:"#/properties/actionId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
var _valid0 = _errs22 === errors;
valid7 = valid7 || _valid0;
if(!valid7){
const err45 = {instancePath:instancePath+"/actionId",schemaPath:"#/properties/actionId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
else {
errors = _errs19;
if(vErrors !== null){
if(_errs19){
vErrors.length = _errs19;
}
else {
vErrors = null;
}
}
}
}
if(data.runId !== undefined){
let data9 = data.runId;
const _errs25 = errors;
let valid8 = false;
const _errs26 = errors;
if(typeof data9 === "string"){
if(func2(data9) > 36){
const err46 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
if(!pattern43.test(data9)){
const err47 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
}
else {
const err48 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
var _valid1 = _errs26 === errors;
valid8 = valid8 || _valid1;
const _errs28 = errors;
if(data9 !== null){
const err49 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
var _valid1 = _errs28 === errors;
valid8 = valid8 || _valid1;
if(!valid8){
const err50 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
else {
errors = _errs25;
if(vErrors !== null){
if(_errs25){
vErrors.length = _errs25;
}
else {
vErrors = null;
}
}
}
}
if(data.cueIndex !== undefined){
let data10 = data.cueIndex;
const _errs31 = errors;
let valid9 = false;
const _errs32 = errors;
if(!(((typeof data10 == "number") && (!(data10 % 1) && !isNaN(data10))) && (isFinite(data10)))){
const err51 = {instancePath:instancePath+"/cueIndex",schemaPath:"#/properties/cueIndex/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
if((typeof data10 == "number") && (isFinite(data10))){
if(data10 > 9007199254740991 || isNaN(data10)){
const err52 = {instancePath:instancePath+"/cueIndex",schemaPath:"#/properties/cueIndex/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err52];
}
else {
vErrors.push(err52);
}
errors++;
}
if(data10 < 0 || isNaN(data10)){
const err53 = {instancePath:instancePath+"/cueIndex",schemaPath:"#/properties/cueIndex/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
}
var _valid2 = _errs32 === errors;
valid9 = valid9 || _valid2;
const _errs34 = errors;
if(data10 !== null){
const err54 = {instancePath:instancePath+"/cueIndex",schemaPath:"#/properties/cueIndex/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
}
var _valid2 = _errs34 === errors;
valid9 = valid9 || _valid2;
if(!valid9){
const err55 = {instancePath:instancePath+"/cueIndex",schemaPath:"#/properties/cueIndex/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err55];
}
else {
vErrors.push(err55);
}
errors++;
}
else {
errors = _errs31;
if(vErrors !== null){
if(_errs31){
vErrors.length = _errs31;
}
else {
vErrors = null;
}
}
}
}
if(data.recordId !== undefined){
let data11 = data.recordId;
const _errs37 = errors;
let valid10 = false;
const _errs38 = errors;
if(typeof data11 === "string"){
if(func2(data11) > 36){
const err56 = {instancePath:instancePath+"/recordId",schemaPath:"#/properties/recordId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err56];
}
else {
vErrors.push(err56);
}
errors++;
}
if(!pattern43.test(data11)){
const err57 = {instancePath:instancePath+"/recordId",schemaPath:"#/properties/recordId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err57];
}
else {
vErrors.push(err57);
}
errors++;
}
}
else {
const err58 = {instancePath:instancePath+"/recordId",schemaPath:"#/properties/recordId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err58];
}
else {
vErrors.push(err58);
}
errors++;
}
var _valid3 = _errs38 === errors;
valid10 = valid10 || _valid3;
const _errs40 = errors;
if(data11 !== null){
const err59 = {instancePath:instancePath+"/recordId",schemaPath:"#/properties/recordId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err59];
}
else {
vErrors.push(err59);
}
errors++;
}
var _valid3 = _errs40 === errors;
valid10 = valid10 || _valid3;
if(!valid10){
const err60 = {instancePath:instancePath+"/recordId",schemaPath:"#/properties/recordId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err60];
}
else {
vErrors.push(err60);
}
errors++;
}
else {
errors = _errs37;
if(vErrors !== null){
if(_errs37){
vErrors.length = _errs37;
}
else {
vErrors = null;
}
}
}
}
if(data.requestId !== undefined){
let data12 = data.requestId;
const _errs43 = errors;
let valid11 = false;
const _errs44 = errors;
if(typeof data12 === "string"){
if(func2(data12) > 36){
const err61 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err61];
}
else {
vErrors.push(err61);
}
errors++;
}
if(!pattern43.test(data12)){
const err62 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err62];
}
else {
vErrors.push(err62);
}
errors++;
}
}
else {
const err63 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err63];
}
else {
vErrors.push(err63);
}
errors++;
}
var _valid4 = _errs44 === errors;
valid11 = valid11 || _valid4;
const _errs46 = errors;
if(data12 !== null){
const err64 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err64];
}
else {
vErrors.push(err64);
}
errors++;
}
var _valid4 = _errs46 === errors;
valid11 = valid11 || _valid4;
if(!valid11){
const err65 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err65];
}
else {
vErrors.push(err65);
}
errors++;
}
else {
errors = _errs43;
if(vErrors !== null){
if(_errs43){
vErrors.length = _errs43;
}
else {
vErrors = null;
}
}
}
}
if(data.outcome !== undefined){
let data13 = data.outcome;
const _errs49 = errors;
let valid12 = false;
const _errs50 = errors;
if(typeof data13 !== "string"){
const err66 = {instancePath:instancePath+"/outcome",schemaPath:"#/properties/outcome/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err66];
}
else {
vErrors.push(err66);
}
errors++;
}
if(!(((((((data13 === "changed") || (data13 === "noop")) || (data13 === "unmet")) || (data13 === "success")) || (data13 === "unsuccessful")) || (data13 === "canceled")) || (data13 === "possibly-seen"))){
const err67 = {instancePath:instancePath+"/outcome",schemaPath:"#/properties/outcome/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema56.properties.outcome.anyOf[0].enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err67];
}
else {
vErrors.push(err67);
}
errors++;
}
var _valid5 = _errs50 === errors;
valid12 = valid12 || _valid5;
const _errs52 = errors;
if(data13 !== null){
const err68 = {instancePath:instancePath+"/outcome",schemaPath:"#/properties/outcome/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err68];
}
else {
vErrors.push(err68);
}
errors++;
}
var _valid5 = _errs52 === errors;
valid12 = valid12 || _valid5;
if(!valid12){
const err69 = {instancePath:instancePath+"/outcome",schemaPath:"#/properties/outcome/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err69];
}
else {
vErrors.push(err69);
}
errors++;
}
else {
errors = _errs49;
if(vErrors !== null){
if(_errs49){
vErrors.length = _errs49;
}
else {
vErrors = null;
}
}
}
}
if(data.puppet !== undefined){
let data14 = data.puppet;
const _errs55 = errors;
let valid13 = false;
const _errs56 = errors;
if(!(validate129(data14, {instancePath:instancePath+"/puppet",parentData:data,parentDataProperty:"puppet",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate129.errors : vErrors.concat(validate129.errors);
errors = vErrors.length;
}
var _valid6 = _errs56 === errors;
valid13 = valid13 || _valid6;
const _errs57 = errors;
if(data14 !== null){
const err70 = {instancePath:instancePath+"/puppet",schemaPath:"#/properties/puppet/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err70];
}
else {
vErrors.push(err70);
}
errors++;
}
var _valid6 = _errs57 === errors;
valid13 = valid13 || _valid6;
if(!valid13){
const err71 = {instancePath:instancePath+"/puppet",schemaPath:"#/properties/puppet/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err71];
}
else {
vErrors.push(err71);
}
errors++;
}
else {
errors = _errs55;
if(vErrors !== null){
if(_errs55){
vErrors.length = _errs55;
}
else {
vErrors = null;
}
}
}
}
if(data.assistanceLevel !== undefined){
let data15 = data.assistanceLevel;
const _errs60 = errors;
let valid14 = false;
const _errs61 = errors;
if(!(((typeof data15 == "number") && (!(data15 % 1) && !isNaN(data15))) && (isFinite(data15)))){
const err72 = {instancePath:instancePath+"/assistanceLevel",schemaPath:"#/properties/assistanceLevel/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err72];
}
else {
vErrors.push(err72);
}
errors++;
}
if((typeof data15 == "number") && (isFinite(data15))){
if(data15 > 4 || isNaN(data15)){
const err73 = {instancePath:instancePath+"/assistanceLevel",schemaPath:"#/properties/assistanceLevel/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4},message:"must be <= 4"};
if(vErrors === null){
vErrors = [err73];
}
else {
vErrors.push(err73);
}
errors++;
}
if(data15 < 0 || isNaN(data15)){
const err74 = {instancePath:instancePath+"/assistanceLevel",schemaPath:"#/properties/assistanceLevel/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err74];
}
else {
vErrors.push(err74);
}
errors++;
}
}
var _valid7 = _errs61 === errors;
valid14 = valid14 || _valid7;
const _errs63 = errors;
if(data15 !== null){
const err75 = {instancePath:instancePath+"/assistanceLevel",schemaPath:"#/properties/assistanceLevel/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err75];
}
else {
vErrors.push(err75);
}
errors++;
}
var _valid7 = _errs63 === errors;
valid14 = valid14 || _valid7;
if(!valid14){
const err76 = {instancePath:instancePath+"/assistanceLevel",schemaPath:"#/properties/assistanceLevel/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err76];
}
else {
vErrors.push(err76);
}
errors++;
}
else {
errors = _errs60;
if(vErrors !== null){
if(_errs60){
vErrors.length = _errs60;
}
else {
vErrors = null;
}
}
}
}
if(data.origin !== undefined){
let data16 = data.origin;
if(typeof data16 !== "string"){
const err77 = {instancePath:instancePath+"/origin",schemaPath:"#/properties/origin/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err77];
}
else {
vErrors.push(err77);
}
errors++;
}
if(!(((((((((data16 === "player") || (data16 === "world")) || (data16 === "live-selection")) || (data16 === "authored-topic")) || (data16 === "authored-fallback")) || (data16 === "authored-direct")) || (data16 === "npc")) || (data16 === "access")) || (data16 === "recovery"))){
const err78 = {instancePath:instancePath+"/origin",schemaPath:"#/properties/origin/enum",keyword:"enum",params:{allowedValues: schema56.properties.origin.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err78];
}
else {
vErrors.push(err78);
}
errors++;
}
}
if(data.interpretation !== undefined){
let data17 = data.interpretation;
const _errs68 = errors;
let valid15 = false;
const _errs69 = errors;
if(!(validate100(data17, {instancePath:instancePath+"/interpretation",parentData:data,parentDataProperty:"interpretation",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate100.errors : vErrors.concat(validate100.errors);
errors = vErrors.length;
}
var _valid8 = _errs69 === errors;
valid15 = valid15 || _valid8;
const _errs70 = errors;
if(data17 !== null){
const err79 = {instancePath:instancePath+"/interpretation",schemaPath:"#/properties/interpretation/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err79];
}
else {
vErrors.push(err79);
}
errors++;
}
var _valid8 = _errs70 === errors;
valid15 = valid15 || _valid8;
if(!valid15){
const err80 = {instancePath:instancePath+"/interpretation",schemaPath:"#/properties/interpretation/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err80];
}
else {
vErrors.push(err80);
}
errors++;
}
else {
errors = _errs68;
if(vErrors !== null){
if(_errs68){
vErrors.length = _errs68;
}
else {
vErrors = null;
}
}
}
}
if(data.uncertain !== undefined){
if(typeof data.uncertain !== "boolean"){
const err81 = {instancePath:instancePath+"/uncertain",schemaPath:"#/properties/uncertain/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err81];
}
else {
vErrors.push(err81);
}
errors++;
}
}
}
else {
const err82 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err82];
}
else {
vErrors.push(err82);
}
errors++;
}
validate146.errors = vErrors;
return errors === 0;
}
validate146.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema57 = {"type":"object","properties":{"sourceId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"componentRef":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"accessId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"scrollFraction":{"type":"number","minimum":0,"maximum":1},"selectedRefs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"frame":{"anyOf":[{"type":"integer","minimum":1,"maximum":3},{"type":"null"}]}},"required":["sourceId","componentRef","accessId","scrollFraction","selectedRefs","frame"],"additionalProperties":false};

function validate150(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate150.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.sourceId === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "sourceId"},message:"must have required property '"+"sourceId"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.componentRef === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "componentRef"},message:"must have required property '"+"componentRef"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.accessId === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "accessId"},message:"must have required property '"+"accessId"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.scrollFraction === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "scrollFraction"},message:"must have required property '"+"scrollFraction"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.selectedRefs === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "selectedRefs"},message:"must have required property '"+"selectedRefs"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.frame === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "frame"},message:"must have required property '"+"frame"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
for(const key0 in data){
if(!((((((key0 === "sourceId") || (key0 === "componentRef")) || (key0 === "accessId")) || (key0 === "scrollFraction")) || (key0 === "selectedRefs")) || (key0 === "frame"))){
const err6 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.sourceId !== undefined){
let data0 = data.sourceId;
if(typeof data0 === "string"){
if(func2(data0) > 160){
const err7 = {instancePath:instancePath+"/sourceId",schemaPath:"#/properties/sourceId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(!pattern3.test(data0)){
const err8 = {instancePath:instancePath+"/sourceId",schemaPath:"#/properties/sourceId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath:instancePath+"/sourceId",schemaPath:"#/properties/sourceId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.componentRef !== undefined){
let data1 = data.componentRef;
if(typeof data1 === "string"){
if(func2(data1) > 160){
const err10 = {instancePath:instancePath+"/componentRef",schemaPath:"#/properties/componentRef/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(!pattern3.test(data1)){
const err11 = {instancePath:instancePath+"/componentRef",schemaPath:"#/properties/componentRef/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
else {
const err12 = {instancePath:instancePath+"/componentRef",schemaPath:"#/properties/componentRef/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.accessId !== undefined){
let data2 = data.accessId;
if(typeof data2 === "string"){
if(func2(data2) > 160){
const err13 = {instancePath:instancePath+"/accessId",schemaPath:"#/properties/accessId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(!pattern3.test(data2)){
const err14 = {instancePath:instancePath+"/accessId",schemaPath:"#/properties/accessId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
else {
const err15 = {instancePath:instancePath+"/accessId",schemaPath:"#/properties/accessId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.scrollFraction !== undefined){
let data3 = data.scrollFraction;
if((typeof data3 == "number") && (isFinite(data3))){
if(data3 > 1 || isNaN(data3)){
const err16 = {instancePath:instancePath+"/scrollFraction",schemaPath:"#/properties/scrollFraction/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
if(data3 < 0 || isNaN(data3)){
const err17 = {instancePath:instancePath+"/scrollFraction",schemaPath:"#/properties/scrollFraction/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
else {
const err18 = {instancePath:instancePath+"/scrollFraction",schemaPath:"#/properties/scrollFraction/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(data.selectedRefs !== undefined){
let data4 = data.selectedRefs;
if(Array.isArray(data4)){
if(data4.length > 64){
const err19 = {instancePath:instancePath+"/selectedRefs",schemaPath:"#/properties/selectedRefs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
const len0 = data4.length;
for(let i0=0; i0<len0; i0++){
let data5 = data4[i0];
if(typeof data5 === "string"){
if(func2(data5) > 160){
const err20 = {instancePath:instancePath+"/selectedRefs/" + i0,schemaPath:"#/properties/selectedRefs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(!pattern3.test(data5)){
const err21 = {instancePath:instancePath+"/selectedRefs/" + i0,schemaPath:"#/properties/selectedRefs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
else {
const err22 = {instancePath:instancePath+"/selectedRefs/" + i0,schemaPath:"#/properties/selectedRefs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
let i1 = data4.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data4[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err23 = {instancePath:instancePath+"/selectedRefs",schemaPath:"#/properties/selectedRefs/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err24 = {instancePath:instancePath+"/selectedRefs",schemaPath:"#/properties/selectedRefs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data.frame !== undefined){
let data6 = data.frame;
const _errs15 = errors;
let valid4 = false;
const _errs16 = errors;
if(!(((typeof data6 == "number") && (!(data6 % 1) && !isNaN(data6))) && (isFinite(data6)))){
const err25 = {instancePath:instancePath+"/frame",schemaPath:"#/properties/frame/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
if((typeof data6 == "number") && (isFinite(data6))){
if(data6 > 3 || isNaN(data6)){
const err26 = {instancePath:instancePath+"/frame",schemaPath:"#/properties/frame/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 3},message:"must be <= 3"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
if(data6 < 1 || isNaN(data6)){
const err27 = {instancePath:instancePath+"/frame",schemaPath:"#/properties/frame/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
var _valid0 = _errs16 === errors;
valid4 = valid4 || _valid0;
const _errs18 = errors;
if(data6 !== null){
const err28 = {instancePath:instancePath+"/frame",schemaPath:"#/properties/frame/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
var _valid0 = _errs18 === errors;
valid4 = valid4 || _valid0;
if(!valid4){
const err29 = {instancePath:instancePath+"/frame",schemaPath:"#/properties/frame/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
else {
errors = _errs15;
if(vErrors !== null){
if(_errs15){
vErrors.length = _errs15;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err30 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
validate150.errors = vErrors;
return errors === 0;
}
validate150.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema58 = {"type":"object","properties":{"ownerId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"actionCtId":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]}},"required":["ownerId","actionCtId"],"additionalProperties":false};

function validate152(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate152.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.ownerId === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "ownerId"},message:"must have required property '"+"ownerId"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.actionCtId === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "actionCtId"},message:"must have required property '"+"actionCtId"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
for(const key0 in data){
if(!((key0 === "ownerId") || (key0 === "actionCtId"))){
const err2 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
if(data.ownerId !== undefined){
let data0 = data.ownerId;
if(typeof data0 === "string"){
if(func2(data0) > 160){
const err3 = {instancePath:instancePath+"/ownerId",schemaPath:"#/properties/ownerId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(!pattern3.test(data0)){
const err4 = {instancePath:instancePath+"/ownerId",schemaPath:"#/properties/ownerId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
else {
const err5 = {instancePath:instancePath+"/ownerId",schemaPath:"#/properties/ownerId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
if(data.actionCtId !== undefined){
let data1 = data.actionCtId;
const _errs5 = errors;
let valid1 = false;
const _errs6 = errors;
if(typeof data1 === "string"){
if(func2(data1) > 160){
const err6 = {instancePath:instancePath+"/actionCtId",schemaPath:"#/properties/actionCtId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(!pattern3.test(data1)){
const err7 = {instancePath:instancePath+"/actionCtId",schemaPath:"#/properties/actionCtId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
else {
const err8 = {instancePath:instancePath+"/actionCtId",schemaPath:"#/properties/actionCtId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
var _valid0 = _errs6 === errors;
valid1 = valid1 || _valid0;
const _errs8 = errors;
if(data1 !== null){
const err9 = {instancePath:instancePath+"/actionCtId",schemaPath:"#/properties/actionCtId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
var _valid0 = _errs8 === errors;
valid1 = valid1 || _valid0;
if(!valid1){
const err10 = {instancePath:instancePath+"/actionCtId",schemaPath:"#/properties/actionCtId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
else {
errors = _errs5;
if(vErrors !== null){
if(_errs5){
vErrors.length = _errs5;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err11 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
validate152.errors = vErrors;
return errors === 0;
}
validate152.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema59 = {"type":"object","properties":{"visitId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"caseRunId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"room":{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]},"topic":{"type":"string","enum":["where-loop","cancellation","recording","story-plan"]},"loopMode":{"type":"string","enum":["standby","following","docked","projecting"]},"caddyHost":{"type":"string","enum":["MD.RACK.STATION","ACT.PLAYER","ST.RACK.BAY"]},"arrangementRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"order":{"$ref":"#/$defs/Order"},"puppet":{"$ref":"#/$defs/Puppet"},"runId":{"anyOf":[{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},{"type":"null"}]},"nextCue":{"type":"integer","minimum":0,"maximum":4},"runStatus":{"type":"string","enum":["none","running","paused","finalized"]},"certified":{"type":"boolean"},"premiered":{"type":"boolean"},"exposedRefs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"availableAccesses":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"observedOutcomeRefs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"selectedRefs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":2,"uniqueItems":true},"priorHelp":{"type":"array","items":{"type":"object","properties":{"moveId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"refs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"level":{"type":"integer","minimum":1,"maximum":4}},"required":["moveId","refs","level"],"additionalProperties":false},"maxItems":16},"introducedFacts":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"explanationRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"theoryRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"observedOutcomes":{"type":"array","maxItems":16,"items":{"type":"object","properties":{"refId":{"type":"string","pattern":"^OBS\\.[A-Za-z0-9._:-]+$"},"tile":{"type":"string","enum":["TILE.FERRY","TILE.BRIDGE","TILE.PLANT","TILE.BLOOM"]},"from":{"$ref":"#/$defs/Puppet"},"to":{"$ref":"#/$defs/Puppet"},"result":{"type":"string","enum":["changed","noop","unmet"]}},"required":["refId","tile","from","to","result"],"additionalProperties":false}}},"required":["visitId","caseRunId","revision","room","topic","loopMode","caddyHost","arrangementRevision","order","puppet","runId","nextCue","runStatus","certified","premiered","exposedRefs","availableAccesses","observedOutcomeRefs","selectedRefs","priorHelp","introducedFacts","explanationRevision","theoryRevision","observedOutcomes"],"additionalProperties":false};
const pattern90 = new RegExp("^OBS\\.[A-Za-z0-9._:-]+$", "u");

function validate154(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate154.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.visitId === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "visitId"},message:"must have required property '"+"visitId"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.caseRunId === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "caseRunId"},message:"must have required property '"+"caseRunId"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.revision === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "revision"},message:"must have required property '"+"revision"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.room === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "room"},message:"must have required property '"+"room"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.topic === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "topic"},message:"must have required property '"+"topic"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.loopMode === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "loopMode"},message:"must have required property '"+"loopMode"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.caddyHost === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "caddyHost"},message:"must have required property '"+"caddyHost"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.arrangementRevision === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "arrangementRevision"},message:"must have required property '"+"arrangementRevision"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.order === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "order"},message:"must have required property '"+"order"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(data.puppet === undefined){
const err9 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "puppet"},message:"must have required property '"+"puppet"+"'"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(data.runId === undefined){
const err10 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "runId"},message:"must have required property '"+"runId"+"'"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(data.nextCue === undefined){
const err11 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "nextCue"},message:"must have required property '"+"nextCue"+"'"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(data.runStatus === undefined){
const err12 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "runStatus"},message:"must have required property '"+"runStatus"+"'"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(data.certified === undefined){
const err13 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "certified"},message:"must have required property '"+"certified"+"'"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(data.premiered === undefined){
const err14 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "premiered"},message:"must have required property '"+"premiered"+"'"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
if(data.exposedRefs === undefined){
const err15 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "exposedRefs"},message:"must have required property '"+"exposedRefs"+"'"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(data.availableAccesses === undefined){
const err16 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "availableAccesses"},message:"must have required property '"+"availableAccesses"+"'"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
if(data.observedOutcomeRefs === undefined){
const err17 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "observedOutcomeRefs"},message:"must have required property '"+"observedOutcomeRefs"+"'"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(data.selectedRefs === undefined){
const err18 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "selectedRefs"},message:"must have required property '"+"selectedRefs"+"'"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if(data.priorHelp === undefined){
const err19 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "priorHelp"},message:"must have required property '"+"priorHelp"+"'"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
if(data.introducedFacts === undefined){
const err20 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "introducedFacts"},message:"must have required property '"+"introducedFacts"+"'"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(data.explanationRevision === undefined){
const err21 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "explanationRevision"},message:"must have required property '"+"explanationRevision"+"'"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
if(data.theoryRevision === undefined){
const err22 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "theoryRevision"},message:"must have required property '"+"theoryRevision"+"'"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
if(data.observedOutcomes === undefined){
const err23 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "observedOutcomes"},message:"must have required property '"+"observedOutcomes"+"'"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema59.properties, key0))){
const err24 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data.visitId !== undefined){
let data0 = data.visitId;
if(typeof data0 === "string"){
if(func2(data0) > 36){
const err25 = {instancePath:instancePath+"/visitId",schemaPath:"#/properties/visitId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
if(!pattern43.test(data0)){
const err26 = {instancePath:instancePath+"/visitId",schemaPath:"#/properties/visitId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
else {
const err27 = {instancePath:instancePath+"/visitId",schemaPath:"#/properties/visitId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
if(data.caseRunId !== undefined){
let data1 = data.caseRunId;
if(typeof data1 === "string"){
if(func2(data1) > 36){
const err28 = {instancePath:instancePath+"/caseRunId",schemaPath:"#/properties/caseRunId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
if(!pattern43.test(data1)){
const err29 = {instancePath:instancePath+"/caseRunId",schemaPath:"#/properties/caseRunId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
else {
const err30 = {instancePath:instancePath+"/caseRunId",schemaPath:"#/properties/caseRunId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data.revision !== undefined){
let data2 = data.revision;
if(!(((typeof data2 == "number") && (!(data2 % 1) && !isNaN(data2))) && (isFinite(data2)))){
const err31 = {instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
if((typeof data2 == "number") && (isFinite(data2))){
if(data2 > 9007199254740991 || isNaN(data2)){
const err32 = {instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
if(data2 < 0 || isNaN(data2)){
const err33 = {instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
}
if(data.room !== undefined){
let data3 = data.room;
if(typeof data3 !== "string"){
const err34 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
if(!((((data3 === "SC.ST") || (data3 === "SC.CY")) || (data3 === "SC.WK")) || (data3 === "SC.MD"))){
const err35 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/enum",keyword:"enum",params:{allowedValues: schema59.properties.room.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
if(data.topic !== undefined){
let data4 = data.topic;
if(typeof data4 !== "string"){
const err36 = {instancePath:instancePath+"/topic",schemaPath:"#/properties/topic/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
if(!((((data4 === "where-loop") || (data4 === "cancellation")) || (data4 === "recording")) || (data4 === "story-plan"))){
const err37 = {instancePath:instancePath+"/topic",schemaPath:"#/properties/topic/enum",keyword:"enum",params:{allowedValues: schema59.properties.topic.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
if(data.loopMode !== undefined){
let data5 = data.loopMode;
if(typeof data5 !== "string"){
const err38 = {instancePath:instancePath+"/loopMode",schemaPath:"#/properties/loopMode/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
if(!((((data5 === "standby") || (data5 === "following")) || (data5 === "docked")) || (data5 === "projecting"))){
const err39 = {instancePath:instancePath+"/loopMode",schemaPath:"#/properties/loopMode/enum",keyword:"enum",params:{allowedValues: schema59.properties.loopMode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
if(data.caddyHost !== undefined){
let data6 = data.caddyHost;
if(typeof data6 !== "string"){
const err40 = {instancePath:instancePath+"/caddyHost",schemaPath:"#/properties/caddyHost/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
if(!(((data6 === "MD.RACK.STATION") || (data6 === "ACT.PLAYER")) || (data6 === "ST.RACK.BAY"))){
const err41 = {instancePath:instancePath+"/caddyHost",schemaPath:"#/properties/caddyHost/enum",keyword:"enum",params:{allowedValues: schema59.properties.caddyHost.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
if(data.arrangementRevision !== undefined){
let data7 = data.arrangementRevision;
if(!(((typeof data7 == "number") && (!(data7 % 1) && !isNaN(data7))) && (isFinite(data7)))){
const err42 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
if((typeof data7 == "number") && (isFinite(data7))){
if(data7 > 9007199254740991 || isNaN(data7)){
const err43 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
if(data7 < 0 || isNaN(data7)){
const err44 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
}
}
if(data.order !== undefined){
if(!(validate116(data.order, {instancePath:instancePath+"/order",parentData:data,parentDataProperty:"order",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate116.errors : vErrors.concat(validate116.errors);
errors = vErrors.length;
}
}
if(data.puppet !== undefined){
if(!(validate129(data.puppet, {instancePath:instancePath+"/puppet",parentData:data,parentDataProperty:"puppet",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate129.errors : vErrors.concat(validate129.errors);
errors = vErrors.length;
}
}
if(data.runId !== undefined){
let data10 = data.runId;
const _errs21 = errors;
let valid1 = false;
const _errs22 = errors;
if(typeof data10 === "string"){
if(func2(data10) > 36){
const err45 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
if(!pattern43.test(data10)){
const err46 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
}
else {
const err47 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
var _valid0 = _errs22 === errors;
valid1 = valid1 || _valid0;
const _errs24 = errors;
if(data10 !== null){
const err48 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
var _valid0 = _errs24 === errors;
valid1 = valid1 || _valid0;
if(!valid1){
const err49 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
else {
errors = _errs21;
if(vErrors !== null){
if(_errs21){
vErrors.length = _errs21;
}
else {
vErrors = null;
}
}
}
}
if(data.nextCue !== undefined){
let data11 = data.nextCue;
if(!(((typeof data11 == "number") && (!(data11 % 1) && !isNaN(data11))) && (isFinite(data11)))){
const err50 = {instancePath:instancePath+"/nextCue",schemaPath:"#/properties/nextCue/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
if((typeof data11 == "number") && (isFinite(data11))){
if(data11 > 4 || isNaN(data11)){
const err51 = {instancePath:instancePath+"/nextCue",schemaPath:"#/properties/nextCue/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4},message:"must be <= 4"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
if(data11 < 0 || isNaN(data11)){
const err52 = {instancePath:instancePath+"/nextCue",schemaPath:"#/properties/nextCue/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err52];
}
else {
vErrors.push(err52);
}
errors++;
}
}
}
if(data.runStatus !== undefined){
let data12 = data.runStatus;
if(typeof data12 !== "string"){
const err53 = {instancePath:instancePath+"/runStatus",schemaPath:"#/properties/runStatus/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
if(!((((data12 === "none") || (data12 === "running")) || (data12 === "paused")) || (data12 === "finalized"))){
const err54 = {instancePath:instancePath+"/runStatus",schemaPath:"#/properties/runStatus/enum",keyword:"enum",params:{allowedValues: schema59.properties.runStatus.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
}
}
if(data.certified !== undefined){
if(typeof data.certified !== "boolean"){
const err55 = {instancePath:instancePath+"/certified",schemaPath:"#/properties/certified/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err55];
}
else {
vErrors.push(err55);
}
errors++;
}
}
if(data.premiered !== undefined){
if(typeof data.premiered !== "boolean"){
const err56 = {instancePath:instancePath+"/premiered",schemaPath:"#/properties/premiered/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err56];
}
else {
vErrors.push(err56);
}
errors++;
}
}
if(data.exposedRefs !== undefined){
let data15 = data.exposedRefs;
if(Array.isArray(data15)){
if(data15.length > 64){
const err57 = {instancePath:instancePath+"/exposedRefs",schemaPath:"#/properties/exposedRefs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err57];
}
else {
vErrors.push(err57);
}
errors++;
}
const len0 = data15.length;
for(let i0=0; i0<len0; i0++){
let data16 = data15[i0];
if(typeof data16 === "string"){
if(func2(data16) > 160){
const err58 = {instancePath:instancePath+"/exposedRefs/" + i0,schemaPath:"#/properties/exposedRefs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err58];
}
else {
vErrors.push(err58);
}
errors++;
}
if(!pattern3.test(data16)){
const err59 = {instancePath:instancePath+"/exposedRefs/" + i0,schemaPath:"#/properties/exposedRefs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err59];
}
else {
vErrors.push(err59);
}
errors++;
}
}
else {
const err60 = {instancePath:instancePath+"/exposedRefs/" + i0,schemaPath:"#/properties/exposedRefs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err60];
}
else {
vErrors.push(err60);
}
errors++;
}
}
let i1 = data15.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data15[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err61 = {instancePath:instancePath+"/exposedRefs",schemaPath:"#/properties/exposedRefs/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err61];
}
else {
vErrors.push(err61);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err62 = {instancePath:instancePath+"/exposedRefs",schemaPath:"#/properties/exposedRefs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err62];
}
else {
vErrors.push(err62);
}
errors++;
}
}
if(data.availableAccesses !== undefined){
let data17 = data.availableAccesses;
if(Array.isArray(data17)){
if(data17.length > 64){
const err63 = {instancePath:instancePath+"/availableAccesses",schemaPath:"#/properties/availableAccesses/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err63];
}
else {
vErrors.push(err63);
}
errors++;
}
const len1 = data17.length;
for(let i2=0; i2<len1; i2++){
let data18 = data17[i2];
if(typeof data18 === "string"){
if(func2(data18) > 160){
const err64 = {instancePath:instancePath+"/availableAccesses/" + i2,schemaPath:"#/properties/availableAccesses/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err64];
}
else {
vErrors.push(err64);
}
errors++;
}
if(!pattern3.test(data18)){
const err65 = {instancePath:instancePath+"/availableAccesses/" + i2,schemaPath:"#/properties/availableAccesses/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err65];
}
else {
vErrors.push(err65);
}
errors++;
}
}
else {
const err66 = {instancePath:instancePath+"/availableAccesses/" + i2,schemaPath:"#/properties/availableAccesses/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err66];
}
else {
vErrors.push(err66);
}
errors++;
}
}
let i3 = data17.length;
let j1;
if(i3 > 1){
const indices1 = {};
for(;i3--;){
let item1 = data17[i3];
if(typeof item1 !== "string"){
continue;
}
if(typeof indices1[item1] == "number"){
j1 = indices1[item1];
const err67 = {instancePath:instancePath+"/availableAccesses",schemaPath:"#/properties/availableAccesses/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err67];
}
else {
vErrors.push(err67);
}
errors++;
break;
}
indices1[item1] = i3;
}
}
}
else {
const err68 = {instancePath:instancePath+"/availableAccesses",schemaPath:"#/properties/availableAccesses/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err68];
}
else {
vErrors.push(err68);
}
errors++;
}
}
if(data.observedOutcomeRefs !== undefined){
let data19 = data.observedOutcomeRefs;
if(Array.isArray(data19)){
if(data19.length > 64){
const err69 = {instancePath:instancePath+"/observedOutcomeRefs",schemaPath:"#/properties/observedOutcomeRefs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err69];
}
else {
vErrors.push(err69);
}
errors++;
}
const len2 = data19.length;
for(let i4=0; i4<len2; i4++){
let data20 = data19[i4];
if(typeof data20 === "string"){
if(func2(data20) > 160){
const err70 = {instancePath:instancePath+"/observedOutcomeRefs/" + i4,schemaPath:"#/properties/observedOutcomeRefs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err70];
}
else {
vErrors.push(err70);
}
errors++;
}
if(!pattern3.test(data20)){
const err71 = {instancePath:instancePath+"/observedOutcomeRefs/" + i4,schemaPath:"#/properties/observedOutcomeRefs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err71];
}
else {
vErrors.push(err71);
}
errors++;
}
}
else {
const err72 = {instancePath:instancePath+"/observedOutcomeRefs/" + i4,schemaPath:"#/properties/observedOutcomeRefs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err72];
}
else {
vErrors.push(err72);
}
errors++;
}
}
let i5 = data19.length;
let j2;
if(i5 > 1){
const indices2 = {};
for(;i5--;){
let item2 = data19[i5];
if(typeof item2 !== "string"){
continue;
}
if(typeof indices2[item2] == "number"){
j2 = indices2[item2];
const err73 = {instancePath:instancePath+"/observedOutcomeRefs",schemaPath:"#/properties/observedOutcomeRefs/uniqueItems",keyword:"uniqueItems",params:{i: i5, j: j2},message:"must NOT have duplicate items (items ## "+j2+" and "+i5+" are identical)"};
if(vErrors === null){
vErrors = [err73];
}
else {
vErrors.push(err73);
}
errors++;
break;
}
indices2[item2] = i5;
}
}
}
else {
const err74 = {instancePath:instancePath+"/observedOutcomeRefs",schemaPath:"#/properties/observedOutcomeRefs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err74];
}
else {
vErrors.push(err74);
}
errors++;
}
}
if(data.selectedRefs !== undefined){
let data21 = data.selectedRefs;
if(Array.isArray(data21)){
if(data21.length > 2){
const err75 = {instancePath:instancePath+"/selectedRefs",schemaPath:"#/properties/selectedRefs/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err75];
}
else {
vErrors.push(err75);
}
errors++;
}
const len3 = data21.length;
for(let i6=0; i6<len3; i6++){
let data22 = data21[i6];
if(typeof data22 === "string"){
if(func2(data22) > 160){
const err76 = {instancePath:instancePath+"/selectedRefs/" + i6,schemaPath:"#/properties/selectedRefs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err76];
}
else {
vErrors.push(err76);
}
errors++;
}
if(!pattern3.test(data22)){
const err77 = {instancePath:instancePath+"/selectedRefs/" + i6,schemaPath:"#/properties/selectedRefs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err77];
}
else {
vErrors.push(err77);
}
errors++;
}
}
else {
const err78 = {instancePath:instancePath+"/selectedRefs/" + i6,schemaPath:"#/properties/selectedRefs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err78];
}
else {
vErrors.push(err78);
}
errors++;
}
}
let i7 = data21.length;
let j3;
if(i7 > 1){
const indices3 = {};
for(;i7--;){
let item3 = data21[i7];
if(typeof item3 !== "string"){
continue;
}
if(typeof indices3[item3] == "number"){
j3 = indices3[item3];
const err79 = {instancePath:instancePath+"/selectedRefs",schemaPath:"#/properties/selectedRefs/uniqueItems",keyword:"uniqueItems",params:{i: i7, j: j3},message:"must NOT have duplicate items (items ## "+j3+" and "+i7+" are identical)"};
if(vErrors === null){
vErrors = [err79];
}
else {
vErrors.push(err79);
}
errors++;
break;
}
indices3[item3] = i7;
}
}
}
else {
const err80 = {instancePath:instancePath+"/selectedRefs",schemaPath:"#/properties/selectedRefs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err80];
}
else {
vErrors.push(err80);
}
errors++;
}
}
if(data.priorHelp !== undefined){
let data23 = data.priorHelp;
if(Array.isArray(data23)){
if(data23.length > 16){
const err81 = {instancePath:instancePath+"/priorHelp",schemaPath:"#/properties/priorHelp/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err81];
}
else {
vErrors.push(err81);
}
errors++;
}
const len4 = data23.length;
for(let i8=0; i8<len4; i8++){
let data24 = data23[i8];
if(data24 && typeof data24 == "object" && !Array.isArray(data24)){
if(data24.moveId === undefined){
const err82 = {instancePath:instancePath+"/priorHelp/" + i8,schemaPath:"#/properties/priorHelp/items/required",keyword:"required",params:{missingProperty: "moveId"},message:"must have required property '"+"moveId"+"'"};
if(vErrors === null){
vErrors = [err82];
}
else {
vErrors.push(err82);
}
errors++;
}
if(data24.refs === undefined){
const err83 = {instancePath:instancePath+"/priorHelp/" + i8,schemaPath:"#/properties/priorHelp/items/required",keyword:"required",params:{missingProperty: "refs"},message:"must have required property '"+"refs"+"'"};
if(vErrors === null){
vErrors = [err83];
}
else {
vErrors.push(err83);
}
errors++;
}
if(data24.level === undefined){
const err84 = {instancePath:instancePath+"/priorHelp/" + i8,schemaPath:"#/properties/priorHelp/items/required",keyword:"required",params:{missingProperty: "level"},message:"must have required property '"+"level"+"'"};
if(vErrors === null){
vErrors = [err84];
}
else {
vErrors.push(err84);
}
errors++;
}
for(const key1 in data24){
if(!(((key1 === "moveId") || (key1 === "refs")) || (key1 === "level"))){
const err85 = {instancePath:instancePath+"/priorHelp/" + i8,schemaPath:"#/properties/priorHelp/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err85];
}
else {
vErrors.push(err85);
}
errors++;
}
}
if(data24.moveId !== undefined){
let data25 = data24.moveId;
if(typeof data25 === "string"){
if(func2(data25) > 160){
const err86 = {instancePath:instancePath+"/priorHelp/" + i8+"/moveId",schemaPath:"#/properties/priorHelp/items/properties/moveId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err86];
}
else {
vErrors.push(err86);
}
errors++;
}
if(!pattern3.test(data25)){
const err87 = {instancePath:instancePath+"/priorHelp/" + i8+"/moveId",schemaPath:"#/properties/priorHelp/items/properties/moveId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err87];
}
else {
vErrors.push(err87);
}
errors++;
}
}
else {
const err88 = {instancePath:instancePath+"/priorHelp/" + i8+"/moveId",schemaPath:"#/properties/priorHelp/items/properties/moveId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err88];
}
else {
vErrors.push(err88);
}
errors++;
}
}
if(data24.refs !== undefined){
let data26 = data24.refs;
if(Array.isArray(data26)){
if(data26.length > 64){
const err89 = {instancePath:instancePath+"/priorHelp/" + i8+"/refs",schemaPath:"#/properties/priorHelp/items/properties/refs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err89];
}
else {
vErrors.push(err89);
}
errors++;
}
const len5 = data26.length;
for(let i9=0; i9<len5; i9++){
let data27 = data26[i9];
if(typeof data27 === "string"){
if(func2(data27) > 160){
const err90 = {instancePath:instancePath+"/priorHelp/" + i8+"/refs/" + i9,schemaPath:"#/properties/priorHelp/items/properties/refs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err90];
}
else {
vErrors.push(err90);
}
errors++;
}
if(!pattern3.test(data27)){
const err91 = {instancePath:instancePath+"/priorHelp/" + i8+"/refs/" + i9,schemaPath:"#/properties/priorHelp/items/properties/refs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err91];
}
else {
vErrors.push(err91);
}
errors++;
}
}
else {
const err92 = {instancePath:instancePath+"/priorHelp/" + i8+"/refs/" + i9,schemaPath:"#/properties/priorHelp/items/properties/refs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err92];
}
else {
vErrors.push(err92);
}
errors++;
}
}
let i10 = data26.length;
let j4;
if(i10 > 1){
const indices4 = {};
for(;i10--;){
let item4 = data26[i10];
if(typeof item4 !== "string"){
continue;
}
if(typeof indices4[item4] == "number"){
j4 = indices4[item4];
const err93 = {instancePath:instancePath+"/priorHelp/" + i8+"/refs",schemaPath:"#/properties/priorHelp/items/properties/refs/uniqueItems",keyword:"uniqueItems",params:{i: i10, j: j4},message:"must NOT have duplicate items (items ## "+j4+" and "+i10+" are identical)"};
if(vErrors === null){
vErrors = [err93];
}
else {
vErrors.push(err93);
}
errors++;
break;
}
indices4[item4] = i10;
}
}
}
else {
const err94 = {instancePath:instancePath+"/priorHelp/" + i8+"/refs",schemaPath:"#/properties/priorHelp/items/properties/refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err94];
}
else {
vErrors.push(err94);
}
errors++;
}
}
if(data24.level !== undefined){
let data28 = data24.level;
if(!(((typeof data28 == "number") && (!(data28 % 1) && !isNaN(data28))) && (isFinite(data28)))){
const err95 = {instancePath:instancePath+"/priorHelp/" + i8+"/level",schemaPath:"#/properties/priorHelp/items/properties/level/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err95];
}
else {
vErrors.push(err95);
}
errors++;
}
if((typeof data28 == "number") && (isFinite(data28))){
if(data28 > 4 || isNaN(data28)){
const err96 = {instancePath:instancePath+"/priorHelp/" + i8+"/level",schemaPath:"#/properties/priorHelp/items/properties/level/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4},message:"must be <= 4"};
if(vErrors === null){
vErrors = [err96];
}
else {
vErrors.push(err96);
}
errors++;
}
if(data28 < 1 || isNaN(data28)){
const err97 = {instancePath:instancePath+"/priorHelp/" + i8+"/level",schemaPath:"#/properties/priorHelp/items/properties/level/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err97];
}
else {
vErrors.push(err97);
}
errors++;
}
}
}
}
else {
const err98 = {instancePath:instancePath+"/priorHelp/" + i8,schemaPath:"#/properties/priorHelp/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err98];
}
else {
vErrors.push(err98);
}
errors++;
}
}
}
else {
const err99 = {instancePath:instancePath+"/priorHelp",schemaPath:"#/properties/priorHelp/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err99];
}
else {
vErrors.push(err99);
}
errors++;
}
}
if(data.introducedFacts !== undefined){
let data29 = data.introducedFacts;
if(Array.isArray(data29)){
if(data29.length > 64){
const err100 = {instancePath:instancePath+"/introducedFacts",schemaPath:"#/properties/introducedFacts/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err100];
}
else {
vErrors.push(err100);
}
errors++;
}
const len6 = data29.length;
for(let i11=0; i11<len6; i11++){
let data30 = data29[i11];
if(typeof data30 === "string"){
if(func2(data30) > 160){
const err101 = {instancePath:instancePath+"/introducedFacts/" + i11,schemaPath:"#/properties/introducedFacts/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err101];
}
else {
vErrors.push(err101);
}
errors++;
}
if(!pattern3.test(data30)){
const err102 = {instancePath:instancePath+"/introducedFacts/" + i11,schemaPath:"#/properties/introducedFacts/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err102];
}
else {
vErrors.push(err102);
}
errors++;
}
}
else {
const err103 = {instancePath:instancePath+"/introducedFacts/" + i11,schemaPath:"#/properties/introducedFacts/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err103];
}
else {
vErrors.push(err103);
}
errors++;
}
}
let i12 = data29.length;
let j5;
if(i12 > 1){
const indices5 = {};
for(;i12--;){
let item5 = data29[i12];
if(typeof item5 !== "string"){
continue;
}
if(typeof indices5[item5] == "number"){
j5 = indices5[item5];
const err104 = {instancePath:instancePath+"/introducedFacts",schemaPath:"#/properties/introducedFacts/uniqueItems",keyword:"uniqueItems",params:{i: i12, j: j5},message:"must NOT have duplicate items (items ## "+j5+" and "+i12+" are identical)"};
if(vErrors === null){
vErrors = [err104];
}
else {
vErrors.push(err104);
}
errors++;
break;
}
indices5[item5] = i12;
}
}
}
else {
const err105 = {instancePath:instancePath+"/introducedFacts",schemaPath:"#/properties/introducedFacts/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err105];
}
else {
vErrors.push(err105);
}
errors++;
}
}
if(data.explanationRevision !== undefined){
let data31 = data.explanationRevision;
if(!(((typeof data31 == "number") && (!(data31 % 1) && !isNaN(data31))) && (isFinite(data31)))){
const err106 = {instancePath:instancePath+"/explanationRevision",schemaPath:"#/properties/explanationRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err106];
}
else {
vErrors.push(err106);
}
errors++;
}
if((typeof data31 == "number") && (isFinite(data31))){
if(data31 > 9007199254740991 || isNaN(data31)){
const err107 = {instancePath:instancePath+"/explanationRevision",schemaPath:"#/properties/explanationRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err107];
}
else {
vErrors.push(err107);
}
errors++;
}
if(data31 < 0 || isNaN(data31)){
const err108 = {instancePath:instancePath+"/explanationRevision",schemaPath:"#/properties/explanationRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err108];
}
else {
vErrors.push(err108);
}
errors++;
}
}
}
if(data.theoryRevision !== undefined){
let data32 = data.theoryRevision;
if(!(((typeof data32 == "number") && (!(data32 % 1) && !isNaN(data32))) && (isFinite(data32)))){
const err109 = {instancePath:instancePath+"/theoryRevision",schemaPath:"#/properties/theoryRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err109];
}
else {
vErrors.push(err109);
}
errors++;
}
if((typeof data32 == "number") && (isFinite(data32))){
if(data32 > 9007199254740991 || isNaN(data32)){
const err110 = {instancePath:instancePath+"/theoryRevision",schemaPath:"#/properties/theoryRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err110];
}
else {
vErrors.push(err110);
}
errors++;
}
if(data32 < 0 || isNaN(data32)){
const err111 = {instancePath:instancePath+"/theoryRevision",schemaPath:"#/properties/theoryRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err111];
}
else {
vErrors.push(err111);
}
errors++;
}
}
}
if(data.observedOutcomes !== undefined){
let data33 = data.observedOutcomes;
if(Array.isArray(data33)){
if(data33.length > 16){
const err112 = {instancePath:instancePath+"/observedOutcomes",schemaPath:"#/properties/observedOutcomes/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err112];
}
else {
vErrors.push(err112);
}
errors++;
}
const len7 = data33.length;
for(let i13=0; i13<len7; i13++){
let data34 = data33[i13];
if(data34 && typeof data34 == "object" && !Array.isArray(data34)){
if(data34.refId === undefined){
const err113 = {instancePath:instancePath+"/observedOutcomes/" + i13,schemaPath:"#/properties/observedOutcomes/items/required",keyword:"required",params:{missingProperty: "refId"},message:"must have required property '"+"refId"+"'"};
if(vErrors === null){
vErrors = [err113];
}
else {
vErrors.push(err113);
}
errors++;
}
if(data34.tile === undefined){
const err114 = {instancePath:instancePath+"/observedOutcomes/" + i13,schemaPath:"#/properties/observedOutcomes/items/required",keyword:"required",params:{missingProperty: "tile"},message:"must have required property '"+"tile"+"'"};
if(vErrors === null){
vErrors = [err114];
}
else {
vErrors.push(err114);
}
errors++;
}
if(data34.from === undefined){
const err115 = {instancePath:instancePath+"/observedOutcomes/" + i13,schemaPath:"#/properties/observedOutcomes/items/required",keyword:"required",params:{missingProperty: "from"},message:"must have required property '"+"from"+"'"};
if(vErrors === null){
vErrors = [err115];
}
else {
vErrors.push(err115);
}
errors++;
}
if(data34.to === undefined){
const err116 = {instancePath:instancePath+"/observedOutcomes/" + i13,schemaPath:"#/properties/observedOutcomes/items/required",keyword:"required",params:{missingProperty: "to"},message:"must have required property '"+"to"+"'"};
if(vErrors === null){
vErrors = [err116];
}
else {
vErrors.push(err116);
}
errors++;
}
if(data34.result === undefined){
const err117 = {instancePath:instancePath+"/observedOutcomes/" + i13,schemaPath:"#/properties/observedOutcomes/items/required",keyword:"required",params:{missingProperty: "result"},message:"must have required property '"+"result"+"'"};
if(vErrors === null){
vErrors = [err117];
}
else {
vErrors.push(err117);
}
errors++;
}
for(const key2 in data34){
if(!(((((key2 === "refId") || (key2 === "tile")) || (key2 === "from")) || (key2 === "to")) || (key2 === "result"))){
const err118 = {instancePath:instancePath+"/observedOutcomes/" + i13,schemaPath:"#/properties/observedOutcomes/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err118];
}
else {
vErrors.push(err118);
}
errors++;
}
}
if(data34.refId !== undefined){
let data35 = data34.refId;
if(typeof data35 === "string"){
if(!pattern90.test(data35)){
const err119 = {instancePath:instancePath+"/observedOutcomes/" + i13+"/refId",schemaPath:"#/properties/observedOutcomes/items/properties/refId/pattern",keyword:"pattern",params:{pattern: "^OBS\\.[A-Za-z0-9._:-]+$"},message:"must match pattern \""+"^OBS\\.[A-Za-z0-9._:-]+$"+"\""};
if(vErrors === null){
vErrors = [err119];
}
else {
vErrors.push(err119);
}
errors++;
}
}
else {
const err120 = {instancePath:instancePath+"/observedOutcomes/" + i13+"/refId",schemaPath:"#/properties/observedOutcomes/items/properties/refId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err120];
}
else {
vErrors.push(err120);
}
errors++;
}
}
if(data34.tile !== undefined){
let data36 = data34.tile;
if(typeof data36 !== "string"){
const err121 = {instancePath:instancePath+"/observedOutcomes/" + i13+"/tile",schemaPath:"#/properties/observedOutcomes/items/properties/tile/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err121];
}
else {
vErrors.push(err121);
}
errors++;
}
if(!((((data36 === "TILE.FERRY") || (data36 === "TILE.BRIDGE")) || (data36 === "TILE.PLANT")) || (data36 === "TILE.BLOOM"))){
const err122 = {instancePath:instancePath+"/observedOutcomes/" + i13+"/tile",schemaPath:"#/properties/observedOutcomes/items/properties/tile/enum",keyword:"enum",params:{allowedValues: schema59.properties.observedOutcomes.items.properties.tile.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err122];
}
else {
vErrors.push(err122);
}
errors++;
}
}
if(data34.from !== undefined){
if(!(validate129(data34.from, {instancePath:instancePath+"/observedOutcomes/" + i13+"/from",parentData:data34,parentDataProperty:"from",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate129.errors : vErrors.concat(validate129.errors);
errors = vErrors.length;
}
}
if(data34.to !== undefined){
if(!(validate129(data34.to, {instancePath:instancePath+"/observedOutcomes/" + i13+"/to",parentData:data34,parentDataProperty:"to",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate129.errors : vErrors.concat(validate129.errors);
errors = vErrors.length;
}
}
if(data34.result !== undefined){
let data39 = data34.result;
if(typeof data39 !== "string"){
const err123 = {instancePath:instancePath+"/observedOutcomes/" + i13+"/result",schemaPath:"#/properties/observedOutcomes/items/properties/result/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err123];
}
else {
vErrors.push(err123);
}
errors++;
}
if(!(((data39 === "changed") || (data39 === "noop")) || (data39 === "unmet"))){
const err124 = {instancePath:instancePath+"/observedOutcomes/" + i13+"/result",schemaPath:"#/properties/observedOutcomes/items/properties/result/enum",keyword:"enum",params:{allowedValues: schema59.properties.observedOutcomes.items.properties.result.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err124];
}
else {
vErrors.push(err124);
}
errors++;
}
}
}
else {
const err125 = {instancePath:instancePath+"/observedOutcomes/" + i13,schemaPath:"#/properties/observedOutcomes/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err125];
}
else {
vErrors.push(err125);
}
errors++;
}
}
}
else {
const err126 = {instancePath:instancePath+"/observedOutcomes",schemaPath:"#/properties/observedOutcomes/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err126];
}
else {
vErrors.push(err126);
}
errors++;
}
}
}
else {
const err127 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err127];
}
else {
vErrors.push(err127);
}
errors++;
}
validate154.errors = vErrors;
return errors === 0;
}
validate154.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema60 = {"type":"object","properties":{"moveId":{"type":"string","enum":["NOTICE_CONTEXT","NOTICE_SCOPE","CLIP_LIMIT","POSITIVE_SUPPORT","TESTABLE_LEAD","PLAN_VS_RESULT","FULL_PROMISE","BOAT_CAPACITY","TOGETHER","ROOT_CONDITION","VALID_DIRECT","VALID_EXTRA","ARRANGEMENT_ONLY","CLARIFY","NARROW_CLAIM","UNKNOWN_DETAIL","RETURN_TO_CASE"]},"interpretation":{"$ref":"#/$defs/InterpretationTag"},"refs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"uncertain":{"type":"boolean"}},"required":["moveId","interpretation","refs","uncertain"],"additionalProperties":false};

function validate160(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate160.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.moveId === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "moveId"},message:"must have required property '"+"moveId"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.interpretation === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "interpretation"},message:"must have required property '"+"interpretation"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.refs === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "refs"},message:"must have required property '"+"refs"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.uncertain === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "uncertain"},message:"must have required property '"+"uncertain"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
for(const key0 in data){
if(!((((key0 === "moveId") || (key0 === "interpretation")) || (key0 === "refs")) || (key0 === "uncertain"))){
const err4 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data.moveId !== undefined){
let data0 = data.moveId;
if(typeof data0 !== "string"){
const err5 = {instancePath:instancePath+"/moveId",schemaPath:"#/properties/moveId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(!(((((((((((((((((data0 === "NOTICE_CONTEXT") || (data0 === "NOTICE_SCOPE")) || (data0 === "CLIP_LIMIT")) || (data0 === "POSITIVE_SUPPORT")) || (data0 === "TESTABLE_LEAD")) || (data0 === "PLAN_VS_RESULT")) || (data0 === "FULL_PROMISE")) || (data0 === "BOAT_CAPACITY")) || (data0 === "TOGETHER")) || (data0 === "ROOT_CONDITION")) || (data0 === "VALID_DIRECT")) || (data0 === "VALID_EXTRA")) || (data0 === "ARRANGEMENT_ONLY")) || (data0 === "CLARIFY")) || (data0 === "NARROW_CLAIM")) || (data0 === "UNKNOWN_DETAIL")) || (data0 === "RETURN_TO_CASE"))){
const err6 = {instancePath:instancePath+"/moveId",schemaPath:"#/properties/moveId/enum",keyword:"enum",params:{allowedValues: schema60.properties.moveId.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.interpretation !== undefined){
if(!(validate100(data.interpretation, {instancePath:instancePath+"/interpretation",parentData:data,parentDataProperty:"interpretation",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate100.errors : vErrors.concat(validate100.errors);
errors = vErrors.length;
}
}
if(data.refs !== undefined){
let data2 = data.refs;
if(Array.isArray(data2)){
if(data2.length > 64){
const err7 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
const len0 = data2.length;
for(let i0=0; i0<len0; i0++){
let data3 = data2[i0];
if(typeof data3 === "string"){
if(func2(data3) > 160){
const err8 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(!pattern3.test(data3)){
const err9 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
else {
const err10 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
let i1 = data2.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data2[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err11 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err12 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.uncertain !== undefined){
if(typeof data.uncertain !== "boolean"){
const err13 = {instancePath:instancePath+"/uncertain",schemaPath:"#/properties/uncertain/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
}
else {
const err14 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
validate160.errors = vErrors;
return errors === 0;
}
validate160.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema61 = {"type":"object","properties":{"version":{"const":1},"introBeat":{"type":"integer","minimum":0,"maximum":4},"introDismissed":{"type":"boolean"},"legacyOffer":{"type":"boolean"},"npcIntroductions":{"type":"array","items":{"enum":["ACT.JO","ACT.REMY","ACT.ARI"]},"maxItems":512,"uniqueItems":true},"narratorCard":{"anyOf":[{"enum":["READ.WELCOME","READ.PROMISE","READ.ENDING"]},{"type":"null"}]},"narratorPauses":{"type":"boolean"},"phrases":{"type":"boolean"},"wordContexts":{"type":"array","items":{"type":"string","maxLength":160},"maxItems":512,"uniqueItems":true},"supports":{"type":"array","items":{"type":"string","maxLength":160},"maxItems":512,"uniqueItems":true}},"required":["version","introBeat","introDismissed","legacyOffer","npcIntroductions","narratorCard","narratorPauses","phrases","wordContexts","supports"],"additionalProperties":false};
const func0 = ajvRuntime1.default;

function validate163(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate163.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.version === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "version"},message:"must have required property '"+"version"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.introBeat === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "introBeat"},message:"must have required property '"+"introBeat"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.introDismissed === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "introDismissed"},message:"must have required property '"+"introDismissed"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.legacyOffer === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "legacyOffer"},message:"must have required property '"+"legacyOffer"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.npcIntroductions === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "npcIntroductions"},message:"must have required property '"+"npcIntroductions"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.narratorCard === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "narratorCard"},message:"must have required property '"+"narratorCard"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.narratorPauses === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "narratorPauses"},message:"must have required property '"+"narratorPauses"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.phrases === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "phrases"},message:"must have required property '"+"phrases"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.wordContexts === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "wordContexts"},message:"must have required property '"+"wordContexts"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(data.supports === undefined){
const err9 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "supports"},message:"must have required property '"+"supports"+"'"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema61.properties, key0))){
const err10 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.version !== undefined){
if(1 !== data.version){
const err11 = {instancePath:instancePath+"/version",schemaPath:"#/properties/version/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.introBeat !== undefined){
let data1 = data.introBeat;
if(!(((typeof data1 == "number") && (!(data1 % 1) && !isNaN(data1))) && (isFinite(data1)))){
const err12 = {instancePath:instancePath+"/introBeat",schemaPath:"#/properties/introBeat/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if((typeof data1 == "number") && (isFinite(data1))){
if(data1 > 4 || isNaN(data1)){
const err13 = {instancePath:instancePath+"/introBeat",schemaPath:"#/properties/introBeat/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4},message:"must be <= 4"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(data1 < 0 || isNaN(data1)){
const err14 = {instancePath:instancePath+"/introBeat",schemaPath:"#/properties/introBeat/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
}
if(data.introDismissed !== undefined){
if(typeof data.introDismissed !== "boolean"){
const err15 = {instancePath:instancePath+"/introDismissed",schemaPath:"#/properties/introDismissed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.legacyOffer !== undefined){
if(typeof data.legacyOffer !== "boolean"){
const err16 = {instancePath:instancePath+"/legacyOffer",schemaPath:"#/properties/legacyOffer/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.npcIntroductions !== undefined){
let data4 = data.npcIntroductions;
if(Array.isArray(data4)){
if(data4.length > 512){
const err17 = {instancePath:instancePath+"/npcIntroductions",schemaPath:"#/properties/npcIntroductions/maxItems",keyword:"maxItems",params:{limit: 512},message:"must NOT have more than 512 items"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
const len0 = data4.length;
for(let i0=0; i0<len0; i0++){
let data5 = data4[i0];
if(!(((data5 === "ACT.JO") || (data5 === "ACT.REMY")) || (data5 === "ACT.ARI"))){
const err18 = {instancePath:instancePath+"/npcIntroductions/" + i0,schemaPath:"#/properties/npcIntroductions/items/enum",keyword:"enum",params:{allowedValues: schema61.properties.npcIntroductions.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
let i1 = data4.length;
let j0;
if(i1 > 1){
outer0:
for(;i1--;){
for(j0 = i1; j0--;){
if(func0(data4[i1], data4[j0])){
const err19 = {instancePath:instancePath+"/npcIntroductions",schemaPath:"#/properties/npcIntroductions/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
break outer0;
}
}
}
}
}
else {
const err20 = {instancePath:instancePath+"/npcIntroductions",schemaPath:"#/properties/npcIntroductions/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
if(data.narratorCard !== undefined){
let data6 = data.narratorCard;
const _errs13 = errors;
let valid4 = false;
const _errs14 = errors;
if(!(((data6 === "READ.WELCOME") || (data6 === "READ.PROMISE")) || (data6 === "READ.ENDING"))){
const err21 = {instancePath:instancePath+"/narratorCard",schemaPath:"#/properties/narratorCard/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema61.properties.narratorCard.anyOf[0].enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
var _valid0 = _errs14 === errors;
valid4 = valid4 || _valid0;
const _errs15 = errors;
if(data6 !== null){
const err22 = {instancePath:instancePath+"/narratorCard",schemaPath:"#/properties/narratorCard/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
var _valid0 = _errs15 === errors;
valid4 = valid4 || _valid0;
if(!valid4){
const err23 = {instancePath:instancePath+"/narratorCard",schemaPath:"#/properties/narratorCard/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
else {
errors = _errs13;
if(vErrors !== null){
if(_errs13){
vErrors.length = _errs13;
}
else {
vErrors = null;
}
}
}
}
if(data.narratorPauses !== undefined){
if(typeof data.narratorPauses !== "boolean"){
const err24 = {instancePath:instancePath+"/narratorPauses",schemaPath:"#/properties/narratorPauses/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data.phrases !== undefined){
if(typeof data.phrases !== "boolean"){
const err25 = {instancePath:instancePath+"/phrases",schemaPath:"#/properties/phrases/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data.wordContexts !== undefined){
let data9 = data.wordContexts;
if(Array.isArray(data9)){
if(data9.length > 512){
const err26 = {instancePath:instancePath+"/wordContexts",schemaPath:"#/properties/wordContexts/maxItems",keyword:"maxItems",params:{limit: 512},message:"must NOT have more than 512 items"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
const len1 = data9.length;
for(let i2=0; i2<len1; i2++){
let data10 = data9[i2];
if(typeof data10 === "string"){
if(func2(data10) > 160){
const err27 = {instancePath:instancePath+"/wordContexts/" + i2,schemaPath:"#/properties/wordContexts/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
else {
const err28 = {instancePath:instancePath+"/wordContexts/" + i2,schemaPath:"#/properties/wordContexts/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
let i3 = data9.length;
let j1;
if(i3 > 1){
const indices0 = {};
for(;i3--;){
let item0 = data9[i3];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j1 = indices0[item0];
const err29 = {instancePath:instancePath+"/wordContexts",schemaPath:"#/properties/wordContexts/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
break;
}
indices0[item0] = i3;
}
}
}
else {
const err30 = {instancePath:instancePath+"/wordContexts",schemaPath:"#/properties/wordContexts/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data.supports !== undefined){
let data11 = data.supports;
if(Array.isArray(data11)){
if(data11.length > 512){
const err31 = {instancePath:instancePath+"/supports",schemaPath:"#/properties/supports/maxItems",keyword:"maxItems",params:{limit: 512},message:"must NOT have more than 512 items"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
const len2 = data11.length;
for(let i4=0; i4<len2; i4++){
let data12 = data11[i4];
if(typeof data12 === "string"){
if(func2(data12) > 160){
const err32 = {instancePath:instancePath+"/supports/" + i4,schemaPath:"#/properties/supports/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
else {
const err33 = {instancePath:instancePath+"/supports/" + i4,schemaPath:"#/properties/supports/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
let i5 = data11.length;
let j2;
if(i5 > 1){
const indices1 = {};
for(;i5--;){
let item1 = data11[i5];
if(typeof item1 !== "string"){
continue;
}
if(typeof indices1[item1] == "number"){
j2 = indices1[item1];
const err34 = {instancePath:instancePath+"/supports",schemaPath:"#/properties/supports/uniqueItems",keyword:"uniqueItems",params:{i: i5, j: j2},message:"must NOT have duplicate items (items ## "+j2+" and "+i5+" are identical)"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
break;
}
indices1[item1] = i5;
}
}
}
else {
const err35 = {instancePath:instancePath+"/supports",schemaPath:"#/properties/supports/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
}
else {
const err36 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
validate163.errors = vErrors;
return errors === 0;
}
validate163.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate112(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate112.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.caseRunId === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "caseRunId"},message:"must have required property '"+"caseRunId"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.revision === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "revision"},message:"must have required property '"+"revision"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.lastObservationSeq === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "lastObservationSeq"},message:"must have required property '"+"lastObservationSeq"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.physical === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "physical"},message:"must have required property '"+"physical"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.grants === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "grants"},message:"must have required property '"+"grants"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.exposures === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "exposures"},message:"must have required property '"+"exposures"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.selectedLead === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "selectedLead"},message:"must have required property '"+"selectedLead"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.comparisons === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "comparisons"},message:"must have required property '"+"comparisons"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.drafts === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "drafts"},message:"must have required property '"+"drafts"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(data.records === undefined){
const err9 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "records"},message:"must have required property '"+"records"+"'"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(data.npcReceived === undefined){
const err10 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "npcReceived"},message:"must have required property '"+"npcReceived"+"'"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(data.playback === undefined){
const err11 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "playback"},message:"must have required property '"+"playback"+"'"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(data.runHistory === undefined){
const err12 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "runHistory"},message:"must have required property '"+"runHistory"+"'"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(data.certificate === undefined){
const err13 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "certificate"},message:"must have required property '"+"certificate"+"'"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(data.premiere === undefined){
const err14 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "premiere"},message:"must have required property '"+"premiere"+"'"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
if(data.observations === undefined){
const err15 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "observations"},message:"must have required property '"+"observations"+"'"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(data.readerResume === undefined){
const err16 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "readerResume"},message:"must have required property '"+"readerResume"+"'"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
if(data.worldReturn === undefined){
const err17 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "worldReturn"},message:"must have required property '"+"worldReturn"+"'"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(data.historyUncertain === undefined){
const err18 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "historyUncertain"},message:"must have required property '"+"historyUncertain"+"'"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if(data.guidance === undefined){
const err19 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "guidance"},message:"must have required property '"+"guidance"+"'"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
if(data.visitedRooms === undefined){
const err20 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "visitedRooms"},message:"must have required property '"+"visitedRooms"+"'"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(data.encounteredActors === undefined){
const err21 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "encounteredActors"},message:"must have required property '"+"encounteredActors"+"'"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
if(data.coachingHistory === undefined){
const err22 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "coachingHistory"},message:"must have required property '"+"coachingHistory"+"'"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema43.properties, key0))){
const err23 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data.caseRunId !== undefined){
let data0 = data.caseRunId;
if(typeof data0 === "string"){
if(func2(data0) > 36){
const err24 = {instancePath:instancePath+"/caseRunId",schemaPath:"#/properties/caseRunId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
if(!pattern43.test(data0)){
const err25 = {instancePath:instancePath+"/caseRunId",schemaPath:"#/properties/caseRunId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
else {
const err26 = {instancePath:instancePath+"/caseRunId",schemaPath:"#/properties/caseRunId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
if(data.revision !== undefined){
let data1 = data.revision;
if(!(((typeof data1 == "number") && (!(data1 % 1) && !isNaN(data1))) && (isFinite(data1)))){
const err27 = {instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
if((typeof data1 == "number") && (isFinite(data1))){
if(data1 > 9007199254740991 || isNaN(data1)){
const err28 = {instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
if(data1 < 0 || isNaN(data1)){
const err29 = {instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
}
if(data.lastObservationSeq !== undefined){
let data2 = data.lastObservationSeq;
if(!(((typeof data2 == "number") && (!(data2 % 1) && !isNaN(data2))) && (isFinite(data2)))){
const err30 = {instancePath:instancePath+"/lastObservationSeq",schemaPath:"#/properties/lastObservationSeq/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
if((typeof data2 == "number") && (isFinite(data2))){
if(data2 > 9007199254740991 || isNaN(data2)){
const err31 = {instancePath:instancePath+"/lastObservationSeq",schemaPath:"#/properties/lastObservationSeq/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
if(data2 < 0 || isNaN(data2)){
const err32 = {instancePath:instancePath+"/lastObservationSeq",schemaPath:"#/properties/lastObservationSeq/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
}
if(data.physical !== undefined){
if(!(validate113(data.physical, {instancePath:instancePath+"/physical",parentData:data,parentDataProperty:"physical",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate113.errors : vErrors.concat(validate113.errors);
errors = vErrors.length;
}
}
if(data.grants !== undefined){
let data4 = data.grants;
if(Array.isArray(data4)){
const len0 = data4.length;
for(let i0=0; i0<len0; i0++){
if(!(validate119(data4[i0], {instancePath:instancePath+"/grants/" + i0,parentData:data4,parentDataProperty:i0,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate119.errors : vErrors.concat(validate119.errors);
errors = vErrors.length;
}
}
}
else {
const err33 = {instancePath:instancePath+"/grants",schemaPath:"#/properties/grants/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
if(data.exposures !== undefined){
let data6 = data.exposures;
if(Array.isArray(data6)){
const len1 = data6.length;
for(let i1=0; i1<len1; i1++){
if(!(validate121(data6[i1], {instancePath:instancePath+"/exposures/" + i1,parentData:data6,parentDataProperty:i1,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate121.errors : vErrors.concat(validate121.errors);
errors = vErrors.length;
}
}
}
else {
const err34 = {instancePath:instancePath+"/exposures",schemaPath:"#/properties/exposures/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
if(data.selectedLead !== undefined){
let data8 = data.selectedLead;
const _errs16 = errors;
let valid5 = false;
const _errs17 = errors;
if(typeof data8 !== "string"){
const err35 = {instancePath:instancePath+"/selectedLead",schemaPath:"#/properties/selectedLead/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
if(!((((data8 === "where-loop") || (data8 === "cancellation")) || (data8 === "recording")) || (data8 === "story-plan"))){
const err36 = {instancePath:instancePath+"/selectedLead",schemaPath:"#/properties/selectedLead/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema43.properties.selectedLead.anyOf[0].enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
var _valid0 = _errs17 === errors;
valid5 = valid5 || _valid0;
const _errs19 = errors;
if(data8 !== null){
const err37 = {instancePath:instancePath+"/selectedLead",schemaPath:"#/properties/selectedLead/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
var _valid0 = _errs19 === errors;
valid5 = valid5 || _valid0;
if(!valid5){
const err38 = {instancePath:instancePath+"/selectedLead",schemaPath:"#/properties/selectedLead/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
else {
errors = _errs16;
if(vErrors !== null){
if(_errs16){
vErrors.length = _errs16;
}
else {
vErrors = null;
}
}
}
}
if(data.comparisons !== undefined){
let data9 = data.comparisons;
if(Array.isArray(data9)){
const len2 = data9.length;
for(let i2=0; i2<len2; i2++){
if(!(validate124(data9[i2], {instancePath:instancePath+"/comparisons/" + i2,parentData:data9,parentDataProperty:i2,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate124.errors : vErrors.concat(validate124.errors);
errors = vErrors.length;
}
}
}
else {
const err39 = {instancePath:instancePath+"/comparisons",schemaPath:"#/properties/comparisons/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
if(data.drafts !== undefined){
let data11 = data.drafts;
if(Array.isArray(data11)){
if(data11.length > 5){
const err40 = {instancePath:instancePath+"/drafts",schemaPath:"#/properties/drafts/maxItems",keyword:"maxItems",params:{limit: 5},message:"must NOT have more than 5 items"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
const len3 = data11.length;
for(let i3=0; i3<len3; i3++){
if(!(validate126(data11[i3], {instancePath:instancePath+"/drafts/" + i3,parentData:data11,parentDataProperty:i3,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate126.errors : vErrors.concat(validate126.errors);
errors = vErrors.length;
}
}
}
else {
const err41 = {instancePath:instancePath+"/drafts",schemaPath:"#/properties/drafts/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
if(data.records !== undefined){
let data13 = data.records;
if(Array.isArray(data13)){
const len4 = data13.length;
for(let i4=0; i4<len4; i4++){
if(!(validate128(data13[i4], {instancePath:instancePath+"/records/" + i4,parentData:data13,parentDataProperty:i4,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate128.errors : vErrors.concat(validate128.errors);
errors = vErrors.length;
}
}
}
else {
const err42 = {instancePath:instancePath+"/records",schemaPath:"#/properties/records/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
}
if(data.npcReceived !== undefined){
let data15 = data.npcReceived;
if(Array.isArray(data15)){
if(data15.length > 3){
const err43 = {instancePath:instancePath+"/npcReceived",schemaPath:"#/properties/npcReceived/maxItems",keyword:"maxItems",params:{limit: 3},message:"must NOT have more than 3 items"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
const len5 = data15.length;
for(let i5=0; i5<len5; i5++){
let data16 = data15[i5];
if(data16 && typeof data16 == "object" && !Array.isArray(data16)){
if(data16.actorId === undefined){
const err44 = {instancePath:instancePath+"/npcReceived/" + i5,schemaPath:"#/properties/npcReceived/items/required",keyword:"required",params:{missingProperty: "actorId"},message:"must have required property '"+"actorId"+"'"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
if(data16.refs === undefined){
const err45 = {instancePath:instancePath+"/npcReceived/" + i5,schemaPath:"#/properties/npcReceived/items/required",keyword:"required",params:{missingProperty: "refs"},message:"must have required property '"+"refs"+"'"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
if(data16.deliveryRecordIds === undefined){
const err46 = {instancePath:instancePath+"/npcReceived/" + i5,schemaPath:"#/properties/npcReceived/items/required",keyword:"required",params:{missingProperty: "deliveryRecordIds"},message:"must have required property '"+"deliveryRecordIds"+"'"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
for(const key1 in data16){
if(!(((key1 === "actorId") || (key1 === "refs")) || (key1 === "deliveryRecordIds"))){
const err47 = {instancePath:instancePath+"/npcReceived/" + i5,schemaPath:"#/properties/npcReceived/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
}
if(data16.actorId !== undefined){
let data17 = data16.actorId;
if(typeof data17 !== "string"){
const err48 = {instancePath:instancePath+"/npcReceived/" + i5+"/actorId",schemaPath:"#/properties/npcReceived/items/properties/actorId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
if(!(((data17 === "ACT.JO") || (data17 === "ACT.REMY")) || (data17 === "ACT.ARI"))){
const err49 = {instancePath:instancePath+"/npcReceived/" + i5+"/actorId",schemaPath:"#/properties/npcReceived/items/properties/actorId/enum",keyword:"enum",params:{allowedValues: schema43.properties.npcReceived.items.properties.actorId.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
}
if(data16.refs !== undefined){
let data18 = data16.refs;
if(Array.isArray(data18)){
if(data18.length > 64){
const err50 = {instancePath:instancePath+"/npcReceived/" + i5+"/refs",schemaPath:"#/properties/npcReceived/items/properties/refs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
const len6 = data18.length;
for(let i6=0; i6<len6; i6++){
let data19 = data18[i6];
if(typeof data19 === "string"){
if(func2(data19) > 160){
const err51 = {instancePath:instancePath+"/npcReceived/" + i5+"/refs/" + i6,schemaPath:"#/properties/npcReceived/items/properties/refs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
if(!pattern3.test(data19)){
const err52 = {instancePath:instancePath+"/npcReceived/" + i5+"/refs/" + i6,schemaPath:"#/properties/npcReceived/items/properties/refs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err52];
}
else {
vErrors.push(err52);
}
errors++;
}
}
else {
const err53 = {instancePath:instancePath+"/npcReceived/" + i5+"/refs/" + i6,schemaPath:"#/properties/npcReceived/items/properties/refs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
}
let i7 = data18.length;
let j0;
if(i7 > 1){
const indices0 = {};
for(;i7--;){
let item0 = data18[i7];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err54 = {instancePath:instancePath+"/npcReceived/" + i5+"/refs",schemaPath:"#/properties/npcReceived/items/properties/refs/uniqueItems",keyword:"uniqueItems",params:{i: i7, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i7+" are identical)"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
break;
}
indices0[item0] = i7;
}
}
}
else {
const err55 = {instancePath:instancePath+"/npcReceived/" + i5+"/refs",schemaPath:"#/properties/npcReceived/items/properties/refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err55];
}
else {
vErrors.push(err55);
}
errors++;
}
}
if(data16.deliveryRecordIds !== undefined){
let data20 = data16.deliveryRecordIds;
if(Array.isArray(data20)){
const len7 = data20.length;
for(let i8=0; i8<len7; i8++){
let data21 = data20[i8];
if(typeof data21 === "string"){
if(func2(data21) > 36){
const err56 = {instancePath:instancePath+"/npcReceived/" + i5+"/deliveryRecordIds/" + i8,schemaPath:"#/properties/npcReceived/items/properties/deliveryRecordIds/items/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err56];
}
else {
vErrors.push(err56);
}
errors++;
}
if(!pattern43.test(data21)){
const err57 = {instancePath:instancePath+"/npcReceived/" + i5+"/deliveryRecordIds/" + i8,schemaPath:"#/properties/npcReceived/items/properties/deliveryRecordIds/items/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err57];
}
else {
vErrors.push(err57);
}
errors++;
}
}
else {
const err58 = {instancePath:instancePath+"/npcReceived/" + i5+"/deliveryRecordIds/" + i8,schemaPath:"#/properties/npcReceived/items/properties/deliveryRecordIds/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err58];
}
else {
vErrors.push(err58);
}
errors++;
}
}
}
else {
const err59 = {instancePath:instancePath+"/npcReceived/" + i5+"/deliveryRecordIds",schemaPath:"#/properties/npcReceived/items/properties/deliveryRecordIds/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err59];
}
else {
vErrors.push(err59);
}
errors++;
}
}
}
else {
const err60 = {instancePath:instancePath+"/npcReceived/" + i5,schemaPath:"#/properties/npcReceived/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err60];
}
else {
vErrors.push(err60);
}
errors++;
}
}
}
else {
const err61 = {instancePath:instancePath+"/npcReceived",schemaPath:"#/properties/npcReceived/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err61];
}
else {
vErrors.push(err61);
}
errors++;
}
}
if(data.playback !== undefined){
let data22 = data.playback;
const _errs46 = errors;
let valid20 = false;
const _errs47 = errors;
if(!(validate132(data22, {instancePath:instancePath+"/playback",parentData:data,parentDataProperty:"playback",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate132.errors : vErrors.concat(validate132.errors);
errors = vErrors.length;
}
var _valid1 = _errs47 === errors;
valid20 = valid20 || _valid1;
const _errs48 = errors;
if(data22 !== null){
const err62 = {instancePath:instancePath+"/playback",schemaPath:"#/properties/playback/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err62];
}
else {
vErrors.push(err62);
}
errors++;
}
var _valid1 = _errs48 === errors;
valid20 = valid20 || _valid1;
if(!valid20){
const err63 = {instancePath:instancePath+"/playback",schemaPath:"#/properties/playback/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err63];
}
else {
vErrors.push(err63);
}
errors++;
}
else {
errors = _errs46;
if(vErrors !== null){
if(_errs46){
vErrors.length = _errs46;
}
else {
vErrors = null;
}
}
}
}
if(data.runHistory !== undefined){
let data23 = data.runHistory;
if(Array.isArray(data23)){
const len8 = data23.length;
for(let i9=0; i9<len8; i9++){
if(!(validate132(data23[i9], {instancePath:instancePath+"/runHistory/" + i9,parentData:data23,parentDataProperty:i9,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate132.errors : vErrors.concat(validate132.errors);
errors = vErrors.length;
}
}
}
else {
const err64 = {instancePath:instancePath+"/runHistory",schemaPath:"#/properties/runHistory/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err64];
}
else {
vErrors.push(err64);
}
errors++;
}
}
if(data.certificate !== undefined){
let data25 = data.certificate;
const _errs54 = errors;
let valid23 = false;
const _errs55 = errors;
if(!(validate141(data25, {instancePath:instancePath+"/certificate",parentData:data,parentDataProperty:"certificate",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate141.errors : vErrors.concat(validate141.errors);
errors = vErrors.length;
}
var _valid2 = _errs55 === errors;
valid23 = valid23 || _valid2;
const _errs56 = errors;
if(data25 !== null){
const err65 = {instancePath:instancePath+"/certificate",schemaPath:"#/properties/certificate/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err65];
}
else {
vErrors.push(err65);
}
errors++;
}
var _valid2 = _errs56 === errors;
valid23 = valid23 || _valid2;
if(!valid23){
const err66 = {instancePath:instancePath+"/certificate",schemaPath:"#/properties/certificate/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err66];
}
else {
vErrors.push(err66);
}
errors++;
}
else {
errors = _errs54;
if(vErrors !== null){
if(_errs54){
vErrors.length = _errs54;
}
else {
vErrors = null;
}
}
}
}
if(data.premiere !== undefined){
let data26 = data.premiere;
const _errs59 = errors;
let valid24 = false;
const _errs60 = errors;
if(!(validate143(data26, {instancePath:instancePath+"/premiere",parentData:data,parentDataProperty:"premiere",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate143.errors : vErrors.concat(validate143.errors);
errors = vErrors.length;
}
var _valid3 = _errs60 === errors;
valid24 = valid24 || _valid3;
const _errs61 = errors;
if(data26 !== null){
const err67 = {instancePath:instancePath+"/premiere",schemaPath:"#/properties/premiere/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err67];
}
else {
vErrors.push(err67);
}
errors++;
}
var _valid3 = _errs61 === errors;
valid24 = valid24 || _valid3;
if(!valid24){
const err68 = {instancePath:instancePath+"/premiere",schemaPath:"#/properties/premiere/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err68];
}
else {
vErrors.push(err68);
}
errors++;
}
else {
errors = _errs59;
if(vErrors !== null){
if(_errs59){
vErrors.length = _errs59;
}
else {
vErrors = null;
}
}
}
}
if(data.observations !== undefined){
let data27 = data.observations;
if(Array.isArray(data27)){
const len9 = data27.length;
for(let i10=0; i10<len9; i10++){
if(!(validate146(data27[i10], {instancePath:instancePath+"/observations/" + i10,parentData:data27,parentDataProperty:i10,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate146.errors : vErrors.concat(validate146.errors);
errors = vErrors.length;
}
}
}
else {
const err69 = {instancePath:instancePath+"/observations",schemaPath:"#/properties/observations/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err69];
}
else {
vErrors.push(err69);
}
errors++;
}
}
if(data.readerResume !== undefined){
let data29 = data.readerResume;
const _errs67 = errors;
let valid27 = false;
const _errs68 = errors;
if(!(validate150(data29, {instancePath:instancePath+"/readerResume",parentData:data,parentDataProperty:"readerResume",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate150.errors : vErrors.concat(validate150.errors);
errors = vErrors.length;
}
var _valid4 = _errs68 === errors;
valid27 = valid27 || _valid4;
const _errs69 = errors;
if(data29 !== null){
const err70 = {instancePath:instancePath+"/readerResume",schemaPath:"#/properties/readerResume/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err70];
}
else {
vErrors.push(err70);
}
errors++;
}
var _valid4 = _errs69 === errors;
valid27 = valid27 || _valid4;
if(!valid27){
const err71 = {instancePath:instancePath+"/readerResume",schemaPath:"#/properties/readerResume/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err71];
}
else {
vErrors.push(err71);
}
errors++;
}
else {
errors = _errs67;
if(vErrors !== null){
if(_errs67){
vErrors.length = _errs67;
}
else {
vErrors = null;
}
}
}
}
if(data.worldReturn !== undefined){
if(!(validate152(data.worldReturn, {instancePath:instancePath+"/worldReturn",parentData:data,parentDataProperty:"worldReturn",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate152.errors : vErrors.concat(validate152.errors);
errors = vErrors.length;
}
}
if(data.historyUncertain !== undefined){
if(typeof data.historyUncertain !== "boolean"){
const err72 = {instancePath:instancePath+"/historyUncertain",schemaPath:"#/properties/historyUncertain/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err72];
}
else {
vErrors.push(err72);
}
errors++;
}
}
if(data.guidance !== undefined){
let data32 = data.guidance;
if(data32 && typeof data32 == "object" && !Array.isArray(data32)){
if(data32.openingDismissed === undefined){
const err73 = {instancePath:instancePath+"/guidance",schemaPath:"#/properties/guidance/required",keyword:"required",params:{missingProperty: "openingDismissed"},message:"must have required property '"+"openingDismissed"+"'"};
if(vErrors === null){
vErrors = [err73];
}
else {
vErrors.push(err73);
}
errors++;
}
if(data32.movementDismissed === undefined){
const err74 = {instancePath:instancePath+"/guidance",schemaPath:"#/properties/guidance/required",keyword:"required",params:{missingProperty: "movementDismissed"},message:"must have required property '"+"movementDismissed"+"'"};
if(vErrors === null){
vErrors = [err74];
}
else {
vErrors.push(err74);
}
errors++;
}
if(data32.ariInvitationDismissed === undefined){
const err75 = {instancePath:instancePath+"/guidance",schemaPath:"#/properties/guidance/required",keyword:"required",params:{missingProperty: "ariInvitationDismissed"},message:"must have required property '"+"ariInvitationDismissed"+"'"};
if(vErrors === null){
vErrors = [err75];
}
else {
vErrors.push(err75);
}
errors++;
}
for(const key2 in data32){
if(!(((key2 === "openingDismissed") || (key2 === "movementDismissed")) || (key2 === "ariInvitationDismissed"))){
const err76 = {instancePath:instancePath+"/guidance",schemaPath:"#/properties/guidance/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err76];
}
else {
vErrors.push(err76);
}
errors++;
}
}
if(data32.openingDismissed !== undefined){
if(typeof data32.openingDismissed !== "boolean"){
const err77 = {instancePath:instancePath+"/guidance/openingDismissed",schemaPath:"#/properties/guidance/properties/openingDismissed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err77];
}
else {
vErrors.push(err77);
}
errors++;
}
}
if(data32.movementDismissed !== undefined){
if(typeof data32.movementDismissed !== "boolean"){
const err78 = {instancePath:instancePath+"/guidance/movementDismissed",schemaPath:"#/properties/guidance/properties/movementDismissed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err78];
}
else {
vErrors.push(err78);
}
errors++;
}
}
if(data32.ariInvitationDismissed !== undefined){
if(typeof data32.ariInvitationDismissed !== "boolean"){
const err79 = {instancePath:instancePath+"/guidance/ariInvitationDismissed",schemaPath:"#/properties/guidance/properties/ariInvitationDismissed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err79];
}
else {
vErrors.push(err79);
}
errors++;
}
}
}
else {
const err80 = {instancePath:instancePath+"/guidance",schemaPath:"#/properties/guidance/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err80];
}
else {
vErrors.push(err80);
}
errors++;
}
}
if(data.visitedRooms !== undefined){
let data36 = data.visitedRooms;
if(Array.isArray(data36)){
const len10 = data36.length;
for(let i11=0; i11<len10; i11++){
let data37 = data36[i11];
if(typeof data37 !== "string"){
const err81 = {instancePath:instancePath+"/visitedRooms/" + i11,schemaPath:"#/properties/visitedRooms/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err81];
}
else {
vErrors.push(err81);
}
errors++;
}
if(!((((data37 === "SC.ST") || (data37 === "SC.CY")) || (data37 === "SC.WK")) || (data37 === "SC.MD"))){
const err82 = {instancePath:instancePath+"/visitedRooms/" + i11,schemaPath:"#/properties/visitedRooms/items/enum",keyword:"enum",params:{allowedValues: schema43.properties.visitedRooms.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err82];
}
else {
vErrors.push(err82);
}
errors++;
}
}
}
else {
const err83 = {instancePath:instancePath+"/visitedRooms",schemaPath:"#/properties/visitedRooms/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err83];
}
else {
vErrors.push(err83);
}
errors++;
}
}
if(data.encounteredActors !== undefined){
let data38 = data.encounteredActors;
if(Array.isArray(data38)){
const len11 = data38.length;
for(let i12=0; i12<len11; i12++){
let data39 = data38[i12];
if(typeof data39 !== "string"){
const err84 = {instancePath:instancePath+"/encounteredActors/" + i12,schemaPath:"#/properties/encounteredActors/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err84];
}
else {
vErrors.push(err84);
}
errors++;
}
if(!((((data39 === "ACT.JO") || (data39 === "ACT.REMY")) || (data39 === "ACT.ARI")) || (data39 === "ACT.LOOP"))){
const err85 = {instancePath:instancePath+"/encounteredActors/" + i12,schemaPath:"#/properties/encounteredActors/items/enum",keyword:"enum",params:{allowedValues: schema43.properties.encounteredActors.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err85];
}
else {
vErrors.push(err85);
}
errors++;
}
}
}
else {
const err86 = {instancePath:instancePath+"/encounteredActors",schemaPath:"#/properties/encounteredActors/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err86];
}
else {
vErrors.push(err86);
}
errors++;
}
}
if(data.coachingHistory !== undefined){
let data40 = data.coachingHistory;
if(Array.isArray(data40)){
const len12 = data40.length;
for(let i13=0; i13<len12; i13++){
let data41 = data40[i13];
if(data41 && typeof data41 == "object" && !Array.isArray(data41)){
if(data41.requestId === undefined){
const err87 = {instancePath:instancePath+"/coachingHistory/" + i13,schemaPath:"#/properties/coachingHistory/items/required",keyword:"required",params:{missingProperty: "requestId"},message:"must have required property '"+"requestId"+"'"};
if(vErrors === null){
vErrors = [err87];
}
else {
vErrors.push(err87);
}
errors++;
}
if(data41.submittedRecordId === undefined){
const err88 = {instancePath:instancePath+"/coachingHistory/" + i13,schemaPath:"#/properties/coachingHistory/items/required",keyword:"required",params:{missingProperty: "submittedRecordId"},message:"must have required property '"+"submittedRecordId"+"'"};
if(vErrors === null){
vErrors = [err88];
}
else {
vErrors.push(err88);
}
errors++;
}
if(data41.context === undefined){
const err89 = {instancePath:instancePath+"/coachingHistory/" + i13,schemaPath:"#/properties/coachingHistory/items/required",keyword:"required",params:{missingProperty: "context"},message:"must have required property '"+"context"+"'"};
if(vErrors === null){
vErrors = [err89];
}
else {
vErrors.push(err89);
}
errors++;
}
if(data41.contentIds === undefined){
const err90 = {instancePath:instancePath+"/coachingHistory/" + i13,schemaPath:"#/properties/coachingHistory/items/required",keyword:"required",params:{missingProperty: "contentIds"},message:"must have required property '"+"contentIds"+"'"};
if(vErrors === null){
vErrors = [err90];
}
else {
vErrors.push(err90);
}
errors++;
}
if(data41.selection === undefined){
const err91 = {instancePath:instancePath+"/coachingHistory/" + i13,schemaPath:"#/properties/coachingHistory/items/required",keyword:"required",params:{missingProperty: "selection"},message:"must have required property '"+"selection"+"'"};
if(vErrors === null){
vErrors = [err91];
}
else {
vErrors.push(err91);
}
errors++;
}
if(data41.origin === undefined){
const err92 = {instancePath:instancePath+"/coachingHistory/" + i13,schemaPath:"#/properties/coachingHistory/items/required",keyword:"required",params:{missingProperty: "origin"},message:"must have required property '"+"origin"+"'"};
if(vErrors === null){
vErrors = [err92];
}
else {
vErrors.push(err92);
}
errors++;
}
if(data41.displayedSeq === undefined){
const err93 = {instancePath:instancePath+"/coachingHistory/" + i13,schemaPath:"#/properties/coachingHistory/items/required",keyword:"required",params:{missingProperty: "displayedSeq"},message:"must have required property '"+"displayedSeq"+"'"};
if(vErrors === null){
vErrors = [err93];
}
else {
vErrors.push(err93);
}
errors++;
}
for(const key3 in data41){
if(!(((((((key3 === "requestId") || (key3 === "submittedRecordId")) || (key3 === "context")) || (key3 === "contentIds")) || (key3 === "selection")) || (key3 === "origin")) || (key3 === "displayedSeq"))){
const err94 = {instancePath:instancePath+"/coachingHistory/" + i13,schemaPath:"#/properties/coachingHistory/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err94];
}
else {
vErrors.push(err94);
}
errors++;
}
}
if(data41.requestId !== undefined){
let data42 = data41.requestId;
if(typeof data42 === "string"){
if(func2(data42) > 36){
const err95 = {instancePath:instancePath+"/coachingHistory/" + i13+"/requestId",schemaPath:"#/properties/coachingHistory/items/properties/requestId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err95];
}
else {
vErrors.push(err95);
}
errors++;
}
if(!pattern43.test(data42)){
const err96 = {instancePath:instancePath+"/coachingHistory/" + i13+"/requestId",schemaPath:"#/properties/coachingHistory/items/properties/requestId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err96];
}
else {
vErrors.push(err96);
}
errors++;
}
}
else {
const err97 = {instancePath:instancePath+"/coachingHistory/" + i13+"/requestId",schemaPath:"#/properties/coachingHistory/items/properties/requestId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err97];
}
else {
vErrors.push(err97);
}
errors++;
}
}
if(data41.submittedRecordId !== undefined){
let data43 = data41.submittedRecordId;
const _errs99 = errors;
let valid36 = false;
const _errs100 = errors;
if(typeof data43 === "string"){
if(func2(data43) > 36){
const err98 = {instancePath:instancePath+"/coachingHistory/" + i13+"/submittedRecordId",schemaPath:"#/properties/coachingHistory/items/properties/submittedRecordId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err98];
}
else {
vErrors.push(err98);
}
errors++;
}
if(!pattern43.test(data43)){
const err99 = {instancePath:instancePath+"/coachingHistory/" + i13+"/submittedRecordId",schemaPath:"#/properties/coachingHistory/items/properties/submittedRecordId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err99];
}
else {
vErrors.push(err99);
}
errors++;
}
}
else {
const err100 = {instancePath:instancePath+"/coachingHistory/" + i13+"/submittedRecordId",schemaPath:"#/properties/coachingHistory/items/properties/submittedRecordId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err100];
}
else {
vErrors.push(err100);
}
errors++;
}
var _valid5 = _errs100 === errors;
valid36 = valid36 || _valid5;
const _errs102 = errors;
if(data43 !== null){
const err101 = {instancePath:instancePath+"/coachingHistory/" + i13+"/submittedRecordId",schemaPath:"#/properties/coachingHistory/items/properties/submittedRecordId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err101];
}
else {
vErrors.push(err101);
}
errors++;
}
var _valid5 = _errs102 === errors;
valid36 = valid36 || _valid5;
if(!valid36){
const err102 = {instancePath:instancePath+"/coachingHistory/" + i13+"/submittedRecordId",schemaPath:"#/properties/coachingHistory/items/properties/submittedRecordId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err102];
}
else {
vErrors.push(err102);
}
errors++;
}
else {
errors = _errs99;
if(vErrors !== null){
if(_errs99){
vErrors.length = _errs99;
}
else {
vErrors = null;
}
}
}
}
if(data41.context !== undefined){
if(!(validate154(data41.context, {instancePath:instancePath+"/coachingHistory/" + i13+"/context",parentData:data41,parentDataProperty:"context",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate154.errors : vErrors.concat(validate154.errors);
errors = vErrors.length;
}
}
if(data41.contentIds !== undefined){
let data45 = data41.contentIds;
if(Array.isArray(data45)){
if(data45.length > 64){
const err103 = {instancePath:instancePath+"/coachingHistory/" + i13+"/contentIds",schemaPath:"#/properties/coachingHistory/items/properties/contentIds/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err103];
}
else {
vErrors.push(err103);
}
errors++;
}
const len13 = data45.length;
for(let i14=0; i14<len13; i14++){
let data46 = data45[i14];
if(typeof data46 === "string"){
if(func2(data46) > 160){
const err104 = {instancePath:instancePath+"/coachingHistory/" + i13+"/contentIds/" + i14,schemaPath:"#/properties/coachingHistory/items/properties/contentIds/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err104];
}
else {
vErrors.push(err104);
}
errors++;
}
if(!pattern3.test(data46)){
const err105 = {instancePath:instancePath+"/coachingHistory/" + i13+"/contentIds/" + i14,schemaPath:"#/properties/coachingHistory/items/properties/contentIds/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err105];
}
else {
vErrors.push(err105);
}
errors++;
}
}
else {
const err106 = {instancePath:instancePath+"/coachingHistory/" + i13+"/contentIds/" + i14,schemaPath:"#/properties/coachingHistory/items/properties/contentIds/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err106];
}
else {
vErrors.push(err106);
}
errors++;
}
}
let i15 = data45.length;
let j1;
if(i15 > 1){
const indices1 = {};
for(;i15--;){
let item1 = data45[i15];
if(typeof item1 !== "string"){
continue;
}
if(typeof indices1[item1] == "number"){
j1 = indices1[item1];
const err107 = {instancePath:instancePath+"/coachingHistory/" + i13+"/contentIds",schemaPath:"#/properties/coachingHistory/items/properties/contentIds/uniqueItems",keyword:"uniqueItems",params:{i: i15, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i15+" are identical)"};
if(vErrors === null){
vErrors = [err107];
}
else {
vErrors.push(err107);
}
errors++;
break;
}
indices1[item1] = i15;
}
}
}
else {
const err108 = {instancePath:instancePath+"/coachingHistory/" + i13+"/contentIds",schemaPath:"#/properties/coachingHistory/items/properties/contentIds/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err108];
}
else {
vErrors.push(err108);
}
errors++;
}
}
if(data41.selection !== undefined){
let data47 = data41.selection;
const _errs110 = errors;
let valid40 = false;
const _errs111 = errors;
if(!(validate160(data47, {instancePath:instancePath+"/coachingHistory/" + i13+"/selection",parentData:data41,parentDataProperty:"selection",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate160.errors : vErrors.concat(validate160.errors);
errors = vErrors.length;
}
var _valid6 = _errs111 === errors;
valid40 = valid40 || _valid6;
const _errs112 = errors;
if(data47 !== null){
const err109 = {instancePath:instancePath+"/coachingHistory/" + i13+"/selection",schemaPath:"#/properties/coachingHistory/items/properties/selection/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err109];
}
else {
vErrors.push(err109);
}
errors++;
}
var _valid6 = _errs112 === errors;
valid40 = valid40 || _valid6;
if(!valid40){
const err110 = {instancePath:instancePath+"/coachingHistory/" + i13+"/selection",schemaPath:"#/properties/coachingHistory/items/properties/selection/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err110];
}
else {
vErrors.push(err110);
}
errors++;
}
else {
errors = _errs110;
if(vErrors !== null){
if(_errs110){
vErrors.length = _errs110;
}
else {
vErrors = null;
}
}
}
}
if(data41.origin !== undefined){
let data48 = data41.origin;
if(typeof data48 !== "string"){
const err111 = {instancePath:instancePath+"/coachingHistory/" + i13+"/origin",schemaPath:"#/properties/coachingHistory/items/properties/origin/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err111];
}
else {
vErrors.push(err111);
}
errors++;
}
if(!((((data48 === "live-selection") || (data48 === "authored-topic")) || (data48 === "authored-fallback")) || (data48 === "authored-direct"))){
const err112 = {instancePath:instancePath+"/coachingHistory/" + i13+"/origin",schemaPath:"#/properties/coachingHistory/items/properties/origin/enum",keyword:"enum",params:{allowedValues: schema43.properties.coachingHistory.items.properties.origin.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err112];
}
else {
vErrors.push(err112);
}
errors++;
}
}
if(data41.displayedSeq !== undefined){
let data49 = data41.displayedSeq;
const _errs117 = errors;
let valid41 = false;
const _errs118 = errors;
if(!(((typeof data49 == "number") && (!(data49 % 1) && !isNaN(data49))) && (isFinite(data49)))){
const err113 = {instancePath:instancePath+"/coachingHistory/" + i13+"/displayedSeq",schemaPath:"#/properties/coachingHistory/items/properties/displayedSeq/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err113];
}
else {
vErrors.push(err113);
}
errors++;
}
if((typeof data49 == "number") && (isFinite(data49))){
if(data49 < 0 || isNaN(data49)){
const err114 = {instancePath:instancePath+"/coachingHistory/" + i13+"/displayedSeq",schemaPath:"#/properties/coachingHistory/items/properties/displayedSeq/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err114];
}
else {
vErrors.push(err114);
}
errors++;
}
}
var _valid7 = _errs118 === errors;
valid41 = valid41 || _valid7;
const _errs120 = errors;
if(data49 !== null){
const err115 = {instancePath:instancePath+"/coachingHistory/" + i13+"/displayedSeq",schemaPath:"#/properties/coachingHistory/items/properties/displayedSeq/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err115];
}
else {
vErrors.push(err115);
}
errors++;
}
var _valid7 = _errs120 === errors;
valid41 = valid41 || _valid7;
if(!valid41){
const err116 = {instancePath:instancePath+"/coachingHistory/" + i13+"/displayedSeq",schemaPath:"#/properties/coachingHistory/items/properties/displayedSeq/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err116];
}
else {
vErrors.push(err116);
}
errors++;
}
else {
errors = _errs117;
if(vErrors !== null){
if(_errs117){
vErrors.length = _errs117;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err117 = {instancePath:instancePath+"/coachingHistory/" + i13,schemaPath:"#/properties/coachingHistory/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err117];
}
else {
vErrors.push(err117);
}
errors++;
}
}
}
else {
const err118 = {instancePath:instancePath+"/coachingHistory",schemaPath:"#/properties/coachingHistory/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err118];
}
else {
vErrors.push(err118);
}
errors++;
}
}
if(data.experience !== undefined){
if(!(validate163(data.experience, {instancePath:instancePath+"/experience",parentData:data,parentDataProperty:"experience",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate163.errors : vErrors.concat(validate163.errors);
errors = vErrors.length;
}
}
}
else {
const err119 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err119];
}
else {
vErrors.push(err119);
}
errors++;
}
validate112.errors = vErrors;
return errors === 0;
}
validate112.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate203(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate203.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.contractKind === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "contractKind"},message:"must have required property '"+"contractKind"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.identity === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "identity"},message:"must have required property '"+"identity"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.state === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "state"},message:"must have required property '"+"state"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
for(const key0 in data){
if(!(((key0 === "contractKind") || (key0 === "identity")) || (key0 === "state"))){
const err3 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
if(data.contractKind !== undefined){
if("CaseSnapshot" !== data.contractKind){
const err4 = {instancePath:instancePath+"/contractKind",schemaPath:"#/properties/contractKind/const",keyword:"const",params:{allowedValue: "CaseSnapshot"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data.identity !== undefined){
if(!(validate55(data.identity, {instancePath:instancePath+"/identity",parentData:data,parentDataProperty:"identity",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate55.errors : vErrors.concat(validate55.errors);
errors = vErrors.length;
}
}
if(data.state !== undefined){
if(!(validate112(data.state, {instancePath:instancePath+"/state",parentData:data,parentDataProperty:"state",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate112.errors : vErrors.concat(validate112.errors);
errors = vErrors.length;
}
}
}
else {
const err5 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
validate203.errors = vErrors;
return errors === 0;
}
validate203.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate202(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:evidence-quest:CaseSnapshot" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate202.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(!(validate203(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate203.errors : vErrors.concat(validate203.errors);
errors = vErrors.length;
}
validate202.errors = vErrors;
return errors === 0;
}
validate202.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const validateSaveEnvelope = validate207;
const schema70 = {"$id":"urn:evidence-quest:SaveEnvelope","$ref":"https://evidence-quest.invalid/contracts/v1#/$defs/SaveEnvelope"};
const schema62 = {"type":"object","properties":{"contractKind":{"const":"SaveEnvelope"},"saveFormatVersion":{"const":1},"identity":{"$ref":"#/$defs/Identity"},"appBuild":{"type":"string"},"slotRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"writerVisitId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"writtenAt":{"type":"string","pattern":"^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$","maxLength":24},"payload":{"$ref":"#/$defs/CaseState"}},"required":["contractKind","saveFormatVersion","identity","appBuild","slotRevision","writerVisitId","writtenAt","payload"],"additionalProperties":false};
const pattern94 = new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$", "u");

function validate208(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate208.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.contractKind === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "contractKind"},message:"must have required property '"+"contractKind"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.saveFormatVersion === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "saveFormatVersion"},message:"must have required property '"+"saveFormatVersion"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.identity === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "identity"},message:"must have required property '"+"identity"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.appBuild === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "appBuild"},message:"must have required property '"+"appBuild"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.slotRevision === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "slotRevision"},message:"must have required property '"+"slotRevision"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.writerVisitId === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "writerVisitId"},message:"must have required property '"+"writerVisitId"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.writtenAt === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "writtenAt"},message:"must have required property '"+"writtenAt"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.payload === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "payload"},message:"must have required property '"+"payload"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
for(const key0 in data){
if(!((((((((key0 === "contractKind") || (key0 === "saveFormatVersion")) || (key0 === "identity")) || (key0 === "appBuild")) || (key0 === "slotRevision")) || (key0 === "writerVisitId")) || (key0 === "writtenAt")) || (key0 === "payload"))){
const err8 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.contractKind !== undefined){
if("SaveEnvelope" !== data.contractKind){
const err9 = {instancePath:instancePath+"/contractKind",schemaPath:"#/properties/contractKind/const",keyword:"const",params:{allowedValue: "SaveEnvelope"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.saveFormatVersion !== undefined){
if(1 !== data.saveFormatVersion){
const err10 = {instancePath:instancePath+"/saveFormatVersion",schemaPath:"#/properties/saveFormatVersion/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.identity !== undefined){
if(!(validate55(data.identity, {instancePath:instancePath+"/identity",parentData:data,parentDataProperty:"identity",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate55.errors : vErrors.concat(validate55.errors);
errors = vErrors.length;
}
}
if(data.appBuild !== undefined){
if(typeof data.appBuild !== "string"){
const err11 = {instancePath:instancePath+"/appBuild",schemaPath:"#/properties/appBuild/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.slotRevision !== undefined){
let data4 = data.slotRevision;
if(!(((typeof data4 == "number") && (!(data4 % 1) && !isNaN(data4))) && (isFinite(data4)))){
const err12 = {instancePath:instancePath+"/slotRevision",schemaPath:"#/properties/slotRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if((typeof data4 == "number") && (isFinite(data4))){
if(data4 > 9007199254740991 || isNaN(data4)){
const err13 = {instancePath:instancePath+"/slotRevision",schemaPath:"#/properties/slotRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(data4 < 0 || isNaN(data4)){
const err14 = {instancePath:instancePath+"/slotRevision",schemaPath:"#/properties/slotRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
}
if(data.writerVisitId !== undefined){
let data5 = data.writerVisitId;
if(typeof data5 === "string"){
if(func2(data5) > 36){
const err15 = {instancePath:instancePath+"/writerVisitId",schemaPath:"#/properties/writerVisitId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(!pattern43.test(data5)){
const err16 = {instancePath:instancePath+"/writerVisitId",schemaPath:"#/properties/writerVisitId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
else {
const err17 = {instancePath:instancePath+"/writerVisitId",schemaPath:"#/properties/writerVisitId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
if(data.writtenAt !== undefined){
let data6 = data.writtenAt;
if(typeof data6 === "string"){
if(func2(data6) > 24){
const err18 = {instancePath:instancePath+"/writtenAt",schemaPath:"#/properties/writtenAt/maxLength",keyword:"maxLength",params:{limit: 24},message:"must NOT have more than 24 characters"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if(!pattern94.test(data6)){
const err19 = {instancePath:instancePath+"/writtenAt",schemaPath:"#/properties/writtenAt/pattern",keyword:"pattern",params:{pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$"},message:"must match pattern \""+"^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$"+"\""};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
else {
const err20 = {instancePath:instancePath+"/writtenAt",schemaPath:"#/properties/writtenAt/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
if(data.payload !== undefined){
if(!(validate112(data.payload, {instancePath:instancePath+"/payload",parentData:data,parentDataProperty:"payload",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate112.errors : vErrors.concat(validate112.errors);
errors = vErrors.length;
}
}
}
else {
const err21 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
validate208.errors = vErrors;
return errors === 0;
}
validate208.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate207(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:evidence-quest:SaveEnvelope" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate207.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(!(validate208(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate208.errors : vErrors.concat(validate208.errors);
errors = vErrors.length;
}
validate207.errors = vErrors;
return errors === 0;
}
validate207.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const validatePreferences = validate212;
const schema72 = {"$id":"urn:evidence-quest:Preferences","$ref":"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences"};
const schema63 = {"type":"object","properties":{"contractKind":{"const":"Preferences"},"formatVersion":{"const":1},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"sound":{"type":"string","enum":["on","off"]},"motion":{"type":"string","enum":["standard","reduced"]},"text":{"type":"string","enum":["regular","larger","largest"]},"spacing":{"type":"string","enum":["standard","roomier"]}},"required":["contractKind","formatVersion","revision","sound","motion","text","spacing"],"additionalProperties":false};

function validate213(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate213.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.contractKind === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "contractKind"},message:"must have required property '"+"contractKind"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.formatVersion === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "formatVersion"},message:"must have required property '"+"formatVersion"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.revision === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "revision"},message:"must have required property '"+"revision"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.sound === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "sound"},message:"must have required property '"+"sound"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.motion === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "motion"},message:"must have required property '"+"motion"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.text === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "text"},message:"must have required property '"+"text"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.spacing === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "spacing"},message:"must have required property '"+"spacing"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
for(const key0 in data){
if(!(((((((key0 === "contractKind") || (key0 === "formatVersion")) || (key0 === "revision")) || (key0 === "sound")) || (key0 === "motion")) || (key0 === "text")) || (key0 === "spacing"))){
const err7 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.contractKind !== undefined){
if("Preferences" !== data.contractKind){
const err8 = {instancePath:instancePath+"/contractKind",schemaPath:"#/properties/contractKind/const",keyword:"const",params:{allowedValue: "Preferences"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.formatVersion !== undefined){
if(1 !== data.formatVersion){
const err9 = {instancePath:instancePath+"/formatVersion",schemaPath:"#/properties/formatVersion/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.revision !== undefined){
let data2 = data.revision;
if(!(((typeof data2 == "number") && (!(data2 % 1) && !isNaN(data2))) && (isFinite(data2)))){
const err10 = {instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if((typeof data2 == "number") && (isFinite(data2))){
if(data2 > 9007199254740991 || isNaN(data2)){
const err11 = {instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(data2 < 0 || isNaN(data2)){
const err12 = {instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
}
if(data.sound !== undefined){
let data3 = data.sound;
if(typeof data3 !== "string"){
const err13 = {instancePath:instancePath+"/sound",schemaPath:"#/properties/sound/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(!((data3 === "on") || (data3 === "off"))){
const err14 = {instancePath:instancePath+"/sound",schemaPath:"#/properties/sound/enum",keyword:"enum",params:{allowedValues: schema63.properties.sound.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.motion !== undefined){
let data4 = data.motion;
if(typeof data4 !== "string"){
const err15 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(!((data4 === "standard") || (data4 === "reduced"))){
const err16 = {instancePath:instancePath+"/motion",schemaPath:"#/properties/motion/enum",keyword:"enum",params:{allowedValues: schema63.properties.motion.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.text !== undefined){
let data5 = data.text;
if(typeof data5 !== "string"){
const err17 = {instancePath:instancePath+"/text",schemaPath:"#/properties/text/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(!(((data5 === "regular") || (data5 === "larger")) || (data5 === "largest"))){
const err18 = {instancePath:instancePath+"/text",schemaPath:"#/properties/text/enum",keyword:"enum",params:{allowedValues: schema63.properties.text.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(data.spacing !== undefined){
let data6 = data.spacing;
if(typeof data6 !== "string"){
const err19 = {instancePath:instancePath+"/spacing",schemaPath:"#/properties/spacing/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
if(!((data6 === "standard") || (data6 === "roomier"))){
const err20 = {instancePath:instancePath+"/spacing",schemaPath:"#/properties/spacing/enum",keyword:"enum",params:{allowedValues: schema63.properties.spacing.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
}
else {
const err21 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
validate213.errors = vErrors;
return errors === 0;
}
validate213.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate212(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:evidence-quest:Preferences" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate212.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(!(validate213(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate213.errors : vErrors.concat(validate213.errors);
errors = vErrors.length;
}
validate212.errors = vErrors;
return errors === 0;
}
validate212.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const validateCoachRequest = validate215;
const schema74 = {"$id":"urn:evidence-quest:CoachRequest","$ref":"https://evidence-quest.invalid/contracts/v1#/$defs/CoachRequest"};
const schema64 = {"type":"object","properties":{"contractKind":{"const":"CoachRequest"},"coachContractVersion":{"const":1},"identity":{"$ref":"#/$defs/Identity"},"requestId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"context":{"$ref":"#/$defs/Context"},"explanation":{"type":"string","minLength":1,"maxLength":600}},"required":["contractKind","coachContractVersion","identity","requestId","context","explanation"],"additionalProperties":false};

function validate216(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate216.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.contractKind === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "contractKind"},message:"must have required property '"+"contractKind"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.coachContractVersion === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "coachContractVersion"},message:"must have required property '"+"coachContractVersion"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.identity === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "identity"},message:"must have required property '"+"identity"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.requestId === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "requestId"},message:"must have required property '"+"requestId"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.context === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "context"},message:"must have required property '"+"context"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.explanation === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "explanation"},message:"must have required property '"+"explanation"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
for(const key0 in data){
if(!((((((key0 === "contractKind") || (key0 === "coachContractVersion")) || (key0 === "identity")) || (key0 === "requestId")) || (key0 === "context")) || (key0 === "explanation"))){
const err6 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.contractKind !== undefined){
if("CoachRequest" !== data.contractKind){
const err7 = {instancePath:instancePath+"/contractKind",schemaPath:"#/properties/contractKind/const",keyword:"const",params:{allowedValue: "CoachRequest"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.coachContractVersion !== undefined){
if(1 !== data.coachContractVersion){
const err8 = {instancePath:instancePath+"/coachContractVersion",schemaPath:"#/properties/coachContractVersion/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.identity !== undefined){
if(!(validate55(data.identity, {instancePath:instancePath+"/identity",parentData:data,parentDataProperty:"identity",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate55.errors : vErrors.concat(validate55.errors);
errors = vErrors.length;
}
}
if(data.requestId !== undefined){
let data3 = data.requestId;
if(typeof data3 === "string"){
if(func2(data3) > 36){
const err9 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(!pattern43.test(data3)){
const err10 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
else {
const err11 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.context !== undefined){
if(!(validate154(data.context, {instancePath:instancePath+"/context",parentData:data,parentDataProperty:"context",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate154.errors : vErrors.concat(validate154.errors);
errors = vErrors.length;
}
}
if(data.explanation !== undefined){
let data5 = data.explanation;
if(typeof data5 === "string"){
if(func2(data5) > 600){
const err12 = {instancePath:instancePath+"/explanation",schemaPath:"#/properties/explanation/maxLength",keyword:"maxLength",params:{limit: 600},message:"must NOT have more than 600 characters"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(func2(data5) < 1){
const err13 = {instancePath:instancePath+"/explanation",schemaPath:"#/properties/explanation/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
else {
const err14 = {instancePath:instancePath+"/explanation",schemaPath:"#/properties/explanation/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
}
else {
const err15 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
validate216.errors = vErrors;
return errors === 0;
}
validate216.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate215(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:evidence-quest:CoachRequest" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate215.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(!(validate216(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate216.errors : vErrors.concat(validate216.errors);
errors = vErrors.length;
}
validate215.errors = vErrors;
return errors === 0;
}
validate215.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const validateCoachResponse = validate220;
const schema76 = {"$id":"urn:evidence-quest:CoachResponse","$ref":"https://evidence-quest.invalid/contracts/v1#/$defs/CoachResponse"};
const schema65 = {"type":"object","properties":{"contractKind":{"const":"CoachResponse"},"coachContractVersion":{"const":1},"identity":{"$ref":"#/$defs/Identity"},"requestId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"contextRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"contextVisitId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"status":{"type":"string","enum":["selected","unavailable","timeout","invalid","busy","duplicate"]},"selection":{"anyOf":[{"$ref":"#/$defs/CoachSelection"},{"type":"null"}]}},"required":["contractKind","coachContractVersion","identity","requestId","contextRevision","contextVisitId","status","selection"],"additionalProperties":false};

function validate221(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate221.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.contractKind === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "contractKind"},message:"must have required property '"+"contractKind"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.coachContractVersion === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "coachContractVersion"},message:"must have required property '"+"coachContractVersion"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.identity === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "identity"},message:"must have required property '"+"identity"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.requestId === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "requestId"},message:"must have required property '"+"requestId"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.contextRevision === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "contextRevision"},message:"must have required property '"+"contextRevision"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.contextVisitId === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "contextVisitId"},message:"must have required property '"+"contextVisitId"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.status === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "status"},message:"must have required property '"+"status"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.selection === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "selection"},message:"must have required property '"+"selection"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
for(const key0 in data){
if(!((((((((key0 === "contractKind") || (key0 === "coachContractVersion")) || (key0 === "identity")) || (key0 === "requestId")) || (key0 === "contextRevision")) || (key0 === "contextVisitId")) || (key0 === "status")) || (key0 === "selection"))){
const err8 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.contractKind !== undefined){
if("CoachResponse" !== data.contractKind){
const err9 = {instancePath:instancePath+"/contractKind",schemaPath:"#/properties/contractKind/const",keyword:"const",params:{allowedValue: "CoachResponse"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.coachContractVersion !== undefined){
if(1 !== data.coachContractVersion){
const err10 = {instancePath:instancePath+"/coachContractVersion",schemaPath:"#/properties/coachContractVersion/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.identity !== undefined){
if(!(validate55(data.identity, {instancePath:instancePath+"/identity",parentData:data,parentDataProperty:"identity",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate55.errors : vErrors.concat(validate55.errors);
errors = vErrors.length;
}
}
if(data.requestId !== undefined){
let data3 = data.requestId;
if(typeof data3 === "string"){
if(func2(data3) > 36){
const err11 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(!pattern43.test(data3)){
const err12 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.contextRevision !== undefined){
let data4 = data.contextRevision;
if(!(((typeof data4 == "number") && (!(data4 % 1) && !isNaN(data4))) && (isFinite(data4)))){
const err14 = {instancePath:instancePath+"/contextRevision",schemaPath:"#/properties/contextRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
if((typeof data4 == "number") && (isFinite(data4))){
if(data4 > 9007199254740991 || isNaN(data4)){
const err15 = {instancePath:instancePath+"/contextRevision",schemaPath:"#/properties/contextRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(data4 < 0 || isNaN(data4)){
const err16 = {instancePath:instancePath+"/contextRevision",schemaPath:"#/properties/contextRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
}
if(data.contextVisitId !== undefined){
let data5 = data.contextVisitId;
if(typeof data5 === "string"){
if(func2(data5) > 36){
const err17 = {instancePath:instancePath+"/contextVisitId",schemaPath:"#/properties/contextVisitId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(!pattern43.test(data5)){
const err18 = {instancePath:instancePath+"/contextVisitId",schemaPath:"#/properties/contextVisitId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
else {
const err19 = {instancePath:instancePath+"/contextVisitId",schemaPath:"#/properties/contextVisitId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.status !== undefined){
let data6 = data.status;
if(typeof data6 !== "string"){
const err20 = {instancePath:instancePath+"/status",schemaPath:"#/properties/status/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(!((((((data6 === "selected") || (data6 === "unavailable")) || (data6 === "timeout")) || (data6 === "invalid")) || (data6 === "busy")) || (data6 === "duplicate"))){
const err21 = {instancePath:instancePath+"/status",schemaPath:"#/properties/status/enum",keyword:"enum",params:{allowedValues: schema65.properties.status.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.selection !== undefined){
let data7 = data.selection;
const _errs14 = errors;
let valid1 = false;
const _errs15 = errors;
if(!(validate160(data7, {instancePath:instancePath+"/selection",parentData:data,parentDataProperty:"selection",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate160.errors : vErrors.concat(validate160.errors);
errors = vErrors.length;
}
var _valid0 = _errs15 === errors;
valid1 = valid1 || _valid0;
const _errs16 = errors;
if(data7 !== null){
const err22 = {instancePath:instancePath+"/selection",schemaPath:"#/properties/selection/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
var _valid0 = _errs16 === errors;
valid1 = valid1 || _valid0;
if(!valid1){
const err23 = {instancePath:instancePath+"/selection",schemaPath:"#/properties/selection/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
else {
errors = _errs14;
if(vErrors !== null){
if(_errs14){
vErrors.length = _errs14;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err24 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
validate221.errors = vErrors;
return errors === 0;
}
validate221.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate220(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:evidence-quest:CoachResponse" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate220.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(!(validate221(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate221.errors : vErrors.concat(validate221.errors);
errors = vErrors.length;
}
validate220.errors = vErrors;
return errors === 0;
}
validate220.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const validateSession = validate225;
const schema78 = {"$id":"urn:evidence-quest:Session","$ref":"https://evidence-quest.invalid/contracts/v1#/$defs/Session"};
const schema66 = {"type":"object","properties":{"contractKind":{"const":"Session"},"visitId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"inputOwner":{"type":"string","enum":["home","world","task","text","picker","confirmation"]},"taskState":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"childState":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"callerState":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"callerReturn":{"anyOf":[{"$ref":"#/$defs/ReturnOwner"},{"type":"null"}]},"focusOwner":{"anyOf":[{"$ref":"#/$defs/ReturnOwner"},{"type":"null"}]},"pendingAction":{"anyOf":[{"type":"object","properties":{"id":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"targetId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"stage":{"type":"string","enum":["approaching","operating"]},"commitRule":{"type":"string","enum":["rollback-before-endpoint","keep-committed","toast-reveal","cue-endpoint"]}},"required":["id","targetId","stage","commitRule"],"additionalProperties":false},{"type":"null"}]},"heldTile":{"anyOf":[{"type":"object","properties":{"tile":{"type":"string","enum":["TILE.FERRY","TILE.BRIDGE","TILE.PLANT","TILE.BLOOM"]},"origin":{"type":"string","enum":["caddy","rail"]},"originIndex":{"anyOf":[{"type":"integer","minimum":0,"maximum":3},{"type":"null"}]},"arrangementRevision":{"type":"integer","minimum":0,"maximum":9007199254740991}},"required":["tile","origin","originIndex","arrangementRevision"],"additionalProperties":false},{"type":"null"}]},"heldKeys":{"type":"array","items":{"type":"string","enum":["up","down","left","right"]},"maxItems":4,"uniqueItems":true},"presentation":{"type":"string","enum":["arrange","watch"]},"coach":{"type":"object","properties":{"request":{"anyOf":[{"$ref":"#/$defs/CoachRequest"},{"type":"null"}]},"status":{"type":"string","enum":["idle","pending","waiting","offered","ready","displayed","stale","canceled","expired"]},"winner":{"anyOf":[{"type":"string","enum":["live","fallback","direct"]},{"type":"null"}]},"heldResponse":{"anyOf":[{"$ref":"#/$defs/CoachResponse"},{"type":"null"}]},"fallbackFocused":{"type":"boolean"},"deadlineElapsedMs":{"type":"integer","minimum":0,"maximum":9007199254740991}},"required":["request","status","winner","heldResponse","fallbackFocused","deadlineElapsedMs"],"additionalProperties":false},"saving":{"type":"object","properties":{"currentRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"requestedRevision":{"anyOf":[{"type":"integer","minimum":0,"maximum":9007199254740991},{"type":"null"}]},"acknowledgedRevision":{"anyOf":[{"type":"integer","minimum":0,"maximum":9007199254740991},{"type":"null"}]},"knownSlotRevision":{"anyOf":[{"type":"integer","minimum":0,"maximum":9007199254740991},{"type":"null"}]},"writeInFlight":{"type":"boolean"},"mode":{"type":"string","enum":["normal","unavailable","unknown-record","conflict"]}},"required":["currentRevision","requestedRevision","acknowledgedRevision","knownSlotRevision","writeInFlight","mode"],"additionalProperties":false},"scroll":{"type":"array","items":{"type":"object","properties":{"owner":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"fraction":{"type":"number","minimum":0,"maximum":1}},"required":["owner","fraction"],"additionalProperties":false},"maxItems":32}},"required":["contractKind","visitId","inputOwner","taskState","childState","callerState","callerReturn","focusOwner","pendingAction","heldTile","heldKeys","presentation","coach","saving","scroll"],"additionalProperties":false};

function validate173(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate173.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.contractKind === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "contractKind"},message:"must have required property '"+"contractKind"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.coachContractVersion === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "coachContractVersion"},message:"must have required property '"+"coachContractVersion"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.identity === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "identity"},message:"must have required property '"+"identity"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.requestId === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "requestId"},message:"must have required property '"+"requestId"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.context === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "context"},message:"must have required property '"+"context"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.explanation === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "explanation"},message:"must have required property '"+"explanation"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
for(const key0 in data){
if(!((((((key0 === "contractKind") || (key0 === "coachContractVersion")) || (key0 === "identity")) || (key0 === "requestId")) || (key0 === "context")) || (key0 === "explanation"))){
const err6 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.contractKind !== undefined){
if("CoachRequest" !== data.contractKind){
const err7 = {instancePath:instancePath+"/contractKind",schemaPath:"#/properties/contractKind/const",keyword:"const",params:{allowedValue: "CoachRequest"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
if(data.coachContractVersion !== undefined){
if(1 !== data.coachContractVersion){
const err8 = {instancePath:instancePath+"/coachContractVersion",schemaPath:"#/properties/coachContractVersion/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.identity !== undefined){
if(!(validate55(data.identity, {instancePath:instancePath+"/identity",parentData:data,parentDataProperty:"identity",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate55.errors : vErrors.concat(validate55.errors);
errors = vErrors.length;
}
}
if(data.requestId !== undefined){
let data3 = data.requestId;
if(typeof data3 === "string"){
if(func2(data3) > 36){
const err9 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(!pattern43.test(data3)){
const err10 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
else {
const err11 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(data.context !== undefined){
if(!(validate154(data.context, {instancePath:instancePath+"/context",parentData:data,parentDataProperty:"context",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate154.errors : vErrors.concat(validate154.errors);
errors = vErrors.length;
}
}
if(data.explanation !== undefined){
let data5 = data.explanation;
if(typeof data5 === "string"){
if(func2(data5) > 600){
const err12 = {instancePath:instancePath+"/explanation",schemaPath:"#/properties/explanation/maxLength",keyword:"maxLength",params:{limit: 600},message:"must NOT have more than 600 characters"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(func2(data5) < 1){
const err13 = {instancePath:instancePath+"/explanation",schemaPath:"#/properties/explanation/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
else {
const err14 = {instancePath:instancePath+"/explanation",schemaPath:"#/properties/explanation/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
}
else {
const err15 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
validate173.errors = vErrors;
return errors === 0;
}
validate173.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate177(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate177.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.contractKind === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "contractKind"},message:"must have required property '"+"contractKind"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.coachContractVersion === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "coachContractVersion"},message:"must have required property '"+"coachContractVersion"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.identity === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "identity"},message:"must have required property '"+"identity"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.requestId === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "requestId"},message:"must have required property '"+"requestId"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.contextRevision === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "contextRevision"},message:"must have required property '"+"contextRevision"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.contextVisitId === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "contextVisitId"},message:"must have required property '"+"contextVisitId"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.status === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "status"},message:"must have required property '"+"status"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.selection === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "selection"},message:"must have required property '"+"selection"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
for(const key0 in data){
if(!((((((((key0 === "contractKind") || (key0 === "coachContractVersion")) || (key0 === "identity")) || (key0 === "requestId")) || (key0 === "contextRevision")) || (key0 === "contextVisitId")) || (key0 === "status")) || (key0 === "selection"))){
const err8 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.contractKind !== undefined){
if("CoachResponse" !== data.contractKind){
const err9 = {instancePath:instancePath+"/contractKind",schemaPath:"#/properties/contractKind/const",keyword:"const",params:{allowedValue: "CoachResponse"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data.coachContractVersion !== undefined){
if(1 !== data.coachContractVersion){
const err10 = {instancePath:instancePath+"/coachContractVersion",schemaPath:"#/properties/coachContractVersion/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data.identity !== undefined){
if(!(validate55(data.identity, {instancePath:instancePath+"/identity",parentData:data,parentDataProperty:"identity",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate55.errors : vErrors.concat(validate55.errors);
errors = vErrors.length;
}
}
if(data.requestId !== undefined){
let data3 = data.requestId;
if(typeof data3 === "string"){
if(func2(data3) > 36){
const err11 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(!pattern43.test(data3)){
const err12 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data.contextRevision !== undefined){
let data4 = data.contextRevision;
if(!(((typeof data4 == "number") && (!(data4 % 1) && !isNaN(data4))) && (isFinite(data4)))){
const err14 = {instancePath:instancePath+"/contextRevision",schemaPath:"#/properties/contextRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
if((typeof data4 == "number") && (isFinite(data4))){
if(data4 > 9007199254740991 || isNaN(data4)){
const err15 = {instancePath:instancePath+"/contextRevision",schemaPath:"#/properties/contextRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(data4 < 0 || isNaN(data4)){
const err16 = {instancePath:instancePath+"/contextRevision",schemaPath:"#/properties/contextRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
}
if(data.contextVisitId !== undefined){
let data5 = data.contextVisitId;
if(typeof data5 === "string"){
if(func2(data5) > 36){
const err17 = {instancePath:instancePath+"/contextVisitId",schemaPath:"#/properties/contextVisitId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(!pattern43.test(data5)){
const err18 = {instancePath:instancePath+"/contextVisitId",schemaPath:"#/properties/contextVisitId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
else {
const err19 = {instancePath:instancePath+"/contextVisitId",schemaPath:"#/properties/contextVisitId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.status !== undefined){
let data6 = data.status;
if(typeof data6 !== "string"){
const err20 = {instancePath:instancePath+"/status",schemaPath:"#/properties/status/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(!((((((data6 === "selected") || (data6 === "unavailable")) || (data6 === "timeout")) || (data6 === "invalid")) || (data6 === "busy")) || (data6 === "duplicate"))){
const err21 = {instancePath:instancePath+"/status",schemaPath:"#/properties/status/enum",keyword:"enum",params:{allowedValues: schema65.properties.status.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.selection !== undefined){
let data7 = data.selection;
const _errs14 = errors;
let valid1 = false;
const _errs15 = errors;
if(!(validate160(data7, {instancePath:instancePath+"/selection",parentData:data,parentDataProperty:"selection",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate160.errors : vErrors.concat(validate160.errors);
errors = vErrors.length;
}
var _valid0 = _errs15 === errors;
valid1 = valid1 || _valid0;
const _errs16 = errors;
if(data7 !== null){
const err22 = {instancePath:instancePath+"/selection",schemaPath:"#/properties/selection/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
var _valid0 = _errs16 === errors;
valid1 = valid1 || _valid0;
if(!valid1){
const err23 = {instancePath:instancePath+"/selection",schemaPath:"#/properties/selection/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
else {
errors = _errs14;
if(vErrors !== null){
if(_errs14){
vErrors.length = _errs14;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err24 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
validate177.errors = vErrors;
return errors === 0;
}
validate177.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate226(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate226.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.contractKind === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "contractKind"},message:"must have required property '"+"contractKind"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.visitId === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "visitId"},message:"must have required property '"+"visitId"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.inputOwner === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "inputOwner"},message:"must have required property '"+"inputOwner"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.taskState === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "taskState"},message:"must have required property '"+"taskState"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.childState === undefined){
const err4 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "childState"},message:"must have required property '"+"childState"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.callerState === undefined){
const err5 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "callerState"},message:"must have required property '"+"callerState"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.callerReturn === undefined){
const err6 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "callerReturn"},message:"must have required property '"+"callerReturn"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data.focusOwner === undefined){
const err7 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "focusOwner"},message:"must have required property '"+"focusOwner"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(data.pendingAction === undefined){
const err8 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "pendingAction"},message:"must have required property '"+"pendingAction"+"'"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(data.heldTile === undefined){
const err9 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "heldTile"},message:"must have required property '"+"heldTile"+"'"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(data.heldKeys === undefined){
const err10 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "heldKeys"},message:"must have required property '"+"heldKeys"+"'"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(data.presentation === undefined){
const err11 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "presentation"},message:"must have required property '"+"presentation"+"'"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(data.coach === undefined){
const err12 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "coach"},message:"must have required property '"+"coach"+"'"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(data.saving === undefined){
const err13 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "saving"},message:"must have required property '"+"saving"+"'"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(data.scroll === undefined){
const err14 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "scroll"},message:"must have required property '"+"scroll"+"'"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
for(const key0 in data){
if(!(func1.call(schema66.properties, key0))){
const err15 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.contractKind !== undefined){
if("Session" !== data.contractKind){
const err16 = {instancePath:instancePath+"/contractKind",schemaPath:"#/properties/contractKind/const",keyword:"const",params:{allowedValue: "Session"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.visitId !== undefined){
let data1 = data.visitId;
if(typeof data1 === "string"){
if(func2(data1) > 36){
const err17 = {instancePath:instancePath+"/visitId",schemaPath:"#/properties/visitId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(!pattern43.test(data1)){
const err18 = {instancePath:instancePath+"/visitId",schemaPath:"#/properties/visitId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
else {
const err19 = {instancePath:instancePath+"/visitId",schemaPath:"#/properties/visitId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.inputOwner !== undefined){
let data2 = data.inputOwner;
if(typeof data2 !== "string"){
const err20 = {instancePath:instancePath+"/inputOwner",schemaPath:"#/properties/inputOwner/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(!((((((data2 === "home") || (data2 === "world")) || (data2 === "task")) || (data2 === "text")) || (data2 === "picker")) || (data2 === "confirmation"))){
const err21 = {instancePath:instancePath+"/inputOwner",schemaPath:"#/properties/inputOwner/enum",keyword:"enum",params:{allowedValues: schema66.properties.inputOwner.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.taskState !== undefined){
let data3 = data.taskState;
const _errs8 = errors;
let valid1 = false;
const _errs9 = errors;
if(typeof data3 === "string"){
if(func2(data3) > 160){
const err22 = {instancePath:instancePath+"/taskState",schemaPath:"#/properties/taskState/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
if(!pattern3.test(data3)){
const err23 = {instancePath:instancePath+"/taskState",schemaPath:"#/properties/taskState/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
else {
const err24 = {instancePath:instancePath+"/taskState",schemaPath:"#/properties/taskState/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
var _valid0 = _errs9 === errors;
valid1 = valid1 || _valid0;
const _errs11 = errors;
if(data3 !== null){
const err25 = {instancePath:instancePath+"/taskState",schemaPath:"#/properties/taskState/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
var _valid0 = _errs11 === errors;
valid1 = valid1 || _valid0;
if(!valid1){
const err26 = {instancePath:instancePath+"/taskState",schemaPath:"#/properties/taskState/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
else {
errors = _errs8;
if(vErrors !== null){
if(_errs8){
vErrors.length = _errs8;
}
else {
vErrors = null;
}
}
}
}
if(data.childState !== undefined){
let data4 = data.childState;
const _errs14 = errors;
let valid2 = false;
const _errs15 = errors;
if(typeof data4 === "string"){
if(func2(data4) > 160){
const err27 = {instancePath:instancePath+"/childState",schemaPath:"#/properties/childState/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
if(!pattern3.test(data4)){
const err28 = {instancePath:instancePath+"/childState",schemaPath:"#/properties/childState/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
else {
const err29 = {instancePath:instancePath+"/childState",schemaPath:"#/properties/childState/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
var _valid1 = _errs15 === errors;
valid2 = valid2 || _valid1;
const _errs17 = errors;
if(data4 !== null){
const err30 = {instancePath:instancePath+"/childState",schemaPath:"#/properties/childState/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
var _valid1 = _errs17 === errors;
valid2 = valid2 || _valid1;
if(!valid2){
const err31 = {instancePath:instancePath+"/childState",schemaPath:"#/properties/childState/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
else {
errors = _errs14;
if(vErrors !== null){
if(_errs14){
vErrors.length = _errs14;
}
else {
vErrors = null;
}
}
}
}
if(data.callerState !== undefined){
let data5 = data.callerState;
const _errs20 = errors;
let valid3 = false;
const _errs21 = errors;
if(typeof data5 === "string"){
if(func2(data5) > 160){
const err32 = {instancePath:instancePath+"/callerState",schemaPath:"#/properties/callerState/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
if(!pattern3.test(data5)){
const err33 = {instancePath:instancePath+"/callerState",schemaPath:"#/properties/callerState/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
else {
const err34 = {instancePath:instancePath+"/callerState",schemaPath:"#/properties/callerState/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
var _valid2 = _errs21 === errors;
valid3 = valid3 || _valid2;
const _errs23 = errors;
if(data5 !== null){
const err35 = {instancePath:instancePath+"/callerState",schemaPath:"#/properties/callerState/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
var _valid2 = _errs23 === errors;
valid3 = valid3 || _valid2;
if(!valid3){
const err36 = {instancePath:instancePath+"/callerState",schemaPath:"#/properties/callerState/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
else {
errors = _errs20;
if(vErrors !== null){
if(_errs20){
vErrors.length = _errs20;
}
else {
vErrors = null;
}
}
}
}
if(data.callerReturn !== undefined){
let data6 = data.callerReturn;
const _errs26 = errors;
let valid4 = false;
const _errs27 = errors;
if(!(validate152(data6, {instancePath:instancePath+"/callerReturn",parentData:data,parentDataProperty:"callerReturn",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate152.errors : vErrors.concat(validate152.errors);
errors = vErrors.length;
}
var _valid3 = _errs27 === errors;
valid4 = valid4 || _valid3;
const _errs28 = errors;
if(data6 !== null){
const err37 = {instancePath:instancePath+"/callerReturn",schemaPath:"#/properties/callerReturn/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
var _valid3 = _errs28 === errors;
valid4 = valid4 || _valid3;
if(!valid4){
const err38 = {instancePath:instancePath+"/callerReturn",schemaPath:"#/properties/callerReturn/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
else {
errors = _errs26;
if(vErrors !== null){
if(_errs26){
vErrors.length = _errs26;
}
else {
vErrors = null;
}
}
}
}
if(data.focusOwner !== undefined){
let data7 = data.focusOwner;
const _errs31 = errors;
let valid5 = false;
const _errs32 = errors;
if(!(validate152(data7, {instancePath:instancePath+"/focusOwner",parentData:data,parentDataProperty:"focusOwner",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate152.errors : vErrors.concat(validate152.errors);
errors = vErrors.length;
}
var _valid4 = _errs32 === errors;
valid5 = valid5 || _valid4;
const _errs33 = errors;
if(data7 !== null){
const err39 = {instancePath:instancePath+"/focusOwner",schemaPath:"#/properties/focusOwner/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
var _valid4 = _errs33 === errors;
valid5 = valid5 || _valid4;
if(!valid5){
const err40 = {instancePath:instancePath+"/focusOwner",schemaPath:"#/properties/focusOwner/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
else {
errors = _errs31;
if(vErrors !== null){
if(_errs31){
vErrors.length = _errs31;
}
else {
vErrors = null;
}
}
}
}
if(data.pendingAction !== undefined){
let data8 = data.pendingAction;
const _errs36 = errors;
let valid6 = false;
const _errs37 = errors;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
if(data8.id === undefined){
const err41 = {instancePath:instancePath+"/pendingAction",schemaPath:"#/properties/pendingAction/anyOf/0/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
if(data8.targetId === undefined){
const err42 = {instancePath:instancePath+"/pendingAction",schemaPath:"#/properties/pendingAction/anyOf/0/required",keyword:"required",params:{missingProperty: "targetId"},message:"must have required property '"+"targetId"+"'"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
if(data8.stage === undefined){
const err43 = {instancePath:instancePath+"/pendingAction",schemaPath:"#/properties/pendingAction/anyOf/0/required",keyword:"required",params:{missingProperty: "stage"},message:"must have required property '"+"stage"+"'"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
if(data8.commitRule === undefined){
const err44 = {instancePath:instancePath+"/pendingAction",schemaPath:"#/properties/pendingAction/anyOf/0/required",keyword:"required",params:{missingProperty: "commitRule"},message:"must have required property '"+"commitRule"+"'"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
for(const key1 in data8){
if(!((((key1 === "id") || (key1 === "targetId")) || (key1 === "stage")) || (key1 === "commitRule"))){
const err45 = {instancePath:instancePath+"/pendingAction",schemaPath:"#/properties/pendingAction/anyOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
}
if(data8.id !== undefined){
let data9 = data8.id;
if(typeof data9 === "string"){
if(func2(data9) > 36){
const err46 = {instancePath:instancePath+"/pendingAction/id",schemaPath:"#/properties/pendingAction/anyOf/0/properties/id/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
if(!pattern43.test(data9)){
const err47 = {instancePath:instancePath+"/pendingAction/id",schemaPath:"#/properties/pendingAction/anyOf/0/properties/id/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
}
else {
const err48 = {instancePath:instancePath+"/pendingAction/id",schemaPath:"#/properties/pendingAction/anyOf/0/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
}
if(data8.targetId !== undefined){
let data10 = data8.targetId;
if(typeof data10 === "string"){
if(func2(data10) > 160){
const err49 = {instancePath:instancePath+"/pendingAction/targetId",schemaPath:"#/properties/pendingAction/anyOf/0/properties/targetId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
if(!pattern3.test(data10)){
const err50 = {instancePath:instancePath+"/pendingAction/targetId",schemaPath:"#/properties/pendingAction/anyOf/0/properties/targetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
}
else {
const err51 = {instancePath:instancePath+"/pendingAction/targetId",schemaPath:"#/properties/pendingAction/anyOf/0/properties/targetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
}
if(data8.stage !== undefined){
let data11 = data8.stage;
if(typeof data11 !== "string"){
const err52 = {instancePath:instancePath+"/pendingAction/stage",schemaPath:"#/properties/pendingAction/anyOf/0/properties/stage/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err52];
}
else {
vErrors.push(err52);
}
errors++;
}
if(!((data11 === "approaching") || (data11 === "operating"))){
const err53 = {instancePath:instancePath+"/pendingAction/stage",schemaPath:"#/properties/pendingAction/anyOf/0/properties/stage/enum",keyword:"enum",params:{allowedValues: schema66.properties.pendingAction.anyOf[0].properties.stage.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
}
if(data8.commitRule !== undefined){
let data12 = data8.commitRule;
if(typeof data12 !== "string"){
const err54 = {instancePath:instancePath+"/pendingAction/commitRule",schemaPath:"#/properties/pendingAction/anyOf/0/properties/commitRule/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
}
if(!((((data12 === "rollback-before-endpoint") || (data12 === "keep-committed")) || (data12 === "toast-reveal")) || (data12 === "cue-endpoint"))){
const err55 = {instancePath:instancePath+"/pendingAction/commitRule",schemaPath:"#/properties/pendingAction/anyOf/0/properties/commitRule/enum",keyword:"enum",params:{allowedValues: schema66.properties.pendingAction.anyOf[0].properties.commitRule.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err55];
}
else {
vErrors.push(err55);
}
errors++;
}
}
}
else {
const err56 = {instancePath:instancePath+"/pendingAction",schemaPath:"#/properties/pendingAction/anyOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err56];
}
else {
vErrors.push(err56);
}
errors++;
}
var _valid5 = _errs37 === errors;
valid6 = valid6 || _valid5;
const _errs48 = errors;
if(data8 !== null){
const err57 = {instancePath:instancePath+"/pendingAction",schemaPath:"#/properties/pendingAction/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err57];
}
else {
vErrors.push(err57);
}
errors++;
}
var _valid5 = _errs48 === errors;
valid6 = valid6 || _valid5;
if(!valid6){
const err58 = {instancePath:instancePath+"/pendingAction",schemaPath:"#/properties/pendingAction/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err58];
}
else {
vErrors.push(err58);
}
errors++;
}
else {
errors = _errs36;
if(vErrors !== null){
if(_errs36){
vErrors.length = _errs36;
}
else {
vErrors = null;
}
}
}
}
if(data.heldTile !== undefined){
let data13 = data.heldTile;
const _errs51 = errors;
let valid8 = false;
const _errs52 = errors;
if(data13 && typeof data13 == "object" && !Array.isArray(data13)){
if(data13.tile === undefined){
const err59 = {instancePath:instancePath+"/heldTile",schemaPath:"#/properties/heldTile/anyOf/0/required",keyword:"required",params:{missingProperty: "tile"},message:"must have required property '"+"tile"+"'"};
if(vErrors === null){
vErrors = [err59];
}
else {
vErrors.push(err59);
}
errors++;
}
if(data13.origin === undefined){
const err60 = {instancePath:instancePath+"/heldTile",schemaPath:"#/properties/heldTile/anyOf/0/required",keyword:"required",params:{missingProperty: "origin"},message:"must have required property '"+"origin"+"'"};
if(vErrors === null){
vErrors = [err60];
}
else {
vErrors.push(err60);
}
errors++;
}
if(data13.originIndex === undefined){
const err61 = {instancePath:instancePath+"/heldTile",schemaPath:"#/properties/heldTile/anyOf/0/required",keyword:"required",params:{missingProperty: "originIndex"},message:"must have required property '"+"originIndex"+"'"};
if(vErrors === null){
vErrors = [err61];
}
else {
vErrors.push(err61);
}
errors++;
}
if(data13.arrangementRevision === undefined){
const err62 = {instancePath:instancePath+"/heldTile",schemaPath:"#/properties/heldTile/anyOf/0/required",keyword:"required",params:{missingProperty: "arrangementRevision"},message:"must have required property '"+"arrangementRevision"+"'"};
if(vErrors === null){
vErrors = [err62];
}
else {
vErrors.push(err62);
}
errors++;
}
for(const key2 in data13){
if(!((((key2 === "tile") || (key2 === "origin")) || (key2 === "originIndex")) || (key2 === "arrangementRevision"))){
const err63 = {instancePath:instancePath+"/heldTile",schemaPath:"#/properties/heldTile/anyOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err63];
}
else {
vErrors.push(err63);
}
errors++;
}
}
if(data13.tile !== undefined){
let data14 = data13.tile;
if(typeof data14 !== "string"){
const err64 = {instancePath:instancePath+"/heldTile/tile",schemaPath:"#/properties/heldTile/anyOf/0/properties/tile/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err64];
}
else {
vErrors.push(err64);
}
errors++;
}
if(!((((data14 === "TILE.FERRY") || (data14 === "TILE.BRIDGE")) || (data14 === "TILE.PLANT")) || (data14 === "TILE.BLOOM"))){
const err65 = {instancePath:instancePath+"/heldTile/tile",schemaPath:"#/properties/heldTile/anyOf/0/properties/tile/enum",keyword:"enum",params:{allowedValues: schema66.properties.heldTile.anyOf[0].properties.tile.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err65];
}
else {
vErrors.push(err65);
}
errors++;
}
}
if(data13.origin !== undefined){
let data15 = data13.origin;
if(typeof data15 !== "string"){
const err66 = {instancePath:instancePath+"/heldTile/origin",schemaPath:"#/properties/heldTile/anyOf/0/properties/origin/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err66];
}
else {
vErrors.push(err66);
}
errors++;
}
if(!((data15 === "caddy") || (data15 === "rail"))){
const err67 = {instancePath:instancePath+"/heldTile/origin",schemaPath:"#/properties/heldTile/anyOf/0/properties/origin/enum",keyword:"enum",params:{allowedValues: schema66.properties.heldTile.anyOf[0].properties.origin.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err67];
}
else {
vErrors.push(err67);
}
errors++;
}
}
if(data13.originIndex !== undefined){
let data16 = data13.originIndex;
const _errs60 = errors;
let valid10 = false;
const _errs61 = errors;
if(!(((typeof data16 == "number") && (!(data16 % 1) && !isNaN(data16))) && (isFinite(data16)))){
const err68 = {instancePath:instancePath+"/heldTile/originIndex",schemaPath:"#/properties/heldTile/anyOf/0/properties/originIndex/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err68];
}
else {
vErrors.push(err68);
}
errors++;
}
if((typeof data16 == "number") && (isFinite(data16))){
if(data16 > 3 || isNaN(data16)){
const err69 = {instancePath:instancePath+"/heldTile/originIndex",schemaPath:"#/properties/heldTile/anyOf/0/properties/originIndex/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 3},message:"must be <= 3"};
if(vErrors === null){
vErrors = [err69];
}
else {
vErrors.push(err69);
}
errors++;
}
if(data16 < 0 || isNaN(data16)){
const err70 = {instancePath:instancePath+"/heldTile/originIndex",schemaPath:"#/properties/heldTile/anyOf/0/properties/originIndex/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err70];
}
else {
vErrors.push(err70);
}
errors++;
}
}
var _valid7 = _errs61 === errors;
valid10 = valid10 || _valid7;
const _errs63 = errors;
if(data16 !== null){
const err71 = {instancePath:instancePath+"/heldTile/originIndex",schemaPath:"#/properties/heldTile/anyOf/0/properties/originIndex/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err71];
}
else {
vErrors.push(err71);
}
errors++;
}
var _valid7 = _errs63 === errors;
valid10 = valid10 || _valid7;
if(!valid10){
const err72 = {instancePath:instancePath+"/heldTile/originIndex",schemaPath:"#/properties/heldTile/anyOf/0/properties/originIndex/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err72];
}
else {
vErrors.push(err72);
}
errors++;
}
else {
errors = _errs60;
if(vErrors !== null){
if(_errs60){
vErrors.length = _errs60;
}
else {
vErrors = null;
}
}
}
}
if(data13.arrangementRevision !== undefined){
let data17 = data13.arrangementRevision;
if(!(((typeof data17 == "number") && (!(data17 % 1) && !isNaN(data17))) && (isFinite(data17)))){
const err73 = {instancePath:instancePath+"/heldTile/arrangementRevision",schemaPath:"#/properties/heldTile/anyOf/0/properties/arrangementRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err73];
}
else {
vErrors.push(err73);
}
errors++;
}
if((typeof data17 == "number") && (isFinite(data17))){
if(data17 > 9007199254740991 || isNaN(data17)){
const err74 = {instancePath:instancePath+"/heldTile/arrangementRevision",schemaPath:"#/properties/heldTile/anyOf/0/properties/arrangementRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err74];
}
else {
vErrors.push(err74);
}
errors++;
}
if(data17 < 0 || isNaN(data17)){
const err75 = {instancePath:instancePath+"/heldTile/arrangementRevision",schemaPath:"#/properties/heldTile/anyOf/0/properties/arrangementRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err75];
}
else {
vErrors.push(err75);
}
errors++;
}
}
}
}
else {
const err76 = {instancePath:instancePath+"/heldTile",schemaPath:"#/properties/heldTile/anyOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err76];
}
else {
vErrors.push(err76);
}
errors++;
}
var _valid6 = _errs52 === errors;
valid8 = valid8 || _valid6;
const _errs67 = errors;
if(data13 !== null){
const err77 = {instancePath:instancePath+"/heldTile",schemaPath:"#/properties/heldTile/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err77];
}
else {
vErrors.push(err77);
}
errors++;
}
var _valid6 = _errs67 === errors;
valid8 = valid8 || _valid6;
if(!valid8){
const err78 = {instancePath:instancePath+"/heldTile",schemaPath:"#/properties/heldTile/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err78];
}
else {
vErrors.push(err78);
}
errors++;
}
else {
errors = _errs51;
if(vErrors !== null){
if(_errs51){
vErrors.length = _errs51;
}
else {
vErrors = null;
}
}
}
}
if(data.heldKeys !== undefined){
let data18 = data.heldKeys;
if(Array.isArray(data18)){
if(data18.length > 4){
const err79 = {instancePath:instancePath+"/heldKeys",schemaPath:"#/properties/heldKeys/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err79];
}
else {
vErrors.push(err79);
}
errors++;
}
const len0 = data18.length;
for(let i0=0; i0<len0; i0++){
let data19 = data18[i0];
if(typeof data19 !== "string"){
const err80 = {instancePath:instancePath+"/heldKeys/" + i0,schemaPath:"#/properties/heldKeys/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err80];
}
else {
vErrors.push(err80);
}
errors++;
}
if(!((((data19 === "up") || (data19 === "down")) || (data19 === "left")) || (data19 === "right"))){
const err81 = {instancePath:instancePath+"/heldKeys/" + i0,schemaPath:"#/properties/heldKeys/items/enum",keyword:"enum",params:{allowedValues: schema66.properties.heldKeys.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err81];
}
else {
vErrors.push(err81);
}
errors++;
}
}
let i1 = data18.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data18[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err82 = {instancePath:instancePath+"/heldKeys",schemaPath:"#/properties/heldKeys/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err82];
}
else {
vErrors.push(err82);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err83 = {instancePath:instancePath+"/heldKeys",schemaPath:"#/properties/heldKeys/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err83];
}
else {
vErrors.push(err83);
}
errors++;
}
}
if(data.presentation !== undefined){
let data20 = data.presentation;
if(typeof data20 !== "string"){
const err84 = {instancePath:instancePath+"/presentation",schemaPath:"#/properties/presentation/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err84];
}
else {
vErrors.push(err84);
}
errors++;
}
if(!((data20 === "arrange") || (data20 === "watch"))){
const err85 = {instancePath:instancePath+"/presentation",schemaPath:"#/properties/presentation/enum",keyword:"enum",params:{allowedValues: schema66.properties.presentation.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err85];
}
else {
vErrors.push(err85);
}
errors++;
}
}
if(data.coach !== undefined){
let data21 = data.coach;
if(data21 && typeof data21 == "object" && !Array.isArray(data21)){
if(data21.request === undefined){
const err86 = {instancePath:instancePath+"/coach",schemaPath:"#/properties/coach/required",keyword:"required",params:{missingProperty: "request"},message:"must have required property '"+"request"+"'"};
if(vErrors === null){
vErrors = [err86];
}
else {
vErrors.push(err86);
}
errors++;
}
if(data21.status === undefined){
const err87 = {instancePath:instancePath+"/coach",schemaPath:"#/properties/coach/required",keyword:"required",params:{missingProperty: "status"},message:"must have required property '"+"status"+"'"};
if(vErrors === null){
vErrors = [err87];
}
else {
vErrors.push(err87);
}
errors++;
}
if(data21.winner === undefined){
const err88 = {instancePath:instancePath+"/coach",schemaPath:"#/properties/coach/required",keyword:"required",params:{missingProperty: "winner"},message:"must have required property '"+"winner"+"'"};
if(vErrors === null){
vErrors = [err88];
}
else {
vErrors.push(err88);
}
errors++;
}
if(data21.heldResponse === undefined){
const err89 = {instancePath:instancePath+"/coach",schemaPath:"#/properties/coach/required",keyword:"required",params:{missingProperty: "heldResponse"},message:"must have required property '"+"heldResponse"+"'"};
if(vErrors === null){
vErrors = [err89];
}
else {
vErrors.push(err89);
}
errors++;
}
if(data21.fallbackFocused === undefined){
const err90 = {instancePath:instancePath+"/coach",schemaPath:"#/properties/coach/required",keyword:"required",params:{missingProperty: "fallbackFocused"},message:"must have required property '"+"fallbackFocused"+"'"};
if(vErrors === null){
vErrors = [err90];
}
else {
vErrors.push(err90);
}
errors++;
}
if(data21.deadlineElapsedMs === undefined){
const err91 = {instancePath:instancePath+"/coach",schemaPath:"#/properties/coach/required",keyword:"required",params:{missingProperty: "deadlineElapsedMs"},message:"must have required property '"+"deadlineElapsedMs"+"'"};
if(vErrors === null){
vErrors = [err91];
}
else {
vErrors.push(err91);
}
errors++;
}
for(const key3 in data21){
if(!((((((key3 === "request") || (key3 === "status")) || (key3 === "winner")) || (key3 === "heldResponse")) || (key3 === "fallbackFocused")) || (key3 === "deadlineElapsedMs"))){
const err92 = {instancePath:instancePath+"/coach",schemaPath:"#/properties/coach/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err92];
}
else {
vErrors.push(err92);
}
errors++;
}
}
if(data21.request !== undefined){
let data22 = data21.request;
const _errs79 = errors;
let valid15 = false;
const _errs80 = errors;
if(!(validate173(data22, {instancePath:instancePath+"/coach/request",parentData:data21,parentDataProperty:"request",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate173.errors : vErrors.concat(validate173.errors);
errors = vErrors.length;
}
var _valid8 = _errs80 === errors;
valid15 = valid15 || _valid8;
const _errs81 = errors;
if(data22 !== null){
const err93 = {instancePath:instancePath+"/coach/request",schemaPath:"#/properties/coach/properties/request/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err93];
}
else {
vErrors.push(err93);
}
errors++;
}
var _valid8 = _errs81 === errors;
valid15 = valid15 || _valid8;
if(!valid15){
const err94 = {instancePath:instancePath+"/coach/request",schemaPath:"#/properties/coach/properties/request/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err94];
}
else {
vErrors.push(err94);
}
errors++;
}
else {
errors = _errs79;
if(vErrors !== null){
if(_errs79){
vErrors.length = _errs79;
}
else {
vErrors = null;
}
}
}
}
if(data21.status !== undefined){
let data23 = data21.status;
if(typeof data23 !== "string"){
const err95 = {instancePath:instancePath+"/coach/status",schemaPath:"#/properties/coach/properties/status/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err95];
}
else {
vErrors.push(err95);
}
errors++;
}
if(!(((((((((data23 === "idle") || (data23 === "pending")) || (data23 === "waiting")) || (data23 === "offered")) || (data23 === "ready")) || (data23 === "displayed")) || (data23 === "stale")) || (data23 === "canceled")) || (data23 === "expired"))){
const err96 = {instancePath:instancePath+"/coach/status",schemaPath:"#/properties/coach/properties/status/enum",keyword:"enum",params:{allowedValues: schema66.properties.coach.properties.status.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err96];
}
else {
vErrors.push(err96);
}
errors++;
}
}
if(data21.winner !== undefined){
let data24 = data21.winner;
const _errs86 = errors;
let valid16 = false;
const _errs87 = errors;
if(typeof data24 !== "string"){
const err97 = {instancePath:instancePath+"/coach/winner",schemaPath:"#/properties/coach/properties/winner/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err97];
}
else {
vErrors.push(err97);
}
errors++;
}
if(!(((data24 === "live") || (data24 === "fallback")) || (data24 === "direct"))){
const err98 = {instancePath:instancePath+"/coach/winner",schemaPath:"#/properties/coach/properties/winner/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema66.properties.coach.properties.winner.anyOf[0].enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err98];
}
else {
vErrors.push(err98);
}
errors++;
}
var _valid9 = _errs87 === errors;
valid16 = valid16 || _valid9;
const _errs89 = errors;
if(data24 !== null){
const err99 = {instancePath:instancePath+"/coach/winner",schemaPath:"#/properties/coach/properties/winner/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err99];
}
else {
vErrors.push(err99);
}
errors++;
}
var _valid9 = _errs89 === errors;
valid16 = valid16 || _valid9;
if(!valid16){
const err100 = {instancePath:instancePath+"/coach/winner",schemaPath:"#/properties/coach/properties/winner/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err100];
}
else {
vErrors.push(err100);
}
errors++;
}
else {
errors = _errs86;
if(vErrors !== null){
if(_errs86){
vErrors.length = _errs86;
}
else {
vErrors = null;
}
}
}
}
if(data21.heldResponse !== undefined){
let data25 = data21.heldResponse;
const _errs92 = errors;
let valid17 = false;
const _errs93 = errors;
if(!(validate177(data25, {instancePath:instancePath+"/coach/heldResponse",parentData:data21,parentDataProperty:"heldResponse",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate177.errors : vErrors.concat(validate177.errors);
errors = vErrors.length;
}
var _valid10 = _errs93 === errors;
valid17 = valid17 || _valid10;
const _errs94 = errors;
if(data25 !== null){
const err101 = {instancePath:instancePath+"/coach/heldResponse",schemaPath:"#/properties/coach/properties/heldResponse/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err101];
}
else {
vErrors.push(err101);
}
errors++;
}
var _valid10 = _errs94 === errors;
valid17 = valid17 || _valid10;
if(!valid17){
const err102 = {instancePath:instancePath+"/coach/heldResponse",schemaPath:"#/properties/coach/properties/heldResponse/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err102];
}
else {
vErrors.push(err102);
}
errors++;
}
else {
errors = _errs92;
if(vErrors !== null){
if(_errs92){
vErrors.length = _errs92;
}
else {
vErrors = null;
}
}
}
}
if(data21.fallbackFocused !== undefined){
if(typeof data21.fallbackFocused !== "boolean"){
const err103 = {instancePath:instancePath+"/coach/fallbackFocused",schemaPath:"#/properties/coach/properties/fallbackFocused/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err103];
}
else {
vErrors.push(err103);
}
errors++;
}
}
if(data21.deadlineElapsedMs !== undefined){
let data27 = data21.deadlineElapsedMs;
if(!(((typeof data27 == "number") && (!(data27 % 1) && !isNaN(data27))) && (isFinite(data27)))){
const err104 = {instancePath:instancePath+"/coach/deadlineElapsedMs",schemaPath:"#/properties/coach/properties/deadlineElapsedMs/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err104];
}
else {
vErrors.push(err104);
}
errors++;
}
if((typeof data27 == "number") && (isFinite(data27))){
if(data27 > 9007199254740991 || isNaN(data27)){
const err105 = {instancePath:instancePath+"/coach/deadlineElapsedMs",schemaPath:"#/properties/coach/properties/deadlineElapsedMs/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err105];
}
else {
vErrors.push(err105);
}
errors++;
}
if(data27 < 0 || isNaN(data27)){
const err106 = {instancePath:instancePath+"/coach/deadlineElapsedMs",schemaPath:"#/properties/coach/properties/deadlineElapsedMs/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err106];
}
else {
vErrors.push(err106);
}
errors++;
}
}
}
}
else {
const err107 = {instancePath:instancePath+"/coach",schemaPath:"#/properties/coach/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err107];
}
else {
vErrors.push(err107);
}
errors++;
}
}
if(data.saving !== undefined){
let data28 = data.saving;
if(data28 && typeof data28 == "object" && !Array.isArray(data28)){
if(data28.currentRevision === undefined){
const err108 = {instancePath:instancePath+"/saving",schemaPath:"#/properties/saving/required",keyword:"required",params:{missingProperty: "currentRevision"},message:"must have required property '"+"currentRevision"+"'"};
if(vErrors === null){
vErrors = [err108];
}
else {
vErrors.push(err108);
}
errors++;
}
if(data28.requestedRevision === undefined){
const err109 = {instancePath:instancePath+"/saving",schemaPath:"#/properties/saving/required",keyword:"required",params:{missingProperty: "requestedRevision"},message:"must have required property '"+"requestedRevision"+"'"};
if(vErrors === null){
vErrors = [err109];
}
else {
vErrors.push(err109);
}
errors++;
}
if(data28.acknowledgedRevision === undefined){
const err110 = {instancePath:instancePath+"/saving",schemaPath:"#/properties/saving/required",keyword:"required",params:{missingProperty: "acknowledgedRevision"},message:"must have required property '"+"acknowledgedRevision"+"'"};
if(vErrors === null){
vErrors = [err110];
}
else {
vErrors.push(err110);
}
errors++;
}
if(data28.knownSlotRevision === undefined){
const err111 = {instancePath:instancePath+"/saving",schemaPath:"#/properties/saving/required",keyword:"required",params:{missingProperty: "knownSlotRevision"},message:"must have required property '"+"knownSlotRevision"+"'"};
if(vErrors === null){
vErrors = [err111];
}
else {
vErrors.push(err111);
}
errors++;
}
if(data28.writeInFlight === undefined){
const err112 = {instancePath:instancePath+"/saving",schemaPath:"#/properties/saving/required",keyword:"required",params:{missingProperty: "writeInFlight"},message:"must have required property '"+"writeInFlight"+"'"};
if(vErrors === null){
vErrors = [err112];
}
else {
vErrors.push(err112);
}
errors++;
}
if(data28.mode === undefined){
const err113 = {instancePath:instancePath+"/saving",schemaPath:"#/properties/saving/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err113];
}
else {
vErrors.push(err113);
}
errors++;
}
for(const key4 in data28){
if(!((((((key4 === "currentRevision") || (key4 === "requestedRevision")) || (key4 === "acknowledgedRevision")) || (key4 === "knownSlotRevision")) || (key4 === "writeInFlight")) || (key4 === "mode"))){
const err114 = {instancePath:instancePath+"/saving",schemaPath:"#/properties/saving/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err114];
}
else {
vErrors.push(err114);
}
errors++;
}
}
if(data28.currentRevision !== undefined){
let data29 = data28.currentRevision;
if(!(((typeof data29 == "number") && (!(data29 % 1) && !isNaN(data29))) && (isFinite(data29)))){
const err115 = {instancePath:instancePath+"/saving/currentRevision",schemaPath:"#/properties/saving/properties/currentRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err115];
}
else {
vErrors.push(err115);
}
errors++;
}
if((typeof data29 == "number") && (isFinite(data29))){
if(data29 > 9007199254740991 || isNaN(data29)){
const err116 = {instancePath:instancePath+"/saving/currentRevision",schemaPath:"#/properties/saving/properties/currentRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err116];
}
else {
vErrors.push(err116);
}
errors++;
}
if(data29 < 0 || isNaN(data29)){
const err117 = {instancePath:instancePath+"/saving/currentRevision",schemaPath:"#/properties/saving/properties/currentRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err117];
}
else {
vErrors.push(err117);
}
errors++;
}
}
}
if(data28.requestedRevision !== undefined){
let data30 = data28.requestedRevision;
const _errs106 = errors;
let valid19 = false;
const _errs107 = errors;
if(!(((typeof data30 == "number") && (!(data30 % 1) && !isNaN(data30))) && (isFinite(data30)))){
const err118 = {instancePath:instancePath+"/saving/requestedRevision",schemaPath:"#/properties/saving/properties/requestedRevision/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err118];
}
else {
vErrors.push(err118);
}
errors++;
}
if((typeof data30 == "number") && (isFinite(data30))){
if(data30 > 9007199254740991 || isNaN(data30)){
const err119 = {instancePath:instancePath+"/saving/requestedRevision",schemaPath:"#/properties/saving/properties/requestedRevision/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err119];
}
else {
vErrors.push(err119);
}
errors++;
}
if(data30 < 0 || isNaN(data30)){
const err120 = {instancePath:instancePath+"/saving/requestedRevision",schemaPath:"#/properties/saving/properties/requestedRevision/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err120];
}
else {
vErrors.push(err120);
}
errors++;
}
}
var _valid11 = _errs107 === errors;
valid19 = valid19 || _valid11;
const _errs109 = errors;
if(data30 !== null){
const err121 = {instancePath:instancePath+"/saving/requestedRevision",schemaPath:"#/properties/saving/properties/requestedRevision/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err121];
}
else {
vErrors.push(err121);
}
errors++;
}
var _valid11 = _errs109 === errors;
valid19 = valid19 || _valid11;
if(!valid19){
const err122 = {instancePath:instancePath+"/saving/requestedRevision",schemaPath:"#/properties/saving/properties/requestedRevision/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err122];
}
else {
vErrors.push(err122);
}
errors++;
}
else {
errors = _errs106;
if(vErrors !== null){
if(_errs106){
vErrors.length = _errs106;
}
else {
vErrors = null;
}
}
}
}
if(data28.acknowledgedRevision !== undefined){
let data31 = data28.acknowledgedRevision;
const _errs112 = errors;
let valid20 = false;
const _errs113 = errors;
if(!(((typeof data31 == "number") && (!(data31 % 1) && !isNaN(data31))) && (isFinite(data31)))){
const err123 = {instancePath:instancePath+"/saving/acknowledgedRevision",schemaPath:"#/properties/saving/properties/acknowledgedRevision/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err123];
}
else {
vErrors.push(err123);
}
errors++;
}
if((typeof data31 == "number") && (isFinite(data31))){
if(data31 > 9007199254740991 || isNaN(data31)){
const err124 = {instancePath:instancePath+"/saving/acknowledgedRevision",schemaPath:"#/properties/saving/properties/acknowledgedRevision/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err124];
}
else {
vErrors.push(err124);
}
errors++;
}
if(data31 < 0 || isNaN(data31)){
const err125 = {instancePath:instancePath+"/saving/acknowledgedRevision",schemaPath:"#/properties/saving/properties/acknowledgedRevision/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err125];
}
else {
vErrors.push(err125);
}
errors++;
}
}
var _valid12 = _errs113 === errors;
valid20 = valid20 || _valid12;
const _errs115 = errors;
if(data31 !== null){
const err126 = {instancePath:instancePath+"/saving/acknowledgedRevision",schemaPath:"#/properties/saving/properties/acknowledgedRevision/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err126];
}
else {
vErrors.push(err126);
}
errors++;
}
var _valid12 = _errs115 === errors;
valid20 = valid20 || _valid12;
if(!valid20){
const err127 = {instancePath:instancePath+"/saving/acknowledgedRevision",schemaPath:"#/properties/saving/properties/acknowledgedRevision/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err127];
}
else {
vErrors.push(err127);
}
errors++;
}
else {
errors = _errs112;
if(vErrors !== null){
if(_errs112){
vErrors.length = _errs112;
}
else {
vErrors = null;
}
}
}
}
if(data28.knownSlotRevision !== undefined){
let data32 = data28.knownSlotRevision;
const _errs118 = errors;
let valid21 = false;
const _errs119 = errors;
if(!(((typeof data32 == "number") && (!(data32 % 1) && !isNaN(data32))) && (isFinite(data32)))){
const err128 = {instancePath:instancePath+"/saving/knownSlotRevision",schemaPath:"#/properties/saving/properties/knownSlotRevision/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err128];
}
else {
vErrors.push(err128);
}
errors++;
}
if((typeof data32 == "number") && (isFinite(data32))){
if(data32 > 9007199254740991 || isNaN(data32)){
const err129 = {instancePath:instancePath+"/saving/knownSlotRevision",schemaPath:"#/properties/saving/properties/knownSlotRevision/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err129];
}
else {
vErrors.push(err129);
}
errors++;
}
if(data32 < 0 || isNaN(data32)){
const err130 = {instancePath:instancePath+"/saving/knownSlotRevision",schemaPath:"#/properties/saving/properties/knownSlotRevision/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err130];
}
else {
vErrors.push(err130);
}
errors++;
}
}
var _valid13 = _errs119 === errors;
valid21 = valid21 || _valid13;
const _errs121 = errors;
if(data32 !== null){
const err131 = {instancePath:instancePath+"/saving/knownSlotRevision",schemaPath:"#/properties/saving/properties/knownSlotRevision/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err131];
}
else {
vErrors.push(err131);
}
errors++;
}
var _valid13 = _errs121 === errors;
valid21 = valid21 || _valid13;
if(!valid21){
const err132 = {instancePath:instancePath+"/saving/knownSlotRevision",schemaPath:"#/properties/saving/properties/knownSlotRevision/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err132];
}
else {
vErrors.push(err132);
}
errors++;
}
else {
errors = _errs118;
if(vErrors !== null){
if(_errs118){
vErrors.length = _errs118;
}
else {
vErrors = null;
}
}
}
}
if(data28.writeInFlight !== undefined){
if(typeof data28.writeInFlight !== "boolean"){
const err133 = {instancePath:instancePath+"/saving/writeInFlight",schemaPath:"#/properties/saving/properties/writeInFlight/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err133];
}
else {
vErrors.push(err133);
}
errors++;
}
}
if(data28.mode !== undefined){
let data34 = data28.mode;
if(typeof data34 !== "string"){
const err134 = {instancePath:instancePath+"/saving/mode",schemaPath:"#/properties/saving/properties/mode/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err134];
}
else {
vErrors.push(err134);
}
errors++;
}
if(!((((data34 === "normal") || (data34 === "unavailable")) || (data34 === "unknown-record")) || (data34 === "conflict"))){
const err135 = {instancePath:instancePath+"/saving/mode",schemaPath:"#/properties/saving/properties/mode/enum",keyword:"enum",params:{allowedValues: schema66.properties.saving.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err135];
}
else {
vErrors.push(err135);
}
errors++;
}
}
}
else {
const err136 = {instancePath:instancePath+"/saving",schemaPath:"#/properties/saving/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err136];
}
else {
vErrors.push(err136);
}
errors++;
}
}
if(data.scroll !== undefined){
let data35 = data.scroll;
if(Array.isArray(data35)){
if(data35.length > 32){
const err137 = {instancePath:instancePath+"/scroll",schemaPath:"#/properties/scroll/maxItems",keyword:"maxItems",params:{limit: 32},message:"must NOT have more than 32 items"};
if(vErrors === null){
vErrors = [err137];
}
else {
vErrors.push(err137);
}
errors++;
}
const len1 = data35.length;
for(let i2=0; i2<len1; i2++){
let data36 = data35[i2];
if(data36 && typeof data36 == "object" && !Array.isArray(data36)){
if(data36.owner === undefined){
const err138 = {instancePath:instancePath+"/scroll/" + i2,schemaPath:"#/properties/scroll/items/required",keyword:"required",params:{missingProperty: "owner"},message:"must have required property '"+"owner"+"'"};
if(vErrors === null){
vErrors = [err138];
}
else {
vErrors.push(err138);
}
errors++;
}
if(data36.fraction === undefined){
const err139 = {instancePath:instancePath+"/scroll/" + i2,schemaPath:"#/properties/scroll/items/required",keyword:"required",params:{missingProperty: "fraction"},message:"must have required property '"+"fraction"+"'"};
if(vErrors === null){
vErrors = [err139];
}
else {
vErrors.push(err139);
}
errors++;
}
for(const key5 in data36){
if(!((key5 === "owner") || (key5 === "fraction"))){
const err140 = {instancePath:instancePath+"/scroll/" + i2,schemaPath:"#/properties/scroll/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err140];
}
else {
vErrors.push(err140);
}
errors++;
}
}
if(data36.owner !== undefined){
let data37 = data36.owner;
if(typeof data37 === "string"){
if(func2(data37) > 160){
const err141 = {instancePath:instancePath+"/scroll/" + i2+"/owner",schemaPath:"#/properties/scroll/items/properties/owner/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err141];
}
else {
vErrors.push(err141);
}
errors++;
}
if(!pattern3.test(data37)){
const err142 = {instancePath:instancePath+"/scroll/" + i2+"/owner",schemaPath:"#/properties/scroll/items/properties/owner/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err142];
}
else {
vErrors.push(err142);
}
errors++;
}
}
else {
const err143 = {instancePath:instancePath+"/scroll/" + i2+"/owner",schemaPath:"#/properties/scroll/items/properties/owner/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err143];
}
else {
vErrors.push(err143);
}
errors++;
}
}
if(data36.fraction !== undefined){
let data38 = data36.fraction;
if((typeof data38 == "number") && (isFinite(data38))){
if(data38 > 1 || isNaN(data38)){
const err144 = {instancePath:instancePath+"/scroll/" + i2+"/fraction",schemaPath:"#/properties/scroll/items/properties/fraction/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err144];
}
else {
vErrors.push(err144);
}
errors++;
}
if(data38 < 0 || isNaN(data38)){
const err145 = {instancePath:instancePath+"/scroll/" + i2+"/fraction",schemaPath:"#/properties/scroll/items/properties/fraction/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err145];
}
else {
vErrors.push(err145);
}
errors++;
}
}
else {
const err146 = {instancePath:instancePath+"/scroll/" + i2+"/fraction",schemaPath:"#/properties/scroll/items/properties/fraction/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err146];
}
else {
vErrors.push(err146);
}
errors++;
}
}
}
else {
const err147 = {instancePath:instancePath+"/scroll/" + i2,schemaPath:"#/properties/scroll/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err147];
}
else {
vErrors.push(err147);
}
errors++;
}
}
}
else {
const err148 = {instancePath:instancePath+"/scroll",schemaPath:"#/properties/scroll/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err148];
}
else {
vErrors.push(err148);
}
errors++;
}
}
}
else {
const err149 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err149];
}
else {
vErrors.push(err149);
}
errors++;
}
validate226.errors = vErrors;
return errors === 0;
}
validate226.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate225(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:evidence-quest:Session" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate225.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(!(validate226(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate226.errors : vErrors.concat(validate226.errors);
errors = vErrors.length;
}
validate225.errors = vErrors;
return errors === 0;
}
validate225.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const validateModelProposal = validate232;
const schema80 = {"$id":"urn:evidence-quest:ModelProposal","$ref":"https://evidence-quest.invalid/contracts/v1#/$defs/ModelProposal"};
const schema81 = {"type":"object","properties":{"moveId":{"type":"string","enum":["NOTICE_CONTEXT","NOTICE_SCOPE","CLIP_LIMIT","POSITIVE_SUPPORT","TESTABLE_LEAD","PLAN_VS_RESULT","FULL_PROMISE","BOAT_CAPACITY","TOGETHER","ROOT_CONDITION","VALID_DIRECT","VALID_EXTRA","ARRANGEMENT_ONLY","CLARIFY","NARROW_CLAIM","UNKNOWN_DETAIL","RETURN_TO_CASE","NO_ELIGIBLE_MOVE"]},"interpretation":{"$ref":"#/$defs/InterpretationTag"},"refs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"uncertain":{"type":"boolean"}},"required":["moveId","interpretation","refs","uncertain"],"additionalProperties":false};

function validate233(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate233.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.moveId === undefined){
const err0 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "moveId"},message:"must have required property '"+"moveId"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.interpretation === undefined){
const err1 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "interpretation"},message:"must have required property '"+"interpretation"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.refs === undefined){
const err2 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "refs"},message:"must have required property '"+"refs"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.uncertain === undefined){
const err3 = {instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: "uncertain"},message:"must have required property '"+"uncertain"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
for(const key0 in data){
if(!((((key0 === "moveId") || (key0 === "interpretation")) || (key0 === "refs")) || (key0 === "uncertain"))){
const err4 = {instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
if(data.moveId !== undefined){
let data0 = data.moveId;
if(typeof data0 !== "string"){
const err5 = {instancePath:instancePath+"/moveId",schemaPath:"#/properties/moveId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(!((((((((((((((((((data0 === "NOTICE_CONTEXT") || (data0 === "NOTICE_SCOPE")) || (data0 === "CLIP_LIMIT")) || (data0 === "POSITIVE_SUPPORT")) || (data0 === "TESTABLE_LEAD")) || (data0 === "PLAN_VS_RESULT")) || (data0 === "FULL_PROMISE")) || (data0 === "BOAT_CAPACITY")) || (data0 === "TOGETHER")) || (data0 === "ROOT_CONDITION")) || (data0 === "VALID_DIRECT")) || (data0 === "VALID_EXTRA")) || (data0 === "ARRANGEMENT_ONLY")) || (data0 === "CLARIFY")) || (data0 === "NARROW_CLAIM")) || (data0 === "UNKNOWN_DETAIL")) || (data0 === "RETURN_TO_CASE")) || (data0 === "NO_ELIGIBLE_MOVE"))){
const err6 = {instancePath:instancePath+"/moveId",schemaPath:"#/properties/moveId/enum",keyword:"enum",params:{allowedValues: schema81.properties.moveId.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
}
if(data.interpretation !== undefined){
if(!(validate100(data.interpretation, {instancePath:instancePath+"/interpretation",parentData:data,parentDataProperty:"interpretation",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate100.errors : vErrors.concat(validate100.errors);
errors = vErrors.length;
}
}
if(data.refs !== undefined){
let data2 = data.refs;
if(Array.isArray(data2)){
if(data2.length > 64){
const err7 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
const len0 = data2.length;
for(let i0=0; i0<len0; i0++){
let data3 = data2[i0];
if(typeof data3 === "string"){
if(func2(data3) > 160){
const err8 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(!pattern3.test(data3)){
const err9 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
else {
const err10 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
let i1 = data2.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data2[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err11 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err12 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.uncertain !== undefined){
if(typeof data.uncertain !== "boolean"){
const err13 = {instancePath:instancePath+"/uncertain",schemaPath:"#/properties/uncertain/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
}
else {
const err14 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
validate233.errors = vErrors;
return errors === 0;
}
validate233.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate232(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:evidence-quest:ModelProposal" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate232.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(!(validate233(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate233.errors : vErrors.concat(validate233.errors);
errors = vErrors.length;
}
validate232.errors = vErrors;
return errors === 0;
}
validate232.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

