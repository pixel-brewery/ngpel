/**
 * One regular-expression rule contributing to the password strength score.
 *
 * @public
 */
export interface IPasswordStrengthRule {
    // #region Properties

    /** Pattern the password must match for the rule to count (digits, upper-case letters, symbols, ...). */
    readonly regex: RegExp;

    /** Weight of the rule in the normalized score; must be zero or positive. */
    readonly weight: number;

    // #endregion
}
