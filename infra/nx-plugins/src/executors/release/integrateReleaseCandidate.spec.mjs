// #region Imports
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { expect, test } from 'vitest';
import { integrateReleaseCandidate } from './integrateReleaseCandidate.mjs';
// #endregion

function fixture(state = 'success') {
    const source = 'a'.repeat(40),
        candidate = 'b'.repeat(40),
        tree = 'c'.repeat(40),
        publication = 'd'.repeat(40),
        mergeRef = 'e'.repeat(40);
    const identity = { id: 1447827206, full_name: 'pixel-brewery/ngpel' };
    const record = { source, candidate, version: '0.0.31', runId: 301 };
    const branch = `release/ngpel/${source}`;
    const pull = {
        number: 7,
        state: 'open',
        draft: false,
        merged: false,
        body: JSON.stringify(record),
        mergeable: true,
        merge_commit_sha: mergeRef,
        user: { id: 41898282, login: 'github-actions[bot]', type: 'Bot' },
        base: { ref: 'main', sha: source, repo: identity },
        head: { ref: branch, sha: candidate, repo: identity },
    };
    const ciWorkflow = { id: 8, path: '.github/workflows/ci.yml', name: 'CI', state: 'active' };
    const releaseWorkflow = { id: 9, path: '.github/workflows/release.yml', name: 'Release ngpel packages', state: 'active' };
    const releaseRun = {
        id: 301,
        run_attempt: 1,
        workflow_id: 9,
        name: releaseWorkflow.name,
        path: releaseWorkflow.path,
        repository: identity,
        head_repository: identity,
        head_branch: 'main',
        head_sha: source,
        event: 'push',
        status: 'in_progress',
    };
    const ciRun = {
        id: 202,
        run_attempt: 1,
        workflow_id: 8,
        name: 'CI',
        path: ciWorkflow.path,
        repository: identity,
        head_repository: identity,
        head_branch: branch,
        head_sha: candidate,
        event: 'pull_request',
        actor: { id: 41898282, login: 'github-actions[bot]', type: 'Bot' },
        triggering_actor: { id: 41898282, login: 'github-actions[bot]', type: 'Bot' },
        pull_requests: [{ number: 7, head: structuredClone(pull.head), base: structuredClone(pull.base) }],
        status: state === 'queued' ? 'queued' : 'completed',
        conclusion: state === 'queued' ? null : state,
    };
    const ciJob = {
        head_sha: candidate,
        id: 10,
        run_id: 202,
        run_attempt: 1,
        name: 'Lint, Typecheck, Test & Build',
        status: 'completed',
        conclusion: 'success',
    };
    const data = {
        main: source,
        hasBranch: true,
        hasPull: true,
        runs: state === 'absent' ? [] : [ciRun],
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
    const ciSource = readFileSync('.github/workflows/ci.yml', 'utf8');
    const ciBytes = Buffer.from(ciSource);
    const ciBlob = {
        type: 'file',
        encoding: 'base64',
        content: ciBytes.toString('base64'),
        sha: createHash('sha1').update(`blob ${ciBytes.length}\0`).update(ciBytes).digest('hex'),
    };
    const writes = [];
    const request = async (method, endpoint, body) => {
        if (method !== 'GET') {
            writes.push({ method, endpoint, body });
            if (method === 'POST' && endpoint.endsWith('/pulls')) {
                data.hasPull = true;
                return { number: 7 };
            }
            if (method === 'POST' && endpoint.endsWith('/approve')) return undefined;
            if (method === 'PUT' && endpoint.endsWith('/pulls/7/merge')) {
                Object.assign(pull, { state: 'closed', merged: true, merge_commit_sha: publication });
                data.main = publication;
                return { merged: true, sha: publication };
            }
            throw new Error('Unexpected mutation.');
        }
        if (endpoint === 'repositories/1447827206')
            return { ...identity, name: 'ngpel', default_branch: 'main', visibility: 'public', private: false, fork: false };
        if (endpoint.includes('/git/matching-refs/')) return data.hasBranch ? [{ ref: `refs/heads/${branch}`, object: { sha: candidate } }] : [];
        if (endpoint.includes('/pulls?state=all')) return data.hasPull ? [{ number: 7 }] : [];
        if (endpoint.endsWith('/pulls/7')) return structuredClone(pull);
        if (endpoint.endsWith('/actions/workflows/ci.yml')) return ciWorkflow;
        if (endpoint.endsWith('/actions/workflows/release.yml')) return releaseWorkflow;
        if (endpoint.endsWith('/actions/runs/301')) return releaseRun;
        if (endpoint.endsWith('/actions/runs/202')) return ciRun;
        if (endpoint.endsWith(`/git/ref/heads/${branch}`)) return { object: { type: 'commit', sha: candidate } };
        if (endpoint.endsWith('/git/ref/pull/7/merge')) return { object: { type: 'commit', sha: mergeRef } };
        if (endpoint.endsWith(`/git/commits/${mergeRef}`)) return { sha: mergeRef, parents: [{ sha: source }, { sha: candidate }], tree: { sha: tree } };
        if (endpoint.includes('/contents/.github/workflows/ci.yml?ref=')) return ciBlob;
        if (endpoint.endsWith(`/git/commits/${candidate}`)) return { sha: candidate, parents: [{ sha: source }], tree: { sha: tree } };
        if (endpoint.endsWith(`/git/commits/${publication}`)) return { sha: publication, parents: [{ sha: source }], tree: { sha: tree } };
        if (endpoint.endsWith(`/commits/${candidate}/pulls?per_page=100`)) return [{ ...structuredClone(pull), merged: undefined, merged_at: null }];
        if (endpoint.includes('/compare/'))
            return {
                behind_by: 0,
                ahead_by: 1,
                total_commits: 1,
                merge_base_commit: { sha: source },
                files: [{ filename: 'libs/core/package.json', status: 'modified' }],
            };
        if (endpoint.endsWith('/rules/branches/main')) return data.rules;
        if (endpoint.endsWith('/branches/main')) return { name: 'main', protected: true, commit: { sha: data.main } };
        if (endpoint.includes('/actions/workflows/8/runs?') || endpoint.includes('/actions/workflows/ci.yml/runs?'))
            return { total_count: data.runs.length, workflow_runs: data.runs };
        if (endpoint.includes('/attempts/1/jobs?')) return { total_count: 1, jobs: [ciJob] };
        throw new Error('Unexpected endpoint: ' + endpoint);
    };
    const context = { sourceSha: source, runId: 301, repository: identity.full_name, repositoryId: identity.id, defaultBranch: 'main' };
    const dependencies = {
        request,
        candidate: { commit: candidate, version: record.version },
        polls: 2,
        wait: async () => undefined,
        pushCandidate: async (commit, ref) => {
            writes.push({ method: 'PUSH', commit, ref });
            data.hasBranch = true;
        },
    };
    return { source, candidate, publication, record, context, dependencies, pull, ciRun, ciJob, data, writes };
}

test('merges only the fully verified metadata head and returns the actual equivalent main commit', async () => {
    // Arrange
    const f = fixture();
    // Act
    const result = await integrateReleaseCandidate(f.context, f.dependencies);
    // Assert
    expect(result).toEqual({ status: 'integrated', publicationSha: f.publication, number: 7, version: f.record.version });
    expect(f.writes).toEqual([{ method: 'PUT', endpoint: 'repos/pixel-brewery/ngpel/pulls/7/merge', body: { sha: f.candidate, merge_method: 'squash' } }]);
});

test('resumes a merged exact candidate even after its source branch was automatically deleted', async () => {
    // Arrange
    const f = fixture();
    Object.assign(f.pull, { state: 'closed', merged: true, merge_commit_sha: f.publication });
    f.data.main = f.publication;
    f.data.hasBranch = false;
    // Act
    const result = await integrateReleaseCandidate(f.context, f.dependencies);
    // Assert
    expect(result.publicationSha).toBe(f.publication);
    expect(f.writes).toEqual([]);
});

test('creates one source-bound branch/PR and leaves native CI authorization to its isolated job', async () => {
    // Arrange
    const f = fixture('absent');
    f.data.hasBranch = false;
    f.data.hasPull = false;
    // Act
    const result = await integrateReleaseCandidate(f.context, f.dependencies);
    // Assert
    expect(result.status).toBe('waiting');
    expect(f.writes.map((write) => write.method)).toEqual(['PUSH', 'POST']);
    expect(f.writes[0]).toEqual({ method: 'PUSH', commit: f.candidate, ref: `release/ngpel/${f.source}` });
    expect(f.writes[1].body).toMatchObject({ head: `release/ngpel/${f.source}`, base: 'main', body: JSON.stringify(f.record, null, 2) });
});

test('retains the existing queued verification when the bounded wait expires', async () => {
    // Arrange
    const f = fixture('queued');
    // Act
    const result = await integrateReleaseCandidate(f.context, f.dependencies);
    // Assert
    expect(result).toEqual({ status: 'waiting', number: 7 });
    expect(f.writes).toEqual([]);
});

test('retains failed metadata verification without retrying or merging', async () => {
    // Arrange
    const f = fixture('failure');
    // Act
    const result = await integrateReleaseCandidate(f.context, f.dependencies);
    // Assert
    expect(result).toEqual({ status: 'blocked', reason: 'verification-failed', number: 7 });
    expect(f.writes).toEqual([]);
});

test('refuses to merge without effective protection even after green CI', async () => {
    // Arrange
    const f = fixture();
    f.data.rules = [];
    // Act
    const result = await integrateReleaseCandidate(f.context, f.dependencies);
    // Assert
    expect(result.reason).toBe('missing-merge-protection');
    expect(f.writes).toEqual([]);
});

test('stops a candidate whose original main source has been superseded', async () => {
    // Arrange
    const f = fixture();
    f.data.main = 'e'.repeat(40);
    // Act and Assert
    await expect(integrateReleaseCandidate(f.context, f.dependencies)).rejects.toThrow(/superseded/u);
    expect(f.writes).toEqual([]);
});

test('rejects a replaced metadata record before requesting or merging code', async () => {
    // Arrange
    const f = fixture();
    f.pull.body = JSON.stringify({ ...f.record, runId: 302 });
    // Act and Assert
    await expect(integrateReleaseCandidate(f.context, f.dependencies)).rejects.toThrow();
    expect(f.writes).toEqual([]);
});
