// #region Imports
import { expect, test } from 'vitest';
import { verifyReleaseMetadata } from './verifyReleaseMetadata.mjs';
// #endregion

function fixture() {
    const source = 'a'.repeat(40),
        candidate = 'b'.repeat(40),
        tree = 'c'.repeat(40),
        publication = 'd'.repeat(40);
    const identity = { id: 1447827206, full_name: 'pixel-brewery/ngpel' };
    const record = { source, candidate, version: '0.0.31', runId: 301 };
    const pull = {
        number: 7,
        state: 'open',
        draft: false,
        merged: false,
        body: JSON.stringify(record),
        user: { id: 41898282, login: 'github-actions[bot]', type: 'Bot' },
        base: { ref: 'main', repo: identity },
        head: { ref: `release/ngpel/${source}`, sha: candidate, repo: identity },
    };
    const workflow = { id: 9, path: '.github/workflows/release.yml', name: 'Release ngpel packages', state: 'active' };
    const run = {
        id: 301,
        run_attempt: 1,
        workflow_id: 9,
        name: workflow.name,
        path: workflow.path,
        repository: identity,
        head_repository: identity,
        head_branch: 'main',
        head_sha: source,
        event: 'push',
        status: 'in_progress',
    };
    const commit = { sha: candidate, parents: [{ sha: source }], tree: { sha: tree } };
    const merged = { sha: publication, parents: [{ sha: source }], tree: { sha: tree } };
    const comparison = {
        behind_by: 0,
        ahead_by: 1,
        total_commits: 1,
        merge_base_commit: { sha: source },
        files: [{ filename: 'libs/core/package.json', status: 'modified' }],
    };
    const writes = [];
    const request = async (method, endpoint) => {
        if (method !== 'GET') {
            writes.push(endpoint);
            throw new Error('Unexpected mutation.');
        }
        if (endpoint.endsWith('/actions/workflows/release.yml')) return workflow;
        if (endpoint.endsWith('/actions/runs/301')) return run;
        if (endpoint.endsWith(`/git/commits/${candidate}`)) return commit;
        if (endpoint.endsWith(`/git/commits/${publication}`)) return merged;
        if (endpoint.includes('/compare/')) return comparison;
        throw new Error('Unexpected endpoint.');
    };
    return { source, candidate, publication, record, pull, workflow, run, commit, merged, comparison, request, writes };
}

test('binds an open metadata PR to the original release source and metadata-only candidate', async () => {
    // Arrange
    const f = fixture();
    // Act
    const result = await verifyReleaseMetadata(f.pull, f.request);
    // Assert
    expect(result.record).toEqual(f.record);
    expect(result.publicationSha).toBeUndefined();
    expect(f.writes).toEqual([]);
});

for (const method of ['squash', 'merge'])
    test(`accepts a tree-equivalent actual ${method} publication`, async () => {
        // Arrange
        const f = fixture();
        Object.assign(f.pull, { state: 'closed', merged: true, merge_commit_sha: f.publication });
        if (method === 'merge') f.merged.parents.push({ sha: f.candidate });
        // Act
        const result = await verifyReleaseMetadata(f.pull, f.request);
        // Assert
        expect(result.publicationSha).toBe(f.publication);
    });

for (const failure of [
    'actor',
    'foreign-repository',
    'source-run',
    'workflow',
    'candidate-parent',
    'runtime-change',
    'deleted-metadata',
    'missing-files',
    'closed-unmerged',
    'publication-tree',
    'publication-parent',
]) {
    test(`rejects metadata provenance drift: ${failure}`, async () => {
        // Arrange
        const f = fixture();
        if (failure === 'actor') f.pull.user.id = 1;
        if (failure === 'foreign-repository') f.pull.head.repo = { id: 1, full_name: 'other/ngpel' };
        if (failure === 'source-run') f.run.head_sha = 'e'.repeat(40);
        if (failure === 'workflow') f.run.workflow_id = 1;
        if (failure === 'candidate-parent') f.commit.parents[0].sha = 'e'.repeat(40);
        if (failure === 'runtime-change') f.comparison.files[0].filename = 'libs/core/src/index.ts';
        if (failure === 'deleted-metadata') f.comparison.files[0].status = 'removed';
        if (failure === 'missing-files') f.comparison.files = [];
        if (failure.startsWith('publication') || failure === 'closed-unmerged')
            Object.assign(f.pull, { state: 'closed', merged: true, merge_commit_sha: f.publication });
        if (failure === 'closed-unmerged') f.pull.merged = false;
        if (failure === 'publication-tree') f.merged.tree.sha = 'e'.repeat(40);
        if (failure === 'publication-parent') f.merged.parents[0].sha = 'e'.repeat(40);
        // Act and Assert
        await expect(verifyReleaseMetadata(f.pull, f.request)).rejects.toThrow();
        expect(f.writes).toEqual([]);
    });
}
