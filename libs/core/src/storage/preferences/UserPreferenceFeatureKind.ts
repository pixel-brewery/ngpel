// #region Imports

import { type FeatureKind, featureKind } from '@pixel-brewery/ngpel-core';

// #endregion

/**
 * The feature kinds accepted by `provideUserPreferences()`.
 *
 * @public
 */
export type UserPreferenceFeatureKind = 'storage';

/**
 * Branded feature kinds of `provideUserPreferences()`. Co-located with the type because both
 * describe the same vocabulary.
 *
 * @public
 */
export const UserPreferenceFeatureKinds = {
    Storage: featureKind<UserPreferenceFeatureKind>('storage'),
} as const satisfies Record<string, FeatureKind<UserPreferenceFeatureKind>>;
