#!/usr/bin/env node
/**
 * Normalises the YAML frontmatter of the package overview pages (.docs/packages, index.md per package): quotes `title`, `package` and
 * `category` values and JSON-encodes `description`, because values starting with `@` or containing
 * `: ` are invalid YAML scalars (gray-matter and VitePress reject them).
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(process.cwd(), '.docs/packages');
let fixed = 0;
for (const dir of readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory())) {
    const file = join(root, dir.name, 'index.md');
    let text;
    try {
        text = readFileSync(file, 'utf8');
    } catch {
        continue;
    }
    const match = text.match(/^---\n([\s\S]*?)\n---\n/);
    if (!match) continue;
    const lines = match[1].split('\n').map((line) => {
        const m = line.match(/^(title|package|category|description):\s*(.*)$/);
        if (!m) return line;
        const value = m[2].trim();
        if (/^(['"]).*\1$/.test(value)) return line;
        return `${m[1]}: ${JSON.stringify(value)}`;
    });
    const next = text.replace(match[0], `---\n${lines.join('\n')}\n---\n`);
    if (next !== text) {
        writeFileSync(file, next);
        fixed++;
    }
}
console.log(`frontmatter normalised in ${fixed} file(s)`);
