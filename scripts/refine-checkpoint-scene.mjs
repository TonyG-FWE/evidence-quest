import fs from 'node:fs/promises';
const file='src/garden/GardenScene.tsx';let source=await fs.readFile(file,'utf8');
source=source.replaceAll('element.dataset','metadata');
source=source.replace('const element=host.current!;const art=',"const element=host.current!;const values:Record<string,string>={};const metadata=new Proxy(element.dataset,{set(target,key,value){const name=String(key),text=String(value);if(values[name]!==text){values[name]=text;target[name]=text;}return true;}});const art=");
source=source.replace("inAdventure&&(overview||distance(c.pip,GRANDMA)<19||s.mode==='boat'||!!c.river.collection)","inAdventure&&(overview||c.pip.x>1.4&&distance(c.pip,GRANDMA)<11||s.mode==='boat'||!!c.river.collection)");
source=source.replace("const seed=art.ball(scene,0,.5,0,.08,","const seed=art.ball(scene,0,.5,0,.04,");
source=source.replaceAll('seed.position.copy(pip.handPoint())','seed.position.copy(pip.handPoint(undefined,.04))').replaceAll('seed.position.copy(grandma.handPoint())','seed.position.copy(grandma.handPoint(undefined,.04))');
source=source.replace("label.hidden=!visible;if(line)line.hidden=!visible;", "if(label.hidden===visible)label.hidden=!visible;if(line&&line.hidden===visible)line.hidden=!visible;");
source=source.replace("label.style.left=lx+'px';label.style.top=ly+'px';", "const px=lx+'px',py=ly+'px';if(label.style.left!==px)label.style.left=px;if(label.style.top!==py)label.style.top=py;");
// Keep interaction captions off the player's body, including the repair-box label.
source=source.replace("const labelOffsets:Record<string,[number,number]>={materials:[-15,-64]", "const labelOffsets:Record<string,[number,number]>={materials:[-150,-30]");
await fs.writeFile(file,source);
