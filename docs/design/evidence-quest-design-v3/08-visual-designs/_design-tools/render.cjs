const fs=require('fs'),path=require('path');
const sharp=require('C:/Users/TonyGuillaro/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const dir=path.resolve(__dirname,'..');
(async()=>{for(const f of fs.readdirSync(dir).filter(f=>f.endsWith('.svg'))){let out=path.join(dir,f.replace('.svg','.png'));if(!fs.existsSync(out)||fs.statSync(out).mtimeMs<fs.statSync(path.join(dir,f)).mtimeMs)await sharp(path.join(dir,f),{density:72}).png().toFile(out);}console.log('Rendered static SVG design boards.');})();
