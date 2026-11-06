// #region Imports

import type { TourDefinitionSource } from '@pixel-brewery/mosaik-elements-angular';

// #endregion

/**
 * Options for contributing one or more native Mosaik tour definitions.
 *
 * @public
 */
export interface IWithTourDefinitionsOptions {
    /**
     * Stable identifier of the feature-owned tour contribution.
     *
     * @public
     * @readonly
     */
    readonly id: string;

    /**
     * Static or injectable tour definitions owned by the feature.
     *
     * @public
     * @readonly
     */
    readonly definitions: ReadonlyArray<TourDefinitionSource>;
}
