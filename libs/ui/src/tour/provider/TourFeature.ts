// #region Imports

import type { IFeature } from '@pixel-brewery/ngpel-core';
import type { TourFeatureKind } from './TourFeatureKind';

// #endregion

/**
 * Composable contribution to the shared tour runtime.
 *
 * @public
 */
export type TourFeature = IFeature<TourFeatureKind>;
