import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({
  base: '/junctionx_if_submission/',
  build: {
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        personnel: resolve(import.meta.dirname, 'personnel.html'),
      },
    },
  },
});
