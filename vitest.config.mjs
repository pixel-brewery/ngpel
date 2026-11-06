import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        projects: ['libs/**/vitest.config.mts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            thresholds: {
                statements: 80,
                branches: 80,
                functions: 80,
                lines: 80,
            },
        },
    },
});
