/**
 * Browser-renderable document media types accepted by the shared preview.
 * Active HTML and SVG documents are deliberately excluded.
 *
 * @public
 */
export const DOCUMENT_PREVIEW_MIME_TYPES = Object.freeze(['application/pdf', 'image/png', 'image/jpeg', 'image/gif', 'image/webp'] as const);
