// eslint.config.js (프로젝트 루트)
import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginPromise from 'eslint-plugin-promise';
import pluginUnicorn from 'eslint-plugin-unicorn';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/*.cjs',
      '**/build/**',
      '**/.stversions/**', // Syncthing
      '**/coverage/**',
      '**/.vscode/**',
      '**/.git/**',
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    plugins: {
      promise: pluginPromise,
    },
    rules: {
      ...pluginPromise.configs.recommended.rules,
      'promise/catch-or-return': 'off',
      'promise/always-return': 'off',
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        croffle: 'readonly',
      },
    },
    plugins: {
      import: pluginImport,
      unicorn: pluginUnicorn,
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            pascalCase: true,
            camelCase: true,
          },
          ignore: [
            /.*~\d{8}-\d{6}\..*$/, // Syncthing
          ],
        },
      ],
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-top-level-await': 'off',
    },
  },
  {
    files: ['app/renderer/src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './app/renderer/tsconfig.app.json',
        tsconfigRootDir: process.cwd(),
      },
    },
  },
  {
    files: ['app/renderer/vite.config.{ts,js}'],
    languageOptions: {
      parserOptions: {
        project: './app/renderer/tsconfig.node.json',
        tsconfigRootDir: process.cwd(),
      },
    },
  },
  {
    files: ['app/main/src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './app/main/tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './app/main/tsconfig.json',
        },
      },
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      // Vue 관련 규칙
      'vue/multi-word-component-names': 'off',
      'vue/component-api-style': ['error', ['script-setup', 'composition']],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/no-v-html': 'warn',
    },
  },

  // Prettier 연동
  eslintConfigPrettier,
];
