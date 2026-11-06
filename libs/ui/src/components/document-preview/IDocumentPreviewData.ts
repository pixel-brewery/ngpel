// #region Imports

import type { IDocumentPreviewRequest } from './IDocumentPreviewRequest';
import type { DocumentPreviewState } from './DocumentPreviewState';
import type { IPdfPreviewOptions } from './IPdfPreviewOptions';

// #endregion

/**
 * Immutable request and state owned by one document drawer.
 *
 * @internal
 */
export interface IDocumentPreviewData extends IDocumentPreviewRequest {
    readonly state: DocumentPreviewState;
    readonly pdfOptions: IPdfPreviewOptions | null;
}
