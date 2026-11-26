// #region Imports
import { expect, test } from 'vitest';
import { classifyReleaseSource } from './classifyReleaseSource.mjs';
// #endregion

function fixture(metadata = false) {
    const source = 'a'.repeat(40),
        candidate = 'b'.repeat(40),
        publication = 'd'.repeat(40),
        tree = 'c'.repeat(40);
    const identity = { id: 1447827206, full_name: 'pixel-brewery/ngpel' };
    const record = { source, candidate, version: '0.0.31', runId: 301 };
    const pull = {
        number: 7,
        state: 'closed',
        merged: true,
        merge_commit_sha: publication,
        draft: false,
        body: JSON.stringify(record),
        user: { id: 41898282, login: 'github-actions[bot]', type: 'Bot' },
        base: { ref: 'main', repo: identity },
        head: { ref: `release/ngpel/${source}`, sha: candidate, repo: identity },
    };
    const data = { associations: metadata ? [pull] : [], main: metadata ? publication : source };
    const context = { eventName: 'push', sourceSha: data.main, repository: identity.full_name, repositoryId: identity.id, defaultBranch: 'main' };
    const writes = [];
    const request = async (method, endpoint) => {
        if (method !== 'GET') {
            writes.push(endpoint);
            throw new Error('Unexpected mutation.');
        }
        if (endpoint === 'repositories/1447827206')
            return { ...identity, name: 'ngpel', default_branch: 'main', visibility: 'public', private: false, fork: false };
        if (endpoint.endsWith('/branches/main')) return { name: 'main', commit: { sha: data.main } };
        if (endpoint.endsWith('/pulls?per_page=100')) return data.associations;
        if (endpoint.endsWith('/pulls/7')) return pull;
        if (endpoint.endsWith('/actions/workflows/release.yml'))
            return { id: 9, name: 'Release ngpel packages', path: '.github/workflows/release.yml', state: 'active' };
        if (endpoint.endsWith('/actions/runs/301'))
            return {
                id: 301,
                run_attempt: 1,
                workflow_id: 9,
                name: 'Release ngpel packages',
                path: '.github/workflows/release.yml',
                repository: identity,
                head_repository: identity,
                head_sha: source,
                head_branch: 'main',
                event: 'push',
            };
        if (endpoint.endsWith(`/git/commits/${candidate}`)) return { sha: candidate, parents: [{ sha: source }], tree: { sha: tree } };
        if (endpoint.endsWith(`/git/commits/${publication}`)) return { sha: publication, parents: [{ sha: source }], tree: { sha: tree } };
        if (endpoint.includes('/compare/'))
            return {
                behind_by: 0,
                ahead_by: 1,
                total_commits: 1,
                merge_base_commit: { sha: source },
                files: [{ filename: 'libs/core/package.json', status: 'modified' }],
            };
        throw new Error('Unexpected endpoint.');
    };
    return { source, publication, context, request, writes, pull, data };
}

test('prepares one new release for an ordinary current main source', async () => {
    // Arrange
    const f = fixture();
    // Act
    const result = await classifyReleaseSource(f.context, f.request);
    // Assert
    expect(result).toEqual({ releaseRequired: true });
    expect(f.writes).toEqual([]);
});

test('does not recursively increment after a verified human metadata merge', async () => {
    // Arrange
    const f = fixture(true);
    // Act
    const result = await classifyReleaseSource(f.context, f.request);
    // Assert
    expect(result).toEqual({ releaseRequired: false, publicationSha: f.publication, originalRunId: 301 });
    expect(f.writes).toEqual([]);
});

for (const failure of ['superseded-source', 'ambiguous-metadata', 'unmerged-metadata', 'forged-record'])
    test(`does not accept an invalid release classification: ${failure}`, async () => {
        // Arrange
        const f = fixture(true);
        if (failure === 'superseded-source') f.data.main = 'e'.repeat(40);
        if (failure === 'ambiguous-metadata') f.data.associations.push({ ...f.pull, number: 8 });
        if (failure === 'unmerged-metadata') f.pull.merged = false;
        if (failure === 'forged-record') f.pull.body = '{}';
        // Act and Assert
        await expect(classifyReleaseSource(f.context, f.request)).rejects.toThrow();
        expect(f.writes).toEqual([]);
    });
