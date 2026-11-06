import { InjectionToken } from '@angular/core';
import type { IPdfPreviewOptions } from './IPdfPreviewOptions';

/** Host-provided PDF.js settings. @internal */
export const PDF_PREVIEW_OPTIONS = new InjectionToken<IPdfPreviewOptions>('NGP_PDF_PREVIEW_OPTIONS');
