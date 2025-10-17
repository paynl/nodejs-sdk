import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import unusedImports from 'eslint-plugin-unused-imports';
import { plugin } from 'typescript-eslint';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import jest from 'eslint-plugin-jest';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        files: ['**/*.ts'],
        extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
        plugins: {
            '@typescript-eslint': plugin,
        },
        rules: {
            '@typescript-eslint/method-signature-style': 'error',
            '@typescript-eslint/array-type': 'error',
            '@typescript-eslint/no-empty-object-type': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
        },
    },
    eslintPluginPrettierRecommended,
    {
        plugins: {
            'unused-imports': unusedImports,
        },
        rules: {
            'unused-imports/no-unused-imports': 'error',
        },
    },
    {
        rules: {
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'Property[method=true]',
                    message:
                        'Use arrow function properties (e.g., reset: () => {}) instead of method shorthand (reset() {}).',
                },
            ],
            quotes: ['error', 'single', { avoidEscape: true }],
            'no-empty-pattern': 'error',
        },
    },
    {
        files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
        ...jest.configs['flat/recommended'],
    },
    {
        ignores: ['lib/*', 'eslint.config.js'],
    },
);
