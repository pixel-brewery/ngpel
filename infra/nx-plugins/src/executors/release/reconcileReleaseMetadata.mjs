// #region Imports
import { resolveDependabotRepository } from '../../lib/github/resolveDependabotRepository.mjs';
import { readLatestPullRequestRun } from '../../lib/github/readLatestPullRequestRun.mjs';
import { resumeReleaseMetadata } from './resumeReleaseMetadata.mjs';
import { verifyReleaseMetadata } from './verifyReleaseMetadata.mjs';
// #endregion

const prefix = 'repos/pixel-brewery/ngpel';
const canonical = (value) => value?.id === 1447827206 && value.full_name === 'pixel-brewery/ngpel';

/**
 * Recovers a retained metadata wait after release completion or the hourly fallback.
 *
 * @param context - The trusted default-branch maintenance context.
 * @param request - The bounded native-token metadata boundary.
 * @returns One outcome per source-relevant metadata PR, without creating candidates.
 * @remarks Covers CI completing immediately before the original run's pending failure, and an owner merging the retained metadata PR. Only the original failed jobs can be resumed.
 * @internal
 */
export async function reconcileReleaseMetadata(context, request) {
    if (!['schedule', 'workflow_dispatch', 'workflow_run'].includes(context?.eventName) || !(await resolveDependabotRepository(context, request)))
        throw new Error('Unsupported release recovery context.');
    const main = await request('GET', `${prefix}/branches/main`);
    const currentSha = main?.commit?.sha;
    if (main?.name !== 'main' || typeof currentSha !== 'string' || !/^[a-f0-9]{40}$/u.test(currentSha)) throw new Error('Invalid recovery source.');
    const open = await request(
        'GET',
        `${prefix}/pulls?state=open&base=main&head=${encodeURIComponent(`pixel-brewery:release/ngpel/${currentSha}`)}&per_page=100`,
    );
    const associated = await request('GET', `${prefix}/commits/${currentSha}/pulls?per_page=100`);
    if (!Array.isArray(open) || open.length > 1 || !Array.isArray(associated) || associated.length >= 100)
        throw new Error('Incomplete metadata recovery inventory.');
    const numbers = new Set(
        [...open, ...associated]
            .filter(
                (pull) =>
                    Number.isSafeInteger(pull?.number) &&
                    pull.number > 0 &&
                    pull.user?.id === 41898282 &&
                    pull.user.login === 'github-actions[bot]' &&
                    canonical(pull.head?.repo) &&
                    canonical(pull.base?.repo) &&
                    pull.base.ref === 'main' &&
                    /^release\/ngpel\/[a-f0-9]{40}$/u.test(pull.head?.ref ?? ''),
            )
            .map((pull) => pull.number),
    );
    if (numbers.size > 10) throw new Error('Metadata recovery exceeds its candidate bound.');
    const results = [];
    for (const number of numbers) {
        try {
            const pull = await request('GET', `${prefix}/pulls/${number}`);
            const proof = await verifyReleaseMetadata(pull, request);
            if ((proof.publicationSha ?? proof.record.source) !== currentSha || proof.run.status !== 'completed' || proof.run.conclusion !== 'failure') {
                results.push({ number, status: 'retained' });
                continue;
            }
            const workflow = await request('GET', `${prefix}/actions/workflows/ci.yml`);
            if (
                !Number.isSafeInteger(workflow?.id) ||
                workflow.id <= 0 ||
                workflow.path !== '.github/workflows/ci.yml' ||
                workflow.name !== 'CI' ||
                workflow.state !== 'active'
            )
                throw new Error('The canonical recovery CI workflow changed.');
            const inventory = await request('GET', `${prefix}/actions/workflows/${workflow.id}/runs?head_sha=${proof.record.candidate}&per_page=100`);
            if (
                !Number.isSafeInteger(inventory?.total_count) ||
                inventory.total_count < 0 ||
                inventory.total_count > 100 ||
                !Array.isArray(inventory.workflow_runs) ||
                inventory.workflow_runs.length !== inventory.total_count
            )
                throw new Error('Incomplete recovery verification inventory.');
            const identity = { id: 1447827206, fullName: 'pixel-brewery/ngpel', defaultBranch: 'main', path: prefix };
            const selected = readLatestPullRequestRun(inventory, identity, workflow, pull);
            let latest;
            if (selected) {
                const current = await request('GET', `${prefix}/actions/runs/${selected.id}`);
                latest = readLatestPullRequestRun({ total_count: 1, workflow_runs: [current] }, identity, workflow, pull);
                if (latest?.id !== selected.id || latest.run_attempt < selected.run_attempt) latest = undefined;
            }
            if (latest?.status !== 'completed' || latest.conclusion !== 'success') {
                results.push({ number, status: 'verification-pending' });
                continue;
            }
            const outcome = await resumeReleaseMetadata({ ...context, eventName: 'workflow_run', runId: latest.id, runAttempt: latest.run_attempt }, request);
            results.push({ number, ...outcome });
        } catch (error) {
            results.push({ number, status: 'blocked', reason: error instanceof Error ? error.message.slice(0, 160) : 'metadata-recovery-failed' });
        }
    }
    return results;
}
