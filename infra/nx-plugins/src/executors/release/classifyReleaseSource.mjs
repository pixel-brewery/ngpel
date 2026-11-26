// #region Imports
import { resolveDependabotRepository } from '../../lib/github/resolveDependabotRepository.mjs';
import { verifyReleaseMetadata } from './verifyReleaseMetadata.mjs';
// #endregion

/**
 * Prevents a human metadata merge from recursively preparing another patch release.
 *
 * @param context - The trusted main push or source-bound dispatch.
 * @param request - The bounded GitHub REST boundary.
 * @returns Whether this source requires one new immutable candidate.
 * @internal
 */
export async function classifyReleaseSource(context, request) {
    if (
        !['push', 'workflow_dispatch'].includes(context?.eventName) ||
        !/^[a-f0-9]{40}$/u.test(context?.sourceSha ?? '') ||
        !(await resolveDependabotRepository(context, request))
    )
        throw new Error('Unsupported release source.');
    const prefix = 'repos/pixel-brewery/ngpel';
    const main = await request('GET', `${prefix}/branches/main`);
    if (main?.name !== 'main' || main.commit?.sha !== context.sourceSha) throw new Error('The selected release source is no longer current main.');
    const candidates = await request('GET', `${prefix}/commits/${context.sourceSha}/pulls?per_page=100`);
    if (!Array.isArray(candidates) || candidates.length >= 100) throw new Error('The release source association is incomplete.');
    const metadata = candidates.filter(
        (pull) =>
            pull?.user?.id === 41898282 &&
            pull.user.login === 'github-actions[bot]' &&
            pull.head?.ref?.startsWith('release/ngpel/') &&
            pull.base?.ref === 'main' &&
            pull.base?.repo?.id === 1447827206 &&
            pull.head?.repo?.id === 1447827206,
    );
    if (metadata.length === 0) return { releaseRequired: true };
    if (metadata.length !== 1 || !Number.isSafeInteger(metadata[0]?.number)) throw new Error('The release metadata association is ambiguous.');
    const pull = await request('GET', `${prefix}/pulls/${metadata[0].number}`);
    const verified = await verifyReleaseMetadata(pull, request);
    if (verified.publicationSha !== context.sourceSha) throw new Error('The metadata merge does not match the selected main source.');
    return { releaseRequired: false, publicationSha: verified.publicationSha, originalRunId: verified.record.runId };
}
