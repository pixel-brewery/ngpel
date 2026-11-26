import baseConfig from '../../eslint.config.mjs';

export default [
    ...baseConfig,
    {
        // The root of Mosaik Foundation registers every Mosaik element when it is evaluated, so a value import from it
        // puts the whole component library into each consumer's bundle. Import values from their own module.
        files: ['src/**/*.ts'],
        ignores: ['src/**/*.spec.ts'],
        rules: {
            '@typescript-eslint/no-restricted-imports': [
                'error',
                {
                    paths: [
                        {
                            name: '@pixel-brewery/mosaik-elements-foundation',
                            message:
                                'Import values from their module under @pixel-brewery/mosaik-elements-foundation/dist/…; the root registers every Mosaik element.',
                            allowTypeImports: true,
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['**/*.json'],
        rules: {
            '@nx/dependency-checks': [
                'error',
                {
                    buildTargets: ['build'],
                    checkMissingDependencies: true,
                    checkObsoleteDependencies: false,
                    checkVersionMismatches: false,
                    ignoredFiles: [
                        '{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}',
                        '{projectRoot}/vitest.config.{js,cjs,mjs,ts,cts,mts}',
                        '{projectRoot}/**/*.spec.ts',
                        '{projectRoot}/src/test-setup.ts',
                    ],
                    ignoredDependencies: [
                        '@nx/vite',
                        'vite',
                        'vitest',
                        'tslib',
                        '@angular/compiler',
                        '@angular/platform-browser',
                        '@angular/core/testing',
                        '@angular/platform-browser/testing',
                        '@pixel-brewery/mosaik-themes',
                    ],
                },
            ],
        },
        languageOptions: {
            parser: await import('jsonc-eslint-parser'),
        },
    },
];
