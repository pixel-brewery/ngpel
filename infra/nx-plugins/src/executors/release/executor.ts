// #region Imports
import type { IReleaseExecutorOptions } from './interfaces/IReleaseExecutorOptions';
// #endregion

/**
 * Adapts the Nx schema to the repository's source-bound release lifecycle.
 *
 * @param options - The validated release operation and optional explicit inputs.
 * @returns Completion after the entire owned operation succeeds.
 * @internal
 */
export default async function executor(options: IReleaseExecutorOptions): Promise<{ success: boolean }> {
    const { runReleaseAutomation } = await import('./runReleaseAutomation.mjs');
    await runReleaseAutomation(options.mode, { directory: options.artifactDirectory, sourceSha: options.sourceSha });
    return { success: true };
}
