import {build} from 'vite';
await build({configFile:false,logLevel:'warn',build:{outDir:'.cache/checkpoint-runtime',emptyOutDir:false,lib:{entry:'scripts/checkpoint-runtime.ts',formats:['es'],fileName:()=> 'index.js'},rollupOptions:{external:id=>id==='three'||id.startsWith('three/addons/')}}});
