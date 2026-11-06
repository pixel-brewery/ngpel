import baseConfig from '../../eslint.config.mjs';

export default [
    ...baseConfig,
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
