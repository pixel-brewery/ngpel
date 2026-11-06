import { Directive, ElementRef, inject, OnDestroy, Renderer2 } from '@angular/core';
import type { ExpandableMultilineDirective } from './ExpandableMultilineDirective';

@Directive({
    selector: '[ngpMultilineExpansionBoundary]',
    exportAs: 'ngpMultilineExpansionBoundary',
    standalone: true,
})
export class MultilineExpansionBoundaryDirective implements OnDestroy {
    private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
    private readonly _renderer = inject(Renderer2);
    private readonly _initialInlinePosition = this._elementRef.nativeElement.style.position;
    private readonly _initialInlineOverflow = this._elementRef.nativeElement.style.overflow;
    private _activeExpansion: ExpandableMultilineDirective | null = null;
    private _ownsPositioningContext = false;

    public constructor() {
        const boundaryElement = this.element;
        const defaultView = boundaryElement.ownerDocument.defaultView;

        if (defaultView?.getComputedStyle(boundaryElement).position === 'static') {
            this._renderer.setStyle(boundaryElement, 'position', 'relative');
            this._ownsPositioningContext = true;
        }
    }

    /** Element whose visible content box limits expanded multiline fields. */
    public get element(): HTMLElement {
        return this._elementRef.nativeElement;
    }

    /** @internal */
    public activate(expansion: ExpandableMultilineDirective): void {
        if (this._activeExpansion === expansion) {
            return;
        }

        this._activeExpansion?.collapseFromBoundary();
        this._activeExpansion = expansion;
        this._renderer.setStyle(this.element, 'overflow', 'hidden');
    }

    /** @internal */
    public deactivate(expansion: ExpandableMultilineDirective): void {
        if (this._activeExpansion !== expansion) {
            return;
        }

        this._activeExpansion = null;
        this.restoreOverflow();
    }

    public ngOnDestroy(): void {
        this._activeExpansion?.collapseFromBoundary();
        this._activeExpansion = null;
        this.restoreOverflow();

        if (this._ownsPositioningContext) {
            this.restoreStyle('position', this._initialInlinePosition);
        }
    }

    private restoreOverflow(): void {
        this.restoreStyle('overflow', this._initialInlineOverflow);
    }

    private restoreStyle(propertyName: string, value: string): void {
        if (value.length === 0) {
            this._renderer.removeStyle(this.element, propertyName);
            return;
        }

        this._renderer.setStyle(this.element, propertyName, value);
    }
}
