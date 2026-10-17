import js from '@eslint/js';
import tseslint from 'typescript-eslint';
export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'test-results/**',
      'playwright-report/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,ts,cjs}'],
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        history: 'readonly',
        innerWidth: 'readonly',
        ResizeObserver: 'readonly',
        NodeFilter: 'readonly',
        getComputedStyle: 'readonly',
        Event: 'readonly',
        requestAnimationFrame: 'readonly',
        setTimeout: 'readonly',
        console: 'readonly',
        process: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        structuredClone: 'readonly',
      },
    },
  },
);
