// #region Imports

import { featureKind, type FeatureKind } from '@pixel-brewery/ngpel-core';
import type { TourFeatureKind } from './TourFeatureKind';

// #endregion

/**
 * Branded feature kinds supported by the root tour composition.
 *
 * @public
 * @readonly
 */
export const TourFeatureKinds = {
    Definition: featureKind<TourFeatureKind>('tour-definition'),
} as const satisfies Record<string, FeatureKind<TourFeatureKind>>;
