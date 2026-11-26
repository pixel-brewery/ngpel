// #region Imports
import { mergeVerifiedPullRequest } from '../../lib/github/mergeVerifiedPullRequest.mjs';
// #endregion

/**
 * Merges only a current, fully verified Dependabot revision through effective protection.
 * @param context - The trusted workflow-run identity.
 * @param dependencies - Optional bounded API boundary for offline verification.
 * @returns The verified merge or its explicit skipped reason.
 * @internal
 */
export async function mergeDependabotPullRequest(context, dependencies = {}) {
    return await mergeVerifiedPullRequest({ ...context, kind: 'dependabot' }, dependencies);
}
