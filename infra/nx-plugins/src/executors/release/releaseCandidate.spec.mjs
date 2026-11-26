// #region Imports
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from 'vitest';
import { releaseCandidate } from './releaseCandidate.mjs';
// #endregion

function fixture() {
    const scratch = join(process.cwd(), '.codex-work');
    mkdirSync(scratch, { recursive: true });
    const root = mkdtempSync(join(scratch, 'release-candidate-unit-'));
    const directory = join(root, 'artifact');
    mkdirSync(directory);
    const source = 'a'.repeat(40),
        commit = 'b'.repeat(40),
        version = '0.0.31';
    const filename = 'pixel-brewery-ngpel-core-0.0.31.tgz';
    const bytes = Buffer.from('already verified compiled package bytes');
    writeFileSync(join(directory, filename), bytes);
    writeFileSync(join(directory, 'release.bundle'), 'retained immutable bundle');
    writeFileSync(
        join(directory, 'release.json'),
        JSON.stringify({
            source,
            commit,
            version,
            archives: {
                [filename]: createHash('sha512').update(bytes).digest('hex'),
            },
        }),
    );
    const manifest = { name: '@pixel-brewery/ngpel-core', version };
    const data = { parent: source, changed: 'libs/core/package.json\0', committed: false };
    const calls = [];
    const git = (...args) => {
        calls.push(args);
        if (args[0] === 'fetch') return '';
        if (args[0] === 'rev-parse') return args[1] === 'FETCH_HEAD' || data.committed ? commit : source;
        if (args[0] === 'show' && args.includes('--format=%P')) return data.parent;
        if (args[0] === 'show') return JSON.stringify(manifest);
        if (args[0] === 'diff') return data.changed;
        if (args[0] === 'ls-files' || args[0] === 'add' || args[0] === 'update-ref') return '';
        if (args.includes('commit')) {
            data.committed = true;
            return '';
        }
        if (args[0] === 'bundle') {
            writeFileSync(args[2], 'prepared immutable bundle');
            return '';
        }
        throw new Error('Unexpected native Git operation.');
    };
    return {
        root,
        directory,
        source,
        commit,
        version,
        filename,
        bytes,
        data,
        calls,
        dependencies: { root, git, packages: [{ slug: 'core', manifest }] },
        cleanup: () => rmSync(root, { recursive: true, force: true }),
    };
}

test('retains and verifies the exact artifact bytes, original parent and fixed package version', () => {
    // Arrange
    const f = fixture();
    try {
        // Act
        const result = releaseCandidate('verify', f.directory, f.source, f.dependencies);
        // Assert
        expect(result).toEqual({ commit: f.commit, version: f.version });
    } finally {
        f.cleanup();
    }
});

for (const failure of ['archive-bytes', 'candidate-parent', 'runtime-source', 'archive-inventory'])
    test(`rejects a changed release artifact: ${failure}`, () => {
        // Arrange
        const f = fixture();
        try {
            if (failure === 'archive-bytes') writeFileSync(join(f.directory, f.filename), 'changed package bytes');
            if (failure === 'candidate-parent') f.data.parent = 'c'.repeat(40);
            if (failure === 'runtime-source') f.data.changed = 'libs/core/src/index.ts\0';
            if (failure === 'archive-inventory') writeFileSync(join(f.directory, 'unverified.tgz'), 'unexpected');
            // Act and Assert
            expect(() => releaseCandidate('verify', f.directory, f.source, f.dependencies)).toThrow();
        } finally {
            f.cleanup();
        }
    });

test('prepares one metadata commit without a CI-skip marker and records the original source', () => {
    // Arrange
    const f = fixture();
    try {
        const packed = join(f.root, 'tmp/packages');
        mkdirSync(packed, { recursive: true });
        writeFileSync(join(packed, f.filename), f.bytes);
        // Act
        const result = releaseCandidate('prepare', f.directory, f.source, f.dependencies);
        // Assert
        expect(result).toEqual({ commit: f.commit, version: f.version });
        expect(f.calls.find((args) => args.includes('commit'))?.at(-1)).toBe('chore(release): publish ngpel 0.0.31');
        expect(JSON.parse(readFileSync(join(f.directory, 'release.json'), 'utf8')).source).toBe(f.source);
        expect(f.calls.some((args) => args[0] === 'push')).toBe(false);
    } finally {
        f.cleanup();
    }
});
