import { AfterViewInit, DestroyRef, Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';
import type { IHasElementRef } from '../hover-reveal-for/IHasElementRef';

/**
 * Sources supported by {@link MatchWidthDirective}.
 *
 * @public
 */
export type MatchWidthSource = ElementRef<HTMLElement> | HTMLElement | IHasElementRef | null;

/**
 * Keeps the host's inline size equal to another element's rendered width.
 *
 * This is useful for balanced layouts whose centered content is surrounded by
 * asymmetric leading and trailing slots. The source is observed for later size
 * changes, so the matching element follows responsive or content-driven updates.
 *
 * @public
 */
@Directive({
    selector: '[ngpMatchWidth]',
    exportAs: 'ngpMatchWidth',
})
export class MatchWidthDirective implements AfterViewInit {
    private readonly _destroyRef = inject(DestroyRef);
    private readonly _hostElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    private readonly _renderer = inject(Renderer2);
    private _isViewInitialized = false;
    private _resizeObserver: ResizeObserver | null = null;

    /**
     * Element, element reference, or component whose rendered width should be matched.
     *
     * @public
     */
    public readonly source = input<MatchWidthSource>(null, { alias: 'ngpMatchWidth' });

    /**
     * Creates the source-reactive observer lifecycle.
     *
     * @public
     */
    public constructor() {
        effect(() => {
            const source = this.source();

            if (this._isViewInitialized) {
                this.observe(source);
            }
        });

        this._destroyRef.onDestroy(() => this.disconnect());
    }

    /**
     * Applies the initial width once projected elements have been rendered.
     *
     * @public
     */
    public ngAfterViewInit(): void {
        this._isViewInitialized = true;
        this.observe(this.source());
    }

    /**
     * Replaces the active observer and synchronizes the current width immediately.
     *
     * @param source - Width source supplied to the directive.
     *
     * @private
     */
    private observe(source: MatchWidthSource): void {
        this.disconnect();

        const sourceElement = this.resolveSource(source);

        if (sourceElement === null) {
            this._renderer.removeStyle(this._hostElement, 'inline-size');
            return;
        }

        this.synchronize(sourceElement);

        const ResizeObserverConstructor = sourceElement.ownerDocument.defaultView?.ResizeObserver;

        if (ResizeObserverConstructor) {
            this._resizeObserver = new ResizeObserverConstructor(() => this.synchronize(sourceElement));
            this._resizeObserver.observe(sourceElement);
        }
    }

    /**
     * Resolves the supported source shapes to their native element.
     *
     * @param source - Width source supplied to the directive.
     *
     * @returns The native source element or `null` when no source is available.
     *
     * @private
     */
    private resolveSource(source: MatchWidthSource): HTMLElement | null {
        if (source === null) {
            return null;
        }

        if (source instanceof ElementRef) {
            return source.nativeElement;
        }

        if ('elementRef' in source) {
            return source.elementRef.nativeElement;
        }

        return source;
    }

    /**
     * Copies the source's rendered border-box width to the host.
     *
     * @param sourceElement - Native element whose rendered width is authoritative.
     *
     * @private
     */
    private synchronize(sourceElement: HTMLElement): void {
        this._renderer.setStyle(this._hostElement, 'inline-size', `${sourceElement.getBoundingClientRect().width}px`);
    }

    /**
     * Releases the active resize observer.
     *
     * @private
     */
    private disconnect(): void {
        this._resizeObserver?.disconnect();
        this._resizeObserver = null;
    }
}
