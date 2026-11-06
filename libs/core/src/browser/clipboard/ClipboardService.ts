// #region Imports

import { DOCUMENT, inject, Injectable } from '@angular/core';
import type { IClipboard } from './IClipboard';

// #endregion

/**
 * Default {@link IClipboard} adapter over the asynchronous Clipboard API. The platform is reached
 * through the injected `DOCUMENT` only, so the adapter stays free of module globals, can be faked
 * in a `TestBed` and does nothing outside a browser window.
 *
 * @public
 */
@Injectable()
export class ClipboardService implements IClipboard {
    // #region Fields

    private readonly _document: Document = inject(DOCUMENT);

    // #endregion

    // #region Methods

    /**
     * Writes `text` to the system clipboard.
     *
     * @public
     * @param text The text to copy; empty or `undefined` values copy nothing.
     * @returns `true` when the text was written, otherwise `false`.
     */
    public async writeText(text: string | undefined): Promise<boolean> {
        if (!text) {
            return false;
        }

        const clipboard = this._document.defaultView?.navigator?.clipboard;
        if (!clipboard) {
            return false;
        }

        try {
            await clipboard.writeText(text);

            return true;
        } catch {
            return false;
        }
    }

    // #endregion
}
