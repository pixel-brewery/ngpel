/**
 * Defines the reviewed CI baseline and enforced native verification requirements.
 *
 * @internal
 */
export const verificationPolicy = Object.freeze({
    workflowFile: 'ci.yml',
    workflowPath: '.github/workflows/ci.yml',
    workflowName: 'CI',
    releaseWorkflowName: 'Release ngpel packages',
    requiredJobs: ['Lint, Typecheck, Test & Build'],
    requiredChecks: ['Lint, Typecheck, Test & Build'],
    reviewedCiSha256: '5f278e8f930aad6b7deed16b645312aab14efe7c5becf360dba596f088acb652',
});
