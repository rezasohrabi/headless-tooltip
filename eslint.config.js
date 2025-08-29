import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import configPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import storybook from 'eslint-plugin-storybook';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config({
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parserOptions: {
      ecmaVersion: 'latest',
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      ...globals.node,
      ...globals.browser,
      ...globals.es2021,
    },
  },
  plugins: {
    js,
    react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    prettier: eslintPluginPrettier,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    react.configs.flat.recommended,
    jsxA11y.flatConfigs.recommended,
    storybook.configs['flat/recommended'],
    configPrettier,
  ],
  rules: {
    ...reactHooks.configs.recommended.rules,
    'storybook/default-exports': 'off',
  },
  ignores: [
    '**/node_modules/**',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/.husky/**',
    '**/.storybook/**',
    '**/storybook-static/**',
    '**/dist/**',
    '**/docs/**',
  ],
});
