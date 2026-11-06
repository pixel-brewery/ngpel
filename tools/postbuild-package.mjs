#!/usr/bin/env node
/**
 * Post-build step for ng-packagr output: injects a `typesVersions` block derived from the generated
 * `exports` map so consumers on `moduleResolution: node` (which ignores `exports`) still resolve
 * subpath types, verifies package invariants and copies the workspace license into the distribution.
 *
 * Usage: node tools/postbuild-package.mjs libs/<name>
 */
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [, , projectRoot] = process.argv;
if (!projectRoot) {
    console.error('usage: node tools/postbuild-package.mjs libs/<name>');
    process.exit(1);
}
const distPackageJsonPath = join(projectRoot, 'dist', 'package.json');
if (!existsSync(distPackageJsonPath)) {
    console.error(`missing ${distPackageJsonPath} — run the ng-packagr build first`);
    process.exit(1);
}
const pkg = JSON.parse(readFileSync(distPackageJsonPath, 'utf8'));
const problems = [];

if (pkg.sideEffects !== false) {
    problems.push('sideEffects must be false');
}
if (!pkg.exports || !pkg.exports['.']) {
    problems.push('exports map is missing the primary entry');
}
// Mosaik and CodeMirror belong to `ui` alone, and always as peers: a consumer resolves them from its
// own tree, so the published package must never carry a copy of its own.
const OPTIONAL_STACKS = ['@pixel-brewery/mosaik', '@codemirror/', '@lezer/'];
const isOptionalStack = (dep) => OPTIONAL_STACKS.some((prefix) => dep.startsWith(prefix));
for (const dep of Object.keys(pkg.dependencies ?? {})) {
    if (isOptionalStack(dep)) {
        problems.push(`'${dep}' must be a peer dependency, not a hard dependency`);
    }
}
for (const dep of Object.keys(pkg.peerDependencies ?? {})) {
    if (isOptionalStack(dep) && pkg.name !== '@pixel-brewery/ngpel-ui') {
        problems.push(`'${dep}' is allowed in @pixel-brewery/ngpel-ui only`);
    }
}

const typesVersions = {};
for (const [subpath, target] of Object.entries(pkg.exports ?? {})) {
    if (subpath === '.' || subpath === './package.json' || typeof target !== 'object' || !target.types) {
        continue;
    }
    typesVersions[subpath.replace(/^\.\//, '')] = [target.types.replace(/^\.\//, '')];
}
if (Object.keys(typesVersions).length > 0) {
    pkg.typesVersions = { '*': typesVersions };
}

if (problems.length > 0) {
    console.error(`post-build checks failed for ${pkg.name}:\n - ${problems.join('\n - ')}`);
    process.exit(1);
}

writeFileSync(distPackageJsonPath, `${JSON.stringify(pkg, null, 2)}\n`);
copyFileSync(new URL('../LICENSE', import.meta.url), join(projectRoot, 'dist', 'LICENSE'));
console.log(`${pkg.name}: typesVersions for ${Object.keys(typesVersions).length} subpath(s), invariants ok`);
