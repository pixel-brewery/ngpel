// #region Imports
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { expect, test } from 'vitest';
import { authorizeReleaseCandidate } from './authorizeReleaseCandidate.mjs';
// #endregion

function fixture(state = 'action_required') {
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

test('authorizes only the native PR run bound to the original verified artifact candidate', async () => {
    // Arrange
    const f = fixture();
    // Act
    const result = await authorizeReleaseCandidate(f.context, f.dependencies);
    // Assert
    expect(result.status).toBe('verification-approved');
    expect(f.writes).toEqual([{ method: 'POST', endpoint: 'repos/pixel-brewery/ngpel/actions/runs/202/approve', body: undefined }]);
});

for (const status of ['queued', 'success', 'failure', 'absent']) {
    test(`retains existing native metadata verification without another write: ${status}`, async () => {
        // Arrange
        const f = fixture(status);
        // Act
        const result = await authorizeReleaseCandidate(f.context, f.dependencies);
        // Assert
        expect(result.status).toBe(status === 'failure' ? 'blocked' : status === 'absent' ? 'waiting' : 'verification-active');
        expect(f.writes).toEqual([]);
    });
}

for (const field of ['source', 'candidate', 'version', 'runId']) {
    test(`does not authorize a PR record that differs from the actual original artifact: ${field}`, async () => {
        // Arrange
        const f = fixture();
        const context = { ...f.context };
        const dependencies = { ...f.dependencies, candidate: { ...f.dependencies.candidate } };
        if (field === 'source') context.sourceSha = 'f'.repeat(40);
        if (field === 'candidate') dependencies.candidate.commit = 'f'.repeat(40);
        if (field === 'version') dependencies.candidate.version = '0.0.32';
        if (field === 'runId') context.runId = 302;
        // Act
        const result = await authorizeReleaseCandidate(context, dependencies).catch(() => ({ status: 'blocked' }));
        // Assert
        expect(result.status).not.toBe('verification-approved');
        expect(f.writes).toEqual([]);
    });
}

test('recognizes an already integrated equivalent candidate without recreating its deleted branch', async () => {
    // Arrange
    const f = fixture();
    Object.assign(f.pull, { state: 'closed', merged: true, merge_commit_sha: f.publication });
    f.data.main = f.publication;
    f.data.hasBranch = false;
    // Act
    const result = await authorizeReleaseCandidate(f.context, f.dependencies);
    // Assert
    expect(result).toEqual({ status: 'integrated', number: 7, publicationSha: f.publication });
    expect(f.writes).toEqual([]);
});

test('ignores a newer successful diagnostic dispatch and authorizes the actual native action-required run', async () => {
    // Arrange
    const f = fixture();
    f.data.runs.push({ ...f.ciRun, id: 203, event: 'workflow_dispatch', conclusion: 'success', pull_requests: [] });
    // Act
    const result = await authorizeReleaseCandidate(f.context, f.dependencies);
    // Assert
    expect(result.status).toBe('verification-approved');
    expect(f.writes.map((write) => write.endpoint)).toEqual(['repos/pixel-brewery/ngpel/actions/runs/202/approve']);
});

function missingCandidate(candidate, endpoint = `repos/pixel-brewery/ngpel/commits/${candidate}/pulls?per_page=100`) {
    return Object.assign(new Error('Controlled candidate response.'), { code: 'NGPEL_RELEASE_CANDIDATE_NOT_CREATED', candidate, endpoint });
}

test('waits within the existing deadline when the verified candidate has not yet been uploaded, then applies the full native proof', async () => {
    // Arrange
    const f = fixture();
    const request = f.dependencies.request;
    let associations = 0;
    let waits = 0;
    f.dependencies.wait = async (milliseconds) => {
        expect(milliseconds).toBe(30_000);
        waits++;
    };
    f.dependencies.request = async (method, endpoint, body) => {
        if (method === 'GET' && endpoint.endsWith(`/commits/${f.candidate}/pulls?per_page=100`) && associations++ === 0) throw missingCandidate(f.candidate);
        return request(method, endpoint, body);
    };
    // Act
    const result = await authorizeReleaseCandidate(f.context, f.dependencies);
    // Assert
    expect(result.status).toBe('verification-approved');
    expect(waits).toBe(1);
    expect(f.writes).toEqual([{ method: 'POST', endpoint: 'repos/pixel-brewery/ngpel/actions/runs/202/approve', body: undefined }]);
});

test('retains a missing original candidate after the same bounded deadline without creating or approving anything', async () => {
    // Arrange
    const f = fixture();
    const request = f.dependencies.request;
    let associations = 0;
    let waits = 0;
    f.dependencies.wait = async () => {
        waits++;
    };
    f.dependencies.request = async (method, endpoint, body) => {
        if (method === 'GET' && endpoint.endsWith(`/commits/${f.candidate}/pulls?per_page=100`)) {
            associations++;
            throw missingCandidate(f.candidate);
        }
        return request(method, endpoint, body);
    };
    // Act
    const result = await authorizeReleaseCandidate(f.context, f.dependencies);
    // Assert
    expect(result).toEqual({ status: 'waiting', reason: 'metadata-native-ci-not-observed' });
    expect(associations).toBe(2);
    expect(waits).toBe(1);
    expect(f.writes).toEqual([]);
});

for (const change of ['permission', 'malformed', 'other-endpoint', 'other-candidate']) {
    test(`does not wait for an unrelated visibility failure: ${change}`, async () => {
        // Arrange
        const f = fixture();
        const request = f.dependencies.request;
        let waits = 0;
        f.dependencies.wait = async () => {
            waits++;
        };
        f.dependencies.request = async (method, endpoint, body) => {
            if (method === 'GET' && endpoint.endsWith(`/commits/${f.candidate}/pulls?per_page=100`)) {
                if (change === 'permission' || change === 'malformed') throw new Error('Provider request failed.');
                if (change === 'other-endpoint') throw missingCandidate(f.candidate, 'repos/example/other/commits/' + f.candidate + '/pulls?per_page=100');
                throw missingCandidate('f'.repeat(40), endpoint);
            }
            return request(method, endpoint, body);
        };
        // Act
        const result = authorizeReleaseCandidate(f.context, f.dependencies);
        // Assert
        await expect(result).rejects.toThrow();
        expect(waits).toBe(0);
        expect(f.writes).toEqual([]);
    });
}

test('stops missing-candidate waiting as soon as the original main source changes', async () => {
    // Arrange
    const f = fixture();
    const request = f.dependencies.request;
    let waits = 0;
    f.dependencies.wait = async () => {
        waits++;
    };
    f.data.main = 'f'.repeat(40);
    f.dependencies.request = async (method, endpoint, body) => {
        if (method === 'GET' && endpoint.endsWith(`/commits/${f.candidate}/pulls?per_page=100`)) throw missingCandidate(f.candidate);
        return request(method, endpoint, body);
    };
    // Act
    const result = await authorizeReleaseCandidate(f.context, f.dependencies);
    // Assert
    expect(result).toEqual({ status: 'superseded' });
    expect(waits).toBe(0);
    expect(f.writes).toEqual([]);
});

test('still rejects a different original run after the candidate becomes visible', async () => {
    // Arrange
    const f = fixture();
    const request = f.dependencies.request;
    let associations = 0;
    f.dependencies.wait = async () => {
        f.pull.body = JSON.stringify({ ...f.record, runId: 302 });
    };
    f.dependencies.request = async (method, endpoint, body) => {
        if (method === 'GET' && endpoint.endsWith(`/commits/${f.candidate}/pulls?per_page=100`) && associations++ === 0) throw missingCandidate(f.candidate);
        return request(method, endpoint, body);
    };
    // Act
    const result = authorizeReleaseCandidate(f.context, f.dependencies);
    // Assert
    await expect(result).rejects.toThrow();
    expect(f.writes).toEqual([]);
});

test('does not approve a foreign actor after candidate visibility is restored', async () => {
    // Arrange
    const f = fixture();
    const request = f.dependencies.request;
    let associations = 0;
    f.dependencies.wait = async () => {
        f.ciRun.actor = { id: 12345, login: 'maintainer', type: 'User' };
    };
    f.dependencies.request = async (method, endpoint, body) => {
        if (method === 'GET' && endpoint.endsWith(`/commits/${f.candidate}/pulls?per_page=100`) && associations++ === 0) throw missingCandidate(f.candidate);
        return request(method, endpoint, body);
    };
    // Act
    const result = await authorizeReleaseCandidate(f.context, f.dependencies);
    // Assert
    expect(result.status).not.toBe('verification-approved');
    expect(f.writes).toEqual([]);
});
