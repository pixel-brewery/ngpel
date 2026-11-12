import { describe, expect, it, vi } from 'vitest';
import { mergeDependabotPullRequest } from './mergeDependabotPullRequest.mjs';

function fixture() {
    const head = 'a'.repeat(40);
    const main = 'b'.repeat(40);
    const merge = 'c'.repeat(40);
    const repository = { id: 1447827206, private: false, default_branch: 'main' };
    const run = {
        id: 123,
        run_attempt: 2,
        workflow_id: 456,
        path: '.github/workflows/ci.yml@refs/pull/7/merge',
        event: 'pull_request',
        status: 'completed',
        conclusion: 'success',
        repository,
        head_repository: repository,
        head_sha: head,
        pull_requests: [{ number: 7 }],
    };
    const pullRequest = {
        number: 7,
        state: 'open',
        draft: false,
        user: { login: 'dependabot[bot]', type: 'Bot' },
        base: { ref: 'main', repo: repository },
        head: { sha: head, repo: repository },
    };
    const job = {
        name: 'Lint, Typecheck, Test & Build',
        run_id: 123,
        run_attempt: 2,
        status: 'completed',
        conclusion: 'success',
    };
    const comparison = { behind_by: 0, merge_base_commit: { sha: main } };
    const responses = {
        'actions/workflows/ci.yml': { id: 456, path: '.github/workflows/ci.yml', name: 'CI' },
        'actions/runs/123': { ...run },
        'actions/runs/123/attempts/2/jobs': { total_count: 1, jobs: [job] },
        'pulls/7': pullRequest,
        'git/ref/heads/main': { object: { sha: main } },
        [`compare/${main}...${head}`]: comparison,
        'pulls/7/merge': { merged: true, sha: merge },
    };
    const api = vi.fn((path) => responses[path]);
    return { api, event: { repository, workflow_run: run }, head, merge, comparison, job, pullRequest, responses };
}

describe('verified Dependabot merge', () => {
    it('squash-merges the same commit that passed CI', () => {
        const { api, event, head, merge } = fixture();

        expect(mergeDependabotPullRequest(event, api)).toEqual({ status: 'merged', sha: merge });
        expect(api).toHaveBeenLastCalledWith('pulls/7/merge', { sha: head, merge_method: 'squash' });
    });

    it('skips the PR when the required job did not pass', () => {
        const { api, event, job } = fixture();
        job.conclusion = 'skipped';

        expect(mergeDependabotPullRequest(event, api)).toEqual({ status: 'incomplete-verification' });
        expect(api).not.toHaveBeenCalledWith('pulls/7/merge', expect.anything());
    });

    it('skips a Dependabot head behind main', () => {
        const { api, event, comparison } = fixture();
        comparison.behind_by = 1;

        expect(mergeDependabotPullRequest(event, api)).toEqual({ status: 'branch-not-current' });
        expect(api).not.toHaveBeenCalledWith('pulls/7/merge', expect.anything());
    });

    it('skips an unverified replacement head', () => {
        const { api, event, pullRequest } = fixture();
        pullRequest.head.sha = 'd'.repeat(40);

        expect(mergeDependabotPullRequest(event, api)).toEqual({ status: 'ineligible-pull-request' });
        expect(api).not.toHaveBeenCalledWith('pulls/7/merge', expect.anything());
    });

    it('skips an attempt superseded by a new CI run attempt', () => {
        const { api, event, responses } = fixture();
        responses['actions/runs/123'].run_attempt++;

        expect(mergeDependabotPullRequest(event, api)).toEqual({ status: 'ineligible-workflow-run' });
        expect(api).not.toHaveBeenCalledWith('pulls/7/merge', expect.anything());
    });
});
