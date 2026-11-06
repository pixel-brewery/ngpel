#!/usr/bin/env node
/**
 * Renders `libs/<name>/README.md` and `.docs/packages/<name>/index.md` from the prose in
 * `tools/docs-content.mjs` and the mechanical facts in `tools/packages.json`, `libs/<name>/package.json`
 * and the entry-point barrels — so entry points, export counts, peer ranges and the layer note can
 * never drift away from the package map.
 *
 * Usage:
 *   node tools/render-package-docs.mjs            # all packages
 *   node tools/render-package-docs.mjs core ui    # selected packages
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { CONTENT } from './docs-content.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = JSON.parse(readFileSync(join(ROOT, 'tools/packages.json'), 'utf8'));
const selected = process.argv.slice(2);
const packages = MANIFEST.packages.filter((p) => selected.length === 0 || selected.includes(p.name));

const npmName = (name) => `${MANIFEST.scope}/${MANIFEST.prefix}${name}`;
const specifier = (name, entry) => (entry === '.' ? npmName(name) : `${npmName(name)}/${entry}`);

/**
 * Reads the exported symbols of one entry-point barrel.
 * @param {string} name - Package directory name under `libs/`.
 * @param {string} entry - Entry point, `.` for the primary one.
 * @returns {Array<string>} The exported symbols, sorted case-insensitively.
 */
function exportsOf(name, entry) {
    const barrel = entry === '.' ? 'src/index.ts' : `src/${entry}/index.ts`;
    const source = readFileSync(join(ROOT, 'libs', name, barrel), 'utf8');
    const symbols = new Set();
    for (const match of source.matchAll(/^export (?:type )?\{([^}]*)\}/gm)) {
        for (const symbol of match[1].split(',')) {
            const trimmed = symbol.trim();
            if (trimmed) {
                symbols.add(trimmed);
            }
        }
    }

    return [...symbols].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
}

/**
 * Renders one import statement per entry point, listing the first symbols of each.
 * @param {object} pkg - The package entry of the manifest.
 * @returns {string} The import block.
 */
function importOptions(pkg) {
    return Object.keys(pkg.entryPoints)
        .map((entry) => {
            const symbols = exportsOf(pkg.name, entry);
            const shown = symbols.length > 6 ? `${symbols.slice(0, 6).join(', ')} /* … */` : symbols.join(', ');

            return `// ${specifier(pkg.name, entry)} — ${symbols.length} export${symbols.length === 1 ? '' : 's'}\nimport { ${shown} } from '${specifier(pkg.name, entry)}';`;
        })
        .join('\n\n');
}

/**
 * Renders the peer dependency table of a package from its generated manifest.
 * @param {object} pkg - The package entry of the manifest.
 * @returns {string} The markdown table body.
 */
function peerTable(pkg) {
    const manifest = JSON.parse(readFileSync(join(ROOT, 'libs', pkg.name, 'package.json'), 'utf8'));
    const optional = manifest.peerDependenciesMeta ?? {};

    return Object.entries(manifest.peerDependencies ?? {})
        .map(([name, range]) => `| \`${name}\` | \`${range}\`${optional[name]?.optional ? ' _(optional)_' : ''} |`)
        .join('\n');
}

/**
 * Renders the entry-point table of a package.
 * @param {object} pkg - The package entry of the manifest.
 * @returns {string} The markdown table body.
 */
function entryPointTable(pkg) {
    return Object.entries(pkg.entryPoints)
        .map(
            ([entry, peers]) =>
                `| \`${specifier(pkg.name, entry)}\` | ${exportsOf(pkg.name, entry).length} | ${peers.map((peer) => `\`${peer}\``).join(', ')} |`,
        )
        .join('\n');
}

/**
 * Describes a package's position in the layering.
 * @param {object} pkg - The package entry of the manifest.
 * @returns {string} One sentence.
 */
function layerNote(pkg) {
    const dependencies = pkg.dependsOn.length ? pkg.dependsOn.map((d) => `\`${npmName(d)}\``).join(', ') : 'nothing from ngpel';

    return `Layer ${pkg.layer} — depends on ${dependencies}. A package imports only packages of a strictly lower layer.`;
}

for (const pkg of packages) {
    const content = CONTENT[pkg.name];
    if (content === undefined) {
        throw new Error(`tools/docs-content.mjs has no entry for "${pkg.name}"`);
    }

    const readme = `# ${npmName(pkg.name)}

${content.tagline}

## Features

${content.features.map((feature) => `- ${feature}`).join('\n')}

## Import Options

\`\`\`typescript
${importOptions(pkg)}
\`\`\`

## Peer Dependencies

| Package | Range |
| --- | --- |
${peerTable(pkg)}

## Quick Start

\`\`\`typescript
${content.quickStart}
\`\`\`

## Layer

${layerNote(pkg)}

## What stays in the application

${content.productSide}
`;

    const docs = `---
title: '${npmName(pkg.name)}'
description: ${JSON.stringify(pkg.description)}
package: '${npmName(pkg.name)}'
category: '${pkg.category}'
order: ${pkg.layer * 10}
---

# ${npmName(pkg.name)}

${content.tagline}

## Entry points

| Entry point | Public symbols | Peer dependencies |
| --- | --- | --- |
${entryPointTable(pkg)}

Every entry point is tree-shakable on its own: importing one never pulls the code of another.

## Quick start

\`\`\`typescript
${content.quickStart}
\`\`\`

## What stays in the application

${content.productSide}

## API reference

The generated reference lives under [api/](./api/) and is rebuilt with \`yarn nx run ${pkg.name}:docs\`.
`;

    writeFileSync(join(ROOT, 'libs', pkg.name, 'README.md'), readme);
    writeFileSync(join(ROOT, '.docs/packages', pkg.name, 'index.md'), docs);
    console.log(`rendered libs/${pkg.name}/README.md and .docs/packages/${pkg.name}/index.md`);
}
