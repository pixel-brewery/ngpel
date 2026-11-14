// #region Imports

import { afterNextRender, Directive, effect, ElementRef, inject, input, output, signal, untracked } from '@angular/core';
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
            const options = this.options();
            const locale = typeof options.locale === 'function' ? options.locale() : options.locale;
            const renderer = new PdfPreviewRenderer(
                this._container,
                { ...options, locale },
                () => this.rendered.emit(attempt),
                () => this.failed.emit(attempt),
            );

            onCleanup(() => void renderer.dispose());
            untracked(() => this.rendering.emit(attempt));
            void renderer.render(attempt.blob);
        });
    }

    // #endregion

    // #region Properties

    public readonly attempt = input.required<IDocumentPreviewRenderAttempt>({ alias: 'ngpPdfPreview' });
    public readonly options = input.required<IPdfPreviewOptions>({ alias: 'ngpPdfPreviewOptions' });
    public readonly rendering = output<IDocumentPreviewRenderAttempt>();
    public readonly rendered = output<IDocumentPreviewRenderAttempt>();
    public readonly failed = output<IDocumentPreviewRenderAttempt>();

    // #endregion
}
