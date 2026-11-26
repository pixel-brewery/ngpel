// #region Imports
import { appendFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { requestDependabotGitHub } from '../../lib/github/requestDependabotGitHub.mjs';
import { requestMergedWorkflow } from '../../lib/github/requestMergedWorkflow.mjs';
import { resolveDependabotRepository } from '../../lib/github/resolveDependabotRepository.mjs';
import { classifyReleaseSource } from './classifyReleaseSource.mjs';
import { integrateReleaseCandidate } from './integrateReleaseCandidate.mjs';
import { reconcileReleaseMetadata } from './reconcileReleaseMetadata.mjs';
import { releaseCandidate } from './releaseCandidate.mjs';
import { resumeReleaseMetadata } from './resumeReleaseMetadata.mjs';
import { verifyReleaseMetadata } from './verifyReleaseMetadata.mjs';
// #endregion

/**
 * Runs the same Nx-owned release lifecycle from trusted default-branch native Node.
 *
 * @param mode - The schema-bound release operation.
 * @param options - Explicit artifact/source inputs from Nx or the trusted workflow environment.
 * @returns The credential-free verified workflow result.
 * @remarks This owner prepares and integrates metadata; package publication remains in its existing release-main job.
 * @internal
 */
export async function runReleaseAutomation(mode, options = {}) {
    const sourceSha = options.sourceSha ?? process.env.RELEASE_SOURCE_SHA ?? process.env.GITHUB_SHA;
    const directory = options.directory ?? process.env.RELEASE_ARTIFACT_DIRECTORY;
    const context = {
        eventName: process.env.GITHUB_EVENT_NAME,
        repository: process.env.GITHUB_REPOSITORY,
        repositoryId: process.env.GITHUB_REPOSITORY_ID,
        defaultBranch: process.env.DEFAULT_BRANCH ?? 'main',
        sourceSha,
        runId: Number(process.env.GITHUB_RUN_ID),
    };
    if (!(await resolveDependabotRepository(context, requestDependabotGitHub))) throw new Error('Unsupported release repository.');
    let result;
    switch (mode) {
        case 'classify':
            if (process.env.EXPECTED_SOURCE_SHA && process.env.EXPECTED_SOURCE_SHA !== sourceSha) throw new Error('The requested release source changed.');
            result = await classifyReleaseSource(context, requestDependabotGitHub);
            break;
        case 'prepare':
            result = releaseCandidate('prepare', directory, sourceSha);
            break;
        case 'verify': {
            const candidate = releaseCandidate('verify', directory, sourceSha);
            const publicationSha = process.env.PUBLICATION_SHA;
            if (!publicationSha) {
                result = candidate;
                break;
            }
            if (!/^[a-f0-9]{40}$/u.test(publicationSha)) throw new Error('Invalid publication revision.');
            const prefix = 'repos/pixel-brewery/ngpel';
            const associations = await requestDependabotGitHub('GET', `${prefix}/commits/${publicationSha}/pulls?per_page=100`);
            if (!Array.isArray(associations) || associations.length >= 100) throw new Error('Incomplete publication association.');
            const matches = associations.filter(
                (pull) => pull.head?.sha === candidate.commit && pull.user?.id === 41898282 && pull.head.ref === `release/ngpel/${sourceSha}`,
            );
            if (matches.length !== 1 || !Number.isSafeInteger(matches[0]?.number)) throw new Error('Ambiguous publication association.');
            const proof = await verifyReleaseMetadata(await requestDependabotGitHub('GET', `${prefix}/pulls/${matches[0].number}`), requestDependabotGitHub);
            const main = await requestDependabotGitHub('GET', `${prefix}/branches/main`);
            if (
                proof.publicationSha !== publicationSha ||
                proof.record.source !== sourceSha ||
                proof.record.candidate !== candidate.commit ||
                proof.record.version !== candidate.version ||
                proof.record.runId !== context.runId ||
                main?.name !== 'main' ||
                main.commit?.sha !== publicationSha
            ) {
                throw new Error('Publication does not match the original verified artifact and current main.');
            }
            result = { ...candidate, candidate: candidate.commit, commit: publicationSha };
            break;
        }
        case 'integrate':
            result = await integrateReleaseCandidate(context, {
                request: requestDependabotGitHub,
                candidate: releaseCandidate('verify', directory, sourceSha),
            });
            if (result.status === 'integrated') {
                const publicationContext = { ...context, eventName: 'workflow_run', sourceSha: result.publicationSha };
                result.verification = await requestMergedWorkflow(publicationContext);
                result.documentation = await requestMergedWorkflow({ ...publicationContext, workflow: 'documentation' });
            }
            break;
        case 'recover':
            result = { status: 'reconciled', results: await reconcileReleaseMetadata(context, requestDependabotGitHub) };
            break;
        case 'resume':
            result = await resumeReleaseMetadata(
                { ...context, runId: process.env.WORKFLOW_RUN_ID, runAttempt: process.env.WORKFLOW_RUN_ATTEMPT },
                requestDependabotGitHub,
            );
            break;
        default:
            throw new Error('Unsupported release workflow operation.');
    }
    if (process.env.GITHUB_OUTPUT) {
        for (const [key, value] of Object.entries(result)) {
            if (['string', 'number', 'boolean'].includes(typeof value) && !/[\r\n]/u.test(String(value)))
                appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${String(value)}\n`, 'utf8');
        }
    }
    process.stdout.write(`${JSON.stringify(result)}\n`);
    return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
    try {
        if (process.argv.length !== 2) throw new Error('Unexpected release workflow arguments.');
        await runReleaseAutomation(process.env.RELEASE_MODE);
    } catch {
        process.stderr.write('Release automation stopped; inspect the original source run and metadata PR.\n');
        process.exitCode = 1;
    }
}
