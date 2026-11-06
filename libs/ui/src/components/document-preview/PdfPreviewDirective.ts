// #region Imports

import { afterNextRender, Directive, effect, ElementRef, inject, input, output, signal } from '@angular/core';
import type { IDocumentPreviewRenderAttempt } from './IDocumentPreviewRenderAttempt';
import type { IPdfPreviewOptions } from './IPdfPreviewOptions';
import { PdfPreviewRenderer } from './PdfPreviewRenderer';

// #endregion

/** Connects the current document attempt to a rendered browser scrolling surface. @internal */
@Directive({ selector: '[ngpPdfPreview]' })
export class PdfPreviewDirective {
    // #region Fields

    private readonly _container = inject<ElementRef<HTMLDivElement>>(ElementRef).nativeElement;
    private readonly _ready = signal(false);

    // #endregion

    // #region Ctor

    public constructor() {
        afterNextRender(() => this._ready.set(true));

        effect((onCleanup) => {
            if (!this._ready()) return;

            const attempt = this.attempt();
            const renderer = new PdfPreviewRenderer(
                this._container,
                this.options(),
                () => this.rendered.emit(attempt),
                () => this.failed.emit(attempt),
            );

            onCleanup(() => void renderer.dispose());
            void renderer.render(attempt.blob);
        });
    }

    // #endregion

    // #region Properties

    public readonly attempt = input.required<IDocumentPreviewRenderAttempt>({ alias: 'ngpPdfPreview' });
    public readonly options = input.required<IPdfPreviewOptions>({ alias: 'ngpPdfPreviewOptions' });
    public readonly rendered = output<IDocumentPreviewRenderAttempt>();
    public readonly failed = output<IDocumentPreviewRenderAttempt>();

    // #endregion
}
