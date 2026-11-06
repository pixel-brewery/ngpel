// #region Imports

import type { ITourStep } from '@pixel-brewery/mosaik-elements-foundation';
import type { TourContributionText } from './TourContributionText';

// #endregion

/**
 * Describes one feature-owned step before its final tour anchor is namespaced.
 *
 * @public
 */
export interface ITourContributionStep extends Omit<ITourStep, 'id' | 'anchorId' | 'title' | 'content'> {
    /**
     * Stable identifier within the contribution.
     *
     * @public
     * @readonly
     */
    readonly id: string;

    /**
     * Target key exposed by the contributing tour accessor.
     *
     * @public
     * @readonly
     */
    readonly target: string;

    /**
     * Localized title or a signal that tracks the active language.
     *
     * @public
     * @readonly
     */
    readonly title: TourContributionText;

    /**
     * Localized content or a signal that tracks the active language.
     *
     * @public
     * @readonly
     */
    readonly content: TourContributionText;
}
