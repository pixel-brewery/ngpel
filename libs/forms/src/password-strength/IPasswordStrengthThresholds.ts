/**
 * Lower bounds of the normalized score (`0..1`) for each strength level above `Blank`. A score
 * reaching `veryStrong` maps to `VeryStrong`, a score reaching `strong` to `Strong`, and so on;
 * anything below `weak` is `VeryWeak`.
 *
 * @public
 */
export interface IPasswordStrengthThresholds {
    // #region Properties

    /** Lower bound of `VeryWeak`; informational, every non-blank password is at least very weak. */
    readonly veryWeak: number;

    /** Lower bound of `Weak`. */
    readonly weak: number;

    /** Lower bound of `Medium`. */
    readonly medium: number;

    /** Lower bound of `Strong`. */
    readonly strong: number;

    /** Lower bound of `VeryStrong`. */
    readonly veryStrong: number;

    // #endregion
}
