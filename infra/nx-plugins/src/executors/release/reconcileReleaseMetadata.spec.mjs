// #region Imports
import { expect, test } from 'vitest';
import { reconcileReleaseMetadata } from './reconcileReleaseMetadata.mjs';
// #endregion

function fixture() {
    const source = 'a'.repeat(40),
        candidate = 'b'.repeat(40),
        tree = 'c'.repeat(40);
    const identity = { id: 1447827206, full_name: 'pixel-brewery/ngpel' };
    const branch = `release/ngpel/${source}`;
    const record = { source, candidate, version: '0.0.31', runId: 301 };
    const pull = {
        number: 7,
        state: 'open',
        draft: false,
        merged: false,
        body: JSON.stringify(record),
        user: { id: 41898282, login: 'github-actions[bot]', type: 'Bot' },
        base: { ref: 'main', sha: source, repo: identity },
        head: { ref: branch, sha: candidate, repo: identity },
    };
    const ci = {
        id: 202,
        run_attempt: 1,
        workflow_id: 8,
        name: 'CI',
        path: '.github/workflows/ci.yml',
        repository: identity,
        head_repository: identity,
        head_branch: branch,
        head_sha: candidate,
        event: 'pull_request',
        actor: { id: 41898282, login: 'github-actions[bot]', type: 'Bot' },
        triggering_actor: { id: 41898282, login: 'github-actions[bot]', type: 'Bot' },
        pull_requests: [{ number: 7, head: structuredClone(pull.head), base: structuredClone(pull.base) }],
        status: 'completed',
        conclusion: 'success',
    };
    const release = {
        id: 301,
        run_attempt: 1,
        workflow_id: 9,
        name: 'Release ngpel packages',
        path: '.github/workflows/release.yml',
        repository: identity,
        head_repository: identity,
        head_branch: 'main',
        head_sha: source,
        event: 'push',
        status: 'completed',
        conclusion: 'failure',
    };
    const metadataJob = {
        id: 11,
        run_id: 301,
        run_attempt: 1,
        name: 'Integrate protected release metadata',
        status: 'completed',
        conclusion: 'failure',
        steps: [{ name: 'Metadata verification remains pending', conclusion: 'failure' }],
    };
    const artifact = {
        id: 12,
        name: 'ngpel-release-301',
        expired: false,
        digest: `sha256:${'f'.repeat(64)}`,
        workflow_run: { id: 301, head_sha: source, head_branch: 'main', repository_id: 1447827206, head_repository_id: 1447827206 },
    };
    const data = {
        main: source,
        associations: [pull],
        ciJobConclusion: 'success',
        rules: [
            { type: 'pull_request' },
            {
                type: 'required_status_checks',
                parameters: {
                    strict_required_status_checks_policy: false,
                    required_status_checks: [{ context: 'Lint, Typecheck, Test & Build', integration_id: 15368 }],
                },
            },
        ],
    };
    const writes = [];
    const request = async (method, endpoint) => {
        if (method !== 'GET') {
            writes.push(endpoint);
            return undefined;
        }
        if (endpoint === 'repositories/1447827206')
            return { ...identity, name: 'ngpel', default_branch: 'main', visibility: 'public', private: false, fork: false };
        if (endpoint.includes('/pulls?state=open')) return data.associations.filter((pull) => pull.state === 'open');
        if (endpoint.includes('/actions/workflows/8/runs?')) return data.inventory ?? { total_count: 1, workflow_runs: [ci] };
        if (endpoint.endsWith(`/git/commits/${'d'.repeat(40)}`)) return { sha: 'd'.repeat(40), parents: [{ sha: source }], tree: { sha: tree } };
        if (endpoint.endsWith('/actions/workflows/ci.yml')) return { id: 8, path: '.github/workflows/ci.yml', name: 'CI', state: 'active' };
        if (endpoint.endsWith('/actions/workflows/release.yml'))
            return { id: 9, path: '.github/workflows/release.yml', name: 'Release ngpel packages', state: 'active' };
        if (endpoint.endsWith('/actions/runs/202')) return data.currentCi ?? ci;
        if (endpoint.endsWith('/actions/runs/203')) return data.inventory?.workflow_runs.find((run) => run.id === 203);
        if (endpoint.includes('/actions/workflows/ci.yml/runs?')) return data.inventory ?? { total_count: 1, workflow_runs: [ci] };
        if (endpoint.endsWith('/actions/runs/301')) return release;
        if (endpoint.endsWith('/pulls?per_page=100')) return data.associations;
        if (endpoint.endsWith('/pulls/7')) return pull;
        if (endpoint.endsWith(`/git/commits/${candidate}`)) return { sha: candidate, parents: [{ sha: source }], tree: { sha: tree } };
        if (endpoint.includes('/compare/'))
            return {
                behind_by: 0,
                ahead_by: 1,
                total_commits: 1,
                merge_base_commit: { sha: source },
                files: [{ filename: 'libs/core/package.json', status: 'modified' }],
            };
        if (endpoint.includes('/actions/runs/202/attempts/1/jobs'))
            return {
                total_count: 1,
                jobs: [{ id: 10, run_id: 202, run_attempt: 1, name: 'Lint, Typecheck, Test & Build', status: 'completed', conclusion: data.ciJobConclusion }],
            };
        if (endpoint.includes('/actions/runs/301/attempts/1/jobs')) return { total_count: 1, jobs: [metadataJob] };
        if (endpoint.includes('/actions/runs/301/artifacts?')) return { total_count: 1, artifacts: [artifact] };
        if (endpoint.endsWith('/rules/branches/main')) return data.rules;
        if (endpoint.endsWith('/branches/main')) return { name: 'main', commit: { sha: data.main } };
        throw new Error('Unexpected endpoint.');
    };
    const context = { eventName: 'workflow_run', runId: 202, runAttempt: 1, repository: identity.full_name, repositoryId: identity.id, defaultBranch: 'main' };
    return { source, context, request, writes, data, ci, release, pull, metadataJob, artifact };
}

const scheduled = (context) => ({ ...context, eventName: 'schedule' });

test('recovers green metadata CI after the original pending run completes without a second CI event', async () => {
    // Arrange
    const f = fixture();
    // Act
    const results = await reconcileReleaseMetadata(scheduled(f.context), f.request);
    // Assert
    expect(results).toEqual([{ number: 7, status: 'resumed', runId: 301, sourceSha: f.source }]);
    expect(f.writes).toEqual(['repos/pixel-brewery/ngpel/actions/runs/301/rerun-failed-jobs']);
});

test('recovers a human-merged retained candidate associated with the actual current main commit', async () => {
    // Arrange
    const f = fixture();
    f.data.main = 'd'.repeat(40);
    Object.assign(f.pull, { state: 'closed', merged: true, merge_commit_sha: f.data.main });
    // Act
    const results = await reconcileReleaseMetadata(scheduled(f.context), f.request);
    // Assert
    expect(results[0].status).toBe('resumed');
    expect(f.writes).toEqual(['repos/pixel-brewery/ngpel/actions/runs/301/rerun-failed-jobs']);
});

test('does not recover an older green run when the latest actual CI failed', async () => {
    // Arrange
    const f = fixture();
    f.data.inventory = { total_count: 2, workflow_runs: [f.ci, { ...f.ci, id: 203, status: 'completed', conclusion: 'failure' }] };
    // Act
    const results = await reconcileReleaseMetadata(scheduled(f.context), f.request);
    // Assert
    expect(results).toEqual([{ number: 7, status: 'verification-pending' }]);
    expect(f.writes).toEqual([]);
});

test('retains an already running original release', async () => {
    // Arrange
    const f = fixture();
    f.release.status = 'in_progress';
    // Act
    const results = await reconcileReleaseMetadata(scheduled(f.context), f.request);
    // Assert
    expect(results).toEqual([{ number: 7, status: 'retained' }]);
    expect(f.writes).toEqual([]);
});

test('fails a malformed candidate inventory without writing workflow state', async () => {
    // Arrange
    const f = fixture();
    f.data.inventory = { total_count: 2, workflow_runs: [] };
    // Act
    const results = await reconcileReleaseMetadata(scheduled(f.context), f.request);
    // Assert
    expect(results).toMatchObject([{ number: 7, status: 'blocked' }]);
    expect(f.writes).toEqual([]);
});

test('recovers the current native attempt despite a newer successful diagnostic run', async () => {
    // Arrange
    const f = fixture();
    f.data.inventory = { total_count: 2, workflow_runs: [f.ci, { ...f.ci, id: 203, event: 'workflow_dispatch', pull_requests: [] }] };
    // Act
    const result = await reconcileReleaseMetadata(scheduled(f.context), f.request);
    // Assert
    expect(result[0].status).toBe('resumed');
    expect(f.writes).toEqual(['repos/pixel-brewery/ngpel/actions/runs/301/rerun-failed-jobs']);
});
