// #region Imports

import { Directive, ElementRef, inject, type OnInit, Renderer2 } from '@angular/core';

// #endregion

/**
 * Removes the user-agent link styling from an anchor element while preserving every link
 * capability: routing, `href`, context menu, middle-click and keyboard activation. Use it when an
 * anchor wraps composed content such as cards, brand marks or table cells; text-only hyperlinks
 * keep the regular anchor styling.
 *
 * @example
 * ```html
 * <a ngpPseudoLink [routerLink]="['/tickets', ticket.id]" title="Open ticket">
 *     <my-ticket-card [ticket]="ticket" />
 * </a>
 * ```
 *
 * @public
 */
@Directive({
    selector: 'a[ngpPseudoLink]',
    exportAs: 'ngpPseudoLink',
})
export class PseudoLinkDirective implements OnInit {
    // #region Fields

    private readonly _host: HTMLElement;
    private readonly _renderer: Renderer2;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `PseudoLinkDirective` class.
     *
     * @public
     * @param elementRef The host anchor element.
     * @param renderer The renderer used to apply the neutralising styles.
     */
    public constructor(elementRef: ElementRef<HTMLElement> = inject(ElementRef), renderer: Renderer2 = inject(Renderer2)) {
        this._host = elementRef.nativeElement;
        this._renderer = renderer;
    }

    // #endregion

    // #region Methods

    /**
     * Neutralises the user-agent link styling on initialisation.
     *
     * @public
     */
    public ngOnInit(): void {
        this._renderer.setStyle(this._host, 'color', 'inherit');
        this._renderer.setStyle(this._host, 'text-decoration', 'none');
        this._renderer.setStyle(this._host, 'cursor', 'pointer');
    }

    // #endregion
}
