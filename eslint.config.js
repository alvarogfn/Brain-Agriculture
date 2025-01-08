import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineFlatConfig } from 'eslint-define-config';
import importX from 'eslint-plugin-import-x';
import jest from 'eslint-plugin-jest';
import 'eslint-plugin-only-warn';
import perfectionist from 'eslint-plugin-perfectionist';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

const project = ['./tsconfig.json', 'packages/**/*/tsconfig.json'];

export default defineFlatConfig([
  // global ignores
  {
    ignores: [
      '**/node_modules',
      '**/coverage',
      '**/dist',
      '**/build',
      'pnpm-lock.yaml',
      'docker-compose.yml',
      'package.json',
    ],
  },

  // override default eslint rules
  {
    ...js.configs.recommended,
    rules: {
      'class-methods-use-this': 'off',
      'dot-notation': 'off',
      'max-params': 'off',
      'no-loop-func': 'off',
      'no-loss-of-precision': 'off',
      'no-magic-numbers': 'off',
      'no-unused-vars': 'off',
    },
  },

  unicorn.configs['flat/recommended'],

  {
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        project,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
      'import-x': importX,
    },
    rules: {
      '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/consistent-type-exports': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/no-array-constructor': 'warn',
      '@typescript-eslint/no-base-to-string': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'warn',
      '@typescript-eslint/no-duplicate-type-constituents': 'warn',
      '@typescript-eslint/no-extra-non-null-assertion': 'warn',

      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-for-in-array': 'warn',
      '@typescript-eslint/no-implied-eval': 'warn',
      '@typescript-eslint/no-misused-new': 'warn',
      '@typescript-eslint/no-namespace': 'warn',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
      '@typescript-eslint/no-redundant-type-constituents': 'warn',
      '@typescript-eslint/no-restricted-imports': [
        'warn',
        {
          paths: [
            {
              allowTypeImports: false,
              message: 'Please use "@/testing-library" instead.',
              name: '@testing-library/react',
            },
            {
              allowTypeImports: false,
              message: 'Please use @xstyled/xstyled-components instead.',
              name: 'styled-components',
            },
          ],
        },
      ],
      '@typescript-eslint/no-this-alias': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/prefer-as-const': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/restrict-plus-operands': 'warn',
      '@typescript-eslint/restrict-template-expressions': 'warn',
      '@typescript-eslint/triple-slash-reference': 'warn',
      '@typescript-eslint/unbound-method': 'warn',
      'import-x/consistent-type-specifier-style': ['warn', 'prefer-top-level'],
      'import-x/default': 'warn',
      'import-x/export': 'warn',
      'import-x/namespace': 'warn',
      'import-x/newline-after-import': 'warn',
      'import-x/no-absolute-path': 'warn',
      'import-x/no-cycle': ['warn', { maxDepth: 3 }],
      'import-x/no-duplicates': 'warn',
      'import-x/no-self-import': 'warn',
      'import-x/no-unused-modules': 'warn',
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project,
        },
      },
    },
  },

  {
    files: ['**/*.ts', '**/*.js', '**/*.jsx', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-array-includes': 'warn',
      'perfectionist/sort-classes': 'warn',
      'perfectionist/sort-enums': 'warn',
      'perfectionist/sort-exports': 'warn',
      'perfectionist/sort-imports': [
        'warn',
        {
          customGroups: {
            type: {
              react: ['react', 'react-*'],
            },
            value: {
              react: ['react', 'react-*'],
            },
          },
          groups: [
            'react',
            ['builtin', 'builtin-type', 'external', 'external-type'],
            ['internal', 'internal-type'],
            ['parent', 'parent-type', 'sibling', 'sibling-type'],
            ['index', 'index-type'],
          ],
          internalPattern: ['@/**'],
        },
      ],
      'perfectionist/sort-interfaces': 'warn',
      'perfectionist/sort-jsx-props': 'warn',
      'perfectionist/sort-maps': 'warn',
      'perfectionist/sort-named-exports': 'warn',
      'perfectionist/sort-object-types': 'warn',
      'perfectionist/sort-objects': 'warn',
      'perfectionist/sort-union-types': 'warn',

      'unicorn/no-null': 'off',
      'unicorn/no-useless-spread': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
    settings: {
      'import/parsers': {
        espree: ['.js', '.cjs', '.mjs', '.jsx'],
      },
    },
  },

  // testing with vitest
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: { jest },
    rules: {
      ...jest.configs['flat/recommended'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },

  // backend
  {
    files: ['**/*.server.ts', '**/*.server.tsx'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  eslintConfigPrettier,
]);
