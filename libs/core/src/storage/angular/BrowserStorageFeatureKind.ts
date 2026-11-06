// #region Imports

import { type FeatureKind, featureKind } from '@pixel-brewery/ngpel-core';

// #endregion

/**
 * The feature kinds accepted by `provideBrowserStorage()`.
 *
 * @public
 */
export type BrowserStorageFeatureKind = 'storage';

/**
 * Branded feature kinds of `provideBrowserStorage()`. Co-located with the type because both
 * describe the same vocabulary.
 *
 * @public
 */
export const BrowserStorageFeatureKinds = {
    Storage: featureKind<BrowserStorageFeatureKind>('storage'),
} as const satisfies Record<string, FeatureKind<BrowserStorageFeatureKind>>;
