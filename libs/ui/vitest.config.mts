import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
    root: import.meta.dirname,
    cacheDir: '../../node_modules/.vite/libs/ui',
    resolve: {
        alias: [
            { find: '@pixel-brewery/ngpel-core/notification', replacement: path.resolve(import.meta.dirname, '../core/src/notification/index.ts') },
            { find: '@pixel-brewery/ngpel-router/navigation', replacement: path.resolve(import.meta.dirname, '../router/src/navigation/index.ts') },
            { find: '@pixel-brewery/ngpel-core/storage', replacement: path.resolve(import.meta.dirname, '../core/src/storage/index.ts') },
            { find: '@pixel-brewery/ngpel-core/browser', replacement: path.resolve(import.meta.dirname, '../core/src/browser/index.ts') },
            { find: '@pixel-brewery/ngpel-router/shell', replacement: path.resolve(import.meta.dirname, '../router/src/shell/index.ts') },
            { find: '@pixel-brewery/ngpel-ui/markdown', replacement: path.resolve(import.meta.dirname, './src/markdown/index.ts') },
            { find: '@pixel-brewery/ngpel-ui/context-overlay', replacement: path.resolve(import.meta.dirname, './src/context-overlay/index.ts') },
            { find: '@pixel-brewery/ngpel-ui/google-maps', replacement: path.resolve(import.meta.dirname, './src/google-maps/index.ts') },
            { find: '@pixel-brewery/ngpel-core/update', replacement: path.resolve(import.meta.dirname, '../core/src/update/index.ts') },
            { find: '@pixel-brewery/ngpel-core/search', replacement: path.resolve(import.meta.dirname, '../core/src/search/index.ts') },
            { find: '@pixel-brewery/ngpel-core/audio', replacement: path.resolve(import.meta.dirname, '../core/src/audio/index.ts') },
            { find: '@pixel-brewery/ngpel-ui/widget', replacement: path.resolve(import.meta.dirname, './src/widget/index.ts') },
            { find: '@pixel-brewery/ngpel-core/rx', replacement: path.resolve(import.meta.dirname, '../core/src/rx/index.ts') },
            { find: '@pixel-brewery/ngpel-router', replacement: path.resolve(import.meta.dirname, '../router/src/index.ts') },
            { find: '@pixel-brewery/ngpel-core', replacement: path.resolve(import.meta.dirname, '../core/src/index.ts') },
            { find: '@pixel-brewery/ngpel-mvp', replacement: path.resolve(import.meta.dirname, '../mvp/src/index.ts') },
            { find: '@pixel-brewery/ngpel-ui', replacement: path.resolve(import.meta.dirname, './src/index.ts') },
        ],
    },
    test: {
        name: 'ui',
        watch: false,
        globals: true,
        environment: 'jsdom',
        setupFiles: [path.resolve(import.meta.dirname, 'src/test-setup.ts')],
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
        passWithNoTests: true,
        reporters: ['default'],
        coverage: {
            reportsDirectory: '../../coverage/libs/ui',
            provider: 'v8',
            include: ['src/**/*.ts'],
            exclude: ['**/index.ts', '**/*.spec.ts', 'src/test-setup.ts'],
        },
    },
}));
