/**
 * Defines the reviewed CI baseline and enforced native verification requirements.
 *
 * @internal
 */
export const verificationPolicy = Object.freeze({
    workflowFile: 'ci.yml',
    workflowPath: '.github/workflows/ci.yml',
    workflowName: 'CI',
    requiredJobs: ['Lint, Typecheck, Test & Build'],
    requiredChecks: ['Lint, Typecheck, Test & Build'],
    reviewedCiSha256: 'b0ad481a1f7bb573de337b9b84f015786b4ac5e4d0a608cf1323df6e74d1841b',
});
