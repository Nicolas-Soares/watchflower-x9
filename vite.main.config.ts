import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    browserField: false,
    mainFields: ['module', 'jsnext:main', 'jsnext'],
  },
  build: {
    ssr: true,
    rollupOptions: {
      external: [
        'electron',
        /^node:/,
        'path',
        'fs',
        'os',
        'crypto',
        'child_process',
        'util',
        '@prisma/client',
        '@prisma/adapter-libsql',
        '@libsql/client',
        'pino',
        'pino-pretty',
        'viem'
      ],
      output: {
        entryFileNames: 'index.cjs',
      },
    },
  },
});
