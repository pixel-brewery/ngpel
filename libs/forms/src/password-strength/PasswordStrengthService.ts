// #region Imports

import type { IPasswordStrengthConfig } from './IPasswordStrengthConfig';
import type { PasswordScore } from './PasswordScore';

// #endregion

/**
 * Evaluates password strength against a configurable, regular-expression based policy. Register it
 * with {@link providePasswordStrength} or construct it directly for use without dependency injection.
 *
 * @public
 */
export class PasswordStrengthService {
    // #region Fields

    private readonly _config: IPasswordStrengthConfig;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `PasswordStrengthService` class.
     *
     * @public
     * @param config The policy defining minimum length, rules and thresholds.
     */
    public constructor(config: IPasswordStrengthConfig) {
        this._config = config;
    }

    // #endregion

    // #region Methods

    /**
     * Scores a password. Empty input is `Blank`, input below the minimum length is `VeryWeak`, and
     * otherwise the weighted share of matching rules is mapped through the configured thresholds.
     *
     * @public
     * @param password The password to evaluate (`null`, `undefined` and `''` count as blank).
     * @returns The strength level name.
     */
    public validate(password: string | null | undefined): PasswordScore {
        if (password === null || password === undefined || password.length === 0) {
            return 'Blank';
        }

        const { minLength, rules, thresholds } = this._config;

        if (minLength !== undefined && password.length < minLength) {
            return 'VeryWeak';
        }

        let score = 0;
        let maxScore = 0;

        for (const rule of rules) {
            maxScore += rule.weight;

            if (rule.regex.test(password)) {
                score += rule.weight;
            }
        }

        if (maxScore === 0) {
            return 'VeryWeak';
        }

        const normalized = score / maxScore;

        if (normalized >= thresholds.veryStrong) {
            return 'VeryStrong';
        }

        if (normalized >= thresholds.strong) {
            return 'Strong';
        }

        if (normalized >= thresholds.medium) {
            return 'Medium';
        }

        if (normalized >= thresholds.weak) {
            return 'Weak';
        }

        return 'VeryWeak';
    }

    // #endregion
}
