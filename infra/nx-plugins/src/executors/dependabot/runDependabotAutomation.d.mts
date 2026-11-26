/**
 * Runs the trusted, noncached dependency workflow operation.
 * @param mode - The schema-bound external operation.
 * @returns The credential-free operation outcome.
 * @internal
 */
export function runDependabotAutomation(mode: 'merge' | 'reconcile' | 'continue'): Promise<unknown>;
