import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
    root: import.meta.dirname,
    cacheDir: '../../node_modules/.vite/libs/forms',
    resolve: {
        alias: [
            { find: '@pixel-brewery/ngpel-core/notification', replacement: path.resolve(import.meta.dirname, '../core/src/notification/index.ts') },
            { find: '@pixel-brewery/ngpel-core/storage', replacement: path.resolve(import.meta.dirname, '../core/src/storage/index.ts') },
            { find: '@pixel-brewery/ngpel-core/browser', replacement: path.resolve(import.meta.dirname, '../core/src/browser/index.ts') },
            { find: '@pixel-brewery/ngpel-core/update', replacement: path.resolve(import.meta.dirname, '../core/src/update/index.ts') },
            { find: '@pixel-brewery/ngpel-core/search', replacement: path.resolve(import.meta.dirname, '../core/src/search/index.ts') },
            { find: '@pixel-brewery/ngpel-core/audio', replacement: path.resolve(import.meta.dirname, '../core/src/audio/index.ts') },
            { find: '@pixel-brewery/ngpel-core/rx', replacement: path.resolve(import.meta.dirname, '../core/src/rx/index.ts') },
            { find: '@pixel-brewery/ngpel-forms', replacement: path.resolve(import.meta.dirname, './src/index.ts') },
            { find: '@pixel-brewery/ngpel-core', replacement: path.resolve(import.meta.dirname, '../core/src/index.ts') },
        ],
    },
    test: {
        name: 'forms',
        watch: false,
        globals: true,
        environment: 'jsdom',
        setupFiles: [path.resolve(import.meta.dirname, 'src/test-setup.ts')],
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
        passWithNoTests: true,
        reporters: ['default'],
        coverage: {
            reportsDirectory: '../../coverage/libs/forms',
            provider: 'v8',
            include: ['src/**/*.ts'],
            exclude: ['**/index.ts', '**/*.spec.ts', 'src/test-setup.ts'],
        },
    },
}));
