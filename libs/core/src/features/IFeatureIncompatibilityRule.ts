// #region Imports

import type { IFeature } from './IFeature';

// #endregion

/**
 * Describes an incompatibility rule between features.
 * If `isViolated()` returns true, composition must fail fast with `message`.
 *
 * @typeParam TKind Kind union used across your system.
 * @public
 */
export interface IFeatureIncompatibilityRule<TKind extends string> {
    // #region Properties

    /**
     * Stable identifier of the rule, used in the thrown error message.
     */
    readonly id: string;

    /**
     * Human-readable explanation of the incompatibility.
     */
    readonly message: string;

    // #endregion

    // #region Methods

    /**
     * Evaluates the rule against the complete feature set.
     */
    isViolated(features: ReadonlyArray<IFeature<TKind>>): boolean;

    // #endregion
}
