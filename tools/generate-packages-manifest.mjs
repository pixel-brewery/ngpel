#!/usr/bin/env node
/**
 * Generates a `packages-manifest.json` from `.docs/packages/` frontmatter and `libs/` package metadata.
 *
 * This manifest is consumed by external systems (e.g., WordPress) that need
 * a dynamic list of all ngpel packages without manually maintaining
 * a hardcoded array.
 *
 * Every library under `libs/<name>` MUST ship `.docs/packages/<name>/index.md`;
 * the script fails (exit code 1) when one is missing.
 *
 * Usage:
 *   node tools/generate-packages-manifest.mjs
 *
 * Environment:
 *   NGPEL_DOCS_BASE_URL  Base URL of the published docs site (defaults to the GitHub tree of `.docs`).
 *
 * Output:
 *   dist/packages-manifest.json
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DOCS_PACKAGES_DIR = path.join(ROOT_DIR, '.docs', 'packages');
const LIBS_DIR = path.join(ROOT_DIR, 'libs');
const OUTPUT_DIR = path.join(ROOT_DIR, 'dist');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'packages-manifest.json');
const NPM_NAME_PREFIX = '@pixel-brewery/ngpel-';
const DOCS_BASE_URL = (process.env.NGPEL_DOCS_BASE_URL ?? 'https://github.com/pixel-brewery/ngpel/tree/main/.docs').replace(/\/+$/, '');

/**
 * Parses YAML frontmatter from a markdown file.
 * @param {string} content - The file content.
 * @returns {Record<string, unknown>} The parsed frontmatter.
 */
function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};

    const yaml = match[1];
    const data = {};

    for (const line of yaml.split('\n')) {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;

        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();

        // Handle arrays like [tag1, tag2, tag3]
        if (value.startsWith('[') && value.endsWith(']')) {
            value = value
                .slice(1, -1)
                .split(',')
                .map((v) => v.trim());
        }
        // Handle quoted strings
        else if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
            value = value.slice(1, -1);
        }
        // Handle numbers
        else if (!isNaN(Number(value)) && value !== '') {
            value = Number(value);
        }

        data[key] = value;
    }

    return data;
}

/**
 * Reads the `ngpel` metadata namespace of a library's package.json.
 * @param {string} name - Package directory name under `libs/`.
 * @returns {{ category?: string; layer?: number }} The metadata found (empty when the file is missing).
 */
function readLibraryMetadata(name) {
    const packageJsonPath = path.join(LIBS_DIR, name, 'package.json');
    if (!fs.existsSync(packageJsonPath)) return {};

    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const ngpel = pkg && typeof pkg.ngpel === 'object' && pkg.ngpel !== null ? pkg.ngpel : {};

    return {
        category: typeof ngpel.category === 'string' ? ngpel.category : undefined,
        layer: typeof ngpel.layer === 'number' ? ngpel.layer : undefined,
    };
}

/**
 * Determines the emoji icon for a package based on its name/tags.
 * @param {string} name - Package name.
 * @param {string[]} tags - Package tags.
 * @returns {string} An emoji representing the package.
 */
function getPackageIcon(name, tags = []) {
    const iconMap = {
        core: '⚡',
        storage: '🗄️',
        markdown: '📝',
        commands: '🎛️',
        forms: '📋',
        http: '🌐',
        browser: '🪟',
        'quick-create': '➕',
        update: '🔄',
        ui: '🎨',
        routing: '🛣️',
        audio: '🎙️',
        widget: '🧩',
        mvp: '🖼️',
        navigation: '🧭',
        search: '🔍',
        notification: '🔔',
        shell: '🐚',
        auth: '🔐',
    };

    return iconMap[name] || '📦';
}

/**
 * Fails hard when a library under `libs/` has no `.docs/packages/<name>/index.md`.
 */
function assertEveryLibraryIsDocumented() {
    if (!fs.existsSync(LIBS_DIR)) return;

    const missing = fs
        .readdirSync(LIBS_DIR, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
        .map((entry) => entry.name)
        .filter((name) => !fs.existsSync(path.join(DOCS_PACKAGES_DIR, name, 'index.md')))
        .sort();

    if (missing.length === 0) return;

    console.error('Error: every library under libs/ must ship a documentation index. Missing:');
    for (const name of missing) {
        console.error(`  - libs/${name} → .docs/packages/${name}/index.md`);
    }
    process.exit(1);
}

/**
 * Main function to generate the packages manifest.
 */
function main() {
    if (!fs.existsSync(DOCS_PACKAGES_DIR)) {
        console.error(`Error: Documentation directory not found: ${DOCS_PACKAGES_DIR}`);
        process.exit(1);
    }

    assertEveryLibraryIsDocumented();

    const entries = fs.readdirSync(DOCS_PACKAGES_DIR, { withFileTypes: true });
    const packages = [];

    for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        const indexPath = path.join(DOCS_PACKAGES_DIR, entry.name, 'index.md');
        if (!fs.existsSync(indexPath)) continue;

        const content = fs.readFileSync(indexPath, 'utf-8');
        const frontmatter = parseFrontmatter(content);
        const metadata = readLibraryMetadata(entry.name);

        const name = entry.name;
        const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];

        packages.push({
            name,
            title: frontmatter.title || name,
            description: frontmatter.description || '',
            package: frontmatter.package || `${NPM_NAME_PREFIX}${name}`,
            category: metadata.category ?? (typeof frontmatter.category === 'string' ? frontmatter.category : null),
            layer: metadata.layer ?? null,
            order: typeof frontmatter.order === 'number' ? frontmatter.order : 999,
            tags,
            icon: getPackageIcon(name, tags),
            status: 'STABLE',
            docsUrl: `${DOCS_BASE_URL}/packages/${name}/`,
            npmUrl: `https://github.com/orgs/pixel-brewery/packages/npm/package/ngpel-${name}`,
        });
    }

    // Sort by order, then alphabetically by name
    packages.sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order;
        return a.name.localeCompare(b.name);
    });

    const manifest = {
        ...(process.env.NGPEL_DOCS_BASE_URL ? { $schema: `${DOCS_BASE_URL}/schemas/packages-manifest.json` } : {}),
        generatedAt: new Date().toISOString(),
        count: packages.length,
        packages,
    };

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));

    console.log(`✅ Generated packages manifest with ${packages.length} packages`);
    console.log(`   Output: ${OUTPUT_FILE}`);

    // Also output to stdout for CI pipelines
    console.log('\nPackages (sorted by order):');
    for (const pkg of packages) {
        console.log(`  ${pkg.icon} ${pkg.name} (layer: ${pkg.layer ?? '-'}, order: ${pkg.order})`);
    }
}

main();
