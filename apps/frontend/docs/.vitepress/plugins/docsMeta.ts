/**
 * docsMeta.ts
 *
 * Reads `.docs/_meta.json`, the single source of truth for the top-level documentation
 * sections (index, packages, guides, patterns, architecture, api), their titles and order.
 */

import fs from 'node:fs';
import path from 'node:path';

export interface IDocsSection {
    /** Directory name under `.docs`; `index` denotes the home page. */
    key: string;
    title: string;
    order: number;
}

/**
 * Loads the documentation sections from `<docsRoot>/_meta.json`, sorted by `order`.
 */
export function loadDocsMeta(docsRoot: string): IDocsSection[] {
    const metaPath = path.join(docsRoot, '_meta.json');
    if (!fs.existsSync(metaPath)) {
        throw new Error(`[docsMeta] Missing documentation meta file: ${metaPath}`);
    }

    const raw = JSON.parse(fs.readFileSync(metaPath, 'utf-8')) as Record<string, unknown>;
    const sections: IDocsSection[] = [];

    for (const [key, value] of Object.entries(raw)) {
        if (!value || typeof value !== 'object') {
            throw new Error(`[docsMeta] Section "${key}" in _meta.json must be an object with a title.`);
        }

        const { title, order } = value as { title?: unknown; order?: unknown };
        if (typeof title !== 'string' || title.trim().length === 0) {
            throw new Error(`[docsMeta] Section "${key}" in _meta.json is missing a title.`);
        }

        sections.push({
            key,
            title,
            order: typeof order === 'number' && Number.isFinite(order) ? order : Number.MAX_SAFE_INTEGER,
        });
    }

    return sections.sort((left, right) => left.order - right.order || left.key.localeCompare(right.key));
}
