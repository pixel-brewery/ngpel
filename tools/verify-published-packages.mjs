import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifyEsmPackage } from './verify-esm-packages.mjs';
import { workspacePackages } from './workspace-packages.mjs';

/** Rejects downloaded bytes that do not match the registry's SHA-512 integrity. */
export function verifyPublishedIntegrity(archive, expected) {
    const actual = `sha512-${createHash('sha512').update(archive).digest('base64')}`;
    if (actual !== expected) throw new Error('The downloaded package does not match the registry integrity.');
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const directory = mkdtempSync(join(tmpdir(), 'ngpel-registry-'));
    const license = readFileSync(new URL('../LICENSE', import.meta.url));
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    try {
        for (const pkg of workspacePackages()) {
            const specifier = `${pkg.name}@${pkg.manifest.version}`;
            const registry = '--registry=https://npm.pkg.github.com';
            const integrity = execFileSync(npm, ['view', specifier, 'dist.integrity', registry], { encoding: 'utf8' }).trim();
            const [result] = JSON.parse(
                execFileSync(npm, ['pack', specifier, registry, '--json', '--ignore-scripts', '--pack-destination', directory], { encoding: 'utf8' }),
            );
            const archive = join(directory, result.filename);
            verifyPublishedIntegrity(readFileSync(archive), integrity);
            const manifest = JSON.parse(execFileSync('tar', ['-xOf', archive, 'package/package.json'], { encoding: 'utf8' }));
            const paths = new Set(result.files.map(({ path }) => path));
            verifyEsmPackage(pkg, manifest, (filename) => paths.has(filename));
            if (!execFileSync('tar', ['-xOf', archive, 'package/LICENSE']).equals(license)) {
                throw new Error(`${specifier}: downloaded license differs from the repository notice.`);
            }
            console.log(`Verified ${specifier} against GitHub Packages.`);
        }
    } finally {
        rmSync(directory, { recursive: true, force: true });
    }
}
