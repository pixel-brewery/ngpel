// #region Imports
import { expect, test } from 'vitest';
import { resumeReleaseMetadata } from './resumeReleaseMetadata.mjs';
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

test('reruns only failed jobs of the original retained source run after its pending metadata CI becomes green', async () => {
    // Arrange
    const f = fixture();
    // Act
    const result = await resumeReleaseMetadata(f.context, f.request);
    // Assert
    expect(result).toEqual({ status: 'resumed', runId: 301, sourceSha: f.source });
    expect(f.writes).toEqual(['repos/pixel-brewery/ngpel/actions/runs/301/rerun-failed-jobs']);
});

for (const failure of [
    'already-running',
    'cancelled',
    'publication-failed',
    'artifact-expired',
    'foreign-artifact',
    'failed-ci',
    'missing-protection',
    'superseded-source',
    'ambiguous-pr',
]) {
    test(`retains the original release instead of blindly retrying: ${failure}`, async () => {
        // Arrange
        const f = fixture();
        if (failure === 'already-running') f.release.status = 'in_progress';
        if (failure === 'cancelled') f.release.conclusion = 'cancelled';
        if (failure === 'publication-failed') f.metadataJob.steps[0].conclusion = 'success';
        if (failure === 'artifact-expired') f.artifact.expired = true;
        if (failure === 'foreign-artifact') f.artifact.workflow_run.head_sha = 'e'.repeat(40);
        if (failure === 'failed-ci') f.data.ciJobConclusion = 'failure';
        if (failure === 'missing-protection') f.data.rules = [];
        if (failure === 'superseded-source') f.data.main = 'e'.repeat(40);
        if (failure === 'ambiguous-pr') f.data.associations.push({ ...f.pull, number: 8 });
        // Act
        const result = await resumeReleaseMetadata(f.context, f.request);
        // Assert
        expect(result.status).not.toBe('resumed');
        expect(f.writes).toEqual([]);
    });
}

for (const problem of ['newer-failed-native', 'diagnostic-only', 'malformed-actor', 'stale-attempt']) {
    test(`does not resume retained publication from invalid native CI: ${problem}`, async () => {
        // Arrange
        const f = fixture();
        if (problem === 'newer-failed-native') f.data.inventory = { total_count: 2, workflow_runs: [f.ci, { ...f.ci, id: 203, conclusion: 'failure' }] };
        if (problem === 'diagnostic-only') f.ci.event = 'workflow_dispatch';
        if (problem === 'malformed-actor') f.ci.actor = { id: 0, login: 'forged', type: 'Bot' };
        if (problem === 'stale-attempt') f.data.currentCi = { ...f.ci, run_attempt: 2 };
        // Act
        const result = await resumeReleaseMetadata(f.context, f.request);
        // Assert
        expect(result.status).not.toBe('resumed');
        expect(f.writes).toEqual([]);
    });
}
