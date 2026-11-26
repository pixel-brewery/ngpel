// #region Imports
import { execFileSync } from 'node:child_process';
import { mergeVerifiedPullRequest } from '../../lib/github/mergeVerifiedPullRequest.mjs';
import { requireMergeProtection } from '../../lib/github/requireMergeProtection.mjs';
import { readReleaseMetadata } from './readReleaseMetadata.mjs';
import { verifyReleaseMetadata } from './verifyReleaseMetadata.mjs';
// #endregion

const prefix = 'repos/pixel-brewery/ngpel';
const sha = /^[a-f0-9]{40}$/u;
const canonical = (value) => value?.id === 1447827206 && value.full_name === 'pixel-brewery/ngpel';

/**
 * Integrates one already verified release artifact through a normal protected metadata PR.
 *
 * @param context - The immutable original source run and verified candidate record.
 * @param dependencies - The bounded API, native push and cancellable wait boundaries.
 * @returns The actual tree-equivalent publication commit, or an explicit pending/blocked result.
 * @remarks A resumed job retains the same artifact, branch, PR and CI attempt. It never rebases metadata or prepares another version.
 * @internal
 */
export async function integrateReleaseCandidate(context, dependencies) {
    const { request, candidate } = dependencies;
    if (
        !sha.test(context?.sourceSha ?? '') ||
        !Number.isSafeInteger(context?.runId) ||
        context.runId <= 0 ||
        !sha.test(candidate?.commit ?? '') ||
        !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/u.test(candidate.version ?? '')
    ) {
        throw new Error('The release integration requires one verified source-bound candidate.');
    }
    const record = { source: context.sourceSha, candidate: candidate.commit, version: candidate.version, runId: context.runId };
    const branch = `release/ngpel/${record.source}`;
    const pulls = await request('GET', `${prefix}/pulls?state=all&head=${encodeURIComponent(`pixel-brewery:${branch}`)}&base=main&per_page=100`);
    if (!Array.isArray(pulls) || pulls.length > 1) throw new Error('The metadata pull request is ambiguous.');
    let number = pulls[0]?.number;
    if (pulls.length === 1) {
        if (!Number.isSafeInteger(number) || number <= 0) throw new Error('Invalid existing metadata pull request.');
        const existing = await verifyReleaseMetadata(await request('GET', `${prefix}/pulls/${number}`), request);
        if (Object.keys(record).some((key) => existing.record[key] !== record[key])) throw new Error('The metadata record changed.');
        if (existing.publicationSha) {
            const main = await request('GET', `${prefix}/branches/main`);
            if (main?.name !== 'main' || main.commit?.sha !== existing.publicationSha) throw new Error('A newer main source superseded publication.');
            return { status: 'integrated', publicationSha: existing.publicationSha, number, version: record.version };
        }
    }
    if (pulls.length === 0) {
        const main = await request('GET', `${prefix}/branches/main`);
        if (main?.name !== 'main' || main.commit?.sha !== record.source) throw new Error('A newer main source superseded the prepared metadata.');
        const refs = await request('GET', `${prefix}/git/matching-refs/heads/${encodeURIComponent(branch)}`);
        if (!Array.isArray(refs) || refs.length > 1) throw new Error('The metadata branch is ambiguous.');
        if (refs.length === 1 && (refs[0]?.ref !== `refs/heads/${branch}` || refs[0]?.object?.sha !== record.candidate))
            throw new Error('An existing metadata branch contains a different candidate.');
        if (refs.length === 0) await (dependencies.pushCandidate ?? pushCandidate)(record.candidate, branch);
        const created = await request('POST', `${prefix}/pulls`, {
            title: `chore(release): publish ngpel ${record.version}`,
            head: branch,
            base: 'main',
            body: JSON.stringify(record, null, 2),
        });
        number = created?.number;
    }
    if (!Number.isSafeInteger(number) || number <= 0) throw new Error('GitHub did not confirm the metadata pull request.');
    const workflow = await request('GET', `${prefix}/actions/workflows/ci.yml`);
    if (
        !Number.isSafeInteger(workflow?.id) ||
        workflow.id <= 0 ||
        workflow.path !== '.github/workflows/ci.yml' ||
        workflow.name !== 'CI' ||
        workflow.state !== 'active'
    ) {
        throw new Error('The required metadata CI workflow is unavailable.');
    }
    const wait = dependencies.wait ?? ((milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)));
    const polls = dependencies.polls ?? 90;
    if (!Number.isSafeInteger(polls) || polls < 1 || polls > 90) throw new Error('Invalid bounded metadata wait.');
    const initialPull = await request('GET', `${prefix}/pulls/${number}`);
    const initialProof = await verifyReleaseMetadata(initialPull, request);
    if (Object.keys(record).some((key) => initialProof.record[key] !== record[key])) throw new Error('The metadata record changed.');
    let requested = false;
    for (let poll = 0; poll < polls; poll++) {
        const pull = poll === 0 ? initialPull : await request('GET', `${prefix}/pulls/${number}`);
        const currentRecord = readReleaseMetadata(pull?.body);
        if (
            !currentRecord ||
            Object.keys(record).some((key) => currentRecord[key] !== record[key]) ||
            pull.number !== number ||
            pull.user?.id !== 41898282 ||
            pull.user.login !== 'github-actions[bot]' ||
            pull.user.type !== 'Bot' ||
            pull.draft !== false ||
            !canonical(pull.head?.repo) ||
            !canonical(pull.base?.repo) ||
            pull.base.ref !== 'main' ||
            pull.head.sha !== record.candidate ||
            pull.head.ref !== branch ||
            !['open', 'closed'].includes(pull.state) ||
            (pull.state === 'open' && pull.merged !== false)
        )
            throw new Error('The metadata record or branch changed.');
        const verified = pull.state === 'closed' ? await verifyReleaseMetadata(pull, request) : initialProof;
        const main = await request('GET', `${prefix}/branches/main`);
        if (verified.publicationSha) {
            if (main?.name !== 'main' || main.commit?.sha !== verified.publicationSha) throw new Error('A newer main source superseded publication.');
            return { status: 'integrated', publicationSha: verified.publicationSha, number, version: record.version };
        }
        if (main?.name !== 'main' || main.commit?.sha !== record.source) throw new Error('A newer main source superseded the prepared metadata.');
        if (!(await requireMergeProtection(request, prefix))) return { status: 'blocked', reason: 'missing-merge-protection', number };
        const response = await request('GET', `${prefix}/actions/workflows/${workflow.id}/runs?head_sha=${record.candidate}&per_page=100`);
        if (
            !Number.isSafeInteger(response?.total_count) ||
            response.total_count < 0 ||
            response.total_count > 100 ||
            !Array.isArray(response.workflow_runs) ||
            response.workflow_runs.length !== response.total_count
        ) {
            throw new Error('The metadata verification inventory is incomplete.');
        }
        const runs = response.workflow_runs
            .filter(
                (run) =>
                    Number.isSafeInteger(run?.id) &&
                    run.id > 0 &&
                    run.workflow_id === workflow.id &&
                    run.name === 'CI' &&
                    run.head_sha === record.candidate &&
                    run.head_branch === branch &&
                    canonical(run.repository) &&
                    canonical(run.head_repository) &&
                    ['pull_request', 'workflow_dispatch'].includes(run.event) &&
                    (run.path === workflow.path || run.path?.startsWith(`${workflow.path}@`)) &&
                    !['action_required', 'waiting'].includes(run.conclusion) &&
                    !['action_required', 'waiting'].includes(run.status),
            )
            .sort((left, right) => right.id - left.id);
        const run = runs[0];
        if (!run && !requested) {
            await request('POST', `${prefix}/actions/workflows/${workflow.id}/dispatches`, { ref: branch, inputs: { expected_head_sha: record.candidate } });
            requested = true;
        } else if (run?.status === 'completed') {
            if (run.conclusion !== 'success') return { status: 'blocked', reason: 'verification-failed', number };
            const result = await mergeVerifiedPullRequest(
                { ...context, kind: 'release-metadata', eventName: 'workflow_run', runId: run.id, runAttempt: run.run_attempt },
                {
                    request,
                    verifyMetadata: async (current) => {
                        const proof = await verifyReleaseMetadata(current, request);
                        return !proof.publicationSha && Object.keys(record).every((key) => proof.record[key] === record[key]);
                    },
                },
            );
            if (result.status === 'merged') {
                const confirmed = await verifyReleaseMetadata(await request('GET', `${prefix}/pulls/${number}`), request);
                const publishedMain = await request('GET', `${prefix}/branches/main`);
                if (confirmed.publicationSha !== result.sha || publishedMain?.name !== 'main' || publishedMain.commit?.sha !== result.sha)
                    throw new Error('The confirmed publication source changed.');
                return { status: 'integrated', publicationSha: result.sha, number, version: record.version };
            }
            if (!['incomplete-verification', 'workflow-run-changed'].includes(result.reason)) return { status: 'blocked', reason: result.reason, number };
        }
        if (poll + 1 < polls) await wait(30_000);
    }
    return { status: 'waiting', number };
}

function pushCandidate(candidate, branch) {
    if (!process.env.GH_TOKEN) throw new Error('The native metadata push token is unavailable.');
    const remote = execFileSync('git', ['remote', 'get-url', 'origin'], { encoding: 'utf8', timeout: 10_000 }).trim();
    if (!/^https:\/\/github\.com\/pixel-brewery\/ngpel(?:\.git)?$/u.test(remote)) throw new Error('The metadata push origin is not canonical.');
    const authorization = Buffer.from(`x-access-token:${process.env.GH_TOKEN}`).toString('base64');
    execFileSync('git', ['push', 'origin', `${candidate}:refs/heads/${branch}`], {
        env: {
            ...process.env,
            GIT_CONFIG_COUNT: '1',
            GIT_CONFIG_KEY_0: 'http.https://github.com/.extraheader',
            GIT_CONFIG_VALUE_0: `AUTHORIZATION: basic ${authorization}`,
        },
        timeout: 30_000,
        maxBuffer: 1024 * 1024,
        stdio: ['ignore', 'pipe', 'pipe'],
    });
}
