import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: Number(process.env['EQ_WEB_PORT'] ?? 5173),
    strictPort: true,
    proxy: { '/api': `http://127.0.0.1:${process.env['EQ_API_PORT'] ?? 8787}` },
  },
  build: {
    outDir: 'dist/client',
    target: ['chrome111', 'edge111', 'firefox114', 'safari16.4'],
    license: true,
  },
});
