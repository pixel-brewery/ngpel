// #region Imports

import { ChangeDetectionStrategy, Component, inject, type OnDestroy } from '@angular/core';
import { FileDownloadService } from '@pixel-brewery/ngpel-core/browser';
import {
    ButtonComponent,
    Cancel,
    DRAWER_REF,
    DRAWER_REF_DATA,
    DrawerContentDirective,
    DrawerHeaderComponent,
    DrawerHeaderDirective,
    IconNameDirective,
    TextComponent,
} from '@pixel-brewery/mosaik-elements-angular';
import { DocumentPreviewIntl } from './DocumentPreviewIntl';
import type { IDocumentPreviewData } from './IDocumentPreviewData';
import type { IDocumentPreviewRef } from './IDocumentPreviewRef';
import { PdfPreviewDirective } from './PdfPreviewDirective';

// #endregion

/**
 * Shared drawer shell containing a document, its named download and standard dismissal.
 *
 * @internal
 */
@Component({
    selector: 'ngp-document-preview-drawer',
    template: `
        <ng-template mosaikDrawerHeader>
            <mosaik-drawer-header [text]="data.title ?? data.fileName" [subText]="data.description ?? (data.title ? data.fileName : '')">
                <mosaik-button
                    slot="suffix"
                    [label]="intl.download"
                    [appearance]="'plain'"
                    [size]="'small'"
                    [disabled]="!data.state.blob()"
                    [attr.data-ngp-part]="'document-preview-download'"
                    [attr.test-id]="'document-preview-download'"
                    (click)="onDownload()"
                />
                <mosaik-button
                    slot="suffix"
                    [iconName]="'dismiss'"
                    [attr.aria-label]="intl.close"
                    [appearance]="'plain'"
                    [size]="'small'"
                    [attr.data-ngp-part]="'document-preview-close'"
                    [attr.test-id]="'document-preview-close'"
                    (click)="onClose()"
                />
            </mosaik-drawer-header>
        </ng-template>

        <ng-template mosaikDrawerContent>
            <div
                class="relative flex h-full min-h-0 w-full flex-col overflow-hidden"
                [attr.data-ngp-part]="'document-preview-drawer'"
                [attr.test-id]="'document-preview-drawer'"
                [attr.aria-busy]="data.state.loading() || data.state.rendering()"
            >
                @if (data.state.loading()) {
                    <mosaik-text
                        [attr.data-ngp-part]="'document-preview-loading'"
                        [attr.test-id]="'document-preview-loading'"
                        [text]="intl.loading"
                        [wrap]="true"
                        role="status"
                    />
                } @else if (data.state.loadFailed() || data.state.renderFailed()) {
                    <div
                        class="flex flex-col items-start gap-3"
                        [attr.data-ngp-part]="'document-preview-error'"
                        [attr.test-id]="'document-preview-error'"
                        role="alert"
                    >
                        <mosaik-text [text]="data.state.renderFailed() ? intl.renderError : intl.loadError" [wrap]="true" />
                        <mosaik-button
                            [attr.data-ngp-part]="'document-preview-retry'"
                            [attr.test-id]="'document-preview-retry'"
                            [label]="intl.retry"
                            [appearance]="'outline'"
                            (click)="onRetry()"
                        />
                    </div>
                } @else {
                    @if (data.state.rendering()) {
                        <mosaik-text
                            class="render-status"
                            data-ngp-part="document-preview-rendering"
                            test-id="document-preview-rendering"
                            [text]="intl.rendering"
                            [wrap]="true"
                            role="status"
                        />
                    }
                    @if (data.state.renderAttempt(); as attempt) {
                        @if (data.pdfOptions; as options) {
                            <div class="pdf-viewport" data-ngp-part="document-preview-pdf-viewport">
                                <div
                                    class="pdf-container"
                                    data-ngp-part="document-preview-pdf-container"
                                    test-id="document-preview-frame"
                                    [attr.data-rendered]="data.state.rendered()"
                                    [style.visibility]="data.state.rendered() ? 'visible' : 'hidden'"
                                    [attr.aria-busy]="data.state.rendering()"
                                    role="region"
                                    tabindex="0"
                                    [attr.aria-label]="data.title ?? data.fileName"
                                    [ngpPdfPreview]="attempt"
                                    [ngpPdfPreviewOptions]="options"
                                    (rendering)="data.state.beginRendering($event)"
                                    (rendered)="data.state.acknowledgeRendered($event)"
                                    (failed)="data.state.failRendering($event)"
                                ></div>
                            </div>
                        } @else if (data.state.source(); as source) {
                            @for (image of [attempt]; track image.sequence) {
                                <img
                                    class="preview-image"
                                    data-ngp-part="document-preview-image"
                                    test-id="document-preview-frame"
                                    [attr.data-rendered]="data.state.rendered()"
                                    [src]="source"
                                    [alt]="data.title ?? data.fileName"
                                    (load)="data.state.acknowledgeRendered(image)"
                                    (error)="data.state.failRendering(image)"
                                />
                            }
                        }
                    } @else if (data.state.source(); as source) {
                        <iframe
                            class="h-full min-h-0 w-full flex-1"
                            data-ngp-part="document-preview-frame"
                            test-id="document-preview-frame"
                            [src]="source"
                            [title]="data.title ?? data.fileName"
                            referrerpolicy="no-referrer"
                        ></iframe>
                    }
                }
            </div>
        </ng-template>
    `,
    styles: `
        :host {
            display: block;
        }

        iframe {
            border: 0;
        }

        .pdf-viewport {
            position: relative;
            flex: 1;
            min-height: 0;
        }

        .pdf-container {
            position: absolute;
            inset: 0;
            overflow: auto;
        }

        .preview-image {
            min-height: 0;
            width: 100%;
            flex: 1;
            object-fit: contain;
        }

        .render-status {
            pointer-events: none;
            position: absolute;
            z-index: 1;
        }
    `,
    providers: [FileDownloadService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent, DrawerContentDirective, DrawerHeaderComponent, DrawerHeaderDirective, IconNameDirective, PdfPreviewDirective, TextComponent],
})
export class DocumentPreviewDrawerComponent implements OnDestroy {
    // #region Fields

    private readonly _drawerRef = inject(DRAWER_REF) as IDocumentPreviewRef;
    private readonly _fileDownload = inject(FileDownloadService);

    // #endregion

    // #region Ctor
    // #endregion

    // #region Properties

    /** Captured document and its isolated loading state. */
    public readonly data = inject<IDocumentPreviewData>(DRAWER_REF_DATA);

    /** Translated generic feedback and dismissal labels. */
    public readonly intl = inject(DocumentPreviewIntl);

    // #endregion

    // #region Methods

    /**
     * Releases the document if its host is destroyed without a close notification.
     *
     * @public
     */
    public ngOnDestroy(): void {
        this.data.state.dispose();
    }

    /**
     * Dismisses only this preview drawer.
     *
     * @protected
     */
    protected onClose(): void {
        this._drawerRef.close(Cancel.negative());
    }

    /**
     * Saves the ready document under its captured file name without loading it again.
     *
     * @protected
     */
    protected onDownload(): void {
        const blob = this.data.state.blob();
        if (blob) this._fileDownload.downloadBlobAs(blob, this.data.fileName);
    }

    /**
     * Retries the same captured document after a load or render failure.
     *
     * @protected
     */
    protected onRetry(): void {
        this.data.state.retry();
    }

    // #endregion
}
