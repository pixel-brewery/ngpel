// #region Imports

import { type FeatureKind, featureKind } from '@pixel-brewery/ngpel-core';

// #endregion

/**
 * The kinds of features `provideMediaUrls(...)` accepts. The origin kind is non-multi: exactly
 * one origin source may be registered per composition.
 *
 * @public
 */
export type MediaUrlFeatureKind = 'origin';

/**
 * The branded kind vocabulary of the media entry point, exposed so products can contribute their
 * own origin features (for example a tenant-aware origin) that still conflict with `withApiOrigin()`.
 *
 * @public
 */
export const MediaUrlFeatureKinds = {
    Origin: featureKind<MediaUrlFeatureKind>('origin'),
} as const satisfies Record<string, FeatureKind<MediaUrlFeatureKind>>;
