import {open, readFile, unlink} from 'node:fs/promises';

// Reservations are flushed before sending. A crash consumes the reservation;
// neither rerunning nor an unsuccessful response restores paid-call authority.
export async function openLedger(path, limit=75) {
  if(limit!==75)throw Error('The existing authorization permits exactly a 75-attempt ceiling.');
  const lockPath=path+'.lock', lock=await open(lockPath,'wx');
  await lock.writeFile(JSON.stringify({pid:process.pid,openedAt:new Date().toISOString()})+'\n');
  await lock.sync();
  try {
    let lines=[];try{lines=(await readFile(path,'utf8')).split('\n').filter(Boolean).map(line=>JSON.parse(line));}catch(e){if(e.code!=='ENOENT')throw e;}
    const reservations=lines.filter(x=>x.kind==='reserved');
    if(reservations.some((x,i)=>x.attempt!==i+1)||lines.some(x=>!['reserved','result','halt'].includes(x.kind)))throw Error('Invalid attempt ledger; fail closed.');
    let used=reservations.length, halted=lines.some(x=>x.kind==='halt');
    const file=await open(path,'a');
    const append=async(value)=>{await file.write(JSON.stringify(value)+'\n');await file.sync();lines.push(value);};
    return {
      get used(){return used;},get halted(){return halted;},get entries(){return structuredClone(lines);},
      async reserve(meta){if(halted)throw Error('Live evaluation was halted; no further calls authorized by this runner.');if(used>=limit)throw Error('75-attempt ceiling reached.');const attempt=used+1;await append({kind:'reserved',attempt,at:new Date().toISOString(),...meta});used=attempt;return attempt;},
      async result(attempt,value){if(!Number.isInteger(attempt)||attempt<1||attempt>used)throw Error('Unknown reservation.');await append({kind:'result',attempt,at:new Date().toISOString(),...value});},
      async halt(reason){halted=true;await append({kind:'halt',at:new Date().toISOString(),reason});},
      async close(){await file.close();await lock.close();await unlink(lockPath);}
    };
  } catch(e){await lock.close();await unlink(lockPath);throw e;}
}
