/**
 * Requires effective pull-request protection and the real strict GitHub Actions gate.
 *
 * @param request - The bounded GitHub REST boundary.
 * @param repositoryPath - The canonical repository REST prefix.
 * @returns Whether the current default branch has the required enforced rules.
 * @internal
 */
export async function requireMergeProtection(request, repositoryPath) {
    const rules = await request('GET', `${repositoryPath}/rules/branches/main`);
    if (!Array.isArray(rules) || rules.length > 100) return false;
    return (
        rules.some((rule) => rule?.type === 'pull_request') &&
        rules.some(
            (rule) =>
                rule?.type === 'required_status_checks' &&
                rule.parameters?.strict_required_status_checks_policy === true &&
                Array.isArray(rule.parameters.required_status_checks) &&
                rule.parameters.required_status_checks.some((check) => check?.context === 'Lint, Typecheck, Test & Build' && check.integration_id === 15368),
        )
    );
}
