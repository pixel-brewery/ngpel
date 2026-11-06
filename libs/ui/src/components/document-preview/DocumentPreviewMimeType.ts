import type { DOCUMENT_PREVIEW_MIME_TYPES } from './DOCUMENT_PREVIEW_MIME_TYPES';

/**
 * Media type required from a document loader before its content can be rendered.
 *
 * @public
 */
export type DocumentPreviewMimeType = (typeof DOCUMENT_PREVIEW_MIME_TYPES)[number];
