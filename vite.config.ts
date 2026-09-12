import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Explicit permissive CSS path; see docs/PRODUCTION-TOOLCHAIN.md.
  css: { transformer: 'postcss' },
  server: {
    host: '127.0.0.1',
    port: Number(process.env['EQ_WEB_PORT'] ?? 5173),
    strictPort: true,
    proxy: { '/api': `http://127.0.0.1:${process.env['EQ_API_PORT'] ?? 8787}` },
  },
  build: {
    manifest: true,
    outDir: 'dist/client',
    target: ['chrome111', 'edge111', 'firefox114', 'safari16.4'],
    license: true,
    cssMinify: 'esbuild',
  },
});
