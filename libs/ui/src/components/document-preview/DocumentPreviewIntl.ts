// #region Imports

import { Injectable } from '@angular/core';

// #endregion

/**
 * Generic preview feedback; document names and business context come from the caller.
 *
 * @public
 */
@Injectable({ providedIn: 'root' })
export class DocumentPreviewIntl {
    public close = 'Close document preview';
    public download = 'Download document';
    public loading = 'Loading document…';
    public loadError = 'The document could not be loaded.';
    public rendering = 'Displaying document…';
    public renderError = 'The document could not be displayed.';
    public retry = 'Try again';
}
