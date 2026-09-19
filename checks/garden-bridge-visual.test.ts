import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import {PaperArt} from '../src/garden/art.js';
import {makeBridgeWorld} from '../src/garden/bridgeWorld.js';
import {initialGarden} from '../src/garden/model.js';
import {freshConstruction,bridgePosts,postPoint,postStoragePoint,syncConstruction} from '../src/garden/bridgeConstruction.js';
import {BRIDGE_LEVELS,BRIDGE_GEOMETRY} from '../src/garden/worldLayout.js';

function fixture(){
 const s=initialGarden('bridge-visual');s.ready=true;s.chapter.started=true;s.chapter.pip={x:-2.4,z:3};s.chapter.sections={a:{x:-.775,z:3,rotation:0},b:{x:.775,z:3,rotation:0}};s.chapter.river.construction=freshConstruction();s.chapter.river.construction.first='a';s.chapter.river.ropesCollected=true;
 const art=new PaperArt(),view=makeBridgeWorld(art);return {s,art,view};
}
test('staged bridge visual: six distinct material posts, named physical targets and no invented seventh anchor',()=>{
 const {s,art,view}=fixture();view.render(s,0);
 assert.equal(view.pickables.length,8);assert.deepEqual(view.pickables.filter(p=>String(p.userData['target']).startsWith('post:')).map(p=>p.userData['target']),bridgePosts.map(id=>'post:'+id));
 for(const id of bridgePosts){const p=view.root.getObjectByName(id)!,storage=postStoragePoint(id);assert.equal(p.position.x,storage.x);assert.equal(p.position.z,storage.z);}
 view.dispose();art.dispose();
});
test('staged bridge visual: first-half ropes stop at center posts and retain both banks of knots as the crossing extends',()=>{
 const {s,art,view}=fixture(),b=s.chapter.river.construction!;
 for(const side of ['north','south'] as const){b.posts[`west-${side}`]=b.posts[`center-${side}`]=true;b.ropes[side]={west:true,center:true,east:false};}syncConstruction(s.chapter);view.render(s,0);
 const rope=view.root.getObjectByName('north-rope') as T.InstancedMesh;
 assert.equal(rope.count,20);const m=new T.Matrix4(),p=new T.Vector3();for(let i=0;i<rope.count;i++){rope.getMatrixAt(i,m);p.setFromMatrixPosition(m);assert.ok(p.x>=-1.55&&p.x<=0);assert.ok(Math.abs(p.z-(3-BRIDGE_GEOMETRY.postOffset))<.00001);assert.ok(p.y>BRIDGE_LEVELS.deck+.37&&p.y<BRIDGE_LEVELS.deck+.57);}
 for(const side of ['north','south'] as const){b.posts[`east-${side}`]=true;b.ropes[side].east=true;}syncConstruction(s.chapter);view.render(s,1);assert.equal(rope.count,40);assert.equal(view.render(s,1).secured.b,true);
 view.dispose();art.dispose();
});
test('staged bridge visual: a post preview is reversible and rope motion does not allocate new geometry',()=>{
 const {s,art,view}=fixture(),b=s.chapter.river.construction!,before=structuredClone(b),origin=postStoragePoint('west-north'),point=postPoint(s.chapter,'west-north');
 s.gesture={object:'post:west-north',origin,point,rotation:0,travel:1,minZ:origin.z,maxZ:point.z};view.render(s,0);
 assert.equal(view.root.getObjectByName('west-north')!.position.x,point.x);assert.deepEqual(b,before);
 s.gesture=null;view.render(s,0);assert.equal(view.root.getObjectByName('west-north')!.position.x,origin.x);
 const resources=art.resources.size;for(let i=0;i<100;i++){s.gesture={object:'rope:north',origin:{x:-1.55,z:2.49},point:{x:i/100-1,z:2.49},rotation:0,travel:1,minZ:2.49,maxZ:2.49};view.render(s,i/60);}
 assert.equal(art.resources.size,resources);assert.deepEqual(b,before);view.dispose();art.dispose();
});
