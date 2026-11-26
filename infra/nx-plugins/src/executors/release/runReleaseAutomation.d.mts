/**
 * Runs the trusted release lifecycle through its native implementation boundary.
 *
 * @param mode - The schema-selected lifecycle operation.
 * @param options - Explicit artifact location and immutable source revision.
 * @returns The credential-free completed workflow outcome.
 * @internal
 */
export function runReleaseAutomation(
    mode: 'classify' | 'prepare' | 'verify' | 'integrate' | 'resume' | 'recover',
    options?: { readonly directory?: string; readonly sourceSha?: string },
): Promise<unknown>;
