import { readFileSync, realpathSync, statSync } from 'node:fs';
import { isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { workspacePackages } from './workspace-packages.mjs';

/** Verifies the Angular package's ESM, declaration, and license contract against an actual file inventory. */
export function verifyEsmPackage(expected, built, hasFile) {
    const require = (condition, reason) => {
        if (!condition) throw new Error(`${expected.name}: ${reason}`);
    };
    require(built.name === expected.name && built.version === expected.manifest.version, 'package identity or version differs from the source');
    require(built.repository?.url === expected.manifest.repository.url, 'repository metadata differs from the source');
    require(built.type === 'module' && built.sideEffects === false, 'expected an ESM distribution with sideEffects disabled');
    require(built.license === 'MIT' && hasFile('LICENSE'), 'missing MIT license notice');
    const wanted = ['package.json', ...expected.entryPoints];
    const entries = built.exports ?? {};
    require(Object.keys(entries).length === wanted.length && entries['./package.json']?.default === './package.json', 'unexpected export map');
    for (const entry of expected.entryPoints) {
        const target = entries[entry];
        require(target && !Object.hasOwn(target, 'require'), `${entry} must export ESM`);
        for (const [condition, suffix] of [
            ['types', '.d.ts'],
            ['default', '.mjs'],
        ]) {
            const filename = target[condition];
            require(typeof filename === 'string' &&
                filename.startsWith('./') &&
                !filename
                    .slice(2)
                    .split(/[\\/]/u)
                    .some((part) => !part || part === '.' || part === '..') &&
                filename.endsWith(suffix) &&
                hasFile(filename.slice(2)), `${entry} has a missing or invalid ${condition} file`);
        }
    }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const packages = workspacePackages();
    const license = readFileSync(new URL('../LICENSE', import.meta.url));
    for (const pkg of packages) {
        const dist = realpathSync(join(pkg.directory, 'dist'));
        const manifest = JSON.parse(readFileSync(join(dist, 'package.json'), 'utf8'));
        verifyEsmPackage(pkg, manifest, (filename) => {
            try {
                const file = realpathSync(join(dist, filename));
                const path = relative(dist, file);
                return !isAbsolute(path) && path !== '..' && !path.startsWith(`..${sep}`) && statSync(file).isFile();
            } catch (error) {
                if (error.code === 'ENOENT') return false;
                throw error;
            }
        });
        if (!readFileSync(join(dist, 'LICENSE')).equals(license)) throw new Error(`${pkg.name}: packaged license differs from the repository notice.`);
    }
    console.log(`Verified ESM exports and MIT notices for ${packages.length} Angular packages.`);
}
