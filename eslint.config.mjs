import jsPlugin from '@eslint/js';
import nx from '@nx/eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import angular from 'angular-eslint';
import { defineConfig } from 'eslint/config';

/**
 * Layering rule (see .docs/architecture): a project may only depend on projects of a strictly lower layer.
 * `layer:0` imports nothing from ngpel. Mosaik-facing code is tagged `scope:mosaik` and may not be imported
 * by anything that is not itself Mosaik-facing.
 */
const LAYER_CONSTRAINTS = [
    { sourceTag: 'layer:0', onlyDependOnLibsWithTags: [] },
    { sourceTag: 'layer:1', onlyDependOnLibsWithTags: ['layer:0'] },
    { sourceTag: 'layer:2', onlyDependOnLibsWithTags: ['layer:0', 'layer:1'] },
    { sourceTag: 'layer:3', onlyDependOnLibsWithTags: ['layer:0', 'layer:1', 'layer:2'] },
    { sourceTag: 'type:app', onlyDependOnLibsWithTags: ['*'] },
    { sourceTag: 'type:tool', onlyDependOnLibsWithTags: ['*'] },
];

export default defineConfig([
    jsPlugin.configs.recommended,
    ...nx.configs['flat/base'],
    ...nx.configs['flat/typescript'],
    ...nx.configs['flat/javascript'],
    {
        ignores: [
            '**/dist',
            '**/.cache/**',
            '**/tmp/**',
            '**/.vitepress/cache/**',
            '**/vite.config.*.timestamp*',
            '**/vitest.config.*.timestamp*',
            '**/eslint.config.*',
            '.docs/**',
            '.generated/**',
        ],
    },
    {
        files: ['**/*.{ts,tsx,js,jsx,mjs,mts}'],
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            '@stylistic/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: 'never' }],
            '@stylistic/space-before-function-paren': 'off',
        },
    },
    {
        files: [
            '**/*config.{js,cjs,mjs,ts,cts,mts}',
            '**/*.{config,configs}.?(c|m)js',
            '**/{vite,vitest,tailwind,webpack,rollup}.config.{js,cjs,mjs,ts,cts,mts}',
        ],
        languageOptions: {
            parserOptions: {
                projectService: false,
            },
        },
        rules: {
            '@nx/dependency-checks': 'off',
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    // A package's secondary entry points must reference each other through the package
                    // specifier: ng-packagr compiles every entry point separately and a relative import
                    // across an entry-point boundary would duplicate the code in both bundles.
                    allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$', '@pixel-brewery/ngpel-.*'],
                    depConstraints: LAYER_CONSTRAINTS,
                },
            ],
        },
    },
    {
        files: ['**/*.ts'],
        extends: [...angular.configs.tsRecommended],
        processor: angular.processInlineTemplates,
        rules: {
            '@angular-eslint/prefer-standalone': 'error',
            // Constructor injection is the house style: a service takes its collaborators as
            // parameters, which keeps it constructible in specs without TestBed. Angular resolves
            // them through the `useFactory` of the @Injectable decorator, which is also the only
            // way to inject interface-typed ports, since an interface carries no runtime token.
            '@angular-eslint/prefer-inject': 'off',
            // A published directive prefixes its bindings with `ngp` so they never collide with the
            // bindings of the host element it sits on, which means aliasing both inputs and outputs.
            '@angular-eslint/no-input-rename': 'off',
            '@angular-eslint/no-output-rename': 'off',
        },
    },
    {
        // The ngp prefix is the published selector namespace and therefore governs the libraries only;
        // workspace applications such as the consumer fixture keep their own prefix.
        files: ['libs/**/*.ts'],
        rules: {
            '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'ngp', style: 'camelCase' }],
            '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'ngp', style: 'kebab-case' }],
        },
    },
    {
        files: ['**/*.html'],
        extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
        rules: {},
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
        rules: {
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                },
            ],
            'no-unused-vars': 'off',
            'no-redeclare': 'off',
        },
    },
]);
