import test from 'node:test';
import assert from 'node:assert/strict';
import {isSpokenText,pronunciationKey} from './cast-catalogue-text.mjs';

test('graphics and CSS stored in strings never become spoken text or vocabulary',()=>{
 for(const text of ['M-58 7h116v12H-58Z','M8 5v14M16 5v14','M-13-56 13-56 23-16-23-16Z','rotate(25 180 157)','translate(193 24) scale(.413)','bold 72px Georgia','14px sans-serif','rgb(20, 30, 40)','M9 8a3 3 0 1 1 5 2c-2 1-2 2-2 4m0 3v.1','.garden-word-card .g-close','.g-practice-heading .g-primary','’s reply'])assert.equal(isSpokenText(text),false,text);
});
test('authored language, contractions and source titles remain eligible',()=>{
 for(const text of ['Short for we have.','He promised.','I’ll return before dark.','A Small Repair','Back to SparkFest','The garden is quiet these days.','Choose Pip’s reply'])assert.equal(isSpokenText(text),true,text);
 assert.equal(pronunciationKey('We’ve'),"we've");assert.notEqual(pronunciationKey('well'),pronunciationKey("we'll"));
});
