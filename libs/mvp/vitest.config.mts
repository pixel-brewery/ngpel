import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
    root: import.meta.dirname,
    cacheDir: '../../node_modules/.vite/libs/mvp',
    resolve: {
        alias: [{ find: '@pixel-brewery/ngpel-mvp', replacement: path.resolve(import.meta.dirname, './src/index.ts') }],
    },
    test: {
        name: 'mvp',
        watch: false,
        globals: true,
        environment: 'jsdom',
        setupFiles: [path.resolve(import.meta.dirname, 'src/test-setup.ts')],
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
        passWithNoTests: true,
        reporters: ['default'],
        coverage: {
            reportsDirectory: '../../coverage/libs/mvp',
            provider: 'v8',
            include: ['src/**/*.ts'],
            exclude: ['**/index.ts', '**/*.spec.ts', 'src/test-setup.ts'],
        },
    },
}));
