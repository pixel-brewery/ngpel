import { defineConfig } from 'cspell';

export default defineConfig({
    version: '0.2',
    languageId: 'javascript,typescript,css,scss,html,json,md,xml,yaml',
    dictionaryDefinitions: [
        {
            name: 'cspell.words',
            path: './cspell.words.txt',
            addWords: true,
        },
    ],
    dictionaries: ['cspell.words'],
    ignorePaths: ['node_modules', '/cspell.words.txt', '**/dist/**', '.docs/packages/*/api/**', 'yarn.lock', '**/CHANGELOG.md'],
});
