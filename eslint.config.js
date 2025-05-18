import eslint from '@eslint/js';
import configPrettier from 'eslint-config-prettier/flat';
import i18nJsonPlugin from 'eslint-plugin-i18n-json';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import * as reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import path from 'node:path';
import { config as tsEslintConfig, configs as tsEslintConfigs } from 'typescript-eslint';

export default tsEslintConfig(
  eslint.configs.recommended,
  tsEslintConfigs.strict,
  {
    name: 'react/recommended',
    ...react.configs.flat.recommended,
    settings: {
      react: { version: 'detect' },
    },
  },
  {
    name: 'react/jsx-runtime',
    ...react.configs.flat['jsx-runtime'],
  },
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  jsxA11y.flatConfigs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    name: 'import/typescript',
    ...importPlugin.flatConfigs.typescript,
  },
  configPrettier,
  {
    name: 'eslint-plugin-i18n-json',
    files: ['src/shared/assets/locales/*.json'],
    plugins: {
      'i18n-json': i18nJsonPlugin,
    },
    processor: {
      meta: { name: '.json' },
      ...i18nJsonPlugin.processors['.json'],
    },
    languageOptions: {
      parserOptions: { extraFileExtensions: ['.json'] },
    },
    rules: {
      'i18n-json/identical-keys': [
        'error',
        {
          filePath: path.resolve('src/shared/assets/locales/ru.json'),
        },
      ],
      'i18n-json/identical-placeholders': [
        'error',
        {
          filePath: path.resolve('src/shared/assets/locales/ru.json'),
        },
      ],
      'i18n-json/sorted-keys': 'error',
      'i18n-json/valid-json': 'error',
    },
  },
  {
    name: 'Ant',
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': { typescript: true },
    },
    plugins: {
      perfectionist,
    },
    rules: {
      'no-console': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['default'],
              message: '`React` is globally available.',
            },
          ],
        },
      ],
      'no-duplicate-imports': 'error',
      'perfectionist/sort-imports': ['error', { type: 'natural', order: 'asc' }],
      'react/jsx-curly-brace-presence': 'error',
      'react/jsx-newline': ['error', { prevent: true }],
      'react/jsx-no-literals': 'error',
      'react/jsx-no-useless-fragment': 'error',
      'react/prop-types': 'off',
      'react/self-closing-comp': 'error',
      '@typescript-eslint/prefer-literal-enum-member': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true, caughtErrorsIgnorePattern: '^_' },
      ],
      'import/newline-after-import': 'error',
      'import/extensions': [
        'error',
        {
          pattern: {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
            json: 'always',
            css: 'always',
            svg: 'always',
          },
          checkTypeImports: true,
        },
      ],
    },
  },
  {
    name: 'Ant: src/',
    files: ['src/**'],
    ignores: ['src/**/*.d.ts'],
    rules: {
      'import/no-default-export': 'error',
    },
  },
  { name: 'Ignore', ignores: ['dist', 'dist-ssr'] },
);
