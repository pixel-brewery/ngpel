// #region Imports

import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import type { IMediaUrlOptions } from './IMediaUrlOptions';
import { MEDIA_URL_OPTIONS } from './MEDIA_URL_OPTIONS';
import { resolveMediaUrl } from './resolveMediaUrl';

// #endregion

/**
 * Resolves backend-owned relative media paths against the configured API origin. Available in
 * the root injector without configuration (pass-through), and re-registered by
 * `provideMediaUrls(...)` so a route-level composition gets its own scoped instance.
 *
 * @public
 */
@Injectable({ providedIn: 'root' })
export class MediaUrlResolver {
    // #region Fields

    private readonly _injector: Injector = inject(Injector);
    private readonly _options: IMediaUrlOptions | null = inject(MEDIA_URL_OPTIONS, { optional: true });

    // #endregion

    // #region Methods

    /**
     * Resolves a root-relative backend media URL while preserving browser-local and absolute URLs.
     *
     * @public
     * @param url Media URL returned by an API or created locally for a preview.
     * @returns The resolved URL, or `''` for `null`/`undefined`.
     */
    public resolve(url: null | string | undefined): string {
        return resolveMediaUrl(this.readOrigin(), url);
    }

    private readOrigin(): string {
        const origin = this._options?.origin ?? '';

        return typeof origin === 'function' ? runInInjectionContext(this._injector, origin) : origin;
    }

    // #endregion
}
