import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
export default defineConfig({
  base: '/junctionx_if_submission/',
  plugins: [
    {
      name: 'pitch-deck-url-alias',
      apply: 'build',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'presentation/If-rinnalla-demo-EN.pdf',
          source: readFileSync(
            resolve(
              import.meta.dirname,
              'public/presentation/IF-Lahella-demo-EN.pdf',
            ),
          ),
        });
      },
    },
  ],
  build: {
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        personnel: resolve(import.meta.dirname, 'personnel.html'),
      },
    },
  },
});
