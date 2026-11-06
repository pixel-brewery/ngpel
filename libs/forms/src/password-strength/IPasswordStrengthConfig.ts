// #region Imports

import type { IPasswordStrengthRule } from './IPasswordStrengthRule';
import type { IPasswordStrengthThresholds } from './IPasswordStrengthThresholds';

// #endregion

/**
 * Password strength policy: an optional minimum length, weighted regular-expression rules and the
 * thresholds mapping the normalized score to a {@link PasswordScore}. The policy is plain data owned
 * by the application; the library ships no default.
 *
 * @public
 */
export interface IPasswordStrengthConfig {
    // #region Properties

    /** Minimum password length; shorter passwords are `VeryWeak` regardless of the rules. */
    readonly minLength?: number;

    /** Weighted rules evaluated against the password. */
    readonly rules: ReadonlyArray<IPasswordStrengthRule>;

    /** Normalized-score thresholds per strength level. */
    readonly thresholds: IPasswordStrengthThresholds;

    // #endregion
}
