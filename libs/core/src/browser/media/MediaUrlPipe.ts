// #region Imports

import { inject, Pipe, type PipeTransform } from '@angular/core';
import { MediaUrlResolver } from './MediaUrlResolver';

// #endregion

/**
 * Resolves backend-owned media paths for template bindings: `[src]="user.avatarUrl | ngpMediaUrl"`.
 *
 * @public
 */
@Pipe({ name: 'ngpMediaUrl' })
export class MediaUrlPipe implements PipeTransform {
    // #region Fields

    private readonly _resolver: MediaUrlResolver = inject(MediaUrlResolver);

    // #endregion

    // #region Methods

    /**
     * Resolves `value` through the {@link MediaUrlResolver}.
     *
     * @public
     * @param value Media URL returned by an API or created locally for a preview.
     * @returns The resolved URL, or `''` for `null`/`undefined`.
     */
    public transform(value: null | string | undefined): string {
        return this._resolver.resolve(value);
    }

    // #endregion
}
