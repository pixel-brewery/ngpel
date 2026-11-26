// #region Imports
import { readLatestPullRequestRun } from '../../lib/github/readLatestPullRequestRun.mjs';
import { requireMergeProtection } from '../../lib/github/requireMergeProtection.mjs';
import { resolveDependabotRepository } from '../../lib/github/resolveDependabotRepository.mjs';
import { verifyReleaseMetadata } from './verifyReleaseMetadata.mjs';
// #endregion

const prefix = 'repos/pixel-brewery/ngpel';
const canonical = (value) => value?.id === 1447827206 && value.full_name === 'pixel-brewery/ngpel';

/**
 * Resumes only a retained release whose bounded metadata wait expired before exact-head CI completed.
 *
 * @param context - The successful canonical CI workflow-run notification.
 * @param request - The bounded GitHub REST boundary.
 * @returns A retained/rerun outcome without preparing or dispatching a new release.
 * @remarks Cancelled runs, prepare failures and publication failures are never blindly retried.
 * @internal
 */
export async function resumeReleaseMetadata(context, request) {
    if (
        context?.eventName !== 'workflow_run' ||
        !Number.isSafeInteger(Number(context?.runId)) ||
        Number(context.runId) <= 0 ||
        !Number.isSafeInteger(Number(context?.runAttempt)) ||
        Number(context.runAttempt) <= 0 ||
        !(await resolveDependabotRepository(context, request))
    )
        return { status: 'unsupported-context' };
    const workflow = await request('GET', `${prefix}/actions/workflows/ci.yml`);
    const runPath = `${prefix}/actions/runs/${context.runId}`;
    const run = await request('GET', runPath);
    const eligible = (value) =>
        value?.id === Number(context.runId) &&
        value.run_attempt === Number(context.runAttempt) &&
        value.workflow_id === workflow?.id &&
        value.name === 'CI' &&
        value.status === 'completed' &&
        value.conclusion === 'success' &&
        value.event === 'pull_request' &&
        canonical(value.repository) &&
        canonical(value.head_repository) &&
        /^release\/ngpel\/[a-f0-9]{40}$/u.test(value.head_branch ?? '') &&
        /^[a-f0-9]{40}$/u.test(value.head_sha ?? '') &&
        (value.path === '.github/workflows/ci.yml' || value.path?.startsWith('.github/workflows/ci.yml@'));
    if (
        !Number.isSafeInteger(workflow?.id) ||
        workflow.id <= 0 ||
        workflow?.name !== 'CI' ||
        workflow.path !== '.github/workflows/ci.yml' ||
        workflow.state !== 'active' ||
        !eligible(run)
    )
        return { status: 'ineligible-ci' };
    const associations = await request('GET', `${prefix}/commits/${run.head_sha}/pulls?per_page=100`);
    if (!Array.isArray(associations) || associations.length >= 100) return { status: 'ambiguous-pull-request' };
    const candidates = associations.filter(
        (pull) =>
            pull?.head?.sha === run.head_sha &&
            pull.head.ref === run.head_branch &&
            pull.user?.id === 41898282 &&
            pull.user.login === 'github-actions[bot]' &&
            pull.base?.ref === 'main' &&
            canonical(pull.base?.repo) &&
            canonical(pull.head?.repo),
    );
    if (candidates.length !== 1 || !Number.isSafeInteger(candidates[0]?.number)) return { status: 'ambiguous-pull-request' };
    const pullPath = `${prefix}/pulls/${candidates[0].number}`;
    const pull = await request('GET', pullPath);
    const proof = await verifyReleaseMetadata(pull, request);
    const identity = { id: 1447827206, fullName: 'pixel-brewery/ngpel', defaultBranch: 'main', path: prefix };
    async function isLatest() {
        const inventory = await request('GET', `${prefix}/actions/workflows/ci.yml/runs?head_sha=${run.head_sha}&per_page=100`);
        const latest = readLatestPullRequestRun(inventory, identity, workflow, pull);
        return latest?.id === run.id && latest.run_attempt <= run.run_attempt;
    }
    if (!(await isLatest())) return { status: 'superseded-ci' };
    if (proof.record.candidate !== run.head_sha) return { status: 'candidate-changed' };
    if (proof.run.status !== 'completed' || proof.run.conclusion !== 'failure') return { status: 'retained', runId: proof.run.id };
    const jobs = await request('GET', `${prefix}/actions/runs/${run.id}/attempts/${run.run_attempt}/jobs?per_page=100`);
    const job = jobs?.jobs?.[0];
    if (
        jobs?.total_count !== 1 ||
        jobs.jobs?.length !== 1 ||
        job?.run_id !== run.id ||
        (job.run_attempt !== undefined && job.run_attempt !== run.run_attempt) ||
        job.name !== 'Lint, Typecheck, Test & Build' ||
        job.status !== 'completed' ||
        job.conclusion !== 'success'
    )
        return { status: 'incomplete-ci' };
    const releaseJobs = await request('GET', `${prefix}/actions/runs/${proof.run.id}/attempts/${proof.run.run_attempt}/jobs?per_page=100`);
    if (
        !Number.isSafeInteger(releaseJobs?.total_count) ||
        releaseJobs.total_count > 100 ||
        !Array.isArray(releaseJobs.jobs) ||
        releaseJobs.jobs.length !== releaseJobs.total_count
    )
        throw new Error('The retained release job inventory is incomplete.');
    const metadataJobs = releaseJobs.jobs.filter(
        (item) =>
            item?.name === 'Integrate protected release metadata' &&
            item.run_id === proof.run.id &&
            (item.run_attempt === undefined || item.run_attempt === proof.run.run_attempt),
    );
    if (
        metadataJobs.length !== 1 ||
        metadataJobs[0].status !== 'completed' ||
        metadataJobs[0].conclusion !== 'failure' ||
        !metadataJobs[0].steps?.some((step) => step.name === 'Metadata verification remains pending' && step.conclusion === 'failure')
    ) {
        return { status: 'retained', runId: proof.run.id };
    }
    const artifacts = await request('GET', `${prefix}/actions/runs/${proof.run.id}/artifacts?per_page=100`);
    if (
        !Number.isSafeInteger(artifacts?.total_count) ||
        artifacts.total_count > 100 ||
        !Array.isArray(artifacts.artifacts) ||
        artifacts.artifacts.length !== artifacts.total_count ||
        artifacts.artifacts.filter(
            (item) =>
                item?.name === `ngpel-release-${proof.run.id}` &&
                item.expired === false &&
                Number.isSafeInteger(item.id) &&
                item.id > 0 &&
                /^sha256:[a-f0-9]{64}$/u.test(item.digest ?? '') &&
                item.workflow_run?.id === proof.run.id &&
                item.workflow_run.head_sha === proof.record.source &&
                item.workflow_run.head_branch === 'main' &&
                item.workflow_run.repository_id === 1447827206 &&
                item.workflow_run.head_repository_id === 1447827206,
        ).length !== 1
    ) {
        return { status: 'artifact-unavailable' };
    }
    if (!(await requireMergeProtection(request, prefix))) return { status: 'missing-merge-protection' };
    const currentMain = await request('GET', `${prefix}/branches/main`);
    if (currentMain?.name !== 'main' || currentMain.commit?.sha !== (proof.publicationSha ?? proof.record.source)) return { status: 'superseded' };
    const currentProof = await verifyReleaseMetadata(await request('GET', pullPath), request);
    const currentRun = await request('GET', runPath);
    if (
        !eligible(currentRun) ||
        !(await isLatest()) ||
        currentProof.record.candidate !== proof.record.candidate ||
        currentProof.record.runId !== proof.record.runId ||
        currentProof.run.run_attempt !== proof.run.run_attempt ||
        currentProof.run.status !== 'completed' ||
        currentProof.run.conclusion !== 'failure'
    )
        return { status: 'changed' };
    await request('POST', `${prefix}/actions/runs/${proof.run.id}/rerun-failed-jobs`);
    return { status: 'resumed', runId: proof.run.id, sourceSha: proof.record.source };
}
