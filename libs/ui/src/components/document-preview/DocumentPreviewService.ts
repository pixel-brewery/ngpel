// #region Imports

import { DOCUMENT, inject, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DrawerService } from '@pixel-brewery/mosaik-elements-angular';
import { finalize, take } from 'rxjs';
import { DocumentPreviewDrawerComponent } from './DocumentPreviewDrawerComponent';
import { DocumentPreviewState } from './DocumentPreviewState';
import type { IDocumentPreviewData } from './IDocumentPreviewData';
import type { IDocumentPreviewRef } from './IDocumentPreviewRef';
import type { IDocumentPreviewRequest } from './IDocumentPreviewRequest';
import { PDF_PREVIEW_OPTIONS } from './PDF_PREVIEW_OPTIONS';

// #endregion

/**
 * Opens a document in its own drawer without navigating or replacing the caller.
 *
 * @public
 */
@Injectable({ providedIn: 'root' })
export class DocumentPreviewService {
    // #region Fields

    private readonly _drawerService = inject(DrawerService);
    private readonly _document = inject(DOCUMENT);
    private readonly _sanitizer = inject(DomSanitizer);
    private readonly _pdfOptions = inject(PDF_PREVIEW_OPTIONS, { optional: true });

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties
    // #endregion

    // #region Methods

    /**
     * Captures the document loader and owns it until the nested drawer closes.
     *
     * @param request - Caller-owned identity, content loader and optional success notification.
     * @returns The existing Mosaik drawer reference for observation and dismissal.
     * @public
     */
    public open(request: IDocumentPreviewRequest): IDocumentPreviewRef {
        const captured = { ...request };
        const pdfOptions = captured.mimeType === 'application/pdf' ? this._pdfOptions : null;
        const state = new DocumentPreviewState(captured, this._sanitizer, this._document.defaultView?.URL, pdfOptions !== null);
        const data: IDocumentPreviewData = { ...captured, state, pdfOptions };

        try {
            const ref = this._drawerService.show<IDocumentPreviewData, void>(DocumentPreviewDrawerComponent, {
                data,
                singleton: false,
            });
            ref.closed
                .pipe(
                    take(1),
                    finalize(() => state.dispose()),
                )
                .subscribe({ error: () => undefined });
            state.load();
            return ref;
        } catch (error: unknown) {
            state.dispose();
            throw error;
        }
    }

    // #endregion
}
