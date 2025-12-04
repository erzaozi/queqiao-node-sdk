import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default [
    eslint.configs.recommended,

    ...tseslint.configs.recommended,

    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unnecessary-type-assertion': 'error',
            '@/prefer-const': 'error',
            '@typescript-eslint/restrict-plus-operands': 'error',
            'no-template-curly-in-string': 'error',
            'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
            'no-useless-concat': 'error',
        },
    },
    {
        plugins: {
            import: importPlugin,
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true, // 总是尝试解析TypeScript类型，即使没有指定扩展名
                    project: './tsconfig.json',
                },
            },
            'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        },
        rules: {
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        ['parent', 'sibling', 'index'],
                        'type',
                        'object',
                    ],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: false,
                    },
                    pathGroups: [
                        {
                            pattern: '@/**',
                            group: 'internal',
                            position: 'after',
                        },
                    ],
                    distinctGroup: false,
                },
            ],
            'import/first': 'error',
            'import/no-duplicates': 'error',
            'import/extensions': ['error', 'ignorePackages', {
                "js": 'never',
                "jsx": 'never',
                "ts": 'never',
                "tsx": 'never',
                "": 'never',
            }],
            'import/no-unresolved': 'error',
        },
    },
    {
        ignores: [
            '**/dist/',
            '**/node_modules/',
        ],
    },
];