#!/usr/bin/env node
/**
 * Scaffolds ngpel packages from tools/packages.json.
 *
 * - Creates missing package files (never overwrites existing ones unless --force is given).
 * - Always synchronises workspace-level files derived from the manifest:
 *   tsconfig.base.json `paths`, root tsconfig.json `references`, the docs app implicitDependencies.
 *
 * Usage:
 *   node tools/scaffold-packages.mjs            # all packages
 *   node tools/scaffold-packages.mjs core mvp   # selected packages
 *   node tools/scaffold-packages.mjs --force    # overwrite generated config files (never src/)
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = JSON.parse(readFileSync(join(ROOT, 'tools/packages.json'), 'utf8'));
const args = process.argv.slice(2);
const force = args.includes('--force');
const selected = args.filter((a) => !a.startsWith('--'));
const packages = MANIFEST.packages.filter((p) => selected.length === 0 || selected.includes(p.name));

const npmName = (name) => `${MANIFEST.scope}/${MANIFEST.prefix}${name}`;
const json = (value) => `${JSON.stringify(value, null, 4)}\n`;

function write(file, content, { overwrite = false } = {}) {
    const abs = join(ROOT, file);
    if (existsSync(abs) && !overwrite) {
        console.log(`kept  ${file}`);
        return false;
    }
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, content);
    console.log(`wrote ${file}`);
    return true;
}

function peerDependenciesOf(pkg) {
    const peers = {};
    for (const deps of Object.values(pkg.entryPoints)) {
        for (const dep of deps) {
            peers[dep] = MANIFEST.peerRanges[dep] ?? '*';
        }
    }
    for (const dep of pkg.dependsOn) {
        peers[npmName(dep)] = '0.0.0';
    }
    return Object.fromEntries(Object.entries(peers).sort(([a], [b]) => a.localeCompare(b)));
}

function peerDependenciesMetaOf(pkg) {
    const meta = {};
    for (const deps of Object.values(pkg.entryPoints)) {
        for (const dep of deps) {
            if (MANIFEST.optionalPeers.includes(dep)) {
                meta[dep] = { optional: true };
            }
        }
    }
    return Object.keys(meta).length ? meta : undefined;
}

function packageJson(pkg) {
    const value = {
        name: npmName(pkg.name),
        version: '0.0.0',
        description: pkg.description,
        keywords: ['angular', 'ngpel', ...pkg.keywords],
        license: 'MIT',
        author: 'Pixel Brewery (https://github.com/pixel-brewery)',
        repository: {
            type: 'git',
            url: 'https://github.com/pixel-brewery/ngpel',
            directory: `libs/${pkg.name}`,
        },
        engines: { node: '>=22' },
        sideEffects: false,
        publishConfig: { access: 'public', registry: 'https://npm.pkg.github.com' },
        dependencies: { tslib: '2.8.1' },
        peerDependencies: peerDependenciesOf(pkg),
    };
    const meta = peerDependenciesMetaOf(pkg);
    if (meta) {
        value.peerDependenciesMeta = meta;
    }
    value.ngpel = { category: pkg.category, layer: pkg.layer, ...(pkg.featured ? { featured: true } : {}) };
    return json(value);
}

function ngPackageJson(pkg, entry) {
    if (entry === '.') {
        return json({
            $schema: '../../node_modules/ng-packagr/ng-package.schema.json',
            dest: './dist',
            deleteDestPath: true,
            // Components whose styles use the Mosaik theme mixins need sass for their inline `styles`;
            // without this ng-packagr would emit the `@use` rules verbatim into the published CSS.
            ...(pkg.inlineStyleLanguage ? { inlineStyleLanguage: pkg.inlineStyleLanguage } : {}),
            lib: { entryFile: 'src/index.ts' },
            allowedNonPeerDependencies: ['tslib'],
        });
    }
    return json({
        $schema: '../../../node_modules/ng-packagr/ng-package.schema.json',
        lib: { entryFile: `../src/${entry}/index.ts` },
    });
}

function projectJson(pkg) {
    return json({
        name: pkg.name,
        $schema: '../../node_modules/nx/schemas/project-schema.json',
        sourceRoot: `libs/${pkg.name}/src`,
        prefix: 'ngp',
        projectType: 'library',
        tags: ['lib', `layer:${pkg.layer}`],
        implicitDependencies: pkg.dependsOn,
        targets: {
            'build-ng': {
                executor: '@nx/angular:package',
                outputs: ['{projectRoot}/dist'],
                options: {
                    project: `libs/${pkg.name}/ng-package.json`,
                    tsConfig: `libs/${pkg.name}/tsconfig.lib.json`,
                },
            },
            build: {
                executor: 'nx:run-commands',
                dependsOn: ['^build', 'build-ng'],
                outputs: ['{projectRoot}/dist'],
                options: {
                    command: `node tools/postbuild-package.mjs libs/${pkg.name}`,
                    cwd: '{workspaceRoot}',
                },
            },
            typecheck: {
                executor: 'nx:run-commands',
                options: {
                    command: `tsc -p libs/${pkg.name}/tsconfig.spec.json --noEmit`,
                    cwd: '{workspaceRoot}',
                },
            },
            docs: {
                executor: 'nx-plugins:generate-package-docs',
            },
        },
    });
}

function tsconfigJson(pkg) {
    return json({
        extends: '../../tsconfig.base.json',
        compilerOptions: { composite: true, declaration: true, ignoreDeprecations: '6.0' },
        files: [],
        include: [],
        references: [{ path: './tsconfig.lib.json' }, { path: './tsconfig.spec.json' }],
    });
}

function tsconfigLibJson(pkg) {
    // During a package build the dependencies must resolve to their built output, not to workspace
    // sources: ng-packagr compiles each package under its own rootDir and rejects foreign sources.
    const flat = (name) => `pixel-brewery-ngpel-${name}`;
    const paths = {};
    for (const dep of pkg.dependsOn) {
        const depPkg = MANIFEST.packages.find((p) => p.name === dep);
        for (const entry of Object.keys(depPkg.entryPoints)) {
            const key = entry === '.' ? npmName(dep) : `${npmName(dep)}/${entry}`;
            const file = entry === '.' ? flat(dep) : `${flat(dep)}-${entry}`;
            paths[key] = [`libs/${dep}/dist/types/${file}.d.ts`];
        }
    }
    return json({
        extends: '../../tsconfig.base.json',
        compilerOptions: {
            ...(Object.keys(paths).length ? { paths } : {}),
            outDir: './dist',
            declaration: true,
            declarationMap: false,
            inlineSources: true,
            types: [],
            lib: ['ES2022', 'DOM', 'DOM.Iterable'],
        },
        angularCompilerOptions: {
            compilationMode: 'partial',
            enableI18nLegacyMessageIdFormat: false,
            strictInjectionParameters: true,
            strictInputAccessModifiers: true,
            strictTemplates: true,
        },
        include: ['src/**/*.ts'],
        exclude: ['**/*.spec.ts', '**/*.test.ts', 'src/test-setup.ts', 'dist'],
    });
}

function tsconfigSpecJson(pkg) {
    return json({
        extends: '../../tsconfig.base.json',
        compilerOptions: {
            outDir: '../../dist/out-tsc/libs/' + pkg.name,
            types: ['vitest/globals', 'vitest/importMeta', 'vite/client', 'node'],
            lib: ['ES2022', 'DOM', 'DOM.Iterable'],
        },
        angularCompilerOptions: {
            strictInjectionParameters: true,
            strictInputAccessModifiers: true,
            strictTemplates: true,
        },
        include: ['src/**/*.ts'],
        exclude: ['dist'],
    });
}

function vitestConfig(pkg) {
    // Explicit aliases: the workspace symlinks libs/* into node_modules, and those directories carry
    // no main/module/exports (ng-packagr writes those into dist), so specifier resolution must be
    // pinned to the sources. Longest specifier first.
    const aliasTargets = [];
    for (const name of [pkg.name, ...pkg.dependsOn]) {
        const target = MANIFEST.packages.find((p) => p.name === name);
        const prefix = name === pkg.name ? '.' : `../${name}`;
        for (const entry of Object.keys(target.entryPoints)) {
            const legacy = existsSync(join(ROOT, `libs/${name}/${entry}/src/index.ts`));
            aliasTargets.push({
                specifier: entry === '.' ? npmName(name) : `${npmName(name)}/${entry}`,
                file: entry === '.' ? `${prefix}/src/index.ts` : legacy ? `${prefix}/${entry}/src/index.ts` : `${prefix}/src/${entry}/index.ts`,
            });
        }
    }
    aliasTargets.sort((a, b) => b.specifier.length - a.specifier.length);
    const alias = aliasTargets
        .map((item) => `            { find: '${item.specifier}', replacement: path.resolve(import.meta.dirname, '${item.file}') },`)
        .join('\n');
    return `import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig(() => ({
    root: import.meta.dirname,
    cacheDir: '../../node_modules/.vite/libs/${pkg.name}',
    resolve: {
        alias: [
${alias}
        ],
    },
    test: {
        name: '${pkg.name}',
        watch: false,
        globals: true,
        environment: 'jsdom',
        setupFiles: [path.resolve(import.meta.dirname, 'src/test-setup.ts')],
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
        passWithNoTests: true,
        reporters: ['default'],
        coverage: {
            reportsDirectory: '../../coverage/libs/${pkg.name}',
            provider: 'v8',
            include: ['src/**/*.ts'],
            exclude: ['**/index.ts', '**/*.spec.ts', 'src/test-setup.ts'],
        },
    },
}));
`;
}

function testSetup(pkg) {
    const usesAngular = Object.values(pkg.entryPoints).some((deps) => deps.includes('@angular/core'));
    if (!usesAngular) {
        return '// Framework-free package: no Angular test environment required.\nexport {};\n';
    }
    return `import '@angular/compiler';

import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
`;
}

function eslintConfig(pkg) {
    return `import baseConfig from '../../eslint.config.mjs';

export default [
    ...baseConfig,
    {
        files: ['**/*.json'],
        rules: {
            '@nx/dependency-checks': [
                'error',
                {
                    buildTargets: ['build'],
                    checkMissingDependencies: true,
                    checkObsoleteDependencies: false,
                    checkVersionMismatches: false,
                    ignoredFiles: [
                        '{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}',
                        '{projectRoot}/vitest.config.{js,cjs,mjs,ts,cts,mts}',
                        '{projectRoot}/**/*.spec.ts',
                        '{projectRoot}/src/test-setup.ts',
                    ],
                    ignoredDependencies: ['@nx/vite', 'vite', 'vitest', 'tslib', '@angular/compiler', '@angular/platform-browser', '@angular/core/testing', '@angular/platform-browser/testing', '@pixel-brewery/mosaik-themes'],
                },
            ],
        },
        languageOptions: {
            parser: await import('jsonc-eslint-parser'),
        },
    },
];
`;
}

function readme(pkg) {
    const entries = Object.keys(pkg.entryPoints).filter((e) => e !== '.');
    const imports = [`import { /* ... */ } from '${npmName(pkg.name)}';`, ...entries.map((e) => `import { /* ... */ } from '${npmName(pkg.name)}/${e}';`)].join(
        '\n',
    );
    const peers = Object.entries(peerDependenciesOf(pkg))
        .map(([k, v]) => `| \`${k}\` | \`${v}\` |`)
        .join('\n');
    return `# ${npmName(pkg.name)}

${pkg.description}

## Features

- _(fill in: one bullet per capability)_

## Import Options

\`\`\`typescript
${imports}
\`\`\`

## Peer Dependencies

| Package | Range |
| --- | --- |
${peers}

## Quick Start

\`\`\`typescript
// TODO: minimal composition-root example
\`\`\`

## Layer

Layer ${pkg.layer} — depends on: ${pkg.dependsOn.length ? pkg.dependsOn.map((d) => `\`${npmName(d)}\``).join(', ') : 'nothing (zero ngpel dependencies)'}.
`;
}

function docsIndex(pkg) {
    return `---
title: '${npmName(pkg.name)}'
description: ${JSON.stringify(pkg.description)}
package: '${npmName(pkg.name)}'
category: '${pkg.category}'
order: ${pkg.layer * 10}
---

# ${npmName(pkg.name)}

${pkg.description}

## Entry points

${Object.entries(pkg.entryPoints)
    .map(
        ([entry, peers]) =>
            `- \`${npmName(pkg.name)}${entry === '.' ? '' : '/' + entry}\` — peers: ${peers.length ? peers.map((p) => `\`${p}\``).join(', ') : 'none'}`,
    )
    .join('\n')}
`;
}

// ---- per-package scaffolding -------------------------------------------------------------------
for (const pkg of packages) {
    const base = `libs/${pkg.name}`;
    write(`${base}/package.json`, packageJson(pkg), { overwrite: force });
    write(`${base}/ng-package.json`, ngPackageJson(pkg, '.'), { overwrite: force });
    write(`${base}/project.json`, projectJson(pkg), { overwrite: force });
    write(`${base}/tsconfig.json`, tsconfigJson(pkg), { overwrite: force });
    write(`${base}/tsconfig.lib.json`, tsconfigLibJson(pkg), { overwrite: force });
    write(`${base}/tsconfig.spec.json`, tsconfigSpecJson(pkg), { overwrite: force });
    write(`${base}/vitest.config.mts`, vitestConfig(pkg), { overwrite: force });
    write(`${base}/eslint.config.mjs`, eslintConfig(pkg), { overwrite: force });
    write(`${base}/README.md`, readme(pkg));
    write(`${base}/CHANGELOG.md`, `# ${npmName(pkg.name)}\n\n_Generated by nx release._\n`);
    write(`${base}/src/index.ts`, 'export {};\n');
    write(`${base}/src/test-setup.ts`, testSetup(pkg), { overwrite: force });
    for (const entry of Object.keys(pkg.entryPoints)) {
        if (entry === '.') continue;
        write(`${base}/${entry}/ng-package.json`, ngPackageJson(pkg, entry), { overwrite: force });
        write(`${base}/src/${entry}/index.ts`, 'export {};\n');
    }
    // A secondary entry point dropped from the manifest leaves its marker directory behind, and
    // ng-packagr would keep building it against a barrel that no longer exists.
    for (const marker of readdirSync(join(ROOT, base), { withFileTypes: true })) {
        if (!marker.isDirectory() || marker.name === 'src' || marker.name === 'dist') continue;
        if (Object.keys(pkg.entryPoints).includes(marker.name)) continue;
        if (!existsSync(join(ROOT, base, marker.name, 'ng-package.json'))) continue;
        rmSync(join(ROOT, base, marker.name), { recursive: true, force: true });
        console.log(`removed ${base}/${marker.name} (no longer an entry point)`);
    }
    write(`.docs/packages/${pkg.name}/index.md`, docsIndex(pkg));
}

// ---- workspace-level synchronisation (always) ---------------------------------------------------
const tsconfigBasePath = join(ROOT, 'tsconfig.base.json');
const tsconfigBase = JSON.parse(readFileSync(tsconfigBasePath, 'utf8'));
const paths = {};
for (const pkg of MANIFEST.packages) {
    for (const entry of Object.keys(pkg.entryPoints)) {
        const key = entry === '.' ? npmName(pkg.name) : `${npmName(pkg.name)}/${entry}`;
        const legacy = `libs/${pkg.name}/${entry}/src/index.ts`;
        const target = entry === '.' ? `libs/${pkg.name}/src/index.ts` : existsSync(join(ROOT, legacy)) ? legacy : `libs/${pkg.name}/src/${entry}/index.ts`;
        paths[key] = [target];
    }
}
tsconfigBase.compilerOptions.paths = Object.fromEntries(Object.entries(paths).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(tsconfigBasePath, json(tsconfigBase));
console.log(`synced tsconfig.base.json (${Object.keys(paths).length} paths)`);

const tsconfigPath = join(ROOT, 'tsconfig.json');
const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8'));
tsconfig.references = MANIFEST.packages.filter((p) => existsSync(join(ROOT, `libs/${p.name}/tsconfig.json`))).map((p) => ({ path: `./libs/${p.name}` }));
writeFileSync(tsconfigPath, json(tsconfig));
console.log(`synced tsconfig.json (${tsconfig.references.length} references)`);

for (const projectPath of ['apps/fixtures/ng22/project.json']) {
    const abs = join(ROOT, projectPath);
    if (!existsSync(abs)) continue;
    const project = JSON.parse(readFileSync(abs, 'utf8'));
    project.implicitDependencies = MANIFEST.packages.map((p) => p.name);
    writeFileSync(abs, json(project));
    console.log(`synced ${projectPath} implicitDependencies`);
}

const docsProjectPath = join(ROOT, 'apps/frontend/docs/project.json');
if (existsSync(docsProjectPath)) {
    const docsProject = JSON.parse(readFileSync(docsProjectPath, 'utf8'));
    docsProject.implicitDependencies = MANIFEST.packages.map((p) => p.name);
    writeFileSync(docsProjectPath, json(docsProject));
    console.log(`synced ${relative(ROOT, docsProjectPath)} implicitDependencies`);
}
