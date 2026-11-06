// #region Imports

import { ApplicationRef, ComponentRef, createComponent, DestroyRef, Directive, ElementRef, EnvironmentInjector, inject } from '@angular/core';
import { MarkdownComponent } from './MarkdownComponent';

// #endregion

type PreviewRenderer = (text: string) => Node;

interface IPreviewEditor extends HTMLElement {
    previewRenderer: PreviewRenderer | null;
}

/**
 * Supplies the safe Markdown renderer to the Mosaik CodeEditor preview hook. Use it on a CodeEditor
 * version that exposes `previewRenderer`.
 *
 * @public
 */
@Directive({ selector: 'mosaik-code-editor[ngpMarkdownPreview]' })
export class MarkdownPreviewDirective {
    // #region Fields

    private readonly _editor = inject<ElementRef<IPreviewEditor>>(ElementRef).nativeElement;
    private readonly _application = inject(ApplicationRef);
    private readonly _environment = inject(EnvironmentInjector);
    private readonly _destroyRef = inject(DestroyRef);
    private readonly _renderer: PreviewRenderer = (text) => this.render(text);
    private _preview: ComponentRef<MarkdownComponent> | null = null;

    // #endregion

    // #region Ctor

    public constructor() {
        if (!('previewRenderer' in this._editor)) {
            return;
        }
        const previous = this._editor.previewRenderer;
        this._editor.previewRenderer = this._renderer;
        this._destroyRef.onDestroy(() => {
            if (this._editor.previewRenderer === this._renderer) this._editor.previewRenderer = previous;
            if (this._preview) {
                this._application.detachView(this._preview.hostView);
                this._preview.destroy();
            }
        });
    }

    // #endregion

    // #region Methods

    private render(text: string): Node {
        if (!this._preview) {
            this._preview = createComponent(MarkdownComponent, {
                environmentInjector: this._environment,
                hostElement: this._editor.ownerDocument.createElement('ngp-markdown'),
            });
            this._application.attachView(this._preview.hostView);
        }
        this._preview.setInput('text', text);
        this._preview.setInput('breaks', true);
        this._preview.changeDetectorRef.detectChanges();
        return this._preview.location.nativeElement;
    }

    // #endregion
}
