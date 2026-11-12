import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { workspacePackages } from '../../tools/workspace-packages.mjs';

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const bundleRef = 'refs/heads/ngpel-release-candidate';
const shaPattern = /^[a-f0-9]{40}$/u;
const versionPattern = /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/u;
const packages = workspacePackages();
const allowedPaths = new Set([
    'CHANGELOG.md',
    'yarn.lock',
    ...packages.flatMap(({ slug }) => [`libs/${slug}/package.json`, `libs/${slug}/CHANGELOG.md`, `libs/${slug}/README.md`]),
]);

function checkChanges(paths) {
    for (const filename of paths.split('\0').filter(Boolean)) {
        if (!allowedPaths.has(filename)) throw new Error(`Unexpected release change: ${filename}`);
    }
}

function archivesFor(version) {
    return packages.map(({ slug }) => `pixel-brewery-ngpel-${slug}-${version}.tgz`).sort();
}

function checksum(filename) {
    return createHash('sha512').update(readFileSync(filename)).digest('hex');
}

function checkManifests(version, readManifest) {
    if (!versionPattern.test(version)) throw new Error('Expected a stable release version.');
    const packageNames = new Set(packages.map(({ manifest }) => manifest.name));
    for (const { slug, manifest } of packages) {
        const candidate = readManifest(slug);
        if (candidate.name !== manifest.name || candidate.version !== version) {
            throw new Error(`Unexpected release package name or version: ${slug}`);
        }
        for (const [peer, range] of Object.entries(candidate.peerDependencies ?? {})) {
            if (packageNames.has(peer) && range !== version) throw new Error(`${slug}: expected ${peer}@${version}.`);
        }
    }
}

function prepare(directory, source) {
    if (!shaPattern.test(source) || git('rev-parse', 'HEAD') !== source) throw new Error('Release preparation must start at the triggering commit.');
    if (git('ls-files', '--others', '--exclude-standard')) throw new Error('Unexpected untracked release output.');
    checkChanges(git('diff', '--no-renames', '--name-only', '-z', source));
    const version = packages[0].manifest.version;
    const manifests = new Map(packages.map(({ slug, manifest }) => [slug, manifest]));
    checkManifests(version, (slug) => manifests.get(slug));

    const archiveNames = archivesFor(version);
    if (readdirSync('tmp/packages').sort().join('\n') !== archiveNames.join('\n')) throw new Error('The Angular fixture did not pack the exact release set.');
    mkdirSync(directory, { recursive: true });
    for (const filename of archiveNames) copyFileSync(join('tmp/packages', filename), join(directory, filename));
    const archives = Object.fromEntries(archiveNames.map((filename) => [filename, checksum(join(directory, filename))]));

    git('add', '--update', '--', ...allowedPaths);
    git(
        '-c',
        'user.name=github-actions[bot]',
        '-c',
        'user.email=41898282+github-actions[bot]@users.noreply.github.com',
        'commit',
        '-m',
        `chore(release): publish ngpel ${version} [skip ci]`,
    );
    const commit = git('rev-parse', 'HEAD');
    git('update-ref', bundleRef, commit);
    git('bundle', 'create', join(directory, 'release.bundle'), `${source}..${bundleRef}`);
    writeFileSync(join(directory, 'release.json'), `${JSON.stringify({ source, commit, version, archives }, null, 2)}\n`);
}

function verify(directory, source) {
    const candidate = JSON.parse(readFileSync(join(directory, 'release.json'), 'utf8'));
    const { commit, version, archives } = candidate;
    if (!shaPattern.test(source) || candidate.source !== source || !shaPattern.test(commit) || !versionPattern.test(version)) {
        throw new Error('The release artifact does not match the triggering commit.');
    }
    const archiveNames = archivesFor(version);
    const artifactNames = [...archiveNames, 'release.bundle', 'release.json'].sort();
    if (readdirSync(directory).sort().join('\n') !== artifactNames.join('\n')) throw new Error('Unexpected release artifact files.');
    if (Object.keys(archives).sort().join('\n') !== archiveNames.join('\n')) throw new Error('Unexpected release archive set.');
    for (const filename of archiveNames) {
        if (checksum(join(directory, filename)) !== archives[filename]) throw new Error(`Release archive was modified: ${filename}`);
    }
    const bundle = join(directory, 'release.bundle');
    git('fetch', '--no-tags', bundle, bundleRef);
    if (git('rev-parse', 'FETCH_HEAD') !== commit || git('show', '-s', '--format=%P', commit) !== source) {
        throw new Error('The verified release commit must have the triggering commit as its sole parent.');
    }
    checkChanges(git('diff', '--no-renames', '--name-only', '-z', source, commit));
    checkManifests(version, (slug) => JSON.parse(git('show', `${commit}:libs/${slug}/package.json`)));
    return { commit, version };
}

const [command, directory, source] = process.argv.slice(2);
if (command === 'prepare' && directory) {
    prepare(directory, source);
} else if (command === 'verify' && directory) {
    process.stdout.write(`${JSON.stringify(verify(directory, source))}\n`);
} else {
    throw new Error('Expected prepare or verify, an artifact directory and the source commit.');
}
