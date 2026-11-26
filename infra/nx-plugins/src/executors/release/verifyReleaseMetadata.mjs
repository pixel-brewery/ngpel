// #region Imports
import { readReleaseMetadata } from './readReleaseMetadata.mjs';
// #endregion

const prefix = 'repos/pixel-brewery/ngpel';
const identity = { id: 1447827206, full_name: 'pixel-brewery/ngpel' };
const path = '.github/workflows/release.yml';
const sha = /^[a-f0-9]{40}$/u;
const canonical = (value) => value?.id === identity.id && value?.full_name === identity.full_name;

/**
 * Binds a bot metadata PR to one prepared release run, candidate tree and original source.
 *
 * @param pull - The freshly read complete pull request.
 * @param request - The bounded GitHub REST boundary.
 * @returns Verified provenance and an optional actual merged publication SHA.
 * @throws An Error when any claimed source, run, commit or publication differs.
 * @remarks No artifact is executed and no repository state is changed here.
 * @internal
 */
export async function verifyReleaseMetadata(pull, request) {
    const record = readReleaseMetadata(pull?.body);
    if (
        !record ||
        !Number.isSafeInteger(pull?.number) ||
        pull.number <= 0 ||
        pull?.user?.id !== 41898282 ||
        pull.user.login !== 'github-actions[bot]' ||
        pull.user.type !== 'Bot' ||
        pull.draft !== false ||
        !canonical(pull.base?.repo) ||
        !canonical(pull.head?.repo) ||
        pull.base.ref !== 'main' ||
        pull.head.ref !== `release/ngpel/${record.source}` ||
        pull.head.sha !== record.candidate ||
        !['open', 'closed'].includes(pull.state)
    ) {
        throw new Error('The release metadata pull request has invalid provenance.');
    }
    const workflow = await request('GET', `${prefix}/actions/workflows/release.yml`);
    const run = await request('GET', `${prefix}/actions/runs/${record.runId}`);
    if (
        !Number.isSafeInteger(workflow?.id) ||
        workflow.id <= 0 ||
        workflow.path !== path ||
        workflow.name !== 'Release ngpel packages' ||
        workflow.state !== 'active' ||
        run?.id !== record.runId ||
        run.workflow_id !== workflow.id ||
        run.name !== workflow.name ||
        !canonical(run.repository) ||
        !canonical(run.head_repository) ||
        run.head_branch !== 'main' ||
        run.head_sha !== record.source ||
        !['push', 'workflow_dispatch'].includes(run.event) ||
        !(run.path === path || run.path?.startsWith(`${path}@`)) ||
        !Number.isSafeInteger(run.run_attempt) ||
        run.run_attempt <= 0
    ) {
        throw new Error('The release metadata is not associated with its canonical source run.');
    }
    const commit = await request('GET', `${prefix}/git/commits/${record.candidate}`);
    if (commit?.sha !== record.candidate || commit.parents?.length !== 1 || commit.parents[0]?.sha !== record.source || !sha.test(commit.tree?.sha ?? '')) {
        throw new Error('The prepared metadata commit does not have the original source as its sole parent.');
    }
    const comparison = await request('GET', `${prefix}/compare/${record.source}...${record.candidate}`);
    if (
        comparison?.behind_by !== 0 ||
        comparison.ahead_by !== 1 ||
        comparison.total_commits !== 1 ||
        comparison.merge_base_commit?.sha !== record.source ||
        !Array.isArray(comparison.files) ||
        comparison.files.length === 0 ||
        comparison.files.length >= 100 ||
        comparison.files.some(
            (file) =>
                typeof file?.filename !== 'string' ||
                !/^(?:CHANGELOG\.md|yarn\.lock|libs\/[a-z0-9-]+\/(?:package\.json|CHANGELOG\.md|README\.md))$/u.test(file.filename) ||
                !['modified', 'added'].includes(file.status) ||
                file.previous_filename !== undefined,
        )
    )
        throw new Error('The metadata candidate contains unexpected source changes.');
    let publicationSha;
    if (pull.state === 'closed') {
        if (pull.merged !== true || !sha.test(pull.merge_commit_sha ?? '')) {
            throw new Error('The release metadata pull request was closed without a verified merge.');
        }
        publicationSha = pull.merge_commit_sha;
        const merged = await request('GET', `${prefix}/git/commits/${publicationSha}`);
        if (
            merged?.sha !== publicationSha ||
            !Array.isArray(merged.parents) ||
            ![1, 2].includes(merged.parents.length) ||
            merged.parents[0]?.sha !== record.source ||
            (merged.parents.length === 2 && merged.parents[1]?.sha !== record.candidate) ||
            merged.tree?.sha !== commit.tree.sha
        ) {
            throw new Error('The actual metadata merge differs from the verified candidate tree or source.');
        }
    } else if (pull.merged !== false) {
        throw new Error('The metadata pull request has an inconsistent open state.');
    }
    return { record, run, publicationSha };
}
