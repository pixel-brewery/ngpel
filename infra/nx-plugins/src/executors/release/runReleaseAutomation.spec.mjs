// #region Imports
import { afterEach, expect, test, vi } from 'vitest';
import { runReleaseAutomation } from './runReleaseAutomation.mjs';
// #endregion

const edges = vi.hoisted(() => ({ request: vi.fn(), resolve: vi.fn(), candidate: vi.fn(), verify: vi.fn(), continuation: vi.fn() }));
vi.mock('../../lib/github/requestDependabotGitHub.mjs', () => ({ requestDependabotGitHub: edges.request }));
vi.mock('../../lib/github/resolveDependabotRepository.mjs', () => ({ resolveDependabotRepository: edges.resolve }));
vi.mock('../../lib/github/requestMergedWorkflow.mjs', () => ({ requestMergedWorkflow: edges.continuation }));
vi.mock('./releaseCandidate.mjs', () => ({ releaseCandidate: edges.candidate }));
vi.mock('./verifyReleaseMetadata.mjs', () => ({ verifyReleaseMetadata: edges.verify }));
const source = 'a'.repeat(40),
    candidate = 'b'.repeat(40),
    publication = 'c'.repeat(40);

function fixture() {
    vi.stubEnv('GITHUB_REPOSITORY', 'pixel-brewery/ngpel');
    vi.stubEnv('GITHUB_REPOSITORY_ID', '1447827206');
    vi.stubEnv('GITHUB_RUN_ID', '301');
    vi.stubEnv('GITHUB_EVENT_NAME', 'push');
    vi.stubEnv('RELEASE_SOURCE_SHA', source);
    vi.stubEnv('PUBLICATION_SHA', publication);
    vi.stubEnv('GITHUB_OUTPUT', '');
    vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    edges.resolve.mockResolvedValue({ id: 1447827206 });
    edges.candidate.mockReturnValue({ commit: candidate, version: '0.0.31' });
    edges.continuation.mockResolvedValue({ status: 'retained' });
    const proof = { publicationSha: publication, record: { source, candidate, version: '0.0.31', runId: 301 } };
    edges.verify.mockResolvedValue(proof);
    const pull = { number: 7, user: { id: 41898282 }, head: { sha: candidate, ref: `release/ngpel/${source}` } };
    const state = { proof, main: publication, associations: [pull] };
    edges.request.mockImplementation(async (method, path) => {
        if (method !== 'GET') throw new Error('Unexpected write.');
        if (path.endsWith(`/commits/${publication}/pulls?per_page=100`)) return state.associations;
        if (path.endsWith('/pulls/7')) return pull;
        if (path.endsWith('/branches/main')) return { name: 'main', commit: { sha: state.main } };
        throw new Error('Unexpected test route.');
    });
    return state;
}

afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    Object.values(edges).forEach((edge) => edge.mockReset());
});

test('continues main CI and documentation only from the exact original-artifact equivalent publication', async () => {
    // Arrange
    fixture();
    // Act
    const result = await runReleaseAutomation('continue', { directory: 'original-artifact' });
    // Assert
    expect(result.status).toBe('continued');
    expect(edges.candidate).toHaveBeenCalledExactlyOnceWith('verify', 'original-artifact', source);
    expect(edges.continuation).toHaveBeenCalledTimes(2);
    expect(edges.continuation).toHaveBeenCalledWith(expect.objectContaining({ sourceSha: publication, eventName: 'workflow_run' }));
    expect(edges.continuation).toHaveBeenCalledWith(expect.objectContaining({ sourceSha: publication, workflow: 'documentation' }));
});

for (const change of ['source', 'candidate', 'version', 'runId', 'publication', 'main', 'ambiguous-association', 'missing-full-proof']) {
    test(`starts no publication continuation when its original-artifact binding changes: ${change}`, async () => {
        // Arrange
        const state = fixture();
        if (change === 'source' || change === 'candidate') state.proof.record[change] = 'f'.repeat(40);
        if (change === 'version') state.proof.record.version = '0.0.32';
        if (change === 'runId') state.proof.record.runId = 302;
        if (change === 'publication') state.proof.publicationSha = 'f'.repeat(40);
        if (change === 'main') state.main = 'f'.repeat(40);
        if (change === 'ambiguous-association') state.associations.push({ ...state.associations[0], number: 8 });
        if (change === 'missing-full-proof') edges.verify.mockRejectedValue(new Error('Unconfirmed metadata publication.'));
        // Act
        const result = runReleaseAutomation('continue');
        // Assert
        await expect(result).rejects.toThrow();
        expect(edges.continuation).not.toHaveBeenCalled();
    });
}
