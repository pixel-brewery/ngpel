// #region Imports

import { type FeatureKind, featureKind } from '@pixel-brewery/ngpel-core';
import type { UpdateFeatureKind } from './UpdateFeatureKind';

// #endregion

/**
 * Branded {@link UpdateFeatureKind} values for feature authors.
 *
 * @public
 */
export const UpdateKinds = {
    Source: featureKind<UpdateFeatureKind>('updateSource'),
    Strategy: featureKind<UpdateFeatureKind>('updateStrategy'),
} as const satisfies Record<string, FeatureKind<UpdateFeatureKind>>;
