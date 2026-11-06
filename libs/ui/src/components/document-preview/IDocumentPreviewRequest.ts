// #region Imports

import type { Observable } from 'rxjs';
import type { DocumentPreviewMimeType } from './DocumentPreviewMimeType';

// #endregion

/**
 * Captures one document and the caller-owned operation that loads its bytes.
 * Authentication, document identity and permission checks remain with the caller.
 *
 * @public
 */
export interface IDocumentPreviewRequest {
    /** File name displayed when no separate title or description is supplied. */
    readonly fileName: string;

    /** Optional document heading supplied by the owning feature. */
    readonly title?: string;

    /** Optional explanatory context supplied by the owning feature. */
    readonly description?: string;

    /** Exact supported media type expected from the loader. */
    readonly mimeType: DocumentPreviewMimeType;

    /** Loads the same captured document for the initial attempt and every retry. */
    readonly load: () => Observable<Blob>;

    /** Notifies the caller when validated bytes become available for download. */
    readonly onLoaded?: (blob: Blob) => void;

    /** Notifies the caller once after an image loads or the managed PDF viewer paints its first page. */
    readonly onRendered?: (blob: Blob) => void;
}
