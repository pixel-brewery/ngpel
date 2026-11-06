// #region Imports

import type { Provider } from '@angular/core';
import type { FeatureKind } from './FeatureKind';
import type { IFeatureOptions } from './IFeatureOptions';

// #endregion

/**
 * A generic, DI-provider contributing feature.
 *
 * @typeParam TKind String literal type restricting the feature kind space (e.g. 'transcriber' | 'telemetry').
 * @public
 */
export interface IFeature<TKind extends string> {
    // #region Properties

    /**
     * Stable unique identifier **within** its kind.
     */
    readonly id: string;

    /**
     * The functional category this feature belongs to.
     */
    readonly kind: FeatureKind<TKind>;

    /**
     * Composition options (e.g. multi).
     */
    readonly options: Readonly<IFeatureOptions>;

    // #endregion

    // #region Methods

    /**
     * Contributes providers for composition.
     */
    provide(): ReadonlyArray<Provider>;

    // #endregion
}
