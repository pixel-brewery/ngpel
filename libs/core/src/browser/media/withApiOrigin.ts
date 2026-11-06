// #region Imports

import { createFeature, type IFeature } from '@pixel-brewery/ngpel-core';
import type { IMediaUrlOptions } from './IMediaUrlOptions';
import { MEDIA_URL_OPTIONS } from './MEDIA_URL_OPTIONS';
import { type MediaUrlFeatureKind, MediaUrlFeatureKinds } from './MediaUrlFeatureKind';

// #endregion

/**
 * Contributes the API origin root-relative media paths are resolved against.
 *
 * @public
 * @param origin The origin as a value (`'https://api.example.com'`) or as an accessor evaluated
 * on every resolution inside an injection context (`() => inject(ENV)['API_URL'] ?? ''`).
 * @returns A feature for `provideMediaUrls(...)`.
 */
export function withApiOrigin(origin: string | (() => string)): IFeature<MediaUrlFeatureKind> {
    const options: IMediaUrlOptions = { origin };

    return createFeature('api-origin', MediaUrlFeatureKinds.Origin, [{ provide: MEDIA_URL_OPTIONS, useValue: options }]);
}
