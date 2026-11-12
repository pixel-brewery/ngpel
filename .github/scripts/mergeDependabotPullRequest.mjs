import { execFileSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repository = 'repos/pixel-brewery/ngpel';
const repositoryId = 1447827206;
const workflowPath = '.github/workflows/ci.yml';
const sha = /^[0-9a-f]{40}$/u;

function request(path, body) {
    const args = ['api', `${repository}/${path}`];
    if (body) args.push('--method', 'PUT', '--input', '-');
    return JSON.parse(execFileSync('gh', args, { encoding: 'utf8', input: body && JSON.stringify(body), timeout: 20_000 }));
}

function eligibleRun(run, expected, workflowId) {
    return (
        run.id === expected.id &&
        run.run_attempt === expected.run_attempt &&
        run.workflow_id === workflowId &&
        run.event === 'pull_request' &&
        run.status === 'completed' &&
        run.conclusion === 'success' &&
        run.repository?.id === repositoryId &&
        run.head_repository?.id === repositoryId &&
        run.head_sha === expected.head_sha &&
        (run.path === workflowPath || run.path?.startsWith(`${workflowPath}@`)) &&
        run.pull_requests?.length === 1 &&
        run.pull_requests[0].number === expected.pull_requests[0].number
    );
}

function eligiblePullRequest(pr, number, head) {
    return (
        pr.number === number &&
        pr.state === 'open' &&
        pr.draft === false &&
        pr.user?.login === 'dependabot[bot]' &&
        pr.user?.type === 'Bot' &&
        pr.base?.repo?.id === repositoryId &&
        pr.base.ref === 'main' &&
        pr.head?.repo?.id === repositoryId &&
        pr.head.sha === head
    );
}

/** Merge a Dependabot PR only when the current head and CI attempt match the event. */
export function mergeDependabotPullRequest(event, api = request) {
    const expected = event.workflow_run;
    const number = expected?.pull_requests?.[0]?.number;
    if (
        event.repository?.id !== repositoryId ||
        event.repository.private !== false ||
        event.repository.default_branch !== 'main' ||
        !Number.isSafeInteger(expected?.id) ||
        !Number.isSafeInteger(expected?.run_attempt) ||
        expected.pull_requests?.length !== 1 ||
        !Number.isSafeInteger(number) ||
        !sha.test(expected.head_sha)
    ) {
        return { status: 'unsupported-event' };
    }

    const workflow = api('actions/workflows/ci.yml');
    const runPath = `actions/runs/${expected.id}`;
    const run = api(runPath);
    if (workflow.path !== workflowPath || workflow.name !== 'CI' || !eligibleRun(run, expected, workflow.id)) {
        return { status: 'ineligible-workflow-run' };
    }

    const prPath = `pulls/${number}`;
    if (!eligiblePullRequest(api(prPath), number, run.head_sha)) return { status: 'ineligible-pull-request' };
    const { total_count: total, jobs } = api(`${runPath}/attempts/${run.run_attempt}/jobs`);
    const [job] = jobs ?? [];
    if (
        total !== 1 ||
        jobs?.length !== 1 ||
        job.name !== 'Lint, Typecheck, Test & Build' ||
        job.run_id !== run.id ||
        (job.run_attempt !== undefined && job.run_attempt !== run.run_attempt) ||
        job.status !== 'completed' ||
        job.conclusion !== 'success'
    ) {
        return { status: 'incomplete-verification' };
    }

    const mainPath = 'git/ref/heads/main';
    const main = api(mainPath).object?.sha;
    if (!sha.test(main)) return { status: 'invalid-main' };
    const comparison = api(`compare/${main}...${run.head_sha}`);
    if (comparison.behind_by !== 0 || comparison.merge_base_commit?.sha !== main) {
        return { status: 'branch-not-current' };
    }

    if (!eligibleRun(api(runPath), expected, workflow.id) || api(mainPath).object?.sha !== main) {
        return { status: 'verification-changed' };
    }

    const merged = api(`${prPath}/merge`, { sha: run.head_sha, merge_method: 'squash' });
    if (merged.merged !== true || !sha.test(merged.sha)) throw new Error('GitHub did not confirm the Dependabot merge.');
    return { status: 'merged', sha: merged.sha };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
    const result = mergeDependabotPullRequest(event);
    process.stdout.write(`${JSON.stringify(result)}\n`);
    if (result.status === 'merged') appendFileSync(process.env.GITHUB_OUTPUT, `merge_sha=${result.sha}\n`);
}
