import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    ssr: true,
    rollupOptions: {
      external: ['electron', /^node:/, 'path', 'fs', 'os', 'crypto', 'child_process', 'util'],
    },
  },
});
