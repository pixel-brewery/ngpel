import { expect, it } from 'vitest';
import { verifyEsmPackage } from './verify-esm-packages.mjs';

const name = '@pixel-brewery/ngpel-example';
const repository = { url: 'https://github.com/pixel-brewery/ngpel' };
const manifest = { name, repository, version: '0.0.2', type: 'module', sideEffects: false, license: 'MIT' };

it('rejects a secondary entry whose declarations were omitted from the archive', () => {
    const source = { name, manifest, entryPoints: ['.', './feature'] };
    const built = {
        ...manifest,
        exports: {
            './package.json': { default: './package.json' },
            '.': { default: './index.mjs', types: './index.d.ts' },
            './feature': { default: './feature.mjs', types: './feature.d.ts' },
        },
    };
    const files = new Set(['LICENSE', 'package.json', 'index.mjs', 'index.d.ts', 'feature.mjs']);

    expect(() => verifyEsmPackage(source, built, (filename) => files.has(filename))).toThrow('./feature has a missing or invalid types file');
});
