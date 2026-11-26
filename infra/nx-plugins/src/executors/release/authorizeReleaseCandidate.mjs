// #region Imports
import { authorizePullRequestWorkflow } from '../../lib/github/authorizePullRequestWorkflow.mjs';
import { readLatestPullRequestRun } from '../../lib/github/readLatestPullRequestRun.mjs';
import { resolveDependabotRepository } from '../../lib/github/resolveDependabotRepository.mjs';
import { verificationPolicy } from '../../lib/github/verificationPolicy.mjs';
import { verifyReleaseMetadata } from './verifyReleaseMetadata.mjs';
// #endregion

const prefix = 'repos/pixel-brewery/ngpel';

/**
 * Authorizes native metadata CI from an isolated job bound to the original verified artifact.
 *
 * @param context - The trusted original main source and release-run identity.
 * @param dependencies - The already verified candidate, bounded REST and optional waiting boundaries.
 * @returns An actual authorization, already active verification or retained publication outcome.
 * @remarks The caller verifies the same original bundle and tarball hashes before this owner runs. This job has read-only contents and PR scopes plus Actions write, performs no source/PR write and never merges or prepares another candidate.
 * @internal
 */
export async function authorizeReleaseCandidate(context, dependencies) {
    const { request, candidate } = dependencies;
    const identity = await resolveDependabotRepository(context, request);
    if (
        !identity ||
        !/^[a-f0-9]{40}$/u.test(context?.sourceSha ?? '') ||
        !Number.isSafeInteger(context.runId) ||
        context.runId <= 0 ||
        !/^[a-f0-9]{40}$/u.test(candidate?.commit ?? '') ||
        !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/u.test(candidate.version ?? '')
    )
        throw new Error('Metadata authorization requires one verified original candidate.');
    const record = { source: context.sourceSha, candidate: candidate.commit, version: candidate.version, runId: context.runId };
    const polls = dependencies.polls ?? 90;
    if (!Number.isSafeInteger(polls) || polls < 1 || polls > 90) throw new Error('Invalid bounded metadata authorization wait.');
    const wait = dependencies.wait ?? ((milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)));
    for (let index = 0; index < polls; index++) {
        const associationEndpoint = `${prefix}/commits/${candidate.commit}/pulls?per_page=100`;
        let values;
        try {
            values = await request('GET', associationEndpoint);
        } catch (error) {
            if (error?.code !== 'NGPEL_RELEASE_CANDIDATE_NOT_CREATED' || error.endpoint !== associationEndpoint || error.candidate !== candidate.commit)
                throw error;
            const current = await request('GET', `${prefix}/branches/main`);
            if (current?.name !== 'main' || current.commit?.sha !== record.source) return { status: 'superseded' };
            values = [];
        }
        if (!Array.isArray(values) || values.length >= 100) throw new Error('The metadata authorization association is incomplete.');
        const matching = values.filter(
            (pull) =>
                pull?.user?.id === 41898282 &&
                pull.user.login === 'github-actions[bot]' &&
                pull.head?.sha === candidate.commit &&
                pull.head.ref === `release/ngpel/${context.sourceSha}` &&
                pull.base?.ref === 'main' &&
                pull.head.repo?.id === identity.id &&
                pull.base.repo?.id === identity.id,
        );
        if (matching.length > 1) throw new Error('The original metadata candidate has ambiguous PRs.');
        if (matching.length === 1) {
            const number = matching[0].number;
            if (!Number.isSafeInteger(number) || number <= 0) throw new Error('Invalid metadata authorization PR.');
            const pull = await request('GET', `${prefix}/pulls/${number}`);
            if (pull?.number !== number) throw new Error('The metadata authorization PR changed.');
            const proof = await verifyReleaseMetadata(pull, request);
            if (Object.keys(record).some((key) => proof.record[key] !== record[key]))
                throw new Error('The metadata PR differs from the original verified artifact.');
            const main = await request('GET', `${prefix}/branches/main`);
            if (main?.name !== 'main' || main.commit?.sha !== (proof.publicationSha ?? record.source)) return { status: 'superseded', number };
            if (proof.publicationSha) return { status: 'integrated', number, publicationSha: proof.publicationSha };
            const outcome = await authorizePullRequestWorkflow(
                { ...context, eventName: 'workflow_run', number, kind: 'release-metadata' },
                {
                    request,
                    verifyMetadata: async (current) => {
                        const verified = await verifyReleaseMetadata(current, request);
                        return !verified.publicationSha && Object.keys(record).every((key) => verified.record[key] === record[key]);
                    },
                },
            );
            if (outcome.status === 'verification-approved') return outcome;
            const workflow = await request('GET', `${prefix}/actions/workflows/ci.yml`);
            if (workflow?.name !== verificationPolicy.workflowName || workflow.path !== verificationPolicy.workflowPath || workflow.state !== 'active')
                throw new Error('The metadata authorization workflow changed.');
            const inventory = await request('GET', `${prefix}/actions/workflows/ci.yml/runs?head_sha=${candidate.commit}&per_page=100`);
            const selected = readLatestPullRequestRun(inventory, identity, workflow, pull);
            if (selected) {
                const current = await request('GET', `${prefix}/actions/runs/${selected.id}`);
                const native = readLatestPullRequestRun({ total_count: 1, workflow_runs: [current] }, identity, workflow, pull);
                if (native?.id === selected.id && native.run_attempt >= selected.run_attempt) {
                    if (
                        ['queued', 'in_progress', 'waiting', 'requested', 'pending'].includes(native.status) ||
                        (native.status === 'completed' && native.conclusion === 'success')
                    )
                        return { status: 'verification-active', number, runId: native.id, runAttempt: native.run_attempt };
                    if (native.status === 'completed' && native.conclusion !== 'action_required')
                        return { status: 'blocked', number, reason: 'native-verification-failed' };
                }
            }
        }
        if (index + 1 < polls) await wait(30_000);
    }
    return { status: 'waiting', reason: 'metadata-native-ci-not-observed' };
}
