// #region Imports

import { computed, Directive, DOCUMENT, inject, input, type InputSignal, type Signal } from '@angular/core';
import { ContentNavigationContext } from './ContentNavigationContext';

// #endregion

/**
 * Builds a same-document fragment link without losing the active application route.
 *
 * A bare `href="#section"` would resolve against the document root and drop the route the user is
 * on, so the directive rebuilds the link from the current path and query and only replaces the
 * fragment. Clicking it activates the outline entry immediately, while the browser's own fragment
 * navigation does the scrolling.
 *
 * @public
 *
 * @example
 * ```html
 * <a ngpContentFragmentLink="billing">Billing</a>
 * ```
 */
@Directive({
    selector: 'a[ngpContentFragmentLink]',
    host: {
        '[attr.href]': 'href()',
        '(click)': 'onClick()',
    },
})
export class ContentFragmentLinkDirective {
    // #region Fields

    private readonly _context = inject(ContentNavigationContext);
    private readonly _document = inject(DOCUMENT);
    private readonly _href = computed(() => {
        const location = this._document.location;

        return `${location.pathname}${location.search}#${this.fragmentId().trim()}`;
    });

    // #endregion

    // #region Properties

    /**
     * Identifier of the registered destination. Without one the link points at the current route
     * with an empty fragment, which is what a bare marker attribute means.
     *
     * @public
     * @readonly
     */
    public readonly fragmentId: InputSignal<string> = input('', { alias: 'ngpContentFragmentLink' });

    /**
     * Route-preserving link exposed to the host binding.
     *
     * @protected
     * @readonly
     */
    protected get href(): Signal<string> {
        return this._href;
    }

    // #endregion

    // #region Methods

    /**
     * Updates the active outline immediately, while native fragment navigation scrolls the page.
     *
     * @protected
     */
    protected onClick(): void {
        this._context.activate(this.fragmentId());
    }

    // #endregion
}
