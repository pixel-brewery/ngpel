import type { Provider } from '@angular/core';
import type { IPdfPreviewOptions } from './IPdfPreviewOptions';
import { PDF_PREVIEW_OPTIONS } from './PDF_PREVIEW_OPTIONS';

/**
 * Enables lazy PDF.js rendering for document previews opened by the host application.
 *
 * @param options - SDK loader and URLs for the host's matching worker and assets.
 * @returns Angular provider for document preview.
 * @public
 */
export function providePdfPreview(options: IPdfPreviewOptions): Provider {
    return { provide: PDF_PREVIEW_OPTIONS, useValue: { ...options } };
}
