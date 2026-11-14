// #region Imports

import type { Appearance, ElevationWeight, Variant } from '@pixel-brewery/mosaik-elements-foundation';

// #endregion

/**
 * Visual treatment applied by the shared widget shell.
 *
 * @public
 */
export interface IWidgetVisualConfig {
    // #region Properties

    /**
     * Mosaik card appearance used by the widget shell.
     *
     * @public
     * @readonly
     */
    readonly appearance?: Appearance;

    /** Mosaik elevation of the outer widget card. */
    readonly elevation?: ElevationWeight;

    /**
     * Mosaik variant used to derive widget shell theme variables.
     *
     * @public
     * @readonly
     */
    readonly variant?: Variant;

    /**
     * Header visibility for dense visual widgets.
     *
     * @public
     * @readonly
     */
    readonly header?: 'visible' | 'hidden';

    // #endregion
}
