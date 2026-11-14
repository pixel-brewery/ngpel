import type { Provider } from '@angular/core';
import type { IPdfPreviewOptions } from './IPdfPreviewOptions';
import { PDF_PREVIEW_OPTIONS } from './PDF_PREVIEW_OPTIONS';

/**
 * Enables lazy PDF.js rendering for document previews opened by the host application.
 *
 * @param options - SDK loader and asset URLs, or a factory that resolves them in the application injector.
 * @returns Angular provider for document preview.
 * @public
 */
export function providePdfPreview(options: IPdfPreviewOptions | (() => IPdfPreviewOptions)): Provider {
    return {
        provide: PDF_PREVIEW_OPTIONS,
        useFactory: () => ({ ...(typeof options === 'function' ? options() : options) }),
    };
}
