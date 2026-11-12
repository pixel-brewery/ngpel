#!/usr/bin/env node
/**
 * Consumer smoke test: packs every built ngpel package (`npm pack` on libs/<name>/dist), extracts the
 * tarballs into the fixture app's node_modules (exactly what an npm install would place there) and
 * builds the fixture with the Angular CLI. Afterwards it asserts that unused symbols were tree-shaken.
 */
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const FIXTURE = join(ROOT, 'apps/fixtures/ng22');
const PACKAGES = join(ROOT, 'tmp/packages');
const run = (command, cwd) => execSync(command, { cwd, stdio: 'inherit' });

rmSync(PACKAGES, { recursive: true, force: true });
mkdirSync(PACKAGES, { recursive: true });

const built = readdirSync(join(ROOT, 'libs')).filter((name) => existsSync(join(ROOT, 'libs', name, 'dist', 'package.json')));
if (built.length === 0) {
    console.error('no built packages found — run `yarn nx run-many -t build` first');
    process.exit(1);
}
for (const name of built) {
    run(`npm pack --silent --offline --ignore-scripts --pack-destination "${PACKAGES}"`, join(ROOT, 'libs', name, 'dist'));
}

const scopeDir = join(FIXTURE, 'node_modules', '@pixel-brewery');
rmSync(scopeDir, { recursive: true, force: true });
for (const tarball of readdirSync(PACKAGES).filter((file) => file.endsWith('.tgz'))) {
    const name = tarball.replace(/^pixel-brewery-/, '').replace(/-\d+\.\d+\.\d+.*\.tgz$/, '');
    const target = join(scopeDir, name);
    mkdirSync(target, { recursive: true });
    run(`tar -xzf "${join(PACKAGES, tarball)}" --strip-components=1 -C "${target}"`, ROOT);
    const manifest = JSON.parse(readFileSync(join(target, 'package.json'), 'utf8'));
    console.log(`installed ${manifest.name}@${manifest.version} → ${Object.keys(manifest.exports ?? {}).join(', ')}`);
}

run('npx ng build', FIXTURE);

const output = readdirSync(join(FIXTURE, 'dist/browser'))
    .filter((file) => file.endsWith('.js'))
    .map((file) => readFileSync(join(FIXTURE, 'dist/browser', file), 'utf8'))
    .join('\n');
const mustContain = ['ngpel core is wired', 'application/problem+json', 'Image preparation failed', 'Queue label'];
const mustNotContain = ['ApiResultError', 'matchResult', 'SearchManager', 'AudioRecorder', 'maps.googleapis.com/maps/api/js'];
const failures = [
    ...mustContain.filter((needle) => !output.includes(needle)).map((needle) => `expected bundle to contain "${needle}"`),
    ...mustNotContain.filter((needle) => output.includes(needle)).map((needle) => `expected "${needle}" to be tree-shaken away`),
];
if (failures.length > 0) {
    console.error(`fixture assertions failed:\n - ${failures.join('\n - ')}`);
    process.exit(1);
}
console.log(`fixture ok: ${built.length} package(s) consumed, tree-shaking verified`);
