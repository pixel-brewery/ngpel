// #region Imports

import type { ITourContributionStep } from './ITourContributionStep';

// #endregion

/**
 * Describes a feature-owned set of steps that can be composed into a larger tour.
 *
 * @public
 */
export interface ITourContribution {
    /**
     * Stable identifier within the composed tour.
     *
     * @public
     * @readonly
     */
    readonly id: string;

    /**
     * Ordered steps contributed by the feature.
     *
     * @public
     * @readonly
     */
    readonly steps: ReadonlyArray<ITourContributionStep>;
}
