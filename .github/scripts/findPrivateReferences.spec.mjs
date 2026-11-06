import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { expect, it } from 'vitest';
import { findPrivateReferences } from './findPrivateReferences.mjs';

it('finds a reference hidden inside a tracked compressed file while skipping ignored workspace output', () => {
    const root = mkdtempSync(join(tmpdir(), 'ngpel-public-'));
    try {
        execFileSync('git', ['init', '--quiet'], { cwd: root });
        writeFileSync(join(root, '.gitignore'), 'build.txt\n');
        writeFileSync(join(root, 'build.txt'), 'internal-product');
        writeFileSync(join(root, 'archive.gz'), gzipSync(Buffer.from('INTERNAL-PRODUCT', 'utf16le')));
        execFileSync('git', ['add', 'archive.gz'], { cwd: root });

        expect(findPrivateReferences(root, ['internal-product'])).toEqual(['archive.gz']);
    } finally {
        rmSync(root, { recursive: true, force: true });
    }
});
