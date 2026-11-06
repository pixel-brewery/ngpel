#!/usr/bin/env node
/**
 * Moves a package's code under src/ while keeping the ng-packagr marker directories at the package
 * root: libs/<pkg>/<entry>/src/** becomes libs/<pkg>/src/<entry>/**, and libs/<pkg>/<entry> keeps
 * only its ng-package.json. spec-support moves to src/spec-support.
 *
 * Usage: node tools/restructure-to-src.mjs <pkg> [<pkg> ...]
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';

const manifest = JSON.parse(readFileSync('tools/packages.json', 'utf8'));
const git = (...args) => {
    try {
        execFileSync('git', args, { stdio: 'pipe' });
        return true;
    } catch {
        return false;
    }
};

/** A scaffolded destination holds nothing but an empty barrel and must not block the move. */
const isPlaceholder = (dir) => {
    if (!existsSync(dir)) return false;
    const entries = readdirSync(dir);
    return entries.length === 1 && entries[0] === 'index.ts' && readFileSync(join(dir, 'index.ts'), 'utf8').trim() === 'export {};';
};

const move = (from, to) => {
    if (!existsSync(from)) return false;
    if (isPlaceholder(to)) rmSync(to, { recursive: true, force: true });
    if (!git('mv', from, to)) renameSync(from, to);
    return true;
};

for (const name of process.argv.slice(2)) {
    const pkg = manifest.packages.find((p) => p.name === name);
    if (!pkg) {
        console.error(`unknown package: ${name}`);
        process.exitCode = 1;
        continue;
    }
    const base = join('libs', name);
    const moved = [];

    for (const entry of Object.keys(pkg.entryPoints)) {
        if (entry === '.') continue;
        if (move(join(base, entry, 'src'), join(base, 'src', entry))) moved.push(entry);
    }
    if (move(join(base, 'spec-support', 'src'), join(base, 'src', 'spec-support'))) {
        rmSync(join(base, 'spec-support'), { recursive: true, force: true });
        moved.push('spec-support');
    }

    // relative imports that crossed the old entry boundary keep working, because every entry kept its
    // own directory name; only paths that walked out of <entry>/src need one segment less.
    const walk = (dir, out = []) => {
        for (const item of readdirSync(dir, { withFileTypes: true })) {
            const path = join(dir, item.name);
            if (item.name === 'dist' || item.name === 'node_modules') continue;
            item.isDirectory() ? walk(path, out) : path.endsWith('.ts') && out.push(path);
        }
        return out;
    };
    let rewritten = 0;
    for (const file of existsSync(join(base, 'src')) ? walk(join(base, 'src')) : []) {
        const text = readFileSync(file, 'utf8');
        const next = text.replace(/from '((?:\.\.\/)+)([^']*)'/g, (match, ups, rest) => {
            const target = join(dirname(file), ups, rest);
            if (existsSync(`${target}.ts`) || existsSync(join(target, 'index.ts'))) return match;
            const shorter = join(dirname(file), ups.slice(3), rest);
            if (!existsSync(`${shorter}.ts`) && !existsSync(join(shorter, 'index.ts'))) return match;
            let rel = relative(dirname(file), shorter).split('\\').join('/');
            if (!rel.startsWith('.')) rel = `./${rel}`;
            return `from '${rel}'`;
        });
        if (next !== text) {
            writeFileSync(file, next);
            rewritten++;
        }
    }
    console.log(`${name}: moved ${moved.join(', ') || 'nothing'}; adjusted ${rewritten} relative import(s)`);
}
