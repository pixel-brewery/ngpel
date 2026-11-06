import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Reads the published library inventory from the package map. */
export function workspacePackages(root = fileURLToPath(new URL('..', import.meta.url))) {
    const map = JSON.parse(readFileSync(join(root, 'tools/packages.json'), 'utf8'));
    return map.packages.map(({ name: slug, layer, entryPoints }) => {
        const directory = join(root, 'libs', slug);
        return {
            slug,
            layer,
            directory,
            name: `${map.scope}/${map.prefix}${slug}`,
            entryPoints: Object.keys(entryPoints).map((entry) => (entry === '.' ? entry : `./${entry}`)),
            manifest: JSON.parse(readFileSync(join(directory, 'package.json'), 'utf8')),
        };
    });
}
