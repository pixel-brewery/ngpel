// #region Imports

import { featureKind } from '@pixel-brewery/ngpel-core';

// #endregion

/** Feature kind for contextual create actions. */
export type QuickCreateFeatureKind = 'quick-create-items';

/** The feature kind contributed by each feature's action registrations. */
export const quickCreateKind = featureKind<QuickCreateFeatureKind>('quick-create-items');
