// #region Imports

import { DOCUMENT, inject, Injectable } from '@angular/core';
import type { IFileDownloader } from './IFileDownloader';

// #endregion

/**
 * Default {@link IFileDownloader} adapter: a temporary object URL on a detached anchor whose
 * `download` attribute carries the file name, so the browser never derives a suggestion from the
 * object URL. The URL is revoked in a `finally` block, even when the click throws.
 *
 * @public
 */
@Injectable()
export class FileDownloadService implements IFileDownloader {
    // #region Fields

    private readonly _document: Document = inject(DOCUMENT);

    // #endregion

    // #region Methods

    /**
     * Downloads one blob under the supplied name. Does nothing outside a browser window.
     *
     * @public
     * @param blob Content to save.
     * @param fileName Name suggested to the browser, including its extension.
     */
    public downloadBlobAs(blob: Blob, fileName: string): void {
        const view = this._document.defaultView;
        if (!view) {
            return;
        }

        const url = view.URL.createObjectURL(blob);
        try {
            const anchor = this._document.createElement('a');
            anchor.href = url;
            anchor.download = fileName;
            anchor.rel = 'noopener';
            anchor.click();
        } finally {
            view.URL.revokeObjectURL(url);
        }
    }

    // #endregion
}
