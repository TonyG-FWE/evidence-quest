import ajvRuntime0 from 'ajv/dist/runtime/ucs2length.js';
"use strict";
export const validateAuthoredContent = validate20;
const schema31 = {"$id":"urn:evidence-quest:AuthoredContent","$ref":"https://evidence-quest.invalid/contracts/v1#/$defs/AuthoredContent"};
const schema33 = {"type":"object","properties":{"contractKind":{"const":"AuthoredContent"},"identity":{"$ref":"#/$defs/Identity"},"completeness":{"type":"string","enum":["full","example-fragment"]},"rooms":{"type":"array","items":{"$ref":"#/$defs/Room"},"maxItems":4},"objects":{"type":"array","items":{"$ref":"#/$defs/Object"},"maxItems":256},"actors":{"type":"array","items":{"$ref":"#/$defs/Actor"},"maxItems":5},"doors":{"type":"array","items":{"$ref":"#/$defs/Door"},"maxItems":8},"sources":{"type":"array","items":{"$ref":"#/$defs/Source"},"maxItems":9},"copies":{"type":"array","items":{"$ref":"#/$defs/Copy"},"maxItems":64},"accesses":{"type":"array","items":{"$ref":"#/$defs/Access"},"maxItems":256},"texts":{"type":"array","items":{"$ref":"#/$defs/TextEntry"},"maxItems":1024},"npcBranches":{"type":"array","items":{"$ref":"#/$defs/NpcBranch"},"maxItems":128},"tiles":{"type":"array","items":{"$ref":"#/$defs/Tile"},"maxItems":4},"coachingMoves":{"type":"array","items":{"$ref":"#/$defs/CoachMove"},"maxItems":64},"assetUses":{"type":"array","items":{"$ref":"#/$defs/AssetUse"},"maxItems":512}},"required":["contractKind","identity","completeness","rooms","objects","actors","doors","sources","copies","accesses","texts","npcBranches","tiles","coachingMoves","assetUses"],"additionalProperties":false};
const schema34 = {"type":"object","properties":{"caseId":{"const":"sparkfest-little-bridge-001"},"contentVersion":{"const":3},"contentRevision":{"const":1}},"required":["caseId","contentVersion","contentRevision"],"additionalProperties":false};
const schema58 = {"type":"object","properties":{"id":{"type":"string","enum":["TILE.FERRY","TILE.BRIDGE","TILE.PLANT","TILE.BLOOM"]},"labelCt":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"descriptionCt":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"storageCell":{"type":"string","enum":["upper-right","lower-right","lower-left","upper-left"]},"rule":{"type":"string","enum":["seed-ferry","joined-crossing","joint-planting","rooted-light"]}},"required":["id","labelCt","descriptionCt","storageCell","rule"],"additionalProperties":false};
const func1 = Object.prototype.hasOwnProperty;
const func2 = ajvRuntime0.default;
const schema35 = {"type":"object","properties":{"id":{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]},"floor":{"$ref":"#/$defs/Rect"},"initialArrival":{"$ref":"#/$defs/Point"},"obstacles":{"type":"array","items":{"type":"object","properties":{"ownerId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"rect":{"$ref":"#/$defs/Rect"}},"required":["ownerId","rect"],"additionalProperties":false},"maxItems":32},"descriptionCt":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160}},"required":["id","floor","initialArrival","obstacles","descriptionCt"],"additionalProperties":false};
const schema36 = {"type":"array","prefixItems":[{"type":"number"},{"type":"number"},{"type":"number"},{"type":"number"}],"items":false,"minItems":4,"maxItems":4};
const schema37 = {"type":"array","prefixItems":[{"type":"number","minimum":0,"maximum":120},{"type":"number","minimum":0,"maximum":80}],"items":false,"minItems":2,"maxItems":2};
const pattern4 = new RegExp("^[A-Za-z0-9][A-Za-z0-9._:/-]*$", "u");

function validate23(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate23.evaluated;
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
const err7 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/enum",keyword:"enum",params:{allowedValues: schema35.properties.id.enum},message:"must be equal to one of the allowed values"};
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
let data1 = data.floor;
if(Array.isArray(data1)){
if(data1.length > 4){
const err8 = {instancePath:instancePath+"/floor",schemaPath:"#/$defs/Rect/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
if(data1.length < 4){
const err9 = {instancePath:instancePath+"/floor",schemaPath:"#/$defs/Rect/minItems",keyword:"minItems",params:{limit: 4},message:"must NOT have fewer than 4 items"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
const len0 = data1.length;
if(len0 > 0){
let data2 = data1[0];
if(!((typeof data2 == "number") && (isFinite(data2)))){
const err10 = {instancePath:instancePath+"/floor/0",schemaPath:"#/$defs/Rect/prefixItems/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(len0 > 1){
let data3 = data1[1];
if(!((typeof data3 == "number") && (isFinite(data3)))){
const err11 = {instancePath:instancePath+"/floor/1",schemaPath:"#/$defs/Rect/prefixItems/1/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
}
if(len0 > 2){
let data4 = data1[2];
if(!((typeof data4 == "number") && (isFinite(data4)))){
const err12 = {instancePath:instancePath+"/floor/2",schemaPath:"#/$defs/Rect/prefixItems/2/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(len0 > 3){
let data5 = data1[3];
if(!((typeof data5 == "number") && (isFinite(data5)))){
const err13 = {instancePath:instancePath+"/floor/3",schemaPath:"#/$defs/Rect/prefixItems/3/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
const len1 = data1.length;
if(!(len1 <= 4)){
const err14 = {instancePath:instancePath+"/floor",schemaPath:"#/$defs/Rect/items",keyword:"items",params:{limit: 4},message:"must NOT have more than 4 items"};
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
const err15 = {instancePath:instancePath+"/floor",schemaPath:"#/$defs/Rect/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.initialArrival !== undefined){
let data6 = data.initialArrival;
if(Array.isArray(data6)){
if(data6.length > 2){
const err16 = {instancePath:instancePath+"/initialArrival",schemaPath:"#/$defs/Point/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
if(data6.length < 2){
const err17 = {instancePath:instancePath+"/initialArrival",schemaPath:"#/$defs/Point/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
const len2 = data6.length;
if(len2 > 0){
let data7 = data6[0];
if((typeof data7 == "number") && (isFinite(data7))){
if(data7 > 120 || isNaN(data7)){
const err18 = {instancePath:instancePath+"/initialArrival/0",schemaPath:"#/$defs/Point/prefixItems/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 120},message:"must be <= 120"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if(data7 < 0 || isNaN(data7)){
const err19 = {instancePath:instancePath+"/initialArrival/0",schemaPath:"#/$defs/Point/prefixItems/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err20 = {instancePath:instancePath+"/initialArrival/0",schemaPath:"#/$defs/Point/prefixItems/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
if(len2 > 1){
let data8 = data6[1];
if((typeof data8 == "number") && (isFinite(data8))){
if(data8 > 80 || isNaN(data8)){
const err21 = {instancePath:instancePath+"/initialArrival/1",schemaPath:"#/$defs/Point/prefixItems/1/maximum",keyword:"maximum",params:{comparison: "<=", limit: 80},message:"must be <= 80"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
if(data8 < 0 || isNaN(data8)){
const err22 = {instancePath:instancePath+"/initialArrival/1",schemaPath:"#/$defs/Point/prefixItems/1/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err23 = {instancePath:instancePath+"/initialArrival/1",schemaPath:"#/$defs/Point/prefixItems/1/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
const len3 = data6.length;
if(!(len3 <= 2)){
const err24 = {instancePath:instancePath+"/initialArrival",schemaPath:"#/$defs/Point/items",keyword:"items",params:{limit: 2},message:"must NOT have more than 2 items"};
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
const err25 = {instancePath:instancePath+"/initialArrival",schemaPath:"#/$defs/Point/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data.obstacles !== undefined){
let data9 = data.obstacles;
if(Array.isArray(data9)){
if(data9.length > 32){
const err26 = {instancePath:instancePath+"/obstacles",schemaPath:"#/properties/obstacles/maxItems",keyword:"maxItems",params:{limit: 32},message:"must NOT have more than 32 items"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
const len4 = data9.length;
for(let i0=0; i0<len4; i0++){
let data10 = data9[i0];
if(data10 && typeof data10 == "object" && !Array.isArray(data10)){
if(data10.ownerId === undefined){
const err27 = {instancePath:instancePath+"/obstacles/" + i0,schemaPath:"#/properties/obstacles/items/required",keyword:"required",params:{missingProperty: "ownerId"},message:"must have required property '"+"ownerId"+"'"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
if(data10.rect === undefined){
const err28 = {instancePath:instancePath+"/obstacles/" + i0,schemaPath:"#/properties/obstacles/items/required",keyword:"required",params:{missingProperty: "rect"},message:"must have required property '"+"rect"+"'"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
for(const key1 in data10){
if(!((key1 === "ownerId") || (key1 === "rect"))){
const err29 = {instancePath:instancePath+"/obstacles/" + i0,schemaPath:"#/properties/obstacles/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
if(data10.ownerId !== undefined){
let data11 = data10.ownerId;
if(typeof data11 === "string"){
if(func2(data11) > 160){
const err30 = {instancePath:instancePath+"/obstacles/" + i0+"/ownerId",schemaPath:"#/properties/obstacles/items/properties/ownerId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
if(!pattern4.test(data11)){
const err31 = {instancePath:instancePath+"/obstacles/" + i0+"/ownerId",schemaPath:"#/properties/obstacles/items/properties/ownerId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
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
const err32 = {instancePath:instancePath+"/obstacles/" + i0+"/ownerId",schemaPath:"#/properties/obstacles/items/properties/ownerId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
if(data10.rect !== undefined){
let data12 = data10.rect;
if(Array.isArray(data12)){
if(data12.length > 4){
const err33 = {instancePath:instancePath+"/obstacles/" + i0+"/rect",schemaPath:"#/$defs/Rect/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
if(data12.length < 4){
const err34 = {instancePath:instancePath+"/obstacles/" + i0+"/rect",schemaPath:"#/$defs/Rect/minItems",keyword:"minItems",params:{limit: 4},message:"must NOT have fewer than 4 items"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
const len5 = data12.length;
if(len5 > 0){
let data13 = data12[0];
if(!((typeof data13 == "number") && (isFinite(data13)))){
const err35 = {instancePath:instancePath+"/obstacles/" + i0+"/rect/0",schemaPath:"#/$defs/Rect/prefixItems/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
if(len5 > 1){
let data14 = data12[1];
if(!((typeof data14 == "number") && (isFinite(data14)))){
const err36 = {instancePath:instancePath+"/obstacles/" + i0+"/rect/1",schemaPath:"#/$defs/Rect/prefixItems/1/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
if(len5 > 2){
let data15 = data12[2];
if(!((typeof data15 == "number") && (isFinite(data15)))){
const err37 = {instancePath:instancePath+"/obstacles/" + i0+"/rect/2",schemaPath:"#/$defs/Rect/prefixItems/2/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
if(len5 > 3){
let data16 = data12[3];
if(!((typeof data16 == "number") && (isFinite(data16)))){
const err38 = {instancePath:instancePath+"/obstacles/" + i0+"/rect/3",schemaPath:"#/$defs/Rect/prefixItems/3/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
const len6 = data12.length;
if(!(len6 <= 4)){
const err39 = {instancePath:instancePath+"/obstacles/" + i0+"/rect",schemaPath:"#/$defs/Rect/items",keyword:"items",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
else {
const err40 = {instancePath:instancePath+"/obstacles/" + i0+"/rect",schemaPath:"#/$defs/Rect/type",keyword:"type",params:{type: "array"},message:"must be array"};
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
const err41 = {instancePath:instancePath+"/obstacles/" + i0,schemaPath:"#/properties/obstacles/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
}
else {
const err42 = {instancePath:instancePath+"/obstacles",schemaPath:"#/properties/obstacles/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
}
if(data.descriptionCt !== undefined){
let data17 = data.descriptionCt;
if(typeof data17 === "string"){
if(func2(data17) > 160){
const err43 = {instancePath:instancePath+"/descriptionCt",schemaPath:"#/properties/descriptionCt/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
if(!pattern4.test(data17)){
const err44 = {instancePath:instancePath+"/descriptionCt",schemaPath:"#/properties/descriptionCt/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
}
else {
const err45 = {instancePath:instancePath+"/descriptionCt",schemaPath:"#/properties/descriptionCt/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
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
validate23.errors = vErrors;
return errors === 0;
}
validate23.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema39 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"parentId":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"room":{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]},"kind":{"type":"string","enum":["furniture","source","actor","door","control","scenery","kit","tile","projection"]},"visual":{"$ref":"#/$defs/Rect"},"hit":{"$ref":"#/$defs/Rect"},"collisionOwner":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"approaches":{"type":"array","items":{"$ref":"#/$defs/Point"},"maxItems":4},"defaultActionCt":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"settleRule":{"type":"string","enum":["none","rollback-before-endpoint","keep-committed","toast-reveal","cue-endpoint"]},"assetSlots":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true}},"required":["id","parentId","room","kind","visual","hit","collisionOwner","approaches","defaultActionCt","settleRule","assetSlots"],"additionalProperties":false};

function validate25(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate25.evaluated;
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
if(!(func1.call(schema39.properties, key0))){
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
if(!pattern4.test(data0)){
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
if(!pattern4.test(data1)){
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
const err21 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/enum",keyword:"enum",params:{allowedValues: schema39.properties.room.enum},message:"must be equal to one of the allowed values"};
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
const err23 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/enum",keyword:"enum",params:{allowedValues: schema39.properties.kind.enum},message:"must be equal to one of the allowed values"};
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
let data4 = data.visual;
if(Array.isArray(data4)){
if(data4.length > 4){
const err24 = {instancePath:instancePath+"/visual",schemaPath:"#/$defs/Rect/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
if(data4.length < 4){
const err25 = {instancePath:instancePath+"/visual",schemaPath:"#/$defs/Rect/minItems",keyword:"minItems",params:{limit: 4},message:"must NOT have fewer than 4 items"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
const len0 = data4.length;
if(len0 > 0){
let data5 = data4[0];
if(!((typeof data5 == "number") && (isFinite(data5)))){
const err26 = {instancePath:instancePath+"/visual/0",schemaPath:"#/$defs/Rect/prefixItems/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
if(len0 > 1){
let data6 = data4[1];
if(!((typeof data6 == "number") && (isFinite(data6)))){
const err27 = {instancePath:instancePath+"/visual/1",schemaPath:"#/$defs/Rect/prefixItems/1/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
if(len0 > 2){
let data7 = data4[2];
if(!((typeof data7 == "number") && (isFinite(data7)))){
const err28 = {instancePath:instancePath+"/visual/2",schemaPath:"#/$defs/Rect/prefixItems/2/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(len0 > 3){
let data8 = data4[3];
if(!((typeof data8 == "number") && (isFinite(data8)))){
const err29 = {instancePath:instancePath+"/visual/3",schemaPath:"#/$defs/Rect/prefixItems/3/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
const len1 = data4.length;
if(!(len1 <= 4)){
const err30 = {instancePath:instancePath+"/visual",schemaPath:"#/$defs/Rect/items",keyword:"items",params:{limit: 4},message:"must NOT have more than 4 items"};
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
const err31 = {instancePath:instancePath+"/visual",schemaPath:"#/$defs/Rect/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
if(data.hit !== undefined){
let data9 = data.hit;
if(Array.isArray(data9)){
if(data9.length > 4){
const err32 = {instancePath:instancePath+"/hit",schemaPath:"#/$defs/Rect/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
if(data9.length < 4){
const err33 = {instancePath:instancePath+"/hit",schemaPath:"#/$defs/Rect/minItems",keyword:"minItems",params:{limit: 4},message:"must NOT have fewer than 4 items"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
const len2 = data9.length;
if(len2 > 0){
let data10 = data9[0];
if(!((typeof data10 == "number") && (isFinite(data10)))){
const err34 = {instancePath:instancePath+"/hit/0",schemaPath:"#/$defs/Rect/prefixItems/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
if(len2 > 1){
let data11 = data9[1];
if(!((typeof data11 == "number") && (isFinite(data11)))){
const err35 = {instancePath:instancePath+"/hit/1",schemaPath:"#/$defs/Rect/prefixItems/1/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
}
if(len2 > 2){
let data12 = data9[2];
if(!((typeof data12 == "number") && (isFinite(data12)))){
const err36 = {instancePath:instancePath+"/hit/2",schemaPath:"#/$defs/Rect/prefixItems/2/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
if(len2 > 3){
let data13 = data9[3];
if(!((typeof data13 == "number") && (isFinite(data13)))){
const err37 = {instancePath:instancePath+"/hit/3",schemaPath:"#/$defs/Rect/prefixItems/3/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
const len3 = data9.length;
if(!(len3 <= 4)){
const err38 = {instancePath:instancePath+"/hit",schemaPath:"#/$defs/Rect/items",keyword:"items",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
else {
const err39 = {instancePath:instancePath+"/hit",schemaPath:"#/$defs/Rect/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
if(data.collisionOwner !== undefined){
let data14 = data.collisionOwner;
const _errs37 = errors;
let valid6 = false;
const _errs38 = errors;
if(typeof data14 === "string"){
if(func2(data14) > 160){
const err40 = {instancePath:instancePath+"/collisionOwner",schemaPath:"#/properties/collisionOwner/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
if(!pattern4.test(data14)){
const err41 = {instancePath:instancePath+"/collisionOwner",schemaPath:"#/properties/collisionOwner/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
else {
const err42 = {instancePath:instancePath+"/collisionOwner",schemaPath:"#/properties/collisionOwner/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
var _valid1 = _errs38 === errors;
valid6 = valid6 || _valid1;
const _errs40 = errors;
if(data14 !== null){
const err43 = {instancePath:instancePath+"/collisionOwner",schemaPath:"#/properties/collisionOwner/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
var _valid1 = _errs40 === errors;
valid6 = valid6 || _valid1;
if(!valid6){
const err44 = {instancePath:instancePath+"/collisionOwner",schemaPath:"#/properties/collisionOwner/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
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
if(data.approaches !== undefined){
let data15 = data.approaches;
if(Array.isArray(data15)){
if(data15.length > 4){
const err45 = {instancePath:instancePath+"/approaches",schemaPath:"#/properties/approaches/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
const len4 = data15.length;
for(let i0=0; i0<len4; i0++){
let data16 = data15[i0];
if(Array.isArray(data16)){
if(data16.length > 2){
const err46 = {instancePath:instancePath+"/approaches/" + i0,schemaPath:"#/$defs/Point/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
if(data16.length < 2){
const err47 = {instancePath:instancePath+"/approaches/" + i0,schemaPath:"#/$defs/Point/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
const len5 = data16.length;
if(len5 > 0){
let data17 = data16[0];
if((typeof data17 == "number") && (isFinite(data17))){
if(data17 > 120 || isNaN(data17)){
const err48 = {instancePath:instancePath+"/approaches/" + i0+"/0",schemaPath:"#/$defs/Point/prefixItems/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 120},message:"must be <= 120"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
if(data17 < 0 || isNaN(data17)){
const err49 = {instancePath:instancePath+"/approaches/" + i0+"/0",schemaPath:"#/$defs/Point/prefixItems/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
}
else {
const err50 = {instancePath:instancePath+"/approaches/" + i0+"/0",schemaPath:"#/$defs/Point/prefixItems/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
}
if(len5 > 1){
let data18 = data16[1];
if((typeof data18 == "number") && (isFinite(data18))){
if(data18 > 80 || isNaN(data18)){
const err51 = {instancePath:instancePath+"/approaches/" + i0+"/1",schemaPath:"#/$defs/Point/prefixItems/1/maximum",keyword:"maximum",params:{comparison: "<=", limit: 80},message:"must be <= 80"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
if(data18 < 0 || isNaN(data18)){
const err52 = {instancePath:instancePath+"/approaches/" + i0+"/1",schemaPath:"#/$defs/Point/prefixItems/1/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err53 = {instancePath:instancePath+"/approaches/" + i0+"/1",schemaPath:"#/$defs/Point/prefixItems/1/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
}
const len6 = data16.length;
if(!(len6 <= 2)){
const err54 = {instancePath:instancePath+"/approaches/" + i0,schemaPath:"#/$defs/Point/items",keyword:"items",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
}
}
else {
const err55 = {instancePath:instancePath+"/approaches/" + i0,schemaPath:"#/$defs/Point/type",keyword:"type",params:{type: "array"},message:"must be array"};
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
const err56 = {instancePath:instancePath+"/approaches",schemaPath:"#/properties/approaches/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err56];
}
else {
vErrors.push(err56);
}
errors++;
}
}
if(data.defaultActionCt !== undefined){
let data19 = data.defaultActionCt;
const _errs52 = errors;
let valid11 = false;
const _errs53 = errors;
if(typeof data19 === "string"){
if(func2(data19) > 160){
const err57 = {instancePath:instancePath+"/defaultActionCt",schemaPath:"#/properties/defaultActionCt/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err57];
}
else {
vErrors.push(err57);
}
errors++;
}
if(!pattern4.test(data19)){
const err58 = {instancePath:instancePath+"/defaultActionCt",schemaPath:"#/properties/defaultActionCt/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err58];
}
else {
vErrors.push(err58);
}
errors++;
}
}
else {
const err59 = {instancePath:instancePath+"/defaultActionCt",schemaPath:"#/properties/defaultActionCt/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err59];
}
else {
vErrors.push(err59);
}
errors++;
}
var _valid2 = _errs53 === errors;
valid11 = valid11 || _valid2;
const _errs55 = errors;
if(data19 !== null){
const err60 = {instancePath:instancePath+"/defaultActionCt",schemaPath:"#/properties/defaultActionCt/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err60];
}
else {
vErrors.push(err60);
}
errors++;
}
var _valid2 = _errs55 === errors;
valid11 = valid11 || _valid2;
if(!valid11){
const err61 = {instancePath:instancePath+"/defaultActionCt",schemaPath:"#/properties/defaultActionCt/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err61];
}
else {
vErrors.push(err61);
}
errors++;
}
else {
errors = _errs52;
if(vErrors !== null){
if(_errs52){
vErrors.length = _errs52;
}
else {
vErrors = null;
}
}
}
}
if(data.settleRule !== undefined){
let data20 = data.settleRule;
if(typeof data20 !== "string"){
const err62 = {instancePath:instancePath+"/settleRule",schemaPath:"#/properties/settleRule/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err62];
}
else {
vErrors.push(err62);
}
errors++;
}
if(!(((((data20 === "none") || (data20 === "rollback-before-endpoint")) || (data20 === "keep-committed")) || (data20 === "toast-reveal")) || (data20 === "cue-endpoint"))){
const err63 = {instancePath:instancePath+"/settleRule",schemaPath:"#/properties/settleRule/enum",keyword:"enum",params:{allowedValues: schema39.properties.settleRule.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err63];
}
else {
vErrors.push(err63);
}
errors++;
}
}
if(data.assetSlots !== undefined){
let data21 = data.assetSlots;
if(Array.isArray(data21)){
if(data21.length > 64){
const err64 = {instancePath:instancePath+"/assetSlots",schemaPath:"#/properties/assetSlots/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err64];
}
else {
vErrors.push(err64);
}
errors++;
}
const len7 = data21.length;
for(let i1=0; i1<len7; i1++){
let data22 = data21[i1];
if(typeof data22 === "string"){
if(func2(data22) > 160){
const err65 = {instancePath:instancePath+"/assetSlots/" + i1,schemaPath:"#/properties/assetSlots/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err65];
}
else {
vErrors.push(err65);
}
errors++;
}
if(!pattern4.test(data22)){
const err66 = {instancePath:instancePath+"/assetSlots/" + i1,schemaPath:"#/properties/assetSlots/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err66];
}
else {
vErrors.push(err66);
}
errors++;
}
}
else {
const err67 = {instancePath:instancePath+"/assetSlots/" + i1,schemaPath:"#/properties/assetSlots/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err67];
}
else {
vErrors.push(err67);
}
errors++;
}
}
let i2 = data21.length;
let j0;
if(i2 > 1){
const indices0 = {};
for(;i2--;){
let item0 = data21[i2];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err68 = {instancePath:instancePath+"/assetSlots",schemaPath:"#/properties/assetSlots/uniqueItems",keyword:"uniqueItems",params:{i: i2, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i2+" are identical)"};
if(vErrors === null){
vErrors = [err68];
}
else {
vErrors.push(err68);
}
errors++;
break;
}
indices0[item0] = i2;
}
}
}
else {
const err69 = {instancePath:instancePath+"/assetSlots",schemaPath:"#/properties/assetSlots/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err69];
}
else {
vErrors.push(err69);
}
errors++;
}
}
}
else {
const err70 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err70];
}
else {
vErrors.push(err70);
}
errors++;
}
validate25.errors = vErrors;
return errors === 0;
}
validate25.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema43 = {"type":"object","properties":{"id":{"type":"string","enum":["ACT.PLAYER","ACT.LOOP","ACT.JO","ACT.REMY","ACT.ARI"]},"room":{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]},"feet":{"$ref":"#/$defs/Point"},"radius":{"type":"number","enum":[2,3]},"homeKnowledge":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true}},"required":["id","room","feet","radius","homeKnowledge"],"additionalProperties":false};

function validate27(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate27.evaluated;
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
const err7 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/enum",keyword:"enum",params:{allowedValues: schema43.properties.id.enum},message:"must be equal to one of the allowed values"};
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
const err9 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/enum",keyword:"enum",params:{allowedValues: schema43.properties.room.enum},message:"must be equal to one of the allowed values"};
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
let data2 = data.feet;
if(Array.isArray(data2)){
if(data2.length > 2){
const err10 = {instancePath:instancePath+"/feet",schemaPath:"#/$defs/Point/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(data2.length < 2){
const err11 = {instancePath:instancePath+"/feet",schemaPath:"#/$defs/Point/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
const len0 = data2.length;
if(len0 > 0){
let data3 = data2[0];
if((typeof data3 == "number") && (isFinite(data3))){
if(data3 > 120 || isNaN(data3)){
const err12 = {instancePath:instancePath+"/feet/0",schemaPath:"#/$defs/Point/prefixItems/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 120},message:"must be <= 120"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(data3 < 0 || isNaN(data3)){
const err13 = {instancePath:instancePath+"/feet/0",schemaPath:"#/$defs/Point/prefixItems/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err14 = {instancePath:instancePath+"/feet/0",schemaPath:"#/$defs/Point/prefixItems/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(len0 > 1){
let data4 = data2[1];
if((typeof data4 == "number") && (isFinite(data4))){
if(data4 > 80 || isNaN(data4)){
const err15 = {instancePath:instancePath+"/feet/1",schemaPath:"#/$defs/Point/prefixItems/1/maximum",keyword:"maximum",params:{comparison: "<=", limit: 80},message:"must be <= 80"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(data4 < 0 || isNaN(data4)){
const err16 = {instancePath:instancePath+"/feet/1",schemaPath:"#/$defs/Point/prefixItems/1/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err17 = {instancePath:instancePath+"/feet/1",schemaPath:"#/$defs/Point/prefixItems/1/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
const len1 = data2.length;
if(!(len1 <= 2)){
const err18 = {instancePath:instancePath+"/feet",schemaPath:"#/$defs/Point/items",keyword:"items",params:{limit: 2},message:"must NOT have more than 2 items"};
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
const err19 = {instancePath:instancePath+"/feet",schemaPath:"#/$defs/Point/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.radius !== undefined){
let data5 = data.radius;
if(!((typeof data5 == "number") && (isFinite(data5)))){
const err20 = {instancePath:instancePath+"/radius",schemaPath:"#/properties/radius/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(!((data5 === 2) || (data5 === 3))){
const err21 = {instancePath:instancePath+"/radius",schemaPath:"#/properties/radius/enum",keyword:"enum",params:{allowedValues: schema43.properties.radius.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.homeKnowledge !== undefined){
let data6 = data.homeKnowledge;
if(Array.isArray(data6)){
if(data6.length > 64){
const err22 = {instancePath:instancePath+"/homeKnowledge",schemaPath:"#/properties/homeKnowledge/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
const len2 = data6.length;
for(let i0=0; i0<len2; i0++){
let data7 = data6[i0];
if(typeof data7 === "string"){
if(func2(data7) > 160){
const err23 = {instancePath:instancePath+"/homeKnowledge/" + i0,schemaPath:"#/properties/homeKnowledge/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
if(!pattern4.test(data7)){
const err24 = {instancePath:instancePath+"/homeKnowledge/" + i0,schemaPath:"#/properties/homeKnowledge/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
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
const err25 = {instancePath:instancePath+"/homeKnowledge/" + i0,schemaPath:"#/properties/homeKnowledge/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
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
const err26 = {instancePath:instancePath+"/homeKnowledge",schemaPath:"#/properties/homeKnowledge/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err27 = {instancePath:instancePath+"/homeKnowledge",schemaPath:"#/properties/homeKnowledge/type",keyword:"type",params:{type: "array"},message:"must be array"};
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
validate27.errors = vErrors;
return errors === 0;
}
validate27.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema45 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"room":{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]},"approach":{"$ref":"#/$defs/Point"},"threshold":{"$ref":"#/$defs/Point"},"destinationId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"destinationRoom":{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]},"avatarArrival":{"$ref":"#/$defs/Point"},"facing":{"type":"string","enum":["up","down","left","right"]},"loopArrival":{"$ref":"#/$defs/Point"}},"required":["id","room","approach","threshold","destinationId","destinationRoom","avatarArrival","facing","loopArrival"],"additionalProperties":false};

function validate29(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate29.evaluated;
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
if(!(func1.call(schema45.properties, key0))){
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
if(!pattern4.test(data0)){
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
const err14 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/enum",keyword:"enum",params:{allowedValues: schema45.properties.room.enum},message:"must be equal to one of the allowed values"};
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
let data2 = data.approach;
if(Array.isArray(data2)){
if(data2.length > 2){
const err15 = {instancePath:instancePath+"/approach",schemaPath:"#/$defs/Point/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(data2.length < 2){
const err16 = {instancePath:instancePath+"/approach",schemaPath:"#/$defs/Point/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
const len0 = data2.length;
if(len0 > 0){
let data3 = data2[0];
if((typeof data3 == "number") && (isFinite(data3))){
if(data3 > 120 || isNaN(data3)){
const err17 = {instancePath:instancePath+"/approach/0",schemaPath:"#/$defs/Point/prefixItems/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 120},message:"must be <= 120"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(data3 < 0 || isNaN(data3)){
const err18 = {instancePath:instancePath+"/approach/0",schemaPath:"#/$defs/Point/prefixItems/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err19 = {instancePath:instancePath+"/approach/0",schemaPath:"#/$defs/Point/prefixItems/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(len0 > 1){
let data4 = data2[1];
if((typeof data4 == "number") && (isFinite(data4))){
if(data4 > 80 || isNaN(data4)){
const err20 = {instancePath:instancePath+"/approach/1",schemaPath:"#/$defs/Point/prefixItems/1/maximum",keyword:"maximum",params:{comparison: "<=", limit: 80},message:"must be <= 80"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(data4 < 0 || isNaN(data4)){
const err21 = {instancePath:instancePath+"/approach/1",schemaPath:"#/$defs/Point/prefixItems/1/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err22 = {instancePath:instancePath+"/approach/1",schemaPath:"#/$defs/Point/prefixItems/1/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
const len1 = data2.length;
if(!(len1 <= 2)){
const err23 = {instancePath:instancePath+"/approach",schemaPath:"#/$defs/Point/items",keyword:"items",params:{limit: 2},message:"must NOT have more than 2 items"};
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
const err24 = {instancePath:instancePath+"/approach",schemaPath:"#/$defs/Point/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data.threshold !== undefined){
let data5 = data.threshold;
if(Array.isArray(data5)){
if(data5.length > 2){
const err25 = {instancePath:instancePath+"/threshold",schemaPath:"#/$defs/Point/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
if(data5.length < 2){
const err26 = {instancePath:instancePath+"/threshold",schemaPath:"#/$defs/Point/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
const len2 = data5.length;
if(len2 > 0){
let data6 = data5[0];
if((typeof data6 == "number") && (isFinite(data6))){
if(data6 > 120 || isNaN(data6)){
const err27 = {instancePath:instancePath+"/threshold/0",schemaPath:"#/$defs/Point/prefixItems/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 120},message:"must be <= 120"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
if(data6 < 0 || isNaN(data6)){
const err28 = {instancePath:instancePath+"/threshold/0",schemaPath:"#/$defs/Point/prefixItems/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err29 = {instancePath:instancePath+"/threshold/0",schemaPath:"#/$defs/Point/prefixItems/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
if(len2 > 1){
let data7 = data5[1];
if((typeof data7 == "number") && (isFinite(data7))){
if(data7 > 80 || isNaN(data7)){
const err30 = {instancePath:instancePath+"/threshold/1",schemaPath:"#/$defs/Point/prefixItems/1/maximum",keyword:"maximum",params:{comparison: "<=", limit: 80},message:"must be <= 80"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
if(data7 < 0 || isNaN(data7)){
const err31 = {instancePath:instancePath+"/threshold/1",schemaPath:"#/$defs/Point/prefixItems/1/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err32 = {instancePath:instancePath+"/threshold/1",schemaPath:"#/$defs/Point/prefixItems/1/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
const len3 = data5.length;
if(!(len3 <= 2)){
const err33 = {instancePath:instancePath+"/threshold",schemaPath:"#/$defs/Point/items",keyword:"items",params:{limit: 2},message:"must NOT have more than 2 items"};
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
const err34 = {instancePath:instancePath+"/threshold",schemaPath:"#/$defs/Point/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
if(data.destinationId !== undefined){
let data8 = data.destinationId;
if(typeof data8 === "string"){
if(func2(data8) > 160){
const err35 = {instancePath:instancePath+"/destinationId",schemaPath:"#/properties/destinationId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
if(!pattern4.test(data8)){
const err36 = {instancePath:instancePath+"/destinationId",schemaPath:"#/properties/destinationId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
else {
const err37 = {instancePath:instancePath+"/destinationId",schemaPath:"#/properties/destinationId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
if(data.destinationRoom !== undefined){
let data9 = data.destinationRoom;
if(typeof data9 !== "string"){
const err38 = {instancePath:instancePath+"/destinationRoom",schemaPath:"#/properties/destinationRoom/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
if(!((((data9 === "SC.ST") || (data9 === "SC.CY")) || (data9 === "SC.WK")) || (data9 === "SC.MD"))){
const err39 = {instancePath:instancePath+"/destinationRoom",schemaPath:"#/properties/destinationRoom/enum",keyword:"enum",params:{allowedValues: schema45.properties.destinationRoom.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
if(data.avatarArrival !== undefined){
let data10 = data.avatarArrival;
if(Array.isArray(data10)){
if(data10.length > 2){
const err40 = {instancePath:instancePath+"/avatarArrival",schemaPath:"#/$defs/Point/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
if(data10.length < 2){
const err41 = {instancePath:instancePath+"/avatarArrival",schemaPath:"#/$defs/Point/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
const len4 = data10.length;
if(len4 > 0){
let data11 = data10[0];
if((typeof data11 == "number") && (isFinite(data11))){
if(data11 > 120 || isNaN(data11)){
const err42 = {instancePath:instancePath+"/avatarArrival/0",schemaPath:"#/$defs/Point/prefixItems/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 120},message:"must be <= 120"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
if(data11 < 0 || isNaN(data11)){
const err43 = {instancePath:instancePath+"/avatarArrival/0",schemaPath:"#/$defs/Point/prefixItems/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
else {
const err44 = {instancePath:instancePath+"/avatarArrival/0",schemaPath:"#/$defs/Point/prefixItems/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
}
if(len4 > 1){
let data12 = data10[1];
if((typeof data12 == "number") && (isFinite(data12))){
if(data12 > 80 || isNaN(data12)){
const err45 = {instancePath:instancePath+"/avatarArrival/1",schemaPath:"#/$defs/Point/prefixItems/1/maximum",keyword:"maximum",params:{comparison: "<=", limit: 80},message:"must be <= 80"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
if(data12 < 0 || isNaN(data12)){
const err46 = {instancePath:instancePath+"/avatarArrival/1",schemaPath:"#/$defs/Point/prefixItems/1/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err47 = {instancePath:instancePath+"/avatarArrival/1",schemaPath:"#/$defs/Point/prefixItems/1/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
}
const len5 = data10.length;
if(!(len5 <= 2)){
const err48 = {instancePath:instancePath+"/avatarArrival",schemaPath:"#/$defs/Point/items",keyword:"items",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
}
else {
const err49 = {instancePath:instancePath+"/avatarArrival",schemaPath:"#/$defs/Point/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
}
if(data.facing !== undefined){
let data13 = data.facing;
if(typeof data13 !== "string"){
const err50 = {instancePath:instancePath+"/facing",schemaPath:"#/properties/facing/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
if(!((((data13 === "up") || (data13 === "down")) || (data13 === "left")) || (data13 === "right"))){
const err51 = {instancePath:instancePath+"/facing",schemaPath:"#/properties/facing/enum",keyword:"enum",params:{allowedValues: schema45.properties.facing.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
}
if(data.loopArrival !== undefined){
let data14 = data.loopArrival;
if(Array.isArray(data14)){
if(data14.length > 2){
const err52 = {instancePath:instancePath+"/loopArrival",schemaPath:"#/$defs/Point/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err52];
}
else {
vErrors.push(err52);
}
errors++;
}
if(data14.length < 2){
const err53 = {instancePath:instancePath+"/loopArrival",schemaPath:"#/$defs/Point/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
const len6 = data14.length;
if(len6 > 0){
let data15 = data14[0];
if((typeof data15 == "number") && (isFinite(data15))){
if(data15 > 120 || isNaN(data15)){
const err54 = {instancePath:instancePath+"/loopArrival/0",schemaPath:"#/$defs/Point/prefixItems/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 120},message:"must be <= 120"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
}
if(data15 < 0 || isNaN(data15)){
const err55 = {instancePath:instancePath+"/loopArrival/0",schemaPath:"#/$defs/Point/prefixItems/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err55];
}
else {
vErrors.push(err55);
}
errors++;
}
}
else {
const err56 = {instancePath:instancePath+"/loopArrival/0",schemaPath:"#/$defs/Point/prefixItems/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err56];
}
else {
vErrors.push(err56);
}
errors++;
}
}
if(len6 > 1){
let data16 = data14[1];
if((typeof data16 == "number") && (isFinite(data16))){
if(data16 > 80 || isNaN(data16)){
const err57 = {instancePath:instancePath+"/loopArrival/1",schemaPath:"#/$defs/Point/prefixItems/1/maximum",keyword:"maximum",params:{comparison: "<=", limit: 80},message:"must be <= 80"};
if(vErrors === null){
vErrors = [err57];
}
else {
vErrors.push(err57);
}
errors++;
}
if(data16 < 0 || isNaN(data16)){
const err58 = {instancePath:instancePath+"/loopArrival/1",schemaPath:"#/$defs/Point/prefixItems/1/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err58];
}
else {
vErrors.push(err58);
}
errors++;
}
}
else {
const err59 = {instancePath:instancePath+"/loopArrival/1",schemaPath:"#/$defs/Point/prefixItems/1/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err59];
}
else {
vErrors.push(err59);
}
errors++;
}
}
const len7 = data14.length;
if(!(len7 <= 2)){
const err60 = {instancePath:instancePath+"/loopArrival",schemaPath:"#/$defs/Point/items",keyword:"items",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err60];
}
else {
vErrors.push(err60);
}
errors++;
}
}
else {
const err61 = {instancePath:instancePath+"/loopArrival",schemaPath:"#/$defs/Point/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err61];
}
else {
vErrors.push(err61);
}
errors++;
}
}
}
else {
const err62 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err62];
}
else {
vErrors.push(err62);
}
errors++;
}
validate29.errors = vErrors;
return errors === 0;
}
validate29.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema50 = {"type":"object","properties":{"id":{"type":"string","enum":["E1","E2","E3","E4","E5","E6","E7","E8","NAV"]},"titleCt":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"parts":{"type":"array","items":{"$ref":"#/$defs/SourcePart"},"maxItems":32}},"required":["id","titleCt","parts"],"additionalProperties":false};
const schema51 = {"type":"object","properties":{"refId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"ctId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"spans":{"type":"array","items":{"$ref":"#/$defs/Span"},"maxItems":8},"medium":{"type":"string","enum":["text","frame","marker","image","observation"]},"provenance":{"type":"string","enum":["written","recording","photo","posted-account","spoken-account","observation","venue","tile"]},"authorId":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"timeKind":{"type":"string","enum":["posted","recorded","captured","during-visit","none"]},"storyMinute":{"anyOf":[{"type":"integer","enum":[545,550,552,553,558]},{"type":"null"}]},"requiresAll":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true}},"required":["refId","ctId","spans","medium","provenance","authorId","timeKind","storyMinute","requiresAll"],"additionalProperties":false};
const schema52 = {"type":"array","prefixItems":[{"type":"integer","minimum":0,"maximum":9007199254740991},{"type":"integer","minimum":0,"maximum":9007199254740991}],"items":false,"minItems":2,"maxItems":2};

function validate32(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate32.evaluated;
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
if(!(func1.call(schema51.properties, key0))){
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
if(!pattern4.test(data0)){
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
if(!pattern4.test(data1)){
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
let data3 = data2[i0];
if(Array.isArray(data3)){
if(data3.length > 2){
const err17 = {instancePath:instancePath+"/spans/" + i0,schemaPath:"#/$defs/Span/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(data3.length < 2){
const err18 = {instancePath:instancePath+"/spans/" + i0,schemaPath:"#/$defs/Span/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
const len1 = data3.length;
if(len1 > 0){
let data4 = data3[0];
if(!(((typeof data4 == "number") && (!(data4 % 1) && !isNaN(data4))) && (isFinite(data4)))){
const err19 = {instancePath:instancePath+"/spans/" + i0+"/0",schemaPath:"#/$defs/Span/prefixItems/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
if((typeof data4 == "number") && (isFinite(data4))){
if(data4 > 9007199254740991 || isNaN(data4)){
const err20 = {instancePath:instancePath+"/spans/" + i0+"/0",schemaPath:"#/$defs/Span/prefixItems/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(data4 < 0 || isNaN(data4)){
const err21 = {instancePath:instancePath+"/spans/" + i0+"/0",schemaPath:"#/$defs/Span/prefixItems/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
}
if(len1 > 1){
let data5 = data3[1];
if(!(((typeof data5 == "number") && (!(data5 % 1) && !isNaN(data5))) && (isFinite(data5)))){
const err22 = {instancePath:instancePath+"/spans/" + i0+"/1",schemaPath:"#/$defs/Span/prefixItems/1/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
if((typeof data5 == "number") && (isFinite(data5))){
if(data5 > 9007199254740991 || isNaN(data5)){
const err23 = {instancePath:instancePath+"/spans/" + i0+"/1",schemaPath:"#/$defs/Span/prefixItems/1/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
if(data5 < 0 || isNaN(data5)){
const err24 = {instancePath:instancePath+"/spans/" + i0+"/1",schemaPath:"#/$defs/Span/prefixItems/1/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
}
const len2 = data3.length;
if(!(len2 <= 2)){
const err25 = {instancePath:instancePath+"/spans/" + i0,schemaPath:"#/$defs/Span/items",keyword:"items",params:{limit: 2},message:"must NOT have more than 2 items"};
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
const err26 = {instancePath:instancePath+"/spans/" + i0,schemaPath:"#/$defs/Span/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
}
else {
const err27 = {instancePath:instancePath+"/spans",schemaPath:"#/properties/spans/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
if(data.medium !== undefined){
let data6 = data.medium;
if(typeof data6 !== "string"){
const err28 = {instancePath:instancePath+"/medium",schemaPath:"#/properties/medium/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
if(!(((((data6 === "text") || (data6 === "frame")) || (data6 === "marker")) || (data6 === "image")) || (data6 === "observation"))){
const err29 = {instancePath:instancePath+"/medium",schemaPath:"#/properties/medium/enum",keyword:"enum",params:{allowedValues: schema51.properties.medium.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
if(data.provenance !== undefined){
let data7 = data.provenance;
if(typeof data7 !== "string"){
const err30 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
if(!((((((((data7 === "written") || (data7 === "recording")) || (data7 === "photo")) || (data7 === "posted-account")) || (data7 === "spoken-account")) || (data7 === "observation")) || (data7 === "venue")) || (data7 === "tile"))){
const err31 = {instancePath:instancePath+"/provenance",schemaPath:"#/properties/provenance/enum",keyword:"enum",params:{allowedValues: schema51.properties.provenance.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
if(data.authorId !== undefined){
let data8 = data.authorId;
const _errs20 = errors;
let valid5 = false;
const _errs21 = errors;
if(typeof data8 === "string"){
if(func2(data8) > 160){
const err32 = {instancePath:instancePath+"/authorId",schemaPath:"#/properties/authorId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
if(!pattern4.test(data8)){
const err33 = {instancePath:instancePath+"/authorId",schemaPath:"#/properties/authorId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
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
const err34 = {instancePath:instancePath+"/authorId",schemaPath:"#/properties/authorId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
var _valid0 = _errs21 === errors;
valid5 = valid5 || _valid0;
const _errs23 = errors;
if(data8 !== null){
const err35 = {instancePath:instancePath+"/authorId",schemaPath:"#/properties/authorId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
var _valid0 = _errs23 === errors;
valid5 = valid5 || _valid0;
if(!valid5){
const err36 = {instancePath:instancePath+"/authorId",schemaPath:"#/properties/authorId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
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
if(data.timeKind !== undefined){
let data9 = data.timeKind;
if(typeof data9 !== "string"){
const err37 = {instancePath:instancePath+"/timeKind",schemaPath:"#/properties/timeKind/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
if(!(((((data9 === "posted") || (data9 === "recorded")) || (data9 === "captured")) || (data9 === "during-visit")) || (data9 === "none"))){
const err38 = {instancePath:instancePath+"/timeKind",schemaPath:"#/properties/timeKind/enum",keyword:"enum",params:{allowedValues: schema51.properties.timeKind.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
if(data.storyMinute !== undefined){
let data10 = data.storyMinute;
const _errs28 = errors;
let valid6 = false;
const _errs29 = errors;
if(!(((typeof data10 == "number") && (!(data10 % 1) && !isNaN(data10))) && (isFinite(data10)))){
const err39 = {instancePath:instancePath+"/storyMinute",schemaPath:"#/properties/storyMinute/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
if(!(((((data10 === 545) || (data10 === 550)) || (data10 === 552)) || (data10 === 553)) || (data10 === 558))){
const err40 = {instancePath:instancePath+"/storyMinute",schemaPath:"#/properties/storyMinute/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema51.properties.storyMinute.anyOf[0].enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
var _valid1 = _errs29 === errors;
valid6 = valid6 || _valid1;
const _errs31 = errors;
if(data10 !== null){
const err41 = {instancePath:instancePath+"/storyMinute",schemaPath:"#/properties/storyMinute/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
var _valid1 = _errs31 === errors;
valid6 = valid6 || _valid1;
if(!valid6){
const err42 = {instancePath:instancePath+"/storyMinute",schemaPath:"#/properties/storyMinute/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
else {
errors = _errs28;
if(vErrors !== null){
if(_errs28){
vErrors.length = _errs28;
}
else {
vErrors = null;
}
}
}
}
if(data.requiresAll !== undefined){
let data11 = data.requiresAll;
if(Array.isArray(data11)){
if(data11.length > 64){
const err43 = {instancePath:instancePath+"/requiresAll",schemaPath:"#/properties/requiresAll/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
const len3 = data11.length;
for(let i1=0; i1<len3; i1++){
let data12 = data11[i1];
if(typeof data12 === "string"){
if(func2(data12) > 160){
const err44 = {instancePath:instancePath+"/requiresAll/" + i1,schemaPath:"#/properties/requiresAll/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
if(!pattern4.test(data12)){
const err45 = {instancePath:instancePath+"/requiresAll/" + i1,schemaPath:"#/properties/requiresAll/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
}
else {
const err46 = {instancePath:instancePath+"/requiresAll/" + i1,schemaPath:"#/properties/requiresAll/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
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
const err47 = {instancePath:instancePath+"/requiresAll",schemaPath:"#/properties/requiresAll/uniqueItems",keyword:"uniqueItems",params:{i: i2, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i2+" are identical)"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
break;
}
indices0[item0] = i2;
}
}
}
else {
const err48 = {instancePath:instancePath+"/requiresAll",schemaPath:"#/properties/requiresAll/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
}
}
else {
const err49 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
validate32.errors = vErrors;
return errors === 0;
}
validate32.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate31(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate31.evaluated;
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
const err5 = {instancePath:instancePath+"/id",schemaPath:"#/properties/id/enum",keyword:"enum",params:{allowedValues: schema50.properties.id.enum},message:"must be equal to one of the allowed values"};
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
if(!pattern4.test(data1)){
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
if(!(validate32(data2[i0], {instancePath:instancePath+"/parts/" + i0,parentData:data2,parentDataProperty:i0,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate32.errors : vErrors.concat(validate32.errors);
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
validate31.errors = vErrors;
return errors === 0;
}
validate31.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema53 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"sourceId":{"type":"string","enum":["E1","E2","E3","E4","E5","E6","E7","E8","NAV"]},"ownerId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"availableWhen":{"$ref":"#/$defs/Predicate"},"bodyRefs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true}},"required":["id","sourceId","ownerId","availableWhen","bodyRefs"],"additionalProperties":false};
const schema54 = {"oneOf":[{"type":"object","properties":{"all":{"type":"array","items":{"$ref":"#/$defs/Predicate"},"maxItems":16}},"required":["all"],"additionalProperties":false},{"type":"object","properties":{"any":{"type":"array","items":{"$ref":"#/$defs/Predicate"},"maxItems":16}},"required":["any"],"additionalProperties":false},{"type":"object","properties":{"not":{"$ref":"#/$defs/Predicate"}},"required":["not"],"additionalProperties":false},{"type":"object","properties":{"test":{"type":"string","enum":["flag","room","local-owner","loop-mode","kit-host","available","exposed","actor-knows","puppet","run-status","certified","premiered","topic","meaning","assistance-displayed"]},"args":{"type":"array","items":{"type":"string"},"maxItems":3}},"required":["test","args"],"additionalProperties":false}]};
const wrapper0 = {validate: validate36};

function validate36(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate36.evaluated;
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
const err17 = {instancePath:instancePath+"/test",schemaPath:"#/oneOf/3/properties/test/enum",keyword:"enum",params:{allowedValues: schema54.oneOf[3].properties.test.enum},message:"must be equal to one of the allowed values"};
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
validate36.errors = vErrors;
evaluated0.props = props1;
return errors === 0;
}
validate36.evaluated = {"dynamicProps":true,"dynamicItems":false};


function validate35(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate35.evaluated;
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
if(!pattern4.test(data0)){
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
const err10 = {instancePath:instancePath+"/sourceId",schemaPath:"#/properties/sourceId/enum",keyword:"enum",params:{allowedValues: schema53.properties.sourceId.enum},message:"must be equal to one of the allowed values"};
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
if(!pattern4.test(data2)){
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
if(!(validate36(data.availableWhen, {instancePath:instancePath+"/availableWhen",parentData:data,parentDataProperty:"availableWhen",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate36.errors : vErrors.concat(validate36.errors);
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
if(!pattern4.test(data5)){
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
validate35.errors = vErrors;
return errors === 0;
}
validate35.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema55 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"ownerId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"copyId":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"room":{"anyOf":[{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]},{"type":"null"}]},"approachOwnerId":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"actionCt":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"grants":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"when":{"$ref":"#/$defs/Predicate"}},"required":["id","ownerId","copyId","room","approachOwnerId","actionCt","grants","when"],"additionalProperties":false};

function validate39(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate39.evaluated;
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
if(!pattern4.test(data0)){
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
if(!pattern4.test(data1)){
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
if(!pattern4.test(data2)){
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
const err21 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema55.properties.room.anyOf[0].enum},message:"must be equal to one of the allowed values"};
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
if(!pattern4.test(data4)){
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
if(!pattern4.test(data5)){
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
if(!pattern4.test(data7)){
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
if(!(validate36(data.when, {instancePath:instancePath+"/when",parentData:data,parentDataProperty:"when",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate36.errors : vErrors.concat(validate36.errors);
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
validate39.errors = vErrors;
return errors === 0;
}
validate39.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema56 = {"type":"object","properties":{"id":{"type":"string","pattern":"^CT\\.[A-Z0-9_.]+$","maxLength":160},"origin":{"type":"string","enum":["F","C","N"]},"text":{"type":"string"},"slots":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string"},"domain":{"type":"string","enum":["room","person","target","tile","position","sourceTitle","detailTitle","time","mode","question","count","childText","details","action"]}},"required":["name","domain"],"additionalProperties":false},"maxItems":16},"when":{"$ref":"#/$defs/Predicate"},"refs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true}},"required":["id","origin","text","slots","when","refs"],"additionalProperties":false};
const pattern28 = new RegExp("^CT\\.[A-Z0-9_.]+$", "u");

function validate42(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate42.evaluated;
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
if(!pattern28.test(data0)){
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
const err11 = {instancePath:instancePath+"/origin",schemaPath:"#/properties/origin/enum",keyword:"enum",params:{allowedValues: schema56.properties.origin.enum},message:"must be equal to one of the allowed values"};
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
const err19 = {instancePath:instancePath+"/slots/" + i0+"/domain",schemaPath:"#/properties/slots/items/properties/domain/enum",keyword:"enum",params:{allowedValues: schema56.properties.slots.items.properties.domain.enum},message:"must be equal to one of the allowed values"};
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
if(!(validate36(data.when, {instancePath:instancePath+"/when",parentData:data,parentDataProperty:"when",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate36.errors : vErrors.concat(validate36.errors);
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
if(!pattern4.test(data9)){
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
validate42.errors = vErrors;
return errors === 0;
}
validate42.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema57 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"actorId":{"type":"string","enum":["ACT.JO","ACT.REMY","ACT.ARI"]},"topic":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"receivedAll":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"when":{"$ref":"#/$defs/Predicate"},"responseCt":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"grants":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"assistanceLevel":{"type":"integer","minimum":0,"maximum":4}},"required":["id","actorId","topic","receivedAll","when","responseCt","grants","assistanceLevel"],"additionalProperties":false};

function validate45(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate45.evaluated;
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
if(!pattern4.test(data0)){
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
const err13 = {instancePath:instancePath+"/actorId",schemaPath:"#/properties/actorId/enum",keyword:"enum",params:{allowedValues: schema57.properties.actorId.enum},message:"must be equal to one of the allowed values"};
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
if(!pattern4.test(data2)){
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
if(!pattern4.test(data4)){
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
if(!(validate36(data.when, {instancePath:instancePath+"/when",parentData:data,parentDataProperty:"when",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate36.errors : vErrors.concat(validate36.errors);
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
if(!pattern4.test(data7)){
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
if(!pattern4.test(data9)){
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
validate45.errors = vErrors;
return errors === 0;
}
validate45.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema59 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"contentCt":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"tag":{"$ref":"#/$defs/InterpretationTag"},"requires":{"$ref":"#/$defs/Predicate"},"referenceOptions":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"introduces":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"level":{"type":"integer","minimum":1,"maximum":4}},"required":["id","contentCt","tag","requires","referenceOptions","introduces","level"],"additionalProperties":false};
const schema60 = {"type":"string","enum":["scope_confusion","unsupported_destination","goal_incomplete","capacity","prerequisite","valid_plan","unclear","off_topic"]};

function validate48(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate48.evaluated;
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
if(!pattern4.test(data0)){
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
if(!pattern4.test(data1)){
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
let data2 = data.tag;
if(typeof data2 !== "string"){
const err14 = {instancePath:instancePath+"/tag",schemaPath:"#/$defs/InterpretationTag/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
if(!((((((((data2 === "scope_confusion") || (data2 === "unsupported_destination")) || (data2 === "goal_incomplete")) || (data2 === "capacity")) || (data2 === "prerequisite")) || (data2 === "valid_plan")) || (data2 === "unclear")) || (data2 === "off_topic"))){
const err15 = {instancePath:instancePath+"/tag",schemaPath:"#/$defs/InterpretationTag/enum",keyword:"enum",params:{allowedValues: schema60.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.requires !== undefined){
if(!(validate36(data.requires, {instancePath:instancePath+"/requires",parentData:data,parentDataProperty:"requires",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate36.errors : vErrors.concat(validate36.errors);
errors = vErrors.length;
}
}
if(data.referenceOptions !== undefined){
let data4 = data.referenceOptions;
if(Array.isArray(data4)){
if(data4.length > 64){
const err16 = {instancePath:instancePath+"/referenceOptions",schemaPath:"#/properties/referenceOptions/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
const len0 = data4.length;
for(let i0=0; i0<len0; i0++){
let data5 = data4[i0];
if(typeof data5 === "string"){
if(func2(data5) > 160){
const err17 = {instancePath:instancePath+"/referenceOptions/" + i0,schemaPath:"#/properties/referenceOptions/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(!pattern4.test(data5)){
const err18 = {instancePath:instancePath+"/referenceOptions/" + i0,schemaPath:"#/properties/referenceOptions/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
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
const err19 = {instancePath:instancePath+"/referenceOptions/" + i0,schemaPath:"#/properties/referenceOptions/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
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
const err20 = {instancePath:instancePath+"/referenceOptions",schemaPath:"#/properties/referenceOptions/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err21 = {instancePath:instancePath+"/referenceOptions",schemaPath:"#/properties/referenceOptions/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.introduces !== undefined){
let data6 = data.introduces;
if(Array.isArray(data6)){
if(data6.length > 64){
const err22 = {instancePath:instancePath+"/introduces",schemaPath:"#/properties/introduces/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
const len1 = data6.length;
for(let i2=0; i2<len1; i2++){
let data7 = data6[i2];
if(typeof data7 === "string"){
if(func2(data7) > 160){
const err23 = {instancePath:instancePath+"/introduces/" + i2,schemaPath:"#/properties/introduces/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
if(!pattern4.test(data7)){
const err24 = {instancePath:instancePath+"/introduces/" + i2,schemaPath:"#/properties/introduces/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
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
const err25 = {instancePath:instancePath+"/introduces/" + i2,schemaPath:"#/properties/introduces/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
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
const err26 = {instancePath:instancePath+"/introduces",schemaPath:"#/properties/introduces/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
break;
}
indices1[item1] = i3;
}
}
}
else {
const err27 = {instancePath:instancePath+"/introduces",schemaPath:"#/properties/introduces/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
if(data.level !== undefined){
let data8 = data.level;
if(!(((typeof data8 == "number") && (!(data8 % 1) && !isNaN(data8))) && (isFinite(data8)))){
const err28 = {instancePath:instancePath+"/level",schemaPath:"#/properties/level/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
if((typeof data8 == "number") && (isFinite(data8))){
if(data8 > 4 || isNaN(data8)){
const err29 = {instancePath:instancePath+"/level",schemaPath:"#/properties/level/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4},message:"must be <= 4"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
if(data8 < 1 || isNaN(data8)){
const err30 = {instancePath:instancePath+"/level",schemaPath:"#/properties/level/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
}
}
else {
const err31 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
validate48.errors = vErrors;
return errors === 0;
}
validate48.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema61 = {"type":"object","properties":{"slot":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"ownerId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"role":{"type":"string","enum":["background","foreground","actor","prop","puppet","ui","audio"]},"logicalBounds":{"$ref":"#/$defs/Rect"},"anchor":{"$ref":"#/$defs/UnitAnchor"},"critical":{"type":"boolean"},"manifestAssetId":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]}},"required":["slot","ownerId","role","logicalBounds","anchor","critical","manifestAssetId"],"additionalProperties":false};
const schema63 = {"type":"array","prefixItems":[{"type":"number","minimum":0,"maximum":1},{"type":"number","minimum":0,"maximum":1}],"items":false,"minItems":2,"maxItems":2};

function validate51(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate51.evaluated;
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
if(!pattern4.test(data0)){
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
if(!pattern4.test(data1)){
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
const err15 = {instancePath:instancePath+"/role",schemaPath:"#/properties/role/enum",keyword:"enum",params:{allowedValues: schema61.properties.role.enum},message:"must be equal to one of the allowed values"};
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
let data3 = data.logicalBounds;
if(Array.isArray(data3)){
if(data3.length > 4){
const err16 = {instancePath:instancePath+"/logicalBounds",schemaPath:"#/$defs/Rect/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
if(data3.length < 4){
const err17 = {instancePath:instancePath+"/logicalBounds",schemaPath:"#/$defs/Rect/minItems",keyword:"minItems",params:{limit: 4},message:"must NOT have fewer than 4 items"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
const len0 = data3.length;
if(len0 > 0){
let data4 = data3[0];
if(!((typeof data4 == "number") && (isFinite(data4)))){
const err18 = {instancePath:instancePath+"/logicalBounds/0",schemaPath:"#/$defs/Rect/prefixItems/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(len0 > 1){
let data5 = data3[1];
if(!((typeof data5 == "number") && (isFinite(data5)))){
const err19 = {instancePath:instancePath+"/logicalBounds/1",schemaPath:"#/$defs/Rect/prefixItems/1/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(len0 > 2){
let data6 = data3[2];
if(!((typeof data6 == "number") && (isFinite(data6)))){
const err20 = {instancePath:instancePath+"/logicalBounds/2",schemaPath:"#/$defs/Rect/prefixItems/2/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
if(len0 > 3){
let data7 = data3[3];
if(!((typeof data7 == "number") && (isFinite(data7)))){
const err21 = {instancePath:instancePath+"/logicalBounds/3",schemaPath:"#/$defs/Rect/prefixItems/3/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
const len1 = data3.length;
if(!(len1 <= 4)){
const err22 = {instancePath:instancePath+"/logicalBounds",schemaPath:"#/$defs/Rect/items",keyword:"items",params:{limit: 4},message:"must NOT have more than 4 items"};
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
const err23 = {instancePath:instancePath+"/logicalBounds",schemaPath:"#/$defs/Rect/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data.anchor !== undefined){
let data8 = data.anchor;
if(Array.isArray(data8)){
if(data8.length > 2){
const err24 = {instancePath:instancePath+"/anchor",schemaPath:"#/$defs/UnitAnchor/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
if(data8.length < 2){
const err25 = {instancePath:instancePath+"/anchor",schemaPath:"#/$defs/UnitAnchor/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
const len2 = data8.length;
if(len2 > 0){
let data9 = data8[0];
if((typeof data9 == "number") && (isFinite(data9))){
if(data9 > 1 || isNaN(data9)){
const err26 = {instancePath:instancePath+"/anchor/0",schemaPath:"#/$defs/UnitAnchor/prefixItems/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
if(data9 < 0 || isNaN(data9)){
const err27 = {instancePath:instancePath+"/anchor/0",schemaPath:"#/$defs/UnitAnchor/prefixItems/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err28 = {instancePath:instancePath+"/anchor/0",schemaPath:"#/$defs/UnitAnchor/prefixItems/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(len2 > 1){
let data10 = data8[1];
if((typeof data10 == "number") && (isFinite(data10))){
if(data10 > 1 || isNaN(data10)){
const err29 = {instancePath:instancePath+"/anchor/1",schemaPath:"#/$defs/UnitAnchor/prefixItems/1/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
if(data10 < 0 || isNaN(data10)){
const err30 = {instancePath:instancePath+"/anchor/1",schemaPath:"#/$defs/UnitAnchor/prefixItems/1/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err31 = {instancePath:instancePath+"/anchor/1",schemaPath:"#/$defs/UnitAnchor/prefixItems/1/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
}
const len3 = data8.length;
if(!(len3 <= 2)){
const err32 = {instancePath:instancePath+"/anchor",schemaPath:"#/$defs/UnitAnchor/items",keyword:"items",params:{limit: 2},message:"must NOT have more than 2 items"};
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
const err33 = {instancePath:instancePath+"/anchor",schemaPath:"#/$defs/UnitAnchor/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
if(data.critical !== undefined){
if(typeof data.critical !== "boolean"){
const err34 = {instancePath:instancePath+"/critical",schemaPath:"#/properties/critical/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
if(data.manifestAssetId !== undefined){
let data12 = data.manifestAssetId;
const _errs29 = errors;
let valid5 = false;
const _errs30 = errors;
if(typeof data12 === "string"){
if(func2(data12) > 160){
const err35 = {instancePath:instancePath+"/manifestAssetId",schemaPath:"#/properties/manifestAssetId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
if(!pattern4.test(data12)){
const err36 = {instancePath:instancePath+"/manifestAssetId",schemaPath:"#/properties/manifestAssetId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
else {
const err37 = {instancePath:instancePath+"/manifestAssetId",schemaPath:"#/properties/manifestAssetId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
var _valid0 = _errs30 === errors;
valid5 = valid5 || _valid0;
const _errs32 = errors;
if(data12 !== null){
const err38 = {instancePath:instancePath+"/manifestAssetId",schemaPath:"#/properties/manifestAssetId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
var _valid0 = _errs32 === errors;
valid5 = valid5 || _valid0;
if(!valid5){
const err39 = {instancePath:instancePath+"/manifestAssetId",schemaPath:"#/properties/manifestAssetId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
else {
errors = _errs29;
if(vErrors !== null){
if(_errs29){
vErrors.length = _errs29;
}
else {
vErrors = null;
}
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
validate51.errors = vErrors;
return errors === 0;
}
validate51.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate90(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate90.evaluated;
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
if(!(func1.call(schema33.properties, key0))){
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
let data1 = data.identity;
if(data1 && typeof data1 == "object" && !Array.isArray(data1)){
if(data1.caseId === undefined){
const err17 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "caseId"},message:"must have required property '"+"caseId"+"'"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(data1.contentVersion === undefined){
const err18 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "contentVersion"},message:"must have required property '"+"contentVersion"+"'"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if(data1.contentRevision === undefined){
const err19 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "contentRevision"},message:"must have required property '"+"contentRevision"+"'"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
for(const key1 in data1){
if(!(((key1 === "caseId") || (key1 === "contentVersion")) || (key1 === "contentRevision"))){
const err20 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
if(data1.caseId !== undefined){
if("sparkfest-little-bridge-001" !== data1.caseId){
const err21 = {instancePath:instancePath+"/identity/caseId",schemaPath:"#/$defs/Identity/properties/caseId/const",keyword:"const",params:{allowedValue: "sparkfest-little-bridge-001"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data1.contentVersion !== undefined){
if(3 !== data1.contentVersion){
const err22 = {instancePath:instancePath+"/identity/contentVersion",schemaPath:"#/$defs/Identity/properties/contentVersion/const",keyword:"const",params:{allowedValue: 3},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
if(data1.contentRevision !== undefined){
if(1 !== data1.contentRevision){
const err23 = {instancePath:instancePath+"/identity/contentRevision",schemaPath:"#/$defs/Identity/properties/contentRevision/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
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
else {
const err24 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
if(data.completeness !== undefined){
let data5 = data.completeness;
if(typeof data5 !== "string"){
const err25 = {instancePath:instancePath+"/completeness",schemaPath:"#/properties/completeness/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
if(!((data5 === "full") || (data5 === "example-fragment"))){
const err26 = {instancePath:instancePath+"/completeness",schemaPath:"#/properties/completeness/enum",keyword:"enum",params:{allowedValues: schema33.properties.completeness.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
if(data.rooms !== undefined){
let data6 = data.rooms;
if(Array.isArray(data6)){
if(data6.length > 4){
const err27 = {instancePath:instancePath+"/rooms",schemaPath:"#/properties/rooms/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
const len0 = data6.length;
for(let i0=0; i0<len0; i0++){
if(!(validate23(data6[i0], {instancePath:instancePath+"/rooms/" + i0,parentData:data6,parentDataProperty:i0,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate23.errors : vErrors.concat(validate23.errors);
errors = vErrors.length;
}
}
}
else {
const err28 = {instancePath:instancePath+"/rooms",schemaPath:"#/properties/rooms/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data.objects !== undefined){
let data8 = data.objects;
if(Array.isArray(data8)){
if(data8.length > 256){
const err29 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/maxItems",keyword:"maxItems",params:{limit: 256},message:"must NOT have more than 256 items"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
const len1 = data8.length;
for(let i1=0; i1<len1; i1++){
if(!(validate25(data8[i1], {instancePath:instancePath+"/objects/" + i1,parentData:data8,parentDataProperty:i1,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate25.errors : vErrors.concat(validate25.errors);
errors = vErrors.length;
}
}
}
else {
const err30 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data.actors !== undefined){
let data10 = data.actors;
if(Array.isArray(data10)){
if(data10.length > 5){
const err31 = {instancePath:instancePath+"/actors",schemaPath:"#/properties/actors/maxItems",keyword:"maxItems",params:{limit: 5},message:"must NOT have more than 5 items"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
const len2 = data10.length;
for(let i2=0; i2<len2; i2++){
if(!(validate27(data10[i2], {instancePath:instancePath+"/actors/" + i2,parentData:data10,parentDataProperty:i2,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate27.errors : vErrors.concat(validate27.errors);
errors = vErrors.length;
}
}
}
else {
const err32 = {instancePath:instancePath+"/actors",schemaPath:"#/properties/actors/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
if(data.doors !== undefined){
let data12 = data.doors;
if(Array.isArray(data12)){
if(data12.length > 8){
const err33 = {instancePath:instancePath+"/doors",schemaPath:"#/properties/doors/maxItems",keyword:"maxItems",params:{limit: 8},message:"must NOT have more than 8 items"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
const len3 = data12.length;
for(let i3=0; i3<len3; i3++){
if(!(validate29(data12[i3], {instancePath:instancePath+"/doors/" + i3,parentData:data12,parentDataProperty:i3,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate29.errors : vErrors.concat(validate29.errors);
errors = vErrors.length;
}
}
}
else {
const err34 = {instancePath:instancePath+"/doors",schemaPath:"#/properties/doors/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
if(data.sources !== undefined){
let data14 = data.sources;
if(Array.isArray(data14)){
if(data14.length > 9){
const err35 = {instancePath:instancePath+"/sources",schemaPath:"#/properties/sources/maxItems",keyword:"maxItems",params:{limit: 9},message:"must NOT have more than 9 items"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
const len4 = data14.length;
for(let i4=0; i4<len4; i4++){
if(!(validate31(data14[i4], {instancePath:instancePath+"/sources/" + i4,parentData:data14,parentDataProperty:i4,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate31.errors : vErrors.concat(validate31.errors);
errors = vErrors.length;
}
}
}
else {
const err36 = {instancePath:instancePath+"/sources",schemaPath:"#/properties/sources/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
if(data.copies !== undefined){
let data16 = data.copies;
if(Array.isArray(data16)){
if(data16.length > 64){
const err37 = {instancePath:instancePath+"/copies",schemaPath:"#/properties/copies/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
const len5 = data16.length;
for(let i5=0; i5<len5; i5++){
if(!(validate35(data16[i5], {instancePath:instancePath+"/copies/" + i5,parentData:data16,parentDataProperty:i5,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate35.errors : vErrors.concat(validate35.errors);
errors = vErrors.length;
}
}
}
else {
const err38 = {instancePath:instancePath+"/copies",schemaPath:"#/properties/copies/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
if(data.accesses !== undefined){
let data18 = data.accesses;
if(Array.isArray(data18)){
if(data18.length > 256){
const err39 = {instancePath:instancePath+"/accesses",schemaPath:"#/properties/accesses/maxItems",keyword:"maxItems",params:{limit: 256},message:"must NOT have more than 256 items"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
const len6 = data18.length;
for(let i6=0; i6<len6; i6++){
if(!(validate39(data18[i6], {instancePath:instancePath+"/accesses/" + i6,parentData:data18,parentDataProperty:i6,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate39.errors : vErrors.concat(validate39.errors);
errors = vErrors.length;
}
}
}
else {
const err40 = {instancePath:instancePath+"/accesses",schemaPath:"#/properties/accesses/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
if(data.texts !== undefined){
let data20 = data.texts;
if(Array.isArray(data20)){
if(data20.length > 1024){
const err41 = {instancePath:instancePath+"/texts",schemaPath:"#/properties/texts/maxItems",keyword:"maxItems",params:{limit: 1024},message:"must NOT have more than 1024 items"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
const len7 = data20.length;
for(let i7=0; i7<len7; i7++){
if(!(validate42(data20[i7], {instancePath:instancePath+"/texts/" + i7,parentData:data20,parentDataProperty:i7,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate42.errors : vErrors.concat(validate42.errors);
errors = vErrors.length;
}
}
}
else {
const err42 = {instancePath:instancePath+"/texts",schemaPath:"#/properties/texts/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
}
if(data.npcBranches !== undefined){
let data22 = data.npcBranches;
if(Array.isArray(data22)){
if(data22.length > 128){
const err43 = {instancePath:instancePath+"/npcBranches",schemaPath:"#/properties/npcBranches/maxItems",keyword:"maxItems",params:{limit: 128},message:"must NOT have more than 128 items"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
const len8 = data22.length;
for(let i8=0; i8<len8; i8++){
if(!(validate45(data22[i8], {instancePath:instancePath+"/npcBranches/" + i8,parentData:data22,parentDataProperty:i8,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate45.errors : vErrors.concat(validate45.errors);
errors = vErrors.length;
}
}
}
else {
const err44 = {instancePath:instancePath+"/npcBranches",schemaPath:"#/properties/npcBranches/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
}
if(data.tiles !== undefined){
let data24 = data.tiles;
if(Array.isArray(data24)){
if(data24.length > 4){
const err45 = {instancePath:instancePath+"/tiles",schemaPath:"#/properties/tiles/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
const len9 = data24.length;
for(let i9=0; i9<len9; i9++){
let data25 = data24[i9];
if(data25 && typeof data25 == "object" && !Array.isArray(data25)){
if(data25.id === undefined){
const err46 = {instancePath:instancePath+"/tiles/" + i9,schemaPath:"#/$defs/Tile/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
if(data25.labelCt === undefined){
const err47 = {instancePath:instancePath+"/tiles/" + i9,schemaPath:"#/$defs/Tile/required",keyword:"required",params:{missingProperty: "labelCt"},message:"must have required property '"+"labelCt"+"'"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
if(data25.descriptionCt === undefined){
const err48 = {instancePath:instancePath+"/tiles/" + i9,schemaPath:"#/$defs/Tile/required",keyword:"required",params:{missingProperty: "descriptionCt"},message:"must have required property '"+"descriptionCt"+"'"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
if(data25.storageCell === undefined){
const err49 = {instancePath:instancePath+"/tiles/" + i9,schemaPath:"#/$defs/Tile/required",keyword:"required",params:{missingProperty: "storageCell"},message:"must have required property '"+"storageCell"+"'"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
if(data25.rule === undefined){
const err50 = {instancePath:instancePath+"/tiles/" + i9,schemaPath:"#/$defs/Tile/required",keyword:"required",params:{missingProperty: "rule"},message:"must have required property '"+"rule"+"'"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
for(const key2 in data25){
if(!(((((key2 === "id") || (key2 === "labelCt")) || (key2 === "descriptionCt")) || (key2 === "storageCell")) || (key2 === "rule"))){
const err51 = {instancePath:instancePath+"/tiles/" + i9,schemaPath:"#/$defs/Tile/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
}
if(data25.id !== undefined){
let data26 = data25.id;
if(typeof data26 !== "string"){
const err52 = {instancePath:instancePath+"/tiles/" + i9+"/id",schemaPath:"#/$defs/Tile/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err52];
}
else {
vErrors.push(err52);
}
errors++;
}
if(!((((data26 === "TILE.FERRY") || (data26 === "TILE.BRIDGE")) || (data26 === "TILE.PLANT")) || (data26 === "TILE.BLOOM"))){
const err53 = {instancePath:instancePath+"/tiles/" + i9+"/id",schemaPath:"#/$defs/Tile/properties/id/enum",keyword:"enum",params:{allowedValues: schema58.properties.id.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
}
if(data25.labelCt !== undefined){
let data27 = data25.labelCt;
if(typeof data27 === "string"){
if(func2(data27) > 160){
const err54 = {instancePath:instancePath+"/tiles/" + i9+"/labelCt",schemaPath:"#/$defs/Tile/properties/labelCt/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
}
if(!pattern4.test(data27)){
const err55 = {instancePath:instancePath+"/tiles/" + i9+"/labelCt",schemaPath:"#/$defs/Tile/properties/labelCt/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err55];
}
else {
vErrors.push(err55);
}
errors++;
}
}
else {
const err56 = {instancePath:instancePath+"/tiles/" + i9+"/labelCt",schemaPath:"#/$defs/Tile/properties/labelCt/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err56];
}
else {
vErrors.push(err56);
}
errors++;
}
}
if(data25.descriptionCt !== undefined){
let data28 = data25.descriptionCt;
if(typeof data28 === "string"){
if(func2(data28) > 160){
const err57 = {instancePath:instancePath+"/tiles/" + i9+"/descriptionCt",schemaPath:"#/$defs/Tile/properties/descriptionCt/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err57];
}
else {
vErrors.push(err57);
}
errors++;
}
if(!pattern4.test(data28)){
const err58 = {instancePath:instancePath+"/tiles/" + i9+"/descriptionCt",schemaPath:"#/$defs/Tile/properties/descriptionCt/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err58];
}
else {
vErrors.push(err58);
}
errors++;
}
}
else {
const err59 = {instancePath:instancePath+"/tiles/" + i9+"/descriptionCt",schemaPath:"#/$defs/Tile/properties/descriptionCt/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err59];
}
else {
vErrors.push(err59);
}
errors++;
}
}
if(data25.storageCell !== undefined){
let data29 = data25.storageCell;
if(typeof data29 !== "string"){
const err60 = {instancePath:instancePath+"/tiles/" + i9+"/storageCell",schemaPath:"#/$defs/Tile/properties/storageCell/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err60];
}
else {
vErrors.push(err60);
}
errors++;
}
if(!((((data29 === "upper-right") || (data29 === "lower-right")) || (data29 === "lower-left")) || (data29 === "upper-left"))){
const err61 = {instancePath:instancePath+"/tiles/" + i9+"/storageCell",schemaPath:"#/$defs/Tile/properties/storageCell/enum",keyword:"enum",params:{allowedValues: schema58.properties.storageCell.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err61];
}
else {
vErrors.push(err61);
}
errors++;
}
}
if(data25.rule !== undefined){
let data30 = data25.rule;
if(typeof data30 !== "string"){
const err62 = {instancePath:instancePath+"/tiles/" + i9+"/rule",schemaPath:"#/$defs/Tile/properties/rule/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err62];
}
else {
vErrors.push(err62);
}
errors++;
}
if(!((((data30 === "seed-ferry") || (data30 === "joined-crossing")) || (data30 === "joint-planting")) || (data30 === "rooted-light"))){
const err63 = {instancePath:instancePath+"/tiles/" + i9+"/rule",schemaPath:"#/$defs/Tile/properties/rule/enum",keyword:"enum",params:{allowedValues: schema58.properties.rule.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err63];
}
else {
vErrors.push(err63);
}
errors++;
}
}
}
else {
const err64 = {instancePath:instancePath+"/tiles/" + i9,schemaPath:"#/$defs/Tile/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err64];
}
else {
vErrors.push(err64);
}
errors++;
}
}
}
else {
const err65 = {instancePath:instancePath+"/tiles",schemaPath:"#/properties/tiles/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err65];
}
else {
vErrors.push(err65);
}
errors++;
}
}
if(data.coachingMoves !== undefined){
let data31 = data.coachingMoves;
if(Array.isArray(data31)){
if(data31.length > 64){
const err66 = {instancePath:instancePath+"/coachingMoves",schemaPath:"#/properties/coachingMoves/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err66];
}
else {
vErrors.push(err66);
}
errors++;
}
const len10 = data31.length;
for(let i10=0; i10<len10; i10++){
if(!(validate48(data31[i10], {instancePath:instancePath+"/coachingMoves/" + i10,parentData:data31,parentDataProperty:i10,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate48.errors : vErrors.concat(validate48.errors);
errors = vErrors.length;
}
}
}
else {
const err67 = {instancePath:instancePath+"/coachingMoves",schemaPath:"#/properties/coachingMoves/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err67];
}
else {
vErrors.push(err67);
}
errors++;
}
}
if(data.assetUses !== undefined){
let data33 = data.assetUses;
if(Array.isArray(data33)){
if(data33.length > 512){
const err68 = {instancePath:instancePath+"/assetUses",schemaPath:"#/properties/assetUses/maxItems",keyword:"maxItems",params:{limit: 512},message:"must NOT have more than 512 items"};
if(vErrors === null){
vErrors = [err68];
}
else {
vErrors.push(err68);
}
errors++;
}
const len11 = data33.length;
for(let i11=0; i11<len11; i11++){
if(!(validate51(data33[i11], {instancePath:instancePath+"/assetUses/" + i11,parentData:data33,parentDataProperty:i11,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate51.errors : vErrors.concat(validate51.errors);
errors = vErrors.length;
}
}
}
else {
const err69 = {instancePath:instancePath+"/assetUses",schemaPath:"#/properties/assetUses/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err69];
}
else {
vErrors.push(err69);
}
errors++;
}
}
}
else {
const err70 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err70];
}
else {
vErrors.push(err70);
}
errors++;
}
validate90.errors = vErrors;
return errors === 0;
}
validate90.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate20(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:evidence-quest:AuthoredContent" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate20.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(!(validate90(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate90.errors : vErrors.concat(validate90.errors);
errors = vErrors.length;
}
validate20.errors = vErrors;
return errors === 0;
}
validate20.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const validateCaseSnapshot = validate103;
const schema112 = {"$id":"urn:evidence-quest:CaseSnapshot","$ref":"https://evidence-quest.invalid/contracts/v1#/$defs/CaseSnapshot"};
const schema64 = {"type":"object","properties":{"contractKind":{"const":"CaseSnapshot"},"identity":{"$ref":"#/$defs/Identity"},"state":{"$ref":"#/$defs/CaseState"}},"required":["contractKind","identity","state"],"additionalProperties":false};
const schema66 = {"type":"object","properties":{"caseRunId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"lastObservationSeq":{"type":"integer","minimum":0,"maximum":9007199254740991},"physical":{"$ref":"#/$defs/Physical"},"grants":{"type":"array","items":{"$ref":"#/$defs/Grant"}},"exposures":{"type":"array","items":{"$ref":"#/$defs/Exposure"}},"selectedLead":{"anyOf":[{"type":"string","enum":["where-loop","cancellation","recording","story-plan"]},{"type":"null"}]},"comparisons":{"type":"array","items":{"$ref":"#/$defs/Comparison"}},"drafts":{"type":"array","items":{"$ref":"#/$defs/Draft"},"maxItems":5},"records":{"type":"array","items":{"$ref":"#/$defs/Record"}},"npcReceived":{"type":"array","items":{"type":"object","properties":{"actorId":{"type":"string","enum":["ACT.JO","ACT.REMY","ACT.ARI"]},"refs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"deliveryRecordIds":{"type":"array","items":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36}}},"required":["actorId","refs","deliveryRecordIds"],"additionalProperties":false},"maxItems":3},"playback":{"anyOf":[{"$ref":"#/$defs/Run"},{"type":"null"}]},"runHistory":{"type":"array","items":{"$ref":"#/$defs/Run"}},"certificate":{"anyOf":[{"$ref":"#/$defs/Certificate"},{"type":"null"}]},"premiere":{"anyOf":[{"$ref":"#/$defs/Premiere"},{"type":"null"}]},"observations":{"type":"array","items":{"$ref":"#/$defs/Observation"}},"readerResume":{"anyOf":[{"$ref":"#/$defs/ReaderResume"},{"type":"null"}]},"worldReturn":{"$ref":"#/$defs/ReturnOwner"},"historyUncertain":{"type":"boolean"},"guidance":{"type":"object","properties":{"openingDismissed":{"type":"boolean"},"movementDismissed":{"type":"boolean"},"ariInvitationDismissed":{"type":"boolean"}},"required":["openingDismissed","movementDismissed","ariInvitationDismissed"],"additionalProperties":false},"visitedRooms":{"type":"array","items":{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]}},"encounteredActors":{"type":"array","items":{"type":"string","enum":["ACT.JO","ACT.REMY","ACT.ARI","ACT.LOOP"]}},"coachingHistory":{"type":"array","items":{"type":"object","properties":{"requestId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"submittedRecordId":{"anyOf":[{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},{"type":"null"}]},"context":{"$ref":"#/$defs/Context"},"contentIds":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"selection":{"anyOf":[{"$ref":"#/$defs/CoachSelection"},{"type":"null"}]},"origin":{"type":"string","enum":["live-selection","authored-topic","authored-fallback","authored-direct"]},"displayedSeq":{"anyOf":[{"type":"integer","minimum":0},{"type":"null"}]}},"required":["requestId","submittedRecordId","context","contentIds","selection","origin","displayedSeq"],"additionalProperties":false}}},"required":["caseRunId","revision","lastObservationSeq","physical","grants","exposures","selectedLead","comparisons","drafts","records","npcReceived","playback","runHistory","certificate","premiere","observations","readerResume","worldReturn","historyUncertain","guidance","visitedRooms","encounteredActors","coachingHistory"],"additionalProperties":false};
const schema71 = {"type":"object","properties":{"sourceId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"refs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"viaAccessId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"seq":{"type":"integer","minimum":0,"maximum":9007199254740991}},"required":["sourceId","refs","viaAccessId","seq"],"additionalProperties":false};
const schema74 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"leftRef":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"rightRef":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"relationship":{"anyOf":[{"type":"string","enum":["supports","conflicts-with","happened-before"]},{"type":"null"}]},"note":{"type":"string"},"recordedSeq":{"anyOf":[{"type":"integer","minimum":0,"maximum":9007199254740991},{"type":"null"}]}},"required":["id","leftRef","rightRef","relationship","note","recordedSeq"],"additionalProperties":false};
const schema75 = {"type":"object","properties":{"id":{"type":"string","enum":["private","search-plan","story-plan","coach-search","coach-story"]},"text":{"type":"string"},"selectedRefs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":2,"uniqueItems":true},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991}},"required":["id","text","selectedRefs","revision"],"additionalProperties":false};
const schema84 = {"type":"object","properties":{"runId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"arrangementRevision":{"type":"integer","minimum":0,"maximum":9007199254740991}},"required":["runId","arrangementRevision"],"additionalProperties":false};
const schema90 = {"type":"object","properties":{"sourceId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"componentRef":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"accessId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"scrollFraction":{"type":"number","minimum":0,"maximum":1},"selectedRefs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"frame":{"anyOf":[{"type":"integer","minimum":1,"maximum":3},{"type":"null"}]}},"required":["sourceId","componentRef","accessId","scrollFraction","selectedRefs","frame"],"additionalProperties":false};
const schema91 = {"type":"object","properties":{"ownerId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"actionCtId":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]}},"required":["ownerId","actionCtId"],"additionalProperties":false};
const pattern44 = new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$", "u");
const schema67 = {"type":"object","properties":{"room":{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]},"avatar":{"$ref":"#/$defs/Point"},"facing":{"type":"string","enum":["up","down","left","right"]},"loop":{"type":"object","properties":{"room":{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]},"feet":{"$ref":"#/$defs/Point"},"mode":{"type":"string","enum":["standby","following","docked","projecting"]}},"required":["room","feet","mode"],"additionalProperties":false},"objects":{"type":"object","properties":{"modelTabTried":{"type":"boolean"},"briefOpen":{"type":"boolean"},"storyNoteOpen":{"type":"boolean"},"filmingRequestOpen":{"type":"boolean"},"noticeFlat":{"type":"boolean"},"dockFlapOpen":{"type":"boolean"},"rackOpened":{"type":"boolean"},"previewTried":{"type":"boolean"},"toastRevealed":{"type":"boolean"}},"required":["modelTabTried","briefOpen","storyNoteOpen","filmingRequestOpen","noticeFlat","dockFlapOpen","rackOpened","previewTried","toastRevealed"],"additionalProperties":false},"caddyHost":{"type":"string","enum":["MD.RACK.STATION","ACT.PLAYER","ST.RACK.BAY"]},"order":{"$ref":"#/$defs/Order"},"arrangementRevision":{"type":"integer","minimum":0,"maximum":9007199254740991}},"required":["room","avatar","facing","loop","objects","caddyHost","order","arrangementRevision"],"additionalProperties":false};
const schema70 = {"type":"array","items":{"type":"string","enum":["TILE.FERRY","TILE.BRIDGE","TILE.PLANT","TILE.BLOOM"]},"maxItems":4,"uniqueItems":true};

function validate56(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate56.evaluated;
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
const err10 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/enum",keyword:"enum",params:{allowedValues: schema67.properties.room.enum},message:"must be equal to one of the allowed values"};
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
let data1 = data.avatar;
if(Array.isArray(data1)){
if(data1.length > 2){
const err11 = {instancePath:instancePath+"/avatar",schemaPath:"#/$defs/Point/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(data1.length < 2){
const err12 = {instancePath:instancePath+"/avatar",schemaPath:"#/$defs/Point/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
const len0 = data1.length;
if(len0 > 0){
let data2 = data1[0];
if((typeof data2 == "number") && (isFinite(data2))){
if(data2 > 120 || isNaN(data2)){
const err13 = {instancePath:instancePath+"/avatar/0",schemaPath:"#/$defs/Point/prefixItems/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 120},message:"must be <= 120"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(data2 < 0 || isNaN(data2)){
const err14 = {instancePath:instancePath+"/avatar/0",schemaPath:"#/$defs/Point/prefixItems/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err15 = {instancePath:instancePath+"/avatar/0",schemaPath:"#/$defs/Point/prefixItems/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(len0 > 1){
let data3 = data1[1];
if((typeof data3 == "number") && (isFinite(data3))){
if(data3 > 80 || isNaN(data3)){
const err16 = {instancePath:instancePath+"/avatar/1",schemaPath:"#/$defs/Point/prefixItems/1/maximum",keyword:"maximum",params:{comparison: "<=", limit: 80},message:"must be <= 80"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
if(data3 < 0 || isNaN(data3)){
const err17 = {instancePath:instancePath+"/avatar/1",schemaPath:"#/$defs/Point/prefixItems/1/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err18 = {instancePath:instancePath+"/avatar/1",schemaPath:"#/$defs/Point/prefixItems/1/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
const len1 = data1.length;
if(!(len1 <= 2)){
const err19 = {instancePath:instancePath+"/avatar",schemaPath:"#/$defs/Point/items",keyword:"items",params:{limit: 2},message:"must NOT have more than 2 items"};
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
const err20 = {instancePath:instancePath+"/avatar",schemaPath:"#/$defs/Point/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
if(data.facing !== undefined){
let data4 = data.facing;
if(typeof data4 !== "string"){
const err21 = {instancePath:instancePath+"/facing",schemaPath:"#/properties/facing/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
if(!((((data4 === "up") || (data4 === "down")) || (data4 === "left")) || (data4 === "right"))){
const err22 = {instancePath:instancePath+"/facing",schemaPath:"#/properties/facing/enum",keyword:"enum",params:{allowedValues: schema67.properties.facing.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
}
if(data.loop !== undefined){
let data5 = data.loop;
if(data5 && typeof data5 == "object" && !Array.isArray(data5)){
if(data5.room === undefined){
const err23 = {instancePath:instancePath+"/loop",schemaPath:"#/properties/loop/required",keyword:"required",params:{missingProperty: "room"},message:"must have required property '"+"room"+"'"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
if(data5.feet === undefined){
const err24 = {instancePath:instancePath+"/loop",schemaPath:"#/properties/loop/required",keyword:"required",params:{missingProperty: "feet"},message:"must have required property '"+"feet"+"'"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
if(data5.mode === undefined){
const err25 = {instancePath:instancePath+"/loop",schemaPath:"#/properties/loop/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
for(const key1 in data5){
if(!(((key1 === "room") || (key1 === "feet")) || (key1 === "mode"))){
const err26 = {instancePath:instancePath+"/loop",schemaPath:"#/properties/loop/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
if(data5.room !== undefined){
let data6 = data5.room;
if(typeof data6 !== "string"){
const err27 = {instancePath:instancePath+"/loop/room",schemaPath:"#/properties/loop/properties/room/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
if(!((((data6 === "SC.ST") || (data6 === "SC.CY")) || (data6 === "SC.WK")) || (data6 === "SC.MD"))){
const err28 = {instancePath:instancePath+"/loop/room",schemaPath:"#/properties/loop/properties/room/enum",keyword:"enum",params:{allowedValues: schema67.properties.loop.properties.room.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data5.feet !== undefined){
let data7 = data5.feet;
if(Array.isArray(data7)){
if(data7.length > 2){
const err29 = {instancePath:instancePath+"/loop/feet",schemaPath:"#/$defs/Point/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
if(data7.length < 2){
const err30 = {instancePath:instancePath+"/loop/feet",schemaPath:"#/$defs/Point/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
const len2 = data7.length;
if(len2 > 0){
let data8 = data7[0];
if((typeof data8 == "number") && (isFinite(data8))){
if(data8 > 120 || isNaN(data8)){
const err31 = {instancePath:instancePath+"/loop/feet/0",schemaPath:"#/$defs/Point/prefixItems/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 120},message:"must be <= 120"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
if(data8 < 0 || isNaN(data8)){
const err32 = {instancePath:instancePath+"/loop/feet/0",schemaPath:"#/$defs/Point/prefixItems/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err33 = {instancePath:instancePath+"/loop/feet/0",schemaPath:"#/$defs/Point/prefixItems/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
}
if(len2 > 1){
let data9 = data7[1];
if((typeof data9 == "number") && (isFinite(data9))){
if(data9 > 80 || isNaN(data9)){
const err34 = {instancePath:instancePath+"/loop/feet/1",schemaPath:"#/$defs/Point/prefixItems/1/maximum",keyword:"maximum",params:{comparison: "<=", limit: 80},message:"must be <= 80"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
if(data9 < 0 || isNaN(data9)){
const err35 = {instancePath:instancePath+"/loop/feet/1",schemaPath:"#/$defs/Point/prefixItems/1/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err36 = {instancePath:instancePath+"/loop/feet/1",schemaPath:"#/$defs/Point/prefixItems/1/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
const len3 = data7.length;
if(!(len3 <= 2)){
const err37 = {instancePath:instancePath+"/loop/feet",schemaPath:"#/$defs/Point/items",keyword:"items",params:{limit: 2},message:"must NOT have more than 2 items"};
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
const err38 = {instancePath:instancePath+"/loop/feet",schemaPath:"#/$defs/Point/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
if(data5.mode !== undefined){
let data10 = data5.mode;
if(typeof data10 !== "string"){
const err39 = {instancePath:instancePath+"/loop/mode",schemaPath:"#/properties/loop/properties/mode/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
if(!((((data10 === "standby") || (data10 === "following")) || (data10 === "docked")) || (data10 === "projecting"))){
const err40 = {instancePath:instancePath+"/loop/mode",schemaPath:"#/properties/loop/properties/mode/enum",keyword:"enum",params:{allowedValues: schema67.properties.loop.properties.mode.enum},message:"must be equal to one of the allowed values"};
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
const err41 = {instancePath:instancePath+"/loop",schemaPath:"#/properties/loop/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
if(data.objects !== undefined){
let data11 = data.objects;
if(data11 && typeof data11 == "object" && !Array.isArray(data11)){
if(data11.modelTabTried === undefined){
const err42 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/required",keyword:"required",params:{missingProperty: "modelTabTried"},message:"must have required property '"+"modelTabTried"+"'"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
if(data11.briefOpen === undefined){
const err43 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/required",keyword:"required",params:{missingProperty: "briefOpen"},message:"must have required property '"+"briefOpen"+"'"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
if(data11.storyNoteOpen === undefined){
const err44 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/required",keyword:"required",params:{missingProperty: "storyNoteOpen"},message:"must have required property '"+"storyNoteOpen"+"'"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
if(data11.filmingRequestOpen === undefined){
const err45 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/required",keyword:"required",params:{missingProperty: "filmingRequestOpen"},message:"must have required property '"+"filmingRequestOpen"+"'"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
if(data11.noticeFlat === undefined){
const err46 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/required",keyword:"required",params:{missingProperty: "noticeFlat"},message:"must have required property '"+"noticeFlat"+"'"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
if(data11.dockFlapOpen === undefined){
const err47 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/required",keyword:"required",params:{missingProperty: "dockFlapOpen"},message:"must have required property '"+"dockFlapOpen"+"'"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
if(data11.rackOpened === undefined){
const err48 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/required",keyword:"required",params:{missingProperty: "rackOpened"},message:"must have required property '"+"rackOpened"+"'"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
if(data11.previewTried === undefined){
const err49 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/required",keyword:"required",params:{missingProperty: "previewTried"},message:"must have required property '"+"previewTried"+"'"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
if(data11.toastRevealed === undefined){
const err50 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/required",keyword:"required",params:{missingProperty: "toastRevealed"},message:"must have required property '"+"toastRevealed"+"'"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
for(const key2 in data11){
if(!(func1.call(schema67.properties.objects.properties, key2))){
const err51 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
}
if(data11.modelTabTried !== undefined){
if(typeof data11.modelTabTried !== "boolean"){
const err52 = {instancePath:instancePath+"/objects/modelTabTried",schemaPath:"#/properties/objects/properties/modelTabTried/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err52];
}
else {
vErrors.push(err52);
}
errors++;
}
}
if(data11.briefOpen !== undefined){
if(typeof data11.briefOpen !== "boolean"){
const err53 = {instancePath:instancePath+"/objects/briefOpen",schemaPath:"#/properties/objects/properties/briefOpen/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
}
if(data11.storyNoteOpen !== undefined){
if(typeof data11.storyNoteOpen !== "boolean"){
const err54 = {instancePath:instancePath+"/objects/storyNoteOpen",schemaPath:"#/properties/objects/properties/storyNoteOpen/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
}
}
if(data11.filmingRequestOpen !== undefined){
if(typeof data11.filmingRequestOpen !== "boolean"){
const err55 = {instancePath:instancePath+"/objects/filmingRequestOpen",schemaPath:"#/properties/objects/properties/filmingRequestOpen/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err55];
}
else {
vErrors.push(err55);
}
errors++;
}
}
if(data11.noticeFlat !== undefined){
if(typeof data11.noticeFlat !== "boolean"){
const err56 = {instancePath:instancePath+"/objects/noticeFlat",schemaPath:"#/properties/objects/properties/noticeFlat/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err56];
}
else {
vErrors.push(err56);
}
errors++;
}
}
if(data11.dockFlapOpen !== undefined){
if(typeof data11.dockFlapOpen !== "boolean"){
const err57 = {instancePath:instancePath+"/objects/dockFlapOpen",schemaPath:"#/properties/objects/properties/dockFlapOpen/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err57];
}
else {
vErrors.push(err57);
}
errors++;
}
}
if(data11.rackOpened !== undefined){
if(typeof data11.rackOpened !== "boolean"){
const err58 = {instancePath:instancePath+"/objects/rackOpened",schemaPath:"#/properties/objects/properties/rackOpened/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err58];
}
else {
vErrors.push(err58);
}
errors++;
}
}
if(data11.previewTried !== undefined){
if(typeof data11.previewTried !== "boolean"){
const err59 = {instancePath:instancePath+"/objects/previewTried",schemaPath:"#/properties/objects/properties/previewTried/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err59];
}
else {
vErrors.push(err59);
}
errors++;
}
}
if(data11.toastRevealed !== undefined){
if(typeof data11.toastRevealed !== "boolean"){
const err60 = {instancePath:instancePath+"/objects/toastRevealed",schemaPath:"#/properties/objects/properties/toastRevealed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
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
const err61 = {instancePath:instancePath+"/objects",schemaPath:"#/properties/objects/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err61];
}
else {
vErrors.push(err61);
}
errors++;
}
}
if(data.caddyHost !== undefined){
let data21 = data.caddyHost;
if(typeof data21 !== "string"){
const err62 = {instancePath:instancePath+"/caddyHost",schemaPath:"#/properties/caddyHost/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err62];
}
else {
vErrors.push(err62);
}
errors++;
}
if(!(((data21 === "MD.RACK.STATION") || (data21 === "ACT.PLAYER")) || (data21 === "ST.RACK.BAY"))){
const err63 = {instancePath:instancePath+"/caddyHost",schemaPath:"#/properties/caddyHost/enum",keyword:"enum",params:{allowedValues: schema67.properties.caddyHost.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err63];
}
else {
vErrors.push(err63);
}
errors++;
}
}
if(data.order !== undefined){
let data22 = data.order;
if(Array.isArray(data22)){
if(data22.length > 4){
const err64 = {instancePath:instancePath+"/order",schemaPath:"#/$defs/Order/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err64];
}
else {
vErrors.push(err64);
}
errors++;
}
const len4 = data22.length;
for(let i0=0; i0<len4; i0++){
let data23 = data22[i0];
if(typeof data23 !== "string"){
const err65 = {instancePath:instancePath+"/order/" + i0,schemaPath:"#/$defs/Order/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err65];
}
else {
vErrors.push(err65);
}
errors++;
}
if(!((((data23 === "TILE.FERRY") || (data23 === "TILE.BRIDGE")) || (data23 === "TILE.PLANT")) || (data23 === "TILE.BLOOM"))){
const err66 = {instancePath:instancePath+"/order/" + i0,schemaPath:"#/$defs/Order/items/enum",keyword:"enum",params:{allowedValues: schema70.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err66];
}
else {
vErrors.push(err66);
}
errors++;
}
}
let i1 = data22.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data22[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err67 = {instancePath:instancePath+"/order",schemaPath:"#/$defs/Order/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err67];
}
else {
vErrors.push(err67);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err68 = {instancePath:instancePath+"/order",schemaPath:"#/$defs/Order/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err68];
}
else {
vErrors.push(err68);
}
errors++;
}
}
if(data.arrangementRevision !== undefined){
let data24 = data.arrangementRevision;
if(!(((typeof data24 == "number") && (!(data24 % 1) && !isNaN(data24))) && (isFinite(data24)))){
const err69 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err69];
}
else {
vErrors.push(err69);
}
errors++;
}
if((typeof data24 == "number") && (isFinite(data24))){
if(data24 > 9007199254740991 || isNaN(data24)){
const err70 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err70];
}
else {
vErrors.push(err70);
}
errors++;
}
if(data24 < 0 || isNaN(data24)){
const err71 = {instancePath:instancePath+"/arrangementRevision",schemaPath:"#/properties/arrangementRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err71];
}
else {
vErrors.push(err71);
}
errors++;
}
}
}
}
else {
const err72 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err72];
}
else {
vErrors.push(err72);
}
errors++;
}
validate56.errors = vErrors;
return errors === 0;
}
validate56.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema72 = {"type":"object","properties":{"refId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"ctId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"spans":{"type":"array","items":{"$ref":"#/$defs/Span"}},"visualComplete":{"type":"boolean"},"viaAccessId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"firstSeq":{"type":"integer","minimum":0,"maximum":9007199254740991},"lastSeq":{"type":"integer","minimum":0,"maximum":9007199254740991},"count":{"type":"integer","minimum":1}},"required":["refId","ctId","spans","visualComplete","viaAccessId","firstSeq","lastSeq","count"],"additionalProperties":false};

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
if(!pattern4.test(data0)){
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
if(!pattern4.test(data1)){
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
let data3 = data2[i0];
if(Array.isArray(data3)){
if(data3.length > 2){
const err15 = {instancePath:instancePath+"/spans/" + i0,schemaPath:"#/$defs/Span/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(data3.length < 2){
const err16 = {instancePath:instancePath+"/spans/" + i0,schemaPath:"#/$defs/Span/minItems",keyword:"minItems",params:{limit: 2},message:"must NOT have fewer than 2 items"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
const len1 = data3.length;
if(len1 > 0){
let data4 = data3[0];
if(!(((typeof data4 == "number") && (!(data4 % 1) && !isNaN(data4))) && (isFinite(data4)))){
const err17 = {instancePath:instancePath+"/spans/" + i0+"/0",schemaPath:"#/$defs/Span/prefixItems/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
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
const err18 = {instancePath:instancePath+"/spans/" + i0+"/0",schemaPath:"#/$defs/Span/prefixItems/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
if(data4 < 0 || isNaN(data4)){
const err19 = {instancePath:instancePath+"/spans/" + i0+"/0",schemaPath:"#/$defs/Span/prefixItems/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
if(len1 > 1){
let data5 = data3[1];
if(!(((typeof data5 == "number") && (!(data5 % 1) && !isNaN(data5))) && (isFinite(data5)))){
const err20 = {instancePath:instancePath+"/spans/" + i0+"/1",schemaPath:"#/$defs/Span/prefixItems/1/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if((typeof data5 == "number") && (isFinite(data5))){
if(data5 > 9007199254740991 || isNaN(data5)){
const err21 = {instancePath:instancePath+"/spans/" + i0+"/1",schemaPath:"#/$defs/Span/prefixItems/1/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
if(data5 < 0 || isNaN(data5)){
const err22 = {instancePath:instancePath+"/spans/" + i0+"/1",schemaPath:"#/$defs/Span/prefixItems/1/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const len2 = data3.length;
if(!(len2 <= 2)){
const err23 = {instancePath:instancePath+"/spans/" + i0,schemaPath:"#/$defs/Span/items",keyword:"items",params:{limit: 2},message:"must NOT have more than 2 items"};
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
const err24 = {instancePath:instancePath+"/spans/" + i0,schemaPath:"#/$defs/Span/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
}
else {
const err25 = {instancePath:instancePath+"/spans",schemaPath:"#/properties/spans/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data.visualComplete !== undefined){
if(typeof data.visualComplete !== "boolean"){
const err26 = {instancePath:instancePath+"/visualComplete",schemaPath:"#/properties/visualComplete/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
if(data.viaAccessId !== undefined){
let data7 = data.viaAccessId;
if(typeof data7 === "string"){
if(func2(data7) > 160){
const err27 = {instancePath:instancePath+"/viaAccessId",schemaPath:"#/properties/viaAccessId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
if(!pattern4.test(data7)){
const err28 = {instancePath:instancePath+"/viaAccessId",schemaPath:"#/properties/viaAccessId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
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
const err29 = {instancePath:instancePath+"/viaAccessId",schemaPath:"#/properties/viaAccessId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
if(data.firstSeq !== undefined){
let data8 = data.firstSeq;
if(!(((typeof data8 == "number") && (!(data8 % 1) && !isNaN(data8))) && (isFinite(data8)))){
const err30 = {instancePath:instancePath+"/firstSeq",schemaPath:"#/properties/firstSeq/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
if((typeof data8 == "number") && (isFinite(data8))){
if(data8 > 9007199254740991 || isNaN(data8)){
const err31 = {instancePath:instancePath+"/firstSeq",schemaPath:"#/properties/firstSeq/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
if(data8 < 0 || isNaN(data8)){
const err32 = {instancePath:instancePath+"/firstSeq",schemaPath:"#/properties/firstSeq/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
if(data.lastSeq !== undefined){
let data9 = data.lastSeq;
if(!(((typeof data9 == "number") && (!(data9 % 1) && !isNaN(data9))) && (isFinite(data9)))){
const err33 = {instancePath:instancePath+"/lastSeq",schemaPath:"#/properties/lastSeq/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
if((typeof data9 == "number") && (isFinite(data9))){
if(data9 > 9007199254740991 || isNaN(data9)){
const err34 = {instancePath:instancePath+"/lastSeq",schemaPath:"#/properties/lastSeq/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
if(data9 < 0 || isNaN(data9)){
const err35 = {instancePath:instancePath+"/lastSeq",schemaPath:"#/properties/lastSeq/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
if(data.count !== undefined){
let data10 = data.count;
if(!(((typeof data10 == "number") && (!(data10 % 1) && !isNaN(data10))) && (isFinite(data10)))){
const err36 = {instancePath:instancePath+"/count",schemaPath:"#/properties/count/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
if((typeof data10 == "number") && (isFinite(data10))){
if(data10 < 1 || isNaN(data10)){
const err37 = {instancePath:instancePath+"/count",schemaPath:"#/properties/count/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
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
validate58.errors = vErrors;
return errors === 0;
}
validate58.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema76 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"kind":{"type":"string","enum":["private-idea","crew-plan","jo-explanation","evidence-delivery","coaching-submission"]},"topic":{"type":"string","enum":["search","story"]},"text":{"type":"string"},"refs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"recipient":{"anyOf":[{"type":"string","enum":["ACT.JO","ACT.REMY","ACT.ARI"]},{"type":"null"}]},"previousRecordId":{"anyOf":[{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},{"type":"null"}]},"arrangementRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"puppet":{"$ref":"#/$defs/Puppet"},"seq":{"type":"integer","minimum":0,"maximum":9007199254740991}},"required":["id","kind","topic","text","refs","recipient","previousRecordId","arrangementRevision","puppet","seq"],"additionalProperties":false};
const schema77 = {"type":"object","properties":{"pip":{"type":"string","enum":["left","right"]},"seed":{"type":"string","enum":["left","right","soil"]},"boats":{"type":"string","enum":["separate","joined"]},"lit":{"type":"boolean"}},"required":["pip","seed","boats","lit"],"additionalProperties":false};

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
if(!(func1.call(schema76.properties, key0))){
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
if(!pattern44.test(data0)){
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
const err15 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/enum",keyword:"enum",params:{allowedValues: schema76.properties.kind.enum},message:"must be equal to one of the allowed values"};
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
const err17 = {instancePath:instancePath+"/topic",schemaPath:"#/properties/topic/enum",keyword:"enum",params:{allowedValues: schema76.properties.topic.enum},message:"must be equal to one of the allowed values"};
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
if(!pattern4.test(data5)){
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
const err26 = {instancePath:instancePath+"/recipient",schemaPath:"#/properties/recipient/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema76.properties.recipient.anyOf[0].enum},message:"must be equal to one of the allowed values"};
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
if(!pattern44.test(data7)){
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
let data9 = data.puppet;
if(data9 && typeof data9 == "object" && !Array.isArray(data9)){
if(data9.pip === undefined){
const err37 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "pip"},message:"must have required property '"+"pip"+"'"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
if(data9.seed === undefined){
const err38 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "seed"},message:"must have required property '"+"seed"+"'"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
if(data9.boats === undefined){
const err39 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "boats"},message:"must have required property '"+"boats"+"'"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
if(data9.lit === undefined){
const err40 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "lit"},message:"must have required property '"+"lit"+"'"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
for(const key1 in data9){
if(!((((key1 === "pip") || (key1 === "seed")) || (key1 === "boats")) || (key1 === "lit"))){
const err41 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
if(data9.pip !== undefined){
let data10 = data9.pip;
if(typeof data10 !== "string"){
const err42 = {instancePath:instancePath+"/puppet/pip",schemaPath:"#/$defs/Puppet/properties/pip/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
if(!((data10 === "left") || (data10 === "right"))){
const err43 = {instancePath:instancePath+"/puppet/pip",schemaPath:"#/$defs/Puppet/properties/pip/enum",keyword:"enum",params:{allowedValues: schema77.properties.pip.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
if(data9.seed !== undefined){
let data11 = data9.seed;
if(typeof data11 !== "string"){
const err44 = {instancePath:instancePath+"/puppet/seed",schemaPath:"#/$defs/Puppet/properties/seed/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
if(!(((data11 === "left") || (data11 === "right")) || (data11 === "soil"))){
const err45 = {instancePath:instancePath+"/puppet/seed",schemaPath:"#/$defs/Puppet/properties/seed/enum",keyword:"enum",params:{allowedValues: schema77.properties.seed.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
}
if(data9.boats !== undefined){
let data12 = data9.boats;
if(typeof data12 !== "string"){
const err46 = {instancePath:instancePath+"/puppet/boats",schemaPath:"#/$defs/Puppet/properties/boats/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
if(!((data12 === "separate") || (data12 === "joined"))){
const err47 = {instancePath:instancePath+"/puppet/boats",schemaPath:"#/$defs/Puppet/properties/boats/enum",keyword:"enum",params:{allowedValues: schema77.properties.boats.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
}
if(data9.lit !== undefined){
if(typeof data9.lit !== "boolean"){
const err48 = {instancePath:instancePath+"/puppet/lit",schemaPath:"#/$defs/Puppet/properties/lit/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
}
}
else {
const err49 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
}
if(data.seq !== undefined){
let data14 = data.seq;
if(!(((typeof data14 == "number") && (!(data14 % 1) && !isNaN(data14))) && (isFinite(data14)))){
const err50 = {instancePath:instancePath+"/seq",schemaPath:"#/properties/seq/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
if((typeof data14 == "number") && (isFinite(data14))){
if(data14 > 9007199254740991 || isNaN(data14)){
const err51 = {instancePath:instancePath+"/seq",schemaPath:"#/properties/seq/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
if(data14 < 0 || isNaN(data14)){
const err52 = {instancePath:instancePath+"/seq",schemaPath:"#/properties/seq/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
}
else {
const err53 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
validate60.errors = vErrors;
return errors === 0;
}
validate60.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema78 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"mode":{"type":"string","enum":["rehearsal","show"]},"arrangementRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"order":{"$ref":"#/$defs/Order"},"nextCue":{"type":"integer","minimum":0,"maximum":4},"status":{"type":"string","enum":["running","paused","finalized"]},"pauseReason":{"anyOf":[{"type":"string","enum":["user","unmet","inspection","leaving","background","recovery"]},{"type":"null"}]},"puppet":{"$ref":"#/$defs/Puppet"},"activeCue":{"anyOf":[{"$ref":"#/$defs/Cue"},{"type":"null"}]},"cueResultIds":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":4,"uniqueItems":true},"startSeq":{"type":"integer","minimum":0,"maximum":9007199254740991},"finalizedSeq":{"anyOf":[{"type":"integer","minimum":0,"maximum":9007199254740991},{"type":"null"}]}},"required":["id","mode","arrangementRevision","order","nextCue","status","pauseReason","puppet","activeCue","cueResultIds","startSeq","finalizedSeq"],"additionalProperties":false};
const schema81 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"index":{"type":"integer","minimum":0,"maximum":3},"tile":{"type":"string","enum":["TILE.FERRY","TILE.BRIDGE","TILE.PLANT","TILE.BLOOM"]},"from":{"$ref":"#/$defs/Puppet"},"to":{"$ref":"#/$defs/Puppet"},"result":{"type":"string","enum":["changed","noop","unmet"]}},"required":["id","index","tile","from","to","result"],"additionalProperties":false};

function validate63(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate63.evaluated;
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
if(!pattern4.test(data0)){
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
const err14 = {instancePath:instancePath+"/tile",schemaPath:"#/properties/tile/enum",keyword:"enum",params:{allowedValues: schema81.properties.tile.enum},message:"must be equal to one of the allowed values"};
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
let data3 = data.from;
if(data3 && typeof data3 == "object" && !Array.isArray(data3)){
if(data3.pip === undefined){
const err15 = {instancePath:instancePath+"/from",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "pip"},message:"must have required property '"+"pip"+"'"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(data3.seed === undefined){
const err16 = {instancePath:instancePath+"/from",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "seed"},message:"must have required property '"+"seed"+"'"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
if(data3.boats === undefined){
const err17 = {instancePath:instancePath+"/from",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "boats"},message:"must have required property '"+"boats"+"'"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(data3.lit === undefined){
const err18 = {instancePath:instancePath+"/from",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "lit"},message:"must have required property '"+"lit"+"'"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
for(const key1 in data3){
if(!((((key1 === "pip") || (key1 === "seed")) || (key1 === "boats")) || (key1 === "lit"))){
const err19 = {instancePath:instancePath+"/from",schemaPath:"#/$defs/Puppet/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data3.pip !== undefined){
let data4 = data3.pip;
if(typeof data4 !== "string"){
const err20 = {instancePath:instancePath+"/from/pip",schemaPath:"#/$defs/Puppet/properties/pip/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(!((data4 === "left") || (data4 === "right"))){
const err21 = {instancePath:instancePath+"/from/pip",schemaPath:"#/$defs/Puppet/properties/pip/enum",keyword:"enum",params:{allowedValues: schema77.properties.pip.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data3.seed !== undefined){
let data5 = data3.seed;
if(typeof data5 !== "string"){
const err22 = {instancePath:instancePath+"/from/seed",schemaPath:"#/$defs/Puppet/properties/seed/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
if(!(((data5 === "left") || (data5 === "right")) || (data5 === "soil"))){
const err23 = {instancePath:instancePath+"/from/seed",schemaPath:"#/$defs/Puppet/properties/seed/enum",keyword:"enum",params:{allowedValues: schema77.properties.seed.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
}
if(data3.boats !== undefined){
let data6 = data3.boats;
if(typeof data6 !== "string"){
const err24 = {instancePath:instancePath+"/from/boats",schemaPath:"#/$defs/Puppet/properties/boats/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
if(!((data6 === "separate") || (data6 === "joined"))){
const err25 = {instancePath:instancePath+"/from/boats",schemaPath:"#/$defs/Puppet/properties/boats/enum",keyword:"enum",params:{allowedValues: schema77.properties.boats.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data3.lit !== undefined){
if(typeof data3.lit !== "boolean"){
const err26 = {instancePath:instancePath+"/from/lit",schemaPath:"#/$defs/Puppet/properties/lit/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
}
}
else {
const err27 = {instancePath:instancePath+"/from",schemaPath:"#/$defs/Puppet/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
if(data.to !== undefined){
let data8 = data.to;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
if(data8.pip === undefined){
const err28 = {instancePath:instancePath+"/to",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "pip"},message:"must have required property '"+"pip"+"'"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
if(data8.seed === undefined){
const err29 = {instancePath:instancePath+"/to",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "seed"},message:"must have required property '"+"seed"+"'"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
if(data8.boats === undefined){
const err30 = {instancePath:instancePath+"/to",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "boats"},message:"must have required property '"+"boats"+"'"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
if(data8.lit === undefined){
const err31 = {instancePath:instancePath+"/to",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "lit"},message:"must have required property '"+"lit"+"'"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
for(const key2 in data8){
if(!((((key2 === "pip") || (key2 === "seed")) || (key2 === "boats")) || (key2 === "lit"))){
const err32 = {instancePath:instancePath+"/to",schemaPath:"#/$defs/Puppet/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
}
if(data8.pip !== undefined){
let data9 = data8.pip;
if(typeof data9 !== "string"){
const err33 = {instancePath:instancePath+"/to/pip",schemaPath:"#/$defs/Puppet/properties/pip/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
if(!((data9 === "left") || (data9 === "right"))){
const err34 = {instancePath:instancePath+"/to/pip",schemaPath:"#/$defs/Puppet/properties/pip/enum",keyword:"enum",params:{allowedValues: schema77.properties.pip.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
}
if(data8.seed !== undefined){
let data10 = data8.seed;
if(typeof data10 !== "string"){
const err35 = {instancePath:instancePath+"/to/seed",schemaPath:"#/$defs/Puppet/properties/seed/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
if(!(((data10 === "left") || (data10 === "right")) || (data10 === "soil"))){
const err36 = {instancePath:instancePath+"/to/seed",schemaPath:"#/$defs/Puppet/properties/seed/enum",keyword:"enum",params:{allowedValues: schema77.properties.seed.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
}
if(data8.boats !== undefined){
let data11 = data8.boats;
if(typeof data11 !== "string"){
const err37 = {instancePath:instancePath+"/to/boats",schemaPath:"#/$defs/Puppet/properties/boats/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
if(!((data11 === "separate") || (data11 === "joined"))){
const err38 = {instancePath:instancePath+"/to/boats",schemaPath:"#/$defs/Puppet/properties/boats/enum",keyword:"enum",params:{allowedValues: schema77.properties.boats.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
}
if(data8.lit !== undefined){
if(typeof data8.lit !== "boolean"){
const err39 = {instancePath:instancePath+"/to/lit",schemaPath:"#/$defs/Puppet/properties/lit/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
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
else {
const err40 = {instancePath:instancePath+"/to",schemaPath:"#/$defs/Puppet/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
if(data.result !== undefined){
let data13 = data.result;
if(typeof data13 !== "string"){
const err41 = {instancePath:instancePath+"/result",schemaPath:"#/properties/result/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
if(!(((data13 === "changed") || (data13 === "noop")) || (data13 === "unmet"))){
const err42 = {instancePath:instancePath+"/result",schemaPath:"#/properties/result/enum",keyword:"enum",params:{allowedValues: schema81.properties.result.enum},message:"must be equal to one of the allowed values"};
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
validate63.errors = vErrors;
return errors === 0;
}
validate63.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate62(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate62.evaluated;
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
if(!(func1.call(schema78.properties, key0))){
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
if(!pattern44.test(data0)){
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
const err17 = {instancePath:instancePath+"/mode",schemaPath:"#/properties/mode/enum",keyword:"enum",params:{allowedValues: schema78.properties.mode.enum},message:"must be equal to one of the allowed values"};
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
let data3 = data.order;
if(Array.isArray(data3)){
if(data3.length > 4){
const err21 = {instancePath:instancePath+"/order",schemaPath:"#/$defs/Order/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
const len0 = data3.length;
for(let i0=0; i0<len0; i0++){
let data4 = data3[i0];
if(typeof data4 !== "string"){
const err22 = {instancePath:instancePath+"/order/" + i0,schemaPath:"#/$defs/Order/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
if(!((((data4 === "TILE.FERRY") || (data4 === "TILE.BRIDGE")) || (data4 === "TILE.PLANT")) || (data4 === "TILE.BLOOM"))){
const err23 = {instancePath:instancePath+"/order/" + i0,schemaPath:"#/$defs/Order/items/enum",keyword:"enum",params:{allowedValues: schema70.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
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
const err24 = {instancePath:instancePath+"/order",schemaPath:"#/$defs/Order/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err25 = {instancePath:instancePath+"/order",schemaPath:"#/$defs/Order/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data.nextCue !== undefined){
let data5 = data.nextCue;
if(!(((typeof data5 == "number") && (!(data5 % 1) && !isNaN(data5))) && (isFinite(data5)))){
const err26 = {instancePath:instancePath+"/nextCue",schemaPath:"#/properties/nextCue/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
if((typeof data5 == "number") && (isFinite(data5))){
if(data5 > 4 || isNaN(data5)){
const err27 = {instancePath:instancePath+"/nextCue",schemaPath:"#/properties/nextCue/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4},message:"must be <= 4"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
if(data5 < 0 || isNaN(data5)){
const err28 = {instancePath:instancePath+"/nextCue",schemaPath:"#/properties/nextCue/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
if(data.status !== undefined){
let data6 = data.status;
if(typeof data6 !== "string"){
const err29 = {instancePath:instancePath+"/status",schemaPath:"#/properties/status/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
if(!(((data6 === "running") || (data6 === "paused")) || (data6 === "finalized"))){
const err30 = {instancePath:instancePath+"/status",schemaPath:"#/properties/status/enum",keyword:"enum",params:{allowedValues: schema78.properties.status.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
}
if(data.pauseReason !== undefined){
let data7 = data.pauseReason;
const _errs18 = errors;
let valid5 = false;
const _errs19 = errors;
if(typeof data7 !== "string"){
const err31 = {instancePath:instancePath+"/pauseReason",schemaPath:"#/properties/pauseReason/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
}
if(!((((((data7 === "user") || (data7 === "unmet")) || (data7 === "inspection")) || (data7 === "leaving")) || (data7 === "background")) || (data7 === "recovery"))){
const err32 = {instancePath:instancePath+"/pauseReason",schemaPath:"#/properties/pauseReason/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema78.properties.pauseReason.anyOf[0].enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
var _valid0 = _errs19 === errors;
valid5 = valid5 || _valid0;
const _errs21 = errors;
if(data7 !== null){
const err33 = {instancePath:instancePath+"/pauseReason",schemaPath:"#/properties/pauseReason/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
var _valid0 = _errs21 === errors;
valid5 = valid5 || _valid0;
if(!valid5){
const err34 = {instancePath:instancePath+"/pauseReason",schemaPath:"#/properties/pauseReason/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
else {
errors = _errs18;
if(vErrors !== null){
if(_errs18){
vErrors.length = _errs18;
}
else {
vErrors = null;
}
}
}
}
if(data.puppet !== undefined){
let data8 = data.puppet;
if(data8 && typeof data8 == "object" && !Array.isArray(data8)){
if(data8.pip === undefined){
const err35 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "pip"},message:"must have required property '"+"pip"+"'"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
if(data8.seed === undefined){
const err36 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "seed"},message:"must have required property '"+"seed"+"'"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
if(data8.boats === undefined){
const err37 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "boats"},message:"must have required property '"+"boats"+"'"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
if(data8.lit === undefined){
const err38 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "lit"},message:"must have required property '"+"lit"+"'"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
for(const key1 in data8){
if(!((((key1 === "pip") || (key1 === "seed")) || (key1 === "boats")) || (key1 === "lit"))){
const err39 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
if(data8.pip !== undefined){
let data9 = data8.pip;
if(typeof data9 !== "string"){
const err40 = {instancePath:instancePath+"/puppet/pip",schemaPath:"#/$defs/Puppet/properties/pip/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
if(!((data9 === "left") || (data9 === "right"))){
const err41 = {instancePath:instancePath+"/puppet/pip",schemaPath:"#/$defs/Puppet/properties/pip/enum",keyword:"enum",params:{allowedValues: schema77.properties.pip.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
if(data8.seed !== undefined){
let data10 = data8.seed;
if(typeof data10 !== "string"){
const err42 = {instancePath:instancePath+"/puppet/seed",schemaPath:"#/$defs/Puppet/properties/seed/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
if(!(((data10 === "left") || (data10 === "right")) || (data10 === "soil"))){
const err43 = {instancePath:instancePath+"/puppet/seed",schemaPath:"#/$defs/Puppet/properties/seed/enum",keyword:"enum",params:{allowedValues: schema77.properties.seed.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
if(data8.boats !== undefined){
let data11 = data8.boats;
if(typeof data11 !== "string"){
const err44 = {instancePath:instancePath+"/puppet/boats",schemaPath:"#/$defs/Puppet/properties/boats/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
if(!((data11 === "separate") || (data11 === "joined"))){
const err45 = {instancePath:instancePath+"/puppet/boats",schemaPath:"#/$defs/Puppet/properties/boats/enum",keyword:"enum",params:{allowedValues: schema77.properties.boats.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
}
if(data8.lit !== undefined){
if(typeof data8.lit !== "boolean"){
const err46 = {instancePath:instancePath+"/puppet/lit",schemaPath:"#/$defs/Puppet/properties/lit/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
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
else {
const err47 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
}
if(data.activeCue !== undefined){
let data13 = data.activeCue;
const _errs36 = errors;
let valid8 = false;
const _errs37 = errors;
if(!(validate63(data13, {instancePath:instancePath+"/activeCue",parentData:data,parentDataProperty:"activeCue",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate63.errors : vErrors.concat(validate63.errors);
errors = vErrors.length;
}
var _valid1 = _errs37 === errors;
valid8 = valid8 || _valid1;
const _errs38 = errors;
if(data13 !== null){
const err48 = {instancePath:instancePath+"/activeCue",schemaPath:"#/properties/activeCue/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
var _valid1 = _errs38 === errors;
valid8 = valid8 || _valid1;
if(!valid8){
const err49 = {instancePath:instancePath+"/activeCue",schemaPath:"#/properties/activeCue/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
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
if(data.cueResultIds !== undefined){
let data14 = data.cueResultIds;
if(Array.isArray(data14)){
if(data14.length > 4){
const err50 = {instancePath:instancePath+"/cueResultIds",schemaPath:"#/properties/cueResultIds/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
const len1 = data14.length;
for(let i2=0; i2<len1; i2++){
let data15 = data14[i2];
if(typeof data15 === "string"){
if(func2(data15) > 160){
const err51 = {instancePath:instancePath+"/cueResultIds/" + i2,schemaPath:"#/properties/cueResultIds/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
if(!pattern4.test(data15)){
const err52 = {instancePath:instancePath+"/cueResultIds/" + i2,schemaPath:"#/properties/cueResultIds/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
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
const err53 = {instancePath:instancePath+"/cueResultIds/" + i2,schemaPath:"#/properties/cueResultIds/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
}
let i3 = data14.length;
let j1;
if(i3 > 1){
const indices1 = {};
for(;i3--;){
let item1 = data14[i3];
if(typeof item1 !== "string"){
continue;
}
if(typeof indices1[item1] == "number"){
j1 = indices1[item1];
const err54 = {instancePath:instancePath+"/cueResultIds",schemaPath:"#/properties/cueResultIds/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
break;
}
indices1[item1] = i3;
}
}
}
else {
const err55 = {instancePath:instancePath+"/cueResultIds",schemaPath:"#/properties/cueResultIds/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err55];
}
else {
vErrors.push(err55);
}
errors++;
}
}
if(data.startSeq !== undefined){
let data16 = data.startSeq;
if(!(((typeof data16 == "number") && (!(data16 % 1) && !isNaN(data16))) && (isFinite(data16)))){
const err56 = {instancePath:instancePath+"/startSeq",schemaPath:"#/properties/startSeq/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err56];
}
else {
vErrors.push(err56);
}
errors++;
}
if((typeof data16 == "number") && (isFinite(data16))){
if(data16 > 9007199254740991 || isNaN(data16)){
const err57 = {instancePath:instancePath+"/startSeq",schemaPath:"#/properties/startSeq/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err57];
}
else {
vErrors.push(err57);
}
errors++;
}
if(data16 < 0 || isNaN(data16)){
const err58 = {instancePath:instancePath+"/startSeq",schemaPath:"#/properties/startSeq/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
if(data.finalizedSeq !== undefined){
let data17 = data.finalizedSeq;
const _errs47 = errors;
let valid12 = false;
const _errs48 = errors;
if(!(((typeof data17 == "number") && (!(data17 % 1) && !isNaN(data17))) && (isFinite(data17)))){
const err59 = {instancePath:instancePath+"/finalizedSeq",schemaPath:"#/properties/finalizedSeq/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err59];
}
else {
vErrors.push(err59);
}
errors++;
}
if((typeof data17 == "number") && (isFinite(data17))){
if(data17 > 9007199254740991 || isNaN(data17)){
const err60 = {instancePath:instancePath+"/finalizedSeq",schemaPath:"#/properties/finalizedSeq/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err60];
}
else {
vErrors.push(err60);
}
errors++;
}
if(data17 < 0 || isNaN(data17)){
const err61 = {instancePath:instancePath+"/finalizedSeq",schemaPath:"#/properties/finalizedSeq/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err61];
}
else {
vErrors.push(err61);
}
errors++;
}
}
var _valid2 = _errs48 === errors;
valid12 = valid12 || _valid2;
const _errs50 = errors;
if(data17 !== null){
const err62 = {instancePath:instancePath+"/finalizedSeq",schemaPath:"#/properties/finalizedSeq/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err62];
}
else {
vErrors.push(err62);
}
errors++;
}
var _valid2 = _errs50 === errors;
valid12 = valid12 || _valid2;
if(!valid12){
const err63 = {instancePath:instancePath+"/finalizedSeq",schemaPath:"#/properties/finalizedSeq/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err63];
}
else {
vErrors.push(err63);
}
errors++;
}
else {
errors = _errs47;
if(vErrors !== null){
if(_errs47){
vErrors.length = _errs47;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err64 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err64];
}
else {
vErrors.push(err64);
}
errors++;
}
validate62.errors = vErrors;
return errors === 0;
}
validate62.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema85 = {"type":"object","properties":{"runId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"arrangementRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"order":{"$ref":"#/$defs/Order"},"completedSeq":{"type":"integer","minimum":0,"maximum":9007199254740991}},"required":["runId","arrangementRevision","order","completedSeq"],"additionalProperties":false};

function validate67(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate67.evaluated;
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
if(!pattern44.test(data0)){
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
let data2 = data.order;
if(Array.isArray(data2)){
if(data2.length > 4){
const err11 = {instancePath:instancePath+"/order",schemaPath:"#/$defs/Order/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
const len0 = data2.length;
for(let i0=0; i0<len0; i0++){
let data3 = data2[i0];
if(typeof data3 !== "string"){
const err12 = {instancePath:instancePath+"/order/" + i0,schemaPath:"#/$defs/Order/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(!((((data3 === "TILE.FERRY") || (data3 === "TILE.BRIDGE")) || (data3 === "TILE.PLANT")) || (data3 === "TILE.BLOOM"))){
const err13 = {instancePath:instancePath+"/order/" + i0,schemaPath:"#/$defs/Order/items/enum",keyword:"enum",params:{allowedValues: schema70.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
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
const err14 = {instancePath:instancePath+"/order",schemaPath:"#/$defs/Order/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err15 = {instancePath:instancePath+"/order",schemaPath:"#/$defs/Order/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data.completedSeq !== undefined){
let data4 = data.completedSeq;
if(!(((typeof data4 == "number") && (!(data4 % 1) && !isNaN(data4))) && (isFinite(data4)))){
const err16 = {instancePath:instancePath+"/completedSeq",schemaPath:"#/properties/completedSeq/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
if((typeof data4 == "number") && (isFinite(data4))){
if(data4 > 9007199254740991 || isNaN(data4)){
const err17 = {instancePath:instancePath+"/completedSeq",schemaPath:"#/properties/completedSeq/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(data4 < 0 || isNaN(data4)){
const err18 = {instancePath:instancePath+"/completedSeq",schemaPath:"#/properties/completedSeq/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
}
}
else {
const err19 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
validate67.errors = vErrors;
return errors === 0;
}
validate67.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema87 = {"type":"object","properties":{"id":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"seq":{"type":"integer","minimum":0,"maximum":9007199254740991},"visitId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"kind":{"type":"string","enum":["source-available","source-displayed","physical-commit","cue-started","cue-outcome","run-finalized","explanation-recorded","evidence-delivered","help-requested","help-selected","help-displayed","possible-outcome","history-uncertain"]},"refs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"contentIds":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"actionId":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"runId":{"anyOf":[{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},{"type":"null"}]},"cueIndex":{"anyOf":[{"type":"integer","minimum":0,"maximum":9007199254740991},{"type":"null"}]},"recordId":{"anyOf":[{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},{"type":"null"}]},"requestId":{"anyOf":[{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},{"type":"null"}]},"outcome":{"anyOf":[{"type":"string","enum":["changed","noop","unmet","success","unsuccessful","canceled","possibly-seen"]},{"type":"null"}]},"puppet":{"anyOf":[{"$ref":"#/$defs/Puppet"},{"type":"null"}]},"assistanceLevel":{"anyOf":[{"type":"integer","minimum":0,"maximum":4},{"type":"null"}]},"origin":{"type":"string","enum":["player","world","live-selection","authored-topic","authored-fallback","authored-direct","npc","access","recovery"]},"interpretation":{"anyOf":[{"$ref":"#/$defs/InterpretationTag"},{"type":"null"}]},"uncertain":{"type":"boolean"}},"required":["id","seq","visitId","kind","refs","contentIds","actionId","runId","cueIndex","recordId","requestId","outcome","puppet","assistanceLevel","origin","interpretation","uncertain"],"additionalProperties":false};

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
if(!(func1.call(schema87.properties, key0))){
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
if(!pattern44.test(data0)){
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
if(!pattern44.test(data2)){
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
if(!(((((((((((((data3 === "source-available") || (data3 === "source-displayed")) || (data3 === "physical-commit")) || (data3 === "cue-started")) || (data3 === "cue-outcome")) || (data3 === "run-finalized")) || (data3 === "explanation-recorded")) || (data3 === "evidence-delivered")) || (data3 === "help-requested")) || (data3 === "help-selected")) || (data3 === "help-displayed")) || (data3 === "possible-outcome")) || (data3 === "history-uncertain"))){
const err28 = {instancePath:instancePath+"/kind",schemaPath:"#/properties/kind/enum",keyword:"enum",params:{allowedValues: schema87.properties.kind.enum},message:"must be equal to one of the allowed values"};
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
if(!pattern4.test(data5)){
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
if(!pattern4.test(data7)){
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
if(!pattern4.test(data8)){
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
if(!pattern44.test(data9)){
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
if(!pattern44.test(data11)){
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
if(!pattern44.test(data12)){
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
const err67 = {instancePath:instancePath+"/outcome",schemaPath:"#/properties/outcome/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema87.properties.outcome.anyOf[0].enum},message:"must be equal to one of the allowed values"};
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
if(data14 && typeof data14 == "object" && !Array.isArray(data14)){
if(data14.pip === undefined){
const err70 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "pip"},message:"must have required property '"+"pip"+"'"};
if(vErrors === null){
vErrors = [err70];
}
else {
vErrors.push(err70);
}
errors++;
}
if(data14.seed === undefined){
const err71 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "seed"},message:"must have required property '"+"seed"+"'"};
if(vErrors === null){
vErrors = [err71];
}
else {
vErrors.push(err71);
}
errors++;
}
if(data14.boats === undefined){
const err72 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "boats"},message:"must have required property '"+"boats"+"'"};
if(vErrors === null){
vErrors = [err72];
}
else {
vErrors.push(err72);
}
errors++;
}
if(data14.lit === undefined){
const err73 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "lit"},message:"must have required property '"+"lit"+"'"};
if(vErrors === null){
vErrors = [err73];
}
else {
vErrors.push(err73);
}
errors++;
}
for(const key1 in data14){
if(!((((key1 === "pip") || (key1 === "seed")) || (key1 === "boats")) || (key1 === "lit"))){
const err74 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err74];
}
else {
vErrors.push(err74);
}
errors++;
}
}
if(data14.pip !== undefined){
let data15 = data14.pip;
if(typeof data15 !== "string"){
const err75 = {instancePath:instancePath+"/puppet/pip",schemaPath:"#/$defs/Puppet/properties/pip/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err75];
}
else {
vErrors.push(err75);
}
errors++;
}
if(!((data15 === "left") || (data15 === "right"))){
const err76 = {instancePath:instancePath+"/puppet/pip",schemaPath:"#/$defs/Puppet/properties/pip/enum",keyword:"enum",params:{allowedValues: schema77.properties.pip.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err76];
}
else {
vErrors.push(err76);
}
errors++;
}
}
if(data14.seed !== undefined){
let data16 = data14.seed;
if(typeof data16 !== "string"){
const err77 = {instancePath:instancePath+"/puppet/seed",schemaPath:"#/$defs/Puppet/properties/seed/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err77];
}
else {
vErrors.push(err77);
}
errors++;
}
if(!(((data16 === "left") || (data16 === "right")) || (data16 === "soil"))){
const err78 = {instancePath:instancePath+"/puppet/seed",schemaPath:"#/$defs/Puppet/properties/seed/enum",keyword:"enum",params:{allowedValues: schema77.properties.seed.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err78];
}
else {
vErrors.push(err78);
}
errors++;
}
}
if(data14.boats !== undefined){
let data17 = data14.boats;
if(typeof data17 !== "string"){
const err79 = {instancePath:instancePath+"/puppet/boats",schemaPath:"#/$defs/Puppet/properties/boats/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err79];
}
else {
vErrors.push(err79);
}
errors++;
}
if(!((data17 === "separate") || (data17 === "joined"))){
const err80 = {instancePath:instancePath+"/puppet/boats",schemaPath:"#/$defs/Puppet/properties/boats/enum",keyword:"enum",params:{allowedValues: schema77.properties.boats.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err80];
}
else {
vErrors.push(err80);
}
errors++;
}
}
if(data14.lit !== undefined){
if(typeof data14.lit !== "boolean"){
const err81 = {instancePath:instancePath+"/puppet/lit",schemaPath:"#/$defs/Puppet/properties/lit/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
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
const err82 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err82];
}
else {
vErrors.push(err82);
}
errors++;
}
var _valid6 = _errs56 === errors;
valid13 = valid13 || _valid6;
const _errs68 = errors;
if(data14 !== null){
const err83 = {instancePath:instancePath+"/puppet",schemaPath:"#/properties/puppet/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err83];
}
else {
vErrors.push(err83);
}
errors++;
}
var _valid6 = _errs68 === errors;
valid13 = valid13 || _valid6;
if(!valid13){
const err84 = {instancePath:instancePath+"/puppet",schemaPath:"#/properties/puppet/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err84];
}
else {
vErrors.push(err84);
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
let data19 = data.assistanceLevel;
const _errs71 = errors;
let valid16 = false;
const _errs72 = errors;
if(!(((typeof data19 == "number") && (!(data19 % 1) && !isNaN(data19))) && (isFinite(data19)))){
const err85 = {instancePath:instancePath+"/assistanceLevel",schemaPath:"#/properties/assistanceLevel/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err85];
}
else {
vErrors.push(err85);
}
errors++;
}
if((typeof data19 == "number") && (isFinite(data19))){
if(data19 > 4 || isNaN(data19)){
const err86 = {instancePath:instancePath+"/assistanceLevel",schemaPath:"#/properties/assistanceLevel/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4},message:"must be <= 4"};
if(vErrors === null){
vErrors = [err86];
}
else {
vErrors.push(err86);
}
errors++;
}
if(data19 < 0 || isNaN(data19)){
const err87 = {instancePath:instancePath+"/assistanceLevel",schemaPath:"#/properties/assistanceLevel/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err87];
}
else {
vErrors.push(err87);
}
errors++;
}
}
var _valid7 = _errs72 === errors;
valid16 = valid16 || _valid7;
const _errs74 = errors;
if(data19 !== null){
const err88 = {instancePath:instancePath+"/assistanceLevel",schemaPath:"#/properties/assistanceLevel/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err88];
}
else {
vErrors.push(err88);
}
errors++;
}
var _valid7 = _errs74 === errors;
valid16 = valid16 || _valid7;
if(!valid16){
const err89 = {instancePath:instancePath+"/assistanceLevel",schemaPath:"#/properties/assistanceLevel/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err89];
}
else {
vErrors.push(err89);
}
errors++;
}
else {
errors = _errs71;
if(vErrors !== null){
if(_errs71){
vErrors.length = _errs71;
}
else {
vErrors = null;
}
}
}
}
if(data.origin !== undefined){
let data20 = data.origin;
if(typeof data20 !== "string"){
const err90 = {instancePath:instancePath+"/origin",schemaPath:"#/properties/origin/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err90];
}
else {
vErrors.push(err90);
}
errors++;
}
if(!(((((((((data20 === "player") || (data20 === "world")) || (data20 === "live-selection")) || (data20 === "authored-topic")) || (data20 === "authored-fallback")) || (data20 === "authored-direct")) || (data20 === "npc")) || (data20 === "access")) || (data20 === "recovery"))){
const err91 = {instancePath:instancePath+"/origin",schemaPath:"#/properties/origin/enum",keyword:"enum",params:{allowedValues: schema87.properties.origin.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err91];
}
else {
vErrors.push(err91);
}
errors++;
}
}
if(data.interpretation !== undefined){
let data21 = data.interpretation;
const _errs79 = errors;
let valid17 = false;
const _errs80 = errors;
if(typeof data21 !== "string"){
const err92 = {instancePath:instancePath+"/interpretation",schemaPath:"#/$defs/InterpretationTag/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err92];
}
else {
vErrors.push(err92);
}
errors++;
}
if(!((((((((data21 === "scope_confusion") || (data21 === "unsupported_destination")) || (data21 === "goal_incomplete")) || (data21 === "capacity")) || (data21 === "prerequisite")) || (data21 === "valid_plan")) || (data21 === "unclear")) || (data21 === "off_topic"))){
const err93 = {instancePath:instancePath+"/interpretation",schemaPath:"#/$defs/InterpretationTag/enum",keyword:"enum",params:{allowedValues: schema60.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err93];
}
else {
vErrors.push(err93);
}
errors++;
}
var _valid8 = _errs80 === errors;
valid17 = valid17 || _valid8;
const _errs83 = errors;
if(data21 !== null){
const err94 = {instancePath:instancePath+"/interpretation",schemaPath:"#/properties/interpretation/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err94];
}
else {
vErrors.push(err94);
}
errors++;
}
var _valid8 = _errs83 === errors;
valid17 = valid17 || _valid8;
if(!valid17){
const err95 = {instancePath:instancePath+"/interpretation",schemaPath:"#/properties/interpretation/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err95];
}
else {
vErrors.push(err95);
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
if(data.uncertain !== undefined){
if(typeof data.uncertain !== "boolean"){
const err96 = {instancePath:instancePath+"/uncertain",schemaPath:"#/properties/uncertain/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err96];
}
else {
vErrors.push(err96);
}
errors++;
}
}
}
else {
const err97 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err97];
}
else {
vErrors.push(err97);
}
errors++;
}
validate69.errors = vErrors;
return errors === 0;
}
validate69.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema92 = {"type":"object","properties":{"visitId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"caseRunId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"room":{"type":"string","enum":["SC.ST","SC.CY","SC.WK","SC.MD"]},"topic":{"type":"string","enum":["where-loop","cancellation","recording","story-plan"]},"loopMode":{"type":"string","enum":["standby","following","docked","projecting"]},"caddyHost":{"type":"string","enum":["MD.RACK.STATION","ACT.PLAYER","ST.RACK.BAY"]},"arrangementRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"order":{"$ref":"#/$defs/Order"},"puppet":{"$ref":"#/$defs/Puppet"},"runId":{"anyOf":[{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},{"type":"null"}]},"nextCue":{"type":"integer","minimum":0,"maximum":4},"runStatus":{"type":"string","enum":["none","running","paused","finalized"]},"certified":{"type":"boolean"},"premiered":{"type":"boolean"},"exposedRefs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"availableAccesses":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"observedOutcomeRefs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"selectedRefs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":2,"uniqueItems":true},"priorHelp":{"type":"array","items":{"type":"object","properties":{"moveId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"refs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"level":{"type":"integer","minimum":1,"maximum":4}},"required":["moveId","refs","level"],"additionalProperties":false},"maxItems":16},"introducedFacts":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"explanationRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"theoryRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"observedOutcomes":{"type":"array","maxItems":16,"items":{"type":"object","properties":{"refId":{"type":"string","pattern":"^OBS\\.[A-Za-z0-9._:-]+$"},"tile":{"type":"string","enum":["TILE.FERRY","TILE.BRIDGE","TILE.PLANT","TILE.BLOOM"]},"from":{"$ref":"#/$defs/Puppet"},"to":{"$ref":"#/$defs/Puppet"},"result":{"type":"string","enum":["changed","noop","unmet"]}},"required":["refId","tile","from","to","result"],"additionalProperties":false}}},"required":["visitId","caseRunId","revision","room","topic","loopMode","caddyHost","arrangementRevision","order","puppet","runId","nextCue","runStatus","certified","premiered","exposedRefs","availableAccesses","observedOutcomeRefs","selectedRefs","priorHelp","introducedFacts","explanationRevision","theoryRevision","observedOutcomes"],"additionalProperties":false};
const pattern91 = new RegExp("^OBS\\.[A-Za-z0-9._:-]+$", "u");

function validate71(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate71.evaluated;
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
if(!(func1.call(schema92.properties, key0))){
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
if(!pattern44.test(data0)){
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
if(!pattern44.test(data1)){
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
const err35 = {instancePath:instancePath+"/room",schemaPath:"#/properties/room/enum",keyword:"enum",params:{allowedValues: schema92.properties.room.enum},message:"must be equal to one of the allowed values"};
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
const err37 = {instancePath:instancePath+"/topic",schemaPath:"#/properties/topic/enum",keyword:"enum",params:{allowedValues: schema92.properties.topic.enum},message:"must be equal to one of the allowed values"};
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
const err39 = {instancePath:instancePath+"/loopMode",schemaPath:"#/properties/loopMode/enum",keyword:"enum",params:{allowedValues: schema92.properties.loopMode.enum},message:"must be equal to one of the allowed values"};
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
const err41 = {instancePath:instancePath+"/caddyHost",schemaPath:"#/properties/caddyHost/enum",keyword:"enum",params:{allowedValues: schema92.properties.caddyHost.enum},message:"must be equal to one of the allowed values"};
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
let data8 = data.order;
if(Array.isArray(data8)){
if(data8.length > 4){
const err45 = {instancePath:instancePath+"/order",schemaPath:"#/$defs/Order/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
const len0 = data8.length;
for(let i0=0; i0<len0; i0++){
let data9 = data8[i0];
if(typeof data9 !== "string"){
const err46 = {instancePath:instancePath+"/order/" + i0,schemaPath:"#/$defs/Order/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
if(!((((data9 === "TILE.FERRY") || (data9 === "TILE.BRIDGE")) || (data9 === "TILE.PLANT")) || (data9 === "TILE.BLOOM"))){
const err47 = {instancePath:instancePath+"/order/" + i0,schemaPath:"#/$defs/Order/items/enum",keyword:"enum",params:{allowedValues: schema70.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
}
let i1 = data8.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data8[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err48 = {instancePath:instancePath+"/order",schemaPath:"#/$defs/Order/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err49 = {instancePath:instancePath+"/order",schemaPath:"#/$defs/Order/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
}
if(data.puppet !== undefined){
let data10 = data.puppet;
if(data10 && typeof data10 == "object" && !Array.isArray(data10)){
if(data10.pip === undefined){
const err50 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "pip"},message:"must have required property '"+"pip"+"'"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
if(data10.seed === undefined){
const err51 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "seed"},message:"must have required property '"+"seed"+"'"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
if(data10.boats === undefined){
const err52 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "boats"},message:"must have required property '"+"boats"+"'"};
if(vErrors === null){
vErrors = [err52];
}
else {
vErrors.push(err52);
}
errors++;
}
if(data10.lit === undefined){
const err53 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "lit"},message:"must have required property '"+"lit"+"'"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
for(const key1 in data10){
if(!((((key1 === "pip") || (key1 === "seed")) || (key1 === "boats")) || (key1 === "lit"))){
const err54 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
}
}
if(data10.pip !== undefined){
let data11 = data10.pip;
if(typeof data11 !== "string"){
const err55 = {instancePath:instancePath+"/puppet/pip",schemaPath:"#/$defs/Puppet/properties/pip/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err55];
}
else {
vErrors.push(err55);
}
errors++;
}
if(!((data11 === "left") || (data11 === "right"))){
const err56 = {instancePath:instancePath+"/puppet/pip",schemaPath:"#/$defs/Puppet/properties/pip/enum",keyword:"enum",params:{allowedValues: schema77.properties.pip.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err56];
}
else {
vErrors.push(err56);
}
errors++;
}
}
if(data10.seed !== undefined){
let data12 = data10.seed;
if(typeof data12 !== "string"){
const err57 = {instancePath:instancePath+"/puppet/seed",schemaPath:"#/$defs/Puppet/properties/seed/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err57];
}
else {
vErrors.push(err57);
}
errors++;
}
if(!(((data12 === "left") || (data12 === "right")) || (data12 === "soil"))){
const err58 = {instancePath:instancePath+"/puppet/seed",schemaPath:"#/$defs/Puppet/properties/seed/enum",keyword:"enum",params:{allowedValues: schema77.properties.seed.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err58];
}
else {
vErrors.push(err58);
}
errors++;
}
}
if(data10.boats !== undefined){
let data13 = data10.boats;
if(typeof data13 !== "string"){
const err59 = {instancePath:instancePath+"/puppet/boats",schemaPath:"#/$defs/Puppet/properties/boats/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err59];
}
else {
vErrors.push(err59);
}
errors++;
}
if(!((data13 === "separate") || (data13 === "joined"))){
const err60 = {instancePath:instancePath+"/puppet/boats",schemaPath:"#/$defs/Puppet/properties/boats/enum",keyword:"enum",params:{allowedValues: schema77.properties.boats.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err60];
}
else {
vErrors.push(err60);
}
errors++;
}
}
if(data10.lit !== undefined){
if(typeof data10.lit !== "boolean"){
const err61 = {instancePath:instancePath+"/puppet/lit",schemaPath:"#/$defs/Puppet/properties/lit/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err61];
}
else {
vErrors.push(err61);
}
errors++;
}
}
}
else {
const err62 = {instancePath:instancePath+"/puppet",schemaPath:"#/$defs/Puppet/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err62];
}
else {
vErrors.push(err62);
}
errors++;
}
}
if(data.runId !== undefined){
let data15 = data.runId;
const _errs36 = errors;
let valid7 = false;
const _errs37 = errors;
if(typeof data15 === "string"){
if(func2(data15) > 36){
const err63 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err63];
}
else {
vErrors.push(err63);
}
errors++;
}
if(!pattern44.test(data15)){
const err64 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err64];
}
else {
vErrors.push(err64);
}
errors++;
}
}
else {
const err65 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err65];
}
else {
vErrors.push(err65);
}
errors++;
}
var _valid0 = _errs37 === errors;
valid7 = valid7 || _valid0;
const _errs39 = errors;
if(data15 !== null){
const err66 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err66];
}
else {
vErrors.push(err66);
}
errors++;
}
var _valid0 = _errs39 === errors;
valid7 = valid7 || _valid0;
if(!valid7){
const err67 = {instancePath:instancePath+"/runId",schemaPath:"#/properties/runId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err67];
}
else {
vErrors.push(err67);
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
if(data.nextCue !== undefined){
let data16 = data.nextCue;
if(!(((typeof data16 == "number") && (!(data16 % 1) && !isNaN(data16))) && (isFinite(data16)))){
const err68 = {instancePath:instancePath+"/nextCue",schemaPath:"#/properties/nextCue/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err68];
}
else {
vErrors.push(err68);
}
errors++;
}
if((typeof data16 == "number") && (isFinite(data16))){
if(data16 > 4 || isNaN(data16)){
const err69 = {instancePath:instancePath+"/nextCue",schemaPath:"#/properties/nextCue/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4},message:"must be <= 4"};
if(vErrors === null){
vErrors = [err69];
}
else {
vErrors.push(err69);
}
errors++;
}
if(data16 < 0 || isNaN(data16)){
const err70 = {instancePath:instancePath+"/nextCue",schemaPath:"#/properties/nextCue/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err70];
}
else {
vErrors.push(err70);
}
errors++;
}
}
}
if(data.runStatus !== undefined){
let data17 = data.runStatus;
if(typeof data17 !== "string"){
const err71 = {instancePath:instancePath+"/runStatus",schemaPath:"#/properties/runStatus/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err71];
}
else {
vErrors.push(err71);
}
errors++;
}
if(!((((data17 === "none") || (data17 === "running")) || (data17 === "paused")) || (data17 === "finalized"))){
const err72 = {instancePath:instancePath+"/runStatus",schemaPath:"#/properties/runStatus/enum",keyword:"enum",params:{allowedValues: schema92.properties.runStatus.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err72];
}
else {
vErrors.push(err72);
}
errors++;
}
}
if(data.certified !== undefined){
if(typeof data.certified !== "boolean"){
const err73 = {instancePath:instancePath+"/certified",schemaPath:"#/properties/certified/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err73];
}
else {
vErrors.push(err73);
}
errors++;
}
}
if(data.premiered !== undefined){
if(typeof data.premiered !== "boolean"){
const err74 = {instancePath:instancePath+"/premiered",schemaPath:"#/properties/premiered/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err74];
}
else {
vErrors.push(err74);
}
errors++;
}
}
if(data.exposedRefs !== undefined){
let data20 = data.exposedRefs;
if(Array.isArray(data20)){
if(data20.length > 64){
const err75 = {instancePath:instancePath+"/exposedRefs",schemaPath:"#/properties/exposedRefs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err75];
}
else {
vErrors.push(err75);
}
errors++;
}
const len1 = data20.length;
for(let i2=0; i2<len1; i2++){
let data21 = data20[i2];
if(typeof data21 === "string"){
if(func2(data21) > 160){
const err76 = {instancePath:instancePath+"/exposedRefs/" + i2,schemaPath:"#/properties/exposedRefs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err76];
}
else {
vErrors.push(err76);
}
errors++;
}
if(!pattern4.test(data21)){
const err77 = {instancePath:instancePath+"/exposedRefs/" + i2,schemaPath:"#/properties/exposedRefs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
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
const err78 = {instancePath:instancePath+"/exposedRefs/" + i2,schemaPath:"#/properties/exposedRefs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err78];
}
else {
vErrors.push(err78);
}
errors++;
}
}
let i3 = data20.length;
let j1;
if(i3 > 1){
const indices1 = {};
for(;i3--;){
let item1 = data20[i3];
if(typeof item1 !== "string"){
continue;
}
if(typeof indices1[item1] == "number"){
j1 = indices1[item1];
const err79 = {instancePath:instancePath+"/exposedRefs",schemaPath:"#/properties/exposedRefs/uniqueItems",keyword:"uniqueItems",params:{i: i3, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i3+" are identical)"};
if(vErrors === null){
vErrors = [err79];
}
else {
vErrors.push(err79);
}
errors++;
break;
}
indices1[item1] = i3;
}
}
}
else {
const err80 = {instancePath:instancePath+"/exposedRefs",schemaPath:"#/properties/exposedRefs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err80];
}
else {
vErrors.push(err80);
}
errors++;
}
}
if(data.availableAccesses !== undefined){
let data22 = data.availableAccesses;
if(Array.isArray(data22)){
if(data22.length > 64){
const err81 = {instancePath:instancePath+"/availableAccesses",schemaPath:"#/properties/availableAccesses/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err81];
}
else {
vErrors.push(err81);
}
errors++;
}
const len2 = data22.length;
for(let i4=0; i4<len2; i4++){
let data23 = data22[i4];
if(typeof data23 === "string"){
if(func2(data23) > 160){
const err82 = {instancePath:instancePath+"/availableAccesses/" + i4,schemaPath:"#/properties/availableAccesses/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err82];
}
else {
vErrors.push(err82);
}
errors++;
}
if(!pattern4.test(data23)){
const err83 = {instancePath:instancePath+"/availableAccesses/" + i4,schemaPath:"#/properties/availableAccesses/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err83];
}
else {
vErrors.push(err83);
}
errors++;
}
}
else {
const err84 = {instancePath:instancePath+"/availableAccesses/" + i4,schemaPath:"#/properties/availableAccesses/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err84];
}
else {
vErrors.push(err84);
}
errors++;
}
}
let i5 = data22.length;
let j2;
if(i5 > 1){
const indices2 = {};
for(;i5--;){
let item2 = data22[i5];
if(typeof item2 !== "string"){
continue;
}
if(typeof indices2[item2] == "number"){
j2 = indices2[item2];
const err85 = {instancePath:instancePath+"/availableAccesses",schemaPath:"#/properties/availableAccesses/uniqueItems",keyword:"uniqueItems",params:{i: i5, j: j2},message:"must NOT have duplicate items (items ## "+j2+" and "+i5+" are identical)"};
if(vErrors === null){
vErrors = [err85];
}
else {
vErrors.push(err85);
}
errors++;
break;
}
indices2[item2] = i5;
}
}
}
else {
const err86 = {instancePath:instancePath+"/availableAccesses",schemaPath:"#/properties/availableAccesses/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err86];
}
else {
vErrors.push(err86);
}
errors++;
}
}
if(data.observedOutcomeRefs !== undefined){
let data24 = data.observedOutcomeRefs;
if(Array.isArray(data24)){
if(data24.length > 64){
const err87 = {instancePath:instancePath+"/observedOutcomeRefs",schemaPath:"#/properties/observedOutcomeRefs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err87];
}
else {
vErrors.push(err87);
}
errors++;
}
const len3 = data24.length;
for(let i6=0; i6<len3; i6++){
let data25 = data24[i6];
if(typeof data25 === "string"){
if(func2(data25) > 160){
const err88 = {instancePath:instancePath+"/observedOutcomeRefs/" + i6,schemaPath:"#/properties/observedOutcomeRefs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err88];
}
else {
vErrors.push(err88);
}
errors++;
}
if(!pattern4.test(data25)){
const err89 = {instancePath:instancePath+"/observedOutcomeRefs/" + i6,schemaPath:"#/properties/observedOutcomeRefs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err89];
}
else {
vErrors.push(err89);
}
errors++;
}
}
else {
const err90 = {instancePath:instancePath+"/observedOutcomeRefs/" + i6,schemaPath:"#/properties/observedOutcomeRefs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err90];
}
else {
vErrors.push(err90);
}
errors++;
}
}
let i7 = data24.length;
let j3;
if(i7 > 1){
const indices3 = {};
for(;i7--;){
let item3 = data24[i7];
if(typeof item3 !== "string"){
continue;
}
if(typeof indices3[item3] == "number"){
j3 = indices3[item3];
const err91 = {instancePath:instancePath+"/observedOutcomeRefs",schemaPath:"#/properties/observedOutcomeRefs/uniqueItems",keyword:"uniqueItems",params:{i: i7, j: j3},message:"must NOT have duplicate items (items ## "+j3+" and "+i7+" are identical)"};
if(vErrors === null){
vErrors = [err91];
}
else {
vErrors.push(err91);
}
errors++;
break;
}
indices3[item3] = i7;
}
}
}
else {
const err92 = {instancePath:instancePath+"/observedOutcomeRefs",schemaPath:"#/properties/observedOutcomeRefs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err92];
}
else {
vErrors.push(err92);
}
errors++;
}
}
if(data.selectedRefs !== undefined){
let data26 = data.selectedRefs;
if(Array.isArray(data26)){
if(data26.length > 2){
const err93 = {instancePath:instancePath+"/selectedRefs",schemaPath:"#/properties/selectedRefs/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err93];
}
else {
vErrors.push(err93);
}
errors++;
}
const len4 = data26.length;
for(let i8=0; i8<len4; i8++){
let data27 = data26[i8];
if(typeof data27 === "string"){
if(func2(data27) > 160){
const err94 = {instancePath:instancePath+"/selectedRefs/" + i8,schemaPath:"#/properties/selectedRefs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err94];
}
else {
vErrors.push(err94);
}
errors++;
}
if(!pattern4.test(data27)){
const err95 = {instancePath:instancePath+"/selectedRefs/" + i8,schemaPath:"#/properties/selectedRefs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err95];
}
else {
vErrors.push(err95);
}
errors++;
}
}
else {
const err96 = {instancePath:instancePath+"/selectedRefs/" + i8,schemaPath:"#/properties/selectedRefs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err96];
}
else {
vErrors.push(err96);
}
errors++;
}
}
let i9 = data26.length;
let j4;
if(i9 > 1){
const indices4 = {};
for(;i9--;){
let item4 = data26[i9];
if(typeof item4 !== "string"){
continue;
}
if(typeof indices4[item4] == "number"){
j4 = indices4[item4];
const err97 = {instancePath:instancePath+"/selectedRefs",schemaPath:"#/properties/selectedRefs/uniqueItems",keyword:"uniqueItems",params:{i: i9, j: j4},message:"must NOT have duplicate items (items ## "+j4+" and "+i9+" are identical)"};
if(vErrors === null){
vErrors = [err97];
}
else {
vErrors.push(err97);
}
errors++;
break;
}
indices4[item4] = i9;
}
}
}
else {
const err98 = {instancePath:instancePath+"/selectedRefs",schemaPath:"#/properties/selectedRefs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err98];
}
else {
vErrors.push(err98);
}
errors++;
}
}
if(data.priorHelp !== undefined){
let data28 = data.priorHelp;
if(Array.isArray(data28)){
if(data28.length > 16){
const err99 = {instancePath:instancePath+"/priorHelp",schemaPath:"#/properties/priorHelp/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err99];
}
else {
vErrors.push(err99);
}
errors++;
}
const len5 = data28.length;
for(let i10=0; i10<len5; i10++){
let data29 = data28[i10];
if(data29 && typeof data29 == "object" && !Array.isArray(data29)){
if(data29.moveId === undefined){
const err100 = {instancePath:instancePath+"/priorHelp/" + i10,schemaPath:"#/properties/priorHelp/items/required",keyword:"required",params:{missingProperty: "moveId"},message:"must have required property '"+"moveId"+"'"};
if(vErrors === null){
vErrors = [err100];
}
else {
vErrors.push(err100);
}
errors++;
}
if(data29.refs === undefined){
const err101 = {instancePath:instancePath+"/priorHelp/" + i10,schemaPath:"#/properties/priorHelp/items/required",keyword:"required",params:{missingProperty: "refs"},message:"must have required property '"+"refs"+"'"};
if(vErrors === null){
vErrors = [err101];
}
else {
vErrors.push(err101);
}
errors++;
}
if(data29.level === undefined){
const err102 = {instancePath:instancePath+"/priorHelp/" + i10,schemaPath:"#/properties/priorHelp/items/required",keyword:"required",params:{missingProperty: "level"},message:"must have required property '"+"level"+"'"};
if(vErrors === null){
vErrors = [err102];
}
else {
vErrors.push(err102);
}
errors++;
}
for(const key2 in data29){
if(!(((key2 === "moveId") || (key2 === "refs")) || (key2 === "level"))){
const err103 = {instancePath:instancePath+"/priorHelp/" + i10,schemaPath:"#/properties/priorHelp/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err103];
}
else {
vErrors.push(err103);
}
errors++;
}
}
if(data29.moveId !== undefined){
let data30 = data29.moveId;
if(typeof data30 === "string"){
if(func2(data30) > 160){
const err104 = {instancePath:instancePath+"/priorHelp/" + i10+"/moveId",schemaPath:"#/properties/priorHelp/items/properties/moveId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err104];
}
else {
vErrors.push(err104);
}
errors++;
}
if(!pattern4.test(data30)){
const err105 = {instancePath:instancePath+"/priorHelp/" + i10+"/moveId",schemaPath:"#/properties/priorHelp/items/properties/moveId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
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
const err106 = {instancePath:instancePath+"/priorHelp/" + i10+"/moveId",schemaPath:"#/properties/priorHelp/items/properties/moveId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err106];
}
else {
vErrors.push(err106);
}
errors++;
}
}
if(data29.refs !== undefined){
let data31 = data29.refs;
if(Array.isArray(data31)){
if(data31.length > 64){
const err107 = {instancePath:instancePath+"/priorHelp/" + i10+"/refs",schemaPath:"#/properties/priorHelp/items/properties/refs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err107];
}
else {
vErrors.push(err107);
}
errors++;
}
const len6 = data31.length;
for(let i11=0; i11<len6; i11++){
let data32 = data31[i11];
if(typeof data32 === "string"){
if(func2(data32) > 160){
const err108 = {instancePath:instancePath+"/priorHelp/" + i10+"/refs/" + i11,schemaPath:"#/properties/priorHelp/items/properties/refs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err108];
}
else {
vErrors.push(err108);
}
errors++;
}
if(!pattern4.test(data32)){
const err109 = {instancePath:instancePath+"/priorHelp/" + i10+"/refs/" + i11,schemaPath:"#/properties/priorHelp/items/properties/refs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err109];
}
else {
vErrors.push(err109);
}
errors++;
}
}
else {
const err110 = {instancePath:instancePath+"/priorHelp/" + i10+"/refs/" + i11,schemaPath:"#/properties/priorHelp/items/properties/refs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err110];
}
else {
vErrors.push(err110);
}
errors++;
}
}
let i12 = data31.length;
let j5;
if(i12 > 1){
const indices5 = {};
for(;i12--;){
let item5 = data31[i12];
if(typeof item5 !== "string"){
continue;
}
if(typeof indices5[item5] == "number"){
j5 = indices5[item5];
const err111 = {instancePath:instancePath+"/priorHelp/" + i10+"/refs",schemaPath:"#/properties/priorHelp/items/properties/refs/uniqueItems",keyword:"uniqueItems",params:{i: i12, j: j5},message:"must NOT have duplicate items (items ## "+j5+" and "+i12+" are identical)"};
if(vErrors === null){
vErrors = [err111];
}
else {
vErrors.push(err111);
}
errors++;
break;
}
indices5[item5] = i12;
}
}
}
else {
const err112 = {instancePath:instancePath+"/priorHelp/" + i10+"/refs",schemaPath:"#/properties/priorHelp/items/properties/refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err112];
}
else {
vErrors.push(err112);
}
errors++;
}
}
if(data29.level !== undefined){
let data33 = data29.level;
if(!(((typeof data33 == "number") && (!(data33 % 1) && !isNaN(data33))) && (isFinite(data33)))){
const err113 = {instancePath:instancePath+"/priorHelp/" + i10+"/level",schemaPath:"#/properties/priorHelp/items/properties/level/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err113];
}
else {
vErrors.push(err113);
}
errors++;
}
if((typeof data33 == "number") && (isFinite(data33))){
if(data33 > 4 || isNaN(data33)){
const err114 = {instancePath:instancePath+"/priorHelp/" + i10+"/level",schemaPath:"#/properties/priorHelp/items/properties/level/maximum",keyword:"maximum",params:{comparison: "<=", limit: 4},message:"must be <= 4"};
if(vErrors === null){
vErrors = [err114];
}
else {
vErrors.push(err114);
}
errors++;
}
if(data33 < 1 || isNaN(data33)){
const err115 = {instancePath:instancePath+"/priorHelp/" + i10+"/level",schemaPath:"#/properties/priorHelp/items/properties/level/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err115];
}
else {
vErrors.push(err115);
}
errors++;
}
}
}
}
else {
const err116 = {instancePath:instancePath+"/priorHelp/" + i10,schemaPath:"#/properties/priorHelp/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err116];
}
else {
vErrors.push(err116);
}
errors++;
}
}
}
else {
const err117 = {instancePath:instancePath+"/priorHelp",schemaPath:"#/properties/priorHelp/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err117];
}
else {
vErrors.push(err117);
}
errors++;
}
}
if(data.introducedFacts !== undefined){
let data34 = data.introducedFacts;
if(Array.isArray(data34)){
if(data34.length > 64){
const err118 = {instancePath:instancePath+"/introducedFacts",schemaPath:"#/properties/introducedFacts/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err118];
}
else {
vErrors.push(err118);
}
errors++;
}
const len7 = data34.length;
for(let i13=0; i13<len7; i13++){
let data35 = data34[i13];
if(typeof data35 === "string"){
if(func2(data35) > 160){
const err119 = {instancePath:instancePath+"/introducedFacts/" + i13,schemaPath:"#/properties/introducedFacts/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err119];
}
else {
vErrors.push(err119);
}
errors++;
}
if(!pattern4.test(data35)){
const err120 = {instancePath:instancePath+"/introducedFacts/" + i13,schemaPath:"#/properties/introducedFacts/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err120];
}
else {
vErrors.push(err120);
}
errors++;
}
}
else {
const err121 = {instancePath:instancePath+"/introducedFacts/" + i13,schemaPath:"#/properties/introducedFacts/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err121];
}
else {
vErrors.push(err121);
}
errors++;
}
}
let i14 = data34.length;
let j6;
if(i14 > 1){
const indices6 = {};
for(;i14--;){
let item6 = data34[i14];
if(typeof item6 !== "string"){
continue;
}
if(typeof indices6[item6] == "number"){
j6 = indices6[item6];
const err122 = {instancePath:instancePath+"/introducedFacts",schemaPath:"#/properties/introducedFacts/uniqueItems",keyword:"uniqueItems",params:{i: i14, j: j6},message:"must NOT have duplicate items (items ## "+j6+" and "+i14+" are identical)"};
if(vErrors === null){
vErrors = [err122];
}
else {
vErrors.push(err122);
}
errors++;
break;
}
indices6[item6] = i14;
}
}
}
else {
const err123 = {instancePath:instancePath+"/introducedFacts",schemaPath:"#/properties/introducedFacts/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err123];
}
else {
vErrors.push(err123);
}
errors++;
}
}
if(data.explanationRevision !== undefined){
let data36 = data.explanationRevision;
if(!(((typeof data36 == "number") && (!(data36 % 1) && !isNaN(data36))) && (isFinite(data36)))){
const err124 = {instancePath:instancePath+"/explanationRevision",schemaPath:"#/properties/explanationRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err124];
}
else {
vErrors.push(err124);
}
errors++;
}
if((typeof data36 == "number") && (isFinite(data36))){
if(data36 > 9007199254740991 || isNaN(data36)){
const err125 = {instancePath:instancePath+"/explanationRevision",schemaPath:"#/properties/explanationRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err125];
}
else {
vErrors.push(err125);
}
errors++;
}
if(data36 < 0 || isNaN(data36)){
const err126 = {instancePath:instancePath+"/explanationRevision",schemaPath:"#/properties/explanationRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
if(data.theoryRevision !== undefined){
let data37 = data.theoryRevision;
if(!(((typeof data37 == "number") && (!(data37 % 1) && !isNaN(data37))) && (isFinite(data37)))){
const err127 = {instancePath:instancePath+"/theoryRevision",schemaPath:"#/properties/theoryRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err127];
}
else {
vErrors.push(err127);
}
errors++;
}
if((typeof data37 == "number") && (isFinite(data37))){
if(data37 > 9007199254740991 || isNaN(data37)){
const err128 = {instancePath:instancePath+"/theoryRevision",schemaPath:"#/properties/theoryRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err128];
}
else {
vErrors.push(err128);
}
errors++;
}
if(data37 < 0 || isNaN(data37)){
const err129 = {instancePath:instancePath+"/theoryRevision",schemaPath:"#/properties/theoryRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err129];
}
else {
vErrors.push(err129);
}
errors++;
}
}
}
if(data.observedOutcomes !== undefined){
let data38 = data.observedOutcomes;
if(Array.isArray(data38)){
if(data38.length > 16){
const err130 = {instancePath:instancePath+"/observedOutcomes",schemaPath:"#/properties/observedOutcomes/maxItems",keyword:"maxItems",params:{limit: 16},message:"must NOT have more than 16 items"};
if(vErrors === null){
vErrors = [err130];
}
else {
vErrors.push(err130);
}
errors++;
}
const len8 = data38.length;
for(let i15=0; i15<len8; i15++){
let data39 = data38[i15];
if(data39 && typeof data39 == "object" && !Array.isArray(data39)){
if(data39.refId === undefined){
const err131 = {instancePath:instancePath+"/observedOutcomes/" + i15,schemaPath:"#/properties/observedOutcomes/items/required",keyword:"required",params:{missingProperty: "refId"},message:"must have required property '"+"refId"+"'"};
if(vErrors === null){
vErrors = [err131];
}
else {
vErrors.push(err131);
}
errors++;
}
if(data39.tile === undefined){
const err132 = {instancePath:instancePath+"/observedOutcomes/" + i15,schemaPath:"#/properties/observedOutcomes/items/required",keyword:"required",params:{missingProperty: "tile"},message:"must have required property '"+"tile"+"'"};
if(vErrors === null){
vErrors = [err132];
}
else {
vErrors.push(err132);
}
errors++;
}
if(data39.from === undefined){
const err133 = {instancePath:instancePath+"/observedOutcomes/" + i15,schemaPath:"#/properties/observedOutcomes/items/required",keyword:"required",params:{missingProperty: "from"},message:"must have required property '"+"from"+"'"};
if(vErrors === null){
vErrors = [err133];
}
else {
vErrors.push(err133);
}
errors++;
}
if(data39.to === undefined){
const err134 = {instancePath:instancePath+"/observedOutcomes/" + i15,schemaPath:"#/properties/observedOutcomes/items/required",keyword:"required",params:{missingProperty: "to"},message:"must have required property '"+"to"+"'"};
if(vErrors === null){
vErrors = [err134];
}
else {
vErrors.push(err134);
}
errors++;
}
if(data39.result === undefined){
const err135 = {instancePath:instancePath+"/observedOutcomes/" + i15,schemaPath:"#/properties/observedOutcomes/items/required",keyword:"required",params:{missingProperty: "result"},message:"must have required property '"+"result"+"'"};
if(vErrors === null){
vErrors = [err135];
}
else {
vErrors.push(err135);
}
errors++;
}
for(const key3 in data39){
if(!(((((key3 === "refId") || (key3 === "tile")) || (key3 === "from")) || (key3 === "to")) || (key3 === "result"))){
const err136 = {instancePath:instancePath+"/observedOutcomes/" + i15,schemaPath:"#/properties/observedOutcomes/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err136];
}
else {
vErrors.push(err136);
}
errors++;
}
}
if(data39.refId !== undefined){
let data40 = data39.refId;
if(typeof data40 === "string"){
if(!pattern91.test(data40)){
const err137 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/refId",schemaPath:"#/properties/observedOutcomes/items/properties/refId/pattern",keyword:"pattern",params:{pattern: "^OBS\\.[A-Za-z0-9._:-]+$"},message:"must match pattern \""+"^OBS\\.[A-Za-z0-9._:-]+$"+"\""};
if(vErrors === null){
vErrors = [err137];
}
else {
vErrors.push(err137);
}
errors++;
}
}
else {
const err138 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/refId",schemaPath:"#/properties/observedOutcomes/items/properties/refId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err138];
}
else {
vErrors.push(err138);
}
errors++;
}
}
if(data39.tile !== undefined){
let data41 = data39.tile;
if(typeof data41 !== "string"){
const err139 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/tile",schemaPath:"#/properties/observedOutcomes/items/properties/tile/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err139];
}
else {
vErrors.push(err139);
}
errors++;
}
if(!((((data41 === "TILE.FERRY") || (data41 === "TILE.BRIDGE")) || (data41 === "TILE.PLANT")) || (data41 === "TILE.BLOOM"))){
const err140 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/tile",schemaPath:"#/properties/observedOutcomes/items/properties/tile/enum",keyword:"enum",params:{allowedValues: schema92.properties.observedOutcomes.items.properties.tile.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err140];
}
else {
vErrors.push(err140);
}
errors++;
}
}
if(data39.from !== undefined){
let data42 = data39.from;
if(data42 && typeof data42 == "object" && !Array.isArray(data42)){
if(data42.pip === undefined){
const err141 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/from",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "pip"},message:"must have required property '"+"pip"+"'"};
if(vErrors === null){
vErrors = [err141];
}
else {
vErrors.push(err141);
}
errors++;
}
if(data42.seed === undefined){
const err142 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/from",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "seed"},message:"must have required property '"+"seed"+"'"};
if(vErrors === null){
vErrors = [err142];
}
else {
vErrors.push(err142);
}
errors++;
}
if(data42.boats === undefined){
const err143 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/from",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "boats"},message:"must have required property '"+"boats"+"'"};
if(vErrors === null){
vErrors = [err143];
}
else {
vErrors.push(err143);
}
errors++;
}
if(data42.lit === undefined){
const err144 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/from",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "lit"},message:"must have required property '"+"lit"+"'"};
if(vErrors === null){
vErrors = [err144];
}
else {
vErrors.push(err144);
}
errors++;
}
for(const key4 in data42){
if(!((((key4 === "pip") || (key4 === "seed")) || (key4 === "boats")) || (key4 === "lit"))){
const err145 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/from",schemaPath:"#/$defs/Puppet/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err145];
}
else {
vErrors.push(err145);
}
errors++;
}
}
if(data42.pip !== undefined){
let data43 = data42.pip;
if(typeof data43 !== "string"){
const err146 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/from/pip",schemaPath:"#/$defs/Puppet/properties/pip/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err146];
}
else {
vErrors.push(err146);
}
errors++;
}
if(!((data43 === "left") || (data43 === "right"))){
const err147 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/from/pip",schemaPath:"#/$defs/Puppet/properties/pip/enum",keyword:"enum",params:{allowedValues: schema77.properties.pip.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err147];
}
else {
vErrors.push(err147);
}
errors++;
}
}
if(data42.seed !== undefined){
let data44 = data42.seed;
if(typeof data44 !== "string"){
const err148 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/from/seed",schemaPath:"#/$defs/Puppet/properties/seed/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err148];
}
else {
vErrors.push(err148);
}
errors++;
}
if(!(((data44 === "left") || (data44 === "right")) || (data44 === "soil"))){
const err149 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/from/seed",schemaPath:"#/$defs/Puppet/properties/seed/enum",keyword:"enum",params:{allowedValues: schema77.properties.seed.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err149];
}
else {
vErrors.push(err149);
}
errors++;
}
}
if(data42.boats !== undefined){
let data45 = data42.boats;
if(typeof data45 !== "string"){
const err150 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/from/boats",schemaPath:"#/$defs/Puppet/properties/boats/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err150];
}
else {
vErrors.push(err150);
}
errors++;
}
if(!((data45 === "separate") || (data45 === "joined"))){
const err151 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/from/boats",schemaPath:"#/$defs/Puppet/properties/boats/enum",keyword:"enum",params:{allowedValues: schema77.properties.boats.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err151];
}
else {
vErrors.push(err151);
}
errors++;
}
}
if(data42.lit !== undefined){
if(typeof data42.lit !== "boolean"){
const err152 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/from/lit",schemaPath:"#/$defs/Puppet/properties/lit/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err152];
}
else {
vErrors.push(err152);
}
errors++;
}
}
}
else {
const err153 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/from",schemaPath:"#/$defs/Puppet/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err153];
}
else {
vErrors.push(err153);
}
errors++;
}
}
if(data39.to !== undefined){
let data47 = data39.to;
if(data47 && typeof data47 == "object" && !Array.isArray(data47)){
if(data47.pip === undefined){
const err154 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/to",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "pip"},message:"must have required property '"+"pip"+"'"};
if(vErrors === null){
vErrors = [err154];
}
else {
vErrors.push(err154);
}
errors++;
}
if(data47.seed === undefined){
const err155 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/to",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "seed"},message:"must have required property '"+"seed"+"'"};
if(vErrors === null){
vErrors = [err155];
}
else {
vErrors.push(err155);
}
errors++;
}
if(data47.boats === undefined){
const err156 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/to",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "boats"},message:"must have required property '"+"boats"+"'"};
if(vErrors === null){
vErrors = [err156];
}
else {
vErrors.push(err156);
}
errors++;
}
if(data47.lit === undefined){
const err157 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/to",schemaPath:"#/$defs/Puppet/required",keyword:"required",params:{missingProperty: "lit"},message:"must have required property '"+"lit"+"'"};
if(vErrors === null){
vErrors = [err157];
}
else {
vErrors.push(err157);
}
errors++;
}
for(const key5 in data47){
if(!((((key5 === "pip") || (key5 === "seed")) || (key5 === "boats")) || (key5 === "lit"))){
const err158 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/to",schemaPath:"#/$defs/Puppet/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err158];
}
else {
vErrors.push(err158);
}
errors++;
}
}
if(data47.pip !== undefined){
let data48 = data47.pip;
if(typeof data48 !== "string"){
const err159 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/to/pip",schemaPath:"#/$defs/Puppet/properties/pip/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err159];
}
else {
vErrors.push(err159);
}
errors++;
}
if(!((data48 === "left") || (data48 === "right"))){
const err160 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/to/pip",schemaPath:"#/$defs/Puppet/properties/pip/enum",keyword:"enum",params:{allowedValues: schema77.properties.pip.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err160];
}
else {
vErrors.push(err160);
}
errors++;
}
}
if(data47.seed !== undefined){
let data49 = data47.seed;
if(typeof data49 !== "string"){
const err161 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/to/seed",schemaPath:"#/$defs/Puppet/properties/seed/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err161];
}
else {
vErrors.push(err161);
}
errors++;
}
if(!(((data49 === "left") || (data49 === "right")) || (data49 === "soil"))){
const err162 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/to/seed",schemaPath:"#/$defs/Puppet/properties/seed/enum",keyword:"enum",params:{allowedValues: schema77.properties.seed.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err162];
}
else {
vErrors.push(err162);
}
errors++;
}
}
if(data47.boats !== undefined){
let data50 = data47.boats;
if(typeof data50 !== "string"){
const err163 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/to/boats",schemaPath:"#/$defs/Puppet/properties/boats/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err163];
}
else {
vErrors.push(err163);
}
errors++;
}
if(!((data50 === "separate") || (data50 === "joined"))){
const err164 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/to/boats",schemaPath:"#/$defs/Puppet/properties/boats/enum",keyword:"enum",params:{allowedValues: schema77.properties.boats.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err164];
}
else {
vErrors.push(err164);
}
errors++;
}
}
if(data47.lit !== undefined){
if(typeof data47.lit !== "boolean"){
const err165 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/to/lit",schemaPath:"#/$defs/Puppet/properties/lit/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err165];
}
else {
vErrors.push(err165);
}
errors++;
}
}
}
else {
const err166 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/to",schemaPath:"#/$defs/Puppet/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err166];
}
else {
vErrors.push(err166);
}
errors++;
}
}
if(data39.result !== undefined){
let data52 = data39.result;
if(typeof data52 !== "string"){
const err167 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/result",schemaPath:"#/properties/observedOutcomes/items/properties/result/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err167];
}
else {
vErrors.push(err167);
}
errors++;
}
if(!(((data52 === "changed") || (data52 === "noop")) || (data52 === "unmet"))){
const err168 = {instancePath:instancePath+"/observedOutcomes/" + i15+"/result",schemaPath:"#/properties/observedOutcomes/items/properties/result/enum",keyword:"enum",params:{allowedValues: schema92.properties.observedOutcomes.items.properties.result.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err168];
}
else {
vErrors.push(err168);
}
errors++;
}
}
}
else {
const err169 = {instancePath:instancePath+"/observedOutcomes/" + i15,schemaPath:"#/properties/observedOutcomes/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err169];
}
else {
vErrors.push(err169);
}
errors++;
}
}
}
else {
const err170 = {instancePath:instancePath+"/observedOutcomes",schemaPath:"#/properties/observedOutcomes/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err170];
}
else {
vErrors.push(err170);
}
errors++;
}
}
}
else {
const err171 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err171];
}
else {
vErrors.push(err171);
}
errors++;
}
validate71.errors = vErrors;
return errors === 0;
}
validate71.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema97 = {"type":"object","properties":{"moveId":{"type":"string","enum":["NOTICE_CONTEXT","NOTICE_SCOPE","CLIP_LIMIT","POSITIVE_SUPPORT","TESTABLE_LEAD","PLAN_VS_RESULT","FULL_PROMISE","BOAT_CAPACITY","TOGETHER","ROOT_CONDITION","VALID_DIRECT","VALID_EXTRA","ARRANGEMENT_ONLY","CLARIFY","NARROW_CLAIM","UNKNOWN_DETAIL","RETURN_TO_CASE"]},"interpretation":{"$ref":"#/$defs/InterpretationTag"},"refs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"uncertain":{"type":"boolean"}},"required":["moveId","interpretation","refs","uncertain"],"additionalProperties":false};

function validate73(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate73.evaluated;
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
const err6 = {instancePath:instancePath+"/moveId",schemaPath:"#/properties/moveId/enum",keyword:"enum",params:{allowedValues: schema97.properties.moveId.enum},message:"must be equal to one of the allowed values"};
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
let data1 = data.interpretation;
if(typeof data1 !== "string"){
const err7 = {instancePath:instancePath+"/interpretation",schemaPath:"#/$defs/InterpretationTag/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(!((((((((data1 === "scope_confusion") || (data1 === "unsupported_destination")) || (data1 === "goal_incomplete")) || (data1 === "capacity")) || (data1 === "prerequisite")) || (data1 === "valid_plan")) || (data1 === "unclear")) || (data1 === "off_topic"))){
const err8 = {instancePath:instancePath+"/interpretation",schemaPath:"#/$defs/InterpretationTag/enum",keyword:"enum",params:{allowedValues: schema60.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.refs !== undefined){
let data2 = data.refs;
if(Array.isArray(data2)){
if(data2.length > 64){
const err9 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
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
let data3 = data2[i0];
if(typeof data3 === "string"){
if(func2(data3) > 160){
const err10 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(!pattern4.test(data3)){
const err11 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
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
const err12 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
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
const err13 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err14 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.uncertain !== undefined){
if(typeof data.uncertain !== "boolean"){
const err15 = {instancePath:instancePath+"/uncertain",schemaPath:"#/properties/uncertain/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
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
const err16 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
validate73.errors = vErrors;
return errors === 0;
}
validate73.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


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
if(!(func1.call(schema66.properties, key0))){
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
if(!pattern44.test(data0)){
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
if(!(validate56(data.physical, {instancePath:instancePath+"/physical",parentData:data,parentDataProperty:"physical",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate56.errors : vErrors.concat(validate56.errors);
errors = vErrors.length;
}
}
if(data.grants !== undefined){
let data4 = data.grants;
if(Array.isArray(data4)){
const len0 = data4.length;
for(let i0=0; i0<len0; i0++){
let data5 = data4[i0];
if(data5 && typeof data5 == "object" && !Array.isArray(data5)){
if(data5.sourceId === undefined){
const err33 = {instancePath:instancePath+"/grants/" + i0,schemaPath:"#/$defs/Grant/required",keyword:"required",params:{missingProperty: "sourceId"},message:"must have required property '"+"sourceId"+"'"};
if(vErrors === null){
vErrors = [err33];
}
else {
vErrors.push(err33);
}
errors++;
}
if(data5.refs === undefined){
const err34 = {instancePath:instancePath+"/grants/" + i0,schemaPath:"#/$defs/Grant/required",keyword:"required",params:{missingProperty: "refs"},message:"must have required property '"+"refs"+"'"};
if(vErrors === null){
vErrors = [err34];
}
else {
vErrors.push(err34);
}
errors++;
}
if(data5.viaAccessId === undefined){
const err35 = {instancePath:instancePath+"/grants/" + i0,schemaPath:"#/$defs/Grant/required",keyword:"required",params:{missingProperty: "viaAccessId"},message:"must have required property '"+"viaAccessId"+"'"};
if(vErrors === null){
vErrors = [err35];
}
else {
vErrors.push(err35);
}
errors++;
}
if(data5.seq === undefined){
const err36 = {instancePath:instancePath+"/grants/" + i0,schemaPath:"#/$defs/Grant/required",keyword:"required",params:{missingProperty: "seq"},message:"must have required property '"+"seq"+"'"};
if(vErrors === null){
vErrors = [err36];
}
else {
vErrors.push(err36);
}
errors++;
}
for(const key1 in data5){
if(!((((key1 === "sourceId") || (key1 === "refs")) || (key1 === "viaAccessId")) || (key1 === "seq"))){
const err37 = {instancePath:instancePath+"/grants/" + i0,schemaPath:"#/$defs/Grant/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
}
if(data5.sourceId !== undefined){
let data6 = data5.sourceId;
if(typeof data6 === "string"){
if(func2(data6) > 160){
const err38 = {instancePath:instancePath+"/grants/" + i0+"/sourceId",schemaPath:"#/$defs/Grant/properties/sourceId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
if(!pattern4.test(data6)){
const err39 = {instancePath:instancePath+"/grants/" + i0+"/sourceId",schemaPath:"#/$defs/Grant/properties/sourceId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
else {
const err40 = {instancePath:instancePath+"/grants/" + i0+"/sourceId",schemaPath:"#/$defs/Grant/properties/sourceId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
}
if(data5.refs !== undefined){
let data7 = data5.refs;
if(Array.isArray(data7)){
if(data7.length > 64){
const err41 = {instancePath:instancePath+"/grants/" + i0+"/refs",schemaPath:"#/$defs/Grant/properties/refs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
const len1 = data7.length;
for(let i1=0; i1<len1; i1++){
let data8 = data7[i1];
if(typeof data8 === "string"){
if(func2(data8) > 160){
const err42 = {instancePath:instancePath+"/grants/" + i0+"/refs/" + i1,schemaPath:"#/$defs/Grant/properties/refs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
if(!pattern4.test(data8)){
const err43 = {instancePath:instancePath+"/grants/" + i0+"/refs/" + i1,schemaPath:"#/$defs/Grant/properties/refs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
}
else {
const err44 = {instancePath:instancePath+"/grants/" + i0+"/refs/" + i1,schemaPath:"#/$defs/Grant/properties/refs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
}
let i2 = data7.length;
let j0;
if(i2 > 1){
const indices0 = {};
for(;i2--;){
let item0 = data7[i2];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err45 = {instancePath:instancePath+"/grants/" + i0+"/refs",schemaPath:"#/$defs/Grant/properties/refs/uniqueItems",keyword:"uniqueItems",params:{i: i2, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i2+" are identical)"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
break;
}
indices0[item0] = i2;
}
}
}
else {
const err46 = {instancePath:instancePath+"/grants/" + i0+"/refs",schemaPath:"#/$defs/Grant/properties/refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
}
if(data5.viaAccessId !== undefined){
let data9 = data5.viaAccessId;
if(typeof data9 === "string"){
if(func2(data9) > 160){
const err47 = {instancePath:instancePath+"/grants/" + i0+"/viaAccessId",schemaPath:"#/$defs/Grant/properties/viaAccessId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
if(!pattern4.test(data9)){
const err48 = {instancePath:instancePath+"/grants/" + i0+"/viaAccessId",schemaPath:"#/$defs/Grant/properties/viaAccessId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
}
else {
const err49 = {instancePath:instancePath+"/grants/" + i0+"/viaAccessId",schemaPath:"#/$defs/Grant/properties/viaAccessId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
}
if(data5.seq !== undefined){
let data10 = data5.seq;
if(!(((typeof data10 == "number") && (!(data10 % 1) && !isNaN(data10))) && (isFinite(data10)))){
const err50 = {instancePath:instancePath+"/grants/" + i0+"/seq",schemaPath:"#/$defs/Grant/properties/seq/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
}
errors++;
}
if((typeof data10 == "number") && (isFinite(data10))){
if(data10 > 9007199254740991 || isNaN(data10)){
const err51 = {instancePath:instancePath+"/grants/" + i0+"/seq",schemaPath:"#/$defs/Grant/properties/seq/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
if(data10 < 0 || isNaN(data10)){
const err52 = {instancePath:instancePath+"/grants/" + i0+"/seq",schemaPath:"#/$defs/Grant/properties/seq/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
}
else {
const err53 = {instancePath:instancePath+"/grants/" + i0,schemaPath:"#/$defs/Grant/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
}
}
else {
const err54 = {instancePath:instancePath+"/grants",schemaPath:"#/properties/grants/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
}
}
if(data.exposures !== undefined){
let data11 = data.exposures;
if(Array.isArray(data11)){
const len2 = data11.length;
for(let i3=0; i3<len2; i3++){
if(!(validate58(data11[i3], {instancePath:instancePath+"/exposures/" + i3,parentData:data11,parentDataProperty:i3,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate58.errors : vErrors.concat(validate58.errors);
errors = vErrors.length;
}
}
}
else {
const err55 = {instancePath:instancePath+"/exposures",schemaPath:"#/properties/exposures/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err55];
}
else {
vErrors.push(err55);
}
errors++;
}
}
if(data.selectedLead !== undefined){
let data13 = data.selectedLead;
const _errs29 = errors;
let valid10 = false;
const _errs30 = errors;
if(typeof data13 !== "string"){
const err56 = {instancePath:instancePath+"/selectedLead",schemaPath:"#/properties/selectedLead/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err56];
}
else {
vErrors.push(err56);
}
errors++;
}
if(!((((data13 === "where-loop") || (data13 === "cancellation")) || (data13 === "recording")) || (data13 === "story-plan"))){
const err57 = {instancePath:instancePath+"/selectedLead",schemaPath:"#/properties/selectedLead/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema66.properties.selectedLead.anyOf[0].enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err57];
}
else {
vErrors.push(err57);
}
errors++;
}
var _valid0 = _errs30 === errors;
valid10 = valid10 || _valid0;
const _errs32 = errors;
if(data13 !== null){
const err58 = {instancePath:instancePath+"/selectedLead",schemaPath:"#/properties/selectedLead/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err58];
}
else {
vErrors.push(err58);
}
errors++;
}
var _valid0 = _errs32 === errors;
valid10 = valid10 || _valid0;
if(!valid10){
const err59 = {instancePath:instancePath+"/selectedLead",schemaPath:"#/properties/selectedLead/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err59];
}
else {
vErrors.push(err59);
}
errors++;
}
else {
errors = _errs29;
if(vErrors !== null){
if(_errs29){
vErrors.length = _errs29;
}
else {
vErrors = null;
}
}
}
}
if(data.comparisons !== undefined){
let data14 = data.comparisons;
if(Array.isArray(data14)){
const len3 = data14.length;
for(let i4=0; i4<len3; i4++){
let data15 = data14[i4];
if(data15 && typeof data15 == "object" && !Array.isArray(data15)){
if(data15.id === undefined){
const err60 = {instancePath:instancePath+"/comparisons/" + i4,schemaPath:"#/$defs/Comparison/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err60];
}
else {
vErrors.push(err60);
}
errors++;
}
if(data15.leftRef === undefined){
const err61 = {instancePath:instancePath+"/comparisons/" + i4,schemaPath:"#/$defs/Comparison/required",keyword:"required",params:{missingProperty: "leftRef"},message:"must have required property '"+"leftRef"+"'"};
if(vErrors === null){
vErrors = [err61];
}
else {
vErrors.push(err61);
}
errors++;
}
if(data15.rightRef === undefined){
const err62 = {instancePath:instancePath+"/comparisons/" + i4,schemaPath:"#/$defs/Comparison/required",keyword:"required",params:{missingProperty: "rightRef"},message:"must have required property '"+"rightRef"+"'"};
if(vErrors === null){
vErrors = [err62];
}
else {
vErrors.push(err62);
}
errors++;
}
if(data15.relationship === undefined){
const err63 = {instancePath:instancePath+"/comparisons/" + i4,schemaPath:"#/$defs/Comparison/required",keyword:"required",params:{missingProperty: "relationship"},message:"must have required property '"+"relationship"+"'"};
if(vErrors === null){
vErrors = [err63];
}
else {
vErrors.push(err63);
}
errors++;
}
if(data15.note === undefined){
const err64 = {instancePath:instancePath+"/comparisons/" + i4,schemaPath:"#/$defs/Comparison/required",keyword:"required",params:{missingProperty: "note"},message:"must have required property '"+"note"+"'"};
if(vErrors === null){
vErrors = [err64];
}
else {
vErrors.push(err64);
}
errors++;
}
if(data15.recordedSeq === undefined){
const err65 = {instancePath:instancePath+"/comparisons/" + i4,schemaPath:"#/$defs/Comparison/required",keyword:"required",params:{missingProperty: "recordedSeq"},message:"must have required property '"+"recordedSeq"+"'"};
if(vErrors === null){
vErrors = [err65];
}
else {
vErrors.push(err65);
}
errors++;
}
for(const key2 in data15){
if(!((((((key2 === "id") || (key2 === "leftRef")) || (key2 === "rightRef")) || (key2 === "relationship")) || (key2 === "note")) || (key2 === "recordedSeq"))){
const err66 = {instancePath:instancePath+"/comparisons/" + i4,schemaPath:"#/$defs/Comparison/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err66];
}
else {
vErrors.push(err66);
}
errors++;
}
}
if(data15.id !== undefined){
let data16 = data15.id;
if(typeof data16 === "string"){
if(func2(data16) > 36){
const err67 = {instancePath:instancePath+"/comparisons/" + i4+"/id",schemaPath:"#/$defs/Comparison/properties/id/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err67];
}
else {
vErrors.push(err67);
}
errors++;
}
if(!pattern44.test(data16)){
const err68 = {instancePath:instancePath+"/comparisons/" + i4+"/id",schemaPath:"#/$defs/Comparison/properties/id/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err68];
}
else {
vErrors.push(err68);
}
errors++;
}
}
else {
const err69 = {instancePath:instancePath+"/comparisons/" + i4+"/id",schemaPath:"#/$defs/Comparison/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err69];
}
else {
vErrors.push(err69);
}
errors++;
}
}
if(data15.leftRef !== undefined){
let data17 = data15.leftRef;
const _errs43 = errors;
let valid15 = false;
const _errs44 = errors;
if(typeof data17 === "string"){
if(func2(data17) > 160){
const err70 = {instancePath:instancePath+"/comparisons/" + i4+"/leftRef",schemaPath:"#/$defs/Comparison/properties/leftRef/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err70];
}
else {
vErrors.push(err70);
}
errors++;
}
if(!pattern4.test(data17)){
const err71 = {instancePath:instancePath+"/comparisons/" + i4+"/leftRef",schemaPath:"#/$defs/Comparison/properties/leftRef/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
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
const err72 = {instancePath:instancePath+"/comparisons/" + i4+"/leftRef",schemaPath:"#/$defs/Comparison/properties/leftRef/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err72];
}
else {
vErrors.push(err72);
}
errors++;
}
var _valid1 = _errs44 === errors;
valid15 = valid15 || _valid1;
const _errs46 = errors;
if(data17 !== null){
const err73 = {instancePath:instancePath+"/comparisons/" + i4+"/leftRef",schemaPath:"#/$defs/Comparison/properties/leftRef/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err73];
}
else {
vErrors.push(err73);
}
errors++;
}
var _valid1 = _errs46 === errors;
valid15 = valid15 || _valid1;
if(!valid15){
const err74 = {instancePath:instancePath+"/comparisons/" + i4+"/leftRef",schemaPath:"#/$defs/Comparison/properties/leftRef/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err74];
}
else {
vErrors.push(err74);
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
if(data15.rightRef !== undefined){
let data18 = data15.rightRef;
const _errs49 = errors;
let valid16 = false;
const _errs50 = errors;
if(typeof data18 === "string"){
if(func2(data18) > 160){
const err75 = {instancePath:instancePath+"/comparisons/" + i4+"/rightRef",schemaPath:"#/$defs/Comparison/properties/rightRef/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err75];
}
else {
vErrors.push(err75);
}
errors++;
}
if(!pattern4.test(data18)){
const err76 = {instancePath:instancePath+"/comparisons/" + i4+"/rightRef",schemaPath:"#/$defs/Comparison/properties/rightRef/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err76];
}
else {
vErrors.push(err76);
}
errors++;
}
}
else {
const err77 = {instancePath:instancePath+"/comparisons/" + i4+"/rightRef",schemaPath:"#/$defs/Comparison/properties/rightRef/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err77];
}
else {
vErrors.push(err77);
}
errors++;
}
var _valid2 = _errs50 === errors;
valid16 = valid16 || _valid2;
const _errs52 = errors;
if(data18 !== null){
const err78 = {instancePath:instancePath+"/comparisons/" + i4+"/rightRef",schemaPath:"#/$defs/Comparison/properties/rightRef/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err78];
}
else {
vErrors.push(err78);
}
errors++;
}
var _valid2 = _errs52 === errors;
valid16 = valid16 || _valid2;
if(!valid16){
const err79 = {instancePath:instancePath+"/comparisons/" + i4+"/rightRef",schemaPath:"#/$defs/Comparison/properties/rightRef/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err79];
}
else {
vErrors.push(err79);
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
if(data15.relationship !== undefined){
let data19 = data15.relationship;
const _errs55 = errors;
let valid17 = false;
const _errs56 = errors;
if(typeof data19 !== "string"){
const err80 = {instancePath:instancePath+"/comparisons/" + i4+"/relationship",schemaPath:"#/$defs/Comparison/properties/relationship/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err80];
}
else {
vErrors.push(err80);
}
errors++;
}
if(!(((data19 === "supports") || (data19 === "conflicts-with")) || (data19 === "happened-before"))){
const err81 = {instancePath:instancePath+"/comparisons/" + i4+"/relationship",schemaPath:"#/$defs/Comparison/properties/relationship/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema74.properties.relationship.anyOf[0].enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err81];
}
else {
vErrors.push(err81);
}
errors++;
}
var _valid3 = _errs56 === errors;
valid17 = valid17 || _valid3;
const _errs58 = errors;
if(data19 !== null){
const err82 = {instancePath:instancePath+"/comparisons/" + i4+"/relationship",schemaPath:"#/$defs/Comparison/properties/relationship/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err82];
}
else {
vErrors.push(err82);
}
errors++;
}
var _valid3 = _errs58 === errors;
valid17 = valid17 || _valid3;
if(!valid17){
const err83 = {instancePath:instancePath+"/comparisons/" + i4+"/relationship",schemaPath:"#/$defs/Comparison/properties/relationship/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err83];
}
else {
vErrors.push(err83);
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
if(data15.note !== undefined){
if(typeof data15.note !== "string"){
const err84 = {instancePath:instancePath+"/comparisons/" + i4+"/note",schemaPath:"#/$defs/Comparison/properties/note/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err84];
}
else {
vErrors.push(err84);
}
errors++;
}
}
if(data15.recordedSeq !== undefined){
let data21 = data15.recordedSeq;
const _errs63 = errors;
let valid18 = false;
const _errs64 = errors;
if(!(((typeof data21 == "number") && (!(data21 % 1) && !isNaN(data21))) && (isFinite(data21)))){
const err85 = {instancePath:instancePath+"/comparisons/" + i4+"/recordedSeq",schemaPath:"#/$defs/Comparison/properties/recordedSeq/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err85];
}
else {
vErrors.push(err85);
}
errors++;
}
if((typeof data21 == "number") && (isFinite(data21))){
if(data21 > 9007199254740991 || isNaN(data21)){
const err86 = {instancePath:instancePath+"/comparisons/" + i4+"/recordedSeq",schemaPath:"#/$defs/Comparison/properties/recordedSeq/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err86];
}
else {
vErrors.push(err86);
}
errors++;
}
if(data21 < 0 || isNaN(data21)){
const err87 = {instancePath:instancePath+"/comparisons/" + i4+"/recordedSeq",schemaPath:"#/$defs/Comparison/properties/recordedSeq/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err87];
}
else {
vErrors.push(err87);
}
errors++;
}
}
var _valid4 = _errs64 === errors;
valid18 = valid18 || _valid4;
const _errs66 = errors;
if(data21 !== null){
const err88 = {instancePath:instancePath+"/comparisons/" + i4+"/recordedSeq",schemaPath:"#/$defs/Comparison/properties/recordedSeq/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err88];
}
else {
vErrors.push(err88);
}
errors++;
}
var _valid4 = _errs66 === errors;
valid18 = valid18 || _valid4;
if(!valid18){
const err89 = {instancePath:instancePath+"/comparisons/" + i4+"/recordedSeq",schemaPath:"#/$defs/Comparison/properties/recordedSeq/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err89];
}
else {
vErrors.push(err89);
}
errors++;
}
else {
errors = _errs63;
if(vErrors !== null){
if(_errs63){
vErrors.length = _errs63;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err90 = {instancePath:instancePath+"/comparisons/" + i4,schemaPath:"#/$defs/Comparison/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err90];
}
else {
vErrors.push(err90);
}
errors++;
}
}
}
else {
const err91 = {instancePath:instancePath+"/comparisons",schemaPath:"#/properties/comparisons/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err91];
}
else {
vErrors.push(err91);
}
errors++;
}
}
if(data.drafts !== undefined){
let data22 = data.drafts;
if(Array.isArray(data22)){
if(data22.length > 5){
const err92 = {instancePath:instancePath+"/drafts",schemaPath:"#/properties/drafts/maxItems",keyword:"maxItems",params:{limit: 5},message:"must NOT have more than 5 items"};
if(vErrors === null){
vErrors = [err92];
}
else {
vErrors.push(err92);
}
errors++;
}
const len4 = data22.length;
for(let i5=0; i5<len4; i5++){
let data23 = data22[i5];
if(data23 && typeof data23 == "object" && !Array.isArray(data23)){
if(data23.id === undefined){
const err93 = {instancePath:instancePath+"/drafts/" + i5,schemaPath:"#/$defs/Draft/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err93];
}
else {
vErrors.push(err93);
}
errors++;
}
if(data23.text === undefined){
const err94 = {instancePath:instancePath+"/drafts/" + i5,schemaPath:"#/$defs/Draft/required",keyword:"required",params:{missingProperty: "text"},message:"must have required property '"+"text"+"'"};
if(vErrors === null){
vErrors = [err94];
}
else {
vErrors.push(err94);
}
errors++;
}
if(data23.selectedRefs === undefined){
const err95 = {instancePath:instancePath+"/drafts/" + i5,schemaPath:"#/$defs/Draft/required",keyword:"required",params:{missingProperty: "selectedRefs"},message:"must have required property '"+"selectedRefs"+"'"};
if(vErrors === null){
vErrors = [err95];
}
else {
vErrors.push(err95);
}
errors++;
}
if(data23.revision === undefined){
const err96 = {instancePath:instancePath+"/drafts/" + i5,schemaPath:"#/$defs/Draft/required",keyword:"required",params:{missingProperty: "revision"},message:"must have required property '"+"revision"+"'"};
if(vErrors === null){
vErrors = [err96];
}
else {
vErrors.push(err96);
}
errors++;
}
for(const key3 in data23){
if(!((((key3 === "id") || (key3 === "text")) || (key3 === "selectedRefs")) || (key3 === "revision"))){
const err97 = {instancePath:instancePath+"/drafts/" + i5,schemaPath:"#/$defs/Draft/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err97];
}
else {
vErrors.push(err97);
}
errors++;
}
}
if(data23.id !== undefined){
let data24 = data23.id;
if(typeof data24 !== "string"){
const err98 = {instancePath:instancePath+"/drafts/" + i5+"/id",schemaPath:"#/$defs/Draft/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err98];
}
else {
vErrors.push(err98);
}
errors++;
}
if(!(((((data24 === "private") || (data24 === "search-plan")) || (data24 === "story-plan")) || (data24 === "coach-search")) || (data24 === "coach-story"))){
const err99 = {instancePath:instancePath+"/drafts/" + i5+"/id",schemaPath:"#/$defs/Draft/properties/id/enum",keyword:"enum",params:{allowedValues: schema75.properties.id.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err99];
}
else {
vErrors.push(err99);
}
errors++;
}
}
if(data23.text !== undefined){
if(typeof data23.text !== "string"){
const err100 = {instancePath:instancePath+"/drafts/" + i5+"/text",schemaPath:"#/$defs/Draft/properties/text/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err100];
}
else {
vErrors.push(err100);
}
errors++;
}
}
if(data23.selectedRefs !== undefined){
let data26 = data23.selectedRefs;
if(Array.isArray(data26)){
if(data26.length > 2){
const err101 = {instancePath:instancePath+"/drafts/" + i5+"/selectedRefs",schemaPath:"#/$defs/Draft/properties/selectedRefs/maxItems",keyword:"maxItems",params:{limit: 2},message:"must NOT have more than 2 items"};
if(vErrors === null){
vErrors = [err101];
}
else {
vErrors.push(err101);
}
errors++;
}
const len5 = data26.length;
for(let i6=0; i6<len5; i6++){
let data27 = data26[i6];
if(typeof data27 === "string"){
if(func2(data27) > 160){
const err102 = {instancePath:instancePath+"/drafts/" + i5+"/selectedRefs/" + i6,schemaPath:"#/$defs/Draft/properties/selectedRefs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err102];
}
else {
vErrors.push(err102);
}
errors++;
}
if(!pattern4.test(data27)){
const err103 = {instancePath:instancePath+"/drafts/" + i5+"/selectedRefs/" + i6,schemaPath:"#/$defs/Draft/properties/selectedRefs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err103];
}
else {
vErrors.push(err103);
}
errors++;
}
}
else {
const err104 = {instancePath:instancePath+"/drafts/" + i5+"/selectedRefs/" + i6,schemaPath:"#/$defs/Draft/properties/selectedRefs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err104];
}
else {
vErrors.push(err104);
}
errors++;
}
}
let i7 = data26.length;
let j1;
if(i7 > 1){
const indices1 = {};
for(;i7--;){
let item1 = data26[i7];
if(typeof item1 !== "string"){
continue;
}
if(typeof indices1[item1] == "number"){
j1 = indices1[item1];
const err105 = {instancePath:instancePath+"/drafts/" + i5+"/selectedRefs",schemaPath:"#/$defs/Draft/properties/selectedRefs/uniqueItems",keyword:"uniqueItems",params:{i: i7, j: j1},message:"must NOT have duplicate items (items ## "+j1+" and "+i7+" are identical)"};
if(vErrors === null){
vErrors = [err105];
}
else {
vErrors.push(err105);
}
errors++;
break;
}
indices1[item1] = i7;
}
}
}
else {
const err106 = {instancePath:instancePath+"/drafts/" + i5+"/selectedRefs",schemaPath:"#/$defs/Draft/properties/selectedRefs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err106];
}
else {
vErrors.push(err106);
}
errors++;
}
}
if(data23.revision !== undefined){
let data28 = data23.revision;
if(!(((typeof data28 == "number") && (!(data28 % 1) && !isNaN(data28))) && (isFinite(data28)))){
const err107 = {instancePath:instancePath+"/drafts/" + i5+"/revision",schemaPath:"#/$defs/Draft/properties/revision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err107];
}
else {
vErrors.push(err107);
}
errors++;
}
if((typeof data28 == "number") && (isFinite(data28))){
if(data28 > 9007199254740991 || isNaN(data28)){
const err108 = {instancePath:instancePath+"/drafts/" + i5+"/revision",schemaPath:"#/$defs/Draft/properties/revision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err108];
}
else {
vErrors.push(err108);
}
errors++;
}
if(data28 < 0 || isNaN(data28)){
const err109 = {instancePath:instancePath+"/drafts/" + i5+"/revision",schemaPath:"#/$defs/Draft/properties/revision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err109];
}
else {
vErrors.push(err109);
}
errors++;
}
}
}
}
else {
const err110 = {instancePath:instancePath+"/drafts/" + i5,schemaPath:"#/$defs/Draft/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err110];
}
else {
vErrors.push(err110);
}
errors++;
}
}
}
else {
const err111 = {instancePath:instancePath+"/drafts",schemaPath:"#/properties/drafts/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err111];
}
else {
vErrors.push(err111);
}
errors++;
}
}
if(data.records !== undefined){
let data29 = data.records;
if(Array.isArray(data29)){
const len6 = data29.length;
for(let i8=0; i8<len6; i8++){
if(!(validate60(data29[i8], {instancePath:instancePath+"/records/" + i8,parentData:data29,parentDataProperty:i8,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate60.errors : vErrors.concat(validate60.errors);
errors = vErrors.length;
}
}
}
else {
const err112 = {instancePath:instancePath+"/records",schemaPath:"#/properties/records/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err112];
}
else {
vErrors.push(err112);
}
errors++;
}
}
if(data.npcReceived !== undefined){
let data31 = data.npcReceived;
if(Array.isArray(data31)){
if(data31.length > 3){
const err113 = {instancePath:instancePath+"/npcReceived",schemaPath:"#/properties/npcReceived/maxItems",keyword:"maxItems",params:{limit: 3},message:"must NOT have more than 3 items"};
if(vErrors === null){
vErrors = [err113];
}
else {
vErrors.push(err113);
}
errors++;
}
const len7 = data31.length;
for(let i9=0; i9<len7; i9++){
let data32 = data31[i9];
if(data32 && typeof data32 == "object" && !Array.isArray(data32)){
if(data32.actorId === undefined){
const err114 = {instancePath:instancePath+"/npcReceived/" + i9,schemaPath:"#/properties/npcReceived/items/required",keyword:"required",params:{missingProperty: "actorId"},message:"must have required property '"+"actorId"+"'"};
if(vErrors === null){
vErrors = [err114];
}
else {
vErrors.push(err114);
}
errors++;
}
if(data32.refs === undefined){
const err115 = {instancePath:instancePath+"/npcReceived/" + i9,schemaPath:"#/properties/npcReceived/items/required",keyword:"required",params:{missingProperty: "refs"},message:"must have required property '"+"refs"+"'"};
if(vErrors === null){
vErrors = [err115];
}
else {
vErrors.push(err115);
}
errors++;
}
if(data32.deliveryRecordIds === undefined){
const err116 = {instancePath:instancePath+"/npcReceived/" + i9,schemaPath:"#/properties/npcReceived/items/required",keyword:"required",params:{missingProperty: "deliveryRecordIds"},message:"must have required property '"+"deliveryRecordIds"+"'"};
if(vErrors === null){
vErrors = [err116];
}
else {
vErrors.push(err116);
}
errors++;
}
for(const key4 in data32){
if(!(((key4 === "actorId") || (key4 === "refs")) || (key4 === "deliveryRecordIds"))){
const err117 = {instancePath:instancePath+"/npcReceived/" + i9,schemaPath:"#/properties/npcReceived/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err117];
}
else {
vErrors.push(err117);
}
errors++;
}
}
if(data32.actorId !== undefined){
let data33 = data32.actorId;
if(typeof data33 !== "string"){
const err118 = {instancePath:instancePath+"/npcReceived/" + i9+"/actorId",schemaPath:"#/properties/npcReceived/items/properties/actorId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err118];
}
else {
vErrors.push(err118);
}
errors++;
}
if(!(((data33 === "ACT.JO") || (data33 === "ACT.REMY")) || (data33 === "ACT.ARI"))){
const err119 = {instancePath:instancePath+"/npcReceived/" + i9+"/actorId",schemaPath:"#/properties/npcReceived/items/properties/actorId/enum",keyword:"enum",params:{allowedValues: schema66.properties.npcReceived.items.properties.actorId.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err119];
}
else {
vErrors.push(err119);
}
errors++;
}
}
if(data32.refs !== undefined){
let data34 = data32.refs;
if(Array.isArray(data34)){
if(data34.length > 64){
const err120 = {instancePath:instancePath+"/npcReceived/" + i9+"/refs",schemaPath:"#/properties/npcReceived/items/properties/refs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err120];
}
else {
vErrors.push(err120);
}
errors++;
}
const len8 = data34.length;
for(let i10=0; i10<len8; i10++){
let data35 = data34[i10];
if(typeof data35 === "string"){
if(func2(data35) > 160){
const err121 = {instancePath:instancePath+"/npcReceived/" + i9+"/refs/" + i10,schemaPath:"#/properties/npcReceived/items/properties/refs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err121];
}
else {
vErrors.push(err121);
}
errors++;
}
if(!pattern4.test(data35)){
const err122 = {instancePath:instancePath+"/npcReceived/" + i9+"/refs/" + i10,schemaPath:"#/properties/npcReceived/items/properties/refs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err122];
}
else {
vErrors.push(err122);
}
errors++;
}
}
else {
const err123 = {instancePath:instancePath+"/npcReceived/" + i9+"/refs/" + i10,schemaPath:"#/properties/npcReceived/items/properties/refs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err123];
}
else {
vErrors.push(err123);
}
errors++;
}
}
let i11 = data34.length;
let j2;
if(i11 > 1){
const indices2 = {};
for(;i11--;){
let item2 = data34[i11];
if(typeof item2 !== "string"){
continue;
}
if(typeof indices2[item2] == "number"){
j2 = indices2[item2];
const err124 = {instancePath:instancePath+"/npcReceived/" + i9+"/refs",schemaPath:"#/properties/npcReceived/items/properties/refs/uniqueItems",keyword:"uniqueItems",params:{i: i11, j: j2},message:"must NOT have duplicate items (items ## "+j2+" and "+i11+" are identical)"};
if(vErrors === null){
vErrors = [err124];
}
else {
vErrors.push(err124);
}
errors++;
break;
}
indices2[item2] = i11;
}
}
}
else {
const err125 = {instancePath:instancePath+"/npcReceived/" + i9+"/refs",schemaPath:"#/properties/npcReceived/items/properties/refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err125];
}
else {
vErrors.push(err125);
}
errors++;
}
}
if(data32.deliveryRecordIds !== undefined){
let data36 = data32.deliveryRecordIds;
if(Array.isArray(data36)){
const len9 = data36.length;
for(let i12=0; i12<len9; i12++){
let data37 = data36[i12];
if(typeof data37 === "string"){
if(func2(data37) > 36){
const err126 = {instancePath:instancePath+"/npcReceived/" + i9+"/deliveryRecordIds/" + i12,schemaPath:"#/properties/npcReceived/items/properties/deliveryRecordIds/items/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err126];
}
else {
vErrors.push(err126);
}
errors++;
}
if(!pattern44.test(data37)){
const err127 = {instancePath:instancePath+"/npcReceived/" + i9+"/deliveryRecordIds/" + i12,schemaPath:"#/properties/npcReceived/items/properties/deliveryRecordIds/items/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err127];
}
else {
vErrors.push(err127);
}
errors++;
}
}
else {
const err128 = {instancePath:instancePath+"/npcReceived/" + i9+"/deliveryRecordIds/" + i12,schemaPath:"#/properties/npcReceived/items/properties/deliveryRecordIds/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err128];
}
else {
vErrors.push(err128);
}
errors++;
}
}
}
else {
const err129 = {instancePath:instancePath+"/npcReceived/" + i9+"/deliveryRecordIds",schemaPath:"#/properties/npcReceived/items/properties/deliveryRecordIds/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err129];
}
else {
vErrors.push(err129);
}
errors++;
}
}
}
else {
const err130 = {instancePath:instancePath+"/npcReceived/" + i9,schemaPath:"#/properties/npcReceived/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err130];
}
else {
vErrors.push(err130);
}
errors++;
}
}
}
else {
const err131 = {instancePath:instancePath+"/npcReceived",schemaPath:"#/properties/npcReceived/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err131];
}
else {
vErrors.push(err131);
}
errors++;
}
}
if(data.playback !== undefined){
let data38 = data.playback;
const _errs103 = errors;
let valid36 = false;
const _errs104 = errors;
if(!(validate62(data38, {instancePath:instancePath+"/playback",parentData:data,parentDataProperty:"playback",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate62.errors : vErrors.concat(validate62.errors);
errors = vErrors.length;
}
var _valid5 = _errs104 === errors;
valid36 = valid36 || _valid5;
const _errs105 = errors;
if(data38 !== null){
const err132 = {instancePath:instancePath+"/playback",schemaPath:"#/properties/playback/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err132];
}
else {
vErrors.push(err132);
}
errors++;
}
var _valid5 = _errs105 === errors;
valid36 = valid36 || _valid5;
if(!valid36){
const err133 = {instancePath:instancePath+"/playback",schemaPath:"#/properties/playback/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err133];
}
else {
vErrors.push(err133);
}
errors++;
}
else {
errors = _errs103;
if(vErrors !== null){
if(_errs103){
vErrors.length = _errs103;
}
else {
vErrors = null;
}
}
}
}
if(data.runHistory !== undefined){
let data39 = data.runHistory;
if(Array.isArray(data39)){
const len10 = data39.length;
for(let i13=0; i13<len10; i13++){
if(!(validate62(data39[i13], {instancePath:instancePath+"/runHistory/" + i13,parentData:data39,parentDataProperty:i13,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate62.errors : vErrors.concat(validate62.errors);
errors = vErrors.length;
}
}
}
else {
const err134 = {instancePath:instancePath+"/runHistory",schemaPath:"#/properties/runHistory/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err134];
}
else {
vErrors.push(err134);
}
errors++;
}
}
if(data.certificate !== undefined){
let data41 = data.certificate;
const _errs111 = errors;
let valid39 = false;
const _errs112 = errors;
if(data41 && typeof data41 == "object" && !Array.isArray(data41)){
if(data41.runId === undefined){
const err135 = {instancePath:instancePath+"/certificate",schemaPath:"#/$defs/Certificate/required",keyword:"required",params:{missingProperty: "runId"},message:"must have required property '"+"runId"+"'"};
if(vErrors === null){
vErrors = [err135];
}
else {
vErrors.push(err135);
}
errors++;
}
if(data41.arrangementRevision === undefined){
const err136 = {instancePath:instancePath+"/certificate",schemaPath:"#/$defs/Certificate/required",keyword:"required",params:{missingProperty: "arrangementRevision"},message:"must have required property '"+"arrangementRevision"+"'"};
if(vErrors === null){
vErrors = [err136];
}
else {
vErrors.push(err136);
}
errors++;
}
for(const key5 in data41){
if(!((key5 === "runId") || (key5 === "arrangementRevision"))){
const err137 = {instancePath:instancePath+"/certificate",schemaPath:"#/$defs/Certificate/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err137];
}
else {
vErrors.push(err137);
}
errors++;
}
}
if(data41.runId !== undefined){
let data42 = data41.runId;
if(typeof data42 === "string"){
if(func2(data42) > 36){
const err138 = {instancePath:instancePath+"/certificate/runId",schemaPath:"#/$defs/Certificate/properties/runId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err138];
}
else {
vErrors.push(err138);
}
errors++;
}
if(!pattern44.test(data42)){
const err139 = {instancePath:instancePath+"/certificate/runId",schemaPath:"#/$defs/Certificate/properties/runId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err139];
}
else {
vErrors.push(err139);
}
errors++;
}
}
else {
const err140 = {instancePath:instancePath+"/certificate/runId",schemaPath:"#/$defs/Certificate/properties/runId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err140];
}
else {
vErrors.push(err140);
}
errors++;
}
}
if(data41.arrangementRevision !== undefined){
let data43 = data41.arrangementRevision;
if(!(((typeof data43 == "number") && (!(data43 % 1) && !isNaN(data43))) && (isFinite(data43)))){
const err141 = {instancePath:instancePath+"/certificate/arrangementRevision",schemaPath:"#/$defs/Certificate/properties/arrangementRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err141];
}
else {
vErrors.push(err141);
}
errors++;
}
if((typeof data43 == "number") && (isFinite(data43))){
if(data43 > 9007199254740991 || isNaN(data43)){
const err142 = {instancePath:instancePath+"/certificate/arrangementRevision",schemaPath:"#/$defs/Certificate/properties/arrangementRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err142];
}
else {
vErrors.push(err142);
}
errors++;
}
if(data43 < 0 || isNaN(data43)){
const err143 = {instancePath:instancePath+"/certificate/arrangementRevision",schemaPath:"#/$defs/Certificate/properties/arrangementRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err143];
}
else {
vErrors.push(err143);
}
errors++;
}
}
}
}
else {
const err144 = {instancePath:instancePath+"/certificate",schemaPath:"#/$defs/Certificate/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err144];
}
else {
vErrors.push(err144);
}
errors++;
}
var _valid6 = _errs112 === errors;
valid39 = valid39 || _valid6;
const _errs120 = errors;
if(data41 !== null){
const err145 = {instancePath:instancePath+"/certificate",schemaPath:"#/properties/certificate/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err145];
}
else {
vErrors.push(err145);
}
errors++;
}
var _valid6 = _errs120 === errors;
valid39 = valid39 || _valid6;
if(!valid39){
const err146 = {instancePath:instancePath+"/certificate",schemaPath:"#/properties/certificate/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err146];
}
else {
vErrors.push(err146);
}
errors++;
}
else {
errors = _errs111;
if(vErrors !== null){
if(_errs111){
vErrors.length = _errs111;
}
else {
vErrors = null;
}
}
}
}
if(data.premiere !== undefined){
let data44 = data.premiere;
const _errs123 = errors;
let valid42 = false;
const _errs124 = errors;
if(!(validate67(data44, {instancePath:instancePath+"/premiere",parentData:data,parentDataProperty:"premiere",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate67.errors : vErrors.concat(validate67.errors);
errors = vErrors.length;
}
var _valid7 = _errs124 === errors;
valid42 = valid42 || _valid7;
const _errs125 = errors;
if(data44 !== null){
const err147 = {instancePath:instancePath+"/premiere",schemaPath:"#/properties/premiere/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err147];
}
else {
vErrors.push(err147);
}
errors++;
}
var _valid7 = _errs125 === errors;
valid42 = valid42 || _valid7;
if(!valid42){
const err148 = {instancePath:instancePath+"/premiere",schemaPath:"#/properties/premiere/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err148];
}
else {
vErrors.push(err148);
}
errors++;
}
else {
errors = _errs123;
if(vErrors !== null){
if(_errs123){
vErrors.length = _errs123;
}
else {
vErrors = null;
}
}
}
}
if(data.observations !== undefined){
let data45 = data.observations;
if(Array.isArray(data45)){
const len11 = data45.length;
for(let i14=0; i14<len11; i14++){
if(!(validate69(data45[i14], {instancePath:instancePath+"/observations/" + i14,parentData:data45,parentDataProperty:i14,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate69.errors : vErrors.concat(validate69.errors);
errors = vErrors.length;
}
}
}
else {
const err149 = {instancePath:instancePath+"/observations",schemaPath:"#/properties/observations/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err149];
}
else {
vErrors.push(err149);
}
errors++;
}
}
if(data.readerResume !== undefined){
let data47 = data.readerResume;
const _errs131 = errors;
let valid45 = false;
const _errs132 = errors;
if(data47 && typeof data47 == "object" && !Array.isArray(data47)){
if(data47.sourceId === undefined){
const err150 = {instancePath:instancePath+"/readerResume",schemaPath:"#/$defs/ReaderResume/required",keyword:"required",params:{missingProperty: "sourceId"},message:"must have required property '"+"sourceId"+"'"};
if(vErrors === null){
vErrors = [err150];
}
else {
vErrors.push(err150);
}
errors++;
}
if(data47.componentRef === undefined){
const err151 = {instancePath:instancePath+"/readerResume",schemaPath:"#/$defs/ReaderResume/required",keyword:"required",params:{missingProperty: "componentRef"},message:"must have required property '"+"componentRef"+"'"};
if(vErrors === null){
vErrors = [err151];
}
else {
vErrors.push(err151);
}
errors++;
}
if(data47.accessId === undefined){
const err152 = {instancePath:instancePath+"/readerResume",schemaPath:"#/$defs/ReaderResume/required",keyword:"required",params:{missingProperty: "accessId"},message:"must have required property '"+"accessId"+"'"};
if(vErrors === null){
vErrors = [err152];
}
else {
vErrors.push(err152);
}
errors++;
}
if(data47.scrollFraction === undefined){
const err153 = {instancePath:instancePath+"/readerResume",schemaPath:"#/$defs/ReaderResume/required",keyword:"required",params:{missingProperty: "scrollFraction"},message:"must have required property '"+"scrollFraction"+"'"};
if(vErrors === null){
vErrors = [err153];
}
else {
vErrors.push(err153);
}
errors++;
}
if(data47.selectedRefs === undefined){
const err154 = {instancePath:instancePath+"/readerResume",schemaPath:"#/$defs/ReaderResume/required",keyword:"required",params:{missingProperty: "selectedRefs"},message:"must have required property '"+"selectedRefs"+"'"};
if(vErrors === null){
vErrors = [err154];
}
else {
vErrors.push(err154);
}
errors++;
}
if(data47.frame === undefined){
const err155 = {instancePath:instancePath+"/readerResume",schemaPath:"#/$defs/ReaderResume/required",keyword:"required",params:{missingProperty: "frame"},message:"must have required property '"+"frame"+"'"};
if(vErrors === null){
vErrors = [err155];
}
else {
vErrors.push(err155);
}
errors++;
}
for(const key6 in data47){
if(!((((((key6 === "sourceId") || (key6 === "componentRef")) || (key6 === "accessId")) || (key6 === "scrollFraction")) || (key6 === "selectedRefs")) || (key6 === "frame"))){
const err156 = {instancePath:instancePath+"/readerResume",schemaPath:"#/$defs/ReaderResume/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key6},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err156];
}
else {
vErrors.push(err156);
}
errors++;
}
}
if(data47.sourceId !== undefined){
let data48 = data47.sourceId;
if(typeof data48 === "string"){
if(func2(data48) > 160){
const err157 = {instancePath:instancePath+"/readerResume/sourceId",schemaPath:"#/$defs/ReaderResume/properties/sourceId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err157];
}
else {
vErrors.push(err157);
}
errors++;
}
if(!pattern4.test(data48)){
const err158 = {instancePath:instancePath+"/readerResume/sourceId",schemaPath:"#/$defs/ReaderResume/properties/sourceId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err158];
}
else {
vErrors.push(err158);
}
errors++;
}
}
else {
const err159 = {instancePath:instancePath+"/readerResume/sourceId",schemaPath:"#/$defs/ReaderResume/properties/sourceId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err159];
}
else {
vErrors.push(err159);
}
errors++;
}
}
if(data47.componentRef !== undefined){
let data49 = data47.componentRef;
if(typeof data49 === "string"){
if(func2(data49) > 160){
const err160 = {instancePath:instancePath+"/readerResume/componentRef",schemaPath:"#/$defs/ReaderResume/properties/componentRef/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err160];
}
else {
vErrors.push(err160);
}
errors++;
}
if(!pattern4.test(data49)){
const err161 = {instancePath:instancePath+"/readerResume/componentRef",schemaPath:"#/$defs/ReaderResume/properties/componentRef/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err161];
}
else {
vErrors.push(err161);
}
errors++;
}
}
else {
const err162 = {instancePath:instancePath+"/readerResume/componentRef",schemaPath:"#/$defs/ReaderResume/properties/componentRef/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err162];
}
else {
vErrors.push(err162);
}
errors++;
}
}
if(data47.accessId !== undefined){
let data50 = data47.accessId;
if(typeof data50 === "string"){
if(func2(data50) > 160){
const err163 = {instancePath:instancePath+"/readerResume/accessId",schemaPath:"#/$defs/ReaderResume/properties/accessId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err163];
}
else {
vErrors.push(err163);
}
errors++;
}
if(!pattern4.test(data50)){
const err164 = {instancePath:instancePath+"/readerResume/accessId",schemaPath:"#/$defs/ReaderResume/properties/accessId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err164];
}
else {
vErrors.push(err164);
}
errors++;
}
}
else {
const err165 = {instancePath:instancePath+"/readerResume/accessId",schemaPath:"#/$defs/ReaderResume/properties/accessId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err165];
}
else {
vErrors.push(err165);
}
errors++;
}
}
if(data47.scrollFraction !== undefined){
let data51 = data47.scrollFraction;
if((typeof data51 == "number") && (isFinite(data51))){
if(data51 > 1 || isNaN(data51)){
const err166 = {instancePath:instancePath+"/readerResume/scrollFraction",schemaPath:"#/$defs/ReaderResume/properties/scrollFraction/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err166];
}
else {
vErrors.push(err166);
}
errors++;
}
if(data51 < 0 || isNaN(data51)){
const err167 = {instancePath:instancePath+"/readerResume/scrollFraction",schemaPath:"#/$defs/ReaderResume/properties/scrollFraction/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err167];
}
else {
vErrors.push(err167);
}
errors++;
}
}
else {
const err168 = {instancePath:instancePath+"/readerResume/scrollFraction",schemaPath:"#/$defs/ReaderResume/properties/scrollFraction/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err168];
}
else {
vErrors.push(err168);
}
errors++;
}
}
if(data47.selectedRefs !== undefined){
let data52 = data47.selectedRefs;
if(Array.isArray(data52)){
if(data52.length > 64){
const err169 = {instancePath:instancePath+"/readerResume/selectedRefs",schemaPath:"#/$defs/ReaderResume/properties/selectedRefs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err169];
}
else {
vErrors.push(err169);
}
errors++;
}
const len12 = data52.length;
for(let i15=0; i15<len12; i15++){
let data53 = data52[i15];
if(typeof data53 === "string"){
if(func2(data53) > 160){
const err170 = {instancePath:instancePath+"/readerResume/selectedRefs/" + i15,schemaPath:"#/$defs/ReaderResume/properties/selectedRefs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err170];
}
else {
vErrors.push(err170);
}
errors++;
}
if(!pattern4.test(data53)){
const err171 = {instancePath:instancePath+"/readerResume/selectedRefs/" + i15,schemaPath:"#/$defs/ReaderResume/properties/selectedRefs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err171];
}
else {
vErrors.push(err171);
}
errors++;
}
}
else {
const err172 = {instancePath:instancePath+"/readerResume/selectedRefs/" + i15,schemaPath:"#/$defs/ReaderResume/properties/selectedRefs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err172];
}
else {
vErrors.push(err172);
}
errors++;
}
}
let i16 = data52.length;
let j3;
if(i16 > 1){
const indices3 = {};
for(;i16--;){
let item3 = data52[i16];
if(typeof item3 !== "string"){
continue;
}
if(typeof indices3[item3] == "number"){
j3 = indices3[item3];
const err173 = {instancePath:instancePath+"/readerResume/selectedRefs",schemaPath:"#/$defs/ReaderResume/properties/selectedRefs/uniqueItems",keyword:"uniqueItems",params:{i: i16, j: j3},message:"must NOT have duplicate items (items ## "+j3+" and "+i16+" are identical)"};
if(vErrors === null){
vErrors = [err173];
}
else {
vErrors.push(err173);
}
errors++;
break;
}
indices3[item3] = i16;
}
}
}
else {
const err174 = {instancePath:instancePath+"/readerResume/selectedRefs",schemaPath:"#/$defs/ReaderResume/properties/selectedRefs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err174];
}
else {
vErrors.push(err174);
}
errors++;
}
}
if(data47.frame !== undefined){
let data54 = data47.frame;
const _errs149 = errors;
let valid51 = false;
const _errs150 = errors;
if(!(((typeof data54 == "number") && (!(data54 % 1) && !isNaN(data54))) && (isFinite(data54)))){
const err175 = {instancePath:instancePath+"/readerResume/frame",schemaPath:"#/$defs/ReaderResume/properties/frame/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err175];
}
else {
vErrors.push(err175);
}
errors++;
}
if((typeof data54 == "number") && (isFinite(data54))){
if(data54 > 3 || isNaN(data54)){
const err176 = {instancePath:instancePath+"/readerResume/frame",schemaPath:"#/$defs/ReaderResume/properties/frame/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 3},message:"must be <= 3"};
if(vErrors === null){
vErrors = [err176];
}
else {
vErrors.push(err176);
}
errors++;
}
if(data54 < 1 || isNaN(data54)){
const err177 = {instancePath:instancePath+"/readerResume/frame",schemaPath:"#/$defs/ReaderResume/properties/frame/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err177];
}
else {
vErrors.push(err177);
}
errors++;
}
}
var _valid9 = _errs150 === errors;
valid51 = valid51 || _valid9;
const _errs152 = errors;
if(data54 !== null){
const err178 = {instancePath:instancePath+"/readerResume/frame",schemaPath:"#/$defs/ReaderResume/properties/frame/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err178];
}
else {
vErrors.push(err178);
}
errors++;
}
var _valid9 = _errs152 === errors;
valid51 = valid51 || _valid9;
if(!valid51){
const err179 = {instancePath:instancePath+"/readerResume/frame",schemaPath:"#/$defs/ReaderResume/properties/frame/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err179];
}
else {
vErrors.push(err179);
}
errors++;
}
else {
errors = _errs149;
if(vErrors !== null){
if(_errs149){
vErrors.length = _errs149;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err180 = {instancePath:instancePath+"/readerResume",schemaPath:"#/$defs/ReaderResume/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err180];
}
else {
vErrors.push(err180);
}
errors++;
}
var _valid8 = _errs132 === errors;
valid45 = valid45 || _valid8;
const _errs154 = errors;
if(data47 !== null){
const err181 = {instancePath:instancePath+"/readerResume",schemaPath:"#/properties/readerResume/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err181];
}
else {
vErrors.push(err181);
}
errors++;
}
var _valid8 = _errs154 === errors;
valid45 = valid45 || _valid8;
if(!valid45){
const err182 = {instancePath:instancePath+"/readerResume",schemaPath:"#/properties/readerResume/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err182];
}
else {
vErrors.push(err182);
}
errors++;
}
else {
errors = _errs131;
if(vErrors !== null){
if(_errs131){
vErrors.length = _errs131;
}
else {
vErrors = null;
}
}
}
}
if(data.worldReturn !== undefined){
let data55 = data.worldReturn;
if(data55 && typeof data55 == "object" && !Array.isArray(data55)){
if(data55.ownerId === undefined){
const err183 = {instancePath:instancePath+"/worldReturn",schemaPath:"#/$defs/ReturnOwner/required",keyword:"required",params:{missingProperty: "ownerId"},message:"must have required property '"+"ownerId"+"'"};
if(vErrors === null){
vErrors = [err183];
}
else {
vErrors.push(err183);
}
errors++;
}
if(data55.actionCtId === undefined){
const err184 = {instancePath:instancePath+"/worldReturn",schemaPath:"#/$defs/ReturnOwner/required",keyword:"required",params:{missingProperty: "actionCtId"},message:"must have required property '"+"actionCtId"+"'"};
if(vErrors === null){
vErrors = [err184];
}
else {
vErrors.push(err184);
}
errors++;
}
for(const key7 in data55){
if(!((key7 === "ownerId") || (key7 === "actionCtId"))){
const err185 = {instancePath:instancePath+"/worldReturn",schemaPath:"#/$defs/ReturnOwner/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key7},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err185];
}
else {
vErrors.push(err185);
}
errors++;
}
}
if(data55.ownerId !== undefined){
let data56 = data55.ownerId;
if(typeof data56 === "string"){
if(func2(data56) > 160){
const err186 = {instancePath:instancePath+"/worldReturn/ownerId",schemaPath:"#/$defs/ReturnOwner/properties/ownerId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err186];
}
else {
vErrors.push(err186);
}
errors++;
}
if(!pattern4.test(data56)){
const err187 = {instancePath:instancePath+"/worldReturn/ownerId",schemaPath:"#/$defs/ReturnOwner/properties/ownerId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err187];
}
else {
vErrors.push(err187);
}
errors++;
}
}
else {
const err188 = {instancePath:instancePath+"/worldReturn/ownerId",schemaPath:"#/$defs/ReturnOwner/properties/ownerId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err188];
}
else {
vErrors.push(err188);
}
errors++;
}
}
if(data55.actionCtId !== undefined){
let data57 = data55.actionCtId;
const _errs163 = errors;
let valid54 = false;
const _errs164 = errors;
if(typeof data57 === "string"){
if(func2(data57) > 160){
const err189 = {instancePath:instancePath+"/worldReturn/actionCtId",schemaPath:"#/$defs/ReturnOwner/properties/actionCtId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err189];
}
else {
vErrors.push(err189);
}
errors++;
}
if(!pattern4.test(data57)){
const err190 = {instancePath:instancePath+"/worldReturn/actionCtId",schemaPath:"#/$defs/ReturnOwner/properties/actionCtId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err190];
}
else {
vErrors.push(err190);
}
errors++;
}
}
else {
const err191 = {instancePath:instancePath+"/worldReturn/actionCtId",schemaPath:"#/$defs/ReturnOwner/properties/actionCtId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err191];
}
else {
vErrors.push(err191);
}
errors++;
}
var _valid10 = _errs164 === errors;
valid54 = valid54 || _valid10;
const _errs166 = errors;
if(data57 !== null){
const err192 = {instancePath:instancePath+"/worldReturn/actionCtId",schemaPath:"#/$defs/ReturnOwner/properties/actionCtId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err192];
}
else {
vErrors.push(err192);
}
errors++;
}
var _valid10 = _errs166 === errors;
valid54 = valid54 || _valid10;
if(!valid54){
const err193 = {instancePath:instancePath+"/worldReturn/actionCtId",schemaPath:"#/$defs/ReturnOwner/properties/actionCtId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err193];
}
else {
vErrors.push(err193);
}
errors++;
}
else {
errors = _errs163;
if(vErrors !== null){
if(_errs163){
vErrors.length = _errs163;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err194 = {instancePath:instancePath+"/worldReturn",schemaPath:"#/$defs/ReturnOwner/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err194];
}
else {
vErrors.push(err194);
}
errors++;
}
}
if(data.historyUncertain !== undefined){
if(typeof data.historyUncertain !== "boolean"){
const err195 = {instancePath:instancePath+"/historyUncertain",schemaPath:"#/properties/historyUncertain/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err195];
}
else {
vErrors.push(err195);
}
errors++;
}
}
if(data.guidance !== undefined){
let data59 = data.guidance;
if(data59 && typeof data59 == "object" && !Array.isArray(data59)){
if(data59.openingDismissed === undefined){
const err196 = {instancePath:instancePath+"/guidance",schemaPath:"#/properties/guidance/required",keyword:"required",params:{missingProperty: "openingDismissed"},message:"must have required property '"+"openingDismissed"+"'"};
if(vErrors === null){
vErrors = [err196];
}
else {
vErrors.push(err196);
}
errors++;
}
if(data59.movementDismissed === undefined){
const err197 = {instancePath:instancePath+"/guidance",schemaPath:"#/properties/guidance/required",keyword:"required",params:{missingProperty: "movementDismissed"},message:"must have required property '"+"movementDismissed"+"'"};
if(vErrors === null){
vErrors = [err197];
}
else {
vErrors.push(err197);
}
errors++;
}
if(data59.ariInvitationDismissed === undefined){
const err198 = {instancePath:instancePath+"/guidance",schemaPath:"#/properties/guidance/required",keyword:"required",params:{missingProperty: "ariInvitationDismissed"},message:"must have required property '"+"ariInvitationDismissed"+"'"};
if(vErrors === null){
vErrors = [err198];
}
else {
vErrors.push(err198);
}
errors++;
}
for(const key8 in data59){
if(!(((key8 === "openingDismissed") || (key8 === "movementDismissed")) || (key8 === "ariInvitationDismissed"))){
const err199 = {instancePath:instancePath+"/guidance",schemaPath:"#/properties/guidance/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key8},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err199];
}
else {
vErrors.push(err199);
}
errors++;
}
}
if(data59.openingDismissed !== undefined){
if(typeof data59.openingDismissed !== "boolean"){
const err200 = {instancePath:instancePath+"/guidance/openingDismissed",schemaPath:"#/properties/guidance/properties/openingDismissed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err200];
}
else {
vErrors.push(err200);
}
errors++;
}
}
if(data59.movementDismissed !== undefined){
if(typeof data59.movementDismissed !== "boolean"){
const err201 = {instancePath:instancePath+"/guidance/movementDismissed",schemaPath:"#/properties/guidance/properties/movementDismissed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err201];
}
else {
vErrors.push(err201);
}
errors++;
}
}
if(data59.ariInvitationDismissed !== undefined){
if(typeof data59.ariInvitationDismissed !== "boolean"){
const err202 = {instancePath:instancePath+"/guidance/ariInvitationDismissed",schemaPath:"#/properties/guidance/properties/ariInvitationDismissed/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err202];
}
else {
vErrors.push(err202);
}
errors++;
}
}
}
else {
const err203 = {instancePath:instancePath+"/guidance",schemaPath:"#/properties/guidance/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err203];
}
else {
vErrors.push(err203);
}
errors++;
}
}
if(data.visitedRooms !== undefined){
let data63 = data.visitedRooms;
if(Array.isArray(data63)){
const len13 = data63.length;
for(let i17=0; i17<len13; i17++){
let data64 = data63[i17];
if(typeof data64 !== "string"){
const err204 = {instancePath:instancePath+"/visitedRooms/" + i17,schemaPath:"#/properties/visitedRooms/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err204];
}
else {
vErrors.push(err204);
}
errors++;
}
if(!((((data64 === "SC.ST") || (data64 === "SC.CY")) || (data64 === "SC.WK")) || (data64 === "SC.MD"))){
const err205 = {instancePath:instancePath+"/visitedRooms/" + i17,schemaPath:"#/properties/visitedRooms/items/enum",keyword:"enum",params:{allowedValues: schema66.properties.visitedRooms.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err205];
}
else {
vErrors.push(err205);
}
errors++;
}
}
}
else {
const err206 = {instancePath:instancePath+"/visitedRooms",schemaPath:"#/properties/visitedRooms/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err206];
}
else {
vErrors.push(err206);
}
errors++;
}
}
if(data.encounteredActors !== undefined){
let data65 = data.encounteredActors;
if(Array.isArray(data65)){
const len14 = data65.length;
for(let i18=0; i18<len14; i18++){
let data66 = data65[i18];
if(typeof data66 !== "string"){
const err207 = {instancePath:instancePath+"/encounteredActors/" + i18,schemaPath:"#/properties/encounteredActors/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err207];
}
else {
vErrors.push(err207);
}
errors++;
}
if(!((((data66 === "ACT.JO") || (data66 === "ACT.REMY")) || (data66 === "ACT.ARI")) || (data66 === "ACT.LOOP"))){
const err208 = {instancePath:instancePath+"/encounteredActors/" + i18,schemaPath:"#/properties/encounteredActors/items/enum",keyword:"enum",params:{allowedValues: schema66.properties.encounteredActors.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err208];
}
else {
vErrors.push(err208);
}
errors++;
}
}
}
else {
const err209 = {instancePath:instancePath+"/encounteredActors",schemaPath:"#/properties/encounteredActors/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err209];
}
else {
vErrors.push(err209);
}
errors++;
}
}
if(data.coachingHistory !== undefined){
let data67 = data.coachingHistory;
if(Array.isArray(data67)){
const len15 = data67.length;
for(let i19=0; i19<len15; i19++){
let data68 = data67[i19];
if(data68 && typeof data68 == "object" && !Array.isArray(data68)){
if(data68.requestId === undefined){
const err210 = {instancePath:instancePath+"/coachingHistory/" + i19,schemaPath:"#/properties/coachingHistory/items/required",keyword:"required",params:{missingProperty: "requestId"},message:"must have required property '"+"requestId"+"'"};
if(vErrors === null){
vErrors = [err210];
}
else {
vErrors.push(err210);
}
errors++;
}
if(data68.submittedRecordId === undefined){
const err211 = {instancePath:instancePath+"/coachingHistory/" + i19,schemaPath:"#/properties/coachingHistory/items/required",keyword:"required",params:{missingProperty: "submittedRecordId"},message:"must have required property '"+"submittedRecordId"+"'"};
if(vErrors === null){
vErrors = [err211];
}
else {
vErrors.push(err211);
}
errors++;
}
if(data68.context === undefined){
const err212 = {instancePath:instancePath+"/coachingHistory/" + i19,schemaPath:"#/properties/coachingHistory/items/required",keyword:"required",params:{missingProperty: "context"},message:"must have required property '"+"context"+"'"};
if(vErrors === null){
vErrors = [err212];
}
else {
vErrors.push(err212);
}
errors++;
}
if(data68.contentIds === undefined){
const err213 = {instancePath:instancePath+"/coachingHistory/" + i19,schemaPath:"#/properties/coachingHistory/items/required",keyword:"required",params:{missingProperty: "contentIds"},message:"must have required property '"+"contentIds"+"'"};
if(vErrors === null){
vErrors = [err213];
}
else {
vErrors.push(err213);
}
errors++;
}
if(data68.selection === undefined){
const err214 = {instancePath:instancePath+"/coachingHistory/" + i19,schemaPath:"#/properties/coachingHistory/items/required",keyword:"required",params:{missingProperty: "selection"},message:"must have required property '"+"selection"+"'"};
if(vErrors === null){
vErrors = [err214];
}
else {
vErrors.push(err214);
}
errors++;
}
if(data68.origin === undefined){
const err215 = {instancePath:instancePath+"/coachingHistory/" + i19,schemaPath:"#/properties/coachingHistory/items/required",keyword:"required",params:{missingProperty: "origin"},message:"must have required property '"+"origin"+"'"};
if(vErrors === null){
vErrors = [err215];
}
else {
vErrors.push(err215);
}
errors++;
}
if(data68.displayedSeq === undefined){
const err216 = {instancePath:instancePath+"/coachingHistory/" + i19,schemaPath:"#/properties/coachingHistory/items/required",keyword:"required",params:{missingProperty: "displayedSeq"},message:"must have required property '"+"displayedSeq"+"'"};
if(vErrors === null){
vErrors = [err216];
}
else {
vErrors.push(err216);
}
errors++;
}
for(const key9 in data68){
if(!(((((((key9 === "requestId") || (key9 === "submittedRecordId")) || (key9 === "context")) || (key9 === "contentIds")) || (key9 === "selection")) || (key9 === "origin")) || (key9 === "displayedSeq"))){
const err217 = {instancePath:instancePath+"/coachingHistory/" + i19,schemaPath:"#/properties/coachingHistory/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key9},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err217];
}
else {
vErrors.push(err217);
}
errors++;
}
}
if(data68.requestId !== undefined){
let data69 = data68.requestId;
if(typeof data69 === "string"){
if(func2(data69) > 36){
const err218 = {instancePath:instancePath+"/coachingHistory/" + i19+"/requestId",schemaPath:"#/properties/coachingHistory/items/properties/requestId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err218];
}
else {
vErrors.push(err218);
}
errors++;
}
if(!pattern44.test(data69)){
const err219 = {instancePath:instancePath+"/coachingHistory/" + i19+"/requestId",schemaPath:"#/properties/coachingHistory/items/properties/requestId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err219];
}
else {
vErrors.push(err219);
}
errors++;
}
}
else {
const err220 = {instancePath:instancePath+"/coachingHistory/" + i19+"/requestId",schemaPath:"#/properties/coachingHistory/items/properties/requestId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err220];
}
else {
vErrors.push(err220);
}
errors++;
}
}
if(data68.submittedRecordId !== undefined){
let data70 = data68.submittedRecordId;
const _errs195 = errors;
let valid63 = false;
const _errs196 = errors;
if(typeof data70 === "string"){
if(func2(data70) > 36){
const err221 = {instancePath:instancePath+"/coachingHistory/" + i19+"/submittedRecordId",schemaPath:"#/properties/coachingHistory/items/properties/submittedRecordId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err221];
}
else {
vErrors.push(err221);
}
errors++;
}
if(!pattern44.test(data70)){
const err222 = {instancePath:instancePath+"/coachingHistory/" + i19+"/submittedRecordId",schemaPath:"#/properties/coachingHistory/items/properties/submittedRecordId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err222];
}
else {
vErrors.push(err222);
}
errors++;
}
}
else {
const err223 = {instancePath:instancePath+"/coachingHistory/" + i19+"/submittedRecordId",schemaPath:"#/properties/coachingHistory/items/properties/submittedRecordId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err223];
}
else {
vErrors.push(err223);
}
errors++;
}
var _valid11 = _errs196 === errors;
valid63 = valid63 || _valid11;
const _errs198 = errors;
if(data70 !== null){
const err224 = {instancePath:instancePath+"/coachingHistory/" + i19+"/submittedRecordId",schemaPath:"#/properties/coachingHistory/items/properties/submittedRecordId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err224];
}
else {
vErrors.push(err224);
}
errors++;
}
var _valid11 = _errs198 === errors;
valid63 = valid63 || _valid11;
if(!valid63){
const err225 = {instancePath:instancePath+"/coachingHistory/" + i19+"/submittedRecordId",schemaPath:"#/properties/coachingHistory/items/properties/submittedRecordId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err225];
}
else {
vErrors.push(err225);
}
errors++;
}
else {
errors = _errs195;
if(vErrors !== null){
if(_errs195){
vErrors.length = _errs195;
}
else {
vErrors = null;
}
}
}
}
if(data68.context !== undefined){
if(!(validate71(data68.context, {instancePath:instancePath+"/coachingHistory/" + i19+"/context",parentData:data68,parentDataProperty:"context",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate71.errors : vErrors.concat(validate71.errors);
errors = vErrors.length;
}
}
if(data68.contentIds !== undefined){
let data72 = data68.contentIds;
if(Array.isArray(data72)){
if(data72.length > 64){
const err226 = {instancePath:instancePath+"/coachingHistory/" + i19+"/contentIds",schemaPath:"#/properties/coachingHistory/items/properties/contentIds/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
if(vErrors === null){
vErrors = [err226];
}
else {
vErrors.push(err226);
}
errors++;
}
const len16 = data72.length;
for(let i20=0; i20<len16; i20++){
let data73 = data72[i20];
if(typeof data73 === "string"){
if(func2(data73) > 160){
const err227 = {instancePath:instancePath+"/coachingHistory/" + i19+"/contentIds/" + i20,schemaPath:"#/properties/coachingHistory/items/properties/contentIds/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err227];
}
else {
vErrors.push(err227);
}
errors++;
}
if(!pattern4.test(data73)){
const err228 = {instancePath:instancePath+"/coachingHistory/" + i19+"/contentIds/" + i20,schemaPath:"#/properties/coachingHistory/items/properties/contentIds/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err228];
}
else {
vErrors.push(err228);
}
errors++;
}
}
else {
const err229 = {instancePath:instancePath+"/coachingHistory/" + i19+"/contentIds/" + i20,schemaPath:"#/properties/coachingHistory/items/properties/contentIds/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err229];
}
else {
vErrors.push(err229);
}
errors++;
}
}
let i21 = data72.length;
let j4;
if(i21 > 1){
const indices4 = {};
for(;i21--;){
let item4 = data72[i21];
if(typeof item4 !== "string"){
continue;
}
if(typeof indices4[item4] == "number"){
j4 = indices4[item4];
const err230 = {instancePath:instancePath+"/coachingHistory/" + i19+"/contentIds",schemaPath:"#/properties/coachingHistory/items/properties/contentIds/uniqueItems",keyword:"uniqueItems",params:{i: i21, j: j4},message:"must NOT have duplicate items (items ## "+j4+" and "+i21+" are identical)"};
if(vErrors === null){
vErrors = [err230];
}
else {
vErrors.push(err230);
}
errors++;
break;
}
indices4[item4] = i21;
}
}
}
else {
const err231 = {instancePath:instancePath+"/coachingHistory/" + i19+"/contentIds",schemaPath:"#/properties/coachingHistory/items/properties/contentIds/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err231];
}
else {
vErrors.push(err231);
}
errors++;
}
}
if(data68.selection !== undefined){
let data74 = data68.selection;
const _errs206 = errors;
let valid67 = false;
const _errs207 = errors;
if(!(validate73(data74, {instancePath:instancePath+"/coachingHistory/" + i19+"/selection",parentData:data68,parentDataProperty:"selection",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate73.errors : vErrors.concat(validate73.errors);
errors = vErrors.length;
}
var _valid12 = _errs207 === errors;
valid67 = valid67 || _valid12;
const _errs208 = errors;
if(data74 !== null){
const err232 = {instancePath:instancePath+"/coachingHistory/" + i19+"/selection",schemaPath:"#/properties/coachingHistory/items/properties/selection/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err232];
}
else {
vErrors.push(err232);
}
errors++;
}
var _valid12 = _errs208 === errors;
valid67 = valid67 || _valid12;
if(!valid67){
const err233 = {instancePath:instancePath+"/coachingHistory/" + i19+"/selection",schemaPath:"#/properties/coachingHistory/items/properties/selection/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err233];
}
else {
vErrors.push(err233);
}
errors++;
}
else {
errors = _errs206;
if(vErrors !== null){
if(_errs206){
vErrors.length = _errs206;
}
else {
vErrors = null;
}
}
}
}
if(data68.origin !== undefined){
let data75 = data68.origin;
if(typeof data75 !== "string"){
const err234 = {instancePath:instancePath+"/coachingHistory/" + i19+"/origin",schemaPath:"#/properties/coachingHistory/items/properties/origin/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err234];
}
else {
vErrors.push(err234);
}
errors++;
}
if(!((((data75 === "live-selection") || (data75 === "authored-topic")) || (data75 === "authored-fallback")) || (data75 === "authored-direct"))){
const err235 = {instancePath:instancePath+"/coachingHistory/" + i19+"/origin",schemaPath:"#/properties/coachingHistory/items/properties/origin/enum",keyword:"enum",params:{allowedValues: schema66.properties.coachingHistory.items.properties.origin.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err235];
}
else {
vErrors.push(err235);
}
errors++;
}
}
if(data68.displayedSeq !== undefined){
let data76 = data68.displayedSeq;
const _errs213 = errors;
let valid68 = false;
const _errs214 = errors;
if(!(((typeof data76 == "number") && (!(data76 % 1) && !isNaN(data76))) && (isFinite(data76)))){
const err236 = {instancePath:instancePath+"/coachingHistory/" + i19+"/displayedSeq",schemaPath:"#/properties/coachingHistory/items/properties/displayedSeq/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err236];
}
else {
vErrors.push(err236);
}
errors++;
}
if((typeof data76 == "number") && (isFinite(data76))){
if(data76 < 0 || isNaN(data76)){
const err237 = {instancePath:instancePath+"/coachingHistory/" + i19+"/displayedSeq",schemaPath:"#/properties/coachingHistory/items/properties/displayedSeq/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err237];
}
else {
vErrors.push(err237);
}
errors++;
}
}
var _valid13 = _errs214 === errors;
valid68 = valid68 || _valid13;
const _errs216 = errors;
if(data76 !== null){
const err238 = {instancePath:instancePath+"/coachingHistory/" + i19+"/displayedSeq",schemaPath:"#/properties/coachingHistory/items/properties/displayedSeq/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err238];
}
else {
vErrors.push(err238);
}
errors++;
}
var _valid13 = _errs216 === errors;
valid68 = valid68 || _valid13;
if(!valid68){
const err239 = {instancePath:instancePath+"/coachingHistory/" + i19+"/displayedSeq",schemaPath:"#/properties/coachingHistory/items/properties/displayedSeq/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err239];
}
else {
vErrors.push(err239);
}
errors++;
}
else {
errors = _errs213;
if(vErrors !== null){
if(_errs213){
vErrors.length = _errs213;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err240 = {instancePath:instancePath+"/coachingHistory/" + i19,schemaPath:"#/properties/coachingHistory/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err240];
}
else {
vErrors.push(err240);
}
errors++;
}
}
}
else {
const err241 = {instancePath:instancePath+"/coachingHistory",schemaPath:"#/properties/coachingHistory/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err241];
}
else {
vErrors.push(err241);
}
errors++;
}
}
}
else {
const err242 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err242];
}
else {
vErrors.push(err242);
}
errors++;
}
validate55.errors = vErrors;
return errors === 0;
}
validate55.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


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
let data1 = data.identity;
if(data1 && typeof data1 == "object" && !Array.isArray(data1)){
if(data1.caseId === undefined){
const err5 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "caseId"},message:"must have required property '"+"caseId"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data1.contentVersion === undefined){
const err6 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "contentVersion"},message:"must have required property '"+"contentVersion"+"'"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
if(data1.contentRevision === undefined){
const err7 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "contentRevision"},message:"must have required property '"+"contentRevision"+"'"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
for(const key1 in data1){
if(!(((key1 === "caseId") || (key1 === "contentVersion")) || (key1 === "contentRevision"))){
const err8 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data1.caseId !== undefined){
if("sparkfest-little-bridge-001" !== data1.caseId){
const err9 = {instancePath:instancePath+"/identity/caseId",schemaPath:"#/$defs/Identity/properties/caseId/const",keyword:"const",params:{allowedValue: "sparkfest-little-bridge-001"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
if(data1.contentVersion !== undefined){
if(3 !== data1.contentVersion){
const err10 = {instancePath:instancePath+"/identity/contentVersion",schemaPath:"#/$defs/Identity/properties/contentVersion/const",keyword:"const",params:{allowedValue: 3},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
}
if(data1.contentRevision !== undefined){
if(1 !== data1.contentRevision){
const err11 = {instancePath:instancePath+"/identity/contentRevision",schemaPath:"#/$defs/Identity/properties/contentRevision/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
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
const err12 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data.state !== undefined){
if(!(validate55(data.state, {instancePath:instancePath+"/state",parentData:data,parentDataProperty:"state",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate55.errors : vErrors.concat(validate55.errors);
errors = vErrors.length;
}
}
}
else {
const err13 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
validate104.errors = vErrors;
return errors === 0;
}
validate104.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate103(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:evidence-quest:CaseSnapshot" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate103.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(!(validate104(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate104.errors : vErrors.concat(validate104.errors);
errors = vErrors.length;
}
validate103.errors = vErrors;
return errors === 0;
}
validate103.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const validateSaveEnvelope = validate107;
const schema115 = {"$id":"urn:evidence-quest:SaveEnvelope","$ref":"https://evidence-quest.invalid/contracts/v1#/$defs/SaveEnvelope"};
const schema99 = {"type":"object","properties":{"contractKind":{"const":"SaveEnvelope"},"saveFormatVersion":{"const":1},"identity":{"$ref":"#/$defs/Identity"},"appBuild":{"type":"string"},"slotRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"writerVisitId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"writtenAt":{"type":"string","pattern":"^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$","maxLength":24},"payload":{"$ref":"#/$defs/CaseState"}},"required":["contractKind","saveFormatVersion","identity","appBuild","slotRevision","writerVisitId","writtenAt","payload"],"additionalProperties":false};
const pattern95 = new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$", "u");

function validate108(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate108.evaluated;
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
let data2 = data.identity;
if(data2 && typeof data2 == "object" && !Array.isArray(data2)){
if(data2.caseId === undefined){
const err11 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "caseId"},message:"must have required property '"+"caseId"+"'"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(data2.contentVersion === undefined){
const err12 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "contentVersion"},message:"must have required property '"+"contentVersion"+"'"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(data2.contentRevision === undefined){
const err13 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "contentRevision"},message:"must have required property '"+"contentRevision"+"'"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
for(const key1 in data2){
if(!(((key1 === "caseId") || (key1 === "contentVersion")) || (key1 === "contentRevision"))){
const err14 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data2.caseId !== undefined){
if("sparkfest-little-bridge-001" !== data2.caseId){
const err15 = {instancePath:instancePath+"/identity/caseId",schemaPath:"#/$defs/Identity/properties/caseId/const",keyword:"const",params:{allowedValue: "sparkfest-little-bridge-001"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data2.contentVersion !== undefined){
if(3 !== data2.contentVersion){
const err16 = {instancePath:instancePath+"/identity/contentVersion",schemaPath:"#/$defs/Identity/properties/contentVersion/const",keyword:"const",params:{allowedValue: 3},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data2.contentRevision !== undefined){
if(1 !== data2.contentRevision){
const err17 = {instancePath:instancePath+"/identity/contentRevision",schemaPath:"#/$defs/Identity/properties/contentRevision/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
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
const err18 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(data.appBuild !== undefined){
if(typeof data.appBuild !== "string"){
const err19 = {instancePath:instancePath+"/appBuild",schemaPath:"#/properties/appBuild/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.slotRevision !== undefined){
let data7 = data.slotRevision;
if(!(((typeof data7 == "number") && (!(data7 % 1) && !isNaN(data7))) && (isFinite(data7)))){
const err20 = {instancePath:instancePath+"/slotRevision",schemaPath:"#/properties/slotRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if((typeof data7 == "number") && (isFinite(data7))){
if(data7 > 9007199254740991 || isNaN(data7)){
const err21 = {instancePath:instancePath+"/slotRevision",schemaPath:"#/properties/slotRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
if(data7 < 0 || isNaN(data7)){
const err22 = {instancePath:instancePath+"/slotRevision",schemaPath:"#/properties/slotRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
if(data.writerVisitId !== undefined){
let data8 = data.writerVisitId;
if(typeof data8 === "string"){
if(func2(data8) > 36){
const err23 = {instancePath:instancePath+"/writerVisitId",schemaPath:"#/properties/writerVisitId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
if(!pattern44.test(data8)){
const err24 = {instancePath:instancePath+"/writerVisitId",schemaPath:"#/properties/writerVisitId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
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
const err25 = {instancePath:instancePath+"/writerVisitId",schemaPath:"#/properties/writerVisitId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
if(data.writtenAt !== undefined){
let data9 = data.writtenAt;
if(typeof data9 === "string"){
if(func2(data9) > 24){
const err26 = {instancePath:instancePath+"/writtenAt",schemaPath:"#/properties/writtenAt/maxLength",keyword:"maxLength",params:{limit: 24},message:"must NOT have more than 24 characters"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
if(!pattern95.test(data9)){
const err27 = {instancePath:instancePath+"/writtenAt",schemaPath:"#/properties/writtenAt/pattern",keyword:"pattern",params:{pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$"},message:"must match pattern \""+"^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z$"+"\""};
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
const err28 = {instancePath:instancePath+"/writtenAt",schemaPath:"#/properties/writtenAt/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
if(data.payload !== undefined){
if(!(validate55(data.payload, {instancePath:instancePath+"/payload",parentData:data,parentDataProperty:"payload",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate55.errors : vErrors.concat(validate55.errors);
errors = vErrors.length;
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
validate108.errors = vErrors;
return errors === 0;
}
validate108.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate107(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:evidence-quest:SaveEnvelope" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate107.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(!(validate108(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate108.errors : vErrors.concat(validate108.errors);
errors = vErrors.length;
}
validate107.errors = vErrors;
return errors === 0;
}
validate107.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const validatePreferences = validate111;
const schema118 = {"$id":"urn:evidence-quest:Preferences","$ref":"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences"};
const schema101 = {"type":"object","properties":{"contractKind":{"const":"Preferences"},"formatVersion":{"const":1},"revision":{"type":"integer","minimum":0,"maximum":9007199254740991},"sound":{"type":"string","enum":["on","off"]},"motion":{"type":"string","enum":["standard","reduced"]},"text":{"type":"string","enum":["regular","larger","largest"]},"spacing":{"type":"string","enum":["standard","roomier"]}},"required":["contractKind","formatVersion","revision","sound","motion","text","spacing"],"additionalProperties":false};

function validate111(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:evidence-quest:Preferences" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate111.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.contractKind === undefined){
const err0 = {instancePath,schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/required",keyword:"required",params:{missingProperty: "contractKind"},message:"must have required property '"+"contractKind"+"'"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
if(data.formatVersion === undefined){
const err1 = {instancePath,schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/required",keyword:"required",params:{missingProperty: "formatVersion"},message:"must have required property '"+"formatVersion"+"'"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
if(data.revision === undefined){
const err2 = {instancePath,schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/required",keyword:"required",params:{missingProperty: "revision"},message:"must have required property '"+"revision"+"'"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
if(data.sound === undefined){
const err3 = {instancePath,schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/required",keyword:"required",params:{missingProperty: "sound"},message:"must have required property '"+"sound"+"'"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
if(data.motion === undefined){
const err4 = {instancePath,schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/required",keyword:"required",params:{missingProperty: "motion"},message:"must have required property '"+"motion"+"'"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
if(data.text === undefined){
const err5 = {instancePath,schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/required",keyword:"required",params:{missingProperty: "text"},message:"must have required property '"+"text"+"'"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
if(data.spacing === undefined){
const err6 = {instancePath,schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/required",keyword:"required",params:{missingProperty: "spacing"},message:"must have required property '"+"spacing"+"'"};
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
const err7 = {instancePath,schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"};
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
const err8 = {instancePath:instancePath+"/contractKind",schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/properties/contractKind/const",keyword:"const",params:{allowedValue: "Preferences"},message:"must be equal to constant"};
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
const err9 = {instancePath:instancePath+"/formatVersion",schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/properties/formatVersion/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
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
const err10 = {instancePath:instancePath+"/revision",schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/properties/revision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
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
const err11 = {instancePath:instancePath+"/revision",schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/properties/revision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(data2 < 0 || isNaN(data2)){
const err12 = {instancePath:instancePath+"/revision",schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/properties/revision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err13 = {instancePath:instancePath+"/sound",schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/properties/sound/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
if(!((data3 === "on") || (data3 === "off"))){
const err14 = {instancePath:instancePath+"/sound",schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/properties/sound/enum",keyword:"enum",params:{allowedValues: schema101.properties.sound.enum},message:"must be equal to one of the allowed values"};
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
const err15 = {instancePath:instancePath+"/motion",schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/properties/motion/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
if(!((data4 === "standard") || (data4 === "reduced"))){
const err16 = {instancePath:instancePath+"/motion",schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/properties/motion/enum",keyword:"enum",params:{allowedValues: schema101.properties.motion.enum},message:"must be equal to one of the allowed values"};
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
const err17 = {instancePath:instancePath+"/text",schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/properties/text/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(!(((data5 === "regular") || (data5 === "larger")) || (data5 === "largest"))){
const err18 = {instancePath:instancePath+"/text",schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/properties/text/enum",keyword:"enum",params:{allowedValues: schema101.properties.text.enum},message:"must be equal to one of the allowed values"};
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
const err19 = {instancePath:instancePath+"/spacing",schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/properties/spacing/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
if(!((data6 === "standard") || (data6 === "roomier"))){
const err20 = {instancePath:instancePath+"/spacing",schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/properties/spacing/enum",keyword:"enum",params:{allowedValues: schema101.properties.spacing.enum},message:"must be equal to one of the allowed values"};
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
const err21 = {instancePath,schemaPath:"https://evidence-quest.invalid/contracts/v1#/$defs/Preferences/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
validate111.errors = vErrors;
return errors === 0;
}
validate111.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const validateCoachRequest = validate112;
const schema120 = {"$id":"urn:evidence-quest:CoachRequest","$ref":"https://evidence-quest.invalid/contracts/v1#/$defs/CoachRequest"};
const schema102 = {"type":"object","properties":{"contractKind":{"const":"CoachRequest"},"coachContractVersion":{"const":1},"identity":{"$ref":"#/$defs/Identity"},"requestId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"context":{"$ref":"#/$defs/Context"},"explanation":{"type":"string","minLength":1,"maxLength":600}},"required":["contractKind","coachContractVersion","identity","requestId","context","explanation"],"additionalProperties":false};

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
let data2 = data.identity;
if(data2 && typeof data2 == "object" && !Array.isArray(data2)){
if(data2.caseId === undefined){
const err9 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "caseId"},message:"must have required property '"+"caseId"+"'"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(data2.contentVersion === undefined){
const err10 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "contentVersion"},message:"must have required property '"+"contentVersion"+"'"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(data2.contentRevision === undefined){
const err11 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "contentRevision"},message:"must have required property '"+"contentRevision"+"'"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
for(const key1 in data2){
if(!(((key1 === "caseId") || (key1 === "contentVersion")) || (key1 === "contentRevision"))){
const err12 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data2.caseId !== undefined){
if("sparkfest-little-bridge-001" !== data2.caseId){
const err13 = {instancePath:instancePath+"/identity/caseId",schemaPath:"#/$defs/Identity/properties/caseId/const",keyword:"const",params:{allowedValue: "sparkfest-little-bridge-001"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data2.contentVersion !== undefined){
if(3 !== data2.contentVersion){
const err14 = {instancePath:instancePath+"/identity/contentVersion",schemaPath:"#/$defs/Identity/properties/contentVersion/const",keyword:"const",params:{allowedValue: 3},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data2.contentRevision !== undefined){
if(1 !== data2.contentRevision){
const err15 = {instancePath:instancePath+"/identity/contentRevision",schemaPath:"#/$defs/Identity/properties/contentRevision/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
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
const err16 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.requestId !== undefined){
let data6 = data.requestId;
if(typeof data6 === "string"){
if(func2(data6) > 36){
const err17 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(!pattern44.test(data6)){
const err18 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
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
const err19 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.context !== undefined){
if(!(validate71(data.context, {instancePath:instancePath+"/context",parentData:data,parentDataProperty:"context",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate71.errors : vErrors.concat(validate71.errors);
errors = vErrors.length;
}
}
if(data.explanation !== undefined){
let data8 = data.explanation;
if(typeof data8 === "string"){
if(func2(data8) > 600){
const err20 = {instancePath:instancePath+"/explanation",schemaPath:"#/properties/explanation/maxLength",keyword:"maxLength",params:{limit: 600},message:"must NOT have more than 600 characters"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(func2(data8) < 1){
const err21 = {instancePath:instancePath+"/explanation",schemaPath:"#/properties/explanation/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
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
const err22 = {instancePath:instancePath+"/explanation",schemaPath:"#/properties/explanation/type",keyword:"type",params:{type: "string"},message:"must be string"};
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
else {
const err23 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
validate113.errors = vErrors;
return errors === 0;
}
validate113.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate112(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:evidence-quest:CoachRequest" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate112.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(!(validate113(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate113.errors : vErrors.concat(validate113.errors);
errors = vErrors.length;
}
validate112.errors = vErrors;
return errors === 0;
}
validate112.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const validateCoachResponse = validate116;
const schema123 = {"$id":"urn:evidence-quest:CoachResponse","$ref":"https://evidence-quest.invalid/contracts/v1#/$defs/CoachResponse"};
const schema104 = {"type":"object","properties":{"contractKind":{"const":"CoachResponse"},"coachContractVersion":{"const":1},"identity":{"$ref":"#/$defs/Identity"},"requestId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"contextRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"contextVisitId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"status":{"type":"string","enum":["selected","unavailable","timeout","invalid","busy","duplicate"]},"selection":{"anyOf":[{"$ref":"#/$defs/CoachSelection"},{"type":"null"}]}},"required":["contractKind","coachContractVersion","identity","requestId","contextRevision","contextVisitId","status","selection"],"additionalProperties":false};

function validate117(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate117.evaluated;
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
let data2 = data.identity;
if(data2 && typeof data2 == "object" && !Array.isArray(data2)){
if(data2.caseId === undefined){
const err11 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "caseId"},message:"must have required property '"+"caseId"+"'"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(data2.contentVersion === undefined){
const err12 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "contentVersion"},message:"must have required property '"+"contentVersion"+"'"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(data2.contentRevision === undefined){
const err13 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "contentRevision"},message:"must have required property '"+"contentRevision"+"'"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
for(const key1 in data2){
if(!(((key1 === "caseId") || (key1 === "contentVersion")) || (key1 === "contentRevision"))){
const err14 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data2.caseId !== undefined){
if("sparkfest-little-bridge-001" !== data2.caseId){
const err15 = {instancePath:instancePath+"/identity/caseId",schemaPath:"#/$defs/Identity/properties/caseId/const",keyword:"const",params:{allowedValue: "sparkfest-little-bridge-001"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data2.contentVersion !== undefined){
if(3 !== data2.contentVersion){
const err16 = {instancePath:instancePath+"/identity/contentVersion",schemaPath:"#/$defs/Identity/properties/contentVersion/const",keyword:"const",params:{allowedValue: 3},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data2.contentRevision !== undefined){
if(1 !== data2.contentRevision){
const err17 = {instancePath:instancePath+"/identity/contentRevision",schemaPath:"#/$defs/Identity/properties/contentRevision/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
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
const err18 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(data.requestId !== undefined){
let data6 = data.requestId;
if(typeof data6 === "string"){
if(func2(data6) > 36){
const err19 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
if(!pattern44.test(data6)){
const err20 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
else {
const err21 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.contextRevision !== undefined){
let data7 = data.contextRevision;
if(!(((typeof data7 == "number") && (!(data7 % 1) && !isNaN(data7))) && (isFinite(data7)))){
const err22 = {instancePath:instancePath+"/contextRevision",schemaPath:"#/properties/contextRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
if((typeof data7 == "number") && (isFinite(data7))){
if(data7 > 9007199254740991 || isNaN(data7)){
const err23 = {instancePath:instancePath+"/contextRevision",schemaPath:"#/properties/contextRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
if(data7 < 0 || isNaN(data7)){
const err24 = {instancePath:instancePath+"/contextRevision",schemaPath:"#/properties/contextRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
}
if(data.contextVisitId !== undefined){
let data8 = data.contextVisitId;
if(typeof data8 === "string"){
if(func2(data8) > 36){
const err25 = {instancePath:instancePath+"/contextVisitId",schemaPath:"#/properties/contextVisitId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
if(!pattern44.test(data8)){
const err26 = {instancePath:instancePath+"/contextVisitId",schemaPath:"#/properties/contextVisitId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
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
const err27 = {instancePath:instancePath+"/contextVisitId",schemaPath:"#/properties/contextVisitId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
if(data.status !== undefined){
let data9 = data.status;
if(typeof data9 !== "string"){
const err28 = {instancePath:instancePath+"/status",schemaPath:"#/properties/status/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
if(!((((((data9 === "selected") || (data9 === "unavailable")) || (data9 === "timeout")) || (data9 === "invalid")) || (data9 === "busy")) || (data9 === "duplicate"))){
const err29 = {instancePath:instancePath+"/status",schemaPath:"#/properties/status/enum",keyword:"enum",params:{allowedValues: schema104.properties.status.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
if(data.selection !== undefined){
let data10 = data.selection;
const _errs20 = errors;
let valid3 = false;
const _errs21 = errors;
if(!(validate73(data10, {instancePath:instancePath+"/selection",parentData:data,parentDataProperty:"selection",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate73.errors : vErrors.concat(validate73.errors);
errors = vErrors.length;
}
var _valid0 = _errs21 === errors;
valid3 = valid3 || _valid0;
const _errs22 = errors;
if(data10 !== null){
const err30 = {instancePath:instancePath+"/selection",schemaPath:"#/properties/selection/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
var _valid0 = _errs22 === errors;
valid3 = valid3 || _valid0;
if(!valid3){
const err31 = {instancePath:instancePath+"/selection",schemaPath:"#/properties/selection/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
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
}
else {
const err32 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
validate117.errors = vErrors;
return errors === 0;
}
validate117.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate116(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:evidence-quest:CoachResponse" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate116.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(!(validate117(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate117.errors : vErrors.concat(validate117.errors);
errors = vErrors.length;
}
validate116.errors = vErrors;
return errors === 0;
}
validate116.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const validateSession = validate120;
const schema126 = {"$id":"urn:evidence-quest:Session","$ref":"https://evidence-quest.invalid/contracts/v1#/$defs/Session"};
const schema106 = {"type":"object","properties":{"contractKind":{"const":"Session"},"visitId":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"inputOwner":{"type":"string","enum":["home","world","task","text","picker","confirmation"]},"taskState":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"childState":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"callerState":{"anyOf":[{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},{"type":"null"}]},"callerReturn":{"anyOf":[{"$ref":"#/$defs/ReturnOwner"},{"type":"null"}]},"focusOwner":{"anyOf":[{"$ref":"#/$defs/ReturnOwner"},{"type":"null"}]},"pendingAction":{"anyOf":[{"type":"object","properties":{"id":{"type":"string","pattern":"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$","maxLength":36},"targetId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"stage":{"type":"string","enum":["approaching","operating"]},"commitRule":{"type":"string","enum":["rollback-before-endpoint","keep-committed","toast-reveal","cue-endpoint"]}},"required":["id","targetId","stage","commitRule"],"additionalProperties":false},{"type":"null"}]},"heldTile":{"anyOf":[{"type":"object","properties":{"tile":{"type":"string","enum":["TILE.FERRY","TILE.BRIDGE","TILE.PLANT","TILE.BLOOM"]},"origin":{"type":"string","enum":["caddy","rail"]},"originIndex":{"anyOf":[{"type":"integer","minimum":0,"maximum":3},{"type":"null"}]},"arrangementRevision":{"type":"integer","minimum":0,"maximum":9007199254740991}},"required":["tile","origin","originIndex","arrangementRevision"],"additionalProperties":false},{"type":"null"}]},"heldKeys":{"type":"array","items":{"type":"string","enum":["up","down","left","right"]},"maxItems":4,"uniqueItems":true},"presentation":{"type":"string","enum":["arrange","watch"]},"coach":{"type":"object","properties":{"request":{"anyOf":[{"$ref":"#/$defs/CoachRequest"},{"type":"null"}]},"status":{"type":"string","enum":["idle","pending","waiting","offered","ready","displayed","stale","canceled","expired"]},"winner":{"anyOf":[{"type":"string","enum":["live","fallback","direct"]},{"type":"null"}]},"heldResponse":{"anyOf":[{"$ref":"#/$defs/CoachResponse"},{"type":"null"}]},"fallbackFocused":{"type":"boolean"},"deadlineElapsedMs":{"type":"integer","minimum":0,"maximum":9007199254740991}},"required":["request","status","winner","heldResponse","fallbackFocused","deadlineElapsedMs"],"additionalProperties":false},"saving":{"type":"object","properties":{"currentRevision":{"type":"integer","minimum":0,"maximum":9007199254740991},"requestedRevision":{"anyOf":[{"type":"integer","minimum":0,"maximum":9007199254740991},{"type":"null"}]},"acknowledgedRevision":{"anyOf":[{"type":"integer","minimum":0,"maximum":9007199254740991},{"type":"null"}]},"knownSlotRevision":{"anyOf":[{"type":"integer","minimum":0,"maximum":9007199254740991},{"type":"null"}]},"writeInFlight":{"type":"boolean"},"mode":{"type":"string","enum":["normal","unavailable","unknown-record","conflict"]}},"required":["currentRevision","requestedRevision","acknowledgedRevision","knownSlotRevision","writeInFlight","mode"],"additionalProperties":false},"scroll":{"type":"array","items":{"type":"object","properties":{"owner":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"fraction":{"type":"number","minimum":0,"maximum":1}},"required":["owner","fraction"],"additionalProperties":false},"maxItems":32}},"required":["contractKind","visitId","inputOwner","taskState","childState","callerState","callerReturn","focusOwner","pendingAction","heldTile","heldKeys","presentation","coach","saving","scroll"],"additionalProperties":false};

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
let data2 = data.identity;
if(data2 && typeof data2 == "object" && !Array.isArray(data2)){
if(data2.caseId === undefined){
const err9 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "caseId"},message:"must have required property '"+"caseId"+"'"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
if(data2.contentVersion === undefined){
const err10 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "contentVersion"},message:"must have required property '"+"contentVersion"+"'"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(data2.contentRevision === undefined){
const err11 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "contentRevision"},message:"must have required property '"+"contentRevision"+"'"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
for(const key1 in data2){
if(!(((key1 === "caseId") || (key1 === "contentVersion")) || (key1 === "contentRevision"))){
const err12 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
if(data2.caseId !== undefined){
if("sparkfest-little-bridge-001" !== data2.caseId){
const err13 = {instancePath:instancePath+"/identity/caseId",schemaPath:"#/$defs/Identity/properties/caseId/const",keyword:"const",params:{allowedValue: "sparkfest-little-bridge-001"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
if(data2.contentVersion !== undefined){
if(3 !== data2.contentVersion){
const err14 = {instancePath:instancePath+"/identity/contentVersion",schemaPath:"#/$defs/Identity/properties/contentVersion/const",keyword:"const",params:{allowedValue: 3},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data2.contentRevision !== undefined){
if(1 !== data2.contentRevision){
const err15 = {instancePath:instancePath+"/identity/contentRevision",schemaPath:"#/$defs/Identity/properties/contentRevision/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
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
const err16 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data.requestId !== undefined){
let data6 = data.requestId;
if(typeof data6 === "string"){
if(func2(data6) > 36){
const err17 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
if(!pattern44.test(data6)){
const err18 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
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
const err19 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
}
if(data.context !== undefined){
if(!(validate71(data.context, {instancePath:instancePath+"/context",parentData:data,parentDataProperty:"context",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate71.errors : vErrors.concat(validate71.errors);
errors = vErrors.length;
}
}
if(data.explanation !== undefined){
let data8 = data.explanation;
if(typeof data8 === "string"){
if(func2(data8) > 600){
const err20 = {instancePath:instancePath+"/explanation",schemaPath:"#/properties/explanation/maxLength",keyword:"maxLength",params:{limit: 600},message:"must NOT have more than 600 characters"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(func2(data8) < 1){
const err21 = {instancePath:instancePath+"/explanation",schemaPath:"#/properties/explanation/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"};
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
const err22 = {instancePath:instancePath+"/explanation",schemaPath:"#/properties/explanation/type",keyword:"type",params:{type: "string"},message:"must be string"};
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
else {
const err23 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
validate80.errors = vErrors;
return errors === 0;
}
validate80.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate83(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate83.evaluated;
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
let data2 = data.identity;
if(data2 && typeof data2 == "object" && !Array.isArray(data2)){
if(data2.caseId === undefined){
const err11 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "caseId"},message:"must have required property '"+"caseId"+"'"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
}
if(data2.contentVersion === undefined){
const err12 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "contentVersion"},message:"must have required property '"+"contentVersion"+"'"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
if(data2.contentRevision === undefined){
const err13 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/required",keyword:"required",params:{missingProperty: "contentRevision"},message:"must have required property '"+"contentRevision"+"'"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
for(const key1 in data2){
if(!(((key1 === "caseId") || (key1 === "contentVersion")) || (key1 === "contentRevision"))){
const err14 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data2.caseId !== undefined){
if("sparkfest-little-bridge-001" !== data2.caseId){
const err15 = {instancePath:instancePath+"/identity/caseId",schemaPath:"#/$defs/Identity/properties/caseId/const",keyword:"const",params:{allowedValue: "sparkfest-little-bridge-001"},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
}
}
if(data2.contentVersion !== undefined){
if(3 !== data2.contentVersion){
const err16 = {instancePath:instancePath+"/identity/contentVersion",schemaPath:"#/$defs/Identity/properties/contentVersion/const",keyword:"const",params:{allowedValue: 3},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
if(data2.contentRevision !== undefined){
if(1 !== data2.contentRevision){
const err17 = {instancePath:instancePath+"/identity/contentRevision",schemaPath:"#/$defs/Identity/properties/contentRevision/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"};
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
const err18 = {instancePath:instancePath+"/identity",schemaPath:"#/$defs/Identity/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
}
if(data.requestId !== undefined){
let data6 = data.requestId;
if(typeof data6 === "string"){
if(func2(data6) > 36){
const err19 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
}
if(!pattern44.test(data6)){
const err20 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
}
else {
const err21 = {instancePath:instancePath+"/requestId",schemaPath:"#/properties/requestId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
if(data.contextRevision !== undefined){
let data7 = data.contextRevision;
if(!(((typeof data7 == "number") && (!(data7 % 1) && !isNaN(data7))) && (isFinite(data7)))){
const err22 = {instancePath:instancePath+"/contextRevision",schemaPath:"#/properties/contextRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
if((typeof data7 == "number") && (isFinite(data7))){
if(data7 > 9007199254740991 || isNaN(data7)){
const err23 = {instancePath:instancePath+"/contextRevision",schemaPath:"#/properties/contextRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
}
if(data7 < 0 || isNaN(data7)){
const err24 = {instancePath:instancePath+"/contextRevision",schemaPath:"#/properties/contextRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
}
}
if(data.contextVisitId !== undefined){
let data8 = data.contextVisitId;
if(typeof data8 === "string"){
if(func2(data8) > 36){
const err25 = {instancePath:instancePath+"/contextVisitId",schemaPath:"#/properties/contextVisitId/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
if(!pattern44.test(data8)){
const err26 = {instancePath:instancePath+"/contextVisitId",schemaPath:"#/properties/contextVisitId/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
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
const err27 = {instancePath:instancePath+"/contextVisitId",schemaPath:"#/properties/contextVisitId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
}
}
if(data.status !== undefined){
let data9 = data.status;
if(typeof data9 !== "string"){
const err28 = {instancePath:instancePath+"/status",schemaPath:"#/properties/status/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
if(!((((((data9 === "selected") || (data9 === "unavailable")) || (data9 === "timeout")) || (data9 === "invalid")) || (data9 === "busy")) || (data9 === "duplicate"))){
const err29 = {instancePath:instancePath+"/status",schemaPath:"#/properties/status/enum",keyword:"enum",params:{allowedValues: schema104.properties.status.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
if(data.selection !== undefined){
let data10 = data.selection;
const _errs20 = errors;
let valid3 = false;
const _errs21 = errors;
if(!(validate73(data10, {instancePath:instancePath+"/selection",parentData:data,parentDataProperty:"selection",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate73.errors : vErrors.concat(validate73.errors);
errors = vErrors.length;
}
var _valid0 = _errs21 === errors;
valid3 = valid3 || _valid0;
const _errs22 = errors;
if(data10 !== null){
const err30 = {instancePath:instancePath+"/selection",schemaPath:"#/properties/selection/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
var _valid0 = _errs22 === errors;
valid3 = valid3 || _valid0;
if(!valid3){
const err31 = {instancePath:instancePath+"/selection",schemaPath:"#/properties/selection/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
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
}
else {
const err32 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err32];
}
else {
vErrors.push(err32);
}
errors++;
}
validate83.errors = vErrors;
return errors === 0;
}
validate83.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


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
if(!(func1.call(schema106.properties, key0))){
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
if(!pattern44.test(data1)){
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
const err21 = {instancePath:instancePath+"/inputOwner",schemaPath:"#/properties/inputOwner/enum",keyword:"enum",params:{allowedValues: schema106.properties.inputOwner.enum},message:"must be equal to one of the allowed values"};
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
if(!pattern4.test(data3)){
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
if(!pattern4.test(data4)){
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
if(!pattern4.test(data5)){
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
if(data6 && typeof data6 == "object" && !Array.isArray(data6)){
if(data6.ownerId === undefined){
const err37 = {instancePath:instancePath+"/callerReturn",schemaPath:"#/$defs/ReturnOwner/required",keyword:"required",params:{missingProperty: "ownerId"},message:"must have required property '"+"ownerId"+"'"};
if(vErrors === null){
vErrors = [err37];
}
else {
vErrors.push(err37);
}
errors++;
}
if(data6.actionCtId === undefined){
const err38 = {instancePath:instancePath+"/callerReturn",schemaPath:"#/$defs/ReturnOwner/required",keyword:"required",params:{missingProperty: "actionCtId"},message:"must have required property '"+"actionCtId"+"'"};
if(vErrors === null){
vErrors = [err38];
}
else {
vErrors.push(err38);
}
errors++;
}
for(const key1 in data6){
if(!((key1 === "ownerId") || (key1 === "actionCtId"))){
const err39 = {instancePath:instancePath+"/callerReturn",schemaPath:"#/$defs/ReturnOwner/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err39];
}
else {
vErrors.push(err39);
}
errors++;
}
}
if(data6.ownerId !== undefined){
let data7 = data6.ownerId;
if(typeof data7 === "string"){
if(func2(data7) > 160){
const err40 = {instancePath:instancePath+"/callerReturn/ownerId",schemaPath:"#/$defs/ReturnOwner/properties/ownerId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err40];
}
else {
vErrors.push(err40);
}
errors++;
}
if(!pattern4.test(data7)){
const err41 = {instancePath:instancePath+"/callerReturn/ownerId",schemaPath:"#/$defs/ReturnOwner/properties/ownerId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err41];
}
else {
vErrors.push(err41);
}
errors++;
}
}
else {
const err42 = {instancePath:instancePath+"/callerReturn/ownerId",schemaPath:"#/$defs/ReturnOwner/properties/ownerId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err42];
}
else {
vErrors.push(err42);
}
errors++;
}
}
if(data6.actionCtId !== undefined){
let data8 = data6.actionCtId;
const _errs34 = errors;
let valid7 = false;
const _errs35 = errors;
if(typeof data8 === "string"){
if(func2(data8) > 160){
const err43 = {instancePath:instancePath+"/callerReturn/actionCtId",schemaPath:"#/$defs/ReturnOwner/properties/actionCtId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err43];
}
else {
vErrors.push(err43);
}
errors++;
}
if(!pattern4.test(data8)){
const err44 = {instancePath:instancePath+"/callerReturn/actionCtId",schemaPath:"#/$defs/ReturnOwner/properties/actionCtId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err44];
}
else {
vErrors.push(err44);
}
errors++;
}
}
else {
const err45 = {instancePath:instancePath+"/callerReturn/actionCtId",schemaPath:"#/$defs/ReturnOwner/properties/actionCtId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err45];
}
else {
vErrors.push(err45);
}
errors++;
}
var _valid4 = _errs35 === errors;
valid7 = valid7 || _valid4;
const _errs37 = errors;
if(data8 !== null){
const err46 = {instancePath:instancePath+"/callerReturn/actionCtId",schemaPath:"#/$defs/ReturnOwner/properties/actionCtId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err46];
}
else {
vErrors.push(err46);
}
errors++;
}
var _valid4 = _errs37 === errors;
valid7 = valid7 || _valid4;
if(!valid7){
const err47 = {instancePath:instancePath+"/callerReturn/actionCtId",schemaPath:"#/$defs/ReturnOwner/properties/actionCtId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err47];
}
else {
vErrors.push(err47);
}
errors++;
}
else {
errors = _errs34;
if(vErrors !== null){
if(_errs34){
vErrors.length = _errs34;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err48 = {instancePath:instancePath+"/callerReturn",schemaPath:"#/$defs/ReturnOwner/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err48];
}
else {
vErrors.push(err48);
}
errors++;
}
var _valid3 = _errs27 === errors;
valid4 = valid4 || _valid3;
const _errs39 = errors;
if(data6 !== null){
const err49 = {instancePath:instancePath+"/callerReturn",schemaPath:"#/properties/callerReturn/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err49];
}
else {
vErrors.push(err49);
}
errors++;
}
var _valid3 = _errs39 === errors;
valid4 = valid4 || _valid3;
if(!valid4){
const err50 = {instancePath:instancePath+"/callerReturn",schemaPath:"#/properties/callerReturn/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err50];
}
else {
vErrors.push(err50);
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
let data9 = data.focusOwner;
const _errs42 = errors;
let valid8 = false;
const _errs43 = errors;
if(data9 && typeof data9 == "object" && !Array.isArray(data9)){
if(data9.ownerId === undefined){
const err51 = {instancePath:instancePath+"/focusOwner",schemaPath:"#/$defs/ReturnOwner/required",keyword:"required",params:{missingProperty: "ownerId"},message:"must have required property '"+"ownerId"+"'"};
if(vErrors === null){
vErrors = [err51];
}
else {
vErrors.push(err51);
}
errors++;
}
if(data9.actionCtId === undefined){
const err52 = {instancePath:instancePath+"/focusOwner",schemaPath:"#/$defs/ReturnOwner/required",keyword:"required",params:{missingProperty: "actionCtId"},message:"must have required property '"+"actionCtId"+"'"};
if(vErrors === null){
vErrors = [err52];
}
else {
vErrors.push(err52);
}
errors++;
}
for(const key2 in data9){
if(!((key2 === "ownerId") || (key2 === "actionCtId"))){
const err53 = {instancePath:instancePath+"/focusOwner",schemaPath:"#/$defs/ReturnOwner/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err53];
}
else {
vErrors.push(err53);
}
errors++;
}
}
if(data9.ownerId !== undefined){
let data10 = data9.ownerId;
if(typeof data10 === "string"){
if(func2(data10) > 160){
const err54 = {instancePath:instancePath+"/focusOwner/ownerId",schemaPath:"#/$defs/ReturnOwner/properties/ownerId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err54];
}
else {
vErrors.push(err54);
}
errors++;
}
if(!pattern4.test(data10)){
const err55 = {instancePath:instancePath+"/focusOwner/ownerId",schemaPath:"#/$defs/ReturnOwner/properties/ownerId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err55];
}
else {
vErrors.push(err55);
}
errors++;
}
}
else {
const err56 = {instancePath:instancePath+"/focusOwner/ownerId",schemaPath:"#/$defs/ReturnOwner/properties/ownerId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err56];
}
else {
vErrors.push(err56);
}
errors++;
}
}
if(data9.actionCtId !== undefined){
let data11 = data9.actionCtId;
const _errs50 = errors;
let valid11 = false;
const _errs51 = errors;
if(typeof data11 === "string"){
if(func2(data11) > 160){
const err57 = {instancePath:instancePath+"/focusOwner/actionCtId",schemaPath:"#/$defs/ReturnOwner/properties/actionCtId/anyOf/0/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err57];
}
else {
vErrors.push(err57);
}
errors++;
}
if(!pattern4.test(data11)){
const err58 = {instancePath:instancePath+"/focusOwner/actionCtId",schemaPath:"#/$defs/ReturnOwner/properties/actionCtId/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err58];
}
else {
vErrors.push(err58);
}
errors++;
}
}
else {
const err59 = {instancePath:instancePath+"/focusOwner/actionCtId",schemaPath:"#/$defs/ReturnOwner/properties/actionCtId/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err59];
}
else {
vErrors.push(err59);
}
errors++;
}
var _valid6 = _errs51 === errors;
valid11 = valid11 || _valid6;
const _errs53 = errors;
if(data11 !== null){
const err60 = {instancePath:instancePath+"/focusOwner/actionCtId",schemaPath:"#/$defs/ReturnOwner/properties/actionCtId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err60];
}
else {
vErrors.push(err60);
}
errors++;
}
var _valid6 = _errs53 === errors;
valid11 = valid11 || _valid6;
if(!valid11){
const err61 = {instancePath:instancePath+"/focusOwner/actionCtId",schemaPath:"#/$defs/ReturnOwner/properties/actionCtId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err61];
}
else {
vErrors.push(err61);
}
errors++;
}
else {
errors = _errs50;
if(vErrors !== null){
if(_errs50){
vErrors.length = _errs50;
}
else {
vErrors = null;
}
}
}
}
}
else {
const err62 = {instancePath:instancePath+"/focusOwner",schemaPath:"#/$defs/ReturnOwner/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err62];
}
else {
vErrors.push(err62);
}
errors++;
}
var _valid5 = _errs43 === errors;
valid8 = valid8 || _valid5;
const _errs55 = errors;
if(data9 !== null){
const err63 = {instancePath:instancePath+"/focusOwner",schemaPath:"#/properties/focusOwner/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err63];
}
else {
vErrors.push(err63);
}
errors++;
}
var _valid5 = _errs55 === errors;
valid8 = valid8 || _valid5;
if(!valid8){
const err64 = {instancePath:instancePath+"/focusOwner",schemaPath:"#/properties/focusOwner/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err64];
}
else {
vErrors.push(err64);
}
errors++;
}
else {
errors = _errs42;
if(vErrors !== null){
if(_errs42){
vErrors.length = _errs42;
}
else {
vErrors = null;
}
}
}
}
if(data.pendingAction !== undefined){
let data12 = data.pendingAction;
const _errs58 = errors;
let valid12 = false;
const _errs59 = errors;
if(data12 && typeof data12 == "object" && !Array.isArray(data12)){
if(data12.id === undefined){
const err65 = {instancePath:instancePath+"/pendingAction",schemaPath:"#/properties/pendingAction/anyOf/0/required",keyword:"required",params:{missingProperty: "id"},message:"must have required property '"+"id"+"'"};
if(vErrors === null){
vErrors = [err65];
}
else {
vErrors.push(err65);
}
errors++;
}
if(data12.targetId === undefined){
const err66 = {instancePath:instancePath+"/pendingAction",schemaPath:"#/properties/pendingAction/anyOf/0/required",keyword:"required",params:{missingProperty: "targetId"},message:"must have required property '"+"targetId"+"'"};
if(vErrors === null){
vErrors = [err66];
}
else {
vErrors.push(err66);
}
errors++;
}
if(data12.stage === undefined){
const err67 = {instancePath:instancePath+"/pendingAction",schemaPath:"#/properties/pendingAction/anyOf/0/required",keyword:"required",params:{missingProperty: "stage"},message:"must have required property '"+"stage"+"'"};
if(vErrors === null){
vErrors = [err67];
}
else {
vErrors.push(err67);
}
errors++;
}
if(data12.commitRule === undefined){
const err68 = {instancePath:instancePath+"/pendingAction",schemaPath:"#/properties/pendingAction/anyOf/0/required",keyword:"required",params:{missingProperty: "commitRule"},message:"must have required property '"+"commitRule"+"'"};
if(vErrors === null){
vErrors = [err68];
}
else {
vErrors.push(err68);
}
errors++;
}
for(const key3 in data12){
if(!((((key3 === "id") || (key3 === "targetId")) || (key3 === "stage")) || (key3 === "commitRule"))){
const err69 = {instancePath:instancePath+"/pendingAction",schemaPath:"#/properties/pendingAction/anyOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err69];
}
else {
vErrors.push(err69);
}
errors++;
}
}
if(data12.id !== undefined){
let data13 = data12.id;
if(typeof data13 === "string"){
if(func2(data13) > 36){
const err70 = {instancePath:instancePath+"/pendingAction/id",schemaPath:"#/properties/pendingAction/anyOf/0/properties/id/maxLength",keyword:"maxLength",params:{limit: 36},message:"must NOT have more than 36 characters"};
if(vErrors === null){
vErrors = [err70];
}
else {
vErrors.push(err70);
}
errors++;
}
if(!pattern44.test(data13)){
const err71 = {instancePath:instancePath+"/pendingAction/id",schemaPath:"#/properties/pendingAction/anyOf/0/properties/id/pattern",keyword:"pattern",params:{pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},message:"must match pattern \""+"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"+"\""};
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
const err72 = {instancePath:instancePath+"/pendingAction/id",schemaPath:"#/properties/pendingAction/anyOf/0/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err72];
}
else {
vErrors.push(err72);
}
errors++;
}
}
if(data12.targetId !== undefined){
let data14 = data12.targetId;
if(typeof data14 === "string"){
if(func2(data14) > 160){
const err73 = {instancePath:instancePath+"/pendingAction/targetId",schemaPath:"#/properties/pendingAction/anyOf/0/properties/targetId/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err73];
}
else {
vErrors.push(err73);
}
errors++;
}
if(!pattern4.test(data14)){
const err74 = {instancePath:instancePath+"/pendingAction/targetId",schemaPath:"#/properties/pendingAction/anyOf/0/properties/targetId/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err74];
}
else {
vErrors.push(err74);
}
errors++;
}
}
else {
const err75 = {instancePath:instancePath+"/pendingAction/targetId",schemaPath:"#/properties/pendingAction/anyOf/0/properties/targetId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err75];
}
else {
vErrors.push(err75);
}
errors++;
}
}
if(data12.stage !== undefined){
let data15 = data12.stage;
if(typeof data15 !== "string"){
const err76 = {instancePath:instancePath+"/pendingAction/stage",schemaPath:"#/properties/pendingAction/anyOf/0/properties/stage/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err76];
}
else {
vErrors.push(err76);
}
errors++;
}
if(!((data15 === "approaching") || (data15 === "operating"))){
const err77 = {instancePath:instancePath+"/pendingAction/stage",schemaPath:"#/properties/pendingAction/anyOf/0/properties/stage/enum",keyword:"enum",params:{allowedValues: schema106.properties.pendingAction.anyOf[0].properties.stage.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err77];
}
else {
vErrors.push(err77);
}
errors++;
}
}
if(data12.commitRule !== undefined){
let data16 = data12.commitRule;
if(typeof data16 !== "string"){
const err78 = {instancePath:instancePath+"/pendingAction/commitRule",schemaPath:"#/properties/pendingAction/anyOf/0/properties/commitRule/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err78];
}
else {
vErrors.push(err78);
}
errors++;
}
if(!((((data16 === "rollback-before-endpoint") || (data16 === "keep-committed")) || (data16 === "toast-reveal")) || (data16 === "cue-endpoint"))){
const err79 = {instancePath:instancePath+"/pendingAction/commitRule",schemaPath:"#/properties/pendingAction/anyOf/0/properties/commitRule/enum",keyword:"enum",params:{allowedValues: schema106.properties.pendingAction.anyOf[0].properties.commitRule.enum},message:"must be equal to one of the allowed values"};
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
const err80 = {instancePath:instancePath+"/pendingAction",schemaPath:"#/properties/pendingAction/anyOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err80];
}
else {
vErrors.push(err80);
}
errors++;
}
var _valid7 = _errs59 === errors;
valid12 = valid12 || _valid7;
const _errs70 = errors;
if(data12 !== null){
const err81 = {instancePath:instancePath+"/pendingAction",schemaPath:"#/properties/pendingAction/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err81];
}
else {
vErrors.push(err81);
}
errors++;
}
var _valid7 = _errs70 === errors;
valid12 = valid12 || _valid7;
if(!valid12){
const err82 = {instancePath:instancePath+"/pendingAction",schemaPath:"#/properties/pendingAction/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err82];
}
else {
vErrors.push(err82);
}
errors++;
}
else {
errors = _errs58;
if(vErrors !== null){
if(_errs58){
vErrors.length = _errs58;
}
else {
vErrors = null;
}
}
}
}
if(data.heldTile !== undefined){
let data17 = data.heldTile;
const _errs73 = errors;
let valid14 = false;
const _errs74 = errors;
if(data17 && typeof data17 == "object" && !Array.isArray(data17)){
if(data17.tile === undefined){
const err83 = {instancePath:instancePath+"/heldTile",schemaPath:"#/properties/heldTile/anyOf/0/required",keyword:"required",params:{missingProperty: "tile"},message:"must have required property '"+"tile"+"'"};
if(vErrors === null){
vErrors = [err83];
}
else {
vErrors.push(err83);
}
errors++;
}
if(data17.origin === undefined){
const err84 = {instancePath:instancePath+"/heldTile",schemaPath:"#/properties/heldTile/anyOf/0/required",keyword:"required",params:{missingProperty: "origin"},message:"must have required property '"+"origin"+"'"};
if(vErrors === null){
vErrors = [err84];
}
else {
vErrors.push(err84);
}
errors++;
}
if(data17.originIndex === undefined){
const err85 = {instancePath:instancePath+"/heldTile",schemaPath:"#/properties/heldTile/anyOf/0/required",keyword:"required",params:{missingProperty: "originIndex"},message:"must have required property '"+"originIndex"+"'"};
if(vErrors === null){
vErrors = [err85];
}
else {
vErrors.push(err85);
}
errors++;
}
if(data17.arrangementRevision === undefined){
const err86 = {instancePath:instancePath+"/heldTile",schemaPath:"#/properties/heldTile/anyOf/0/required",keyword:"required",params:{missingProperty: "arrangementRevision"},message:"must have required property '"+"arrangementRevision"+"'"};
if(vErrors === null){
vErrors = [err86];
}
else {
vErrors.push(err86);
}
errors++;
}
for(const key4 in data17){
if(!((((key4 === "tile") || (key4 === "origin")) || (key4 === "originIndex")) || (key4 === "arrangementRevision"))){
const err87 = {instancePath:instancePath+"/heldTile",schemaPath:"#/properties/heldTile/anyOf/0/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err87];
}
else {
vErrors.push(err87);
}
errors++;
}
}
if(data17.tile !== undefined){
let data18 = data17.tile;
if(typeof data18 !== "string"){
const err88 = {instancePath:instancePath+"/heldTile/tile",schemaPath:"#/properties/heldTile/anyOf/0/properties/tile/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err88];
}
else {
vErrors.push(err88);
}
errors++;
}
if(!((((data18 === "TILE.FERRY") || (data18 === "TILE.BRIDGE")) || (data18 === "TILE.PLANT")) || (data18 === "TILE.BLOOM"))){
const err89 = {instancePath:instancePath+"/heldTile/tile",schemaPath:"#/properties/heldTile/anyOf/0/properties/tile/enum",keyword:"enum",params:{allowedValues: schema106.properties.heldTile.anyOf[0].properties.tile.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err89];
}
else {
vErrors.push(err89);
}
errors++;
}
}
if(data17.origin !== undefined){
let data19 = data17.origin;
if(typeof data19 !== "string"){
const err90 = {instancePath:instancePath+"/heldTile/origin",schemaPath:"#/properties/heldTile/anyOf/0/properties/origin/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err90];
}
else {
vErrors.push(err90);
}
errors++;
}
if(!((data19 === "caddy") || (data19 === "rail"))){
const err91 = {instancePath:instancePath+"/heldTile/origin",schemaPath:"#/properties/heldTile/anyOf/0/properties/origin/enum",keyword:"enum",params:{allowedValues: schema106.properties.heldTile.anyOf[0].properties.origin.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err91];
}
else {
vErrors.push(err91);
}
errors++;
}
}
if(data17.originIndex !== undefined){
let data20 = data17.originIndex;
const _errs82 = errors;
let valid16 = false;
const _errs83 = errors;
if(!(((typeof data20 == "number") && (!(data20 % 1) && !isNaN(data20))) && (isFinite(data20)))){
const err92 = {instancePath:instancePath+"/heldTile/originIndex",schemaPath:"#/properties/heldTile/anyOf/0/properties/originIndex/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err92];
}
else {
vErrors.push(err92);
}
errors++;
}
if((typeof data20 == "number") && (isFinite(data20))){
if(data20 > 3 || isNaN(data20)){
const err93 = {instancePath:instancePath+"/heldTile/originIndex",schemaPath:"#/properties/heldTile/anyOf/0/properties/originIndex/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 3},message:"must be <= 3"};
if(vErrors === null){
vErrors = [err93];
}
else {
vErrors.push(err93);
}
errors++;
}
if(data20 < 0 || isNaN(data20)){
const err94 = {instancePath:instancePath+"/heldTile/originIndex",schemaPath:"#/properties/heldTile/anyOf/0/properties/originIndex/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err94];
}
else {
vErrors.push(err94);
}
errors++;
}
}
var _valid9 = _errs83 === errors;
valid16 = valid16 || _valid9;
const _errs85 = errors;
if(data20 !== null){
const err95 = {instancePath:instancePath+"/heldTile/originIndex",schemaPath:"#/properties/heldTile/anyOf/0/properties/originIndex/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err95];
}
else {
vErrors.push(err95);
}
errors++;
}
var _valid9 = _errs85 === errors;
valid16 = valid16 || _valid9;
if(!valid16){
const err96 = {instancePath:instancePath+"/heldTile/originIndex",schemaPath:"#/properties/heldTile/anyOf/0/properties/originIndex/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err96];
}
else {
vErrors.push(err96);
}
errors++;
}
else {
errors = _errs82;
if(vErrors !== null){
if(_errs82){
vErrors.length = _errs82;
}
else {
vErrors = null;
}
}
}
}
if(data17.arrangementRevision !== undefined){
let data21 = data17.arrangementRevision;
if(!(((typeof data21 == "number") && (!(data21 % 1) && !isNaN(data21))) && (isFinite(data21)))){
const err97 = {instancePath:instancePath+"/heldTile/arrangementRevision",schemaPath:"#/properties/heldTile/anyOf/0/properties/arrangementRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err97];
}
else {
vErrors.push(err97);
}
errors++;
}
if((typeof data21 == "number") && (isFinite(data21))){
if(data21 > 9007199254740991 || isNaN(data21)){
const err98 = {instancePath:instancePath+"/heldTile/arrangementRevision",schemaPath:"#/properties/heldTile/anyOf/0/properties/arrangementRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err98];
}
else {
vErrors.push(err98);
}
errors++;
}
if(data21 < 0 || isNaN(data21)){
const err99 = {instancePath:instancePath+"/heldTile/arrangementRevision",schemaPath:"#/properties/heldTile/anyOf/0/properties/arrangementRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err99];
}
else {
vErrors.push(err99);
}
errors++;
}
}
}
}
else {
const err100 = {instancePath:instancePath+"/heldTile",schemaPath:"#/properties/heldTile/anyOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err100];
}
else {
vErrors.push(err100);
}
errors++;
}
var _valid8 = _errs74 === errors;
valid14 = valid14 || _valid8;
const _errs89 = errors;
if(data17 !== null){
const err101 = {instancePath:instancePath+"/heldTile",schemaPath:"#/properties/heldTile/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err101];
}
else {
vErrors.push(err101);
}
errors++;
}
var _valid8 = _errs89 === errors;
valid14 = valid14 || _valid8;
if(!valid14){
const err102 = {instancePath:instancePath+"/heldTile",schemaPath:"#/properties/heldTile/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err102];
}
else {
vErrors.push(err102);
}
errors++;
}
else {
errors = _errs73;
if(vErrors !== null){
if(_errs73){
vErrors.length = _errs73;
}
else {
vErrors = null;
}
}
}
}
if(data.heldKeys !== undefined){
let data22 = data.heldKeys;
if(Array.isArray(data22)){
if(data22.length > 4){
const err103 = {instancePath:instancePath+"/heldKeys",schemaPath:"#/properties/heldKeys/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"};
if(vErrors === null){
vErrors = [err103];
}
else {
vErrors.push(err103);
}
errors++;
}
const len0 = data22.length;
for(let i0=0; i0<len0; i0++){
let data23 = data22[i0];
if(typeof data23 !== "string"){
const err104 = {instancePath:instancePath+"/heldKeys/" + i0,schemaPath:"#/properties/heldKeys/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err104];
}
else {
vErrors.push(err104);
}
errors++;
}
if(!((((data23 === "up") || (data23 === "down")) || (data23 === "left")) || (data23 === "right"))){
const err105 = {instancePath:instancePath+"/heldKeys/" + i0,schemaPath:"#/properties/heldKeys/items/enum",keyword:"enum",params:{allowedValues: schema106.properties.heldKeys.items.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err105];
}
else {
vErrors.push(err105);
}
errors++;
}
}
let i1 = data22.length;
let j0;
if(i1 > 1){
const indices0 = {};
for(;i1--;){
let item0 = data22[i1];
if(typeof item0 !== "string"){
continue;
}
if(typeof indices0[item0] == "number"){
j0 = indices0[item0];
const err106 = {instancePath:instancePath+"/heldKeys",schemaPath:"#/properties/heldKeys/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err106];
}
else {
vErrors.push(err106);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err107 = {instancePath:instancePath+"/heldKeys",schemaPath:"#/properties/heldKeys/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err107];
}
else {
vErrors.push(err107);
}
errors++;
}
}
if(data.presentation !== undefined){
let data24 = data.presentation;
if(typeof data24 !== "string"){
const err108 = {instancePath:instancePath+"/presentation",schemaPath:"#/properties/presentation/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err108];
}
else {
vErrors.push(err108);
}
errors++;
}
if(!((data24 === "arrange") || (data24 === "watch"))){
const err109 = {instancePath:instancePath+"/presentation",schemaPath:"#/properties/presentation/enum",keyword:"enum",params:{allowedValues: schema106.properties.presentation.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err109];
}
else {
vErrors.push(err109);
}
errors++;
}
}
if(data.coach !== undefined){
let data25 = data.coach;
if(data25 && typeof data25 == "object" && !Array.isArray(data25)){
if(data25.request === undefined){
const err110 = {instancePath:instancePath+"/coach",schemaPath:"#/properties/coach/required",keyword:"required",params:{missingProperty: "request"},message:"must have required property '"+"request"+"'"};
if(vErrors === null){
vErrors = [err110];
}
else {
vErrors.push(err110);
}
errors++;
}
if(data25.status === undefined){
const err111 = {instancePath:instancePath+"/coach",schemaPath:"#/properties/coach/required",keyword:"required",params:{missingProperty: "status"},message:"must have required property '"+"status"+"'"};
if(vErrors === null){
vErrors = [err111];
}
else {
vErrors.push(err111);
}
errors++;
}
if(data25.winner === undefined){
const err112 = {instancePath:instancePath+"/coach",schemaPath:"#/properties/coach/required",keyword:"required",params:{missingProperty: "winner"},message:"must have required property '"+"winner"+"'"};
if(vErrors === null){
vErrors = [err112];
}
else {
vErrors.push(err112);
}
errors++;
}
if(data25.heldResponse === undefined){
const err113 = {instancePath:instancePath+"/coach",schemaPath:"#/properties/coach/required",keyword:"required",params:{missingProperty: "heldResponse"},message:"must have required property '"+"heldResponse"+"'"};
if(vErrors === null){
vErrors = [err113];
}
else {
vErrors.push(err113);
}
errors++;
}
if(data25.fallbackFocused === undefined){
const err114 = {instancePath:instancePath+"/coach",schemaPath:"#/properties/coach/required",keyword:"required",params:{missingProperty: "fallbackFocused"},message:"must have required property '"+"fallbackFocused"+"'"};
if(vErrors === null){
vErrors = [err114];
}
else {
vErrors.push(err114);
}
errors++;
}
if(data25.deadlineElapsedMs === undefined){
const err115 = {instancePath:instancePath+"/coach",schemaPath:"#/properties/coach/required",keyword:"required",params:{missingProperty: "deadlineElapsedMs"},message:"must have required property '"+"deadlineElapsedMs"+"'"};
if(vErrors === null){
vErrors = [err115];
}
else {
vErrors.push(err115);
}
errors++;
}
for(const key5 in data25){
if(!((((((key5 === "request") || (key5 === "status")) || (key5 === "winner")) || (key5 === "heldResponse")) || (key5 === "fallbackFocused")) || (key5 === "deadlineElapsedMs"))){
const err116 = {instancePath:instancePath+"/coach",schemaPath:"#/properties/coach/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err116];
}
else {
vErrors.push(err116);
}
errors++;
}
}
if(data25.request !== undefined){
let data26 = data25.request;
const _errs101 = errors;
let valid21 = false;
const _errs102 = errors;
if(!(validate80(data26, {instancePath:instancePath+"/coach/request",parentData:data25,parentDataProperty:"request",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate80.errors : vErrors.concat(validate80.errors);
errors = vErrors.length;
}
var _valid10 = _errs102 === errors;
valid21 = valid21 || _valid10;
const _errs103 = errors;
if(data26 !== null){
const err117 = {instancePath:instancePath+"/coach/request",schemaPath:"#/properties/coach/properties/request/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err117];
}
else {
vErrors.push(err117);
}
errors++;
}
var _valid10 = _errs103 === errors;
valid21 = valid21 || _valid10;
if(!valid21){
const err118 = {instancePath:instancePath+"/coach/request",schemaPath:"#/properties/coach/properties/request/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err118];
}
else {
vErrors.push(err118);
}
errors++;
}
else {
errors = _errs101;
if(vErrors !== null){
if(_errs101){
vErrors.length = _errs101;
}
else {
vErrors = null;
}
}
}
}
if(data25.status !== undefined){
let data27 = data25.status;
if(typeof data27 !== "string"){
const err119 = {instancePath:instancePath+"/coach/status",schemaPath:"#/properties/coach/properties/status/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err119];
}
else {
vErrors.push(err119);
}
errors++;
}
if(!(((((((((data27 === "idle") || (data27 === "pending")) || (data27 === "waiting")) || (data27 === "offered")) || (data27 === "ready")) || (data27 === "displayed")) || (data27 === "stale")) || (data27 === "canceled")) || (data27 === "expired"))){
const err120 = {instancePath:instancePath+"/coach/status",schemaPath:"#/properties/coach/properties/status/enum",keyword:"enum",params:{allowedValues: schema106.properties.coach.properties.status.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err120];
}
else {
vErrors.push(err120);
}
errors++;
}
}
if(data25.winner !== undefined){
let data28 = data25.winner;
const _errs108 = errors;
let valid22 = false;
const _errs109 = errors;
if(typeof data28 !== "string"){
const err121 = {instancePath:instancePath+"/coach/winner",schemaPath:"#/properties/coach/properties/winner/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err121];
}
else {
vErrors.push(err121);
}
errors++;
}
if(!(((data28 === "live") || (data28 === "fallback")) || (data28 === "direct"))){
const err122 = {instancePath:instancePath+"/coach/winner",schemaPath:"#/properties/coach/properties/winner/anyOf/0/enum",keyword:"enum",params:{allowedValues: schema106.properties.coach.properties.winner.anyOf[0].enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err122];
}
else {
vErrors.push(err122);
}
errors++;
}
var _valid11 = _errs109 === errors;
valid22 = valid22 || _valid11;
const _errs111 = errors;
if(data28 !== null){
const err123 = {instancePath:instancePath+"/coach/winner",schemaPath:"#/properties/coach/properties/winner/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err123];
}
else {
vErrors.push(err123);
}
errors++;
}
var _valid11 = _errs111 === errors;
valid22 = valid22 || _valid11;
if(!valid22){
const err124 = {instancePath:instancePath+"/coach/winner",schemaPath:"#/properties/coach/properties/winner/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err124];
}
else {
vErrors.push(err124);
}
errors++;
}
else {
errors = _errs108;
if(vErrors !== null){
if(_errs108){
vErrors.length = _errs108;
}
else {
vErrors = null;
}
}
}
}
if(data25.heldResponse !== undefined){
let data29 = data25.heldResponse;
const _errs114 = errors;
let valid23 = false;
const _errs115 = errors;
if(!(validate83(data29, {instancePath:instancePath+"/coach/heldResponse",parentData:data25,parentDataProperty:"heldResponse",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate83.errors : vErrors.concat(validate83.errors);
errors = vErrors.length;
}
var _valid12 = _errs115 === errors;
valid23 = valid23 || _valid12;
const _errs116 = errors;
if(data29 !== null){
const err125 = {instancePath:instancePath+"/coach/heldResponse",schemaPath:"#/properties/coach/properties/heldResponse/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err125];
}
else {
vErrors.push(err125);
}
errors++;
}
var _valid12 = _errs116 === errors;
valid23 = valid23 || _valid12;
if(!valid23){
const err126 = {instancePath:instancePath+"/coach/heldResponse",schemaPath:"#/properties/coach/properties/heldResponse/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err126];
}
else {
vErrors.push(err126);
}
errors++;
}
else {
errors = _errs114;
if(vErrors !== null){
if(_errs114){
vErrors.length = _errs114;
}
else {
vErrors = null;
}
}
}
}
if(data25.fallbackFocused !== undefined){
if(typeof data25.fallbackFocused !== "boolean"){
const err127 = {instancePath:instancePath+"/coach/fallbackFocused",schemaPath:"#/properties/coach/properties/fallbackFocused/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err127];
}
else {
vErrors.push(err127);
}
errors++;
}
}
if(data25.deadlineElapsedMs !== undefined){
let data31 = data25.deadlineElapsedMs;
if(!(((typeof data31 == "number") && (!(data31 % 1) && !isNaN(data31))) && (isFinite(data31)))){
const err128 = {instancePath:instancePath+"/coach/deadlineElapsedMs",schemaPath:"#/properties/coach/properties/deadlineElapsedMs/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err128];
}
else {
vErrors.push(err128);
}
errors++;
}
if((typeof data31 == "number") && (isFinite(data31))){
if(data31 > 9007199254740991 || isNaN(data31)){
const err129 = {instancePath:instancePath+"/coach/deadlineElapsedMs",schemaPath:"#/properties/coach/properties/deadlineElapsedMs/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err129];
}
else {
vErrors.push(err129);
}
errors++;
}
if(data31 < 0 || isNaN(data31)){
const err130 = {instancePath:instancePath+"/coach/deadlineElapsedMs",schemaPath:"#/properties/coach/properties/deadlineElapsedMs/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err130];
}
else {
vErrors.push(err130);
}
errors++;
}
}
}
}
else {
const err131 = {instancePath:instancePath+"/coach",schemaPath:"#/properties/coach/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err131];
}
else {
vErrors.push(err131);
}
errors++;
}
}
if(data.saving !== undefined){
let data32 = data.saving;
if(data32 && typeof data32 == "object" && !Array.isArray(data32)){
if(data32.currentRevision === undefined){
const err132 = {instancePath:instancePath+"/saving",schemaPath:"#/properties/saving/required",keyword:"required",params:{missingProperty: "currentRevision"},message:"must have required property '"+"currentRevision"+"'"};
if(vErrors === null){
vErrors = [err132];
}
else {
vErrors.push(err132);
}
errors++;
}
if(data32.requestedRevision === undefined){
const err133 = {instancePath:instancePath+"/saving",schemaPath:"#/properties/saving/required",keyword:"required",params:{missingProperty: "requestedRevision"},message:"must have required property '"+"requestedRevision"+"'"};
if(vErrors === null){
vErrors = [err133];
}
else {
vErrors.push(err133);
}
errors++;
}
if(data32.acknowledgedRevision === undefined){
const err134 = {instancePath:instancePath+"/saving",schemaPath:"#/properties/saving/required",keyword:"required",params:{missingProperty: "acknowledgedRevision"},message:"must have required property '"+"acknowledgedRevision"+"'"};
if(vErrors === null){
vErrors = [err134];
}
else {
vErrors.push(err134);
}
errors++;
}
if(data32.knownSlotRevision === undefined){
const err135 = {instancePath:instancePath+"/saving",schemaPath:"#/properties/saving/required",keyword:"required",params:{missingProperty: "knownSlotRevision"},message:"must have required property '"+"knownSlotRevision"+"'"};
if(vErrors === null){
vErrors = [err135];
}
else {
vErrors.push(err135);
}
errors++;
}
if(data32.writeInFlight === undefined){
const err136 = {instancePath:instancePath+"/saving",schemaPath:"#/properties/saving/required",keyword:"required",params:{missingProperty: "writeInFlight"},message:"must have required property '"+"writeInFlight"+"'"};
if(vErrors === null){
vErrors = [err136];
}
else {
vErrors.push(err136);
}
errors++;
}
if(data32.mode === undefined){
const err137 = {instancePath:instancePath+"/saving",schemaPath:"#/properties/saving/required",keyword:"required",params:{missingProperty: "mode"},message:"must have required property '"+"mode"+"'"};
if(vErrors === null){
vErrors = [err137];
}
else {
vErrors.push(err137);
}
errors++;
}
for(const key6 in data32){
if(!((((((key6 === "currentRevision") || (key6 === "requestedRevision")) || (key6 === "acknowledgedRevision")) || (key6 === "knownSlotRevision")) || (key6 === "writeInFlight")) || (key6 === "mode"))){
const err138 = {instancePath:instancePath+"/saving",schemaPath:"#/properties/saving/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key6},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err138];
}
else {
vErrors.push(err138);
}
errors++;
}
}
if(data32.currentRevision !== undefined){
let data33 = data32.currentRevision;
if(!(((typeof data33 == "number") && (!(data33 % 1) && !isNaN(data33))) && (isFinite(data33)))){
const err139 = {instancePath:instancePath+"/saving/currentRevision",schemaPath:"#/properties/saving/properties/currentRevision/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err139];
}
else {
vErrors.push(err139);
}
errors++;
}
if((typeof data33 == "number") && (isFinite(data33))){
if(data33 > 9007199254740991 || isNaN(data33)){
const err140 = {instancePath:instancePath+"/saving/currentRevision",schemaPath:"#/properties/saving/properties/currentRevision/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err140];
}
else {
vErrors.push(err140);
}
errors++;
}
if(data33 < 0 || isNaN(data33)){
const err141 = {instancePath:instancePath+"/saving/currentRevision",schemaPath:"#/properties/saving/properties/currentRevision/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err141];
}
else {
vErrors.push(err141);
}
errors++;
}
}
}
if(data32.requestedRevision !== undefined){
let data34 = data32.requestedRevision;
const _errs128 = errors;
let valid25 = false;
const _errs129 = errors;
if(!(((typeof data34 == "number") && (!(data34 % 1) && !isNaN(data34))) && (isFinite(data34)))){
const err142 = {instancePath:instancePath+"/saving/requestedRevision",schemaPath:"#/properties/saving/properties/requestedRevision/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err142];
}
else {
vErrors.push(err142);
}
errors++;
}
if((typeof data34 == "number") && (isFinite(data34))){
if(data34 > 9007199254740991 || isNaN(data34)){
const err143 = {instancePath:instancePath+"/saving/requestedRevision",schemaPath:"#/properties/saving/properties/requestedRevision/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err143];
}
else {
vErrors.push(err143);
}
errors++;
}
if(data34 < 0 || isNaN(data34)){
const err144 = {instancePath:instancePath+"/saving/requestedRevision",schemaPath:"#/properties/saving/properties/requestedRevision/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err144];
}
else {
vErrors.push(err144);
}
errors++;
}
}
var _valid13 = _errs129 === errors;
valid25 = valid25 || _valid13;
const _errs131 = errors;
if(data34 !== null){
const err145 = {instancePath:instancePath+"/saving/requestedRevision",schemaPath:"#/properties/saving/properties/requestedRevision/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err145];
}
else {
vErrors.push(err145);
}
errors++;
}
var _valid13 = _errs131 === errors;
valid25 = valid25 || _valid13;
if(!valid25){
const err146 = {instancePath:instancePath+"/saving/requestedRevision",schemaPath:"#/properties/saving/properties/requestedRevision/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err146];
}
else {
vErrors.push(err146);
}
errors++;
}
else {
errors = _errs128;
if(vErrors !== null){
if(_errs128){
vErrors.length = _errs128;
}
else {
vErrors = null;
}
}
}
}
if(data32.acknowledgedRevision !== undefined){
let data35 = data32.acknowledgedRevision;
const _errs134 = errors;
let valid26 = false;
const _errs135 = errors;
if(!(((typeof data35 == "number") && (!(data35 % 1) && !isNaN(data35))) && (isFinite(data35)))){
const err147 = {instancePath:instancePath+"/saving/acknowledgedRevision",schemaPath:"#/properties/saving/properties/acknowledgedRevision/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err147];
}
else {
vErrors.push(err147);
}
errors++;
}
if((typeof data35 == "number") && (isFinite(data35))){
if(data35 > 9007199254740991 || isNaN(data35)){
const err148 = {instancePath:instancePath+"/saving/acknowledgedRevision",schemaPath:"#/properties/saving/properties/acknowledgedRevision/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err148];
}
else {
vErrors.push(err148);
}
errors++;
}
if(data35 < 0 || isNaN(data35)){
const err149 = {instancePath:instancePath+"/saving/acknowledgedRevision",schemaPath:"#/properties/saving/properties/acknowledgedRevision/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err149];
}
else {
vErrors.push(err149);
}
errors++;
}
}
var _valid14 = _errs135 === errors;
valid26 = valid26 || _valid14;
const _errs137 = errors;
if(data35 !== null){
const err150 = {instancePath:instancePath+"/saving/acknowledgedRevision",schemaPath:"#/properties/saving/properties/acknowledgedRevision/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err150];
}
else {
vErrors.push(err150);
}
errors++;
}
var _valid14 = _errs137 === errors;
valid26 = valid26 || _valid14;
if(!valid26){
const err151 = {instancePath:instancePath+"/saving/acknowledgedRevision",schemaPath:"#/properties/saving/properties/acknowledgedRevision/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err151];
}
else {
vErrors.push(err151);
}
errors++;
}
else {
errors = _errs134;
if(vErrors !== null){
if(_errs134){
vErrors.length = _errs134;
}
else {
vErrors = null;
}
}
}
}
if(data32.knownSlotRevision !== undefined){
let data36 = data32.knownSlotRevision;
const _errs140 = errors;
let valid27 = false;
const _errs141 = errors;
if(!(((typeof data36 == "number") && (!(data36 % 1) && !isNaN(data36))) && (isFinite(data36)))){
const err152 = {instancePath:instancePath+"/saving/knownSlotRevision",schemaPath:"#/properties/saving/properties/knownSlotRevision/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err152];
}
else {
vErrors.push(err152);
}
errors++;
}
if((typeof data36 == "number") && (isFinite(data36))){
if(data36 > 9007199254740991 || isNaN(data36)){
const err153 = {instancePath:instancePath+"/saving/knownSlotRevision",schemaPath:"#/properties/saving/properties/knownSlotRevision/anyOf/0/maximum",keyword:"maximum",params:{comparison: "<=", limit: 9007199254740991},message:"must be <= 9007199254740991"};
if(vErrors === null){
vErrors = [err153];
}
else {
vErrors.push(err153);
}
errors++;
}
if(data36 < 0 || isNaN(data36)){
const err154 = {instancePath:instancePath+"/saving/knownSlotRevision",schemaPath:"#/properties/saving/properties/knownSlotRevision/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err154];
}
else {
vErrors.push(err154);
}
errors++;
}
}
var _valid15 = _errs141 === errors;
valid27 = valid27 || _valid15;
const _errs143 = errors;
if(data36 !== null){
const err155 = {instancePath:instancePath+"/saving/knownSlotRevision",schemaPath:"#/properties/saving/properties/knownSlotRevision/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err155];
}
else {
vErrors.push(err155);
}
errors++;
}
var _valid15 = _errs143 === errors;
valid27 = valid27 || _valid15;
if(!valid27){
const err156 = {instancePath:instancePath+"/saving/knownSlotRevision",schemaPath:"#/properties/saving/properties/knownSlotRevision/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err156];
}
else {
vErrors.push(err156);
}
errors++;
}
else {
errors = _errs140;
if(vErrors !== null){
if(_errs140){
vErrors.length = _errs140;
}
else {
vErrors = null;
}
}
}
}
if(data32.writeInFlight !== undefined){
if(typeof data32.writeInFlight !== "boolean"){
const err157 = {instancePath:instancePath+"/saving/writeInFlight",schemaPath:"#/properties/saving/properties/writeInFlight/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
if(vErrors === null){
vErrors = [err157];
}
else {
vErrors.push(err157);
}
errors++;
}
}
if(data32.mode !== undefined){
let data38 = data32.mode;
if(typeof data38 !== "string"){
const err158 = {instancePath:instancePath+"/saving/mode",schemaPath:"#/properties/saving/properties/mode/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err158];
}
else {
vErrors.push(err158);
}
errors++;
}
if(!((((data38 === "normal") || (data38 === "unavailable")) || (data38 === "unknown-record")) || (data38 === "conflict"))){
const err159 = {instancePath:instancePath+"/saving/mode",schemaPath:"#/properties/saving/properties/mode/enum",keyword:"enum",params:{allowedValues: schema106.properties.saving.properties.mode.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err159];
}
else {
vErrors.push(err159);
}
errors++;
}
}
}
else {
const err160 = {instancePath:instancePath+"/saving",schemaPath:"#/properties/saving/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err160];
}
else {
vErrors.push(err160);
}
errors++;
}
}
if(data.scroll !== undefined){
let data39 = data.scroll;
if(Array.isArray(data39)){
if(data39.length > 32){
const err161 = {instancePath:instancePath+"/scroll",schemaPath:"#/properties/scroll/maxItems",keyword:"maxItems",params:{limit: 32},message:"must NOT have more than 32 items"};
if(vErrors === null){
vErrors = [err161];
}
else {
vErrors.push(err161);
}
errors++;
}
const len1 = data39.length;
for(let i2=0; i2<len1; i2++){
let data40 = data39[i2];
if(data40 && typeof data40 == "object" && !Array.isArray(data40)){
if(data40.owner === undefined){
const err162 = {instancePath:instancePath+"/scroll/" + i2,schemaPath:"#/properties/scroll/items/required",keyword:"required",params:{missingProperty: "owner"},message:"must have required property '"+"owner"+"'"};
if(vErrors === null){
vErrors = [err162];
}
else {
vErrors.push(err162);
}
errors++;
}
if(data40.fraction === undefined){
const err163 = {instancePath:instancePath+"/scroll/" + i2,schemaPath:"#/properties/scroll/items/required",keyword:"required",params:{missingProperty: "fraction"},message:"must have required property '"+"fraction"+"'"};
if(vErrors === null){
vErrors = [err163];
}
else {
vErrors.push(err163);
}
errors++;
}
for(const key7 in data40){
if(!((key7 === "owner") || (key7 === "fraction"))){
const err164 = {instancePath:instancePath+"/scroll/" + i2,schemaPath:"#/properties/scroll/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key7},message:"must NOT have additional properties"};
if(vErrors === null){
vErrors = [err164];
}
else {
vErrors.push(err164);
}
errors++;
}
}
if(data40.owner !== undefined){
let data41 = data40.owner;
if(typeof data41 === "string"){
if(func2(data41) > 160){
const err165 = {instancePath:instancePath+"/scroll/" + i2+"/owner",schemaPath:"#/properties/scroll/items/properties/owner/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err165];
}
else {
vErrors.push(err165);
}
errors++;
}
if(!pattern4.test(data41)){
const err166 = {instancePath:instancePath+"/scroll/" + i2+"/owner",schemaPath:"#/properties/scroll/items/properties/owner/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
if(vErrors === null){
vErrors = [err166];
}
else {
vErrors.push(err166);
}
errors++;
}
}
else {
const err167 = {instancePath:instancePath+"/scroll/" + i2+"/owner",schemaPath:"#/properties/scroll/items/properties/owner/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err167];
}
else {
vErrors.push(err167);
}
errors++;
}
}
if(data40.fraction !== undefined){
let data42 = data40.fraction;
if((typeof data42 == "number") && (isFinite(data42))){
if(data42 > 1 || isNaN(data42)){
const err168 = {instancePath:instancePath+"/scroll/" + i2+"/fraction",schemaPath:"#/properties/scroll/items/properties/fraction/maximum",keyword:"maximum",params:{comparison: "<=", limit: 1},message:"must be <= 1"};
if(vErrors === null){
vErrors = [err168];
}
else {
vErrors.push(err168);
}
errors++;
}
if(data42 < 0 || isNaN(data42)){
const err169 = {instancePath:instancePath+"/scroll/" + i2+"/fraction",schemaPath:"#/properties/scroll/items/properties/fraction/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err169];
}
else {
vErrors.push(err169);
}
errors++;
}
}
else {
const err170 = {instancePath:instancePath+"/scroll/" + i2+"/fraction",schemaPath:"#/properties/scroll/items/properties/fraction/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err170];
}
else {
vErrors.push(err170);
}
errors++;
}
}
}
else {
const err171 = {instancePath:instancePath+"/scroll/" + i2,schemaPath:"#/properties/scroll/items/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err171];
}
else {
vErrors.push(err171);
}
errors++;
}
}
}
else {
const err172 = {instancePath:instancePath+"/scroll",schemaPath:"#/properties/scroll/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err172];
}
else {
vErrors.push(err172);
}
errors++;
}
}
}
else {
const err173 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err173];
}
else {
vErrors.push(err173);
}
errors++;
}
validate121.errors = vErrors;
return errors === 0;
}
validate121.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate120(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:evidence-quest:Session" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate120.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(!(validate121(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate121.errors : vErrors.concat(validate121.errors);
errors = vErrors.length;
}
validate120.errors = vErrors;
return errors === 0;
}
validate120.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

export const validateModelProposal = validate125;
const schema130 = {"$id":"urn:evidence-quest:ModelProposal","$ref":"https://evidence-quest.invalid/contracts/v1#/$defs/ModelProposal"};
const schema131 = {"type":"object","properties":{"moveId":{"type":"string","enum":["NOTICE_CONTEXT","NOTICE_SCOPE","CLIP_LIMIT","POSITIVE_SUPPORT","TESTABLE_LEAD","PLAN_VS_RESULT","FULL_PROMISE","BOAT_CAPACITY","TOGETHER","ROOT_CONDITION","VALID_DIRECT","VALID_EXTRA","ARRANGEMENT_ONLY","CLARIFY","NARROW_CLAIM","UNKNOWN_DETAIL","RETURN_TO_CASE","NO_ELIGIBLE_MOVE"]},"interpretation":{"$ref":"#/$defs/InterpretationTag"},"refs":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]*$","maxLength":160},"maxItems":64,"uniqueItems":true},"uncertain":{"type":"boolean"}},"required":["moveId","interpretation","refs","uncertain"],"additionalProperties":false};

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
const err6 = {instancePath:instancePath+"/moveId",schemaPath:"#/properties/moveId/enum",keyword:"enum",params:{allowedValues: schema131.properties.moveId.enum},message:"must be equal to one of the allowed values"};
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
let data1 = data.interpretation;
if(typeof data1 !== "string"){
const err7 = {instancePath:instancePath+"/interpretation",schemaPath:"#/$defs/InterpretationTag/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
if(!((((((((data1 === "scope_confusion") || (data1 === "unsupported_destination")) || (data1 === "goal_incomplete")) || (data1 === "capacity")) || (data1 === "prerequisite")) || (data1 === "valid_plan")) || (data1 === "unclear")) || (data1 === "off_topic"))){
const err8 = {instancePath:instancePath+"/interpretation",schemaPath:"#/$defs/InterpretationTag/enum",keyword:"enum",params:{allowedValues: schema60.enum},message:"must be equal to one of the allowed values"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
if(data.refs !== undefined){
let data2 = data.refs;
if(Array.isArray(data2)){
if(data2.length > 64){
const err9 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/maxItems",keyword:"maxItems",params:{limit: 64},message:"must NOT have more than 64 items"};
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
let data3 = data2[i0];
if(typeof data3 === "string"){
if(func2(data3) > 160){
const err10 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/maxLength",keyword:"maxLength",params:{limit: 160},message:"must NOT have more than 160 characters"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
if(!pattern4.test(data3)){
const err11 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9][A-Za-z0-9._:/-]*$"},message:"must match pattern \""+"^[A-Za-z0-9][A-Za-z0-9._:/-]*$"+"\""};
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
const err12 = {instancePath:instancePath+"/refs/" + i0,schemaPath:"#/properties/refs/items/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
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
const err13 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/uniqueItems",keyword:"uniqueItems",params:{i: i1, j: j0},message:"must NOT have duplicate items (items ## "+j0+" and "+i1+" are identical)"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
break;
}
indices0[item0] = i1;
}
}
}
else {
const err14 = {instancePath:instancePath+"/refs",schemaPath:"#/properties/refs/type",keyword:"type",params:{type: "array"},message:"must be array"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
}
if(data.uncertain !== undefined){
if(typeof data.uncertain !== "boolean"){
const err15 = {instancePath:instancePath+"/uncertain",schemaPath:"#/properties/uncertain/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"};
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
const err16 = {instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
validate126.errors = vErrors;
return errors === 0;
}
validate126.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate125(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="urn:evidence-quest:ModelProposal" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate125.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(!(validate126(data, {instancePath,parentData,parentDataProperty,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate126.errors : vErrors.concat(validate126.errors);
errors = vErrors.length;
}
validate125.errors = vErrors;
return errors === 0;
}
validate125.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

