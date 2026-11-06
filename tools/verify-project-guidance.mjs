import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { workspacePackages } from './workspace-packages.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const guide = readFileSync(join(root, 'AGENTS.md'), 'utf8');
const rows = guide.split('\n').map((line) => line.split('|').map((cell) => cell.trim()));
const packages = workspacePackages(root);

for (const { name, slug, layer, directory, manifest } of packages) {
    const project = JSON.parse(readFileSync(join(directory, 'project.json'), 'utf8'));
    const readme = readFileSync(join(directory, 'README.md'), 'utf8');
    readFileSync(join(root, '.docs/packages', slug, 'index.md'));
    if (
        manifest.name !== name ||
        !project.tags.includes(`layer:${layer}`) ||
        !rows.some(([, level, label]) => level === String(layer) && label === `\`${slug}\``) ||
        !readme.includes('## Import Options')
    ) {
        throw new Error(`Package map, project tags and contributor guidance disagree for ${name}.`);
    }
}
console.log(`Verified contributor guidance for ${packages.length} libraries.`);
