// #region Imports
import { expect, test } from 'vitest';
import { requireMergeProtection } from './requireMergeProtection.mjs';
// #endregion

for (const scenario of ['protected', 'missing-pr', 'missing-check', 'non-strict', 'foreign-integration', 'malformed']) {
    test(`requires effective real PR and strict CI protection: ${scenario}`, async () => {
        // Arrange
        const rules = [
            { type: 'pull_request' },
            {
                type: 'required_status_checks',
                parameters: {
                    strict_required_status_checks_policy: true,
                    required_status_checks: [{ context: 'Lint, Typecheck, Test & Build', integration_id: 15368 }],
                },
            },
        ];
        if (scenario === 'missing-pr') rules.shift();
        if (scenario === 'missing-check') rules.pop();
        if (scenario === 'non-strict') rules[1].parameters.strict_required_status_checks_policy = false;
        if (scenario === 'foreign-integration') rules[1].parameters.required_status_checks[0].integration_id = 1;
        const request = async () => (scenario === 'malformed' ? {} : rules);
        // Act
        const result = await requireMergeProtection(request, 'repos/pixel-brewery/ngpel');
        // Assert
        expect(result).toBe(scenario === 'protected');
    });
}
