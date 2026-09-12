import { readdir, readFile, mkdir, copyFile, writeFile, stat } from 'node:fs/promises';
import { resolve, join, relative } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(import.meta.dirname, '..');
const source = resolve(process.argv[2] ?? '');
if (!source.endsWith('evidence-quest-design-v3')) throw new Error('Explicit Evidence Quest design source required');
const target = join(root, 'docs/design/evidence-quest-design-v3');
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
async function* walk(dir) {
  for (const entry of (await readdir(dir, { withFileTypes: true })).sort((a,b) => a.name.localeCompare(b.name))) {
    if (entry.isSymbolicLink()) throw new Error(`Unexpected link: ${entry.name}`);
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path); else yield path;
  }
}
const plan = JSON.parse(await readFile(join(source,'11-build-packet/implementation-plan.json'),'utf8'));
for (const file of plan.inputEvidence) {
  if (digest(await readFile(join(source,file.path))) !== file.sha256) throw new Error(`Authority mismatch: ${file.path}`);
}
const inventory = [];
for await (const path of walk(source)) {
  const name = relative(source,path).replaceAll('\\','/');
  const destination = join(target,name);
  await mkdir(resolve(destination,'..'),{recursive:true});
  const original = await readFile(path);
  try { await stat(destination); throw new Error(`Refusing to overwrite existing import: ${name}`); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  await copyFile(path,destination);
  const copied = await readFile(destination);
  if (!original.equals(copied)) throw new Error(`Copy mismatch: ${name}`);
  inventory.push({path:name,bytes:original.length,sha256:digest(original)});
}
await copyFile(join(source,'../START-HERE-EVIDENCE-QUEST.md'),join(root,'docs/BUILD-START.md'));
await mkdir(join(root,'evidence'),{recursive:true});
await writeFile(join(root,'evidence/design-import.json'),JSON.stringify({
  importedAt:new Date().toISOString(),source,destination:'docs/design/evidence-quest-design-v3',
  authorityHashesVerified:plan.inputEvidence.length,fileCount:inventory.length,
  bytes:inventory.reduce((n,f)=>n+f.bytes,0),files:inventory
},null,2)+'\n');
const rows = plan.tasks.filter(t=>/^TASK11\.(0\d|1[0-6])$/.test(t.id)).map(t=>
  `| ${t.id} | ${t.title} | ${t.id==='TASK11.00'?'DOCUMENTED_COMPLETE':t.id==='TASK11.01'?'IN_PROGRESS':'NOT_STARTED'} | ${t.dependsOn.join(', ')||'—'} | ${t.id==='TASK11.00'?'Imported Item 12 checkpoint; design evidence only.':'Pending implementation and applicable acceptance evidence.'} |`);
await writeFile(join(root,'BUILD-STATUS.md'),`# Evidence Quest build status\n\nUpdated ${new Date().toISOString()}. Item 13 / M11.CONNECTED is **IN_PROGRESS**.\n\nRead this file first on every continuation. Task definitions and dependencies come only from [implementation-plan.json](docs/design/evidence-quest-design-v3/11-build-packet/implementation-plan.json). TASK11.00 is documented complete. This execution is authorized for TASK11.01–16 and normal pushes to a new private TonyG-FWE repository.\n\n## Workspace and setup evidence\n\n- Current dedicated game workspace: ${root}\n- Historical proposed path in the startup packet is superseded by the user's current dedicated workspace boundary. The folder was verified empty except for an unborn Git repository, with no remote and no commits; no nested repository is created.\n- Source path's missing separator was corrected to C:\\Users\\TonyGuillaro\\.codex.\n- Complete original import: ${inventory.length} files, ${inventory.reduce((n,f)=>n+f.bytes,0)} bytes; all 29 authority hashes and every copied byte verified. [Inventory](evidence/design-import.json). Original source remains unchanged; dated execution/status changes live in this repository.\n- Active GitHub CLI account TonyG-FWE verified with existing keyring authentication. Initial sandbox configuration denial resolved through approved read-only access. No credentials changed.\n- GitHub repository: not created yet. Local initial branch/identity setup and first commit pending.\n- Node host: 22.22.2; approved baseline requires 24.21.0. Workspace-local runtime verification in progress. npm 10.9.7 works through its installed direct entry point; default npm wrapper failed in sandbox.\n\n## Task progress\n\n| ID | Existing task | Status | Dependencies | Result / evidence |\n|---|---|---|---|---|\n${rows.join('\n')}\n\n## Verification and boundaries\n\nNo game handler, browser test, storage fault, temporary asset, or live/player evaluation has passed yet. Initial import hashes are integrity evidence only. Exact FIX11/CHECK11 records and commit references will be added as tasks complete.\n\nTemporary Q00/Q01 graphics are authorized; current Item 08 rich illustration and cast remain the final quality target. Seven comparison/timeline/general My ideas states defer to TASK11.17; both search/story plan tools remain in scope. Authored help needs no credentials. Final art, paid live calls, child-live activation, deployment, submission, and public publication are outside this milestone.\n\n## Current next dependency\n\nFinish TASK11.01 (toolchain, local Git, private remote and verified push), then TASK11.02 complete canonical content. Do not bypass unfinished dependencies.\n\n## Calibration\n\nExecution began 2026-09-12T01:22:14Z (goal creation). Human active minutes are unknown, not zero. No duration forecast or final-art throughput is inferred from setup. Task intervals, iterations, waits and verification repairs will be recorded in evidence/calibration.json and the existing plan schedule.\n`);
console.log(JSON.stringify({files:inventory.length,bytes:inventory.reduce((n,f)=>n+f.bytes,0),authorities:plan.inputEvidence.length}));
