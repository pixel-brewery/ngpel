// #region Imports

import { DOCUMENT, inject, Injectable } from '@angular/core';
import type { IExternalLinkOpener } from './IExternalLinkOpener';

// #endregion

/**
 * Default {@link IExternalLinkOpener} adapter: `window.open(url, '_blank', 'noopener,noreferrer')`
 * on the injected `DOCUMENT`'s window. The call shape is deliberately fixed and the return value
 * ignored — desktop shells intercept exactly this window-open request to hand the URL to the OS
 * browser, and a fallback to in-app navigation would drive such a shell off-app.
 *
 * @public
 */
@Injectable()
export class ExternalLinkService implements IExternalLinkOpener {
    // #region Fields

    private readonly _document: Document = inject(DOCUMENT);

    // #endregion

    // #region Methods

    /**
     * Opens `url` in a new, isolated browsing context.
     *
     * @public
     * @param url The absolute URL to open; empty or `undefined` values are ignored.
     */
    public open(url: string | undefined): void {
        if (!url) {
            return;
        }

        this._document.defaultView?.open(url, '_blank', 'noopener,noreferrer');
    }

    // #endregion
}
