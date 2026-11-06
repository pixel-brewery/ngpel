// #region Imports

import { InjectionToken } from '@angular/core';
import type { IMediaUrlOptions } from './IMediaUrlOptions';

// #endregion

/**
 * Injection token carrying the {@link IMediaUrlOptions}. Registered by `withApiOrigin(...)`
 * through `provideMediaUrls(...)`; when absent, media paths are passed through unchanged.
 *
 * @public
 */
export const MEDIA_URL_OPTIONS = new InjectionToken<IMediaUrlOptions>('NGPEL_MEDIA_URL_OPTIONS');
